---
id: policy-card
title: Policy Card
layer: 1
order: 1
summary: "A governance rule written as a machine-readable card that the pipeline and the runtime both evaluate, leaving a verdict on every check."
---

# Pattern: Policy Card

**Summary:** Express a governance rule as a machine-readable artefact that travels with the model or
agent and is evaluated in the pipeline and at runtime, rather than as prose a human must apply. The
Policy Card encodes permitted and prohibited actions, obligations and evidentiary requirements for one
AI system, and links to the enforcement and audit pipelines that act on it [1].

## Objectives
Turn a policy from a statement of intent into an executing control, versioned and testable, so that a
rule change is a reviewable diff and every evaluation leaves a verdict.

## Target users
AI governance engineer, platform team, policy owner.

## Impacted stakeholders
Model owners, deployers, auditors, regulators.

## Relevant principles
Build the control at the earliest point it can block; make the governed path the easiest path.

## Context
An organisation with more than a handful of AI systems and a governance function that cannot review
every change by hand. Rules exist but live in documents no pipeline can read.

## Problem
Prose policy cannot be enforced automatically, drifts from the systems it governs, and leaves no
evidence that it was applied. A rule that can only be remembered is violated the moment someone forgets.

## Solution
Write each rule as a Policy Card: a structured, machine-readable artefact (for example expressed for an
`OPA/Rego` or `Cedar` engine, or as a Policy Cards document) that states allow/deny logic, the failure
mode it addresses and the framework clauses it maps to. Store it with the system it governs. Evaluate
it pre-merge, at deploy, and (where the rule is a runtime constraint) at the point of action. Emit a
verdict (rule id, input hash, decision, timestamp) on every evaluation.

Illustrative schema for the verdict:

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Example (illustrative)** A Policy Card for a customer-service agent declares that it may call the
> refunds tool only up to a bounded amount and never outside business hours; the same card is evaluated
> in CI against the agent's declared scope and at runtime by the tool-call guardrail.

## Consequences
Rules become enforceable and auditable, and the crosswalk generates itself. The cost is authoring and
maintaining cards, and the discipline to keep the executable version authoritative over the prose.

## Related patterns
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials).

**Maps to:** EU AI Act Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM · OWASP Agentic
ASI02/ASI03 · Layer 01 Govern-as-Code.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [2] and function labels
the NIST AI RMF [3]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
