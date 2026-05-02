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

# Hardening defaults — always-on HTTPS, modern TLS, etc.
resource "cloudflare_zone_settings_override" "domain" {
  zone_id = cloudflare_zone.domain.id

  settings {
    always_use_https         = "on"
    automatic_https_rewrites = "on"
    min_tls_version          = "1.2"
    ssl                      = "full"
    tls_1_3                  = "on"
    brotli                   = "on"
    http3                    = "on"
    zero_rtt                 = "on"
    websockets               = "on"
    security_level           = "medium"
    browser_check            = "on"
    challenge_ttl            = 1800
  }
}
