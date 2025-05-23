lambda_functions = [
    {
        name                  = "getProjects"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "projects"
        http_method = "GET"
        role_arn = "dynamodb_lambda_role"  # 동적으로 참조
    },
    {
        name                  = "createProjects"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "projects"
        http_method = "POST"
        role_arn = "dynamodb_lambda_role"  # 동적으로 참조
    }
]