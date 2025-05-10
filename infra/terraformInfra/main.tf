terraform {
    required_providers{
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.16"
        }
    }
    required_version = ">=1.11.3"
}

module "website_bucket" {
    source = "./modules/s3_bucket"
    bucket_name = var.project_name
    enable_website = true
    is_public = false # OAC 설정했기 때문에 퍼블릭 액세스 차단
    tags = {
        Name = "website_bucket"
        Environment = "dev"
        Project = var.project_name
    }
    force_destroy = true
    cloudfront_distribution_arn = module.cloudfront.cloudfront_distribution_arn
}

module "cloudfront" {
    source = "./modules/cloudfront"
    bucket_domain_name = module.website_bucket.bucket_regional_domain_name
    OAC_name = "bangbangcheck-cloudfront-OAC"
    s3_origin_id = "bangbang-check-s3-origin-id"
    acm_certificate_arn= module.acm.cloudfront_validation_arn
}

module "image_bucket" {
    source = "./modules/s3_bucket"
    bucket_name = "user-upload-bangbang-check-bucket"
    enable_website = false
    is_public = false
    tags = {
        Name = "image_bucket"
        Environment = "dev"
        Project = var.project_name
    }
    force_destroy = true
}

module "lambda_bucket" {
    source = "./modules/s3_bucket"
    bucket_name = "lambda-upload-bangbang-check-bucket"
    enable_website = false
    is_public = false
    tags = {
        Name = "lambda_bucket"
        Environment = "dev"
        Project = var.project_name
    }
    force_destroy = true
}

module "cognito" {
    source           = "./modules/cognito"
    user_pool_name   = "bangbang-check-userpool"
    app_client_name  = var.project_name
    callback_urls    = [var.frontend_local_url]
    logout_urls      = [var.frontend_local_url]
    domain_prefix    = var.project_name
    region = var.project_name
}

module "route53" {
    source = "./modules/route53"

    domain_name       = "bangbang-check.com"
    subdomain         = "www"
    a_record_values   = [module.cloudfront.domain_name]
    # cname_subdomain   = "blog"
    # cname_record_values = ["example.com"]
}

#Https를 위한 인증서(apigw, cloudfront용으로 두 개 생성)
module "acm" {
    source = "./modules/acm"

    domain_name = "bangbang-check.com"
    zone_id = module.route53.zone_id
}

# module "user_table" {
#   source     = "./modules/dynamodb"
#   table_name = "users"
#   hash_key   = "username"

#   attributes = [
#     { name = "username", type = "S" },
#     { name = "email",   type = "S" },
#   ]
# }

# module "lambda" {
#   source = "./lambda_module"

#   lambda_functions = var.lambda_functions

#   lambda_s3_bucket = "your-lambda-code-bucket"
#   lambda_s3_key    = "your-lambda-code.zip"
# }

module "cloudwatch_logs" {
    source = "./modules/cloudwatch_logs"
    name = "/aws/apigateway/bangbangcheck-api-log-group"
    retention_in_days = 14
}

# module "api_gateway" {
#     source = "./api_gateway_module"

#     lambda_functions = [
#     for lambda in var.lambda_functions : {
#         name                = lambda.name
#         api_resource_path   = lambda.api_resource_path != "" ? lambda.api_resource_path : ""
#         arn                 = lambda.role_arn
#         http_method         = lambda.http_method
#         }
#     ]

#     log_group_arn = module.cloudwatch_logs.api_gateway_log_group_arn
#     authorizer_name  = "api-gateway-cognito-authorizer"
#     cognito_user_pool_arn = module.cognito.user_pool_arn
#     is_private_api = false
#     acm_certificate_arn = module.acm.apigw_validation_arn
# }

# module "default_lambda_role" {
#     source = "./modules/iam_role"
#     name   = "default-lambda-role"
#     policy_arns = [
#         "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
#     ]
# }