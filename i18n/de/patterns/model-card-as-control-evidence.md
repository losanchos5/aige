---
lang: de
source: bok/patterns/model-card-as-control-evidence.md
sourceHash: "cddf209c7453ca3f97f56c7e81e3b253cf62ca5f325d86017a9fe3072fc64607"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-card-as-control-evidence
title: Model Card as Control Evidence
layer: 2
order: 6
summary: "Modell- und Datenkarten, die aus der Pipeline als strukturierte Evidenz regeneriert werden, sodass Transparenzdokumente das System beschreiben, wie es heute läuft."
---

# Muster: Model Card as Control Evidence

**Zusammenfassung:** Behandeln Sie die Modellkarte und die Datenkarte nicht als einmal geschriebene
Launch-Dokumentation, sondern als strukturierte Evidenz, die aus der Pipeline regeneriert wird,
sodass Transparenzdokumente das System beschreiben, wie es jetzt ist, und die Assurance-Schicht
speisen.

## Ziele
Konvertieren Sie Transparenzdokumentation von einem statischen PDF in ein versioniertes Artefakt,
das sowohl für Menschen lesbar als auch maschinenlesbar ist, und das als Kontrollevidence zählt.

## Zielbenutzer
KI-Governance-Engineer, ML Engineer, DPO.

## Betroffene Stakeholder
Modellbesitzer, Benutzer, Auditor, Datensubjekte.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Beweis zu erzeugen; machen Sie den kontrollierten
Weg zum einfachsten Weg.

## Kontext
Ein System, das Transparenzverpflichtungen unterliegt, bei dem Karten traditionell beim Start
geschrieben und nie wieder berührt werden.

## Problem
Eine Modellkarte, die einmal geschrieben wird, verfällt zu Fiktion, wenn sich das Modell, Prompts
und Datensätze ändern. Eine Karte, die nicht regeneriert wird, kann nicht als Evidenz vertraut
werden und täuscht genau den Auditor, dem sie helfen sollte.

## Lösung
Vorlagieren Sie die Karte und füllen Sie sie aus der Pipeline: beabsichtigte Verwendung,
Evaluationsergebnisse (aus dem Eval Gate), Datensätze (aus der AIBOM), bekannte Einschränkungen und
Besitzer. Regenerieren Sie bei jeder signifikanten Änderung und versionieren Sie sie mit dem Modell.
Speichern Sie die Karte als strukturierte Daten, sodass sie sowohl von einer Person gelesen als auch
von der Assurance-Schicht verbraucht werden kann.

> **Beispiel (illustrativ)** Die Karte eines Klassifizierers wird bei jedem Deploy neu erstellt und
> zieht automatisch seine neuesten Fairness-Eval-Scores und Dataset-Provenance, sodass die Karte,
> die ein Auditor liest, die Karte ist, die die Produktion erzeugt hat.

## Konsequenzen
Transparenz bleibt wahr und dient doppelt als Evidenz. Die Kosten sind Vorlagierung und
Pipeline-Verkabelung, und die Vereinbarung, was "signifikante Änderung" eine Regeneration auslöst.

## Verwandte Muster
[AIBOM](/patterns/aibom); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[FRIA-as-Code](/patterns/fria-as-code).

**Zuordnung:** EU AI Act Art. 11, Art. 13 (Transparenz) · ISO/IEC 42001, ISO/IEC 42005 · NIST AI RMF
(Map, Measure) · Layer 02 Inventory & Transparency.

Funktions-Labels folgen dem NIST AI RMF [1]. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
