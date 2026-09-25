# 19. Privacy and data protection law applied to AI

> Data protection law already binds every AI system that touches personal data; this chapter turns
> its duties for training, inference, rights and breaches into artefacts, stack layers and evidence.

> **In short**
> Data protection law applied to AI starts from one fact: the GDPR has applied since 25 May 2018 to
> any processing of personal data, so it already binds every AI system trained on, retrieving from
> or deciding about people [1]. GDPR fines for breaches of the core principles can reach EUR 20
> million or 4% of worldwide annual turnover [1]. Each processing moment (collection for training,
> training, retrieval indexing, inference, logging and evaluation) is a separate operation with its
> own purpose, basis, retention and rights exposure. In SCHUFA (C-634/21) the Court of Justice held
> that a credit score is itself an automated decision under Article 22 when lenders give it a
> determining role [21]. For the EDPB, a model trained on personal data is anonymous only if the
> likelihood of extracting that data, directly or through queries, is insignificant [3]. The DPO and
> privacy counsel decide whether a lawful basis holds; the engineer builds the record, the control
> and the signal.

Privacy law was the first AI law. The GDPR has applied since 25 May 2018 to any processing of
personal data, and a model trained on, retrieving from or deciding about people processes personal
data at several points of its life [1]. The AI Act adds duties on top without displacing data
protection, and says so in its own text [2]. The privacy duties usually arrive first, carry fines of
up to EUR 20 million or 4% of worldwide annual turnover for breaches of the core principles [1], and
reach systems the AI Act never classifies as high-risk.

The GDPR is the spine here, with short contrasts to UK GDPR, the US state laws, Brazil's LGPD and
China's PIPL. Every duty resolves to an **artefact**, a **stack layer** (chapter 04) and an
**evidence record** a query can return. One line of disambiguation: the data protection officer and
privacy counsel decide whether a lawful basis holds; the AI governance engineer builds the record
that shows the decision, the control that enforces it and the signal that says when it stopped
holding. This is engineering translation, not legal advice.

## How to read this chapter

An AI system processes personal data at more moments than its owners usually list, and each moment
is a separate processing operation with its own purpose, basis, retention and rights exposure. The
table uses the running example from chapter 04, `csa-01`, a customer-service assistant in a large
telco, fine-tuned on past support transcripts, retrieving from account notes and calling a
third-party model.

| Processing moment | Personal data (`csa-01`) | What the law asks first | Evidence record |
|---|---|---|---|
| Collection for training | Historic transcripts | Purpose compatibility; basis; notice | Basis registry entry |
| Training and fine-tuning | Filtered transcripts | Minimisation; special-category screening | Data card; filter log |
| Retrieval (RAG) indexing | Account notes | Access control; retention; rights reach | Index manifest |
| Inference | Live prompts and outputs | Transparency; transfers; ADM limits | Trace with policy verdicts |
| Logging and monitoring | Prompts, outputs, traces | Storage limitation; security | Retention verdicts |
| Evaluation | Golden and red-team sets | Minimisation; synthetic where possible | Eval-set card |

