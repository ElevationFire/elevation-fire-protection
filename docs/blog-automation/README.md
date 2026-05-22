# Blog Automation — Setup Guide for Nic

This system writes a new fire-protection blog post every week, opens it as a "pull request" on GitHub, and pings you on Discord with a link. You review it on your phone or laptop. One click to publish.

**You will not need to install anything. Everything runs in the cloud.**

You will need:
- Your GitHub account (login at github.com)
- Your existing Discord webhook URL
- An Anthropic API key (paid — about $0.10–$0.50 per post)

Total setup time: **~30 minutes**. After that, fully hands-off except review/approve.

---

## How it works (1-minute overview)

```
   Monday 9am
       │
       ▼
   GitHub Actions  ──── calls ────▶  Claude API  ──── researches ───▶  Web
       │                                  │
       │                                  ▼
       │                            Writes blog post
       │                                  │
       ▼                                  │
   Opens Pull Request  ◀──────────────────┘
       │
       ▼
   Posts to Discord webhook  "New blog post ready: [link]"
       │
       ▼
   You: open link on phone, read, click "Merge"
       │
       ▼
   Cloudflare Pages auto-deploys ──────▶ Live on elevationfireprotection.com
```

No bots running on your computer. No reminders to launch anything. Cloud handles it.

---

## Step 1 — Get an Anthropic API key

This is what powers the blog-writing AI.

1. Go to **https://console.anthropic.com/**
2. Sign up (use the same email as your Microsoft 365 / business email if you want).
3. Click **Billing** → add a credit card. Start with **$20 in credit**. That's enough for ~100 blog posts.
4. Click **API Keys** → **Create Key**.
5. Name it `elevation-blog-bot`.
6. **Copy the key.** It looks like `sk-ant-api03-xxxxxxxxxxxxx...`
7. Paste it somewhere safe for now. You'll add it to GitHub in Step 3.

**This key is like a password. Never share it. Never put it in a chat or email.**

---

## Step 2 — Confirm Discord webhook works

You said you already have a Discord webhook URL. It looks like:

```
https://discord.com/api/webhooks/1234567890/aBcDeFgHiJkLmNoPqR...
```

Test it from your terminal or phone:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"content":"Blog automation test — if you see this, the webhook works."}' \
  YOUR_WEBHOOK_URL_HERE
```

If you don't want to use a terminal, ask Travis to test it for you. If the message shows up in your Discord channel, you're good.

If you DON'T have a webhook yet:

1. Discord → your server → channel where you want notifications → **gear icon** → **Integrations** → **Webhooks** → **New Webhook**.
2. Name it "Blog Bot". Pick the channel.
3. **Copy Webhook URL**.

---

## Step 3 — Add secrets to GitHub

GitHub Actions needs two secrets: your Anthropic API key and your Discord webhook URL. These are stored encrypted on GitHub — never visible in logs.

1. Go to your repo: **https://github.com/ElevationFire/elevation-fire-protection**
2. Click **Settings** (top menu, far right).
3. Left sidebar: **Secrets and variables → Actions**.
4. Click **New repository secret**.

Add these one at a time:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | Your `sk-ant-...` key from Step 1 |
| `DISCORD_WEBHOOK_URL` | Your Discord webhook URL from Step 2 |

That's it. GitHub now has what it needs.

---

## Step 4 — Turn on the schedule

The blog-writer workflow is already in your repo at `.github/workflows/blog-draft.yml`. It will run **every Monday at 9:00 AM Mountain Time** automatically once enabled.

1. Go to **https://github.com/ElevationFire/elevation-fire-protection/actions**
2. If you see a banner saying "Workflows aren't being run on this repository," click **I understand my workflows, go ahead and enable them**.
3. In the left sidebar, click **Draft weekly blog post**.
4. Click **Enable workflow** (top right) if it's disabled.

To test it right now without waiting until Monday:
1. Same page → **Run workflow** dropdown (right side) → **Run workflow** button.
2. Wait 2–3 minutes.
3. Check Discord — you should get a notification.

---

## Step 5 — Approve a post

When you get a Discord notification:

1. Click the link. It opens a GitHub Pull Request.
2. Read the post. Check for:
   - Accuracy (NFPA codes, dates, company names)
   - Tone (sounds like Elevation, not corporate)
   - Length (should be 800–1200 words)
3. If it looks good: click **Merge pull request** (green button) → **Confirm merge**.
4. If it needs changes: click **Files changed** → click the pencil icon on the file → edit → click **Commit changes**. Then merge.
5. If you want to reject: click **Close pull request** (no merge). It will not publish.

Once merged, Cloudflare Pages deploys it automatically. Live within **2 minutes** at `elevationfireprotection.com/blog/your-post-slug`.

You can review on your phone — GitHub's mobile site works fine.

---

## Step 6 — Edit the writing voice (optional)

The "personality" of the writer lives in [`docs/blog-automation/AUTHOR-PROMPT.md`](AUTHOR-PROMPT.md). This is a plain text file that tells Claude:
- Who Elevation Fire Protection is
- What topics to cover
- The tone of voice
- What competitors NOT to bad-mouth
- What NFPA codes to reference

If you want to change the writing style, you (or Travis) can edit that file in GitHub directly via the browser. The next scheduled run will use the new instructions.

---

## Troubleshooting

**No Discord notification after 5 minutes:**
- Go to Actions tab on GitHub. Click the most recent run. Look for red ❌. The error message will explain what failed.
- Most common: API key has no credit (add more $$ at console.anthropic.com → Billing).

**Discord ping but no PR link:**
- The workflow failed before posting the PR. Same place — check Actions tab.

**Post is bad:**
- Just close the PR (no merge). Costs you 30 seconds. Next week's run is a fresh attempt.

**Want to change the schedule:**
- Edit `.github/workflows/blog-draft.yml` line `cron:` — current value `'0 15 * * 1'` = Monday 15:00 UTC = 9 AM Mountain. Use https://crontab.guru/ to pick a new time.

**Want to pause it:**
- Actions tab → "Draft weekly blog post" → "..." menu → Disable workflow. Re-enable any time.

---

## Cost summary

- **Anthropic API**: ~$0.10–$0.50 per blog post (Claude Sonnet 4.6 + web search). $5–$25/year.
- **GitHub Actions**: Free for public repos. Free up to 2000 min/month for private. We use ~3 min per run = 12 min/month.
- **Cloudflare Pages**: Free.
- **Discord webhook**: Free.

Total: probably under **$30/year** for the whole automation.

---

## What this does NOT do

- It does not promote posts on social media. (You or a marketer can do that manually with the published URL.)
- It does not respond to comments. (No comment system on the site yet.)
- It does not check Google rankings. (Separate tool.)
- It does not write about specific competitors. The prompt explicitly forbids naming them.

---

## Questions?

Talk to Travis. This document lives in your repo so it can be updated as we go.
