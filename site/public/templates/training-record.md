# Template: Training record (v1)

> Human template for the `training-record` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/training-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/training-record.example.json
- **Evidences:** `EU AI Act Art. 4` · `EU AI Act Art. 26(2)` · `EU AI Act Art. 14` ·
  `ISO/IEC 42001 7.2` · `ISO/IEC 42001 7.3` · `NIST AI RMF GOVERN 2.2` · `NIST AI RMF MAP 3.4`
- **Stack layer:** 01 Govern-as-Code
- **Patterns:**
  - [Human-in-the-loop Gate](https://aigovernanceengineer.com/bok/patterns#pattern-human-in-the-loop-gate)
  - [Agent Identity & Scoped Credentials](https://aigovernanceengineer.com/bok/patterns#pattern-agent-identity--scoped-credentials)

Proof that one person completed one AI literacy or role-based module, with the assessment result and
the access it unlocks. Pseudonymous by design: the record carries a person reference, not a name.

## How to use it

- **Who fills it:** The learning platform emits it; HR owns the person reference; the AI governance
  office owns the curriculum.
- **When:** On completion of any module in the literacy curriculum; refresh before `valid_until`.
- **How it becomes evidence:** Access checks read `grants`: no current record, no oversight role.
  Aggregated records show what the organisation did to support AI literacy.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `record_id` (required)

Identifier of the record.

Answer:

### `person_ref` (required)

Pseudonymous reference to the person in the HR or identity system. Never a name in shared evidence.

Answer:

### `role` (required)

Role the training is for (for example "credit analyst, oversight").

Answer:

### `module_id` (required)

Module completed, as listed in the literacy curriculum.

Answer:

### `curriculum_version` (required)

Version of the curriculum the module belongs to.

Answer:

### `completed_at` (required)

Completion date. Format: date, `YYYY-MM-DD`.

Answer:

### `assessment`

Assessment result, if the module is assessed. Evidences: `ISO/IEC 42001 7.2`.

- `score`: Score obtained. Format: number.
- `pass_mark`: Pass mark. Format: number.
- `passed` (required): Whether the person passed. Format: `true` or `false`.

### `attestation`

Policy acknowledgement collected with the training. Evidences: `ISO/IEC 42001 7.3`.

- `policy` (required): Policy acknowledged (for example the acceptable-use policy).
- `policy_version` (required): Version acknowledged.

### `grants`

Access or duties the record unlocks (for example "override in credit-afford-03"). Access checks read
this field. A list. Evidences: `EU AI Act Art. 26(2)`.

Answer:

### `valid_until` (required)

Expiry; refresher due before this date. Format: date, `YYYY-MM-DD`.

Answer:

### `delivered_by`

Who delivered it (internal team or provider).

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
