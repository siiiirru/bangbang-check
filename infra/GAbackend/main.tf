terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">=1.11.3"
}

provider "aws" {
  region  = "ap-northeast-2"
  profile = "default"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "github-action-terraform-state-bucket-bangbang-check"
  tags = {
    Name        = "terraform-state"
    Environment = "Dev"
    Project     = "bangbang-check"
  }
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "default" {
  bucket = aws_s3_bucket.terraform_state.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 깃허브 액션용 자격증명인 OIDC 만들기
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com" # OIDC 토큰 발급자. GitHub Actions는 항상 이 주소다.

  client_id_list = [
    "sts.amazonaws.com" # AWS에서 신뢰할 클라이언트 ID. 항상 이 ID이다.
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1" # GitHub OIDC 인증서의 Thumbprint (신뢰하는 루트 인증서).
  ]
}

resource "aws_iam_role" "github_actions_role" {
  name = "GitHubActionsOIDCRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            # 여기에 GitHub repo 정보
            "token.actions.githubusercontent.com:sub" = "repo:siiiirru/bangbang-check:*"
          }
        }
      }
    ]
  })
}

# 깃허브 액션이 가져가는 권한
resource "aws_iam_role_policy_attachment" "s3_policy" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambda_FullAccess"
}

resource "aws_iam_role_policy_attachment" "dynamodb_policy" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_role_policy_attachment" "cognito_policy" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoPowerUser"
}

resource "aws_iam_role_policy_attachment" "apigateway_policy" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator"
}

