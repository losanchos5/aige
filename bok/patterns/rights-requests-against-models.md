---
id: rights-requests-against-models
title: Rights Requests Against Models
layer: 2
secondaryLayer: 5
order: 19
summary: "Route each data-subject request to every place the person's data sits, from source systems to model weights, and close it with a fulfilment record."
---

# Pattern: Rights Requests Against Models

**Summary:** Route each data-subject request (access, rectification, erasure, objection) to every
place the person's data sits in an AI system: source systems, training and fine-tuning snapshots,
retrieval indexes, prompt and output logs, eval sets and, where the model is not anonymous, the
weights. Each location has a pre-agreed response on a ladder from immediate deletion to scheduled
retraining, and the request closes with a fulfilment record that says what was done where, and when
the remaining gap closes.

## Objectives
Honour data-subject rights inside the deadline across the whole AI data estate, not only the
database, and be able to show per request which locations were reached, what was done in each and
which model versions still carry the person's data until the next retrain.

## Target users
DPO, AI governance engineer, data platform team, ML engineer.

## Impacted stakeholders
Data subjects, controllers and processors in the AI supply chain, supervisory authorities, model
owners.

## Relevant principles
Register and bound every actor before it acts; instrument the build to produce its own proof; build
the control at the earliest point it can block.

## Context
The GDPR gives people rights of access, rectification, erasure and objection, and the controller must
act on a request within one month, extendable by two further months for complex requests [1]. In an
AI system the person's data no longer sits in one table. Whether a trained model is anonymous is
assessed case by case: the EDPB's opinion on AI models sets out when a model trained on personal data
can be considered anonymous and what evidence the controller needs, and a model that fails the test
is in scope of the rights [2]. The CNIL's guidance adds that a controller that cannot identify a
person in a training set may say so, that the person may supply information that makes identification
possible, that retraining answers a request where the data is still held, and that output filters are
acceptable where retraining is disproportionate, if shown to be effective [3]. The Hamburg data
protection authority starts elsewhere, taking the view that storing a large language model is not
processing and that rights attach to the system's inputs and outputs [4]. A deployer has to work under
either reading.

## Problem
Request tooling built for databases stops at the CRM. The same person's record also sits in a
fine-tuning snapshot, a retrieval index, three months of prompt logs and an eval set, and a model
tuned on that snapshot can reproduce it. Without a map from the person to those locations, an erasure
closes on time and is still incomplete; without a record per location, nobody can say why output
suppression was chosen over retraining, or when the retrain that closes the gap will ship.

### Forces
- **Completeness against cost.** Deleting a row is cheap; retraining a large model for one request is
  not, so the response to the weights is usually staged.
- **Deadline against batch.** The one-month clock favours fast partial measures now and complete ones
  on a schedule.
- **Retention against erasure.** High-risk deployers keep automatically generated logs for at least six
  months unless other law provides otherwise [5], while storage limitation pushes the other way.
- **Verifiability.** Approximate unlearning methods are hard to verify, so a claim that a record's
  influence is gone needs a test, not an assertion.

## Solution
Treat the request as a fan-out job over a data map, and the model as one more location.

1. **A data map keyed by subject.** Build the map from lineage you already keep: data cards, dataset
   admission records and the [AIBOM](/patterns/aibom) say which snapshots fed which model version, and
   the registry says which indexes and logs each system writes. Keep a pseudonymous subject key so a
   request can be matched without copying identities into the map.
2. **One request, many handlers.** The router opens one ticket and fans it out to a handler per location,
   each with a pre-agreed response: delete from source systems and snapshots; delete or re-index
   retrieval chunks at once; delete or pseudonymise logs within the retention rule; replace eval records
   with synthetic ones; flag every model version trained on an affected snapshot.
3. **A ladder for the weights.** Output suppression first, as a filter built on general rules rather
   than a list of names, tested like any control. Then retraining without the data, on a schedule that
   batches requests. Machine unlearning only as a claim to test: exact methods such as sharded training
   limit what must be retrained [6], and a membership-inference test on the removed records checks the
   result [7].
4. **Gate the next release.** The release gate checks that pending erasures are applied to the training
   set of the candidate version, so a retrain cannot quietly reintroduce the data.
5. **A fulfilment record per request.** The workflow writes it, not the DPO: every location, the action
   taken, the model versions affected, the scheduled retrain and whether the deadline was met.

Illustrative fulfilment record for an erasure request against `csa-01`:

```json
{
  "request_id": "dsr-2026-0412",
  "right": "erasure",
  "subject_key": "hash:7c1e09b4",
  "received_at": "2026-09-02",
  "due_by": "2026-10-02",
  "locations": [
    { "store": "crm", "action": "deleted" },
    { "store": "rag_index:csa-kb@2026-09", "action": "deleted_and_reindexed" },
    { "store": "fine_tune_set:csa-ft-07", "action": "deleted" },
    { "store": "logs:csa-01", "action": "deleted" },
    { "store": "eval_set:csa-regression-v9", "action": "replaced_with_synthetic" },
    { "store": "weights:csa-01@2026-08-30", "action": "output_suppression", "rule": "dsr-0412" }
  ],
  "models_flagged": ["csa-01@2026-08-30"],
  "retrain_scheduled": "csa-01@2026-10-15",
  "closed_at": "2026-09-30",
  "within_deadline": true
}
```

> **Example (illustrative)** A customer asks a support assistant's operator to erase their data. The
> router finds the person in the CRM, a retrieval index, a fine-tuning snapshot and 90 days of logs.
> Four handlers delete within a day; the weights get an output filter, tested against the customer's
> own records, and the next scheduled retrain drops the snapshot. The fulfilment record goes to the
> customer's file and to the assurance store.

## Consequences
Requests close on time with evidence per location, and the gap between suppression and retraining is
visible and dated rather than hidden. The cost is lineage good enough to build the data map, handlers
for every store, and retraining capacity. Suppression filters leak under adversarial prompting, so they
are an interim measure with an expiry, not the answer.

## Related patterns
[AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Maps to:** GDPR Art. 12(3), Arts. 15–17, Art. 21 · EU AI Act Art. 26(6) · ISO/IEC 42001 A.7 · NIST
AI RMF MEASURE 2.10, GOVERN 1.1 · OWASP LLM02:2026 · Layer 02 Inventory & Transparency / Layer 05
Assurance & Continuous Compliance.

Threat ids follow the OWASP Top 10 for LLM Applications 2026 [8], control ids ISO/IEC 42001 Annex A
[9] and subcategory ids the NIST AI RMF [10]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 12(3) one month, extendable by two further months; Arts. 15, 16, 17, 21). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity test and evidence, paras 49–58). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[3] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[4] Discussion Paper: Large Language Models and Personal Data (storing an LLM is not processing; rights attach to system inputs and outputs). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[5] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(6) deployers keep automatically generated logs for at least six months, unless Union or national law provides otherwise). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[7] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[8] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[9] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.7 data for AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.1 legal and regulatory requirements understood, managed and documented; MEASURE 2.10 privacy risk examined and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
