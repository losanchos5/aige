---
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "The plumbing that detects, triages and reports serious AI incidents within the legal window, with timelines and templates encoded, not remembered."
---

# Pattern: Incident Pipeline

**Summary:** Build the plumbing to detect, triage and report serious AI incidents on the clock, with
reporting timelines and templates encoded rather than remembered. For high-risk systems this includes EU
AI Act Article 73 serious-incident reporting; for GPAI models it includes the systemic-incident
reporting the Code of Practice expects [1]. The same pipeline serves the deployer of a system someone
else built: it tells the provider, suspends use when the system presents a risk, and holds the
reporting clock when the provider cannot be reached.

## Objectives
Turn a runtime signal into a reported obligation within the legal window, and produce the incident
record as structured evidence. Keep issues and incidents apart, rank severity on a written scale,
find the cause without blame, and feed every closed incident back into the controls.

## Target users
AI governance engineer, security/incident responder, legal/compliance, DPO, the provider liaison of a
deployer.

## Impacted stakeholders
Regulators, affected persons, deployers, providers, model owners.

## Relevant principles
Instrument the build to produce its own proof; start from a named failure mode or harm.

## Context
A high-risk or GPAI system in production, subject to serious-incident reporting duties, where detection
lives in engineering and reporting lives in legal, with no wire between them. Most organisations meet
AI incidents as deployers of a procured system, so the pipeline has to work for a model they do not
own as well as for one they built.

## Problem
When an incident is detected, the clock starts. If detection, triage and reporting are disconnected
manual steps, the deadline is missed and the evidence of what happened is reconstructed after the fact.
A single "priority" field read one way by engineering and another by legal hides the reportability
decision, and a post-mortem that hunts for someone to blame teaches people to report less.

## Solution
Connect runtime detection (from observability and guardrails) to a triage workflow that classifies
severity and, on a reportable event, drafts the report against the required template and starts the
statutory timer. Encode the EU AI Act Art. 73 timelines and the Art. 72 post-market monitoring feed
[2]; hold the incident record as machine-readable evidence. The five steps below are the parts that
fail most often in practice; [chapter 17](/bok/incidents) treats each in depth.

> **Example (illustrative)** A guardrail flags a data-exfiltration attempt via an agent tool; the
> pipeline classifies it, opens an incident with the Art. 73 timer running, and pre-fills the report
> from the trace and registry entry.

### Issue or incident: two queues, one record type

