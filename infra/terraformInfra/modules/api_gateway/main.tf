# 커스텀 도메인 생성 (공통)
resource "aws_api_gateway_domain_name" "this" {
  domain_name = var.custom_domain_name  # 예: api.example.com
  regional_certificate_arn = var.acm_certificate_arn  # ACM 인증서 ARN

  endpoint_configuration {
    types = ["REGIONAL"]  # REGION 기반으로 설정
  }
}

# REST API Gateway (공통)
resource "aws_api_gateway_rest_api" "this" {
  name        = var.api_name
  description = var.api_description
  endpoint_configuration {
    types = var.is_private_api ? ["PRIVATE"] : ["REGIONAL"]
  }
}

# API Gateway와 커스텀 도메인 연결(공통)
resource "aws_api_gateway_base_path_mapping" "this" {
  api_id      = aws_api_gateway_rest_api.this.id
  stage_name  = aws_api_gateway_stage.this.stage_name
  domain_name = aws_api_gateway_domain_name.this.domain_name
  base_path   = ""
}

# REST API 인증기 (공통)
resource "aws_api_gateway_authorizer" "this" {
  name                   = var.authorizer_name
  rest_api_id            = aws_api_gateway_rest_api.this.id
  identity_source        = "method.request.header.Authorization"
  provider_arns          = [var.cognito_user_pool_arn]
  type                   = "COGNITO_USER_POOLS"
}

# 리소스 생성시 중복경로는 한번만 만들기
locals {
  distinct_paths = distinct([for f in var.lambda_functions : f.api_resource_path]) 
}

# API의 리소스 생성
# for_each로 만든 리소스에 접근할 때는 for_each에서 사용한 키로 접근가능(여기선 경로명 ex.projects)
resource "aws_api_gateway_resource" "this" {
  for_each    = toset(local.distinct_paths)
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  # for_each가 Set일 경우 key,value다 Set 요소로 동일한 값을 가짐
  path_part   = each.value
}


# API의 메소드
resource "aws_api_gateway_method" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this.id
  resource_id  = aws_api_gateway_resource.this[var.lambda_functions[count.index].api_resource_path].id
  http_method  = var.lambda_functions[count.index].http_method
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.this.id
}

# API Gateway와 Lambda 함수 간의 통합을 설정
resource "aws_api_gateway_integration" "this" {
  count = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this[var.lambda_functions[count.index].api_resource_path].id
  http_method = aws_api_gateway_method.this[count.index].http_method
  integration_http_method = "POST"  # Lambda 통합은 POST 메소드 사용
  type = "AWS_PROXY"
  uri  = var.lambda_functions[count.index].arn
}

# API를 배포 (공통)
resource "aws_api_gateway_deployment" "this" {
  depends_on = [
    aws_api_gateway_integration.this,
    aws_api_gateway_method_response.options,
    aws_api_gateway_integration_response.options
  ]
  rest_api_id = aws_api_gateway_rest_api.this.id
  triggers = {
    redeployment = sha1(jsonencode(var.lambda_functions))
  }
  lifecycle {
    create_before_destroy = true
  }
}

# 배포 스테이지 (공통)
resource "aws_api_gateway_stage" "this" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = "prod"
  deployment_id = aws_api_gateway_deployment.this.id
  access_log_settings {
    destination_arn = var.log_group_arn
    format = jsonencode({
      requestId = "$context.requestId"
      status = "$context.status"
      error = "$context.error.message"
      authorizer_error = "$context.authorizer.error"
      integration_status = "$context.integration.status"
      user = "$context.authorizer.claims"
    })
  }
  depends_on = [aws_api_gateway_account.this]
}

# CloudWatch 메트릭 설정(공통)
resource "aws_api_gateway_method_settings" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  stage_name  = aws_api_gateway_stage.this.stage_name
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

# OPTIONS 메서드는 리소스마다 하나씩 생성
# aws_api_gateway_method.options가 이미 for_each로 선언되었기 때문에, 
# 여기에 접근하는 모든 리소스도 for_each 방식으로 선언해야 안전
resource "aws_api_gateway_method" "options" {
  for_each      = toset(local.distinct_paths)
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.this[each.key].id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# MOCK 통합 (Lambda가 아닌 내부 Mock)
resource "aws_api_gateway_integration" "options" {
  for_each    = toset(local.distinct_paths)
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this[each.key].id
  http_method = aws_api_gateway_method.options[each.key].http_method
  type = "MOCK"
  integration_http_method = "OPTIONS"

  request_templates = {
    "application/json" = <<EOF
{
  "statusCode": 200
}
EOF
  }
}

# options 응답 정의
resource "aws_api_gateway_method_response" "options" {
  for_each      = toset(local.distinct_paths)
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this[each.key].id
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
  for_each      = toset(local.distinct_paths)
  rest_api_id = aws_api_gateway_rest_api.this.id
  resource_id = aws_api_gateway_resource.this[each.key].id
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