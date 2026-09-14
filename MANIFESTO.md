# The AI Governance Engineering Manifesto

Version 0.2 · 2026-09-10 · Jorge García Aibar

---

**AI governance engineering is the application of engineering practice — systems thinking, product
thinking and code — to the governance of AI systems.** It treats governance not as a document to be
signed but as a system to be built, run and measured, with the same rigour engineers already apply to
the models and agents it governs.

It is more than "AI governance plus a few scripts." It is a change in how the work is done. Legacy AI
governance describes an AI system on paper and hopes the paper stays true. Engineering the governance
means the policy is executable, the control runs in the pipeline, the evidence is produced as a
by-product of the build, and the whole thing is judged by one test: did realised risk actually fall,
and can a regulator or auditor read the proof? It is a capability, not a job title. Anyone close
enough to the build can develop it. It is measured by realised risk reduction and by audit-ready
evidence — never by how many frameworks appear on a slide.

The precedent is GRC engineering, which over the last two years turned governance, risk and
compliance from manual toil into a product built with code, tested in CI/CD, and shipping evidence
through APIs [1]. As one of its authors puts it, "if the dashboard is green but the control does not
work, you have built theatre with extra steps" [2]. AI governance now needs the same step-change,
because the thing being governed — models that retrain, prompts that change, agents that act on their
own — moves faster than any document can follow.

## Fundamental problems with legacy AI governance

**1. Governance written for systems that no longer exist.** Legacy AI governance runs on PDF policies
and spreadsheet inventories that describe an AI system as it was on the day it was reviewed. But
models are retrained, prompts are rewritten and agents acquire new tools by the day. The artefact is
stale before it is signed. It is no accident that the function still sits mostly with privacy, legal
and IT and only 5% with security [3] — far from the pipeline where the system actually changes.

**2. Point-in-time review of a continuously changing thing.** Annual assessments and committee
sign-offs assume a system that holds still long enough to be judged. Frontier models and autonomous
agents do not. Gartner expects more than 40% of agentic AI projects to be cancelled by the end of
2027, citing inadequate risk controls among the causes [4], and predicts that by 2029 more than half
of successful attacks on AI agents will exploit access-control weaknesses and prompt injection [5] —
runtime failure modes that a once-a-year review is structurally blind to.

**3. Governance as a gate at the end, not a property of the build.** Governance arrives after the
model is trained, as a checkpoint to clear before launch. Engineers experience it as a tax collected
at the door, and nothing it produces is wired back into how the system is built. A policy that can
only recommend cannot stop a bad release. An eval that can fail the build can. Governance placed at
the end can only describe risk; governance built into the pipeline can prevent it.

**4. Framework theatre.** Mapping to NIST AI RMF or ISO/IEC 42001 becomes the end state instead of
the starting point. A green mapping matrix is mistaken for a working control. Yet as of today no
harmonised standard is cited in the EU's Official Journal, so even an ISO 42001 certificate confers
no presumption of conformity with the AI Act [6]. Coverage is not assurance. A crosswalk proves you
have read the framework, not that the control it points to actually fires.

**5. No runtime data path.** The registry does not know what is running. Most of the AI governance
platform category "manages the program — inventories, assessments, framework mappings, evidence
workflows — without any runtime data path" [7]. An independent read of the category's own leader points
the same way: IBM's account of topping Gartner's first Magic Quadrant for AI Governance Platforms
(2026) describes visibility into AI use cases, centralised AI asset inventory and lineage, and use-case
onboarding — the program layer — not runtime enforcement [10]. So the three questions that define the
discipline —
what AI is running, what is it allowed to do, what evidence proves it — go unanswered, because nothing
is connected to production. Meanwhile roughly one in eight reported AI breaches now involves an
autonomous agent [8]: exactly the layer the paper registry cannot see.

## Values

We have come to value the items on the left over the items on the right. We still use the items on
the right; we build toward the items on the left.

1. **Governance-as-code** over policy documents.
2. **Evals that can fail the build** over reviews that can only recommend.
3. **Runtime evidence** over point-in-time attestations.
4. **Agent identity and scope** over shared credentials.
5. **Machine-readable evidence** over screenshots.
6. **Inspectable, composable tooling** over black boxes.
7. **Measured risk reduction** over framework coverage.
8. **Shared ownership with engineering** over gatekeeping.

While there is value in the items on the right, we value the items on the left more. Not all of these
are new: values 1, 5 and 7 — governance-as-code, machine-readable evidence and measured risk
reduction — are inherited from GRC engineering. Values 2 and 4 — evals that can fail the build, and
agent identity and scope — are what AI forces us to add.

## Principles

The values say what we prefer; these principles say what we commit to *do*. They are rules of action,
not restatements of the preferences above.

**Build the control at the earliest point it can block.** Put every control where it can still stop
the thing going wrong, and no later — in the repository, the build and the runtime, not in a review
after the fact. The earliest enforceable point is the cheapest and the strongest, so that is where we
put it.

**Give every control teeth, or call it a signal.** A control has to be able to change what happens
next — block a merge, fail a deploy, revoke access. Anything that can only inform a committee is a
signal, and we label it honestly as one rather than dress it up as a control.

**Register and bound every actor before it acts.** Nothing — human or non-human — gets to act until it
has an owner, a declared scope and a way to be stopped. Autonomy is granted only where it can be
attributed, contained and withdrawn, never by default.

