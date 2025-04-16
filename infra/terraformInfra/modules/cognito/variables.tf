variable "user_pool_name" {
  type = string
}

variable "user_pool_name" {
  type        = string
  description = "Name of the Cognito User Pool"
}

variable "app_client_name" {
  type        = string
  description = "Name of the App Client"
}

variable "callback_urls" {
  type        = list(string)
  description = "List of callback URLs"
}

variable "logout_urls" {
  type        = list(string)
  description = "List of logout URLs"
}

variable "domain_prefix" {
  type        = string
  description = "Cognito domain prefix (must be globally unique)"
}

variable "region" {
  type = string
}