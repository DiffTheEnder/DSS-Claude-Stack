---
name: session-start
description: Run at the beginning of every work session. Loads context, checks for conflicts, shows priorities and overdue actions. Ensures you start every session oriented and ready to work.
---

# Session Start

**Run this at the start of every session** — it orients you to the current project state and prevents duplicate or conflicting work.

---

## Step 0 — Get Current Date

```bash
date +%Y-%m-%d
```

Record this as the session date.

## Step 1 — Check for Conflicts

Read `STATUS.md`. Check the "In Progress" table:
- If another agent has items in progress → flag to the user which workstreams are active
- If the user's intended work overlaps with an in-progress item → warn before proceeding

## Step 2 — Determine Context Loading Mode

Ask the user: **"What are you working on this session?"**

Map their answer to a loading mode:

| Task type | Mode | Load |
|-----------|------|------|
| Pipeline updates, outreach, scheduling, call prep | **Fast** | `context/pipeline-state.md` only |
| Research, competitor analysis, entity enrichment | **Standard** | `context/competitor-snapshot.md` + `context/market-snapshot.md` |
| Discovery call prep, hypothesis work, strategic review | **Standard** | `context/project-state.md` |
| Hypothesis review, critical reasoning, kill condition updates, strategic decisions | **Deep** | `context/project-state.md` → then ALL raw evidence files |
| Housekeeping, maintenance | **Fast** | `context/project-state.md` |

Tell the user which mode you're using and why.

## Step 3 — Load Context Snapshot(s)

Read the appropriate context snapshot(s) based on Step 2.

For **Deep** mode: read the snapshot first for orientation, then read:
- All files in `discovery/calls/`
- `memory/decisions.md`
- `memory/research.md`

## Step 4 — Show Current Priorities

Read `memory/MEMORY.md`. Report to the user:
- **Current phase** and project state
- **Current priority** (the 1–2 items flagged as most important)
- **Kill condition status** — any conditions that are FAILING or changed recently

## Step 5 — Check for Overdue Actions

If the discovery module is active, scan `memory/discovery.md` Outreach Log and `context/pipeline-state.md` for:
- Next actions with dates in the past
- Entities in "Meeting booked" status with no follow-up
- Entities in "Contacted" status for more than 7 days with no response

Report any overdue items to the user.

## Step 6 — Report Time Since Last Session

Read `docs/output/work-log.md`. Find the most recent entry date. Calculate and report how many days since the last session.

If > 7 days: suggest running `/rebuild-snapshots` to ensure context is fresh.

## Step 7 — Register in STATUS.md

Add the user's intended work to the "In Progress" table in `STATUS.md`:
- Workstream: based on task type
- Item: brief description of planned work
- Owner: user's name (from `memory/MEMORY.md` Team field)
- Date: today's date

## Step 8 — Session Briefing

Provide a concise briefing:

> **Session briefing — {date}**
> - **Mode**: {Fast/Standard/Deep}
> - **Focus**: {what the user said they're working on}
> - **Priority**: {from MEMORY.md}
> - **Overdue**: {count of overdue items, or "none"}
> - **Days since last session**: {N}
> - **Conflicts**: {none, or list}

Then: "Ready to start. What's first?"
