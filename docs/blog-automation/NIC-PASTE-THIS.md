Hi Claude. I'm Nic, owner of Elevation Fire Protection in Denver. I am not technical. Travis (my web guy) sent me this prompt to paste into you. You are going to walk me through setting up an automated blog-writing system for my website `elevationfireprotection.com`. Take your time, be patient, ask me one question at a time, and never assume I know what something means.

# What we are building

Two scheduled "routines" that run inside you (Claude Code):

1. **Blog writer routine** — runs once a week. Researches fire-protection topics, writes a new blog post, opens a Pull Request on my GitHub repo, and posts a notification to my Discord channel.

2. **Blog approval checker routine** — runs twice a day. Checks GitHub for blog Pull Requests that I've approved (by reacting with ✅ in Discord OR by clicking Approve on GitHub — you'll help me set up whichever is easier). When approved, it merges the PR so the post goes live.

The website is already built. The repo is `ElevationFire/elevation-fire-protection` on GitHub. The site auto-deploys via Cloudflare Pages when anything is merged to `main`.

# Information I have

- GitHub repo: `ElevationFire/elevation-fire-protection`
- Discord webhook URL: (I will give this to you when you ask)
- Anthropic API key: I do not have one yet — you will tell me how to get it if we need one (we may not, since you are already Claude)
- Anthropic account email: same as my business email `nic@elevationfireprotection.com`

# Your job, step by step

Please work through this in order. After each step, **stop and tell me what you did and what I need to do next**. Do not run multiple steps at once.

## Step 1 — Confirm what is installed

Run checks for:
- `claude --version` (Claude Code itself)
- `gh --version` (GitHub CLI)
- `git --version`
- `node --version`

Tell me which of these are installed. For each one that is NOT installed, give me a single copy-paste command I can run in Terminal to install it. On my Mac you should use Homebrew (`brew install ...`). If Homebrew itself isn't installed, give me the one-line install command for that too.

After I install whatever was missing, ask me to confirm before moving to Step 2.

## Step 2 — Set up SSH keys for GitHub

SSH keys let your computer talk to GitHub without passwords or browser popups. This is critical — the routines run automatically and cannot open a browser to log in. We set this up once and never touch it again.

Walk me through each sub-step, one at a time:

### 2a — Generate the SSH key

Run this command for me. Do not change the email:

```
ssh-keygen -t ed25519 -C "nic@elevationfireprotection.com"
```

When it asks "Enter file in which to save the key," just press Enter (accept the default `~/.ssh/id_ed25519`).

When it asks for a passphrase, just press Enter twice (no passphrase — easier for automation).

Confirm the key was created by running `ls ~/.ssh/id_ed25519*` — you should see two files.

### 2b — Copy the public key

Run:

```
pbcopy < ~/.ssh/id_ed25519.pub
```

Tell me: "Your SSH public key is now on your clipboard. Open your browser and go to https://github.com/settings/keys"

Then walk me through:
1. Click **New SSH key**
2. Title: `Elevation Mac`
3. Key type: **Authentication**
4. Paste (Cmd+V) into the "Key" field
5. Click **Add SSH key**

If GitHub asks me to confirm my password, tell me that's normal.

### 2c — Test the SSH connection

Run:

```
ssh -T git@github.com
```

If it asks "Are you sure you want to continue connecting?" I should type `yes`.

Expected success output: `Hi <username>! You've successfully authenticated...`

If it fails, stop and troubleshoot before continuing.

### 2d — Set up GitHub CLI auth (one-time)

The routines also need `gh` (GitHub CLI) to create Pull Requests and merge them. Run:

```
gh auth login
```

Choose: GitHub.com → SSH → the key we just created → Login with a web browser.

This is a one-time browser popup. After this, `gh` commands work forever without a browser.

Run `gh auth status` and confirm access to `ElevationFire/elevation-fire-protection`.

If I am NOT listed as a collaborator on that repo, tell me — I may need to ask Travis to invite me.

## Step 3 — Clone the repo locally

Pick a sensible folder (probably `~/Projects/elevation-fire-protection` or `~/Documents/elevation-fire-protection`). Ask me which I prefer. Then:

```
git clone git@github.com:ElevationFire/elevation-fire-protection.git <path>
cd <path>
npm install
```

