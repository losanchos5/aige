# 05. Patterns

> A catalogue of reusable AI governance engineering patterns, each named to a layer of the stack, in
> the CSIRO Responsible AI Pattern Catalogue structure.

This chapter is the catalogue. Each pattern is a reusable solution to a problem that recurs when you
engineer the governance of AI systems. The structure follows the CSIRO Responsible AI Pattern
Catalogue, which applies software-engineering design patterns to responsible AI across governance,
process and product levels [1]. We keep its fields (summary, objectives, target users, impacted
stakeholders, relevant principles, context, problem, solution, consequences, related patterns) and add
a **Maps to** line naming the standards, articles and stack layer (1–5) each pattern serves.

Every pattern names one of the five layers (chapter 04) so the catalogue and the stack stay consistent,
and realises one or more of the six principles (chapter 03): *build the control at the earliest point
it can block · give every control teeth · register and bound every actor before it acts · instrument
the build to produce its own proof · start from a named failure mode or harm · make the governed path
the easiest path*. Each **Maps to** line draws its
threat IDs from the OWASP Top 10 for Agentic Applications 2026 [3] and its function labels from the
NIST AI RMF [18]. Each pattern carries a short example labelled `(illustrative)`: a plausible,
de-identified sketch, not a claim about any named system. Mappings to the EU AI Act are illustrative,
not a claim of conformity, and no harmonised standard is yet cited in the Official Journal.

---

## Pattern: Policy Card

**Summary:** Express a governance rule as a machine-readable artefact that travels with the model or
agent and is evaluated in the pipeline and at runtime, rather than as prose a human must apply. The
Policy Card encodes permitted and prohibited actions, obligations and evidentiary requirements for one
AI system, and links to the enforcement and audit pipelines that act on it [2].

### Objectives
Turn a policy from a statement of intent into an executing control, versioned and testable, so that a
rule change is a reviewable diff and every evaluation leaves a verdict.

### Target users
AI governance engineer, platform team, policy owner.

### Impacted stakeholders
Model owners, deployers, auditors, regulators.

### Relevant principles
Build the control at the earliest point it can block; make the governed path the easiest path.

### Context
An organisation with more than a handful of AI systems and a governance function that cannot review
every change by hand. Rules exist but live in documents no pipeline can read.

### Problem
Prose policy cannot be enforced automatically, drifts from the systems it governs, and leaves no
evidence that it was applied. A rule that can only be remembered is violated the moment someone forgets.

### Solution
Write each rule as a Policy Card: a structured, machine-readable artefact (for example expressed for an
`OPA/Rego` or `Cedar` engine, or as a Policy Cards document) that states allow/deny logic, the failure
mode it addresses and the framework clauses it maps to. Store it with the system it governs. Evaluate
it pre-merge, at deploy, and (where the rule is a runtime constraint) at the point of action. Emit a
verdict (rule id, input hash, decision, timestamp) on every evaluation.

Illustrative schema for the verdict:

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Example (illustrative)** A Policy Card for a customer-service agent declares that it may call the
> refunds tool only up to a bounded amount and never outside business hours; the same card is evaluated
> in CI against the agent's declared scope and at runtime by the tool-call guardrail.

### Consequences
Rules become enforceable and auditable, and the crosswalk generates itself. The cost is authoring and
maintaining cards, and the discipline to keep the executable version authoritative over the prose.

### Related patterns
Framework Crosswalk; Eval Gate in CI; Runtime Guardrail; Machine-Readable Evidence (OSCAL); Agent
Identity & Scoped Credentials.

**Maps to:** EU AI Act Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM · OWASP Agentic
ASI02/ASI03 · Layer 01 Govern-as-Code.

---

## Pattern: Eval Gate in CI

**Summary:** Wire an evaluation suite into the CI/CD pipeline so that a model or agent must pass a
defined test, above a documented threshold, before it can ship. The eval run is the control and its
result is the evidence; a failing eval blocks the build.

### Objectives
Make "give every control teeth" concrete: give a testable property a consequence, so failure stops a
release instead of filing a finding.

### Target users
AI governance engineer, ML engineer, platform team.

### Impacted stakeholders
Model owners, users exposed to the system, auditors.

### Relevant principles
Give every control teeth; build the control at the earliest point it can block.

### Context
A model or agent that changes (retrained, re-prompted, given a new tool) and a pipeline that already
runs tests for functional correctness.

### Problem
Evaluations run once before launch and pasted into a slide prove nothing after the next change. A review
board that can only rate findings cannot stop a scheduled launch. Without a gate, evaluation is
research, not control.

### Solution
Version an eval suite alongside the model. Run at least one capability eval and one adversarial eval in
CI (for example with Inspect, promptfoo, Garak or Giskard; illustrative). Set a threshold that traces
to a named failure mode or obligation. Fail the pipeline below the threshold. Emit a structured result
(suite id, model version, score, threshold, pass/fail, timestamp) filed against the registry entry.

Illustrative schema for the result:

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Example (illustrative)** An internal coding agent must clear an injection-resistance floor and a
> regression suite before deploy; a release that drops resistance below the floor fails the pipeline and
> does not ship until fixed.

