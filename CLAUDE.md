# Elevation Fire Protection — Project Memory

## Project Overview
Marketing website for Elevation Fire Protection LLC, a Denver-based fire sprinkler contractor serving Colorado and Wyoming. Built with Astro + Tailwind CSS, hosted on Cloudflare Pages.

## Paths
- **Project root:** `C:\Users\NicQuinones\OneDrive - Elevation Fire Protection LLC\Desktop\elevation-fire-protection-main\elevation-fire-protection-main`
- **Blog posts:** `src/content/blog/`
- **Pages:** `src/pages/`
- **Components:** `src/components/`
- **Site data:** `src/data/site.ts`

## Git & Deployment
- **Remote:** `git@github.com:ElevationFire/elevation-fire-protection.git`
- **Branch:** `main`
- **Deploy:** Cloudflare Pages auto-deploys on push to `main`
- **SSH key:** Already set up at `~/.ssh/id_ed25519` for `ElevationFire` GitHub account
- **Always `git pull origin main` before making any changes or commits**

## Tech Stack
- Astro v6 + Tailwind CSS v4
- Node 22
- Cloudflare Pages

## Business Info
- **Brand:** Elevation Fire Protection
- **Legal:** Elevation Fire Protection LLC
- **Phone:** (720) 382-9669
- **Email:** nic@elevationfireprotection.com
- **Founded:** 2016
- **Service area:** Denver, Aurora, Boulder, Fort Collins (CO) + Cheyenne (WY)

## Site Structure
- `/` — Homepage (hero, services grid, Elevation Advantage, service areas, GC section, trust signals)
- `/services/inspections-and-testing/`
- `/services/service-and-repair/`
- `/services/fire-pump-testing/`
- `/services/backflow-testing/`
- `/locations/[denver|aurora|boulder|fort-collins|cheyenne]/`
- `/blog/` — Blog index + individual posts
- `/projects/` — Projects showcase page

## Blog Workflow
1. `git pull origin main` first
2. Write post as `.md` in `src/content/blog/`
3. Send to Discord for approval BEFORE committing
4. After user approves, commit and push

### Blog post rules
- Frontmatter fields: `title`, `description`, `pubDate`, `author`, `slug`, `tags`
- **Description MUST be 155 characters or fewer** — build will fail if over
- Tone: conversational, direct, written like someone who does this work — no AI filler phrases
- Length: 600–900 words
- Include 2–4 internal links to `/services/` or `/locations/` slugs
- No duplicate topics — check existing posts first

### Scheduled blog task
- Task ID: `elevation-weekly-blog-post`
- Runs: Every Monday at 8 AM
- Sends post to Discord for approval, does NOT auto-push

## Discord
- **Webhook URL:** `https://discord.com/api/webhooks/1507401051907555399/pKfVUUF1MKTdD0VX8o01ossZtehpr6BG-RsPCGYQYWQWbs500fwW-ZRf7lAlb0mK2b4a`
- Use for sending blog posts for approval before publishing
- Discord message limit: 2000 characters — split long content across multiple messages
- Use embeds for metadata, plain messages for post content

## Key Components
- **Header.astro** — sticky nav with Services + Locations dropdowns, Projects, Blog tabs
- **Footer.astro** — logo/description, Services, Service Area, 24/7 Emergency (phone + email)
- **Testimonials section** in footer — currently empty, ready for real customer reviews. Add reviews to the `testimonials` array in Footer.astro

## Content Rules
- Internal links use slugs: services → `inspections-and-testing`, `service-and-repair`, `fire-pump-testing`, `backflow-testing`
- Location slugs: `denver`, `aurora`, `boulder`, `fort-collins`, `cheyenne`
- Site data (phone, email, address, etc.) lives in `src/data/site.ts` — use `site.*` variables, don't hardcode

## Git Commit Style
Always use descriptive commit messages. Co-author line:
`Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