Confirm the install succeeded (it might take a minute). Read the file `docs/blog-automation/AUTHOR-PROMPT.md` — this is the writing voice and SEO rules the blog author must follow. Confirm to me that you read it and summarize it back in two sentences so I know you understood.

## Step 4 — Set up the blog content collection

Currently the repo has folders prepared but no Astro "content collection" wiring for blog posts. Please:

1. Create `src/content/config.ts` with an Astro content collection schema for blog posts. The frontmatter fields should be: `title` (string), `description` (string, max 155), `pubDate` (date), `author` (string, default "Elevation Fire Protection"), `slug` (string), `tags` (array of strings).
2. Create `src/pages/blog/index.astro` — a listing page showing all blog posts in reverse-chronological order, styled to match the existing site (use the existing `Layout.astro` component).
3. Create `src/pages/blog/[...slug].astro` — the individual post page, again using `Layout.astro`. Render the Markdown body. Show title, pubDate, and author.
4. Add a "Blog" link to the existing site header navigation in `src/components/Header.astro`.
5. Add an `Article` JSON-LD schema component for individual post pages.
6. Run `npm run build` and confirm there are no errors. If the build fails, fix it. Do not move on until the build is clean.

Show me the changes you made by running `git status` and `git diff --stat`. Ask me to confirm before committing.

## Step 5 — Save the Discord webhook URL securely

I will paste my Discord webhook URL into chat when you ask. Once I do:

1. **Do not write the URL into any file that gets committed to git.** This is a secret.
2. Save it into a local file `~/.config/elevation-blog/webhook` (create the directory if needed) with file mode `600`.
3. Add `.env`, `.env.local`, and `~/.config/elevation-blog/` to `.gitignore` if not already there.
4. Confirm to me: "Webhook saved at ~/.config/elevation-blog/webhook, not in git."

Then ask me to paste the webhook URL.

## Step 6 — Get an Anthropic API key (only if needed)

You — the Claude Code session running on my computer — can write blog posts directly without needing a separate API key, because the routine will fire YOU as a fresh session each time. So we **may not need** an API key at all.

Confirm to me: "The routines will use this Claude Code account, so we do not need a separate Anthropic API key. Move to Step 7." 

If for any reason you DO need an API key (for example, if you decide to run a sub-tool that needs one), pause and tell me, and I'll go get one at console.anthropic.com.

## Step 7 — Commit and push the blog scaffolding

```
git checkout -b add-blog-scaffolding
git add src/content/config.ts src/pages/blog/ src/components/Header.astro [any other files you touched]
git commit -m "Add blog content collection, listing page, and post page"
git push -u origin add-blog-scaffolding
gh pr create --title "Add blog scaffolding" --body "Sets up content collection, listing page, post page, header link, and Article schema for blog posts."
```

Then merge that PR yourself with `gh pr merge --merge --delete-branch`. This is just plumbing, no review needed.

Confirm to me: "Blog scaffolding is live on the site." Wait ~2 minutes for Cloudflare to deploy and verify `https://elevationfireprotection.com/blog/` returns a 200.

## Step 8 — Create the "Blog writer" routine

This is the main automation. In Claude Code, create a Routine with these settings:

