---
lang: de
source: bok/patterns/fairness-eval-suite.md
sourceHash: "90d2e8a073fc15049630c4372ec6456f8367ddee6b1f68b10f8b26916bb97f7f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fairness-eval-suite
title: Fairness Eval Suite
layer: 3
order: 22
summary: "Eine versionierte Fairness-Suite in CI: Gruppen- und Schnittstellenmetriken mit Intervallen, ein Proxy-Scan und ein Kontrafaktum-Flip-Test, bewertet gegen eine zuerst festgelegte Fairness-Richtlinie."
---

# Muster: Fairness Eval Suite

**Zusammenfassung:** Versionieren Sie eine Fairness-Suite mit dem Modell und führen Sie sie hinter
dem Eval-Gate aus: Gruppen- und Schnittstellenmetriken mit Konfidenzintervallen, ein "unzureichende
Daten"-Ergebnis für kleine Zellen, ein Proxy-Scan und ein Kontrafaktum-Flip-Test, jeweils bewertet
gegen eine Fairness-Richtlinie (Metrik, Schwellwert, Mindestzellengröße, Genehmiger), die vor dem
Lauf schriftlich festgehalten wird. Die Suite gibt ein strukturiertes Ergebnis pro Metrik und Slice
aus, lässt den Build fehlschlagen, wenn die Richtlinie nicht erfüllt ist, und läuft erneut auf
Live-Entscheidungen, sodass ein System, das bei der Veröffentlichung fair war, nicht ungesehen aus
ihm herausdriften kann.

## Ziele
Verwandeln Sie "ist es fair?" in einen kleinen Satz gewählter, testbarer Eigenschaften mit
Konsequenzen, sodass eine Veröffentlichung, die eine Gruppe schlechter behandelt als die Richtlinie
erlaubt, nicht ausgeliefert wird, und der Nachweis zeigt, welche Metrik gewählt wurde, warum und was
sie gemessen hat.

## Zielbenutzer
KI-Governance-Engineer, ML-Engineer, Data Scientist, Rechts- und Gleichstellungsberater.

## Betroffene Stakeholder
Personen, die den Entscheidungen des Systems unterliegen, insbesondere geschützte und
intersektionale Gruppen, Betreiber, Modellverantwortliche, Prüfer, Gleichstellungsstellen und
Regulierungsbehörden.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; geben Sie jedem Control Zähne;
instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen.

## Kontext
Ein System, das etwas an Personen verteilt (Kredit, Arbeitsplätze, Wohnraum, Leistungen, Preise)
oder ihnen eine Qualität bereitstellt, die sich zwischen Gruppen unterscheiden kann (Erkennung,
Transkription, Antworten in einem Dialekt). Für Hochrisiko-KI-Systeme verlangt die KI-Verordnung der
EU, dass die Daten "im Hinblick auf mögliche Verzerrungen" untersucht werden und Maßnahmen "zur
Erkennung, Verhinderung und Minderung" dieser Verzerrungen getroffen werden (`Art. 10(2)(f)` und
`(g)`), Systeme, die weiterlernen, um verzerrte "Rückkopplungsschleifen" zu beheben (`Art. 15(4)`),
und die Betriebsanleitung muss, wenn angemessen, die Leistung "in Bezug auf bestimmte Personen oder
Personengruppen" angeben (`Art. 13(3)(b)(v)`) [1]. Das NIST AI RMF verlangt, dass Fairness und
Verzerrung "bewertet werden und die Ergebnisse dokumentiert sind" (MEASURE 2.11) [2].

## Problem
Fairness wird einmalig, auf aggregierter Ebene, mit einer Metrik gemessen, die nach Einsicht in die
Ergebnisse ausgewählt wird.

