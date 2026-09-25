---
id: machine-readable-evidence-oscal
title: "Machine-Readable Evidence (OSCAL)"
layer: 5
order: 13
summary: "Control evidence emitted in a machine-readable standard format, OSCAL first, so an audit becomes a query and the same records feed assurance."
---

# Pattern: Machine-Readable Evidence (OSCAL)

**Summary:** Emit control evidence in a machine-readable, standard format so that the audit is a query
and the same evidence feeds continuous assurance. OSCAL, extended with properties for AI, is the
organising format: frameworks specify what to assure but provide no executable format for how, and this
pattern supplies it [1].

## Objectives
Make evidence queryable, diffable and aggregatable, and eliminate the screenshot as an evidence
artefact.

## Target users
AI governance engineer, auditor, platform team.

## Impacted stakeholders
Auditors, regulators, model owners.

## Relevant principles
Instrument the build to produce its own proof; give every control teeth.

## Context
A stack whose controls already produce structured records, and an assurance function that must answer
auditors repeatedly and at speed.

## Problem
Evidence a human must format and file by hand does not scale, cannot be verified quickly, and is out of
date the moment it is saved. Every audit re-collects it from scratch.

## Solution
Emit control results as OSCAL component-definition and assessment-results artefacts. OSCAL's native
model is the stable substrate: a control layer (`catalog`, `profile`), an implementation layer
(`component-definition`, `system-security-plan`) and an assessment layer (`assessment-plan`,
`assessment-results`, `POA&M`), with traceability from a result back to the control it tested [2].
Build on it first. AI-specific extensions are still forming: one proposed approach, a single 2026 preprint,
adds sixteen property extensions for lifecycle phase, enforcement semantics and risk traceability in a
three-layer policy/evidence/enforcement architecture that generates OSCAL assessment results
automatically and validates them against the NIST JSON schema [1]. Adopt the extensions if they fit,
but the native assessment models carry most of the load today. Store the evidence so an auditor's
question is answered by a query.

> **Example (illustrative)** An eval gate writes an OSCAL assessment result on every run; the auditor's
> request for "all robustness evidence in Q3" is a filter over the store, returned in minutes.

## Consequences
The audit becomes a query and evidence composes across tools and jurisdictions. The cost is adopting the
schema and instrumenting controls to emit it.

## Related patterns
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Incident Pipeline](/patterns/incident-pipeline).

**Maps to:** EU AI Act Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · Layer
05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [3]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[2] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
