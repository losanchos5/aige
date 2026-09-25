---
lang: de
source: bok/patterns/claims-substantiation-gate.md
sourceHash: "8aa53627e138fdeb83eabfc7f57afd3ad70d870c8fcec31a058c678db4692172"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: claims-substantiation-gate
title: Claims Substantiation Gate
layer: 5
secondaryLayer: 3
order: 25
summary: "Ein Anspruchsregister, das jede öffentliche Aussage über die Genauigkeit, Fairness oder Fähigkeit eines KI-Systems an den dahinter stehenden Eval-Lauf bindet und veraltete Ansprüche entfernt."
---

# Muster: Claims Substantiation Gate

**Zusammenfassung:** Führen Sie ein Register aller öffentlichen Aussagen darüber, was ein KI-System
tut und wie gut: Genauigkeit, Fairness, Sicherheit, Autonomie, "KI-gestützte" Fähigkeit. Jeder
Anspruch ist eine Zeile, die den Eval-Lauf zitiert, der ihn unterstützt, die Population und
Bedingungen, unter denen er gemessen wurde, und das Datum. Ein Gate blockiert die Veröffentlichung
eines Anspruchs ohne aktuelle Evidenz, und jede Modellfreigabe führt die zitierten Evals erneut aus
und kennzeichnet jeden Anspruch, den die neue Version nicht mehr unterstützt. Es ist ein Eval-Gate,
das auf Marketingkopien, Verkaufsmaterial und die in der Betriebsanleitung deklarierten
Genauigkeitszahlen abzielt.

## Ziele
Sagen Sie nur das, was die Evidenz unterstützt, für die Population, die der Anspruch beschreibt, und
sagen Sie es weiterhin nur, während es wahr bleibt; und können Sie für jeden Anspruch zeigen, was
ihn an dem Tag unterstützte, an dem er gemacht wurde.

## Zielbenutzer
KI-Governance-Engineer, Produktmarketing, Sales Enablement, ML-Engineer, Rechts- und
Verbraucherschutzberater, Investor Relations.

## Betroffene Stakeholder
Kunden und Verbraucher, Betreiber, die sich auf die Zahlen des Anbieters verlassen, Investoren,
Verbraucherschutz- und Finanzregulatoren, Marktüberwachungsbehörden.

## Relevante Prinzipien
Geben Sie jedem Control Zähne; instrumentieren Sie den Build, um seinen eigenen Nachweis zu
erbringen; beginnen Sie mit einem benannten Fehlermodus oder Schaden.

## Kontext
Produktseiten, Verkaufsfolien, Ausschreibungen, Investorenmaterialien, Model Cards und
Betriebsanleitungen alle sagen, wie genau, fair, sicher oder autonom ein System ist. Der Text wird
einmal geschrieben und von Marketing verwaltet; die Evidenz wird von ML produziert und ändert sich
mit jeder Freigabe. Regulatoren lesen diesen Text. Die FTC's Operation AI Comply kündigte an, dass
"es keine KI-Ausnahme von den geltenden Gesetzen gibt" [1]; ihre Workado-Anordnung folgte einem
Anspruch von 98% Genauigkeit für einen KI-Inhaltsdetektor, den Tests auf 53% bei allgemeinen
Inhalten setzten, und erfordert kompetente und zuverlässige Evidenz für solche Ansprüche [2]. Die
SEC einigte sich mit zwei Anlageberatern auf falsche und irreführende Aussagen über ihre Nutzung von
KI [3]. Gemäß der KI-Verordnung wird die Zweckbestimmung selbst teilweise durch die "Werbe- oder
Verkaufsmaterialien und Aussagen" des Anbieters definiert (`Art. 3(12)`), und für Hochrisiko-Systeme
müssen die "Genauigkeitsstufen und die relevanten Genauigkeitsmetriken" in der Betriebsanleitung
angegeben werden (`Art. 15(3)`), wobei die Stufe angegeben wird, "gegen die das Hochrisiko-KI-System
getestet und validiert wurde" (`Art. 13(3)(b)(ii)`) [4].

