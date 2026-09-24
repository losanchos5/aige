# AI policy (template, v1.0.0)

> The prose view of `ai-policy.yaml`. Every section below names the YAML key it is written from and,
> for rules, the `ai-policy.rego` rule that enforces it and the record that evidences it. Edit the
> YAML first; this document and the Rego follow it. Illustrative, not a claim of conformity, and not
> legal advice.

- **Source of truth:** https://aigovernanceengineer.com/templates/ai-policy.yaml
- **Executable skeleton:** https://aigovernanceengineer.com/templates/ai-policy.rego
- **Evidences:** `ISO/IEC 42001 5.2` · `ISO/IEC 42001 A.2` · `NIST AI RMF GOVERN 1.2` ·
  `NIST AI RMF GOVERN 1.4` · `EU AI Act Art. 17`
- **Stack layer:** 01 Govern-as-Code
- **Pattern:** [Policy Card](https://aigovernanceengineer.com/bok/patterns#pattern-policy-card)

## How the three files map

| YAML key | Prose section | Rego | Record that evidences it |
|---|---|---|---|
| `policy` | 1. Purpose and authority | `policy_version` | Approval of this document |
| `scope` | 2. Scope | (input selection) | Register entries |
| `principles` | 3. Principles | (none: design guidance) | Design records |
| `roles` | 4. Roles | (none) | `committee-charter.md`, `raci.csv` |
| `rules[*]` | 5. Rules | `deny` / `require_approval` messages prefixed with the rule id | The records listed per rule |
| `exceptions` | 6. Exceptions | (signed verdict override) | Evidence record with an expiry |
| `review` | 7. Review | (none) | Committee minutes |

A rule whose `rego` key is `null` is a process control: it is evidenced by records, not decided by
the engine. Every engine evaluation emits a verdict (`rule_id`, `decision`, `input_hash`,
`timestamp`) in the shape of the Policy Card pattern.

## 1. Purpose and authority

_From `policy`._ This policy sets the rules for building, buying and running AI in the organisation
and says how each rule is enforced and evidenced. It is owned by the AI governance committee,
approved by the board risk committee, applies from 2026-10-01 and is reviewed by 2027-10-01.

## 2. Scope

_From `scope`._ It applies to every AI system, model and agent the organisation builds, buys or
runs, and to generative AI tools staff and contractors use for work. It does not apply to research
sandboxes that use only synthetic or public data and have no production access.

- An **AI system** infers from its inputs how to generate outputs such as predictions, content,
  recommendations or decisions.
- An **agent** is an AI system that can take actions through tools on its own initiative.
- A **record** is a structured document that validates against a schema in the templates library.

## 3. Principles

_From `principles`._ Controls are designed to these six principles:

1. Build each control at the earliest point where it can block.
2. Give every control teeth; a control that cannot fail a build or stop an action is advice.
3. Register and bound every actor before it acts.
4. Instrument the build to produce its own proof.
5. Start every control from a named failure mode or harm.
6. Make the governed path the easiest path.

## 4. Roles

_From `roles`._ The AI governance committee approves this policy, high and critical tier use cases,
exceptions and residual-risk acceptance above an owner's authority (see `committee-charter.md`).
Each AI system has one accountable **system owner**. The **AI governance engineer** implements this
policy as code, runs the gates and maintains the evidence store. The privacy office, security, model
risk and internal audit hold the duties listed in the YAML; `raci.csv` spreads them over the
lifecycle.

## 5. Rules

_From `rules`._ Each rule states the duty, where it is enforced, and what proves it ran.

### 5.1 Register before production (`register-before-production`)

No AI system or agent reaches production without a current register entry naming an owner, a
declared scope and an expiry. Enforced at deploy by `deny` (missing entry, missing field, expired
entry). Evidenced by `ai-system-register-entry` and `agent-register-entry` records.

### 5.2 Classify at intake (`classify-at-intake`)

Every new use of AI is recorded at intake, classified, and routed to the assessments its class
requires before build work starts. Enforced at deploy by `deny` (no approved use-case record).
Evidenced by the `use-case-record`.

### 5.3 Impact assessment before use (`impact-assessment-before-use`)

Each assessment the intake routes a system to (AI impact assessment, DPIA addendum or FRIA) is
approved before first use. Enforced at deploy by `deny`. Evidenced by `impact-assessment` records.

### 5.4 Data admission (`data-admission`)

No dataset enters a training, evaluation or retrieval pipeline without a dataset card and an admit
decision. Enforced pre-merge by `deny` on the `train` action. Evidenced by the `dataset-card` and the
`dataset-admission-record`.

### 5.5 Eval gate (`eval-gate`)

A release ships only if every blocking suite in its test plan has a passing result for that exact
version. Enforced pre-merge and at deploy by `deny`. Evidenced by the `test-plan`, `eval-result`
records and the `test-report`.

### 5.6 Go/no-go (`go-no-go`)

High and critical tier releases need a signed go or conditional-go decision for that exact version.
Enforced at deploy by `deny`. Evidenced by the `go-no-go` record.

### 5.7 Agents stay bounded (`agents-bounded-spend`)

Agents act only through registered tools and operations, while active, and within their spend limit;
anything above the limit needs a human approval. Enforced at runtime by `deny` and
`require_approval`. Evidenced by the `agent-register-entry`, the `policy-card` and the evidence
records each decision writes.

### 5.8 Competent oversight (`oversight-competence`)

Only people with a current training record for a system may approve, override or stop its outputs.
Enforced at runtime by `deny`. Evidenced by `training-record` records.

### 5.9 Sanctioned generative AI tools (`sanctioned-genai-tools`)

Staff use only approved generative AI tools, and never enter confidential or restricted data into a
tool not approved for that class. Enforced at runtime (for example at a gateway) by `deny`.
Evidenced by training records (acceptable-use attestation) and gateway evidence records.

### 5.10 Vendor due diligence (`vendor-due-diligence`)

No third-party AI product is bought or renewed without an assessed, in-date due-diligence response,
with its conditions written into the contract. Enforced at procurement by `deny`. Evidenced by the
`vendor-due-diligence-response` and `contract-clause-checklist.md`.

### 5.11 Incident handling (`incident-handling`)

Any harm, near miss or out-of-policy action involving an AI system is recorded as an incident within
one working day and assessed against every reporting regime. A process control (`rego: null`).
Evidenced by `incident-record` and `risk-register-entry` records.

### 5.12 Decommission by runbook (`decommission-by-runbook`)

Systems are retired by runbook, with identity revoked, the register entry retired, evidence archived
and data disposed of. A process control (`rego: null`). Evidenced by the `decommissioning-runbook`.

## 6. Exceptions

_From `exceptions`._ A system owner may request an exception; the AI governance committee may grant
it for at most 90 days. An exception is recorded as a signed verdict override with an expiry, so it
lapses on its own.

## 7. Review

_From `review`._ The policy is reviewed every year and also after a change in law or in a standard
the organisation relies on, a serious incident, an internal audit finding against this policy, or a
new class of AI use.

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
