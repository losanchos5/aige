---
lang: de
source: bok/17-incidents.md
sourceHash: "76dcf38990c332292ea0247ad2d9be4d335a72f55e2510c48bbeb1b7e5f9218d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 17. Incidents, issues and root causes

> AI incident management turns a runtime signal into an event that is classified, contained,
> reported on every clock that applies and explained, with its cause fed back into the controls.

Dieses Kapitel erweitert zwei Dinge, die das Buch bereits hat. Das Muster
[**Incident Pipeline**](/patterns/incident-pipeline) (Kapitel 05) verbindet die Erkennung mit einem
Bericht, bei dem der gesetzliche Timer läuft; die Tabelle zu Artikel 73 in der
[Regulierungskarte](/bok/regulatory-map#eu-ai-act-post-omnibus) (Kapitel 08) gibt an, wie lange
dieser Timer läuft. Keine der beiden sagt aus, was unterhalb der Schwelle für schwerwiegende
Vorfälle als Vorfall zählt, wie man den Schweregrad einstuft, wer welchen Hebel betätigt, wie man
die Ursache findet oder was zu tun ist, wenn ein Ereignis vier Timer gleichzeitig startet.

Ein Kontrast zunächst. **Sicherheitsvorfallreaktion**, das Heimatgebiet der Schwesterndisziplin,
behandelt Kompromittierung: ein Angreifer, eine Schwachstelle, eine Verletzung.
AI-Incident-Management erbt seinen Lebenszyklus und viele seiner Werkzeuge, aber die Schadenspalette
ist breiter (Diskriminierung, unsicherer Rat, Rechtsverletzungen, Fehlinformationen, auf die
reagiert wird) und der Fehler ist oft Verhalten statt Kompromittierung: ein Modell, das abweicht,
ein Agent, der ein zulässiges Werkzeug auf schädliche Weise nutzt. Nichts wurde verletzt, und
Menschen wurden dennoch geschädigt. Das Ergebnis ist ein verwalteter Vorfall mit einer Nachweisspur,
nicht nur ein wiederhergestellter Service.

## Vorfall, Gefahr, Problem und schwerwiegender Vorfall

Vier Wörter entscheiden, ob ein Timer startet, also definieren Sie sie vor allem anderen.

Die Definitionen der OECD sind der am weitesten verbreitete Ausgangspunkt. Ein **KI-Vorfall** ist
ein Ereignis, eine Situation oder eine Reihe von Ereignissen, bei denen die Entwicklung, Nutzung
oder Fehlfunktion eines oder mehrerer KI-Systeme direkt oder indirekt zu Schaden führt: Verletzung
oder Schaden an der Gesundheit von Personen, Störung kritischer Infrastruktur, Verletzungen von
Menschenrechten oder von Rechtsvorschriften zum Schutz grundlegender, Arbeits- und Urheberrechte
oder Schaden an Eigentum, Gemeinschaften oder der Umwelt. Eine **KI-Gefahr** ist das gleiche
Ereignis, bei dem das KI-System *plausibel zu* einem solchen Vorfall führen *könnte* [1]. Das
OECD-Papier definiert auch abgestufte Begriffe (schwerwiegender KI-Vorfall, KI-Katastrophe,
schwerwiegende KI-Gefahr), und sein gemeinsames Berichtsrahmen nutzt diese Leiter als Werte seines
Schweregradfelds [1][2].

Die KI-Verordnung definiert nur die Spitze der Leiter. Ein **schwerwiegender Vorfall** unter
`Art. 3(49)` ist ein Vorfall oder eine Fehlfunktion eines KI-Systems, die direkt oder indirekt zu
einem von vier Ergebnissen führt: (a) der Tod einer Person oder schwerwiegender Schaden an der
Gesundheit einer Person; (b) eine schwerwiegende und irreversible Störung der Verwaltung oder des
Betriebs kritischer Infrastruktur; (c) die Verletzung von Verpflichtungen aus dem Unionsrecht zum
Schutz grundlegender Rechte; oder (d) schwerwiegender Schaden an Eigentum oder der Umwelt [3]. Ein
separater definierter Begriff, **weit verbreitete Verletzung** (`Art. 3(61)`), umfasst Handlungen,
die gegen Unionsrecht verstoßen und die kollektiven Interessen von Personen in mehreren
Mitgliedstaaten schädigen; er verkürzt die Meldefrist, wie der Abschnitt zu den Uhren zeigt [3].

Zwei weitere Begriffe sind interne Definitionen, und das Buch verwendet sie konsistent:

- Ein **Problem** ist ein Mangel, eine Abweichung oder eine Kontrollschwäche, die kein Ereignis
  hervorgebracht hat: eine Eval, die in der Staging unter ihren Schwellenwert gefallen ist, eine
  Drift-Warnung, eine Model Card, die nicht mehr mit der bereitgestellten Version übereinstimmt, ein
  Guardrail, dessen False-Positive-Rate sich verdoppelt hat. Ein Problem wird mit einem Eigentümer
  und einem Fälligkeitsdatum bis zum Abschluss nachverfolgt. In Begriffen von ISO/IEC 42001 sind die
  meisten Probleme Nichtkonformitäten, die unter Klausel 10.2 behandelt werden [4].
- Ein **Beinahe-Unfall** ist eine Gefahr, die ein Kontrolle (oder Glück) unterbrochen hat: der
  Guardrail blockierte den Exfiltrationsversuch, der menschliche Prüfer fing die erfundene Dosierung
  ab. Es trat kein Schaden auf, aber der Weg zum Schaden war real. Der GPAI Code of Practice fordert
  Anbieter auf, "einzelne oder aggregierte Daten zu Beinahe-Unfällen" zu melden, die mit einem
  schwerwiegenden Vorfall verbunden sind, was zeigt, dass Beinahe-Unfälle Nachweise sind, nicht
  Rauschen [5].

| Begriff | Schaden realisiert? | Startet eine gesetzliche Uhr? | Wo es lebt | Beispiel |
|---|---|---|---|---|
| **Problem** | Kein Ereignis | Nein | Problemprotokoll (Backlog mit Eigentümer, Fälligkeitsdatum) | Injection-Eval fällt von 0,98 auf 0,93 in Staging |
| **Beinahe-Unfall / KI-Gefahr** | Nein, aber plausibel | Nein, aber möglicherweise Daten in einem GPAI-Bericht | Vorfallprotokoll, Schweregrad SEV-4 | Guardrail blockiert den Versuch eines Agenten, Bestelldaten an eine externe URL zu senden |
| **KI-Vorfall** | Ja | Nur wenn der Auslöser eines Regimes erfüllt ist | Vorfallprotokoll, SEV-3 oder höher | Assistent zitiert eine falsche Rückgaberichtlinie für 40 Kunden |
| **Schwerwiegender Vorfall** (`Art. 3(49)`) | Ja, bei einem von vier gesetzlichen Schwellenwerten | Ja, für Hochrisiko-Anbieter und GPAI-Anbieter mit systemischem Risiko | Vorfallprotokoll, SEV-1 oder SEV-2, mit Uhren | Kreditmodell-Drift führt zu diskriminierenden Ablehnungen |

Die Unterscheidung, die in der Praxis am meisten zählt, ist zwischen *Schweregrad* und
*Meldepflicht*. Schweregrad ist eine Beurteilung des Schadens auf Ihrer internen Skala. Meldepflicht
ist ein separater Test, der einmal pro Regime gegen den Auslöser dieses Regimes durchgeführt wird.
Ein moderater Vorfall kann dennoch meldepflichtig sein (eine kleine Verletzung personenbezogener
Daten unter der DSGVO); ein schwerwiegender kann außerhalb des Geltungsbereichs jedes Regimes fallen
(ein Nicht-Hochrisiko-System ohne personenbezogene Daten). Halten Sie die beiden Entscheidungen in
separaten Feldern, die von benannten Personen mit Zeitstempeln getroffen werden.

> **In der Praxis (illustrativ)**
> In einem großen Telekommunikationsunternehmen war die erste sinnvolle Änderung des
> Incident-Prozesses kein neues Tool, sondern ein neues Feld. Tickets hatten einen "priority"-Wert,
> den das Engineering für Dringlichkeit setzte und Legal als Meldepflicht las, und die beiden
> Lesarten widersprachen sich stillschweigend. Die Aufteilung in `severity` (vom On-Call-Engineer
> anhand einer Harm-Tabelle gesetzt) und ein `reportable_<regime>`-Flag pro anwendbarem Regime (von
> den Datenschutz- und Legal-Verantwortlichen gesetzt, jeweils mit Zeitstempel und Begründung)
> machte jede Entscheidung später überprüfbar. Die erste Überprüfung fand Tickets aus dem vorherigen
> Quartal, die auf DSGVO-Meldepflicht hätten bewertet werden sollen und nie wurden.

## Eine Schweregrad-Skala abgebildet auf die Uhren

Eine Schweregrad-Skala ist eine Policy, also schreiben Sie sie als eine. Die Skala unten hat vier
Incident-Level und einen Level für Issues. Sie ist illustrativ; was zählt, ist, dass jeder Level
einen Harm-Test benennt, auf die rechtlichen Klassen abgebildet wird, die er auslösen kann, und eine
Standard-Antwort trägt.

| Stufe | Harm-Test | KI-Verordnung-Klasse, die sie auslösen kann | OECD-Schweregrad-Wert [2] | Standard-Antwort |
|---|---|---|---|---|
| **SEV-1 Critical** | Tod; ernsthafte Gesundheitsschäden; ernsthafte und irreversible Störung kritischer Infrastruktur; weit verbreitete Verletzung | `Art. 73(4)` Tod: 10 Tage; `Art. 73(3)`: 2 Tage | Schwerwiegender Vorfall; Katastrophe | Incident Commander innerhalb von 15 Minuten; zuerst eindämmen; Legal und DPO auf der Leitung |
| **SEV-2 Major** | Verletzung von Grundrechtsverpflichtungen; ernsthafte Schäden an Eigentum oder Umwelt; schwerwiegender Datenschutzverstoß mit hochsensiblen personenbezogenen Daten; schwerwiegender Cybersecurity-Verstoß eines Modells | `Art. 73(2)`: 15 Tage | Schwerwiegender Vorfall | Gleicher Arbeitstag; Meldepflicht pro Regime innerhalb von Stunden bewertet |
| **SEV-3 Moderate** | Realisierter Schaden, der begrenzt, wiederherstellbar und unter den schwerwiegenden Schwellwerten liegt | Keine von selbst; DSGVO, NIS2, DORA prüfen | Incident | Gleicher Tag eindämmen; After-Action-Review innerhalb von fünf Arbeitstagen |
| **SEV-4 Near miss** | Kein Schaden; ein plausibler Weg zu Schaden wurde unterbrochen | Keine; Near-Miss-Muster speisen GPAI-Berichte [5] | Gefahr; ernsthafte Gefahr | Wöchentliche Überprüfung; Regressions-Eval hinzugefügt |
| **Problem** | Defekt oder Kontrollschwäche ohne Ereignis | Keine | Kein Ereignis | Issue-Log mit Verantwortlichem und Fälligkeitsdatum |

Drei Regeln machen die Skala unter Druck funktionsfähig.

1. **Klassifizieren Sie nach oben, stufen Sie mit Evidenz herab.** Bei der Triage kennen Sie selten
   den vollständigen Schaden. Klassifizieren Sie gegen die schwerwiegendste plausible Lesart und
   dokumentieren Sie warum; stufen Sie herab, wenn Evidenz sie eingrenzt. Die KI-Verordnung
   unterstützt diese Lesart: die äußeren Fristen laufen ab Bewusstsein, und die "angemessene
   Wahrscheinlichkeit" eines kausalen Zusammenhangs reicht aus, um den Bericht zu fordern [3].
2. **Schweregrad folgt Schaden, nicht Ursache.** Ein trivialer Bug, der einen Tod verursachte, ist
   SEV-1; ein ausgefeilter Angriff, den ein Guardrail stoppte, ist SEV-4. Technisches Interesse ist
   kein Schweregrad-Input.
3. **Die Skala ist Code.** Die Harm-Tests und die Regime-Trigger werden von einer Rule Engine
   bewertet, wenn ein Incident geöffnet wird, sodass die erste Klassifizierung und die Uhren, die
   sie startet, reproduzierbar, versioniert und prüfbar sind. Ein Mensch kann überschreiben; die
   Überschreibung wird mit einem Grund protokolliert.

> **Beispiel (illustrativ)** Eine Schweregrad-Regel, geschrieben als
> [Policy Card](/patterns/policy-card), wird ausgelöst, wenn ein Incident-Datensatz `harm.type` von
> `fundamental_rights` und `system.ai_act_class` von `high_risk` aufweist: Sie setzt
> `severity: SEV-2`, öffnet eine `ai_act_art73`-Uhr mit einer 15-Tage-Obergrenze ab dem
> `aware_at`-Zeitstempel und benachrichtigt den Systemeigentümer und die Rechtsabteilung. Das Urteil
> selbst wird als Nachweis gespeichert, sodass ein späterer Prüfer sehen kann, welche Regelversion
> das Ereignis klassifiziert hat.

Zwei Vorbehalte zur Zuordnung. Die AI-Act-Klassen gelten nur für Hochrisiko-Systeme (für `Art. 73`)
und für GPAI-Modelle mit systemischem Risiko (für `Art. 55`), und die GPAI-Klassen unterscheiden
sich leicht: Der Verhaltenskodex fügt eine Fünf-Tage-Klasse für schwerwiegende
Cybersicherheitsverletzungen hinzu, einschließlich Exfiltration von Modellgewichten [5]. Und die
OECD-Werte sind ein Vokabular für die Berichterstattung, nicht eine rechtliche Schwelle.

## Der Reaktionslebenszyklus

Die Incident-Response-Anleitung des NIST änderte sich im April 2025. SP 800-61 Revision 3 ersetzte
die Revision von 2012 und ihren zirkulären Lebenszyklus (Vorbereitung; Erkennung und Analyse;
Eindämmung, Beseitigung und Wiederherstellung; Aktivitäten nach dem Incident) durch ein Modell, das
auf den sechs CSF-2.0-Funktionen aufbaut, mit der Begründung, dass Incidents nun häufig und
langwierig sind und dass Erkenntnisse so bald wie möglich geteilt werden sollten [6]. Die folgenden
Phasen behalten die vertrauten Verben bei, weil On-Call-Ingenieure in ihnen denken, und ordnen jede
der CSF-Funktion zu, die NIST nun verwendet.

| Phase | KI-spezifische Maßnahmen | Nachweise, die sie hinterlässt | Schicht | CSF-2.0-Funktion [6] |
|---|---|---|---|---|
| **Erkennen** | Guardrail-Ereignisse, Regressionstests in der Produktion, Drift-Warnungen, Benutzerbeschwerden, Mitteilungen von Betreibern oder Anbietern, Scans von Incident-Datenbanken | Signal-Ereignis mit Quelle, Zeitstempel und Registry-ID | 04 · 05 | Erkennen |
| **Triage** | Schweregrad aus der Schadenstabelle; Meldepflicht pro Regime; Eigentümer und Incident Commander benannt; `aware_at`} behoben | Incident-Datensatz geöffnet; Uhren gestartet | 05 | Erkennen · Reagieren |
| **Eindämmung** | Kill Switch oder Circuit Breaker; Sperrung des Umfangs; Fallback auf einen manuellen Pfad; Rollback zur letzten funktionierenden Modell- oder Prompt-Version; Aussetzung des Betreibers | Eindämmungsmaßnahme mit Akteur, Zeit und Umfang | 04 | Reagieren |
| **Beseitigung** | Beheben Sie die Ursache: Patchen Sie den Guardrail, entfernen Sie vergiftete Daten, widerrufen Sie Anmeldedaten, trainieren Sie neu; nur nachdem Nachweise gesichert wurden | Änderungsdatensatz verknüpft mit dem Incident | 01 · 03 | Reagieren |
| **Wiederherstellung** | Eval-Gate erneut ausführen; gestaffelte Wiedereinführung; erhöhtes Überwachungsfenster | Eval-Gate-Ergebnis; Überwachungsfenster geschlossen | 03 · 04 | Wiederherstellen |
| **Nachbesprechung** | Blameless Review; Grundursache; CAPA; Risikoregister und Eval-Updates | Review-Datensatz; CAPA-Elemente; aktualisierte Risikoeinträge | 05 | Identifizieren (Verbesserung) |

