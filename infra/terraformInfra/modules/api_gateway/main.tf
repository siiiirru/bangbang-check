# 커스텀 도메인 생성
resource "aws_api_gateway_domain_name" "this" {
  domain_name = var.custom_domain_name  # 예: api.example.com
  regional_certificate_arn = var.acm_certificate_arn  # ACM 인증서 ARN

  endpoint_configuration {
    types = ["REGIONAL"]  # REGION 기반으로 설정
  }
}

# REST API 생성
resource "aws_api_gateway_rest_api" "this" {
  count       = length(var.lambda_functions) #동적으로 리소스를 여러 개 생성
  name        = "${var.lambda_functions[count.index].name}-api"
  description = "API for ${var.lambda_functions[count.index].name} Lambda function"
  endpoint_configuration {
    types = var.is_private_api ? ["PRIVATE"] : ["REGIONAL"]  # 프라이빗 API인지 퍼블릭 API인지 선택
  }
}

# API Gateway와 커스텀 도메인 연결
resource "aws_api_gateway_base_path_mapping" "this" {
  count = length(var.lambda_functions)

  api_id      = aws_api_gateway_rest_api.this[count.index].id
  stage_name  = aws_api_gateway_stage.this[count.index].stage_name
  domain_name = aws_api_gateway_domain_name.this.domain_name
  base_path   = "" #커스텀 도메인을 API Gateway의 루트 경로(/)에 매핑
}

# REST API 인증기
resource "aws_api_gateway_authorizer" "this" {
  count                  = length(var.lambda_functions)
  name                   = var.authorizer_name
  rest_api_id            = aws_api_gateway_rest_api.this[count.index].id
  identity_source        = "method.request.header.Authorization"
  provider_arns          = [var.cognito_user_pool_arn]
  type                   = "COGNITO_USER_POOLS"
}

# API의 리소스 생성
resource "aws_api_gateway_resource" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  parent_id    = aws_api_gateway_rest_api.this[count.index].root_resource_id
  path_part    = var.lambda_functions[count.index].api_resource_path
}

# API의 메소드
resource "aws_api_gateway_method" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  resource_id  = aws_api_gateway_resource.this[count.index].id
  http_method  = var.lambda_functions[count.index].http_method
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.this[count.index].id
}

# API Gateway와 Lambda 함수 간의 통합을 설정
resource "aws_api_gateway_integration" "this" {
  count = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this[count.index].id
  resource_id = aws_api_gateway_resource.this[count.index].id
  http_method = aws_api_gateway_method.this[count.index].http_method
  integration_http_method = "POST"  # Lambda 통합은 POST 메소드 사용
  type = "AWS_PROXY"
  uri  = var.lambda_functions[count.index].arn
}

# API를 배포
resource "aws_api_gateway_deployment" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  # depends_on   = [
  #   aws_api_gateway_integration.this,
  #   aws_api_gateway_method_response.options,
  #   aws_api_gateway_integration_response.options
  # ]
  # 변경사항 있으면 자동배포
  triggers = {
    redeployment = sha1(jsonencode({
      integration       = aws_api_gateway_integration.this[count.index].id
      method            = aws_api_gateway_method.this[count.index].id
      resource          = aws_api_gateway_resource.this[count.index].id
      options_method    = aws_api_gateway_method.options[count.index].id
      options_integration = aws_api_gateway_integration.options[count.index].id
    }))
  }

  #새로 생성한 Deployment가 Stage에 연결된 이후에 기존 Deployment를 삭제
  lifecycle {
    create_before_destroy = true
  }
}

# 배포 스테이지
resource "aws_api_gateway_stage" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  stage_name   = "prod"
  deployment_id = aws_api_gateway_deployment.this[count.index].id
  
  # 리소스 생성 순서 보장. depends_on의 자원이 생성된 후에 현재 자원 생성
  depends_on = [
    aws_api_gateway_integration.this,
    aws_api_gateway_account.this,
    aws_api_gateway_deployment.this
  ]

  # # Canary settings
  # canary_settings {
  #   deployment_id = 
  #   percent_traffic = 10  # 카나리아 배포에 보낼 트래픽 비율 (예: 10%는 카나리아)
  #   use_stage_cache = true  # 캐시 사용 여부
  # }

  # Optional: 로그 커스터마이징 및 다른 스테이지 설정
  access_log_settings {
    # CloudWatch 로그 그룹 ARN
    destination_arn = var.log_group_arn
    # 로그 형식
    format = jsonencode({
      requestId = "$context.requestId"
      status = "$context.status"
      error = "$context.error.message"
      authorizer_error = "$context.authorizer.error"
      integration_status = "$context.integration.status"
      user = "$context.authorizer.claims"
    })
  }
}