- **Kräfte.** Die gemeinsamen Kriterien stehen in Konflikt: Wenn sich die Basisraten zwischen
  Gruppen unterscheiden, kann ein Score nicht gleichzeitig kalibriert sein und gleiche Fehlerquoten
  über Gruppen hinweg aufweisen [3], und die drei Bedingungen der Kalibrierung und des
  Gleichgewichts für beide Klassen können außer in hochgradig eingeschränkten Spezialfällen nicht
  zusammen erfüllt sein [4]. Daher muss eine Metrik für den Anwendungsfall gewählt werden, und die
  Wahl ist eine Entscheidung mit einem Verantwortlichen. Aggregierte Zahlen verbergen die
  Schnittmengen: Die Gender-Shades-Prüfung ergab Fehlerquoten von bis zu 34,7 % für Frauen mit
  dunklerer Hautfarbe gegenüber maximal 0,8 % für Männer mit hellerer Hautfarbe [5], und ein
  Klassifizierer kann auf jeder vordefinierten Gruppe fair aussehen, während er bei strukturierten
  Untergruppen versagt [6]. Kleine Zellen machen Punktschätzungen verrauscht. Das rechtliche Gewicht
  vertrauter Schwellwerte verschiebt sich: Die Vier-Fünftel-Regel der US Uniform Guidelines ist ein
  Screening mit Vorbehalten zur statistischen und praktischen Signifikanz [7], und im Juni 2026
  kündigte das US-Justizministerium eine Stellungnahme an, die zu dem Ergebnis kam, dass die
  Richtlinien der EEOC zur disparaten Auswirkung verfassungswidrig sind [8].
- **Fehlermodus.** Ein Dashboard markiert 0,81 grün und 0,79 rot ohne Intervall und ohne
  Mindeststichprobe; die am schlechtesten versorgten Schnittmengen werden gemittelt; die Freigabe
  erfolgt auf einer Metrik, die gewählt wurde, weil sie bestanden hat; und die Produktionsdrift wird
  nicht gemessen, weil der Test nur beim Start durchgeführt wurde.

## Lösung
Schreiben Sie die Richtlinie zuerst, dann bauen Sie die Suite auf, die dagegen fehlschlagen kann.

1. **Fairness-Richtlinie als Daten.** Pro System: die geschützten Attribute, die in jeder
   Gerichtsbarkeit gelten, und woher ihre Werte stammen, die gewählte Metrik und der Grund
   (Auswahlquoten-Verhältnis für Zuteilung, Fehlerquoten-Lücken für Servicequalität), der
   Schwellwert, die Mindestzellengröße, die Mehrfachvergleichskorrektur und der Genehmiger.
   Verpflichten Sie sich dazu, bevor Sie sich die nächste Ausführung ansehen.
2. **Gruppen- und intersektionale Metriken mit Intervallen.** Berechnen Sie Quoten und Verhältnisse
   pro Gruppe und pro intersektionaler Zelle, jeweils mit einem Konfidenzintervall, und beurteilen
   Sie das Gate anhand des Intervalls, nicht des Punkts. Zellen unter dem Minimum melden
   "unzureichende Daten" und werden aufgelistet, nie als bestanden gezählt. Suchen Sie auch nach dem
   schlechtesten Slice sowie den aufgelisteten.
3. **Proxy-Scan.** Trainieren Sie ein Modell, um das geschützte Attribut aus den Features
   vorherzusagen; ein starker Prädiktor kennzeichnet Proxies zur Rechtfertigung oder zum Entfernen,
   und das Ergebnis geht in die Data Card.
4. **Kontrafaktischer Flip-Test.** Ändern Sie nur das geschützte Attribut, oder tauschen Sie bei
   einem Sprachmodell Identitätsbegriffe in ansonsten identischen Prompts aus, und messen Sie, wie
   oft sich das Ergebnis oder die Antwortqualität ändert.
5. **Rechtmäßige Testdaten.** Wenn spezielle Kategorien personenbezogener Daten zur
   Verzerrungserkennung erforderlich sind, verwenden Sie diese nur auf der Grundlage und unter den
   Bedingungen von `Art. 4a`, die das Digital-Omnibus an die Stelle des alten `Art. 10(5)` eingefügt
   hat [9]; andernfalls dokumentieren Sie, wie die Gruppenzugehörigkeit geschätzt wurde und welcher
   Fehler hinzukommt.
