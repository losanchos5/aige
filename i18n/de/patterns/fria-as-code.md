---
lang: de
source: bok/patterns/fria-as-code.md
sourceHash: "dd24efa21bad73918c74ee9e686aba9d023e209a786d176e3dcc383f4058f3b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "Jede Folgenabschätzung (ISO/IEC 42005 AIIA, DSFA, FRIA) als eine versionierte Faktenbasis geführt, verknüpft mit ihren Kontrollen und erneut geöffnet, wenn sich das System ändert."
---

# Muster: FRIA-as-Code

**Zusammenfassung:** Führen Sie die Grundrechte-Folgenabschätzung als ein versioniertes,
überprüfbares Artefakt, das mit der Datenschutz-Folgenabschätzung kreuzreferenziert ist, so dass
eine Rechtsbewertung eine Eingabe für das Design ist, das sich mit dem System aktualisiert, nicht
ein Dokument, das einmal erstellt und abgelegt wird. Verallgemeinert ist dies
**Impact-Assessment-as-Code**: Jede Folgenabschätzung, die ein System auslöst (die
KI-System-Folgenabschätzung oder AIIA, die ISO/IEC 42005 beschreibt, die DSGVO DSFA und die
KI-Verordnung FRIA), ist eine gemeinsame Faktenbasis mit mehreren Ansichten, jede mit ihrem eigenen
Auslöser, Reviewer und Neubewertungsregel. Das Muster behält seinen ursprünglichen Namen und seine
Adresse, damit veröffentlichte Links zu ihm weiterhin aufgelöst werden.

## Ziele
Halten Sie die FRIA und ihre DSFA-Kreuzreferenz live und verknüpft mit den Kontrollen, die sie
verlangen, damit eine Änderung im System eine Überprüfung ihrer Rechtswirkung auslöst. Erweitern Sie
die gleiche Disziplin auf die AIIA, damit ein Satz von Fakten über betroffene Gruppen, Schäden und
Kontrollen jede Bewertung speist und keine zwei Bewertungen sich über das gleiche System uneinig
sind.

## Zielbenutzer
KI-Governance-Engineer, Datenschutzbeauftragter, Rechts-/Compliance, das Modellteam, das die AIIA
durchführt.

## Betroffene Stakeholder
Datensubjekte, betroffene Personen (einschließlich Personen, die das System nie nutzen), Betreiber,
Anbieter, Regulierungsbehörden.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; instrumentieren Sie den Build, um seinen
eigenen Beweis zu erbringen.

## Kontext
Ein Betreiber eines Hochrisiko-KI-Systems, das der KI-Verordnung der EU Art. 27 unterliegt, muss
eine Grundrechte-Folgenabschätzung durchführen, wobei eine DSFA nach DSGVO Art. 35 möglicherweise
bereits vorhanden ist und sich überlappt. Auf der Anbieterseite bewertet eine Organisation, die ein
KI-Managementsystem betreibt, die Auswirkungen jedes KI-Systems auf Einzelpersonen, Gruppen und die
Gesellschaft über seinen gesamten Lebenszyklus hinweg, wie ISO/IEC 42001 Annex A.5 verlangt und
ISO/IEC 42005 anleitet. Ein System kann gleichzeitig unter allen drei fallen.

## Problem
Eine Grundrechte-Folgenabschätzung, die einmalig als Word-Dokument verfasst wird, beschreibt die
Auswirkungen auf Rechte zu einem einzelnen Zeitpunkt und wird nie überprüft, wenn sich das System
ändert. Doppelte Arbeit zwischen Grundrechte-Folgenabschätzung und DSFA verschwendet Ressourcen und
lässt die beiden nicht synchron laufen. Kommt eine separate AIIA hinzu, die vom Modellteam verfasst
wird, hält die Organisation drei Darstellungen desselben Schadens, bewertet auf verschiedenen
Skalen, überprüft von verschiedenen Personen und veraltet zu verschiedenen Zeitpunkten.

