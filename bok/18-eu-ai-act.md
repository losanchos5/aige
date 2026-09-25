---
seoTitle: "EU AI Act explained for engineers: risk, duties, dates"
---
# 18. The EU AI Act in one pass

> The EU AI Act, as amended by the Digital Omnibus, read end to end: what it covers, how it ranks
> risk, who carries which duty, and the date each duty starts to apply.

> **In short**
> The EU AI Act, Regulation (EU) 2024/1689, is a product-safety regulation with fundamental-rights
> goals: directly applicable in every Member State, in force since 1 Aug 2024, with duties that
> switch on in stages [1][2]. Four ideas carry the whole text: a definition gate (is the thing an AI
> system, a general-purpose AI model, or neither), a risk ladder, a set of operator roles and a
> timeline. The Digital Omnibus on AI, Regulation (EU) 2026/1744, entered into force on 27 July 2026
> [2]. It moved the high-risk duties to 2 December 2027 for Annex III systems and to 2 August 2028
> for Annex I, and added two prohibitions that apply from 2 December 2026. The Act's reach is
> extraterritorial by placement and by output, so the scope question is where a system's output is
> used, not where it is hosted [1]. Every duty names the artefact that evidences it and the stack
> layer that produces it, and counsel confirms that the obligation was read correctly.

## How to read this chapter

This chapter teaches the Act; [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus) indexes it.
Read this one for the logic of the law and chapter 08 for the full obligation rows. Every duty below
names the artefact that evidences it and the stack layer that produces it.

