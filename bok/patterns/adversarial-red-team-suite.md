---
id: adversarial-red-team-suite
title: Adversarial Red-Team Suite
layer: 3
order: 3
summary: "A versioned adversarial suite built from a threat taxonomy, run in CI or on a schedule, whose findings are triaged, recorded and fed back as tests."
---

# Pattern: Adversarial Red-Team Suite

**Summary:** Maintain a versioned adversarial test suite, built from a threat taxonomy and run in CI
or on a schedule, whose findings are triaged into fixes or accepted risks, recorded as evidence, and
fed back into the suite. Where an Eval Gate proves a threshold still holds, the red-team suite is the
standing adversary that keeps finding the inputs the threshold never anticipated.

## Objectives
Turn adversarial testing from a one-off exercise into a maintained, versioned control that discovers
failure modes before an attacker does and leaves a triaged, auditable record of every finding.

## Target users
AI governance engineer, security engineer, ML engineer, red-team lead.

## Impacted stakeholders
Model owners, users exposed to the system, incident responders, auditors, regulators.

## Relevant principles
Start from a named failure mode or harm; give every control teeth.

## Context
A model or agent whose exposure grows as it gains tools, prompts and reach, in an organisation that
already runs an Eval Gate for regression and wants a standing adversary rather than a single
pre-launch penetration test.

## Problem
A one-off red-team is out of date the moment the system changes, and its findings, a slide of
jailbreaks, leave no trace that they were fixed or accepted. Without a versioned suite and a triage
record, the same attack is rediscovered every quarter and no one can prove which findings were closed.

## Solution
Build the suite from a threat taxonomy rather than intuition: draw techniques from MITRE ATLAS's
adversarial tactics and techniques for AI systems [1] and the agentic attack classes in the OWASP Top
10 for Agentic Applications [2], so each test traces to a named technique. Version the suite alongside
the model and run it in CI or on a schedule against the registered version. Route each finding through
triage (fix, or accept with a recorded rationale and owner) and file the outcome as a structured
evidence record against the registry entry. Feed every confirmed finding back into the suite as a
regression test, so a closed attack stays closed. The suite complements the Eval Gate: the gate
enforces a threshold on each release, the suite is the adversary that generates the next one.

> **Example (illustrative)** A red-team suite for a customer-service assistant runs a versioned set of
> prompt-injection and tool-abuse cases drawn from ATLAS and the OWASP agentic classes; a new
> tool-exfiltration finding is triaged, fixed and added to the suite, so the next release must pass it.

## Consequences
Adversarial coverage grows over time instead of resetting each launch, and the triage record shows what
was found, fixed or accepted. The cost is maintaining the taxonomy and suite, the compute to run
adversarial cases often, and the discipline to triage every finding rather than let it lapse.

## Related patterns
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Maps to:** EU AI Act Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP
Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [2] and function labels
the NIST AI RMF [3]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
