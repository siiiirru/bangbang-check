variable "lambda_functions" {
  type = list(object({
    name                  = string
    handler               = string
    runtime               = string
    environment_variables = map(string)
    api_resource_path     = string  # API Gateway의 리소스 경로
    role_arn              = string  
    http_method           = string
  }))
  description = "List of Lambda function configurations"
}

variable "lambda_s3_bucket" {
  type        = string
  description = "The S3 bucket where the Lambda function code is stored."
}

variable "dynamodb_layer_arn" {
  type = string
  description = "dynamodb 람다 레이어"
}
