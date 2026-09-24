# 15. Governing deployment and use

> Governing the run: how a deployer decides to use an AI system, chooses it, contracts for it, takes
> it live, operates it and retires it, with every step leaving evidence that a control fired.

Most organisations deploy far more AI than they build. A provider's design duties are largely
discharged when the system is placed on the market; a deployer's duties begin when the system is put
to use, and they run for as long as it runs: use it as instructed, staff its oversight, monitor it,
suspend it when it presents a risk, keep its logs and tell people it is there [1]. Chapter 18 lists
the [Article 26 deployer duties](/bok/eu-ai-act#deployer-duties-article-26) one by one, and chapter
17 covers the incident side of them
([deployer duties: inform the provider, suspend use](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)). This chapter
follows one system from the decision to use it to the day it is switched off. At each step it names
the decision, the artefact that records it, the stack layer that produces the evidence and the record
that lands in the assurance store.

Two terms carry the chapter. A **deployer** is anyone using an AI system under its authority, except
in a personal, non-professional activity; a **provider** develops a system or model, or has it
developed, and places it on the market or puts it into service under its own name or trademark
[2]. The labels describe tasks, not kinds of organisation: a bank that fine-tunes a vendor model
and ships the result under its own brand can hold both roles for the same system (see
[When a deployer becomes a provider](#when-a-deployer-becomes-a-provider)). Chapter 14 covers the
build side; this chapter covers the run. Article references are to the EU AI Act as amended by the
Digital Omnibus, as of 2026-09-24, whose high-risk rules apply to Annex III systems from 2 December
2027 [3]; they are illustrative mappings, not a claim of conformity.

Governing deployment is not release engineering. MLOps asks whether a new version can be rolled out
and rolled back. AI governance engineering asks who decided the system may serve, on what evidence,
which signal rolls it back without a meeting, and what record proves each of those happened.

## The deployment lifecycle at a glance

| Stage | The decision | Artefact | Layer | Evidence record |
|---|---|---|---|---|
| Decide | Should AI do this, and exactly what? | Deployment Decision Record | 1 · 2 | Signed record linked to the registry entry |
| Choose | Which model, hosted where, adapted how? | Model selection record | 3 · 2 | Task-eval results per candidate |
| Contract | On what terms? | Contract and licence review | 1 · 5 | Clause checklist; AIBOM licence fields |
| Go live | Approve, approve with conditions, or reject? | Go-live decision with dissent | 1 · 5 | Decision record; conditions as policy |
| Roll out | How much exposure, and what rolls it back? | Rollout plan with rollback criteria | 4 | Stage-gate results; rollback events |
| Operate | Is it still fit, fair and worth it? | Monitoring plan; maintenance calendar | 4 · 5 | Drift, fairness, cost and energy telemetry |
| Assure | Do the controls still work? | Audit, red-team and threat-model programme | 3 · 5 | Findings tracked to closure |
| Communicate | Who must hear what, and when? | Communications plan and templates | 5 | Notices sent, with timestamps |
| Retire | Degrade, localise or switch off? | Deactivation and retirement runbook | 4 · 2 | Decision record; final evidence snapshot |

## The deployment decision

### Start from the use case, not the model

The decision to deploy is a product decision with a governance record. Before any model is compared,
write down the business objective and how you will know it was met, the people the system will act
on, the decision it informs or makes, and whether AI is the right tool at all: a rules engine, a
better form or a search index is sometimes the honest answer.

Then name the **negative space**: what the system is explicitly not for. Negative space is what later
makes function creep detectable, because a use that was never approved has somewhere to be recorded
as out of scope. The provider's **intended purpose** (the use it designed and documented the system
for, including the context and conditions of use [2]) is the outer boundary; your negative space
sits inside it.

Classify the use at intake, the workflow described in
[chapter 06](/bok/the-role#intake-and-classification): risk tier, regulatory exposure, data
sensitivity and autonomy. The classification decides which of the controls in this chapter apply. An
Annex III use triggers the deployer duties of Article 26 [1] and, for public bodies, private
entities providing public services, and credit-scoring and life- and health-insurance pricing uses,
the Article 27 fundamental-rights impact assessment (FRIA) before first use [4]. A chatbot or a
generator of synthetic content triggers the Article 50 transparency duties, live since 2 August 2026
[5]. The prohibited practices of Article 5 bind deployers as well as providers, including the
ban on systems that exploit vulnerabilities due to age, disability or a specific social or economic
situation [6].

### Set performance and explainability requirements first

Requirements written after a vendor demonstration are fitted to the demonstration. Set them before
you look at candidates:

- **Metrics that match the harm.** For a triage classifier, false negatives on urgent cases; for a
  generative assistant, groundedness and the refusal of out-of-scope requests. An average accuracy
  figure is rarely the metric that matches a harm.
- **Per-group floors.** A threshold per population the system acts on, so a good average cannot hide
  a group the system fails.
- **Go/no-go thresholds** that the go-live review will apply, each traced to the failure mode it
  stands for, which is the discipline set out in
  [the limits of the eval gate](/bok/definition#the-limits-of-the-eval-gate).
- **The explanation the use needs.** A reason code for an adverse decision, a cited source for a
  generated answer, or an interpretable model where the decision must be contestable. When a
  decision based on the output of most Annex III systems has legal or similarly significant effects on a
  person, that person has a right to a clear and meaningful explanation from the deployer of the
  system's role in the decision [7]. Designing for that answer is cheaper than retrofitting it;
  [chapter 16](/bok/fairness-and-explainability#explanation-techniques) covers the methods.

### Check the data and the people

**Data.** Does the input data exist at the coverage and quality the use needs, with a supply that
will last, and a lawful basis for this purpose? Where the deployer controls the input data of a
high-risk system, it must ensure the data is relevant and sufficiently representative for the
intended purpose [1].

**People.** Oversight must be assigned to people with the necessary competence, training and
authority, and the support to use it [1]. Article 4, reworded by the Omnibus, asks providers and
deployers to support the AI literacy of their staff [8]. Before a high-risk system is used
at work, an employer-deployer must inform workers' representatives and the affected workers [1].
Readiness also means the authority to pause: an operator who sees the system misbehave must be
allowed to stop it without first asking permission.

### The Deployment Decision Record

Pull these answers into one artefact, the **Deployment Decision Record (DDR)**, committed next to the
system's code and referenced from its registry entry (layer 02). Its floors become the thresholds of
the eval gate (layer 03); its negative space becomes the scope the runtime watches (layer 04). The
templates page has a JSON Schema for
[the deployment decision and the retirement runbook](/resources/templates#schema-deployment-decision-record).
An illustrative excerpt:

```json
{ "ddr_id": "ddr-csa-01-v1", "system": "csa-01",
  "objective": "resolve tier-1 refund queries without an agent",
  "not_for": ["credit decisions", "complaints about staff"],
  "risk_tier": "limited", "obligations": ["EU AI Act Art. 50", "GDPR Art. 35"],
  "floors": { "groundedness": 0.95, "out_of_scope_refusal": 0.98 },
  "retire_if": ["deflection below business case for two quarters"],
  "owner": "team-support-platform", "decision": "proceed-to-selection" }
```

> **In practice (illustrative)**
> For `csa-01`, the customer-service assistant in a large telco, the DDR's negative space listed
> "complaints about staff". Months later a team proposed routing internal HR queries to the same
> assistant. The intake form checked the proposal against the record, flagged it as a new use, and
> sent it back through classification instead of a quiet configuration change. The record did not
> stop the idea; it made the change of purpose visible and owned.

## Choosing the model

### Evaluate on your task, your data and your users

A public benchmark answers "how good is this model at that benchmark?". The deployer's question is
"how good is it at our task, for our users, under our constraints?". Build a **selection eval**: a
set of representative cases drawn from traffic you may lawfully use, labelled with the answer you
want, stratified by the groups and edge cases the DDR names, and scored on the metrics that match the
harm. Make it large enough to show the per-group difference you care about. Run every candidate
through the same harness with the same prompts, retrieval and guardrails, and keep the results: the
selection eval becomes the first version of the regression suite behind the
[eval gate](/bok/patterns#pattern-eval-gate-in-ci).

### What public benchmarks and leaderboards cannot tell you

- **Contamination.** Test items leak into training data. When researchers wrote a fresh set of
  grade-school maths problems matched to a popular benchmark, several model families lost up to 8% in
  accuracy, a sign of overfitting to the public set [9].
- **Selective disclosure.** A ranking reflects what providers choose to submit. An analysis of a
  widely used arena-style leaderboard found that a few providers tested many private variants before
  release and could retract scores if they chose [10].
- **Goodhart.** Once a benchmark matters commercially, models are tuned to it. The pressure that
  makes an eval gate Goodhartable applies with more force to a public number you do not control.

Use benchmarks to build a shortlist, never to make the decision.

### Count the whole cost, including energy

The cost of a model is the licence or API fee plus inference compute, integration, evaluation and
monitoring, the running cost of the governance stack around it (see
[the cost of the stack](/bok/the-stack#the-cost-of-the-stack)) and the cost of leaving. Energy and
carbon belong on the same ledger, and the model choice is where most of them are decided. One study
measured multi-purpose generative architectures as orders of magnitude more expensive per inference
than task-specific systems on the same tasks, even controlling for model size [11]. The
measurement boundary matters: one provider put the median text prompt of its assistant at 0.24 Wh,
counting idle capacity and data-centre overhead as well as the accelerators [12]; a
figure that leaves those out is not comparable. At the level of the whole sector, the IEA projects
data-centre electricity use to more than double to around 945 TWh by 2030 [13]. The AI Act asks
GPAI providers to document the known or estimated energy consumption of their models [14];
nothing in it measures your inference footprint, so the deployer has to.

### Record the choice

The **model selection record** lists the candidates, their selection-eval results, the cost and
energy estimates, the reasons for the choice, the conditions that would reopen it (a price change, a
new vendor version, a floor breached in production) and the exit plan. It is filed against the
registry entry, so "why this model?" is answered by a query a year later, when the people who chose
have moved on.

## Model types and deployment options

The model type changes the failure modes. The hosting option changes who can see and stop what. The
adaptation technique changes what you must re-test and, sometimes, your legal role. The tables below
describe each option, and the matrix at the end names the control each combination adds. Treat all
of it as illustrative, not a claim of conformity: the controls a real deployment needs follow from
its risk tier, its obligations and its failure modes.

### Model type changes the control set

| Model type | Dominant failure modes | Controls it adds (layer) |
|---|---|---|
| **Classic predictive (classifier, scorer, forecaster)** | Miscalibration; error gaps between groups; input and label drift; feedback loops where the score shapes the next training data. | L3: Per-group performance floors and a calibration eval on your own labelled data; L4: Drift monitor on inputs and outcomes (PSI, KS); L2: Model card that states the population the model was validated on |
| **Generative (text, code, media)** | Ungrounded or fabricated output; harmful or infringing content; prompt injection; leakage of personal or confidential data. | L3: Groundedness and red-team evals on your own prompts; L4: Input and output guardrails; disclosure and labelling of synthetic content (Art. 50); L2: Prompts and system prompts versioned as configuration in the registry entry |
| **Proprietary (API or licensed weights)** | Silent version change; lock-in; opaque training data; terms or prices that change under you. | L1: Contract terms (no training on inputs, residency) enforced as policy; L2: Vendor model version pinned in the registry entry; L3: Boundary evals re-run on every vendor version change |
| **Open-weight** | Licence or acceptable-use breach; tampered or malicious weight files; unpatched vulnerabilities that are now yours to patch. | L1: Licence and acceptable-use check as a policy gate; L2: AIBOM entry with source, licence and file hash; L3: Full eval and red-team suite of your own; L4: Your own guardrails: no vendor safety layer sits in front |
| **Small (task-sized, edge-capable)** | Capability ceiling; weaker refusal training; brittle outside its task. | L3: Task-specific eval that proves fitness for this task, not in general; L4: Route out-of-scope requests to a fallback or a human |
| **Large (general-purpose, frontier)** | Broad capability surface; wide jailbreak surface; cost overruns; over-reliance by users. | L1: Scope the use case in policy: what the system may not be asked to do; L3: Broader red team across the capabilities you do not need; L4: Rate limits and spend caps per identity |
| **Language-only** | Text harms; injection through documents and web content the model reads. | L3: Text red team including indirect injection; L4: Text guardrails on input and output |
| **Multimodal (image, audio, video)** | Synthetic media and impersonation; instructions hidden in images or audio; biometric and surveillance uses. | L1: Prohibited-practice checks (Art. 5) and a biometric-use policy; L3: Cross-modal red team; L4: Machine-readable marking of generated media (Art. 50) |

The largest split is classic against generative. Classic models fail quietly, through calibration,
drift and group error gaps; generative models fail loudly, through content. Proprietary against
open-weight is mostly a question of who produces the evidence: with an API you collect it from the
vendor (model card, AIBOM if offered, change notices), with open weights you produce almost all of it
yourself (hashes, scans, evals, red-team results, runtime logs; see
[third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

### Where it runs

| Where it runs | Dominant failure modes | Controls it adds (layer) |
|---|---|---|
| **Cloud (managed service or API)** | Data leaves your boundary; provider outage; inference routed to the wrong region. | L1: Residency and data-class policy as code; L4: Egress and region enforcement on the inference path; L5: Provider attestations and sub-processor list collected and dated |
| **On-premise (your data centre or private cloud)** | You own patching, capacity and physical security; updates lag. | L4: Network segmentation and access control on the weights; L2: AIBOM with file hashes for every deployed artefact; L5: Your own tamper-evident logs |
| **Edge (device, vehicle, branch)** | Tampering; extraction of weights; stale versions in the field; no central log. | L2: Signed model artefacts and a registry of field versions; L4: Secure boot, device attestation, remote rollback and remote disable; L5: Sampled telemetry that reaches the evidence store |
| **Hybrid (split by data class or load)** | Policy gaps at the boundary; sensitive data routed to the wrong tier; inconsistent versions. | L1: Routing policy by data class, evaluated on every request; L2: One registry entry spanning every tier and its versions |

### How it is adapted

| Adaptation | Dominant failure modes | Controls it adds (layer) | Role effect |
|---|---|---|---|
| **As is (prompting only)** | Model not fitted to your task or population; the vendor changes it underneath you. | L3: Validation against your own thresholds before go-live; L4: Compensating guardrails for the gaps the validation found; L2: System prompt versioned with the registry entry | Deployer, unless you rebrand it or change its intended purpose (Art. 25(1)(a), (c)). |
| **Fine-tune** | Safety training eroded; tuning data memorised; new biases. | L3: Treat the result as a new system: full eval and red team again; L2: Data card for the tuning set; AIBOM links base model and tuned weights; L1: Compute log checked against the GPAI modification criterion | Can be a substantial modification of a high-risk system (Art. 25(1)(b)) or make you the provider of a modified GPAI model. |
| **Retrieval-augmented generation (RAG)** | Retrieval poisoning; stale or unlicensed corpus; answers that leak documents across users. | L4: Corpus access control that mirrors the source system's permissions; L3: Groundedness eval against a corpus snapshot; L2: Corpus provenance and licence recorded in the AIBOM | Usually leaves the role unchanged. |
| **Distillation, quantisation, LoRA adapters** | Silent quality or safety regression; shifted error rates between groups; adapter sprawl. | L3: Re-run the eval gate and red team on the compressed artefact; L2: Register every adapter and quantised build as its own version | Distilling or adapting a GPAI model is a modification: check it against the compute criterion (verify). |
| **Agentic wrapper (tools, actions)** | Tool misuse; goal hijack; privilege abuse; actions that cascade. | L4: Agent identity, scoped credentials, tool mediation and a tested kill switch; L2: Agent registry entry with owner, scope and expiry; L4: Human-in-the-loop gate on high-consequence actions | Changes the risk more than the role: autonomy is the risk multiplier. |

### The model-type by deployment-option matrix

Read each cell as the one control the combination adds on top of its row and its column.

| Model type | Cloud | On-premise | Edge | Fine-tune | RAG | Agentic wrapper |
|---|---|---|---|---|---|---|
| **Classic predictive** | Residency check on features; input drift monitor | Own the retraining pipeline and its approval | Signed model; field-version telemetry; remote rollback | Retrain is a release: re-run per-group floors | Not typical; govern feature-store lineage instead | Score triggers an action: human gate on adverse outcomes |
| **Generative, language** | No-training and retention terms; output guardrail | Own guardrails, patching and energy metering | Small model; offline guardrails; signed updates | Full red team; safety-erosion eval | Groundedness eval; corpus permissions; poisoning checks | Agent identity, tool mediation, kill switch |
| **Generative, multimodal** | Provenance marks on output; biometric-use block | Own content signing; media retention rules | Camera and microphone notices; on-device minimisation | Likeness and consent checks on tuning media | Cross-modal injection tests on retrieved media | Screen and voice actions behind a human gate |
| **Proprietary (API)** | Pin the version; boundary evals on every change | Vendor appliance: attest version and update path | Vendor SDK: licence limits; offline revocation | Vendor tuning service: data terms; your own re-eval | Your corpus, their model: retention and no-training terms | Grant scoped tools; the vendor agent gets its own identity |
| **Open-weight** | Licence gate; hash-verified weights on rented compute | You own patching: AIBOM, file scans, red team | Weights are extractable: licence terms and threat model | Compute log against the GPAI one-third criterion | Every layer of evidence is yours to produce | Own guardrails end to end; no vendor safety layer |

## Build, buy or adapt

### Three routes, three evidence burdens

| Route | What you control | Evidence you produce | Evidence you collect | Typical role |
|---|---|---|---|---|
| **Buy** (SaaS, API) | Integration, prompts, identities, the traffic you send | Boundary evals; runtime logs of your traffic | Model card, instructions for use, certifications, change notices | Deployer |
| **Adapt** (fine-tune, RAG, agentic wrapper) | The adaptation and everything around it | Evals of the adapted system; tuning data card; compute log | Base model documentation and licence | Deployer; provider if an Art. 25 trigger or the GPAI criterion applies |
| **Build** (own model) | Everything | Everything | Licences for third-party data and components | Provider and deployer |

The less of the model you own, the more of your control budget moves from testing it to bounding it
and evidencing the supplier; the more you own, the more of the evidence is yours to produce.

### When a deployer becomes a provider

Article 25(1) makes a distributor, importer, deployer or other third party the provider of a
high-risk AI system, with the provider's obligations, when it puts its name or trademark on a
high-risk system already on the market; makes a substantial modification to a high-risk system so
that it remains high-risk; or changes the intended purpose of a system, including a general-purpose
one, so that it becomes high-risk [15]. A **substantial modification** is a change not foreseen
in the provider's initial conformity assessment that affects compliance with the high-risk
requirements or changes the intended purpose [2]. The initial provider then stops being the
provider of that system but must cooperate; the Omnibus extended that duty to cover technical
documentation, known limitations and failure modes, and targeted technical access for testing and
validation [8].

General-purpose models have their own test. The Commission's guidelines of 18 July 2025 on GPAI
obligations [16] treat an actor that modifies or fine-tunes a GPAI model as the provider
of the modified model only in exceptional cases, with an indicative criterion: the modification uses
more than one third of the original model's training compute. The obligations then cover the
modification, not the whole model [17]. The criterion is indicative, and how it applies to
distillation or repeated adapter training is a question to put to counsel (verify). The engineering
consequence is plain either way: log the compute of every fine-tune as an artefact, because the
question will be asked.

| Trigger | How it happens in practice | Detection | Artefact |
|---|---|---|---|
| Name or trademark (`Art. 25(1)(a)`) | White-labelling a vendor's high-risk system | Brand check in the release checklist | Role decision in the registry entry |
| Substantial modification (`Art. 25(1)(b)`) | Retraining, new data sources, thresholds moved beyond the provider's pre-determined changes | Change classification in CI against the pre-determined changes in the instructions for use [18] | Change record |
| Changed intended purpose (`Art. 25(1)(c)`) | A general assistant put to work on hiring or credit | Intake; the downstream use register | Re-classification; amended DDR |
| GPAI modification | Fine-tuning a GPAI model with more than a third of its original training compute | Compute log | Compute estimate filed with the AIBOM |

### Open-weight licences

Open weights are not one licence, and "open weight" is not "open source". Each family asks something
different of a deployer:

| Family | Examples | What it asks of you | Watch for |
|---|---|---|---|
| **Permissive** | Apache 2.0, MIT, BSD | Keep notices and the licence text; Apache 2.0 adds an express patent grant. | The model licence may be permissive while its training data or a dataset licence is not. |
| **Copyleft** | GPL family | Distributing a derivative requires releasing it under the same licence. | Applies to code in the serving stack as much as to the model; distribution is the trigger. |
| **Network copyleft** | AGPL 3.0 | Users interacting over a network with a modified version must be offered its source. | Serving a modified component behind an API can trigger the source offer. |
| **Responsible-AI licence (use-restricted)** | OpenRAIL family | Open access with listed prohibited uses that must be passed on to every downstream user and derivative. | Use restrictions travel with the model: your terms of use must carry them. |
| **Custom community licence** | Vendor "community" licences for open-weight models | Acceptable-use policy incorporated by reference; attribution or naming duties; scale thresholds above which a separate licence is needed. | Thresholds and policies differ per model version; naming rules can apply to derivatives you publish. |
| **Non-commercial or research-only** | CC BY-NC family; research licences | No commercial use. | A research-only dataset or model inside a commercial product is a breach, whoever added it. |

Three examples show the range. Apache 2.0 adds an express patent grant to its permissions [19].
The AGPL requires that users interacting with a modified version over a network be offered its
source [20], which reaches serving stacks. OpenRAIL-style licences grant open access but attach
use restrictions that must pass to every derivative and redistribution [21]. Custom community
licences go further: the Llama 3.1 licence incorporates an acceptable-use policy, requires "Built with
Llama" attribution, asks that derived models distributed to others carry "Llama" at the start of
their name, and requires licensees whose products had more than 700 million monthly active users on the release
date to request a separate licence [22]. The controls follow: a licence
check as a policy gate (layer 01), licence, acceptable-use version and file hash in the
[AIBOM](/bok/patterns#pattern-aibom) (layer 02), hash verification of every weight file before
load, and a scan of serialised model files before they reach a runtime. The full clause and licence
checklist is on the [contracts page](/resources/contracts).

### Owning the model: the upside and the burden

Building or heavily adapting your own model buys control: over versions and retirement dates, over
customisation, over where data lives, and over the evidence itself, since you can red-team weights
you hold. It also buys the provider's burden if you place the system on the market, and three
operational risks that API customers mostly rent away. **Weight security**: the weights are an asset
to protect, from theft of the files and from extraction through the inference API, which NIST's
taxonomy of adversarial attacks and MITRE ATLAS both catalogue [23][24]; rate limits,
query-pattern monitoring and least-privilege access to weight storage are the controls.
**Maintenance**: patching, re-validation and base-model upgrades become your calendar. **Key-person
risk**: a model only two people can retrain is a continuity risk with names attached.

### Liability, insurance and risk transfer

The new Product Liability Directive brings software, including AI systems, within the definition of
a product; Member States must transpose it by 9 December 2026, and it applies to products placed on
the market after that date [25]. For builders that place systems on the market, defect liability
becomes a design input; for deployers, the contract decides what recourse they have against the
supplier. A market for AI-specific insurance exists, including cover for losses from model errors
offered to AI vendors and to the organisations that deploy their systems [26]. Check existing
cyber, technology errors-and-omissions and liability policies for AI exclusions with your broker
before assuming cover. Where an insurer asks for evidence of controls, the underwriting questionnaire becomes one
more consumer of the assurance store. And risk transferred is not risk reduced: the residual risk left
after caps, exclusions and deductibles belongs in the risk register (see
[chapter 13](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it)).

## Vendor contracts and licence terms

When you deploy a system you did not build, the contract is a control surface, and the place where
the organisation's [third-party AI policy](/bok/governance-program#third-party-ai-policy) (chapter
12) becomes enforceable. It decides whether you
may test the system, whether you hear when it changes, where your data goes and how you leave. The AI
Act requires a written agreement between the provider of a high-risk system and third parties that
supply its components, tools and services, specifying the information, capabilities, technical access
and assistance the provider needs [15]. For buyers, the EU model contractual clauses for AI
procurement (MCC-AI), updated on 5 March 2025 in a high-risk and a light version with a commentary,
give a reference text drafted for public organisations; it is the latest version as of 2026-09-24
[27]. ISO/IEC 42001 Annex A.10 and the
NIST AI RMF (GOVERN 6, MANAGE 3) name the third-party controls the clauses support
[28][29][30].

The clauses that matter most for governance, with the red flag to look for and the evidence to keep
(the fallback position for each is on the [contracts page](/resources/contracts)):

| Clause | Red flag | Evidence to keep |
|---|---|---|
| **Use of your data for training** | Training use is on by default, allowed for "service improvement", or controlled by a setting the supplier can change. | The clause, the account or API setting captured at go-live, and a periodic re-check of that setting. |
| **Rights in inputs and outputs** | The supplier takes a licence to your inputs beyond providing the service, or reserves rights in outputs. | The clause, referenced from the registry entry of each system that uses the supplier. |
| **Retention and deletion** | Retention "as long as necessary" with no number, or abuse-monitoring retention you cannot shorten or see. | Retention terms per data type; deletion confirmations; your own log-retention schedule that meets Art. 26(6). |
| **Sub-processors and upstream model providers** | A sub-processor list that is not published, or changes with no notice and no right to object. | Dated snapshots of the sub-processor list; objection decisions. |
| **Data residency and transfers** | A region commitment for storage only, while inference or support may run anywhere. | Residency policy verdicts from the inference path; the transfer assessment. |
| **Documentation and instructions for use** | Documentation "available on request" or limited to marketing material. | Versioned copies attached to the registry entry. |
| **Audit and evaluation access** | Audit only by reading the supplier's own summary; testing, benchmarking or security research prohibited. | Reports received; your boundary eval results; the agreed test windows. |
| **Change notice, version pinning and deprecation** | Models may be "updated or improved at any time"; deprecation notice shorter than your re-validation cycle. | Change notices filed against the registry entry; re-validation results per version. |
| **Incident and vulnerability notification** | Notice "without undue delay" with no hours, or limited to personal-data breaches. | The SLA; notices received and their timestamps; your incident records that cite them. |
| **Availability, latency and rate limits** | Service credits as the only remedy for an outage that halts a critical process. | SLA reports; your own availability monitoring; continuity tests. |
| **IP indemnity** | Indemnity excluded when you modify prompts, use filters differently or combine outputs. | Proof that you met the indemnity conditions (filters on, documented use), kept as logs. |
| **Performance warranties and output disclaimers** | Blanket disclaimers of accuracy with no documented performance at all. | The documented performance, compared with your own evals. |
| **Liability caps and exclusions** | A cap set at a few months of fees, with data, IP and regulatory losses all excluded. | The cap and carve-outs, recorded as residual risk in the risk register. |
| **Supplier acceptable-use policy** | A policy incorporated by reference that the supplier can change unilaterally. | The policy version checked at go-live, mapped to your own prohibited-use list. |
| **Role allocation and regulatory cooperation** | Silence on AI Act roles, or a clause that shifts provider duties to you without the access to meet them. | The role decision recorded in the registry entry, with the clause that supports it. |
| **Security controls and certifications** | Certifications that exclude the AI service from their scope. | Certificates with their scope statements; red-team summaries. |
| **Termination assistance, portability and exit** | No transition period; fine-tuned weights or adapters belong to the supplier; export only in proprietary formats. | An exit plan and the record of an exit drill. |
| **Insurance** | No insurance clause, or cover that excludes AI-related claims. | Certificates of insurance, dated and filed with the contract. |

Two rules turn the table into governance. First, a clause that matters at runtime must become a
check: the no-training setting read back from the account, the residency commitment enforced on the
inference path, the version pin held in the registry. A clause nothing checks is a hope. Second, the
review is one step of the [Vendor / Model Due-Diligence Gate](/bok/patterns#pattern-vendor--model-due-diligence-gate),
so it re-opens on renewal and on every material change notice. The dataset behind this table, with the
risk each clause addresses, a fallback position and the instruments it maps to, is an engineering
checklist, not legal advice.

> **Example (illustrative)**
> A supplier's terms allowed 60 days' notice before retiring a model version. The deployer's
> re-validation cycle (selection eval, red team, canary) took about 90 days. The gap was recorded as a
> risk, negotiated to a 120-day deprecation window at renewal, and in the meantime covered by keeping
> a second candidate model warm in the eval harness.

## The go-live review

### What the review reads

The go-live review reads an evidence pack, not a slide deck: the DDR; the model selection record; eval
gate results against the floors; the red-team summary; the impact assessments (a FRIA where Article 27
applies, a DPIA where data protection law requires one, both maintained as in the
[FRIA-as-Code](/bok/patterns#pattern-fria-as-code) pattern); the contract review; the monitoring plan
with named owners; the rollout plan with its rollback criteria; the communications plan; and the
deactivation runbook. When the evidence is the provider's own (its instructions for use, which must
state the system's capabilities, limitations, oversight measures and maintenance needs [18]), the
review runs in **review mode**: it assesses the supplier's assessment and records, explicitly, what
the deployer could not verify. On the provider side, the same evidence came out of
[release readiness and conformity](/bok/governing-development#release-readiness-and-conformity)
(chapter 14).

### Three outcomes

| Outcome | Meaning | What is recorded | What the pipeline does |
|---|---|---|---|
| **Approve** | The evidence meets the floors | Decision, approver, residual risk and who accepted it | The rollout plan starts at its first stage |
| **Approve with conditions** | Proceed only while named conditions hold | Each condition with an owner, a deadline and the check that verifies it | Conditions become policy: a flag caps exposure, and the approval carries an expiry |
| **Reject** | The evidence does not support deployment | The reasons and what would change the answer | The deploy is blocked; the registry status reads `rejected` |

An approval with conditions is where governance most often turns into theatre, because conditions are
easy to grant and easy to forget. Make them code: each condition is a check with a deadline, and if
the check has not passed by then the approval lapses and the feature flag closes. Residual risk is
accepted by an authority that matches the risk tier, never by the team that wants to ship.

### Recorded dissent

Any member of the review can record dissent. The dissent is attached to the decision record, named,
and reviewed at the first monitoring review after go-live. It costs nothing when the dissenter is
wrong, and when they are right it answers the first question every incident review asks: did anyone
see this coming?

> **In practice (illustrative)**
> The go-live review for `csa-01` approved it with two conditions: a groundedness floor on the refunds
> topic, re-measured after four weeks of live traffic, and a Spanish-language red team before the
> assistant served Spanish speakers. Both became flags. The security lead recorded dissent on the
> tool scope for order lookups. The four-week check passed; the red team did not, so Spanish stayed
> behind its flag until a fix shipped, and the dissent was closed with a narrowed scope.

## Progressive delivery as a control

Progressive delivery limits exposure while evidence accumulates. Each stage is a gate with a
criterion set in advance; the stages are borrowed from site reliability engineering, where canarying
is defined as a partial, time-limited deployment of a change and its evaluation [31].

| Stage | What it is | What it proves | Rollback criterion (set before the stage starts) | Evidence |
|---|---|---|---|---|
| **Shadow** | The new system sees live inputs; its outputs are not used | Behaviour on real traffic without exposure | Disagreement with the incumbent or with human decisions above a threshold | Paired outputs; disagreement log |
| **Pilot** | A small, informed group of users | Usability; oversight works; the workforce is ready | Override rate or complaint rate above a threshold | Pilot report; feedback log |
| **Canary** | A small share of production traffic, compared with a control group [31] | No regression at scale | Any floor breached against the control | Per-metric canary analysis |
| **Blue-green** | Two production environments; traffic switches between them [32] | A tested, instant path back | Any severity-1 event | Switch events |
| **Feature flags** | Runtime toggles per cohort, region or function, including operational kill switches [33] | Exposure is controllable without a deploy | Set per flag | Flag change log |
| **Version pinning** | The registry pins model, prompt, corpus and guardrail versions | What ran is known | An unpinned change is detected | Registry diff |

Rollback criteria must be **pre-registered**: written into the rollout plan before the stage starts,
and evaluated by the pipeline, not by a meeting. A criterion invented after the metric moved is a
negotiation, not a control. The same applies to changes you did not make: a new vendor model version
is a release, and it goes through shadow and canary on your side against the pinned version before it
takes traffic.

## Operating the system

### Policies at go-live

The system goes live with the policies that make its use governable. An **acceptable-use policy**
for staff and customers, drawn from the negative space. **Role-based training**: what the system is
for, the limitations its instructions for use declare [18], when to override it and how to report
a problem, with completion as a condition of access. **Interface aids** that support judgement
rather than replace it: sources shown, confidence where it is meaningful, and a visible way to reach a
person. These are the practical form of the Article 26 duties to use the system as instructed and to
give oversight to competent people with authority [1], and of the responsible-use controls in
ISO/IEC 42001 Annex A.9 [28]. Oversight itself is designed as in
[designing human oversight](/bok/the-stack#designing-human-oversight-article-14).

### Inference-time data governance

Live inputs are data processing, and a deployed system creates new data with every request: prompts,
retrieved passages, outputs, logs and feedback. Govern them as you govern training data (see
[data governance across the stack](/bok/the-stack#data-governance-across-the-stack)):

- **Minimise** what reaches the model, with PII filtering and data-loss prevention in the input
  [guardrail](/bok/patterns#pattern-runtime-guardrail).
- **Set retention per data type** as code, reconciling the log-retention floor below with the
  storage-limitation ceiling of data protection law.
- **Re-check the lawful basis** when the purpose changes; a new use of old logs is a new processing
  purpose.
- **Map transfers** when inference, storage or support run in another jurisdiction; chapter 19
  treats [remote inference as a transfer](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
- **Plan for data-subject requests** that reach prompts, logs, retrieval corpora and fine-tuned
  weights. Deleting a record from a corpus is a delete; removing its influence from tuned weights may
  mean retraining, so decide before you tune on personal data. Deployers of high-risk systems use the
  provider's information to carry out their DPIA [1]; [chapter 19](/bok/privacy-and-ai#the-dpia-for-ai-systems) covers
  the privacy side in depth.

### Maintenance calendar and retraining governance

The provider's instructions for use state the system's expected lifetime and the maintenance it needs,
including how often [18]. The deployer's calendar starts there and adds its own:

| Cadence | Activity | Artefact | Layer |
|---|---|---|---|
| Continuous | Drift, fairness, quality, cost and energy signals against thresholds | Monitoring telemetry | 4 · 5 |
| Weekly | Triage issues and near misses; review override and complaint trends | Issue log | 5 |
| Monthly | Vendor change notices, sub-processor changes, SLA reports | Third-party review record | 2 · 5 |
| Quarterly | Threshold review; red team on current versions; card and registry refresh | Updated cards; red-team results | 2 · 3 |
| Yearly (or per risk tier) | Impact re-assessment; benefit review; licence and dependency refresh; deactivation drill | Re-assessment; drill record | 1 · 2 · 4 |
| On an event | New population, jurisdiction, autonomy level or vendor version; an incident | Re-assessment trigger record | 1 · 2 |

**Retraining governance** rests on one rule: a retrain, a fine-tune, a prompt change, a corpus refresh
and a vendor model update are all releases. Each goes through the eval gate and the progressive
delivery stages, and each bumps the version in the registry. A threshold change is a change to a
control, so it is a reviewed diff with an approver, not an edit on a dashboard. Retraining is
triggered by a drift or floor breach, by the calendar, or by a change in the world the DDR describes.

### Drift: what moves and how to see it

Concept drift is an unforeseeable change in the distribution of the data a model sees over time, and
the research on it divides the work into detection, understanding and adaptation [34]. In
production it helps to name what moved:

| Drift | What changes | Example (illustrative) | How to detect it |
|---|---|---|---|
| **Data (covariate)** | The input distribution | A new product line changes the questions customers ask | Population Stability Index or a Kolmogorov-Smirnov test on features or embeddings against a reference window |
| **Label (prior)** | The base rate of the outcome | Fraud rate rises in a season | Predicted against observed positive rate |
| **Concept** | The relationship between input and outcome | Same symptoms, new treatment guidance | Performance on fresh labels; change-point detection on the error rate |
| **Pipeline** | An upstream feature, schema or retrieval step | A schema change empties a field | Data contracts; null-rate and freshness monitors |
| **Vendor model** | The model behind the API | The provider ships a new version | Version-pin check; canary against the pinned baseline |
| **Usage** | Who uses the system, and for what | Staff start using the assistant for HR questions | Topic classification of traffic against the negative space |

Labels often arrive late, or never. For classic models, pair input-drift statistics with a delayed
performance check when labels land; for generative systems, sample outputs for groundedness scoring
and human review. Every drift signal needs a threshold, an owner and a defined consequence: an issue,
a retrain, a degraded mode or an incident.

### Fairness and quality in production

A system that passed its fairness evals at go-live can drift into unfairness without any code change.
Monitor error rates per group against the per-group floors in the DDR, complaint and appeal rates by
group, and, for generative systems, groundedness and refusal rates by topic and language. Where law
requires a periodic bias audit (New York City's Local Law 144, for example, requires a bias audit
within one year before an automated employment decision tool is used, and a public summary of its
results [35]), the production telemetry is what makes the audit cheap.
[Chapter 16](/bok/fairness-and-explainability#monitoring-fairness-in-production) covers the metrics; the point here is that they run
continuously and feed the same threshold, issue and incident path as every other signal.

### Who owns the signal

| Signal | Watches (responsible) | Decides (accountable) | Consulted | Informed | Escalates to |
|---|---|---|---|---|---|
| Performance and drift | ML platform on-call | System owner | AI governance engineer | Risk | Go-live panel if a floor is breached |
| Fairness | AI governance engineer | System owner | Legal; representatives of affected groups | DPO | Risk committee |
| Security and abuse | Security operations | Security lead | AI governance engineer | System owner | [Incident pipeline](/bok/patterns#pattern-incident-pipeline) |
| Compliance obligations | AI governance engineer | Compliance lead | Legal | Regulator liaison | Incident pipeline; communications owner |
| Cost, energy and benefit | FinOps | Business owner | Sustainability lead | Finance | Benefit review |

The rule is the one from [chapter 06](/bok/the-role#runtime-monitoring-and-incidents): you own a
signal when you can be paged for it. A critical system needs coverage for every hour it runs, and a
signal with no owner is a signal nobody acts on.

### Monitoring third parties while you run

A procured system keeps changing after the contract is signed. File every change and deprecation
notice against the registry entry, read the SLA reports, snapshot the sub-processor list, and re-open
the due-diligence gate on renewal. Keep an alternative model warm in the eval harness so a forced
migration starts from evidence, not from a standing start. The NIST AI RMF asks for exactly this:
third-party risks and benefits monitored regularly, and pre-trained models monitored as part of the
system's own maintenance [30].

### When the provider fails: continuity

Plan for the supplier failing in each of the ways it can: an outage, a rate limit at peak, a quality
drop, a withdrawn model, a forced deprecation, or a commercial or legal exit. The fallbacks are a
manual process that staff have practised, an alternative model behind the same interface, cached or
templated answers, and the degraded modes described below. Recovery needs its own evidence: back up
the corpus snapshot and the embeddings, or know that you can rebuild the index; keep the prompts and
guardrail configurations under version control; and test the switch. The NIST AI RMF asks for
contingency processes for failures in third-party AI systems deemed high-risk [29].

Some sectors make this a legal duty. Financial entities under DORA, in application since 17 January
2025 [36], must keep a register of information on all contractual arrangements for ICT
services from third-party providers, and must have exit strategies for ICT services that support
critical or important functions [37]. An AI model reached as a service is likely to count as an
ICT service for this purpose (verify for your case). Entities in scope of NIS2 must take measures for
business continuity, including backup management and disaster recovery, and for supply-chain security
[38]; whether you are in scope depends on your sector and size (verify).

### Benefit realisation

Track the objective in the DDR against what the system delivers, including its inference and
operating cost. Under-delivery is a governance signal, not only a business one: a system that costs
more to run and govern than it returns is a candidate for re-scoping or retirement, and the benefit
review is where that is decided on evidence. A register of live systems with no measured benefit is
an inventory of unpriced risk.

### Energy footprint reporting

Measure energy per request and in total, with the boundary stated: accelerators, host systems, idle
capacity and data-centre overhead [12]. On your own hardware, meter it; on a provider's,
ask for it in the contract and record what you received. Convert to carbon with the grid intensity of
the region that serves the traffic, report it next to cost in the benefit review, and let it inform
the next model choice: when a smaller model passes the selection eval, the energy difference is a
reason to prefer it [11].

### Records retention

| Record | Kept by | Minimum | Source |
|---|---|---|---|
| Logs automatically generated by a high-risk system, to the extent under the deployer's control | Deployer | At least six months, unless other law says otherwise | `Art. 26(6)` [1] |
| The same logs, under the provider's control | Provider | At least six months | `Art. 19(1)` [39] |
| Technical and quality-management documentation, declaration of conformity | Provider | 10 years after placing on the market | `Art. 18(1)` [40] |
| DDR, go-live decision, conditions and dissent | Deployer | The life of the system plus the limitation period counsel sets | Practice |
| Operator logs under China's voluntary TC260 framework 3.0 | Operator | At least six months, with audit | §5.3 [41] |

Retention is a control, so it is code: a schedule per record type, tamper-evident storage for logs, a
legal hold that overrides deletion, and archive formats someone can still read in 10 years. The
six-month floor for logs is a minimum; data protection law sets a ceiling for the personal data inside
them, and the two are reconciled per data type, not by keeping everything.

## Periodic assurance

### An audit programme, not an audit

A single audit is a snapshot. An audit programme has a charter, a risk-based cadence tied to the risk
tier, and independence proportionate to the stakes: second-line review, internal audit, or an
external assessor (see
[how this relates to certification](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments)).
Good programmes re-perform rather than read: the auditor re-runs a fairness check or replays a sample
of logs instead of accepting the report that says it was done. Every finding gets an owner, a date and
a closure test, and the open findings are a live query, not a spreadsheet.

### Red teaming on a schedule

Schedule red teaming by risk tier, and aim it at the deployed configuration (prompts, tools, retrieval
corpus, guardrails), not only at the model. For a procured system, test at the boundary within the
windows the contract allows. The [Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite)
pattern turns each finding into a regression test, so the next scheduled run proves the fix held.

### Threat modelling the deployed system

Decompose the data flows (user, application, retrieval, model, tools, downstream consumers), then
enumerate threats per element with a classic category checklist such as STRIDE, extended with the
AI-specific attacks that NIST's adversarial machine learning taxonomy [23], MITRE ATLAS
[24] and the OWASP Top 10 for Agentic Applications [42] catalogue. The output that
matters is the mapping from threat to mitigation to the test that proves the mitigation works:

| Threat | Where it enters | Mitigation | The test that proves it |
|---|---|---|---|
| Indirect prompt injection | Retrieved documents, tool outputs | Input guardrail; narrow tool scope | Red-team cases with planted instructions |
| Retrieval poisoning | Corpus ingestion | Source allow-list; provenance in the AIBOM | Canary documents that must never be retrieved |
| Model extraction | Inference API | Rate limits; query-pattern detection | Extraction probe against the limits |
| Membership inference, inversion | A model tuned on personal data | Minimise personal data in tuning; output filtering | Privacy attack suite on the tuned model |
| Tampered weights | Supply chain | Hash and signature verification | The pipeline fails on a hash mismatch |
| Tool misuse | Agent actions | Scoped credentials; human gate on high-consequence actions | Scope and [kill-switch](/bok/patterns#pattern-kill-switch--circuit-breaker) tests |

## Secondary use and downstream harm

Systems are used for more than they were approved for. The AI Act names the concept: **reasonably
foreseeable misuse** is use not in accordance with the intended purpose, but which may result from
reasonably foreseeable human behaviour or interaction with other systems [2]. Around it sit
**function creep** (the gradual extension of a system to purposes no one approved), **dual use** (the
same capability serving a harmful purpose), **downstream harm** (outputs feeding other systems that
act on them), **feedback loops** (outputs shaping the data the next version learns from, as when a
risk score decides who is inspected and so decides which cases get labelled) and **synthetic
recycling** (generated outputs reused as training data).

Forecast them before go-live with three cheap techniques. A **premortem**: assume it is a year later
and the system caused harm, then write down how. **Abuse cases**: misuse stories written next to the
user stories, by people paid to think like the abuser. **Stakeholder impact mapping**: every group the
outputs reach, including those who never touch the interface.

Then give the answers a home, which this chapter calls a **downstream use register**: intended and
prohibited uses written as a [Policy Card](/bok/patterns#pattern-policy-card); every consumer of the
outputs (systems, teams, partners) recorded against the registry entry; provenance and caveats
stamped on outputs so a consumer knows what it is using; and a re-test whenever outputs are used in a
new context. At runtime, off-purpose use is a signal like any other: classify traffic against the
negative space and alert on what falls outside it. Consumer-facing deployments add one more question,
whether children or other vulnerable people will use the system, with age assurance and the Article
5 prohibition on exploiting vulnerabilities as the controls to consider [6].

## External communications

Every deployed system needs a plan for talking to people outside the organisation, written before it
is needed. The plan names one owner and a single voice, an approval workflow, and a single source of
truth: a transparency page and a plain-language system card generated from the registry, so what you
say publicly cannot drift from what is running. Templates are versioned like code. The NIST AI RMF
asks that incidents and errors be communicated to relevant AI actors, including affected communities
[30].

| Audience | Proactive | Reactive trigger | Clock | Template |
|---|---|---|---|---|
| Market-surveillance authority | Registration where required (public-authority deployers) [1] | Reason to consider the system presents a risk: inform the provider or distributor and the authority, and suspend use [1] | Without undue delay | Pre-filled risk notice |
| Provider, then authority | None | A serious incident: inform the provider first, then the importer or distributor and the authorities [1] | Immediately; the provider's own reporting clocks follow (see [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) | Serious-incident notice |
| Data protection authority | DPIA where required | A personal data breach | Within 72 hours where feasible [43] | Breach notification |
| Users and affected people | AI disclosure [5]; notice to people subject to Annex III decisions [1]; explanation on request [7] | A breach likely to cause high risk to them [44]; a material change; a correction | Without undue delay | Notices; correction notice |
| Workers and their representatives | Information before use at work [1] | A change of scope | Before use | Briefing pack |
| Business customers and partners | Change log; model card and AIBOM updates | An incident affecting them; a deprecation | As the contract sets | Customer notice |
| Media and public | Transparency page; system card | An incident with public impact | Holding statement first, facts as confirmed | Holding statement; Q&A |

A **holding statement** is prepared in skeleton before any incident: what happened, stated only as far
as it is known; what has been done to contain it; what affected people should do; and when the next
update will come. It never speculates about cause. The incident side of communication is developed in
[chapter 17](/bok/incidents#the-response-lifecycle). At retirement, the same plan sends the sunset notices. And measure the
plan: whether notices reached the people they were for, and what the complaint volume did afterwards.

## Deactivation, degradation, localisation and retirement

### A deactivation policy someone can execute

A deactivation policy names its triggers, its decision authority, the record each decision leaves,
how evidence is preserved and the criteria for a safe restart. Triggers come in two kinds. Threshold
triggers: a floor breached and not recovered within a set window, a fairness gap above its limit, an
incident severity. Legal triggers: the deployer's own duty to suspend use when it has reason to
consider the system presents a risk [1]; a provider's corrective action to withdraw, disable or
recall a non-conforming system [45]; action by an authority on an AI system presenting a risk to
health, safety or fundamental rights [46]; and a practice newly prohibited. The NIST AI RMF asks
for mechanisms, with assigned responsibilities, to supersede, disengage or deactivate systems whose
performance or outcomes are inconsistent with intended use [30].

Evidence preservation comes first: freeze the logs, apply a legal hold, snapshot the versions. Then
stop. Deactivation applies to every kind of system, not only agents: a classifier embedded in a
vendor product needs a switch too, whether a feature flag or a fallback path. For agents, the
[Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker) pattern applies,
and [chapter 23](/bok/governing-agents) develops it.

### Graduated degradation

Switching off is the last resort, not the only one. Build the intermediate modes in advance as
operational toggles [33], and test them:

| Mode | What changes | Use it when |
|---|---|---|
| **Advice-only** | Output goes to a person; the system never acts or decides alone | Doubt about accuracy or fairness; the action is what carries risk |
| **Raised thresholds** | The system abstains below a higher confidence and routes to a person | Drift detected; labels pending |
| **Grounded-only** | Answers only with a retrieved source; otherwise it refuses | Hallucination rate rising |
| **Scoped off** | Disabled for one group, language, region or function | Harm concentrated in one segment |
| **Back to pilot** | Exposure returns to the pilot cohort | Broad regression with an unknown cause |
| **Off** | The fallback process takes over | Legal trigger; severe harm |

### Localisation by jurisdiction

Launch only where compliance has been shown, and keep the jurisdiction as a policy input rather than
a deployment accident: per-jurisdiction rule sets as code, regional instances where residency
requires them, and feature flags by region so one market can be switched off without touching the
others. Obligations overlap in places (the AI Act's six-month log floor and the six-month operator
log retention in China's voluntary TC260 framework [1][41]) and diverge in many others; see
[chapter 21](/bok/ai-laws-worldwide#comparing-the-regimes) and the [regulatory map](/bok/regulatory-map).

### Retirement and decommissioning

Design retirement in from the start: the DDR already names the conditions under which the system is
retired. Triggers include a benefit shortfall, a vendor deprecation, a replacement and a legal event.
The NIST AI RMF warns that irregular or indiscriminate termination can itself increase risk
[29], so retirement is a runbook, not a deletion:

1. **Dependency analysis.** Who consumes the outputs? The downstream use register answers it.
2. **Fallback and transition.** Users move to the replacement or the manual process, with training.
3. **Sunset notices.** Customers, partners and affected people hear before the date, not after.
4. **Final evidence snapshot.** Cards, evals, decisions and logs are archived per the retention
   schedule.
5. **Archive or dispose.** Weights, corpora and logs are kept or destroyed as licence, lawful basis
   and retention decide.
6. **Revoke identities and credentials.** Every non-human identity the system held is revoked.
7. **Retire, do not delete, the registry entry.** Its status reads `retired`, with the date and the
   decision record.
8. **Confirm it is gone.** [Shadow-AI Discovery](/bok/patterns#pattern-shadow-ai-discovery) checks
   that no copy still runs.

## One system from decision to retirement

`csa-01`, the assistant that [chapter 04](/bok/the-stack#one-system-through-the-five-layers) follows
through the five layers, also runs through this chapter. The artefacts it leaves, all illustrative:

| Stage | Artefact | Layer |
|---|---|---|
| Decide | `ddr-csa-01-v1`, with its negative space and floors | 1 · 2 |
| Choose | Selection eval across three candidates; energy estimate per 1,000 requests | 3 |
| Contract | Clause review; no-training setting read back weekly | 1 · 5 |
| Go live | Approved with two conditions and one dissent | 1 · 5 |
| Roll out | Shadow, then canary with pre-registered rollback on groundedness | 4 |
| Operate | Usage-drift alert on HR topics; vendor version change passed canary | 4 · 5 |
| Assure | Quarterly red team; findings closed as regression tests | 3 · 5 |
| Retire | Retirement conditions in the DDR; runbook drilled once a year | 2 · 4 |

**Maps to:** EU AI Act Art. 4, 5, 13, 25, 26, 27, 50, 86 · GDPR Art. 33, 34, 35 · ISO/IEC 42001
Annex A.6.2.5, A.6.2.6, A.9, A.10 · NIST AI RMF (GOVERN 1.7, GOVERN 6, MANAGE 2.4, MANAGE 3,
MANAGE 4) · DORA Art. 28 · NIS2 Art. 21 · all five layers. Mappings are illustrative, not a claim of
conformity.

## What you can do this week

1. **Write the DDR for your riskiest live system**, retroactively if you must, including its negative
   space and retirement conditions, and link it from the registry entry.
2. **Check five clauses in your largest AI contract**: use of your data for training, change and
   deprecation notice, incident notice, audit and evaluation access, and exit. File each gap as a risk.
3. **Pre-register the rollback criteria** for your next model, prompt or vendor-version change, and
   wire one of them as an automatic canary check.
4. **Compare log retention** on every high-risk or likely high-risk system against the six-month floor
   and your data-protection ceiling.
5. **Build one degraded mode** (advice-only or grounded-only) behind a flag, and test that it works.

## Sources

[1] EU AI Act Art. 26 (deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(4) relevant and representative input data; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months; 26(7) inform workers; 26(8) public-authority registration; 26(9) DPIA; 26(11) inform affected persons). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26 (verified: primary)
[2] EU AI Act Art. 3 definitions: (3) provider, (4) deployer, (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification. European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-3 (verified: primary)
[3] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk rules from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[4] EU AI Act Art. 27(1) (FRIA before first use by public bodies, private entities providing public services and deployers of Annex III points 5(b) and (c)). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-27 (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency obligations live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] EU AI Act Art. 5(1)(b) (prohibition on exploiting vulnerabilities due to age, disability or a specific social or economic situation; applies to placing on the market, putting into service and use). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-5 (verified: primary)
[7] EU AI Act Art. 86(1) (right to a clear and meaningful explanation from the deployer of the role of an Annex III system in a decision, except point 2 systems). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-86 (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4 replaced: providers and deployers support AI literacy; Art. 25(2) cooperation extended to technical documentation, known limitations and failure modes and targeted technical access; Art. 25(4) revised; Art. 26 unchanged). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[9] "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k; accuracy drops of up to 8% against GSM8k; systematic overfitting in several model families) (arXiv 2405.00332). Zhang et al. 2024-05-01. https://arxiv.org/abs/2405.00332 (verified: primary)
[10] "The Leaderboard Illusion" (undisclosed private testing of multiple variants and score retraction on Chatbot Arena) (arXiv 2504.20879). Singh et al. 2025-04-29. https://arxiv.org/abs/2504.20879 (verified: primary)
[11] "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" (multi-purpose generative architectures orders of magnitude more expensive per inference than task-specific systems, controlling for parameters) (arXiv 2311.16863; FAccT '24). Luccioni, Jernite, Strubell. 2023-11-28. https://arxiv.org/abs/2311.16863 (verified: primary)
[12] "Measuring the environmental impact of delivering AI at Google Scale" (median Gemini Apps text prompt 0.24 Wh; boundary includes host energy, idle capacity and data-centre overhead) (arXiv 2508.15734). Elsworth et al., Google. 2025-08-21. https://arxiv.org/abs/2508.15734 (verified: primary)
[13] Energy and AI, executive summary (data-centre electricity 415 TWh in 2024, around 945 TWh by 2030). International Energy Agency. 2025-04. https://www.iea.org/reports/energy-and-ai/executive-summary (verified: primary)
[14] EU AI Act Annex XI, Section 1, point 2(e) (GPAI technical documentation: known or estimated energy consumption of the model). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-11 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (value chain: 25(1)(a) name or trademark, (b) substantial modification, (c) changed intended purpose; 25(2) cooperation of the initial provider; 25(4) written agreement with third-party suppliers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[16] Guidelines on the scope of obligations for providers of general-purpose AI models under the AI Act. European Commission. 2025-07-18. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[17] Guidelines on obligations for general-purpose AI providers, FAQ (modifiers become providers only when the modification uses more than one third of the original model's training compute; obligations limited to documenting the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[18] EU AI Act Art. 13(3) (instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance measures, including their frequency; log collection). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-13 (verified: primary)
[19] Apache License, Version 2.0 (section 3, grant of patent licence). Apache Software Foundation. 2004-01. https://www.apache.org/licenses/LICENSE-2.0 (verified: primary)
[20] GNU Affero General Public License v3 (section 13, remote network interaction). Free Software Foundation. 2007-11-19. https://www.gnu.org/licenses/agpl-3.0.html (verified: primary)
[21] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that must be adopted by redistributions and derivatives). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[22] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated by reference; "Built with Llama" attribution; "Llama" at the start of distributed derived model names; separate licence above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[23] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[24] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems. MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[25] Directive (EU) 2024/2853 on liability for defective products (software within the definition of product; transposition by 9 Dec 2026; applies to products placed on the market or put into service after that date). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: secondary)
[26] aiSure AI insurance (cover for losses from AI model errors, for AI vendors and corporate adopters). Munich Re. 2026. https://www.munichre.com/en/solutions/for-industry-clients/insure-ai.html (verified: primary)
[27] Updated EU AI model contractual clauses (MCC-AI high-risk and light versions, with commentary; update of the 2023 clauses). Community of Practice on Public Procurement of AI, Public Buyers Community (European Commission). 2025-03-05. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses (verified: primary)
[28] ISO/IEC 42001:2023, Annex A control titles (A.6.2.5 AI system deployment; A.6.2.6 operation and monitoring; A.9 use of AI systems; A.10 third-party and customer relationships), referenced by identifier only. ISO/IEC (titles checked via a secondary listing). 2023. https://www.iso.org/standard/42001 (verified: secondary)
[29] NIST AI RMF Playbook, GOVERN (1.7 decommissioning and phasing out safely; 6.1 third-party risk policies; 6.2 contingency for failures in high-risk third-party systems). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] NIST AI RMF Playbook, MANAGE (2.4 supersede, disengage or deactivate; 3.1 third-party risks monitored; 3.2 pre-trained models monitored; 4.1 post-deployment monitoring plans; 4.3 incidents communicated, including to affected communities). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[31] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[32] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[33] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[34] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[35] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[36] Digital Operational Resilience Act (DORA): in application since 17 Jan 2025; register of information; ICT third-party risk. EIOPA. 2025. https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en (verified: primary)
[37] DORA (Reg. (EU) 2022/2554) Art. 28(3) register of information on ICT third-party arrangements and Art. 28(8) exit strategies for ICT services supporting critical or important functions. digital-operational-resilience-act.com. 2022. https://www.digital-operational-resilience-act.com/Article_28.html (verified: secondary)
[38] NIS2 Directive (EU) 2022/2555 Art. 21(2)(c) business continuity, backup management, disaster recovery and crisis management, and (d) supply-chain security. nis-2-directive.com. 2022. https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html (verified: secondary)
[39] EU AI Act Art. 19(1) (providers keep automatically generated logs for at least six months). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-19 (verified: primary)
[40] EU AI Act Art. 18(1) (providers keep documentation for 10 years after placing on the market or putting into service). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-18 (verified: primary)
[41] AI Safety Governance Framework 3.0, §5.3 operators' guidelines (logs kept for at least six months and audited; voluntary). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[42] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[43] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33 (verified: primary)
[44] Regulation (EU) 2016/679 (GDPR), Art. 34(1) (communication of a breach likely to result in a high risk to the data subject without undue delay). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_34 (verified: primary)
[45] EU AI Act Art. 20(1) (providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-20 (verified: primary)
[46] EU AI Act Art. 79 (procedure for AI systems presenting a risk to health, safety or fundamental rights). European Commission, AI Act Service Desk (Reg. (EU) 2024/1689). 2024-06-13. https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-79 (verified: primary)
