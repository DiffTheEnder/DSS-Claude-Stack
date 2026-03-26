---
name: onboard
description: One-time setup skill. Guides the user through a series of questions to configure this project template for their specific strategy project. Run once at the start of a new project, then delete or archive this skill.
---

# Project Onboarding

**One-time use** — run this when starting a new project from the strategy template. It replaces all `{{PLACEHOLDER}}` values and configures optional modules.

---

## Setup Mode Selection

Before starting, ask the user which mode they prefer:

> **Quick Start** or **Full Setup**?
>
> - **Quick Start** — 5 questions only. I'll auto-fill sensible defaults for everything else. Good if you want to get going fast and fine-tune later.
> - **Full Setup** — 13 questions across 6 groups. Full control over every setting.

### Quick Start Mode

Ask only these 5 questions:

1. **What's the project name?** (e.g., "Immutable Audience — Mobile")
2. **One-line description** — what is this project about in one sentence? (e.g., "Evaluate the mobile gaming market for audience monetisation opportunities")
3. **What's the core hypothesis or strategic bet?** (e.g., "Mobile gamers aged 18–30 will pay for premium audience insights if delivered in-app")
4. **What type of project is this?** — Market entry / Growth strategy / Corporate strategy / Custom
5. **What's the primary entity you're tracking?** (e.g., "studio", "customer", "partner") — enter "none" to skip the discovery module entirely

Then auto-fill defaults:
- `{{GOAL}}` → "Validate hypothesis and produce a go/no-go recommendation within 8 weeks"
- `{{TEAM}}` → "TBD — update in MEMORY.md"
- `{{SCOPE_DEFINITION}}` → "Defined by hypothesis — refine after initial discovery"
- `{{OUT_OF_SCOPE}}` → "TBD — update in MEMORY.md"
- `{{ICP_DESCRIPTION}}` → "TBD — update in MEMORY.md"
- `{{PIPELINE_SOURCE_OF_TRUTH}}` → `data/entities.csv`
- `{{DASHBOARD_URL}}` → "TBD"
- Scoring dimensions → White Space, Urgency, Feasibility, Defensibility, Revenue Potential
- Kill conditions → "TBD — define within first week"
- Discovery module → included unless user answered "none" for entity type
- Dashboard module → included by default

After auto-filling, proceed directly to the **Validation / Dry-Run Step**, then continue with replacement.

### Full Setup Mode

Run the complete question flow below (Group 0 through Group 6).

---

## How to Run

Tell the user: "I'll walk you through setting up this project. I'll ask a series of questions, then update all template files with your answers."

---

## Question Flow

Ask these questions **one group at a time**. Wait for answers before proceeding.

### Group 0: Prerequisites Check

Before asking any project questions, verify the environment is ready.

1. **Check Node.js is installed**:
   ```bash
   node --version
   ```
   If not found, warn: "Node.js is required for building the dashboard. Install it from https://nodejs.org before continuing, or skip the dashboard module."

2. **Check for fresh template**:
   Scan `memory/MEMORY.md` for any non-placeholder content — if the template placeholders (`{{PROJECT_NAME}}`, `{{GOAL}}`, etc.) are already gone (i.e., replaced with real values), warn:
   > "This doesn't look like a fresh template — MEMORY.md already contains non-placeholder content. Are you sure you want to continue? This may overwrite existing project data."

   Wait for confirmation before proceeding.

3. **Check git is configured**:
   ```bash
   git config user.name
   ```
   If empty, warn: "Git user.name is not set. Run `git config --global user.name 'Your Name'` to configure it."

Once all checks pass (or the user acknowledges warnings), proceed to Group 1.

---

### Group 1: Project Identity

1. **What's the project name?** (e.g., "Immutable Audience — Mobile", "Acme Growth Strategy")
2. **One-line description** — what is this project about in one sentence? (e.g., "Evaluate the mobile gaming market for audience monetisation opportunities")
3. **What's the goal?** — a specific, measurable objective with a deadline (e.g., "Validate product-market fit with 20 customer interviews and a go/no-go recommendation by 30 June 2026")
4. **Who's on the team?** — names and roles (e.g., "Dhanish (discovery), Sherry & Jeet (product)")

### Group 2: Strategic Context

5. **What's the scope?** — what's in scope and what's explicitly out of scope? (e.g., In scope: "ANZ mobile gaming studios with >$1M revenue." Out of scope: "Console gaming, studios outside ANZ")
6. **What's the core hypothesis or strategic bet?** — the thing you're trying to prove or disprove (e.g., "Mid-tier mobile studios will pay $2k+/mo for real-time audience analytics because existing tools have a 48-hour lag")
7. **Who's the target customer/ICP?** — describe the ideal customer profile (e.g., "Head of Growth at a mobile gaming studio, 10–50 employees, $1M–$10M ARR, currently using Firebase + manual spreadsheets")

