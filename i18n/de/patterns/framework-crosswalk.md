---
lang: de
source: bok/patterns/framework-crosswalk.md
sourceHash: "4ac2ee65dbf30c778130711d8563719cfe4cbeeea2929df2e3e488f1269bad4e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: framework-crosswalk
title: Framework Crosswalk
layer: 1
secondaryLayer: 5
order: 12
summary: "Eine Karte von jeder Kontrolle zu den Framework-Klauseln, die sie erfüllt, generiert aus den Kontrollen: ein Index zur Wiederverwendung, nie ein Beweis, dass eine Kontrolle wirkt."
---

# Muster: Framework Crosswalk

**Zusammenfassung:** Führen Sie eine Zuordnung von jeder Kontrolle zu den Framework-Klauseln, die
sie erfüllt, generiert aus den Kontrollen selbst, als Index für Navigation und Wiederverwendung, nie
als Endzustand. Ein Crosswalk beweist, dass Sie das Framework gelesen haben; er beweist nicht, dass
die Kontrolle wirkt.

## Ziele
Lassen Sie eine Kontrolle viele Frameworks erfüllen und machen Sie die Abdeckung navigierbar,
während Sie sich weigern, Abdeckung mit Assurance zu verwechseln.

## Zielbenutzer
KI-Governance-Engineer, Compliance-Leiter, Prüfer.

## Betroffene Stakeholder
Prüfer, Regulierungsbehörden, Modellverantwortliche.

## Relevante Prinzipien
Machen Sie den geregelten Weg zum einfachsten Weg; instrumentieren Sie den Build, um seinen eigenen
Beweis zu erbringen.

## Kontext
Eine Organisation, die mehreren überlappenden Frameworks antwortet (KI-Verordnung, ISO/IEC 42001,
NIST AI RMF, CSA AICM), die ansonsten die gleiche Kontrolle mehrmals implementieren würde.

## Problem
Der Crosswalk ist, wo Framework-Theater beginnt. Eine grüne Zuordnungsmatrix wird mit einer
funktionierenden Kontrolle verwechselt; eine 300-Zeilen-Tabelle, die Kontrollen fünf Frameworks
zuordnet, wird als Reife präsentiert, während nichts misst, ob eine zugeordnete Kontrolle das Risiko
reduziert.
**Das Anti-Muster ist, Abdeckung als Kontrolle zu behandeln: eine Zuordnungszelle ist keine Evidenz.**

## Lösung
Generieren Sie den Crosswalk aus den Kontrollen, nicht neben ihnen: Jede Policy Card und Eval Gate
erklärt die Klauseln, auf die sie sich abbildet, und der Crosswalk ist die Aggregation. Verwenden
Sie ihn, um Lücken zu finden und Kontrollen wiederzuverwenden, nicht um Compliance zu melden. Jede
Zuordnungszelle muss sich zu einer laufenden Kontrolle und ihrer emittierten Evidenz auflösen; eine
Zelle ohne Evidenz dahinter wird gekennzeichnet, nicht gezählt. Referenzvokabulare wie das CSA AICM
(247 Kontrollziele über 18 Domänen) [1] und der OWASP Agent Control Standard [2] verankern die
Zuordnung.

> **Beispiel (illustrativ)** Wenn Sie auf eine grüne Zelle für "Logging" klicken, öffnet sich der
> Guardrail und die OSCAL-Evidenz, die er diese Woche emittiert hat; eine Zelle ohne Evidenz wird
> bernsteinfarben, nicht grün.

## Konsequenzen
Kontrollen werden über Frameworks hinweg wiederverwendet und Lücken sind sichtbar, ohne eine Matrix
in falsche Assurance aufzublasen. Der Kompromiss ist die Disziplin, Zellen ehrlich zu halten und
sich zu weigern, Abdeckung als Ergebnis zu melden.

## Verwandte Muster
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Zuordnung:** KI-Verordnung (übergreifend) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM ·
OWASP Agent Control Standard · Layer 01 Governance-as-Code / Layer 05 Assurance & Continuous
Compliance.

Funktionsetiketten folgen dem NIST AI RMF [3]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
