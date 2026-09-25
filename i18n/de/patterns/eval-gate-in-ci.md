---
lang: de
source: bok/patterns/eval-gate-in-ci.md
sourceHash: "db2745d7602943a223d8898cfaeead6d0e348fe954232d642e744aefe3792ff8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: eval-gate-in-ci
title: Eval Gate in CI
layer: 3
order: 2
summary: "Eine Eval-Suite, die in die CI verdrahtet ist, sodass ein Modell oder Agent nur oberhalb eines dokumentierten Schwellwerts ausgeliefert wird: der Eval-Lauf ist die Kontrolle, sein Ergebnis der Nachweis."
---

# Muster: Eval Gate in CI

**Zusammenfassung:** Verdrahten Sie eine Eval-Suite in die CI/CD-Pipeline, sodass ein Modell oder
Agent einen definierten Test oberhalb eines dokumentierten Schwellwerts bestehen muss, bevor es
ausgeliefert werden kann. Der Eval-Lauf ist die Kontrolle und sein Ergebnis ist der Nachweis; ein
fehlgeschlagener Eval blockiert den Build.

## Ziele
Machen Sie "jeder Kontrolle Zähne geben" konkret: geben Sie einer testbaren Eigenschaft eine
Konsequenz, sodass ein Fehler eine Veröffentlichung stoppt, anstatt einen Befund zu dokumentieren.

## Zielbenutzer
KI-Governance-Engineer, ML-Engineer, Platform-Team.

## Betroffene Stakeholder
Modellbesitzer, Benutzer, die dem System ausgesetzt sind, Prüfer.

## Relevante Prinzipien
Geben Sie jeder Kontrolle Zähne; bauen Sie die Kontrolle an dem frühesten Punkt auf, an dem sie
blockieren kann.

## Kontext
Ein Modell oder Agent, das sich ändert (umgeschult, neu aufgefordert, mit einem neuen Tool
ausgestattet), und eine Pipeline, die bereits Tests für funktionale Korrektheit durchführt.

## Problem
Evaluationen, die einmal vor dem Start durchgeführt und in eine Folie eingefügt werden, beweisen
nach der nächsten Änderung nichts. Ein Review-Board, das nur Befunde bewerten kann, kann einen
geplanten Start nicht verhindern. Ohne ein Gate ist Evaluation Forschung, keine Kontrolle.

## Lösung
Versionieren Sie eine Eval-Suite zusammen mit dem Modell. Führen Sie mindestens eine Capability-Eval
und eine adversarische Eval in CI aus (zum Beispiel mit Inspect, promptfoo, Garak oder Giskard;
illustrativ). Legen Sie einen Schwellwert fest, der auf einen benannten Fehlermodus oder eine
Verpflichtung zurückgeht. Lassen Sie die Pipeline unter dem Schwellwert fehlschlagen. Geben Sie ein
strukturiertes Ergebnis aus (Suite-ID, Modellversion, Score, Schwellwert, Bestanden/Nicht bestanden,
Zeitstempel), das gegen den Registereintrag eingereicht wird.

Illustratives Schema für das Ergebnis:

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Beispiel (illustrativ)** Ein interner Coding-Agent muss eine Injektionsresistenz-Untergrenze und
> eine Regressionssuite vor der Bereitstellung bestehen; eine Veröffentlichung, die die Resistenz
> unter die Untergrenze senkt, lässt die Pipeline fehlschlagen und wird nicht ausgeliefert, bis sie
> behoben ist.

## Konsequenzen
Regressionen werden vor der Produktion erfasst und Nachweise sammeln sich automatisch an. Der
Kompromiss ist die Eval-Wartung, die Laufzeitkosten in CI und die Notwendigkeit, Schwellwerte zu
optimieren, um flaky Gates zu vermeiden.

## Verwandte Muster
[Policy Card](/patterns/policy-card);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence).

**Zuordnung:** KI-Verordnung Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP
Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [1] und Funktionsetiketten dem NIST
AI RMF [2]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
