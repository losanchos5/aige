# Template: Go/no-go decision (v1)

> Human template for the `go-no-go` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/go-no-go.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/go-no-go.example.json
- **Evidences:** `EU AI Act Art. 9` · `EU AI Act Art. 17` · `EU AI Act Art. 43` ·
  `ISO/IEC 42001 A.6` · `NIST AI RMF MANAGE 1.1` · `NIST AI RMF MANAGE 1.4`
- **Stack layer:** 03 Evals & Red Teaming as Evidence · 05 Assurance & Continuous Compliance
- **Patterns:**
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)
  - [Human-in-the-loop Gate](https://aigovernanceengineer.com/bok/patterns#pattern-human-in-the-loop-gate)

The release gate for one system version: a checklist whose items name the obligation they evidence
and the record that proves them, the reviewers' decisions by role, any overrides, and the rollout
and rollback plan.

## How to use it

- **Who fills it:** Named reviewer roles decide; the AI governance engineer assembles the checklist
  from the evidence store.
- **When:** Before every release, including retrains and rollbacks.
- **How it becomes evidence:** Each item links the record that answers it; the pipeline deploys only
  when the decision record is "go" or "go_with_conditions" and signed.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `decision_id` (required)

Identifier of the decision.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `change_type`

What kind of release this is. A retrained model is a new release. One of: `new_system`,
`major_change`, `minor_change`, `retrain`, `rollback`.

Answer:

### `checklist` (required)

Readiness checklist. Every item links the record that answers it. Evidences: `EU AI Act Art. 17`.

Add one entry per item. Each entry has:

- `item_id` (required): Checklist item id.
- `question` (required): The question the item answers (for example "Do all blocking suites pass?").
- `evidences`: The obligation the item evidences.
- `evidence`: Link to the record that answers it. Format: URL.
- `status` (required): Status. One of: `met`, `not_met`, `not_applicable`, `waived`.

### `reviewers` (required)

Named reviewer roles and their decisions (for example legal, security, privacy, business,
governance). Evidences: `NIST AI RMF MANAGE 1.1`.

Add one entry per item. Each entry has:

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `overrides`

Management overrides, recorded rather than hidden.

Add one entry per item. Each entry has:

- `item_id` (required): Item overridden.
- `by_role` (required): Role that overrode it.
- `rationale` (required): Why.

### `residual_risk_accepted`

Residual risk accepted with this release, with the accepting role. Evidences:
`NIST AI RMF MANAGE 1.4` · `EU AI Act Art. 9(5)`.

Answer:

### `decision` (required)

The decision. One of: `go`, `go_with_conditions`, `no_go`.

Answer:

### `conditions`

Conditions on a conditional go. A list.

Answer:

### `rollout`

Rollout and rollback. Evidences: `NIST AI RMF MANAGE 2.4`.

- `strategy` (required): Rollout strategy. One of: `shadow`, `pilot`, `canary`, `full`.
- `exposure_percent`: Share of traffic or cases exposed at first. Format: number.
- `rollback_plan` (required): How to roll back, and the trigger.

### `decided_at` (required)

When the decision was taken. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

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
