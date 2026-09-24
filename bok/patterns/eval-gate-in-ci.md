---
id: eval-gate-in-ci
title: Eval Gate in CI
layer: 3
order: 2
summary: "An evaluation suite wired into CI so a model or agent ships only above a documented threshold: the eval run is the control, its result the evidence."
---

# Pattern: Eval Gate in CI

**Summary:** Wire an evaluation suite into the CI/CD pipeline so that a model or agent must pass a
defined test, above a documented threshold, before it can ship. The eval run is the control and its
result is the evidence; a failing eval blocks the build.

## Objectives
Make "give every control teeth" concrete: give a testable property a consequence, so failure stops a
release instead of filing a finding.

## Target users
AI governance engineer, ML engineer, platform team.

## Impacted stakeholders
Model owners, users exposed to the system, auditors.

## Relevant principles
Give every control teeth; build the control at the earliest point it can block.

## Context
A model or agent that changes (retrained, re-prompted, given a new tool) and a pipeline that already
runs tests for functional correctness.

## Problem
Evaluations run once before launch and pasted into a slide prove nothing after the next change. A review
board that can only rate findings cannot stop a scheduled launch. Without a gate, evaluation is
research, not control.

## Solution
Version an eval suite alongside the model. Run at least one capability eval and one adversarial eval in
CI (for example with Inspect, promptfoo, Garak or Giskard; illustrative). Set a threshold that traces
to a named failure mode or obligation. Fail the pipeline below the threshold. Emit a structured result
(suite id, model version, score, threshold, pass/fail, timestamp) filed against the registry entry.

Illustrative schema for the result:

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Example (illustrative)** An internal coding agent must clear an injection-resistance floor and a
> regression suite before deploy; a release that drops resistance below the floor fails the pipeline and
> does not ship until fixed.

## Consequences
Regressions are caught before production and evidence accrues automatically. The trade-off is eval
maintenance, run-time cost in CI, and the need to tune thresholds to avoid flaky gates.

## Related patterns
[Policy Card](/patterns/policy-card);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence).

**Maps to:** EU AI Act Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP Agentic
ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [1] and function labels
the NIST AI RMF [2]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
