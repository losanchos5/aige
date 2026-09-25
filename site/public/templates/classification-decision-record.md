# Template: Classification decision record (v1)

> Human template for the `classification-decision-record` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/classification-decision-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/classification-decision-record.example.json
- **Tool that produces it:** https://aigovernanceengineer.com/toolkit/ai-act-triage
- **Evidences:** `EU AI Act Art. 6(3)` · `EU AI Act Art. 6(4)` · `EU AI Act Art. 49(2)` ·
  `EU AI Act Art. 25` · `EU AI Act Art. 2` · `EU AI Act Art. 5` · `EU AI Act Art. 50` ·
  `EU AI Act Art. 52`
- **Stack layer:** 01 Govern-as-Code · 02 Inventory & Transparency
- **Patterns:**
  - [Policy Card](https://aigovernanceengineer.com/bok/patterns#pattern-policy-card)
  - [Agent Registry](https://aigovernanceengineer.com/bok/patterns#pattern-agent-registry)

The recorded EU AI Act triage of one AI system or model: the question set and version it was
answered against, every answer with its article and meaning, the indicative scope, operator roles
and risk classes with their reasons, the high-risk screen with the Art. 6(3) condition and the
explicit profiling flag, the reviewer, the date, the legal-review state and the events that re-open
it.

## How to use it

- **Who fills it:** The AI governance engineer runs the triage at intake with the system owner;
  counsel confirms the reading and the record says so in `legal_review`.
- **When:** At intake, for every AI system and GPAI model, and again whenever one of the
  `re_review` triggers fires. Chapter 18 asks for one for every Annex III candidate.
- **How it becomes evidence:** The record is filed in the registry next to the system (Layer 2);
  the rule that computes it lives in Layer 1. A provider relying on the Art. 6(3) filter documents
  its assessment before placing the system on the market and registers it (Art. 6(4), Art. 49(2)).
  The outcome is indicative: an engineer's reading, not legal advice and not a conformity claim.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `kind` (required)

Record kind: always `aige.classification-decision-record`. The triage refuses to re-open a file of
any other kind.

Answer:

### `version` (required)

Major version of the record format: `1`.

Answer:

### `record_id` (required)

Identifier of this decision, stable for the same system and date (for example
"cdr-2026-09-24-cv-screen-02").

Answer:

### `system` (required)

The AI system or model the decision is filed against.

- `name` (required): Name of the system or model.
- `registry_id`: Id of the entry in the AI system register, so the record files next to it.
- `intended_purpose` (required): What it is used for, by whom and in which context. The
  classification follows the intended purpose; a change of purpose re-opens the record. Evidences:
  `EU AI Act Art. 6`.

### `question_set` (required)

The versioned question graph the answers were given against.

- `id` (required): Question-set id: `aige.eu-ai-act-triage`.
- `version` (required): Semantic version of the question set. A new major version changes a rule,
  a question's meaning or an option value.
- `as_of` (required): Date the question set reads the law as of. Format: date, `YYYY-MM-DD`.
- `basis` (required): The legal text read, as amended.
- `url`: Where the question set runs.

### `answers` (required)

Every visible question that was answered, in the order asked. A list; for each answer:

- `question` (required): Question id, stable within a major version of the question set.
- `article` (required): The article the question rests on.
- `values` (required): Option values chosen (one for a single-choice question).
- `labels`: The options as the reader saw them.
- `means`: What each chosen answer means, in the chapter's terms: the reason behind the answer.

### `outcome` (required)

The indicative outcome, recomputed from the answers whenever the record is re-opened.

- `scope` (required): One of `in-scope`, `out-of-scope`, `undetermined`. Out of scope, no role or
  class is given. Evidences: `EU AI Act Art. 2` · `EU AI Act Art. 3(1)`.
- `scope_reasons` (required): Why, with the article, for every scope rule that held.
- `roles` (required): Indicative EU operator roles for this system: `role` (one of `eu-provider`,
  `eu-downstream-provider`, `eu-deployer`, `eu-importer`, `eu-distributor`,
  `eu-authorised-representative`, `eu-product-manufacturer`, `eu-gpai-provider`), `label`,
  `article`, `reasons`. Roles name tasks, not organisations.
- `classes` (required): Indicative risk classes and the GPAI track: `class` (one of `prohibited`,
  `high-risk-annex-i`, `high-risk-annex-iii`, `transparency-art50`, `minimal`, `gpai`,
  `gpai-systemic`), `label`, `article`, `applies_from` (date), `reasons`. Several can apply at once.
- `high_risk_screen` (required): `annex_i`, `annex_iii_areas`, `art_6_3_conditions`, `profiling`
  (true, false or null) and `high_risk`. The explicit profiling flag is the point: profiling makes
  an Annex III system high-risk whatever condition is claimed.
- `open_points` (required): Decisions or checks still missing. A record with open points is a
  draft.
- `notes`: Consequences to act on (for example a FRIA, a registration, a notification clock).

### `rationale` (required)

The outcome in one paragraph, plus the reviewer's note.

Answer:

### `reviewer` (required)

Reviewing role or forum. Roles, not personal names.

Answer:

### `decided_at` (required)

Decision date. Format: date, `YYYY-MM-DD`.

Answer:

### `legal_review` (required)

Whether counsel has confirmed the reading. One of: `pending`, `confirmed`, `not-sought`.

Answer:

### `re_review` (required)

What re-opens the record.

- `triggers` (required): Events that should re-open the record. One or more of:
  `intended-purpose-change`, `brand-change`, `substantial-modification`,
  `annex-iii-configuration`, `eu-reach-change`, `annex-iii-amended`,
  `classification-guidelines-final`, `compute-threshold`, `safeguard-failure`,
  `significant-design-change`, `leaves-research`. Evidences: `EU AI Act Art. 25(1)` ·
  `EU AI Act Art. 111(2)`.
- `review_by`: Latest date for the next review. Format: date, `YYYY-MM-DD`.

### `notice` (required)

The fixed notice: indicative, not legal advice and not a conformity claim.

Answer:

### `link`

The link that reproduces the triage (the answers travel after #).

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
