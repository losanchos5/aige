---
lang: de
source: bok/patterns/aibom.md
sourceHash: "6e929d4beb125a7562e751991ab3082ab4a2d2a41c33715bf06e279fb4a112d5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: aibom
title: AIBOM
layer: 2
order: 5
summary: "Eine KI-Stückliste, die beim Build ausgegeben wird, die Modelle, Datensätze, Gewichte und deren Herkunft in einem Standardformat neben dem Registry-Eintrag aufzeichnet."
---

# Muster: AIBOM

**Zusammenfassung:** Generieren Sie beim Build eine KI-Stückliste für jedes KI-System, die Modelle,
Datensätze, Gewichte und deren Herkunft in einem Standardformat aufzeichnet, und speichern Sie sie
mit dem Registry-Eintrag. Die AIBOM ist das, was die Transparenz- und Eval-Schichten lesen, um zu
wissen, was zu dokumentieren und was zu testen ist.

## Ziele
Machen Sie die Zusammensetzung und Herkunft eines KI-Systems maschinenlesbar, sodass
Supply-Chain-Risiko und Transparenzverpflichtungen aus einem Artefakt beantwortet werden können,
nicht rekonstruiert.

## Zielbenutzer
KI-Governance-Engineer, ML Engineer, Security Engineer.

## Betroffene Stakeholder
Modellbesitzer, nachgelagerte Betreiber, Prüfer, Beschaffung.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; beginnen Sie mit einem
benannten Fehlermodus oder Schaden.

## Kontext
KI-Systeme, die aus Foundation Models, Fine-Tunes, Datensätzen und Bibliotheken von Drittanbietern
zusammengesetzt sind, wobei die klassische SBOM Softwareabhängigkeiten erfasst, aber nicht Modelle
oder Daten.

## Problem
Ohne eine Stückliste für Modelle und Daten kann eine Organisation nicht beantworten, welche
Modellversion aus welcher Herkunft, trainiert auf welchen Daten, sich in einem bestimmten System
befindet, daher kann sie das Lieferkettenrisiko nicht bewerten oder Transparenzdokumentation auf
Abruf erstellen.

## Lösung
Geben Sie ein AIBOM beim Build in einem Standardformat aus, CycloneDX ML-BOM oder das SPDX 3.0
AI-Profil, beispielsweise mit dem OWASP AIBOM-Generator [1] (illustrativ), das Modelle, Datensätze,
Gewichte und deren Herkunft und Lizenzen abdeckt. Fügen Sie es dem Registereintrag an und generieren
Sie es bei jedem Build neu, damit es nie vom bereitgestellten System abweicht.

> **Beispiel (illustrativ)** Das AIBOM eines Retrieval-Augmented-Assistenten listet das Basismodell,
> das Embedding-Modell, den Datensatz-Snapshot und deren Lizenzen auf; wenn sich eine
> Datensatz-Lizenz ändert, wird die Differenz im AIBOM des nächsten Builds angezeigt.

## Konsequenzen
Fragen zur Lieferkette und Herkunft werden zu Abfragen; Transparenzdokumente können aus dem AIBOM
generiert werden. Die Kosten sind die Toolchain-Integration und die Aufrechterhaltung genauer
Herkunftsmetadaten.

## Verwandte Muster
[Agent Registry](/patterns/agent-registry);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Zuordnung:** KI-Verordnung Art. 11, Art. 53 (GPAI-Dokumentation) · ISO/IEC 42001 · NIST AI RMF
(Map) · CSA AICM · Layer 02 Inventory & Transparency.

Funktionsetiketten folgen dem NIST AI RMF [2]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
