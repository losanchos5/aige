---
lang: de
source: bok/11-ai-defined.md
sourceHash: "22aa065addac570dc901cead7669db00821af938af30615db31b2b35b900ba68"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 11. KI, definiert für Governance

> Was ein KI-System für Governance-Zwecke ist: die Definitionen, die den Umfang setzen, die Arten
> von KI und die Merkmale, die klassische Governance durchbrechen, jeweils in ein Registerfeld, ein
> Control und eine Evidenz umgewandelt.

Eine Governance-Funktion kann nicht regeln, was sie nicht definiert hat. Bevor ein Register
KI-Systeme auflisten kann, bevor ein Intake sie klassifizieren kann und bevor eine Policy sie binden
kann, muss jemand entscheiden, welche Systeme zählen. Diese Entscheidung ist keine Glossar-Übung.
Sie ist das erste Control im Stack: Sie entscheidet, was in das **Agentenregister** (layer 02)
eingeht, welche Verpflichtungen der Intake ein System zu leitet und welche Systeme außerhalb aller
anderen Controls in diesem Buch bleiben. Falsch in eine Richtung und ein Scoring-Modell entkommt der
Überprüfung, weil jemand es "nur Statistik" genannt hat. Falsch in die andere Richtung und das
Register füllt sich mit Spreadsheet-Makros, das Signal ertrinkt und die Besitzer hören auf, es zu
lesen.

Dieses Kapitel vergleicht die vier Definitionen, die den Umfang setzen, wandelt jedes ihrer Elemente
in ein Registerfeld um, trennt KI von deterministischer Software, sortiert die Arten von KI nach den
Controls, die sie ändern, und benennt die Merkmale, die klassische IT-Governance zum Scheitern
bringen. Es schließt mit zwei Dingen, die normalerweise als Prosa belassen werden: die Governance
probabilistischer Ausgaben und die Rückverfolgung der veröffentlichten
Responsible-AI-Prinzipiensätze zu Artefakten. Es ist keine Machine-Learning-Grundierung: eine
Technik ist hier nur relevant, wenn sie ein Control, einen Besitzer oder ein Stück Evidenz ändert.

## Warum die Definition ein Control ist

Zwei Entscheidungen stehen am Anfang jedes Intake, und sie sind unterschiedliche Entscheidungen. Die
erste ist **definitional**: ist dies überhaupt ein KI-System? Die zweite ist **klassifikatorisch**:
angenommen, es ist eines, welche Verpflichtungen und welche Controls gelten? Die meisten Gesetze und
die meisten Governance-Programme behandeln die erste als Gate zur zweiten. Unter der KI-Verordnung
der EU ist die Definition buchstäblich der Geltungsbereich der Verordnung: die Verordnung gilt nur
für Systeme, die die Definition in Artikel 3 Absatz 1 erfüllen, und diese Definition gilt seit 2.
Februar 2025 [1]. Die gleiche Kommissionsleitlinie ist sorgfältig darauf bedacht hinzuzufügen, dass
"die überwiegende Mehrheit der Systeme, auch wenn sie als KI-Systeme qualifizieren", keine
Verpflichtungen unter der Verordnung tragen wird [1]. Ein System kann also innerhalb der Definition
und außerhalb jeder Pflicht sein; ein Governance-Engineer braucht beide Antworten, separat
aufgezeichnet, mit der Begründung beigefügt.

