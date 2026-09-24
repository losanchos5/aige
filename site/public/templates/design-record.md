# Template: Design record (v1)

> Human template for the `design-record` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/design-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/design-record.example.json
- **Evidences:** `EU AI Act Art. 9` · `EU AI Act Art. 11` · `EU AI Act Annex IV` ·
  `EU AI Act Art. 12` · `EU AI Act Art. 14` · `EU AI Act Art. 15` · `ISO/IEC 42001 A.6` ·
  `NIST AI RMF MAP 1.6` · `NIST AI RMF MAP 3.5`
- **Stack layer:** 01 Govern-as-Code · 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [Human-in-the-loop Gate](https://aigovernanceengineer.com/bok/patterns#pattern-human-in-the-loop-gate)
  - [Kill Switch / Circuit Breaker](https://aigovernanceengineer.com/bok/patterns#pattern-kill-switch--circuit-breaker)
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)

The design review of one AI system version: requirements traced to their source, the model-selection
trade-off, the oversight and logging designed in, and the metrics and thresholds the release will be
judged on.

## How to use it

- **Who fills it:** The engineering lead writes it; model risk, security, privacy and the AI
  governance engineer review it.
- **When:** Before building a new system or a major version; update it when requirements or
  thresholds change.
- **How it becomes evidence:** Each requirement names the test that verifies it, so the test report
  closes the trace. The record feeds the technical documentation.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `record_id` (required)

Identifier of this design record.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `use_case_record`

Id of the use-case record it implements.

Answer:

### `requirements` (required)

Requirements, each traced to its source and to the test that verifies it. Evidences:
`NIST AI RMF MAP 1.6` · `EU AI Act Annex IV`.

Add one entry per item. Each entry has:

- `id` (required): Requirement id.
- `statement` (required): The requirement, testable ("the system shall ...").
- `source` (required): Where it comes from: an obligation, the use-case record or a risk.
- `verified_by`: Test suite or check that verifies it.

### `architecture_summary`

The architecture in a paragraph, with a link to the diagram. Evidences: `EU AI Act Annex IV`.

Answer:

### `model_selection`

The model-selection trade-off. Evidences: `EU AI Act Annex IV`.

- `candidates`: Options considered, including simpler or interpretable ones. A list.
- `selected` (required): The option chosen.
- `tradeoffs` (required): Why: accuracy, interpretability, cost, latency, data needs.

### `human_oversight_design` (required)

Oversight designed in, not asserted. Evidences: `EU AI Act Art. 14` · `NIST AI RMF MAP 3.5`.

- `mode` (required): Oversight mode. One of: `human_in_the_loop`, `human_on_the_loop`,
  `human_in_command`, `none`.
- `intervention_points` (required): Where a person can intervene, override or stop. A list.
- `reviewer_context`: What the reviewer sees to be able to disagree (guards against automation
  bias).
- `override_logged`: Whether every override is logged as evidence. Format: `true` or `false`.

### `controls_designed_in`

Controls built into the design. One or more of: `kill_switch`, `rollback`, `shadow_mode`, `canary`,
`rate_limit`, `input_guardrail`, `output_guardrail`, `human_approval`, `audit_logging`. Evidences:
`EU AI Act Art. 15` · `NIST AI RMF MANAGE 2.4`.

Answer:

### `logging_design`

Automatic event logging over the system's lifetime. Evidences: `EU AI Act Art. 12`.

- `events` (required): Events logged automatically. A list.
- `retention_days` (required): Retention of the logs, in days. Format: whole number.

### `metrics_and_thresholds` (required)

Metrics and thresholds, set before testing, each traced to a failure mode. Evidences:
`EU AI Act Art. 9(8)` · `EU AI Act Art. 15`.

Add one entry per item. Each entry has:

- `metric` (required): Metric.
- `threshold` (required): Threshold the release must meet.
- `failure_mode` (required): The failure mode or harm the threshold guards against.

### `known_limitations`

Known limitations, carried into the instructions for use. A list. Evidences:
`EU AI Act Art. 13(3)(b)`.

Answer:

### `reviews` (required)

Design review sign-offs by role (for example security, privacy, governance). Evidences:
`ISO/IEC 42001 A.6`.

Add one entry per item. Each entry has:

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `decision` (required)

Outcome of the design review. One of: `approved`, `approved_with_conditions`, `rework`.

Answer:

### `decided_at`

Date of the decision. Format: date, `YYYY-MM-DD`.

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
