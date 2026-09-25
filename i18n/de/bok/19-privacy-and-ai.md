---
lang: de
source: bok/19-privacy-and-ai.md
sourceHash: "b4edeb76a673fe200699b6e6830e31e975325b921be2a2968fbf303a0af74e72"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 19. Datenschutz- und Datenschutzrecht angewendet auf KI

> Datenschutzrecht bindet bereits jedes KI-System, das persönliche Daten berührt; dieses Kapitel
> verwandelt seine Pflichten für Training, Inferenz, Rechte und Verstöße in Artefakte,
> Stack-Schichten und Nachweise.

Datenschutzrecht war das erste KI-Recht. Die DSGVO gilt seit 25. Mai 2018 für jede Verarbeitung
personenbezogener Daten, und ein Modell, das auf Daten trainiert wurde, von ihnen abruft oder über
Menschen entscheidet, verarbeitet personenbezogene Daten an mehreren Punkten seines Lebens {[1]}.
Das KI-Verordnung fügt Pflichten hinzu, ohne Datenschutz zu verdrängen, und sagt dies in ihrem
eigenen Text {[2]}. Die Datenschutzpflichten kommen normalerweise zuerst, tragen Geldstrafen von bis
zu EUR 20 Millionen oder 4% des weltweiten Jahresumsatzes für Verstöße gegen die Kernprinzipien
{[1]}, und erreichen Systeme, die die KI-Verordnung nie als Hochrisiko klassifiziert.

Die DSGVO ist hier das Rückgrat, mit kurzen Kontrasten zum UK GDPR, den US-Staatsgesetzen,
Brasiliens LGPD und Chinas PIPL. Jede Pflicht löst sich in ein **Artefakt**, eine **Stack-Schicht**
(Kapitel 04) und einen **Nachweisdatensatz** auf, den eine Abfrage zurückgeben kann. Eine Zeile der
Disambiguierung: Der Datenschutzbeauftragte und die Datenschutzberatung entscheiden, ob eine
rechtmäßige Grundlage besteht; der KI-Governance-Engineer erstellt den Datensatz, der die
Entscheidung zeigt, die Kontrolle, die sie durchsetzt, und das Signal, das sagt, wann sie nicht mehr
galt. Dies ist technische Übersetzung, keine Rechtsberatung.

## Wie man dieses Kapitel liest

Ein KI-System verarbeitet personenbezogene Daten an mehr Momenten als seine Besitzer normalerweise
aufzählen, und jeder Moment ist eine separate Verarbeitungstätigkeit mit eigenem Zweck, Grundlage,
Aufbewahrung und Rechtsexposition. Die Tabelle verwendet das laufende Beispiel aus Kapitel 04,
{`csa-01`}, einen Kundenservice-Assistenten bei einem großen Telekommunikationsunternehmen,
feinabgestimmt auf frühere Support-Transkripte, abrufend aus Kontodaten und aufrufend ein Modell
eines Drittanbieters.

| Verarbeitungsmoment | Personenbezogene Daten ({`csa-01`}) | Was das Recht zuerst fragt | Nachweisdatensatz |
|---|---|---|---|
| Erfassung zum Training | Historische Transkripte | Zweckkompatibilität; Grundlage; Mitteilung | Grundlageneintrag im Register |
| Training und Feinabstimmung | Gefilterte Transkripte | Minimierung; Screening spezieller Kategorien | Data Card; Filterprotokoll |
| Abruf (RAG) Indexierung | Kontodaten | Zugriffskontrolle; Aufbewahrung; Rechtsreichweite | Index-Manifest |
| Inferenz | Live-Prompts und Ausgaben | Transparenz; Übertragungen; ADM-Grenzen | Trace mit Policy-Verdikten |
| Protokollierung und Überwachung | Prompts, Ausgaben, Traces | Speicherbegrenzung; Sicherheit | Aufbewahrungsverdikt |
| Bewertung | Golden und Red-Team-Sets | Minimierung; synthetisch wo möglich | Eval-Set-Card |

