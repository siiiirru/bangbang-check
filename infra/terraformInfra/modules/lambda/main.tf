resource "aws_lambda_function" "this" {
  count        = length(var.lambda_functions)
  function_name = var.lambda_functions[count.index].name
  handler       = var.lambda_functions[count.index].handler
  runtime       = var.lambda_functions[count.index].runtime

  s3_bucket = var.lambda_s3_bucket
  s3_key    = var.lambda_s3_key
  role      = var.lambda_functions[count.index].role_arn
  
  environment {
    variables = var.lambda_functions[count.index].environment_variables
  }
}