The text is read against Regulation (EU) 2024/1689 [1] as amended by Regulation (EU) 2026/1744, the
Digital Omnibus on AI [2], and every date is stamped as of 2026-09-24. It is an engineer's reading,
not legal advice. The engineer builds the control and the evidence; counsel confirms that the
obligation was read correctly (see [regulatory translation](/bok/the-role#regulatory-translation)).
Mappings are illustrative, not a claim of conformity.

The stack layers named throughout are chapter 04's five: **1 Govern-as-Code · 2 Inventory &
Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance &
Continuous Compliance**.

## The Act and the Omnibus

The AI Act is a product-safety regulation with fundamental-rights goals. It is directly applicable
in every Member State, it entered into force on 1 Aug 2024, and its duties switch on in stages [1][2].
Four ideas carry the whole text:

1. **A definition gate.** Is the thing an AI system, a general-purpose AI (GPAI) model, or neither?
2. **A risk ladder.** Which rung does the system's intended purpose put it on?
3. **A set of operator roles.** Which hat does your organisation wear for this system?
4. **A timeline.** From which date does each duty bite?

The **Digital Omnibus on AI** is Regulation (EU) 2026/1744 of 8 July 2026. It was published in the
Official Journal on 24 July 2026 and entered into force on the third day after publication, 27 July
2026 [2]. It did not rewrite the Act. It moved the high-risk dates, added two prohibitions and made
targeted changes that matter to an engineer (its GDPR counterpart is a separate proposal, covered in
[the GDPR side of the Digital Omnibus](/bok/privacy-and-ai#the-gdpr-side-of-the-digital-omnibus),
chapter 19):

| Change | Where | What it means for the engineer |
|---|---|---|
| High-risk duties deferred | `Art. 113(c)` | Annex III from 2027-12-02; Annex I from 2028-08-02 |
| Two new prohibitions | `Art. 5(1)(ba)`, `(bb)` | Intimate imagery without consent and child sexual abuse material, from 2026-12-02 |
| AI literacy reworded | `Art. 4` | "Take measures to support" literacy; no guaranteed level |
| Bias-detection data basis | `Art. 4a` (`Art. 10(5)` deleted) | Special-category data for bias correction, with strict safeguards |
| "Safety component" narrowed | `Art. 3(14)`, `6(1a)` to `6(1c)` | Fewer embedded systems classed high-risk |
| SME and small mid-cap (SMC) relief | `Arts. 11`, `17`, `63`, `99(6a)` | Simplified documentation and QMS; lower-of fines |
| Value-chain cooperation | `Art. 25(2)`, `25(4)`, `99(4)(da)` | Initial providers must hand over documentation and access; the duty is fined |
| FRIA may reuse the DPIA | `Art. 27(4)`, `27(5)` | One assessment record, cross-referenced |
| AI Office supervises some systems | `Arts. 75(1)`, `75a` to `75d` | A second supervisor with direct powers |
| Cyber Resilience Act presumption | `Art. 42(3)` | CRA conformity counts for `Art. 15` cybersecurity |
| Notified bodies | `Arts. 28` to `30`, Annex XIV | Single application; a designation code that names agentic AI (`AIH 0401`) |

All of the above is in the amending text [2]. Article numbers in the rest of the chapter are the
post-Omnibus ones.

## Scope and reach

### Who is in scope

Article 2(1) reaches providers placing AI systems or GPAI models on the EU market, wherever they are
established; deployers in the Union; providers and deployers in third countries whose system's
output is used in the Union; importers and distributors; product manufacturers placing AI with their
product under their own name; authorised representatives of non-EU providers; and affected persons
in the Union [1].

The reach is extraterritorial twice over: by placement and by output [1]. The engineering
consequence is a registry field. "Where is it hosted?" is not the scope question; "where is its
output used?" is. An agent registry that records only the hosting region cannot answer it.

### What counts as an AI system

Article 3(1) defines an **AI system** as "a machine-based system that is designed to operate with
varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit
or implicit objectives, infers, from the input it receives, how to generate outputs such as
predictions, content, recommendations, or decisions that can influence physical or virtual
environments" [1]. The Commission's guidelines read the sentence as seven elements (machine-based;
autonomy; possible adaptiveness; objectives; inference; outputs; influence on environments) and
note that not every element has to be present in both the building and the use phase [3].

The decisive element is inference. The guidelines exclude systems based on rules defined solely by
natural persons, and they name four families that compute but may still fall outside the definition:
systems for improving mathematical optimisation, basic data processing, systems based on classical
heuristics, and simple prediction systems [3]. The guidelines are not binding [3].

For the engineer, scope is a recorded decision, not an assumption. Each registry entry carries
`ai_system: true | false` and, when false, the element that fails and the reasoning. A "not an AI
system" call with no reasoning attached is the first thing an authority will ask about. A **GPAI
model** is a separate object with its own definition (`Art. 3(63)`), covered below; a model is not
an AI system on its own and needs further components, such as a user interface, to become one
(recital 97) [1]. What "AI" means
technically, beyond the legal test, is the subject of [chapter 11](/bok/ai-defined#four-definitions-compared).

### What the Act excludes

| Exclusion | Article | What to watch |
|---|---|---|
| Military, defence or national security | `Art. 2(3)` | The exclusion covers systems used *exclusively* for those purposes; a dual-use system is in scope for its other uses |
| Third-country public authorities and international organisations in law-enforcement or judicial cooperation | `Art. 2(4)` | Only with adequate safeguards for fundamental rights |
| Scientific research and development as the sole purpose | `Art. 2(6)` | The system or model must be specifically developed and put into service for that purpose alone |
| Research, testing and development before placing on the market | `Art. 2(8)` | Testing in real-world conditions is not covered by the exclusion |
| Purely personal, non-professional use | `Art. 2(10)` | Removes deployer obligations for natural persons only |
| Free and open-source AI systems | `Art. 2(12)` | Not if placed on the market as high-risk, or caught by `Art. 5` or `Art. 50` |
| Products under Annex I, Section B (sectoral regimes) | `Art. 2(2)` | Post-Omnibus, only `Art. 6(1)`, `Art. 60a` and `Arts. 102` to `112` apply |

The first six rows are in the original text [1]; the Section B row is as amended [2]. Union data
protection law applies alongside the Act in every case (`Art. 2(7)`).

## The risk ladder

The Act sorts AI systems by intended purpose onto four rungs, and puts GPAI models on a separate
track. One system can sit on two rungs at once: an Annex III chatbot carries both the high-risk
duties and the `Art. 50` disclosure duty.

| Rung | Test | Consequence | Articles | Applies from |
|---|---|---|---|---|
| Prohibited | The practice is listed in `Art. 5` | May not be placed on the market, put into service or used | `Art. 5` | 2025-02-02; new points 2026-12-02 |
| High-risk | Annex I safety component needing third-party assessment, or an Annex III use not filtered out by `Art. 6(3)` | Requirements of `Arts. 8` to `15`, provider and deployer duties, conformity assessment | `Arts. 6` to `49` | 2027-12-02 (Annex III); 2028-08-02 (Annex I) |
| Transparency | Interacts with people, generates synthetic content, recognises emotions, categorises biometrically, or produces deep fakes | Disclose, mark, label | `Art. 50` | 2026-08-02 |
| Minimal | Everything else | No specific duties beyond `Art. 4`; voluntary codes | `Arts. 4`, `95` | 2025-02-02 (`Art. 4` reworded 2026-07-27) |
| GPAI track | Model generality; systemic risk by capability, compute or designation | Model-level duties | `Arts. 51` to `56` | 2025-08-02; Commission enforcement 2026-08-02 |

Dates are those of `Art. 113` as amended [1][2].

### Prohibited practices (Article 5)

Article 5 is a list of banned uses, not a risk assessment. If a practice is on the list, no
mitigation makes it lawful. The list now has ten points [1][2]:

| Point | Prohibited practice (paraphrased) | Narrow carve-out | Applies from |
|---|---|---|---|
| `(a)` | Subliminal, manipulative or deceptive techniques that materially distort behaviour, causing or likely to cause significant harm | None | 2025-02-02 |
| `(b)` | Exploiting vulnerabilities of age, disability or social or economic situation, to the same effect | None | 2025-02-02 |
| `(c)` | Social scoring leading to unjustified or out-of-context detrimental treatment | None | 2025-02-02 |
| `(d)` | Predicting crime risk based solely on profiling or personality traits | Support to a human assessment based on objective, verifiable facts | 2025-02-02 |
| `(e)` | Untargeted scraping of facial images to build recognition databases | None | 2025-02-02 |
| `(f)` | Inferring emotions at work or in education | Medical or safety reasons | 2025-02-02 |
| `(g)` | Biometric categorisation to infer sensitive traits such as race, beliefs or sexual orientation | Lawfully acquired datasets; law-enforcement categorisation | 2025-02-02 |
| `(h)` | Real-time remote biometric identification in public spaces for law enforcement | Three objectives, with prior authorisation (`Art. 5(2)` to `5(7)`) | 2025-02-02 |
| `(ba)` | Generating or manipulating realistic intimate imagery of an identifiable person without explicit consent | Conditions in `Art. 5(1a)`, `5(1b)` | 2026-12-02 |
| `(bb)` | Generating or manipulating child sexual abuse material (Directive 2011/93/EU) | "Without right" defence; `Art. 5(1a)` | 2026-12-02 |

The two Omnibus points carry an engineering test. Placing such a generator on the market is
prohibited only where that output is its intended purpose, or where the output is "a reasonably
foreseeable and reproducible outcome" and the system lacks "reasonable and adequate technical safety
measures" to prevent it and correct observed misuse; use is prohibited only where the deployer uses
it for that purpose [2]. The evidence that the safeguard holds is therefore part of the legal test.
The Commission's guidelines on the original prohibitions are non-binding [4]. The scraping ban in
point `(e)` has a data protection precedent in [the Clearview AI case](/cases/clearview-ai).

For most organisations `Art. 5` is two controls: a denylist of prohibited purposes evaluated at
intake ([Policy Card](/patterns/policy-card)), and for generative systems an output
[Runtime Guardrail](/patterns/runtime-guardrail) tested by an
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite). Both leave records a
regulator can read. Breaches sit in the highest fine tier (see "Penalties").

> **In practice (illustrative)**
> A team shipping an image-editing feature treated 2 Dec 2026 as a release gate, not a legal memo.
> It added an adversarial suite of intimate-imagery and minor-safety prompts to the eval gate, set a
> zero-tolerance threshold, and wired the output classifier's block decisions into the evidence store
> under the obligation id `EU-AIA-5-1-ba`. The first run failed on edits that increased exposure in
> existing photos. The fix shipped before the date, and the passing run, not a policy statement,
> became the evidence that the safeguard was "reasonable and adequate".

### High-risk through products (Annex I)

A system is high-risk under `Art. 6(1)` when both conditions hold: it is a safety component of a
product, or is itself a product, covered by the Union harmonisation legislation in Annex I; and that
product must undergo a third-party conformity assessment under that legislation [1]. Section A of
Annex I covers products such as toys, lifts, radio equipment, medical devices and in vitro
diagnostics; Section B covers sectoral regimes such as civil aviation and vehicles [1].

The Omnibus narrowed the route [2]. A **safety component** must now have the intended purpose of
preventing or mitigating risks to health and safety, or be one whose failure endangers them
(`Art. 3(14)`). AI used solely for user assistance, performance optimisation, efficiency,
automation, convenience or quality control is not a safety component unless its failure would
endanger health and safety (`Art. 6(1a)`, `6(1b)`). A third-party assessment required only for
non-safety reasons, such as radio spectrum, does not count (`Art. 6(1c)`). Machinery moved to
Section B, and delegated acts due by 2 Aug 2027 may limit duties where Section A law already gives
equivalent protection (`Art. 2(13)`). The Annex I route applies from 2 Aug 2028 [2].

### High-risk through use (Annex III)

Under `Art. 6(2)`, Annex III lists eight areas. A system whose intended purpose falls in one of them
is high-risk unless the `Art. 6(3)` filter takes it out [1]:

| Area | What is listed (one line) |
|---|---|
| 1. Biometrics | Remote biometric identification (not one-to-one verification), biometric categorisation by sensitive attributes, emotion recognition |
| 2. Critical infrastructure | Safety components in critical digital infrastructure, road traffic, and the supply of water, gas, heating or electricity |
| 3. Education and vocational training | Admission, evaluating learning outcomes, assessing the level of education, detecting prohibited behaviour in tests |
| 4. Employment and workers' management | Recruitment and selection, decisions on terms, promotion or termination, task allocation, monitoring and evaluating performance |
| 5. Essential private and public services | Eligibility for public benefits, creditworthiness and credit scoring (not fraud detection), life and health insurance pricing, emergency call triage and dispatch |
| 6. Law enforcement | Victim risk, polygraphs, evidence reliability, offending risk not based solely on profiling, profiling in investigations |
| 7. Migration, asylum and border control | Polygraphs, risk assessment of persons, examining applications, detecting or identifying persons (not travel-document checks) |
| 8. Administration of justice and democratic processes | Assisting judicial authorities with facts and law (and ADR), influencing elections or voting behaviour |

The Commission can add use cases to Annex III by delegated act (`Art. 7`) [1], so the intake
classifier's Annex III table is data with a version, not a hard-coded list. What point 5 guards
against is visible in [the Dutch childcare-benefits case](/cases/dutch-childcare-benefits).

### The Annex III filter and the profiling override

Under `Art. 6(3)`, an Annex III system is not high-risk where it does not pose a significant risk of
harm to health, safety or fundamental rights, including by not materially influencing the outcome of
decision-making. The filter applies when at least one of four conditions holds [1]:

1. the system performs a narrow procedural task;
2. it improves the result of a previously completed human activity;
3. it detects decision-making patterns or deviations without replacing or influencing the completed
   human assessment without proper human review;
4. it performs a preparatory task to an assessment relevant to an Annex III use case.

One override beats all four: an Annex III system that **profiles natural persons is always
high-risk** [1]. A provider relying on the filter must document its assessment before placing the
system on the market, register it (`Art. 6(4)`, `Art. 49(2)`), and hand the documentation to
authorities on request [1]. The Omnibus trimmed that registration record, deleting the summary of
grounds and the list of Member States from Annex VIII, Section B [2].

The Commission's classification guidelines, with practical examples, were due by 2 Feb 2026 under
`Art. 6(5)`. A draft was published on 19 May 2026, with a targeted consultation open until 23 July
2026; as of 2026-09-24 the Commission's page still presents them as a draft [5][6]. Until they are
final, the engineer's defence is a good record, not a good argument.

> **Example (illustrative)**
> A classification decision record, filed in the registry and re-evaluated whenever the intended
> purpose changes:
>
> ```json
> { "system": "cv-screen-02", "annex_iii_point": "4(a)",
>   "art_6_3_condition": "preparatory_task", "profiling": true,
>   "result": "high-risk", "reason": "profiling override, Art. 6(3) third subparagraph",
>   "reviewed_by": "ai-governance", "date": "2026-09-24" }
> ```
>
> The explicit `profiling` flag is the point: the filter was claimed, and the override defeated it.

This record is the output of the [intake and classification](/bok/the-role#intake-and-classification)
workflow and lives in Layer 2 (Inventory & Transparency); the rule that computes it lives in Layer 1.

### Transparency cases (Article 50)

Article 50 is often called the "limited risk" rung. It applies to any AI system that fits one of its
cases, whatever else the system is [1]:

| Case | Duty holder | Duty | Artefact | Layer |
|---|---|---|---|---|
| `50(1)`: interacts directly with people | Provider | People must know it is AI, unless obvious | Interface disclosure; a test that it renders | 4 · 3 |
| `50(2)`: generates synthetic audio, image, video or text | Provider | Machine-readable, detectable marking | Watermark or provenance metadata; marking test in CI | 4 · 3 |
| `50(3)`: emotion recognition or biometric categorisation | Deployer | Inform the people exposed | Notice at the point of exposure | 2 |
| `50(4)`: deep fakes | Deployer | Disclose the manipulation (lighter for evident art or satire) | Content label; publishing check | 4 |
| `50(4)`: AI text informing the public | Deployer | Disclose, unless human editorial responsibility | Editorial-control record or label | 2 · 4 |

The information must reach people at the latest at first interaction or exposure (`Art. 50(5)`)
[1]. The article has applied since 2 Aug 2026; generative systems already on the market before that
date have until 2 Dec 2026 to mark outputs (`Art. 111(4)`) [2]. The final Code of Practice on
Transparency of AI-generated Content (10 June 2026) has a provider section on marking and a deployer
section on labelling, and the Commission and the AI Board confirmed it as an adequate voluntary tool;
the Commission published its guidelines on the `Art. 50` transparency obligations on 20 July 2026,
after a draft of 8 May 2026 [9][14]. Law outside the Act also reaches
synthetic media: see [deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media)
in chapter 20.

### Minimal risk

Everything else is minimal risk. The Act asks nothing specific of it beyond AI literacy (`Art. 4`)
and invites voluntary codes of conduct (`Art. 95`) [1]. "Minimal" is a legal category, not a risk
verdict: data protection, consumer, product-liability and anti-discrimination law still apply (see
[existing law](/bok/existing-law#how-to-read-this-chapter) and
[privacy and AI](/bok/privacy-and-ai#principles-applied-to-ai)), and your own
[risk management](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix) may rate a minimal-risk system as high for your
organisation.

## General-purpose AI models

### Model, system and the indicative criterion

A **GPAI model** is an AI model that "displays significant generality and is capable of competently
performing a wide range of distinct tasks" and can be integrated into a variety of downstream systems,
excluding models used for research, development or prototyping before they are placed on the market
(`Art. 3(63)`) [1]. A **GPAI system** is an AI system based on such a model (`Art. 3(66)`) [1]. The
Commission's guidelines give an indicative criterion: training compute above 10^23 FLOP and the
ability to generate language (text or audio), text-to-image or text-to-video [7].

### Duties of every GPAI provider

| Duty | Article | Artefact | Layer |
|---|---|---|---|
| Technical documentation (Annex XI) for the AI Office and national authorities, on request | `Art. 53(1)(a)` | Model documentation with training, testing and evaluation results | 2 |
| Information for downstream providers (Annex XII) | `Art. 53(1)(b)` | Model card; capability and limitation notes; integration guide | 2 |
| Copyright policy, including honouring text-and-data-mining opt-outs | `Art. 53(1)(c)` | Source-filtering rules as code; opt-out honour log | 1 · 2 |
| Public summary of training content on the AI Office template | `Art. 53(1)(d)` | Summary generated from dataset provenance records | 2 |
| Authorised representative in the Union for non-EU providers | `Art. 54` | Written mandate; documentation kept for 10 years | 5 |

The duties and their details are in the Act [1]; the chapter 08 rows for
[`Art. 53` and `Art. 55`](/bok/regulatory-map#eu-ai-act-post-omnibus) carry the dates and the authority.
The copyright law behind the `Art. 53(1)(c)` policy is in chapter 20
([copyright policy and TDM opt-outs](/bok/existing-law#copyright-and-training-data)).

### Systemic risk: threshold, notification, designation

A GPAI model has **systemic risk** if it has high-impact capabilities, or if the Commission designates
it on the Annex XIII criteria (`Art. 51(1)`) [1]. High-impact capabilities are presumed above 10^25
FLOP of cumulative training compute, a threshold the Commission can amend (`Art. 51(2)`, `51(3)`) [1].
The provider must notify the Commission within two weeks of meeting the threshold or knowing it will,
and may argue that the model exceptionally presents no systemic risk (`Art. 52`) [1].

The engineering artefact is a **compute ledger**: cumulative training FLOP per model lineage, with
the estimation method, and an alert when *planned* compute will cross the threshold, because the
two-week clock can start before training ends.

### Duties for models with systemic risk

On top of `Arts. 53` and `54`, the provider must evaluate the model with state-of-the-art protocols
including adversarial testing; assess and mitigate systemic risks at Union level; track, document and
report serious incidents to the AI Office without undue delay; and ensure adequate cybersecurity for
the model and its physical infrastructure (`Art. 55(1)`) [1]. The artefacts are the
[eval gate](/patterns/eval-gate-in-ci) and red-team suite, a systemic-risk register, the
[incident pipeline](/patterns/incident-pipeline) on the Commission's reporting template
(see [chapter 08](/bok/regulatory-map#gpai-code-of-practice)) and weight-security controls.

### Open-source carve-outs and their limits

A model released under a free and open-source licence, with its weights, architecture and usage
information public, is exempt from `Art. 53(1)(a)` and `(b)` and from the authorised-representative
duty (`Arts. 53(2)`, `54(6)`) [1]. The exemption never covers a systemic-risk model, and the copyright
policy and training summary still apply [1]. Monetisation defeats it: the guidelines treat dual
licensing, paid support without which the model cannot be used, and exclusive paid hosting as
monetisation [7]. The Omnibus keeps GPAI models inside the `Art. 25(4)` written-agreement duty even
when released openly [2].

### When a fine-tuner becomes a GPAI provider

A modifier becomes the provider of a new GPAI model only if the change is significant for generality,
capabilities or systemic risk. The guidelines' indicative criterion is modification compute above one
third of the original training compute (or, if unknown, a third of 10^25 FLOP for a systemic-risk
original and of 10^23 FLOP otherwise), and the modifier's `Art. 53(1)` duties are then limited to the
modification and its data; `Art. 54` applies, and where the original is a systemic-risk model the
modified model is presumed to have systemic risk, so the modifier notifies the Commission (`Art. 52`)
and meets the `Art. 55` duties [7]. Keep this test apart from `Art. 25`: fine-tuning a *model* changes GPAI-provider
status; changing a *system's* intended purpose into Annex III changes high-risk provider status. Two
tests, two objects, two registry fields.

### The Code of Practice and enforcement

The General-Purpose AI Code of Practice was published on 10 July 2025. Its Transparency and Copyright
chapters apply to all GPAI providers, its Safety and Security chapter only to systemic-risk models,
and the Commission and the AI Board confirmed it as an adequate voluntary tool [8]. Providers may
rely on it until a harmonised standard exists; non-signatories must show adequate alternative means
(`Arts. 53(4)`, `55(2)`) [1]. GPAI obligations have applied since 2 Aug 2025, Commission fines under
`Art. 101` since 2 Aug 2026, and models placed on the market before 2 Aug 2025 must comply by 2 Aug
2027 (`Art. 111(3)`) [1][7].

## High-risk requirements (Articles 8 to 15)

Article 8 requires a high-risk system to meet Section 2 of Chapter III, taking into account its
intended purpose and the state of the art [1]. The requirements are design duties on the provider. In
one table, with the artefact that evidences each:

| Article | Requirement in one line | Artefact | Layer |
|---|---|---|---|
| `Art. 9` | A risk management system run as a continuous, iterative process over the lifecycle, including testing and reasonably foreseeable misuse | Risk register as code, linked to eval results and the FRIA | 1 · 3 |
| `Art. 10` | Training, validation and testing data that are relevant, sufficiently representative and, as far as possible, free of errors and complete; bias examined and mitigated | Data cards, lineage, bias and quality tests in CI | 2 · 3 |
| `Art. 11` | Technical documentation (Annex IV) before placing on the market, kept up to date; a simplified form for SMEs and SMCs | AIBOM; generated technical documentation; model card | 2 |
| `Art. 12` | Automatic recording of events over the system's lifetime, for traceability | Structured, tamper-evident event logs and traces | 4 |
| `Art. 13` | Instructions for use for deployers, including declared accuracy, limitations and oversight measures | Instructions for use as code; model card | 2 |
| `Art. 14` | Human oversight: people can understand, monitor, stay aware of automation bias, interpret, override and stop the system | Human-in-the-loop checkpoints; override path; kill switch | 4 |
| `Art. 15` | Accuracy, robustness and cybersecurity across the lifecycle, including defences against poisoning, adversarial examples and confidentiality attacks | Eval gate; red-team suite; security controls | 3 · 4 |

The requirements are in the Act [1]; the SME and SMC form in `Art. 11(1)` is an Omnibus addition [2].
Chapter 14 builds [the technical file](/bok/governing-development#the-technical-file) from pipeline
records.
`Art. 14(5)` adds two-person verification before acting on a remote biometric identification, with
exceptions in law enforcement, migration, border control and asylum [1]; see
[designing human oversight](/bok/the-stack#designing-human-oversight-article-14) and the
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). A high-risk system within the
Cyber Resilience Act that fulfils the conditions of its Article 12(1) is deemed to meet the `Art. 15`
cybersecurity requirement (`Art. 42(3)`) [2], so one security evidence pack can serve both regimes.

## Provider duties beyond the requirements

### Article 16 and the quality management system (Article 17)

Article 16 is the umbrella for the provider's duties: the requirements, name on the system, QMS,
documentation, logs, conformity assessment, declaration, CE marking, registration, corrective action,
cooperation and accessibility [1]. Chapter 08 breaks it out article by article.

The QMS must be documented as written policies, procedures and instructions covering at least 13
aspects, from a compliance strategy with change management, design control, testing and data
management to the `Art. 9` risk system, post-market monitoring, incident reporting, record-keeping
and an accountability framework (`Art. 17(1)`) [1]. It is proportionate to the provider's size, which
the Omnibus now spells out for SMEs and SMCs without lowering the required rigour, and SMEs without
partner or linked enterprises may meet certain elements in a simplified way (`Arts. 17(2)`, `63`)
[2]. Read as an engineer, the QMS is the pipeline plus its records: versioned policies, change
control and the gates that run on every release. The Article 17 standard is published but not cited
in the Official Journal, and ISO/IEC 42001 is not the Article 17 QMS (see
[chapter 08](/bok/regulatory-map#what-is-not-harmonised-yet), and chapter 22 on
[harmonised standards and the presumption of conformity](/bok/principles-and-standards#how-presumption-of-conformity-works)).
Where the Act and the voluntary instruments overlap, and where they do not, is laid out topic by
topic in [ISO 42001 vs EU AI Act](/resources/crosswalk/iso-42001-vs-eu-ai-act) and
[NIST AI RMF vs EU AI Act](/resources/crosswalk/nist-ai-rmf-vs-eu-ai-act).

### Conformity assessment, declaration, marking and registration

Annex III points 2 to 8 use internal control (Annex VI) with no notified body; biometrics (point 1)
may use internal control only where harmonised standards or common specifications were applied in
full, and otherwise need a notified body (Annex VII) (`Art. 43(1)`, `43(2)`) [1]. Annex I, Section A
products follow the sectoral procedure, which now expressly includes the Section 2 requirements and
a QMS assessment; their notified bodies must apply for designation under the Act by 28 Jan 2028
(`Art. 43(3)`) [2]. A substantial modification triggers a new assessment (`Art. 43(4)`) [1].

The provider then draws up the EU declaration of conformity (`Art. 47`), affixes the CE marking
(`Art. 48`) and registers the system in the EU database (`Arts. 49`, `71`) [1]. Documentation is
kept for 10 years (`Art. 18`) and logs for at least six months (`Art. 19`) [1]. Each is an output of
the pipeline: the declaration is generated from the evidence that the gates passed, and the
registration record is pushed from the registry.

### Post-market monitoring and serious incidents (Articles 72 and 73)

The provider runs a post-market monitoring system that actively collects and analyses performance
data, including from deployers, to evaluate continuous compliance (`Art. 72(1)`, `72(2)`) [1]. Its
plan is part of the Annex IV documentation, and the Omnibus replaced the overdue implementing act with
Commission guidance and a template due by 2 Sep 2027 (`Art. 72(3)`) [2].
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) is the
monitoring system; the plan is its versioned configuration.

Serious incidents are reported to the market surveillance authority immediately after a causal link,
or its reasonable likelihood, is established, and in any event on the `Art. 73` clocks, each counted
from when the provider (or deployer) becomes aware of the incident: 15 days in general, two days for
a widespread infringement or a serious and irreversible disruption of the management or operation of
critical infrastructure (`Art. 3(49)(b)`), and 10 days after a death [1]. Chapter 08 holds the [reporting-clock table](/bok/regulatory-map#eu-ai-act-post-omnibus);
chapter 17 treats [incidents](/bok/incidents#the-overlapping-clocks) end to end. Providers of high-risk systems under the AI
Office's direct competence report to the AI Office instead (`Art. 75(1a)`) [2].

## Who you are in the value chain

### The EU operator roles

The Act binds **operators** (`Art. 3(8)`): providers, product manufacturers, deployers, authorised
representatives, importers and distributors [1]. The GPAI chapter adds the GPAI provider and the
downstream provider. The table puts each role in the engineer's terms: what it produces and what it
must collect from someone else.

| Role | Who it is (own words) | Core duties | Evidence it produces | Evidence it collects |
|---|---|---|---|---|
| Provider (`Art. 3(3)`) | Develops an AI system or GPAI model, or has one developed, and places it on the market or into service under its own name | `Arts. 8` to `17`, `43` to `49`, `72`, `73`; `50(1)`, `50(2)` | Technical documentation, QMS records, eval results, declaration | Upstream model information; `Art. 25(4)` agreements |
| Deployer (`Art. 3(4)`) | Uses an AI system under its authority, other than for personal, non-professional use | `Arts. 26`, `27`, `50(3)`, `50(4)`, `86` | Use logs, oversight roster, FRIA, notices | Instructions for use, declaration, registration id |
| Importer (`Art. 3(6)`) | EU-based; places on the market a system bearing a non-EU provider's name | `Art. 23`: verify the provider's assessment, documents and marking; keep copies 10 years | Import verification record | Certificate, declaration, instructions |
| Distributor (`Art. 3(7)`) | Makes a system available without being its provider or importer | `Art. 24`: verify marking and documents; hold back non-conforming systems | Distribution check record | The same set |
| Authorised representative (`Art. 3(5)`) | EU-based, with a written mandate from a non-EU provider | `Arts. 22`, `54`: verify, keep documents 10 years, cooperate, end the mandate on breach | Mandate; document copies | Everything from the provider |
| Product manufacturer (`Art. 25(3)`) | Places a high-risk safety component with its Annex I, Section A product under its own name | Provider duties (`Art. 16`) | As a provider | Supplier documentation |
| GPAI provider (`Art. 53`) | The provider of a GPAI model | `Arts. 53` to `55` | Model documentation, training summary, copyright policy | Data provenance and licences |
| Downstream provider (`Art. 3(68)`) | Integrates an AI model, its own or a third party's, into an AI system | Provider duties for the system | System documentation | Annex XII information |

The duties are in `Arts. 16` to `27` and `53` to `55` [1]. The **affected person** is in scope
(`Art. 2(1)(g)`) as a holder of protections, not duties [1].

### Article 25: when someone else becomes the provider

A distributor, importer, deployer or other third party becomes the provider of a high-risk system,
with all of the `Art. 16` duties, in three cases (`Art. 25(1)`) [1]:

1. it puts its name or trademark on a high-risk system already on the market, subject to contracts
   allocating the obligations otherwise;
2. it makes a substantial modification to a high-risk system that stays high-risk;
3. it changes the intended purpose of a system that was not high-risk, including a general-purpose
   AI system, so that it becomes high-risk.

A **substantial modification** is an unplanned change after placing on the market that affects
compliance or changes the assessed intended purpose (`Art. 3(23)`) [1]. When a trigger fires, the
initial provider stops being the provider of that system but must cooperate with the new one; the
Omnibus now spells out that this means documentation sufficient to assess compliance, known
limitations and failure modes, and targeted technical access for testing, unless the initial
provider had clearly excluded any change into a high-risk system (`Art. 25(2)`) [2]. High-risk
providers and their suppliers of systems, models, tools and
components must fix the information and access needed in a written agreement (`Art. 25(4)`), and
breaches of both paragraphs are now fined in the middle tier (`Art. 99(4)(da)`) [2].

In the pipeline the three triggers are detectable events: a white-label or brand change, a retrain
that touches conformity, and a configuration change that moves `intended_purpose` into an Annex III
value. Each should fire a role re-assessment and a
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) ticket
(see [third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

> **Example (illustrative)**
> An HR team configures a general-purpose chat assistant, which it deploys under a vendor licence, to
> rank job applicants. The configuration moves the intended purpose into Annex III, point 4(a), so
> under `Art. 25(1)(c)` the organisation becomes the provider of a high-risk system: `Arts. 8` to `17`,
> conformity assessment and registration are now its duties. Whether it starts with anything depends
> on the contract. If the vendor did not exclude high-risk use, `Art. 25(2)` obliges it to hand over
> documentation, known limitations and test access. If it did exclude it, the organisation builds the
> evidence alone. The exclusion clause in the vendor terms sets the size of the evidence budget.

### Roles name tasks, not organisations

A role attaches to an activity on a specific system, not to a company. A bank is the provider of the
credit model it built, the deployer of that model in its branches ("putting into service" includes
own use, `Art. 3(11)` [1]) and the deployer of a vendor's chatbot. So the registry records roles per
system, as a list: `["provider", "deployer"]` for an in-house system, `["deployer"]` for a procured
one.

### The same roles across regimes

The words differ across laws; the tasks rarely do. The mapping column is this chapter's reading, not a
legal equivalence.

| Regime | Role | What it covers (own words) | Nearest EU role (our mapping) |
|---|---|---|---|
| EU AI Act [1] | Provider; deployer; importer; distributor; authorised representative; product manufacturer | As in the table above | Reference point |
| Colorado SB 26-189 [10] | Developer | Builds decision-making technology used in consequential decisions; documents it for deployers | Provider |
| Colorado SB 26-189 [10] | Deployer | Uses it in consequential decisions; gives consumer notice; keeps records at least three years | Deployer |
| Texas HB 149 (TRAIGA) [11] | Developer | Develops an AI system offered or provided in Texas | Provider |
| Texas HB 149 (TRAIGA) [11] | Deployer | Deploys an AI system for use in Texas | Deployer |
| Korea AI Basic Act [12] | AI development business operator | Develops and provides AI | Provider |
| Korea AI Basic Act [12] | AI utilisation business operator | Offers products or services built on AI from a development operator | Downstream provider or deployer |
| Korea AI Basic Act [12] | User; affected person | Receives the service; has life, safety or rights significantly affected | Protected, not a duty holder |
| ISO/IEC 22989 [13] | AI provider, producer, customer, partner, subject; relevant authorities (verify) | Vocabulary roles, not legal duties | Useful in contracts |

Colorado's law was signed on 14 May 2026 and its duties apply from 1 Jan 2027 [10]. The Korean Act
(version in force since 21 July 2026) reaches acts abroad that affect the Korean market or users and
requires a domestic representative for foreign operators above decree thresholds (`Arts. 4`, `36`)
[12]. The ISO/IEC 22989 list and its clause (5.19) are marked for verification [13]. See
[chapter 08](/bok/regulatory-map#us-federal-and-state-laws) and
[AI laws worldwide](/bok/ai-laws-worldwide#comparing-the-regimes) for these regimes in context.

## Deployer duties (Article 26)

Article 26 is the deployer's list for high-risk systems. Broken into sub-duties, each has an artefact
[1]:

| Sub-duty | Para. | Artefact | Layer |
|---|---|---|---|
| Use it according to the instructions for use | `26(1)` | Deployment config pinned to the instructions; policy check at deploy | 1 · 2 |
| Assign competent, trained, empowered overseers | `26(2)` | Oversight roster linked to training records; human-in-the-loop gate | 4 · 5 |
| Keep input data relevant and representative, where you control it | `26(4)` | Input-data checks; deployment data card | 2 · 3 |
| Monitor; inform the provider; suspend on risk; report serious incidents | `26(5)` | Monitoring hooks; suspension switch; incident pipeline | 4 · 5 |
| Keep logs at least six months | `26(6)` | Log-retention policy as code | 4 |
| Inform workers and their representatives before workplace use | `26(7)` | Notice and consultation record | 2 |
| Public bodies: register the use; never use unregistered systems | `26(8)` | Registry synced with the EU database id | 2 |
| Feed the provider's `Art. 13` information into the DPIA | `26(9)` | DPIA cross-referencing the instructions | 1 · 2 |
| Post-remote biometric identification: authorisation, logging, reports | `26(10)` | Authorisation record; per-use log | 5 |
| Tell people subject to Annex III decisions | `26(11)` | [Decision notice](/patterns/decision-notice-contest-path) at the point of decision | 2 · 4 |
| Cooperate with authorities | `26(12)` | Evidence export on request | 5 |

Financial institutions meet the monitoring and log duties through their financial-services
governance rules [1]. The deployer's view of procured systems is developed in
[governing deployment](/bok/governing-deployment#operating-the-system).

> **In practice (illustrative)**
> In a large telco, the deployer duties stopped being a questionnaire once each became a registry
> field with an owner. `oversight_roster` pointed at named people whose literacy training was current;
> `log_retention_days` was checked against the six-month floor by a policy test; `worker_notice_ref`
> linked to the consultation record before a workplace tool could be switched on. The audit question
> "show me your Article 26 controls for this system" became one registry query per system.

## Fundamental rights impact assessment (Article 27)

**Who.** Before deploying an Annex III system (except point 2, critical infrastructure), a FRIA is
required from deployers that are bodies governed by public law or private entities providing public
services, and from deployers of credit scoring (point 5(b)) and life and health insurance pricing
(point 5(c)) [1].

**When.** Before first use; the deployer may rely on earlier FRIAs or on the provider's impact
assessment in similar cases, and must update it when an element changes (`Art. 27(2)`) [1].

**What.** The deployer's processes that use the system; the period and frequency of use; the
categories of people affected; the specific risks of harm to them, using the provider's `Art. 13`
information; the human oversight measures; and the measures if risks materialise, including internal
governance and complaint mechanisms (`Art. 27(1)(a)` to `(f)`) [1].

**Then.** The deployer notifies the market surveillance authority of the results on the AI Office
template (`Art. 27(3)`) [1]. After the Omnibus, it may cross-reference or include the relevant DPIA
sections, and the template must allow for that (`Art. 27(4)`, `27(5)`) [2]. The duty applies from 2
Dec 2027 with the Annex III regime [2]. Build it as
[FRIA-as-Code](/patterns/fria-as-code): a versioned record generated from the registry,
the instructions for use and the DPIA, so an update is a diff, not a rewrite.

## Explanation and notice to affected people

**The right to explanation (`Art. 86`).** A person subject to a deployer's decision based on the
output of an Annex III high-risk system (except point 2), which produces legal effects or similarly
significant effects that the person considers adverse to their health, safety or fundamental rights,
may obtain "clear and meaningful explanations of the role of the AI system in the decision-making
procedure and the main elements of the decision taken" [1]. The right yields to exceptions in Union or
national law and applies only where Union law does not already provide it [1], which is why it has to
be read with GDPR rights on automated decisions (see [privacy and AI](/bok/privacy-and-ai#the-regimes-side-by-side)).

The artefact is an [**explanation record**](/patterns/explanation-artefact) per decision: system and model version, the inputs or
reason codes behind the output, whether the output was determinative or advisory, and the human who
decided; methods are in [fairness and explainability](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records),
with what the [right to explanation (Art. 86)](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
asks of the content. On timing,
`Art. 86` sits in Chapter IX, which applies from 2 Aug 2026, but it has work to do only once Annex
III systems are regulated from 2 Dec 2027. That is this chapter's reading; confirm it with counsel
(verify).

**The other notices.** Workers before workplace use (`Art. 26(7)`); people subject to Annex III
decisions (`Art. 26(11)`); people exposed to emotion recognition or biometric categorisation
(`Art. 50(3)`); and anyone facing a deep fake (`Art. 50(4)`) [1]. Any person may complain to a market
surveillance authority (`Art. 85`), and whistleblowers reporting breaches of the Act are protected
under Directive (EU) 2019/1937 (`Art. 87`) [1].

## AI literacy and bias-detection data

**AI literacy (`Art. 4`).** Since 27 July 2026, providers and deployers must "take measures to
support the development of AI literacy" of their staff and others operating or using AI systems on
their behalf, considering their knowledge, the context of use and the people affected, without having
to guarantee any specific level [2]. It binds every provider and deployer on every rung. The artefact
is a role-based literacy programme whose completion records are keyed to registry roles, so no one
is rostered as an `Art. 26(2)` overseer without a current record.

**Bias-detection data (`Art. 4a`).** Providers of high-risk systems may exceptionally process special
categories of personal data where strictly necessary for bias detection and correction, if other
data (including synthetic or anonymised data) would not work, the data are pseudonymised, secured,
access-controlled and never passed on, they are deleted once the bias is corrected, and the records
of processing say why [2]. `Art. 4a(2)` extends the basis to other AI systems and models and to
deployers of high-risk systems, without creating a duty [2]. The artefact is a controlled enclave
with access logs and automatic deletion (see
[data governance across the stack](/bok/the-stack#data-governance-across-the-stack)).

## Sandboxes and real-world testing

**Sandboxes (`Arts. 57` to `59`).** Each Member State must have at least one national AI regulatory
sandbox operational by 2 Aug 2027, a date the Omnibus moved from 2 Aug 2026 [1][2]. The AI Office may
run a Union-level sandbox for the systems under its direct competence, with priority for SMEs and
SMCs, and a sandbox plan may include real-world testing [2]. `Art. 59` sets the conditions for
further processing of personal data in a sandbox for public-interest systems [1].

**Real-world testing (`Arts. 60`, `60a`, `61`).** Providers may test Annex III systems, and after the
Omnibus Annex I, Section A systems, in real-world conditions outside a sandbox [2]. The conditions
include a plan approved by the market surveillance authority, registration with a Union-wide
identification number, a maximum of six months extendable by six, informed consent that is dated and
documented, effective oversight, outputs that can be reversed, and `Art. 73` reporting of serious
incidents [1]. Member States may allow testing of Annex I, Section B products under national
frameworks (`Art. 60a`) [2]. A real-world test is a production system with extra evidence: a plan as
code, consent records, a reversal path and incident hooks.

## Governance and enforcement

### Who supervises what

| Body | Level | Role | Basis |
|---|---|---|---|
| AI Office | Union | Commission function; supervises GPAI models, codes and templates and, after the Omnibus, some AI systems | `Arts. 3(47)`, `64`, `75`, `88` to `94` |
| European AI Board | Union | One representative per Member State; EDPS observer; AI Office without a vote | `Arts. 65`, `66` |
| Advisory forum and scientific panel | Union | Stakeholder expertise; independent experts who can raise qualified alerts on GPAI systemic risk | `Arts. 67`, `68`, `90` |
| National competent authorities | National | At least one notifying authority and one market surveillance authority, with a single point of contact | `Art. 70` |
| Market surveillance authorities | National | Enforce AI-system rules with Regulation (EU) 2019/1020 powers and source-code access on reasoned request | `Art. 74` |
| Notified bodies | Designated | Third-party conformity assessment, scoped by Annex XIV codes | `Arts. 28` to `39` |
| Fundamental-rights bodies | National | Obtain documentation through the market surveillance authority | `Art. 77` |

Market surveillance follows the sector [1]: product authorities for Annex I, Section A systems
(`Art. 74(3)`), financial supervisors for regulated financial institutions (`Art. 74(6)`), and data
protection or other designated authorities for biometrics in law enforcement, border management and
justice and for Annex III points 6 to 8 (`Art. 74(8)`). The Annex XIV codes and the `Art. 77` rules
are Omnibus text [2].

### The AI Office's direct powers (Articles 75 and 75a to 75d)

The Omnibus made the AI Office exclusively competent for two groups of AI systems [2]: systems built
on a GPAI model by the same provider or undertaking (except Annex I products, Annex III point 2,
justice systems under point 8, and law-enforcement, border and financial systems under
`Art. 74(6)`), and systems that are or sit
inside designated very large online platforms or search engines. The competence covers providers,
and deployers only within the same undertaking [2].

Articles 75a to 75d give the AI Office investigations, information requests, inspections, orders to
give access and explanations and to retain data (`Art. 75a`); binding commitments (`Art. 75b`);
non-compliance decisions with `Art. 99` fines and periodic penalty payments of up to 5% of average
daily income or worldwide annual turnover per day (`Art. 75c`); and rights of defence and publication
of decisions (`Art. 75d`) [2]. They sit in Chapter IX, which applies from 2 Aug 2026 [1][2]. If you
build systems on your own GPAI model, your evidence store must answer Brussels as fast as a national
authority.

### Penalties

| Breach | Ceiling | Basis |
|---|---|---|
| Prohibited practices (`Art. 5`) | EUR 35 million or 7% of worldwide annual turnover, whichever is higher | `Art. 99(3)` |
| Operator obligations: providers (`Art. 16`), authorised representatives (`22`), importers (`23`), distributors (`24`), deployers (`26`), notified bodies, transparency (`50`); after the Omnibus also `Art. 25(2)`, `25(4)` | EUR 15 million or 3%, whichever is higher | `Art. 99(4)` |
| Incorrect, incomplete or misleading information to notified bodies or national authorities | EUR 7.5 million or 1%, whichever is higher | `Art. 99(5)` |
| SMEs and start-ups; after the Omnibus, SMCs for the two lower tiers | The lower of the amount and the percentage | `Art. 99(6)`, `99(6a)` |
| GPAI providers, for intentional or negligent breaches | 3% or EUR 15 million, whichever is higher, by Commission decision | `Art. 101` |
| Systems under the AI Office's direct competence | `Art. 99` levels, plus periodic penalty payments | `Art. 75c` |

The tiers are in `Arts. 99` and `101` [1], with the Omnibus additions in `Arts. 75c`, `99(4)(da)` and
`99(6a)` [2]. Member States decide whether and how public bodies are fined (`Art. 99(8)`) [1]. Two of
the factors authorities weigh are the degree of responsibility "taking into account the technical and
organisational measures implemented" and whether the operator notified the infringement itself
(`Art. 99(7)(g)`, `(h)`) [1]. Your evidence is also your mitigation argument.

## The post-Omnibus timeline

| Date | What applies | Basis |
|---|---|---|
| 2024-08-01 | The Act enters into force | `Art. 113` [1][2] |
| 2025-02-02 | Chapters I and II: definitions, AI literacy and the original prohibitions | `Art. 113(a)` [1] |
| 2025-08-02 | Notified-body rules, GPAI obligations, governance, penalties (except `Art. 101`) and confidentiality; national contact points published | `Art. 113(b)`, `Art. 70(2)` [1] |
| 2026-07-27 | Omnibus in force: reworded `Art. 4`, new `Art. 4a`, amendments to other acts (`Arts. 102` to `110`) | Omnibus `Art. 4`; `Art. 113(d)` [2] |
| 2026-08-02 | General application: `Art. 50` transparency, Commission fines on GPAI providers, Chapter VI measures including real-world testing, and the enforcement chapter including `Arts. 75a` to `75d` | `Art. 113` [1][2] |
| 2026-12-02 | New prohibitions `Art. 5(1)(ba)` and `(bb)`; `Art. 50(2)` marking for generative systems placed before 2026-08-02 | `Art. 113(a)`, `Art. 111(4)` [2] |
| 2027-08-02 | GPAI models placed before 2025-08-02 must comply; national sandboxes operational; delegated acts limiting duties for Annex I, Section A products due | `Arts. 111(3)`, `57(1)`, `2(13)` [1][2] |
| 2027-09-02 | Commission guidance and template for the post-market monitoring plan due | `Art. 72(3)` [2] |
| 2027-12-02 | High-risk, Annex III: classification, requirements, provider and deployer duties, FRIA | `Art. 113(c)(i)` [2] |
| 2028-01-28 | Annex I, Section A notified bodies apply for designation under the Act | `Art. 43(3)` [2] |
| 2028-08-02 | High-risk, Annex I (`Art. 6(1)`) | `Art. 113(c)(ii)` [2] |
| 2030-08-02 | Legacy high-risk systems intended for use by public authorities must comply | `Art. 111(2)` [2] |
| 2030-12-31 | Components of Annex X large-scale IT systems placed before 2027-08-02 must comply | `Art. 111(1)` [1] |

Other high-risk systems already on the market before the Chapter III date fall under the Act only if
their design changes significantly after that date (`Art. 111(2)` as amended) [2]. "Significant
change in design" is therefore an event the pipeline should log, with the reasoning, every time a
legacy system is modified.

## What you can do this week

1. **Add three fields to every registry entry:** `eu_roles` (a list, per system), `risk_rung` with
   the article that put it there, and `output_used_in_eu`. Run
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) to find the systems that have no
   entry.
2. **Write the classification decision record** for every Annex III candidate, with the `Art. 6(3)`
   condition relied on and the profiling flag stated explicitly, and store it next to the system.
   The [AI Act triage](/toolkit/ai-act-triage) drafts one against the
   [schema](/schemas/classification-decision-record.v1.json).
3. **Gate the 2 Dec 2026 prohibitions.** Put `Art. 5(1)(ba)` and `(bb)` in the intake denylist and add
   an adversarial suite for any image, video or voice generator to the eval gate before that date.
4. **Read your vendor terms for `Art. 25`.** Find the clause that excludes high-risk use and the
   written agreement under `Art. 25(4)`; open a due-diligence ticket wherever a high-risk component
   has neither.
5. **Test the `Art. 50` surfaces that are already live.** Check that every chat interface discloses
   AI use and every generator marks its output, and file the passing check as evidence.

**Maps to:** EU AI Act `Arts. 2`, `3`, `4`, `4a`, `5`, `6`, `8` to `27`, `43` to `50`, `51` to `57`,
`60` to `61`, `72` to `75d`, `86`, `99`, `101`, `111`, `113` (as amended by Regulation (EU)
2026/1744) · GPAI Code of Practice · Code of Practice on Transparency of AI-generated Content ·
Colorado SB 26-189 · Texas HB 149 · Korea AI Basic Act · ISO/IEC 22989 · all five stack layers.
Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (original text: Arts. 2, 3, 5 to 27, 43, 49 to 61, 64 to 75, 85 to 87, 99, 101, 111, 113; Annexes I, III, VIII). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230; OJ L, 2026/1744, 24.7.2026; in force on the third day after publication (amended Arts. 2, 3(14), 4, 4a, 5, 6, 10, 11, 17, 25, 27, 42, 43, 50, 56, 57, 60, 60a, 63, 72, 75, 75a to 75d, 77, 99, 111, 113; Annexes I, VIII, XIV). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (seven elements; four out-of-scope families; non-binding; formal text C(2025) 5053 final). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[4] Commission Guidelines on prohibited artificial intelligence practices, as defined by the AI Act (non-binding; authoritative interpretation reserved to the CJEU). European Commission. 2025-02-04. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act (verified: primary)
[5] Draft Commission guidelines on the classification of high-risk AI systems (Art. 6; Annex I and Annex III sections; practical examples; draft for targeted consultation). European Commission. 2026-05-19. https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems (verified: primary)
[6] Guidelines for providers and deployers of AI high-risk systems (policy page: classification guidelines still in draft, consultation open until 23 July 2026; application dates 2 Dec 2027 and 2 Aug 2028). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems (verified: primary)
[7] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; 10^23 FLOP indicative criterion; one-third modification criterion; monetisation; notification within two weeks; fines from 2 Aug 2026). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[8] The General-Purpose AI Code of Practice (published 10 July 2025; Transparency, Copyright, and Safety and Security chapters; confirmed as an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[9] Code of Practice on Transparency of AI-generated Content (final version 10 June 2026; provider marking and detection, deployer labelling; confirmed as an adequate voluntary tool; Art. 50 guidelines: draft 8 May 2026, final 20 July 2026). European Commission. 2026-06-10. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content (verified: primary)
[10] SB26-189 Automated Decision-Making Technology (signed 14 May 2026; developer and deployer duties; covered technology from 1 Jan 2027; deployer records kept at least three years). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[11] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text (Sec. 552.001 definitions of developer and deployer). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[12] Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 21311 as amended 20 Jan 2026, version in force 21 Jul 2026 (Art. 2(7) to (9) roles; Art. 4 reach; Arts. 31 to 36 duties and domestic representative). Korea Ministry of Government Legislation (law.go.kr). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791 (verified: primary)
[13] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (edition 1; AI stakeholder roles). ISO/IEC JTC 1/SC 42. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[14] Guidelines on transparency obligations for providers and deployers of AI systems (Art. 50; final text after the draft of 8 May 2026; obligations apply from 2 Aug 2026). European Commission. 2026-07-20. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems (verified: primary)
