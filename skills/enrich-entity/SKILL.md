---
name: enrich-entity
description: Produce complete enrichment for a {{ENTITY_TYPE}} so it appears fully populated in the dashboard and research files. Use when adding a new entity to the project or when an entity has incomplete research.
---

# Enrich Entity

> **Evidence grading**: Before applying evidence tags (`[CONFIRMED]`, `[SECONDARY]`, etc.), check `project.config.json` → `features.evidenceGrading`. If `false`, skip evidence tagging and grade distribution sections.

Produce complete enrichment for a {{ENTITY_TYPE}} so it appears fully populated in the dashboard grid. Empty columns in the capability map mean either the research files are missing or the map hasn't been updated.

---

## How the Dashboard Gets Its Data

```
research/competitors/{slug}-*.md  ──▶  build-data.js  ──▶  competitors.json
memory/research.md (capability map table)
```

An entity needs entries in **both** the capability map (memory/research.md) and individual research files to be fully enriched.

---

## Step 1 — Check What Already Exists

```bash
# Which research files exist?
ls research/competitors/ | grep SLUG

# Is it in the capability map table?
grep -i "NAME" memory/research.md
```

If all fields are populated → no action needed. If files exist but columns are empty → the capability map needs updating (Step 4). If no files → full research required (Step 2–5).

---

## Step 2 — Research (if files are missing)

Minimum sources before writing anything:

| Source | What to get |
|--------|-------------|
| Company website | Features, pricing page, target customers, platform support |
| LinkedIn (company + founders) | Team size, employee count, prior employers |
| Review platforms (G2, Capterra, Trustpilot) | Customer sentiment, praise/complaint themes, ratings |
| Industry press | Funding, acquisitions, product launches |
| Funding databases (Crunchbase, PitchBook) | Funding rounds, investors, revenue estimates |

---

## Step 3 — Create Research Files

Files go in `research/competitors/`. Slug = lowercase name, spaces replaced with hyphens.

| File | Key sections |
|------|-------------|
| `{slug}-overview.md` | Founders, founding problem, entry wedge, metrics, competitive position |
| `{slug}-capabilities.md` | Feature comparison, pricing model, cost ranges, GTM motion, lock-in analysis |
| `{slug}-trajectory.md` | Investment signals (funding/hiring/product), roadmap, convergence risk, 12-month outlook |
| `{slug}-relevance.md` | How this entity relates to {{PROJECT_NAME}} — complement, competitor, or partner |

Each file must start with:
```markdown
# {Name} — {Topic}

**Research Date**: YYYY-MM-DD
**Analyst**: {{PROJECT_NAME}} Pod

## TL;DR

<!-- 2–3 sentence summary -->

---
```

Every factual claim must be tagged with an evidence grade: [CONFIRMED], [SECONDARY], [INFERENCE], or [ASSUMPTION]. See `docs/memos/evidence-grading.md`.

---

## Step 4 — Update Capability Map

Add or update the entity's row in `memory/research.md` Entity Capability Map table. Fill all columns.

---

## Step 5 — Build and Verify

```bash
cd dashboard && node build-data.js
```

**Verification checklist**:
- [ ] Entity appears in `dashboard/data/competitors.json`
- [ ] All capability map columns populated
- [ ] All 4 research files exist in `research/competitors/`
- [ ] Each file has a TL;DR section
- [ ] Evidence grades applied to factual claims
- [ ] No [ASSUMPTION] tags where research could provide [SECONDARY] or better

---

## Common Mistakes

- Creating research files but forgetting to update the capability map in `memory/research.md`
- Forgetting to run `build-data.js` after updating files
- Using the entity name inconsistently (capitalisation, abbreviations) across files
- Missing the TL;DR section that `build-data.js` extracts