## Problem
Ansprüche überleben die Evidenz, die sie einmal unterstützte, oder hatten nie welche.

- **Kräfte.** Marketing möchte eine einfache Zahl; die ehrliche Zahl hat ein Intervall und eine
  Population. Evals werden auf den verfügbaren Daten durchgeführt, nicht auf der Population, die der
  Anspruch beschreibt: Workados Detektor wurde auf akademischen Text trainiert, und der Anspruch
  scheiterte bei allem anderen [2]. Anbieter-Zahlen werden wiederholt, als wären sie im Haus
  gemessen. Täuschung ist nach der FTC-Richtlinie eine Darstellung, Auslassung oder Praxis, die
  einen vernünftig handelnden Verbraucher irreführen dürfte, und wesentlich [5]; die EU-Richtlinie
  über unlautere Geschäftspraktiken und das UK Digital Markets, Competition and Consumers Act 2024
  verbieten unlautere Geschäftspraktiken in allgemeinen Begriffen [6] [7].
- **Fehlermodus.** Eine Regression wird ausgeliefert und der alte Genauigkeitsanspruch bleibt auf
  der Website. Ein Fairness-Anspruch basiert auf einer Anbieterbroschüre. Eine Behörde fragt, was
  eine vor einem Jahr gemachte Aussage unterstützte, und die einzige Antwort ist die Folie, auf der
  sie erschien.

## Lösung
Registrieren Sie den Anspruch, binden Sie ihn an Evidenz, und gaten Sie sowohl die Veröffentlichung
als auch die Freigabe an die Bindung.

1. **Registrieren Sie jeden Anspruch.** Eine Zeile pro Anspruch: der genaue Text, jeder Ort, an dem
   er erscheint (URLs, Dokumente, die Betriebsanleitung, die Model Card), das System und die
   Version, die Metrik, der behauptete Wert, der Besitzer und der Status. "KI-gestützt" und
   "autonom" sind auch Ansprüche: die Zeile verweist auf den Registereintrag, der zeigt, was das
   System tatsächlich tut.
2. **Binden Sie jeden Anspruch an Evidenz.** Die Zeile zitiert die Eval-Suite und den Lauf, den
   gemessenen Wert mit seinem Intervall, und die Population und Bedingungen der Messung. Der Test
   des AI RMF ist der richtige: Leistung "demonstriert für Bedingungen ähnlich der
   Bereitstellungseinstellung(en)" (MEASURE 2.3), mit dokumentierten Verallgemeinerungsgrenzen
   (MEASURE 2.5) [8]. Substantiierungsregeln laufen als Code: die Messingpopulation muss dem Umfang
   des Anspruchs entsprechen; eine Punktzahl wird nur behauptet, wenn die untere Intervallgrenze sie
   unterstützt; ein Vergleichsanspruch benötigt einen gepaarten Vergleich auf denselben Daten; eine
   von einem Anbieter bereitgestellte Zahl wird als Anbieter-attestiert gekennzeichnet, bis sie neu
   gemessen wird.
3. **Gate-Veröffentlichung.** Kopien, die einen registrierten Anspruch tragen, können nicht
   veröffentlicht oder in einer Ausschreibung gesendet werden, während die Evidenz des Anspruchs
   fehlt, veraltet oder fehlgeschlagen ist. Nicht registrierte quantitative Ansprüche werden in der
   Überprüfung durch die gleiche Regel erfasst, die nicht registrierte Systeme blockiert.
4. **Gate die Freigabe.** Jede Modellfreigabe führt die zitierten Suites erneut aus. Ein Anspruch,
   dessen Evidenz unter den behaupteten Wert fällt, schlägt die Freigabe fehl oder öffnet eine
   Rückzugaufgabe mit Frist und Besitzer; die deklarierte Genauigkeit in der Betriebsanleitung wird
   aus denselben Zeilen neu generiert.
