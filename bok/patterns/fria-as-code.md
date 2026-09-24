---
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "The fundamental-rights impact assessment kept as a versioned artefact, linked to its DPIA and its controls, and reopened when the system changes."
---

# Pattern: FRIA-as-Code

**Summary:** Maintain the fundamental-rights impact assessment as a versioned, reviewable artefact
cross-referenced to the data-protection impact assessment, so that a rights assessment is an input to
design that updates with the system, not a document produced once and filed.

## Objectives
Keep the FRIA and its DPIA cross-reference live and linked to the controls they demand, so a change in
the system triggers a review of its rights impact.

## Target users
AI governance engineer, DPO, legal/compliance.

## Impacted stakeholders
Data subjects, affected persons, deployers, regulators.

## Relevant principles
Start from a named failure mode or harm; instrument the build to produce its own proof.

## Context
A deployer of a high-risk AI system subject to the EU AI Act Art. 27 fundamental-rights impact
assessment, where a DPIA under GDPR Art. 35 may already exist and overlap.

## Problem
A FRIA written once as a Word document describes rights impact at a single moment and is never revisited
when the system changes. Duplicated effort between FRIA and DPIA wastes work and leaves the two out of
sync.

## Solution
Template the FRIA as structured data covering intended use, affected groups, risks to rights, and the
mitigating controls, with each mitigation linked to the control that implements it (a Policy Card, an Eval
Gate, a guardrail). Cross-reference the DPIA so shared elements are written once. Store it with the
registry entry and re-open it on significant change. The EU AI Act Art. 27 FRIA and its DPIA
cross-reference define the scope [1].

> **Example (illustrative)** A benefits-eligibility system's FRIA links each identified risk to
> people's rights to a specific eval and guardrail; when the model is retrained, the FRIA flags which
> mitigations need re-verification.

## Consequences
Rights assessment stays current and traceable to controls, and overlaps with the DPIA are not
duplicated. The cost is templating and the discipline to treat the assessment as living.

## Related patterns
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Maps to:** EU AI Act Art. 27 (FRIA), Art. 9 · GDPR Art. 35 (DPIA) · ISO/IEC 42005 · NIST AI RMF
(Map) · Layer 01 Govern-as-Code / Layer 02 Inventory & Transparency.

Function labels follow the NIST AI RMF [2]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment for high-risk AI systems; DPIA cross-reference). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
