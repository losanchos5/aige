---
lang: de
source: bok/patterns/kill-switch-circuit-breaker.md
sourceHash: "4085d3a3066ab6f5a2bcc5c008d937c4de6c9c26c7df7f845dc56669c3cab6bc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: kill-switch-circuit-breaker
title: "Kill Switch / Circuit Breaker"
layer: 4
order: 9
summary: "Ein getesteter Mechanismus, der einen Agent oder eine Klasse von Agenten am Aktionspunkt stoppt und seinen Zugriff widerruft, ohne den Rest der Flotte zu unterbrechen."
---

# Muster: Kill Switch / Circuit Breaker

**Zusammenfassung:** Stellen Sie einen getesteten Mechanismus bereit, um einen Agent oder eine
Klasse von Agenten am Aktionspunkt zu stoppen, den Zugriff zu widerrufen und Tool-Aufrufe zu
unterbrechen, ohne den Rest der Flotte zu unterbrechen. Autonomie wird nur dort gewährt, wo sie
entzogen werden kann.

## Ziele
Begrenzen Sie den Explosionsradius eines fehlerhaften oder kompromittierten Agenten, und machen Sie
"stoppen Sie ihn" zu einer Kontrolle, die ausgeübt wurde, nicht zu einer Behauptung.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, SRE.

## Betroffene Stakeholder
Modellbesitzer, Benutzer, Incident Responder, betroffene Dritte.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; beginnen Sie mit einem benannten
Fehlermodus oder Schaden.

## Kontext
Agenten, die autonom handeln (Tools aufrufen, Daten oder Geld verschieben), wo ein einzelner Fehler
kaskadieren kann. Gartner erwartet, dass bis 2029 mehr als die Hälfte erfolgreicher Angriffe auf
KI-Agenten Schwächen in der Zugriffskontrolle und Prompt-Injection ausnutzen {[1]}.

## Problem
Ein Agent, der nicht präzise gestoppt werden kann, kann nur gestoppt werden, indem alles
unterbrochen wird. Eine Flotte auf gemeinsamen Anmeldedaten bedeutet, dass ein Vorfall zu einer Wahl
zwischen dem Laufen des Agenten und dem Rotieren eines Geheimnisses zwingt, das die ganze Flotte
stoppt.

## Lösung
Binden Sie jeden Agenten an seine eigene Identität (siehe
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)), damit der
Zugriff pro Agent widerrufen werden kann. Implementieren Sie einen Circuit Breaker an der
Tool-Call-Grenze, der bei einem definierten Signal auslöst: ein Schwellenwertbruch, eine Anomalie,
ein manueller Pull. Testen Sie den Kill Switch nach Zeitplan; ein nicht getesteter Kill Switch ist
keine Kontrolle.

> **Beispiel (illustrativ)** Ein Zahlungsagent-Circuit Breaker wird automatisch ausgelöst, wenn
> seine Rate für nicht autorisierte Tool-Aufrufe einen Schwellwert überschreitet, wobei nur der
> Umfang dieses Agenten widerrufen wird, während der Rest der Flotte weiterläuft; der Pull wird
> monatlich geübt.

## Konsequenzen
Vorfälle sind auf einen Agent beschränkt und die Wiederherstellung ist schnell. Die Kosten sind
Pro-Agent-Identitäts-Rohrleitungen und die Technik, um die Sperrung sofort und sicher zu machen.

## Verwandte Muster
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Agent Registry](/patterns/agent-registry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Zuordnung:** EU KI-Verordnung Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM ·
OWASP Agentic ASI02/ASI10 · Layer 04 Runtime Controls & Observability.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [2] und Funktionsetiketten dem NIST
AI RMF [3]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
