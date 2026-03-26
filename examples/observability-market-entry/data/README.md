# Entity Data — How This File Works

`entities.csv` is the **source of truth** for the pipeline. Every prospect, partner, or entity being tracked lives here.

## How data flows

1. You add or update rows in `entities.csv` (manually or via `/pipeline-update`)
2. `dashboard/build-data.js` reads this CSV and outputs `dashboard/data/entities.json`
3. The Pipeline dashboard page renders the JSON as an interactive table

## Column reference

| Column | Description | Updated by |
|--------|-------------|------------|
| `name` | Display name of the entity | `/pipeline-update` on first add |
| `slug` | URL-safe lowercase name (e.g., "cloudstack-ai") | Auto-generated |
| `status` | Current pipeline stage (Not started → Contacted → Engaged → Meeting booked → Meeting completed → Dead) | `/pipeline-update` |
| `tier` | Priority level (Tier 1 = primary focus, Tier 2 = secondary, Tier 3 = low priority) | Manual |
| `category` | Industry or segment label | Manual |
| `last_contact` | Date of most recent interaction (YYYY-MM-DD) | `/pipeline-update` |
| `next_action` | What needs to happen next | `/pipeline-update` |
| `channel` | How you're communicating (Email, LinkedIn, Phone, Web) | `/pipeline-update` |
| `notes` | Free-text context | Manual or `/pipeline-update` |

## Important rules

- **Always add entities here first**, never only in the dashboard JSON
- The dashboard JSON is generated — editing it directly will be overwritten on next build
- Status transitions follow the lifecycle in `/pipeline-update` skill
