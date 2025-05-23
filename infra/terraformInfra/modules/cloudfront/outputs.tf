output "cloudfront_distribution_arn" {
    value = aws_cloudfront_distribution.this.arn
}

output "domain_name"{
    value = aws_cloudfront_distribution.this.domain_name
}

output "hosted_zone_id" {
    value = aws_cloudfront_distribution.this.hosted_zone_id
}