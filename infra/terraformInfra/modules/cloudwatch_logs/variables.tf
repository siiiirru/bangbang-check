variable "name" {
    type = string
    description = "The log group's name" 
}

variable "retention_in_days" {
    type = number
    description = "며칠 후에 로그를 삭제할 것인지 정의"
}