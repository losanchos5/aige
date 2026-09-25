---
seoTitle: "What is AI governance engineering? Definition and scope"
---
# 01. The definition

> AI governance engineering is the application of engineering practice (systems thinking, product
> thinking and code) to the governance of AI systems; a capability, not a job title, measured by
> realised risk reduction and audit-ready evidence.

> **In short**
> AI governance engineering is the application of engineering practice (systems thinking, product
> thinking and code) to the governance of AI systems. It covers governance, risk and assurance of AI
> systems, including autonomous agents. It is a capability, not a job title: a set of practices
> (policy-as-code, eval gates, agent registries, continuous assurance) that a security engineer, a
> privacy engineer, an MLOps engineer or a governance lead can each develop. It is measured by
> exactly two tests: did the risk actually fall in production, and can a regulator or auditor read
> the proof as machine-readable evidence. GRC engineering is its parent method; what separates it
> from AI security engineering, its closest sibling, is the deliverable, a governed and evidenced
> system rather than only a defended one. It governs five nested objects (models, systems, agents,
> data and the organisation) and must answer three questions from live systems: what AI is running,
> what is it allowed to do, and what evidence proves it.

## The definition

**AI governance engineering is the application of engineering practice (systems thinking, product
thinking and code) to the governance of AI systems.**

