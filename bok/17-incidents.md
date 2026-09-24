# 17. Incidents, issues and root causes

> AI incident management turns a runtime signal into an event that is classified, contained,
> reported on every clock that applies and explained, with its cause fed back into the controls.

This chapter extends two things the book already has. The
[**Incident Pipeline**](/bok/patterns#pattern-incident-pipeline) pattern (chapter 05) wires detection
to a report with the statutory timer running; the Article 73 clock table in the
[regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus) (chapter 08) says how long that timer
is. Neither says what counts as an incident below the serious threshold, how to rank severity, who
pulls which lever, how to find the cause, or what to do when one event starts four clocks at once.

One contrast first. **Security incident response**, the sibling discipline's home ground, handles
compromise: an attacker, a vulnerability, a breach. AI incident management inherits its lifecycle
and many of its tools, but the harm set is wider (discrimination, unsafe advice, rights
infringements, misinformation acted upon) and the failure is often behaviour rather than compromise:
a model that drifts, an agent that uses a permitted tool in a harmful way. Nothing was breached, and
people were still hurt. The deliverable is a governed event with an evidence trail, not only a
restored service.

## Incident, hazard, issue and serious incident

Four words decide whether a clock starts, so define them before anything else.

The OECD's definitions are the most widely shared starting point. An **AI incident** is an event,
circumstance or series of events where the development, use or malfunction of one or more AI systems
directly or indirectly leads to harm: injury or harm to the health of people, disruption of critical
infrastructure, violations of human rights or of legal obligations protecting fundamental, labour and
intellectual property rights, or harm to property, communities or the environment. An **AI hazard**
is the same kind of event where the AI system *could plausibly lead* to such an incident [1]. The
OECD paper also defines graded terms (serious AI incident, AI disaster, serious AI hazard), and its
common reporting framework uses that ladder as the values of its severity field [1][2].

The EU AI Act defines only the top of the ladder. A **serious incident** under `Art. 3(49)` is an
incident or malfunctioning of an AI system that directly or indirectly leads to one of four
outcomes: (a) the death of a person or serious harm to a person's health; (b) a serious and
irreversible disruption of the management or operation of critical infrastructure; (c) the
infringement of obligations under Union law intended to protect fundamental rights; or (d) serious
harm to property or the environment [3]. A separate defined term, **widespread infringement**
(`Art. 3(61)`), covers acts contrary to Union law that harm the collective interests of individuals
across several Member States; it shortens the reporting deadline, as the clocks section shows [3].

Two more terms are house definitions, and the book uses them consistently:

- An **issue** is a defect, deviation or control weakness that has not produced an event: an eval
  that regressed below its threshold in staging, a drift alert, a model card that no longer matches
  the deployed version, a guardrail whose false-positive rate has doubled. An issue is tracked to
  closure with an owner and a due date. In ISO/IEC 42001 terms most issues are nonconformities
  handled under clause 10.2 [4].
- A **near miss** is a hazard that a control (or luck) interrupted: the guardrail blocked the
  exfiltration attempt, the human reviewer caught the invented dosage. No harm occurred, but the path
  to harm was real. The GPAI Code of Practice asks providers to report "individual or aggregate data
  on near misses" connected to a serious incident, which tells you near misses are evidence, not
  noise [5].

| Term | Harm realised? | Starts a legal clock? | Where it lives | Example |
|---|---|---|---|---|
| **Issue** | No event | No | Issue log (backlog with owner, due date) | Injection eval drops from 0.98 to 0.93 in staging |
| **Near miss / AI hazard** | No, but plausible | No, but may be data inside a GPAI report | Incident record, severity SEV-4 | Guardrail blocks an agent's attempt to send order data to an external URL |
| **AI incident** | Yes | Only if a regime's trigger is met | Incident record, SEV-3 or above | Assistant quotes a wrong refund policy to 40 customers |
| **Serious incident** (`Art. 3(49)`) | Yes, at one of four legal thresholds | Yes, for high-risk providers and GPAI systemic-risk providers | Incident record, SEV-1 or SEV-2, with clocks | Credit model's drift produces discriminatory refusals |

The distinction that matters most in practice is between *severity* and *reportability*. Severity is
a judgement about harm on your internal scale. Reportability is a separate test, run once per
regime, against that regime's trigger. A moderate incident can still be notifiable (a small personal
data breach under GDPR); a severe one can fall outside every regime's scope (a non-high-risk system
with no personal data involved). Keep the two decisions in separate fields, made by named people,
with timestamps.

> **In practice (illustrative)**
> In a large telco, the first useful change to the incident process was not a new tool but a new
> field. Tickets had one "priority" value that engineering set for urgency and legal read as
> reportability, and the two readings disagreed silently. Splitting it into `severity` (set by the
> on-call engineer from a harm table) and one `reportable_<regime>` flag per applicable regime (set
> by the privacy and legal owners, each with a timestamp and a rationale) made every decision
> reviewable afterwards. The first review found tickets from the prior quarter that should have been
> assessed for GDPR notification and never were.

## A severity scale mapped to the clocks

A severity scale is a policy, so write it as one. The scale below has four incident levels and one
level for issues. It is illustrative; what matters is that each level names a harm test, maps to the
legal classes it can trigger and carries a default response.

| Level | Harm test | AI Act class it can trigger | OECD severity value [2] | Default response |
|---|---|---|---|---|
| **SEV-1 Critical** | Death; serious harm to health; serious and irreversible disruption of critical infrastructure; widespread infringement | `Art. 73(4)` death: 10 days; `Art. 73(3)`: 2 days | Serious incident; disaster | Incident commander within 15 minutes; contain first; legal and DPO on the bridge |
| **SEV-2 Major** | Infringement of fundamental-rights obligations; serious harm to property or environment; high-risk personal data breach; serious cybersecurity breach of a model | `Art. 73(2)`: 15 days | Serious incident | Same working day; reportability assessed per regime within hours |
| **SEV-3 Moderate** | Realised harm that is limited, recoverable and below the serious thresholds | None on its own; check GDPR, NIS2, DORA | Incident | Contain same day; after-action review within five working days |
| **SEV-4 Near miss** | No harm; a plausible path to harm was interrupted | None; near-miss patterns feed GPAI reports [5] | Hazard; serious hazard | Weekly review; regression eval added |
| **Issue** | Defect or control weakness with no event | None | Not an event | Issue log with owner and due date |

