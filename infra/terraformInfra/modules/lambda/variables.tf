variable "lambda_functions" {
  description = "List of Lambda function configurations"
  type = list(object({
    name                  = string
    handler               = string
    runtime               = string
    environment_variables = map(string)
    api_resource_path     = string  # API Gateway의 리소스 경로
    role_arn              = string  
    http_method           = string
  }))
}

variable "lambda_s3_bucket" {
  description = "The S3 bucket where the Lambda function code is stored."
  type        = string
}

variable "lambda_s3_key" {
  description = "The S3 key for the Lambda function code."
  type        = string
}
