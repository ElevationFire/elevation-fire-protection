variable "cloudflare_api_token" {
  description = "Cloudflare API token scoped to Nic's account. Needs: Zone Read+Edit, DNS Edit, Pages Edit, Account Settings Read."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Nic's Cloudflare account ID (find in dash sidebar)."
  type        = string
}

variable "domain" {
  description = "Apex domain managed by this module."
  type        = string
  default     = "elevationfireprotection.com"
}

variable "github_owner" {
  description = "GitHub org/user that owns the site repo."
  type        = string
  default     = "ElevationFire"
}

variable "repo_name" {
  description = "GitHub repo name for the site."
  type        = string
  default     = "elevation-fire-protection"
}

variable "pages_project_name" {
  description = "Cloudflare Pages project name (must be unique within account, lowercase, hyphens)."
  type        = string
  default     = "elevation-fire-protection"
}

variable "google_site_verification" {
  description = "Existing Google site verification token. Migrate from current iwantmyname TXT."
  type        = string
  default     = "DSIeWJ5PQKJaNgS235_xc8AOl1cm7WWHfPgdwFtsvcs"
}

variable "enable_pages_github_source" {
  description = "Set true once the Cloudflare Pages GitHub App is installed on the repo. Until then, deploy via wrangler CLI (Direct Upload)."
  type        = bool
  default     = false
}
