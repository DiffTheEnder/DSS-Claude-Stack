# Discovery — Meridian Observability

## Pain Points Identified

### 1. Observability tool fragmentation

- **Frequency:** 1/1 interviews (100% — too early to be meaningful, but directionally strong)
- **Severity:** High
- **Description:** Mid-market teams cobble together 3-5 tools (APM, logs, metrics, alerting, on-call) because no single affordable platform covers their needs. This creates context-switching costs, duplicated data, and gaps in correlation.
- **Evidence:** CloudStack AI uses Datadog (APM), Grafana (dashboards), PagerDuty (alerting), and custom scripts (log aggregation). Their VP Engineering called it "death by a thousand tabs."
- **Source:** CloudStack AI call, 20 March 2026

### 2. Unpredictable pricing and bill shock

- **Frequency:** Mentioned in 1/1 interviews + corroborated by 12+ G2 reviews
- **Severity:** High
- **Description:** Enterprise observability tools use per-host, per-user, or usage-based pricing that becomes unpredictable as mid-market companies scale. Teams either over-provision (wasting budget) or under-provision (missing data).
- **Evidence:** CloudStack AI's Datadog bill doubled when they moved from 8 to 15 microservices. "We went from $18k to $38k in one quarter and nobody saw it coming."
- **Source:** CloudStack AI call, 20 March 2026 + G2 reviews of Datadog and New Relic

### 3. Onboarding complexity requires dedicated platform engineering

- **Frequency:** Mentioned in 1/1 interviews + 3 informal conversations
- **Severity:** Medium-High
- **Description:** Both enterprise tools and open-source stacks require significant setup time. Mid-market companies without dedicated SRE or platform teams struggle to get value within the first month.
- **Evidence:** CloudStack AI spent 3 weeks getting Grafana dashboards configured. Their Head of Platform said: "I wanted to evaluate Honeycomb but I couldn't justify another week of setup when we have product work to ship."
- **Source:** CloudStack AI call, 20 March 2026

## Willingness to Pay (WTP) Signals

### Signal 1: CloudStack AI — $15-20k/yr range

- **Context:** When asked "What would you expect to pay for a single platform that replaces your current stack?", their VP Engineering said $15-20k/yr would be "a no-brainer" given they currently spend ~$38k across tools.
- **Confidence:** Medium — single data point, and the respondent was primed by discussing current spend
- **Source:** CloudStack AI call, 20 March 2026

### Signal 2: Informal — "less than Datadog" threshold

- **Context:** In 3 informal conversations at the SaaS Melbourne meetup (12 March), multiple engineering leaders said they would switch tools if the replacement was "meaningfully cheaper than Datadog" — estimated at 40-50% less.
- **Confidence:** Low — informal, no structured WTP exercise, social desirability bias likely
- **Source:** SaaS Melbourne meetup, 12 March 2026

## Kill Condition Tracker

| # | Kill Condition | Status | Threshold | Current | Evidence |
|---|---------------|--------|-----------|---------|----------|
| 1 | Fewer than 4/15 prospects rank observability fragmentation in top 3 pain points | EARLY SIGNAL | 4/15 | 1/1 | CloudStack AI ranked it #1. Need 14 more data points. |
| 2 | No WTP signal above $12k/yr after 10 interviews | UNTESTED | $12k/yr after 10 interviews | $15-20k (1 data point) | Too early — only 1 formal interview completed. |
| 3 | 3+ prospects say they'd build in-house rather than buy | PASSING | 3/15 | 0/1 | CloudStack AI explicitly prefers buying. |
| 4 | Datadog launches a mid-market tier before our target launch date | UNTESTED | Any public announcement | No signal | Monitoring Datadog blog, earnings transcripts, HN, and X. |

## Outreach Log

| Date | Prospect | Channel | Action | Outcome | Next Step |
|------|----------|---------|--------|---------|-----------|
| 2026-03-12 | Vantage Analytics | LinkedIn | Connection request + message from Zara | Accepted, replied "timing is bad, maybe next quarter" | Follow up week of 24 March |
| 2026-03-14 | CloudStack AI | LinkedIn | Priya sent personalised message referencing their blog post on microservices | Responded same day, agreed to a call | Scheduled for 20 March |
| 2026-03-15 | Orbit CRM | LinkedIn | Zara sent connection request to VP Engineering | Accepted but no reply to follow-up message | Follow up if no response by 22 March |
| 2026-03-18 | Nexus Payments | Email | Marcus emailed VP Engineering via warm intro from Priya's network | Responded within 2 hours, keen to talk | Call booked for 25 March |
| 2026-03-22 | Pulse Health | Email | Zara emailed Head of Platform via investor intro | Positive response, asked for more context | Send one-pager and schedule call |
