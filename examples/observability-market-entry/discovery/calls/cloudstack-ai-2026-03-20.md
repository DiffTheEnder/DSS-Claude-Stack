# Call Notes: CloudStack AI

**Date:** 20 March 2026
**Duration:** 45 minutes
**Attendees:** Priya (Meridian), Zara (Meridian), Raj Patel — VP Engineering (CloudStack AI)
**Channel:** Zoom (video on)
**Call type:** Discovery interview

## Company Context

- CloudStack AI — developer tools SaaS, ~450 employees
- Series C, raised $85M in 2025
- Engineering team of ~120, platform team of 6 (no dedicated SRE)
- Running ~22 microservices on AWS EKS
- Current observability stack: Datadog (APM), Grafana (dashboards), PagerDuty (alerting), custom Python scripts (log aggregation)

## Key Takeaways

1. **Tool fragmentation is their #1 observability pain point.** They use 4 different tools and have built custom scripts to bridge gaps between them. Raj estimated his platform team spends 30% of their time on "observability plumbing" instead of platform improvements.

2. **Datadog bill shock is driving urgency.** Their Datadog costs doubled from $18k to $38k in a single quarter when they expanded from 8 to 15 microservices. Raj said leadership is "questioning whether Datadog is worth it" and has asked him to evaluate alternatives.

3. **Self-serve onboarding is a hard requirement.** Raj explicitly said he does not have time for a multi-week vendor evaluation. He wants to "install something on a Friday and have dashboards by Monday." He mentioned trying to evaluate Honeycomb but abandoned it after the setup took too long for their specific stack.

## Pain Point Rankings

Raj ranked his observability pain points (prompted by us):

1. **Tool fragmentation** — "death by a thousand tabs" — correlating data across tools is the biggest time sink during incidents
2. **Cost unpredictability** — Datadog's per-host pricing makes it impossible to forecast observability spend as they scale
3. **Onboarding time** — evaluated 2 alternatives in the past year but abandoned both because setup was too complex
4. **Alert fatigue** — too many false positives from poorly configured thresholds across multiple tools
5. **Lack of team-level views** — engineering managers want to see their services' health at a glance without learning Grafana query language

## Willingness to Pay Signals

- **Current spend:** ~$52k/yr across all observability tools (Datadog $38k, PagerDuty $8k, Grafana Cloud $4k, misc $2k)
- **WTP for a unified platform:** Raj said $15-20k/yr would be "a no-brainer" — he'd sign that today if the product existed
- **Budget authority:** Raj can approve up to $25k/yr without VP-level sign-off. Above that requires CFO approval.
- **Procurement process:** For tools under $25k, it is a 2-week approval. For tools above, 6-8 weeks with security review.

## Key Quotes

> "We're spending $52k a year on observability and I still can't answer 'what happened?' in under 10 minutes during an incident. That's embarrassing."

> "I don't want to maintain this ourselves. I've seen teams try to build internal observability platforms and it always becomes a black hole for engineering time."

> "If you could give me Datadog's APM and Grafana's dashboards in one tool for $20k, I'd sign today. I'm not joking."

> "The dream is: install on Friday, dashboards by Monday, and a bill I can predict."

## Hypotheses Tested

| Hypothesis | Result | Notes |
|-----------|--------|-------|
| Mid-market companies use 3+ observability tools | CONFIRMED | CloudStack AI uses 4 tools + custom scripts |
| Datadog pricing is a top-3 pain point | CONFIRMED | Ranked #2; drove the alternative evaluation |
| Self-serve onboarding (< 30 min) is a purchase criterion | CONFIRMED | Raj called it a "hard requirement" |
| WTP in $15-25k/yr range | CONFIRMED | Raj said $15-20k is a "no-brainer" |
| Mid-market teams would build in-house rather than buy | REJECTED | Raj explicitly said "I don't want to maintain this ourselves" |

## Kill Condition Updates

- **KC1 (fragmentation in top 3 pain points):** PASS — ranked #1
- **KC2 (WTP above $12k/yr):** PASS — $15-20k range cited
- **KC3 (build vs. buy):** PASS — explicitly prefers buying
- **KC4 (Datadog mid-market tier):** No signal — Raj has not heard of any Datadog plans for a mid-market offering

## Next Steps

- [ ] Send Raj a follow-up email thanking him for his time (Priya — by 21 March)
- [ ] Process these notes into discovery tracker and update kill conditions (Zara — by 22 March)
- [ ] Add CloudStack AI pain points to the emerging pattern tracker (Zara — by 22 March)
- [ ] Schedule a second call to do a deeper dive on their technical stack and integration requirements (Priya — target week of 31 March)
- [ ] Ask Raj if he would be willing to be a design partner for early prototypes (Priya — in second call)
