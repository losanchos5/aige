---
id: model-artefact-integrity
title: Model Artefact Integrity
layer: 2
secondaryLayer: 4
order: 24
summary: "Sign every model artefact at build, attach build provenance, refuse code-executing formats, and verify signature and digests before a runtime loads it."
---

# Pattern: Model Artefact Integrity

**Summary:** Treat model weights and their companion files as supply-chain artefacts. Sign a manifest
of every file and its digest when the build produces them, attach build provenance that says what
built them from which inputs, prefer serialisation formats that cannot execute code and scan the ones
that can, and make every runtime verify the signature, the digests and the provenance against the
registry entry before it loads a model. The verification writes an evidence record, so "which bytes
ran, and who produced them?" has an answer.

> **In short**
> Model Artefact Integrity is a supply-chain control that treats model weights and their companion
> files as signed, verifiable artefacts, so the model a service loads is the model the pipeline
> built, evaluated and registered. It solves the pipeline evaluating one model while production
> loads another: tags can be moved, files copied by hand, and code-executing formats such as pickle
> can run an attacker's code on load. Use it wherever models move from training jobs to registries
> to serving clusters, or are fine-tuned from bases pulled from public hubs. The build signs a
> manifest of every file's digest and attaches SLSA build provenance; weights are stored as
> safetensors, other formats are scanned, and third-party models are pinned by digest. The runtime
> verifies signature, digests and provenance against the registry entry before load and writes an
> evidence record. Its illustrative mappings include EU AI Act Art. 15(5) and 55(1)(d), ISO/IEC
> 42001 A.10.3, NIST AI RMF Manage 3.2 and OWASP LLM04:2026.

## Objectives
Guarantee that the model a service loads is the model the pipeline built, evaluated and registered,
from a known producer, and that loading it cannot run an attacker's code.

## Target users
ML platform team, security engineer, AI governance engineer, MLOps engineer.

## Impacted stakeholders
Users and people affected by the system's outputs, model owners, downstream deployers, auditors and
market surveillance authorities.

## Relevant principles
Register and bound every actor before it acts; build the control at the earliest point it can block;
instrument the build to produce its own proof.

## Context
Models move from training jobs to registries to serving clusters, are fine-tuned from bases pulled
from public hubs, and are copied between environments and regions. The files are large binaries
nobody reads. Common formats are not inert: the Python documentation warns that "The pickle module
is not secure. Only unpickle data you trust." [1], and Hugging Face describes "dangerous arbitrary
code execution attacks" that can run when a pickle file is loaded [2].

## Problem
The pipeline evaluates one model and production may load another.

- **Forces.** Teams pull weights by name or tag, and a tag can be moved. Scanning helps but, as
  Hugging Face says of its own pickle-import scanner, it "is not 100% foolproof" [2]. The EU AI Act
  expects high-risk systems to resist attacks on "pre-trained components used in training (model
  poisoning)" (`Art. 15(5)`) [3]. MITRE ATLAS catalogues supply-chain compromise of the model itself
  (`AML.T0010.003`) and user execution of unsafe AI artefacts (`AML.T0011.000`) [4], and OWASP lists
  supply chain as `LLM04:2026` [5] and agentic supply-chain vulnerabilities as `ASI04` [6].
- **Failure mode.** A tampered or malicious model file loads with the privileges of the serving
  process. Or a model that skipped the eval gate reaches production through a manual copy. After an
  incident, nobody can prove which weights produced the outputs in question.

## Solution
Sign at build, prove how it was built, load only safe formats, and verify before load.

1. **Sign at build.** Produce a manifest listing every model file and its cryptographic digest and
   sign the manifest. The OpenSSF Model Signing (OMS) specification, introduced by OpenSSF in June
   2025, does exactly this: a detached signature over a manifest of file hashes, in the Sigstore
   bundle format, and PKI-agnostic (enterprise PKI, self-signed certificates, bare keys or keyless
   Sigstore) [7]; its reference implementation is the `model-signing` library and CLI in the
   sigstore model-transparency repository, whose verification recomputes the hashes [8].
