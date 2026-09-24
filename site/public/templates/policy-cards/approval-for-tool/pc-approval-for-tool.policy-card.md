# Policy Card: Human approval for a named tool

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.
> Generated with the Policy Card builder (https://aigovernanceengineer.com/toolkit/policy-card);
> the executable modules are authoritative over this text.

| Field | Value |
|---|---|
| Card | `pc-approval-for-tool` version 1.0.0 |
| Owner | ai-governance-engineering |
| Applies to | `agent:*` |
| Source policy | `ai-policy.yaml#rules/agents-bounded-spend` |
| Effective from | 2026-10-01 |
| Review by | 2027-04-01 |
| Approval | Pending: to be approved by ai-governance-committee |

## Rule `tools.approval-required.v1`

- **Statement:** An agent calls refunds-api (create_refund) only with a recorded approval by a person other than the agent.
- **Effect:** `require_approval`: when the condition holds, the action waits for a human decision.
- **Condition:** an agent calls refunds-api (create_refund) and the request carries no approval, or the approval was not given or was given by the agent itself.
- **Failure mode addressed:** An agent takes a consequential action through a tool with no human in the loop.
- **Enforced at:** `runtime`
- **Implementation:**
  - OPA/Rego module `policies/pc-approval-for-tool.rego`, entrypoint `data.aige.cards.pc_approval_for_tool.verdict`
  - Rego tests `policies/pc-approval-for-tool_test.rego`
  - Cedar stub `policies/pc-approval-for-tool.cedar`, tests `policies/pc-approval-for-tool.cedartests.json`
  - CI hook `.github/workflows/policy-card-pc-approval-for-tool.yml`

## Obligations this rule helps evidence

| Id | Obligation | Status |
|---|---|---|
| [AIGE-OBL-EUAIA-ART14](https://aigovernanceengineer.com/obligations/aige-obl-euaia-art14) | EU AI Act Art. 14 human oversight | Deferred |
| [AIGE-OBL-OWASP-AGENTIC](https://aigovernanceengineer.com/obligations/aige-obl-owasp-agentic) | Top 10 for Agentic Applications 2026 | Voluntary |
| [AIGE-OBL-CSA-AICM-AGENTIC](https://aigovernanceengineer.com/obligations/aige-obl-csa-aicm-agentic) | AICM Agentic Control Supplement (proposed agent controls) | Draft or proposed |

Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it
does not discharge it.

## Exceptions

Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.

## Verdict

Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the
caller signs and writes to the evidence store, in the shape of
`policy-card.v1.json#/$defs/verdict`: the `verdict` rule of `policies/pc-approval-for-tool.rego`.

---

Pattern: [Policy Card](https://aigovernanceengineer.com/patterns/policy-card) · Builds on: [Human-in-the-loop Gate](https://aigovernanceengineer.com/patterns/human-in-the-loop-gate) · Schema: https://aigovernanceengineer.com/schemas/policy-card.v1.json
