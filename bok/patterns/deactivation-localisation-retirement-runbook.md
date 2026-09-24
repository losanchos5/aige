---
id: deactivation-localisation-retirement-runbook
title: "Deactivation, Localisation & Retirement Runbook"
layer: 4
secondaryLayer: 2
order: 33
summary: "A drilled runbook to degrade, switch off by jurisdiction or retire an AI system, with named triggers, a decision authority and evidence at each step."
---

# Pattern: Deactivation, Localisation & Retirement Runbook

**Summary:** Write down, before it is needed, how an AI system is degraded, switched off, restricted
to the jurisdictions where it may run, and finally retired: the threshold and legal triggers, the role
that decides, the evidence preserved first, the graduated modes short of shutdown, the per-jurisdiction
switches, and the retirement steps from dependency analysis to a retired registry entry. Build the
switches as tested toggles, drill them on a calendar, and record every decision and step as evidence.

## Objectives
Make stopping, restricting and retiring an AI system an executable, tested procedure with a named
decision owner, so that a regulatory or performance trigger leads to a bounded action within hours,
and a retirement leaves no running copy, no live credential and no lost evidence.

## Target users
AI governance engineer, system owner, SRE, security engineer, legal.

## Impacted stakeholders
Users and affected persons, workers who depend on the system, downstream consumers, providers and
deployers in the chain, market-surveillance authorities.

## Relevant principles
Give every control teeth; register and bound every actor before it acts; instrument the build to
produce its own proof.

## Context
Some triggers to stop a system are legal, not technical. Under the EU AI Act a high-risk deployer that
has reason to consider the system presents a risk must inform the provider and the authority and
suspend use (`Art. 26(5)`); a provider must take corrective action, including withdrawing, disabling
or recalling a non-conforming system (`Art. 20`); an authority can require the same for a system that
presents a risk (`Art. 79`); and a practice can become prohibited (`Art. 5`) [1]. The NIST AI RMF asks
for mechanisms, with assigned responsibilities, to supersede, disengage or deactivate systems whose
performance or outcomes are inconsistent with intended use, and for processes to decommission systems
safely, in a way that does not increase risk [2]. Records outlive the system: providers keep
documentation for ten years and deployers keep logs for at least six months [1]. Creating a policy
and controls to deactivate or localise a system when regulation or performance requires it is part of
governing deployment and use in the IAPP AIGP Body of Knowledge (competency IV.C) [3]. For agents,
the [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) is the instant form of
this runbook.

## Problem
Most systems have an on switch and a hope. When a trigger fires, nobody knows who may decide, logs
are overwritten while the meeting runs, and the only available action is to turn off everything,
everywhere, which is often worse than the fault. A classifier embedded in a vendor product has no
switch at all. At retirement, an entry is deleted from the inventory while a copy keeps serving, a
service account stays live and the evidence that the system was ever governed is lost with it.

### Forces
- **Speed against deliberation.** A legal trigger demands prompt action; a shutdown with dependants
  needs a fallback ready.
- **Precision against simplicity.** Switching off one region, language or group limits harm and adds
  switches to build and test.
- **Preservation against disposal.** Evidence must be frozen before anything is stopped, while data
  protection pushes to delete what is no longer needed.
- **Vendor-embedded systems.** Where the model sits inside a supplier's product, the switch depends on
  the contract.

## Solution
Keep one runbook per system, stored with its registry entry and exercised on the maintenance calendar.

1. **Triggers and authority.** List threshold triggers (a floor breached and not recovered in a
   window, a fairness gap above its limit, an incident severity) and legal triggers (the `Art. 26(5)`
   duty, a provider's corrective action, an authority's measure, a newly prohibited practice), each with
   the role that decides and the time allowed. Breaches arrive from the
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor).
2. **Preserve first.** The first step of every path freezes the logs, applies a legal hold and
   snapshots the pinned versions, so the evidence survives the stop.
3. **Graduated modes.** Build the intermediate modes as operational toggles and test them: advice-only,
   raised confidence thresholds with abstention to a person, grounded-only answers, scoped off for one
   group, language, region or function, back to the pilot cohort, and off with the fallback process.
4. **Localisation by jurisdiction.** Keep the jurisdiction as a policy input: per-jurisdiction rule sets
   as code, regional instances where residency requires them, and flags by region so one market can be
   switched off without touching the others. Launch in a jurisdiction only when its duties are shown to
   be met.
