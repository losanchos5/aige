---
id: use-case-intake-risk-tiering
title: "Use-Case Intake & Risk Tiering"
layer: 1
secondaryLayer: 2
order: 18
summary: "One intake path for every AI use case: a structured use-case record, a tier computed from its risk profile, and the gates that tier switches on."
---

# Pattern: Use-Case Intake & Risk Tiering

**Summary:** Route every proposed AI use case, built or bought, through one intake that writes a
structured use-case record, screens it against prohibited practices and the EU AI Act risk ladder,
and computes an internal risk tier from declared profile fields. The tier, not a meeting, decides
which assessments, evals and approvals the system must clear before it ships, and the record becomes
the registry entry every later gate reads.

> **In short**
> Use-Case Intake & Risk Tiering is a governance-as-code control that routes every proposed AI use
> case, built or bought, through one intake that writes a structured use-case record and computes an
> internal risk tier. It solves governance that starts too late and scales badly: requests arrive by
> email, in slide decks and in procurement tickets, a high-risk use slips through as a pilot, and
> nobody can show which facts a classification rested on. Use it where many teams propose AI
> features and most buy or call models rather than train them. The intake screens each use case
> against EU AI Act Art. 5 prohibited practices before scoring it, places it on the Act's risk
> ladder, and lets a versioned policy compute the tier from declared profile fields. The tier
> selects the required assessments, evals, approvers and review cadence, and deployment refuses any
> system without an intake record. Its illustrative mappings include EU AI Act Art. 3(12), 6(3)–(4)
> and 49(2), ISO/IEC 42001 A.5.2 and NIST AI RMF Map 1.1.

## Objectives
Make the first decision about an AI system a recorded, reproducible one: what it is for, what it must
not be used for, how risky it is and, from that, how much governance it gets. Spend review effort
where the risk is and let low-risk use cases through fast on a paved path.

## Target users
AI governance engineer, product owner, platform team, legal and privacy reviewers.

## Impacted stakeholders
People affected by the system's outputs, deployers and operators, the AI governance committee,
auditors, market surveillance authorities.

## Relevant principles
Build the control at the earliest point it can block; make the governed path the easiest path;
register and bound every actor before it acts.

## Context
An organisation where many teams propose AI features, and most of them buy or call models rather than
train them. Requests arrive by email, in slide decks and in procurement tickets, and each is reviewed
with whatever questions the reviewer remembers. The EU AI Act measures most duties against the
**intended purpose**, which it defines to include the context and conditions of use stated in the
instructions for use, "promotional or sales materials and statements" and the technical
documentation (`Art. 3(12)`) [1]. The NIST AI RMF asks that intended purposes and settings are
"understood and documented" (MAP 1.1) and that risk tolerances are "determined and documented"
(MAP 1.5) [2].

## Problem
Without one intake, governance starts too late and scales badly.

- **Forces.** Reviewers want every use case assessed in depth; teams want an answer in days.
  Classification depends on facts only the team knows: the purpose, the affected persons, whether the
  system profiles people. A tier negotiated in a meeting drifts with whoever attends. A tier that is
  not machine-readable cannot switch a gate on.
- **Failure mode.** A high-risk use slips through as "just a pilot" while low-risk requests queue
  behind it. Nobody can show which systems were classified, by whom, on which facts, or why an
  Annex III system was treated as not high-risk.

## Solution
Build intake as a form-plus-code path that ends in a record and a tier, not in minutes.