Data cards live in layer 02 ([Inventory &
Transparency](/bok/the-stack#layer-02-inventory--transparency)); purpose, retention and residency
rules in layer 01; privacy tests in layer 03; redaction, filters and routing in layer 04; and the
records a regulator asks for in layer 05. Two neighbouring chapters carry the organisational side:
chapter 12 on [updating the policies you already have](/bok/governance-program#updating-the-policies-you-already-have),
and chapter 14 on [the right to use the data](/bok/governing-development#the-right-to-use-the-data)
at the [dataset admission gate](/patterns/dataset-admission-gate).

## Principles applied to AI

Article 5 GDPR sets the principles (lawfulness, fairness and transparency; purpose limitation; data
minimisation; accuracy; storage limitation; integrity and confidentiality) and makes the controller
able to demonstrate compliance, the accountability duty [1]. For AI the principles do not change;
where they bite does.

### Lawful basis for training versus inference

Article 6 offers six lawful bases and none ranks above another; the controller picks the one that
fits each processing activity [3]. The trap is to pick one basis for "the model". Training on
transcripts, indexing account notes and answering a live customer are different activities, and each
needs its own basis. [The Garante's ChatGPT order](/cases/garante-chatgpt-order) shows what an
unrecorded basis costs.

| Stage | Bases that usually fit | Why the choice is hard |
|---|---|---|
| Training a model on scraped or third-party data | Legitimate interests (`Art. 6(1)(f)`) | No relationship with the people; indirect notice; objection must work |
| Fine-tuning on customer data you hold | Legitimate interests; sometimes consent | New purpose; compatibility test; expectations |
| Retrieval over customer records | Contract (`Art. 6(1)(b)`) for that customer | The index must not answer one customer with another's data |
| Inference serving the customer | Contract; legitimate interests | Necessity is narrow |
| Log monitoring and abuse review | Legitimate interests; legal obligation | Retention drifts; human review widens access |

The artefact is a **basis registry**: each dataset and stage carries its basis, purpose and a
pointer to the assessment behind it, attached to the system's registry entry. A training job reads
it and refuses to run on a dataset whose basis does not cover training.

> **Example (illustrative)**
> A basis registry entry read by the `csa-01` training pipeline before a run:
>
> ```json
> { "dataset": "support-transcripts-2025q4", "system": "csa-01", "stage": "fine-tuning",
>   "basis": "Art. 6(1)(f)", "lia_ref": "lia-csa-01-v3", "purpose": "support-answer-quality",
>   "special_category_scan": "pass", "retention": "P18M", "objection_opt_out": true }
> ```

### Legitimate interests and the three-step test

Legitimate interests is the basis AI developers are most likely to rely on [4]. The EDPB set out how
authorities test it in Opinion 28/2024 of 17 Dec 2024 [3]. The interest must be lawful, precisely
articulated, and real and present. The processing must be necessary, with no less intrusive way to
reach the same end, judged with minimisation in mind. And the interest must not be overridden by the
people's rights, where reasonable expectations weigh heavily: whether the data was public, the
relationship with the controller, the source and its privacy settings, whether people know their
data is online [3].

When the balance tips, mitigations beyond what the GDPR already requires can restore it. The EDPB's
examples include masking names and emails with fake values, a delay between collecting a dataset and
training on it, an unconditional opt-out before processing, erasure beyond the Article 17 grounds, a
channel to report regurgitation, excluding intrusive sources and honouring `robots.txt` or `ai.txt`
when scraping, and output filters at deployment [3]. The CNIL adds a discretionary prior right to
object and transparency about extraction risk [4].

Each mitigation is a control, so the **legitimate-interest assessment (LIA)** is a versioned
artefact that points each mitigation at the control implementing it (the opt-out endpoint, the
filter rule id, the scraping allow-list). Switch a mitigation off and the LIA goes stale; the
registry should say so.

### The limits of consent

Consent must be specific, informed and freely given; the controller must prove it; and people may
withdraw it at any time, as easily as they gave it, with effect for the future [1]. Withdrawal after
training does not remove a person's influence from computed weights, so a consent-based training set
commits the controller to a removal path it can actually run (see "Suppression, retraining and
unlearning" below). Consent to a service is also not consent to train a model on the service's data.
The artefact is a **consent-purpose log** joining each consent to the datasets and model versions
that inherited it; without that join a withdrawal cannot be traced to the runs it affects. China's
PIPL adds a separate consent for sensitive personal information [5].

### Transparency to the people in the data

Articles 13 and 14 require notice, and Article 14 covers data not collected from the person, the
normal case for scraped or licensed training data [1]. Where Article 22 decisions are involved,
notice and access must include meaningful information about the logic involved and the envisaged
consequences [1]. A notice written for the original service rarely describes training, and a notice
that described last year's model is wrong after a retrain on new sources. Generate the notice from
the same registry entry as the model card, so it changes when the sources do; the EDPB names model
cards among the ways to close the information gap [3].

### Purpose limitation and function creep

Data may not be further processed in a way incompatible with its original purpose; Article 6(4) sets
the test: the link between purposes, the context, the nature of the data, the consequences and the
safeguards, such as encryption or pseudonymisation [1]. AI makes every stored record look like
training data, and the failures are **function creep**: support transcripts reused to profile
customers for sales, security footage reused for attendance, fraud features reused for credit
limits.

The control is a purpose tag that travels with the data and a layer 01 rule that compares the
purpose on the dataset's card with the purpose declared by the consuming system, denying the run
when they differ and no compatibility assessment is recorded. A denied join is proof the purpose
limit bit.

> **In practice (illustrative)**
> An analytics team asked to fine-tune a churn model on the transcripts collected for `csa-01`. The
> purpose check denied the job: the card said `support-answer-quality`, the requester said
> `retention-marketing`, and no compatibility assessment existed. The request became an Article 6(4)
> assessment that allowed only aggregated topic counts, and the denied run and the assessment were
> both filed against the dataset's registry entry.

**Maps to:** GDPR `Arts. 5–7`, `13`, `14` · EU AI Act `Art. 10`, `Art. 13` · ISO/IEC 42001 · ISO/IEC
27701 · NIST AI RMF (Map) · layers 01 and 02. Mappings are illustrative, not a claim of conformity.

## Minimisation, privacy by design and PETs

Data must be adequate, relevant and limited to what the purpose needs, and Article 25 requires this
by design (measures such as pseudonymisation built in) and by default (only the data each purpose
needs is processed and made accessible) [1]. Machine learning pulls the other way, so minimisation
is argued feature by feature, not asserted once:

- **Feature-level justification.** Each input feature carries a reason and a measured contribution in
  the data card; one with neither is removed, and special-category fields need a documented condition.
- **Filtering before training.** PII and special-category scans run on each snapshot and the filter log
  is kept with it; the EDPB lists source selection, preparation and filtering among the areas an
  authority examines [3].
- **Minimal retrieval and logs.** RAG indexes hold only the fields answers need; log retention follows
  the obligation, not the storage default. The tension with the AI Act's logging duties (see
  [chapter 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) is resolved by logging what the duty needs,
  pseudonymised where it allows.
- **Synthetic or masked eval sets** wherever a test does not depend on real identities.

### Anonymisation versus pseudonymisation

The distinction decides whether the GDPR applies. **Pseudonymised** data cannot be attributed to a
person without additional information kept separately [1]; data that can be re-attributed with that
information is still about an identifiable person [1], and the EDPB's 2025 guidelines treat
pseudonymisation as a safeguard to apply well [6]. **Anonymous** data falls outside the GDPR, but
Recital 26 judges identifiability against all means reasonably likely to be used, by the controller
or another person, given cost, time and technology [1].

In EDPS v SRB (C-413/23 P, 4 Sep 2025) the Court of Justice held that pseudonymised data is not
personal data in all cases and for every person, since pseudonymisation may stop a recipient
identifying anyone; but the controller's own duties, such as informing people, are judged from the
controller's point of view at collection [7]. In an AI supply chain, a vendor receiving
well-pseudonymised records without the key may be outside the GDPR for them; the sender is not.

Anonymisation claims decay. One study estimated that 99.98% of Americans would be correctly
re-identified in any dataset using 15 demographic attributes [8]. Keep a **re-identification
assessment** with each "anonymous" dataset: technique, attacker model, residual risk and date.

### Privacy-enhancing technologies and their honest limits

Privacy-enhancing technologies (PETs) reduce what an attacker, vendor or insider can learn. None
makes a system compliant, and each has a known failure mode.

| PET | What it does | What it does not do | Evidence record |
|---|---|---|---|
| Differential privacy | Bounds how much one record can change a result or model | Cover data outside the budget; survive a badly set or reset budget | Privacy budget per release, with accounting method |
| Federated learning | Trains where the data lives [9] | Hide data in shared gradients, which can leak examples [10] | Aggregation and DP settings |
| Synthetic data | Replaces real records for tests or sharing | Guarantee privacy: it either fails to stop inference attacks or loses utility [11] | Generator card; attack results |
| Pseudonymisation and masking | Removes direct identifiers | Make data anonymous; stop quasi-identifier linkage | Key custody record; masking rules |
| Trusted execution (enclaves) | Protects data in use from the host | Remove trust in the hardware vendor; fix memorisation | Attestation report per workload |
| Output filtering and redaction | Blocks personal data at runtime | Remove data from the model; catch every paraphrase | Guardrail decisions with rule ids |

NIST SP 800-226 is the reference for evaluating differential-privacy claims and names the "privacy
hazards" that appear in implementation [12]. A PET claim is an eval like any other: a threshold, a
named attack, a failed build when the threshold is missed.

> **In practice (illustrative)**
> A team swapped real records in `csa-01`'s regression suite for synthetic ones and assumed the problem
> was solved. A membership-inference test added to the eval gate flagged rare records reproduced almost
> verbatim. The generator was retrained with a privacy budget, the test stayed as a permanent gate, and
> the synthetic set's card now carries the attack result as its evidence of fitness.

**Maps to:** GDPR `Art. 5(1)(c)`, `Art. 25`, `Art. 32` · EU AI Act `Art. 10`, `Art. 4a` · ISO/IEC
27701 · NIST AI RMF (Measure) · [Data governance across the
stack](/bok/the-stack#data-governance-across-the-stack) · layers 01, 03 and 04. Mappings are
illustrative, not a claim of conformity.

## Controller duties across the AI supply chain

### Controller, processor or joint controller

A **controller** decides purposes and means; a **processor** acts on its behalf; parties deciding
together are **joint controllers** and must allocate responsibilities [1]. The AI Act's provider and
deployer do not map onto these one to one: a deployer is usually a controller, and a model provider
may be your processor for inference and a controller for its own training.

| Actor | Typical GDPR role | What decides it |
|---|---|---|
| Model developer training on data it collected | Controller for training | It chose sources and purpose |
| API vendor serving your inference | Processor | It acts only on documented instructions [1] |
| The same vendor training on your prompts | Controller for that use | A processor that determines purposes is a controller for that processing [1] |
| Your organisation deploying the assistant | Controller | It decides why customers' data is processed |
| Partners co-training on pooled data | Joint controllers | They decide purposes and means together |

Keep a **role record** per system and stage with the registry entry: a controller runs the DPIA and
answers requests; a processor assists and notifies breaches to the controller without undue delay
[1].

### AI vendor DPAs and no-training clauses

Article 28 requires a contract under which the processor acts only on documented instructions,
including on transfers [1]. For AI vendors the [Vendor / Model Due-Diligence
Gate](/patterns/vendor-model-due-diligence-gate) should check clauses a generic
agreement misses:

- **No training on customer data** (prompts, outputs, files, embeddings, feedback), any opt-in explicit.
- **Retention of prompts and outputs**, including abuse-monitoring retention and staff review.
- **Processing location** per endpoint and feature, including support access.
- **Sub-processors**, with notice and objection when a model host changes.
- **Deletion and return** at contract end, certified.
- **Breach notice** on a clock that leaves room for the controller's own 72 hours.
- **Change notification** when the model, its data policy or its region changes.
- **Evidence**: model card, security attestations and any AIBOM, delivered as stored documents.

The gate's record (checklist answers, contract reference, date) sits on the vendor's registry entry
and is re-run on every notified change.

### The DPIA for AI systems

A **DPIA** is required before processing likely to result in a high risk, particularly with new
technologies, and always for the three Article 35(3) cases: systematic evaluation with significant
automated decisions, large-scale special-category processing, and large-scale monitoring of public
spaces [1]. The Article 29 Working Party's guidelines, endorsed by the EDPB, give nine criteria and
say processing meeting two of them will usually need a DPIA [13]. AI systems meet several at once:

| Criterion [13] | Typical AI case |
|---|---|
| Evaluation or scoring | Risk scores, propensity models, candidate ranking |
| Automated decisions with legal or similar effect | Credit, hiring, insurance, eligibility |
| Systematic monitoring | Workplace, video or agent-activity analytics |
| Sensitive or highly personal data | Health, biometrics, inferred traits |
| Large scale; matching or combining datasets | Web-scale corpora; merged training sets |
| Vulnerable data subjects | Employees, children, patients |
| Innovative technology | Generative models, agents, emotion analysis |
| Preventing the exercise of a right or use of a service | Automated eligibility gates |

An AI DPIA needs fields a generic template lacks: each processing moment with its basis, training
sources and filtering, memorisation risk with the eval results that measure it, the ADM analysis,
the vendor and transfer map, the oversight design, and the rights path for data inside the model.
Article 35(7) sets the minimum content, and where residual risk stays high the controller consults
the authority first, which has up to eight weeks to respond [1]. The EDPB expects to see DPIAs and
also decisions that one was not needed [3], so "no DPIA" is an artefact too. Deployers of high-risk
systems use the provider's Article 13 information for their DPIA [14], and the Article 27 FRIA
complements a DPIA rather than repeating it [15]; the
[FRIA-as-Code](/patterns/fria-as-code) pattern writes the shared fields once. The
templates page has an [AI DPIA addendum](/resources/templates#schema-impact-assessment) in its
impact-assessment schema.

### Records of processing

Article 30 requires a record of processing activities (ROPA): purposes, categories of data and
people, recipients, transfers, retention, security [1]. One AI system usually means one entry per
processing moment, and the entries go stale with every pipeline change, so generate them from the
registry, the data cards and the basis registry. The AI Act's new Article 4a relies on this record:
when special-category data is processed for bias detection, the ROPA must say why it was strictly
necessary and why other data would not do [2].

### Transfers, remote inference and TIAs

Chapter V GDPR requires a ground for every transfer to a third country: adequacy, appropriate
safeguards such as standard contractual clauses, or a narrow derogation [1]. The EDPB's three
cumulative criteria define a transfer (an exporter subject to the GDPR makes personal data available
to an importer in a third country), and its guidelines treat remote access from a third country as a
transfer [16]. For AI that covers a prompt with personal data sent to an endpoint outside the EEA,
vendor telemetry carrying prompts, a failover to another region, and a foreign support team that can
read logs.

Where the ground is contractual, the exporter runs a **transfer impact assessment** on whether the
importer's law lets it honour the clauses, adding supplementary measures as the EDPB recommends [17]
under the 2021 standard contractual clauses [18]. For the United States, the Data Privacy Framework
adequacy decision of 10 Jul 2023 covers certified organisations [19], and the General Court
dismissed an action to annul it on 3 Sep 2025 [20]. Record that the vendor entity is certified for
the data in question.

The control extends chapter 04's residency rule ([layer
01](/bok/the-stack#layer-01-govern-as-code)): route inference for each data class only to endpoints
whose ground is recorded, deny otherwise, and emit the verdict. The evidence is the verdict stream
plus a transfer register (endpoint, region, importer, ground, TIA reference, review date).

> **In practice (illustrative)**
> When `csa-01`'s vendor announced a model served from a US region, the change notice triggered the
> due-diligence gate. It checked the vendor's Data Privacy Framework certification, stored the check in
> the transfer register, and the residency policy then allowed the new endpoint for pseudonymised
> support prompts only. Account notes stayed on the EU endpoint, and the policy verdicts in the traces
> proved which data went where.

**Maps to:** GDPR `Arts. 26`, `28`, `30`, `35`, `36`, `44`–`46` · EU AI Act `Art. 4a`, `Art. 26(9)`,
`Art. 27(4)` · ISO/IEC 42001 Annex A.10 · ISO/IEC 27701 · NIST AI RMF (Govern, Map) · layers 01, 02
and 05. Mappings are illustrative, not a claim of conformity.

## Automated decision-making

### GDPR Article 22 after SCHUFA

Article 22 gives people the right not to be subject to a decision based solely on automated
processing, including profiling, with legal or similarly significant effects. Such decisions are
allowed only when necessary for a contract, authorised by law, or based on explicit consent, and
then with at least the right to human intervention, to express a view and to contest [1]. Chapter 16
turns [automated decision-making under GDPR Art. 22](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime)
into explanation and contest records.

Two judgments set the engineering task. In SCHUFA (C-634/21, 7 Dec 2023) the Court of Justice held
that a credit score is itself an automated decision when lenders give it a determining role [21]
(the credit-law side is in chapter 20, [credit and lending](/bok/existing-law#credit-and-lending)). A
model that "only recommends" is inside Article 22 when humans downstream follow it as a rule, and
the party producing the score is itself deciding. In Dun & Bradstreet Austria (C-203/22, 27 Feb
2025) the Court held that meaningful information about the logic means describing the procedure and
principles actually applied, so the person understands which data were used and how; that saying how
far a change in the data would have changed the result can be appropriate; that handing over an
algorithm is not an explanation; and that claimed trade secrets go to the authority or court to
balance [22].

The artefacts follow: a **decision record** per decision (model version, inputs, outcome, reason
codes, counterfactual); a **notice** that a solely automated decision was taken and how to contest
it; a **[contest path](/patterns/decision-notice-contest-path)** to a reviewer with authority and information to change the outcome, with a
record of what they did; and a monitor of the oversight itself, because a reviewer who confirms
almost every output in seconds is not meaningful involvement (the [Human-in-the-loop
Gate](/patterns/human-in-the-loop-gate) pattern).

> **Example (illustrative)**
> A decision record for `credit-check-04`, a telco's handset-financing check, filed at runtime:
>
> ```json
> { "decision_id": "cc4-2026-09-18-0192", "system": "credit-check-04@3.2",
>   "solely_automated": true, "basis": "GDPR Art. 22(2)(a)", "outcome": "declined",
>   "reason_codes": ["R07 payment arrears", "R12 short credit history"],
>   "counterfactual": "approval likely after six months without arrears",
>   "notice_sent": "2026-09-18T10:02:11Z", "contest_channel": "human-review-queue" }
> ```

### The regimes side by side

| Regime | Trigger | Core duty or right | Artefact | Layer |
|---|---|---|---|---|
| GDPR `Art. 22`, `Art. 15(1)(h)` | Solely automated decision, legal or similar effect | Narrow permission; intervention, view, contest; information on the logic [1][22] | Decision record; notice; contest path | 4 · 5 |
| UK GDPR `Arts. 22A–22D` | Significant decision without meaningful human involvement | Allowed with safeguards; tighter for special-category data [23] | The same, plus why involvement is meaningful | 4 · 5 |
| CCPA ADMT regulations | ADMT for a significant decision | Pre-use notice; opt-out or human appeal; access; from 1 Jan 2027 [24] | Notice; opt-out and appeal workflow; risk assessment | 2 · 4 · 5 |
| US state laws (Virginia, Colorado, Minnesota) | Profiling for decisions with legal or similar effects | Opt-out [25][26]; in Minnesota, question the result, learn the reason, re-evaluation on corrected data [27] | Opt-out flag honoured at inference; review workflow | 1 · 4 |
| LGPD `Art. 20` | Decision solely by automated processing affecting interests | Review; information on criteria, respecting trade secrets [28] | Review workflow; criteria statement | 4 · 5 |
| PIPL `Art. 24` | Automated decision with significant impact | Transparency, fairness; explanation; refusal of solely automated decisions [5] | Explanation service; manual route | 4 |
| EU AI Act `Art. 86`, `Art. 26(11)` | Deployer decision on an Annex III high-risk output | Explanation of the system's role and main elements; informing people [29][14] | Explanation keyed to the decision record | 4 · 5 |

Article 86 applies only where Union law does not already give the right [29], so the GDPR route
usually does the work (chapter 18 reads
[AI Act Article 86 and Article 4a](/bok/eu-ai-act#explanation-and-notice-to-affected-people) in
context). It sits outside the Annex III requirements the Omnibus deferred to 2 Dec 2027
[2], and whether it bites earlier is not settled as of 2026-09-24 (verify). The Digital Omnibus
proposal would recast Article 22 as a permission list in which contractual necessity holds even if a
human could decide [30]; it is not law (see below).

**Maps to:** GDPR `Art. 13(2)(f)`, `Art. 15(1)(h)`, `Art. 22` · UK GDPR `Arts. 22A–22D` · CCPA ADMT
regulations · LGPD `Art. 20` · PIPL `Art. 24` · EU AI Act `Art. 14`, `Art. 26(11)`, `Art. 86` · NIST
AI RMF (Manage) · layers 04 and 05. Mappings are illustrative, not a claim of conformity.

## Data subject rights against trained models

### Where a request has to reach

Rights of access, rectification, erasure and objection [1] do not stop at the database. The deadline
is one month, extendable by two for complex requests [31], so the path is designed before the first
request. A controller that cannot identify a person in a training set may say so, and the person may
supply information that makes identification possible [31].

| Where the data sits | Feasible response to erasure or objection | Evidence |
|---|---|---|
| Source systems and raw corpus | Normal request tooling | Ticket closure |
| Training and fine-tuning snapshots | Remove; flag models trained on the snapshot | Snapshot diff |
| RAG index and caches | Delete or re-index chunks; immediate | Index manifest |
| Prompt and output logs | Delete or pseudonymise by subject key | Retention verdict |
| Eval sets | Replace with synthetic records | Eval-set card |
| Model weights (if not anonymous) | Suppress outputs now; retrain or unlearn on a schedule | Filter rule; retrain plan |

### Suppression, retraining and unlearning

For data inside the weights there is a ladder, from fast and partial to slow and complete:

1. **Output suppression.** A filter around the model stops it producing the person's data. The CNIL
   accepts filters where retraining is disproportionate, if shown effective and robust, and prefers
   general rules to a list of names (itself a list of people who objected) [31]. The data
   stays in the model; test the filter like any control.
2. **Retraining without the data.** Where the training data is still held, retraining answers the
   request, and periodic retraining batches many [31]. Complete for the new version, costly
   for large models.
3. **Machine unlearning.** Exact approaches such as SISA shard training so only the affected shard is
   retrained [32]; approximate ones adjust weights and are hard to verify. Treat any unlearning claim
   as a test to pass (membership inference or extraction on the removed records).

Record the choice and its reason per request: the regulator will ask why suppression and not
retraining, and when the next retrain closes the gap.

### Recording how a request was honoured

The evidence is a **[fulfilment record](/patterns/rights-requests-against-models)** written by the workflow: every location, the action in each,
the model versions affected and when the gap closes.

> **Example (illustrative)**
> An erasure request against `csa-01`, closed within the deadline:
>
> ```json
> { "request_id": "dsr-2026-0412", "right": "erasure", "subject_key": "hash:7c1e…",
>   "locations": { "crm": "deleted", "rag_index": "deleted", "fine_tune_set": "deleted",
>                  "logs": "deleted", "weights": "output-suppression:rule-dsr-0412" },
>   "retrain_scheduled": "csa-01@2026-10-15", "closed": "2026-09-30", "within_deadline": true }
> ```

**Maps to:** GDPR `Art. 12(3)`, `Arts. 15–17`, `Art. 21` · ISO/IEC 27701 · NIST AI RMF (Manage) ·
layers 04 and 05. Mappings are illustrative, not a claim of conformity.

## Does a model contain personal data?

### The EDPB anonymity test

If a model is personal data, rights, transfer and breach rules reach the weights. Authorities
differ. The Hamburg authority's 2024 discussion paper argued that storing a large language model is
not processing, that rights attach to the system's inputs and outputs, and that unlawful training
does not taint later use [33]. The EDPB was stricter: models trained on personal data cannot in all
cases be considered anonymous, and a model is anonymous only if both the likelihood of extracting
training subjects' data directly and the likelihood of obtaining it through queries are
insignificant, given all means reasonably likely to be used [3]. The CNIL has since published
guidance on documenting whether a model falls under the GDPR and recommends robust filters around
models that may have memorised data [34].

For the engineer the opinion is a test plan. Authorities will examine source selection, preparation
and minimisation, training choices (regularisation, differential privacy), output measures, audits,
and structured testing against attribute and membership inference, exfiltration, regurgitation,
model inversion and reconstruction attacks; they expect documentation including DPIAs (or the
decision not to run one), the threat model, per-source measures with source URLs, and evidence of
resistance to re-identification [3]. That is an **anonymity evidence pack**, and most of it is layer
03 output: an attack suite runs as an eval gate on each model version, and its result is the claim.

> **Example (illustrative)**
> One line of an anonymity evidence pack, filed against a model version:
>
> ```json
> { "suite_id": "privacy.membership-inference.v2", "model_version": "csa-01@2026-09-18",
>   "attack_auc": 0.52, "threshold": 0.55, "canary_extraction": "0/500", "result": "pass" }
> ```

Passing known attacks evidences resistance to those attacks only, as the EDPB notes [3]; the pack is
re-run when the model, its data or the state of the art changes.

### When the model was trained unlawfully

The opinion sets three scenarios [3]. If personal data stays in the model and **the same
controller** deploys it, the effect of the unlawful development is assessed case by case. If
**another controller** deploys it, that deployer should have assessed that the model was not
developed unlawfully, looking at the source of the data and any infringement found by an authority
or court, scaled to its own risk. If the model was **anonymised** before deployment and deployment
processes no personal data, the GDPR does not apply to that operation; new personal data processed
in deployment is assessed on its own.

The second scenario reaches most organisations, because most deploy models they did not train. In
the [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) it
becomes stored answers: the provider's training-data summary, its stated basis, any public
enforcement finding, its anonymity claim and evidence, and the date checked.

**Maps to:** GDPR `Art. 4(1)`, `Art. 5(2)`, `Art. 24`, `Art. 25` · EU AI Act `Art. 53` · NIST AI RMF
(Measure) · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) · layers
02, 03 and 05. Mappings are illustrative, not a claim of conformity.

## Special categories, inferred data and biometrics

Article 9(1) GDPR prohibits processing data revealing racial or ethnic origin, political opinions,
religious or philosophical beliefs or trade union membership, and processing genetic data, biometric
data for unique identification, health data and data on sex life or sexual orientation, unless an
Article 9(2) condition applies, such as explicit consent [1]. The AI Act's new Article 4a lets
providers of high-risk systems process such data where strictly necessary for bias detection and
correction, only if other data (including synthetic or anonymised data) would not do, with
pseudonymisation, access controls, no onward transmission and deletion once the bias is corrected
(chapter 16 on
[special-category data for bias detection (Art. 4a)](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test));
deployers and providers of other systems may do so exceptionally, and no duty to run bias work is
created [2]. The old Article 10(5) basis was deleted [35].

### Inferred and proxy sensitive data

AI creates sensitive data without collecting it: health inferred from purchases, religion from meal
choices, orientation from social graphs, or a postcode standing in for ethnicity. The ICO's AI
guidance treats inferences and special-category data as a lawfulness question [36]. Washington's My
Health My Data Act counts as consumer health data information derived or extrapolated from
non-health data, including by algorithms or machine learning [37]. California requires a risk
assessment before automated inference of health, economic situation or behaviour in certain contexts
[24].

Two controls make this checkable. A **proxy test** in layer 03 measures how well each feature and
the output predict a protected attribute on a labelled set, failing the build above a threshold. An
**inference policy** in layer 01 lists attributes a system may not infer, enforced by an output
classifier in layer 04. Both leave records that the sensitive inference was looked for.

### Biometrics

Biometric data results from technical processing of physical, physiological or behavioural traits
that allows or confirms unique identification, such as facial images or fingerprints [1]. Keep three
uses apart: **identification** (one to many), **verification** (one to one) and **categorisation**
(assigning a group from traits).

| Instrument | Rule on biometrics | Artefact |
|---|---|---|
| GDPR `Art. 9` | Biometric data for unique identification is a special category [1] | Article 9(2) condition record; DPIA |
| EU AI Act `Art. 5(1)(e)`–`(h)` | Bans untargeted facial scraping, emotion inference at work and school (medical and safety uses excepted), categorisation inferring sensitive traits, and real-time remote identification for law enforcement save narrow exceptions [38] | Prohibited-use policy as code; intake screen |
| EU AI Act Annex III point 1 | Remote identification (not verification), sensitive categorisation and emotion recognition are high-risk where lawful [39] | High-risk classification record |
| Omnibus proposal `Art. 9(2)(l)` | Would allow verification under the person's sole control [30] | None yet |
| Illinois BIPA | Retention schedule, informed written consent, no profiting; private action with USD 1,000 per negligent and USD 5,000 per intentional or reckless violation [40] | Consent capture; retention as code; destruction log |
| PIPL `Arts. 28–29` | Biometrics are sensitive: specific purpose, necessity, separate consent [5] | Separate-consent record; PIPIA |

BIPA is enforced through private class actions, and a 2024 amendment is reported to limit repeated
scans of the same person to one recovery (verify) [40]. A leaked password can be reset; a leaked
face cannot, so biometric templates get the strictest retention and access rules, and their deletion
log is evidence worth keeping.

### Consumer-health and neural data

Washington's My Health My Data Act, in force for most entities since 31 Mar 2024, requires consent
to collect, separate consent to share and a signed authorisation to sell, enforced through the state
consumer-protection act [37]. **Neural data** (information generated by measuring nervous-system
activity) is sensitive personal information under the CCPA by SB 1223, approved 28 Sep 2024 [41],
and sensitive data under the Colorado Privacy Act by HB24-1058, in force since 7 Aug 2024 [42]. An
AI system reading wearables or brain-computer interfaces must flag these data classes at intake,
because they switch on consent and assessment duties that ordinary telemetry does not.

**Maps to:** GDPR `Art. 4(14)`, `Art. 9`, `Art. 35(3)(b)` · EU AI Act `Art. 4a`, `Art.
5(1)(e)`–`(h)`, Annex III point 1 · BIPA · Washington MHMDA · CCPA · PIPL `Arts. 28–29` · NIST AI
RMF (Map, Measure) · layers 01, 03 and 04. Mappings are illustrative, not a claim of conformity.

## AI-specific privacy breaches

A **personal data breach** is a breach of security leading to the accidental or unlawful
destruction, loss, alteration, unauthorised disclosure of, or access to, personal data [1]. The
controller notifies the authority without undue delay and, where feasible, within 72 hours of
becoming aware, unless the breach is unlikely to result in a risk; informs the people affected when
the risk is high; and documents every breach [1]. AI adds ways to disclose data that do not look
like a stolen database.

| Breach type | Mechanism | Detection | Artefact |
|---|---|---|---|
| Regurgitation and extraction | The model reproduces memorised training text, including names, phone numbers and emails [43] | Output PII hits; canaries; user reports | Output guardrail log; extraction eval |
| Membership inference | An attacker learns whether a record was in the training set [44] | Found by testing, rarely at runtime | Membership-inference eval |
| Model inversion | Features of training subjects reconstructed from outputs and confidence scores [45] | High-volume probing patterns | Rate limits; red-team result |
| Prompt-injection exfiltration | Instructions hidden in retrieved content make the assistant leak data it can read [46][47] | Blocked outbound links; tool-call anomalies | Guardrail decisions; tool-call traces |
| Over-broad retrieval | A RAG index returns another customer's records | Cross-tenant retrieval alerts | Index access tests; retrieval traces |
| Log exposure | Prompts with personal data readable in observability tools | Access reviews; DLP on log stores | Retention verdicts; access logs |

Whether a given event is notifiable is the privacy team's judgement on the facts, with the EDPB's
worked examples as a guide [48]. The engineering job is to produce the facts within the clock: the
trace of what left, the registry entry saying whose data the system holds, the eval history saying
whether the weakness was known. For agents that read mail, browse and call tools, the AEPD's
guidance on agentic AI of 18 Feb 2026 sets out the added threats and the measures controllers can
take [49]. One incident can start several clocks: the GDPR's 72 hours runs beside the AI Act's
Article 73 deadlines (chapter 08) and any sector regime; chapter 17 sets
[GDPR breach notification next to the AI Act clocks](/bok/incidents#the-overlapping-clocks). Give the [Incident
Pipeline](/patterns/incident-pipeline) a personal-data-breach branch with its own timer
from the awareness timestamp, and keep the Omnibus proposal's 96 hours and high-risk threshold as a
parameter, not today's rule [30].

**Maps to:** GDPR `Art. 4(12)`, `Arts. 32–34` · EU AI Act `Art. 15`, `Art. 73` · OWASP LLM02:2025 ·
OWASP Agentic ASI01 [50] · NIST AI RMF (Manage) · layers 03, 04 and 05. Mappings are illustrative,
not a claim of conformity.

## The GDPR side of the Digital Omnibus

Only one of the two Omnibus texts is law: the **Digital Omnibus on AI**, Regulation (EU) 2026/1744,
in force since 27 Jul 2026, which created Article 4a [2]. The **Digital Omnibus** proposal of 19 Nov
2025, COM(2025) 837, would amend the GDPR and neighbouring rules [30]. As of 2026-09-24 it remains a
proposal: the Parliament's ITRE and LIBE committees had a draft report from 22 Jun 2026 and more
than 1,750 amendments, the Council's planned mandate vote of 26 Jun 2026 was cancelled, and by
August 2026 trilogues had not begun [51]. Commentary on Council working texts reported that a June
compromise replaced the proposed Article 88c with a recital and reworked the personal-data
definition through a new pseudonymisation provision [52].

| Proposed GDPR change [30] | Current law | Build now |
|---|---|---|
| `Art. 4(1)`: not personal data for an entity that cannot identify the person by means reasonably likely to be used | Recital 26; the SRB judgment [7] | Key custody records |
| `Art. 9(2)(k)`, `9(5)`: residual special-category data in AI development and operation; avoid, remove, or shield from outputs | No AI-specific condition | Special-category scans; output filters |
| `Art. 88c`: legitimate interests for AI, with minimisation, protection of residual data, enhanced transparency and an unconditional right to object | Article 6(1)(f) and the three-step test [3] | LIA with an opt-out endpoint |
| `Art. 22`: permission list; contractual necessity even if a human could decide | Current Article 22 [1] | Decision records; contest paths |
| `Art. 33`: high-risk breaches only, 96 hours, single entry point | 72 hours, any risk | A parameterised breach timer |
| `Art. 35`: EU-wide DPIA lists, template and methodology | National lists | A DPIA mappable to a common schema |

The reading is short: do not build to a proposal. Build the controls both versions want, and make
the parameters that may move (breach clock, notification threshold, DPIA triggers) configuration,
not code.

## Beyond the EU: UK, US, Brazil and China

### United Kingdom

The Data (Use and Access) Act 2025, section 80, replaced UK GDPR Article 22 with Articles 22A to
22D: a significant decision with no meaningful human involvement is allowed with safeguards
(information, representations, human intervention, contest); special-category data is limited to
explicit consent, or contract or legal authorisation with the substantial-public-interest condition;
and the new recognised-legitimate-interests basis cannot support such a decision [23]. The rules
took effect on 5 Feb 2026 [23]. The ICO consulted on draft ADM guidance from 31 Mar to 29 May 2026
[53], and marks its AI guidance as under review because of the Act [36]. Chapter 08 places the UK in
the [regulatory map](/bok/regulatory-map#united-kingdom).

### United States

There is no federal comprehensive privacy law. California's regulations on ADMT, risk assessments
and cybersecurity audits took effect on 1 Jan 2026 [24]. Chapter 21 walks one hiring tool through
[Colorado SB 26-189 and the CPPA ADMT rules](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes)
side by side. ADMT means technology that uses computation
to replace or substantially replace human decision-making; a significant decision concerns lending,
housing, education, employment or healthcare. Risk assessments are due before, among others, using
ADMT for significant decisions, certain automated inferences, and training ADMT or
facial-recognition technology; for processing that predates the rules they are due by 31 Dec 2027,
with submissions to the agency by 1 Apr 2028 [24]. Virginia's law shows the shape of the others in
the table: opt-outs of targeted advertising, sale and significant profiling, and assessments the
Attorney General can demand [25][54]. The number of states with such laws keeps growing (verify the
current count).

| Law | Profiling or ADMT right | Assessment duty | Sensitive-data note |
|---|---|---|---|
| California CCPA and ADMT regulations | Pre-use notice; opt-out or appeal; access [24] | Risk assessments, submitted to the agency [24] | Neural data is sensitive [41] |
| Virginia CDPA | Opt-out of profiling [25] | Assessments, available to the Attorney General [54] | Sensitive data triggers an assessment [54] |
| Colorado Privacy Act (2023-07-01) | Opt-out incl. profiling [26] | Assessments for heightened risk [26] | Neural and biological data are sensitive [42] |
| Minnesota CDPA (2025-07-31) | Question, reason, review, re-evaluation [27] | Not mapped in this edition | Not mapped in this edition |

The practical unit is the right, not the state: one opt-out signal honoured at inference, one
reason-and-review workflow, one assessment template with fields for each state's triggers.

### Brazil and China

Brazil's **LGPD** includes legitimate interests among its legal bases, sets stricter conditions for
sensitive data, treats anonymised data as outside the law unless the anonymisation can be reversed
with reasonable efforts, gives a right to request review of solely automated decisions with
information on the criteria (subject to trade secrets), and lets the authority require an impact
report [28].

China's **PIPL** lists its legal bases in Article 13 with no general legitimate-interests basis, so
training on personal information usually rests on consent or another listed ground. Automated
decisions must be transparent and fair, with a right to an explanation and to refuse solely
automated decisions of significant impact; sensitive information, including biometrics, needs
necessity and separate consent; cross-border provision needs a CAC security assessment,
certification or the standard contract; and an impact assessment is required in advance for
sensitive data, automated decisions, entrusted processing and cross-border provision, kept for at
least three years [5]. Chapter 08 maps China's AI-specific rules
([China](/bok/regulatory-map#china)).

## Obligation to artefact map

Layers: **1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4
Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Obligation | Artefact | Layer | Duty holder | Evidence record |
|---|---|---|---|---|
| GDPR `Art. 5(1)(b)`, `6(4)` purpose limitation | Purpose tags; purpose-match policy | 1 · 2 | Controller | Verdict per run |
| GDPR `Art. 6` lawful basis | Basis registry; versioned LIA | 2 | Controller | Registry entry with LIA ref |
| GDPR `Art. 7` consent | Consent-purpose log | 2 · 5 | Controller | Withdrawals traced to runs |
| GDPR `Arts. 13–14` transparency | Notice generated from the registry | 2 | Controller | Notice version per model version |
| GDPR `Art. 5(1)(c)`, `Art. 25` | Feature justification; PII filters; retention as code | 1 · 3 | Controller | Filter logs; retention verdicts |
| GDPR `Art. 28` processors | AI vendor clause checklist | 2 · 5 | Controller | Gate record per change |
| GDPR `Art. 30` ROPA | Records generated per processing moment | 2 · 5 | Controller; processor | Generated record |
| GDPR `Arts. 35–36` DPIA | AI DPIA template; "no DPIA" decision | 1 · 2 | Controller | Versioned DPIA |
| GDPR `Arts. 44–46` transfers | Transfer register; routing policy; TIA | 1 · 4 · 5 | Controller; processor | Routing verdicts |
| GDPR `Art. 22`, `15(1)(h)` ADM | Decision record; notice; contest path | 4 · 5 | Controller; score producer | Decision and review records |
| GDPR `Arts. 15–17`, `21` rights | Request workflow across all locations | 4 · 5 | Controller | Fulfilment record |
| GDPR `Art. 5(2)` model anonymity | Anonymity evidence pack; privacy attack evals | 3 · 5 | Controller (developer) | Eval result per version |
| GDPR `Art. 9` sensitive and inferred data | Proxy test; inference policy; condition record | 1 · 3 · 4 | Controller | Proxy eval; classifier decisions |
| GDPR `Arts. 33–34` breaches | Breach branch of the incident pipeline | 4 · 5 | Controller; processor | Awareness timestamp; notice |
| EU AI Act `Art. 4a` | Pseudonymised bias set; deletion job; ROPA reason | 1 · 2 | Provider; deployer (exceptionally) | Deletion log; ROPA entry |
| EU AI Act `Art. 26(9)`, `27(4)` | FRIA-as-Code sharing DPIA fields | 2 | Deployer | Linked assessments |
| EU AI Act `Art. 86` | Explanation keyed to the decision record | 4 · 5 | Deployer | Explanation per request |
| UK GDPR `Arts. 22A–22D` | Safeguard workflow; involvement rationale | 4 · 5 | Controller | Review records |
| CCPA ADMT regulations | Pre-use notice; opt-out or appeal; risk assessment | 2 · 4 · 5 | Business | Notice; opt-outs; assessment |
| US state profiling opt-outs | Opt-out flag at inference; assessment template | 1 · 4 · 5 | Controller | Opt-out verdicts |
| BIPA; MHMDA; neural-data laws | Consent capture; retention schedule; intake flags | 1 · 2 | Business | Consent and destruction logs |
| LGPD `Art. 20`; PIPL `Arts. 24`, `55–56` | Review and explanation workflows; PIPIA | 4 · 5 | Controller; processor | Review records; PIPIA |

> **In practice (illustrative)**
> A privacy engineering lead in a large telco rebuilt the `csa-01` DPIA so most of it was generated:
> processing moments from the registry, bases from the basis registry, the transfer map from the routing
> policy, memorisation risk from the latest privacy eval, the rights path from the request workflow. The
> DPO still wrote and signed the risk judgement. When the vendor changed region, three fields changed
> and the DPIA showed a diff instead of going stale in a shared drive.

**Maps to:** GDPR `Arts. 5–7`, `9`, `13–17`, `21`, `22`, `25`, `26`, `28`, `30`, `32–36`, `44–46` ·
UK GDPR `Arts. 22A–22D` · CCPA and its ADMT regulations · Virginia, Colorado and Minnesota privacy
acts · BIPA · Washington MHMDA · LGPD · PIPL · EU AI Act `Arts. 4a`, `5`, `26`, `27`, `86` · ISO/IEC
42001 · ISO/IEC 27701 · NIST AI RMF (Govern, Map, Measure, Manage) · all five layers. Mappings are
illustrative, not a claim of conformity.

## What you can do this week

1. **List the processing moments** of your highest-risk AI system and write the lawful basis and
   retention next to each. Every blank cell is a finding.
2. **Add one privacy eval to the gate**: a PII-leakage or membership-inference test with a threshold
   that fails the build. Its result is page one of an anonymity evidence pack.
3. **Run a mock erasure request** through corpus, snapshots, RAG index, logs and weights, write the
   fulfilment record, and time it against the one-month deadline.
4. **Send your AI vendors the clause checklist** (no training, prompt retention, region,
   sub-processors, change notice) and store the answers on their registry entries.
5. **Trace one inference call** to the country that serves it and check the transfer register names a
   ground. If it does not, the residency policy has its first rule.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 4(1), 4(4), 4(5), 4(12), 4(14), 5, 6, 6(4), 7, 9, 12(3), 13–17, 21, 22, 25, 26, 28, 30, 33–36, 44–46, 83(5), 99; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special-category data for bias detection and correction, incl. the records-of-processing reason; amended Art. 2(7) keeping the GDPR unaffected; Annex III high-risk requirements from 2 Dec 2027); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (no hierarchy of legal bases; three-step legitimate-interest test; mitigating measures, paras 99–107; anonymity test at para 43, elements and documentation for the evidence at paras 49–58; three scenarios on unlawful development). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[4] "Relying on the legal basis of legitimate interests to develop an AI system" (AI how-to sheet; legitimate interest as the most likely basis; balancing test; discretionary prior right to object; transparency on regurgitation risk). CNIL. 2025-06 (page dated 2026-01-05). https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system (verified: primary)
[5] Personal Information Protection Law of the People's Republic of China (Arts. 13 legal bases, 24 automated decision-making, 28–29 sensitive personal information and separate consent, 38 cross-border provision, 55–56 impact assessment kept three years), official English translation. National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[6] Guidelines 01/2025 on pseudonymisation (version for public consultation, 17 Jan to 14 Mar 2025). European Data Protection Board. 2025-01. https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en (verified: primary)
[7] Press release No 107/25: judgment in Case C-413/23 P, EDPS v SRB (pseudonymised data not personal data in all cases and for every person; identifiability for the controller's information duty assessed at collection, from the controller's point of view). Court of Justice of the EU. 2025-09-04. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf (verified: primary)
[8] Rocher, Hendrickx and de Montjoye, "Estimating the success of re-identifications in incomplete datasets using generative models" (99.98% of Americans correctly re-identified with 15 demographic attributes). Nature Communications 10, 3069. 2019-07-23. https://doi.org/10.1038/s41467-019-10933-3 (verified: primary)
[9] McMahan et al., "Communication-Efficient Learning of Deep Networks from Decentralized Data" (federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[10] Zhu, Liu and Han, "Deep Leakage from Gradients" (private training data recovered from shared gradients; arXiv 1906.08935). arXiv. 2019-06-21. https://arxiv.org/abs/1906.08935 (verified: primary)
[11] Stadler, Oprisanu and Troncoso, "Synthetic Data – Anonymisation Groundhog Day" (synthetic data either does not prevent inference attacks or does not retain utility; arXiv 2011.07018). arXiv. 2020-11-13. https://arxiv.org/abs/2011.07018 (verified: primary)
[12] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[13] Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" (WP248 rev.01; nine criteria; two criteria usually require a DPIA), endorsed by the EDPB. Article 29 Working Party. 2017-10-04. https://ec.europa.eu/newsroom/article29/items/611236 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(9) and (11) (deployers use Art. 13 information for their GDPR DPIA; informing people subject to Annex III high-risk decisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[16] Guidelines 05/2021 on the interplay between the application of Article 3 and the provisions on international transfers as per Chapter V of the GDPR, version 2.0 (three cumulative criteria for a transfer; remote access from a third country, Example 11). European Data Protection Board. 2023-02-14. https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf (verified: primary)
[17] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data, version 2.0. European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[18] Standard contractual clauses for international transfers (published 4 June 2021). European Commission. 2021-06-04. https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en (verified: primary)
[19] EU-US data transfers: adequacy decision for the EU-US Data Privacy Framework (adopted 10 July 2023). European Commission. 2023-07-10. https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en (verified: primary)
[20] Press release No 106/25: judgment in Case T-553/23, Latombe v Commission (action for annulment of the EU-US Data Privacy Framework adequacy decision dismissed). General Court of the EU. 2025-09-03. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf (verified: primary)
[21] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[22] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; effect of a variation in the data; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[23] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D: meaningful human involvement, restrictions for special-category data and for Art. 6(1)(ea), safeguards; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[24] California Privacy Protection Agency, CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved by OAL 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); significant decision § 7001(ddd); risk-assessment triggers § 7150; deadlines §§ 7155(b), 7157(a); ADMT compliance § 7200(b); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[25] Code of Virginia § 59.1-577, Personal data rights; consumers (opt out of targeted advertising, sale, or profiling in furtherance of decisions that produce legal or similarly significant effects). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-577/ (verified: primary)
[26] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[27] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review the data, correct and have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[28] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 7 legal bases incl. legitimate interests; Art. 11 sensitive data; Art. 12 anonymised data; Art. 20 review of automated decisions; Art. 38 impact report). Presidência da República (Brazil). 2018-08-14. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[29] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; deployer decisions based on Annex III high-risk outputs, except point 2; applies only where Union law does not otherwise provide the right). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[30] Proposal for a Regulation amending Regulations (EU) 2016/679, 2018/1724, 2018/1725, 2023/2854 and Directives 2002/58/EC, (EU) 2022/2555 and (EU) 2022/2557 as regards the simplification of the digital legislative framework (Digital Omnibus), COM(2025) 837 final, Council doc. 15698/25 (GDPR Arts. 4(1), 5(1)(b), 9(2)(k)–(l) and 9(5), 12(5), 13(4), 22, 33, 35, new 88c). European Commission / Council of the EU. 2025-11-19. https://data.consilium.europa.eu/doc/document/ST-15698-2025-INIT/en/pdf (verified: primary)
[31] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[32] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[33] Discussion Paper: Large Language Models and Personal Data (three theses: storing an LLM is not processing; rights attach to system inputs and outputs; unlawful training does not affect later use). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[34] "AI: the CNIL finalises its recommendations on the development of artificial intelligence systems and announces its upcoming work" (guidance on GDPR applicability to AI models; annotation; secure development). CNIL. 2025-07-22. https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems (verified: primary)
[35] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10 (as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[36] Guidance on AI and data protection (lawfulness incl. inferences and special category data; notice that it is under review because of the Data (Use and Access) Act; last updated 15 Mar 2023). Information Commissioner's Office. 2023-03-15. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ (verified: primary)
[37] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated from non-health information by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; enforcement under chapter 19.86 RCW; 31 Mar 2024, small businesses 30 Jun 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(e)–(h) (untargeted facial scraping; emotion inference at work and school; biometric categorisation of sensitive traits; real-time remote biometric identification for law enforcement). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 1 (biometrics: remote biometric identification excluding verification; sensitive-attribute categorisation; emotion recognition). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[40] "Biometric Information Privacy Act" (740 ILCS 14, 2008; informed written consent, retention schedule, no profiting; USD 1,000 / 5,000 statutory damages; 2024 amendment, SB 2979, on per-person recovery). Wikipedia. 2026. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: secondary)
[41] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data defined and added to sensitive personal information under the CCPA; approved by the Governor 28 Sep 2024; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[42] HB24-1058, Protect Privacy of Biological Data (biological and neural data as sensitive data under the Colorado Privacy Act; signed 17 Apr 2024; effective 7 Aug 2024). Colorado General Assembly. 2024-04-17. https://leg.colorado.gov/bills/hb24-1058 (verified: primary)
[43] Carlini et al., "Extracting Training Data from Large Language Models" (hundreds of verbatim training sequences extracted from GPT-2, incl. names, phone numbers and email addresses; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[44] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[45] Fredrikson, Jha and Ristenpart, "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[46] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (data theft via injected prompts in retrieved content; arXiv 2302.12173). arXiv. 2023-02-23. https://arxiv.org/abs/2302.12173 (verified: primary)
[47] LLM02:2025 Sensitive Information Disclosure (OWASP Top 10 for LLM Applications, 2025 edition). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ (verified: primary)
[48] Guidelines 9/2022 on personal data breach notification under GDPR, version 2.0. European Data Protection Board. 2023-03-28. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification-under_en (verified: primary)
[49] "La Agencia publica unas orientaciones sobre Inteligencia Artificial agéntica desde la perspectiva de protección de datos" (press release; guidance on agentic AI and data protection). Agencia Española de Protección de Datos. 2026-02-18. https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia (verified: primary)
[50] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[51] "The Digital Omnibus Regulation Proposal", Legislative Train Schedule (status: tabled; ITRE and LIBE joint; draft report 22 June 2026; 1,750+ amendments; Council mandate vote of 26 June cancelled; no trilogues; last update 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[52] "Digital Omnibus (GDPR) Negotiations at the Council – September 2026 Update" (June compromise replaced the AI provision, Art. 88c, with a recital; personal-data definition reworked via a new pseudonymisation article). Privacy Next. 2026-09-01. https://www.privacynext.eu/resources/digital-omnibus-gdpr-negotiations-at-the-council-september-2026-update/ (verified: reported)
[53] ICO consultation on the draft guidance about automated decision-making, including profiling (published 31 Mar 2026; closed 29 May 2026; follows the Data (Use and Access) Act 2025). Information Commissioner's Office. 2026-03-31. https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/ (verified: primary)
[54] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, risky profiling, sensitive data; available to the Attorney General on civil investigative demand). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
