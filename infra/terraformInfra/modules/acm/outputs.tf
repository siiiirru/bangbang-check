output "apigw_validation_arn" {
    value = aws_acm_certificate_validation.apigw_cert_validation.certificate_arn
}

output "cloudfront_validation_arn" {
    value = aws_acm_certificate_validation.cloudfront_cert_validation.certificate_arn
}