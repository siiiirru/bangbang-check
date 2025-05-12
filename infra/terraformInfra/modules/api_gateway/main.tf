# 커스텀 도메인 생성
resource "aws_api_gateway_domain_name" "this" {
  domain_name = var.custom_domain_name  # 예: api.example.com
  certificate_arn = var.acm_certificate_arn  # ACM 인증서 ARN

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
  stage_name  = "prod"
  domain_name = aws_api_gateway_domain_name.this.domain_name
  base_path   = var.lambda_functions[count.index].api_resource_path  # 각 API에 맞는 경로 설정
}

# REST API 인증기
resource "aws_api_gateway_authorizer" "this" {
  count                  = var.lambda_functions[count.index].authorization != "" ? 1 : 0  # 인증기가 필요할 경우에만 생성
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
  authorization = var.lambda_functions[count.index].authorization != "" ? var.lambda_functions[count.index].authorization : null
}

# API Gateway와 Lambda 함수 간의 통합을 설정
resource "aws_api_gateway_integration" "this" {
  count = length(var.lambda_functions)
  rest_api_id = aws_api_gateway_rest_api.this[count.index].id
  resource_id = aws_api_gateway_resource.this[count.index].id
  http_method = aws_api_gateway_method.this[count.index].http_method
  integration_http_method = "POST"  # Lambda 통합은 POST 메소드 사용
  type = "AWS_PROXY"
  uri  = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${var.lambda_functions[count.index].arn}/invocations"
}

# API를 배포
resource "aws_api_gateway_deployment" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  depends_on   = [aws_api_gateway_integration.this]
}

# 배포 스테이지
resource "aws_api_gateway_stage" "this" {
  count        = length(var.lambda_functions)
  rest_api_id  = aws_api_gateway_rest_api.this[count.index].id
  stage_name   = "prod"
  deployment_id = aws_api_gateway_deployment.this[count.index].id

  depends_on = [aws_api_gateway_integration.this]

  # Canary settings
  canary_settings {
    percent_traffic = 10  # 카나리아 배포에 보낼 트래픽 비율 (예: 10%는 카나리아)
    deployment_id           = aws_api_gateway_deployment.this[count.index].id
    use_stage_cache = true  # 캐시 사용 여부
  }

  # Optional: 로그 커스터마이징 및 다른 스테이지 설정
  access_log_settings {
    # CloudWatch 로그 그룹 ARN
    destination_arn = var.log_group_arn
    # 로그 형식
    format          = "$context.requestId $context.status $context.errorMessage"
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