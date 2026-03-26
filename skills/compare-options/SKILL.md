---
name: compare-options
description: Score and compare 2-5 strategic options using the project's scoring framework. Produces a side-by-side comparison with evidence-backed scores. Use when choosing between strategic directions, entry angles, or product approaches.
---

# Compare Options

Structured comparison of strategic options using the scoring framework defined in `memory/scoring.md`.

---

## Step 0 — Define Options

Ask the user to describe 2–5 options. For each option, capture:
- **Code** (short identifier, e.g., "A", "SaaS-first", "Partner-led")
- **Description** (1–2 sentences)

If options are already defined in `memory/scoring.md` → use those.

## Step 1 — Load Scoring Framework

Read `memory/scoring.md` to get:
- The scoring dimensions (e.g., White Space, Urgency, Feasibility, Defensibility, Revenue Potential)
- Any existing scores
- The current recommended strategy (if any)

## Step 2 — Score Each Option

For each option, score against each dimension (1–5):

| Score | Meaning |
|-------|---------|
| 5 | Exceptional — clear, strong evidence |
| 4 | Good — solid evidence, minor gaps |
| 3 | Moderate — mixed evidence |
| 2 | Weak — limited evidence, significant concerns |
| 1 | Poor — evidence against, or no evidence |

**Every score must cite evidence.** Reference specific findings from:
- `research/competitors/*.md`
- `research/market/*.md`
- `discovery/calls/*.md`
- `memory/research.md`
- `memory/discovery.md`

Format:
```
### Option {code}: {name}

| Dimension | Score | Evidence |
|-----------|-------|----------|
| {dim 1} | {1-5} | {specific evidence with source and grade} |
| {dim 2} | {1-5} | {specific evidence} |
...

**Total**: {sum} / {max possible}
```

## Step 3 — Side-by-Side Comparison

Produce a comparison matrix:

```
| Dimension | {Option A} | {Option B} | {Option C} | ... |
|-----------|-----------|-----------|-----------|-----|
| {dim 1} | {score} | {score} | {score} | |
| {dim 2} | {score} | {score} | {score} | |
...
| **Total** | **{sum}** | **{sum}** | **{sum}** | |
```

## Step 4 — Pressure-Test the Leader

The highest-scoring option gets a `/critical-reasoning` pass. Ask the user:
"Option {X} scores highest. Want to pressure-test it before recommending?"

If yes → run `/critical-reasoning` on that option specifically.

## Step 5 — Update Scoring Memory

Write results to `memory/scoring.md`:
- Update the Options Reference with any new options
- Update the Scoring Matrix with all scores and evidence
- Update the Recommended Strategy section:
  - **Lead option**: {code} — {name}
  - **Rationale**: {why it scored highest, 2-3 sentences}
  - **Key risks**: {from the scoring and critical reasoning}
  - **Fallback**: {second-highest option and when to switch}

## Step 6 — Report

> **Options compared — {count} options scored across {count} dimensions**
> - **Winner**: {option code} — {name} ({score}/{max})
> - **Runner-up**: {option code} — {name} ({score}/{max})
> - **Biggest differentiator**: {dimension where the gap is largest}
> - **Biggest risk for winner**: {from critical reasoning or lowest-scoring dimension}
> - Output: `memory/scoring.md` updated
