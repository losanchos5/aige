---
id: claims-substantiation-gate
title: Claims Substantiation Gate
layer: 5
secondaryLayer: 3
order: 25
summary: "A claims register that ties each public statement about an AI system's accuracy, fairness or capability to the eval run behind it, and pulls stale claims."
---

# Pattern: Claims Substantiation Gate

**Summary:** Keep a register of every public statement about what an AI system does and how well:
accuracy, fairness, safety, autonomy, "AI-powered" capability. Each claim is a row that cites the eval
run supporting it, the population and conditions it was measured on, and the date. A gate blocks
publication of a claim without live evidence, and every model release reruns the cited evals and
flags any claim the new version no longer supports. It is an eval gate pointed at marketing copy,
sales material and the accuracy figures declared in the instructions for use.

## Objectives
Say only what the evidence supports, for the population the claim describes, and keep saying it only
while it stays true; and be able to show, for any claim, what supported it on the day it was made.

## Target users
AI governance engineer, product marketing, sales enablement, ML engineer, legal and consumer-law
counsel, investor relations.

## Impacted stakeholders
Customers and consumers, deployers who rely on the provider's figures, investors, consumer-protection
and financial regulators, market surveillance authorities.

## Relevant principles
Give every control teeth; instrument the build to produce its own proof; start from a named failure
mode or harm.

## Context
Product pages, sales decks, tenders, investor materials, model cards and instructions for use all say
how accurate, fair, safe or autonomous a system is. The copy is written once and owned by marketing;
the evidence is produced by ML and changes with every release. Regulators read that copy. The FTC's
Operation AI Comply announced that "there is no AI exemption from the laws on the books" [1]; its
Workado order followed a claim of 98% accuracy for an AI-content detector that testing put at 53% on
general-purpose content, and requires competent and reliable evidence for such claims [2]. The SEC
settled with two investment advisers over false and misleading statements about their use of AI [3].
Under the EU AI Act, the intended purpose itself is defined partly by the provider's "promotional or
sales materials and statements" (`Art. 3(12)`), and for high-risk systems the "levels of accuracy and
the relevant accuracy metrics" must be declared in the instructions for use (`Art. 15(3)`), stating
the level "against which the high-risk AI system has been tested and validated"
(`Art. 13(3)(b)(ii)`) [4].

## Problem
Claims outlive the evidence that once supported them, or never had any.

- **Forces.** Marketing wants a simple number; the honest number has an interval and a population.
  Evals are run on the data at hand, not on the population the claim describes: Workado's detector
  was trained on academic text, and the claim failed on everything else [2]. Vendor figures get
  repeated as if measured in-house. Deception, in the FTC's policy statement, is a representation,
  omission or practice likely to mislead a consumer acting reasonably, and material [5]; the EU's
  Unfair Commercial Practices Directive and the UK's Digital Markets, Competition and Consumers Act
  2024 prohibit unfair commercial practices in general terms [6] [7].
- **Failure mode.** A regression ships and the old accuracy claim stays on the website. A fairness
  claim rests on a vendor brochure. An authority asks what supported a statement made last year, and
  the only answer is the slide it appeared on.

## Solution
Register the claim, bind it to evidence, and gate both publication and release on the binding.

1. **Register every claim.** One row per claim: the exact text, every place it appears (URLs,
   documents, the instructions for use, the model card), the system and version, the metric, the
   claimed value, the owner and the status. "AI-powered" and "autonomous" are claims too: the row
   points at the registry entry that shows what the system actually does.
2. **Bind each claim to evidence.** The row cites the eval suite and run, the measured value with its
   interval, and the population and conditions of measurement. The AI RMF's test is the right one:
   performance "demonstrated for conditions similar to deployment setting(s)" (MEASURE 2.3), with the
   limits of generalisation documented (MEASURE 2.5) [8]. Substantiation rules run as code: the
   measurement population must match the claim's scope; a point figure is claimed only if the lower
   interval bound supports it; a comparative claim needs a paired comparison on the same data; a
   figure supplied by a vendor is marked provider-attested until re-measured.
3. **Gate publication.** Copy that carries a registered claim cannot be published, or sent in a
   tender, while the claim's evidence is missing, stale or failing. Unregistered quantitative claims
   are caught in review by the same rule that blocks unregistered systems.
4. **Gate the release.** Every model release reruns the cited suites. A claim whose evidence falls
   below the claimed value fails the release or opens a withdrawal task with a deadline and an owner;
   the declared accuracy in the instructions for use is regenerated from the same rows.
5. **Keep the history.** Withdrawn and amended claims keep their record (what was said, where, on
   which evidence, until when), so the organisation can show what it knew and when.

Illustrative claims-register row:

```json
{
  "claim_id": "CLM-2026-017",
  "text": "Catches 95% of card-not-present fraud",
  "locations": ["https://www.example.com/product/fraud-shield", "sales-deck-2026Q3#slide-4",
                "instructions-for-use/fraud-cnp/5.3#accuracy"],
  "system": "fraud-cnp@5.3.0",
  "metric": "recall on confirmed card-not-present fraud",
  "claimed_value": 0.95,
  "evidence": { "suite_id": "fraud.recall.cnp.v7", "run": "ci-run-99812", "value": 0.962,
                "ci95": [0.953, 0.970], "population": "EU card-not-present, 2026-Q2, n=4120 confirmed fraud",
                "timestamp": "2026-09-12T08:00:00Z" },
  "scope_match": "pass",
  "status": "substantiated",
  "owner": "product-marketing-fraud",
  "revalidate_on": ["model_release", "2026-12-31"]
}
```

> **Example (illustrative)** A fraud product's website claimed a detection rate measured two model
> versions earlier on one country's traffic. Registering the claim showed both gaps: the evidence was
> stale and the population narrower than the copy implied. The claim was rewritten to name the region,
> the next release reran the suite, and a later retrain that dipped below the claimed value opened a
> withdrawal task before the new model shipped.

## Consequences
Public statements become evidenced, scoped and dated, stale claims are pulled by the pipeline rather
than by a regulator, and the declared accuracy in the instructions for use stays consistent with
marketing. The costs: marketing and legal must accept a register and a review step; honest claims are
narrower and carry intervals; and the rule on scope-matching needs judgement for qualitative claims,
which stay with legal review.

## Related patterns
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Maps to:** EU AI Act Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3) · FTC Act s. 5 · Directive
2005/29/EC Art. 5 · DMCC Act 2024 s. 225 · ISO/IEC 42001 A.8.2, A.8.5 · NIST AI RMF (Measure 2.3,
2.5) · Layer 05 Assurance & Continuous Compliance / Layer 03 Evals & Red Teaming as Evidence.

Function and subcategory labels follow the NIST AI RMF [8]; ISO/IEC 42001 Annex A ids follow a
published crosswalk, not the standard's text [9]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; trained on academic text; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[3] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose incl. "promotional or sales materials and statements"; Art. 13(3)(b)(ii) level of accuracy, incl. its metrics, against which the system has been tested and validated; Art. 15(3) accuracy levels and metrics declared in the instructions for use (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[6] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[7] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3 performance "demonstrated for conditions similar to deployment setting(s)"; MEASURE 2.5 validity and reliability, limits of generalisability documented). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[9] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users, B.8.5 information for interested parties; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