- **Name**: `Elevation blog writer`
- **Schedule**: Every Monday at 8:00 AM Mountain Time. (Adjust to my local time zone — ask me to confirm I'm in Mountain Time.)
- **Type**: Remote if available (so it runs even when my Mac is asleep). If only Local is available, set Local and tell me my Mac needs to be awake at 8 AM Mondays.
- **Working directory**: the repo path from Step 3.
- **Prompt** (the full instructions for the routine — write it out below):

```
You are the Elevation Fire Protection blog author. Your job today is to research one fire-protection topic, write a 800–1200 word blog post, open a Pull Request on GitHub with the post, and notify the owner on Discord.

Steps:

1. cd into the repo directory.
2. git pull origin main to make sure you have the latest.
3. Read `docs/blog-automation/AUTHOR-PROMPT.md` IN FULL. Follow every rule in it without exception. Pay especially close attention to the COMPETITORS section — never name a competitor, never criticize one.
4. Search the web for fire-protection news, NFPA updates, or industry developments from the past 7 days. Pick one topic that fits the audience (commercial property managers, GCs, building owners on the Front Range).
5. Write the blog post. Output format must match the exact Markdown structure specified in AUTHOR-PROMPT.md (frontmatter + body).
6. Save the post to `src/content/blog/<slug>.md` where `<slug>` matches the slug in the frontmatter.
7. Run `npm run build` to verify the post compiles without errors. Fix any errors before continuing.
8. Create a new git branch named `blog/<slug>`, commit the post with message `Add blog post: <title>`, push the branch.
9. Open a Pull Request with `gh pr create`. Title = the post title. Body should include:
   - A 2-sentence summary of the post.
   - A preview link (Cloudflare Pages will auto-build a preview).
   - The line: "React with ✅ on the Discord notification OR click Approve on this PR to publish."
10. Read the Discord webhook URL from `~/.config/elevation-blog/webhook`.
11. POST a message to that webhook with the PR URL, the post title, and the first ~200 characters of the post as a preview. Format the message so it's easy to read on mobile.
12. Report back what you did: PR URL, blog title, word count, sources cited.

If anything fails, stop and post an error to Discord instead of continuing. Do not commit half-finished work.
```

After creating the routine, **run it once manually** to test. Verify:
- A PR shows up at `https://github.com/ElevationFire/elevation-fire-protection/pulls`
- A message arrives in my Discord channel

Show me the PR URL and the Discord message. Then ask me to read it.

## Step 9 — Create the "Approval checker" routine

Second routine:

- **Name**: `Elevation blog approval checker`
- **Schedule**: Every day at 9:00 AM and 5:00 PM Mountain Time.
- **Type**: Remote if available, otherwise Local.
- **Prompt**:

```
You check whether any pending blog Pull Requests have been approved by Nic, and if so, merge them.

Steps:

1. cd into the repo directory.
2. Run `gh pr list --label blog --state open --json number,title,url,reviews,reactions` (or the equivalent — adapt as needed).
3. For each open blog PR:
   a. Check if Nic approved it on GitHub (look for an approval review from his GitHub user).
   b. ALSO check Discord: read recent messages from the webhook channel. If the message linking to this PR has a ✅ reaction from Nic, treat that as approval. [Note: webhook messages may not be readable via the webhook itself — use the Discord MCP server if available, otherwise just rely on GitHub approvals.]
4. If approved by either path:
   - Run `gh pr merge <number> --merge --delete-branch`
   - Post to Discord: "Published: <title>. Live in 2 minutes at <url>"
5. If a PR has been open more than 7 days with no approval, post a Discord reminder: "PR still pending: <title> — <url>"
6. Report what you did.

Do not merge any PR that is not labeled `blog`. Do not merge any PR without confirmed approval.
```

After creating, **run it once manually** to test. With no PRs approved yet it should do nothing — that's correct.

## Step 10 — Label the blog PR

The approval checker only looks at PRs with the `blog` label, so the writer routine must add that label. Update the Step 8 prompt's `gh pr create` line to include `--label blog`. If the label doesn't exist yet, create it:

```
gh label create blog --description "Auto-generated blog post" --color "0E8A16"
```

Run that command now.

Then go back to the most recent PR the writer routine created and add the label manually:

```
gh pr edit <number> --add-label blog
```

## Step 11 — Test the full loop

1. Manually trigger the writer routine. Confirm new PR + Discord message.
2. On the PR, click **Approve** (browser).
3. Manually trigger the approval checker routine. Confirm the PR gets merged and a "Published" message lands in Discord.
4. Wait 2 minutes. Visit `https://elevationfireprotection.com/blog/` — the new post should be live.

## Step 12 — Hand back to me

Show me a summary:
- Blog writer routine: created, schedule, last test result
- Approval checker routine: created, schedule, last test result
- Test PR: URL + final published URL
- What I need to do every week: just react ✅ in Discord OR click Approve on GitHub
- How to pause if I'm on vacation: open Claude Code → Routines → click the routine → toggle "Paused"
- How to edit the writing voice: edit `docs/blog-automation/AUTHOR-PROMPT.md` in the GitHub web editor, the next run will use the new instructions

# Rules for you (the Claude Code session helping me)

- I am not technical. Explain everything in plain English. No jargon unless you define it.
- One step at a time. Stop and wait for my confirmation before moving to the next step.
- If a command fails, do not retry blindly. Tell me what failed and ask what I want to do.
- Never commit secrets (the Discord webhook URL, any API keys) to git.
- If you are unsure whether something is safe (deleting files, force-pushing, etc), ask me first.
- If Travis (my web guy) needs to be looped in at any point, say so clearly and I'll text him.

Begin with Step 1.
