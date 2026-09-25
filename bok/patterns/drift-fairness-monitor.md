---
id: drift-fairness-monitor
title: "Drift & Fairness Monitor"
layer: 4
secondaryLayer: 5
order: 30
summary: "Production signals for drift, quality and fairness by group, each with a threshold, an owner and a pre-agreed consequence, written as evidence."
---

# Pattern: Drift & Fairness Monitor

**Summary:** Watch a deployed system for the ways it moves away from the state in which it was
approved: input, label, concept, pipeline, vendor-model and usage drift, and quality and fairness
by group. Every signal has a threshold, an owner and a pre-agreed consequence (an issue, a retrain, a
degraded mode, an incident, a tripped breaker), and every evaluation writes an evidence record, so
"the model is still fit and fair" is a query over telemetry rather than a belief from launch day.

> **In short**
> The Drift & Fairness Monitor is a runtime control that watches a deployed AI system for the ways
> it moves away from the state in which it was approved. It solves a system that passed its evals at
> go-live and then drifts into error or unfairness without any code change, while dashboards without
> thresholds are watched by nobody. Use it for any system in production, including generative
> systems that can degrade while every infrastructure metric stays green. The monitor tracks input,
> label, concept, pipeline, vendor-model and usage drift, and quality and fairness by group, with or
> without labels. Every signal has a threshold, a named owner and a pre-agreed consequence: an
> issue, a retrain, a degraded mode, an incident or a tripped breaker. Each evaluation writes an
> evidence record, pass or fail, from a monitoring plan kept as data. Its illustrative mappings
> include EU AI Act Art. 4a, 15(4), 26(5) and 72, NYC Local Law 144, ISO/IEC 42001 A.6.2.6 and NIST
> AI RMF MEASURE 2.11.

## Objectives
Detect loss of performance or fairness in production before the people affected detect it, route
each breach to someone who can act, and keep a continuous record that the system was watched against
the floors its deployment decision set.

## Target users
AI governance engineer, ML platform on-call, data scientist, system owner.

## Impacted stakeholders
Affected persons, especially groups the system may disadvantage; operators and reviewers; the risk
function; providers and deployers who share the monitoring duty.

## Relevant principles
Start from a named failure mode or harm; give every control teeth; instrument the build to produce
its own proof.

## Context
A system that passed its evals at go-live can drift into error or unfairness without any code change.
Concept drift, a change over time in the relationship a model learned, is a studied problem whose work
divides into detection, understanding and adaptation [1]. The EU AI Act asks providers of high-risk
systems to run post-market monitoring and deployers to monitor operation on the basis of the
instructions for use, suspending use and informing the provider where the system presents a risk
(`Art. 72`, `Art. 26(5)`), and asks systems that keep learning to address biased feedback loops
(`Art. 15(4)`) [2]. Where monitoring for bias needs special categories of personal data, the Digital
Omnibus sets the conditions in a new `Art. 4a` [3]. Some law requires periodic audits outright: New
York City's Local Law 144 requires a bias audit within one year before an automated employment
decision tool is used [4]. The NIST AI RMF asks that functionality and behaviour be monitored in
production and that fairness and bias be evaluated and documented [5].

## Problem
Dashboards without thresholds are watched by nobody. Labels arrive late or never, so accuracy cannot
be measured when it matters. The group attribute needed to measure fairness is usually absent at
runtime. A generative system can degrade (more ungrounded answers, more refusals in one language)
while every infrastructure metric stays green. And a breach that pages no one is only a chart.

### Forces
- **Label delay against timeliness.** Outcome-free proxies (input drift, selection rates, overrides,
  complaints) arrive now; performance on fresh labels arrives later and is what matters.
- **Sensitivity against alert fatigue.** Tight thresholds catch drift early and page people for noise.
- **Fairness measurement against privacy.** Measuring by group needs the group attribute, which is often
  special-category data with its own legal conditions.
- **Shared duty.** Provider and deployer each monitor part of the system and see different data.

## Solution
Run the monitor as a layer 04 signal path that writes layer 05 evidence, driven by a monitoring plan
that is data.

1. **Name what can move.** For each system, list the drift classes that apply: data (input
   distribution), label (base rate), concept (input-to-outcome relationship), pipeline (upstream
   schema or retrieval step), vendor model (the model behind the API) and usage (who uses it, for
   what). Pick a statistic per class: a stability index or two-sample test on features or embeddings
   against a reference window; predicted against observed positive rate; performance on fresh labels
   with change-point detection; data contracts; version-pin checks; topic classification of traffic
   against the negative space.
