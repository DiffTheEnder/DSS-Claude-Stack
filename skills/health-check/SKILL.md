---
name: health-check
description: Run a project integrity audit. Checks for unreplaced placeholders, memory consistency, orphaned files, stale dashboard data, and structural issues. Reports a health score and actionable fixes.
---

# Health Check

Run a comprehensive integrity audit of the project. Use this after onboarding, periodically during a project, or when something feels off.

---

## Check 1 — Unreplaced Placeholders

```bash
grep -r "{{" --include="*.md" --include="*.js" --include="*.html" --include="*.json" . | grep -v node_modules | grep -v .git
```

- If any `{{PLACEHOLDER}}` tokens remain → **FAIL**
- List each unreplaced placeholder with file path and line number
- Severity: **Critical** (project not fully onboarded)

## Check 2 — Project Configuration

Check if `project.config.json` exists at the repo root.
- If missing → **WARN** (older template version or onboarding incomplete)
- If present → validate all required fields are non-empty: projectName, projectSlug, entityType, modules

## Check 3 — Memory File Consistency

### 3a. Kill Conditions Alignment
Compare kill conditions across all locations where they appear:
- `memory/MEMORY.md` Kill Conditions table
- `docs/executive-summary.md` §6
- `memory/discovery.md` Kill Condition Tracker (if discovery module active)
- `context/project-state.md`

All four should have the same kill conditions with consistent statuses.
- Mismatches → **FAIL** with details of which files disagree

### 3b. Entity Capability Map vs Research Files
Read `memory/research.md` Entity Capability Map. For each entity listed:
- Check that research files exist in `research/competitors/{slug}-*.md`
- Entities in the map with no research files → **WARN**
- Research files that exist but aren't in the capability map → **WARN**

### 3c. MEMORY.md Size
Count lines in `memory/MEMORY.md`.
- Over 200 lines → **WARN** (context loading will be slow, needs pruning)
- Over 300 lines → **FAIL** (must prune)

## Check 4 — Dashboard Data Freshness

Compare timestamps:
```bash
# Source file last modified
stat -f %m memory/research.md
stat -f %m docs/output/status-blurb.md
stat -f %m docs/executive-summary.md

# Dashboard JSON last modified
stat -f %m dashboard/data/overview.json
stat -f %m dashboard/data/competitors.json
stat -f %m dashboard/data/entities.json
```

- If any source file is newer than its corresponding JSON → **WARN** (dashboard is stale, run `cd dashboard && node build-data.js`)

## Check 5 — File Structure

### 5a. Orphaned Files
Check for files in the repo root that should be in a subdirectory:
- `.md` files that aren't README.md, CLAUDE.md, STATUS.md, CHANGELOG.md, CONTRIBUTING.md, LICENSE → **WARN**
- `.csv` or `.json` files in root → **WARN**

### 5b. Versioned Files
```bash
find . -name "*_v[0-9]*" -o -name "*_old*" -o -name "*_backup*" -o -name "*_new*" | grep -v node_modules | grep -v .git
```
- Any versioned files found → **WARN** (keep only latest, rename clean, delete outdated)

### 5c. Empty Directories
Check that key directories have content (not just `.gitkeep`):
- After onboarding: `research/competitors/`, `data/` should have files within a few sessions
- Flag directories that are still empty after the project has been active for multiple sessions

## Check 6 — Template Usage

For each call notes file in `discovery/calls/`:
- Check it follows the structure in `templates/call-notes.md` (has Key Takeaways, Pain Points, WTP Signals sections)
- Missing sections → **WARN**

For each competitor file in `research/competitors/`:
- Check it has a TL;DR section and evidence grades
- Missing → **WARN**

## Check 7 — Evidence Grading Coverage

Scan all files in `research/` and `discovery/calls/` for factual claims without evidence grades:
- Count claims tagged [CONFIRMED], [SECONDARY], [INFERENCE], [ASSUMPTION]
- Count untagged factual statements (heuristic: sentences with numbers, dates, or company names)
- Report the ratio: `{tagged} / {tagged + untagged}` as evidence coverage percentage
- Below 70% → **WARN**

## Check 8 — Module Consistency

If `project.config.json` exists, check module configuration:
- If `discovery: false` → verify `discovery/` directory doesn't contain working files (only `.gitkeep`)
- If `dashboard: false` → verify `dashboard/` was removed
- If `pipeline: false` → verify pipeline-related skills are removed

---

## Health Score

Calculate and report:

| Rating | Criteria |
|--------|----------|
| **Healthy** (100%) | Zero FAILs, zero WARNs |
| **Good** (80–99%) | Zero FAILs, some WARNs |
| **Needs Attention** (50–79%) | 1–2 FAILs or many WARNs |
| **Unhealthy** (<50%) | 3+ FAILs |

## Output Format

```
## Project Health Report — {date}

**Score**: {Healthy/Good/Needs Attention/Unhealthy} ({percentage}%)

### Critical Issues (must fix)
- {issue description} — {file path}

### Warnings (should fix)
- {issue description} — {file path}

### Passed
- {check name} ✓

### Recommended Actions
1. {most important fix}
2. {second most important}
3. ...
```
