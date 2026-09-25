---
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "Every impact assessment (ISO/IEC 42005 AIIA, DPIA, FRIA) kept as one versioned fact base, linked to its controls and reopened when the system changes."
---

# Pattern: FRIA-as-Code

**Summary:** Maintain the fundamental-rights impact assessment as a versioned, reviewable artefact
cross-referenced to the data-protection impact assessment, so that a rights assessment is an input to
design that updates with the system, not a document produced once and filed. Generalised, this is
**Impact-Assessment-as-Code**: every impact assessment a system triggers (the AI system impact
assessment, or AIIA, that ISO/IEC 42005 describes, the GDPR DPIA and the EU AI Act FRIA) is one
shared fact base with several views, each with its own trigger, reviewer and re-assessment rule. The
pattern keeps its original name and address so that published links to it still resolve.

## Objectives
Keep the FRIA and its DPIA cross-reference live and linked to the controls they demand, so a change in
the system triggers a review of its rights impact. Extend the same discipline to the AIIA, so that one
set of facts about affected groups, harms and controls feeds every assessment and no two assessments
disagree about the same system.

## Target users
AI governance engineer, DPO, legal/compliance, the model team that runs the AIIA.

## Impacted stakeholders
Data subjects, affected persons (including people who never use the system), deployers, providers,
regulators.

## Relevant principles
Start from a named failure mode or harm; instrument the build to produce its own proof.

## Context
A deployer of a high-risk AI system subject to the EU AI Act Art. 27 fundamental-rights impact
assessment, where a DPIA under GDPR Art. 35 may already exist and overlap. On the provider side, an
organisation running an AI management system assesses the impact of each AI system on individuals,
groups and society across its lifecycle, as ISO/IEC 42001 Annex A.5 asks and ISO/IEC 42005 guides.
One system can sit under all three at once.

## Problem
A FRIA written once as a Word document describes rights impact at a single moment and is never revisited
when the system changes. Duplicated effort between FRIA and DPIA wastes work and leaves the two out of
sync. Add a separate AIIA written by the model team and the organisation holds three accounts of the
same harms, scored on different scales, reviewed by different people, and stale on different dates.

## Solution
Template the FRIA as structured data covering intended use, affected groups, risks to rights, and the
mitigating controls, with each mitigation linked to the control that implements it (a Policy Card, an Eval
Gate, a guardrail). Cross-reference the DPIA so shared elements are written once. Store it with the
registry entry and re-open it on significant change. The EU AI Act Art. 27 FRIA and its DPIA
cross-reference define the scope [1].

> **Example (illustrative)** A benefits-eligibility system's FRIA links each identified risk to
> people's rights to a specific eval and guardrail; when the model is retrained, the FRIA flags which
> mitigations need re-verification.

### One fact base, three views

Hold one record per system with the facts every assessment needs: the intended purpose and
out-of-scope uses, the affected groups, each harm scored on the same dimensions (severity, scale,
reversibility, duration, likelihood), and each mitigation with the id of the control and eval that
implement it. Render the three assessments as views of that record. The house schema
[`impact-assessment.v1.json`](/schemas/impact-assessment.v1.json) does this with one `type` field
(`aiia`, `dpia_addendum`, `fria`), shared fields for risks, mitigations and outcome, and
type-specific fields for what only one assessment asks; a fillable
[Markdown template](/templates/impact-assessment.md) sits beside it.

| View | Who performs it | What triggers it | When | What it adds to the shared facts |
|---|---|---|---|---|
| AIIA (ISO/IEC 42005) | The organisation developing or providing the system | Its AI management system (ISO/IEC 42001 A.5.2 to A.5.5) | Throughout the lifecycle, from design [2][3] | Societal impacts; documentation of the assessment itself |
| DPIA (GDPR Art. 35) | The controller | Processing likely to result in a high risk | Before the processing [4] | Necessity and proportionality; the DPO's advice; prior consultation if high risk remains |
| FRIA (AI Act Art. 27) | Public-body and public-service deployers, and deployers of Annex III 5(b) and (c) systems | First use of an Annex III high-risk system (not point 2) | Before first use [1] | Affected categories, oversight measures, complaint arrangements; results notified to the market-surveillance authority |

Two rules keep the views honest. A FRIA may build on a DPIA that already covers the same ground
(`Art. 27(4)`) [1], so the shared fields are written once and referenced, never copied. And a view is
never edited on its own: a change to the facts regenerates every view, so the DPIA cannot say one
thing about the affected groups while the FRIA says another.

### Re-assessment triggers as code

Write the triggers as conditions the registry evaluates, not as calendar reminders: a new or widened
intended purpose; retraining on a new data source; a new affected population, language or
jurisdiction; a changed threshold; an incident or near miss from the
[Incident Pipeline](/patterns/incident-pipeline); a monitoring signal outside its band; new law or
guidance; and a scheduled review date. The AI Act asks the deployer to update the FRIA when any
assessed element changes [1], and the GDPR asks for a review when the risk of the processing changes
[4]; a single trigger reopens every view the change touches, and the reviewer sees a diff rather than
three new documents. [Chapter 14](/bok/governing-development#impact-assessments-compared) compares
these assessments with the algorithmic impact assessments, bias audits and model validations that can
join the same fact base.

### Performing versus reviewing

The performer owns the facts; the reviewer challenges them. Before sign-off the reviewer checks that
the scope matches the current use-case record, the affected groups include people who never use the
system, every risk rating cites evidence (an eval id, a test report, a data profile), every
mitigation links to a control that runs, residual risk is accepted by someone with the authority to
accept it, and the triggers are written as conditions a pipeline can evaluate. Keep the verdict and
the reviewer's name in the record, so an auditor can see who challenged what.

## Consequences
Rights assessment stays current and traceable to controls, and overlaps with the DPIA are not
duplicated. The AIIA, DPIA and FRIA agree because they read the same facts, and a system change
reopens all of them at once. The cost is templating, agreeing one scoring scale across legal,
privacy and engineering, and the discipline to treat the assessment as living.

## Related patterns
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Maps to:** EU AI Act Art. 27 (FRIA), Art. 9 · GDPR Art. 35 (DPIA) · ISO/IEC 42005 · NIST AI RMF
(Map) · Layer 01 Govern-as-Code / Layer 02 Inventory & Transparency.

Function labels follow the NIST AI RMF [5]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c) systems; before first use; update when an assessed element changes; results notified to the market-surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[3] ISO/IEC 42001:2023, Annex A.5 (A.5.2 AI system impact assessment process; A.5.3 documentation of AI system impact assessments; A.5.4 impact on individuals or groups of individuals; A.5.5 societal impacts). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Regulation (EU) 2016/679 (GDPR), Art. 35 (data protection impact assessment: 35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes) and Art. 36 (prior consultation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
