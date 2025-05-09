output "bucket_website_domain_name" {
    value=aws_s3_bucket.this.website_endpoint
}