---
lang: de
source: bok/21-ai-laws-worldwide.md
sourceHash: "191fdd18bca59f606083a61658b834845a9e9def3e8488c400b329303f5e4f2a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 21. KI-spezifische Gesetze weltweit

> Außerhalb der EU reicht KI-spezifisches Recht von Koreas horizontalem Basic Act bis zu
> US-amerikanischen Staatsstatuten, öffentlichen Sektordirektiven und freiwilligen Rahmenwerken;
> dieses Kapitel datiert jedes Regime und nennt das Artefakt, das jede Pflicht nachweist.

## Wie man dieses Kapitel liest

Dieses Kapitel ist ein Feldführer zu den KI-spezifischen Regeln, die neben der KI-Verordnung der EU
stehen. Es ist für den Ingenieur geschrieben, der einen Satz von Kontrollen mehreren Regimen
gleichzeitig unterziehen muss, nicht für den Anwalt, der sich zu einem von ihnen äußern muss.
Kapitel 18 behandelt die [KI-Verordnung der EU](/bok/eu-ai-act#how-to-read-this-chapter)
ausführlich; Kapitel 19 behandelt Datenschutz und Datenschutz, einschließlich
[der Regime außerhalb der EU](/bok/privacy-and-ai#beyond-the-eu-uk-us-brazil-and-china); Kapitel 20
behandelt das [andere Recht, das bereits für KI gilt](/bok/existing-law#how-to-read-this-chapter);
Kapitel 22 behandelt
[Prinzipien, weiches Recht und Standards](/bok/principles-and-standards#the-instruments-at-a-glance),
einschließlich der internationalen Verträge. Kapitel 08 bleibt der
[umgekehrte Index](/bok/regulatory-map#other-jurisdictions), der jede Verpflichtung in ein Artefakt
und eine Schicht umwandelt.

Jeder Eintrag unten folgt derselben Vorlage: **Status**, **Daten**, **Geltungsbereich**,
**Schlüsselpflichten**, **Durchsetzung** und die **Artefakte, die die Einhaltung nachweisen**. Jeder
Status ist mit **Stand 2026-09-24** gestempelt. Wenn eine Regel an diesem Datum noch in Bewegung war
oder ein Fakt nicht gegen eine primäre Quelle bestätigt werden konnte, sagt die Kopie dies und trägt
ein `(verify)`-Tag. Übersetzungen von koreanischen, japanischen, chinesischen, italienischen,
spanischen und portugiesischen Begriffen sind unsere, sofern eine Quelle keine offizielle gibt.

Das Status-Vokabular hat vier Werte, dieselben vier, die der Jurisdiktionsdatensatz der Website
verwendet:

- **Bindend, horizontal.** Ein in Kraft befindliches Gesetz, das sektorübergreifend gilt (Korea,
  Italien, Japans Förderungsgesetz).
- **Bindend, gezielt.** Bindende Regeln, die auf eine Verwendung, einen Sektor, eine Klasse von
  Entwicklern oder den öffentlichen Sektor beschränkt sind (die US-Staaten, die US-Bundesbehörden,
  Chinas Abteilungsregeln, Kanadas Richtlinie).
- **Freiwillig.** Rahmenwerke, Leitlinien und Grundsätze ohne angehängte Sanktionen (Singapur, der
  KI-spezifische Ansatz des Vereinigten Königreichs, Indien, Australien).
- **Gesetzentwurf.** Noch nicht Gesetz (Brasilien, Spaniens nationaler KI-Gesetzentwurf).

Die technische Lesart ist die, die Kapitel 06
[regulatory translation](/bok/the-role#regulatory-translation) nennt: Die meisten dieser Regelungen
verlangen denselben kleinen Satz von Artefakten (ein Verzeichnis, eine Klassifizierungsentscheidung,
eine Mitteilung, ein Label, eine Risikobewertung, ein Vorfallbericht, ein für einen festen Zeitraum
aufbewahrter Datensatz). Was sich unterscheidet, ist der Auslöser, die Formulierung der Mitteilung,
die Frist für den Bericht, der Empfänger und der Durchsetzer. Bauen Sie die Kontrolle einmal im
Stack auf und parametrisieren Sie sie pro Gerichtsbarkeit; das
[Framework Crosswalk](/patterns/framework-crosswalk)-Muster ist der Ort, an dem diese Parameter
leben. Dies ist keine Rechtsberatung, und die Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Die Landschaft auf einen Blick

| Gerichtsbarkeit | Hauptinstrument | Status (Stand 2026-09-24) | Art | Wer setzt durch |
|---|---|---|---|---|
| Südkorea | AI Basic Act und Enforcement Decree | Seit 2026-01-22 in Kraft; Bußgelder unterliegen einer Orientierungsfrist von mindestens einem Jahr [1][2][3] | Verbindlich, horizontal | Ministry of Science and ICT (MSIT) |
| Vereinigte Staaten (Bundesebene) | EO 14179, EO 14365, OMB M-25-21, M-25-22 und M-26-04 | Für Bundesbehörden in Kraft; kein Bundesgesetz für private Akteure [5][6][8][10] | Verbindlich, gezielt | OMB und Behörden; DOJ-Taskforce gegen Staatsgesetze |
| Vereinigte Staaten (Bundesstaaten) | Colorado SB 26-189, Texas HB 149, California SB 53, SB 942, AB 2013, SB 243 und CPPA-Regeln, New York RAISE und GBL Art. 47, Utah, Illinois, NYC LL 144 | Gemischt: mehrere in Kraft, Colorado ab 2027-01-01, RAISE ab 2027-01-01 [15][18][19][26] | Verbindlich, gezielt | Generalstaatsanwälte und Behörden der Bundesstaaten |
| Japan | AI Promotion Act (Act No. 53 of 2025) | Vollständig seit 2025-09-01 in Kraft [31][32] | Verbindlich, horizontal (fördernd; keine Sanktionen) | Cabinet AI Strategy Headquarters |
| China | CAC-Abteilungsregeln, zuletzt die Maßnahmen zur anthropomorphen Interaktion | In Kraft; neueste vom 2026-07-15 [35] | Verbindlich, gezielt | Cyberspace Administration of China (CAC) |
| Brasilien | PL 2338/2023 | Gesetzentwurf: am 2024-12-10 vom Senat verabschiedet; wartet auf Bericht in der Kammer [36][37] | Gesetzentwurf | Noch nicht im Gesetz benannt |
| Kanada | Directive on Automated Decision-Making | Für Bundesinstitutionen in Kraft; AIDA erloschen [38][39] | Verbindlich, gezielt | Treasury Board of Canada Secretariat |
| Indien | India AI Governance Guidelines | Veröffentlicht 2025-11-05; kein KI-Gesetz [40] | Freiwillig | MeitY (nur Leitlinien) |
| Vereinigtes Königreich | Grundsätze, die von bestehenden Regulierungsbehörden angewendet werden; ATRS; AI Cyber Security Code of Practice | Nicht gesetzlich für KI als solche [41][43][44] | Freiwillig | Bestehende Sektorregulierungsbehörden (zum Beispiel die ICO, FCA und MHRA) |
| Italien | Law 132/2025 | Seit 2025-10-10 in Kraft [46] | Verbindlich, horizontal | AgID und ACN, plus Finanzaufseher |
| Spanien | Gesetzentwurf zur guten Nutzung und Governance von KI; AESIA; Sandbox | Gesetzentwurf nicht angenommen; Sandbox und Leitlinien live [47][48][49] | Gesetzentwurf | AESIA und Sektorbehörden (wie vorgeschlagen) |
| Singapur | Model AI Governance Frameworks (einschl. agentic), AI Verify | Freiwillig [50][51][53] | Freiwillig | IMDA (Leitlinien) |
| Australien | National AI Plan; Guidance for AI Adoption | Bestehendes Recht gilt; kein KI-Gesetz [54] | Freiwillig | Bestehende Regulierungsbehörden; AI Safety Institute berät |

Dieselben Regelungen werden als [eine Kachelkarte nach Gerichtsbarkeit](/figures/jurisdiction-tiles)
dargestellt.

## Südkorea: das AI Basic Act

Südkorea hat ein horizontales KI-Gesetz in Kraft, das Betreiberpflichten und Bußgelder mit sich
bringt. Sein formeller Name ist das Basic Act on the Development of Artificial Intelligence and the
Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 20676 [1]. Der
Großteil des Gesetzes ist Industriepolitik (ein nationaler KI-Strategieausschuss, Trainingsdaten,
KI-Cluster, Industrieunterstützung); die Pflichten, die für den Ingenieur wichtig sind, sitzen in
Kapitel 4, Artikel 31 bis 36, und in den Durchsetzungsbestimmungen der Artikel 40 und 43 [1].

### Status und Daten

Das Gesetz wurde am 21. Januar 2025 verkündet und trat am 22. Januar 2026 in Kraft; der Teil der
Definition mit hohem Einfluss, der digitale medizinische Geräte abdeckt, begann am 24. Januar 2026
[1]. Ein änderndes Gesetz, No. 21311 vom 20. Januar 2026, überarbeitete Artikel 2 und andere
Bestimmungen vor Inkrafttreten. Eine zweite Gruppe seiner Änderungen trat am 21. Juli 2026 in Kraft:
Ein zweiter Satz in Artikel 35(1) verlangt, dass die Folgenabschätzung die Merkmale von
KI-gefährdeten Gruppen widerspiegelt, und Artikel 16(3) und (4) weisen öffentliche Stellen an, beim
Kauf zunächst designierte KI-Produkte zu berücksichtigen, und befreien die Beamten, die sie kaufen
oder verwenden, von der Haftung gegenüber ihrer Behörde für einen daraus resultierenden Verlust,
außer bei Vorsatz oder grober Fahrlässigkeit [1]. Das Enforcement Decree, Presidential Decree No.
36053, wurde am 21. Januar 2026 verkündet und trat am 22. Januar 2026 in Kraft [2]. Das MSIT, die
zuständige Behörde, kündigte eine Orientierungsfrist von mindestens einem Jahr an, während der
Tatsachenfeststellungsuntersuchungen und Verwaltungsbußgelder ausgesetzt sind, außer in sehr
außergewöhnlichen Fällen, wie Todesfälle oder Menschenrechtsverletzungen [3]. Die Kulanzfrist gilt
für die Bußgelder, nicht für die Pflichten: Die Verpflichtungen gelten seit dem 22. Januar 2026.
Eine Dekretänderung, die ab dem 21. Juli 2026 in Kraft trat, Presidential Decree No. 36506,
definierte die KI-gefährdeten Gruppen (darunter Menschen mit Behinderungen, Menschen ab 65 Jahren,
Menschen mit Anspruch auf Arbeitslosenunterstützung und Frauen mit Karriereunterbrechungen),
richtete die Bestätigung von KI-Produkten durch das Ministerium für öffentliche Beschaffung ein und
änderte Dekret Artikel 28(1), so dass die Identifizierung betroffener Personen in der
Folgenabschätzung diese Gruppen widerspiegelt [2][4]. Die anderen unten beschriebenen
Betreiberpflichten sind unverändert.

### Umfang und Pflichtträger

Das Gesetz erfasst Verhalten im Ausland, das den koreanischen Markt oder koreanische Nutzer betrifft
(Artikel 4(1)), und schließt KI aus, die ausschließlich für Verteidigung oder nationale Sicherheit
entwickelt und verwendet wird, wie vom Dekret angegeben (Artikel 4(2); Dekret Artikel 2) [1][2]. Der
Pflichtträger ist der **KI-Geschäftsbetreiber**, den das Gesetz in zwei Rollen aufteilt: der
Betreiber, der KI entwickelt und bereitstellt, und der Betreiber, der von einem anderen
bereitgestellte KI nutzt, um sein eigenes Produkt oder seine eigene Dienstleistung anzubieten
(Artikel 2(7)) [1]. Die Aufteilung ähnelt dem EU-Anbieter und Betreiber, ist aber nicht identisch:
Beide Rollen tragen die Transparenz- und Hochrisikopflichten, und das Dekret lässt einen nutzenden
Betreiber sich auf die Risikomanagement-, Erklär- und Nutzerschutzmaßnahmen des Entwicklers
verlassen, es sei denn, er ändert wesentlich den Zweck oder die Verwendung des Systems (Dekret
Artikel 27(3)) [2].

### Hochrisiko-KI und wie sie bestätigt wird

**Hochrisiko-KI** ist ein KI-System, das das menschliche Leben, die physische Sicherheit oder
Grundrechte erheblich beeinträchtigen oder gefährden kann und das in einem der Bereiche verwendet
wird, die das Gesetz auflistet (Artikel 2(4)) [1]:

- Energieversorgung; die Herstellung von Trinkwasser; die Erbringung von Gesundheitsdiensten; die
  Entwicklung und Verwendung von Medizinprodukten und digitalen Medizinprodukten; die sichere
  Verwaltung von Kernmaterialien und -anlagen;
- die Analyse und Verwendung biometrischer Informationen für strafrechtliche Ermittlungen oder
  Verhaftung;
- Urteile oder Bewertungen, die Individualrechte und -pflichten erheblich beeinflussen,
  **wie Einstellungs- und Kreditscreening**;
- der Hauptbetrieb von Transportmitteln, Einrichtungen und Systemen;
- Entscheidungen von Staatsbehörden, Kommunalverwaltungen und öffentlichen Institutionen, die Bürger
  betreffen, wie Berechtigungsprüfungen und die Erhebung von Gebühren für öffentliche Dienste;
- Schülerbewertung in Früherziehung, Primar- und Sekundarbildung;
- jeder weitere Bereich, der durch Präsidialverordnung benannt wird.

Der Betreiber muss im Voraus überprüfen, ob sein System hochriskant ist, und kann das MSIT um
Bestätigung bitten (Artikel 33(1)) [1]. Das Dekret verwandelt die Anfrage in eine Datei: eine
Übersicht über das Produkt oder die Dienstleistung, eine Übersicht über die Trainingsdaten,
Material, das zeigt, wie das System verwendet wird und was es produziert, und alle anderen
unterstützenden Dokumente. Das MSIT berücksichtigt den Bereich, die Auswirkung, Schweregrad und
Häufigkeit des Risikos, die eigene vorherige Überprüfung des Betreibers und, falls konsultiert,
einen Expertenausschuss, und antwortet innerhalb von 30 Tagen, verlängerbar um weitere 30 Tage. Ein
Betreiber, der nicht einverstanden ist, kann innerhalb von 10 Tagen um Neubestätigung bitten, und
das MSIT muss innerhalb von weiteren 30 Tagen nach Konsultation des Expertenausschusses antworten
(Dekret Artikel 25) [2].

Für den Ingenieur ist dies ein Intake-Artefakt: ein **Klassifizierungsentscheidungsprotokoll** pro
System, das den Artikel 2(4)-Bereich, die Risikorationale, die Trainingsdaten-Übersicht und, falls
angefordert, die Antwort des MSIT enthält. Es ist derselbe Datensatz, den Kapitel 06 bei
[intake and classification](/bok/the-role#intake-and-classification) erstellt, mit einem weiteren
Feld.

### Transparenz: vorherige Mitteilung und Kennzeichnung

Artikel 31 trägt drei Pflichten [1]:

1. **Vorherige Mitteilung.** Ein Betreiber, der ein Produkt oder eine Dienstleistung mit
   hochriskanter oder generativer KI bereitstellt, muss Nutzer im Voraus darüber informieren, dass
   es auf dieser KI läuft.
2. **Ausgabekennzeichnung.** Ein Betreiber, der generative KI oder ein Produkt oder eine
   Dienstleistung mit ihr bereitstellt, muss angeben, dass Ausgaben von generativer KI generiert
   wurden.
3. **Realistische synthetische Inhalte.** Wenn ein System Ton, Bilder oder Video produziert, die
   schwer von der Realität zu unterscheiden sind, muss der Betreiber sie benachrichtigen oder
   kennzeichnen, damit Nutzer sie klar als KI-generiert erkennen können; für künstlerische oder
   kreative Werke kann die Mitteilung auf eine Weise erfolgen, die Ausstellung oder Genuss nicht
   behindert.

Das Dekret legt die Mechanik fest (Dekret Artikel 23) [2]. Vorherige Mitteilung kann im Produkt
selbst, im Vertrag, in der Anleitung oder den Nutzungsbedingungen, auf dem Bildschirm oder Gerät des
Nutzers oder am Lieferort erfolgen. Kennzeichnungen können menschlich wahrnehmbar oder
maschinenlesbar sein; wenn sie nur maschinenlesbar sind, muss der Betreiber den Nutzer mindestens
einmal, per Text oder Sprache, darüber informieren, dass die Ausgabe von generativer KI generiert
wurde. Mitteilungen und Kennzeichnungen für realistische synthetische Inhalte müssen leicht
wahrnehmbar sein und müssen das Alter und die physischen oder sozialen Bedingungen der Hauptnutzer
berücksichtigen. Drei Ausnahmen gelten: wenn die KI-Nutzung aus dem Produktnamen, Bildschirm oder
der Ausgabe offensichtlich ist; wenn das System nur für das interne Geschäft des Betreibers
verwendet wird; und Fälle, die das MSIT durch öffentliche Mitteilung benannt.

### Pflichten für hochriskante KI

Ein Betreiber, der hochriskante KI bereitstellt, muss sechs Maßnahmen implementieren (Artikel 34(1))
[1]: einen Risikomanagementplan; einen Erklärungsplan, der im Rahmen der technischen Machbarkeit das
Endergebnis, die Hauptkriterien zu seiner Erreichung und eine Übersicht der Trainingsdaten abdeckt;
einen Nutzerschutzplan; menschliche Verwaltung und Aufsicht; Dokumente, die die ergriffenen
Maßnahmen zeigen; und alle weiteren Maßnahmen, die der nationale KI-Ausschuss beschließt. Das Dekret
fügt drei Betriebsregeln hinzu (Dekret Artikel 27) [2]:

- der Betreiber veröffentlicht den Hauptinhalt des Risikomanagementsystems, der Erklär- und
  Nutzerschutzpläne sowie den Namen und die Kontaktdaten der Person, die das System überwacht, in
  seinen Büros oder auf seiner Website, ausgenommen Geschäftsgeheimnisse;
- der Betreiber bewahrt die dokumentarischen Nachweise der Maßnahmen **fünf Jahre** lang auf,
  elektronisch oder anderweitig;
- ein Betreiber, der ein System nutzt, kann vom Betreiber, der es entwickelt hat, die benötigten
  Informationen anfordern, und der Entwickler muss sich bemühen, zusammenzuarbeiten; Maßnahmen, die
  nach anderen Gesetzen ergriffen wurden, zählen, wenn die Verordnung dies in ihrem Anhang vorsieht.

**Grundrechte-Folgenabschätzung** ist eine Bestrebungspflicht: Betreiber "bemühen sich", die
Auswirkungen auf Grundrechte vor der Bereitstellung von KI mit hoher Wirkkraft zu bewerten, und
öffentliche Stellen müssen Produkten Vorrang geben, die bewertet wurden (Artikel 35) [1]. Die
Verordnung legt den Inhalt fest: die Personen und Gruppen, die wahrscheinlich betroffen sind, unter
Berücksichtigung der Merkmale von KI-gefährdeten Gruppen (Gesetz Artikel 3(5) und 35(1), ab 21. Juli
2026 in Kraft); die betroffenen Grundrechte; die sozialen und wirtschaftlichen Auswirkungen; die
Nutzungsmuster; die verwendeten quantitativen oder qualitativen Indikatoren und Methoden; die
Präventions-, Minderungs- und Wiederherstellungsmaßnahmen; und einen Verbesserungsplan, falls
erforderlich. Der Betreiber kann die Bewertung selbst oder durch einen Dritten durchführen
(Verordnung Artikel 28) [2].

### Sicherheitspflichten für Hochleistungs-Systeme

Artikel 32 gilt für Systeme, deren kumulatives Trainings-Compute einen durch Verordnung festgelegten
Schwellenwert überschreitet [1]. Die Verordnung erfordert alle drei der folgenden Bedingungen:
kumulatives Trainings-Compute von mindestens **10^26 Gleitkommaoperationen**; Konstruktion und
Betrieb mit der fortschrittlichsten KI-Technologie des Tages; und ein Risikoprofil, das das Leben,
die Sicherheit und die Grundrechte breit und schwerwiegend beeinträchtigen kann (Verordnung
Artikel 24) [2]. Betreiber solcher Systeme müssen Risiken über den gesamten Lebenszyklus hinweg
ermitteln, bewerten und mindern, ein Risikomanagementsystem aufbauen, das KI-Sicherheitsvorfälle
überwacht und darauf reagiert, und die Ergebnisse bei MSIT einreichen [1]. Die Compute-Zahl ist
dieselbe 10^26, die die US-amerikanischen Frontier-Gesetze verwenden (siehe
[frontier-developer laws](/bok/regulatory-map#frontier-developer-laws) in Kapitel 08), aber der
konjunktive Test macht die koreanische Klasse auf dem Papier enger.

### Inländischer Bevollmächtigter

Ein Betreiber ohne Anschrift oder Betriebsstätte in Korea muss einen
**inländischen Bevollmächtigten** schriftlich benennen und dies bei MSIT anmelden, wenn er einen
Schwellenwert der Verordnung erfüllt (Artikel 36; Verordnung Artikel 29) [1][2]: Gesamtumsatz des
Vorjahres von KRW 1 Billion oder mehr; Umsatz aus KI-Dienstleistungen des Vorjahres von KRW 10
Milliarden oder mehr; durchschnittlich 1 Million oder mehr tägliche Nutzer in Korea in den drei
Monaten vor Ende des Vorjahres; oder eine frühere Geldbuße für Nichtbeachtung einer Anordnung zur
Abhilfe. Der Bevollmächtigte reicht die Ergebnisse von Artikel 32 ein, stellt Anträge zur
Bestätigung von Hochrisiko-Systemen und unterstützt die Maßnahmen nach Artikel 34, einschließlich
der Überprüfung, dass die Dokumente aktuell und korrekt sind; seine Verstöße werden dem Betreiber
zugerechnet [1].

### Durchsetzung und Übergangsfrist

MSIT kann Dokumente anfordern und ermitteln, auch vor Ort, wenn es einen vermuteten Verstoß gegen
die Kennzeichnungs-, Sicherheits- oder Hochrisiko-Pflichten feststellt oder davon erfährt, und kann
anordnen, dass der Verstoß beendet oder behoben wird (Artikel 40) [1]. Verwaltungsbußgelder von bis
zu **KRW 30 Millionen** gelten nur für drei Verstöße: Nichtgewährung der vorherigen Mitteilung nach
Artikel 31(1), Nichtbenennung eines inländischen Bevollmächtigten und Nichtbeachtung einer Anordnung
zur Beendigung oder Behebung (Artikel 43) [1]. Ein Kennzeichnungsverstoß wird daher nicht direkt mit
Geldbuße belegt; er wird mit Geldbuße belegt, wenn der Betreiber die darauffolgende Abhilfeanordnung
ignoriert. Während der oben beschriebenen Orientierungsphase werden Ermittlungen und Bußgelder mit
Ausnahme von Ausnahmefällen zurückgehalten [3].

| Pflicht (Artikel) | Wer ist gebunden | Technisches Artefakt, das sie nachweist | Schicht |
|---|---|---|---|
| Selbstbewertung zu Hochrisiko-Systemen und optionale Bestätigung (Art. 33; Verordnung Art. 25) | Alle KI-Geschäftsbetreiber | Klassifizierungsentscheidungsdatensatz pro System: Art. 2(4)-Bereich, Risikorationale, Trainings-Datenübersicht, MSIT-Antwort | 1 · 2 |
| Vorherige Mitteilung (Art. 31(1); Verordnung Art. 23(1)) | Betreiber von Produkten, die KI mit hoher Wirkkraft oder generative KI nutzen | Mitteilungskomponente in UI, Bedingungen und Verträgen; Mitteilungsinventar pro Benutzeroberfläche | 2 · 4 |
| Ausgabenkennzeichnungen und Hinweis auf realistische Inhalte (Art. 31(2)–(3); Verordnung Art. 23(2)–(3)) | Betreiber von generativer KI | Herkunfts-Pipeline: sichtbares Etikett oder maschinenlesbares Zeichen, plus mindestens eine Text- oder Sprachbenachrichtigung | 3 · 4 |
| Sicherheitspflichten über 10^26 FLOP (Art. 32; Verordnung Art. 24) | Betreiber von qualifizierenden Systemen | Lifecycle-Risikoregister; Sicherheits-Incident-Überwachung; Ergebnisbericht an MSIT | 3 · 4 · 5 |
| Maßnahmen für Hochrisiko-Systeme (Art. 34; Verordnung Art. 27) | Betreiber von hochgradig auswirkungsreicher KI | Risikomanagement-, Erklär- und Benutzerschutzpläne; benannter menschlicher Aufseher; veröffentlichte Zusammenfassung; fünfjähriger Nachweisspeicher | 1 · 2 · 4 · 5 |
| Grundrechte-Folgenabschätzung, Bestrebungspflicht (Art. 35; Verordnung Art. 28) | Betreiber von hochgradig auswirkungsreicher KI | Grundrechte-Folgenabschätzung mit den sieben Elementen der Verordnung | 1 · 5 |
| Inländischer Bevollmächtigter (Art. 36; Verordnung Art. 29) | Ausländische Betreiber über einem Schwellenwert | Ernennung bei MSIT eingereicht; Nachweiszugriffs-Runbook für den Vertreter | 5 |

> **In der Praxis (illustrativ)**
> Ein ausländischer Anbieter einer Einstellungsbewertungs-API überschritt die Schwelle von 1 Million
> täglicher Nutzer durch koreanische Kunden seiner Kunden. Das Governance-Team tat drei Dinge. Es
> fügte einen `jurisdiction.kr`Block zu jedem Registereintrag des Systems hinzu, der den Bereich
> nach Artikel 2(4) ("Einstellung") enthielt, das Selbstbewertungsergebnis und einen Link zur
> verordnungsgerechten Grundrechte-Folgenabschätzung. Es erweiterte die Aufbewahrungsrichtlinie des
> Evidence-Speichers auf fünf Jahre für jedes Artefakt mit dem Tag {`kr-art34`}. Und es gab dem
> inländischen Bevollmächtigten Lesezugriff auf eine gefilterte Evidence-Ansicht, damit der
> Bevollmächtigte MSIT aus aktuellen Dokumenten antworten konnte, anstatt das Produktteam per E-Mail
> zu kontaktieren. Im Modell selbst wurde nichts Neues gebaut; die Arbeit lag in der Registrierung,
> der Aufbewahrungsrichtlinie und dem Zugriffspfad.

## Vereinigte Staaten: die föderale Ebene

Die Vereinigten Staaten haben kein föderales KI-Gesetz, das private Akteure bindet. Die föderale
Ebene ist eine Reihe von Executive Orders und Memoranda des Office of Management and Budget (OMB),
die föderale Behörden binden, und durch Beschaffung auch die Anbieter, die an sie verkaufen. Seit
Dezember 2025 umfasst sie auch einen bewussten Druck gegen staatliche KI-Gesetze.

### Executive Orders

- **EO 14179** (23. Jan. 2025), *Removing Barriers to American Leadership in Artificial
  Intelligence*, ordnete eine Überprüfung aller Maßnahmen an, die unter der widerrufenen EO 14110
  ergriffen wurden, damit die mit der neuen Politik unvereinbaren Maßnahmen ausgesetzt, überarbeitet
  oder aufgehoben werden konnten, und ordnete einen KI-Aktionsplan innerhalb von 180 Tagen an [5].
- **EO 14319** (23. Juli 2025), *Preventing Woke AI in the Federal Government*, legte zwei "Unbiased
  AI Principles" (Wahrheitssuche und ideologische Neutralität) für große Sprachmodelle fest, die die
  Regierung kauft [8].
- **EO 14365** (11. Dez. 2025), *Ensuring a National Policy Framework for Artificial Intelligence*,
  zielt auf staatliche KI-Gesetze ab; sie wird in einem eigenen Unterabschnitt unten behandelt [10].

### OMB-Memoranda für föderale Behörden

**M-25-21** (3. Apr. 2025), *Accelerating Federal Use of AI through Innovation, Governance, and
Public Trust*, hob M-24-10 auf und ersetzte sie [6]. Sie definiert **high-impact AI** als KI, deren
Ausgabe als Hauptgrundlage für Entscheidungen oder Maßnahmen mit rechtlicher, materieller, bindender
oder erheblicher Auswirkung auf Bürgerrechte, Bürgerfreiheiten oder Datenschutz, auf Zugang zu
Bildung, Wohnen, Versicherungen, Krediten, Beschäftigung und andere Programme, auf Zugang zu
kritischen Regierungsdiensten oder auf Gesundheit und Sicherheit von Menschen dient, unter anderem
[6]. Einige Anwendungsfallkategorien gelten als hochrisikant; ein Behördenbeamter, der zu einem
anderen Ergebnis kommt, muss die Entscheidung dem Chief AI Officer dokumentieren. Behörden hatten
365 Tage ab Ausstellung Zeit, um die Mindestpraktiken für hochrisikante KI zu dokumentieren: Tests
vor der Bereitstellung; eine KI-Folgenabschätzung; laufende Überwachung auf Leistung und nachteilige
Auswirkungen; angemessene Schulung der Betreiber; menschliche Aufsicht, Intervention und
Rechenschaftspflicht, mit einem Failsafe, wo praktikabel; konsistente Abhilfemaßnahmen oder
Berufungsmöglichkeiten für betroffene Personen; und Konsultation von Endbenutzern und der
Öffentlichkeit [6]. **M-25-22**, am selben Tag veröffentlicht, behandelt die Beschaffung [7].

**M-26-04** (11. Dez. 2025) setzt EO 14319 um [8]. Behörden hatten bis 11. März 2026 Zeit, ihre
Beschaffungsrichtlinien zu aktualisieren, und jede Ausschreibung für ein großes Sprachmodell muss
mindestens Folgendes anfordern: die akzeptable Nutzungsrichtlinie des Anbieters; Modell-, System-
oder Datenkarten; Ressourcen für Endbenutzer; und einen Mechanismus für Endbenutzer-Feedback zu
Ausgaben, die gegen die Prinzipien verstoßen [8]. Die Anforderungen erstrecken sich auch auf
Modelle, die in anderer Software eingebettet sind, die die Behörde kauft [8].

### Amerikas KI-Aktionsplan

Der Plan, veröffentlicht im Juli 2025, hat drei Säulen: Innovation beschleunigen, amerikanische
KI-Infrastruktur aufbauen und in internationaler KI-Diplomatie und Sicherheit führen [9]. Zwei
seiner Maßnahmen sind hier relevant. Er fordert Behörden mit diskretionärem KI-Finanzierungsbudget
auf, das KI-Regelungsklima eines Staates bei Finanzierungsentscheidungen zu berücksichtigen, und die
Federal Communications Commission auf, zu bewerten, ob staatliche KI-Regeln ihr Mandat
beeinträchtigen; und er weist NIST an, das AI Risk Management Framework zu überarbeiten, um Verweise
auf Desinformation, Vielfalt, Gerechtigkeit und Inklusion sowie Klimawandel zu entfernen [9].

### Der föderale Druck gegen staatliche KI-Gesetze

EO 14365 legt die Maschinerie fest [10]. Der Generalstaatsanwalt sollte innerhalb von 30 Tagen eine
**AI Litigation Task Force** einrichten, um staatliche KI-Gesetze anzufechten, die mit der föderalen
Politik kollidieren; der Handelsminister sollte innerhalb von 90 Tagen eine Bewertung "belastender"
staatlicher KI-Gesetze veröffentlichen, einschließlich solcher, die Modelle dazu verpflichten,
wahrheitsgemäße Ausgaben zu ändern; Staaten mit solchen Gesetzen werden von einigen
Breitband-Mitteln (BEAD) ausgeschlossen und können andere diskretionäre Zuschüsse unter Bedingungen
sehen; die FCC soll einen föderalen Berichts- und Offenlegungsstandard in Betracht ziehen, der
kollidierenden staatlichen Regeln vorgehen würde; die Federal Trade Commission (FTC) soll eine
Grundsatzerklärung darüber abgeben, wie ihre Betrugsbefugnis auf staatliche Gesetze angewendet wird,
die geänderte Ausgaben erfordern; und die Berater des Präsidenten sollen Gesetzentwürfe für einen
einheitlichen föderalen Rahmen vorbereiten. Die Legislativempfehlung der Verordnung darf nicht
vorschlagen, staatliche Gesetze zum Schutz von Kindern, zu KI-Compute und
Rechenzentrumsinfrastruktur außer Genehmigung oder zu staatlicher Beschaffung und Nutzung von KI
vorzuentziehen [10].

Was danach geschah, Stand 2026-09-24:

- Der Generalstaatsanwalt kündigte die Task Force am 9. Jan. 2026 an, wie von Praktikern berichtet
  [12].
- Das Weiße Haus veröffentlichte am 20. März 2026 unverbindliche Legislativempfehlungen und forderte
  den Kongress auf, staatliche KI-Gesetze vorzuentziehen, die unangemessene Belastungen auferlegen,
  während nicht allgemein anwendbare staatliche Gesetze vorgezogen werden, die Kinder schützen,
  Betrug verhindern und Verbraucher schützen {[11]}.
- Die FTC forderte am 1. Juli 2026 Stellungnahmen zu einer vorgeschlagenen Grundsatzerklärung an:
  dass die absichtliche Verfälschung der Ausgaben eines KI-Systems für nicht offengelegte
  ideologische Zwecke gemäß Abschnitt 5 des FTC Act täuschend sein kann. Die Erklärung erörtert
  Colorados KI-Gesetz und deutet an, dass es möglicherweise stillschweigend verdrängt wird, wenn es
  Änderungen an den Ausgaben erzwingt; Kommentare endeten am 31. Juli 2026 [13].
- Im Repräsentantenhaus würde ein überparteiliches Diskussionsentwurf, der im Juni 2026
  veröffentlicht wurde, die bundesstaatliche Verdrängung der staatlichen KI-Regulierung für drei
  Jahre ermöglichen; es war ein Entwurf für Rückmeldungen von Interessenträgern, kein eingereichter
  Gesetzentwurf [14]. Ob er seitdem eingebracht wurde, sollte überprüft werden (überprüfen).
- Die Commerce-Bewertung war innerhalb von 90 Tagen nach der Anordnung fällig [10]; ob sie
  veröffentlicht wurde und welche Gesetze sie nennt, sollte überprüft werden (überprüfen).
- Vor Gericht reichte xAI am 9. April 2026 Klage ein, um Colorados ursprüngliches KI-Gesetz, SB
  24-205, zu blockieren, und das US-Justizministerium intervenierte am 24. April 2026 mit einer
  Gegenbeschwerde und argumentierte, dass das Gesetz gegen die Equal Protection Clause verstößt
  [16][17]. Am 27. April 2026 erließ ein Bundesrichter eine vereinbarte Anordnung, wonach der
  Colorado Attorney General SB 24-205 nicht durchsetzen würde, bis 14 Tage nach einer Entscheidung
  über xAIs Antrag auf einstweilige Verfügung; SB 26-189 ersetzte dann das Gesetz [16].

Für den Ingenieur ist die praktische Regel einfach: eine staatliche Pflicht bindet, bis sie
aufgehoben, ersetzt oder untersagt wird. Halten Sie die Kontrollen jedes Staates als separates,
versioniertes Policy-Modul, das nach der Gerichtsbarkeit verschlüsselt ist, damit eine
Gerichtsentscheidung oder eine Aufhebung eine Konfigurationsänderung und kein Rebuild ist.

| Bundesinstrument | Gilt für | Was es verlangt | Artefakt, das die Agentur oder der Anbieter behält | Schicht |
|---|---|---|---|---|
| OMB M-25-21 [6] | Bundesbehörden (Elemente der Intelligence Community ermutigt, nicht erforderlich) | Bestimmung von hohem Einfluss; sieben Mindestpraktiken; Chief AI Officer; Use-Case-Inventar | Anwendungsfall-Bestandseintrag; Vorbereitungstestbericht; KI-Auswirkungsbewertung; Überwachungsplan; Berufungsweg | 2 · 3 · 4 · 5 |
| OMB M-26-04 [8] | Agenturen, die große Sprachmodelle kaufen, und ihre Anbieter | Unbiased AI Principles als Vertragsbedingungen; Mindestpaket für Transparenz | Akzeptable Nutzungsrichtlinie; Modell-, System- oder Data Cards; Ressourcen für Endbenutzer; Rückmeldungskanal | 2 · 5 |
| EO 14365 und der FTC-Vorschlag [10][13] | Staaten; Entwickler, die staatlichen Gesetzen unterliegen | Noch keine Pflicht für private Akteure; Rechtsstreit- und Verdrängungsrisiko | Gerichtsbarkeit-verschlüsselte Policy-Module; Aufzeichnung, welche Ausgabekontrollen jedes Staatsgesetz erfordert | 1 |

## Vereinigte Staaten: Staatsgesetze, die private Organisationen binden

Kapitel 08 ordnet die beiden Grenzgesetze, Texas und Colorado, auf der Ebene der Tabelle
[US-Bundes- und Staatsgesetze](/bok/regulatory-map#us-federal-and-state-laws) ein. Dieser Abschnitt
fügt die Gesetze hinzu, die gewöhnliche Entwickler und Betreiber erreichen, und gibt jedem seinen
Umfang, Daten, Pflichten und Durchsetzung.

| Gesetz | Status (Stand 2026-09-24) | Umfang | Wichtigste Pflichten | Durchsetzung | Evidenz-Artefakt | Schicht |
|---|---|---|---|---|---|---|
| Colorado SB 26-189 (Automated Decision-Making Technology) | Unterzeichnet 2026-05-14; wirksam 2027-01-01; hebt SB 24-205 auf und erlässt sie neu [15][16] | Entwickler und Betreiber von ADMT bei folgenreichen Entscheidungen (Beschäftigung, Wohnen, Kreditvergabe, Versicherung, Leistungen) | Entwicklerdokumentation für Betreiber (beabsichtigte Verwendungen, Trainingsdatenkategorien, bekannte Grenzen, Anweisungen) und Mitteilung über wesentliche Aktualisierungen; Betreiberbenachrichtigung über ADMT-Verwendung; verständliche Erklärung innerhalb von 30 Tagen nach einem negativen Ergebnis; Verbraucherkorrektur, menschliche Überprüfung und Überlegung; Aufzeichnungen mindestens drei Jahre lang aufbewahrt | Attorney General gemäß Consumer Protection Act; 60-Tage-Heilungsmitteilung vor 2030; kein neues Privatklagerecht [15] | ADMT-Bestand; Entwicklerdokumentationspaket; Vorlagen für Mitteilung und Erklärung nachteiliger Ergebnisse; Warteschlange für menschliche Überprüfung; Speicher für dreijährige Aufzeichnungen | 2 · 4 · 5 |
| Texas TRAIGA (HB 149) | In Kraft 2026-01-01 [18] | Personen, die in Texas Geschäfte tätigen; Entwickler, Betreiber, Regierung | Absichtsbasierte Verbote (Verhaltensmanipulation, staatliche Sozialbewertung, rechtswidrige Diskriminierung, bestimmte sexuelle Inhalte); Offenlegung durch Regierungsbehörden und in Gesundheitsdiensten; 36-Monats-Sandbox; lokale KI-Regeln verdrängt | Nur Attorney General; kein Privatklagerecht; 60-Tage-Heilung; USD 10.000–12.000 pro heilbar, 80.000–200.000 pro nicht heilbar, 2.000–40.000 pro Tag fortlaufend [18] | Policy-as-Code für verbotene Verwendungen; Offenlegungskontrollen; eine Model Card, die die acht Ermittlungsfragen des Attorney General beantwortet | 1 · 2 · 4 |
| California SB 53 (Transparency in Frontier AI Act) | Kapitelisiert 2025-09-29; in Kraft 2026-01-01 [19][20] | Frontier-Entwickler (Modelle, die über 10^26 Operationen trainiert wurden); große Frontier-Entwickler (Umsatz über USD 500 Mio.) | Veröffentlichtes Frontier-KI-Framework; Transparenzbericht vor der Bereitstellung eines neuen oder wesentlich geänderten Frontier-Modells; kritische Sicherheitsvorfälle innerhalb von 15 Tagen gemeldet, 24 Stunden, wenn Tod oder schwere Verletzung unmittelbar bevorstehen; Whistleblower-Kanal | Attorney General; Zivilstrafe bis zu USD 1 Mio. pro Verstoß [19] | Veröffentlichtes Framework; Transparenzbericht vor der Bereitstellung; Incident Pipeline mit den zwei Uhren; anonymer Meldungskanal | 3 · 4 · 5 |
| California AI Transparency Act (SB 942 wie durch AB 853 geändert) | Wirksam 2026-08-02; Plattformpflichten 2027-01-01; Erfassungsgeräte 2028-01-01 [21] | Abgedeckte Anbieter öffentlicher generativer KI-Systeme; große Online-Plattformen; Hosting-Plattformen; Erfassungsgerätehersteller | Kostenloses Erkennungstool; optionale sichtbare (Manifest-)Offenlegung; eingebettete (latente) Offenlegung in Bild, Video und Audio; Plattformen erkennen und zeigen Herkunft an und dürfen sie nicht entfernen | Zivilstrafe von USD 5.000 pro Verstoß, jeder Tag ein separater Verstoß, in Maßnahmen des Attorney General, eines Stadtsyndikus oder eines Bezirkssyndikus (Bus. & Prof. Code s. 22757.4) [21] | Herkunftspipeline schreibt latente Metadaten; öffentlicher Erkennungsendpunkt; plattformseitige Herkunftsanzeige | 3 · 4 |
| California AB 2013 (Transparenz bei Trainingsdaten) | Dokumentation fällig am oder vor 2026-01-01 und bei jeder neuen Veröffentlichung oder wesentlichen Änderung [22] | Entwickler generativer KI-Systeme, die seit 2022-01-01 zur Verwendung in Kalifornien veröffentlicht wurden | Öffentliche Zusammenfassung von Trainingsdatensätzen: Quellen, Zweck, Größe, Datentypen, IP-Status, Lizenzierung, persönliche Informationen, Bereinigung, Erfassungszeitraum, erste Verwendung, synthetische Daten | Ausnahmen: Sicherheit und Integrität, Flugbetrieb, bundesstaatliche nationale Sicherheitsnutzungen [22] | Data Card pro Datensatz, veröffentlicht bei Veröffentlichung; Training-Data Rights Ledger | 2 |
| California CPPA-Verordnungen (ADMT, Risikobewertungen, Cybersecurity-Audits) | Genehmigt 2025-09-23; wirksam 2026-01-01; ADMT-Pflichten ab 2027-01-01; Risikobewertungsbestätigungen fällig 2028-04-01 [23] | Unternehmen, die dem CCPA unterliegen und ADMT für bedeutende Entscheidungen verwenden | ADMT-Pflichten für bedeutende Entscheidungen (Detail in Kapitel 19); Risikobewertungen; Cybersecurity-Audits | California Privacy Protection Agency [23] | ADMT-Register; Vorankündigung vor Verwendung; Opt-out-Routing; Risikobewertungsdatensatz | 2 · 4 · 5 |
| California SB 243 (Companion-Chatbots) | Kapitelisiert 2025-10-13; jährliche Berichte ab 2027-07-01 [24] | Betreiber von Begleiter-Chatbots | Offenlegung von KI, wenn eine vernünftige Person irregeführt werden könnte; für bekannte Minderjährige, KI offenlegen und mindestens alle drei Stunden erinnern, und sexuell explizite Inhalte verhindern; Protokoll für Suizid und Selbstverletzung mit Krisenüberweisung | Privatklagerecht: mindestens USD 1.000 pro Verstoß [24] | Begleiter-Modus-Richtlinie; Erinnerungstimer; Krisenüberweisung-Klassifizierer und Protokoll; jährlicher Bericht | 1 · 4 · 5 |
| New York RAISE Act | Unterzeichnet 2025-12-19; wirksam 2027-01-01 nach der Kapiteländerung 2026 [25][26] | Frontier-Entwickler (Modelle, die über 10^26 Operationen trainiert wurden) für Vorfallberichte; große Frontier-Entwickler (Umsatz über USD 500 Mio.) für das veröffentlichte Protokoll nach der Kapiteländerung [26] | Veröffentlichtes Sicherheitsprotokoll; Sicherheitsvorfälle innerhalb von 72 Stunden offengelegt; DFS-Überwachungsbüro | Attorney General [25] | Veröffentlichtes Protokoll; 72-Stunden-Incident-Pipeline | 4 · 5 |
| New York GBL Article 47 (KI-Companion-Modelle) | In Kraft [27] (Gültigkeitsdatum überprüfen) | Betreiber von KI-Begleitern | Protokoll zur Erkennung von Suizidgedanken und Selbstverletzung und Überweisung an Krisendienste; Mitteilung, dass der Benutzer nicht mit einem Menschen spricht, zu Beginn und mindestens alle drei Stunden | Attorney General; Zivilstrafen bis zu USD 15.000 pro Tag [27] | Krisenüberweisung-Klassifizierer und Protokoll; Mitteilungs-Timer | 4 · 5 |
| Utah AI Policy Act (SB 149 wie durch SB 226 und SB 332 geändert) | Änderungen wirksam 2025-05-07; Gesetz hebt auf 2027-07-01 [28] | Lieferanten, die generative KI in Verbrauchertransaktionen verwenden; regulierte Berufe | KI offenlegen, wenn eine Person klar fragt; prominente Offenlegung in "hochriskanten" Interaktionen (sensible Daten oder personalisierte Beratung) durch regulierte Fachleute, mündlich zu Beginn oder schriftlich vorher; sichere Hafen für klare Offenlegung von Anfang an | Division of Consumer Protection [28] | Offenlegungskomponente mit Interaktionsrisiko-Flag; Gesprächsprotokoll mit Offenlegung | 4 |
| Illinois HB 3773 (Human Rights Act-Änderung) | Wirksam 2026-01-01; Implementierungsregeln in Entwurf, wie berichtet [29] | Arbeitgeber, die KI bei Rekrutierung, Einstellung, Beförderung, Disziplin und anderen Beschäftigungsbedingungen einsetzen | Keine Verwendung von KI mit diskriminierender Auswirkung auf geschützte Klassen; keine Postleitzahlen als Proxy; Mitteilung an Arbeitnehmer und Bewerber | Illinois Department of Human Rights und die Rechtsmittel des Human Rights Act [29] | KI-in-HR-Bestand; Adverse-Impact-Eval pro geschützte Klasse; Mitteilungsdatensatz | 2 · 3 · 4 |
| NYC Local Law 144 (automatisierte Beschäftigungsentscheidungstools) | Durchgesetzt seit 2023-07-05 [30] | Arbeitgeber und Arbeitsvermittlungsagenturen, die AEDTs für New York City-Rollen verwenden | Bias-Audit innerhalb eines Jahres vor Verwendung; öffentliche Zusammenfassung der Ergebnisse; Mitteilungen an Kandidaten und Arbeitnehmer | Department of Consumer and Worker Protection; Beschwerdekanal [30] | Unabhängiger Bias-Audit-Bericht; veröffentlichte Zusammenfassung; Mitteilungsdatensatz | 3 · 5 |

### Folgenreiche Entscheidungen: ein Einstellungstool, vier Regime

Colorado, die California ADMT-Regeln, Illinois und New York City erreichen alle automatisierte
Einstellung, aber jede fordert ein anderes Artefakt: Colorado eine Erklärung innerhalb von 30 Tagen
nach einem negativen Ergebnis und einen Weg zur menschlichen Überprüfung [15]; Kalifornien, ab 2027,
die ADMT-Pflichten der CPPA [23]; Illinois eine Mitteilung und das Fehlen einer diskriminierenden
Auswirkung [29]; New York City ein unabhängiges Bias-Audit, veröffentlicht, weniger als ein Jahr alt
[30]. Korea listet Einstellung auch als hochriskanten Bereich auf [1]. Eine einzelne Eval-Suite, die
Auswahlquoten pro geschützte Klasse misst, die in CI und auf Produktionsstichproben ausgeführt wird,
erzeugt die Evidenz, die jede von ihnen benötigt; die Mitteilungen und Überprüfungswege
unterscheiden sich nur in Wortlaut und Timing.

> **Beispiel (illustrativ)**
> Ein CV-Ranking-Modell eines Anbieters wird von Arbeitgebern in Denver, Chicago, New York City und
> Seoul bereitgestellt. Das [Eval Gate in CI](/patterns/eval-gate-in-ci) führt eine
> Adverse-Impact-Suite bei jeder Veröffentlichung aus und blockiert eine, die das
> Auswahlquoten-Verhältnis einer Gruppe unter den konfigurierten Boden senkt. Die gleichen
> Ergebnisse speisen die Datenanfrage des NYC-Bias-Audit-Auditors, die
> Illinois-Diskriminierungseffekt-Datei und den Abschnitt "Indikatoren und Methode" der koreanischen
> Auswirkungsbewertung. Der Registereintrag enthält vier Mitteilungsvorlagen und eine Warteschlange
> für menschliche Überprüfung; die
> [Erklärung des negativen Ergebnisses](/patterns/explanation-artefact) wird aus den Top-Grund-Codes
> des Modells generiert und mit der Entscheidung protokolliert, sodass Colorados 30-Tage-Uhr durch
> die gleiche Pipeline erfüllt wird, die auf eine US-Kreditadverse-Action-Mitteilung antwortet.

### Herkunft, Trainingsdaten und Frontier-Entwickler

Kalifornien verteilt die Transparenz von Inhalten auf zwei Gesetze: AB 2013 verpflichtet Entwickler,
eine Zusammenfassung ihrer Trainingsdaten zu veröffentlichen [22], und der AI Transparency Act
verpflichtet große Anbieter, die Herkunft in den Medien einzubetten, die ihre Systeme erzeugen, und
der Öffentlichkeit eine Möglichkeit zu geben, diese zu überprüfen [21]. Beide sind vor allem
Nachwesprobleme, bevor sie rechtliche sind: eine Data Card pro Datensatz und eine
Provenance-Pipeline, die Metadaten zum Zeitpunkt der Generierung schreibt, sind die Artefakte, und
beide gehören in die Schichten 2 und 3 des [Stack](/bok/the-stack#layer-02-inventory--transparency).
Für Frontier-Entwickler konvergieren SB 53 und RAISE auf ein veröffentlichtes Sicherheits-Framework
und eine kurze Incident-Uhr [19][25]; Kapitel 08 behandelt die
[Frontier-Developer-Zeilen](/bok/regulatory-map#frontier-developer-laws).

### Chatbots und Begleiter

Utah, Kalifornien und New York regulieren die Konversationsschnittstelle selbst, nicht das dahinter
liegende Modell [24][27][28]. Utah verlangt Offenlegung auf ausdrückliche Anfrage und prominente
Offenlegung in regulierten, hochriskanten Interaktionen [28]; Kalifornien und New York fügen
regelmäßige Erinnerungen und ein Krisenverweisprotokoll für Begleitprodukte hinzu, wobei
Kaliforniens Erinnerungen an bekannte Minderjährige gebunden sind [24][27]. Chinas anthropomorphe
Interaktionsmaßnahmen, unten, decken das gleiche Gebiet mit einer zweistündigen Erinnerung ab [35].
Dies sind [Runtime Guardrail](/patterns/runtime-guardrail)-Probleme: ein Session-Timer, ein
Klassifizierer, der Selbstverletzungssignale erkennt und an eine Verweisung leitet, und ein
Protokoll, das beweist, dass beide ausgelöst wurden.

## Japan: das AI Promotion Act

Japans Gesetz zur Förderung der Forschung, Entwicklung und Nutzung von KI-bezogenen Technologien
(人工知能関連技術の研究開発及び活用の推進に関する法律), Gesetz Nr. 53 von 2025, wurde am 4. Juni 2025 erlassen und trat am 1.
September 2025 vollständig in Kraft, als die Bestimmungen zur Einrichtung des AI Strategy
Headquarters in Kraft traten [31][32]. Es ist ein Rahmen- und Förderungsgesetz ohne Strafen [31].
Seine Pflicht für Unternehmen ist ein Satz: Betreiber, die KI-bezogene Technologie in ihrem
Geschäftsbetrieb nutzen, müssen sich bemühen, sie aktiv zu nutzen, und müssen
**mit den Maßnahmen der nationalen und lokalen Regierung zusammenarbeiten** (Artikel 7) [31]. Der
Staat gibt Richtlinien aus, die mit internationalen Normen vereinbar sind, um angemessene Forschung,
Entwicklung und Nutzung zu gewährleisten (Artikel 13), und sammelt Informationen über Fälle, in
denen unangemessene Zwecke oder unangemessene Methoden die Rechte von Menschen verletzten,
analysiert diese und gibt Betreibern Anleitung, Beratung und Informationen (Artikel 16) [31].

Die Instrumente, die dem Gesetz Inhalt geben, sind weich. Das AI Strategy Headquarters
verabschiedete am 19. Dezember 2025 Richtlinien zur Gewährleistung der Angemessenheit von
KI-Forschung, -Entwicklung und -Nutzung [34]. Das Kabinett verabschiedete den ersten AI Basic Plan
am 23. Dezember 2025 und einen überarbeiteten Plan am 14. Juli 2026 [33]. Die Engineering-Lesart:
keine Anmeldung und keine Geldbuße, aber eine Regierung, die Fälle von Rechtsverletzungen untersucht
und Betreiber in Richtlinien benennt. Ein Betreiber, der ein Incident-Protokoll und eine Model Card
aktuell hält, kann eine Anfrage nach Artikel 16 ohne Hektik beantworten.

## China: was Kapitel 08 nicht bereits abdeckt

Kapitel 08 ordnet Chinas [bindende und freiwillige Ebenen](/bok/regulatory-map#china), von den
Bestimmungen zur algorithmischen Empfehlung bis zum TC260-Framework 3.0. Eine Regel, die es nicht
ordnet, ist die **Interim Measures for the Administration of Anthropomorphic Interaction Services**
(人工智能拟人化互动服务管理暂行办法), herausgegeben von der CAC mit vier anderen Stellen und in Kraft seit 15. Juli
2026 [35]. Sie gelten für KI-Dienste, die der Öffentlichkeit in China angeboten werden und
menschliche Persönlichkeit, Denken und Kommunikationsstil simulieren, um
**anhaltende emotionale Interaktion** bereitzustellen, wie Begleitung oder emotionale Unterstützung;
Kundenservice, Beantwortung von Fragen, Arbeitsassistenten, Bildungs- und Forschungswerkzeuge ohne
anhaltende emotionale Interaktion sind nicht im Geltungsbereich (Artikel 2) [35]. Die Pflichten:

- keine virtuellen Familienmitglieder oder virtuellen intimen Partner für Minderjährige; Zustimmung
  des Erziehungsberechtigten für Nutzer unter 14 Jahren; ein Modus für Minderjährige mit
  Realitätserinnerungen und Zeitlimits; angemessene Schritte zur Identifizierung von Minderjährigen
  (Artikel 14) [35];
- Kennzeichnung von KI-generiertem Inhalt nach den nationalen Kennzeichnungsregeln und ein klares
  Signal, dass der Nutzer mit KI interagiert; ein Pop-up-Hinweis, wenn Überabhängigkeit oder Sucht
  auftritt; eine Erinnerung nach jeweils **zwei Stunden** ununterbrochener Nutzung (Artikel 18)
  [35];
- ein einfacher Ausstieg: wenn der Nutzer um Verlassen bittet, muss der Dienst stoppen und darf den
  Nutzer nicht engagiert halten (Artikel 19) [35];
- eine **Sicherheitsbewertung**, gemeldet an das Büro für Cyberspace der Provinz, wenn der Dienst
  startet oder solche Funktionen hinzufügt, wenn neue Technologie ihn erheblich verändert, wenn er 1
  Million registrierte oder 100.000 monatlich aktive Nutzer erreicht, oder wenn nationale
  Sicherheits- oder Gemeinwohlrisiken entstehen (Artikel 22) [35];
- Algorithmus-Anmeldung unter den Empfehlungsbestimmungen, mit jährlichen Überprüfungen durch die
  CAC (Artikel 26) [35].

Die Artefakte sind die gleichen, die die US-Begleitgesetze fordern, plus ein Schwellenwert-Monitor
für Nutzerzahlen, der die Bewertung auslöst, und der Anmeldedatensatz, den Kapitel 08 bereits
ordnet.

## Brasilien: PL 2338/2023 (Gesetzentwurf)

Brasiliens KI-Gesetzentwurf, PL 2338/2023, wurde am 3. Mai 2023 im Senat eingereicht, am 10.
Dezember 2024 vom Senatsplenium verabschiedet und an die Abgeordnetenkammer geschickt, die ihn
am 17. März 2025 erhielt [36][37]. Die Kammer richtete am 4. April 2025 einen Sonderausschuss ein,
weil der Gesetzentwurf an mehr als vier ständige Ausschüsse überwiesen wurde; nach dem letzten
Verfahrenseintrag vom 2. September 2026 war der Gesetzentwurf unter einem Prioritätsregime und
wartete auf den Bericht des Berichterstatters, mit einer wachsenden Anzahl von zugehörigen
Gesetzentwürfen [37]. Es ist ein Gesetzentwurf, kein Gesetz. Der Senattext, dessen erklärtes Ziel
die Entwicklung, Förderung und ethisch verantwortungsvolle Nutzung von KI mit Fokus auf die
menschliche Person ist [37], folgt einem risikobasierten Modell mit einer Liste von hochriskanten
Nutzungen und verbotenen Nutzungen (überprüfen Sie den aktuellen Text, bevor Sie sich auf einen
Artikel verlassen). Die Engineering-Beratung für einen Gesetzentwurf ist überall gleich: ordnen Sie
ihn im Crosswalk als `status: bill`}, hängen Sie noch keine Kontrollen daran an, und beobachten Sie
den Ausschuss.

## Kanada: nach AIDA die Directive on Automated Decision-Making

Das Artificial Intelligence and Data Act (AIDA), Teil von Bill C-27, starb auf der Order Paper, als
die erste Sitzung des 44. Parlaments am 6. Januar 2025 endete [38]. Kanada hat daher kein
bundesweites KI-Gesetz für den Privatsektor. Was bindet, ist die Treasury Board
**Directive on Automated Decision-Making**, die für automatisierte Entscheidungssysteme von
Bundesinstitutionen gilt [39]. Sie trat am 1. April 2019 in Kraft; die aktuelle Version
(geändert 24. Juni 2025) gab Systemen, die vor diesem Datum eingerichtet wurden, bis 24. Juni 2026
Zeit, um die neuen Anforderungen zu erfüllen, und die Richtlinie wird alle zwei Jahre überprüft
[39]. Ihr Kern:

- eine **Algorithmic Impact Assessment** (AIA), die vor der Produktion abgeschlossen und auf dem
  Open Government Portal veröffentlicht wird, und aktualisiert wird, wenn sich Funktionalität oder
  Umfang ändern;
- Anforderungen skaliert nach der **Impact Level** der AIA (I bis IV), dargelegt in Anlage C;
- Mitteilung vor Entscheidungen über jeden Servicekanal, in verständlicher Sprache, und eine
  aussagekräftige Erklärung nach Entscheidungen;
- Qualitätssicherung, einschließlich Peer Review durch qualifizierte Experten mit der Überprüfung
  oder einer Zusammenfassung, die vor der Produktion veröffentlicht wird, und eine Gender-based
  Analysis Plus;
- Beschwerdeverfahren zur Anfechtung der Entscheidung und veröffentlichte Berichte über Wirksamkeit
  und Fairness [39].

Die AIA ist das reifste öffentliche Beispiel einer Folgenabschätzung, die auch ein veröffentlichtes,
versioniertes Artefakt ist; sie ist ein direktes Modell für [FRIA-as-Code](/patterns/fria-as-code).

## Indien: Governance-Richtlinien, kein KI-Gesetz

Indien hat kein KI-spezifisches Gesetz. MeitY veröffentlichte die **India AI Governance Guidelines**
am 5. November 2025 unter der IndiaAI Mission [40]. Sie umfassen sieben Leitprinzipien ("sutras"),
Empfehlungen über sechs Säulen, einen Aktionsplan mit kurz-, mittel- und langfristigen Zeitplänen
und praktische Anleitung für Industrie, Entwickler und Regulatoren [40]. Der Sekretär von MeitY
beschrieb die Politik als Nutzung bestehender Gesetzgebung, wo immer möglich [40]. Verpflichtungen
kommen daher aus bestehendem Recht, insbesondere aus Informationstechnologie- und Datenschutzrecht,
das Kapitel 19 abdeckt; jede KI-spezifische Änderung der IT Rules, zum Beispiel zur Kennzeichnung
synthetischer Inhalte, sollte auf ihren aktuellen Status überprüft werden, bevor sie ordnet wird
(überprüfen).

## Vereinigtes Königreich: Prinzipien, Regulatoren und öffentliche Aufzeichnungen

Das Vereinigte Königreich hat kein horizontales KI-Gesetz. Sein Ansatz, bestätigt in der Antwort der
Regierung vom Februar 2024 auf das AI-Regulierungs-Weißbuch, sind fünf sektorübergreifende
Prinzipien (Sicherheit, Robustheit; angemessene Transparenz und Erklärbarkeit; Fairness;
Rechenschaftspflicht und Governance; Anfechtbarkeit und Rechtsbehelfe), angewendet von bestehenden
Regulatoren in ihren Zuständigkeitsbereichen [41]. Ob ein Frontier-AI-Gesetzentwurf seitdem
eingereicht wurde, sollte überprüft werden, bevor man sich auf diesen Absatz verlässt (überprüfen).
Der Rest des Bildes des Vereinigten Königreichs ist konkret:

- das **AI Security Institute** (im Februar 2025 vom AI Safety Institute umbenannt) bewertet
  Frontier-Modelle [42];
- der **Algorithmic Transparency Recording Standard** (ATRS) ist obligatorisch für alle
  Regierungsabteilungen und für Organisationen in Armlänge, die öffentliche oder Frontline-Dienste
  erbringen oder direkt mit der Öffentlichkeit interagieren; Aufzeichnungen werden in einem
  zentralen Repository veröffentlicht [43];
- der **AI Cyber Security Code of Practice** (31. Januar 2025) legt Baseline-Sicherheitsprinzipien
  für KI-Systeme fest, mit einem Implementierungsleitfaden [44] (Kapitel 08 ordnet separat die
  ETSI-Baseline zur Sicherung von KI, EN 304 223);
- für bedeutende, ausschließlich automatisierte Entscheidungen ersetzte der Data (Use and Access)
  Act 2025 UK GDPR Artikel 22 durch Artikel 22A bis 22D, in Kraft seit 5. Februar 2026 (siehe
  [Kapitel 08](/bok/regulatory-map#united-kingdom)) [45].

Ein ATRS-Datensatz ist ein Inventareintrag, der für die Öffentlichkeit geschrieben wird. Ein
Register, das bereits Zweck, Eigentümer, Daten, menschliche Aufsicht und Risikofelder enthält, kann
die meisten davon generieren.

## Italien: Gesetz 132/2025

Italien hat ein nationales KI-Gesetz von allgemeinem Geltungsbereich, das neben der EU AI Act steht.
Gesetz Nr. 132 vom 23. September 2025, *Bestimmungen und Delegationen an die Regierung zur
künstlichen Intelligenz*, wurde in der Gazzetta Ufficiale am 25. September 2025 veröffentlicht und
trat am 10. Oktober 2025 in Kraft [46]. Es muss konsistent mit der EU AI Act gelesen und angewendet
werden (Artikel 1(2)) [46]. Die Bestimmungen, denen ein Ingenieur begegnet:

- **Minderjährige.** Der Zugang zu KI-Technologien durch Kinder unter 14 Jahren und die damit
  verbundene Verarbeitung personenbezogener Daten erfordert die Zustimmung des Inhabers der
  elterlichen Verantwortung (Artikel 4(4)) [46].
- **Arbeit.** Der Arbeitgeber muss Arbeitnehmer informieren, wenn KI eingesetzt wird, in den Fällen
  und auf die Weise der bestehenden Transparenzregeln für automatisierte Systeme (Artikel 11(2))
  [46].
- **Freie Berufe.** In den intellektuellen Berufen darf KI nur für instrumentelle und unterstützende
  Tätigkeiten eingesetzt werden, und der Berufstätige muss den Mandanten mitteilen, welche
  KI-Systeme verwendet werden (Artikel 13) [46].
- **Behörden.** AgID (die digitale Agentur) kümmert sich um Innovation und die Anmeldung und
  Überwachung von Konformitätsbewertungsstellen; ACN (die Cybersicherheitsbehörde) beaufsichtigt
  KI-Systeme, einschließlich Inspektionen und Sanktionen; die Banca d'Italia, CONSOB und IVASS
  bleiben Marktüberwachungsbehörden für ihre Sektoren (Artikel 20) [46].
- **Strafrecht.** Eine neue Straftat der rechtswidrigen Verbreitung von KI-generierten oder
  veränderten Bildern, Videos oder Stimmen, die ungerechtfertigten Schaden verursachen, strafbar mit
  einer bis fünf Jahren Freiheitsstrafe (Artikel 26, Einfügung von Artikel 612-quater in das
  Strafgesetzbuch) [46].

Das Gesetz delegiert auch weitere Regelungsbefugnisse an die Regierung; der konsolidierte Text auf
Normattiva zeigte eine letzte Aktualisierung vom 26. Juni 2026 [46].

## Spanien: AESIA, das Reallabor und ein Gesetzentwurf

Spanien hat einen operativen KI-Supervisor, ein funktionierendes Reallabor und einen nationalen
KI-Gesetzentwurf, der nicht Gesetz ist.

- **Der Gesetzentwurf.** Der Ministerrat billigte am 11. März 2025 in erster Lesung den
  Gesetzentwurf für die gute Nutzung und Governance von KI (Anteproyecto de Ley para el buen uso y
  la gobernanza de la Inteligencia Artificial) mit beschleunigtem Verfahren; er musste als
  Gesetzentwurf an den Ministerrat zurückkehren und dann zu den Cortes Generales gehen [47]. Wie
  vorgeschlagen, legt er das Sanktionsregime für die KI-Verordnung der EU innerhalb der Bereiche der
  Verordnung fest, behandelt eine Unterlassung der Kennzeichnung von Deepfakes als schwerwiegende
  Verletzung, fügt eine Befugnis hinzu, ein System nach einem schwerwiegenden Vorfall vorübergehend
  vom spanischen Markt zu nehmen, und verteilt die Aufsicht: die Datenschutzbehörde für verbotene
  biometrische und Grenzmanagement-Systeme und für Hochrisiko-Migrations- und Asylsysteme der
  Sicherheitskräfte des Staates, den Justizrat für Justiz, die Zentrale Wahlkommission für
  demokratische Prozesse, die Banco de España, die Versicherungsdirektion und CNMV für ihre
  Sektoren, und AESIA für den Rest [47]. Es war bis 2026-09-24 nicht angenommen worden; überprüfen
  Sie sein parlamentarisches Stadium vor dem Zitieren (überprüfen).
- **Das Reallabor.** Das Königliche Dekret 817/2023 richtete eine kontrollierte Testumgebung für die
  Einhaltung der (damals vorgeschlagenen) KI-Verordnung ein [48]; der erste Aufruf suchte bis zu 12
  Hochrisiko-Systeme für einen einjährigen Test [47].
- **Die Leitfäden.** AESIA veröffentlicht 16 Leitfäden, die im Reallabor-Piloten erstellt wurden:
  zwei einführende Leitfäden, 13 technische Leitfäden (Konformitätsbewertung,
  Qualitätsmanagementsystem, Risikomanagementsystem, menschliche Aufsicht, Datenverwaltung,
  Transparenz, Genauigkeit, Robustheit, Cybersicherheit, Protokollierung, Beobachtung nach dem
  Inverkehrbringen, Incident Management, technische Dokumentation) und ein Checklisten-Handbuch. Sie
  sind nicht bindend und stammen von vor der KI-Omnibus-Verordnung (EU) 2026/1744, die seit 27. Juli
  2026 in Kraft ist [68]. Ab 2026-09-24 besagt die Seite von AESIA noch, dass sie aktualisiert
  werden, sobald die Omnibus-Verordnung angenommen ist, überprüfen Sie also jeden Leitfaden gegen
  die geänderte Verordnung [49].

Die Leitfäden sind die praktischste öffentliche Vorlagenserie für die Hochrisiko-Anforderungen der
EU; Kapitel 18 ordnet die Artikel zu, die sie umsetzten.

## Singapur: Modellrahmen und AI Verify

Singapur reguliert KI durch freiwillige Rahmen und ein Test-Toolkit, das von IMDA und der AI Verify
Foundation gepflegt wird.

- Das **Model AI Governance Framework for Generative AI** (Mai 2024) legt Governance-Dimensionen
  fest, einschließlich Testing, Transparenz, Incident Reporting, Sicherheit und Content Provenance
  [52].
- Das **Model AI Governance Framework for Agentic AI** wurde am 22. Januar 2026 in Davos eingeführt
  [50]; die aktuelle Version 1.5 wurde am 20. Mai 2026 veröffentlicht und am 5. Juni 2026
  aktualisiert [51]. Es hat vier Dimensionen: Risiken im Voraus bewerten und begrenzen (geeignete
  Anwendungsfälle; Grenzen und Berechtigungen durch Design); Menschen sinnvoll verantwortlich machen
  (Verantwortungszuweisung; sinnvolle Aufsicht); technische Kontrollen und Prozesse implementieren
  (im Design, vor der Bereitstellung und kontinuierlich in der Bereitstellung); und Endbenutzern
  Verantwortung ermöglichen [51].
- **AI Verify** ist ein Test-Framework, das ein KI-System gegen 11 international anerkannte
  Governance-Prinzipien bewertet, mit einer Erweiterung für generative KI und technischen Test-Tools
  [53].

Die ersten beiden Dimensionen des Agentic-Frameworks sind das, was dieses Buch
[Agentenregister](/patterns/agent-registry) und
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) nennt; die dritte
ist das [Eval Gate in CI](/patterns/eval-gate-in-ci) plus Runtime-Überwachung. Kapitel 23 über
[Governance von Agenten](/bok/governing-agents#frameworks-written-for-agents) geht weiter.

## Australien: bestehendes Recht und freiwillige Leitlinien

Australien hat kein KI-Gesetz. Der **National AI Plan** der Regierung, veröffentlicht im Dezember
2025, besagt, dass Australien starke, weitgehend technologieneutrale Rechtsrahmen hat, die auf KI
angewendet werden können, und dass die Regierung Herausforderungen überwachen und darauf reagieren
wird, wenn sie entstehen [54]. Er etabliert ein **AI Safety Institute**, um aufkommende Fähigkeiten
und Risiken zu überwachen, zu testen und Informationen zu teilen und bestehende Regulatoren zu
beraten, und baut Adoptions-Tools auf den sechs wesentlichen Praktiken der
**Guidance for AI Adoption** [54]. Für den Ingenieur kommen Verpflichtungen aus Datenschutz-,
Verbraucher-, Diskriminierungs- und Sektorrecht; die sechs Praktiken sind eine angemessene
Checkliste für ein Governance-Programm, keine Compliance-Pflicht.

## Vergleich der Regime

Der Vergleich unten nutzt die Fragen, die eine Governance-Funktion an jedes KI-spezifische Gesetz
stellt. Er deckt Regime ab, deren Text diese Ausgabe überprüft hat; die KI-Verordnung der EU ist der
Referenzpunkt und befindet sich in Kapitel 18, das auch
[die gleichen Rollen über Regime hinweg](/bok/eu-ai-act#the-same-roles-across-regimes) ordnet, die
die Spalte Rollen komprimiert. Ein internationaler Vertrag sitzt neben diesen Regimen: das
[Rahmenübereinkommen des Europarats](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225)
wird in Kapitel 22 behandelt, mit seinem Ratifizierungsstatus.

| Regelwerk | Klassifizierungsauslöser | Kernaufgaben | Mitteilung und menschliche Aufsicht | Frontier- oder Modelle mit allgemeinem Verwendungszweck | Durchsetzung | Rollen |
|---|---|---|---|---|---|---|
| Korea AI Basic Act [1][2] | Aufgelistete Bereiche mit hohem Einfluss plus erhebliches Risiko; generative KI | Risikomanagementsystem, Erklärung, Benutzerschutz, Dokumente fünf Jahre aufbewahrt; Auswirkungsbewertung (beste Anstrengung) | Vorherige Mitteilung; Ausgabenkennzeichnung; benannter menschlicher Aufseher | Sicherheitspflichten über 10^26 FLOP und Stand der Technik | MSIT; Geldstrafen bis KRW 30M für drei Verstöße; Übergangsfrist | Entwicklungs- und Nutzungsakteure; inländischer Vertreter |
| Colorado SB 26-189 [15] | ADMT in folgenreichen Entscheidungen | Entwicklerdokumentation; Aufzeichnungen drei Jahre | Mitteilung; Erklärung innerhalb von 30 Tagen; menschliche Überprüfung und Überlegung | Keine | Generalstaatsanwalt; Heilungsfrist; keine Privatklage | Entwickler und Betreiber |
| Texas TRAIGA [18] | Verbotene Absichten; Regierungs- und Gesundheitswesen-Nutzung | Verbotene Nutzungen vermeiden; auf Ermittlungsanfragen antworten | Offenlegung durch Regierung und im Gesundheitswesen | Keine | Generalstaatsanwalt; gestaffelte Zivilstrafen; Heilungsfrist | Entwickler, Betreiber, Regierung |
| Kalifornien SB 53 und SB 942 [19][21] | Rechenleistung und Umsatz (Frontier); Nutzerbasis (Provenance) | Frontier-Framework; Transparenzbericht; Provenance und Erkennung | Latente und manifeste Offenlegungen | Frontier-Entwickler über 10^26 Operationen | Generalstaatsanwalt; bis zu USD 1M pro Verstoß (SB 53) | Frontier-Entwickler; abgedeckter Anbieter; Plattform |
| China, anthropomorphe Maßnahmen [35] | Dienste mit anhaltender emotionaler Interaktion | Sicherheitsbewertung; Algorithmus-Anmeldung; Modus für Minderjährige | KI-Signal; zwei Stunden Erinnerung; einfacher Ausstieg | Keine spezifischen | CAC und Provinzbüros | Dienstanbieter; App-Stores |
| Japan AI Promotion Act [31] | Keine (alle KI-bezogene Technologie) | Zusammenarbeit mit Regierungsmaßnahmen | Keine in dem Gesetz | Keine | Keine Strafen; Leitlinien nach Untersuchung | Forschungsinstitutionen; Nutzungsakteure |
| Italien Gesetz 132/2025 [46] | Sektorbestimmungen zusätzlich zur KI-Verordnung der EU | Arbeitnehmerinformation; berufliche Offenlegung; elterliche Zustimmung unter 14 | Information an Arbeitnehmer und Mandanten | Durch die KI-Verordnung der EU | AgID und ACN; Straftat für schädliche Deepfakes | Arbeitgeber; Berufstätiger; Anbieter |

## Sektorregeln, die bereits KI erreichen

KI-spezifisches Recht ist nur die halbe Geschichte. Sektorregime, die vor oder neben den KI-Gesetzen
geschrieben wurden, binden bereits viele KI-Systeme, normalerweise weil die KI in einem Produkt,
einem Finanzmodell, einem IKT-System oder einer Plattform sitzt, die sie regulieren. Kapitel 20
behandelt allgemeines Recht (Geistiges Eigentum, Nichtdiskriminierung, Verbraucherschutz,
Produkthaftung); die Tabelle unten ist die Sektorschicht.

| Regelwerk | KI-Auslöser | Pflicht | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| DORA, Verordnung (EU) 2022/2554 (gilt ab 2025-01-17) [55] | Die IKT-Systeme oder IKT-Drittanbieter-Services einer Finanzeinrichtung umfassen KI | IKT-Risikomanagementsystem, einschließlich IKT-Drittanbieter-Risiko, und Meldung großer IKT-bezogener Vorfälle | KI-Systeme im IKT-Asset-Inventar; KI-Anbieter im Drittanbieter-Register; Incident Pipeline mit der DORA-Klassifizierung | 2 · 4 · 5 |
| NIS2, Richtlinie (EU) 2022/2555 (Umsetzung fällig 2024-10-17) [56] | Die Netz- und Informationssysteme einer wesentlichen oder wichtigen Einrichtung umfassen KI | Cybersicherheits-Risikomanagementsystem; Frühwarnung innerhalb von 24 Stunden, Mitteilung innerhalb von 72 Stunden, Abschlussbericht innerhalb eines Monats | KI-Assets im Sicherheitsumfang; Incident Pipeline mit der NIS2-Uhr | 4 · 5 |
| Cyberresilienz-Verordnung, Verordnung (EU) 2024/2847 (Meldung ab 2026-09-11; Hauptpflichten ab 2027-12-11) [57][58] | Ein Produkt mit digitalen Elementen, das KI-Komponenten umfasst | Sicherheit durch Design und Schwachstelle-Handling; aktiv ausgenutzte Schwachstellen und schwerwiegende Vorfälle melden: 24 Stunden, 72 Stunden, Abschlussbericht | SBOM und AIBOM; Schwachstelle-Handling-Prozess; Meldungs-Runbook für die einzelne Meldungsplattform | 2 · 4 · 5 |
| Datenverordnung, Verordnung (EU) 2023/2854 (gilt ab 2025-09-12) [59] | Verbundene Produkte und zugehörige Services, deren Daten KI trainieren oder speisen; KI als Datenverarbeitungsservice bereitgestellt | Datenzugriff und -austausch für Benutzer; Wechsel zwischen Datenverarbeitungsservices | Datenzugriffs-Interface und Austausch-Log in der Data Card; Ausstiegs- und Wechselplan für die KI-Plattform | 2 · 5 |
| EU MDR und IVDR, mit MDCG 2025-6 zu ihrem Zusammenspiel mit der KI-Verordnung (Juni 2025) [60] | Medizinprodukte-Software, die KI nutzt | Gerätekonformitätsbewertung; wenn die KI auch unter der KI-Verordnung hochrisiko ist, gelten beide Regime und die MDCG-FAQ erklärt, wie sie zusammenpassen | Technische Dokumentation einmal erstellt, um beide Regime zu bedienen; klinische oder Leistungsbewertung; Plan für Beobachtung nach dem Inverkehrbringen | 3 · 5 |
| FDA-Entwurfsleitfaden zu KI-gestützten Gerätesoftwarefunktionen (Januar 2025; noch Entwurf auf der FDA-Seite) [61] | KI-gestützte Gerätesoftware in einer US-Markteinführungsanmeldung | Empfohlene Dokumentation über den gesamten Produktlebenszyklus zur Unterstützung der Sicherheits- und Wirksamkeitsprüfung | Modellbeschreibung; Datenverwaltungs- und Validierungsbericht; Kennzeichnung; Leistungsüberwachung nach der Markteinführung | 3 · 5 |
| US-Modellrisikomanagement: SR 26-2 (2026-04-17), ersetzt SR 11-7 [62] | Modelle, einschließlich KI und ML, die von Bankorganisationen verwendet werden; am relevantesten ab USD 30 Mrd. Vermögen | Risikobasiertes Modellrisikomanagement, das auf das Modellrisikoprofil zugeschnitten ist | Modellinventar-Eintrag; Validierungsbericht; Eval-Ergebnisse als Validierungsnachweis; Leistungsüberwachung | 2 · 3 · 5 |
| PRA SS1/23 (gültig ab 2024-05-17; überarbeitete Fassung gültig ab 2026-04-23) [63] | Modelle, die von britischen Banken, Bausparkassen und von der PRA benannten Investmentfirmen mit interner Modellgenehmigung für regulatorisches Kapital verwendet werden | Fünf Grundsätze für einen strategischen Ansatz zum Modellrisiko, beginnend mit Modellidentifizierung und Modellrisikoeinstufung | Modellinventar mit Staffelung; Validierungsdatensatz; Modellrisiko-Minderungsmaßnahmen-Protokoll | 2 · 3 · 5 |
| ECOA und Regulation B; FCRA-Mitteilungen über nachteilige Maßnahmen [64] | Eine Kreditentscheidung, die von einem komplexen Algorithmus getroffen oder unterstützt wird | Spezifische Hauptgründe für nachteilige Maßnahmen gemäß 12 CFR 1002.9; die Circular 2022-03 der CFPB, die besagte, dass Komplexität keine Entschuldigung ist, wurde am 12. Mai 2025 zurückgezogen, und die Verpflichtung aus Regulation B bleibt bestehen [71]. FCRA-Mitteilungen gelten, wenn ein Verbraucherbericht verwendet wird (Geltungsbereich pro Produkt überprüfen) | Begründungs-Code-Generator mit jeder Entscheidung protokolliert; Mitteilungsvorlage; Eval, dass Begründungen dem Modell entsprechen | 3 · 4 · 5 |
| Richtlinie über Plattformarbeit, Richtlinie (EU) 2024/2831 (Umsetzung bis 2. Dezember 2026, Art. 29(1)) [65][70] | Digitale Arbeitsplattformen, die automatisierte Überwachung oder Entscheidungsfindung nutzen | Transparenz automatisierter Systeme; Überwachung durch qualifiziertes Personal; Recht, automatisierte Entscheidungen anzufechten | Algorithmen-Management-Register; Informationen für Arbeitnehmende; Warteschlange für menschliche Überprüfung mit Entscheidungsprotokoll; DSFA | 2 · 4 · 5 |
| Minderjährige und Online-Sicherheit: DSA Art. 28-Richtlinien (2025-07-14); UK Online Safety Act Pflichten für Kinder; Companion-Chatbot-Gesetze [66][67][24][27][35] | Dienste, die wahrscheinlich von Kindern genutzt werden, einschließlich KI-Chat und Begleiter | Verhältnismäßige Schutzmaßnahmen; Risikobewertung für Kinder; Erinnerungen und Krisenweiterleitung | Altersbestätigungssignal; Kinder-Modus-Konfiguration; Risikobewertung für Kinder; Erinnerungs- und Weiterleitungsprotokolle | 1 · 4 · 5 |

Zwei dieser Zeilen haben sich kürzlich genug geändert, um ein Team zu überraschen, das zuletzt 2025
nachgesehen hat. Die US-Bankbehörden ersetzten SR 11-7, den Referenztext für
"Modellrisikomanagement" für fünfzehn Jahre, am 17. April 2026 durch SR 26-2 [62]; Verweise auf "SR
11-7" in Modell-Governance-Richtlinien sollten nun auf die überarbeitete Anleitung verweisen. Und
die Berichtspflichten der Cyberresilienz-Verordnung begannen am 11. September 2026 [57].

### Incident-Uhren über Regime hinweg

Ein KI-Incident kann mehrere Uhren gleichzeitig starten. Das
[Incident Pipeline](/patterns/incident-pipeline)-Muster sollte jede Uhr als Daten halten, nach
Regime und Auslöser verschlüsselt, sodass eine Triage-Entscheidung zu jedem fälligen Bericht führt.
Kapitel 17 behandelt [Incident Response](/bok/incidents#the-overlapping-clocks) vollständig.

| Regelwerk | Auslöser | Uhr | Empfänger |
|---|---|---|---|
| NIS2 [56] | Erheblicher Vorfall | 24 h Frühwarnung; 72 h Benachrichtigung; Abschlussbericht innerhalb eines Monats | CSIRT oder zuständige Behörde |
| Cyberresilienz-Verordnung [58] | Aktiv ausgenutzte Sicherheitslücke oder schwerwiegender Incident | 24 h Frühwarnung; 72 h Benachrichtigung; Abschlussbericht 14 Tage nach einem Fix (Sicherheitslücken) oder einen Monat (Incidents) | Einzelne Berichtsplattform |
| DORA [55] | Großer IKT-bezogener Vorfall | Erste Benachrichtigung innerhalb von 4 h nach Klassifizierung des Incidents als schwerwiegend und spätestens 24 h nach Kenntnisnahme; Zwischenbericht innerhalb von 72 h nach der ersten Benachrichtigung; Abschlussbericht innerhalb eines Monats nach dem letzten Zwischenbericht (Delegierte Verordnung (EU) 2025/301, Art. 5) [69] | Zuständige Finanzaufsichtsbehörde |
| California SB 53 [19] | Kritischer Sicherheitsvorfall | 15 Tage; 24 h, wenn Tod oder schwere Verletzung unmittelbar bevorstehen | Office of Emergency Services; zuständige Behörde für den 24-Stunden-Fall |
| New York RAISE [25][26] | Kritischer Sicherheitsvorfall | 72 h; 24 h, wenn Tod oder schwere körperliche Verletzung unmittelbar bevorstehen | Aufsichtsbehörde im Department of Financial Services; Strafverfolgung oder öffentliche Sicherheitsbehörde für den 24-Stunden-Fall |
| Korea AI Basic Act [1] | Sicherheitspflichten für Hochleistungs-Systeme | Keine feste Uhr; Ergebnisse der Sicherheitsmaßnahmen werden dem MSIT vorgelegt | MSIT |
| KI-Verordnung Art. 73 | Schwerwiegender Incident (Hochrisiko) | Siehe die [Uhr-Tabelle in Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus) | Marktüberwachungsbehörde |

> **In der Praxis (illustrativ)**
> Ein Zahlungsunternehmen betrieb ein Betrugsbewertungsmodell innerhalb einer Plattform, die ein
> IKT-Dienst unter DORA war, ein wichtiges Unternehmen unter NIS2 und durch seine
> Point-of-Sale-Geräte ein CRA-Produkt. Als ein Prompt-Injection-Pfad in seinem Support-Agent
> Kartendaten offenlegte, öffnete der Incident-Pipeline ein Ticket und drei Berichte an Regulatoren
> aus derselben Zeitleiste, jeder mit seiner eigenen Uhr und Vorlage. Was es funktionieren ließ, war
> nicht das Modell: Es war ein Register, das den Agent bereits mit allen drei Regimen markiert
> hatte, und ein Evidence Store, der es jedem Bericht ermöglichte, auf dieselben signierten
> Protokolle zu verweisen.

## Was Sie diese Woche tun können

1. **Fügen Sie jedem Registry-Eintrag einen Jurisdiktionsblock hinzu.** Listen Sie auf, wo jedes
   System angeboten wird, und notieren Sie für jeden Ort den Status-Wert (binding-horizontal,
   binding-targeted, voluntary, bill), das Klassifizierungsergebnis und die gültige
   Benachrichtigungsvorlage. Beginnen Sie mit Koreas High-Impact-Test und Colorados
   Consequential-Decision-Test; sie decken die meisten Einstellungs- und Kreditvergabesysteme ab.
2. **Überprüfen Sie die koreanischen Schwellenwerte für inländische Vertreter.** Ziehen Sie den
   Umsatz des letzten Jahres aus KI-Diensten und den dreimonatigen täglichen Benutzer-Durchschnitt
   für Korea heran; wenn einer die Dekret-Linie überschreitet, designieren Sie einen Vertreter und
   geben Sie ihm eine schreibgeschützte Evidence-Ansicht, bevor die Orientierungsphase endet.
3. **Verwandeln Sie Incident-Uhren in Daten.** Legen Sie NIS2-, CRA-, DORA-, SB 53-, RAISE- und
   KI-Verordnung Artikel 73-Uhren in eine Tabelle, die nach Auslöser verschlüsselt ist, und lassen
   Sie die Incident Pipeline sie lesen. Testen Sie sie mit einem Tabletop-Incident, der zwei Regime
   trifft.
4. **Ersetzen Sie "SR 11-7" in Ihrer Model-Governance-Richtlinie.** Verweisen Sie auf SR 26-2 und
   ordnen Sie Ihr Model-Inventar nach der überarbeiteten, risikogestützten Anleitung neu ein.
5. **Lassen Sie die Model Card die Texas-Fragen beantworten.** Zweck, Trainingsdatentypen, Input-
   und Output-Kategorien, Leistungsmetriken, bekannte Grenzen und Überwachung nach der
   Bereitstellung: die acht Punkte, die der Texas Attorney General möglicherweise fordern kann, sind
   ein gutes Minimum für jede Model Card.

**Zuordnung:** Korea AI Basic Act Arts. 2, 4, 31–36, 40, 43 and Enforcement Decree Arts. 23–29 · OMB
M-25-21 §4 and M-26-04 · EO 14365 · Colorado SB 26-189 · Texas HB 149 · California SB 53, SB 942 and
AB 853, AB 2013, SB 243 and the CPPA ADMT regulations · New York RAISE and GBL Art. 47 · Utah AI
Policy Act · Illinois HB 3773 · NYC Local Law 144 · Japan Act No. 53 of 2025 · CAC anthropomorphic
interaction measures · Canada Directive on Automated Decision-Making · Italy Law 132/2025 ·
Singapore Model AI Governance Frameworks and AI Verify · DORA · NIS2 · Cyber Resilience Act · Data
Act · MDR and IVDR · SR 26-2 · PRA SS1/23 · Regulation B · Platform Work Directive · DSA Art. 28 ·
alle fünf Stack-Schichten ([Governance-as-Code](/bok/the-stack#layer-01-govern-as-code) bis
[Assurance & Continuous Compliance](/bok/the-stack#layer-05-assurance--continuous-compliance)).
Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; as amended by Act No. 21311 of 2026-01-20, in force 2026-01-22 and, for Arts. 3(5), 16(3)-(5), 17-2, 18, 22-3 and the second sentence of 35(1), 2026-07-21; Arts. 2(4) high-impact areas, 2(7) operators, 4 scope, 31 transparency, 32 safety, 33 confirmation, 34 high-impact duties, 35 impact assessment, 36 domestic representative, 40 fact-finding, 43 fines up to KRW 30M; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[2] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22; as amended by Presidential Decree No. 36506 of 2026-07-20, in force 2026-07-21, and No. 36580, in force 2026-08-20; Art. 1-2 AI-vulnerable groups, Art. 15(4) confirmation of AI products for public procurement, Art. 23 notice and labelling methods, Art. 24 10^26 FLOP and two further criteria, Art. 25 confirmation procedure and 30-day reply, Art. 27 publication and five-year retention, Art. 28 impact-assessment content, Art. 29 domestic-representative thresholds; version in force 2026-08-20). Korean Law Information Center (MOLEG). 2026-08-18. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288781&efYd=20260820 (verified: primary)
[3] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations; AI Basic Act help desk). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[4] "AI기본법 시행령 7월 시행, 공공조달 AI 확인 제도 핵심 정리" (decree amendment in force 2026-07-21: public-procurement AI confirmation system, liability exemption for adopting officials, AI-vulnerable groups widened to job seekers and women with career breaks, support measures). Korea Data Economy News (한국데이터경제신문). 2026-07-20. https://www.dataeconomy.co.kr/news/articleView.html?idxno=41346 (verified: secondary)
[5] Executive Order 14179, Removing Barriers to American Leadership in Artificial Intelligence (signed 2025-01-23; review of actions taken under the revoked EO 14110; AI action plan within 180 days). Federal Register, Vol. 90, No. 20 (via GovInfo). 2025-01-31. https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm (verified: primary)
[6] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (rescinds M-24-10; high-impact AI definition; minimum practices §4(b); 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[7] "White House Releases New Policies on Federal Agency AI Use and Procurement" (M-25-21 and M-25-22, Driving Efficient Acquisition of Artificial Intelligence in Government). The White House. 2025-04-07. https://www.whitehouse.gov/releases/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/ (verified: primary)
[8] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (implements EO 14319 of 2025-07-23; policies updated by 2026-03-11; minimum LLM transparency: acceptable use policy, model/system/data cards, end-user resources, feedback mechanism). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[9] Winning the Race: America's AI Action Plan (three pillars; funding and state AI regulatory climate; FCC evaluation; NIST AI RMF revision). The White House. 2025-07. https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (verified: primary)
[10] Executive Order 14365, Ensuring a National Policy Framework for Artificial Intelligence (signed 2025-12-11; §3 AI Litigation Task Force in 30 days; §4 Commerce evaluation in 90 days; §5 BEAD and grant conditions; §6 FCC; §7 FTC policy statement; §8 legislative recommendation and carve-outs). Federal Register, Vol. 90, No. 239 (via GovInfo). 2025-12-16. https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm (verified: primary)
[11] National Policy Framework for Artificial Intelligence: Legislative Recommendations (non-binding; preempt unduly burdensome state AI laws; keep generally applicable child-protection, anti-fraud and consumer laws). The White House. 2026-03-20. https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf (verified: primary)
[12] "Navigating the Emerging Federal-State AI Showdown: DOJ Establishes AI Litigation Task Force" (task force announced by the Attorney General on 2026-01-09). BakerHostetler. 2026-01-20. https://www.bakerlaw.com/insights/navigating-the-emerging-federal-state-ai-showdown-doj-establishes-ai-litigation-task-force/ (verified: secondary)
[13] "FTC Seeks Public Comment on Policy Statement Addressing AI Accuracy" (proposed Section 5 policy statement; Colorado AI Act discussed as possibly impliedly preempted; comments to 2026-07-31). Federal Trade Commission. 2026-07-01. https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy (verified: primary)
[14] "Lawmakers propose AI framework that would preempt state laws for 3 years" (Obernolte and Trahan discussion draft, Great American Artificial Intelligence Act of 2026). Nextgov/FCW. 2026-06-04. https://www.nextgov.com/artificial-intelligence/2026/06/lawmakers-propose-ai-framework-would-preempt-state-laws-3-years/413975/ (verified: secondary)
[15] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; developer documentation, deployer notice, 30-day explanation, human review, three-year records; Attorney General enforcement with 60-day cure). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[16] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 2026-06-30, then replaced by SB 26-189; xAI suit filed 2026-04-09; DOJ companion complaint 2026-04-24; stipulated order of 2026-04-27 pausing enforcement). McDermott Will & Emery. 2026-05-27. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[17] "DOJ Intervenes in Lawsuit Challenging Colorado's 'Algorithmic Discrimination' Law" (developer suit filed 2026-04-09 in the District of Colorado; DOJ complaint on Equal Protection grounds). Barnes & Thornburg. 2026-05-01. https://btlaw.com/en/insights/alerts/2026/doj-intervenes-in-lawsuit-challenging-colorados-algorithmic-discrimination-law (verified: secondary)
[18] Texas Responsible Artificial Intelligence Governance Act (HB 149, enrolled; effective 2026-01-01; §552.051 disclosure, §§552.052–552.057 prohibitions, §552.101 no private right of action, §552.103 civil investigative demand items, §552.104 60-day cure, §552.105 penalties, 36-month sandbox). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[19] SB-53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; chaptered 2025-09-29, Chapter 138; 10^26 operations; USD 500M revenue; frontier AI framework; transparency report; incident reports to OES in 15 days or 24 hours; up to USD 1M per violation; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 (verified: primary)
[20] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; transparency reports by all frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[21] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01; s. 22757.4 civil penalty USD 5,000 per violation, each day a discrete violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[22] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01; exemptions). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[23] "California Finalizes Regulations to Strengthen Consumers' Privacy" (ADMT, risk-assessment and cybersecurity-audit regulations approved 2025-09-23; effective 2026-01-01; ADMT from 2027-01-01; attestations from 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[24] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; three-hour reminders for known minors; self-harm protocol; reports from 2027-07-01; private right of action, at least USD 1,000 per violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[25] NY State Senate Bill 2025-S6953B (RAISE Act as signed 2025-12-19: frontier models above 10^26 operations costing over USD 100M; safety protocols; 72-hour incident disclosure; thresholds and the reporting recipient superseded by the chapter amendment signed 2026-03-27, which uses 10^26 operations, USD 500M revenue for large frontier developers and a DFS office, see [26]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[26] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment S8828 signed 2026-03-27; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; all frontier developers report critical safety incidents within 72 hours to a new DFS office, or within 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[27] New York General Business Law Article 47, Artificial Intelligence Companion Models (§1701 self-harm protocol; §1702 notice at start and every three hours; §1703 Attorney General, up to USD 15,000 per day). New York State Senate. 2026. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[28] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; regulated occupations; safe harbour; effective 2025-05-07; AI Policy Act repeal date 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[29] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; IDHR draft rules; Human Rights Act remedies). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[30] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[31] Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (人工知能関連技術の研究開発及び活用の推進に関する法律; Act No. 53 of 2025, promulgated 2025-06-04; Arts. 7, 13, 16, 18; no penalties). e-Gov Law Search (Digital Agency). 2025-06-04. https://laws.e-gov.go.jp/law/507AC0000000053 (verified: primary)
[32] AI Act page (promulgated and partly in force 2025-06-04; fully in force 2025-09-01). Cabinet Office of Japan. 2025. https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html (verified: primary)
[33] AI Basic Plan (Cabinet decisions of 2025-12-23 and 2026-07-14). Cabinet Office of Japan. 2026-07-14. https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html (verified: primary)
[34] Guidelines on ensuring the appropriateness of research, development and use of AI-related technologies (AI Strategy Headquarters decision of 2025-12-19). Cabinet Office of Japan. 2025-12-19. https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_guideline.html (verified: primary)
[35] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; Art. 2 scope; Art. 14 minors; Art. 18 labelling and two-hour reminder; Art. 19 exit; Art. 22 security assessment incl. 1M registered or 100k monthly active users; Art. 26 filing; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[36] PL 2338/2023, Marco Legal da Inteligência Artificial (introduced 2023-05-03; approved by the Senate plenary 2024-12-10; sent to the Chamber of Deputies). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
[37] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; special committee created 2025-04-04; priority regime; awaiting report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[38] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[39] Directive on Automated Decision-Making (effective 2019-04-01; modified 2025-06-24; existing systems to comply by 2026-06-24; AIA, Appendix C impact levels, notice, explanation, peer review, GBA Plus, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[40] "MeitY Unveils India AI Governance Guidelines under IndiaAI Mission" (seven sutras, six pillars, action plan; existing legislation wherever possible). Press Information Bureau, Government of India. 2025-11-05. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639 (verified: primary)
[41] A pro-innovation approach to AI regulation: government response (CP 1019; five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[42] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[43] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[44] AI Cyber Security Code of Practice (code and implementation guide). Department for Science, Innovation and Technology. 2025-01-31. https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice (verified: primary)
[45] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 2026-02-05). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[46] Legge 23 settembre 2025, n. 132, Disposizioni e deleghe al Governo in materia di intelligenza artificiale (GU Serie Generale n. 223 of 2025-09-25; in force 2025-10-10; Arts. 1(2), 4(4), 11(2), 13, 20, 26; consolidated text last updated 2026-06-26). Gazzetta Ufficiale / Normattiva. 2025-09-25. https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg (verified: primary)
[47] Referencia del Consejo de Ministros, 11 March 2025 (Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing; sanctions, deepfake labelling, provisional withdrawal, authorities; sandbox call for up to 12 systems). La Moncloa. 2025-03-11. https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx (verified: primary)
[48] Real Decreto 817/2023, de 8 de noviembre, entorno controlado de pruebas (AI regulatory sandbox). Boletín Oficial del Estado. 2023-11-09. https://www.boe.es/eli/es/rd/2023/11/08/817 (verified: primary)
[49] Guías (16 guides from the Spanish AI regulatory sandbox pilot; non-binding; the page still says they will be updated once the digital Omnibus is approved, as of 2026-09-24). AESIA. 2026. https://aesia.digital.gob.es/es/guias (verified: primary)
[50] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[51] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20, updated 2026-06-05; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[52] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[53] AI Verify Testing Framework (11 internationally recognised AI governance principles; generative-AI update). AI Verify Foundation. 2026. https://aiverifyfoundation.sg/what-is-ai-verify/ (verified: primary)
[54] National AI Plan, "Keep Australians safe" (existing technology-neutral frameworks; AI Safety Institute; six essential practices of the Guidance for AI Adoption; published December 2025; opened via the Internet Archive). Department of Industry, Science and Resources. 2025-12. https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe (verified: primary)
[55] Digital Operational Resilience Act (DORA) (entered into force 2023-01-16; applies from 2025-01-17; ICT and ICT third-party risk; reporting of major ICT-related incidents). European Securities and Markets Authority. 2025. https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora (verified: primary)
[56] NIS2 Directive: questions and answers (transposition by 2024-10-17; early warning 24 hours, notification 72 hours, final report within one month). European Commission. 2024. https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs (verified: primary)
[57] Cyber Resilience Act (in force 2024-12-10; reporting obligations from 2026-09-11; main obligations from 2027-12-11; guidance of 2026-07-27). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act (verified: primary)
[58] Cyber Resilience Act: reporting obligations (24-hour early warning, 72-hour notification, final report 14 days after a corrective measure or one month for severe incidents; single reporting platform). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cra-reporting (verified: primary)
[59] Data Act (in force 2024-01-11; applies from 2025-09-12; access to data from connected products; switching between cloud providers). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/policies/data-act (verified: primary)
[60] MDCG 2025-6, FAQ on interplay between the MDR and IVDR and the Artificial Intelligence Act (how the device regulations and the AI Act apply together; listed on the Commission's MDCG guidance page). Medical Device Coordination Group (European Commission). 2025-06. https://health.ec.europa.eu/document/download/b78a17d7-e3cd-4943-851d-e02a2f22bbb4_en?filename=mdcg_2025-6_en.pdf (verified: primary)
[61] Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft guidance; docket FDA-2024-D-4488). US Food and Drug Administration. 2025-01-07. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing (verified: primary)
[62] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant above USD 30B in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[63] SS1/23, Model risk management principles for banks (published 2023-05-17; effective 2024-05-17; revised version effective 2026-04-23; scope: banks, building societies and PRA-designated investment firms with internal-model approval; five principles). Prudential Regulation Authority (Bank of England). 2026-04. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[64] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[65] "Platform workers: Council adopts new rules to improve their working conditions" (algorithmic management transparency; monitoring by qualified staff; right to contest; two years to transpose). Council of the European Union. 2024-10-14. https://www.consilium.europa.eu/en/press/press-releases/2024/10/14/platform-workers-council-adopts-new-rules-to-improve-their-working-conditions/ (verified: primary)
[66] "Commission publishes guidelines on the protection of minors" (DSA Art. 28 guidelines). European Commission. 2025-07-14. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors (verified: primary)
[67] Online Safety Act: explainer (children's risk assessments due 2025-07-24; child-safety regime in effect from summer 2025). Department for Science, Innovation and Technology. 2025-04-24. https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer (verified: primary)
[68] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[69] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[70] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 29(1): transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[71] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
