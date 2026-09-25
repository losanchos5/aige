---
lang: de
source: bok/patterns/ai-threat-model.md
sourceHash: "c6e202cafb0a952d2c1905a3058a54e99ecf670f49c955b26240308a2cc50482"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: ai-threat-model
title: AI Threat Model
layer: 1
secondaryLayer: 3
order: 19
summary: "Ein versioniertes Bedrohungsmodell pro KI-System: STRIDE erweitert um KI-spezifische Angriffe, wobei jede Bedrohung zu einer Mitigation und dem Test auflöst, der sie beweist."
---

# Muster: AI Threat Model

**Zusammenfassung:** Erstellen Sie ein Bedrohungsmodell für jedes KI-System bei der
Designüberprüfung als versionierte Datendatei, nicht als Folie: Zerlegen Sie seine Datenflüsse,
zählen Sie Bedrohungen pro Element mit einer klassischen Checkliste wie STRIDE auf, erweitert um die
KI-spezifischen Angriffe, die MITRE ATLAS, NIST AI 100-2 und die OWASP-Listen katalogisieren, und
verlangen Sie, dass jede Bedrohung über der Toleranz zu einer Mitigation und zum Test auflöst, der
beweist, dass die Mitigation funktioniert. Das Bedrohungsmodell entscheidet, was die Red-Team-Suite,
die Guardrails und die Supply-Chain-Kontrollen abdecken, und es wird erneut geöffnet, wenn sich das
System oder der Bedrohungskatalog ändert.

## Ziele
Verwandeln Sie "Was kann schiefgehen?" in eine nachverfolgbare Kette von Bedrohung, Mitigation und
Test, sodass die Sicherheitskontrollen eines KI-Systems aus seinem Design gewählt werden, nicht aus
Gewohnheit, und ein Auditor sehen kann, dass jede bekannte Angriffklasse berücksichtigt und entweder
behandelt oder von einem benannten Eigentümer akzeptiert wurde.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, ML Engineer, Platform-Team.

## Betroffene Stakeholder
Benutzer und von den Ausgaben des Systems betroffene Personen, Datensubjekte, deren Daten es
trainiert oder speist, Modellverantwortliche, die CISO-Funktion, Auditor und
Marktüberwachungsbehörden.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; bauen Sie die Kontrolle am frühesten
Punkt auf, an dem sie blockieren kann; geben Sie jeder Kontrolle Zähne.

## Kontext
Eine Designüberprüfung für ein System, das auf externen Daten trainiert oder feinabgestimmt wird,
Dokumente abruft, Tools aufruft oder ein Modell über eine API bereitstellt. Security-Teams erstellen
bereits Bedrohungsmodelle für Software, oft mit STRIDE (Spoofing, Tampering, Repudiation,
Information Disclosure, Denial of Service, Elevation of Privilege) als Teil eines sicheren
Entwicklungslebenszyklus [1]. KI fügt Angriffsfläche hinzu, die diese sechs Wörter nicht benennen:
Trainingsdaten, vorgefertigte Komponenten, Prompts, Abrufkorpora und die Inference-API selbst.
Microsofts Anleitung für KI- und Machine-Learning-Systeme stellt die Bereichsänderung deutlich dar:
"Training Data stores and the systems that host them are part of your Threat Modeling scope" [2].

## Problem
Die Bedrohungen, die für ein KI-System am wichtigsten sind, sind die, die eine generische
Überprüfung nicht fragt.

- **Kräfte.** Security will Tiefe, Produkt will Geschwindigkeit. Die KI-Angriffskatalogisierungen
  sind groß und bewegen sich: MITREs ATLAS-Daten versendeten ihre 2026.09-Version am 15. Sep 2026
  [3]. Ein als Dokument geschriebenes Bedrohungsmodell ist bei der nächsten Änderung veraltet. Red
  Teams testen, was sie sich vorstellen, nicht immer, was das Design offenlegt.
- **Fehlermodus.** Die Red-Team-Suite und die Guardrails werden aus Gewohnheit gewählt. Bedrohungen,
  die für das System spezifisch sind (ein vergiftetes Korpus, manipulierte Gewichte, Extraktion über
  die API, ein Tool mit mehr Geltungsbereich als die Aufgabe benötigt), haben keinen Eigentümer und
  keinen Test. Nach einem Incident kann niemand zeigen, dass die Bedrohung jemals berücksichtigt
  wurde.

