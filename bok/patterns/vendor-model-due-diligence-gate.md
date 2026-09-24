---
id: vendor-model-due-diligence-gate
title: "Vendor / Model Due-Diligence Gate"
layer: 2
secondaryLayer: 5
order: 17
summary: "A structured due-diligence gate for bought and API-only AI that records what you can and cannot verify before the system reaches production."
---

# Pattern: Vendor / Model Due-Diligence Gate

**Summary:** Gate the procurement or integration of a third-party AI system (SaaS with an embedded
LLM, an API-only foundation model, a vendor's agent) on a structured due-diligence assessment, so a
model you do not own still enters through a control that records what you can and cannot verify about
it. When you do not own the model, this gate is what replaces the red-team you cannot run.

## Objectives
Bring bought and API-only AI under the same registry and assurance discipline as systems you build, and
make the limits of your verification explicit rather than assumed away.

## Target users
AI governance engineer, procurement, security engineer, DPO.

## Impacted stakeholders
Deployers, model providers, data subjects, auditors, regulators.

## Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

## Context
An organisation that consumes far more AI than it trains: SaaS features with an embedded LLM, hosted
foundation models reached only by API, agents shipped inside a vendor's product. The weights, training
data and internal guardrails belong to someone else.

## Problem
The parts of the stack that assume you own the model degrade when you do not. You cannot red-team
weights you cannot reach, so an eval gate (layer 03) can only test the vendor's system as a black box
at its boundary; runtime control (layer 04) narrows to the tool scopes, identity and traffic the
integration exposes, not the model's own behaviour. Left ungoverned, procured AI becomes the shadow
fleet with a contract: in production, unassessed, and outside the registry.

## Solution
Make due diligence a gate a procured or integrated AI system must pass before it reaches production,
and structure the assessment on a template rather than an ad-hoc questionnaire; the CSIRO Responsible
AI Pattern Catalogue's supplier-assessment fields are a usable starting point [1]. Assess, at minimum:
the provider's own evaluations and red-team evidence (what they will share, and its independence); the
model card, supplier documentation and any AIBOM you can obtain; the lawful basis and data flows,
including whether your inputs train their model; the tool scopes and identity you will grant the
vendor's agent; the provider's incident-reporting commitments; and the contractual right to audit and
to be notified of material change. Record the result as a registry entry with an owner and a scope,
and re-open the gate on renewal or on a material model change. Anchor the assessment in ISO/IEC 42001
Annex A.10 (third-party and customer relationships) [2], the EU AI Act's allocation of duties along
the value chain (provider obligations versus deployer obligations under Articles 25, 26 and 27 [3])
and, for general-purpose models, the transparency and documentation the GPAI Code of Practice expects
providers to supply [4]. Where you cannot verify a control, record that you cannot, and compensate by
bounding the integration: least-privilege scopes, boundary evals, and tighter runtime observation of
the traffic you do control.

> **Example (illustrative)** A team integrating an API-only foundation model cannot test its weights,
> so the gate captures the provider's published evaluations, restricts the model to a scoped service
> identity with no standing data access, adds a boundary eval on the team's own prompts, and files the
> whole assessment as the system's registry entry, flagged "provider-attested" where the team relied
> on the vendor's evidence rather than its own.

## Consequences
Procured AI is inventoried and bounded, and the reliance on provider-supplied evidence is explicit
rather than hidden. The cost is real: layers 03 and 04 give less assurance over a model you do not own,
and the gate depends on provider cooperation and contract terms you may not fully win.

## Related patterns
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery).

**Maps to:** EU AI Act Art. 25 (value-chain responsibilities), Art. 26 (deployer duties), Art. 27
(FRIA), Art. 53 (GPAI documentation) · ISO/IEC 42001 Annex A.10 · GPAI Code of Practice · NIST AI RMF
(Map, Govern) · Layer 02 Inventory & Transparency / Layer 05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [5]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
