---
lang: de
source: bok/patterns/training-data-rights-ledger.md
sourceHash: "9b631239e9232bef3b67a7cf72410a930581d03bdd7d48f616d6851aea3fd522"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: training-data-rights-ledger
title: Training-Data Rights Ledger
layer: 2
order: 20
summary: "Ein Ledger pro Quelle des Rechts zum Training: Akquisitionskanal, Lizenz, Opt-Out-Prüfung und zulässige Verwendungen, verbunden mit Lineage, sodass jedes Modell seine Quellen kennt."
---

# Muster: Training-Data Rights Ledger

**Zusammenfassung:** Führen Sie ein Ledger mit einer Zeile pro Trainingsquelle (nicht pro
zusammengeführtem Datensatz), das aufzeichnet, wie die Daten erworben wurden, unter welcher Lizenz
oder Rechtsgrundlage, ob Rechtsvorbehalte geprüft wurden und wie, und welche Verwendungen zulässig
sind; verbinden Sie dann das Ledger mit der Lineage, sodass jede Modellversion die Zeilen auflistet,
auf denen sie trainiert wurde. Das Ledger beantwortet "hatten wir das Recht, dies zu verwenden?" pro
Quelle und "welche Modelle sind betroffen?" wenn eine Lizenz, ein Opt-Out oder eine Anordnung die
Antwort ändert.

## Ziele
Machen Sie das Recht zum Training zu einer aufgezeichneten, abfragbaren Tatsache vor dem Training,
und halten Sie es danach wahr, sodass ein Widerruf, eine Löschanfrage oder eine Gerichtsentscheidung
nur für die betroffenen Modelle erfüllt und nachgewiesen werden kann.

## Zielbenutzer
KI-Governance-Engineer, Leads für Datenbeschaffung und Lizenzierung, Datenverwalter, Rechts- und
Datenschutzberater, ML-Plattform-Team.

## Betroffene Stakeholder
Rechteinhaber und Verleger, Datensubjekte, Modell-Anbieter und nachgelagerte Betreiber, das Büro für
Künstliche Intelligenz und andere Behörden, Gerichte und Regulierungsbehörden.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; bauen Sie die Kontrolle an
dem frühestmöglichen Punkt ein, an dem sie blockieren kann; beginnen Sie mit einem benannten
Fehlermodus oder Schaden.

## Kontext
Ein Anbieter, der Modelle auf einer Mischung aus internen Daten, lizenzierten Korpora, offenen
Datensätzen, gecrawltem Web-Inhalt und Nutzerdaten trainiert oder feinabstimmt, die von
verschiedenen Teams zu verschiedenen Zeiten zusammengestellt wurden. Rechte haften pro Quelle und
manchmal pro Datensatz, aber das Training verbraucht zusammengeführte Korpora.

## Problem
Die rechtlichen Fragen werden pro Quelle entschieden; die Evidenz wird normalerweise, falls
überhaupt, pro Projekt aufbewahrt.

- **Kräfte.** Für Inhalte, die online öffentlich verfügbar gemacht werden, gilt die EU-Ausnahme für
  Text- und Data-Mining nur, wenn der Rechteinhaber seine Rechte "auf angemessene Weise,
  beispielsweise durch maschinenlesbare Mittel" nicht vorbehalten hat (DSM-Richtlinie `Art. 4(3)`)
  [1], und ein Hamburger Gericht entschied im Dezember 2025, dass ein Vorbehalt in
  natürlichsprachigen Nutzungsbedingungen diese Anforderung nicht erfüllte, mit weiterer Berufung
  zulässig [2]. Ein Anbieter eines KI-Modells mit allgemeinem Verwendungszweck muss eine
  Urheberrechtspolitik führen, die solche Vorbehalte identifiziert und einhält, und muss eine
  ausreichend detaillierte Zusammenfassung des Trainingsinhalts veröffentlichen (`Art. 53(1)(c)` und
  `(d)`) [3]. Wie Daten erworben wurden, ist genauso wichtig wie ihre Lizenz: in *Bartz v.
  Anthropic* unterschied das Gericht zwischen rechtmäßig gekauften und gescannten Büchern und
  Raubkopien [4]. Personenbezogene Daten bringen Zweckbindung und den Kompatibilitätstest für
  weitere Verarbeitung (DSGVO `Art. 5(1)(b)`, `Art. 6(4)`) [5].
