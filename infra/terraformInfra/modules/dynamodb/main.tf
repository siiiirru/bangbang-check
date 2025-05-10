resource "aws_dynamodb_table" "this" {
  name         = var.table_name
  billing_mode = var.billing_mode
  hash_key     = var.hash_key

  # 속성 정의를 동적으로 생성
  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  # 정렬 키가 있으면 추가
  lifecycle {
    ignore_changes = [attribute]
  }

  tags = var.tags
}
