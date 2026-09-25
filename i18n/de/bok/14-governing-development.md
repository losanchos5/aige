---
lang: de
source: bok/14-governing-development.md
sourceHash: "a8da4ad617810f33e44a55719a0c5546569e9310e2e3364c1f29cf97fe4090de"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 14. KI-Entwicklung regeln

> KI-Entwicklung wird geregelt, wenn jede Entscheidung im Build, vom Use Case bis zur Freigabe,
> einen Datensatz hinterlässt, den ein Gate liest, sodass die Pipeline die technische Datei
> kompiliert, anstatt dass ein Team sie später schreibt.

## Der Build als eine Kette von Gates

Die meisten Governance-Fehler in einem KI-System werden entschieden, bevor es seine erste Anfrage
bedient. Der Use Case wurde nie aufgeschrieben, also kann niemand sagen, wofür das System ist. Das
Trainingsset wurde unter Bedingungen gescraped, die niemand überprüft hat. Das Testset ist in das
Training gelangt. Die Freigabe ging raus, weil das Datum feststand. Jede davon ist eine
Entwicklungsentscheidung, und jede hinterlässt entweder einen Datensatz oder eine Lücke.

Dieses Kapitel behandelt die Provider-Seite des Lebenszyklus: die Organisation, die ein KI-System
oder Modell entwirft, trainiert, testet und freigibt.
[Kapitel 15](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance) behandelt
Bereitstellung und Verwendung. Die Aufteilung folgt den Pflichtträgern der KI-Verordnung (siehe die
[Regulatorische Karte](/bok/regulatory-map#eu-ai-act-post-omnibus)): Das meiste davon bindet den
Provider, und ein Betreiber, der auf einem beschafften Modell aufbaut, erbt eine dünnere Version
davon durch das [**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).

Die Referenztexte stimmen in den Phasen überein und sagen wenig über den Mechanismus. ISO/IEC
5338:2023 definiert KI-System-Lebenszyklen-Prozesse [1]; ISO/IEC 42001 gruppiert die Kontrollen
unter Annex A.6 (Lebenszyklus) und A.7 (Daten) [2]; das NIST AI RMF setzt Kontext in Map und Tests
in Measure [3]; die KI-Verordnung der EU fragt nach einem Qualitätsmanagementsystem mit
Designkontrolle, Designverifizierung und "Prüfungs-, Test- und Validierungsverfahren, die vor,
während und nach der Entwicklung durchgeführt werden" [4]. Die Engineering-Lesart: jede Phase endet
in einem Gate, jedes Gate liest einen strukturierten Datensatz, und jeder Datensatz landet im
Evidence Store, der mit der Registry-ID verknüpft ist, dem Datenpfad von
[einem System durch die fünf Schichten](/bok/the-stack#one-system-through-the-five-layers).

Schichtnummern in den Tabellen dieses Kapitels folgen Kapitel 04:
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Phase | Governance-Frage | Datensatz | Gate | Schicht |
|---|---|---|---|---|
| Use Case | Ist dies das richtige Problem, und ist KI das richtige Werkzeug? | Use-Case-Datensatz | [Intake-Genehmigung](/patterns/use-case-intake-risk-tiering) | 1 · 2 |
| Design-Review | Halten die Anforderungen, Architektur und Missbrauchsanalyse stand? | Design-Datensatz und Entscheidungsprotokoll | Design-Review-Genehmigung | 1 · 2 |
| Daten | Dürfen wir diese Daten verwenden, und sind sie für den Zweck geeignet? | Dataset-Zulassungsdatensatz, Datenblatt, Herkunft | [Dataset-Zulassungs-Gate](/patterns/dataset-admission-gate) | 1 · 2 · 3 |
| Tests | Erfüllt das System Schwellwerte, die vor den Tests festgelegt wurden? | Testplan, Eval-Ergebnisse, Testreport | Eval-Gate | 3 |
| Release | Ist es bereit, und ist die Konformitätsroute vollständig? | Go/No-Go-Datensatz, Erklärung, Registrierung | Release-Gate | 1 · 5 |
| Technische Datei | Kann eine Behörde all das oben Genannte rekonstruieren? | Annex IV-Datei, Karten, AIBOM | Dokumentations-Build | 2 · 5 |

Dies ist nicht MLOps, das das Modell durch die gleichen Phasen bewegt, und es ist nicht
Modellvalidierung im Banking-Sinne, die das Modell zu bestimmten Zeitpunkten herausfordert (der
[Disambiguierungs-Cluster](/bok/definition#the-disambiguation-cluster) zieht beide Linien). Es ist
der Governance-Datensatz, den diese beiden Aktivitäten produzieren, maschinenlesbar gemacht und mit
der Kraft ausgestattet, zu blockieren. Die organisatorischen Regeln, die jedes Gate durchsetzt, sind
in Kapitel 12 festgelegt
([was Richtlinie in jeder Phase verlangt](/bok/governance-program#what-policy-requires-at-each-stage)),
und die Templates-Seite hat Schemas und ausgefüllte Beispiele für
[Use-Case-Datensatz, Design-Review, Dataset-Zulassung, Testplan und Report, und Release-Gate](/resources/templates#stage-build).
## Der Use-Case-Datensatz

Der Use-Case-Datensatz ist das erste Artefakt und das am häufigsten fehlende. Er wird bei
[Intake](/bok/the-role#intake-and-classification) geschrieben, als Felder auf dem Registry-Eintrag
gespeichert und von jedem späteren Gate gelesen. Die KI-Verordnung verankert ihn: die
**Zweckbestimmung** ist "die Verwendung, für die ein KI-System vom Provider bestimmt ist,
einschließlich des spezifischen Kontexts und der Verwendungsbedingungen" [5], und die meisten
Hochrisiko-Pflichten werden gegen sie gemessen. Das NIST AI RMF fragt nach dem gleichen in
Engineering-Begriffen: beabsichtigte Zwecke, prospektive Einstellungen und die Arten von Benutzern
werden "verstanden und dokumentiert" (MAP 1.1), und organisatorische Risikotoleranzen werden
"bestimmt und dokumentiert" (MAP 1.5) [3].

| Feld | Was es aufzeichnet | Später gelesen von |
|---|---|---|
| Geschäftskontext | Das Ziel, der Sponsor, die Entscheidung, die das System informiert | Design-Review, Go/No-Go |
| Zweckbestimmung | Aufgabe, Kontext und Verwendungsbedingungen | Klassifizierung, Tests, Betriebsanleitung |
| Nicht im Umfang enthaltene Verwendungen | Verwendungen, die der Provider ausschließt, explizit angegeben | Missbrauchsanalyse, Betriebsanleitung, Laufzeit-Richtlinie |
| Benutzer und betroffene Personen | Wer betreibt es; wer unterliegt seinen Ausgaben, einschließlich gefährdeter Gruppen | Auswirkungsbewertungen, Bias-Tests |
| Entscheidungsbefugnis | Beratend, von Menschen genehmigt oder autonom; wer kann es außer Kraft setzen | Überwachungsdesign, Human-in-the-Loop-Gate |
| Betriebsumgebung | Wo es läuft, Eingabequellen, Sprachen, Jurisdiktionen | Repräsentativitätsprüfungen, Testplan |
| Erfolgskennzahlen | Die Geschäftskennzahl, die Modellkennzahl und die Verknüpfung zwischen ihnen | Testplan, Überwachung |
| Fehler-Appetit | Die Kosten eines falsch positiven gegen einen falsch negativen; tolerierte Raten | Schwellwerte |
| Erwartete Lebensdauer | Überprüfungsdatum und Ruhestandskriterien | Wartung, Aufbewahrung |
| Datenverfügbarkeit | Ob rechtmäßige, ausreichende Daten existieren | Machbarkeit, Dataset-Zulassung |

### Ist KI das richtige Werkzeug?

Die erste Gate-Frage ist, ob überhaupt gebaut werden soll. Googles Engineering-Leitfaden beginnt mit
der Regel „Don't be afraid to launch a product without machine learning" [6], und die
Governance-Version ist schärfer: Wenn eine Regel, eine Nachschlagoperation oder ein manueller
Workflow die Erfolgskennzahl erfüllt, fügt ein Modell Risiko ohne Mehrwert hinzu. Zeichnen Sie die
Nicht-ML-Baseline im Use-Case-Datensatz auf und verlangen Sie, dass die Designüberprüfung sie um
eine angegebene Marge übertrifft. Die Baseline gibt dem Testen auch seinen ersten Vergleich: Ein
Modell, das nicht besser abschneidet als die Regel, die es ersetzt, hat keinen Platz in der
Produktion verdient.

### Fehlertoleranz: falsch positive versus falsch negative

Jeder Klassifizierer tauscht einen Fehler gegen einen anderen, und dieser Tausch ist eine
geschäftliche und Rechtsfrage, keine Modellierungsfrage. Ein Betrugserkenner, der zu viel
kennzeichnet, sperrt legitime Kunden; einer, der zu wenig kennzeichnet, lässt Betrug durch.
Schreiben Sie die Fehlertoleranz vor dem Training auf, in der Währung des Schadens: Was ein
verpasster Fall kostet, was ein falscher Alarm kostet, und welcher Fehler, für welche Gruppe, ist
unabhängig von den Kosten begrenzt. Die Schwellenwertauswahl wird dann zur Arithmetik gegen
angegebene Kosten, und das Verschieben des Schwellenwerts wird zu einer Änderung des Datensatzes mit
einem Genehmiger, nicht zu einer Tuning-Entscheidung in einem Notebook. Pro-Gruppen-Fehlerraten und
die Fairness-Kompromisse, die sie erzwingen, werden in
[Kapitel 16](/bok/fairness-and-explainability#the-impossibility-results) behandelt.

### Funktionserweiterung

Ein für einen Zweck erstelltes Modell driftet in andere ab, weil seine Scores verfügbar und
kostengünstig sind. Die überarbeitete Modellrisiko-Leitlinie der US-Bankbehörden drückt es deutlich
aus: „Using a model beyond its intended purpose introduces additional uncertainty and risk" [7].
Unter der KI-Verordnung der EU hat der Drift rechtliche Konsequenzen. Ein Akteur in der
Wertschöpfungskette, der die Zweckbestimmung eines Systems so ändert, dass es hochriskant wird, wird
als sein Anbieter behandelt (Art. 25(1)(c)) [8], und eine Änderung, die in der ursprünglichen
Konformitätsbewertung nicht vorgesehen war und die Compliance beeinflusst, ist eine
**wesentliche Veränderung** (Art. 3(23)) [5]. Die technische Kontrolle besteht darin, die
Zweckbestimmung und die Out-of-Scope-Liste als Felder zu gestalten, die eine Richtlinie liest. Ein
neuer Nutzer der Modell-API erklärt seine Verwendung bei der Registrierung; eine erklärte Verwendung
außerhalb des Datensatzes schlägt bei der Aufnahme fehl und eröffnet die Klassifizierung und die
Auswirkungsbewertungen erneut.

> **Beispiel (illustrativ)** Ein Use-Case-Datensatz, der auf dem Registereintrag eines
> Kreditlimit-Modells gespeichert ist. Jedes spätere Gate liest diese Felder statt einer Folie.

```json
{
  "id": "uc-credit-limit-07",
  "registry_id": "clm-07",
  "intended_purpose": "Recommend a credit-limit band for existing retail customers; a credit officer approves.",
  "out_of_scope": ["new-customer onboarding", "collections prioritisation", "employment decisions"],
  "affected_persons": ["retail customers", "guarantors"],
  "decision_authority": "advisory; officer approval required above band 3",
  "success_metric": { "business": "bad-debt rate", "model": "AUC >= 0.78 on frozen holdout" },
  "error_appetite": { "false_negative": "loss amount", "false_positive": "declined uplift",
                      "max_fnr_gap_between_groups": 0.03 },
  "non_ml_baseline": "scorecard-v5",
  "classification": { "eu_ai_act": "high-risk, Annex III 5(b)", "gdpr_dpia": true, "fria": true },
  "owner": "team-credit-decisioning",
  "review_by": "2027-03-31"
}
```

> **In der Praxis (illustrativ)**
> Ein Retentions-Team bei einem großen Telekommunikationsunternehmen forderte ein Churn-Modell an
> und erhielt bei der Aufnahme statt eines Notizbuchs einen einseitigen Use-Case-Datensatz zum
> Ausfüllen. Das Schreiben der Out-of-Scope-Liste offenbarte, dass der Vertrieb dieselben Scores zur
> Festlegung individueller Rabattstufen nutzen wollte: ein zweiter Zweck mit eigener
> Fairness-Exposition. Der Datensatz teilte die Anfrage in zwei Use Cases auf, jeder mit eigener
> Klassifizierung und Fehlertoleranz, und der Rabattfall ging zur Folgenabschätzung zurück, bevor
> das Training begann.

## Design-Review

Die Design-Überprüfung ist das Gate zwischen einem genehmigten Use Case und der
Rechenressourcen-Nutzung. Sie liest den Use-Case-Datensatz und erstellt einen **Design-Datensatz**:
Anforderungen, Architektur und Modellwahl mit ihrer Begründung, die Missbrauchsanalyse, das
Aufsichtsdesign und die eingebauten Kontrollen. Annex IV Punkt 2(b) wird von einem
Hochrisiko-Anbieter die wichtigsten Designentscheidungen, ihre Begründung und Annahmen sowie die
getroffenen Kompromisse verlangen [9]; wenn sie zeitnah dokumentiert werden, kostet das Minuten, und
wenn sie ein Jahr später rekonstruiert werden, kostet das ein Projekt.

### Anforderungen mit Nachverfolgbarkeit

Anforderungen kommen in drei Kategorien. **Funktionale** Anforderungen beschreiben, was das System
tut. **Nicht-funktionale** Anforderungen setzen Mindeststandards für Genauigkeit, Latenz, Fairness,
Erklärbarkeit, Datenschutz, Robustheit und Kosten. **Regulatorische** Anforderungen sind die
Verpflichtungen, die die Klassifizierung auslöst, wie Ereignisprotokollierung oder eingebaute
Aufsicht für ein Hochrisiko-System. Das NIST AI RMF fordert, dass Systemanforderungen "von
relevanten KI-Akteuren ermittelt und verstanden werden" (MAP 1.6) [3].

Nachverfolgbarkeit ist der Engineering-Teil. Jede Anforderung erhält eine ID, jede ID wird auf
mindestens einen Test abgebildet, und jeder Test gibt einen Evidenzdatensatz aus, der die
Anforderung benennt. Die Nachverfolgung wird dann zu einer Verknüpfung, nicht zu einer Tabelle:
`REQ-FAIR-02` (Falsch-Negativ-Rate-Lücke zwischen Altersgruppen höchstens 0,03) wird zur Suite
`fnr-gap-by-age.v2`, zu ihrem letzten Ergebnis und zum Release, das darauf ausgeliefert wurde. Eine
Anforderung ohne Test ist ein Wunsch; ein Test ohne Anforderung ist Rauschen im Gate.

### Architektur und Modellwahl-Kompromisse

Modellwahl ist eine Governance-Entscheidung, weil sie festlegt, was später getestet, erklärt und
nachgewiesen werden kann. Dokumentieren Sie jede Wahl als kurzen Entscheidungsdatensatz (Kontext,
Optionen, Entscheidung, Konsequenzen, Datum, Genehmiger) im selben Repository wie der Code.

| Wahl | Optionen | Governance-Konsequenz |
|---|---|---|
| Interpretierbar oder komplex | Scorecard, sparsames oder additives Modell, kleiner Baum; oder Gradient Boosting, tiefes Netzwerk, LLM | Ein interpretierbares Modell ist seine eigene Erklärung; ein komplexes benötigt post-hoc-Erklärung, die vom Modell abweichen kann. Rudin argumentiert, dass Entscheidungen mit hohem Einsatz interpretierbare Modelle verwenden sollten, anstatt Black Boxes nachträglich zu erklären [10] |
| Open-Weight oder proprietär | Selbst gehostete Gewichte; oder eine Anbieter-API | Gewichte können getestet, fixiert und in der Region gehostet werden; eine API kann sich hinter Ihnen ändern, und ihre Evidenz wird gesammelt, nicht produziert ([beschaffte KI](/bok/the-stack#third-party-and-procured-ai)) |
| Trainieren, Fine-Tuning oder Prompting | Eigenes Modell; Fine-Tuned Foundation Model; Prompting und Retrieval | Jeder Schritt nach oben erhöht die Trainingsdaten-Pflichten; eine ausreichend große Modifikation eines Modells mit allgemeinem Verwendungszweck kann Sie zu seinem Anbieter machen [11] |
| Retrieval oder Fine-Tuning für Wissen | RAG-Corpus; Wissen in Gewichten | Ein Corpus kann versioniert, gefiltert und gelöscht werden; Wissen in Gewichten kann nicht entfernt werden, ohne neu zu trainieren |
| Hosting | Verwalteter Service; eigene Infrastruktur | Datenresidenz, Log-Eigentum und Aufbewahrungskontrolle |
| Kosten und Nachhaltigkeit | Modellgröße, Trainingsläufe, Inferenzvolumen | Annex IV fordert die für die Entwicklung, das Training, das Testen und die Validierung verwendeten Rechenressourcen [9]; Annex XI fordert GPAI-Anbieter auf, bekannte oder geschätzte Energieverbrauchswerte anzugeben [12] |

### Vernünftigerweise vorhersehbare Fehlanwendung

**Vernünftigerweise vorhersehbare Fehlanwendung** ist "die Verwendung eines KI-Systems auf eine
Weise, die nicht seiner Zweckbestimmung entspricht, aber aus vernünftigerweise vorhersehbarem
menschlichem Verhalten oder der Interaktion mit anderen Systemen resultieren kann" [5]. Das ist
nicht dasselbe wie ein Angriff. Ein Angreifer wird vom Red Team in
[Schicht 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) modelliert; vorhersehbare
Fehlanwendung ist das, was normale Benutzer und benachbarte Systeme mit der Ausgabe ohnehin tun
werden: ein Triage-Score als Diagnose gelesen, eine CV-Rangliste zur Ablehnung ohne Überprüfung
verwendet, ein Zusammenfasser auf eine Sprache angewendet, auf die er nie getestet wurde.

Das EU KI-Verordnung macht die Analyse zweimal zu einer Design-Eingabe. Das Risikomanagementsystem
muss die Risiken schätzen und bewerten, die unter Bedingungen vernünftigerweise vorhersehbarer
Fehlanwendung entstehen (Art. 9(2)(b)) [13], und die Betriebsanleitung muss bekannte oder
vorhersehbare Umstände offenlegen, einschließlich solcher Fehlanwendung, die zu Risiken für
Gesundheit, Sicherheit oder Grundrechte führen können (Art. 13(3)(b)(iii)) [14]. Führen Sie ein
**Missbrauchsregister** im Design-Datensatz: Szenario, wer es tun würde, Wahrscheinlichkeit, Schaden
und die Reaktion. Jeder Eintrag muss an mindestens einem von drei Orten landen: ein Test in der
Eval-Suite, eine Runtime-Richtlinie, die ihn blockiert oder kennzeichnet, oder eine Warnung in der
Betriebsanleitung. Ein Eintrag, der nirgendwo landet, ist ein akzeptiertes Risiko und benötigt einen
benannten Akzeptor ([Kapitel 13](/bok/risk-management#who-may-accept) behandelt, wer akzeptieren
darf).

### Aufsicht und eingebaute Kontrollen

Das Feld decision-authority des Use-Case-Datensatzes legt das Aufsichtsmodell fest. Die High-Level
Expert Group der EU nennt drei Ansätze: human-in-the-loop, human-on-the-loop und human-in-command
[15]. Das Design-Review wählt einen pro Entscheidungsklasse und entwirft ihn gegen
Automatisierungsbias und Aufsicht, die unter Last abbaut, wie in
[designing human oversight](/bok/the-stack#designing-human-oversight-article-14) und dem
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate)-Muster dargelegt. Dasselbe Review
fixiert die Kontrollen, die jetzt billig und später teuer zu nachrüsten sind: Event-Logging, einen
Rollback-Pfad, einen Shadow-Mode und einen
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) für alles, das handelt.

Das Review ist ein Gate mit benannten Reviewern: ein Engineering Lead, der KI-Governance-Engineer,
Security, Privacy, ein Domänenexperte und, wenn die betroffenen Personen außerhalb der Organisation
sind, jemand, der für sie sprechen kann. Sein Output ist ein signierter Design-Datensatz mit offenen
Bedingungen, keine Notizen.

## Daten für Training und Test

[Data governance across the stack](/bok/the-stack#data-governance-across-the-stack) setzt die Regel,
dass jeder Datensatz eine Rechtsgrundlage, eine Herkunft, eine Aufbewahrungsfrist und einen Satz von
Rechten trägt. Dieser Abschnitt ist das Verfahren zur Entwicklungszeit, das dies durchsetzt: ein
[**dataset admission gate**](/patterns/dataset-admission-gate). Ein Training-Job darf nur Datensätze
lesen, deren Zulassungsdatensatz vollständig ist und vom Dateneigentümer signiert wurde, und die
Prüfung ist Policy-as-Code in der Pipeline, nicht eine Erinnerung in einem Wiki.

### Das Recht, die Daten zu nutzen

Die Zulassung beginnt mit Rechten, weil ein Qualitätsproblem behoben werden kann und ein
Rechtsproblem oft nicht. Pro Datensatz beantwortet der Datensatz fünf Fragen.

- **Rechtsgrundlage und Zweck.** Für personenbezogene Daten, welche DSGVO-Grundlage für Training
  gilt und ob Training mit dem Zweck der ursprünglichen Erhebung vereinbar ist. Zweckbindung (Art.
  5(1)(b)) und die Kompatibilitätsfaktoren von Art. 6(4) entscheiden, ob Daten, die zur
  Kundenbetreuung erhoben wurden, ein Modell über sie trainieren dürfen [16]. Zustimmung zu einem
  Service ist keine Zustimmung zum Training.
- **Besondere Kategorien.** Nach dem Digital Omnibus sitzt die enge Grundlage zur Verarbeitung
  besonderer Kategorien personenbezogener Daten zur Bias-Erkennung in einem neuen Art. 4a statt dem
  alten Art. 10(5), bedingt durch Schutzmaßnahmen und Löschung [17] (siehe die
  [regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- **Modelle als personenbezogene Daten.** Die Stellungnahme 28/2024 des EDPB (Dezember 2024) besagt,
  dass ein Modell, das auf personenbezogenen Daten trainiert wurde, nur dann anonym ist, wenn es
  sehr unwahrscheinlich ist, sowohl die Personen zu identifizieren, deren Daten es trainiert haben,
  als auch jemandem zu ermöglichen, diese Daten durch Abfragen zu extrahieren; es setzt einen
  dreistufigen Test für berechtigte Interessen und warnt, dass rechtswidrige Verarbeitung in der
  Entwicklung die Rechtmäßigkeit der Bereitstellung beeinflussen kann [18].
  [Chapter 19](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference) geht weiter.
- **Gescrapte und Inhalte von Dritten.** Die kommerzielle Text- und Data-Mining-Ausnahme der EU gilt
  nur, wenn Rechteinhaber ihre Rechte "auf angemessene Weise, etwa durch maschinenlesbare Mittel"
  für öffentlich online verfügbare Inhalte nicht vorbehalten haben (DSM-Richtlinie Art. 4(3)) [19],
  und ein GPAI-Anbieter muss eine Urheberrechtspolitik führen, die solche Vorbehalte identifiziert
  und einhält (KI-Verordnung Art. 53(1)(c)) [20]. Dokumentieren Sie das Crawl-Datum, die Überprüfung
  des Vorbehalts und deren Ergebnis pro Quelle.
- **Lizenzen und Gewährleistungen.** Ob die Datensatzlizenz Training, kommerzielle Nutzung und
  Verteilung abgeleiteter Modelle erlaubt, und was der Lieferant über die rechtmäßige Erfassung
  gewährleistet. Die Lizenz geht in die [**AIBOM**](/patterns/aibom), sodass eine Lizenzänderung im
  nächsten Build sichtbar wird.

### ### Qualität, Menge, Repräsentativität und Eignung für den Zweck

Für Hochrisiko-Systeme macht Art. 10 Datenqualität zum Gesetz. Trainings-, Validierungs- und
Testdatensätze benötigen Governance-Praktiken, die unter anderem Erfassung und Herkunft,
Vorbereitung, Annahmen über das, was die Daten messen, Verfügbarkeit und Eignung, Bias-Untersuchung
und -Minderung sowie Datenlücken abdecken (Art. 10(2)); sie müssen "relevant, ausreichend
repräsentativ und soweit möglich frei von Fehlern und vollständig" sein (Art. 10(3)) und die
Nutzungsumgebung widerspiegeln (Art. 10(4)) [21]. Die ISO/IEC 5259-Serie liefert das Vokabular, die
Maßnahmen sowie die Prozess- und Governance-Frameworks [22].

| Dimension | Frage | Test, der es nachweist |
|---|---|---|
| Beschriftungsgenauigkeit | Sind die Beschriftungen korrekt? | Audit einer beschrifteten Stichprobe; Übereinstimmung zwischen Annotatoren |
| Vollständigkeit | Fehlen Felder, Segmente oder Zeiträume? | Null-Raten pro Feld und pro Segment |
| Konsistenz | Wird die gleiche Tatsache auf die gleiche Weise erfasst? | Schema- und Constraint-Checks |
| Aktualität | Sind die Daten aktuell für die Betriebsumgebung? | Datumsbereich gegen die Nutzungsfall-Dokumentation |
| Menge | Gibt es genug Beispiele pro Klasse und pro Gruppe? | Zellenzahlen gegen das Minimum im Testplan |
| Repräsentativität | Entspricht die Population der Bereitstellungspopulation? | Verteilungsvergleich gegen eine Referenz |
| Eignung für den Zweck | Messen die Daten das, was der Nutzungsfall benötigt, oder einen Proxy? | Proxy-Analyse; Annahmeregister (Art. 10(2)(d)) |
| Integrität | Hat sie sich seit der Zulassung geändert? | Content-Hashes; signierte Snapshots |

Menge ist nicht Repräsentativität. Ein großer Datensatz aus der falschen Population ist genau
falsch, und mehr davon behebt den Bias nicht; es verengt nur das Konfidenzintervall um die falsche
Antwort. Der Tools-Katalog listet [Datenvalidierungstools](/resources/tools#cat-data-validation) als
illustrative Beispiele auf, nicht als Empfehlungen.

### ### Eigentümer, Verwalter und das Zulassungstor

Der **Dateneigentümer** ist verantwortlich für einen Datensatz: seine zulässigen Verwendungen, seine
Risikoakzeptanz und die Unterschrift auf seinem Zulassungsdatensatz. Der **Datenverwalter** betreibt
ihn: Qualitätschecks, Metadaten, Zugriff und Löschung. Die Trennung der beiden verhindert, dass die
Person, die die Datennutzung wünscht, die einzige Person ist, die entscheidet, dass dies möglich
ist. Wenn viele Teams Daten teilen, entscheidet ein kleines Datenüberprüfungsgremium über
umstrittene Zulassungen und legt die minimale Zulassungscheckliste fest; die Checkliste selbst
existiert als Code, sodass ein fehlendes Feld die Pipeline fehlschlagen lässt.

### ### Provenienz versus Lineage

Die beiden Wörter werden synonym verwendet und sollten es nicht sein. **Provenienz** ist, woher ein
Datensatz kam und unter welchen Bedingungen. W3C PROV definiert sie als "Informationen über
Entitäten, Aktivitäten und Personen, die an der Erstellung eines Datensatzes oder einer Sache
beteiligt sind, die zur Bewertung seiner Qualität, Zuverlässigkeit oder Vertrauenswürdigkeit
verwendet werden können", und sein Datenmodell (PROV-DM, eine W3C-Empfehlung seit 30. Apr 2013)
drückt sie als Entitäten, Aktivitäten und Agenten aus [23]. **Lineage** ist, wie die Daten sich
durch Pipelines bewegten und änderten. OpenLineage bietet einen offenen Standard für die Ausgabe von
Lineage-Ereignissen über Datensätze, Jobs und Läufe mit erweiterbaren Facetten [24]. Lineage
funktioniert in beide Richtungen: Rückwärts-Lineage beantwortet "was speiste dieses Modell?",
Vorwärts-Lineage beantwortet "welche Modelle verwendeten diesen Datensatz?", und die zweite Frage
ist die, die eine Löschanfrage oder ein Lizenzentzug stellt.

Wählen Sie Granularität danach, wo Rechte angehören. Datensatz-Ebenen-Provenienz ist der Standard.
Datensatz-Ebenen-Provenienz ist erforderlich, wenn Rechte an Datensätzen angehören (personenbezogene
Daten, pro-Quellen-Lizenzen, Opt-outs). Feature-Ebenen-Lineage ist erforderlich für sensible
abgeleitete Features, die als Proxies fungieren können. Das menschenlesbare Pendant ist ein
Datenblatt: Gebru und Kollegen schlugen vor, dass jeder Datensatz eines trägt, das seine Motivation,
Zusammensetzung, Erfassung, Vorverarbeitung, Verwendungen, Verteilung und Wartung abdeckt [25]. Der
Tools-Katalog listet [Versionierungs- und Lineage-Tools](/resources/tools#cat-versioning) als
illustrative Beispiele auf, nicht als Empfehlungen.

### ### Synthetische Daten, Augmentation und datenschutzerhaltende Technologien

Synthetische Daten erben die Eigenschaften ihres Generators: seine Biases, seine Lücken und, wo der
Generator memoriert hat, seine Quelldatensätze. Behandeln Sie einen synthetischen Satz als einen
Datensatz mit seinem eigenen Zulassungsdatensatz, der den Generator, die Seed-Daten und die
Datenschutzmethode benennt. Differenzielle Privatsphäre ist die datenschutzerhaltende Technologie
mit einer messbaren Garantie, und NIST SP 800-226 (März 2025) erklärt, wie man einen Anspruch auf
differentielle Privatsphäre bewertet und die "Datenschutzhazards", die entstehen, wenn die
Mathematik auf eine Implementierung trifft [26]. Augmentation und Resampling ändern die
Klassenbalance und, angewendet vor der Train- und Test-Aufteilung, lecken Informationen in den
Testsatz und blasen Scores auf.

Synthetische Daten sind auch ein Offenlegungselement. Kaliforniens AB 2013, gültig seit 1. Jan 2026,
verlangt von Entwicklern generativer KI-Systeme, die Kaliforniern zur Verfügung gestellt werden,
dass sie Dokumentation zu Trainingsdaten veröffentlichen, die unter anderem angeben, ob synthetische
Datengenerierung verwendet wurde [27]; die EU-Vorlage für die GPAI-Trainingsinhalts-Zusammenfassung
listet synthetische Daten unter den zu beschreibenden Datenquellen auf [28].

> **Beispiel (illustrativ)** Ein Datensatz-Zulassungsdatensatz. Der Trainingsjob überprüft
> `admitted` und `permitted_uses` gegen die Nutzungsfall-ID, bevor er ein Byte liest.

```json
{
  "dataset_id": "ds-claims-2019-2025@v4",
  "owner": "head-of-claims-data",
  "steward": "data-platform-claims",
  "sources": [{ "name": "claims-core", "period": "2019-01/2025-12",
                "basis": "GDPR Art. 6(1)(f); compatibility assessment CA-2026-014", "licence": "internal" }],
  "tdm_reservation_check": "not applicable (internal data)",
  "special_category": { "present": false },
  "provenance": "prov:wasDerivedFrom claims-core@2026-01-15",
  "lineage_run": "openlineage:claims-features/run-8812",
  "quality": { "null_rate_max": 0.02, "label_agreement": 0.91, "min_n_per_group": 400 },
  "permitted_uses": ["uc-fraud-triage-03"],
  "retention_until": "2032-12-31",
  "admitted": true,
  "admitted_by": "head-of-claims-data",
  "timestamp": "2026-09-20T10:12:00Z"
}
```

## ## Testen und Validierung

### ### Ein Testplan vor dem ersten Lauf

Die EU-KI-Verordnung verlangt, dass Hochrisiko-Systeme "während des gesamten Entwicklungsprozesses
und in jedem Fall vor ihrer Markteinführung" gegen "vorher definierte Metriken und probabilistische
Schwellwerte, die für den vorgesehenen Zweck angemessen sind" getestet werden (Art. 9(8)) [13]. Das
NIST AI RMF verlangt, dass Testdatensätze, Metriken und Tools dokumentiert sind (MEASURE 2.1) und
dass das System gültig und zuverlässig ist, mit dokumentierten Grenzen der Verallgemeinerung
(MEASURE 2.5) [3]. Die maßgeblichen Wörter sind *vorher definiert*. Frieren Sie den Testplan im
Repository ein, bevor die Bewertung beginnt: Metriken, Schwellwerte mit ihrem Link zum
Fehlerappetit, Datensätze, Untergruppen, Stichprobengrößen und die Anzahl der wiederholten Läufe.
Eine Änderung des Plans nach bekannten Ergebnissen ist ein Diff mit einem Genehmiger. Diese eine
Regel verhindert Metric Shopping, die Gewohnheit, die Metrik zu wählen, die nach dem Sehen aller
bestanden hat.

### ### Die Test-Typ-Matrix

ISO/IEC TR 29119-11 gibt Richtlinien für das Testen KI-basierter Systeme [29], und die ISO/IEC
24029-Serie behandelt die Bewertung der Robustheit neuronaler Netze [30]. Die Matrix unten ist die
Arbeitsversion: eine Zeile pro Testtyp, eine Spalte pro Systemfamilie, und die Evidenz, die jeder
Lauf hinterlässt. Tail-Latenz (das 95. oder 99. Perzentil) gehört hinein, weil ein Mittelwert die
langsamen Anfragen verbirgt, denen Benutzer und Timeouts tatsächlich begegnen.

| Testtyp | Klassisches ML | LLM- oder Agent-System | Nachweisdatensatz |
|---|---|---|---|
| Unit | Feature-Transformationen, Datenvalidatoren, Modell-Wrapper-Input- und Output-Verträge | Prompt-Vorlagen, Tool-Schemas, Output-Parser | CI-Testlauf |
| Integration | Pipeline end-to-end auf einem Fixture-Datensatz | Orchestrierung, Abruf und Tool-Aufrufe gegen Sandboxes | Integrationsbericht |
| Validierung | Holdout, k-fold Cross-Validation, externe Validierung an einem anderen Ort oder Zeitraum | Gehaltene Task-Suites, Golden Sets, von Menschen bewertete Stichproben | Eval-Ergebnis mit Intervall |
| Leistung | Durchsatz, p95 und p99 Latenz, Speicher | Zeit bis zum ersten Token, p99 Latenz, Token und Kosten pro Task | Last-Test-Bericht |
| Robustheit und Out-of-Distribution | Rauschen, Perturbation, Covariate Shift, Out-of-Distribution-Sätze | Umformulierung, Tippfehler, Sprach- und Format-Shift, langer Kontext | Robustheit-Eval |
| Stress und Edge Cases | Extreme Werte, seltene Klassen, fehlende Eingaben | Übergroße Eingaben, Tool-Fehler, Timeouts, Schleifen | Stress-Bericht |
| Sicherheit und adversarial | Evasion, Poisoning, Model Extraction, Membership Inference | Prompt-Injection, Jailbreak, Tool-Missbrauch, Datenexfiltration | Red-Team-Erkenntnisse |
| Bias und Fairness | Fehler- und Selektionsraten nach Gruppe | Qualitäts- und Ablehnungsraten nach Gruppe, Sprache und Dialekt | Subgruppen-Eval |
| Interpretierbarkeit | Globale Feature-Wichtigkeit, lokale Erklärungen, Reason-Code-Stabilität | Zitattreue, Rationale-Konsistenz | Erklärung-Eval |
| Szenario | End-to-End-Fälle aus der Nutzungsfall-Dokumentation und dem Missbrauch-Register | Multi-Step-Tasks und Agent-Trajektorien | Szenario-Bericht |
| Mensch-in-der-Schleife | Reviewer-Genauigkeit mit und ohne das Modell; Override-Rate | Genehmigungsqualität unter Last; Automation-Bias-Sonden | Aufsichtstest |
| Regression | Score-Deltas gegen die letzte Version | Score-Deltas gegen die letzte Modell- oder Prompt-Version | Eval Gate Urteil |

Jede Zeile ist eine Suite hinter dem [**Eval Gate in CI**](/patterns/eval-gate-in-ci); die
Sicherheitszeile ist die [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite).
Fairness-Metriken sind in [Kapitel 16](/bok/fairness-and-explainability#group-fairness-metrics)
definiert, das auch
[Bias- und Interpretierbarkeits-Tests](/bok/fairness-and-explainability#testing-explanation-quality)
der Erklärungen selbst abdeckt.

### ### Statistische Validität von Evals

Ein Eval Gate ist nur so gut wie die Statistik unter seinem Schwellwert, und die meisten Gates haben
keine ([die Grenzen des Eval Gate](/bok/definition#the-limits-of-the-eval-gate) legen die anderen
Grenzen fest). Millers Behandlung von Language-Model-Evaluationen rahmt Eval-Fragen als eine
Stichprobe aus einer unsichtbaren Super-Population und gibt die Formeln für Standardfehler, zum
Vergleich zweier Modelle und zur Planung von Stichprobengrößen [31]. Vier Konsequenzen für das Gate
folgen.

- **Berichten Sie ein Intervall, nicht einen Punkt.** Eine Erfolgsquote von 0,96 auf 200 Fällen hat
  einen Standardfehler von √(0,96 × 0,04 / 200) ≈ 0,014, sodass sein 95%-Intervall etwa 0,933 bis
  0,987 (±1,96 Standardfehler) beträgt. Ein Schwellwert von 0,95 liegt darin, und das Gate kann
  einen Erfolg nicht von einem Fehler unterscheiden. Bei 2.000 Fällen verengt sich das Intervall auf
  etwa 0,951 bis 0,969. Dimensionieren Sie die Suite vom Schwellwert aus, nicht von der verfügbaren
  Zeit.
- **Null Ausfälle bedeuten nicht null Risiko.** Wenn keiner von *n* unabhängigen Fällen ausfällt,
  erfüllt die Ausfallrate, die dieses Ergebnis 5% der Zeit erzeugen würde, (1 − p)^n = 0,05, also p
  ≈ −ln(0,05)/n ≈ 3/n. Dreihundert fehlerfreie Fälle begrenzen die Ausfallrate mit 95% Konfidenz auf
  etwa 1%.
- **Wiederholen Sie nicht-deterministische Durchläufe.** Sampling-Temperatur, Batching und
  Tool-Latenz machen einen Durchlauf zu einer Stichprobe von eins. Führen Sie jede Suite mehrmals
  aus, berichten Sie Mittelwert und Streuung, fixieren Sie Seeds und Versionen, wo der Stack es
  erlaubt, und vergleichen Sie Modelle an denselben Fragen (ein gepaarter Entwurf), um Rauschen zu
  reduzieren [31].
- **Misstrauen Sie dem Richter und der Benchmark.** LLM-Richter zeigen Positions-, Ausführlichkeits-
  und Selbstverbesserungsverzerrungen, auch wenn starke Richter über 80% Übereinstimmung mit
  menschlichen Vorlieben erreichen [32]. Kalibrieren Sie einen Richter gegen eine menschlich
  beschriftete Stichprobe, randomisieren Sie die Antwortfolge, bevorzugen Sie einen Richter aus
  einer anderen Modellfamilie als das getestete Modell, und versionieren Sie die
  Richter-Eingabeaufforderung mit der Suite. Testitems aus dem Training erhöhen die Ergebnisse;
  Kontamination kann auch bei Black-Box-Modellen nachgewiesen werden [33]. Halten Sie private
  Holdout-Sets, rotieren Sie Items und dokumentieren Sie, wann jedes Item gegen den Datenstichtag
  des Modells geschrieben wurde.

### Unabhängige Validierung und Modellrisikomanagement

Das Bankwesen führt seit Jahren unabhängige Modellvalidierung durch, und KI-Governance-Engineering
entleiht seine beste Idee: **wirksame Herausforderung**. In den USA wurde SR 11-7 (2011) am 17. Apr
2026 durch SR 26-2 ersetzt, gemeinsame Leitlinien der Federal Reserve, der OCC und der FDIC. Sie
behält wirksame Herausforderung als kritische Analyse durch objektive Experten mit der Expertise,
"ausreichender Unabhängigkeit zur Wahrung der Objektivität" und dem Einfluss zur Herbeiführung von
Änderungen bei, und sie behält die drei Komponenten der Validierung: konzeptionelle Solidität,
laufende Überwachung und Ergebnisanalyse [7]. Sie zieht auch eine Linie, die der Ingenieur beachten
muss: generative und agentische KI-Modelle "fallen nicht in den Geltungsbereich dieser Leitlinien",
während ihre Prinzipien für traditionelle Modelle und "nicht-generative, nicht-agentische
KI-Modelle" gelten [7]. Im Vereinigten Königreich gilt die PRA-Richtlinie SS1/23 für Banken,
Bausparkassen und von der PRA benannte Investmentfirmen mit Genehmigung für interne Modelle, macht
unabhängige Modellvalidierung zu einem ihrer fünf Prinzipien und befasst sich mit KI- und
Machine-Learning-Techniken [34].

KI-Governance-Engineering entnimmt dieser Tradition die Unabhängigkeit des Validierungsprüfers, die
dokumentierte Herausforderung und die Staffelung nach Wesentlichkeit. Es fügt Validierung als
wiederausführbare Suite mit Nachweisaufzeichnungen statt eines PDF hinzu und bietet Abdeckung für
die generativen und agentischen Systeme, die SR 26-2 ausschließt. Der Validierungsprüfer arbeitet
aus einem separaten Repository mit Lesezugriff auf Modell und Daten, dokumentiert Erkenntnisse als
Issues mit Eigentümern und Fristen und unterzeichnet das Release-Gate für die hohen Stufen.

### Reproduzierbarkeit und verknüpfte Versionierung

Ein Ergebnis, das niemand reproduzieren kann, ist kein Nachweis. Der **Trainingsaufzeichnung**
erfasst den Code-Commit, die Hashes der zugelassenen Daten-Snapshots, die Konfiguration und
Hyperparameter, die Seeds, die Umgebung (Container-Digest, Bibliotheksversionen, Hardware), die
verwendete Rechenleistung, Beschriftungsqualität (Inter-Annotator-Übereinstimmung) und den
Eigentümer. Der Datensatz verlinkt in beide Richtungen: Modellversion zu Trainingsaufzeichnung zu
Eval-Ergebnissen zu Release-Tag zu den Risikogenehmigungen, die es zum Versand freigeben.

Das [Modellartefakt selbst benötigt Integrität](/patterns/model-artefact-integrity). Signieren Sie
es: das OpenSSF-Modell-Signatur-Tooling signiert eine Aussage, die jede Modelldatei und ihren Digest
auflistet, über Sigstore oder konventionelle Schlüssel, und die Verifizierung berechnet die Hashes
neu [35]. Weigern Sie sich, serialisierte Formate zu laden, die Code aus nicht vertrauenswürdigen
Quellen ausführen; die Python-Dokumentation ist deutlich, dass "das pickle-Modul nicht sicher ist"
[36]. Beide Überprüfungen gehören in den Build neben die [**AIBOM**](/patterns/aibom). Die
Werkzeugliste listet [Signatur- und Artefakt-Scan-Tools](/resources/tools#cat-signing) als
illustrative Beispiele, keine Empfehlungen.

### Was beim Training und Testen schiefgeht

| Problem | Wie es sich zeigt | Wie man es erkennt | Gate-Reaktion |
|---|---|---|---|
| Datenleck | Test-Score zu gut; bricht in der Produktion zusammen | Nach Entität und Zeit aufteilen; Merkmale auf Post-Outcome-Felder prüfen | Blockieren; neu aufteilen und neu trainieren |
| Überanpassung | Trainings-Score weit über Validierung | Lernkurven; Cross-Validierungs-Varianz | Blockieren; regularisieren oder Daten hinzufügen |
| Unteranpassung | Beide Scores niedrig, nahe der Baseline | Vergleich mit der Nicht-ML-Baseline | Blockieren; Design überdenken |
| Beschriftungsrauschen | Genauigkeitsobergrenze; inkonsistente Beschriftungen | Inter-Annotator-Übereinstimmung; neu beschriftete Stichprobe | Datensatz-Zulassungsgate erneut öffnen |
| Klassenunausgeglichenheit | Hohe Genauigkeit, schlechter Recall der Minderheit | Pro-Klasse-Metriken, nicht nur Genauigkeit | Neu samplen oder neu gewichten; neu testen |
| Schlechte Kalibrierung | Scores stimmen nicht mit beobachteten Raten überein | Zuverlässigkeitsdiagramm; Kalibrierungsfehler | Vor dem Setzen von Schwellwerten neu kalibrieren |
| Untergruppen-Abdeckungslücke | Breite Intervalle oder keine Daten für eine Gruppe | Zellzahlen gegen den Testplan | Blockieren für hohes Risiko; Daten sammeln |
| Umgebungsabweichung | Besteht offline, schlägt online fehl | Schattenausführung auf Live-Eingaben | Im Schatten halten |
| Testkontamination | Public-Benchmark-Score über Private-Set-Score | Private und öffentliche Lücke; Kontaminationstests | Kontaminierte Items löschen |
| Nicht reproduzierbares Ergebnis | Ein Neustart stimmt nicht überein | Neuläufe mit festem Seed | Blockieren bis reproduzierbar |
| Verwendung außerhalb des Zustimmungsumfangs | Datensatz außerhalb seiner zulässigen Verwendungen verwendet | Herkunft mit Zulassungsaufzeichnungen verknüpft | Blockieren; rechtliche Überprüfung |

Jede Erkenntnis wird zu einem Issue mit einem Eigentümer, einer Schweregrad und einer Frist. Eine
Erkenntnis, die unbehoben versendet wird, ist ein akzeptiertes Risiko mit einem benannten
Akzeptanten, aufgezeichnet im Risikoregister, das
[Kapitel 13](/bok/risk-management#the-risk-register-as-an-evidence-record) beschreibt, und wird zu
einem Regressiontest, damit es nicht stillschweigend zurückkehren kann.

> **In der Praxis (illustrativ)**
> Ein LLM-Zusammenfasser bestand sein Release-Gate bei 0,96 gegen eine Untergrenze von 0,95, auf 150
> handverlesenen Fällen. Ein Reviewer fragte nach dem Intervall: bei dieser Stichprobengröße lief es
> von etwa 0,93 bis 0,99, also konnte das Gate einen Bestanden nicht von einem Durchfall
> unterscheiden. Das Team wechselte zu einem eingefrorenen Plan von 1.500 Fällen, stratifiziert nach
> Dokumenttyp und Sprache, drei wiederholte Durchläufe zur Erfassung der Sampling-Varianz und einen
> Richter aus einer anderen Modellfamilie, kalibriert gegen 200 menschliche Bewertungen. Das Gate
> wurde langsamer, und seine Urteile begannen, etwas zu bedeuten.

## Release-Bereitschaft und Konformität

### Das Go/No-Go-Gate

Release ist ein Governance-Meilenstein, keine Engineering-Übergabe. Das Release-Gate liest die
Aufzeichnungen, die die früheren Gates erzeugt haben, und weigert sich zu öffnen, während eine fehlt
oder veraltet ist: ein aktueller Use-Case-Datensatz; ein signierter Design-Datensatz; zugelassene
Datensätze; ein Testbericht gegen den eingefrorenen Plan; offene Issues unter der vereinbarten
Schweregrad oder akzeptiert von einem benannten Akzeptanten; abgeschlossene Auswirkungsbewertungen;
regenerierte Karten und Gebrauchsanweisungen; Überwachung konfiguriert (siehe
[Kapitel 15](/bok/governing-deployment#operating-the-system)); ein getesteter Rollback; geschulte
Operatoren. Die Reviewer sind im Voraus benannt: Produkteigentümer, Engineering, der
KI-Governance-Engineer, Sicherheit, Datenschutz und für die hohen Stufen, Recht und der unabhängige
Validierungsprüfer. Die Ausgabe ist ein signierter Go/No-Go-Datensatz mit seinen Bedingungen,
eingereicht gegen den Registry-Eintrag. Der Betreiber führt seine eigene
[Go-Live-Überprüfung](/bok/governing-deployment#the-go-live-review) darauf durch (Kapitel 15).
[Release in Stufen](/patterns/staged-rollout-rollback-criteria), jede mit Ausstiegskriterien aus dem
Testplan: **Schatten** (das System läuft auf Live-Eingaben und seine Ausgaben werden protokolliert,
nicht verwendet), **Kanarienvogel** (ein kleiner Anteil des Verkehrs), ein
**begrenzter Pilotversuch**, dann allgemeine Verfügbarkeit. In der EU sitzen Forschung, Tests und
Entwicklung vor dem Inverkehrbringen außerhalb des KI-Gesetzes, außer Tests unter Realbedingungen
[37]; diese Tests werden durch Art. 60 geregelt, der nach dem Omnibus Annex-III-Systeme und
Annex-I-Abschnitt-A-Produkte abdeckt, mit einem neuen Art. 60a, der Mitgliedstaaten erlaubt, es für
Abschnitt-B-Produkte zu genehmigen [17].

### EU-KI-Verordnung Konformität, der Reihe nach

Für Hochrisiko-Systeme trägt das Release-Gate eine rechtliche Abfolge. Nach dem Digital Omnibus
gelten die Hochrisiko-Pflichten für Annex-III-Systeme ab 2. Dez 2027 und für Annex-I-Produkte ab 2.
Aug 2028 [38].

| Schritt | Artikel | Artefakt | Produziert von |
|---|---|---|---|
| 1. Qualitätsmanagementsystem vorhanden | `Art. 17` | QMS-Verfahren, versioniert | Anbieter |
| 2. Technische Dokumentation erstellt | `Art. 11`, Anlage IV | Die technische Datei | Pipeline und benannte Autoren |
| 3. Konformitätsbewertung | `Art. 43`, Anlage VI oder VII | Interner-Kontroll-Datensatz oder notifiziertes-Stellen-Zertifikat | Anbieter oder notifizierte Stelle |
| 4. EU-Konformitätserklärung | `Art. 47`, Anlage V | Unterzeichnete Erklärung | Anbieter |
| 5. CE-Kennzeichnung | `Art. 48` | Physische oder digitale CE-Kennzeichnung, mit der Nummer der notifizierten Stelle, falls eine beteiligt war | Anbieter |
| 6. Registrierung | `Art. 49`, `Art. 71` | EU-Datenbankeintrag | Anbieter |
| 7. Inverkehrbringen und Überwachung | `Art. 72` | Post-Market-Monitoring-Plan in Betrieb | Anbieter |

**Anlage VI oder Anlage VII.** Annex-III-Punkte 2 bis 8 folgen der internen Kontrolle unter Anlage
VI, ohne notifizierte Stelle [39]. Unter Anlage VI überprüft der Anbieter, dass sein
Qualitätsmanagementsystem Art. 17 erfüllt, prüft die technische Dokumentation gegen die
Anforderungen und überprüft, dass der Design- und Entwicklungsprozess und die
Post-Market-Überwachung mit dieser Dokumentation konsistent sind [39]. Annex-III-Punkt 1 (Biometrie)
darf Anlage VI oder Anlage VII nur verwenden, wenn der Anbieter harmonisierte Normen oder gemeinsame
Spezifikationen angewendet hat; andernfalls muss er Anlage VII befolgen, in der eine notifizierte
Stelle das Qualitätsmanagementsystem und die technische Dokumentation bewertet, mit vollständigem
Zugriff auf die Trainings-, Validierungs- und Testdatensätze, ein Zertifikat ausstellt und über
Änderungen informiert werden muss [39]. Keine harmonisierte Norm war zum letzten Zeitpunkt, den
dieses Buch aufzeichnet, im Amtsblatt zitiert worden (2026-09-19; siehe
[was noch nicht harmonisiert ist](/bok/regulatory-map#what-is-not-harmonised-yet)) [40]; solange das
der Fall ist, sollte ein Biometrie-Anbieter, der heute plant, für eine notifizierte Stelle planen.
Annex-I-Produkte durchlaufen ihr sektorales Konformitätsverfahren, und der Omnibus erlaubt Stellen,
die unter dieser Gesetzgebung notifiziert sind, die KI-Anforderungen zu bewerten, wenn sie sich
bis 28. Jan 2028 zur Benennung anmelden [17].

**Erklärung, Kennzeichnung und Registrierung.** Die EU-Konformitätserklärung folgt Anlage V und wird
10 Jahre lang aufbewahrt; die CE-Kennzeichnung wird sichtbar, lesbar und dauerhaft angebracht oder
digital für digital bereitgestellte Systeme [41]. Vor dem Inverkehrbringen registriert der Anbieter
Systeme gemäß Anlage III in der EU-Datenbank, außer Punkt 2 (kritische Infrastruktur), die auf
nationaler Ebene registriert wird; Systeme, die der Anbieter gemäß Art. 6(3) nicht als Hochrisiko
eingestuft hat, werden ebenfalls registriert; und Systeme für Strafverfolgung, Migration, Asyl und
Grenzen gehen in einen nicht öffentlichen Bereich [42]. Nach dem Digital-Omnibus verlangt die
Registrierung nach Art. 6(3) weniger Daten, und KMU und kleine mittlere Unternehmen dürfen die
technische Dokumentation in einer vereinfachten Form bereitstellen, die die Kommission festlegt
[17]. Der Engineering-Ansatz besteht darin, die Datenbanknutzlast aus dem Registereintrag zu
generieren, damit die Registrierung und das [**Agentenregister**](/patterns/agent-registry) nicht
auseinanderdriften.

### ### Wesentliche Veränderung

Eine **wesentliche Veränderung** ist eine Änderung nach dem Inverkehrbringen, "die nicht in der
ursprünglichen Konformitätsbewertung des Anbieters vorgesehen oder geplant ist und infolgedessen die
Einhaltung des KI-Systems mit den in Kapitel III Abschnitt 2 festgelegten Anforderungen
beeinträchtigt wird oder zu einer Änderung der Zweckbestimmung führt, für die das KI-System bewertet
wurde" [5]. Sie löst eine neue Konformitätsbewertung aus (Art. 43(4)); bei Systemen, die nach der
Freigabe weiterlernen, sind Änderungen, die der Anbieter bei der ursprünglichen Bewertung
vorbestimmt hat und in der technischen Dokumentation beschrieben sind, keine wesentlichen
Veränderungen [39], weshalb Anlage IV Punkt 2(f) diese vorbestimmten Änderungen und die technischen
Lösungen verlangt, die das System bei Änderungen konform halten [9].

Schreiben Sie die vorbestimmte Hülle als Code: zulässige Datenquellen, Retraining-Kadenz,
Metrik-Untergrenzwerte und Schwellenwertbereiche. Klassifizieren Sie dann jede Änderung an Modell,
Daten, Prompts, Tools oder Schwellenwerten beim Merge: innerhalb der Hülle (Gates erneut ausführen),
außerhalb, aber Compliance nicht beeinträchtigt (Gates erneut ausführen und Begründung aufzeichnen),
oder eine potenzielle wesentliche Veränderung (stoppen, rechtliche Überprüfung, Neubewertung). Ein
umgeschultes Modell ist eine neue Version. Es durchläuft die gleichen Gates, erhält eine neue
Versionsnummer in der Registry und regeneriert seine Karten; es erbt nicht die Verdikt seiner
Vorgänger. Für Agenten setzt Kapitel 23
[Prompt- und System-Prompt-Änderungen unter Änderungskontrolle](/bok/governing-agents#prompts-as-configuration-under-change-control).

## Die technische Datei

### ### Anlage IV, Element für Element

Art. 11 verlangt, dass die technische Dokumentation eines Hochrisiko-Systems vor dem
Inverkehrbringen erstellt und aktuell gehalten wird, mit mindestens dem Inhalt von Anlage IV [9].
Der größte Teil von Anlage IV wird bereits von einer gesteuerten Pipeline erzeugt; der Rest ist
Urteilsvermögen, das nur eine Person liefern kann. Die Tabelle teilt es auf.

| Anlage-IV-Punkt | Was es verlangt | Pipeline-Quelle | Was eine Person noch schreiben muss |
|---|---|---|---|
| 1(a) | Zweckbestimmung, Anbieter, Version | Use-Case-Datensatz; Registry-Eintrag | Die Zweckbestimmungserklärung selbst |
| 1(b) | Interaktion mit anderer Hardware, Software und KI-Systemen | AIBOM; Architekturdiagramm | Integrationsvorgaben |
| 1(c) | Software- und Firmware-Versionen; Aktualisierungsanforderungen | AIBOM; Lockfiles | Keine über die Überprüfung hinaus |
| 1(d) | Formen, in denen es in den Verkehr gebracht wird | Release-Manifest | Verteilungsbeschreibung |
| 1(e) | Hardware, auf der es läuft | Deployment-Manifeste | Keine über die Überprüfung hinaus |
| 1(f) | Fotografien, wenn es sich um eine Produktkomponente handelt | Nicht auf die meiste Software anwendbar | Produktdokumentation |
| 1(g) | Die dem Betreiber gegebene Benutzeroberfläche | UI-Aufnahmen aus Integrationstests | Beschreibung der Verwendung |
| 1(h) | Betriebsanleitung | Generiert aus dem Use-Case-Datensatz, der Model Card und dem Missbrauchsregister | Einschränkungen und Aufsichtsleitfaden in verständlicher Sprache |
| 2(a) | Entwicklungsmethoden, vortrainierte Systeme, Tools von Drittanbietern | Trainingsprotokoll; AIBOM | Warum diese gewählt wurden |
| 2(b) | Designspezifikationen, Schlüsselentscheidungen, Begründung, Kompromisse | Design-Datensatz; Entscheidungsprotokoll | Die Begründung und Annahmen |
| 2(c) | Architektur und Rechenressourcen | Trainingsprotokoll (Compute); Architekturdiagramm | Keine über die Überprüfung hinaus |
| 2(d) | Datasheets: Trainingsdaten, Herkunft, Auswahl, Kennzeichnung, Bereinigung | Zulassungsunterlagen; Datasheets; Lineage | Die Annahmen darüber, was die Daten messen |
| 2(e) | Bewertung der Maßnahmen zur menschlichen Aufsicht | Aufsichtsdesign; Testergebnisse mit menschlicher Beteiligung | Die Bewertung |
| 2(f) | Vorbestimmte Änderungen und wie Compliance gewährleistet wird | Hülle-als-Code | Die Begründung der Hülle |
| 2(g) | Validierung und Tests: Daten, Metriken, diskriminierende Auswirkungen, datierte und unterzeichnete Testberichte | Testplan; Eval-Ergebnisse; Testberichte | Unterschriften der verantwortlichen Personen |
| 2(h) | Cybersecurity-Maßnahmen | Sicherheitstestergebnisse; [Threat Model](/patterns/ai-threat-model); [Signaturunterlagen](/patterns/model-artefact-integrity) | Verbleibendes Sicherheitsrisiko |
| 3 | Fähigkeiten, Einschränkungen, Genauigkeit für bestimmte Gruppen, vorhersehbare unbeabsichtigte Ergebnisse | Model Card; Subgruppen-Evals; Missbrauchsregister | Interpretation der Grenzen |
| 4 | Warum die Leistungsmetriken angemessen sind | Testplan | Das Argument |
| 5 | Das Risikomanagementsystem | Risikoregister | Beurteilung des verbleibenden Risikos |
| 6 | Relevante Änderungen über den Lebenszyklus | Versionskontrolle; Registry-Verlauf | Keine über die Überprüfung hinaus |
| 7 | Angewandte harmonisierte Normen oder andere verwendete Lösungen | Crosswalk-Datei | Lösungsbeschreibung (keine zum letzten Überprüfungszeitpunkt im Amtsblatt zitierte Norm) |
| 8 | Eine Kopie der EU-Konformitätserklärung | Generiert aus den Nachweisen | Unterschrift |
| 9 | Das System zur Beobachtung nach dem Inverkehrbringen mit seinem Plan | Überwachungskonfiguration | Die Auslöser und Reaktionen des Plans |

Der Plan zur Beobachtung nach dem Inverkehrbringen ist Teil dieser Datei, nicht ein separates
Dokument (Art. 72(3)) [43]. Erstellen Sie die Datei wie Code: Ein Dokumentationsjob setzt sie bei
jedem Release-Kandidaten zusammen, schlägt fehl, wenn eine generierte Zeile veraltet ist oder eine
geschriebene Zeile älter als die Modellversion ist, die sie beschreibt, und gibt das Ergebnis als
[**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal) neben einer für
Menschen lesbaren Darstellung aus.

### ### Model Cards, System Cards und Datasheets

Die Dokumente überlappen sich und beantworten unterschiedliche Fragen für unterschiedliche Leser.

| Dokument | Beschreibt | Hauptleser | Gefüllt aus |
|---|---|---|---|
| Model Card | Ein trainiertes Modell: beabsichtigte Verwendung, Bewertung über Gruppen und Bedingungen, Einschränkungen [44] | Integratoren, Betreiber, Prüfer | Eval-Ergebnisse; AIBOM |
| System Card | Das bereitgestellte System: Modelle, Prompts, Abruf, Tools, Guardrails und Aufsicht | Betreiber, Behörden, die Öffentlichkeit | Registry; Guardrail-Konfiguration; Red-Team-Ergebnisse |
| Datasheet (Data Card) | Ein Datensatz: Motivation, Zusammensetzung, Erfassung, Vorverarbeitung, Verwendungen, Verteilung, Wartung [25] | Dateneigentümer, Modellbauer, Prüfer | Zulassungsunterlagen; Lineage |
| Betriebsanleitung | Was ein Betreiber benötigt, um ein Hochrisiko-System korrekt zu verwenden (Art. 13) [14] | Betreiber | Use-Case-Datensatz; Model Card; Missbrauchsregister |
| Technische Datei | Alles oben Genannte plus Risikomanagement, Normen, Erklärung und Überwachungsplan [9] | Behörden; notifizierte Stellen | Alles oben Genannte |

Das meiste Risiko sitzt im System, nicht im rohen Modell
([Kapitel 01](/bok/definition#the-object-of-governance)), daher unter-beschreibt eine Model Card
allein alles mit Tools oder Abruf. Generieren Sie jede Card aus den gleichen Datensätzen, wie im
Muster [**Model Card as Control Evidence**](/patterns/model-card-as-control-evidence), damit die
Card, die ein Prüfer liest, die Card ist, die die Produktion erzeugt hat.

### ### Die GPAI-Anbieterseite

Ein Anbieter eines KI-Modells mit allgemeinem Verwendungszweck hat seinen eigenen Dokumentationssatz
gemäß Art. 53: technische Dokumentation gemäß Anlage XI für das Büro für Künstliche Intelligenz und
nationale Behörden, Informationen gemäß Anlage XII für nachgelagerte Anbieter, eine
Urheberrechtspolitik und eine öffentliche Zusammenfassung des Trainingsinhalts nach der Vorlage des
Büros für Künstliche Intelligenz [20]. Anlage XI behandelt Architektur und Parameteranzahl,
Trainingsmethodik, die Trainingsdaten (Typ, Herkunft, Kuration, Methoden zur Erkennung ungeeigneter
Quellen und Verzerrungen), die Rechenleistung und den bekannten oder geschätzten Energieverbrauch;
für Modelle mit systemischem Risiko fügt sie Bewertungsstrategien, adversariales Testen und
Systemarchitektur hinzu [12].

Wer ein GPAI-Anbieter ist, ist teilweise eine Compute-Frage. Das indikative Kriterium der Kommission
ist Trainings-Compute über 10^23 FLOP mit der Fähigkeit, Sprache, Text-zu-Bild oder Text-zu-Video zu
generieren; ein nachgelagerter Modifizierer ist indikativ der Anbieter des modifizierten Modells,
wenn sein Modifikations-Compute ein Drittel des ursprünglichen übersteigt; und die Vermutung des
systemischen Risikos beginnt bei 10^25 FLOP, mit Benachrichtigung der Kommission innerhalb von zwei
Wochen [11]. Setzen Sie diese Schwellenwerte in den Designüberprüfungs-Datensatz zur Modellauswahl,
da ein Fine-Tuning-Plan die rechtliche Rolle der Organisation ändern kann.

Drei Kommissionsinstrumente verwandeln die Pflichten in Artefakte. Der GPAI Code of Practice (10.
Juli 2025, freiwillig) enthält in seinem Kapitel zur Transparenz ein Model Documentation Form [45],
das die Informationen aus Anlage XI und XII an einem Ort sammelt und jedes Element für nachgelagerte
Anbieter, das Büro für Künstliche Intelligenz oder nationale Behörden kennzeichnet; der Code
verlangt, dass die Dokumentation jeder Version 10 Jahre lang aufbewahrt wird [46]. Die
Zusammenfassung des Trainingsinhalts verwendet eine Vorlage, die gemäß Art. 53(1)(d) verbindlich
ist: Sie behandelt allgemeine Informationen, Datenquellen (einschließlich öffentlicher, privater,
gecrawlter, Nutzer- und synthetischer Daten) und Datenverarbeitung, listet die Top 10% der
gecrawlten Domains auf (5% oder 1.000, je nachdem, welcher Wert niedriger ist, für KMU), wird alle
sechs Monate oder früher nach einer wesentlichen Aktualisierung aktualisiert und muss bis 2. August
2027 für Modelle existieren, die vor 2. August 2025 in den Verkehr gebracht wurden [28]. Für Modelle
mit systemischem Risiko fügt das Kapitel Sicherheit und Sicherheit des Code einen Safety and
Security Model Report hinzu, der vor dem Inverkehrbringen des Modells erstellt und aktuell gehalten
wird (Commitment 7) [46]. Engineering-Implikation: Das Model Documentation Form wird aus dem
Trainingsprotokoll und dem AIBOM generiert, und die Zusammenfassung des Trainingsinhalts,
einschließlich ihrer Domain-Liste, ist eine Abfrage über die Zulassungsunterlagen und die
Crawl-Protokolle, nicht eine Schreibübung.

### ### Entscheidungen zur Open-Weight-Freigabe

Die Freigabe ist ein Spektrum, keine Schaltfläche. Solaiman beschreibt sechs Zugriffsstufen:
vollständig geschlossen, schrittweise oder gestaffelte Zugriffe, gehosteter Zugriff, Cloud- oder
API-Zugriff, herunterladbarer Zugriff und vollständig offen [47]. Die gestaffelte Freigabe, wie sie
2019 für GPT-2 praktiziert wurde, lässt Zeit zwischen den Freigaben für Risiko- und Nutzenanalyse,
wenn die Fähigkeiten wachsen [48]. Bei offenen Gewichtungen ist die Entscheidung auf eine Weise
irreversibel, wie nichts anderes in diesem Kapitel: Ein freigegebenes Modell kann nicht
zurückgerufen, gepatcht oder hinter einen Kill Switch gestellt werden. Der Freigabedatensatz sollte
daher die Fähigkeit und Dual-Use-Evals, das Missbrauchsregister, die Antwort auf "Was würden wir
tun, wenn dies missbraucht wird, angesichts der Tatsache, dass wir es nicht zurückziehen können?",
und die Lizenzwahl enthalten. Die Definition der Open Source Initiative erfordert die Freiheiten zu
nutzen, zu studieren, zu ändern und zu teilen, und behandelt Dateninformationen, Code und Parameter
als die bevorzugte Form für Änderungen [49]; eine Lizenz, die Nutzungsfelder einschränkt, erfüllt
sie daher nicht.

Die rechtlichen Ausnahmen für Open Source sind enger als sie klingen.

- Das KI-Verordnung gilt nicht für KI-Systeme, die unter kostenlosen und quelloffenen Lizenzen
  freigegeben werden, es sei denn, sie werden als Hochrisiko-Systeme, als verbotene Praktiken oder
  als Art. 50-Systeme auf den Markt gebracht oder in Betrieb genommen (Art. 2(12)) [37].
- Ein GPAI-Modell unter einer kostenlosen und quelloffenen Lizenz mit öffentlichen Parametern ist
  nur von den Dokumentationspflichten der Anlage XI und Anlage XII befreit; die Urheberrechtspolitik
  und die Zusammenfassung der Trainingsinhalte gelten weiterhin, und es gibt keine Ausnahme für
  Modelle mit systemischem Risiko (Art. 53(2)) [20][11].
- Die Richtlinien der Kommission behandeln Monetarisierung als disqualifizierend: Doppellizenzierung
  (kostenlos für akademische Nutzung, bezahlt für kommerzielle Nutzung), bezahlter Support, der zur
  Nutzung des Modells erforderlich ist, und die Verarbeitung von Nutzerdaten für kommerziellen
  Gewinn werden als Beispiele genannt [50].

### Aufzeichnungspflichten

Für Hochrisiko-Systeme hält der Anbieter die technische Dokumentation, die Dokumentation des
Qualitätsmanagementsystems, von notifizierten Stellen genehmigte Änderungen, deren Entscheidungen
und die EU-Konformitätserklärung den nationalen Behörden 10 Jahre nach dem Inverkehrbringen zur
Verfügung (Art. 18), und führt die Protokolle, die das System automatisch erzeugt, soweit sie unter
seiner Kontrolle stehen, für einen Zeitraum, der dem beabsichtigten Zweck angemessen ist, mindestens
sechs Monate lang, sofern nicht anderes Recht etwas anderes vorsieht; Finanzinstitute führen sie in
ihrer Finanzdienstleistungsdokumentation (Art. 19) [51]. Betreiber tragen eine parallele
Protokollierungspflicht, die in [Kapitel 15](/bok/governing-deployment#records-retention) behandelt
wird.

Behandeln Sie die Aufbewahrung als Code: Jede Nachweisklasse trägt eine Aufbewahrungsregel, die an
ihre Verpflichtung gebunden ist, signierte Datensätze gehen in Write-Once-Speicher, ein rechtlicher
Haltbefehl setzt das Löschen außer Kraft, und die Sechsmonats-Protokolluntergrenze ist eine
Untergrenze, keine Standardeinstellung, abgestimmt mit der Speicherbegrenzung der DSGVO für
personenbezogene Daten in den Protokollen. Ein 10-Jahres-Horizont überlebt die meisten Tools, was
für offene Formate spricht (JSON, `OSCAL`).

### Öffentliche Offenlegungen

Verschiedene Zielgruppen sind verschiedene Offenlegungen schuldig, und jede hat etwas, das nicht
veröffentlicht werden darf.

| Zielgruppe | Was sie erhalten | Kanal | Was zu verheimlichen ist |
|---|---|---|---|
| Behörde oder notifizierte Stelle | Die vollständige technische Datei, Testprotokolle, Zugriff auf Datensätze unter Anlage VII | Auf Anfrage; Konformitätsbewertung | Nichts, das das Gesetz erfordert; Geschäftsgeheimnisse als vertraulich kennzeichnen |
| Betreiber | Betriebsanleitung (Art. 13); Model Cards und System Cards; Anlage XII-Informationen für GPAI | Vertrag; Dokumentationsportal | Ausnutzbares Sicherheitsdetail; Gewichtungen |
| Betroffene Personen | Dass KI verwendet wird, und wie man Einspruch erhebt oder Erklärung anfordert (siehe [Kapitel 15](/bok/governing-deployment#external-communications)) | Produktschnittstelle; Hinweise | Nichts über ihren eigenen Fall, das ihnen ein Recht gewährt |
| Die Öffentlichkeit | EU-Datenbankeintrag; GPAI-Zusammenfassung der Trainingsinhalte; AB 2013-Dokumentation; Zusammenfassungen von Bias-Audits; veröffentlichte Folgenabschätzungen | Website; öffentliche Register | Red-Team-Exploit-Detail; personenbezogene Daten; Sicherheitskonfiguration |

Zwei Offenlegungen außerhalb der EU zeigen das Muster. New York Citys Local Law 144 verlangt von
Arbeitgebern, die ein automatisiertes Beschäftigungsentscheidungstool verwenden, ein Bias-Audit
durch einen unabhängigen Auditor aus dem vergangenen Jahr durchzuführen, eine Zusammenfassung seiner
Ergebnisse zu veröffentlichen, einschließlich der Quelle der verwendeten Daten, und Kandidaten 10
Geschäftstage vor der Verwendung zu benachrichtigen [52]. Kanadas Richtlinie zur automatisierten
Entscheidungsfindung verlangt von Bundesinstitutionen, die endgültigen Ergebnisse ihrer
algorithmischen Folgenabschätzung auf dem Open Government Portal zu veröffentlichen, bevor das
System in Produktion geht [53].

> **In der Praxis (illustrativ)**
> Ein Anbieter, der ein Annex III-System für das am 2. Dezember 2027 aufgelistete Datum
> vorbereitete, listete die 23 Punkte der Anlage IV in einer Datei auf, eine Zeile für jeden, mit
> der Pipeline-Quelle und einem benannten Autor. Die meisten Zeilen stellten sich als aus
> Datensätzen zusammengesetzt heraus, die die Pipeline bereits ausgegeben hatte; der Rest waren
> Begründung, Restrisiko-Urteile und Unterschriften. Der Dokumentationsjob lief bei jedem
> Release-Kandidaten und schlug zweimal im ersten Monat fehl: einmal bei einer Model Card, die älter
> als das Modell war, einmal bei einem Testbericht, den niemand signiert hatte. Beide Fehler hätten
> sich ein Jahr später vor einer notifizierten Stelle offenbart.

## Folgenabschätzungen im Vergleich

Ein einzelnes System kann mehrere Folgenabschätzungen gleichzeitig auslösen. Sie überlappen sich bei
Fakten (wer ist betroffen, was könnte schiefgehen, welche Kontrollen existieren) und unterscheiden
sich in Recht, Auslöser, Prüfer und Zielgruppe. Die technische Antwort ist eine gemeinsame
Faktenbasis mit mehreren Ansichten, nicht fünf Dokumente, die auseinanderdriften.

| Bewertung | Durchgeführt von | Auslöser | Wann | Überprüft oder unterzeichnet von | Veröffentlicht | Neu bewertet, wenn |
|---|---|---|---|---|---|---|
| KI-System-Folgenabschätzung (ISO/IEC 42005) | Die Organisation, die das System entwickelt oder bereitstellt | Organisationspolitik; ISO/IEC 42001 A.5 | Während des gesamten Lebenszyklus, vom Design an [54] | Gemäß dem KI-Managementsystem der Organisation | Freiwillig | Während des Lebenszyklus nach Bedarf aktualisiert [54] |
| DSFA (DSGVO Art. 35) | Der Verantwortliche | Verarbeitung, die wahrscheinlich zu hohem Risiko führt; obligatorische Fälle in Art. 35(3) | Vor der Verarbeitung [16] | Verantwortlicher, mit Rat des Datenschutzbeauftragten; die Aufsichtsbehörde, wenn hohes Risiko bleibt (Art. 36) | Nicht erforderlich | Wenn sich das Risiko der Verarbeitung ändert (Art. 35(11)) [16] |
| Grundrechte-Folgenabschätzung (KI-Verordnung Art. 27) | Betreiber, die öffentliche Stellen sind oder öffentliche Dienste erbringen, und Betreiber von Annex III 5(b) und (c)-Systemen | Inbetriebnahme eines Annex III Hochrisiko-Systems (nicht Punkt 2) | Vor der ersten Verwendung [55] | Ergebnisse der Marktüberwachungsbehörde mitgeteilt | Nicht öffentlich erforderlich | Wenn sich ein bewertetes Element ändert [55] |
| Algorithmische Folgenabschätzung (Kanada) | Bundesinstitution | Automatisiertes Entscheidungssystem gemäß der Richtlinie | Vor der Produktion [53] | Intern genehmigt; Fachbewertung pro Auswirkungsstufe | Ja, Open Government Portal | Nach einem Zeitplan und wenn sich Funktionalität oder Umfang ändert [53] |
| Bias-Audit (NYC Local Law 144) | Unabhängiger Auditor, für den Arbeitgeber oder die Behörde | Verwendung eines automatisierten Beschäftigungsentscheidungstools in NYC | Innerhalb eines Jahres vor der Verwendung [52] | Unabhängiger Auditor | Ja, Zusammenfassung der Ergebnisse | Jedes Jahr {[52] |
| Unabhängige Modellvalidierung (SR 26-2, SS1/23) | Validierungsfunktion unabhängig von der Entwicklung | Modellverwendung in einer beaufsichtigten Bank | Allgemein vor der ersten Verwendung [7] | Validatoren mit Befugnis, Änderungen zu bewirken | Nein | Regelmäßig und bei wesentlicher Änderung [7] |

### Dimensionen, die Auswirkungen vergleichbar machen

Bewerten Sie jede Auswirkung auf denselben Achsen, unabhängig davon, welche Bewertung sie speist:
**Schweregrad** (wie schlecht für die betroffene Person), **Umfang** (wie viele Menschen),
**Reversibilität** (ob der Schaden rückgängig gemacht werden kann und wie schnell), **Dauer** und
**Wahrscheinlichkeit**. Die Dimensionen sind nicht hier erfunden. Kanadas Richtlinie definiert ihre
Auswirkungsstufen danach, von Stufe I, wo Auswirkungen wahrscheinlich "gering bis keine, leicht
reversibel und kurz" sind, bis Stufe IV, wo sie wahrscheinlich "sehr hoch, irreversibel und
dauerhaft" sind [53]. Die Grundrechte-Folgenabschätzung fragt nach den betroffenen Kategorien, den
spezifischen Schadensrisiken, den Überwachungsmaßnahmen und den Minderungs- und Beschwerderegelungen
(Art. 27(1)) [55]; die DSFA fragt nach der Verarbeitung, ihrer Notwendigkeit und
Verhältnismäßigkeit, den Risiken und den Maßnahmen (Art. 35(7)) [16]. Ein Datensatz mit diesen
Feldern beantwortet beide, und Art. 27(4) lässt eine Grundrechte-Folgenabschätzung auf einer DSFA
aufbauen, die denselben Boden abdeckt [55].

### Durchführung versus Überprüfung

Der Durchführende besitzt die Fakten; der Prüfer stellt sie in Frage. Ein Prüfer, der die Bewertung
nicht geschrieben hat, überprüft sechs Dinge: Der Umfang entspricht dem aktuellen
Use-Case-Datensatz; die betroffenen Gruppen umfassen Menschen, die das System nie nutzen; jede
Risikobewertung zitiert Belege (eine Eval-ID, einen Testbericht, ein Datenprofil), keine Meinung;
jede Minderung verlinkt auf eine Kontrolle, die läuft; Restrisiko wird von jemandem mit der
Befugnis, es zu akzeptieren, akzeptiert; und die Neubewertungsauslöser werden als Bedingungen
geschrieben, die eine Pipeline evaluieren kann. Eine Bewertung, die einen der sechs nicht erfüllt,
geht zurück, egal wie gut geschrieben sie ist.

### Neubewertungsauslöser

Kodieren Sie die Auslöser so, dass das Register, nicht eine Kalendererinnerung, die Bewertung erneut
öffnet: ein neuer oder erweiterter beabsichtigter Zweck; Umschulung auf eine neue Datenquelle; eine
neue betroffene Bevölkerung, Sprache oder Gerichtsbarkeit; eine Schwellenwertänderung; ein Vorfall
oder Beinahe-Unfall
([Kapitel 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite)); ein
Überwachungssignal außerhalb seines Bandes; neues Recht oder neue Richtlinien; und ein geplantes
Überprüfungsdatum. Das
[**Governance-as-Code**](/patterns/fria-as-code#re-assessment-triggers-as-code)-Muster macht dies
bereits für die Grundrechte-Folgenabschätzung und ihre DSFA-Querverweise; dieselbe Struktur
verallgemeinert sich, als Impact-Assessment-as-Code, auf jede Bewertung in der Tabelle.

> **In der Praxis (illustrativ)**
> Das Kreditlimit-Modell aus dem Use-Case-Beispiel stand gleichzeitig unter vier Bewertungen: eine
> DSFA (die Bank als Verantwortlicher), eine Grundrechte-Folgenabschätzung (die Bank als Betreiber
> eines Annex III 5(b)-Systems), eine Folgenabschätzung, die vom Modellteam nach ISO/IEC
> 42005-Linien durchgeführt wurde, und unabhängige Validierung. Das Team behielt eine Faktenbasis
> (betroffene Gruppen, Schäden, die auf den fünf Dimensionen bewertet wurden, Kontrollen mit ihren
> Eval-IDs) und renderte vier Ansichten daraus. Als Umschulung eine neue Datenquelle hinzufügte,
> löste die Herkunftsänderung den Auslöser für alle vier in demselben Pipeline-Lauf aus, und die
> Prüfer sahen einen Diff statt vier neuer Dokumente.

**Zuordnung:** KI-Verordnung Art. 3(12), 3(13) und 3(23), Art. 9, 10, 11 und Anlage IV, Art. 13, 17,
18, 19, 25, 27, 43 und Anlagen VI und VII, Art. 47 bis 49, Art. 53 und Anlagen XI und XII, Art. 72 ·
DSGVO Art. 35 · ISO/IEC 42001 (A.5, A.6, A.7), ISO/IEC 42005, ISO/IEC 5338, ISO/IEC 5259 · NIST AI
RMF (Map, Measure) · Schicht 01 Governance-as-Code bis Schicht 05 kontinuierliche Assurance.
Zuordnungen sind illustrativ, keine Konformitätsbehauptung.

## Was Sie diese Woche tun können

1. Schreiben Sie den Use-Case-Datensatz für das Hochrisiko-System in Ihrer Entwicklung auf,
   einschließlich seiner nicht im Geltungsbereich liegenden Verwendungen und seines Appetits auf
   falsch positive gegen falsch negative Ergebnisse, und speichern Sie ihn im Registereintrag.
1. Frieren Sie den Testplan für die nächste Version im Repository ein: Metriken, Schwellenwerte,
   Untergruppen, wiederholte Durchläufe und die Stichprobengröße, die jeder Schwellenwert benötigt,
   um von einem Fehler unterscheidbar zu sein.
1. Wählen Sie einen Trainingsdatensatz aus und füllen Sie seinen Zulassungsdatensatz aus (Grundlage
   oder Lizenz, Reservierungsprüfung, Herkunft, Eigentümer, Verwalter), und machen Sie dann, dass
   der Trainingsjob Datensätze ohne einen ablehnt.
1. Ordnen Sie Ihre aktuelle Dokumentation der obigen Tabelle in Anlage IV zu und markieren Sie jede
   Zeile als generiert, geschrieben oder fehlend.
1. Listen Sie jede Folgenabschätzung auf, die das System auslöst, und verschieben Sie ihre
   gemeinsamen Fakten in einen Datensatz, mit den Neubewertungsauslösern als Bedingungen
   geschrieben.

## Sources

[1] ISO/IEC 5338:2023, AI system life cycle processes. ISO/IEC. 2023. https://www.iso.org/standard/81118.html (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (Annex A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] AI Risk Management Framework 1.0 (NIST AI 100-1; MAP 1.1 intended purposes and context documented, MAP 1.5 risk tolerances, MAP 1.6 system requirements, MEASURE 2.1 test sets and metrics documented, MEASURE 2.5 validity and reliability). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system: design control and design verification; examination, test and validation procedures before, during and after development; data management). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[6] Rules of Machine Learning: Best Practices for ML Engineering (Rule #1: "Don't be afraid to launch a product without machine learning"). Google for Developers. n.d. (accessed 2026-09-24). https://developers.google.com/machine-learning/guides/rules-of-ml (verified: primary)
[7] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; generative and agentic AI models out of scope; effective challenge; conceptual soundness, ongoing monitoring, outcomes analysis; model use beyond intended purpose). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (responsibilities along the AI value chain; 25(1)(c) a third party that modifies the intended purpose of a system so that it becomes high-risk is considered its provider). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 11 and Annex IV (technical documentation: 1(a) to (h) general description incl. instructions for use; 2(a) to (h) development process, design choices and trade-offs, compute, datasheets and provenance, oversight, pre-determined changes, validation and testing with dated and signed reports, cybersecurity; 3 to 9 capabilities and limitations, metrics, risk management, changes, standards, declaration, post-market monitoring). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_IV (verified: primary)
[10] Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead (Cynthia Rudin). Nature Machine Intelligence. 2019. https://www.nature.com/articles/s42256-019-0048-x (verified: primary)
[11] General-Purpose AI Models in the AI Act: Questions & Answers (indicative GPAI criterion: training compute above 10^23 FLOP and generation of language, text-to-image or text-to-video; a downstream modifier is indicatively the provider when modification compute exceeds a third of the original's; 10^25 FLOP systemic-risk threshold; notification within two weeks; Art. 53(2) open-source conditions). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annexes XI and XII (GPAI technical documentation: architecture and parameters, training methodology, training data provenance and curation, compute, known or estimated energy consumption; Section 2 for systemic-risk models: evaluation strategies, adversarial testing, system architecture; Annex XII information for downstream providers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2)(b) risks under reasonably foreseeable misuse; 9(8) testing against prior defined metrics and probabilistic thresholds, before placing on the market). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and instructions for use; 13(3)(b)(iii) known or foreseeable circumstances, incl. reasonably foreseeable misuse, that may lead to risks). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[15] Ethics Guidelines for Trustworthy AI (High-Level Expert Group on AI; oversight through human-in-the-loop, human-on-the-loop and human-in-command approaches). European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[16] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing; Art. 35 data protection impact assessment (35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes); Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a replaces the deleted Art. 10(5) for special-category data in bias detection; simplified technical documentation for SMEs and small mid-caps under Art. 11(1); Annex VIII Section B points 7 and 9 deleted for Art. 6(3) registrations; Art. 43(3) sectoral notified bodies to apply for designation by 28 Jan 2028; Art. 60 scope (Annex III and Annex I Section A) and new Art. 60a (Annex I Section B)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[18] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[19] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI provider obligations: (a) Annex XI documentation, (b) Annex XII information for downstream providers, (c) copyright policy incl. reservations of rights, (d) public summary of training content on the AI Office template; 53(2) open-source exemption from (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[21] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance: 10(2) practices, 10(3) relevant, sufficiently representative, free of errors and complete, 10(4) specific setting of use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[22] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[23] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[24] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[25] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[26] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[27] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[28] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data; top 10% of scraped domains, for SMEs 5% or 1,000; six-monthly update). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[29] ISO/IEC TR 29119-11:2020, Software testing, Part 11: Guidelines on the testing of AI-based systems. ISO/IEC. 2020. https://www.iso.org/standard/79016.html (verified: primary)
[30] ISO/IEC TR 24029-1:2021 and ISO/IEC 24029-2:2023, Robustness of neural networks (Part 1 overview; Part 2 methodology for the use of formal methods). ISO/IEC. 2021–2023. https://www.iso.org/standard/79804.html (verified: primary)
[31] Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (Evan Miller; arXiv 2411.00640). arXiv. 2024-11-01. https://arxiv.org/abs/2411.00640 (verified: primary)
[32] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.; position, verbosity and self-enhancement biases; over 80% agreement with human preferences; arXiv 2306.05685). arXiv. 2023-06-09. https://arxiv.org/abs/2306.05685 (verified: primary)
[33] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[34] SS1/23, Model risk management principles for banks (five principles incl. independent model validation; UK-incorporated banks, building societies and PRA-designated investment firms with internal-model approval; addresses AI and machine-learning techniques; first published 17 May 2023, in effect from 17 May 2024; current version published and effective 23 Apr 2026 after low-impact amendments). Bank of England, Prudential Regulation Authority. 2026-04-23. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[35] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[36] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[37] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 2 (2(8) research, testing and development before placing on the market excluded, except testing in real-world conditions; 2(12) systems under free and open-source licences excluded unless high-risk, Art. 5 or Art. 50). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_2 (verified: primary)
[38] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 43 and Annexes VI and VII (internal control for Annex III points 2 to 8; Annex VI or VII for point 1 where harmonised standards or common specifications are applied, Annex VII otherwise; Annex I products under sectoral procedures; 43(4) new assessment on substantial modification, pre-determined changes excepted; Annex VII notified-body access to training, validation and testing data and control of changes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_43 (verified: primary)
[40] CEN-CENELEC JTC 21 standards tracker (no AI Act harmonised standard cited in the Official Journal, so no Art. 40 presumption of conformity; tracker updated 29 Jun 2026; the book's regulatory map rechecked on 2026-09-19). CEN-CENELEC JTC 21 (via kla.digital). 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[41] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 47 and 48 (EU declaration of conformity per Annex V, kept for 10 years; CE marking affixed visibly, legibly and indelibly, digital marking for digitally provided systems, notified-body number where applicable). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_47 (verified: primary)
[42] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 49 (registration in the EU database before placing on the market; Annex III point 2 at national level; Art. 6(3) systems; public-authority deployers; non-public section for law enforcement, migration, asylum and border control). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_49 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 72 (post-market monitoring system; 72(3) the monitoring plan is part of the Annex IV technical documentation; as amended by Reg. (EU) 2026/1744, Commission guidance including a template by 2 Sep 2027). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_72 (verified: primary)
[44] Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[45] The General-Purpose AI Code of Practice (published 10 Jul 2025; voluntary; Transparency chapter with a Model Documentation Form; Safety and Security chapter for systemic-risk models). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[46] EU AI Act: General-Purpose AI Code of Practice, final version (unofficial reader: Model Documentation Form marks items for downstream providers, AI Office or national authorities; documentation kept 10 years per version; Safety and Security chapter Commitment 7, a Safety and Security Model Report before placing a model on the market). code-of-practice.ai (Alexander Zacherl). 2025. https://code-of-practice.ai/ (verified: secondary)
[47] The Gradient of Generative AI Release: Methods and Considerations (Irene Solaiman; six levels of access from fully closed to fully open; arXiv 2302.04844). arXiv. 2023-02-05. https://arxiv.org/abs/2302.04844 (verified: primary)
[48] Release Strategies and the Social Impacts of Language Models (Solaiman et al.; GPT-2 staged release; arXiv 1908.09203). arXiv. 2019-08-24. https://arxiv.org/abs/1908.09203 (verified: primary)
[49] The Open Source AI Definition 1.0 (freedoms to use, study, modify and share; preferred form for modification covers data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[50] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; section 4.2.2, paras 82 to 84: monetisation defeats the open-source exceptions, e.g. dual licensing free for academic and paid for commercial use, paid support or services required to access or use the model, and processing of personal data other than strictly for model security). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 18 and 19 (provider keeps technical documentation, QMS documentation, notified-body decisions and the EU declaration for 10 years; automatically generated logs kept at least six months unless other law provides otherwise; financial institutions keep logs within financial-services documentation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[52] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; public summary incl. data source; notice 10 business days before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[53] Directive on Automated Decision-Making (6.1 algorithmic impact assessment completed, approved and published on the Open Government Portal before production, updated on a schedule and when functionality or scope changes; 6.3.7 expert review; Appendix B impact levels defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[54] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[55] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c), except point 2 systems; elements (a) to (f); results notified to the market surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
