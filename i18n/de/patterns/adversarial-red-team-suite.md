---
lang: de
source: bok/patterns/adversarial-red-team-suite.md
sourceHash: "c4d084fd1712d0e8721e2a1ba027323a2a5cdcd94936434061e34b761a4d8b51"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: adversarial-red-team-suite
title: Adversarial Red-Team Suite
layer: 3
order: 3
summary: "Eine versionierte Adversarial Suite, die aus einer Threat-Taxonomie aufgebaut ist, in CI oder nach Plan ausgeführt wird und deren Findings triagiert, aufgezeichnet und als Tests zurückgeführt werden."
---

# Muster: Adversarial Red-Team Suite

**Zusammenfassung:** Führen Sie eine versionierte Adversarial-Test-Suite, aufgebaut aus einer
Threat-Taxonomie und in CI oder nach Plan ausgeführt, deren Ergebnisse in Fixes oder akzeptierte
Risiken triagiert, als Nachweise dokumentiert und in die Suite zurückgeführt werden. Wenn ein Eval
Gate beweist, dass ein Schwellenwert noch hält, ist die Red-Team-Suite der stehende Gegner, der
weiterhin die Eingaben findet, die der Schwellenwert nie erwartet hat.

## Ziele
Wandeln Sie Adversarial Testing von einer einmaligen Übung in ein gepflegtes, versioniertes Control
um, das Fehlermodi entdeckt, bevor ein Angreifer es tut, und hinterlässt einen triaguierten,
prüfbaren Datensatz jedes Findings.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, ML Engineer, Red-Team-Lead.

## Betroffene Stakeholder
Model Owner, Benutzer, die dem System ausgesetzt sind, Incident Responder, Auditor, Regulatoren.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; geben Sie jedem Control Zähne.

## Kontext
Ein Modell oder Agent, dessen Exposition wächst, wenn es Tools, Prompts und Reichweite gewinnt, in
einer Organisation, die bereits ein Eval Gate für Regression betreibt und einen stehenden Adversary
anstelle eines einzelnen Pre-Launch-Penetrationstests möchte.

## Problem
Ein einmaliger Red-Team ist veraltet, sobald sich das System ändert, und seine Findings, eine Folie
von Jailbreaks, hinterlassen keine Spur, dass sie behoben oder akzeptiert wurden. Ohne eine
versionierte Suite und einen Triage-Datensatz wird derselbe Angriff jedes Quartal neu entdeckt und
niemand kann beweisen, welche Findings geschlossen wurden.

## Lösung
Bauen Sie die Suite aus einer Threat-Taxonomie statt aus Intuition auf: ziehen Sie Techniken aus
MITRE ATLAS's adversarial tactics and techniques for AI systems [1] und den agentic attack classes
in der OWASP Top 10 for Agentic Applications [2], damit jeder Test zu einer benannten Technik führt.
Versionieren Sie die Suite zusammen mit dem Modell und führen Sie sie in CI oder nach Plan gegen die
registrierte Version aus. Leiten Sie jedes Finding durch Triage (Fix oder Akzeptanz mit
aufgezeichneter Begründung und Owner) und dokumentieren Sie das Ergebnis als strukturierten
Evidence-Datensatz gegen den Registry-Eintrag. Speisen Sie jedes bestätigte Finding als
Regressions-Test zurück in die Suite, damit ein geschlossener Angriff geschlossen bleibt. Die Suite
ergänzt das Eval Gate: das Gate erzwingt einen Threshold bei jeder Freigabe, die Suite ist der
Adversary, der den nächsten generiert.

> **Beispiel (illustrativ)** Eine Red-Team Suite für einen Customer-Service-Assistenten führt einen
> versionsgesteuerten Satz von Prompt-Injection- und Tool-Abuse-Fällen aus, die aus ATLAS und den
> OWASP Agentic Classes gezogen sind; ein neuer Tool-Exfiltration-Finding wird triagiert, behoben
> und zur Suite hinzugefügt, damit die nächste Freigabe ihn bestehen muss.

### Vom Threat Model zum Test Plan

Eine Suite, die aus einer Taxonomie aufgebaut ist, benötigt immer noch einen Grund für jeden Fall.
Dieser Grund ist das Threat Model des Systems wie bereitgestellt, und der Schritt, der eines in das
andere umwandelt, wird aufgeschrieben, damit ein Reviewer sehen kann, warum die Suite enthält, was
sie enthält, und was sie auslässt.

