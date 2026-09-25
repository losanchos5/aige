---
id: agent-registry
title: Agent Registry
layer: 2
order: 4
summary: "A runtime-aware inventory of every model, service and agent, each with an owner, a scope and an expiry, written by the deploy pipeline, not by hand."
---

# Pattern: Agent Registry

**Summary:** Maintain a runtime-aware inventory of every model, service and agent, each entry carrying
an owner, a scope and an expiry, fed by the deployment pipeline rather than typed by hand. The registry
is the object that policies evaluate and runtime controls attach to.

> **In short**
> The Agent Registry is an inventory control that keeps a runtime-aware record of every model,
> service and agent, each entry carrying an owner, a declared scope and an expiry. It solves the
> failure of hand-maintained inventories, which are correct on the day they are edited and wrong
> within a week, leaving actions unattributable, scopes unenforced and stale agents with standing
> access. Use it when an organisation deploys models and agents across teams and no single source
> knows what is live. The registry is an API the deploy pipeline writes to: a new model or agent
> registers itself at deploy, unregistered artefacts are denied production access, and an entry past
> its expiry must be renewed or is deactivated. Periodic reconciliation against what is running
> flags drift. The registry is the object that policies evaluate and runtime controls attach to. Its
> illustrative mappings are EU AI Act Art. 49/71 and Art. 11, ISO/IEC 42001, the NIST AI RMF Map
> function, CSA AICM and OWASP Agentic ASI10.

## Objectives
Answer "what AI is running, and what is it allowed to do?" from a live source, and make registration a
precondition of reaching production.

## Target users
AI governance engineer, platform team, security engineer.

## Impacted stakeholders
Model owners, deployers, auditors, incident responders.

## Relevant principles
Register and bound every actor before it acts; make the governed path the easiest path.

## Context
An organisation deploying models and agents across teams, where no single source knows what is live.

## Problem
A hand-maintained inventory is correct on the day it is edited and wrong within a week. Without owner,
scope and expiry, an action cannot be attributed, a scope cannot be enforced, and a stale agent lingers
with standing access no one revisits.

## Solution
Make the registry an API the deploy pipeline writes to: a new model or agent registers itself at deploy
with an owner, a declared scope and an expiry after which the entry must be renewed or is deactivated.
Deny production access to unregistered artefacts. Reconcile periodically against what is actually
running (see [Shadow-AI Discovery](/patterns/shadow-ai-discovery)) and flag drift.

Illustrative schema for a registry entry:

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Example (illustrative)** Each agent's registry entry expires after 90 days; an owner who does not
> renew loses the agent's workload identity, so abandoned agents fall out of production automatically.

## Consequences
Attribution, scope enforcement and lifecycle control become possible, and every other layer gets an
object to anchor to. The cost is pipeline integration and the governance to enforce the expiry.

## Related patterns
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[AIBOM](/patterns/aibom); [Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Maps to:** EU AI Act Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP
Agentic ASI10 · Layer 02 Inventory & Transparency.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [1] and function labels
the NIST AI RMF [2]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
