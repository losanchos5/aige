---
lang: de
source: bok/12-governance-program.md
sourceHash: "460584c50e45544537c593e6d00f037ffa678694b52f0164664a33518e8e400f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 12. Durchführung des KI-Governance-Programms

> Ein KI-Governance-Programm ist die als System verwaltete Organisation: Menschen halten die
> Pflichten, ein Komitee entscheidet, was Gates nicht können, Richtlinien kompilieren sich in Gates,
> und die Evidenz erreicht den Vorstand.

## Die Organisation als Governance-Objekt

Kapitel 01 nennt fünf Governance-Objekte: Modelle, Systeme, Agenten, Daten und die Organisation. Die
ersten vier erhalten die meisten Maschinen dieses Buches. Die fünfte entscheidet, ob diese Maschine
gebaut, finanziert, befolgt oder umgangen wird. "Eine Kontrolle ohne Eigentümer ist keine Kontrolle"
ist eine Aussage über die Organisation, und dieses Kapitel schreibt sie aus: wer welche Pflicht
hält, wo Entscheidungen getroffen werden, wie Richtlinien zu Gates werden, wie Menschen geschult und
gehört werden, und wie die Führung erfährt, ob etwas davon funktioniert.

Eine Regel läuft durch das Kapitel: **Das Komitee entscheidet; die Gates erzwingen.** Menschen
treffen die Entscheidungen, die Urteilskraft erfordern (ist dieser Use Case sein Risiko wert, ist
dieses Restrisiko akzeptabel, ist diese Ausnahme gerechtfertigt). Code erzwingt sie bei jeder
Änderung und hinterlässt die Evidenz. Ein Programm, das dies umkehrt, mit Meetings, die erzwingen,
und Code, der berät, ist das "Risk Review Board"-Antimuster von Kapitel 04: Empfehlung ohne
Konsequenz.

Das Gesetz erwartet bereits, dass die Organisationsschicht entworfen wird. Die EU KI-Verordnung
verlangt von einem Hochrisiko-Anbieter, dass sein Qualitätsmanagementsystem "einen
Rechenschaftsrahmen enthält, der die Verantwortlichkeiten der Geschäftsleitung und anderer
Mitarbeiter festlegt" (`Art. 17(1)(m)`) [1]. ISO/IEC 42001 fordert definierte Rollen,
Verantwortlichkeiten und Befugnisse (Klausel 5.3; Anlage A.3.2) [2], und das NIST AI RMF für
dokumentierte Rollen und Kommunikationswege für KI-Risiken (GOVERN 2.1) [3]. Keiner sagt, wie man
diesen Rahmen an einem Dienstag wahr macht. Das ist die technische Aufgabe.