### Group 3: Project Type & Modules

8. **What type of project is this?**
   - Market entry (new market, new product) → include all modules (e.g., "Launching a new analytics SaaS into the mobile gaming vertical")
   - Growth strategy (existing product, new channels/segments) → include discovery + pipeline (e.g., "Expanding our enterprise plan into the ANZ mid-market")
   - Corporate strategy / planning (internal analysis) → skip discovery + pipeline (e.g., "Annual strategic review and resource allocation for FY27")
   - Custom → ask which modules to include

9. **Do you need a discovery/outreach pipeline?** (Yes/No)
   - If yes: What's the primary entity you're tracking? (e.g., "studio", "customer", "partner", "company")
   - If no: Will skip discovery/, pipeline, outreach-sequence skill, gtm-specialist agent, discovery-strategist agent

10. **Do you have a CSV source-of-truth file yet?** (Yes/path or No)
    - If yes: use that path for `{{PIPELINE_SOURCE_OF_TRUTH}}` (e.g., "data/gaming-studios.csv")
    - If no: default to `data/entities.csv`

### Group 4: Dashboard & Deployment

11. **Do you want a live dashboard?** (Yes/No)
    - If yes: What Vercel project name or URL? → sets `{{DASHBOARD_URL}}` (e.g., "https://acme-strategy.vercel.app")
    - If no: Dashboard files can be deleted

### Group 5: Scoring Dimensions

12. **What dimensions do you want to score your strategic options on?** (e.g., White Space, Urgency, Feasibility, Defensibility, Revenue Potential)
    - Suggest defaults based on project type
    - Update `memory/scoring.md` with chosen dimensions
    - Example: "We use: Market Size, Willingness to Pay, Technical Feasibility, Speed to Launch, Defensibility"

### Group 6: Kill Conditions

13. **Define 4–6 kill conditions** — falsifiable thresholds that, if crossed, mean the project should stop or pivot. Each should be specific and measurable.
    - Provide examples based on project type:
      - Market entry: "<3/10 prospects rank pain in top 3", "No WTP signal above $500/mo after 15 calls"
      - Growth: "CAC exceeds $120 after 3 months", "Conversion rate below 2% after 500 trials"
      - Corporate: "Board rejects proposal at Q2 review", "ROI falls below 15% in revised model"
    - Example answer: "1. Fewer than 3/10 studios rank our pain point in their top 3. 2. No willingness-to-pay signal above $1k/mo after 15 discovery calls. 3. TAM estimate falls below $50M. 4. Unable to secure 5 design partners in 6 weeks."

---

## Validation / Dry-Run Step

After all answers are collected (whether via Quick Start or Full Setup) but **before** any file replacement, present a summary table to the user for confirmation:

> **Here's what I'm about to set. Please confirm or request changes.**
>
> | Placeholder | Value |
> |---|---|
> | `{{PROJECT_NAME}}` | _answer_ |
> | `{{PROJECT_SLUG}}` | _auto-generated_ |
> | `{{ONE_LINE_DESCRIPTION}}` | _answer_ |
> | `{{GOAL}}` | _answer_ |
> | `{{TEAM}}` | _answer_ |
> | `{{SCOPE_DEFINITION}}` | _answer_ |
> | `{{OUT_OF_SCOPE}}` | _answer_ |
> | `{{STRATEGIC_HYPOTHESIS}}` | _answer_ |
> | `{{ICP_DESCRIPTION}}` | _answer_ |
> | `{{ENTITY_TYPE}}` | _answer_ |
> | `{{ENTITY_TYPE_PLURAL}}` | _auto-generated_ |
> | `{{PIPELINE_SOURCE_OF_TRUTH}}` | _answer or default_ |
> | `{{DASHBOARD_URL}}` | _answer or default_ |
> | `{{DIM_1}}` – `{{DIM_6}}` | _listed dimensions_ |
> | `{{DATE}}` | _today's date_ |
> | **Modules included** | discovery: yes/no, dashboard: yes/no |
> | **Kill conditions** | _listed_ |
>
> **Proceed?** (Yes / Edit a value / Start over)

Only proceed with file modifications once the user confirms.

---

## After Questions — Bulk Replace

Once the user confirms and all answers are finalised:

