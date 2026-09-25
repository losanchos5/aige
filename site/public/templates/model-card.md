# Template: Model card (v1)

> Human template for the `model-card` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/model-card.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/model-card.example.json
- **Builder:** https://aigovernanceengineer.com/toolkit/model-card (renders a Hugging Face style
  card and a CycloneDX ML-BOM component from the same record)
- **Evidences:** `EU AI Act Art. 11` · `EU AI Act Annex IV` · `EU AI Act Art. 13` ·
  `EU AI Act Art. 53(1)(a)` · `EU AI Act Art. 53(1)(b)` · `ISO/IEC 42001 A.6` ·
  `ISO/IEC 42001 A.8` · `NIST AI RMF MAP 1.1` · `NIST AI RMF MEASURE 2.1`
- **Stack layer:** 02 Inventory & Transparency
- **Patterns:**
  - [Model Card as Control Evidence](https://aigovernanceengineer.com/bok/patterns#pattern-model-card-as-control-evidence)
  - [AIBOM](https://aigovernanceengineer.com/bok/patterns#pattern-aibom)

A model or system card as a record: what the model is, what it is for and not for, the data it was
built and tested on, how it performs across groups and conditions, its limits, and the links to the
rest of the technical file. The same record renders a Hugging Face style card and a CycloneDX ML-BOM
component, so the card an auditor reads is the card production produced.

## How to use it

- **Who fills it:** The model owner, with model validation for the evaluation fields and the AI
  governance engineer for the links to the technical file.
- **When:** Before release, for every version; the card is regenerated from the registry, the eval
  results and the AIBOM rather than edited by hand.
- **How it becomes evidence:** The release gate checks that a card exists for the version being
  released and that its evaluation fields point at the results of that version. A card is one part
  of the technical file, not the file: the risk management record, the declaration and the
  monitoring plan are linked, not copied.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `name` (required)

Model or system name, as the registry and the card title use it.

Answer:

### `version` (required)

Version the card describes (a semantic version, a date or a build id). One card per version.
Evidences: `EU AI Act Annex IV`.

Answer:

### `registry_id`

Registry id of the model or system (the id of its register entry), so the card files against it.

Answer:

### `developer` (required)

Organisation that developed the model and answers for the card (the provider, for the EU AI Act).
Evidences: `EU AI Act Art. 13(3)(a)`.

Answer:

### `contact`

Contact for questions about the model: a role mailbox or a support page, not a person. Evidences:
`EU AI Act Art. 13(3)(a)`.

Answer:

### `summary`

The model in one sentence.

Answer:

### `description`

What the model is and does, in a paragraph. Evidences: `EU AI Act Annex IV`.

Answer:

### `license`

Licence of the model weights or service, as an SPDX identifier where one exists (for example
"apache-2.0").

Answer:

### `languages`

Natural languages the model handles (ISO 639-1 codes where possible). A list.

Answer:

### `base_model`

The model it was fine-tuned or adapted from, if any.

Answer:

### `model_type`

Kind of model (for example "gradient-boosted trees" or "decoder-only transformer").

Answer:

### `task`

The task it performs (for example "binary classification" or "text generation").

Answer:

### `architecture_family`

Architecture family (for example "transformer" or "convolutional neural network"). Evidences: `EU AI
Act Annex IV`.

Answer:

### `architecture`

Specific architecture (for example "ResNet-50").

Answer:

### `learning_approach`

Overall learning approach, with the CycloneDX model card values. One of: `supervised`,
`unsupervised`, `reinforcement-learning`, `semi-supervised`, `self-supervised`.

Answer:

### `library`

Main library or framework the model is built with.

Answer:

### `tags`

Free tags for search and grouping. A list.

Answer:

### `repository`

Source repository or model hub page. Format: URL.

Answer:

### `paper`

Paper or technical report, if any. Format: URL.

Answer:

### `intended_uses`

Intended uses: the tasks and contexts the model is for. A list. Evidences: `EU AI Act Art. 13(3)(b)`
· `NIST AI RMF MAP 1.1`.

Answer:

### `users`

Intended users (roles, not names). A list. Evidences: `NIST AI RMF MAP 1.1`.

Answer:

### `downstream_use`

How the model may be integrated into other systems or fine-tuned, and on what terms. Evidences: `EU
AI Act Art. 53(1)(b)`.

Answer:

### `out_of_scope_uses`

Uses the model is not for, including reasonably foreseeable misuse. A list. Evidences: `EU AI Act
Art. 13(3)(b)`.

Answer:

### `datasets`

Datasets used to train, validate, test or fine-tune the model. Evidences: `EU AI Act Annex IV` ·
`ISO/IEC 42001 A.7`.

Add one entry per item. Each entry has:

- `name` (required): Dataset name or id (a dataset card id where one exists).
- `role`: What the dataset was used for. One of: `training`, `validation`, `testing`, `fine_tuning`,
  `other`.
- `url`: Link to the dataset or its data card. Format: URL.
- `description`: Provenance, scope and known gaps, in a sentence or two.

### `training_data`

Training data: sources, provenance, selection and known gaps. Evidences: `EU AI Act Annex IV` · `EU
AI Act Art. 13(3)(b)`.

Answer:

### `preprocessing`

Preprocessing, labelling and cleaning applied to the data.

Answer:

### `training_procedure`

Training procedure: methods, key design choices and the compute used. Evidences: `EU AI Act Annex
IV` · `EU AI Act Art. 53(1)(a)`.

Answer:

### `inputs`

Input formats the model accepts. A list. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `outputs`

Output formats the model produces. A list.

Answer:

### `evaluation_data`

Testing data: what it is and why it represents the intended use. Evidences: `NIST AI RMF MEASURE
2.1`.

Answer:

### `metrics`

Performance results, overall and by slice (group or condition). Evidences: `EU AI Act Art. 13(3)(b)`
· `NIST AI RMF MEASURE 2.1`.

Add one entry per item. Each entry has:

- `type` (required): Metric (for example "accuracy", "AUC" or "false positive rate").
- `value` (required): Result, as text so units and precision are kept.
- `slice`: Group or condition the result is for; empty for overall.
- `lower_bound`: Lower bound of the confidence interval.
- `upper_bound`: Upper bound of the confidence interval.
- `dataset`: Dataset the result was measured on.

### `metrics_rationale`

Why these metrics fit the intended purpose, and the thresholds they were held to. Evidences: `EU AI
Act Annex IV`.

Answer:

### `fairness_assessments`

Assessments of groups at risk: benefits, harms and the mitigation. Evidences: `NIST AI RMF MEASURE
2.11`.

Add one entry per item. Each entry has:

- `group_at_risk` (required): The group assessed.
- `benefits`: Expected benefits to the group.
- `harms`: Expected or observed harms to the group.
- `mitigation`: How the harms are mitigated.

### `limitations`

Known technical limitations, including conditions under which performance drops. A list. Evidences:
`EU AI Act Art. 13(3)(b)`.

Answer:

### `tradeoffs`

Performance trade-offs made on purpose. A list.

Answer:

### `ethical_considerations`

Risks to people and society, each with its mitigation. Evidences: `EU AI Act Art. 13(3)(b)`.

Add one entry per item. Each entry has:

- `name` (required): The risk or consideration.
- `mitigation`: How it is mitigated.

### `recommendations`

Recommendations for users and deployers.

Answer:

### `human_oversight`

Human oversight measures, including the technical measures that help people interpret the outputs.
Evidences: `EU AI Act Art. 13(3)(d)` · `EU AI Act Art. 14`.

Answer:

### `explainability`

What the system provides to explain its output. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `output_interpretation`

How to interpret the output and use it appropriately. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `predetermined_changes`

Changes to the model and its performance that were planned in advance, and how they are controlled.
Evidences: `EU AI Act Art. 13(3)(c)`.

Answer:

### `compute_and_lifetime`

Compute and hardware needed, expected lifetime, and maintenance and update measures. Evidences: `EU
AI Act Art. 13(3)(e)`.

Answer:

### `logging`

How logs are produced, collected, stored and read. Evidences: `EU AI Act Art. 13(3)(f)` · `EU AI Act
Art. 12`.

Answer:

### `cybersecurity`

Robustness and cybersecurity measures, and the attacks tested. Evidences: `EU AI Act Annex IV` · `EU
AI Act Art. 15`.

Answer:

### `environmental`

Environmental impact of training and operation. Evidences: `NIST AI RMF MEASURE 2.12`.

- `hardware`: Hardware type used for training.
- `hours`: Hours of training compute.
- `cloud_provider`: Cloud provider, if any.
- `region`: Compute region.
- `energy_kwh`: Known or estimated energy consumed in training, in kWh. Format: number.
- `co2_emitted`: Carbon emitted, with its unit and method (for example "120 kg CO2eq,
  location-based").

### `applicability`

Which documentation duties the card is read against. Drives the coverage checklist.

- `high_risk`: Part of a high-risk AI system under the EU AI Act (Art. 11 and Art. 13 apply). Format:
  `true` or `false`.
- `gpai`: A general-purpose AI model under the EU AI Act (Art. 53 applies). Format: `true` or `false`.

### `gpai`

For a general-purpose AI model: the Art. 53 documentation, by link.

- `technical_documentation`: Technical documentation of the model for the AI Office and national
  authorities (Annex XI). Format: URL. Evidences: `EU AI Act Art. 53(1)(a)`.
- `downstream_information`: Information and documentation for downstream providers (Annex XII).
  Format: URL. Evidences: `EU AI Act Art. 53(1)(b)`.
- `copyright_policy`: Policy to comply with Union copyright law. Format: URL. Evidences: `EU AI Act
  Art. 53(1)(c)`.
- `training_content_summary`: Public summary of the content used for training, on the AI Office
  template. Format: URL. Evidences: `EU AI Act Art. 53(1)(d)`.

### `links`

The rest of the technical file, by link: the card is one part of it.

- `instructions_for_use`: Instructions for use for deployers. Format: URL. Evidences: `EU AI Act Art.
  13`.
- `risk_management`: Risk management record or risk register. Format: URL. Evidences: `EU AI Act Annex
  IV`.
- `impact_assessment`: Impact assessment (AIIA, DPIA addendum or FRIA). Format: URL. Evidences:
  `ISO/IEC 42001 A.5`.
- `post_market_monitoring`: Post-market monitoring plan and performance evaluation. Format: URL.
  Evidences: `EU AI Act Annex IV`.
- `declaration_of_conformity`: EU declaration of conformity, where one exists. Format: URL. Evidences:
  `EU AI Act Annex IV`.
- `aibom`: The AIBOM the card is part of (for example a CycloneDX ML-BOM). Format: URL. Evidences: `EU
  AI Act Art. 11`.

### `standards_applied`

Harmonised standards or other specifications applied, in full or in part. A list. Evidences: `EU AI
Act Annex IV`.

Answer:

### `change_log`

Relevant changes since the previous version of the card. Evidences: `EU AI Act Annex IV`.

Answer:

### `last_updated`

When the card was last updated. Format: date, `YYYY-MM-DD`.

Answer:

### `extensions`

Organisation-specific fields. Validators ignore their content; keep evidence-bearing fields in the
core record.

Answer:

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
