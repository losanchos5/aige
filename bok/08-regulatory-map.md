---
seoTitle: "AI regulatory map: every obligation to its artefact"
---
# 08. Regulatory map (obligation → artefact → layer)

> This chapter is the reverse index of every "Maps to" line in the book: for each obligation it names
> the engineering artefact that satisfies or supports it and the stack layer the artefact lives in.

> **In short**
> The regulatory map is the reverse index of every Maps to line in the Body of Knowledge: for each
> obligation it names the engineering artefact that satisfies or supports it and the stack layer the
> artefact lives in. It indexes the EU AI Act after the Digital Omnibus, the GPAI Code of Practice,
> the GDPR and other EU law, ISO/IEC 42001, the NIST AI RMF, US federal and state laws and other
> jurisdictions. Every EU AI Act date reflects Regulation (EU) 2026/1744, in force 27 July 2026:
> high-risk obligations apply to Annex III systems from 2 December 2027 and to Annex I embedded
> systems from 2 August 2028 [1][2]. For general-purpose AI the supervisor is the AI Office; for
> high-risk systems it is the national market-surveillance authorities. Mappings are illustrative,
> not a claim of conformity: an artefact supports and evidences an obligation, and the legal
> judgement stays with lawyers, notified bodies and authorities.

Every other chapter maps *forward*: a capability, then the obligations it touches. This chapter maps
*backward*: an obligation, then the artefact and the layer that answer it. The unit of the map is a
row: an obligation, the engineering artefact that produces the evidence for it, and one of the five
stack layers (chapter 04): **1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as
Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**. The map is a
crosswalk for finding the artefact that answers a question, not a certificate that the artefact makes
you compliant. It indexes the AI-specific instruments first and then the data-protection,
cyber-security, liability, consumer and sector law an AI system meets on day one, so that every row
of the [obligation register](/obligations) resolves to a table in this chapter. Chapter 19 teaches the
data-protection rows in its [obligation to artefact map](/bok/privacy-and-ai#obligation-to-artefact-map),
and chapter 20 the [other law that already applies to AI](/bok/existing-law) (copyright,
anti-discrimination, consumer protection and product liability).

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

For a teaching walk-through of the Act before this reverse index maps it (scope, the risk ladder,
value-chain roles, deployer duties, enforcement and the full post-Omnibus timeline), see [chapter
18](/bok/eu-ai-act), which walks the Act end to end.

High-risk obligations (Articles 9–15, 17, 25, 26, 27, 49, 71, 72, 73) apply to Annex III systems from
**2 December 2027** and to Annex I embedded systems from **2 August 2028**, both deferred by the
Omnibus from 2 August 2026 and 2 August 2027 respectively [1][2]. The amended `Art. 113(c)` defers
Chapter III, Sections 1 to 3: classification, the requirements of Articles 8 to 15 and the duties of
providers, deployers and other operators in Articles 16 to 27 [22]. The high-risk duties that sit
elsewhere (conformity assessment, the declaration, CE marking and registration in Articles 43 to 49
and 71, post-market monitoring and incident reporting in Articles 72, 73 and 75(1a), and the right to
explanation in Article 86) belong to chapters that formally apply from 2 August 2026, but they have
work to do only once a system is classified high-risk, so the map dates them by the classification
date. That is this map's reading; confirm it with counsel (verify) [22][63]. Articles 26(11), 27, 49,
71 and 86 concern Annex III systems only, so the 2 August 2028 date does not reach them. The GPAI
obligations (Articles 53, 55) have applied since 2 August 2025, with Commission enforcement powers
live since 2 August 2026 [3]; providers of models placed on the market before 2 August 2025 comply by
2 August 2027 (`Art. 111(3)`) [63].
Transparency (Article 50) went live on 2 August 2026 and was not moved [5]. Legacy public-authority
high-risk systems keep their original 2 August 2030 date [2].

The **Duty holder** column names who the obligation binds, which is a different axis from who enforces
it. The high-risk design-and-build duties (Articles 9 to 15 and 17) fall on the **provider**;
Articles 26 and 27 fall on the **deployer**; Articles 4, 5 and 50 bind **both**; and Articles 53 and
55 bind the **GPAI provider**. Article 25 sits across the value chain: it sets the conditions under
which a distributor, importer or deployer itself becomes a **provider** and inherits the provider
duties. Articles 22 to 24 bind the **authorised representative** of a non-EU provider, the
**importer** and the **distributor**, and Article 54 the authorised representative of a non-EU GPAI
provider. This matters for the engineer because the artefacts you can produce
depend on which hat your organisation wears: a deployer cannot draw up the provider's technical
documentation, but it must run the Article 26 monitoring and the Article 27 FRIA; and when the model
is procured, most of the provider-side evidence becomes something you collect rather than produce (see
the Vendor / Model Due-Diligence Gate in chapter 05).

**Article 16** is the umbrella for the provider's high-risk duties. Apart from point (l),
accessibility, which has its own row, it adds no artefact of its own; it gathers the obligations the
rows below break out article by article: the requirements of Articles 9 to 15 and 17, documentation
keeping and logs (Articles 18 and 19), corrective action (Article 20), the conformity assessment
(Article 43), the EU declaration of conformity and CE marking (Articles 47 and 48), registration
(Articles 49 and 71), post-market monitoring (Article 72) and serious-incident reporting (Article 73).
So it reads here as a cross-reference, not a row [22][63].

| Article | Obligation | Engineering artefact | Layer | Duty holder | Applies (post-Omnibus) | Authority |
|---|---|---|---|---|---|---|
| `Art. 3(1)` | Scope: decide, system by system, whether it is an AI system under the Art. 3(1) definition before any other duty is assessed | Definitional decision record in the registry: definition applied, elements found, excluded family if any, reason, decider, date | 2 | Provider + deployer (scoping) | 2025-02-02 (Chapter I) [63] | National MSA |
| `Art. 4` | AI literacy: take measures to support the development of AI literacy among staff and operators | Literacy programme as code; role-based training records; onboarding gates | 1 | Provider + deployer | 2025-02-02; reworded 2026-07-27 (in force) [6][22][63] | Provider/deployer duty; national MSA |
| `Art. 4a` | Lawful basis to process special-category data for bias detection in high-risk systems, with pseudonymisation and deletion once bias is corrected | Data governance controls; pseudonymisation and retention-as-code; data card noting basis and deletion | 2 | Provider | 2026-07-27 (new, in force) [2] | National MSA / DPAs |
| `Art. 5` | Prohibited practices; new bans on AI-generated non-consensual intimate imagery (NCII) and CSAM | Policy-as-code blocklist; input/output guardrails; refusal and abuse detection | 1 · 4 | Provider + deployer | 2026-12-02 (new bans); earlier prohibitions from 2025-02-02 [2] | National MSA |
| `Art. 6` | Classification rules for high-risk AI systems, incl. the Annex III (standalone) route and Annex I (safety-component) route | Risk-tiering as code; high-risk classification decision record; register entry flagging Annex III status | 1 · 2 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
| `Art. 6(3)–(4)` | A provider that finds an Annex III system not high-risk under the Art. 6(3) filter documents the assessment before placing it on the market and registers it under Art. 49(2); a system that profiles natural persons is always high-risk | Classification decision record (Annex III point, Art. 6(3) condition, explicit profiling flag); Art. 49(2) registration entry pushed from the registry | 1 · 2 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 9` | Risk management system across the high-risk lifecycle | Risk register as code; threat models; linkage to FRIA and eval results | 1 · 3 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 10` | Data and data governance; representative, relevant, error-checked datasets | Data cards; lineage; bias and quality tests in CI | 2 · 3 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 11` | Technical documentation (Annex IV) drawn up and kept up to date | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`); auto-generated technical documentation; model cards | 2 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 12` | Record-keeping: automatic logging of events over the system's lifetime | Structured, signed logs; `OpenTelemetry` traces; tamper-evident event store | 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 13` | Transparency and provision of information to deployers | Instructions for use as code; model and data cards; capability and limitation notes | 2 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 14` | Human oversight designed into the system | Human-in-the-loop checkpoints; kill switch; override and escalation paths | 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 15` | Accuracy, robustness and cybersecurity | Eval gate; adversarial red-team suite; robustness and security controls; regression evals | 3 · 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 15(4)` | Systems that continue to learn after placing on the market are built to eliminate or reduce the risk of biased outputs feeding future inputs (feedback loops), with mitigation measures | Feedback-loop fairness monitor; retraining-data bias check; agent memory write gate with provenance and rollback to a known-good snapshot | 3 · 4 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 16(l)` | Providers ensure the high-risk system complies with the accessibility requirements of Directives (EU) 2016/2102 and (EU) 2019/882 | Accessibility test results for every notice, instruction and explanation shown to people, run in the pipeline; accessible explanation templates | 2 · 3 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 17` | Quality management system | QMS-as-code; versioned policies; pipeline controls and change management | 1 · 5 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 17(1)(m)` | The QMS includes an accountability framework setting out the responsibilities of management and other staff for every aspect of the QMS | RACI as code compiled into registry owner fields and code-owner rules; committee decision records | 1 · 2 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 18` | Keep the technical documentation, the QMS documentation, notified-body changes and decisions and the EU declaration at the disposal of national authorities for 10 years after placing on the market | Retention-as-code for the technical file, QMS records, notified-body decisions and the EU declaration (10 years); write-once evidence store | 2 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 19` | Keep the automatically generated logs under the provider's control for a period appropriate to the intended purpose, at least six months unless other law provides otherwise | Log-retention policy as code (at least six months, set by intended purpose); tamper-evident log store | 4 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 20` | A provider with reason to consider a high-risk system non-conforming immediately brings it into conformity, withdraws, disables or recalls it and informs distributors and deployers; where the system presents a risk, it investigates and informs the market-surveillance authority | CAPA record; withdraw, disable or recall runbook; notification of distributors and deployers | 1 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 22` | A provider established outside the Union appoints, by written mandate, an authorised representative in the Union before making the system available; the representative keeps the declaration, documentation and certificate for 10 years | Written mandate; 10-year copies of the declaration, technical documentation and certificate; authority contact route | 5 | Non-EU provider + authorised representative | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 23` | Before placing a high-risk system on the market, the importer verifies the conformity assessment, the Annex IV documentation, the CE marking, the declaration and instructions and the authorised representative, and keeps copies for 10 years | Import verification record against each check; 10-year document copies | 2 · 5 | Importer | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 24` | Before making a high-risk system available, the distributor verifies the CE marking, the declaration and the instructions, and holds back, withdraws or recalls a system it considers non-conforming | Distribution check record; hold, withdraw or recall workflow | 2 · 5 | Distributor | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 25` | Responsibilities along the AI value chain: when a distributor, importer or deployer becomes a provider, and the information a provider must pass to actors downstream | Value-chain due-diligence gate; provider/deployer responsibility allocation; AIBOM and model/data cards collected from upstream providers | 2 · 5 | Provider + value-chain actors | 2027-12-02 (Annex III) [23] | National MSA |
| `Art. 26` | Deployer obligations for high-risk systems: use per the instructions for use (Art. 26(1)); the paragraph rows below break out oversight, input data, monitoring, logs and notices | Deployment registry; monitoring hooks; assigned oversight and logging retention | 2 · 4 | Deployer | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 26(2)` | Deployers assign human oversight to natural persons with the necessary competence, training and authority, and the necessary support | Oversight assignment in the registry; role-based training records with expiry; approver roster per checkpoint class with authority to pause or refuse | 1 · 4 | Deployer | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 26(4)` | To the extent the deployer controls the input data, it ensures the data are relevant and sufficiently representative for the intended purpose | Input-data checks against the population in the deployment record; drift monitors on inputs | 2 · 3 | Deployer | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 26(5)` | Deployers monitor operation per the instructions; on reason to consider a risk they inform the provider or distributor and the authority and suspend use; a serious incident goes to the provider first, and Art. 73 applies to the deployer if the provider cannot be reached | Monitoring plan with signal owners; tested suspension path (feature flag, traffic switch); provider incident contact in the registry; pre-filled risk and serious-incident notices | 2 · 4 · 5 | Deployer | 2027-12-02 (Annex III) [63][57] | National MSA |
| `Art. 26(6)` | Deployers keep the logs under their control for a period appropriate to the intended purpose, at least six months unless other law provides otherwise | Retention-as-code schedule; tamper-evident log store; legal hold while an incident is open | 4 · 5 | Deployer | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 26(7)` | Before putting a high-risk system into service at the workplace, deployers who are employers inform workers' representatives and the affected workers | Worker-information record dated before first use and linked to the registry entry; HR intake trigger for Annex III point 4 systems | 2 | Deployer (employer) | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 26(11)` | Deployers of Annex III systems that make or assist decisions about natural persons inform those persons that they are subject to the system | AI-use notice at the decision point; notice templates versioned as code; notice delivery log | 2 · 4 | Deployer | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 27` | Fundamental Rights Impact Assessment (FRIA) for deployers of Annex III systems | FRIA-as-code from a template; cross-reference to a GDPR `Art. 35` DPIA | 1 · 2 | Deployer | 2027-12-02 (Annex III) [7] | National MSA |
| `Art. 43` | Conformity assessment before placing on the market (internal control, or a notified body for Annex III point 1 biometrics) | Conformity-assessment workflow; internal-control or notified-body evidence pack; traceability to Annex IV documentation | 1 · 5 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
| `Art. 43(4)` | A system already assessed undergoes a new conformity assessment on substantial modification; changes pre-determined in the technical documentation of a system that continues to learn are not substantial modifications | Change-classification policy on merge; pre-determined change envelope as code; reassessment trigger in the registry | 1 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 47` | EU declaration of conformity drawn up on completing the assessment | Auto-generated EU declaration of conformity from the evidence; CE-marking record | 2 · 5 | Provider | 2027-12-02 (Annex III) [1][22] | National MSA |
| `Art. 48` | Affix the CE marking visibly, legibly and indelibly (a digital marking for digitally provided systems), followed by the notified body's number where applicable | CE-marking record (physical or digital) generated with the EU declaration; notified-body number where applicable | 2 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 49` / `Art. 71` | Registration of high-risk systems in the EU database | Agent/model registry with an API that feeds registration; owner and status per entry | 2 | Provider; public-authority deployer | 2027-12-02 (Annex III) [1] | National MSA; Commission (database) |
| `Art. 50` | Transparency for certain AI systems: chatbot disclosure; marking and labelling of synthetic content | Content labelling and machine-readable marking (e.g. C2PA-style); chatbot disclosure banner | 4 · 2 | Provider + deployer | 2026-08-02; marking grace for existing systems to 2026-12-02 [2][5] | National MSA |
| `Art. 52` | Notify the Commission without delay, and within two weeks, once a GPAI model meets the Art. 51(1)(a) condition or it becomes known that it will | Compute ledger per model lineage with a planned-compute threshold alert; notification record filed within two weeks | 2 · 5 | GPAI provider | Obligations from 2025-08-02; enforcement from 2026-08-02 [63][3] | AI Office |
| `Art. 53` | GPAI provider obligations, incl. a public summary of training content on an AI Office template | Model cards; training-content summary; AIBOM and dataset provenance | 2 | GPAI provider | Obligations from 2025-08-02; enforcement from 2026-08-02 [3] | AI Office |
| `Art. 53(1)(c)` | GPAI providers put in place a policy to comply with Union copyright law, incl. identifying and complying with reservations of rights under Art. 4(3) of Directive (EU) 2019/790 | Versioned copyright policy; crawler decision logs; training-data rights ledger with the reservation-check result | 1 · 2 · 5 | GPAI provider | Obligations from 2025-08-02; enforcement from 2026-08-02 [63][73] | AI Office |
| `Art. 54` | A GPAI provider established outside the Union appoints, by written mandate, an authorised representative before placing the model on the Union market; the representative keeps the Annex XI documentation for 10 years | Written mandate; Annex XI documentation copy kept 10 years; AI Office contact route | 5 | Non-EU GPAI provider + authorised representative | Obligations from 2025-08-02; enforcement from 2026-08-02 [63] | AI Office |
| `Art. 55` | GPAI models with systemic risk: model evaluation incl. adversarial testing; Union-level risk assessment; serious-incident reporting; cybersecurity of the model | Eval and red-team suite; incident pipeline on the Commission serious-incident reporting template; weight-security controls; threat model | 3 · 4 · 5 | GPAI provider (systemic risk) | Obligations from 2025-08-02; enforcement from 2026-08-02 [3][26] | AI Office |
| `Art. 60` | Testing of high-risk (Annex III) AI systems in real-world conditions outside AI regulatory sandboxes | Real-world testing plan; `Art. 61` informed-consent records; test monitoring, logging and incident hooks | 3 · 4 | Provider / prospective provider | 2026-08-02 [22] | National MSA |
| `Art. 72` | Post-market monitoring for high-risk systems | Continuous assurance telemetry; monitoring plan; drift and performance signals | 5 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 73` | Serious-incident reporting for high-risk systems (deadlines in the reporting-clock table below) | Incident detection and triage pipeline; reporting-clock automation; evidence capture | 5 · 4 | Provider | 2027-12-02 (Annex III) [1] | National MSA |
| `Art. 73(6)` | After reporting a serious incident the provider investigates without delay (risk assessment, corrective action) and does not alter the system in a way that may affect the evaluation of causes before informing the authorities | Evidence-preservation step: model, prompt, policy and retrieval-index snapshots; sealed traces; fix shipped on a new version | 4 · 5 | Provider | 2027-12-02 (Annex III) [63] | National MSA |
| `Art. 75(1a)` | Providers of high-risk systems under the AI Office's exclusive competence (systems built on their own GPAI model, and systems in designated very large online platforms or search engines) report serious incidents to the AI Office, with Art. 73(2) to (9) applying mutatis mutandis | Incident pipeline routing by a registry competence flag (national MSA or AI Office) | 2 · 5 | Provider (systems under AI Office competence) | 2027-12-02 (Annex III); new by the Omnibus (reading, verify) [22] | AI Office |
| `Art. 86` | A person subject to a deployer's decision based on an Annex III system (except point 2) with legal or similarly significant adverse effects may obtain clear and meaningful explanations of the system's role and the main elements of the decision, where Union law does not already give the right | Explanation record per decision (system and model version, reason codes, determinative or advisory role, human decider); request-handling workflow and response log | 2 · 4 · 5 | Deployer | 2027-12-02 (Annex III); Chapter IX applies from 2026-08-02 (reading, verify) [63][22] | National MSA |
| `Art. 87` | Directive (EU) 2019/1937 applies to reports of AI Act infringements and to the protection of the people who make them | Internal reporting channel run as a case system with the directive's clocks encoded; sealed reporter identity; retaliation monitoring; routing to the incident pipeline | 1 · 5 | Legal entities with internal reporting channels under Directive (EU) 2019/1937 | 2026-08-02 [63][64] | Authorities designated under Directive (EU) 2019/1937 |

Several rows are built out in full elsewhere in the book:

- `Art. 4`: the literacy programme as code is [AI literacy as code](/bok/governance-program#ai-literacy-as-code)
  in chapter 12, and the role-based training records have a
  [literacy curriculum template](/resources/templates#kit-literacy-curriculum).
- `Art. 4a` and `Art. 10`: the lawful basis for
  [special-category data for bias detection](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)
  is in chapter 19; the data needed to test for bias, and
  [where bias enters the lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle),
  are in chapter 16
  ([protected characteristics, proxies and the data you need to test](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test)).
- `Art. 6`: [the Article 6(3) filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
  are walked through in chapter 18.
- `Art. 9`: the risk register as code is
  [the risk register as an evidence record](/bok/risk-management#the-risk-register-as-an-evidence-record)
  in chapter 13; the same artefact answers the ISO/IEC 23894 row below.
- `Art. 11`, `Art. 43` and `Art. 47`: [Annex IV, element by element](/bok/governing-development#annex-iv-element-by-element)
  and [conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order) are in chapter 14.
- `Art. 13`: instructions for use as code have a
  [JSON Schema and filled example](/resources/templates#schema-instructions-for-use); what they must
  say to deployers and affected people is in
  [the EU AI Act, Articles 13 and 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (chapter 16).
- `Art. 25`: [when a value-chain actor becomes a provider](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)
  is set out in chapter 18.
- `Art. 26`: the [deployer duties in operation](/bok/governing-deployment#operating-the-system) are in
  chapter 15.
- `Art. 27`: the FRIA's cross-reference to a GDPR `Art. 35` DPIA is developed in
  [the DPIA for AI systems](/bok/privacy-and-ai#the-dpia-for-ai-systems) (chapter 19).
- `Art. 72`: the monitoring plan has a
  [post-market monitoring plan schema](/resources/templates#schema-post-market-monitoring-plan).
- `Art. 3(1)`: the definitional decision record is built field by field in
  [from definition element to registry field](/bok/ai-defined#from-definition-element-to-registry-field)
  (chapter 11).
- `Art. 15(4)`: feedback loops are monitored in
  [monitoring fairness in production](/bok/fairness-and-explainability#monitoring-fairness-in-production)
  (chapter 16), and for agents in [memory and context governance](/bok/governing-agents#memory-and-context-governance)
  (chapter 23); `Art. 16(l)` has [accessible explanations](/bok/fairness-and-explainability#accessible-explanations).
- `Art. 17(1)(m)`: the accountability framework is [a lifecycle RACI](/bok/governance-program#a-lifecycle-raci)
  (chapter 12); `Art. 43(4)` is [substantial modification](/bok/governing-development#substantial-modification)
  in chapter 14; `Arts. 22` to `24` are [the EU operator roles](/bok/eu-ai-act#the-eu-operator-roles) in
  chapter 18.
- `Art. 26(2)` to `26(11)`: the deployer's paragraphs run through chapter 15, from
  [checking the data and the people](/bok/governing-deployment#check-the-data-and-the-people) to
  [records retention](/bok/governing-deployment#records-retention) and
  [external communications](/bok/governing-deployment#external-communications); chapter 17 covers
  [informing the provider and suspending use](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)
  (`Art. 26(5)`) and [freezing before fixing](/bok/incidents#freeze-before-you-fix) (`Art. 73(6)`), and
  chapter 23 [approval design for agent checkpoints](/bok/governing-agents#human-checkpoints-and-approval-design).
- `Art. 52`: the compute ledger and the two-week notification are in
  [systemic risk: threshold, notification, designation](/bok/eu-ai-act#systemic-risk-threshold-notification-designation)
  (chapter 18); `Art. 53(1)(c)` is [copyright and training data](/bok/existing-law#copyright-and-training-data)
  (chapter 20).
- `Art. 86`: the explanation record is specified in
  [the EU AI Act, Articles 13 and 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (chapter 16) and [explanation and notice to affected people](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
  (chapter 18); `Art. 87` is met by [a channel for raising concerns](/bok/governance-program#a-channel-for-raising-concerns)
  (chapter 12).

The Omnibus also changed rows the table compresses to one line [22]. For `Art. 6`, a **safety
component** must now have the purpose of preventing or mitigating risks to health and safety, or be
one whose failure endangers them (`Art. 3(14)`, `Art. 6(1a)` to `6(1c)`); that narrowing applies to
the Annex I route from 2 August 2028, and machinery moved from Section A to Section B of Annex I. The
Annex VIII, Section B registration record for systems that rely on the `Art. 6(3)` filter lost the
summary of grounds and the list of Member States. For `Art. 25`, the initial provider's duty to
cooperate now names documentation sufficient to assess compliance, known limitations and failure
modes, and targeted technical access for testing (`Art. 25(2)`); the information and access must be
fixed in a written agreement (`Art. 25(4)`), and breaches of both paragraphs are fined under
`Art. 99(4)(da)`.

The Article 73 clock runs by incident class. The provider notifies the market-surveillance authority
of the Member State where the incident occurred immediately once it establishes a causal link
between the system and the incident, or the reasonable likelihood of one, and in any event within an
outer deadline that runs from the moment the provider or, where applicable, the deployer **becomes
aware** of the incident, not from the causal finding [57]. A deployer that identifies a serious
incident informs the provider first, then the importer or distributor and the market-surveillance
authority; if it cannot reach the provider, Article 73 applies to the deployer mutatis mutandis
(`Art. 26(5)`) [57]:

| Incident class | Reporting deadline | Who reports | Artefact |
|---|---|---|---|
| Serious incident (general) | Immediately on a causal link or its reasonable likelihood; no later than 15 days after awareness | Provider → national MSA; the deployer if it cannot reach the provider (`Art. 26(5)`) | Incident triage pipeline; reporting-clock automation |
| Widespread infringement, or serious and irreversible disruption of critical infrastructure | Immediately; no later than 2 days after awareness | Provider → national MSA; the deployer if it cannot reach the provider (`Art. 26(5)`) | Same pipeline, escalated-severity path |
| Death of a person | Immediately on establishing or suspecting a causal link; no later than 10 days after awareness | Provider → national MSA; the deployer if it cannot reach the provider (`Art. 26(5)`) | Same pipeline, priority path |

The Omnibus left these deadlines unchanged. For high-risk systems under the AI Office's exclusive
competence, its new `Art. 75(1a)` sends the report to the AI Office instead, with `Art. 73(2)` to
`(9)` applying mutatis mutandis, and the AI Office passes it on to the market-surveillance authority
of the Member State where the provider is established [22]. An incident rarely starts only one
clock: chapter 17 lays the Article 73 clock beside the GDPR, NIS2, DORA, CRA and GPAI clocks in
[the overlapping clocks](/bok/incidents#the-overlapping-clocks), and the
[incident record schema](/resources/templates#schema-incident-record) holds the timestamps each one
needs.

Two cross-cutting provisions frame the penalties. Under **`Art. 101`**, the Commission may fine GPAI
providers up to 3% of worldwide annual turnover or EUR 15 million, whichever is higher [3][4]. Under
the Omnibus's new **`Art. 75a`–`75d`**, the AI Office gains investigation powers, binding
commitments and non-compliance decisions over the AI systems for which the amended `Art. 75(1)` makes
it exclusively competent (systems built on a GPAI model by the same provider or undertaking, and
systems in designated very large online platforms or search engines), not over GPAI models in
general. Periodic penalty payments reach up to 5% of average daily income or worldwide annual
turnover per day for a continuing breach (`Art. 75c(5)`). The Omnibus entered into force on 27 July
2026, and Chapter IX, where these articles sit, applies from 2 August 2026 under `Art. 113` [8][22].
High-risk administrative fines run under `Art. 99` (ceilings of 7%, 3% and 1% of turnover depending
on the breach), imposed by national authorities [4]. Chapter 18 sets out
[who supervises what](/bok/eu-ai-act#who-supervises-what) and
[the AI Office's direct powers](/bok/eu-ai-act#the-ai-offices-direct-powers-articles-75-and-75a-to-75d).

## GPAI Code of Practice

The GPAI Code of Practice, published 10 July 2025, is the voluntary instrument providers use to
demonstrate compliance with the GPAI obligations until harmonised standards exist. It has three
chapters [9][10].

| Chapter | What it asks for | Engineering artefact | Layer |
|---|---|---|---|
| Safety and Security (systemic-risk models only) | A Safety and Security Framework; model evaluations incl. adversarial testing; systemic-risk assessment and mitigation; serious-incident reporting; model and infrastructure security | Eval and red-team suite; adversarial testing harness; incident pipeline; weight-security controls | 3 · 4 · 5 |
| Transparency | Up-to-date model documentation for the AI Office and downstream deployers | Model cards; structured model documentation; AIBOM | 2 |
| Copyright | A policy to comply with Union copyright law, incl. respecting reservations of rights | Training-data provenance and licence records; policy-as-code for source filtering | 1 · 2 |
| Safety and Security, Commitment 9 (serious-incident reporting) | Report serious incidents to the AI Office within 2, 5, 10 or 15 days by incident class, with intermediate reports at least every four weeks while unresolved and a final report within 60 days of resolution; keep the records at least five years [65] | Incident pipeline on the Commission template fields; per-class clocks; five-year retention policy; downstream reporting channel | 4 · 5 |
| Safety and Security, Appendix 1.3 and 1.4 (autonomy, tool use, loss of control) | Sources of systemic risk to consider include the capability to operate autonomously, propensities such as colluding with other AI systems, and affordances such as access to tools and physical systems and the level of human oversight; loss of control is a specified systemic risk [65] | Provider evaluations of autonomy and tool use, requested at the vendor due-diligence gate and filed with the agent registry entry | 3 · 5 |

The Code is voluntary; signing it is one route to demonstrating compliance, not a legal presumption of
conformity [9]. Signatory status is dynamic and counted per the Commission's official list [10].

For serious-incident reporting specifically, the Commission published a reporting template on 4
November 2025 for serious incidents involving GPAI models with systemic risk. It aligns to the
Article 55 reporting duty and to Commitment 9 of the Code's Safety and Security chapter, and is the
concrete artefact the incident pipeline emits, the same template named in the Article 55 row above
[26]. One internal [incident record](/resources/templates#schema-incident-record) can feed this
template and every other regime's report. Commitment 9 of the Safety and Security chapter sets the
clocks (2, 5, 10 or 15 days by incident class, intermediate reports at least every four weeks, a final
report within 60 days of resolution) and a retention of at least five years, and its Appendix 1 lists
the capability to operate autonomously and access to tools among the sources of systemic risk and
loss of control among the specified risks, which is why the two rows above matter to anyone who
deploys agents on a GPAI model [65]. Chapter 17 sets Commitment 9 beside the
other regimes in [the overlapping clocks](/bok/incidents#the-overlapping-clocks), and chapter 23 reads
Appendix 1 for agents in [EU AI Act hooks for agents](/bok/governing-agents#eu-ai-act-hooks-for-agents).

## Data protection and other EU law

An AI system placed on the EU market meets more law than the AI Act on day one. The rows below index
the obligations the v0.5.0 chapters teach: the GDPR, the cyber-security and incident-reporting
regimes, and the liability, copyright, consumer and sector law that already reaches AI. They answer to
their own supervisors (data protection authorities, CSIRTs and financial supervisors, courts and
consumer authorities), not to the AI Act's market-surveillance authorities, and several apply through
national transposition, so the "Applies" column says so. Mappings are illustrative, not a claim of
conformity.

### The GDPR

The GDPR has applied since 25 May 2018 [66]. Chapter 19 walks every row below, with the EDPB's
anonymity test for trained models [67], in [privacy and data protection law applied to
AI](/bok/privacy-and-ai#obligation-to-artefact-map); chapter 16 builds the explanation and contest
records of `Arts. 15(1)(h)` and `22` in
[data protection: the GDPR and the UK regime](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).

| Article | What it asks for | Engineering artefact | Layer | Who is bound | Applies |
|---|---|---|---|---|---|
| `Art. 5(1)(b) and 6(4)` | Personal data are collected for specified, explicit and legitimate purposes and not further processed incompatibly; Art. 6(4) sets the compatibility test for reuse, such as training on data collected for another purpose [66] | Purpose tags on datasets; purpose-match policy in training and indexing pipelines; compatibility assessment record | 1 · 2 | Controller | 2018-05-25 |
| `Art. 6` | A lawful basis for each processing operation, assessed separately for training, fine-tuning, retrieval and inference [66][67] | Basis registry per dataset and stage; versioned legitimate-interest assessment | 2 | Controller | 2018-05-25 |
| `Art. 7` | Where consent is the basis, the controller can demonstrate it, and withdrawing consent is as easy as giving it [66] | Consent-purpose log joined to datasets and model versions; withdrawal propagated to the pipelines | 2 · 5 | Controller | 2018-05-25 |
| `Art. 9` | Processing special-category data, incl. biometric data for unique identification, is prohibited unless an Art. 9(2) condition applies, which reaches sensitive data a model infers [66] | Proxy test in CI; inference policy with a runtime output classifier; Art. 9(2) condition record | 1 · 3 · 4 | Controller | 2018-05-25 |
| `Arts. 13–14` | Inform data subjects of purposes, bases, recipients and retention and, for automated decision-making, give meaningful information about the logic involved (Arts. 13(2)(f), 14(2)(g)) [66] | Notice generated from the registry entry; model card; automated-decision notice per system | 2 | Controller | 2018-05-25 |
| `Art. 15(1)(h)` | On request, confirm automated decision-making and give meaningful information about the logic involved and its significance and envisaged consequences [66] | Per-request explanation generated from the decision record; system-level automated-decision notice | 4 · 5 | Controller | 2018-05-25 |
| `Arts. 15–17 and 21` | Access, rectification, erasure and objection requests reach every place the data lives: corpus, snapshots, retrieval index, logs and, where it holds personal data, the model [66] | Request workflow across corpus, snapshots, retrieval index, logs and weights; fulfilment record | 4 · 5 | Controller | 2018-05-25 |
| `Art. 22` | A right not to be subject to a decision based solely on automated processing with legal or similarly significant effects, except on contract, law or explicit consent; then human intervention, the right to express a view and to contest (Art. 22(3)) [66] | Decision record with reason codes; contest channel and human review log; appeal outcomes by group | 4 · 5 | Controller | 2018-05-25 |
| `Art. 5(1)(c) and 25` | Adequate, relevant and limited data, with technical and organisational measures built in at design and set by default [66] | Feature justification record; PII and special-category filters; retention as code | 1 · 3 | Controller | 2018-05-25 |
| `Art. 5(2)` | A controller that claims a trained model holds no personal data must be able to demonstrate it; the EDPB sets an anonymity test and the evidence it expects [66][67] | Anonymity evidence pack; membership-inference and extraction evals in the eval gate | 3 · 5 | Controller (model developer) | 2018-05-25 |
| `Art. 28` | Use only processors with sufficient guarantees, under a contract that fixes instructions, sub-processors, security, assistance and deletion [66] | AI vendor clause checklist in the due-diligence gate (no training, retention, region, sub-processors, change notice) | 2 · 5 | Controller; processor | 2018-05-25 |
| `Art. 30` | Controllers and processors keep a record of the processing activities under their responsibility [66] | Records generated per processing moment from the registry and data cards | 2 · 5 | Controller; processor | 2018-05-25 |
| `Arts. 33–34` | Notify the supervisory authority without undue delay and, where feasible, within 72 hours of awareness; tell data subjects without undue delay when the breach is likely to result in a high risk [66] | Personal-data-breach branch of the incident pipeline with its own 72-hour timer; data-subject notice template | 4 · 5 | Controller (the processor notifies the controller) | 2018-05-25 |
| `Arts. 35–36` | Assess the impact before processing likely to result in a high risk, and consult the supervisory authority where the residual risk stays high [66] | AI DPIA template with AI-specific fields, cross-referenced by the FRIA; recorded decision when no DPIA is needed | 1 · 2 | Controller | 2018-05-25 |
| `Arts. 44–49` | Transfers outside the EEA only on an adequacy decision, appropriate safeguards (such as standard contractual clauses or binding corporate rules) or a narrow derogation; sending personal data to a model hosted outside the EEA can be a transfer [66] | Transfer register; residency and routing policy as code; transfer impact assessment | 1 · 4 · 5 | Controller; processor | 2018-05-25 |

### Cyber-security and incident-reporting law

NIS2 binds essential and important entities through national law, which Member States apply from 18
October 2024 [68]; DORA has applied to financial entities since 17 January 2025 [69], with the incident
time limits fixed in Delegated Regulation (EU) 2025/301 [70]; and the Cyber Resilience Act's reporting
duty applies from 11 September 2026, ahead of the rest of that Regulation on 11 December 2027 [71]. An
AI incident can start several of these clocks at once: chapter 17 lays them side by side in
[the overlapping clocks](/bok/incidents#the-overlapping-clocks), and chapter 15 covers
[continuity when the provider fails](/bok/governing-deployment#when-the-provider-fails-continuity).

| Article | What it asks for | Engineering artefact | Layer | Who is bound | Applies |
|---|---|---|---|---|---|
| NIS2 `Art. 21(2)(c)–(d)` | Risk-management measures include business continuity (backup, disaster recovery, crisis management) and supply-chain security with direct suppliers and service providers, which covers AI and model services [68] | Continuity plan for AI dependencies with tested fallbacks; supplier assessments for model and platform providers | 4 · 5 | Essential and important entities | 2024-10-18, through national law |
| NIS2 `Art. 23` | An early warning within 24 hours of becoming aware of a significant incident, an incident notification within 72 hours and a final report within one month of the notification, incl. the root cause [68] | Per-regime clock on the incident record; significance determination with an owner; cause coding reused in the final report | 5 | Essential and important entities | 2024-10-18, through national law |
| DORA `Art. 19` | Report major ICT-related incidents: initial notification within 4 hours of classification as major and no later than 24 hours from awareness (within 4 hours of a classification made after those 24 hours), intermediate report within 72 hours of the initial notification, final report within one month of the latest intermediate report [69][70] | Classification record with a timestamp; per-regime clock; consistent cause coding for recurring-incident aggregation | 5 | Financial entities | 2025-01-17 |
| DORA `Art. 28(3)`, `28(8)` | Keep a register of information on all contractual arrangements for ICT services from third-party providers, and exit strategies for ICT services that support critical or important functions [69] | Register entries for AI and model services; exit plan and exit-drill record | 2 · 5 | Financial entities | 2025-01-17 |
| CRA `Art. 14` | Notify actively exploited vulnerabilities and severe incidents through the single reporting platform: early warning within 24 hours, notification within 72 hours, final report 14 days after a fix is available (vulnerability) or one month after the notification (incident) [71] | Vulnerability and incident clocks on the incident record; submission through the single reporting platform | 4 · 5 | Manufacturers of products with digital elements | 2026-09-11; the rest from 2027-12-11 |

### Liability, copyright, consumer and sector law

The revised Product Liability Directive treats software, AI systems included, as a product and applies
to products placed on the market after 9 December 2026 [72]. The text-and-data-mining exception of the
DSM Directive yields to a rightholder's reservation [73], which is the rule `Art. 53(1)(c)` of the AI Act
points to. The Digital Services Act, the Unfair Commercial Practices Directive, the Platform Work
Directive and the revised Consumer Credit Directive add duties for platforms, traders, digital labour
platforms and creditors [74][75][76][77]. Chapter 20 teaches them: [copyright and training
data](/bok/existing-law#copyright-and-training-data), [the EU Product Liability
Directive](/bok/existing-law#the-eu-product-liability-directive), [duty to warn after
updates](/bok/existing-law#duty-to-warn-after-updates), [the EU: UCPD, DSA and the AI
Act](/bok/existing-law#the-eu-ucpd-dsa-and-the-ai-act), [employment](/bok/existing-law#employment) and
[credit and lending](/bok/existing-law#credit-and-lending).

| Article | What it asks for | Engineering artefact | Layer | Who is bound | Applies |
|---|---|---|---|---|---|
| PLD `Art. 4(1)` | Software is a product, so the manufacturer of an AI system is strictly liable for damage caused by a defect in a product placed on the market or put into service after 2026-12-09 [72] | Defect-liability review at design; contractual recourse; residual risk in the register | 1 · 5 | Manufacturers and other economic operators | Products placed on the market after 2026-12-09 |
| PLD `Arts. 9–10` | A court can order the defendant to disclose relevant evidence at its disposal; failing to disclose it is one of the conditions under which the product is presumed defective [72] | Defence file per release: AIBOM with hashes, eval history, failure-mode analysis, signed logs, instructions for use, kept for the liability period | 2 · 3 · 5 | Manufacturers, incl. providers of AI systems and substantial modifiers | Products placed on the market after 2026-12-09 |
| PLD `Art. 11(2)` | The manufacturer cannot rely on the defect arising after placing on the market where it is due to software, incl. its updates or upgrades, or to missing safety updates, that remain within its control [72] | Change log; regression evals per release; patch decision records; versioned warnings | 3 · 4 · 5 | Manufacturers | Products placed on the market after 2026-12-09 |
| DSM Directive `Art. 4(3)` | The general text-and-data-mining exception applies only where rightholders have not expressly reserved use in an appropriate manner, such as machine-readable means for content made publicly available online [73] | Crawler policy-as-code honouring reservations; training-data rights ledger with the reservation-check result, method and date | 1 · 2 | Anyone mining works, incl. model developers | Transposition deadline 2021-06-07 |
| DSA `Art. 25` | Online platforms do not design, organise or operate their interfaces in a way that deceives or manipulates users or impairs their free and informed decisions [74] | Interface review record; red-team eval for manipulative outputs | 3 · 5 | Providers of online platforms | 2024-02-17 |
| DSA `Art. 27` | Online platforms set out in their terms the main parameters of their recommender systems and any options users have to modify them [74] | Recommender parameter card generated from the ranking configuration; log of the options offered to users | 2 · 4 | Providers of online platforms | 2024-02-17 |
| UCPD `Arts. 5–7`, Annex I | No commercial practice contrary to professional diligence, or misleading, that distorts the average consumer's decisions, incl. AI-generated claims and chatbot answers; stating that reviews are genuine without reasonable checks, and false reviews, are blacklisted (Annex I points 23b and 23c) [75] | Claims register linked to eval results; review-provenance checks; chatbot answer evals on product claims | 1 · 3 · 4 | Traders dealing with consumers | 2007-12-12; review points since Directive (EU) 2019/2161 |
| Platform Work Directive `Arts. 7`, `9–11` | Limits on the personal data platforms may process through automated systems, transparency about those systems, human oversight with an impact evaluation at least every two years, and explanation and human review of decisions [76] | Registry of automated systems with their main parameters; data-category deny list; two-yearly impact evaluation; explanation and human review log | 1 · 2 · 3 · 5 | Digital labour platforms | Transposition by 2026-12-02 |
| CCD2 `Art. 18(8)` | Where the creditworthiness assessment involves automated processing, the consumer may request human intervention, a clear explanation of the assessment and its logic, and a review of the decision [77] | Explanation artefact per model version; review path and log | 3 · 4 · 5 | Creditors | 2026-11-20 |

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
Article 27 (FRIA) and Annex A.5 [13]. The operating model and RACI of the `A.3` row are built in
[a lifecycle RACI](/bok/governance-program#a-lifecycle-raci) (chapter 12), and chapter 22 places
these standards in [the ISO/IEC family](/bok/principles-and-standards#the-isoiec-family) as a whole.

Two further ISO/IEC standards sit alongside the AIMS. **ISO/IEC 42006:2025** sets the requirements
for the bodies that audit and certify AI management systems: building on ISO/IEC 17021-1, it is the
answer to "who may credibly certify you to 42001", since it fixes the competence and consistency a
certification body must show. **ISO/IEC 23894:2023** gives guidance on AI risk management, adapting
ISO 31000 to AI; it is the risk-process companion to Article 9 and to the NIST AI RMF [27][28]. The
table also carries ISO/IEC 42005:2025, the impact-assessment guidance [13], and **ISO/IEC 22989:2022**,
the concepts and terminology standard whose AI stakeholder roles and life-cycle vocabulary a registry
can reuse field for field [78].

| Standard | What it is | Engineering artefact | Layer |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Requirements for bodies auditing and certifying AI management systems (who may credibly certify you to 42001) | Accredited certification scope; auditor-competence evidence; certificate register | 5 |
| `ISO/IEC 23894:2023` | Guidance on AI risk management (companion to ISO 31000) | Risk register as code; AI risk taxonomy; linkage to EU AI Act `Art. 9` and the NIST AI RMF | 1 · 3 |
| `ISO/IEC 42005:2025` | Guidance for assessing the impacts of an AI system on individuals, groups and society across its life cycle (companion to Art. 27 and Annex A.5) [13] | Impact assessment as code from a template; FRIA and DPIA cross-references; re-assessment triggers | 1 · 3 |
| `ISO/IEC 22989:2022` | A shared vocabulary for AI concepts, the AI system life cycle and AI stakeholder roles [78] | Registry field names and role vocabulary aligned to the standard's terms; glossary cross-references | 2 |

**Maps to:** these controls are realised through layers 1, 2, 3 and 5 of the stack; the
impact-assessment control (A.5 / ISO 42005) supports EU AI Act `Art. 27`. Mappings are illustrative,
not a claim of conformity.

## NIST AI RMF

The NIST AI Risk Management Framework 1.0 (January 2023; there is no 2.0) organises risk work into
four functions. It is voluntary and US-origin, and it maps cleanly onto the five-layer stack [14].
As of 2026-09-24, NIST's framework page states that AI RMF 1.0 "is being revised as part of the White
House AI Action Plan"; no revised text had been published, so 1.0 remains the version to cite and to
pin in control metadata [59]. Chapter 22 covers
[the NIST AI RMF in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth): the seven
trustworthy characteristics, the 19 categories of the Core, the Playbook and the profiles.

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
for identifying, measuring and mitigating misuse risk across the AI lifecycle [31]. The older
**Generative AI Profile**, NIST AI 600-1 (26 July 2024), is the RMF's companion for generative AI: 12
risks and suggested actions coded to the four functions, and the table carries it too [79].

| NIST item | What it is | Engineering artefact | Layer |
|---|---|---|---|
| AI Agent Standards Initiative (2026) | CAISI initiative on interoperable, secure AI agents: identity, authentication, agent security | Agent registry; non-human-identity controls; agent authentication and authorisation; adversarial agent evals | 3 · 4 |
| IR 8596 Cyber AI Profile (draft) | CSF 2.0 profile for AI (Secure / Defend / Thwart) | AI-system security controls; runtime observability; threat detection mapped to CSF 2.0 | 3 · 4 |
| AI 800-1 (draft) | Managing Misuse Risk for Dual-Use Foundation Models (voluntary guidance) | Misuse red-team suite; capability and dangerous-capability evals; safety framework | 3 |
| AI 600-1 Generative AI Profile (2024) | Suggested actions for 12 risks that generative AI creates or exacerbates, coded to the Govern, Map, Measure and Manage functions [79] | Generative-AI eval suites named after the profile's action ids (e.g. confabulation, information integrity); a risk-register entry per profile risk | 1 · 3 |

## CSA AICM and STAR for AI

The Cloud Security Alliance's AI Controls Matrix (AICM) v1.1, published 22 June 2026, defines 247
control objectives across 18 domains, and the STAR for AI programme provides the assurance scheme
around it, in three levels: a Level 1 self-assessment, a Level 1 "Valid-AI-ted" automated validation,
and a Level 2 that adds ISO/IEC 42001 certification [15][83].

| CSA artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| AICM v1.1 | 247 control objectives across 18 domains, spanning governance, data, model and runtime | Control catalogue mapped to policy-as-code and evals; crosswalk to ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR for AI | Assurance and certification programme on the AICM: Level 1 self-assessment, Level 1 Valid-AI-ted (automated validation) and Level 2 (ISO/IEC 42001 certification plus the validated assessment) [83] | Machine-readable evidence submission; continuous assurance telemetry | 5 |
| Agent controls (AICM v1.1, ATF, AARM) | Agent-specific AICM controls (e.g. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), with the Agentic Trust Framework v1 (earned autonomy tiers) and the AARM runtime-interception specification [80][81][82] | Agent-specific control definitions; policy-as-code for agent scope and tools; runtime guardrails | 1 · 4 |
| Catastrophic Risk Annex | Enhanced AICM controls for high-autonomy systems with catastrophic-risk potential | Enhanced controls for high-autonomy systems; kill switch and oversight controls; pilot-audit evidence | 4 · 5 |

Two lines of work push the AICM toward agents and frontier risk. For agents, the controls sit inside
the matrix itself (for example IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries)
[80], and the CSA's agentic control-plane programme adds two published specifications, the
**Agentic Trust Framework** (zero trust for agents with earned autonomy tiers) and **AARM**
(interception of agent actions before they execute) [32][81][82]. Earlier editions of this map listed
a proposed "Agentic Control Supplement" to the AICM; it could not be matched to a CSA primary
document as of 2026-09-24, so the row now names what is published (verify). For frontier risk, the
**Catastrophic Risk Annex** adds a set of enhanced controls for high-autonomy systems, meant to be
proven through pilot audits rather than asserted [33].

## OWASP GenAI Security Project

OWASP's GenAI Security Project supplies the threat vocabulary the controls are built against, plus two
formats (the Agent Control Standard and an AIBOM) that the stack consumes directly [16][17][54].
Chapter 23 maps each agentic entry to its controls in
[threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls).

| OWASP artefact | What it is | Engineering artefact | Layer |
|---|---|---|---|
| Top 10 for Agentic Applications 2026 | Agent threat catalogue (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Agent threat model; adversarial evals; runtime guardrails; kill switch | 3 · 4 |
| Top 10 for LLM Applications 2026 | LLM threat catalogue (incl. Excessive Agency at #3) | Prompt-injection and output-handling controls; eval gate | 3 · 4 |
| Agent Control Standard (ACS) | A standard for expressing agent controls | Machine-readable control definitions for agents | 1 · 4 |
| AIBOM | AI bill-of-materials format and generator | AIBOM at build (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## US federal and state laws

The United States has no horizontal federal AI statute; the binding AI-specific rules are state laws,
and they differ in scope. Two bind only frontier developers, with the heaviest duties on the large
ones; the rest reach ordinary developers, deployers and operators, and federal law that predates AI
(fair lending, credit reporting, employment discrimination, the FTC Act) already reaches AI
decisions. The tables below carry them all as rows.
Chapter 21 teaches them:
[the federal layer](/bok/ai-laws-worldwide#united-states-the-federal-layer) (executive orders, the OMB
memoranda that bind agencies and their vendors, and the federal push against state AI laws) and the
[state laws that bind private organisations](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
each with its scope, dates, duties and enforcement.

### Frontier-developer laws

Two US state laws bind only frontier developers, with the heaviest duties on the large ones, not
general deployers: a narrower scope than the EU AI Act's risk-tiering. They ask large frontier
developers to publish safety frameworks and every frontier developer to report critical safety
incidents to the state [18][19][25]. California's whistleblower protection is met in practice by
[a channel for raising concerns](/bok/governance-program#a-channel-for-raising-concerns) (chapter 12).

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| California SB 53 (TFAIA), in force 2026-01-01 | Frontier developers (models trained above ~10^26 FLOP); the framework duty binds large frontier developers (developer revenue over USD 500M) | Publish a frontier AI framework; report critical safety incidents to the Office of Emergency Services within 15 days; whistleblower protection; up to USD 1M per violation, AG-enforced [56] | Published safety framework; incident pipeline reporting to the state; transparency artefacts | 5 · 4 |
| California SB 53 whistleblower protections (Labor Code 1107–1107.2), in force 2026-01-01 | Frontier developers; the anonymous process binds large frontier developers | No rule, policy or contract that prevents covered employees from disclosing catastrophic-risk concerns, and no retaliation; notice of rights; large frontier developers run an anonymous internal process with monthly updates to the reporter, shared with officers and directors at least quarterly [56] | Anonymous internal reporting channel with status updates; notice acknowledgment records; quarterly summary to officers and directors | 1 · 5 |
| New York RAISE Act (S6953B), signed 2025-12-19 | Frontier developers (models trained above 10^26 operations) report incidents within 72 hours; the framework duty binds large frontier developers (annual revenue over USD 500M); thresholds of the chapter amendment signed 2026-03-27 | Publish a frontier AI safety and security framework; disclose safety incidents within 72 hours. A chapter amendment signed 2026-03-27 sets the effective date at 2027-01-01 and creates an oversight office within the New York Department of Financial Services (DFS) [19][24][25] | Published frontier AI safety framework; 72-hour incident and disclosure pipeline reporting to the DFS oversight office | 5 · 4 |

### Other state AI laws

These state laws reach beyond frontier developers to ordinary developers, deployers and operators:
Texas and Colorado; California's training-data, provenance and companion-chatbot laws; New York's
companion rules; Illinois; New York City's Local Law 144; and Utah [55][84][85][86][88][89][90][91].
Chapter 21 sets each one out with its enforcement in its
[table of state laws](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
and compares the hiring rules in
[one hiring tool, four regimes](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes).

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), in force 2026-01-01 | Developers and deployers doing business in Texas | Intent-based prohibitions on developing or deploying AI (behaviour manipulation, unlawful discrimination); social scoring banned for governmental entities; AI-use disclosure by government agencies and health care providers; a regulatory sandbox; Attorney-General enforcement; local AI rules preempted [35] | Prohibited-use policy-as-code; AI-use disclosure controls; complaint and incident handling | 1 · 4 |
| Colorado SB 26-189 (automated decision-making technology), effective 2027-01-01, replacing SB 24-205 | Developers and deployers of ADMT in consequential decisions | Developer documentation to deployers and notice of material updates; deployer notice of ADMT use; a plain-language explanation within 30 days of an adverse outcome; correction, human review and reconsideration; records kept at least three years. SB 26-189 (signed 2026-05-14) repealed and re-enacted SB 24-205, whose duty of care against algorithmic discrimination had been delayed to 2026-06-30 and whose enforcement a federal court had blocked [36][55] | ADMT inventory; developer documentation pack; notice and adverse-outcome explanation templates; human-review queue; three-year record store | 2 · 4 · 5 |
| California AB 2013 (training-data transparency), due 2026-01-01 | Developers of generative AI systems released since 2022-01-01 | Developers post a summary of the datasets used to train a generative AI system made available to Californians (sources, size, data types, IP and personal information, synthetic data) on or before 2026-01-01 and on each substantial modification [84] | Data card per dataset, published at release; training-data rights ledger | 2 |
| California AI Transparency Act (SB 942 as amended by AB 853), operative 2026-08-02 | Covered providers of public generative AI systems; large online platforms; capture-device makers | Covered providers offer a free AI-detection tool and embed latent disclosures, with an optional manifest disclosure, in generated image, video and audio; large online platforms and capture devices follow later [85] | Provenance pipeline writing latent metadata; public detection endpoint; platform-side provenance display | 3 · 4 |
| California SB 243 (companion chatbots), chaptered 2025-10-13 | Operators of companion chatbots | Disclose AI where a reasonable person could be misled; for known minors, remind at least every three hours and prevent sexually explicit content; run a suicide and self-harm protocol with crisis referral; annual reports from 2027-07-01 [86] | Companion-mode policy; reminder timer; crisis-referral classifier and log; annual report | 1 · 4 · 5 |
| New York GBL Article 47 (AI companion models), in force 2025-11-05 (verify) | Operators of AI companions | Detect suicidal ideation and self-harm and refer users to crisis services; tell users they are not talking to a human at the start and at least every three hours [88] | Crisis-referral classifier and log; notice timer | 4 · 5 |
| Illinois HB 3773 (Human Rights Act amendment), effective 2026-01-01 | Employers | Employers may not use AI with a discriminatory effect on protected classes in recruitment, hiring, promotion, discipline or other terms of employment, nor ZIP codes as a proxy, and must notify employees and applicants [89][118] | AI-in-HR inventory; adverse-impact eval per protected class; notice record | 2 · 3 · 4 |
| NYC Local Law 144 (automated employment decision tools), enforced since 2023-07-05 | Employers and employment agencies using AEDTs for New York City roles | An independent bias audit within one year before use, a published summary of the results, and notice to candidates and employees 10 business days before use [90] | Impact-ratio eval by sex, race/ethnicity and intersectional category; published audit summary; notice record | 3 · 5 |
| Utah AI disclosure law (SB 226), effective 2025-05-07 | Suppliers using generative AI in consumer transactions; regulated occupations | Disclose generative AI when a person clearly and unambiguously asks; regulated occupations disclose it prominently in a high-risk AI interaction; clear disclosure at the outset is a safe harbour [91] | Disclosure component with an interaction-risk flag; conversation log showing the disclosure | 4 |

### State privacy and sector laws

State privacy statutes reach AI through profiling opt-outs, assessments, consent and review rights,
and one sector law reaches insurers' models. Chapter 19 compares them in
[the United States](/bok/privacy-and-ai#united-states) and chapter 20 covers
[housing, insurance and public services](/bok/existing-law#housing-insurance-and-public-services).

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| California CPPA regulations (ADMT), duties from 2027-01-01 | Businesses subject to the CCPA | Businesses using ADMT for significant decisions give a pre-use notice, an opt-out or a human appeal, and access to information about the ADMT [87] | ADMT register; pre-use notice; opt-out or appeal workflow; ADMT access response | 2 · 4 · 5 |
| California CPPA regulations (risk assessments), effective 2026-01-01 | Businesses subject to the CCPA | A risk assessment before processing that presents significant risk, incl. using ADMT for significant decisions; attestations and summaries submitted to the Agency [87] | Risk assessment per triggering activity; submission record | 5 |
| Virginia CDPA (§ 59.1-580), from 2023-01-01 | Controllers | Controllers document data protection assessments for targeted advertising, sale, profiling that presents a reasonably foreseeable risk, and sensitive data, for processing created after 2023-01-01, and give them to the Attorney General on request [93] | Assessment template per processing activity; profiling register | 1 · 5 |
| Colorado Privacy Act (SB21-190), effective 2023-07-01 | Controllers | Consumers may opt out of profiling in furtherance of decisions with legal or similarly significant effects, incl. through a universal opt-out mechanism; controllers run data protection assessments for processing that presents a heightened risk [94] | Opt-out flag honoured at inference; assessment template; intake data-class flags | 1 · 2 · 4 · 5 |
| Minnesota CDPA (§ 325M.14), effective 2025-07-31 | Controllers | A consumer may question the result of profiling, be told the reason, review the personal data used, correct it and have the decision re-evaluated [95] | Reason-and-review workflow with re-evaluation on corrected data | 4 · 5 |
| Illinois BIPA (740 ILCS 14), in force 2008-10-03 | Private entities | Informed written consent before collecting biometric identifiers, a retention and destruction schedule, and secure storage; a private right of action with statutory damages [96][119] | Written-consent capture; retention schedule as code; destruction log | 1 · 2 |
| Washington My Health My Data Act (RCW 19.373), from 2024-03-31 | Regulated entities | Consent to collect and separate consent to share consumer health data, incl. data derived or extrapolated by algorithms or machine learning, and a signed authorisation for any sale [97] | Separate consent records for collection and sharing; signed sale authorisation; intake flags for derived health data | 1 · 2 |
| Colorado SB21-169 (insurers), effective 2021-09-07 | Insurers | Insurers may not unfairly discriminate through external consumer data, algorithms or predictive models; they keep a risk-management framework, test for unfair discrimination and file a chief-risk-officer attestation under rules adopted per line of insurance [92] | Inventory of external data sources and models; disparity testing; chief-risk-officer attestation record | 2 · 3 · 5 |

### Federal law that already reaches AI

Federal agencies are bound by OMB memoranda [98][99]. For private organisations the federal rules
that reach AI are older, technology-neutral law: adverse-action notices in lending and credit
reporting, disparate impact in employment, the FTC Act's ban on deceptive practices, and the TAKE IT
DOWN Act's removal duty [100][101][102][103][104][105][106]. Chapter 21 covers
[the federal layer](/bok/ai-laws-worldwide#united-states-the-federal-layer); chapter 16 builds the
reason codes of [credit adverse-action notices](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
and the [four-fifths rule](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
chapter 20 covers [claims substantiation](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement)
and [deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media).

| Law | Scope | Obligation | Engineering artefact | Layer |
|---|---|---|---|---|
| OMB M-25-21 (federal use of AI), issued 2025-04-03 | US federal agencies (their AI vendors by contract) | Federal agencies apply minimum practices to high-impact AI: pre-deployment testing, an AI impact assessment, ongoing monitoring, operator training, human oversight with a fail-safe where practicable, remedies or appeals, and consultation of end users, documented within 365 days [98] | Use-case inventory entry; pre-deployment test report; AI impact assessment; monitoring plan; appeal path | 2 · 3 · 4 · 5 |
| OMB M-26-04 (LLM procurement), issued 2025-12-11 | US federal agencies and LLM vendors | Solicitations for large language models request, as a minimum, the vendor's acceptable use policy, model, system or data cards, end-user resources and a feedback mechanism [99] | Acceptable use policy; model, system or data cards; end-user resources; feedback channel | 2 · 5 |
| ECOA Regulation B (`12 CFR 1002.9`) | Creditors | A creditor that takes adverse action gives a statement of specific principal reasons, or the right to one within 30 days; citing internal standards or a failed score is insufficient, whatever model made the decision [100] | Reason-code service versioned with the model; reason-code fidelity eval; notice template | 3 · 4 · 5 |
| FCRA (`15 U.S.C. 1681m(a)`) | Users of consumer reports | A user of a consumer report that takes adverse action gives notice, discloses the numerical credit score used and its key factors, names the reporting agency and states the right to a free report and to dispute [101] | Score and key-factor record per adverse decision; notice template | 4 |
| Title VII s. 703(k) and UGESP (`29 CFR 1607.4(D)`) | Employers | A selection procedure with disparate impact is unlawful unless job-related and consistent with business necessity, and a less discriminatory alternative can still be required; a selection rate under four-fifths of the highest group's rate is generally regarded as evidence of adverse impact [102][103] | Adverse-impact-ratio eval per group with counts and confidence intervals; job-relatedness validation; alternatives search log | 3 · 5 |
| FTC Act s. 5 (`15 U.S.C. 45`) | Businesses making AI claims | Deceptive acts or practices are unlawful: claims about an AI system's accuracy, performance or fairness need competent and reliable evidence before they are made [104][105] | Claims register linked to current eval runs; substantiation gate on release copy | 1 · 3 · 5 |
| TAKE IT DOWN Act (Public Law 119-12), process due 2026-05-19 | Covered platforms | Covered platforms run a notice-and-removal process and remove reported non-consensual intimate images, incl. AI-generated forgeries, and known identical copies within 48 hours of a valid request [106] | Takedown pipeline with a 48-hour clock, owner and log; matching of identical copies | 4 · 5 |

## Other jurisdictions

The map's spine is the EU AI Act, but a governance function working across borders answers to more
than one regime. These rows are stamped as of 2026-09-24; where a rule is still moving, the copy says
so.

| Jurisdiction / instrument | Status (as of 2026-09-24) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| South Korea: AI Basic Act | In force 2026-01-22 [34], with its Enforcement Decree [62]; the ministry (MSIT) announced a guidance period of at least one year in which fact-finding and fines are held back except in exceptional cases, while the duties apply [58]; detail in [chapter 21](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act) | Baseline duties for AI operators, heightened duties for "high-impact" AI in sensitive sectors, and AI-content labelling | Risk register for high-impact AI; AI-use notification; AI-content labelling | 1 · 2 · 4 |
| Singapore: IMDA Model AI Governance Framework for Generative AI | Voluntary; published May 2024 [39] | Governance dimensions incl. testing, transparency, incident reporting, security and content provenance | Eval suite; model cards; content provenance and watermarking | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Published (V2.1.1, Dec 2025) [40] | Baseline cyber-security requirements across the AI lifecycle (13 principles over five stages) | AI-system security controls across the lifecycle; supply-chain and AIBOM checks; runtime hardening | 4 |
| Singapore: IMDA Model AI Governance Framework for Agentic AI (identity and authorisations) | Voluntary; version 1.5 published 2026-05-20 [107] | Each agent has a unique, accounted-for identity, catalogued and centrally managed; authorisations are scoped, time- or session-bound, non-transferable and bounded by the authorising human | Agent registry with a workload identity per agent; delegated, short-lived credentials never broader than the user | 2 · 4 |
| Singapore: IMDA Model AI Governance Framework for Agentic AI (human checkpoints) | Voluntary; version 1.5 published 2026-05-20 [107] | Significant checkpoints for high-stakes, irreversible, outlier and user-defined actions, with approvals that are contextual and digestible and enforced through system-level controls | Checkpoint classes in the tool gateway; approval log; oversight metrics | 4 · 5 |
| Canada: Directive on Automated Decision-Making (federal institutions) | In effect since 2019-04-01; modified 2025-06-24 [108] | Complete, approve and publish an algorithmic impact assessment before production; apply the Appendix C requirements for the impact level (notice, explanation, peer review, human intervention); offer recourse and report on effectiveness | Published AIA rendered from a shared impact fact base; notice and explanation templates; peer-review record; recourse path; re-assessment triggers as code | 1 · 2 · 5 |
| Brazil: LGPD `Art. 20` (review of automated decisions) | In force 2020-09-18 (verify); sanctions from 2021-08-01 [109] | A data subject may request review of decisions taken solely on automated processing that affect their interests, incl. profiling, and the controller gives clear information on the criteria and procedures used | Review workflow; statement of criteria and procedures per system | 4 · 5 |

### South Korea, article by article

The AI Basic Act's operator duties sit in Articles 31 to 36, with the mechanics in the Enforcement
Decree [34][62]. All of them have applied since 22 January 2026; what MSIT holds back during its
guidance period of at least one year is fact-finding and fines, not the duties [58]. Chapter 21 walks
each article in [South Korea: the AI Basic Act](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act).

| Article | Who is bound | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| `Art. 31(1)` | AI business operators | Tell users in advance that a product or service runs on high-impact or generative AI, in the product, the terms, the screen or the place of supply (Decree Art. 23(1)); a missing notice is finable (Art. 43) [34][62] | Notice component in UI, terms and contracts; notice inventory per user surface | 2 · 4 |
| `Art. 31(2)–(3)` | Operators providing generative AI | Indicate that outputs are AI-generated, and notify or label realistic synthetic sound, images or video so users can recognise them; a machine-readable mark alone needs at least one text or voice notice (Decree Art. 23(2)–(3)) [34][62] | Provenance pipeline: visible label or machine-readable mark plus at least one text or voice notice | 3 · 4 |
| `Art. 32` | Operators of qualifying high-compute systems | Systems with at least 10^26 FLOP of cumulative training compute, built with the most advanced technology and posing broad and serious risk (Decree Art. 24), identify, assess and mitigate risks across the lifecycle and report the results to MSIT [34][62] | Lifecycle risk register; safety-incident monitoring; results report to MSIT | 3 · 4 · 5 |
| `Art. 33` | AI business operators | Review in advance whether a system is high-impact AI and optionally ask MSIT to confirm; MSIT replies within 30 days, extendable once (Decree Art. 25) [34][62] | Classification decision record per system: Art. 2(4) area, risk rationale, training-data overview, MSIT reply | 1 · 2 |
| `Art. 34` | Operators of high-impact AI | A risk management plan, an explanation plan, a user-protection plan, human management and supervision, and documents showing the measures; publish the main content and keep the evidence for five years (Decree Art. 27) [34][62] | Risk management, explanation and user-protection plans; named human overseer; published summary; five-year evidence store | 1 · 2 · 4 · 5 |
| `Art. 35` | Operators of high-impact AI | Endeavour to assess the effect on fundamental rights before providing high-impact AI, covering the seven elements of Decree Art. 28 [34][62] | Impact assessment carrying the seven decree elements | 1 · 5 |
| `Art. 36` | Foreign AI business operators above a threshold | An operator with no address or establishment in Korea that meets a decree threshold (revenue, AI-service revenue, daily users or a past fine; Decree Art. 29) designates a domestic representative in writing and reports it to MSIT [34][62] | Designation filed with MSIT; evidence-access runbook for the representative | 5 |

### United Kingdom

The UK has no horizontal AI act. It governs AI through existing sector regulators (the ICO, the FCA,
the MHRA and others), coordinated centrally, plus the **AI Security Institute** (renamed from the AI
Safety Institute in February 2025) for frontier-model evaluation [38]. For automated decision-making,
the Data (Use and Access) Act 2025 replaced UK GDPR Article 22 with new **Articles 22A–22D** (in force
5 February 2026): a permission-plus-safeguards model for significant, solely automated decisions, with
tighter conditions where special-category data is used. The safeguards (a meaningful-human-review
path, a channel to make representations and to contest, and a decision notice) are the artefact the
engineer builds [37]. Chapter 19 sets Articles 22A–22D beside the GDPR and the US regimes in
[the regimes side by side](/bok/privacy-and-ai#the-regimes-side-by-side), and chapter 16 turns the
safeguards into explanation and contest records in
[data protection: the GDPR and the UK regime](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).
UK consumer law reaches AI-generated reviews: the Digital Markets, Competition and Consumers Act 2024
bans fake and concealed-incentive reviews from 6 April 2025 [111], taught in chapter 20 under
[the United Kingdom: DMCC Act](/bok/existing-law#the-united-kingdom-dmcc-act).

| Jurisdiction / instrument | Status (as of 2026-09-24) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| UK: Data (Use and Access) Act 2025, UK GDPR Arts. 22A–22D | In force 2026-02-05 [37] | A permission-plus-safeguards model for significant, solely automated decisions, with tighter conditions where special-category data is used | ADM safeguards: meaningful-human-review path, contest and representation channel, decision notice | 4 · 2 |
| UK: Digital Markets, Competition and Consumers Act 2024, s. 225 and Sch. 20 para. 13 | In force 2025-04-06 [111] | Unfair commercial practices are prohibited, and Schedule 20 bans submitting or commissioning fake consumer reviews and concealed-incentive reviews, which reaches reviews generated by AI | Policy blocking review generation; review-provenance log | 1 · 4 |

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
Measures for Anthropomorphic Interaction Services (in force 2026-07-15), is narrow in scope (services
that offer sustained emotional interaction); it has a row below and chapter 21 sets it out under
[China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover)
[50]. Personal information is governed by the Personal Information Protection Law, whose Article 24
on automated decision-making also has a row [110]. The framework 3.0 (14 September 2026) is a TC260 technical document
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
| China: Personal Information Protection Law, Arts. 24 and 55–56 | Binding; in force 2021-11-01 [110] | Automated decisions stay transparent and fair, with no unreasonable differential treatment in prices or terms; targeted pushes offer a non-personalised option or an easy refusal; individuals may request an explanation and refuse solely automated decisions with a significant impact; an impact assessment beforehand, kept at least three years | Explanation service and manual-decision route; non-personalised option at runtime; impact assessment record kept three years | 2 · 4 · 5 |
| China: Interim Measures for the Administration of Anthropomorphic Interaction Services (CAC, NDRC, MIIT, MPS and SAMR) | Binding; in force 2026-07-15 [50] | A minors' mode; AI signals and a reminder after two hours of continuous use; an easy exit; a security assessment at 1 million registered or 100,000 monthly active users; filing | Minors'-mode configuration; reminder timer; user-count threshold monitor; security-assessment report; filing record | 1 · 2 · 4 · 5 |
| China: TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Voluntary; published 2026-09-14 [42] | Unique identity and least-privilege permissions per agent by decision mode; human checkpoints with tamper-proof approval logs and deny-by-default; tool and skill verification; runtime guardrails (alert, restrict, intercept, suspend, terminate); memory isolation with no credentials in memory; mutual authentication; sandbox validation, red teaming and re-validation on major change; controlled decommissioning | Agent registry with identity and scope; approval-log store; tool allow-list with integrity checks; runtime guardrails and kill switch; memory-scope policy; decommissioning runbook | 2 · 3 · 4 · 5 |

Appendix 2's agent controls line up with the two agentic references this chapter already carries, the
OWASP Top 10 for Agentic Applications [16] and the NIST AI Agent Standards Initiative [29]:

| Agent control | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Layer |
|---|---|---|---|---|
| Identity and least privilege | II.2: unique identity per agent, permissions by decision mode, credentials revoked at task end | ASI03 Identity and Privilege Abuse | Agent identity, authentication, authorisation | 2 · 4 |
| Human checkpoints and approval logs | II.3: tiered controls, human control checkpoints, tamper-proof approval logs, deny by default | ASI09 Human-Agent Trust Exploitation; ASI01 Agent Goal Hijack | None | 4 · 5 |
| Tools, skills and supply chain | II.4: tool verification, fair tool selection, anomaly detection, skill management | ASI02 Tool Misuse and Exploitation; ASI04 Agentic Supply Chain Vulnerabilities | Agent security | 2 · 4 |
| Runtime guardrails and execution limits | II.5(1)(2)(5)(6): input control, guardrails, step/frequency/duration limits, sandbox isolation | ASI01 Agent Goal Hijack; ASI05 Unexpected Code Execution (RCE); ASI08 Cascading Failures; ASI10 Rogue Agents | None | 4 |
| Memory | II.5(3): retention windows, isolation across users and tasks, no credentials in memory | ASI06 Memory & Context Poisoning | None | 3 · 4 |
| Agent–model–tool communication | II.5(4): mutual authentication, integrity, replay resistance | ASI07 Insecure Inter-Agent Communication | Authentication | 4 |
| Monitoring, audit, sandbox, red teaming, incident response | II.6: anomaly blocking, log management, security auditing, sandbox validation, red teaming, emergency plans, re-validation on major change | Cross-cutting | Adversarial agent evals | 3 · 5 |
| Decommissioning | II.7: complete shutdown, data backup, environment cleanup | ASI10 Rogue Agents (residual agents) | None | 2 · 4 |

Chapter 23 compares these agent-control sources with the CSA's and Singapore's in
[frameworks written for agents](/bok/governing-agents#frameworks-written-for-agents).

### Treaty and international soft law

Three international instruments carry duties an engineer can evidence. The Council of Europe
Framework Convention (CETS No. 225) binds Parties, not companies, and is not yet in force; inside the
EU it is implemented through the AI Act [112][113]. The OECD AI Principles, revised on 3 May 2024,
and the G7 Hiroshima Code of Conduct of 30 October 2023 are voluntary [114][115]. Chapter 22 teaches
them in [what the Convention asks for](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack),
[the five principles and five recommendations](/bok/principles-and-standards#the-five-principles-and-five-recommendations)
and [the G7 Hiroshima Process](/bok/principles-and-standards#g7-hiroshima-process).

| Instrument and clause | Status (as of 2026-09-24) | What it asks for | Engineering artefact | Layer |
|---|---|---|---|---|
| Council of Europe Convention `Art. 14(2)(a)–(b)` | Not in force (as of 2026-09-24) [112][113] | Document relevant information about systems that can significantly affect human rights, sufficient for affected people to contest the decisions | Decision record per consequential output; contest path with the record attached | 2 · 5 |
| Council of Europe Convention `Art. 15(2)` | Not in force (as of 2026-09-24) [112][113] | Notify people that they are interacting with an AI system, as appropriate | Interaction disclosure enforced at runtime | 4 |
| Council of Europe Convention `Art. 16(1)–(2)(a)–(f)` | Not in force (as of 2026-09-24) [112][113] | Iterative, graduated risk and impact management: context, severity and probability, stakeholder views, monitoring and documentation | Risk register as code; impact assessment linked to the registry; monitoring against a baseline | 1 · 2 · 4 |
| Council of Europe Convention `Art. 16(2)(g)` | Not in force (as of 2026-09-24) [112][113] | Test systems before first use and when they are significantly modified, where appropriate | Eval gate on release and on material change | 3 |
| OECD AI Principles, principle 1.4(b) | Non-binding; revised 2024-05-03 [114] | Mechanisms let AI systems that risk undue harm be overridden, repaired and/or decommissioned safely | Tested kill switch; decommissioning record in the registry | 2 · 4 |
| OECD AI Principles, principle 1.5(b)–(c) | Non-binding; revised 2024-05-03 [114] | Traceability of datasets, processes and decisions, and systematic risk management at each phase of the lifecycle | Evidence store keyed to registry ids; risk register as code; supplier records | 1 · 5 |
| G7 Hiroshima Code of Conduct, action 1 | Voluntary; agreed 2023-10-30 [115] | Identify, evaluate and mitigate risks across the lifecycle, incl. testing before deployment | Adversarial red-team suite; eval gate | 3 |
| G7 Hiroshima Code of Conduct, actions 2 and 4 | Voluntary; agreed 2023-10-30 [115] | Identify and mitigate vulnerabilities, incidents and misuse after deployment, and share information and report incidents responsibly | Runtime monitoring; incident pipeline with an external-sharing branch | 4 · 5 |
| G7 Hiroshima Code of Conduct, action 3 | Voluntary; agreed 2023-10-30 [115][116] | Publicly report capabilities, limitations and appropriate and inappropriate uses; the OECD reporting framework has collected such reports since 2025 | Model card published from the registry | 2 |
| G7 Hiroshima Code of Conduct, action 7 | Voluntary; agreed 2023-10-30 [115] | Deploy content authentication and provenance mechanisms where feasible | Provenance marking at output; verification test | 4 |

Mappings are illustrative, not a claim of conformity.

## What is NOT harmonised yet

The map has a hole, and it is important to state it plainly rather than paper over it.

- **No harmonised standard is cited in the Official Journal.** As of 2026-09-24, Article 40's
  presumption of conformity is available to no one, because no harmonised standard has been OJ-cited
  [20].
- **EN 18286 is published but not cited.** The Article 17 QMS standard EN 18286:2026 was published in
  July 2026 (the first JTC 21 AI Act standard to reach publication), but it is not yet cited in the
  Official Journal, so it carries no presumption of conformity [20][21].
- **The other JTC 21 drafts are at or before Enquiry.** As of 2026-09-24, as reported by a
  pan-European standards information point, the Enquiry votes on prEN 18228 (`Art. 9`, risk
  management) and prEN 18282 (`Art. 15`, cybersecurity) closed on 30 Jul 2026 and on prEN 18229-1
  (`Art. 12`, logging) on 20 Aug 2026; prEN 18229-3 (`Art. 14`, human oversight) entered Enquiry on
  30 Jul 2026; and prEN 18229-4 and -5 (`Art. 15`, accuracy and robustness) were approved as new
  projects on 24 Jun 2026 [60], consistent with the public tracker that had them at Enquiry in
  mid-2026 [53]. CEN and CENELEC may publish a priority deliverable directly after a positive Enquiry
  vote and target them for Q4 2026 [61]; publication would still not be an OJ citation. Chapter 22
  tracks every deliverable and the
  [status of the JTC 21 harmonised standards](/bok/principles-and-standards#harmonised-standards-under-the-ai-act),
  and explains [how the presumption of conformity works](/bok/principles-and-standards#how-presumption-of-conformity-works).
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

The register carries the three JTC 21 deliverables the book relies on, with their status as of
2026-09-24 [20][21][60]:

| Deliverable | What it is | Status (as of 2026-09-24) | Engineering artefact | Layer |
|---|---|---|---|---|
| EN 18286:2026 | Quality-management-system requirements supporting Art. 17; published but not cited in the Official Journal, so it carries no presumption of conformity | Published July 2026; not OJ-cited [21][20] | QMS processes run as pipeline stages; design and change-control evidence | 1 · 5 |
| prEN 18228 | Draft harmonised standard for the risk management system of Art. 9 | Draft; Enquiry vote closed 2026-07-30, as reported [60] | Provider risk file per system; acceptability criteria as code; control monitoring | 1 · 3 · 5 |
| prEN 18229-1 | Draft harmonised standard for the record-keeping of Art. 12 | Draft; Enquiry vote closed 2026-08-20, as reported [60] | Logging specification per system; structured, signed event logs mapped to the draft | 4 |

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
Code of Practice, the GDPR, NIS2, DORA, the CRA, the Product Liability, DSM, Unfair Commercial
Practices, Platform Work and Consumer Credit Directives, the DSA, ISO/IEC 42001, 42005, 42006, 23894
and 22989, NIST AI RMF and the newer NIST AI work, CSA AICM, OWASP GenAI/Agentic, the CEN-CENELEC JTC
21 deliverables, the US federal and state laws, the other jurisdictions and the treaty and soft-law
instruments named above map onto the five-layer stack (chapter 04) and the pattern catalogue (chapter
05). Mappings are illustrative, not a claim of conformity.

## What you can do this week

1. **Find your rows.** For one system, list the rows of this map that apply to it, by role and risk
   class, with the date from which each applies.
2. **Name one artefact per row.** Next to each row, write the artefact that evidences it today, or
   mark the gap.
3. **Put the dates in the pipeline.** Store each applicable date as data that your policy checks
   read, so an obligation that starts to apply shows up as a failing check, not a surprise.
4. **Evidence one obligation on its merits.** For the obligation you most expected a harmonised
   standard to cover, write down how you evidence it today without a presumption of conformity.
5. **Re-read on change.** When a date or a row in this map changes, re-run the first step for your
   systems and record the difference.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; the reworded text applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] OWASP Top 10 for Agentic Applications for 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; names as in the document's contents, read 2026-09-24). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026; amends Art. 3(14), 6(1a)–(1c), 25(2) and (4), 75(1), new 75(1a) (serious incidents of systems under the AI Office's competence reported to the AI Office), 99(4)(da), Annex I (machinery to Section B) and Annex VIII Section B (points 7 and 9 deleted); Art. 73 not amended; Art. 113(a) Chapters I and II apply from 2 Feb 2025; Art. 113(c) as replaced: Chapter III, Sections 1, 2 and 3, except Art. 6(5), apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services; superseded in scope by the 2026 chapter amendment, which drops the cost test, adds a USD 500M revenue test and moves oversight to the DFS [25]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; large frontier developers publish the framework, all frontier developers report critical safety incidents; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (names the Agentic Trust Framework, AARM, the Catastrophic Risk Annex and STAR for AI; no "Agentic Control Supplement" is named, checked 2026-09-24). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; high-impact AI duties in Arts. 31 to 36; fact-finding in Art. 40; fines in Art. 43). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
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
[57] Regulation (EU) 2024/1689 (AI Act): Art. 26(5) (a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the market-surveillance authority; Art. 73 applies mutatis mutandis if it cannot reach the provider) and Art. 73(1)–(4) (report immediately on a causal link or its reasonable likelihood, and no later than 15, 2 or 10 days after the provider or, where applicable, the deployer becomes aware). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[58] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[59] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; no revised version published as of 2026-09-24). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[60] Project stages for JTC 21 deliverables read on 2026-09-24 (prEN 18228 and prEN 18282 Enquiry votes closed 2026-07-30; prEN 18229-1 closed 2026-08-20; prEN 18229-3 at Enquiry from 2026-07-30; prEN 18229-4 and -5 new projects 2026-06-24). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[61] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; Q4 2026 target). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[62] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[63] Regulation (EU) 2024/1689 (AI Act), consolidated text of 27 July 2026 incorporating Regulation (EU) 2026/1744 (Art. 3(1) AI system; Art. 6(3)–(4) documented non-high-risk assessment and Art. 49(2) registration; Art. 15(3)–(4) declared accuracy metrics and feedback loops; Art. 16(l) accessibility; Art. 17(1)(m) accountability framework; Art. 18 documentation kept 10 years; Art. 19 logs kept at least six months; Art. 20 corrective actions; Arts. 22–24 authorised representatives, importers and distributors; Art. 26(1)–(11) deployer duties; Art. 43(4) new assessment on substantial modification; Art. 48 CE marking; Art. 52 notification within two weeks; Art. 53(1)(c) copyright policy; Art. 54 authorised representative of GPAI providers; Art. 73(6) investigation without altering the system; Art. 86 right to explanation; Art. 87 Directive (EU) 2019/1937 applies; Art. 111(3) GPAI models placed on the market before 2 August 2025 comply by 2 August 2027; Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[64] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (internal reporting channels for private legal entities with 50 or more workers, Art. 8(3); acknowledgment within seven days and feedback within three months, Art. 9(1)). Publications Office of the EU (EUR-Lex). 2019-11-26. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[65] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, Measure 9.3: 2, 5, 10 and 15 days by incident class, intermediate reports at least every four weeks, final report within 60 days of resolution; Measure 9.4: records kept at least five years; Appendix 1.3 sources of systemic risk incl. the capability to operate autonomously, colluding with other AI systems, access to tools and the level of human oversight; Appendix 1.4 specified systemic risks incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[66] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 5(1)(b)–(c), 5(2), 6, 6(4), 7, 9, 13, 14, 15(1)(h), 16, 17, 21, 22, 25, 28, 30, 33–36, 44–49; applies from 25 May 2018, Art. 99(2)). Publications Office of the EU (EUR-Lex). 2016-05-04. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[67] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (legitimate-interest test; anonymity test and the evidence expected for a claim that a model is anonymous). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[68] Directive (EU) 2022/2555 (NIS2) (Art. 21(2)(c) business continuity and (d) supply-chain security; Art. 23(4) early warning within 24 hours, incident notification within 72 hours, final report within one month; Art. 41(1) measures applied from 18 October 2024). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[69] Regulation (EU) 2022/2554 (DORA) (Art. 19 reporting of major ICT-related incidents; Art. 28(3) register of information; Art. 28(8) exit strategies; Art. 64 applies from 17 January 2025). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[70] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits of major ICT-related incident reports (Art. 5(1): initial notification within four hours of classification and no later than 24 hours from awareness; Art. 5(2): within four hours of a classification made after those 24 hours; intermediate report within 72 hours of the initial notification; final report no later than one month after the latest intermediate report). Publications Office of the EU (EUR-Lex). 2025-02-20. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[71] Regulation (EU) 2024/2847 (Cyber Resilience Act) (Art. 14 reporting of actively exploited vulnerabilities and severe incidents: early warning within 24 hours, notification within 72 hours, final reports; Art. 71(2) applies from 11 December 2027, Art. 14 from 11 September 2026). Publications Office of the EU (EUR-Lex). 2024-11-20. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[72] Directive (EU) 2024/2853 on liability for defective products (Art. 2(1) products placed on the market or put into service after 9 December 2026; Art. 4(1) software is a product; Art. 9 disclosure of evidence; Art. 10 presumption of defectiveness; Art. 11(2) no exemption for defects due to software, its updates or the lack of safety updates within the manufacturer's control; Art. 22 transposition by 9 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-18. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[73] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(3) text-and-data-mining exception subject to an express reservation, by machine-readable means for content made publicly available online; Art. 29 transposition by 7 June 2021). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[74] Regulation (EU) 2022/2065 (Digital Services Act) (Art. 25 online interface design and organisation; Art. 27 recommender system transparency; applies from 17 February 2024). Publications Office of the EU (EUR-Lex). 2022-10-27. https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng (verified: primary)
[75] Directive 2005/29/EC (Unfair Commercial Practices Directive) (Art. 5 general prohibition; Arts. 6–7 misleading actions and omissions; Art. 19 measures applied by 12 December 2007), with Directive (EU) 2019/2161 adding Annex I points 23b and 23c on consumer reviews. Publications Office of the EU (EUR-Lex). 2005-06-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng (verified: primary)
[76] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 7 limits on processing by automated systems; Art. 9 transparency; Art. 10 human oversight and an impact evaluation at least every two years; Art. 11 explanation and human review; Art. 29 transposition by 2 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-11. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[77] Directive (EU) 2023/2225 on credit agreements for consumers (Art. 18(8) human intervention, explanation and review where the creditworthiness assessment involves automated processing; Art. 48 measures applied from 20 November 2026). Publications Office of the EU (EUR-Lex). 2023-10-30. https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng (verified: primary)
[78] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (AI stakeholder roles; AI system life cycle). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[79] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV, MP, MS and MG). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[80] AICM v1.1.1 and AI-CAIQ machine-readable bundle (JSON, YAML, OSCAL; control ids and titles incl. IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries). Cloud Security Alliance. 2026-08-04. https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal (verified: primary)
[81] Agentic Trust Framework, v1 (zero-trust governance for AI agents; autonomy tiers and promotion criteria; CC BY 4.0). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[82] Autonomous Action Runtime Management (AARM) specification (pre-execution interception with identity binding; policy evaluation before execution). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[83] STAR for AI (Level 1 self-assessment; Level 1 Valid-AI-ted automated validation; Level 2 with ISO/IEC 42001 certification plus the Valid-AI-ted assessment; read 2026-09-24). Cloud Security Alliance. 2026-09-24. https://cloudsecurityalliance.org/star/ai (verified: primary)
[84] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[85] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[86] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; reminders at least every three hours for known minors; suicide and self-harm protocol; annual reports to the Office of Suicide Prevention beginning 2027-07-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[87] "California Finalizes Regulations to Strengthen Consumers' Privacy" (regulations on ADMT, risk assessments and cybersecurity audits approved 2025-09-23; effective 2026-01-01; ADMT requirements from 2027-01-01; risk-assessment attestations and summaries due 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[88] New York General Business Law Article 47, Artificial Intelligence Companion Models (§§ 1700–1704; self-harm protocol; notice at the start and at least every three hours; Attorney General, up to USD 15,000 per day; most recent revision shown 2025-11-07). New York State Senate. 2025-11-07. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[89] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; ZIP codes as a proxy; IDHR draft rules). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[90] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[91] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (Utah Code 13-75, effective 2025-05-07: disclosure on a clear and unambiguous request; prominent disclosure in high-risk interactions by regulated occupations; safe harbour; Title 13, Chapter 72, Artificial Intelligence Policy Act, repealed 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[92] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 2021-07-06; effective 2021-09-07; risk-management framework, testing and chief-risk-officer attestation; rules per type of insurance, none effective before 2023-01-01). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[93] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, profiling with a reasonably foreseeable risk, sensitive data; processing activities created after 2023-01-01; available to the Attorney General). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
[94] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[95] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review and correct the data, have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[96] "Biometric Information Privacy Act" (signed 3 October 2008; consent, timely destruction and secure storage of biometric identifiers; USD 1,000 or 5,000 per violation). Wikipedia. 2026-09-24. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: reported)
[97] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; 31 March 2024, small businesses 30 June 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[98] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (high-impact AI; minimum practices; 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[99] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (policies updated by 2026-03-11; minimum LLM transparency in solicitations). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[100] 12 CFR § 1002.9, Notifications (statement of specific reasons, or the right to one within 30 days; internal standards or a failed score are insufficient; source 76 FR 79445, 21 December 2011, as amended 20 March 2023). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: secondary)
[101] 15 U.S.C. § 1681m, Requirements on users of consumer reports (adverse-action notice; numerical credit score and key factors added by Pub. L. 111-203, s. 1100F, effective on the designated transfer date, 21 July 2011 per 12 U.S.C. § 5582 note). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/1681m (verified: secondary)
[102] 42 U.S.C. § 2000e-2(k), Burden of proof in disparate impact cases (business necessity; alternative employment practice; added by the Civil Rights Act of 1991, 21 November 1991). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[103] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures: adverse impact and the four-fifths rule (43 FR 38295, 25 August 1978). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: secondary)
[104] 15 U.S.C. § 45(a)(1), Unfair methods of competition and unfair or deceptive acts or practices unlawful (deceptive-practices prong added by the Wheeler-Lea Act of 21 March 1938). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[105] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (competent and reliable evidence required for AI accuracy claims). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[106] TAKE IT DOWN Act, Public Law 119-12 (enacted 19 May 2025; s. 3: covered platforms establish a notice-and-removal process within one year of enactment and remove reported images, and known identical copies, within 48 hours; enforced by the FTC). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[107] Model AI Governance Framework for Agentic AI, version 1.5 (agent identity unique, accounted for and centrally managed; authorisations scoped, time- or session-bound, non-transferable and bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[108] Directive on Automated Decision-Making (in effect 1 April 2019; systems procured before 24 June 2025 comply by 24 June 2026; 6.1 algorithmic impact assessment published before production; Appendix C requirements by impact level; notice, explanation, peer review, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[109] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 20 review of decisions taken solely on automated processing; Art. 65 entry into force, incl. Arts. 52 to 54 from 1 August 2021). Presidência da República (Brazil). 2026-09-24. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[110] Personal Information Protection Law of the People's Republic of China, English translation for reference (Art. 24 automated decision-making; Arts. 55–56 personal information protection impact assessment kept at least three years; in force 1 November 2021). National People's Congress. 2021-12-29. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[111] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 April 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[112] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[113] The Framework Convention on Artificial Intelligence (Parties: the European Union; not yet in force; read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[114] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (principles 1.4(b) override, repair or decommission safely and 1.5(b)–(c) traceability and systematic risk management; revised 3 May 2024). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[115] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[116] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (reporting framework launched 7 February 2025; first reports by 15 April 2025). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[118] Public Act 103-0804, HB 3773 (amends the Illinois Human Rights Act, 775 ILCS 5/2-102(L): no AI with a discriminatory effect on protected classes, no ZIP codes as a proxy, notice of AI use; IDHR to adopt rules; approved 9 Aug 2024, effective 1 Jan 2026; text and bill status read from Web Archive captures of 2025-03-29 and 2025-06-17, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2024-08-09. https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804 (verified: primary)
[119] 740 ILCS 14, Biometric Information Privacy Act (Source: P.A. 95-994, eff. 10-3-08; s. 15 retention schedule, written release, secure storage; s. 20 right of action, USD 1,000 negligent or USD 5,000 intentional or reckless per violation; text read from the Web Archive capture of 2025-06-18, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2008-10-03. https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004&ChapterID=57 (verified: primary)
