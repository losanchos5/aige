---
lang: de
source: bok/patterns/machine-readable-evidence-oscal.md
sourceHash: "be7a12b4bb256bc5061873011ed1ac00eb14de3c039d565f3ba60f94a06cb2da"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: machine-readable-evidence-oscal
title: "Machine-Readable Evidence (OSCAL)"
layer: 5
order: 13
summary: "Kontrollnachweise, die in einem maschinenlesbaren Standardformat emittiert werden, OSCAL zuerst, sodass eine Audit eine Abfrage wird und die gleichen Datensätze kontinuierliche Assurance speisen."
---

# Muster: Machine-Readable Evidence (OSCAL)

**Zusammenfassung:** Emittieren Sie Kontrollnachweise in einem maschinenlesbaren, Standardformat,
sodass die Audit eine Abfrage ist und die gleichen Nachweise kontinuierliche Assurance speisen.
OSCAL, erweitert mit Eigenschaften für KI, ist das organisierende Format: Frameworks geben an, was
zu versichern ist, bieten aber kein ausführbares Format für wie, und dieses Muster liefert es {[1]}.

## Ziele
Machen Sie Nachweise abfragbar, vergleichbar und aggregierbar, und eliminieren Sie den Screenshot
als Nachweisartefakt.

## Zielbenutzer
KI-Governance-Engineer, Auditor, Platform Team.

## Betroffene Stakeholder
Prüfer, Regulierungsbehörden, Modellverantwortliche.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; geben Sie jedem Control
Zähne.

## Kontext
Ein Stack, dessen Kontrollen bereits strukturierte Datensätze erzeugen, und eine Assurance-Funktion,
die Auditoren wiederholt und schnell beantworten muss.

## Problem
Nachweise, die ein Mensch von Hand formatieren und einreichen muss, skalieren nicht, können nicht
schnell überprüft werden und sind veraltet, sobald sie gespeichert werden. Jede Audit sammelt sie
von Grund auf neu.

## Lösung
Emittieren Sie Kontrollergebnisse als OSCAL-Komponentendefinitions- und
Bewertungsergebnis-Artefakte. OSCALs natives Modell ist das stabile Substrat: eine Kontrollebene
({`catalog`}, {`profile`}), eine Implementierungsebene ({`component-definition`},
{`system-security-plan`}) und eine Bewertungsebene ({`assessment-plan`}, {`assessment-results`},
{`POA&M`}), mit Rückverfolgbarkeit von einem Ergebnis zurück zur Kontrolle, die es getestet hat
{[2]}. Bauen Sie zuerst darauf auf. KI-spezifische Erweiterungen bilden sich noch: ein
vorgeschlagener Ansatz, ein einzelner Preprint von 2026, fügt sechzehn Eigenschaftserweiterungen für
Lebenszyklusphase, Durchsetzungssemantik und Risikoverfolgbarkeit in einer dreischichtigen
Richtlinien-/Nachweis-/Durchsetzungsarchitektur hinzu, die automatisch OSCAL-Bewertungsergebnisse
generiert und sie gegen das NIST JSON-Schema validiert {[1]}. Übernehmen Sie die Erweiterungen, wenn
sie passen, aber die nativen Bewertungsmodelle tragen heute die meiste Last. Speichern Sie die
Nachweise, sodass eine Auditor-Frage durch eine Abfrage beantwortet wird.

> **Beispiel (illustrativ)** Ein Eval Gate schreibt bei jedem Durchlauf ein
> OSCAL-Bewertungsergebnis; die Anfrage des Auditors nach "allen Robustheitsnachweisen in Q3" ist
> ein Filter über den Speicher, der in Minuten zurückgegeben wird.

## Konsequenzen
Die Audit wird zu einer Abfrage und Nachweise komponieren sich über Tools und Jurisdiktionen. Die
Kosten sind die Übernahme des Schemas und die Instrumentierung von Kontrollen, um es zu emittieren.

## Verwandte Muster
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Incident Pipeline](/patterns/incident-pipeline).

**Zuordnung:** EU KI-Verordnung Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage,
Govern) · Layer 05 Assurance & Continuous Compliance.

Funktionsetiketten folgen dem NIST AI RMF [3]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[2] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
