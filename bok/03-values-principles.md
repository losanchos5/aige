# 03. Values and principles

> The eight values and six principles of the Thesis, each expanded with what it means in practice
> and the anti-pattern it rejects.

The Thesis states eight values and six principles in one line each. This chapter expands them. The
two are deliberately different kinds of thing, and the difference is what keeps them from being the
same list told twice. A **value** is a preference — a trade-off, what we lean toward when we cannot
have both; it is stated as an affirmation, and naming what we build *toward* also names what we build
*away from*. A **principle** is a commitment to *act* — a rule of method, phrased as something we do,
that holds regardless of preference. So the values name the artefacts and outcomes we build toward;
the principles name how we work, and they carry no vocabulary borrowed from the values. Read the
values to know which way to lean; read the principles to know what to do on Monday.

Not all of the values are new to AI. Governance as code (1), machine-readable evidence (5) and
measured risk reduction (7) are inherited from GRC engineering, the parent discipline. Evals that fail
the build (2) and agent identity and scope (4) are what AI forces us to add — the model that must
be tested and the autonomous actor that must be bounded have no analogue in classic GRC.

---

## The eight values

Each value is stated as an affirmation — what we build toward, which by naming it also names what we
build away from. The values-and-principles form follows the GRC Engineering Manifesto that is this
book's precedent [1].

### 1. Governance is code, not a document

A policy in a PDF is a statement of intent that a human must read, remember and apply. A policy as
code is a control that executes: it evaluates a pull request, a deployment or a runtime call and
returns a decision. The document describes the rule; the code *is* the rule, versioned in a
repository, tested, and enforced without anyone remembering to. When the rule changes, you change one
artefact and every enforcement point updates. When an auditor asks what the policy was on a given
date, you show the commit.

This is not "delete all documents." A policy still needs a human-readable statement of why it exists.
The value is that the authoritative, enforced version is the executable one, and the prose is its
documentation — not the other way around.

> **In practice** A data-residency rule written as `OPA/Rego` blocks any deployment that would route
> inference outside the permitted region, in CI and at admission. The same rule, as a PDF, was
> "communicated" quarterly and violated monthly.
> **Anti-pattern** The "policy library" that is a folder of Word documents nobody can query, whose
> enforcement is an email and whose compliance is self-attested.

### 2. Evals fail builds; reviews only recommend

A review produces a recommendation; someone may act on it, later, or not. An eval produces a verdict
with consequences: the model or agent passed or failed a defined test, and a failure blocks the
release. In AI systems the most honest control is a test the system must pass, run automatically,
whose result changes what happens next. We prefer controls that bite.

A review still has its place — for questions no test can settle. But when a property *can* be tested
(a jailbreak resistance threshold, a PII-leakage bound, a tool-scope check), turning it into a review
instead of an eval gate is a choice to be able to recommend but not to stop.

> **In practice** A red-team eval suite (Inspect, Garak) runs in CI; if injection resistance drops
> below the agreed threshold, the pipeline fails and the release does not ship until it is fixed.
> **Anti-pattern** A "model risk review board" that meets monthly, writes findings rated
> low/medium/high, and has no mechanism to stop a launch already scheduled.

### 3. Evidence comes from runtime, not from a point-in-time attestation

An attestation says a control was in place when someone looked. Runtime evidence shows the control
working continuously, from the system itself. AI systems change between reviews — a model is
retrained, an agent gains a tool — so evidence gathered once decays immediately. We prefer evidence
that is emitted as the system runs, so "is the control working?" is answered by live telemetry, not by
a signature dated last quarter.

> **In practice** Guardrail decisions, eval results and policy verdicts stream into an assurance store
> with timestamps; the control's status is a live query, not an annual sign-off.
> **Anti-pattern** A SOC-style attestation binder assembled the week before an audit, describing
> controls as they were imagined to be, not as production actually behaved.

### 4. Every agent carries its own identity and scope

An agent acting on a shared service account or a static key is ungovernable: you cannot attribute its
actions, revoke its access precisely, or bound what it may do. We prefer every non-human actor to have
its own identity, an owner, and a scope of permitted actions — established *before* it is allowed to
act. Identity is the precondition of accountability; scope is the precondition of containment.

> **In practice** Each agent is issued a distinct workload identity, registered with an owner and a
> declared scope; a misbehaving agent is traced to its identity and its access revoked without
> touching the others.
> **Anti-pattern** A fleet of agents sharing one API key and one privileged service account, where an
> incident means rotating one secret and breaking everything, and attribution is impossible.

