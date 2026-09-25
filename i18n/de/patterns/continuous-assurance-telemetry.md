---
lang: de
source: bok/patterns/continuous-assurance-telemetry.md
sourceHash: "289ffc6b24e3f832cc89b6f955693212f1589d484bb837315d06e2b3b4328273"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: continuous-assurance-telemetry
title: Continuous Assurance Telemetry
layer: 5
order: 7
summary: "Kontrollentscheidungen werden in einen Assurance-Store gestreamt, während sie passieren, sodass ob ein Control funktioniert, eine Live-Abfrage ist, nicht eine Punkt-in-Zeit-Attestation."
---

# Muster: Continuous Assurance Telemetry

**Zusammenfassung:** Streamen Sie Kontrollentscheidungen (Policy-Verdikt, Eval-Ergebnisse,
Guardrail-Aktionen, Identitätsereignisse) in einen Assurance-Store, während sie passieren, sodass
der Status eines Controls eine Live-Abfrage statt einer Punkt-in-Zeit-Attestation ist.
Vertrauenswürdigkeit wird zu einem kontinuierlich generierten Signal, nicht zu einem statischen
Zertifikat [1].

## Ziele
Ersetzen Sie periodische Attestation durch Evidenz, die emittiert wird, während das System läuft,
sodass "funktioniert das Control?" durch Telemetrie beantwortet wird.

## Zielbenutzer
KI-Governance-Engineer, SRE/Platform-Team, Prüfer.

## Betroffene Stakeholder
Modellbesitzer, Prüfer, Regulatoren, Incident Responder.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; geben Sie jedem Control
Zähne.

## Kontext
Ein Stack, dessen untere Schichten bereits strukturierte Datensätze emittieren, und eine
Assurance-Funktion, die es satt hat, vor jedem Audit Ordner zusammenzustellen.

## Problem
Eine Attestation sagt, dass ein Control existierte, als jemand hinschaute; sie sagt nichts über die
Wochen dazwischen, während derer das Modell umtrainiert wurde und ein Agent ein Tool erhielt.
Punkt-in-Zeit-Evidenz verfällt sofort.

## Lösung
Lassen Sie jedes Control einen zeitgestempelten, strukturierten Datensatz in einen gemeinsamen
Assurance-Store auf einem Schema schreiben. Beheben Sie zuerst das Schema: ein minimal nützlicher
Evidenzdatensatz ist
`{control_id, subject (model/agent/system id + version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold, failure_mode/obligation ref, input_hash, actor, timestamp, signature}`.
Normalisieren Sie die Ausgabe jedes Tools in diese Form bei der Aufnahme, sodass heterogene Quellen
in einen durchsuchbaren Store zusammengesetzt werden, der auf der Registry-ID schlüsselt.

Illustratives Schema für den Evidenzdatensatz:

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Zwei Forschungsvorschläge verweisen auf die gleiche Idee und sind es wert, beobachtet zu werden,
nicht ganz übernommen zu werden: TAIP behandelt NIST TEVV-Ausgaben als wiederverwendbare AI
Assurance Objects, die sich über Systeme hinweg zusammensetzen [1], und AAGATE operationalisiert
eine Kontrolleben, die die NIST AI RMF-Funktionen für Agenten in der Produktion ausrichtet [2];
beide sind einzelne Preprints. Stellen Sie den aktuellen Status jedes Controls als Abfrage über den
Store aus.

> **Beispiel (illustrativ)** Eine Dashboard-Kachel für das Data-Residency-Control wird durch eine
> Live-Abfrage über emittierte Guardrail-Entscheidungen unterstützt; wenn das Control aufhört zu
> feuern, wird die Kachel innerhalb von Minuten rot, nicht bei der nächsten Prüfung.

## Konsequenzen
Die Prüfung wird zu einer Abfrage und Drift ist in nahezu Echtzeit sichtbar. Die Kosten sind der
Aufbau der Pipeline und des Speichers sowie die Definition eines gemeinsamen Evidenzschemas über
Tools hinweg.

## Verwandte Muster
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Zuordnung:** EU AI Act Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · CSA AICM · Layer
05 Assurance & Continuous Compliance.

Funktionsetiketten folgen dem NIST AI RMF [3]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[2] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
