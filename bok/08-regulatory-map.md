# 08. Regulatory map (obligation → artefact → layer)

> This chapter is the reverse index of every "Maps to" line in the book: for each obligation it names
> the engineering artefact that satisfies or supports it and the stack layer the artefact lives in.

Every other chapter maps *forward* — a capability, then the obligations it touches. This chapter maps
*backward* — an obligation, then the artefact and the layer that answer it. The unit of the map is a
row: an obligation, the engineering artefact that produces the evidence for it, and one of the five
stack layers (chapter 04): **1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as
Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**. The map is a
crosswalk for finding the artefact that answers a question, not a certificate that the artefact makes
you compliant.

## How to read this map

Read each row as a sentence: *this obligation is answered by this artefact, which lives in this layer*.
Three cautions apply throughout.

- **Mappings are illustrative, not a claim of conformity.** No artefact in this book guarantees
  compliance, and no standard cited here confers a presumption of conformity (see "What is NOT
  harmonised yet"). An artefact *supports* and *evidences* an obligation; the legal judgement of
  conformity stays with lawyers, notified bodies and authorities.
- **Dates are the post-Omnibus dates.** Every EU AI Act date below reflects Regulation (EU) 2026/1744,
  the Digital Omnibus on AI, of 8 July 2026 (OJ L, 24 July 2026), in force 27 July 2026 [1][2][22].
  Where the Omnibus moved a date, the moved date is shown; where it did not, the row says so.
- **The competent authority differs by regime.** For general-purpose AI (GPAI) the supervisor is the
  **AI Office**, and GPAI fines are formal Commission decisions under Article 101 [3][4]. For
  high-risk systems the supervisors are **national market-surveillance authorities**, whose penalties
  run under Article 99 [4]. The map states the authority per row so the reader knows who asks.

## EU AI Act, post-Omnibus

High-risk obligations (Articles 9–15, 17, 25, 26, 27, 49, 71, 72, 73) apply to Annex III systems from
**2 December 2027** and to Annex I embedded systems from **2 August 2028**, both deferred by the
Omnibus from 2 August 2026 and 2 August 2027 respectively [1][2]. The GPAI obligations (Articles 53,
55) have applied since 2 August 2025, with Commission enforcement powers live since 2 August 2026 [3].
Transparency (Article 50) went live on 2 August 2026 and was not moved [5]. Legacy public-authority
high-risk systems keep their original 2 August 2030 date [2].

The **Duty holder** column names who the obligation binds, which is a different axis from who enforces
it. The high-risk design-and-build duties — Articles 9 to 15 and 17 — fall on the **provider**;
Articles 26 and 27 fall on the **deployer**; Articles 4, 5 and 50 bind **both**; and Articles 53 and
55 bind the **GPAI provider**. Article 25 sits across the value chain: it sets the conditions under
which a distributor, importer or deployer itself becomes a **provider** and inherits the provider
duties. This matters for the engineer because the artefacts you can produce
depend on which hat your organisation wears: a deployer cannot draw up the provider's technical
documentation, but it must run the Article 26 monitoring and the Article 27 FRIA — and when the model
is procured, most of the provider-side evidence becomes something you collect rather than produce (see
the Vendor / Model Due-Diligence Gate in chapter 05).

| Article | Obligation | Engineering artefact | Layer | Duty holder | Applies (post-Omnibus) | Authority |
|---|---|---|---|---|---|---|
| `Art. 4` | AI literacy: take measures to support the development of AI literacy among staff and operators | Literacy programme as code; role-based training records; onboarding gates | 1 | Provider + deployer | 2026-07-27 (reworded, in force) [6] | Provider/deployer duty; national MSA |
| `Art. 4a` | Lawful basis to process special-category data for bias detection in high-risk systems, with pseudonymisation and deletion once bias is corrected | Data governance controls; pseudonymisation and retention-as-code; data card noting basis and deletion | 2 | Provider | 2026-07-27 (new, in force) [2] | National MSA / DPAs |
| `Art. 5` | Prohibited practices; new bans on AI-generated non-consensual intimate imagery (NCII) and CSAM | Policy-as-code blocklist; input/output guardrails; refusal and abuse detection | 1 · 4 | Provider + deployer | 2026-12-02 (new bans); earlier prohibitions from 2025-02-02 [2] | National MSA |
| `Art. 9` | Risk management system across the high-risk lifecycle | Risk register as code; threat models; linkage to FRIA and eval results | 1 · 3 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 10` | Data and data governance; representative, relevant, error-checked datasets | Data cards; lineage; bias and quality tests in CI | 2 · 3 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 11` | Technical documentation (Annex IV) drawn up and kept up to date | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`); auto-generated technical documentation; model cards | 2 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 12` | Record-keeping: automatic logging of events over the system's lifetime | Structured, signed logs; `OpenTelemetry` traces; tamper-evident event store | 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 13` | Transparency and provision of information to deployers | Instructions for use as code; model and data cards; capability and limitation notes | 2 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 14` | Human oversight designed into the system | Human-in-the-loop checkpoints; kill switch; override and escalation paths | 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 15` | Accuracy, robustness and cybersecurity | Eval gate; adversarial red-team suite; robustness and security controls; regression evals | 3 · 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 17` | Quality management system | QMS-as-code; versioned policies; pipeline controls and change management | 1 · 5 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 25` | Responsibilities along the AI value chain: when a distributor, importer or deployer becomes a provider, and the information a provider must pass to actors downstream | Value-chain due-diligence gate; provider/deployer responsibility allocation; AIBOM and model/data cards collected from upstream providers | 2 · 5 | Provider + value-chain actors | 2027-12-02 (Annex III) [23] | National MSA |
| `Art. 26` | Deployer obligations for high-risk systems (use per instructions, monitoring, human oversight) | Deployment registry; monitoring hooks; assigned oversight and logging retention | 2 · 4 | Deployer | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 27` | Fundamental Rights Impact Assessment (FRIA) for deployers of Annex III systems | FRIA-as-code from a template; cross-reference to a GDPR `Art. 35` DPIA | 1 · 2 | Deployer | 2027-12-02 (Annex III) [7] | National MSA |
| `Art. 49` / `Art. 71` | Registration of high-risk systems in the EU database | Agent/model registry with an API that feeds registration; owner and status per entry | 2 | Provider; public-authority deployer | 2027-12-02 (Annex III) [1] | National MSA; Commission (database) |
| `Art. 50` | Transparency for certain AI systems: chatbot disclosure; marking and labelling of synthetic content | Content labelling and machine-readable marking (e.g. C2PA-style); chatbot disclosure banner | 4 · 2 | Provider + deployer | 2026-08-02; marking grace for existing systems to 2026-12-02 [5] | National MSA |
| `Art. 53` | GPAI provider obligations, incl. a public summary of training content on an AI Office template | Model cards; training-content summary; AIBOM and dataset provenance | 2 | GPAI provider | Obligations from 2025-08-02; enforcement from 2026-08-02 [3] | AI Office |
| `Art. 55` | GPAI models with systemic risk: model evaluation incl. adversarial testing; Union-level risk assessment; serious-incident reporting; cybersecurity of the model | Eval and red-team suite; incident pipeline; weight-security controls; threat model | 3 · 4 · 5 | GPAI provider (systemic risk) | Obligations from 2025-08-02; enforcement from 2026-08-02 [3] | AI Office |
| `Art. 72` | Post-market monitoring for high-risk systems | Continuous assurance telemetry; monitoring plan; drift and performance signals | 5 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 73` | Serious-incident reporting for high-risk systems (no later than 15 days; 2 days if widespread; 10 days on death) | Incident detection and triage pipeline; reporting-clock automation; evidence capture | 5 · 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |

Two cross-cutting provisions frame the penalties. Under **`Art. 101`**, the Commission may fine GPAI
providers up to 3% of worldwide annual turnover or EUR 15 million, whichever is higher [3][4]. Under
the Omnibus's new **`Art. 75a`–`75d`**, the AI Office gains investigation powers backed by periodic
penalty payments of up to 5% of average daily turnover per day for a continuing breach, in force since
27 July 2026 [8]. High-risk administrative fines run under `Art. 99` (ceilings of 7%, 3% and 1% of
turnover depending on the breach), imposed by national authorities [4].

## GPAI Code of Practice

The GPAI Code of Practice, published 10 July 2025, is the voluntary instrument providers use to
demonstrate compliance with the GPAI obligations until harmonised standards exist. It has three
chapters [9][10].

| Chapter | What it asks for | Engineering artefact | Layer |
|---|---|---|---|
| Safety and Security (systemic-risk models only) | A Safety and Security Framework; model evaluations incl. adversarial testing; systemic-risk assessment and mitigation; serious-incident reporting; model and infrastructure security | Eval and red-team suite; adversarial testing harness; incident pipeline; weight-security controls | 3 · 4 · 5 |
| Transparency | Up-to-date model documentation for the AI Office and downstream deployers | Model cards; structured model documentation; AIBOM | 2 |
| Copyright | A policy to comply with Union copyright law, incl. respecting reservations of rights | Training-data provenance and licence records; policy-as-code for source filtering | 1 · 2 |

The Code is voluntary; signing it is one route to demonstrating compliance, not a legal presumption of
conformity [9]. Signatory status is dynamic and counted per the Commission's official list [10].

## ISO/IEC 42001 and 42005

ISO/IEC 42001:2023 is the AI management-system (AIMS) standard; its Annex A groups control objectives
into nine areas (`A.2`–`A.10`). It is a management-system standard, not the Article 17 QMS, and its
European adoption (EN ISO/IEC 42001:2026) confers no presumption of conformity [11][12].

| Annex A area | Focus | Engineering artefact | Layer |
|---|---|---|---|
| `A.2` Policies related to AI | AI policy set and its governance | Policy-as-code library; versioned policy repository | 1 |
| `A.3` Internal organization | Roles, responsibilities, reporting | Operating model; RACI; ownership in the registry | 1 · 2 |
| `A.4` Resources for AI systems | Data, tooling, compute, human resources documented | Resource inventory; AIBOM; environment manifests | 2 |
| `A.5` Assessing impacts of AI systems | Impact assessment process | Impact assessment as code; FRIA/DPIA linkage (ISO/IEC 42005) | 1 · 3 |
| `A.6` AI system life cycle | Responsible design, development, deployment | Pipeline controls; eval gates; change management | 1 · 3 · 4 |
| `A.7` Data for AI systems | Data quality, provenance, preparation | Data cards; lineage; data quality tests | 2 · 3 |
| `A.8` Information for interested parties | Transparency and reporting to stakeholders | Model/data cards; machine-readable disclosures | 2 |
| `A.9` Use of AI systems | Responsible-use controls and monitoring | Runtime guardrails; usage telemetry | 4 |
| `A.10` Third-party and customer relationships | Managing supplier and customer responsibilities | Supplier AIBOM; contractual and technical control mapping | 2 · 5 |

ISO/IEC 42005:2025 provides guidance for AI system impact assessment and is the natural companion to
Article 27 (FRIA) and Annex A.5 [13].

**Maps to:** these controls are realised through layers 1, 2 and 3 of the stack; the impact-assessment
control (A.5 / ISO 42005) supports EU AI Act `Art. 27`. Mappings are illustrative, not a claim of
conformity.

## NIST AI RMF

The NIST AI Risk Management Framework 1.0 (January 2023; there is no 2.0) organises risk work into
four functions. It is voluntary and US-origin, and it maps cleanly onto the five-layer stack [14].

| Function | What it asks for | Engineering artefact | Layer |
|---|---|---|---|
| GOVERN | A culture and structure for managing AI risk | Policy-as-code; operating model; registry ownership | 1 · 2 |
| MAP | Context and risk framing for each AI system | Threat models; use-case and impact mapping; data/model cards | 2 · 3 |
| MEASURE | Analyse, benchmark and monitor risk | Eval gates; adversarial red-team suite; metrics per failure mode | 3 |
| MANAGE | Prioritise, respond and recover | Runtime guardrails; incident pipeline; continuous assurance | 4 · 5 |

## CSA AICM and STAR for AI

The Cloud Security Alliance's AI Controls Matrix (AICM) v1.1, published 22 June 2026, defines 247
control objectives across 18 domains, and the STAR for AI programme (with an agentic-certification
track) provides the assurance scheme around it [15].

| CSA artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| AICM v1.1 | 247 control objectives across 18 domains, spanning governance, data, model and runtime | Control catalogue mapped to policy-as-code and evals; crosswalk to ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR for AI | Assurance and certification programme, incl. proposed agent controls | Machine-readable evidence submission; continuous assurance telemetry | 5 |

## OWASP GenAI Security Project

OWASP's GenAI Security Project supplies the threat vocabulary the controls are built against, plus two
formats — the Agent Control Standard and an AIBOM — that the stack consumes directly [16][17].

| OWASP artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| Top 10 for Agentic Applications 2026 | Agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Agent threat model; adversarial evals; runtime guardrails; kill switch | 3 · 4 |
| Top 10 for LLM Applications 2026 | LLM threat catalogue (incl. Excessive Agency at #3) | Prompt-injection and output-handling controls; eval gate | 3 · 4 |
| Agent Control Standard (ACS) | A standard for expressing agent controls | Machine-readable control definitions for agents | 1 · 4 |
| AIBOM | AI bill-of-materials format and generator | AIBOM at build (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## US frontier-developer laws

Two US state laws bind only large frontier developers, not general deployers — a narrower scope than
the EU AI Act's risk-tiering. They ask frontier developers to publish safety frameworks and report
critical incidents to the state [18][19].

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| California SB 53 (TFAIA), in force 2026-01-01 | Large frontier developers (models trained above ~10^26 FLOP; developer revenue over USD 500M) | Publish a safety and security framework; report critical safety incidents to the state; whistleblower protection; up to USD 1M per violation, AG-enforced | Published safety framework; incident pipeline reporting to the state; transparency artefacts | 5 · 4 |
| New York RAISE Act (S6953B), signed 2025-12-19 | Large frontier developers (frontier models trained with over 10^26 operations, cost over USD 100M) | Publish a frontier AI safety and security framework; disclose safety incidents within 72 hours. A chapter amendment signed 2026-03-27 sets the effective date at 2027-01-01 and creates an oversight office within the New York Department of Financial Services (DFS) [19][24][25] | Published safety framework; incident and disclosure pipeline reporting to the state | 5 · 4 |

## What is NOT harmonised yet

The map has a hole, and it is important to state it plainly rather than paper over it.

- **No harmonised standard is cited in the Official Journal.** As of 2026-09-19, Article 40's
  presumption of conformity is available to no one, because no harmonised standard has been OJ-cited
  [20].
- **EN 18286 is published but not cited.** The Article 17 QMS standard EN 18286:2026 was published in
  July 2026 — the first JTC 21 AI Act standard to reach publication — but it is not yet cited in the
  Official Journal, so it carries no presumption of conformity [21]. The Article 9 (risk), Article 12
  (logging) and Article 15 (cybersecurity) standards were still at the Enquiry stage, targeting the end
  of 2026 [20].
- **ISO/IEC 42001 is not the Article 17 QMS.** Certifying to EN ISO/IEC 42001:2026 evidences an AI
  management system; it does not confer an AI Act presumption of conformity, because it is not a
  harmonised standard and its scope differs from the Article 17 QMS [11][12].
- **The Code of Practice is voluntary.** Signing the GPAI Code is a way to demonstrate compliance with
  GPAI obligations; it is not a legal presumption of conformity [9].

The practical reading: for the period this edition covers, you cannot buy a presumption of conformity
off the shelf. The obligation-to-artefact rows above are how a governance function evidences the
obligation on its own merits while the harmonised standards are still being written.

> **In practice (illustrative)**
> A governance team maintained this map not as a slide but as a machine-readable crosswalk: a
> versioned file linking each obligation ID to the artefact that produced its evidence and the layer
> it lived in, emitted as `OSCAL` component definitions. When the Omnibus moved the high-risk dates,
> the change was a diff to one field per affected row, and every "Maps to" line downstream re-resolved
> from the same file. The audit question "show me what answers Article 15" became a query against the
> crosswalk, not a hunt through a wiki.

**Maps to:** this chapter is the reverse index for the whole book; every EU AI Act article, the GPAI
Code of Practice, ISO/IEC 42001 and 42005, NIST AI RMF, CSA AICM, OWASP GenAI/Agentic and the two US
frontier laws named above map onto the five-layer stack (chapter 04) and the pattern catalogue
(chapter 05). Mappings are illustrative, not a claim of conformity.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Consolidated changes after the Digital Omnibus (Art. 4a special-category data; Art. 5 NCII/CSAM from 2 Dec 2026; transitional dates). AI Act Explorer (Future of Life Institute). 2026. https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (verified: secondary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission — AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] EU AI Act Art. 101 (Commission fines for GPAI providers) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/101/ (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026; marking grace for existing generative systems to 2 Dec 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] EU AI Act Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/27/ (verified: primary)
[8] Arts. 75a–75d: AI Office investigation powers with periodic penalty payments up to 5% of average daily turnover per day for continuing breaches (Art. 75c(5)). AI Act Explorer (Future of Life Institute). 2026. https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (verified: secondary)
[9] GPAI Code of Practice (published 10 Jul 2025; voluntary; three chapters: Transparency, Copyright, Safety and Security). AI Act Explorer / European Commission. 2025-07-10. https://artificialintelligenceact.eu/introduction-to-code-of-practice/ (verified: primary)
[10] GPAI Code of Practice — contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025 — AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] Top 10 for Agentic Applications 2026 (ASI01 … ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications, Agent Control Standard (ACS) and AIBOM release wave. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (in force 1 Jan 2026; frontier developers over USD 500M revenue and ~10^26 FLOP; up to USD 1M/violation; AG enforcement). Future of Privacy Forum. 2026. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ → no Art. 40 presumption; risk/logging/cybersecurity standards at Enquiry, Q4 2026 target). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[21] EN 18286:2026 (Art. 17 QMS) published July 2026, not yet OJ-cited. CEN-CENELEC news. 2026-07-30. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: secondary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] EU AI Act Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/25/ (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; DFS oversight office). Wiley. 2026. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
</content>
