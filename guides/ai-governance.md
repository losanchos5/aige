# What is AI governance?

> AI governance is the set of rules, roles, processes and technical controls that an organisation
> or a state uses to decide which AI systems it builds or uses, what those systems may do, and how
> it proves they stay within those limits. It spans law, standards and internal policy, and it is
> judged by evidence, not by documents.

**In short.** AI governance answers three questions about every AI system in use: what is running,
what it is allowed to do, and what evidence proves it. The rules come from several layers at once:
binding law such as the EU AI Act, international standards such as ISO/IEC 42001, voluntary
frameworks such as the NIST AI Risk Management Framework, and principle sets such as the OECD AI
Principles. An organisation turns those rules into roles (a board that sets risk appetite, a
committee that decides exceptions, owners for each system), into controls (an inventory, risk
tiers, tests that can block a release, guardrails at runtime, an incident process) and into
records an auditor can read. This page defines the term from the primary sources, compares the
main frameworks, and sets out who does what, how maturity is judged, how to implement it and how
to measure it. Where it describes practice, it follows the
[Body of Knowledge](/bok), which treats each topic in full.

## What is AI governance?

AI governance is how an organisation or a state keeps its use of AI inside chosen limits. It sets
rules for which systems may exist and what they may do, assigns people to own and decide, runs
controls that enforce the rules, and keeps evidence that the controls worked. Law, standards and
internal policy all feed it.

Read the definition in three parts. The **rules** are external (a statute, a treaty, a standard a
customer demands) and internal (an AI policy, risk appetite, acceptable-use rules). The **roles**
are the people who set the rules, decide the cases the rules do not settle, and answer for the
outcome. The **controls and evidence** are what makes the rules true on a given day: a register of
the systems in use, tests before release, checks at runtime, and records that show each check ran.

The primary texts do not offer a single sentence to quote. None of the instruments below defines
"AI governance" as a term; each describes what governing AI requires of the people it addresses.
The definition at the top of this page is ours, assembled from what they ask for. The table shows
what each says, in its own framing.

| Source | Kind of text | What it says governing AI involves |
|---|---|---|
| OECD AI Principles (2019, rev. 2024) [1] | Intergovernmental recommendation | Accountability of AI actors (principle 1.5), including traceability of datasets, processes and decisions and systematic risk management at each lifecycle phase; four further values-based principles |
| ISO/IEC 38507:2022 [2] | International standard (guidance) | The governance implications of an organisation's use of AI, written for governing bodies, executives, auditors and policymakers |
| ISO/IEC 42001:2023 [3] | International standard (certifiable) | Requirements for establishing, implementing, maintaining and continually improving an AI management system |
| ISO/IEC 22989:2022 [4] | International standard (terminology) | The shared vocabulary: what an AI system is and the stakeholder roles around it (provider, producer, customer, partner, subject, relevant authorities) |
| NIST AI RMF 1.0 [5] | Voluntary framework | Four functions (Govern, Map, Measure, Manage); Govern is cross-cutting and covers policies, accountability structures, culture and third-party risk; the framework leaves risk tolerance to the organisation |
| EU AI Act [6] | Binding regulation | Risk-based duties on providers and deployers; for high-risk providers, a quality management system that includes "an accountability framework setting out the responsibilities of the management and other staff" [7] |
| UNESCO Recommendation (2021) [8] | Non-binding recommendation to states | Four core values and ten principles, among them "multi-stakeholder and adaptive governance" and "responsibility and accountability" |
| Council of Europe Framework Convention (CETS No. 225) [9] | Binding treaty on its Parties | Graduated risk and impact management, documentation that lets affected people contest decisions, and notice that a person is interacting with an AI system |

Two readings follow from the table. First, "AI governance" works at more than one level:
treaties and principle sets address states, laws address operators, standards address
organisations, and the controls address one system at a time. Second, the texts converge on a
shared core (accountable owners, managed risk, transparency, records) even where their force
differs. That convergence is what makes a single set of controls able to answer several
instruments at once, as the [crosswalk](/resources/crosswalk) shows topic by topic.

