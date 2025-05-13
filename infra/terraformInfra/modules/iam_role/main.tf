resource "aws_iam_role" "this" {
    name = var.name
    assume_role_policy = data.aws_iam_policy_document.assume.json
}

# Lambda가 이 역할을 사용할 수 있도록 허용하는 정책
data "aws_iam_policy_document" "assume" {
    statement {
        actions = ["sts:AssumeRole"]
        principals {
        type        = "Service"
        identifiers = ["lambda.amazonaws.com"]
        }
    }
}

resource "aws_iam_role_policy_attachment" "attachments" {
    for_each   = toset(var.policy_arns)
    role       = aws_iam_role.this.name
    policy_arn = each.value
}