2. **Fairness by group, with and without labels.** Monitor selection or approval rates by group with no
   label needed; error and calibration rates by group once outcomes land, with the label delay stated;
   override, complaint and contest rates by group from the
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path); and, for generative
   systems, groundedness and refusal rates by topic and language. Where the group attribute is not
   held at runtime, use a consented sample or a periodic audit in a secured environment.
3. **Threshold, owner, consequence.** Every metric in the plan carries a threshold, a window, a named
   owner who can be paged, and the action a breach fires: open an issue, schedule a retrain, switch a
   degraded mode, open an incident through the [Incident Pipeline](/patterns/incident-pipeline), or
   trip the [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).
4. **Evidence on every evaluation.** Each check writes an evidence record to the assurance store
   through [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), pass or fail,
   so the absence of breaches is itself evidenced.
5. **The plan as data.** The deployer's monitoring plan reuses the
   [post-market monitoring plan schema](/resources/templates#schema-post-market-monitoring-plan), and a
   threshold change is a reviewed diff, like any change to a control.

Illustrative monitoring plan for a support assistant, as a post-market monitoring plan record:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json",
  "plan_id": "mon-csa-01",
  "subject": "csa-01@2026-09-18",
  "scope": "All chats in ES and PT, including escalations to human agents and customer complaints.",
  "data_sources": [
    { "source": "chat telemetry with groundedness scores", "type": "telemetry", "owner": "ml-platform" },
    { "source": "agent overrides and escalations", "type": "deployer_feedback", "owner": "contact-centre-ops" },
    { "source": "complaints that mention the assistant", "type": "user_complaint", "owner": "customer-care" },
    { "source": "monthly re-run of the regression suite on sampled chats", "type": "eval_rerun", "owner": "model-validation" }
  ],
  "metrics": [
    {
      "metric": "groundedness of sampled answers",
      "threshold": "< 0.90 over 7 days",
      "cadence": "daily",
      "failure_mode": "ungrounded answers",
      "alert_route": "ml-platform"
    },
    {
      "metric": "resolution-rate ratio, lowest language to highest",
      "threshold": "< 0.90 over 14 days",
      "cadence": "weekly",
      "failure_mode": "worse service for one language group",
      "alert_route": "ai-governance"
    },
    {
      "metric": "share of chats classified outside the intended topics",
      "threshold": "> 5% over 7 days",
      "cadence": "daily",
      "failure_mode": "usage drift into unapproved use",
      "alert_route": "system-owner"
    }
  ],
  "drift_signals": ["embedding drift on user turns", "topic mix", "vendor model version pin"],
  "triggers": [
    { "condition": "groundedness breach for two consecutive windows", "action": "rollback", "owner": "system-owner" },
    { "condition": "language resolution ratio breach", "action": "investigate", "owner": "ai-governance" },
    { "condition": "unpinned vendor model version detected", "action": "suspend", "owner": "ml-platform" }
  ],
  "feedback_channels": ["in-chat feedback", "complaint form", "contest path for account decisions"],
  "retraining_policy": "A retrain, prompt change or corpus refresh is a release and goes through the staged rollout.",
  "review_cadence": "Thresholds reviewed quarterly with their owners",
  "owner": "system-owner",
  "effective_from": "2026-09-18"
}
```

> **Example (illustrative)** Three weeks after a vendor model update passed its canary, the usage
> drift metric rises: staff have started asking the customer assistant HR questions. The breach opens
> an issue for the system owner, who adds HR topics to the prohibited-use list and routes them to the
> HR portal; the metric falls back under threshold, and the issue, the change and the recovery are all
> in the assurance store.

## Consequences
Drift and unfairness are caught as signals with owners rather than discovered as incidents, and
periodic audits become cheap because the telemetry already exists. The cost is labelling and sampling
capacity, statistical care in thresholds (per-group metrics on small groups are noisy), the privacy
work for group attributes, and on-call coverage for every signal that can page.

## Related patterns
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path).

**Maps to:** EU AI Act Art. 4a, Art. 15(4), Art. 26(5), Art. 72 · NYC Local Law 144 · ISO/IEC 42001
A.5.4, A.6.2.6 · NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1 · Layer 04 Runtime
Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Control ids follow ISO/IEC 42001 Annex A [6] and subcategory ids the NIST AI RMF [5]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[2] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 15(4) feedback loops in systems that continue to learn; Art. 26(5) deployer monitoring, suspension and information; Art. 72 post-market monitoring by providers). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special categories of personal data for bias detection and correction); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.4 functionality and behaviour monitored in production; MEASURE 2.11 fairness and bias evaluated and documented; MEASURE 3.1 existing, unanticipated and emergent risks tracked; MANAGE 4.1 post-deployment monitoring plans). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.5.4 assessing AI system impact on individuals or groups of individuals; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
