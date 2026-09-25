# Template: Policy card (v1)

> Human template for the `policy-card` JSON Schema. Fill it in as a document, or produce the same
> fields as JSON and validate them against the schema. Illustrative, not a claim of conformity, and
> not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/policy-card.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/policy-card.example.json
- **Evidences:** `EU AI Act Art. 9` · `EU AI Act Art. 17` · `ISO/IEC 42001 5.2` ·
  `ISO/IEC 42001 A.2` · `NIST AI RMF GOVERN 1.2` · `NIST AI RMF GOVERN 1.4`
- **Stack layer:** 01 Govern-as-Code
- **Patterns:**
  - [Policy Card](https://aigovernanceengineer.com/bok/patterns#pattern-policy-card)
  - [Framework Crosswalk](https://aigovernanceengineer.com/bok/patterns#pattern-framework-crosswalk)

A governance rule set as a machine-readable artefact that travels with the system it governs: each
rule's effect, the failure mode it addresses, where it is enforced and the engine module that
implements it. Every evaluation emits a verdict in the shape published in chapter 05
($defs/verdict).

## How to use it

- **Who fills it:** The policy owner writes the rules; the AI governance engineer implements and
  tests the engine module.
- **When:** Whenever a rule from the AI policy needs to bind a system; every change is a new
  version, reviewed like code.
- **How it becomes evidence:** Every evaluation emits a verdict (`rule_id`, `decision`,
  `input_hash`, `timestamp`) into the evidence store; the card itself is versioned in the repository
  with its tests.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `card_id` (required)

Identifier of the card.

Answer:

### `version` (required)

Card version. A rule change is a new version and a reviewable diff.

Answer:

### `title` (required)

What the card governs.

Answer:

### `owner` (required)

Policy owner.

Answer:

### `applies_to` (required)

Registry ids or selectors the card applies to. A list.

Answer:

### `source_policy`

Clause of the organisation's AI policy the card implements (for example
"ai-policy.yaml#rules/agents-bounded-spend"). Evidences: `ISO/IEC 42001 5.2`.

Answer:

### `rules` (required)

The rules. Evidences: `NIST AI RMF GOVERN 1.4`.

Add one entry per item. Each entry has:

- `rule_id` (required): Versioned rule id; verdicts carry it (for example
  "refunds.per-order-cap.v4").
- `description` (required): The rule in one sentence.
- `effect` (required): What happens when the condition holds. One of: `deny`, `allow`,
  `require_approval`, `alert`.
- `condition`: The condition in plain words; the engine module is authoritative.
- `failure_mode` (required): The failure mode the rule addresses.
- `enforcement_points` (required): Where the rule is evaluated. One or more of: `pre_merge`,
  `deploy`, `runtime`, `periodic`.
- `implementation`: Where the executable rule lives.
  - `engine` (required): Policy engine. One of: `opa_rego`, `cedar`, `other`.
  - `module` (required): Module or file.
  - `entrypoint`: Rule or query evaluated.
- `maps_to`: Obligations the rule helps evidence. A list.

### `exceptions`

How an exception is requested, approved and time-limited.

Answer:

### `effective_from` (required)

Date the version applies from. Format: date, `YYYY-MM-DD`.

Answer:

### `review_by`

Date the card must be reviewed. Format: date, `YYYY-MM-DD`.

Answer:

### `approved`

Approval of this version.

- `role` (required): The approving role, not a personal name.
- `decision` (required): What this approver decided. One of: `approve`, `approve_with_conditions`,
  `reject`, `abstain`.
- `conditions`: Conditions attached to the approval, if any.
- `timestamp` (required): When the approver decided (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `sample_verdicts`

Example verdicts, in the shape every evaluation emits.

Add one entry per item. Each entry has:

- `rule_id` (required): Rule evaluated.
- `decision` (required): Outcome. One of: `allow`, `deny`, `require_approval`, `alert`.
- `input_hash` (required): Digest of the input evaluated, algorithm-prefixed.
- `timestamp` (required): When evaluated (RFC 3339). Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `subject`: Governed system, as "id@version". Format: `id@version`.
- `enforcement_point`: Where it was evaluated. One of: `pre_merge`, `deploy`, `runtime`, `periodic`.
- `signature`: Signature over the verdict.

### `extensions`

Organisation-specific fields. Validators ignore their content; keep evidence-bearing fields in the
core record.

Answer:

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
