---
id: dataset-admission-gate
title: Dataset Admission Gate
layer: 1
secondaryLayer: 2
order: 21
summary: "A policy-as-code gate that lets a training, evaluation or retrieval job read only datasets with a complete, signed admission record for that use."
---

# Pattern: Dataset Admission Gate

**Summary:** Put a gate in front of every job that reads data to train, fine-tune, validate, test,
evaluate or build a retrieval index: the job may read a dataset version only if an admission record
exists for it, names the job's use case among its permitted uses, and shows that the rights, quality,
representativeness, bias and integrity checks passed or were waived by someone entitled to waive them.
The check is policy-as-code in the pipeline, so a missing field fails the run instead of a reminder
in a wiki.

## Objectives
Decide whether data may be used, and whether it is fit for the purpose, before a model learns from
it, because a quality problem can be fixed later and a rights or poisoning problem often cannot.

## Target users
AI governance engineer, data owners and stewards, ML platform team, privacy counsel, security
engineer.

## Impacted stakeholders
Data subjects and rightholders, people affected by the model's outputs (especially groups the data
under-represents), model owners, auditors and notified bodies.

## Relevant principles
Build the control at the earliest point it can block; give every control teeth; instrument the build
to produce its own proof.

## Context
Data platforms that let any team read any table they can reach, feature stores shared across models,
and training jobs launched from notebooks. For high-risk systems the EU AI Act turns data governance
into requirements: training, validation and testing sets must be subject to practices that cover,
among others, their origin, preparation, the "examination in view of possible biases" and
"appropriate measures to detect, prevent and mitigate possible biases" (`Art. 10(2)(f)` and `(g)`),
and must be "relevant, sufficiently representative, and to the best extent possible, free of errors
and complete in view of the intended purpose" (`Art. 10(3)`) [1]. After the Digital Omnibus, the
narrow basis for processing special categories of personal data to detect and correct bias sits in a
new `Art. 4a` [2].

## Problem
Data enters models through the path of least resistance, and the reasons it should not have are
discovered after training.

- **Forces.** Data scientists need data quickly and iterate often. The person who wants a dataset
  used should not be the only person who decides it may be. Rights, quality and bias checks sit with
  different owners. Unlawful processing at the development stage can affect the lawfulness of the
  model's later use: the EDPB said as much in its Opinion 28/2024 [3]. Training data is also an
  attack surface: ATLAS catalogues training data poisoning (`AML.T0020`) [4] and OWASP lists data and
  model poisoning as `LLM05:2026` [5].
- **Failure mode.** A model trains on data outside its consent scope, on a sample that misses the
  population it will serve, on labels nobody audited or on a snapshot someone altered. The problem
  surfaces in production or in an audit, and the fix is a retrain on data that should have been
  refused in the first place.

## Solution
Give every dataset version an admission record, and make every data-reading job present one.

