# Policy Card: Registered agents only

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-registered-agents-only` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `agent:*` |
| Source policy | `ai-policy.yaml#rules/register-before-production` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `agents.registered-only.v1`

- **Statement:** No agent runs in production unless it has an active entry in the agent registry, with an owner and an expiry that has not passed.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** in production, the agent has no registry entry, or its entry is not active, names no owner, has no expiry or has expired.
- **Failure mode addressed:** An agent that nobody owns or bounded acts in production (a shadow agent).
- **Enforced at:** `deploy`, `runtime`
- **Implementation:**
  - OPA/Rego module `policies/pc-registered-agents-only.rego`, entrypoint `data.aige.cards.pc_registered_agents_only.verdict`
  - Rego tests `policies/pc-registered-agents-only_test.rego`
  - Cedar stub `policies/pc-registered-agents-only.cedar`, tests `policies/pc-registered-agents-only.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-registered-agents-only.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-EUAIA-ART49-71](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art49-71) | EU AI Act Art. 49/71 registration of high-risk systems in the EU database | Deferred |
| [AIGE-OBL-NIST-AGENTS](https://aigovernanceengineer.com/obligations/aige-obl-nist-agents) | NIST AI Agent Standards Initiative (2026) | Draft or proposed |
| [AIGE-OBL-OWASP-AGENTIC](https://aigovernanceengineer.com/obligations/aige-obl-owasp-agentic) | Top 10 for Agentic Applications 2026 | Voluntary |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-registered-agents-only.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Builds on: [Agent Registry](https://aigovernanceengineer.com/patterns/agent-registry) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
