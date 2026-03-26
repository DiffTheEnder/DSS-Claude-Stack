# Research — Meridian Observability

## Entity Capability Map

| Name | Category | Key Strength | Key Weakness | Mid-Market Cost | Pricing Model | Lock-in | Relevance |
|------|----------|-------------|-------------|----------------|---------------|---------|-----------|
| Datadog | Enterprise incumbent | Full platform — APM, logs, traces, infra in one pane | Expensive, complex; per-host pricing punishes horizontal scaling | $35-80k/yr | Per-host | High (custom agents, proprietary data format) | Primary threat |
| Grafana Cloud | Open-source-based | Community, flexibility, OpenTelemetry support | Steep learning curve; requires platform engineering expertise to operate well | $8-20k/yr | Usage-based | Low (open standards, portable dashboards) | Adjacent |
| Honeycomb | Developer-focused | Query power, event-based model, excellent debugging UX | Limited APM; weak on log management; struggles with non-technical buyers | $18-40k/yr | Events-based | Medium (proprietary query language) | Direct competitor |
| New Relic | Legacy enterprise | Brand recognition, full-stack coverage, large partner ecosystem | Outdated UX, unpredictable billing after usage-based pivot, slow innovation | $25-60k/yr | Per-user + data ingest | High (proprietary data format, NRQL lock-in) | Secondary threat |
| Lightstep (ServiceNow) | Trace-focused | OpenTelemetry native (co-founders are OTel creators), strong trace analysis | Narrow scope — tracing only; being absorbed into ServiceNow platform | $15-30k/yr | Trace-based | Medium (ServiceNow ecosystem pull) | Niche overlap |

### Key Takeaways from Competitor Analysis

- **Pricing is the primary vulnerability** — Every enterprise incumbent uses a model that becomes unpredictable at mid-market scale. This is our clearest wedge.
- **OpenTelemetry is the rising tide** — OTel adoption reduces switching costs across the board. We must be OTel-native, not OTel-compatible.
- **Developer experience is under-invested** — Datadog and New Relic optimise for enterprise buyers (procurement, compliance, dashboards for execs). Honeycomb gets developer UX right but lacks breadth.
- **No one owns "self-serve mid-market"** — Grafana Cloud is closest but requires too much DIY. This is our white space.

## Market Sizing

| Metric | Value | Confidence | Source |
|--------|-------|------------|--------|
| TAM | $45B global observability (2026) | SECONDARY | Gartner 2025 Observability Market Report |
| SAM | $8.2B mid-market segment (200-2000 employees) | INFERENCE | Extrapolated from Gartner TAM using company size distribution data from Statista |
| SOM | $120M addressable in Year 1 (ANZ + US mid-market SaaS) | ASSUMPTION | Based on ~8,000 target companies x estimated 15% conversion at $15k average ACV — highly speculative, needs validation |

### Sizing Notes

- TAM figure includes infrastructure monitoring which is out of scope, so effective TAM for our categories (APM, logs, traces) is closer to $28B
- SAM estimate assumes mid-market represents ~18% of total observability spend, which tracks with Datadog's earnings breakdown
- SOM is deliberately conservative — assumes we only target SaaS verticals in ANZ and US, and only achieve 1.5% penetration in Year 1

## Target Entity List

| Name | Tier | Category | Size (employees) | Current Stack | Pain Signal |
|------|------|----------|-------------------|---------------|-------------|
| CloudStack AI | Tier 1 | SaaS - DevTools | ~450 | Datadog + Grafana + PagerDuty + custom scripts | Using 4 tools, high frustration with Datadog costs |
| Nexus Payments | Tier 1 | SaaS - Fintech | ~800 | New Relic + ELK stack | Bill shock from New Relic, compliance requirements |
| Orbit CRM | Tier 1 | SaaS - CRM | ~350 | Grafana OSS + Jaeger + CloudWatch | Series B, outgrowing open-source setup |
| Pulse Health | Tier 2 | SaaS - HealthTech | ~600 | Datadog (basic tier) | Warm intro from investor, likely cost-sensitive |
| DataForge | Tier 2 | SaaS - Data | ~400 | Grafana Cloud | Found via negative G2 review of Datadog |
| Streamline HR | Tier 2 | SaaS - HR | ~250 | Unknown | Fits ICP on size; needs discovery to confirm pain |
| CodeBridge | Tier 3 | SaaS - DevTools | ~50 | Free tier tools | Too small — below ICP threshold. Deprioritised. |
| Vantage Analytics | Tier 3 | SaaS - Analytics | ~200 | Honeycomb | At lower end of ICP; timing not right per initial contact |