- **Fehlermodus.** Niemand kann sagen, welche Quellen welche Modellversion trainiert haben oder
  unter welchen Bedingungen. Eine einzelne unlizenzierte oder rechtswidrig erhaltene Quelle
  kontaminiert jedes Modell, das darauf trainiert wurde, und Abhilfen können das Modell selbst
  erreichen: die FTC-Anordnung gegen Everalbum verlangte die Löschung von "allen Modellen oder
  Algorithmen, die ganz oder teilweise unter Verwendung" der rechtswidrig verwendeten Daten
  entwickelt wurden [6]. Ohne Pro-Quellen-Lineage ist die einzige sichere Antwort, alles zu löschen.

## Lösung
Machen Sie das Ledger das Eintrittticket für jede Trainingsquelle, und lassen Sie die Lineage darauf
zurückweisen.

1. **Eine Zeile pro Quelle.** Zeichnen Sie die Quellen-ID und -Version, den Akquisitionskanal
   (lizenzierte Lieferung, API, Crawl, Nutzer-Upload, internes System), den Lizenzgeber, die
   Lizenzreferenz und ihre Bedingungen für Training, kommerzielle Nutzung und Verteilung
   abgeleiteter Modelle, die Rechtsgrundlage, wenn die Daten personenbezogen sind, und die
   zulässigen Verwendungen auf. Für gecrawlte Inhalte zeichnen Sie die Crawler-Identität, das
   Fenster und die Rechtsvorbehalts-Prüfung auf: die Methode (beispielsweise `robots.txt` und
   Seitenmetadaten, die zum Abrufzeitpunkt gelesen werden), das Ergebnis und das Datum. Die
   Datenschutzpflichten der KI-Verordnung für Hochrisiko-Systeme nennen dieselben Fakten:
   "Datenerfassungsprozesse und die Herkunft von Daten" und für personenbezogene Daten "der
   ursprüngliche Zweck der Datenerfassung" (`Art. 10(2)(b)`) [3].
2. **Gate auf der Zeile.** Der Corpus-Build und das
   [Dataset Admission Gate](/patterns/dataset-admission-gate) schlagen fehl, wenn eine Quelle keine
   Ledger-Zeile hat, wenn ihre Bedingungen die erklärte Verwendung nicht zulassen, oder wenn ihre
   Rechtsvorbehalts-Prüfung fehlt oder veraltet ist.
3. **Verbinden Sie das Ledger mit der Lineage.** Jeder Trainingslauf zeichnet die Ledger-Zeilen (ID
   und Version) auf, die er gelesen hat, und die [AIBOM](/patterns/aibom) listet die Datensätze nach
   Version auf. Rückwärts-Lineage beantwortet "was hat dieses Modell trainiert?"; Vorwärts-Lineage
   beantwortet "welche Modelle haben diese Quelle verwendet?", was die Frage ist, die ein Widerruf
   oder eine Anordnung stellt.
4. **Generieren Sie die Offenlegungen.** Erstellen Sie die GPAI-Trainingsinhalts-Zusammenfassung auf
   der Vorlage der Kommission (obligatorisch unter `Art. 53(1)(d)`, anwendbar ab 2. Aug. 2025, mit
   Modellen, die bereits am 2. Aug. 2027 auf dem Markt sind) [7] und Kaliforniens AB
   2013-Dokumentation (gültig seit 1. Jan. 2026, einschließlich Quellen, persönlicher Informationen
   und der Verwendung synthetischer Daten) [8] als Abfragen über das Ledger, nicht als Dokumente aus
   dem Gedächtnis geschrieben.
5. **Behandeln Sie Änderungen als Ereignis.** Ein Lizenzablauf oder -widerruf, ein neuer Vorbehalt,
   eine Löschanfrage oder eine Anordnung markiert die betroffenen Zeilen; Vorwärts-Lineage listet
   die betroffenen Modelle auf; und die Abhilfe (Neutraining ohne die Quelle, Pensionierung des
   Modells oder eine dokumentierte Entscheidung, sich auf eine andere Grundlage zu stützen) wird
   gegen dieselben Zeilen mit Datum und Genehmiger aufgezeichnet.