5. **Retirement as a runbook.** Analyse dependencies (the
   [Downstream Use Register](/patterns/downstream-use-register) lists consumers), move users to the
   fallback, send sunset notices through the
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline), archive the final
   evidence snapshot, keep or dispose of weights, corpora and logs as licence, lawful basis and
   retention decide, revoke every identity and credential, set the registry entry to `retired`, and let
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) confirm that no copy still runs. The record uses
   the [decommissioning runbook schema](/resources/templates#schema-decommissioning-runbook).
6. **Drill it.** Run a deactivation drill at least yearly per system: time to decide, time to the
   degraded mode, time to off, and whether the evidence was preserved.

Illustrative retirement record, as a decommissioning runbook:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json",
  "runbook_id": "rb-retire-csa-01",
  "subject": "csa-01@2026-09-18",
  "reason": "replaced",
  "replaced_by": "csa-02",
  "decision_ref": "ddr-csa-02-v1",
  "dependencies": ["contact-centre routing", "weekly quality report"],
  "notifications": [
    { "party": "users", "method": "Release note to contact-centre agents", "sent_at": "2027-03-01" },
    { "party": "deployers", "method": "Change notice to the PT business unit", "sent_at": "2027-03-01" }
  ],
  "steps": [
    { "step_id": "S1", "action": "archive_evidence", "detail": "Freeze logs and snapshot pinned versions.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-29T08:00:00Z" },
    { "step_id": "S2", "action": "disable_traffic", "detail": "Flag csa01.serve off in every region.", "owner": "ml-platform", "status": "done", "completed_at": "2027-03-31T06:00:00Z" },
    { "step_id": "S3", "action": "revoke_identity", "detail": "Revoke the workload identity and API keys.", "owner": "platform-identity", "status": "done", "completed_at": "2027-03-31T07:00:00Z" },
    { "step_id": "S4", "action": "retire_register_entry", "detail": "Set status to retired; keep the entry.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-31T09:00:00Z" },
    { "step_id": "S5", "action": "other", "detail": "Discovery sweep confirms no copy still serves.", "owner": "security-operations", "status": "pending" }
  ],
  "data_disposition": [
    { "dataset": "chat logs", "action": "retain", "basis": "log retention rule and open complaints", "until": "2027-09-30" },
    { "dataset": "retrieval index csa-kb", "action": "delete" }
  ],
  "evidence_archive": { "location": "https://archive.example.org/ai/csa-01", "retain_until": "2033-03-31" },
  "status": "in_progress"
}
```

> **Example (illustrative)** A newly applicable national rule restricts automated answers on health
> topics in one market. The runbook's legal trigger names the head of the business unit as decision
> owner; within the day the evidence is frozen, the regional flag switches the assistant to
> grounded-only answers there with health topics scoped off, other markets are untouched, and the
> decision, the toggles and the notices are in the assurance store.

## Consequences
Stopping becomes proportionate and fast, localisation is a switch rather than a redeploy, and
retirement leaves a complete, retained record instead of a gap. The cost is building and testing the
modes and flags, per-jurisdiction rule sets to keep current, contract terms that give a switch over
vendor-embedded AI, and drill time. An untested mode is not a control: the drill is what makes it one.

## Related patterns
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Downstream Use Register](/patterns/downstream-use-register);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).

**Maps to:** EU AI Act Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79 · ISO/IEC 42001
A.6.2.5, A.6.2.6 · NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1 · OWASP Agentic ASI10 · Layer 04
Runtime Controls & Observability / Layer 02 Inventory & Transparency.

Threat ids follow the OWASP Top 10 for Agentic Applications 2026 [4], control ids ISO/IEC 42001
Annex A [5] and subcategory ids the NIST AI RMF [2]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 5 prohibited practices; Art. 18(1) documentation kept ten years; Art. 20 corrective actions; Art. 26(5) suspend and inform; Art. 26(6) logs kept at least six months; Art. 79 systems presenting a risk). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.7 decommissioning and phasing out safely; MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring plans, including decommissioning). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[3] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: a policy and controls to deactivate or localise an AI system as necessary; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[4] Top 10 for Agentic Applications 2026 (ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
