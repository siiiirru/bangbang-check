resource "aws_cloudfront_distribution" "this" {
    origin {
        domain_name = var.bucket_domain_name
        origin_id   = var.s3_origin_id
        origin_access_control_id = aws_cloudfront_origin_access_control.this.id # OAC 설정
    }

    enabled             = true
    is_ipv6_enabled     = true
    comment             = "CloudFront distribution for frontend"
    default_root_object = "index.html"

    #  AWS 관리형 캐싱 정책사용
    default_cache_behavior {
        target_origin_id = var.s3_origin_id
        viewer_protocol_policy = "redirect-to-https"
        cache_policy_id  = "2e54312d-136d-493c-8eb9-b001f22f67d2"
        allowed_methods = ["GET", "HEAD"]
        cached_methods = ["GET", "HEAD"]
    }

    restrictions {
        geo_restriction {
        restriction_type = "whitelist"
        locations        = ["KR", "US", "CA", "GB", "DE"]
        }
    }

    price_class = "PriceClass_200" # 한국은 200에 있음

    # HTTPS를 위한 ACM 인증서 설정
    viewer_certificate {
        acm_certificate_arn = var.acm_certificate_arn  # ACM 인증서 ARN
        ssl_support_method  = "sni-only"  # SNI(Secure Name Indication) 방식 사용
    }
}

# OAC 설정 (s3버킷은 클라우드 프론트로만 접속 가능)
# S3 버킷 정책을 CloudFront가 버킷에 접근할 수 있도록 수정해야 함
resource "aws_cloudfront_origin_access_control" "this" {
    name                              = var.OAC_name
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
}