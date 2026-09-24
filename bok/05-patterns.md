# 05. Patterns

> A catalogue of reusable AI governance engineering patterns, each named to a layer of the stack, in
> the CSIRO Responsible AI Pattern Catalogue structure.

This chapter is the catalogue. Each pattern is a reusable solution to a problem that recurs when you
engineer the governance of AI systems. The structure follows the CSIRO Responsible AI Pattern
Catalogue, which applies software-engineering design patterns to responsible AI across governance,
process and product levels [1]. We keep its fields (summary, objectives, target users, impacted
stakeholders, relevant principles, context, problem, solution, consequences, related patterns) and add
a **Maps to** line naming the standards, articles and stack layer (1–5) each pattern serves.

Every pattern names one of the five layers ([chapter 04](/bok/the-stack)) so the catalogue and the
stack stay consistent, and realises one or more of the six principles
([chapter 03](/bok/values-and-principles)): *build the control at the earliest point it can block · give
every control teeth · register and bound every actor before it acts · instrument the build to produce
its own proof · start from a named failure mode or harm · make the governed path the easiest path*.
Each **Maps to** line draws its threat IDs from the OWASP Top 10 for Agentic Applications 2026 [2] and
its function labels from the NIST AI RMF [3]. Each pattern carries a short example labelled
`(illustrative)`: a plausible, de-identified sketch, not a claim about any named system. Mappings to
the EU AI Act are illustrative, not a claim of conformity, and as of 2026-09-24 no harmonised standard
under the Act is referenced in the Official Journal [4].

On the website each pattern has its own page, listed by layer at [/patterns](/patterns), with the
full text, its diagram and its own numbered sources; this chapter keeps the template, the pattern map
and, under each pattern's heading, a short summary that links to the full pattern. The printed edition
carries every pattern in full in this chapter.

## The pattern template

Every pattern page uses the same fields, in this order, and ends with its own **Sources** list.

| Field | What it answers |
|---|---|
| Summary | What the pattern is and when it applies. |
| Objectives | The governance outcome the pattern achieves. |
| Target users | Who implements it. |
| Impacted stakeholders | Who is affected by it. |
| Relevant principles | Which of the six principles it realises. |
| Context | The situation in which the problem arises. |
| Problem | The forces at play, and the failure mode if the pattern is not applied. |
| Solution | How to build it: the artefacts, where they sit in the pipeline, what runs when. |
| Consequences | Benefits and trade-offs: cost, latency, false positives, maintenance. |
| Related patterns | The patterns it depends on or feeds. |
| Maps to | The standards, articles and stack layer the pattern serves. |

A pattern is not a policy. Each one names the artefact an engineer ships, the point in the lifecycle
where it runs and the evidence it leaves behind, so the pattern can fail a build or block an action
rather than describe an intention.

## Pattern: Policy Card

Express a governance rule as a machine-readable card that travels with the model or agent, instead of
prose a human must remember to apply. The same card is evaluated pre-merge, at deploy and at the point
of action, and every evaluation emits a verdict, so a rule change is a reviewable diff and the
crosswalk can be generated from the cards.

Layer 01 Govern-as-Code · [Read the Policy Card pattern](/patterns/policy-card)

## Pattern: Eval Gate in CI

Wire a versioned eval suite into CI so a model or agent must clear a documented threshold, traced to a
named failure mode or obligation, before it ships. The eval run is the control and its structured
result is the evidence; a failing eval blocks the build instead of filing a finding.

Layer 03 Evals & Red Teaming as Evidence · [Read the Eval Gate in CI pattern](/patterns/eval-gate-in-ci)

## Pattern: Adversarial Red-Team Suite

Keep a versioned adversarial suite, built from a threat taxonomy rather than intuition, and run it in
CI or on a schedule against the registered version. Every finding is fixed or accepted on the record,
filed as evidence and fed back as a regression test, so a closed attack stays closed.

Layer 03 Evals & Red Teaming as Evidence ·
[Read the Adversarial Red-Team Suite pattern](/patterns/adversarial-red-team-suite)

## Pattern: Agent Registry

Keep a runtime-aware inventory of every model, service and agent, each entry carrying an owner, a
scope and an expiry, written by the deploy pipeline rather than typed by hand. Registration becomes a
precondition of production, and the registry is the object policies evaluate and runtime controls
attach to.

Layer 02 Inventory & Transparency · [Read the Agent Registry pattern](/patterns/agent-registry)

## Pattern: AIBOM

Emit an AI bill of materials at build, in a standard format such as CycloneDX ML-BOM or the SPDX 3.0
AI profile, recording models, datasets, weights and their provenance and licences. Stored with the
registry entry and regenerated on every build, it turns supply-chain and transparency questions into
queries.

