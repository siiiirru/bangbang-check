variable "region" {
    type = string
    default = "ap-northeast-2"
}

variable "project_name" {
    type = string
    default = "bangbang-check"
}

variable "frontend_local_url" {
    type = string
    default = "http://localhost:3000/"
}

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