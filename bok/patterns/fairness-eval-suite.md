---
id: fairness-eval-suite
title: Fairness Eval Suite
layer: 3
order: 22
summary: "A versioned fairness suite in CI: group and intersectional metrics with intervals, a proxy scan and a counterfactual test, judged against a policy fixed first."
---

# Pattern: Fairness Eval Suite

**Summary:** Version a fairness suite with the model and run it behind the eval gate: group and
intersectional metrics with confidence intervals, an "insufficient data" outcome for small cells, a
proxy scan and a counterfactual flip test, each judged against a fairness policy (metric, threshold,
minimum cell size, approver) written down before the run. The suite emits one structured result per
metric and slice, fails the build when the policy is not met, and runs again on live decisions so a
system that was fair at release cannot drift out of it unseen.

> **In short**
> The Fairness Eval Suite is an evaluation control that versions a fairness test suite with the
> model and runs it behind the eval gate, so a release that treats a group worse than the fairness
> policy allows does not ship. It solves fairness measured once, on the aggregate, with a metric
> picked after seeing the results, which hides the worst-served intersections. Use it for a system
> that allocates credit, jobs, housing, benefits or prices, or serves people with a quality that can
> differ by group. A policy written before the run fixes the metric, threshold, minimum cell size
> and approver. The suite computes group and intersectional metrics with confidence intervals,
> reports small cells as insufficient data, runs a proxy scan and a counterfactual flip test, and
> emits one result per metric and slice. The same metrics then run on live decisions. Its
> illustrative mappings include EU AI Act Art. 10(2)(f)–(g), 13(3)(b)(v) and 15(4), NYC Local Law
> 144, ISO/IEC TR 24027 and NIST AI RMF Measure 2.11.

## Objectives
Turn "is it fair?" into a small set of chosen, testable properties with consequences, so a release
that treats a group worse than the policy allows does not ship, and the evidence shows which metric
was chosen, why, and what it measured.

## Target users
AI governance engineer, ML engineer, data scientist, legal and equality counsel.

## Impacted stakeholders
People subject to the system's decisions, especially protected and intersectional groups, deployers,
model owners, auditors, equality bodies and regulators.

## Relevant principles
Start from a named failure mode or harm; give every control teeth; instrument the build to produce
its own proof.

## Context
A system that allocates something to people (credit, jobs, housing, benefits, prices) or serves them
with a quality that can differ by group (recognition, transcription, answers in a dialect). For
high-risk systems the EU AI Act requires the data to be examined "in view of possible biases" and
measures "to detect, prevent and mitigate" them (`Art. 10(2)(f)` and `(g)`), systems that keep
learning to address biased "feedback loops" (`Art. 15(4)`), and the instructions for use to state,
when appropriate, performance "regarding specific persons or groups of persons" (`Art. 13(3)(b)(v)`)
[1]. The AI RMF asks that fairness and bias "are evaluated and results are documented" (MEASURE
2.11) [2].

## Problem
Fairness is measured once, on the aggregate, with a metric picked after seeing the results.

- **Forces.** The common criteria conflict: when base rates differ between groups, a score cannot be
  calibrated and have equal error rates across groups at once [3], and the three conditions of
  calibration and balance for both classes cannot hold together except in highly constrained special
  cases [4]. So a metric must be chosen for the use case, and the choice is a decision with an owner.
  Aggregate numbers hide the intersections: the Gender Shades audit found error rates of up to 34.7%
  for darker-skinned women against a maximum of 0.8% for lighter-skinned men [5], and a classifier
  can look fair on every predefined group while failing structured subgroups [6]. Small cells make
  point estimates noisy. The legal weight of familiar thresholds moves: the four-fifths rule of the
  US Uniform Guidelines is a screen with statistical and practical-significance caveats [7], and in
  June 2026 the US Justice Department announced an opinion concluding that the EEOC's disparate-impact
  guidelines are unconstitutional [8].
- **Failure mode.** A dashboard marks 0.81 green and 0.79 red with no interval and no minimum
  sample; the worst-served intersection is averaged away; the release ships on a metric chosen
  because it passed; and production drift goes unmeasured because the test ran only at launch.

## Solution
Write the policy first, then build the suite that can fail against it.

1. **Fairness policy as data.** Per system: the protected attributes that apply in each jurisdiction
   and where their values come from, the chosen metric and the reason (selection-rate ratio for
   allocation, error-rate gaps for quality of service), the threshold, the minimum cell size, the
   multiple-comparison correction and the approver. Commit it before looking at the next run.
