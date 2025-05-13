variable "domain_name" {
  type        = string
  description = "The domain name for the Route 53 hosted zone"
}

variable "subdomain" {
  type        = string
  description = "The subdomain for the A record"
}

# variable "a_record_values" {
#   type        = set(string)
#   description = "The IP addresses for the A record"
# }

variable "cloudfront_domain_name" {
  type        = string
  description = "클라우드 프론트의 도메인 이름"
}

variable "cloudfront_hosted_zone_id" {
  type = string
  description = "cloudfront의 hested zone id"
}

variable "api_gateway_subdomain" {
  type        = string
  description = "api gateway A레코드의 서브도메인"
}

variable "api_gateway_regional_domain_name" {
  type = string
  description = "api gateway 의 regional domain name"
}

variable "api_gateway_regional_zone_id" {
  type = string
  description = "api_gateway의 reginal zone id"
}

# variable "cname_record_values" {
#   description = "The target for the CNAME record"
#   type        = list(string)
# }
