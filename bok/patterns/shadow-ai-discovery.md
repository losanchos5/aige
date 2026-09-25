---
id: shadow-ai-discovery
title: Shadow-AI Discovery
layer: 2
order: 16
summary: "Continuous discovery of AI systems and agents running without a registry entry, reconciled against the registry so the inventory matches production."
---

# Pattern: Shadow-AI Discovery

**Summary:** Continuously discover AI systems and agents that are running but not registered, and
reconcile them against the registry, so the inventory reflects reality rather than only what teams
remembered to declare. You cannot govern what you cannot see.

> **In short**
> Shadow-AI Discovery is an inventory control that continuously finds AI systems and agents that are
> running but not registered, and reconciles them against the registry, so the inventory reflects
> production rather than only what teams remembered to declare. It solves the lag of a registry fed
> only by voluntary declaration: unregistered agents, the shadow fleet, are exactly the layer a
> paper inventory cannot see. Use it in an organisation where teams adopt AI tools and start agents
> faster than any central inventory can track. Discovery runs against the environments where AI
> appears: identity providers, cloud accounts, network egress, code repositories and SaaS
> integrations. Each finding is reconciled against the Agent Registry; an unknown system gets an
> entry and an owner is asked to claim it, and unclaimed ones are escalated. The result feeds the
> registry's drift check. Its illustrative mappings are EU AI Act Art. 49/71, ISO/IEC 42001, the
> NIST AI RMF Map function, CSA AICM and OWASP Agentic ASI10.

## Objectives
Close the gap between the registry and production by finding unregistered models, agents and AI-enabled
tools, and bringing them under governance.

## Target users
AI governance engineer, security engineer, platform team.

## Impacted stakeholders
Model owners, security operations, auditors.

## Relevant principles
Register and bound every actor before it acts; make the governed path the easiest path.

## Context
An organisation where teams adopt AI tools and spin up agents faster than any central inventory can
track, and where, by one vendor's comparison of the category, much of the AI-governance platform
market "manages the program … without any runtime data path" [1].

## Problem
A registry fed only by voluntary declaration is always behind. Unregistered agents, the shadow fleet,
are exactly the layer a paper inventory cannot see, and a security vendor's 2026 survey reports that
roughly one in eight AI breaches involved agentic systems [2].

## Solution
Run discovery against the environments where AI appears (identity providers, cloud accounts, network
egress, code repositories, SaaS integrations) using discovery tooling (illustrative) to find models and
agents. Reconcile findings against the registry, open an entry for each unknown with an owner to claim
it, and escalate the unclaimed. Feed the result back into the Agent Registry's drift check.

> **Example (illustrative)** A weekly discovery sweep finds an agent calling an external API from a
> team's cloud account with no registry entry; it is auto-registered as unclaimed, its owner is
> notified, and its scope is frozen until claimed.

## Consequences
The inventory converges on reality and the blind spot shrinks. The cost is discovery integration and the
process to triage and claim what it finds.

## Related patterns
[Agent Registry](/patterns/agent-registry);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Maps to:** EU AI Act Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP Agentic ASI10
· Layer 02 Inventory & Transparency.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [3] and function labels
the NIST AI RMF [4]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