### 5. Evidence is machine-readable or it is not evidence

Evidence a human must produce, format and file by hand does not scale and cannot be verified at speed.
Machine-readable evidence — `OSCAL`, structured eval results, signed logs — can be queried, diffed,
aggregated and checked automatically. We prefer evidence a machine can read, because the audit then
becomes a query and the same evidence feeds continuous assurance rather than a one-off binder.

> **In practice** Control results are emitted as `OSCAL` component and assessment artefacts; an
> auditor's question is answered by running a query against the evidence store.
> **Anti-pattern** A shared drive of screenshots and exported spreadsheets, re-collected from scratch
> for every audit, unverifiable and out of date the moment it is saved.

### 6. Tooling must be inspectable and composable

The point is not who built the tool or whether it is open source; it is whether you can see inside it.
You cannot trust a verdict you cannot trace. Inspectable tooling lets you follow a decision to the
rule that produced it, the input it saw and the evidence it emitted; composable tooling lets you wire
that decision into your own pipeline rather than export into someone else's. We prefer tooling whose
reasoning and data path we can open — bought or built — because governance you cannot see inside is a
control you cannot trust. Much of the AI-governance platform category stops at the program layer,
"managing inventories, assessments and framework mappings without any runtime data path" [3]; the
objection is not that it is commercial but that its verdict cannot be audited.

This is a lean, not an absolute. Closed and commercial tools have a place, including capable
platforms. But the default is tooling the team can inspect and compose, over a black box the team must
take on faith.

> **In practice** The eval harness, policy library and registry expose how a verdict is reached — the
> rule, the input and the emitted evidence — and compose into the pipeline the team already runs,
> whether the components are open-source or a platform with an open data path.
> **Anti-pattern** A six-figure governance platform whose "compliance score" cannot be traced to a
> single running control, and whose data path stops at the spreadsheet import.

### 7. Success is measured in realised risk reduction, not framework coverage

Mapping every control to NIST AI RMF and ISO 42001 proves you have read the frameworks; it does not
prove any risk fell. We prefer to measure the thing itself: did the rate of the failure mode drop, did
the blast radius shrink, did the incident get caught earlier? Coverage is an input; realised risk
reduction is the outcome. A green mapping matrix over a broken control is theatre with extra steps [2].

> **In practice** Each control declares the failure mode it addresses and a metric for it (injection
> success rate, time-to-detect, unauthorised tool-calls blocked); the control is judged by the metric
> moving, not by the framework cell turning green.
> **Anti-pattern** A 300-row traceability matrix mapping controls to five frameworks, presented as
> maturity, with no measurement of whether any of the mapped controls actually reduces risk.

### 8. Governance is owned with engineering, not enforced from outside

Governance that sits apart and grants or denies passage is a bottleneck engineers route around.
Governance owned jointly with engineering — built into the paved path, adopted because it is the
easiest way to ship — becomes part of how things are made. We prefer shared ownership: the governance
function builds the tooling, engineering builds on it, and the gate is a stage in a pipeline both own,
not a meeting one side dreads.

> **In practice** The eval gate and policy checks ship as part of the standard pipeline template;
> engineers adopt them because the paved path is also the fastest path, and governance co-maintains
> them.
> **Anti-pattern** A governance team that reviews and sign-offs releases from the outside, measured by
> how many it stops, while engineering builds a shadow process to avoid it.

**We still use the practices each value builds away from; we build toward the affirmation.**

---

## The six principles

### Build the control at the earliest point it can block

Put every control where it can still stop the thing going wrong, and no later. The earliest place a
risk can be caught is the cheapest to fix and the strongest place to enforce — catching it in the
repository beats catching it in production, which beats explaining it to a regulator. So a control is
sited at the first gate that can refuse the change: a policy in CI, an eval before deploy, an identity
check at admission, a guardrail at the point of action. The commitment is about *placement*: whatever
the control, it belongs at the earliest enforceable point, not bolted on at the end.

> **In practice** A new agent cannot be deployed until it has registered an owner and a scope and
> passed its eval gate; the pipeline enforces this at the earliest gate that can refuse it, not a
> person at the end.
> **Anti-pattern** A pre-launch "governance review" that happens after the system is built, changes
> nothing about how it was built, and can only delay or wave through.

### Give every control teeth