Read the sentence in three parts. *Engineering practice* means we build, run and measure governance
the way engineers build, run and measure anything else: as versioned systems with tests, telemetry
and owners, not as documents. *Systems thinking and product thinking* mean we treat governance as a
whole that spans data, model, pipeline, runtime and organisation, delivered as a product to the
engineers who are its users. *The governance of AI systems* is the subject: the whole span of
governance, risk and assurance for AI, including autonomous agents, not one narrow slice of it.
Chapter 11 settles [what counts as an AI system](/bok/ai-defined#four-definitions-compared) for
governance purposes, and why that decision is itself the first control. The general term, AI
governance, with its definitions in the primary sources and its frameworks compared, has its own
page: [What is AI governance?](/ai-governance).

The framing is borrowed, deliberately. GRC engineering defines itself as "the application of software
engineering practice, systems thinking and product thinking to governance, risk and compliance" [1].
AI governance engineering is that same move, aimed at the governance of AI. It is the parent
discipline pointed at a faster, stranger target.

## Three clarifiers

**It covers governance, risk and assurance of AI systems, including agents.** The scope is not
"compliance." It runs from setting the rules (governance), through identifying and reducing what can
go wrong (risk), to producing the evidence that the controls work (assurance). It explicitly includes
autonomous and agentic AI, because that is where the hardest governance problems now live: an agent
that browses, executes code, calls APIs and acts under delegated authority is the object that legacy
governance can least see.

**It is a capability, not a job title.** You do not need "AI governance engineer" on your business
card to do this work, and having the title does not mean you are doing it. It is a set of practices
(policy-as-code, eval gates, agent registries, continuous assurance) that a security engineer, a
privacy engineer, an MLOps engineer or a governance lead can each develop. The market is forming the
role (technical AI-governance roles in the tech sector report a median near USD 221,000, the highest
band in IAPP's survey [2], and Gartner forecasts AI governance spending of USD 492 million in 2026,
passing USD 1 billion by 2030 [3]), but the discipline is defined by the capability, not by the
vacancy.

**It is measured by realised risk reduction and audit-ready evidence.** There are exactly two tests.
Did the risk actually fall, measurably, in production, not on a maturity slide? And can a regulator
or auditor read the proof as machine-readable evidence, not a reassembled screenshot? A control that
passes neither test is theatre. Framework coverage, number of policies written and committees held are
inputs at best; they are never the measure.

## The disambiguation cluster

The discipline is defined as much by what it is not as by what it is. Eight neighbours are routinely
confused with it. Each shares a border; none is the same thing.

| Neighbour | What it does | How AI governance engineering differs |
|---|---|---|
| **AI safety research** | Studies whether powerful models are safe in principle (alignment, dangerous capabilities). | Engineers the controls and evidence for AI systems in production; consumes safety research, does not conduct it. |
| **MLOps / LLMOps** | Builds, deploys and serves models and pipelines reliably. | Governs what MLOps ships: adds policy, evals-as-evidence, registry and assurance as gates on the same pipeline. |
| **Model risk management (SR 11-7 style)** | Validates models, checks for conceptual soundness and back-tests, in the banking tradition; in the US, SR 11-7 was superseded by SR 26-2 on 17 Apr 2026 [6]. | Extends beyond model validation to runtime behaviour, agents, rights impact and continuous, machine-readable evidence. |
| **AI compliance / legal** | Interprets obligations (EU AI Act, GDPR) and advises on them. | Turns the obligation into an executable control and readable evidence; needs legal, does not replace it. |
| **Responsible AI / AI ethics** | Sets the values and principles (fairness, transparency, accountability). | Implements those values as running controls; ethics sets the target, engineering hits it and proves it. |
| **GRC engineering** (the parent) | Applies engineering practice to governance, risk and compliance generally. | Same method, specialised to AI: models, agents, evals, AIBOM, runtime AI controls. |
| **AI security engineering** (the sibling) | Secures AI systems against attack (prompt injection, model theft, agent abuse); its deliverable is a defended system. | Overlaps heavily (often the same person), but its deliverable is a *governed and evidenced* system: the rights-and-obligations record and continuous assurance, not only defence. |
| **Visure's "AI governance engineering"** | Governs the AI that engineers *use inside* engineering workflows (requirements, MBSE). | The opposite direction: our subject is governing AI *systems*, not governing AI-assisted engineering [4]. |

In prose: the frontier lies where a discipline stops. **AI safety research** asks whether a model is
safe; we ask whether the deployed system is governed, and prove it. **MLOps** answers "is the model
serving?"; we answer "is it allowed to serve, and what evidence says so?" We govern the very
pipeline MLOps runs. **Model risk management** in the SR 11-7 tradition validates a model at points in
time; we govern the system continuously, including agents that have no analogue in a credit model.
The tradition's US reference text changed on 17 Apr 2026, when the Federal Reserve, the OCC and the
FDIC replaced SR 11-7 with SR 26-2 ([SR 11-7, now SR 26-2](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai),
in chapter 21) [6]. The new guidance places generative and agentic AI models outside its scope [7],
so the systems this book cares most about are the ones bank model validation now leaves to other
controls; chapter 13 sets out where
[model risk management meets AI risk management](/bok/risk-management#what-this-chapter-settles).
**AI compliance and legal** tell you what the law requires; we build the control that meets it and the
evidence that shows it, and we depend on lawyers to tell us we got the obligation right. **Responsible
AI and AI ethics** set the values; without engineering, those values stay on a poster (chapter 16
turns one of them, [fairness, into metrics and eval gates](/bok/fairness-and-explainability#group-fairness-metrics)). **GRC
engineering** is the parent method, and we are its AI specialisation. We inherit three of the five
stack layers almost unchanged (Govern-as-Code, Inventory & Transparency, and Assurance & Continuous
Compliance, which carry policy as code, the asset inventory and machine-readable evidence) along
with the "green dashboard over a broken control is theatre" test; what AI forces us to add is the
other two, evals and red-teaming as controls and agent identity and runtime control, because a
model whose behaviour must be tested and an autonomous actor that acts under delegated authority have
no analogue in classic GRC. **AI security engineering** is the sibling we overlap with most, and the
overlap is a feature, not a boundary dispute: the same person often wears both hats. The line is not
"framing versus fences" but *deliverable*. Security engineering's deliverable is a defended system:
it stops the attack. AI governance engineering's deliverable is a *governed and evidenced* system: the
rights-and-obligations record (which control answers which article, with the proof attached) and
continuous assurance as a product an auditor or regulator can query. A red-team eval is security work
and governance work at once; it becomes governance when its result is filed as evidence against an
obligation. Security asks "is it safe from attack?"; we ask "is it governed, and can we prove it?"
We usually need the security answer as an input to ours. And **Visure's** use of the
identical phrase points the other way entirely: governing the AI that assists engineering work, not
engineering the governance of AI. We claim the second meaning and disambiguate the first on sight.

## The object of governance

What, concretely, does this discipline govern? Five nested objects, each needing different controls:

- **Models.** The trained artefacts (foundation models, fine-tunes, classifiers), with their
  provenance, capabilities, evaluations and known failure modes. Governed with model cards, evals and
  AIBOM.
- **Systems.** The application around the model: prompts, retrieval, tools, orchestration, the human
  and machine users. Most risk is here, not in the raw model.
- **Agents.** Systems that act: browse, execute code, call APIs, move money, delegate to other
  agents. Governed with identity, bounded scope, tool mediation, runtime guardrails and kill switches.
  This is the hardest and newest object, and the one legacy governance cannot see; chapter 23 covers
  [governing agents](/bok/governing-agents#what-makes-an-agent-a-governance-object) end to end.
- **Data.** Training data, retrieval corpora, prompts and outputs, with their lawful basis, rights,
  provenance and retention. Governed with data cards, DPIAs and lineage; chapter 19 applies
  [data protection law to AI](/bok/privacy-and-ai#principles-applied-to-ai).
- **The organisation.** The roles, decision rights, escalation paths and accountability that surround
  all of the above. Governed with an operating model, RACI and an incident pipeline (chapter 12 maps
  [the stakeholders and their duties](/bok/governance-program#the-stakeholder-map)). A control with no
  owner is not a control.

The discipline is coherent only when it addresses all five. A model card with no agent registry, or an
agent registry with no runtime data path, governs one object and leaves the others open.

## The three questions

At any moment, an AI governance engineering function must be able to answer three questions about
production, instantly, from live systems, not from a document last updated a quarter ago:

1. **What AI is running?** Which models, systems and agents are live, in which version, owned by whom.
   This is the job of the inventory and the agent registry, and it must be fed by a runtime data
   path, not typed into a spreadsheet.
2. **What is it allowed to do?** The scope, permissions, guardrails and policy that bound each system
   and agent. This is the job of governance-as-code and runtime controls: identity before autonomy,
   scope before action.
3. **What evidence proves it?** The machine-readable, audit-ready record that the controls fired and
   the risk fell. This is the job of evals-as-evidence and continuous assurance: evidence as a
   by-product of the build.

These three questions are the spine of the whole Body of Knowledge. The five-layer stack (chapter 04)
is built to answer them: Inventory & Transparency answers *what is running*; Govern-as-Code and
Runtime Controls & Observability answer *what it may do*, the first writing the bound as code and the
second enforcing it on the live call; Evals & Red Teaming and Assurance & Continuous Compliance answer
*what evidence proves it*. The threats those controls are built against (prompt injection, tool
misuse, agent identity and privilege abuse, rogue agents) are catalogued in OWASP's Top 10 for Agentic
Applications [5], and the patterns that answer them are in chapter 05.

## The limits of the eval gate

This book leans hard on evals as controls, so it owes the reader the same "theatre" test it applies to
everything else. An eval gate is necessary; it is not sufficient. Take it seriously and its limits
follow directly:

- **It is point-in-time and sampling-bound.** An eval proves the system passed *these* cases at *this*
  version. It says nothing about the inputs it did not sample, and nothing about tomorrow's model.
- **It is Goodhartable.** The moment a threshold gates a release, there is pressure to tune the model
  to the suite or the threshold to the model. A gate optimised against becomes a number that rises
  while the risk it stood for does not move.
- **It catches regressions, not novelty.** A suite tests known failure modes. A novel jailbreak or an
  attack the suite never imagined passes green, because nothing in the gate was built to see it.

None of this argues against the gate; it argues for how the gate must be run. The eval suite is itself
an artefact to be governed: its coverage measured, its cases maintained adversarially, its thresholds
traced to named failure modes rather than round numbers, and its size set by the threshold it has to
resolve (chapter 14 shows how to
[size the suite from the threshold](/bok/governing-development#statistical-validity-of-evals)). The
same caution applies to [public benchmarks and leaderboards](/bok/governing-deployment#what-public-benchmarks-and-leaderboards-cannot-tell-you),
which score a model on someone else's cases rather than on your task. And a passing gate
*obliges* runtime monitoring (layer 04) rather than replacing it. An eval is the control at build
time; the guardrail and the trace are the control at run time, against the inputs no eval
anticipated. A discipline that treats a green gate as proof of safety has rebuilt framework
theatre with a faster pipeline.

> **In practice**
> Inside a large telco, the difference between "governed" and "documented" came down to those three
> questions. A model inventory maintained by hand answered question one on the day it was edited and
> was wrong within a week. Wiring the registry to the deployment pipeline (so a new model or agent
> registered itself, with an owner and a scope, at deploy time) was what made the three questions
> answerable on any given Tuesday. The document became a query.

**Maps to:** EU AI Act Art. 9 (risk management), Art. 11/49/71 (documentation and registration),
Art. 55 (GPAI systemic-risk duties) · ISO/IEC 42001 (AI management system) · NIST AI RMF (Govern,
Map, Measure, Manage) · OWASP Top 10 for Agentic Applications 2026. Mappings are illustrative, not a
claim of conformity.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Salary & Jobs Report 2025-26. IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[3] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[4] "AI Governance Engineering". Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant to banking organisations above USD 30 billion in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[7] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models; effective challenge). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