### Consequences
Regressions are caught before production and evidence accrues automatically. The trade-off is eval
maintenance, run-time cost in CI, and the need to tune thresholds to avoid flaky gates.

### Related patterns
Policy Card; Adversarial Red-Team Suite; Continuous Assurance Telemetry; Machine-Readable Evidence
(OSCAL); Model Card as Control Evidence.

**Maps to:** EU AI Act Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP Agentic
ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

---

## Pattern: Adversarial Red-Team Suite

**Summary:** Maintain a versioned adversarial test suite, built from a threat taxonomy and run in CI
or on a schedule, whose findings are triaged into fixes or accepted risks, recorded as evidence, and
fed back into the suite. Where an Eval Gate proves a threshold still holds, the red-team suite is the
standing adversary that keeps finding the inputs the threshold never anticipated.

### Objectives
Turn adversarial testing from a one-off exercise into a maintained, versioned control that discovers
failure modes before an attacker does and leaves a triaged, auditable record of every finding.

### Target users
AI governance engineer, security engineer, ML engineer, red-team lead.

### Impacted stakeholders
Model owners, users exposed to the system, incident responders, auditors, regulators.

### Relevant principles
Start from a named failure mode or harm; give every control teeth.

### Context
A model or agent whose exposure grows as it gains tools, prompts and reach, in an organisation that
already runs an Eval Gate for regression and wants a standing adversary rather than a single
pre-launch penetration test.

### Problem
A one-off red-team is out of date the moment the system changes, and its findings, a slide of
jailbreaks, leave no trace that they were fixed or accepted. Without a versioned suite and a triage
record, the same attack is rediscovered every quarter and no one can prove which findings were closed.

### Solution
Build the suite from a threat taxonomy rather than intuition: draw techniques from MITRE ATLAS's
adversarial tactics and techniques for AI systems [25] and the agentic attack classes in the OWASP Top
10 for Agentic Applications [3], so each test traces to a named technique. Version the suite alongside
the model and run it in CI or on a schedule against the registered version. Route each finding through
triage (fix, or accept with a recorded rationale and owner) and file the outcome as a structured
evidence record against the registry entry. Feed every confirmed finding back into the suite as a
regression test, so a closed attack stays closed. The suite complements the Eval Gate: the gate
enforces a threshold on each release, the suite is the adversary that generates the next one.

> **Example (illustrative)** A red-team suite for a customer-service assistant runs a versioned set of
> prompt-injection and tool-abuse cases drawn from ATLAS and the OWASP agentic classes; a new
> tool-exfiltration finding is triaged, fixed and added to the suite, so the next release must pass it.

### Consequences
Adversarial coverage grows over time instead of resetting each launch, and the triage record shows what
was found, fixed or accepted. The cost is maintaining the taxonomy and suite, the compute to run
adversarial cases often, and the discipline to triage every finding rather than let it lapse.

### Related patterns
Eval Gate in CI; Runtime Guardrail; Continuous Assurance Telemetry; Incident Pipeline; Vendor / Model
Due-Diligence Gate.

**Maps to:** EU AI Act Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP
Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

---

## Pattern: Agent Registry

**Summary:** Maintain a runtime-aware inventory of every model, service and agent, each entry carrying
an owner, a scope and an expiry, fed by the deployment pipeline rather than typed by hand. The registry
is the object that policies evaluate and runtime controls attach to.

### Objectives
Answer "what AI is running, and what is it allowed to do?" from a live source, and make registration a
precondition of reaching production.

### Target users
AI governance engineer, platform team, security engineer.

### Impacted stakeholders
Model owners, deployers, auditors, incident responders.

### Relevant principles
Register and bound every actor before it acts; make the governed path the easiest path.

### Context
An organisation deploying models and agents across teams, where no single source knows what is live.

### Problem
A hand-maintained inventory is correct on the day it is edited and wrong within a week. Without owner,
scope and expiry, an action cannot be attributed, a scope cannot be enforced, and a stale agent lingers
with standing access no one revisits.

### Solution
Make the registry an API the deploy pipeline writes to: a new model or agent registers itself at deploy
with an owner, a declared scope and an expiry after which the entry must be renewed or is deactivated.
Deny production access to unregistered artefacts. Reconcile periodically against what is actually
running (see Shadow-AI Discovery) and flag drift.

Illustrative schema for a registry entry:

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Example (illustrative)** Each agent's registry entry expires after 90 days; an owner who does not
> renew loses the agent's workload identity, so abandoned agents fall out of production automatically.

### Consequences
Attribution, scope enforcement and lifecycle control become possible, and every other layer gets an
object to anchor to. The cost is pipeline integration and the governance to enforce the expiry.

### Related patterns
Agent Identity & Scoped Credentials; AIBOM; Shadow-AI Discovery; Kill Switch / Circuit Breaker.

**Maps to:** EU AI Act Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP
Agentic ASI10 · Layer 02 Inventory & Transparency.

---

## Pattern: AIBOM

