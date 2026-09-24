# 07. Maturity model (five levels)

> A ladder from paper to production (Documented, Inventoried, Tested, Enforced, Continuous), where
> each level is proven by what the running systems can show, not by what a document claims.

## Why a maturity model, and how to read this one

Maturity models fail when they measure paperwork. This one measures the systems. A level is not a
score you award yourself; it is a state you can demonstrate by querying the registry, running the gate
and reading the evidence store. The ladder runs from governance that exists only on paper to
governance that runs continuously off the runtime data path.

The five levels answer the three questions with rising confidence. **Documented** and **Inventoried**
answer *what AI is running*, first on paper, then from a live inventory. **Tested** and **Enforced**
answer *what it is allowed to do*, first by measuring, then by blocking. **Continuous** answers *what
evidence proves it*, continuously, from telemetry. Each level is assessed across all five layers of
the stack (chapter 04); you are at a level only when every layer has reached it, because a chain is as
strong as its weakest layer.

## The five levels

**Level 1: Documented.** Governance exists as artefacts a human maintains: a policy PDF, a
spreadsheet inventory, a risk register, a review that happens before launch. The rules are written and
someone is accountable, but nothing executes. Typical evidence: policy documents, a populated
spreadsheet, meeting minutes. Typical failure that moves you back: the document was last edited a
quarter ago and no longer matches production; the artefact is stale before it is signed.

