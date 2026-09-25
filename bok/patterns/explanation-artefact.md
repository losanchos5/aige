---
id: explanation-artefact
title: Explanation Artefact
layer: 4
secondaryLayer: 5
order: 23
summary: "One explanation record per consequential decision, with pinned model, method and reason codes, tested for fidelity and reused for every explanation duty."
---

# Pattern: Explanation Artefact

**Summary:** For every consequential decision a system makes or supports about a person, write one
structured **explanation record** at decision time: the model version, the explanation method with
its version and baseline, the reason codes drawn from the factors the model actually scored, a valid
counterfactual where one helps, the notice template and the contest route. Test the explanations for
fidelity in CI, keep the records in the evidence store, and answer every explanation duty (an
adverse-action notice, a data-subject access request, an AI Act explanation request, an internal
appeal) from the same record.

> **In short**
> The Explanation Artefact is a runtime control that writes one structured explanation record for
> every consequential decision an AI system makes or supports about a person. It solves explanations
> that are generated on the fly, sent and forgotten: nobody can reproduce what a customer was told
> once the model, method or baseline has changed, and reason codes can name factors the model did
> not use. Use it where a system declines, prices, ranks, flags or scores people and someone will
> ask why. Each record pins the model version, the explanation method with its version and baseline,
> reason codes drawn from scored factors, the notice template and the contest route. An explanation
> suite in CI tests fidelity, stability, sanity and reason-code consistency, and the same record
> answers an adverse-action notice, an access request, an AI Act explanation request or an appeal.
> Its illustrative mappings include EU AI Act Art. 86 and 13(3)(b)(iv), GDPR Art. 15(1)(h) and 22,
> Regulation B and NIST AI RMF Measure 2.9.

## Objectives
Make every explanation reproducible, checkable and reusable: reproducible because what produced it is
pinned, checkable because its reasons can be recomputed and compared, and reusable because one record
serves several legal and internal duties instead of each team writing its own letter.

## Target users
AI governance engineer, ML engineer, product and operations teams that send notices, privacy and
consumer-law counsel.

## Impacted stakeholders
People subject to decisions and their representatives, operators and reviewers who rely on the
explanation, deployers, auditors, data protection and market surveillance authorities.

## Relevant principles
Instrument the build to produce its own proof; give every control teeth; start from a named failure
mode or harm.

## Context
A system that declines, prices, ranks, flags or scores people, where the person, an operator or an
authority will ask why. The duties overlap. Under the EU AI Act, a person subject to a decision taken
by a deployer on the basis of the output of an Annex III high-risk system (except point 2), with
legal or similarly significant adverse effects, has the right to obtain "clear and meaningful
explanations of the role of the AI system in the decision-making procedure and the main elements of
the decision taken" (`Art. 86(1)`); deployers must inform people that they are subject to such a
system (`Art. 26(11)`); and the instructions for use must describe, where applicable, the system's
capabilities "to provide information that is relevant to explain its output" (`Art. 13(3)(b)(iv)`)
[1]. The GDPR gives data subjects meaningful information about the logic involved in automated
decisions (`Art. 15(1)(h)`, `Art. 22`) [2], which the Court of Justice read in C-203/22 as an
explanation of "the procedure and principles actually applied" [3]. In US credit, Regulation B
requires the specific principal reasons for adverse action, and they must relate to the factors
actually considered or scored [4].

## Problem
Explanations are generated on the fly, sent and forgotten.

- **Forces.** Post-hoc attribution methods can diverge from the model they explain, and they can be
  manipulated: a biased classifier can be wrapped so that LIME and SHAP report innocuous features
  [5]. Reasons written for the data scientist do not help the recipient. Each duty has its own
  audience and wording. Where stakes are high, an interpretable model can be its own explanation, and
  Rudin argues it should be preferred to explaining a black box after the fact [6].
- **Failure mode.** Nobody can reproduce the explanation a customer received last year, because the
  model, the method or the baseline changed. Reason codes name factors the model did not use. Every
  access request and every appeal becomes a forensic project, and the organisation cannot show that
  its explanations were accurate.

## Solution
Treat the explanation as an artefact with a schema, a test and a retention rule.

1. **Decide the explanation per use case.** An explanation policy (layer 01) states, per use case, the
   explanation types required (reason codes, a counterfactual, source citations for retrieval-based
   answers, a description of the procedure and principles applied), the audience and language, the
   method allowed, and whether an interpretable model is required.
