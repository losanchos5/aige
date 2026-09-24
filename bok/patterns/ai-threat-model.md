---
id: ai-threat-model
title: AI Threat Model
layer: 1
secondaryLayer: 3
order: 19
summary: "A versioned threat model per AI system: STRIDE extended with AI-specific attacks, where every threat resolves to a mitigation and the test that proves it."
---

# Pattern: AI Threat Model

**Summary:** Threat-model every AI system at design review as a versioned data file, not a slide:
decompose its data flows, enumerate threats per element with a classic checklist such as STRIDE
extended with the AI-specific attacks that MITRE ATLAS, NIST AI 100-2 and the OWASP lists catalogue,
and require every threat above tolerance to resolve to a mitigation and to the test that proves the
mitigation works. The threat model decides what the red-team suite, the guardrails and the supply-chain
controls cover, and it is reopened whenever the system or the threat catalogue changes.

## Objectives
Turn "what can go wrong?" into a traceable chain of threat, mitigation and test, so the security
controls of an AI system are chosen from its design rather than from habit, and an auditor can see
that each known attack class was considered and either handled or accepted by a named owner.

## Target users
AI governance engineer, security engineer, ML engineer, platform team.

## Impacted stakeholders
Users and people affected by the system's outputs, data subjects whose data trained or feeds it,
model owners, the CISO function, auditors and market surveillance authorities.

## Relevant principles
Start from a named failure mode or harm; build the control at the earliest point it can block; give
every control teeth.

## Context
A design review for a system that trains or fine-tunes on external data, retrieves documents, calls
tools or serves a model through an API. Security teams already threat-model software, often with
STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of
privilege) as part of a secure development lifecycle [1]. AI adds attack surface those six words do
not name: training data, pre-trained components, prompts, retrieval corpora and the inference API
itself. Microsoft's guidance for AI and machine-learning systems puts the scope change plainly:
"Training Data stores and the systems that host them are part of your Threat Modeling scope" [2].

## Problem
The threats that matter most for an AI system are the ones a generic review does not ask about.

- **Forces.** Security wants depth, product wants speed. The AI attack catalogues are large and
  move: MITRE's ATLAS data shipped its 2026.09 release on 15 Sep 2026 [3]. A threat model written as
  a document is out of date at the next change. Red teams test what they think of, which is not
  always what the design exposes.
- **Failure mode.** The red-team suite and the guardrails are chosen by habit. Threats specific to
  the system (a poisoned corpus, tampered weights, extraction through the API, a tool granted more
  scope than the task needs) have no owner and no test. After an incident, nobody can show the
  threat was ever considered.

## Solution
Keep the threat model next to the design record, as data, and make the design review fail when it
is incomplete.

1. **Scope from the design.** Decompose the data flows (data sources, training pipeline, model
   artefact and registry, retrieval corpus, prompts, tools, inference API, downstream consumers) and
   mark the trust boundaries. Training data stores and the model registry are in scope [2].
2. **Ask the four questions.** The Threat Modeling Manifesto frames the work as "What are we working
   on?", "What can go wrong?", "What are we going to do about it?" and "Did we do a good enough
   job?" [4]. The first is the data-flow diagram; the next two are the rows below; the last is the
   gate.
3. **Enumerate per element, then extend.** Walk each element with STRIDE [1], then add the
   AI-specific classes: the evasion, poisoning, privacy and abuse attacks of NIST AI 100-2 E2025 [5],
   the techniques of MITRE ATLAS [3], and the OWASP Top 10 for LLM Applications 2026 [6] and for
   Agentic Applications 2026 [7] for generative and agentic systems. The table is a starting
   checklist, not a complete one.

   | STRIDE category | AI-specific reading | Catalogue ids (examples) |
   |---|---|---|
   | Spoofing | A forged model or dataset origin; an impersonated agent or tool server | `AML.T0010.003`; `ASI03`, `ASI04` |
   | Tampering | Poisoned training data; a manipulated model; instructions injected through retrieved content | `AML.T0020`, `AML.T0018`, `AML.T0051.001`; `LLM05:2026`, `LLM01:2026` |
   | Repudiation | An agent action with no attributable identity; a decision with no record | `ASI03` |
   | Information disclosure | Membership inference, model inversion or model extraction through the inference API | `AML.T0024.000`, `AML.T0024.001`, `AML.T0024.002` |
   | Denial of service | Unbounded consumption of tokens, compute or tool calls | `LLM06:2026` |
   | Elevation of privilege | Excessive agency or tool misuse; a model file that executes code on load | `LLM03:2026`, `ASI02`; `AML.T0011.000` |

4. **Rate and decide.** Rate each threat on the organisation's likelihood and severity scales and
   decide: mitigate, avoid, transfer or accept. An accepted threat becomes a risk-register entry with
   a named acceptor; a mitigated one names its controls.