**Summary:** Generate an AI bill of materials at build for each AI system, recording models, datasets,
weights and their provenance in a standard format, and store it with the registry entry. The AIBOM is
what the transparency and eval layers read to know what to document and what to test.

### Objectives
Make the composition and provenance of an AI system machine-readable, so supply-chain risk and
transparency obligations can be answered from an artefact, not reconstructed.

### Target users
AI governance engineer, ML engineer, security engineer.

### Impacted stakeholders
Model owners, downstream deployers, auditors, procurement.

### Relevant principles
Instrument the build to produce its own proof; start from a named failure mode or harm.

### Context
AI systems assembled from foundation models, fine-tunes, third-party datasets and libraries, where the
classic SBOM captures software dependencies but not models or data.

### Problem
Without a bill of materials for models and data, an organisation cannot answer which model version, from
which provenance, trained on which data, is inside a given system, so it cannot assess supply-chain
risk or produce transparency documentation on demand.

### Solution
Emit an AIBOM at build in a standard format, CycloneDX ML-BOM or the SPDX 3.0 AI profile, for example
with the OWASP AIBOM generator [14] (illustrative), covering models, datasets, weights, and their
provenance and licences. Attach it to the registry entry and regenerate it on each build so it never
drifts from the deployed system.

> **Example (illustrative)** A retrieval-augmented assistant's AIBOM lists the base model, the
> embedding model, the corpus snapshot and their licences; when a corpus licence changes, the diff
> surfaces in the next build's AIBOM.

### Consequences
Supply-chain and provenance questions become queries; transparency documents can be generated from the
AIBOM. The cost is toolchain integration and keeping provenance metadata accurate.

### Related patterns
Agent Registry; Model Card as Control Evidence; Machine-Readable Evidence (OSCAL).

**Maps to:** EU AI Act Art. 11, Art. 53 (GPAI documentation) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA
AICM · Layer 02 Inventory & Transparency.

---

## Pattern: Model Card as Control Evidence

**Summary:** Treat the model card and data card not as launch documentation written once, but as
structured evidence regenerated from the pipeline, so that transparency documents describe the system as
it is now and feed the assurance layer.

### Objectives
Convert transparency documentation from a static PDF into a versioned artefact that is both
human-readable and machine-consumable, and that counts as control evidence.

### Target users
AI governance engineer, ML engineer, DPO.

### Impacted stakeholders
Model owners, users, auditors, data subjects.

### Relevant principles
Instrument the build to produce its own proof; make the governed path the easiest path.

### Context
A system subject to transparency obligations, where cards are traditionally written at launch and never
touched again.

### Problem
A model card written once decays into fiction as the model, prompts and datasets change. A card that is
not regenerated cannot be trusted as evidence and misleads the very auditor it was meant to satisfy.

### Solution
Template the card and populate it from the pipeline: intended use, evaluation results (from the Eval
Gate), datasets (from the AIBOM), known limitations and owner. Regenerate on each significant change and
version it with the model. Store the card as structured data so it can be both read by a person and
consumed by the assurance layer.

> **Example (illustrative)** A classifier's card is rebuilt on every deploy, pulling its latest
> fairness-eval scores and dataset provenance automatically, so the card an auditor reads is the card
> production produced.

### Consequences
Transparency stays true and doubles as evidence. The cost is templating and pipeline wiring, and
agreeing what "significant change" triggers a regeneration.

### Related patterns
AIBOM; Eval Gate in CI; Machine-Readable Evidence (OSCAL); FRIA-as-Code.

**Maps to:** EU AI Act Art. 11, Art. 13 (transparency) · ISO/IEC 42001, ISO/IEC 42005 · NIST AI RMF
(Map, Measure) · Layer 02 Inventory & Transparency.

---

## Pattern: Continuous Assurance Telemetry

**Summary:** Stream control decisions (policy verdicts, eval results, guardrail actions, identity
events) into an assurance store as they happen, so the status of a control is a live query rather than
a point-in-time attestation. Trustworthiness becomes a continuously generated signal, not a static
certificate [5].

### Objectives
Replace periodic attestation with evidence emitted as the system runs, so "is the control working?" is
answered by telemetry.

### Target users
AI governance engineer, SRE/platform team, auditor.

### Impacted stakeholders
Model owners, auditors, regulators, incident responders.

### Relevant principles
Instrument the build to produce its own proof; give every control teeth.

### Context
A stack whose lower layers already emit structured records, and an assurance function tired of
assembling binders before each audit.

### Problem
An attestation says a control existed when someone looked; it says nothing about the weeks in between,
during which the model was retrained and an agent gained a tool. Point-in-time evidence decays
immediately.

### Solution
Have each control write a timestamped, structured record to a common assurance store, on one schema.
Fix the schema first: a minimum useful evidence record is `{control_id, subject (model/agent/system id
+ version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold,
failure_mode/obligation ref, input_hash, actor, timestamp, signature}`. Normalise every tool's output
into that shape on ingest, so heterogeneous sources compose into one queryable store keyed on the
registry id.

