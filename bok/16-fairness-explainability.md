# 16. Fairness and explainability for practitioners

> Fairness and explainability become controls only when they are measured, gated and filed as
> evidence; this chapter maps each technique to its stack layer and its legal hook.

> **In short**
> Fairness and explainability become controls only when they are measured, gated and filed as
> evidence. The NIST AI RMF gives each a measurement subcategory: `MEASURE 2.11` for fairness and
> bias and `MEASURE 2.9` for explanation [1]. NIST SP 1270 states that "it is not possible to
> achieve zero risk of bias in an AI system" [2], so fairness is managed like any other residual
> risk: named, measured, bounded and monitored, never declared solved. Choosing a fairness metric is
> a value choice, because the impossibility results of Kleinberg, Mullainathan and Raghavan and of
> Chouldechova show that common fairness conditions cannot all hold at once when base rates differ
> [18][19]. The most widely used screening number is the four-fifths rule of the 1978 US Uniform
> Guidelines [12]. On the explanation side, the legal hooks run through credit adverse-action
> notices, the GDPR and EU AI Act Articles 13 and 86, and each explanation is kept as an evidence
> record.

## How to read this chapter

Fairness and explainability are the two principles every responsible-AI framework names and the two
that most often stay on the poster. NIST's AI Risk Management Framework lists "Fair – with Harmful
Bias Managed" and "Explainable and Interpretable" among the characteristics of trustworthy AI, and
gives each a measurement subcategory: `MEASURE 2.11` (fairness and bias are evaluated and the
results documented) and `MEASURE 2.9` (the model is explained, validated and documented, and its
output interpreted in context) [1]. The engineering question is what those two sentences turn into
on a Tuesday: which metric, computed on which slice, against which threshold, failing which build;
which explanation, produced by which method, tested how, delivered to whom, and kept as which
record.

