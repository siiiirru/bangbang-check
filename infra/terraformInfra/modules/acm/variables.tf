variable "domain_name" {
    type = string
    description = "인증서가 발급될 도메인 이름"
}

variable "zone_id" {
    type = string
    description = "Route 53 호스팅 존 ID"
}

variable "apigw_domain_name" {
    type = string
    description = "api Gateway가 사용할 도메인 이름"
}