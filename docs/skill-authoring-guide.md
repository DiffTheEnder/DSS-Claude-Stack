# Skill Authoring Guide

How to create and contribute new skills for the DS Strategy Stack.

---

## SKILL.md Frontmatter

Every skill lives in `skills/{skill-name}/SKILL.md`. The file **must** begin with YAML frontmatter containing at least two required fields:

```yaml
---
name: my-skill-name
description: A one-sentence summary of what this skill does and when to use it.
---
```

- **name** (required): Lowercase, hyphenated identifier. Must match the directory name.
- **description** (required): Plain text, one to two sentences. Shown in skill listings and help output.

## Directory Structure

```
skills/
  my-skill-name/
    SKILL.md          # The skill definition (required)
```

Each skill gets its own directory under `skills/`. The directory name must match the `name` field in the frontmatter. Keep one skill per directory — do not bundle multiple skills together.

## Skill Types

Skills fall into two categories:

### Rigid Skills

Rigid skills execute every step in order. The user (or Claude) must not skip steps or reorder them. Use rigid skills for processes where completeness matters — audits, checklists, onboarding flows.

**Example**: `health-check` runs every check regardless of context.

When writing a rigid skill, number each step clearly and include a note at the top:

```markdown
> **Type: Rigid** — Execute all steps in order. Do not skip or reorder.
```

### Flexible Skills

Flexible skills provide a framework that adapts to context. Steps can be skipped, reordered, or expanded based on what the project needs right now. Use flexible skills for creative or analytical work — research synthesis, competitive analysis, decision-making.

**Example**: `synthesise` may focus on different research areas depending on what data is available.

When writing a flexible skill, note which steps are optional:

```markdown
> **Type: Flexible** — Adapt steps to the current context. Steps marked (optional) may be skipped.
```

## Memory File Interactions

Skills frequently read from and write to memory files. Document these interactions clearly so that users and other skills know what to expect.

### Reading Memory

If your skill reads from memory files, list them at the top of the skill:

```markdown
## Inputs
- `memory/MEMORY.md` — current project state and priorities
- `memory/research.md` — entity capability map and research findings
```

### Writing to Memory

If your skill updates memory files, specify exactly what it changes:

```markdown
## Outputs
- Updates `memory/MEMORY.md` § Current Priority
- Appends to `memory/discovery.md` § Discovery Log
```

Always use the **append or update** pattern — never overwrite an entire memory file. Other skills depend on sections you did not write.

## Evidence Grading System

All factual claims in research and discovery files must carry an evidence grade. When your skill produces or processes factual content, enforce these tags:

| Tag | Meaning | When to use |
|-----|---------|-------------|
| `[CONFIRMED]` | Verified from a primary source | Official docs, direct quotes, first-party data |
| `[SECONDARY]` | From a credible but indirect source | Industry reports, reputable journalism |
| `[INFERENCE]` | Logically derived from confirmed facts | Reasonable conclusions from known data |
| `[ASSUMPTION]` | Unverified belief or estimate | Hypotheses, rough estimates, hearsay |

If your skill generates research output, include a reminder to tag every factual claim. If your skill consumes research, validate that evidence grades are present and flag ungraded claims.

## Adding Dashboard Data Extraction

If your skill produces structured data that should appear on the dashboard, you need to extend the build pipeline.

### Step 1: Define your data shape

Decide what JSON structure your data should produce. For example:

```json
{
  "lastUpdated": "2026-03-26",
  "items": [
    { "name": "Example", "status": "active" }
  ]
}
```

### Step 2: Extend build-data.js

Open `dashboard/build-data.js` and add a new extraction function:

```javascript
// Extract data for my-skill
function extractMySkillData() {
  // Read source files from research/, memory/, or discovery/
  // Parse and structure the data
  // Write to dashboard/data/my-skill.json
}
```

Call your function from the main build sequence at the bottom of the file.

### Step 3: Create a dashboard view (optional)

If your data warrants its own page, create a new HTML file in `dashboard/` following the patterns in existing pages like `competitors.html` or `pipeline.html`.

## Testing Your Skill

After creating or modifying a skill:

1. **Run the health check** to catch structural issues:
   ```bash
   scripts/health-check.sh
   ```

2. **Validate placeholders** if your skill references template tokens:
   ```bash
   scripts/validate-placeholders.sh
   ```

3. **Check frontmatter** manually — ensure `name` and `description` are present and the name matches your directory.

4. **Test the skill end-to-end** by invoking it in a Claude session and verifying:
   - All listed inputs are read
   - All listed outputs are written correctly
   - Memory files are updated (not overwritten)
   - Evidence grades are applied where relevant

## Example Skill Template

Below is a minimal skill you can copy and adapt:

```markdown
---
name: example-skill
description: A brief description of what this skill does and when it should be invoked.
---

# Example Skill

> **Type: Flexible** — Adapt steps to the current context.

## Inputs
- `memory/MEMORY.md` — current project state

## Outputs
- Updates `memory/MEMORY.md` § Current Priority

---

## Step 1 — Assess Current State

Read `memory/MEMORY.md` and summarise the current project phase and priorities.

## Step 2 — Perform Analysis

<!-- Your skill logic here -->

## Step 3 — Update Memory (optional)

If the analysis produced new insights, update `memory/MEMORY.md` with:
- Any changed priorities
- New findings tagged with evidence grades
```

## Australian English Requirement

All content in this project — skill definitions, comments, documentation, and code comments — must use Australian English spelling conventions:

- **-ise** not -ize (e.g. organise, prioritise, recognise, synthesise)
- **-our** not -or (e.g. colour, behaviour, honour)
- **-re** not -er (e.g. centre, theatre)
- **analyse** not analyze

This applies to skill descriptions, step text, comments in code, and any generated output.

## Checklist Before Submitting

- [ ] `SKILL.md` has valid frontmatter with `name` and `description`
- [ ] Directory name matches the `name` field
- [ ] Skill type (Rigid or Flexible) is clearly stated
- [ ] Inputs and outputs are documented
- [ ] Evidence grading guidance is included (if the skill handles factual content)
- [ ] Tested with `scripts/health-check.sh`
- [ ] Australian English spelling used throughout
