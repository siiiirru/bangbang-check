resource "aws_route53_zone" "this" {
  name = var.domain_name
}

# Cloudfront와 연결
resource "aws_route53_record" "cloudfront_record" {
  zone_id = aws_route53_zone.this.id
  name    = var.subdomain
  type    = "A"
  
  alias {
    name                   = var.cloudfront_domain_name   # 예: d1zr93o0t87on0.cloudfront.net
    zone_id                = var.cloudfront_hosted_zone_id   # CloudFront의 호스팅 존 ID
    evaluate_target_health = false  # CloudFront는 헬스체크를 직접 지원하지 않는다
  }
}

#API GW와 연결
# resource "aws_route53_record" "cname_record" {
#   zone_id = aws_route53_zone.this.id
#   name    = var.cname_subdomain
#   type    = "CNAME"
#   ttl     = 300
#   records = var.cname_record_values
# }


# 필요한 경우 추가적인 레코드 설정