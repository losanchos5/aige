# 12. Running the AI governance program

> An AI governance program is the organisation governed as a system: people hold the duties, a
> committee decides what gates cannot, policies compile into gates, and the evidence reaches the board.

> **In short**
> An AI governance program is the organisation governed as a system: people hold the duties, a
> committee decides what gates cannot, policies compile into gates, and the evidence reaches the
> board. One rule runs through it: the committee decides, the gates enforce. People take the
> decisions that need judgement, such as whether a residual risk is acceptable or an exception
> justified, and code enforces them on every change and leaves the evidence. The law already expects
> the organisational layer to be designed: the EU AI Act requires a high-risk provider's quality
> management system to include an accountability framework (`Art. 17(1)(m)`) [1], ISO/IEC 42001 asks
> for defined roles, responsibilities and authorities (clause 5.3) [2], and the NIST AI RMF for
> documented roles (GOVERN 2.1) [3]. Each stakeholder holds a duty, a decision right and an artefact
> that evidences the duty. AI literacy runs as role-based curricula with training records, and
> leadership reads KPIs and KRIs computed from live systems rather than self-reported.

## The organisation as an object of governance

Chapter 01 names five objects of governance: models, systems, agents, data and the organisation. The
first four get most of this book's machinery. The fifth decides whether that machinery is built,
funded, obeyed or bypassed. "A control with no owner is not a control" is a claim about the
organisation, and this chapter writes it out: who holds which duty, where decisions are taken, how
policies become gates, how people are trained and heard, and how leadership learns whether any of it
works.

One rule runs through the chapter: **the committee decides; the gates enforce.** People take the
decisions that need judgement (is this use case worth its risk, is this residual risk acceptable, is
this exception justified). Code enforces them on every change and leaves the evidence. A program that
inverts this, with meetings enforcing and code advising, is the "risk review board" anti-pattern of
chapter 04: recommendation without consequence.

The law already expects the organisational layer to be designed. The EU AI Act requires a high-risk
provider's quality management system to include "an accountability framework setting out the
responsibilities of the management and other staff" (`Art. 17(1)(m)`) [1]. ISO/IEC 42001 asks for
defined roles, responsibilities and authorities (clause 5.3; Annex A.3.2) [2], and the NIST AI RMF for
documented roles and lines of communication for AI risk (GOVERN 2.1) [3]. None says how to make that
framework true on a Tuesday. That is the engineering job.