Die Erkennung benötigt mehr Kanäle als die Laufzeitsignale von
[Schicht 04](/bok/the-stack#layer-04-runtime-controls--observability). Der GPAI-Verhaltenskodex
erwartet von Anbietern, dass sie Polizei- und Medienberichte, soziale Medien, Forschungsarbeiten und
Incident-Datenbanken überprüfen und die Berichterstattung durch nachgelagerte Modifizierer,
nachgelagerte Anbieter und Benutzer erleichtern, indem sie ihnen direkte Berichterstattungskanäle
mitteilen, an den Anbieter oder an das AI Office, wo diese verfügbar sind [5]. Ein Betreiber, der
nur seine eigenen Dashboards überwacht, erfährt von einigen Incidents von einem Journalisten.
Personal ist auch ein Kanal:
[ein Kanal zum Äußern von Bedenken](/bok/governance-program#a-channel-for-raising-concerns)
(Kapitel 12) leitet ihre Berichte in dieselbe Pipeline ein, und für einen Hochrisiko-Anbieter ist
der Post-Market-Monitoring-Plan eine ständige Quelle
([Post-Market-Monitoring und schwerwiegende Incidents unter dem AI Act](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73),
Kapitel 18).

Die Eindämmung ist der Ort, an dem die Laufzeitmuster ihren Wert beweisen. Ein
[Kill Switch](/patterns/kill-switch-circuit-breaker), der den Umfang eines Agenten widerruft, ohne
die Flotte zu unterbrechen, ein [Runtime Guardrail](/patterns/runtime-guardrail), das durch einen
Config-Push verschärft wird, und ein Register, das die Live- und die letzte funktionierend Version
kennt, verwandeln "Eindämmung" von einer Besprechung in einen Befehl. Das NIST AI RMF benennt die
Fähigkeit: Mechanismen und zugewiesene Verantwortlichkeiten zum "Ersetzen, Deaktivieren oder
Außerbetriebnahme" von KI-Systemen, deren Leistung oder Ergebnisse nicht mit der vorgesehenen
Verwendung übereinstimmen [7].

### Einfrieren, bevor Sie reparieren

Der Instinkt nach der Eindämmung ist, das Ding zu reparieren. Für ein Hochrisiko-System sagt der AI
Act warten: Nach der Meldung eines schwerwiegenden Incidents untersucht der Anbieter, einschließlich
einer Risikobewertung und Korrekturmaßnahme, darf aber keine Untersuchung durchführen, die das
System so verändert, dass dies die spätere Bewertung der Ursachen des Incidents beeinträchtigen
könnte, bevor die zuständigen Behörden informiert werden [3]. Engineering liest das als einen
Erhaltungsschritt zwischen Eindämmung und Beseitigung:

- **Erstellen Sie einen Snapshot des Systems, wie es war.** Modellversion und Hash, Systemprompt,
  Richtlinien- und Guardrail-Versionen, Tool-Umfänge, Snapshot des Abrufindex, Konfiguration und
  Feature-Flags, alle mit der Registry-ID und der Incident-ID gekennzeichnet.
- **Versiegeln Sie die Spuren.** Die {`Art. 12`}-Protokolle und die Laufzeitspuren für das
  Incident-Fenster, exportiert in manipulationssicheren Speicher. Betreiber müssen die automatisch
  generierten Protokolle eines Hochrisiko-Systems, soweit unter ihrer Kontrolle, mindestens sechs
  Monate lang aufbewahren, es sei denn, anderes Recht sagt etwas anderes [3]; ein offener Incident
  ist ein Grund, sie länger zu halten.
- **Protokollieren Sie, wer was berührt hat.** Jede Eindämmungs- und Diagnoseaktion wird mit ihrem
  Akteur protokolliert, sodass die Bewertung der Ursachen den Incident von der Reaktion trennen
  kann.
- **Reparieren Sie auf einem Branch, nicht an Ort und Stelle.** Die Beseitigung läuft als Änderung
  zu einer neuen Version; die Incident-Version bleibt reproduzierbar.

Die Aufbewahrung überlebt den Incident. Der Verhaltenskodex verpflichtet GPAI-Unterzeichner,
Incident-Dokumentation mindestens fünf Jahre ab der Dokumentation oder dem Incident, je nachdem,
welcher später liegt, aufzubewahren [5]. Die eingefrorenen Nachweise speisen auch die
[Verteidigungsdatei](/bok/existing-law#the-defence-file), die das Produkthaftungsrecht nun einem
Gericht zur Offenlegung anordnen lässt (Kapitel 20).

## Playbooks, RACI und Übungen

Ein Playbook ist die Reaktion auf einen Fehlermodus, geschrieben, bevor er auftritt. Halten Sie es
kurz genug, um während des Incidents gelesen zu werden, und spezifisch genug, um ohne Interpretation
zu handeln.

```yaml
# playbook: indirect-prompt-injection (illustrative)
trigger: guardrail rule output.exfil.* fires, or a tool call to an unregistered domain
first_15_minutes:
  - page: on-call engineer, AI governance engineer
  - contain: revoke agent tool scope "http:egress" via kill switch; keep read scopes
  - preserve: snapshot registry entry, prompt, retrieval index; seal traces for the window
decision_rights:
  kill_switch: on-call engineer (no approval needed)
  customer_notice: DPO
  regulator_filing: legal, on DPO or system-owner recommendation
evidence_checklist: [trace_ids, guardrail_events, affected_records, scope_revocation_event]
regimes_to_assess: [gdpr_art33, gdpr_art34, nis2_art23, ai_act_art73]
```

Der Entscheidungsrechte-Block ist am wichtigsten. Wer im Dienst ist, muss den Kill Switch ziehen
können, ohne zu fragen, denn Eindämmung, die auf einen Ausschuss wartet, ist keine Eindämmung. Die
Einreichung bei einer Behörde ist das Gegenteil: Sie benötigt benannte Eigentümer mit der Befugnis
zu unterzeichnen. Ein RACI macht beides explizit (R verantwortlich, A rechenschaftspflichtig, C
konsultiert, I informiert):

| Aktivität | On-Call-Ingenieur | AI-Governance-Ingenieur | Systemeigentümer | Security-IR-Leiter | DPO | Recht | Anbieter-Liaison |
|---|---|---|---|---|---|---|---|
| Erkennen und Datensatz öffnen | R | C | I | C | I | I | I |
| Schweregrad festlegen | R | A | C | C | C | I | I |
| Kill Switch ziehen oder Verwendung aussetzen | R | I | A | C | I | I | I |
| Nachweise bewahren | R | A | I | C | I | C | I |
| Meldepflicht pro Regime entscheiden | I | C | C | C | R (GDPR) | A | C |
| Behördenbericht einreichen | I | C | C | C (NIS2, DORA) | R (GDPR) | A | I |
| Anbieter informieren (Betreiberpflicht) | I | C | A | I | I | C | R |
| Grundursachenanalyse | C | R | A | C | C | I | C |
| CAPA genehmigen und schließen | I | R | A | C | C | C | I |

Passen Sie die Spalten an Ihre Organisation an; lassen Sie die Zeilen nicht weg. Jede Zeile ist ein
Artefakt, das jemand produzieren muss, und eine leere Zelle um 2 Uhr morgens ist eine Lücke, die ein
Prüfer später finden wird.

**Übungen sind die Kontrolle; das Playbook ist die Behauptung.** Das Buch behandelt einen nicht
getesteten Kill Switch als Behauptung, nicht als Kontrolle, und derselbe Test gilt für das Playbook.
Führen Sie Tischübungen nach einem Plan durch, bewerten Sie sie und bewahren Sie das Ergebnis als
Nachweis auf:

- **Szenarien.** Wechseln Sie durch die folgenden Fehlermodi: eine indirekte Prompt-Injection, die
  Daten exfiltriert; Drift, der diskriminierende Ergebnisse erzeugt; ein Anbieter, der das Modell
  hinter einer API stillschweigend ändert; eine Agent-Schleife, die Budget verbrennt und Tools
  tausendmal aufruft; selbstbewusster, falscher Rat, auf den ein Benutzer handelt.
- **Maßnahmen.** Zeit zur Klassifizierung, Zeit zur Eindämmung, Zeit zu einem Entwurfsbericht für
  jede Uhr und ob jede Uhr eingehalten worden wäre. Verfolgen Sie die mittlere Zeit zur Erkennung
  (MTTD), zur Eindämmung (MTTC) und zur Wiederherstellung (MTTR) über echte Incidents und Übungen
  separat.
- **Nachweise.** Die Übung erzeugt dieselben Datensätze wie ein echter Incident (Datensatz, Uhren,
  Entwurfsberichte, Eindämmungsereignisse), gekennzeichnet als Übung. Ein Prüfer, der fragt "Können
  Sie rechtzeitig berichten?", erhält eine Abfrage über Übungsergebnisse, nicht ein Versprechen.

> **In der Praxis (illustrativ)**
> Eine vierteljährliche Tischübung bei einem großen Telekommunikationsunternehmen spielte ein
> Injektionsszenario gegen einen Kundenservice-Agent ab. Der erste Durchlauf dauerte 50 Minuten, um
> den Egress-Umfang des Agenten zu widerrufen, weil die einzige Person, die den Widerrufbefehl
> kannte, im Urlaub war. Die Lösung war ein einzeiliger Runbook-Eintrag und ein zweiter benannter
> Inhaber; der nächste Durchlauf dauerte vier Minuten. Der Übungsdatensatz mit beiden Zeitangaben
> ging als Nachweis für die Eindämmungskontrolle in den Assurance-Store.

## KI-spezifische Fehlermodi

Die meisten KI-Incidents sind Systemincidents, keine Modellincidents: Das Modell verhielt sich wie
Modelle es tun, und das System um es herum (Abruf, Tools, Prompts, Aufsicht) verwandelte dieses
Verhalten in Schaden. Die Tabelle benennt die Fehlermodi, die wiederkehren, das Signal, das sie
normalerweise erkennt, und den ersten Eindämmungsschritt.

| Fehlermodus | Wie es in der Produktion aussieht | Typisches Erkennungssignal | Erste Eindämmung |
|---|---|---|---|
| **Sprödigkeit** | Kleine, harmlose Eingabeänderungen erzeugen große Ausgabeänderungen; Out-of-Distribution-Eingaben unterbrechen das Verhalten | Spitze bei niedriger Konfidenz oder inkonsistenten Ausgaben; Beschwerden, die sich auf einen neuen Eingabetyp konzentrieren | Leiten Sie die betroffene Eingabeklasse an einen Fallback oder einen Menschen weiter |
| **Mangel an Robustheit** | Adversarische oder verrauschte Eingaben verschlechtern die Genauigkeit oder Sicherheit | Red-Team-Befund in der Produktion reproduziert; Guardrail-Hit-Rate-Änderung | Verschärfen Sie Eingabefilter; Rate-Limit das Muster |
| **Schlechte oder nicht repräsentative Daten** | Fehlerquoten unterscheiden sich nach Untergruppe; Abruf gibt veraltete oder falsche Dokumente zurück | Untergruppen-Metriken in der Überwachung; Grounding-Fehler | Setzen Sie die betroffene Entscheidungsklasse aus; pinnen Sie das letzte gute Corpus |
| **Drift** | Die Eingabeverteilung (Datendrift) oder die Eingabe-Ergebnis-Beziehung (Konzeptdrift) verschiebt sich nach der Bereitstellung | Verteilungstests gegen die Eval-Baseline; Ergebnis-Metriken | Erhöhen Sie den Anteil der menschlichen Überprüfung; Rollback oder Neutraining |
| **Prompt-Injection** | Anweisungen, die in Benutzereingaben oder in abgerufenem Inhalt verborgen sind, leiten das System um; OWASP listet es zuerst auf (`LLM01:2025`), direkt und indirekt [8] | Guardrail-Ereignisse; Tool-Aufrufe außerhalb der Aufgabe; ungewöhnlicher Egress | Widerrufen Sie den Tool-Umfang, den die Injection verwendet hat; quarantänen Sie das Quelldokument |
| **Tool-Missbrauch** | Ein Agent verwendet ein zulässiges Tool auf unbeabsichtigte oder schädliche Weise (`ASI02`}) [9] | Tool-Call-Volumen oder Parameter-Anomalien gegen den Registry-Umfang | Kill Switch auf dem Agent; Umfang einengen |
| **Halluzination mit Schaden** | Erfundene Fakten, Zitate, Richtlinien oder Dosierungen, auf die eine Person handelt | Beschwerden; nachgelagerte Korrektionen; Groundedness-Checks | Deaktivieren Sie die Antwortklasse; erfordern Sie Grounding oder ein Zitat |
| **Kaskadierende Fehler** | Der Fehler eines Agenten breitet sich durch andere aus (`ASI08`}) [9] | Korrelierte Fehler über Agenten, die ein Tool oder einen Speicher teilen | Unterbrechen Sie die Kette bei der gemeinsamen Komponente |
| **Rogue-Verhalten** | Ein Agent handelt außerhalb seines deklarierten Umfangs oder besteht, nachdem er stoppen sollte (`ASI10`}) [9] | Identitätsereignisse außerhalb des Geltungsbereichs; Aktivität nach Ablauf | Identität widerrufen; Widerruf überprüfen |

