# 04. The stack (five layers)

> The reference architecture of AI governance engineering: five layers that answer the three
> questions, where evidence is produced at the bottom and proven at the top.

## How to read the stack

The stack is not an org chart and not a maturity ladder. It is a build order. Each layer produces an
artefact that the layer above consumes, so that governance stops being a set of parallel documents and
becomes a single system with a data path from policy to proof.

Read it along one spine: **Policy → Inventory → Evals → Runtime → Assurance**. You write the rule as
code (layer 01). You cannot enforce a rule against a system you cannot see, so you inventory what is
running (layer 02). You cannot claim a system meets the rule without a test that can fail, so you run
evals as evidence (layer 03). Rules and tests decay the moment the system changes, so you hold the line
at runtime (layer 04). And none of it is worth anything to an auditor unless the evidence is emitted,
signed and queryable, so you close with continuous assurance (layer 05).

**Evidence flows up.** A policy verdict from layer 01, a registry entry from layer 02, an eval result
from layer 03 and a guardrail decision from layer 04 are not four disconnected records. Each is a
structured artefact with a timestamp and an owner, and layer 05 is where they are aggregated into
audit-ready evidence. The test of the whole stack is the test from the Thesis: as Ayoub Fandi puts
it, a green dashboard over a broken control is "theatre with extra steps" [1]. The stack is the
plumbing that makes the dashboard mean something: every green cell traces to a running control and the
evidence it emitted.

The five layers, named exactly and in order, are: **01 Govern-as-Code · 02 Inventory & Transparency ·
03 Evals & Red Teaming as Evidence · 04 Runtime Controls & Observability · 05 Assurance & Continuous
Compliance.** They map onto the three questions the discipline must answer at any moment. Layer 02
answers *what AI is running*. Layers 01 and 04 answer *what it is allowed to do*: layer 01 writes the
bound as code and layer 04 enforces it on the live call, under the agent's own identity and scope.
Layers 03 and 05 answer *what evidence proves it*. The threats
the controls are built against (goal hijack, tool misuse, agent identity and privilege abuse, rogue
agents) are catalogued in OWASP's Top 10 for Agentic Applications 2026 [2].

Three of these layers are inherited, not invented. Govern-as-Code (01), Inventory & Transparency (02)
and Assurance & Continuous Compliance (05) come almost unchanged from GRC engineering: policy as code,
the asset inventory and machine-readable evidence are its established practice, and the AI-specific
records (the agent registry, the AIBOM) extend them rather than replace them. Layers 03 and 04 (evals
and red-teaming as controls, and agent identity and runtime control) are what AI forces the discipline
to add, because a model whose behaviour must be tested and
an autonomous actor that acts under delegated authority have no analogue in classic GRC. The new work
concentrates there; the rest is a specialisation of a method that already works.

Every tool named below is an example of a category, not a recommendation. The categories are the
substance; the brands are illustrative and interchangeable.

## Layer 01: Govern-as-Code

**What it proves.** That a governance rule exists as an executable artefact, not a paragraph, and that
it evaluated a specific change and returned a decision. The proof is a policy verdict tied to a commit,
a pull request or a deploy, machine-readable and reproducible.

**The artefacts.** An AI governance engineer ships policy-as-code: rules written in a policy language
that a pipeline evaluates. Typical artefacts are a policy library under version control, a set of
crosswalks that map each policy to the frameworks it serves, and the CI/CD wiring that runs the policy
at the right gate. A policy in this layer is small and testable: "inference for this data class may not
route outside the permitted region", "no model deploys without a registered owner and a passed eval
gate", "an agent may not be granted a tool scope it did not declare". Each rule carries a
human-readable statement of intent as its documentation, but the enforced version is the code.

**Reference tools and standards (illustrative).** Policy engines express allow/deny logic. `OPA/Rego`
is the general default for non-authorization policy (data residency, deploy gating, configuration
constraints), while `Cedar` is narrower: an authorization language, strongest for "may this principal
take this action on this resource?" and a poor fit for policy that is not an access decision. Choose by
the shape of the rule, not the brand. Beyond general-purpose engines, one proposed approach is Policy
Cards: a research proposal for a machine-readable, deployment-layer artefact that encodes operational,
regulatory and ethical constraints for an agent and links them to enforcement and audit pipelines [3];
it is a single preprint, promising but not yet a standard, and the point it makes, that the rule
should travel with the agent as data, stands whichever format wins. Crosswalks reference the
frameworks themselves: ISO/IEC 42001 (the AI management
system), NIST AI RMF and its four functions (Govern, Map, Measure, Manage [4]), the EU AI Act, and the
CSA AI Controls Matrix (AICM) v1.1, which offers 247 control objectives across 18 domains as a control
vocabulary to map against [5]. Vendors are illustrative; the standards are not.