An **issue** is a defect or control weakness with no event behind it: an eval that regressed in
staging, a drift alert, a model card that no longer matches the deployed version. It goes to an issue
log with an owner and a due date, and in ISO/IEC 42001 terms most issues are nonconformities handled
under clause 10.2 [3]. An **incident** is an event in which the system led to harm; a **hazard** (or
near miss) is one that could plausibly have led to harm and did not [4]. A **serious incident** under
`Art. 3(49)` is the top of that ladder: death or serious harm to health, serious and irreversible
disruption of critical infrastructure, an infringement of obligations protecting fundamental rights,
or serious harm to property or the environment [2]. Keep severity (an internal judgement about harm)
and reportability (a test run once per regime) in separate fields, each set by a named person with a
timestamp. The full definitions are in
[chapter 17](/bok/incidents#incident-hazard-issue-and-serious-incident).

### A severity scale mapped to the Art. 73 classes

Write the scale as policy and evaluate it as code when an incident opens, so the first
classification and the clocks it starts are reproducible. The levels below are illustrative; what
matters is that each names a harm test and the legal class it can trigger.

| Level | Harm test | `Art. 73` class it can trigger [2] | Default response |
|---|---|---|---|
| **SEV-1** | Death; serious and irreversible disruption of critical infrastructure; widespread infringement | `Art. 73(4)` death: no later than 10 days; `Art. 73(3)`: no later than 2 days | Contain first; legal and DPO on the bridge |
| **SEV-2** | Infringement of fundamental-rights obligations; serious harm to property or the environment | `Art. 73(2)`: no later than 15 days | Same working day; reportability assessed per regime |
| **SEV-3** | Realised harm below the serious thresholds | None on its own; check GDPR and sector regimes | Contain the same day; review within five working days |
| **SEV-4** | Near miss: a path to harm was interrupted | None | Weekly review; regression eval added |
| **Issue** | Defect or weakness, no event | None | Issue log with owner and due date |

Classify up and downgrade with evidence: the deadlines run from awareness, and a reasonable
likelihood of a causal link is enough to start them [2]. One event can start several clocks. A
personal data breach inside an AI incident adds the GDPR notification to the supervisory authority,
within 72 hours where feasible [5], so the record carries one reportability flag per regime (see
[the overlapping clocks](/bok/incidents#the-overlapping-clocks)).

### The record: one schema, many reports

Hold each event as an incident record that validates against
[`incident-record.v1.json`](/schemas/incident-record.v1.json) (a fillable
[Markdown template](/templates/incident-record.md) sits beside it). The schema's `severity` field
takes the OECD values (hazard, serious hazard, incident, serious incident, disaster) [4]; keep the
internal SEV level beside it. The `reporting` block records when the organisation became aware and
one entry per regime assessed, so every clock is a query, not a memory; `containment` records whether
the kill switch was used; `root_cause_analysis` and `actions_taken` close the loop. Regulator-facing
reports are rendered from the record, never retyped.

### Root cause, CAPA and blameless review

Run the review on a trigger set in advance (every SEV-1 and SEV-2, a sample of the rest) and write it
blameless: the question is which conditions let a reasonable person act as they did, not who erred
[6]. Name the method (five whys, fault tree, timeline review) and a cause category in the record.
The output is **CAPA** (corrective and preventive action): the corrective action fixes this instance,
the preventive action stops the class of failure recurring anywhere in the fleet. Every closed
incident leaves a regression eval in the [Eval Gate](/patterns/eval-gate-in-ci), a risk-register
change and an evidence record that the fix was verified, as
[chapter 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) sets out.

### Tabletop drills

An untested playbook is a claim, not a control. Rehearse on a schedule, rotating the failure modes (an
indirect prompt injection that exfiltrates data, drift into discriminatory outcomes, a vendor that
silently swaps the model behind an API, an agent loop that burns budget), and time the steps that
matter: to classify, to contain, to a draft report for each clock. The drill produces the same
records a real incident would, tagged as a drill, so "can you report on time?" is answered by a query
over drill results ([playbooks, RACI and drills](/bok/incidents#playbooks-raci-and-drills)).

### The deployer side: inform the provider, suspend use

A deployer of a high-risk system has three duties under `Art. 26(5)` [2]. It monitors the system on
the basis of the instructions for use and informs the provider where relevant. Where it has reason to
consider that use as instructed may present a risk, it informs the provider or distributor and the
market-surveillance authority without undue delay and suspends use. Where it identifies a serious
incident, it immediately informs the provider first, then the importer or distributor and the
authority; if it cannot reach the provider, `Art. 73` applies to the deployer. Engineer each duty:

- **A provider channel on the registry entry**, with the contractual notification terms the
  [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) negotiated, tested in
  drills.
- **A suspension path for a system you do not own**: a feature flag or traffic switch to a human or
  legacy path, wired to the [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)
  and timed in drills.
- **A provider-facing export of the record** with the timestamp of each notification, and a fallback
  clock that starts the `Art. 73` timers on the deployer's own record when the provider is silent.
- **Log retention** under the deployer's control for at least six months (`Art. 26(6)`), longer while
  an incident is open [2].

## Consequences
Reporting happens on time and the record is audit-ready. Severity and reportability stay separate,
reviews teach instead of blame, and each closed incident hardens the controls through CAPA. The cost
is cross-functional integration, drills that take people off other work, contractual notification
terms that must be won from providers, and keeping the severity criteria and templates current with
the law.

## Related patterns
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Maps to:** EU AI Act Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Manage) · Layer
05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [7]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 (serious incident reporting for GPAI models with systemic risk). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act): Art. 3(49) serious incident; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 72 post-market monitoring; Art. 73 reporting of serious incidents (73(2) no later than 15 days, 73(3) no later than 2 days, 73(4) no later than 10 days). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; AI incident and AI hazard; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority within 72 hours where feasible). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[7] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
