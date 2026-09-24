# Template: Evidence record (v1)

> Human template for the `evidence-record` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/evidence-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/evidence-record.example.json
- **Evidences:** `EU AI Act Art. 12` · `EU AI Act Art. 17` · `EU AI Act Art. 72` ·
  `ISO/IEC 42001 9.1` · `NIST AI RMF MEASURE 3.1` · `NIST AI RMF MANAGE 4.1`
- **Stack layer:** 05 Assurance & Continuous Compliance
- **Patterns:**
  - [Continuous Assurance Telemetry](https://aigovernanceengineer.com/bok/patterns#pattern-continuous-assurance-telemetry)
  - [Machine-Readable Evidence (OSCAL)](https://aigovernanceengineer.com/bok/patterns#pattern-machine-readable-evidence-oscal)

The common, signed record every control writes to the assurance store, as published in chapter 05:
which control decided what about which subject, against which metric and obligation, on which input,
when and by whom. Other records (verdicts, eval results, admissions, go/no-go) can be normalised
into it on ingest.

## How to use it

- **Who fills it:** Written by controls, never by hand: guardrails, eval gates, policy engines,
  admission gates.
- **When:** On every control decision.
- **How it becomes evidence:** Signed and hashed, keyed on the registry `subject`, it turns the
  audit into a query over one store.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `control_id` (required)

The control that produced the record (for example "guardrail.output.pii.v2").

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `decision` (required)

What the control decided. One of: `pass`, `fail`, `allow`, `deny`, `alert`.

Answer:

### `metric`

Metric measured, if any.

Answer:

### `value`

Measured value. Format: number.

Answer:

### `threshold`

Threshold compared with. Format: number.

Answer:

### `obligation`

Obligation the control helps evidence (for example "EU AI Act Art. 15").

Answer:

### `failure_mode`

Failure mode the control guards against.

Answer:

### `input_hash`

Digest of the input the decision was made on, prefixed with the algorithm (for example
"sha256:<hex>"). Lets an auditor prove which input produced the record without storing it.

Answer:

### `actor` (required)

The system, agent or role that acted.

Answer:

### `timestamp` (required)

When (RFC 3339). Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

Answer:

### `signature` (required)

Detached signature over the record, prefixed with the algorithm (for example "ed25519:<base64>").
Makes the record tamper-evident in the evidence store.

Answer:

### `record_ref`

Link to the full source record (eval result, go/no-go, incident) when this is a normalised copy.
Format: URL.

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
