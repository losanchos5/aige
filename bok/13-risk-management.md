# 13. Where risk management sits

> Risk management is the loop that tells every other control how hard to bite: identify, assess,
> treat and monitor, run on the five layers and seven workflows, with the risk register as evidence.

## What this chapter settles

The book has leaned on risk without giving it a home. Chapter 03 says every control should
[start from a named failure mode or harm](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm);
chapter 04 warns against a risk review board that rates findings but cannot stop a launch; chapter
08 names a "risk register as code" as the artefact behind `Art. 9` without defining it. None of them
says where risk decisions are made, on what scale, by whom, or how a decision becomes a threshold a
pipeline can enforce. This chapter does.

The claim is short. Risk management is not a sixth layer and not a committee beside the stack. It is
the loop that sets the parameters of every other control: which systems get which gates, how high an
eval threshold sits, when a person must approve an action, and who may sign for the risk that is
left. The loop has four steps (identify, assess, treat, monitor). Each step produces an artefact on
one of the five layers and is owned by one of the seven workflows of chapter 06. Its evidence record
is the **risk register**, kept as versioned data rather than as a spreadsheet.

Three contrasts keep the scope honest (chapter 01 has the full cluster). **Enterprise risk
management** aggregates every risk an organisation runs; AI risk management feeds it, as the NIST AI
RMF asks [1]. **Model risk management** validates models in the banking tradition; in the United
States its founding guidance, SR 11-7, was superseded on 17 Apr 2026 by interagency guidance that
tailors the practice to each bank's model risk profile, size and complexity [2]. This discipline
borrows the tailoring and adds agents, runtime control and continuous evidence. **AI safety
research** asks whether a capability is dangerous in principle; this chapter decides what one
deployment may do, and proves it.

## Risk, defined for engineers

Two definitions anchor the chapter. The EU AI Act defines **risk** as "the combination of the
probability of an occurrence of harm and the severity of that harm" [3]. The NIST AI RMF uses the
same shape, "the composite measure of an event's probability of occurring and the magnitude or
degree of the consequences", and allows those consequences to be positive or negative [1]. This
book works on the negative side: harm to people, to their rights, to the organisation and to the
systems around it. The shared vocabulary comes from the ISO risk family, whose current vocabulary
standard is ISO 31073:2022; it replaced ISO Guide 73:2009, which is now withdrawn [4].

Each term below has an artefact that holds it; that is the test that a term does work.

| Term | Meaning in this book | Where it lives |
|---|---|---|
| **Risk source** | Anything that can give rise to risk: a dataset, a tool grant, an adversary, a user group | Register `source`; AIBOM; threat model |
| **Inherent risk** | The rating before any control is counted | Register `inherent` |
| **Residual risk** | The rating after the controls that have evidence of working | Register `residual` |
| **Risk appetite** | How much risk, and of which kinds, the organisation is prepared to take on for its objectives | Appetite data file (layer 01) |
| **Risk tolerance** | How much of a given risk the organisation will bear to reach an objective; the bound a gate enforces | Tier thresholds (layer 01) |
| **Treatment** | The option chosen (avoid, mitigate, transfer, accept) and the controls that carry it | Register `treatment`; control ids |
| **Acceptance** | A named, signed and expiring decision to carry a residual risk | Acceptance record (layer 05) |

AI makes each of these harder to pin down. NIST lists why: third-party components, emergent risks,
no agreed metrics, ratings that shift across the lifecycle, lab results that differ from production,
opacity and no human baseline [1]. So every rating is provisional, recomputed from evidence (an
eval result, a telemetry signal, an incident), not re-argued in a meeting.

## The loop: identify, assess, treat, monitor

ISO 31000:2018 gives the generic process: communicate and consult; set scope, context and criteria;
assess (identify, analyse, evaluate); treat; monitor and review; record and report [5]. The
2018 edition is current but flagged for revision, with a successor at committee-draft stage as of
2026-09-24 [5]. ISO/IEC 23894:2023 is the AI-specific guidance for organisations that
develop, produce, deploy or use AI, customisable to any organisation and context [6]. Its
clauses follow the ISO 31000 structure, as NIST's crosswalk between the two shows [7].

The EU AI Act turns the same loop into law for high-risk systems. Article 9 requires a risk
management system to be "established, implemented, documented and maintained", run as a continuous
iterative process across the lifecycle, with four steps: identify and analyse the known and
reasonably foreseeable risks to health, safety or fundamental rights; estimate and evaluate the risks
under intended use and reasonably foreseeable misuse; evaluate further risks from post-market
monitoring data; and adopt targeted risk management measures [8]. The Digital Omnibus left Article
9 unamended [9]; for Annex III systems it applies from 2 Dec 2027 [10]. It binds the
provider; the deployer runs its own loop through `Art. 26` monitoring and, where it applies, the
`Art. 27` FRIA (chapter 08). A legal reading of Article 9, written against the 2021 proposal, is a
useful guide to what each step asks [11]. No harmonised standard for AI risk management is yet
cited in the Official Journal [12]; the draft that would answer Article 9, prEN 18228, is tracked in
[the JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme) (chapter 22).

The four steps compress ISO's activities: **identify** covers scope, context, criteria and
identification; **assess** covers analysis and evaluation; **monitor** covers review, recording and
reporting. Communication and consultation runs through all four, here as stakeholder mapping.

| Step | ISO/IEC 23894 clause (per NIST crosswalk) | NIST AI RMF | EU AI Act `Art. 9` | Primary artefact |
|---|---|---|---|---|
| **Identify** | 6.3 scope, context, criteria; 6.4.2 identification | MAP 1–5; GOVERN 5 | 9(2)(a) | Use-case risk profile; stakeholder map; register entry |
| **Assess** | 6.4.3 analysis; rest of 6.4 | MAP 5.1; MEASURE 1–2 | 9(2)(b) | Matrix rating; eval results as likelihood evidence |
| **Treat** | 6.5 treatment | MANAGE 1–3 | 9(2)(d); 9(5) | Controls linked to the risk; acceptance record |
| **Monitor** | 6.6 monitoring and review; 6.7 recording and reporting | MEASURE 3–4; MANAGE 4 | 9(2)(c) | Telemetry re-rating; incident links; review log |

### The loop on the five layers

The loop does not add a layer. It gives each existing layer a risk job, and each job leaves an
evidence record that the layer above can read.

