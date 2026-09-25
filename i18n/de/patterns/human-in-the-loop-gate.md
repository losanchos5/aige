---
lang: de
source: bok/patterns/human-in-the-loop-gate.md
sourceHash: "001841890c7b27ac0f909a695784012afe2cfa21e43a6f8ebf77a3447e788526"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: human-in-the-loop-gate
title: Human-in-the-loop Gate
layer: 4
order: 15
summary: "Ein Genehmigungsschritt durch eine Person an einem definierten Entscheidungspunkt mit hohen Konsequenzen, sodass die Autonomie eines Agenten genau dort endet, wo die Einsätze die Latenz rechtfertigen."
---

# Muster: Human-in-the-loop Gate

**Zusammenfassung:** Verlangen Sie eine Genehmigung durch eine Person an einem definierten,
hochkonsequenten Entscheidungspunkt, bevor eine Aktion eines Agenten wirksam wird, sodass die
Autonomie durch eine Person genau dort begrenzt wird, wo die Einsätze die Latenz rechtfertigen.
Aufsicht ist ein gestalteter Kontrollpunkt, nicht ein Nachgedanke.

## Ziele
Verlangen Sie aussagekräftige menschliche Aufsicht an einem definierten, hochkonsequenten
Entscheidungspunkt, und zeichnen Sie die Entscheidung als Nachweis auf.

## Zielbenutzer
KI-Governance-Engineer, Produktverantwortlicher, Risikoinhaber.

## Betroffene Stakeholder
Betroffene Personen, Nutzer, Modellinhaber, Regulatoren.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; registrieren und begrenzen Sie jeden
Akteur, bevor er handelt.

## Kontext
Ein Agent, dessen Aktionen einige umfassen, die irreversibel sind oder die Rechte von Personen
beeinflussen (eine Zahlung, eine Ablehnung, eine Veröffentlichung), neben vielen, die Routine sind.

## Problem
Vollständige Autonomie über eine hochkonsequente Aktion beseitigt die menschliche Aufsicht, die
Recht und Risiko beide erfordern; vollständige manuelle Überprüfung jeder Aktion zerstört den Wert
des Agenten. Undifferenzierte Aufsicht schlägt in beide Richtungen fehl.

## Lösung
Klassifizieren Sie Aktionen nach Konsequenz. Für die hochkonsequente Klasse gaten Sie die Aktion
hinter einen Genehmigungsschritt durch eine Person mit ausreichend Kontext zum Entscheiden, und
blockieren Sie die Aktion bis zur Genehmigung. Protokollieren Sie den Genehmiger, den Kontext und
die Entscheidung als Nachweis. Halten Sie die Routineklasse unter Guardrails autonom. Dies
realisiert die KI-Verordnung Art. 14 Anforderung der menschlichen Aufsicht [1] am Punkt der Aktion.

> **Beispiel (illustrativ)** Ein Agent kann Rückerstattungen autonom entwerfen und in die
> Warteschlange stellen, aber jede Rückerstattung über einem Schwellenwert wird für einen benannten
> menschlichen Genehmiger gehalten, dessen Entscheidung gegen die Transaktion protokolliert wird.

## Konsequenzen
Aufsicht landet dort, wo sie zählt, ohne Routinearbeit zu drosseln, und die Genehmigung ist
nachprüfbar. Die Kosten sind die Gestaltung der Konsequenzklassifizierung und die Latenz, die sie zu
gaten Aktionen hinzufügt.

## Verwandte Muster
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Runtime Guardrail](/patterns/runtime-guardrail); [Policy Card](/patterns/policy-card);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[FRIA-as-Code](/patterns/fria-as-code).

**Zuordnung:** KI-Verordnung Art. 14 · ISO/IEC 42001 · NIST AI RMF (Manage) · OWASP Agentic ASI02 ·
Layer 04 Runtime Controls & Observability.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [2] und Funktionsetiketten dem NIST
AI RMF [3]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 14 (human oversight of high-risk AI systems). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
