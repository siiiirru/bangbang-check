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
    is_public = true
    tags = {
        Name = "website_bucket"
        Environment = "dev"
        Project = var.project_name
    }
    force_destroy = true
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


module "cognito" {
    source           = "./modules/cognito"
    user_pool_name   = "bangbang-check-userpool"
    app_client_name  = var.project_name
    callback_urls    = [var.frontend_local_url]
    logout_urls      = [var.frontend_local_url]
    domain_prefix    = var.project_name
    region = var.project_name
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

# module "api_gateway" {
#     source               = "./modules/api_gateway"
#     api_name             = "my-api"
#     api_description      = "My API Gateway"
#     authorizer_name      = "my-cognito-authorizer"
#     cognito_user_pool_arn = module.cognito.user_pool_arn
#     resource_path        = "hello"
#     http_method          = "GET"
#     stage_name           = "prod"
# }