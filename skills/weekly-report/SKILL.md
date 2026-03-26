---
name: weekly-report
description: Generate a stakeholder-ready weekly summary from project activity, work log, pipeline state, and status blurb. Outputs a formatted report and optional Slack-ready plain text version.
---

# Weekly Report

Generate a periodic summary suitable for stakeholders, investors, or team standups.

---

## Step 1 — Gather Source Data

Read the following files:
- `docs/output/work-log.md` — filter to entries from the last 7 days (or since last report)
- `docs/output/project-activity.md` — recent exec-worthy milestones
- `docs/output/status-blurb.md` — current status
- `context/pipeline-state.md` — pipeline summary
- `memory/MEMORY.md` — kill conditions, current priority, project state
- `memory/decisions.md` — any decisions made this week

## Step 2 — Generate Report

Create `docs/output/weekly-report-{YYYY-MM-DD}.md`:

```
# Weekly Report — {date range}

## Status

{Copy of status-blurb.md — 4 sentences max}

## This Week

### Completed
- {bullet points from work-log, exec-worthy items only}

### Decisions Made
- {from decisions.md, this week only — or "No strategic decisions this week"}

### Discovery & Pipeline
- **Pipeline**: {total} entities — {breakdown by status}
- **Calls completed**: {count this week}
- **Key findings**: {1-2 sentence summary of discovery insights}

## Kill Conditions

| # | Condition | Status | Change |
|---|-----------|--------|--------|
{table from MEMORY.md — add "Change" column: ↑ improved, ↓ worsened, — unchanged}

## Next Week

### Priorities
- {from MEMORY.md current priority}

### Planned
- {upcoming actions from pipeline next-actions}

## Risks & Blockers

- {any items from STATUS.md Blocked/Waiting}
- {any kill conditions trending FAILING}
```

## Step 3 — Generate Slack Version (Optional)

If the user wants a Slack-ready version, produce a plain text summary:
- Under 500 words
- No markdown tables (use bullet points instead)
- Lead with the single most important update
- End with "Priorities this week: {list}"

## Step 4 — Report

> **Weekly report generated — {date range}**
> - Output: `docs/output/weekly-report-{date}.md`
> - Period: {start} to {end}
> - {count} items completed, {count} decisions, {count} calls
