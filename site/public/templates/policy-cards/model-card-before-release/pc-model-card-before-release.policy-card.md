# Policy Card: Model card before release

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-model-card-before-release` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `model:*` |
| Source policy | `ai-policy.yaml#principles/self-proving` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `docs.model-card-present.v1`

- **Statement:** A version merges or is released only if a model card for that exact version is present, with the sections intended_use, limitations, evaluation.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** the model card is missing, describes another version or lacks one of intended_use, limitations, evaluation.
- **Failure mode addressed:** A model ships without the documentation that deployers and reviewers need to use it within its limits.
- **Enforced at:** `pre_merge`, `deploy`
- **Implementation:**
  - OPA/Rego module `policies/pc-model-card-before-release.rego`, entrypoint `data.aige.cards.pc_model_card_before_release.verdict`
  - Rego tests `policies/pc-model-card-before-release_test.rego`
  - Cedar stub `policies/pc-model-card-before-release.cedar`, tests `policies/pc-model-card-before-release.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-model-card-before-release.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-EUAIA-ART11](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art11) | EU AI Act Art. 11 technical documentation (Annex IV) | Deferred |
| [AIGE-OBL-EUAIA-ART13](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art13) | EU AI Act Art. 13 transparency and information to deployers | Deferred |
| [AIGE-OBL-ISO42001-A8](https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a8) | A.8 Information for interested parties | Voluntary |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-model-card-before-release.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Builds on: [Model Card as Control Evidence](https://aigovernanceengineer.com/patterns/model-card-as-control-evidence) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
