# CloudWatch 로그 그룹 설정
resource "aws_cloudwatch_log_group" "this" {
    name              = var.name
    retention_in_days = var.retention_in_days  # 로그를 14일 후 자동 삭제

    tags = {
        Environment = "prod"
        Project     = "bangbangcheck"
    }
}

