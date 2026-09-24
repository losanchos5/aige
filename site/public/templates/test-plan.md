# Template: Test plan (v1)

> Human template for the `test-plan` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/test-plan.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/test-plan.example.json
- **Evidences:** `EU AI Act Art. 9(6)` · `EU AI Act Art. 9(8)` · `EU AI Act Art. 15` ·
  `EU AI Act Art. 60` · `ISO/IEC 42001 A.6` · `NIST AI RMF MEASURE 2.1` · `NIST AI RMF MEASURE 2.11`
- **Stack layer:** 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)
  - [Adversarial Red-Team Suite](https://aigovernanceengineer.com/bok/patterns#pattern-adversarial-red-team-suite)

What will be tested before a release and how the release will be judged: suites by category, each
with its metric, threshold and failure mode, set before testing starts.

## How to use it

- **Who fills it:** The validation lead, independent of the team that built the model where the risk
  tier requires it.
- **When:** Before testing starts. Thresholds do not move after results are in; a change is a new
  plan version.
- **How it becomes evidence:** Every suite id here reappears in eval results and in the test report,
  so an auditor can check that what was planned was run.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `plan_id` (required)

Identifier of the plan.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `design_record`

Id of the design record whose requirements the plan verifies.

Answer:

### `scope`

What is and is not tested, and why.

Answer:

### `categories`

Test categories covered. A missing category needs a reason in `scope`. One or more of: `capability`,
`robustness`, `adversarial`, `fairness`, `privacy`, `safety`, `security`, `explainability`,
`performance`, `regression`, `human_oversight`, `real_world`. Evidences: `NIST AI RMF MEASURE 2.1`.

Answer:

### `suites` (required)

Suites to run, each with its metric, threshold and failure mode. Evidences: `EU AI Act Art. 9(8)` ·
`NIST AI RMF MEASURE 2.3`.

Add one entry per item. Each entry has:

- `suite_id` (required): Versioned suite id; results are filed under it.
- `category` (required): Category. One of: `capability`, `robustness`, `adversarial`, `fairness`,
  `privacy`, `safety`, `security`, `explainability`, `performance`, `regression`, `human_oversight`,
  `real_world`.
- `metric` (required): Metric the suite measures.
- `threshold` (required): Threshold, fixed before testing.
- `direction`: Which way is good. One of: `higher_is_better`, `lower_is_better`.
- `failure_mode` (required): The failure mode or harm it guards against.
- `requirement`: Requirement id in the design record it verifies.
- `dataset`: Test dataset, as "dataset_id@version".
- `blocking` (required): Whether a failure blocks the release. Format: `true` or `false`.

### `environments`

Where tests run (for example CI, staging, shadow in production). A list.

Answer:

### `entry_criteria`

What must be true before testing starts. A list.

Answer:

### `exit_criteria` (required)

What must be true to recommend release. A list. Evidences: `EU AI Act Art. 9(8)`.

Answer:

### `real_world_testing`

Testing in real-world conditions, if any. Evidences: `EU AI Act Art. 60`.

- `planned` (required): Whether testing in real-world conditions is planned. Format: `true` or
  `false`.
- `plan`: Link to the real-world testing plan. Format: URL.
- `informed_consent_required`: Whether participants must give informed consent. Format: `true` or
  `false`.

### `owner` (required)

Role accountable for the plan.

Answer:

### `approved_by`

Role that approved the plan.

Answer:

### `approved_at`

Approval date. Format: date, `YYYY-MM-DD`.

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