1. **Search and replace all `{{PLACEHOLDER}}` values** across every file in the project:
   - `{{PROJECT_NAME}}` → answer to Q1
   - `{{PROJECT_SLUG}}` → lowercase, hyphenated version of Q1
   - `{{ONE_LINE_DESCRIPTION}}` → Q2
   - `{{GOAL}}` → Q3
   - `{{TEAM}}` → Q4
   - `{{SCOPE_DEFINITION}}` → Q5 (in-scope part)
   - `{{OUT_OF_SCOPE}}` → Q5 (out-of-scope part)
   - `{{STRATEGIC_HYPOTHESIS}}` → Q6
   - `{{ICP_DESCRIPTION}}` → Q7
   - `{{ENTITY_TYPE}}` → Q9 entity name (singular)
   - `{{ENTITY_TYPE_PLURAL}}` → Q9 entity name (plural)
   - `{{PIPELINE_SOURCE_OF_TRUTH}}` → Q10
   - `{{DASHBOARD_URL}}` → Q11
   - `{{DIM_1}}` through `{{DIM_6}}` → Q12 dimensions
   - `{{DATE}}` → today's date

2. **Populate kill conditions** in:
   - `memory/MEMORY.md` Kill Conditions table
   - `docs/executive-summary.md` §6 Kill Conditions table
   - `memory/discovery.md` Kill Condition Tracker (if discovery module active)
   - `context/project-state.md` Kill Conditions table

3. **Remove optional modules** if not needed (Q8/Q9):
   - If no discovery: delete `discovery/`, `memory/discovery.md`, `context/pipeline-state.md`, `dashboard/pipeline.html`, `skills/pipeline-update/`, `skills/outreach-sequence/`, `.claude/agents/discovery-strategist.md`, `.claude/agents/gtm-specialist.md`
   - If no dashboard: delete `dashboard/`

4. **Remove remaining `{{PLACEHOLDER}}` markers** — scan all files for any unreplaced `{{` patterns and either fill them with sensible defaults or flag them for the user.

### Step 4.5: Generate Sample Entity CSV

If the discovery module is active and no existing CSV was provided (Q10 = No), create `data/entities.csv` with the correct headers and 2 example rows so the user can see the expected format:

```csv
name,slug,status,tier,category,last_contact,next_action,channel,notes
Example Corp,example-corp,Not started,Tier 2,Direct competitor,,Research website,Web,Added as example — delete this row
Demo Inc,demo-inc,Not started,Tier 3,Adjacent,,Initial research,Web,Added as example — delete this row
```

Ensure the `data/` directory exists before writing the file.

### Step 4.6: Generate project.config.json

Write the project configuration to `project.config.json` at the repo root using the collected answers. Follow this schema:

```json
{
  "templateVersion": "1.0.0",
  "projectName": "<Q1>",
  "projectSlug": "<auto-generated slug>",
  "oneLineDescription": "<Q2>",
  "goal": "<Q3>",
  "team": "<Q4>",
  "scope": "<Q5 in-scope>",
  "outOfScope": "<Q5 out-of-scope>",
  "strategicHypothesis": "<Q6>",
  "icpDescription": "<Q7>",
  "entityType": "<Q9 singular>",
  "entityTypePlural": "<Q9 plural>",
  "pipelineSourceOfTruth": "<Q10 or default>",
  "dashboardUrl": "<Q11 or default>",
  "modules": {
    "discovery": true/false,
    "pipeline": true/false,
    "dashboard": true/false
  },
  "scoringDimensions": ["<Q12 dimensions>"],
  "killConditions": ["<Q13 conditions>"]
}
```

5. **Run verification**:
   ```bash
   grep -r "{{" --include="*.md" --include="*.js" --include="*.html" .
   ```
   Should return zero results (all placeholders replaced).

### Step 5.5: Transform README

After verification, replace the open-source template README with a project-instance README. Generate a new `README.md` at the repo root containing:

- **Project name** as the top-level heading
- **Description** — the one-liner from Q2
- **Goal** — the measurable objective from Q3
- **Team** — from Q4
- **Status** — "Initialised — onboarding complete, discovery not yet started"
- **Folder map** — a brief overview of the directory structure and what each folder contains
- **Key docs** — links to:
  - `memory/MEMORY.md` (project memory)
  - `docs/executive-summary.md` (executive summary)
  - `context/project-state.md` (current state)
  - `memory/scoring.md` (scoring framework)
  - `memory/discovery.md` (discovery tracker, if active)
- **Dashboard** — link to `{{DASHBOARD_URL}}` if the dashboard module is active, otherwise note "Dashboard not configured"
- **Generated by** — "Initialised from diffsProjectStack template on `{{DATE}}`"

Do **not** include template-level instructions, contribution guidelines, or licence information from the original README — this is now a project-specific document.

6. **Rebuild dashboard** (if kept):
   ```bash
   cd dashboard && npm install && node build-data.js
   ```

7. **Report completion** to the user with:
   - Summary of all values set
   - List of modules included/excluded
   - Files generated (entity CSV, project.config.json, README)
   - Suggested first actions (e.g., "Start with competitor research", "Define your first 10 targets")

---

## After Onboarding

This skill is no longer needed. The user can:
- Delete the `skills/onboard/` directory
- Or keep it for reference

Suggest: "Onboarding complete. You can delete `skills/onboard/` — it's no longer needed."
