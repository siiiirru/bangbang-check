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

    bucket_name = var.project-name
    enable_website = true
    is_public = true
    tags = {
        Name = "website_bucket"
        Environment = "dev"
        Project = var.project-name
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
        Project = var.project-name
    }
    force_destroy = true
}


module "cognito" {
    source           = "./modules/cognito"
    user_pool_name   = "bangbang-check-userpool"
    app_client_name  = var.project-name
    callback_urls    = [var.frontend-local-url]
    logout_urls      = [var.frontend-local-url]
    domain_prefix    = var.project-name
    region = var.project-name
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

