---
id: agent-identity-scoped-credentials
title: "Agent Identity & Scoped Credentials"
layer: 4
order: 14
summary: "Every agent gets its own identity, owner, bounded scope and expiry before it acts, so its actions are attributable and its access revocable."
---

# Pattern: Agent Identity & Scoped Credentials

**Summary:** Give every agent its own identity, an owner, a bounded scope and an expiry, established
before it acts, so that its actions can be attributed, its access revoked precisely and its scope
contained. Identity is the precondition of accountability; scope is the precondition of containment.

> **In short**
> Agent Identity & Scoped Credentials is a runtime control that gives every AI agent its own
> identity, an owner, a bounded scope and an expiry before it acts. It solves the problem of agents
> that run on a shared service account or a static key: an agent on borrowed credentials cannot be
> attributed, contained or revoked. Use it wherever agents act under delegated authority, calling
> APIs, tools and other agents. The control keeps two questions apart. Channel authentication
> secures one hop, such as a client connecting to an MCP tool server. Agent workload identity is the
> durable identity the agent carries across every hop, under which its actions are logged and its
> access revoked. The identity, scope, owner and expiry are recorded in the Agent Registry, and
> credentials get the least privilege the agent's declared function needs. Its illustrative mappings
> are EU AI Act Art. 12, 14 and 15, ISO/IEC 42001, the NIST AI RMF Manage function, CSA AICM and
> OWASP Agentic ASI03.

## Objectives
Make every non-human actor governable by construction: attributable, scopable, revocable, expiring.

## Target users
AI governance engineer, security engineer, IAM/platform team.

## Impacted stakeholders
Model owners, security operations, auditors, affected third parties.

## Relevant principles
Register and bound every actor before it acts; start from a named failure mode or harm.

## Context
Agents that act under delegated authority (calling APIs, tools and other agents), where the default is
a shared service account or a static key.

## Problem
An agent on borrowed credentials cannot be attributed, contained or revoked. NIST's NCCoE frames the
open question directly: how do identification, authentication and authorization apply so each agent is
"known, trusted, and properly governed", with non-repudiation and tamper-proof logging [1].

## Solution
Issue each agent a distinct workload identity with a declared scope, an owner and an expiry, recorded in
the Agent Registry. Keep two questions separate. **Channel authentication** secures one hop: how a
client authenticates to a tool server; the MCP specification of 2026-07-28 tightened exactly this,
deprecating Dynamic Client Registration in favour of Client ID Metadata Documents and binding
credentials to their issuer [2]. That hardens the MCP connection but is not the agent's identity.
**Agent workload identity** is the durable, attributable identity the agent carries across every hop
and protocol, under which its actions are logged and its access revoked: the job of a
workload-identity system (SPIFFE/SPIRE) or a first-class agent identity from an enterprise provider
(for example Microsoft Entra Agent ID [3] or Okta Agent SSO [4]; illustrative), recorded in the
registry, not of the transport protocol. Secure the channel *and* issue the workload identity; scope
its credentials to the least privilege the agent's declared function needs.

> **Example (illustrative)** A data-analysis agent authenticates with an issuer-bound credential and a
> scope limited to read-only access to one dataset; its every action is logged under its own identity,
> and its credential expires with its registry entry.

## Consequences
Attribution, containment and precise revocation become possible, and the kill switch has something to
act on. The cost is IAM integration and managing non-human identities at scale.

## Related patterns
[Agent Registry](/patterns/agent-registry);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Policy Card](/patterns/policy-card); [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Maps to:** EU AI Act Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM ·
OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [5] and function labels
the NIST AI RMF [6]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[2] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[3] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[4] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
