output "lambda_function_arns" {
    description = "List of ARNs for the created Lambda functions."
    value       = aws_lambda_function.this[*].arn
}
