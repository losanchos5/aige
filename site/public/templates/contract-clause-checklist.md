# AI contract clause checklist (template, v1)

> A checklist of the terms an AI supply contract should settle, each tied to the obligation it helps
> the buyer evidence and to the field of the vendor due-diligence response it closes. It lists what
> to secure, not clause wording: have counsel draft the text for your law and your contract. Not
> legal advice. Illustrative, not a claim of conformity.

- **Evidences:** `EU AI Act Art. 25` · `EU AI Act Art. 26` · `GDPR Art. 28` · `ISO/IEC 42001 A.10`
  · `NIST AI RMF GOVERN 6.1` · `NIST AI RMF MANAGE 3.1`
- **Stack layer:** 02 Inventory & Transparency · 05 Assurance & Continuous Compliance
- **Pattern:** [Vendor / Model Due-Diligence Gate](https://aigovernanceengineer.com/bok/patterns#pattern-vendor--model-due-diligence-gate)
- **Works with:** `vendor-due-diligence-response` (schema, example and template)

## How to use it

1. Send the due-diligence questionnaire first; its answers tell you which terms matter most.
2. For each row, mark **In contract**, **Covered elsewhere** (say where) or **Gap**, and note the
   clause reference.
3. Every gap becomes a condition in the `assessment.conditions` field of the due-diligence response,
   or a technical control you run yourself (for example boundary evals on each model update).
4. Recheck on renewal and on any material change: a new model version, a new sub-processor, an
   incident.

## Data and training

| Check | What it secures | Evidences | Closes field | Status | Clause |
|---|---|---|---|---|---|
| Customer inputs and outputs are not used to train or improve the supplier's models, or only with an explicit opt-in | Purpose limitation for your data | `GDPR Art. 28(3)(a)` | `answers.training_on_customer_data` | | |
| Processing only on documented instructions | Controller control over processing | `GDPR Art. 28(3)(a)` | `answers.data_processing` | | |
| Processing and storage locations named; changes need notice | Transfer and residency control | `GDPR Art. 28(3)` | `answers.data_processing.locations` | | |
| Sub-processors listed; new ones notified with a right to object | Chain of processing | `GDPR Art. 28(2)` | `answers.data_processing.subprocessors` | | |
| Retention of prompts, outputs and logs stated and capped | Storage limitation | `GDPR Art. 28(3)(g)` | `answers.data_processing.retention` | | |
| Assistance with data subject requests, including those that touch model inputs and outputs | Rights handling | `GDPR Art. 28(3)(e)` | `open_questions` | | |

## Transparency and documentation

| Check | What it secures | Evidences | Closes field | Status | Clause |
|---|---|---|---|---|---|
| Supplier states its role (provider, GPAI provider, component supplier) and the AI Act classification it relies on, and notifies a change | Allocation of provider and deployer duties | `EU AI Act Art. 25` | `answers.provider_role` | | |
| Written agreement on the information, capabilities and technical access the buyer needs, where the supplier's component goes into a high-risk system | Value-chain information flow | `EU AI Act Art. 25` | `answers.documentation` | | |
| Instructions for use delivered for high-risk systems, and updated with each release | Deployer can use the system as intended | `EU AI Act Art. 13`, `EU AI Act Art. 26(1)` | `answers.documentation.instructions_for_use` | | |
| Documentation for downstream providers delivered for GPAI models | Integration of a GPAI model | `EU AI Act Art. 53(1)(b)` | `answers.documentation.downstream_information` | | |
| Copyright policy and training-content summary available for GPAI models | Provenance of the model's training content | `EU AI Act Art. 53(1)(c)`, `EU AI Act Art. 53(1)(d)` | `answers.copyright_policy`, `answers.training_content_summary` | | |
| Eval and red-team results shared, including for each new model version | Evidence for your own eval gate | `EU AI Act Art. 15` | `answers.evaluations` | | |

## Operation, monitoring and incidents

| Check | What it secures | Evidences | Closes field | Status | Clause |
|---|---|---|---|---|---|
| Logs the buyer needs are exportable and kept long enough for the buyer's retention duty | Record-keeping by the deployer | `EU AI Act Art. 26(6)`, `EU AI Act Art. 12` | `answers.logging_support` | | |
| Incidents affecting the buyer notified within a fixed number of hours, with the facts the buyer needs for its own reporting | Incident clocks can start on time | `EU AI Act Art. 26(5)`, `ISO/IEC 42001 A.10` | `answers.incident_notification` | | |
| Material changes, including model version changes, notified in advance with a fixed notice period | Re-running evals before a change reaches production | `NIST AI RMF MANAGE 3.1` | `answers.change_notification` | | |
| The buyer can suspend or disable the AI feature without terminating the whole service | A working kill switch on bought AI | `EU AI Act Art. 26(5)`, `NIST AI RMF MANAGE 2.4` | `open_questions` | | |
| Cooperation with the buyer's authorities and auditors | Evidence reachable when asked | `EU AI Act Art. 26`, `GDPR Art. 28(3)(h)` | `answers.audit_rights` | | |

## Assurance and exit

| Check | What it secures | Evidences | Closes field | Status | Clause |
|---|---|---|---|---|---|
| Audit rights, or independent reports on request, covering the AI features | Assurance over the supplier's controls | `GDPR Art. 28(3)(h)`, `ISO/IEC 42001 A.10` | `answers.audit_rights`, `answers.security.certifications` | | |
| Security obligations cover AI-specific threats (prompt injection, data and model poisoning, model theft) | Security of the component | `EU AI Act Art. 15` | `answers.security` | | |
| Intellectual property: ownership of outputs, and cover for third-party claims arising from the supplier's model or training data | Freedom to use outputs | `ISO/IEC 42001 A.10` | `open_questions` | | |
| Exit: return of data in a usable format within a fixed period, then certified deletion, including fine-tunes and embeddings built from your data | Clean exit | `GDPR Art. 28(3)(g)` | `answers.exit` | | |
| Reassessment on renewal and on material change is a contractual duty to answer the questionnaire again | Due diligence stays current | `NIST AI RMF GOVERN 6.1` | `assessment.reassess_by` | | |

---

Part of the AI Governance Engineer templates and schemas library:
https://aigovernanceengineer.com/resources/templates

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