AI governance has a narrower sibling. **AI governance engineering** is the practice of building
that governance as running systems: policy as code, tests that can fail a build, a registry the
deploy pipeline writes to, and evidence produced as the systems run. [Chapter 01 defines
it](/bok/definition), and [the role page](/role) describes who does it. The object of governance
is also wider than the model: chapter 01 names five objects (models, systems, agents, data and the
organisation), and a program that governs one of them leaves the other four open
([the object of governance](/bok/definition#the-object-of-governance)).

## Why does AI governance matter now?

AI governance matters now because the rules have dates. The EU AI Act entered into force on 1 Aug
2024 and its duties switch on in stages until 2030; general-purpose AI enforcement began on 2 Aug
2026; Korea's AI Basic Act has applied since 22 Jan 2026. Organisations also report the work is
already under way and understaffed.

The law is the clearest driver. The AI Act is directly applicable in every Member State; its
prohibitions have applied since 2 Feb 2025 and the Commission can fine providers of
general-purpose AI models up to 3% of worldwide annual turnover or EUR 15 million, whichever is
higher, since 2 Aug 2026 [6][10]. The Digital Omnibus, Regulation (EU) 2026/1744,
entered into force on 27 Jul 2026 and moved the high-risk dates: Annex III obligations now apply
from 2 Dec 2027 and Annex I obligations from 2 Aug 2028 [11]. The extra time is runway, not
relief; the controls still have to be built.

| Date | What applies or happened | Source |
|---|---|---|
| 2019-05-22 | OECD Council adopts the Recommendation on AI | [1] |
| 2021-11 | UNESCO Member States adopt the Recommendation on the Ethics of AI | [8] |
| 2023-01-26 | NIST publishes the AI RMF 1.0 | [5] |
| 2023-12 | ISO/IEC 42001 published | [3] |
| 2024-08-01 | EU AI Act enters into force | [6] |
| 2025-02-02 | AI Act prohibitions and AI literacy duty apply | [6] |
| 2025-08-02 | AI Act duties for general-purpose AI models apply | [6] |
| 2026-01-01 | California SB 53 (frontier AI transparency) in force | [12] |
| 2026-01-22 | Korea's AI Basic Act in force | [13] |
| 2026-05-15 | The EU ratifies the Council of Europe Framework Convention | [14] |
| 2026-07-27 | Digital Omnibus on AI in force | [11] |
| 2026-08-02 | AI Act general application; Commission fines on GPAI providers possible | [10] |
| 2026-12-02 | Two new AI Act prohibitions apply (non-consensual intimate imagery, child sexual abuse material) | [11] |
| 2027-12-02 | AI Act high-risk obligations for Annex III systems | [11] |
| 2028-08-02 | AI Act high-risk obligations for Annex I products | [11] |

Outside the EU the picture is mixed but moving. California's SB 53, in force since 1 Jan 2026,
requires large frontier developers to publish a frontier AI framework and every frontier developer
to report critical safety incidents to the state within 15 days [12]. Korea's AI Basic Act
applies to operators whose conduct affects the Korean market, with fines subject to a guidance
period of at least one year [13]. [Chapter 21](/bok/ai-laws-worldwide#the-landscape-at-a-glance)
compares the regimes jurisdiction by jurisdiction.

Standards do not yet offer a shortcut. As of 2026-09-24 no harmonised standard under the AI Act is
cited in the Official Journal, so no standard yet gives a presumption of conformity [15]. An
organisation has to build its controls and be able to defend them on their merits.

Organisations report the same pressure from the inside. In the IAPP's 2025 profession report, 77%
of organisations said they were working on AI governance, and of 671 respondents only 1.5% said
they would not need more AI governance staff in the next 12 months [16]. Gartner forecasts AI
governance spending of USD 492 million in 2026, passing USD 1 billion by 2030 [17].
[Chapter 02](/bok/why-now) sets out the full case, including the shift to AI agents that act under
delegated authority, which legacy governance was not built to see.

## What are the principles of AI governance?

The published principle sets agree on seven shared principles: fairness, safety and reliability,
privacy and security, transparency and explainability, accountability, human-centricity, and
sustainability. A principle counts as applied only when it is traced to a control that can act
and to evidence someone can query, not when it is written in a charter.

The four main sets (OECD, UNESCO, the EU High-Level Expert Group and the G7 Hiroshima Process)
differ in emphasis and agree in substance; [chapter 11](/bok/ai-defined#where-the-sets-agree)
tabulates where each states each principle. The table below reads each shared principle as a
control and the evidence that control leaves. It is a starting map, not a claim that any
artefact satisfies a principle.

| Principle | Control that makes it real | Evidence it leaves |
|---|---|---|
| Fairness and non-discrimination | Subgroup evaluations with a declared threshold, run in the release pipeline; an impact assessment before first use | Eval results per group and version; signed impact assessment |
| Safety and reliability | Adversarial and regression tests that block a release; a tested way to stop the system | Eval and red-team results per version; kill-switch drill records |
| Privacy and security | Policy checks on data class and residency; scoped credentials for every system and agent | Policy verdicts; credential scopes; data protection impact assessment |
| Transparency and explainability | Model and data cards kept current; disclosure at the point of interaction; reason codes per decision | Cards linked to the register; disclosure logs; logged reason codes |
| Accountability | A named owner per system; decision records for exceptions; an incident process | Register owner field; exception register; incident records |
| Human-centricity | Human approval at defined high-consequence decisions; an appeal route | Approval logs, override rates and appeal outcomes |
| Sustainability | Compute and energy recorded per evaluation and per inference volume | Energy or compute figures in the evidence store; model-size decision record |

The OECD text shows how operational a principle can be. Principle 1.4 asks for mechanisms so that
AI systems that risk undue harm can be "overridden, repaired, and/or decommissioned safely"
[1]. In control terms that is a stop mechanism with a tested revocation path, the
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) pattern. The book's own
[six principles](/bok/values-and-principles#the-six-principles) are rules of method rather than
targets: build each control at the earliest point it can block, give every control teeth, and
start from a named harm.

## What does an AI governance framework include?

An AI governance framework includes an inventory of AI systems, a way to classify them by risk,
policies written so they can be checked, impact assessments, tests before release, human oversight
where it is needed, runtime controls, an incident process, and evidence that ties each control to
the obligation it serves. Roles and decision rights hold it together.

Most frameworks list the same components in different words. The list below groups them by what
they do, and names the layer of the [five-layer stack](/stack) that produces each one. The stack
is the Body of Knowledge's reference architecture; its order is a build order, because each layer
consumes what the layer before it produces
([how to read the stack](/bok/the-stack#how-to-read-the-stack)).

- **Rules as code (layer 01, Govern-as-Code).** The AI policy, risk appetite and acceptable-use
  rules, written so a pipeline or a runtime can evaluate them and record a verdict.
- **Inventory (layer 02, Inventory & Transparency).** A register of every model, system and agent,
  each with an owner, a purpose and a risk tier, fed by the deploy pipeline rather than typed by
  hand; model cards, data cards and an AI bill of materials (AIBOM) attached to each entry.
- **Risk and impact assessment (layers 01 and 02).** A tier computed at intake, and impact
  assessments such as a data protection impact assessment or a fundamental rights impact
  assessment, versioned and reopened when the system changes.
- **Testing as evidence (layer 03, Evals & Red Teaming as Evidence).** Capability, safety,
  fairness and adversarial evaluations wired into the release pipeline, with thresholds that can
  fail the build.
- **Runtime control (layer 04, Runtime Controls & Observability).** Guardrails on inputs and
  outputs, human approval at defined decision points, identity and scope for every agent, and a
  tested way to stop a system.
- **Assurance (layer 05, Assurance & Continuous Compliance).** Monitoring, incident handling,
  internal audit and machine-readable evidence, so an audit becomes a query.
- **The organisation.** A board that sets appetite, a committee that decides what a gate cannot,
  and owners for every system (see [who is responsible](#who-is-responsible-for-ai-governance)).

Data governance runs through all five layers rather than sitting in one: training data, retrieval
corpora, prompts and outputs each carry a lawful basis, a provenance and a retention rule
([data governance across the stack](/bok/the-stack#data-governance-across-the-stack)). The figure
below draws the five layers and the evidence that flows up through them.

## How do the main AI governance frameworks compare?

The main AI governance frameworks differ in legal force and audience. The EU AI Act is binding law
on operators; the Council of Europe Convention is a treaty that binds states; ISO/IEC 42001 is a
certifiable management-system standard; the NIST AI RMF is a voluntary risk framework; the OECD,
UNESCO and G7 texts are principles and codes.

| Framework | Issuer, date | Legal force | Who it applies to | Key artefacts it asks for |
|---|---|---|---|---|
| EU AI Act, Reg. (EU) 2024/1689 as amended by Reg. (EU) 2026/1744 | European Union, in force 2024-08-01 | Binding regulation; fines up to EUR 35 million or 7% of worldwide annual turnover for prohibited practices | Providers, deployers, importers and distributors of AI systems in the EU market; providers of general-purpose AI models | Risk classification, technical documentation, quality management system, logs, human oversight, fundamental rights impact assessment, serious-incident reports |
| ISO/IEC 42001:2023 | ISO/IEC JTC 1/SC 42, 2023-12 | Voluntary; certifiable; no presumption of conformity with the AI Act | Any organisation that develops, provides or uses AI | AI management system: policy, roles, risk and impact assessment, Statement of Applicability, internal audit, management review |
| NIST AI RMF 1.0 (NIST AI 100-1) | NIST (US), 2023-01-26 | Voluntary | Any organisation; described as non-sector-specific and use-case agnostic | Govern, Map, Measure and Manage functions in 19 categories; use-case, temporal and cross-sectoral profiles |
| OECD AI Principles | OECD, 2019, revised 2024 | Political commitment by 47 adherents | Governments (recommendations) and AI actors (principles) | Shared AI-system definition and lifecycle; five principles |
| Council of Europe Framework Convention (CETS No. 225) | Council of Europe, adopted 2024-05-17 | Binding on Parties once in force; not in force as of 2026-09-24 | Parties; public authorities, and private actors as each Party declares | Risk and impact management, contestability records, notice of AI interaction |
| UNESCO Recommendation on the Ethics of AI | UNESCO, 2021-11 | Non-binding; adopted by 193 Member States | States | Ethical Impact Assessment; Readiness Assessment Methodology |
| G7 Hiroshima Code of Conduct | G7, 2023-10-30 | Voluntary; OECD reporting framework since 2025-02-07 | Organisations developing the most advanced AI systems | Lifecycle risk testing, public capability reporting, incident sharing, content provenance |
| Korea AI Basic Act | Republic of Korea, in force 2026-01-22 | Binding, horizontal statute | AI business operators, including conduct abroad that affects Korea | Duties for high-impact AI, prior notice and labelling, a domestic representative |

Sources: [6][11][3][15][5][18][9][19][8][20][21][13].

Three practical points follow. **Force decides priority.** Where the AI Act applies, it sets the
floor and the dates; the standards and frameworks are ways to organise the work and show it.
**A certificate is not compliance.** An ISO/IEC 42001 certificate evidences a management system;
it gives no presumption of conformity with the AI Act, because no harmonised standard is cited in
the Official Journal yet [15]. **One control can serve many instruments.** Tag each control with
the clauses it serves and generate the mapping from those tags, as the
[Framework Crosswalk](/patterns/framework-crosswalk) pattern does, instead of keeping one binder
per framework. Inside the EU, the Council Decision concluding the Convention states that it is
implemented through the AI Act and other Union law, so the treaty adds no separate set of private
sector duties there [22].

For every instrument the Body of Knowledge maps, see the [frameworks page](/resources/frameworks),
the [obligation register](/obligations), and [chapter 22](/bok/principles-and-standards) for the
principles and standards in depth.

## Who is responsible for AI governance?

Responsibility for AI governance is shared, and each role owns an artefact. The board sets risk
appetite and oversees; executives accept the largest risks; a committee decides exceptions; product
owners are accountable for each system; engineering builds inside the controls; second-line
functions set method; internal audit gives independent assurance.

The law already expects the structure to be designed. The AI Act requires a high-risk provider's
quality management system to include an accountability framework for management and staff
[7], and requires deployers of high-risk systems to assign human oversight to people with
"the necessary competence, training and authority" [23]. The NIST AI RMF states that
executive leadership "takes responsibility for decisions about risks associated with AI system
development and deployment" [5].

| Role | Duty in AI governance | Artefact it owns or signs |
|---|---|---|
| Board (governing body) | Sets AI risk appetite; oversees the program | Appetite statement; board minutes |
| Executive leadership | Owns AI risk decisions; funds the program | Signed risk acceptances; budget |
| Chief AI Officer (or CDAO) | Runs the use-case portfolio; often chairs the committee | Portfolio; use-case inventory |
| AI governance committee | Decides what a gate cannot: residual risk, exceptions, value trade-offs | Decision records; exception register |
| Legal, privacy and DPO | Read obligations; advise on and sign data protection impact assessments | Obligation register; DPIA |
| CISO and security | Threat models, security controls, incident response | Threat models; red-team results |
| Risk (second line) | AI risk taxonomy inside enterprise risk; challenge; risk indicators | Risk register; indicator thresholds |
| Internal audit (third line) | Independent assurance over the design and operation of controls | Audit reports; tested samples |
| Product owner | Accountable for one system's use case, value and risk | Justification memo; register owner field |
| Engineering (ML, data, platform) | Builds and runs the system inside the controls | Code; eval results; AIBOM |
| AI governance engineer | Builds the gates, the register and the evidence path | Policy code; evidence store |

The pattern behind the table is the Institute of Internal Auditors' Three Lines Model: the
governing body is accountable for oversight, management carries the first- and second-line roles,
and internal audit stays independent of what it assures [24]. The US federal government gives a
public template for the executive seat: OMB Memorandum M-25-21 of 3 Apr 2025 required each agency
to designate a Chief AI Officer within 60 days and to review high-impact use cases independently
before accepting their risk [25].

One rule keeps the structure honest: the committee decides, the gates enforce. People take the
decisions that need judgement; code enforces them on every change and leaves the record.
[Chapter 12](/bok/governance-program#the-stakeholder-map) gives the full stakeholder map and a
lifecycle RACI. The AI governance engineer usually sits in the second line, building the tools the
first line runs; [the role page](/role) and [chapter 06](/bok/the-role) describe that role, its
workflows and its skills.

## What are the levels of AI governance maturity?

AI governance maturity runs from paper to production in five levels: Documented, Inventoried,
Tested, Enforced and Continuous. Each level is proven by what the running systems can show, and a
function sits at the level of its weakest layer, because one strong layer does not compensate for
a missing one.

| Level | What it looks like | Evidence you can show |
|---|---|---|
| 1. Documented | Policies, a spreadsheet inventory and a pre-launch review; nothing executes | Policy documents; a populated spreadsheet; minutes |
| 2. Inventoried | A register the deploy pipeline writes to, with an owner and a scope per system | Register entries for every system; a job that reconciles the register with production |
| 3. Tested | Capability, safety and adversarial evaluations run and are recorded, but a failure blocks nothing | Versioned eval suites; timestamped results; red-team findings |
| 4. Enforced | Policy checks and eval gates block the merge or the deploy; agents need an owner, scope and kill switch to get an identity | Logs of blocked releases with reasons; admission denials; a tracked measure of eval-suite quality |
| 5. Continuous | Assurance comes from runtime telemetry; evidence is emitted as the systems run | A live evidence store; streaming eval and guardrail records; an audit answered by a query |

Maturity also has a geography. Governance happens at the international level (principle sets and
treaties), the national level (laws and regulators), the organisational level (the management
system, the board and the committee) and the system level (the register, the gates and the
runtime controls). The five levels above measure the last two, which are the ones an organisation
controls. [Chapter 07](/bok/maturity-model#the-five-levels) sets out observable criteria per layer
and level, and the [maturity self-check](/toolkit/maturity-self-check) scores a function in the
browser.

## How do you implement AI governance?

Implement AI governance as a thin slice through every layer rather than a thick layer of policy.
Register what is running, route every new use case through one intake, write the key rules as
code, gate releases on tests, put people where decisions need them, control behaviour at runtime,
run incidents on a clock and emit machine-readable evidence.

The eight steps below follow that order. Each names the pattern that describes it and a
template or browser tool to start from.

1. **Register what is running.** Build a register that the deploy pipeline writes to, with an
   owner, a scope and a status for every model, system and agent, and reconcile it against what
   discovery finds in production. Pattern: [Agent Registry](/patterns/agent-registry), with
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery). Start from: the
   [AI register entry builder](/toolkit/ai-register-entry).
2. **Route every use case through one intake.** Record each proposed use in a structured form,
   compute a risk tier from it, and let the tier switch on the gates that apply, including an
   impact assessment before first use. Pattern:
   [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). Start from: the
   [AI Act triage](/toolkit/ai-act-triage) and the [impact assessment builder](/toolkit/impact-assessment).
3. **Write the rules as code.** Express each governance rule (permitted data, permitted uses,
   required approvals) as a machine-readable card that both the pipeline and the runtime evaluate.
   Pattern: [Policy Card](/patterns/policy-card). Start from: the
   [Policy Card builder](/toolkit/policy-card) and the [AI policy template](/resources/templates#kit-ai-policy).
4. **Gate releases on evaluations.** Wire capability, safety, fairness and adversarial tests into
   continuous integration, with documented thresholds, so a regression fails the build. Pattern:
   [Eval Gate in CI](/patterns/eval-gate-in-ci). Start from: the
   [model card builder](/toolkit/model-card) and the
   [fairness metric chooser](/toolkit/fairness-metric-chooser).
5. **Put people where the stakes justify it.** Define the high-consequence decisions that need
   human approval, give the approver the authority and training to refuse, and log every
   approval and override. Pattern: [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
   Start from: the [agent control profile](/toolkit/agent-control-profile).
6. **Control behaviour at runtime.** Enforce the policy on every live call with input and output
   guardrails, give each agent its own identity and scope, and keep a tested way to stop it.
   Pattern: [Runtime Guardrail](/patterns/runtime-guardrail), with
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker). Start from: the
   [agent control profile](/toolkit/agent-control-profile).
7. **Run incidents on a clock.** Detect, triage and report serious incidents within the legal
   window; under the AI Act that is 15 days in general, two days for a widespread infringement or
   serious disruption of critical infrastructure, and 10 days after a death [6]. Pattern:
   [Incident Pipeline](/patterns/incident-pipeline). Start from: the
   [incident clock](/toolkit/incident-clock).
8. **Emit machine-readable evidence.** Have every gate, guardrail and check write a structured,
   timestamped record into one store, in a standard format such as OSCAL, so the audit is a query.
   Pattern: [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal). Start
   from: the [evidence record schema](/resources/templates#schema-evidence-record).

A team of one can do all eight thinly for one system before doing any of them in depth for all
systems; [the minimum viable stack](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)
explains why that order works. The full catalogue has one page per [pattern](/patterns), and
[chapter 12](/bok/governance-program) covers the program around them: committee, policies,
literacy and management review.

## What are examples of AI governance?

The clearest examples of AI governance are the failures it exists to prevent. Public cases show
the same pattern: a system went live without the control that would have caught its failure, and
the organisation paid in fines, liability or losses. Each case below names the control that would
have caught it.

**Dutch childcare benefits (2021).** The Dutch tax administration used applicants' nationality as a
risk indicator in a system that flagged childcare-benefit applications as risky; on 7 Dec 2021 the
Dutch data protection authority fined it EUR 2.75 million for unlawful and discriminatory
processing [26]. The control: a policy card listing the inputs permitted for the
purpose, an eval gate that fails when a prohibited attribute or a close proxy enters the feature
set, and an impact assessment signed before first use
([case analysis](/cases/dutch-childcare-benefits)).

**A health-risk score that predicted cost (2019).** A widely used care-management algorithm
predicted health costs rather than illness, so at the same score Black patients were considerably
sicker than White patients; the authors found that remedying the disparity would raise the share
of Black patients receiving additional help from 17.7% to 46.5% [27]. The control: a model
card that records the gap between the label and what the program wants to predict, and an eval
gate that checks calibration by group ([case analysis](/cases/health-risk-score-proxy)).

**Moffatt v. Air Canada (2024).** A tribunal in British Columbia held Air Canada liable after its
website chatbot misstated the bereavement-fare policy, and rejected the argument that the chatbot
was responsible for its own answers [28]. The control: a runtime guardrail that grounds every
policy answer in the current policy text and refuses when nothing supports it, plus a regression
set of policy questions in the release gate ([case analysis](/cases/moffatt-v-air-canada)).

**Zillow Offers (2021).** Zillow announced on 2 Nov 2021 that it would wind down its home-buying
business, with an inventory write-down of about USD 304 million from buying homes above its
current estimates of their future selling prices [29]. Public filings do not describe its
internal model controls, so this is an illustrative analysis: telemetry comparing each forecast
with the realised price, and a circuit breaker that throttles purchases when the error crosses a
set threshold ([case analysis](/cases/zillow-offers)).

**Clearview AI (2024).** On 3 Sep 2024 the Dutch data protection authority fined Clearview AI EUR
30.5 million for building a facial-recognition database from photos scraped from the internet
[30]. Under the AI Act, systems that build facial recognition databases through
untargeted scraping have been prohibited since 2 Feb 2025 [6]. The control for a buyer: a
vendor due-diligence gate that asks how the reference data was obtained and treats biometric
processing as a stop condition ([case analysis](/cases/clearview-ai)).

The case analyses are engineering readings of public records, not legal findings. The
[cases index](/cases) holds the full set, and the [harms atlas](/resources/harms) lists harms by
level with the control that catches each.

## How does AI governance differ from AI ethics, responsible AI, compliance, safety and data governance?

AI governance is the operating system that the neighbouring fields plug into. AI ethics and
responsible AI set the values; AI compliance reads the legal duties; AI safety research studies
whether models are safe in principle; data governance manages the data. AI governance turns all of
them into owned decisions, running controls and evidence.

| Term | What it covers | How it relates to AI governance |
|---|---|---|
| AI ethics | The values and moral questions raised by AI: fairness, autonomy, harm, dignity | Sets the targets; governance decides which apply to a system and checks them |
| Responsible AI | Published principle sets and the programs that adopt them (OECD, UNESCO, the EU High-Level Expert Group) | A source of principles; governance traces each principle to a control and evidence |
| AI compliance | Interpreting legal duties (the AI Act, the GDPR, sector rules) and advising on them | One input among several; governance builds the control that meets the duty and keeps the proof |
| AI safety | Research into whether powerful models are safe in principle, such as alignment and dangerous capabilities | Governance consumes its findings as test cases and thresholds for systems in production |
| Data governance | Quality, lineage, lawful basis, retention and rights for data | Runs inside AI governance: training data, retrieval corpora, prompts and outputs are governed objects |
| AI governance engineering | The engineering practice of building AI governance as running systems | The way to deliver AI governance so it is enforced and evidenced, not only written |

The borders matter because each neighbour, taken alone, leaves a gap. Ethics without controls stays
on a poster; compliance advice without an owner is never executed; a safety evaluation run once
before launch says nothing about next month's model. [Chapter 01](/bok/definition#the-disambiguation-cluster)
draws the full disambiguation cluster, and the glossary defines
[responsible-AI principle sets](/glossary/responsible-ai-principle-set),
[trustworthy AI](/glossary/trustworthy-ai) and
[model risk management](/glossary/model-risk-management) side by side.

## Which tools support AI governance?

AI governance tools fall into categories, one or more per stack layer: policy engines and policy
testing, registries and discovery, AI bills of materials and model cards, evaluation and red-team
frameworks, guardrails and observability, agent identity, and evidence formats. Pick by category
and by the evidence each tool emits, not by brand.

A useful test for any tool is whether its output can gate something and leave a record. A policy
engine that returns a verdict in the pipeline, a register that the deploy writes to, an eval
harness whose result can fail a build, a guardrail that logs every decision: each produces
evidence as a by-product. A dashboard that summarises documents does not.

- **Layer 01, Govern-as-Code:** policy engines, policy testing and authoring, admission control,
  machine-readable policy artefacts.
- **Layer 02, Inventory & Transparency:** registries and governance suites, agent discovery, AIBOM
  formats (CycloneDX ML-BOM, the SPDX 3.0 AI profile), model and data card tooling, impact
  assessment tooling.
- **Layer 03, Evals & Red Teaming as Evidence:** evaluation frameworks, adversarial probes, safety
  and red-team benchmarks, fairness toolkits, explainability libraries.
- **Layer 04, Runtime Controls & Observability:** guardrail frameworks, observability, drift
  monitoring, tool-call security, kill switches, agent workload identity.
- **Layer 05, Assurance & Continuous Compliance:** evidence formats such as OSCAL, OSCAL tooling,
  GRC and AI governance suites.

The [tools page](/resources/tools) lists example tools per category, each an example, not an
endorsement. The [toolkit](/toolkit) holds free browser tools built from the Body of Knowledge,
and the [templates library](/resources/templates) holds schemas and templates for the records
named on this page.

## How is AI governance measured?

Measure AI governance by what the running systems show, not by how many policies exist. Track
coverage (the share of AI systems registered, gated and assessed), speed (time to decide, time to
contain an incident), the freshness of evidence, and above all realised risk reduction: whether
named failure modes actually became rarer in production.

| Indicator | Type | What it counts |
|---|---|---|
| Register coverage | Performance | Share of discovered AI systems and agents with a register entry and an owner |
| Unregistered AI found | Risk | Running AI with no register entry, by tier |
| Gate coverage | Performance | Share of production releases that passed through an eval gate |
| Open exceptions by age | Risk | Live exceptions, oldest first, with expired ones flagged |
| Assessments current | Performance | High-risk systems with a current impact assessment |
| Incidents and time to contain | Risk | AI incidents by severity; median time to detect and to contain |
| Oversight quality | Risk | Override rate and time to decide at human checkpoints |
| Evidence freshness | Performance | Age of the most recent evidence record per control |
| Realised risk reduction | Performance | Change in the rate of named failure modes in production |

Coverage indicators are inputs; the last row is the one that matters and the hardest to fill,
which is why it belongs in the board pack from the start. The single most telling engineering
measure is evidence freshness: when evidence ages in months, governance is not yet continuous,
whatever the dashboard says. [Chapter 12](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)
defines the board-level indicators, and [chapter 07](/bok/maturity-model#metrics-per-level) the
engineering metrics that move a function from one maturity level to the next.

## Frequently asked questions

### Is AI governance required by law?

In the EU, parts of it are. The AI Act requires, among other things, measures to support AI literacy, risk
management and human oversight for high-risk systems, and an accountability framework for
high-risk providers [6][7]. Elsewhere the duty depends on the jurisdiction and sector;
[chapter 21](/bok/ai-laws-worldwide) compares them. Voluntary frameworks fill the gaps.

### What is an AI governance policy?

An AI governance policy states which AI uses the organisation permits, who approves them, which
controls each risk tier requires and who owns exceptions. It works best when its rules are also
written as code that the pipeline checks. The [AI policy template](/resources/templates#kit-ai-policy) ships the
same policy as prose, YAML and Rego.

### Who needs AI governance?

Any organisation that builds, buys or uses AI systems whose failure can harm people, break the law
or cost money. The AI Act assigns duties by role (provider, deployer, importer, distributor), so a
company that only uses a third-party system can still carry obligations as a deployer [6].

### Does ISO/IEC 42001 certification make you compliant with the EU AI Act?

No. ISO/IEC 42001 certifies that an AI management system exists and is operated [3]. As of
2026-09-24 no harmonised standard is cited in the Official Journal, so no standard, 42001
included, gives a presumption of conformity with the AI Act [15]. It supports compliance work; it
does not replace it.

### Which certifications cover AI governance?

For organisations, ISO/IEC 42001 certification of an AI management system, issued by bodies that
meet ISO/IEC 42006 [31]. For people, certificates such as the IAPP's AIGP, ISO/IEC 42001
lead implementer and lead auditor courses, and ISACA's AAISM and AAIA. The
[certifications page](/for/certifications) compares them neutrally.

### What is AI governance engineering?

AI governance engineering is the application of engineering practice (systems thinking, product
thinking and code) to the governance of AI systems. It is measured by realised risk reduction and
audit-ready evidence. [Chapter 01](/bok/definition) defines it and separates it from its
neighbours.

## Sources

[1] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.4 override, repair or decommission safely; 1.5 accountability, traceability and systematic risk management). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[2] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AI management system; certifiable). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[4] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (stakeholder roles, clause 5.19). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (voluntary, non-sector-specific, use-case agnostic; Core of 4 functions and 19 categories, GOVERN cross-cutting; risk tolerance not prescribed; GOVERN 2.3 executive responsibility; use-case, temporal and cross-sectoral profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[6] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Arts. 3, 4, 5, 26, 73, 99, 101, 113). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(m) accountability framework). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[8] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values; ten core principles, including multi-stakeholder and adaptive governance and responsibility and accountability; Ethical Impact Assessment; Readiness Assessment Methodology). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[9] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[10] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[11] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026; OJ L, 24.7.2026; in force 27 Jul 2026 (new Art. 5(1)(ba) and (bb) from 2 Dec 2026; Art. 113: Annex III high-risk from 2 Dec 2027, Annex I from 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[12] SB 53, Transparency in Frontier Artificial Intelligence Act (approved by the Governor 29 Sep 2025; in force 1 Jan 2026; frontier AI framework for large frontier developers; critical safety incidents to the Office of Emergency Services within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[13] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22, as amended; Art. 4 scope including conduct abroad; high-impact AI duties; transparency; domestic representative; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[14] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[15] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[16] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; 77% working on AI governance; only 1.5% will not need more staff; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[17] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[18] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; read on 2026-09-24). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[19] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[20] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[21] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[22] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations; 26(2) oversight by persons with competence, training and authority). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[24] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[25] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[26] Tax Administration fined for discriminatory and unlawful data processing (EUR 2.75 million fine; nationality used as a risk indicator). Autoriteit Persoonsgegevens (Dutch Data Protection Authority). 2021-12-07. https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing (verified: primary)
[27] Dissecting racial bias in an algorithm used to manage the health of populations (Obermeyer, Z., Powers, B., Vogeli, C., Mullainathan, S.; Science 366(6464):447-453). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[28] Moffatt v. Air Canada, 2024 BCCRT 149 (decision not opened directly; citation and holdings confirmed through the reporting and the AI Incident Database record used in the case analysis). Civil Resolution Tribunal of British Columbia (CanLII). 2024-02-14. https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html (verified: secondary)
[29] Zillow Group Reports Third-Quarter 2021 Financial Results; Shares Plan to Wind Down Zillow Offers Operations (Form 8-K, Exhibit 99.1; inventory write-down of approximately USD 304 million). Zillow Group, Inc. (SEC EDGAR). 2021-11-02. https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm (verified: primary)
[30] Dutch DPA imposes a fine on Clearview because of illegal data collection for facial recognition (EUR 30.5 million fine; orders subject to penalties). Autoriteit Persoonsgegevens (Dutch Data Protection Authority). 2024-09-03. https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition (verified: primary)
[31] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
