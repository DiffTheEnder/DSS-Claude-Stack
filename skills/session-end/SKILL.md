---
name: session-end
description: Run at the end of every work session. Executes the full 10-step housekeeping checklist — file audit, memory updates, hypothesis review, status sync, dashboard rebuild, and commit. Rigid skill — execute all steps in order.
---

# Session End

**Rigid skill** — execute ALL steps in order. Do not skip steps or ask whether to proceed.

Run this before finishing any session that produced or modified files.

---

## Step 1 — File Placement Audit

Scan all files created or modified this session. Verify each is in the correct location:

| File type | Correct location | Template |
|-----------|-----------------|----------|
| Entity teardown | `research/competitors/{slug}.md` | `templates/entity-teardown.md` |
| Market/TAM research | `research/market/` | — |
| Technical research | `research/technical/` | — |
| Call notes | `discovery/calls/{entity}-{date}.md` | `templates/call-notes.md` |
| Call prep | `discovery/prep/{entity}-prep.md` | `templates/call-prep.md` |
| Strategy memo | `docs/memos/` | — |
| Deck/presentation | `docs/decks/` | — |
| Data file (CSV/JSON) | `data/` | — |

If a file is in the wrong place → move it now. If created without the correct template → flag it.

## Step 2 — Memory Cascade Update

Check which work was done this session and update the corresponding memory files:

| Work done | Update required |
|-----------|----------------|
| Competitor/entity research | Add/update row in `memory/research.md` |
| New target entities found | Update Target Entity List in `memory/research.md` |
| Technical pathway research | Update Technical Findings in `memory/research.md` |
| Outreach sent (any channel) | Update Outreach Log in `memory/discovery.md` + `memory/MEMORY.md` Discovery line |
| Call prep created | Note in pipeline tracker for the matching entity |
| Call notes processed | Note in pipeline tracker for the matching entity |
| Entity disqualified | Update `memory/MEMORY.md` Discovery line + note reason in `memory/discovery.md` |
| Customer discovery call | Update Pain Point Rankings + WTP Signals in `memory/discovery.md` + `memory/MEMORY.md` |
| Kill condition evidence changed | Update Kill Condition Tracker in `memory/discovery.md` + `memory/MEMORY.md` |
| Strategic decision made | Add entry to `memory/decisions.md` + one-liner to `memory/MEMORY.md` |
| Option scoring changed | Update `memory/scoring.md` |

## Step 3 — Hypothesis Review

Ask: "Did this session produce new evidence that could affect hypothesis confidence?"

- If **YES** → run `/critical-reasoning` before updating the executive summary. Only update `docs/executive-summary.md` after the user confirms the briefing.
- If **NO** (structural/setup work) → proceed to Step 4.

## Step 4 — Status Blurb Update

Update `docs/output/status-blurb.md`. Rules:
- Max 4 sentences
- Plain English — no jargon, no technical codes, no internal terminology
- Never mention internal tooling, agent workflows, file reorganisation, or process changes
- Cover: current phase, what's active, key unknown, any blockers

## Step 5 — README Status Sync

Copy the content of `docs/output/status-blurb.md` into the `<!-- STATUS:START -->` / `<!-- STATUS:END -->` block in `README.md`.

## Step 6 — Project Activity Update

Apply the filter — only log exec-worthy progress:
- **Log**: Concrete deliverables, milestones, external-facing actions (outreach sent, calls completed, research synthesis, memos)
- **Skip**: Dashboard UI work, CSS fixes, skill creation, data schema changes, call prep creation, internal tooling, maintenance, housekeeping
- **Rule of thumb**: If you wouldn't mention it in a 2-minute standup with an investor, don't log it

If there is exec-worthy progress → append to `docs/output/project-activity.md`.

## Step 7 — STATUS.md & Work Log Update

All of the following — never do (a) without (b):

a) Move completed "In Progress" rows → STATUS.md "Completed Recently"
b) Append the SAME rows to `docs/output/work-log.md` (append-only, never trim)
c) Trim STATUS.md "Completed Recently" entries older than 1 week (safe — they're in work-log.md)
d) Remove "Blocked / Waiting" entries that are resolved

## Step 8 — Rebuild Context Snapshots

Run `/rebuild-snapshots` if any of the following changed this session:
- Discovery calls processed
- Kill conditions updated
- Strategic decisions made
- Market research added
- Pipeline state changed significantly

If none of these changed → skip this step.

## Step 9 — Rebuild Dashboard

```bash
cd dashboard && node build-data.js
```

Include regenerated `dashboard/data/*.json` files in the commit.

## Step 10 — Commit & Push

1. Stage all files modified during the session and housekeeping (use specific file paths, never `git add -A`)
2. Commit with a concise message summarising the session's work (not the housekeeping itself)
3. Push to remote

## Step 11 — Report

Report to the user:
- Files created/modified
- Memory files updated
- Whether hypothesis was reviewed
- Dashboard rebuild status
- Commit hash

> **Session complete.** {1-sentence summary of what was accomplished.}
