# Policy Card: Eval score gate before deploy

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-eval-score-gate` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `tier:high`, `tier:critical` |
| Source policy | `ai-policy.yaml#rules/eval-gate` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `evals.min-score.v1`

- **Statement:** A version merges or deploys only if its safety-core eval result for that exact version scores at least 0.90.
- **Effect:** `deny`: when the condition holds, the action is blocked.
- **Condition:** there is no safety-core result for the exact system version, or a result scores below 0.90.
- **Failure mode addressed:** A regressed model version ships because nothing checked the eval result for that exact version.
- **Enforced at:** `pre_merge`, `deploy`
- **Implementation:**
  - OPA/Rego module `policies/pc-eval-score-gate.rego`, entrypoint `data.aige.cards.pc_eval_score_gate.verdict`
  - Rego tests `policies/pc-eval-score-gate_test.rego`
  - Cedar stub `policies/pc-eval-score-gate.cedar`, tests `policies/pc-eval-score-gate.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-eval-score-gate.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-EUAIA-ART15](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art15) | EU AI Act Art. 15 accuracy, robustness and cybersecurity | Deferred |
| [AIGE-OBL-NISTRMF-MEASURE](https://aigovernanceengineer.com/obligations/aige-obl-nistrmf-measure) | MEASURE | Voluntary |
| [AIGE-OBL-ISO42001-A6](https://aigovernanceengineer.com/obligations/aige-obl-iso42001-a6) | A.6 AI system life cycle | Voluntary |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-eval-score-gate.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Builds on: [Eval Gate in CI](https://aigovernanceengineer.com/patterns/eval-gate-in-ci) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
