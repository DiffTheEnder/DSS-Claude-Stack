# Contributing to DS Strategy Stack

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Table of Contents

- [Local Setup](#local-setup)
- [Adding a New Skill](#adding-a-new-skill)
- [Adding a Dashboard Page](#adding-a-dashboard-page)
- [Modifying Templates](#modifying-templates)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Skill Authoring Standards](#skill-authoring-standards)
- [Code of Conduct](#code-of-conduct)
- [Reporting Issues](#reporting-issues)

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DiffTheEnder/DSS-Claude-Stack.git
   cd DSS-Claude-Stack
   ```

2. **Install dashboard dependencies:**
   ```bash
   cd dashboard
   npm install
   ```

3. **Copy the example config:**
   ```bash
   cp project.config.example.json project.config.json
   ```
   Fill in the fields relevant to your project.

4. **Build the dashboard data:**
   ```bash
   node scripts/build-data.js
   ```

5. **Run the health check** to verify everything is wired up:
   ```
   /health-check
   ```

## Adding a New Skill

Skills live in `skills/{skill-name}/SKILL.md`. Each skill file requires YAML frontmatter followed by the skill body.

1. Create the directory: `skills/your-skill-name/`
2. Create `SKILL.md` with the following structure:

   ```markdown
   ---
   name: your-skill-name
   description: One-line summary of what the skill does
   trigger: When should someone invoke this skill
   reads:
     - memory/strategic-context.md
     - data/entities.csv
   writes:
     - memory/decisions-log.md
   evidence_grading: true
   ---

   # Your Skill Name

   ## Steps

   1. Read the required context files listed above.
   2. Perform the core analysis or automation.
   3. Write outputs to the specified files.
   4. Summarise the result for the user.
   ```

3. Test the skill by invoking it in a Claude Code session.
4. Run `/health-check` to confirm the skill is recognised.

## Adding a Dashboard Page

1. **Create the HTML file** in `dashboard/` (e.g. `dashboard/my-page.html`).
2. **Add a sidebar entry** in the shared navigation component so users can navigate to your page.
3. **Extend `scripts/build-data.js`** to generate any JSON data your page needs. Output files go to `dashboard/data/`.
4. **Test locally** by opening the HTML file in a browser and verifying data loads correctly.

## Modifying Templates

Templates live in `templates/`. Each template is a Markdown file used during skill execution.

- **call-prep** — Pre-call research brief
- **call-notes** — Structured post-call capture
- **entity-teardown** — Deep-dive analysis of a single entity

To modify a template:

1. Edit the relevant file in `templates/`.
2. Preserve any placeholder variables (wrapped in `{{double braces}}`).
3. Test by running the skill that consumes the template.
4. Document any new placeholders you introduce.

## Pull Request Guidelines

- **One feature per PR.** Keep changes focused and reviewable.
- **Test with `/health-check`** before submitting. Confirm all skills, memory files, and snapshots pass validation.
- **Test with a dashboard build** (`node scripts/build-data.js`) to ensure nothing is broken.
- **Update `CHANGELOG.md`** with a summary of your changes under an `[Unreleased]` heading.
- **Use Australian English** throughout all prose, comments, and documentation (e.g. behaviour, colour, organise, analyse, centre, defence).
- Write a clear PR description using the pull request template.

## Skill Authoring Standards

### Frontmatter Format

Every skill must include valid YAML frontmatter with these fields:

| Field              | Required | Description                                      |
|--------------------|----------|--------------------------------------------------|
| `name`             | Yes      | Kebab-case skill identifier                      |
| `description`      | Yes      | One-line summary                                 |
| `trigger`          | Yes      | When the skill should be used                    |
| `reads`            | Yes      | List of files the skill reads                    |
| `writes`           | Yes      | List of files the skill writes to                |
| `evidence_grading` | No       | Set to `true` if the skill uses evidence grades  |

### Evidence Grading

When a skill produces claims or assessments, grade each piece of evidence:

- **A — Direct**: First-hand data, confirmed by primary source
- **B — Corroborated**: Multiple independent secondary sources agree
- **C — Plausible**: Single secondary source, logically consistent
- **D — Speculative**: Inference or assumption, not yet validated

Always surface the grade alongside the claim so readers can calibrate trust.

### Memory Interaction

- Read from memory files at the start of a skill to gather context.
- Write to memory files at the end to persist learnings.
- Never overwrite the entire memory file — append or update the relevant section.
- Use the standardised headers defined in each memory file.

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. All participants are expected to:

- **Be respectful** — Disagreement is fine; personal attacks are not.
- **Be constructive** — Offer actionable feedback, not dismissive criticism.
- **Be inclusive** — Use language that welcomes people of all backgrounds and experience levels.
- **Be collaborative** — Remember that open source thrives on shared effort and good faith.

Unacceptable behaviour includes harassment, discrimination, trolling, and sustained disruption. Violations may result in removal from the project.

If you experience or witness unacceptable behaviour, please open an issue or contact a maintainer directly.

## Reporting Issues

When reporting a bug or requesting a feature, please use the appropriate issue template:

- **Bug report** — Describe what happened, steps to reproduce, expected behaviour, and your environment.
- **Feature request** — Describe the problem you are solving, your proposed solution, and alternatives you have considered.
- **Skill idea** — Propose a new skill with its name, workflow, file interactions, trigger, and draft steps.

Search existing issues before opening a new one to avoid duplicates. Provide as much detail as possible to help maintainers triage and respond quickly.
