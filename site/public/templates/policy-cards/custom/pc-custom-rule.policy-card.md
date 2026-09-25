# Policy Card: Custom rule

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-custom-rule` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `system:*` |
| Source policy | `ai-policy.yaml#rules/classify-at-intake` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `custom.rule.v1`

- **Statement:** No system whose risk tier is classed as prohibited is deployed.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** for deploy, system.risk_tier equals prohibited.
- **Failure mode addressed:** A system in a prohibited-practice class reaches production.
- **Enforced at:** `pre_merge`, `deploy`
- **Implementation:**
  - OPA/Rego module `policies/pc-custom-rule.rego`, entrypoint `data.aige.cards.pc_custom_rule.verdict`
  - Rego tests `policies/pc-custom-rule_test.rego`
  - Cedar stub `policies/pc-custom-rule.cedar`, tests `policies/pc-custom-rule.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-custom-rule.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-EUAIA-ART5](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art5) | EU AI Act Art. 5 prohibited practices (incl. new NCII and CSAM bans) | In force |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-custom-rule.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
