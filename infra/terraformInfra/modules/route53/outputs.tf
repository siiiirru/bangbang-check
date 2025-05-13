output "zone_id" {
  description = "The ID of the hosted zone"
  value       = aws_route53_zone.this.id
  sensitive = true
}


# output "cname_record" {
#   description = "The CNAME record details"
#   value       = aws_route53_record.cname_record
# }

# 이 값을 도메인 등록업체의 네임서버 설정에 수동으로 입력
output "ns_records" {
  value = aws_route53_zone.this.name_servers
  sensitive = true
}