Das AI RMF verlangt Richtlinien zu Drittanbieter-Risiken, "einschließlich Risiken von Verletzungen
der Rechte des geistigen Eigentums oder anderer Rechte Dritter" (GOVERN 6.1), und für die Zuordnung
der rechtlichen Risiken von Komponenten, "einschließlich der Verwendung von Daten oder Software
Dritter" (MAP 4.1) [9].

Illustrative Ledger-Zeile für eine gecrawlte Quelle:

```json
{
  "source_id": "src-crawl-techdocs-2026q2",
  "version": "2026-06-30",
  "acquisition_channel": "crawl",
  "crawl": { "user_agent": "corp-trainbot/2.1", "window": "2026-04-01/2026-06-30" },
  "legal_basis": { "copyright": "DSM Directive Art. 4 (commercial TDM exception)",
                   "personal_data": "GDPR Art. 6(1)(f); assessment LIA-2026-019" },
  "reservation_check": { "method": "robots.txt and page metadata at fetch time",
                         "result": "412 domains excluded", "checked_at": "2026-06-30" },
  "licence": { "ref": null, "training": "exception_relied_on", "derived_model_distribution": "permitted" },
  "permitted_uses": ["pre-training of the doc-lm model family"],
  "trained_models": ["doc-lm@1.4.0"],
  "owner": "data-acquisition-lead",
  "reviewed": "2026-09-15"
}
```

> **Beispiel (illustrativ)** Ein Abrufassistent eines Verlags wurde auf einem Korpus aufgebaut, den
> drei Teams zusammengestellt hatten. Das Ledger wurde nachträglich hinzugefügt, eine Zeile pro
> Quelle: zwei Quellen hatten keine Lizenz im Datensatz und eine war von einer Website gecrawlt
> worden, deren `robots.txt` den Crawler nicht zuließ. Der Korpus-Build schlägt jetzt bei einer
> Quelle ohne Zeile fehl, die zwei lizenzierten Quellen wurden entfernt und der Index neu erstellt,
> und der Neubau wird gegen dieselbe Registry-ID aufgezeichnet. Als ein Lizenzgeber später ein
> Archiv zurückzog, benannte die Forward-Lineage die zwei Fine-Tuned-Modelle, die es gelesen hatten.

## Konsequenzen
Das Recht zum Training wird zur Evidenz, die vor dem Training existiert, Offenlegungen werden
generiert statt entworfen, und eine Änderung der Rechte betrifft nur die Modelle, die die Quelle
genutzt haben. Die Kosten: eine Zeile pro Quelle ist echte Arbeit für große Crawls, daher muss die
Crawl-Pipeline Zeilen selbst schreiben; Reservierungsprüfungen sind nur so gut wie die
aufgezeichnete Methode; und das Ledger zeichnet die Position der Organisation auf, es löst keine
offenen Rechtsfragen.

## Verwandte Muster
[Dataset Admission Gate](/patterns/dataset-admission-gate); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Zuordnung:** EU AI Act Art. 10(2)(b), Art. 53(1)(c)–(d) · Directive (EU) 2019/790 Art. 4(3) ·
DSGVO Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.3, A.7.5 · NIST AI RMF (Govern 6.1; Map 4.1) ·
Layer 02 Inventory & Transparency.

Funktions- und Unterkategorie-Labels folgen dem NIST AI RMF [9]; ISO/IEC 42001 Annex A IDs folgen
einem veröffentlichten Crosswalk, nicht dem Text des Standards [10]. Zuordnungen sind illustrativ,
keine Konformitätsbehauptung.

## Sources

[1] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[2] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(b) data collection processes, origin of data and original purpose of collection; Art. 53(1)(c) copyright policy identifying reservations under Art. 4(3) of Directive (EU) 2019/790; Art. 53(1)(d) public summary of training content on the AI Office template (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[7] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[8] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 4.1 legal risks of components incl. third-party data or software). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.3 acquisition of data, B.7.5 data provenance; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