# CloudWatch 메트릭 설정
resource "aws_api_gateway_method_settings" "this" {
  count = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this[count.index].id
  stage_name  = aws_api_gateway_stage.this[count.index].stage_name
  method_path = "*/*"  # 모든 메서드에 대한 설정

  settings {
    metrics_enabled = true  # 메트릭 수집 활성화
    logging_level   = "INFO"  # 로깅 수준 설정 (예: INFO, ERROR 등)
    data_trace_enabled = true  # 데이터 추적 활성화
  }
}

# 1. CloudWatch Logs 역할 생성
resource "aws_iam_role" "apigateway_cloudwatch_logs_role" {
  name = "apigateway-cloudwatch-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "apigateway.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

# 2. 역할에 정책 부여
resource "aws_iam_role_policy_attachment" "apigateway_logs_attachment" {
  role       = aws_iam_role.apigateway_cloudwatch_logs_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
}

# 3. API Gateway 계정 설정에 로그 역할 등록
resource "aws_api_gateway_account" "this" {
  cloudwatch_role_arn = aws_iam_role.apigateway_cloudwatch_logs_role.arn
}

# OPTIONS 메서드 추가
resource "aws_api_gateway_method" "options" {
  count         = length(var.lambda_functions)
  rest_api_id   = aws_api_gateway_rest_api.this[count.index].id
  resource_id   = aws_api_gateway_resource.this[count.index].id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# MOCK 통합 (Lambda가 아닌 내부 Mock)
resource "aws_api_gateway_integration" "options" {
  count                     = length(var.lambda_functions)
  rest_api_id               = aws_api_gateway_rest_api.this[count.index].id
  resource_id               = aws_api_gateway_resource.this[count.index].id
  http_method               = aws_api_gateway_method.options[count.index].http_method
  type                      = "MOCK"
  integration_http_method   = "OPTIONS"

  request_templates = {
    "application/json" = <<EOF
{
  "statusCode": 200
}
EOF
  }
}

# 응답 정의
resource "aws_api_gateway_method_response" "options" {
  count       = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this[count.index].id
  resource_id = aws_api_gateway_resource.this[count.index].id
  http_method = "OPTIONS"
  status_code = "200"

  depends_on = [
    aws_api_gateway_method.options
  ]

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# OPTIONS 요청의 응답 헤더
resource "aws_api_gateway_integration_response" "options" {
  count       = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this[count.index].id
  resource_id = aws_api_gateway_resource.this[count.index].id
  http_method = "OPTIONS"
  status_code = "200"

  depends_on = [
    aws_api_gateway_integration.options
  ]

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'" # 필요에 따라 수정
    "method.response.header.Access-Control-Allow-Origin"  = "'https://www.bangbang-check.com'"
  }

  response_templates = {
    "application/json" = ""
  }
}


# 프라이빗 API일 경우에만 VPC 엔드포인트와 VPC 링크 생성
# resource "aws_vpc_endpoint" "this" {
#   count = var.is_private_api ? 1 : 0  # 프라이빗 API일 때만 생성

#   vpc_id = var.vpc_id  # 사용하려는 VPC ID
#   service_name = "com.amazonaws.${var.region}.execute-api"
#   route_table_ids = var.route_table_ids  # 라우팅 테이블 ID 목록
# }

# resource "aws_api_gateway_vpc_link" "this" {
#   count = var.is_private_api ? 1 : 0  # 프라이빗 API일 때만 생성

#   name        = "${var.lambda_functions[count.index].name}-vpc-link"
#   target_arn  = aws_vpc_endpoint.this[0].arn
#   description = "VPC Link for ${var.lambda_functions[count.index].name} API"
# }