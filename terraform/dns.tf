# -----------------------------------------------------------------------------
# DNS records
#
# This recreates the records currently live at iwantmyname.com that we want to
# preserve, plus the new records that point the apex + www at Cloudflare Pages.
#
# Records intentionally NOT brought over from the old setup:
#   - Squarespace A records on the apex   (replaced by Pages)
#   - Squarespace CNAME on www            (replaced by Pages)
#   - Google `mail` CNAME (ghs.googlehosted.com) — believed legacy/unused
#
# Verify with Nic before applying — if anything below is wrong, edit here.
# -----------------------------------------------------------------------------

# ----- APEX --------------------------------------------------------
# Apex CNAME-flattened to Pages. CF "flatten_cname" is implicit when
# you CNAME the apex through their proxy.
resource "cloudflare_record" "apex" {
  zone_id = cloudflare_zone.domain.id
  name    = "@"
  type    = "CNAME"
  content = "${var.pages_project_name}.pages.dev"
  proxied = true
  ttl     = 1
  comment = "Cloudflare Pages — Elevation Fire Protection site"
}

# ----- WWW --------------------------------------------------------
resource "cloudflare_record" "www" {
  zone_id = cloudflare_zone.domain.id
  name    = "www"
  type    = "CNAME"
  content = "${var.pages_project_name}.pages.dev"
  proxied = true
  ttl     = 1
  comment = "Cloudflare Pages — www alias"
}

# ----- EMAIL: Microsoft 365 / Outlook -----------------------------
# Inbound mail.
resource "cloudflare_record" "mx_outlook" {
  zone_id  = cloudflare_zone.domain.id
  name     = "@"
  type     = "MX"
  content  = "elevationfireprotection-com.mail.protection.outlook.com"
  priority = 0
  proxied  = false
  ttl      = 3600
  comment  = "Microsoft 365 / Outlook MX"
}

# Outlook autodiscover for client config (Outlook desktop, mobile mail apps).
resource "cloudflare_record" "autodiscover" {
  zone_id = cloudflare_zone.domain.id
  name    = "autodiscover"
  type    = "CNAME"
  content = "autodiscover.outlook.com"
  proxied = false
  ttl     = 3600
  comment = "Microsoft 365 autodiscover"
}

# ----- TXT: SPF (sender authentication for Outlook) ---------------
resource "cloudflare_record" "spf" {
  zone_id = cloudflare_zone.domain.id
  name    = "@"
  type    = "TXT"
  content = "\"v=spf1 include:spf.protection.outlook.com -all\""
  proxied = false
  ttl     = 3600
  comment = "SPF — authorize Outlook as sender"
}

# ----- TXT: Google site verification (preserve existing) -----------
resource "cloudflare_record" "google_site_verification" {
  zone_id = cloudflare_zone.domain.id
  name    = "@"
  type    = "TXT"
  content = "\"google-site-verification=${var.google_site_verification}\""
  proxied = false
  ttl     = 3600
  comment = "Google Search Console / GBP domain verification"
}

# ----- DMARC (recommended add — was missing on iwantmyname) -------
# Quarantine policy — flags suspicious mail rather than rejecting outright,
# safe starting position. Tighten to p=reject after monitoring.
resource "cloudflare_record" "dmarc" {
  zone_id = cloudflare_zone.domain.id
  name    = "_dmarc"
  type    = "TXT"
  content = "\"v=DMARC1; p=quarantine; rua=mailto:nic@${var.domain}; ruf=mailto:nic@${var.domain}; fo=1; adkim=r; aspf=r;\""
  proxied = false
  ttl     = 3600
  comment = "DMARC policy — quarantine misaligned mail, report to Nic"
}
