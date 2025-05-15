resource "aws_lambda_function" "this" {
  count        = length(var.lambda_functions)
  function_name = var.lambda_functions[count.index].name
  handler       = var.lambda_functions[count.index].handler
  runtime       = var.lambda_functions[count.index].runtime

  s3_bucket = var.lambda_s3_bucket
  s3_key    = "${var.lambda_functions[count.index].name}.zip"
  role      = var.lambda_functions[count.index].role_arn
  
  environment {
    variables = var.lambda_functions[count.index].environment_variables
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  count        = length(var.lambda_functions)
  action       = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this[count.index].function_name
  principal    = "apigateway.amazonaws.com"
  statement_id = "AllowExecutionFromAPIGateway-${aws_lambda_function.this[count.index].function_name}"

  depends_on = [aws_lambda_function.this]
}

