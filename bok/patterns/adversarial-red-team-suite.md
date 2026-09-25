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

### From threat model to test plan

A suite built from a taxonomy still needs a reason for each case. That reason is the threat model of
the system as deployed, and the step that turns one into the other is written down, so a reviewer can
see why the suite contains what it contains and what it leaves out.

1. **Decompose the system.** Draw the data flows as they run: users, the application, retrieval,
   the model, the tools and their credentials, memory, and every downstream consumer of outputs.
   Mark each trust boundary, and mark which components you own and which a provider runs.
2. **Enumerate threats per element, by id.** Walk each element against the AI-specific catalogues:
   the OWASP Top 10 for LLM Applications 2026 for the model as a component [3], the OWASP Top 10
   for Agentic Applications for tools, memory and delegation [2], MITRE ATLAS techniques for the
   attacker's path [1] and the NIST adversarial machine learning taxonomy for attacks on predictive
   and generative models, such as evasion, poisoning and privacy attacks [4]. NIST's secure
   development profile for generative AI asks for exactly this: risk modelling that includes
   AI-specific vulnerability and threat types (`PW.1.1`) [5]. Record each threat with its external
   id, so the model reads `LLM01:2026` or `AML.T0051`, not "injection risk".
3. **Name the control and the test that proves it.** For each threat in scope, write the control
   expected to stop it and the test that would fail if the control did not work. The test becomes a
   suite entry in the release's test plan, which validates against
   [`test-plan.v1.json`](/schemas/test-plan.v1.json): a versioned suite id, the category
   (`adversarial`, `security`, `privacy`), the metric, a threshold fixed before testing, the
   failure mode it guards against and whether a failure blocks the release.
4. **Tag every case with its threat ids.** A case carries the ids of the threats it exercises, and a
   finding inherits them, so a finding traces from technique to control to the eval that now guards
   it, and a coverage report can list the in-scope threats that no case exercises yet.
5. **Record what is out of scope, and why.** A threat the system cannot face (no tools, no memory, no
   personal data) is closed with a reason; a threat you cannot test (a provider's weights) is routed to
   the [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) as
   provider-attested evidence. Re-run the step when the data flows change: a new tool, a new corpus,
   a new model.

The [threat bridge](/resources/threats) holds the result of steps 2 and 3 as open data: each row
takes an external threat id to the patterns that control it, an example eval that tests it and the
obligations the evidence helps satisfy.

```yaml
# one entry of the test plan's `suites`, derived from a threat (illustrative)
suite_id: indirect-injection.v4
category: adversarial
metric: attack success rate on planted instructions in retrieved documents
threshold: "<= 0.02"
direction: lower_is_better
failure_mode: >-
  agent follows instructions found in retrieved content
  (LLM01:2026, ASI01, AML.T0051.001, NISTAML.015)
blocking: true
```

## Consequences
Adversarial coverage grows over time instead of resetting each launch, and the triage record shows what
was found, fixed or accepted. The cost is maintaining the taxonomy and suite, the compute to run
adversarial cases often, and the discipline to triage every finding rather than let it lapse. The
threat-model step adds its own upkeep: the model goes stale the day a tool or a corpus is added, so it
has to be re-run on change, not once a year.

## Related patterns
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Maps to:** EU AI Act Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP
Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Threat IDs follow the OWASP Top 10 for Agentic Applications 2026 [2] and function labels
the NIST AI RMF [6]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] OWASP GenAI LLM Top 10 2026 (LLM01 Prompt Injection to LLM10 Improper Output Handling; published 3 Aug 2026; canonical Markdown in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (predictive and generative AI attack classes with NISTAML identifiers). NIST. 2025-03-24. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[5] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (recommendation R1 on SSDF 1.1 task PW.1.1: include AI model-specific vulnerability and threat types in risk modelling). NIST. 2024-07. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
