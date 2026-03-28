# DS Strategy Stack (Claude Code)

> **Your project's second brain.** An open-source strategy framework for Claude Code that remembers everything — research, decisions, discovery calls, competitor intel, and strategic context — so nothing gets lost across sessions, conversations, or team members.

[![MIT Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

---

## Why a "Second Brain"?

Strategy projects generate enormous amounts of context: call notes, competitor research, market sizing, scoring matrices, executive memos. Most of it lives in someone's head or scattered across docs that nobody reads twice.

The DS Strategy Stack solves this by giving your project a **persistent memory layer** that Claude reads and writes to automatically. Every research finding, every decision rationale, every discovery call insight is captured in structured files that Claude loads on demand. When you start a new session, Claude doesn't start from scratch — it picks up exactly where you left off.

**How the second brain works:**

- **Memory files** (`memory/`) — persistent storage for research, discovery, decisions, and scoring. Updated by skills automatically.
- **Context snapshots** (`context/`) — pre-computed summaries that Claude loads instantly. Three loading modes (Fast, Standard, Deep) so you only pay for the context you need.
- **Evidence grading** — every claim is tagged `[CONFIRMED]`, `[SECONDARY]`, `[INFERENCE]`, or `[ASSUMPTION]`. The brain doesn't just remember — it remembers *how confident it is*.
- **Kill condition tracking** — falsifiable thresholds that tell you when to stop or pivot. The brain watches for signals that challenge your hypothesis.

No boilerplate. No blank-page problem. Clone, configure, and go.

![Dashboard Screenshot](dashboard/screenshot.png)

---

## New here?

**[Read the Getting Started Guide](docs/getting-started.md)** — a step-by-step walkthrough covering installation, configuration, and Vercel deployment. No programming knowledge needed.

---

## Quick Start

### Option A: npx (recommended)

```bash
npx create-dss-project my-project
cd my-project
claude
/onboard
```

The scaffolder asks 3 questions (project name, type, structure level) and sets up a ready-to-go project with the right modules pre-configured.

### Option B: Git clone

```bash
git clone https://github.com/DiffTheEnder/DSS-Claude-Stack.git my-project
cd my-project
claude
/onboard
```

Both paths end at `/onboard`, which walks you through the full configuration — **Quick Start** (7 questions) or **Full Setup** (16 questions). It configures your goals, hypothesis, scoring dimensions, and kill conditions, then generates your `project.config.json` and activates the right modules.

---

## Features

### Skills Library (14 skills)

| Skill | Phase | Description |
|-------|-------|-------------|
| `/onboard` | Setup | One-time project configuration wizard |
| `/session-start` | Session | Load context, check conflicts, show priorities |
| `/session-end` | Session | 10-step end-of-session housekeeping |
| `/health-check` | Quality | Project integrity audit and health score |
| `/rebuild-snapshots` | Session | Regenerate all context snapshots from raw files |
| `/pipeline-update` | Pipeline | Track entity status transitions |
| `/outreach-sequence` | Pipeline | Design multi-touch outreach cadences |
| `/process-call` | Discovery | Post-discovery-call structured processing |
| `/enrich-entity` | Research | Deep research and dashboard enrichment for an entity |
| `/synthesise` | Research | Cross-file research synthesis into structured memos |
| `/critical-reasoning` | Analysis | Pressure-test ideas with 4 lenses: truth, consequences, risks, feasibility |
| `/decision` | Analysis | Record strategic decisions with full rationale |
| `/compare-options` | Analysis | Score and compare 2–5 strategic options |
| `/weekly-report` | Reporting | Generate stakeholder-ready weekly summaries |

### Live Dashboard

- **7 pages**: Overview, Pipeline, Competitors, Decisions, Scoring, Timeline, Research Hub
- Warm cream/teal editorial design with dark mode
- Auto-rebuilds from markdown/CSV source files
- **Build freshness indicator** — see when data was last rebuilt
- Deploys to Vercel on push

> **Note:** The dashboard is intentionally a simple starting point — a 101-level view of your project. Every project is different, so we'd encourage you to add custom pages, new data flows, and visualisations that fit your specific context. The [Skill Authoring Guide](docs/skill-authoring-guide.md) and [Dashboard Architecture](dashboard/CLAUDE.md) docs explain how to extend both the skills and the dashboard. Ask Claude to help — "add a new dashboard page that shows X" works great.

### The Memory Layer — Your Project's Second Brain

The memory system is what makes this more than a template. It's how Claude retains and retrieves knowledge across sessions:

| File | What it remembers |
|------|-------------------|
| `memory/MEMORY.md` | Project priorities, status, and team context |
| `memory/research.md` | Competitor capability map and market findings |
| `memory/discovery.md` | Call log, pain points, willingness-to-pay signals |
| `memory/decisions.md` | Every strategic decision with full rationale |
| `memory/scoring.md` | Option scoring matrix with evidence-backed scores |

**Context snapshots** (`context/`) are pre-computed summaries built from these raw files. Claude loads snapshots for fast orientation, then dives into raw files when it needs the full picture.

**Three loading modes** control how much context Claude reads:

| Mode | When | What loads |
|------|------|------------|
| **Fast** | Pipeline updates, scheduling, housekeeping | Snapshot only |
| **Standard** | Research, competitor analysis, entity enrichment | Snapshot + targeted raw files |
| **Deep** | Hypothesis review, critical reasoning, strategic decisions | Snapshots + ALL raw evidence |

---

## Architecture

```
my-project/
├── CLAUDE.md                 # Agent instructions & context loading rules
├── STATUS.md                 # Multi-agent coordination board
├── project.config.json       # Project configuration (generated by /onboard)
├── memory/                   # The second brain — persistent strategic memory
├── context/                  # Pre-computed snapshots for fast loading
├── templates/                # Standard formats (call-prep, call-notes, entity-teardown)
├── research/                 # Raw research files (competitors, market, technical)
├── discovery/                # Customer/stakeholder discovery [optional]
├── data/                     # CSV/JSON source of truth
├── skills/                   # Project-level Claude Code skills
├── dashboard/                # Live web dashboard (Vercel-deployed)
├── docs/                     # Executive summary, memos, reports
└── scripts/                  # Utility scripts (health check, upgrade, validation)
```

---

## What Can You Ask Claude?

Beyond the built-in skills, you can talk to Claude in plain English. The stack gives Claude the context it needs to answer strategically — your research, pipeline, decisions, and hypothesis are all loaded into memory. Here are some things you might say:

### Research & Analysis

> "Here's my meeting transcript from the call with Acme Corp. Can you analyse this against my existing research to see what it means for our current hypothesis?"

> "Pull together everything we know about the competitive landscape and tell me where the biggest white space is."

> "I just found this industry report — read it and update our competitor research with anything new."

> "What are the strongest and weakest parts of our hypothesis right now? What evidence are we missing?"

### Discovery & Pipeline

> "I have 3 new leads from a conference. Add them to the pipeline and draft a personalised outreach sequence for each."

> "Based on all the discovery calls so far, what patterns are emerging? Are we hearing the same pain points?"

> "Prep me for my call with Nexus Payments tomorrow — what do we know about them and what should I ask?"

### Decision-Making

> "We need to decide between building our own data pipeline vs. using a third-party vendor. Set up a comparison with the pros, cons, and scores."

> "Play devil's advocate on our go-to-market strategy. What are we not seeing?"

> "We're about to commit to a product-led growth motion. Pressure-test this before we lock it in."

### Reporting & Status

> "Write a 2-paragraph update I can send to the board summarising where we are this week."

> "What's changed since last Monday? Give me a diff of all research and decisions."

> "How close are we to hitting any of our kill conditions?"

These are just starting points — you can ask Claude anything about your project and it will draw on the full context of your research, pipeline, and decisions to answer.

---

## Project Types

The `/onboard` wizard configures the stack based on your project type:

| Type | Discovery | Pipeline | Dashboard | Best For |
|------|:---------:|:--------:|:---------:|----------|
| Market Entry | Yes | Yes | Yes | New market or product evaluation |
| Growth Strategy | Yes | Yes | Yes | Existing product, new channels or segments |
| Competitor Research | No | No | Yes | Competitive intelligence and landscape mapping |
| Product Launch / GTM | Yes | Yes | Yes | Bringing a product or feature to market |
| Internal Implementation | No | Yes | Yes | Rolling out a system, process, or initiative |
| Vendor / Partner Evaluation | Yes | Yes | Yes | Selecting tools, platforms, or partners |
| Due Diligence | Yes | Yes | Yes | M&A, investment, or acquisition evaluation |
| Business Case | No | No | Optional | Building a case for investment or change |
| Transformation / Change | Yes | Yes | Yes | Organisational or process transformation |
| Custom | Choose | Choose | Choose | Anything else |

### Structure Levels

Not every project needs everything. Choose your structure level during setup:

| Level | What you get |
|-------|-------------|
| **Full** | All features: scoring, kill conditions, evidence grading, weekly reports, context snapshots |
| **Essentials** | Core features: research, pipeline, decisions, dashboard |
| **Minimal** | Bare bones: research and notes only |

Started with Minimal and need more? Run `bash scripts/upgrade-structure.sh full` to add the missing directories and files.

---

## Requirements

- [Claude Code](https://claude.ai/code) CLI
- Node.js 18+ (for dashboard)
- Git

---

## Documentation

- **[Getting Started Guide](docs/getting-started.md)** — step-by-step setup for non-technical users (install, configure, deploy)
- [Dashboard Deployment](dashboard/DEPLOY.md) — quick reference for deploying to Vercel
- [Executive Summary Template](docs/executive-summary.md) — master hypothesis and strategy memo
- [Evidence Grading Rules](docs/memos/evidence-grading.md) — how claims are tagged and verified
- [Skill Authoring Guide](docs/skill-authoring-guide.md) — build your own skills for the stack
- [Dashboard Architecture](dashboard/CLAUDE.md) — how the dashboard reads, builds, and renders data

---

## Contributing

Contributions are welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues, proposing features, and opening pull requests.

---

## Licence

MIT — see [LICENSE](LICENSE).