Es folgen zwei praktische Punkte. Erstens ist ein Fehlermodus bei der Triage eine *Hypothese* und
erst nach der Ursachenanalyse ein *Befund*; lassen Sie sich nicht von der ersten Bezeichnung
täuschen. Zweitens entspricht jede Zeile einem Test, der es früher hätte erkennen können (ein
adversarialer Fall, eine Subgruppen-Eval, ein Drift-Schwellenwert), weshalb die Nachbesprechung in
der Eval-Suite endet, nicht in einer Folie. Für Agenten erweitert Kapitel 23 die Tabelle in
[die Agent-Incident-Taxonomie](/bok/governing-agents#an-agent-incident-taxonomy).

## Grundursachenanalyse

Ursachenanalyse (RCA) beantwortet die Frage „Warum ist das passiert, und warum haben unsere
Kontrollen es nicht gestoppt?

### Wer nimmt teil

Führen Sie die Überprüfung als kleines **Incident-Review-Board** mit einem ständigen Kern und
eingeladenen Spezialisten durch:

- ein Moderator, der nicht in der Berichtslinie einer beteiligten Person steht;
- der Systemverantwortliche, der für die CAPA verantwortlich ist;
- der ML- oder Data-Engineer, der das Modell und seine Daten kennt;
- der KI-Governance-Engineer, der die Zuordnung von Ursache zu Kontrolle und zu Verpflichtung
  besitzt;
- Sicherheit, wenn ein Gegner oder eine Schwachstelle plausibel ist;
- der Datenschutzbeauftragte und die Rechtsabteilung, wenn personenbezogene Daten oder Rechte
  betroffen sind;
- jemand, der die betroffenen Personen vertritt (Kundenoperationen, ein Domänenexperte, ein
  Kliniker), damit der Schaden vom empfangenden Ende aus beschrieben wird.

Das Board trifft sich für jeden SEV-1- und SEV-2-Incident und nimmt Stichproben von SEV-3-Incidents
und Beinaheunfällen. Es entscheidet vier Dinge und dokumentiert jedes als Entscheidung: die
bestätigten Ursachen, die CAPA-Elemente und deren Verantwortliche, die Änderungen des
Risikoregisters und den Abschluss.

### Techniken

**Fünf Warum.** Fragen Sie, warum der Schaden passiert ist, dann warum das passiert ist, bis Sie
eine Ursache erreichen, die Sie ändern können. Es ist schnell, folgt aber einer Kette, während
KI-Fehler normalerweise mehrere beitragende Ursachen haben (eine Datenlücke *und* eine fehlende Eval
*und* ein Überwachungsschritt, der gummistempelte). Es neigt auch dazu, bei „menschlichem Fehler

**Fehlerbaumanalyse.** Beginnen Sie mit dem Top-Event (dem Schaden) und zerlegen Sie es durch UND-
und ODER-Gatter in die Bedingungen, die erfüllt sein mussten, damit es eintritt; IEC 61025
standardisiert die Methode [10]. Sie eignet sich gut für verwaltete KI-Systeme, da Kontrollen
geschichtet sind: Eine schädliche Ausgabe erreichte einen Kunden nur, wenn das Modell sie
produzierte UND der Output-Guardrail sie verfehlte UND keine menschliche Überprüfung angewendet
wurde. Der Baum zeigt, welche Schichten zusammen fehlgeschlagen haben und welche einzelne Reparatur
die Kette unterbrochen hätte.

**Schuldlose Nachbetrachtung.** Die Überprüfung sucht nach beitragenden Ursachen "ohne einzelne
Personen oder Teams anzuklagen", auf der Grundlage, dass Menschen vernünftig auf Basis ihres
Wissensstands handelten und dass man Systeme und Prozesse, aber nicht Menschen ändern kann [11].
Legen Sie die Auslöser für eine obligatorische Nachbetrachtung im Voraus fest (jede SEV-1 und SEV-2,
jede behördliche Einreichung, jedes Betätigen des Kill-Switch), damit das Schreiben einer
Nachbetrachtung Routine ist, keine Anschuldigung [11].

### Eine Ursachentaxonomie, die auf Kontrollen hinweist

Eine Ursachentaxonomie ist nur nützlich, wenn jede Klasse die Kontrolle benennt, die sie hätte
erkennen sollen. Codieren Sie jede bestätigte Ursache gegen eine oder mehrere dieser Klassen:

| Ursachenklasse | Was es bedeutet | Kontrolle, die es hätte erkennen sollen | Schicht | Muster |
|---|---|---|---|---|
| **Daten** | Schlechte Qualität, nicht repräsentative, veraltete oder vergiftete Trainings- oder Abrufdaten | Data Card, Herkunft, Datenqualitäts- und Bias-Tests | 02 · 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Modellgrenzen** | Sprödigkeit, mangelnde Robustheit, Halluzination, Fähigkeitsgrenzen | Fähigkeits- und Robustheitsevals; Red Team | 03 | [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) |
| **Drift** | Daten- oder Konzeptdrift nach der Bereitstellung | Überwachung gegen die Eval-Baseline; Umschulungsauslöser | 04 · 05 | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) |
| **Testlücke** | Zu wenig oder nicht repräsentatives Testen; eine Suite, die auf ihren eigenen Schwellenwert abgestimmt ist | Eval-Suite-Abdeckungsprüfung; Wartung adversarialer Fälle | 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Design oder Spezifikation** | Nicht ausgerichtetes Ziel, falsche Proxy-Metrik, fehlerhaftes Prompt- oder Workflow-Design | Design-Review; Policy-as-Code zur beabsichtigten Verwendung | 01 | [Policy Card](/patterns/policy-card) |
| **Integration und Tooling** | Übermäßiger Tool-Umfang, fehlende Vermittlung, gemeinsame Anmeldedaten | Scoped Identity; Tool-Call-Vermittlung | 04 | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) |
| **Adversarial** | Prompt-Injection, Jailbreak, Supply-Chain-Kompromiss | Red Team; Input- und Output-Guardrails; AIBOM | 03 · 04 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| **Überwachungsausfall** | Automatisierungsbias; ein Reviewer ohne Kontext, Zeit oder Autorität; kein Checkpoint | Gestaltete Überwachung mit gemessenen Überschreibungsraten | 04 | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **Änderungsmanagement** | Nicht überprüfte Modell-, Prompt- oder Config-Änderung; stilles Vendor-Update | Registry-Versionierung; Change Gate; Vendor-Benachrichtigungsbedingungen | 01 · 02 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| **Verwendung außerhalb des beabsichtigten Zwecks** | Bereitstellung über die Verwendung hinaus, für die das System bewertet wurde | [Aufnahme und Klassifizierung](/patterns/use-case-intake-risk-tiering); Betriebsanleitung | 01 · 02 | [Agent Registry](/patterns/agent-registry) |
| **Organisatorisch** | Kein Verantwortlicher, unklar Entscheidungsrechte, Alert-Fatigue, ungeschultes Personal | Betriebsmodell, RACI, Übungen | 05 | [Incident Pipeline](/patterns/incident-pipeline) |

