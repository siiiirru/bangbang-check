output "lambda_function_arns" {
    value       = aws_lambda_function.this[*].arn
    description = "List of ARNs for the created Lambda functions."
    sensitive = true
}

output "lambda_invoke_arn" {
    value       = aws_lambda_function.this[*].invoke_arn
    description = "api_gateway_integration에서 람다함수를 연결하기 위해 필요한 invoke_arn"
    sensitive = true
}