## Lösung
Strukturieren Sie die Grundrechte-Folgenabschätzung als strukturierte Daten, die den beabsichtigten
Zweck, betroffene Gruppen, Risiken für Rechte und die Risikominderungsmaßnahmen abdecken, wobei jede
Maßnahme mit der Kontrolle verknüpft ist, die sie umsetzt (eine Policy Card, ein Eval Gate, ein
Guardrail). Verweisen Sie auf die DSFA, sodass gemeinsame Elemente nur einmal geschrieben werden.
Speichern Sie sie mit dem Registereintrag und öffnen Sie sie bei wesentlichen Änderungen erneut. Die
KI-Verordnung Art. 27 Grundrechte-Folgenabschätzung und ihre DSFA-Querverweise definieren den Umfang
[1].

> **Beispiel (illustrativ)** Die Grundrechte-Folgenabschätzung eines Leistungsberechtigungssystems
> verknüpft jedes identifizierte Risiko für die Rechte von Personen mit einer spezifischen Eval und
> einem Guardrail; wenn das Modell neu trainiert wird, kennzeichnet die
> Grundrechte-Folgenabschätzung, welche Maßnahmen zur Überprüfung benötigt werden.

### Eine Faktenbasis, drei Ansichten

Führen Sie einen Datensatz pro System mit den Fakten, die jede Bewertung benötigt: der beabsichtigte
Zweck und nicht im Umfang liegende Verwendungen, die betroffenen Gruppen, jeder Schaden bewertet auf
denselben Dimensionen (Schweregrad, Umfang, Umkehrbarkeit, Dauer, Wahrscheinlichkeit) und jede
Maßnahme mit der ID der Kontrolle und Eval, die sie umsetzt. Rendern Sie die drei Bewertungen als
Ansichten dieses Datensatzes. Das House-Schema
[`impact-assessment.v1.json`](/schemas/impact-assessment.v1.json) tut dies mit einem `type`-Feld
(`aiia`, `dpia_addendum`, `fria`), gemeinsamen Feldern für Risiken, Maßnahmen und Ergebnis sowie
typspezifischen Feldern für das, was nur eine Bewertung verlangt; eine ausfüllbare
[Markdown-Vorlage](/templates/impact-assessment.md) steht daneben.

| Ansicht | Wer führt sie durch | Was löst sie aus | Wann | Was sie zu den gemeinsamen Fakten hinzufügt |
|---|---|---|---|---|
| AIIA (ISO/IEC 42005) | Die Organisation, die das System entwickelt oder bereitstellt | Sein KI-Managementsystem (ISO/IEC 42001 A.5.2 bis A.5.5) | Während des gesamten Lebenszyklus, ab dem Design [2][3] | Gesellschaftliche Auswirkungen; Dokumentation der Bewertung selbst |
| DSFA (DSGVO Art. 35) | Der Verantwortliche | Verarbeitung, die wahrscheinlich zu einem hohen Risiko führt | Vor der Verarbeitung [4] | Notwendigkeit und Verhältnismäßigkeit; der Rat des Datenschutzbeauftragten; vorherige Konsultation, falls hohes Risiko bestehen bleibt |
| Grundrechte-Folgenabschätzung (KI-Verordnung Art. 27) | Öffentliche Behörden und öffentliche Dienste als Betreiber sowie Betreiber von Annex III 5(b) und (c) Systemen | Erste Verwendung eines Annex III Hochrisiko-Systems (nicht Punkt 2) | Vor der ersten Verwendung [1] | Betroffene Kategorien, Überwachungsmaßnahmen, Beschwerdeverfahren; Ergebnisse werden der Marktüberwachungsbehörde mitgeteilt |

