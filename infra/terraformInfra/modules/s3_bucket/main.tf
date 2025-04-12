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
    Statement = [{
      Sid       = "PublicReadGetObject",
      Effect    = "Allow",
      Principal = "*",
      Action    = "s3:GetObject",
      Resource  = "${aws_s3_bucket.this.arn}/*"
    }]
  })
}
