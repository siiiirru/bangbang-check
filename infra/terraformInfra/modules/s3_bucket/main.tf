resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_website_configuration" "this"{
  count = var.enable_website ? 1:0
  bucket = aws_s3_bucket.this.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = var.error_document
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = var.is_public ? false: true
  block_public_policy     = var.is_public ? false: true
  ignore_public_acls      = var.is_public ? false: true
  restrict_public_buckets = var.is_public ? false: true
}

resource "aws_s3_bucket_policy" "website_policy" {
  count  = var.enable_website ? 1 : 0
  bucket = aws_s3_bucket.this.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.this.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${var.cloudfront_distribution_arn}"  # 변수로 주입
          }
        }
      },
      {
        Sid       = "GitHubActionsPutObject",
        Effect    = "Allow",
        Principal = {
          AWS = "arn:aws:iam::418295688903:role/GitHubActionsOIDCRole"  # GitHub Actions 역할 ARN으로 교체
        },
        Action    = ["s3:PutObject","s3:DeleteObject"]
        Resource  = "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

