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

variable "http_method" {
  type        = string
  description = "HTTP method (GET, POST, etc.)"
}

variable "stage_name" {
  type        = string
  description = "Deployment stage name"
}

variable "region" {
  type = string
}