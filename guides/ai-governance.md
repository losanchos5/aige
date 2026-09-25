# What is AI governance?

> AI governance is the set of rules, roles, controls and evidence that keeps AI systems within the
> limits an organisation or a state has chosen. It decides which systems may run and what they may
> do. It spans law, standards and internal policy, and it is judged by evidence, not by documents.

**In short.** AI governance answers three questions about every AI system in use: what is running,
what it is allowed to do, and what evidence proves it. The rules come from law such as the EU AI
Act, standards such as ISO/IEC 42001 and frameworks such as the NIST AI RMF. An organisation turns
them into roles: a board, a committee, an owner per system. It builds controls: an inventory, risk
tiers, release tests, runtime guardrails. And it keeps records an auditor can read. This page
defines the term, compares the frameworks and laws, and shows how to run the work. It follows the
[Body of Knowledge](/bok), which treats each topic in full.

## How is AI governance defined?

AI governance is how an organisation or a state keeps its use of AI inside chosen limits. It sets
rules, assigns people to own and decide, runs controls that enforce the rules and keeps evidence that
the controls worked. The **rules** are external (a statute, a treaty, a customer's standard) and
internal (an AI policy, risk appetite). The **roles** set the rules, decide the cases the rules do
not settle and answer for the outcome. The **controls and evidence** make the rules true on a given
day: a register, tests before release, checks at runtime and records that each check ran.

No primary text defines "AI governance" as a term. Each describes what governing AI requires of the
people it addresses, and the definition above is assembled from what they ask for. The table shows
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

Two readings follow. First, "AI governance" works at several levels: treaties address states, laws
address operators, standards address organisations and controls address one system at a time.
Second, the texts converge on a shared core: accountable owners, managed risk, transparency and
records. That is what lets one set of controls answer several instruments at once, as the
[crosswalk](/resources/crosswalk) shows topic by topic.

AI governance has a narrower sibling. **AI governance engineering** builds that governance as
running systems: policy as code, tests that can fail a build, a registry the deploy pipeline writes
to. [Chapter 01 defines it](/bok/definition), and [the role page](/role) describes who does it. The
object of governance is also wider than the model. Chapter 01 names five objects: models, systems,
agents, data and the organisation ([the object of governance](/bok/definition#the-object-of-governance)).

## Why does AI governance matter now?

AI governance matters now because the rules have dates. The EU AI Act entered into force on 1 Aug
2024, and its duties switch on in stages until 2030. General-purpose AI enforcement began on 2 Aug
2026. Korea's AI Basic Act has applied since 22 Jan 2026. Organisations also report that the work is
under way and understaffed.

The law is the clearest driver. Since 2 Aug 2026 the Commission can fine providers of
general-purpose AI models up to 3% of worldwide annual turnover or EUR 15 million, whichever is
higher [6][10]. The Digital Omnibus, Regulation (EU) 2026/1744, entered into force on 27 Jul 2026 and
moved the high-risk dates. Annex III obligations now apply from 2 Dec 2027 and Annex I obligations
from 2 Aug 2028 [11]. The extra time is runway, not relief: the controls still have to be built.

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
| 2026-12-02 | Two new AI Act prohibitions apply (non-consensual intimate imagery, child sexual abuse material); generative systems already on the market must mark their outputs | [11] |
| 2027-12-02 | AI Act high-risk obligations for Annex III systems | [11] |
| 2028-08-02 | AI Act high-risk obligations for Annex I products | [11] |

Outside the EU the picture is mixed but moving; the
[table by jurisdiction](#which-ai-regulations-apply-by-jurisdiction) below sets the main regimes side
by side.

Organisations feel the pressure too. In the IAPP's 2025 profession report, 77% of organisations said
they were working on AI governance [16]. Gartner forecasts AI governance spending of USD 492 million
in 2026, passing USD 1 billion by 2030 [17]. [Chapter 02](/bok/why-now) sets out the full case,
including the shift to AI agents that act under delegated authority.

## What are the principles of AI governance?

The published principle sets agree on seven shared principles: fairness, safety and reliability,
privacy and security, transparency and explainability, accountability, human-centricity, and
sustainability. A principle counts as applied only when it is traced to a control that can act and
to evidence someone can query. Writing it in a charter is not enough.

The four main sets (OECD, UNESCO, the EU High-Level Expert Group, the G7 Hiroshima Process) agree in
substance; [chapter 11](/bok/ai-defined#where-the-sets-agree) tabulates them. The table reads each
shared principle as a control and the evidence it leaves: a starting map, not a claim of conformity.

| Principle | Control that makes it real | Evidence it leaves |
|---|---|---|
| Fairness and non-discrimination | Subgroup evaluations with a declared threshold, run in the release pipeline; an impact assessment before first use | Eval results per group and version; signed impact assessment |
| Safety and reliability | Adversarial and regression tests that block a release; a tested way to stop the system | Eval and red-team results per version; kill-switch drill records |
| Privacy and security | Policy checks on data class and residency; scoped credentials for every system and agent | Policy verdicts; credential scopes; data protection impact assessment |
| Transparency and explainability | Model and data cards kept current; disclosure at the point of interaction; reason codes per decision | Cards linked to the register; disclosure logs; logged reason codes |
| Accountability | A named owner per system; decision records for exceptions; an incident process | Register owner field; exception register; incident records |
| Human-centricity | Human approval at defined high-consequence decisions; an appeal route | Approval logs, override rates and appeal outcomes |
| Sustainability | Compute and energy recorded per evaluation and per inference volume | Energy or compute figures in the evidence store; model-size decision record |

The OECD text shows how operational a principle can be. Principle 1.4 asks for mechanisms so that AI
systems that risk undue harm can be "overridden, repaired, and/or decommissioned safely" [1]. In
control terms, that is a tested stop mechanism: the
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) pattern. The book's own
[six principles](/bok/values-and-principles#the-six-principles) are rules of method rather than
targets.

## What does an AI governance framework include?

An AI governance framework includes an inventory of AI systems and a way to classify them by risk.
It adds policies written so they can be checked, impact assessments, tests before release and human
oversight where it is needed. Runtime controls, an incident process and evidence tie each control to
the obligation it serves. Roles and decision rights hold it together.

Most frameworks list the same components in different words. The list below groups them by what
they do, and names the layer of the [five-layer stack](/stack) that produces each one. The stack is
the Body of Knowledge's reference architecture. Its order is a build order, because each layer
consumes what the layer before it produces
([how to read the stack](/bok/the-stack#how-to-read-the-stack)).

- **Rules as code (layer 01, Govern-as-Code).** The AI policy, risk appetite and acceptable-use
  rules, written so a pipeline or a runtime can evaluate them and record a verdict.
- **Inventory (layer 02, Inventory & Transparency).** A register of every model, system and agent,
  each with an owner, a purpose and a risk tier, fed by the deploy pipeline. Model cards, data cards
  and an AI bill of materials (AIBOM) attach to each entry.
- **Risk and impact assessment (layers 01 and 02).** A tier computed at intake, and impact
  assessments that are versioned and reopened when the system changes.
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

[Data governance](/bok/the-stack#data-governance-across-the-stack) runs through all five layers.
The figure below draws the layers and the evidence that flows up through them.

## How do the main AI governance frameworks compare?

The main AI governance frameworks differ in legal force and audience. The EU AI Act is binding law
on operators, and the Council of Europe Convention is a treaty that binds states. ISO/IEC 42001 is a
certifiable management-system standard. The NIST AI RMF is a voluntary risk framework. The OECD,
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
floor and the dates. The standards and frameworks are ways to organise the work and show it. **A
certificate is not compliance.** An ISO/IEC 42001 certificate evidences a management system. It
gives no presumption of conformity with the AI Act, because no harmonised standard is cited in the
Official Journal yet [15]. **One control can serve many instruments.** Tag each control with the
clauses it serves and generate the mapping from those tags, as the
[Framework Crosswalk](/patterns/framework-crosswalk) pattern does. Inside the EU, the Council
Decision concluding the Convention states that it is implemented through the AI Act and other Union
law, so the treaty adds no separate private-sector duties there [22]. The
[frameworks page](/resources/frameworks) lists every instrument the Body of Knowledge maps, and
[chapter 22](/bok/principles-and-standards) treats the principles and standards in depth.

## Which AI regulations apply by jurisdiction?

Which AI regulations apply depends on where a system's output is used and on who builds or uses it.
The EU has a horizontal act and Korea a horizontal statute. The United States regulates through
state laws and federal agency memoranda, and China through targeted rules. The UK and Singapore rely
on principles and voluntary frameworks.

Statuses are as of 2026-09-24. The table is a summary, not legal advice.

| Jurisdiction | Main instrument | Status (as of 2026-09-24) | What it asks for |
|---|---|---|---|
| European Union | AI Act, Reg. (EU) 2024/1689, as amended by the Digital Omnibus, Reg. (EU) 2026/1744 | In force since 2024-08-01; prohibitions since 2025-02-02; GPAI duties since 2025-08-02; Annex III high-risk duties from 2027-12-02 [6][11] | Risk-based duties for providers and deployers; GPAI provider duties; transparency for chatbots and synthetic content |
| United States (federal) | OMB memoranda M-25-21 and M-26-04 | Bind federal agencies and, through procurement, their vendors; no federal AI statute for private actors [25][39] | A Chief AI Officer, a use-case inventory and minimum practices for high-impact AI; cards for purchased LLMs |
| United States (states) | Colorado SB 26-189; California SB 53; NYC Local Law 144; others in Texas, Utah, Illinois and New York | Mixed: NYC LL 144 enforced since 2023-07-05; SB 53 in force since 2026-01-01; Colorado from 2027-01-01 [40][12][41] | Colorado: notice, a 30-day explanation and human review for automated consequential decisions; SB 53: a frontier AI framework and 15-day incident reports; NYC: a bias audit of hiring tools |
| United Kingdom | Five cross-sector principles applied by existing regulators | Non-statutory for AI as such [42] | Safety, transparency, fairness, accountability and contestability, read by each sector regulator |
| Canada | Directive on Automated Decision-Making | In force for federal institutions since 2019-04-01; no federal AI statute for the private sector since AIDA lapsed [43][44] | A published Algorithmic Impact Assessment; notice, explanation, peer review and recourse by impact level |
| China | CAC rules on algorithmic recommendation (2022), deep synthesis (2023), generative AI services (2023) and labelling of AI-generated content (2025) | Binding; generative AI measures in force since 2023-08-15; labelling measures since 2025-09-01 [45][46] | Lawful training data; security assessment and filing for opinion-shaping services; explicit and implicit content labels |
| Singapore | Model AI Governance Frameworks for generative AI (2024) and agentic AI (v1.5, 2026) | Voluntary [47][48] | Testing, transparency, incident reporting, provenance; for agents, bounded risks, accountable humans, technical controls |
| South Korea | AI Basic Act and its Enforcement Decree | In force since 2026-01-22; fines subject to a guidance period of at least one year [13] | Duties for high-impact AI, prior notice and labelling, a domestic representative |
| Brazil | PL 2338/2023 | Bill: passed the Senate on 2024-12-10; awaiting the rapporteur's report in the Chamber of Deputies [49][50] | Nothing yet: map it as a bill and attach no controls |
| Council of Europe | Framework Convention (CETS No. 225) | Adopted 2024-05-17; ratified by the EU on 2026-05-15; not in force [9][14][19] | Binds Parties, not companies: risk and impact management, contestability records, notice of AI interaction |

Most regimes ask for the same few artefacts: an inventory, a classification, a notice, a label, a
risk assessment, an incident report and a record. What differs is the trigger, the clock and the
enforcer, so build each control once and parameterise it per jurisdiction.
[Chapter 21](/bok/ai-laws-worldwide#comparing-the-regimes) compares the regimes, including Japan,
Italy, India and Australia; [chapter 08](/bok/regulatory-map#other-jurisdictions) maps each duty to
an artefact. The [obligation register](/obligations) gives each duty a page, such as
[California SB 53](/obligations/aige-obl-usca-sb53), [NYC Local Law 144](/obligations/aige-obl-usnyc-ll144)
and [China's generative AI measures](/obligations/aige-obl-cn-genai).

## Who is responsible for AI governance?

Responsibility for AI governance is shared, and each role owns an artefact. The board sets risk
appetite and oversees. Executives accept the largest risks, and a committee decides exceptions.
Product owners are accountable for each system, and engineering builds inside the controls.
Second-line functions set method; internal audit gives independent assurance.

The law already expects the structure to be designed. The AI Act requires a high-risk provider's
quality management system to include an accountability framework for management and staff [7]. It
requires deployers of high-risk systems to assign human oversight to people with "the necessary
competence, training and authority" [23]. The NIST AI RMF states that executive leadership "takes
responsibility for decisions about risks associated with AI system development and deployment" [5].

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

The pattern behind the table is the Institute of Internal Auditors' Three Lines Model: the governing
body oversees, management holds the first and second lines, and internal audit stays independent
[24]. OMB Memorandum M-25-21 of 3 Apr 2025 gives a public template for the executive seat. It
required each US agency to designate a Chief AI Officer within 60 days [25].

One rule keeps the structure honest: the committee decides, the gates enforce.
[Chapter 12](/bok/governance-program#the-stakeholder-map) gives the full stakeholder map and a
lifecycle RACI. The AI governance engineer usually sits in the second line;
[chapter 06](/bok/the-role) describes the role.

## What are the levels of AI governance maturity?

AI governance maturity runs from paper to production in five levels: Documented, Inventoried,
Tested, Enforced and Continuous. Each level is proven by what the running systems can show. A
function sits at the level of its weakest layer, because one strong layer does not compensate for a
missing one.

| Level | What it looks like | Evidence you can show |
|---|---|---|
| 1. Documented | Policies, a spreadsheet inventory and a pre-launch review; nothing executes | Policy documents; a populated spreadsheet; minutes |
| 2. Inventoried | A register the deploy pipeline writes to, with an owner and a scope per system | Register entries for every system; a job that reconciles the register with production |
| 3. Tested | Capability, safety and adversarial evaluations run and are recorded, but a failure blocks nothing | Versioned eval suites; timestamped results; red-team findings |
| 4. Enforced | Policy checks and eval gates block the merge or the deploy; agents need an owner, scope and kill switch to get an identity | Logs of blocked releases with reasons; admission denials; a tracked measure of eval-suite quality |
| 5. Continuous | Assurance comes from runtime telemetry; evidence is emitted as the systems run | A live evidence store; streaming eval and guardrail records; an audit answered by a query |

The levels measure the organisation and its systems, the two levels of governance an organisation
controls; treaties and national law sit above them. [Chapter 07](/bok/maturity-model#the-five-levels)
sets out observable criteria per layer and level, and the
[maturity self-check](/toolkit/maturity-self-check) scores a function in the browser.

## How do you implement AI governance?

Implement AI governance as a thin slice through every layer, not a thick layer of policy. Register
what is running and route every new use case through one intake. Write the key rules as code and
gate releases on tests. Put people where decisions need them, control behaviour at runtime, run
incidents on a clock and emit machine-readable evidence.

The eight steps below follow that order. Each names the pattern that describes it and a template or
browser tool to start from.

1. **Register what is running.** Build a register that the deploy pipeline writes to. Give every
   model, system and agent an owner, a scope and a status, and reconcile the register against what
   discovery finds in production. Pattern: [Agent Registry](/patterns/agent-registry), with
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery). Start from: the
   [AI register entry builder](/toolkit/ai-register-entry).
2. **Route every use case through one intake.** Record each proposed use in a structured form and
   compute a risk tier from it. The tier switches on the gates that apply, including an impact
   assessment before first use. Pattern:
   [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). Start from: the
   [AI Act triage](/toolkit/ai-act-triage) and the [impact assessment builder](/toolkit/impact-assessment).
3. **Write the rules as code.** Express each governance rule (permitted data, permitted uses,
   required approvals) as a machine-readable card. Both the pipeline and the runtime evaluate it.
   Pattern: [Policy Card](/patterns/policy-card). Start from: the
   [Policy Card builder](/toolkit/policy-card) and the [AI policy template](/resources/templates#kit-ai-policy).
4. **Gate releases on evaluations.** Wire capability, safety, fairness and adversarial tests into
   continuous integration. Document the thresholds, so a regression fails the build. Pattern:
   [Eval Gate in CI](/patterns/eval-gate-in-ci). Start from: the
   [model card builder](/toolkit/model-card) and the
   [fairness metric chooser](/toolkit/fairness-metric-chooser).
5. **Put people where the stakes justify it.** Define the high-consequence decisions that need
   human approval. Give the approver the authority and training to refuse, and log every approval
   and override. Pattern: [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
   Start from: the [agent control profile](/toolkit/agent-control-profile).
6. **Control behaviour at runtime.** Enforce the policy on every live call with input and output
   guardrails. Give each agent its own identity and scope, and keep a tested way to stop it.
   Pattern: [Runtime Guardrail](/patterns/runtime-guardrail), with
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker). Start from: the
   [agent control profile](/toolkit/agent-control-profile).
7. **Run incidents on a clock.** Detect, triage and report serious incidents within the legal
   window. Under the AI Act that is 15 days in general, two days for a widespread infringement or
   serious disruption of critical infrastructure, and 10 days after a death [6]. Pattern:
   [Incident Pipeline](/patterns/incident-pipeline). Start from: the
   [incident clock](/toolkit/incident-clock).
8. **Emit machine-readable evidence.** Have every gate, guardrail and check write a structured,
   timestamped record into one store. Use a standard format such as OSCAL, so the audit is a query.
   Pattern: [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal). Start
   from: the [evidence record schema](/resources/templates#schema-evidence-record).

A team of one can do all eight thinly for one system before doing any in depth. The full catalogue
has one page per [pattern](/patterns), and [chapter 12](/bok/governance-program) covers the program
around them.

## How does AI governance apply to generative AI and LLMs?

Generative AI adds duties at two points. Under the EU AI Act, every provider of a general-purpose AI
model must document it, summarise its training content and keep a copyright policy. Providers of
models with systemic risk also run adversarial evaluations and report serious incidents. Teams that
build on these models need evals, red teaming, content labels and vendor checks.

The AI Act separates the model from the system. A general-purpose AI (GPAI) model displays
significant generality and can perform a wide range of distinct tasks; a GPAI system is built on one
[32]. Every GPAI provider owes technical documentation, information for downstream providers, a
copyright policy that honours text-and-data-mining opt-outs, and a public summary of training
content ([Art. 53](/obligations/aige-obl-euaia-art53)) [32]. A model trained with more than 10^25
FLOP is presumed to have systemic risk. Its provider must also run state-of-the-art evaluations with
adversarial testing, mitigate systemic risks, report serious incidents and secure the model
([Art. 55](/obligations/aige-obl-euaia-art55)) [32]. These duties have applied since 2 Aug 2025,
and Commission fines since 2 Aug 2026 [6][10]. The General-Purpose AI Code of Practice of 10 Jul
2025 is a voluntary tool to show them [33]; [chapter 18](/bok/eu-ai-act#general-purpose-ai-models)
explains when a fine-tuner becomes a provider.

Most organisations deploy generative AI rather than train it. For them the work is five controls:

- **Model and system cards.** A model card describes one model; a system card describes the
  deployed system with its prompts, retrieval, tools and guardrails. Generate both from the same
  records ([Model Card as Control Evidence](/patterns/model-card-as-control-evidence)).
- **Evals as a release gate.** Capability, safety and groundedness tests with thresholds that fail
  the build ([Eval Gate in CI](/patterns/eval-gate-in-ci)).
- **Red teaming.** An adversarial suite whose findings become regression tests
  ([Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite)).
- **Content provenance.** Since 2 Aug 2026, providers of generative systems must mark synthetic
  outputs in a machine-readable, detectable way; systems already on the market have until 2 Dec 2026
  [32][11]. Deployers must disclose deep fakes ([Art. 50](/obligations/aige-obl-euaia-art50)) [32].
  China requires explicit and implicit labels [46], and the G7 Hiroshima Code asks for provenance
  mechanisms where feasible [20].
- **Third-party models.** A due-diligence gate before a vendor's model is integrated, because the
  weights, data and guardrails belong to someone else
  ([Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)).

Agents raise the stakes: they plan, call tools, keep memory and hand work to other agents. An agent
is governed when every action traces to a registered identity, an approved scope, a checkpoint and a
tested way to stop it ([chapter 23](/bok/governing-agents)). The OWASP agentic list states the first
principle, least agency: avoid unnecessary autonomy [35].

## How does AI governance relate to AI security?

AI security protects AI systems from attackers; AI governance decides what those systems may do and
proves it. They share most controls, such as threat models, guardrails and red teaming. They differ
on what counts as done: for security, a blocked attack; for governance, the block plus the authority
and approval on the record.

The threat vocabulary comes from the OWASP GenAI Security Project, and this page uses the 2026
editions of its two lists. The Top 10 for LLM Applications 2026, published on 3 Aug 2026, covers the
model as a component inside an application. It runs from LLM01:2026 Prompt Injection through
LLM03:2026 Excessive Agency to LLM10:2026 Improper Output Handling [34]. Once the model becomes an
actor, with tools, memory and consequences downstream, the risk moves to the Top 10 for Agentic
Applications 2026. That list runs from ASI01 Agent Goal Hijack to ASI10 Rogue Agents [34][35].
Gartner predicts that by 2029 more than half of successful attacks on AI agents will exploit
access-control weaknesses and prompt injection [36].

Governance turns each threat into a control, a test and an obligation; the site's
[threat bridge](/resources/threats) does it as data, row by row. The central control is the
[Runtime Guardrail](/patterns/runtime-guardrail). It checks inputs and outputs on every live call,
enforces the system's Policy Card and records a decision for each call. A guardrail that only logs
is observability mistaken for control.

The law points the same way: the AI Act requires high-risk systems to resist data poisoning and
adversarial inputs [32]. Start with the [AI Threat Model](/patterns/ai-threat-model) pattern;
[chapter 23](/bok/governing-agents#threats-mapped-to-controls) maps each agentic threat to a control.

## What are the main challenges of AI governance?

The main challenges are practical. Organisations do not know every AI system they run, staff use
unapproved tools, and evidence goes stale between reviews. Third-party models hide their weights and
data. Agents change faster than point-in-time review can follow. The rules keep moving, and
specialist staff are scarce.

| Challenge | Why it is hard | Control that answers it |
|---|---|---|
| Inventory gaps and shadow AI | A register fed only by declarations lags production; staff paste data into public tools | Discovery across identity, cloud, network and code, reconciled with the register ([Shadow-AI Discovery](/patterns/shadow-ai-discovery)); a [sanctioned AI gateway](/patterns/sanctioned-ai-gateway) |
| Evidence that goes stale | An annual review describes the system as it was; a green mapping matrix is mistaken for a working control, and no standard yet buys a presumption of conformity [15] | Evidence written by gates and guardrails as systems run ([Machine-Readable Evidence](/patterns/machine-readable-evidence-oscal)) |
| Third-party models | The weights, training data and guardrails belong to the vendor | A due-diligence gate, reopened on renewal and change notices ([Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)) |
| Agents | Delegated authority, tools, memory and autonomy break the assumptions of model governance; Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027, naming inadequate risk controls among the causes [37] | A registry, scoped credentials, checkpoints and a kill switch per agent ([Agent Registry](/patterns/agent-registry)) |
| Pace of regulation | Dates move, as the Omnibus showed [11]; Colorado replaced its 2024 AI Act with SB 26-189, effective 2027-01-01 [40] | Versioned policy modules keyed to each jurisdiction, and controls tagged with the clauses they serve ([Framework Crosswalk](/patterns/framework-crosswalk)) |
| Staff and placement | Only 1.5% of IAPP respondents expect no need for more staff; the function sits mostly in privacy, legal and IT, and only 5% in security [16] | Automate the repeatable checks so people decide the exceptions |

A control with no telemetry is a claim, not a control. [Chapter 02](/bok/why-now#the-five-problems-with-the-evidence)
sets out the evidence, and [chapter 12](/bok/governance-program#acceptable-use-of-ai-by-staff) covers
staff use of AI tools.

## What are examples of AI governance?

The clearest examples of AI governance are the failures it exists to prevent. In each public case
below, a system went live without the control that would have caught its failure, and the
organisation paid in fines, liability or losses.

**Dutch childcare benefits (2021).** The Dutch tax administration used applicants' nationality as a
risk indicator in a system that flagged childcare-benefit applications as risky. On 7 Dec 2021 the
Dutch data protection authority fined it EUR 2.75 million for unlawful and discriminatory processing
[26]. The control: a policy card listing the permitted inputs, and an eval gate that fails when a
prohibited attribute or proxy enters the feature set ([case analysis](/cases/dutch-childcare-benefits)).

**A health-risk score that predicted cost (2019).** A widely used care-management algorithm
predicted health costs rather than illness, so at the same score Black patients were considerably
sicker than White patients. Remedying the disparity would raise the share of Black patients
receiving additional help from 17.7% to 46.5% [27]. The control: a model card that records the gap
between the label and the target, and an eval gate that checks calibration by group
([case analysis](/cases/health-risk-score-proxy)).

**Moffatt v. Air Canada (2024).** A tribunal in British Columbia held Air Canada liable after its
website chatbot misstated the bereavement-fare policy. It rejected the argument that the chatbot was
responsible for its own answers [28]. The control: a runtime guardrail that grounds every policy
answer in the current policy text and refuses when nothing supports it
([case analysis](/cases/moffatt-v-air-canada)).

**Zillow Offers (2021).** Zillow announced on 2 Nov 2021 that it would wind down its home-buying
business. It wrote down about USD 304 million of inventory bought above its own price estimates
[29]. Public filings do not describe its model controls, so this reading is
illustrative. The control: telemetry comparing each forecast with the realised price, and a circuit
breaker that throttles purchases when the error crosses a threshold
([case analysis](/cases/zillow-offers)).

**Clearview AI (2024).** On 3 Sep 2024 the Dutch data protection authority fined Clearview AI EUR
30.5 million for building a facial-recognition database from photos scraped from the internet [30].
Under the AI Act, systems that build facial recognition databases through untargeted scraping have
been prohibited since 2 Feb 2025 [6]. The control for a buyer: a vendor due-diligence gate that asks
how the reference data was obtained and treats biometric processing as a stop condition
([case analysis](/cases/clearview-ai)).

The case analyses are engineering readings of public records, not legal findings; the
[cases index](/cases) holds the full set.

## How does AI governance differ from AI ethics, responsible AI, compliance, safety and data governance?

AI governance is the operating system that the neighbouring fields plug into. AI ethics and
responsible AI set the values, and AI compliance reads the legal duties. AI safety research studies
whether models are safe in principle, and data governance manages the data. AI governance turns all
of them into owned decisions, running controls and evidence.

| Term | What it covers | How it relates to AI governance |
|---|---|---|
| AI ethics | The values and moral questions raised by AI: fairness, autonomy, harm, dignity | Sets the targets; governance decides which apply to a system and checks them |
| Responsible AI | Published principle sets and the programs that adopt them (OECD, UNESCO, the EU High-Level Expert Group) | A source of principles; governance traces each principle to a control and evidence |
| AI compliance | Interpreting legal duties (the AI Act, the GDPR, sector rules) and advising on them | One input among several; governance builds the control that meets the duty and keeps the proof |
| AI safety | Research into whether powerful models are safe in principle, such as alignment and dangerous capabilities | Governance consumes its findings as test cases and thresholds for systems in production |
| Data governance | Quality, lineage, lawful basis, retention and rights for data | Runs inside AI governance: training data, retrieval corpora, prompts and outputs are governed objects |
| AI governance engineering | The engineering practice of building AI governance as running systems | The way to deliver AI governance so it is enforced and evidenced, not only written |

Each neighbour, taken alone, leaves a gap. Ethics without controls stays on a poster, and
compliance advice without an owner is never executed.
[Chapter 01](/bok/definition#the-disambiguation-cluster) draws the full disambiguation cluster, and
the glossary defines [trustworthy AI](/glossary/trustworthy-ai) and
[model risk management](/glossary/model-risk-management).

## Which tools support AI governance?

AI governance tools fall into categories, one or more per stack layer. They cover policy engines and
policy testing, registries and discovery, AI bills of materials and model cards, evaluation and
red-team frameworks, guardrails and observability, agent identity, and evidence formats. Pick by
category and by the evidence each tool emits, not by brand.

A useful test for any tool is whether its output can gate something and leave a record. A policy
engine that returns a verdict in the pipeline passes it. So do a register that the deploy writes to,
an eval harness that can fail a build, and a guardrail that logs every decision. A dashboard that
summarises documents does not.

The [tools page](/resources/tools) lists example tools per stack layer, each an example, not an
endorsement. The [toolkit](/toolkit) holds free browser tools, and the
[templates library](/resources/templates) holds schemas for the records named on this page.

## How is AI governance measured?

Measure AI governance by what the running systems show, not by how many policies exist. Track
coverage: the share of AI systems registered, gated and assessed. Track speed: time to decide and
time to contain an incident. Track the freshness of evidence. Above all, track realised risk
reduction: whether named failure modes actually became rarer in production.

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

Coverage indicators are inputs; the last row is the one that matters and the hardest to fill. The
most telling engineering measure is evidence freshness: when evidence ages in months, governance is
not yet continuous. [Chapter 12](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)
defines the board-level indicators, and [chapter 07](/bok/maturity-model#metrics-per-level) the
engineering metrics per maturity level.

## Frequently asked questions

### Is AI governance required by law?

In the EU, parts of it are. The AI Act requires AI literacy measures, risk management and human
oversight for high-risk systems, and an accountability framework for high-risk providers [6][7].
Elsewhere it depends on the jurisdiction and sector (see the
[table by jurisdiction](#which-ai-regulations-apply-by-jurisdiction)).

### What is an AI governance policy?

An AI governance policy states which AI uses the organisation permits, who approves them, which
controls each risk tier requires and who owns exceptions. The
[AI policy template](/resources/templates#kit-ai-policy) ships it as prose, YAML and Rego, so the
pipeline can check it.

### Who needs AI governance?

Any organisation that builds, buys or uses AI systems whose failure can harm people, break the law or
cost money. The AI Act assigns duties by role (provider, deployer, importer, distributor). A company
that only uses a third-party system can still carry obligations as a deployer [6].

### Does the EU AI Act apply to companies outside the EU?

Yes, in two ways. It reaches providers that place AI systems or general-purpose AI models on the EU
market, wherever they are established. It also reaches providers and deployers in third countries
whose system's output is used in the Union [32]. The scope question is where the output is used, not
where the system is hosted ([who is in scope](/bok/eu-ai-act#who-is-in-scope)).

### What are the penalties under the EU AI Act?

Prohibited practices can cost up to EUR 35 million or 7% of worldwide annual turnover, whichever is
higher, and most other operator obligations up to EUR 15 million or 3% [6]. GPAI providers face
Commission fines of up to 3% or EUR 15 million [10]. SMEs pay the lower amount [6];
[chapter 18](/bok/eu-ai-act#penalties) lists every tier.

### What is the difference between AI governance and model risk management?

Model risk management is the banking tradition of validating models through independent, effective
challenge. In the US, SR 26-2 replaced SR 11-7 on 17 Apr 2026 and leaves generative and agentic AI
models outside its scope [38]. AI governance covers those models too, plus systems, data, agents and
the organisation ([what it borrows](/bok/governing-development#independent-validation-and-model-risk-management)).

### What is an AI impact assessment?

A record of who an AI system affects, the risks of harm to them and the measures that answer those
risks, made before first use and updated when the system changes. Under the AI Act, some deployers
of Annex III high-risk systems owe a fundamental rights impact assessment from 2 Dec 2027 [32][11].
Canada's federal institutions publish an Algorithmic Impact Assessment [44].

### What is shadow AI?

Shadow AI is an AI system, model or agent running without registration, including staff use of
unapproved tools. It is found by discovery against identity, cloud and network data
([Shadow-AI Discovery](/patterns/shadow-ai-discovery)). The answer is a sanctioned route, such as a
[sanctioned AI gateway](/patterns/sanctioned-ai-gateway), not a ban.

### Where should a small team start with AI governance?

With a thin slice through every layer rather than one layer in depth. First, a register the deploy
pipeline writes to, with an owner per entry. Then one policy with teeth, as code, that blocks the
pipeline on failure. [The minimum viable stack](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)
sets out the order.

### Does ISO/IEC 42001 certification make you compliant with the EU AI Act?

No. ISO/IEC 42001 certifies that an AI management system exists and is operated [3]. As of
2026-09-24 no harmonised standard is cited in the Official Journal. So no standard, 42001 included,
gives a presumption of conformity with the AI Act [15]. It supports compliance work; it does not
replace it.

### Which certifications cover AI governance?

For organisations, ISO/IEC 42001 certification of an AI management system, issued by bodies that
meet ISO/IEC 42006 [31]. For people, certificates such as the IAPP's AIGP, ISO/IEC 42001 lead
implementer and lead auditor courses, and ISACA's AAISM and AAIA. The
[certifications page](/for/certifications) compares them neutrally.

### What is AI governance engineering?

AI governance engineering applies engineering practice (systems thinking, product thinking and
code) to the governance of AI systems, measured by realised risk reduction and audit-ready evidence.
[Chapter 01](/bok/definition) defines it.

## Sources

[1] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; revised 3 May 2024; 1.4 override, repair or decommission safely; 1.5 accountability). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[2] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AI management system; certifiable). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[4] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (stakeholder roles, clause 5.19). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (voluntary; 4 functions, 19 categories; GOVERN 2.3 executive responsibility; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[6] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Arts. 3, 4, 5, 26, 73, 99, 101, 113). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(m) accountability framework). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[8] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four values; ten principles; Ethical Impact Assessment). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[9] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 3, 14 to 16, 30). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[10] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[11] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026; OJ L, 24.7.2026; in force 27 Jul 2026 (new Art. 5(1)(ba) and (bb) from 2 Dec 2026; Art. 113: Annex III high-risk from 2 Dec 2027, Annex I from 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[12] SB 53, Transparency in Frontier Artificial Intelligence Act (in force 1 Jan 2026; frontier AI framework; critical safety incidents reported within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[13] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; scope incl. conduct abroad; high-impact AI duties; domestic representative). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[14] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[15] Standardisation of the AI Act (no harmonised standard referenced in the Official Journal; none found on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[16] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; 77% working on AI governance; only 1.5% will not need more staff; function lodged with privacy 22%, legal and compliance 22%, IT 17%, security 5%; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[17] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[18] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; read on 2026-09-24). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[19] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[20] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; builds on the OECD AI Principles; action 7 content authentication and provenance mechanisms where feasible). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[21] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[22] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union through Reg. (EU) 2024/1689 and other Union acquis). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations; 26(2) oversight by persons with competence, training and authority). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[24] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[25] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[26] Tax Administration fined for discriminatory and unlawful data processing (EUR 2.75 million fine; nationality used as a risk indicator). Autoriteit Persoonsgegevens (Dutch Data Protection Authority). 2021-12-07. https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing (verified: primary)
[27] Dissecting racial bias in an algorithm used to manage the health of populations (Obermeyer, Z., Powers, B., Vogeli, C., Mullainathan, S.; Science 366(6464):447-453). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[28] Moffatt v. Air Canada, 2024 BCCRT 149 (decision not opened directly; holdings confirmed through reporting and the AI Incident Database). Civil Resolution Tribunal of British Columbia (CanLII). 2024-02-14. https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html (verified: secondary)
[29] Zillow Group Reports Third-Quarter 2021 Financial Results; Shares Plan to Wind Down Zillow Offers Operations (Form 8-K, Exhibit 99.1; inventory write-down of approximately USD 304 million). Zillow Group, Inc. (SEC EDGAR). 2021-11-02. https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm (verified: primary)
[30] Dutch DPA imposes a fine on Clearview because of illegal data collection for facial recognition (EUR 30.5 million fine; orders subject to penalties). Autoriteit Persoonsgegevens (Dutch Data Protection Authority). 2024-09-03. https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition (verified: primary)
[31] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[32] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 (Arts. 2(1) scope; 3(63), 3(66) GPAI model and system; 15(5) resilience; 27 FRIA; 50(2), 50(4) marking and deep fakes; 51(2) 10^25 FLOP; 53(1) GPAI provider duties; 55(1) systemic-risk duties). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[33] The General-Purpose AI Code of Practice (Transparency, Copyright, and Safety and Security chapters; an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[34] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection to LLM10 Improper Output Handling; LLM03 Excessive Agency; boundary with the Agentic Top 10). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[35] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack to ASI10 Rogue Agents; least agency). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[36] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, over half of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[37] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027" (inadequate risk controls among the causes). Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[38] SR 26-2, Revised Guidance on Model Risk Management (supersedes SR 11-7; generative and agentic AI models out of scope). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[39] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (LLM solicitations request model, system or data cards). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[40] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; effective 2027-01-01; notice, 30-day explanation, human review). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[41] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; enforced from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[42] A pro-innovation approach to AI regulation: government response (five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[43] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[44] Directive on Automated Decision-Making (effective 2019-04-01; Algorithmic Impact Assessment; notice, explanation, peer review, recourse by impact level). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (CAC Order No. 15; in force 2023-08-15; lawful-source data, labelling, security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (in force 2025-09-01; explicit and implicit labels). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] Model AI Governance Framework for Generative AI (voluntary; testing, transparency, incident reporting, security, content provenance). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[48] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[49] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; awaiting the report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[50] PL 2338/2023, Marco Legal da Inteligência Artificial (approved by the Senate plenary 2024-12-10). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
