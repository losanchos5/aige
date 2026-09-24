---
id: model-card-as-control-evidence
title: Model Card as Control Evidence
layer: 2
order: 6
summary: "Model and data cards regenerated from the pipeline as structured evidence, so transparency documents describe the system as it runs today."
---

# Pattern: Model Card as Control Evidence

**Summary:** Treat the model card and data card not as launch documentation written once, but as
structured evidence regenerated from the pipeline, so that transparency documents describe the system as
it is now and feed the assurance layer.

## Objectives
Convert transparency documentation from a static PDF into a versioned artefact that is both
human-readable and machine-consumable, and that counts as control evidence.

## Target users
AI governance engineer, ML engineer, DPO.

## Impacted stakeholders
Model owners, users, auditors, data subjects.

## Relevant principles
Instrument the build to produce its own proof; make the governed path the easiest path.

## Context
A system subject to transparency obligations, where cards are traditionally written at launch and never
touched again.

## Problem
A model card written once decays into fiction as the model, prompts and datasets change. A card that is
not regenerated cannot be trusted as evidence and misleads the very auditor it was meant to satisfy.

## Solution
Template the card and populate it from the pipeline: intended use, evaluation results (from the Eval
Gate), datasets (from the AIBOM), known limitations and owner. Regenerate on each significant change and
version it with the model. Store the card as structured data so it can be both read by a person and
consumed by the assurance layer.

> **Example (illustrative)** A classifier's card is rebuilt on every deploy, pulling its latest
> fairness-eval scores and dataset provenance automatically, so the card an auditor reads is the card
> production produced.

## Consequences
Transparency stays true and doubles as evidence. The cost is templating and pipeline wiring, and
agreeing what "significant change" triggers a regeneration.

## Related patterns
[AIBOM](/patterns/aibom); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[FRIA-as-Code](/patterns/fria-as-code).

**Maps to:** EU AI Act Art. 11, Art. 13 (transparency) · ISO/IEC 42001, ISO/IEC 42005 · NIST AI RMF
(Map, Measure) · Layer 02 Inventory & Transparency.

Function labels follow the NIST AI RMF [1]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