1. **Decompose the system.** Zeichnen Sie die Datenflüsse wie sie laufen: Benutzer, die Anwendung,
   Retrieval, das Modell, die Tools und ihre Credentials, Memory und jeder Downstream-Consumer von
   Outputs. Markieren Sie jede Trust Boundary und markieren Sie, welche Komponenten Sie besitzen und
   welche ein Provider betreibt.
2. **Enumerate threats per element, by id.** Gehen Sie jedes Element gegen die KI-spezifischen
   Kataloge durch: die OWASP Top 10 for LLM Applications 2026 für das Modell als Komponente [3], die
   OWASP Top 10 for Agentic Applications für Tools, Memory und Delegation [2], MITRE ATLAS Techniken
   für den Pfad des Angreifers [1] und die NIST adversarial machine learning taxonomy für Angriffe
   auf prädiktive und generative Modelle wie Evasion, Poisoning und Privacy Attacks [4]. NIST's
   secure development profile für generative AI fordert genau dies: Risk Modelling, das
   KI-spezifische Vulnerability und Threat Types einschließt (`PW.1.1`) [5]. Zeichnen Sie jede
   Threat mit ihrer externen ID auf, damit das Modell `LLM01:2026` oder `AML.T0051` liest, nicht
   "Injection Risk".
3. **Name the control and the test that proves it.** Schreiben Sie für jede Threat im Scope das
   Control, das sie stoppen soll, und den Test, der fehlschlagen würde, wenn das Control nicht
   funktioniert. Der Test wird ein Suite-Eintrag im Test Plan der Freigabe, der gegen
   [`test-plan.v1.json`](/schemas/test-plan.v1.json) validiert: eine versionierte Suite-ID, die
   Kategorie (`adversarial`, `security`, `privacy`), die Metrik, ein vor dem Test festgelegter
   Threshold, der Fehlermodus, den er schützt, und ob ein Fehler die Freigabe blockiert.
4. **Tag every case with its threat ids.** Ein Case trägt die IDs der Threats, die er ausübt, und
   ein Finding erbt sie, damit ein Finding von Technik zu Control zu der Eval führt, die es jetzt
   schützt, und ein Coverage-Report die In-Scope-Threats auflisten kann, die noch kein Case ausübt.
5. **Record what is out of scope, and why.** Eine Threat, der sich das System nicht stellen kann
   (keine Tools, kein Memory, keine personenbezogenen Daten), wird mit einem Grund geschlossen; eine
   Threat, die Sie nicht testen können (die Weights eines Providers), wird als Provider-attestierte
   Evidence zum [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)
   geleitet. Führen Sie den Schritt erneut aus, wenn sich die Datenflüsse ändern: ein neues Tool,
   ein neues Corpus, ein neues Modell.

Die [threat bridge](/resources/threats) hält das Ergebnis der Schritte 2 und 3 als offene Daten:
jede Zeile nimmt eine externe Threat-ID zu den Patterns, die sie kontrollieren, ein Beispiel Eval,
das sie testet, und die Obligations, die die Evidence erfüllt.

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

## Konsequenzen
Adversarial Coverage wächst über die Zeit statt bei jedem Launch zurückzusetzen, und der
Triage-Datensatz zeigt, was gefunden, behoben oder akzeptiert wurde. Die Kosten sind die Wartung der
Taxonomie und Suite, die Compute zum häufigen Ausführen von Adversarial Cases und die Disziplin,
jedes Finding zu triagieren statt es verfallen zu lassen. Der Threat-Model-Schritt hat seine eigene
Wartung: das Modell wird veraltet, sobald ein Tool oder ein Corpus hinzugefügt wird, also muss es
bei Änderung erneut ausgeführt werden, nicht einmal pro Jahr.

## Verwandte Muster
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Zuordnung:** EU AI Act Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) ·
OWASP Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Threat IDs folgen der OWASP Top 10 for Agentic Applications 2026 [2] und Function Labels dem NIST AI
RMF [6]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] OWASP GenAI LLM Top 10 2026 (LLM01 Prompt Injection to LLM10 Improper Output Handling; published 3 Aug 2026; canonical Markdown in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (predictive and generative AI attack classes with NISTAML identifiers). NIST. 2025-03-24. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[5] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (recommendation R1 on SSDF 1.1 task PW.1.1: include AI model-specific vulnerability and threat types in risk modelling). NIST. 2024-07. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