Illustrative schema for the evidence record:

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Two research proposals point at the same idea and are worth watching, not adopting whole:
TAIP treats NIST TEVV outputs as reusable AI Assurance Objects that compose across systems [5], and
AAGATE operationalises a control plane aligning the NIST AI RMF functions for agents in production [6];
both are single preprints. Expose the current status of each control as a query over the store.

> **Example (illustrative)** A dashboard tile for the data-residency control is backed by a live query
> over emitted guardrail decisions; if the control stops firing, the tile goes red within minutes, not
> at the next audit.

### Consequences
The audit becomes a query and drift is visible in near real time. The cost is building the pipeline and
storage, and defining a common evidence schema across tools.

### Related patterns
Machine-Readable Evidence (OSCAL); Eval Gate in CI; Runtime Guardrail; Incident Pipeline; Kill Switch
/ Circuit Breaker.

**Maps to:** EU AI Act Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · CSA AICM · Layer 05
Assurance & Continuous Compliance.

---

## Pattern: Runtime Guardrail

**Summary:** Place input and output guardrails on the model or agent's runtime path that enforce its
Policy Card on every live request and emit a decision to telemetry and to the circuit breaker. The
guardrail is where a policy written in layer 01 and a threshold tested in layer 03 become an action
taken on a real call, not a claim about one.

### Objectives
Enforce policy at the point of action, on inputs and outputs no eval anticipated, and make each
enforcement a structured event the assurance and incident layers can consume.

### Target users
AI governance engineer, ML engineer, security engineer, platform team.

### Impacted stakeholders
Users, model owners, affected persons, incident responders, auditors.

### Relevant principles
Give every control teeth; instrument the build to produce its own proof.

### Context
An agent or model in production, acting on live inputs, whose Policy Card and eval thresholds exist but
have no runtime enforcement point, so a rule proven in CI is unguarded the moment the system meets an
input no test covered.

### Problem
Policies and evals are point-in-time; the system then meets prompt injection, unsafe outputs and tool
calls no one reviewed. A guardrail that only logs is observability mistaken for control: the system
watches itself fail in high resolution. Without an enforcement point that can block and emit, the
runtime is the gap between a tested control and an uncontrolled action.

### Solution
Put a guardrail on both sides of the model/agent path. The input guardrail screens prompts and
retrieved context for injection and policy-violating requests before they reach the model; the output
guardrail screens generations and tool calls for unsafe content, data leakage and out-of-scope actions
before they take effect. Enforce the same Policy Card evaluated in CI [2], so the runtime decision and
the pipeline decision share one rule. On every call emit a structured event, `{agent, direction
(input/output), rule_id, decision (allow/block/redact), timestamp}`, to the assurance store
(Continuous Assurance Telemetry) and, on a defined breach, signal the circuit breaker (Kill Switch /
Circuit Breaker). Guardrail frameworks realise this as a category; the OWASP Agent Control Standard
names the runtime-control surface [11]. This is distinct from the kill switch: the guardrail decides one
call at a time and stays in the request path; the breaker withdraws the agent's autonomy wholesale when
the guardrail's signals cross a threshold.

> **Example (illustrative)** A customer-service assistant's input guardrail blocks a prompt-injection
> attempt and its output guardrail redacts an account number the model was about to return; both
> decisions are emitted to the assurance store, and a burst of blocks trips the circuit breaker.

### Consequences
The tested control holds on live traffic and every enforcement leaves evidence; the guardrail is also
the sensor the breaker and the incident pipeline read. The cost is per-call latency, false positives to
tune, and keeping the runtime rule in sync with the Policy Card and eval thresholds.

### Related patterns
Policy Card; Kill Switch / Circuit Breaker; Agent Identity & Scoped Credentials; Continuous Assurance
Telemetry; Human-in-the-loop Gate; Eval Gate in CI.

**Maps to:** EU AI Act Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic
ASI02/ASI03 · Layer 04 Runtime Controls & Observability.

---

## Pattern: Kill Switch / Circuit Breaker

**Summary:** Provide a tested mechanism to stop an agent or class of agents at the point of action,
revoking access and halting tool calls, without breaking the rest of the fleet. Autonomy is granted
only where it can be withdrawn.

### Objectives
Bound the blast radius of a misbehaving or compromised agent, and make "stop it" a control that has been
exercised, not a claim.

### Target users
AI governance engineer, security engineer, SRE.

### Impacted stakeholders
Model owners, users, incident responders, affected third parties.

### Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

### Context
Agents that act autonomously (calling tools, moving data or money), where a single failure can cascade.
Gartner expects that by 2029 more than half of successful attacks on AI agents will exploit
access-control weaknesses and prompt injection [17].

### Problem
An agent that cannot be stopped precisely can only be stopped by breaking everything. A fleet on shared
credentials means an incident forces a choice between leaving the agent running and rotating a secret
that halts the whole fleet.

### Solution
Bind each agent to its own identity (see Agent Identity & Scoped Credentials) so access can be revoked
per agent. Implement a circuit breaker at the tool-call boundary that trips on a defined signal: a
threshold breach, an anomaly, a manual pull. Test the kill switch on a schedule; an untested kill switch
is not a control.

