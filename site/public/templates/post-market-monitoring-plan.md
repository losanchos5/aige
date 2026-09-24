# Template: Post-market monitoring plan (v1)

> Human template for the `post-market-monitoring-plan` JSON Schema. Fill it in as a document, or
> produce the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/post-market-monitoring-plan.example.json
- **Evidences:** `EU AI Act Art. 72` · `EU AI Act Annex IV(9)` · `EU AI Act Art. 9(2)` ·
  `ISO/IEC 42001 9.1` · `ISO/IEC 42001 A.6` · `NIST AI RMF MANAGE 4.1` · `NIST AI RMF MEASURE 3.1`
- **Stack layer:** 05 Assurance & Continuous Compliance
- **Patterns:**
  - [Continuous Assurance Telemetry](https://aigovernanceengineer.com/bok/patterns#pattern-continuous-assurance-telemetry)
  - [Incident Pipeline](https://aigovernanceengineer.com/bok/patterns#pattern-incident-pipeline)

How a provider watches a system after release: the data it collects, the metrics and thresholds, the
triggers and the actions they fire, and how findings feed incidents, risk and retraining. Part of
the technical documentation for a high-risk system.

## How to use it

- **Who fills it:** The provider's model owner and model risk; for procured systems, ask the
  provider for theirs and link it from the deployment decision record.
- **When:** Before release, as part of the technical documentation; revise it after incidents and at
  each review.
- **How it becomes evidence:** Each metric runs as a telemetry control that writes evidence records,
  so the plan's status is a query, not a report.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `plan_id` (required)

Identifier of the plan.

Answer:

### `subject` (required)

The governed object as registry id and version, "id@version" (for example "csa-01@2026-09-18"). The
key every record is filed against. Format: `id@version`.

Answer:

### `scope`

What the plan covers, including deployers whose data flows back.

Answer:

### `data_sources` (required)

Data collected actively and systematically after release. Evidences: `EU AI Act Art. 72`.

Add one entry per item. Each entry has:

- `source` (required): Source.
- `type` (required): Kind of source. One of: `telemetry`, `deployer_feedback`, `user_complaint`,
  `incident`, `eval_rerun`, `audit`, `other`.
- `owner`: Who owns the feed.

### `metrics` (required)

Metrics, thresholds and cadence. Evidences: `NIST AI RMF MEASURE 3.1`.

Add one entry per item. Each entry has:

- `metric` (required): Metric.
- `threshold` (required): Alert threshold.
- `cadence` (required): How often it is computed.
- `failure_mode`: Failure mode it watches.
- `alert_route`: Where alerts go.

### `drift_signals`

Input, prediction or outcome drift signals watched. A list.

Answer:

### `triggers` (required)

Triggers and the action each fires. Evidences: `NIST AI RMF MANAGE 4.1`.

Add one entry per item. Each entry has:

- `condition` (required): Condition that fires.
- `action` (required): Action. One of: `investigate`, `recalibrate`, `retrain`, `rollback`,
  `suspend`, `open_incident`, `notify_deployers`.
- `owner` (required): Who acts.

### `feedback_channels`

How users, deployers and affected persons report problems. A list. Evidences:
`NIST AI RMF MEASURE 3.3`.

Answer:

### `incident_process`

Link to the incident process the plan feeds. Format: URL. Evidences: `EU AI Act Art. 73`.

Answer:

### `retraining_policy`

When retraining happens; a retrained model goes through the release gate as a new version.

Answer:

### `review_cadence` (required)

How often the plan and its findings are reviewed.

Answer:

### `owner` (required)

Accountable role.

Answer:

### `effective_from`

Date the plan applies from. Format: date, `YYYY-MM-DD`.

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
