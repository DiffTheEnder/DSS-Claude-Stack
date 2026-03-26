---
name: rebuild-snapshots
description: Regenerate all 4 context snapshots from raw source files. Run when snapshots have drifted from reality — after multiple sessions, bulk research, or when /session-start reports stale data.
---

# Rebuild Snapshots

Regenerate the pre-computed context snapshots in `context/` from raw source files. These snapshots enable fast context loading at session start — but they drift when source files change without snapshot updates.

---

## When to Run

- `/session-start` reports data is >7 days old
- After bulk research or multiple discovery calls
- After strategic decisions that change the project direction
- When `/session-end` detects relevant source file changes
- Manually, whenever snapshots feel out of date

---

## Snapshot 1 — Project State (`context/project-state.md`)

**Read these source files:**
- `memory/MEMORY.md` — project state, hypothesis, kill conditions, priorities
- `memory/decisions.md` — recent strategic decisions
- `memory/discovery.md` — kill condition tracker, discovery progress
- `docs/executive-summary.md` — current hypothesis framing, risk register

**Regenerate with these sections:**
1. **Mission & Hypothesis** — one-paragraph summary of what we're doing and why
2. **Kill Conditions** — current status table (copy from MEMORY.md, enrich with evidence from discovery.md)
3. **Discovery Progress** — calls completed, pipeline summary, key patterns emerging
4. **Recent Decisions** — last 3–5 decisions from decisions.md
5. **Current Priorities** — from MEMORY.md
6. **Top Risks** — from executive summary risk register

---

## Snapshot 2 — Market Snapshot (`context/market-snapshot.md`)

**Read these source files:**
- `memory/research.md` — market sizing summary
- `research/market/` — all market research files
- `docs/executive-summary.md` §2 (Market Opportunity)

**Regenerate with these sections:**
1. **TAM / SAM / SOM** — current estimates with sources and evidence grades
2. **Market Dynamics** — tailwinds and headwinds
3. **Key Trends** — 3–5 trends shaping the market
4. **Timing Window** — convergence or urgency signals

---

## Snapshot 3 — Pipeline State (`context/pipeline-state.md`)

**Read these source files:**
- Pipeline source of truth CSV (path from `project.config.json` or `memory/MEMORY.md`)
- `memory/discovery.md` — outreach log
- `memory/MEMORY.md` — discovery line

**Regenerate with these sections:**
1. **Pipeline Summary** — total entities, breakdown by status
2. **Status Breakdown** — table of all entities with current status, last contact, next action
3. **Overdue Actions** — any next actions with dates in the past
4. **Recent Activity** — last 5 pipeline events from outreach log

---

## Snapshot 4 — Competitor Snapshot (`context/competitor-snapshot.md`)

**Read these source files:**
- `memory/research.md` — entity capability map
- `research/competitors/` — all competitor research files (read TL;DR sections at minimum)

**Regenerate with these sections:**
1. **Competitive Landscape** — capability map table (copy from research.md)
2. **Key Patterns** — 3–5 patterns across competitors (common strengths, shared gaps)
3. **White Space** — opportunities not covered by existing players
4. **Convergence Risks** — competitors moving towards our intended position

---

## After Rebuilding

1. Add today's date as "Last regenerated" at the top of each snapshot
2. Report which snapshots changed meaningfully vs. were already current
3. If any snapshot reveals contradictions with `memory/MEMORY.md` → flag to the user
