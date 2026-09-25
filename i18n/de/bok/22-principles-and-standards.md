---
lang: de
source: bok/22-principles-and-standards.md
sourceHash: "45f690d8e41680445e0ec502f1a21c2904a69366d076f37bc4836cff3aeee9fc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 22. Prinzipien, weiches Recht und Standards

> Prinzipien zeigen, wie es aussehen sollte, und Standards zeigen, wie man es nachweist; dieses
> Kapitel ordnet jedes Instrument der Stack-Schicht und dem Evidenzbestand zu, die es beantworten.

## Wie man dieses Kapitel liest

Das meiste, was die KI-Governance prägt, ist kein Recht. Es ist ein Geflecht von Prinzipiensätzen,
ein Vertrag, freiwillige Rahmenwerke und technische Standards, jedes von einem anderen Gremium für
ein anderes Publikum geschrieben. Die Aufgabe des Ingenieurs ist nicht, sie zu rezitieren. Es ist,
für jeden einzelnen zu wissen, was er verlangt, welche Kraft er trägt und welches Artefakt im Stack
nachweisen würde, dass die Anforderung erfüllt ist. Ein Prinzip zählt nur, wenn es ein
Kontrollmechanismus ist; ein Standard hilft nur, wenn seine Klauseln an ein Gate, ein
Registrierungsfeld oder einen Evidenzbestand angebunden sind.

