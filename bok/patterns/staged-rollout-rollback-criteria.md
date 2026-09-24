---
id: staged-rollout-rollback-criteria
title: Staged Rollout with Rollback Criteria
layer: 4
order: 29
summary: "Release every model, prompt or vendor-version change through shadow, pilot and canary stages whose rollback criteria are registered before each stage starts."
---

# Pattern: Staged Rollout with Rollback Criteria

**Summary:** Take every change to a deployed AI system (a new model, a retrain, a prompt or corpus
change, a new vendor model version) to production in stages that limit exposure while evidence
accumulates: shadow, pilot, canary, then general availability. Each stage has rollback criteria
written into the rollout plan before it starts and evaluated by the pipeline, versions are pinned in
the registry, and the path back has been tested. A criterion invented after the metric moved is a
negotiation, not a control.

## Objectives
Bound the harm a bad change can do to the share of traffic or cases exposed to it, and make "roll it
back" a decision the pipeline takes on a pre-agreed signal rather than a meeting.

## Target users
AI governance engineer, ML platform team, SRE, system owner.

## Impacted stakeholders
Users and affected persons of the system, operators and reviewers, the go-live panel, deployers
downstream of a provider's change.

## Relevant principles
Give every control teeth; build the control at the earliest point it can block; instrument the build
to produce its own proof.

## Context
AI systems change more often than their approvals do. A retrain, a prompt edit, a refreshed
retrieval corpus and a vendor's new model version can each move quality, safety or fairness without a
line of the deployer's code changing. Site reliability engineering already has the mechanics:
canarying is a partial and time-limited deployment of a change and its evaluation [1], blue-green
deployment keeps a tested way back [2], and operational feature toggles switch exposure per cohort
without a deploy [3]. The EU AI Act asks deployers of high-risk systems to monitor operation and to
suspend use when they have reason to consider the system presents a risk [4], and a provider or
prospective provider that pilots an Annex III system with real users before placing it on the market
is testing in real-world conditions, which Article 60 governs [4]. The NIST AI RMF expects a
determination of whether deployment should proceed and mechanisms to supersede or deactivate a
system whose outcomes are inconsistent with intended use [5].

## Problem
Without stages, a change goes from the eval harness to everyone at once, and the first evidence about
live behaviour is the harm itself. With stages but no pre-registered criteria, each rollback becomes a
debate about whether a moved metric matters, held after the fact by the people who wanted the release.
A vendor model update that nobody treated as a release skips every stage.

### Forces
- **Speed against evidence.** Each stage delays value; too short a stage proves nothing.
- **Statistical power against exposure.** A small canary exposes few people but needs time to detect a
  real regression, especially per group.
- **Late labels.** Outcome labels often arrive after the stage ends, so criteria lean on proxies:
  disagreement, overrides, complaints, groundedness.
- **Changes you did not make.** A provider's version change arrives on its schedule, not yours.

## Solution
Write the rollout plan as data, register it before the first stage, and let the pipeline enforce it.

1. **Stages with a purpose.** Shadow (live inputs, outputs logged not used) proves behaviour on real
   traffic; a pilot with trained users proves oversight works; a canary against a control group proves
   no regression at scale; general availability keeps the criteria as live monitors.
2. **Pre-registered rollback criteria.** Each stage lists metric, comparison, threshold, window and the
   group breakdowns that matter. The plan is committed and signed before the stage starts; a change to
   a threshold is a reviewed diff with an approver, never an edit on a dashboard.
3. **Pinned versions.** The registry pins model, prompt, retrieval corpus and guardrail versions for
   the baseline and the candidate. An unpinned change detected at runtime is itself a rollback trigger.
4. **A tested path back.** Blue-green switching or a feature flag returns traffic to the baseline, and
   the switch is exercised in the shadow stage, before anyone depends on it.
5. **Automatic evaluation.** A canary analysis job compares candidate and control per metric and per
   group and writes a stage verdict (promote, hold, roll back) to the assurance store. The go/no-go
   record summarises the rollout in its `rollout` field (see the
   [go/no-go schema](/resources/templates#schema-go-no-go)).
6. **Vendor versions are releases.** A new provider model version runs in shadow and canary against the
   pinned version before it takes traffic.

Illustrative rollout plan, registered before the shadow stage:

```json
{
  "plan_id": "ro-csa-01-2026-09",
  "subject": "csa-01@2026-09-18",
  "baseline": "csa-01@2026-08-30",
  "registered_at": "2026-09-15T09:00:00Z",
  "pinned": {
    "model": "vendor-model@2026-08-01",
    "prompt": "csa-prompt@41",
    "corpus": "csa-kb@2026-09",
    "guardrails": "gr-csa@12"
  },
  "stages": [
    {
      "stage": "shadow",
      "min_days": 7,
      "rollback_if": [{ "metric": "disagreement_with_baseline", "op": ">", "value": 0.08 }]
    },
    {
      "stage": "pilot",
      "exposure": "40 trained agents",
      "min_days": 14,
      "rollback_if": [
        { "metric": "override_rate", "op": ">", "value": 0.15 },
        { "metric": "complaints_per_1000", "op": ">", "value": 2.0 }
      ]
    },
    {
      "stage": "canary",
      "exposure_percent": 10,
      "control_group": true,
      "min_days": 14,
      "rollback_if": [
        { "metric": "groundedness", "op": "<", "value": 0.92 },
        { "metric": "resolution_rate_ratio_min_by_language", "op": "<", "value": 0.9 },
        { "metric": "severity_1_events", "op": ">", "value": 0 }
      ]
    },
    { "stage": "general_availability", "exposure_percent": 100 }
  ],
  "rollback_path": "blue-green switch to csa-01@2026-08-30; flag csa01.candidate off",
  "go_no_go": "gng-csa-01-2026-09-18"
}
```

> **Example (illustrative)** A support assistant's new prompt passes its eval gate and enters shadow.
> In the canary, groundedness holds overall but the resolution rate for Portuguese-language chats
> falls below 90% of the Spanish rate. The pre-registered criterion trips, the flag returns the canary
> cohort to the baseline within minutes, and the stage verdict and the rollback event land in the
> assurance store before anyone has called a meeting.

## Consequences
Regressions are caught while they affect a few users, and every promotion or rollback leaves a record
tied to criteria set in advance. The cost is slower releases, canary infrastructure, the statistical
work to size stages and groups, and the discipline to treat vendor updates and prompt edits as
releases. Criteria that are too tight produce rollback fatigue; review them with their owners on the
maintenance calendar.

## Related patterns
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Registry](/patterns/agent-registry);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Maps to:** EU AI Act Art. 26(5), Art. 60 · ISO/IEC 42001 A.6.2.5, A.6.2.6 · NIST AI RMF
MANAGE 1.1, MEASURE 2.3, MANAGE 2.4 · Layer 04 Runtime Controls & Observability.

Control ids follow ISO/IEC 42001 Annex A [6] and subcategory ids the NIST AI RMF [5]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[2] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[3] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5) monitor, suspend and inform; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MANAGE 1.1 determination whether deployment should proceed; MEASURE 2.3 performance demonstrated for conditions similar to deployment; MANAGE 2.4 supersede, disengage or deactivate). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
