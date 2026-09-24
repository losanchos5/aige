# 22. Principles, soft law and standards

> Principles say what good looks like and standards say how to show it; this chapter maps each
> instrument to the stack layer and the evidence record that answer it.

## How to read this chapter

Most of what shapes AI governance is not law. It is a lattice of principle sets, a treaty, voluntary
frameworks and technical standards, each written by a different body for a different audience. The
engineer's job is not to recite them. It is to know, for each one, what it asks for, how much force
it carries, and which artefact in the stack would evidence that the ask is met. A principle only
counts once it is a control; a standard only helps once its clauses are wired to a gate, a registry
field or an evidence record.

In rough order of force: binding law (the AI Act, in
[chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus) and
[chapter 18](/bok/eu-ai-act#the-act-and-the-omnibus)); a binding treaty, the Council of Europe Framework Convention, which binds the
Parties that ratify it and leaves each to choose how to reach private actors [1]; **harmonised
standards**, European standards written on a Commission request that give a presumption of
conformity once their reference is published in the Official Journal [2]; international standards
and frameworks (ISO/IEC, NIST, IEEE), voluntary and sometimes certifiable; and principles and soft
law (OECD, UNESCO, G7, the EU High-Level Expert Group), which set the target and the shared
vocabulary.

Two cautions run through the chapter. Standards support, they do not confer: no certificate and no
coverage figure makes a system compliant, and the test from
[chapter 01](/bok/definition#three-clarifiers) still applies. And this chapter explains the
instruments while [chapter 08](/bok/regulatory-map#how-to-read-this-map) stays the
obligations index; where an instrument already has rows there, this chapter links to them. Principle
sets are the home ground of Responsible AI and AI ethics ([chapter
01](/bok/definition#the-disambiguation-cluster)): they set the values. The tables of artefacts and
layers below are the engineering contribution, not a claim about what the principles' authors
intended.

## The instruments at a glance

| Instrument | Issuer | Force | What it changes in the stack | Main layers |
|---|---|---|---|---|
| OECD AI Principles (2019, rev. 2024) | OECD | Political commitment by 47 adherents | Shared definition, lifecycle and classification fields for the registry | 1 · 2 |
| UNESCO Recommendation (2021) | UNESCO | Non-binding, adopted by 193 Member States | Ethical impact assessment as a registry-linked record | 2 |
| Framework Convention (CETS No. 225) | Council of Europe | Binding on Parties once in force; not in force as of 2026-09-24 | Risk and impact management, testing on change, contestability records | 1 · 2 · 3 · 5 |
| Hiroshima Code of Conduct (2023) | G7 | Voluntary; OECD reporting framework | Public capability reporting, incident sharing, provenance | 2 · 4 · 5 |
| Ethics Guidelines and ALTAI (2019, 2020) | EU AI HLEG | Non-binding; recalled in AI Act recital 27 | Seven requirements as a checklist to convert into controls | 1 · 2 |
| NIST AI RMF 1.0 and profiles | NIST | Voluntary | Function, category and subcategory ids as control metadata | 1–5 |
| ISO/IEC 22989, 42001 and family | ISO/IEC JTC 1/SC 42 | Voluntary; 42001 certifiable | Management-system evidence; vocabulary; lifecycle processes | 1 · 2 · 5 |
| JTC 21 harmonised standards | CEN-CENELEC | Presumption of conformity once OJ-cited; none cited as far as we can find | Provider risk file, logging schema, QMS evidence | 1–5 |
| IEEE 7000 series | IEEE | Voluntary | Ethics-by-design and bias processes in the SDLC | 1 · 2 · 3 |

Sources for each row are in the section that treats it. The adherent and Member State counts come
from [3] and [4]; the Convention's status from [5].

## A short lineage of AI soft law

The instruments cite each other, and the order matters because definitions travel downstream. The EU
High-Level Expert Group published its Ethics Guidelines on 8 April 2019 [6]. The OECD Council
adopted its Recommendation on AI on 22 May 2019, and G20 leaders welcomed G20 AI Principles drawn
from it at Osaka in June 2019 [7]. UNESCO's Member States adopted the Recommendation on the Ethics
of AI in November 2021 [4]. The OECD published its Framework for the Classification of AI Systems on
22 February 2022 [8], and NIST's AI RMF 1.0 followed on 26 January 2023, adapting the OECD lifecycle
and dimensions in its own Figure 2 [9]. G7 leaders agreed the Hiroshima Guiding Principles and Code
of Conduct on 30 October 2023 [10]. The OECD revised its AI-system definition on 8 November 2023 and
the whole Recommendation on 3 May 2024 [7]. The Council of Europe adopted its Framework Convention
on 17 May 2024 and opened it for signature on 5 September 2024 [11]. The OECD launched the Hiroshima
reporting framework on 7 February 2025 [12], and the European Union ratified the Convention on 15
May 2026 [13].

The practical consequence is convergence on one definition. The OECD definition of an AI system, the
Convention's Article 2 and the AI Act's Article 3(1) use near-identical wording, and the AI Act's
recital 12 says the notion should be closely aligned with the work of international organisations
[7][1][14]. A registry that classifies systems against that wording once can answer all three
instruments; [chapter 11](/bok/ai-defined#four-definitions-compared) treats the definition itself,
and tabulates [where the principle sets agree](/bok/ai-defined#where-the-sets-agree).

## OECD AI Principles

The OECD Recommendation on AI (legal instrument `OECD/LEGAL/0449`) was the first intergovernmental
standard on AI. It contains five values-based principles for AI actors, five recommendations to
governments, and definitions of AI system, AI system lifecycle and AI actors [7]. The 2024 revision
added explicit attention to misinformation and information integrity, to uses outside the intended
purpose, to safe override and decommissioning, and to environmental sustainability, and moved
traceability and risk management under the accountability principle [7]. As of 2026-09-24, OECD.AI
lists 47 adherents, including the 38 OECD members, the European Union and eight non-members [3].

### The five principles and five recommendations

The principles address AI actors; the recommendations address governments. Only the first five
become engineering work directly. The table reads each principle as a question the stack must
answer.

| Principle | What it asks of AI actors (paraphrased) | Engineering artefact | Layer |
|---|---|---|---|
| `1.1` Inclusive growth, sustainable development and well-being | Pursue beneficial outcomes for people and planet | Intended-use and benefit statement in the intake record; named harms per system | 2 |
| `1.2` Rule of law, human rights and democratic values, incl. fairness and privacy | Respect rights across the lifecycle; human agency and oversight; guard against misuse | Impact assessment linked to the registry; fairness and privacy evals; oversight checkpoint | 2 · 3 · 4 |
| `1.3` Transparency and explainability | Meaningful, context-appropriate information about the system and its outputs | Model card and data card; interaction disclosure; explanation artefacts | 2 |
| `1.4` Robustness, security and safety | Function under normal use, foreseeable misuse and adverse conditions; override, repair or decommission safely | Adversarial and robustness evals; kill switch; content provenance | 3 · 4 |
| `1.5` Accountability | Traceability of datasets, processes and decisions; systematic risk management per lifecycle phase | Evidence store keyed to registry ids; risk register as code; supplier records | 1 · 5 |

The five recommendations (research and development; an inclusive AI-enabling ecosystem; an
interoperable governance and policy environment; human capacity and labour-market transformation;
international co-operation) address Adherents, not system owners. Recommendation 2.5's call for
"multi-stakeholder, consensus-driven global technical standards" is the policy root of the standards
work later in this chapter [7].

Principle 1.4(b) is the most directly operational sentence in the instrument: mechanisms should let
AI systems that risk undue harm be "overridden, repaired, and/or decommissioned safely" [7]. In
stack terms that is the [**Kill Switch / Circuit
Breaker**](/patterns/kill-switch-circuit-breaker) pattern with a tested revocation
path, and a decommissioning record in the registry. Principle 1.5(b)'s traceability "in relation to
datasets, processes and decisions" is what [**Continuous Assurance
Telemetry**](/patterns/continuous-assurance-telemetry) produces when every evidence
record carries the registry id of the system it describes.

### The OECD AI system definition and lifecycle

The 2023 definition reads: a machine-based system that, for explicit or implicit objectives, infers,
from the input it receives, how to generate outputs such as predictions, content, recommendations or
decisions that can influence physical or virtual environments; systems vary in autonomy and in
adaptiveness after deployment [7]. OECD.AI notes that the European Union, the Council of Europe, the
United States and the United Nations use this definition and lifecycle in their own frameworks [3].

The lifecycle has seven phases: plan and design; collect and process data; build or adapt models;
test, evaluate, verify and validate; make available for use or deploy; operate and monitor; retire
or decommission. The phases are iterative and not necessarily sequential, and retirement can happen
at any point during operation [7]. That last clause is easy to miss and useful to encode: the
registry needs a `retired` state reachable from `operating`, with its own evidence (who retired it,
why, what data was deleted), not only a path from `built` to `deployed`.

| OECD lifecycle phase | Where it lives in the pipeline | Evidence it should leave |
|---|---|---|
| Plan and design | Intake and classification | Intake record; risk tier; intended purpose |
| Collect and process data | Data pipeline | Data card; lineage; lawful-basis note |
| Build or adapt models | Training and fine-tuning jobs | AIBOM; training-run metadata |
| Test, evaluate, verify, validate | CI eval gate | Eval result against threshold |
| Make available or deploy | Admission and release | Policy verdict; registry entry |
| Operate and monitor | Runtime | Guardrail decisions; traces; drift alerts |
| Retire or decommission | Registry state change | Retirement record; revoked credentials |

### The Framework for the Classification of AI Systems

The OECD classification framework evaluates an AI system from a policy perspective along five
dimensions: **People & Planet**, **Economic Context**, **Data & Input**, **AI Model** and **Task &
Output**, each with its own properties and attributes [8]. NIST's AI RMF reproduces a modified
version of the same picture, with Application Context in place of Economic Context and test,
evaluation, verification and validation (TEVV) drawn across the lifecycle [9].

For an engineer the framework is a schema, not a paper. Each dimension becomes a group of registry
fields that makes a system comparable with others and tells the rest of the stack what to test.

> **Example (illustrative)** A registry entry extended with the five dimensions. The fields are the
> team's own choice; the grouping is the OECD's.
>
> ```yaml
> id: credit-limit-assist
> oecd_classification:
>   people_and_planet: { affected: [applicants], rights_impact: high, opt_out: false }
>   economic_context: { sector: consumer-credit, criticality: high, deployment: customer-facing }
>   data_and_input: { provenance: [bureau-feed, application-form], personal_data: true }
>   ai_model: { type: gradient-boosted-trees, adaptive_after_deployment: false }
>   task_and_output: { task: recommendation, autonomy: human-reviewed, output: limit-band }
> ```
>
> A policy in layer 01 reads `rights_impact: high` and requires a fairness eval gate; the eval gate
> in layer 03 reads `personal_data: true` and adds a leakage suite. The classification stops being a
> description and starts routing controls.

### The OECD.AI observatory

Three OECD.AI resources are worth wiring in. The **Catalogue of Tools & Metrics for Trustworthy AI**
is a place to find eval methods and metrics, not an endorsement list [15]. The **AI Incidents and
Hazards Monitor** [3] is an input to layer 03: a reported failure in a comparable system is a
candidate eval case (see [chapter 17](/bok/incidents#learning-from-public-incident-databases)). The **Hiroshima AI Reporting Framework** is
where developers of advanced AI systems file risk-management reports [3] (see the G7 section).

> **In practice (illustrative)**
> A governance team in a large insurer added the five OECD dimensions to its registry schema as
> required fields. The first reconciliation found several systems whose `task_and_output.autonomy`
> said "human-reviewed" while runtime traces showed no reviewer action on most decisions. The field
> did not create the gap; it made the gap queryable. The fix was an oversight checkpoint with logged
> approvals, and the registry field became a claim the traces could falsify.

## UNESCO Recommendation on the Ethics of AI

UNESCO's 193 Member States adopted the Recommendation on the Ethics of Artificial Intelligence in
November 2021, the first global standard on AI ethics [4]. It rests on four core values (human
rights and dignity; just, peaceful and interconnected societies; diversity and inclusiveness; the
flourishing of environment and ecosystems) and ten core principles: proportionality and do no harm;
safety and security; privacy and data protection; multi-stakeholder and adaptive governance;
responsibility and accountability; transparency and explainability; human oversight and
determination; sustainability; awareness and literacy; fairness and non-discrimination [4]. Policy
action areas then turn the values into government programmes.

The Recommendation addresses states, so its operational weight for an organisation comes through two
tools. The **Readiness Assessment Methodology** (RAM) assesses how prepared a country is to govern
AI responsibly [16]; it is useful context when deploying into a jurisdiction that has run one. The
**Ethical Impact Assessment** (EIA) is system-level: it helps assess the ethical implications of an
individual AI system before and during use, and is designed for governments procuring or deploying
AI, companies developing it and researchers assessing it [17].

In the stack an EIA is one more impact assessment: attached to the registry entry, versioned and
re-run on change, following [**FRIA-as-Code**](/patterns/fria-as-code). A public buyer
that requires one from suppliers makes it a procurement artefact for the [**Vendor / Model
Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate). "Proportionality and
do no harm" restates the house principle [start from a named failure mode or a named
harm](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm) [4].

## Council of Europe Framework Convention (CETS No. 225)

The Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law
is the first international legally binding treaty on AI. It was adopted in Strasbourg on 17 May 2024
and opened for signature in Vilnius on 5 September 2024 [11]. It is technology-neutral and binds
Parties, not companies [5][1].

### Scope and status

Article 3 sets the scope. Parties must apply the Convention to lifecycle activities of AI systems
undertaken by public authorities or private actors acting on their behalf. For other private actors,
each Party must address risks and impacts in a manner consistent with the Convention's object and
purpose, and must declare how it will do so. National security, national defence and research not
yet made available for use are carved out, with conditions [1].

The Convention enters into force on the first day of the month following three months after five
signatories, including at least three Council of Europe member states, have ratified it (Article
30(3)) [1]. **Status as of 2026-09-24:** the Council of Europe's own page lists the European Union
as the only Party and 20 further signatories, among them the United Kingdom, Norway, Switzerland,
Ukraine, Canada, Israel, Japan, the United States and Uruguay [5]. The Convention is therefore not
yet in force. The European Parliament consented to the EU's conclusion on 11 March 2026 [18], and
the EU ratified on 15 May 2026 at the Committee of Ministers' 135th Session in Chișinău [13]. The
Council Decision concluding the Convention for the Union is reported as Decision (EU) 2026/1080 of
21 April 2026, which states that the Convention is implemented in the Union exclusively through the
AI Act and other relevant Union law, and carries the EU's Article 3(1)(b) declaration that it will
apply the Convention to private actors through the AI Act [19] (verify the decision's final text on
EUR-Lex).

Inside the EU, then, the treaty is implemented through the AI Act rather than through a separate set
of private-sector duties. Outside it, once the Convention is in force, each Party's implementing
measures are what bind; track them per jurisdiction in [chapter 21](/bok/ai-laws-worldwide#comparing-the-regimes).

### What the Convention asks for, and what it changes in the stack

Chapter III sets principles that Parties implement: human dignity and individual autonomy;
transparency and oversight; accountability and responsibility; equality and non-discrimination;
privacy and personal data protection; reliability; safe innovation, including controlled testing
environments (Articles 7–13) [1]. Chapters IV and V are where the engineering lives.

| Article | Duty on Parties (paraphrased) | Engineering artefact | Layer |
|---|---|---|---|
| `Art. 14(2)(a)–(b)` | Document relevant information about systems that can significantly affect human rights, sufficient for affected people to contest decisions | Decision record per consequential output; [contest path](/patterns/decision-notice-contest-path) with the record attached | 2 · 5 |
| `Art. 14(2)(c)` | An effective possibility to complain to competent authorities | Complaint intake linked to the registry id | 5 |
| `Art. 15(2)` | Notify people that they are interacting with an AI system, as appropriate | Interaction disclosure enforced at runtime | 4 |
| `Art. 16(1)–(2)(a)–(f)` | Iterative, graduated risk and impact management: context, severity and probability, stakeholder views, monitoring, documentation | Risk register as code; impact assessment linked to registry; monitoring against baseline | 1 · 2 · 4 |
| `Art. 16(2)(g)` | Test systems before first use and when significantly modified, where appropriate | Eval gate on release and on material change | 3 |
| `Art. 16(4)` | Assess the need for a moratorium, ban or other measures for incompatible uses | Policy-as-code blocklist of prohibited uses | 1 |

Article 16(2)(g) deserves the emphasis. "When they are significantly modified" is a trigger, not a
date, and a trigger is something a pipeline can evaluate: a registry diff that changes the model,
the training data or the intended purpose re-runs the gate. That is the [**Eval Gate in
CI**](/patterns/eval-gate-in-ci) pattern with the material-change rule written down, and
it answers the same question the AI Act asks about substantial modification (see [chapter
18](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)).

The Council of Europe also published **HUDERIA**, a non-binding methodology for risk and impact
assessment of AI systems from the point of view of human rights, democracy and the rule of law. It
has two parts: the HUDERIA Methodology, approved by the Committee of Ministers on 26 February 2025,
and the HUDERIA Model: Context-Based Risk Analysis (COBRA), approved on 25 February 2026, which
structures the collection of information about a system's context, design and deployment [20].
Parties may use or adapt either. For a team that already runs FRIA-as-Code, COBRA's context
questions are a field list to reconcile with the registry, not a second process.

**Maps to:** CETS No. 225 Arts. 14–16 · EU AI Act Art. 9, 27, 50 (via the EU's implementing choice)
· layers 1–5. Mappings are illustrative, not a claim of conformity.

## G7 Hiroshima Process

G7 leaders agreed two texts on 30 October 2023: the International Guiding Principles for
Organizations Developing Advanced AI Systems and the International Code of Conduct built on them.
The Code is voluntary, addressed to organisations developing the most advanced AI systems (including
foundation models and generative AI), described as a non-exhaustive living document that builds on
the OECD AI Principles, and to be followed in line with a risk-based approach [10]. Its 11 actions
map onto the stack with little translation:

| Action | Ask (paraphrased) | Engineering artefact | Layer |
|---|---|---|---|
| 1 | Identify, evaluate and mitigate risks across the lifecycle, including testing before deployment | Adversarial red-team suite; eval gate | 3 |
| 2 | Identify and mitigate vulnerabilities, incidents and misuse after deployment | Runtime monitoring; incident pipeline | 4 · 5 |
| 3 | Publicly report capabilities, limitations and appropriate and inappropriate uses | Model card published from the registry | 2 |
| 4 | Share information and report incidents responsibly with industry, governments, civil society, academia | Incident pipeline with an external-sharing branch | 5 |
| 5 | Develop, implement and disclose AI governance and risk-management policies | Policy-as-code library with a published summary | 1 |
| 6 | Invest in security controls, including physical, cyber and insider-threat safeguards | Security controls on weights and pipelines | 4 |
| 7 | Deploy content authentication and provenance mechanisms where feasible | Provenance marking at output; verification test | 4 |
| 8 | Prioritise research on societal, safety and security risks | (Programme-level; no direct artefact) | – |
| 9 | Prioritise systems that address global challenges | (Programme-level; no direct artefact) | – |
| 10 | Advance and adopt international technical standards | Standards watch; crosswalk maintenance | 1 |
| 11 | Implement data input measures and protect personal data and intellectual property | Data card; licence and provenance in the AIBOM | 2 |

On 7 February 2025 the OECD launched a framework for companies to report comparably on how they
apply the Code (risk assessment, incident reporting, information sharing). First reports were due by
15 April 2025, with rolling submissions and annual updates afterwards [12]. A report is a
disclosure, not an audit; generated from the registry and the evidence store it stays true, written
by hand it drifts. For developers of general-purpose AI models placed on the EU market, the binding
counterpart is the AI Act's GPAI regime and its voluntary Code of Practice, indexed in [chapter
08](/bok/regulatory-map#gpai-code-of-practice).

## EU HLEG guidelines and ALTAI

The Commission's independent High-Level Expert Group on AI presented its Ethics Guidelines for
Trustworthy AI on 8 April 2019. Trustworthy AI, in the Guidelines, is lawful, ethical and robust,
and seven key requirements make it concrete: human agency and oversight; technical robustness and
safety; privacy and data governance; transparency; diversity, non-discrimination and fairness;
societal and environmental well-being; accountability [6]. The Guidelines name three oversight
approaches (human-in-the-loop, human-on-the-loop and human-in-command), which is still the most
compact vocabulary for oversight design [6]; the [**Human-in-the-loop
Gate**](/patterns/human-in-the-loop-gate) pattern chooses among them by consequence.

The **Assessment List for Trustworthy AI** (ALTAI) followed on 17 July 2020, revised after a pilot
with over 350 stakeholders and published both as a document and as a web-based self-assessment tool
[21]. The AI Act's recital 27 recalls the seven principles as non-binding guidance that contributes
to trustworthy, human-centric AI, without prejudice to the Act's binding requirements [14].

ALTAI's lasting lesson is a warning. A self-assessment questionnaire answered once is an
attestation, and the book's third value says evidence comes from runtime, not from a point-in-time
attestation ([value
3](/bok/values-and-principles#3-evidence-comes-from-runtime-not-from-a-point-in-time-attestation)).
The useful move is to treat each question as a candidate control. The Guidelines ask for "a fall
back plan in case something goes wrong" [6]; as a control that becomes "is there a tested kill
switch, and when did the last test pass?". A question that cannot become a check with an evidence
record goes to the review board, and the list is still worth keeping for that.

## NIST AI RMF 1.0 in depth

The NIST AI Risk Management Framework 1.0 (NIST AI 100-1, 26 January 2023) describes itself as
voluntary, rights-preserving, non-sector-specific and use-case agnostic [9]. Chapter 08 maps its
four functions to artefacts ([chapter 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf)); this
section goes one level down, to what an engineer needs to use its identifiers as control metadata.

### Harm, risk and tolerance

Part 1 frames risk as a function of the magnitude of harm and its likelihood, and groups potential
harms into harm to people, harm to an organisation and harm to an ecosystem [9]. Two framing choices
matter for engineering. The RMF can help prioritise risk but "does not prescribe risk tolerance":
the threshold is the organisation's to set, influenced by law, policy and norms [9]. And it treats
measurement as hard: risks that will not or cannot be measured must still be documented (MEASURE
1.1). Both push the same way as the house principle [give every control
teeth](/bok/values-and-principles#give-every-control-teeth): a threshold must be chosen, written
down with its rationale and enforced, because the framework will not choose it for you.

### The seven trustworthy characteristics

The RMF names seven characteristics of trustworthy AI and describes valid and reliable as the base
for the others, with accountable and transparent spanning them all [9].

| Characteristic | Evidence that it holds | Layer |
|---|---|---|
| Valid and reliable | Capability and regression evals against a golden set; drift monitoring | 3 · 4 |
| Safe | Safety-threshold evals; tested kill switch; override path | 3 · 4 |
| Secure and resilient | Adversarial red-team suite; [threat model](/patterns/ai-threat-model); runtime detection | 3 · 4 |
| Accountable and transparent | Registry ownership; model card; evidence keyed to registry ids | 2 · 5 |
| Explainable and interpretable | [Explanation artefacts](/patterns/explanation-artefact) and reason codes, tested for fidelity ([chapter 16](/bok/fairness-and-explainability#testing-explanation-quality)) | 2 · 3 |
| Privacy-enhanced | Leakage and memorisation evals; DPIA linked to registry ([chapter 19](/bok/privacy-and-ai#does-a-model-contain-personal-data)) | 2 · 3 |
| Fair with harmful bias managed | [Fairness evals](/patterns/fairness-eval-suite) with thresholds traced to named harms | 3 |

### The Core: 19 categories

The Core has four functions, 19 categories and, by our count of the published tables, 72
subcategories [9]. GOVERN is cross-cutting; MAP, MEASURE and MANAGE run per system. The table
paraphrases each category in one line and names the artefact that evidences it.

| Category | In one line (paraphrased) | Artefact | Layer |
|---|---|---|---|
| GOVERN 1 | Policies and processes for AI risk exist, are transparent and work; includes inventory (1.6) and decommissioning (1.7) | Policy-as-code library; registry fed by deploys | 1 · 2 |
| GOVERN 2 | Accountability structures: people empowered, responsible and trained | Owner field per registry entry; RACI | 1 · 2 |
| GOVERN 3 | Diverse teams and defined human-AI roles inform risk work | Reviewer roster; oversight role definitions | 1 |
| GOVERN 4 | A culture that considers and communicates risk; testing, incident identification and sharing (4.3) | Incident pipeline; eval ownership | 3 · 5 |
| GOVERN 5 | Engagement with relevant AI actors, including feedback from outside the team | Feedback and contest channel tied to the registry | 4 · 5 |
| GOVERN 6 | Third-party software, data and supply-chain risks addressed | Vendor due-diligence gate; AIBOM | 1 · 2 |
| MAP 1 | Context established: purposes, users, laws, norms, settings | Intake record | 2 |
| MAP 2 | The system is categorised: tasks, methods, knowledge limits | Classification fields (the OECD dimensions fit here) | 2 |
| MAP 3 | Capabilities, usage, benefits and costs understood; oversight processes defined (3.5) | Intended-use statement; oversight design | 2 · 4 |
| MAP 4 | Risks and benefits mapped for every component, including third-party | Component risk map from the AIBOM | 2 |
| MAP 5 | Impacts on individuals, groups, communities, organisations and society characterised | Impact assessment (FRIA, ISO/IEC 42005) | 1 · 2 |
| MEASURE 1 | Methods and metrics chosen, starting with the most significant risks | Eval plan with thresholds and rationale | 3 |
| MEASURE 2 | Systems evaluated against the trustworthy characteristics | Eval suites; red-team results | 3 |
| MEASURE 3 | Risks tracked over time, including emergent ones in deployment | Runtime metrics compared with eval baseline | 4 |
| MEASURE 4 | Feedback on whether measurement works is gathered and assessed | Eval coverage review; missed-incident analysis | 3 · 5 |
| MANAGE 1 | Risks prioritised and treated; a go or no-go decision on deployment | Risk register decisions; release gate | 1 · 5 |
| MANAGE 2 | Benefit-maximising and harm-minimising strategies; supersede, disengage or deactivate (2.4) | Runtime guardrail; kill switch | 4 |
| MANAGE 3 | Third-party risks and benefits managed; pre-trained models monitored | Supplier monitoring; model provenance checks | 2 · 4 |
| MANAGE 4 | Treatments, response, recovery and communication documented and monitored; incidents communicated (4.3) | Incident pipeline; post-deployment monitoring plan | 4 · 5 |

The identifiers are the useful part. A control that carries `nist_ai_rmf: [MEASURE 2.7, MANAGE 2.4]`
in its metadata can be counted, crosswalked and queried; a control described in prose cannot. The
[**Framework Crosswalk**](/patterns/framework-crosswalk) pattern generates the RMF view
from that metadata instead of maintaining it beside the code.

### How a Playbook entry is structured

The AI RMF Playbook is the companion that turns each subcategory into suggested practice. Every
entry has the same five parts: **About** (what the subcategory means), **Suggested Actions**,
**Transparency and Documentation** (framed as "Organizations can document the following", a list of
questions), **AI Transparency Resources** and **References** [22]. NIST describes the Playbook as
voluntary material that users tailor, not a checklist to complete [9].

Read as an engineer, the "Transparency and Documentation" questions are acceptance criteria. Each
question either names an artefact the stack already emits (then link it) or exposes a gap (then
build it or record why not).

> **Example (illustrative)** One subcategory, turned into a gate and an evidence record.
>
> ```yaml
> control: kill-switch-tested
> nist_ai_rmf: [MANAGE 2.4]          # supersede, disengage or deactivate
> playbook_question: "Who can deactivate the system, and how is that tested?"
> check: last_kill_switch_test.passed == true and age_days <= 30
> enforce: deploy-admission          # block release if stale
> evidence: kill-switch-test-result  # filed against the registry id
> ```
>
> The Playbook supplied the question; the pipeline supplies the answer on every release.

### Profiles and the Generative AI Profile

A profile applies the Core to a context. The RMF describes three kinds: **use-case profiles** for a
particular setting, **temporal profiles** (a Current Profile of how AI is managed today and a Target
Profile of where the organisation wants to be, whose comparison reveals the gaps) and
**cross-sectoral profiles** for risks common across uses, such as the use of large language models,
cloud-based services or acquisition [9]. Generated from control metadata, the Current Profile is the
live coverage of each subcategory by a running control, and the Target Profile is a reviewed diff.

**NIST AI 600-1**, the Generative AI Profile (26 July 2024), is the main cross-sectoral profile. It
defines 12 risks unique to or exacerbated by generative AI: CBRN information or capabilities;
confabulation; dangerous, violent or hateful content; data privacy; environmental impacts; harmful
bias and homogenization; human-AI configuration; information integrity; information security;
intellectual property; obscene, degrading and/or abusive content; value chain and component
integration [23]. It then lists suggested actions keyed to the RMF subcategories with identifiers
such as `GV-1.1-001`; we count 212 such identifiers in the published text [23]. Those identifiers
make good test names: an eval suite for confabulation that cites the actions it implements can be
traced back to the profile without a spreadsheet. On 7 April 2026 NIST also announced a concept note
for an AI RMF profile on trustworthy AI in critical infrastructure [24].

### Adjacent NIST work

Four further NIST publications bear directly on the stack. The newer drafts already indexed in
[chapter 08](/bok/regulatory-map#newer-nist-ai-work) (the AI Agent Standards Initiative, the draft
Cyber AI Profile and the draft AI 800-1) are not repeated here.

- **NIST AI 100-2 E2025** (March 2025) is a taxonomy and terminology of adversarial machine
  learning: ML methods, lifecycle stages of attack, attacker goals, objectives, capabilities and
  knowledge, and mitigations [25]. Use its terms to name the cases in the [**Adversarial Red-Team
  Suite**](/patterns/adversarial-red-team-suite), so a finding reads the same in the
  eval report and in the threat model.
- **NIST SP 800-218A** (July 2024) is a Secure Software Development Framework community profile for
  generative AI and dual-use foundation models. It adds AI-specific practices and tasks to SSDF 1.1
  for producers of AI models, producers of AI systems that use them, and acquirers [26]. It is the
  build-pipeline half of the story: provenance of weights and data, integrity of the training
  environment.
- **CSF 2.0** (26 February 2024) organises cybersecurity outcomes in six Functions: Govern,
  Identify, Protect, Detect, Respond and Recover [27]. The AI RMF and CSF 2.0 are siblings, not
  substitutes: the RMF covers AI risk broadly (fairness, privacy, explainability as well as
  security), CSF covers cybersecurity outcomes for any system, and both put governance first. The
  draft Cyber AI Profile (NIST IR 8596) is the bridge, a CSF 2.0 profile for AI [28].
- **COSAiS**, the SP 800-53 Control Overlays for Securing AI Systems, will tailor SP 800-53 controls
  to five use cases: generative AI assistants, predictive AI, single-agent and multi-agent systems,
  and controls for AI developers. As of 2026-09-24 the project page shows the concept paper (14
  August 2025) and an annotated outline for the predictive-AI overlay (8 January 2026), with no
  public draft overlay yet [29]. For organisations that already run SP 800-53, the overlays will be
  the most direct route from an existing control baseline to AI.

### Revision status

The RMF itself foresaw a formal review with community input no later than 2028, with versions
numbered 1.n for minor and 2.0 for major revisions [9]. As of 2026-09-24 NIST's framework page
states that AI RMF 1.0 "is being revised as part of the White House AI Action Plan" [24]; we found
no published revised version, so 1.0 remains the citable text (verify before relying on category
wording). Two engineering consequences follow. Pin the version in control metadata
(`nist_ai_rmf@1.0`), so a revision is a diff you review rather than a silent change of meaning. And
prefer the category and subcategory identifiers over their prose, because identifiers tend to
survive revisions better than wording.

NIST also hosts crosswalks from the RMF to other frameworks, including ISO/IEC 42001 and, dated 14
August 2025, a revised ISO/IEC 23894 crosswalk and a new ISO/IEC 42005 one [30]. They are a sound
starting point for a crosswalk file, not a substitute for mapping your own controls.

## The ISO/IEC family

ISO/IEC JTC 1/SC 42 publishes the international AI standards. They are referenced here by number and
short title only; the texts are sold by ISO and national bodies and are not reproduced. Chapter 08
already maps the ISO/IEC 42001 Annex A areas and ISO/IEC 42005, 42006 and 23894 to artefacts
([chapter 08, ISO/IEC](/bok/regulatory-map#isoiec-42001-42005-and-42006)).

### Foundations and vocabulary

| Standard | Short title | What it changes in the stack | Layer |
|---|---|---|---|
| `ISO/IEC 22989:2022` | AI concepts and terminology [31] | Controlled vocabulary for registry fields and policy text; stakeholder roles | 1 · 2 |
| `ISO/IEC 23053:2022` | Framework for AI systems using machine learning [32] | Reference decomposition of an ML system into components for the AIBOM | 2 |
| `ISO/IEC 5338:2023` | AI system life cycle processes, based on ISO/IEC/IEEE 15288 and 12207 [33] | Lifecycle stages the pipeline gates attach to | 1 · 3 |
| `ISO/IEC TR 24028:2020` | Overview of trustworthiness in AI [34] | Background taxonomy for threat and failure-mode catalogues | 1 |

ISO/IEC 22989 establishes terminology and concepts for AI and is written to be used by other
standards [31]; ISO/IEC 5338, for example, draws its AI-specific processes from 22989 and 23053
[33]. A registry whose field names follow 22989 needs less translation when an auditor works from
the SC 42 family. The standard also defines stakeholder roles such as AI provider, AI producer, AI
customer, AI partner and AI subject (verify the role list against the text), which are not the AI
Act's provider and deployer: map them explicitly in the registry rather than assuming they coincide.

### Risk, quality and data

| Standard | Short title | What it changes in the stack | Layer |
|---|---|---|---|
| `ISO/IEC 23894:2023` | AI: guidance on risk management [35] | Organisational AI risk process; risk register as code | 1 · 3 |
| `ISO/IEC TR 24027:2021` | Bias in AI systems and AI aided decision making [36] | Bias sources and measures to cover in fairness evals | 3 |
| `ISO/IEC 5259` series (2024–2025) | Data quality for analytics and ML: overview, process framework, governance framework and related parts [37] | Data-quality tests in CI; data card fields; data governance roles | 2 · 3 |
| `ISO/IEC 25059:2023` | Quality model for AI systems (SQuaRE extension) [38] | Quality characteristics to specify and measure; eval-suite coverage | 3 |
| `ISO/IEC 38507:2022` | Governance implications of the use of AI by organizations [39] | Board-level decision rights and oversight reporting | 1 · 5 |

Two details matter for planning. ISO/IEC 25059 is marked "to be revised" on ISO's page as of
2026-09-24 [38], so pin the edition you map to. And ISO/IEC 38507 is written for the governing body
and its advisers (executives, auditors, policymakers) [39]: it is the standard that tells a board
what it owns, which is where the escalation path in layer 05 ends.

### The management-system trio

**ISO/IEC 42001:2023** specifies requirements for establishing, implementing, maintaining and
continually improving an AI management system [40]. **ISO/IEC 42005:2025** gives guidance for AI
system impact assessments on individuals, groups and society across the lifecycle [41]. **ISO/IEC
42006:2025** sets additional requirements, on top of ISO/IEC 17021-1, for bodies that audit and
certify AI management systems against 42001 [42]: it is how a certificate's issuer shows the
competence to issue it.

42001 follows ISO's Harmonized Structure for management-system standards, the shared layout and core
text defined in Annex SL, so its clauses 4 to 10 (context, leadership, planning, support, operation,
performance evaluation, improvement) line up with every other ISO management-system standard [43].
Like ISO/IEC 27001, it pairs those clauses with an annex of controls, and the organisation justifies
which controls it applies in a Statement of Applicability (verify the clause wording). The
engineering reading of the SoA: it is a generated file, not a document. Each Annex A control listed
as applicable should point at the running control and the evidence stream that implements it; each
exclusion should carry its justification and an owner.

What a 42001 certificate proves, and what it does not, is set out in [chapter
07](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments) and [chapter 08](/bok/regulatory-map#what-is-not-harmonised-yet): it
evidences a management system; it confers no AI Act presumption of conformity.

### Integrating with 27001, 27701 and 9001

ISO designed management-system standards to share a structure so that an organisation can run one
integrated management system meeting several of them at once [43]. For AI that means ISO/IEC 42001
alongside ISO/IEC 27001:2022 for information security [44], ISO/IEC 27701 for privacy, whose 2025
edition is a standalone privacy information management system that can be used on its own or aligned
with 27001 [45], and ISO 9001 for quality, whose 2026 edition replaced the 2015 edition in September
2026 [46].

| Shared clause (Harmonized Structure) | One artefact serving all four | Layer |
|---|---|---|
| 4 Context | One scope statement and interested-party register, with AI systems as registry entries | 2 |
| 5 Leadership | One policy set as code, with AI, security, privacy and quality sections | 1 |
| 6 Planning | One risk register with typed risks (AI, security, privacy, quality) and one treatment workflow | 1 |
| 7 Support | One competence and training record; one documented-information store | 5 |
| 8 Operation | Pipeline gates tagged with the standards each serves | 1 · 3 · 4 |
| 9 Performance evaluation | One evidence store answering internal audit for all four | 5 |
| 10 Improvement | One nonconformity and corrective-action queue fed by incidents | 5 |

> **In practice (illustrative)**
> A team that already held ISO/IEC 27001 added 42001 by extending, not duplicating. The risk
> register gained an `ai` risk type and a link to the registry id; the internal audit programme
> gained AI controls; the Statement of Applicability for 42001 was generated from the same control
> metadata as the 27001 one. The certification audit found the evidence where the 27001 auditors had
> always found it. The one new artefact was the impact assessment, built to 42005 and attached to
> each high-risk registry entry.

## Harmonised standards under the AI Act

*Last reviewed 2026-09-24. Stages change monthly; re-check before relying on any row.*

### How presumption of conformity works

Article 40 of the AI Act presumes that high-risk systems (and general-purpose AI models) conform
with the corresponding requirements when they conform with harmonised standards whose references
have been published in the Official Journal, to the extent the standards cover those requirements
[2]. Two conditions gate the presumption: a European standard adopted on a Commission request, and
its reference cited in the OJ after the Commission assesses it. Publication by CEN-CENELEC alone is
not enough. Where standards do not arrive, are not accepted or insufficiently address fundamental
rights, Article 41 lets the Commission adopt **common specifications** by implementing act instead
[2].

The Commission first asked CEN and CENELEC for AI standards on 22 May 2023 (`C(2023)3215`,
registered as request `M/593`) [47][48]. After CEN-CENELEC reported significant delays, the
Commission repealed and replaced that request in June 2025 with `C(2025)3871`, aligned with the
final AI Act text [47]. The request covers ten topics: risk management; governance and quality of
datasets; record keeping; transparency; human oversight; accuracy; robustness; cybersecurity;
quality management; conformity assessment [49]. In October 2025 CEN and CENELEC adopted exceptional
measures to accelerate delivery, including direct publication after a positive Enquiry vote without
a separate Formal Vote, with the priority deliverables targeted for Q4 2026 [48].

The timing interacts with the Digital Omnibus, which moved the application of the Annex III
high-risk obligations to 2 December 2027 and of Annex I to 2 August 2028 [50]. For most providers
the standards should therefore land before the obligations apply, but not long before, which leaves
little room to build to a final text.

### The JTC 21 programme

The work sits in the joint technical committee CEN-CENELEC JTC 21, organised in working groups on
operational aspects, engineering aspects, foundational and societal aspects, and cybersecurity [51].
Stages below come from a pan-European standards information point run with national standards bodies
[52] and are cross-checked against a public tracker [53]; both are secondary, and the article
mapping is as reported by those sources.

| Deliverable | Subject | AI Act | Stage as of 2026-09-24 (reported) | What it changes in the stack | Layer |
|---|---|---|---|---|---|
| `EN 18286:2026` | Quality management system for AI Act purposes | `Art. 17` | Published July 2026 [54]; no OJ citation found | QMS processes run as pipeline stages; design and change control leave evidence | 1 · 5 |
| `prEN 18228` | AI risk management | `Art. 9` | Enquiry vote closed 30 Jul 2026 | Provider risk file: hazard, estimate, evaluate, control, monitor; acceptability criteria as code | 1 · 3 · 5 |
| `prEN 18229-1` | Trustworthiness framework, Part 1: logging | `Art. 12` | Enquiry vote closed 20 Aug 2026 | Event-log schema and retention for high-risk systems | 4 · 5 |
| `prEN 18229-2` | Part 2: transparency | `Art. 13` | Drafting (comment period closed Jan 2026) | Instructions-for-use and model-card fields | 2 |
| `prEN 18229-3` | Part 3: human oversight | `Art. 14` | Enquiry launched 30 Jul 2026 | Oversight checkpoint design; oversight telemetry | 4 |
| `prEN 18229-4`, `-5` | Parts 4 and 5: accuracy, robustness | `Art. 15` | New projects approved 24 Jun 2026 | Accuracy and robustness thresholds in the eval gate | 3 |
| `prEN 18282` | Cybersecurity specifications for AI systems | `Art. 15` | Enquiry vote closed 30 Jul 2026 | Threat model; adversarial suite; runtime detection | 3 · 4 |
| `prEN 18283` | Managing bias in AI systems | `Art. 10` | Approved for Enquiry 24 Sep 2026 | Bias measures in fairness evals; bias-data handling | 2 · 3 |
| `prEN 18284` | Quality and governance of datasets | `Art. 10` | Drafting; no Enquiry recorded (verify) | Data cards; lineage; dataset acceptance tests | 2 · 3 |
| `prEN 18285` | Conformity assessment framework | `Art. 43` | Drafting; no Enquiry recorded (verify) | Structure of the evidence pack for assessment | 5 |
| `prEN 18281`, `prEN ISO/IEC 23282` | Accuracy evaluation for computer vision and for NLP | `Art. 15` | 18281: Enquiry vote closed 11 Jun 2026; 23282: Enquiry from 3 Sep 2026 | Task-specific eval methods and metrics | 3 |

Some ISO/IEC standards have also been adopted as European standards (for example `EN ISO/IEC
23894:2024` [52]). Adoption as an EN does not make a standard harmonised under the AI Act: only a
standard delivered on the Commission's request and cited in the OJ carries the presumption. As of
2026-09-24 we found no Commission implementing decision citing any AI Act harmonised standard,
consistent with the June 2026 tracker [53] and with [chapter
08](/bok/regulatory-map#what-is-not-harmonised-yet) (verify on EUR-Lex before relying on it).

### What each deliverable changes in the stack

The drafts are not public, so this is a reading of their published scopes, not of their clauses.
Three shifts stand out.

**Risk management moves from the organisation to the product.** The published scope of prEN 18228
addresses providers of AI systems: identify hazards, estimate and evaluate risks, control them and
monitor the controls, for risks to health, safety and fundamental rights, across the lifecycle. It
requires providers to set objective risk-acceptability criteria but does not set the levels, and it
is not intended for managing risks the organisation itself faces [52]. That is a different object
from ISO/IEC 23894, which guides organisational risk management [35]. In the stack, the risk file
becomes a per-system artefact keyed to the registry id, with acceptability criteria written as
thresholds a gate can evaluate, and monitoring that closes the loop in layer 05.

**Logging, oversight and transparency become specifiable.** The prEN 18229 series splits Articles
12–15 into separate parts [52]. Once final, the logging part is a schema to validate event logs
against in CI, the oversight part a design reference for the [**Human-in-the-loop
Gate**](/patterns/human-in-the-loop-gate), and the transparency part a field list for
the model card and instructions for use.

**The QMS becomes auditable as a pipeline.** EN 18286 supports the Article 17 quality management
system [54]. A QMS whose design control, change management and post-market monitoring run as
pipeline stages emits its own evidence; one that lives in procedures does not. The
[**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal)
pattern is how that evidence reaches an assessor.

### Building before the OJ citation

The gap between a draft and a cited standard is where most teams will spend 2026 and 2027. Three
rules keep the work reusable:

1. **Build to the requirement, map to the standard.** The AI Act article is fixed; the standard's
   clause numbering is not. Key controls on `Art. 9`, `Art. 12` and so on, and add standard clause
   ids as metadata when the text is final.
2. **Keep a standards watch as data.** One file with each deliverable, its stage, the date you last
   checked and the controls that depend on it. A stage change is then a diff that names the controls
   to re-review, not a surprise.
3. **Do not claim the presumption early.** Until the OJ citation exists, conformity with a draft or
   a published EN is evidence on its own merits, not a presumption. Say so in the technical
   documentation.

> **In practice (illustrative)**
> A provider of a high-risk recruitment tool built its risk file to the published scope of prEN
> 18228 while the draft was at Enquiry: hazards, estimates, controls and monitoring per system, with
> acceptability thresholds as code. When EN 18286 was published, the team compared its QMS process
> list with the pipeline stages it already ran and found two gaps (supplier change notification and
> a post-market review cadence). Both became pipeline stages with owners. The standards-watch file
> recorded the date of each check, which is what an assessor asked to see.

## IEEE 7000 series

The IEEE 7000 series approaches ethics as systems-engineering process. None of these standards is
harmonised under the AI Act, and none confers a presumption; they are useful as process references.

| Standard | Subject | What it changes in the stack | Layer |
|---|---|---|---|
| `IEEE 7000-2021` | Model process for considering ethical values from concept exploration through development, with stakeholder value elicitation and traceability [55] | Value requirements traced to design decisions and tests | 1 |
| `IEEE 7001-2021` | Transparency of autonomous systems, in measurable, testable levels [56] | Transparency levels written as testable requirements | 2 · 3 |
| `IEEE 7002-2022` | Data privacy process for systems using personal data [57] | Privacy requirements as SDLC gates | 1 · 2 |
| `IEEE 7003-2024` | Algorithmic bias considerations, incl. validation-data selection and application boundaries [58] | Bias validation sets; declared application boundaries in the registry | 2 · 3 |
| `IEEE 7005-2021` | Transparent employer data governance [59] | Handling rules for employee data used by AI | 2 |
| `IEEE 7010-2020` | Recommended practice for assessing the impact of autonomous and intelligent systems on human well-being [60] | Well-being indicators in the impact assessment | 2 |

IEEE 7003's "application boundaries for which the algorithm has been designed" is the most portable
idea here: a declared boundary in the registry entry is something a runtime guardrail can enforce
and an eval can test against [58].

## One control, many instruments

The instruments overlap far more than their authors' different vocabularies suggest. The table
shows, for seven controls the stack already builds, where each instrument asks for them. It is a
starting point for a crosswalk file, not a claim that the rows are equivalent.

| Control (layer) | OECD | CoE CETS 225 | G7 Code | NIST AI RMF | ISO/IEC | JTC 21 |
|---|---|---|---|---|---|---|
| Risk and impact assessment (1 · 2) | `1.5(c)` | `Art. 16` | Action 1 | MAP 5, MANAGE 1 | 23894, 42005 | prEN 18228 |
| Testing before release and on change (3) | `1.4(a)` | `Art. 16(2)(g)` | Action 1 | MEASURE 1, 2 | 42001 `A.6` | prEN 18229-4, -5 |
| Traceability and logging (4 · 5) | `1.5(b)` | `Art. 14(2)(a)` | Action 1 | MEASURE 3, MANAGE 4 | 42001 `A.6` | prEN 18229-1 |
| Transparency and disclosure (2 · 4) | `1.3` | `Art. 8`, `15(2)` | Action 3 | MEASURE 2.8 | 42001 `A.8` | prEN 18229-2 |
| Human oversight and override (4) | `1.2(b)`, `1.4(b)` | `Art. 8` | – | MAP 3.5, MANAGE 2.4 | 42001 `A.9` | prEN 18229-3 |
| Incident handling and sharing (5) | – | `Art. 16(3)` | Actions 2, 4 | GOVERN 4.3, MANAGE 4.3 | 42001 `10.2` | – |
| Supply chain and third parties (2) | `1.5(c)` | – | Action 11 | GOVERN 6, MANAGE 3 | 42001 `A.10` | – |

Sources: [7][1][10][9][40][52]; the ISO/IEC 42001 clause and Annex A ids follow [chapter
08](/bok/regulatory-map#isoiec-42001-42005-and-42006) and the site's
[crosswalk](/resources/crosswalk), whose [explorer](/resources/crosswalk#explore) derives these pairs
for any two instruments and exports them as an OSCAL mapping collection. Mappings are illustrative,
not a claim of conformity.

The engineering rule is the one from the [regulatory
translation](/bok/the-role#regulatory-translation) workflow: build each control once, tag it with
every instrument it serves, and generate each instrument's view from the tags. A principle, a treaty
article, a subcategory and a harmonised clause then become four queries over the same evidence, and
adding a fifth instrument is a metadata change, not a new programme.

**Maps to:** OECD AI Principles `1.1`–`1.5` · CoE CETS No. 225 Arts. 14–16 · G7 Hiroshima Code of
Conduct actions 1–7, 10, 11 · EU AI Act Art. 9–15, 17, 40, 41 · ISO/IEC 22989, 23894, 42001, 42005,
42006 · NIST AI RMF (Govern, Map, Measure, Manage) and AI 600-1 · CEN-CENELEC JTC 21 deliverables ·
all five layers of the stack. Mappings are illustrative, not a claim of conformity.

## What you can do this week

1. **Add the five OECD classification dimensions to your registry schema** as required fields, and
   make one policy read one of them (for example, `rights_impact: high` requires a fairness eval).
2. **Tag your ten most important controls with NIST AI RMF subcategory ids and ISO/IEC 42001 clause
   ids**, pinned to the edition, and generate a Current Profile from the tags.
3. **Start a standards-watch file** listing each JTC 21 deliverable in the table above, its stage,
   the date you checked and the controls that depend on it; set a monthly review.
4. **Take your organisation's published AI principles and name, for each, the control and the
   evidence record that implement it.** A principle with no control is a gap; write it down as one.
5. **If you hold ISO/IEC 27001, map its shared clauses to the 42001 ones** and point both at one
   evidence store before you write any new procedure.

## Sources

[1] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 2 definition; Art. 3 scope and private-actor declaration; Arts. 7–13 principles; Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 40 and 41 (Art. 40: harmonised standards, presumption of conformity once references are published in the OJ; Art. 41: common specifications by implementing act). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_40 (verified: primary)
[3] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; definition and lifecycle used by the EU, the Council of Europe, the US and the UN; AI Incidents and Hazards Monitor; Hiroshima AI Reporting Framework). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[4] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values, ten core principles, policy action areas). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[5] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[6] Ethics Guidelines for Trustworthy AI (lawful, ethical, robust; seven key requirements; human-in-the-loop, human-on-the-loop, human-in-command; "a fall back plan in case something goes wrong"). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[7] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; G20 AI Principles drawn from it, June 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles, five recommendations; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[8] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (Fig. 1 harms; risk tolerance not prescribed; Fig. 2 lifecycle and dimensions adapted from the OECD; seven trustworthy characteristics; Core of 4 functions and 19 categories, 72 subcategories by our count of Tables 1–4; use-case, temporal and cross-sectoral profiles; formal review no later than 2028). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; living document building on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[11] "Council of Europe adopts first international treaty on artificial intelligence" (adopted in Strasbourg on 17 May 2024; opens for signature in Vilnius on 5 September 2024). Council of Europe. 2024-05-17. https://www.coe.int/en/web/portal/-/council-of-europe-adopts-first-international-treaty-on-artificial-intelligence (verified: primary)
[12] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[13] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), Recitals 12 and 27 and Art. 3(1) (recital 27: the seven AI HLEG principles as non-binding guidance; recital 12: the AI-system notion closely aligned with the work of international organisations; Art. 3(1)). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[15] Catalogue of Tools & Metrics for Trustworthy AI. OECD.AI. 2026. https://oecd.ai/en/catalogue/overview (verified: primary)
[16] Readiness Assessment Methodology (RAM): country-level readiness to govern AI (RAM 2.0). UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/ram (verified: primary)
[17] Ethical Impact Assessment (EIA): system-level assessment before and during use, for governments, companies and researchers. UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/eia (verified: primary)
[18] "EU Parliament backs EU conclusion of the Council of Europe Framework Convention on Artificial Intelligence" (European Parliament approval on 11 March 2026). Council of Europe. 2026-03-11. https://www.coe.int/en/web/artificial-intelligence/-/eu-parliament-backs-eu-conclusion-of-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[19] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors; OJ L 13 May 2026; text read through a search index, direct EUR-Lex fetch blocked). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: secondary)
[20] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 February 2025; HUDERIA Model: COBRA approved 25 February 2026; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[21] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list 17 July 2020 after a pilot with over 350 stakeholders; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[22] NIST AI RMF Playbook, GOVERN entries (per subcategory: About; Suggested Actions; Transparency and Documentation; AI Transparency Resources; References). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[23] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV/MP/MS/MG, 212 identifiers by our count). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[24] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; concept note for a critical-infrastructure profile, 7 April 2026). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[25] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[26] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (augments SSDF 1.1). NIST. 2024-07-26. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[27] The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Functions: Govern, Identify, Protect, Detect, Respond, Recover). NIST. 2024-02-26. https://doi.org/10.6028/NIST.CSWP.29 (verified: primary)
[28] NIST IR 8596 (initial preliminary draft): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile; comments closed 30 January 2026). NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[29] SP 800-53 Control Overlays for Securing AI Systems (COSAiS) (five use cases; concept paper 14 August 2025; predictive-AI annotated outline 8 January 2026; page updated 8 January 2026). NIST CSRC. 2026-01-08. https://csrc.nist.gov/projects/cosais (verified: primary)
[30] AI RMF crosswalk documents (AI RMF to ISO/IEC 42001; ISO/IEC 23894 revised crosswalk and ISO/IEC 42005 crosswalk dated 14 August 2025). NIST Trustworthy and Responsible AI Resource Center. 2025. https://airc.nist.gov/airmf-resources/crosswalks/ (verified: primary)
[31] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[32] ISO/IEC 23053:2022, Framework for AI systems using machine learning. ISO/IEC. 2022-06. https://www.iso.org/standard/74438.html (verified: primary)
[33] ISO/IEC 5338:2023, AI system life cycle processes (based on ISO/IEC/IEEE 15288 and 12207, with AI-specific processes from ISO/IEC 22989 and 23053). ISO/IEC. 2023-12. https://www.iso.org/standard/81118.html (verified: primary)
[34] ISO/IEC TR 24028:2020, Overview of trustworthiness in artificial intelligence. ISO/IEC. 2020-05. https://www.iso.org/standard/77608.html (verified: primary)
[35] ISO/IEC 23894:2023, AI: Guidance on risk management (organisational AI risk management). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[36] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making. ISO/IEC. 2021-11. https://www.iso.org/standard/77607.html (verified: primary)
[37] ISO/IEC 5259 series, Data quality for analytics and machine learning (Part 1:2024 overview, terminology and examples; Part 4:2024 process framework; Part 5:2025 governance framework). ISO/IEC. 2024-07. https://www.iso.org/standard/81088.html (verified: primary)
[38] ISO/IEC 25059:2023, SQuaRE: Quality model for AI systems (stage 90.92, to be revised, as of 2026-09-24). ISO/IEC. 2023-06. https://www.iso.org/standard/80655.html (verified: primary)
[39] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[40] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AIMS). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[41] ISO/IEC 42005:2025, AI system impact assessment (guidance). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[42] ISO/IEC 42006:2025, Requirements for AIMS audit and certification bodies (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[43] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[44] ISO/IEC 27001:2022, Information security management systems. ISO/IEC. 2022-10. https://www.iso.org/standard/82875.html (verified: primary)
[45] ISO/IEC 27701:2025, Privacy information management systems: Requirements and guidance (independent management system standard; aligns with ISO/IEC 27001). ISO/IEC. 2025-10. https://www.iso.org/standard/85819.html (verified: primary)
[46] ISO 9001:2026, Quality management systems: Requirements (replaces ISO 9001:2015). ISO. 2026-09. https://www.iso.org/standard/9001 (verified: primary)
[47] Commission Implementing Decision C(2025)3871 on a standardisation request to CEN and Cenelec in support of Reg. (EU) 2024/1689, repealing Implementing Decision C(2023)3215 of 22 May 2023 (significant delays reported by CEN and Cenelec; request aligned with the final AI Act). European Commission. 2025-06-23. https://ec.europa.eu/transparency/documents-register/detail?ref=C(2025)3871&lang=en (verified: primary)
[48] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; drafting group for delayed drafts; Q4 2026 target; Standardization Request M/593 and Amendment M/613). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[49] AI Act standardisation (ten requested topics; prEN 18286 first to public enquiry on 30 October 2025; page updated 3 August 2026). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[50] "AI Omnibus enters into force" (Reg. (EU) 2026/1744; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[51] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity; prEN 18229 in five parts). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[52] Project stages for JTC 21 deliverables read on 2026-09-24: EN 18286:2026 (60.60, 2026-07-22); prEN 18228 (40.60, vote closed 2026-07-30; published scope); prEN 18229-1 (40.60, 2026-08-20); prEN 18229-2 (20.60, 2026-01-06); prEN 18229-3 (40.20, 2026-07-30); prEN 18229-4 and -5 (10.99, 2026-06-24); prEN 18281 (40.60, 2026-06-11); prEN 18282 (40.60, 2026-07-30); prEN 18283 (30.99, 2026-09-24); prEN 18284 (10.99); prEN 18285 (10.99); prEN ISO/IEC 23282 (40.20, 2026-09-03); EN ISO/IEC 23894:2024 (60.60). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[53] JTC 21 standards tracker (AI Act article per deliverable; no JTC 21 deliverable cited in the OJ as of June 2026). kla.digital. 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[54] "EN 18286 in the spotlight: supporting compliance with the AI Act" (EN 18286:2026, Artificial intelligence: Quality management system for EU AI Act regulatory purposes; supports Art. 17). CEN-CENELEC. 2026-07-30. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[55] IEEE 7000-2021, Standard Model Process for Addressing Ethical Concerns during System Design. IEEE SA. 2021. https://standards.ieee.org/standard/7000-2021.html (verified: primary)
[56] IEEE 7001-2021, Standard for Transparency of Autonomous Systems. IEEE SA. 2021. https://standards.ieee.org/standard/7001-2021.html (verified: primary)
[57] IEEE 7002-2022, Standard for Data Privacy Process. IEEE SA. 2022. https://standards.ieee.org/standard/7002-2022.html (verified: primary)
[58] IEEE 7003-2024, Standard for Algorithmic Bias Considerations (validation-data selection; application boundaries). IEEE SA. 2024. https://standards.ieee.org/standard/7003-2024.html (verified: primary)
[59] IEEE 7005-2021, Standard for Transparent Employer Data Governance. IEEE SA. 2021. https://standards.ieee.org/standard/7005-2021.html (verified: primary)
[60] IEEE 7010-2020, Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being. IEEE SA. 2020. https://standards.ieee.org/standard/7010-2020.html (verified: primary)
