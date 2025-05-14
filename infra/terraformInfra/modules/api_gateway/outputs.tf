output "api_gateway_urls" {
  value       = aws_api_gateway_deployment.this[*].invoke_url
  description = "List of API Gateway URLs."
  sensitive = true
}

output "api_gateway_regional_zone_id"{
  value = aws_api_gateway_domain_name.this.regional_zone_id
  description = "route53에서 Alias에 연결하기 위해 필요한 값 "
  sensitive = true
}

output "api_gateway_regional_domain_name"{
  value = aws_api_gateway_domain_name.this.regional_domain_name
  description = "route53에서 Alias에 연결하기 위해 필요한 값 "
}