## Lösung
Halten Sie das Bedrohungsmodell neben dem Designdatensatz als Daten, und lassen Sie die
Designüberprüfung fehlschlagen, wenn sie unvollständig ist.

1. **Geltungsbereich aus dem Design.** Zerlegen Sie die Datenflüsse (Datenquellen,
   Trainings-Pipeline, Modellartefakt und Registry, Abrufkorpus, Prompts, Tools, Inference-API,
   nachgelagerte Verbraucher) und markieren Sie die Vertrauensgrenzen. Trainingsdatenspeicher und
   die Modell-Registry sind im Geltungsbereich [2].
2. **Stellen Sie die vier Fragen.** Das Threat Modeling Manifesto rahmt die Arbeit als "What are we
   working on?", "What can go wrong?", "What are we going to do about it?" und "Did we do a good
   enough job?" [4]. Die erste ist das Datenflussdiagramm; die nächsten zwei sind die Zeilen
   darunter; die letzte ist das Gate.
3. **Zählen Sie pro Element auf, dann erweitern Sie.** Gehen Sie jedes Element mit STRIDE [1] durch,
   dann fügen Sie die KI-spezifischen Klassen hinzu: die Evasion-, Poisoning-, Privacy- und
   Misuse-Angriffe von NIST AI 100-2 E2025 [5], die Techniken von MITRE ATLAS [3], und die OWASP Top
   10 for LLM Applications 2026 [6] und for Agentic Applications 2026 [7] für generative und agentic
   Systeme. Die Tabelle ist eine Startcheckliste, keine vollständige.

   | STRIDE-Kategorie | KI-spezifische Lesart | Katalog-IDs (Beispiele) |
   |---|---|---|
   | Spoofing | Ein gefälschter Modell- oder Datensatzursprung; ein imitierter Agent oder Tool-Server | `AML.T0010.003`; `ASI03`, `ASI04` |
   | Tampering | Vergiftete Trainingsdaten; ein manipuliertes Modell; Anweisungen, die durch abgerufene Inhalte injiziert werden | `AML.T0020`, `AML.T0018`, `AML.T0051.001`; `LLM05:2026`, `LLM01:2026` |
   | Repudiation | Eine Agent-Aktion ohne zuordnungsbare Identität; eine Entscheidung ohne Datensatz | `ASI03` |
   | Information Disclosure | Membership Inference, Model Inversion oder Model Extraction über die Inference-API | `AML.T0024.000`, `AML.T0024.001`, `AML.T0024.002` |
   | Denial of Service | Unbegrenzter Verbrauch von Tokens, Compute oder Tool-Aufrufen | `LLM06:2026` |
   | Elevation of Privilege | Übermäßige Agency oder Tool-Missbrauch; eine Modelldatei, die Code beim Laden ausführt | `LLM03:2026`, `ASI02`; `AML.T0011.000` |

4. **Bewerten und entscheiden.** Bewerten Sie jede Bedrohung auf den Wahrscheinlichkeits- und
   Schweregrad-Skalen der Organisation und entscheiden Sie: mitigieren, vermeiden, übertragen oder
   akzeptieren. Eine akzeptierte Bedrohung wird ein Risk-Register-Eintrag mit einem benannten
   Akzeptor; eine mitigierte benennt ihre Kontrollen.
5. **Schließen Sie die Schleife mit einem Test.** Jede mitigierte Bedrohung trägt die ID des Tests,
   der die Mitigation beweist: ein Red-Team-Fall, eine Eval, eine Pipeline-Prüfung (eine Signatur
   oder Hash-Verifizierung), ein Guardrail-Test. Die Designüberprüfung ist ein Gate: Sie schlägt
   fehl, während eine Bedrohung über der Toleranz keine Mitigation oder keinen Test hat.
6. **Erneut öffnen bei Auslösern.** Ein neues Tool, eine Datenquelle, ein Modell oder eine
   Exposition, ein Incident oder Near Miss, oder eine relevante neue Technik in den Katalogen öffnet
   das Modell erneut. Da die Datei versioniert ist, ist die Wiedereröffnung ein Diff mit einem
   Reviewer.

