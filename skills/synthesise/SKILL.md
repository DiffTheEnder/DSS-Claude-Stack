---
name: synthesise
description: Synthesise research across multiple raw files into a structured memo with evidence grading. Use when you need to pull together competitor patterns, market dynamics, discovery themes, or any cross-cutting analysis.
---

# Synthesise

Transform scattered raw research into a structured, evidence-graded synthesis memo.

---

## Step 0 — Define the Synthesis Topic

Ask the user: **"What do you want to synthesise?"**

Common synthesis types:

| Type | Source files | Output |
|------|------------|--------|
| Competitor landscape | `research/competitors/*.md` + `memory/research.md` | Patterns, gaps, white space |
| Market dynamics | `research/market/*.md` + `memory/research.md` | Trends, sizing, timing |
| Discovery patterns | `discovery/calls/*.md` + `memory/discovery.md` | Pain themes, WTP signals, segments |
| Technical feasibility | `research/technical/*.md` | Architecture options, trade-offs |
| Custom topic | User-specified files | User-specified focus |

## Step 1 — Gather All Source Material

Read ALL relevant raw files — not just snapshots. Synthesis requires the full evidence base.

For each file, extract:
- Key claims and findings
- Evidence grades on each claim
- Contradictions or tensions between sources
- Gaps — what's missing?

## Step 2 — Identify Patterns

Look for:
- **Convergence**: 3+ sources agreeing on the same point → strong signal
- **Contradictions**: Sources disagreeing → flag explicitly, don't silently resolve
- **Gaps**: Important questions with no evidence → flag as research needs
- **Surprises**: Findings that challenge the project hypothesis

## Step 3 — Write the Synthesis Memo

Create `docs/memos/synthesis-{topic-slug}-{date}.md` with this structure:

```
# Synthesis — {Topic}

**Date**: {date}
**Sources**: {count} files analysed
**Analyst**: {from MEMORY.md team}

## TL;DR

<!-- 3-5 sentence executive summary of findings -->

## Key Findings

### Finding 1: {title}
{2-3 sentences}. [CONFIRMED/SECONDARY/INFERENCE]

Evidence:
- {source 1}: {what it says} [grade]
- {source 2}: {what it says} [grade]

### Finding 2: ...

## Contradictions & Tensions

| Claim A | Source | Claim B | Source | Resolution |
|---------|--------|---------|--------|------------|

## Gaps & Research Needs

- {gap description} — suggested next step
- ...

## Implications for Strategy

- {implication 1} — how this affects the hypothesis or kill conditions
- {implication 2}

## Evidence Grade Distribution

- CONFIRMED: {count}
- SECONDARY: {count}
- INFERENCE: {count}
- ASSUMPTION: {count}

Coverage: {tagged claims / total claims}%
```

## Step 4 — Update Memory

If the synthesis reveals new patterns or changes understanding:
- Update the relevant section of `memory/research.md` or `memory/discovery.md`
- If it affects the hypothesis → flag for `/critical-reasoning`

## Step 5 — Report

> **Synthesis complete — {topic}**
> - {count} sources analysed
> - {count} key findings
> - {count} contradictions flagged
> - {count} research gaps identified
> - Output: `docs/memos/synthesis-{slug}-{date}.md`