2. **Group and intersectional metrics with intervals.** Compute rates and ratios per group and per
   intersectional cell, each with a confidence interval, and judge the gate on the interval, not the
   point. Cells below the minimum report "insufficient data" and are listed, never counted as passes.
   Search for the worst slice as well as the listed ones.
3. **Proxy scan.** Train a model to predict the protected attribute from the features; a strong
   predictor flags proxies to justify or remove, and the result goes into the data card.
4. **Counterfactual flip test.** Change only the protected attribute, or for a language model swap
   identity terms in otherwise identical prompts, and measure how often the outcome or the answer
   quality changes.
5. **Lawful test data.** Where special-category data is needed for bias detection, use it only on
   the basis and under the conditions of `Art. 4a`, which the Digital Omnibus inserted in place of the
   old `Art. 10(5)` [9]; otherwise record how group membership was estimated and the error that adds.
6. **Gate and file.** Emit one structured result per metric and slice, reusing the published
   [eval result schema](/resources/templates#schema-eval-result) (`eval-result.v1`), file it against
   the registry entry and feed the disaggregated numbers into the model card. A failing cell fails
   the build unless a signed justification is attached to the release.
7. **Run it live.** Compute the same metrics on production decisions on a rolling window, with the
   same thresholds, so drift raises an alert before a complaint does. Where a regime requires
   publication, such as the independent bias audits of New York City's Local Law 144 with impact
   ratios across sex, race/ethnicity and intersectional categories [10], the suite's results are the
   input, not a separate exercise.

NIST SP 1270 is a useful frame for what the suite cannot see: bias is systemic and human as well as
statistical, and it is "not possible to achieve zero risk of bias" [11].

Illustrative result for one slice, valid against `eval-result.v1` (the interval and the policy travel
in `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/eval-result.v1.json",
  "suite_id": "fairness.credit-dfc.v3",
  "model_version": "credit-dfc@2026-09-01",
  "score": 0.81,
  "threshold": 0.80,
  "result": "pass",
  "timestamp": "2026-09-18T09:40:12Z",
  "direction": "higher_is_better",
  "metric": "approval adverse-impact ratio, lower 95% bound, age 65+ against age 35-49",
  "failure_mode": "older applicants declined at a disproportionate rate",
  "obligation": "EU AI Act Art. 10(2)(f)-(g)",
  "sample_size": 1840,
  "extensions": {
    "point_estimate": 0.86,
    "ci95": [0.81, 0.91],
    "reference_group": "age_35_49",
    "min_cell": 200,
    "policy": "fairness-policy.credit.v2",
    "insufficient_data_cells": ["age_65_plus x region_islands"]
  }
}
```

> **Example (illustrative)** A lender's suite judged approval rates by age band on the lower
> confidence bound of the adverse-impact ratio, with a minimum cell of 200. The first run passed every
> band on the point estimate and failed one on the bound; the second, on a larger frozen test set,
> passed it. One intersection stayed below the minimum cell, so the release notes list it as
> "insufficient data" and the data owner carries a condition to collect more before the next retrain.
> The same metrics now run weekly on live decisions.

## Consequences
Fairness claims become specific, reproducible and dated; the metric choice and its trade-offs are on
record; and small or intersectional groups are reported rather than averaged away. The costs:
lawful access to protected attributes is hard and sometimes impossible, so estimates carry error;
intervals widen with small samples, so suites need larger test sets; a passing suite does not prove
the system is fair outside what it measured; and the mitigation it prompts can itself be unlawful in
some settings, so fixes go to legal review with the evidence attached.

## Related patterns
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Explanation Artefact](/patterns/explanation-artefact);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Claims Substantiation Gate](/patterns/claims-substantiation-gate).

**Maps to:** EU AI Act Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4), Art. 4a · NYC Local Law
144 · 29 CFR 1607.4(D) · ISO/IEC 42001 A.5.4, A.6.2.4 · ISO/IEC TR 24027 · NIST AI RMF (Measure
2.11) · Layer 03 Evals & Red Teaming as Evidence.

Function and subcategory labels follow the NIST AI RMF [2]; ISO/IEC 42001 Annex A ids follow a
published crosswalk, not the standard's text [12]; ISO/IEC TR 24027 is referenced by identifier and
title only [13]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(f)-(g) examination for and mitigation of possible biases; Art. 13(3)(b)(v) performance regarding specific persons or groups in the instructions for use; Art. 15(4) feedback loops in systems that continue to learn (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.11 fairness and bias "evaluated and results are documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[4] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[5] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[6] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[7] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[8] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[11] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[12] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.4 assessing AI system impact on individuals and groups, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
[13] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
