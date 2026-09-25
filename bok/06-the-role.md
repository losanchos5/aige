# 06. The role

> The AI governance engineer as a concrete role: a capability first and a job title second, defined
> by the workflows it owns and the evidence it produces, not by the certifications on its holder.

> **In short**
> An AI governance engineer is the person, on whatever org chart, who holds the capability of AI
> governance engineering and is accountable for three questions in production: what AI is running,
> what it is allowed to do, and what evidence proves it. The role is defined by the workflows it
> owns, not by the certifications on its holder. It owns seven workflows: intake and classification,
> inventory and registry, evals and red teaming as evidence, policy-as-code and gates, runtime
> monitoring and incidents, assurance and audit evidence, and regulatory translation. The AI
> governance analyst describes the system from the outside and files the description; the engineer
> reads the system directly and ships the control that changes what it does. The market corroborates
> the shape of the work: the IAPP Salary & Jobs Report 2025-26 puts technical AI-governance roles in
> the tech sector at a median of USD 221,000 [6], and US postings ask for observability in 41-42% of
> listings and Python in 27-28% [4].

## Capability first, title second

The Thesis insists that AI governance engineering is a capability, not a job title (the same claim
the parent discipline makes for GRC engineering, a capability anyone close to the build can develop
[8]). This chapter makes it concrete without contradicting that: a capability still lives in someone's
week: the tickets they own, the pipelines they maintain, the incidents they are paged for. So we
describe the **AI governance engineer** as the person, on whatever org chart, who holds that capability
and is accountable for the three questions in production: what AI is running, what it is allowed to do,
and what evidence proves it.

The distinction matters because the title is still forming. The same work is advertised as "AI
Governance Engineer", "AI Risk Engineer", "AI Evaluation & Governance Engineer" [1], "Responsible AI
Engineer" and, inside GRC teams building the AI-forward version of their function, "GRC Engineer" with
an AI mandate [2]. A security engineer who writes the eval gate, a privacy engineer who turns a FRIA
into code, an MLOps engineer who wires the registry to the deploy: each is doing AI governance
engineering under a different title. We define the role by what it owns, not by what HR called the
requisition.

One line separates it from its analyst neighbour, and the rest of the chapter earns that line: the AI
governance analyst describes the system from the outside and files the description; the AI governance
engineer reads the system directly and ships the control that changes what it does.

## What the role owns, by workflow

The engineer owns workflows, not documents. Each workflow below is a running system with inputs,
artefacts and evidence, and each maps to one of the five layers of the stack (chapter 04). Grouping
responsibilities this way keeps the role honest: you own a workflow when you can be paged for it, not
when your name is on a policy.

### Intake and classification

