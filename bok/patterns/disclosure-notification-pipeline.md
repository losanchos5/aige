---
id: disclosure-notification-pipeline
title: "Disclosure & Notification Pipeline"
layer: 5
secondaryLayer: 2
order: 32
summary: "Disclosures and notices generated from the registry, from versioned templates per audience and clock, with every notice sent recorded as evidence."
---

# Pattern: Disclosure & Notification Pipeline

**Summary:** Generate every outward-facing statement about an AI system from one source of truth,
the registry: the proactive disclosures (an AI-interaction notice, content labels, the transparency
page and plain-language system card, notices to workers and to people subject to decisions) and the
reactive notifications (to the provider, authorities, affected people, customers and the public) that
a trigger starts on a clock. Templates are versioned like code, approvals are recorded, and every
notice sent is an evidence record with its audience, template version and timestamp.

> **In short**
> The Disclosure & Notification Pipeline is an assurance control that generates every outward-facing
> statement about an AI system from one source of truth, the registry. It covers proactive
> disclosures, such as an AI-interaction notice, content labels, the transparency page and notices
> to workers, and reactive notifications to providers, authorities, affected people and customers
> that a trigger starts on a clock. It solves disclosures written once by hand per surface, which
> drift from what is running, and reactive notices drafted under pressure with no record of what
> went out. Use it once transparency duties attach to specific surfaces and clocks, as they do under
> the EU AI Act and the GDPR. A duty matrix maps registry facts to duties, templates are versioned
> like code with recorded approvals, and every notice sent is recorded with its audience, template
> version and timestamp. Its illustrative mappings include EU AI Act Art. 26 and Art. 50, GDPR Art.
> 33 and 34, the Korea AI Basic Act Art. 31 and ISO/IEC 42001 A.8.2.

## Objectives
Make sure the people and bodies who must hear about an AI system hear the right thing, on time, from
one voice, and be able to prove what was said to whom and when.

## Target users
AI governance engineer, communications owner, legal and compliance, DPO, product engineer.

## Impacted stakeholders
Users, workers and their representatives, affected persons, business customers and partners,
providers and deployers up and down the chain, supervisory and market-surveillance authorities, the
public and media.

## Relevant principles
Instrument the build to produce its own proof; make the governed path the easiest path; give every
control teeth.

## Context
Transparency duties now attach to specific surfaces and clocks. Under the EU AI Act, providers must
design systems that interact with people so that they know it is an AI system, and must mark synthetic
outputs; deployers must inform people exposed to emotion recognition or biometric categorisation and
disclose deep fakes; and the information must reach people at the latest at first interaction or
exposure (`Art. 50(1)`–`(5)`) [1]. Article 50 has applied since 2 Aug 2026, and generative systems
already on the market before that date have until 2 Dec 2026 to mark outputs [2]. High-risk deployers
must also inform workers before workplace use, inform people subject to Annex III decisions, and
inform the provider and authorities when a system presents a risk (`Art. 26(5)`, `(7)`, `(11)`) [1].
The GDPR adds breach notification to the authority within 72 hours where feasible and to affected
people without undue delay when the risk to them is high [3]. Outside the EU, Korea's AI Basic Act
has required prior notice of generative and high-impact AI and labels on generated outputs since 22
Jan 2026 [4]; California's AI Transparency Act, operative since 2 Aug 2026, asks large generative-AI
providers for latent and optional manifest disclosures [5]; and Utah requires a clear answer when a
consumer asks whether they are talking to AI [6]. Establishing external communication plans is part
of governing deployment and use in the IAPP AIGP Body of Knowledge (competency IV.C) [7].

## Problem
Disclosures are written once, by hand, per surface, and drift from what is running: the transparency
page describes last year's model, the chat widget's notice disappeared in a redesign, and nobody can
say which workers were told before the system went live. Reactive notices are drafted under pressure
when the clock is already running, by whoever is available, without a record of what went out. Each
jurisdiction's duty is handled by a different team with a different template.

### Forces
- **One voice against many audiences.** A regulator, a customer and the press need different content
  from the same facts.
- **Speed against accuracy.** Clocks run from awareness, while facts arrive late; a holding statement
  must say only what is known.
- **Consistency against localisation.** Duties and languages differ by jurisdiction, yet the facts must
  not.
- **Proactive against reactive.** Disclosure duties are continuous; notification duties fire on events.

## Solution
Treat disclosure as a pipeline from the registry to each audience, with evidence at the end.

1. **One source of truth.** The registry entry holds the facts disclosures draw on: purpose, provider,
   model version, jurisdictions, whether the system interacts with people, generates content, makes
   decisions about people or is used at work. The transparency page and the plain-language system card
   are generated from it on every release, so they cannot drift from what runs.
