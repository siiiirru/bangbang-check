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

    bucket_name = "bangbang-check"
    enable_website = true
    is_public = true
    tags = {
        Name = "website_bucket"
        Environment = "dev"
        Project = "bangbang-check"
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
        Project = "bangbang-check"
    }
    force_destroy = true
}