Die Taxonomie ist nicht nur ein Lernwerkzeug; Regulatoren fordern sie ein. Die Berichtsvorlage der
Kommission für schwerwiegende Vorfälle bei KI-Modellen mit allgemeinem Verwendungszweck enthält ein
Feld für die Grundursache, das nach den Modellausgaben fragt, die zum Vorfall führten, und den
Faktoren dahinter, einschließlich der verwendeten Eingaben und etwaiger Ausfälle oder Umgehungen von
Systemrisiko-Minderungsmaßnahmen [12]. Der Abschlussbericht der NIS2 fragt nach "der Art der
Bedrohung oder Grundursache", die einen erheblichen Vorfall ausgelöst haben dürfte [13]. DORA geht
weiter: wiederkehrende Vorfälle, die einzeln unter der Schwelle für Großvorfälle liegen, zählen als
ein Großvorfall, wenn sie innerhalb von sechs Monaten mindestens zweimal mit derselben
offensichtlichen Grundursache auftreten und zusammen die Kriterien erfüllen [14]. Inkonsistente
Ursachenkodierung tut daher mehr als Ihre Statistiken zu verderben: unter DORA kann sie einen
meldepflichtigen Vorfall verbergen. Das OECD-Berichtsrahmenwerk behält seine eigenen
ursachenbezogenen Felder (ob der Vorfall mit den Trainingsdaten, mit dem KI-Modell oder mit der
Wechselwirkung mehrerer KI-Systeme verbunden ist), die dieselbe Kodierung ausfüllen kann [2].

> **Beispiel (illustrativ)** Ein Fehlerbaum für „diskriminierende Ablehnungen erreichten
> Antragsteller

## CAPA: vom Incident zum Risikoregister und zur Eval-Suite

