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

> **In short**
> The Vendor / Model Due-Diligence Gate is a control that gates the procurement or integration of a
> third-party AI system, such as SaaS with an embedded LLM, an API-only foundation model or a
> vendor's agent, on a structured due-diligence assessment. It solves the problem that controls
> which assume model ownership degrade when the weights, training data and guardrails belong to
> someone else. Use it in any organisation that consumes more AI than it trains. The assessment
> covers the provider's evaluations and red-team evidence, the model card and any AIBOM, data flows
> and lawful basis, the tool scopes granted, incident-reporting commitments, and audit and
> change-notification rights. The result is a registry entry with an owner and a scope, flagged
> provider-attested where the team relied on vendor evidence, and reopened on renewal, change
> notices and risk-tier triggers. Its illustrative mappings are EU AI Act Art. 25, 26, 27 and 53,
> ISO/IEC 42001 Annex A.10, the GPAI Code of Practice and the NIST AI RMF Map and Govern functions.

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

### Operate: change notices, reassessment and fallback

Passing the gate once proves little about a system that keeps changing after the contract is signed.
The operate step keeps the gate open for as long as the system runs.

- **Treat every change and deprecation notice as an event.** File each provider notice (a new model
  version, a changed default, a deprecation date, a new sub-processor, new data-use terms) against the
  registry entry, and re-run the boundary eval against the changed system before the change reaches
  users wherever the contract lets you pin a version. A deprecation date becomes a dated milestone on
  the entry, with an owner for the migration decision.
- **Detect the change nobody announced.** Run a small canary set from the boundary eval on a schedule
  against the live endpoint and alert when its results move outside their band. A change detected
  without a notice is a finding under the contract. MITRE ATLAS catalogues the adversarial form of
  the same risk, a supply-chain rug pull, in which a component earns trust and then ships a malicious
  update (`AML.T0109`) [5].
- **Reassess on triggers and by tier, not only at renewal.** Re-open the gate on a schedule set by the
  risk tier and on any trigger: an incident at the provider or in your own deployment, a change of
  ownership or of sub-processors, a regulatory change, a material model change. The NIST AI RMF asks
  that third-party risks be monitored regularly and that pre-trained models be monitored as part of
  the system's maintenance (MANAGE 3.1 and 3.2) [6].
- **Keep a fallback you have tested.** Keep an alternative model warm in the eval harness, a manual
  process staff have practised and the degraded modes the system can fall back to, and test the
  switch with a timer running. The NIST AI RMF asks for contingency processes for failures in
  third-party systems deemed high-risk (GOVERN 6.2) [7]. The same switch is how a deployer meets its
  duty to monitor a high-risk system on the basis of the instructions for use and to suspend use
  when it presents a risk (`Art. 26(5)`) [3]; the
  [Incident Pipeline](/patterns/incident-pipeline) owns the notification to the provider.

The continuity and exit side of this step (outages, withdrawn models, forced migrations, contractual
exit) is set out in [chapter 15](/bok/governing-deployment#when-the-provider-fails-continuity).

> **Example (illustrative)** A provider announces that the model version behind a claims-triage
> assistant will be retired in 90 days. The notice is filed on the registry entry with the date as a
> milestone; the boundary eval runs against the successor version the same week and shows a drop on
> two subgroup metrics; the team records a migration decision with a compensating threshold, and a
> scheduled drill proves the switch to the manual queue takes under ten minutes.

## Consequences
Procured AI is inventoried and bounded, and the reliance on provider-supplied evidence is explicit
rather than hidden. The cost is real: layers 03 and 04 give less assurance over a model you do not own,
and the gate depends on provider cooperation and contract terms you may not fully win. The operate
step adds a standing cost: canary runs against a live endpoint, a warm alternative that must be
kept current, and drills that prove the fallback still works.

## Related patterns
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Maps to:** EU AI Act Art. 25 (value-chain responsibilities), Art. 26 (deployer duties), Art. 27
(FRIA), Art. 53 (GPAI documentation) · ISO/IEC 42001 Annex A.10 · GPAI Code of Practice · NIST AI RMF
(Map, Govern) · Layer 02 Inventory & Transparency / Layer 05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [8]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations, incl. 26(5) monitoring on the basis of the instructions for use, informing the provider and suspending use), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] MITRE ATLAS data, release v2026.09 (AML.T0109 AI Supply Chain Rug Pull; AML.T0010 AI Supply Chain Compromise). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[6] NIST AI RMF Playbook, MANAGE (3.1 third-party risks monitored; 3.2 pre-trained models monitored; 2.4 supersede, disengage or deactivate). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[7] NIST AI RMF Playbook, GOVERN (6.1 third-party risk policies; 6.2 contingency processes for failures in third-party systems deemed high-risk). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[8] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
