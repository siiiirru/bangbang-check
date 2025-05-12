terraform {
  backend "s3" {
    bucket         = "github-action-terraform-state-bucket-bangbang-check" 
    key            = "terraform.tfstate"  # 상태 파일 저장 위치
    region         = "ap-northeast-2"  # S3 버킷의 리전
  }
}