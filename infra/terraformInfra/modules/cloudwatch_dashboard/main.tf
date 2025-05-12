# CloudWatch 대시보드 설정
resource "aws_cloudwatch_dashboard" "this" {
    dashboard_name = "APIGatewayDashboard"
    dashboard_body = jsonencode({
    "widgets" = [
        {
            "type"   = "metric",
            "x"      = 0,
            "y"      = 0,
            "width"  = 24,
            "height" = 6,
            "properties" = {
            "metrics" = [
                ["AWS/ApiGateway", "4XXError", "ApiName", "YourAPIName"],
                ["AWS/ApiGateway", "5XXError", "ApiName", "YourAPIName"]
            ],
            "view"    = "timeSeries",
            "stacked" = false,
            "region"  = "us-east-1",
            "period"  = 300,
            "title"   = "4XX and 5XX Errors"
            }
        }
    ]
    })
}