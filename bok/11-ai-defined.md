# 11. AI, defined for governance

> What an AI system is for governance purposes: the definitions that set scope, the kinds of AI and
> the traits that break classic governance, each turned into a registry field, a control and
> evidence.

A governance function cannot govern what it has not defined. Before a registry can list AI systems,
before an intake can classify them and before a policy can bind them, someone has to decide which
systems count. That decision is not a glossary exercise. It is the first control in the stack: it
decides what enters the **agent registry** (layer 02), which obligations the intake routes a system
to, and which systems are left outside every other control in this book. Get it wrong in one
direction and a scoring model escapes review because someone called it "just statistics". Get it
wrong in the other and the registry fills with spreadsheet macros, the signal drowns and the owners
stop reading it.

This chapter compares the four definitions that set scope, turns each of their elements into a
registry field, separates AI from deterministic software, sorts the kinds of AI by the controls they
change and names the traits that make classic IT governance fail. It closes with two things usually
left as prose: governing probabilistic outputs, and tracing the published responsible-AI principle
sets to artefacts. It is not a machine-learning primer: a technique matters here only when it
changes a control, an owner or a piece of evidence.

## Why the definition is a control

Two decisions sit at the front of every intake, and they are different decisions. The first is
**definitional**: is this an AI system at all? The second is **classificatory**: given that it is,
which obligations and which controls apply? Most law and most governance programmes treat the first
as a gate to the second. Under the EU AI Act the definition is literally the scope of the
regulation: the Act applies only to systems that meet the definition in Article 3(1), and that
definition has applied since 2 Feb 2025 [1]. The same Commission guidance is careful to add that
"the vast majority of systems, even if they qualify as AI systems", will carry no obligations under
the Act [1]. So a system can be inside the definition and outside every duty; a governance engineer
needs both answers, recorded separately, with the reasoning attached.