> **Example (illustrative)** A payments agent's circuit breaker trips automatically when its
> unauthorised-tool-call rate crosses a threshold, revoking just that agent's scope while the rest of
> the fleet keeps running; the pull is drilled monthly.

### Consequences
Incidents are contained to one agent and recovery is fast. The cost is per-agent identity plumbing and
the engineering to make revocation instant and safe.

### Related patterns
Agent Identity & Scoped Credentials; Agent Registry; Human-in-the-loop Gate; Incident Pipeline.

**Maps to:** EU AI Act Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP
Agentic ASI02/ASI10 · Layer 04 Runtime Controls & Observability.

---

## Pattern: Incident Pipeline

**Summary:** Build the plumbing to detect, triage and report serious AI incidents on the clock, with
reporting timelines and templates encoded rather than remembered. For high-risk systems this includes EU
AI Act Article 73 serious-incident reporting; for GPAI models it includes the systemic-incident
reporting the Code of Practice expects.

### Objectives
Turn a runtime signal into a reported obligation within the legal window, and produce the incident
record as structured evidence.

### Target users
AI governance engineer, security/incident responder, legal/compliance.

### Impacted stakeholders
Regulators, affected persons, deployers, model owners.

### Relevant principles
Instrument the build to produce its own proof; start from a named failure mode or harm.

### Context
A high-risk or GPAI system in production, subject to serious-incident reporting duties, where detection
lives in engineering and reporting lives in legal, with no wire between them.

### Problem
When an incident is detected, the clock starts. If detection, triage and reporting are disconnected
manual steps, the deadline is missed and the evidence of what happened is reconstructed after the fact.

### Solution
Connect runtime detection (from observability and guardrails) to a triage workflow that classifies
severity and, on a reportable event, drafts the report against the required template and starts the
statutory timer. Encode the EU AI Act Art. 73 timelines and the Art. 72 post-market monitoring feed
[12]; hold the incident record as machine-readable evidence.

> **Example (illustrative)** A guardrail flags a data-exfiltration attempt via an agent tool; the
> pipeline classifies it, opens an incident with the Art. 73 timer running, and pre-fills the report
> from the trace and registry entry.

### Consequences
Reporting happens on time and the record is audit-ready. The cost is cross-functional integration and
keeping the severity criteria and templates current with the law.

### Related patterns
Continuous Assurance Telemetry; Runtime Guardrail; Kill Switch / Circuit Breaker; Machine-Readable
Evidence (OSCAL).

**Maps to:** EU AI Act Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Manage) · Layer
05 Assurance & Continuous Compliance.

---

## Pattern: FRIA-as-Code

**Summary:** Maintain the fundamental-rights impact assessment as a versioned, reviewable artefact
cross-referenced to the data-protection impact assessment, so that a rights assessment is an input to
design that updates with the system, not a document produced once and filed.

### Objectives
Keep the FRIA and its DPIA cross-reference live and linked to the controls they demand, so a change in
the system triggers a review of its rights impact.

### Target users
AI governance engineer, DPO, legal/compliance.

### Impacted stakeholders
Data subjects, affected persons, deployers, regulators.

### Relevant principles
Start from a named failure mode or harm; instrument the build to produce its own proof.

### Context
A deployer of a high-risk AI system subject to the EU AI Act Art. 27 fundamental-rights impact
assessment, where a DPIA under GDPR Art. 35 may already exist and overlap.

### Problem
A FRIA written once as a Word document describes rights impact at a single moment and is never revisited
when the system changes. Duplicated effort between FRIA and DPIA wastes work and leaves the two out of
sync.

### Solution
Template the FRIA as structured data covering intended use, affected groups, risks to rights, and the
mitigating controls, with each mitigation linked to the control that implements it (a Policy Card, an Eval
Gate, a guardrail). Cross-reference the DPIA so shared elements are written once. Store it with the
registry entry and re-open it on significant change. The EU AI Act Art. 27 FRIA and its DPIA
cross-reference define the scope [13].

> **Example (illustrative)** A benefits-eligibility system's FRIA links each identified risk to
> people's rights to a specific eval and guardrail; when the model is retrained, the FRIA flags which
> mitigations need re-verification.

### Consequences
Rights assessment stays current and traceable to controls, and overlaps with the DPIA are not
duplicated. The cost is templating and the discipline to treat the assessment as living.

### Related patterns
Model Card as Control Evidence; Policy Card; Runtime Guardrail; Machine-Readable Evidence (OSCAL);
Human-in-the-loop Gate.

**Maps to:** EU AI Act Art. 27 (FRIA), Art. 9 · GDPR Art. 35 (DPIA) · ISO/IEC 42005 · NIST AI RMF
(Map) · Layer 01 Govern-as-Code / Layer 02 Inventory & Transparency.

---

## Pattern: Framework Crosswalk

**Summary:** Maintain a mapping from each control to the framework clauses it serves, generated from
the controls themselves, as an index for navigation and reuse, never as the end state. A crosswalk
proves you have read the framework; it does not prove the control fires.

### Objectives
Let one control satisfy many frameworks and make coverage navigable, while refusing to mistake coverage
for assurance.