**Definition of done.**

- Every policy exists as code in a repository, with a test that proves it fires on a violating input
  and passes a clean one.
- Each policy declares the framework clauses it maps to, so the crosswalk is generated from the code,
  not maintained beside it.
- At least one policy runs pre-merge and blocks the merge on failure; at least one runs at deploy or
  admission and blocks the release.
- A change to a policy is a reviewable diff with an owner and an effective date.
- The policy engine emits a structured verdict (allow/deny, rule id, input hash, timestamp) for every
  evaluation.

**Anti-patterns.**

- The "policy library" that is a folder of Word documents nobody can query, enforced by email and
  self-attested in a spreadsheet.
- The crosswalk maintained as a 300-row matrix in a separate tool, drifting from the policies it claims
  to describe: coverage presented as control.

**Evidence to the next layer.** The policy verdict is the first evidence artefact. But a verdict is
only meaningful against a known object: "deny deploy of model X" presumes the stack knows model X
exists, who owns it and what it is. That object is what layer 02 supplies.

> **In practice** For `csa-01`, a customer-service assistant in a large telco, a data-residency rule
> written as `OPA/Rego` ran at both CI and admission and blocked any deployment routing its inference
> outside the permitted region. The value was not the rule but that the enforced version emitted a
> verdict every engineer could see before merge.

**Maps to:** EU AI Act Art. 9 (risk management) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM ·
OWASP Agentic ASI02/ASI03. Mappings are illustrative, not a claim of conformity.

## Layer 02: Inventory & Transparency

**What it proves.** That the organisation knows what AI is running (which models, systems and agents
are live, in which version, owned by whom), and that each has the transparency documentation an
obligation demands. The proof is a registry entry and its attached documents, ideally written by a
deployment pipeline rather than typed by hand.

**The artefacts.** The core artefact is the **agent registry**: the runtime-aware inventory of every
model, service and agent, each with an owner, a scope and a status. Around it sit the transparency
documents (model cards and data cards) and the **AIBOM**, the bill of materials for an AI system.
FRIA and DPIA references hang off the registry entry for systems that need them, so the inventory is
also the index of which system has which impact assessment.

**Reference tools and standards (illustrative).** Registries range from ITSM and governance suites
(for example ServiceNow, Credo AI) to agent-discovery tools (for example Zenity) that find AI the
inventory did not know about. The AIBOM has standard formats: CycloneDX ML-BOM and the SPDX 3.0 AI
profile, with the OWASP AIBOM generator producing CycloneDX output [6]. The distinction from a classic
SBOM matters: an AIBOM records models, datasets, weights and their provenance, not only software
dependencies. The registry is the object that layer 01's policies evaluate and layer 04's runtime
controls attach to; without a runtime data path feeding it, it is a spreadsheet that was true on the
day it was edited.

**Definition of done.**

- Every model, system and agent in production has a registry entry with an owner, a version and a
  declared scope; an unregistered artefact cannot reach production.
- The registry is fed by the deployment pipeline, not by manual entry; a new deploy registers itself.
- Each high-risk system links to its model card, data card and, where required, its FRIA/DPIA.
- An AIBOM is generated at build for each AI system and stored with the registry entry.
- A discovery mechanism periodically reconciles the registry against what is actually running and flags
  drift.

**Anti-patterns.**

- The hand-maintained model inventory that answers "what is running?" correctly on the day it is edited
  and is wrong within a week.
- Transparency documents written once at launch and never regenerated when the model, prompt or dataset
  changes: a model card describing a model that no longer exists.

**Evidence to the next layer.** The registry entry names the object under test. An eval in layer 03 is
run *against a registered version* and its result is filed *against that entry*, so the question "was
this model tested?" is answered by a join, not a search. The AIBOM tells the eval layer what to test:
which model, which datasets, which provenance claims need adversarial probing.

> **In practice** Wiring the registry to the deployment pipeline (so `csa-01` registered itself, with
> an owner and a scope, at deploy time) turned "documented" into "governed". Its registry entry became
> a query answered from production, not from a slide.