Layer 02 Inventory & Transparency · [Read the AIBOM pattern](/patterns/aibom)

## Pattern: Model Card as Control Evidence

Populate the model card and the data card from the pipeline (eval results, the datasets in the AIBOM,
known limitations, the owner) and regenerate them on each significant change. A card rebuilt from what
production produced is both documentation and control evidence; a card written once at launch decays
into fiction.

Layer 02 Inventory & Transparency ·
[Read the Model Card as Control Evidence pattern](/patterns/model-card-as-control-evidence)

## Pattern: Continuous Assurance Telemetry

Have every control write a timestamped, structured evidence record to one assurance store, on one
schema keyed on the registry id. The status of a control becomes a live query over what the system
emitted, not an attestation that it existed when someone looked.

Layer 05 Assurance & Continuous Compliance ·
[Read the Continuous Assurance Telemetry pattern](/patterns/continuous-assurance-telemetry)

## Pattern: Runtime Guardrail

Screen inputs and outputs on the live request path with guardrails that enforce the same Policy Card
CI evaluated, and emit a decision event on every call. The guardrail decides one call at a time; on a
defined breach it signals the circuit breaker, which withdraws the agent's autonomy wholesale.

Layer 04 Runtime Controls & Observability ·
[Read the Runtime Guardrail pattern](/patterns/runtime-guardrail)

## Pattern: Kill Switch / Circuit Breaker

Bind each agent to its own identity and put a circuit breaker at the tool-call boundary that trips on
a threshold breach, an anomaly or a manual pull. Revocation hits one agent's scope while the fleet
keeps running, and the switch is drilled on a schedule, because an untested kill switch is not a
control.

Layer 04 Runtime Controls & Observability ·
[Read the Kill Switch / Circuit Breaker pattern](/patterns/kill-switch-circuit-breaker)

## Pattern: Incident Pipeline

Connect runtime detection to a triage workflow that classifies severity and, on a reportable event,
drafts the report and starts the statutory clock. For high-risk systems it encodes the EU AI Act
Article 73 reporting timelines and the Article 72 post-market monitoring feed [5], and it holds the
incident record as machine-readable evidence.

Layer 05 Assurance & Continuous Compliance ·
[Read the Incident Pipeline pattern](/patterns/incident-pipeline)

## Pattern: FRIA-as-Code

Template the fundamental-rights impact assessment as structured data, link each mitigation to the
control that implements it, and cross-reference the DPIA so shared elements are written once. The
assessment is stored with the registry entry and reopened when the system changes significantly.

Layer 01 Govern-as-Code / Layer 02 Inventory & Transparency ·
[Read the FRIA-as-Code pattern](/patterns/fria-as-code)

## Pattern: Framework Crosswalk

Generate the mapping from controls to framework clauses from the controls themselves, and use it to
find gaps and reuse controls. Every cell must resolve to a running control and its evidence: a mapping
cell with nothing behind it is flagged, not counted, because coverage is not control.

Layer 01 Govern-as-Code / Layer 05 Assurance & Continuous Compliance ·
[Read the Framework Crosswalk pattern](/patterns/framework-crosswalk)

## Pattern: Machine-Readable Evidence (OSCAL)

Emit control results as OSCAL component-definition and assessment-results artefacts, building on the
native control, implementation and assessment layers before any AI-specific extension. Evidence
becomes queryable, diffable and reusable across audits, and the screenshot stops being an evidence
artefact.

Layer 05 Assurance & Continuous Compliance ·
[Read the Machine-Readable Evidence (OSCAL) pattern](/patterns/machine-readable-evidence-oscal)

## Pattern: Agent Identity & Scoped Credentials

Issue each agent a distinct workload identity with a declared scope, an owner and an expiry, recorded
in the Agent Registry and established before it acts. Securing the channel to a tool server is
necessary but is not the agent's identity; the identity is what makes its actions attributable and its
access revocable.

Layer 04 Runtime Controls & Observability ·
[Read the Agent Identity & Scoped Credentials pattern](/patterns/agent-identity-scoped-credentials)

## Pattern: Human-in-the-loop Gate

Classify an agent's actions by consequence and hold the high-consequence class behind a named human
approver with enough context to decide, while the routine class stays autonomous under guardrails.
The approver, the context and the decision are logged as evidence of oversight at the point of action.

Layer 04 Runtime Controls & Observability ·
[Read the Human-in-the-loop Gate pattern](/patterns/human-in-the-loop-gate)

## Pattern: Shadow-AI Discovery

