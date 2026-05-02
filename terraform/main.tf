terraform {
  required_version = ">= 1.5"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# -----------------------------------------------------------------------------
# Zone — adds the domain to Nic's Cloudflare account.
# After apply, Cloudflare assigns 2 nameservers (see outputs).
# Nic must update the nameservers at iwantmyname.com to those values
# before the zone goes "active" and DNS records below take effect.
# -----------------------------------------------------------------------------
resource "cloudflare_zone" "domain" {
  account_id = var.cloudflare_account_id
  zone       = var.domain
  plan       = "free"
  type       = "full"
}

# Zone settings override removed for now — token lacks the required
# Zone Settings:Read permission to manage this resource. Cloudflare's
# Free-plan defaults already ship with Universal SSL, HTTP/3, and
# automatic HTTPS rewrites enabled, which covers the security baseline
# we need. Re-add this resource later if we want to tighten further
# (min_tls_version 1.2, security_level, etc.).
