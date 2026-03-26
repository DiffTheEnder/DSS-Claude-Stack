---
name: decision
description: Record a strategic decision with full rationale, alternatives considered, evidence, and reversibility assessment. Updates memory files and executive summary. Use whenever a meaningful strategic choice is made.
---

# Decision

Record a strategic decision with full context so future sessions understand what was decided and why.

---

## Step 0 — Capture the Decision

Ask the user:

1. **What was decided?** — one clear sentence
2. **What alternatives were considered?** — list the options that were rejected
3. **What evidence supports this choice?** — specific findings, data, or call insights
4. **Is this reversible?** — Easy (change anytime), Moderate (some rework), Hard (significant sunk cost), Irreversible
5. **What would cause us to revisit this?** — specific trigger or evidence that would reopen the decision

## Step 1 — Optional: Pressure-Test

If the decision is rated Moderate, Hard, or Irreversible → ask the user:
"This is a {difficulty}-to-reverse decision. Want to run `/critical-reasoning` on it before recording?"

If yes → run `/critical-reasoning` first. If no → proceed.

## Step 2 — Write to Decision Log

Append to `memory/decisions.md`:

```
### Decision {N}: {title}

**Date**: {date}
**Decided**: {what was decided}
**Alternatives considered**:
- {option A} — rejected because {reason}
- {option B} — rejected because {reason}

**Evidence**:
- {evidence 1} [{grade}]
- {evidence 2} [{grade}]

**Reversibility**: {Easy/Moderate/Hard/Irreversible}
**Revisit trigger**: {what would cause us to reopen this}
```

## Step 3 — Update MEMORY.md

Add a one-liner to `memory/MEMORY.md` Key Decisions section:

```
{N}. {decision summary} ({reversibility}) — {date}
```

## Step 4 — Update Executive Summary

If the decision affects the project strategy (product, GTM, positioning, kill conditions):
- Update the relevant section of `docs/executive-summary.md`
- Note the decision and its rationale

If the decision is operational (tooling, process, scheduling) → skip this step.

## Step 5 — Rebuild Snapshots

If the decision affects strategy → run `/rebuild-snapshots` for `context/project-state.md` at minimum.

## Step 6 — Confirm

> **Decision recorded — #{N}: {title}**
> - Reversibility: {rating}
> - Revisit trigger: {trigger}
> - Files updated: memory/decisions.md, memory/MEMORY.md{, docs/executive-summary.md if applicable}
