# Template: Test report (v1)

> Human template for the `test-report` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/test-report.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/test-report.example.json
- **Evidences:** `EU AI Act Annex IV(2)(g)` · `EU AI Act Art. 9(8)` · `EU AI Act Art. 15` ·
  `ISO/IEC 42001 A.6` · `NIST AI RMF MEASURE 2.3` · `NIST AI RMF MEASURE 2.13`
- **Stack layer:** 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)
  - [Adversarial Red-Team Suite](https://aigovernanceengineer.com/bok/patterns#pattern-adversarial-red-team-suite)

The dated, signed report of a test campaign: the eval results against the plan, deviations and
waivers, and the conclusion the go/no-go reads.

## How to use it

- **Who fills it:** The validation lead signs it; the go/no-go reviewers read it.
- **When:** At the end of each test campaign, before the go/no-go.
- **How it becomes evidence:** Dated and signed by the responsible role, with every planned suite
  accounted for as a result, a deviation or a waiver.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `report_id` (required)

Identifier of the report.

Answer:

### `test_plan` (required)

Id of the test plan executed.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `period`

When testing ran.

- `from` (required): First day of testing. Format: date, `YYYY-MM-DD`.
- `to` (required): Last day of testing. Format: date, `YYYY-MM-DD`.

### `environment`

Where it ran.

Answer:

### `results` (required)

The eval results, one per planned suite. Evidences: `EU AI Act Annex IV(2)(g)`.

Add one entry per item. Each entry has:

- `suite_id` (required): Versioned id of the eval suite (for example "injection-resistance.v4").
  Evidences: `EU AI Act Art. 15`.
- `model_version` (required): The system or model tested, as "id@version" from the registry. Format:
  `id@version`.
- `score` (required): The measured score. Format: number.
- `threshold` (required): The threshold the score is compared with, traced to a failure mode or
  obligation. Format: number. Evidences: `EU AI Act Art. 9(8)`.
- `result` (required): Pass or fail against the threshold. A fail blocks the pipeline. One of:
  `pass`, `fail`.
- `timestamp` (required): When the run finished (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).

### `summary`

Counts.

- `passed` (required): Suites passed. Format: whole number.
- `failed` (required): Suites failed. Format: whole number.
- `waived` (required): Suites waived. Format: whole number.

### `deviations`

Deviations from the plan and any waivers.

Add one entry per item. Each entry has:

- `suite_id` (required): Suite affected.
- `description` (required): What deviated from the plan.
- `waiver_approved_by`: Role that approved a waiver, if any.
- `waiver_expires`: When the waiver lapses. Format: date, `YYYY-MM-DD`.

### `open_issues`

Defects or risks still open. A list.

Answer:

### `conclusion` (required)

Conclusion against the plan's exit criteria. One of: `meets_exit_criteria`, `meets_with_waivers`,
`does_not_meet`.

Answer:

### `signed_off` (required)

Sign-off by the responsible role, dated and signed. Evidences: `EU AI Act Annex IV(2)(g)`.

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `evidence`

Links to logs and artefacts. A list. Each item: URL.

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
