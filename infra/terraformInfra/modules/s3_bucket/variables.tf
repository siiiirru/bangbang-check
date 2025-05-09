variable "bucket_name" {
  type = string
}

variable "force_destroy" {
  type = bool
}

variable "enable_website" {
  type = bool
}

variable "error_document" {
  type    = string
  default = "error.html"
}

variable "is_public" {
  type = bool
}

variable "tags" {
  type = map(string)
  default = {
    Name        = "example"
    Environment = "dev"
    Project = "bangbang-check"
  }
}

variable "cloudfront_distribution_arn" {
  type = string
  default = null
  description = "배포하는 클라우드프론트 arn"
}