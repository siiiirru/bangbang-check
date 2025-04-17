resource "aws_cognito_user_pool" "this"{
  name = var.user_pool_name
  auto_verified_attributes = ["email"] # 이메일 자동 인증

    # 비밀번호 찾기
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  schema {
    name     = "email"
    required = true
    attribute_data_type = "String"
    mutable = true
  }
  schema {
    name     = "nickname"
    required = true         # true로 하면 필수 항목
    attribute_data_type = "String"
    mutable  = true          # 나중에 변경 가능하게
  }
  password_policy {
    require_uppercase = false  # 대문자 비활성화
    require_lowercase = false  # 소문자 비활성화
    require_symbols = false  
    minimum_length = 8
    require_numbers = true
  }
  
}

resource "aws_cognito_user_pool_client" "this" {
  name         = var.app_client_name
  user_pool_id = aws_cognito_user_pool.this.id

  generate_secret = false

  allowed_oauth_flows_user_pool_client = true # 이 클라이언트가 OAuth 흐름을 사용할 수 있도록 설정
  allowed_oauth_flows = ["code", "implicit"] # 
  allowed_oauth_scopes = ["email", "openid", "profile"] # 허용된 OAuth 스코프 (요청할 수 있는 데이터 범위)

  callback_urls = var.callback_urls
  logout_urls   = var.logout_urls

  supported_identity_providers = ["COGNITO"]
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = var.domain_prefix
  user_pool_id = aws_cognito_user_pool.this.id
}