# Getting Started — Your First Project

This guide walks you through everything from scratch. No coding experience needed.

---

## What Is This?

The **DS Strategy Stack** is your project's **second brain** — a pre-built workspace that remembers everything about your project (research, decisions, discovery calls, competitor intel) so nothing gets lost across sessions or team members.

It works with **Claude Code**, an AI assistant that lives in your terminal (the text-based interface on your computer). You talk to Claude, and it helps you:
- Organise your research into structured files
- Track prospects and competitors
- Make evidence-based decisions
- Generate a live dashboard showing your project's progress

Because Claude reads from the project's memory files every session, it always knows where you left off — like having a strategy consultant with perfect recall.

---

## What You'll Need

Before starting, you'll need three things installed on your computer:

1. **Git** — a tool for downloading and tracking changes to projects
2. **Node.js** — a tool that powers the dashboard (you won't need to write code)
3. **Claude Code** — the AI assistant that runs the project

Don't worry if you don't have these yet — we'll install them step by step.

---

## Step 1: Install Git

### On Mac
1. Open **Terminal** (press Cmd + Space, type "Terminal", press Enter)
2. Type `git --version` and press Enter
3. If Git isn't installed, your Mac will prompt you to install it — follow the prompts
4. If it shows a version number (like `git version 2.39.0`), you're good

### On Windows
1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Accept all the default settings
4. Open **Command Prompt** (press Win + R, type "cmd", press Enter)
5. Type `git --version` to confirm it's installed

---

## Step 2: Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS** version (the one that says "Recommended for most users")
3. Run the installer and accept all defaults
4. Open Terminal (Mac) or Command Prompt (Windows)
5. Type `node --version` — you should see something like `v18.17.0`

---

## Step 3: Install Claude Code

Claude Code is Anthropic's AI assistant for your terminal.

1. Go to https://claude.ai/code and follow the installation instructions for your platform
2. Once installed, type `claude` in your terminal to verify it works
3. You'll need an Anthropic account — create one if you don't have one

---

## Step 4: Create a GitHub Account (if you don't have one)

GitHub is where your project lives online. You'll need it for:
- Storing your project
- Deploying your dashboard (optional)
- Collaborating with others (optional)

1. Go to https://github.com and click "Sign up"
2. Follow the prompts to create your account
3. Choose the free plan — it has everything you need

---

## Step 5: Get the Template

1. Open Terminal
2. Navigate to where you want your project (e.g., `cd ~/Documents`)
3. Run this command:
   ```
   git clone https://github.com/DiffTheEnder/DSS-Claude-Stack.git my-strategy-project
   ```
   (Replace `my-strategy-project` with whatever you want to call your folder)
4. Move into the folder:
   ```
   cd my-strategy-project
   ```

---

## Step 6: Set Up Your Project

1. In your terminal (inside the project folder), start Claude:
   ```
   claude
   ```
2. Tell Claude to run the setup:
   ```
   /onboard
   ```
3. Claude will ask you questions about your project:
   - **Quick Start** (5 minutes): Just the basics — project name, what it's about, your hypothesis
   - **Full Setup** (15 minutes): Everything including scoring dimensions, kill conditions, and feature selection

4. Claude will ask what type of project you're running — market entry, growth strategy, competitor research, product launch, internal implementation, vendor evaluation, due diligence, business case, transformation, or custom. Each type comes with sensible defaults for which features to enable.

5. Claude will configure all the files based on your answers

**Tip**: If you're new to this, choose **Quick Start** and select **"Learning"** as your goal.

---

## Step 7: Deploy Your Dashboard (Optional)

Your project includes a live dashboard that shows your research, pipeline, and strategic progress as a website.

**Important:** The dashboard is a simple starting point — think of it as a 101-level view. Every project is different, so you should customise it as you go. Add new pages, create new data flows from your research to the dashboard, or build visualisations that make sense for your specific project. You can ask Claude to help — for example, "add a new dashboard page that shows our market sizing data" or "create a chart comparing vendor scores." The dashboard is yours to extend.

Here's how to put it online:

### Create a Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorise Vercel to access your GitHub account

### Push Your Project to GitHub
1. Go to https://github.com/new to create a new repository
2. Name it (e.g., `my-strategy-project`)
3. Choose **Private** (your strategy data should stay confidential)
4. Don't add a README (you already have one)
5. Follow the "push an existing repository" instructions GitHub shows you:
   ```
   git remote set-url origin https://github.com/YOUR-USERNAME/my-strategy-project.git
   git push -u origin main
   ```

### Connect to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your strategy project repository
4. **Important**: Set the **Root Directory** to `dashboard`
5. Vercel will auto-detect the build settings from `vercel.json`
6. Click "Deploy"
7. Wait 1-2 minutes — your dashboard will be live at a `.vercel.app` URL

### Auto-Deploy
Every time you push changes to GitHub (which `/session-end` does automatically), Vercel will rebuild and update your dashboard. No extra steps needed.

### Privacy Warning
**Your dashboard will be publicly accessible** at the Vercel URL unless you:
- Use Vercel's password protection (requires a paid plan)
- Keep the URL private and don't share it
- Use a private GitHub repo (the code is private, but the deployed site is still accessible to anyone with the URL)

For sensitive strategy work, consider whether a live dashboard is appropriate for your situation.

---

## Step 8: Start Working

Every time you sit down to work on your project:

1. Open Terminal, navigate to your project folder
2. Start Claude: `claude`
3. Tell Claude: `/session-start`
4. Claude will load your context and show you what's happening

When you're done:
1. Tell Claude: `/session-end`
2. Claude will save everything, update the dashboard, and commit your changes

---

## What Each Skill Does

Here's a plain-language guide to every skill available:

### Setup & Session
| Skill | What it does |
|-------|-------------|
| `/onboard` | Sets up a new project from the template (run once) |
| `/session-start` | Opens your project — loads context, shows priorities, checks for conflicts |
| `/session-end` | Closes your session — saves everything, updates dashboard, commits changes |
| `/health-check` | Runs a diagnostic on your project — finds issues and suggests fixes |
| `/rebuild-snapshots` | Refreshes the quick-loading summaries from your raw files |

### Research & Discovery
| Skill | What it does |
|-------|-------------|
| `/enrich-entity` | Deeply researches a competitor or prospect — fills in their dashboard profile |
| `/synthesise` | Pulls together research from multiple files into a structured summary |
| `/process-call` | After a meeting or call, structures your notes and updates everything automatically |

### Pipeline
| Skill | What it does |
|-------|-------------|
| `/pipeline-update` | Updates a prospect's status (e.g., "meeting booked" to "meeting completed") |
| `/outreach-sequence` | Designs a series of messages to reach out to a prospect |

### Analysis & Decisions
| Skill | What it does |
|-------|-------------|
| `/critical-reasoning` | Pressure-tests an idea — finds blind spots, challenges assumptions |
| `/decision` | Records a strategic decision with full context so you remember why you chose it |
| `/compare-options` | Scores and compares 2-5 strategic options side by side |

### Reporting
| Skill | What it does |
|-------|-------------|
| `/weekly-report` | Generates a summary of the week's progress for stakeholders |

---

## Things You Can Say to Claude

You don't need to memorise skills. You can talk to Claude in plain English and it will figure out what to do. Here are some real examples:

**After a meeting:**
> "Here's my meeting transcript from the call with Acme Corp. Can you analyse this against my existing research to see what it means for our current hypothesis?"

**When researching:**
> "Pull together everything we know about the competitive landscape and tell me where the biggest white space is."

> "I just found this industry report — read it and update our competitor research with anything new."

**When you need to decide something:**
> "We need to decide between building our own data pipeline vs. using a third-party vendor. Set up a comparison with the pros, cons, and scores."

> "Play devil's advocate on our go-to-market strategy. What are we not seeing?"

**Before a meeting:**
> "Prep me for my call with Nexus Payments tomorrow — what do we know about them and what should I ask?"

**Pipeline management:**
> "I have 3 new leads from a conference. Add them to the pipeline and draft a personalised outreach sequence for each."

> "Based on all the discovery calls so far, what patterns are emerging? Are we hearing the same pain points?"

**Getting a status update:**
> "Write a 2-paragraph update I can send to the board summarising where we are this week."

> "How close are we to hitting any of our kill conditions?"

The key idea: Claude has your full project context loaded — research, pipeline, decisions, hypothesis, scoring. So you can ask strategic questions and get answers grounded in your actual data, not generic advice.

---

## Common Questions

**Q: Do I need to know how to code?**
No. You talk to Claude in plain English. The only "commands" you need are the skill names (like `/onboard` or `/session-start`).

**Q: Can I use this for personal projects?**
Yes. It works for any project where you're making strategic decisions based on research — from choosing a business idea to evaluating job offers.

**Q: What if I make a mistake?**
Everything is tracked in Git (version control). You can always go back to a previous state. Ask Claude: "Can you undo the last change?"

**Q: Can multiple people work on the same project?**
Yes. The STATUS.md file coordinates who's working on what. Each person runs Claude Code in their own terminal.

**Q: How do I update to the latest template version?**
Check the CHANGELOG.md in the original repository for what's new. For major updates, it's often easiest to start fresh and re-run `/onboard`.

**Q: Is my data private?**
Your project files live on your computer and (optionally) in your private GitHub repository. If you deploy a dashboard to Vercel, the dashboard URL is accessible to anyone who has it. Don't put confidential information in the dashboard if you're concerned about privacy.
