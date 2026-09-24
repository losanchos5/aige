# 14. Governing AI development

> AI development is governed when every decision in the build, from the use case to the release,
> leaves a record that a gate reads, so the pipeline compiles the technical file instead of a team
> writing it afterwards.

## The build as a chain of gates

Most governance failures in an AI system are decided before it serves its first request. The use
case was never written down, so nobody can say what the system is for. The training set was scraped
under terms nobody checked. The test set leaked into training. The release went out because the date
was fixed. Each of these is a development decision, and each leaves behind either a record or a gap.

This chapter covers the provider side of the lifecycle: the organisation that designs, trains, tests
and releases an AI system or model. [Chapter 15](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance) covers deployment and
use. The split follows the EU AI Act's duty holders (see the
[regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)): most of what follows binds the
provider, and a deployer that builds on a procured model inherits a thinner version of it through the
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).

The reference texts agree on the stages and say little about the mechanism. ISO/IEC 5338:2023
defines AI system life cycle processes [1]; ISO/IEC 42001 groups the controls under Annex A.6
(life cycle) and A.7 (data) [2]; the NIST AI RMF puts context in Map and testing in Measure
[3]; the EU AI Act's quality management system asks for design control, design verification
and "examination, test and validation procedures to be carried out before, during and after the
development" [4]. The engineering reading: every stage ends in a gate, every gate reads a
structured record, and every record lands in the evidence store keyed to the registry id, the data
path of [one system through the five layers](/bok/the-stack#one-system-through-the-five-layers).

Layer numbers in the tables of this chapter follow chapter 04: **1 Govern-as-Code · 2 Inventory &
Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance &
Continuous Compliance**.

| Stage | Governance question | Record | Gate | Layer |
|---|---|---|---|---|
| Use case | Is this the right problem, and is AI the right tool? | Use-case record | [Intake approval](/patterns/use-case-intake-risk-tiering) | 1 · 2 |
| Design review | Do the requirements, architecture and misuse analysis hold up? | Design record and decision log | Design review sign-off | 1 · 2 |
| Data | May we use this data, and is it fit for the purpose? | Dataset admission record, datasheet, lineage | [Dataset admission gate](/patterns/dataset-admission-gate) | 1 · 2 · 3 |
| Testing | Does the system meet thresholds fixed before the tests ran? | Test plan, eval results, test report | Eval gate | 3 |
| Release | Is it ready, and is the conformity route complete? | Go/no-go record, declaration, registration | Release gate | 1 · 5 |
| Technical file | Can an authority reconstruct all of the above? | Annex IV file, cards, AIBOM | Documentation build | 2 · 5 |

This is not MLOps, which moves the model through the same stages, and it is not model validation in
the banking sense, which challenges the model at points in time (the
[disambiguation cluster](/bok/definition#the-disambiguation-cluster) draws both lines). It is the
governance record those two activities produce, made machine-readable and given the power to block.
The organisation-level rules each gate enforces are set out in chapter 12
([what policy requires at each stage](/bok/governance-program#what-policy-requires-at-each-stage)),
and the templates page has schemas and filled examples for the
[use-case record, design review, dataset admission, test plan and report, and release gate](/resources/templates#stage-build).
## The use-case record

The use-case record is the first artefact and the one most often missing. It is written at
[intake](/bok/the-role#intake-and-classification), stored as fields on the registry entry, and read
by every later gate. The EU AI Act anchors it: the **intended purpose** is "the use for which an AI
system is intended by the provider, including the specific context and conditions of use"
[5], and most high-risk duties are measured against it. The NIST AI RMF asks for the same thing
in engineering terms: intended purposes, prospective settings and the types of users are "understood
and documented" (MAP 1.1), and organisational risk tolerances are "determined and documented" (MAP
1.5) [3].

| Field | What it records | Read later by |
|---|---|---|
| Business context | The objective, the sponsor, the decision the system informs | Design review, go/no-go |
| Intended purpose | Task, context and conditions of use | Classification, tests, instructions for use |
| Out-of-scope uses | Uses the provider rules out, stated explicitly | Misuse analysis, instructions for use, runtime policy |
| Users and affected persons | Who operates it; who is subject to its outputs, including vulnerable groups | Impact assessments, bias tests |
| Decision authority | Advisory, human-approved or autonomous; who can overrule it | Oversight design, human-in-the-loop gate |
| Operating environment | Where it runs, input sources, languages, jurisdictions | Representativeness checks, test plan |
| Success metrics | The business metric, the model metric and the link between them | Test plan, monitoring |
| Error appetite | The cost of a false positive against a false negative; tolerated rates | Thresholds |
| Expected lifetime | Review date and retirement criteria | Maintenance, retention |
| Data availability | Whether lawful, sufficient data exists | Feasibility, dataset admission |

### Is AI the right tool?

The first gate question is whether to build at all. Google's engineering guidance opens with the
rule "Don't be afraid to launch a product without machine learning" [6], and the governance
version is sharper: if a rule, a lookup or a human workflow meets the success metric, a model adds
risk without adding value. Record the non-ML baseline in the use-case record and require the design
review to beat it by a stated margin. The baseline also gives testing its first comparison: a model
that does not outperform the rule it replaces has not earned a place in production.

### Error appetite: false positives versus false negatives

Every classifier trades one error for another, and the trade is a business and rights decision, not
a modelling one. A fraud model that flags too much freezes legitimate customers; one that flags too
little lets fraud through. Write the appetite down before training, in the currency of harm: what a
missed case costs, what a false alarm costs, and which error, for which group, is capped regardless
of cost. Threshold selection then becomes arithmetic against stated costs, and moving the threshold
becomes a change to the record with an approver, not a tuning decision inside a notebook. Per-group
error rates and the fairness trade-offs they force are treated in
[chapter 16](/bok/fairness-and-explainability#the-impossibility-results).

### Function creep

A model built for one purpose drifts into others because its scores are available and cheap. The US
banking agencies' revised model-risk guidance puts it plainly: "Using a model beyond its intended
purpose introduces additional uncertainty and risk" [7]. Under the EU AI Act the drift has legal
consequences. A value-chain actor that modifies the intended purpose of a system so that it becomes
high-risk is treated as its provider (Art. 25(1)(c)) [8], and a change not foreseen in the
initial conformity assessment that affects compliance is a **substantial modification** (Art. 3(23))
[5]. The engineering control is to make the intended purpose and the out-of-scope list fields
that a policy reads. A new consumer of the model's API declares its use at registration; a declared
use outside the record fails admission and reopens classification and the impact assessments.

> **Example (illustrative)** A use-case record stored on the registry entry of a credit-limit model.
> Every later gate reads these fields rather than a slide.

```json
{
  "id": "uc-credit-limit-07",
  "registry_id": "clm-07",
  "intended_purpose": "Recommend a credit-limit band for existing retail customers; a credit officer approves.",
  "out_of_scope": ["new-customer onboarding", "collections prioritisation", "employment decisions"],
  "affected_persons": ["retail customers", "guarantors"],
  "decision_authority": "advisory; officer approval required above band 3",
  "success_metric": { "business": "bad-debt rate", "model": "AUC >= 0.78 on frozen holdout" },
  "error_appetite": { "false_negative": "loss amount", "false_positive": "declined uplift",
                      "max_fnr_gap_between_groups": 0.03 },
  "non_ml_baseline": "scorecard-v5",
  "classification": { "eu_ai_act": "high-risk, Annex III 5(b)", "gdpr_dpia": true, "fria": true },
  "owner": "team-credit-decisioning",
  "review_by": "2027-03-31"
}
```

> **In practice (illustrative)**
> A retention team in a large telco asked for a churn model and got, at intake, a one-page use-case
> record to fill instead of a notebook. Writing the out-of-scope list surfaced that sales wanted the
> same scores to set individual discount levels: a second purpose with its own fairness exposure. The
> record split the request into two use cases, each with its own classification and error appetite,
> and the discount case went back for an impact assessment before any training ran.

## Design review

The design review is the gate between an approved use case and spending compute. It reads the
use-case record and produces a **design record**: requirements, architecture and model choice with
their rationale, the misuse analysis, the oversight design and the controls built in. Annex IV point
2(b) will ask a high-risk provider for the key design choices, their rationale and assumptions, and
the trade-offs made [9]; written at the time, that costs minutes, and reconstructed a year
later, it costs a project.

### Requirements with traceability

Requirements come in three families. **Functional** requirements say what the system does.
**Non-functional** requirements set floors for accuracy, latency, fairness, explainability, privacy,
robustness and cost. **Regulatory** requirements are the obligations the classification triggers,
such as event logging or designed-in oversight for a high-risk system. The NIST AI RMF asks that
system requirements are "elicited from and understood by relevant AI actors" (MAP 1.6) [3].

Traceability is the engineering part. Each requirement gets an id, each id maps to at least one test,
and each test emits an evidence record naming the requirement. The trace then becomes a join, not a
spreadsheet: `REQ-FAIR-02` (false-negative-rate gap between age bands at most 0.03) resolves to the
suite `fnr-gap-by-age.v2`, to its last result, and to the release that shipped on it. A requirement
with no test is a wish; a test with no requirement is noise in the gate.

### Architecture and model-selection trade-offs

Model choice is a governance decision because it fixes what can later be tested, explained and
evidenced. Record each choice as a short decision record (context, options, decision, consequences,
date, approver) in the same repository as the code.

| Choice | Options | Governance consequence |
|---|---|---|
| Interpretable or complex | Scorecard, sparse or additive model, small tree; or gradient boosting, deep network, LLM | An interpretable model is its own explanation; a complex one needs post-hoc explanation that can diverge from the model. Rudin argues that high-stakes decisions should use interpretable models instead of explaining black boxes after the fact [10] |
| Open-weight or proprietary | Self-hosted weights; or a vendor API | Weights can be tested, pinned and hosted in region; an API can change behind you, and its evidence is collected, not produced ([procured AI](/bok/the-stack#third-party-and-procured-ai)) |
| Train, fine-tune or prompt | Own model; fine-tuned foundation model; prompting and retrieval | Each step up adds training-data duties; a large enough modification of a general-purpose model can make you its provider [11] |
| Retrieval or fine-tuning for knowledge | RAG corpus; knowledge in weights | A corpus can be versioned, filtered and deleted from; knowledge in weights cannot be removed without retraining |
| Hosting | Managed service; own infrastructure | Data residency, log ownership and retention control |
| Cost and sustainability | Model size, training runs, inference volume | Annex IV asks for the computational resources used to develop, train, test and validate [9]; Annex XI asks GPAI providers for known or estimated energy consumption [12] |

### Reasonably foreseeable misuse

**Reasonably foreseeable misuse** is "the use of an AI system in a way that is not in accordance with
its intended purpose, but which may result from reasonably foreseeable human behaviour or interaction
with other systems" [5]. It is not the same thing as an attack. An attacker is modelled by the
red team in [layer 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence); foreseeable misuse
is what ordinary users and adjacent systems will do with the output anyway: a triage score read as a
diagnosis, a CV ranking used to reject without review, a summariser pointed at a language it was
never tested on.

The EU AI Act makes the analysis a design input twice. The risk management system must estimate and
evaluate the risks that emerge under conditions of reasonably foreseeable misuse (Art. 9(2)(b))
[13], and the instructions for use must disclose known or foreseeable circumstances, including
such misuse, that may lead to risks to health, safety or fundamental rights (Art. 13(3)(b)(iii))
[14]. Keep a **misuse register** in the design record: scenario, who would do it, likelihood,
harm, and the response. Each entry must land in at least one of three places: a test in the eval
suite, a runtime policy that blocks or flags it, or a warning in the instructions for use. An entry
that lands nowhere is an accepted risk and needs a named acceptor
([chapter 13](/bok/risk-management#who-may-accept) covers who may accept).

### Oversight and controls designed in

The decision-authority field of the use-case record sets the oversight model. The EU's High-Level
Expert Group names three approaches: human-in-the-loop, human-on-the-loop and human-in-command
[15]. The design review picks one per class of decision and designs it against automation bias
and oversight that degrades under load, as set out in
[designing human oversight](/bok/the-stack#designing-human-oversight-article-14) and the
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) pattern. The same review
fixes the controls that are cheap now and expensive to retrofit: event logging, a rollback path, a
shadow mode, and a [**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker)
for anything that acts.

The review is a gate with named reviewers: an engineering lead, the AI governance engineer, security,
privacy, a domain expert and, where the affected persons are outside the organisation, someone who
can speak for them. Its output is a signed design record with open conditions, not minutes.

## Data for training and testing

[Data governance across the stack](/bok/the-stack#data-governance-across-the-stack) sets the rule
that every dataset carries a lawful basis, a provenance, a retention limit and a set of rights. This
section is the development-time procedure that enforces it: a [**dataset admission gate**](/patterns/dataset-admission-gate). A training
job may read only datasets whose admission record is complete and signed by the data owner, and the
check is policy-as-code in the pipeline, not a reminder in a wiki.

### The right to use the data

Admission starts with rights, because a quality problem can be fixed and a rights problem often
cannot. Per dataset, the record answers five questions.

- **Lawful basis and purpose.** For personal data, which GDPR basis applies to training, and whether
  training is compatible with the purpose of the original collection. Purpose limitation (Art.
  5(1)(b)) and the compatibility factors of Art. 6(4) decide whether data collected to serve
  customers may train a model about them [16]. Consent to a service is not consent to train.
- **Special categories.** After the Digital Omnibus, the narrow basis to process special-category
  data for bias detection sits in a new Art. 4a rather than the old Art. 10(5), conditioned on
  safeguards and deletion [17] (see the [regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- **Models as personal data.** The EDPB's Opinion 28/2024 (December 2024) holds that a model trained
  on personal data is anonymous only if it is very unlikely both to identify the people whose data
  trained it and to let anyone extract that data through queries; it sets a three-step test for
  legitimate interest and warns that unlawful processing in development can affect the lawfulness of
  deployment [18]. [Chapter 19](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference) takes this further.
- **Scraped and third-party content.** The EU's commercial text-and-data-mining exception applies
  only where rightholders have not reserved their rights "in an appropriate manner, such as
  machine-readable means" for content made publicly available online (DSM Directive Art. 4(3))
  [19], and a GPAI provider must keep a copyright policy that identifies and complies with such
  reservations (AI Act Art. 53(1)(c)) [20]. Record the crawl date, the reservation check and its
  result per source.
- **Licences and warranties.** Whether the dataset licence permits training, commercial use and
  distribution of derived models, and what the supplier warrants about lawful collection. The licence
  goes into the [**AIBOM**](/patterns/aibom) so a licence change surfaces in the next
  build.

### Quality, quantity, representativeness and fitness for purpose

For high-risk systems, Art. 10 turns data quality into law. Training, validation and testing sets
need governance practices covering, among others, collection and origin, preparation, the
assumptions about what the data measures, availability and suitability, bias examination and
mitigation, and data gaps (Art. 10(2)); they must be "relevant, sufficiently representative, and to
the best extent possible, free of errors and complete" (Art. 10(3)) and reflect the setting of use
(Art. 10(4)) [21]. The ISO/IEC 5259 series supplies the vocabulary, the measures and the process
and governance frameworks [22].

| Dimension | Question | Test that evidences it |
|---|---|---|
| Label accuracy | Are the labels right? | Audit of a labelled sample; inter-annotator agreement |
| Completeness | Are fields, segments or periods missing? | Null rates per field and per segment |
| Consistency | Is the same fact recorded the same way? | Schema and constraint checks |
| Timeliness | Is the data current for the operating environment? | Date range against the use-case record |
| Quantity | Are there enough examples per class and per group? | Cell counts against the minimum in the test plan |
| Representativeness | Does the population match the deployment population? | Distribution comparison against a reference |
| Fitness for purpose | Does the data measure what the use case needs, or a proxy? | Proxy analysis; assumption register (Art. 10(2)(d)) |
| Integrity | Has it changed since admission? | Content hashes; signed snapshots |

Quantity is not representativeness. A large dataset drawn from the wrong population is precisely
wrong, and more of it does not cure the bias; it only narrows the confidence interval around the
wrong answer. The tools catalogue lists
[data-validation tools](/resources/tools#cat-data-validation) as illustrative examples, not
endorsements.

### Owners, stewards and the admission gate

The **data owner** is accountable for a dataset: its permitted uses, its risk acceptance and the
signature on its admission record. The **data steward** operates it: quality checks, metadata,
access and deletion. Separating the two keeps the person who wants the data used from being the only
person who decides it may be. Where many teams share data, a small data review board settles
contested admissions and sets the minimum admission checklist; the checklist itself lives as code so
that a missing field fails the pipeline.

### Provenance versus lineage

The two words are used interchangeably and should not be. **Provenance** is where a dataset came
from and on what terms. W3C PROV defines it as "information about entities, activities, and people
involved in producing a piece of data or thing, which can be used to form assessments about its
quality, reliability or trustworthiness", and its data model (PROV-DM, a W3C Recommendation since
30 Apr 2013) expresses it as entities, activities and agents [23]. **Lineage** is how the data
moved and changed through pipelines. OpenLineage provides an open standard for emitting lineage
events about datasets, jobs and runs, with extensible facets [24]. Lineage runs both ways:
backward lineage answers "what fed this model?", forward lineage answers "which models used this
dataset?", and the second question is the one an erasure request or a licence withdrawal asks.

Choose granularity by where rights attach. Dataset-level provenance is the default. Record-level
provenance is needed where rights attach to records (personal data, per-source licences, opt-outs).
Feature-level lineage is needed for sensitive derived features that can act as proxies. The
human-readable companion is a datasheet: Gebru and colleagues proposed that every dataset carry one
covering its motivation, composition, collection, preprocessing, uses, distribution and maintenance
[25]. The tools catalogue lists [versioning and lineage tools](/resources/tools#cat-versioning) as
illustrative examples, not endorsements.

### Synthetic data, augmentation and privacy-enhancing technologies

Synthetic data inherits the properties of its generator: its biases, its gaps and, where the
generator memorised, its source records. Treat a synthetic set as a dataset with its own admission
record naming the generator, the seed data and the privacy method. Differential privacy is the
privacy-enhancing technology with a measurable guarantee, and NIST SP 800-226 (March 2025) explains
how to evaluate a differential-privacy claim and the "privacy hazards" that arise when the
mathematics meets an implementation [26]. Augmentation and resampling change class balance
and, applied before the train and test split, leak information into the test set and inflate scores.

Synthetic data is also a disclosure item. California's AB 2013, operative since 1 Jan 2026, requires
developers of generative AI systems made available to Californians to post training-data
documentation that states, among other items, whether synthetic data generation was used
[27]; the EU template for the GPAI training-content summary lists synthetic data among the data
sources to describe [28].

> **Example (illustrative)** A dataset admission record. The training job checks `admitted` and
> `permitted_uses` against the use-case id before it reads a byte.

```json
{
  "dataset_id": "ds-claims-2019-2025@v4",
  "owner": "head-of-claims-data",
  "steward": "data-platform-claims",
  "sources": [{ "name": "claims-core", "period": "2019-01/2025-12",
                "basis": "GDPR Art. 6(1)(f); compatibility assessment CA-2026-014", "licence": "internal" }],
  "tdm_reservation_check": "not applicable (internal data)",
  "special_category": { "present": false },
  "provenance": "prov:wasDerivedFrom claims-core@2026-01-15",
  "lineage_run": "openlineage:claims-features/run-8812",
  "quality": { "null_rate_max": 0.02, "label_agreement": 0.91, "min_n_per_group": 400 },
  "permitted_uses": ["uc-fraud-triage-03"],
  "retention_until": "2032-12-31",
  "admitted": true,
  "admitted_by": "head-of-claims-data",
  "timestamp": "2026-09-20T10:12:00Z"
}
```

## Testing and validation

### A test plan before the first run

The EU AI Act requires high-risk systems to be tested "throughout the development process, and, in
any event, prior to their being placed on the market", against "prior defined metrics and
probabilistic thresholds appropriate to the intended purpose" (Art. 9(8)) [13]. The NIST AI RMF
asks that test sets, metrics and tools are documented (MEASURE 2.1) and that the system is shown to
be valid and reliable, with the limits of generalisation documented (MEASURE 2.5) [3]. The
operative words are *prior defined*. Freeze the test plan in the repository before evaluation
starts: metrics, thresholds with their link to the error appetite, datasets, subgroups, sample sizes
and the number of repeated runs. A change to the plan after results are known is a diff with an
approver. That single rule prevents metric shopping, the habit of choosing the metric that passes
after seeing all of them.

### The test-type matrix

ISO/IEC TR 29119-11 gives guidelines for testing AI-based systems [29], and the ISO/IEC 24029
series covers the assessment of neural-network robustness [30]. The matrix below is the
working version: one row per test type, one column per system family, and the evidence each run
leaves. Tail latency (the 95th or 99th percentile) belongs in it because a mean hides the slow
requests that users and timeouts actually meet.

| Test type | Classic ML | LLM or agent system | Evidence record |
|---|---|---|---|
| Unit | Feature transforms, data validators, model-wrapper input and output contracts | Prompt templates, tool schemas, output parsers | CI test run |
| Integration | Pipeline end to end on a fixture dataset | Orchestration, retrieval and tool calls against sandboxes | Integration report |
| Validation | Holdout, k-fold cross-validation, external validation on another site or period | Held-out task suites, golden sets, human-rated samples | Eval result with interval |
| Performance | Throughput, p95 and p99 latency, memory | Time to first token, p99 latency, tokens and cost per task | Load-test report |
| Robustness and out-of-distribution | Noise, perturbation, covariate shift, out-of-distribution sets | Paraphrase, typos, language and format shift, long context | Robustness eval |
| Stress and edge cases | Extreme values, rare classes, missing inputs | Oversized inputs, tool failures, timeouts, loops | Stress report |
| Security and adversarial | Evasion, poisoning, model extraction, membership inference | Prompt injection, jailbreak, tool misuse, data exfiltration | Red-team findings |
| Bias and fairness | Error and selection rates by group | Quality and refusal rates by group, language and dialect | Subgroup eval |
| Interpretability | Global feature importance, local explanations, reason-code stability | Citation faithfulness, rationale consistency | Explanation eval |
| Scenario | End-to-end cases from the use-case record and misuse register | Multi-step tasks and agent trajectories | Scenario report |
| Human-in-the-loop | Reviewer accuracy with and without the model; override rate | Approval quality under load; automation-bias probes | Oversight test |
| Regression | Score deltas against the last release | Score deltas against the last model or prompt version | Eval gate verdict |

Each row is a suite behind the [**Eval Gate in CI**](/patterns/eval-gate-in-ci); the
security row is the [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite).
Fairness metrics are defined in [chapter 16](/bok/fairness-and-explainability#group-fairness-metrics),
which also covers [bias and interpretability testing](/bok/fairness-and-explainability#testing-explanation-quality)
of the explanations themselves.

### Statistical validity of evals

An eval gate is only as good as the statistics under its threshold, and most gates have none
([the limits of the eval gate](/bok/definition#the-limits-of-the-eval-gate) set out the other
limits). Miller's treatment of language-model evaluations frames eval questions as a sample from an
unseen super-population and gives the formulas for standard errors, for comparing two models and
for planning sample sizes [31]. Four consequences for the gate follow.

- **Report an interval, not a point.** A pass rate of 0.96 on 200 cases has a standard error of
  √(0.96 × 0.04 / 200) ≈ 0.014, so its 95% interval is about 0.933 to 0.987 (±1.96 standard
  errors). A 0.95 threshold sits inside it, and the gate cannot tell a pass from a fail. On 2,000
  cases the interval narrows to about 0.951 to 0.969. Size the suite from the threshold, not from
  the time available.
- **Zero failures is not zero risk.** If none of *n* independent cases fails, the failure rate that
  would produce that result 5% of the time satisfies (1 − p)^n = 0.05, so p ≈ −ln(0.05)/n ≈ 3/n.
  Three hundred clean cases bound the failure rate at about 1% with 95% confidence.
- **Repeat non-deterministic runs.** Sampling temperature, batching and tool latency make one run a
  sample of one. Run each suite several times, report the mean and the spread, pin seeds and versions
  where the stack allows, and compare models on the same questions (a paired design) to cut noise
  [31].
- **Distrust the judge and the benchmark.** LLM judges show position, verbosity and
  self-enhancement biases, even where strong judges reach over 80% agreement with human preferences
  [32]. Calibrate a judge against a human-labelled sample, randomise answer order, prefer a judge
  from a different model family than the one under test, and version the judge prompt with the
  suite. Test items seen in training inflate scores; contamination can be demonstrated even for
  black-box models [33]. Keep private held-out sets, rotate items and record when each item was
  written against the model's data cut-off.

### Independent validation and model risk management

Banking has run independent model validation for years, and AI governance engineering borrows its
best idea: **effective challenge**. In the US, SR 11-7 (2011) was replaced on 17 Apr 2026 by SR 26-2,
joint guidance from the Federal Reserve, the OCC and the FDIC. It keeps effective challenge as
critical analysis by objective experts with the expertise, "sufficient independence to maintain
objectivity", and the standing to effect change, and it keeps the three components of validation:
conceptual soundness, ongoing monitoring and outcomes analysis [7]. It also draws a line the
engineer must notice: generative and agentic AI models "are not within the scope of this guidance",
while its principles apply to traditional models and "non-generative, non-agentic AI models"
[7]. In the UK, the PRA's SS1/23 applies to banks with internal-model approval, makes
independent model validation one of its five principles and addresses AI and machine-learning
techniques [34].

AI governance engineering takes from this tradition the validator's independence, the documented
challenge and tiering by materiality. It adds validation as a re-runnable suite with evidence records
rather than a PDF, and coverage for the generative and agentic systems SR 26-2 leaves out. The
validator works from a separate repository with read access to model and data, files findings as
issues with owners and deadlines, and signs the release gate for the high tiers.

### Reproducibility and linked versioning

A result nobody can reproduce is not evidence. The **training record** captures the code commit, the
hashes of the admitted data snapshots, the configuration and hyperparameters, the seeds, the
environment (container digest, library versions, hardware), the compute used, labelling quality
(inter-annotator agreement) and the owner. The record links in both directions: model version to
training record to eval results to release tag to the risk approvals that let it ship.

The [model artefact itself needs integrity](/patterns/model-artefact-integrity). Sign it: the OpenSSF model-signing tooling signs a
statement listing each model file and its digest, through Sigstore or conventional keys, and
verification recomputes the hashes [35]. Refuse to load serialised formats that execute code
from untrusted sources; the Python documentation is blunt that "The pickle module is not secure"
[36]. Both checks belong in the build next to the [**AIBOM**](/patterns/aibom). The tools
catalogue lists [signing and artefact-scanning tools](/resources/tools#cat-signing) as illustrative
examples, not endorsements.

### What goes wrong in training and testing

| Problem | How it shows | How to detect it | Gate response |
|---|---|---|---|
| Data leakage | Test score too good; collapses in production | Split by entity and time; audit features for post-outcome fields | Block; re-split and retrain |
| Overfitting | Training score far above validation | Learning curves; cross-validation variance | Block; regularise or add data |
| Underfitting | Both scores low, near the baseline | Comparison with the non-ML baseline | Block; revisit the design |
| Label noise | Accuracy ceiling; inconsistent labels | Inter-annotator agreement; relabelled sample | Reopen dataset admission |
| Class imbalance | High accuracy, poor minority recall | Per-class metrics, not accuracy alone | Resample or reweight; re-test |
| Poor calibration | Scores do not match observed rates | Reliability diagram; calibration error | Recalibrate before thresholds are set |
| Subgroup coverage gap | Wide intervals or no data for a group | Cell counts against the test plan | Block for high-risk; collect data |
| Environment mismatch | Passes offline, fails online | Shadow run on live inputs | Hold at shadow |
| Test contamination | Public-benchmark score above private-set score | Private and public gap; contamination tests | Drop contaminated items |
| Irreproducible result | A rerun disagrees | Fixed-seed reruns | Block until reproducible |
| Use beyond consent scope | Dataset used outside its permitted uses | Lineage joined to admission records | Block; legal review |

Every finding becomes an issue with an owner, a severity and a deadline. A finding that ships
unfixed is an accepted risk with a named acceptor, recorded in the risk register that
[chapter 13](/bok/risk-management#the-risk-register-as-an-evidence-record) describes, and becomes a regression test so it cannot return
silently.

> **In practice (illustrative)**
> An LLM summariser passed its release gate at 0.96 against a 0.95 floor, on 150 hand-picked cases.
> A reviewer asked for the interval: at that sample size it ran from about 0.93 to 0.99, so the gate
> could not tell a pass from a fail. The team moved to a frozen plan of 1,500 cases stratified by
> document type and language, three repeated runs to capture sampling variance, and a judge from a
> different model family calibrated against 200 human ratings. The gate became slower, and its
> verdicts started to mean something.

## Release readiness and conformity

### The go/no-go gate

Release is a governance milestone, not an engineering handover. The release gate reads the records
the earlier gates produced and refuses to open while any is missing or stale: a current use-case
record; a signed design record; admitted datasets; a test report against the frozen plan; open
issues below the agreed severity or accepted by a named acceptor; completed impact assessments;
regenerated cards and instructions for use; monitoring configured (see
[chapter 15](/bok/governing-deployment#operating-the-system)); a tested rollback; trained operators. The reviewers are
named in advance: product owner, engineering, the AI governance engineer, security, privacy and, for
the high tiers, legal and the independent validator. The output is a signed go/no-go record with its
conditions, filed against the registry entry. The deployer runs its own
[go-live review](/bok/governing-deployment#the-go-live-review) on top of it (chapter 15).
[Release in stages](/patterns/staged-rollout-rollback-criteria), each with exit criteria from the test plan: **shadow** (the system runs on live
inputs and its outputs are logged, not used), **canary** (a small share of traffic), a **limited
pilot**, then general availability. In the EU, research, testing and development before placing on
the market sit outside the AI Act, except testing in real-world conditions [37]; that testing is
governed by Art. 60, which after the Omnibus covers Annex III systems and Annex I Section A products,
with a new Art. 60a letting member states permit it for Section B products [17].

### EU AI Act conformity, in order

For high-risk systems the release gate carries a legal sequence. After the Digital Omnibus, the
high-risk duties apply to Annex III systems from 2 Dec 2027 and to Annex I products from 2 Aug 2028
[38].

| Step | Article | Artefact | Produced by |
|---|---|---|---|
| 1. Quality management system in place | `Art. 17` | QMS procedures, versioned | Provider |
| 2. Technical documentation drawn up | `Art. 11`, Annex IV | The technical file | Pipeline and named authors |
| 3. Conformity assessment | `Art. 43`, Annex VI or VII | Internal-control record, or notified-body certificate | Provider, or notified body |
| 4. EU declaration of conformity | `Art. 47`, Annex V | Signed declaration | Provider |
| 5. CE marking | `Art. 48` | Physical or digital CE marking, with the notified-body number where one was involved | Provider |
| 6. Registration | `Art. 49`, `Art. 71` | EU database entry | Provider |
| 7. Placing on the market and monitoring | `Art. 72` | Post-market monitoring plan in operation | Provider |

**Annex VI or Annex VII.** Annex III points 2 to 8 follow internal control under Annex VI, with no
notified body [39]. Under Annex VI the provider verifies that its quality management system
complies with Art. 17, examines the technical documentation against the requirements, and verifies
that the design and development process and the post-market monitoring are consistent with that
documentation [39]. Annex III point 1 (biometrics) may use Annex VI or Annex VII only where the
provider has applied harmonised standards or common specifications; otherwise it must follow Annex
VII, in which a notified body assesses the quality management system and the technical
documentation, with full access to the training, validation and testing datasets, issues a
certificate and must be told of changes [39]. No harmonised standard had been cited in the
Official Journal at the last check this book records (2026-09-19; see
[what is not harmonised yet](/bok/regulatory-map#what-is-not-harmonised-yet)) [40]; while that
holds, a biometric provider planning today should plan for a notified body. Annex I products go through
their sectoral conformity procedure, and the Omnibus lets bodies notified under that legislation
assess the AI requirements if they apply for designation by 28 Jan 2028 [17].

**Declaration, marking and registration.** The EU declaration of conformity follows Annex V and is
kept for 10 years; the CE marking is affixed visibly, legibly and indelibly, or digitally for systems
provided digitally [41]. Before placing on the market, the provider registers Annex III systems
in the EU database, except point 2 (critical infrastructure), which is registered at national level;
systems the provider has judged not high-risk under Art. 6(3) are also registered; and law
enforcement, migration, asylum and border systems go into a non-public section [42]. After the
Omnibus, the Art. 6(3) registration asks for less data, and SMEs and small mid-caps may provide the
technical documentation in a simplified form the Commission establishes [17]. The engineering
move is to generate the database payload from the registry entry, so that the registration and the
[**Agent Registry**](/patterns/agent-registry) cannot drift apart.

### Substantial modification

A **substantial modification** is a change after placing on the market "which is not foreseen or
planned in the initial conformity assessment and as a result of which the compliance of the AI
system with the requirements is affected" [5]. It triggers a new conformity assessment (Art.
43(4)); for systems that keep learning after release, changes the provider pre-determined at the
initial assessment and described in the technical documentation are not substantial modifications
[39], which is why Annex IV point 2(f) asks for those pre-determined changes and the technical
solutions that keep the system compliant as it changes [9].

Write the pre-determined envelope as code: permitted data sources, retraining cadence, metric floors
and threshold ranges. Then classify every change to model, data, prompts, tools or thresholds on
merge: inside the envelope (re-run the gates), outside it but compliance unaffected (re-run the
gates and record the reasoning), or a potential substantial modification (stop, legal review,
reassessment). A retrained model is a new release. It passes the same gates, gets a new version in
the registry and regenerates its cards; it does not inherit its predecessor's verdicts. For agents,
chapter 23 puts
[prompt and system-prompt changes under change control](/bok/governing-agents#prompts-as-configuration-under-change-control).

## The technical file

### Annex IV, element by element

Art. 11 requires the technical documentation of a high-risk system to be drawn up before it is
placed on the market and kept up to date, with at least the contents of Annex IV [9]. Most of
Annex IV is already produced by a governed pipeline; the rest is judgement that only a person can
supply. The table splits it.

| Annex IV item | What it asks for | Pipeline source | What a person must still write |
|---|---|---|---|
| 1(a) | Intended purpose, provider, version | Use-case record; registry entry | The intended-purpose statement itself |
| 1(b) | Interaction with other hardware, software and AI systems | AIBOM; architecture diagram | Integration assumptions |
| 1(c) | Software and firmware versions; update requirements | AIBOM; lockfiles | None beyond review |
| 1(d) | Forms in which it is placed on the market | Release manifest | Distribution description |
| 1(e) | Hardware it runs on | Deployment manifests | None beyond review |
| 1(f) | Photographs, where it is a product component | Not applicable to most software | Product documentation |
| 1(g) | The user interface given to the deployer | UI captures from integration tests | Description of use |
| 1(h) | Instructions for use | Generated from the use-case record, model card and misuse register | Limitations and oversight guidance, in plain language |
| 2(a) | Development methods, pre-trained systems, third-party tools | Training record; AIBOM | Why these were chosen |
| 2(b) | Design specifications, key choices, rationale, trade-offs | Design record; decision log | The rationale and assumptions |
| 2(c) | Architecture and computational resources | Training record (compute); architecture diagram | None beyond review |
| 2(d) | Datasheets: training data, provenance, selection, labelling, cleaning | Admission records; datasheets; lineage | The assumptions about what the data measures |
| 2(e) | Assessment of the human-oversight measures | Oversight design; human-in-the-loop test results | The assessment |
| 2(f) | Pre-determined changes and how compliance is kept | Envelope-as-code | The justification of the envelope |
| 2(g) | Validation and testing: data, metrics, discriminatory impacts, dated and signed test reports | Test plan; eval results; test reports | Signatures of the responsible persons |
| 2(h) | Cybersecurity measures | Security test results; [threat model](/patterns/ai-threat-model); [signing records](/patterns/model-artefact-integrity) | Residual security risk |
| 3 | Capabilities, limitations, accuracy for specific groups, foreseeable unintended outcomes | Model card; subgroup evals; misuse register | Interpretation of the limits |
| 4 | Why the performance metrics are appropriate | Test plan | The argument |
| 5 | The risk management system | Risk register | Residual-risk judgement |
| 6 | Relevant changes over the lifecycle | Version control; registry history | None beyond review |
| 7 | Harmonised standards applied, or the other solutions used | Crosswalk file | The solutions description (no OJ-cited standard at the last check) |
| 8 | A copy of the EU declaration of conformity | Generated from the evidence | Signature |
| 9 | The post-market monitoring system, with its plan | Monitoring configuration | The plan's triggers and responses |

The post-market monitoring plan is part of this file, not a separate document (Art. 72(3))
[43]. Build the file the way code is built: a documentation job assembles it on every release
candidate, fails when a generated row is stale or a written row is older than the model version it
describes, and emits the result as [**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal)
alongside a human-readable rendering.

### Model cards, system cards and datasheets

The documents overlap and answer different questions for different readers.

| Document | Describes | Main reader | Filled from |
|---|---|---|---|
| Model card | One trained model: intended use, evaluation across groups and conditions, limitations [44] | Integrators, deployers, auditors | Eval results; AIBOM |
| System card | The deployed system: models, prompts, retrieval, tools, guardrails and oversight | Deployers, authorities, the public | Registry; guardrail configuration; red-team results |
| Datasheet (data card) | One dataset: motivation, composition, collection, preprocessing, uses, distribution, maintenance [25] | Data owners, model builders, auditors | Admission record; lineage |
| Instructions for use | What a deployer needs to use a high-risk system correctly (Art. 13) [14] | Deployers | Use-case record; model card; misuse register |
| Technical file | All of the above plus risk management, standards, declaration and monitoring plan [9] | Authorities; notified bodies | Everything above |

Most risk sits in the system, not the raw model ([chapter 01](/bok/definition#the-object-of-governance)),
so a model card alone under-describes anything with tools or retrieval. Generate every card from the
same records, as in the [**Model Card as Control Evidence**](/patterns/model-card-as-control-evidence)
pattern, so the card an auditor reads is the card production produced.

### The GPAI provider side

A provider of a general-purpose AI model has its own documentation set under Art. 53: technical
documentation per Annex XI for the AI Office and national authorities, information per Annex XII for
downstream providers, a copyright policy, and a public summary of training content on the AI Office
template [20]. Annex XI covers architecture and parameter count, training methodology, the
training data (type, provenance, curation, methods to detect unsuitable sources and biases), the
compute and the known or estimated energy consumption; for models with systemic risk it adds
evaluation strategies, adversarial testing and system architecture [12].

Who is a GPAI provider is partly a compute question. The Commission's indicative criterion is
training compute above 10^23 FLOP with the ability to generate language, text-to-image or
text-to-video; a downstream modifier is indicatively the provider of the modified model when its
modification compute exceeds a third of the original's; and the systemic-risk presumption starts at
10^25 FLOP, with notification to the Commission within two weeks [11]. Put these thresholds in
the design review's model-selection record, because a fine-tuning plan can change the organisation's
legal role.

Three Commission instruments turn the duties into artefacts. The GPAI Code of Practice (10 Jul 2025,
voluntary) includes, in its Transparency chapter, a Model Documentation Form [45] that gathers the
Annex XI and XII information in one place and marks each item for downstream providers, the AI Office
or national authorities; the Code asks that each version's documentation be kept for 10 years
[46]. The training-content summary uses a template that is mandatory under Art. 53(1)(d): it
covers general information, data sources (including public, private, scraped, user and synthetic
data) and data processing, lists the top 10% of scraped domains (5% or 1,000, whichever is lower,
for SMEs), is refreshed every six months or sooner after a material update, and must exist by 2 Aug
2027 for models placed on the market before 2 Aug 2025 [28]. For systemic-risk models, the
Code's Safety and Security chapter adds a Safety and Security Model Report, created before the model
is placed on the market and kept up to date (Commitment 7) [46]. Engineering implication: the
Model Documentation Form is generated from the training record and the AIBOM, and the training-content
summary, including its domain list, is a query over the admission records and the crawl logs, not a
drafting exercise.

### Open-weight release decisions

Release is a gradient, not a switch. Solaiman describes six levels of access: fully closed, gradual
or staged access, hosted access, cloud or API access, downloadable access, and fully open
[47]. Staged release, as practised for GPT-2 in 2019, leaves time between releases for
risk and benefit analysis as capability grows [48]. For open weights the decision is
irreversible in a way nothing else in this chapter is: a released model cannot be recalled, patched
or placed behind a kill switch. The release record should therefore carry the capability and
dual-use evals, the misuse register, the answer to "what would we do if this is misused, given that
we cannot withdraw it?", and the licence choice. The Open Source Initiative's definition requires the
freedoms to use, study, modify and share, and treats data information, code and parameters as the
preferred form for modification [49]; a licence that restricts fields of use therefore does not
meet it.

The legal exemptions for open source are narrower than they sound.

- The AI Act does not apply to AI systems released under free and open-source licences, unless they
  are placed on the market or put into service as high-risk systems, as prohibited practices or as
  Art. 50 systems (Art. 2(12)) [37].
- A GPAI model under a free and open-source licence with public parameters is exempt only from the
  Annex XI and Annex XII documentation duties; the copyright policy and the training-content summary
  still apply, and no exemption applies to models with systemic risk (Art. 53(2)) [20][11].
- The Commission's guidelines treat monetisation as disqualifying: dual licensing (free for academic
  use, paid for commercial use), paid support that is required to use the model, and processing
  user data for commercial gain are given as examples [50].

### Record keeping

For high-risk systems, the provider keeps the technical documentation, the quality management system
documentation, changes approved by notified bodies, their decisions and the EU declaration of
conformity at the disposal of national authorities for 10 years after placing on the market (Art.
18), and keeps the logs the system generates automatically, where they are under its control, for a
period appropriate to the intended purpose of at least six months, unless other law provides
otherwise; financial institutions keep them within their financial-services documentation (Art. 19)
[51]. Deployers carry a parallel log duty, covered in [chapter 15](/bok/governing-deployment#records-retention).

Treat retention as code: each evidence class carries a retention rule keyed to its obligation, signed
records go to write-once storage, a legal hold overrides deletion, and the six-month log floor is a
floor, not a default, reconciled with the GDPR's storage limitation for personal data in the logs. A
10-year horizon outlives most tools, which argues for open formats (JSON, `OSCAL`).

### Public disclosures

Different audiences are owed different disclosures, and each has something that must not be
published.

| Audience | What they get | Channel | What to withhold |
|---|---|---|---|
| Authority or notified body | The full technical file, test logs, access to datasets under Annex VII | On request; conformity assessment | Nothing the law requires; mark trade secrets as confidential |
| Deployer | Instructions for use (Art. 13); model and system cards; Annex XII information for GPAI | Contract; documentation portal | Exploitable security detail; weights |
| Affected persons | That AI is used, and how to contest or seek explanation (see [chapter 15](/bok/governing-deployment#external-communications)) | Product interface; notices | Nothing about their own case that a right entitles them to |
| The public | EU database entry; GPAI training-content summary; AB 2013 documentation; bias-audit summaries; published impact assessments | Website; public registers | Red-team exploit detail; personal data; security configuration |

Two non-EU disclosures show the pattern. New York City's Local Law 144 requires employers using an
automated employment decision tool to hold a bias audit by an independent auditor from within the
past year, to publish a summary of its results, including the source of the data used, and to notify
candidates 10 business days before use [52]. Canada's Directive on Automated Decision-Making
requires federal institutions to publish the final results of their algorithmic impact assessment on
the Open Government Portal before the system goes into production [53].

> **In practice (illustrative)**
> A provider preparing an Annex III system for the 2 Dec 2027 date listed the 23 items of Annex IV in
> a file, one row each, with the pipeline source and a named author. Most rows turned out to be
> assembled from records the pipeline already emitted; the rest were rationale, residual-risk
> judgements and signatures. The documentation job ran on every release candidate and failed twice
> in its first month: once on a model card older than the model, once on a test report nobody had
> signed. Both failures would have surfaced a year later, in front of a notified body.

## Impact assessments compared

A single system can trigger several impact assessments at once. They overlap on facts (who is
affected, what could go wrong, what controls exist) and differ on law, trigger, reviewer and
audience. The engineering answer is one shared fact base with several views, not five documents
that drift apart.

| Assessment | Performed by | Trigger | When | Reviewed or signed by | Published | Re-assessed when |
|---|---|---|---|---|---|---|
| AI system impact assessment (ISO/IEC 42005) | The organisation developing or providing the system | Organisational policy; ISO/IEC 42001 A.5 | Throughout the lifecycle, from design [54] | Per the organisation's AI management system | Voluntary | Updated as needed over the lifecycle [54] |
| DPIA (GDPR Art. 35) | The controller | Processing likely to result in high risk; mandatory cases in Art. 35(3) | Before the processing [16] | Controller, with the DPO's advice; the supervisory authority if high risk remains (Art. 36) | Not required | When the risk of the processing changes (Art. 35(11)) [16] |
| FRIA (AI Act Art. 27) | Deployers that are public bodies or provide public services, and deployers of Annex III 5(b) and (c) systems | Deploying an Annex III high-risk system (not point 2) | Before first use [55] | Results notified to the market surveillance authority | Not required publicly | When any assessed element changes [55] |
| Algorithmic impact assessment (Canada) | Federal institution | Automated decision system under the Directive | Before production [53] | Approved internally; expert review per impact level | Yes, Open Government Portal | On a schedule, and when functionality or scope changes [53] |
| Bias audit (NYC Local Law 144) | Independent auditor, for the employer or agency | Using an automated employment decision tool in NYC | Within one year before use [52] | Independent auditor | Yes, summary of results | Every year [52] |
| Independent model validation (SR 26-2, SS1/23) | Validation function independent of development | Model use in a supervised bank | Generally before first use [7] | Validators with standing to effect change | No | Periodically, and on material change [7] |

### Dimensions that make impacts comparable

Score each impact on the same axes whichever assessment it feeds: **severity** (how bad for the
person affected), **scale** (how many people), **reversibility** (whether the harm can be undone, and
how fast), **duration** and **likelihood**. The dimensions are not invented here. Canada's Directive
defines its impact levels by them, from level I, where impacts are likely to be "little to no,
easily reversible, and brief", to level IV, where they are likely to be "very high, irreversible and
perpetual" [53]. The FRIA asks for the affected categories, the specific risks of harm, the
oversight measures and the mitigation and complaint arrangements (Art. 27(1)) [55]; the DPIA asks
for the processing, its necessity and proportionality, the risks and the measures (Art. 35(7))
[16]. One record with these fields answers both, and Art. 27(4) lets a FRIA build on a DPIA that
covers the same ground [55].

### Performing versus reviewing

The performer owns the facts; the reviewer challenges them. A reviewer who did not write the
assessment checks six things: the scope matches the current use-case record; the affected groups
include people who never use the system; every risk rating cites evidence (an eval id, a test
report, a data profile), not an opinion; every mitigation links to a control that runs; residual risk
is accepted by someone with the authority to accept it; and the re-assessment triggers are written as
conditions a pipeline can evaluate. An assessment that fails any of the six goes back, however well
written it is.

### Re-assessment triggers

Encode the triggers so that the registry, not a calendar reminder, reopens the assessment: a new or
widened intended purpose; retraining on a new data source; a new affected population, language or
jurisdiction; a threshold change; an incident or near miss ([chapter 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite)); a
monitoring signal outside its band; new law or guidance; and a scheduled review date. The
[**FRIA-as-Code**](/patterns/fria-as-code) pattern already does this for the FRIA and
its DPIA cross-reference; the same structure generalises to every assessment in the table.

> **In practice (illustrative)**
> The credit-limit model from the use-case example sat under four assessments at once: a DPIA (the
> bank as controller), a FRIA (the bank as deployer of an Annex III 5(b) system), an impact assessment
> run by the model team along ISO/IEC 42005 lines, and independent validation. The team kept one fact
> base (affected groups, harms scored on the five dimensions, controls with their eval ids) and
> rendered four views from it. When retraining added a new data source, the lineage change tripped
> the trigger for all four in the same pipeline run, and the reviewers saw a diff instead of four new
> documents.

**Maps to:** EU AI Act Art. 3(12), 3(13) and 3(23), Art. 9, 10, 11 and Annex IV, Art. 13, 17, 18,
19, 25, 27, 43 and Annexes VI and VII, Art. 47 to 49, Art. 53 and Annexes XI and XII, Art. 72 · GDPR
Art. 35 · ISO/IEC 42001 (A.5, A.6, A.7), ISO/IEC 42005, ISO/IEC 5338, ISO/IEC 5259 · NIST AI RMF
(Map, Measure) · Layer 01 Govern-as-Code to Layer 05 Assurance & Continuous Compliance. Mappings are
illustrative, not a claim of conformity.

## What you can do this week

1. Write the use-case record for the highest-risk system you have in development, including its
   out-of-scope uses and its false-positive against false-negative appetite, and store it on the
   registry entry.
1. Freeze the test plan for its next release in the repository: metrics, thresholds, subgroups,
   repeated runs, and the sample size each threshold needs to be distinguishable from a fail.
1. Pick one training dataset and fill its admission record (basis or licence, reservation check,
   provenance, owner, steward), then make the training job refuse datasets without one.
1. Map your current documentation to the Annex IV table above and mark each row generated, written or
   missing.
1. List every impact assessment the system triggers and move their shared facts into one record,
   with the re-assessment triggers written as conditions.

## Sources

[1] ISO/IEC 5338:2023, AI system life cycle processes. ISO/IEC. 2023. https://www.iso.org/standard/81118.html (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (Annex A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] AI Risk Management Framework 1.0 (NIST AI 100-1; MAP 1.1 intended purposes and context documented, MAP 1.5 risk tolerances, MAP 1.6 system requirements, MEASURE 2.1 test sets and metrics documented, MEASURE 2.5 validity and reliability). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system: design control and design verification; examination, test and validation procedures before, during and after development; data management). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[6] Rules of Machine Learning: Best Practices for ML Engineering (Rule #1: "Don't be afraid to launch a product without machine learning"). Google for Developers. n.d. (accessed 2026-09-24). https://developers.google.com/machine-learning/guides/rules-of-ml (verified: primary)
[7] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; generative and agentic AI models out of scope; effective challenge; conceptual soundness, ongoing monitoring, outcomes analysis; model use beyond intended purpose). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (responsibilities along the AI value chain; 25(1)(c) a third party that modifies the intended purpose of a system so that it becomes high-risk is considered its provider). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 11 and Annex IV (technical documentation: 1(a) to (h) general description incl. instructions for use; 2(a) to (h) development process, design choices and trade-offs, compute, datasheets and provenance, oversight, pre-determined changes, validation and testing with dated and signed reports, cybersecurity; 3 to 9 capabilities and limitations, metrics, risk management, changes, standards, declaration, post-market monitoring). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_IV (verified: primary)
[10] Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead (Cynthia Rudin). Nature Machine Intelligence. 2019. https://www.nature.com/articles/s42256-019-0048-x (verified: primary)
[11] General-Purpose AI Models in the AI Act: Questions & Answers (indicative GPAI criterion: training compute above 10^23 FLOP and generation of language, text-to-image or text-to-video; a downstream modifier is indicatively the provider when modification compute exceeds a third of the original's; 10^25 FLOP systemic-risk threshold; notification within two weeks; Art. 53(2) open-source conditions). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annexes XI and XII (GPAI technical documentation: architecture and parameters, training methodology, training data provenance and curation, compute, known or estimated energy consumption; Section 2 for systemic-risk models: evaluation strategies, adversarial testing, system architecture; Annex XII information for downstream providers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2)(b) risks under reasonably foreseeable misuse; 9(8) testing against prior defined metrics and probabilistic thresholds, before placing on the market). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and instructions for use; 13(3)(b)(iii) known or foreseeable circumstances, incl. reasonably foreseeable misuse, that may lead to risks). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[15] Ethics Guidelines for Trustworthy AI (High-Level Expert Group on AI; oversight through human-in-the-loop, human-on-the-loop and human-in-command approaches). European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[16] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing; Art. 35 data protection impact assessment (35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes); Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a replaces the deleted Art. 10(5) for special-category data in bias detection; simplified technical documentation for SMEs and small mid-caps under Art. 11(1); Annex VIII Section B points 7 and 9 deleted for Art. 6(3) registrations; Art. 43(3) sectoral notified bodies to apply for designation by 28 Jan 2028; Art. 60 scope (Annex III and Annex I Section A) and new Art. 60a (Annex I Section B)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[18] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[19] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI provider obligations: (a) Annex XI documentation, (b) Annex XII information for downstream providers, (c) copyright policy incl. reservations of rights, (d) public summary of training content on the AI Office template; 53(2) open-source exemption from (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[21] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance: 10(2) practices, 10(3) relevant, sufficiently representative, free of errors and complete, 10(4) specific setting of use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[22] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[23] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[24] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[25] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[26] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[27] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[28] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data; top 10% of scraped domains, for SMEs 5% or 1,000; six-monthly update). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[29] ISO/IEC TR 29119-11:2020, Software testing, Part 11: Guidelines on the testing of AI-based systems. ISO/IEC. 2020. https://www.iso.org/standard/79016.html (verified: primary)
[30] ISO/IEC TR 24029-1:2021 and ISO/IEC 24029-2:2023, Robustness of neural networks (Part 1 overview; Part 2 methodology for the use of formal methods). ISO/IEC. 2021–2023. https://www.iso.org/standard/79804.html (verified: primary)
[31] Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (Evan Miller; arXiv 2411.00640). arXiv. 2024-11-01. https://arxiv.org/abs/2411.00640 (verified: primary)
[32] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.; position, verbosity and self-enhancement biases; over 80% agreement with human preferences; arXiv 2306.05685). arXiv. 2023-06-09. https://arxiv.org/abs/2306.05685 (verified: primary)
[33] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[34] SS1/23, Model risk management principles for banks (five principles incl. independent model validation; UK banks and building societies with internal-model approval; addresses AI and machine-learning techniques; published 17 May 2023, in effect from 17 May 2024). Bank of England, Prudential Regulation Authority. 2023-05-17. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[35] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[36] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[37] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 2 (2(8) research, testing and development before placing on the market excluded, except testing in real-world conditions; 2(12) systems under free and open-source licences excluded unless high-risk, Art. 5 or Art. 50). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_2 (verified: primary)
[38] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 43 and Annexes VI and VII (internal control for Annex III points 2 to 8; Annex VI or VII for point 1 where harmonised standards or common specifications are applied, Annex VII otherwise; Annex I products under sectoral procedures; 43(4) new assessment on substantial modification, pre-determined changes excepted; Annex VII notified-body access to training, validation and testing data and control of changes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_43 (verified: primary)
[40] CEN-CENELEC JTC 21 standards tracker (no AI Act harmonised standard cited in the Official Journal, so no Art. 40 presumption of conformity; tracker updated 29 Jun 2026; the book's regulatory map rechecked on 2026-09-19). CEN-CENELEC JTC 21 (via kla.digital). 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[41] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 47 and 48 (EU declaration of conformity per Annex V, kept for 10 years; CE marking affixed visibly, legibly and indelibly, digital marking for digitally provided systems, notified-body number where applicable). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_47 (verified: primary)
[42] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 49 (registration in the EU database before placing on the market; Annex III point 2 at national level; Art. 6(3) systems; public-authority deployers; non-public section for law enforcement, migration, asylum and border control). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_49 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 72 (post-market monitoring system; 72(3) the monitoring plan is part of the Annex IV technical documentation; as amended by Reg. (EU) 2026/1744, Commission guidance including a template by 2 Sep 2027). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_72 (verified: primary)
[44] Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[45] The General-Purpose AI Code of Practice (published 10 Jul 2025; voluntary; Transparency chapter with a Model Documentation Form; Safety and Security chapter for systemic-risk models). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[46] EU AI Act: General-Purpose AI Code of Practice, final version (unofficial reader: Model Documentation Form marks items for downstream providers, AI Office or national authorities; documentation kept 10 years per version; Safety and Security chapter Commitment 7, a Safety and Security Model Report before placing a model on the market). code-of-practice.ai (Alexander Zacherl). 2025. https://code-of-practice.ai/ (verified: secondary)
[47] The Gradient of Generative AI Release: Methods and Considerations (Irene Solaiman; six levels of access from fully closed to fully open; arXiv 2302.04844). arXiv. 2023-02-05. https://arxiv.org/abs/2302.04844 (verified: primary)
[48] Release Strategies and the Social Impacts of Language Models (Solaiman et al.; GPT-2 staged release; arXiv 1908.09203). arXiv. 2019-08-24. https://arxiv.org/abs/1908.09203 (verified: primary)
[49] The Open Source AI Definition 1.0 (freedoms to use, study, modify and share; preferred form for modification covers data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[50] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; section 4.2.2, paras 82 to 84: monetisation defeats the open-source exceptions, e.g. dual licensing free for academic and paid for commercial use, paid support or services required to access or use the model, and processing of personal data other than strictly for model security). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 18 and 19 (provider keeps technical documentation, QMS documentation, notified-body decisions and the EU declaration for 10 years; automatically generated logs kept at least six months unless other law provides otherwise; financial institutions keep logs within financial-services documentation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[52] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; public summary incl. data source; notice 10 business days before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[53] Directive on Automated Decision-Making (6.1 algorithmic impact assessment completed, approved and published on the Open Government Portal before production, updated on a schedule and when functionality or scope changes; 6.3.7 expert review; Appendix B impact levels defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[54] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[55] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c), except point 2 systems; elements (a) to (f); results notified to the market surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