A control must be able to change what happens next — block a merge, fail a deploy, revoke access.
Anything that can only inform a committee is a *signal*, and we say so rather than dress it up as a
control. This is the commitment that turns an eval from research into a gate, a policy from a PDF into
a check, a threshold from a dashboard number into a release blocker. When a property can be tested,
turning it into a review instead of a gate is a choice to be able to recommend but not to stop, and we
make that choice consciously or not at all.

The teeth are not the whole animal. A gate that can fail the build is necessary and not sufficient:
an eval is point-in-time and sampling-bound, it can be gamed by tuning the model to the suite or the
threshold to the model, and it catches regressions against known cases, not the novel attack the suite
never imagined. So a control with teeth carries obligations of its own — its coverage measured, its
cases maintained adversarially, its thresholds traced to named failure modes — and a passing gate
*obliges* the runtime monitoring of layer 04, it does not replace it. A green gate treated as proof of
safety is framework theatre with a faster pipeline.

> **In practice** Capability and adversarial evals are versioned alongside the model; the deploy
> depends on the eval job passing, its coverage is tracked as its own metric, and a runtime guardrail
> carries the same threshold into production against the inputs no eval sampled.
> **Anti-pattern** A one-off model evaluation run before launch, its results pasted into a slide,
> never re-run when the model or its prompts change — or a gate whose threshold is quietly lowered
> until the build goes green.

### Register and bound every actor before it acts

Nothing — human or non-human — gets to act until it has an owner, a declared scope and a way to be
stopped. Autonomy on shared credentials is ungovernable by construction: you cannot attribute, contain
or revoke what you cannot trace to an actor. So registration is a precondition, not a follow-up: every
actor is enrolled, scoped and given a kill switch *before* it does anything on its own. Autonomy is
earned by being governable, not granted by default.

> **In practice** The agent registry is the gate: an agent with no owner, no scope or no kill switch
> is denied a workload identity and cannot reach production.
> **Anti-pattern** Agents spun up ad hoc on a shared key, discovered only after one of them takes an
> action no one can explain or undo.

### Instrument the build to produce its own proof

Wire each control to emit its own record as it runs, so assurance falls out of the system instead of
being assembled by hand before an audit. If demonstrating a control needs a screenshot, we have not
finished building it. The commitment is to instrumentation: every gate, guardrail and check writes a
structured, signed record as it fires, so the audit is a query and the same records drive continuous
assurance and incident response.

> **In practice** Every gate and guardrail writes a structured, signed record; the audit trail builds
> itself, and the evidence store answers both the auditor and the on-call engineer.
> **Anti-pattern** An evidence-collection sprint before each audit, re-creating after the fact a
> record the systems never actually produced.

### Start from a named failure mode or a named harm

Design each control against a specific way the system fails or a specific harm it can do to a person,
and start there — not from a framework checklist. Threat models (prompt injection, tool misuse, agent
identity abuse, data exfiltration) and fundamental-rights impact assessments are the inputs to design,
not paperwork produced afterward. If we cannot name the risk a control answers, we do not build it.

> **In practice** The agent's design starts from its OWASP Agentic threat model [4] and its FRIA; the
> controls that ship are exactly the ones those two documents demanded, and they map back to them.
> **Anti-pattern** A control catalogue assembled from a framework checklist, addressing risks the
> system does not have while missing the injection path an attacker actually uses.

### Make the governed path the easiest path

Ship governance as tooling, templates and paved paths engineers adopt without asking permission — a
policy library, a registry with an API, a gate they can run locally before they push — and measure
adoption. The people governed are our users; the paved path has to be the fastest path or it will be
routed around. If using the governance is harder than avoiding it, the governance is designed wrong,
and we fix the product, not the people.

> **In practice** An engineer scaffolds a new AI service from a template that already includes the
> registry hook, the policy checks and the eval gate; compliance is the default, not a request.
> **Anti-pattern** A governance intranet of forms and ticket queues, where doing the right thing takes
> a week and a meeting, so teams quietly do the fast thing instead.

**Maps to:** the values and principles are realised through the five-layer stack (chapter 04) and the
pattern catalogue (chapter 05); the failure modes they target are OWASP Top 10 for Agentic
Applications; the assurance they demand maps to ISO/IEC 42001, NIST AI RMF and EU AI Act Arts. 9, 15,
55 and 72. Mappings are illustrative, not a claim of conformity.

## Sources

[1] GRC Engineering Manifesto (values and principles precedent). grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] "Best AI Governance Platforms 2026" (runtime data path critique). Kosmoy. 2026. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[4] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