Every AI system, model and agent enters through an intake that classifies it: by risk tier, by
regulatory exposure (EU AI Act high-risk, GPAI, out of scope), by data sensitivity and by autonomy.
The engineer builds intake as a form-plus-code path, not a meeting: a request that scaffolds a
registry entry, triggers the right impact assessment (FRIA, DPIA), and routes the system to the
controls its class requires. The NIST AI RMF's Map function is the natural vocabulary for the
classification step. Intake asks, in order: whether the problem needs AI at all
([strategy, value and whether to use AI at all](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all),
chapter 12); whether the system counts as AI
([the definitional decision and its registry fields](/bok/ai-defined#from-definition-element-to-registry-field),
chapter 11); what the [use-case record](/bok/governing-development#the-use-case-record) says about
purpose and decision authority (chapter 14); which risk tier the
[use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile) gives
it (chapter 13); and where it sits on [the AI Act risk ladder](/bok/eu-ai-act#the-risk-ladder)
(chapter 18). A system that is bought rather than built enters with a
[Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record) (chapter 15).
The [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering) pattern builds the
intake, and the [AI Act triage](/toolkit/ai-act-triage) drafts the classification decision record.
**Maps to** Inventory & Transparency.

### Inventory and registry

The engineer owns the inventory of models and the **agent registry**, the runtime-aware record of
every non-human actor, each with an owner, a declared scope, a status and a kill switch. The
capability that distinguishes the engineer here is the runtime data path: the registry is fed by the
deployment pipeline and by discovery against production, not typed into a spreadsheet, and every
non-human actor in it carries its own identity; chapter 23 sets out what
[an agent's registry entry](/bok/governing-agents#the-agent-registry) has to carry. **Maps to**
Inventory & Transparency.

### Evals and red teaming as evidence

The engineer builds and maintains the eval suites (capability, safety and adversarial) and wires
them into an **eval gate** so a failing eval blocks the release. This is the workflow that most
sharply separates the engineer from the analyst: the analyst reviews a model report; the engineer
writes the test the model must pass and owns the harness that runs it (Inspect AI, promptfoo, Garak,
Giskard, DeepEval, Ragas as category examples, illustrative not endorsed). The "AI Evaluation &
Governance Engineer" role is defined around "automated testing harnesses and safety guardrails" and
adversarial red-teaming [1]. **Maps to** Evals & Red Teaming as Evidence.

### Policy-as-code and gates

The engineer expresses governance rules as executable policy (`OPA/Rego`, Cedar, Policy Cards) that
evaluate in CI/CD and at admission, and maintains the gates that enforce them. A public GRC
engineering-manager posting frames the mandate as "translate policies into policy-as-code" [3]. The
engineer's output here is a merge that is blocked or allowed, with a logged reason, not a
recommendation in a review. **Maps to** Govern-as-Code.

### Runtime monitoring and incidents

The engineer instruments runtime: guardrail decisions, tool-call mediation, drift signals and agent
behaviour stream into observability (Langfuse, Arize Phoenix over OpenTelemetry as examples). They own
the detection-to-report path for serious incidents, including the EU AI Act's Article 73 clock for
high-risk systems, and they own the tested **kill switch** for agents, with the threat model that
says which runtime failures the controls are built against [5]. Chapter 17 covers
[incident response](/bok/incidents#the-response-lifecycle) and
[root-cause analysis](/bok/incidents#root-cause-analysis). **Maps to** Runtime Controls &
Observability.

### Assurance and audit evidence

The engineer emits **audit-ready evidence** as a by-product of the build (`OSCAL` component and
assessment artefacts, signed logs, structured eval results) so the audit is a query, not a project.
This is **continuous assurance**: the control's status is a live signal, not a point-in-time
attestation. **Maps to** Assurance & Continuous Compliance.

### Regulatory translation

The engineer reads the obligation well enough to build the control that meets it: turning an AI Act
article, an ISO/IEC 42001 control or a NIST AI RMF subcategory into a gate, a registry field or an
evidence artefact, and back, so an auditor can trace the control to the obligation. This is
translation, not legal advice; the engineer depends on Legal to confirm the obligation is read right.
**Maps to** all five layers; it is the spine that chapter 08 indexes, and chapter 18 reads
[the EU AI Act in one pass](/bok/eu-ai-act#how-to-read-this-chapter) for the engineer who has to translate it.

## Skills, by workflow

Skills are grouped by the workflow they serve, not by the certificate that teaches them. The table is
a capability map: it says what you must be able to do, in rough order of how load-bearing it is for
each workflow. It is illustrative, not a checklist to pass.

| Workflow | Core skills | Supporting skills |
|---|---|---|
| Intake & classification | Risk taxonomy design; reading the EU AI Act risk tiers; requirements analysis | Form/workflow tooling; light data modelling |
| Inventory & registry | Non-human identity and scoped access; API integration to CI/CD; data modelling | Cloud IAM; discovery tooling; SPIFFE/SPIRE concepts |
| Evals & red teaming | Eval harness engineering; adversarial prompting; statistical literacy; Python | LLM/agent internals; benchmark design; threat modelling (STRIDE/PASTA) |
| Policy-as-code & gates | `OPA/Rego` or Cedar; CI/CD pipeline engineering; Git | Policy schema design (Policy Cards); admission control |
| Runtime monitoring & incidents | Observability/OpenTelemetry; guardrail configuration; incident response | Detection engineering; MCP and agent-protocol security |
| Assurance & audit evidence | `OSCAL` and machine-readable evidence; logging and signing; audit fluency | Cryptographic attestation; evidence-store design |
| Regulatory translation | Reading regulation and standards (AI Act, ISO/IEC 42001, NIST AI RMF); mapping | Legal English; DPIA/FRIA methodology |

Two cross-cutting skills sit under all seven: enough **Python** to glue systems together (postings put
Python in roughly one in four AI-governance listings [4]), and enough **law-reading** to parse an
article without mistaking it for advice. Neither is optional; neither is the whole job.

## Analyst versus engineer

The clearest way to define the role is against the analyst it grows from. The contrast below is
written for AI governance and modelled on the analyst-vs-engineer table that the GRC Engineer
literature uses for its parent discipline [2]. Both roles are needed; the engineer is not "better",
but does different work and is measured differently.

| Dimension | AI governance analyst | AI governance engineer |
|---|---|---|
| **Evidence artefact** | A point-in-time artefact (an attestation, a questionnaire, an exported report) compiled for a review | A continuously emitted artefact (a query result, an eval run, a signed log) produced as the pipeline runs |
| **Primary source** | Works from the system's reported description: documentation, summaries and vendor answers | Works from the running system: the registry and production telemetry, the same signals the build emits |
| **Toolset** | Spreadsheets, a GRC/AI-governance platform, ticketing | Python, `OPA/Rego`, Git, CI/CD, eval harnesses, `OSCAL`, plus the platform |
| **Cadence** | Periodic: quarterly reviews, annual assessments | Continuous: every commit, deploy and runtime call |
| **Output** | A report, a mapping matrix, a risk rating | A merged-or-blocked build, a registered agent, a machine-readable evidence artefact |
| **Success metric** | Audit passed, framework coverage complete | Control failures caught before the auditor arrives, and realised risk measurably reduced |

The distinction is cadence and artefact, not competence or clearance. It is not that the analyst
cannot read a registry or the engineer cannot write a report; it is that the analyst's deliverable is
a periodic description and the engineer's is a continuous control. A good analyst reads systems
closely; a good engineer writes clearly. The failure modes differ too, and naming them keeps both
honest. The analyst's failure mode is compliance theatre: documentation that runs ahead of reality.
The engineer's failure mode is over-engineering: automating a control for a process nobody agreed to
fix, or building a gate so brittle that engineers route around it. Neither role is safe from its own
failure mode by title alone.

## The career ladder

The role has observable rungs, each defined by what the person can be trusted to own end to end, not
by years served, and verifiable by looking at the systems, not a self-assessment.

1. **Associate.** Runs existing controls: adds an eval to a suite, registers an agent correctly,
   produces evidence from a control someone else built.
2. **AI governance engineer.** Builds a control end to end (one obligation into a gate, an eval suite
   for a system class, wired into CI/CD) and owns at least one workflow for a product area.
3. **Senior.** Owns a full workflow across the organisation and designs the paved path others adopt;
   the registry, eval gate or evidence pipeline they built is the standard template.
4. **Staff / principal.** Owns the reference architecture (how the five layers fit together) and the
   cross-cutting decisions (identity model, evidence format, incident path).
5. **Head of AI governance engineering.** Owns the function and its shared ownership with engineering,
   measured by realised risk reduction, not by controls stopped. A public engineering-manager posting
   scoped to "build an AI-forward GRC engineering function" sits at this rung [3].

A person can hold the capability at rung two while the title lags at "analyst", or hold the title
without the capability. The ladder describes the work, and the work is visible in the systems.

## Three ways in

Nobody starts as an AI governance engineer; everyone converts from an adjacent discipline, keeping its
strength and adding what it lacks.

- **From Legal or privacy.** Your edge is regulatory translation; your gap is the build. Turn one
  assessment into a versioned, executable artefact (a FRIA-as-code template, a policy in `OPA/Rego`),
  and learn enough pipeline to see where the control fires. Start at policy-as-code and intake.
- **From Security or GRC.** Your edge is the control mindset; your gap is the model layer. GRC
  engineering already taught the parent moves: policy-as-code, continuous assurance, evidence as a
  by-product [2]. Add the AI-specific objects: evals as controls, agent identity and scope, and the
  model and agent failure modes of the OWASP Agentic Top 10 [5]. Start at evals-as-evidence and the
  agent registry.
- **From MLOps or ML engineering.** Your edge is the runtime data path everyone else lacks; your gap
  is the obligation. Add the eval *gate* rather than the eval report, the registry field for owner and
  scope, the evidence artefact the audit needs. Start at eval gates in CI and runtime monitoring.

## The market

The role is defined by the workflows above, not by the vacancies. But the market is forming and the
evidence is public, and it corroborates the shape of the work. Treat every figure as sourced; salary
points are survey medians or posting ranges, not guarantees.

**Survey bands.** The IAPP Salary & Jobs Report 2025-26 (1,600+ respondents, 60+ countries) puts
technical AI-governance roles in the tech sector at a median of USD 221,000 (its highest band)
against USD 151,800 for AI-governance work generally and USD 169,700 for combined privacy-and-AI-
governance roles [6]. The premium is for the technical, build-the-control end of the discipline, which
is exactly the role this chapter describes.

**Skills in demand.** Analysis of US postings since January 2026 (Axial Search) reports
observability/monitoring in 41-42% of AI-governance listings, Python in 27-28%, NIST frameworks in
about 27%, foundation-model familiarity in 25.6% and cloud in 18.2%; median advertised pay was USD
169,000 and median required experience five years [4]. And the demand signal is broad: LinkedIn's 2026
Skills on the Rise lists governance and responsible-AI skills among its fastest-rising clusters,
alongside the technical AI capabilities [7]. The load-bearing signal is the skills mix
(observability, Python, the runtime data path), not the salary headline.

> **Postings (footnote).** Individual postings mark the top of the range: a GRC engineering-manager
> role at a frontier lab was advertised in 2026 at USD 405,000 [3]. But named vacancies are a lagging,
> noisy signal, kept here as corroboration and out of the argument; this edition cites no job-board
> listing whose URL expires or is reassigned once the vacancy closes. The role is the workflows, not
> the requisition.

## What employers get wrong in the job description

Reading the postings against the workflows above, three mistakes recur.

- **Certifications as a proxy for capability.** Descriptions list AIGP, CIPP, CISSP and CISM as if a
  certificate produced a control. The Axial data shows certs appear in under 11% of postings each [4];
  the load-bearing skills (eval harnesses, policy-as-code, the runtime data path) are the ones the
  JD under-specifies. Ask for the workflow, then the cert if it helps. What each scheme assesses,
  and how this book relates to it, is set out neutrally on the
  [certifications page](/for/certifications).
- **Analyst work under an engineer title.** In our reading of the postings, "AI Governance
  Engineer" titles often describe intake, mapping and reporting (analyst work) at engineer pay. The tell is the absence of any build: no
  eval gate, no registry integration, no evidence pipeline.
- **Everything, in one hire.** A single posting asks for policy-as-code, red teaming, identity,
  observability, incident response, regulatory translation and stakeholder management. That is a
  function, not a person: the seven workflows are owned across a team, and a first hire owns two or
  three and builds the paved path for the rest.

> **In practice**
> In a large telco, the role arrived before the title. The first version of the work sat inside a
> privacy team and looked like DPIAs and reviews. What turned it into AI governance engineering was
> owning two workflows outright: wiring the model and agent registry to the deployment pipeline so it
> was true on any Tuesday, and putting an eval gate in CI so a regression in injection resistance
> failed the build. The job description caught up a year later. The capability was visible in the
> systems long before it was visible on the org chart.

**Maps to:** EU AI Act Art. 9 (risk management), Art. 26/27 (deployer duties, FRIA), Art. 72
(post-market monitoring), Art. 73 (serious-incident reporting) · ISO/IEC 42001 (roles,
responsibilities and competence) · NIST AI RMF (Govern) · OWASP Top 10 for Agentic Applications 2026.
Mappings are illustrative, not a claim of conformity.

## What you can do this week

1. **Map the seven workflows.** Write down who owns intake, inventory, evals, policy-as-code,
   runtime and incidents, assurance and regulatory translation today, and mark the ones nobody owns.
2. **Own one workflow outright.** Pick the one with the least build in it (often the registry or
   the eval gate) and ship one control there that blocks or records, not one that recommends.
3. **Rewrite one job description.** Replace the list of certifications with the workflows the hire
   will own and the artefacts they will ship in their first quarter.
4. **Practise one core skill on a real system.** From the skills table, take the core skill your
   workflow lacks and use it once on a live pipeline: one policy in `OPA/Rego`, one eval in a
   harness, one trace in OpenTelemetry.
5. **Translate one article in a pair.** Sit a lawyer or DPO with an engineer and turn one AI Act
   article into a gate, a registry field or an evidence artefact, and back again.

## Sources

[1] "How the AI Engineer role is unbundling in 2026" (names the AI Evaluation & Governance Engineer). AI Journal. 2026-08-26. https://aijourn.com/how-the-ai-engineer-role-is-unbundling-in-2026/ (verified: secondary)
[2] "The GRC Engineer role" (analyst-vs-engineer table; career paths). GRC Engineer. 2025. https://grcengineer.com/grc-engineer/ (verified: primary)
[3] "Engineering Manager, GRC" posting (AI-forward GRC engineering function; policies into policy-as-code), USD 405,000. Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: secondary)
[4] AI governance jobs analysis (US postings since Jan 2026: observability 41-42%, Python 27-28%, NIST ~27%, foundation models 25.6%, cloud 18.2%; median pay USD 169,000; median 5 yrs). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] Salary & Jobs Report 2025-26 (technical AI-gov in tech median USD 221,000; AI governance only 151,800; privacy + AI governance 169,700). IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[7] LinkedIn 2026 Skills on the Rise (governance and responsible-AI skills among the fastest-rising clusters; no per-skill percentage published). LinkedIn, via EdTech Innovation Hub. 2026. https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts (verified: secondary)
[8] "What is GRC Engineering" (capability, not a job title). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
