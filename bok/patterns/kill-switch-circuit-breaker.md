---
id: kill-switch-circuit-breaker
title: "Kill Switch / Circuit Breaker"
layer: 4
order: 9
summary: "A tested mechanism that stops one agent or class of agents at the point of action, revoking its access without breaking the rest of the fleet."
---

# Pattern: Kill Switch / Circuit Breaker

**Summary:** Provide a tested mechanism to stop an agent or class of agents at the point of action,
revoking access and halting tool calls, without breaking the rest of the fleet. Autonomy is granted
only where it can be withdrawn.

> **In short**
> The Kill Switch / Circuit Breaker is a runtime control that provides a tested mechanism to stop
> one AI agent or a class of agents at the point of action, revoking access and halting tool calls
> without breaking the rest of the fleet. It solves agents that cannot be stopped precisely: on
> shared credentials, an incident forces a choice between leaving the agent running and rotating a
> secret that halts every agent. Use it wherever agents call tools or move data or money and one
> failure can cascade. Each agent is bound to its own identity so access can be revoked per agent,
> and a circuit breaker at the tool-call boundary trips on a defined signal: a threshold breach, an
> anomaly or a manual pull. The kill switch is tested on a schedule, because an untested kill switch
> is not a control. Its illustrative mappings are EU AI Act Art. 14 and 15, ISO/IEC 42001, the NIST
> AI RMF Manage function, CSA AICM and OWASP Agentic ASI02 and ASI10.

## Objectives
Bound the blast radius of a misbehaving or compromised agent, and make "stop it" a control that has been
exercised, not a claim.

## Target users
AI governance engineer, security engineer, SRE.

## Impacted stakeholders
Model owners, users, incident responders, affected third parties.

## Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

## Context
Agents that act autonomously (calling tools, moving data or money), where a single failure can cascade.
Gartner expects that by 2029 more than half of successful attacks on AI agents will exploit
access-control weaknesses and prompt injection [1].

## Problem
An agent that cannot be stopped precisely can only be stopped by breaking everything. A fleet on shared
credentials means an incident forces a choice between leaving the agent running and rotating a secret
that halts the whole fleet.

## Solution
Bind each agent to its own identity (see
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)) so access can be
revoked per agent. Implement a circuit breaker at the tool-call boundary that trips on a defined signal: a
threshold breach, an anomaly, a manual pull. Test the kill switch on a schedule; an untested kill switch
is not a control.

> **Example (illustrative)** A payments agent's circuit breaker trips automatically when its
> unauthorised-tool-call rate crosses a threshold, revoking just that agent's scope while the rest of
> the fleet keeps running; the pull is drilled monthly.

## Consequences
Incidents are contained to one agent and recovery is fast. The cost is per-agent identity plumbing and
the engineering to make revocation instant and safe.

## Related patterns
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Agent Registry](/patterns/agent-registry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Maps to:** EU AI Act Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP
Agentic ASI02/ASI10 · Layer 04 Runtime Controls & Observability.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [2] and function labels
the NIST AI RMF [3]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