Data cards live in layer 02 ([Inventory &
Transparency](/bok/the-stack#layer-02-inventory--transparency)); purpose, retention and residency
rules in layer 01; privacy tests in layer 03; redaction, filters and routing in layer 04; and the
records a regulator asks for in layer 05. Two neighbouring chapters carry the organisational side:
chapter 12 on [updating the policies you already have](/bok/governance-program#updating-the-policies-you-already-have),
and chapter 14 on [the right to use the data](/bok/governing-development#the-right-to-use-the-data)
at the [dataset admission gate](/patterns/dataset-admission-gate).

## Grundsätze angewendet auf KI

Artikel 5 DSGVO legt die Grundsätze fest (Rechtmäßigkeit, Fairness und Transparenz; Zweckbindung;
Datenminimierung; Genauigkeit; Speicherbegrenzung; Integrität und Vertraulichkeit) und macht den
Verantwortlichen in der Lage, die Einhaltung nachzuweisen, die Rechenschaftspflicht {[1]}. Für KI
ändern sich die Grundsätze nicht; wo sie beißen, tun sie es.

### Rechtmäßige Grundlage für Training versus Inferenz

Article 6 offers six lawful bases and none ranks above another; the controller picks the one that
fits each processing activity [3]. The trap is to pick one basis for "the model". Training on
transcripts, indexing account notes and answering a live customer are different activities, and each
needs its own basis. [The Garante's ChatGPT order](/cases/garante-chatgpt-order) shows what an
unrecorded basis costs.

| Phase | Grundlagen, die normalerweise passen | Warum die Wahl schwer ist |
|---|---|---|
| Training eines Modells mit gescrapten oder Drittanbieterdaten | Berechtigte Interessen (`Art. 6(1)(f)`) | Keine Beziehung zu den Personen; indirekte Mitteilung; Widerspruch muss funktionieren |
| Fine-Tuning auf Kundendaten, die Sie halten | Berechtigte Interessen; manchmal Einwilligung | Neuer Zweck; Kompatibilitätsprüfung; Erwartungen |
| Abruf über Kundendatensätze | Vertrag (`Art. 6(1)(b)`) für diesen Kunden | Der Index darf nicht einen Kunden mit Daten eines anderen beantworten |
| Inferenz im Dienste des Kunden | Vertrag; berechtigte Interessen | Notwendigkeit ist eng gefasst |
| Protokollüberwachung und Missbrauchsprüfung | Berechtigte Interessen; rechtliche Verpflichtung | Aufbewahrung driftet; menschliche Überprüfung erweitert den Zugriff |

Das Artefakt ist ein **Basis-Register**: jeder Datensatz und jede Phase trägt seine Basis, seinen
Zweck und einen Verweis auf die dahinter stehende Bewertung, angehängt an den Registry-Eintrag des
Systems. Ein Trainingsauftrag liest ihn und weigert sich, auf einem Datensatz ausgeführt zu werden,
dessen Basis das Training nicht abdeckt.

> **Beispiel (illustrativ)**
> Ein Basis-Register-Eintrag, der von der `csa-01`}-Trainings-Pipeline vor einer Ausführung gelesen
> wird:
>
> ```json
> { "dataset": "support-transcripts-2025q4", "system": "csa-01", "stage": "fine-tuning",
>   "basis": "Art. 6(1)(f)", "lia_ref": "lia-csa-01-v3", "purpose": "support-answer-quality",
>   "special_category_scan": "pass", "retention": "P18M", "objection_opt_out": true }
> ```

### Berechtigte Interessen und der Drei-Stufen-Test

Berechtigte Interessen sind die Basis, auf die sich KI-Entwickler am ehesten stützen [4]. Der EDPB
hat in der Stellungnahme 28/2024 vom 17. Dezember 2024 dargelegt, wie Behörden diese prüfen [3]. Das
Interesse muss rechtmäßig, präzise formuliert und real und gegenwärtig sein. Die Verarbeitung muss
notwendig sein, ohne dass es einen weniger aufdringlichen Weg gibt, um das gleiche Ziel zu
erreichen, beurteilt mit Minimierung im Sinn. Und das Interesse darf nicht durch die Rechte der
Personen aufgewogen werden, wobei angemessene Erwartungen stark wiegen: ob die Daten öffentlich
waren, die Beziehung zum Verantwortlichen, die Quelle und ihre Datenschutzeinstellungen, ob Personen
wissen, dass ihre Daten online sind [3].

Wenn die Waage kippt, können Abhilfemaßnahmen über das hinaus, was die DSGVO bereits verlangt, das
Gleichgewicht wiederherstellen. Die Beispiele des EDPB umfassen das Maskieren von Namen und E-Mails
mit gefälschten Werten, eine Verzögerung zwischen der Erfassung eines Datensatzes und dem Training
darauf, ein bedingungsloses Opt-out vor der Verarbeitung, Löschung über die Gründe des Artikels 17
hinaus, einen Kanal zur Meldung von Regurgitation, Ausschluss aufdringlicher Quellen und Einhaltung
von `robots.txt` oder {`ai.txt`} beim Scraping sowie Ausgabefilter bei der Bereitstellung [3]. Die
CNIL fügt ein diskretionäres vorheriges Widerspruchsrecht und Transparenz über das Extraktionsrisiko
hinzu [4].

Jede Abhilfemaßnahme ist eine Kontrolle, daher ist die **Bewertung berechtigter Interessen (LIA)**
ein versioniertes Artefakt, das jede Abhilfemaßnahme auf die Kontrolle verweist, die sie umsetzt
(der Opt-out-Endpunkt, die Filter-Regel-ID, die Scraping-Allowlist). Schalten Sie eine
Abhilfemaßnahme aus und die LIA wird veraltet; das Register sollte das anzeigen.

### Die Grenzen der Einwilligung

Consent must be specific, informed and freely given; the controller must prove it; and people may
withdraw it at any time, as easily as they gave it, with effect for the future [1]. Withdrawal after
training does not remove a person's influence from computed weights, so a consent-based training set
commits the controller to a removal path it can actually run (see "Suppression, retraining and
unlearning" below). Consent to a service is also not consent to train a model on the service's data.
The artefact is a **consent-purpose log** joining each consent to the datasets and model versions
that inherited it; without that join a withdrawal cannot be traced to the runs it affects. China's
PIPL adds a separate consent for sensitive personal information [5].

### Transparenz für die Personen in den Daten

Die Artikel 13 und 14 erfordern eine Mitteilung, und Artikel 14 deckt Daten ab, die nicht von der
Person erfasst wurden, der normale Fall für gescrapte oder lizenzierte Trainingsdaten [1]. Wenn
Artikel-22-Entscheidungen beteiligt sind, muss die Mitteilung und der Zugang aussagekräftige
Informationen über die beteiligten Logik und die vorgesehenen Folgen enthalten [1]. Eine für den
ursprünglichen Dienst geschriebene Mitteilung beschreibt selten das Training, und eine Mitteilung,
die das Modell des letzten Jahres beschrieb, ist nach einem Umschulung auf neue Quellen falsch.
Generieren Sie die Mitteilung aus dem gleichen Registry-Eintrag wie die Model Card, damit sie sich
ändert, wenn sich die Quellen ändern; der EDPB nennt Model Cards unter den Wegen, um die
Informationslücke zu schließen [3].

### Zweckbindung und Funktionserweiterung

Daten dürfen nicht auf eine Weise weiterverarbeitet werden, die mit ihrem ursprünglichen Zweck
unvereinbar ist; Artikel 6 Absatz 4 setzt den Test: die Verbindung zwischen Zwecken, der Kontext,
die Art der Daten, die Folgen und die Schutzmaßnahmen, wie Verschlüsselung oder Pseudonymisierung
[1]. KI macht jeden gespeicherten Datensatz wie Trainingsdaten aussehen, und die Ausfälle sind
**Funktionserweiterung**: Support-Transkripte, die wiederverwendet werden, um Kunden für den Verkauf
zu profilieren, Sicherheitsaufnahmen, die für die Anwesenheit wiederverwendet werden,
Betrugsfunktionen, die für Kreditlimits wiederverwendet werden.

Die Kontrolle ist ein Zweck-Tag, das mit den Daten reist, und eine Layer-01-Regel, die den Zweck auf
der Karte des Datensatzes mit dem Zweck vergleicht, der vom verbrauchenden System erklärt wird, und
den Lauf verweigert, wenn sie sich unterscheiden und keine Kompatibilitätsbewertung aufgezeichnet
ist. Ein verweigerter Join ist ein Beweis für das Zweckbindungs-Bit.

> **In der Praxis (illustrativ)**
> Ein Analytics-Team wurde gebeten, ein Churn-Modell auf den für {`csa-01`} erfassten Transkripten
> zu fine-tunen. Die Zweckprüfung verweigerte den Job: die Karte sagte {`support-answer-quality`},
> der Anforderer sagte {`retention-marketing`}, und es gab keine Kompatibilitätsbewertung. Die
> Anfrage wurde zu einer Artikel-6-Absatz-4-Bewertung, die nur aggregierte Themenzählungen erlaubte,
> und der verwiegerte Lauf und die Bewertung wurden beide gegen den Registry-Eintrag des Datensatzes
> eingereicht.

**Zuordnung:** DSGVO `Arts. 5–7`, `13`, `14` · KI-Verordnung {`Art. 10`}, {`Art. 13`} · ISO/IEC
42001 · ISO/IEC 27701 · NIST AI RMF (Map) · Schichten 01 und 02. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Minimierung, Datenschutz durch Technikgestaltung und PETs

Daten müssen angemessen, relevant und auf das beschränkt sein, was der Zweck benötigt, und Artikel
25 verlangt dies durch Technikgestaltung (Maßnahmen wie Pseudonymisierung, die eingebaut sind) und
durch datenschutzfreundliche Voreinstellungen (nur die Daten, die jeder Zweck benötigt, werden
verarbeitet und zugänglich gemacht) [1]. Machine Learning zieht in die andere Richtung, daher wird
Minimierung Feature für Feature argumentiert, nicht einmal behauptet:

- **Feature-Level-Begründung.** Jedes Eingabe-Feature trägt einen Grund und einen gemessenen Beitrag
  in der Data Card; eines ohne beides wird entfernt, und Felder mit besonderen Kategorien benötigen
  eine dokumentierte Bedingung.
- **Filterung vor dem Training.** PII- und Scans mit besonderen Kategorien laufen auf jedem Snapshot
  und das Filterprotokoll wird damit aufbewahrt; der EDPB listet Quellenauswahl, Vorbereitung und
  Filterung unter den Bereichen auf, die eine Behörde prüft [3].
- **Minimaler Abruf und Protokolle.** RAG-Indizes enthalten nur die Felder, die Antworten benötigen;
  die Aufbewahrung von Protokollen folgt der Verpflichtung, nicht dem Speicher-Standard. Die
  Spannung mit den Protokollierungspflichten der KI-Verordnung (siehe
  [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) wird gelöst, indem protokolliert wird,
  was die Verpflichtung benötigt, pseudonymisiert, wo es erlaubt.
- **Synthetische oder maskierte Eval-Sets** überall dort, wo ein Test nicht von echten Identitäten
  abhängt.

### Anonymisierung versus Pseudonymisierung

Die Unterscheidung entscheidet, ob die DSGVO gilt. **Pseudonymisierte** Daten können einer Person
ohne zusätzliche Informationen, die separat aufbewahrt werden, nicht zugeordnet werden [1]; Daten,
die mit dieser Information wieder zugeordnet werden können, sind immer noch über eine
identifizierbare Person [1], und die Richtlinien des EDPB von 2025 behandeln Pseudonymisierung als
eine gut anzuwendende Schutzmaßnahme [6]. **Anonyme** Daten fallen außerhalb der DSGVO, aber
Erwägungsgrund 26 beurteilt die Identifizierbarkeit gegen alle Mittel, die vernünftigerweise
wahrscheinlich verwendet werden, durch den Verantwortlichen oder eine andere Person, angesichts von
Kosten, Zeit und Technologie [1].

In EDPS gegen SRB (C-413/23 P, 4. September 2025) entschied der Gerichtshof, dass pseudonymisierte
Daten nicht in allen Fällen und für jede Person personenbezogene Daten sind, da Pseudonymisierung
einen Empfänger daran hindern kann, jemanden zu identifizieren; aber die eigenen Pflichten des
Verantwortlichen, wie das Informieren von Personen, werden vom Standpunkt des Verantwortlichen zum
Zeitpunkt der Erfassung beurteilt [7]. In einer KI-Lieferkette kann ein Anbieter, der gut
pseudonymisierte Datensätze ohne den Schlüssel erhält, für diese außerhalb der DSGVO liegen; der
Absender ist es nicht.

Anonymisierungsansprüche verfallen. Eine Studie schätzte, dass 99,98 % der Amerikaner in jedem
Datensatz mit 15 demografischen Attributen korrekt wieder identifiziert würden [8]. Führen Sie eine
**Neuentdeckungs-Bewertung** mit jedem „anonymen

### Datenschutzfördernde Technologien und ihre ehrlichen Grenzen

Datenschutzfördernde Technologien (PETs) reduzieren, was ein Angreifer, Anbieter oder Insider lernen
kann. Keine macht ein System konform, und jede hat einen bekannten Fehlermodus.

| PET | Was es tut | Was es nicht tut | Nachweisdatensatz |
|---|---|---|---|
| Differenzielle Privatsphäre | Begrenzt, wie sehr ein Datensatz ein Ergebnis oder Modell ändern kann | Daten außerhalb des Budgets abdecken; ein schlecht eingestelltes oder zurückgesetztes Budget überstehen | Datenschutz-Budget pro Veröffentlichung, mit Abrechnungsmethode |
| Föderiertes Lernen | Trainiert, wo die Daten leben [9] | Daten in gemeinsamen Gradienten verbergen, die Beispiele auslaufen können [10] | Aggregation und DP-Einstellungen |
| Synthetische Daten | Ersetzt echte Datensätze für Tests oder Sharing | Garantieren Sie Datenschutz: Es schlägt entweder fehl, Inferenz-Angriffe zu stoppen, oder verliert Nutzen [11] | Generator-Karte; Angriffsergebnisse |
| Pseudonymisierung und Maskierung | Entfernt direkte Identifikatoren | Daten anonym machen; Quasi-Identifier-Verknüpfung stoppen | Schlüssel-Verwaltungsprotokoll; Maskierungsregeln |
| Vertrauenswürdige Ausführung (Enklaven) | Schützt Daten in Gebrauch vor dem Host | Vertrauen in den Hardware-Anbieter entfernen; Memorisierung beheben | Attestierungsbericht pro Workload |
| Ausgabefilterung und Redaktion | Blockiert personenbezogene Daten zur Laufzeit | Daten aus dem Modell entfernen; jede Umschreibung erfassen | Guardrail-Entscheidungen mit Regel-IDs |

NIST SP 800-226 ist die Referenz für die Bewertung von Ansprüchen zur differenziellen Privatsphäre
und nennt die „Datenschutz-Gefahren", die in der Implementierung auftreten [12]. Ein PET-Anspruch
ist eine Eval wie jede andere: ein Schwellenwert, ein benannter Angriff, ein fehlgeschlagener Build,
wenn der Schwellenwert verfehlt wird.

> **In der Praxis (illustrativ)**
> Ein Team tauschte echte Datensätze in {`csa-01`}'s Regressions-Suite gegen synthetische aus und
> nahm an, das Problem sei gelöst. Ein Membership-Inference-Test, der zum Eval-Gate hinzugefügt
> wurde, kennzeichnete seltene Datensätze, die fast wörtlich reproduziert wurden. Der Generator
> wurde mit einem Datenschutz-Budget umgeschult, der Test blieb als permanentes Gate, und die Karte
> des synthetischen Sets trägt nun das Angriffsergebnis als Beweis seiner Eignung.

**Zuordnung:** DSGVO `Art. 5(1)(c)`, `Art. 25`, `Art. 32` · KI-Verordnung {`Art. 10`}, {`Art. 4a`} ·
ISO/IEC 27701 · NIST AI RMF (Measure) ·
[Datenverwaltung über den Stack](/bok/the-stack#data-governance-across-the-stack) · Schichten 01, 03
und 04. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Pflichten des Verantwortlichen über die KI-Lieferkette

### Verantwortlicher, Auftragsverarbeiter oder gemeinsamer Verantwortlicher

Ein **Verantwortlicher** entscheidet über Zwecke und Mittel; ein **Auftragsverarbeiter** handelt in
seinem Auftrag; Parteien, die gemeinsam entscheiden, sind **gemeinsame Verantwortliche** und müssen
Verantwortlichkeiten aufteilen [1]. Die Rollen des Anbieters und des Betreibers nach dem
KI-Verordnung entsprechen diesen nicht eins zu eins: Ein Betreiber ist normalerweise ein
Verantwortlicher, und ein Modellanbieter kann für Sie ein Auftragsverarbeiter für Inferenz und ein
Verantwortlicher für sein eigenes Training sein.

| Akteur | Typische DSGVO-Rolle | Was bestimmt es |
|---|---|---|
| Modellentwickler trainiert auf Daten, die er gesammelt hat | Verantwortlicher für Training | Er wählte Quellen und Zweck |
| API-Anbieter, der Ihre Inferenz bedient | Auftragsverarbeiter | Er handelt nur nach dokumentierten Anweisungen [1] |
| Derselbe Anbieter trainiert auf Ihren Prompts | Verantwortlicher für diese Verarbeitung | Ein Auftragsverarbeiter, der Zwecke bestimmt, ist ein Verantwortlicher für diese Verarbeitung [1] |
| Ihre Organisation stellt den Assistenten bereit | Verantwortlicher | Sie entscheidet, warum Kundendaten verarbeitet werden |
| Partner, die gemeinsam auf gepoolten Daten trainieren | Gemeinsame Verantwortliche | Sie entscheiden gemeinsam über Zwecke und Mittel |

Führen Sie einen **Rolleneintrag** pro System und Phase mit dem Registereintrag: Ein
Verantwortlicher führt die DSFA durch und beantwortet Anfragen; ein Auftragsverarbeiter unterstützt
und benachrichtigt Verletzungen dem Verantwortlichen ohne unangemessene Verzögerung [1].

### KI-Anbieter-DPAs und No-Training-Klauseln

Artikel 28 erfordert einen Vertrag, unter dem der Auftragsverarbeiter nur nach dokumentierten
Anweisungen handelt, einschließlich Transfers [1]. Für KI-Anbieter sollte das
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) Klauseln prüfen, die
eine generische Vereinbarung übersieht:

- **Kein Training mit Kundendaten** (Prompts, Outputs, Dateien, Embeddings, Feedback), jede Opt-in
  explizit.
- **Aufbewahrung von Prompts und Outputs**, einschließlich Missbrauchsüberwachung und
  Personalüberprüfung.
- **Verarbeitungsort** pro Endpunkt und Funktion, einschließlich Support-Zugriff.
- **Unterauftragsverarbeiter**, mit Benachrichtigung und Einspruch, wenn ein Modellhost wechselt.
- **Löschung und Rückgabe** bei Vertragsende, beglaubigt.
- **Verletzungsmitteilung** auf einer Uhr, die Raum für die eigenen 72 Stunden des Verantwortlichen
  lässt.
- **Änderungsmitteilung**, wenn sich das Modell, seine Datenschutzrichtlinie oder seine Region
  ändert.
- **Nachweise**: Model Card, Sicherheitsattestierungen und jede AIBOM, bereitgestellt als
  gespeicherte Dokumente.

Der Eintrag des Gates (Checklisttenantworten, Vertragsreferenz, Datum) sitzt auf dem Registereintrag
des Anbieters und wird bei jeder gemeldeten Änderung erneut ausgeführt.

### Die DSFA für KI-Systeme

Eine **DSFA** ist erforderlich, bevor eine Verarbeitung wahrscheinlich zu einem hohen Risiko führt,
besonders bei neuen Technologien, und immer für die drei Fälle des Artikels 35(3): systematische
Bewertung mit erheblichen automatisierten Entscheidungen, großflächige Verarbeitung besonderer
Kategorien und großflächige Überwachung öffentlicher Räume [1]. Die Richtlinien der
Artikel-29-Arbeitsgruppe, gebilligt durch den EDPB, geben neun Kriterien und sagen, dass eine
Verarbeitung, die zwei davon erfüllt, normalerweise eine DSFA benötigt [13]. KI-Systeme erfüllen
mehrere gleichzeitig:

| Kriterium [13] | Typischer KI-Fall |
|---|---|
| Bewertung oder Scoring | Risikoscores, Neigungsmodelle, Kandidatenranking |
| Automatisierte Entscheidungen mit rechtlicher oder ähnlicher Wirkung | Kredit, Einstellung, Versicherung, Berechtigung |
| Systematische Überwachung | Arbeitsplatz-, Video- oder Agent-Aktivitätsanalysen |
| Sensible oder hochpersönliche Daten | Gesundheit, Biometrie, abgeleitete Merkmale |
| Großer Umfang; Abgleich oder Kombination von Datensätzen | Web-Umfang-Korpora; zusammengeführte Trainingssätze |
| Vulnerable Datensubjekte | Arbeitnehmer, Kinder, Patienten |
| Innovative Technologie | Generative Modelle, Agenten, Emotionsanalyse |
| Verhinderung der Ausübung eines Rechts oder Nutzung eines Dienstes | Automatisierte Berechtigungsgates |

Eine KI-DSFA benötigt Felder, die eine generische Vorlage nicht hat: jeden Verarbeitungsmoment mit
seiner Grundlage, Trainingsquellen und Filterung, Memorisierungsrisiko mit den Eval-Ergebnissen, die
es messen, die ADM-Analyse, die Anbieter- und Transferkarte, das Überwachungsdesign und den
Rechtspfad für Daten im Modell. Artikel 35(7) setzt den Mindestinhalt fest, und wenn das Restrisiko
hoch bleibt, konsultiert der Verantwortliche die Behörde zuerst, die bis zu acht Wochen Zeit hat zu
antworten [1]. Der EDPB erwartet DPIAs und auch Entscheidungen, dass eine nicht erforderlich war
[3], also "keine DSFA" ist auch ein Artefakt. Betreiber von Hochrisiko-Systemen verwenden die
Artikel-13-Informationen des Anbieters für ihre DSFA [14], und die Artikel-27-FRIA ergänzt eher eine
DSFA als sie zu wiederholen [15]; das [FRIA-as-Code](/patterns/fria-as-code)-Muster schreibt die
gemeinsamen Felder einmal. Die Vorlagenseite hat einen
[KI-DSFA-Nachtrag](/resources/templates#schema-impact-assessment) in ihrem Impact-Assessment-Schema.

### Verarbeitungsverzeichnis

Artikel 30 erfordert ein Verarbeitungsverzeichnis (ROPA): Zwecke, Datenkategorien und Personen,
Empfänger, Transfers, Aufbewahrung, Sicherheit [1]. Ein KI-System bedeutet normalerweise einen
Eintrag pro Verarbeitungsmoment, und die Einträge werden mit jeder Pipeline-Änderung veraltet, also
generieren Sie sie aus dem Register, den Data Cards und dem Basis-Register. Der neue Artikel 4a der
KI-Verordnung stützt sich auf diesen Eintrag: Wenn Daten besonderer Kategorien zur Bias-Erkennung
verarbeitet werden, muss das ROPA sagen, warum dies streng erforderlich war und warum andere Daten
nicht ausreichen würden [2].

### Transfers, Remote-Inferenz und TIAs

Kapitel V DSGVO erfordert eine Grundlage für jeden Transfer in ein Drittland: Angemessenheit,
angemessene Garantien wie Standardvertragsklauseln oder eine enge Ausnahmeregelung [1]. Die drei
kumulativen Kriterien des EDPB definieren einen Transfer (ein der DSGVO unterliegender Exporteur
stellt personenbezogene Daten einem Importeur in einem Drittland zur Verfügung), und seine
Richtlinien behandeln Remote-Zugriff aus einem Drittland als Transfer [16]. Für KI, die einen Prompt
mit personenbezogenen Daten an einen Endpunkt außerhalb des EWR sendet, Anbieter-Telemetrie, die
Prompts trägt, ein Failover in eine andere Region und ein ausländisches Support-Team, das Logs lesen
kann.

Wenn die Grundlage vertraglich ist, führt der Exporteur eine **Transfer-Auswirkungsbewertung**
durch, ob das Gesetz des Importeurs es ihm ermöglicht, die Klauseln einzuhalten, und fügt ergänzende
Maßnahmen hinzu, wie der EDPB empfiehlt [17], unter den Standardvertragsklauseln von 2021 [18]. Für
die Vereinigten Staaten deckt die Angemessenheitsentscheidung des Data Privacy Framework vom 10.
Juli 2023 zertifizierte Organisationen ab [19], und der Gerichtshof erster Instanz lehnte eine Klage
auf Aufhebung am 3. September 2025 ab [20]. Verzeichnen Sie, dass die Anbieterentität für die
betreffenden Daten zertifiziert ist.

Die Kontrolle erstreckt sich auf die Residenzregel von Kapitel 04
([layer 01](/bok/the-stack#layer-01-govern-as-code)): Leiten Sie Inferenz für jede Datenkategorie
nur zu Endpunkten, deren Grundlage verzeichnet ist, verweigern Sie andernfalls, und geben Sie das
Urteil aus. Der Nachweis ist der Urteilsstrom plus ein Transfer-Register (Endpunkt, Region,
Importeur, Grundlage, TIA-Referenz, Überprüfungsdatum).

> **In der Praxis (illustrativ)**
> Als `csa-01`'s Anbieter ein von einer US-Region bedientes Modell ankündigte, löste die
> Änderungsmitteilung das Due-Diligence-Gate aus. Es prüfte die
> Data-Privacy-Framework-Zertifizierung des Anbieters, speicherte die Prüfung im Transfer-Register,
> und die Residenzrichtlinie erlaubte dann den neuen Endpunkt nur für pseudonymisierte
> Support-Prompts. Kontodaten blieben auf dem EU-Endpunkt, und die Richtlinien-Urteile in den Traces
> bewiesen, welche Daten wohin gingen.

**Zuordnung:** DSGVO `Arts. 26`, `28`, `30`, `35`, `36`, `44`–`46` · KI-Verordnung `Art. 4a`,
`Art. 26(9)`, `Art. 27(4)` · ISO/IEC 42001 Annex A.10 · ISO/IEC 27701 · NIST AI RMF (Govern, Map) ·
Schichten 01, 02 und 05. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Automatisierte Entscheidungsfindung

### DSGVO Artikel 22 nach SCHUFA

Artikel 22 gibt Menschen das Recht, nicht Gegenstand einer Entscheidung zu sein, die ausschließlich
auf automatisierter Verarbeitung, einschließlich Profiling, mit rechtlicher oder ähnlich erheblicher
Wirkung beruht. Solche Entscheidungen sind nur zulässig, wenn sie für einen Vertrag erforderlich
sind, durch Gesetz autorisiert oder auf ausdrücklicher Zustimmung beruhen, und dann mit mindestens
dem Recht auf menschliche Einmischung, eine Ansicht zu äußern und zu widersprechen [1]. Kapitel 16
verwandelt
[automatisierte Entscheidungsfindung unter DSGVO Art. 22](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime)
in Erklär- und Widerspruchsverzeichnisse.

Zwei Urteile setzen die Engineering-Aufgabe. In SCHUFA (C-634/21, 7. Dezember 2023) entschied der
Gerichtshof, dass ein Kreditwert selbst eine automatisierte Entscheidung ist, wenn Kreditgeber ihm
eine bestimmende Rolle geben [21] (die Kreditrechtsseite ist in Kapitel 20,
[Kredit und Kreditvergabe](/bok/existing-law#credit-and-lending)). Ein Modell, das "nur empfiehlt",
fällt unter Artikel 22, wenn nachgelagerte Menschen es als Regel befolgen, und die Partei, die den
Score produziert, entscheidet selbst. In Dun & Bradstreet Austria (C-203/22, 27. Februar 2025)
entschied der Gerichtshof, dass aussagekräftige Informationen über die Logik bedeuten, das
tatsächlich angewendete Verfahren und die Grundsätze zu beschreiben, damit die Person versteht,
welche Daten verwendet wurden und wie; dass das Angeben, wie weit eine Änderung der Daten das
Ergebnis geändert hätte, angemessen sein kann; dass die Übergabe eines Algorithmus keine Erklärung
ist; und dass behauptete Geschäftsgeheimnisse zur Behörde oder zum Gericht gehen, um abzuwägen [22].

Die Artefakte folgen: ein **Entscheidungsverzeichnis** pro Entscheidung (Modellversion, Eingaben,
Ergebnis, Grundcodes, kontrafaktisch); eine **Mitteilung**, dass eine ausschließlich automatisierte
Entscheidung getroffen wurde und wie man widerspricht; ein
**[Widerspruchspfad](/patterns/decision-notice-contest-path)** zu einem Prüfer mit Autorität und
Informationen, um das Ergebnis zu ändern, mit einem Verzeichnis dessen, was sie taten; und ein
Monitor der Aufsicht selbst, denn ein Prüfer, der fast jede Ausgabe in Sekunden bestätigt, ist keine
aussagekräftige Einmischung (das [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)-Muster).

> **Beispiel (illustrativ)**
> Ein Entscheidungsverzeichnis für `credit-check-04`, eine Handset-Finanzierungsprüfung eines
> Telekommunikationsanbieters, zur Laufzeit eingereicht:
>
> ```json
> { "decision_id": "cc4-2026-09-18-0192", "system": "credit-check-04@3.2",
>   "solely_automated": true, "basis": "GDPR Art. 22(2)(a)", "outcome": "declined",
>   "reason_codes": ["R07 payment arrears", "R12 short credit history"],
>   "counterfactual": "approval likely after six months without arrears",
>   "notice_sent": "2026-09-18T10:02:11Z", "contest_channel": "human-review-queue" }
> ```

### Die Regime nebeneinander

| Regelwerk | Auslöser | Kernpflicht oder Recht | Artefakt | Schicht |
|---|---|---|---|---|
| GDPR `Art. 22`, `Art. 15(1)(h)` | Ausschließlich automatisierte Entscheidung, rechtliche oder ähnliche Wirkung | Enge Erlaubnis; Einmischung, Ansicht, Widerspruch; Information über die Logik [1][22] | Entscheidungsverzeichnis; Mitteilung; Widerspruchspfad | 4 · 5 |
| UK GDPR `Arts. 22A–22D` | Erhebliche Entscheidung ohne aussagekräftige menschliche Einmischung | Zulässig mit Garantien; enger für Daten besonderer Kategorien [23] | Dasselbe, plus warum Einmischung aussagekräftig ist | 4 · 5 |
| CCPA-ADMT-Vorschriften | ADMT für eine erhebliche Entscheidung | Vorabmitteilung; Opt-out oder menschlicher Einspruch; Zugang; ab 1. Januar 2027 [24] | Mitteilung; Opt-out- und Einspruchsworkflow; Risikobewertung | 2 · 4 · 5 |
| US-Staatsgesetze (Virginia, Colorado, Minnesota) | Profiling für Entscheidungen mit rechtlicher oder ähnlicher Wirkung | Opt-out [25][26]}; in Minnesota, das Ergebnis in Frage stellen, den Grund erfahren, Neubewertung auf korrigierten Daten {[27] | Opt-out-Flag bei Inferenz beachtet; Review-Workflow | 1 · 4 |
| LGPD `Art. 20` | Entscheidung ausschließlich durch automatisierte Verarbeitung, die Interessen beeinträchtigt | Überprüfung; Information über Kriterien, Geschäftsgeheimnisse respektierend [28] | Review-Workflow; Kriterienaussage | 4 · 5 |
| PIPL `Art. 24` | Automatisierte Entscheidung mit erheblicher Auswirkung | Transparenz, Fairness; Erklärung; Ablehnung ausschließlich automatisierter Entscheidungen [5] | Erklärungsservice; manuelle Route | 4 |
| KI-Verordnung `Art. 86`, `Art. 26(11)` | Betreiber-Entscheidung über eine Annex-III-Hochrisiko-Ausgabe | Erklärung der Rolle des Systems und seiner Hauptelemente; Informieren von Personen [29][14] | Erklärung bezogen auf den Entscheidungsdatensatz | 4 · 5 |

Artikel 86 gilt nur, wenn das Unionsrecht das Recht nicht bereits gewährt [29], daher funktioniert
die DSGVO-Route normalerweise (Kapitel 18 liest
[KI-Verordnung Artikel 86 und Artikel 4a](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
im Kontext). Sie liegt außerhalb der Anforderungen von Annex III, die das Omnibus auf den 2.
Dezember 2027 verschoben hat [2], und ob sie früher greift, ist zum 2026-09-24 nicht geklärt
(überprüfen). Der Digital-Omnibus-Vorschlag würde Artikel 22 als Positivliste umgestalten, in der
vertragliche Notwendigkeit gilt, auch wenn ein Mensch entscheiden könnte [30]; es ist nicht Gesetz
(siehe unten).

**Zuordnung:** DSGVO `Art. 13(2)(f)`, `Art. 15(1)(h)`, `Art. 22` · UK DSGVO `Arts. 22A–22D` · CCPA
ADMT-Verordnungen · LGPD `Art. 20` · PIPL `Art. 24` · KI-Verordnung der EU `Art. 14`, `Art. 26(11)`,
`Art. 86` · NIST AI RMF (Manage) · Schichten 04 und 05. Zuordnungen sind illustrativ, keine
Konformitätserklärung.

## Rechte von Betroffenen gegen trainierte Modelle

### Wo eine Anfrage ankommen muss

Rechte auf Zugang, Berichtigung, Löschung und Widerspruch [1] enden nicht bei der Datenbank. Die
Frist beträgt einen Monat, verlängerbar um zwei Monate für komplexe Anfragen [31], daher wird der
Weg vor der ersten Anfrage gestaltet. Ein Verantwortlicher, der eine Person in einem
Trainingsdatensatz nicht identifizieren kann, kann dies mitteilen, und die Person kann Informationen
liefern, die eine Identifizierung ermöglichen [31].

| Wo die Daten liegen | Machbare Reaktion auf Löschung oder Widerspruch | Evidenz |
|---|---|---|
| Quellsysteme und Rohdatenbestand | Normale Anfrage-Tools | Ticket-Abschluss |
| Trainings- und Fine-Tuning-Snapshots | Entfernen; Modelle kennzeichnen, die auf dem Snapshot trainiert wurden | Snapshot-Diff |
| RAG-Index und Caches | Chunks löschen oder neu indizieren; sofort | Index-Manifest |
| Prompt- und Output-Protokolle | Löschen oder Pseudonymisieren nach Betroffenen-Schlüssel | Aufbewahrungsentscheidung |
| Eval-Sets | Mit synthetischen Datensätzen ersetzen | Eval-Set-Card |
| Modellgewichte (falls nicht anonym) | Outputs jetzt unterdrücken; nach Plan umtrainieren oder verlernen | Filterregel; Umtrainungsplan |

### Unterdrückung, Umtraining und Verlernen

Für Daten in den Gewichten gibt es eine Leiter, von schnell und teilweise zu langsam und
vollständig:

1. **Output-Unterdrückung.** Ein Filter um das Modell hindert es daran, die Daten der Person zu
   produzieren. Die CNIL akzeptiert Filter, wenn Umtraining unverhältnismäßig ist, wenn Wirksamkeit
   und Robustheit nachgewiesen sind, und bevorzugt allgemeine Regeln gegenüber einer Namensliste
   (selbst eine Liste von Personen, die Widerspruch eingelegt haben) [31]. Die Daten bleiben im
   Modell; testen Sie den Filter wie jede Kontrolle.
2. **Umtraining ohne die Daten.** Wenn die Trainingsdaten noch vorhanden sind, beantwortet
   Umtraining die Anfrage, und periodisches Umtraining fasst viele zusammen [31]. Vollständig für
   die neue Version, kostspielig für große Modelle.
3. **Machine Unlearning.** Exakte Ansätze wie SISA-Shard-Training, bei dem nur der betroffene Shard
   umtrainiert wird [32]; ungefähre Ansätze passen Gewichte an und sind schwer zu überprüfen.
   Behandeln Sie jeden Unlearning-Anspruch als einen zu bestandenden Test (Membership Inference oder
   Extraction auf den entfernten Datensätzen).

Dokumentieren Sie die Wahl und ihren Grund pro Anfrage: Der Regulator wird fragen, warum
Unterdrückung und nicht Umtraining, und wann das nächste Umtraining die Lücke schließt.

### Aufzeichnung, wie eine Anfrage erfüllt wurde

Die Evidenz ist ein **[Erfüllungsdatensatz](/patterns/rights-requests-against-models)**, geschrieben
vom Workflow: jeder Ort, die Aktion in jedem, die betroffenen Modellversionen und wann die Lücke
schließt.

> **Beispiel (illustrativ)**
> Eine Löschanfrage gegen `csa-01`}, innerhalb der Frist geschlossen:
>
> ```json
> { "request_id": "dsr-2026-0412", "right": "erasure", "subject_key": "hash:7c1e…",
>   "locations": { "crm": "deleted", "rag_index": "deleted", "fine_tune_set": "deleted",
>                  "logs": "deleted", "weights": "output-suppression:rule-dsr-0412" },
>   "retrain_scheduled": "csa-01@2026-10-15", "closed": "2026-09-30", "within_deadline": true }
> ```

**Zuordnung:** DSGVO `Art. 12(3)`, `Arts. 15–17`, `Art. 21` · ISO/IEC 27701 · NIST AI RMF (Manage) ·
Schichten 04 und 05. Zuordnungen sind illustrativ, keine Konformitätserklärung.

## Enthält ein Modell personenbezogene Daten?

### Der EDPB-Anonymitätstest

Wenn ein Modell personenbezogene Daten sind, erreichen Rechte, Übertragung und Verletzungsregeln die
Gewichte. Behörden unterscheiden sich. Das Diskussionspapier der Hamburger Behörde von 2024
argumentierte, dass das Speichern eines großen Sprachmodells keine Verarbeitung ist, dass Rechte an
den Ein- und Ausgaben des Systems hängen, und dass rechtswidrige Schulung die spätere Nutzung nicht
beeinträchtigt [33]. Der EDPB war strenger: Modelle, die auf personenbezogenen Daten trainiert
wurden, können in allen Fällen nicht als anonym angesehen werden, und ein Modell ist anonym nur,
wenn sowohl die Wahrscheinlichkeit, Daten von Trainingssubjekten direkt zu extrahieren, als auch die
Wahrscheinlichkeit, diese durch Abfragen zu erhalten, angesichts aller vernünftigerweise
wahrscheinlich verwendeten Mittel unbedeutend sind [3]. Die CNIL hat seitdem Leitlinien zur
Dokumentation veröffentlicht, ob ein Modell unter die DSGVO fällt, und empfiehlt robuste Filter um
Modelle, die möglicherweise Daten auswendig gelernt haben [34].

Für den Ingenieur ist die Stellungnahme ein Testplan. Behörden werden Quellenauswahl, Vorbereitung
und Minimierung, Trainingswahlmöglichkeiten (Regularisierung, Differenzielle Privatsphäre),
Ausgabemaßnahmen, Audits und strukturierte Tests gegen Attribut- und Membership-Inference,
Exfiltration, Regurgitation, Modellinversion und Rekonstruktionsangriffe untersuchen; sie erwarten
Dokumentation einschließlich DPIAs (oder der Entscheidung, keine durchzuführen), das
Bedrohungsmodell, pro-Quellen-Maßnahmen mit Quell-URLs und Evidenz der Widerstandsfähigkeit gegen
Re-Identifizierung [3]. Das ist ein **Anonymitäts-Evidenzpaket**, und die meisten davon sind
Layer-03-Ausgaben: eine Angriffssuite läuft als Eval-Gate auf jeder Modellversion, und ihr Ergebnis
ist der Anspruch.

> **Beispiel (illustrativ)**
> Eine Zeile eines Anonymitäts-Evidenzpakets, eingereicht gegen eine Modellversion:
>
> ```json
> { "suite_id": "privacy.membership-inference.v2", "model_version": "csa-01@2026-09-18",
>   "attack_auc": 0.52, "threshold": 0.55, "canary_extraction": "0/500", "result": "pass" }
> ```

Das Bestehen bekannter Angriffe evidenziert Widerstandsfähigkeit gegen diese Angriffe nur, wie der
EDPB bemerkt [3]; das Paket wird erneut ausgeführt, wenn sich das Modell, seine Daten oder der Stand
der Technik ändern.

### Wenn das Modell rechtswidrig trainiert wurde

Die Stellungnahme setzt drei Szenarien [3]. Wenn personenbezogene Daten im Modell bleiben und
**derselbe Verantwortliche** es einsetzt, wird die Auswirkung der rechtswidrigen Entwicklung von
Fall zu Fall bewertet. Wenn **ein anderer Verantwortlicher** es einsetzt, sollte dieser
Verantwortliche bewertet haben, dass das Modell nicht rechtswidrig entwickelt wurde, unter
Berücksichtigung der Datenquelle und aller von einer Behörde oder einem Gericht festgestellten
Verstöße, skaliert auf sein eigenes Risiko. Wenn das Modell **anonymisiert** wurde, bevor es
eingesetzt wurde, und der Einsatz keine personenbezogenen Daten verarbeitet, gilt die DSGVO nicht
für diese Operation; neue personenbezogene Daten, die bei der Bereitstellung verarbeitet werden,
werden eigenständig bewertet.

Das zweite Szenario erreicht die meisten Organisationen, da die meisten Modelle einsetzen, die sie
nicht trainiert haben. Im
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) wird es zu
gespeicherten Antworten: die Zusammenfassung der Trainingsdaten des Anbieters, seine angegebene
Grundlage, alle öffentlichen Durchsetzungsfeststellungen, sein Anonymitätsanspruch und Evidenz, und
das Datum der Überprüfung.

**Zuordnung:** DSGVO `Art. 4(1)`, `Art. 5(2)`, `Art. 24`, `Art. 25` · KI-Verordnung der EU `Art. 53`
· NIST AI RMF (Measure) · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) ·
Schichten 02, 03 und 05. Zuordnungen sind illustrativ, keine Konformitätserklärung.

## Besondere Kategorien, abgeleitete Daten und Biometrie

Artikel 9(1) DSGVO verbietet die Verarbeitung von Daten, die rassische oder ethnische Herkunft,
politische Meinungen, religiöse oder philosophische Überzeugungen oder Gewerkschaftszugehörigkeit
offenbaren, sowie die Verarbeitung genetischer Daten, biometrischer Daten zur eindeutigen
Identifizierung, Gesundheitsdaten und Daten zum Sexualleben oder zur sexuellen Orientierung, es sei
denn, eine Bedingung von Artikel 9(2) gilt, wie ausdrückliche Zustimmung [1]. Der neue Artikel 4a
der KI-Verordnung ermöglicht es Anbietern von Hochrisiko-Systemen, solche Daten zu verarbeiten, wenn
dies streng erforderlich ist für die Erkennung und Korrektur von Verzerrungen, nur wenn andere Daten
(einschließlich synthetischer oder anonymisierter Daten) nicht ausreichen würden, mit
Pseudonymisierung, Zugangskontrollen, keiner Weitergabe und Löschung, sobald die Verzerrung
korrigiert ist (Kapitel 16 über
[besondere Kategoriedaten für Verzerrungserkennung (Art. 4a)](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test));
Betreiber und Anbieter anderer Systeme dürfen dies ausnahmsweise tun, und es wird keine Pflicht zur
Durchführung von Verzerrungsarbeit geschaffen [2]. Die alte Grundlage von Artikel 10(5) wurde
gelöscht [35].

### Abgeleitete und Proxy-sensitive Daten

KI erzeugt sensitive Daten, ohne sie zu sammeln: Gesundheit aus Käufen abgeleitet, Religion aus
Essenswahlmöglichkeiten, Orientierung aus sozialen Graphen, oder eine Postleitzahl, die für
Ethnizität steht. Die KI-Leitlinien der ICO behandeln Ableitungen und besondere Kategoriedaten als
Rechtmäßigkeitsfrage [36]. Washingtons My Health My Data Act zählt als Verbrauchergesundheitsdaten
Informationen, die aus Nicht-Gesundheitsdaten abgeleitet oder extrapoliert werden, einschließlich
durch Algorithmen oder maschinelles Lernen [37]. Kalifornien verlangt eine Risikobewertung vor
automatisierter Ableitung von Gesundheit, wirtschaftlicher Situation oder Verhalten in bestimmten
Kontexten [24].

Zwei Kontrollen machen dies überprüfbar. Ein **Proxy-Test** in Layer 03 misst, wie gut jedes Merkmal
und die Ausgabe ein geschütztes Attribut auf einem beschrifteten Satz vorhersagen, wobei der Build
über einem Schwellenwert fehlschlägt. Eine **Ableitungsrichtlinie** in Layer 01 listet Attribute
auf, die ein System nicht ableiten darf, durchgesetzt durch einen Ausgabeklassifizierer in Layer 04.
Beide hinterlassen Aufzeichnungen, dass die sensitive Ableitung überprüft wurde.

### Biometrie

Biometrische Daten resultieren aus technischer Verarbeitung physischer, physiologischer oder
verhaltensbezogener Merkmale, die eine eindeutige Identifizierung ermöglichen oder bestätigen, wie
Gesichtsbilder oder Fingerabdrücke [1]. Halten Sie drei Verwendungen auseinander:
**Identifizierung** (eins zu viele), **Verifizierung** (eins zu eins) und **Kategorisierung**
(Zuweisung einer Gruppe aus Merkmalen).

| Instrument | Regel zu Biometrie | Artefakt |
|---|---|---|
| GDPR `Art. 9` | Biometrische Daten zur eindeutigen Identifizierung sind eine besondere Kategorie [1] | Artikel 9(2)-Bedingungsdatensatz; DSFA |
| KI-Verordnung der EU `Art. 5(1)(e)`–`(h)` | Verbietet ungezielte Gesichtserfassung, Emotionserkennung bei der Arbeit und in der Schule (medizinische und Sicherheitsanwendungen ausgenommen), Kategorisierung, die sensitive Merkmale ableitet, und Echtzeit-Fernidentifizierung für Strafverfolgung außer engen Ausnahmen [38] | Richtlinie zu verbotener Nutzung als Code; Aufnahmescreening |
| KI-Verordnung der EU Annex III Punkt 1 | Fernidentifizierung (nicht Verifizierung), sensitive Kategorisierung und Emotionserkennung sind hochriskant, wenn rechtmäßig [39] | Hochrisiko-Klassifizierungsdatensatz |
| Omnibus-Vorschlag `Art. 9(2)(l)` | Würde Verifizierung unter alleiniger Kontrolle der Person ermöglichen [30] | Noch keine |
| Illinois BIPA | Aufbewahrungsplan, informierte schriftliche Zustimmung, kein Profitieren; private Klage mit USD 1.000 pro fahrlässiger und USD 5.000 pro vorsätzlicher oder rücksichtsloser Verletzung [40] | Zustimmungserfassung; Aufbewahrung als Code; Vernichtungsprotokoll |
| PIPL `Arts. 28–29` | Biometrie ist sensitiv: spezifischer Zweck, Notwendigkeit, separate Zustimmung [5] | Separate-Zustimmungs-Datensatz; PIPIA |

BIPA wird durch private Sammelklagen durchgesetzt, und eine 2024-Änderung wird berichtet, um
wiederholte Scans derselben Person auf eine Wiederherstellung zu begrenzen (überprüfen) [40]. Ein
durchgesickertes Passwort kann zurückgesetzt werden; ein durchgesickertes Gesicht nicht, daher
erhalten biometrische Vorlagen die strengsten Aufbewahrungs- und Zugriffsregeln, und ihr
Vernichtungsprotokoll ist eine Evidenz, die es wert ist, aufbewahrt zu werden.

### Verbrauchergefundheitsdaten und neuronale Daten

Washingtons My Health My Data Act, seit 31. März 2024 für die meisten Einrichtungen gültig,
erfordert Zustimmung zur Datenerfassung, separate Zustimmung zur Weitergabe und eine unterzeichnete
Genehmigung zum Verkauf, durchgesetzt durch das Verbraucherschutzgesetz des Staates [37].
**Neuraldaten** (Informationen, die durch Messung der Aktivität des Nervensystems erzeugt werden)
sind sensible personenbezogene Daten gemäß CCPA durch SB 1223, genehmigt am 28. September 2024 [41],
und sensible Daten gemäß Colorado Privacy Act durch HB24-1058, gültig seit 7. August 2024 [42]. Ein
KI-System, das Wearables oder Brain-Computer-Schnittstellen liest, muss diese Datenklassen bei der
Aufnahme kennzeichnen, da sie Zustimmungs- und Bewertungspflichten aktivieren, die gewöhnliche
Telemetrie nicht hat.

**Zuordnung:** DSGVO `Art. 4(14)`, `Art. 9`, `Art. 35(3)(b)` · KI-Verordnung `Art. 4a`,
`Art. 5(1)(e)`–`(h)`, Anlage III Punkt 1 · BIPA · Washington MHMDA · CCPA · PIPL `Arts. 28–29` ·
NIST AI RMF (Map, Measure) · Schichten 01, 03 und 04. Zuordnungen sind illustrativ, keine
Konformitätserklärung.

## KI-spezifische Datenschutzverletzungen

Eine **Verletzung des Schutzes personenbezogener Daten** ist eine Verletzung der Sicherheit, die zur
zufälligen oder rechtswidrigen Vernichtung, zum Verlust, zur Veränderung, zur unbefugten Offenlegung
oder zum unbefugten Zugriff auf personenbezogene Daten führt [1]. Der Verantwortliche benachrichtigt
die Behörde ohne unangemessene Verzögerung und, soweit möglich, innerhalb von 72 Stunden nach
Kenntnisnahme, es sei denn, die Verletzung wird voraussichtlich kein Risiko mit sich bringen;
informiert die betroffenen Personen, wenn das Risiko hoch ist; und dokumentiert jede Verletzung [1].
KI schafft Wege, Daten offenzulegen, die nicht wie eine gestohlene Datenbank aussehen.

| Verletzungstyp | Mechanismus | Erkennung | Artefakt |
|---|---|---|---|
| Regurgitation und Extraktion | Das Modell reproduziert memorierte Trainingstexte, einschließlich Namen, Telefonnummern und E-Mails [43] | Output-PII-Treffer; Canaries; Benutzerberichte | Output-Guardrail-Protokoll; Extraktions-Eval |
| Membership-Inferenz | Ein Angreifer erfährt, ob ein Datensatz im Trainingssatz enthalten war [44] | Durch Tests gefunden, selten zur Laufzeit | Membership-Inferenz-Eval |
| Modellinversion | Merkmale von Trainingssubjekten, die aus Ausgaben und Konfidenzwerten rekonstruiert werden [45] | Hochvolumige Abfragemuster | Ratenbegrenzungen; Red-Team-Ergebnis |
| Prompt-Injection-Exfiltration | In abgerufenem Inhalt verborgene Anweisungen veranlassen den Assistenten, Daten zu lecken, die er lesen kann [46][47] | Blockierte ausgehende Links; Tool-Call-Anomalien | Guardrail-Entscheidungen; Tool-Call-Traces |
| Zu breite Abfrage | Ein RAG-Index gibt die Datensätze eines anderen Kunden zurück | Cross-Tenant-Abruf-Warnungen | Indexzugriffstests; Abruf-Traces |
| Protokollexposition | Prompts mit personenbezogenen Daten, die in Observability-Tools lesbar sind | Zugriffsprüfungen; DLP auf Log-Speichern | Aufbewahrungsentscheidungen; Zugriffsprotokolle |

Ob ein bestimmtes Ereignis meldepflichtig ist, ist die Beurteilung des Datenschutzteams anhand der
Fakten, wobei die bearbeiteten Beispiele des EDPB als Leitfaden dienen [48]. Die Aufgabe des
Engineering ist es, die Fakten innerhalb der Frist zu liefern: die Spur dessen, was das System
verlassen hat, der Registereintrag, der angibt, welche Daten das System hält, die Eval-Historie, die
angibt, ob die Schwachstelle bekannt war. Für Agenten, die E-Mails lesen, im Internet surfen und
Tools aufrufen, legt die Anleitung der AEPD zu agentengestützter KI vom 18. Februar 2026 die
zusätzlichen Bedrohungen und die Maßnahmen dar, die Verantwortliche ergreifen können [49]. Ein
Vorfall kann mehrere Uhren starten: Die 72-Stunden-Frist der DSGVO läuft neben den Fristen von
Artikel 73 der KI-Verordnung (Kapitel 08) und jedem Branchenregime; Kapitel 17 stellt
[GDPR-Benachrichtigung neben die KI-Verordnungs-Uhren](/bok/incidents#the-overlapping-clocks). Geben
Sie der [Incident Pipeline](/patterns/incident-pipeline) einen Personal-Data-Breach-Zweig mit
eigenem Timer ab dem Awareness-Zeitstempel, und behalten Sie die 96-Stunden und den
High-Risk-Schwellenwert des Omnibus-Vorschlags als Parameter, nicht als heutige Regel [30].

**Zuordnung:** DSGVO `Art. 4(12)`, `Arts. 32–34` · KI-Verordnung `Art. 15`, `Art. 73` · OWASP
LLM02:2025 · OWASP Agentic ASI01 [50] · NIST AI RMF (Manage) · Schichten 03, 04 und 05. Zuordnungen
sind illustrativ, keine Konformitätserklärung.

## Die DSGVO-Seite des Digital-Omnibus

Nur einer der beiden Omnibus-Texte ist Recht: die **Digital-Omnibus-Verordnung zur KI**, Verordnung
(EU) 2026/1744, gültig seit 27. Juli 2026, die Artikel 4a schuf [2]. Der
**Digital-Omnibus**-Vorschlag vom 19. November 2025, COM(2025) 837, würde die DSGVO und benachbarte
Regeln ändern [30]. Ab 2026-09-24 bleibt er ein Vorschlag: Die Ausschüsse ITRE und LIBE des
Parlaments hatten einen Entwurfsbericht vom 22. Juni 2026 und mehr als 1.750 Änderungsanträge, die
geplante Mandatsabstimmung des Rates vom 26. Juni 2026 wurde abgesagt, und bis August 2026 hatten
Trilogverhandlungen nicht begonnen [51]. Kommentare zu Ratsarbeitstexten berichteten, dass ein
Junikompromiss den vorgeschlagenen Artikel 88c durch eine Präambel ersetzte und die Definition
personenbezogener Daten durch eine neue Pseudonymisierungsbestimmung überarbeitete [52].

| Vorgeschlagene DSGVO-Änderung [30] | Geltendes Recht | Jetzt bauen |
|---|---|---|
| `Art. 4(1)`: nicht personenbezogene Daten für eine Einrichtung, die die Person nicht mit Mitteln identifizieren kann, die vernünftigerweise verwendet werden dürften | Präambel 26; das SRB-Urteil [7] | Schlüsselverwahrungsunterlagen |
| `Art. 9(2)(k)`, `9(5)`: verbleibende Daten besonderer Kategorien in der KI-Entwicklung und im Betrieb; vermeiden, entfernen oder vor Ausgaben schützen | Keine KI-spezifische Bedingung | Scans besonderer Kategorien; Output-Filter |
| `Art. 88c`: berechtigte Interessen für KI, mit Minimierung, Schutz verbleibender Daten, erhöhter Transparenz und bedingungslosem Widerspruchsrecht | Artikel 6 Absatz 1 Buchstabe f und der Drei-Stufen-Test [3] | LIA mit Opt-Out-Endpunkt |
| `Art. 22`: Zulassungsliste; vertragliche Notwendigkeit auch wenn ein Mensch entscheiden könnte | Aktueller Artikel 22 [1] | Entscheidungsunterlagen; Einspruchswege |
| `Art. 33`: nur Hochrisiko-Verletzungen, 96 Stunden, einzelner Einstiegspunkt | 72 Stunden, jedes Risiko | Eine parametrisierte Verletzungsuhr |
| `Art. 35`: EU-weite DPIA-Listen, Vorlage und Methodik | Nationale Listen | Eine DPIA, die einem gemeinsamen Schema zugeordnet werden kann |

Die Lektüre ist kurz: bauen Sie nicht zu einem Vorschlag. Bauen Sie die Kontrollen, die beide
Versionen wollen, und machen Sie die Parameter, die sich ändern können (Verletzungsuhr,
Benachrichtigungsschwelle, DPIA-Auslöser), zur Konfiguration, nicht zum Code.

## Jenseits der EU: Vereinigtes Königreich, USA, Brasilien und China

### Vereinigtes Königreich

Der Data (Use and Access) Act 2025, Abschnitt 80, ersetzte UK GDPR Artikel 22 durch die Artikel 22A
bis 22D: eine bedeutende Entscheidung ohne sinnvolle menschliche Beteiligung ist mit Schutzmaßnahmen
zulässig (Information, Stellungnahmen, menschliche Intervention, Einspruch); Daten besonderer
Kategorien sind auf ausdrückliche Zustimmung oder Vertrag oder rechtliche Genehmigung mit der
Bedingung des wesentlichen öffentlichen Interesses beschränkt; und die neue
anerkannte-berechtigte-Interessen-Grundlage kann eine solche Entscheidung nicht unterstützen [23].
Die Regeln traten am 5. Februar 2026 in Kraft [23]. Die ICO konsultierte zu Entwürfen der
ADM-Anleitung vom 31. März bis 29. Mai 2026 [53], und kennzeichnet ihre KI-Anleitung als
überprüfung, wegen des Gesetzes [36]. Kapitel 08 platziert das Vereinigte Königreich in der
[Regulierungskarte](/bok/regulatory-map#united-kingdom).

### Vereinigte Staaten

Es gibt kein umfassendes Bundesdatenschutzgesetz. Kaliforniens Vorschriften zu ADMT,
Risikobewertungen und Cybersicherheitsprüfungen traten am 1. Januar 2026 in Kraft [24]. Kapitel 21
führt ein Einstellungstool durch
[Colorado SB 26-189 und die CPPA-ADMT-Regeln](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes)
nebeneinander. ADMT bedeutet Technologie, die Berechnung nutzt, um menschliche Entscheidungsfindung
zu ersetzen oder wesentlich zu ersetzen; eine bedeutende Entscheidung betrifft Kreditvergabe,
Wohnen, Bildung, Beschäftigung oder Gesundheitswesen. Risikobewertungen sind fällig vor, unter
anderem, der Verwendung von ADMT für bedeutende Entscheidungen, bestimmte automatisierte
Schlussfolgerungen und dem Training von ADMT oder Gesichtserkennungstechnologie; für Verarbeitung,
die den Regeln vorausgeht, sind sie bis 31. Dezember 2027 fällig, mit Einreichungen bei der Behörde
bis 1. April 2028 [24]. Virginias Gesetz zeigt die Form der anderen in der Tabelle: Opt-Outs von
gezielter Werbung, Verkauf und bedeutender Profilierung, und Bewertungen, die der
Generalstaatsanwalt fordern kann [25][54]. Die Anzahl der Staaten mit solchen Gesetzen wächst weiter
(überprüfen Sie die aktuelle Anzahl).

| Gesetz | Profilierungs- oder ADMT-Recht | Bewertungspflicht | Hinweis zu sensiblen Daten |
|---|---|---|---|
| California CCPA und ADMT-Vorschriften | Vorabmitteilung; Opt-Out oder Einspruch; Zugriff [24] | Risikobewertungen, eingereicht bei der Behörde [24] | Neuraldaten sind sensibel [41] |
| Virginia CDPA | Opt-Out von Profilierung [25] | Bewertungen, verfügbar für den Generalstaatsanwalt [54] | Sensible Daten lösen eine Bewertung aus [54] |
| Colorado Privacy Act (2023-07-01) | Opt-Out inkl. Profilierung [26] | Bewertungen für erhöhtes Risiko [26] | Neuro- und biologische Daten sind sensibel [42] |
| Minnesota CDPA (2025-07-31) | Frage, Grund, Überprüfung, Neubewertung [27] | In dieser Ausgabe nicht zugeordnet | In dieser Ausgabe nicht zugeordnet |

Die praktische Einheit ist das Recht, nicht der Staat: ein Opt-Out-Signal, das bei der Inferenz
beachtet wird, ein Grund-und-Überprüfungs-Workflow, eine Bewertungsvorlage mit Feldern für die
Auslöser jedes Staates.

### Brasilien und China

Brasiliens **LGPD** umfasst berechtigte Interessen unter seinen Rechtsgrundlagen, setzt strengere
Bedingungen für sensible Daten, behandelt anonymisierte Daten als außerhalb des Gesetzes, es sei
denn, die Anonymisierung kann mit angemessenem Aufwand rückgängig gemacht werden, gibt ein Recht,
eine Überprüfung ausschließlich automatisierter Entscheidungen mit Informationen über die Kriterien
anzufordern (vorbehaltlich von Geschäftsgeheimnissen), und ermöglicht es der Behörde, einen
Auswirkungsbericht zu verlangen [28].

Chinas **PIPL** listet seine Rechtsgrundlagen in Artikel 13 auf, ohne eine allgemeine
berechtigte-Interessen-Grundlage, daher beruht das Training auf persönlichen Informationen
normalerweise auf Zustimmung oder einer anderen aufgelisteten Grundlage. Automatisierte
Entscheidungen müssen transparent und fair sein, mit einem Recht auf Erklärung und zur Ablehnung
ausschließlich automatisierter Entscheidungen von erheblicher Auswirkung; sensible Informationen,
einschließlich Biometrie, benötigen Notwendigkeit und separate Zustimmung; die grenzüberschreitende
Bereitstellung benötigt eine CAC-Sicherheitsbewertung, Zertifizierung oder den Standardvertrag; und
eine Auswirkungsbewertung ist im Voraus erforderlich für sensible Daten, automatisierte
Entscheidungen, anvertraute Verarbeitung und grenzüberschreitende Bereitstellung, mindestens drei
Jahre lang aufbewahrt [5]. Kapitel 08 ordnet Chinas KI-spezifische Regeln zu
([China](/bok/regulatory-map#china)).

## Verpflichtung zur Artefakt-Zuordnung

Schichten:
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Pflicht | Artefakt | Schicht | Pflichtträger | Nachweisdatensatz |
|---|---|---|---|---|
| DSGVO `Art. 5(1)(b)`, `6(4)` Zweckbindung | Zweck-Tags; Zweck-Match-Richtlinie | 1 · 2 | Verantwortlicher | Urteil pro Durchlauf |
| DSGVO `Art. 6` Rechtsgrundlage | Basis-Registrierung; versionierte LIA | 2 | Verantwortlicher | Registereintrag mit LIA-Referenz |
| DSGVO `Art. 7` Zustimmung | Zustimmungs-Zweck-Protokoll | 2 · 5 | Verantwortlicher | Widerrufe zu Durchläufen nachverfolgbar |
| DSGVO `Arts. 13–14` Transparenz | Mitteilung aus der Registrierung generiert | 2 | Verantwortlicher | Mitteilungsversion pro Modellversion |
| GDPR `Art. 5(1)(c)`, `Art. 25` | Merkmal-Begründung; PII-Filter; Aufbewahrung als Code | 1 · 3 | Verantwortlicher | Filter-Protokolle; Aufbewahrungsentscheidungen |
| DSGVO `Art. 28` Auftragsverarbeiter | KI-Anbieter-Klausel-Checkliste | 2 · 5 | Verantwortlicher | Gate-Datensatz pro Änderung |
| GDPR `Art. 30` ROPA | Datensätze pro Verarbeitungsmoment generiert | 2 · 5 | Verantwortlicher; Auftragsverarbeiter | Generierter Datensatz |
| GDPR `Arts. 35–36` DPIA | KI-DPIA-Vorlage; "keine DPIA"-Entscheidung | 1 · 2 | Verantwortlicher | Versionierte DPIA |
| DSGVO `Arts. 44–46` Transfers | Transfer-Register; Routing-Policy; TIA | 1 · 4 · 5 | Verantwortlicher; Auftragsverarbeiter | Routing-Verdikt |
| GDPR `Art. 22`, `15(1)(h)` ADM | Entscheidungsverzeichnis; Mitteilung; Widerspruchspfad | 4 · 5 | Verantwortlicher; Score-Produzent | Entscheidungs- und Überprüfungsaufzeichnungen |
| DSGVO `Arts. 15–17`, `21` Rechte | Request-Workflow über alle Standorte | 4 · 5 | Verantwortlicher | Erfüllungsaufzeichnung |
| DSGVO `Art. 5(2)` Modell-Anonymität | Anonymitäts-Evidence-Pack; Privacy-Attack-Evals | 3 · 5 | Verantwortlicher (Entwickler) | Eval-Ergebnis pro Version |
| DSGVO `Art. 9` sensible und abgeleitete Daten | Proxy-Test; Inference-Policy; Condition-Record | 1 · 3 · 4 | Verantwortlicher | Proxy-Eval; Classifier-Entscheidungen |
| DSGVO `Arts. 33–34` Verletzungen | Breach-Branch der Incident Pipeline | 4 · 5 | Verantwortlicher; Auftragsverarbeiter | Awareness-Zeitstempel; Mitteilung |
| KI-Verordnung `Art. 4a` | Pseudonymisiertes Bias-Set; Deletion-Job; ROPA-Grund | 1 · 2 | Anbieter; Betreiber (ausnahmsweise) | Deletion-Log; ROPA-Eintrag |
| KI-Verordnung `Art. 26(9)`, `27(4)` | FRIA-as-Code mit gemeinsamen DSFA-Feldern | 2 | Betreiber | Verknüpfte Bewertungen |
| KI-Verordnung `Art. 86` | Erklärung bezogen auf den Entscheidungsdatensatz | 4 · 5 | Betreiber | Erklärung pro Request |
| UK GDPR `Arts. 22A–22D` | Safeguard-Workflow; Beteiligungsbegründung | 4 · 5 | Verantwortlicher | Überprüfungs-Datensätze |
| CCPA-ADMT-Vorschriften | Vorab-Mitteilung; Opt-out oder Einspruch; Risikobewertung | 2 · 4 · 5 | Geschäftsbetrieb | Mitteilung; Opt-outs; Bewertung |
| US-Bundesstaat-Profiling-Opt-outs | Opt-out-Flag bei Inference; Bewertungsvorlage | 1 · 4 · 5 | Verantwortlicher | Opt-out-Verdikt |
| BIPA; MHMDA; Neural-Data-Gesetze | Consent-Erfassung; Aufbewahrungsplan; Intake-Flags | 1 · 2 | Geschäftsbetrieb | Consent- und Destruction-Logs |
| LGPD `Art. 20`; PIPL `Arts. 24`, `55–56` | Review- und Explanation-Workflows; PIPIA | 4 · 5 | Verantwortlicher; Auftragsverarbeiter | Review-Records; PIPIA |

> **In der Praxis (illustrativ)**
> Ein Privacy-Engineering-Lead in einem großen Telekommunikationsunternehmen hat die `csa-01` DSFA
> so umgebaut, dass der größte Teil davon generiert wurde: Processing-Momente aus dem Register,
> Grundlagen aus dem Basis-Register, die Transfer-Map aus der Routing-Policy, Memorisierungsrisiko
> aus der neuesten Privacy-Eval, der Rights-Path aus dem Request-Workflow. Der
> Datenschutzbeauftragte schrieb und unterzeichnete immer noch die Risikobewertung. Als der Anbieter
> die Region wechselte, änderten sich drei Felder und die DSFA zeigte einen Diff, anstatt in einem
> gemeinsamen Laufwerk veraltet zu werden.

**Zuordnung:** DSGVO `Arts. 5–7`, `9`, `13–17`, `21`, `22`, `25`, `26`, `28`, `30`, `32–36`, `44–46`
· UK GDPR `Arts. 22A–22D` · CCPA und seine ADMT-Verordnungen · Virginia-, Colorado- und
Minnesota-Datenschutzgesetze · BIPA · Washington MHMDA · LGPD · PIPL · KI-Verordnung `Arts. 4a`,
`5`, `26`, `27`, `86` · ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Govern, Map, Measure, Manage) ·
alle fünf Schichten. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Listen Sie die Processing-Momente** Ihres höchsten Risiko-KI-Systems auf und schreiben Sie die
   Rechtsgrundlage und Aufbewahrung neben jede. Jede leere Zelle ist ein Befund.
2. **Fügen Sie ein Privacy-Eval zum Gate hinzu**: ein PII-Leakage- oder Membership-Inference-Test
   mit einem Schwellenwert, der den Build fehlschlagen lässt. Sein Ergebnis ist Seite eins eines
   Anonymitäts-Evidence-Packs.
3. **Führen Sie einen Mock-Erasure-Request** durch Corpus, Snapshots, RAG-Index, Logs und Weights
   durch, schreiben Sie die Erfüllungsaufzeichnung und messen Sie sie gegen die Eins-Monats-Frist.
4. **Senden Sie Ihren KI-Anbietern die Klausel-Checkliste** (kein Training, Prompt-Aufbewahrung,
   Region, Sub-Prozessoren, Change-Mitteilung) und speichern Sie die Antworten in ihren
   Register-Einträgen.
5. **Verfolgen Sie einen Inference-Call** zu dem Land, das ihn bedient, und überprüfen Sie, ob das
   Transfer-Register einen Grund benennt. Wenn nicht, hat die Residency-Policy ihre erste Regel.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 4(1), 4(4), 4(5), 4(12), 4(14), 5, 6, 6(4), 7, 9, 12(3), 13–17, 21, 22, 25, 26, 28, 30, 33–36, 44–46, 83(5), 99; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special-category data for bias detection and correction, incl. the records-of-processing reason; amended Art. 2(7) keeping the GDPR unaffected; Annex III high-risk requirements from 2 Dec 2027); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (no hierarchy of legal bases; three-step legitimate-interest test; mitigating measures, paras 99–107; anonymity test at para 43, elements and documentation for the evidence at paras 49–58; three scenarios on unlawful development). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[4] "Relying on the legal basis of legitimate interests to develop an AI system" (AI how-to sheet; legitimate interest as the most likely basis; balancing test; discretionary prior right to object; transparency on regurgitation risk). CNIL. 2025-06 (page dated 2026-01-05). https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system (verified: primary)
[5] Personal Information Protection Law of the People's Republic of China (Arts. 13 legal bases, 24 automated decision-making, 28–29 sensitive personal information and separate consent, 38 cross-border provision, 55–56 impact assessment kept three years), official English translation. National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[6] Guidelines 01/2025 on pseudonymisation (version for public consultation, 17 Jan to 14 Mar 2025). European Data Protection Board. 2025-01. https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en (verified: primary)
[7] Press release No 107/25: judgment in Case C-413/23 P, EDPS v SRB (pseudonymised data not personal data in all cases and for every person; identifiability for the controller's information duty assessed at collection, from the controller's point of view). Court of Justice of the EU. 2025-09-04. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf (verified: primary)
[8] Rocher, Hendrickx and de Montjoye, "Estimating the success of re-identifications in incomplete datasets using generative models" (99.98% of Americans correctly re-identified with 15 demographic attributes). Nature Communications 10, 3069. 2019-07-23. https://doi.org/10.1038/s41467-019-10933-3 (verified: primary)
[9] McMahan et al., "Communication-Efficient Learning of Deep Networks from Decentralized Data" (federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[10] Zhu, Liu and Han, "Deep Leakage from Gradients" (private training data recovered from shared gradients; arXiv 1906.08935). arXiv. 2019-06-21. https://arxiv.org/abs/1906.08935 (verified: primary)
[11] Stadler, Oprisanu and Troncoso, "Synthetic Data – Anonymisation Groundhog Day" (synthetic data either does not prevent inference attacks or does not retain utility; arXiv 2011.07018). arXiv. 2020-11-13. https://arxiv.org/abs/2011.07018 (verified: primary)
[12] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[13] Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" (WP248 rev.01; nine criteria; two criteria usually require a DPIA), endorsed by the EDPB. Article 29 Working Party. 2017-10-04. https://ec.europa.eu/newsroom/article29/items/611236 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(9) and (11) (deployers use Art. 13 information for their GDPR DPIA; informing people subject to Annex III high-risk decisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[16] Guidelines 05/2021 on the interplay between the application of Article 3 and the provisions on international transfers as per Chapter V of the GDPR, version 2.0 (three cumulative criteria for a transfer; remote access from a third country, Example 11). European Data Protection Board. 2023-02-14. https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf (verified: primary)
[17] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data, version 2.0. European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[18] Standard contractual clauses for international transfers (published 4 June 2021). European Commission. 2021-06-04. https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en (verified: primary)
[19] EU-US data transfers: adequacy decision for the EU-US Data Privacy Framework (adopted 10 July 2023). European Commission. 2023-07-10. https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en (verified: primary)
[20] Press release No 106/25: judgment in Case T-553/23, Latombe v Commission (action for annulment of the EU-US Data Privacy Framework adequacy decision dismissed). General Court of the EU. 2025-09-03. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf (verified: primary)
[21] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[22] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; effect of a variation in the data; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[23] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D: meaningful human involvement, restrictions for special-category data and for Art. 6(1)(ea), safeguards; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[24] California Privacy Protection Agency, CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved by OAL 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); significant decision § 7001(ddd); risk-assessment triggers § 7150; deadlines §§ 7155(b), 7157(a); ADMT compliance § 7200(b); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[25] Code of Virginia § 59.1-577, Personal data rights; consumers (opt out of targeted advertising, sale, or profiling in furtherance of decisions that produce legal or similarly significant effects). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-577/ (verified: primary)
[26] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[27] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review the data, correct and have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[28] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 7 legal bases incl. legitimate interests; Art. 11 sensitive data; Art. 12 anonymised data; Art. 20 review of automated decisions; Art. 38 impact report). Presidência da República (Brazil). 2018-08-14. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[29] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; deployer decisions based on Annex III high-risk outputs, except point 2; applies only where Union law does not otherwise provide the right). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[30] Proposal for a Regulation amending Regulations (EU) 2016/679, 2018/1724, 2018/1725, 2023/2854 and Directives 2002/58/EC, (EU) 2022/2555 and (EU) 2022/2557 as regards the simplification of the digital legislative framework (Digital Omnibus), COM(2025) 837 final, Council doc. 15698/25 (GDPR Arts. 4(1), 5(1)(b), 9(2)(k)–(l) and 9(5), 12(5), 13(4), 22, 33, 35, new 88c). European Commission / Council of the EU. 2025-11-19. https://data.consilium.europa.eu/doc/document/ST-15698-2025-INIT/en/pdf (verified: primary)
[31] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[32] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[33] Discussion Paper: Large Language Models and Personal Data (three theses: storing an LLM is not processing; rights attach to system inputs and outputs; unlawful training does not affect later use). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[34] "AI: the CNIL finalises its recommendations on the development of artificial intelligence systems and announces its upcoming work" (guidance on GDPR applicability to AI models; annotation; secure development). CNIL. 2025-07-22. https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems (verified: primary)
[35] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10 (as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[36] Guidance on AI and data protection (lawfulness incl. inferences and special category data; notice that it is under review because of the Data (Use and Access) Act; last updated 15 Mar 2023). Information Commissioner's Office. 2023-03-15. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ (verified: primary)
[37] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated from non-health information by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; enforcement under chapter 19.86 RCW; 31 Mar 2024, small businesses 30 Jun 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(e)–(h) (untargeted facial scraping; emotion inference at work and school; biometric categorisation of sensitive traits; real-time remote biometric identification for law enforcement). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 1 (biometrics: remote biometric identification excluding verification; sensitive-attribute categorisation; emotion recognition). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[40] "Biometric Information Privacy Act" (740 ILCS 14, 2008; informed written consent, retention schedule, no profiting; USD 1,000 / 5,000 statutory damages; 2024 amendment, SB 2979, on per-person recovery). Wikipedia. 2026. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: secondary)
[41] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data defined and added to sensitive personal information under the CCPA; approved by the Governor 28 Sep 2024; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[42] HB24-1058, Protect Privacy of Biological Data (biological and neural data as sensitive data under the Colorado Privacy Act; signed 17 Apr 2024; effective 7 Aug 2024). Colorado General Assembly. 2024-04-17. https://leg.colorado.gov/bills/hb24-1058 (verified: primary)
[43] Carlini et al., "Extracting Training Data from Large Language Models" (hundreds of verbatim training sequences extracted from GPT-2, incl. names, phone numbers and email addresses; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[44] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[45] Fredrikson, Jha and Ristenpart, "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[46] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (data theft via injected prompts in retrieved content; arXiv 2302.12173). arXiv. 2023-02-23. https://arxiv.org/abs/2302.12173 (verified: primary)
[47] LLM02:2025 Sensitive Information Disclosure (OWASP Top 10 for LLM Applications, 2025 edition). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ (verified: primary)
[48] Guidelines 9/2022 on personal data breach notification under GDPR, version 2.0. European Data Protection Board. 2023-03-28. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification-under_en (verified: primary)
[49] "La Agencia publica unas orientaciones sobre Inteligencia Artificial agéntica desde la perspectiva de protección de datos" (press release; guidance on agentic AI and data protection). Agencia Española de Protección de Datos. 2026-02-18. https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia (verified: primary)
[50] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[51] "The Digital Omnibus Regulation Proposal", Legislative Train Schedule (status: tabled; ITRE and LIBE joint; draft report 22 June 2026; 1,750+ amendments; Council mandate vote of 26 June cancelled; no trilogues; last update 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[52] "Digital Omnibus (GDPR) Negotiations at the Council – September 2026 Update" (June compromise replaced the AI provision, Art. 88c, with a recital; personal-data definition reworked via a new pseudonymisation article). Privacy Next. 2026-09-01. https://www.privacynext.eu/resources/digital-omnibus-gdpr-negotiations-at-the-council-september-2026-update/ (verified: reported)
[53] ICO consultation on the draft guidance about automated decision-making, including profiling (published 31 Mar 2026; closed 29 May 2026; follows the Data (Use and Access) Act 2025). Information Commissioner's Office. 2026-03-31. https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/ (verified: primary)
[54] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, risky profiling, sensitive data; available to the Attorney General on civil investigative demand). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
