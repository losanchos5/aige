# Template: AI system register entry (v1)

> Human template for the `ai-system-register-entry` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/ai-system-register-entry.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/ai-system-register-entry.example.json
- **Evidences:** `EU AI Act Art. 49` · `EU AI Act Art. 71` · `EU AI Act Art. 6` ·
  `EU AI Act Art. 26` · `ISO/IEC 42001 A.4` · `ISO/IEC 42001 A.6` · `NIST AI RMF GOVERN 1.6`
- **Stack layer:** 02 Inventory & Transparency
- **Patterns:**
  - [Agent Registry](https://aigovernanceengineer.com/bok/patterns#pattern-agent-registry)
  - [Shadow-AI Discovery](https://aigovernanceengineer.com/bok/patterns#pattern-shadow-ai-discovery)

One entry in the inventory of AI systems and models: who owns it, what it may do, how it is
classified and where its evidence lives. The deploy pipeline writes the core fields; intake adds the
classification. Extends the registry entry shape in chapter 05 (id, version, owner, scope, expiry).

## How to use it

- **Who fills it:** The system owner, with the AI governance engineer. The deploy pipeline writes
  `id`, `version`, `owner`, `scope` and `expiry`; intake adds the classification.
- **When:** At intake (draft), at every deploy (version), and at each review before `expiry`.
- **How it becomes evidence:** The entry is the anchor every other record is filed against
  (`subject` = `id@version`). Deny production access to anything without a current entry.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `id` (required)

Stable registry identifier, lower case (for example "credit-afford-03"). Never reused after
retirement. Evidences: `NIST AI RMF GOVERN 1.6`.

Answer:

### `version` (required)

Version of the deployed artefact this entry describes (a date, a semantic version or a build id).

Answer:

### `owner` (required)

Accountable owning team or role. An entry without an owner is denied production access.

Answer:

### `scope` (required)

Declared scope: the permissions, data domains or decisions the system is allowed to touch. Anything
outside it is out of policy. A list. Evidences: `ISO/IEC 42001 A.6`.

Answer:

### `expiry` (required)

Date after which the entry must be renewed or the system is deactivated. Forces a periodic review.
Format: date, `YYYY-MM-DD`. Evidences: `NIST AI RMF GOVERN 1.6`.

Answer:

### `name`

Human-readable name.

Answer:

### `purpose`

Intended purpose in one or two sentences, as the use-case record states it. Evidences:
`EU AI Act Art. 13(3)(b)` · `NIST AI RMF MAP 1.1`.

Answer:

### `system_type`

What kind of AI artefact this is. One of: `ml_model`, `llm_application`, `agent`, `gpai_model`,
`rules_plus_ml`, `other`.

Answer:

### `role`

The organisation's role for this system under the EU AI Act. Recheck it whenever the system is
modified or rebranded. One of: `provider`, `deployer`, `provider_and_deployer`, `importer`,
`distributor`. Evidences: `EU AI Act Art. 25`.

Answer:

### `risk_classification`

Regulatory and internal classification, with the record that justifies it. Evidences:
`EU AI Act Art. 6`.

- `eu_ai_act_category` (required): Classification under the EU AI Act, from the classification
  decision record. One of: `not_assessed`, `out_of_scope`, `minimal`, `transparency`,
  `high_risk_annex_i`, `high_risk_annex_iii`, `gpai`, `gpai_systemic_risk`, `prohibited`. Evidences:
  `EU AI Act Art. 6`.
- `annex_iii_point`: For Annex III systems, the point and letter relied on (for example "5(b)").
- `internal_tier` (required): The organisation's own risk tier, which drives the controls required.
  One of: `low`, `medium`, `high`, `critical`.
- `rationale`: Why this classification, in one paragraph.
- `classification_record`: Link to the signed classification decision. Format: URL.
- `decided_at`: When the classification was decided. Format: date, `YYYY-MM-DD`.

### `lifecycle_stage`

Where the system is in its lifecycle. One of: `proposed`, `in_development`, `in_validation`,
`in_production`, `suspended`, `retired`. Evidences: `ISO/IEC 42001 A.6`.

Answer:

### `use_case_record`

Id of the use-case record that admitted the system at intake.

Answer:

### `components`

Models, datasets, tools and services the system is built from. Mirrors the AIBOM. Evidences:
`EU AI Act Art. 11` · `ISO/IEC 42001 A.4`.

Add one entry per item. Each entry has:

- `type` (required): Kind of component. One of: `model`, `dataset`, `tool`, `service`, `library`.
- `ref` (required): Identifier of the component (registry id, dataset id or package name).
- `version`: Component version.
- `supplier`: Supplier, if third party.

### `aibom`

Link to the AIBOM (for example a CycloneDX ML-BOM). Format: URL. Evidences: `EU AI Act Art. 11`.

Answer:

### `jurisdictions`

Countries or regions where the system is used (ISO 3166 codes where possible). A list.

Answer:

### `personal_data`

Whether the system processes personal data. True routes it to the DPIA screen. Format: `true` or
`false`.

Answer:

### `affected_persons`

Categories of people affected by the outputs (for example "loan applicants"). A list. Evidences:
`NIST AI RMF MAP 1.1`.

Answer:

### `human_oversight`

Oversight mode designed into the system. One of: `human_in_the_loop`, `human_on_the_loop`,
`human_in_command`, `none`. Evidences: `EU AI Act Art. 14`.

Answer:

### `eu_database_registration`

Registration in the EU database for high-risk systems. Evidences: `EU AI Act Art. 49` ·
`EU AI Act Art. 71`.

- `required` (required): Whether registration in the EU database applies. Format: `true` or `false`.
- `registration_id`: Identifier returned by the EU database, once registered.
- `registered_at`: Date of registration. Format: date, `YYYY-MM-DD`.

### `evidence`

Links to the records that evidence this entry: model card, impact assessments, eval results,
go/no-go. A list. Each item: URL. Evidences: `ISO/IEC 42001 A.6`.

Answer:

### `last_reviewed`

When the entry was last reviewed by its owner. Format: date, `YYYY-MM-DD`.

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
