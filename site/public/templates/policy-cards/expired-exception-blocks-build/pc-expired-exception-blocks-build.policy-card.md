# Policy Card: Expired exceptions block the build

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-expired-exception-blocks-build` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `repo:*` |
| Source policy | `ai-policy.yaml#exceptions` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `exceptions.no-expired.v1`

- **Statement:** The build fails while any policy exception it relies on has expired, has no grant or expiry date, or runs longer than 90 days.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** an exception has expired, has no grant or expiry date, or runs longer than 90 days.
- **Failure mode addressed:** A temporary exception quietly becomes permanent and the rule it waived stops applying.
- **Enforced at:** `pre_merge`
- **Implementation:**
  - OPA/Rego module `policies/pc-expired-exception-blocks-build.rego`, entrypoint `data.aige.cards.pc_expired_exception_blocks_build.verdict`
  - Rego tests `policies/pc-expired-exception-blocks-build_test.rego`
  - Cedar stub `policies/pc-expired-exception-blocks-build.cedar`, tests `policies/pc-expired-exception-blocks-build.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-expired-exception-blocks-build.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-ISO42001-A2](https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a2) | A.2 Policies related to AI | Voluntary |
| [AIGE-OBL-EUAIA-ART17](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art17) | EU AI Act Art. 17 quality management system | Deferred |
| [AIGE-OBL-NISTRMF-GOVERN](https://aigovernanceengineer.com/obligations/aige-obl-nistrmf-govern) | GOVERN | Voluntary |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-expired-exception-blocks-build.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
