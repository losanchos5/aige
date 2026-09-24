# Template: Risk register entry (v1)

> Human template for the `risk-register-entry` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/risk-register-entry.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/risk-register-entry.example.json
- **Evidences:** `EU AI Act Art. 9` · `EU AI Act Art. 9(5)` · `ISO/IEC 42001 6.1` · `ISO/IEC 23894`
  · `NIST AI RMF MAP 5.1` · `NIST AI RMF MANAGE 1.2` · `NIST AI RMF MANAGE 1.3` ·
  `NIST AI RMF MANAGE 1.4`
- **Stack layer:** 01 Govern-as-Code · 03 Evals & Red Teaming as Evidence
- **Patterns:**
  - [FRIA-as-Code](https://aigovernanceengineer.com/bok/patterns#pattern-fria-as-code)
  - [Continuous Assurance Telemetry](https://aigovernanceengineer.com/bok/patterns#pattern-continuous-assurance-telemetry)

One risk in the AI risk register, as code: the failure mode, its inherent and residual scores, the
treatment and the controls that realise it, who accepted what remains, and the links to the
incidents and eval results that keep the scores honest.

## How to use it

- **Who fills it:** The risk owner, with the AI governance engineer; model risk challenges the
  scores.
- **When:** When a risk is identified (intake, design, testing, incidents, monitoring) and at every
  review.
- **How it becomes evidence:** Every treatment control names the record that proves it runs; an
  incident or a failing eval linked here forces a re-score.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `risk_id` (required)

Identifier of the risk (for example "rk-0042").

Answer:

### `title` (required)

Short name of the risk.

Answer:

### `description`

The risk in a few sentences: cause, event, consequence.

Answer:

### `subjects` (required)

Systems the risk applies to. A list.

Answer:

### `failure_mode` (required)

The named failure mode or harm, as the eval suites and incidents refer to it.

Answer:

### `category` (required)

Risk category. One of: `safety`, `fundamental_rights`, `privacy`, `security`, `fairness`,
`reliability`, `transparency`, `legal`, `third_party`, `environmental`, `other`.

Answer:

### `source`

Where the risk originates. One of: `internal`, `external`, `third_party`, `emerging`.

Answer:

### `affected_parties`

Who bears the harm if it materialises. A list. Evidences: `EU AI Act Art. 9(2)`.

Answer:

### `inherent` (required)

Score before treatment. Evidences: `NIST AI RMF MAP 5.1`.

- `likelihood` (required): Likelihood before treatment, 1 (rare) to 5 (almost certain). Format:
  whole number.
- `severity` (required): Severity before treatment, 1 (negligible) to 5 (catastrophic). Format:
  whole number.
- `score` (required): Likelihood times severity. Format: whole number.
- `catastrophic_override`: Severity 5 is escalated regardless of likelihood. Format: `true` or
  `false`.

### `treatment` (required)

How the risk is treated. Evidences: `NIST AI RMF MANAGE 1.3` · `EU AI Act Art. 9(2)`.

- `option` (required): Response option. One of: `avoid`, `mitigate`, `transfer`, `accept`.
- `controls`: Controls that realise the treatment.
  Each entry has:
  - `control_id` (required): Control id (policy card rule, eval suite, guardrail, procedure).
  - `type` (required): Place in the mitigation hierarchy. One of: `eliminate`, `substitute`,
    `engineer`, `administrative`, `monitor`.
  - `layer`: Stack layer that produces its evidence. Format: whole number.
  - `status` (required): Status. One of: `planned`, `in_place`, `verified`.
- `due`: When planned controls must be in place. Format: date, `YYYY-MM-DD`.

### `residual` (required)

Score after treatment. Evidences: `EU AI Act Art. 9(5)` · `NIST AI RMF MANAGE 1.4`.

- `likelihood` (required): Likelihood after treatment. Format: whole number.
- `severity` (required): Severity after treatment. Format: whole number.
- `score` (required): Likelihood times severity. Format: whole number.

### `acceptance`

Who accepted the residual risk, and until when. Evidences: `EU AI Act Art. 9(5)` ·
`NIST AI RMF MANAGE 1.4`.

- `authority` (required): Role with authority to accept this residual score.
- `accepted_at` (required): When accepted. Format: date, `YYYY-MM-DD`.
- `expires`: When the acceptance lapses. Format: date, `YYYY-MM-DD`.
- `signature`: Detached signature over the record, prefixed with the algorithm (for example
  "ed25519:<base64>"). Makes the record tamper-evident in the evidence store.

### `owner` (required)

Risk owner.

Answer:

### `review_cadence`

How often the entry is reviewed.

Answer:

### `next_review` (required)

Next review date. Format: date, `YYYY-MM-DD`.

Answer:

### `links`

Links that keep the scores tied to evidence.

- `incidents`: Incident record ids. A list.
- `eval_results`: Eval suite ids whose results inform the score. A list.
- `impact_assessments`: Impact assessment ids. A list.

### `status` (required)

Status. One of: `open`, `treated`, `accepted`, `closed`.

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
