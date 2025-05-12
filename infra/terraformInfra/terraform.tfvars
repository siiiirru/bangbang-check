# lambda_functions = [
#     {
#         name                  = "function1"
#         handler               = "index.handler"
#         runtime               = "nodejs14.x"
#         environment_variables = { "ENV_VAR" = "value1" }
#         api_resource_path     = "function1"
#         role_arn = module.lambda_role_1.role_arn  # 동적으로 참조
#     },
#     {
#         name                  = "function2"
#         handler               = "index.handler"
#         runtime               = "nodejs14.x"
#         environment_variables = { "ENV_VAR" = "value2" }
#         api_resource_path     = "function2"
#         role_arn = module.lambda_role_2.role_arn  # 동적으로 참조
#     }
# ]