---
id: aibom
title: AIBOM
layer: 2
order: 5
summary: "An AI bill of materials emitted at build, recording models, datasets, weights and their provenance in a standard format beside the registry entry."
---

# Pattern: AIBOM

**Summary:** Generate an AI bill of materials at build for each AI system, recording models, datasets,
weights and their provenance in a standard format, and store it with the registry entry. The AIBOM is
what the transparency and eval layers read to know what to document and what to test.

> **In short**
> AIBOM is an inventory control that generates an AI bill of materials at build for each AI system,
> recording its models, datasets, weights and their provenance and licences in a standard format. It
> solves a supply-chain blind spot: the classic SBOM captures software dependencies but not models
> or data, so without an AIBOM an organisation cannot say which model version, from which
> provenance, trained on which data, sits inside a given system. Use it when AI systems are
> assembled from foundation models, fine-tunes, third-party datasets and libraries. The AIBOM is
> emitted in CycloneDX ML-BOM or the SPDX 3.0 AI profile, attached to the system's registry entry
> and regenerated on each build, so it never drifts from the deployed system. The transparency and
> eval layers read it to know what to document and what to test. Its illustrative mappings are EU AI
> Act Art. 11 and Art. 53 for GPAI documentation, ISO/IEC 42001, the NIST AI RMF Map function and
> CSA AICM.

## Objectives
Make the composition and provenance of an AI system machine-readable, so supply-chain risk and
transparency obligations can be answered from an artefact, not reconstructed.

## Target users
AI governance engineer, ML engineer, security engineer.

## Impacted stakeholders
Model owners, downstream deployers, auditors, procurement.

## Relevant principles
Instrument the build to produce its own proof; start from a named failure mode or harm.

## Context
AI systems assembled from foundation models, fine-tunes, third-party datasets and libraries, where the
classic SBOM captures software dependencies but not models or data.

## Problem
Without a bill of materials for models and data, an organisation cannot answer which model version, from
which provenance, trained on which data, is inside a given system, so it cannot assess supply-chain
risk or produce transparency documentation on demand.

## Solution
Emit an AIBOM at build in a standard format, CycloneDX ML-BOM or the SPDX 3.0 AI profile, for example
with the OWASP AIBOM generator [1] (illustrative), covering models, datasets, weights, and their
provenance and licences. Attach it to the registry entry and regenerate it on each build so it never
drifts from the deployed system.

> **Example (illustrative)** A retrieval-augmented assistant's AIBOM lists the base model, the
> embedding model, the corpus snapshot and their licences; when a corpus licence changes, the diff
> surfaces in the next build's AIBOM.

## Consequences
Supply-chain and provenance questions become queries; transparency documents can be generated from the
AIBOM. The cost is toolchain integration and keeping provenance metadata accurate.

## Related patterns
[Agent Registry](/patterns/agent-registry);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Maps to:** EU AI Act Art. 11, Art. 53 (GPAI documentation) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA
AICM · Layer 02 Inventory & Transparency.

Function labels follow the NIST AI RMF [2]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
