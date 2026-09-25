---
lang: de
source: bok/patterns/explanation-artefact.md
sourceHash: "f5f1c480d5aacda263f8733e9b94dcdab9bb143de057b0c0d5c3a12e2c0f0374"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: explanation-artefact
title: Explanation Artefact
layer: 4
secondaryLayer: 5
order: 23
summary: "Ein Erklärungsdatensatz pro folgenreicher Entscheidung, mit gepinntem Modell, Methode und Grund-Codes, getestet auf Treue und wiederverwendet für jede Erklärungspflicht."
---

# Muster: Explanation Artefact

**Zusammenfassung:** Schreiben Sie für jede folgenreiche Entscheidung, die ein System über eine
Person trifft oder unterstützt, einen strukturierten **Erklärungsdatensatz** zum Zeitpunkt der
Entscheidung: die Modellversion, die Erklärungsmethode mit ihrer Version und Baseline, die
Grund-Codes, die aus den Faktoren gezogen werden, die das Modell tatsächlich bewertet hat, ein
gültiges Kontrafaktum, wo es hilft, die Benachrichtigungsvorlage und die Einspruchsroute. Testen Sie
die Erklärungen auf Treue in CI, behalten Sie die Datensätze im Evidence Store, und beantworten Sie
jede Erklärungspflicht (eine Benachrichtigung über nachteilige Maßnahmen, eine
Datenschutzauskunftsanfrage, eine KI-Verordnung-Erklärungsanfrage, einen internen Einspruch) aus
demselben Datensatz.

## Ziele
Machen Sie jede Erklärung reproduzierbar, überprüfbar und wiederverwendbar: reproduzierbar, weil
das, was sie erzeugt hat, gepinnt ist, überprüfbar, weil ihre Gründe neu berechnet und verglichen
werden können, und wiederverwendbar, weil ein Datensatz mehrere rechtliche und interne Pflichten
erfüllt, anstatt dass jedes Team seinen eigenen Brief schreibt.

## Zielbenutzer
KI-Governance-Engineer, ML-Engineer, Produkt- und Operations-Teams, die Benachrichtigungen
versenden, Datenschutz- und Verbraucherrecht-Anwälte.

## Betroffene Stakeholder
Personen, die Entscheidungen unterliegen, und ihre Vertreter, Operatoren und Prüfer, die sich auf
die Erklärung verlassen, Betreiber, Prüfer, Datenschutz- und Marktüberwachungsbehörden.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Beweis zu erzeugen; geben Sie jeder Kontrolle
Zähne; beginnen Sie mit einem benannten Fehlermodus oder Schaden.

## Kontext
Ein System, das Menschen ablehnt, bepreist, einstuft, kennzeichnet oder bewertet, wobei die Person,
ein Operator oder eine Behörde fragen wird, warum. Die Pflichten überlappen sich. Nach der
KI-Verordnung hat eine Person, die einer Entscheidung eines Betreibers auf der Grundlage der Ausgabe
eines Hochrisiko-KI-Systems aus Anlage III (außer Punkt 2) unterliegt, mit rechtlichen oder ähnlich
erheblichen nachteiligen Auswirkungen das Recht, "klare und aussagekräftige Erklärungen über die
Rolle des KI-Systems im Entscheidungsprozess und die Hauptelemente der getroffenen Entscheidung" zu
erhalten (`Art. 86(1)`); Betreiber müssen Personen informieren, dass sie einem solchen System
unterliegen (`Art. 26(11)`); und die Betriebsanleitung muss, soweit zutreffend, die Fähigkeiten des
Systems beschreiben, "Informationen bereitzustellen, die für die Erklärung seiner Ausgabe relevant
sind" (`Art. 13(3)(b)(iv)`) [1]. Die DSGVO gibt Betroffenen aussagekräftige Informationen über die
Logik automatisierter Entscheidungen (`Art. 15(1)(h)`, `Art. 22`) [2], die der Gerichtshof in
C-203/22 als Erklärung des "tatsächlich angewandten Verfahrens und der Grundsätze" auslegte [3]. In
der US-Kreditvergabe verlangt Regulation B die spezifischen Hauptgründe für nachteilige Maßnahmen,
und sie müssen sich auf die tatsächlich berücksichtigten oder bewerteten Faktoren beziehen [4].