**Level 2: Inventoried.** There is a real inventory of models and an
**[agent registry](/bok/patterns#pattern-agent-registry)**, and it is
fed by a runtime data path rather than typed by hand: a deploy registers a system with an owner, a
scope and a status. You can answer *what is running* on any given day. Typical evidence: a registry
with an owner and a class for every system; a discovery job reconciling registry against production.
Typical failure: [shadow AI](/bok/patterns#pattern-shadow-ai-discovery). A system or agent reaches
production without registering, so the inventory is complete only for the honest.

**Level 3: Tested.** Systems are evaluated against defined tests (capability, safety and adversarial
evals) and the results are recorded as evidence. Failures are visible, but a failing eval does not
yet stop anything. You know which systems fall short; you have not yet made falling short have
consequences. Typical evidence: versioned eval suites; stored, timestamped eval results; red-team
findings. Typical failure: the eval is run once before launch, pasted into a slide, and never re-run
when the model or its prompts change.

**Level 4: Enforced.** The tests bite. [Policy-as-code](/bok/patterns#pattern-policy-card) and
**[eval gates](/bok/patterns#pattern-eval-gate-in-ci)** run in CI/CD and at
admission, and a failing control blocks the merge or the deploy. Identity precedes autonomy: an agent
with no owner, scope or **[kill switch](/bok/patterns#pattern-kill-switch--circuit-breaker)** is
denied a workload identity. Governance is now a property of
the build, not a checkpoint after it. But a blocking gate is only as good as the test behind it, so
Level 4 has a second condition that is easy to skip: the eval suite's own *quality* is assessed, not
just its existence and its teeth. A gate that blocks on a trivial or stale suite is Level 4 by the
letter and framework theatre in fact: a green build that proves nothing. So the enforcement claim
requires that coverage is measured, adversarial cases are maintained against current threats, and
thresholds trace to named failure modes rather than round numbers (see chapter 01, "the limits of the
eval gate"). Typical evidence: pipeline logs showing blocked releases with reasons; admission-control
denials; the registry acting as a deploy gate; a tracked coverage or adversarial-quality metric for
the suites that gate. Typical failure: brittle gates that engineers route around; a gate maintained by
governance alone that engineering does not own; or a gate whose suite is trivial or unmaintained, so
the block is real but the assurance is not.

**Level 5: Continuous.** Assurance is produced continuously from the runtime data path. Guardrail
decisions, tool-call mediation, drift and agent behaviour stream into observability;
**[continuous assurance](/bok/patterns#pattern-continuous-assurance-telemetry)** turns production
behaviour into a live control signal; evidence is emitted as
[machine-readable artefacts](/bok/patterns#pattern-machine-readable-evidence-oscal) (`OSCAL`, signed
logs) as the pipeline and runtime operate. The audit is a
query. This is the end state most of the AI-governance platform category does not reach, because it
"manages the program … without any runtime data path" [1]. Typical evidence: a live assurance store;
streaming eval and guardrail telemetry; an audit answered by running a query. Typical failure:
telemetry that is collected but never wired to a decision; observability without enforcement decays
back to Level 3 dressed up as Level 5.

## Observable criteria, by layer and level

Read each row as one layer maturing left to right. You are at a level only when every row has reached
its column.

| Layer | 1 Documented | 2 Inventoried | 3 Tested | 4 Enforced | 5 Continuous |
|---|---|---|---|---|---|
| **1 Govern-as-Code** | Policies written as prose | Policies indexed, mapped to systems | Policy checks run and report, non-blocking | [Policy-as-code](/bok/patterns#pattern-policy-card) blocks merge/deploy | [Policy verdicts](/bok/patterns#pattern-continuous-assurance-telemetry) stream to assurance, versioned |
| **2 Inventory & Transparency** | Spreadsheet inventory | Registry fed by deploy; owner + scope per system | Registry reconciled against production | [Registry gates deployment](/bok/patterns#pattern-agent-registry); no entry, no identity | Registry live off [runtime discovery](/bok/patterns#pattern-shadow-ai-discovery); drift auto-flagged |
| **3 Evals & Red Teaming as Evidence** | Evals described in a plan | Eval suites exist and are versioned | Evals run, results stored, non-blocking | [Eval gate](/bok/patterns#pattern-eval-gate-in-ci) fails the build on regression; suite coverage and adversarial quality assessed | Evals run continuously; results are live evidence |
| **4 Runtime Controls & Observability** | Guardrails named in a design | Guardrails deployed, not measured | Guardrail decisions logged | [Kill switch](/bok/patterns#pattern-kill-switch--circuit-breaker) tested; tool-calls mediated and enforced | Runtime signals drive control decisions in real time |
| **5 Assurance & Continuous Compliance** | Evidence gathered by hand for audit | Evidence templated per control | Structured evidence produced per run | Evidence required to pass the gate | [Machine-readable evidence](/bok/patterns#pattern-machine-readable-evidence-oscal) emitted continuously; audit = query |

**Partial maturity is the normal state.** Almost no real function sits at one clean level across all
five layers; the usual picture is a ragged line: inventory at Level 4, evals at Level 2, assurance at
Level 3. That is not a failure of the model, it is the point of reading it by layer. The single overall
level is the weakest layer, and it is a *floor* for planning, not a verdict on the whole function. Two
readings follow: report the per-layer profile, not just the floor, because it shows where the leverage
is; and expect the profile to stay ragged, because layers mature at the speed of the work they gate,
not in lockstep. A function that is Level 4 on identity and Level 2 on evals is doing better than the
overall "Level 2" suggests, and its next move is obvious from the profile.

## Metrics per level

Each level has metrics you can read off the systems. Track the trend, not the single number.

- **Level 1 → 2:** percentage of AI systems and agents in the registry with a named owner and a class;
  registry-to-production reconciliation gap (systems in production but not registered).
- **Level 2 → 3:** percentage of registered systems with a versioned eval suite; percentage with a
  recorded, timestamped eval result in the last release.
- **Level 3 → 4:** percentage of releases passing through an **eval gate** (versus bypassing it);
  percentage of agents with a tested kill switch and a scoped, non-shared identity; number of releases
  blocked with a logged reason.
- **Level 4 → 5:** mean time to detect an unauthorised agent action (an agent doing something outside
  its declared scope, OWASP Agentic ASI03/ASI10 territory [2]); **evidence freshness** (age of the
  most recent evidence artefact per control); percentage of controls whose status is answerable by a
  live query rather than a manual pull.

The single most telling cross-level metric is evidence freshness. At Level 1 the freshest evidence is
a quarter old; at Level 5 it is as old as the last pipeline run. If your evidence ages in months, you
are not yet continuous, whatever the dashboard says.

## Self-assessment checklist

Answer each with the system, not the intention. A "no" caps you at the level below.

- **Documented:** Is every AI system covered by a written policy with a named owner? Is there a risk
  register that a person maintains?
- **Inventoried:** Does the registry get an entry automatically at deploy, with owner, scope and
  status? Can you list every model and agent running today, from the system of record, in under a
  minute?
- **Tested:** Does every registered system have a versioned eval suite? Are results stored with
  timestamps? Do you run red-team evals against your agents?
- **Enforced:** Does a failing eval or policy check actually block a release? Is an agent without an
  owner, scope and kill switch prevented from reaching production? Can you show a release that was
  blocked, with the reason logged?
- **Continuous:** Is runtime telemetry wired to control decisions, not just dashboards? Is evidence
  emitted as machine-readable artefacts continuously? Would an audit question be answered by a query
  rather than a collection sprint?

If you can say yes to a whole level and to every layer within it, you are at that level. The first
"no" is your next piece of work, and the smallest step to the next level is almost always to close
the weakest layer, not to add a sixth control to the strongest one.

## How this relates to certification and other assessments

This maturity model is not a certification and does not confer one. It relates to three external
schemes; the relationship is one of support and overlap, not equivalence.

**ISO/IEC 42001 certification.** ISO/IEC 42001 certifies that an AI management system (AIMS) exists and
is operated, a Level 1-2 proof of *process*: that governance is documented, owned and reviewed. It
says little about whether an **eval gate** blocks a build or whether evidence is machine-readable, the
Level 4-5 properties. And it is not a harmonised standard: the certificate confers no presumption of
conformity with the EU AI Act, because none is yet cited in the Official Journal [3]. Reaching Level 5
supports a 42001 audit by producing evidence continuously; it does not replace the certificate, and the
certificate does not prove you are past Level 2.

**OWASP AI Maturity Assessment (AIMA).** OWASP's GenAI Security Project publishes an AI Maturity
Assessment reported at v1.0 (Aug 2025) [4]. It is complementary: where AIMA scores the *breadth* of an
AI security programme, this model scores the *depth* of the runtime data path. Use AIMA to find gaps in
coverage; use this ladder to find whether the covered controls actually fire.

**CSA STAR for AI.** CSA's STAR for AI is a certification programme built on the AI Controls Matrix
(AICM), with a self-assessment tier, an automated "Valid-AI-ted" tier and a Level 2 combining
third-party ISO/IEC 42001 certification with the validated assessment [1][5]. Its Level 2 aligns with
the *Enforced* end of this ladder, but, like 42001, it attests a programme rather than measuring the
freshness of runtime evidence, the property continuous assurance (Level 5) makes cheap to produce and
hard to fake.

> **In practice**
> A function in a large telco assessed itself honestly and landed at Level 2 for inventory but Level 1
> for evals: the registry was live off the deploy pipeline, but evals were still run by hand before
> launch and pasted into slides. The chain was only as strong as its weakest layer, so the function
> was Level 1 overall. The smallest step was not a new framework mapping; it was versioning one eval
> suite and storing its timestamped results, moving the eval layer to Level 3, before wiring it into
> a gate. Evidence freshness fell from a quarter to a release cycle within two sprints.

**Maps to:** EU AI Act Art. 9 (risk management), Art. 17 (quality management system), Art. 72
(post-market monitoring) · ISO/IEC 42001 (AIMS) and ISO/IEC 42005 (impact assessment) · NIST AI RMF
(Govern, Measure, Manage) · OWASP Top 10 for Agentic Applications 2026 · CSA AICM / STAR for AI.
Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Best AI Governance Platforms 2026" (most of the category "manages the program … without any runtime data path"). Kosmoy. 2026. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] Top 10 for Agentic Applications 2026 (ASI03 Agent Identity & Privilege Abuse; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] ISO/IEC 42001 certification is not yet a presumption of conformity with the EU AI Act (no harmonised standard cited in the OJ). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[4] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025); Secure Governance initiative. OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[5] STAR for AI (three certification levels; Level 2 = third-party ISO/IEC 42001 + Valid-AI-ted; built on the AI Controls Matrix). Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/star/ai (verified: primary)
