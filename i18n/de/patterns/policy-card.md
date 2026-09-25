---
lang: de
source: bok/patterns/policy-card.md
sourceHash: "95594508eddf7681f1fbddc9909215a928bd9b78c9f9df12c2ab751cfa63a6f8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: policy-card
title: Policy Card
layer: 1
order: 1
summary: "Eine Governance-Regel, die als maschinenlesbares Kartenelement geschrieben ist, das die Pipeline und die Runtime beide evaluieren, wobei ein Urteil bei jeder Überprüfung hinterlassen wird."
---

# Muster: Policy Card

**Zusammenfassung:** Drücken Sie eine Governance-Regel als maschinenlesbares Artefakt aus, das mit
dem Modell oder Agent reist und in der Pipeline und zur Runtime evaluiert wird, anstatt als Prosa,
die ein Mensch anwenden muss. Die Policy Card kodiert zulässige und verbotene Aktionen,
Verpflichtungen und Anforderungen an Evidenz für ein KI-System und verlinkt auf die Enforcement- und
Audit-Pipelines, die darauf einwirken [1].

## Ziele
Verwandeln Sie eine Richtlinie von einer Absichtserklärung in eine ausführbare Kontrolle,
versioniert und testbar, sodass eine Regeländerung ein überprüfbarer Diff ist und jede Evaluierung
ein Urteil hinterlässt.

## Zielbenutzer
KI-Governance-Engineer, Plattform-Team, Policy-Besitzer.

## Betroffene Stakeholder
Modellbesitzer, Betreiber, Auditor, Regulatoren.

## Relevante Prinzipien
Bauen Sie die Kontrolle an dem frühesten Punkt auf, an dem sie blockieren kann; machen Sie den
kontrollierten Weg zum einfachsten Weg.

## Kontext
Eine Organisation mit mehr als einer Handvoll KI-Systemen und einer Governance-Funktion, die nicht
jede Änderung von Hand überprüfen kann. Regeln existieren, aber leben in Dokumenten, die keine
Pipeline lesen kann.

## Problem
Prosa-Richtlinien können nicht automatisch durchgesetzt werden, weichen von den Systemen ab, die sie
regeln, und hinterlassen keinen Nachweis ihrer Anwendung. Eine Regel, die nur im Gedächtnis behalten
werden kann, wird verletzt, sobald jemand sie vergisst.

## Lösung
Schreiben Sie jede Regel als Policy Card: ein strukturiertes, maschinenlesbares Artefakt
(beispielsweise für eine `OPA/Rego` oder `Cedar` Engine oder als Policy-Cards-Dokument), das
Allow/Deny-Logik, den Fehlermodus, den es adressiert, und die Framework-Klauseln, denen es
zugeordnet ist, angibt. Speichern Sie es mit dem System, das es regelt. Evaluieren Sie es vor dem
Merge, bei der Bereitstellung und (wenn die Regel eine Laufzeitbeschränkung ist) zum Zeitpunkt der
Aktion. Geben Sie bei jeder Evaluierung ein Urteil aus (Regel-ID, Input-Hash, Entscheidung,
Zeitstempel).

Illustratives Schema für das Urteil:

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Beispiel (illustrativ)** Eine Policy Card für einen Kundenservice-Agent erklärt, dass dieser das
> Rückerstattungstool nur bis zu einem begrenzten Betrag und niemals außerhalb der Geschäftszeiten
> aufrufen darf; dieselbe Card wird in CI gegen den deklarierten Umfang des Agenten evaluiert und
> zur Laufzeit durch den Tool-Call-Guardrail durchgesetzt.

## Konsequenzen
Regeln werden durchsetzbar und prüfbar, und der Framework Crosswalk generiert sich selbst. Die
Kosten liegen in der Erstellung und Wartung von Cards sowie in der Disziplin, die ausführbare
Version als maßgeblich gegenüber der Prosa zu halten.

## Verwandte Muster
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials).

**Zuordnung:** EU AI Act Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM · OWASP Agentic
ASI02/ASI03 · Layer 01 Governance-as-Code.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [2] und Funktionsetiketten dem NIST
AI RMF [3]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