Behandeln Sie die definitionale Antwort als ein Control wie jedes andere in diesem Buch. Es hat
einen Besitzer (der [Intake-Workflow](/bok/the-role#intake-and-classification)). Es läuft am
frühesten Punkt, an dem es blockieren kann: beim Intake, nicht bei der Überprüfung vor dem Start. Es
hinterlässt Evidenz: einen Entscheidungsdatensatz, der die angewendete Definition, die gefundenen
Elemente, wer oder was entschieden hat und wann benennt. Und es wird überprüft, wenn sich das System
ändert, denn eine Rules Engine, die eine gelernte Komponente gewinnt, überschreitet die Linie, ohne
dass jemand ein Ticket einreicht.

> **In der Praxis (illustrativ)**
> Bei einem großen Telekommunikationsunternehmen fragte der erste Intake-Pass Teams, sich selbst zu
> erklären "KI oder nicht". Selbsterklärung produzierte beide Fehlermodi gleichzeitig: ein
> Churn-Propensity-Modell registriert als "Analytics" und ein Keyword-Routing-Makro registriert als
> "KI". Das Ersetzen der Ja/Nein-Frage durch die unten stehenden Element-Fragen, jede mit einer
> einzeiligen Begründung im Register beantwortet, verlagerte die Entscheidung von Meinung zu
> Datensatz. Meinungsverschiedenheiten wurden zu Diffs im Entscheidungsdatensatz, überprüft wie jede
> andere Änderung.

## Vier Definitionen, verglichen

Vier Texte setzen den Umfang für die meisten Organisationen: die OECD-Definition, die KI-Verordnung
der EU mit der Kommissionsleitlinie dazu, ISO/IEC 22989 und NIST AI 100-1. Sie sind näher
beieinander als die Jurisdiktionen ihrer Autoren vermuten lassen, absichtlich, und die verbleibenden
Unterschiede sind genau die, die eine Umfangsentscheidung ändern.

### Die OECD-Definition (Überarbeitung 2023)

Kapitel 22 platziert
[die OECD-Definition und den Lebenszyklus](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle)
in den breiteren OECD-Instrumenten. Der OECD-Rat überarbeitete seine Definition am 8. November 2023,
vor der breiteren fünfjährigen Überprüfung der KI-Prinzipien, teilweise um die Ausrichtung mit
Definitionen zu unterstützen, die damals in der EU, Japan und anderswo geschrieben wurden [2][3].
Sie lautet nun: "Ein KI-System ist ein maschinengestütztes System, das für explizite oder implizite
Ziele aus der Eingabe, die es erhält, ableitet, wie es Ausgaben wie Vorhersagen, Inhalte,
Empfehlungen oder Entscheidungen generiert, die physische oder virtuelle Umgebungen beeinflussen
können. Verschiedene KI-Systeme unterscheiden sich in ihren Autonomie- und
Anpassungsfähigkeitsgraden nach der Bereitstellung." [3]

Gegenüber dem Text von 2019 machte die Überarbeitung vier Änderungen, die für den Umfang wichtig
sind: Sie strich "von Menschen definiert" aus den Zielen (Ziele können nun implizit sein), sie
machte **Inferenz** zum definierenden Akt, sie fügte **Inhalte** als Ausgabe hinzu (der generative
Fall) und sie fügte **Anpassungsfähigkeit** nach der Bereitstellung hinzu [3]. Sein
Erläuterungsmemorandum (das nicht Teil der Empfehlung ist) liest Autonomie als den Grad, in dem ein
System "ohne menschliches Zutun lernen oder handeln kann", sobald Menschen es delegiert haben, und
Anpassungsfähigkeit als die fortgesetzte Änderung von Machine-Learning-Systemen nach der
anfänglichen Entwicklung, wie ein Spracherkenner, der sich an eine Stimme anpasst [3].

### KI-Verordnung der EU Artikel 3 Absatz 1 und die Kommissionsleitlinien

Kapitel 18 legt
[die rechtliche Definition eines KI-Systems](/bok/eu-ai-act#what-counts-as-an-ai-system) im
Geltungsbereich des Gesetzes fest. Artikel 3(1) der KI-Verordnung folgt dem OECD-Text eng:
"'KI-System' ein maschinengestütztes System, das so konzipiert ist, dass es mit unterschiedlichen
Graden von Autonomie arbeitet und das nach der Inbetriebnahme Anpassungsfähigkeit aufweisen kann,
und das für explizite oder implizite Ziele aus den Eingaben, die es erhält, ableitet, wie es
Ausgaben wie Vorhersagen, Inhalte, Empfehlungen oder Entscheidungen erzeugt, die physische oder
virtuelle Umgebungen beeinflussen können" [4]. Erwägungsgrund 12 erläutert die Absicht: Die
Definition sollte KI von "einfacheren traditionellen Softwaresystemen oder Programmieransätzen"
unterscheiden und sollte Systeme nicht erfassen, die auf Regeln basieren, die ausschließlich von
natürlichen Personen definiert wurden, um Operationen automatisch auszuführen [5]. Die Techniken,
die Inferenz ermöglichen, umfassen maschinelles Lernen und "logik- und wissensbasierte Ansätze" [5].

Die Richtlinien der Kommission zur Definition unterteilen sie in sieben Elemente: (1) ein
maschinengestütztes System; (2) das für den Betrieb mit unterschiedlichen Autonomiestufen ausgelegt
ist; (3) das nach der Inbetriebnahme Anpassungsfähigkeit aufweisen kann; (4) für explizite oder
implizite Ziele; (5) aus den Eingaben, die es erhält, ableitet, wie Ausgaben zu generieren sind; (6)
wie Vorhersagen, Inhalte, Empfehlungen oder Entscheidungen; (7) die physische oder virtuelle
Umgebungen beeinflussen können [1]. Fünf ihrer Auslegungen ändern, wie ein Intake funktionieren
sollte:

- **Inferenz ist die unverzichtbare Bedingung**; die Richtlinien nennen sie "eine Schlüssel-,
  unverzichtbare Bedingung, die KI-Systeme von anderen Systemtypen unterscheidet" [1].
- **Autonomie ist notwendig, aber die Schwelle ist niedrig.** Nur Systeme, die so konzipiert sind,
  dass sie "ausschließlich mit vollständiger manueller menschlicher Beteiligung und Intervention"
  arbeiten, sind ausgeschlossen; ein System, das eine Ausgabe aus manuell bereitgestellter Eingabe
  erzeugt, ohne dass diese Ausgabe von einem Menschen spezifiziert wird, hat bereits "einen gewissen
  Grad an Unabhängigkeit des Handelns" [1].
- **Anpassungsfähigkeit ist optional.** Das Wort "kann" macht Selbstlernen nach der Inbetriebnahme
  zu "einer fakultativen und daher nicht zu einer entscheidenden Bedingung" [1]. Ein eingefrorenes
  Modell ist immer noch ein KI-System.
- **Ziele sind nicht die Zweckbestimmung.** Ziele sind intern zum System; die Zweckbestimmung (Art.
  3 Absatz 12) ist der externe Nutzungskontext [1], und der Kontext ist das, worauf eine Risikostufe
  aufgebaut wird.
- **Die Elemente müssen nicht in beiden Phasen alle vorhanden sein.** Die Definition verfolgt einen
  Lebenszyklus-Ansatz: Einige Elemente können in der Entwicklungsphase auftreten und nicht in der
  Nutzungsphase [1].

Die Richtlinien nennen auch vier Familien, die trotz gewisser Inferenzfähigkeit außerhalb der
Definition fallen: Systeme, die klassische mathematische Optimierung verbessern oder beschleunigen;
**grundlegende Datenverarbeitung** (Datenbankabfragen, Tabellenkalkulationen ohne KI-Funktionen,
beschreibende Dashboards); Systeme, die auf **klassischen Heuristiken** basieren (ein Schachmotor
mit Minimax und einer von Hand geschriebenen Bewertungsfunktion); und
**einfache Vorhersagesysteme**, deren Leistung eine grundlegende statistische Regel erreichen
könnte, wie eine Baseline, die immer den historischen Durchschnitt vorhersagt [1]. Sie machen
explizit deutlich, dass "keine automatische Bestimmung oder erschöpfenden Listen" möglich sind und
dass jedes System anhand seiner Architektur und Funktionalität bewertet wird [1]. Sie sind auch
nicht bindend; nur der Gerichtshof der Europäischen Union kann eine verbindliche Auslegung geben
[1].

### ISO/IEC 22989

ISO/IEC 22989:2022 ist der Terminologie-Standard, auf dem der Rest der ISO/IEC-KI-Familie aufbaut
[6]. Seine Definition eines KI-Systems (Begriff 3.1.4) ist kürzer und älter in der Form: ein
technisches System, dessen Ausgaben, von Inhalten bis zu Entscheidungen, Ziele dienen, die Menschen
setzen [6]. Inferenz und Anpassungsfähigkeit sind nicht Teil davon. Sein nützlichster Beitrag für
die Governance ist Vokabular, das die anderen Texte nicht haben. Es trennt **Automatisierung**, die
nach Grad variiert, von **Autonomie**, eine viel stärkere Eigenschaft, die es für Systeme behält,
die ihr eigenes Ziel oder ihre Nutzungsdomäne ohne Steuerung durch andere ändern können; das
Gegenteil von Autonomie ist **Heteronomie**, und Klausel 5.13 behandelt die drei zusammen [6]. Es
nennt auch die Stakeholder-Rollen um ein KI-System (Anbieter, Hersteller, Kunde, Partner,
Betroffener und zuständige Behörden, Klausel 5.19) [6]. Eine Änderung zu generativer KI (ISO/IEC
22989:2022/FDAmd 1) ist im Stadium des Entwurfs: Ihre FDIS wurde am 18. September 2026 zur formalen
Genehmigung registriert, und sie ist am 2026-09-24 nicht veröffentlicht [7].

Das Wort „Autonomie

### NIST AI 100-1

Das NIST AI Risk Management Framework (NIST AI 100-1, Januar 2023) „bezieht sich auf ein KI-System
als ein technisches oder maschinengestütztes System, das für einen gegebenen Satz von Zielen
Ausgaben wie Vorhersagen, Empfehlungen oder Entscheidungen generieren kann, die reale oder virtuelle
Umgebungen beeinflussen", das für den Betrieb mit unterschiedlichen Autonomiestufen ausgelegt ist,
und stellt fest, dass es den OECD-Text von 2019 und ISO/IEC 22989 anpasst [8]. Es geht dem
OECD-Überblick voraus, hat also kein „ableitet", keinen „Inhalt" und keine Anpassungsfähigkeit. Sein
Gewicht für die Governance liegt anderswo: Anhang B listet auf, wie sich KI-Risiken von
traditionellen Softwarerisiken unterscheiden, was das Rückgrat der Charakteristika-Tabelle später in
diesem Kapitel ist [8].

### Die Definitionen nebeneinander

| Element | OECD (2023) | EU-KI-Verordnung Art. 3 Absatz 1 | ISO/IEC 22989:2022 | NIST AI 100-1 (2023) |
|---|---|---|---|---|
| Substrat | Maschinengestützt | Maschinengestützt | Technisches System | Technisches oder maschinengestütztes System |
| Ziele | Explizit oder implizit | Explizit oder implizit | Von Menschen definiert | „Ein gegebener Satz von Zielen" |
| Inferenz | Definierender Akt | Definierender Akt; unverzichtbar nach Richtlinien | Nicht in der Definition | Nicht in der Definition |
| Ausgaben | Vorhersagen, Inhalte, Empfehlungen, Entscheidungen | Dieselben vier | Inhalte, Prognosen, Empfehlungen, Entscheidungen | Vorhersagen, Empfehlungen, Entscheidungen |
| Wirkung | Physische oder virtuelle Umgebungen | Physische oder virtuelle Umgebungen | Nicht in der Definition | Reale oder virtuelle Umgebungen |
| Autonomie | Variiert je nach System | Für unterschiedliche Stufen ausgelegt; notwendig | Automatisierung variiert; Autonomie ist eine starke, separate Eigenschaft | Unterschiedliche Stufen |
| Anpassungsfähigkeit | Variiert je nach System | „Kann"; nicht entscheidend | Nicht in der Definition | Nicht in der Definition |

Quellen: [3][4][1][6][8].

Zwei praktische Schlussfolgerungen folgen. Bei jeglicher EU-Exposition ist der Text der
KI-Verordnung, gelesen mit den Richtlinien der Kommission, der operative Test, und der OECD-Text ist
sein Zwilling anderswo. Und die Tests sind nicht austauschbar: Ein System, das ISO/IEC 22989 oder
NIST-Vokabular als KI bezeichnen würde, kann immer noch in einer der ausgeschlossenen Familien der
Richtlinien sitzen. Notieren Sie, welchen Test Sie angewendet haben.

## Vom Definitionselement zum Registrierungsfeld

Jedes Element der Definition ist eine Frage, die der Intake stellt, und ein Feld, das die
Registrierung behält. Die Antwort auf das Element treibt auch eine spätere Entscheidung an, weshalb
das Feld seinen Platz verdient: Ein Feld, das keine Entscheidung liest, ist ein Feld, das niemand
pflegen wird.

| Element | Intake-Frage | Registrierungsfeld (illustrativ) | Scoping- oder Kontrollentscheidung, die es treibt |
|---|---|---|---|
| Maschinengestützt | Wo läuft es und wer betreibt die Laufzeit? | `substrate` (`cloud-api`, `self-hosted`, `on-device`, `embedded`) | Welche Laufzeit-Kontrollen sind überhaupt möglich (Schicht 04); ob die Produktsicherheitsroute anwendbar sein kann |
| Ziele | Wofür optimiert das System? | `objective` | Welche Eval misst Erfolg; wo Reward Hacking oder Proxy-Ziele versteckt sein können |
| Zweckbestimmung | In welchem Kontext, für wen wird es verwendet? | `intended_purpose` | Risikostufe und Verpflichtungen; der FRIA- oder DPIA-Auslöser |
| Inferenz | Leitet es Ausgaben durch Lernen oder durch kodiertes Wissen ab, anstatt durch Regeln, die Menschen geschrieben haben? | `inference_technique` (`ml.supervised`, `ml.self-supervised`, `logic-based`, `none` …) | In oder außerhalb der KI-Definition; welche ausgeschlossene Familie, falls vorhanden |
| Ausgaben | Vorhersage, Inhalt, Empfehlung oder Entscheidung? | `output_types` | Inhalt: Markierung und Offenlegungsanalyse (Art. 50); Entscheidung: Erklär- und Überprüfungspflichten (Art. 86, DSGVO Art. 22) |
| Wirkung | Ändert es eine physische oder virtuelle Umgebung, und durch was? | `effect_surface` (`display`, `tools`, `actuator`) | Tools: Agentenregister, begrenzte Anmeldedaten; Aktuator: Stopp in einem sicheren Zustand |
| Autonomie | Was passiert zwischen Ausgabe und Wirkung ohne eine Person? | `autonomy_level` (0–4, unten) | Design der menschlichen Aufsicht, Gate-Platzierung, Kill Switch |
| Anpassungsfähigkeit | Kann sich das Verhalten in der Nutzung ohne eine Freigabe ändern? | `adapts_in_use`, `change_triggers` | Neubewertungsauslöser; [Drift-Überwachung](/patterns/drift-fairness-monitor); Feedback-Loop-Kontrollen (Art. 15 Absatz 4) |

Quellen für die rechtlichen Anknüpfungspunkte: [9][10][11][12].

Zwei Zeilen verdienen eine Anmerkung. Teams kollabieren am häufigsten **Ziel** in
**Zweckbestimmung**. Das eigene Beispiel der Richtlinien ist ein Unternehmensassistent, dessen Ziel
es ist, Fragen über einen Dokumentensatz genau zu beantworten, und dessen Zweckbestimmung darin
besteht, die Aufgaben einer Abteilung zu unterstützen [1]. Das erste sagt dir, was zu evaluieren
ist; das zweite sagt dir, wofür das Gesetz das System hält. Ein unverändertes Modell, das zu einer
neuen Zweckbestimmung verschoben wird, ist für Risikobetrachtungen ein neues System. Und die
**Ausgaben**-Zeile zeichnet die Ausgabe *wie verwendet* auf: Die Richtlinien beachten, dass eine
Empfehlung „automatisch angewendet" wird zur Entscheidung [1], also ist ein Modell, das empfiehlt,
plus eine Pipeline, die automatisch genehmigt, zusammen ein Entscheidungssystem.

Ein Autonomie-Feld braucht eine Skala. Es gibt keine Standard-Skala; die folgende Skala ist
illustrativ und ordnet sich der Aufsichtsvokabular der EU-Hochrangigen Expertengruppe zu
(Mensch-in-der-Schleife, Mensch-in-der-Schleife, Mensch-im-Kommando) [13].

| Stufe | Name | Was passiert zwischen Ausgabe und Wirkung | Aufsichtsmodus |
|---|---|---|---|
| 0 | Beratend | Eine Person liest die Ausgabe und entscheidet | Mensch-im-Kommando |
| 1 | Unterstützt | Das System entwirft; eine Person genehmigt jede Aktion | Mensch-in-der-Schleife |
| 2 | Begrenzte Aktion | Das System handelt innerhalb eines erklärten Umfangs; folgenreiche Aktionen durchlaufen ein Gate | In der Schleife für gated Aktionen |
| 3 | Überwachte Autonomie | Das System handelt; Menschen überwachen und können es stoppen | Mensch-in-der-Schleife |
| 4 | Unüberwacht | Das System handelt ohne routinemäßige Aufsicht | Keine routinemäßig; nur Kill Switch |

> **Beispiel (illustrativ)**
> Die Scoping-Felder von `csa-01`, dem Kundenservice-Assistenten, der in diesem Buch verwendet wird,
> wie sein Registrierungseintrag sie aufzeichnet. Die Definitionsentscheidung und die Risikostufe
> sind separate Einträge.

```yaml
id: csa-01
definition_basis: eu-ai-act-art-3-1+commission-guidelines
definition_decision: in_scope        # in_scope | out_of_scope | undecided
definition_reason: "LLM infers replies from customer messages; generates content and
  recommendations; calls tools. Not basic data processing or classical heuristics."
decided_by: intake-pipeline + ai-governance-review
decided_on: 2026-09-18
substrate: cloud-api
objective: "answer order and refund questions accurately from the knowledge base"
intended_purpose: "first-line support for retail customers in the EU"
inference_technique: [ml.self-supervised, ml.rlhf, retrieval]
output_types: [content, recommendation]
effect_surface: tools
tools: [refunds:read, orders:read]
autonomy_level: 2
adapts_in_use: false
change_triggers: [vendor-model-version, prompt-change, corpus-snapshot]
kind: [generative, rag, agentic]
```

Die Out-of-Scope-Entscheidungen sind genauso wichtig wie die In-Scope-Entscheidungen. Ein
Rückerstattungsberechtigungs-Regelmodul, dessen jeden Zweig eine Person geschrieben hat, bekommt
auch einen Registrierungseintrag, markiert `out_of_scope` mit dem Grund („grundlegende
Datenverarbeitung; Regeln ausschließlich von Menschen definiert"). Dieser Eintrag ist das, was dich
einen Auditor zeigen lässt, dass du geschaut hast, und was eine spätere Änderung (jemand fügt einen
gelernten Betrugsscore zum Modul hinzu) als Diff sichtbar macht.

## KI versus konventionelle Software

Die Grenze zwischen KI und konventioneller Software ist die Grenze zwischen Verhalten, das jemand
spezifiziert hat, und Verhalten, das jemand induziert hat. Erwägungsgrund 12 zieht sie an derselben
Stelle: Regeln, die ausschließlich von Menschen definiert werden, sind keine KI; Inferenz aus Daten
oder aus kodiertem Wissen ist [5]. Für die Governance ist der Unterschied nicht philosophisch. Jede
Zeile unten ist eine Kontrolle, die klassische IT-Governance durchführt und die nicht mehr
funktioniert.

| Eigenschaft | Konventionelle deterministische Software | KI-System | Folge für die Governance |
|---|---|---|---|
| Woher das Verhalten kommt | Regeln, die von Menschen geschrieben werden | Gelernt aus Daten oder abgeleitet aus kodiertem Wissen | Überprüfen Sie die Daten und die Evals, nicht nur den Code |
| Gleiche Eingabe, gleiche Ausgabe | Ja, konstruktionsbedingt | Nicht garantiert; generatives Serving kann auch bei Temperatur null variieren [14] | Evidenz fixiert Version und Sampling-Einstellungen; Evals wiederholen sich |
| Was „korrekt | Entspricht einer Spezifikation | Erfüllt eine Fehlerrate auf einer Verteilung | Schwellwerte ersetzen Bestanden/Nicht bestanden; Schwellwerte benötigen Eigentümer |
| Wie es getestet wird | Unit- und Integrationstests gegen die Spezifikation | Evals über Stichproben; Abdeckung ist statistisch | Die Eval-Suite ist selbst ein verwaltetes Artefakt |
| Was das Verhalten ändert | Ein Code-Diff | Ein Code-Diff, neue Gewichte, neue Daten, eine Prompt-Bearbeitung, eine Corpus-Aktualisierung, ein Anbieter-Update | Change Management wird bei allen ausgelöst |
| Wie es fehlschlägt | Ein reproduzierbarer Fehler | Ein Fehlermodus, der bei einigen Eingaben manchmal in großem Maßstab auftritt | Überwachen Sie Raten in der Produktion, nicht nur Vorfälle |
| Wie Sie es erklären | Lesen Sie den Code | Interna sind nicht für Menschen lesbar | Erklärungen werden erzeugt, protokolliert und getestet |

Zwei Vorbehalte halten die Tabelle ehrlich. Erstens ist die Grenze rechtlich und technisch zugleich,
und das Recht zieht sie mit einiger Unordnung: ein logikbasiertes Expertensystem, das
Schlussfolgerungen aus kodifiziertem medizinischem Wissen ableitet, fällt unter die KI-Verordnung,
während eine heuristische Schach-Engine außerhalb fällt [1]. Dokumentieren Sie die Begründung, denn
der nächste Prüfer wird die Linie erneut ziehen. Zweitens: "nicht KI" bedeutet nicht "nicht
reguliert". Deterministische Automatisierung kann im großen Maßstab eigenständig schaden, und das
Datenschutzrecht gibt Menschen das Recht, nicht Gegenstand einer Entscheidung zu sein, die
"ausschließlich auf einer automatisierten Verarbeitung" beruht und rechtliche oder ähnlich
erhebliche Auswirkungen hat, unabhängig davon, ob eine KI-Definition erfüllt ist [11]. Die
Definitionsentscheidung leitet ein System zu den KI-spezifischen Kontrollen; sie befreit nichts
anderes (siehe [Privacy and AI](/bok/privacy-and-ai#principles-applied-to-ai)).

> **Hinweis**
> Ein **Modell** ist kein **System**, und ein **Agent** auch nicht. Die KI-Verordnung definiert das
> KI-System (Art. 3(1)) und separat das KI-Modell mit allgemeinem Verwendungszweck (Art. 3(63)) und
> das darauf aufgebaute KI-System mit allgemeinem Verwendungszweck (Art. 3(66)) [4]. Das Register
> führt beide Ebenen und verknüpft sie: ein Modell kann in vielen Systemen sitzen, und jedes der
> [fünf Governance-Objekte](/bok/definition#the-object-of-governance) aus Kapitel 01 braucht seinen
> eigenen Eintrag.

## Arten von KI, die das Governance-Problem verändern

Taxonomien der KI sind reichlich vorhanden. Der hier angewendete Test ist eng: Ändert das Wissen um
die Art eine Kontrolle, einen Eigentümer oder die Evidenz? Wenn nicht, wird die Taxonomie erwähnt
und beiseite gelegt.

### Nach Fähigkeit und Funktionalität

Die Fähigkeitstreppe (Narrow AI, Artificial General Intelligence, Superintelligenz) ist die am
häufigsten zitierte und die am wenigsten nützliche für Kontrollen. Jedes eingesetzte System ist in
dem Sinne eng, der zählt; es gibt keine vereinbarte Definition von allgemeiner Intelligenz, und
Forschungsvorschläge zu ihrer Operationalisierung tun dies durch Leistungs-, Generalitäts- und
Autonomiestufen statt durch einen einzelnen Schwellenwert [15]. Das Recht hat die Frage mit
messbaren Stellvertretern umgangen. Die KI-Verordnung regelt das
**KI-Modell mit allgemeinem Verwendungszweck**, eines, das "erhebliche Allgemeingültigkeit aufweist"
und "eine breite Palette unterschiedlicher Aufgaben kompetent erfüllen kann", einschließlich
Modelle, die auf großen Datenmengen "unter Verwendung von Selbstüberwachung im großen Maßstab"
trainiert wurden [4], und vermutet "Fähigkeiten mit hoher Wirkkraft", wenn die Trainingsberechnung
10^25 Gleitkommaoperationen übersteigt [16]. Die GPAI-Richtlinien der Kommission fügen ein
indikativen Kriterium für den Status der Allgemeingültigkeit selbst hinzu: Trainingsberechnung über
10^23 FLOP und die Fähigkeit, Sprache, Text-zu-Bild oder Text-zu-Video zu generieren [17]. Für das
Register wird Fähigkeit daher zu zwei messbaren Feldern, `model_generality` und
`training_compute_flop`, die normalerweise aus der Dokumentation des Anbieters entnommen werden,
statt im Haus gemessen zu werden.

Die Funktionalitätstaxonomie (reaktive Maschinen, begrenzte Speicherung, Theorie des Geistes,
Selbstbewusstsein) stammt aus einem populären Artikel von 2016 [18]. Nur die ersten beiden
beschreiben Systeme, die existieren, und keine ordnet sich einer Kontrolle zu; erkennen Sie sie,
aber machen Sie sie nicht zu einem Registerfeld.

### Nach Lernparadigma

Das Lernparadigma sagt Ihnen, woher das Verhalten kam, und daher, woher seine Evidenz kommen muss.

| Paradigma | Wie es lernt | Governance-Risiko, das es hinzufügt | Kontrolle, die es beantwortet |
|---|---|---|---|
| Überwacht | Aus beschrifteten Beispielen | Beschriftungen kodieren vergangene menschliche Entscheidungen, ihre Fehler und ihre Vorurteile; Proxys für geschützte Merkmale | Beschriftungsherkunft auf der Datenkarte; Subgruppen-Evals im Eval Gate |
| Unüberwacht | Findet Struktur ohne Beschriftungen (Cluster, Anomalien) | Keine Grundwahrheit zum Testen; Segmente können geschützte Merkmale verfolgen | Stabilitätstests; menschliche Überprüfung von Segmentdefinitionen vor der Verwendung |
| Halbüberwacht | Verbreitet einige Beschriftungen über unbeschriftete Daten | Beschriftungsfehler verbreiten sich stillschweigend | Überprüfen Sie eine Stichprobe verbreiteter Beschriftungen |
| Selbstüberwacht | Sagt Teile seiner eigenen Eingabe (das nächste Token) über große Corpora voraus | Corpus-Herkunft, Rechte und Memorisierung sind schwer zu verfolgen | AIBOM mit Dataset-Herkunft; die GPAI-Schulungsinhalts-Zusammenfassung (siehe [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Verstärkung, einschließlich von menschlichem Feedback | Maximiert ein Belohnungssignal | **Reward Hacking**: Das System findet eine unbeabsichtigte Möglichkeit zu punkten [19] | Zeichnen Sie die Belohnung als `objective`} auf; Evals, die nach unbeabsichtigten Strategien suchen |
| Im Kontext (Zero- und Few-Shot) | Folgt Anweisungen und Beispielen im Prompt zur Inferenzzeit | Das Verhalten ändert sich mit einer Prompt-Bearbeitung, kein erneutes Training erforderlich | Prompts versioniert als verwaltete Artefakte; Eval Gate bei Prompt-Änderung |

### Nach Technologiefamilie

| Familie | Beispiel | Was sich für die Governance ändert |
|---|---|---|
| Klassisches maschinelles Lernen | Gradient-Boosted-Kreditwürdigkeit auf Tabellendaten | Kalibrierung und Subgruppen-Fehler dominieren die Eval-Suite |
| Deep Learning | Bildklassifizierer | Undurchsichtigkeit; gegnerische Eingaben; höhere Rechen- und Evidenzkosten |
| Verarbeitung natürlicher Sprache | Beschwerde-Triage; LLM-Assistenten | Text enthält personenbezogene Daten und für LLMs Anweisungen, die ein Angreifer einpflanzen kann |
| Maschinelles Sehen | Dokument- oder Gesichtserkennung | Biometrische Daten werfen Fragen zu besonderen Kategorien und verbotenen Praktiken auf (siehe [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Sprache | Anruftranskription; Sprachsynthese | Stimme ist personenbezogenes Datum; synthetische Audiodaten müssen gekennzeichnet werden (Art. 50) [9] |
| Robotik und Cyber-Physik | Lagerroboter | Physikalische Wirkung: der Stopp muss das System in einen sicheren Zustand bringen (Art. 14(4)(e)) [20] |
| Logik- und wissensbasiert | Expertensystem zur Diagnoseunterstützung | Innerhalb der KI-Act-Definition, wenn es aus kodiertem Wissen ableitet [1]; „es sind nur Regeln |

### Prädiktiv versus generativ

Ein **prädiktives** (oder diskriminatives) System gibt eine Schätzung über etwas aus, das existiert:
eine Punktzahl, eine Klasse, eine Vorhersage. Seine Schäden sind Zuordnungsschäden (eine falsche
oder voreingenommene Schätzung setzt eine Person in die falsche Warteschlange), und seine Evidenz
ist Genauigkeit, Kalibrierung und Fehlerraten nach Subgruppe.

Ein **generatives** System gibt etwas Neues aus: Text, Bild, Audio, Video, Code. Seine Schäden sind
anderer Art. NISTs generatives KI-Profil listet zwölf Risiken auf, die generative KI schafft oder
verschärft, darunter **Konfabulation** ("die Produktion von selbstbewusst geäußerten, aber
fehlerhaften oder falschen Inhalten"), Informationsintegrität, geistiges Eigentum, Datenschutz,
schädliche Vorurteile und Homogenisierung sowie obszöne oder missbräuchliche Inhalte, einschließlich
synthetischen Kindesmissbrauchsmaterials [21]. Die Evidenz ändert sich entsprechend: Groundedness-
und Refusal-Evals, Red-Teaming, Output-Guardrails und unter dem KI-Act maschinenlesbare
Kennzeichnung synthetischer Ausgaben [9]. Ein Kontrollsatz passt nicht zu beiden: ein
Kalibrierungsschwellwert bedeutet nichts für generierten Text, und ein Groundedness-Eval nichts für
eine Kreditwürdigkeit.

### Foundation Models und GPAI

Ein **Foundation Model** ist eines, das "auf breiten Daten in großem Maßstab trainiert" ist und "auf
eine breite Palette von nachgelagerten Aufgaben anpassbar" ist [22]. Die Governance-Tatsache über
Foundation Models ist Vererbung: in den Worten des ursprünglichen Papers: "die Mängel des Foundation
Models werden von allen angepassten Modellen nachgelagert geerbt" [22]. Die meisten Organisationen
rufen eines über eine API auf oder passen ein Open-Weight-Modell an, daher verschiebt sich die
Evidenz von produziert zu gesammelt: die Model Card und Evaluationen des Anbieters werden zu
Eingaben für Ihren Registereintrag, und die Version, die Sie fixieren, wird zu einer Änderung, die
Sie verwalten (siehe [Third-party and procured AI](/bok/the-stack#third-party-and-procured-ai) und
das [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)). GPAI ist die
nächste rechtliche Kategorie des KI-Acts mit eigenen Pflichten für den Modellprovider (siehe
[GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice)).

### LLMs und SLMs

Ein **großes Sprachmodell (LLM)** ist ein Foundation Model für Sprache, normalerweise von einem
Rechenzentrum aus bereitgestellt. Ein **kleines Sprachmodell (SLM)** tauscht Breite gegen Größe,
damit es in der Nähe des Benutzers ausgeführt werden kann; ein technischer Bericht von 2024
beschreibt ein Modell mit 3,8 Milliarden Parametern als "klein genug, um auf einem Telefon
bereitgestellt zu werden" [23]. Der Governance-Unterschied ist, wo die Kontrollen leben. Ein LLM
hinter einer API sitzt hinter einem Gateway, das Sie kontrollieren, wo jeder Aufruf verfolgt,
gefiltert und gestoppt werden kann. Ein SLM auf einem Gerät läuft dort, wo Ihre Telemetrie
möglicherweise nicht hinreicht: seine Guardrails werden damit ausgeliefert, sein Inventar ist eine
Flotte von Geräten und sein Kill Switch ist ein Remote-Flag oder ein App-Update, mit der
Verzögerung, die das impliziert.

### Multimodale Modelle

Ein **multimodales** Modell nimmt oder produziert mehr als eine Modalität (Text, Bild, Audio,
Video). Bilder und Audio können personenbezogene Daten enthalten, die die Text-Pipeline nie sah, und
Anweisungen, die die Text-Filter nie gescannt haben, und synthetische Bilder, Audio und Video werfen
die Kennzeichnungspflichten von Artikel 50 auf [9]. Also existieren Guardrails pro Modalität, und
die Eval-Suite enthält Cross-Modal-Fälle.

### RAG-Systeme

**Retrieval-augmented generation (RAG)** kombiniert das gelernte ("parametrische") Gedächtnis eines
Modells mit einem abrufbaren ("nicht-parametrischen") Speicher von Dokumenten, ursprünglich ein
dichter Vektorindex [24]. Seine Autoren haben bereits die Herkunft als offenes Problem benannt [24].
Für die Governance wird das Korpus zum Verhalten: Ändern Sie die Dokumente und die Antworten ändern
sich ohne Modelländerung. Das Korpus wird also wie ein Modell gesteuert, versioniert und kartiert,
sein Snapshot an die Eval gebunden, die es getestet hat (siehe
[data governance across the stack](/bok/the-stack#data-governance-across-the-stack)). Der Abruf
benötigt auch eine Berechtigungsprüfung: Ein RAG-System, das ein Dokument abruft, das der Benutzer
möglicherweise nicht sehen darf, hat es offengelegt, egal wie höflich die Antwort ist.

### Agentic systems

Ein **agentic system** plant und handelt: Es ruft Tools auf, durchsucht, führt Code aus und
verschiebt Daten unter delegierter Autorität, oft über viele Schritte. Es ändert das
Governance-Problem am meisten, weil seine Ausgabe eine Auswirkung in einem System of Record ist,
keine Empfehlung, die eine Person liest. Die Bedrohungen sind im OWASP Top 10 for Agentic
Applications katalogisiert [25], und die Kontrollen sind die Schicht-04-Gruppe: Identität, Umfang,
Tool-Vermittlung, menschliche Gates und ein getesteter Stopp
([Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials),
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker),
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)). Die vollständige Behandlung ist in
[Governing agents](/bok/governing-agents#what-makes-an-agent-a-governance-object).

### Warum der Typ wichtig ist: die Kontrollgruppe nach Art

| Art | Charakteristischer Schaden | Kontrolle, die sich ändert | Schicht · Muster |
|---|---|---|---|
| Prädiktiv oder Scoring | Falsche oder verzerrte Zuteilung | Kalibrierung und Subgruppen-Evals; eine Schwellenwertrichtlinie mit einem Eigentümer | 03 · [Eval Gate in CI](/patterns/eval-gate-in-ci); 01 · [Policy Card](/patterns/policy-card) |
| Generativ | Konfabulation, IP, Informationsintegrität, missbräuchliche Inhalte | Begründetheit und Red-Team-Evals; Output-Guardrails; Inhaltsmarkierung | 03 · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite); 04 · [Runtime Guardrail](/patterns/runtime-guardrail) |
| Foundation oder GPAI-Modell, beschafft | Vererbte Mängel; Nachweise, die Sie nicht erbringen können | Due Diligence; Versions-Pinning; Basismodell im AIBOM | 02 · [AIBOM](/patterns/aibom); Vendor / Model Due-Diligence Gate |
| SLM auf Gerät | Keine zentrale Telemetrie; Update-Verzögerung | Guardrails mit dem Modell versandt; Geräteebenen-Versionsinventar | 02 · [Agent Registry](/patterns/agent-registry); 04 · Kill Switch |
| Multimodal | Neue Injektions- und Personendatenkanäle | Guardrails pro Modalität; Cross-Modal-Evals; Markierung | 04 · Runtime Guardrail; 03 · Red-Team Suite |
| RAG | Korpusänderungen ändern Verhalten; Abruf leckt | Korpus als gesteuerte Daten; Berechtigungsprüfung beim Abruf; Begründetheitsevals | 02 · data card; 04 · Runtime Guardrail |
| Agentic | Aktionen unter delegierter Autorität | Identität, Umfang, menschliche Gates, getesteter Stopp | 04 · Agent Identity & Scoped Credentials; Kill Switch; Human-in-the-loop Gate |

Arten kombinieren. `csa-01` ist generativ, retrieval-augmented und agentic gleichzeitig, daher trägt
es alle Kontrollen der drei Zeilen; das `kind`}-Feld der Registry ist eine Liste, kein einzelner
Wert.

## Acht Merkmale, die klassische IT-Governance brechen

Klassische IT-Governance (Change Management, SDLC-Gates, Zugriffskontrolle, das
Sicherheitsmanagementsystem, regelmäßige Audits) geht davon aus, dass das Verhalten spezifiziert
ist, eine Änderung ein Code-Diff ist, ein Test gegen eine Spezifikation besteht oder nicht, eine
Person hinter jeder folgenreichen Aktion steht und das System heute tut, was es gestern tat. KI
bricht jede Annahme irgendwo. NISTs Anhang B listet die Wege auf, wie sich KI-Risiken von
traditionellem Softwarerisiko unterscheiden, von Daten, die möglicherweise nicht den Nutzungskontext
darstellen, über Skalierung und Komplexität mit "Milliarden oder sogar Billionen von
Entscheidungspunkten", bis zu "erhöhter Undurchsichtigkeit", Drift, der häufigere Wartung erfordert,
und die "Unfähigkeit, die Nebenwirkungen von KI-basierten Systemen über statistische Maßnahmen
hinaus vorherzusagen oder zu erkennen" [8]. Die Tabelle verwandelt diese Liste in die acht Merkmale,
die ein Ingenieur entwerfen muss.

| Merkmal | Warum klassische IT-Governance fehlschlägt | Was es beantwortet (Schicht · Muster) | Nachweise, die es ausstrahlt |
|---|---|---|---|
| **Komplexität** | Die CMDB zeichnet die Anwendung auf; das Modell, die Datensätze, Prompts, das Abrufkorpus und der Tool-Graph darin sind unsichtbar | 02 · AIBOM, Agent Registry | Ein AIBOM pro Build; Registry-Links vom System zum Modell zu Daten |
| **Undurchsichtigkeit** | Code-Review geht davon aus, dass die Logik lesbar ist; Modellinterna sind es nicht | 03 · behavioural evals; 02 · [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Eval-Ergebnisse gegen benannte Fehlermodi; protokollierte Erklärungen |
| **Autonomie** | Zugriffskontrolle und Segregation of Duties gehen davon aus, dass eine Person hinter jeder Sitzung steht | 04 · Agent Identity & Scoped Credentials; Human-in-the-loop Gate; Kill Switch | Identitätsereignisse; Gate-Entscheidungen mit Genehmiger; Kill-Switch-Drill-Aufzeichnungen |
| **Geschwindigkeit und Skalierung** | Regelmäßige, stichprobenbasierte Überprüfung trifft, nachdem ein Fehler eine Million Mal wiederholt wurde | 04 · Runtime Guardrail, Kill Switch / Circuit Breaker; 05 · [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Guardrail-Entscheidungen; Breaker-Auslöser; Rollback-Aufzeichnungen |
| **Probabilistische Ausgaben** | Tests sind Bestanden/Nicht bestanden gegen eine Spezifikation; eine einzelne falsche Antwort ist ein Bug | 03 · Eval Gate in CI mit Schwellwerten; 01 · Policy Card pro Risikostufe | Kalibrierungs- und Schwellwert-Ergebnisse pro Version |
| **Datenabhängigkeit** | Data Governance schützt Daten als Aufzeichnungen, nicht als Verhaltensquelle | 02 · data card und lineage; 03 · data-quality und subgroup tests | Data Card; Lineage-Aufzeichnung; Testergebnisse gegen die Datensatzversion eingereicht |
| **Dual Use und Missbrauch** | Bedrohungsmodelle konzentrieren sich auf unbefugten Zugriff, nicht auf berechtigte Nutzung für einen schädlichen Zweck | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail; 01 · acceptable use as code | Red-Team-Erkenntnisse; Missbrauchserkennung; Richtlinienverdikt |
| **Adaptivität und Drift** | Change Management wird bei Code-Deploys ausgelöst; Verhalten ändert sich ohne einen | 05 · Continuous Assurance Telemetry; 03 · re-run the gate on model, data or prompt change | Drift-Warnungen gegen die Eval-Baseline; Neubewertungsergebnisse |

Ein paar Zeilen brauchen mehr als eine Zelle.

**Undurchsichtigkeit hat drei Quellen, und jede hat eine andere Lösung.** Burrell unterscheidet
Undurchsichtigkeit als beabsichtigte Unternehmens- oder Staatsgeheimnis, Undurchsichtigkeit als
technische Analphabetismus und Undurchsichtigkeit "die sich aus den Merkmalen von
Machine-Learning-Algorithmen und dem erforderlichen Umfang ergibt, um sie sinnvoll anzuwenden" [26].
Geheimnis wird durch Vertrag und Offenlegung beantwortet (Lieferantendokumentation, Audit-Rechte);
Analphabetismus durch Alphabetisierung und durch Erklärungen, die für ihren Leser geschrieben sind;
nur die dritte benötigt technische Erklärungsmethoden und vor allem Verhaltensnachweis. Wenn Sie den
Mechanismus nicht lesen können, testen Sie das Verhalten, und das Eval-Ergebnis wird zum Nachweis,
der für die Inspektion steht. Erklärungstechniken selbst werden in
[Fairness and explainability](/bok/fairness-and-explainability#explanation-techniques) behandelt.

**Dual Use ist eine Eigenschaft der Fähigkeit, nicht der Absicht.** Forscher, die das Ziel eines
Toxizitätsmodells zur Arzneimittelentdeckung umkehrten und Toxizität belohnten, anstatt sie zu
bestrafen, berichten, dass es in weniger als sechs Stunden etwa 40.000 Kandidaten-Toxinmoleküle
generierte, einschließlich bekannter Nervengase [27]. Nichts wurde verletzt; ein autorisierter
Benutzer änderte ein Ziel. Deshalb benötigt Missbrauch sein eigenes Bedrohungsmodell, Red-Team-Fälle
für schädliche Nutzungen legitimer Fähigkeiten und Laufzeiterkennung, nicht nur Perimetersicherheit.

**Geschwindigkeit und Skalierung verwandeln eine kleine Fehlerquote in Massenschaden.** Eine
Fehlerquote von 1% ist ein Rundungsfehler in einer vierteljährlichen Überprüfung und zehntausend
falsche Entscheidungen pro Tag in einem System, das eine Million trifft. Die Antworten sitzen also
zur Laufzeit: ein Guardrail pro Aufruf, ein Breaker, der bei einer Rate auslöst, ein Rollback, das
vor Bedarf getestet wird.

**Adaptivität ist breiter als Selbstlernen.** Für Systeme, die während der Nutzung weiterlernen,
fordert die KI-Verordnung Designs, die das Risiko von voreingenommenen Ausgaben, die in zukünftige
Eingaben zurückfließen, reduzieren ("Feedback-Schleifen") [12]. Aber die meisten
Verhaltensänderungen kommen ohne Selbstlernen: Ein Anbieter aktualisiert das Modell hinter einer
API, die Eingaben driften, ein Prompt wird bearbeitet, ein Korpus wird aktualisiert. Umschulung kann
auch das Funktionieren brechen: Neuronale Netze sind anfällig für **katastrophales Vergessen**, das
frühere Kompetenz verliert, wenn es auf neue Aufgaben trainiert wird [28]. Jedes ist ein
Änderungsereignis, und das Eval-Gate läuft auf jedem.

### Kontrastpaare

Vier Paare werden in Überprüfungen häufig genug verwechselt, um sie im Vokabular des Teams zu
korrigieren.

| Paar | Der Unterschied | Warum es für Kontrollen wichtig ist |
|---|---|---|
| **Komplexität** und **Undurchsichtigkeit** | Wie viele Teile interagieren, gegen ob eine Person dem Denken folgen kann; ein kleines neuronales Netz ist einfach und undurchsichtig | Komplexität benötigt ein Inventar; Undurchsichtigkeit benötigt Evals |
| **Transparenz**, **Erklärbarkeit**, **Interpretierbarkeit** | In NISTs Rahmen beantworten sie "was passiert ist", "wie" eine Entscheidung getroffen wurde und "warum", mit ihrer Bedeutung für den Benutzer [8] | Drei Artefakte: Aufzeichnungen dessen, was lief, eine Erklärungsmethode, eine Nachricht, auf die der Benutzer reagieren kann |
| **Datendrift** und **Konzeptdrift** | Die Eingaben ändern sich, gegen die Beziehung zwischen Eingaben und der richtigen Antwort ändert sich | Das erste zeigt sich in den Eingaben; das zweite nur in Ergebnissen |
| **Datenschutz** und **Sicherheit** | Ob die Verarbeitung personenbezogener Daten angemessen ist, gegen ob das System Angriffen widersteht | Ein sicheres System kann immer noch Daten verarbeiten, zu deren Verarbeitung es kein Recht hat |

## Governance probabilistischer Ausgaben

Konventionelle Software gibt eine Antwort zurück. Die meisten KI geben eine Schätzung oder eine
Stichprobe zurück, und jemand muss entscheiden, was damit zu tun ist. Diese Entscheidung wird
meistens einem Standard eines Datenwissenschaftlers überlassen, und hier fügt Engineering das meiste
hinzu.

### Ein Score ist keine Entscheidung

Ein Vorhersagemodell gibt einen Score aus. Eine Entscheidung ist ein Score plus ein Schwellwert plus
eine Aktion, die ausgeführt wird, wenn der Score ihn überschreitet. Der Schwellwert ist, wo
Risikoappetit zum Verhalten wird, daher ist es eine Richtlinienentscheidung mit einem Eigentümer,
einer Version und einem Gültigkeitsdatum, nicht ein Hyperparameter, der bei 0,5 belassen wird.
Schreiben Sie es als [Policy Card](/patterns/policy-card)-Regel, testen Sie es im Eval-Gate und
protokollieren Sie es mit jeder Entscheidung, die es trifft. Wenn ein Auditor fragt, warum ein
Antragsteller abgelehnt wurde, "der Score war 0,41 und der Schwellwert, im Besitz des Kreditrisikos
und gültig seit 1. Oktober, war 0,45" ist eine Antwort; "das Modell sagte nein" ist nicht.

### Kalibrierung vor Schwellwerten

Ein Schwellwert bedeutet nur etwas, wenn der Score es tut. Ein **kalibriertes** Modell's 0,9 ist
etwa neun von zehn Mal richtig. Eine häufig zitierte Studie fand heraus, dass moderne neuronale
Netze, anders als die von vor einem Jahrzehnt, schlecht kalibriert sind, und dass eine einfache
Post-hoc-Korrektur (Temperatur-Skalierung) überraschend wirksam ist [29]. Die Kalibrierung gehört
also in die Eval-Suite als gemessene Eigenschaft mit eigenem Schwellwert (eine erwartete
Kalibrierungsfehlergrenze, pro Version und pro Subgruppe), neu überprüft, wenn sich das Modell oder
die Population ändert. Die KI-Verordnung deutet bereits in diese Richtung für Hochrisiko-Systeme:
Die Genauigkeitsstufen und "die relevanten Genauigkeitsmetriken" müssen in den Betriebsanleitungen
angegeben werden [12]. Deklarierte Metriken werden zur Baseline, gegen die Laufzeit-Telemetrie
verglichen wird.

Wenn ein einzelner Score nicht ausreicht, bietet **konforme Vorhersage** eine diszipliniertere
Alternative: Sie wandelt die Ausgabe eines trainierten Modells in eine Menge von Kandidatenantworten
um, die "garantiert die Grundwahrheit mit einer vom Benutzer festgelegten Wahrscheinlichkeit
enthält", ohne Annahmen über die Datenverteilung [30]. Eine große Menge bedeutet, dass das Modell
unsicher ist, was genau das Signal ist, das eine Governance-Regel weiterleiten kann.

### Gewissheit erforderlich nach Risikostufe

Die Gewissheit, die eine Entscheidung benötigt, hängt davon ab, was es kostet, falsch zu liegen. Die
Laufzeitregel wird daher nach Risikostufe festgelegt. Drei Maßnahmen wiederholen sich. Ein
**Abstentionsband** leitet Scores, die weder eindeutig positiv noch eindeutig negativ sind, durch
ein [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) an eine Person weiter. Eine
**Adverse-Outcome-Regel** sendet jede Entscheidung, die dem Betroffenen schadet, zur Überprüfung,
unabhängig davon, wie sicher sich das Modell ist. Eine **Out-of-Distribution-Regel** lehnt Eingaben
ab oder eskaliert sie, die sich von allem unterscheiden, worauf das System getestet wurde, denn ein
sicherer Score bei einer unbekannten Eingabe ist die am wenigsten vertrauenswürdige Ausgabe, die ein
Modell erzeugt.

| Risikostufe (illustrativ) | Laufzeitregel | Erforderliche Nachweise pro Version | Menschliche Rolle |
|---|---|---|---|
| Niedrig (interne Suchrankings) | Auf die beste Ausgabe einwirken | Aggregierte Genauigkeit auf einem Golden Set | Regelmäßige Überprüfung |
| Moderat (kundenorientierter Assistent) | Einwirken; abstehen und übergeben, wenn Fundierung oder Vertrauen unter einen Schwellenwert fallen | Fundierungs-, Verweigerungs- und Übergabe-Evals | In der Schleife: überwachen und stoppen |
| Hoch (Entscheidungen über den Zugang von Menschen zu Arbeitsplätzen, Krediten oder Dienstleistungen) | Nur oberhalb eines kalibrierten Schwellenwerts empfehlen; Abstentionsband und jedes nachteilige Ergebnis an einen Prüfer | Kalibrierung und Fehlerraten nach Untergruppe; erklärte Genauigkeitsmetriken | In der Schleife für das Band und nachteilige Ergebnisse; Erklärung auf Anfrage |
| Nicht zu automatisieren | Keine automatische Aktion; höchstens beratende Ausgabe, oder die Nutzung ist blockiert | Ein Richtlinienverdikt | Im Kommando |

Die menschliche Rolle ist selbst eine Kontrolle, die sich verschlechtern kann. Überwachung unter
Last wird zum Gummistempel, und das KI-Verordnung verlangt, dass die Personen, die hochriskante
Systeme überwachen, sich der "Automatisierungsverzerrung" bewusst bleiben, der Tendenz, sich zu sehr
auf die Ausgabe zu verlassen [20]. Die Gate protokolliert also den Genehmiger, die Zeit bis zur
Entscheidung und die Überschreibungsrate, und eine fallende Überschreibungsrate wird untersucht,
nicht gefeiert (siehe
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

> **Beispiel (illustrativ)**
> Eine Schwellenwertrichtlinie für ein Loan-Triage-Modell, geschrieben als Policy Card-Regel. Die
> Zahlen sind illustrativ; der Punkt ist, dass jede einen Besitzer und ein Gültigkeitsdatum hat und
> in der Gate getestet wird.

```json
{ "policy_id": "decision-threshold.loan-triage.v3", "subject": "loan-triage-02",
  "risk_tier": "high", "owner": "credit-risk-product", "effective": "2026-10-01",
  "auto_approve_if": "calibrated_score >= 0.92",
  "review_band": [0.55, 0.92], "review_route": "hitl-gate.credit-review",
  "adverse_outcome": "always-human-review",
  "out_of_distribution": "escalate",
  "release_requires": ["calibration.ece <= 0.03", "subgroup.fnr_gap <= 0.02"] }
```

### Generative Ausgaben und Nicht-Determinismus

Generative Systeme haben keinen einzelnen Score zum Schwellenwertsetzen. Die Kontrollen verlagern
sich auf Eigenschaften der Ausgabe: in ihren Quellen fundiert, zitiert, verweigert, wenn es sein
sollte, konsistent über Stichproben hinweg. Konsistenz kann nicht vorausgesetzt werden. Ein Labor
berichtet, dass das Senden desselben Prompts 1.000 Mal an ein großes Modell bei Temperatur Null 80
unterschiedliche Vervollständigungen erzeugte, und führt die Variation auf das Batching des
Serving-Stacks zurück, nicht auf Sampling [14]. Daher werden in der Evidenz die Modellversion,
Sampling-Parameter und, wo der Stack es zulässt, der Seed aufgezeichnet; und ein Eval, das zählt,
läuft auf mehreren Stichproben und meldet eine Rate, nicht einen einzelnen Pass.

## Verantwortungs-KI-Prinzipsätze, technisch umgesetzt

In diesem Buch hat **Prinzip** eine Hausbedeutung: eine der sechs Methodenregeln in
[Kapitel 03](/bok/values-and-principles#the-six-principles), formuliert als etwas, das wir tun. Die
veröffentlichten Verantwortungs-KI-Texte verwenden das Wort für ein normatives Ziel, eine
Eigenschaft, die die KI haben sollte. Dieser Abschnitt hält die beiden auseinander. Er nennt die
veröffentlichten **Prinzipsätze**, behandelt sie als Frameworks anderer Leute (in
[Kapitel 01's Disambiguierung](/bok/definition#the-disambiguation-cluster), Ethik setzt das Ziel;
Engineering trifft es und beweist es) und stellt eine Frage an jeden: Welches Artefakt evidenziert
es, aus welcher Schicht, unter welchem Hauswert und Prinzip. Die Sätze als Frameworks werden
vollständig in [Principles and standards](/bok/principles-and-standards#the-instruments-at-a-glance)
behandelt.

### Vier Prinzipsätze in Kürze

**OECD AI Principles.** Angenommen am 22. Mai 2019, mit der Definition überarbeitet am 8. Nov 2023
und die Prinzipien am 3. Mai 2024, setzt die Empfehlung fünf wertebasierte Prinzipien: inklusives
Wachstum, nachhaltige Entwicklung und Wohlbefinden; Menschenrechte und demokratische Werte,
einschließlich Fairness und Datenschutz; Transparenz und Erklärbarkeit; Robustheit, Sicherheit und
Sicherheit; und Rechenschaftspflicht [2]. Die Überarbeitung von 2024 fügte Punkte hinzu, auf die ein
Ingenieur direkt einwirken kann: Mechanismen, damit KI-Systeme, die "Risiken für unzumutbaren
Schaden bergen oder unerwünschtes Verhalten zeigen", "überschrieben, repariert und/oder sicher außer
Betrieb genommen werden können"; Aufmerksamkeit für Missbrauch und Verwendungen außerhalb des
beabsichtigten Zwecks; Informationsintegrität; und eine explizite Bezugnahme auf
Umweltnachhaltigkeit [2].

**UNESCO Empfehlung zur Ethik der KI.** Von UNESCOs 193 Mitgliedstaaten im November 2021 angenommen,
setzt sie vier Kernwerte (Menschenrechte und Menschenwürde; friedliche, gerechte und vernetzte
Gesellschaften; Vielfalt und Inklusivität; Umwelt- und Ökosystem-Gedeihen) und zehn Prinzipien, von
Verhältnismäßigkeit und Schadensfreiheit über Fairness und Nichtdiskriminierung [31]. Sein Ethical
Impact Assessment Tool, ursprünglich auf Beschaffer von KI-Systemen ausgerichtet, bewertet ein
spezifisches System vor und nach der Bereitstellung [32].

**EU High-Level Expert Group (HLEG).** Die Ethics Guidelines for Trustworthy AI (8. Apr 2019) ruhen
auf vier ethischen Prinzipien (Respekt vor menschlicher Autonomie, Schadensverhinderung, Fairness,
Erklärbarkeit) und setzen sieben Anforderungen: menschliche Handlungsfähigkeit und Aufsicht;
technische Robustheit und Sicherheit; Datenschutz und Daten-Governance; Transparenz; Vielfalt,
Nichtdiskriminierung und Fairness; gesellschaftliches und ökologisches Wohlbefinden; und
Rechenschaftspflicht [13]. Die Assessment List for Trustworthy AI (ALTAI, 17. Jul 2020) wandelt die
sieben in eine Selbstbewertungs-Checkliste um [33], und KI-Verordnung Erwägungsgrund 27 verweist auf
dieselben sieben als nicht bindende Prinzipien, die die Verordnung ergänzen [34].

**G7 Hiroshima Process.** Die International Guiding Principles for Organizations Developing Advanced
AI Systems (30. Okt 2023), mit einem begleitenden Code of Conduct, bauen auf den OECD-Prinzipien für
fortgeschrittene und Grundmodelle auf [35]. Seine elf Prinzipien sind eher operativ als ethisch:
Lifecycle-Risikomanagement einschließlich Red-Teaming, Post-Deployment-Überwachung, öffentliche
Berichterstattung über Fähigkeiten und Einschränkungen, Austausch von Vorfallsinformationen,
Governance-Richtlinien, Sicherheitskontrollen, Content-Provenance, Forschung, globale
Herausforderungen, Standards und Dateneingabe- und IP-Schutz [36]. Seit Februar 2025 führt die OECD
ein freiwilliges Berichterstattungsrahmenwerk gegen den Code of Conduct [37].

### Wo die Sätze übereinstimmen

Die vier Sätze sind sich in der Substanz uneinig und einig. Die Tabelle kreuzt die sieben
Prinzipien, auf die sie sich einigen, mit dem Ort, an dem jeder Satz sie angibt.

| Gemeinsames Prinzip | OECD (2024) | UNESCO (2021) | EU HLEG (2019) | G7 Hiroshima (2023) |
|---|---|---|---|---|
| Fairness und Nichtdiskriminierung | 1.2 (Fairness, Nichtdiskriminierung) | Fairness und Nichtdiskriminierung | Anforderung 5 Vielfalt, Nichtdiskriminierung und Fairness | Präambel; 11 (Datenqualität gegen schädliche Vorurteile) |
| Sicherheit und Zuverlässigkeit | 1.4 (robust, sicher; überschreiben, reparieren, außer Betrieb nehmen) | Verhältnismäßigkeit und Schadensfreiheit; Sicherheit und Sicherheit | Anforderung 2 technische Robustheit und Sicherheit | 1 (Lifecycle-Risikomanagement); 2 (Post-Deployment-Überwachung) |
| Datenschutz und Sicherheit | 1.2 (Datenschutz, Datenschutz); 1.4 (Sicherheit) | Recht auf Datenschutz und Datenschutz; Sicherheit und Sicherheit | Anforderung 3 Datenschutz und Daten-Governance | 6 (Sicherheitskontrollen); 11 (persönliche Daten, IP) |
| Transparenz und Erklärbarkeit | 1.3 (einschließlich Informationen zur Anfechtung einer Ausgabe) | Transparenz und Erklärbarkeit | Anforderung 4 Transparenz | 3 (öffentliche Berichterstattung); 7 (Content-Provenance) |
| Rechenschaftspflicht | 1.5 (Rückverfolgbarkeit; systematisches Risikomanagement) | Verantwortung und Rechenschaftspflicht | Anforderung 7 Rechenschaftspflicht | 4 (Vorfallsaustausch); 5 (Governance-Richtlinien) |
| Menschenzentrierung, einschließlich Barrierefreiheit und Inklusion | 1.1 (inklusives Wachstum); 1.2 (menschliche Handlungsfähigkeit und Aufsicht) | Menschliche Aufsicht und Bestimmung; Bewusstsein und Kompetenz; Vielfalt und Inklusivität | Anforderung 1 menschliche Handlungsfähigkeit und Aufsicht; Anforderung 5 (Barrierefreiheit und universelles Design) | Präambel (Menschenzentrierung) |
| Nachhaltigkeit | 1.1 (Umweltnachhaltigkeit) | Nachhaltigkeit; Umwelt- und Ökosystem-Gedeihen | Anforderung 6 gesellschaftliches und ökologisches Wohlbefinden | 9 (Klimakrise und andere globale Herausforderungen) |

Quellen: [2][31][13][36].

### Vom Prinzip zum Artefakt

Ein Prinzip wird angewendet, wenn es auf einen benannten Schaden, eine Kontrolle, die beißt, eine
Metrik, die sich bewegt, und einen Evidenzdatensatz zurückgeführt wurde, den jemand abfragen kann.
Das ist
[Kapitel 03's "von einem benannten Ausfallmodus oder einem benannten Schaden ausgehen"](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
angewendet auf die Ziele anderer Leute. Die Tabelle gibt für jedes gemeinsame Prinzip die Hauswerte
([Kapitel 03](/bok/values-and-principles#the-eight-values)) und Hausprinzipien an, die es technisch
umsetzen, und das Artefakt, das es evidenziert. Es ist eine Startkarte, keine Behauptung, dass ein
Artefakt ein Prinzip erfüllt.

| Gemeinsames Prinzip | Hauswerte | Hausprinzipien | Artefakt, das es evidenziert | Schicht · Muster |
|---|---|---|---|---|
| Fairness | 2 Evals schlagen Builds fehl; 7 tatsächliche Risikominderung | Von einem benannten Schaden ausgehen; jeder Kontrolle Zähne geben | Subgroup-Eval-Ergebnisse gegen einen erklärten Schwellenwert; Datenkarte mit Repräsentativitätsnotizen; FRIA | 03 · Eval Gate in CI; 01 · [FRIA-as-Code](/patterns/fria-as-code) |
| Sicherheit und Zuverlässigkeit | 2; 3 Evidenz aus Laufzeit | Am frühesten Punkt bauen; jeder Kontrolle Zähne geben | Eval-Gate- und Red-Team-Ergebnisse pro Version; Guardrail-Entscheidungen; Kill-Switch-Drill-Aufzeichnungen | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail, Kill Switch |
| Datenschutz und Sicherheit | 1 Governance ist Code; 4 Identität und Umfang | Jeden Akteur registrieren und begrenzen; am frühesten Punkt bauen | Richtlinienverdikt zu Datenklasse und Residenz; begrenzte Anmeldedaten; DPIA; PII-Leckage-Evals | 01 · Policy Card; 04 · Agent Identity & Scoped Credentials |
| Transparenz und Erklärbarkeit | 5 maschinenlesbare Evidenz; 6 inspektierbare Werkzeuge | Den Build instrumentieren | Modellkarte, Datenkarte und AIBOM; Offenlegungs- und Markierungsaufzeichnungen; [Grund-Codes protokolliert pro Entscheidung](/patterns/explanation-artefact) | 02 · Model Card as Control Evidence; AIBOM |
| Rechenschaftspflicht | 4; 8 mit Engineering besessen | Jeden Akteur registrieren und begrenzen; den Build instrumentieren | Registry-Besitzer pro Eintrag; Entscheidungsaufzeichnungen; signierte Protokolle; Vorfallsaufzeichnungen; OSCAL-Bewertungsergebnisse | 02 · Agent Registry; 05 · [Incident Pipeline](/patterns/incident-pipeline), [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Menschenzentrierung | 8; 3 | Von einem benannten Schaden ausgehen; den geregelten Weg zum einfachsten machen | Gate-Protokolle (Genehmiger, Zeit bis zur Entscheidung, Überschreibungsrate); Barrierefreiheitstestergebnisse für Mitteilungen und Erklärungen; Berufungsaufzeichnungen | 04 · Human-in-the-loop Gate |
| Nachhaltigkeit | 7 | Den Build instrumentieren | Energie oder Berechnung pro Eval-Lauf und pro 1.000 Inferenzen im Evidenzspeicher; ein Modellgrößen-Entscheidungsdatensatz | 05 · Continuous Assurance Telemetry |

Drei Reihen tragen rechtliches oder numerisches Gewicht. **Menschenzentrierung** umfasst
Barrierefreiheit, und für Hochrisiko-Systeme ist sie eine Pflicht: Anbieter müssen die Anforderungen
an die Barrierefreiheit der EU-Richtlinien zur Barrierefreiheit im Web und zum Europäischen
Barrierefreiheitsgesetz erfüllen (Art. 16(l)) [38], daher wird jede Mitteilung und Erklärung, die
das System einer Person zeigt, in der Pipeline einem Barrierefreiheitstest unterzogen.
**Transparenz** erreicht die betroffene Person: Der OECD-Text fordert Informationen, die es den
Nachteilig Betroffenen ermöglichen, "die Ausgabe in Frage zu stellen" [2], und das KI-Verordnung
gibt Personen, die von bestimmten Hochrisiko-Entscheidungen betroffen sind, das Recht auf "klare und
aussagekräftige Erklärungen der Rolle des KI-Systems" [10]; das Artefakt ist ein protokollierter
Grundcode und ein Einspruchsweg mit dokumentierten Ergebnissen. **Nachhaltigkeit** hat eine Zahl:
Die IEA schätzt, dass Rechenzentren 2024 etwa 415 TWh verbrauchten, etwa 1,5 % der globalen
Elektrizität, und prognostiziert etwa 945 TWh bis 2030 [39]. Nicht alles davon ist KI, aber es macht
die Wahl zwischen einem SLM und einem LLM für dieselbe Aufgabe zu einer Governance-Entscheidung mit
einem Datensatz.

> **Beispiel (illustrativ)**
> Ein Prinzip, das von Anfang bis Ende verfolgt wird. OECD 1.3 fordert, dass Personen, die
> nachteilig von einem System betroffen sind, dessen Ausgabe anfechten können. Benannter Schaden:
> Ein Antragsteller, der von `loan-triage-02` abgelehnt wird, kann nicht herausfinden, warum oder es
> anfechten. Kontrolle: Jede nachteilige Entscheidung trägt protokollierte Grundcodes und einen
> Einspruchsweg zu einem Prüfer, der sie rückgängig machen kann. Metrik: Einspruchsvolumen,
> Umkehrungsquote und Zeit bis zur Lösung pro Monat. Evidenz: Das Einspruchsprotokoll, eingereicht
> gegen den Registereintrag und die Modellversion. Verpflichtung, die es unterstützt: KI-Verordnung
> Art. 86, wo zutreffend, DSGVO Art. 22 Schutzmaßnahmen, wenn die Entscheidung vollständig
> automatisiert ist.

### Kompromisse sind Entscheidungen, und Entscheidungen sind Datensätze

Prinzipien kollidieren. NIST nennt die üblichen Kollisionen: Interpretierbarkeit gegen Datenschutz,
Vorhersagegenauigkeit gegen Interpretierbarkeit und Datenschutz-verbessernde Techniken, die
Genauigkeit kosten und damit Fairness, wenn Daten spärlich sind; es fügt hinzu, dass diese
Kompromisse "auf eine Weise gelöst werden sollten, die sowohl transparent als auch angemessen
begründbar ist" [8]. Die technische Lesart ist, dass jeder gelöste Kompromiss ein
Entscheidungsdatensatz mit einem Eigentümer ist, die betrachteten Optionen, die Metrik, die jede
bewegt hätte, und das Datum, an dem sie erneut überprüft wird.

| Spannung | Typischer Fall | Wo die Entscheidung lebt |
|---|---|---|
| Genauigkeit gegen Interpretierbarkeit | Ein Gradient-Boosting-Modell schlägt eine Scorecard um einige Punkte | Modellauswahlprotokoll auf der Model Card mit beiden Eval-Ergebnissen |
| Fairness-Tests gegen Datenschutz | Subgruppen-Evals benötigen die besonderen Kategoriedaten, die das Datenschutzrecht einschränkt | Data Card mit Hinweis auf die Rechtsgrundlage (siehe Art. 4a in [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)), Pseudonymisierung und Löschung |
| Effizienz gegen Menschenzentrierung | Ein Überprüfungsschritt fügt jeder Entscheidung Latenz hinzu | Gate-Platzierungsdatensatz: welche Aktionen gated sind und warum |
| Transparenz gegen Sicherheit | Die Veröffentlichung von Erkennungsregeln hilft Angreifern, sie zu umgehen | Offenlegungsentscheidung: was veröffentlicht wird, was für Prüfer behalten wird |

Ein Kompromiss, den niemand aufgeschrieben hat, wurde trotzdem getroffen; er wurde standardmäßig von
demjenigen getroffen, der zuletzt den Code berührt hat.

> **In der Praxis (illustrativ)**
> Ein Governance-Team erbte eine veröffentlichte "Charta für verantwortungsvolle KI" mit sechs
> Prinzipien und ohne Evidenz hinter einem von ihnen. Anstatt die Charta umzuschreiben, fügte es
> eine Spalte pro Prinzip zur Registrierung hinzu und fragte für jedes Hochrisiko-System, welches
> Artefakt es evidenzierte. Vier von sechs Spalten waren für die meisten Systeme am ersten Tag leer.
> Die leeren Zellen wurden zum Backlog, und die Charta wurde zum ersten Mal auditierbar: Ein Prinzip
> ohne Artefakt wurde als Lücke gemeldet, nicht als Wert.

## Was Sie diese Woche tun können

1. Fügen Sie die acht Scoping-Felder aus diesem Kapitel (`substrate`, `objective`,
   `intended_purpose`, `inference_technique`, `output_types`, `effect_surface`, `autonomy_level`,
   `adapts_in_use`) und ein `definition_decision` mit seinem Grund zu Ihrem Registrierungsschema
   hinzu, und füllen Sie Ihre zehn Systeme mit der höchsten Exposition auf.
2. Schreiben Sie die Out-of-Scope-Entscheidungen auf, die Sie bereits implizit getroffen haben
   (Rules Engines, Dashboards, Baseline-Prognosen), jeweils mit der ausgeschlossenen Familie und dem
   Grund, damit eine spätere Änderung als Diff angezeigt wird.
3. Für ein Vorhersagesystem in der Produktion finden Sie den Entscheidungsschwellenwert, seinen
   Eigentümer und seine letzte Kalibrierungsprüfung. Wenn einer der drei fehlt, fügen Sie eine
   Kalibrierungs-Eval zu seinem Gate hinzu und setzen Sie den Schwellenwert in eine Richtliniendatei
   mit einem Eigentümer.
4. Für ein generatives System führen Sie seine wichtigste Eval fünfmal auf der aktuellen
   Modellversion aus und zeichnen Sie die Erfolgsquote mit den Sampling-Einstellungen auf. Wenn die
   Quote unter dem Boden liegt, den Sie dachten zu haben, haben Sie Ihr erstes echtes Gate gefunden.
5. Nehmen Sie ein Prinzip, das Ihre Organisation veröffentlicht hat, und verfolgen Sie es zu einem
   Artefakt für ein System, indem Sie die obige Tabelle verwenden. Wenn es kein Artefakt gibt,
   zeichnen Sie die Lücke im Risikoregister auf.

**Zuordnung:** EU KI-Verordnung Art. 3(1), 3(63), 3(66) (Definitionen), Art. 14 (menschliche
Aufsicht), Art. 15 (Genauigkeitsmetriken, Feedback-Schleifen), Art. 16(l) (Barrierefreiheit), Art.
50 (Transparenz), Art. 51 (GPAI systemisches Risiko), Art. 86 (Erklärung) · DSGVO Art. 22 · ISO/IEC
22989 · ISO/IEC 42001 · NIST AI RMF (Map, Measure) und NIST AI 600-1 · OECD AI Principles · OWASP
Agentic ASI02/ASI03 · Schichten 01–05. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; first published 6 Feb 2025; not binding; seven elements of Art. 3(1); exclusions at paras 40–51; definition applicable since 2 Feb 2025). European Commission. 2025-07-29. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[2] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; definition revised 8 Nov 2023; principles revised 3 May 2024; principles 1.1–1.5, incl. 1.3(iv) challenge an output and 1.4(b) override, repair, decommission). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[3] Explanatory memorandum on the updated OECD definition of an AI system (2019 and 2023 texts compared; autonomy and adaptiveness explained; not part of the Recommendation). OECD Artificial Intelligence Papers. 2024-03. https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (1) AI system, (3) provider, (4) deployer, (63) general-purpose AI model, (66) general-purpose AI system). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Recital 12 (AI distinguished from simpler traditional software and from rules defined solely by natural persons; inference; machine learning and logic- and knowledge-based approaches; autonomy and adaptiveness; recitals are not reproduced in the consolidated text). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_12 (verified: primary)
[6] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (AI system, term 3.1.4; autonomy and heteronomy, terms 3.1.5 and 3.1.16; clause 5.13 autonomy, heteronomy and automation; clause 5.19 AI stakeholder roles); referenced by identifier only. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[7] ISO/IEC 22989:2022/FDAmd 1, Generative AI (stage 50.00, FDIS registered for formal approval on 2026-09-18; not published as of 2026-09-24). ISO/IEC JTC 1/SC 42. 2026-09-18. https://www.iso.org/standard/88145.html (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (AI system definition; trustworthy characteristics; s. 3.5 transparency, explainability, interpretability; trade-offs; Appendix B, how AI risks differ from traditional software risks). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of interaction with an AI system; machine-readable marking of synthetic audio, image, video and text). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[10] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to clear and meaningful explanations of the role of a high-risk AI system in a decision). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[11] Regulation (EU) 2016/679 (GDPR), Art. 22(1) (right not to be subject to a decision based solely on automated processing, including profiling, with legal or similarly significant effects). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_22 (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15 (15(3) accuracy levels and metrics declared in the instructions for use; 15(4) feedback loops in systems that continue to learn). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[13] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; HITL, HOTL and HIC oversight; requirement 5 includes accessibility and universal design). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[14] "Defeating Nondeterminism in LLM Inference" (1,000 temperature-zero completions of one prompt gave 80 unique outputs; cause traced to lack of batch invariance). Thinking Machines Lab (Horace He et al.). 2025-09-10. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (verified: primary)
[15] Levels of AGI for Operationalizing Progress on the Path to AGI (levels of performance, generality and autonomy) (arXiv 2311.02462). Morris et al.. 2023-11-04. https://arxiv.org/abs/2311.02462 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 51 (classification of GPAI models with systemic risk; 51(2) presumption of high-impact capabilities above 10^25 FLOP of training compute). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_51 (verified: primary)
[17] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (C(2025) 7719 final; first published 18 Jul 2025; para. 17 indicative criterion: training compute above 10^23 FLOP and able to generate language, text-to-image or text-to-video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[18] "Understanding the four types of AI, from reactive robots to self-aware beings" (reactive machines, limited memory, theory of mind, self-awareness). The Conversation (Arend Hintze). 2016-11-14. https://theconversation.com/understanding-the-four-types-of-ai-from-reactive-robots-to-self-aware-beings-67616 (verified: primary)
[19] Concrete Problems in AI Safety (reward hacking among five practical problems) (arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 14 (14(4)(b) automation bias; 14(4)(e) interrupting the system so it comes to a halt in a safe state). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_14 (verified: primary)
[21] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[22] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream) (arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[23] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone) (arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[24] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; provenance as an open problem) (arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[25] Top 10 for Agentic Applications 2026 (ASI01–ASI10 threat catalogue for agentic systems). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[26] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity), Big Data & Society 3(1). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[27] "Dual use of artificial-intelligence-powered drug discovery" (inverted toxicity model generated about 40,000 candidate toxic molecules in under six hours), Nature Machine Intelligence. Urbina, Lentzos, Invernizzi and Ekins (full text on PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[28] Overcoming catastrophic forgetting in neural networks (neural networks lose earlier competence when trained on new tasks; elastic weight consolidation) (arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[29] On Calibration of Modern Neural Networks (modern networks poorly calibrated; temperature scaling), ICML 2017 (arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[30] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage) (arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[31] Recommendation on the Ethics of Artificial Intelligence (adopted by 193 member states, November 2021; four core values; ten principles). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[32] Ethical Impact Assessment: a tool of the Recommendation on the Ethics of AI (ex-ante and ex-post assessment of a system; aimed at procurers of AI systems). UNESCO. 2023-08-28. https://www.unesco.org/en/articles/ethical-impact-assessment-tool-recommendation-ethics-artificial-intelligence (verified: primary)
[33] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), Recital 27 (the seven HLEG principles as non-binding ethical principles complementing the Act). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[35] Hiroshima Process International Guiding Principles for Organizations Developing Advanced AI Systems (welcomed by G7 leaders with a companion Code of Conduct; builds on the OECD AI Principles). European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-guiding-principles-advanced-ai-system (verified: primary)
[36] Hiroshima Process International Guiding Principles, full text of the eleven principles (preamble on human rights, fairness and human-centricity; principle 11 elaboration on data quality against harmful bias). G7 Information Centre (University of Toronto). 2023-10-30. https://g7.utoronto.ca/summit/2023hiroshima/231030-ai-principles.html (verified: secondary)
[37] Hiroshima AI Process (HAIP) Reporting Framework (voluntary reporting against the Code of Conduct; launched February 2025). OECD.AI. 2025-02. https://oecd.ai/en/hiroshima (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16 (provider obligations; 16(l) accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[39] Energy and AI (data centres about 415 TWh in 2024, around 1.5% of global electricity; projected around 945 TWh by 2030). International Energy Agency. 2025. https://www.iea.org/reports/energy-and-ai (verified: primary)
