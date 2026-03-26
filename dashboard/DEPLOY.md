# Dashboard Deployment

Quick reference for deploying the strategy dashboard to Vercel.

## Prerequisites

- Node.js 18+
- A Vercel account (https://vercel.com) connected to your GitHub

## Local Build

```bash
cd dashboard
npm install
node build-data.js
```

Open `index.html` in a browser to preview locally.

## Deploy to Vercel

### Option 1: Via Vercel Dashboard
1. Import your GitHub repository at https://vercel.com/new
2. Set **Root Directory** to `dashboard`
3. Build settings are auto-detected from `vercel.json`
4. Deploy

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
cd dashboard
vercel
```

## Auto-Deploy

Once connected, every push to `main` triggers a rebuild. The `/session-end` skill commits and pushes automatically, so your dashboard stays current.

## Configuration

`vercel.json` defines:
- **buildCommand**: `node build-data.js` — regenerates JSON from markdown/CSV
- **installCommand**: `npm install` — installs csv-parse and marked
- **outputDirectory**: `.` — serves from the dashboard root

## Data Pipeline

```
project root files ──→ build-data.js ──→ dashboard/data/*.json ──→ browser
```

Build reads (read-only): `memory/*.md`, `docs/**/*.md`, `data/*.csv`, `research/**/*.md`
Build writes: `dashboard/data/overview.json`, `entities.json`, `competitors.json`, `decisions.json`, `scoring.json`, `timeline.json`, `research.json`

## Privacy

- The deployed dashboard is **publicly accessible** by default
- Use a private GitHub repo, but note the Vercel URL is still reachable
- For confidential projects, consider Vercel's password protection (paid feature) or local-only viewing
- `robots.txt` includes `noindex, nofollow` to discourage search engine indexing
