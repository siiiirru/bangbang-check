variable "table_name" {
  type        = string
  description = "DynamoDB 테이블 이름"
}

variable "billing_mode" {
  type        = string
  default     = "PAY_PER_REQUEST"
  description = "청구 방식"
}

variable "hash_key" {
  type        = string
  description = "파티션 키 이름"
}

variable "attributes" {
  description = "속성 리스트 (파티션 키, 정렬 키 포함)"
  type = list(object({
    name = string
    type = string # S, N, B
  }))
}

variable "tags" {
  type    = map(string)
  default = {}
}
