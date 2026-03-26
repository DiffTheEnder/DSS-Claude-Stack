# MEMORY — Meridian Observability

## Project State

**Phase 2 — Research** (discovery starting)

Started: 10 March 2026
Last updated: 26 March 2026
Sessions completed: 6

## Leading Hypothesis

Mid-market SaaS companies (200-2000 employees) are paying 2-3x more than they should for observability because enterprise tools like Datadog price on per-host models that punish horizontal scaling, while open-source alternatives like Grafana require dedicated platform engineering time they cannot afford. A "full-stack lite" product offering 80% of enterprise features at 40% of the cost with self-serve onboarding can capture this segment.

## Current Priority

Complete competitor teardowns for Datadog, Grafana Cloud, and Honeycomb. Begin prospect outreach to Tier 1 targets. Process CloudStack AI call notes and extract pain point patterns.

<!-- DATA FLOW: Key Facts are manually maintained here. They provide quick orientation for any session. The /session-start skill reads this file to brief you at the start of each session. These facts should be updated whenever research or discovery produces new findings. -->
## Key Facts

1. The global observability market is projected at $45B in 2026, growing 14% YoY — the mid-market segment (~$8.2B) is the fastest-growing sub-segment at 19% YoY [SECONDARY — Gartner 2025 report]
2. 67% of mid-market engineering teams use 3+ observability tools simultaneously, creating data silos and context-switching costs [SECONDARY — DevOps Pulse Survey 2025]
3. Datadog's average contract value for mid-market is $35-80k/yr — 40-60% of mid-market buyers report "bill shock" after the first year [INFERENCE from G2 reviews and Reddit threads]
4. Grafana Cloud adoption in mid-market grew 34% in 2025, but churn is high (estimated 25% annual) due to operational complexity [INFERENCE — Grafana Labs blog + community forums]
5. OpenTelemetry adoption crossed 45% among mid-market companies in 2025, up from 22% in 2023 — this reduces switching costs and favours vendor-neutral platforms [SECONDARY — CNCF survey]
6. The average mid-market SaaS company runs 15-40 microservices — enough to need distributed tracing but not enough to justify a full SRE team [ASSUMPTION based on early conversations]
7. Honeycomb has strong developer love (NPS ~62) but struggles to sell to non-technical buyers — their sales cycle averages 4-6 months in mid-market [INFERENCE from Glassdoor reviews and G2]
8. New Relic's pivot to usage-based pricing in 2024 caused significant mid-market confusion — multiple G2 reviews cite unpredictable billing [SECONDARY — G2 reviews]
9. Mid-market SaaS companies typically allocate 3-5% of cloud spend to observability tooling [ASSUMPTION — needs validation in interviews]
10. Self-serve onboarding (< 30 minutes to first dashboard) is cited as a top-3 purchase criterion by 7/10 prospects we have spoken to informally [PRIMARY — early conversations]

<!-- DATA FLOW: One-liner summaries live here for quick reference. Full decision records with rationale, alternatives, and reversibility ratings live in memory/decisions.md. The dashboard Decisions page reads from memory/decisions.md via build-data.js → decisions.json. -->
## Key Decisions

1. **Focus on APM + logs first, defer tracing to v2** (Session 3, 17 March 2026) — Reduces scope and accelerates time to market. Tracing is valuable but less urgent than APM and log management based on early signal. See `memory/decisions.md`.
2. **Self-serve onboarding, no sales-led motion for initial launch** (Session 4, 19 March 2026) — Shapes product architecture around developer experience rather than enterprise sales. Harder to reverse but aligns with ICP behaviour. See `memory/decisions.md`.
3. **OpenTelemetry-native from day one, no proprietary agents** (Session 2, 14 March 2026) — Strategic bet on open standards. Reduces lock-in (good for customers) but means we compete on platform value, not data gravity. See `memory/decisions.md`.

<!-- DATA FLOW: Kill conditions flow to multiple places: this table is the quick-reference version. The full evidence tracker lives in memory/discovery.md. The dashboard Overview page reads kill conditions from docs/executive-summary.md via build-data.js → overview.json. All three locations must stay in sync — /session-end checks for this. -->
## Kill Condition Tracker

| # | Kill Condition | Status | Evidence |
|---|---------------|--------|----------|
| 1 | Fewer than 4/15 prospects rank observability fragmentation in top 3 pain points | EARLY SIGNAL (1/1 confirmed so far) | CloudStack AI ranked it #1. Sample too small to draw conclusions but directionally positive. |
| 2 | No WTP signal above $12k/yr after 10 interviews | UNTESTED | CloudStack AI mentioned $15-20k range but formal WTP exercise not yet conducted. |
| 3 | 3+ prospects say they'd build in-house rather than buy | PASSING (0/1 so far) | CloudStack AI explicitly said "we don't want to maintain this ourselves." |
| 4 | Datadog launches a mid-market tier before our target launch date | UNTESTED | No public signal yet. Monitoring Datadog blog, earnings calls, and Hacker News. |

## Important File Paths

- Project config: `project.config.json`
- Pipeline data: `data/entities.csv`
- Competitor research: `research/competitors/`
- Discovery calls: `discovery/calls/`
- Decisions log: `memory/decisions.md`
- Scoring matrix: `memory/scoring.md`
- Research notes: `memory/research.md`
- Discovery tracker: `memory/discovery.md`
- Status output: `docs/output/status-blurb.md`
- Work log: `docs/output/work-log.md`
- Project state: `context/project-state.md`