### Target users
AI governance engineer, compliance lead, auditor.

### Impacted stakeholders
Auditors, regulators, model owners.

### Relevant principles
Make the governed path the easiest path; instrument the build to produce its own proof.

### Context
An organisation answering to several overlapping frameworks (EU AI Act, ISO/IEC 42001, NIST AI RMF, CSA
AICM) that would otherwise implement the same control several times.

### Problem
The crosswalk is where framework theatre begins. A green mapping matrix is mistaken for a working
control; a 300-row spreadsheet mapping controls to five frameworks is presented as maturity while
nothing measures whether any mapped control reduces risk. **The anti-pattern is treating coverage as
control: a mapping cell is not evidence.**

### Solution
Generate the crosswalk from the controls, not beside them: each Policy Card and Eval Gate declares the
clauses it maps to, and the crosswalk is the aggregation. Use it to find gaps and reuse controls, not to
report compliance. Every mapping cell must resolve to a running control and its emitted evidence; a cell
with no evidence behind it is flagged, not counted. Reference vocabularies such as the CSA AICM (247
control objectives across 18 domains) [15] and the OWASP Agent Control Standard [11] anchor the mapping.

> **Example (illustrative)** Clicking a green cell for "logging" opens the guardrail and the OSCAL
> evidence it emitted this week; a cell with no evidence renders amber, not green.

### Consequences
Controls are reused across frameworks and gaps are visible, without inflating a matrix into false
assurance. The trade-off is the discipline to keep cells honest and to resist reporting coverage as
outcome.

### Related patterns
Policy Card; Runtime Guardrail; Machine-Readable Evidence (OSCAL); Continuous Assurance Telemetry.

**Maps to:** EU AI Act (cross-cutting) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM · OWASP Agent
Control Standard · Layer 01 Govern-as-Code / Layer 05 Assurance & Continuous Compliance.

---

## Pattern: Machine-Readable Evidence (OSCAL)

**Summary:** Emit control evidence in a machine-readable, standard format so that the audit is a query
and the same evidence feeds continuous assurance. OSCAL, extended with properties for AI, is the
organising format: frameworks specify what to assure but provide no executable format for how, and this
pattern supplies it [4].

### Objectives
Make evidence queryable, diffable and aggregatable, and eliminate the screenshot as an evidence
artefact.

### Target users
AI governance engineer, auditor, platform team.

### Impacted stakeholders
Auditors, regulators, model owners.

### Relevant principles
Instrument the build to produce its own proof; give every control teeth.

### Context
A stack whose controls already produce structured records, and an assurance function that must answer
auditors repeatedly and at speed.

### Problem
Evidence a human must format and file by hand does not scale, cannot be verified quickly, and is out of
date the moment it is saved. Every audit re-collects it from scratch.

### Solution
Emit control results as OSCAL component-definition and assessment-results artefacts. OSCAL's native
model is the stable substrate: a control layer (`catalog`, `profile`), an implementation layer
(`component-definition`, `system-security-plan`) and an assessment layer (`assessment-plan`,
`assessment-results`, `POA&M`), with traceability from a result back to the control it tested [21].
Build on it first. AI-specific extensions are still forming: one proposed approach, a single 2026 preprint,
adds sixteen property extensions for lifecycle phase, enforcement semantics and risk traceability in a
three-layer policy/evidence/enforcement architecture that generates OSCAL assessment results
automatically and validates them against the NIST JSON schema [4]. Adopt the extensions if they fit,
but the native assessment models carry most of the load today. Store the evidence so an auditor's
question is answered by a query.

> **Example (illustrative)** An eval gate writes an OSCAL assessment result on every run; the auditor's
> request for "all robustness evidence in Q3" is a filter over the store, returned in minutes.

### Consequences
The audit becomes a query and evidence composes across tools and jurisdictions. The cost is adopting the
schema and instrumenting controls to emit it.

### Related patterns
Continuous Assurance Telemetry; Framework Crosswalk; Eval Gate in CI; Incident Pipeline.

**Maps to:** EU AI Act Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · Layer
05 Assurance & Continuous Compliance.

---

## Pattern: Agent Identity & Scoped Credentials

**Summary:** Give every agent its own identity, an owner, a bounded scope and an expiry, established
before it acts, so that its actions can be attributed, its access revoked precisely and its scope
contained. Identity is the precondition of accountability; scope is the precondition of containment.

### Objectives
Make every non-human actor governable by construction: attributable, scopable, revocable, expiring.

### Target users
AI governance engineer, security engineer, IAM/platform team.

### Impacted stakeholders
Model owners, security operations, auditors, affected third parties.

### Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

### Context
Agents that act under delegated authority (calling APIs, tools and other agents), where the default is
a shared service account or a static key.

### Problem
An agent on borrowed credentials cannot be attributed, contained or revoked. NIST's NCCoE frames the
open question directly: how do identification, authentication and authorization apply so each agent is
"known, trusted, and properly governed", with non-repudiation and tamper-proof logging [10].