Grob nach Kraft geordnet: bindendes Recht (die KI-Verordnung, in
[Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus) und
[Kapitel 18](/bok/eu-ai-act#the-act-and-the-omnibus)); ein bindendes Abkommen, das
Rahmenübereinkommen des Europarats, das die Parteien bindet, die es ratifizieren, und jede wählen
lässt, wie sie private Akteure erreicht [1]; **harmonisierte Standards**, europäische Standards auf
Anfrage der Kommission geschrieben, die eine Konformitätsvermutung geben, sobald ihre Referenz im
Amtsblatt veröffentlicht ist [2]; internationale Standards und Rahmenwerke (ISO/IEC, NIST, IEEE),
freiwillig und manchmal zertifizierbar; und Prinzipien und weiches Recht (OECD, UNESCO, G7, die
EU-Hochrangige Expertengruppe), die das Ziel und das gemeinsame Vokabular setzen.

Zwei Vorsichtsmaßnahmen durchziehen das Kapitel. Standards unterstützen, sie verleihen nicht: kein
Zertifikat und keine Abdeckungsziffer macht ein System konform, und der Test aus
[Kapitel 01](/bok/definition#three-clarifiers) gilt immer noch. Und dieses Kapitel erklärt die
Instrumente, während [Kapitel 08](/bok/regulatory-map#how-to-read-this-map) der Obligationenindex
bleibt; wo ein Instrument dort bereits Zeilen hat, verlinkt dieses Kapitel auf sie. Prinzipiensätze
sind das Heimatgebiet von Responsible AI und KI-Ethik
([Kapitel 01](/bok/definition#the-disambiguation-cluster)): sie setzen die Werte. Die Tabellen der
Artefakte und Schichten unten sind der Ingenieurbeitrag, keine Aussage darüber, was die Autoren der
Prinzipien beabsichtigten.

## Die Instrumente auf einen Blick

| Instrument | Aussteller | Kraft | Was es im Stack ändert | Hauptschichten |
|---|---|---|---|---|
| OECD AI Principles (2019, rev. 2024) | OECD | Politische Verpflichtung durch 47 Anhänger | Gemeinsame Definition, Lebenszyklusfelder und Klassifizierungsfelder für das Register | 1 · 2 |
| UNESCO Recommendation (2021) | UNESCO | Nicht bindend, von 193 Mitgliedstaaten angenommen | Ethische Folgenabschätzung als registrierter Bestand | 2 |
| Rahmenübereinkommen (CETS Nr. 225) | Europarat | Bindend für Parteien nach Inkrafttreten; nicht in Kraft ab 2026-09-24 | Risiko- und Auswirkungsmanagement, Tests bei Änderungen, Anfechtungsunterlagen | 1 · 2 · 3 · 5 |
| Hiroshima Code of Conduct (2023) | G7 | Freiwillig; OECD-Berichterstattungsrahmen | Öffentliche Fähigkeitsberichterstattung, Incident-Sharing, Herkunft | 2 · 4 · 5 |
| Ethics Guidelines and ALTAI (2019, 2020) | EU AI HLEG | Nicht bindend; in KI-Verordnung Erwägungsgrund 27 erwähnt | Sieben Anforderungen als Checkliste zur Umwandlung in Kontrollmechanismen | 1 · 2 |
| NIST AI RMF 1.0 and profiles | NIST | Freiwillig | Function, category and subcategory ids als Kontrollmetadaten | 1–5 |
| ISO/IEC 22989, 42001 and family | ISO/IEC JTC 1/SC 42 | Freiwillig; 42001 zertifizierbar | Managementsystem-Evidenz; Vokabular; Lebenszyklusvorgänge | 1 · 2 · 5 |
| JTC 21 harmonisierte Standards | CEN-CENELEC | Konformitätsvermutung nach OJ-Zitierung; keine gefunden, soweit wir feststellen können | Provider-Risikodatei, Logging-Schema, QMS-Evidenz | 1–5 |
| IEEE 7000 series | IEEE | Freiwillig | Ethics-by-Design und Bias-Prozesse im SDLC | 1 · 2 · 3 |

Die Quellen für jede Zeile befinden sich in dem Abschnitt, der sie behandelt. Die Zahlen der
Anhänger und Mitgliedstaaten stammen aus [3] und [4]; der Status der Konvention aus [5].

## Eine kurze Genealogie des AI Soft Law

Die Instrumente zitieren sich gegenseitig, und die Reihenfolge ist wichtig, weil Definitionen
nachgelagert fließen. Die Hochrangige Expertengruppe der EU veröffentlichte ihre Ethik-Richtlinien
am 8. April 2019 [6]. Der OECD-Rat verabschiedete seine Empfehlung zu KI am 22. Mai 2019, und die
G20-Führungspersonen begrüßten die daraus abgeleiteten G20-KI-Prinzipien im Juni 2019 in Osaka [7].
Die UNESCO-Mitgliedstaaten verabschiedeten die Empfehlung zur Ethik der KI im November 2021 [4]. Die
OECD veröffentlichte ihr Framework for the Classification of AI Systems am 22. Februar 2022 [8], und
NIST's AI RMF 1.0 folgte am 26. Januar 2023, wobei der OECD-Lebenszyklus und die Dimensionen in
ihrer eigenen Abbildung 2 angepasst wurden [9]. Die G7-Führungspersonen einigten sich am 30. Oktober
2023 auf die Hiroshima Guiding Principles und Code of Conduct [10]. Die OECD überarbeitete ihre
KI-System-Definition am 8. November 2023 und die gesamte Empfehlung am 3. Mai 2024 [7]. Der
Europarat verabschiedete sein Framework Convention am 17. Mai 2024 und öffnete es zur Unterzeichnung
am 5. September 2024 [11]. Die OECD startete das Hiroshima Reporting Framework am 7. Februar 2025
[12], und die Europäische Union ratifizierte die Konvention am 15. Mai 2026 [13].

Die praktische Konsequenz ist Konvergenz auf eine Definition. Die OECD-Definition eines KI-Systems,
Artikel 2 der Konvention und Artikel 3(1) der KI-Verordnung verwenden nahezu identische
Formulierungen, und Erwägungsgrund 12 der KI-Verordnung besagt, dass der Begriff eng mit der Arbeit
internationaler Organisationen abgestimmt sein sollte [7][1][14]. Ein Register, das Systeme gegen
diese Formulierung einmal klassifiziert, kann alle drei Instrumente beantworten;
[Kapitel 11](/bok/ai-defined#four-definitions-compared) behandelt die Definition selbst und
tabellarisiert [wo die Prinzipiensätze übereinstimmen](/bok/ai-defined#where-the-sets-agree).

## OECD-KI-Prinzipien

Die OECD-Empfehlung zu KI (Rechtsinstrument `OECD/LEGAL/0449`) war der erste zwischenstaatliche
Standard zu KI. Sie enthält fünf wertbasierte Prinzipien für KI-Akteure, fünf Empfehlungen an
Regierungen und Definitionen von KI-System, KI-System-Lebenszyklus und KI-Akteuren [7]. Die
Überarbeitung 2024 fügte explizite Aufmerksamkeit für Desinformation und Informationsintegrität, für
Verwendungen außerhalb des vorgesehenen Zwecks, für sichere Außerkraftsetzung und Außerbetriebnahme
sowie für Umweltnachhaltigkeit hinzu und verlagerte Rückverfolgbarkeit und Risikomanagement unter
das Rechenschaftsprinzip [7]. Stand 2026-09-24 listet OECD.AI 47 Anhänger auf, darunter die 38
OECD-Mitglieder, die Europäische Union und acht Nicht-Mitglieder [3].

### Die fünf Prinzipien und fünf Empfehlungen

Die Prinzipien richten sich an KI-Akteure; die Empfehlungen richten sich an Regierungen. Nur die
ersten fünf werden direkt zu Engineering-Arbeit. Die Tabelle liest jedes Prinzip als eine Frage, die
der Stack beantworten muss.

| Prinzip | Was es von KI-Akteuren verlangt (paraphrasiert) | Engineering-Artefakt | Schicht |
|---|---|---|---|
| `1.1` Inklusives Wachstum, nachhaltige Entwicklung und Wohlbefinden | Vorteilhafte Ergebnisse für Menschen und Planeten anstreben | Intended-Use- und Benefit-Statement im Intake-Datensatz; benannte Schäden pro System | 2 |
| `1.2` Rechtsstaatlichkeit, Menschenrechte und demokratische Werte, einschließlich Fairness und Datenschutz | Rechte über den Lebenszyklus respektieren; menschliche Handlungsfähigkeit und Aufsicht; gegen Missbrauch schützen | Impact Assessment verknüpft mit dem Register; Fairness- und Datenschutz-Evals; Aufsichtsprüfpunkt | 2 · 3 · 4 |
| `1.3` Transparenz und Erklärbarkeit | Aussagekräftige, kontextgerechte Informationen über das System und seine Ausgaben | Model Card und Data Card; Interaktionsoffenlegung; Explanation Artefacts | 2 |
| `1.4` Robustheit, Sicherheit und Schutz | Funktion unter normaler Nutzung, vorhersehbarem Missbrauch und widrigen Bedingungen; sicher außer Kraft setzen, reparieren oder außer Betrieb nehmen | Adversarial- und Robustness-Evals; Kill Switch; Content Provenance | 3 · 4 |
| `1.5` Rechenschaftspflicht | Rückverfolgbarkeit von Datensätzen, Prozessen und Entscheidungen; systematisches Risikomanagement pro Lebenszyklusphase | Evidence Store mit Registry-IDs als Schlüssel; Risikoregister als Code; Lieferantendatensätze | 1 · 5 |

Die fünf Empfehlungen (Forschung und Entwicklung; ein inklusives KI-förderndes Ökosystem; eine
interoperable Governance- und Politikumgebung; menschliche Kapazität und Arbeitsmarkttransformation;
internationale Zusammenarbeit) richten sich an Anhänger, nicht an Systemeigentümer. Der Aufruf von
Empfehlung 2.5 nach "multi-stakeholder, consensus-driven global technical standards" ist die
politische Wurzel der später in diesem Kapitel behandelten Standardisierungsarbeit [7].

Prinzip 1.4(b) ist der operativste Satz im Instrument: Mechanismen sollten es ermöglichen, dass
KI-Systeme, die unzumutbaren Schaden riskieren, "sicher außer Kraft gesetzt, repariert und/oder
außer Betrieb genommen" werden [7]. In Stack-Begriffen ist das das
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker)-Muster mit einem
getesteten Widerrufspfad und einem Außerbetriebnahmeeintrag im Register. Die Rückverfolgbarkeit von
Prinzip 1.5(b) "in Bezug auf Datensätze, Prozesse und Entscheidungen" ist das, was
[**Continuous Assurance Telemetry**](/patterns/continuous-assurance-telemetry) produziert, wenn
jeder Evidenzeintrag die Register-ID des Systems trägt, das er beschreibt.

### Die OECD-KI-System-Definition und der Lebenszyklus

Die Definition von 2023 lautet: ein maschinengestütztes System, das für explizite oder implizite
Ziele aus der Eingabe, die es erhält, ableitet, wie es Ausgaben wie Vorhersagen, Inhalte,
Empfehlungen oder Entscheidungen generiert, die physische oder virtuelle Umgebungen beeinflussen
können; Systeme unterscheiden sich in Autonomie und Anpassungsfähigkeit nach der Bereitstellung [7].
OECD.AI vermerkt, dass die Europäische Union, der Europarat, die Vereinigten Staaten und die
Vereinten Nationen diese Definition und diesen Lebenszyklus in ihren eigenen Frameworks verwenden
[3].

Der Lebenszyklus hat sieben Phasen: Planung und Gestaltung; Datenerfassung und -verarbeitung;
Modellentwicklung oder -anpassung; Test, Evaluierung, Verifizierung und Validierung;
Verfügbarmachung oder Bereitstellung; Betrieb und Überwachung; Außerbetriebnahme oder Stilllegung.
Die Phasen sind iterativ und nicht unbedingt sequenziell, und die Außerbetriebnahme kann zu jedem
Zeitpunkt während des Betriebs erfolgen [7]. Diese letzte Klausel ist leicht zu übersehen und
nützlich zu kodieren: Das Register benötigt einen `retired`-Zustand, der von {`operating`}
erreichbar ist, mit eigener Evidenz (wer es außer Betrieb genommen hat, warum, welche Daten gelöscht
wurden), nicht nur einen Pfad von `built` zu `deployed`.

| OECD-Lebenszyklusphase | Wo sie in der Pipeline lebt | Evidenz, die sie hinterlassen sollte |
|---|---|---|
| Planung und Gestaltung | Aufnahme und Klassifizierung | Intake-Datensatz; Risikostufe; vorgesehener Zweck |
| Datenerfassung und -verarbeitung | Datenpipeline | Data Card; Lineage; Rechtmäßigkeitsgrundlagen-Notiz |
| Modellentwicklung oder -anpassung | Trainings- und Fine-Tuning-Jobs | AIBOM; Training-Run-Metadaten |
| Test, Evaluierung, Verifizierung, Validierung | CI eval gate | Eval-Ergebnis gegen Schwellenwert |
| Verfügbarmachung oder Bereitstellung | Zulassung und Freigabe | Politisches Urteil; Registereintrag |
| Betrieb und Überwachung | Laufzeit | Guardrail-Entscheidungen; Traces; Drift-Warnungen |
| Außerbetriebnahme oder Stilllegung | Registerzustandsänderung | Außerbetriebnahmeeintrag; widerrufene Anmeldedaten |

### Das Framework for the Classification of AI Systems

Das OECD-Klassifizierungsframework bewertet ein KI-System aus einer politischen Perspektive entlang
von fünf Dimensionen: **People & Planet**, **Economic Context**, **Data & Input**, **AI Model** und
**Task & Output**, jede mit ihren eigenen Eigenschaften und Attributen [8]. NIST's AI RMF
reproduziert eine modifizierte Version desselben Bildes, mit Application Context anstelle von
Economic Context und Test, Evaluation, Verification and Validation (TEVV) über den Lebenszyklus
gezogen [9].

Für einen Ingenieur ist das Framework ein Schema, kein Papier. Jede Dimension wird zu einer Gruppe
von Registerfeldern, die ein System mit anderen vergleichbar macht und dem Rest des Stack mitteilt,
was zu testen ist.

> **Beispiel (illustrativ)** Ein Registereintrag erweitert um die fünf Dimensionen. Die Felder sind
> die Wahl des Teams; die Gruppierung ist die der OECD.
>
> ```yaml
> id: credit-limit-assist
> oecd_classification:
>   people_and_planet: { affected: [applicants], rights_impact: high, opt_out: false }
>   economic_context: { sector: consumer-credit, criticality: high, deployment: customer-facing }
>   data_and_input: { provenance: [bureau-feed, application-form], personal_data: true }
>   ai_model: { type: gradient-boosted-trees, adaptive_after_deployment: false }
>   task_and_output: { task: recommendation, autonomy: human-reviewed, output: limit-band }
> ```
>
> Eine Richtlinie in Layer 01 liest `rights_impact: high` und erfordert ein Fairness-Eval-Gate; das
> Eval-Gate in Layer 03 liest `personal_data: true` und fügt eine Leakage-Suite hinzu. Die
> Klassifizierung hört auf, eine Beschreibung zu sein, und beginnt, Kontrollen zu leiten.

### Das OECD.AI-Observatorium

Drei OECD.AI-Ressourcen sind es wert, verdrahtet zu werden. Der
**Catalogue of Tools & Metrics for Trustworthy AI** ist ein Ort, um Eval-Methoden und Metriken zu
finden, keine Empfehlungsliste [15]. Der **AI Incidents and Hazards Monitor** [3] ist ein Input für
Layer 03: ein gemeldeter Fehler in einem vergleichbaren System ist ein Kandidaten-Eval-Fall (siehe
[Kapitel 17](/bok/incidents#learning-from-public-incident-databases)). Das
**Hiroshima AI Reporting Framework** ist der Ort, an dem Entwickler fortgeschrittener KI-Systeme
Risikomanagement-Berichte einreichen [3] (siehe den G7-Abschnitt).

> **In der Praxis (illustrativ)**
> Ein Governance-Team bei einem großen Versicherer fügte die fünf OECD-Dimensionen als erforderliche
> Felder zu seinem Register-Schema hinzu. Die erste Abstimmung fand mehrere Systeme, deren
> {`task_and_output.autonomy`} sagte "human-reviewed", während Runtime-Traces bei den meisten
> Entscheidungen keine Reviewer-Aktion zeigten. Das Feld schuf die Lücke nicht; es machte die Lücke
> abfragbar. Die Lösung war ein Aufsichtsprüfpunkt mit protokollierten Genehmigungen, und das
> Registerfeld wurde zu einer Behauptung, die die Traces falsifizieren konnten.

## UNESCO-Empfehlung zur Ethik der KI

Die 193 UNESCO-Mitgliedstaaten verabschiedeten die Empfehlung zur Ethik der Künstlichen Intelligenz
im November 2021, der erste globale Standard zur KI-Ethik [4]. Sie ruht auf vier Kernwerten
(Menschenrechte und Menschenwürde; gerechte, friedliche und vernetzte Gesellschaften; Vielfalt und
Inklusivität; das Gedeihen von Umwelt und Ökosystemen) und zehn Kernprinzipien: Verhältnismäßigkeit
und Schadensabwehr; Sicherheit und Schutz; Datenschutz und Datenschutz; Multi-Stakeholder- und
adaptive Governance; Verantwortung und Rechenschaftspflicht; Transparenz und Erklärbarkeit;
menschliche Aufsicht und Bestimmung; Nachhaltigkeit; Bewusstsein und Kompetenz; Fairness und
Nichtdiskriminierung [4]. Politische Aktionsbereiche verwandeln dann die Werte in
Regierungsprogramme.

Die Empfehlung richtet sich an Staaten, daher kommt ihr operatives Gewicht für eine Organisation
durch zwei Werkzeuge. Die **Readiness Assessment Methodology** (RAM) bewertet, wie vorbereitet ein
Land ist, KI verantwortungsvoll zu regieren [16]; sie ist nützlicher Kontext bei der Bereitstellung
in einer Gerichtsbarkeit, die eine durchgeführt hat. Die **Ethical Impact Assessment** (EIA) ist auf
Systemebene: Sie hilft, die ethischen Auswirkungen eines einzelnen KI-Systems vor und während der
Nutzung zu bewerten, und ist für Regierungen konzipiert, die KI beschaffen oder bereitstellen,
Unternehmen, die sie entwickeln, und Forscher, die sie bewerten [17].

Im Stack ist eine Grundrechte-Folgenabschätzung eine weitere Impact-Assessment: an den
Registry-Eintrag angehängt, versioniert und bei Änderung erneut ausgeführt, nach
[**FRIA-as-Code**](/patterns/fria-as-code). Ein öffentlicher Käufer, der eine von Lieferanten
verlangt, macht sie zu einem Beschaffungsartefakt für das
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).
"Verhältnismäßigkeit und Schadensfreiheit" wiederholt das Hausprincip
[beginnen Sie mit einem benannten Fehlermodus oder einem benannten Schaden](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
[4].

## Rahmenübereinkommen des Europarats (CETS Nr. 225)

Das Rahmenübereinkommen über künstliche Intelligenz und Menschenrechte, Demokratie und
Rechtsstaatlichkeit ist der erste international rechtsverbindliche Vertrag über KI. Es wurde am 17.
Mai 2024 in Straßburg angenommen und am 5. September 2024 in Vilnius zur Unterzeichnung aufgelegt
[11]. Es ist technologieneutral und bindet Parteien, nicht Unternehmen [5][1].

### Geltungsbereich und Status

Artikel 3 legt den Geltungsbereich fest. Parteien müssen das Übereinkommen auf
Lebenszyklusaktivitäten von KI-Systemen anwenden, die von Behörden oder von privaten Akteuren in
deren Auftrag durchgeführt werden. Für andere private Akteure muss jede Partei Risiken und
Auswirkungen auf eine Weise angehen, die mit Gegenstand und Zweck des Übereinkommens vereinbar ist,
und muss erklären, wie sie dies tun wird. Nationale Sicherheit, nationale Verteidigung und
Forschung, die noch nicht zur Verwendung verfügbar gemacht wurde, sind mit Bedingungen ausgenommen
[1].

Das Übereinkommen tritt am ersten Tag des Monats in Kraft, der drei Monate nach der Ratifizierung
durch fünf Unterzeichner, darunter mindestens drei Mitgliedstaaten des Europarats, folgt (Artikel
30(3)) [1]. **Status ab 2026-09-24:** Die eigene Seite des Europarats führt die Europäische Union
als einzige Partei und 20 weitere Unterzeichner auf, darunter das Vereinigte Königreich, Norwegen,
die Schweiz, die Ukraine, Kanada, Israel, Japan, die Vereinigten Staaten und Uruguay [5]. Das
Übereinkommen ist daher noch nicht in Kraft. Das Europäische Parlament stimmte dem Abschluss durch
die EU am 11. März 2026 zu [18], und die EU ratifizierte am 15. Mai 2026 auf der 135. Tagung des
Ministerkomitees in Chișinău [13]. Der Ratsbeschluss zum Abschluss des Übereinkommens für die Union,
Beschluss (EU) 2026/1080 vom 21. April 2026 (ABl. L, 13.5.2026), besagt, dass das Übereinkommen in
der Union ausschließlich durch die KI-Verordnung und andere einschlägige Rechtsvorschriften der
Union umgesetzt wird, und enthält die Erklärung der EU nach Artikel 3(1)(b), dass sie die Kapitel II
bis VI des Übereinkommens auf private Akteure durch die KI-Verordnung anwenden wird [19].

Innerhalb der EU wird der Vertrag daher durch die KI-Verordnung und nicht durch eine separate Reihe
von Pflichten für den privaten Sektor umgesetzt. Außerhalb davon sind es, sobald das Übereinkommen
in Kraft tritt, die Umsetzungsmaßnahmen jeder Partei, die bindend sind; verfolgen Sie diese pro
Gerichtsbarkeit in [Kapitel 21](/bok/ai-laws-worldwide#comparing-the-regimes).

### Was das Übereinkommen verlangt und was es im Stack ändert

Kapitel III legt Grundsätze fest, die Parteien umsetzen: Menschenwürde und individuelle Autonomie;
Transparenz und Aufsicht; Rechenschaftspflicht und Verantwortung; Gleichheit und
Nichtdiskriminierung; Datenschutz und Schutz personenbezogener Daten; Zuverlässigkeit; sichere
Innovation, einschließlich kontrollierter Testumgebungen (Artikel 7–13) [1]. In den Kapiteln IV und
V findet sich die Ingenieurarbeit.

| Artikel | Pflicht der Parteien (paraphrasiert) | Engineering-Artefakt | Schicht |
|---|---|---|---|
| `Art. 14(2)(a)–(b)` | Dokumentieren Sie relevante Informationen über Systeme, die Menschenrechte erheblich beeinflussen können, ausreichend für betroffene Personen, um Entscheidungen anzufechten | Entscheidungsprotokoll pro folgenreicher Ausgabe; [Anfechtungspfad](/patterns/decision-notice-contest-path) mit angehängtem Protokoll | 2 · 5 |
| `Art. 14(2)(c)` | Eine wirksame Möglichkeit, sich bei zuständigen Behörden zu beschweren | Beschwerdeannahme verknüpft mit der Registrierungs-ID | 5 |
| `Art. 15(2)` | Benachrichtigen Sie Personen, dass sie mit einem KI-System interagieren, soweit angemessen | Interaktionsoffenlegung zur Laufzeit erzwungen | 4 |
| `Art. 16(1)–(2)(a)–(f)` | Iteratives, abgestuftes Risiko- und Auswirkungsmanagement: Kontext, Schweregrad und Wahrscheinlichkeit, Ansichten von Interessenträgern, Überwachung, Dokumentation | Risikoregister als Code; Folgenabschätzung verknüpft mit Registrierung; Überwachung gegen Baseline | 1 · 2 · 4 |
| `Art. 16(2)(g)` | Testen Sie Systeme vor der ersten Verwendung und bei wesentlichen Änderungen, soweit angemessen | Eval Gate bei Freigabe und bei wesentlicher Änderung | 3 |
| `Art. 16(4)` | Bewerten Sie die Notwendigkeit einer Moratorium, eines Verbots oder anderer Maßnahmen für inkompatible Verwendungen | Policy-as-Code-Blocklist verbotener Verwendungen | 1 |

Artikel 16(2)(g) verdient die Betonung. "Wenn sie erheblich geändert werden" ist ein Trigger, kein
Datum, und ein Trigger ist etwas, das eine Pipeline bewerten kann: ein Registry-Diff, der das
Modell, die Trainingsdaten oder den Zweckbestimmung ändert, führt das Gate erneut aus. Das ist das
[**Eval Gate in CI**](/patterns/eval-gate-in-ci)-Muster mit der Material-Change-Regel schriftlich
festgehalten, und es beantwortet die gleiche Frage, die die KI-Verordnung zur wesentlichen
Veränderung stellt (siehe
[Kapitel 18](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)).

Der Europarat veröffentlichte auch **HUDERIA**, eine unverbindliche Methodik für die Risiko- und
Auswirkungsbewertung von KI-Systemen aus der Perspektive von Menschenrechten, Demokratie und
Rechtsstaatlichkeit. Sie besteht aus zwei Teilen: die HUDERIA-Methodik, genehmigt vom
Ministerkomitee am 26. Februar 2025, und das HUDERIA-Modell: Context-Based Risk Analysis (COBRA),
genehmigt am 25. Februar 2026, das die Erfassung von Informationen über den Kontext, die Gestaltung
und den Einsatz eines Systems strukturiert [20]. Parteien können beide verwenden oder anpassen. Für
ein Team, das bereits FRIA-as-Code ausführt, sind COBRAs Kontextfragen eine Feldliste zur Abstimmung
mit dem Register, nicht ein zweiter Prozess.

**Zuordnung:** CETS Nr. 225 Art. 14–16 · KI-Verordnung Art. 9, 27, 50 (über die Umsetzungswahl der
EU) · Schichten 1–5. Zuordnungen sind illustrativ, keine Konformitätserklärung.

## G7-Hiroshima-Prozess

G7-Führungskräfte einigten sich am 30. Oktober 2023 auf zwei Texte: die International Guiding
Principles for Organizations Developing Advanced AI Systems und den darauf aufbauenden International
Code of Conduct. Der Code ist freiwillig, adressiert an Organisationen, die die fortschrittlichsten
KI-Systeme entwickeln (einschließlich Foundation Models und generativer KI), wird als nicht
erschöpfendes lebendes Dokument beschrieben, das auf den OECD-KI-Grundsätzen aufbaut, und soll nach
einem risikobasierten Ansatz befolgt werden [10]. Seine 11 Maßnahmen werden mit wenig Übersetzung
auf den Stack abgebildet:

| Maßnahme | Frage (paraphrasiert) | Engineering-Artefakt | Schicht |
|---|---|---|---|
| 1 | Identifizieren, bewerten und mindern Sie Risiken über den gesamten Lebenszyklus, einschließlich Tests vor der Bereitstellung | Adversarial Red-Team Suite; Eval Gate | 3 |
| 2 | Identifizieren und mindern Sie Schwachstellen, Vorfälle und Missbrauch nach der Bereitstellung | Laufzeitüberwachung; Incident Pipeline | 4 · 5 |
| 3 | Öffentlich über Fähigkeiten, Einschränkungen und angemessene und unangemessene Verwendungen berichten | Model Card aus der Registry veröffentlicht | 2 |
| 4 | Informationen austauschen und Vorfälle verantwortungsvoll mit Industrie, Regierungen, Zivilgesellschaft, Wissenschaft melden | Incident Pipeline mit einem externen Freigabezweig | 5 |
| 5 | KI-Governance- und Risikomanagement-Richtlinien entwickeln, implementieren und offenlegen | Policy-as-Code-Bibliothek mit einer veröffentlichten Zusammenfassung | 1 |
| 6 | In Sicherheitskontrollen investieren, einschließlich physischer, Cyber- und Insider-Threat-Schutzmaßnahmen | Sicherheitskontrollen auf Gewichte und Pipelines | 4 |
| 7 | Inhaltsauthentifizierungs- und Herkunftsmechanismen wo möglich einsetzen | Herkunftskennzeichnung bei der Ausgabe; Verifizierungstest | 4 |
| 8 | Forschung zu gesellschaftlichen, Sicherheits- und Sicherheitsrisiken priorisieren | (Programmebene; kein direktes Artefakt) | – |
| 9 | Systeme priorisieren, die globale Herausforderungen angehen | (Programmebene; kein direktes Artefakt) | – |
| 10 | Internationale technische Standards vorantreiben und übernehmen | Standards-Überwachung; Crosswalk-Wartung | 1 |
| 11 | Dateneingabemaßnahmen implementieren und personenbezogene Daten und geistiges Eigentum schützen | Data Card; Lizenz und Herkunft im AIBOM | 2 |

Am 7. Februar 2025 startete die OECD ein Framework für Unternehmen, um vergleichbar zu berichten,
wie sie den Code anwenden (Risikobewertung, Incident Reporting, Informationsaustausch). Erste
Berichte waren bis 15. April 2025 fällig, mit laufenden Einreichungen und jährlichen Updates danach
[12]. Ein Bericht ist eine Offenlegung, keine Prüfung; aus dem Register und dem Evidence Store
generiert bleibt er wahr, von Hand geschrieben driftet er ab. Für Entwickler von KI-Modellen mit
allgemeinem Verwendungszweck, die auf dem EU-Markt in Verkehr gebracht werden, ist das bindende
Gegenstück das GPAI-Regime der KI-Verordnung und sein freiwilliger Verhaltenskodex, indexiert in
[Kapitel 08](/bok/regulatory-map#gpai-code-of-practice).

## EU-HLEG-Richtlinien und ALTAI

Die unabhängige Hochrangige Expertengruppe der Kommission für KI präsentierte ihre Ethik-Richtlinien
für vertrauenswürdige KI am 8. April 2019. Vertrauenswürdige KI ist in den Richtlinien rechtmäßig,
ethisch und robust, und sieben Schlüsselanforderungen machen sie konkret: menschliches Handeln und
Aufsicht; technische Robustheit und Sicherheit; Datenschutz und Datenverwaltung; Transparenz;
Vielfalt, Nichtdiskriminierung und Fairness; gesellschaftliches und ökologisches Wohlbefinden;
Rechenschaftspflicht [6]. Die Richtlinien nennen drei Aufsichtsansätze (Human-in-the-Loop,
Human-on-the-Loop und Human-in-Command), was immer noch das kompakteste Vokabular für
Aufsichtsgestaltung ist [6]; das
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate)-Muster wählt zwischen ihnen nach
Folge.

Die **Assessment List for Trustworthy AI** (ALTAI) folgte am 17. Juli 2020, überarbeitet nach einem
Pilotprojekt mit über 350 Interessenträgern und veröffentlicht sowohl als Dokument als auch als
webbasiertes Selbstbewertungstool [21]. Artikel 27 der KI-Verordnung erinnert an die sieben
Grundsätze als unverbindliche Orientierungshilfe, die zu vertrauenswürdiger, menschenzentrierter KI
beiträgt, ohne Beeinträchtigung der bindenden Anforderungen der Verordnung [14].

ALTAIs bleibendes Lernziel ist eine Warnung. Ein Selbstbewertungsfragebogen, der einmal beantwortet
wird, ist eine Attestation, und der dritte Wert des Buches sagt, dass Evidenz aus der Laufzeit
kommt, nicht aus einer Punkt-in-Zeit-Attestation
([Wert 3](/bok/values-and-principles#3-evidence-comes-from-runtime-not-from-a-point-in-time-attestation)).
Der sinnvolle Schritt ist, jede Frage als einen Kandidaten-Kontroll zu behandeln. Die Richtlinien
fordern "Schutzmaßnahmen, die einen Fallback-Plan im Falle von Problemen ermöglichen" [6]; als
Kontroll wird das zu "gibt es einen getesteten Kill Switch, und wann war der letzte Test
erfolgreich?". Eine Frage, die nicht zu einer Überprüfung mit einem Evidenz-Datensatz werden kann,
geht zum Review Board, und die Liste ist immer noch wert, dafür behalten zu werden.

## NIST AI RMF 1.0 im Detail

Das NIST AI Risk Management Framework 1.0 (NIST AI 100-1, 26. Januar 2023) beschreibt sich selbst
als freiwillig, rechtswahrend, nicht-sektorspezifisch und use-case-agnostisch [9]. Kapitel 08 ordnet
seine vier Funktionen Artefakten zu ([Kapitel 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf));
dieser Abschnitt geht eine Ebene tiefer, zu dem, was ein Engineer braucht, um seine Identifizierer
als Kontroll-Metadaten zu verwenden.

### Schaden, Risiko und Toleranz

Teil 1 rahmt Risiko als Funktion der Schadenshöhe und seiner Wahrscheinlichkeit ein und gruppiert
potenzielle Schäden in Schaden für Menschen, Schaden für eine Organisation und Schaden für ein
Ökosystem [9]. Zwei Rahmungsentscheidungen sind für die Ingenieurarbeit wichtig. Das RMF kann bei
der Risikoproiorisierung helfen, aber „schreibt keine Risikotoleranz vor": die Schwelle ist die der
Organisation zu setzen, beeinflusst durch Recht, Politik und Normen [9]. Und es behandelt Messung
als schwierig: Risiken, die nicht gemessen werden oder nicht gemessen werden können, müssen dennoch
dokumentiert werden (MEASURE 1.1). Beide drücken in die gleiche Richtung wie das Hausgrundsatz
[geben Sie jeder Kontrolle Zähne](/bok/values-and-principles#give-every-control-teeth): eine
Schwelle muss gewählt, mit ihrer Begründung aufgeschrieben und durchgesetzt werden, weil das
Framework es nicht für Sie tun wird.

### Die sieben vertrauenswürdigen Merkmale

Das RMF benennt sieben Merkmale vertrauenswürdiger KI und beschreibt Valid und Reliable als
Grundlage für die anderen, wobei Accountable und Transparent sie alle umspannen [9].

| Merkmal | Evidenz, dass es gilt | Schicht |
|---|---|---|
| Valid und Reliable | Capability- und Regression-Evals gegen einen Golden Set; Drift-Monitoring | 3 · 4 |
| Safe | Safety-Threshold-Evals; getesteter Kill Switch; Override-Pfad | 3 · 4 |
| Secure und Resilient | Adversarial Red-Team Suite; [Threat Model](/patterns/ai-threat-model); Runtime-Erkennung | 3 · 4 |
| Accountable und Transparent | Registry-Ownership; Model Card; Evidenz mit Registry-IDs verknüpft | 2 · 5 |
| Explainable und Interpretable | [Explanation Artefacts](/patterns/explanation-artefact) und Reason Codes, auf Treue getestet ([Kapitel 16](/bok/fairness-and-explainability#testing-explanation-quality)) | 2 · 3 |
| Privacy-Enhanced | Leakage- und Memorisation-Evals; DPIA mit Registry verknüpft ([Kapitel 19](/bok/privacy-and-ai#does-a-model-contain-personal-data)) | 2 · 3 |
| Fair mit verwalteter schädlicher Verzerrung | [Fairness Evals](/patterns/fairness-eval-suite) mit Schwellwerten, die auf benannte Schäden zurückgeführt werden | 3 |

### Der Kern: 19 Kategorien

Der Kern hat vier Funktionen, 19 Kategorien und nach unserer Zählung der veröffentlichten Tabellen
72 Unterkategorien [9]. GOVERN ist querschnittlich; MAP, MEASURE und MANAGE laufen pro System. Die
Tabelle paraphrasiert jede Kategorie in einer Zeile und benennt das Artefakt, das sie evidenziert.

| Kategorie | In einer Zeile (paraphrasiert) | Artefakt | Schicht |
|---|---|---|---|
| GOVERN 1 | Richtlinien und Prozesse für KI-Risiko existieren, sind transparent und funktionieren; umfasst Inventar (1.6) und Außerbetriebnahme (1.7) | Policy-as-Code-Bibliothek; Registry gespeist durch Deployments | 1 · 2 |
| GOVERN 2 | Verantwortungsstrukturen: Menschen befähigt, verantwortlich und geschult | Owner-Feld pro Registry-Eintrag; RACI | 1 · 2 |
| GOVERN 3 | Diverse Teams und definierte Mensch-KI-Rollen informieren Risikoarbeit | Reviewer-Roster; Definitionen der Aufsichtsrolle | 1 |
| GOVERN 4 | Eine Kultur, die Risiko berücksichtigt und kommuniziert; Tests, Incident-Identifikation und Austausch (4.3) | Incident Pipeline; Eval-Ownership | 3 · 5 |
| GOVERN 5 | Engagement mit relevanten KI-Akteuren, einschließlich Feedback von außerhalb des Teams | Feedback- und Einspruchskanal an die Registry gebunden | 4 · 5 |
| GOVERN 6 | Risiken von Drittanbieter-Software, Daten und Supply-Chain adressiert | Vendor Due-Diligence Gate; AIBOM | 1 · 2 |
| MAP 1 | Kontext etabliert: Zwecke, Nutzer, Gesetze, Normen, Einstellungen | Intake-Datensatz | 2 |
| MAP 2 | Das System wird kategorisiert: Aufgaben, Methoden, Wissensgrenzen | Klassifizierungsfelder (die OECD-Dimensionen passen hier hin) | 2 |
| MAP 3 | Fähigkeiten, Nutzung, Vorteile und Kosten verstanden; Aufsichtsprozesse definiert (3.5) | Intended-Use-Erklärung; Aufsichtsdesign | 2 · 4 |
| MAP 4 | Risiken und Vorteile für jede Komponente abgebildet, einschließlich Drittanbieter | Komponenten-Risikokarte aus dem AIBOM | 2 |
| MAP 5 | Auswirkungen auf Einzelpersonen, Gruppen, Gemeinschaften, Organisationen und Gesellschaft charakterisiert | Impact Assessment (FRIA, ISO/IEC 42005) | 1 · 2 |
| MEASURE 1 | Methoden und Metriken gewählt, beginnend mit den bedeutendsten Risiken | Eval-Plan mit Schwellwerten und Begründung | 3 |
| MEASURE 2 | Systeme gegen die vertrauenswürdigen Merkmale evaluiert | Eval Suites; Red-Team-Ergebnisse | 3 |
| MEASURE 3 | Risiken über die Zeit verfolgt, einschließlich emergenter in der Bereitstellung | Runtime-Metriken mit Eval-Baseline verglichen | 4 |
| MEASURE 4 | Feedback, ob Messung funktioniert, wird gesammelt und bewertet | Eval-Coverage-Review; Analyse verpasster Incidents | 3 · 5 |
| MANAGE 1 | Risiken priorisiert und behandelt; Go- oder No-Go-Entscheidung zur Bereitstellung | Risikoregister-Entscheidungen; Release Gate | 1 · 5 |
| MANAGE 2 | Nutzen-maximierende und Schaden-minimierende Strategien; ersetzen, disengagieren oder deaktivieren (2.4) | Runtime Guardrail; Kill Switch | 4 |
| MANAGE 3 | Risiken und Vorteile von Drittanbietern verwaltet; vortrainierte Modelle überwacht | Lieferantenüberwachung; Modell-Provenance-Checks | 2 · 4 |
| MANAGE 4 | Behandlungen, Reaktion, Wiederherstellung und Kommunikation dokumentiert und überwacht; Incidents kommuniziert (4.3) | Incident Pipeline; Post-Deployment-Überwachungsplan | 4 · 5 |

Die Identifizierer sind der nützliche Teil. Ein Control, das
`nist_ai_rmf: [MEASURE 2.7, MANAGE 2.4]` in seinen Metadaten trägt, kann gezählt, crosswalked und
abgefragt werden; ein Control, das in Prosa beschrieben ist, nicht. Das
[**Framework Crosswalk**](/patterns/framework-crosswalk)-Muster generiert die RMF-Ansicht aus diesen
Metadaten, anstatt sie neben dem Code zu verwalten.

### Wie ein Playbook-Eintrag strukturiert ist

Das AI RMF Playbook ist der Begleiter, der jede Unterkategorie in vorgeschlagene Praxis umsetzt.
Jeder Eintrag hat die gleichen fünf Teile: **About** (was die Unterkategorie bedeutet),
**Suggested Actions**, **Transparency and Documentation** (formuliert als "Organizations can
document the following", eine Liste von Fragen), **AI Transparency Resources** und **References**
[22]. NIST beschreibt das Playbook als freiwilliges Material, das Nutzer anpassen, nicht als
Checkliste zum Abhaken [9].

Als Ingenieur gelesen, sind die "Transparency and Documentation"-Fragen Akzeptanzkriterien. Jede
Frage benennt entweder ein Artefakt, das der Stack bereits emittiert (dann verlinken), oder legt
eine Lücke offen (dann bauen oder dokumentieren, warum nicht).

> **Beispiel (illustrativ)** Eine Unterkategorie, in ein Gate und einen Evidenzdatensatz
> umgewandelt.
>
> ```yaml
> control: kill-switch-tested
> nist_ai_rmf: [MANAGE 2.4]          # supersede, disengage or deactivate
> playbook_question: "Who can deactivate the system, and how is that tested?"
> check: last_kill_switch_test.passed == true and age_days <= 30
> enforce: deploy-admission          # block release if stale
> evidence: kill-switch-test-result  # filed against the registry id
> ```
>
> Das Playbook lieferte die Frage; die Pipeline liefert die Antwort bei jedem Release.

### Profile und das Generative-AI-Profil

Ein Profil wendet den Kern auf einen Kontext an. Das RMF beschreibt drei Arten: **Use-Case-Profile**
für eine bestimmte Einstellung, **Temporal Profiles** (ein Current Profile, wie KI heute verwaltet
wird, und ein Target Profile, wo die Organisation sein möchte, dessen Vergleich die Lücken
offenbart) und **Cross-Sectoral Profiles** für Risiken, die über Einsätze hinweg verbreitet sind,
wie die Nutzung großer Sprachmodelle, Cloud-basierter Dienste oder Akquisition [9]. Aus
Control-Metadaten generiert, ist das Current Profile die Live-Coverage jeder Unterkategorie durch
ein laufendes Control, und das Target Profile ist ein überprüfter Diff.

**NIST AI 600-1**, das Generative AI Profile (26. Juli 2024), ist das Haupt-Cross-Sectoral-Profil.
Es definiert 12 Risiken, die einzigartig für oder verschärft durch generative KI sind:
CBRN-Informationen oder Fähigkeiten; Konfabulation; gefährliche, gewalttätige oder hasserfüllte
Inhalte; Datenschutz; Umweltauswirkungen; schädliche Verzerrung und Homogenisierung;
Mensch-KI-Konfiguration; Informationsintegrität; Informationssicherheit; Geistiges Eigentum;
obszöne, erniedrigende und/oder missbräuchliche Inhalte; Value-Chain- und Komponentenintegration
[23]. Es listet dann vorgeschlagene Maßnahmen auf, die mit RMF-Unterkategorien mit Identifizierern
wie `GV-1.1-001` verknüpft sind; wir zählen 212 solche Identifizierer im veröffentlichten Text [23].
Diese Identifizierer machen gute Testnamen: eine Eval Suite für Konfabulation, die die Maßnahmen
zitiert, die sie implementiert, kann ohne Tabellenkalkulation zum Profil zurückverfolgt werden.
Am 7. April 2026 kündigte NIST auch ein Concept Note für ein AI RMF-Profil zu vertrauenswürdiger KI
in kritischer Infrastruktur an [24].

### Angrenzende NIST-Arbeiten

Vier weitere NIST-Publikationen wirken sich direkt auf den Stack aus. Die neueren Entwürfe, die
bereits in [Kapitel 08](/bok/regulatory-map#newer-nist-ai-work) indexiert sind (die AI Agent
Standards Initiative, der Entwurf Cyber AI Profile und der Entwurf AI 800-1), werden hier nicht
wiederholt.

- **NIST AI 100-2 E2025** (März 2025) ist eine Taxonomie und Terminologie des adversarialen
  maschinellen Lernens: ML-Methoden, Lebenszyklusstadien von Angriffen, Angreiferziele, Ziele,
  Fähigkeiten und Wissen sowie Mitigationen [25]. Verwenden Sie seine Begriffe, um die Fälle in der
  [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite) zu benennen, damit ein
  Befund im Eval-Bericht und im Threat Model gleich liest.
- **NIST SP 800-218A** (Juli 2024) ist ein Secure Software Development Framework Community Profile
  für generative KI und Dual-Use-Foundation-Modelle. Es fügt KI-spezifische Praktiken und Aufgaben
  zu SSDF 1.1 für Produzenten von KI-Modellen, Produzenten von KI-Systemen, die sie nutzen, und
  Käufer hinzu [26]. Es ist die Build-Pipeline-Hälfte der Geschichte: Provenance von Gewichten und
  Daten, Integrität der Trainingsumgebung.
- **CSF 2.0** (26. Februar 2024) organisiert Cybersecurity-Ergebnisse in sechs Funktionen: Govern,
  Identify, Protect, Detect, Respond und Recover [27]. Das AI RMF und CSF 2.0 sind Geschwister,
  keine Substitute: Das RMF deckt KI-Risiko breit ab (Fairness, Datenschutz, Erklärbarkeit sowie
  Sicherheit), CSF deckt Cybersecurity-Ergebnisse für jedes System ab, und beide stellen Governance
  an erste Stelle. Das Entwurf Cyber AI Profile (NIST IR 8596) ist die Brücke, ein CSF 2.0-Profil
  für KI [28].
- **COSAiS**, die SP 800-53 Control Overlays for Securing AI Systems, werden SP 800-53-Controls auf
  fünf Anwendungsfälle zuschneiden: generative KI-Assistenten, prädiktive KI, Single-Agent- und
  Multi-Agent-Systeme sowie Controls für KI-Entwickler. Ab 2026-09-24 zeigt die Projektseite das
  Concept Paper (14. August 2025) und einen kommentierten Outline für das Predictive-AI-Overlay (8.
  Januar 2026), ohne öffentlichen Entwurf-Overlay bisher [29]. Für Organisationen, die bereits SP
  800-53 betreiben, werden die Overlays die direkteste Route von einer bestehenden Control-Baseline
  zu KI sein.

### Revisionsstatus

Das RMF selbst sah eine formale Überprüfung mit Community-Input spätestens 2028 vor, mit Versionen
nummeriert 1.n für Minor und 2.0 für Major Revisionen [9]. Ab 2026-09-24 besagt NISTs
Framework-Seite, dass AI RMF 1.0 "als Teil des White House AI Action Plan überarbeitet wird" [24];
wir fanden keine veröffentlichte überarbeitete Version, daher bleibt 1.0 der zitierbare Text (vor
Verlassen auf Kategorie-Wording überprüfen). Zwei Engineering-Konsequenzen folgen. Pinnen Sie die
Version in Control-Metadaten (`nist_ai_rmf@1.0`), damit eine Revision ein Diff ist, den Sie
überprüfen, anstatt einer stillen Bedeutungsänderung. Und bevorzugen Sie die Kategorie- und
Unterkategorie-Identifizierer gegenüber ihrer Prosa, weil Identifizierer Revisionen besser
überstehen als Wording.

NIST hostet auch Crosswalks vom RMF zu anderen Frameworks, einschließlich ISO/IEC 42001 und,
datiert 14. August 2025, ein überarbeiteter ISO/IEC 23894 Crosswalk und ein neuer ISO/IEC 42005
[30]. Sie sind ein solider Ausgangspunkt für eine Crosswalk-Datei, kein Substitute für die Zuordnung
Ihrer eigenen Controls.

## Die ISO/IEC-Familie

ISO/IEC JTC 1/SC 42 veröffentlicht die internationalen KI-Standards. Sie werden hier nur nach Nummer
und Kurztitel referenziert; die Texte werden von ISO und nationalen Körperschaften verkauft und
nicht reproduziert. Kapitel 08 ordnet bereits die ISO/IEC 42001 Annex A Bereiche und ISO/IEC 42005,
42006 und 23894 Artefakten zu
([Kapitel 08, ISO/IEC](/bok/regulatory-map#isoiec-42001-42005-and-42006)).

### Grundlagen und Vokabular

| Standard | Kurztitel | Was es im Stack ändert | Schicht |
|---|---|---|---|
| `ISO/IEC 22989:2022` | KI-Konzepte und Terminologie [31] | Kontrolliertes Vokabular für Registry-Felder und Policy-Text; Stakeholder-Rollen | 1 · 2 |
| `ISO/IEC 23053:2022` | Framework für KI-Systeme mit maschinellem Lernen [32] | Referenz-Dekomposition eines ML-Systems in Komponenten für das AIBOM | 2 |
| `ISO/IEC 5338:2023` | KI-System-Lebenszyklen-Prozesse, basierend auf ISO/IEC/IEEE 15288 und 12207 [33] | Lebenszyklusstadien, an die die Pipeline Gates angehängt werden | 1 · 3 |
| `ISO/IEC TR 24028:2020` | Überblick über Vertrauenswürdigkeit in KI [34] | Hintergrund-Taxonomie für Threat- und Failure-Mode-Kataloge | 1 |

ISO/IEC 22989 establishes terminology and concepts for AI and is written to be used by other
standards [31]; ISO/IEC 5338, for example, draws its AI-specific processes from 22989 and 23053
[33]. A registry whose field names follow 22989 needs less translation when an auditor works from
the SC 42 family. The standard also defines stakeholder roles such as AI provider, AI producer, AI
customer, AI partner and AI subject (verify the role list against the text), which are not the AI
Act's provider and deployer: map them explicitly in the registry rather than assuming they coincide.

### Risk, quality and data

| Standard | Kurztitel | Was es im Stack ändert | Schicht |
|---|---|---|---|
| `ISO/IEC 23894:2023` | AI: guidance on risk management [35] | Organisational AI risk process; risk register as code | 1 · 3 |
| `ISO/IEC TR 24027:2021` | Bias in AI systems and AI aided decision making [36] | Bias sources and measures to cover in fairness evals | 3 |
| `ISO/IEC 5259` series (2024–2025) | Data quality for analytics and ML: overview, process framework, governance framework and related parts [37] | Data-quality tests in CI; data card fields; data governance roles | 2 · 3 |
| `ISO/IEC 25059:2023` | Quality model for AI systems (SQuaRE extension) [38] | Quality characteristics to specify and measure; eval-suite coverage | 3 |
| `ISO/IEC 38507:2022` | Governance implications of the use of AI by organizations [39] | Board-level decision rights and oversight reporting | 1 · 5 |

Two details matter for planning. ISO/IEC 25059 is marked "to be revised" on ISO's page as of
2026-09-24, with a replacement edition already at FDIS stage and expected within months [38], so pin
the edition you map to. And ISO/IEC 38507 is written for the governing body
and its advisers (executives, auditors, policymakers) [39]: it is the standard that tells a board
what it owns, which is where the escalation path in layer 05 ends.

### The management-system trio

**ISO/IEC 42001:2023** specifies requirements for establishing, implementing, maintaining and
continually improving an AI management system [40]. **ISO/IEC 42005:2025** gives guidance for AI
system impact assessments on individuals, groups and society across the lifecycle [41]. **ISO/IEC
42006:2025** sets additional requirements, on top of ISO/IEC 17021-1, for bodies that audit and
certify AI management systems against 42001 [42]: it is how a certificate's issuer shows the
competence to issue it.

42001 follows ISO's Harmonized Structure for management-system standards, the shared layout and core
text defined in Annex SL, so its clauses 4 to 10 (context, leadership, planning, support, operation,
performance evaluation, improvement) line up with every other ISO management-system standard [43].
Like ISO/IEC 27001, it pairs those clauses with an annex of controls, and the organisation justifies
which controls it applies in a Statement of Applicability (verify the clause wording). The
engineering reading of the SoA: it is a generated file, not a document. Each Annex A control listed
as applicable should point at the running control and the evidence stream that implements it; each
exclusion should carry its justification and an owner.

What a 42001 certificate proves, and what it does not, is set out in [chapter
07](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments) and [chapter 08](/bok/regulatory-map#what-is-not-harmonised-yet): it
evidences a management system; it confers no AI Act presumption of conformity.

### Integrating with 27001, 27701 and 9001

ISO hat Management-System-Standards so gestaltet, dass eine Organisation ein integriertes
Management-System aufbauen kann, das mehrere Standards gleichzeitig erfüllt [43]. Für KI bedeutet
das ISO/IEC 42001 zusammen mit ISO/IEC 27001:2022 für Informationssicherheit [44], ISO/IEC 27701 für
Datenschutz, deren Ausgabe 2025 ein eigenständiges Datenschutz-Informationsmanagementsystem ist, das
allein oder abgestimmt mit 27001 verwendet werden kann [45], und ISO 9001 für Qualität, deren
Ausgabe 2026 die Ausgabe 2015 im September 2026 ersetzt hat [46].

| Gemeinsame Klausel (harmonisierte Struktur) | Ein Artefakt für alle vier | Schicht |
|---|---|---|
| 4 Kontext | Eine Scope-Erklärung und ein Register der interessierten Parteien mit KI-Systemen als Registrierungseinträge | 2 |
| 5 Führung | Ein Policy-Set als Code mit Abschnitten zu KI, Sicherheit, Datenschutz und Qualität | 1 |
| 6 Planung | Ein Risikoregister mit typisierten Risiken (KI, Sicherheit, Datenschutz, Qualität) und ein Behandlungs-Workflow | 1 |
| 7 Unterstützung | Ein Kompetenz- und Schulungsnachweis; ein Speicher für dokumentierte Informationen | 5 |
| 8 Betrieb | Pipeline-Gates mit Tags für die Standards, die sie jeweils erfüllen | 1 · 3 · 4 |
| 9 Leistungsbewertung | Ein Evidence-Store, der die interne Auditierung für alle vier beantwortet | 5 |
| 10 Verbesserung | Eine Warteschlange für Nichtkonformitäten und Korrekturmaßnahmen, gespeist durch Incidents | 5 |

> **In der Praxis (illustrativ)**
> Ein Team, das bereits ISO/IEC 27001 hielt, ergänzte 42001 durch Erweiterung, nicht Duplizierung.
> Das Risikoregister erhielt einen `ai`} Risikotyp und einen Link zur Registry-ID; das interne
> Audit-Programm erhielt KI-Kontrollen; die Erklärung der Anwendbarkeit für 42001 wurde aus
> denselben Kontrollmetadaten wie die 27001-Erklärung generiert. Die Zertifizierungsprüfung fand die
> Nachweise dort, wo die 27001-Prüfer sie immer gefunden hatten. Das einzige neue Artefakt war die
> Folgenabschätzung, erstellt nach 42005 und an jeden Registereintrag mit hohem Risiko angehängt.

## Harmonisierte Standards unter der KI-Verordnung

*Zuletzt überprüft 2026-09-24. Phasen ändern sich monatlich; vor der Verwendung einer Zeile erneut
überprüfen.*

### Wie die Konformitätsvermutung funktioniert

Artikel 40 der KI-Verordnung vermutet, dass Hochrisiko-Systeme (und KI-Modelle mit allgemeinem
Verwendungszweck) den entsprechenden Anforderungen entsprechen, wenn sie harmonisierten Standards
entsprechen, deren Referenzen im Amtsblatt veröffentlicht wurden, soweit die Standards diese
Anforderungen abdecken [2]. Zwei Bedingungen geben der Vermutung Geltung: ein europäischer Standard,
der auf Anfrage der Kommission angenommen wurde, und seine Referenz, die im Amtsblatt nach der
Bewertung durch die Kommission zitiert wird. Veröffentlichung durch CEN-CENELEC allein ist nicht
ausreichend. Wenn Standards nicht vorliegen, nicht akzeptiert werden oder Grundrechte unzureichend
berücksichtigen, kann die Kommission nach Artikel 41 stattdessen **gemeinsame Spezifikationen**
durch Durchführungsakt erlassen [2].

Die Kommission forderte CEN und CENELEC am 22. Mai 2023 erstmals zu KI-Standards auf (`C(2023)3215`,
registriert als Anfrage `M/593`) [47][48]. Nachdem CEN-CENELEC erhebliche Verzögerungen meldete, hob
die Kommission diese Anfrage im Juni 2025 auf und ersetzte sie durch `C(2025)3871`}, abgestimmt mit
dem endgültigen Text der KI-Verordnung [47]. Die Anfrage umfasst zehn Themen: Risikomanagement;
Governance und Qualität von Datensätzen; Aufzeichnungspflichten; Transparenz; menschliche Aufsicht;
Genauigkeit; Robustheit; Cybersicherheit; Qualitätsmanagementsystem; Konformitätsbewertung [49]. Im
Oktober 2025 verabschiedeten CEN und CENELEC außergewöhnliche Maßnahmen zur Beschleunigung der
Lieferung, einschließlich direkter Veröffentlichung nach einer positiven Enquiry-Abstimmung ohne
separate Formal Vote, mit den Prioritätslieferprodukten für Q4 2026 [48].

Der Zeitplan interagiert mit dem Digital-Omnibus, der die Anwendung der
Annex-III-Hochrisiko-Anforderungen auf 2. Dezember 2027 und von Annex I auf 2. August 2028
verschoben hat [50]. Für die meisten Anbieter sollten die Standards daher vor Anwendung der
Anforderungen vorliegen, aber nicht lange davor, was wenig Raum zum Aufbau auf einen endgültigen
Text lässt.

### Das JTC-21-Programm

Die Arbeit findet im gemeinsamen technischen Komitee CEN-CENELEC JTC 21 statt, das in Arbeitsgruppen
zu operativen Aspekten, technischen Aspekten, grundlegenden und gesellschaftlichen Aspekten sowie
Cybersicherheit organisiert ist [51]. Die Phasen unten stammen von einem paneuropäischen
Informationspunkt für Standards, der mit nationalen Normungsgremien betrieben wird [52], und werden
gegen einen öffentlichen Tracker abgeglichen [53]; beide sind sekundär, und die Artikel-Zuordnung
wird wie von diesen Quellen berichtet dargestellt.

| Liefergabe | Thema | KI-Verordnung | Phase ab 2026-09-24 (berichtet) | Was es im Stack ändert | Schicht |
|---|---|---|---|---|---|
| `EN 18286:2026` | Qualitätsmanagementsystem für Zwecke der KI-Verordnung | `Art. 17` | Veröffentlicht Juli 2026 [54]; keine Amtsblatt-Zitierung gefunden | QMS-Prozesse laufen als Pipeline-Phasen; Design- und Änderungskontrolle hinterlassen Nachweise | 1 · 5 |
| `prEN 18228` | KI-Risikomanagement | `Art. 9` | Enquiry-Abstimmung geschlossen 30. Juli 2026 | Provider-Risikodatei: Gefahr, Schätzung, Bewertung, Kontrolle, Überwachung; Akzeptanzkriterien als Code | 1 · 3 · 5 |
| `prEN 18229-1` | Vertrauenswürdigkeits-Framework, Teil 1: Protokollierung | `Art. 12` | Enquiry-Abstimmung geschlossen 20. August 2026 | Event-Log-Schema und Aufbewahrung für Hochrisiko-Systeme | 4 · 5 |
| `prEN 18229-2` | Teil 2: Transparenz | `Art. 13` | Entwurf (Kommentierungsfrist geschlossen Januar 2026) | Betriebsanleitung und Model-Card-Felder | 2 |
| `prEN 18229-3` | Teil 3: menschliche Aufsicht | `Art. 14` | Enquiry gestartet 30. Juli 2026 | Aufsichtsprüfpunkt-Design; Aufsichtstelemetrie | 4 |
| `prEN 18229-4`, `-5` | Teile 4 und 5: Genauigkeit, Robustheit | `Art. 15` | Neue Projekte genehmigt 24. Juni 2026 | Genauigkeits- und Robustheitsschwellen im Eval-Gate | 3 |
| `prEN 18282` | Cybersicherheitsspezifikationen für KI-Systeme | `Art. 15` | Enquiry-Abstimmung geschlossen 30. Juli 2026 | Bedrohungsmodell; adversarische Suite; Laufzeit-Erkennung | 3 · 4 |
| `prEN 18283` | Bias-Management in KI-Systemen | `Art. 10` | Zur Enquiry genehmigt 24. September 2026 | Bias-Maßnahmen in Fairness-Evals; Bias-Datenbehandlung | 2 · 3 |
| `prEN 18284` | Qualität und Governance von Datensätzen | `Art. 10` | Entwurf; keine Anfrage aufgezeichnet (überprüfen) | Data Cards; Herkunft; Datensatz-Akzeptanztests | 2 · 3 |
| `prEN 18285` | Konformitätsbewertungsrahmen | `Art. 43` | Entwurf; keine Anfrage aufgezeichnet (überprüfen) | Struktur des Nachweispakets zur Bewertung | 5 |
| `prEN 18281`, `prEN ISO/IEC 23282` | Genauigkeitsevaluierung für Computer Vision und NLP | `Art. 15` | 18281: Anfrage-Abstimmung geschlossen 11. Juni 2026; 23282: Anfrage ab 3. September 2026 | Aufgabenspezifische Eval-Methoden und Metriken | 3 |

Einige ISO/IEC-Normen wurden auch als europäische Normen übernommen (beispielsweise
`EN ISO/IEC 23894:2024` [52]). Die Übernahme als EN macht eine Norm nicht harmonisiert gemäß
KI-Verordnung: nur eine Norm, die auf Anfrage der Kommission bereitgestellt und im Amtsblatt zitiert
wird, trägt die Vermutung. Zum 2026-09-24 haben wir keine Durchführungsentscheidung der Kommission
gefunden, die eine harmonisierte KI-Verordnungsnorm zitiert, was mit dem Juni-2026-Tracker [53] und
mit [Kapitel 08](/bok/regulatory-map#what-is-not-harmonised-yet) übereinstimmt (vor der Nutzung auf
EUR-Lex überprüfen).

### Was jedes Lieferergebnis im Stack ändert

Die Entwürfe sind nicht öffentlich, daher ist dies eine Lektüre ihrer veröffentlichten
Geltungsbereiche, nicht ihrer Klauseln. Drei Verschiebungen fallen auf.

**Risikomanagement verlagert sich von der Organisation auf das Produkt.** Der veröffentlichte
Geltungsbereich von prEN 18228 behandelt Anbieter von KI-Systemen: Gefahren identifizieren, Risiken
schätzen und bewerten, sie kontrollieren und die Kontrollen überwachen, für Risiken für Gesundheit,
Sicherheit und Grundrechte über den gesamten Lebenszyklus. Es verlangt von Anbietern, objektive
Risikoannehmungskriterien festzulegen, setzt aber die Niveaus nicht fest, und es ist nicht für die
Verwaltung von Risiken gedacht, denen sich die Organisation selbst gegenübersieht [52]. Das ist ein
anderes Objekt als ISO/IEC 23894, das organisatorisches Risikomanagement leitet [35]. Im Stack wird
die Risikodatei zu einem systemspezifischen Artefakt, das an die Registrierungs-ID gebunden ist, mit
Annehmungskriterien, die als Schwellwerte geschrieben sind, die ein Gate bewerten kann, und
Überwachung, die die Schleife in Schicht 05 schließt.

**Protokollierung, Aufsicht und Transparenz werden spezifizierbar.** Die prEN 18229-Serie teilt die
Artikel 12–15 in separate Teile [52]. Nach Fertigstellung ist der Protokollierungsteil ein Schema
zur Validierung von Ereignisprotokollen in CI, der Aufsichtsteil eine Designreferenz für das
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate), und der Transparenzteil eine
Feldliste für die Model Card und die Betriebsanleitung.

**Das QMS wird als Pipeline auditierbar.** EN 18286 unterstützt das Qualitätsmanagementsystem des
Artikels 17 [54]. Ein QMS, dessen Designkontrolle, Änderungsmanagement und Beobachtung nach dem
Inverkehrbringen als Pipeline-Stufen ablaufen, erzeugt seine eigenen Nachweise; eines, das in
Verfahren lebt, nicht. Das
[**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal)-Muster ist, wie
dieser Nachweis einen Bewerter erreicht.

### Aufbau vor der Veröffentlichung im Amtsblatt

Die Lücke zwischen einem Entwurf und einer zitierten Norm ist, wo die meisten Teams 2026 und 2027
verbringen werden. Drei Regeln halten die Arbeit wiederverwendbar:

1. **Baue zur Anforderung, ordne zur Norm zu.** Der AI Act-Artikel ist festgelegt; die
   Klauselnummerierung der Norm nicht. Schlüsselkontrollen auf `Art. 9`, `Art. 12` usw., und füge
   Standard-Klausel-IDs als Metadaten hinzu, wenn der Text endgültig ist.
2. **Führe eine Standards-Überwachung als Daten.** Eine Datei mit jedem Lieferable, seinem Status,
   dem Datum der letzten Überprüfung und den Kontrollen, die davon abhängen. Eine Statusänderung ist
   dann ein Diff, der die zu überprüfenden Kontrollen benennt, keine Überraschung.
3. **Beanspruche die Vermutung nicht frühzeitig.** Bis die Veröffentlichung im Amtsblatt existiert,
   ist die Konformität mit einem Entwurf oder einer veröffentlichten EN ein Nachweis auf ihre
   eigenen Verdienste hin, keine Vermutung. Sag das in der technischen Dokumentation.

> **In der Praxis (illustrativ)**
> Ein Anbieter eines Hochrisiko-Rekrutierungswerkzeugs erstellte seine Risikodatei zum
> veröffentlichten Umfang der prEN 18228, während der Entwurf in der Anhörungsphase war: Gefahren,
> Schätzungen, Kontrollen und Überwachung pro System, mit Akzeptabilitätsschwellen als Code. Als EN
> 18286 veröffentlicht wurde, verglich das Team seine QMS-Prozessliste mit den Pipeline-Stufen, die
> es bereits ausführte, und fand zwei Lücken (Benachrichtigung bei Lieferantenwechsel und eine
> Überprüfungshäufigkeit nach dem Inverkehrbringen). Beide wurden zu Pipeline-Stufen mit
> Eigentümern. Die Standards-Überwachungsdatei verzeichnete das Datum jeder Überprüfung, was ein
> Bewerter sehen wollte.

## IEEE 7000 series

Die IEEE 7000-Serie behandelt Ethik als Systems-Engineering-Prozess. Keine dieser Normen ist unter
dem AI Act harmonisiert, und keine verleiht eine Vermutung; sie sind nützlich als Prozessreferenzen.

| Standard | Thema | Was es im Stack ändert | Schicht |
|---|---|---|---|
| `IEEE 7000-2021` | Modellprozess zur Berücksichtigung ethischer Werte von der Konzepterkundung bis zur Entwicklung, mit Stakeholder-Wertelizitation und Rückverfolgbarkeit [55] | Wertvorgaben, die zu Designentscheidungen und Tests rückverfolgbar sind | 1 |
| `IEEE 7001-2021` | Transparenz autonomer Systeme in messbaren, testbaren Ebenen [56] | Transparenzebenen als testbare Anforderungen geschrieben | 2 · 3 |
| `IEEE 7002-2022` | Datenschutzprozess für Systeme, die personenbezogene Daten verwenden [57] | Datenschutzanforderungen als SDLC-Gates | 1 · 2 |
| `IEEE 7003-2024` | Überlegungen zu algorithmischer Verzerrung, einschl. Validierungsdatenauswahl und Anwendungsgrenzen [58] | Bias-Validierungssätze; deklarierte Anwendungsgrenzen in der Registry | 2 · 3 |
| `IEEE 7005-2021` | Transparente Arbeitgeberdaten-Governance [59] | Handhabungsregeln für Arbeitnehmerdaten, die von KI verwendet werden | 2 |
| `IEEE 7010-2020` | Empfohlene Praxis zur Bewertung der Auswirkungen autonomer und intelligenter Systeme auf das menschliche Wohlbefinden [60] | Wohlbefindensindikatoren in der Auswirkungsbewertung | 2 |

IEEE 7003s "Anwendungsgrenzen, für die der Algorithmus entworfen wurde" ist die tragbarste Idee
hier: eine deklarierte Grenze im Registry-Eintrag ist etwas, das ein Runtime Guardrail durchsetzen
kann und eine Eval gegen testen kann [58].

## Eine Kontrolle, viele Instrumente

Die Instrumente überlappen sich viel mehr, als ihre Autoren unterschiedliche Vokabulare vermuten
lassen. Die Tabelle zeigt, für sieben Kontrollen, die der Stack bereits aufbaut, wo jedes Instrument
sie verlangt. Es ist ein Ausgangspunkt für eine Crosswalk-Datei, keine Behauptung, dass die Zeilen
äquivalent sind.

| Kontrolle (Schicht) | OECD | CoE CETS 225 | G7 Code | NIST AI RMF | ISO/IEC | JTC 21 |
|---|---|---|---|---|---|---|
| Risiko- und Auswirkungsbewertung (1 · 2) | `1.5(c)` | `Art. 16` | Aktion 1 | MAP 5, MANAGE 1 | 23894, 42005 | prEN 18228 |
| Testen vor Freigabe und bei Änderung (3) | `1.4(a)` | `Art. 16(2)(g)` | Aktion 1 | MEASURE 1, 2 | 42001 `A.6` | prEN 18229-4, -5 |
| Rückverfolgbarkeit und Protokollierung (4 · 5) | `1.5(b)` | `Art. 14(2)(a)` | Aktion 1 | MEASURE 3, MANAGE 4 | 42001 `A.6` | prEN 18229-1 |
| Transparenz und Offenlegung (2 · 4) | `1.3` | `Art. 8`, `15(2)` | Aktion 3 | MEASURE 2.8 | 42001 `A.8` | prEN 18229-2 |
| Menschliche Aufsicht und Außerkraftsetzung (4) | `1.2(b)`, `1.4(b)` | `Art. 8` | – | MAP 3.5, MANAGE 2.4 | 42001 `A.9` | prEN 18229-3 |
| Vorfallbehandlung und -austausch (5) | – | `Art. 16(3)` | Aktionen 2, 4 | GOVERN 4.3, MANAGE 4.3 | 42001 `10.2` | – |
| Lieferkette und Dritte (2) | `1.5(c)` | – | Aktion 11 | GOVERN 6, MANAGE 3 | 42001 `A.10` | – |

Quellen: [7][1][10][9][40][52]; die ISO/IEC 42001-Klausel- und Annex-A-IDs folgen
[Kapitel 08](/bok/regulatory-map#isoiec-42001-42005-and-42006) und der
[Crosswalk](/resources/crosswalk) der Website, deren [Explorer](/resources/crosswalk#explore) diese
Paare für zwei beliebige Instrumente ableitet und sie als OSCAL-Mapping-Sammlung exportiert.
Mappings sind illustrativ, keine Konformitätsbehauptung.

Die Engineering-Regel ist die aus dem
[Regulatory-Translation](/bok/the-role#regulatory-translation)-Workflow: baue jede Kontrolle einmal,
markiere sie mit jedem Instrument, das sie erfüllt, und generiere die Ansicht jedes Instruments aus
den Tags. Ein Prinzip, ein Vertragsartikel, eine Unterkategorie und eine harmonisierte Klausel
werden dann zu vier Abfragen über denselben Nachweis, und das Hinzufügen eines fünften Instruments
ist eine Metadatenänderung, kein neues Programm.

**Zuordnung:** OECD AI Principles `1.1`–`1.5` · CoE CETS Nr. 225 Art. 14–16 · G7 Hiroshima Code of
Conduct Aktionen 1–7, 10, 11 · EU AI Act Art. 9–15, 17, 40, 41 · ISO/IEC 22989, 23894, 42001, 42005,
42006 · NIST AI RMF (Govern, Map, Measure, Manage) und AI 600-1 · CEN-CENELEC JTC 21 Lieferable ·
alle fünf Schichten des Stack. Mappings sind illustrativ, keine Konformitätsbehauptung.

## Was Sie diese Woche tun können

1. **Füge die fünf OECD-Klassifizierungsdimensionen zu deinem Registry-Schema** als erforderliche
   Felder hinzu, und lass eine Richtlinie eine davon lesen (zum Beispiel erfordert
   `rights_impact: high` eine Fairness-Eval).
2. **Markiere deine zehn wichtigsten Kontrollen mit NIST AI RMF-Unterkategorie-IDs und ISO/IEC 42001-Klausel-IDs**,
   an die Ausgabe gebunden, und generiere ein Current Profile aus den Tags.
3. **Starte eine Standards-Überwachungsdatei**, die jedes JTC 21-Lieferable in der obigen Tabelle
   auflistet, seinen Status, das Datum deiner Überprüfung und die Kontrollen, die davon abhängen;
   setze eine monatliche Überprüfung.
4. **Nimm die veröffentlichten KI-Prinzipien deiner Organisation und benenne für jedes die Kontrolle und den Evidenzeintrag, der es implementiert.**
   Ein Prinzip ohne Kontrolle ist eine Lücke; schreib es als eine auf.
5. **Wenn du ISO/IEC 27001 hältst, ordne seine gemeinsamen Klauseln den 42001-Klauseln zu** und
   verweise beide auf einen Evidenzspeicher, bevor du ein neues Verfahren schreibst.

## Sources

[1] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 2 definition; Art. 3 scope and private-actor declaration; Arts. 7–13 principles; Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 40 and 41 (Art. 40: harmonised standards, presumption of conformity once references are published in the OJ; Art. 41: common specifications by implementing act). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_40 (verified: primary)
[3] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; definition and lifecycle used by the EU, the Council of Europe, the US and the UN; AI Incidents and Hazards Monitor; Hiroshima AI Reporting Framework). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[4] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values, ten core principles, policy action areas). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[5] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[6] Ethics Guidelines for Trustworthy AI (lawful, ethical, robust; seven key requirements; human-in-the-loop, human-on-the-loop, human-in-command; "safeguards that enable a fallback plan in case of problems"). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[7] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; G20 AI Principles drawn from it, June 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles, five recommendations; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[8] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (Fig. 1 harms; risk tolerance not prescribed; Fig. 2 lifecycle and dimensions adapted from the OECD; seven trustworthy characteristics; Core of 4 functions and 19 categories, 72 subcategories by our count of Tables 1–4; use-case, temporal and cross-sectoral profiles; formal review no later than 2028). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; living document building on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[11] "Council of Europe adopts first international treaty on artificial intelligence" (adopted in Strasbourg on 17 May 2024; opens for signature in Vilnius on 5 September 2024). Council of Europe. 2024-05-17. https://www.coe.int/en/web/portal/-/council-of-europe-adopts-first-international-treaty-on-artificial-intelligence (verified: primary)
[12] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[13] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), Recitals 12 and 27 and Art. 3(1) (recital 27: the seven AI HLEG principles as non-binding guidance; recital 12: the AI-system notion closely aligned with the work of international organisations; Art. 3(1)). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[15] Catalogue of Tools & Metrics for Trustworthy AI. OECD.AI. 2026. https://oecd.ai/en/catalogue/overview (verified: primary)
[16] Readiness Assessment Methodology (RAM): country-level readiness to govern AI (RAM 2.0). UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/ram (verified: primary)
[17] Ethical Impact Assessment (EIA): system-level assessment before and during use, for governments, companies and researchers. UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/eia (verified: primary)
[18] "EU Parliament backs EU conclusion of the Council of Europe Framework Convention on Artificial Intelligence" (European Parliament approval on 11 March 2026). Council of Europe. 2026-03-11. https://www.coe.int/en/web/artificial-intelligence/-/eu-parliament-backs-eu-conclusion-of-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[19] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors; OJ L 13 May 2026; text read from the Publications Office Cellar, CELEX 32026D1080). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[20] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 February 2025; HUDERIA Model: COBRA approved 25 February 2026; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[21] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list 17 July 2020 after a pilot with over 350 stakeholders; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[22] NIST AI RMF Playbook, GOVERN entries (per subcategory: About; Suggested Actions; Transparency and Documentation; AI Transparency Resources; References). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[23] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV/MP/MS/MG, 212 identifiers by our count). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[24] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; concept note for a critical-infrastructure profile, 7 April 2026). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[25] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[26] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (augments SSDF 1.1). NIST. 2024-07-26. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[27] The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Functions: Govern, Identify, Protect, Detect, Respond, Recover). NIST. 2024-02-26. https://doi.org/10.6028/NIST.CSWP.29 (verified: primary)
[28] NIST IR 8596 (initial preliminary draft): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile; comments closed 30 January 2026). NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[29] SP 800-53 Control Overlays for Securing AI Systems (COSAiS) (five use cases; concept paper 14 August 2025; predictive-AI annotated outline 8 January 2026; page updated 8 January 2026). NIST CSRC. 2026-01-08. https://csrc.nist.gov/projects/cosais (verified: primary)
[30] AI RMF crosswalk documents (AI RMF to ISO/IEC 42001; ISO/IEC 23894 revised crosswalk and ISO/IEC 42005 crosswalk dated 14 August 2025). NIST Trustworthy and Responsible AI Resource Center. 2025. https://airc.nist.gov/airmf-resources/crosswalks/ (verified: primary)
[31] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[32] ISO/IEC 23053:2022, Framework for AI systems using machine learning. ISO/IEC. 2022-06. https://www.iso.org/standard/74438.html (verified: primary)
[33] ISO/IEC 5338:2023, AI system life cycle processes (based on ISO/IEC/IEEE 15288 and 12207, with AI-specific processes from ISO/IEC 22989 and 23053). ISO/IEC. 2023-12. https://www.iso.org/standard/81118.html (verified: primary)
[34] ISO/IEC TR 24028:2020, Overview of trustworthiness in artificial intelligence. ISO/IEC. 2020-05. https://www.iso.org/standard/77608.html (verified: primary)
[35] ISO/IEC 23894:2023, AI: Guidance on risk management (organisational AI risk management). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[36] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making. ISO/IEC. 2021-11. https://www.iso.org/standard/77607.html (verified: primary)
[37] ISO/IEC 5259 series, Data quality for analytics and machine learning (Part 1:2024 overview, terminology and examples; Part 4:2024 process framework; Part 5:2025 governance framework). ISO/IEC. 2024-07. https://www.iso.org/standard/81088.html (verified: primary)
[38] ISO/IEC 25059:2023, SQuaRE: Quality model for AI systems (stage 90.92, to be revised, as of 2026-09-24; replacement at FDIS stage, expected within the coming months). ISO/IEC. 2023-06. https://www.iso.org/standard/80655.html (verified: primary)
[39] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[40] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AIMS). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[41] ISO/IEC 42005:2025, AI system impact assessment (guidance). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[42] ISO/IEC 42006:2025, Requirements for AIMS audit and certification bodies (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[43] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[44] ISO/IEC 27001:2022, Information security management systems. ISO/IEC. 2022-10. https://www.iso.org/standard/82875.html (verified: primary)
[45] ISO/IEC 27701:2025, Privacy information management systems: Requirements and guidance (independent management system standard; aligns with ISO/IEC 27001). ISO/IEC. 2025-10. https://www.iso.org/standard/85819.html (verified: primary)
[46] ISO 9001:2026, Quality management systems: Requirements (replaces ISO 9001:2015). ISO. 2026-09. https://www.iso.org/standard/9001 (verified: primary)
[47] Commission Implementing Decision C(2025)3871 on a standardisation request to CEN and Cenelec in support of Reg. (EU) 2024/1689, repealing Implementing Decision C(2023)3215 of 22 May 2023 (significant delays reported by CEN and Cenelec; request aligned with the final AI Act). European Commission. 2025-06-23. https://ec.europa.eu/transparency/documents-register/detail?ref=C(2025)3871&lang=en (verified: primary)
[48] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; drafting group for delayed drafts; Q4 2026 target; Standardization Request M/593 and Amendment M/613). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[49] AI Act standardisation (ten requested topics; prEN 18286 first to public enquiry on 30 October 2025; page updated 3 August 2026). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[50] "AI Omnibus enters into force" (Reg. (EU) 2026/1744; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[51] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity; prEN 18229 in five parts). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[52] Project stages for JTC 21 deliverables read on 2026-09-24: EN 18286:2026 (60.60, 2026-07-22); prEN 18228 (40.60, vote closed 2026-07-30; published scope); prEN 18229-1 (40.60, 2026-08-20); prEN 18229-2 (20.60, 2026-01-06); prEN 18229-3 (40.20, 2026-07-30); prEN 18229-4 and -5 (10.99, 2026-06-24); prEN 18281 (40.60, 2026-06-11); prEN 18282 (40.60, 2026-07-30); prEN 18283 (30.99, 2026-09-24); prEN 18284 (10.99); prEN 18285 (10.99); prEN ISO/IEC 23282 (40.20, 2026-09-03); EN ISO/IEC 23894:2024 (60.60). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[53] JTC 21 standards tracker (AI Act article per deliverable; no JTC 21 deliverable cited in the OJ as of June 2026). kla.digital. 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[54] "EN 18286 in the spotlight: supporting compliance with the AI Act" (EN 18286:2026, Artificial intelligence: Quality management system for EU AI Act regulatory purposes; supports Art. 17). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[55] IEEE 7000-2021, Standard Model Process for Addressing Ethical Concerns during System Design. IEEE SA. 2021. https://standards.ieee.org/standard/7000-2021.html (verified: primary)
[56] IEEE 7001-2021, Standard for Transparency of Autonomous Systems. IEEE SA. 2021. https://standards.ieee.org/standard/7001-2021.html (verified: primary)
[57] IEEE 7002-2022, Standard for Data Privacy Process. IEEE SA. 2022. https://standards.ieee.org/standard/7002-2022.html (verified: primary)
[58] IEEE 7003-2024, Standard for Algorithmic Bias Considerations (validation-data selection; application boundaries). IEEE SA. 2024. https://standards.ieee.org/standard/7003-2024.html (verified: primary)
[59] IEEE 7005-2021, Standard for Transparent Employer Data Governance. IEEE SA. 2021. https://standards.ieee.org/standard/7005-2021.html (verified: primary)
[60] IEEE 7010-2020, Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being. IEEE SA. 2020. https://standards.ieee.org/standard/7010-2020.html (verified: primary)
