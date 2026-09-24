# Template: Use-case record (v1)

> Human template for the `use-case-record` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/use-case-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/use-case-record.example.json
- **Evidences:** `EU AI Act Art. 6` · `EU AI Act Art. 9(2)` · `EU AI Act Art. 27` · `GDPR Art. 35` ·
  `ISO/IEC 42001 A.5` · `ISO/IEC 42001 A.6` · `NIST AI RMF MAP 1.1` · `NIST AI RMF MAP 3.3`
- **Stack layer:** 01 Govern-as-Code · 02 Inventory & Transparency
- **Patterns:**
  - [FRIA-as-Code](https://aigovernanceengineer.com/bok/patterns#pattern-fria-as-code)
  - [Agent Registry](https://aigovernanceengineer.com/bok/patterns#pattern-agent-registry)

The intake record for a proposed AI use: the problem, the intended purpose and its limits, who is
affected, whether AI is the right tool, the preliminary classification and which assessments it
triggers. Scaffolds the register entry.

## How to use it

- **Who fills it:** The business owner drafts it; the AI governance engineer checks the
  classification and routes the assessments.
- **When:** Before any build work starts. Reopen it when the purpose, the affected people or the
  data change.
- **How it becomes evidence:** An approved record scaffolds the register entry and opens the
  assessments listed in `assessments_required`; the pipeline refuses to register a system without
  one.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `record_id` (required)

Identifier of this intake record (for example "uc-2026-017").

Answer:

### `title` (required)

Short name of the use case.

Answer:

### `business_owner` (required)

Business role accountable for the outcome.

Answer:

### `business_problem`

The problem to solve and why it matters, without naming a solution. Evidences:
`NIST AI RMF MAP 1.4`.

Answer:

### `intended_purpose` (required)

What the system will be used for, by whom and in which context. This sentence travels into the
instructions for use. Evidences: `EU AI Act Art. 13(3)(b)` · `NIST AI RMF MAP 1.1`.

Answer:

### `out_of_scope_uses`

Uses the system must not be put to. Each becomes a deny rule or a documented limitation. A list.
Evidences: `NIST AI RMF MAP 3.3`.

Answer:

### `users`

Who operates the system. A list.

Answer:

### `affected_persons` (required)

Who is affected by its outputs, including people who never touch it. A list. Evidences:
`EU AI Act Art. 27(1)(c)` · `NIST AI RMF MAP 1.1`.

Answer:

### `decision_authority`

How much the output decides on its own. One of: `advisory`, `human_decides`,
`automated_with_review`, `fully_automated`. Evidences: `GDPR Art. 22`.

Answer:

### `ai_justification`

The "should AI be used at all" test. Evidences: `NIST AI RMF MANAGE 2.1`.

- `alternatives_considered`: Non-AI or simpler options considered. A list.
- `why_ai` (required): Why AI is the right tool here, given the alternatives.

### `success_metrics`

How success is measured, set before building. Evidences: `EU AI Act Art. 9(8)`.

Add one entry per item. Each entry has:

- `metric` (required): Metric name.
- `target` (required): Target value or range.
- `direction`: Which way is good. One of: `higher_is_better`, `lower_is_better`, `within_range`.

### `error_appetite`

Which errors are tolerable and which are not (for example "false declines worse than false approvals
below 5k EUR"). Evidences: `NIST AI RMF MAP 1.5`.

Answer:

### `data_sources`

Data the use case needs, flagged for privacy screening. Evidences: `GDPR Art. 35`.

Add one entry per item. Each entry has:

- `name` (required): Data source.
- `personal_data` (required): Contains personal data. Format: `true` or `false`.
- `special_category`: Contains special-category data. Format: `true` or `false`.

### `jurisdictions`

Where it will be used. A list.

Answer:

### `preliminary_classification` (required)

Classification at onset. Confirmed later in the register entry. Evidences: `EU AI Act Art. 6`.

- `eu_ai_act_category` (required): Preliminary EU AI Act category. One of: `not_assessed`,
  `out_of_scope`, `minimal`, `transparency`, `high_risk_annex_i`, `high_risk_annex_iii`, `gpai`,
  `gpai_systemic_risk`, `prohibited`. Evidences: `EU AI Act Art. 6`.
- `internal_tier` (required): Preliminary internal tier. One of: `low`, `medium`, `high`,
  `critical`.
- `rationale` (required): Why, in a few sentences.

### `assessments_required`

Assessments this use case triggers, each tracked to completion. One or more of: `aiia`, `dpia`,
`fria`, `vendor_due_diligence`, `real_world_testing_plan`, `none`. Evidences: `EU AI Act Art. 27` ·
`GDPR Art. 35` · `ISO/IEC 42001 A.5`.

Answer:

### `decision` (required)

The intake decision. Evidences: `NIST AI RMF MANAGE 1.1`.

- `outcome` (required): Intake decision. One of: `approved`, `approved_with_conditions`, `rejected`,
  `deferred`.
- `conditions`: Conditions attached. A list.
- `decided_by` (required): Deciding role or forum.
- `decided_at` (required): Decision date. Format: date, `YYYY-MM-DD`.

### `register_entry`

Registry id created from this record, once approved.

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