### Solution
Issue each agent a distinct workload identity with a declared scope, an owner and an expiry, recorded in
the Agent Registry. Keep two questions separate. **Channel authentication** secures one hop: how a
client authenticates to a tool server; the MCP specification of 2026-07-28 tightened exactly this,
deprecating Dynamic Client Registration in favour of Client ID Metadata Documents and binding
credentials to their issuer [7]. That hardens the MCP connection but is not the agent's identity.
**Agent workload identity** is the durable, attributable identity the agent carries across every hop
and protocol, under which its actions are logged and its access revoked: the job of a
workload-identity system (SPIFFE/SPIRE) or a first-class agent identity from an enterprise provider
(for example Microsoft Entra Agent ID [8] or Okta Agent SSO [9]; illustrative), recorded in the
registry, not of the transport protocol. Secure the channel *and* issue the workload identity; scope
its credentials to the least privilege the agent's declared function needs.

> **Example (illustrative)** A data-analysis agent authenticates with an issuer-bound credential and a
> scope limited to read-only access to one dataset; its every action is logged under its own identity,
> and its credential expires with its registry entry.

### Consequences
Attribution, containment and precise revocation become possible, and the kill switch has something to
act on. The cost is IAM integration and managing non-human identities at scale.

### Related patterns
Agent Registry; Kill Switch / Circuit Breaker; Policy Card; Human-in-the-loop Gate.

**Maps to:** EU AI Act Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM ·
OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

---

## Pattern: Human-in-the-loop Gate

**Summary:** Require human approval at a defined, high-consequence decision point before an agent's
action takes effect, so that autonomy is bounded by a person exactly where the stakes justify the
latency. Oversight is a designed checkpoint, not an afterthought.

### Objectives
Insert meaningful human oversight where an action is irreversible or high-impact, and record the
decision as evidence.

### Target users
AI governance engineer, product owner, risk owner.

### Impacted stakeholders
Affected persons, users, model owners, regulators.

### Relevant principles
Start from a named failure mode or harm; register and bound every actor before it acts.

### Context
An agent whose actions include some that are irreversible or affect people's rights (a payment, a
denial, a publication) alongside many that are routine.

### Problem
Full autonomy over a high-consequence action removes the human oversight the law and the risk both
require; full manual review over every action destroys the value of the agent. Undifferentiated
oversight fails in both directions.

### Solution
Classify actions by consequence. For the high-consequence class, gate the action behind a human
approval step with enough context to decide, and block the action until approval. Log the approver, the
context and the decision as evidence. Keep the routine class autonomous under guardrails. This realises
the EU AI Act Art. 14 human-oversight requirement [19] at the point of action.

> **Example (illustrative)** An agent can draft and queue refunds autonomously, but any refund above a
> threshold is held for a named human approver, whose decision is logged against the transaction.

### Consequences
Oversight lands where it matters without throttling routine work, and the approval is auditable. The
cost is designing the consequence classification and the latency it adds to gated actions.

### Related patterns
Kill Switch / Circuit Breaker; Runtime Guardrail; Policy Card; Agent Identity & Scoped Credentials;
FRIA-as-Code.

**Maps to:** EU AI Act Art. 14 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic ASI02 · Layer 04
Runtime Controls & Observability.

---

## Pattern: Shadow-AI Discovery

**Summary:** Continuously discover AI systems and agents that are running but not registered, and
reconcile them against the registry, so the inventory reflects reality rather than only what teams
remembered to declare. You cannot govern what you cannot see.

### Objectives
Close the gap between the registry and production by finding unregistered models, agents and AI-enabled
tools, and bringing them under governance.

### Target users
AI governance engineer, security engineer, platform team.

### Impacted stakeholders
Model owners, security operations, auditors.

### Relevant principles
Register and bound every actor before it acts; make the governed path the easiest path.

### Context
An organisation where teams adopt AI tools and spin up agents faster than any central inventory can
track, and where, by one vendor's comparison of the category, much of the AI-governance platform
market "manages the program … without any runtime data path" [20].

### Problem
A registry fed only by voluntary declaration is always behind. Unregistered agents, the shadow fleet,
are exactly the layer a paper inventory cannot see, and roughly one in eight reported AI breaches now
involves an autonomous agent [16] (reported).

### Solution
Run discovery against the environments where AI appears (identity providers, cloud accounts, network
egress, code repositories, SaaS integrations) using discovery tooling (illustrative) to find models and
agents. Reconcile findings against the registry, open an entry for each unknown with an owner to claim
it, and escalate the unclaimed. Feed the result back into the Agent Registry's drift check.

> **Example (illustrative)** A weekly discovery sweep finds an agent calling an external API from a
> team's cloud account with no registry entry; it is auto-registered as unclaimed, its owner is
> notified, and its scope is frozen until claimed.

### Consequences
The inventory converges on reality and the blind spot shrinks. The cost is discovery integration and the
process to triage and claim what it finds.

### Related patterns
Agent Registry; Agent Identity & Scoped Credentials; Continuous Assurance Telemetry.

**Maps to:** EU AI Act Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP Agentic ASI10
· Layer 02 Inventory & Transparency.

---

## Pattern: Vendor / Model Due-Diligence Gate

