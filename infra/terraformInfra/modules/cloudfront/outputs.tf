output "cloudfront_distribution_arn" {
    value = aws_cloudfront_distribution.this.arn
}

output "domain_name"{
    value = aws_cloudfront_distribution.this.domain_name
}