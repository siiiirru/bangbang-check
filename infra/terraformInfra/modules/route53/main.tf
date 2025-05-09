resource "aws_route53_zone" "this" {
  name = var.domain_name
}

#Cloudfront와 연결
# resource "aws_route53_record" "a_record" {
#   zone_id = aws_route53_zone.this.id
#   name    = var.subdomain
#   type    = "A"
#   ttl     = 300
#   records = var.a_record_values
# }

#API GW와 연결
# resource "aws_route53_record" "cname_record" {
#   zone_id = aws_route53_zone.this.id
#   name    = var.cname_subdomain
#   type    = "CNAME"
#   ttl     = 300
#   records = var.cname_record_values
# }

# 네임서버
# resource "aws_route53_record" "ns_record" {
#   zone_id = aws_route53_zone.this.id
#   name    = var.domain_name
#   type    = "NS"
#   ttl     = 300
#   records = aws_route53_zone.this.name_servers
# }

# 필요한 경우 추가적인 레코드 설정