---
lang: de
source: bok/patterns/model-artefact-integrity.md
sourceHash: "5b9a3545c2d0b0a830570ab4994d1f61d4c0b82233b606881ffb4158b7cdeb49"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-artefact-integrity
title: Model Artefact Integrity
layer: 2
secondaryLayer: 4
order: 24
summary: "Signieren Sie jedes Modellartefakt beim Build, fügen Sie Build-Provenance an, lehnen Sie Code-ausführbare Formate ab, und überprüfen Sie Signatur und Digests, bevor eine Runtime es lädt."
---

# Muster: Model Artefact Integrity

**Zusammenfassung:** Behandeln Sie Modellgewichte und ihre Begleitdateien als
Supply-Chain-Artefakte. Signieren Sie ein Manifest jeder Datei und ihres Digests, wenn der Build sie
erzeugt, fügen Sie Build-Provenance an, die angibt, was sie aus welchen Eingaben gebaut hat,
bevorzugen Sie Serialisierungsformate, die keinen Code ausführen können, und scannen Sie diejenigen,
die es können, und lassen Sie jede Runtime die Signatur, die Digests und die Provenance gegen den
Registry-Eintrag überprüfen, bevor sie ein Modell lädt. Die Überprüfung schreibt einen
Evidence-Datensatz, sodass "welche Bytes liefen und wer hat sie erzeugt?" eine Antwort hat.

## Ziele
Garantieren Sie, dass das Modell, das ein Service lädt, das Modell ist, das die Pipeline gebaut,
evaluiert und registriert hat, von einem bekannten Produzenten, und dass das Laden es nicht
ermöglicht, Code eines Angreifers auszuführen.

## Zielbenutzer
ML-Plattform-Team, Security Engineer, KI-Governance-Engineer, MLOps Engineer.

## Betroffene Stakeholder
Benutzer und von den Ausgaben des Systems betroffene Personen, Modellbesitzer, nachgelagerte
Betreiber, Auditor und Marktüberwachungsbehörden.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; bauen Sie die Kontrolle an dem
frühesten Punkt auf, an dem sie blockieren kann; instrumentieren Sie den Build, um seinen eigenen
Beweis zu erzeugen.

## Kontext
Modelle werden von Trainings-Jobs zu Registries zu Serving-Clustern verschoben, werden von Basen
feinabgestimmt, die von öffentlichen Hubs gezogen werden, und werden zwischen Umgebungen und
Regionen kopiert. Die Dateien sind große Binärdateien, die niemand liest. Gängige Formate sind nicht
inert: Die Python-Dokumentation warnt, dass "Das pickle-Modul ist nicht sicher. Entpacken Sie nur
Daten, denen Sie vertrauen." [1], und Hugging Face beschreibt "gefährliche willkürliche
Code-Ausführungsangriffe", die ausgeführt werden können, wenn eine pickle-Datei geladen wird [2].

## Problem
Die Pipeline evaluiert ein Modell und die Produktion kann ein anderes laden.

- **Kräfte.** Teams ziehen Gewichte nach Name oder Tag, und ein Tag kann verschoben werden. Scannen
  hilft, aber wie Hugging Face über seinen eigenen pickle-Import-Scanner sagt, ist es "nicht 100%
  narrensicher" [2]. Die EU AI Act erwartet, dass Hochrisiko-Systeme Angriffe auf "vortrainierte
  Komponenten, die beim Training verwendet werden (Model Poisoning)" widerstehen (`Art. 15(5)`) [3].
  MITRE ATLAS katalogisiert Supply-Chain-Kompromisse des Modells selbst (`AML.T0010.003`) und die
  Ausführung unsicherer KI-Artefakte durch Benutzer (`AML.T0011.000`) [4], und OWASP listet Supply
  Chain als `LLM04:2026` [5] und agentengestützte Supply-Chain-Anfälligkeit als `ASI04` [6].
- **Fehlermodus.** Eine manipulierte oder böswillige Modelldatei wird mit den Privilegien des
  Serving-Prozesses geladen. Oder ein Modell, das das Eval Gate übersprungen hat, erreicht die
  Produktion durch eine manuelle Kopie. Nach einem Incident kann niemand beweisen, welche Gewichte
  die fraglichen Ausgaben erzeugt haben.

## Lösung
Signieren Sie beim Build, beweisen Sie, wie es gebaut wurde, laden Sie nur sichere Formate, und
überprüfen Sie vor dem Laden.

1. **Signieren Sie beim Build.** Erzeugen Sie ein Manifest, das jede Modelldatei und ihren
   kryptografischen Digest auflistet, und signieren Sie das Manifest. Die OpenSSF Model Signing
   (OMS)-Spezifikation, eingeführt von OpenSSF im Juni 2025, tut genau dies: eine abgelöste Signatur
   über ein Manifest von Datei-Hashes im Sigstore-Bundle-Format und PKI-agnostisch (Enterprise-PKI,
   selbstsignierte Zertifikate, bloße Schlüssel oder schlüsselloses Sigstore) [7]; seine
   Referenzimplementierung ist die `model-signing`}-Bibliothek und CLI im sigstore
   model-transparency-Repository, dessen Überprüfung die Hashes neu berechnet [8].
