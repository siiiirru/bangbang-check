variable "name" {
    type = string
    description = "IAM Role's name"
}

variable "policy_arns" {
    type    = list(string)
    default = []
}