---
lang: de
source: bok/patterns/runtime-guardrail.md
sourceHash: "6bebe5fd743c4435cfd24ed335b0c118e62d19e6f1794335bb1d4e37879939b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: runtime-guardrail
title: Runtime Guardrail
layer: 4
order: 8
summary: "Ein- und Ausgabe-Guardrails auf dem Live-Request-Pfad, die die Policy Card des Systems bei jedem Aufruf durchsetzen und ein Entscheidungsereignis für jeden ausgeben."
---

# Muster: Runtime Guardrail

**Zusammenfassung:** Platzieren Sie Ein- und Ausgabe-Guardrails auf dem Runtime-Pfad des Modells
oder Agenten, die seine Policy Card bei jedem Live-Request durchsetzen und eine Entscheidung an
Telemetrie und den Circuit Breaker ausgeben. Der Guardrail ist der Punkt, an dem eine in Layer 01
geschriebene Richtlinie und ein in Layer 03 getesteter Schwellenwert zu einer Aktion bei einem
echten Aufruf werden, nicht zu einer Behauptung über einen.

## Ziele
Erzwingen Sie Richtlinien am Punkt der Aktion, auf Ein- und Ausgaben, die kein Eval antizipiert hat,
und machen Sie jede Durchsetzung zu einem strukturierten Ereignis, das die Assurance- und
Incident-Layer verbrauchen können.

## Zielbenutzer
KI-Governance-Engineer, ML-Engineer, Security-Engineer, Platform-Team.

## Betroffene Stakeholder
Benutzer, Modellbesitzer, betroffene Personen, Incident-Responder, Auditor.

## Relevante Prinzipien
Geben Sie jeder Kontrolle Zähne; instrumentieren Sie den Build, um seinen eigenen Nachweis zu
erbringen.

## Kontext
Ein Agent oder Modell in Produktion, der auf Live-Eingaben reagiert, dessen Policy Card und
Eval-Schwellenwerte existieren, aber keinen Runtime-Durchsetzungspunkt haben, daher ist eine in CI
bewiesene Regel ungeschützt, sobald das System auf eine Eingabe trifft, die kein Test abdeckte.

## Problem
Richtlinien und Evals sind Momentaufnahmen; das System trifft dann auf Prompt-Injection, unsichere
Ausgaben und Tool-Aufrufe, die niemand überprüft hat. Ein Guardrail, das nur protokolliert, ist
Observability, die mit Kontrolle verwechselt wird: das System beobachtet sich selbst mit hoher
Auflösung fehlschlagen. Ohne einen Durchsetzungspunkt, der blockieren und ausgeben kann, ist die
Runtime die Lücke zwischen einer getesteten Kontrolle und einer unkontrollierten Aktion.

## Lösung
Platzieren Sie einen Guardrail auf beiden Seiten des Modell-/Agent-Pfads. Der Input-Guardrail
filtert Prompts und abgerufene Kontexte auf Injection und richtlinienwidrige Anfragen, bevor sie das
Modell erreichen; der Output-Guardrail filtert Generierungen und Tool-Aufrufe auf unsichere Inhalte,
Datenlecks und außerhalb des Geltungsbereichs liegende Aktionen, bevor sie wirksam werden. Erzwingen
Sie dieselbe Policy Card, die in CI evaluiert wird [1], damit die Runtime-Entscheidung und die
Pipeline-Entscheidung eine Regel teilen. Geben Sie bei jedem Aufruf ein strukturiertes Ereignis aus,
`{agent, direction (input/output), rule_id, decision (allow/block/redact), timestamp}`, an den
Assurance-Store ([Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)) und
signalisieren Sie bei einem definierten Verstoß den Circuit Breaker
([Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)). Guardrail-Frameworks
realisieren dies als Kategorie; der OWASP Agent Control Standard benennt die
Runtime-Control-Oberfläche [2]. Dies unterscheidet sich vom Kill Switch: der Guardrail entscheidet
einen Aufruf nach dem anderen und bleibt im Request-Pfad; der Breaker entzieht dem Agenten die
Autonomie im Großen, wenn die Signale des Guardrails einen Schwellenwert überschreiten.

> **Beispiel (illustrativ)** Der Input-Guardrail eines Kundenservice-Assistenten blockiert einen
> Prompt-Injection-Versuch und sein Output-Guardrail schwärzt eine Kontonummer, die das Modell
> zurückgeben wollte; beide Entscheidungen werden an den Assurance-Store ausgegeben, und ein Ansturm
> von Blöcken löst den Circuit Breaker aus.

## Konsequenzen
Das getestete Guardrail funktioniert auf Live-Traffic und jede Durchsetzung hinterlässt Nachweise;
das Guardrail ist auch der Sensor, den der Breaker und die Incident Pipeline lesen. Die Kosten sind
Latenz pro Aufruf, falsch positive Ergebnisse zum Abstimmen und das Synchronhalten der Runtime-Regel
mit der Policy Card und den Eval-Schwellwerten.

## Verwandte Muster
[Policy Card](/patterns/policy-card);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Zuordnung:** EU AI Act Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic
ASI02/ASI03 · Layer 04 Runtime Controls & Observability.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [3] und Funktionsetiketten dem NIST
AI RMF [4]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