5. **Behalten Sie den Verlauf.** Zurückgezogene und geänderte Ansprüche behalten ihren Datensatz
   (was gesagt wurde, wo, auf welcher Evidenz, bis wann), damit die Organisation zeigen kann, was
   sie wusste und wann.

Illustrative Claims-Register-Zeile:

```json
{
  "claim_id": "CLM-2026-017",
  "text": "Catches 95% of card-not-present fraud",
  "locations": ["https://www.example.com/product/fraud-shield", "sales-deck-2026Q3#slide-4",
                "instructions-for-use/fraud-cnp/5.3#accuracy"],
  "system": "fraud-cnp@5.3.0",
  "metric": "recall on confirmed card-not-present fraud",
  "claimed_value": 0.95,
  "evidence": { "suite_id": "fraud.recall.cnp.v7", "run": "ci-run-99812", "value": 0.962,
                "ci95": [0.953, 0.970], "population": "EU card-not-present, 2026-Q2, n=4120 confirmed fraud",
                "timestamp": "2026-09-12T08:00:00Z" },
  "scope_match": "pass",
  "status": "substantiated",
  "owner": "product-marketing-fraud",
  "revalidate_on": ["model_release", "2026-12-31"]
}
```

> **Beispiel (illustrativ)** Die Website eines Betrugsprodukts behauptete eine Erkennungsrate, die
> zwei Modellversionen früher auf dem Datenverkehr eines Landes gemessen wurde. Die Registrierung
> des Anspruchs zeigte beide Lücken: die Evidenz war veraltet und die Population enger als die Kopie
> implizierte. Der Anspruch wurde umgeschrieben, um die Region zu benennen, die nächste Freigabe
> führte die Suite erneut aus, und ein späteres Retraining, das unter den behaupteten Wert fiel,
> öffnete eine Rückzugaufgabe, bevor das neue Modell ausgeliefert wurde.

## Konsequenzen
Öffentliche Aussagen werden evidenziert, begrenzt und datiert, veraltete Ansprüche werden von der
Pipeline statt von einem Regulator entfernt, und die deklarierte Genauigkeit in der
Betriebsanleitung bleibt konsistent mit dem Marketing. Die Kosten: Marketing und Recht müssen ein
Register und einen Überprüfungsschritt akzeptieren; ehrliche Ansprüche sind enger und tragen
Intervalle; und die Regel zur Umfangsabstimmung erfordert Urteilsvermögen für qualitative Ansprüche,
die bei der Rechtsüberprüfung bleiben.

## Verwandte Muster
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Zuordnung:** KI-Verordnung Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3) · FTC Act s. 5 · Richtlinie
2005/29/EG Art. 5 · DMCC Act 2024 s. 225 · ISO/IEC 42001 A.8.2, A.8.5 · NIST AI RMF (Measure 2.3,
2.5) · Layer 05 Assurance & Continuous Compliance / Layer 03 Evals & Red Teaming as Evidence.

Funktions- und Unterkategorie-Etiketten folgen dem NIST AI RMF [8]; ISO/IEC 42001 Annex A Ids folgen
einem veröffentlichten Crosswalk, nicht dem Text des Standards [9]. Zuordnungen sind illustrativ,
keine Konformitätsaussage.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; trained on academic text; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[3] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose incl. "promotional or sales materials and statements"; Art. 13(3)(b)(ii) level of accuracy, incl. its metrics, against which the system has been tested and validated; Art. 15(3) accuracy levels and metrics declared in the instructions for use (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[6] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[7] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3 performance "demonstrated for conditions similar to deployment setting(s)"; MEASURE 2.5 validity and reliability, limits of generalisability documented). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[9] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users, B.8.5 information for interested parties; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
