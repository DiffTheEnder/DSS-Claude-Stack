# Scoring — Meridian Observability

## Strategic Options Evaluated

Scored on 26 March 2026 by Priya and Marcus after completing initial competitor teardowns.

### Scoring Dimensions (1-5 scale)

| Dimension | Option A: Full-Stack Lite | Option B: Best-of-Breed APM | Option C: Open-Source Plus |
|-----------|--------------------------|----------------------------|---------------------------|
| White Space | 5 — No one owns "80% features at 40% cost" for mid-market | 3 — Crowded APM space, competing with Datadog's core | 2 — Grafana Cloud already occupies this positioning |
| Urgency | 4 — Mid-market pain is real and growing as companies scale | 4 — APM is highest-urgency pain point | 3 — Open-source users tolerate friction longer |
| Feasibility | 3 — Broad scope but OTel-native reduces build effort | 5 — Narrow scope, faster to ship | 2 — Competing with free/OSS requires massive feature parity |
| Defensibility | 4 — Platform breadth + self-serve UX creates compound moat | 2 — Single-product APM is commoditising | 1 — Open-source can always catch up; no defensible differentiation |
| Revenue Potential | 5 — $15-25k ACV with expansion to full stack over time | 3 — $8-12k ACV ceiling for APM-only | 2 — Compressed margins competing near open-source pricing |
| Time to Market | 3 — 6-8 months for APM + logs MVP | 5 — 3-4 months for APM-only MVP | 2 — 8-12 months to match Grafana Cloud feature set |
| **Total** | **24/30** | **22/30** | **12/30** |

## Option Details

### Option A: "Full-Stack Lite" (RECOMMENDED)

**Positioning:** 80% of enterprise observability features at 40% of the cost, with self-serve onboarding.

- Launch with APM + log management (tracing in v2)
- OTel-native ingestion, no proprietary agents
- Self-serve trial with usage-based pricing ($15-25k/yr target ACV)
- Differentiate on: predictable pricing, fast onboarding (< 30 min to first dashboard), mid-market-optimised defaults

**Why this wins:** Largest addressable market, strongest revenue potential, and defensible through platform breadth. The "lite" framing explicitly positions against enterprise bloat — it is a feature, not a limitation.

### Option B: "Best-of-Breed APM"

**Positioning:** The fastest, most developer-friendly APM tool on the market.

- APM-only — deep performance monitoring, code-level traces, error tracking
- Compete directly with Datadog APM and New Relic APM on developer experience
- Lower price point ($8-12k/yr) to undercut incumbents

**Why this loses:** APM alone is commoditising. Datadog, New Relic, Elastic, and Sentry all compete here. Differentiation would rely purely on UX and price — both are fragile moats. Revenue ceiling is too low.

### Option C: "Open-Source Plus"

**Positioning:** Managed Grafana with premium features for teams that want open-source without the ops burden.

- Managed Grafana + Loki + Tempo stack with premium dashboards, alerting, and support
- Compete with Grafana Cloud on UX and managed experience
- Pricing at $10-18k/yr — slight premium over Grafana Cloud for white-glove experience

**Why this loses:** Competing adjacent to a well-funded open-source company (Grafana Labs raised $240M) on their own technology is a losing proposition. No path to meaningful differentiation or defensibility.

## Recommendation

**Proceed with Option A: Full-Stack Lite.**

The scoring is clear — Option A leads on 4 of 6 dimensions and ties on Urgency. The main risk is feasibility (broader scope = longer build), but the decision to defer tracing to v2 mitigates this. The revenue potential and defensibility advantages are decisive.

Option B is a viable fallback if feasibility concerns materialise during build, but we should only pivot to it if the team cannot deliver APM + logs within 8 months.

Option C should be discarded — it has no path to a defensible business.
