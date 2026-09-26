# Template: Control observation (v1)

> Human template for the `control-observation` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/control-observation.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/control-observation.example.json
- **Evidences:** `EU AI Act Art. 12` · `EU AI Act Art. 15` · `EU AI Act Art. 17` ·
  `ISO/IEC 42001 9.1` · `NIST AI RMF MEASURE 3.1` · `NIST AI RMF MANAGE 4.1`
- **Stack layer:** 04 Runtime Controls & Observability · 05 Assurance & Continuous Compliance
- **Patterns:**
  - [Continuous Assurance Telemetry](https://aigovernanceengineer.com/bok/patterns#pattern-continuous-assurance-telemetry)
  - [Machine-Readable Evidence (OSCAL)](https://aigovernanceengineer.com/bok/patterns#pattern-machine-readable-evidence-oscal)
  - [Eval Gate in CI](https://aigovernanceengineer.com/bok/patterns#pattern-eval-gate-in-ci)

One observation of one open reference control on one subject: what the control expects, what was
observed, whether it held, when, and the evidence the observation rests on. The record an adapter, a
test or a reviewer would emit against a control of an open control profile (for example
AIGE-CTL-EVAL-002). The control profiles are draft control specifications, open for technical
review: https://aigovernanceengineer.com/controls

## How to use it

- **Who fills it:** An adapter or test that checks a control against a live subject, or a reviewer
  who inspects one by hand. Write the system or the role, never a person's name.
- **When:** Every time a control's verification procedure runs: at admission of an evaluation
  environment, during a run, on a schedule, or in a drill.
- **How it becomes evidence:** Filed against the `subject` and the `control_id`, signed and hashed,
  the observations of a profile answer "did this control hold on this subject, and how do you
  know?" as a query over one store. A `fail` links to the evidence that shows it.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `control_id` (required)

Stable id of the control observed, AIGE-CTL-<PROFILE>-<NNN> (for example "AIGE-CTL-EVAL-002"). The
control's JSON is https://aigovernanceengineer.com/api/v1/controls/<id in lower case>.json.

Answer:

### `profile`

Slug of the control profile the control belongs to (for example "evaluation-environment").

Answer:

### `control_version`

Version of the control specification the observation was made against (for example "0.1").

Answer:

### `subject` (required)

The observed object as id and version, "id@version" (for example "eval-env-eu-west@2026-09-26"). The
key the observation is filed against. Format: `id@version`.

Answer:

### `subject_kind` (required)

What kind of object the subject is. One of: `eval-environment`, `eval-run`, `agent`, `tool-server`,
`harness`, `model-artefact`.

Answer:

### `expected` (required)

What a conforming observation shows, as the control states it (for example "outbound connections
only to the destinations on the run's egress allow-list").

Answer:

### `observed` (required)

What was actually observed, stated as a fact with counts where there are any (for example "1
connection to an unlisted host during run 88213").

Answer:

### `status` (required)

Whether the observation meets the expectation. Use not_applicable when the control does not apply
to this subject, and say why in notes. One of: `pass`, `fail`, `not_applicable`.

Answer:

### `timestamp` (required)

When the observation was made (RFC 3339). Format: date and time, RFC 3339 (`2026-09-26T09:42:17Z`).

Answer:

### `enforcement_point`

Where in the lifecycle the observation was made, in the terms of the policy card. One of:
`pre_merge`, `deploy`, `runtime`, `periodic`.

Answer:

### `verification_kind`

Which verification procedure of the control produced it: inspecting configuration, running a test,
observing a run, or recording an attestation. One of: `inspect`, `test`, `observe`, `attest`.

Answer:

### `observer`

The adapter, test harness or role that made the observation (for example "egress-flow-log-adapter"
or "evaluation lead"). Write a system or a role, never a person's name.

Answer:

### `evidence` (required)

The records the observation rests on, so a third party can check it without trusting the observer.

Add one entry per item (at least one). Each entry has:

- `artefact` (required): What the evidence is, in words (for example "flow log of run 88213").
- `url`: Where the evidence is kept. Format: URL.
- `hash`: Digest of the evidence, prefixed with the algorithm (for example "sha256:<hex>"), so it
  can be shown to be unchanged.
- `schema`: Schema the evidence record validates against, when it is a structured record (for
  example the evidence-record or eval-result schema). Format: URL.

### `run_id`

Id of the evaluation run, deployment or job the observation belongs to, when there is one.

Answer:

### `notes`

Anything a reviewer needs to read the observation: scope limits, why a control is not applicable,
follow-up.

Answer:

### `signature`

Detached signature over the record, prefixed with the algorithm (for example "ed25519:<base64>").
Makes the observation tamper-evident in the evidence store.

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