1. **Write the admission record.** Per dataset version and per permitted pipeline, reuse the
   published [dataset admission record schema](/resources/templates#schema-dataset-admission-record)
   (`dataset-admission-record.v1`): the subject, the pipeline (training, fine-tuning, validation,
   testing, evaluation or retrieval index), the target system, the linked data card, the decision
   (admit, admit with conditions, reject), the checks with the obligation each enforces, the content
   hash of the admitted snapshot, the actor and a signature.
2. **Check rights first.** The lawful basis and purpose compatibility for personal data, the licence
   and the rights-reservation check come from the
   [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); a source without a ledger row
   fails admission.
3. **Check fitness for the purpose.** Quality measures (label accuracy, completeness, consistency,
   timeliness) on the vocabulary of the ISO/IEC 5259 series [6]; quantity per class and per group
   against the minimum cell sizes in the test plan; representativeness against the deployment
   population stated in the use-case record; a proxy and bias examination with the result recorded;
   and, where special-category data is used for bias detection, the `Art. 4a` conditions [2].
4. **Check integrity.** Admit a content-addressed, signed snapshot; re-verify the hash when the job
   reads it; run anomaly checks on new or appended data. ATLAS lists "Sanitize Training Data"
   (`AML.M0007`) and "Maintain AI Dataset Provenance" (`AML.M0025`) among its mitigations [4].
   Record provenance in W3C PROV terms (entities, activities and agents) [7] and emit lineage events
   (datasets, jobs and runs) so each training run names the admission records it read [8].
5. **Separate the duties.** The data owner is accountable and signs; the data steward operates the
   checks; a small review board settles contested admissions. The minimum checklist lives as code, so
   adding a check is a reviewed change.
6. **Enforce at read time.** The job presents its use-case id and target system; the policy denies
   the read unless the record admits that pipeline for that use. A human-readable datasheet travels
   with the record, covering motivation, composition, collection, preprocessing, uses, distribution
   and maintenance [9].
7. **Re-admit on change.** A new version, a new source, quality drift, a licence change, an erasure
   request or a new use case reopens admission.

The AI RMF asks that data collection and selection considerations (availability,
representativeness, suitability) are "identified and documented" (MAP 2.3) and that the legal risks of
third-party data are mapped (MAP 4.1) [10].

Illustrative admission record, valid against `dataset-admission-record.v1`:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json",
  "control_id": "data.admission.v2",
  "subject": "claims-2019-2025@v4",
  "pipeline": "training",
  "target_system": "fraud-triage@3.0.0",
  "dataset_card": "https://evidence.example.org/cards/claims-2019-2025/v4",
  "decision": "admit_with_conditions",
  "checks": [
    { "check_id": "ledger.rows_present", "requirement": "Training-data rights ledger", "result": "pass" },
    { "check_id": "lawful_basis.compatible", "requirement": "GDPR Art. 6(4)", "result": "pass",
      "detail": "compatibility assessment CA-2026-014" },
    { "check_id": "use_case.permitted", "requirement": "uc-fraud-triage-03", "result": "pass" },
    { "check_id": "quality.label_agreement", "requirement": "EU AI Act Art. 10(3)", "result": "pass",
      "detail": "0.91 inter-annotator agreement" },
    { "check_id": "representativeness.region", "requirement": "EU AI Act Art. 10(3)", "result": "waived",
      "detail": "islands region below minimum cell; waiver W-2026-007 signed by data owner" },
    { "check_id": "bias.examination", "requirement": "EU AI Act Art. 10(2)(f)-(g)", "result": "pass" },
    { "check_id": "integrity.snapshot_hash", "result": "pass" }
  ],
  "conditions": ["collect islands-region claims before the next retrain", "report the islands cell as insufficient data"],
  "input_hash": "sha256:3b7e9c2a41f08d6e5c1b2a9f7e3d4c5b6a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d",
  "actor": "ci-data-gate",
  "timestamp": "2026-09-20T10:12:00Z",
  "signature": "ed25519:Hk3v8QpZ2sL7dT4rW9xY1aB6cE0fG5jM"
}
```

> **Example (illustrative)** A fraud-triage team pointed a training job at the full claims warehouse.
> The gate refused it: the warehouse had no admission record for training, and two of its sources had
> no ledger row. The team admitted a narrower snapshot instead, with one representativeness check
> waived in writing and a condition to collect data for the missing region before the next retrain.
> The waiver and the condition now appear in the model card, and the next retrain cannot start until
> the condition is closed.

## Consequences
No model learns from data that was never admitted for its use; rights, quality and bias checks leave
evidence before training rather than explanations after it; and forward lineage can find every model
a bad dataset reached. The costs: the gate slows exploratory work unless a sandbox pipeline with its
own lighter admission exists; waivers need an owner and an expiry or they become the norm; and checks
are only as good as the thresholds behind them.

## Related patterns
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Fairness Eval Suite](/patterns/fairness-eval-suite); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [AI Threat Model](/patterns/ai-threat-model).

**Maps to:** EU AI Act Art. 10(2)–(4), Art. 4a · GDPR Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.2,
A.7.4, A.7.5, A.7.6 · NIST AI RMF (Map 2.3, 4.1) · OWASP LLM05:2026 · Layer 01 Govern-as-Code /
Layer 02 Inventory & Transparency.

Threat IDs follow the OWASP Top 10 for LLM Applications 2026 [5] and MITRE ATLAS [4]; function and
subcategory labels follow the NIST AI RMF [10]; ISO/IEC 42001 Annex A ids follow a published
crosswalk, not the standard's text [11]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 10 (data and data governance: 10(2)(f) examination in view of possible biases, 10(2)(g) measures to detect, prevent and mitigate them; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) setting of use) (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM05:2026 Data and Model Poisoning). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[7] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[8] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[9] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 2.3 data collection and selection considerations "identified and documented"; MAP 4.1 legal risks of components incl. third-party data). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[11] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.2 data for development and enhancement, B.7.4 quality of data, B.7.5 data provenance, B.7.6 data preparation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
