# Decisions — Meridian Observability

## Decision 1: Focus on APM + logs first, defer tracing to v2

- **Date:** 17 March 2026 (Session 3)
- **Decision maker:** Priya, with input from Marcus
- **Reversibility:** Moderate — we can add tracing later without rearchitecting, but marketing positioning and early customer expectations will be shaped by this choice
- **Status:** Active

### Context

We debated whether to launch with a full-stack product (APM + logs + traces) or a narrower offering. Building all three for launch would push the timeline by 3-4 months and require hiring 2 additional engineers.

### Rationale

- Early conversations suggest APM and log management are the top-2 pain points; tracing is a "nice to have" for most mid-market teams
- Being OTel-native means customers can send traces to us later with minimal friction — we are not closing the door
- A focused launch on APM + logs lets us ship by Q3 2026 instead of Q4
- Honeycomb proves that you can build a strong position starting narrow (they started traces-only)

### Risks

- Prospects who need tracing today may choose Datadog or Honeycomb instead of waiting for our v2
- "Full-stack lite" positioning becomes harder to justify without tracing at launch
- Competitors could frame us as incomplete

### What would change this

- If 5+ prospects in discovery interviews say tracing is a must-have for purchase, we revisit scope
- If a key hire with tracing expertise becomes available, we may accelerate the timeline

---

## Decision 2: Self-serve onboarding, no sales-led motion for initial launch

- **Date:** 19 March 2026 (Session 4)
- **Decision maker:** Priya and Marcus jointly
- **Reversibility:** Hard — this shapes product architecture (instrumentation wizard, in-app guides, usage-based trial), go-to-market motion, and hiring plan
- **Status:** Active

### Context

Traditional observability vendors use sales-led motions with 2-4 month sales cycles. Our ICP (VP Engineering / Head of Platform) prefers to evaluate tools hands-on before involving procurement.

### Rationale

- Mid-market buyers strongly prefer "try before you buy" — 7/10 early informal conversations confirmed this
- Self-serve reduces CAC dramatically compared to sales-led (estimated $800 vs $8,000 per customer)
- Aligns with our "anti-enterprise" positioning — we are the tool you can adopt without a 6-month procurement cycle
- Honeycomb and Grafana Cloud both use self-serve as primary motion; Datadog and New Relic require sales engagement for mid-market deals

### Risks

- Some mid-market buyers (especially in regulated industries like fintech and health) may still require a sales conversation for compliance and security review
- Self-serve products need excellent documentation and in-app guidance — this is a significant product investment
- Harder to control pricing and discounting without a human in the loop

### What would change this

- If conversion rates from self-serve trial are below 5% after 3 months, we introduce a "request a demo" path
- If regulated industries represent >40% of pipeline, we add a lightweight sales assist layer

---

## Decision 3: OpenTelemetry-native from day one, no proprietary agents

- **Date:** 14 March 2026 (Session 2)
- **Decision maker:** Marcus, endorsed by Priya
- **Reversibility:** Irreversible — this is a foundational architectural decision that affects data ingestion, storage, query, and customer onboarding
- **Status:** Active

### Context

Most observability vendors started with proprietary agents and are now retrofitting OTel support. We have the advantage of starting fresh.

### Rationale

- OpenTelemetry adoption is at 45% and accelerating — betting against it would be reckless
- OTel-native means zero vendor lock-in for customers, which is a powerful trust signal for mid-market buyers burned by Datadog's pricing
- Reduces our engineering investment — we leverage OTel collector, SDKs, and community contributions rather than building proprietary instrumentation
- Lightstep proved this approach works; their OTel-native positioning was a key acquisition driver for ServiceNow

### Risks

- No proprietary agents means no unique data moat — we must compete on platform experience, not data gravity
- OTel is still maturing in some areas (logs specification was only stabilised in late 2025)
- Customers with existing proprietary agents (Datadog, New Relic) face migration friction

### What would change this

- Nothing short of OTel project abandonment, which is extremely unlikely given CNCF backing and industry adoption trajectory
- This decision is considered irreversible and foundational
