variable "api_name" {
  type        = string
  description = "Name of the API"
}

variable "api_description" {
  type        = string
  description = "API description"
}

variable "authorizer_name" {
  type        = string
  description = "Name for the Cognito Authorizer"
}

variable "cognito_user_pool_arn" {
  type        = string
  description = "ARN of the Cognito User Pool"
}

variable "resource_path" {
  type        = string
  description = "Path part for the API resource"
}

variable "stage_name" {
  type        = string
  description = "Deployment stage name"
}

variable "lambda_functions" {
  description = "List of lambda function ARNs to link with API Gateway."
  type = list(object({
    name                = string
    api_resource_path   = string #API Gateway에서 Lambda를 호출할 때 사용되는 경로
    arn                 = string
    http_method         = string
  }))
}

variable "region" {
  type        = string
  description = "The AWS region to deploy the resources."
  default     = "ap-northest-2"
}

variable "log_group_arn" {
  type        = string
  description = "CloudWatch 로그 그룹의 ARN(고유 식별자)을 입력받는 변수"
}

variable "is_private_api" {
  description = "Whether the API is private"
  type        = bool
  default     = false  # 기본값은 퍼블릭 API
}

variable "custom_domain_name" {
  type = string
}

variable "acm_certificate_arn" {
  type = string
  description = "aws_acm_certificate_validation.example.certificate_arn"
}