## Problem
Erklärungen werden spontan generiert, versendet und vergessen.

- **Kräfte.** Post-hoc-Attributionsmethoden können vom Modell, das sie erklären, abweichen, und sie
  können manipuliert werden: ein voreingenommener Klassifizierer kann so umhüllt werden, dass LIME
  und SHAP harmlose Merkmale berichten [5]. Gründe, die für den Data Scientist geschrieben wurden,
  helfen dem Empfänger nicht. Jede Pflicht hat ihr eigenes Publikum und ihre eigene Formulierung. Wo
  die Einsätze hoch sind, kann ein interpretierbares Modell seine eigene Erklärung sein, und Rudin
  argumentiert, dass es einem Erklären eines Black Box danach vorgezogen werden sollte [6].
- **Fehlermodus.** Niemand kann die Erklärung reproduzieren, die ein Kunde letztes Jahr erhalten
  hat, weil sich das Modell, die Methode oder die Baseline geändert hat. Grund-Codes benennen
  Faktoren, die das Modell nicht verwendet hat. Jede Auskunftsanfrage und jeder Einspruch wird zu
  einem forensischen Projekt, und die Organisation kann nicht nachweisen, dass ihre Erklärungen
  genau waren.

## Lösung
Behandeln Sie die Erklärung als ein Artefakt mit einem Schema, einem Test und einer
Aufbewahrungsregel.

1. **Entscheiden Sie die Erklärung pro Use Case.** Eine Erklärungsrichtlinie (Layer 01) legt pro Use
   Case fest, welche Erklärungstypen erforderlich sind (Grund-Codes, ein Kontrafaktum, Quellenzitate
   für abrufbasierte Antworten, eine Beschreibung des angewandten Verfahrens und der Grundsätze),
   das Publikum und die Sprache, die zulässige Methode und ob ein interpretierbares Modell
   erforderlich ist.
2. **Schreiben Sie den Datensatz zum Zeitpunkt der Entscheidung.** Die Runtime (Layer 04) schreibt
   einen Datensatz pro erklärter Entscheidung, gekennzeichnet mit der Registry-ID und der
   Entscheidungs-ID: Modellversion; Methode, Version und Baseline; ob die Ausgabe entscheidend oder
   beratend war; Grund-Codes aus bewerteten Faktoren, eingestuft; ein Kontrafaktum, das nur
   veränderbare Merkmale ändert, wo hilfreich; die Benachrichtigungsvorlage, Sprache, Kanal und
   Lieferzeit; und die Einspruchsroute. Das Pinnen der Methode und Baseline ist das, was den
   Datensatz reproduzierbar macht.
3. **Testen Sie die Erklärungen.** In CI (Layer 03) prüft eine Erklärungssuite die Treue (die Gründe
   sagen das Verhalten des Modells voraus), Stabilität (nahezu identische Eingaben erhalten nahezu
   identische Gründe), Sanität (die Methode ist empfindlich gegenüber dem Modell und den Daten) und
   Grund-Code-Konsistenz (jeder gesampelte Grund ist ein bewerteter Faktor). NIST nennt
   "Erklärungsgenauigkeit" als eines von vier Prinzipien erklärbarer KI [7]. Berechnen Sie eine
   Stichprobe gespeicherter Datensätze gegen das gepinnte Modell neu, um Drift oder Manipulation zu
   erfassen.
4. **Verwenden Sie den Datensatz erneut.** Derselbe Datensatz rendert die Benachrichtigung über
   nachteilige Maßnahmen, beantwortet eine Auskunftsanfrage und eine `Art. 86`-Anfrage und gibt
   einem menschlichen Prüfer den Kontext für einen Einspruch. Im Vereinigten Königreich umfassen die
   Schutzmaßnahmen für bedeutende automatisierte Entscheidungen Informationen über die Entscheidung,
   die Möglichkeit, Stellungnahmen abzugeben, menschliche Intervention und eine Möglichkeit, sie
   anzufechten [8]; der Datensatz enthält das, was jeder dieser Schritte benötigt.
5. **Behalten und Abfrage.** Datensätze fließen in den Evidence Store (Layer 05) mit einer
   Aufbewahrungsdauer, die durch die längste Verpflichtung festgelegt wird, der sie dienen.
   Einsprüche und ihre Ergebnisse werden gegen den Datensatz protokolliert und nach Gruppe gezählt,
   was die Fairness-Überwachung speist.