Dieses Kapitel ist kein GRC-Programmhandbuch und keine Rechtsberatung. Es ist das Betriebsmodell,
das den fünf Schichten von [dem Stack](/bok/the-stack#how-to-read-the-stack) ihre Eigentümer gibt.
Die Risikoschleife ist Kapitel 13
([Wo Risikomanagement sitzt](/bok/risk-management#the-loop-identify-assess-treat-monitor)); die
Kontrollen in jeder Build- und Run-Phase sind Kapitel 14 und 15
([Governance der KI-Entwicklung](/bok/governing-development#the-build-as-a-chain-of-gates),
[Governance der Bereitstellung und Nutzung](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)).

## Die Stakeholder-Karte

Jeder Stakeholder hält eine Pflicht, ein Entscheidungsrecht (oder explizit keines) und ein Artefakt,
das die Pflicht evidenziert. Wenn Sie das Artefakt nicht benennen können, ist die Pflicht noch nicht
real.

| Stakeholder | Pflicht im Programm | Entscheidet | Artefakt, das es besitzt oder unterzeichnet |
|---|---|---|---|
| **Vorstand** (Leitungsorgan) | Legt KI-Risikoappetit fest; überwacht das Programm | Appetitaussage; die KI-Richtlinie | Appetitaussage; Vorstandsprotokolle |
| **Geschäftsführung** | Besitzt KI-Risikoentscheidungen für das Geschäft; finanziert das Programm | Akzeptanz der höchsten Restrisiken | Unterzeichnete Risikoakzeptanzen; Budget |
| **CAIO / CDAO** | Führt KI-Strategie und das Use-Case-Portfolio; leitet das Komitee | Portfolio-Prioritäten | Portfolio; Use-Case-Inventar |
| **KI-Governance-Komitee** | Entscheidet, was Gates nicht können: Restrisiko, Ausnahmen, Wert-Kompromisse | Ausnahmen; ausgelöst Go/No-Go | Entscheidungsdatensätze; Ausnahmeregister |
| **Rechtlich** | Liest Verpflichtungen; bestätigt, dass eine Kontrolle sie erfüllt | Interpretation | Verpflichtungsregister; Vertragsklauseln |
| **Datenschutz / DSB** | Datenschutz durch Technikgestaltung; DSFA; Rechte der betroffenen Personen | DSFA-Beratung und Genehmigung | DSFA; Verzeichnis von Verarbeitungstätigkeiten |
| **CISO / Sicherheit** | KI-Bedrohungsmodell; Sicherheitskontrollen; Incident Response | Sicherheitsausnahmen | Bedrohungsmodelle; Red-Team-Ergebnisse |
| **Risiko** (zweite Linie) | KI-Risikotaxonomie innerhalb ERM; Herausforderung; KRIs | Bewertungsmethode | Risikoregister; KRI-Schwellenwerte |
| **Interne Revision** (dritte Linie) | Unabhängige Assurance über das Programm | Revisionsmeinung | Revisionsberichte; getestete Stichproben |
| **Produkteigentümer** | Verantwortlich für den Use Case, Wert und Risiko eines Systems | Umfang; Startanfrage | Begründungsmemorandum; Registereigentümerfeld |
| **Ingenieurwesen** (ML, Daten, Plattform) | Baut und betreibt das System innerhalb der Gates | Technisches Design | Code; Eval-Ergebnisse; AIBOM |
| **KI-Governance-Engineer** | Baut die Gates, die Registrierung und den Evidenzpfad | Gate-Design | Richtliniencode; Evidenzspeicher |
| **Beschaffung** | KI-Aufnahme für Käufe; Anbieter-Tiering | Anbieter-Genehmigung mit Risiko | Anbieter-Datei; Vertrag |
| **HR** | Arbeitskraft-Literalität; KI in Beschäftigungsentscheidungen; Arbeitnehmerinformation | Personalprozesse | Schulungsunterlagen; Arbeitnehmerbenachrichtigungen |
| **Operatoren und Endbenutzer** | Verwenden Sie Systeme wie angewiesen; üben Sie Aufsicht aus; melden Sie Bedenken | Außerkraftsetzung im Moment | Außerkraftsetzungs- und Eskalationsprotokolle |
| **Betroffene Personen** und Vertreter | Geben Sie Feedback; bestreiten Sie Entscheidungen | Keine formale; eine Stimme | Feedback- und Bestreitungsdatensätze |
| **Anbieter** | Liefern Sie Evidenz; benachrichtigen Sie Änderungen und Vorfälle | Ihr eigenes System | Model Cards; AIBOM; Incident Notices |

Vier Reihen brauchen mehr als eine Zelle.

**Der Vorstand.** Im Three Lines Model des Institute of Internal Auditors ist das Leitungsorgan für
die Aufsicht verantwortlich, das Management trägt die Rollen der ersten und zweiten Linie, und die
interne Revision gibt unabhängige Assurance [4]. Für KI genehmigt der Vorstand Appetit und
Richtlinie und erhält Evidenz; er überprüft keine Use Cases. NIST formuliert die
Geschäftsführungspflicht deutlich: Die Geschäftsleitung "übernimmt die Verantwortung für
Entscheidungen über Risiken, die mit der Entwicklung und Bereitstellung von KI-Systemen verbunden
sind" (GOVERN 2.3) [3]. Ein Vorstand, dem nie angeboten wurde, ein KI-Risiko zu akzeptieren, hat die
Entscheidung nicht delegiert; er hat sie nie gesehen.

**Der CAIO.** Der Chief AI Officer (oder Chief Data and AI Officer) verwaltet das Portfolio: welche
Use Cases die Organisation verfolgt und warum. Das klarste öffentliche Template ist das
US-Bundesmodell: OMB Memorandum M-25-21 vom 3. April 2025 verpflichtete jede Behörde, einen CAIO
innerhalb von 60 Tagen zu benennen, das AI-Use-Case-Inventar zu führen und "einen Prozess für eine
unabhängige Überprüfung von Use Cases mit hoher Auswirkung vor der Risikoakzeptanz" zu etablieren
[5]. Die Lektion überträgt sich: Der CAIO verwaltet das Inventar und den Akzeptanzprozess und
überprüft nicht seine eigenen Use Cases.

**Akteure.** Ein Betreiber eines Hochrisiko-KI-Systems muss "die menschliche Aufsicht natürlichen
Personen zuweisen, die über die erforderliche Kompetenz, Schulung und Befugnis sowie die
erforderliche Unterstützung verfügen" (`Art. 26(2)`) [6]. Kompetenz und Befugnis sind
organisatorische Fakten: ein Schulungsnachweis und ein dokumentiertes Recht, das System zu stoppen
(siehe [Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

**Betroffene Menschen.** Die Menschen, über die ein System entscheidet, sitzen selten im Programm,
daher muss es sie erreichen. Arbeitgeber, die ein Hochrisiko-KI-System am Arbeitsplatz einsetzen,
müssen zunächst Arbeitnehmervertreter und betroffene Arbeitnehmer informieren (`Art. 26(7)`) [6].
NIST fordert Praktiken, die Rückmeldungen von Personen außerhalb des Teams integrieren, das das
System gebaut oder eingesetzt hat (GOVERN 5.1), und Entscheidungen, die von einem vielfältigen Team
getroffen werden (GOVERN 3.1) [3]. Ein Ethikrat oder externes Panel verdient seinen Platz nur, wenn
sein Rat gegen eine Entscheidung dokumentiert und beantwortet wird.

## Eine Lifecycle-RACI

Die RACI sagt, wer in jeder Lifecycle-Phase was tut. **R** führt die Arbeit durch, **A** antwortet
dafür (eine pro Zeile), **C** wird vorher konsultiert, **I** wird nachher informiert.

| Phase | Product Owner | Engineering | KI-Governance-Engineer | Legal & Privacy | Security | Risk | Komitee | Internal Audit |
|---|---|---|---|---|---|---|---|---|
| Intake | A | C | R | C | C | C | I (C falls ausgelöst) | I |
| Design | A | R | C | C | C | I | I | I |
| Daten | A | R | C | R | I | I | I | I |
| Build | A | R | C | I | C | I | I | I |
| Test | A | R | R | I | R | C | I | I |
| Release | A (Komitee falls ausgelöst) | R | R | C | C | C | C | I |
| Betrieb | A | R | R | I | R | C | I | I |
| Änderung | A | R | R | C | C | I | I | I |
| Außerbetriebnahme | A | R | R | C | C | I | I | I |

Drei Regeln halten die Tabelle ehrlich. Der Product Owner ist in jeder Phase verantwortlich, denn
Verantwortung, die sich zwischen Funktionen verschiebt, während ein System reift, ist die Lücke,
durch die Vorfälle fallen. Internal Audit wird überall informiert und ist nirgends verantwortlich;
sobald es eine First- oder Second-Line-Aufgabe ausführt, kann es diese Aufgabe nicht mehr unabhängig
prüfen [4]. Das Komitee hält die Verantwortung nur für ausgelöste Use Cases, damit es nicht zum
Engpass für gewöhnliche wird.

Eine RACI in einer Folie ist eine Behauptung. Kompilieren Sie sie stattdessen: eine `raci.yaml`
ordnet Phasen Rollen zu, jeder Registry-Eintrag benennt die Personen, die diese Rollen für dieses
System innehaben, und die Pipeline liest beide. Ein Release ohne benannten Product Owner schlägt bei
der Zulassung fehl; ein Pull Request, der eine Policy ändert, benötigt die Überprüfung durch seinen
Owner (eine Code-Owners-Regel, die aus derselben Datei generiert wird). Das Verantwortungsrahmenwerk
von `Art. 17(1)(m)` wird zu einer Datei, die Sie diff-en können [1].

## Das Komitee entscheidet, die Gates erzwingen

Komitees haben in diesem Buch einen schlechten Ruf, und Kapitel 04 verdient ihn: ein Board, das
Erkenntnisse monatlich bewertet, ohne die Macht zu haben, einen Launch zu stoppen, ist Theater. Aber
einige Entscheidungen können nicht automatisiert werden, und so zu tun, als ob, versteckt sie in
Pipeline-Konfiguration, die niemand überprüft. Das Komitee ist legitim, wo es diese Entscheidungen
trifft, und nur dort.

### Wofür das Komitee zuständig ist

Vier Arten von Entscheidungen. **Risikoakzeptanz**: ob ein Restrisiko über der Befugnis des Product
Owners akzeptabel ist, für wie lange und unter welchen kompensierenden Kontrollen. **Ausnahmen**: ob
ein System fortfahren darf, während es eine benannte Regel nicht erfüllt. **Wertabwägungen**: ob ein
Nutzen ein Risiko rechtfertigt, das keine Schwelle bepreisen kann (eine rechtsbetreffende
Entscheidung, eine vulnerable Population). **Policy**: Genehmigung des Policy-Sets und seiner
wesentlichen Änderungen. Es überprüft nicht jeden Release, schreibt keine Kontrollen oder führt
Evals durch; Gates und Teams tun das.

### Charter und Mitgliedschaft

Eine ein- oder zweiseitige Charter legt Zweck, Entscheidungsrechte, Quorum, Mitgliedschaft, Kadenz,
Eskalation, wie Entscheidungen dokumentiert werden und wie die Charter sich ändert, fest. Ein
funktionierender Kern ist der CAIO oder ein Delegierter (Vorsitzender), Legal, Privacy, Security,
Risk, ein Senior Engineering Lead und ein oder zwei Product Leader, mit HR und Procurement für ihre
Fälle und Internal Audit als nicht stimmberechtigter Beobachter. Für Breite forderte M-25-21 die
AI-Governance-Boards der größten (CFO Act) Behörden auf, IT, Cybersecurity, Daten, Budget, Legal,
Privacy, Civil Rights und Civil Liberties einzubeziehen und externe Experten nach Bedarf zu
konsultieren [5].

### Beratend oder bindend

Ein beratendes Komitee empfiehlt und ein benannter Executive entscheidet; ein bindendes Komitee
entscheidet innerhalb seiner Charter. Beides funktioniert, wenn die Charter sagt, welches, pro
Entscheidungstyp. Was fehlschlägt, ist Mehrdeutigkeit: ein Komitee, das glaubt, einen Launch
genehmigt zu haben, und ein Product Owner, der glaubt, es habe nur kommentiert. Eine häufige
Aufteilung ist bindend bei Ausnahmen und ausgelösten Use Cases, beratend bei Strategie.

### Risikoakzeptanz und Ausnahmen

Restrisiko wird von jemandem mit der Befugnis, es zu tragen, für eine begrenzte Zeit akzeptiert.
Eine Akzeptanzmatrix macht das explizit, unter Verwendung der Bewertungen aus Kapitel 13
(Schwellwerte illustrativ):

| Restrisiko | Wer darf akzeptieren | Maximale Gültigkeit | Erforderliche Evidenz |
|---|---|---|---|
| Niedrig | Product Owner | 12 Monate | Registry-Eintrag; bestandene Gates |
| Mittel | Product Owner + Risk-Funktion | 6 Monate | Kompensierende Kontrollen benannt |
| Hoch | AI-Governance-Komitee | 3 Monate | Entscheidungsprotokoll; Überwachungsplan |
| Über Appetit | Geschäftsführung, dem Board gemeldet | 3 Monate | Board-Benachrichtigung |
| Verbotene Nutzung | Niemand | Nicht zutreffend | Bei Intake blockiert |

Eine Ausnahme ist eine Risikoakzeptanz für eine Regel auf einem System. Sie gehört als Daten ins
Policy-Repository, nicht in Protokolle. Ein Datensatz (illustrativ):

```yaml
exception:
  id: EXC-2026-014
  rule_id: eval.injection-floor.v4
  system: csa-01
  requested_by: team-support-platform
  justification: "Vendor model update lowered injection resistance; fix scheduled"
  compensating_controls:
    - guardrail.input.injection.v3 in block mode
    - human approval for refunds above the tier-2 limit
  residual_risk: high
  decision_record: DEC-2026-051
  approved_by: ai-governance-committee
  expires: 2026-10-31T23:59:59Z
```

Das Gate liest das Register. Während die Ausnahme aktiv ist, gibt die Regel `allow` mit der
Ausnahme-ID in ihrem Urteil zurück, sodass die Evidenz zeigt, dass der Release *unter einer
Ausnahme* bestanden hat. Wenn sie abläuft, schlägt dieselbe Regel den Build wieder fehl, ohne dass
jemand sich erinnern muss. Offene Ausnahmen nach Alter werden zu einem Board-Indikator.

### Eskalation, Trigger und Kadenz

Die meisten Use Cases erreichen das Komitee nie; sie passieren
[Intake, erhalten ein Tier](/patterns/use-case-intake-risk-tiering) und gehen durch die Gates.
Review-Trigger leiten den Rest:

- eine Entscheidung mit rechtlicher oder ähnlich erheblicher Auswirkung auf eine Person (Kredit,
  Beschäftigung, Versicherung, Wohnung, Bildung, öffentliche Dienste);
- biometrische Identifizierung oder Kategorisierung, Emotionserkennung oder Daten besonderer
  Kategorien;
- Kinder oder andere vulnerable Menschen als Nutzer oder Subjekte;
- ein Agent mit Schreibzugriff auf Geld, Kundendatensätze oder Produktionsinfrastruktur;
- Ausgaben, die nicht gut genug erklärt werden können, damit die Menschen, die auf ihnen handeln
  müssen, sie verstehen;
- jede Ausnahmeanfrage mit hoher oder höherer Bewertung.

Ausnahmen und ausgelöste Fälle benötigen ein Service Level (zum Beispiel eine Entscheidung innerhalb
von zehn Arbeitstagen) und einen asynchronen Pfad; ein monatliches Treffen würde Governance zum
langsamsten Schritt in der Lieferung machen. Policy-Genehmigungen können monatlich sein und der
Board-Bericht vierteljährlich. Eskalation läuft Product Owner, Komitee, Executive, Board, mit dem
Trigger für jeden Hop in der Charter geschrieben.

> **In der Praxis (illustrativ)**
> Bei einem großen Telekommunikationsunternehmen debattierten die ersten Meetings des Komitees
> einzelne Releases. Das Verschieben von Ausnahmen in ein Register, das die Gates lesen, änderte
> seine Aufgabe. Ingenieure reichten Anfragen als Pull Requests ein; das Komitee entschied innerhalb
> des Service Levels; das Gate erzwang den Ablauf. Meetings schrumpften auf ausgelöste Use Cases und
> den Trend bei offenen Ausnahmen, und ein Auditor konnte mit einer Abfrage jeden Release auflisten,
> der unter einer Ausnahme ausgeliefert wurde.

## Enterprise-Risiko, die drei Linien und Internal Audit

### AI-Risiko im Enterprise-Risk-Register

AI-Risiko gehört ins Enterprise-Risk-Register unter demselben Appetit, derselben Bewertungsskala und
Berichtslinie wie jedes andere Risiko, mit AI-Kategorien darunter (Schaden für Menschen, rechtliche
Exposition, Security, Zuverlässigkeit, Dritte). ISO/IEC 23894 passt den ISO-31000-Risikoprozess an
AI an und ist die natürliche Brücke [7]. Generieren Sie die Enterprise-Ansicht aus der
System-Ansicht: jeder Registry-Eintrag trägt seine Bewertungen und verknüpften Kontrollen, und das
Register rollt sie nach Kategorie und Business Unit auf. Der Link läuft in beide Richtungen, sodass
eine Änderung des Appetits Tier-Regeln und Gate-Schwellwerte ändert.

### Die drei Linien, angewendet auf AI

| Linie | Wer | AI-Aufgaben | Evidenz, die sie produziert |
|---|---|---|---|
| Erste | Product Owner, Engineering, Akteure | Systeme innerhalb der Gates bauen und betreiben; ihre Risiken tragen | Registry-Einträge; Eval-Ergebnisse; Runtime-Logs |
| Zweite | Risk, Compliance, Privacy, Security, AI Governance | Methode und Policy setzen; den gepflasterten Weg bauen; First-Line-Bewertungen hinterfragen | Policies als Code; KRI-Schwellwerte; Review-Protokolle |
| Dritte | Internal Audit | Unabhängige Assurance zum Design und Betrieb von Kontrollen | Revisionsberichte; getestete Stichproben |

Der KI-Governance-Engineer sitzt normalerweise in der zweiten Linie und baut Tools, die die erste
Linie ausführt. Das Modell beschreibt Rollen, nicht Boxen auf einem Organigramm; was zählt, ist,
dass die dritte Linie unabhängig von dem bleibt, das sie assuriert [4].

### Was Internal Audit testet

ISO/IEC 42001 fordert interne Audits des Managementsystems (Klausel 9.2) [2]. Sie sollten die Gates
testen, nicht die Dokumente darüber. **Nachvollziehung**: führen Sie die Policy-Entscheidung für
eine zufällige Stichprobe von Releases aus den gespeicherten Eingaben erneut durch; das Urteil
sollte der Evidenz entsprechen. **Bypass-Jagd**: vergleichen Sie, was Discovery laufend mit dem
Register findet, und Deployments mit Gate-Urteilen; ein Deploy ohne Urteil ist ein Finding.
**Ausnahmehygiene**: Stichprobe von Ausnahmen auf einen benannten Genehmiger, einen Ablauf und
kompensierende Kontrollen, die tatsächlich liefen. Tabletop-Übungen (ein simuliertes schwerwiegendes
Ereignis, ein Vendor-Modell, das über Nacht zurückgezogen wird) testen die Entscheidungspfade, die
keine Pipeline-Übungen ausüben.

**Zuordnung:** KI-Verordnung `Art. 17(1)(m)` (Rechenschaftsrahmen), `Art. 26(2)` und `Art. 26(7)`
(Aufsichtskompetenz; Arbeitnehmer informieren) · ISO/IEC 42001 Klauseln 5.1–5.3, 9.2; Anlage A.2,
A.3 · NIST AI RMF GOVERN 2, 3, 5 · Schichten 1 Governance-as-Code und 5 Assurance & Continuous
Compliance. Zuordnungen sind illustrativ, keine Konformitätsbehauptung.

## KI-Kompetenz als Code

### Was Artikel 4 nach dem Digital-Omnibus fordert

Article 4 of the EU AI Act has applied since 2 February 2025. As amended by Regulation (EU) 2026/1744,
in force since 27 July 2026, it requires providers and deployers to "take measures to support the
development of AI literacy" of their staff and others operating AI systems on their behalf, and adds
that this "does not require providers or deployers to guarantee any specific level of AI literacy of
any individual" [8][9]. The Commission's Q&A (updated 27 July 2026) says the obligation remains with
no "sufficient" level mandated; no certificate is needed and an internal record of trainings will do;
"other persons" include contractors, service providers and clients; the instructions for use alone
are not enough; and national market-surveillance authorities supervise the rule from 2 August 2026
[10]. That is the position as of 2026-09-24.

Die weichere Formulierung ist kein Grund, weniger zu tun. Für Betreiber mit hohem Risiko sitzt die
schwierigere Pflicht in `Art. 26(2)`: Die Aufsicht geht an Personen mit der Kompetenz, Schulung und
Autorität, um sie auszuüben [6]. NIST erwartet KI-Risikoschulung, die auf die Aufgaben jeder Person
zugeschnitten ist (GOVERN 2.2) [3], und ISO/IEC 42001 behandelt Kompetenz und Bewusstsein in den
Klauseln 7.2 und 7.3 [2]. Die technische Antwort auf alle drei ist Kompetenz als rollenbasiertes
System mit Aufzeichnungen, nicht eine jährliche Folienpräsentation.

### Rollenbasierte Lehrpläne

| Persona | Muss in der Lage sein zu | Lehrplanblöcke | Auffrischungsauslöser |
|---|---|---|---|
| Vorstand und Geschäftsführung | Risikobereitschaft festlegen; das KPI-/KRI-Paket lesen; Risiko akzeptieren oder ablehnen | Terminologie; Strategie und Risikobereitschaft; Anbieter- oder Betreiberrolle | Neues Gesetz; großer Vorfall |
| Produktverantwortliche | Ein Begründungsmemorandum schreiben; einen Anwendungsfall einordnen; Restrisiko tragen | Aufnahme und Auslöser; Risikomethode; Richtlinien nach Phase | Richtlinienänderung |
| Ingenieure und Datenwissenschaftler | Innerhalb der Gates bauen; ein Eval-Ergebnis lesen; eine Ausnahme einreichen | Gepflasterter Pfad; Evals; Datenbeschaffung; Incident-Aufgaben | Neues Gate oder Werkzeug |
| Recht, Datenschutz, Compliance | Eine Verpflichtung in eine Regel und zurück übersetzen | Der Stack; Nachweisformate; Systemverhalten | Neue Verpflichtung |
| Operatoren mit Aufsichtspflichten | Ausgaben lesen; überschreiben, stoppen, eskalieren | Das spezifische System; Automatisierungsbias; Überschreibungsübung auf der echten Schnittstelle | Neue Modellversion |
| Alle Mitarbeiter, die KI-Tools verwenden | Genehmigte Tools auf zulässigen Daten verwenden; Bedenken melden | Akzeptable Nutzung; Datenklassen; der Bedenkenkanal | Jährlich; neues Tool |
| Beschaffung und Personalwesen | KI in einem Kauf erkennen; KI in Personalentscheidungen handhaben | Aufnahmeflagge; Anbieterklassifizierung; Beschäftigungsregeln | Vorlagenänderung |

Formate folgen der Persona: Szenariobriefings für den Vorstand, Labs für Ingenieure, Simulationen
für Operatoren, Microlearning mit Attestation für alle anderen.

### Schulungsaufzeichnungen und Attestation als Zugriffsbedingung

Ein Schulungsnachweis ist Beweis, wenn er strukturiert, an ein System gebunden und in der Lage ist,
abzulaufen (illustrativ):

```json
{ "person": "u-48213", "role": "operator.credit-review",
  "module": "oversight.credit-scorer.v3", "completed": "2026-09-12",
  "assessment": "pass", "systems": ["credit-scorer-02"],
  "expires": "2027-09-12T00:00:00Z", "attested": true }
```

Er wird zu einer Kontrolle, wenn der Zugriff davon abhängt. Der Identitätsanbieter oder das
KI-Gateway fragt die Richtlinien-Engine ab, bevor der Zugriff gewährt wird (illustrativ `OPA/Rego`):

```rego
package access.ai_tools

import rego.v1

default allow := false

allow if {
  some r in data.training_records[input.user]
  r.module == data.required_module[input.tool]
  r.attested
  time.parse_rfc3339_ns(r.expires) > time.now_ns()
}
```

Ein Operator, dessen Modul abgelaufen ist, verliert die Override-Konsole, nicht nur eine Zeile in
einem Bericht; eine neue Modellversion erhöht das erforderliche Modul, sodass Operatoren umschulen,
bevor sie es anfassen. Der Nachweis ist `Art. 4` Beweis, die Zugriffsentscheidung ist `Art. 26(2)`
Beweis, und beide landen ohne einen Sammelspurt im Nachweisspeicher.

### Messung und Auffrischung der Kompetenz

Abschlussquoten messen die Teilnahme. Bessere Indikatoren sind die Abdeckung nach Persona, die Zeit
vom Beitritt (oder von einer neuen Modellversion) bis zu einem aktuellen Datensatz und
Ergebnissignale: Überschreibungsquoten der Akteure und Zeit bis zur Entscheidung
(Überwachungsmetriken aus Kapitel 04), der Anteil der Ausnahmeanfragen, die wohlgeformt eingehen,
Bedenken pro Team. Aktualisierung bei Ereignissen (ein neues Gesetz, eine Fähigkeit, ein Vorfall
oder ein Werkzeug) sowie nach dem Kalender.

## Governance-Kultur

Kontrollen schlagen fehl, wenn Menschen sie umgehen; Kultur ist, ob sie das tun. Drei Hebel liegen
in der Reichweite einer Governance-Funktion.

**Champions.** Ein benannter Champion in jedem Produktteam, tiefer geschult, beantwortet erste
Fragen und führt erste Überprüfungen von Intakes durch. Champions skalieren die zweite Linie ohne
Personalaufstockung und bringen den gepflasterten Weg in Teams, die Governance sonst nur als
blockiertes Build treffen
([den verwalteten Weg zum einfachsten Weg machen](/bok/values-and-principles#make-the-governed-path-the-easiest-path)).

**Anreize.** Messen Sie Teams an Releases über den gepflasterten Weg, Ausnahmen, die vor Ablauf
geschlossen werden, und Bedenken, die aufgeworfen und gelöst werden, niemals an null Vorfällen, was
Stille belohnt. NIST fordert eine kritisch denkende, sicherheitsorientierte Mentalität und
Praktiken, die Tests, Vorfallidentifikation und Informationsaustausch ermöglichen (GOVERN 4.1, 4.3)
[3]; Anreize sind, wie diese Mentalität eine Frist übersteht.

**Blameless Review.** Nach einem KI-Vorfall oder Beinaheunfall das System überprüfen, nicht die
Person. Googles SRE-Praxis definiert eine blameless postmortem als eine, die sich "auf die
Identifizierung der Ursachen des Vorfalls konzentriert, ohne eine Person oder ein Team für
schlechtes oder unangemessenes Verhalten anzuklagen" [11]. Ihre technische Ausgabe ist ein
geändertes Gate, eine Eval oder eine Richtlinie, eingereicht als Pull Request mit Verweis auf die
Überprüfung. Eine steigende Anzahl gemeldeter Beinaheunfälle ist normalerweise gute Nachricht: die
Alternative ist weniger Berichte, nicht weniger Ausfälle.

## Ein Kanal zum Äußern von Bedenken

Pipelines erfassen, was sie sehen sollen. Ein Datenwissenschaftler, der vermutet, dass eine
Benchmark manipuliert wurde, ein Akteur, der ein Muster schädlicher Ausgaben sieht, ein Ingenieur,
dem aufgetragen wird, einen Guardrail vor einer Demo zu deaktivieren: Diese erreichen das Programm
nur, wenn Menschen sie sicher äußern können, außerhalb der Befehlskette, die das Problem verursacht
hat. Das Gesetz erwartet jetzt solche Kanäle (ab 2026-09-24):

| Regelwerk | Wer handeln muss | Was es erfordert |
|---|---|---|
| KI-Verordnung der EU `Art. 87` mit Richtlinie (EU) 2019/1937 [12][13] | Private juristische Personen mit 50 oder mehr Arbeitnehmern, durch nationales Umsetzungsgesetz | Interne Kanäle und Nachverfolgung (Art. 8); Bestätigung innerhalb von sieben Tagen und Rückmeldung innerhalb von drei Monaten (Art. 9(1)(b), (f)); kein Vergeltungsmaßnahmen (Art. 19) |
| California SB 53, Labor Code §1107.1 [14][15] | Frontier-Entwickler; die interne Prozesspflicht bindet große Frontier-Entwickler | Keine Regel, die betroffene Arbeitnehmer daran hindert, dem Generalstaatsanwalt oder anderen Behörden Bericht zu erstatten; kein Vergeltungsmaßnahmen; Mitteilung der Rechte; ein anonymer interner Prozess mit monatlichen Aktualisierungen für den Melder, geteilt mit Beamten und Direktoren mindestens vierteljährlich |
| ISO/IEC 42001 Annex A.3.3 [2] | Organisationen, die den Standard implementieren (freiwillig) | Ein Prozess zur Meldung von Bedenken zu KI-Systemen |

Artikel 87 wendet die Whistleblower-Richtlinie auf Berichte über KI-Verordnungsverstöße ab 2. August
2026 an [12]. SB 53, seit 1. Januar 2026 in Kraft, schützt "betroffene Arbeitnehmer" (diejenigen,
die für die Bewertung, Verwaltung oder Adressierung des Risikos kritischer Sicherheitsvorfälle
verantwortlich sind), die offenbaren, dass die Aktivitäten eines Frontier-Entwicklers "eine
spezifische und erhebliche Gefahr für die öffentliche Gesundheit oder Sicherheit aufgrund eines
katastrophalen Risikos" darstellen oder gegen das Gesetz verstoßen [14][15].

Bauen Sie den Kanal wie jedes verwaltete System auf. Intake akzeptiert anonyme und benannte Berichte
über mehr als eine Route. Jeder Bericht wird zu einem Fallbestand mit den gesetzlichen Uhren als
Timer, nicht als Erinnerungen, kodiert. Triage leitet einen möglichen Vorfall zur
[Incident Pipeline](/patterns/incident-pipeline), einen möglichen Verstoß an die Rechtsabteilung,
eine Richtlinienlücke an den Ausschuss. Die Identität des Melders ist von den benannten Personen
versiegelt, und HR beobachtet Vergeltungssignale (plötzliche Leistungsmaßnahmen, Zugriffänderungen)
um geschützte Melder. Volumen, Uhrenkonformität und Ergebnisse gehen nach oben ohne Identitäten.
Dies skizziert die Technik; es ist keine Beratung zu einem nationalen Umsetzungsgesetz.

## KPIs und KRIs für Führung und Vorstand

Die Führung benötigt einige wenige Indikatoren, denen sie vertrauen kann, berechnet aus
Live-Systemen statt selbst gemeldet. Ein **KPI** sagt, ob das Programm seine Aufgabe erfüllt; ein
**KRI** sagt, ob das Risiko sich dem Rand des Appetits nähert.

| Indikator | Typ | Definition | Produziert von |
|---|---|---|---|
| Registry-Abdeckung | KPI | Anteil der entdeckten KI-Systeme und Agenten mit einem Registry-Eintrag und einem Besitzer | Schicht 02; [Shadow-AI Discovery](/patterns/shadow-ai-discovery) |
| Unregistrierte KI gefunden | KRI | Anzahl der laufenden KI ohne Eintrag, nach Tier | Schicht 02 Discovery |
| Gate-Abdeckung | KPI | Anteil der Produktionsfreigaben, die ein Eval Gate durchlaufen haben | Schicht 03 |
| Offene Ausnahmen nach Alter | KRI | Live-Ausnahmen, älteste zuerst; abgelaufene gekennzeichnet | Ausnahmeregister (Schicht 01) |
| Zeit bis zur Entscheidung | KPI | Medianage von Tagen von Intake bis Go/No-Go, nach Tier | Intake-Workflow |
| Bewertungen aktuell | KPI | Hochrisiko-Systeme mit einer aktuellen FRIA oder DSFA | Schicht 02 |
| Vorfälle und Zeit bis zur Eindämmung | KRI | KI-Vorfälle nach Schweregrad; Medianzeit bis Erkennung und Eindämmung | Layers 04 and 05 |
| Oversight quality | KRI | Override rate and time-to-decide at human checkpoints | Layer 04 |
| Literacy coverage | KPI | Share of each persona with a current training record | Training records |
| Concern clocks met | KPI | Reports acknowledged within seven days and answered within three months | Concern channel |
| Vendor reassessments overdue | KRI | Tier-1 vendors past their reassessment date | Procurement file |
| Realised risk reduction | KPI | Change in the rate of named failure modes in production | Layer 05 |

The last row matters most and is hardest to fill, which is why it belongs in the board pack from the
start ([value
7](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage)).
Coverage indicators are inputs; chapter 07 ([metrics per level](/bok/maturity-model#metrics-per-level))
shows the engineering metrics beneath them. The board pack is one page: trends for six to eight
indicators, anything outside threshold, decisions the board must take, exceptions above appetite. A
query generates it; a hand-assembled pack drifts from the systems it describes.

## Management review and continual improvement

A management system improves only if someone looks at the evidence on a schedule and changes
something. ISO/IEC 42001 asks for monitoring and measurement, internal audit and management review
(clauses 9.1 to 9.3) and for continual improvement with corrective action (clauses 10.1 and 10.2); read
the standard for the required inputs and outputs [2]. One review can serve several management systems
([integrating ISO/IEC 42001 with 27001, 27701 and 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001),
chapter 22). NIST asks for planned periodic review of the risk
process, with roles and frequency defined (GOVERN 1.5) [3].

Gestalten Sie die Überprüfung so, dass sie Änderungen hervorbringt, nicht Protokolle. Eingaben: das
KPI/KRI-Paket, Audit-Feststellungen, Vorfälle und Beinahe-Unfälle, Bedenken, Änderungen in Gesetzen
und Standards, offene Korrekturmaßnahmen. Ausgaben, als Daten erfasst: ein Policy-Diff mit
Gültigkeitsdatum, eine Schwellenwertänderung, eine Ressourcenentscheidung, eine Korrekturmaßnahme
mit Verantwortlichem und Fälligkeitsdatum. Verfolgen Sie Korrekturmaßnahmen so, wie `OSCAL` einen
Maßnahmen- und Meilenstein-Plan verfolgt (Kapitel 04), sodass jede Überprüfung damit beginnt, was
versprochen und was getan wurde. Eine Überprüfung, die zwei Zyklen lang nichts ändert, bedeutet,
dass die Evidenz sie nicht erreicht oder nicht geglaubt wird.

**Zuordnung:** EU AI Act `Art. 4` (KI-Kompetenz), `Art. 26(2)` (Aufsichtskompetenz), `Art. 87`
(Meldung von Verstößen) · Richtlinie (EU) 2019/1937 · California SB 53 (Labor Code §1107.1) ·
ISO/IEC 42001 Klauseln 7.2–7.3, 9.1–9.3, 10.1–10.2; Anlage A.3.3 · NIST AI RMF GOVERN 1.5, 2.2, 4 ·
Schichten 1 Governance-as-Code und 5 kontinuierliche Assurance.

## Strategie, Wert und ob KI überhaupt verwendet werden soll

Governance beginnt normalerweise, nachdem jemand beschlossen hat zu bauen. Sie sollte einen Schritt
früher beginnen. Das NIST AI RMF erwartet, dass die Ziele für KI und der geschäftliche Wert jeder
Verwendung dokumentiert werden (MAP 1.3, 1.4), dass Vorteile und Kosten untersucht werden,
einschließlich der nicht-monetären Kosten von Fehlern (MAP 3.1, 3.2), und nach der Kartierung eine
"anfängliche Go/No-Go-Entscheidung darüber, ob ein KI-System entworfen, entwickelt oder
bereitgestellt werden soll"; später wird erneut gefragt, ob die Entwicklung oder Bereitstellung
fortgesetzt werden sollte (MANAGE 1.1) [3].

Machen Sie die Frage zu einem erforderlichen Feld. Ein Begründungsschreiben bei der Aufnahme
(illustrativ):

```yaml
use_case: refund-triage-assistant
owner: team-support-platform
problem: "Refund requests wait days for a first answer"
non_ai_alternative: "Rules engine plus extra staff at peak"
why_ai: "Free-text requests; the rules engine misroutes a large share"
benefit_metric: "Median time to first answer"
who_bears_errors: "Customers wrongly refused a refund"
contest_route: "Human review on request, within two working days"
reversible: true
kill_criteria: "Wrong-refusal rate above the tier threshold for two weeks"
```

Fünf Fragen entscheiden die meisten Fälle. Gibt es eine Nicht-KI-Alternative zu akzeptablen Kosten?
Kann der Nutzen gemessen werden, und von wem? Wer trägt die Fehler, und können sie diese anfechten?
Ist die Entscheidung umkehrbar? Was würde uns zum Stoppen bringen? Ein Use-Case, der die letzte
Frage nicht beantworten kann, ist nicht bereit für ein Gate, da es keinen Schwellenwert gibt, den
man durchsetzen kann.

Zusammengefasst sind die Schreiben das KI-Portfolio: wo die Organisation ausgibt, welche Risiken sie
trägt, welche Vorteile sie gemessen hat. Sie beantworten auch den Vorwurf, dass Governance nur die
Dinge verlangsamt. "Time to Decision" ist ein Programm-KPI, und ein gepflasterter Weg, der einen
risikoarmen Use-Case in Tagen von der Aufnahme bis zur Produktion führt, ist wie Governance die
Lieferung ermöglicht, anstatt sie zu belasten.

## Ein Programm ohne Engineering-Kapazität aufbauen

Viele Organisationen, die ein Programm benötigen, bauen überhaupt keine KI; sie kaufen sie. Die
Engineering-First-Route von Kapitel 04
([der minimale lebensfähige Stack für ein Team von eins](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one))
setzt eine Pipeline voraus, um Gates einzubauen. Ein Käufer hat immer noch Pipelines: Beschaffung,
Identität und Ausgaben. Bauen Sie darauf auf.

| Säule | Minimales Artefakt | Durchgesetzt durch |
|---|---|---|
| Charta und Umfang | Programmcharta; Komiteecharta | Genehmigung des Executive Sponsor |
| Bestand | Register mit Eigentümer, Anbieter, Datenklassen und Stufe | Beschaffungsaufnahme; Single-Sign-On-App-Katalog; Ausgabenprüfung |
| Richtliniensatz | Akzeptable Nutzung; KI-Aufnahme; KI von Drittanbietern | Kaufgenehmigung; Gateway- oder Browser-Steuerelemente |
| Rollen | Benannter Eigentümer pro System; Komiteemitgliedschaft | Erforderliches Registerfeld |
| Kompetenz | Rollenbasierte Module; Schulungsunterlagen | Werkzeugzugriff abhängig von Bestätigung |
| Metriken | Fünf Indikatoren aus der obigen Tabelle | Monatliche Abfrage über Register- und Beschaffungsdaten |
| Überprüfungshäufigkeit | Vierteljährliche Managementüberprüfung | Entscheidungen als Daten erfasst |

Die ersten 90 Tage: Charta, Komitee, Richtlinie für akzeptable Nutzung und ein Bestand aus
Beschaffung und dem Sign-on-Katalog (Tage 1 bis 30); das KI-Flag in Kaufanfragen, Staffelung dessen,
was bereits gekauft wurde, Module für Betreiber der riskantesten Systeme (Tage 31 bis 60); das erste
KPI-Paket, die erste Managementüberprüfung und eine Entscheidung darüber, welche Kontrolle zuerst
automatisiert werden soll (Tage 61 bis 90). Die Fragen und Antworten der Kommission stellen fest,
dass Artikel 4 keine spezifische Governance-Struktur vorschreibt [10]; dimensionieren Sie das
Programm auf das, was die Organisation betreibt, und wachsen Sie den Code mit dem Portfolio. Kapitel
13 legt fest, wie viel der Risiko-Loop jede Art von Organisation durchläuft
([proportionale Governance](/bok/risk-management#proportionate-governance-tailoring-the-loop)), und
die Vorlagenseite hat
Starter-[Komitee-, RACI- und KI-Richtliniensektionen](/resources/templates#tpl-kit).
## Richtlinien über den Lebenszyklus

### Richtlinie, Standard, Verfahren, Code

Richtliniendokumente scheitern daran, dass sie zu vage sind, um durchgesetzt zu werden, oder zu
detailliert, um aktuell zu bleiben. Eine vierstufige Hierarchie gibt jeder Stufe eine Aufgabe.

| Stufe | Antwortet | Genehmigt durch | Änderungen | Beispiel |
|---|---|---|---|---|
| Richtlinie | Warum und was: Prinzipien, Appetit, Umfang | Vorstand oder Komitee | Selten | "Kein KI-System erreicht die Produktion ohne einen Eigentümer und ein bestandenes Eval-Gate." |
| Standard | Messbare Anforderungen pro Stufe | Komitee oder Delegierter | Vierteljährlich | "Systeme der Stufe 2 und 3 erzielen mindestens 0,95 in der Injection-Suite." |
| Verfahren | Wie, Schritt für Schritt | Funktionseigentümer | Nach Bedarf | "Führen Sie das Gate lokal aus; fügen Sie das Ergebnis zum Registereintrag an." |
| Richtlinie als Code | Die durchgesetzte Regel | Code-Review mit dem Richtlinieneigentümer | Jede Änderung ist ein Pull Request | `eval.injection-floor.v4` |

ISO/IEC 42001 fordert eine KI-Richtlinie (Klausel 5.2) und hat Kontrollen über Richtlinien im
Zusammenhang mit KI (Anlage A.2) [2]; NIST fordert, dass KI-Risiko-Richtlinien und -Verfahren
vorhanden, transparent und wirksam umgesetzt werden (GOVERN 1) [3]. Die Hierarchie fügt eine
Engineering-Regel hinzu: jede Regel im Code trägt die IDs des Standards und der Richtlinie, die sie
implementiert, sodass ein Leser von einem fehlgeschlagenen Build zum Satz gehen kann, den der
Vorstand genehmigt hat.

### Was Richtlinie in jeder Phase erfordert

Jede Phase hat eine Mindestanforderung, ein Gate, das sie durchsetzt, und die Evidenz, die sie
hinterlässt. Die Kapitel 14 und 15 behandeln die Build- und Run-Phasen ausführlich.

| Phase | Richtlinie erfordert | Gate, das es durchsetzt | Evidenz | Schicht |
|---|---|---|---|---|
| Intake | Begründungsschreiben; Risikostufe; Bildschirm für verbotene Nutzung; Überprüfungsauslöser | Aufnahme schreibt einen Registerstub; kein Stub, keine Bereitstellung | Registereintrag; Stufeneintrag | 1 · 2 |
| Design | [Bedrohungsmodell](/patterns/ai-threat-model); Aufsichtsdesign; Folgenabschätzung bei Auslösung | Design-Review als erforderliche Prüfung | Bedrohungsmodell; FRIA/DPIA-Referenz | 1 · 3 |
| Daten | Akquisitionseintrag; rechtmäßige Grundlage; Lizenz; Qualitäts- und Bias-Prüfungen | [Pipeline lehnt einen Datensatz ohne gültige Data Card ab](/patterns/dataset-admission-gate) | Data Card; Herkunft | 2 · 3 |
| Build | Genehmigte Modelle und Plattformen; versionierte Prompts, Abruf und Tools; AIBOM | CI-Richtlinienprüfungen; Modell-Allowlist | AIBOM; Richtlinien-Verdikt | 1 · 2 |
| Test | Erforderliche Eval-Kategorien und Schwellenwerte nach Stufe; Red Teaming für höhere Stufen | Eval-Gate | Eval-Ergebnisse | 3 |
| Release | Vollständiges Bereitstellungspaket; Genehmigungen; Transparenzhinweise | Zulassungskontrolle liest das Register | Freigabeeintrag; Model Card | 1 · 2 · 5 |
| Betrieb | Überwachung; Aufsicht; Vorfallsdefinition und Schweregrad-Skala; Protokollierung | Guardrails; Warnungen; Vorfalls-Pipeline | Spuren; Guardrail-Ereignisse; Vorfallseintrag | 4 · 5 |
| Änderung | Auslöser für wesentliche Änderungen für Modell, Prompt, Daten und Tool-Umfang | Gates werden bei Änderung erneut ausgeführt; Registerversion erhöht | Diff; neue Eval-Ergebnisse | 1 · 3 |
| Außerbetriebnahme | Identitäten widerrufen, Evidenz archivieren, Daten löschen oder aufbewahren | Registerstatus `retired`; Identität widerrufen | Außerbetriebnahme-Eintrag | 2 · 4 · 5 |

Drei Phasen fehlen oft in Richtliniensätzen. **Betrieb** benötigt eine Vorfallsdefinition, die
breiter ist als die des Gesetzes. Der "schwerwiegende Vorfall" des KI-Gesetzes umfasst Tod oder
schwerwiegende Gesundheitsschäden, schwerwiegende und irreversible Störungen kritischer
Infrastrukturen, Verstöße gegen Verpflichtungen zum Schutz von Grundrechten und schwerwiegende
Schäden an Eigentum oder der Umwelt [16]; die meisten Vorfälle, von denen ein Programm lernen muss,
liegen unter dieser Linie (ein verzerrter Batch, ein durchgesickerter Prompt, ein Tool-Aufruf
außerhalb des Umfangs). Leiten Sie jeden Schweregrad durch eine Pipeline und lassen Sie nur die
oberste Klasse eine gesetzliche Uhr starten (Kapitel 17,
[Vorfälle, Probleme und Grundursachen](/bok/incidents#a-severity-scale-mapped-to-the-clocks)).
Hochrisiko-Betreiber müssen den Anbieter auch informieren und die Nutzung aussetzen, wenn sie Grund
zu der Annahme haben, dass das System ein Risiko darstellt (`Art. 26(5)`) [6]. **Änderung** benötigt
Auslöser, da eine Prompt-Bearbeitung oder eine neue Abrufquelle das Verhalten genauso verändern kann
wie ein neues Modell. **Ruhestand** benötigt ein
[Runbook](/patterns/deactivation-localisation-retirement-runbook): NIST fordert sichere
Außerbetriebnahme "auf eine Weise, die die Risiken nicht erhöht" (GOVERN 1.7) [3], was bedeutet,
jede Identität und jeden Berechtigungsnachweis zu widerrufen, den Registereintrag als pensioniert zu
markieren, die Evidenz für ihre Aufbewahrungsfrist zu archivieren und Aufbewahrungsregeln auf
Trainings- und abgeleitete Daten anzuwenden.

### Richtlinie als Code: eine Quelle, zwei Ausgaben

Die Abweichung zwischen einem Policy-PDF und der Prüfung, die es durchsetzt, ist, wo Prüfer ihre
Feststellungen finden. Schreiben Sie jede Regel einmal als Daten und kompilieren Sie sie zweimal: in
die Prosa, die Menschen lesen, und in die Prüfung, die die Pipeline ausführt. Die Quelle
(illustrativ):

```yaml
id: AIP-07
title: Evaluation before release
owner: ai-governance-committee
effective: 2026-10-01
maps_to: ["EU AI Act Art. 15", "ISO/IEC 42001 A.6", "NIST AI RMF MEASURE"]
rules:
  - rule_id: eval.injection-floor.v4
    applies_to_tiers: [2, 3]
    suite: injection-resistance.v4
    threshold: 0.95
    exceptions: register
```

Der Prosa-Compiler rendert: "AIP-07.1. Ein KI-System der Stufe 2 oder 3 wird nur freigegeben, wenn
sein letzter `injection-resistance.v4` mindestens 0,95 erreicht. Ausnahmen folgen dem
Ausnahmeregister. Eigentümer: KI-Governance-Komitee. Gültig ab 1. Oktober 2026." Der Code-Compiler
rendert die Prüfung (illustrativ `OPA/Rego`):

```rego
package aip07

import rego.v1

deny contains msg if {
  input.system.tier in {2, 3}
  r := input.evals["injection-resistance.v4"]
  r.score < 0.95
  not exception_active(input.system.id, "eval.injection-floor.v4")
  msg := sprintf("AIP-07 eval.injection-floor.v4: %s scored %v, below 0.95", [input.system.id, r.score])
}

exception_active(sys, rule) if {
  some e in data.exceptions
  e.system == sys
  e.rule_id == rule
  time.parse_rfc3339_ns(e.expires) > time.now_ns()
}
```

Beide Ausgaben stammen aus einem Commit, sodass die veröffentlichte Richtlinie und die durchgesetzte
Regel nicht widersprechen können. Dieselbe Quelle speist den
[Framework Crosswalk](/patterns/framework-crosswalk) und für Agenten eine
[Policy Card](/patterns/policy-card). Tests beweisen, dass die Regel bei einer verletzenden Eingabe
auslöst und eine saubere besteht, wie Schicht 01 erfordert.

## Die Richtlinien aktualisieren, die Sie bereits haben

Die meisten Organisationen benötigen keine neue Richtlinie für jedes KI-Problem. Sie benötigen ihre
Datenschutz-, Sicherheits-, Daten-Governance- und Intellectual-Property-Richtlinien, um KI zu sehen.
Eine Lückenanalyse findet, wo sie nicht passen.

1. **Inventarisieren** Sie jede Richtlinie, die KI-Systeme oder deren Daten berührt, einschließlich
   Beschaffung, Personalwesen, Aufzeichnungen und akzeptabler Nutzung.
2. **Testen Sie jede gegen die fünf Objekte** (Modell, System, Agent, Daten, Organisation) und die
   Lebenszyklusphasen: benennt sie das Objekt, enthält sie eine Regel, die darauf anwendbar ist, und
   sagt sie, welche Evidenz zeigt, dass die Regel befolgt wird?
3. **Entscheiden: erweitern oder erstellen.** Erweitern Sie, wenn der vorhandene Eigentümer und die
   Kontrolle passen (eine Aufbewahrungsregel, die nur Modell-Artefakte hinzufügen muss). Erstellen
   Sie, wenn ein neues Objekt einen neuen Eigentümer benötigt (Agent-Identität hat keinen Platz in
   einer klassischen Zugriffskontrollrichtlinie).
4. **Datei jede Lücke als Daten** (Richtlinie, Klausel, Lücke, Entscheidung, Eigentümer,
   Fälligkeitsdatum, Evidenz), sodass das Lückenregister eine Abfrage ist und seine Schließung ein
   KPI.

| Richtlinie | Typische KI-Lücken | Typische Ergänzungen | Evidenz |
|---|---|---|---|
| Datenschutz | Rechtmäßige Grundlage für Training versus Inferenz; Zweckbindung bei Wiederverwendung; was Modelle memorieren; Hinweise; Rechte über Modelle und Ausgaben; Aufbewahrung von Trainings- und abgeleiteten Daten | Datensatz-Zweck-Tags; DPIA-Auslöser für KI; Verfahren für [Rechtsansprüche gegen Modelle](/patterns/rights-requests-against-models) | DPIA; Data Card; Anfragelog für Rechte |
| Security | Prompt-Injection, Poisoning, Modellextraktion und Supply-Chain-Bedrohungen fehlen in der Risikobewertung und Playbooks; keine vertrauenswürdigen Modellquellen | KI-Bedrohungen in der ISMS-Risikobewertung; KI-Incident-Playbooks; Modell- und Datensatz-Allowlist | Bedrohungsmodell; Red-Team-Ergebnisse; Allowlist |
| Data Governance | Lineage ohne Provenance; gescrapte, vermittelte und synthetische Daten ohne Kennzeichnung; keine Aufbewahrung pro Schicht | Akquisitionspolitik (unten); Provenance-Felder; Aufbewahrung für Rohdaten, Features, Labels und Gewichte | Data Card; Lineage-Graph |
| Geistiges Eigentum | Trainingsrechte und Text-and-Data-Mining-Opt-outs; Nutzung von Outputs; Geschäftsgeheimnisse in Prompts; Open-Weight-Lizenzen; Anbieter-Schadloshaltungen | Rechteprüfung pro Datensatz; Output-Nutzungsregeln; Prompt-Regeln nach Datenklasse; Modell-Lizenzprüfung | [Rechtebuch](/patterns/training-data-rights-ledger); Lizenzunterlagen |

Drei Anmerkungen. Für **Sicherheit** ist der agentengestützte Bedrohungskatalog (Goal Hijack, Tool
Misuse, Identity and Privilege Abuse, Rogue Agents) die Checkliste, die Sie zu Ihrem bestehenden
Threat Model [17] hinzufügen. Für **Datenverwaltung** halten Sie einen Gegensatzpaar auseinander:
*Lineage* ist der Weg, den Daten durch Ihre Pipelines genommen haben; *Provenance* ist, woher sie
kamen und unter welchen Bedingungen. Perfekte Lineage über unbekannte Provenance ist immer noch
ungoverned. Für **geistiges Eigentum** erlaubt das EU-Recht Rechteinhabern, Werke vor Text- und
Data-Mining "auf angemessene Weise, etwa durch maschinenlesbare Mittel im Fall von online öffentlich
zugänglichen Inhalten" zu schützen (Richtlinie (EU) 2019/790, Art. 4(3)) [18], und Anbieter von
Modellen mit allgemeinem Verwendungszweck müssen eine Richtlinie haben, um diese Reservierungen zu
identifizieren und einzuhalten (`Art. 53(1)(c)`) [19]. Die Kapitel 19 und 20
([Datenschutz- und Datenschutzrecht auf KI angewendet](/bok/privacy-and-ai#principles-applied-to-ai),
[Anderes Recht, das bereits auf KI anwendbar ist](/bok/existing-law#how-to-read-this-chapter))
behandeln das Recht; die Aufgabe der Richtlinie ist es, jede Regel überprüfbar zu machen.

## Eine Datenbeschaffungsrichtlinie

Die meisten Datenverwaltungsausfälle werden bei der Beschaffung entschieden: ein Scrape, das niemand
geplant hat, ein Datensatz eines Maklers ohne Provenance, Labels, die unter Bedingungen erstellt
wurden, die niemand überprüft hat. ISO/IEC 42001 hat eine Annex-A-Kontrolle zur Datenbeschaffung
(A.7.3) [2]. Die Richtlinie benennt akzeptable Quellen und die Mindestbedingungen für jede und macht
jede Bedingung zu einem Feld im Beschaffungsdatensatz.

| Quelle | Mindestbedingungen | Evidenzfeld |
|---|---|---|
| Erstpartei-Daten, die für einen anderen Zweck erhoben wurden | Zweckkompatibilität bewertet; Mitteilung aktualisiert; DSFA bei Auslösung | Zweck-Tag; rechtliche Grundlage |
| Web-Scraping | Sensible Quellen ausgeschlossen; maschinenlesbare Reservierungen und Ausschlussdateien beachtet; Opt-out-Liste beachtet; Erfassung zeitlich begrenzt | Crawler-Konfigurationshash; Versionen der Ausschluss- und Opt-out-Liste |
| Datenmakler und lizenzierte Datensätze | Provenance-Kette; Garantien für rechtliche Grundlage; Lizenz für KI-Training; Audit-Recht; Löschung auf Anfrage | Vertrags-ID; Provenance-Erklärung |
| Gekennzeichnete oder kommentierte Daten | Schriftliche Richtlinien; Pilot; Vereinbarung zwischen Annotatoren über einem Schwellenwert; Bezahlung und Bedingungen Standard; Qualitätssicherung | Richtlinienversion; Übereinstimmungsscore; Lieferantenbescheinigung |
| Daten, die von einem Partner geteilt werden | Vereinbarung, die Zweck, Aufbewahrung, Weitergabe, Sicherheit, Löschung, Verstoßmitteilung und Audit abdeckt | Vereinbarungs-ID |
| Synthetische Daten | Generator und Seed-Daten aufgezeichnet; als synthetisch gekennzeichnet; Re-Identifizierungstest | Generator-Version; Testergebnis |

Die Scraping-Zeile folgt der Stellungnahme 28/2024 des Europäischen Datenschutzausschusses, deren
Minderungsmaßnahmen das Ausschließen bestimmter Quellen und Datenkategorien, das Beachten von
"robots.txt- oder ai.txt-Dateien oder anderen anerkannten Mechanismen", die sich gegen Scraping
aussprechen, und eine von der Kontrollstelle verwaltete Opt-out-Liste umfassen [20]. Die
Kennzeichnungszeile folgt der Anleitung der Partnership on AI zur Beschaffung von
Datenbereicherungsarbeiten, die Anbieterauswahl, Piloten, klare Anweisungen, Zahlungsbedingungen,
Kommunikation mit Arbeitern, Qualitätssicherung und Offboarding abdeckt [21]. Die Bedingungen von
Annotatoren sind eine Governance-Angelegenheit: Labels, die in Eile unter unklar Anweisungen
erstellt werden, werden zum Rauschen und zur Verzerrung, die die Eval Suite später finden muss.

Erzwingen Sie an der Pipeline-Grenze: Kein Datensatz betritt eine Training-, Fine-Tuning- oder
Abruf-Pipeline ohne einen Beschaffungsdatensatz, der die Schemavalidierung besteht, und der
Datensatz fließt in die Data Card und die [AIBOM](/patterns/aibom) (siehe
[Datenverwaltung über den Stack](/bok/the-stack#data-governance-across-the-stack)).

## Richtlinie für KI von Drittanbietern

Die meiste KI, die eine Organisation betreibt, hat sie gekauft. Kapitel 04 erklärt, wie sich der
Stack für beschaffte KI verschlechtert
([KI von Drittanbietern und beschaffte KI](/bok/the-stack#third-party-and-procured-ai)), und Kapitel
05 gibt das [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate). ISO/IEC
42001 behandelt Beziehungen zu Drittanbietern und Kunden in Annex A.10 [2]; NIST fordert Richtlinien
zum KI-Risiko von Drittanbietern, einschließlich Verletzung des geistigen Eigentums von
Drittanbietern, und Notfallprozesse für Ausfälle in hochriskanten Daten oder Systemen von
Drittanbietern (GOVERN 6.1, 6.2) [3].

**Beschaffungsaufnahme.** Jede Kaufanfrage trägt ein KI-Flag: Verwendet das Produkt KI, verarbeitet
es unsere Daten mit KI, trainiert es auf unseren Daten, wirkt es auf unsere Systeme oder trifft oder
unterstützt es Entscheidungen über Menschen? Ein Ja leitet es zur Einstufung weiter. Der stillere
Fall ist KI, die in einem bereits gekauften Produkt ankommt: eine Versionsnotiz, die ein KI-Feature
zu einem bestehenden Vertrag hinzufügt, löst die gleiche Aufnahme aus.

**Anbieter-Einstufung.** Stufen Sie nach Kritikalität, Datenempfindlichkeit, Autonomie und
regulatorischem Kontext ein und skalieren Sie die Bewertung auf die Stufe.

| Stufe | Typisches Profil | Bewertung | Neubewertung |
|---|---|---|---|
| 1 | Entscheidungen über Menschen; hochriskante Nutzung; Agenten mit Schreibzugriff; Daten besonderer Kategorien | Vollständige Due Diligence; Boundary Evals; vollständiger Klauselsatz; Genehmigung durch Ausschuss | Jährlich und bei Auslösern |
| 2 | Interne Produktivität bei vertraulichen Daten | Fragebogen mit Evidenz; Standard-Klauselsatz | Alle zwei Jahre und bei Auslösern |
| 3 | Keine vertraulichen Daten; keine Entscheidungen über Menschen | Leichte Überprüfung; durch akzeptable Nutzung abgedeckt | Bei Verlängerung |

**Vertragsbedingungen als Kontrollen.** Eine Klausel ist eine Kontrolle, wenn sie etwas schafft, das
Sie überwachen können. Die Gemeinschaft der öffentlichen Käufer der Kommission veröffentlicht
Muster-KI-Vertragsklauseln in einer hochriskanten und einer nicht-hochriskanten Version, freiwillig
und bewusst stumm zu IP, Zahlung und Datenschutz; die Version auf ihrer Seite ist vom 29. September
2023 datiert (ab 2026-09-24) [22]. Sie sind eine solide Startbibliothek auch für private Käufer.

| Klausel | Kontrolle, die sie schafft | Evidenz oder Monitor |
|---|---|---|
| Offenlegung der KI-Nutzung und Sub-Prozessoren | Bestandsvollständigkeit; Vierte-Partei-Karte | Anbieterregister; bereitgestellte AIBOM |
| Kein Training auf Kundendaten ohne Opt-in | Zweckbindung | Vertrags-Flag; Bescheinigung; Konfigurationsprüfung |
| Mitteilung über wesentliche Änderung (Modell, Version, Verhalten) | Auslöser für Neubewertung | Mitteilung startet einen Boundary-Eval-Relauf |
| Incident-Benachrichtigungsfenster | Eingabe in Ihre eigene Incident-Uhr | Mitteilungszeitstempel in der Incident Pipeline |
| Evidenz und Audit-Rechte | Gesammelte Evidenz | Model Card, Eval-Ergebnisse und Zertifikate im Evidence Store |
| Bias-Tests und Abhilfepflicht | Fairness-Evidenz für Ihre Nutzung | Anbieter-Testberichte |
| Deaktivierung, Datenzurückgabe und Ausstieg | Ein vertraglicher Kill Switch | Getestetes Exit-Runbook |
| Haftung und Schadloshaltung, einschließlich IP | Risikotransfer, keine Risikominderung | Vertragsregister |

**Lieferkette und Open Source.** Das Foundation Model unter dem Produkt eines Anbieters ist eine
Abhängigkeit, die Sie erben; kartografieren Sie diese vierten Parteien. Die Wertschöpfungskette kann
auch Ihre Rolle ändern: unter `Art. 25` wird ein Distributor, Importeur, Betreiber oder andere
dritte Partei, die ihren Namen oder ihre Marke auf ein hochriskantes System setzt, es wesentlich
ändert oder den beabsichtigten Zweck eines Systems so ändert, dass es hochriskant wird, als sein
Anbieter behandelt [23]. Open-Weight-Modelle und offene Datensätze durchlaufen die gleiche Aufnahme:
Lizenz und Nutzungsbeschränkungen überprüft, Provenance aufgezeichnet, Artefakte gescannt und
angeheftet vor dem Laden, Ergebnisse in der AIBOM. Bewerten Sie bei Ereignissen neu, nicht nur bei
Verlängerung: ein Incident, ein Eigentümerwechsel, eine neue Modellversion, öffentliche Kontroverse
oder behördliche Maßnahmen, eine Änderung des Gesetzes.

**Menschen.** KI, die für Rekrutierung und Auswahl, Beförderung oder Beendigung, Aufgabenzuweisung
oder Überwachung und Bewertung von Arbeitern verwendet wird, ist hochriskant unter Annex III Punkt 4
[24], mit der Arbeitnehmermitteilungspflicht von `Art. 26(7)` für Betreiber [6]. Annotatoren,
Auftragnehmer und ausgelagerte Reviewer, die Ihre Daten bearbeiten, sind Teil der Lieferkette, unter
den oben genannten Beschaffungsbedingungen [21].

## Akzeptable Nutzung von KI durch Personal

Das Glossar definiert Shadow AI als KI, die in der Produktion läuft, ohne sich zu registrieren. Die
Nutzung nicht genehmigter Tools durch Personal ist sein alltägliches Zwilling: ein Mitarbeiter, der
eine Kundendatei in einen öffentlichen Chatbot einfügt. Eine Acceptable-Use-Policy (AUP) behandelt
genehmigte Tools, verbotene Eingaben nach Datenklasse, die Pflicht, Outputs zu überprüfen,
Offenlegung, wenn Outputs Kunden erreichen, Protokollierung, die erforderliche Bescheinigung vor dem
Zugriff und angemessene Konsequenzen.

| Datenklasse | Öffentliches KI-Tool | Sanctioned AI Gateway | Genehmigtes internes System |
|---|---|---|---|
| Öffentlich | Erlaubt | Erlaubt | Erlaubt |
| Intern | Nicht erlaubt | Erlaubt, protokolliert | Erlaubt |
| Vertrauliche oder Kundendaten | Nicht erlaubt | Nur genehmigte Anwendungsfälle; protokolliert; geschwärzt | Erlaubt im Umfang |
| Daten besonderer Kategorien oder regulierte Daten | Nicht erlaubt | Nur mit einem DSFA-gestützten Anwendungsfall | Erlaubt im Umfang |
| Geheimnisse, Anmeldedaten, eingeschränkter Code | Nicht erlaubt | Nicht erlaubt | Pro Sicherheitsstandard |

Erzwingen Sie mit dem [Gateway](/patterns/sanctioned-ai-gateway), nicht mit dem Handbuch: genehmigte
Tools hinter Single Sign-On und einem Gateway, das Datenklassenregeln anwendet und Nutzung
protokolliert; Zugriff bedingt durch eine aktuelle AUP-Bescheinigung (das Literacy Gate oben);
Entdeckung nicht genehmigter Tools durch Identitäts-, Netzwerk- und Ausgabendaten (das
[Shadow-AI Discovery](/patterns/shadow-ai-discovery)-Muster). Wenn die Entdeckung ein nicht
genehmigtes Tool findet, bieten Sie einen Weg hinein (registrieren, einstufen, genehmigen oder
ersetzen), bevor eine Sanktion erfolgt. Menschen verwenden nicht genehmigte Tools, weil der
genehmigte Weg langsamer ist; die Lösung ist normalerweise ein besserer Weg.

> **Beispiel (illustrativ)**
> Ein Rechtsteam beginnt, einen öffentlichen Entwurfassistenten für Vertragszusammenfassungen zu
> verwenden. Die Entdeckung kennzeichnet den Verkehr. Anstatt die Domäne zu blockieren, führt das
> Programm das Tool durch die Beschaffungsaufnahme, unterzeichnet eine Unternehmensvereinbarung ohne
> Training auf Kundendaten, leitet es durch das Gateway unter der vertraulichen Datenregel und fügt
> ein einseitiges Modul zum Lehrplan des Rechtsteams hinzu. Die Nutzung wechselt innerhalb von
> Wochen zur genehmigten Route, weil es jetzt der einfachste Weg ist.

**Zuordnung:** KI-Verordnung der EU `Art. 25` (Wertschöpfungskette), `Art. 26` (Betreiberpflichten),
`Art. 53(1)(c)` (GPAI-Urheberrechtspolitik), Annex III Punkt 4 (Beschäftigung) · Richtlinie (EU)
2019/790 `Art. 4(3)` · ISO/IEC 42001 Klausel 5.2; Annex A.2, A.7.3, A.10 · NIST AI RMF GOVERN 1, 6;
MAP 1, 3; MANAGE 1.1 · Schichten 1 Governance-as-Code, 2 Inventory & Transparency und 5 Assurance &
Continuous Compliance.

## Was Sie diese Woche tun können

1. **Schreiben Sie die Ausschussordnung auf einer Seite**, in der die vier Entscheidungstypen
   aufgelistet sind, die nur der Ausschuss trifft, und in der festgestellt wird, dass Gates alles
   andere durchsetzen.
2. **Erstellen Sie das Ausnahmeverzeichnis** als Datei im Policy-Repository, richten Sie ein Gate
   darauf aus und setzen Sie eine maximale Ablaufzeit.
3. **Gating eines Tools beim Training**: Machen Sie den Zugriff auf die Override-Konsole Ihres
   riskantesten Systems oder auf Ihr KI-Gateway davon abhängig, dass ein aktueller Schulungsnachweis
   vorliegt.
4. **Generieren Sie drei Board-Indikatoren aus Live-Daten**: Registrierungsabdeckung, gefundene
   nicht registrierte KI und offene Ausnahmen nach Alter.
5. **Führen Sie die Lückenanalyse für zwei Richtlinien durch** (Datenschutz und Sicherheit) gegen
   die fünf Objekte, und dokumentieren Sie jede Lücke als Zeile mit einem Verantwortlichen.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(a) strategy for regulatory compliance; Art. 17(1)(m) accountability framework; Art. 17(2) proportionality, as amended by Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (referenced by number only: clauses 5.1–5.3, 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.2, A.3.2, A.3.3, A.7.3, A.10). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1, 1.5, 1.7, 2.1–2.3, 3.1, 4.1, 4.3, 5.1, 6.1–6.2; MAP 1.3–1.4, 3.1–3.2; MANAGE 1.1; initial go/no-go decision after MAP). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[5] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance; CFO Act agency AI Governance Boards within 90 days, chaired at Deputy Secretary level, with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per instructions; 26(2) oversight by persons with competence, training and authority; 26(5) monitoring, informing the provider and suspension; 26(7) informing workers' representatives and affected workers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[7] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4 (as amended by Reg. (EU) 2026/1744: providers and deployers "take measures to support the development of AI literacy"; no guaranteed level for any individual; support from the Commission and Member States; Board recommendations; applies since 2 Feb 2025 under Art. 113(a)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4 (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] AI Literacy: Questions & Answers (obligation remains, no specific or "sufficient" level mandated; no certificate needed; internal record of trainings; "other persons" include contractors, service providers and clients; no specific governance structure mandated; instructions for use alone not sufficient; supervision by national market-surveillance authorities from 2 Aug 2026). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (John Lunney, Sue Lueder), in Site Reliability Engineering. Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 87 (Directive (EU) 2019/1937 applies to the reporting of infringements of the AI Act and the protection of reporting persons; applies from 2 Aug 2026 under Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_87 (verified: primary)
[13] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8(1) and 8(3) internal channels for private entities with 50 or more workers; Art. 9(1)(b) acknowledgment within seven days; Art. 9(1)(f) feedback within three months; Art. 19 prohibition of retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[14] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025, a regular-session statute and so in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); Labor Code §§1107–1107.2: "covered employee", no rule preventing disclosure, no retaliation, notice of rights, anonymous internal process for large frontier developers with monthly updates and quarterly sharing with officers and directors). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[15] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3(49) (definition of "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[17] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[18] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(1) text-and-data-mining exception; Art. 4(3) reservation by rightholders, by machine-readable means for content online). Publications Office of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng#art_4 (verified: primary)
[19] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53(1)(c) (GPAI providers' copyright policy, incl. identifying and complying with Art. 4(3) reservations). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[20] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (paras 104–106: web-scraping mitigations incl. excluding sources and data categories, respecting robots.txt or ai.txt, opt-out lists). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en (verified: primary)
[21] Responsible Sourcing of Data Enrichment Services (provider selection, pilots, instructions, payment terms, communication with workers, quality assurance, offboarding). Partnership on AI. 2021-06-16. https://partnershiponai.org/paper/responsible-sourcing-considerations/ (verified: primary)
[22] EU model contractual AI clauses (MCC-AI) to pilot in procurements of AI (high-risk and non-high-risk versions; voluntary; exclude IP, payment and GDPR terms). Public Buyers Community, European Commission. 2023-09-29. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/eu-model-contractual-ai-clauses-pilot-procurements-ai (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25(1) (a value-chain actor becomes the provider when it puts its name or trademark on a high-risk system, makes a substantial modification, or modifies the intended purpose so that the system becomes high-risk). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[24] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 4 (employment, workers' management and access to self-employment: recruitment and selection; decisions on work relationships, task allocation, monitoring and evaluation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
