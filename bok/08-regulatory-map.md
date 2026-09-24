# 08. Regulatory map (obligation → artefact → layer)

> This chapter is the reverse index of every "Maps to" line in the book: for each obligation it names
> the engineering artefact that satisfies or supports it and the stack layer the artefact lives in.

Every other chapter maps *forward*: a capability, then the obligations it touches. This chapter maps
*backward*: an obligation, then the artefact and the layer that answer it. The unit of the map is a
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
  run under Article 99 [4]. Member States choose their own; Spain, for example, set up a dedicated
  agency, **AESIA** (Agencia Española de Supervisión de Inteligencia Artificial), whose statute was
  approved by Royal Decree 729/2023 [52]. The map states the authority per row so the reader knows who
  asks.

## EU AI Act, post-Omnibus

High-risk obligations (Articles 9–15, 17, 25, 26, 27, 49, 71, 72, 73) apply to Annex III systems from
**2 December 2027** and to Annex I embedded systems from **2 August 2028**, both deferred by the
Omnibus from 2 August 2026 and 2 August 2027 respectively [1][2]. The GPAI obligations (Articles 53,
55) have applied since 2 August 2025, with Commission enforcement powers live since 2 August 2026 [3].
Transparency (Article 50) went live on 2 August 2026 and was not moved [5]. Legacy public-authority
high-risk systems keep their original 2 August 2030 date [2].

The **Duty holder** column names who the obligation binds, which is a different axis from who enforces
it. The high-risk design-and-build duties (Articles 9 to 15 and 17) fall on the **provider**;
Articles 26 and 27 fall on the **deployer**; Articles 4, 5 and 50 bind **both**; and Articles 53 and
55 bind the **GPAI provider**. Article 25 sits across the value chain: it sets the conditions under
which a distributor, importer or deployer itself becomes a **provider** and inherits the provider
duties. This matters for the engineer because the artefacts you can produce
depend on which hat your organisation wears: a deployer cannot draw up the provider's technical
documentation, but it must run the Article 26 monitoring and the Article 27 FRIA; and when the model
is procured, most of the provider-side evidence becomes something you collect rather than produce (see
the Vendor / Model Due-Diligence Gate in chapter 05).

**Article 16** is the umbrella for the provider's high-risk duties. It adds no artefact of its own; it
gathers the obligations the rows below break out article by article: the requirements of Articles 9
to 15 and 17, the conformity assessment (Article 43), the EU declaration of conformity (Article 47),
registration (Articles 49 and 71), post-market monitoring (Article 72) and serious-incident reporting
(Article 73). So it reads here as a cross-reference, not a row [22].