Das AI RMF verlangt, dass "das KI-Modell erklärt, validiert und dokumentiert" wird und seine Ausgabe
"im Kontext interpretiert" wird (MEASURE 2.9), und dass Transparenz- und Rechenschaftsrisiken
"untersucht und dokumentiert" werden (MEASURE 2.8) [9].

Illustrativer Erklärungsdatensatz für eine abgelehnte Kreditlimiterhöhung:

```json
{
  "record_id": "exp-2026-09-21-118204",
  "decision_id": "cl-2026-09-21-118204",
  "subject": "credit-limit@4.2.1",
  "registry_id": "clm-07",
  "outcome": "limit_increase_declined",
  "decision_role": "determinative",
  "method": { "name": "treeshap", "version": "0.46", "baseline": "bg-sample.v14" },
  "fidelity_suite": { "suite_id": "explain.fidelity.v2", "result": "pass" },
  "reason_codes": [
    { "code": "R07", "text": "Debt-to-income ratio too high", "factor": "dti", "rank": 1 },
    { "code": "R12", "text": "Recent missed payments", "factor": "missed_payments_6m", "rank": 2 }
  ],
  "counterfactual": { "feature": "monthly_debt", "change": "-150", "result": "approve", "mutable_only": true },
  "notice": { "template": "adverse-action.en.v6", "language": "en", "channel": "app+letter",
              "delivered": "2026-09-21T10:04:51Z" },
  "contest_route": "appeal-flow.v3",
  "retention_until": "2031-09-21"
}
```

> **Beispiel (illustrativ)** Eine Kreditprüfung eines Handset-Einzelhändlers generierte Grund-Codes
> aus SHAP-Werten zum Anfragezeitpunkt. Ein Grund-Code-Konsistenztest stellte fest, dass für einen
> Anteil der Ablehnungen der Top-Faktor eine engineerte Interaktion war, die keine Benachrichtigung
> in einfachen Worten beschreiben konnte. Das Team wechselte zu einer monotonen Scorecard innerhalb
> einer kleinen Marge des komplexen Modells, pinnte die Methode im Datensatz, und beantwortet nun
> "warum wurde dieser Kunde abgelehnt?" mit dem gespeicherten Datensatz und einer frischen
> Neuberechnung nebeneinander.

## Konsequenzen
Erklärungen werden zu Nachweisen: reproduzierbar, testbar und wiederverwendbar über Pflichten
hinweg, mit ihrer Genauigkeit überprüft statt angenommen. Die Kosten: Speicher und Aufbewahrung für
einen Datensatz pro Entscheidung; eine Erklärungssuite, die neben dem Modell gepflegt werden muss;
einfache Vorlagen, die mit echten Empfängern getestet werden müssen; und für komplexe Modelle das
Risiko, dass keine treue Erklärung einfach genug ist, was ein Designfinding ist, kein
Dokumentationsfinding.

## Verwandte Muster
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Zuordnung:** KI-Verordnung Art. 86, Art. 26(11), Art. 13(3)(b)(iv) · DSGVO Art. 15(1)(h), Art. 22
· Regulation B (12 CFR 1002.9) · ISO/IEC 42001 A.8.2 · NIST AI RMF (Measure 2.8, 2.9) · Layer 04
Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Funktions- und Unterkategorie-Labels folgen dem NIST AI RMF [9]; ISO/IEC 42001 Annex A IDs folgen
einem veröffentlichten Crosswalk, nicht dem Text des Standards [10]. Zuordnungen sind illustrativ,
keine Konformitätsbehauptung.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 86(1) right to explanation of individual decision-making (Annex III systems except point 2); Art. 26(11) deployers inform natural persons subject to Annex III systems; Art. 13(3)(b)(iv) capabilities to provide information relevant to explain the output (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2016/679 (GDPR), Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[3] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation). JuLIA project case-law database. 2025-02-27. https://www.julia-project.eu/database/case-law/319 (verified: secondary)
[4] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons) and Supplement I, comment 9(b)(2) (reasons must relate to factors actually considered or scored). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[5] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[6] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[7] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[8] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.8 transparency and accountability risks "examined and documented"; MEASURE 2.9 model "explained, validated, and documented" and output "interpreted within its context"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