2. **Write the record at decision time.** The runtime (layer 04) writes one record per explained
   decision, keyed to the registry id and the decision id: model version; method, version and
   baseline; whether the output was determinative or advisory; reason codes from scored factors,
   ranked; a counterfactual that changes only mutable features, where helpful; the notice template,
   language, channel and delivery time; and the contest route. Pinning the method and baseline is what
   makes the record reproducible.
3. **Test the explanations.** In CI (layer 03), an explanation suite checks fidelity (the reasons
   predict the model's behaviour), stability (near-identical inputs get near-identical reasons),
   sanity (the method is sensitive to the model and the data) and reason-code consistency (every
   sampled reason is a scored factor). NIST names "explanation accuracy" as one of four principles of
   explainable AI [7]. Recompute a sample of stored records against the pinned model to catch drift or
   tampering.
4. **Reuse the record.** The same record renders the adverse-action notice, answers an access request
   and an `Art. 86` request, and gives a human reviewer the context for an appeal. In the UK, the
   safeguards for significant automated decisions include information about the decision, the chance
   to make representations, human intervention and a way to contest it [8]; the record carries what
   each of those steps needs.
5. **Retain and query.** Records stream into the evidence store (layer 05) with a retention period
   set by the longest obligation they serve. Appeals and their outcomes are logged against the record
   and counted by group, which feeds the fairness monitoring.

The AI RMF asks that "the AI model is explained, validated, and documented" and its output
"interpreted within its context" (MEASURE 2.9), and that transparency and accountability risks are
"examined and documented" (MEASURE 2.8) [9].

Illustrative explanation record for a declined credit-limit increase:

```json
{
  "record_id": "exp-2026-09-21-118204",
  "decision_id": "cl-2026-09-21-118204",
  "subject": "credit-limit@4.2.1",
  "registry_id": "clm-07",
  "outcome": "limit_increase_declined",
  "decision_role": "determinative",
  "method": { "name": "treeshap", "version": "0.46", "baseline": "bg-sample.v14" },
  "fidelity_suite": { "suite_id": "explain.fidelity.v2", "result": "pass" },
  "reason_codes": [
    { "code": "R07", "text": "Debt-to-income ratio too high", "factor": "dti", "rank": 1 },
    { "code": "R12", "text": "Recent missed payments", "factor": "missed_payments_6m", "rank": 2 }
  ],
  "counterfactual": { "feature": "monthly_debt", "change": "-150", "result": "approve", "mutable_only": true },
  "notice": { "template": "adverse-action.en.v6", "language": "en", "channel": "app+letter",
              "delivered": "2026-09-21T10:04:51Z" },
  "contest_route": "appeal-flow.v3",
  "retention_until": "2031-09-21"
}
```

> **Example (illustrative)** A handset retailer's credit check generated reason codes from SHAP
> values at request time. A reason-code consistency test found that, for a slice of declines, the top
> factor was an engineered interaction no notice could describe in plain words. The team moved to a
> monotone scorecard within a small margin of the complex model, pinned the method in the record, and
> now answers "why was this customer declined?" with the stored record and a fresh recomputation side
> by side.

## Consequences
Explanations become evidence: reproducible, testable and reusable across duties, with their accuracy
checked rather than assumed. The costs: storage and retention for a record per decision; an
explanation suite to maintain alongside the model; plain-language templates that need testing with
real recipients; and, for complex models, the risk that no faithful explanation is simple enough,
which is a design finding, not a documentation one.

## Related patterns
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Maps to:** EU AI Act Art. 86, Art. 26(11), Art. 13(3)(b)(iv) · GDPR Art. 15(1)(h), Art. 22 ·
Regulation B (12 CFR 1002.9) · ISO/IEC 42001 A.8.2 · NIST AI RMF (Measure 2.8, 2.9) · Layer 04
Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Function and subcategory labels follow the NIST AI RMF [9]; ISO/IEC 42001 Annex A ids follow a
published crosswalk, not the standard's text [10]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 86(1) right to explanation of individual decision-making (Annex III systems except point 2); Art. 26(11) deployers inform natural persons subject to Annex III systems; Art. 13(3)(b)(iv) capabilities to provide information relevant to explain the output (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2016/679 (GDPR), Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[3] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation). JuLIA project case-law database. 2025-02-27. https://www.julia-project.eu/database/case-law/319 (verified: secondary)
[4] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons) and Supplement I, comment 9(b)(2) (reasons must relate to factors actually considered or scored). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[5] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[6] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[7] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[8] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.8 transparency and accountability risks "examined and documented"; MEASURE 2.9 model "explained, validated, and documented" and output "interpreted within its context"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
