variable "table_name" {
  type        = string
  description = "DynamoDB 테이블 이름"
}

variable "billing_mode" {
  type        = string
  default     = "PAY_PER_REQUEST"
  description = "청구 방식"
}

variable "read_capacity" {
  type = number
  default = 25
  description = "프로비져닝 모드에서 읽기 용량. 프리티어는 25까지 제공"
}

variable "write_capacity" {
  type = number
  default = 25
  description = "프로비져닝 모드에서 쓰기 용량. 프리티어는 25까지 제공"
}

variable "tags" {
  type    = map(string)
  default = {}
}
