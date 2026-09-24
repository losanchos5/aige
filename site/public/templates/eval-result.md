# Template: Eval result (v1)

> Human template for the `eval-result` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/eval-result.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/eval-result.example.json
- **Evidences:** `EU AI Act Art. 15` · `EU AI Act Art. 9(8)` · `EU AI Act Art. 55` ·
  `ISO/IEC 42001 A.6` · `NIST AI RMF MEASURE 2.3` · `NIST AI RMF MEASURE 2.5`
- **Stack layer:** 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)
  - [Adversarial Red-Team Suite](https://aigovernanceengineer.com/bok/patterns#pattern-adversarial-red-team-suite)

The structured result of one eval suite run against one system version, filed against its registry
entry. Exactly the shape published in chapter 05 (suite_id, model_version, score, threshold, result,
timestamp), with optional fields for direction, failure mode and provenance.

## How to use it

- **Who fills it:** Emitted by the eval harness in CI; owned by the team that owns the suite.
- **When:** On every run of a gating suite: pre-merge, pre-release and on a schedule in production.
- **How it becomes evidence:** A `fail` blocks the pipeline. Each result is filed against
  `model_version` and rolls up into the test report and the go/no-go.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `suite_id` (required)

Versioned id of the eval suite (for example "injection-resistance.v4"). Evidences:
`EU AI Act Art. 15`.

Answer:

### `model_version` (required)

The system or model tested, as "id@version" from the registry. Format: `id@version`.

Answer:

### `score` (required)

The measured score. Format: number.

Answer:

### `threshold` (required)

The threshold the score is compared with, traced to a failure mode or obligation. Format: number.
Evidences: `EU AI Act Art. 9(8)`.

Answer:

### `result` (required)

Pass or fail against the threshold. A fail blocks the pipeline. One of: `pass`, `fail`.

Answer:

### `timestamp` (required)

When the run finished (RFC 3339). Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

Answer:

### `direction`

How the score compares with the threshold. One of: `higher_is_better`, `lower_is_better`.

Answer:

### `metric`

Name of the metric the score measures.

Answer:

### `failure_mode`

The failure mode or harm the suite tests for. Evidences: `NIST AI RMF MEASURE 2.6`.

Answer:

### `obligation`

The obligation the threshold traces to, if any (for example "EU AI Act Art. 15").

Answer:

### `sample_size`

Number of test cases in the run. Format: whole number.

Answer:

### `run_url`

Link to the run log. Format: URL.

Answer:

### `input_hash`

Digest of the suite and dataset snapshot used.

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
