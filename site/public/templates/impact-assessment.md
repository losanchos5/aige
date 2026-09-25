# Template: Impact assessment (v1)

> Human template for the `impact-assessment` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/impact-assessment.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/impact-assessment.example.json
- **Evidences:** `EU AI Act Art. 27` · `EU AI Act Art. 27(1)` · `EU AI Act Art. 27(3)` ·
  `EU AI Act Art. 27(4)` · `GDPR Art. 35` · `GDPR Art. 35(7)` · `ISO/IEC 42005` ·
  `ISO/IEC 42001 A.5` · `NIST AI RMF MAP 5.1`
- **Stack layer:** 01 Govern-as-Code · 02 Inventory & Transparency
- **Patterns:**
  - [FRIA-as-Code](https://aigovernanceengineer.com/bok/patterns#pattern-fria-as-code)

One schema for three assessments, told apart by `type`: an AI system impact assessment (aiia), an AI
addendum to a data protection impact assessment (dpia_addendum) and a fundamental rights impact
assessment (fria). Shared fields carry the risks, mitigations and outcome; type-specific fields
carry what each instrument asks for.

## How to use it

- **Who fills it:** aiia: the AI governance engineer with the system owner. dpia_addendum: the
  privacy office, with the DPO's advice. fria: the deployer, with legal and representatives of
  affected groups where possible.
- **When:** Before first use, as routed by the use-case record; again on any review trigger.
- **How it becomes evidence:** Each mitigation links the record that proves it runs; the go/no-go
  and the deployment decision record link the approved assessment.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `assessment_id` (required)

Identifier of the assessment.

Answer:

### `type` (required)

Which assessment this is. aiia: AI system impact assessment (ISO/IEC 42005 style); dpia_addendum:
AI-specific addendum to a GDPR DPIA; fria: fundamental rights impact assessment by a deployer. One
of: `aiia`, `dpia_addendum`, `fria`. Evidences: `ISO/IEC 42005` · `GDPR Art. 35` ·
`EU AI Act Art. 27`.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `assessor` (required)

Role that led the assessment.

Answer:

### `consulted`

Stakeholders and experts consulted, including representatives of affected groups. A list. Evidences:
`NIST AI RMF MAP 5.2`.

Answer:

### `related_assessments`

Ids of related assessments. A FRIA may build on an existing DPIA rather than repeat it. A list.
Evidences: `EU AI Act Art. 27(4)`.

Answer:

### `processes`

fria: the deployer's processes in which the system is used, in line with its intended purpose.
Evidences: `EU AI Act Art. 27(1)(a)`.

Answer:

### `period_and_frequency`

fria: how long and how often the system will be used. Evidences: `EU AI Act Art. 27(1)(b)`.

Answer:

### `affected_categories`

Categories of persons and groups likely to be affected. A list. Evidences:
`EU AI Act Art. 27(1)(c)`.

Answer:

### `processing_description`

dpia_addendum: systematic description of the processing and its purposes, including the AI-specific
steps (training, inference, retention of prompts and outputs). Evidences: `GDPR Art. 35(7)(a)`.

Answer:

### `necessity_and_proportionality`

dpia_addendum: why the processing, and the use of AI for it, is necessary and proportionate.
Evidences: `GDPR Art. 35(7)(b)`.

Answer:

### `ai_specific`

dpia_addendum and aiia: questions a classic DPIA template does not ask.

- `training_vs_operational_data`: How training data and operational data differ in source, basis and
  retention.
- `automated_decision_making`: Whether decisions with legal or similarly significant effect are
  taken solely by automated means. Format: `true` or `false`. Evidences: `GDPR Art. 22`.
- `inferences`: What the system infers about people, and whether those inferences are stored.
- `memorisation_and_extraction`: Risk that personal data is memorised by the model and extracted
  from it.

### `iso42005_sections`

aiia: the documented elements of the assessment, keyed by ISO/IEC 42005 clause id (for example
"6.3.4" for intended use). Clause ids as listed in the INCITS/AI crosswalk to the NIST AI RMF; the
risks and mitigations below carry the impacts and the measures. Evidences: `ISO/IEC 42005`.

Add one entry per item. Each entry has:

- `clause` (required): Clause id, for example "6.3.4".
- `heading`: The clause's heading.
- `text` (required): What the assessment records under it.

### `risks` (required)

Specific risks of harm to the people and groups affected. Evidences: `EU AI Act Art. 27(1)(d)` ·
`GDPR Art. 35(7)(c)` · `ISO/IEC 42005`.

Add one entry per item. Each entry has:

- `id`: Short id of the risk inside this assessment (for example "R1"), so each mitigation can
  name the risks it addresses.
- `right_or_interest` (required): The right, freedom or interest at stake (for example
  "non-discrimination", "privacy").
- `description` (required): How harm could occur.
- `affected_group`: Who would bear it.
- `likelihood` (required): 1 to 5. Format: whole number.
- `severity` (required): 1 to 5. Format: whole number.
- `risk_register_id`: Matching risk register entry, if any.

### `human_oversight_measures`

fria: how the oversight measures in the instructions for use are implemented. Evidences:
`EU AI Act Art. 27(1)(e)` · `EU AI Act Art. 14`.

Answer:

### `mitigations` (required)

Measures to take if the risks materialise, and measures to prevent them. Evidences:
`EU AI Act Art. 27(1)(f)` · `GDPR Art. 35(7)(d)`.

Add one entry per item. Each entry has:

- `measure` (required): The measure.
- `addresses`: Ids of the risks it addresses (for example "R1"); older records may name the rights
  instead. A list.
- `pattern`: The pattern that implements the measure: a page under
  https://aigovernanceengineer.com/patterns/. Format: URL.
- `controls`: Controls or obligations the measure implements, by id (for example
  "ISO/IEC 42001 A.5" or "AIGE-OBL-EUAIA-ART27"). A list.
- `owner`: Owner.
- `status` (required): Status. One of: `planned`, `in_place`, `verified`.
- `evidence`: Record that proves it runs. Format: URL.

### `governance_and_complaints`

fria: internal governance and complaint mechanisms if the risks materialise. Evidences:
`EU AI Act Art. 27(1)(f)`.

Answer:

### `dpo_advice`

dpia_addendum: the data protection officer's advice and how it was taken into account. Evidences:
`GDPR Art. 35(2)`.

Answer:

### `residual_risk`

What remains after mitigation, in a sentence.

Answer:

### `outcome` (required)

Outcome. prior_consultation_required applies when a DPIA shows high residual risk. One of:
`proceed`, `proceed_with_mitigations`, `do_not_proceed`, `prior_consultation_required`. Evidences:
`GDPR Art. 36`.

Answer:

### `authority_notification`

fria: notification of the results. Evidences: `EU AI Act Art. 27(3)`.

- `required` (required): Whether the results must be notified to the market surveillance authority.
  Format: `true` or `false`.
- `authority`: Authority notified.
- `notified_at`: When. Format: date, `YYYY-MM-DD`.

### `approvals` (required)

Approvals by role.

Add one entry per item. Each entry has:

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `review_triggers`

Changes that reopen the assessment (new purpose, new data, new group affected, incident). A list.

Answer:

### `next_review`

Next scheduled review. Format: date, `YYYY-MM-DD`.

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