2. **Attach build provenance.** Record what built the artefact, by what process and from which
   top-level inputs, as SLSA provenance (`https://slsa.dev/provenance/v1`). SLSA v1.2 defines Build
   L1 (provenance exists), L2 (a hosted build platform, so forging provenance takes an explicit
   attack) and L3 (hardened builds, where forging it requires exploiting a vulnerability "beyond the
   capabilities of most adversaries") [9]. Include the base model's digest and the dataset admission
   records among the inputs, and list the same artefacts in the [AIBOM](/patterns/aibom).
3. **Prefer safe formats; scan the rest.** Store weights as safetensors, "a new simple format for
   storing tensors safely (as opposed to pickle)" [10]. Where a framework still loads pickle, keep its
   restrictions on: PyTorch's `torch.load` defaults to `weights_only=True` in its current
   documentation and warns "Never load data from an untrusted source" [11]. Scan every serialised file
   for code-executing imports before it reaches a registry, and quarantine what fails.
4. **Pin third-party models by digest.** Pull by content digest, not by tag; verify the publisher's
   signature where one exists; scan and re-host the artefact in the internal registry; and record the
   upstream source and digest in the registry entry.
5. **Verify before load.** The serving platform's admission control refuses a model whose signature,
   signer identity, file digests or provenance do not match the registry entry for the version being
   deployed, and writes an evidence record either way. ATLAS lists code signing (`AML.M0013`),
   verifying AI artefacts (`AML.M0014`), vulnerability scanning (`AML.M0016`) and an AI bill of
   materials (`AML.M0023`) among its mitigations [4].

The AI RMF asks that pre-trained models used for development are "monitored as part of AI system
regular monitoring and maintenance" (MANAGE 3.2) and that security and resilience are "evaluated and
documented" (MEASURE 2.7) [12]. Providers of general-purpose models with systemic risk must ensure
"an adequate level of cybersecurity protection" for the model and its physical infrastructure
(`Art. 55(1)(d)`) [3].

Illustrative verification at load, valid against the published
[evidence record schema](/resources/templates#schema-evidence-record) (`evidence-record.v1`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "model.integrity.verify-at-load.v2",
  "subject": "support-rag-llm@2026-09-20",
  "decision": "allow",
  "obligation": "EU AI Act Art. 15(5)",
  "failure_mode": "tampered or malicious model weights loaded into serving",
  "input_hash": "sha256:8c1f4e2d7a9b3c6e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
  "actor": "serving-admission-controller",
  "timestamp": "2026-09-20T07:31:05Z",
  "signature": "ed25519:Tq5w2Lr8Zk1Xv7Nc4Pb9Hs6Gd3Fa0Jm",
  "extensions": {
    "signature_bundle": "model.sig",
    "signer": "build-pipeline@models.example.org",
    "files_verified": 7,
    "formats": ["safetensors", "json"],
    "pickle_files": 0,
    "provenance": { "predicate_type": "https://slsa.dev/provenance/v1", "build_level": "L3",
                    "builder": "ci.example.org/model-builds" },
    "registry_entry": "support-rag-llm"
  }
}
```

> **Example (illustrative)** A platform team found that three services loaded the "same" fine-tuned
> model from three different buckets, one copied by hand months earlier. They moved signing into the
> training pipeline, made the serving admission controller verify the manifest and the provenance
> against the registry entry, and converted the remaining pickle checkpoints to safetensors. The first
> week's evidence records showed one deployment refused on a digest mismatch: the hand-copied model,
> which had never passed the current eval gate.

## Consequences
What runs is provably what was built and evaluated, supply-chain attacks on the model have to defeat
a signature and a provenance check instead of a file copy, and every load leaves evidence. The costs:
key management or a Sigstore dependency; build-platform work to reach higher SLSA levels; conversion
of legacy checkpoints; and verification latency at load, which is small next to model load times but
must be budgeted for fast scale-out.

## Related patterns
[AIBOM](/patterns/aibom); [Agent Registry](/patterns/agent-registry);
[AI Threat Model](/patterns/ai-threat-model);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Maps to:** EU AI Act Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.5, A.10.3 · NIST AI RMF
(Govern 6.1; Manage 3.2; Measure 2.7) · OWASP LLM04:2026 · OWASP Agentic ASI04 · MITRE ATLAS ·
Layer 02 Inventory & Transparency / Layer 04 Runtime Controls & Observability.

Threat IDs follow the OWASP Top 10 for LLM Applications 2026 [5] and for Agentic Applications
2026 [6] and MITRE ATLAS [4]; function and subcategory labels follow the NIST AI RMF [12]; ISO/IEC
42001 Annex A ids follow a published crosswalk, not the standard's text [13]. Mappings are
illustrative, not a claim of conformity.

## Sources

[1] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[2] Pickle Scanning (arbitrary code execution when loading pickle files; the Hub's pickle-import scan "is not 100% foolproof"; safetensors). Hugging Face Hub documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/hub/security-pickle (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities, incl. model poisoning through pre-trained components used in training; Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk and their physical infrastructure (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; mitigations AML.M0013 Code Signing, AML.M0014 Verify AI Artifacts, AML.M0016 Vulnerability Scanning, AML.M0023 AI Bill of Materials). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM04:2026 Supply Chain). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] Top 10 for Agentic Applications 2026 (ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private or enterprise PKI, self-signed certificates, bare keys, keyless Sigstore; `pip install model-signing`). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[8] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[9] SLSA specification v1.2, Build track basics (Build L1 provenance exists; L2 hosted build platform; L3 hardened builds; provenance describes what built the artefact, by what process and from which top-level inputs; predicate type https://slsa.dev/provenance/v1). OpenSSF SLSA project. n.d. (accessed 2026-09-24). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[10] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/safetensors/index (verified: primary)
[11] torch.load (default `weights_only=True`; "Never load data from an untrusted source"). PyTorch documentation (2.14). n.d. (accessed 2026-09-24). https://docs.pytorch.org/docs/stable/generated/torch.load.html (verified: primary)
[12] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks; MANAGE 3.2 pre-trained models "monitored as part of AI system regular monitoring and maintenance"; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[13] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.5 AI system deployment, B.10.3 suppliers; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