**Instrument the build to produce its own proof.** Wire each control to emit its own record as it
runs, so assurance falls out of the system instead of being assembled by hand. If demonstrating a
control needs a screenshot, we have not finished building it.

**Start from a named failure mode or a named harm.** Design each control against a specific way the
system fails — prompt injection, tool misuse, agent identity abuse, data exfiltration — or a specific
harm to a person's rights. If we cannot name the risk it answers, we do not build it.

**Make the governed path the easiest path.** Ship governance as tooling, templates and paved paths
engineers adopt without asking permission, and measure adoption. If routing around the governance is
easier than using it, we fix the product, not the people.

## What AI governance engineers build

Not decks. Working artefacts, versioned in a repository and running in production:

- **Policy-as-code** — governance rules as executable policy (`OPA/Rego`, Cedar, Policy Cards) that
  evaluate in CI/CD and at runtime.
- **An agent registry** — the runtime-aware inventory of every model, service and agent, each with an
  owner, a scope and a status.
- **AIBOM and model/data cards** — the bill of materials for an AI system (`CycloneDX ML-BOM`, `SPDX
  3.0 AI` profile) and structured transparency documentation.
- **Eval gates in CI** — adversarial and capability evals (Inspect, promptfoo, Garak, Giskard) wired
  into the pipeline so a failing eval blocks the release.
- **Runtime guardrails and kill switches** — input/output controls, tool-call mediation and a tested
  way to stop an agent, at the point of action.
- **Continuous assurance telemetry** — tracing and monitoring (`OpenTelemetry`, agent observability)
  that turns production behaviour into a live control signal.
- **Machine-readable evidence** — `OSCAL` and signed, structured artefacts that make the audit a
  query instead of a scramble.
- **Incident pipelines** — the plumbing to detect, triage and report serious incidents on the clock,
  including the EU AI Act's Article 73 reporting for high-risk systems.
- **FRIA and DPIA templates as code** — fundamental-rights and data-protection impact assessments
  maintained as versioned, reviewable artefacts, not one-off documents.

These artefacts map, layer by layer, onto the five-layer AI governance engineering stack: Govern-as-
Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime Controls & Observability,
and Assurance & Continuous Compliance.

We concede the inheritance plainly, because it is the honest defence against "this is just GRC with AI
words." Three of the five layers — Govern-as-Code, machine-readable evidence, and Assurance &
Continuous Compliance — are inherited from GRC engineering and carried across almost unchanged. Two
are what AI forces us to add: evals and red-teaming *as controls* (layer 03), because the thing being
governed is a model whose behaviour can only be established by testing it; and agent identity and
runtime control (layer 04), because an autonomous actor has no analogue in classic GRC. The new work
of the discipline concentrates in those two layers.

## A discipline, distinct from its neighbours

AI governance engineering is not AI safety research, MLOps, model risk management, AI compliance or
legal work, or Responsible AI ethics; it is the engineering that turns all of those into running
controls and readable evidence. It is the AI-era sibling of AI security engineering, the direct
descendant of GRC engineering, and the opposite of what some vendors call "AI governance
engineering" — governing the AI that engineers use inside their workflows [9]. Chapter 01 draws every
one of these lines in full.

## Authors

**Jorge García Aibar (v0.1–v0.2)** — AI Governance & Privacy Engineer. LinkedIn:
https://www.linkedin.com/in/jorgara

**Co-authors wanted.** This is version 0.2: a first public draft, deliberately incomplete. It was
written by one practitioner and it needs many. If you build governance for AI systems — policy-as-
code, agent registries, eval gates, runtime guardrails, continuous assurance — and you can bring a
verified fact, a pattern that worked, or a sharper argument, you are invited to co-author. The
discipline is a capability anyone can develop, and this text belongs to everyone who does the work.

## Sign / get involved

- **Read it** at https://aigovernanceengineer.com/manifesto and the Body of Knowledge at
  https://aigovernanceengineer.com/bok
- **Sign the manifesto** by opening a pull request that adds your name to `bok/CONTRIBUTORS.md`
  (SIGNATORIES section) in the repository, `github.com/<org>/aige` (to be created).
- **Contribute a chapter or a pattern** following `STYLEGUIDE.md`; every factual claim needs a
  sourced, verified citation.
- **Discuss it** on LinkedIn with Jorge García Aibar (https://www.linkedin.com/in/jorgara), naming
  the discipline, not the person.

## Licence

This work is licensed under **CC BY 4.0**. It may be freely copied and shared, but only in its
entirety and including this notice, so that it continues to identify *AI Governance Engineering: A
Manifesto & Body of Knowledge* as the source. Attribution: Jorge García Aibar and contributors.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] AI Governance Profession Report 2025. IAPP (with Credo AI). 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[4] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[5] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027". Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[6] CEN-CENELEC JTC 21 standards tracker / CSA research note (no harmonised standard cited in the OJ; ISO/IEC 42001 not a harmonised standard). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[7] "Best AI Governance Platforms 2026" (runtime data path critique). Kosmoy. 2026. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[8] Threat Report 2026 (~1 in 8 reported AI breaches involve autonomous agents). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: reported)
[9] "AI Governance Engineering" (governing AI used inside engineering workflows). Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (first-ever MQ; visibility into AI use cases, AI asset inventory and lineage, use-case onboarding — the program layer). IBM. 2026. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: primary)