2. **A duty matrix per system.** A rule set maps registry facts to duties: interaction disclosure,
   content marking and labels, worker information, decision notices (see
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path)), local notices per
   jurisdiction. Each duty names a surface, a template and a test that the notice renders there.
3. **Templates as code.** Templates per audience and language live in version control with an owner and
   an approval rule; a template change is a reviewed diff. Holding statements exist in skeleton before
   any incident.
4. **Triggers with clocks.** An incident, a breach, a material change, a deprecation or a retirement
   emits a trigger; the pipeline selects the audiences from the matrix and the
   [Downstream Use Register](/patterns/downstream-use-register), starts each clock and drafts each
   notice. Incidents arrive from the [Incident Pipeline](/patterns/incident-pipeline).
5. **Evidence per notice.** Each notice sent writes a record: audience, trigger, template version,
   approver, channel, timestamp. The deployment decision record points at the proactive ones (its
   `workers_informed` and `affected_persons_informed` duties, in the
   [deployment decision record schema](/resources/templates#schema-deployment-decision-record)), and the
   incident record's reporting block points at the reactive ones.

Illustrative disclosure manifest generated from the registry, with one notice sent:

```json
{
  "subject": "csa-01@2026-09-18",
  "generated_at": "2026-09-18T07:00:00Z",
  "proactive": [
    { "duty": "EU AI Act Art. 50(1)", "surface": "chat widget", "template": "ai-disclosure.es-en.v3", "test": "e2e:disclosure-renders" },
    { "duty": "Korea AI Basic Act Art. 31(1)", "surface": "terms of service (KR)", "template": "kr-prior-notice.ko.v1", "test": "e2e:kr-terms-notice" },
    { "duty": "transparency page", "surface": "/ai/csa-01", "template": "system-card.v2", "test": "build:card-matches-registry" }
  ],
  "reactive": [
    { "trigger": "serious_incident", "audience": "provider", "clock": "immediately", "template": "si-notice.v2" },
    { "trigger": "personal_data_breach", "audience": "supervisory_authority", "clock": "72h where feasible", "template": "breach-art33.v4" },
    { "trigger": "material_change", "audience": "business_customers", "clock": "30 days before, per contract", "template": "change-notice.v2" }
  ],
  "sent": [
    {
      "notice_id": "ntc-2026-0091",
      "trigger": "material_change",
      "audience": "business_customers",
      "template": "change-notice.v2",
      "approved_by": "communications-owner",
      "sent_at": "2026-09-01T10:00:00Z"
    }
  ]
}
```

> **Example (illustrative)** A support assistant moves to a new vendor model. The release regenerates
> the system card and the transparency page from the registry, the pipeline sends the contractual
> change notice to business customers 30 days ahead from the approved template, and a check in CI fails
> the build when a redesigned chat widget no longer renders the AI-interaction notice.

## Consequences
What the organisation says about its AI matches what runs, notices go out on time from approved
templates, and each one is provable. The cost is the duty matrix to maintain as laws change, template
ownership across legal, communications and product, and rendering tests on every surface. The
pipeline produces the notice; whether the notice is understood still needs testing with its readers.

## Related patterns
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Incident Pipeline](/patterns/incident-pipeline);
[Downstream Use Register](/patterns/downstream-use-register);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Maps to:** EU AI Act Art. 26(5), Art. 26(7), Art. 26(11), Art. 50 · GDPR Art. 33, Art. 34 · Korea
AI Basic Act Art. 31 · ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5 · NIST AI RMF MANAGE 4.3, GOVERN
4.2, GOVERN 5.1 · Layer 05 Assurance & Continuous Compliance / Layer 02 Inventory & Transparency.

Control ids follow ISO/IEC 42001 Annex A [8] and subcategory ids the NIST AI RMF [9]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5), (7) and (11) deployer information duties; Art. 50(1)–(5) transparency obligations). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 111(4): Art. 50(2) marking for generative systems placed on the market before 2 Aug 2026 from 2 Dec 2026); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 33 notification to the supervisory authority within 72 hours where feasible; Art. 34 communication to the data subject). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[4] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; Art. 31 prior notice, output labelling and realistic synthetic content). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[5] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[6] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; effective 2025-05-07). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[7] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: establish external communication plans; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[8] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.8.3 external reporting; A.8.4 communication of incidents; A.8.5 information for interested parties). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 4.2 impacts documented and communicated more broadly; GOVERN 5.1 feedback from those external to the team; MANAGE 4.3 incidents and errors communicated to relevant AI actors, including affected communities). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