Für Hochrisiko-Systeme unter dem EU AI Act ist die Ausgabe auch Nachweis von `Art. 15(5)`:
Widerstandsfähigkeit gegen Versuche von unbefugten Dritten, Schwachstellen auszunutzen, mit
technischen Lösungen, die, wo angemessen, Maßnahmen gegen Datenvergiftung, Modellvergiftung durch
"vorgefertigte Komponenten, die beim Training verwendet werden", adversarische Beispiele,
Vertraulichkeitsangriffe und Modellmängel umfassen [8]. Anbieter von Modellen mit allgemeinem
Verwendungszweck mit systemischem Risiko müssen "ein angemessenes Niveau des Cybersecurity-Schutzes"
für das Modell und seine physische Infrastruktur sicherstellen (`Art. 55(1)(d)`) [8]. Das AI RMF
verlangt, dass Sicherheit und Widerstandsfähigkeit "evaluiert und dokumentiert" werden (MEASURE 2.7)
[9].

Illustrativer Bedrohungseintrag, eine Zeile der Datendatei des Modells:

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

> **Beispiel (illustrativ)** Die erste Designüberprüfung eines Support-Assistenten listete Prompt
> Injection auf und stoppte dort. Das Durchgehen des Datenflussdiagramms Element für Element fügte
> drei Zeilen hinzu: Dokumente aus einem Partner-Wiki traten unkontrolliert in das Korpus ein, die
> Modellgewichte wurden von einem öffentlichen Hub nach Tag statt nach Digest gezogen, und das
> Ticket-Tool konnte jedes Ticket schließen, nicht nur das des Anforderers. Jede Zeile bekam eine
> Kontrolle und einen Test: eine Ingestion-Allow-List mit Planted-Instruction-Fällen, Digest-Pinning
> mit einer Pipeline-Prüfung und ein scoped Tool mit einem Denial-Test. Das Designüberprüfungs-Gate
> schlägt jetzt fehl, wenn eine Bedrohungszeile deren `tests`-Liste leer ist.

## Konsequenzen
Die Red-Team-Suite, die Guardrails und die Supply-Chain-Prüfungen führen zurück zu benannten
Bedrohungen, und der Sicherheitsfall für eine Version ist eine Abfrage über die Datei. Die Kosten:
Bedrohungsmodellierung erfordert geschickte Zeit; die Kataloge ändern sich monatlich, sodass jemand
die Delta-Überprüfung besitzt; und ein Bedrohungsmodell ist nur so gut wie das Datenflussdiagramm,
das driftet, wenn der Designdatensatz nicht aktuell gehalten wird.

## Verwandte Muster
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Model Artefact Integrity](/patterns/model-artefact-integrity);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering).

**Zuordnung:** EU AI Act Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.2, A.6.2.4 · NIST AI RMF
(Map 5.1; Measure 2.7) · OWASP LLM01:2026, LLM05:2026 · OWASP Agentic ASI02/ASI03/ASI04 · MITRE
ATLAS · Layer 01 Govern-as-Code / Layer 03 Evals & Red Teaming as Evidence.

Threat-IDs folgen dem OWASP Top 10 for LLM Applications 2026 [6] und for Agentic Applications 2026
[7] und MITRE ATLAS [3]; Funktions- und Unterkategorie-Etiketten folgen dem NIST AI RMF [9]; ISO/IEC
42001 Annex A-IDs folgen einem veröffentlichten Crosswalk, nicht dem Text des Standards [10].
Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Threats: Microsoft Threat Modeling Tool (STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[2] Threat Modeling AI/ML Systems and Dependencies (A. Marshall, J. Parikh, E. Kiciman, R. Shankar Siva Kumar; supplements SDL threat modelling; "Training Data stores and the systems that host them are part of your Threat Modeling scope"). Microsoft Learn. 2019-11 (page dated 2025-03-12). https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml (verified: primary)
[3] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; AML.T0018 Manipulate AI Model; AML.T0020 Training Data Poisoning; AML.T0024.000 Infer Training Data Membership, .001 Invert AI Model, .002 Extract AI Model; AML.T0051.001 LLM Prompt Injection: Indirect). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[4] Threat Modeling Manifesto (definition: "analyzing representations of a system to highlight concerns about security and privacy characteristics"; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-24). https://www.threatmodelingmanifesto.org/ (verified: primary)
[5] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (attack classes incl. evasion, poisoning, privacy compromises and misuse enablement). NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[6] OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM03 Excessive Agency, LLM04 Supply Chain, LLM05 Data and Model Poisoning, LLM06 Unbounded Consumption). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[7] Top 10 for Agentic Applications 2026 (ASI01 to ASI10; ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities (data poisoning, model poisoning through pre-trained components, adversarial examples or model evasion, confidentiality attacks, model flaws); Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 5.1 likelihood and magnitude of each identified impact; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.2 AI system requirements and specification, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
