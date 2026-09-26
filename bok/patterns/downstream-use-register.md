---
id: downstream-use-register
title: Downstream Use Register
layer: 2
secondaryLayer: 1
order: 31
summary: "Intended and prohibited uses as a Policy Card, every consumer of a system's outputs recorded against its registry entry, and provenance stamped on outputs."
---

# Pattern: Downstream Use Register

**Summary:** Record, against each system's registry entry, what its outputs may and may not be used
for and who actually consumes them: other systems, teams, partners and models trained on them.
Intended and prohibited uses are written as a Policy Card; each consumer is registered with its use,
its approval and the re-test that cleared it; outputs carry provenance and caveats so a consumer knows
what it is using; and off-purpose use is monitored at runtime. Secondary use, function creep and
downstream harm become visible, and a change or retirement can reach everyone it affects.

> **In short**
> The Downstream Use Register is an inventory control that records, against each AI system's
> registry entry, what its outputs may and may not be used for and who actually consumes them: other
> systems, teams, partners and models trained on them. It solves function creep that a system
> inventory cannot see, such as a risk score approved to prioritise manual review that later becomes
> an automatic decline in another team's pipeline. Use it for any system whose outputs can be reused
> beyond their approved purpose. Intended and prohibited uses are written as a Policy Card, each
> consumer is registered with its purpose, approval and re-test, and output access is granted per
> registered consumer. Outputs carry provenance and caveats, off-purpose use is monitored at
> runtime, and a model change or retirement notifies every registered consumer. Its illustrative
> mappings include EU AI Act Art. 3(13), 9(2)(b), 25(1)(c) and 50(2), ISO/IEC 42001 A.8.2, NIST AI
> RMF MAP 1.1 and OWASP Agentic ASI08.

## Objectives
Forecast and bound the uses a system was not approved for, make every downstream consumer of its
outputs known and accountable, and give change, incident and retirement processes a list of whom to
tell.

## Target users
AI governance engineer, system owner, data platform team, product manager.

## Impacted stakeholders
People affected by downstream decisions, consuming teams and partners, deployers of a provider's
system, auditors and market-surveillance authorities.

## Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm; make the
governed path the easiest path.

## Context
Systems are used for more than they were approved for. The EU AI Act names the concept:
reasonably foreseeable misuse is use not in accordance with the intended purpose that may result from
reasonably foreseeable human behaviour or interaction with other systems (`Art. 3(13)`), providers must
assess risks under it (`Art. 9(2)(b)`), and a deployer that changes the intended purpose of a system so
that it becomes high-risk takes on the provider's duties (`Art. 25(1)(c)`) [1]. Providers of generative
systems must mark synthetic outputs in a machine-readable way (`Art. 50(2)`) [1], which is provenance
a consumer can read. Outputs that feed other components are an attack surface as well: improper
output handling, where model outputs pass downstream without validation, is a named risk class [2],
and in agentic systems one agent's error can cascade through others [3]. Governing deployment and use
now includes forecasting and reducing secondary and downstream harms; the IAPP AIGP Body of Knowledge
lists it under competency IV.C [4].

## Problem
An inventory records systems, not what their outputs turn into. A risk score approved to prioritise
manual review becomes, a year later, an automatic decline in another team's pipeline; a summary
model's outputs are harvested as training data; a partner receives outputs under a contract nobody
connected to the registry. None of these consumers was assessed, none is told when the model changes,
and the retirement runbook cannot find them. Where outputs shape the data the next version learns
from, the feedback loop is invisible too.

### Forces
- **Reuse against purpose.** Reusing a good model is cheap and useful; every reuse can also be a new,
  unassessed purpose.
- **Openness against control.** Outputs published through an API or a data platform are easy to consume
  and hard to trace.
- **Caveats against usability.** Stamping provenance and limits on every output adds weight that
  consumers may strip.
- **Forecasting against certainty.** Misuse has to be imagined before it happens, with no data to prove
  the forecast.

## Solution
Give downstream use a register, and make registration the only way to get the outputs.

