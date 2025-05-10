variable "domain_name" {
  description = "The domain name for the Route 53 hosted zone"
  type        = string
}

variable "subdomain" {
  description = "The subdomain for the A record"
  type        = string
}

variable "a_record_values" {
  description = "The IP addresses for the A record"
  type        = set(string)
}

# variable "cname_subdomain" {
#   description = "The subdomain for the CNAME record"
#   type        = string
# }

# variable "cname_record_values" {
#   description = "The target for the CNAME record"
#   type        = list(string)
# }
