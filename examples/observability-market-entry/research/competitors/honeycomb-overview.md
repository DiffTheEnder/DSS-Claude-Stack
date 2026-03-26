# Competitor Teardown: Honeycomb

**Last updated:** 23 March 2026
**Researcher:** Zara
**Relevance:** Direct competitor

## TL;DR

Honeycomb is the developer-favourite observability tool, built around an event-based data model that excels at debugging complex distributed systems. They have strong developer love (NPS ~62) and genuine technical differentiation in query power. However, they lack breadth (weak APM, no log management), struggle to sell to non-technical buyers, and their pricing can become expensive at scale. They are our closest philosophical competitor — we share the "developer-first, anti-enterprise" ethos — but we aim to be broader.

## Overview

| Attribute | Detail |
|-----------|--------|
| Founded | 2016 |
| HQ | San Francisco, CA |
| Employees | ~250 (estimated 2026) |
| Public/Private | Private |
| Revenue | ~$50-70M ARR (estimated — not publicly disclosed) |
| Funding | $97M total (Series C in 2022, led by Insight Partners) |
| Core Products | Observability platform (events, traces, SLOs), BubbleUp analysis |

## Key Findings

### 1. Best-in-class debugging experience [HIGH CONFIDENCE]

- **Evidence grade:** A — widely corroborated across developer communities, reviews, and our own evaluation
- Honeycomb's event-based data model allows arbitrary high-cardinality queries that other tools cannot match
- BubbleUp feature automatically surfaces anomalies — consistently cited as "magic" by users
- Developer NPS estimated at ~62 (well above Datadog at ~45 and New Relic at ~30)
- Strong presence at developer conferences and in developer communities (DevOpsDays, SREcon)

### 2. Limited product breadth is a growth constraint [HIGH CONFIDENCE]

- **Evidence grade:** A — confirmed through product evaluation and customer reviews
- Honeycomb is primarily a tracing and events platform — their APM capabilities are basic compared to Datadog
- No native log management — customers need a separate tool for logs (often Grafana Loki or Elasticsearch)
- This forces mid-market teams back into the "multiple tools" problem Honeycomb was supposed to solve
- G2 reviews (23 of 87) mention "wish it did more" or "still need other tools alongside Honeycomb"

### 3. Pricing becomes expensive at scale [MEDIUM CONFIDENCE]

- **Evidence grade:** B — based on published pricing and community reports, not direct customer data
- Events-based pricing ($0.20-0.35 per million events) is transparent but scales linearly with traffic
- Mid-market companies with 15-40 microservices generating high event volumes can hit $18-40k/yr
- Unlike Datadog's bill shock (which comes from host expansion), Honeycomb's cost surprise comes from event volume spikes during incidents — exactly when you need observability most
- Some customers report 2-3x cost increases during traffic spikes or incident debugging sessions

### 4. Struggles to sell beyond the engineering team [MEDIUM CONFIDENCE]

- **Evidence grade:** B — inferred from sales cycle data and Glassdoor reviews
- Honeycomb's strength with developers becomes a weakness when selling requires VP/C-suite sign-off
- Sales cycle reportedly averages 4-6 months in mid-market — longer than Datadog (2-4 months) despite lower ACV
- Glassdoor reviews from Honeycomb sales staff mention difficulty "selling to non-technical buyers"
- Limited dashboard and reporting features compared to Datadog — VPs want executive-level views that Honeycomb does not prioritise

### 5. Strong OpenTelemetry alignment [HIGH CONFIDENCE]

- **Evidence grade:** A — technically verified and publicly documented
- Honeycomb co-founder Charity Majors is a vocal OTel advocate; the company has been OTel-first since 2020
- Their OTel integration is mature and well-documented
- This means customers can potentially switch from Honeycomb to us with minimal re-instrumentation if we are also OTel-native
- However, it also means Honeycomb customers are less locked in than Datadog customers

## Relevance to Meridian

Honeycomb is our closest philosophical competitor but also validates our approach:

- **Threat:** They prove developer-first observability resonates with mid-market. If they broaden their product (adding APM + logs), they become a direct threat to our "full-stack lite" positioning.
- **Opportunity:** Their product gaps (no logs, limited APM) mean mid-market customers still need multiple tools. We can position as "Honeycomb's debugging philosophy with Datadog's breadth at neither's price."
- **Differentiation:** We differentiate from Honeycomb on breadth (APM + logs from day one) and on buyer experience (self-serve onboarding vs. their developer-only appeal). We should respect their technical excellence and avoid competing on query power — that is their moat.
- **Risk:** Honeycomb is well-funded and could expand scope. Their $97M in funding gives them runway to build APM and log management if they choose to.

## Open Questions

- [ ] Is Honeycomb planning to add log management? Monitor their blog, changelog, and conference talks.
- [ ] What is their actual mid-market market share? No reliable data available — estimate 3-5% of mid-market observability spend.
- [ ] How loyal are Honeycomb's developer advocates? If we offer a broader product, would Honeycomb fans switch or resist?