| Layer | Its risk job | Risk artefact | Evidence record |
|---|---|---|---|
| **01 Govern-as-Code** | Holds appetite, tolerance, scales and tier rules as data; blocks what exceeds them | `appetite.yaml`; gate policy | Policy verdict that cites the risk id and band |
| **02 Inventory & Transparency** | Gives every risk an object: registry id, owner, tier, affected stakeholders | Registry entry; use-case risk profile; AIBOM | Registry record with tier and linked risk ids |
| **03 Evals & Red Teaming as Evidence** | Measures likelihood; finds risks nobody listed | Eval suites with thresholds set by tier; red-team findings | Eval result filed against the risk and the version |
| **04 Runtime Controls & Observability** | Treats at runtime; detects a risk becoming real | Guardrails; human-in-the-loop gates; scoped identity; kill switch | Guardrail events; approval logs; traces |
| **05 Assurance & Continuous Compliance** | Records, re-rates and reports; holds acceptances | Risk register as data; acceptance records; incident links | Register history; signed acceptances; review log |

Evidence flows up, as everywhere in the stack. A residual rating is a claim that a control works; it
is credible only if the control's id resolves to a policy verdict, eval result or guardrail event
from the current review period. A residual rating whose control has no evidence is inherent risk
with a better label.

### The loop in the seven workflows

Each workflow of chapter 06 owns part of the loop; the system owner stays accountable for each risk
end to end.

