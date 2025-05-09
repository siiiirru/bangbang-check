provider "aws" {
    alias  = "seoul"
    region = "ap-northeast-2"
}

provider "aws" {
    alias  = "virginia"
    region = "us-east-1"
}

# 서울 리전 (API Gateway용 인증서)
resource "aws_acm_certificate" "apigw_cert" {
    provider          = aws.seoul
    domain_name       = var.domain_name
    validation_method = "DNS"

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_route53_record" "apigw_cert_validation" {
    name    = tolist(aws_acm_certificate.apigw_cert.domain_validation_options)[0].resource_record_name
    type    = tolist(aws_acm_certificate.apigw_cert.domain_validation_options)[0].resource_record_type
    zone_id = var.zone_id
    records = [tolist(aws_acm_certificate.apigw_cert.domain_validation_options)[0].resource_record_value]
    ttl     = 60
}


resource "aws_acm_certificate_validation" "apigw_cert_validation" {
    provider                = aws.seoul
    certificate_arn         = aws_acm_certificate.apigw_cert.arn
    validation_record_fqdns = [aws_route53_record.apigw_cert_validation.fqdn]

    depends_on = [aws_route53_record.apigw_cert_validation]
}


# 미국 동부 리전 (CloudFront용 인증서)
resource "aws_acm_certificate" "cloudfront_cert" {
    provider          = aws.virginia
    domain_name       = var.domain_name
    validation_method = "DNS"

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_route53_record" "cloudfront_cert_validation" {
    name    = tolist(aws_acm_certificate.cloudfront_cert.domain_validation_options)[0].resource_record_name
    type    = tolist(aws_acm_certificate.cloudfront_cert.domain_validation_options)[0].resource_record_type
    zone_id = var.zone_id
    records = [tolist(aws_acm_certificate.cloudfront_cert.domain_validation_options)[0].resource_record_value]
    ttl     = 60
}


resource "aws_acm_certificate_validation" "cloudfront_cert_validation" {
    provider                = aws.virginia
    certificate_arn         = aws_acm_certificate.cloudfront_cert.arn
    validation_record_fqdns = [aws_route53_record.cloudfront_cert_validation.fqdn]

    depends_on = [aws_route53_record.cloudfront_cert_validation]
}