**Summary:** Gate the procurement or integration of a third-party AI system (SaaS with an embedded
LLM, an API-only foundation model, a vendor's agent) on a structured due-diligence assessment, so a
model you do not own still enters through a control that records what you can and cannot verify about
it. When you do not own the model, this gate is what replaces the red-team you cannot run.

### Objectives
Bring bought and API-only AI under the same registry and assurance discipline as systems you build, and
make the limits of your verification explicit rather than assumed away.

### Target users
AI governance engineer, procurement, security engineer, DPO.

### Impacted stakeholders
Deployers, model providers, data subjects, auditors, regulators.

### Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

### Context
An organisation that consumes far more AI than it trains: SaaS features with an embedded LLM, hosted
foundation models reached only by API, agents shipped inside a vendor's product. The weights, training
data and internal guardrails belong to someone else.

### Problem
The parts of the stack that assume you own the model degrade when you do not. You cannot red-team
weights you cannot reach, so an eval gate (layer 03) can only test the vendor's system as a black box
at its boundary; runtime control (layer 04) narrows to the tool scopes, identity and traffic the
integration exposes, not the model's own behaviour. Left ungoverned, procured AI becomes the shadow
fleet with a contract: in production, unassessed, and outside the registry.

### Solution
Make due diligence a gate a procured or integrated AI system must pass before it reaches production,
and structure the assessment on a template rather than an ad-hoc questionnaire; the CSIRO Responsible
AI Pattern Catalogue's supplier-assessment fields are a usable starting point [1]. Assess, at minimum:
the provider's own evaluations and red-team evidence (what they will share, and its independence); the
model card, supplier documentation and any AIBOM you can obtain; the lawful basis and data flows,
including whether your inputs train their model; the tool scopes and identity you will grant the
vendor's agent; the provider's incident-reporting commitments; and the contractual right to audit and
to be notified of material change. Record the result as a registry entry with an owner and a scope,
and re-open the gate on renewal or on a material model change. Anchor the assessment in ISO/IEC 42001
Annex A.10 (third-party and customer relationships) [22], the EU AI Act's allocation of duties along
the value chain (provider obligations versus deployer obligations under Articles 25, 26 and 27 [23])
and, for general-purpose models, the transparency and documentation the GPAI Code of Practice expects
providers to supply [24]. Where you cannot verify a control, record that you cannot, and compensate by
bounding the integration: least-privilege scopes, boundary evals, and tighter runtime observation of
the traffic you do control.

> **Example (illustrative)** A team integrating an API-only foundation model cannot test its weights,
> so the gate captures the provider's published evaluations, restricts the model to a scoped service
> identity with no standing data access, adds a boundary eval on the team's own prompts, and files the
> whole assessment as the system's registry entry, flagged "provider-attested" where the team relied
> on the vendor's evidence rather than its own.

### Consequences
Procured AI is inventoried and bounded, and the reliance on provider-supplied evidence is explicit
rather than hidden. The cost is real: layers 03 and 04 give less assurance over a model you do not own,
and the gate depends on provider cooperation and contract terms you may not fully win.

### Related patterns
Agent Registry; AIBOM; Adversarial Red-Team Suite; Model Card as Control Evidence; Agent Identity &
Scoped Credentials; Shadow-AI Discovery.

**Maps to:** EU AI Act Art. 25 (value-chain responsibilities), Art. 26 (deployer duties), Art. 27
(FRIA), Art. 53 (GPAI documentation) · ISO/IEC 42001 Annex A.10 · GPAI Code of Practice · NIST AI RMF
(Map, Govern) · Layer 02 Inventory & Transparency / Layer 05 Assurance & Continuous Compliance.

---

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[5] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[6] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[7] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[8] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[9] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[12] EU AI Act Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). artificialintelligenceact.eu. Reg. (EU) 2024/1689. https://artificialintelligenceact.eu/article/73/ (verified: primary)
[13] EU AI Act Art. 27 (fundamental-rights impact assessment for high-risk AI systems; DPIA cross-reference). artificialintelligenceact.eu. Reg. (EU) 2024/1689. https://artificialintelligenceact.eu/article/27/ (verified: primary)
[14] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] Threat Report 2026 (~1 in 8 reported AI breaches involve autonomous agents). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: reported)
[17] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[18] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[19] EU AI Act Art. 14 (human oversight of high-risk AI systems). artificialintelligenceact.eu. Reg. (EU) 2024/1689. https://artificialintelligenceact.eu/article/14/ (verified: primary)
[20] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[21] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[22] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[23] EU AI Act Arts. 25 (value-chain responsibilities), 26 (deployer obligations), 27 (FRIA): allocation of duties between provider and deployer. AI Act (Reg. (EU) 2024/1689). 2024. https://artificialintelligenceact.eu/article/25/ (verified: primary)
[24] GPAI Code of Practice (published 10 Jul 2025; voluntary; transparency documentation providers supply to downstream deployers). European Commission / AI Act Explorer. 2025-07-10. https://artificialintelligenceact.eu/introduction-to-code-of-practice/ (verified: primary)
[25] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
