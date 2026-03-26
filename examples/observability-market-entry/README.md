# Meridian Analytics — Observability Market Entry (Fictional Example)

This is a **fictional worked example** showing what a populated Diffs project looks like after onboarding and approximately 2-3 weeks of active work.

## The scenario

**Meridian Analytics** is evaluating entry into the **developer observability market**, targeting mid-market SaaS companies (200-2000 employees) who are underserved by enterprise tools like Datadog and New Relic but have outgrown open-source solutions like Grafana.

The team:
- **Priya** — Strategy lead
- **Marcus** — Product
- **Zara** — Research

## What this example demonstrates

- A fully populated `project.config.json` with scoring dimensions and kill conditions
- Memory files that evolve across sessions (MEMORY.md, research.md, decisions.md, etc.)
- A working pipeline of 8 prospects in `data/entities.csv`
- Competitor teardowns with evidence grading
- Discovery call notes with structured pain point and WTP capture
- Status outputs and work logs showing progress over time

## How to use this example

Browse the files to understand the structure and conventions. Every file cross-references consistently — kill conditions in `memory/MEMORY.md` match those in `memory/discovery.md`, prospect counts in the pipeline match references in status outputs, and competitor names referenced in research appear in the teardown files.

This is not a real project. All company names, people, data points, and quotes are fictional.

## How Data Flows Through This Project

This section traces how information moves between files. Understanding these flows helps you see why files are structured the way they are and where to look when something needs updating.

### From CSV to Dashboard

The pipeline starts with raw data in `data/entities.csv`. Each row represents a prospect, partner, or entity being tracked. For example, here is the CloudStack AI row:

```
CloudStack AI,cloudstack-ai,Meeting completed,Tier 1,SaaS - DevTools,2026-03-20,Process call notes,LinkedIn,Strong pain signal - using 4 different tools
```

When you run `dashboard/build-data.js`, it reads this CSV and transforms it into `dashboard/data/entities.json` — a structured JSON array where each row becomes an object with typed fields. The Pipeline page in the dashboard then renders this JSON as an interactive table, with filtering by status, tier, and category. The "Meeting completed" status for CloudStack AI would appear as a highlighted row showing the most recent contact date (20 March 2026) and the next action ("Process call notes").

### From Discovery Calls to Memory

After a discovery call — say, the CloudStack AI call on 20 March 2026 — the `/process-call` skill triggers a chain of updates across multiple files:

1. **Creates structured call notes** in `discovery/calls/cloudstack-ai-2026-03-20.md`. This file captures company context, key takeaways, pain point rankings, WTP signals, key quotes, hypotheses tested, and next steps. For example, the CloudStack AI file records that Raj Patel (VP Engineering) ranked tool fragmentation as his #1 pain point and cited a WTP of $15-20k/yr.

2. **Updates pain point rankings** in `memory/discovery.md`. The "Pain Points Identified" section gains a new entry or has an existing entry's frequency count incremented. After the CloudStack AI call, "Observability tool fragmentation" shows a frequency of 1/1 interviews with the evidence: *"CloudStack AI uses Datadog (APM), Grafana (dashboards), PagerDuty (alerting), and custom scripts (log aggregation). Their VP Engineering called it 'death by a thousand tabs.'"*

3. **Updates WTP signals** in `memory/discovery.md`. A new signal entry appears: "CloudStack AI — $15-20k/yr range", with context about current spend (~$52k/yr across tools) and confidence level (Medium — single data point).

4. **Updates kill condition evidence** in `memory/discovery.md`. The kill condition tracker table is updated — KC1 moves from UNTESTED to EARLY SIGNAL (1/1 confirmed), KC2 records the $15-20k data point, and KC3 records that CloudStack AI explicitly prefers buying over building.

5. **Updates pipeline status** in `data/entities.csv`. The CloudStack AI row's status changes to "Meeting completed", the `last_contact` date updates to 2026-03-20, and the `next_action` changes to "Process call notes".

### From Memory to Context Snapshots

The `/rebuild-snapshots` skill reads all memory files and raw research, then generates `context/project-state.md` — a pre-computed summary designed for quick loading at the start of a session.

For example, the Key Facts in `memory/MEMORY.md` (such as "The global observability market is projected at $45B in 2026, growing 14% YoY") appear condensed in the snapshot's Progress Summary. The kill condition tracker from `memory/MEMORY.md` and `memory/discovery.md` is merged into a unified status table showing condition, status, and confidence level. The pipeline summary in the snapshot (showing 1 meeting completed, 1 meeting booked, 1 engaged, 2 contacted, 2 not started, 1 dead) is derived from counting statuses in `data/entities.csv`.

The snapshot is a read-only output — editing it directly is pointless because `/rebuild-snapshots` will overwrite your changes. Always edit the source files instead.

### From Research to Competitors Dashboard

Competitor intelligence flows through three stages:

1. **Raw teardowns** live in `research/competitors/` — for example, `research/competitors/datadog-overview.md` contains a detailed analysis of Datadog's strengths, weaknesses, pricing, and mid-market positioning.

2. **The capability map** in `memory/research.md` condenses each competitor into a single table row. For instance, Datadog's entry captures: Key Strength = "Full platform — APM, logs, traces, infra in one pane", Key Weakness = "Expensive, complex; per-host pricing punishes horizontal scaling", Mid-Market Cost = "$35-80k/yr", and Relevance = "Primary threat".

3. **`dashboard/build-data.js`** reads `memory/research.md` and outputs `dashboard/data/competitors.json`, which the Competitors dashboard page renders as a comparison matrix.

### Data Flow Diagram

```
entities.csv ──→ build-data.js ──→ entities.json ──→ Pipeline page
                      ↑
memory/research.md ───┘──→ competitors.json ──→ Competitors page
memory/decisions.md ──────→ decisions.json ──→ Decisions page
memory/scoring.md ─────────→ scoring.json ──→ Scoring page
docs/output/work-log.md ──→ timeline.json ──→ Timeline page
research/**/*.md ──────────→ research.json ──→ Research Hub page
docs/executive-summary.md ─→ overview.json ──→ Overview page
docs/output/status-blurb.md ┘
```
