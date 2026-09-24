# Template: Deployment decision record (v1)

> Human template for the `deployment-decision-record` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/deployment-decision-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/deployment-decision-record.example.json
- **Evidences:** `EU AI Act Art. 26` · `EU AI Act Art. 27` · `EU AI Act Art. 25` ·
  `EU AI Act Art. 50` · `GDPR Art. 35` · `ISO/IEC 42001 A.9` · `NIST AI RMF MANAGE 1.1`
- **Stack layer:** 02 Inventory & Transparency · 04 Runtime Controls & Observability
- **Patterns:**
  - [Vendor / Model Due-Diligence Gate](https://aigovernanceengineer.com/bok/patterns#pattern-vendor--model-due-diligence-gate)
  - [Human-in-the-loop Gate](https://aigovernanceengineer.com/bok/patterns#pattern-human-in-the-loop-gate)

The deployer's decision to put one AI system into use in one context, with the deployer duties
checked one by one: use per the instructions, assigned and trained oversight, input data,
monitoring, log retention, worker and affected-person information, impact assessments and
registration.

## How to use it

- **Who fills it:** The deploying business owner decides; the AI governance engineer prepares the
  duty checklist; privacy and legal review the assessments.
- **When:** Before a system is put into use in a new context, and at each review date.
- **How it becomes evidence:** Each duty links its record (instructions, training records, FRIA,
  DPIA), so the decision is auditable without interviews.

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

### `provider`

Provider of the system (internal team or supplier).

Answer:

### `deployment_context` (required)

Where, by whom and on whom it is used. Evidences: `EU AI Act Art. 27(1)(a)`.

- `business_process` (required): Process the system is used in.
- `users`: Who operates it. A list.
- `affected_persons` (required): Who is affected. A list.
- `jurisdictions`: Where. A list.
- `period_and_frequency`: How long and how often it will be used.

### `role_assessment`

Whether deployer duties or provider duties apply. Evidences: `EU AI Act Art. 25`.

- `becomes_provider` (required): Whether this deployment makes the organisation a provider (for
  example by substantial modification or rebranding). Format: `true` or `false`.
- `rationale` (required): Why.

### `duties` (required)

The deployer duties, checked one by one. Evidences: `EU AI Act Art. 26`.

- `instructions_for_use` (required): Use in line with the instructions. Evidences:
  `EU AI Act Art. 26(1)`.
  - `document` (required): Instructions for use relied on. Format: URL.
  - `gaps`: Gaps found in them. A list.
- `oversight` (required): Oversight assigned to competent, trained people. Evidences:
  `EU AI Act Art. 26(2)` · `EU AI Act Art. 4`.
  - `roles` (required): Roles assigned to oversee. A list.
  - `training_records`: Ids of their training records. A list.
- `input_data`: How input data is kept relevant and representative, where the deployer controls it.
  Evidences: `EU AI Act Art. 26(4)`.
- `monitoring` (required): Monitoring and suspension. Evidences: `EU AI Act Art. 26(5)`.
  - `plan` (required): How operation is monitored.
  - `suspension_criteria`: When use is suspended and the provider informed. A list.
- `log_retention_days` (required): How long automatically generated logs are kept, in days (at least
  six months unless other law says otherwise). Format: whole number. Evidences:
  `EU AI Act Art. 26(6)`.
- `workers_informed`: Information to workers before workplace use. Evidences:
  `EU AI Act Art. 26(7)`.
  - `required` (required): Whether workers and their representatives must be informed. Format:
    `true` or `false`.
  - `informed_at`: When. Format: date, `YYYY-MM-DD`.
- `affected_persons_informed`: Information to people subject to decisions or interacting with the
  system. Evidences: `EU AI Act Art. 26(11)` · `EU AI Act Art. 50`.
  - `required` (required): Whether affected persons must be told the system is used. Format: `true`
    or `false`.
  - `method`: How.
- `fria` (required): Fundamental rights impact assessment. Evidences: `EU AI Act Art. 27`.
  - `required` (required): Whether a FRIA is required. Format: `true` or `false`.
  - `assessment_id`: Id of the impact assessment.
- `dpia` (required): Data protection impact assessment. Evidences: `GDPR Art. 35` ·
  `EU AI Act Art. 26(9)`.
  - `required` (required): Whether a DPIA is required. Format: `true` or `false`.
  - `assessment_id`: Id of the impact assessment.
- `eu_database_registration`: Registration by public-authority deployers. Evidences:
  `EU AI Act Art. 26(8)` · `EU AI Act Art. 49`.
  - `required` (required): Whether the deployer must register (public authorities). Format: `true`
    or `false`.
  - `registration_id`: Registration id.

### `performance_requirements`

Performance floors the deployment must hold, including per group. A list.

Answer:

### `decision` (required)

The decision. One of: `deploy`, `deploy_with_conditions`, `do_not_deploy`.

Answer:

### `conditions`

Conditions attached. A list.

Answer:

### `decided_by` (required)

Deciding role.

Answer:

### `decided_at` (required)

Decision date. Format: date, `YYYY-MM-DD`.

Answer:

### `review_by`

When the decision must be reviewed. Format: date, `YYYY-MM-DD`.

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
