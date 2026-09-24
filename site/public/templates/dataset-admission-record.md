# Template: Dataset admission record (v1)

> Human template for the `dataset-admission-record` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/dataset-admission-record.example.json
- **Evidences:** `EU AI Act Art. 10` · `ISO/IEC 42001 A.7` · `NIST AI RMF MAP 4.1` ·
  `NIST AI RMF MEASURE 2.1`
- **Stack layer:** 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)
  - [AIBOM](https://aigovernanceengineer.com/bok/patterns#pattern-aibom)

The verdict of the dataset admission gate: whether one dataset version may enter one pipeline, which
checks ran and who or what decided. Shaped like the evidence record in chapter 05 (control_id,
subject, decision, input_hash, actor, timestamp, signature).

## How to use it

- **Who fills it:** Emitted by the data pipeline; reviewed by the data steward when a check is
  waived.
- **When:** Every time a dataset version enters a training, evaluation or retrieval pipeline.
- **How it becomes evidence:** The record is itself the evidence: signed, hashed and filed against
  the dataset and the target system in the evidence store.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `control_id` (required)

The gate that decided (for example "data.admission.v1").

Answer:

### `subject` (required)

The dataset, as "dataset_id@version". Format: `id@version`.

Answer:

### `pipeline` (required)

The pipeline the dataset asks to enter. One of: `training`, `fine_tuning`, `validation`, `testing`,
`evaluation`, `retrieval_index`.

Answer:

### `target_system`

The system the pipeline builds, as "id@version". Format: `id@version`.

Answer:

### `dataset_card`

Link to the dataset card that was checked. Format: URL.

Answer:

### `decision` (required)

The gate's decision. One of: `admit`, `admit_with_conditions`, `reject`.

Answer:

### `checks` (required)

Checks the gate ran: card completeness, lawful basis, licence, quality and bias thresholds,
retention set. Evidences: `EU AI Act Art. 10`.

Add one entry per item. Each entry has:

- `check_id` (required): Check identifier.
- `requirement`: Obligation or policy the check enforces.
- `result` (required): Outcome. One of: `pass`, `fail`, `waived`.
- `detail`: Measured value or reason.

### `conditions`

Conditions attached to an admission. A list.

Answer:

### `input_hash`

Digest of the dataset snapshot that was checked.

Answer:

### `actor` (required)

The pipeline or role that ran the gate.

Answer:

### `timestamp` (required)

When the gate decided. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

Answer:

### `signature`

Detached signature over the record, prefixed with the algorithm (for example "ed25519:<base64>").
Makes the record tamper-evident in the evidence store.

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