1. **Uses as a [Policy Card](/patterns/policy-card).** The system's intended uses and its negative space
   (prohibited uses, populations and contexts it was not validated for) are rules on a card stored with
   the registry entry of the [Agent Registry](/patterns/agent-registry), not a paragraph in a model card.
2. **Forecast before go-live.** Run a premortem ("a year from now this caused harm: how?"), abuse cases
   written next to the user stories, and a stakeholder impact map that includes people who never touch
   the interface. Each plausible misuse becomes a prohibited-use rule or a monitor.
3. **Consumers as entries.** Every consumer (a system, a team, a partner, a training pipeline) is
   registered against the producing system with its purpose, its approval, the re-test that cleared the
   outputs for that new context and the contract that binds an external party. Access to the output
   API or table is granted per registered consumer, so an unregistered consumer has no credential.
4. **Provenance on outputs.** Outputs carry the producing system and version, the intended use and a
   caveat, as metadata a consumer can read (for generative content, the marking the AI Act requires of
   providers).
5. **Off-purpose use as a signal.** Classify traffic and consumer requests against the negative space
   and alert on what falls outside it; watch for outputs that return as training data (feedback loops).
6. **Fan-out on change.** A model change, an incident or a retirement reads the register and notifies
   every consumer through the [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).

Illustrative downstream use register entry:

```json
{
  "subject": "risk-score-02@4.1",
  "policy_card": "uses.risk-score-02.v3",
  "intended_uses": ["prioritise claims for manual review"],
  "prohibited_uses": ["automatic decline of a claim", "pricing", "use on commercial policies"],
  "consumers": [
    {
      "consumer": "claims-triage-service",
      "type": "system",
      "use": "queue ordering for human review",
      "approved_at": "2026-03-02",
      "retest": "eval:rs2-claims-triage-v3",
      "credential": "svc-claims-triage"
    },
    {
      "consumer": "reinsurance-partner-a",
      "type": "partner",
      "use": "aggregate statistics only, no row-level scores",
      "approved_at": "2026-05-11",
      "contract": "dpa-2026-017 schedule 3"
    }
  ],
  "output_stamp": ["producer", "version", "intended_use", "caveat"],
  "feedback_loop_check": "scores excluded from the training labels of risk-score-03",
  "reviewed_at": "2026-09-10"
}
```

> **Example (illustrative)** A fraud team asks for row-level risk scores to decline claims
> automatically. The request arrives as a consumer registration, meets a prohibited-use rule on the
> card and goes to the committee as a new purpose, where it is refused; the team gets a
> review-priority feed instead. When the model is retrained, both registered consumers receive the
> change notice and re-run their acceptance tests.

## Consequences
Secondary use is decided rather than discovered, consumers are known when the model changes or
retires, and feedback loops are checked on purpose. The cost is the register itself, per-consumer
access control on outputs, re-testing for new contexts and the friction of saying no to useful reuse.
Registration binds internal consumers well; external ones depend on contract terms and audit rights.

## Related patterns
[Policy Card](/patterns/policy-card);
[Agent Registry](/patterns/agent-registry);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Maps to:** EU AI Act Art. 3(13), Art. 9(2)(b), Art. 25(1)(c), Art. 50(2) · ISO/IEC 42001 A.8.2,
A.9.4, A.10.4 · NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4 · OWASP LLM10:2026, OWASP Agentic ASI08 ·
Layer 02 Inventory & Transparency / Layer 01 Govern-as-Code.

Threat ids follow the OWASP Top 10 for LLM Applications 2026 [2] and the OWASP Top 10 for Agentic
Applications 2026 [3], control ids ISO/IEC 42001 Annex A [5] and subcategory ids the NIST AI RMF [6].
Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] OWASP Top 10 for LLM Applications 2026 (LLM10 Improper Output Handling). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI08 Cascading Failures). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: forecast and reduce risks of secondary or unintended uses and downstream harms; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.4 intended use of the AI system; A.10.4 customers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1 intended purposes and prospective settings documented; MAP 3.3 targeted application scope specified; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
