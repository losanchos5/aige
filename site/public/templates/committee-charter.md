# AI governance committee charter (template, v1)

> A charter for the forum that owns the AI policy and takes the decisions the policy reserves to it.
> Replace the bracketed values, delete what does not apply, and have the charter approved by the
> body that delegates the authority. Illustrative, not a claim of conformity, and not legal advice.

- **Evidences:** `ISO/IEC 42001 5.3` · `ISO/IEC 42001 A.3` · `NIST AI RMF GOVERN 2.1` ·
  `NIST AI RMF GOVERN 2.3` · `EU AI Act Art. 17`
- **Stack layer:** 01 Govern-as-Code
- **Pattern:** [Policy Card](https://aigovernanceengineer.com/bok/patterns#pattern-policy-card)
- **Works with:** `ai-policy.yaml` (the `roles` and `exceptions` keys) and `raci.csv`

## 1. Purpose

The committee makes sure AI in [organisation] is built, bought and run under the AI policy, and that
each decision the policy reserves to it is taken on evidence and leaves a record. It is a decision
forum, not a review queue: routine gates run in the pipeline, and only what the policy escalates
reaches the committee.

## 2. Authority

Delegated by [board or board risk committee] on [date]. The committee may:

- approve, amend and retire the AI policy, subject to ratification by [delegating body];
- approve use cases classified high or critical at intake (`use-case-record`);
- accept residual risk above the system owner's authority (`risk-register-entry`, `acceptance`);
- grant time-limited exceptions to the policy (at most the duration set in `ai-policy.yaml`);
- order the suspension of an AI system or agent, pending review;
- commission internal audits of AI controls.

It may not approve its own exceptions to conflicts of interest, and it does not replace the legal
judgement of counsel or the duties of the data protection officer.

## 3. Membership

| Seat | Role | Voting |
|---|---|---|
| Chair | [executive accountable for AI] | Yes |
| Business | [one or two heads of business units that run AI] | Yes |
| Technology | [CTO or head of engineering] | Yes |
| AI governance | AI governance lead (secretary) | Yes |
| Risk | Head of model risk or enterprise risk | Yes |
| Security | CISO or delegate | Yes |
| Privacy | Data protection officer | Advisory |
| Legal | General counsel or delegate | Advisory |
| Assurance | Head of internal audit | Observer |

Members sit by role. A member with a conflict on an item declares it and does not vote on it.

## 4. Meetings and quorum

- Meets [monthly], and within [five] working days when a serious incident or an urgent suspension
  needs a decision.
- Quorum: the chair or a delegate, plus [four] voting members including risk and AI governance.
- Decisions by consensus; failing that, by majority of voting members present, with dissent
  recorded.

## 5. Inputs

The secretary circulates, at least [three] working days before each meeting, a pack drawn from the
evidence store rather than from slides: open escalations and the records behind them, register
changes since the last meeting, eval and monitoring status for high and critical tier systems,
incidents opened and closed, exceptions due to expire, and audit findings.

## 6. Outputs

- Every decision is written as a signed record against the system it concerns (`subject` =
  `id@version`) and linked from the relevant register entry.
- Minutes list attendance, conflicts declared, decisions, dissent and actions with owners and dates.
- A yearly report to [delegating body] on the AI portfolio, incidents, exceptions and audit results.

## 7. Escalation

Items go to [delegating body] when a decision exceeds the committee's authority, when the committee
cannot reach a decision within [two] meetings, or when a serious incident involves a high-risk system.

## 8. Review of the charter

The charter is reviewed [yearly] with the AI policy, and after any change in the delegation or a
material audit finding on the committee's operation.

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
