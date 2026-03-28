# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] — 2026-03-29

### Added
- ESLint + Prettier configuration for code style enforcement
- Jest test suites for CLI scaffolder (14 tests) and dashboard builders (12 tests)
- Modularized dashboard build system — `build-data.js` split into per-page builders in `dashboard/builders/`
- Dashboard build freshness indicator showing "Last built: X" in sidebar
- Snapshot freshness check script (`scripts/check-snapshot-freshness.sh`)
- Structure upgrade script (`scripts/upgrade-structure.sh`) for upgrading Minimal/Essentials to Full
- JSDoc type annotations and `@ts-check` across CLI and dashboard source files
- CI now runs tests on pull requests and checks snapshot freshness on push

### Changed
- README rewritten with "second brain" positioning — explains how the memory layer, context snapshots, and evidence grading work together
- Getting Started guide promoted more prominently in README
- CLI scaffolder now validates inputs (project name, type, structure) before copying files
- CLI scaffolder cleans up partial directory on failure
- Skills that use evidence grading (`enrich-entity`, `process-call`, `synthesise`, `health-check`, `critical-reasoning`) now respect the `features.evidenceGrading` flag in `project.config.json`
- `/onboard` skill now explicitly includes CLAUDE.md in placeholder replacement

### Fixed
- Evidence grading feature flag was ignored by skills — now conditionally applied

## [1.2.0] — 2026-03-26

### Added
- 6 new project types: Competitor Research, Product Launch / GTM, Internal Implementation, Vendor / Partner Evaluation, Due Diligence, Business Case, Transformation / Change
- Alternative pipeline lifecycle for non-outreach projects (Not started → In progress → Blocked → Completed → Cancelled)
- `projectType` field in project.config.json
- Type-specific scoring dimensions and kill condition examples for all 10 types

### Changed
- Replaced "Corporate Strategy" with more specific types: Business Case and Transformation / Change
- Onboarding now offers 10 project types with tailored defaults for each

## [1.1.0] — 2026-03-26

### Added
- Getting Started guide for non-technical users (`docs/getting-started.md`)
- Dashboard deployment guide (`dashboard/DEPLOY.md`)
- Onboarding now asks about user goals (learning, real project, team coordination, exploration)
- Onboarding now asks about experience level and feature selection (Full, Essentials, Minimal)
- Feature toggles in `project.config.json` (scoring, kill conditions, evidence grading, weekly reports, context snapshots)

### Changed
- Simplified `/critical-reasoning` from 6 specialised lenses + leader frameworks to 4 accessible lenses (Is It True?, What Happens Next?, What Could Go Wrong?, Can It Actually Be Done?)
- Onboarding Quick Start expanded from 5 to 7 questions (added goal and structure level)
- Onboarding Full Setup expanded from 13 to 16 questions (added goals, experience, feature selection)

## [1.0.0] — 2026-03-26

### Added
- Initial open-source release
- 14-skill library (onboard, session-start, session-end, health-check, rebuild-snapshots, pipeline-update, outreach-sequence, process-call, enrich-entity, synthesise, critical-reasoning, decision, compare-options, weekly-report)
- Live dashboard with 7 pages (overview, pipeline, competitors, decisions, scoring, timeline, research hub)
- Memory layer with 5 persistent files
- Context snapshot system (4 pre-computed snapshots)
- 3 templates (call-prep, call-notes, entity-teardown)
- Evidence grading system
- Multi-agent coordination via STATUS.md
- Vercel deployment support
- Project template
