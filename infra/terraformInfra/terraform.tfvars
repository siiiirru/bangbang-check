lambda_functions = [
    {
        name                  = "getProjects"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "projects"
        http_method = "GET"
        role_arn = "dynamodb_lambda_role"  
        requires_auth = true
    },
    {
        name                  = "createProjects"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "projects"
        http_method = "POST"
        role_arn = "dynamodb_lambda_role"  
        requires_auth = true
    },
    {
        name                  = "deleteProjects"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "projects"
        http_method = "DELETE"
        role_arn = "dynamodb_lambda_role"  
        requires_auth = true
    },
    {
        name                  = "getProject"
        handler               = "index.handler"
        runtime               = "nodejs20.x"
        environment_variables = { "ENV_VAR" = "value1" }
        api_resource_path     = "project"
        http_method = "GET"
        role_arn = "dynamodb_lambda_role"  
        requires_auth = false
    }
]