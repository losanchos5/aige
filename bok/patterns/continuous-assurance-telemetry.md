---
id: continuous-assurance-telemetry
title: Continuous Assurance Telemetry
layer: 5
order: 7
summary: "Control decisions streamed into one assurance store as they happen, so whether a control works is a live query, not a point-in-time attestation."
---

# Pattern: Continuous Assurance Telemetry

**Summary:** Stream control decisions (policy verdicts, eval results, guardrail actions, identity
events) into an assurance store as they happen, so the status of a control is a live query rather than
a point-in-time attestation. Trustworthiness becomes a continuously generated signal, not a static
certificate [1].

> **In short**
> Continuous Assurance Telemetry is an assurance control that streams control decisions, such as
> policy verdicts, eval results, guardrail actions and identity events, into one assurance store as
> they happen. It solves the decay of point-in-time evidence: an attestation says a control existed
> when someone looked, and says nothing about the weeks in between, during which the model was
> retrained and an agent gained a tool. Use it when the lower layers of the stack already emit
> structured records and the assurance function is tired of assembling binders before each audit.
> Each control writes a timestamped record on one common schema: the control id, the subject and
> version from the registry, the decision, the metric, value and threshold, the obligation
> reference, an input hash, the actor and a signature. The status of each control becomes a live
> query over the store. Its illustrative mappings are EU AI Act Art. 72, ISO/IEC 42001, the NIST AI
> RMF Manage and Govern functions and CSA AICM.

## Objectives
Replace periodic attestation with evidence emitted as the system runs, so "is the control working?" is
answered by telemetry.

## Target users
AI governance engineer, SRE/platform team, auditor.

## Impacted stakeholders
Model owners, auditors, regulators, incident responders.

## Relevant principles
Instrument the build to produce its own proof; give every control teeth.

## Context
A stack whose lower layers already emit structured records, and an assurance function tired of
assembling binders before each audit.

## Problem
An attestation says a control existed when someone looked; it says nothing about the weeks in between,
during which the model was retrained and an agent gained a tool. Point-in-time evidence decays
immediately.

## Solution
Have each control write a timestamped, structured record to a common assurance store, on one schema.
Fix the schema first: a minimum useful evidence record is `{control_id, subject (model/agent/system
id + version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold,
failure_mode/obligation ref, input_hash, actor, timestamp, signature}`. Normalise every tool's output
into that shape on ingest, so heterogeneous sources compose into one queryable store keyed on the
registry id.

Illustrative schema for the evidence record:

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Two research proposals point at the same idea and are worth watching, not adopting whole:
TAIP treats NIST TEVV outputs as reusable AI Assurance Objects that compose across systems [1], and
AAGATE operationalises a control plane aligning the NIST AI RMF functions for agents in production [2];
both are single preprints. Expose the current status of each control as a query over the store.

> **Example (illustrative)** A dashboard tile for the data-residency control is backed by a live query
> over emitted guardrail decisions; if the control stops firing, the tile goes red within minutes, not
> at the next audit.

## Consequences
The audit becomes a query and drift is visible in near real time. The cost is building the pipeline and
storage, and defining a common evidence schema across tools.

## Related patterns
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Maps to:** EU AI Act Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · CSA AICM · Layer 05
Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [3]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[2] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
