# Template: Dataset card (v1)

> Human template for the `dataset-card` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/dataset-card.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/dataset-card.example.json
- **Evidences:** `EU AI Act Art. 10` · `EU AI Act Art. 4a` · `EU AI Act Art. 53(1)(d)` ·
  `GDPR Art. 6` · `GDPR Art. 9` · `ISO/IEC 42001 A.7` · `NIST AI RMF MAP 4.1`
- **Stack layer:** 02 Inventory & Transparency
- **Patterns:**
  - [AIBOM](https://aigovernanceengineer.com/bok/patterns#pattern-aibom)
  - [Model Card as Control Evidence](https://aigovernanceengineer.com/bok/patterns#pattern-model-card-as-control-evidence)

The card that travels with a dataset: what it contains, where it came from, the right to use it, how
representative it is, how it was checked and when it must be deleted. Datasheet-style documentation
made machine-readable.

## How to use it

- **Who fills it:** The data owner, with the data steward and the privacy office.
- **When:** Before the dataset is admitted to any training, evaluation or retrieval pipeline; update
  it on every new version.
- **How it becomes evidence:** The dataset admission gate reads this card; a dataset without a card,
  a lawful basis, a licence and a retention rule is not admitted.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `dataset_id` (required)

Stable dataset identifier.

Answer:

### `version` (required)

Dataset version or snapshot date.

Answer:

### `name` (required)

Human-readable name.

Answer:

### `owner` (required)

Data owner (accountable).

Answer:

### `steward`

Data steward (day-to-day custody).

Answer:

### `description` (required)

Why the dataset exists and what it is for.

Answer:

### `composition`

What the dataset contains. Evidences: `EU AI Act Art. 10`.

- `record_count`: Number of records. Format: whole number.
- `unit`: What one record is (for example "one loan application").
- `features`: Main fields or modalities. A list.
- `time_range`: Period the data covers.

### `collection`

How it was collected. Evidences: `EU AI Act Art. 10`.

- `method`: How the data was collected or generated (including synthetic data).
- `sources`: Upstream sources. A list.

### `provenance` (required)

Where it came from and how it was transformed. Evidences: `EU AI Act Art. 10` · `ISO/IEC 42001 A.7`.

- `upstream`: Links to upstream datasets or sources. A list. Each item: URL.
- `lineage`: Link to the lineage record (for example an OpenLineage or W3C PROV graph). Format: URL.
- `aibom_ref`: Where the dataset appears in the AIBOM.

### `personal_data`

Whether it contains personal data. Format: `true` or `false`.

Answer:

### `lawful_basis` (required)

Lawful basis for processing it for this purpose. One of: `consent`, `contract`, `legal_obligation`,
`vital_interests`, `public_task`, `legitimate_interests`, `not_personal_data`. Evidences:
`GDPR Art. 6`.

Answer:

### `special_category`

Special-category data and the condition relied on. Evidences: `GDPR Art. 9` · `EU AI Act Art. 4a`.

- `present` (required): Whether special-category data is present. Format: `true` or `false`.
- `condition`: The processing condition relied on.
- `bias_detection_only`: Processed only to detect and correct bias, pseudonymised and deleted once
  corrected. Format: `true` or `false`. Evidences: `EU AI Act Art. 4a`.

### `licence` (required)

The right to use the data. Evidences: `EU AI Act Art. 53(1)(c)` · `NIST AI RMF MAP 4.1`.

- `name` (required): Licence or contract that grants use (SPDX id where one exists).
- `allows_training` (required): Whether training use is permitted. Format: `true` or `false`.
- `tdm_opt_out_checked`: Whether text-and-data-mining reservations were checked for scraped content.
  Format: `true` or `false`.

### `representativeness`

Who the data does and does not represent. Evidences: `EU AI Act Art. 10`.

- `populations`: Populations the data covers. A list.
- `known_gaps`: Groups or conditions under-represented or missing. A list.

### `quality_checks`

Quality and bias checks run against this version. Evidences: `EU AI Act Art. 10` ·
`ISO/IEC 42001 A.7`.

Add one entry per item. Each entry has:

- `check` (required): Check name.
- `result` (required): Outcome. One of: `pass`, `fail`, `waived`.
- `run_at`: When it ran. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

### `intended_uses`

Uses the dataset is fit for. A list.

Answer:

### `prohibited_uses`

Uses it must not be put to. A list.

Answer:

### `splits`

Training, validation and test splits, if any. A list. Evidences: `EU AI Act Art. 10`.

Answer:

### `retention` (required)

When it must go. Evidences: `GDPR Art. 6`.

- `until`: Date the data must be deleted or reviewed. Format: date, `YYYY-MM-DD`.
- `rule` (required): The retention rule, as enforced in code.

### `extensions`

Organisation-specific fields. Validators ignore their content; keep evidence-bearing fields in the
core record.

Answer:

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
