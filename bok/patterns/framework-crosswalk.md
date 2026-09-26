---
id: framework-crosswalk
title: Framework Crosswalk
layer: 1
secondaryLayer: 5
order: 12
summary: "A map from each control to the framework clauses it serves, generated from the controls: an index for reuse, never proof that a control fires."
---

# Pattern: Framework Crosswalk

**Summary:** Maintain a mapping from each control to the framework clauses it serves, generated from
the controls themselves, as an index for navigation and reuse, never as the end state. A crosswalk
proves you have read the framework; it does not prove the control fires.

> **In short**
> The Framework Crosswalk is a governance-as-code control that maps each control to the framework
> clauses it serves, generated from the controls themselves and used as an index for navigation and
> reuse, never as the end state. It solves framework theatre: a green mapping matrix is mistaken for
> a working control, and a large spreadsheet passes for maturity while nothing measures whether any
> mapped control reduces risk. Use it when an organisation answers to several overlapping
> frameworks, such as the EU AI Act, ISO/IEC 42001 and the NIST AI RMF, and would otherwise build
> the same control several times. Each Policy Card and Eval Gate declares the clauses it maps to,
> and the crosswalk aggregates them. Every mapping cell must resolve to a running control and its
> evidence; a cell with no evidence is flagged, not counted. Its illustrative mappings are the EU AI
> Act as a whole, ISO/IEC 42001, the NIST AI RMF Govern function, CSA AICM and the OWASP Agent
> Control Standard.

## Objectives
Let one control satisfy many frameworks and make coverage navigable, while refusing to mistake coverage
for assurance.

## Target users
AI governance engineer, compliance lead, auditor.

## Impacted stakeholders
Auditors, regulators, model owners.

## Relevant principles
Make the governed path the easiest path; instrument the build to produce its own proof.

## Context
An organisation answering to several overlapping frameworks (EU AI Act, ISO/IEC 42001, NIST AI RMF, CSA
AICM) that would otherwise implement the same control several times.

## Problem
The crosswalk is where framework theatre begins. A green mapping matrix is mistaken for a working
control; a 300-row spreadsheet mapping controls to five frameworks is presented as maturity while
nothing measures whether any mapped control reduces risk. **The anti-pattern is treating coverage as
control: a mapping cell is not evidence.**

## Solution
Generate the crosswalk from the controls, not beside them: each Policy Card and Eval Gate declares the
clauses it maps to, and the crosswalk is the aggregation. Use it to find gaps and reuse controls, not to
report compliance. Every mapping cell must resolve to a running control and its emitted evidence; a cell
with no evidence behind it is flagged, not counted. Reference vocabularies such as the CSA AICM (247
control objectives across 18 domains) [1] and the OWASP Agent Control Standard [2] anchor the mapping.

> **Example (illustrative)** Clicking a green cell for "logging" opens the guardrail and the OSCAL
> evidence it emitted this week; a cell with no evidence renders amber, not green.

## Consequences
Controls are reused across frameworks and gaps are visible, without inflating a matrix into false
assurance. The trade-off is the discipline to keep cells honest and to resist reporting coverage as
outcome.

## Related patterns
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Maps to:** EU AI Act (cross-cutting) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM · OWASP Agent
Control Standard · Layer 01 Govern-as-Code / Layer 05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [3]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