6. **Gate und Datei.** Geben Sie ein strukturiertes Ergebnis pro Metrik und Slice aus, wobei Sie das
   veröffentlichte [Eval-Ergebnis-Schema](/resources/templates#schema-eval-result)
   (`eval-result.v1`) wiederverwenden, speichern Sie es gegen den Registereintrag und speisen Sie
   die disaggregierten Zahlen in die Model Card ein. Eine fehlgeschlagene Zelle führt zum Fehlschlag
   des Builds, es sei denn, eine unterzeichnete Begründung ist an die Freigabe angehängt.
7. **Führen Sie es live aus.** Berechnen Sie die gleichen Metriken für Produktionsentscheidungen in
   einem rollierenden Fenster mit den gleichen Schwellwerten, damit Drift einen Alert auslöst, bevor
   eine Beschwerde kommt. Wenn ein Regime eine Veröffentlichung verlangt, wie die unabhängigen
   Verzerrungsprüfungen des New York City Local Law 144 mit Auswirkungsverhältnissen über
   Geschlecht, Rasse/Ethnizität und intersektionale Kategorien [10], sind die Ergebnisse der Suite
   die Eingabe, nicht eine separate Übung.

NIST SP 1270 ist ein nützlicher Rahmen für das, was die Suite nicht sehen kann: Verzerrung ist
systemisch und menschlich sowie statistisch, und es ist "nicht möglich, ein Nullrisiko von
Verzerrung zu erreichen" [11].

Illustratives Ergebnis für einen Slice, gültig gegen `eval-result.v1` (das Intervall und die
Richtlinie reisen in `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/eval-result.v1.json",
  "suite_id": "fairness.credit-dfc.v3",
  "model_version": "credit-dfc@2026-09-01",
  "score": 0.81,
  "threshold": 0.80,
  "result": "pass",
  "timestamp": "2026-09-18T09:40:12Z",
  "direction": "higher_is_better",
  "metric": "approval adverse-impact ratio, lower 95% bound, age 65+ against age 35-49",
  "failure_mode": "older applicants declined at a disproportionate rate",
  "obligation": "EU AI Act Art. 10(2)(f)-(g)",
  "sample_size": 1840,
  "extensions": {
    "point_estimate": 0.86,
    "ci95": [0.81, 0.91],
    "reference_group": "age_35_49",
    "min_cell": 200,
    "policy": "fairness-policy.credit.v2",
    "insufficient_data_cells": ["age_65_plus x region_islands"]
  }
}
```

> **Beispiel (illustrativ)** Die Suite eines Kreditgebers beurteilte Genehmigungsquoten nach
> Altersgruppe anhand der unteren Konfidenzgrenze des Adverse-Impact-Verhältnisses mit einer
> Mindestzelle von 200. Der erste Durchlauf bestand jede Gruppe bei der Punktschätzung und schlug
> eine bei der Grenze fehl; der zweite, auf einem größeren eingefrorenen Testsatz, bestand sie. Eine
> Schnittmenge blieb unter der Mindestzelle, daher listen die Versionshinweise sie als
> "unzureichende Daten" auf und der Dateneigentümer trägt eine Bedingung, um vor dem nächsten
> Retraining mehr zu sammeln. Die gleichen Metriken laufen jetzt wöchentlich auf
> Live-Entscheidungen.

## Konsequenzen
Fairness-Ansprüche werden spezifisch, reproduzierbar und datiert; die Metrikwahl und ihre
Kompromisse sind dokumentiert; und kleine oder intersektionale Gruppen werden gemeldet, anstatt
gemittelt zu werden. Die Kosten: Der rechtmäßige Zugang zu geschützten Attributen ist schwierig und
manchmal unmöglich, daher tragen Schätzungen Fehler; Intervalle verbreitern sich bei kleinen
Stichproben, daher benötigen Suites größere Testsätze; eine bestandene Suite beweist nicht, dass das
System außerhalb dessen, was es gemessen hat, fair ist; und die Minderung, die sie auslöst, kann in
einigen Einstellungen selbst rechtswidrig sein, daher gehen Fixes mit der angehängten Evidenz zur
rechtlichen Überprüfung.

## Verwandte Muster
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Explanation Artefact](/patterns/explanation-artefact);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Claims Substantiation Gate](/patterns/claims-substantiation-gate).

**Zuordnung:** KI-Verordnung Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4), Art. 4a · NYC Local
Law 144 · 29 CFR 1607.4(D) · ISO/IEC 42001 A.5.4, A.6.2.4 · ISO/IEC TR 24027 · NIST AI RMF (Measure
2.11) · Layer 03 Evals & Red Teaming as Evidence.

Funktions- und Unterkategoriebezeichnungen folgen dem NIST AI RMF [2]; ISO/IEC 42001 Annex A IDs
folgen einem veröffentlichten Crosswalk, nicht dem Text des Standards [12]; ISO/IEC TR 24027 wird
nur nach Kennung und Titel referenziert [13]. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(f)-(g) examination for and mitigation of possible biases; Art. 13(3)(b)(v) performance regarding specific persons or groups in the instructions for use; Art. 15(4) feedback loops in systems that continue to learn (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.11 fairness and bias "evaluated and results are documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[4] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[5] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[6] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[7] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[8] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[11] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[12] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.4 assessing AI system impact on individuals and groups, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
[13] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