5. **Close the loop with a test.** Every mitigated threat carries the id of the test that proves the
   mitigation: a red-team case, an eval, a pipeline check (a signature or hash verification), a
   guardrail test. The design review is a gate: it fails while any threat above tolerance has no
   mitigation or no test.
6. **Reopen on triggers.** A new tool, data source, model or exposure, an incident or near miss, or
   a relevant new technique in the catalogues reopens the model. Because the file is versioned, the
   reopening is a diff with a reviewer.

For high-risk systems under the EU AI Act, the output is also evidence of `Art. 15(5)`: resilience
against attempts by unauthorised third parties to exploit vulnerabilities, with technical solutions
that include, where appropriate, measures against data poisoning, model poisoning through
"pre-trained components used in training", adversarial examples, confidentiality attacks and model
flaws [8]. Providers of general-purpose models with systemic risk must ensure "an adequate level of
cybersecurity protection" for the model and its physical infrastructure (`Art. 55(1)(d)`) [8]. The
AI RMF asks that security and resilience are "evaluated and documented" (MEASURE 2.7) [9].

Illustrative threat entry, one row of the model's data file:

```json
{
  "threat_id": "TM-support-rag-07",
  "system": "support-rag@2026-09-20",
  "element": "retrieval corpus ingestion",
  "stride": "tampering",
  "ai_class": "indirect prompt injection through retrieved documents",
  "catalogue": ["AML.T0051.001", "LLM01:2026"],
  "likelihood": "likely",
  "severity": "major",
  "decision": "mitigate",
  "mitigations": ["source allow-list at ingestion", "input guardrail on retrieved chunks",
                  "read-only tool scope for the answering step"],
  "tests": ["redteam.planted-instructions.v3", "canary-docs.never-retrieved.v1"],
  "owner": "team-support-platform",
  "reviewed": "2026-09-22"
}
```

> **Example (illustrative)** A support assistant's first design review listed prompt injection and
> stopped there. Walking the data-flow diagram element by element added three rows: documents from a
> partner wiki entered the corpus unreviewed, the model weights were pulled from a public hub by tag
> rather than by digest, and the ticket tool could close any ticket, not only the requester's. Each
> row got a control and a test: an ingestion allow-list with planted-instruction cases, digest pinning
> with a pipeline check, and a scoped tool with a denial test. The design review gate now fails on
> any threat row whose `tests` list is empty.

## Consequences
The red-team suite, the guardrails and the supply-chain checks trace back to named threats, and the
security case for a release is a query over the file. The costs: threat modelling takes skilled
time; the catalogues change monthly, so someone owns the delta review; and a threat model is only as
good as the data-flow diagram, which drifts unless the design record is kept current.

## Related patterns
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Model Artefact Integrity](/patterns/model-artefact-integrity);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering).

**Maps to:** EU AI Act Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.2, A.6.2.4 · NIST AI RMF
(Map 5.1; Measure 2.7) · OWASP LLM01:2026, LLM05:2026 · OWASP Agentic ASI02/ASI03/ASI04 · MITRE
ATLAS · Layer 01 Govern-as-Code / Layer 03 Evals & Red Teaming as Evidence.

Threat IDs follow the OWASP Top 10 for LLM Applications 2026 [6] and for Agentic Applications
2026 [7] and MITRE ATLAS [3]; function and subcategory labels follow the NIST AI RMF [9]; ISO/IEC
42001 Annex A ids follow a published crosswalk, not the standard's text [10]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] Threats: Microsoft Threat Modeling Tool (STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[2] Threat Modeling AI/ML Systems and Dependencies (A. Marshall, J. Parikh, E. Kiciman, R. Shankar Siva Kumar; supplements SDL threat modelling; "Training Data stores and the systems that host them are part of your Threat Modeling scope"). Microsoft Learn. 2019-11 (page dated 2025-03-12). https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml (verified: primary)
[3] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; AML.T0018 Manipulate AI Model; AML.T0020 Training Data Poisoning; AML.T0024.000 Infer Training Data Membership, .001 Invert AI Model, .002 Extract AI Model; AML.T0051.001 LLM Prompt Injection: Indirect). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[4] Threat Modeling Manifesto (definition: "analyzing representations of a system to highlight concerns about security and privacy characteristics"; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-24). https://www.threatmodelingmanifesto.org/ (verified: primary)
[5] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (attack classes incl. evasion, data poisoning, privacy breach and abuse). NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[6] OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM03 Excessive Agency, LLM04 Supply Chain, LLM05 Data and Model Poisoning, LLM06 Unbounded Consumption). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[7] Top 10 for Agentic Applications 2026 (ASI01 to ASI10; ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities (data poisoning, model poisoning through pre-trained components, adversarial examples or model evasion, confidentiality attacks, model flaws); Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 5.1 likelihood and magnitude of each identified impact; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex A control ids and titles, e.g. A.6.2.2 AI system requirements and specification, A.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