| Article | Obligation | Engineering artefact | Layer | Duty holder | Applies (post-Omnibus) | Authority |
|---|---|---|---|---|---|---|
| `Art. 4` | AI literacy: take measures to support the development of AI literacy among staff and operators | Literacy programme as code; role-based training records; onboarding gates | 1 | Provider + deployer | 2026-07-27 (reworded, in force) [6] | Provider/deployer duty; national MSA |
| `Art. 4a` | Lawful basis to process special-category data for bias detection in high-risk systems, with pseudonymisation and deletion once bias is corrected | Data governance controls; pseudonymisation and retention-as-code; data card noting basis and deletion | 2 | Provider | 2026-07-27 (new, in force) [2] | National MSA / DPAs |
| `Art. 5` | Prohibited practices; new bans on AI-generated non-consensual intimate imagery (NCII) and CSAM | Policy-as-code blocklist; input/output guardrails; refusal and abuse detection | 1 · 4 | Provider + deployer | 2026-12-02 (new bans); earlier prohibitions from 2025-02-02 [2] | National MSA |
| `Art. 6` | Classification rules for high-risk AI systems, incl. the Annex III (standalone) route and Annex I (safety-component) route | Risk-tiering as code; high-risk classification decision record; register entry flagging Annex III status | 1 · 2 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
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
| `Art. 43` | Conformity assessment before placing on the market (internal control, or a notified body for Annex III point 1 biometrics) | Conformity-assessment workflow; internal-control or notified-body evidence pack; traceability to Annex IV documentation | 1 · 5 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
| `Art. 47` | EU declaration of conformity drawn up on completing the assessment | Auto-generated EU declaration of conformity from the evidence; CE-marking record | 2 · 5 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
| `Art. 49` / `Art. 71` | Registration of high-risk systems in the EU database | Agent/model registry with an API that feeds registration; owner and status per entry | 2 | Provider; public-authority deployer | 2027-12-02 (Annex III) [1] | National MSA; Commission (database) |
| `Art. 50` | Transparency for certain AI systems: chatbot disclosure; marking and labelling of synthetic content | Content labelling and machine-readable marking (e.g. C2PA-style); chatbot disclosure banner | 4 · 2 | Provider + deployer | 2026-08-02; marking grace for existing systems to 2026-12-02 [2][5] | National MSA |
| `Art. 53` | GPAI provider obligations, incl. a public summary of training content on an AI Office template | Model cards; training-content summary; AIBOM and dataset provenance | 2 | GPAI provider | Obligations from 2025-08-02; enforcement from 2026-08-02 [3] | AI Office |
| `Art. 55` | GPAI models with systemic risk: model evaluation incl. adversarial testing; Union-level risk assessment; serious-incident reporting; cybersecurity of the model | Eval and red-team suite; incident pipeline on the Commission serious-incident reporting template; weight-security controls; threat model | 3 · 4 · 5 | GPAI provider (systemic risk) | Obligations from 2025-08-02; enforcement from 2026-08-02 [3][26] | AI Office |
| `Art. 60` | Testing of high-risk (Annex III) AI systems in real-world conditions outside AI regulatory sandboxes | Real-world testing plan; `Art. 61` informed-consent records; test monitoring, logging and incident hooks | 3 · 4 | Provider / prospective provider | 2026-08-02 [22] | National MSA |
| `Art. 72` | Post-market monitoring for high-risk systems | Continuous assurance telemetry; monitoring plan; drift and performance signals | 5 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 73` | Serious-incident reporting for high-risk systems (deadlines in the reporting-clock table below) | Incident detection and triage pipeline; reporting-clock automation; evidence capture | 5 · 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |

The Article 73 clock runs by incident class. The provider notifies the national market-surveillance
authority on these deadlines, each running from the moment it becomes aware of the incident [22]:

| Incident class | Reporting deadline | Who reports | Artefact |
|---|---|---|---|
| Serious incident (general) | No later than 15 days after establishing the causal link | Provider → national MSA | Incident triage pipeline; reporting-clock automation |
| Widespread infringement, or serious and irreversible disruption of critical infrastructure | No later than 2 days | Provider → national MSA | Same pipeline, escalated-severity path |
| Death of a person | No later than 10 days | Provider → national MSA | Same pipeline, priority path |

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

For serious-incident reporting specifically, the Commission published a reporting template on 4
November 2025 for serious incidents involving GPAI models with systemic risk. It aligns to the
Article 55 reporting duty and to Commitment 9 of the Code's Safety and Security chapter, and is the
concrete artefact the incident pipeline emits, the same template named in the Article 55 row above
[26].

## ISO/IEC 42001, 42005 and 42006

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

Two further ISO/IEC standards sit alongside the AIMS. **ISO/IEC 42006:2025** sets the requirements
for the bodies that audit and certify AI management systems: building on ISO/IEC 17021-1, it is the
answer to "who may credibly certify you to 42001", since it fixes the competence and consistency a
certification body must show. **ISO/IEC 23894:2023** gives guidance on AI risk management, adapting
ISO 31000 to AI; it is the risk-process companion to Article 9 and to the NIST AI RMF [27][28].

| Standard | What it is | Engineering artefact | Layer |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Requirements for bodies auditing and certifying AI management systems (who may credibly certify you to 42001) | Accredited certification scope; auditor-competence evidence; certificate register | 5 |
| `ISO/IEC 23894:2023` | Guidance on AI risk management (companion to ISO 31000) | Risk register as code; AI risk taxonomy; linkage to `Art. 9` and NIST AI RMF | 1 · 3 |

**Maps to:** these controls are realised through layers 1, 2, 3 and 5 of the stack; the
impact-assessment control (A.5 / ISO 42005) supports EU AI Act `Art. 27`. Mappings are illustrative,
not a claim of conformity.

## NIST AI RMF

The NIST AI Risk Management Framework 1.0 (January 2023; there is no 2.0) organises risk work into
four functions. It is voluntary and US-origin, and it maps cleanly onto the five-layer stack [14].

| Function | What it asks for | Engineering artefact | Layer |
|---|---|---|---|
| GOVERN | A culture and structure for managing AI risk | Policy-as-code; operating model; registry ownership | 1 · 2 |
| MAP | Context and risk framing for each AI system | Threat models; use-case and impact mapping; data/model cards | 2 · 3 |
| MEASURE | Analyse, benchmark and monitor risk | Eval gates; adversarial red-team suite; metrics per failure mode | 3 |
| MANAGE | Prioritise, respond and recover | Runtime guardrails; incident pipeline; continuous assurance | 4 · 5 |

### Newer NIST AI work

Beyond the RMF, three newer NIST efforts bear on the stack. Two are still in draft, and the copy says
so. The **AI Agent Standards Initiative**, launched by NIST's Center for AI Standards and Innovation
(CAISI) on 17 February 2026, targets interoperable, secure standards for AI agents: identity,
authentication, authorisation and agent security [29]. The draft **IR 8596 Cyber AI Profile** (initial
preliminary draft, 16 December 2025; comments closed 30 January 2026, and still the current version
as of 2026-09-24) is a Cybersecurity Framework (CSF 2.0) profile for AI, organised around Secure,
Defend and Thwart [30]. The draft **AI 800-1** (Managing Misuse Risk for Dual-Use Foundation Models;
second public draft, January 2025; no final version published as of 2026-09-24) is voluntary guidance
for identifying, measuring and mitigating misuse risk across the AI lifecycle [31].

| NIST item | What it is | Engineering artefact | Layer |
|---|---|---|---|
| AI Agent Standards Initiative (2026) | CAISI initiative on interoperable, secure AI agents: identity, authentication, agent security | Agent registry; non-human-identity controls; agent authentication and authorisation; adversarial agent evals | 3 · 4 |
| IR 8596 Cyber AI Profile (draft) | CSF 2.0 profile for AI (Secure / Defend / Thwart) | AI-system security controls; runtime observability; threat detection mapped to CSF 2.0 | 3 · 4 |
| AI 800-1 (draft) | Managing Misuse Risk for Dual-Use Foundation Models (voluntary guidance) | Misuse red-team suite; capability and dangerous-capability evals; safety framework | 3 |

## CSA AICM and STAR for AI

The Cloud Security Alliance's AI Controls Matrix (AICM) v1.1, published 22 June 2026, defines 247
control objectives across 18 domains, and the STAR for AI programme (with an agentic-certification
track) provides the assurance scheme around it [15].

| CSA artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| AICM v1.1 | 247 control objectives across 18 domains, spanning governance, data, model and runtime | Control catalogue mapped to policy-as-code and evals; crosswalk to ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR for AI | Assurance and certification programme, incl. proposed agent controls | Machine-readable evidence submission; continuous assurance telemetry | 5 |
| Agentic Control Supplement | A proposed set of agent-specific controls extending the AICM | Agent-specific control definitions; policy-as-code for agent scope and tools; runtime guardrails | 1 · 4 |
| Catastrophic Risk Annex | Enhanced AICM controls for high-autonomy systems with catastrophic-risk potential | Enhanced controls for high-autonomy systems; kill switch and oversight controls; pilot-audit evidence | 4 · 5 |

Two extensions push the AICM toward agents and frontier risk. The **Agentic Control Supplement** adds
a proposed set of agent-specific controls, and the **Catastrophic Risk Annex** adds a set of enhanced
controls for high-autonomy systems, meant to be proven through pilot audits rather than asserted
[32][33].

## OWASP GenAI Security Project

OWASP's GenAI Security Project supplies the threat vocabulary the controls are built against, plus two
formats (the Agent Control Standard and an AIBOM) that the stack consumes directly [16][17][54].

| OWASP artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| Top 10 for Agentic Applications 2026 | Agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Agent threat model; adversarial evals; runtime guardrails; kill switch | 3 · 4 |
| Top 10 for LLM Applications 2026 | LLM threat catalogue (incl. Excessive Agency at #3) | Prompt-injection and output-handling controls; eval gate | 3 · 4 |
| Agent Control Standard (ACS) | A standard for expressing agent controls | Machine-readable control definitions for agents | 1 · 4 |
| AIBOM | AI bill-of-materials format and generator | AIBOM at build (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## US federal and state laws

The United States has no horizontal federal AI statute; the binding rules are state laws, and they
differ in scope. Two bind only large frontier developers; two more, Texas and Colorado, reach
ordinary developers and deployers.

### Frontier-developer laws

Two US state laws bind only large frontier developers, not general deployers: a narrower scope than
the EU AI Act's risk-tiering. They ask frontier developers to publish safety frameworks and report
critical incidents to the state [18][19].

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| California SB 53 (TFAIA), in force 2026-01-01 | Large frontier developers (models trained above ~10^26 FLOP; developer revenue over USD 500M) | Publish a frontier AI framework; report critical safety incidents to the Office of Emergency Services within 15 days; whistleblower protection; up to USD 1M per violation, AG-enforced [56] | Published safety framework; incident pipeline reporting to the state; transparency artefacts | 5 · 4 |
| New York RAISE Act (S6953B), signed 2025-12-19 | Large frontier developers (frontier models trained with over 10^26 operations, cost over USD 100M) | Publish a frontier AI safety and security framework; disclose safety incidents within 72 hours. A chapter amendment signed 2026-03-27 sets the effective date at 2027-01-01 and creates an oversight office within the New York Department of Financial Services (DFS) [19][24][25] | Published safety framework; incident and disclosure pipeline reporting to the state | 5 · 4 |

### Other state AI laws

Two further state laws reach beyond frontier developers to ordinary developers and deployers.

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), in force 2026-01-01 | Developers and deployers doing business in Texas | Intent-based prohibitions (social scoring, unlawful discrimination); AI-use disclosure; a regulatory sandbox; Attorney-General enforcement; local AI rules preempted [35] | Prohibited-use policy-as-code; AI-use disclosure controls; complaint and incident handling | 1 · 4 |
| Colorado AI Act (SB 24-205) | Developers and deployers of high-risk (consequential) automated decisions | Duty of reasonable care against algorithmic discrimination; risk management and consumer notice. Its 1 Feb 2026 start was delayed to 30 June 2026, then the Act was replaced by SB 26-189 (signed 14 May 2026), a narrower transparency law effective 1 Jan 2027, after a federal court blocked enforcement of the original [36][55] | High-risk ADM inventory; algorithmic-discrimination impact assessments; consumer disclosure | 1 · 2 · 5 |

## Other jurisdictions

The map's spine is the EU AI Act, but a governance function working across borders answers to more
than one regime. These rows are stamped as of 2026-09-24; where a rule is still moving, the copy says
so.

| Jurisdiction / instrument | Status (as of 2026-09-24) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| South Korea: AI Basic Act | In force 2026-01-22; the ministry (MSIT) runs a grace period of at least one year in 2026, deferring fact-finding and fines except in serious cases [34] | Baseline duties for AI operators, heightened duties for "high-impact" AI in sensitive sectors, and AI-content labelling | Risk register for high-impact AI; AI-use notification; AI-content labelling | 1 · 2 · 4 |
| Singapore: IMDA Model AI Governance Framework for Generative AI | Voluntary; published May 2024 [39] | Governance dimensions incl. testing, transparency, incident reporting, security and content provenance | Eval suite; model cards; content provenance and watermarking | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Published (V2.1.1, Dec 2025) [40] | Baseline cyber-security requirements across the AI lifecycle (13 principles over five stages) | AI-system security controls across the lifecycle; supply-chain and AIBOM checks; runtime hardening | 4 |

### United Kingdom

The UK has no horizontal AI act. It governs AI through existing sector regulators (the ICO, the FCA,
the MHRA and others), coordinated centrally, plus the **AI Security Institute** (renamed from the AI
Safety Institute in February 2025) for frontier-model evaluation [38]. For automated decision-making,
the Data (Use and Access) Act 2025 replaced UK GDPR Article 22 with new **Articles 22A–22D** (in force
5 February 2026): a permission-plus-safeguards model for significant, solely automated decisions, with
tighter conditions where special-category data is used. The safeguards (a meaningful-human-review
path, a channel to make representations and to contest, and a decision notice) are the artefact the
engineer builds [37].

### China

China governs AI in two tiers, and this map keeps them apart. The binding tier is a set of
departmental rules issued by the Cyberspace Administration of China (CAC) with co-issuers, on
algorithmic recommendation (2022), deep synthesis (2023), generative AI services (2023) and the
labelling of AI-generated synthetic content (2025); several are territorial, and the Interim Measures
for Generative AI Services apply only to services offered "to the public within the PRC" [43][44][45].
The labelling duty is backed by a mandatory national standard, GB 45438-2025, that carries the
metadata fields the measure requires [46][47]. The voluntary tier is the recommended standard GB/T
45654-2025 [48] and the TC260 AI Safety Governance Framework [41][42]. The Cybersecurity Law, amended
by the NPC Standing Committee on 2025-10-28 and in force 2026-01-01, adds a programmatic Article 20 on
AI that does not by itself create operator duties [49]; the most recent binding rule, the Interim
Measures for Anthropomorphic Interaction Services (in force 2026-07-15), is narrow in scope and is not
mapped in this edition [50]. The framework 3.0 (14 September 2026) is a TC260 technical document
published under CAC guidance and described as "a reference for developers, providers and users": it
sets a three-block risk taxonomy (inherent, application and secondary), grades risk qualitatively by
scenario, intelligence level and scale with no compute or parameter threshold, treats open-source
models as a distinct risk profile and names computing-power security as a risk category, and its
Appendix 2 walks the agent lifecycle from design to decommissioning [42]. Practitioner commentary
reported agents and physically interactive systems as the headline change in the new version [51].

The instruments above resolve to obligation-to-artefact rows in the same shape as the other
jurisdictions:

| Jurisdiction / instrument | Status (as of 2026-09-20) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| China: Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (CAC, MIIT, MPS and SAMR Order No. 9) | Binding; in force 2022-03-01 [43] | Algorithm filing for services with public-opinion attributes or social-mobilisation capacity, security assessment, display of the filing number, and a user option to switch off personalised recommendation | Algorithm inventory with filing record and number; security-assessment evidence pack; opt-out control at runtime | 1 · 2 · 4 |
| China: Provisions on the Administration of Deep Synthesis in Internet Information Services (CAC, MIIT and MPS Order No. 12) | Binding; in force 2023-01-10 [44] | Conspicuous labels where synthetic content could mislead the public and non-removable technical marks; training-data management; separate consent for face and voice editing; filing and security assessment for opinion-shaping functions | Content-provenance pipeline (visible label plus metadata mark); training-data governance record; consent gate; pre-release security assessment | 2 · 3 · 4 |
| China: Interim Measures for the Administration of Generative AI Services (CAC and six other bodies, Order No. 15) | Binding; in force 2023-08-15; applies to services offered to the public within the PRC [45] | Lawful-source training data and foundation models; content labelling under the deep-synthesis rules; security assessment and algorithm filing for opinion-shaping services; stop, remove, retrain and report on illegal content | Data-lineage and licensing record; eval gate on generated content; incident pipeline with a retraining loop; filing record | 2 · 3 · 4 · 5 |
| China: Measures for Labelling AI-Generated Synthetic Content, with mandatory standard GB 45438-2025 | Binding; in force 2025-09-01, the standard implemented the same day [46][47] | Explicit labels (text, audio or graphic) and implicit metadata labels carrying the provider's name or code and a content number; distribution platforms verify metadata and flag suspected AI content | Provenance and watermarking pipeline emitting the GB 45438 metadata fields; platform-side detection and flagging | 3 · 4 |
| China: GB/T 45654-2025 Basic security requirements for generative AI services | Recommended (voluntary) national standard; implemented 2025-11-01 [48] | Training-corpus source and content screening, model-safety requirements and the evaluation methods that underpin the security assessment | Corpus-screening record; eval question banks; security-assessment report | 3 · 5 |
| China: TC260 AI Safety Governance Framework 3.0 | Voluntary; published 2026-09-14, building on 1.0 (2024) and 2.0 (2025) [41][42] | A three-block risk taxonomy (inherent, application, secondary), technological and governance countermeasures and role-based guidelines; operators keep logs for at least six months and audit them, monitor risk in real time, keep a traceable chain of responsibility and assess resilience (§5.3) | Risk register keyed to the framework's taxonomy; log-retention policy (six months) with audit; real-time risk monitoring; resilience assessment | 1 · 4 · 5 |
| China: TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Voluntary; published 2026-09-14 [42] | Unique identity and least-privilege permissions per agent by decision mode; human checkpoints with tamper-proof approval logs and deny-by-default; tool and skill verification; runtime guardrails (alert, restrict, intercept, suspend, terminate); memory isolation with no credentials in memory; mutual authentication; sandbox validation, red teaming and re-validation on major change; controlled decommissioning | Agent registry with identity and scope; approval-log store; tool allow-list with integrity checks; runtime guardrails and kill switch; memory-scope policy; decommissioning runbook | 2 · 3 · 4 · 5 |

Appendix 2's agent controls line up with the two agentic references this chapter already carries, the
OWASP Top 10 for Agentic Applications [16] and the NIST AI Agent Standards Initiative [29]:

| Agent control | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Layer |
|---|---|---|---|---|
| Identity and least privilege | II.2: unique identity per agent, permissions by decision mode, credentials revoked at task end | ASI03 Identity & Privilege Abuse | Agent identity, authentication, authorisation | 2 · 4 |
| Human checkpoints and approval logs | II.3: tiered controls, human control checkpoints, tamper-proof approval logs, deny by default | ASI09 Human-Agent Trust Exploitation; ASI01 Agent Goal Hijack | None | 4 · 5 |
| Tools, skills and supply chain | II.4: tool verification, fair tool selection, anomaly detection, skill management | ASI02 Tool Misuse; ASI04 Agentic Supply Chain Vulnerabilities | Agent security | 2 · 4 |
| Runtime guardrails and execution limits | II.5(1)(2)(5)(6): input control, guardrails, step/frequency/duration limits, sandbox isolation | ASI01 Agent Goal Hijack; ASI05 Unexpected Code Execution; ASI08 Cascading Failures; ASI10 Rogue Agents | None | 4 |
| Memory | II.5(3): retention windows, isolation across users and tasks, no credentials in memory | ASI06 Memory & Context Poisoning | None | 3 · 4 |
| Agent–model–tool communication | II.5(4): mutual authentication, integrity, replay resistance | ASI07 Insecure Inter-Agent Communication | Authentication | 4 |
| Monitoring, audit, sandbox, red teaming, incident response | II.6: anomaly blocking, log management, security auditing, sandbox validation, red teaming, emergency plans, re-validation on major change | Cross-cutting | Adversarial agent evals | 3 · 5 |
| Decommissioning | II.7: complete shutdown, data backup, environment cleanup | ASI10 Rogue Agents (residual agents) | None | 2 · 4 |

Mappings are illustrative, not a claim of conformity.

## What is NOT harmonised yet

The map has a hole, and it is important to state it plainly rather than paper over it.

- **No harmonised standard is cited in the Official Journal.** As of 2026-09-24, Article 40's
  presumption of conformity is available to no one, because no harmonised standard has been OJ-cited
  [20].
- **EN 18286 is published but not cited.** The Article 17 QMS standard EN 18286:2026 was published in
  July 2026 (the first JTC 21 AI Act standard to reach publication), but it is not yet cited in the
  Official Journal, so it carries no presumption of conformity [20][21]. The Article 9 (risk), Article
  12 (logging) and Article 15 (cybersecurity) standards were reported to be still at the Enquiry stage
  in mid-2026, targeting the end of 2026 [53].
- **ISO/IEC 42001 is not the Article 17 QMS.** Certifying to EN ISO/IEC 42001:2026 evidences an AI
  management system; it does not confer an AI Act presumption of conformity, because it is not a
  harmonised standard and its scope differs from the Article 17 QMS [11][12].
- **The Code of Practice is voluntary.** Signing the GPAI Code is a way to demonstrate compliance with
  GPAI obligations; it is not a legal presumption of conformity [9].
- **China's framework does not cross-reference the Western instruments.** The TC260 AI Safety
  Governance Framework 3.0 cites no ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF or EU AI Act (its
  named reference points are the Global AI Governance Initiative and UN-centred channels), and it
  does not name China's own binding rules either [42]. A crosswalk between the two stacks is
  something the engineer builds; neither side's documents supply it.

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
Code of Practice, ISO/IEC 42001, 42005, 42006 and 23894, NIST AI RMF and the newer NIST AI work, CSA
AICM, OWASP GenAI/Agentic, the US federal and state laws and the other jurisdictions named above map
onto the five-layer stack (chapter 04) and the pattern catalogue (chapter 05). Mappings are
illustrative, not a claim of conformity.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026; marking grace for existing generative systems to 2 Dec 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] Top 10 for Agentic Applications 2026 (ASI01 … ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (in force 1 Jan 2026; frontier developers over USD 500M revenue and ~10^26 FLOP; up to USD 1M/violation; AG enforcement). Future of Privacy Forum. 2026. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; DFS oversight office). Wiley. 2026. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] AICM Agentic Control Supplement: proposed agent-specific controls extending the AI Controls Matrix. Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] South Korea AI Basic Act (Basic Act on the Development of AI and Establishment of Trust; Act and Enforcement Decree in force 22 Jan 2026; high-impact AI duties; MSIT grace period of at least one year in 2026 deferring fact-finding and fines). International Trade Administration (US). 2026. https://www.trade.gov/market-intelligence/south-korea-ai-basic-act (verified: secondary)
[35] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text; effective 1 Jan 2026. Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[36] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 30 Jun 2026, then replaced by SB 26-189, effective 1 Jan 2027). McDermott Will & Emery. 2026. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[37] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[38] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[39] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[40] ETSI EN 304 223: Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, Dec 2025; 13 principles across five lifecycle stages). ETSI. 2025-12. https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/ (verified: primary)
[41] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[42] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[43] Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm (verified: primary)
[44] Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 (verified: primary)
[48] GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A (verified: primary)
[49] Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (verified: primary)
[50] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[51] "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ (verified: reported)
[52] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[53] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[54] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[55] SB26-189 Automated Decision-Making Technology (signed by the Governor 14 May 2026; Session Laws chapter 131). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[56] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
