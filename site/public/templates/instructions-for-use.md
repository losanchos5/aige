# Template: Instructions for use (v1)

> Human template for the `instructions-for-use` JSON Schema. Fill it in as a document, or produce
> the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/instructions-for-use.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/instructions-for-use.example.json
- **Evidences:** `EU AI Act Art. 13` · `EU AI Act Art. 13(3)` · `EU AI Act Art. 26(1)` ·
  `ISO/IEC 42001 A.8` · `NIST AI RMF MAP 2.2`
- **Stack layer:** 02 Inventory & Transparency
- **Patterns:**
  - [Model Card as Control Evidence](https://aigovernanceengineer.com/bok/patterns#pattern-model-card-as-control-evidence)

The information a provider gives deployers so they can use a high-risk system correctly, one field
per element the EU AI Act lists for instructions for use. Generated from the register entry, design
record and test report, then reviewed.

## How to use it

- **Who fills it:** The provider writes it; for an in-house system, the team that builds the model
  writes it for the teams that deploy it.
- **When:** Before first deployment and on every release that changes purpose, performance or
  oversight.
- **How it becomes evidence:** Generate the draft from the register entry, design record and test
  report so the numbers match the evidence; the deployer's deployment decision record links the
  version it relied on.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `document_id` (required)

Identifier of this version of the instructions.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `provider` (required)

Who provides the system. Evidences: `EU AI Act Art. 13(3)(a)`.

- `name` (required): Provider name.
- `contact` (required): Contact point.
- `authorised_representative`: Authorised representative, where applicable.

### `intended_purpose` (required)

The intended purpose and context of use. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `performance` (required)

Declared accuracy, robustness and cybersecurity. Evidences: `EU AI Act Art. 13(3)(b)` ·
`EU AI Act Art. 15`.

- `accuracy` (required): Declared accuracy metrics.
  Each entry has:
  - `metric` (required): Metric.
  - `value` (required): Declared value.
  - `conditions`: Conditions it was measured under.
- `robustness`: Robustness tested against, and its limits.
- `cybersecurity`: Cybersecurity measures and residual exposure.
- `circumstances_affecting_performance`: Known or foreseeable circumstances that change performance.
  A list.

### `known_risks` (required)

Known or foreseeable risks to health, safety or fundamental rights, including from foreseeable
misuse. A list. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `explanation_capabilities`

What the system can provide to explain its output. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `performance_by_group`

Performance for specific persons or groups, where relevant. Evidences: `EU AI Act Art. 13(3)(b)`.

Add one entry per item. Each entry has:

- `group` (required): Group of persons.
- `note` (required): How performance differs, or "no material difference found".

### `input_data_specifications`

What input data the system expects, and data it must not receive. Evidences:
`EU AI Act Art. 13(3)(b)`.

Answer:

### `training_data_information`

Relevant information on training, validation and test data. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `output_interpretation`

How to interpret the output and use it appropriately. Evidences: `EU AI Act Art. 13(3)(b)`.

Answer:

### `predetermined_changes`

Changes to the system and its performance that were pre-determined at the initial conformity
assessment. A list. Evidences: `EU AI Act Art. 13(3)(c)`.

Answer:

### `human_oversight_measures` (required)

Oversight measures, including technical measures that help deployers interpret outputs. Evidences:
`EU AI Act Art. 13(3)(d)` · `EU AI Act Art. 14`.

Answer:

### `resources_and_maintenance`

Resources, lifetime and maintenance. Evidences: `EU AI Act Art. 13(3)(e)`.

- `compute_and_hardware`: Computational and hardware resources needed.
- `expected_lifetime`: Expected lifetime of the system.
- `maintenance`: Maintenance and care, including software updates.

### `logging`

How deployers collect, store and interpret the logs. Evidences: `EU AI Act Art. 13(3)(f)` ·
`EU AI Act Art. 12`.

Answer:

### `issued` (required)

Date this version was issued. Format: date, `YYYY-MM-DD`.

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