This chapter is not a GRC programme manual and not legal advice. It is the operating model that gives
the five layers of [the stack](/bok/the-stack#how-to-read-the-stack) their owners. The risk loop is chapter 13 ([Where risk
management sits](/bok/risk-management#the-loop-identify-assess-treat-monitor)); the controls at each build and run stage are chapters 14 and
15 ([Governing AI development](/bok/governing-development#the-build-as-a-chain-of-gates), [Governing deployment and
use](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)).

## The stakeholder map

Each stakeholder holds a duty, a decision right (or explicitly none) and an artefact that evidences
the duty. If you cannot name the artefact, the duty is not yet real.

| Stakeholder | Duty in the program | Decides | Artefact it owns or signs |
|---|---|---|---|
| **Board** (governing body) | Sets AI risk appetite; oversees the program | Appetite; the AI policy | Appetite statement; board minutes |
| **Executive leadership** | Owns AI risk decisions for the business; funds the program | Acceptance of the highest residual risks | Signed risk acceptances; budget |
| **CAIO / CDAO** | Runs AI strategy and the use-case portfolio; chairs the committee | Portfolio priorities | Portfolio; use-case inventory |
| **AI governance committee** | Decides what gates cannot: residual risk, exceptions, value trade-offs | Exceptions; triggered go/no-go | Decision records; exception register |
| **Legal** | Reads obligations; confirms a control meets them | Interpretation | Obligation register; contract clauses |
| **Privacy / DPO** | Data protection by design; DPIA; data-subject rights | DPIA advice and sign-off | DPIA; records of processing |
| **CISO / security** | AI threat model; security controls; incident response | Security exceptions | Threat models; red-team results |
| **Risk** (second line) | AI risk taxonomy inside ERM; challenge; KRIs | Rating method | Risk register; KRI thresholds |
| **Internal audit** (third line) | Independent assurance over the program | Audit opinion | Audit reports; tested samples |
| **Product owner** | Accountable for one system's use case, value and risk | Scope; launch request | Justification memo; registry owner field |
| **Engineering** (ML, data, platform) | Builds and runs the system inside the gates | Technical design | Code; eval results; AIBOM |
| **AI governance engineer** | Builds the gates, the registry and the evidence path | Gate design | Policy code; evidence store |
| **Procurement** | AI intake for purchases; vendor tiering | Vendor approval, with risk | Vendor file; contract |
| **HR** | Workforce literacy; AI in employment decisions; worker information | People processes | Training records; worker notices |
| **Operators and end users** | Use systems as instructed; exercise oversight; report concerns | Override in the moment | Override and escalation logs |
| **Affected people** and representatives | Give feedback; contest decisions | None formally; a voice | Feedback and contest records |
| **Vendors** | Supply evidence; notify changes and incidents | Their own system | Model cards; AIBOM; incident notices |

Four rows need more than a cell.

**The board.** In the Institute of Internal Auditors' Three Lines Model, the governing body is
accountable for oversight, management carries the first- and second-line roles, and internal audit
gives independent assurance [4]. For AI, the board approves appetite and policy and receives evidence;
it does not review use cases. NIST states the executive duty plainly: executive leadership "takes
responsibility for decisions about risks associated with AI system development and deployment"
(GOVERN 2.3) [3]. A board never asked to accept an AI risk has not delegated the decision; it has
never seen it.

**The CAIO.** The Chief AI Officer (or Chief Data and AI Officer) owns the portfolio: which use cases
the organisation pursues, and why. The clearest public template is the US federal one: OMB Memorandum
M-25-21 of 3 April 2025 required each agency to designate a CAIO within 60 days, maintaining the AI
use-case inventory and establishing "a process for an independent review of high-impact use cases
before risk acceptance" [5]. The lesson transfers: the CAIO owns the inventory and the acceptance
process, and does not review their own use cases.

**Operators.** A deployer of a high-risk system must "assign human oversight to natural persons who
have the necessary competence, training and authority, as well as the necessary support"
(`Art. 26(2)`) [6]. Competence and authority are organisational facts: a training record and a documented
right to stop the system (see [Designing human
oversight](/bok/the-stack#designing-human-oversight-article-14)).

**Affected people.** The people a system decides about rarely sit in the program, so it has to reach
them. Employers deploying a high-risk system at the workplace must inform workers' representatives
and affected workers first (`Art. 26(7)`) [6]. NIST asks for practices that integrate feedback from
people outside the team that built or deployed the system (GOVERN 5.1) and for decisions informed by a
diverse team (GOVERN 3.1) [3]. An ethics board or external panel earns its place only if its advice is
recorded against a decision and answered.

## A lifecycle RACI

The RACI says who does what at each lifecycle stage. **R** does the work, **A** answers for it (one
per row), **C** is consulted before, **I** is informed after.

| Stage | Product owner | Engineering | AI gov. engineer | Legal & privacy | Security | Risk | Committee | Internal audit |
|---|---|---|---|---|---|---|---|---|
| Intake | A | C | R | C | C | C | I (C if triggered) | I |
| Design | A | R | C | C | C | I | I | I |
| Data | A | R | C | R | I | I | I | I |
| Build | A | R | C | I | C | I | I | I |
| Test | A | R | R | I | R | C | I | I |
| Release | A (committee if triggered) | R | R | C | C | C | C | I |
| Operate | A | R | R | I | R | C | I | I |
| Change | A | R | R | C | C | I | I | I |
| Retire | A | R | R | C | C | I | I | I |

Three rules keep the table honest. The product owner is accountable at every stage, because
accountability that moves between functions as a system matures is the gap incidents fall through.
Internal audit is informed everywhere and responsible nowhere; once it runs a first- or second-line
task it can no longer audit that task independently [4]. The committee holds the A only for triggered
use cases, so it does not become a bottleneck for ordinary ones.

A RACI in a slide is a claim. Compile it instead: one `raci.yaml` maps stages to roles, each registry
entry names the people holding those roles for that system, and the pipeline reads both. A release
with no named product owner fails admission; a pull request touching a policy needs its owner's review
(a code-owners rule generated from the same file). The accountability framework of `Art. 17(1)(m)`
becomes a file you can diff [1].

## The committee decides, the gates enforce

Committees have a bad reputation in this book, and chapter 04 earns it: a board that rates findings
monthly with no power to stop a launch is theatre. But some decisions cannot be automated, and
pretending otherwise hides them in pipeline configuration nobody reviews. The committee is legitimate
where it takes those decisions, and only there.

### What the committee is for

Four kinds of decision. **Risk acceptance**: whether a residual risk above the product owner's
authority is acceptable, for how long and under which compensating controls. **Exceptions**: whether
a system may proceed while failing a named rule. **Value trade-offs**: whether a benefit justifies a
risk no threshold can price (a rights-affecting decision, a vulnerable population). **Policy**:
approving the policy set and its material changes. It does not review every release, write controls
or run evals; gates and teams do.

### Charter and membership

A one- or two-page charter sets purpose, decision rights, quorum, membership, cadence, escalation, how
decisions are recorded and how the charter changes. A workable core is the CAIO or a delegate (chair),
legal, privacy, security, risk, a senior engineering lead and one or two product leaders, with HR and
procurement for their cases and internal audit as a non-voting observer. For breadth, M-25-21 asked
the AI governance boards of the largest (CFO Act) agencies to include IT, cybersecurity, data, budget,
legal, privacy, civil rights and civil liberties, and to consult external experts as needed [5].

### Advisory or binding

An advisory committee recommends and a named executive decides; a binding committee decides within its
charter. Either works if the charter says which, per decision type. What fails is ambiguity: a
committee that believes it approved a launch and a product owner who believes it merely commented.
A common split is binding on exceptions and triggered use cases, advisory on strategy.

### Risk acceptance and exceptions

Residual risk is accepted by someone with the authority to own it, for a bounded time. An acceptance
matrix makes that explicit, using the ratings from chapter 13 (thresholds illustrative):

| Residual risk | Who may accept | Maximum validity | Required evidence |
|---|---|---|---|
| Low | Product owner | 12 months | Registry entry; passed gates |
| Medium | Product owner + risk function | 6 months | Compensating controls named |
| High | AI governance committee | 3 months | Decision record; monitoring plan |
| Above appetite | Executive leadership, reported to the board | 3 months | Board notification |
| Prohibited use | No one | Not applicable | Blocked at intake |

An exception is a risk acceptance for one rule on one system. It belongs in the policy repository as
data, not in minutes. A record (illustrative):

```yaml
exception:
  id: EXC-2026-014
  rule_id: eval.injection-floor.v4
  system: csa-01
  requested_by: team-support-platform
  justification: "Vendor model update lowered injection resistance; fix scheduled"
  compensating_controls:
    - guardrail.input.injection.v3 in block mode
    - human approval for refunds above the tier-2 limit
  residual_risk: high
  decision_record: DEC-2026-051
  approved_by: ai-governance-committee
  expires: 2026-10-31T23:59:59Z
```

The gate reads the register. While the exception is live, the rule returns `allow` with the exception
id in its verdict, so the evidence shows the release passed *under an exception*. When it expires,
the same rule fails the build again without anyone having to remember. Open exceptions by age become
a board indicator.

### Escalation, triggers and cadence

Most use cases never reach the committee; they pass [intake, get a tier](/patterns/use-case-intake-risk-tiering) and go through the gates.
Review triggers route the rest:

- a decision with legal or similarly significant effect on a person (credit, employment, insurance,
  housing, education, public services);
- biometric identification or categorisation, emotion recognition, or special-category data;
- children or other vulnerable people as users or subjects;
- an agent with write access to money, customer records or production infrastructure;
- outputs that cannot be explained well enough for the people who must act on them;
- any exception request rated high or above.

Exceptions and triggered cases need a service level (for example, a decision within ten working days)
and an asynchronous path; a monthly meeting would make governance the slowest step in delivery. Policy
approvals can be monthly and the board report quarterly. Escalation runs product owner, committee,
executive, board, with the trigger for each hop written in the charter.

> **In practice (illustrative)**
> In a large telco, the committee's first meetings debated individual releases. Moving exceptions
> into a register the gates read changed its job. Engineers filed requests as pull requests; the
> committee decided within the service level; the gate enforced the expiry. Meetings shrank to
> triggered use cases and the trend in open exceptions, and an auditor could list every release that
> shipped under an exception with one query.

## Enterprise risk, the three lines and internal audit

### AI risk in the enterprise risk register

AI risk belongs in the enterprise risk register under the same appetite, rating scale and reporting
line as every other risk, with AI categories underneath (harm to people, legal exposure, security,
reliability, third parties). ISO/IEC 23894 adapts the ISO 31000 risk process to AI and is the natural
bridge [7]. Generate the enterprise view from the system view: each registry entry carries its ratings
and linked controls, and the register rolls them up by category and business unit. The link runs both
ways, so a change in appetite changes tier rules and gate thresholds.

### The three lines, applied to AI

| Line | Who | AI duties | Evidence it produces |
|---|---|---|---|
| First | Product owners, engineering, operators | Build and run systems inside the gates; own their risks | Registry entries; eval results; runtime logs |
| Second | Risk, compliance, privacy, security, AI governance | Set method and policy; build the paved path; challenge first-line ratings | Policies as code; KRI thresholds; review records |
| Third | Internal audit | Independent assurance on the design and operation of controls | Audit reports; tested samples |

The AI governance engineer usually sits in the second line, building tools the first line runs. The
model describes roles, not boxes on an org chart; what matters is that the third line stays
independent of what it assures [4].

### What internal audit tests

ISO/IEC 42001 asks for internal audits of the management system (clause 9.2) [2]. They should test the
gates, not the documents about them. **Re-performance**: re-run the policy decision for a random
sample of releases from the stored inputs; the verdict should match the evidence store.
**Bypass hunting**: compare what discovery finds running with the registry, and deployments with gate
verdicts; a deploy without a verdict is a finding. **Exception hygiene**: sample exceptions for a named
approver, an expiry and compensating controls that actually ran. Tabletop exercises (a simulated
serious incident, a vendor model withdrawn overnight) test the decision paths no pipeline exercises.

**Maps to:** EU AI Act `Art. 17(1)(m)` (accountability framework), `Art. 26(2)` and `Art. 26(7)`
(oversight competence; informing workers) · ISO/IEC 42001 clauses 5.1–5.3, 9.2; Annex A.2, A.3 ·
NIST AI RMF GOVERN 2, 3, 5 · layers 1 Govern-as-Code and 5 Assurance & Continuous Compliance.
Mappings are illustrative, not a claim of conformity.

## AI literacy as code

### What Article 4 asks after the Omnibus

Article 4 of the EU AI Act has applied since 2 February 2025. As amended by Regulation (EU) 2026/1744,
in force since 27 July 2026, it requires providers and deployers to "take measures to support the
development of AI literacy" of their staff and others operating AI systems on their behalf, and adds
that this "does not require providers or deployers to guarantee any specific level of AI literacy of
any individual" [8][9]. The Commission's Q&A (updated 27 July 2026) says the obligation remains with
no "sufficient" level mandated; no certificate is needed and an internal record of trainings will do;
"other persons" include contractors, service providers and clients; the instructions for use alone
are not enough; and national market-surveillance authorities supervise the rule from 2 August 2026
[10]. That is the position as of 2026-09-24.

The softer wording is no reason to do less. For high-risk deployers the harder duty sits in
`Art. 26(2)`: oversight goes to people with the competence, training and authority to exercise it
[6]. NIST expects AI risk training suited to each person's duties (GOVERN 2.2) [3], and ISO/IEC
42001 addresses competence and awareness in clauses 7.2 and 7.3 [2]. The engineering answer to all
three is literacy as a role-based system with records, not an annual slide deck.

### Role-based curricula

| Persona | Must be able to | Curriculum blocks | Refresh trigger |
|---|---|---|---|
| Board and executives | Set appetite; read the KPI/KRI pack; accept or refuse risk | Terminology; strategy and appetite; provider or deployer role | New law; major incident |
| Product owners | Write a justification memo; tier a use case; own residual risk | Intake and triggers; risk method; policies by stage | Policy change |
| Engineers and data scientists | Build inside the gates; read an eval result; file an exception | Paved path; evals; data acquisition; incident duties | New gate or tool |
| Legal, privacy, compliance | Translate an obligation into a rule and back | The stack; evidence formats; system behaviour | New obligation |
| Operators with oversight duties | Read outputs; override, stop, escalate | The specific system; automation bias; override drill on the real interface | New model version |
| All staff using AI tools | Use approved tools on permitted data; report concerns | Acceptable use; data classes; the concern channel | Annual; new tool |
| Procurement and HR | Spot AI in a purchase; handle AI in people decisions | Intake flag; vendor tiering; employment rules | Template change |

Formats follow the persona: scenario briefings for the board, labs for engineers, simulations for
operators, microlearning with attestation for everyone else.

### Training records and attestation as an access condition

A training record is evidence when it is structured, tied to a system and able to expire
(illustrative):

```json
{ "person": "u-48213", "role": "operator.credit-review",
  "module": "oversight.credit-scorer.v3", "completed": "2026-09-12",
  "assessment": "pass", "systems": ["credit-scorer-02"],
  "expires": "2027-09-12T00:00:00Z", "attested": true }
```

It becomes a control when access depends on it. The identity provider or AI gateway asks the policy
engine before granting access (illustrative `OPA/Rego`):

```rego
package access.ai_tools

import rego.v1

default allow := false

allow if {
  some r in data.training_records[input.user]
  r.module == data.required_module[input.tool]
  r.attested
  time.parse_rfc3339_ns(r.expires) > time.now_ns()
}
```

An operator whose module has expired loses the override console, not only a line in a report; a new
model version bumps the required module, so operators retrain before touching it. The record is
`Art. 4` evidence, the access decision is `Art. 26(2)` evidence, and both land in the evidence store
without a collection sprint.

### Measuring and refreshing literacy

Completion rates measure attendance. Better indicators are coverage by persona, time from joining (or
from a new model version) to a current record, and outcome signals: operators' override rates and
time-to-decide (chapter 04's oversight metrics), the share of exception requests that arrive well
formed, concerns raised per team. Refresh on events (a new law, capability, incident or tool) as well
as on the calendar.

## Governance culture

Controls fail quietly when people route around them; culture is whether they do. Three levers are
within a governance function's reach.

**Champions.** A named champion in each product team, trained in more depth, answers first questions
and first-reviews intakes. Champions scale the second line without adding to its headcount and carry
the paved path into teams that would otherwise meet governance only as a blocked build ([make the
governed path the easiest path](/bok/values-and-principles#make-the-governed-path-the-easiest-path)).

**Incentives.** Measure teams on releases through the paved path, exceptions closed before expiry and
concerns raised and resolved, never on zero incidents, which rewards silence. NIST asks for a
critical-thinking, safety-first mindset and for practices that enable testing, incident identification
and information sharing (GOVERN 4.1, 4.3) [3]; incentives are how that mindset survives a deadline.

**Blameless review.** After an AI incident or near miss, review the system, not the person. Google's
SRE practice defines a blameless postmortem as one that focuses "on identifying the contributing causes
of the incident without indicting any individual or team for bad or inappropriate behavior" [11]. Its
engineering output is a changed gate, eval or policy, filed as a pull request citing the review. A
rising count of reported near misses is usually good news: the alternative is fewer reports, not fewer
failures.

## A channel for raising concerns

Pipelines catch what they were built to see. A data scientist who suspects a benchmark was gamed, an
operator who sees a pattern of harmful outputs, an engineer asked to disable a guardrail before a demo:
these reach the program only if people can raise them safely, outside the chain of command that
created the problem. The law now expects such channels (as of 2026-09-24):

| Regime | Who must act | What it requires |
|---|---|---|
| EU AI Act `Art. 87` with Directive (EU) 2019/1937 [12][13] | Private legal entities with 50 or more workers, through national transposing law | Internal channels and follow-up (Art. 8); acknowledgment within seven days and feedback within three months (Art. 9(1)(b), (f)); no retaliation (Art. 19) |
| California SB 53, Labor Code §1107.1 [14][15] | Frontier developers; the internal-process duty binds large frontier developers | No rule preventing covered employees from disclosing to the Attorney General or other authorities; no retaliation; notice of rights; an anonymous internal process with monthly updates to the reporter, shared with officers and directors at least quarterly |
| ISO/IEC 42001 Annex A.3.3 [2] | Organisations implementing the standard (voluntary) | A process for reporting concerns about AI systems |

Article 87 applies the Whistleblower Directive to reports of AI Act infringements from 2 August 2026
[12]. SB 53, in force since 1 January 2026, protects "covered employees" (those responsible for
assessing, managing or addressing the risk of critical safety incidents) who disclose that a frontier
developer's activities pose "a specific and substantial danger to the public health or safety
resulting from a catastrophic risk" or violate the Act [14][15].

Build the channel like any governed system. Intake accepts anonymous and named reports by more than one
route. Each report becomes a case record with the statutory clocks encoded as timers, not reminders.
Triage routes a possible incident to the [Incident Pipeline](/patterns/incident-pipeline),
a possible infringement to legal, a policy gap to the committee. The reporter's identity is sealed from
the people named, and HR watches for retaliation signals (sudden performance actions, access changes)
around protected reporters. Volumes, clock compliance and outcomes go upward without identities. This
sketches the engineering; it is not advice on any national transposing law.

## KPIs and KRIs for leadership and the board

Leadership needs a few indicators it can trust, computed from live systems rather than self-reported.
A **KPI** says whether the program is doing its job; a **KRI** says whether risk is moving towards the
edge of appetite.

| Indicator | Type | Definition | Produced by |
|---|---|---|---|
| Registry coverage | KPI | Share of discovered AI systems and agents with a registry entry and an owner | Layer 02; [Shadow-AI Discovery](/patterns/shadow-ai-discovery) |
| Unregistered AI found | KRI | Count of running AI with no entry, by tier | Layer 02 discovery |
| Gate coverage | KPI | Share of production releases that passed through an eval gate | Layer 03 |
| Open exceptions by age | KRI | Live exceptions, oldest first; expired ones flagged | Exception register (layer 01) |
| Time to decision | KPI | Median days from intake to go/no-go, by tier | Intake workflow |
| Assessments current | KPI | High-risk systems with a current FRIA or DPIA | Layer 02 |
| Incidents and time to contain | KRI | AI incidents by severity; median time to detect and to contain | Layers 04 and 05 |
| Oversight quality | KRI | Override rate and time-to-decide at human checkpoints | Layer 04 |
| Literacy coverage | KPI | Share of each persona with a current training record | Training records |
| Concern clocks met | KPI | Reports acknowledged within seven days and answered within three months | Concern channel |
| Vendor reassessments overdue | KRI | Tier-1 vendors past their reassessment date | Procurement file |
| Realised risk reduction | KPI | Change in the rate of named failure modes in production | Layer 05 |

The last row matters most and is hardest to fill, which is why it belongs in the board pack from the
start ([value
7](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage)).
Coverage indicators are inputs; chapter 07 ([metrics per level](/bok/maturity-model#metrics-per-level))
shows the engineering metrics beneath them. The board pack is one page: trends for six to eight
indicators, anything outside threshold, decisions the board must take, exceptions above appetite. A
query generates it; a hand-assembled pack drifts from the systems it describes.

## Management review and continual improvement

A management system improves only if someone looks at the evidence on a schedule and changes
something. ISO/IEC 42001 asks for monitoring and measurement, internal audit and management review
(clauses 9.1 to 9.3) and for continual improvement with corrective action (clauses 10.1 and 10.2); read
the standard for the required inputs and outputs [2]. One review can serve several management systems
([integrating ISO/IEC 42001 with 27001, 27701 and 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001),
chapter 22). NIST asks for planned periodic review of the risk
process, with roles and frequency defined (GOVERN 1.5) [3].

Engineer the review to produce changes, not minutes. Inputs: the KPI/KRI pack, audit findings,
incidents and near misses, concerns, changes in law and standards, open corrective actions. Outputs,
recorded as data: a policy diff with an effective date, a threshold change, a resourcing decision, a
corrective action with owner and due date. Track corrective actions the way `OSCAL` tracks a plan of
action and milestones (chapter 04), so each review opens with what was promised and what was done. A
review that changes nothing for two cycles means the evidence is not reaching it, or is not believed.

**Maps to:** EU AI Act `Art. 4` (AI literacy), `Art. 26(2)` (oversight competence), `Art. 87`
(reporting of infringements) · Directive (EU) 2019/1937 · California SB 53 (Labor Code §1107.1) ·
ISO/IEC 42001 clauses 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.3.3 · NIST AI RMF GOVERN 1.5, 2.2, 4 ·
layers 1 Govern-as-Code and 5 Assurance & Continuous Compliance.

## Strategy, value and whether to use AI at all

Governance usually starts after someone has decided to build. It should start a step earlier. The
NIST AI RMF expects the goals for AI and the business value of each use to be documented (MAP 1.3,
1.4), benefits and costs to be examined, including the non-monetary costs of errors (MAP 3.1, 3.2),
and, after mapping, an "initial go/no-go decision about whether to design, develop, or deploy an AI
system"; later it asks again whether development or deployment should proceed (MANAGE 1.1) [3].

Make the question a required field. A justification memo at intake (illustrative):

```yaml
use_case: refund-triage-assistant
owner: team-support-platform
problem: "Refund requests wait days for a first answer"
non_ai_alternative: "Rules engine plus extra staff at peak"
why_ai: "Free-text requests; the rules engine misroutes a large share"
benefit_metric: "Median time to first answer"
who_bears_errors: "Customers wrongly refused a refund"
contest_route: "Human review on request, within two working days"
reversible: true
kill_criteria: "Wrong-refusal rate above the tier threshold for two weeks"
```

Five questions decide most cases. Is there a non-AI alternative at acceptable cost? Can the benefit be
measured, and by whom? Who bears the errors, and can they contest them? Is the decision reversible?
What would make us stop? A use case that cannot answer the last question is not ready for a gate,
because there is no threshold to enforce.

Rolled up, the memos are the AI portfolio: where the organisation spends, which risks it carries, which
benefits it has measured. They also answer the charge that governance only slows things down. "Time to
decision" is a program KPI, and a paved path that takes a low-risk use case from intake to production
in days is how governance enables delivery rather than taxing it.

## Standing up a program without engineering capacity

Many organisations that need a program build no AI at all; they buy it. The engineering-first route of
chapter 04 ([the minimum viable stack for a team of
one](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)) assumes a pipeline to put gates in. A
buyer still has pipelines: procurement, identity and expenses. Build on those.

| Pillar | Minimum artefact | Enforced through |
|---|---|---|
| Charter and scope | Program charter; committee charter | Executive sponsor's approval |
| Inventory | Registry with owner, vendor, data classes and tier | Procurement intake; single sign-on app catalogue; expense review |
| Policy set | Acceptable use; AI intake; third-party AI | Purchase approval; gateway or browser controls |
| Roles | Named owner per system; committee membership | Required registry field |
| Literacy | Role-based modules; training records | Tool access conditional on attestation |
| Metrics | Five indicators from the table above | Monthly query over registry and procurement data |
| Review cadence | Quarterly management review | Decisions recorded as data |

A first 90 days: charter, committee, acceptable-use policy and an inventory seeded from procurement and
the sign-on catalogue (days 1 to 30); the AI flag in purchase requests, tiering of what is already
bought, modules for operators of the riskiest systems (days 31 to 60); the first KPI pack, the first
management review and a decision on which control to automate first (days 61 to 90). The Commission's
Q&A notes that Article 4 mandates no specific governance structure [10]; size the program to what the
organisation runs and grow the code with the portfolio. Chapter 13 sets how much of the risk loop each
kind of organisation runs
([proportionate governance](/bok/risk-management#proportionate-governance-tailoring-the-loop)), and
the templates page has starter [committee, RACI and AI policy sections](/resources/templates#tpl-kit).
## Policies across the lifecycle

### Policy, standard, procedure, code

Policy documents fail by being too vague to enforce or too detailed to keep current. A four-level
hierarchy gives each level one job.

| Level | Answers | Approved by | Changes | Example |
|---|---|---|---|---|
| Policy | Why and what: principles, appetite, scope | Board or committee | Rarely | "No AI system reaches production without an owner and a passed eval gate." |
| Standard | Measurable requirements per tier | Committee or delegate | Quarterly | "Tier 2 and 3 systems score at least 0.95 on the injection suite." |
| Procedure | How, step by step | Function owner | As needed | "Run the gate locally; attach the result to the registry entry." |
| Policy as code | The enforced rule | Code review with the policy owner | Every change is a pull request | `eval.injection-floor.v4` |

ISO/IEC 42001 asks for an AI policy (clause 5.2) and has controls on policies related to AI (Annex A.2)
[2]; NIST asks that AI risk policies and procedures be in place, transparent and implemented
effectively (GOVERN 1) [3]. The hierarchy adds one engineering rule: every rule in code carries the ids
of the standard and policy it implements, so a reader can walk from a failed build to the sentence the
board approved.

### What policy requires at each stage

Each stage has a minimum requirement, a gate that enforces it and the evidence it leaves. Chapters 14
and 15 treat the build and run stages in depth.

| Stage | Policy requires | Gate that enforces it | Evidence | Layer |
|---|---|---|---|---|
| Intake | Justification memo; risk tier; prohibited-use screen; review triggers | Intake writes a registry stub; no stub, no deploy | Registry entry; tier record | 1 · 2 |
| Design | [Threat model](/patterns/ai-threat-model); oversight design; impact assessment when triggered | Design review as a required check | Threat model; FRIA/DPIA reference | 1 · 3 |
| Data | Acquisition record; lawful basis; licence; quality and bias checks | [Pipeline refuses a dataset without a valid data card](/patterns/dataset-admission-gate) | Data card; lineage | 2 · 3 |
| Build | Approved models and platforms; versioned prompts, retrieval and tools; AIBOM | CI policy checks; model allowlist | AIBOM; policy verdicts | 1 · 2 |
| Test | Required eval categories and thresholds by tier; red teaming for higher tiers | Eval gate | Eval results | 3 |
| Release | Complete deployment package; approvals; transparency notices | Admission control reads the registry | Release record; model card | 1 · 2 · 5 |
| Operate | Monitoring; oversight; incident definition and severity scale; logging | Guardrails; alerts; incident pipeline | Traces; guardrail events; incident records | 4 · 5 |
| Change | Material-change triggers for model, prompt, data and tool scope | Gates re-run on change; registry version bump | Diff; new eval results | 1 · 3 |
| Retire | Revoke identities, archive evidence, delete or retain data | Registry status `retired`; identity revoked | Decommission record | 2 · 4 · 5 |

Three stages are often missing from policy sets. **Operate** needs an incident definition wider than
the law's. The AI Act's "serious incident" covers death or serious harm to health, serious and
irreversible disruption of critical infrastructure, infringement of fundamental-rights obligations and
serious harm to property or the environment [16]; most incidents a program must learn from sit below
that line (a biased batch, a leaked prompt, a tool call outside scope). Route every severity through
one pipeline and let only the top class start a statutory clock (chapter 17, [Incidents, issues and
root causes](/bok/incidents#a-severity-scale-mapped-to-the-clocks)). High-risk deployers must also inform the provider and suspend use when
they have reason to consider the system presents a risk (`Art. 26(5)`) [6]. **Change** needs
triggers, because a prompt edit or a new retrieval source can change behaviour as much as a new model.
**Retire** needs a [runbook](/patterns/deactivation-localisation-retirement-runbook): NIST asks for safe decommissioning "in a manner that does not increase
risks" (GOVERN 1.7) [3], which means revoking every identity and credential, marking the registry
entry retired, archiving the evidence for its retention period and applying retention rules to
training and derived data.

### Policy as code: one source, two outputs

The drift between a policy PDF and the check that enforces it is where auditors find their findings.
Write each rule once, as data, and compile it twice: into the prose people read and the check the
pipeline runs. The source (illustrative):

```yaml
id: AIP-07
title: Evaluation before release
owner: ai-governance-committee
effective: 2026-10-01
maps_to: ["EU AI Act Art. 15", "ISO/IEC 42001 A.6", "NIST AI RMF MEASURE"]
rules:
  - rule_id: eval.injection-floor.v4
    applies_to_tiers: [2, 3]
    suite: injection-resistance.v4
    threshold: 0.95
    exceptions: register
```

The prose compiler renders: "AIP-07.1. A tier 2 or tier 3 AI system is released only if its latest
`injection-resistance.v4` run scores at least 0.95. Exceptions follow the exception register. Owner:
AI governance committee. Effective 1 Oct 2026." The code compiler renders the check (illustrative
`OPA/Rego`):

```rego
package aip07

import rego.v1

deny contains msg if {
  input.system.tier in {2, 3}
  r := input.evals["injection-resistance.v4"]
  r.score < 0.95
  not exception_active(input.system.id, "eval.injection-floor.v4")
  msg := sprintf("AIP-07 eval.injection-floor.v4: %s scored %v, below 0.95", [input.system.id, r.score])
}

exception_active(sys, rule) if {
  some e in data.exceptions
  e.system == sys
  e.rule_id == rule
  time.parse_rfc3339_ns(e.expires) > time.now_ns()
}
```

Both outputs come from one commit, so the published policy and the enforced rule cannot disagree. The
same source feeds the [Framework Crosswalk](/patterns/framework-crosswalk) and, for agents,
a [Policy Card](/patterns/policy-card). Tests prove the rule fires on a violating input
and passes a clean one, as layer 01 requires.

## Updating the policies you already have

Most organisations do not need a new policy for every AI concern. They need their privacy, security,
data governance and intellectual-property policies to see AI. A gap assessment finds where they do not.

1. **Inventory** every policy that touches AI systems or their data, including procurement, HR,
   records and acceptable use.
2. **Test each against the five objects** (model, system, agent, data, organisation) and the
   lifecycle stages: does it name the object, contain a rule that applies to it, and say what evidence
   shows the rule is followed?
3. **Decide: extend or create.** Extend when the existing owner and control fit (a retention rule that
   only needs model artefacts added). Create when a new object needs a new owner (agent identity has no
   home in a classic access-control policy).
4. **File each gap as data** (policy, clause, gap, decision, owner, due date, evidence), so the gap
   register is a query and its closure a KPI.

| Policy | Typical AI gaps | Typical additions | Evidence |
|---|---|---|---|
| Privacy | Lawful basis for training versus inference; purpose limitation on reuse; what models memorise; notices; rights over models and outputs; retention of training and derived data | Dataset purpose tags; DPIA triggers for AI; procedure for [rights requests against models](/patterns/rights-requests-against-models) | DPIA; data card; rights-request log |
| Security | Prompt injection, poisoning, model extraction and supply-chain threats missing from the risk assessment and playbooks; no trusted model sources | AI threats in the ISMS risk assessment; AI incident playbooks; model and dataset allowlist | Threat model; red-team results; allowlist |
| Data governance | Lineage without provenance; scraped, brokered and synthetic data unlabelled; no retention by layer | Acquisition policy (below); provenance fields; retention for raw data, features, labels and weights | Data card; lineage graph |
| Intellectual property | Training rights and text-and-data-mining opt-outs; use of outputs; trade secrets in prompts; open-weight licences; vendor indemnities | Rights review per dataset; output-use rules; prompt rules by data class; model licence review | [Rights ledger](/patterns/training-data-rights-ledger); licence records |

Three notes. For **security**, the agentic threat catalogue (goal hijack, tool misuse, identity and
privilege abuse, rogue agents) is the checklist to add to the existing threat model [17]. For **data
governance**, keep a contrast pair straight: *lineage* is the path data took through your pipelines;
*provenance* is where it came from and on what terms. Perfect lineage over unknown provenance is still
ungoverned. For **intellectual property**, EU law lets rightholders reserve works from text and data
mining "in an appropriate manner, such as machine-readable means in the case of content made publicly
available online" (Directive (EU) 2019/790, Art. 4(3)) [18], and general-purpose model providers must
have a policy to identify and comply with those reservations (`Art. 53(1)(c)`) [19]. Chapters 19 and
20 ([Privacy and data protection law applied to AI](/bok/privacy-and-ai#principles-applied-to-ai), [Other
law that already applies to AI](/bok/existing-law#how-to-read-this-chapter)) cover the law; the policy's job is to make each rule checkable.

## A data acquisition policy

Most data-governance failures are decided at acquisition: a scrape nobody scoped, a broker's dataset
with no provenance, labels produced under conditions nobody checked. ISO/IEC 42001 has an Annex A
control on the acquisition of data (A.7.3) [2]. The policy names acceptable sources and the minimum
conditions for each, and makes every condition a field in the acquisition record.

| Source | Minimum conditions | Evidence field |
|---|---|---|
| First-party data collected for another purpose | Compatibility of purpose assessed; notice updated; DPIA if triggered | Purpose tag; lawful basis |
| Web scraping | Sensitive sources excluded; machine-readable reservations and exclusion files respected; opt-out list honoured; collection bounded in time | Crawler configuration hash; exclusion and opt-out list versions |
| Data brokers and licensed datasets | Provenance chain; lawful-basis warranties; licence covering AI training; audit right; deletion on request | Contract id; provenance statement |
| Labelled or annotated data | Written guidelines; pilot; agreement between annotators above a threshold; pay and conditions standard; quality assurance | Guideline version; agreement score; supplier attestation |
| Data shared by a partner | Agreement covering purpose, retention, onward sharing, security, deletion, breach notice and audit | Agreement id |
| Synthetic data | Generator and seed data recorded; labelled as synthetic; re-identification test | Generator version; test result |

The scraping row follows the European Data Protection Board's Opinion 28/2024, whose mitigating
measures include excluding certain sources and data categories, respecting "robots.txt or ai.txt files
or any other recognised mechanism" that objects to scraping, and a controller-managed opt-out list
[20]. The labelling row follows the Partnership on AI's guidance on sourcing data enrichment work,
which covers provider selection, pilots, clear instructions, payment terms, communication with workers,
quality assurance and offboarding [21]. Annotators' conditions are a governance matter: labels produced
in a rush under unclear instructions become the noise and bias the eval suite later has to find.

Enforce at the pipeline boundary: no dataset enters a training, fine-tuning or retrieval pipeline
without an acquisition record that passes schema validation, and the record flows into the data card
and the [AIBOM](/patterns/aibom) (see [data governance across the
stack](/bok/the-stack#data-governance-across-the-stack)).

## Third-party AI policy

Most AI an organisation runs, it bought. Chapter 04 explains how the stack degrades for procured AI
([third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)), and chapter 05 gives the
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate). ISO/IEC
42001 covers third-party and customer relationships in Annex A.10 [2]; NIST asks for policies on
third-party AI risk, including infringement of third-party intellectual property, and for contingency
processes for failures in high-risk third-party data or systems (GOVERN 6.1, 6.2) [3].

**Procurement intake.** Every purchase request carries an AI flag: does the product use AI, process
our data with AI, train on our data, act on our systems, or make or support decisions about people? A
yes routes it to tiering. The quieter case is AI arriving inside a product already bought: a release
note adding an AI feature to an existing contract triggers the same intake.

**Vendor tiering.** Tier by criticality, data sensitivity, autonomy and regulatory context, and scale
the assessment to the tier.

| Tier | Typical profile | Assessment | Reassessment |
|---|---|---|---|
| 1 | Decisions about people; high-risk use; agents with write access; special-category data | Full due diligence; boundary evals; full clause set; committee approval | Annual and on triggers |
| 2 | Internal productivity on confidential data | Questionnaire with evidence; standard clause set | Every two years and on triggers |
| 3 | No confidential data; no decisions about people | Light check; covered by acceptable use | On renewal |

**Contract terms as controls.** A clause is a control when it creates something you can monitor. The
Commission's community of public buyers publishes model contractual AI clauses in a high-risk and a
non-high-risk version, voluntary and deliberately silent on IP, payment and data protection; the
version on its page is dated 29 September 2023 (as of 2026-09-24) [22]. They are a sound starting
library for private buyers too.

| Clause | Control it creates | Evidence or monitor |
|---|---|---|
| Disclosure of AI use and sub-processors | Inventory completeness; fourth-party map | Vendor register; supplied AIBOM |
| No training on customer data without opt-in | Purpose limitation | Contract flag; attestation; configuration check |
| Notice of material change (model, version, behaviour) | Trigger for re-evaluation | Notice starts a boundary-eval re-run |
| Incident notification window | Input to your own incident clock | Notice timestamp in the incident pipeline |
| Evidence and audit rights | Collected evidence | Model card, eval results and certificates in the evidence store |
| Bias testing and remediation duty | Fairness evidence for your use | Vendor test reports |
| Deactivation, data return and exit | A contractual kill switch | Tested exit runbook |
| Liability and indemnity, including IP | Risk transfer, not risk reduction | Contract register |

**Supply chain and open source.** The foundation model under a vendor's product is a dependency you
inherit; map these fourth parties. The value chain can also change your role: under `Art. 25`, a
distributor, importer, deployer or other third party that puts its name or trademark on a high-risk
system, substantially modifies one, or changes a system's intended purpose so that it becomes high-risk
is treated as its provider [23]. Open-weight models and open datasets go through the same intake:
licence and use restrictions reviewed, provenance recorded, artefacts scanned and pinned before loading,
results in the AIBOM. Reassess on events, not only on renewal: an incident, an ownership change, a new
model version, public controversy or regulatory action, a change in the law.

**People.** AI used for recruitment and selection, promotion or termination, task allocation, or
monitoring and evaluating workers is high-risk under Annex III point 4 [24], with the
worker-information duty of `Art. 26(7)` for deployers [6]. Annotators, contractors and outsourced
reviewers who handle your data are part of the supply chain, under the acquisition conditions above
[21].

## Acceptable use of AI by staff

The glossary defines shadow AI as AI running in production without registering. Staff use of
unapproved tools is its everyday twin: an employee pasting a customer file into a public chatbot. An
acceptable-use policy (AUP) covers approved tools, prohibited inputs by data class, the duty to review
outputs, disclosure where outputs reach customers, logging, the attestation required before access and
proportionate consequences.

| Data class | Public AI tool | Sanctioned AI gateway | Approved internal system |
|---|---|---|---|
| Public | Allowed | Allowed | Allowed |
| Internal | Not allowed | Allowed, logged | Allowed |
| Confidential or customer data | Not allowed | Approved use cases only; logged; redacted | Allowed within scope |
| Special-category or regulated data | Not allowed | Only with a DPIA-backed use case | Allowed within scope |
| Secrets, credentials, restricted code | Not allowed | Not allowed | Per security standard |

Enforce with the [gateway](/patterns/sanctioned-ai-gateway), not the handbook: approved tools behind single sign-on and a gateway that
applies data-class rules and logs use; access conditional on a current AUP attestation (the literacy
gate above); discovery of unapproved tools through identity, network and expense data (the
[Shadow-AI Discovery](/patterns/shadow-ai-discovery) pattern). When discovery finds an
unapproved tool, offer a way in (register, tier, approve or replace) before a sanction. People use
unapproved tools because the approved path is slower; the fix is usually a better path.

> **Example (illustrative)**
> A legal team starts using a public drafting assistant for contract summaries. Discovery flags the
> traffic. Rather than block the domain, the program runs the tool through procurement intake, signs
> an enterprise agreement with no training on customer data, routes it through the gateway under the
> confidential-data rule, and adds a one-page module to the legal team's curriculum. Usage moves to
> the sanctioned route within weeks, because it is now the easiest one.

**Maps to:** EU AI Act `Art. 25` (value chain), `Art. 26` (deployer duties), `Art. 53(1)(c)` (GPAI
copyright policy), Annex III point 4 (employment) · Directive (EU) 2019/790 `Art. 4(3)` · ISO/IEC
42001 clause 5.2; Annex A.2, A.7.3, A.10 · NIST AI RMF GOVERN 1, 6; MAP 1, 3; MANAGE 1.1 · layers 1
Govern-as-Code, 2 Inventory & Transparency and 5 Assurance & Continuous Compliance.

## What you can do this week

1. **Write the committee charter on one page**, listing the four decision types the committee alone
   takes and stating that gates enforce everything else.
2. **Create the exception register** as a file in the policy repository, point one gate at it and set
   a maximum expiry.
3. **Gate one tool on training**: make access to your riskiest system's override console, or to your
   AI gateway, conditional on a current training record.
4. **Generate three board indicators from live data**: registry coverage, unregistered AI found and
   open exceptions by age.
5. **Run the gap assessment on two policies** (privacy and security) against the five objects, and
   file each gap as a row with an owner.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(a) strategy for regulatory compliance; Art. 17(1)(m) accountability framework; Art. 17(2) proportionality, as amended by Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (referenced by number only: clauses 5.1–5.3, 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.2, A.3.2, A.3.3, A.7.3, A.10). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1, 1.5, 1.7, 2.1–2.3, 3.1, 4.1, 4.3, 5.1, 6.1–6.2; MAP 1.3–1.4, 3.1–3.2; MANAGE 1.1; initial go/no-go decision after MAP). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[5] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance; CFO Act agency AI Governance Boards within 90 days, chaired at Deputy Secretary level, with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per instructions; 26(2) oversight by persons with competence, training and authority; 26(5) monitoring, informing the provider and suspension; 26(7) informing workers' representatives and affected workers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[7] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4 (as amended by Reg. (EU) 2026/1744: providers and deployers "take measures to support the development of AI literacy"; no guaranteed level for any individual; support from the Commission and Member States; Board recommendations; applies since 2 Feb 2025 under Art. 113(a)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4 (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] AI Literacy: Questions & Answers (obligation remains, no specific or "sufficient" level mandated; no certificate needed; internal record of trainings; "other persons" include contractors, service providers and clients; no specific governance structure mandated; instructions for use alone not sufficient; supervision by national market-surveillance authorities from 2 Aug 2026). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (John Lunney, Sue Lueder), in Site Reliability Engineering. Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 87 (Directive (EU) 2019/1937 applies to the reporting of infringements of the AI Act and the protection of reporting persons; applies from 2 Aug 2026 under Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_87 (verified: primary)
[13] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8(1) and 8(3) internal channels for private entities with 50 or more workers; Art. 9(1)(b) acknowledgment within seven days; Art. 9(1)(f) feedback within three months; Art. 19 prohibition of retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[14] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025, a regular-session statute and so in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); Labor Code §§1107–1107.2: "covered employee", no rule preventing disclosure, no retaliation, notice of rights, anonymous internal process for large frontier developers with monthly updates and quarterly sharing with officers and directors). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[15] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3(49) (definition of "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[17] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[18] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(1) text-and-data-mining exception; Art. 4(3) reservation by rightholders, by machine-readable means for content online). Publications Office of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng#art_4 (verified: primary)
[19] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53(1)(c) (GPAI providers' copyright policy, incl. identifying and complying with Art. 4(3) reservations). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[20] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (paras 104–106: web-scraping mitigations incl. excluding sources and data categories, respecting robots.txt or ai.txt, opt-out lists). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en (verified: primary)
[21] Responsible Sourcing of Data Enrichment Services (provider selection, pilots, instructions, payment terms, communication with workers, quality assurance, offboarding). Partnership on AI. 2021-06-16. https://partnershiponai.org/paper/responsible-sourcing-considerations/ (verified: primary)
[22] EU model contractual AI clauses (MCC-AI) to pilot in procurements of AI (high-risk and non-high-risk versions; voluntary; exclude IP, payment and GDPR terms). Public Buyers Community, European Commission. 2023-09-29. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/eu-model-contractual-ai-clauses-pilot-procurements-ai (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25(1) (a value-chain actor becomes the provider when it puts its name or trademark on a high-risk system, makes a substantial modification, or modifies the intended purpose so that the system becomes high-risk). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[24] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 4 (employment, workers' management and access to self-employment: recruitment and selection; decisions on work relationships, task allocation, monitoring and evaluation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
