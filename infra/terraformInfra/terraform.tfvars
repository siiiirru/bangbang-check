# lambda_functions = [
#     {
#         name                  = "getProjects"
#         handler               = "index.handler"
#         runtime               = "nodejs14.x"
#         environment_variables = { "ENV_VAR" = "value1" }
#         api_resource_path     = "/projects"
#         http_method = "GET"
#         role_arn = module.dynamodb_lambda_role.role_arn  # 동적으로 참조
#     }
# ]