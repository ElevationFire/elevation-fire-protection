# Terraform — Elevation Fire Protection

Manages all Cloudflare infrastructure for the Elevation Fire Protection website + email DNS in Nic's Cloudflare account.

## What this provisions

- Cloudflare zone for `elevationfireprotection.com` (free plan)
- Hardened zone settings (TLS 1.2+, HTTPS-only, brotli, HTTP/3)
- DNS records:
  - Apex + www → Cloudflare Pages (replaces old Squarespace records)
  - MX + autodiscover → Microsoft 365 / Outlook (preserves Nic's email)
  - SPF, Google site verification, DMARC TXT records
- Cloudflare Pages project tied to the GitHub repo
- Custom domains attached to Pages (apex + www)

## What you need before applying

1. **Nic's Cloudflare account ID** — find at https://dash.cloudflare.com → click any zone → right sidebar → "Account ID"
2. **Cloudflare API token** — create at https://dash.cloudflare.com/profile/api-tokens with these permissions on Nic's account:
   - **Account** — Cloudflare Pages: Edit
   - **Account** — Account Settings: Read
   - **Zone** — DNS: Edit
   - **Zone** — Zone: Edit
   - **Zone** — Zone Settings: Edit
   - **Zone Resources** — Include: All zones from account
3. **Domain not yet added to CF.** If you've already added `elevationfireprotection.com` to Nic's CF account through the dashboard, run `terraform import cloudflare_zone.domain <zone_id>` first, otherwise the apply will fail.

## Apply

```sh
cp terraform.tfvars.example terraform.tfvars
# Fill in the API token and account ID

terraform init
terraform plan       # review carefully before applying
terraform apply
```

After apply, `terraform output cloudflare_nameservers` prints the two nameservers Nic must paste into iwantmyname.com:

```sh
terraform output cloudflare_nameservers
```

## DNS handover sequence

1. **Apply** Terraform — creates zone + all records inside Nic's CF account.
2. **Send Nic the two nameservers** from the output.
3. **Nic logs into iwantmyname.com**, edits nameservers for `elevationfireprotection.com`, replaces both with the Cloudflare-assigned ones, saves.
4. **Wait 30 min – 2 hr** for propagation. Zone status in CF flips from "Pending" to "Active" once propagated.
5. **Verify email** still flows — send a test to `nic@elevationfireprotection.com` and confirm receipt.
6. **Verify site** — `https://elevationfireprotection.com` should serve the Astro Pages build.

## After the GitHub App is installed

Once the Cloudflare Pages GitHub App is installed on `ElevationFire/elevation-fire-protection`:

```hcl
# In terraform.tfvars:
enable_pages_github_source = true
```

```sh
terraform apply
```

Pushes to `main` will auto-deploy to production.

## Manual deploy (until GitHub source is enabled)

From repo root:

```sh
npm run build
wrangler pages deploy dist --project-name elevation-fire-protection --branch main
```

## State file

Terraform state lives in `terraform.tfstate` (gitignored). For multi-developer use, migrate state to a remote backend (R2 bucket or Terraform Cloud) before adding a second operator.