**Maps to:** EU AI Act Art. 11 (technical documentation), Art. 49/71 (registration and the EU
database), Art. 50 (transparency) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP Agentic
ASI10.

## Layer 03: Evals & Red Teaming as Evidence

**What it proves.** That the model or agent passed a defined test whose failure has consequences. This
is the layer where the principle "give every control teeth" becomes concrete for evals: a benchmark
that only informs a committee is not a control; an eval wired into an **eval gate** that can fail the
build is.
The proof is a structured eval result: pass or fail against a threshold, versioned alongside the model
it tested.

**The artefacts.** An engineer ships eval suites and the gate that runs them. Three families recur:
capability and quality evals (does the system do its job: groundedness, regression against a golden
set), adversarial and red-team evals (does it resist jailbreaks, prompt injection, tool misuse), and
safety-threshold evals tied to a policy from layer 01 (a PII-leakage bound, an injection-resistance
floor). The gate is a pipeline stage: if the eval drops below the agreed threshold, the pipeline fails
and the release does not ship.

**Reference tools and standards (illustrative).** Evaluation frameworks such as Inspect (maintained on
behalf of the UK AI Security Institute [7]), promptfoo and DeepEval run capability and regression
suites; Garak, Mindgard and Giskard run adversarial and vulnerability probes; Ragas covers
retrieval-augmented quality. Adversarial testing is not only good practice: the GPAI Code of Practice
lists adversarial testing and red-teaming among the evaluation approaches expected of GPAI models with
systemic risk, though the Code is voluntary and scoped to those models [8]. The eval result is the
evidence artefact that layer 05 will aggregate, which is why it must be machine-readable, not a
screenshot pasted into a slide.

**Definition of done.**

- Each model or agent has an eval suite versioned in the same repository and updated when the system
  changes.
- At least one adversarial eval and one capability eval run in CI, with a documented threshold.
- A failing eval blocks the deploy; the gate has teeth, not just a report.
- Every eval run emits a structured result (suite id, model version, score, threshold, pass/fail,
  timestamp) filed against the registry entry.
