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
resource "aws_route53_record" "api_gateway_record" {
  zone_id = aws_route53_zone.this.id
  name    = var.api_gateway_subdomain
  type    = "A"
  ttl     = 300
  alias {
    name                   = var.api_gateway_regional_domain_name
    zone_id                = var.api_gateway_regional_zone_id
    evaluate_target_health = false
  }
}


# 필요한 경우 추가적인 레코드 설정