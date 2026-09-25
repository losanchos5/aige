---
id: runtime-guardrail
title: Runtime Guardrail
layer: 4
order: 8
summary: "Input and output guardrails on the live request path that enforce the system's Policy Card on every call and emit a decision event for each one."
---

# Pattern: Runtime Guardrail

**Summary:** Place input and output guardrails on the model or agent's runtime path that enforce its
Policy Card on every live request and emit a decision to telemetry and to the circuit breaker. The
guardrail is where a policy written in layer 01 and a threshold tested in layer 03 become an action
taken on a real call, not a claim about one.

> **In short**
> The Runtime Guardrail is a runtime control that places input and output guardrails on a model or
> agent's live request path, enforcing the system's Policy Card on every call. It solves the gap
> left by point-in-time policies and evals: once in production, the system meets prompt injection,
> unsafe outputs and tool calls no one reviewed, and a guardrail that only logs is observability
> mistaken for control. Use it for any agent or model acting on live inputs whose Policy Card and
> eval thresholds have no runtime enforcement point. The input guardrail screens prompts and
> retrieved context for injection and policy-violating requests; the output guardrail screens
> generations and tool calls for unsafe content, data leakage and out-of-scope actions. Every call
> emits a structured decision event to the assurance store, and a defined breach signals the circuit
> breaker. Its illustrative mappings are EU AI Act Art. 14 and 15, ISO/IEC 42001, the NIST AI RMF
> Manage function and OWASP Agentic ASI02 and ASI03.

## Objectives
Enforce policy at the point of action, on inputs and outputs no eval anticipated, and make each
enforcement a structured event the assurance and incident layers can consume.

## Target users
AI governance engineer, ML engineer, security engineer, platform team.

## Impacted stakeholders
Users, model owners, affected persons, incident responders, auditors.

## Relevant principles
Give every control teeth; instrument the build to produce its own proof.

## Context
An agent or model in production, acting on live inputs, whose Policy Card and eval thresholds exist but
have no runtime enforcement point, so a rule proven in CI is unguarded the moment the system meets an
input no test covered.

## Problem
Policies and evals are point-in-time; the system then meets prompt injection, unsafe outputs and tool
calls no one reviewed. A guardrail that only logs is observability mistaken for control: the system
watches itself fail in high resolution. Without an enforcement point that can block and emit, the
runtime is the gap between a tested control and an uncontrolled action.

## Solution
Put a guardrail on both sides of the model/agent path. The input guardrail screens prompts and
retrieved context for injection and policy-violating requests before they reach the model; the output
guardrail screens generations and tool calls for unsafe content, data leakage and out-of-scope actions
before they take effect. Enforce the same Policy Card evaluated in CI [1], so the runtime decision and
the pipeline decision share one rule. On every call emit a structured event, `{agent, direction
(input/output), rule_id, decision (allow/block/redact), timestamp}`, to the assurance store
([Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)) and, on a defined breach,
signal the circuit breaker ([Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)). Guardrail frameworks realise this as a category; the OWASP Agent Control Standard
names the runtime-control surface [2]. This is distinct from the kill switch: the guardrail decides one
call at a time and stays in the request path; the breaker withdraws the agent's autonomy wholesale when
the guardrail's signals cross a threshold.

> **Example (illustrative)** A customer-service assistant's input guardrail blocks a prompt-injection
> attempt and its output guardrail redacts an account number the model was about to return; both
> decisions are emitted to the assurance store, and a burst of blocks trips the circuit breaker.

## Consequences
The tested control holds on live traffic and every enforcement leaves evidence; the guardrail is also
the sensor the breaker and the incident pipeline read. The cost is per-call latency, false positives to
tune, and keeping the runtime rule in sync with the Policy Card and eval thresholds.

## Related patterns
[Policy Card](/patterns/policy-card);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Maps to:** EU AI Act Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic
ASI02/ASI03 · Layer 04 Runtime Controls & Observability.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [3] and function labels
the NIST AI RMF [4]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
