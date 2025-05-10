output "api_gateway_urls" {
  description = "List of API Gateway URLs."
  value       = aws_api_gateway_rest_api.this[*].invoke_url
}