Three rules make the scale work under pressure.

1. **Classify up, downgrade with evidence.** At triage you rarely know the full harm. Classify
   against the most severe plausible reading and record why; downgrade when evidence narrows it. The
   AI Act supports this reading: the outer deadlines run from awareness, and the "reasonable
   likelihood" of a causal link is enough to call for the report [3].
2. **Severity follows harm, not cause.** A trivial bug that caused a death is SEV-1; a
   sophisticated attack that a guardrail stopped is SEV-4. Technical interest is not a severity
   input.
3. **The scale is code.** The harm tests and the regime triggers are evaluated by a rule engine
   when an incident opens, so the first classification and the clocks it starts are reproducible,
   versioned and auditable. A human can override; the override is logged with a reason.

> **Example (illustrative)** A severity rule written as a [Policy Card](/bok/patterns#pattern-policy-card)
> fires when an incident record has `harm.type` of `fundamental_rights` and `system.ai_act_class` of
> `high_risk`: it sets `severity: SEV-2`, opens an `ai_act_art73` clock with a 15-day ceiling from
> the `aware_at` timestamp, and pages the system owner and legal. The verdict itself is stored as
> evidence, so a later reviewer can see which rule version classified the event.

Two caveats on the mapping. The AI Act classes apply only to high-risk systems (for `Art. 73`) and to
GPAI models with systemic risk (for `Art. 55`), and the GPAI classes differ slightly: the Code of
Practice adds a five-day class for serious cybersecurity breaches, including exfiltration of model
weights [5]. And the OECD values are a vocabulary for reporting, not a legal threshold.

## The response lifecycle

NIST's incident-response guidance changed shape in April 2025. SP 800-61 Revision 3 superseded the
2012 revision and its circular lifecycle (preparation; detection and analysis; containment,
eradication and recovery; post-incident activity) with a model built on the six CSF 2.0 functions,
arguing that incidents are now frequent and long, and that lessons should be shared as soon as they
are identified [6]. The phases below keep the familiar verbs, because on-call engineers think in
them, and map each to the CSF function NIST now uses.

| Phase | AI-specific actions | Evidence record it leaves | Layer | CSF 2.0 function [6] |
|---|---|---|---|---|
| **Detect** | Guardrail events, production eval regressions, drift alerts, user complaints, deployer or provider notices, incident-database scans | Signal event with source, timestamp and registry id | 04 · 05 | Detect |
| **Triage** | Severity from the harm table; reportability per regime; owner and incident commander named; `aware_at` fixed | Incident record opened; clocks started | 05 | Detect · Respond |
| **Contain** | Kill switch or circuit breaker; scope revocation; fallback to a human path; rollback to the last good model or prompt version; deployer suspension | Containment action with actor, time and scope | 04 | Respond |
| **Eradicate** | Fix the cause: patch the guardrail, remove poisoned data, revoke credentials, retrain; only after evidence is preserved | Change record linked to the incident | 01 · 03 | Respond |
| **Recover** | Re-run the eval gate; staged reintroduction; heightened monitoring window | Eval-gate result; monitoring window closed | 03 · 04 | Recover |
| **After-action review** | Blameless review; root cause; CAPA; risk register and eval updates | Review record; CAPA items; updated risk entries | 05 | Identify (Improvement) |

Detection needs more channels than the runtime signals from
[layer 04](/bok/the-stack#layer-04-runtime-controls--observability). The GPAI Code of Practice
expects providers to review police and media reports, social media, research papers and incident
databases, and to give downstream providers, modifiers and users a direct channel to report [5]. A
deployer that only watches its own dashboards will learn about some incidents from a journalist.
Staff are a channel too: [a channel for raising concerns](/bok/governance-program#a-channel-for-raising-concerns)
(chapter 12) routes their reports into the same pipeline, and for a high-risk provider the
post-market monitoring plan is a standing source
([post-market monitoring and serious incidents under the AI Act](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73),
chapter 18).

Containment is where the runtime patterns earn their keep. A
[kill switch](/bok/patterns#pattern-kill-switch--circuit-breaker) that revokes one agent's scope
without breaking the fleet, a [runtime guardrail](/bok/patterns#pattern-runtime-guardrail) tightened
by a config push, and a registry that knows the live and the last good version turn "contain" from a
meeting into a command. The NIST AI RMF names the capability: mechanisms and assigned
responsibilities to "supersede, disengage, or deactivate" AI systems whose performance or outcomes
are inconsistent with intended use [7].

### Freeze before you fix

The instinct after containment is to fix the thing. For a high-risk system the AI Act says wait:
after reporting a serious incident, the provider investigates, including a risk assessment and
corrective action, but must not perform any investigation that alters the system in a way that may
affect the later evaluation of the incident's causes before informing the competent authorities [3].
Engineering reads that as a preservation step between contain and eradicate:

- **Snapshot the system as it was.** Model version and hash, system prompt, policy and guardrail
  versions, tool scopes, retrieval index snapshot, configuration and feature flags, all keyed to the
  registry id and the incident id.
- **Seal the traces.** The `Art. 12` logs and the runtime traces for the incident window, exported
  to tamper-evident storage. Deployers must keep a high-risk system's automatically generated logs,
  where under their control, for at least six months unless other law says otherwise [3]; an open
  incident is a reason to hold them longer.
- **Record who touched what.** Every containment and diagnostic action is logged with its actor, so
  the evaluation of causes can separate the incident from the response.
- **Fix on a branch, not in place.** Eradication runs as a change to a new version; the incident
  version stays reproducible.

Retention outlives the incident. The Code of Practice commits GPAI signatories to keep incident
documentation for at least five years from the documentation or the incident, whichever is later [5].
The frozen evidence also feeds the [defence file](/bok/existing-law#the-defence-file) that product
liability law now lets a court order disclosed (chapter 20).

## Playbooks, RACI and drills

A playbook is the response to one failure mode, written before it happens. Keep it short enough to
read during the incident and specific enough to act on without interpretation.

```yaml
# playbook: indirect-prompt-injection (illustrative)
trigger: guardrail rule output.exfil.* fires, or a tool call to an unregistered domain
first_15_minutes:
  - page: on-call engineer, AI governance engineer
  - contain: revoke agent tool scope "http:egress" via kill switch; keep read scopes
  - preserve: snapshot registry entry, prompt, retrieval index; seal traces for the window
decision_rights:
  kill_switch: on-call engineer (no approval needed)
  customer_notice: DPO
  regulator_filing: legal, on DPO or system-owner recommendation
evidence_checklist: [trace_ids, guardrail_events, affected_records, scope_revocation_event]
regimes_to_assess: [gdpr_art33, gdpr_art34, nis2_art23, ai_act_art73]
```

The decision-rights block matters most. Whoever is on call must be able to pull the kill switch
without asking, because containment that waits for a committee is not containment. Filing with a
regulator is the opposite: it needs named owners with the authority to sign. A RACI makes both
explicit (R responsible, A accountable, C consulted, I informed):

| Activity | On-call engineer | AI governance engineer | System owner | Security IR lead | DPO | Legal | Provider liaison |
|---|---|---|---|---|---|---|---|
| Detect and open the record | R | C | I | C | I | I | I |
| Set severity | R | A | C | C | C | I | I |
| Pull the kill switch or suspend use | R | I | A | C | I | I | I |
| Preserve evidence | R | A | I | C | I | C | I |
| Decide reportability per regime | I | C | C | C | R (GDPR) | A | C |
| File the regulatory report | I | C | C | C (NIS2, DORA) | R (GDPR) | A | I |
| Inform the provider (deployer duty) | I | C | A | I | I | C | R |
| Root-cause analysis | C | R | A | C | C | I | C |
| Approve CAPA and close | I | R | A | C | C | C | I |

Adapt the columns to your organisation; do not drop the rows. Each row is an artefact someone must
produce, and an empty cell at 2 a.m. is a gap an auditor will find later.

**Drills are the control; the playbook is the claim.** The book treats an untested kill switch as a
claim, not a control, and the same test applies to the playbook. Run tabletop exercises on a
schedule, score them and keep the result as evidence:

- **Scenarios.** Rotate through the failure modes below: an indirect prompt injection that
  exfiltrates data; drift that produces discriminatory outcomes; a vendor that silently changes the
  model behind an API; an agent loop that burns budget and calls tools thousands of times;
  confident, wrong advice acted on by a user.
- **Measures.** Time to classify, time to contain, time to a draft report for each clock, and
  whether each clock would have been met. Track mean time to detect (MTTD), to contain (MTTC) and
  to recover (MTTR) across real incidents and drills separately.
- **Evidence.** The drill produces the same records a real incident would (record, clocks, draft
  reports, containment events), tagged as a drill. An auditor asking "can you report on time?"
  gets a query over drill results, not a promise.

> **In practice (illustrative)**
> A quarterly tabletop in a large telco replayed an injection scenario against a customer-service
> agent. The first run took 50 minutes to revoke the agent's egress scope, because the only person
> who knew the revocation command was on leave. The fix was a one-line runbook entry and a second
> named holder; the next run took four minutes. The drill record, with both timings, went into the
> assurance store as evidence for the containment control.

## AI-specific failure modes

Most AI incidents are system incidents, not model incidents: the model behaved as models do, and the
system around it (retrieval, tools, prompts, oversight) turned that behaviour into harm. The table
names the failure modes that recur, the signal that usually detects them and the first containment
move.

| Failure mode | What it looks like in production | Typical detection signal | First containment |
|---|---|---|---|
| **Brittleness** | Small, benign input changes produce large output changes; out-of-distribution inputs break behaviour | Spike in low-confidence or inconsistent outputs; complaints clustered on a new input type | Route the affected input class to a fallback or a human |
| **Lack of robustness** | Adversarial or noisy inputs degrade accuracy or safety | Red-team finding reproduced in production; guardrail hit-rate change | Tighten input filters; rate-limit the pattern |
| **Poor or unrepresentative data** | Error rates differ by subgroup; retrieval returns stale or wrong documents | Subgroup metrics in monitoring; grounding failures | Suspend the affected decision class; pin the last good corpus |
| **Drift** | The input distribution (data drift) or the input-outcome relationship (concept drift) moves after deployment | Distribution tests against the eval baseline; outcome metrics | Raise the human-review share; roll back or retrain |
| **Prompt injection** | Instructions hidden in user input or in retrieved content redirect the system; OWASP lists it first (`LLM01:2025`), direct and indirect [8] | Guardrail events; tool calls outside the task; unusual egress | Revoke the tool scope the injection used; quarantine the source document |
| **Tool misuse** | An agent uses a permitted tool in an unintended or harmful way (`ASI02`) [9] | Tool-call volume or parameter anomalies against the registry scope | Kill switch on the agent; narrow the scope |
| **Hallucination with harm** | Invented facts, citations, policies or dosages that a person acts on | Complaints; downstream corrections; groundedness checks | Disable the answer class; require grounding or a citation |
| **Cascading failures** | One agent's error propagates through others (`ASI08`) [9] | Correlated failures across agents sharing a tool or memory | Break the chain at the shared component |
| **Rogue behaviour** | An agent acts outside its declared scope or persists after it should stop (`ASI10`) [9] | Identity events outside scope; activity after expiry | Revoke identity; verify the revocation took effect |

Two practical points follow. First, a failure mode is a *hypothesis* at triage and a *finding* only
after root-cause analysis; do not let the first label stick. Second, every row maps to a test that
could have caught it earlier (an adversarial case, a subgroup eval, a drift threshold), which is why
the after-action review ends in the eval suite, not in a slide.

## Root-cause analysis

Root-cause analysis (RCA) answers "why did this happen, and why did our controls not stop it?" The
second half is the part AI governance engineering adds: an incident is also evidence that a control
failed, was missing, or was never designed.

### Who takes part

Run the review as a small **incident review board** with a standing core and invited specialists:

- a facilitator who is not in the reporting line of anyone involved;
- the system owner, who is accountable for the CAPA;
- the ML or data engineer who knows the model and its data;
- the AI governance engineer, who owns the mapping from cause to control and to obligation;
- security, when an adversary or a vulnerability is plausible;
- the DPO and legal, when personal data or rights are involved;
- someone who represents the people affected (customer operations, a domain expert, a clinician), so
  harm is described from the receiving end.

The board meets for every SEV-1 and SEV-2 incident and samples SEV-3 incidents and near misses. It
decides four things and records each as a decision: the confirmed causes, the CAPA items and owners,
the changes to the risk register, and closure.

### Techniques

**Five whys.** Ask why the harm happened, then why that happened, until you reach a cause you can
change. It is fast, but it follows one chain, while AI failures usually have several contributing
causes (a data gap *and* a missing eval *and* an oversight step that rubber-stamped). It also tends to
stop at "human error", which is where analysis should start.

**Fault tree analysis.** Start from the top event (the harm) and decompose it through AND and OR
gates into the conditions that had to hold for it to occur; IEC 61025 standardises the method [10].
It suits governed AI systems well, because controls are layered: a harmful output reached a customer
only if the model produced it AND the output guardrail missed it AND no human review applied. The
tree shows which layers failed together, and which single fix would have broken the chain.

**Blameless post-mortem.** The review looks for contributing causes "without indicting any
individual or team", on the premise that people acted reasonably on what they knew and that you can
fix systems and processes but not people [11]. Set the triggers for a mandatory post-mortem in
advance (every SEV-1 and SEV-2, every regulatory filing, every kill-switch pull) so that writing one
is routine, not an accusation [11].

### A cause taxonomy that points at controls

A cause taxonomy is useful only if each class names the control that should have caught it. Code
every confirmed cause against one or more of these classes:

| Cause class | What it means | Control that should have caught it | Layer | Pattern |
|---|---|---|---|---|
| **Data** | Poor-quality, unrepresentative, stale or poisoned training or retrieval data | Data card, lineage, data-quality and bias tests | 02 · 03 | [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci) |
| **Model limits** | Brittleness, lack of robustness, hallucination, capability limits | Capability and robustness evals; red team | 03 | [Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite) |
| **Drift** | Data or concept drift after deployment | Monitoring against the eval baseline; retraining triggers | 04 · 05 | [Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry) |
| **Testing gap** | Too little or unrepresentative testing; a suite tuned to its own threshold | Eval-suite coverage review; adversarial case maintenance | 03 | [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci) |
| **Design or specification** | Misaligned objective, wrong proxy metric, flawed prompt or workflow design | Design review; policy as code on intended use | 01 | [Policy Card](/bok/patterns#pattern-policy-card) |
| **Integration and tooling** | Excessive tool scope, missing mediation, shared credentials | Scoped identity; tool-call mediation | 04 | [Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials) |
| **Adversarial** | Prompt injection, jailbreak, supply-chain compromise | Red team; input and output guardrails; AIBOM | 03 · 04 | [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) |
| **Oversight failure** | Automation bias; a reviewer without context, time or authority; no checkpoint | Designed oversight with measured override rates | 04 | [Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate) |
| **Change management** | Unreviewed model, prompt or config change; silent vendor update | Registry versioning; change gate; vendor notice terms | 01 · 02 | [Vendor / Model Due-Diligence Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate) |
| **Use outside intended purpose** | Deployment beyond the use the system was assessed for | Intake and classification; instructions for use | 01 · 02 | [Agent Registry](/bok/patterns#pattern-agent-registry) |
| **Organisational** | No owner, unclear decision rights, alert fatigue, untrained staff | Operating model, RACI, drills | 05 | [Incident Pipeline](/bok/patterns#pattern-incident-pipeline) |

The taxonomy is not only a learning device; regulators ask for it. The Commission's reporting
template for GPAI serious incidents has a root-cause field that asks for the model outputs that led
to the incident and the factors behind them, including the inputs used and any failures or
circumventions of systemic-risk mitigations [12]. NIS2's final report asks for "the type of threat or
root cause" likely to have triggered a significant incident [13]. DORA goes further: recurring
incidents that are individually below the major threshold count as one major incident when they occur
at least twice within six months with the same apparent root cause and together meet the criteria
[14]. Inconsistent cause coding therefore does more than spoil your statistics: under DORA it can hide
a reportable incident. The OECD reporting framework keeps its own cause-adjacent fields (whether the
incident is linked to the training data, to the AI model, or to the interaction of several AI systems)
that the same coding can fill [2].

> **Example (illustrative)** A fault tree for "discriminatory refusals reached applicants" has three
> AND-ed branches: the model's error rate rose for one age band (cause class: drift); the monitoring
> compared only aggregate accuracy, not subgroup accuracy (testing gap); and reviewers approved 99% of
> model recommendations in under ten seconds (oversight failure). Fixing any one branch would have
> broken the chain. The board assigns three CAPA items, one per branch, and records all three cause
> codes on the incident.

## CAPA: from incident to risk register and eval suite

**CAPA** (corrective and preventive action) is the output of the review. The corrective action fixes
this instance: patch, retrain, roll back, re-scope. The preventive action stops the class of failure
recurring anywhere in the fleet: a new eval case for every similar system, a policy change, a
registry field made mandatory. ISO/IEC 42001 places this in clause 10.2 [4]; the NIST AI RMF asks
that incidents and errors be communicated to relevant AI actors, including affected communities, and
that tracking and response processes be documented [7]. For high-risk providers the AI Act adds hard
edges: a provider with reason to consider a system non-conforming must immediately bring it into
conformity, withdraw, disable or recall it, and inform distributors and deployers; where it presents
a risk, the provider investigates the causes with the reporting deployer and informs the
market-surveillance authority [3].

Every closed incident should leave five artefacts behind:

1. **A regression eval.** The incident becomes a test case that fails on the incident version and
   passes on the fix, wired into the [eval gate](/bok/patterns#pattern-eval-gate-in-ci) so the
   failure cannot ship again unnoticed.
2. **A risk register change.** Either a new risk or a re-scored existing one, with the incident id
   attached. The link runs both ways: the incident record lists the risks it realised, and the risk
   entry lists the incidents that realised it. The risk method itself is chapter 13,
   [risk management](/bok/risk-management#incidents-are-realised-risks).
3. **A control change** where the fault tree found one: a tightened guardrail, a narrower scope, a new
   oversight checkpoint.
4. **A playbook update**, if the response itself was slow or unclear.
5. **An evidence record** that the CAPA was verified: the new eval passes in CI, and the runtime metric
   has stayed at baseline for a defined window.

Two cross-checks keep the link to the risk register honest. A risk scored "low likelihood" that
already has two incidents attached is mis-scored. An incident that matches no risk in the register is
itself a finding: risk identification missed it, and that goes on the CAPA list too.

```json
{
  "capa_id": "CAPA-2026-041",
  "incident_id": "INC-2026-0918-01",
  "type": "preventive",
  "cause_codes": ["adversarial", "integration_and_tooling"],
  "action": "Add indirect-injection cases from quarantined documents to injection-resistance.v5",
  "owner": "team-support-platform",
  "due": "2026-10-02",
  "risk_ids": ["RISK-017"],
  "verification": { "eval_suite": "injection-resistance.v5", "result": "pending" }
}
```

Measure the loop, not the paperwork: recurrence rate by cause class, CAPA items closed and verified on
time, the share of incidents that produced a regression eval, and MTTD and MTTC trends. Those are
realised-risk-reduction numbers; a count of post-mortems written is not.

## Deployer duties: inform the provider, suspend use

Most organisations meet AI incidents as **deployers** of a system someone else built. For high-risk
systems, `Art. 26(5)` sets three duties [3]:

- **Monitor** the system's operation on the basis of the instructions for use and, where relevant,
  inform the provider for its post-market monitoring.
- **Inform and suspend.** Where the deployer has reason to consider that using the system as
  instructed may present a risk within the meaning of `Art. 79(1)`, it informs the provider or
  distributor and the market-surveillance authority without undue delay, and suspends use.
- **Report serious incidents up the chain.** Where the deployer identifies a serious incident, it
  immediately informs first the provider, then the importer or distributor and the
  market-surveillance authority. If it cannot reach the provider, `Art. 73` applies to the deployer
  mutatis mutandis: the deployer inherits the reporting clock.

Two carve-outs apply: the duty does not cover sensitive operational data of law-enforcement deployers,
and for financial institutions the monitoring duty is deemed fulfilled by complying with their
internal-governance rules under financial-services law [3]. These duties apply with the rest of the
high-risk regime, from 2 Dec 2027 for Annex III systems after the Digital Omnibus (see
[chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).

Each duty needs an engineered artefact, and none of them exists by default:

| Duty | Artefact | Where it lives |
|---|---|---|
| Monitor per the instructions for use | Monitoring hooks for the metrics the provider's instructions name; thresholds as code | Layer 04 |
| Inform the provider | Provider incident contact and channel in the registry entry; contractual notification terms tested in drills | Layer 02 |
| Suspend use | A tested suspension path for a procured system: feature flag, traffic switch to a human or legacy path | Layer 04 |
| Serious incident: provider first | The deployer's incident record exports the provider-facing report; timestamps of each notification | Layer 05 |
| Provider unreachable | Fallback clock: the same `Art. 73` timers start on the deployer's own record | Layer 05 |
| Evidence for the provider's investigation | Deployer-held logs retained at least six months, longer while an incident is open [3] | Layers 04 · 05 |

Suspension is a kill switch for a system you do not own. You cannot revoke a vendor's weights, but you
can stop sending it traffic; test that you can, and how long it takes, before you need it. The
[Vendor / Model Due-Diligence Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate) is where
the two-way notification terms belong: the provider tells you about incidents and corrective actions
that affect your deployment, and you have a named channel to tell the provider. The same logic runs
further up the chain for GPAI: the Code of Practice asks model providers to tell downstream
providers, modifiers and users how to report serious incidents, directly or to the AI Office [5].
Deployment governance as a whole is chapter 15, [governing deployment](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance),
whose [external communications plan](/bok/governing-deployment#external-communications) carries the
notices to users, affected people and authorities.

## The overlapping clocks

One event can start several clocks. An indirect prompt injection that leaks customer data from a
high-risk system run by a bank can, at once, be a serious incident under the AI Act, a personal data
breach under GDPR and a major ICT-related incident under DORA; at a non-financial essential entity
the same leak could be a significant incident under NIS2. Each regime has its own trigger, recipient,
deadline and content. The table puts them side by side, as of 2026-09-24.

| Regime | Who reports | Trigger | First report | Follow-up and final | To whom |
|---|---|---|---|---|---|
| EU AI Act `Art. 73` [3] | Provider of a high-risk system; the deployer if the provider cannot be reached | Serious incident (`Art. 3(49)`) | Immediately on a causal link or its reasonable likelihood; no later than 2 days (widespread infringement or critical infrastructure), 10 days (death) or 15 days (other) from awareness; an incomplete initial report is allowed | Investigation, risk assessment and corrective action; no altering the system before informing authorities | Market-surveillance authority where it occurred; the AI Office for systems under its competence [15] |
| EU AI Act `Art. 26(5)` [3] | Deployer of a high-risk system | Serious incident; or reason to consider the system presents a risk | Serious incident: immediately, provider first; risk: without undue delay, plus suspension | Cooperation with the provider's investigation | Provider, then importer or distributor, and the market-surveillance authority |
| EU AI Act `Art. 55(1)(c)` with Code of Practice Commitment 9 [5][16] | Provider of a GPAI model with systemic risk | Serious incident involving the model | Without undue delay; under the Code: 2 days (critical infrastructure), 5 days (serious cybersecurity breach), 10 days (death), 15 days (health, rights, property, environment) | Intermediate report at least every four weeks while unresolved; final report within 60 days of resolution | AI Office and, as applicable, national authorities |
| GDPR `Art. 33` [17] | Controller (the processor notifies the controller without undue delay) | Personal data breach, unless unlikely to result in a risk | Without undue delay and, where feasible, within 72 hours of awareness; reasons required if later | Information may be provided in phases; every breach documented | Supervisory authority |
| GDPR `Art. 34` [17] | Controller | Breach likely to result in a high risk | Without undue delay | None set | Affected data subjects |
| NIS2 `Art. 23` [13] | Essential and important entities | Significant incident | Early warning within 24 hours; incident notification within 72 hours | Intermediate report on request; final report within one month of the notification | CSIRT or competent authority |
| DORA `Art. 19` with RTS 2025/301 [18][19] | Financial entities | Major ICT-related incident | Within 4 hours of classification as major, and no later than 24 hours from awareness | Intermediate within 72 hours of the initial notification; final within one month of the latest intermediate report | Financial competent authority |
| Cyber Resilience Act `Art. 14` [20] | Manufacturers of products with digital elements | Actively exploited vulnerability; severe incident affecting product security | Early warning within 24 hours; notification within 72 hours | Final report 14 days after a fix is available (vulnerability) or one month after notification (incident) | Coordinating CSIRT and ENISA, via the single reporting platform |
| California SB 53 [21] | Large frontier developers | Critical safety incident | Within 15 days of discovery; within 24 hours if there is an imminent risk of death or serious physical injury | None set here | Office of Emergency Services; for imminent risk, an appropriate authority |
| New York RAISE Act [22][23] | Large frontier developers | Critical safety incident | Within 72 hours of a determination or of learning facts that support a reasonable belief; effective 1 Jan 2027 | None set here | Oversight office within the Department of Financial Services |
| OECD common reporting framework [2] | Voluntary | AI incident or hazard | No clock | 29 criteria across eight dimensions | Not a filing duty; a shared schema |

### Reading the table

**The triggers are not the same event.** GDPR, NIS2, the CRA and `Art. 73` count from *awareness*.
DORA's four-hour clock counts from *classification* as major, capped at 24 hours from awareness [19].
`Art. 73` also asks for the report *immediately* once a causal link, or its reasonable likelihood, is
established, with the day counts as outer limits [3]. RAISE counts from a *determination* or a
*reasonable belief* [23]. An incident record therefore needs a timestamp per trigger, not one "opened
at": first signal, awareness decision, classification per regime, causal link established, and each
submission.

**Some regimes defer to others.** NIS2 steps aside where a sector-specific Union act imposes at least
equivalent incident notification, which is how DORA displaces NIS2 reporting for financial entities
[13]. The AI Act narrows itself in a similar way: for Annex III systems whose providers are already
under equivalent Union reporting obligations, and for AI in medical devices, `Art. 73` reporting is
limited to fundamental-rights infringements (`Art. 3(49)(c)`) [3]. According to a law-firm summary of
the Commission's draft guidance, the draft applies this to sectors such as NIS2 critical
infrastructure [24]. Which regimes count as "equivalent" for a given system is a legal call; record it
per system in the registry, not per incident under pressure.

**Dates are moving.** Four points to re-check before relying on the table, all as of 2026-09-24:

- The high-risk regime, `Art. 73` included, applies to Annex III systems from 2 Dec 2027 and to
  Annex I systems from 2 Aug 2028, after the Digital Omnibus; the GPAI duties in `Art. 55` already
  apply (see [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- The Omnibus left the `Art. 73` deadlines unchanged but added `Art. 75(1a)`: providers of high-risk
  systems under the AI Office's exclusive competence (broadly, systems built on the provider's own
  GPAI model and systems in very large online platforms or search engines) report serious incidents
  to the AI Office [15][25].
- The Commission published draft `Art. 73` guidance and a reporting template on 26 Sep 2025, aligned
  with the OECD's incidents monitor and common reporting framework [26]. Whether the final guidance
  has since been adopted is not confirmed here (verify).
- A separate Digital Omnibus proposal (COM(2025) 837) would change GDPR breach notification and add
  a single entry point for incident reports. It is tabled, not adopted: as of the Parliament's 1 Aug
  2026 update, amendments were under discussion and the Council's mandate had stalled [27].
  Commentators report a longer GDPR deadline limited to high-risk breaches (verify). The 72-hour rule
  stands; chapter 19 covers [AI-specific privacy breaches and the 72-hour clock](/bok/privacy-and-ai#ai-specific-privacy-breaches).
- Outside the EU the clocks differ again: chapter 21 lays out the
  [incident clocks across regimes](/bok/ai-laws-worldwide#incident-clocks-across-regimes).

### One record, many reports

The engineering answer to overlapping clocks is not a better calendar. It is one incident record that
holds the facts once, and a generator per regime that renders the report that regime wants, each with
its own timer. The clocks live in the record, and the pipeline alerts on the nearest deadline:

```json
{
  "incident_id": "INC-2026-0918-01",
  "clocks": [
    { "regime": "gdpr_art33", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "due_at": "2026-09-21T15:02:00Z", "status": "submitted",
      "submitted_at": "2026-09-20T10:40:00Z" },
    { "regime": "nis2_art23", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "status": "not_applicable",
      "rationale": "not significant under Art. 23(3); signed off by security IR lead" },
    { "regime": "ai_act_art73", "status": "not_applicable",
      "rationale": "csa-01 is not a high-risk system (registry class: limited risk)" }
  ]
}
```

A "not applicable" decision is evidence too. Write it down with its rationale and its owner; the
question an authority asks a year later is usually "why did you not report?", and the answer should
be a record, not a memory.

> **In practice (illustrative)**
> Replaying a realistic scenario on `csa-01`, the customer-service assistant from
> [chapter 04](/bok/the-stack#one-system-through-the-five-layers): an order note carrying hidden
> instructions made the assistant include another customer's delivery address in a reply. The
> guardrail logged but did not block the output. Triage set SEV-2 (personal data disclosed to a third
> party) and ran the regimes. GDPR `Art. 33`: notifiable, 72-hour clock from the DPO's awareness
> decision. GDPR `Art. 34`: not high risk for the one affected customer on the facts, decision
> recorded. NIS2: telecoms providers are in scope as digital infrastructure [13], but a single-record
> disclosure was not significant, determination recorded. AI Act `Art. 73`: not a high-risk system,
> so no clock; the incident still went to the model provider through its downstream reporting
> channel. The GDPR notification left in 44 hours, generated from the same record the root-cause
> review later used.

## The incident record

Design the record once, around what the most demanding recipients ask for, and every other report
becomes a projection of it. The templates page has the
[incident record fields](/resources/templates#schema-incident-record) as a JSON Schema with a filled
example. Two public schemas set the bar. The Commission's template for GPAI
serious incidents asks for ten items: start and end dates, the resulting harm and the victims or
affected group, the chain of events, the model involved, the evidence available, the provider's
response, its recommendation to the authorities, a root-cause analysis, patterns from post-market
monitoring including near misses, and submitter information [12]. The OECD common reporting framework
defines 29 criteria in eight dimensions (metadata, harm details, people and planet, economic context,
data and input, AI model, task and output, other information) [2].

| Field group | Record fields | Commission GPAI template [12] | OECD reporting framework [2] | Filled from |
|---|---|---|---|---|
| Identity | `incident_id`, title, description, systems and versions, registry ids, organisations that developed and deployed | Model involved; submitter | Title; description; name and version; organisations; submitter | Registry (layer 02) |
| Time | `first_signal_at`, `aware_at`, `started_at`, `ended_at`, per-regime trigger and submission times | Start and end dates | Date of first known occurrence | Traces; pipeline |
| Harm | Severity, harm type, quantification, affected groups, countries, rights impact | Resulting harm and victims | Severity; harm type; quantification; affected stakeholders; human-rights impacts; countries | Triage; DPO; legal |
| Context | Industry, business function, critical-infrastructure link, breadth of deployment, task, autonomy level | Chain of events | Industry; business function; critical infrastructure; breadth of deployment; task; autonomy level | Registry; intake record |
| Cause | Failure-mode hypothesis, confirmed cause codes, link to training data, model or multi-system interaction, misuse | Root-cause analysis; post-market patterns and near misses | Training-data link; model link; multi-system interaction; unintended or wrongful use | Review board |
| Evidence | Trace ids, snapshots, guardrail events, supporting material | Evidence available | Supporting materials; steps to reproduce | Layers 04 · 05 |
| Response | Containment actions, corrective actions, CAPA ids, recommendation to authorities | Response; recommendation | Actions taken | Incident commander; CAPA |
| Clocks | One entry per regime: applicability, rationale, owner, due, submitted | Not in template | Not in framework | Pipeline |
| Links | Risk ids, eval ids added, playbook used | Not in template | Not in framework | Risk register; eval suite |

Store the record as structured data in the assurance store, and emit its control-relevant parts as
machine-readable evidence: CAPA items map naturally to an `OSCAL` plan of action and milestones
(`POA&M`), the native model's place for open findings and their remediation [28]. That is the
[Machine-Readable Evidence](/bok/patterns#pattern-machine-readable-evidence-oscal) pattern applied to
incidents, and it lets an auditor query "all SEV-2 incidents in Q3 with open CAPA" instead of asking
for a spreadsheet.

## Learning from public incident databases

Your own incident history is small and biased toward what you already detect. Public repositories
widen it, as long as you know what they are. This site keeps two curated starting points: the
[incident cases written as post-mortems](/cases) and the [harms atlas](/resources/harms), which
maps harms by level to the control that catches each.

- **AI Incident Database (AIID).** Run by the Responsible AI Collaborative, it indexes harms and near
  harms from deployed AI, in the manner of aviation and computer-security incident databases. It
  classifies incidents with several taxonomies (the CSET AI Harm Taxonomy, a Goals, Methods and
  Failures taxonomy, and the MIT AI Risk Repository's) and offers full database snapshots for
  download [29].
- **OECD AI Incidents and Hazards Monitor (AIM).** An automated monitor of AI incidents and hazards
  reported in the news media, which keeps incidents and hazards apart as the OECD definitions do
  [30].
- **AIAAIC Repository.** An independent register of incidents and controversies involving AI,
  algorithms and automation, across sectors from facial recognition to automated hiring [31].
- **MIT AI Risk Repository.** Not an incident database but a structured catalogue of AI risks with
  causal and domain taxonomies, useful for checking that your cause taxonomy and risk register have
  no blind spots [32].

Use them in four ways. **Seed the risk register**: pull the incidents recorded for deployments like
yours and check that each has a matching risk. **Write the eval before the incident**: turn a public
incident into a test case against your system, feeding the
[red-team suite](/bok/patterns#pattern-adversarial-red-team-suite) alongside the MITRE ATLAS
technique catalogue [33]. **Calibrate the severity scale**: check that real incidents land where your
harm tests say they should. **Feed GPAI monitoring**: the Code of Practice lists incident databases
among the sources providers should review [5].

Know the limits. Media-sourced collections over-represent the newsworthy, the consumer-facing and the
English-speaking; one event can appear several times; and none of them gives base rates. Use them to
find failure modes you had not imagined, not to estimate how often yours will occur. The reading list
keeps the current links under
[incident and risk repositories](/bok/reading-list#incident-and-risk-repositories-the-empirical-record).

## What you can do this week

1. **Write the severity scale as policy.** Five levels, a harm test per level, the regime triggers per
   level; run your last three incidents through it and fix the rules until the results match what
   you would decide by hand.
2. **Add the timestamps.** Give every incident ticket `aware_at`, a per-regime applicability flag with
   owner and rationale, and a due time per clock. Backfill the open incidents.
3. **Run one tabletop.** Indirect prompt injection against your most connected assistant: pull the
   kill switch, preserve the evidence, draft the GDPR notification. Record the times.
4. **Test the suspension path for one procured system.** Confirm the provider's incident contact is in
   the registry entry and that you can stop traffic to the system, and measure how long it takes.
5. **Code three past events.** Assign cause classes from the taxonomy to your last three incidents or
   near misses, and add one regression eval for each.

**Maps to:** EU AI Act Art. 3(49), 20, 26(5)–(6), 55(1)(c), 72, 73, 75(1a) · GPAI Code of Practice,
Safety and Security Commitment 9 · GDPR Arts. 33–34 · NIS2 Art. 23 · DORA Art. 19 · Cyber Resilience
Act Art. 14 · ISO/IEC 42001 (clause 10.2, Annex A.8) · NIST AI RMF (Manage 2.4, 4.1, 4.3) · NIST SP
800-61r3 · OWASP LLM01:2025, Agentic ASI02/ASI08/ASI10 · Layer 04 Runtime Controls & Observability ·
Layer 05 Assurance & Continuous Compliance. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Name it to tame it: defining AI incidents and hazards" (Luis Aranda and Karine Perset; summary of the OECD paper "Defining AI incidents and related terms", OECD Artificial Intelligence Papers, doi 10.1787/d1a8d965-en; AI incident and AI hazard definitions; graded terms serious AI incident, AI disaster, serious AI hazard). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[2] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; 29 criteria in eight dimensions; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 3(49) serious incident; Art. 3(61) widespread infringement; Art. 20 corrective actions and duty of information; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 73 reporting of serious incidents (2, 10 and 15 days; incomplete initial report; no altering the system before informing authorities; limits in Art. 73(9)–(10)). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action; Annex A.8 information for interested parties). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[5] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 serious incident reporting (Measure 9.1 identification sources and downstream reporting channels; 9.2 information incl. near misses; 9.3 timelines of 2, 5, 10 and 15 days, intermediate reports at least every four weeks, final report within 60 days of resolution; 9.4 retention of at least five years). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[6] NIST SP 800-61r3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (supersedes SP 800-61r2; previous life-cycle phases mapped to CSF 2.0 functions). NIST. 2025-04. https://csrc.nist.gov/pubs/sp/800/61/r3/final (verified: primary)
[7] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring incl. incident response; MANAGE 4.3 incidents and errors communicated, processes followed and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[8] LLM01:2025 Prompt Injection (direct and indirect prompt injection). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[9] Top 10 for Agentic Applications 2026 (ASI02 Tool Misuse; ASI08 Cascading Failures; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[10] IEC 61025:2006, Fault tree analysis (FTA), edition 2.0 (IEC TC 56 Dependability). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template under Art. 55(1)(c) and Commitment 9; ten fields from start and end dates to root-cause analysis, near-miss patterns and submitter). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[13] Directive (EU) 2022/2555 (NIS2) of 14 December 2022: Art. 4 sector-specific Union acts; Art. 23 reporting obligations (significant incident; early warning within 24 hours; notification within 72 hours; final report within one month incl. type of threat or root cause); Annex I digital infrastructure incl. providers of public electronic communications networks and services. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[14] Commission Delegated Regulation (EU) 2024/1772, RTS on the classification of ICT-related incidents under DORA (Art. 8: major incidents; recurring incidents with the same apparent root cause, occurring at least twice within six months, count as one major incident). Publications Office of the EU (EUR-Lex). 2024-03-13. https://eur-lex.europa.eu/eli/reg_del/2024/1772/oj/eng (verified: primary)
[15] Digital Omnibus on AI, consolidated changes (Art. 75(1a): serious incidents of high-risk systems under the AI Office's competence reported to the AI Office, Art. 73(2)–(9) applying mutatis mutandis; Art. 73 deadlines unchanged). AI Act Explorer (Future of Life Institute). 2026. https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/ (verified: secondary)
[16] EU AI Act Art. 55 (GPAI models with systemic risk; Art. 55(1)(c) keep track of, document and report serious incidents to the AI Office without undue delay). artificialintelligenceact.eu. Reg. (EU) 2024/1689. https://artificialintelligenceact.eu/article/55/ (verified: primary)
[17] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 33 notification of a personal data breach to the supervisory authority (72 hours where feasible; processor to controller; phased information; documentation) and Art. 34 communication to the data subject (high risk). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[18] Regulation (EU) 2022/2554 (DORA) of 14 December 2022: Art. 3(8) ICT-related incident; Art. 19 reporting of major ICT-related incidents. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[19] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month); report templates in Commission Implementing Regulation (EU) 2025/302. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[20] Regulation (EU) 2024/2847 (Cyber Resilience Act) of 23 October 2024: Art. 14 reporting obligations of manufacturers (24-hour early warning; 72-hour notification; final report 14 days after a fix or one month after notification; CSIRT and ENISA via the single reporting platform); Art. 71(2) Art. 14 applies from 11 Sep 2026. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[21] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025; approved 29 Sep 2025; critical safety incidents reported to the Office of Emergency Services within 15 days, or within 24 hours to an appropriate authority on imminent risk of death or serious physical injury). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[22] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; 72-hour safety incident disclosure). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[23] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment; critical safety incident reported within 72 hours of a determination or reasonable belief to the DFS office; 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[24] "European Commission Publishes Draft Guidance on Reporting Serious AI Incidents" (indirect causation; simplified Art. 73 reporting where equivalent sector obligations apply, limited to fundamental-rights infringements). Latham & Watkins. 2025-10-28. https://www.lw.com/en/insights/european-commission-publishes-draft-guidance-reporting-serious-ai-incidents (verified: secondary)
[25] "EU AI Act Update: Digital Omnibus Finalizes 8 Compliance Changes" (AI Office exclusive competence over AI systems built on the same provider's GPAI model and over systems in very large online platforms and search engines; serious-incident reports from those providers go to the AI Office). Orrick. 2026-07-29. https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes (verified: secondary)
[26] "AI Act: Commission issues draft guidance and reporting template on serious AI incidents, and seeks stakeholders' feedback" (published 26 Sep 2025; feedback until 7 Nov 2025; alignment with the OECD AI Incidents Monitor and Common Reporting Framework). European Commission. 2025-09-26. https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks (verified: primary)
[27] Legislative Train Schedule: The Digital Omnibus Regulation Proposal (COM(2025) 837; status tabled; single reporting point for cybersecurity and data incidents; co-rapporteurs' draft report 22 Jun 2026; Council mandate vote cancelled 26 Jun 2026; page updated 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[28] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[29] AI Incident Database (harms and near harms from deployed AI; CSET, GMF and MIT taxonomies; database snapshots). Responsible AI Collaborative. 2026. https://incidentdatabase.ai/ (verified: primary)
[30] OECD.AI Incidents and Hazards Monitor (AIM; automated monitor of news media; incidents and hazards distinguished). OECD. 2026. https://oecd.ai/en/incidents (verified: primary)
[31] AIAAIC Repository (independent register of AI, algorithmic and automation incidents and controversies). AIAAIC. 2026. https://www.aiaaic.org/aiaaic-repository (verified: primary)
[32] MIT AI Risk Repository (living database of AI risks; causal and domain taxonomies). MIT FutureTech. 2026. https://airisk.mit.edu/ (verified: primary)
[33] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