| Workflow | Risk step | What it produces |
|---|---|---|
| [Intake and classification](/bok/the-role#intake-and-classification) | Identify | Use-case risk profile; tier; first register entries; stakeholder map |
| [Inventory and registry](/bok/the-role#inventory-and-registry) | Identify | Registry id, owner and tier for every risk; unregistered systems as unassessed risk |
| [Evals and red teaming as evidence](/bok/the-role#evals-and-red-teaming-as-evidence) | Assess | Likelihood evidence; new risks from red-team findings |
| [Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates) | Treat | Appetite compiled into gate rules; deploy denied on unaccepted residual risk |
| [Runtime monitoring and incidents](/bok/the-role#runtime-monitoring-and-incidents) | Treat, monitor | Runtime controls; signals that re-rate risks; incident links |
| [Assurance and audit evidence](/bok/the-role#assurance-and-audit-evidence) | Monitor | The register as evidence; acceptance and review records; reports |
| [Regulatory translation](/bok/the-role#regulatory-translation) | Identify, treat | Obligations as risk sources and as required treatments |

## NIST AI RMF and ISO/IEC 23894 on the stack

The NIST AI RMF 1.0 splits risk work into four functions, each broken into categories and
subcategories. GOVERN applies across the whole process; MAP, MEASURE and MANAGE apply per system and
per lifecycle stage [1]. Chapter 08 maps the functions to layers; the table below goes down to
the 19 categories and the subcategories this chapter builds on (paraphrased; the ids are NIST's; the
layer column is this book's illustrative reading). Chapter 22 walks
[the 19 NIST AI RMF categories](/bok/principles-and-standards#the-core-19-categories) in full.

| Category | Subcategories this chapter uses | Layer | Artefact |
|---|---|---|---|
| GOVERN 1 | 1.3 level of risk activity set by risk tolerance; 1.5 review frequency; 1.6 inventory | 1 · 2 | Appetite data; tier rules; registry |
| GOVERN 2 | 2.1 roles and lines of communication; 2.3 executive leadership owns AI risk decisions | 1 · 5 | Acceptance-authority table; RACI |
| GOVERN 3 | 3.2 roles for human-AI configurations and oversight | 1 · 4 | Oversight design; approval-gate configuration |
| GOVERN 4 | 4.2 teams document risks and impacts; 4.3 testing, incident identification, information sharing | 3 · 5 | Register; incident pipeline |
| GOVERN 5 | 5.1 feedback from people outside the team; 5.2 adjudicated feedback into design | 2 | Stakeholder map; feedback channel |
| GOVERN 6 | 6.1 third-party policies; 6.2 contingency for failures in high-risk third-party systems | 2 · 5 | Due-diligence gate; AIBOM |
| MAP 1 | 1.1 intended purpose and context; 1.5 risk tolerances determined and documented | 1 · 2 | Use-case risk profile; appetite data |
| MAP 2 | 2.1 task and method; 2.2 knowledge limits and human oversight | 2 | Tier; model card |
| MAP 3 | 3.2 costs of errors against risk tolerance; 3.5 human oversight processes | 2 · 3 | Benefit and cost note; benchmark results |
| MAP 4 | 4.1 component and legal risks; 4.2 internal controls per component | 2 | AIBOM-linked risks |
| MAP 5 | 5.1 likelihood and magnitude of each impact; 5.2 regular engagement | 2 · 3 | Matrix ratings; stakeholder log |
| MEASURE 1 | 1.1 most significant risks measured first, unmeasured ones documented; 1.3 independent assessors | 3 | Eval plan per risk |
| MEASURE 2 | 2.6 residual negative risk within tolerance, fails safely; 2.7 security; 2.11 fairness | 3 | Eval results; red-team findings |
| MEASURE 3 | 3.1 existing, unanticipated and emergent risks; 3.3 user feedback and appeal | 4 · 5 | Telemetry re-rating; feedback channel |
| MEASURE 4 | 4.3 improvements or declines from field data | 3 · 5 | Suite coverage review |
| MANAGE 1 | 1.1 go or no-go; 1.2 prioritise by impact, likelihood, resources; 1.3 mitigate, transfer, avoid or accept; 1.4 residual risks documented | 1 · 5 | Gate decision; register treatment; acceptance record |
| MANAGE 2 | 2.1 non-AI alternatives weighed; 2.3 response to a previously unknown risk; 2.4 supersede, disengage or deactivate | 4 | Substitution record; kill switch |
| MANAGE 3 | 3.1 third-party risks monitored; 3.2 pre-trained models monitored | 2 · 4 | Vendor re-assessment; drift monitoring |
| MANAGE 4 | 4.1 post-deployment monitoring plans; 4.3 incidents communicated | 4 · 5 | Monitoring plan; incident pipeline |

The AI RMF also offers **profiles**: a current profile of how risk is managed today, a target
profile of the outcomes wanted, and the gap between them as the action plan [1]. The tailoring
matrix later in this chapter makes the same move.

### ISO 31000, ISO/IEC 23894 and ISO/IEC 42001

Three ISO documents, three jobs. ISO 31000 is generic guidance for any risk [5]; ISO/IEC
23894 applies it to AI [6]; ISO/IEC 42001 is the certifiable management-system standard,
whose clauses on AI risk assessment (6.1.2), AI risk treatment (6.1.3) and AI system impact
assessment (6.1.4), and their operation (8.2 to 8.4), require the loop to exist and run [13].
NIST's crosswalk shows that its functions and the 23894 clauses describe one process [7].

| AI RMF function | ISO/IEC 23894 clauses in NIST's crosswalk | Layer |
|---|---|---|
| GOVERN | 5.2 leadership and commitment; 5.3 integration; 5.4 design (5.4.1 to 5.4.5: context, commitment, roles, resources, communication) | 1 · 2 |
| MAP | 5.4.1 context; 6.3.2 to 6.3.4 scope, context and risk criteria; 6.4.2 identification (6.4.2.3 risk sources, 6.4.2.4 events and outcomes, 6.4.2.6 consequences); 6.4.3 analysis; 5.7 improvement; 6.7 | 2 · 3 |
| MEASURE | 6.3.4 risk criteria; 6.4.2.5 identification of controls; 6.4.3.2 consequences; 6.4.3.3 likelihood; 6.6 monitoring and review; 6.7 | 3 |
| MANAGE | 5.5 implementation; 5.7 improvement; 6.5 treatment (6.5.2 options, 6.5.3 plans); 6.6; 6.7 | 4 · 5 |

NIST's crosswalk was a January 2023 draft for comment, mapped against the final draft of 23894
[7]; check the clause numbers against the published 2023 text before citing them in an audit
(verify).

> **Note** A crosswalk is an index, not a control (see the
> [Framework Crosswalk](/bok/patterns#pattern-framework-crosswalk) pattern). The row that counts is
> the one whose artefact exists and emits evidence.

## Identifying risk: sources, factors and stakeholders

Identification is where risk work fails quietly: a register written in a workshop lists what the
room thought of, and the rest stays invisible until an incident names it. Engineering it means a
systematic list of sources, contributing factors captured as data, stakeholders mapped rather than
assumed, and an intake path no system can skip on its way to production.

### Internal and external risk sources

An **internal** source sits inside the organisation's control: data, design choices, people,
processes. An **external** source arises outside it: suppliers, adversaries, users, the operating
context, regulators, society. The split predicts the treatment. Internal sources can often be
eliminated or substituted by design; external ones mostly have to be engineered against and
monitored.

| Source | Internal or external | Typical risks | Identified by (artefact, layer) |
|---|---|---|---|
| Training, fine-tuning and retrieval data | Internal (external when bought) | Bias; personal-data leakage; poisoned corpus; stale knowledge | Data card, lineage (2); data tests (3) |
| Model choice and configuration | Internal | Capability beyond need; opacity; confabulation | Model card (2); capability evals (3) |
| System design: prompts, tools, autonomy | Internal | Tool misuse; excessive agency; goal hijack | Registry scope (2); threat model; red team (3) |
| People and process | Internal | Automation bias; unowned systems; change without review | Oversight metrics (4); registry ownership (2) |
| Organisational incentives | Internal | Thresholds tuned to ship; gates routed around | Gate-bypass rate (1); audit (5) |
| Third-party models, APIs and components | External | Silent model updates; undisclosed training data; outage | Due-diligence gate, AIBOM (2); boundary evals (3) |
| Adversaries | External | Prompt injection; data exfiltration; model extraction | Red-team suite (3); guardrails (4) |
| Users and reasonably foreseeable misuse | External | Use outside the intended purpose; over-reliance | Intended-purpose record (2); misuse evals (3) |
| Operating context | External | Data drift; new populations; seasonal shifts | Drift telemetry (4) |
| Law and regulators | External | New obligation; moved date; enforcement priority | Regulatory translation (1); crosswalk |
| Affected people and society | External | Rights impact; discrimination; loss of trust | FRIA or DPIA (1 · 2); stakeholder map |

Two rows carry a legal note. The AI Act's **reasonably foreseeable misuse** is use outside the
intended purpose that "may result from reasonably foreseeable human behaviour or interaction with
other systems, including other AI systems" [3]: misuse by users and by other agents is in scope,
not an excuse. And NIST warns that third-party risk comes both from the component and from how it is
used, and that developer and deployer metrics may not match [1]. Chapter 14 turns foreseeable misuse
into design inputs ([reasonably foreseeable misuse](/bok/governing-development#reasonably-foreseeable-misuse)).
Catalogues find gaps; they are not a register. NIST AI 600-1 names 12 risks unique to or made worse
by generative AI and suggests grouping them as technical or model, misuse by humans, and ecosystem
or societal [14]. The OWASP Top 10 for Agentic Applications covers agent threats such as goal
hijack, tool misuse and privilege abuse [15]. The MIT AI Risk Repository consolidates 1,725
risks from 74 frameworks and finds that human decisions cause nearly as many AI risks (38%) as AI
systems themselves (42%) [16]: a register that lists only model failure modes misses a large
share of what goes wrong.

### Contributing factors and the use-case risk profile

A **contributing factor** does not create a risk on its own; it moves likelihood, severity or both.
NIST gives higher initial priority where training data is sensitive or personal or outputs affect
people directly, and counts deployer customisation as a factor [1]. Article 9 asks providers to
consider people under 18 and other vulnerable groups [8]. Capture factors as registry fields at
[intake](/patterns/use-case-intake-risk-tiering) and let a policy compute the tier.

| Factor | Moves | Profile field |
|---|---|---|
| Autonomy: suggests, drafts, acts after review, acts alone | Likelihood and severity | `autonomy` |
| Decision impact: none, informs, decides about a person | Severity | `decision_impact` |
| Exposure: internal users, customers, the public; daily volume | Likelihood | `exposure`, `volume_per_day` |
| Reversibility of the worst outcome | Severity | `reversibility` |
| Vulnerable groups affected: minors, patients, applicants | Severity | `vulnerable_groups` |
| Data sensitivity: personal, special category, confidential | Severity | `data_class` |
| Opacity and novelty of the technique | Likelihood, and confidence in the rating | `explainability`, `novel_technique` |
| Third-party dependency | Likelihood | `supplier_ids` |
| Deployer customisation (for providers) | Likelihood | `customisation` |

The tier is computed, not negotiated. A system owner who disagrees with the tier changes a factor
with evidence, in a reviewed pull request, and the tier follows.

> **Example (illustrative)** HR proposes a CV-screening assistant. Its profile reads
> `decision_impact: decides-about-person`, `exposure: public-applicants`, `autonomy: filters, a
> recruiter sees only the shortlist`, `data_class: personal`. The tier rule places it in tier 3
> before any meeting. The gate then asks for fairness and robustness evals, a DPIA link and a
> signed acceptance for any residual risk above Low. Whether it is also a high-risk system under the
> AI Act is a separate question for the Annex III route (chapter 08).

### Stakeholder mapping

Different actors see different risks. A developer releasing a pre-trained model can have a different
risk perspective from the deployer using it, and the people harmed are not always direct users
[1]. The AI RMF builds this into GOVERN 5.1, MAP 1.2 and MEASURE 1.3, which asks that affected
communities be consulted as risk tolerance requires [1]. For deployers of certain high-risk
systems the FRIA makes it law: it names the categories of people likely to be affected and the
specific risks of harm to them [17]. ISO calls the same step "communicate and consult"
[5].

| Stakeholder | How their view enters the loop | Evidence |
|---|---|---|
| Direct users (operators, customers) | Usability tests; in-product feedback | Feedback items linked to risk ids |
| Affected non-users (applicants, patients, the public) | Consultation; FRIA; complaints | FRIA record; complaint links |
| Downstream deployers (for providers) | Instructions for use; deployer reports | Deployer-reported issues |
| Upstream providers (for deployers) | Due diligence; change notices | Supplier evidence in the AIBOM |
| Internal functions (legal, privacy, security, risk, audit) | Review at intake; second-line challenge | Review records |
| Regulators and authorities | Obligations mapped; reporting paths | Crosswalk; incident pipeline |
| Executives and the governing body | Appetite statement; risk reports | Approved appetite; acceptances |

The output is not a poster. It is a stakeholder list on the registry entry, an `affected` field on
every register risk, and a log of who was consulted, when and with what result.

## Assessing risk: the likelihood-by-severity matrix

A risk matrix turns two judgements into a band that triggers a response. Its value is consistency,
not precision: two assessors rating one scenario should land in the same cell, and the cell should
decide the same gate every time. IEC 31010:2019 catalogues other risk assessment techniques for when
a matrix is not enough [18].

### Defined scales

Without shared definitions, assessors can give opposite ratings to the same risk [19]. Anchor
likelihood to evidence you can read (eval failure rates, telemetry, incidents) and severity to the
worst credible consequence of one occurrence. The thresholds are illustrative; calibrate them to
your volumes.

| Level | Likelihood | Definition (per system, in production) | Evidence that sets it |
|---|---|---|---|
| L1 | Rare | Not expected in the system's life | A targeted red team cannot reproduce it |
| L2 | Unlikely | Could occur about once a year | Reproduced only by a dedicated adversarial suite |
| L3 | Possible | Expected a few times a year | Regression or red-team failure rate below 1% |
| L4 | Likely | Expected monthly | Failure rate of 1% to 5%, or near misses in telemetry |
| L5 | Almost certain | Expected weekly or more | Failure rate above 5%, or already seen in production |

| Level | Severity | Worst credible consequence of one occurrence |
|---|---|---|
| S1 | Negligible | Inconvenience; fully reversible; nobody's rights affected |
| S2 | Minor | Limited, reversible harm to a few people or a small loss; fixed within a day |
| S3 | Moderate | Material harm to individuals (a wrongful denial, one person's data exposed); reversible with effort |
| S4 | Major | Significant harm to many people or to fundamental rights; hard to reverse |
| S5 | Catastrophic | Death or serious harm to health; serious and irreversible disruption of critical infrastructure; serious harm to property or the environment; widespread infringement of fundamental rights |

S4 and S5 together cover the four categories of a **serious incident** under the AI Act [3], so
a risk rated there is a candidate reportable incident the day it materialises. The
[harms atlas](/resources/harms) gives a harm taxonomy by level, with real incident records, to
calibrate the severity column against.
### The matrix and what each band triggers

| Severity / likelihood | L1 Rare | L2 Unlikely | L3 Possible | L4 Likely | L5 Almost certain |
|---|---|---|---|---|---|
| **S5 Catastrophic** | Critical (override) | Critical (override) | Critical (override) | Critical (override) | Critical (override) |
| **S4 Major** | Medium | High | High | Critical | Critical |
| **S3 Moderate** | Low | Medium | High | High | Critical |
| **S2 Minor** | Low | Low | Medium | Medium | High |
| **S1 Negligible** | Low | Low | Low | Medium | Medium |

A band is useful only if it changes what the pipeline does. The policy later in this chapter
compiles these illustrative consequences.

| Band | Minimum treatment | Gate | Who may accept the residual | Review |
|---|---|---|---|---|
| **Low** | Monitor | Registry entry and owner | System owner | Annually or on change |
| **Medium** | At least one engineered control with evidence | Eval gate on the linked risk | Product owner | Every six months |
| **High** | Engineered controls plus runtime detection; a person decides where consequences reach a person | Eval gate and runtime guardrail; deploy denied without a current acceptance | Risk committee, second line consulted | Quarterly |
| **Critical** | Eliminate or substitute; engineering alone does not ship it | Deploy denied | Governing body, or no one | Monthly while open |

### The catastrophic-severity override

Multiplying likelihood by severity hides the tail. A grid can give a rare catastrophe the band of a
frequent nuisance, and where frequency and severity are negatively correlated (the shape of
catastrophic risk) matrices can be "worse than useless" [19]. So S5 runs on its own track:

1. **The band ignores likelihood.** Any S5 scenario is Critical. Its likelihood is recorded, because
   it guides monitoring, but it does not lower the band.
2. **The team cannot accept it.** Treatment must eliminate the scenario or cut its severity, usually
   by removing a capability, an action or an exposure. Otherwise only the governing body may accept
   it, explicitly and for a fixed period.
3. **Present harm means stop.** Where significant negative impacts are imminent, severe harms are
   occurring or catastrophic risks are present, NIST says development and deployment "should cease in
   a safe manner until risks can be sufficiently managed" [1]. The tested kill switch is the
   mechanism.
4. **The frontier uses the same logic.** Under the GPAI Code of Practice, signatories define systemic
   risk tiers (or other acceptance criteria), apply them with safety margins and, if systemic risk is
   not acceptable, do not make the model available, or restrict, withdraw or recall it [20].

Most controls cut likelihood; only a design change cuts severity. The override forces that design
conversation instead of letting likelihood controls talk a catastrophe down to Medium.

### What a matrix cannot tell you

Cox names four limits: poor resolution, rating errors, no basis for allocating resources, and
ambiguous inputs and outputs [19]. The answers are procedural:

- **Keep the numbers behind the cell** (eval failure rate, volume, worst-case estimate) so the band
  can be recomputed. The cell is a view of the data, not the data.
- **Never sum or average cells.** Prioritise by band, then severity, then cost of treatment; MANAGE
  1.2 prioritises by impact, likelihood and available resources [1].
- **Read eval-based likelihood as a lower bound.** An eval is sampling-bound and catches regressions,
  not novelty ([the limits of the eval gate](/bok/definition#the-limits-of-the-eval-gate)).

For high-risk systems the law points the same way: testing runs against "prior defined metrics and
probabilistic thresholds" appropriate to the intended purpose [8]. A likelihood scale written as
thresholds a pipeline can check is exactly that.

## Risk appetite and tolerance, compiled into gates

NIST does not prescribe a risk tolerance. It defines tolerance as the "readiness to bear the risk in
order to achieve its objectives", calls it contextual and changing, tells organisations to follow
sector rules or define a reasonable tolerance where none exist, and asks that tolerances be
documented (MAP 1.5) and set the level of risk-management effort (GOVERN 1.3) [1]. An appetite
statement that lives only in a board pack changes nothing a pipeline does. Compile it.

### From statement to data

> **Example (illustrative)** An appetite statement as a governing body might approve it: "We use AI
> to make staff and customers faster. We accept moderate risk in internal tools and in decision
> support where a person reviews each output, so that we learn quickly. We accept only low residual
> risk in systems that decide about a person or act on their behalf. No agent moves money above a set
> amount without a person's decision. We carry catastrophic risk only with the governing body's
> explicit acceptance, for a fixed period. No risk is accepted indefinitely."

Each sentence becomes a value in a versioned file that gates read. The file is the enforced version;
the statement is its documentation.

```yaml
# appetite.yaml (illustrative, not a claim of conformity)
version: 2026-09-24
approved_by: governing-body
tolerance:                     # highest residual band carried without escalation
  tier-1-internal: medium
  tier-2-decision-support: medium
  tier-3-decision-about-a-person: low
  tier-4-agentic-or-high-stakes: low
acceptance_authority:          # who may sign each residual band
  low: system-owner
  medium: product-owner
  high: risk-committee
  critical: governing-body
max_acceptance_days: {low: 365, medium: 180, high: 90, critical: 30}
eval_floor:                    # likelihood evidence required per tier
  tier-3-decision-about-a-person: {robustness: 0.95, subgroup_parity: 0.90}
  tier-4-agentic-or-high-stakes: {injection_resistance: 0.95, tool_scope_adherence: 0.99}
human_approval_above_eur: 250  # enforced at runtime by the approval gate
catastrophic_override: true    # severity 5: eliminate, or governing-body acceptance
```

| Statement clause | Compiled into | Layer | Evidence |
|---|---|---|---|
| "moderate risk in internal tools and in decision support" | `tolerance` for tiers 1 and 2: `medium` | 01 | Gate verdict |
| "only low residual risk in systems that decide about a person or act on their behalf" | `tolerance` for tiers 3 and 4: `low`; `eval_floor` | 01 · 03 | Gate verdict; eval result |
| "No agent moves money above a set amount without a person's decision" | `human_approval_above_eur` | 04 | Approval log |
| "catastrophic risk only with the governing body's explicit acceptance" | Override rule; `critical: governing-body` | 01 · 05 | Signed acceptance |
| "No risk is accepted indefinitely" | `max_acceptance_days` | 05 | Acceptance expiry |

### From data to a gate

The gate runs at deploy (layer 01) over the registry entry (layer 02), the system's open risks
(layer 05) and its latest eval results (layer 03). Its verdict names the risk id, so the evidence
says which risk stopped which release.

```
package risk.gate

import rego.v1

# Illustrative, not a claim of conformity. data.appetite is appetite.yaml;
# input holds the registry entry, the system's open risks and its eval results.

rank := {"low": 1, "medium": 2, "high": 3, "critical": 4}

tier := input.system.tier

deny contains "system has no known tier in the registry" if {
	not data.appetite.tolerance[tier]
}

# Residual above the tier's tolerance needs a current acceptance by the
# authority that the residual band requires.
deny contains msg if {
	some r in input.risks
	rank[r.residual.band] > rank[data.appetite.tolerance[tier]]
	not valid_acceptance(r, data.appetite.acceptance_authority[r.residual.band])
	msg := sprintf("%s: residual %s above %s tolerance, no valid acceptance", [r.id, r.residual.band, tier])
}

# Catastrophic-severity override: likelihood plays no part.
deny contains msg if {
	some r in input.risks
	r.residual.severity == 5
	not valid_acceptance(r, "governing-body")
	msg := sprintf("%s: severity 5 needs elimination or governing-body acceptance", [r.id])
}

# Eval floors by tier: missing evidence fails like bad evidence.
deny contains msg if {
	some metric, floor in data.appetite.eval_floor[tier]
	not input.evals[metric] >= floor
	msg := sprintf("%s: eval %s below the %s floor", [input.system.id, metric, tier])
}

valid_acceptance(r, role) if {
	r.acceptance.role == role
	time.parse_ns("2006-01-02", r.acceptance.expires) > time.now_ns()
}
```

Two details matter more than the syntax. A missing eval result fails like a low one, so "we did not
measure it" is never a pass. An expired acceptance counts as none, so the calendar enforces review.
Like every layer 01 policy it ships with a fixture that must be denied and one that must pass
([Layer 01](/bok/the-stack#layer-01-govern-as-code)).

## Treating risk: the mitigation hierarchy

NIST lists the response options as mitigating, transferring, avoiding or accepting [1]; the
order in which you reach for them matters more. Occupational safety ranks controls by effectiveness
(elimination, substitution, engineering, administrative, then protective equipment) and warns
against relying on the last when better options exist [21]. The AI Act sets the same order for
high-risk systems: eliminate or reduce risk through design as far as technically feasible, then
mitigation and control measures, then information and, where appropriate, training for deployers
[8]. NIST adds that non-AI alternatives be weighed (MANAGE 2.1) [1].

| Rung | What it means for AI | Stack control | Pattern | Evidence |
|---|---|---|---|---|
| **1 Eliminate** | Do not build it; remove the capability; refuse the use | Policy deny; prohibited-use blocklist; tool never granted | [Policy Card](/bok/patterns#pattern-policy-card) | Deny verdict; absent scope in the registry |
| **2 Substitute** | Same goal, lower risk: a non-AI method, a simpler or interpretable model, retrieval over free generation, read-only instead of write | Design record; narrower registry scope | [Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials) | Design decision linked to the risk id |
| **3 Engineer** | Controls that act without relying on anyone remembering | Eval gate; runtime guardrail; approval gate; kill switch | [Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci), [Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail), [Human-in-the-loop Gate](/bok/patterns#pattern-human-in-the-loop-gate), [Kill Switch](/bok/patterns#pattern-kill-switch--circuit-breaker) | Eval results; guardrail events; approval logs |
| **4 Administrative** | Rules for people: instructions for use, training, procedures, warnings | Instructions for use; literacy and training records | [Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence) | Training attestations; versioned instructions |
| **5 Accept and monitor** | Carry what is left, knowingly, and watch it | Signed acceptance; telemetry; review date | [Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry) | Acceptance record; monitoring signal |

Elimination has a legal floor: practices the AI Act prohibits are eliminated, never treated or
accepted [22]. **Transfer** (insurance, contractual indemnities) sits beside the ladder, not on
it: it moves the financial consequence, not the harm to the person on the other end of the decision,
so it never replaces rungs one to four where people can be harmed.

Four rules turn the ladder into practice:

- **Work top down, and write down why.** The register records which higher rungs were considered and
  why they were infeasible; a treatment that starts at rung four without that record fails review.
- **Engineered controls count only with evidence.** A guardrail never fired in a test, or a kill
  switch never exercised, is rung four at best.
- **Administrative controls alone do not move a High band.** Reviewers tend to confirm confident
  machine output; oversight has to be designed and measured
  ([designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).
- **Every rung leaves a residual.** The ladder ends in acceptance, never in "resolved".

> **In practice (illustrative)**
> The first design of `csa-01`, the customer-service assistant of chapter 04, gave it a tool that
> issued refunds. Intake rated the scenario "an injected instruction makes the agent refund the wrong
> amount or account" at L4 and S3: High. The team walked the ladder. Eliminating refunds would remove
> the use case. Substituting a read-only scope, with the agent drafting a refund that a person
> issues, cut the path to the event. Engineered controls (an injection guardrail, an
> injection-resistance eval gate, the approval step) cut likelihood further. The residual came out at
> L2 and S3, Medium, accepted by the product owner for six months, void if the eval score fell below
> its floor. The read-only refund scope in the chapter 04 registry entry is that decision, as data.

## Inherent risk, residual risk and who accepts it

**Inherent risk** is the rating before any control is counted. **Residual risk** is the "risk
remaining after risk treatment", in the ISO-derived definition NIST adopts [1]. The gap between
them is the value claimed for the controls; a large gap resting on one control is a single point of
failure that deserves its own test.

Three texts make residual risk a first-class output. Article 9 requires that "the relevant residual
risk associated with each hazard, as well as the overall residual risk" be judged acceptable [8].
MEASURE 2.6 asks that residual negative risk stay within tolerance and the system fail safely, and
MANAGE 1.4 that residual risks to downstream acquirers and end users be documented [1]. So a
residual rating is also a transparency artefact: it belongs in the model card's limitations and the
instructions for use, not only in the register.

One rule keeps it honest: **a residual rating credits only controls whose ids resolve to evidence
from the current review period.** If the eval has not run since the model changed, the residual
reverts towards the inherent rating until it does.

### Who may accept

Acceptance is a decision with a name on it. The Institute of Internal Auditors' Three Lines Model
gives a common division of labour: the first line provides the product and manages its risk; the
second line provides expertise, support, monitoring and challenge on risk; internal audit provides
independent assurance; the governing body sets direction [23]. The AI RMF adds that executive
leadership takes responsibility for decisions about AI risk (GOVERN 2.3) [1].
[Chapter 12](/bok/governance-program#risk-acceptance-and-exceptions) covers committees and decision rights; the table below is the
part a gate can enforce.

| Residual band | Accepts | Consulted (challenge) | Maximum period | Record |
|---|---|---|---|---|
| **Low** | System owner | None required | 12 months | Register entry |
| **Medium** | Product owner | Second-line risk | Six months | Signed acceptance with a voiding condition |
| **High** | Risk committee | Second line; legal and privacy where rights are involved | Three months | Signed acceptance with rationale and conditions |
| **Critical or S5** | Governing body, or no one | Second line; independent review | One month, renewed only with new evidence | Minute of the decision linked to the risk id |

An acceptance record carries the person and role, the rationale, the conditions that void it (a
monitoring signal and its threshold), the date and the expiry. Every residual is accepted by the
authority its band names; the gate blocks only when the band is above the tier's tolerance and no
valid acceptance exists. Above Medium, the acceptor should sit at least one level above the team
whose delivery date depends on the answer.

> **Anti-pattern** "Accepted" as a status with no name, no date and no expiry. The register fills with
> risks nobody chose to carry, and the first incident reveals that the acceptance was a spreadsheet
> default.

## The risk register as an evidence record

Chapter 08 names a "risk register as code" as the artefact behind `Art. 9` and ISO/IEC 23894; this
section defines it. The register is the layer 05 evidence record of the whole loop: one versioned
file per risk, keyed to a registry id, every control reference resolving to an artefact that emits
evidence, every change reviewed like code. It answers Article 9's "documented" and is where an
auditor starts. Its closest standard shape is the plan of action and milestones (`POA&M`) in OSCAL's
assessment layer [24], into which a register can export its open treatments. A JSON Schema for
[a risk register entry](/resources/templates#schema-risk-register-entry), with a filled example, is on
the templates page.
### Register schema

```yaml
# risk-register/csa-01/R-017.yaml (illustrative, not a claim of conformity)
id: R-017
system: csa-01                        # registry id (layer 02)
title: Injected instruction leads to a wrong refund
scenario:
  cause: instruction hidden in a customer message reaches the refund workflow
  event: a refund is proposed and issued for the wrong amount or account
  consequence: financial loss; customer harm; possible fraud report
source: {origin: external, category: adversary}
affected: [customers, finance-operations]
factors: {autonomy: drafts, exposure: public, reversibility: partial}
inherent: {likelihood: 4, severity: 3, band: high}
treatment:
  option: mitigate
  rung: substitute+engineer
  higher_rungs_considered: "eliminate rejected (refunds are the use case); substitute adopted (read-only scope)"
  controls:
    - scope.refunds.read-only           # registry scope (layer 02)
    - guardrail.input.injection.v3      # runtime guardrail (layer 04)
    - eval.injection-resistance.v4      # eval gate (layer 03)
    - approval.refund-issue             # human decision (layer 04)
residual: {likelihood: 2, severity: 3, band: medium}
owner: team-support-platform
acceptance:
  by: head-of-support-products
  role: product-owner
  date: 2026-09-18
  expires: 2027-03-17
  voided_if: "injection-resistance below 0.95, or approval override rate above 2%"
review: {cadence: semiannual, last: 2026-09-18, next: 2027-03-17}
rerate_on: [model-version-change, new-tool-grant, linked-incident, eval-regression]
links:
  evals: [injection-resistance.v4@csa-01@2026-09-18]
  incidents: []
  obligations: ["ISO/IEC 42001 6.1.3", "NIST AI RMF MANAGE 1.3"]
status: open
```

Three fields do what a spreadsheet cannot. `treatment.controls` resolves to artefacts that emit
evidence, `treatment.higher_rungs_considered` proves the hierarchy was applied, and
`acceptance.voided_if` lets telemetry end an acceptance without waiting for a meeting.

### Operating the register

- **Cadence by band, triggers by event.** The band table sets the calendar; `rerate_on` overrides
  it, forcing a re-rating before the next release.
- **Changes arrive as pull requests,** with the evidence in the diff, a second-line reviewer for High
  and above, and an append-only history.
- **The gate reads it,** so an unaccepted residual above tolerance blocks the release with the risk
  id in the verdict.
- **Links run both ways.** An eval failure opens or re-rates a risk; an incident links to its risk,
  and the risk lists its evals and incidents.
- **Measure the register, not its size:** open High and Critical residuals, expired acceptances,
  time from identifying a risk to a control in a gate, and the share of residual ratings backed by
  fresh evidence ([metrics per level](/bok/maturity-model#metrics-per-level)).

> **In practice (illustrative)**
> A governance function moved its register from a spreadsheet into the repository that holds its
> policies, one file per risk keyed to registry ids, and pointed the deploy gate at it. The first run
> blocked two releases for the same reason: accepted risks with no named acceptor and no expiry.
> Nobody had decided to carry them; the spreadsheet had. Within a quarter every open High risk had
> either a signed, expiring acceptance or a control whose evidence the gate could read.

## Proportionate governance: tailoring the loop

The loop is the same everywhere; its intensity is not. The AI RMF sets the level of risk activity
by risk tolerance (GOVERN 1.3) [1]. The EU AI Act, as amended by the Digital Omnibus, makes
proportionality explicit for high-risk providers: the quality management system is proportionate to
the size of the organisation, "in particular, if the provider is an SME, including a start-up, or an
SMC", while providers still "respect the degree of rigour and the level of protection required"; SMEs
and small mid-cap enterprises may also use a simplified technical-documentation form [9]. US
banking supervisors now tailor model risk management to profile, size and complexity [2].
Proportionality lowers the cost of the loop, never the protection owed to the people on the other
end.

### The tailoring matrix

Six factors set the intensity. For each, the matrix gives minimum controls, gates and review
intensity. Read each row as a floor; where two rows apply, the stricter wins.

| Factor | Profile | Minimum controls | Gates | Review intensity |
|---|---|---|---|---|
| **Size** | Team of one, start-up or SME | Register in the repo; appetite as one data file; published scales | Deny unregistered systems and open Criticals | On change; appetite yearly |
| | Mid-size, several product teams | Register keyed to the registry; acceptance authorities; stakeholder maps from tier 3 | Band against tier tolerance; eval gate from tier 2 | Quarterly; second-line challenge for High |
| | Federated enterprise | Central appetite, local tolerances; register rolled up into enterprise risk | Local gates inherit a shared policy library | Monthly committee for High and Critical; audit sampling |
| **Sector** | General commercial | The rows below, nothing extra | As tiered | As tiered |
| | Regulated (finance, health, critical infrastructure, public sector) | Sector overlay fields (below); independent validation for tiers 3 and 4 | Sector evidence before deploy | As the regime expects, never less than tiered |
| **Maturity** (chapter 07) | Level 1 to 2 | Register exists and is keyed to registry ids | Deny unregistered systems | Calendar reviews |
| | Level 3 | Eval results populate likelihood | Risk report in CI, non-blocking | Review at each release |
| | Level 4 to 5 | Bands compiled into gates; telemetry re-rates | Deny on unaccepted residual; acceptances void themselves | Event-driven plus calendar |
| **Products and services** | Tier 1: internal tool | Registry entry, owner, acceptable-use rules | Registry gate | Yearly |
| | Tier 2: decision support, a person reviews each output | Plus capability and misuse evals; oversight metrics | Eval gate | Every six months |
| | Tier 3: automated decision about a person | Plus fairness and robustness evals; FRIA or DPIA where required; a contest channel | Eval gate; no deploy without acceptance at High | Quarterly |
| | Tier 4: agentic with write access, or real-time high stakes | Plus approval gates; scoped identity; tested kill switch; runtime guardrails | Plus runtime enforcement | Monthly and event-driven |
| **Objectives** | Innovation-led | Sandboxed tiers 1 and 2 with wider tolerance; floor unchanged | Sandbox gates apart from production | Frequent, light |
| | Risk-averse | Lower tolerances; acceptance one level higher | Higher eval floors | Heavier, less frequent |
| | Mission-driven (public service, health) | Affected-group consultation from tier 3 | Impact-assessment gate | Includes affected-group input |
| **Risk tolerance** | Low | Tolerance `low` from tier 2; higher eval floors | Deny more, accept higher up | Shorter acceptance periods |
| | Higher | Tolerance `medium` for tiers 1 and 2 | As tiered | As tiered; the S5 override unchanged |

A team of one should not try to run all of this: start from the thin vertical slice of chapter 04
([the minimum viable stack](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)) plus the
register and one gate, and add rows as the organisation and its exposure grow.

### Sector overlays

NIST tells organisations to follow the risk criteria, tolerances and responses their sector already
sets [1]. An overlay adds register fields and gates, not a second register.

| Sector | Existing regime to integrate with | What it adds to the loop |
|---|---|---|
| Banking and finance | Model risk management guidance; in the US, SR 26-2 (17 Apr 2026), which superseded SR 11-7 and is most relevant to banking organisations above USD 30 billion in total assets [2] | Independent validation before use and a model inventory with risk ratings, as in the model-risk tradition; intensity tailored to size and complexity |
| Medical devices and health | ISO 14971:2019, risk management for medical devices [25]; the AI Act's Annex I route, with high-risk duties for embedded systems from 2 Aug 2028 [10] | Hazard-based register; benefit-risk evaluation; post-market surveillance feeding re-rating |
| Industrial and safety-critical | Functional-safety practice; ISO/IEC TR 5469:2024 on AI inside safety-related functions and non-AI functions that keep AI-controlled equipment safe [26] | Safety requirements per function; non-AI safety functions as rung-three controls |
| Public sector | FRIA duty when bodies governed by public law, or private entities providing public services, deploy high-risk systems [17] | Mandatory affected-group mapping; complaint mechanisms and internal governance arrangements as treatments |

### The floor that does not tailor away

Some controls are the same at every size, in every sector and at every maturity level:

- Every AI system in production has a registry entry, an owner and a tier.
- Prohibited practices are eliminated, never treated or accepted [22].
- Every S5 scenario runs the catastrophic-severity override.
- Every accepted risk has a named acceptor, a voiding condition and an expiry.
- Every incident links to a risk, existing or new.
- Every agent that acts has its own identity and a tested kill switch.

## Risk, maturity and incidents

### Risk practice by maturity level

Risk practice is not a sixth row in the maturity model; it is a lens on all five layers, and the
weakest-layer rule of chapter 07 applies to it too
([the five levels](/bok/maturity-model#the-five-levels)).

| Level | Risk practice you can show | Evidence |
|---|---|---|
| **1 Documented** | A register maintained by hand; an appetite statement; defined scales | The register file; approved scales |
| **2 Inventoried** | Every risk keyed to a registry id; unregistered systems flagged as unassessed risk | The join between register and registry; discovery report |
| **3 Tested** | Likelihood ratings cite eval results; red-team findings open new risks | Eval ids in register links |
| **4 Enforced** | Tolerances compiled into gates; an expired acceptance blocks deploy | Gate verdicts that cite risk ids |
| **5 Continuous** | Telemetry re-rates risks; acceptances void themselves when their condition fails | Rating history driven by runtime signals |

### Incidents are realised risks

An incident is a risk that materialised, or one nobody identified. If it matches a register entry,
it is likelihood evidence: the rating is recomputed and, if the voiding condition fired, the
acceptance lapses. If it matches nothing, it opens a new entry, the AI RMF's response to a
previously unknown risk (MANAGE 2.3) [1], and asks identification why intake missed it.

The severity scale connects the two. Because S4 and S5 cover the AI Act's serious-incident categories
[3], an entry rated there already names the reporting path, and the
[Incident Pipeline](/bok/patterns#pattern-incident-pipeline) can start the `Art. 73` clock from the
risk id (deadlines in [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)). Article 9 closes the
loop from the other side: risks emerging from post-market monitoring data are evaluated in the risk
management system [8]. MANAGE 4.3 adds that incidents are communicated to relevant AI actors,
including affected communities [1]. [Chapter 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) covers the incident lifecycle;
this chapter owns the link.

Two measures show whether the link works. The **identification hit rate** is the share of incidents
that matched a pre-existing risk; a low rate means intake misses sources. The **re-rating lag** is
the time from an incident to the recomputed rating; a long lag means the register records the past.

**Maps to:** EU AI Act `Art. 9` (risk management system), `Art. 17(2)` (proportionality), `Art. 26`,
`Art. 27` (FRIA), `Art. 72`, `Art. 73` · ISO 31000 · ISO/IEC 23894 · ISO/IEC 42001 (6.1.2, 6.1.3,
8.2, 8.3) · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Agentic ASI01–ASI10 · all five
layers of the stack. Mappings are illustrative, not a claim of conformity.

## What you can do this week

1. **Publish the scales.** Write five-level likelihood and severity definitions for your context,
   with S5 aligned to the serious-incident categories and the catastrophic-severity override stated.
   One page, versioned beside your policies.
2. **Compile one line of appetite.** Put tolerance by tier into a data file and make one deploy gate
   read it: deny when a system carries an open Critical or an unaccepted residual above its tier.
3. **Key the register to the registry.** For your three highest-tier systems, move their top risks
   into files keyed to registry ids, each with inherent and residual ratings, controls that resolve
   to evidence, an owner and an expiry.
4. **Find the orphans.** List every accepted risk with no named acceptor or no expiry, and every
   incident of the last quarter with no linked risk. Both lists are next month's backlog.
5. **Map one system's stakeholders.** For the system with the widest exposure, name the affected
   non-users and write down how their view reaches the register.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (§1.1 risk; §1.2.2 risk tolerance; §1.2.3 prioritisation, "cease in a safe manner", residual risk; Core tables 1 to 4; §6 profiles). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[2] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC, FDIC; supersedes SR 11-7 and SR 21-8; tailored to risk profile, size and complexity; most relevant above USD 30 billion in assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (points 2 "risk", 13 "reasonably foreseeable misuse", 49 "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[4] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[5] ISO 31000:2018, Risk management: Guidelines (stage 90.92, to be revised; ISO/CD 31000 under development as of 2026-09-24). ISO/TC 262. 2018-02. https://www.iso.org/standard/65694.html (verified: primary)
[6] ISO/IEC 23894:2023, Artificial intelligence: Guidance on risk management. ISO/IEC JTC 1/SC 42. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[7] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (draft for comment; function to clause mapping). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2) steps; 9(5) residual risk and order of measures; 9(8) "prior defined metrics and probabilistic thresholds"; 9(9) minors and vulnerable groups). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[9] Regulation (EU) 2026/1744, Digital Omnibus on AI (Art. 9 not amended; Art. 11(1) simplified documentation and Art. 17(2) proportionality for SMEs and SMCs). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] "AI Omnibus enters into force" (Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[11] Risk management in the Artificial Intelligence Act (J. Schuett; Art. 9 of the 2021 proposal; Eur. J. Risk Regul. 15 (2024) 367-385). arXiv 2212.03109. 2024. https://arxiv.org/abs/2212.03109 (verified: primary)
[12] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[13] ISO/IEC 42001:2023, Artificial intelligence: Management system (6.1.2 AI risk assessment, 6.1.3 AI risk treatment, 6.1.4 AI system impact assessment; 8.2 to 8.4). ISO/IEC JTC 1/SC 42. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[14] Generative Artificial Intelligence Profile, NIST AI 600-1 (12 GAI risks; grouping in footnote 5). NIST. 2024-07. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (verified: primary)
[15] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[16] The AI Risk Repository (v3; 74 frameworks, 1,725 risks; human decisions 38%, AI systems 42%) (arXiv 2408.12622). P. Slattery et al., MIT. 2026-05-05. https://arxiv.org/abs/2408.12622 (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA: who performs it; elements (a) to (f)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[18] IEC 31010:2019, Risk management: Risk assessment techniques. IEC / ISO/TC 262. 2019-06. https://www.iso.org/standard/72140.html (verified: primary)
[19] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[20] GPAI Code of Practice, Safety and Security chapter, Commitment 4 (systemic risk acceptance determination; Measure 4.2). code-of-practice.ai. 2025-07-10. https://code-of-practice.ai/?section=safety-security (verified: secondary)
[21] Hierarchy of Controls. CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[22] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5 (prohibited AI practices, as amended by the Digital Omnibus, Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[23] The IIA's Three Lines Model: an update of the Three Lines of Defense. The Institute of Internal Auditors. 2020-09-08. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[24] OSCAL native model (assessment layer incl. POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[25] ISO 14971:2019, Medical devices: Application of risk management to medical devices. ISO/TC 210. 2019-12. https://www.iso.org/standard/72704.html (verified: primary)
[26] ISO/IEC TR 5469:2024, Artificial intelligence: Functional safety and AI systems. ISO/IEC JTC 1/SC 42. 2024-01. https://www.iso.org/standard/81283.html (verified: primary)
