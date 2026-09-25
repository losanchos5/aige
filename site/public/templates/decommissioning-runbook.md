# Template: Decommissioning runbook (v1)

> Human template for the `decommissioning-runbook` JSON Schema. Fill it in as a document, or produce
> the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/decommissioning-runbook.example.json
- **Evidences:** `NIST AI RMF GOVERN 1.7` · `NIST AI RMF MANAGE 2.4` · `EU AI Act Art. 18` ·
  `EU AI Act Art. 26(6)` · `ISO/IEC 42001 A.6` · `GDPR Art. 5(1)(e)`
- **Stack layer:** 02 Inventory & Transparency · 04 Runtime Controls & Observability
- **Patterns:**
  - [Kill Switch / Circuit Breaker](https://aigovernanceengineer.com/bok/patterns#pattern-kill-switch--circuit-breaker)
  - [Agent Registry](https://aigovernanceengineer.com/bok/patterns#pattern-agent-registry)

The executed plan for retiring one AI system or agent: why, who is told, each step with its owner
and evidence (identity revoked, traffic stopped, register entry retired, evidence archived, data
disposed of), and the sign-off.

## How to use it

- **Who fills it:** The system owner runs it; platform, data and governance own their steps; the AI
  governance engineer signs off.
- **When:** When a retirement is decided (end of life, replacement, unacceptable risk, vendor exit
  or incident).
- **How it becomes evidence:** Each step links its evidence; a retired register entry stays in the
  registry so history and audits still resolve.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `runbook_id` (required)

Identifier of the runbook.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `reason` (required)

Why it is retired. One of: `end_of_life`, `replaced`, `risk_unacceptable`, `regulatory`,
`vendor_exit`, `incident`.

Answer:

### `replaced_by`

Registry id of the successor, if any.

Answer:

### `decision_ref`

Record of the retirement decision.

Answer:

### `dependencies`

Downstream systems, agents or processes that rely on it. A list.

Answer:

### `notifications`

Who is told, and when.

Add one entry per item. Each entry has:

- `party` (required): Who is told. One of: `deployers`, `users`, `affected_persons`, `workers`,
  `authority`, `vendor`, `other`.
- `method`: How.
- `sent_at`: When. Format: date, `YYYY-MM-DD`.

### `steps` (required)

Ordered steps. The runbook is complete when every step is done or skipped with a reason. Evidences:
`NIST AI RMF GOVERN 1.7`.

Add one entry per item. Each entry has:

- `step_id` (required): Step id.
- `action` (required): Action. One of: `disable_traffic`, `revoke_identity`, `revoke_credentials`,
  `retire_register_entry`, `archive_evidence`, `delete_data`, `delete_model_artefacts`,
  `update_documentation`, `notify`, `other`.
- `detail`: What exactly is done.
- `owner` (required): Who does it.
- `status` (required): Status. One of: `pending`, `done`, `skipped`.
- `completed_at`: When done. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).
- `evidence`: Record that proves it. Format: URL.

### `data_disposition`

What happens to each dataset, log and prompt store. Evidences: `GDPR Art. 5(1)(e)` ·
`EU AI Act Art. 26(6)`.

Add one entry per item. Each entry has:

- `dataset` (required): Dataset or store.
- `action` (required): Action. One of: `delete`, `retain`, `anonymise`.
- `basis`: Why retained, if retained.
- `until`: Until when. Format: date, `YYYY-MM-DD`.

### `evidence_archive` (required)

Where the record of the system's life is kept. Evidences: `EU AI Act Art. 18`.

- `location` (required): Where the evidence is archived. Format: URL.
- `retain_until` (required): Retention end (for a high-risk system, documentation is kept for ten
  years after placing on the market or putting into service). Format: date, `YYYY-MM-DD`.

### `rollback_possible_until`

Last date the system could be restored, if any. Format: date, `YYYY-MM-DD`.

Answer:

### `sign_off`

Final sign-off.

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `status` (required)

Status. One of: `planned`, `in_progress`, `completed`.

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