2. **Fügen Sie Build-Provenance an.** Zeichnen Sie auf, was das Artefakt gebaut hat, durch welchen
   Prozess und aus welchen Top-Level-Eingaben, als SLSA-Provenance
   (`https://slsa.dev/provenance/v1`). SLSA v1.2 definiert Build L1 (Provenance existiert), L2 (eine
   gehostete Build-Plattform, sodass das Fälschen von Provenance einen expliziten Angriff erfordert)
   und L3 (gehärtete Builds, bei denen das Fälschen eine Anfälligkeit ausnutzen erfordert, "die über
   die Fähigkeiten der meisten Gegner hinausgeht") [9]. Beziehen Sie den Digest des Basismodells und
   die Dataset-Admission-Datensätze in die Eingaben ein, und listen Sie dieselben Artefakte in der
   [AIBOM](/patterns/aibom) auf.
3. **Bevorzugen Sie sichere Formate; scannen Sie die übrigen.** Speichern Sie Gewichte als
   safetensors, "ein neues einfaches Format zum sicheren Speichern von Tensoren (im Gegensatz zu
   pickle)" [10]. Wenn ein Framework immer noch pickle lädt, behalten Sie seine Einschränkungen bei:
   PyTorch's `torch.load`} standardmäßig auf {`weights_only=True`} in seiner aktuellen Dokumentation
   und warnt "Laden Sie niemals Daten aus einer nicht vertrauenswürdigen Quelle" [11]. Scannen Sie
   jede serialisierte Datei auf Code-ausführbare Importe, bevor sie eine Registry erreicht, und
   isolieren Sie, was fehlschlägt.
4. **Heften Sie Drittanbieter-Modelle nach Digest an.** Ziehen Sie nach Content-Digest, nicht nach
   Tag; überprüfen Sie die Signatur des Herausgebers, falls vorhanden; scannen und hosten Sie das
   Artefakt in der internen Registry neu; und zeichnen Sie die Upstream-Quelle und den Digest im
   Registry-Eintrag auf.
5. **Überprüfen Sie vor dem Laden.** Die Admission Control der Serving-Plattform lehnt ein Modell
   ab, dessen Signatur, Signer-Identität, Datei-Digests oder Provenance nicht dem Registry-Eintrag
   für die bereitgestellte Version entsprechen, und schreibt einen Evidence-Datensatz in jedem Fall.
   ATLAS listet Code-Signierung (`AML.M0013`), Überprüfung von KI-Artefakten (`AML.M0014`),
   Anfälligkeits-Scanning (`AML.M0016`) und eine KI-Stückliste (`AML.M0023`) unter seinen
   Mitigationen auf [4].

Der AI RMF verlangt, dass vortrainierte Modelle, die für die Entwicklung verwendet werden, "als Teil
der regelmäßigen Überwachung und Wartung des KI-Systems überwacht werden" (MANAGE 3.2) und dass
Sicherheit und Resilienz "evaluiert und dokumentiert werden" (MEASURE 2.7) [12]. Anbieter von
Modellen mit allgemeinem Verwendungszweck mit systemischem Risiko müssen "ein angemessenes Maß an
Cybersecurity-Schutz" für das Modell und seine physische Infrastruktur sicherstellen
(`Art. 55(1)(d)`) [3].

Illustrative Überprüfung beim Laden, gültig gegen das veröffentlichte
[Evidence-Record-Schema](/resources/templates#schema-evidence-record) (`evidence-record.v1`):

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

> **Beispiel (illustrativ)** Ein Plattform-Team stellte fest, dass drei Services das "gleiche"
> feinabgestimmte Modell aus drei verschiedenen Buckets luden, eines vor Monaten von Hand kopiert.
> Sie verschoben die Signierung in die Training-Pipeline, ließen den Serving-Admission-Controller
> das Manifest und die Provenance gegen den Registry-Eintrag überprüfen, und konvertierten die
> verbleibenden pickle-Checkpoints zu safetensors. Die Evidence-Datensätze der ersten Woche zeigten
> eine Bereitstellung, die bei einem Digest-Mismatch abgelehnt wurde: das von Hand kopierte Modell,
> das nie das aktuelle Eval Gate bestanden hatte.

## Konsequenzen
Was läuft, ist nachweislich das, was gebaut und evaluiert wurde, Supply-Chain-Angriffe auf das
Modell müssen eine Signatur und eine Provenance-Überprüfung besiegen, anstatt eine Datei zu
kopieren, und jedes Laden hinterlässt Beweise. Die Kosten: Schlüsselverwaltung oder eine
Sigstore-Abhängigkeit; Build-Plattform-Arbeit, um höhere SLSA-Level zu erreichen; Konvertierung von
Legacy-Checkpoints; und Überprüfungslatenz beim Laden, die klein neben Modell-Ladezeiten ist, aber
für schnelle Skalierung budgetiert werden muss.

## Verwandte Muster
[AIBOM](/patterns/aibom); [Agent Registry](/patterns/agent-registry);
[AI Threat Model](/patterns/ai-threat-model);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Zuordnung:** EU KI-Verordnung Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.5, A.10.3 · NIST AI
RMF (Govern 6.1; Manage 3.2; Measure 2.7) · OWASP LLM04:2026 · OWASP Agentic ASI04 · MITRE ATLAS ·
Layer 02 Inventory & Transparency / Layer 04 Runtime Controls & Observability.

Threat-IDs folgen den OWASP Top 10 für LLM-Anwendungen 2026 [5] und für Agentic-Anwendungen 2026 [6]
und MITRE ATLAS [4]; Funktions- und Unterkategorie-Labels folgen dem NIST AI RMF [12]; ISO/IEC 42001
Annex A-IDs folgen einem veröffentlichten Crosswalk, nicht dem Text des Standards [13]. Zuordnungen
sind illustrativ, keine Konformitätsbehauptung.

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