**CAPA** (Korrektur- und Vorbeugungsmaßnahme) ist die Ausgabe der Überprüfung. Die Korrekturmaßnahme
behebt diese Instanz: Patch, Umschulung, Rollback, Neubereichung. Die Vorbeugungsmaßnahme
verhindert, dass die Fehlerklasse irgendwo in der Flotte erneut auftritt: ein neuer Eval-Fall für
jedes ähnliche System, eine Richtlinienänderung, ein Registry-Feld, das obligatorisch gemacht wird.
ISO/IEC 42001 platziert dies in Klausel 10.2 [4]; das NIST AI RMF fordert, dass Vorfälle und Fehler
an relevante KI-Akteure, einschließlich betroffener Gemeinschaften, kommuniziert werden und dass
Verfolgung und Reaktionsprozesse dokumentiert werden [7]. Für Hochrisiko-Anbieter fügt das
KI-Verordnung harte Kanten hinzu: Ein Anbieter, der Grund hat zu der Annahme, dass ein System nicht
konform ist, muss es sofort in Konformität bringen, zurückziehen, deaktivieren oder zurückrufen und
Distributoren und Betreiber informieren; wenn es ein Risiko darstellt, untersucht der Anbieter die
Ursachen mit dem meldenden Betreiber und informiert die Marktüberwachungsbehörde [3].

Jeder geschlossene Incident sollte fünf Artefakte hinterlassen:

1. **Eine Regressions-Eval.** Der Incident wird zu einem Testfall, der auf der Incident-Version
   fehlschlägt und auf der Reparatur besteht, verdrahtet in das
   [Eval Gate](/patterns/eval-gate-in-ci), damit der Fehler nicht unbemerkt wieder versendet werden
   kann.