Scan the places AI appears (identity providers, cloud accounts, network egress, code repositories,
SaaS integrations) for models and agents that have no registry entry. Each unknown is registered as
unclaimed and given an owner to claim it, or escalated, so the inventory converges on what is actually
running.

Layer 02 Inventory & Transparency ·
[Read the Shadow-AI Discovery pattern](/patterns/shadow-ai-discovery)

## Pattern: Vendor / Model Due-Diligence Gate

Gate bought and API-only AI on a structured due-diligence assessment before it reaches production: the
provider's evaluations and documentation, data flows, the scopes you grant, incident-reporting
commitments and audit rights. Where you cannot verify a control, the record says so and the
integration is bounded instead.

Layer 02 Inventory & Transparency / Layer 05 Assurance & Continuous Compliance ·
[Read the Vendor / Model Due-Diligence Gate pattern](/patterns/vendor-model-due-diligence-gate)

## Pattern: Decision Notice & Contest Path

When an AI system makes or shapes a decision about a person, send a notice generated from the
decision record that gives the principal reasons and says how to contest, and route each contest to
a reviewer with the authority and the information to change the outcome. The notice, the contest and
the review outcome are records, so the right to contest is evidenced decision by decision.

Layer 04 Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance ·
[Read the Decision Notice & Contest Path pattern](/patterns/decision-notice-contest-path)

## Pattern: Rights Requests Against Models

Route each data-subject request to every place the person's data sits in an AI system, from source
systems and retrieval indexes to logs, eval sets and, where the model is not anonymous, the weights.
Each location has a pre-agreed response, from deletion to scheduled retraining, and the request closes
with a fulfilment record that dates the remaining gap.

Layer 02 Inventory & Transparency / Layer 05 Assurance & Continuous Compliance ·
[Read the Rights Requests Against Models pattern](/patterns/rights-requests-against-models)

## Pattern: Sanctioned AI Gateway

Put approved AI tools and model APIs behind single sign-on and one gateway that applies the
acceptable-use policy as code: data-class rules, redaction or blocking, a decision event per call and
access conditional on a current attestation. The sanctioned path is built to be the easiest one, and
discovery finds what goes around it.

Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency ·
[Read the Sanctioned AI Gateway pattern](/patterns/sanctioned-ai-gateway)

## Pattern: Staged Rollout with Rollback Criteria

Take every model, prompt, corpus or vendor-version change to production through shadow, pilot and
canary stages, with rollback criteria registered before each stage starts and evaluated by the
pipeline. Versions are pinned in the registry and the path back is tested before anyone depends on it.

Layer 04 Runtime Controls & Observability ·
[Read the Staged Rollout with Rollback Criteria pattern](/patterns/staged-rollout-rollback-criteria)

## Pattern: Drift & Fairness Monitor

Watch a deployed system for input, label, concept, pipeline, vendor-model and usage drift, and for
quality and fairness by group. Every signal has a threshold, an owner and a pre-agreed consequence,
from an issue to a tripped breaker, and every check writes an evidence record.

Layer 04 Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance ·
[Read the Drift & Fairness Monitor pattern](/patterns/drift-fairness-monitor)

## Pattern: Downstream Use Register

Write a system's intended and prohibited uses as a Policy Card, register every consumer of its outputs
against its registry entry with the re-test that cleared that use, and stamp provenance and caveats on
the outputs. Secondary use becomes a decision instead of a discovery, and a change or retirement can
reach everyone it affects.

Layer 02 Inventory & Transparency / Layer 01 Govern-as-Code ·
[Read the Downstream Use Register pattern](/patterns/downstream-use-register)

## Pattern: Disclosure & Notification Pipeline

Generate disclosures (AI-interaction notices, labels, the transparency page and system card, notices
to workers and affected people) and triggered notifications (to providers, authorities, customers and
the public) from the registry and versioned templates, each on its clock. Every notice sent is
recorded with its audience, template version and timestamp.

Layer 05 Assurance & Continuous Compliance / Layer 02 Inventory & Transparency ·
[Read the Disclosure & Notification Pipeline pattern](/patterns/disclosure-notification-pipeline)

## Pattern: Deactivation, Localisation & Retirement Runbook

Keep a drilled runbook per system for degrading it, switching it off by jurisdiction and retiring it:
named threshold and legal triggers, a decision owner, evidence frozen first, graduated modes short of
shutdown, regional switches and retirement steps that end in a retired registry entry and no running
copy.

Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency ·
[Read the Deactivation, Localisation & Retirement Runbook pattern](/patterns/deactivation-localisation-retirement-runbook)

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; prEN 18286 entered public enquiry on 30 Oct 2025; page last updated 2026-08-03). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
