variable "bucket_domain_name" {
    type = string
    description = "s3 웹사이트의 주소"
}
variable "s3_origin_id" {
    type = string
}

variable "OAC_name" {
    type = string
    description = "Origin Access Control을 식별하는 이름"
}

variable "acm_certificate_arn" {
    type = string
    description = "Https 연결을 위한 acm 인증서 arn"
}

variable "custom_domain_name" {
    type = string
    description = "route53에서 설정한 cloudfront 도메인 이름"
}