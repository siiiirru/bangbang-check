# CloudWatch 알람 설정
resource "aws_cloudwatch_metric_alarm" "this" {
    alarm_name          = "HighErrorRate"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods  = 1
    metric_name         = "5XXError"
    namespace           = "AWS/ApiGateway"
    period              = 300
    statistic           = "Sum"
    threshold           = 100
    alarm_description   = "Triggered when the 5XX error rate is above 100"
    dimensions = {
        ApiName = "YourAPIName"
    }
    actions_enabled     = true
    alarm_actions       = ["arn:aws:sns:region:account-id:YourSNSTopic"]
}