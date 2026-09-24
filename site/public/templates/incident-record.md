# Template: AI incident record (v1)

> Human template for the `incident-record` JSON Schema. Fill it in as a document, or produce the
> same fields as JSON and validate them against the schema. Illustrative, not a claim of conformity,
> and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/incident-record.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/incident-record.example.json
- **Evidences:** `EU AI Act Art. 73` · `EU AI Act Art. 55(1)(c)` · `EU AI Act Art. 26(5)` ·
  `EU AI Act Art. 72` · `GPAI Code of Practice, Safety and Security, Commitment 9` ·
  `ISO/IEC 42001 10.2` · `NIST AI RMF MANAGE 4.3` · `NIST AI RMF MANAGE 2.3`
- **Stack layer:** 05 Assurance & Continuous Compliance · 04 Runtime Controls & Observability
- **Patterns:**
  - [Incident Pipeline](https://aigovernanceengineer.com/bok/patterns#pattern-incident-pipeline)
  - [Kill Switch / Circuit Breaker](https://aigovernanceengineer.com/bok/patterns#pattern-kill-switch--circuit-breaker)

One AI incident or hazard, from detection to closure. Field names follow the Commission reporting
template for serious incidents involving general-purpose AI models with systemic risk and the OECD
common reporting framework for AI incidents (see x-aligns-with on each field), so a report can be
generated from the record rather than retyped. Adds the internal fields the pipeline needs:
reporting clocks, containment, root cause and links.

## How to use it

- **Who fills it:** The incident owner; the AI governance engineer runs the reporting-clock
  assessment; legal confirms any external report.
- **When:** Open it at detection, update it as facts arrive, close it after the post-incident
  review.
- **How it becomes evidence:** A report for an authority is generated from the record, so the
  internal and external accounts cannot drift; links show which controls changed as a result.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `record_id` (required)

Internal identifier of the incident.

Answer:

### `title` (required)

Short title of the incident. Aligned with: OECD common reporting framework, criterion 1.

Answer:

### `description` (required)

What happened, in a paragraph. Aligned with: OECD common reporting framework, criterion 2.

Answer:

### `ai_systems` (required)

The AI systems or models involved, with versions. A list. Each item: `id@version`. Evidences:
`EU AI Act Art. 73`. Aligned with: Commission GPAI serious-incident template, item 4; OECD common
reporting framework, criterion 8.

Answer:

### `organisations`

Organisations that developed or deployed the systems involved. A list. Aligned with: OECD common
reporting framework, criterion 9.

Answer:

### `ai_system_relation` (required)

How the AI system relates to the incident. One or more of: `direct_cause`, `contributing_factor`,
`failure_to_act`, `overreliance_or_intentional_misuse`, `human_error`,
`failure_to_comply_with_legal_frameworks`, `other`. Aligned with: OECD common reporting framework,
criterion 3.

Answer:

### `submitter` (required)

Who submits the record or report. Aligned with: Commission GPAI serious-incident template, item 10;
OECD common reporting framework, criterion 4.

- `submitter_type` (required): Who is reporting. One of: `provider`, `authorised_representative`,
  `deployer`, `user`, `affected_person`, `authority`, `other`.
- `organisation` (required): Organisation name.
- `contact_role`: Contact role (not a personal name in shared records).
- `contact_email`: Contact mailbox, preferably a team address. Format: email address.

### `start_date`

When the incident started, or the best approximation. Format: date, `YYYY-MM-DD`. Aligned with:
Commission GPAI serious-incident template, item 1; OECD common reporting framework, criterion 5.

Answer:

### `end_date`

When it ended, or the best approximation; omit while ongoing. Format: date, `YYYY-MM-DD`. Aligned
with: Commission GPAI serious-incident template, item 1.

Answer:

### `detected_at`

When the organisation detected it. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

Answer:

### `countries`

Countries where it occurred (ISO 3166 codes). A list. Aligned with: OECD common reporting framework,
criterion 6.

Answer:

### `supporting_materials` (required)

Evidence about the incident: logs, traces, screenshots, reports. A list. Each item: URL. Aligned
with: OECD common reporting framework, criterion 7.

Answer:

### `evidence_available`

Description of the evidence available setting out the AI system's involvement. Aligned with:
Commission GPAI serious-incident template, item 5.

Answer:

### `severity` (required)

Severity class. A hazard is an event that could have led to harm; an incident is one that did. One
of: `hazard`, `serious_hazard`, `incident`, `serious_incident`, `disaster`, `other`. Aligned with:
OECD common reporting framework, criterion 10.

Answer:

### `harm_types` (required)

Types of harm caused or threatened. One or more of: `physical`, `psychological`, `reputational`,
`economic_property`, `environmental`, `public_interest_critical_infrastructure`,
`human_or_fundamental_rights`, `other`. Aligned with: OECD common reporting framework, criterion 11.

Answer:

### `resulting_harm`

The resulting harm and the victim or affected group. Aligned with: Commission GPAI serious-incident
template, item 2.

Answer:

### `harm_quantification`

Quantification of harm, where applicable. Aligned with: OECD common reporting framework, criterion
12.

- `economic_loss`: Economic loss, in `currency`. Format: number.
- `currency`: ISO 4217 code.
- `deaths`: Deaths. Format: whole number.
- `injuries`: Injuries. Format: whole number.
- `affected_count`: Number of people affected. Format: whole number.
- `other`: Other quantification.

### `unintended_use`

Whether the incident is linked to use in an unintended or wrongful way. Aligned with: OECD common
reporting framework, criterion 13.

- `linked` (required): Whether the incident is linked to this factor. Format: `true` or `false`.
- `how`: How, in a sentence.

### `affected_stakeholders`

Stakeholder groups affected. One or more of: `consumers`, `children`, `workers`, `trade_unions`,
`business`, `government`, `civil_society`, `general_public`, `other`. Aligned with: OECD common
reporting framework, criterion 14.

Answer:

### `rights_impacts`

Adverse impacts on human rights or fundamental rights, if any. Aligned with: OECD common reporting
framework, criterion 15.

Answer:

### `associated_ai_principles`

AI principles the incident relates to (for example accountability, fairness, privacy, robustness,
safety, transparency). A list. Aligned with: OECD common reporting framework, criterion 16.

Answer:

### `industries`

Industries (ISIC classification where possible). A list. Aligned with: OECD common reporting
framework, criterion 17.

Answer:

### `business_functions`

Business functions where it occurred (for example citizen or customer service). A list. Aligned
with: OECD common reporting framework, criterion 18.

Answer:

### `critical_infrastructure`

Link to critical functions or infrastructure. Aligned with: OECD common reporting framework,
criterion 19.

- `affected` (required): Whether critical functions or infrastructure were affected. Format: `true`
  or `false`.
- `sectors`: Sectors. A list.

### `deployment_breadth`

How widely the system was deployed. One of: `pilot`, `narrow`, `broad`, `widespread`, `other`.
Aligned with: OECD common reporting framework, criterion 20.

Answer:

### `training_data_link`

Whether the training data is implicated. Aligned with: OECD common reporting framework, criterion
21.

- `linked` (required): Whether the incident is linked to this factor. Format: `true` or `false`.
- `how`: How, in a sentence.

### `model_link`

Whether the model itself is implicated. Aligned with: OECD common reporting framework, criterion 22.

- `linked` (required): Whether the incident is linked to this factor. Format: `true` or `false`.
- `how`: How, in a sentence.

### `usage_rights`

Usage rights of the system or model (for example proprietary licence, open weights). Aligned with:
OECD common reporting framework, criterion 23.

Answer:

### `multiple_systems_interaction`

Whether the interaction of several AI systems is implicated. Aligned with: OECD common reporting
framework, criterion 24.

- `linked` (required): Whether the incident is linked to this factor. Format: `true` or `false`.
- `how`: How, in a sentence.

### `tasks`

Tasks of the AI system (for example interaction support, recognition, forecasting, content
generation, goal-driven organisation). A list. Aligned with: OECD common reporting framework,
criterion 25.

Answer:

### `max_autonomy_level`

Highest autonomy of the system: no-action (human support), low-action (human-in-the-loop),
medium-action (human-on-the-loop), high-action (human-out-of-the-loop). One of: `no_action`,
`low_action`, `medium_action`, `high_action`, `other`. Aligned with: OECD common reporting
framework, criterion 26.

Answer:

### `chain_of_events`

The chain of events that led, directly or indirectly, to the incident. Aligned with: Commission GPAI
serious-incident template, item 3.

Answer:

### `containment`

Containment. Evidences: `NIST AI RMF MANAGE 2.4`.

- `kill_switch_used` (required): Whether the kill switch or circuit breaker was used. Format: `true`
  or `false`.
- `contained_at`: When the harm stopped growing. Format: date and time, RFC 3339
  (`2026-09-24T10:00:00Z`).
- `actions`: What was done to contain it.

### `response`

What the organisation intends to do or has done in response. Aligned with: Commission GPAI
serious-incident template, item 6.

Answer:

### `actions_taken`

Actions taken, by kind. Aligned with: OECD common reporting framework, criterion 27.

Add one entry per item. Each entry has:

- `type` (required): Kind of action. One of: `prevention`, `mitigation`, `ceasing`, `remediation`,
  `other`.
- `description` (required): The action.
- `taken_at`: When. Format: date, `YYYY-MM-DD`.

### `recommendation`

What the organisation recommends authorities or other parties do, if anything. Aligned with:
Commission GPAI serious-incident template, item 7.

Answer:

### `root_cause_analysis`

Root cause analysis. Evidences: `EU AI Act Art. 73(6)`. Aligned with: Commission GPAI
serious-incident template, item 8.

- `method` (required): Method used. One of: `five_whys`, `fault_tree`, `fishbone`,
  `timeline_review`, `other`.
- `outputs_involved`: The outputs that led to the incident and what contributed to their generation,
  including inputs.
- `cause_category` (required): Primary cause category. One of: `brittleness`, `robustness`,
  `data_quality`, `insufficient_testing`, `drift`, `misaligned_objective`, `oversight_failure`,
  `security_attack`, `misuse`, `other`.
- `contributing_factors`: Contributing factors. A list.
- `mitigations_failed_or_circumvented`: Controls that failed or were circumvented. A list.
- `control_that_would_have_caught_it`: The control or pattern that would have caught it earlier.

### `post_market_monitoring_patterns`

Patterns seen in post-market monitoring that are plausibly connected, such as near misses. Aligned
with: Commission GPAI serious-incident template, item 9.

Answer:

### `steps_to_reproduce`

Steps to reproduce, where applicable and safe to share. Aligned with: OECD common reporting
framework, criterion 28.

Answer:

### `additional_information`

Anything else relevant. Aligned with: OECD common reporting framework, criterion 29.

Answer:

### `reporting` (required)

Reporting assessment and clocks. Evidences: `EU AI Act Art. 73`.

- `became_aware_at` (required): When the organisation became aware of the incident. Reporting clocks
  start here. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).
- `causal_link_established_at`: When a causal link, or its reasonable likelihood, was established.
  Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).
