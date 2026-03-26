# Dashboard — {{PROJECT_NAME}}

## Architecture

The dashboard is a static site that reads project markdown/CSV files via `build-data.js` and outputs JSON consumed by browser-side JavaScript.

```
research/competitors/*.md    ──┐
memory/research.md            │
memory/decisions.md           │
memory/scoring.md             ├──→  build-data.js  ──→  dashboard/data/*.json
docs/executive-summary.md     │     (reads files)       (overview, entities, competitors,
docs/output/status-blurb.md   │     (outputs JSON)       decisions, scoring, timeline,
docs/output/work-log.md       │                          research)
{{PIPELINE_SOURCE_OF_TRUTH}}  ┘
```

## Source of Truth Rules

1. **CSV is source of truth** for {{ENTITY_TYPE}} data — add {{ENTITY_TYPE_PLURAL}} to `{{PIPELINE_SOURCE_OF_TRUTH}}` first, never only to JSON
2. **Markdown files are source of truth** for research, status, and kill conditions
3. **JSON files in `dashboard/data/`** are generated outputs — never edit them directly

## Build & Deploy

- **Build**: `node build-data.js`
- **Dev**: `npm run dev` (auto-rebuilds on file changes)
- **Deploy**: Push to `main` — Vercel auto-deploys

## Adding New Pages

1. Create `new-page.html` using the sidebar template from `index.html`
2. Create `js/new-page.js` with page-specific logic
3. Add extraction logic to `build-data.js` if new data sources are needed
4. Add nav link to the sidebar in all HTML files
5. Rebuild: `node build-data.js`
