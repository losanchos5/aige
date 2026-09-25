# Policy Card: No personal data to external models

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-no-personal-data-external` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `model-gateway:*` |
| Source policy | `ai-policy.yaml#rules/sanctioned-genai-tools` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `data.no-personal-data-external.v1`

- **Statement:** No request that carries personal, special_category data is sent to a model hosted outside the organisation; a request without a data classification is treated as carrying it.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** the model is not hosted internally and the request carries one of personal, special_category, or carries no data classification.
- **Failure mode addressed:** Personal data leaves the organisation in a prompt to a third-party model.
- **Enforced at:** `runtime`
- **Implementation:**
  - OPA/Rego module `policies/pc-no-personal-data-external.rego`, entrypoint `data.aige.cards.pc_no_personal_data_external.verdict`
  - Rego tests `policies/pc-no-personal-data-external_test.rego`
  - Cedar stub `policies/pc-no-personal-data-external.cedar`, tests `policies/pc-no-personal-data-external.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-no-personal-data-external.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-ISO42001-A7](https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a7) | A.7 Data for AI systems | Voluntary |
| [AIGE-OBL-ISO42001-A10](https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a10) | A.10 Third-party and customer relationships | Voluntary |
| [AIGE-OBL-OWASP-LLM](https://aigovernanceengineer.com/obligations/aige-obl-owasp-llm) | Top 10 for LLM Applications 2026 | Voluntary |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-no-personal-data-external.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Builds on: [Runtime Guardrail](https://aigovernanceengineer.com/patterns/runtime-guardrail) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