- `obligations` (required): Each regime assessed, with its clock and submission. Evidences:
  `EU AI Act Art. 73` · `EU AI Act Art. 55(1)(c)`.
  Each entry has:
  - `regime` (required): Reporting regime assessed. One of: `eu_ai_act_art_73`, `eu_ai_act_art_55`,
    `gdpr_personal_data_breach`, `sector_regulator`, `contractual`, `internal_only`, `other`.
  - `required` (required): Whether a report is required under this regime. Format: `true` or
    `false`.
  - `rationale`: Why it is or is not required.
  - `deadline_at`: Deadline computed by the reporting clock. Format: date and time, RFC 3339
    (`2026-09-24T10:00:00Z`).
  - `report_type`: Kind of report submitted. One of: `initial`, `intermediate`, `final`, `complete`.
  - `submitted_at`: When submitted. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).
  - `authority`: Recipient authority.
  - `reference`: Reference returned by the recipient.

### `links`

Links to the records the incident changed. Evidences: `NIST AI RMF MANAGE 4.3`.

- `risk_register_entries`: Risk ids re-scored because of this incident. A list.
- `eval_suites_added`: Eval suites or cases added so it cannot recur silently. A list.
- `policy_cards_changed`: Policy cards changed. A list.

### `owner`

Incident owner.

Answer:

### `status` (required)

Status. One of: `open`, `contained`, `resolved`, `closed`.

Answer:

### `closed_at`

When closed after the post-incident review. Format: date and time, RFC 3339
(`2026-09-24T10:00:00Z`).

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