Treat the definitional answer as a control like any other in this book. It has an owner (the [intake
workflow](/bok/the-role#intake-and-classification)). It runs at the earliest point it can block: at
intake, not at the pre-launch review. It leaves evidence: a decision record naming the definition
applied, the elements found, who or what decided and when. And it is revisited when the system
changes, because a rules engine that gains a learned component crosses the line without anyone
filing a ticket.

> **In practice (illustrative)**
> In a large telco, the first intake pass asked teams to self-declare "AI or not". Self-declaration
> produced both failure modes at once: a churn-propensity model registered as "analytics" and a
> keyword-routing macro registered as "AI". Replacing the yes/no question with the element questions
> below, each answered in the registry with a one-line reason, moved the decision from opinion to
> record. Disagreements became diffs on the decision record, reviewed like any other change.

## Four definitions, compared

Four texts set scope for most organisations: the OECD definition, the EU AI Act definition with the
Commission's guidance on it, ISO/IEC 22989 and NIST AI 100-1. They are closer than their authors'
jurisdictions suggest, by design, and the differences that remain are exactly the ones that change a
scoping decision.

### The OECD definition (2023 revision)

Chapter 22 places [the OECD definition and lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle)
in the wider OECD instruments. The OECD Council revised its definition on 8 Nov 2023, ahead of the
wider five-year review of the AI
Principles, partly to support alignment with definitions then being written in the EU, Japan and
elsewhere [2][3]. It now reads: "An AI system is a machine-based system that, for explicit or
implicit objectives, infers, from the input it receives, how to generate outputs such as
predictions, content, recommendations, or decisions that can influence physical or virtual
environments. Different AI systems vary in their levels of autonomy and adaptiveness after
deployment." [3]

Against the 2019 text, the revision made four changes that matter to scope: it dropped
"human-defined" from the objectives (objectives may now be implicit), it made **inference** the
defining act, it added **content** as an output (the generative case) and it added **adaptiveness**
after deployment [3]. Its explanatory memorandum (which is not part of the Recommendation) reads
autonomy as the degree to which a system can "learn or act without human involvement" once people
have delegated to it, and adaptiveness as the continued change of machine-learning systems after
initial development, such as a speech recogniser adapting to one voice [3].

### EU AI Act Article 3(1) and the Commission guidelines

Chapter 18 sets [the legal definition of an AI system](/bok/eu-ai-act#what-counts-as-an-ai-system)
in the Act's scope. Article 3(1) of the AI Act follows the OECD text closely: "'AI system' means a machine-based system
that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after
deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how
to generate outputs such as predictions, content, recommendations, or decisions that can influence
physical or virtual environments" [4]. Recital 12 explains the intent: the definition should
distinguish AI from "simpler traditional software systems or programming approaches" and should not
cover systems based on rules defined solely by natural persons to execute operations automatically
[5]. The techniques that enable inference include machine learning and "logic- and knowledge-based
approaches" [5].

The Commission's guidelines on the definition break it into seven elements: (1) a machine-based
system; (2) designed to operate with varying levels of autonomy; (3) that may exhibit adaptiveness
after deployment; (4) for explicit or implicit objectives; (5) infers, from the input it receives,
how to generate outputs; (6) such as predictions, content, recommendations or decisions; (7) that
can influence physical or virtual environments [1]. Five of their readings change how an intake
should work:

- **Inference is the indispensable condition**; the guidelines call it "a key, indispensable
  condition that distinguishes AI systems from other types of systems" [1].
- **Autonomy is necessary but the bar is low.** Only systems designed to operate "solely with full
  manual human involvement and intervention" are excluded; a system that produces an output from
  manually supplied input without that output being specified by a human already has "some degree of
  independence of action" [1].
- **Adaptiveness is optional.** The word "may" makes self-learning after deployment "a facultative
  and thus not a decisive condition" [1]. A frozen model is still an AI system.
- **Objectives are not the intended purpose.** Objectives are internal to the system; the intended
  purpose (Art. 3(12)) is the external context of use [1], and context is what a risk tier is built
  on.
- **The elements need not all be present in both phases.** The definition takes a lifecycle view:
  some elements may appear in the building phase and not in the use phase [1].

The guidelines also name four families that fall outside the definition despite some capacity to
infer: systems that improve or accelerate classical mathematical optimisation; **basic data
processing** (database queries, spreadsheets without AI functions, descriptive dashboards); systems
based on **classical heuristics** (a chess engine using minimax with a hand-written evaluation
function); and **simple prediction systems** whose performance a basic statistical rule could match,
such as a baseline that always predicts the historical mean [1]. They are explicit that "no
automatic determination or exhaustive lists" are possible and that each system is assessed on its
architecture and functionality [1]. They are also not binding; only the Court of Justice of the EU
can give an authoritative interpretation [1].

### ISO/IEC 22989

ISO/IEC 22989:2022 is the terminology standard the rest of the ISO/IEC AI family builds on [6]. Its
definition of an AI system (term 3.1.4) is shorter and older in shape: an engineered system whose
outputs, from content to decisions, serve objectives people set [6]. Inference and adaptiveness are
not part of it. Its most useful contribution for governance is vocabulary the other texts lack. It
separates **automation**, which varies by degree, from **autonomy**, a much stronger property it
keeps for systems that can change their own goal or domain of use with no one steering them; the
opposite of autonomy is **heteronomy**, and clause 5.13 treats the three together [6]. It also names
the stakeholder roles around an AI system (provider, producer, customer, partner, subject and
relevant authorities, clause 5.19) [6]. An amendment on generative AI was reported at final-draft
stage; its publication status as of 2026-09-24 is unconfirmed (verify) [7].

The word "autonomy" therefore means two different things across the texts. In the AI Act and the
OECD text it is a degree of independence of action, and almost every system has some. In ISO/IEC
22989 it is a strong property most deployed systems do not have. A registry that records
"autonomous: yes" has recorded nothing until it says whose sense it means.

### NIST AI 100-1

The NIST AI Risk Management Framework (NIST AI 100-1, January 2023) "refers to an AI system as an
engineered or machine-based system that can, for a given set of objectives, generate outputs such as
predictions, recommendations, or decisions influencing real or virtual environments", designed to
operate with varying levels of autonomy, and states that it adapts the 2019 OECD text and ISO/IEC
22989 [8]. It predates the OECD revision, so it has no "infers", no "content" and no adaptiveness.
Its weight for governance lies elsewhere: Appendix B lists how AI risks differ from traditional
software risks, which is the backbone of the characteristics table later in this chapter [8].

### The definitions side by side

| Element | OECD (2023) | EU AI Act Art. 3(1) | ISO/IEC 22989:2022 | NIST AI 100-1 (2023) |
|---|---|---|---|---|
| Substrate | Machine-based | Machine-based | Engineered system | Engineered or machine-based |
| Objectives | Explicit or implicit | Explicit or implicit | Human-defined | "A given set of objectives" |
| Inference | Defining act | Defining act; indispensable per guidelines | Not in the definition | Not in the definition |
| Outputs | Predictions, content, recommendations, decisions | Same four | Content, forecasts, recommendations, decisions | Predictions, recommendations, decisions |
| Effect | Physical or virtual environments | Physical or virtual environments | Not in the definition | Real or virtual environments |
| Autonomy | Varies by system | Designed for varying levels; necessary | Automation varies; autonomy is a strong, separate property | Varying levels |
| Adaptiveness | Varies by system | "May"; not decisive | Not in the definition | Not in the definition |

Sources: [3][4][1][6][8].

Two practical conclusions follow. With any EU exposure, the AI Act text read with the Commission
guidelines is the operative test, and the OECD text is its twin elsewhere. And the tests are not
interchangeable: a system that ISO/IEC 22989 or NIST vocabulary would call AI can still sit in one
of the guidelines' excluded families. Record which test you applied.

## From definition element to registry field

Each element of the definition is a question the intake asks and a field the registry keeps. The
answer to the element also drives a later decision, which is why the field earns its place: a field
no decision reads is a field no one will maintain.

| Element | Intake question | Registry field (illustrative) | Scoping or control decision it drives |
|---|---|---|---|
| Machine-based | Where does it run and who operates the runtime? | `substrate` (`cloud-api`, `self-hosted`, `on-device`, `embedded`) | Which runtime controls are even possible (layer 04); whether the product-safety route may apply |
| Objectives | What is the system optimising for? | `objective` | Which eval measures success; where reward hacking or proxy targets can hide |
| Intended purpose | In what context, for whom, is it used? | `intended_purpose` | Risk tier and obligations; the FRIA or DPIA trigger |
| Inference | Does it derive outputs by learning or by encoded knowledge, rather than by rules people wrote? | `inference_technique` (`ml.supervised`, `ml.self-supervised`, `logic-based`, `none` …) | In or out of the AI definition; which excluded family, if any |
| Outputs | Prediction, content, recommendation or decision? | `output_types` | Content: marking and disclosure analysis (Art. 50); decision: explanation and human-review duties (Art. 86, GDPR Art. 22) |
| Effect | Does it change a physical or virtual environment, and through what? | `effect_surface` (`display`, `tools`, `actuator`) | Tools: agent registry, scoped credentials; actuator: stop in a safe state |
| Autonomy | What happens between output and effect without a person? | `autonomy_level` (0–4, below) | Human-oversight design, gate placement, kill switch |
| Adaptiveness | Can behaviour change in use without a release? | `adapts_in_use`, `change_triggers` | Re-evaluation triggers; [drift monitoring](/patterns/drift-fairness-monitor); feedback-loop controls (Art. 15(4)) |

Sources for the legal hooks: [9][10][11][12].

Two rows deserve a note. Teams most often collapse **objective** into **intended purpose**. The
guidelines' own example is a corporate assistant whose objective is to answer questions over a
document set accurately and whose intended purpose is to support one department's tasks [1]. The
first tells you what to evaluate; the second tells you what the law thinks the system is for. An
unchanged model moved to a new intended purpose is, for risk purposes, a new system. And the
**outputs** row records the output *as used*: the guidelines note that a recommendation
"automatically applied" becomes a decision [1], so a model that recommends plus a pipeline that
auto-approves is, together, a decision system.

An autonomy field needs a scale. There is no standard one; the scale below is illustrative and maps
onto the oversight vocabulary of the EU High-Level Expert Group (human-in-the-loop,
human-on-the-loop, human-in-command) [13].

| Level | Name | What happens between output and effect | Oversight mode |
|---|---|---|---|
| 0 | Advisory | A person reads the output and decides | Human-in-command |
| 1 | Assisted | The system drafts; a person approves each action | Human-in-the-loop |
| 2 | Bounded action | The system acts within a declared scope; consequential actions pass a gate | In the loop for gated actions |
| 3 | Supervised autonomy | The system acts; people monitor and can stop it | Human-on-the-loop |
| 4 | Unsupervised | The system acts with no routine oversight | None routine; kill switch only |

> **Example (illustrative)**
> The scoping fields of `csa-01`, the customer-service assistant used across this book, as its
> registry entry records them. The definitional decision and the risk tier are separate records.

```yaml
id: csa-01
definition_basis: eu-ai-act-art-3-1+commission-guidelines
definition_decision: in_scope        # in_scope | out_of_scope | undecided
definition_reason: "LLM infers replies from customer messages; generates content and
  recommendations; calls tools. Not basic data processing or classical heuristics."
decided_by: intake-pipeline + ai-governance-review
decided_on: 2026-09-18
substrate: cloud-api
objective: "answer order and refund questions accurately from the knowledge base"
intended_purpose: "first-line support for retail customers in the EU"
inference_technique: [ml.self-supervised, ml.rlhf, retrieval]
output_types: [content, recommendation]
effect_surface: tools
tools: [refunds:read, orders:read]
autonomy_level: 2
adapts_in_use: false
change_triggers: [vendor-model-version, prompt-change, corpus-snapshot]
kind: [generative, rag, agentic]
```

The out-of-scope decisions matter as much as the in-scope ones. A refund-eligibility rules engine
whose every branch a person wrote gets a registry entry too, marked `out_of_scope` with the reason
("basic data processing; rules defined solely by people"). That entry is what lets you show an
auditor you looked, and what makes a later change (someone adds a learned fraud score to the engine)
visible as a diff.

## AI versus conventional software

The line between AI and conventional software is the line between behaviour someone specified and
behaviour someone induced. Recital 12 draws it in the same place: rules defined solely by people are
not AI; inference from data or from encoded knowledge is [5]. For governance, the difference is not
philosophical. Each row below is a control that classic IT governance runs and that stops working.

| Property | Conventional deterministic software | AI system | Consequence for governance |
|---|---|---|---|
| Where behaviour comes from | Rules written by people | Learned from data or inferred from encoded knowledge | Review the data and the evals, not only the code |
| Same input, same output | Yes, by construction | Not guaranteed; generative serving can vary even at temperature zero [14] | Evidence pins version and sampling settings; evals repeat |
| What "correct" means | Matches a specification | Meets an error rate on a distribution | Thresholds replace pass/fail; thresholds need owners |
| How it is tested | Unit and integration tests against the spec | Evals over samples; coverage is statistical | The eval suite is itself a governed artefact |
| What changes behaviour | A code diff | A code diff, new weights, new data, a prompt edit, a corpus refresh, a vendor update | Change management triggers on all of them |
| How it fails | A reproducible bug | A failure mode that shows up on some inputs, sometimes, at scale | Monitor rates in production, not only incidents |
| How you explain it | Read the code | Internals are not human-readable | Explanations are produced, logged and tested |

Two cautions keep the table honest. First, the boundary is legal as well as technical, and the law
draws it with some untidiness: a logic-based expert system that infers conclusions from encoded
medical knowledge is inside the AI Act definition, while a heuristic chess engine is outside it [1].
Record the reasoning, because the next reviewer will draw the line again. Second, "not AI" is not
"not governed". Deterministic automation can harm at scale on its own, and data-protection law gives
people the right not to be subject to a decision "based solely on automated processing" with legal
or similarly significant effects, whether or not any AI definition is met [11]. The definitional
decision routes a system to the AI-specific controls; it does not exempt anything else (see [Privacy
and AI](/bok/privacy-and-ai#principles-applied-to-ai)).

> **Note**
> A **model** is not a **system**, and neither is an **agent**. The AI Act defines the AI system
> (Art. 3(1)) and, separately, the general-purpose AI model (Art. 3(63)) and the general-purpose AI
> system built on one (Art. 3(66)) [4]. The registry keeps both levels and links them: one model can
> sit inside many systems, and chapter 01's [five objects of
> governance](/bok/definition#the-object-of-governance) each need their own entry.

## Kinds of AI that change the governance problem

Taxonomies of AI are plentiful. The test applied here is narrow: does knowing the kind change a
control, an owner or the evidence? Where it does not, the taxonomy is mentioned and set aside.

### By capability and by functionality

The capability ladder (narrow AI, artificial general intelligence, superintelligence) is the most
quoted and the least useful for controls. Every deployed system is narrow in the sense that matters;
there is no agreed definition of general intelligence, and research proposals to operationalise it
do so through levels of performance, generality and autonomy rather than a single threshold [15].
Law has sidestepped the question with proxies it can measure. The AI Act regulates the
**general-purpose AI model**, one that "displays significant generality" and is "capable of
competently performing a wide range of distinct tasks", including models trained on large data
"using self-supervision at scale" [4], and presumes "high impact capabilities" when training compute
exceeds 10^25 floating-point operations [16]. The Commission's GPAI guidelines add an indicative
criterion for general-purpose status itself: training compute above 10^23 FLOP and the ability to
generate language, text-to-image or text-to-video [17]. For the registry, capability therefore
becomes two measurable fields, `model_generality` and `training_compute_flop`, both usually taken
from the provider's documentation rather than measured in-house.

The functionality taxonomy (reactive machines, limited memory, theory of mind, self-awareness) comes
from a 2016 popular article [18]. Only the first two describe systems that exist, and neither maps
to a control; recognise it, but do not make it a registry field.

### By learning paradigm

The learning paradigm tells you where the behaviour came from, and so where its evidence must come
from.

| Paradigm | How it learns | Governance hazard it adds | Control that answers it |
|---|---|---|---|
| Supervised | From labelled examples | Labels encode past human decisions, their errors and their bias; proxies for protected traits | Label provenance on the data card; subgroup evals in the eval gate |
| Unsupervised | Finds structure without labels (clusters, anomalies) | No ground truth to test against; segments can track protected traits | Stability tests; human review of segment definitions before use |
| Semi-supervised | Propagates a few labels across unlabelled data | Label errors spread silently | Audit a sample of propagated labels |
| Self-supervised | Predicts parts of its own input (the next token) over large corpora | Corpus provenance, rights and memorisation are hard to trace | AIBOM with dataset provenance; the GPAI training-content summary (see [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Reinforcement, incl. from human feedback | Maximises a reward signal | **Reward hacking**: the system finds an unintended way to score [19] | Record the reward as the `objective`; evals that look for unintended strategies |
| In-context (zero- and few-shot) | Follows instructions and examples in the prompt at inference time | Behaviour changes with a prompt edit, no retraining involved | Prompts versioned as governed artefacts; eval gate on prompt change |

### By technology family

| Family | Example | What changes for governance |
|---|---|---|
| Classical machine learning | Gradient-boosted credit score on tabular data | Calibration and subgroup error dominate the eval suite |
| Deep learning | Image classifier | Opacity; adversarial inputs; heavier compute and evidence cost |
| Natural language processing | Complaint triage; LLM assistants | Text carries personal data and, for LLMs, instructions an attacker can plant |
| Computer vision | Document or face recognition | Biometric data raises special-category and prohibited-practice questions (see [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Speech | Call transcription; voice synthesis | Voice is personal data; synthetic audio must be marked (Art. 50) [9] |
| Robotics and cyber-physical | Warehouse robot | Physical effect: the stop must bring the system to a safe state (Art. 14(4)(e)) [20] |
| Logic- and knowledge-based | Expert system for diagnosis support | Inside the AI Act definition when it infers from encoded knowledge [1]; "it is only rules" is not an exemption |

### Predictive versus generative

A **predictive** (or discriminative) system outputs an estimate about something that exists: a
score, a class, a forecast. Its harms are allocation harms (a wrong or biased estimate puts a person
in the wrong queue), and its evidence is accuracy, calibration and error rates by subgroup.

A **generative** system outputs something new: text, image, audio, video, code. Its harms are
different in kind. NIST's generative AI profile lists twelve risks that generative AI creates or
worsens, among them **confabulation** ("the production of confidently stated but erroneous or false
content"), information integrity, intellectual property, data privacy, harmful bias and
homogenisation, and obscene or abusive content including synthetic child sexual abuse material [21].
The evidence changes accordingly: groundedness and refusal evals, red-teaming, output guardrails
and, under the AI Act, machine-readable marking of synthetic output [9]. One control set does not
fit both: a calibration threshold means nothing for generated text, and a groundedness eval nothing
for a credit score.

### Foundation models and GPAI

A **foundation model** is one "trained on broad data at scale" and "adaptable to a wide range of
downstream tasks" [22]. The governance fact about foundation models is inheritance: in the original
paper's words, "the defects of the foundation model are inherited by all the adapted models
downstream" [22]. Most organisations call one through an API or adapt an open-weight one, so
evidence moves from produced to collected: the provider's model card and evaluations become inputs
to your registry entry, and the version you pin becomes a change you manage (see [Third-party and
procured AI](/bok/the-stack#third-party-and-procured-ai) and the [Vendor / Model Due-Diligence
Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate)). GPAI is the AI Act's nearest legal
category, with its own duties on the model provider (see [GPAI Code of
Practice](/bok/regulatory-map#gpai-code-of-practice)).

### LLMs and SLMs

A **large language model (LLM)** is a foundation model for language, usually served from a data
centre. A **small language model (SLM)** trades breadth for size so that it can run close to the
user; one 2024 technical report describes a 3.8-billion-parameter model "small enough to be deployed
on a phone" [23]. The governance difference is where the controls live. An LLM behind an API sits
behind a gateway you control, where every call can be traced, filtered and stopped. An SLM on a
device runs where your telemetry may not reach: its guardrails ship with it, its inventory is a
fleet of devices and its kill switch is a remote flag or an app update, with the lag that implies.

### Multimodal models

A **multimodal** model takes or produces more than one modality (text, image, audio, video). Images
and audio can carry personal data the text pipeline never saw and instructions the text filters
never scanned, and synthetic images, audio and video raise the marking duties of Article 50 [9]. So
guardrails exist per modality, and the eval suite includes cross-modal cases.

### RAG systems

**Retrieval-augmented generation (RAG)** combines a model's learned ("parametric") memory with a
retrievable ("non-parametric") store of documents, originally a dense vector index [24]. Its authors
already named provenance as an open problem [24]. For governance, the corpus becomes behaviour:
change the documents and the answers change with no model change. So the corpus is governed like a
model, versioned and carded, its snapshot tied to the eval that tested it (see [data governance
across the stack](/bok/the-stack#data-governance-across-the-stack)). Retrieval also needs an
entitlement check: a RAG system that retrieves a document the user may not see has leaked it,
however polite the answer.

### Agentic systems

An **agentic system** plans and acts: it calls tools, browses, executes code and moves data under
delegated authority, often over many steps. It changes the governance problem most, because its
output is an effect in a system of record, not a recommendation a person reads. The threats are
catalogued in the OWASP Top 10 for Agentic Applications [25], and the controls are the layer 04 set:
identity, scope, tool mediation, human gates and a tested stop ([Agent Identity & Scoped
Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials), [Kill Switch / Circuit
Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker), [Human-in-the-loop
Gate](/bok/patterns#pattern-human-in-the-loop-gate)). The full treatment is in [Governing
agents](/bok/governing-agents).

### Why the type matters: the control set by kind

| Kind | Distinctive harm | Control that changes | Layer · pattern |
|---|---|---|---|
| Predictive or scoring | Wrong or biased allocation | Calibration and subgroup evals; a threshold policy with an owner | 03 · [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci); 01 · [Policy Card](/bok/patterns#pattern-policy-card) |
| Generative | Confabulation, IP, information integrity, abusive content | Groundedness and red-team evals; output guardrails; content marking | 03 · [Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite); 04 · [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) |
| Foundation or GPAI model, procured | Inherited defects; evidence you cannot produce | Due diligence; version pinning; base model in the AIBOM | 02 · [AIBOM](/bok/patterns#pattern-aibom); Vendor / Model Due-Diligence Gate |
| SLM on device | No central telemetry; update lag | Guardrails shipped with the model; device-level version inventory | 02 · [Agent Registry](/bok/patterns#pattern-agent-registry); 04 · Kill Switch |
| Multimodal | New injection and personal-data channels | Guardrails per modality; cross-modal evals; marking | 04 · Runtime Guardrail; 03 · Red-Team Suite |
| RAG | Corpus changes behaviour; retrieval leaks | Corpus as governed data; entitlement check at retrieval; groundedness evals | 02 · data card; 04 · Runtime Guardrail |
| Agentic | Actions under delegated authority | Identity, scope, human gates, tested stop | 04 · Agent Identity & Scoped Credentials; Kill Switch; Human-in-the-loop Gate |

Kinds combine. `csa-01` is generative, retrieval-augmented and agentic at once, so it carries all
three rows' controls; the registry's `kind` field is a list, not a single value.

## Eight characteristics that break classic IT governance

Classic IT governance (change management, SDLC gates, access control, the security management
system, periodic audit) assumes that behaviour is specified, a change is a code diff, a test passes
or fails against a spec, a person stands behind each consequential action and the system does today
what it did yesterday. AI breaks each assumption somewhere. NIST's Appendix B lists the ways AI risk
differs from traditional software risk, from data that may not represent the context of use, through
scale and complexity with "billions or even trillions of decision points", to "increased opacity",
drift that demands more frequent maintenance and the "inability to predict or detect the side
effects of AI-based systems beyond statistical measures" [8]. The table turns that list into the
eight characteristics an engineer has to design for.

| Characteristic | Why classic IT governance fails | What answers it (layer · pattern) | Evidence it emits |
|---|---|---|---|
| **Complexity** | The CMDB records the application; the model, datasets, prompts, retrieval corpus and tool graph inside it are invisible | 02 · AIBOM, Agent Registry | An AIBOM per build; registry links from system to model to data |
| **Opacity** | Code review assumes the logic is readable; model internals are not | 03 · behavioural evals; 02 · [Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence) | Eval results against named failure modes; logged explanations |
| **Autonomy** | Access control and segregation of duties assume a person behind each session | 04 · Agent Identity & Scoped Credentials; Human-in-the-loop Gate; Kill Switch | Identity events; gate decisions with approver; kill-switch drill records |
| **Speed and scale** | Periodic, sample-based review meets after one error has repeated a million times | 04 · Runtime Guardrail, Kill Switch / Circuit Breaker; 05 · [Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry) | Guardrail decisions; breaker trips; rollback records |
| **Probabilistic outputs** | Tests are pass/fail against a spec; a single wrong answer is a bug | 03 · Eval Gate in CI with thresholds; 01 · Policy Card per risk tier | Calibration and threshold results per version |
| **Data dependency** | Data governance protects data as records, not as the source of behaviour | 02 · data card and lineage; 03 · data-quality and subgroup tests | Data card; lineage record; test results filed against the dataset version |
| **Dual use and misuse** | Threat models centre on unauthorised access, not authorised use for a harmful end | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail; 01 · acceptable use as code | Red-team findings; misuse detections; policy verdicts |
| **Adaptivity and drift** | Change management triggers on code deploys; behaviour changes without one | 05 · Continuous Assurance Telemetry; 03 · re-run the gate on model, data or prompt change | Drift alerts against the eval baseline; re-evaluation results |

A few rows need more than a cell.

**Opacity has three sources, and each has a different fix.** Burrell distinguishes opacity as
intentional corporate or state secrecy, opacity as technical illiteracy, and opacity "that arises
from the characteristics of machine learning algorithms and the scale required to apply them
usefully" [26]. Secrecy is answered by contract and disclosure (supplier documentation, audit
rights); illiteracy by literacy and by explanations written for their reader; only the third needs
technical explanation methods and, above all, behavioural evidence. When you cannot read the
mechanism, you test the behaviour, and the eval result becomes the evidence that stands in for
inspection. Explanation techniques themselves are covered in [Fairness and
explainability](/bok/fairness-and-explainability#explanation-techniques).

**Dual use is a property of capability, not intent.** Researchers who inverted the objective of a
drug-discovery toxicity model, rewarding toxicity instead of penalising it, report that it generated
about 40,000 candidate toxic molecules in under six hours, including known nerve agents [27].
Nothing was breached; an authorised user changed an objective. That is why misuse needs its own
threat model, red-team cases for harmful uses of legitimate capability, and runtime detection, not
only perimeter security.

**Speed and scale turn a small error rate into mass harm.** A 1% error rate is a rounding error in a
quarterly review and ten thousand wrong decisions a day in a system that makes a million. So the
answers sit at runtime: a guardrail per call, a breaker that trips on a rate, a rollback tested
before it is needed.

**Adaptivity is broader than self-learning.** For systems that keep learning in use, the AI Act asks
for designs that reduce the risk of biased outputs feeding back into future inputs ("feedback
loops") [12]. But most behaviour change arrives without self-learning: a vendor updates the model
behind an API, the inputs drift, a prompt is edited, a corpus is refreshed. Retraining can also
break what worked: neural networks are prone to **catastrophic forgetting**, losing earlier
competence when trained on new tasks [28]. Each is a change event, and the eval gate runs on each.

### Contrast pairs

Four pairs are confused often enough in reviews to be worth fixing in the team's vocabulary.

| Pair | The difference | Why it matters for controls |
|---|---|---|
| **Complexity** and **opacity** | How many parts interact, against whether a person can follow the reasoning; one small neural network is simple and opaque | Complexity needs an inventory; opacity needs evals |
| **Transparency**, **explainability**, **interpretability** | In NIST's framing they answer "what happened", "how" a decision was made and "why", with its meaning to the user [8] | Three artefacts: records of what ran, an explanation method, a message the user can act on |
| **Data drift** and **concept drift** | The inputs change, against the relationship between inputs and the right answer changing | The first shows in the inputs; the second only in outcomes |
| **Privacy** and **security** | Whether processing personal data is appropriate, against whether the system resists attack | A secure system can still process data it has no right to |

## Governing probabilistic outputs

Conventional software returns an answer. Most AI returns an estimate or a sample, and someone has to
decide what to do with it. That decision is most often left to a data scientist's default, and it is
where engineering adds the most.

### A score is not a decision

A predictive model emits a score. A decision is a score, plus a threshold, plus an action taken when
the score crosses it. The threshold is where risk appetite becomes behaviour, so it is a policy
decision with an owner, a version and an effective date, not a hyperparameter left at 0.5. Write it
as a [Policy Card](/bok/patterns#pattern-policy-card) rule, test it in the eval gate and log it with
every decision it produces. When an auditor asks why an applicant was declined, "the score was 0.41
and the threshold, owned by credit risk and effective since 1 October, was 0.45" is an answer; "the
model said no" is not.

### Calibration before thresholds

A threshold only means something if the score does. A **calibrated** model's 0.9 is right about nine
times in ten. A widely cited study found that modern neural networks, unlike those of a decade
earlier, are poorly calibrated, and that a simple post-hoc fix (temperature scaling) is surprisingly
effective [29]. So calibration belongs in the eval suite as a measured property with its own
threshold (an expected calibration error bound, per version and per subgroup), re-checked when the
model or the population changes. The AI Act already points this way for high-risk systems: the
accuracy levels and "the relevant accuracy metrics" have to be declared in the instructions for use
[12]. Declared metrics become the baseline that runtime telemetry is compared against.

Where a single score is not enough, **conformal prediction** offers a disciplined alternative: it
turns any trained model's output into a set of candidate answers "guaranteed to contain the ground
truth with a user-specified probability", without assumptions about the data distribution [30]. A
large set is the model saying it is unsure, which is exactly the signal a governance rule can route
on.

### Certainty required by risk tier

The certainty a decision needs depends on what being wrong costs, so the runtime rule is set by risk
tier. Three moves recur. An **abstention band** routes scores that are neither clearly positive nor
clearly negative to a person through a [Human-in-the-loop
Gate](/bok/patterns#pattern-human-in-the-loop-gate). An **adverse-outcome rule** sends every
decision that harms the subject to review, however confident the model. An **out-of-distribution
rule** refuses or escalates inputs unlike anything the system was tested on, because a confident
score on an unfamiliar input is the least trustworthy output a model produces.

| Risk tier (illustrative) | Runtime rule | Evidence required per version | Human role |
|---|---|---|---|
| Low (internal search ranking) | Act on the top output | Aggregate accuracy on a golden set | Periodic review |
| Moderate (customer-facing assistant) | Act; abstain and hand over when groundedness or confidence falls below a floor | Groundedness, refusal and hand-over evals | On the loop: monitor and stop |
| High (decisions about people's access to jobs, credit or services) | Recommend only above a calibrated threshold; abstention band and every adverse outcome to a reviewer | Calibration and subgroup error rates; declared accuracy metrics | In the loop for the band and adverse outcomes; explanation on request |
| Not to be automated | No automatic action; output advisory at most, or the use is blocked | A policy verdict | In command |

The human role is itself a control that can degrade. Oversight under load turns into a rubber stamp,
and the AI Act asks that the people overseeing high-risk systems stay aware of "automation bias",
the tendency to over-rely on the output [20]. So the gate logs the approver, the time to decide and
the override rate, and a falling override rate is investigated, not celebrated (see [Designing human
oversight](/bok/the-stack#designing-human-oversight-article-14)).

> **Example (illustrative)**
> A threshold policy for a loan-triage model, written as a Policy Card rule. The numbers are
> illustrative; the point is that each one has an owner and an effective date and is tested in the
> gate.

```json
{ "policy_id": "decision-threshold.loan-triage.v3", "subject": "loan-triage-02",
  "risk_tier": "high", "owner": "credit-risk-product", "effective": "2026-10-01",
  "auto_approve_if": "calibrated_score >= 0.92",
  "review_band": [0.55, 0.92], "review_route": "hitl-gate.credit-review",
  "adverse_outcome": "always-human-review",
  "out_of_distribution": "escalate",
  "release_requires": ["calibration.ece <= 0.03", "subgroup.fnr_gap <= 0.02"] }
```

### Generative outputs and non-determinism

Generative systems have no single score to threshold. The controls move to properties of the output:
grounded in its sources, cited, refused when it should be, consistent across samples. Consistency
cannot be assumed. One lab reports that sending the same prompt 1,000 times to a large model at
temperature zero produced 80 distinct completions, and traces the variation to the serving stack's
batching rather than to sampling [14]. So evidence records the model version, sampling parameters
and, where the stack allows, the seed; and an eval that matters runs on several samples and reports
a rate, not a single pass.

## Responsible-AI principle sets, engineered

In this book, **principle** has a house meaning: one of the six rules of method in [chapter
03](/bok/values-and-principles#the-six-principles), phrased as something we do. The published
responsible-AI texts use the word for a normative target, a property the AI should have. This
section keeps the two apart. It calls the published ones **principle sets**, treats them as other
people's frameworks (in chapter 01's [disambiguation](/bok/definition#the-disambiguation-cluster),
ethics sets the target; engineering hits it and proves it) and asks one question of each: which
artefact evidences it, from which layer, under which house value and principle. The sets as
frameworks are treated in full in [Principles and standards](/bok/principles-and-standards#the-instruments-at-a-glance).

### Four principle sets in brief

**OECD AI Principles.** Adopted on 22 May 2019, with the definition revised on 8 Nov 2023 and the
principles on 3 May 2024, the Recommendation sets five values-based principles: inclusive growth,
sustainable development and well-being; human rights and democratic values, including fairness and
privacy; transparency and explainability; robustness, security and safety; and accountability [2].
The 2024 revision added points an engineer can act on directly: mechanisms so that AI systems that
"risk causing undue harm or exhibit undesired behaviour" can be "overridden, repaired, and/or
decommissioned safely"; attention to misuse and uses outside the intended purpose; information
integrity; and an explicit reference to environmental sustainability [2].

**UNESCO Recommendation on the Ethics of AI.** Adopted by UNESCO's 193 member states in November
2021, it sets four core values (human rights and dignity; peaceful, just and interconnected
societies; diversity and inclusiveness; environment and ecosystem flourishing) and ten principles,
from proportionality and do no harm through fairness and non-discrimination [31]. Its Ethical Impact
Assessment tool, aimed first at procurers of AI systems, assesses a specific system before and after
deployment [32].

**EU High-Level Expert Group (HLEG).** The Ethics Guidelines for Trustworthy AI (8 Apr 2019) rest on
four ethical principles (respect for human autonomy, prevention of harm, fairness, explicability)
and set seven requirements: human agency and oversight; technical robustness and safety; privacy and
data governance; transparency; diversity, non-discrimination and fairness; societal and
environmental well-being; and accountability [13]. The Assessment List for Trustworthy AI (ALTAI, 17
Jul 2020) turns the seven into a self-assessment checklist [33], and AI Act Recital 27 points back
to the same seven as non-binding principles that complement the Act [34].

**G7 Hiroshima Process.** The International Guiding Principles for Organizations Developing Advanced
AI Systems (30 Oct 2023), with a companion Code of Conduct, build on the OECD principles for
advanced and foundation models [35]. Its eleven principles are operational rather than ethical:
lifecycle risk measures including red-teaming, post-deployment monitoring, public reporting of
capabilities and limitations, incident information sharing, governance policies, security controls,
content provenance, research, global challenges, standards, and data-input and IP protections [36].
Since February 2025 the OECD has run a voluntary reporting framework against the Code of Conduct
[37].

### Where the sets agree

The four sets disagree on emphasis and agree on substance. The table crosses the seven principles
they share with where each set states them.

| Shared principle | OECD (2024) | UNESCO (2021) | EU HLEG (2019) | G7 Hiroshima (2023) |
|---|---|---|---|---|
| Fairness and non-discrimination | 1.2 (fairness, non-discrimination) | Fairness and non-discrimination | Req. 5 diversity, non-discrimination and fairness | Preamble; 11 (data quality against harmful bias) |
| Safety and reliability | 1.4 (robust, safe; override, repair, decommission) | Proportionality and do no harm; safety and security | Req. 2 technical robustness and safety | 1 (lifecycle risk measures); 2 (post-deployment monitoring) |
| Privacy and security | 1.2 (privacy, data protection); 1.4 (security) | Right to privacy and data protection; safety and security | Req. 3 privacy and data governance | 6 (security controls); 11 (personal data, IP) |
| Transparency and explainability | 1.3 (incl. information to challenge an output) | Transparency and explainability | Req. 4 transparency | 3 (public reporting); 7 (content provenance) |
| Accountability | 1.5 (traceability; systematic risk management) | Responsibility and accountability | Req. 7 accountability | 4 (incident sharing); 5 (governance policies) |
| Human-centricity, incl. accessibility and inclusion | 1.1 (inclusive growth); 1.2 (human agency and oversight) | Human oversight and determination; awareness and literacy; diversity and inclusiveness | Req. 1 human agency and oversight; Req. 5 (accessibility and universal design) | Preamble (human-centricity) |
| Sustainability | 1.1 (environmental sustainability) | Sustainability; environment and ecosystem flourishing | Req. 6 societal and environmental well-being | 9 (climate crisis and other global challenges) |

Sources: [2][31][13][36].

### From principle to artefact

A principle is applied when it has been traced to a named harm, a control that bites, a metric that
moves and an evidence record someone can query. That is chapter 03's "[start from a named failure
mode or a named harm](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)"
applied to other people's targets. The table gives, for each shared principle, the house values
([chapter 03](/bok/values-and-principles#the-eight-values)) and house principles that engineer it
and the artefact that evidences it. It is a starting map, not a claim that any artefact satisfies a
principle.

| Shared principle | House values | House principles | Artefact that evidences it | Layer · pattern |
|---|---|---|---|---|
| Fairness | 2 evals fail builds; 7 realised risk reduction | Start from a named harm; give every control teeth | Subgroup eval results against a declared threshold; data card with representativeness notes; FRIA | 03 · Eval Gate in CI; 01 · [FRIA-as-Code](/bok/patterns#pattern-fria-as-code) |
| Safety and reliability | 2; 3 evidence from runtime | Build at the earliest point; give every control teeth | Eval-gate and red-team results per version; guardrail decisions; kill-switch drill records | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail, Kill Switch |
| Privacy and security | 1 governance is code; 4 identity and scope | Register and bound every actor; build at the earliest point | Policy verdicts on data class and residency; scoped credentials; DPIA; PII-leakage evals | 01 · Policy Card; 04 · Agent Identity & Scoped Credentials |
| Transparency and explainability | 5 machine-readable evidence; 6 inspectable tooling | Instrument the build | Model card, data card and AIBOM; disclosure and marking records; reason codes logged per decision | 02 · Model Card as Control Evidence; AIBOM |
| Accountability | 4; 8 owned with engineering | Register and bound every actor; instrument the build | Registry owner per entry; decision records; signed logs; incident records; OSCAL assessment results | 02 · Agent Registry; 05 · [Incident Pipeline](/bok/patterns#pattern-incident-pipeline), [Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal) |
| Human-centricity | 8; 3 | Start from a named harm; make the governed path the easiest | Gate logs (approver, time to decide, override rate); accessibility test results for notices and explanations; appeal records | 04 · Human-in-the-loop Gate |
| Sustainability | 7 | Instrument the build | Energy or compute per eval run and per 1,000 inferences in the evidence store; a model-size decision record | 05 · Continuous Assurance Telemetry |

Three rows carry legal or numeric weight. **Human-centricity** includes accessibility, and for
high-risk systems it is a duty: providers must meet the accessibility requirements of the EU web
accessibility and European Accessibility Act directives (Art. 16(l)) [38], so every notice and
explanation the system shows a person gets an accessibility test in the pipeline. **Transparency**
reaches the affected person: the OECD text asks for information that lets those adversely affected
"to challenge its output" [2], and the AI Act gives people affected by certain high-risk decisions a
right to "clear and meaningful explanations of the role of the AI system" [10]; the artefact is a
logged reason code and an appeal route with recorded outcomes. **Sustainability** has a number: the
IEA estimates data centres used about 415 TWh in 2024, around 1.5% of global electricity, and
projects around 945 TWh by 2030 [39]. Not all of that is AI, but it makes the choice between an SLM
and an LLM for the same task a governance decision with a record.

> **Example (illustrative)**
> One principle traced end to end. OECD 1.3 asks that people adversely affected by a system can
> challenge its output. Named harm: an applicant declined by `loan-triage-02` cannot find out why or
> contest it. Control: every adverse decision carries logged reason codes and an appeal route to a
> reviewer who can reverse it. Metric: appeal volume, reversal rate and time to resolution, per
> month. Evidence: the appeal log, filed against the registry entry and the model version.
> Obligation it supports: AI Act Art. 86 where it applies, GDPR Art. 22 safeguards where the
> decision is solely automated.

### Trade-offs are decisions, and decisions are records

Principles collide. NIST names the usual collisions: interpretability against privacy, predictive
accuracy against interpretability, and privacy-enhancing techniques that cost accuracy and with it
fairness where data is sparse; it adds that these trade-offs "should be resolved in a manner that is
both transparent and appropriately justifiable" [8]. The engineering reading is that every resolved
trade-off is a decision record with an owner, the options considered, the metric each would have
moved and the date it will be revisited.

| Tension | Typical case | Where the decision lives |
|---|---|---|
| Accuracy against interpretability | A gradient-boosted model beats a scorecard by a few points | Model-selection record on the model card, with both eval results |
| Fairness testing against privacy | Subgroup evals need the special-category data privacy law restricts | Data card noting the lawful basis (see Art. 4a in [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)), pseudonymisation and deletion |
| Efficiency against human-centricity | A review step adds latency to every decision | Gate placement record: which actions are gated and why |
| Transparency against security | Publishing detection rules helps attackers evade them | Disclosure decision: what is published, what is held for auditors |

A trade-off no one wrote down was still made; it was made by default, by whoever touched the code
last.

> **In practice (illustrative)**
> A governance team inherited a published "responsible AI charter" of six principles and no evidence
> behind any of them. Rather than rewrite the charter, it added one column to the registry per
> principle and asked, for each high-risk system, which artefact evidenced it. Four of six columns
> were empty for most systems on day one. The empty cells became the backlog, and the charter became
> auditable for the first time: a principle with no artefact was reported as a gap, not as a value.

## What you can do this week

1. Add the eight scoping fields from this chapter (`substrate`, `objective`, `intended_purpose`,
   `inference_technique`, `output_types`, `effect_surface`, `autonomy_level`, `adapts_in_use`) and a
   `definition_decision` with its reason to your registry schema, and backfill your ten
   highest-exposure systems.
2. Write down the out-of-scope decisions you have already made implicitly (rules engines,
   dashboards, baseline forecasters), each with the excluded family and the reason, so a later
   change shows up as a diff.
3. For one predictive system in production, find the decision threshold, its owner and its last
   calibration check. If any of the three is missing, add a calibration eval to its gate and put the
   threshold in a policy file with an owner.
4. For one generative system, run its most important eval five times on the current model version
   and record the pass rate with the sampling settings. If the rate is below the floor you thought
   you had, you have found your first real gate.
5. Take one principle your organisation has published and trace it to an artefact for one system,
   using the table above. If there is no artefact, record the gap in the risk register.

**Maps to:** EU AI Act Art. 3(1), 3(63), 3(66) (definitions), Art. 14 (human oversight), Art. 15
(accuracy metrics, feedback loops), Art. 16(l) (accessibility), Art. 50 (transparency), Art. 51
(GPAI systemic risk), Art. 86 (explanation) · GDPR Art. 22 · ISO/IEC 22989 · ISO/IEC 42001 · NIST AI
RMF (Map, Measure) and NIST AI 600-1 · OECD AI Principles · OWASP Agentic ASI02/ASI03 · Layers
01–05. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; first published 6 Feb 2025; not binding; seven elements of Art. 3(1); exclusions at paras 40–51; definition applicable since 2 Feb 2025). European Commission. 2025-07-29. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[2] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; definition revised 8 Nov 2023; principles revised 3 May 2024; principles 1.1–1.5, incl. 1.3(iv) challenge an output and 1.4(b) override, repair, decommission). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[3] Explanatory memorandum on the updated OECD definition of an AI system (2019 and 2023 texts compared; autonomy and adaptiveness explained; not part of the Recommendation). OECD Artificial Intelligence Papers. 2024-03. https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html (verified: primary)
[4] EU AI Act Art. 3 (definitions: (1) AI system, (3) provider, (4) deployer, (63) general-purpose AI model, (66) general-purpose AI system). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/3/ (verified: primary)
[5] EU AI Act Recital 12 (AI distinguished from simpler traditional software and from rules defined solely by natural persons; inference; machine learning and logic- and knowledge-based approaches; autonomy and adaptiveness). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/recital/12/ (verified: primary)
[6] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (AI system, term 3.1.4; autonomy and heteronomy, terms 3.1.5 and 3.1.16; clause 5.13 autonomy, heteronomy and automation; clause 5.19 AI stakeholder roles); referenced by identifier only. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[7] ISO/IEC 22989:2022/Amd 1, Generative AI (reported at final-draft stage; publication status as of 2026-09-24 unconfirmed). ISO/IEC. 2025. https://www.iso.org/standard/88145.html (verified: reported)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (AI system definition; trustworthy characteristics; s. 3.5 transparency, explainability, interpretability; trade-offs; Appendix B, how AI risks differ from traditional software risks). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[9] EU AI Act Art. 50 (disclosure of interaction with an AI system; machine-readable marking of synthetic audio, image, video and text). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/50/ (verified: primary)
[10] EU AI Act Art. 86 (right to clear and meaningful explanations of the role of a high-risk AI system in a decision). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/86/ (verified: primary)
[11] GDPR Art. 22(1) (right not to be subject to a decision based solely on automated processing, including profiling, with legal or similarly significant effects), text as reproduced. Intersoft Consulting (gdpr-info.eu), reproducing Reg. (EU) 2016/679. 2016. https://gdpr-info.eu/art-22-gdpr/ (verified: secondary)
[12] EU AI Act Art. 15 (15(3) accuracy levels and metrics declared in the instructions for use; 15(4) feedback loops in systems that continue to learn). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/15/ (verified: primary)
[13] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; HITL, HOTL and HIC oversight; requirement 5 includes accessibility and universal design). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[14] "Defeating Nondeterminism in LLM Inference" (1,000 temperature-zero completions of one prompt gave 80 unique outputs; cause traced to lack of batch invariance). Thinking Machines Lab (Horace He et al.). 2025-09-10. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (verified: primary)
[15] Levels of AGI for Operationalizing Progress on the Path to AGI (levels of performance, generality and autonomy) (arXiv 2311.02462). Morris et al.. 2023-11-04. https://arxiv.org/abs/2311.02462 (verified: primary)
[16] EU AI Act Art. 51 (classification of GPAI models with systemic risk; 51(2) presumption of high-impact capabilities above 10^25 FLOP of training compute). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/51/ (verified: primary)
[17] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (C(2025) 7719 final; first published 18 Jul 2025; para. 17 indicative criterion: training compute above 10^23 FLOP and able to generate language, text-to-image or text-to-video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[18] "Understanding the four types of AI, from reactive robots to self-aware beings" (reactive machines, limited memory, theory of mind, self-awareness). The Conversation (Arend Hintze). 2016-11-14. https://theconversation.com/understanding-the-four-types-of-ai-from-reactive-robots-to-self-aware-beings-67616 (verified: primary)
[19] Concrete Problems in AI Safety (reward hacking among five practical problems) (arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[20] EU AI Act Art. 14 (14(4)(b) automation bias; 14(4)(e) interrupting the system so it comes to a halt in a safe state). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/14/ (verified: primary)
[21] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[22] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream) (arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[23] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone) (arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[24] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; provenance as an open problem) (arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[25] Top 10 for Agentic Applications 2026 (ASI01–ASI10 threat catalogue for agentic systems). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[26] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity), Big Data & Society 3(1). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[27] "Dual use of artificial-intelligence-powered drug discovery" (inverted toxicity model generated about 40,000 candidate toxic molecules in under six hours), Nature Machine Intelligence. Urbina, Lentzos, Invernizzi and Ekins (full text on PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[28] Overcoming catastrophic forgetting in neural networks (neural networks lose earlier competence when trained on new tasks; elastic weight consolidation) (arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[29] On Calibration of Modern Neural Networks (modern networks poorly calibrated; temperature scaling), ICML 2017 (arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[30] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage) (arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[31] Recommendation on the Ethics of Artificial Intelligence (adopted by 193 member states, November 2021; four core values; ten principles). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[32] Ethical Impact Assessment: a tool of the Recommendation on the Ethics of AI (ex-ante and ex-post assessment of a system; aimed at procurers of AI systems). UNESCO. 2023-08-28. https://www.unesco.org/en/articles/ethical-impact-assessment-tool-recommendation-ethics-artificial-intelligence (verified: primary)
[33] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[34] EU AI Act Recital 27 (the seven HLEG principles as non-binding ethical principles complementing the Act). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/recital/27/ (verified: primary)
[35] Hiroshima Process International Guiding Principles for Organizations Developing Advanced AI Systems (welcomed by G7 leaders with a companion Code of Conduct; builds on the OECD AI Principles). European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-guiding-principles-advanced-ai-system (verified: primary)
[36] Hiroshima Process International Guiding Principles, full text of the eleven principles (preamble on human rights, fairness and human-centricity; principle 11 elaboration on data quality against harmful bias). G7 Information Centre (University of Toronto). 2023-10-30. https://g7.utoronto.ca/summit/2023hiroshima/231030-ai-principles.html (verified: secondary)
[37] Hiroshima AI Process (HAIP) Reporting Framework (voluntary reporting against the Code of Conduct; launched February 2025). OECD.AI. 2025-02. https://oecd.ai/en/hiroshima (verified: primary)
[38] EU AI Act Art. 16 (provider obligations; 16(l) accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/16/ (verified: primary)
[39] Energy and AI (data centres about 415 TWh in 2024, around 1.5% of global electricity; projected around 945 TWh by 2030). International Energy Agency. 2025. https://www.iea.org/reports/energy-and-ai (verified: primary)