1. **Capture the use-case record.** A short structured form (intended purpose, out-of-scope uses,
   users and affected persons, decision authority, success metrics, error appetite, data sources,
   jurisdictions) writes a registry stub keyed to one id. Reuse the published
   [use-case record schema](/resources/templates#schema-use-case-record) (`use-case-record.v1`) so the
   form, the registry and the gates share one shape.
2. **Screen before you score.** Run the prohibited-practice screen (`Art. 5`) first: a hit is
   blocked at intake and never tiered. Then place the system on the Act's ladder: an Annex III use,
   with the `Art. 6(3)` filter and its override (an Annex III system that profiles natural persons is
   always high-risk), transparency duties, or a general-purpose model. A provider that relies on the
   filter must document its assessment before placing the system on the market and register it
   (`Art. 6(4)`, `Art. 49(2)`) [1]; the intake record is that documentation. The Digital Omnibus moved
   the Annex III high-risk obligations to 2 Dec 2027 [3]: that changes when the duties bite, not
   whether the classification is recorded now.
3. **Compute the internal tier.** Declare profile fields (autonomy, decision impact, exposure,
   reversibility of the worst outcome, vulnerable groups, data class, third-party dependency) and let
   a versioned policy compute the tier. The AI RMF sets the level of risk-management activity by risk
   tolerance (GOVERN 1.3) and asks for the likelihood and magnitude of each identified impact
   (MAP 5.1) [2]. Canada's Directive on Automated Decision-Making applies the same idea in public
   administration, with four impact levels defined partly by reversibility and duration [4]. A team
   that disagrees with its tier changes a factor, with evidence, in a reviewed change; the tier
   follows.
4. **Bind the tier to gates.** The tier selects the required assessments (DPIA, FRIA, vendor due
   diligence), the eval categories and thresholds, the approvers and the review cadence, so the
   pipeline reads what it must enforce. Deployment refuses any system without an intake record ("no
   stub, no deploy"), which keeps the inventory complete by construction (GOVERN 1.6) [2].
5. **Re-open on change.** A new purpose, population, jurisdiction or data source, or a consumer that
   declares a use on the out-of-scope list, re-runs intake and may move the tier.

Illustrative use-case record at intake, valid against `use-case-record.v1` (the profile fields and the
filter claim travel in `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/use-case-record.v1.json",
  "record_id": "uc-2026-042",
  "title": "Payslip field extraction for mortgage applications",
  "business_owner": "head-of-mortgage-operations",
  "intended_purpose": "Extract income fields from uploaded payslips into the application form for an underwriter to confirm; the affordability assessment is made elsewhere.",
  "out_of_scope_uses": ["affordability scoring", "automatic decline", "employment verification"],
  "users": ["mortgage underwriters"],
  "affected_persons": ["mortgage applicants"],
  "decision_authority": "human_decides",
  "ai_justification": {
    "alternatives_considered": ["manual keying", "template-based OCR"],
    "why_ai": "Payslip layouts vary too much for templates; every extracted field is confirmed by an underwriter."
  },
  "success_metrics": [
    { "metric": "field-level exact match on a frozen sample", "target": ">= 0.98", "direction": "higher_is_better" }
  ],
  "error_appetite": "A wrong income figure can distort an affordability decision; low-confidence fields are routed to manual keying.",
  "data_sources": [{ "name": "applicant payslips", "personal_data": true, "special_category": false }],
  "jurisdictions": ["ES", "PT"],
  "preliminary_classification": {
    "eu_ai_act_category": "minimal",
    "internal_tier": "medium",
    "rationale": "Preparatory task to an Annex III 5(b) assessment (Art. 6(3) filter claimed, no profiling); assessment documented and registered under Art. 6(4) and Art. 49(2)."
  },
  "assessments_required": ["dpia"],
  "decision": {
    "outcome": "approved_with_conditions",
    "conditions": ["Art. 49(2) registration before go-live", "monthly 2% sample checked against source payslips"],
    "decided_by": "ai-governance-review",
    "decided_at": "2026-09-22"
  },
  "register_entry": "mortgage-extract-01",
  "extensions": {
    "risk_profile": { "autonomy": "suggests", "decision_impact": "informs", "exposure": "customers",
                      "reversibility": "reversible", "vulnerable_groups": [], "data_class": "personal",
                      "third_party": ["ocr-vendor-02"] },
    "tier_rule": "tiering-policy.v3",
    "annex_iii_point": "5(b)",
    "art_6_3_condition": "preparatory_task",
    "profiling": false
  }
}
```

> **Example (illustrative)** A bank's intake form is short enough to finish in one sitting. The
> prohibited-practice screen and the Annex III questions run first; the tier rule then reads the
> profile. A payslip-extraction tool lands in the medium tier with its `Art. 6(3)` filter claim on
> record, so it gets a DPIA link, an extraction-accuracy eval and a monthly sample check, not a
> committee slot. A second request, to rank applicants by predicted default, trips the profiling
> override at the first question and is routed as high-risk before anyone books a meeting.

## Consequences
Every system has a purpose, a class and a tier on record before it costs compute; review effort
follows risk; the inventory is complete because deployment depends on it; and each classification is
auditable down to the facts it rested on. The costs: the form must stay short or teams route around
it; the tier rule needs calibration and an appeal path; and self-declared facts can be wrong, so
intake needs spot checks against discovery and procurement.

## Related patterns
[Agent Registry](/patterns/agent-registry); [Policy Card](/patterns/policy-card);
[FRIA-as-Code](/patterns/fria-as-code);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery); [AI Threat Model](/patterns/ai-threat-model);
[Dataset Admission Gate](/patterns/dataset-admission-gate).

**Maps to:** EU AI Act Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Annex III · ISO/IEC 42001
A.5.2, A.9.4 · NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1) · Layer 01 Govern-as-Code /
Layer 02 Inventory & Transparency.

Function and subcategory labels follow the NIST AI RMF [2]; ISO/IEC 42001 Annex A ids follow a
published crosswalk, not the standard's text [5]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose (incl. "promotional or sales materials and statements"); Art. 5 prohibited practices; Art. 6(3) filter and profiling override, Art. 6(4) documented assessment before placing on the market; Art. 49(2) registration of systems concluded not high-risk under Art. 6(3); Annex III (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.3 level of risk-management activity by risk tolerance; GOVERN 1.6 inventory of AI systems; MAP 1.1 intended purposes and settings "understood and documented"; MAP 1.5 risk tolerances "determined and documented"; MAP 5.1 likelihood and magnitude of each identified impact). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Directive on Automated Decision-Making (algorithmic impact assessment before production; Appendix B impact levels I to IV defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[5] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.2 AI system impact assessment process, B.9.4 intended use of the AI system; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
