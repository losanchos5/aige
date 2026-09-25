---
lang: de
source: bok/18-eu-ai-act.md
sourceHash: "27e0f6a82271ee4899688f462429d1cbc2f0599581148abdf4dbc5e2407b5ba6"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 18. Die KI-Verordnung der EU in einem Durchgang

> Die KI-Verordnung der EU, wie durch das Digital Omnibus geändert, von Anfang bis Ende gelesen: was
> sie abdeckt, wie sie Risiken einstuft, wer welche Pflicht trägt und wann jede Pflicht anwendbar
> wird.

## Wie man dieses Kapitel liest

Dieses Kapitel lehrt das Gesetz; [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus) indiziert
es. Lesen Sie dieses für die Logik des Gesetzes und Kapitel 08 für die vollständigen Pflichtzeilen.
Jede Pflicht unten nennt das Artefakt, das sie evidenziert, und die Stack-Schicht, die es
produziert.

Der Text wird gegen Verordnung (EU) 2024/1689 [1] wie durch Verordnung (EU) 2026/1744, das Digital
Omnibus on AI [2], geändert, gelesen, und jedes Datum ist mit Stand 2026-09-24 gestempelt. Es ist
eine Ingenieur-Lesart, keine Rechtsberatung. Der Ingenieur baut die Kontrolle und die Nachweise;
Counsel bestätigt, dass die Pflicht korrekt gelesen wurde (siehe
[Regulatory Translation](/bok/the-role#regulatory-translation)). Zuordnungen sind illustrativ, keine
Konformitätsaussage.

Die Stack-Schichten, die durchgehend genannt werden, sind Kapitel 04s fünf:
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

## Das Gesetz und das Omnibus

Die KI-Verordnung ist eine Produktsicherheitsverordnung mit Grundrechtszielen. Sie ist unmittelbar
in jedem Mitgliedstaat anwendbar, sie trat am 1. August 2024 in Kraft, und ihre Pflichten schalten
sich in Stufen ein [1][2]. Vier Ideen tragen den gesamten Text:

1. **Ein Definitionstor.** Ist das Ding ein KI-System, ein KI-Modell mit allgemeinem
   Verwendungszweck (GPAI) oder keines von beiden?
2. **Eine Risikoleiter.** Welche Stufe setzt die beabsichtigte Verwendung des Systems darauf?
3. **Ein Satz von Operatorrollen.** Welchen Hut trägt Ihre Organisation für dieses System?
4. **Ein Zeitplan.** Ab welchem Datum gilt jede Pflicht?

Das **Digital Omnibus on AI** ist Verordnung (EU) 2026/1744 vom 8. Juli 2026. Sie wurde am 24. Juli
2026 im Amtsblatt veröffentlicht und trat am dritten Tag nach der Veröffentlichung, 27. Juli 2026,
in Kraft [2]. Sie schrieb das Gesetz nicht neu. Sie verschob die Hochrisiko-Daten, fügte zwei
Verbote hinzu und nahm gezielte Änderungen vor, die für einen Ingenieur wichtig sind (sein
GDPR-Gegenstück ist ein separater Vorschlag, behandelt in
[die GDPR-Seite des Digital Omnibus](/bok/privacy-and-ai#the-gdpr-side-of-the-digital-omnibus),
Kapitel 19):

| Änderung | Wo | Was es für den Ingenieur bedeutet |
|---|---|---|
| Hochrisiko-Pflichten aufgeschoben | `Art. 113(c)` | Annex III ab 2027-12-02; Annex I ab 2028-08-02 |
| Zwei neue Verbote | `Art. 5(1)(ba)`, `(bb)` | Intime Bilder ohne Zustimmung und Kindesmissbrauchsmaterial, ab 2026-12-02 |
| KI-Kompetenz umformuliert | `Art. 4` | "Maßnahmen zur Unterstützung" der Kompetenz; keine garantierte Ebene |
| Grundlage für Bias-Erkennung | `Art. 4a` (`Art. 10(5)` gelöscht) | Daten besonderer Kategorien für Bias-Korrektur, mit strikten Schutzmaßnahmen |
| "Sicherheitsbauteil" verengt | `Art. 3(14)`, `6(1a)` zu `6(1c)` | Weniger eingebettete Systeme als hochriskant eingestuft |
| KMU- und kleine mittlere Unternehmen (KMU)-Erleichterung | `Arts. 11`, `17`, `63`, `99(6a)` | Vereinfachte Dokumentation und QMS; niedrigere Bußgelder |
| Wertschöpfungsketten-Zusammenarbeit | `Art. 25(2)`, `25(4)`, `99(4)(da)` | Anfängliche Anbieter müssen Dokumentation und Zugang übergeben; die Pflicht wird mit Bußgeld belegt |
| FRIA kann die DSFA wiederverwenden | `Art. 27(4)`, `27(5)` | Ein Bewertungsdatensatz, Querverweise |
| KI-Büro beaufsichtigt einige Systeme | `Arts. 75(1)`, `75a` zu `75d` | Ein zweiter Supervisor mit direkten Befugnissen |
| Cyber Resilience Act Vermutung | `Art. 42(3)` | CRA-Konformität zählt für {`Art. 15`} Cybersicherheit |
| Notifizierte Stellen | `Arts. 28` zu `30`, Annex XIV | Einzelne Anwendung; ein Designierungscode, der agentengestützte KI benennt (`AIH 0401`) |

All das Obige ist im Änderungstext [2]. Artikelnummern im Rest des Kapitels sind die
Post-Omnibus-Nummern.

## Umfang und Reichweite

### Wer ist im Geltungsbereich

Artikel 2(1) erfasst Anbieter, die KI-Systeme oder KI-Modelle mit allgemeinem Verwendungszweck auf
dem EU-Markt bereitstellen, unabhängig davon, wo sie ansässig sind; Betreiber in der Union; Anbieter
und Betreiber in Drittländern, deren Systemausgabe in der Union verwendet wird; Einführer und
Händler; Produkthersteller, die KI mit ihrem Produkt unter eigenem Namen bereitstellen;
Bevollmächtigte von Anbietern außerhalb der EU; und betroffene Personen in der Union [1].

Die Reichweite ist zweifach extraterritorial: durch Bereitstellung und durch Ausgabe [1]. Die
technische Konsequenz ist ein Registrierungsfeld. "Wo wird es gehostet?" ist nicht die Frage des
Anwendungsbereichs; "wo wird seine Ausgabe verwendet?" ist es. Ein Agentenregister, das nur die
Hosting-Region erfasst, kann diese Frage nicht beantworten.

### Was als KI-System zählt

Artikel 3(1) definiert ein **KI-System** als "ein maschinengestütztes System, das so konzipiert ist,
dass es mit unterschiedlichen Autonomieebenen arbeitet und nach der Bereitstellung anpassungsfähig
sein kann, und das zu expliziten oder impliziten Zielen aus den Eingaben, die es erhält, ableitet,
wie Ausgaben wie Vorhersagen, Inhalte, Empfehlungen oder Entscheidungen zu generieren sind, die
physische oder virtuelle Umgebungen beeinflussen können" [1]. Die Richtlinien der Kommission lesen
den Satz als sieben Elemente (maschinengestützt; Autonomie; mögliche Anpassungsfähigkeit; Ziele;
Ableitung; Ausgaben; Einfluss auf Umgebungen) und vermerken, dass nicht jedes Element in beiden der
Bau- und der Nutzungsphase vorhanden sein muss [3].

Das entscheidende Element ist die Ableitung. Die Richtlinien schließen Systeme aus, die auf Regeln
basieren, die ausschließlich von natürlichen Personen definiert werden, und nennen vier Familien,
die berechnen, aber möglicherweise außerhalb der Definition fallen: Systeme zur Verbesserung der
mathematischen Optimierung, grundlegende Datenverarbeitung, Systeme basierend auf klassischen
Heuristiken und einfache Vorhersagesysteme [3]. Die Richtlinien sind nicht bindend [3].

Für den Ingenieur ist der Anwendungsbereich eine dokumentierte Entscheidung, keine Annahme. Jeder
Registrierungseintrag trägt `ai_system: true | false` und, wenn falsch, das Element, das
fehlschlägt, und die Begründung. Ein "nicht ein KI-System"-Aufruf ohne angehängte Begründung ist das
erste, das eine Behörde fragen wird. Ein **KI-Modell mit allgemeinem Verwendungszweck** ist ein
separates Objekt mit seiner eigenen Definition (`Art. 3(63)`), das unten behandelt wird; ein Modell
ist nicht von sich aus ein KI-System und benötigt weitere Komponenten, wie eine Benutzeroberfläche,
um eines zu werden (Erwägungsgrund 97) [1]. Was "KI" technisch bedeutet, über den rechtlichen Test
hinaus, ist Gegenstand von [Kapitel 11](/bok/ai-defined#four-definitions-compared).

### Was das Gesetz ausschließt

| Ausschluss | Artikel | Worauf zu achten ist |
|---|---|---|
| Militär, Verteidigung oder nationale Sicherheit | `Art. 2(3)` | Der Ausschluss gilt für Systeme, die *ausschließlich* für diese Zwecke verwendet werden; ein Dual-Use-System fällt für seine anderen Verwendungen in den Anwendungsbereich |
| Behörden von Drittländern und internationale Organisationen bei der Strafverfolgung oder justiziellen Zusammenarbeit | `Art. 2(4)` | Nur mit angemessenen Schutzmaßnahmen für Grundrechte |
| Wissenschaftliche Forschung und Entwicklung als einziger Zweck | `Art. 2(6)` | Das System oder Modell muss speziell für diesen Zweck allein entwickelt und in Betrieb genommen werden |
| Forschung, Tests und Entwicklung vor der Bereitstellung auf dem Markt | `Art. 2(8)` | Tests unter Realbedingungen sind nicht durch den Ausschluss abgedeckt |
| Rein persönliche, nicht berufliche Nutzung | `Art. 2(10)` | Hebt Betreiberpflichten nur für natürliche Personen auf |
| Freie und quelloffene KI-Systeme | `Art. 2(12)` | Nicht, wenn als Hochrisiko auf dem Markt bereitgestellt oder erfasst von `Art. 5` oder `Art. 50` |
| Produkte unter Anlage I, Abschnitt B (Sektorbereiche) | `Art. 2(2)` | Nach dem Omnibus gelten nur `Art. 6(1)`, {`Art. 60a`} und {`Arts. 102`} bis {`112`} |

Die ersten sechs Zeilen sind im Originaltext [1]; die Zeile Abschnitt B ist wie geändert [2]. Das
Datenschutzrecht der Union gilt neben dem Gesetz in jedem Fall (`Art. 2(7)`).

## Die Risikoleiter

Das Gesetz sortiert KI-Systeme nach Zweckbestimmung auf vier Stufen und stellt KI-Modelle mit
allgemeinem Verwendungszweck auf ein separates Gleis. Ein System kann gleichzeitig auf zwei Stufen
sitzen: ein Chatbot aus Anlage III trägt sowohl die Hochrisikopflichten als auch die
{`Art. 50`}-Offenlegungspflicht.

| Stufe | Test | Folge | Artikel | Gilt ab |
|---|---|---|---|---|
| Verboten | Die Praxis ist in {`Art. 5`} aufgelistet | Darf nicht auf dem Markt bereitgestellt, in Betrieb genommen oder verwendet werden | `Art. 5` | 2025-02-02; neue Punkte 2026-12-02 |
| Hochrisiko | Sicherheitsbauteil aus Anlage I, das eine Bewertung durch Dritte benötigt, oder eine Verwendung aus Anlage III, die nicht durch {`Art. 6(3)`} herausgefiltert wird | Anforderungen von {`Arts. 8`} bis {`15`}, Anbieter- und Betreiberpflichten, Konformitätsbewertung | {`Arts. 6`} bis {`49`} | 2027-12-02 (Anlage III); 2028-08-02 (Anlage I) |
| Transparenz | Interagiert mit Personen, generiert synthetische Inhalte, erkennt Emotionen, kategorisiert biometrisch oder erstellt Deepfakes | Offenlegen, kennzeichnen, beschriften | `Art. 50` | 2026-08-02 |
| Minimal | Alles andere | Keine spezifischen Pflichten über {`Art. 4`} hinaus; freiwillige Kodizes | `Arts. 4`, `95` | 2025-02-02 ({`Art. 4`} umformuliert 2026-07-27) |
| KI-Modell-Gleis | Modellallgemeinheit; systemisches Risiko nach Fähigkeit, Rechenleistung oder Bezeichnung | Pflichten auf Modellebene | {`Arts. 51`} bis {`56`} | 2025-08-02; Kommissionsdurchsetzung 2026-08-02 |

Daten sind die von {`Art. 113`} wie geändert {[1][2]}.

### Verbotene Praktiken (Artikel 5)

Artikel 5 ist eine Liste verbotener Verwendungen, keine Risikobewertung. Wenn eine Praxis auf der
Liste steht, macht keine Minderung sie rechtmäßig. Die Liste hat jetzt zehn Punkte {[1][2]}:

| Punkt | Verbotene Praxis (paraphrasiert) | Enge Ausnahmeregelung | Gilt ab |
|---|---|---|---|
| `(a)` | Unterschwellige, manipulative oder täuschende Techniken, die Verhalten wesentlich verzerren und erheblichen Schaden verursachen oder wahrscheinlich verursachen | Keine | 2025-02-02 |
| `(b)` | Ausnutzung von Anfälligkeit aufgrund von Alter, Behinderung oder sozialer oder wirtschaftlicher Situation mit demselben Effekt | Keine | 2025-02-02 |
| `(c)` | Soziale Bewertung, die zu ungerechtfertigter oder unangemessener nachteiliger Behandlung führt | Keine | 2025-02-02 |
| `(d)` | Vorhersage des Kriminalitätsrisikos basierend ausschließlich auf Profiling oder Persönlichkeitsmerkmalen | Unterstützung einer menschlichen Bewertung basierend auf objektiven, überprüfbaren Fakten | 2025-02-02 |
| `(e)` | Ungezielte Erfassung von Gesichtsbildern zum Aufbau von Erkennungsdatenbanken | Keine | 2025-02-02 |
| `(f)` | Ableitung von Emotionen am Arbeitsplatz oder in der Bildung | Medizinische oder Sicherheitsgründe | 2025-02-02 |
| `(g)` | Biometrische Kategorisierung zur Ableitung sensibler Merkmale wie Rasse, Überzeugungen oder sexuelle Orientierung | Rechtmäßig erworbene Datensätze; Kategorisierung durch Strafverfolgung | 2025-02-02 |
| `(h)` | Echtzeit-Fernidentifizierung biometrisch in öffentlichen Räumen durch Strafverfolgung | Drei Ziele mit vorheriger Genehmigung ({`Art. 5(2)`} bis {`5(7)`}) | 2025-02-02 |
| `(ba)` | Generierung oder Manipulation realistischer intimer Bilder einer identifizierbaren Person ohne ausdrückliche Zustimmung | Bedingungen in {`Art. 5(1a)`}, {`5(1b)`} | 2026-12-02 |
| `(bb)` | Generierung oder Manipulation von Material über sexuelle Ausbeutung von Kindern (Richtlinie 2011/93/EU) | "Ohne Recht"-Verteidigung; {`Art. 5(1a)`} | 2026-12-02 |

The two Omnibus points carry an engineering test. Placing such a generator on the market is
prohibited only where that output is its intended purpose, or where the output is "a reasonably
foreseeable and reproducible outcome" and the system lacks "reasonable and adequate technical safety
measures" to prevent it and correct observed misuse; use is prohibited only where the deployer uses
it for that purpose [2]. The evidence that the safeguard holds is therefore part of the legal test.
The Commission's guidelines on the original prohibitions are non-binding [4]. The scraping ban in
point `(e)` has a data protection precedent in [the Clearview AI case](/cases/clearview-ai).

Für die meisten Organisationen `Art. 5` sind zwei Kontrollen: eine Blockliste verbotener Zwecke, die
bei der Aufnahme bewertet wird ([Policy Card](/patterns/policy-card)), und für generative Systeme
ein Ausgabe-[Runtime Guardrail](/patterns/runtime-guardrail), das von einer
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) getestet wird. Beide hinterlassen
Aufzeichnungen, die ein Regulator lesen kann. Verstöße fallen in die höchste Bußgeldkategorie (siehe
„Penalties").

> **In der Praxis (illustrativ)**
> Ein Team, das eine Bildbearbeitungsfunktion versendete, behandelte 2. Dezember 2026 als
> Release-Gate, nicht als Rechtsmemo. Es fügte eine gegnerische Suite mit Prompts für intime Bilder
> und Minderheitssicherheit zum Eval-Gate hinzu, setzte einen Null-Toleranz-Schwellenwert und
> verdrahtete die Blockentscheidungen des Ausgabeklassifizierers in den Evidenzspeicher unter der
> Obligations-ID {`EU-AIA-5-1-ba`}. Der erste Durchlauf schlug bei Bearbeitungen fehl, die die
> Exposition in bestehenden Fotos erhöhten. Der Fix wurde vor dem Datum versendet, und der
> bestandene Durchlauf, nicht eine Richtlinienerklärung, wurde zur Evidenz, dass die Schutzmaßnahme
> "angemessen und ausreichend" war.

### Hochrisiko durch Produkte (Anlage I)

Ein System ist hochrisiko unter {`Art. 6(1)`}, wenn beide Bedingungen erfüllt sind: es ist ein
Sicherheitsbauteil eines Produkts oder ist selbst ein Produkt, das von der
Harmonisierungsgesetzgebung der Union in Anlage I abgedeckt ist; und dieses Produkt muss einer
Konformitätsbewertung durch Dritte unter dieser Gesetzgebung unterzogen werden {[1]}. Abschnitt A
der Anlage I deckt Produkte wie Spielzeug, Aufzüge, Funkgeräte, Medizinprodukte und
In-vitro-Diagnostika ab; Abschnitt B deckt Sektorbereiche wie Zivilluftfahrt und Fahrzeuge ab {[1]}.

Der Omnibus verengte die Route {[2]}. Ein **Sicherheitsbauteil** muss jetzt den Zweck haben, Risiken
für Gesundheit und Sicherheit zu verhindern oder zu mindern, oder eines sein, dessen Ausfall diese
gefährdet ({`Art. 3(14)`}). KI, die ausschließlich für Benutzerunterstützung, Leistungsoptimierung,
Effizienz, Automatisierung, Komfort oder Qualitätskontrolle verwendet wird, ist kein
Sicherheitsbauteil, es sei denn, sein Ausfall würde Gesundheit und Sicherheit gefährden
({`Art. 6(1a)`}, {`6(1b)`}). Eine Bewertung durch Dritte, die nur aus nicht-sicherheitstechnischen
Gründen erforderlich ist, wie Funkspektrum, zählt nicht ({`Art. 6(1c)`}). Maschinerie wurde zu
Abschnitt B verschoben, und delegierte Rechtsakte, die bis 2. August 2027 fällig sind, können
Pflichten einschränken, wenn das Recht von Abschnitt A bereits gleichwertigen Schutz bietet
({`Art. 2(13)`}). Die Anlage-I-Route gilt ab 2. August 2028 {[2]}.

### Hochrisiko durch Verwendung (Anlage III)

Unter {`Art. 6(2)`} listet Anlage III acht Bereiche auf. Ein System, dessen Zweckbestimmung in einen
von ihnen fällt, ist hochrisiko, es sei denn, der {`Art. 6(3)`}-Filter nimmt es heraus {[1]}:

| Bereich | Was aufgelistet ist (eine Zeile) |
|---|---|
| 1. Biometrie | Fernidentifizierung biometrisch (nicht Eins-zu-eins-Verifizierung), biometrische Kategorisierung nach sensiblen Attributen, Emotionserkennung |
| 2. Kritische Infrastruktur | Sicherheitsbauteile in kritischer digitaler Infrastruktur, Straßenverkehr und Versorgung mit Wasser, Gas, Heizung oder Strom |
| 3. Bildung und berufliche Ausbildung | Zulassung, Bewertung von Lernergebnissen, Beurteilung des Bildungsniveaus, Erkennung verbotenen Verhaltens bei Tests |
| 4. Beschäftigung und Arbeitnehmerverwaltung | Rekrutierung und Auswahl, Entscheidungen über Bedingungen, Beförderung oder Beendigung, Aufgabenzuteilung, Überwachung und Leistungsbewertung |
| 5. Wesentliche private und öffentliche Dienstleistungen | Berechtigung für öffentliche Leistungen, Kreditwürdigkeit und Kreditbewertung (nicht Betrugserkennung), Preisgestaltung für Lebens- und Krankenversicherung, Triage und Versand von Notrufen |
| 6. Strafverfolgung | Opferrisiko, Polygraphen, Zuverlässigkeit von Beweisen, Rückfallrisiko nicht basierend ausschließlich auf Profiling, Profiling in Ermittlungen |
| 7. Migration, Asyl und Grenzschutz | Polygraphen, Risikobewertung von Personen, Prüfung von Anträgen, Erkennung oder Identifizierung von Personen (nicht Reisedokumentprüfungen) |
| 8. Verwaltung der Justiz und demokratische Prozesse | Unterstützung von Justizbehörden bei Fakten und Recht (und ADR), Beeinflussung von Wahlen oder Wahlverhalten |

Die Kommission kann Anwendungsfälle zu Anlage III durch Delegierungsakt hinzufügen (`Art. 7`) [1],
sodass die Tabelle Anlage III des Intake-Klassifizierers Daten mit einer Version ist, keine
hartcodierte Liste. Was Punkt 5 verhindert, ist im
[niederländischen Fall der Kinderbetreuungsleistungen](/cases/dutch-childcare-benefits) sichtbar.

### Der Anlage-III-Filter und die Profiling-Ausnahme

Nach `Art. 6(3)` ist ein System der Anlage III nicht hochrisikobehaftet, wenn es kein erhebliches
Risiko für Schäden an Gesundheit, Sicherheit oder Grundrechten darstellt, auch nicht durch
wesentliche Beeinflussung des Ergebnisses von Entscheidungsfindung. Der Filter gilt, wenn mindestens
eine von vier Bedingungen erfüllt ist [1]:

1. das System führt eine enge Verfahrensaufgabe durch;
2. es verbessert das Ergebnis einer zuvor abgeschlossenen menschlichen Tätigkeit;
3. es erkennt Entscheidungsmuster oder Abweichungen, ohne die abgeschlossene menschliche Bewertung
   ohne ordnungsgemäße menschliche Überprüfung zu ersetzen oder zu beeinflussen;
4. es führt eine vorbereitende Aufgabe für eine Bewertung durch, die für einen Anwendungsfall der
   Anlage III relevant ist.

Eine Ausnahme schlägt alle vier: ein System der Anlage III, das
**natürliche Personen profiliert, ist immer hochrisikobehaftet** [1]. Ein Anbieter, der sich auf den
Filter stützt, muss seine Bewertung vor dem Inverkehrbringen des Systems dokumentieren, es
registrieren (`Art. 6(4)`, `Art. 49(2)`), und die Dokumentation den Behörden auf Anfrage aushändigen
[1]. Das Omnibus-Paket hat diesen Registrierungsdatensatz gekürzt und die Zusammenfassung der Gründe
und die Liste der Mitgliedstaaten aus Anlage VIII, Abschnitt B gelöscht [2].

Die Klassifizierungsrichtlinien der Kommission mit praktischen Beispielen sollten bis 2. Februar
2026 nach `Art. 6(5)` vorliegen. Ein Entwurf wurde am 19. Mai 2026 veröffentlicht, mit einer
gezielten Konsultation bis 23. Juli 2026; ab 2026-09-24 präsentiert die Seite der Kommission sie
noch immer als Entwurf [5][6]. Bis sie endgültig sind, ist eine gute Dokumentation des Ingenieurs
die beste Verteidigung, nicht ein gutes Argument.

> **Beispiel (illustrativ)**
> Ein Klassifizierungsentscheidungsdatensatz, eingereicht in der Registrierung und neu bewertet,
> wenn sich die Zweckbestimmung ändert:
>
> ```json
> { "system": "cv-screen-02", "annex_iii_point": "4(a)",
>   "art_6_3_condition": "preparatory_task", "profiling": true,
>   "result": "high-risk", "reason": "profiling override, Art. 6(3) third subparagraph",
>   "reviewed_by": "ai-governance", "date": "2026-09-24" }
> ```
>
> Das explizite `profiling`Flag ist der Punkt: der Filter wurde geltend gemacht, und die Ausnahme
> hat ihn besiegt.

Dieser Datensatz ist die Ausgabe des
[Intake- und Klassifizierungs](/bok/the-role#intake-and-classification)-Workflows und befindet sich
in Schicht 2 (Inventory & Transparency); die Regel, die ihn berechnet, befindet sich in Schicht 1.

### Transparenzfälle (Artikel 50)

Artikel 50 wird oft als die "begrenzte Risiko"-Stufe bezeichnet. Er gilt für jedes KI-System, das
einen seiner Fälle erfüllt, unabhängig davon, was das System sonst ist [1]:

| Fall | Pflichtträger | Pflicht | Artefakt | Schicht |
|---|---|---|---|---|
| `50(1)`: interagiert direkt mit Personen | Anbieter | Personen müssen wissen, dass es KI ist, sofern nicht offensichtlich | Schnittstellenoffenlegung; ein Test, dass sie angezeigt wird | 4 · 3 |
| `50(2)`: erzeugt synthetische Audio-, Bild-, Video- oder Textinhalte | Anbieter | Maschinenlesbares, erkennbares Kennzeichen | Wasserzeichen oder Herkunftsmetadaten; Kennzeichnungstest in CI | 4 · 3 |
| `50(3)`: Emotionserkennung oder biometrische Kategorisierung | Betreiber | Informieren Sie die exponierten Personen | Mitteilung zum Zeitpunkt der Exposition | 2 |
| `50(4)`: Deepfakes | Betreiber | Offenlegung der Manipulation (leichter für offensichtliche Kunst oder Satire) | Inhaltsbezeichnung; Veröffentlichungsprüfung | 4 |
| `50(4)`: KI-Text, der die Öffentlichkeit informiert | Betreiber | Offenlegung, sofern nicht menschliche redaktionelle Verantwortung | Redaktionskontrolldatensatz oder Bezeichnung | 2 · 4 |

Die Information muss Personen spätestens bei der ersten Interaktion oder Exposition erreichen
(`Art. 50(5)`) [1]. Der Artikel gilt seit 2. August 2026; generative Systeme, die bereits vor diesem
Datum auf dem Markt waren, haben bis 2. Dezember 2026 Zeit, Ausgaben zu kennzeichnen (`Art. 111(4)`)
[2]. Der endgültige Verhaltenskodex zur Transparenz von KI-generierten Inhalten (10. Juni 2026)
enthält einen Anbieterabschnitt zur Kennzeichnung und einen Betreiberabschnitt zur Kennzeichnung,
und die Kommission und das KI-Board bestätigten ihn als angemessenes freiwilliges Instrument; die
Kommission veröffentlichte ihre Richtlinien zu den {`Art. 50`}-Transparenzverpflichtungen am 20.
Juli 2026, nach einem Entwurf vom 8. Mai 2026 [9][14]. Recht außerhalb des Gesetzes erreicht auch
synthetische Medien: siehe
[Deepfakes und synthetische Medien](/bok/existing-law#deepfakes-and-synthetic-media) in Kapitel 20.

### Minimales Risiko

Alles andere ist minimales Risiko. Das Gesetz verlangt nichts Spezifisches davon außer KI-Kompetenz
(`Art. 4`) und lädt zu freiwilligen Verhaltenskodizes ein (`Art. 95`) [1]. "Minimal" ist eine
Rechtskategorie, kein Risikoverdikt: Datenschutz-, Verbraucher-, Produkthaftungs- und
Antidiskriminierungsrecht gelten weiterhin (siehe
[bestehendes Recht](/bok/existing-law#how-to-read-this-chapter) und
[Datenschutz und KI](/bok/privacy-and-ai#principles-applied-to-ai)), und Ihre eigene
[Risikomanagement](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix) kann ein
System mit minimalem Risiko für Ihre Organisation als hochrisikobehaftet einstufen.

## KI-Modelle mit allgemeinem Verwendungszweck

### Modell, System und das indikative Kriterium

Ein **GPAI-Modell** ist ein KI-Modell, das "erhebliche Allgemeingültigkeit aufweist und eine breite
Palette unterschiedlicher Aufgaben kompetent ausführen kann" und in eine Vielzahl nachgelagerter
Systeme integriert werden kann, ausgenommen Modelle, die für Forschung, Entwicklung oder Prototyping
vor dem Inverkehrbringen verwendet werden (`Art. 3(63)`) [1]. Ein **GPAI-System** ist ein KI-System,
das auf einem solchen Modell basiert (`Art. 3(66)`) [1]. Die Richtlinien der Kommission geben ein
indikatives Kriterium: Trainingsrechenleistung über 10^23 FLOP und die Fähigkeit, Sprache (Text oder
Audio), Text-zu-Bild oder Text-zu-Video zu generieren [7].

### Pflichten jedes GPAI-Anbieters

| Pflicht | Artikel | Artefakt | Schicht |
|---|---|---|---|
| Technische Dokumentation (Anlage XI) für das KI-Büro und nationale Behörden auf Anfrage | `Art. 53(1)(a)` | Modelldokumentation mit Trainings-, Test- und Evaluierungsergebnissen | 2 |
| Informationen für nachgelagerte Anbieter (Anlage XII) | `Art. 53(1)(b)` | Model Card; Hinweise zu Fähigkeiten und Einschränkungen; Integrationsleitfaden | 2 |
| Urheberrechtspolitik, einschließlich Einhaltung von Text-und-Daten-Mining-Opt-outs | `Art. 53(1)(c)` | Quellenfilterungsregeln als Code; Opt-out-Einhaltungsprotokoll | 1 · 2 |
| Öffentliche Zusammenfassung des Trainingsinhalts nach Vorlage des KI-Büros | `Art. 53(1)(d)` | Zusammenfassung generiert aus Datensatzherkunftsdatensätzen | 2 |
| Bevollmächtigter in der Union für Anbieter außerhalb der EU | `Art. 54` | Schriftliches Mandat; Dokumentation 10 Jahre lang aufbewahrt | 5 |

Die Pflichten und ihre Details sind im Gesetz [1]; die Zeilen Kapitel 08 für
[`Art. 53` und `Art. 55`](/bok/regulatory-map#eu-ai-act-post-omnibus) enthalten die Daten und die
Behörde. Das Urheberrecht hinter der {`Art. 53(1)(c)`}-Politik ist in Kapitel 20
([Urheberrechtspolitik und TDM-Opt-outs](/bok/existing-law#copyright-and-training-data)).

### Systemisches Risiko: Schwellenwert, Benachrichtigung, Bezeichnung

Ein GPAI-Modell hat **systemisches Risiko**, wenn es Fähigkeiten mit hoher Wirkkraft hat, oder wenn
die Kommission es nach den Kriterien der Anlage XIII bezeichnet (`Art. 51(1)`) [1]. Fähigkeiten mit
hoher Wirkkraft werden über 10^25 FLOP kumulativer Trainingsrechenleistung vermutet, ein
Schwellenwert, den die Kommission ändern kann (`Art. 51(2)`, `51(3)`) [1]. Der Anbieter muss die
Kommission innerhalb von zwei Wochen nach Erreichen des Schwellenwerts oder nach Kenntnis davon
benachrichtigen, dass er ihn erreichen wird, und kann argumentieren, dass das Modell ausnahmsweise
kein systemisches Risiko darstellt (`Art. 52`) [1].

Das Engineering-Artefakt ist ein **Rechenleistungs-Ledger**: kumulative Trainings-FLOP pro
Modellabstammung, mit der Schätzmethode, und eine Warnung, wenn *geplante* Rechenleistung den
Schwellenwert überschreitet, da die Zwei-Wochen-Frist vor Trainingsende beginnen kann.

### Pflichten für Modelle mit systemischem Risiko

Zusätzlich zu `Arts. 53` und `54` muss der Anbieter das Modell mit modernen Protokollen
einschließlich adversarialer Tests evaluieren; systemische Risiken auf Unionsebene bewerten und
mindern; ernsthafte Vorfälle verfolgen, dokumentieren und ohne unangemessene Verzögerung dem KI-Büro
melden; und angemessene Cybersicherheit für das Modell und seine physische Infrastruktur
gewährleisten (`Art. 55(1)`) [1]. Die Artefakte sind das [eval gate](/patterns/eval-gate-in-ci) und
die Red-Team-Suite, ein systemisches-Risiko-Register, die
[incident pipeline](/patterns/incident-pipeline) nach der Berichtsvorlage der Kommission (siehe
[Kapitel 08](/bok/regulatory-map#gpai-code-of-practice)) und Gewichtssicherheitskontrollen.

### Open-Source-Ausnahmen und ihre Grenzen

Ein Modell, das unter einer freien und Open-Source-Lizenz veröffentlicht wird, mit seinen Gewichten,
Architektur und Nutzungsinformationen öffentlich, ist von {`Art. 53(1)(a)`} und {`(b)`} und von der
Bevollmächtigtenpflicht befreit (`Arts. 53(2)`, `54(6)`) [1]. Die Ausnahme deckt niemals ein
systemisches-Risiko-Modell ab, und die Urheberrechtspolitik und Trainingszusammenfassung gelten
weiterhin [1]. Monetarisierung besiegt sie: die Richtlinien behandeln Dual-Lizenzierung, bezahlten
Support, ohne den das Modell nicht verwendet werden kann, und exklusives bezahltes Hosting als
Monetarisierung [7]. Das Omnibus-Paket hält GPAI-Modelle in der
{`Art. 25(4)`}-Schriftvereinbarungspflicht, auch wenn sie offen veröffentlicht werden [2].

### Wenn ein Fine-Tuner ein GPAI-Anbieter wird

Ein Modifier wird nur dann Anbieter eines neuen GPAI-Modells, wenn die Änderung für
Allgemeingültigkeit, Fähigkeiten oder systemisches Risiko erheblich ist. Das indikative Kriterium
der Richtlinien ist Modifikationsrechenleistung über ein Drittel der ursprünglichen
Trainingsrechenleistung (oder, falls unbekannt, ein Drittel von 10^25 FLOP für ein
systemisches-Risiko-Original und von 10^23 FLOP andernfalls), und die {`Art. 53(1)`}-Pflichten des
Modifiers sind dann auf die Modifikation und ihre Daten beschränkt; {`Art. 54`} gilt, und wenn das
Original ein systemisches-Risiko-Modell ist, wird das modifizierte Modell vermutet, systemisches
Risiko zu haben, sodass der Modifier die Kommission benachrichtigt (`Art. 52`) und die
{`Art. 55`}-Pflichten erfüllt [7]. Halten Sie diesen Test getrennt von {`Art. 25`}: Fine-Tuning
eines *Modells* ändert den GPAI-Anbieterstatus; Änderung der *Systemzweckbestimmung* in Anlage III
ändert den Hochrisiko-Anbieterstatus. Zwei Tests, zwei Objekte, zwei Registrierungsfelder.

### Der Verhaltenskodex und die Durchsetzung

Der Verhaltenskodex für KI-Modelle mit allgemeinem Verwendungszweck wurde am 10. Juli 2025
veröffentlicht. Seine Kapitel zu Transparenz und Urheberrecht gelten für alle GPAI-Anbieter, sein
Kapitel zu Sicherheit nur für systemische-Risiko-Modelle, und die Kommission und das KI-Board
bestätigten ihn als angemessenes freiwilliges Instrument [8]. Anbieter können sich darauf stützen,
bis ein harmonisierter Standard existiert; Nicht-Unterzeichner müssen angemessene alternative Mittel
nachweisen (`Arts. 53(4)`, `55(2)`) [1]. GPAI-Verpflichtungen gelten seit 2. August 2025,
Kommissionsbußgelder nach {`Art. 101`} seit 2. August 2026, und Modelle, die vor 2. August 2025 auf
den Markt gebracht wurden, müssen bis 2. August 2027 konform sein (`Art. 111(3)`) [1][7].

## Hochrisiko-Anforderungen (Artikel 8 bis 15)

Artikel 8 verlangt, dass ein hochrisikobehaftetes System Abschnitt 2 von Kapitel III erfüllt, unter
Berücksichtigung seiner Zweckbestimmung und des Stands der Technik [1]. Die Anforderungen sind
Gestaltungspflichten des Anbieters. In einer Tabelle, mit dem Artefakt, das jede evidenziert:

| Artikel | Anforderung in einer Zeile | Artefakt | Schicht |
|---|---|---|---|
| `Art. 9` | Ein Risikomanagementsystem, das als kontinuierlicher, iterativer Prozess über den Lebenszyklus durchgeführt wird, einschließlich Tests und vernünftigerweise vorhersehbarer Fehlanwendung | Risikoregister als Code, verknüpft mit Eval-Ergebnissen und der FRIA | 1 · 3 |
| `Art. 10` | Trainings-, Validierungs- und Testdaten, die relevant, ausreichend repräsentativ und soweit möglich frei von Fehlern und vollständig sind; Verzerrung untersucht und gemindert | Data Cards, Lineage, Bias- und Qualitätstests in CI | 2 · 3 |
| `Art. 11` | Technische Dokumentation (Anlage IV) vor dem Inverkehrbringen, aktuell gehalten; vereinfachte Form für KMU und KMC | AIBOM; generierte technische Dokumentation; Model Card | 2 |
| `Art. 12` | Automatische Aufzeichnung von Ereignissen über die Lebensdauer des Systems zur Nachverfolgbarkeit | Strukturierte, manipulationssichere Ereignisprotokolle und Traces | 4 |
| `Art. 13` | Betriebsanleitungen für Betreiber, einschließlich erklärter Genauigkeit, Einschränkungen und Aufsichtsmaßnahmen | Betriebsanleitungen als Code; Model Card | 2 |
| `Art. 14` | Menschliche Aufsicht: Personen können die Automatisierung verstehen, überwachen, sich Automatisierungsverzerrungen bewusst bleiben, interpretieren, außer Kraft setzen und das System stoppen | Kontrollpunkte mit menschlicher Beteiligung; Außerkraftsetzungspfad; Kill Switch | 4 |
| `Art. 15` | Genauigkeit, Robustheit und Cybersicherheit über den gesamten Lebenszyklus, einschließlich Abwehr gegen Vergiftung, adversariale Beispiele und Vertraulichkeitsangriffe | Eval Gate; Red-Team Suite; Sicherheitskontrollen | 3 · 4 |

Die Anforderungen sind in der Verordnung [1]; das KMU- und KMC-Formular in `Art. 11(1)` ist eine
Omnibus-Ergänzung [2]. Kapitel 14 erstellt
[die technische Datei](/bok/governing-development#the-technical-file) aus Pipeline-Datensätzen.
`Art. 14(5)` fügt eine Zwei-Personen-Verifizierung vor dem Handeln bei einer biometrischen
Fernidentifizierung hinzu, mit Ausnahmen bei der Strafverfolgung, Migration, Grenzkontrolle und Asyl
[1]; siehe [Gestaltung menschlicher Aufsicht](/bok/the-stack#designing-human-oversight-article-14)
und das [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Ein Hochrisiko-KI-System
innerhalb der Cyberresilienz-Verordnung, das die Bedingungen von Artikel 12 Absatz 1 erfüllt, gilt
als erfüllend der {`Art. 15`} Cybersicherheitsanforderung (`Art. 42(3)`) [2], sodass ein
Sicherheitsnachweispaket beiden Regelwerken dienen kann.

## Pflichten des Anbieters über die Anforderungen hinaus

### Artikel 16 und das Qualitätsmanagementsystem (Artikel 17)

Artikel 16 ist der Rahmen für die Pflichten des Anbieters: die Anforderungen, Name des Systems, QMS,
Dokumentation, Protokolle, Konformitätsbewertung, Erklärung, CE-Kennzeichnung, Registrierung,
Korrekturmaßnahmen, Zusammenarbeit und Barrierefreiheit [1]. Kapitel 08 schlüsselt es Artikel für
Artikel auf.

Das QMS muss als schriftliche Richtlinien, Verfahren und Anweisungen dokumentiert werden, die
mindestens 13 Aspekte abdecken, von einer Compliance-Strategie mit Änderungsmanagement,
Designkontrolle, Tests und Datenverwaltung bis zum {`Art. 9`} Risikosystem, Beobachtung nach dem
Inverkehrbringen, Meldung von Vorfällen, Aufzeichnungspflichten und einem Rechenschaftsrahmen
(`Art. 17(1)`) [1]. Es ist proportional zur Größe des Anbieters, die der Omnibus nun für KMU und KMC
spezifiziert, ohne die erforderliche Strenge zu senken, und KMU ohne Partner- oder verbundene
Unternehmen können bestimmte Elemente vereinfacht erfüllen (`Arts. 17(2)`, `63`) [2]. Als Ingenieur
gelesen, ist das QMS die Pipeline plus ihre Datensätze: versionierte Richtlinien, Änderungskontrolle
und die Gates, die bei jeder Freigabe ausgeführt werden. Der Artikel-17-Standard ist veröffentlicht,
aber nicht im Amtsblatt zitiert, und ISO/IEC 42001 ist nicht das Artikel-17-QMS (siehe
[Kapitel 08](/bok/regulatory-map#what-is-not-harmonised-yet) und Kapitel 22 über
[harmonisierte Normen und die Vermutung der Konformität](/bok/principles-and-standards#how-presumption-of-conformity-works)).

### Konformitätsbewertung, Erklärung, Kennzeichnung und Registrierung

Anlage III Punkte 2 bis 8 verwenden interne Kontrolle (Anlage VI) ohne notifizierte Stelle;
Biometrie (Punkt 1) kann interne Kontrolle nur verwenden, wenn harmonisierte Normen oder gemeinsame
Spezifikationen vollständig angewendet wurden, und benötigt andernfalls eine notifizierte Stelle
(Anlage VII) (`Art. 43(1)`, `43(2)`) [1]. Anlage I, Abschnitt A Produkte folgen dem Sektorverfahren,
das nun ausdrücklich die Anforderungen von Abschnitt 2 und eine QMS-Bewertung einschließt; ihre
notifizierten Stellen müssen sich bis 28. Januar 2028 zur Benennung unter der Verordnung bewerben
(`Art. 43(3)`) [2]. Eine wesentliche Veränderung löst eine neue Bewertung aus (`Art. 43(4)`) [1].

Der Anbieter erstellt dann die EU-Konformitätserklärung (`Art. 47`), bringt die CE-Kennzeichnung an
(`Art. 48`) und registriert das System in der EU-Datenbank (`Arts. 49`, `71`) [1]. Dokumentation
wird 10 Jahre lang aufbewahrt (`Art. 18`) und Protokolle mindestens sechs Monate (`Art. 19`) [1].
Jede ist eine Ausgabe der Pipeline: die Erklärung wird aus der Evidenz generiert, dass die Gates
bestanden haben, und der Registrierungsdatensatz wird aus der Registrierung gepusht.

### Beobachtung nach dem Inverkehrbringen und schwerwiegende Vorfälle (Artikel 72 und 73)

Der Anbieter führt ein System zur Beobachtung nach dem Inverkehrbringen durch, das aktiv
Leistungsdaten, auch von Betreibern, sammelt und analysiert, um die kontinuierliche Einhaltung zu
bewerten (`Art. 72(1)`, `72(2)`) [1]. Sein Plan ist Teil der Dokumentation nach Anlage IV, und der
Omnibus ersetzte die überfällige Durchführungsverordnung durch Leitlinien der Kommission und eine
Vorlage, die bis 2. September 2027 fällig ist (`Art. 72(3)`) [2].
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) ist das
Überwachungssystem; der Plan ist seine versionierte Konfiguration.

Schwerwiegende Vorfälle werden der Marktüberwachungsbehörde unmittelbar nach Feststellung eines
Kausalzusammenhangs oder dessen angemessener Wahrscheinlichkeit gemeldet, und in jedem Fall auf den
{`Art. 73`} Uhren, jede gezählt ab dem Zeitpunkt, an dem der Anbieter (oder Betreiber) sich des
Vorfalls bewusst wird: 15 Tage allgemein, zwei Tage für eine weit verbreitete Verletzung oder eine
schwerwiegende und irreversible Störung der Verwaltung oder des Betriebs kritischer Infrastruktur
(`Art. 3(49)(b)`), und 10 Tage nach einem Todesfall [1]. Kapitel 08 enthält die
[Meldungsuhren-Tabelle](/bok/regulatory-map#eu-ai-act-post-omnibus); Kapitel 17 behandelt
[Vorfälle](/bok/incidents#the-overlapping-clocks) von Anfang bis Ende. Anbieter von
Hochrisiko-Systemen unter der direkten Zuständigkeit des KI-Büros melden stattdessen dem KI-Büro
(`Art. 75(1a)`) [2].

## Wer Sie in der Wertschöpfungskette sind

### Die EU-Akteur-Rollen

Die Verordnung bindet **Akteure** (`Art. 3(8)`): Anbieter, Produkthersteller, Betreiber,
Bevollmächtigte, Einführer und Händler [1]. Das GPAI-Kapitel fügt den GPAI-Anbieter und den
nachgelagerten Anbieter hinzu. Die Tabelle ordnet jede Rolle in den Begriffen des Ingenieurs: was
sie produziert und was sie von jemand anderem sammeln muss.

| Rolle | Wer es ist (eigene Worte) | Kernaufgaben | Evidenz, die sie produziert | Evidenz, die es sammelt |
|---|---|---|---|---|
| Anbieter (`Art. 3(3)`) | Entwickelt ein KI-System oder GPAI-Modell oder lässt es entwickeln und bringt es unter seinem Namen auf den Markt oder in Betrieb | `Arts. 8` bis `17`, `43` bis `49`, `72`, `73`; `50(1)`, `50(2)` | Technische Dokumentation, QMS-Datensätze, Eval-Ergebnisse, Erklärung | Informationen zu vorgelagerten Modellen; {`Art. 25(4)`} Vereinbarungen |
| Betreiber (`Art. 3(4)`) | Nutzt ein KI-System unter seiner Autorität, nicht für persönliche, nicht-berufliche Nutzung | `Arts. 26`, `27`, `50(3)`, `50(4)`, `86` | Nutzungsprotokolle, Aufsichtsliste, FRIA, Mitteilungen | Betriebsanleitungen, Erklärung, Registrierungs-ID |
| Einführer (`Art. 3(6)`) | EU-ansässig; bringt auf den Markt ein System mit dem Namen eines Anbieters außerhalb der EU | `Art. 23`: Überprüfung der Bewertung, Dokumente und Kennzeichnung des Anbieters; Kopien 10 Jahre aufbewahren | Einfuhrprüfungsdatensatz | Zertifikat, Erklärung, Anleitungen |
| Händler (`Art. 3(7)`) | Stellt ein System zur Verfügung, ohne sein Anbieter oder Einführer zu sein | `Art. 24`: Überprüfung der Kennzeichnung und Dokumente; nicht konforme Systeme zurückhalten | Vertriebsprüfungsdatensatz | Der gleiche Satz |
| Bevollmächtigter (`Art. 3(5)`) | EU-ansässig, mit schriftlichem Mandat eines Anbieters außerhalb der EU | `Arts. 22`, `54`: Überprüfung, Dokumente 10 Jahre aufbewahren, Zusammenarbeit, Mandat bei Verstoß beenden | Mandat; Dokumentkopien | Alles vom Anbieter |
| Produkthersteller (`Art. 25(3)`) | Bringt eine Hochrisiko-Sicherheitskomponente mit seinem Produkt nach Anlage I, Abschnitt A unter seinem Namen auf den Markt | Anbieter-Pflichten (`Art. 16`) | Als Anbieter | Lieferantendokumentation |
| GPAI-Anbieter (`Art. 53`) | Der Anbieter eines GPAI-Modells | `Arts. 53` bis `55` | Modelldokumentation, Trainingszusammenfassung, Urheberrechtspolitik | Datenherkunft und Lizenzen |
| Nachgelagerter Anbieter (`Art. 3(68)`) | Integriert ein KI-Modell, sein eigenes oder ein Modell eines Dritten, in ein KI-System | Anbieter-Pflichten für das System | Systemdokumentation | Informationen nach Anlage XII |

Die Pflichten sind in {`Arts. 16`} bis {`27`} und {`53`} bis {`55`} [1]. Die **betroffene Person**
ist im Geltungsbereich (`Art. 2(1)(g)`) als Inhaber von Schutzmaßnahmen, nicht von Pflichten [1].

### Artikel 25: wenn jemand anderes der Anbieter wird

Ein Händler, Einführer, Betreiber oder eine andere dritte Partei wird zum Anbieter eines
Hochrisiko-Systems mit allen {`Art. 16`} Pflichten in drei Fällen (`Art. 25(1)`) [1]:

1. er bringt seinen Namen oder seine Marke auf einem Hochrisiko-System an, das bereits auf dem Markt
   ist, vorbehaltlich von Verträgen, die die Verpflichtungen anderweitig zuordnen;
2. er nimmt eine wesentliche Veränderung an einem Hochrisiko-System vor, das Hochrisiko bleibt;
3. er ändert die Zweckbestimmung eines Systems, das nicht hochrisikobehaftet war, einschließlich
   eines KI-Systems mit allgemeinem Verwendungszweck, so dass es hochrisikobehaftet wird.

Eine **wesentliche Veränderung** ist eine ungeplante Änderung nach dem Inverkehrbringen, die die
Einhaltung beeinträchtigt oder die bewertete Zweckbestimmung ändert (`Art. 3(23)`) [1]. Wenn ein
Auslöser aktiviert wird, hört der ursprüngliche Anbieter auf, der Anbieter dieses Systems zu sein,
muss aber mit dem neuen zusammenarbeiten; der Omnibus spezifiziert nun, dass dies Dokumentation
bedeutet, die ausreicht, um die Einhaltung zu bewerten, bekannte Einschränkungen und Ausfallmodi
sowie gezielten technischen Zugang zum Testen, es sei denn, der ursprüngliche Anbieter hatte jede
Änderung in ein Hochrisiko-System klar ausgeschlossen (`Art. 25(2)`) [2]. Hochrisiko-Anbieter und
ihre Lieferanten von Systemen, Modellen, Tools und Komponenten müssen die erforderlichen
Informationen und den Zugang in einer schriftlichen Vereinbarung festlegen (`Art. 25(4)`), und
Verstöße gegen beide Absätze werden nun in der mittleren Stufe geahndet (`Art. 99(4)(da)`) [2].

In der Pipeline sind die drei Auslöser erkennbare Ereignisse: eine White-Label- oder Markenänderung,
ein Retraining, das die Konformität berührt, und eine Konfigurationsänderung, die
{`intended_purpose`} in einen Anlage-III-Wert verschiebt. Jede sollte eine Rollenbewertung und ein
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) Ticket auslösen
(siehe [Drittanbieter- und beschaffte KI](/bok/the-stack#third-party-and-procured-ai)).

> **Beispiel (illustrativ)**
> Ein HR-Team konfiguriert einen Chat-Assistenten mit allgemeinem Verwendungszweck, den es unter
> einer Herstellerlizenz bereitstellt, um Stellenbewerber zu bewerten. Die Konfiguration verschiebt
> die Zweckbestimmung in Anlage III, Punkt 4(a), also unter {`Art. 25(1)(c)`} wird die Organisation
> zum Anbieter eines Hochrisiko-Systems: {`Arts. 8`} bis {`17`}, Konformitätsbewertung und
> Registrierung sind nun ihre Pflichten. Ob sie mit etwas anfängt, hängt vom Vertrag ab. Wenn der
> Hersteller die Hochrisikonutzung nicht ausgeschlossen hat, verpflichtet {`Art. 25(2)`} ihn,
> Dokumentation, bekannte Einschränkungen und Testzugang zu übergeben. Wenn er es ausgeschlossen
> hat, erstellt die Organisation die Evidenz allein. Die Ausschlussklausel in den
> Herstellerbedingungen bestimmt die Größe des Evidenzbudgets.

### Rollen benennen Aufgaben, nicht Organisationen

Eine Rolle ist an eine Aktivität auf einem bestimmten System gebunden, nicht an ein Unternehmen.
Eine Bank ist der Anbieter des Kreditmodells, das sie entwickelt hat, der Betreiber dieses Modells
in ihren Filialen ("Inbetriebnahme" umfasst auch die Eigennutzung, `Art. 3(11)` [1]) und der
Betreiber eines Chatbots eines Anbieters. Das Register erfasst Rollen pro System als Liste:
`["provider", "deployer"]` für ein internes System, `["deployer"]` für ein beschafftes System.

### Dieselben Rollen in verschiedenen Regelwerken

Die Begriffe unterscheiden sich zwischen den Gesetzen; die Aufgaben selten. Die Zuordnungsspalte ist
die Lesart dieses Kapitels, keine rechtliche Äquivalenz.

| Regelwerk | Rolle | Was es abdeckt (eigene Begriffe) | Nächste EU-Rolle (unsere Zuordnung) |
|---|---|---|---|
| KI-Verordnung [1] | Anbieter; Betreiber; Einführer; Händler; Bevollmächtigter; Produkthersteller | Wie in der obigen Tabelle | Referenzpunkt |
| Colorado SB 26-189 [10] | Developer | Entwickelt Entscheidungstechnologie, die in folgenreichen Entscheidungen verwendet wird; dokumentiert sie für Betreiber | Anbieter |
| Colorado SB 26-189 [10] | Betreiber | Nutzt sie in folgenreichen Entscheidungen; informiert Verbraucher; führt mindestens drei Jahre lang Aufzeichnungen | Betreiber |
| Texas HB 149 (TRAIGA) [11] | Developer | Entwickelt ein KI-System, das in Texas angeboten oder bereitgestellt wird | Anbieter |
| Texas HB 149 (TRAIGA) [11] | Betreiber | Betreibt ein KI-System zur Verwendung in Texas | Betreiber |
| Korea AI Basic Act [12] | Geschäftsbetreiber der KI-Entwicklung | Entwickelt und stellt KI bereit | Anbieter |
| Korea AI Basic Act [12] | Geschäftsbetreiber der KI-Nutzung | Bietet Produkte oder Dienstleistungen an, die auf KI eines Entwicklungsunternehmens basieren | Nachgelagerter Anbieter oder Betreiber |
| Korea AI Basic Act [12] | User; betroffene Person | Erhält die Dienstleistung; Leben, Sicherheit oder Rechte sind erheblich betroffen | Geschützt, kein Pflichtträger |
| ISO/IEC 22989 [13] | KI-Anbieter, Hersteller, Kunde, Partner, Betroffener; zuständige Behörden (zur Überprüfung) | Vokabular-Rollen, keine rechtlichen Pflichten | Nützlich in Verträgen |

Colorados Gesetz wurde am 14. Mai 2026 unterzeichnet und seine Pflichten gelten ab 1. Januar 2027
[10]. Das koreanische Gesetz (Fassung seit 21. Juli 2026 in Kraft) erfasst Handlungen im Ausland,
die den koreanischen Markt oder Nutzer beeinflussen, und verlangt einen inländischen Vertreter für
ausländische Betreiber über Verordnungsschwellen (`Arts. 4`, `36`) [12]. Die ISO/IEC 22989-Liste und
ihre Klausel (5.19) sind zur Überprüfung gekennzeichnet [13]. Siehe
[Kapitel 08](/bok/regulatory-map#us-federal-and-state-laws) und
[AI laws worldwide](/bok/ai-laws-worldwide#comparing-the-regimes) für diese Regelwerke im Kontext.

## Pflichten des Betreibers (Artikel 26)

Artikel 26 ist die Liste der Betreiberpflichten für Hochrisiko-Systeme. Aufgegliedert in
Unterpflichten, jede mit einem Artefakt [1]:

| Unterpflicht | Abs. | Artefakt | Schicht |
|---|---|---|---|
| Nutze es gemäß den Betriebsanleitungen | `26(1)` | Bereitstellungskonfiguration an die Betriebsanleitung gebunden; Richtlinienprüfung bei Bereitstellung | 1 · 2 |
| Weise kompetente, geschulte, befugte Aufseher zu | `26(2)` | Aufseher-Verzeichnis verknüpft mit Schulungsunterlagen; Human-in-the-loop Gate | 4 · 5 |
| Halte Eingabedaten relevant und repräsentativ, wo du sie kontrollierst | `26(4)` | Eingabedaten-Checks; Bereitstellungs-Data Card | 2 · 3 |
| Überwache; informiere den Anbieter; unterbreche bei Risiko; melde schwerwiegende Vorfälle | `26(5)` | Monitoring-Hooks; Unterbrechungsschalter; Incident Pipeline | 4 · 5 |
| Führe Protokolle mindestens sechs Monate lang | `26(6)` | Protokoll-Aufbewahrungsrichtlinie als Code | 4 |
| Informiere Arbeitnehmer und ihre Vertreter vor Nutzung am Arbeitsplatz | `26(7)` | Benachrichtigungs- und Konsultationsprotokoll | 2 |
| Öffentliche Stellen: registriere die Nutzung; nutze niemals nicht registrierte Systeme | `26(8)` | Register synchronisiert mit der EU-Datenbank-ID | 2 |
| Speise die `Art. 13`-Informationen des Anbieters in die DSFA ein | `26(9)` | DSFA mit Querverweisen auf die Betriebsanleitung | 1 · 2 |
| Nach biometrischer Fernidentifizierung: Genehmigung, Protokollierung, Berichte | `26(10)` | Genehmigungsprotokoll; Pro-Nutzungs-Protokoll | 5 |
| Informiere Personen, die Annex-III-Entscheidungen unterliegen | `26(11)` | [Entscheidungsmitteilung](/patterns/decision-notice-contest-path) zum Zeitpunkt der Entscheidung | 2 · 4 |
| Kooperiere mit Behörden | `26(12)` | Evidenzexport auf Anfrage | 5 |

Finanzinstitute erfüllen die Überwachungs- und Protokollierungspflichten durch ihre
Governance-Regeln für Finanzdienstleistungen [1]. Die Sicht des Betreibers auf beschaffte Systeme
wird in [governing deployment](/bok/governing-deployment#operating-the-system) entwickelt.

> **In der Praxis (illustrativ)**
> Bei einem großen Telekommunikationsunternehmen hörten die Betreiberpflichten auf, ein Fragebogen
> zu sein, sobald jede ein Registrierungsfeld mit einem Eigentümer wurde. `oversight_roster` wies
> auf benannte Personen hin, deren Schulungsunterlagen aktuell waren; {`log_retention_days`} wurde
> gegen die Sechsmonats-Untergrenze durch einen Richtlinientest überprüft; {`worker_notice_ref`}
> verknüpft mit dem Konsultationsprotokoll, bevor ein Arbeitsplatz-Tool eingeschaltet werden konnte.
> Die Audit-Frage "zeige mir deine Artikel-26-Kontrollen für dieses System" wurde zu einer
> Registrierabfrage pro System.

## Grundrechte-Folgenabschätzung (Artikel 27)

**Wer.** Vor der Bereitstellung eines Annex-III-Systems (außer Punkt 2, kritische Infrastruktur) ist
eine Grundrechte-Folgenabschätzung erforderlich von Betreibern, die Behörden sind oder private
Einrichtungen, die öffentliche Dienste erbringen, und von Betreibern von Kreditscoring (Punkt 5(b))
und Lebens- und Krankenversicherungspreis-Festsetzung (Punkt 5(c)) [1].

**Wann.** Vor der ersten Nutzung; der Betreiber kann sich auf frühere
Grundrechte-Folgenabschätzungen oder auf die Folgenabschätzung des Anbieters in ähnlichen Fällen
stützen und muss sie aktualisieren, wenn sich ein Element ändert (`Art. 27(2)`) [1].

**Was.** Die Prozesse des Betreibers, die das System nutzen; der Zeitraum und die Häufigkeit der
Nutzung; die Kategorien betroffener Personen; die spezifischen Schadensrisiken für sie, unter
Verwendung der {`Art. 13`}-Informationen des Anbieters; die Maßnahmen der menschlichen Aufsicht; und
die Maßnahmen, wenn Risiken eintreten, einschließlich interner Governance und Beschwerdeverfahren
(`Art. 27(1)(a)` bis `(f)`) [1].

**Dann.** Der Betreiber benachrichtigt die Marktüberwachungsbehörde über die Ergebnisse auf der
Vorlage des Büros für Künstliche Intelligenz (`Art. 27(3)`) [1]. Nach dem Omnibus kann er relevante
DSFA-Abschnitte kreuzverweis oder einbeziehen, und die Vorlage muss dies ermöglichen (`Art. 27(4)`,
`27(5)`) [2]. Die Pflicht gilt ab 2. Dezember 2027 mit dem Annex-III-Regime [2]. Baue es als
[KI-Governance-Engineering-as-Code](/patterns/fria-as-code): ein versionierter Datensatz, der aus
dem Register, der Betriebsanleitung und der DSFA generiert wird, sodass eine Aktualisierung ein Diff
ist, keine Umschreibung.

## Erklärung und Benachrichtigung betroffener Personen

**Das Recht auf Erklärung (`Art. 86`).** Eine Person, die einer Entscheidung eines Betreibers
unterliegt, die auf der Ausgabe eines Annex-III-Hochrisiko-Systems basiert (außer Punkt 2), das
rechtliche Auswirkungen oder ähnlich erhebliche Auswirkungen erzeugt, die die Person als nachteilig
für ihre Gesundheit, Sicherheit oder Grundrechte erachtet, kann "klare und aussagekräftige
Erklärungen über die Rolle des KI-Systems im Entscheidungsfindungsprozess und die Hauptelemente der
getroffenen Entscheidung" erhalten [1]. Das Recht unterliegt Ausnahmen im Unions- oder nationalen
Recht und gilt nur, wenn das Unionsrecht es nicht bereits vorsieht [1], weshalb es mit DSGVO-Rechten
zu automatisierten Entscheidungen gelesen werden muss (siehe
[privacy and AI](/bok/privacy-and-ai#the-regimes-side-by-side)).

Das Artefakt ist ein [**Erklärungsprotokoll**](/patterns/explanation-artefact) pro Entscheidung:
System- und Modellversion, die Eingaben oder Grund-Codes hinter der Ausgabe, ob die Ausgabe
bestimmend oder beratend war, und die Person, die entschieden hat; Methoden sind in
[fairness and explainability](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records),
mit dem, was das
[Recht auf Erklärung (Art. 86)](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
vom Inhalt verlangt. Zeitlich sitzt {`Art. 86`} in Kapitel IX, das ab 2. August 2026 gilt, hat aber
nur Arbeit zu tun, sobald Annex-III-Systeme ab 2. Dezember 2027 reguliert werden. Das ist diese
Kapitel-Lesart; bestätige es mit Rechtsberater (zur Überprüfung).

**Die anderen Benachrichtigungen.** Arbeitnehmer vor Nutzung am Arbeitsplatz (`Art. 26(7)`);
Personen, die Annex-III-Entscheidungen unterliegen (`Art. 26(11)`); Personen, die Emotionserkennung
oder biometrischer Kategorisierung ausgesetzt sind (`Art. 50(3)`); und jeder, der einer Deepfake
ausgesetzt ist (`Art. 50(4)`) [1]. Jede Person kann sich bei einer Marktüberwachungsbehörde
beschweren (`Art. 85`), und Whistleblower, die Verstöße gegen das Gesetz melden, sind unter
Richtlinie (EU) 2019/1937 geschützt (`Art. 87`) [1].

## KI-Kompetenz und Bias-Erkennungsdaten

**KI-Kompetenz (`Art. 4`).** Seit 27. Juli 2026 müssen Anbieter und Betreiber "Maßnahmen ergreifen,
um die Entwicklung der KI-Kompetenz" ihres Personals und anderer, die KI-Systeme in ihrem Namen
betreiben oder nutzen, zu unterstützen, unter Berücksichtigung ihres Wissens, des Nutzungskontexts
und der betroffenen Personen, ohne ein bestimmtes Niveau garantieren zu müssen [2]. Es bindet jeden
Anbieter und Betreiber auf jeder Stufe. Das Artefakt ist ein rollenbasiertes Kompetenzprogramm,
dessen Abschlussunterlagen an Registrierrollen gebunden sind, sodass niemand als
{`Art. 26(2)`}-Aufseher eingetragen ist, ohne einen aktuellen Datensatz zu haben.

**Bias-Erkennungsdaten (`Art. 4a`).** Anbieter von Hochrisiko-Systemen dürfen ausnahmsweise
besondere Kategorien personenbezogener Daten verarbeiten, wenn dies streng erforderlich ist für
Bias-Erkennung und -Korrektur, wenn andere Daten (einschließlich synthetischer oder anonymisierter
Daten) nicht funktionieren würden, die Daten pseudonymisiert, gesichert, zugriffskontrolliert und
niemals weitergegeben sind, sie gelöscht werden, sobald der Bias korrigiert ist, und die
Verarbeitungsunterlagen erklären, warum [2]. {`Art. 4a(2)`} erweitert die Grundlage auf andere
KI-Systeme und Modelle und auf Betreiber von Hochrisiko-Systemen, ohne eine Pflicht zu schaffen [2].
Das Artefakt ist eine kontrollierte Enklave mit Zugriffslogs und automatischer Löschung (siehe
[data governance across the stack](/bok/the-stack#data-governance-across-the-stack)).

## Reallabore und Tests unter Realbedingungen

**Reallabore (`Arts. 57` bis `59`).** Jeder Mitgliedstaat muss bis 2. August 2027 mindestens ein
nationales KI-Reallabor in Betrieb haben, ein Datum, das der Omnibus von 2. August 2026 verschoben
hat [1][2]. Das Büro für Künstliche Intelligenz kann ein Reallabor auf Unionsebene für die Systeme
unter seiner direkten Zuständigkeit betreiben, mit Priorität für KMU und KMC, und ein Reallabor-Plan
kann Tests unter Realbedingungen einbeziehen [2]. {`Art. 59`} setzt die Bedingungen für die weitere
Verarbeitung personenbezogener Daten in einem Reallabor für Systeme von öffentlichem Interesse [1].

**Tests unter Realbedingungen (`Arts. 60`}, `60a`}, `61`}).** Anbieter dürfen Annex-III-Systeme und
nach dem Omnibus Annex-I-Abschnitt-A-Systeme unter Realbedingungen außerhalb eines Reallabors testen
[2]. Die Bedingungen umfassen einen von der Marktüberwachungsbehörde genehmigten Plan, eine
Registrierung mit einer Unionsweiten Identifikationsnummer, maximal sechs Monate, verlängerbar um
sechs, informierte Zustimmung, die datiert und dokumentiert ist, wirksame Aufsicht, Ausgaben, die
rückgängig gemacht werden können, und {`Art. 73`}-Meldung schwerwiegender Vorfälle [1].
Mitgliedstaaten dürfen Tests von Annex-I-Abschnitt-B-Produkten unter nationalen Rahmen zulassen
(`Art. 60a`}) [2]. Ein Test unter Realbedingungen ist ein Produktionssystem mit zusätzlicher
Evidenz: ein Plan als Code, Zustimmungsunterlagen, ein Rückgängig-Pfad und Incident-Hooks.

## Governance und Durchsetzung

### Wer beaufsichtigt was

| Stelle | Stufe | Rolle | Grundlage |
|---|---|---|---|
| Büro für Künstliche Intelligenz | Union | Kommissionsfunktion; beaufsichtigt GPAI-Modelle, Codes und Vorlagen und nach dem Omnibus einige KI-Systeme | `Arts. 3(47)`, `64`, `75`, `88` bis `94` |
| Europäischer KI-Rat | Union | Ein Vertreter pro Mitgliedstaat; EDSB-Beobachter; Büro für Künstliche Intelligenz ohne Stimmrecht | `Arts. 65`, `66` |
| Beratungsforum und wissenschaftliches Gremium | Union | Stakeholder-Expertise; unabhängige Experten, die qualifizierte Warnungen zu GPAI-Systemrisiken auslösen können | `Arts. 67`, `68`, `90` |
| Zuständige nationale Behörden | National | Mindestens eine notifizierende Behörde und eine Marktüberwachungsbehörde mit einer zentralen Kontaktstelle | `Art. 70` |
| Marktüberwachungsbehörden | National | Durchsetzung der KI-System-Regeln mit Befugnissen gemäß Verordnung (EU) 2019/1020 und Quellcode-Zugang auf begründete Anfrage | `Art. 74` |
| Notifizierte Stellen | Benannt | Konformitätsbewertung durch Dritte, begrenzt durch Annex-XIV-Codes | `Arts. 28` bis `39` |
| Grundrechtsbehörden | National | Dokumentation über die Marktüberwachungsbehörde beschaffen | `Art. 77` |

Die Marktüberwachung folgt dem Sektor [1]: Produktbehörden für Annex-I-Systeme, Abschnitt A
(`Art. 74(3)`), Finanzaufseher für regulierte Finanzinstitute (`Art. 74(6)`) und Datenschutz- oder
andere benannte Behörden für Biometrie bei Strafverfolgung, Grenzmanagement und Justiz sowie für
Annex III Punkte 6 bis 8 (`Art. 74(8)`). Die Annex-XIV-Codes und die `Art. 77`-Regeln sind
Omnibus-Text [2].

### Die direkten Befugnisse des Büros für Künstliche Intelligenz (Artikel 75 und 75a bis 75d)

Das Omnibus machte das Büro für Künstliche Intelligenz ausschließlich zuständig für zwei Gruppen von
KI-Systemen [2]: Systeme, die auf einem KI-Modell mit allgemeinem Verwendungszweck desselben
Anbieters oder Unternehmens aufgebaut sind (außer Annex-I-Produkte, Annex III Punkt 2, Justizsysteme
unter Punkt 8 sowie Strafverfolgungs-, Grenz- und Finanzsysteme unter `Art. 74(6)`), und Systeme,
die sich in oder sind sehr große Online-Plattformen oder Suchmaschinen. Die Zuständigkeit umfasst
Anbieter und Betreiber nur innerhalb desselben Unternehmens [2].

Die Artikel 75a bis 75d geben dem Büro für Künstliche Intelligenz Ermittlungen,
Informationsanfragen, Inspektionen, Anordnungen zur Gewährung von Zugang und Erklärungen sowie zur
Datenspeicherung (`Art. 75a`); verbindliche Zusagen (`Art. 75b`); Nichtkonformitätsentscheidungen
mit `Art. 99` Geldstrafen und periodischen Strafzahlungen von bis zu 5% des durchschnittlichen
Tageseinkommens oder des weltweiten Jahresumsatzes pro Tag (`Art. 75c`); und Verteidigungsrechte und
Veröffentlichung von Entscheidungen (`Art. 75d`) [2]. Sie befinden sich in Kapitel IX, das ab 2.
August 2026 gilt [1][2]. Wenn Sie Systeme auf Ihrem eigenen KI-Modell mit allgemeinem
Verwendungszweck aufbauen, muss Ihr Nachweisspeicher Brüssel so schnell wie eine nationale Behörde
beantworten.

### Strafen

| Verstoß | Obergrenze | Grundlage |
|---|---|---|
| Verbotene Praktiken im KI-Bereich (`Art. 5`) | EUR 35 Millionen oder 7% des weltweiten Jahresumsatzes, je nachdem welcher Betrag höher ist | `Art. 99(3)` |
| Verpflichtungen des Akteurs: Anbieter (`Art. 16`), Bevollmächtigte (`22`), Einführer (`23`), Händler (`24`), Betreiber (`26`), notifizierte Stellen, Transparenz (`50`); nach dem Omnibus auch `Art. 25(2)`, `25(4)` | EUR 15 Millionen oder 3%, je nachdem welcher Betrag höher ist | `Art. 99(4)` |
| Falsche, unvollständige oder irreführende Informationen an notifizierte Stellen oder nationale Behörden | EUR 7,5 Millionen oder 1%, je nachdem welcher Betrag höher ist | `Art. 99(5)` |
| KMU und Start-ups; nach dem Omnibus auch SMC für die beiden unteren Stufen | Der niedrigere Betrag und der Prozentsatz | `Art. 99(6)`, `99(6a)` |
| Anbieter von KI-Modellen mit allgemeinem Verwendungszweck, bei vorsätzlichen oder fahrlässigen Verstößen | 3% oder EUR 15 Millionen, je nachdem welcher Betrag höher ist, durch Kommissionsentscheidung | `Art. 101` |
| Systeme unter der direkten Zuständigkeit des Büros für Künstliche Intelligenz | `Art. 99` Stufen, zuzüglich periodischer Strafzahlungen | `Art. 75c` |

Die Stufen befinden sich in `Arts. 99` und {`101`} [1], mit den Omnibus-Ergänzungen in
{`Arts. 75c`}, {`99(4)(da)`} und {`99(6a)`} [2]. Die Mitgliedstaaten entscheiden, ob und wie
öffentliche Stellen mit Geldstrafen belegt werden {`Art. 99(8)`}) [1]. Zwei der Faktoren, die
Behörden berücksichtigen, sind der Grad der Verantwortung "unter Berücksichtigung der umgesetzten
technischen und organisatorischen Maßnahmen" und ob der Akteur den Verstoß selbst angezeigt hat
{`Art. 99(7)(g)`}, {`(h)`}) [1]. Ihr Nachweis ist auch Ihr Entschuldigungsargument.

## Der Zeitplan nach dem Omnibus

| Datum | Was gilt | Grundlage |
|---|---|---|
| 2024-08-01 | Die Verordnung tritt in Kraft | `Art. 113` [1][2] |
| 2025-02-02 | Kapitel I und II: Definitionen, KI-Kompetenz und die ursprünglichen Verbote | `Art. 113(a)` [1] |
| 2025-08-02 | Regeln für notifizierte Stellen, Verpflichtungen für KI-Modelle mit allgemeinem Verwendungszweck, Governance, Strafen (außer `Art. 101`) und Vertraulichkeit; nationale Kontaktstellen veröffentlicht | `Art. 113(b)`, `Art. 70(2)` [1] |
| 2026-07-27 | Omnibus in Kraft: umformulierte `Art. 4`, neue {`Art. 4a`}, Änderungen anderer Rechtsakte ({`Arts. 102`} bis {`110`}) | Omnibus {`Art. 4`}; {`Art. 113(d)`} {[2]} |
| 2026-08-02 | Allgemeine Anwendung: {`Art. 50`} Transparenz, Kommissionsstrafen für Anbieter von KI-Modellen mit allgemeinem Verwendungszweck, Maßnahmen in Kapitel VI einschließlich Test unter Realbedingungen und das Durchsetzungskapitel einschließlich {`Arts. 75a`} bis {`75d`} | `Art. 113` [1][2] |
| 2026-12-02 | Neue Verbote {`Art. 5(1)(ba)`} und {`(bb)`}; {`Art. 50(2)`} Kennzeichnung für generative Systeme, die vor 2026-08-02 in den Verkehr gebracht wurden | `Art. 113(a)`, `Art. 111(4)` [2] |
| 2027-08-02 | KI-Modelle mit allgemeinem Verwendungszweck, die vor 2025-08-02 in den Verkehr gebracht wurden, müssen konform sein; nationale Reallabore betriebsbereit; delegierte Rechtsakte zur Begrenzung der Pflichten für Annex-I-Systeme, Abschnitt A, fällig | `Arts. 111(3)`, `57(1)`, `2(13)` [1][2] |
| 2027-09-02 | Leitlinien und Vorlage der Kommission für den Plan zur Beobachtung nach dem Inverkehrbringen fällig | `Art. 72(3)` [2] |
| 2027-12-02 | Hochrisiko, Annex III: Klassifizierung, Anforderungen, Anbieter- und Betreiberpflichten, Grundrechte-Folgenabschätzung | `Art. 113(c)(i)` [2] |
| 2028-01-28 | Notifizierte Stellen für Annex I, Abschnitt A, beantragen Benennung gemäß der Verordnung | `Art. 43(3)` [2] |
| 2028-08-02 | Hochrisiko, Annex I ({`Art. 6(1)`}) | `Art. 113(c)(ii)` [2] |
| 2030-08-02 | Hochrisiko-Systeme, die vor dem Kapitel-III-Datum für die Verwendung durch öffentliche Behörden bestimmt waren, müssen konform sein | `Art. 111(2)` [2] |
| 2030-12-31 | Komponenten von Annex-X-Großsystemen der Informationstechnik, die vor 2027-08-02 in den Verkehr gebracht wurden, müssen konform sein | `Art. 111(1)` [1] |

Andere Hochrisiko-Systeme, die bereits vor dem Kapitel-III-Datum auf dem Markt waren, unterliegen
der Verordnung nur, wenn sich ihre Auslegung nach diesem Datum erheblich ändert ({`Art. 111(2)`} wie
geändert) [2]. "Erhebliche Änderung der Auslegung" ist daher ein Ereignis, das die Pipeline
protokollieren sollte, mit der Begründung, jedes Mal wenn ein Legacy-System geändert wird.

## Was Sie diese Woche tun können

1. **Add three fields to every registry entry:** `eu_roles` (a list, per system), `risk_rung` with
   the article that put it there, and `output_used_in_eu`. Run
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) to find the systems that have no
   entry.
2. **Write the classification decision record** for every Annex III candidate, with the `Art. 6(3)`
   condition relied on and the profiling flag stated explicitly, and store it next to the system.
   The [AI Act triage](/toolkit/ai-act-triage) drafts one against the
   [schema](/schemas/classification-decision-record.v1.json).
3. **Gate die Verbote vom 2. Dezember 2026.** Setzen Sie {`Art. 5(1)(ba)`} und {`(bb)`} auf die
   Denylist der Aufnahme und fügen Sie eine adversariale Suite für jeden Bild-, Video- oder
   Sprachgenerator zum Eval Gate vor diesem Datum hinzu.
4. **Lesen Sie Ihre Vendor-Bedingungen für {`Art. 25`}.** Finden Sie die Klausel, die die
   Hochrisiko-Nutzung ausschließt, und die schriftliche Vereinbarung unter {`Art. 25(4)`}; öffnen
   Sie ein Due-Diligence-Ticket überall dort, wo eine Hochrisiko-Komponente weder das eine noch das
   andere hat.
5. **Testen Sie die {`Art. 50`} Oberflächen, die bereits live sind.** Überprüfen Sie, dass jede
   Chat-Schnittstelle die KI-Nutzung offenlegt und jeder Generator seine Ausgabe kennzeichnet, und
   archivieren Sie die bestandene Überprüfung als Nachweis.

**Zuordnung:** EU AI Act {`Arts. 2`}, {`3`}, {`4`}, {`4a`}, {`5`}, {`6`}, {`8`} bis {`27`}, {`43`}
bis {`50`}, {`51`} bis {`57`}, {`60`} bis {`61`}, {`72`} bis {`75d`}, {`86`}, {`99`}, {`101`},
{`111`}, {`113`} (wie geändert durch Verordnung (EU) 2026/1744) · GPAI Code of Practice · Code of
Practice on Transparency of AI-generated Content · Colorado SB 26-189 · Texas HB 149 · Korea AI
Basic Act · ISO/IEC 22989 · alle fünf Stack-Schichten. Zuordnungen sind illustrativ, keine
Konformitätserklärung.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (original text: Arts. 2, 3, 5 to 27, 43, 49 to 61, 64 to 75, 85 to 87, 99, 101, 111, 113; Annexes I, III, VIII). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230; OJ L, 2026/1744, 24.7.2026; in force on the third day after publication (amended Arts. 2, 3(14), 4, 4a, 5, 6, 10, 11, 17, 25, 27, 42, 43, 50, 56, 57, 60, 60a, 63, 72, 75, 75a to 75d, 77, 99, 111, 113; Annexes I, VIII, XIV). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (seven elements; four out-of-scope families; non-binding; formal text C(2025) 5053 final). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[4] Commission Guidelines on prohibited artificial intelligence practices, as defined by the AI Act (non-binding; authoritative interpretation reserved to the CJEU). European Commission. 2025-02-04. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act (verified: primary)
[5] Draft Commission guidelines on the classification of high-risk AI systems (Art. 6; Annex I and Annex III sections; practical examples; draft for targeted consultation). European Commission. 2026-05-19. https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems (verified: primary)
[6] Guidelines for providers and deployers of AI high-risk systems (policy page: classification guidelines still in draft, consultation open until 23 July 2026; application dates 2 Dec 2027 and 2 Aug 2028). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems (verified: primary)
[7] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; 10^23 FLOP indicative criterion; one-third modification criterion; monetisation; notification within two weeks; fines from 2 Aug 2026). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[8] The General-Purpose AI Code of Practice (published 10 July 2025; Transparency, Copyright, and Safety and Security chapters; confirmed as an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[9] Code of Practice on Transparency of AI-generated Content (final version 10 June 2026; provider marking and detection, deployer labelling; confirmed as an adequate voluntary tool; Art. 50 guidelines: draft 8 May 2026, final 20 July 2026). European Commission. 2026-06-10. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content (verified: primary)
[10] SB26-189 Automated Decision-Making Technology (signed 14 May 2026; developer and deployer duties; covered technology from 1 Jan 2027; deployer records kept at least three years). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[11] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text (Sec. 552.001 definitions of developer and deployer). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[12] Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 21311 as amended 20 Jan 2026, version in force 21 Jul 2026 (Art. 2(7) to (9) roles; Art. 4 reach; Arts. 31 to 36 duties and domestic representative). Korea Ministry of Government Legislation (law.go.kr). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791 (verified: primary)
[13] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (edition 1; AI stakeholder roles). ISO/IEC JTC 1/SC 42. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[14] Guidelines on transparency obligations for providers and deployers of AI systems (Art. 50; final text after the draft of 8 May 2026; obligations apply from 2 Aug 2026). European Commission. 2026-07-20. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems (verified: primary)
