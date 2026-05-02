# -----------------------------------------------------------------------------
# Cloudflare Pages — hosts the Astro site at dist/
#
# Two modes (controlled by var.enable_pages_github_source):
#
#   FALSE (default):  Direct Upload. Deploys are via `wrangler pages deploy dist`
#                     from a developer machine. No GitHub App install required.
#                     Use this until the Cloudflare Pages GitHub App is
#                     installed on the ElevationFire org.
#
#   TRUE:             GitHub source. Pushes to `main` trigger an automatic
#                     Cloudflare build. Requires the Cloudflare Pages GitHub
#                     App to be installed on the ElevationFire/elevation-fire-
#                     protection repo (Nic or a repo Admin must do this once
#                     via the Cloudflare dashboard).
#
# Flip the variable in terraform.tfvars when ready.
# -----------------------------------------------------------------------------

resource "cloudflare_pages_project" "site" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = "main"

  dynamic "source" {
    for_each = var.enable_pages_github_source ? [1] : []
    content {
      type = "github"
      config {
        owner                      = var.github_owner
        repo_name                  = var.repo_name
        production_branch          = "main"
        pr_comments_enabled        = false
        deployments_enabled        = true
        preview_deployment_setting = "none"
      }
    }
  }

  build_config {
    build_command   = "npm run build"
    destination_dir = "dist"
  }

  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION = "20"
      }
    }
    preview {
      environment_variables = {
        NODE_VERSION = "20"
      }
    }
  }
}

# Attach the apex and www to the Pages project. These resources cause Pages
# to provision SSL certs and recognize the hostnames as belonging to this
# project.
resource "cloudflare_pages_domain" "apex" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = var.domain
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.site.name
  domain       = "www.${var.domain}"
}
