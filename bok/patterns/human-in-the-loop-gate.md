---
id: human-in-the-loop-gate
title: Human-in-the-loop Gate
layer: 4
order: 15
summary: "A human approval step at a defined high-consequence decision point, so an agent's autonomy stops exactly where the stakes justify the latency."
---

# Pattern: Human-in-the-loop Gate

**Summary:** Require human approval at a defined, high-consequence decision point before an agent's
action takes effect, so that autonomy is bounded by a person exactly where the stakes justify the
latency. Oversight is a designed checkpoint, not an afterthought.

## Objectives
Insert meaningful human oversight where an action is irreversible or high-impact, and record the
decision as evidence.

## Target users
AI governance engineer, product owner, risk owner.

## Impacted stakeholders
Affected persons, users, model owners, regulators.

## Relevant principles
Start from a named failure mode or harm; register and bound every actor before it acts.

## Context
An agent whose actions include some that are irreversible or affect people's rights (a payment, a
denial, a publication) alongside many that are routine.

## Problem
Full autonomy over a high-consequence action removes the human oversight the law and the risk both
require; full manual review over every action destroys the value of the agent. Undifferentiated
oversight fails in both directions.

## Solution
Classify actions by consequence. For the high-consequence class, gate the action behind a human
approval step with enough context to decide, and block the action until approval. Log the approver, the
context and the decision as evidence. Keep the routine class autonomous under guardrails. This realises
the EU AI Act Art. 14 human-oversight requirement [1] at the point of action.

> **Example (illustrative)** An agent can draft and queue refunds autonomously, but any refund above a
> threshold is held for a named human approver, whose decision is logged against the transaction.

## Consequences
Oversight lands where it matters without throttling routine work, and the approval is auditable. The
cost is designing the consequence classification and the latency it adds to gated actions.

## Related patterns
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Runtime Guardrail](/patterns/runtime-guardrail); [Policy Card](/patterns/policy-card);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[FRIA-as-Code](/patterns/fria-as-code).

**Maps to:** EU AI Act Art. 14 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic ASI02 · Layer 04
Runtime Controls & Observability.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [2] and function labels
the NIST AI RMF [3]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 14 (human oversight of high-risk AI systems). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