- Thresholds trace to a named failure mode or obligation, not to a round number chosen for comfort,
  and the certainty they demand follows the risk tier (chapter 11 sets the
  [certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier); chapter 14
  sizes the suite for the [statistical validity of evals](/bok/governing-development#statistical-validity-of-evals)).

**Anti-patterns.**

- The one-off pre-launch evaluation whose results are pasted into a slide and never re-run when the
  model or its prompts change.
- The "risk review board" that rates findings low/medium/high monthly but has no mechanism to stop a
  launch already scheduled: recommendation without consequence. The fix is a committee that
  decides what code cannot while the gates enforce the decision
  ([the committee decides, the gates enforce](/bok/governance-program#the-committee-decides-the-gates-enforce),
  chapter 12), with the risk appetite
  [compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates) (chapter 13).

**Evidence to the next layer.** An eval proves the system was safe *at test time*. The system then
meets inputs no eval anticipated. Layer 04 carries the same thresholds into production as runtime
guardrails, and the eval result becomes the baseline that runtime telemetry is compared against. A
drop in live injection-resistance against the tested baseline is a signal, not a surprise.

> **In practice** A red-team eval suite combining Inspect and Garak ran in CI for `csa-01`; a release
> that dropped its injection resistance below the agreed floor failed the pipeline until fixed. The
> eval's output, not a reviewer's opinion, was the assurance evidence filed against the model version.

**Maps to:** EU AI Act Art. 15 (accuracy, robustness, cybersecurity), Art. 55 (GPAI systemic-risk
evaluation) · ISO/IEC 42001 · NIST AI RMF (Measure) · CSA AICM · OWASP Agentic ASI01/ASI02.

## Layer 04: Runtime Controls & Observability

**What it proves.** That the controls hold while the system is acting, and that its behaviour is
observed. Policies and evals are point-in-time; agents act continuously, on inputs no one reviewed.
This layer proves that a guardrail mediated a real call, that an agent acted under its own identity and
scope, and that there is a tested way to stop it. The proof is a stream of runtime decisions and traces.

**The artefacts.** Three groups. Guardrails: input/output filters, tool-call mediation, the enforcement
point where a policy from layer 01 fires against a live request. Observability: tracing and monitoring
that turn agent behaviour into a control signal. Agent runtime identity: every non-human actor with its
own workload identity, a bounded scope, and a **kill switch**, a tested way to revoke access and stop
an agent without breaking the fleet. Register and bound every actor before it acts: no agent acts
before it has an identity, an owner and a scope. A **guardian agent**, an agent whose job is to
review, constrain or stop other agents at runtime, is one way to build the mediation point; it is
itself an agent, so it needs its own identity, scope and kill switch, and its decisions are evidence
like any other guardrail's [16]. Chapter 23 treats
[governing AI agents](/bok/governing-agents) end to end.

**Reference tools and standards (illustrative).** Guardrail frameworks such as NVIDIA NeMo Guardrails,
Meta LlamaFirewall and Lakera enforce input/output and tool-call policy; observability tools such as
Langfuse and Arize Phoenix build on OpenTelemetry to trace agent runs. Agent identity has two distinct
questions the tools should not be allowed to blur. The first is **channel authentication**: how a
client authenticates to a tool server on one hop. The Model Context Protocol specification of
2026-07-28 tightened exactly this: deprecating Dynamic Client Registration in favour of Client ID
Metadata Documents and binding credentials to their issuer [9]. That hardens the MCP connection; it is
not the identity model for the agent. The second is **agent workload identity**: a durable, attributable
identity the agent carries across every hop, tool and protocol, under which its actions are logged and
its access revoked. That is the job of a workload-identity system, such as SPIFFE/SPIRE or first-class agent
identities from enterprise providers (for example Microsoft Entra Agent ID, Okta Agent SSO), not of
MCP, which secures one channel. Conflating the two leaves an agent well-authenticated on the MCP hop
and still unattributable everywhere else. NIST's NCCoE set out the open questions in its February 2026
concept
paper on software and AI agent identity and authorization: how identification, authentication and
authorization apply so each agent is "known, trusted, and properly governed", including non-repudiation
and tamper-proof logging [10]. Gartner expects that by 2029 more than half of successful attacks on AI
agents will exploit access-control weaknesses and prompt injection [11], the failure modes this layer
exists to contain.

**Definition of done.**

- Every agent runs under its own identity with a declared scope; no agent shares a service account or a
  static key across functions.
- A guardrail mediates tool calls and input/output for each agent, enforcing the scope declared in the
  registry.
- A kill switch exists and has been tested: revoking one agent's access does not break the others.
- Every agent run is traced, and traces carry the agent identity, the tools called and the policy
  verdicts that fired.
- Runtime signals are compared against the eval baseline from layer 03, and a regression raises an
  alert.

**Anti-patterns.**

- A fleet of agents sharing one API key and one privileged service account: an incident means rotating
  one secret and breaking everything, and attribution is impossible.
- Guardrails that log but never block: observability mistaken for control, so the system watches
  itself fail in high resolution.

**Evidence to the next layer.** Every guardrail decision, trace and identity event is a timestamped,
structured record. Layer 05 does not re-collect this evidence; it subscribes to it. Runtime is where
continuous assurance gets its continuity: the difference between an attestation that a control existed
and evidence that it fired, on a specific call, at a specific time.

> **In practice** `csa-01` was issued a distinct workload identity with an owner and a declared scope,
> as was every other agent in the telco; when it misbehaved it was traced to its identity and revoked
> without touching the others. The kill switch was tested on a schedule. An untested kill switch is a
> claim, not a control.

**Maps to:** EU AI Act Art. 14 (human oversight), Art. 15 (robustness, cybersecurity), Art. 12
(logging) · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP Agentic ASI02/ASI03/ASI10.

## Layer 05: Assurance & Continuous Compliance

**What it proves.** That the controls below are working, continuously, and that the proof is
machine-readable and audit-ready. This is where evidence stops being a by-product and becomes the
product: the audit is a query, not a project. The proof is a live assurance store that any of the
lower layers writes into and an auditor can read from.

**The artefacts.** Machine-readable evidence in a standard format; framework mappings generated from
that evidence rather than maintained beside it; and the incident and reporting plumbing that turns a
runtime signal into an obligation met on the clock. The organising format is `OSCAL`. Its stable
substrate is NIST's native model: a control layer (`catalog`, `profile`), an implementation layer
(`component-definition`, `system-security-plan`) and an assessment layer (`assessment-plan`,
`assessment-results`, `POA&M`), with traceability from an assessment result back to the control it
tested [15]. That model is the part to build on; the AI-specific additions on top are still forming.
One proposed approach (a single 2026 preprint, not a standard) extends OSCAL with sixteen property
extensions for lifecycle phase, enforcement semantics and risk traceability, in a three-layer
compliance-as-code architecture that generates OSCAL assessment results automatically [12]. Treat it
as an early answer to a real gap the authors name well: frameworks "such as the EU AI Act, ISO/IEC
42001, and NIST AI RMF specify what to assure but provide no executable format for how" [12]. The gap
is what layer 05 closes; the native OSCAL assessment models close most of it today, with or without
the extensions.

**Reference tools and standards (illustrative).** Evidence is emitted as OSCAL component and assessment
artefacts; GRC and AI-governance suites (for example Vanta, Drata, OneTrust; watsonx.governance,
Holistic AI, Saidot) aggregate and present it. Incident reporting maps to EU AI Act Art. 73 (serious
incidents) and Art. 72 (post-market monitoring). As of 2026-09-24 no harmonised standard is cited in
the EU's Official Journal [13], so an ISO/IEC 42001 certificate supports the Art. 17 quality management
system but does not by itself satisfy it, and confers no presumption of conformity under Art. 40 [17].

**Definition of done.**

- Control results from layers 01–04 are emitted as machine-readable evidence (for example OSCAL) with
  timestamps and owners, continuously.
- Framework mappings are generated from the evidence, so a mapping cell that turns green points at a
  control that actually fired.
- An auditor's question is answered by a query against the evidence store, not an evidence-collection
  sprint.
- A serious-incident pipeline can detect, triage and report on the clock, with the Art. 73 timelines
  encoded, not remembered (chapter 17 walks
  [the response lifecycle](/bok/incidents#the-response-lifecycle)).
- The assurance store measures realised risk reduction (the failure-mode rate, the time-to-detect,
  the blast radius), not framework coverage.

**Anti-patterns.**

- The attestation binder assembled the week before an audit, describing controls as they were imagined
  to be, not as production behaved.
- A "compliance score" from a closed platform that cannot be traced to a single running control, whose
  data path stops at the spreadsheet import.

**Evidence closes the loop.** Assurance is not the top of a one-way ladder. A drop in a live metric
feeds back to layer 03 as a new eval, to layer 01 as a tightened policy, and to layer 02 as a registry
flag. The stack is a loop that happens to be drawn as a ladder.

> **In practice** `csa-01`'s guardrail decisions, eval results and policy verdicts streamed into an
> assurance store with timestamps, so a control's status was a live query, not an annual sign-off. When
> an auditor asked what its data-residency control did in the second quarter, the answer was a filter
> over emitted evidence, produced in minutes.

**Maps to:** EU AI Act Art. 17 (quality management), Art. 72 (post-market monitoring), Art. 73 (serious
incident reporting) · ISO/IEC 42001, ISO/IEC 42005 · NIST AI RMF (Govern, Manage) · CSA AICM.

## Data governance across the stack

The five layers govern models and agents; they are only as sound as the data underneath them, and data
governance is not one layer but a thread through all five. Training data, fine-tuning sets, retrieval
corpora, prompts and outputs each carry a lawful basis, a provenance, a retention limit and a set of
rights, and each is an object the stack must be able to name. In layer 02 this is the **data card** and
the lineage record (where a dataset came from, what it may be used for, when it must be deleted),
attached to the registry entry beside the model card. In layer 01 it is retention-and-residency policy
as code, with [privacy by design and privacy-enhancing technologies](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets)
(chapter 19) where personal data is involved. In layer 03 it is data-quality and bias tests run
against the set, not assumed of it, behind a
[dataset admission gate](/bok/governing-development#data-for-training-and-testing) (chapter 14);
chapter 16 sets out
[the data you need to test for bias](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
The EU
AI Act treats this as a first-class duty: Article 10 requires representative, relevant and
error-checked datasets for high-risk systems, and the post-Omnibus Article 4a gives a narrow lawful
basis to process special-category data *for bias detection*, conditioned on pseudonymisation and
deletion once bias is corrected (see chapter 08). The engineering commitment is that a RAG corpus is
governed like a model: versioned, its provenance and licence recorded in the AIBOM, its snapshot tied
to the eval that tested the system on it, so "what was in the corpus when this answer was produced?" is
a query, not a guess. Prompts, retrieved passages and outputs at run time need the same rules
([inference-time data governance](/bok/governing-deployment#inference-time-data-governance),
chapter 15). Data with no card, no lineage and no retention rule is the ungoverned object that
makes every layer above it unprovable.

## Designing human oversight (Article 14)

Human oversight is a control to be engineered, not a reassurance to be asserted. EU AI Act Article 14
requires that high-risk systems be designed so a person can *effectively* oversee them (understand the
output, decide against it, and stop the system), and the hard part is that undifferentiated oversight
fails in both directions. Human review of every action destroys the value of automation; nominal
oversight of a firehose of actions is a rubber stamp, and a rubber stamp is worse than none because it
launders the decision. Two failure modes have to be designed against explicitly. **Automation bias**:
a reviewer who sees a confident machine output will tend to confirm it, so oversight that only offers
"approve/reject" on the model's proposal is oversight in name only. **Oversight that degrades**: a gate
that a person can clear in two seconds under load will be cleared in two seconds, and its quality falls
silently as volume rises. The engineering answer is to classify actions by consequence and place a
designed checkpoint only where the stakes justify the latency (the
[**Human-in-the-loop Gate**](/bok/patterns#pattern-human-in-the-loop-gate) pattern in chapter 05), giving the reviewer enough context to disagree, logging the approver and the decision as
evidence, and monitoring the oversight itself (approval rate, time-to-decide, override rate) as a
signal that can degrade. Oversight you do not measure is oversight you cannot claim. The EU High-Level
Expert Group's [human-in-the-loop, on-the-loop and in-command](/bok/principles-and-standards#eu-hleg-guidelines-and-altai)
approaches (chapter 22) name the placement choices, and chapter 16 tests whether explanations
actually help reviewers resist automation bias
([testing explanation quality](/bok/fairness-and-explainability#testing-explanation-quality)).

## Third-party and procured AI

Most organisations do not train the models they run. They buy SaaS with an embedded LLM, call an
API-only foundation model, or inherit an agent inside a vendor's product; for those, the parts of
the stack that assume you own the model degrade. You cannot red-team weights you cannot reach, and an
**eval gate** (layer 03) can only test the vendor's system as a black box, at its boundary, not its
internals. Runtime control (layer 04) narrows to what the integration exposes: the tool scopes you
grant, the identity you issue the vendor's agent, the traffic you can observe, not the model's own
behaviour. The layers do not disappear, but layer 03 shrinks to boundary evals and reliance on the
vendor's own evidence, and layer 04 shrinks to the perimeter you control. What grows to compensate is
inventory and assurance: the vendor's system still needs a registry entry, an owner and a scope; its
supplier documentation, model card and any AIBOM become evidence you collect rather than produce; and
the due-diligence itself becomes a gate, written into a
[third-party AI policy](/bok/governance-program#third-party-ai-policy) (chapter 12). This is the
[**Vendor / Model Due-Diligence Gate**](/bok/patterns#pattern-vendor--model-due-diligence-gate)
pattern (chapter 05), anchored in ISO/IEC 42001 Annex A.10 (third-party and customer relationships) and the EU
AI Act's split of duties between provider and deployer (see chapter 08, and
[who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain) in chapter 18). The
rule of thumb: the less of the model you own, the more of your control budget moves from testing it
to bounding it and evidencing the supplier. Chapter 15 covers the
[build, buy or adapt](/bok/governing-deployment#build-buy-or-adapt) decision and its evidence burden,
and chapter 20 the [licences and indemnities of procured models](/bok/existing-law#model-licences-and-vendor-indemnities).

## The cost of the stack

None of this is free, and a FinOps line is part of governing it honestly. The recurring costs are
compute for eval suites run on every change (adversarial suites are the expensive ones, and running
them on each commit rather than each release is a real bill), storage and egress for traces and the
evidence store (agent traces are verbose, and continuous assurance means keeping them long enough to
answer an audit), and the engineering time to maintain suites, thresholds and integrations as the
systems move. The costs scale with change frequency and trace volume, so the levers are obvious once
named: sample or tier expensive evals by risk, set retention by obligation rather than by default, and
push the cheapest controls (a policy check, an identity gate) to the front where they catch failures
before an expensive eval runs. A stack whose running cost no one tracks is a stack that will be cut in
the first budget round, which is its own governance failure.

## The minimum viable stack for a team of one

Most AI governance functions are small, and many are a single person: in the adjacent GRC discipline,
roughly half of teams are four people or fewer and nearly one in five (18.5%) is a team of one [14]. A team of
one cannot build all five layers at depth, but it can build the spine thinly, end to end: one vertical
slice that touches every layer beats one layer built out and four left on paper. Start where the
leverage is highest and the cost is lowest:

- **Layer 02 first, minimally.** A registry that a deploy writes to, with an owner and a scope per
  entry. If you can answer "what is running and who owns it?" from a live source, you have more than
  most.
- **One policy in layer 01 with teeth.** A single rule that matters (no deploy without a registered
  owner, or a data-residency check), as code, in the pipeline, blocking on failure. One control that
  bites beats a hundred that recommend.
- **One eval gate in layer 03.** One adversarial eval against your highest-risk agent, wired so a
  regression fails the build. Reuse an open framework; do not write your own harness.
- **Identity and a kill switch in layer 04.** Every agent under its own identity with a scope, and a
  tested way to stop it. This is the cheapest control with the largest blast-radius reduction.
- **Evidence as a by-product in layer 05.** Have each of the above emit a structured, timestamped
  record into one store. You are not building an OSCAL pipeline yet; you are refusing to rely on
  screenshots.

The order is deliberate: see it, rule it, test it, contain it, prove it. A thin vertical slice answers
all three questions for one system today and widens as the team grows. The alternative, a thick layer
01 of policies with no inventory beneath them, answers none of the three questions, and is exactly the
framework theatre the discipline exists to end. How much of the risk loop a small function runs is
set by chapter 13's [tailoring matrix](/bok/risk-management#the-tailoring-matrix).

## One system through the five layers

`csa-01`, the customer-service assistant from the boxes above, is one system, not five. Below is the
single artefact it produces at each layer: short excerpts of the schemas defined in chapter 05, each
illustrative. Full JSON Schemas with filled examples for these records, and
[how to use them](/resources/templates#tpl-how), are on the templates page.

**Layer 01: Govern-as-Code.** A Policy Card verdict (illustrative):

```json
{ "rule_id": "residency.eu-only.v3", "decision": "deny",
  "input_hash": "sha256:9f2b…", "timestamp": "2026-09-18T14:07:11Z" }
```

**Layer 02: Inventory & Transparency.** Its registry entry (illustrative):

```json
{ "id": "csa-01", "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"], "expiry": "2026-12-17" }
```

**Layer 03: Evals & Red Teaming as Evidence.** An eval-gate result (illustrative):

```json
{ "suite_id": "injection-resistance.v4", "model_version": "csa-01@2026-09-18",
  "score": 0.982, "threshold": 0.95, "result": "pass" }
```

**Layer 04: Runtime Controls & Observability.** A guardrail event (illustrative):

```json
{ "agent": "csa-01", "direction": "output", "rule_id": "output.pii.v2",
  "decision": "block", "timestamp": "2026-09-18T14:31:52Z" }
```

**Layer 05: Assurance & Continuous Compliance.** The evidence record it emits (illustrative):

```json
{ "control_id": "guardrail.output.pii.v2", "subject": "csa-01@2026-09-18",
  "decision": "alert", "obligation": "EU AI Act Art. 15",
  "timestamp": "2026-09-18T14:31:52Z" }
```

The five excerpts are one data path from policy to proof, keyed on the same registry id.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] Policy Cards: Machine-Readable Runtime Governance for Autonomous AI Agents (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[5] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[6] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[7] Inspect: a framework for large language model evaluations (UK AI Security Institute). GitHub. 2026. https://github.com/UKGovernmentBEIS/inspect_ai (verified: primary)
[8] General-Purpose AI Code of Practice, Safety and Security chapter (examples of model evaluation methods include "red-teaming and other methods of adversarial testing"; systemic-risk models only; voluntary; published 10 Jul 2025). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[12] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer compliance-as-code) (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[13] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[14] State of GRC 2026 (≈51% of GRC teams ≤4 people; ≈18.5% solo). GRC Engineer. 2026. https://grcengineer.com/report/ (verified: primary)
[15] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[16] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (guardian agents: AI-based technologies that review, monitor and redirect or block agent actions). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[17] CSA research note on the EU AI Act, prEN 18286 and ISO/IEC 42001 (ISO/IEC 42001 alone does not satisfy the AI Act and is not a harmonised standard; EN 18286 targets the Art. 17 QMS). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
