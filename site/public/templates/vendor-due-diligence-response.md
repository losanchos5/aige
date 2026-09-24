# Template: Vendor due-diligence response (v1)

> Human template for the `vendor-due-diligence-response` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/vendor-due-diligence-response.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/vendor-due-diligence-response.example.json
- **Evidences:** `EU AI Act Art. 25` · `EU AI Act Art. 26` · `EU AI Act Art. 53(1)(b)` ·
  `GDPR Art. 28` · `ISO/IEC 42001 A.10` · `NIST AI RMF GOVERN 6.1` · `NIST AI RMF MANAGE 3.1`
- **Stack layer:** 02 Inventory & Transparency · 05 Assurance & Continuous Compliance
- **Patterns:**
  - [Vendor / Model Due-Diligence Gate](https://aigovernanceengineer.com/bok/patterns#pattern-vendor--model-due-diligence-gate)

A supplier's answers to the AI due-diligence questionnaire for one product, keyed to the obligations
they help the buyer evidence, plus the buyer's assessment and reassessment date.

## How to use it

- **Who fills it:** The supplier answers; the buying team, third-party risk, privacy and the AI
  governance engineer assess.
- **When:** Before purchase, on renewal and on any material change (new model version, new
  sub-processor, incident).
- **How it becomes evidence:** Each answer maps to an obligation, so gaps become contract conditions
  or technical controls; the conditions reappear in the contract clause checklist.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `response_id` (required)

Identifier of the response.

Answer:

### `questionnaire_version`

Version of the questionnaire answered.

Answer:

### `vendor` (required)

The supplier.

- `name` (required): Supplier name.
- `contact`: Contact mailbox or portal.

### `product` (required)

The product assessed.

- `name` (required): Product name.
- `version`: Version assessed.
- `model_ids`: Models inside the product. A list.

### `requested_by`

Buying team.

Answer:

### `received_at` (required)

When the answers arrived. Format: date, `YYYY-MM-DD`.

Answer:

### `answers` (required)

The supplier's answers.

- `provider_role` (required): The supplier's role under the EU AI Act. One of: `provider`,
  `gpai_provider`, `component_supplier`, `reseller`, `other`. Evidences: `EU AI Act Art. 25`.
- `eu_ai_act_category`: The supplier's own classification. One of: `not_assessed`, `out_of_scope`,
  `minimal`, `transparency`, `high_risk_annex_i`, `high_risk_annex_iii`, `gpai`,
  `gpai_systemic_risk`, `prohibited`.
- `documentation`: Documentation supplied. Evidences: `EU AI Act Art. 13` ·
  `EU AI Act Art. 53(1)(b)`.
  - `model_card`: Model or system card. Format: URL.
  - `instructions_for_use`: Instructions for use, for high-risk systems. Format: URL.
  - `downstream_information`: Information for downstream providers, for GPAI models. Format: URL.
- `training_on_customer_data` (required): Use of customer data for training. Evidences:
  `GDPR Art. 28(3)(a)`.
  - `used` (required): Whether customer inputs or outputs train the supplier's models. Format:
    `true` or `false`.
  - `opt_out`: Whether the customer can opt out. Format: `true` or `false`.
  - `contract_clause`: Clause reference.
- `data_processing`: Data processing. Evidences: `GDPR Art. 28(2)` · `GDPR Art. 28(3)`.
  - `locations`: Where data is processed and stored. A list.
  - `retention`: How long prompts, outputs and logs are kept.
  - `subprocessors`: Sub-processors. A list.
- `security`: Security posture.
  - `certifications`: Certifications held (for example ISO/IEC 27001, ISO/IEC 42001). A list.
  - `last_penetration_test`: Date of the last independent test. Format: date, `YYYY-MM-DD`.
- `evaluations`: Evaluations and red-team results the supplier shares. Evidences:
  `EU AI Act Art. 15`.
  Each entry has:
  - `suite` (required): What was evaluated.
  - `summary` (required): Result in a sentence.
  - `report`: Report. Format: URL.
- `incident_notification` (required): Incident notice to the customer. Evidences:
  `ISO/IEC 42001 A.10` · `EU AI Act Art. 26(5)`.
  - `window_hours` (required): Hours within which the supplier notifies the customer of an incident.
    Format: whole number.
  - `channel`: How.
- `change_notification`: Change notice.
  - `notice_days` (required): Days of notice before a material change, including model updates.
    Format: whole number.
  - `covers_model_updates`: Whether model version changes are notified. Format: `true` or `false`.
- `audit_rights`: Whether the customer may audit or receive audit reports. Format: `true` or
  `false`. Evidences: `GDPR Art. 28(3)(h)`.
- `logging_support`: What logs the customer receives or can export, and for how long. Evidences:
  `EU AI Act Art. 12` · `EU AI Act Art. 26(6)`.
- `copyright_policy`: For GPAI models: the copyright compliance policy. Format: URL. Evidences:
  `EU AI Act Art. 53(1)(c)`.
- `training_content_summary`: For GPAI models: the public summary of training content. Format: URL.
  Evidences: `EU AI Act Art. 53(1)(d)`.
- `aibom`: AIBOM for the product, if supplied. Format: URL.
- `exit`: Exit terms. Evidences: `GDPR Art. 28(3)(g)`.
  - `data_return_days`: Days to return customer data at exit. Format: whole number.
  - `deletion_certificate`: Whether deletion is certified. Format: `true` or `false`.

### `open_questions`

Questions the supplier did not answer or answered unclearly. Unverifiable answers are recorded, not
assumed. A list.

Answer:

### `assessment` (required)

The buyer's assessment. Evidences: `NIST AI RMF GOVERN 6.1` · `NIST AI RMF MANAGE 3.1` ·
`ISO/IEC 42001 A.10`.

- `risk_tier` (required): Supplier risk tier (criticality, data sensitivity, autonomy, regulatory
  context). One of: `low`, `medium`, `high`, `critical`.
- `decision` (required): Decision. One of: `approve`, `approve_with_conditions`, `reject`.
- `conditions`: Conditions, typically contract clauses or technical controls. A list.
- `reviewer` (required): Reviewing role.
- `reviewed_at` (required): When. Format: date, `YYYY-MM-DD`.
- `reassess_by` (required): Reassessment date; also on renewal or material change. Format: date,
  `YYYY-MM-DD`.

### `extensions`

Organisation-specific fields. Validators ignore their content; keep evidence-bearing fields in the
core record.

Answer:

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