The chapter keeps the house line from chapter 01. Responsible AI and AI ethics set the target; AI
governance engineering builds the control that hits it and the evidence that proves it (see [the
disambiguation cluster](/bok/definition#the-disambiguation-cluster)). Nothing here is legal advice.
The law decides which disparity is unlawful and which explanation is owed; the engineer builds the
measurement and the explanation so that Legal has something true to decide on.

The two halves belong together for a practical reason. Fairness is about outcomes across people;
explainability is about the reasons for one outcome. An explanation is how an individual discovers
that a decision was unfair to them, and attribution methods are one way a team finds the proxy that
made a model unfair. Both also trade against privacy: you cannot measure a disparity across a group
you may not observe, or explain a decision without disclosing something about its data. The first
half covers fairness, the second explainability, and the last section places both in the five layers
of [the stack](/bok/the-stack#how-to-read-the-stack).

## Where bias enters the lifecycle

NIST SP 1270 sorts AI bias into three categories, **systemic**, **statistical** and **human**, and
states plainly that "it is not possible to achieve zero risk of bias in an AI system" [2]. The
consequence for an engineer is that fairness is managed like any other residual risk: named,
measured, bounded and monitored, never declared solved.

Suresh and Guttag give the lifecycle view: seven sources of downstream harm, spread from data
collection to deployment [3]. Each one has a different control, so the first job is to know which
one you are looking at.

| Source | Where it enters | Typical failure | Control and evidence | Layer |
|---|---|---|---|---|
| Historical bias | The world the data describes | Past hiring decisions encode past discrimination | Label audit; decision to relabel or change the target, recorded in the data card | 02 · 03 |
| Representation bias | Sampling | A group is under-sampled, so its error rate is high and noisy | Coverage report per group against the deployment population | 02 · 03 |
| Measurement bias | Features and labels | A convenient proxy stands in for the real target | Target-validity review; proxy scan | 03 |
| Aggregation bias | Modelling | One model fitted to groups with different relationships | Per-group performance; interaction terms or separate models | 03 |
| Learning bias | Training objective | Optimising average loss trades away a minority group | Fairness-constrained training; per-group loss curves | 03 |
| Evaluation bias | Benchmarks | The test set does not look like the people served | Evaluation set drawn from the deployment population; sliced metrics | 03 |
| Deployment bias | Use in context | A score built for one purpose used for another | Intended-purpose field in the registry; misuse monitoring | 02 · 04 |

Measurement bias deserves the most attention because it passes every accuracy test. The canonical
case is a widely used commercial health-care algorithm that predicted health-care *costs* as a
stand-in for health *need*. Because less money was spent on Black patients at the same level of
illness, the model was accurate on its target and biased on the thing that mattered; correcting the
disparity would have raised the share of Black patients flagged for extra help from 17.7% to 46.5%
[4]. No fairness metric computed against the cost label would have caught it. What catches it is a
review of whether the label measures the construct the decision is about, recorded before training.
The [health-risk score case](/cases/health-risk-score-proxy) reads it as a post-mortem, and the
[recruiting-model case (reported)](/cases/recruiting-model-reported) does the same for historical
bias in hiring data.
The EU AI Act writes this view into law for high-risk systems. Article 10(2)(f) and (g) require data
to be examined for biases likely to affect health and safety, harm fundamental rights or lead to
prohibited discrimination, and require measures to detect, prevent and mitigate them; Article 10(3)
and (4) require data that is relevant, sufficiently representative and suited to the setting of use
[5]. Article 15(4) adds the feedback loop: a system that keeps learning must be built to reduce the
risk that biased outputs become future inputs [6]. Each clause is a test you can run and a record
you can keep (see [Data governance across the
stack](/bok/the-stack#data-governance-across-the-stack)).

## Protected characteristics, proxies and the data you need to test

**Protected characteristics** are defined by the legal frame, not by the engineer. US federal
employment law protects race, colour, religion, sex and national origin under Title VII [7]; EU
equality law defines discrimination on grounds such as racial or ethnic origin [8]; the GDPR names
special categories of personal data whose processing is restricted [9]. A system deployed across
jurisdictions needs the union of the lists that apply, recorded in the policy as data, not in an
engineer's head.

Removing the protected attribute from the feature set, sometimes called "fairness through
unawareness", does not remove the bias. Other features carry the same information: postcode stands
in for ethnicity, first name for sex and origin, a career gap for sex or disability, device type for
income. Two tests expose **proxies** and belong in the eval suite:

- **Predict the protected attribute.** Train a small model to predict the protected attribute from
  the candidate features. If it succeeds well above chance, the feature set encodes the attribute
  and a model trained on it can discriminate without ever seeing it.
- **Attribute and ablate.** Use feature attribution (later in this chapter) to find which features
  drive the disparity, then measure the disparity with each suspect feature removed or neutralised.

Both tests need the protected attribute at evaluation time, which is the privacy tension every
fairness programme meets. The EU resolved it narrowly. The Digital Omnibus deleted Article 10(5) and
moved the rule into a new **Article 4a**, in force since 27 July 2026 [10]. Article 4a(1) lets
providers of high-risk systems exceptionally process special categories of personal data to the
extent strictly necessary for bias detection and correction under Article 10(2)(f) and (g); Article
4a(2) extends the same possibility to providers and deployers of other AI systems and models and to
deployers of high-risk systems, for biases likely to affect health and safety or fundamental rights
or to lead to prohibited discrimination, under the same conditions, while stating that it creates no
obligation to run such detection [11]. The conditions read like a control specification, which is
how to build them:

| Art. 4a(1) condition | Engineering control | Evidence record |
|---|---|---|
| (a) Other data, including synthetic or anonymised data, would not work | Necessity memo comparing the alternatives tried | Signed memo linked from the data card |
| (b) Re-use limits and state-of-the-art security, including pseudonymisation | Pseudonymisation at ingestion; purpose tag enforced at pipeline build | Pipeline config and policy verdict |
| (c) Strict, documented access for authorised persons under confidentiality | Scoped access role; access logging | Access log per query |
| (d) No transmission to or access by other parties | Egress policy-as-code denying export of the tagged set | Policy verdicts at every deploy |
| (e) Deletion once the bias is corrected or retention ends, whichever is first | Retention-as-code with a deletion job | Deletion event with dataset hash |
| (f) Records of processing state why the processing was strictly necessary | Record-of-processing entry generated from the memo | Record-of-processing version |

The article sits on top of the GDPR, not instead of it, so the lawful basis and the DPIA still apply
(see chapter 19, [Privacy and AI](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)). Where special-category data cannot be used
at all, the fallbacks are voluntary self-identification with a clear purpose statement, testing on
consented panels, and inferred attributes; the last carry their own error and legal risk and need
the same review as any other use of the data (chapter 19 on
[inferred and proxy sensitive data](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data)).

## Disparate treatment and disparate impact

Anti-discrimination law has two doctrines, and an AI system can breach either.

| Doctrine | US frame | EU frame | What it looks like in a model | First test |
|---|---|---|---|---|
| **Disparate treatment** (direct discrimination) | Intentional or explicit use of a protected characteristic | Less favourable treatment on a protected ground in a comparable situation | The protected attribute, or a deliberate stand-in, is a feature or a rule | Feature audit; counterfactual flip test |
| **Disparate impact** (indirect discrimination) | A practice that causes a disparate impact and is not job-related and consistent with business necessity | An apparently neutral criterion that puts a group at a particular disadvantage without objective justification | Neutral features produce unequal outcomes | Selection-rate ratios; error-rate gaps |

In US employment law disparate impact is statutory: a practice that causes it is unlawful unless it
is job-related and consistent with business necessity, or where a less discriminatory alternative is
refused [7]. The EU test for indirect discrimination has the same shape: an apparently neutral
criterion that disadvantages a group is unlawful unless objectively justified by a legitimate aim
pursued by appropriate and necessary means [8]. For an engineer, "neutral criterion" means
"feature", and "justified" means showing why the feature is needed and that no less discriminatory
alternative performs acceptably. That comparison is an eval, and its result is evidence.

### The four-fifths rule and the adverse-impact ratio

The most widely used screening number comes from the US Uniform Guidelines on Employee Selection
Procedures of 1978. A selection rate for any race, sex or ethnic group that is less than four-fifths
(80%) of the rate for the group with the highest rate "will generally be regarded" by federal
enforcement agencies as evidence of adverse impact [12]. The ratio of the two rates is the
**adverse-impact ratio (AIR)**.

The same paragraph carries the caveats that most dashboards drop. Smaller differences may still
constitute adverse impact where they are significant in both statistical and practical terms, and
larger differences may not where they rest on small numbers and are not statistically significant
[12]. So the four-fifths rule is a trigger for investigation, not a pass mark. A gate that treats
0.81 as green and 0.79 as red, with no confidence interval and no minimum sample, is the Goodhart
trap described in [the limits of the eval gate](/bok/definition#the-limits-of-the-eval-gate).

> **Example (illustrative)** A screening model advances 120 of 400 applicants from group A (a
> selection rate of 30%) and 45 of 250 from group B (18%). The AIR for group B is 18 / 30 = 0.60,
> well under 0.8. The eval records the rates, the counts, the ratio, a bootstrap confidence interval
> for the ratio and the protected attribute's source, and the gate routes the release to review
> rather than silently failing or passing it.

The legal weight of the rule is moving. As of 2026-09-24, US federal enforcement has turned away
from disparate impact: on 9 June 2026 the Department of Justice announced an Office of Legal Counsel
opinion concluding that the EEOC's disparate-impact guidelines are unconstitutional [13]. The
opinion addresses the Uniform Guidelines, is presented as implementing Executive Order 14281, and
follows an EEOC enforcement plan that prioritises disparate treatment; it is not a court ruling, and
commentators note that private plaintiffs and many state laws still support disparate-impact claims
[14]. The engineering conclusion does not change with the enforcement weather: the adverse-impact
ratio remains the cheapest early signal of an unequal outcome, and several regimes still require it
by name.

New York City's Local Law 144 is the clearest example. An employer may use an automated employment
decision tool only if it has had a bias audit by an independent auditor within the past year; the
audit must calculate selection or scoring rates and impact ratios across sex categories,
race/ethnicity categories and **intersectional** categories; a summary of results must be published;
and categories under 2% of the audit data may be excluded [15]. The law requires no specific action
on the results [15], which is exactly why the engineering function should attach an internal
threshold and an owner: a published impact ratio with neither is transparency without a control.

Two further legal points constrain the fix, not only the finding. Title VII forbids adjusting scores
or using different cut-off scores by race, colour, religion, sex or national origin in employment
tests [7], so a post-processing fix that sets group-specific thresholds can itself be unlawful in
that setting. And any mitigation that uses the protected attribute at decision time risks becoming
direct discrimination under EU law. Mitigation choices go to Legal with the eval evidence attached
(see [mitigation](#mitigation-before-during-and-after-training) below). The wider US and EU picture
is in chapter 20, [Existing law and AI](/bok/existing-law#fairness-measures-the-law-recognises).

## Group fairness metrics

A **group fairness metric** compares a statistic of the model's behaviour across groups. The five
that matter most, in the vocabulary of the research that defined them, are below. `Ŷ` is the
decision or prediction, `Y` the true outcome and `A` the group.

| Metric | Holds when | Equalises | Fits when | Watch out for |
|---|---|---|---|---|
| **Demographic parity** (statistical parity) | `P(Ŷ=1 given A=a)` is equal across groups | Selection rates | The opportunity should be shared regardless of measured outcome; the AIR is its ratio form | Ignores different base rates; can be met by selecting unqualified members of a group [16] |
| **Equal opportunity** | True-positive rates are equal | Benefit to the qualified | Missing a qualified person is the main harm (hiring, admissions, access to care) [17] | Leaves false positives unconstrained |
| **Equalised odds** | True-positive and false-positive rates are both equal | Both error types | Both errors are costly [17] | Harder to satisfy; may cost accuracy for all groups |
| **Predictive parity** | Precision (`P(Y=1 given Ŷ=1)`) is equal | Meaning of a positive decision | A positive decision triggers action whose value depends on being right (fraud referral) [18] | Incompatible with equal error rates when base rates differ |
| **Calibration within groups** | Among people scored `s`, a fraction `s` are positive, in every group | Meaning of a score | Scores are consumed as probabilities (credit pricing, clinical risk) [19] | A calibrated score can still produce very different error rates |

Two practical rules follow. Report differences *and* ratios, because a small absolute gap at a low
base rate can be a large ratio and the reverse [20]. And report the metric with its denominator: a
rate on 30 people is an anecdote, and the eval should say so. The tools catalogue lists
[fairness toolkits](/resources/tools#cat-fairness) as illustrative examples, not endorsements.

### Individual and counterfactual fairness

Group metrics can be satisfied while individuals are treated arbitrarily inside each group. Two
individual-level notions address that. **Individual fairness** requires that similar individuals be
treated similarly, given a task-specific measure of similarity; the hard part, which its authors
name, is agreeing that measure [16]. **Counterfactual fairness** requires that a decision be the
same in the actual world and in a counterfactual world where the individual belonged to a different
group, which needs an explicit causal model of how the attribute influences the other features [21].

Neither is usually computed exactly in production, but both have a cheap and useful approximation:
the **counterfactual flip test**. Change only the protected attribute, or its textual markers (a
name, a pronoun, a dialect), hold everything else fixed, and measure how often the decision or the
generated text changes. For LLM-based systems this is the most practical fairness eval available,
because group labels for outputs rarely exist while paired prompts are easy to generate.

## The impossibility results

Two papers from 2016 and 2017 turned "which fairness metric?" from a technical question into a value
choice. Kleinberg, Mullainathan and Raghavan formalised three conditions (calibration within groups
and balance of scores for the positive and for the negative class) and proved that, except in highly
constrained special cases, no method can satisfy all three at once [19]. Chouldechova showed that
when the prevalence of the outcome differs across groups, an instrument cannot satisfy predictive
parity and equal error rates simultaneously, and that disparate impact can arise when error-rate
balance fails [18]. The special cases are perfect prediction and equal base rates, and real
deployments rarely have either.

> **Example (illustrative)** Two groups of 1,000 people. Group A has a base rate of 30% (300
> positives), group B a base rate of 10% (100 positives). A classifier with the same true-positive
> rate (0.8) and false-positive rate (0.1) in both groups satisfies equalised odds. In group A it
> produces 240 true positives and 70 false positives (0.1 × 700), a precision of 240 / 310 = 0.77.
> In group B it produces 80 true positives and 90 false positives (0.1 × 900), a precision of 80 /
> 170 = 0.47. Equal error rates, unequal meaning of a positive decision: predictive parity fails,
> and no threshold choice fixes both while the base rates differ.

The engineering consequence is procedural. Because the metrics conflict, the choice between them is
a governance decision with an owner, taken *before* the results are seen and recorded as policy. A
team that picks the metric after looking at which one its model passes is metric shopping, and the
record should make that impossible: the chosen metric, the reason, the threshold and the approver
live in a versioned [Policy Card](/patterns/policy-card) that the eval reads.

## Intersectional and subgroup testing

Aggregate group metrics hide the people at the intersections. The Gender Shades audit of three
commercial gender classifiers found error rates of up to 34.7% for darker-skinned women against a
maximum of 0.8% for lighter-skinned men [22]; a report by gender alone, or by skin type alone,
averages the worst-served group into a larger one. Kearns and colleagues named the general failure
**fairness gerrymandering**: a classifier can look fair on every predefined group and still badly
violate the constraint on structured subgroups defined over the protected attributes [23]. Model
cards were proposed in part to report evaluation across demographic and intersectional groups [24],
and New York City's bias audits now require intersectional categories [15].

Intersectional testing runs into small numbers fast, so the eval needs rules for them:

- **A minimum cell size** in the policy; below it the eval reports "insufficient data", lists the
  cell and never counts it as a pass.
- **Confidence intervals** on every rate and ratio, with the gate on the interval, not the point.
- **A stated multiple-comparison correction**, because with dozens of cells some fail by chance.
- **A search for the worst slice**, for example a shallow tree fitted to the error indicator, to
  find subgroups nobody listed; the worst-group metric is reported beside the average.

## Choosing a fairness metric by use case

The metric follows the harm, and the harm follows the use case. Fairlearn's user guide separates
**allocation harms** (a system extends or withholds opportunities, resources or information) from
**quality-of-service harms** (a system works less well for some people even when nothing is
withheld) and **stereotyping harms** [20]. Add the cost of each error type and the legal frame, and
the choice narrows. The cost of each error type is the use-case record's
[error appetite](/bok/governing-development#error-appetite-false-positives-versus-false-negatives)
(chapter 14).

| Use case | Harm type | Costliest error | Primary metric | Secondary checks | Legal frame |
|---|---|---|---|---|---|
| CV screening, promotion | Allocation | Rejecting a qualified candidate | Selection-rate AIR; equal opportunity | Intersectional AIR; proxy scan | Title VII, Uniform Guidelines, NYC LL144; AI Act Annex III point 4 |
| Credit approval and pricing | Allocation | Both: wrongful denial and unaffordable credit | Calibration within groups; approval-rate AIR | Error-rate gaps; reason-code consistency | ECOA and Regulation B, FCRA; AI Act Annex III point 5(b) |
| Benefits eligibility and recovery | Allocation (punitive when reclaiming) | Wrongly cutting or reclaiming a benefit | False-positive-rate parity | Predictive parity; appeal outcomes by group | Equality law; GDPR Art. 22; AI Act Annex III point 5(a) |
| Clinical triage | Allocation (need-based) | Missing a person in need | Equal opportunity; calibration | Label-validity review (cost versus need) | Medical-device and equality law |
| Speech, vision, document search | Quality of service | Failing for a group of users | Worst-group error rate | Intersectional error | Accessibility and equality law |
| Generative assistant | Quality of service; stereotyping | Degraded or demeaning output for a group | Counterfactual flip rate; per-group quality floor | Stereotype probes; refusal-rate gaps | Equality and consumer law |

The Annex III points are the AI Act's high-risk use cases for employment (point 4), public
assistance benefits (point 5(a)) and creditworthiness and credit scoring (point 5(b)), which
expressly excludes systems used to detect financial fraud [25]. The table is a starting point, not a
rule. What makes the choice defensible is that it is written down with its reasons before the eval
runs, reviewed by someone who represents the affected people (the
[FRIA-as-Code](/patterns/fria-as-code) pattern is where that review lives), and
revisited when the use case changes.

## Mitigation before, during and after training

Once a disparity is found and judged unacceptable, the fixes fall into three families by where they
act. Open toolkits implement many of them; AI Fairness 360 includes dataset and model metrics and
mitigation algorithms [26], Fairlearn provides assessment and mitigation with an explicit
sociotechnical framing [27], and Aequitas focuses on auditing across subgroups [28]. They are named
as examples of a category, not endorsements.

| Stage | Techniques (examples) | What changes | Evidence to keep | Caution |
|---|---|---|---|---|
| **Pre-processing** | Collect better data; reweight or resample under-represented groups; relabel after a label audit; transform features to remove proxy information | The training data | Data card diff; before/after coverage report | Often the most durable fix; reweighting can overfit small groups |
| **In-processing** | Fairness-constrained optimisation; regularisers on group gaps; adversarial debiasing | The learning objective | Training config; per-group loss curves; the constraint and its bound | Needs the attribute at training time (see Art. 4a) |
| **Post-processing** | Group-specific thresholds [17]; reject-option review near the boundary | The decision rule | Threshold table; decision-rule version | Group-specific cut-offs may be unlawful in US employment tests [7] and risk direct discrimination in the EU |

Three rules apply to every mitigation. Re-run the whole suite, including accuracy per group, because
a fix can "equalise" by making everyone worse off. Record the mitigation as a change with an owner
and a reason, so the model card explains the behaviour. And prefer the earliest fix that works:
better data beats a clever constraint, and a constraint beats a threshold patch.

## Monitoring fairness in production

A fairness eval proves the model was acceptable on the evaluation data at build time. Production
brings new people, shifted populations and delayed labels. Monitoring fills the gap with signals
that do not need ground truth immediately:

- **Selection or approval rates by group** and their AIR, on a rolling window, compared against the
  eval baseline. These need no outcome label.
- **Calibration and error rates by group** once outcomes arrive, with the label delay stated.
- **Human-oversight signals by group**: override rates, time-to-decide and reversal rates at the
  [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). A reviewer who overrides
  one group more often is a fairness signal about the model or about the reviewer.
- **Complaints, appeals and explanation requests by group**, including their outcomes. The [contest
  channel](/patterns/decision-notice-contest-path) is a sensor.
- **Feedback-loop checks** for systems whose outputs shape future training data, which Article 15(4)
  requires high-risk systems that keep learning to address [6].

The group attribute is usually absent at runtime. The options are a consented sample or panel on
which the attribute is known, periodic audits under the Article 4a conditions (deployers of
high-risk systems fall under Article 4a(2) [11]), or monitoring only the outcome-free rates with the
attribute joined in a secured environment. Whichever is chosen, the [monitor](/patterns/drift-fairness-monitor) is a layer 04 signal
streamed into layer 05 through [Continuous Assurance
Telemetry](/patterns/continuous-assurance-telemetry), and a breach opens a ticket with
an owner, not a chart nobody reads. A disparity that caused harm is an incident and follows chapter
17, [Incidents](/bok/incidents#incident-hazard-issue-and-serious-incident).

## Transparency, interpretability and explainability

The three words are used interchangeably and should not be. NIST's framework draws the line in one
sentence each: transparency answers "what happened" in the system, explainability answers "how" a
decision was made, and interpretability answers "why" it was made and what it means to the user in
context [1]. Chapter 11 names the three sources of opacity among
[the traits of AI that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).

| Term | Question it answers | Typical artefact | Primary audience | Layer |
|---|---|---|---|---|
| **Transparency** | What is this system, what data and model does it use, what can it do and not do? | Model card, data card, AIBOM, instructions for use, AI-use notice | Deployers, auditors, the public | 02 |
| **Explainability** | How did the system arrive at this output? | Per-decision explanation record; attribution; reason codes | Operators, affected people, reviewers | 03 · 04 |
| **Interpretability** | Why does this output mean what it means, here? | A model whose structure a person can read; interpretation guidance | Model owners, validators, domain experts | 03 |

NIST IR 8312 adds four principles a system that must be explainable should meet: it delivers
**explanation** (evidence or reasons for outputs), the explanation is **meaningful** to its intended
consumer, it has **explanation accuracy** (it correctly reflects how the output was produced), and
the system respects **knowledge limits** (it operates only where it was designed to and with
sufficient confidence) [29]. The third principle is the one most often broken, and the one this
chapter returns to under testing.

## Interpretable by design or explained after the fact

There are two routes to an explanation. An **inherently interpretable** model is one whose structure
is the explanation: a sparse linear or logistic model, a points-based scorecard, a generalised
additive model, a shallow decision tree or a short rule list. A **post-hoc** explanation is produced
by a second method that approximates the behaviour of a model that is not itself readable.

Rudin's argument is that for high-stakes decisions this choice is not neutral: explaining a black
box rather than using an interpretable model "is likely to perpetuate bad practices", because a
post-hoc explanation is a model of the model, and can be wrong about it [30]. The practical form of
that argument is a design rule. Train an interpretable baseline first. If the complex model does not
beat it by a margin that matters for the decision, ship the interpretable one; if it does, record
the margin, the reason the gain justifies the explanation risk, and the post-hoc method that will be
used, in the design decision log (chapter 14, [Governing development](/bok/governing-development#architecture-and-model-selection-trade-offs)).

### When an interpretable model is required

No statute in this chapter says "use a scorecard". Several say things that are hard to meet any
other way. An interpretable model is the default when most of the following hold:

- **The decision has legal or similarly significant effects on a person** (credit, employment,
  benefits, insurance, education), so reasons are owed by law.
- **The reasons must be the factors actually used.** Regulation B requires adverse-action reasons to
  relate to the factors actually considered or scored [57]; a post-hoc approximation can drift.
- **The data is tabular with meaningful features**, where interpretable models are often
  competitive.
- **Validators or regulators must reproduce the logic**, as in model risk management.
- **The person must be able to act on the explanation**, which needs stable, understandable factors.

Where these hold and a complex model is still chosen, the gate should demand the stronger evidence:
explanation-accuracy tests, reason-code stability tests and a signed justification.

## Explanation techniques

Explanations vary along two axes: **scope** (a *global* explanation describes the model's overall
behaviour; a *local* one explains a single output) and **access** (a *model-agnostic* method needs
only inputs and outputs; a *model-specific* one uses the model's internals). The tools catalogue lists
[explainability libraries](/resources/tools#cat-explainability) as illustrative examples, not
endorsements.

| | Global | Local |
|---|---|---|
| **Model-agnostic** | Global surrogate models; permutation feature importance; partial dependence | LIME; KernelSHAP; counterfactual explanations; nearest-example explanations |
| **Model-specific** | Coefficients of an interpretable model; tree structure; probing of internal representations | TreeSHAP; integrated gradients and other gradient attributions; attention or circuit analysis (research) |

### Feature attribution: SHAP, LIME and integrated gradients

**Feature attribution** assigns each input feature a share of responsibility for one output.
**SHAP** (SHapley Additive exPlanations) assigns each feature an importance value for a particular
prediction, grounded in Shapley values from game theory, and unifies several earlier methods as
additive feature-attribution measures [32]. **LIME** explains an individual prediction by fitting a
simple, interpretable model to the black box's behaviour on perturbed samples around that input
[33]. **Integrated gradients** attributes a deep network's prediction by accumulating gradients
along a path from a baseline input to the actual one, and is designed to satisfy two axioms,
sensitivity and implementation invariance, that many attribution methods fail [34].

Each has failure modes the eval suite should test rather than assume away:

- **Correlated features.** Credit is split between correlated features according to the method's
  assumptions, so two proxies for the same thing can each look minor.
- **Baselines.** SHAP and integrated gradients explain relative to a reference; change it and the
  explanation changes, so the reference is part of the artefact.
- **Off-manifold perturbations.** Slack and colleagues built a scaffolded classifier whose
  predictions stay biased while LIME and SHAP explanations look innocuous [35]. Explanations can be
  gamed.
- **Methods that ignore the model.** Some saliency methods produce explanations independent of both
  the model and the data, so visual plausibility is no evidence of accuracy [36].

### Surrogate models

A **global surrogate** is an interpretable model (a tree, a rule list) trained to mimic the complex
model's predictions. It is useful for review and documentation, and only as good as its
**fidelity**: the share of inputs on which it agrees with the model it describes. A surrogate
reported without its fidelity on the deployment population is a diagram, not evidence.

### Counterfactual explanations

A **counterfactual explanation** states the smallest change to the input that would have changed the
outcome, for example (illustrative) "had your declared monthly income been 400 higher, the
application would have been approved". Wachter, Mittelstadt and Russell argued that such
explanations can help a data subject understand, contest and act on a decision without opening the
black box [37]. They are the natural fit for **recourse**, and they map closely onto what the Court
of Justice has since asked of controllers (see the legal hooks below).

Counterfactuals need engineering constraints to be honest and useful. Restrict changes to features
the person can actually change (never age, origin or disability); respect causal dependencies
between features; prefer plausible, sparse changes; and check that the counterfactual is stable, so
two near-identical applicants are not told opposite things. A counterfactual that recommends
changing a protected characteristic is a fairness finding, not an explanation.

### Example-based explanations

**Example-based explanations** show prototypes, the nearest training examples or the examples that
most influenced a prediction. They are intuitive for images and documents and for expert reviewers.
They also disclose training data: showing a similar past case can reveal another person's personal
data, so the method needs the same privacy review as any data release.

### Explanations for LLMs and RAG systems

Large language models add two complications. First, the model's own account of its reasoning is not
an explanation in the NIST sense of explanation accuracy. Chain-of-thought text can systematically
misrepresent the true reason for a prediction: when models were nudged by features they never
mentioned, they produced plausible rationalisations, with accuracy dropping by as much as 36% on the
affected tasks [38]. A generated rationale is an output to be evaluated, not a window into the
model.

Second, **mechanistic interpretability**, the research programme that tries to reverse-engineer the
computations inside a network, has made visible progress but, by its own researchers' account, still
faces open conceptual and practical problems before many of its benefits can be realised [39]. As of
2026-09-24, treat it as a research input to red-teaming and safety cases, not as a source of
per-decision explanations an organisation can hand to an affected person or an auditor.

For retrieval-augmented generation the practical explanation is the **citation**: which retrieved
passages support which sentences. Citations are only as good as their support. An audit of four
generative search engines found that on average 51.5% of generated sentences were fully supported by
their citations and 74.5% of citations supported their sentence [40]. So a RAG explanation artefact
needs its own evals: citation precision (does each cited passage support its claim?), citation
recall (is each claim cited?), and groundedness, all run in layer 03, plus a trace in layer 04 that
stores the corpus snapshot and passage identifiers behind each answer so the citation can be
re-checked later.

## The legal hooks for explanations

Explanation duties come from several regimes that differ in who owes what, to whom and when. The
table routes the work; the subsections add what matters for the build. Chapters 18 to 20 ([The EU AI
Act](/bok/eu-ai-act#explanation-and-notice-to-affected-people), [Privacy and AI](/bok/privacy-and-ai#gdpr-article-22-after-schufa), [Existing law and
AI](/bok/existing-law#credit-and-lending)) give the full legal picture.

| Instrument | Who owes it | Trigger | What must be given | Artefact |
|---|---|---|---|---|
| ECOA and Regulation B, 12 CFR 1002.9 | Creditor | Adverse action on a credit application or account | Statement of specific principal reasons [31] | Reason-code service; notice template; decision log |
| FCRA, 15 U.S.C. 1681m and 1681g(f) | User of a consumer report | Adverse action based on the report | Notice, credit score used and up to four key factors [41] | Score and key-factor record |
| GDPR Arts. 13(2)(f), 14(2)(g), 15(1)(h) | Controller | Automated decision-making under Art. 22(1) and (4) | Meaningful information about the logic involved, the significance and envisaged consequences [9] | System-level notice; per-request explanation |
| GDPR Art. 22(3) | Controller | Solely automated decision with legal or similarly significant effect, on contract or consent | Human intervention, the chance to express a view and to contest [9] | Contest channel; review log |
| UK GDPR Arts. 22A–22D | Controller | Significant decision based solely on automated processing | Information, representations, human intervention, contest [42] | Same, UK variant |
| AI Act Art. 13 | Provider (to deployers) | High-risk system | Instructions for use enabling deployers to interpret output [43] | Instructions for use; explanation-method card |
| AI Act Art. 86 | Deployer | Decision based on an Annex III system (except point 2) with legal or similarly significant adverse effect | Clear and meaningful explanation of the AI system's role and the main elements of the decision [44] | Explanation request workflow; explanation record |

### Credit: adverse-action notices and reason codes

US credit law is the oldest explanation regime and the most concrete. Regulation B requires the
reasons for adverse action to be specific and to indicate the principal reasons; saying only that
the applicant missed internal standards or a qualifying score is insufficient [31]. The official
commentary adds the engineering detail: more than four reasons is not likely to be helpful; reasons
must relate to and accurately describe the factors actually considered or scored; no principal
reason may be left out; and no single selection method is required, with two reference methods that
compare the applicant's score on each factor against average scores [57]. When the action rests on a
consumer report, the FCRA adds the credit score used and up to four key factors [41].

The CFPB's two circulars applying these duties to complex algorithms and to sample reason forms were
withdrawn on 12 May 2025 [45]; as of 2026-09-24 the regulation and its commentary still carry the
duty. So a **reason-code** service maps each principal factor the model actually used to a stable,
human-readable reason, versioned with the model, and a test shows that the reasons given for a
sample of denials match the factors that drove them. If the model is too complex for that test to
pass, the model is the problem, not the notice.

### Data protection: GDPR and the UK regime

The GDPR's articles do not use the words "right to explanation"; Recital 71 mentions obtaining "an
explanation of the decision reached", and Articles 13 to 15 require meaningful information about the
logic involved where Article 22 automated decision-making takes place [9]. The Court of Justice has
made that concrete. In *SCHUFA* (C-634/21, 7 December 2023) it held that generating a credit score
can itself be an Article 22(1) decision where a third party draws strongly on it [46], so the
scoring provider, not only the lender, can owe the safeguards. In *Dun & Bradstreet Austria*
(C-203/22, 27 February 2025) it held that the controller must explain the procedure and principles
actually applied, that a complex mathematical formula does not meet the duty, and that trade secrets
go to the authority or court for a case-by-case balance rather than justifying refusal [47]. The
Court added that, for profiling, the national court could find it sufficiently transparent and
intelligible to tell the data subject how far a variation in the personal data taken into account
would have led to a different result (para. 62) [47][48]: a counterfactual explanation in legal
language.

In the UK, the Data (Use and Access) Act 2025 replaced Article 22 with Articles 22A to 22D, which
treat a decision as solely automated where there is no meaningful human involvement and require
safeguards to inform the data subject, take representations, provide human intervention and allow
contest [42]. The ICO's co-badged guidance with The Alan Turing Institute on explaining AI decisions
is under review as a result as of 2026-09-24; its six explanation types (rationale, responsibility,
data, fairness, safety and performance, impact) remain a useful checklist [49]. In the EU, the
Commission's wider digital omnibus proposed rewriting Article 22; a first Council compromise dropped
that change, and as of 2026-09-24 the GDPR amendments are not adopted [50] (verify before relying on
the current text).

### The EU AI Act: Articles 13 and 86

The AI Act adds one duty upstream and one downstream. Article 13 requires high-risk systems to be
transparent enough for deployers to interpret the output and use it appropriately, with instructions
for use that are "relevant, accessible and comprehensible to deployers" and that cover the system's
technical capabilities to provide information relevant to explain its output, its performance for
the persons or groups on which it is intended to be used, and the technical measures that help
deployers interpret outputs [43]. The provider's artefact is an explanation-method card shipped with
the instructions: method, baseline, known limits, fidelity and group-level performance.

Article 86 gives a person subject to a deployer's decision based on an Annex III high-risk system
(except critical infrastructure, point 2), with legal or similarly significant adverse effects on
their health, safety or fundamental rights, the right to "clear and meaningful explanations of the
role of the AI system in the decision-making procedure and the main elements of the decision taken"
[44]. It applies only where Union law does not already provide the right [44], so GDPR Articles
15(1)(h) and 22 come first where they bite. Deployers must also tell people they are subject to the
system [51]. The Omnibus moved the main Annex III obligations to 2 December 2027 [10]; whether the
practical start of Article 86 tracks that date should be confirmed with counsel (verify). The build
need not wait: one explanation record, described below, serves Article 86, Article 15(1)(h) and an
adverse-action notice.

## Testing explanation quality

An explanation is an output, so it gets evals like any other output. Doshi-Velez and Kim's taxonomy
gives three levels of evidence, in rising cost: **functionally grounded** tests with no humans
(proxy metrics), **human-grounded** tests with lay people on simplified tasks, and
**application-grounded** tests with the real users on the real task [52]. A practical suite mixes
all three.

| Test | What it checks | Level | Example gate condition (illustrative) |
|---|---|---|---|
| **Fidelity** | The explanation reflects the model (NIST explanation accuracy [29]): deleting the top-attributed features changes the output more than deleting random ones | Functional | Deletion-curve area beats random by a set margin on the validation set |
| **Stability** | Near-identical inputs get near-identical explanations and reason codes | Functional | Top-k reason overlap above a threshold under small perturbations |
| **Sanity** | The explanation changes when the model is randomised [36] | Functional | Explanation similarity after weight randomisation below a threshold |
| **Manipulation resistance** | Off-manifold probing cannot hide a known bias [35] | Functional | Planted-bias test model is detected by the explanation method |
| **Reason-code consistency** | Reason codes match the factors that actually drove the decision [57] | Functional | 100% of sampled denials have reasons drawn from scored factors |
| **Counterfactual validity** | The suggested change flips the decision and uses only mutable features | Functional | All sampled counterfactuals valid and actionable |
| **Comprehension** | The intended audience can state the main reason and what they could change | Human-grounded | A majority of a test panel answers both questions correctly |
| **Decision support** | Reviewers with explanations decide better, not only faster, and are not led into automation bias | Application-grounded | Override accuracy with explanations at least equal to without |

The last two rows are the ones teams skip and the ones the law cares about: an explanation must be
**meaningful** to the person who receives it [29]. Test the notice with people like its recipients,
including people with low literacy in its language and people who use assistive technology, and keep
the protocol and results as evidence. For reviewers, pair this with [Designing human
oversight](/bok/the-stack#designing-human-oversight-article-14): an explanation that makes reviewers
agree faster with a wrong model is a control failure.

## Accessible explanations

An explanation that the recipient cannot perceive or understand fails the "meaningful" test whatever
its fidelity. The AI Act asks for instructions for use that are "relevant, accessible and
comprehensible to deployers" [43] and requires providers of high-risk systems to meet the EU
accessibility requirements of Directives (EU) 2016/2102 and 2019/882 [53]. WCAG 2.2 gives the
testable criteria for the digital channel [54]. In practice:

- **Text first.** Every attribution chart (a SHAP waterfall, a saliency map) has a text equivalent
  that states the main factors in words (WCAG success criterion 1.1.1, non-text content).
- **Never colour alone.** Positive and negative contributions are marked by sign and label, not only
  red and green (1.4.1, use of colour).
- **Plain language.** Reason codes are written for the recipient, not the data scientist; aim for a
  lower-secondary reading level where the audience is the public (3.1.5, reading level, a level AAA
  criterion used here as a target).
- **Layered detail.** A one-sentence reason, then the main factors, then how to contest, then the
  technical annex for those who ask.
- **More than one channel.** The same explanation is available on paper, by phone or in person for
  people who do not use the digital channel.

## Explanation artefacts as evidence records

An explanation delivered and not kept cannot be audited, reproduced or defended. The unit of
evidence is the [**explanation record**](/patterns/explanation-artefact): one structured object per explained decision, written at
decision time by the runtime (layer 04), keyed to the same registry id as every other artefact, and
retained by the obligation it serves.

> **Example (illustrative)** An explanation record for a declined device-financing application:
>
> ```json
> { "decision_id": "dfc-2026-09-18-004211", "subject": "credit-dfc@2026-09-01",
>   "outcome": "decline", "method": "treeshap", "method_version": "0.46",
>   "baseline": "bg-sample.v12", "fidelity_check": "pass",
>   "reason_codes": ["R07 debt-to-income", "R12 recent missed payments"],
>   "counterfactual": { "feature": "monthly_debt", "change": "-180", "result": "approve" },
>   "template": "adverse-action.en.v5", "audience": "applicant",
>   "delivered": "2026-09-18T10:02:13Z", "channel": "email+letter",
>   "contest_url_ref": "appeal-flow.v3" }
> ```

The record makes three things true. The explanation is reproducible, because the model version, the
method, its version and the baseline are pinned. It is checkable, because the reason codes can be
re-derived and compared. And it is reusable, because the same record answers a Regulation B notice,
an Article 15(1)(h) access request, an Article 86 request and an internal appeal. Explanation
records stream into layer 05 with the rest of the evidence, where an auditor can ask "show me every
decline in August whose reason codes differ from a fresh recomputation" and get a query, not a
project.

## Fairness and explainability in the stack

Both disciplines produce evidence at every layer. The table is the checklist; each row names the
artefact, not the aspiration.

| Layer | Fairness artefact | Explainability artefact | Pattern |
|---|---|---|---|
| **01 Govern-as-Code** | Fairness policy as data: protected attributes by jurisdiction, chosen metric and reason, thresholds, minimum cell size, approver | Explanation policy: required explanation types per use case, interpretable-by-default rule, reason-code limits | [Policy Card](/patterns/policy-card) |
| **02 Inventory & Transparency** | Data card with coverage per group and the Art. 4a basis; model card with disaggregated and intersectional metrics | Instructions for use and explanation-method card (method, baseline, fidelity, limits); AI-use notice | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) |
| **03 Evals & Red Teaming as Evidence** | [Fairness eval suite](/patterns/fairness-eval-suite): group metrics with intervals, intersectional slices, proxy scan, counterfactual flip test | Explanation eval suite: fidelity, stability, sanity, reason-code consistency, comprehension test | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **04 Runtime Controls & Observability** | Rolling selection rates and AIR by group; override and appeal rates by group | [Explanation record](/patterns/explanation-artefact) per decision; contest channel; RAG citation trace | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **05 Assurance & Continuous Compliance** | Fairness results and audit summaries as machine-readable evidence; LL144-style published summary | Explanation-request log with response times; periodic re-derivation checks | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |

Layer 03 is where both become controls, which is why the definition of done in [Layer
03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) applies unchanged: the suites are
versioned with the model, run in CI, emit structured results filed against the registry entry, and
fail the build when they fail. For procured models the same logic holds at the boundary: you can
still compute group metrics on a vendor system's outputs and test the explanations it returns, and
the [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) is
where you ask for the provider's own disaggregated results and explanation-method documentation (see
[Third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

The standards shelf for this work is short. NIST SP 1270 frames bias [2], NIST IR 8312 frames
explanation [29], and ISO/IEC TR 24027:2021 covers bias in AI systems and AI-aided decision making
[55]; it is referenced here by number only. ISO/IEC TS 6254:2025 (published September 2025) is the
SC 42 document on objectives and approaches for explainability and interpretability of
machine-learning models and AI systems [56]; it too is referenced here by number only. None of
these is a harmonised standard, and none confers a presumption of conformity with the AI Act (see
[the regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)).

### Gate conditions

A gate condition is a sentence the pipeline can evaluate. Illustrative conditions, each tied to a
policy value rather than a round number chosen for comfort:

- For every group and intersectional cell above the minimum size, the lower confidence bound of the
  AIR is at or above the policy floor and the gap in the chosen error metric is within its bound, or
  a signed justification is attached to the release.
- Cells below the minimum size are listed as "insufficient data"; none is reported as a pass.
- The proxy scan is below the policy limit, or every flagged feature has a recorded justification.
- The explanation method passes fidelity, stability and sanity checks; sampled reason codes come
  only from scored factors; sampled counterfactuals are valid and use only mutable features.
- The model card, explanation-method card and instructions for use were regenerated for this
  version.

An eval-gate result carries the metric, its interval and the policy it was judged against
(illustrative):

```json
{ "suite_id": "fairness.credit-dfc.v3", "model_version": "credit-dfc@2026-09-01",
  "metric": "approval_air", "group": "age_65_plus", "value": 0.86,
  "ci95": [0.81, 0.91], "floor": 0.80, "min_cell": 200, "n": 1840,
  "policy": "fairness-policy.credit.v2", "result": "pass" }
```

> **In practice (illustrative)** A telco that sells handsets on instalment plans runs a credit check
> at the point of sale, so every decline is a credit decision that owes the applicant its reasons.
> The first version used a gradient-boosted model and generated reason codes from SHAP values at
> request time. A reason-code consistency test found that for a slice of declines the top SHAP
> feature was an engineered interaction no notice could describe. The team trained a monotone
> scorecard as a baseline, found it within a small margin of the complex model on approval accuracy,
> and shipped the scorecard. The fairness eval then gated each release on the approval-rate AIR by
> age band with intervals, and every decline wrote an explanation record. The audit question "why
> was this customer declined, and was anyone like them treated differently?" became two queries.

**Maps to:** EU AI Act Art. 4a (special-category data for bias detection), Art. 10(2)(f)–(g),
10(3)–(4) (data and bias), Art. 13 (transparency to deployers), Art. 15(4) (feedback loops), Art.
26(11) (informing affected persons), Art. 86 (right to explanation) · GDPR Arts. 13–15, 22 · UK GDPR
Arts. 22A–22D · ECOA / Regulation B, FCRA · US Uniform Guidelines (29 CFR 1607.4(D)) · NYC Local Law
144 · NIST AI RMF (Measure 2.9, 2.11) · NIST SP 1270 · NIST IR 8312 · ISO/IEC TR 24027 · Layers
01–05. Mappings are illustrative, not a claim of conformity.

## What you can do this week

1. **Pick one decision system about people and write its fairness policy as data**: the protected
   attributes that apply, the metric you chose and why, the threshold, the minimum cell size and the
   approver. Commit it before you look at the next eval run.
2. **Run a proxy scan** on that system's features: train a model to predict the protected attribute
   from them and record the result in the data card, with the Art. 4a basis if you used
   special-category data.
3. **Add one intersectional fairness eval to CI** with confidence intervals and an "insufficient
   data" outcome, wired to the [Eval Gate in CI](/patterns/eval-gate-in-ci) so that it
   can fail the build.
4. **Emit an explanation record for every adverse decision** the system makes, with the model
   version, method, baseline and reason codes pinned, and test 10 of them for reason-code
   consistency.
5. **Put one notice in front of five people** like the ones who receive it and ask them to state the
   main reason and what they could change. Keep the answers as evidence and fix what they got wrong.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (transparency answers "what happened", explainability "how", interpretability "why"; MEASURE 2.9 and 2.11). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[2] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[3] "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle" (H. Suresh, J. Guttag; seven sources: historical, representation, measurement, aggregation, learning, evaluation, deployment; EAAMO 2021). arXiv 1901.10002. 2019-01-28. https://arxiv.org/abs/1901.10002 (verified: primary)
[4] "Dissecting racial bias in an algorithm used to manage the health of populations" (Z. Obermeyer, B. Powers, C. Vogeli, S. Mullainathan; Science 366(6464):447-453; cost as a proxy for need; 17.7% to 46.5%). Science (PubMed 31649194). 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance; 10(2)(f)-(g) examination for and mitigation of biases; 10(3)-(4) relevance, representativeness and setting; former 10(5) deleted and moved to Art. 4a by the Omnibus). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15(4) (systems that continue to learn must reduce the risk of biased outputs influencing input for future operations, "feedback loops"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[7] 42 U.S.C. § 2000e-2(k) and (l) (burden of proof in disparate-impact cases: job related and consistent with business necessity; less discriminatory alternative; (l) no adjusted scores or different cut-off scores by race, colour, religion, sex or national origin). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[8] Council Directive 2000/43/EC (Racial Equality Directive), Art. 2(2)(a)-(b) (direct and indirect discrimination). EUR-Lex. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[9] Regulation (EU) 2016/679 (GDPR), Arts. 9, 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). EUR-Lex. 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[10] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[11] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4a (processing of special categories of personal data for bias detection and correction: conditions (a)-(f) in para. 1; para. 2 for other AI systems and models and for deployers of high-risk systems; no obligation created; inserted by Reg. (EU) 2026/1744, in force 27 Jul 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[12] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[13] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[14] "DOJ Opinion Finds EEOC Disparate Impact Liability Guidelines Unconstitutional" (opinion addresses 29 CFR part 1607 and 1608; "helps to implement" Executive Order 14281; EEOC enforcement plan of 4 Jun 2026 prioritises disparate treatment; private and state-law disparate-impact claims remain). Ogletree Deakins. 2026-06-29. https://ogletree.com/insights-resources/blog-posts/doj-opinion-finds-eeoc-disparate-impact-liability-guidelines-unconstitutional/ (verified: secondary)
[15] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary; no specific action required; categories under 2% may be excluded). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[16] "Fairness Through Awareness" (C. Dwork, M. Hardt, T. Pitassi, O. Reingold, R. Zemel; individual fairness; limits of statistical parity). arXiv 1104.3913. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[17] "Equality of Opportunity in Supervised Learning" (M. Hardt, E. Price, N. Srebro; equalised odds, equal opportunity and post-processing adjustment). arXiv 1610.02413. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[18] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[19] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[20] Fairlearn user guide, "Fairness in machine learning" (allocation, quality-of-service and stereotyping harms; disparity metrics as ratios or differences). Fairlearn project. 2026. https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html (verified: primary)
[21] "Counterfactual Fairness" (M. Kusner, J. Loftus, C. Russell, R. Silva). arXiv 1703.06856. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[22] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[23] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[24] "Model Cards for Model Reporting" (M. Mitchell et al.; evaluation across demographic and intersectional groups; FAT* 2019). arXiv 1810.03993. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[25] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III (high-risk use cases: point 2 critical infrastructure; point 4 employment; point 5(a) public assistance benefits; point 5(b) creditworthiness and credit scoring, excluding financial-fraud detection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[26] "AI Fairness 360: An Extensible Toolkit for Detecting, Understanding, and Mitigating Unwanted Algorithmic Bias" (R. Bellamy et al.). arXiv 1810.01943. 2018-10-03. https://arxiv.org/abs/1810.01943 (verified: primary)
[27] "Fairlearn: Assessing and Improving Fairness of AI Systems" (H. Weerts et al.; fairness as a sociotechnical challenge). arXiv 2303.16626. 2023-03-29. https://arxiv.org/abs/2303.16626 (verified: primary)
[28] "Aequitas: A Bias and Fairness Audit Toolkit" (P. Saleiro et al.). arXiv 1811.05577. 2018-11-14. https://arxiv.org/abs/1811.05577 (verified: primary)
[29] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[30] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[31] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons; the official commentary is [57]). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[32] "A Unified Approach to Interpreting Model Predictions" (S. Lundberg, S.-I. Lee; SHAP). arXiv 1705.07874. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[33] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (M. T. Ribeiro, S. Singh, C. Guestrin; LIME). arXiv 1602.04938. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[34] "Axiomatic Attribution for Deep Networks" (M. Sundararajan, A. Taly, Q. Yan; integrated gradients; sensitivity and implementation invariance). arXiv 1703.01365. 2017-03-04. https://arxiv.org/abs/1703.01365 (verified: primary)
[35] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[36] "Sanity Checks for Saliency Maps" (J. Adebayo et al.; some saliency methods are independent of model and data). arXiv 1810.03292. 2018-10-08. https://arxiv.org/abs/1810.03292 (verified: primary)
[37] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (S. Wachter, B. Mittelstadt, C. Russell; Harvard Journal of Law & Technology, 2018). arXiv 1711.00399. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[38] "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (M. Turpin, J. Michael, E. Perez, S. R. Bowman; accuracy drops of up to 36% on 13 BIG-Bench Hard tasks). arXiv 2305.04388. 2023-05-07. https://arxiv.org/abs/2305.04388 (verified: primary)
[39] "Open Problems in Mechanistic Interpretability" (L. Sharkey et al.). arXiv 2501.16496. 2025-01-27. https://arxiv.org/abs/2501.16496 (verified: primary)
[40] "Evaluating Verifiability in Generative Search Engines" (N. F. Liu, T. Zhang, P. Liang; 51.5% of generated sentences fully supported by citations; 74.5% of citations support their sentence). arXiv 2304.09848. 2023-04-19. https://arxiv.org/abs/2304.09848 (verified: primary)
[41] 15 U.S.C. § 1681m(a) and § 1681g(f)(1) (duties of users taking adverse action on the basis of a consumer report; credit score, range and key factors, not more than four). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII.htm (verified: primary)
[42] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22A no meaningful human involvement; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and provision of information to deployers; 13(2) "relevant, accessible and comprehensible to deployers"; 13(3)(b)(iv), (v), (vii); 13(3)(d)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[44] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; Annex III except point 2; subsidiary to other Union law under 86(3)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[45] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms and Circular 2023-03 on adverse-action reasons and sample forms, both withdrawn 12 May 2025). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
[46] "CJEU's first ruling on Article 22 GDPR: 'credit scoring' is an automated decision" (C-634/21 SCHUFA, 7 Dec 2023; a probability value is an Art. 22(1) decision where a third party draws strongly on it). Cloisters. 2023-12-14. https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision (verified: secondary)
[47] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (paras. 58 to 62 and 74 to 76; Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation; for profiling, the effect of a variation in the personal data on the result can suffice (para. 62); trade secrets balanced case by case by the authority or court). Court of Justice of the EU (EUR-Lex). 2025-02-27. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0203 (verified: primary)
[48] "ECJ Ruling on Automated Decision-Making and Data Subject Access" (commentary on C-203/22: an explanation of how variations in the data might change the outcome). Clyde & Co. 2025-03. https://clydeco.com/en/insights/2025/03/ecj-ruling-on-automated-decision-making-and-data-s (verified: secondary)
[49] Explaining decisions made with AI (co-badged ICO and The Alan Turing Institute guidance; six explanation types; under review after the Data (Use and Access) Act). Information Commissioner's Office. consulted 2026-09-24. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/ (verified: primary)
[50] "The Digital Omnibus: a step back from the brink, but the risks remain" (first Council compromise drops the proposed rewrite of GDPR Art. 22; GDPR amendments still in negotiation). European Digital Rights (EDRi). 2026-03-17. https://edri.org/our-work/the-digital-omnibus-a-step-back-from-the-brink-but-the-risks-remain/ (verified: secondary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(11) (deployers of Annex III high-risk systems that make or assist decisions about natural persons must inform them). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[52] "Towards A Rigorous Science of Interpretable Machine Learning" (F. Doshi-Velez, B. Kim; application-grounded, human-grounded and functionally-grounded evaluation). arXiv 1702.08608. 2017-02-28. https://arxiv.org/abs/1702.08608 (verified: primary)
[53] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16(l) (providers of high-risk systems ensure accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[54] Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation; SC 1.1.1, 1.4.1, 3.1.5). W3C. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[55] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
[56] ISO/IEC TS 6254:2025, Information technology, Artificial intelligence: Objectives and approaches for explainability and interpretability of machine learning (ML) models and artificial intelligence (AI) systems (published, edition 1; referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2025-09. https://www.iso.org/standard/82148.html (verified: primary)
[57] 12 CFR Part 1002, Supplement I, Official Interpretations, comments 9(b)(2)-1 to -5 (more than four reasons not likely helpful; reasons must relate to and accurately describe the factors actually considered or scored; no principal reason left out; no single reason-selection method required, two reference methods against average scores). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/appendix-Supplement%20I%20to%20Part%201002 (verified: primary)