Zwei Regeln halten die Ansichten ehrlich. Eine Grundrechte-Folgenabschätzung kann auf einer DSFA
aufbauen, die bereits denselben Bereich abdeckt (`Art. 27(4)`) [1], sodass die gemeinsamen Felder
einmal geschrieben und referenziert, nie kopiert werden. Und eine Ansicht wird nie allein
bearbeitet: Eine Änderung der Fakten regeneriert jede Ansicht, sodass die DSFA nicht das eine über
die betroffenen Gruppen sagen kann, während die Grundrechte-Folgenabschätzung das andere sagt.

### Neubewertungsauslöser als Code

Schreiben Sie die Auslöser als Bedingungen, die die Registrierung evaluiert, nicht als
Kalendereinträge: ein neuer oder erweiterter beabsichtigter Zweck; Neutraining auf einer neuen
Datenquelle; eine neue betroffene Bevölkerung, Sprache oder Gerichtsbarkeit; ein geänderter
Schwellenwert; ein Incident oder Beinahe-Unfall aus der
[Incident Pipeline](/patterns/incident-pipeline); ein Überwachungssignal außerhalb seines Bandes;
neues Recht oder neue Leitlinien; und ein geplantes Überprüfungsdatum. Die KI-Verordnung verlangt
vom Betreiber, die Grundrechte-Folgenabschätzung zu aktualisieren, wenn sich ein bewertetes Element
ändert [1], und die DSGVO verlangt eine Überprüfung, wenn sich das Risiko der Verarbeitung ändert
[4]; ein einzelner Auslöser öffnet jede Ansicht, die die Änderung berührt, und der Prüfer sieht
einen Diff statt drei neuer Dokumente.
[Kapitel 14](/bok/governing-development#impact-assessments-compared) vergleicht diese Bewertungen
mit den algorithmischen Auswirkungsbewertungen, Bias-Audits und Modellvalidierungen, die dieselbe
Faktenbasis beitreten können.

### Durchführung versus Überprüfung

Der Durchführende besitzt die Fakten; der Prüfer stellt sie in Frage. Vor der Genehmigung überprüft
der Prüfer, dass der Umfang dem aktuellen Use-Case-Datensatz entspricht, die betroffenen Gruppen
Personen einschließen, die das System nie nutzen, jede Risikobewertung Nachweise anführt (eine
Eval-ID, einen Testbericht, ein Datenprofil), jede Maßnahme mit einer Kontrolle verknüpft ist, die
läuft, das Restrisiko von jemandem mit der Befugnis, es zu akzeptieren, akzeptiert wird, und die
Auslöser als Bedingungen geschrieben sind, die eine Pipeline evaluieren kann. Halten Sie das Urteil
und den Namen des Prüfers im Datensatz fest, damit ein Auditor sehen kann, wer was in Frage gestellt
hat.

## Konsequenzen
Die Rechtsbewertung bleibt aktuell und nachverfolgbar zu Kontrollen, und Überlappungen mit der DSFA
werden nicht dupliziert. Die AIIA, DSFA und Grundrechte-Folgenabschätzung stimmen überein, weil sie
dieselben Fakten lesen, und eine Systemänderung öffnet alle gleichzeitig. Die Kosten sind Vorlagen,
die Vereinbarung einer Bewertungsskala über Recht, Datenschutz und Engineering hinweg und die
Disziplin, die Bewertung als lebend zu behandeln.

## Verwandte Muster
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Zuordnung:** KI-Verordnung Art. 27 (Grundrechte-Folgenabschätzung), Art. 9 · DSGVO Art. 35 (DSFA)
· ISO/IEC 42005 · NIST AI RMF (Map) · Layer 01 Governance-as-Code / Layer 02 Inventory &
Transparency.

Funktionsetiketten folgen dem NIST AI RMF [5]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c) systems; before first use; update when an assessed element changes; results notified to the market-surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[3] ISO/IEC 42001:2023, Annex A.5 (A.5.2 AI system impact assessment process; A.5.3 documentation of AI system impact assessments; A.5.4 impact on individuals or groups of individuals; A.5.5 societal impacts). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Regulation (EU) 2016/679 (GDPR), Art. 35 (data protection impact assessment: 35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes) and Art. 36 (prior consultation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
