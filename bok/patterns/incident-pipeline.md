---
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "The plumbing that detects, triages and reports serious AI incidents within the legal window, with timelines and templates encoded, not remembered."
---

# Pattern: Incident Pipeline

**Summary:** Build the plumbing to detect, triage and report serious AI incidents on the clock, with
reporting timelines and templates encoded rather than remembered. For high-risk systems this includes EU
AI Act Article 73 serious-incident reporting; for GPAI models it includes the systemic-incident
reporting the Code of Practice expects.

## Objectives
Turn a runtime signal into a reported obligation within the legal window, and produce the incident
record as structured evidence.

## Target users
AI governance engineer, security/incident responder, legal/compliance.

## Impacted stakeholders
Regulators, affected persons, deployers, model owners.

## Relevant principles
Instrument the build to produce its own proof; start from a named failure mode or harm.

## Context
A high-risk or GPAI system in production, subject to serious-incident reporting duties, where detection
lives in engineering and reporting lives in legal, with no wire between them.

## Problem
When an incident is detected, the clock starts. If detection, triage and reporting are disconnected
manual steps, the deadline is missed and the evidence of what happened is reconstructed after the fact.

## Solution
Connect runtime detection (from observability and guardrails) to a triage workflow that classifies
severity and, on a reportable event, drafts the report against the required template and starts the
statutory timer. Encode the EU AI Act Art. 73 timelines and the Art. 72 post-market monitoring feed
[1]; hold the incident record as machine-readable evidence.

> **Example (illustrative)** A guardrail flags a data-exfiltration attempt via an agent tool; the
> pipeline classifies it, opens an incident with the Art. 73 timer running, and pre-fills the report
> from the trace and registry entry.

## Consequences
Reporting happens on time and the record is audit-ready. The cost is cross-functional integration and
keeping the severity criteria and templates current with the law.

## Related patterns
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Maps to:** EU AI Act Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Manage) · Layer
05 Assurance & Continuous Compliance.

Function labels follow the NIST AI RMF [2]. Mappings are illustrative, not a claim of
conformity.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