2. **Eine Risikoregisteränderung.** Entweder ein neues Risiko oder ein neu bewertetes bestehendes,
   mit der Incident-ID angehängt. Der Link läuft in beide Richtungen: Der Incident-Datensatz listet
   die Risiken auf, die er realisiert hat, und der Risikoeintrag listet die Incidents auf, die ihn
   realisiert haben. Die Risikomethode selbst ist Kapitel 13,
   [Risikomanagement](/bok/risk-management#incidents-are-realised-risks).
3. **Eine Kontrolländerung** wo der Fehlerbaum eine fand: ein strafferes Guardrail, ein engerer
   Umfang, ein neuer Überwachungs-Checkpoint.
4. **Eine Playbook-Aktualisierung**, wenn die Reaktion selbst langsam oder unklar war.
5. **Ein Evidenzdatensatz** dass die CAPA überprüft wurde: die neue Eval besteht in CI, und die
   Runtime-Metrik ist für ein definiertes Fenster auf Baseline geblieben.

Zwei Querverweis halten die Verbindung zum Risikoregister ehrlich. Ein Risiko, das als „niedrige
Wahrscheinlichkeit

```json
{
  "capa_id": "CAPA-2026-041",
  "incident_id": "INC-2026-0918-01",
  "type": "preventive",
  "cause_codes": ["adversarial", "integration_and_tooling"],
  "action": "Add indirect-injection cases from quarantined documents to injection-resistance.v5",
  "owner": "team-support-platform",
  "due": "2026-10-02",
  "risk_ids": ["RISK-017"],
  "verification": { "eval_suite": "injection-resistance.v5", "result": "pending" }
}
```

Messen Sie die Schleife, nicht die Papierkram: Wiederholungsrate nach Ursachenklasse, CAPA-Elemente
geschlossen und rechtzeitig überprüft, der Anteil der Incidents, die eine Regressions-Eval
produzierten, und MTTD- und MTTC-Trends. Das sind realisierte Risikominderungszahlen; eine Anzahl
geschriebener Nachbesprechungen ist nicht.

## Betreiberpflichten: Anbieter informieren, Verwendung aussetzen

Die meisten Organisationen treffen auf KI-Incidents als **Betreiber** eines Systems, das jemand
anderes gebaut hat. Für Hochrisiko-Systeme setzt `Art. 26(5)` drei Pflichten [3]:

- **Überwachen** Sie den Betrieb des Systems auf der Grundlage der Betriebsanleitung und informieren
  Sie gegebenenfalls den Anbieter für seine Beobachtung nach dem Inverkehrbringen.
- **Informieren und aussetzen.** Wenn der Betreiber Grund hat zu der Annahme, dass die Verwendung
  des Systems wie angewiesen ein Risiko im Sinne von `Art. 79(1)` darstellen kann, informiert er den
  Anbieter oder Distributor und die Marktüberwachungsbehörde ohne unangemessene Verzögerung und
  setzt die Verwendung aus.
- **Schwerwiegende Vorfälle die Kette hinauf melden.** Wenn der Betreiber einen schwerwiegenden
  Vorfall identifiziert, informiert er sofort zuerst den Anbieter, dann den Importeur oder
  Distributor und die Marktüberwachungsbehörde. Wenn er den Anbieter nicht erreichen kann, gilt
  `Art. 73` für den Betreiber mutatis mutandis: Der Betreiber erbt die Meldungsfrist.

Zwei Ausnahmen gelten: Die Pflicht deckt keine sensiblen Betriebsdaten von
Strafverfolgungsbetreibern ab, und für Finanzinstitute wird die Überwachungspflicht als erfüllt
angesehen, wenn sie ihre internen Governance-Regeln gemäß Finanzdienstleistungsrecht einhalten [3].
Diese Pflichten gelten mit dem übrigen Hochrisiko-Regime, ab 2. Dezember 2027 für Annex-III-Systeme
nach dem Digital-Omnibus (siehe [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).

Jede Pflicht benötigt ein technisches Artefakt, und keines davon existiert standardmäßig:

| Pflicht | Artefakt | Wo es lebt |
|---|---|---|
| Überwachen gemäß der Betriebsanleitung | Überwachungs-Hooks für die Metriken, die die Anleitung des Anbieters benennt; Schwellenwerte als Code | Layer 04 |
| Anbieter informieren | Anbieter-Incident-Kontakt und Kanal im Registry-Eintrag; Vertragliche Benachrichtigungsbedingungen in Übungen getestet | Schicht 02 |
| Verwendung aussetzen | Ein getesteter Suspensionspfad für ein beschafftes System: Feature Flag, Datenverkehrswechsel zu einem menschlichen oder Legacy-Pfad | Layer 04 |
| Schwerwiegender Vorfall: Anbieter zuerst | Der Incident Record des Betreibers exportiert den Bericht für den Anbieter; Zeitstempel jeder Benachrichtigung | Layer 05 |
| Anbieter nicht erreichbar | Fallback-Uhr: die gleichen `Art. 73` Timer starten im eigenen Record des Betreibers | Layer 05 |
| Nachweise für die Untersuchung des Anbieters | Vom Betreiber verwaltete Protokolle mindestens sechs Monate lang aufbewahrt, länger während ein Vorfall offen ist [3] | Schichten 04 · 05 |

Suspension ist ein Kill Switch für ein System, das Sie nicht besitzen. Sie können die Gewichte eines
Anbieters nicht widerrufen, aber Sie können den Datenverkehr zu ihm stoppen; testen Sie, dass Sie
das können und wie lange es dauert, bevor Sie es brauchen. Die
[Incident Pipeline](/patterns/incident-pipeline#the-deployer-side-inform-the-provider-suspend-use)
erstellt die Betreiberseite. Das
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) ist der Ort, an dem
die bidirektionalen Benachrichtigungsbedingungen gehören: der Anbieter teilt Ihnen Vorfälle und
Korrekturmaßnahmen mit, die Ihre Bereitstellung beeinflussen, und Sie haben einen benannten Kanal,
um den Anbieter zu informieren. Die gleiche Logik läuft weiter oben in der Kette für GPAI: der Code
of Practice fordert Modellanbieter auf, nachgelagerten Anbietern, Modifizierern und Benutzern
mitzuteilen, wie sie schwerwiegende Vorfälle melden können, direkt oder dem AI Office [5].
Deployment-Governance insgesamt ist Kapitel 15,
[governing deployment](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance), dessen
[external communications plan](/bok/governing-deployment#external-communications) die
[notices](/patterns/disclosure-notification-pipeline) an Benutzer, betroffene Personen und Behörden
trägt.

## Die überlappenden Uhren

Ein Ereignis kann mehrere Uhren starten. Eine indirekte Prompt-Injection, die Kundendaten aus einem
Hochrisiko-KI-System, das von einer Bank betrieben wird, leckt, kann gleichzeitig ein
schwerwiegender Vorfall gemäß KI-Verordnung, eine Verletzung des Schutzes personenbezogener Daten
gemäß DSGVO und ein großer IKT-bezogener Vorfall gemäß DORA sein; bei einer nicht-finanziellen
wesentlichen Einrichtung könnte das gleiche Leck ein erheblicher Vorfall gemäß NIS2 sein. Jedes
Regime hat seinen eigenen Auslöser, Empfänger, Frist und Inhalt. Die Tabelle stellt sie
nebeneinander dar, Stand 2026-09-24.

| Regelwerk | Wer meldet | Auslöser | Erstmeldung | Folgmeldung und Abschlussmeldung | An wen |
|---|---|---|---|---|---|
| KI-Verordnung der EU `Art. 73` [3] | Anbieter eines Hochrisiko-Systems; der Betreiber, wenn der Anbieter nicht erreichbar ist | Schwerwiegender Vorfall (`Art. 3(49)`) | Unmittelbar bei einem Kausalzusammenhang oder dessen angemessener Wahrscheinlichkeit; spätestens 2 Tage (weit verbreitete Zuwiderhandlung oder kritische Infrastruktur), 10 Tage (Tod) oder 15 Tage (sonstiges) nach Kenntnis; eine unvollständige Erstmeldung ist zulässig | Untersuchung, Risikobewertung und Korrekturmaßnahme; keine Änderung des Systems vor Benachrichtigung der Behörden | Marktüberwachungsbehörde, wo es aufgetreten ist; das AI Office für Systeme unter seiner Zuständigkeit [15] |
| KI-Verordnung der EU `Art. 26(5)` [3] | Betreiber eines Hochrisiko-Systems | Schwerwiegender Vorfall; oder Grund zu der Annahme, dass das System ein Risiko darstellt | Schwerwiegender Vorfall: unmittelbar, Anbieter zuerst; Risiko: ohne unangemessene Verzögerung, plus Suspension | Zusammenarbeit mit der Untersuchung des Anbieters | Anbieter, dann Einführer oder Händler, und die Marktüberwachungsbehörde |
| KI-Verordnung der EU `Art. 55(1)(c)` mit Code of Practice Commitment 9 [5][16] | Anbieter eines GPAI-Modells mit systemischem Risiko | Schwerwiegender Vorfall, an dem das Modell beteiligt ist | Ohne unangemessene Verzögerung; gemäß Code: 2 Tage (kritische Infrastruktur), 5 Tage (schwerwiegender Cybersicherheitsverstoß), 10 Tage (Tod), 15 Tage (Gesundheit, Rechte, Eigentum, Umwelt) | Zwischenmeldung mindestens alle vier Wochen während der Ungelöstheit; Abschlussmeldung innerhalb von 60 Tagen nach Lösung | AI Office und, soweit zutreffend, nationale Behörden |
| GDPR `Art. 33` [17] | Verantwortlicher (der Auftragsverarbeiter benachrichtigt den Verantwortlichen ohne unangemessene Verzögerung) | Verletzung des Schutzes personenbezogener Daten, es sei denn, es ist unwahrscheinlich, dass ein Risiko entsteht | Ohne unangemessene Verzögerung und, soweit möglich, innerhalb von 72 Stunden nach Kenntnis; Gründe erforderlich, wenn später | Informationen können in Phasen bereitgestellt werden; jede Verletzung dokumentiert | Aufsichtsbehörde |
| GDPR `Art. 34` [17] | Verantwortlicher | Verletzung, die wahrscheinlich zu einem hohen Risiko führt | Ohne unangemessene Verzögerung | Keine festgelegt | Betroffene Personen |
| NIS2 `Art. 23` [13] | Wesentliche und wichtige Einrichtungen | Erheblicher Vorfall | Frühwarnung innerhalb von 24 Stunden; Incident Notification innerhalb von 72 Stunden | Zwischenmeldung auf Anfrage; Abschlussmeldung innerhalb eines Monats nach der Benachrichtigung | CSIRT oder zuständige Behörde |
| DORA `Art. 19` mit RTS 2025/301 [18][19] | Finanzeinrichtungen | Großer IKT-bezogener Vorfall | Innerhalb von 4 Stunden nach Klassifizierung als groß, und spätestens 24 Stunden nach Kenntnis; wenn als groß klassifiziert erst nach diesen 24 Stunden, innerhalb von 4 Stunden dieser Klassifizierung | Zwischenmeldung innerhalb von 72 Stunden nach der Erstbenachrichtigung; Abschlussmeldung innerhalb eines Monats nach der letzten Zwischenmeldung | Finanzielle zuständige Behörde |
| Cyber Resilience Act `Art. 14` [20] | Hersteller von Produkten mit digitalen Elementen | Aktiv ausgenutzte Sicherheitslücke; schwerwiegender Vorfall, der die Produktsicherheit beeinträchtigt | Frühwarnung innerhalb von 24 Stunden; Benachrichtigung innerhalb von 72 Stunden | Abschlussmeldung 14 Tage nach Verfügbarkeit eines Fixes (Sicherheitslücke) oder einen Monat nach Benachrichtigung (Vorfall) | Koordinierendes CSIRT und ENISA, über die einzige Meldeplattform |
| California SB 53 [21] | Frontier-Entwickler (alle, nicht nur große Frontier-Entwickler) | Kritischer Sicherheitsvorfall | Innerhalb von 15 Tagen nach Entdeckung; innerhalb von 24 Stunden, wenn ein unmittelbares Risiko von Tod oder schwerwiegender Körperverletzung besteht | Keine hier festgelegt | Office of Emergency Services; bei unmittelbarem Risiko, eine zuständige Behörde |
| New York RAISE Act [22][23] | Frontier-Entwickler (Modelle trainiert über 10^26 Operationen; alle, nicht nur große Frontier-Entwickler) | Kritischer Sicherheitsvorfall | Innerhalb von 72 Stunden nach einer Feststellung oder nach Kenntnis von Fakten, die einen angemessenen Verdacht stützen; innerhalb von 24 Stunden, wenn ein unmittelbares Risiko von Tod oder schwerwiegender Körperverletzung besteht; wirksam ab 1. Jan. 2027 | Keine hier festgelegt | Aufsichtsbehörde innerhalb des Department of Financial Services; bei unmittelbarem Risiko, eine Strafverfolgungs- oder öffentliche Sicherheitsbehörde mit Zuständigkeit |
| OECD-Framework für gemeinsame Berichterstattung [2] | Freiwillig | KI-Vorfall oder Gefahr | Keine Uhr | 29 Kriterien über acht Dimensionen | Keine Meldepflicht; ein gemeinsames Schema |

### Lesen der Tabelle

**Die Auslöser sind nicht das gleiche Ereignis.** DSGVO, NIS2, die CRA und `Art. 73` zählen ab
*Kenntnis*. DORAs Vier-Stunden-Uhr zählt ab *Klassifizierung* als groß, mit einer äußeren Grenze von
24 Stunden ab Kenntnis; eine Klassifizierung nach diesen 24 Stunden startet ihre eigene
Vier-Stunden-Uhr (`Art. 5(2)` von RTS 2025/301) [19]. `Art. 73` fordert auch den Bericht
*unmittelbar*, sobald ein Kausalzusammenhang oder dessen angemessene Wahrscheinlichkeit festgestellt
ist, wobei die Tageszahlen als äußere Grenzen gelten [3]. RAISE zählt ab einer *Feststellung* oder
einem *angemessenen Verdacht* [23]. Ein Incident Record benötigt daher einen Zeitstempel pro
Auslöser, nicht einen "geöffnet um": erstes Signal, Kenntnisentscheidung, Klassifizierung pro
Regime, Kausalzusammenhang festgestellt, und jede Einreichung.

**Einige Regime verweisen auf andere.** NIS2 tritt zurück, wenn ein sektorspezifisches Unionsgesetz
mindestens gleichwertige Incident-Benachrichtigung vorschreibt, wie DORA die NIS2-Berichterstattung
für Finanzunternehmen verdrängt [13]. Die KI-Verordnung verengt sich auf ähnliche Weise: für
Annex-III-Systeme, deren Anbieter bereits unter gleichwertigen Unionsberichterstattungspflichten
stehen, und für KI in Medizinprodukten, ist die `Art. 73`} Berichterstattung auf
Grundrechtsverletzungen beschränkt (`Art. 3(49)(c)`}) [3]. Nach einer Zusammenfassung einer
Anwaltskanzlei des Entwurfs der Leitlinien der Kommission gilt der Entwurf dies für Sektoren wie
NIS2-kritische Infrastruktur [24]. Welche Regime als "gleichwertig" für ein bestimmtes System
gelten, ist eine rechtliche Entscheidung; zeichnen Sie sie pro System im Register auf, nicht pro
Incident unter Druck.

**Daten ändern sich.** Vier Punkte, um vor der Verwendung der Tabelle erneut zu überprüfen, alle
Stand 2026-09-24:

- Das Hochrisiko-Regime gilt für Annex-III-Systeme ab 2. Dezember 2027 und für Annex-I-Systeme ab 2.
  August 2028, nachdem das Digital-Omnibus-Paket Kapitel III, Abschnitte 1 bis 3 verschoben hat
  (`Art. 113(c)`) [34]. `Art. 73` befindet sich in Kapitel IX und wurde selbst nicht verschoben,
  erreicht ein System aber nur, wenn `Art. 6` es als hochriskant einstuft, daher folgt es in der
  Praxis denselben Daten (mit Rechtsberater überprüfen); die GPAI-Pflichten in `Art. 55` gelten
  bereits (siehe [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- Das Omnibus ließ die {`Art. 73`} Fristen unverändert, fügte aber {`Art. 75(1a)`} hinzu: Anbieter
  von Hochrisiko-Systemen unter der ausschließlichen Zuständigkeit des AI Office (grob gesagt,
  Systeme, die auf dem eigenen GPAI-Modell des Anbieters aufgebaut sind, und Systeme in sehr großen
  Online-Plattformen oder Suchmaschinen) melden schwerwiegende Vorfälle dem AI Office {[15][25]}.
- Die Kommission veröffentlichte Entwurfsleitlinien {`Art. 73`} und eine Meldevorlage am 26. Sep.
  2025, abgestimmt mit dem Incidents Monitor und dem Common Reporting Framework der OECD {[26]}. Ob
  die endgültige Leitlinie seitdem angenommen wurde, wird hier nicht bestätigt (überprüfen).
- Ein separater Digital-Omnibus-Vorschlag (COM(2025) 837) würde die GDPR-Benachrichtigung bei
  Verletzungen ändern und einen einzigen Einstiegspunkt für Incident-Berichte hinzufügen. Er ist
  eingereicht, nicht angenommen: Nach der Aktualisierung des Parlaments vom 1. August 2026 wurden
  Änderungen diskutiert und das Mandat des Rates war ins Stocken geraten [27]. Kommentatoren
  berichten von einer längeren GDPR-Frist, die auf hochriskante Verletzungen begrenzt ist
  (überprüfen). Die 72-Stunden-Regel bleibt bestehen; Kapitel 19 behandelt
  [KI-spezifische Datenschutzverletzungen und die 72-Stunden-Uhr](/bok/privacy-and-ai#ai-specific-privacy-breaches).
- Außerhalb der EU unterscheiden sich die Uhren erneut: Kapitel 21 legt die
  [Incident-Uhren über Regime hinweg](/bok/ai-laws-worldwide#incident-clocks-across-regimes) dar.

### Ein Record, viele Berichte

Die technische Antwort auf überlappende Uhren ist kein besserer Kalender. Es ist ein Incident
Record, der die Fakten einmal hält, und ein Generator pro Regime, der den Bericht rendert, den
dieses Regime will, jeweils mit seiner eigenen Uhr. Die Uhren leben im Record, und die Pipeline
warnt bei der nächsten Frist:

```json
{
  "incident_id": "INC-2026-0918-01",
  "clocks": [
    { "regime": "gdpr_art33", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "due_at": "2026-09-21T15:02:00Z", "status": "submitted",
      "submitted_at": "2026-09-20T10:40:00Z" },
    { "regime": "nis2_art23", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "status": "not_applicable",
      "rationale": "not significant under Art. 23(3); signed off by security IR lead" },
    { "regime": "ai_act_art73", "status": "not_applicable",
      "rationale": "csa-01 is not a high-risk system (registry class: limited risk)" }
  ]
}
```

Eine "nicht anwendbar"-Entscheidung ist auch Nachweis. Schreiben Sie sie mit ihrer Begründung und
ihrem Eigentümer auf; die Frage, die eine Behörde ein Jahr später stellt, ist normalerweise "warum
haben Sie nicht gemeldet?", und die Antwort sollte ein Record sein, nicht eine Erinnerung.

> **In der Praxis (illustrativ)**
> Beim Replay eines realistischen Szenarios auf `csa-01`, dem Kundenservice-Assistenten aus
> [Kapitel 04](/bok/the-stack#one-system-through-the-five-layers): Eine Bestellnotiz mit versteckten
> Anweisungen veranlasste den Assistenten, die Lieferadresse eines anderen Kunden in eine Antwort
> einzubeziehen. Das Guardrail protokollierte, blockierte aber die Ausgabe nicht. Triage setzte
> SEV-2 (personenbezogene Daten an Dritte offengelegt) und führte die Regime durch. GDPR `Art. 33`:
> meldepflichtig, 72-Stunden-Uhr ab der Bewusstseinsentscheidung des Datenschutzbeauftragten. GDPR
> `Art. 34`: nicht hochriskant für den betroffenen Kunden nach den Fakten, Entscheidung
> dokumentiert. NIS2: Telekommunikationsanbieter fallen als digitale Infrastruktur in den
> Geltungsbereich [13], aber eine Offenlegung eines einzelnen Datensatzes war nicht erheblich,
> Feststellung dokumentiert. AI Act `Art. 73`: kein hochriskantes System, daher keine Uhr; der
> Incident ging dennoch an den Modellprovider über seinen Downstream-Reporting-Kanal. Die
> GDPR-Benachrichtigung verließ in 44 Stunden, generiert aus demselben Datensatz, den die
> Root-Cause-Überprüfung später verwendete.

## Der Incident Record

Entwerfen Sie den Datensatz einmal, basierend auf dem, was die anspruchsvollsten Empfänger fordern,
und jeder andere Bericht wird zu einer Projektion davon. Die Seite mit den Vorlagen enthält die
[Felder des Incident-Datensatzes](/resources/templates#schema-incident-record) als JSON-Schema mit
einem ausgefüllten Beispiel. Zwei öffentliche Schemata setzen den Standard. Die Vorlage der
Kommission für GPAI-Vorfälle verlangt zehn Punkte: Start- und Enddatum, der resultierende Schaden
und die Opfer oder betroffene Gruppe, die Abfolge der Ereignisse, das beteiligte Modell, die
verfügbaren Nachweise, die Reaktion des Anbieters, seine Empfehlung an die Behörden, eine
Ursachenanalyse, Muster aus der Beobachtung nach dem Inverkehrbringen einschließlich Beinahe-Unfälle
und Informationen zum Einreicher [12]. Das gemeinsame Berichtsrahmenwerk der OECD definiert 29
Kriterien in acht Dimensionen (Metadaten, Schadensdetails, Menschen und Umwelt, wirtschaftlicher
Kontext, Daten und Eingaben, KI-Modell, Aufgabe und Ausgabe, sonstige Informationen) [2].

| Feldgruppe | Datensatzfelder | Vorlage der Kommission für GPAI [12] | Berichtsrahmenwerk der OECD [2] | Gefüllt aus |
|---|---|---|---|---|
| Identität | `incident_id`, Titel, Beschreibung, Systeme und Versionen, Registrierungs-IDs, Organisationen, die entwickelt und bereitgestellt haben | Beteiligtes Modell; Einreicher | Titel; Beschreibung; Name und Version; Organisationen; Einreicher | Registrierung (Schicht 02) |
| Zeit | `first_signal_at`, `aware_at`, `started_at`, `ended_at`, pro Regime Auslöser und Einreichungszeiten | Start- und Enddatum | Datum des ersten bekannten Auftretens | Spuren; Pipeline |
| Schaden | Schweregrad, Schadenstyp, Quantifizierung, betroffene Gruppen, Länder, Auswirkungen auf Rechte | Resultierender Schaden und Opfer | Schweregrad; Schadenstyp; Quantifizierung; betroffene Interessenträger; Auswirkungen auf Menschenrechte; Länder | Triage; Datenschutzbeauftragter; Rechtliches |
| Kontext | Branche, Geschäftsfunktion, Link zu kritischer Infrastruktur, Umfang der Bereitstellung, Aufgabe, Autonomiestufe | Abfolge der Ereignisse | Branche; Geschäftsfunktion; kritische Infrastruktur; Umfang der Bereitstellung; Aufgabe; Autonomiestufe | Registrierung; Intake-Datensatz |
| Ursache | Fehlermodus-Hypothese, bestätigte Ursachencodes, Link zu Trainingsdaten, Modell oder Multi-System-Interaktion, Missbrauch | Ursachenanalyse; Muster nach dem Inverkehrbringen und Beinahe-Unfälle | Link zu Trainingsdaten; Link zu Modell; Multi-System-Interaktion; unbeabsichtigte oder rechtswidrige Nutzung | Überprüfungsgremium |
| Evidenz | Trace-IDs, Snapshots, Guardrail-Ereignisse, Begleitmaterial | Verfügbare Nachweise | Begleitmaterial; Schritte zur Reproduktion | Schichten 04 · 05 |
| Reaktion | Eindämmungsmaßnahmen, Korrekturmaßnahmen, CAPA-IDs, Empfehlung an Behörden | Reaktion; Empfehlung | Ergriffene Maßnahmen | Incident Commander; CAPA |
| Uhren | Ein Eintrag pro Regime: Anwendbarkeit, Begründung, Eigentümer, Fälligkeitsdatum, eingereicht | Nicht in der Vorlage | Nicht im Rahmenwerk | Pipeline |
| Links | Risiko-IDs, hinzugefügte Eval-IDs, verwendetes Playbook | Nicht in der Vorlage | Nicht im Rahmenwerk | Risikoregister; Eval-Suite |

Speichern Sie den Datensatz als strukturierte Daten im Assurance-Store und geben Sie seine
kontrollrelevanten Teile als maschinenlesbare Nachweise aus: CAPA-Elemente werden natürlicherweise
auf einen `OSCAL` Plan of Action and Milestones (`POA&M`) abgebildet, den nativen Ort des Modells
für offene Erkenntnisse und deren Behebung [28]. Das ist das Muster
[Machine-Readable Evidence](/patterns/machine-readable-evidence-oscal) angewendet auf Vorfälle, und
es ermöglicht einem Auditor, "alle SEV-2-Vorfälle in Q3 mit offenen CAPAs" abzufragen, anstatt um
eine Tabelle zu bitten.

## Lernen aus öffentlichen Incident-Datenbanken

Ihre eigene Incident-Historie ist klein und verzerrt in Richtung dessen, was Sie bereits erkennen.
Öffentliche Repositories erweitern sie, solange Sie wissen, was sie sind. Diese Website bietet zwei
kuratierte Ausgangspunkte: die [Incident-Fälle, die als Post-Mortems geschrieben sind](/cases) und
der [Harms Atlas](/resources/harms), der Schäden nach Ebene auf die Kontrolle abbildet, die jeden
erfasst.

- **AI Incident Database (AIID).** Betrieben vom Responsible AI Collaborative, indiziert sie Schäden
  und Beinahe-Schäden aus bereitgestellter KI, nach Art von Luftfahrt- und
  Computersicherheits-Incident-Datenbanken. Sie klassifiziert Vorfälle mit mehreren Taxonomien (die
  CSET AI Harm Taxonomy, eine Goals, Methods and Failures Taxonomy und das MIT AI Risk Repository)
  und bietet vollständige Datenbank-Snapshots zum Download [29].
- **OECD AI Incidents and Hazards Monitor (AIM).** Ein automatisierter Monitor für KI-Vorfälle und
  -Gefahren, die in den Nachrichtenmedien gemeldet werden, der Vorfälle und Gefahren nach
  OECD-Definitionen trennt [30].
- **AIAAIC Repository.** Ein unabhängiges Register von Vorfällen und Kontroversen mit KI,
  Algorithmen und Automatisierung in Sektoren von Gesichtserkennung bis zu automatisierter
  Einstellung [31].
- **MIT AI Risk Repository.** Keine Incident-Datenbank, sondern ein strukturierter Katalog von
  KI-Risiken mit kausalen und Domänentaxonomien, nützlich um zu überprüfen, dass Ihre
  Ursachentaxonomie und Ihr Risikoregister keine blinden Flecken haben [32].

Nutzen Sie sie auf vier Wegen. **Seed das Risikoregister**: Ziehen Sie die für Bereitstellungen wie
Ihre aufgezeichneten Vorfälle und überprüfen Sie, dass jeder ein entsprechendes Risiko hat.
**Schreiben Sie die Eval vor dem Vorfall**: Verwandeln Sie einen öffentlichen Vorfall in einen
Testfall gegen Ihr System, speisen Sie die [Red-Team-Suite](/patterns/adversarial-red-team-suite)
zusammen mit dem MITRE ATLAS-Technikkatalog [33]. **Kalibrieren Sie die Schweregrad-Skala**:
Überprüfen Sie, dass echte Vorfälle dort landen, wo Ihre Schadenstests sagen, dass sie sollten.
**Speisen Sie GPAI-Monitoring**: Der Code of Practice listet Incident-Datenbanken unter den Quellen
auf, die Anbieter überprüfen sollten [5].

Kennen Sie die Grenzen. Mediengestützte Sammlungen überrepräsentieren das Nachrichtenrelevante, das
Verbraucherseitige und das Englischsprachige; ein Ereignis kann mehrmals erscheinen; und keine gibt
Basisraten. Nutzen Sie sie, um Fehlermodi zu finden, die Sie sich nicht vorgestellt haben, nicht um
zu schätzen, wie oft Ihre auftreten werden. Die Leseliste hält die aktuellen Links unter
[Incident- und Risiko-Repositories](/bok/reading-list#incident-and-risk-repositories-the-empirical-record).

## Was Sie diese Woche tun können

1. **Schreiben Sie die Schweregrad-Skala als Richtlinie.** Fünf Ebenen, ein Schadenstest pro Ebene,
   die Regime-Auslöser pro Ebene; führen Sie Ihre letzten drei Vorfälle durch und beheben Sie die
   Regeln, bis die Ergebnisse dem entsprechen, was Sie von Hand entscheiden würden.
2. **Fügen Sie die Zeitstempel hinzu.** Geben Sie jedem Incident-Ticket `aware_at` eine
   Pro-Regime-Anwendbarkeitsflagge mit Eigentümer und Begründung und eine Fälligkeitszeit pro Uhr.
   Füllen Sie die offenen Vorfälle aus.
3. **Führen Sie ein Tischplattenszenario durch.** Indirekte Prompt-Injection gegen Ihren am meisten
   verbundenen Assistenten: Ziehen Sie den Kill Switch, bewahren Sie die Nachweise, entwerfen Sie
   die GDPR-Benachrichtigung. Notieren Sie die Zeiten.
4. **Testen Sie den Suspensionspfad für ein beschafftes System.** Bestätigen Sie, dass der
   Incident-Kontakt des Anbieters im Registrierungseintrag vorhanden ist und dass Sie den
   Datenverkehr zum System stoppen können, und messen Sie, wie lange es dauert.
5. **Codieren Sie drei vergangene Ereignisse.** Weisen Sie Ursachenklassen aus der Taxonomie Ihren
   letzten drei Vorfällen oder Beinahe-Unfällen zu und fügen Sie eine Regressions-Eval für jeden
   hinzu.

**Zuordnung:** EU AI Act Art. 3(49), 20, 26(5)–(6), 55(1)(c), 72, 73, 75(1a) · GPAI Code of
Practice, Safety and Security Commitment 9 · GDPR Arts. 33–34 · NIS2 Art. 23 · DORA Art. 19 · Cyber
Resilience Act Art. 14 · ISO/IEC 42001 (clause 10.2, Annex A.8) · NIST AI RMF (Manage 2.4, 4.1, 4.3)
· NIST SP 800-61r3 · OWASP LLM01:2025, Agentic ASI02/ASI08/ASI10 · Schicht 04 Runtime Controls &
Observability · Schicht 05 Assurance & Continuous Compliance. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] "Name it to tame it: defining AI incidents and hazards" (Luis Aranda and Karine Perset; summary of the OECD paper "Defining AI incidents and related terms", OECD Artificial Intelligence Papers, doi 10.1787/d1a8d965-en; AI incident and AI hazard definitions; graded terms serious AI incident, AI disaster, serious AI hazard). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[2] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; 29 criteria in eight dimensions; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 3(49) serious incident; Art. 3(61) widespread infringement; Art. 20 corrective actions and duty of information; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 73 reporting of serious incidents (2, 10 and 15 days; incomplete initial report; no altering the system before informing authorities; limits in Art. 73(9)–(10)). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action; Annex A.8 information for interested parties). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[5] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 serious incident reporting (Measure 9.1 identification sources and informing third parties of direct reporting channels, if available; 9.2 information incl. near misses; 9.3 timelines of 2, 5, 10 and 15 days, intermediate reports at least every four weeks, final report within 60 days of resolution; 9.4 retention of at least five years). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[6] NIST SP 800-61r3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (supersedes SP 800-61r2; previous life-cycle phases mapped to CSF 2.0 functions). NIST. 2025-04. https://csrc.nist.gov/pubs/sp/800/61/r3/final (verified: primary)
[7] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring incl. incident response; MANAGE 4.3 incidents and errors communicated, processes followed and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[8] LLM01:2025 Prompt Injection (direct and indirect prompt injection). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[9] Top 10 for Agentic Applications 2026 (ASI02 Tool Misuse; ASI08 Cascading Failures; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[10] IEC 61025:2006, Fault tree analysis (FTA), edition 2.0 (IEC TC 56 Dependability). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template under Art. 55(1)(c) and Commitment 9; ten fields from start and end dates to root-cause analysis, near-miss patterns and submitter). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[13] Directive (EU) 2022/2555 (NIS2) of 14 December 2022: Art. 4 sector-specific Union acts; Art. 23 reporting obligations (significant incident; early warning within 24 hours; notification within 72 hours; final report within one month incl. type of threat or root cause); Annex I digital infrastructure incl. providers of public electronic communications networks and services. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[14] Commission Delegated Regulation (EU) 2024/1772, RTS on the classification of ICT-related incidents under DORA (Art. 8: major incidents; recurring incidents with the same apparent root cause, occurring at least twice within six months, count as one major incident). Publications Office of the EU (EUR-Lex). 2024-03-13. https://eur-lex.europa.eu/eli/reg_del/2024/1772/oj/eng (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 75 (Art. 75(1a), inserted by Reg. (EU) 2026/1744: serious incidents of high-risk systems under the AI Office's competence reported to the AI Office, Art. 73(2) to (9) applying mutatis mutandis; Art. 73 deadlines unchanged). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_75 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 55 (GPAI models with systemic risk; Art. 55(1)(c) keep track of, document and report serious incidents to the AI Office without undue delay). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_55 (verified: primary)
[17] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 33 notification of a personal data breach to the supervisory authority (72 hours where feasible; processor to controller; phased information; documentation) and Art. 34 communication to the data subject (high risk). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[18] Regulation (EU) 2022/2554 (DORA) of 14 December 2022: Art. 3(8) ICT-related incident; Art. 19 reporting of major ICT-related incidents. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[19] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5(1): initial notification within 4 hours of classification and no later than 24 hours from awareness; Art. 5(2): within 4 hours of a classification made after those 24 hours; intermediate within 72 hours; final within one month); report templates in Commission Implementing Regulation (EU) 2025/302. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[20] Regulation (EU) 2024/2847 (Cyber Resilience Act) of 23 October 2024: Art. 14 reporting obligations of manufacturers (24-hour early warning; 72-hour notification; final report 14 days after a fix or one month after notification; CSIRT and ENISA via the single reporting platform); Art. 71(2) Art. 14 applies from 11 Sep 2026. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[21] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025; approved 29 Sep 2025; Bus. & Prof. Code 22757.13(c): critical safety incidents reported by any frontier developer, not only a large frontier developer, to the Office of Emergency Services within 15 days, or within 24 hours to an appropriate authority on imminent risk of death or serious physical injury). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[22] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; 72-hour safety incident disclosure). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[23] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment; all frontier developers, not only large frontier developers, report a critical safety incident within 72 hours of a determination or reasonable belief to the DFS office; 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[24] "European Commission Publishes Draft Guidance on Reporting Serious AI Incidents" (indirect causation; simplified Art. 73 reporting where equivalent sector obligations apply, limited to fundamental-rights infringements). Latham & Watkins. 2025-10-28. https://www.lw.com/en/insights/european-commission-publishes-draft-guidance-reporting-serious-ai-incidents (verified: secondary)
[25] "EU AI Act Update: Digital Omnibus Finalizes 8 Compliance Changes" (AI Office exclusive competence over AI systems built on the same provider's GPAI model and over systems in very large online platforms and search engines; serious-incident reports from those providers go to the AI Office). Orrick. 2026-07-29. https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes (verified: secondary)
[26] "AI Act: Commission issues draft guidance and reporting template on serious AI incidents, and seeks stakeholders' feedback" (published 26 Sep 2025; feedback until 7 Nov 2025; alignment with the OECD AI Incidents Monitor and Common Reporting Framework). European Commission. 2025-09-26. https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks (verified: primary)
[27] Legislative Train Schedule: The Digital Omnibus Regulation Proposal (COM(2025) 837; status tabled; single reporting point for cybersecurity and data incidents; co-rapporteurs' draft report 22 Jun 2026; Council mandate vote cancelled 26 Jun 2026; page updated 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[28] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[29] AI Incident Database (harms and near harms from deployed AI; CSET, GMF and MIT taxonomies; database snapshots). Responsible AI Collaborative. 2026. https://incidentdatabase.ai/ (verified: primary)
[30] OECD.AI Incidents and Hazards Monitor (AIM; automated monitor of news media; incidents and hazards distinguished). OECD. 2026. https://oecd.ai/en/incidents (verified: primary)
[31] AIAAIC Repository (independent register of AI, algorithmic and automation incidents and controversies). AIAAIC. 2026. https://www.aiaaic.org/aiaaic-repository (verified: primary)
[32] MIT AI Risk Repository (living database of AI risks; causal and domain taxonomies). MIT FutureTech. 2026. https://airisk.mit.edu/ (verified: primary)
[33] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 113 (Art. 113(c) as amended by Reg. (EU) 2026/1744: Chapter III, Sections 1 to 3, apply from 2 Dec 2027 for Annex III systems and from 2 Aug 2028 for Annex I systems; Chapter IX, Art. 73 included, is not listed among the postponed provisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_113 (verified: primary)
