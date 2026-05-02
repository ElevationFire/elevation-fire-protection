output "cloudflare_nameservers" {
  description = "Nameservers Nic must paste into iwantmyname.com to complete the DNS handover."
  value       = cloudflare_zone.domain.name_servers
}

output "zone_id" {
  description = "Cloudflare zone ID for the domain (used by other tooling and CI)."
  value       = cloudflare_zone.domain.id
}

output "pages_url" {
  description = "Cloudflare-provided pages.dev URL. Always works regardless of custom domain status."
  value       = "https://${cloudflare_pages_project.site.subdomain}"
}

output "site_url" {
  description = "Production custom-domain URL. Lives once nameservers are switched and Pages SSL provisions."
  value       = "https://${var.domain}"
}

output "www_url" {
  description = "www alias URL."
  value       = "https://www.${var.domain}"
}
