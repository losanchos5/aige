# Template: Agent register entry (v1)

> Human template for the `agent-register-entry` JSON Schema. Fill it in as a document, or produce
> the same fields as JSON and validate them against the schema. Illustrative, not a claim of
> conformity, and not legal advice.

- **Schema:** https://aigovernanceengineer.com/schemas/agent-register-entry.v1.json
- **Filled example:** https://aigovernanceengineer.com/schemas/examples/agent-register-entry.example.json
- **Evidences:** `EU AI Act Art. 14` · `EU AI Act Art. 12` · `EU AI Act Art. 26` ·
  `ISO/IEC 42001 A.6` · `ISO/IEC 42001 A.9` · `NIST AI RMF GOVERN 1.6` · `NIST AI RMF MANAGE 2.4`
- **Stack layer:** 02 Inventory & Transparency · 04 Runtime Controls & Observability
- **Patterns:**
  - [Agent Registry](https://aigovernanceengineer.com/bok/patterns#pattern-agent-registry)
  - [Agent Identity & Scoped Credentials](https://aigovernanceengineer.com/bok/patterns#pattern-agent-identity--scoped-credentials)
  - [Kill Switch / Circuit Breaker](https://aigovernanceengineer.com/bok/patterns#pattern-kill-switch--circuit-breaker)

One entry in the agent registry: a non-human actor with an owner, a declared scope, a workload
identity, bounded tools and a kill switch. Same core as the registry entry in chapter 05 (id,
version, owner, scope, expiry), with the fields runtime controls need.

## How to use it

- **Who fills it:** The owning team registers the agent; the platform team issues its identity from
  the entry.
- **When:** Before the agent gets any credential; on every version change; before `expiry`.
- **How it becomes evidence:** Unregistered agents get no identity. Renewal, suspension and
  kill-switch drills each emit an evidence record against `id@version`.

## Fields

Keep the field names: they are the keys of the JSON record, so a filled template converts to JSON
without mapping. Fields marked required must be present for the record to validate. Write roles, not
personal names. In JSON, add `"$schema"` with the schema URL above as the first key.

### `id` (required)

Stable agent identifier (for example "csa-01"). Evidences: `NIST AI RMF GOVERN 1.6`.

Answer:

### `version` (required)

Version of the agent (prompt, model, tools and policies) this entry describes.

Answer:

### `owner` (required)

Accountable owning team. Ownerless agents lose their identity.

Answer:

### `scope` (required)

Declared scope as permission strings (for example "refunds:read"). The identity provider issues
nothing wider. A list. Evidences: `ISO/IEC 42001 A.9`.

Answer:

### `expiry` (required)

Date after which the entry, and with it the agent's workload identity, lapses unless renewed.
Format: date, `YYYY-MM-DD`. Evidences: `NIST AI RMF GOVERN 1.6`.

Answer:

### `name`

Human-readable name.

Answer:

### `purpose`

What the agent is for, in one sentence. Evidences: `NIST AI RMF MAP 1.1`.

Answer:

### `parent_system`

Registry id of the AI system the agent belongs to, if any.

Answer:

### `base_models`

Registry ids or vendor model identifiers the agent runs on. A list. Evidences: `EU AI Act Art. 11`.

Answer:

### `workload_identity`

The non-human identity the agent authenticates with. Evidences: `ISO/IEC 42001 A.9`.

- `type` (required): Kind of identity issued. One of: `spiffe`, `oidc_client`, `service_account`,
  `other`.
- `identifier` (required): The identity string (for example a SPIFFE ID).
- `issuer`: Who issues and rotates the credential.
- `credential_ttl_seconds`: Lifetime of an issued credential, in seconds. Short-lived by default.
  Format: whole number.

### `tools`

Tools the agent may call, each bounded. A tool not listed is denied. Evidences: `EU AI Act Art. 14`
· `ISO/IEC 42001 A.9`.

Add one entry per item. Each entry has:

- `name` (required): Tool or API name.
- `operations` (required): Operations allowed on the tool. A list.
- `requires_approval`: Whether each call needs a human approval (human-in-the-loop gate). Format:
  `true` or `false`.
- `limits`: Rate, amount or time limits enforced at the tool boundary.

### `data_access`

Data the agent can reach, by class.

Add one entry per item. Each entry has:

- `domain` (required): Data domain or store.
- `classification` (required): Highest data class reachable. One of: `public`, `internal`,
  `confidential`, `restricted`.
- `access` (required): Access mode. One of: `read`, `write`, `read_write`.

### `delegation`

Delegation limits. Delegated agents need their own entries.

- `can_spawn_agents` (required): Whether the agent may create sub-agents. Format: `true` or `false`.
- `can_delegate_to`: Registry ids of agents it may delegate to. A list.

### `autonomy_level`

Highest level of autonomy the agent is allowed. One of: `suggest_only`, `act_with_approval`,
`act_and_report`, `act_autonomously`. Evidences: `EU AI Act Art. 14` · `NIST AI RMF MAP 3.5`.

Answer:

### `human_oversight`

How humans oversee the agent. Evidences: `EU AI Act Art. 14` · `EU AI Act Art. 26(2)`.

- `mode` (required): Oversight mode. One of: `human_in_the_loop`, `human_on_the_loop`,
  `human_in_command`.
- `approval_required_for`: Actions that always need a human approval. A list.
- `overseer_role`: Role that oversees the agent. Its members need a current training record.

### `spend_limit`

Budget the agent can commit or move.

- `currency` (required): ISO 4217 currency code.
- `amount` (required): Maximum spend or value moved per period. Format: number.
- `period` (required): Period the limit applies to. One of: `per_action`, `per_hour`, `per_day`,
  `per_month`.

### `kill_switch`

The stop control and when it was last exercised. Evidences: `EU AI Act Art. 14` ·
`NIST AI RMF MANAGE 2.4`.

- `mechanism` (required): How the agent is stopped (for example "revoke identity and drain queue").
- `owner` (required): Who can pull it.
- `last_drill`: Date of the last tested stop. Format: date, `YYYY-MM-DD`.

### `runtime_policies`

Ids of the policy cards evaluated at runtime for this agent. A list.

Answer:

### `eval_suites`

Ids of the eval suites that gate its releases. A list. Evidences: `EU AI Act Art. 15`.

Answer:

### `logging`

Where the agent's action log is written, and its retention. Evidences: `EU AI Act Art. 12`.

Answer:

### `status`

Current status. Only "active" agents hold a live identity. One of: `active`, `suspended`, `expired`,
`retired`.

Answer:

### `registered_at`

When the entry was first written. Format: date and time, RFC 3339 (`2026-09-24T10:00:00Z`).

Answer:

### `public_record`

Optional. What a public register or transparency record asks for that the internal entry does not:
the responsible organisation, a contact, a plain-language description and the registration details.
One source record then feeds a UK ATRS record, a Canada AIA, an EU database registration (Annex VIII)
and a model or system card; the field crosswalk and a builder are at
https://aigovernanceengineer.com/toolkit/ai-register-entry. Evidences: `EU AI Act Art. 49` ·
`EU AI Act Art. 71` · `EU AI Act Annex VIII`.

- `organisation`: Organisation responsible for the system (the provider or the deployer), as a
  public record names it.
- `address`: The organisation's address and other contact details, where a register asks for them.
- `contact_email`: Contact address of the team or organisation responsible: a role mailbox, not a
  person. Format: email.
- `website_url`: Public page with more information about the system. Format: URL.
- `one_sentence_description`: The system in one plain-language sentence (at most 300 characters).
- `description`: Plain-language overview for the public: what the system is and why it is used.
- `data_and_logic`: Basic, concise description of the information the system uses (data, inputs)
  and of its operating logic. Evidences: `EU AI Act Annex VIII`.
- `trade_name`: Trade name and any additional unambiguous reference that identifies and traces the
  system.
- `market_status`: Status of the system on the market or in service. One of: `not_yet_placed`,
  `on_the_market`, `in_service`, `withdrawn`, `recalled`. Evidences: `EU AI Act Annex VIII`.
- `region`: Primary region or area whose public the system affects.
- `authorised_representative`: Name and contact details of the authorised representative, where one
  is required.
- `certificate`: Type, number and expiry date of any notified-body certificate, with the notified
  body's name or number.
- `declaration_of_conformity`: Link to the EU declaration of conformity, where one exists. Format:
  URL.
- `instructions_for_use`: Link to the electronic instructions for use. Format: URL.

### `extensions`

Organisation-specific fields. Validators ignore their content; keep evidence-bearing fields in the
core record.

Answer:

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
