resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
  force_destroy = var.force_destroy
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = var.is_public ? false: true
  block_public_policy     = var.is_public ? false: true
  ignore_public_acls      = var.is_public ? false: true
  restrict_public_buckets = var.is_public ? false: true
}

resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.this.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = concat(
      var.is_public && !var.enable_website ? [
        {
          Sid       = "PublicReadGetObject",
          Effect    = "Allow",
          Principal = "*",
          Action    = "s3:GetObject",
          Resource  = "${aws_s3_bucket.this.arn}/*"
        }
      ] : [],

      var.enable_website ? [
        {
          Sid       = "WebsiteReadGetObject",
          Effect    = "Allow",
          Principal = {
            Service = "cloudfront.amazonaws.com"
          },
          Action    = "s3:GetObject",
          Resource  = "${aws_s3_bucket.this.arn}/*",
          Condition = {
            StringEquals = {
              "AWS:SourceArn" = var.cloudfront_distribution_arn
            }
          }
        }
      ] : [],

      [
        {
          Sid       = "GitHubActionsPutObject",
          Effect    = "Allow",
          Principal = {
            AWS = "arn:aws:iam::418295688903:role/GitHubActionsOIDCRole"
          },
          Action    = ["s3:PutObject", "s3:DeleteObject"],
          Resource  = "${aws_s3_bucket.this.arn}/*"
        }
      ]
    )
  })
}

resource "aws_s3_bucket_versioning" "this" {
  count  = var.is_versioning ? 1 : 0
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
  }
}

# 버킷 수명 주기 정책. 1일이 지난 이전 버전들은 삭제
resource "aws_s3_bucket_lifecycle_configuration" "example" {
  count  = var.is_versioning ? 1 : 0
  bucket = aws_s3_bucket.this.id
  rule {
    id     = "delete-old-versions"
    status = "Enabled"
    filter {
      prefix = ""
    }
    noncurrent_version_expiration {
      noncurrent_days = 1 # 1일 후 삭제
    }
  }
}

# CORS 설정
resource "aws_s3_bucket_cors_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
    allowed_origins = ["http://localhost:3000", "https://*.amazonaws.com", "https://bangbang-check.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}