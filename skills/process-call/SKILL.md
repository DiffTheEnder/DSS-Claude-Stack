---
name: process-call
description: Use after a discovery or stakeholder call to process raw notes into structured files. Extracts pain points, WTP signals, hypothesis evidence, and updates all memory files and the dashboard. Rigid skill — execute all steps.
---

# Process Call

**Rigid skill** — execute ALL steps in order. Do not skip steps or ask whether to proceed.

Use this after any discovery, intel, or stakeholder call to transform raw notes into structured project data.

---

## Step 0 — Gather Raw Input

Ask the user for:
1. **Entity name** — who was the call with?
2. **Call type** — Discovery / Intel / Follow-up / Partnership
3. **Attendees** — who was on the call?
4. **Raw notes** — pasted text, a file path, or dictated summary

If the user pastes raw notes, work with those. If they provide a file path, read that file.

## Step 1 — Create Structured Call Notes

Create `discovery/calls/{entity-slug}-{YYYY-MM-DD}.md` using the template at `templates/call-notes.md`.

Extract from the raw notes and populate:
- **Key Takeaways**: 3–5 bullet points — the most important things learned
- **Pain Point Rankings**: intensity 1–5, with direct quotes where available
- **WTP / Value Signals**: any willingness-to-pay indicators with context and evidence grade
- **Key Quotes**: verbatim quotes that capture insights (attribute to speaker)
- **Hypotheses Tested**: map findings against the project's strategic hypothesis and kill conditions
- **Learnings & Surprises**: what challenged assumptions or was unexpected
- **Next Steps**: concrete actions with owners and due dates
- **Impact Assessment**: which kill conditions, hypotheses, or research gaps are affected

Every factual claim must be tagged: [CONFIRMED], [SECONDARY], [INFERENCE], or [ASSUMPTION].

## Step 2 — Update Pain Point Rankings

Read `memory/discovery.md`. Update the Pain Point Rankings table:
- If a pain point from this call already exists → update frequency count and intensity if this call provides stronger evidence
- If a pain point is new → add it to the table
- Maintain ranking by frequency × intensity

## Step 3 — Update WTP Signals

In `memory/discovery.md`, update the WTP Signals table:
- Add any new signals from this call
- Include entity name, signal, context, and evidence grade

## Step 4 — Update Kill Condition Tracker

In `memory/discovery.md`, update the Kill Condition Tracker:
- For each kill condition, check if this call provided new evidence
- Update the evidence column and status (UNTESTED → PASSING or FAILING)
- If a kill condition status changes → flag this prominently to the user

Also update `memory/MEMORY.md` Kill Conditions table if any status changed.

## Step 5 — Update Pipeline Status

Update the entity's status in the pipeline:
- If they were "Meeting booked" → move to "Meeting completed"
- Update last contact date, next action, and notes in the pipeline tracker
- Update `memory/discovery.md` Outreach Log with call details
- Update `memory/MEMORY.md` Discovery line (call count, status summary)

## Step 6 — Hypothesis Impact Check

Read the project's strategic hypothesis from `memory/MEMORY.md`.

Does this call provide evidence that **supports**, **weakens**, or is **neutral** to the hypothesis?

- If **supports or weakens** → run `/critical-reasoning` on the updated evidence before updating `docs/executive-summary.md`
- If **neutral** → note in the call notes Impact Assessment and proceed

## Step 7 — Rebuild Dashboard

```bash
cd dashboard && node build-data.js
```

## Step 8 — Report to User

Provide a structured summary:

> **Call processed — {entity name} ({date})**
> - **Key insight**: {single most important takeaway}
> - **Pain points**: {count} identified ({count} new)
> - **WTP signals**: {count} captured
> - **Kill conditions affected**: {list or "none"}
> - **Hypothesis impact**: Supports / Weakens / Neutral
> - **Next actions**: {list from call notes}
> - **Files updated**: {list}
