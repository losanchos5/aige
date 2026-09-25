---
lang: de
source: bok/patterns/incident-pipeline.md
sourceHash: "73905c623ed3c25ee83609d31bb598c906bf81f6ad4ee22eecc3578ec1aff46d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "Die Infrastruktur, die schwerwiegende KI-Incidents innerhalb des rechtlichen Zeitfensters erkennt, triage und meldet, mit codierten, nicht erinnerten Zeitplänen und Vorlagen."
---

# Muster: Incident Pipeline

**Zusammenfassung:** Bauen Sie die Infrastruktur auf, um schwerwiegende KI-Incidents pünktlich zu
erkennen, zu triage und zu melden, mit Meldefristen und Vorlagen, die codiert statt erinnert werden.
Für Hochrisiko-Systeme umfasst dies die Meldung schwerwiegender Incidents nach KI-Verordnung Artikel
73; für GPAI-Modelle umfasst dies die Meldung systemischer Incidents, die der Verhaltenskodex
erwartet [1]. Dieselbe Pipeline dient dem Betreiber eines Systems, das jemand anderes gebaut hat:
Sie teilt dem Anbieter mit, setzt die Verwendung aus, wenn das System ein Risiko darstellt, und hält
die Meldefrist, wenn der Anbieter nicht erreichbar ist.

## Ziele
Verwandeln Sie ein Laufzeitsignal in eine gemeldete Verpflichtung innerhalb des rechtlichen
Zeitfensters, und erstellen Sie den Incident-Datensatz als strukturierten Nachweis. Halten Sie
Probleme und Incidents auseinander, ordnen Sie Schweregrad auf einer geschriebenen Skala, finden Sie
die Ursache ohne Schuldzuweisung, und speisen Sie jeden geschlossenen Incident zurück in die
Kontrollen.

## Zielbenutzer
KI-Governance-Engineer, Sicherheits-/Incident-Responder, Recht/Compliance, Datenschutzbeauftragter,
der Anbieterverbindungsbeamte eines Betreibers.

## Betroffene Stakeholder
Regulatoren, betroffene Personen, Betreiber, Anbieter, Modellinhaber.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; beginnen Sie mit einem
benannten Fehlermodus oder Schaden.

## Kontext
Ein Hochrisiko- oder GPAI-System in Produktion, das Meldepflichten für schwerwiegende Incidents
unterliegt, wobei die Erkennung in der Technik lebt und die Meldung in der Rechtswissenschaft lebt,
ohne Verbindung zwischen ihnen. Die meisten Organisationen treffen KI-Incidents als Betreiber eines
beschafften Systems, sodass die Pipeline für ein Modell, das sie nicht besitzen, genauso
funktionieren muss wie für eines, das sie gebaut haben.

## Problem
Wenn ein Incident erkannt wird, startet die Uhr. Wenn Erkennung, Triage und Meldung getrennte
manuelle Schritte sind, wird die Frist verpasst und der Nachweis dessen, was passiert ist, wird
nachträglich rekonstruiert. Ein einzelnes "Prioritäts"-Feld, das von der Technik auf eine Weise und
von der Rechtswissenschaft auf eine andere gelesen wird, verbirgt die
Meldungsfähigkeitsentscheidung, und eine Nachbesprechung, die nach jemandem zum Beschuldigen sucht,
lehrt Menschen, weniger zu melden.

## Lösung
Verbinden Sie die Laufzeiterkennung (aus Observability und Guardrails) mit einem Triage-Workflow,
der Schweregrad klassifiziert und bei einem meldepflichtigen Ereignis den Bericht gegen die
erforderliche Vorlage entwirft und den gesetzlichen Timer startet. Codieren Sie die KI-Verordnung
Art. 73 Zeitpläne und den Art. 72 Post-Market-Monitoring-Feed [2]; halten Sie den Incident-Datensatz
als maschinenlesbaren Nachweis. Die fünf Schritte unten sind die Teile, die in der Praxis am
häufigsten fehlschlagen; [Kapitel 17](/bok/incidents) behandelt jeden in der Tiefe.

> **Beispiel (illustrativ)** Ein Guardrail kennzeichnet einen Datenexfiltrationversuch über ein
> Agent-Tool; die Pipeline klassifiziert ihn, öffnet einen Incident mit dem Art. 73 Timer laufend,
> und füllt den Bericht aus der Trace und dem Registereintrag vor.

### Problem oder Incident: zwei Warteschlangen, ein Datensatztyp

Ein **Problem** ist ein Mangel oder eine Kontrollschwäche ohne dahinterliegendes Ereignis: eine
Eval, die sich in der Staging-Umgebung verschlechtert hat, eine Drift-Warnung, eine Model Card, die
nicht mehr mit der bereitgestellten Version übereinstimmt. Es geht in ein Problemprotokoll mit einem
Verantwortlichen und einem Fälligkeitsdatum, und in Begriffen der ISO/IEC 42001 sind die meisten
Probleme Nichtkonformitäten, die unter Abschnitt 10.2 [3] behandelt werden. Ein **Vorfall** ist ein
Ereignis, bei dem das System zu Schaden geführt hat; eine **Gefahr** (oder Beinaheunfall) ist eines,
das plausibel zu Schaden hätte führen können und nicht geführt hat [4]. Ein
**schwerwiegender Vorfall** gemäß `Art. 3(49)` ist die Spitze dieser Leiter: Tod oder ernsthafte
Gesundheitsschäden, ernsthafte und irreversible Störung kritischer Infrastruktur, Verstoß gegen
Verpflichtungen zum Schutz von Grundrechten oder ernsthafte Schäden an Eigentum oder Umwelt [2].
Halten Sie Schweregrad (eine interne Bewertung des Schadens) und Meldepflicht (ein Test, der einmal
pro Regime durchgeführt wird) in separaten Feldern, die jeweils von einer benannten Person mit
Zeitstempel gesetzt werden. Die vollständigen Definitionen finden Sie in
[Kapitel 17](/bok/incidents#incident-hazard-issue-and-serious-incident).

### Eine Schweregrad-Skala, die den Klassen des Art. 73 entspricht

Schreiben Sie die Skala als Richtlinie und evaluieren Sie sie als Code, wenn ein Vorfall geöffnet
wird, damit die erste Klassifizierung und die Uhren, die sie startet, reproduzierbar sind. Die
folgenden Stufen sind illustrativ; wichtig ist, dass jede einen Schadenstest und die rechtliche
Klasse benennt, die sie auslösen kann.

| Stufe | Harm-Test | `Art. 73` Klasse, die sie auslösen kann [2] | Standard-Antwort |
|---|---|---|---|
| **SEV-1** | Tod; ernsthafte und irreversible Störung kritischer Infrastruktur; weit verbreiteter Verstoß | `Art. 73(4)` Tod: spätestens 10 Tage; `Art. 73(3)`: spätestens 2 Tage | Zuerst eindämmen; Rechts- und Datenschutzbeauftragte in der Konferenz |
| **SEV-2** | Verstoß gegen Verpflichtungen zum Schutz von Grundrechten; ernsthafte Schäden an Eigentum oder Umwelt | `Art. 73(2)`: spätestens 15 Tage | Gleicher Arbeitstag; Meldepflicht wird pro Regime bewertet |
| **SEV-3** | Realisierter Schaden unterhalb der schwerwiegenden Schwellwerte | Keine von selbst; DSGVO und Sektor-Regime prüfen | Eindämmen am selben Tag; Überprüfung innerhalb von fünf Arbeitstagen |
| **SEV-4** | Beinaheunfall: ein Schadensweg wurde unterbrochen | Keine | Wöchentliche Überprüfung; Regressions-Eval hinzugefügt |
| **Problem** | Mangel oder Schwäche, kein Ereignis | Keine | Issue-Log mit Verantwortlichem und Fälligkeitsdatum |

Klassifizieren Sie nach oben und stufen Sie mit Nachweisen herab: die Fristen laufen ab dem
Zeitpunkt der Kenntnis, und eine angemessene Wahrscheinlichkeit eines kausalen Zusammenhangs reicht
aus, um sie zu starten [2]. Ein Ereignis kann mehrere Uhren starten. Eine Verletzung
personenbezogener Daten innerhalb eines KI-Vorfalls fügt die DSGVO-Benachrichtigung an die
Aufsichtsbehörde hinzu, innerhalb von 72 Stunden, soweit möglich [5], sodass der Datensatz ein
Meldepflicht-Flag pro Regime trägt (siehe
[die überlappenden Uhren](/bok/incidents#the-overlapping-clocks)).

### Der Datensatz: ein Schema, viele Berichte

Halten Sie jedes Ereignis als Vorfallsdatensatz, der gegen
[`incident-record.v1.json`](/schemas/incident-record.v1.json) validiert (eine ausfüllbare
[Markdown-Vorlage](/templates/incident-record.md) liegt daneben). Das Feld `severity` des Schemas
nimmt die OECD-Werte (Gefahr, schwerwiegende Gefahr, Vorfall, schwerwiegender Vorfall, Katastrophe)
[4]; behalten Sie die interne SEV-Stufe daneben. Der Block `reporting` zeichnet auf, wann die
Organisation Kenntnis erlangte und einen Eintrag pro Regime bewertet, sodass jede Uhr eine Abfrage
ist, keine Erinnerung; `containment` zeichnet auf, ob der Kill Switch verwendet wurde;
{`root_cause_analysis`} und {`actions_taken`} schließen die Schleife. Regulierungsbehörden-Berichte
werden aus dem Datensatz gerendert, nie neu eingegeben.

### Grundursache, CAPA und fehlerfreie Überprüfung

Führen Sie die Überprüfung auf einem im Voraus festgelegten Trigger durch (jede SEV-1 und SEV-2,
eine Stichprobe der übrigen) und schreiben Sie sie fehlerfrei: Die Frage ist, welche Bedingungen es
einer angemessenen Person ermöglichten, so zu handeln, wie sie es taten, nicht wer einen Fehler
machte [6]. Benennen Sie die Methode (fünf Warum, Fehlerbaum, Zeitachsen-Überprüfung) und eine
Ursachenkategorie im Datensatz. Die Ausgabe ist **CAPA** (Korrektur- und Vorbeugungsmaßnahmen): die
Korrekturmaßnahme behebt diese Instanz, die Vorbeugungsmaßnahme verhindert, dass die Fehlerklasse
irgendwo in der Flotte erneut auftritt. Jeder geschlossene Vorfall hinterlässt eine Regressions-Eval
im [Eval Gate](/patterns/eval-gate-in-ci), eine Änderung des Risikoregisters und einen Nachweis,
dass die Behebung überprüft wurde, wie
[Kapitel 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) festlegt.

### Tischübungen

Ein ungetestetes Playbook ist eine Behauptung, keine Kontrolle. Üben Sie nach einem Zeitplan, drehen
Sie die Fehlermodi (eine indirekte Prompt-Injection, die Daten exfiltriert, Drift in
diskriminierende Ergebnisse, ein Anbieter, der das Modell hinter einer API stillschweigend
austauscht, eine Agent-Schleife, die das Budget verbrennt), und zeitlich die Schritte, die wichtig
sind: klassifizieren, eindämmen, ein Entwurfsbericht für jede Uhr. Die Übung erzeugt die gleichen
Datensätze wie ein echter Vorfall, gekennzeichnet als Übung, sodass "Können Sie rechtzeitig
berichten?" durch eine Abfrage über Übungsergebnisse beantwortet wird
([Playbooks, RACI und Übungen](/bok/incidents#playbooks-raci-and-drills)).

### Die Betreiber-Seite: Anbieter informieren, Nutzung aussetzen

Ein Betreiber eines Hochrisiko-KI-Systems hat drei Pflichten gemäß `Art. 26(5)` [2]. Es überwacht
das System auf der Grundlage der Betriebsanleitung und informiert den Anbieter, falls relevant. Wenn
es Grund zu der Annahme hat, dass die Nutzung wie vorgesehen ein Risiko darstellen kann, informiert
es den Anbieter oder Händler und die Marktüberwachungsbehörde ohne unangemessene Verzögerung und
setzt die Nutzung aus. Wenn es einen schwerwiegenden Vorfall identifiziert, informiert es sofort
zuerst den Anbieter, dann den Einführer oder Händler und die Behörde; wenn es den Anbieter nicht
erreichen kann, gilt `Art. 73` für den Betreiber. Konstruieren Sie jede Pflicht:

- **Ein Anbieter-Kanal im Registereintrag**, mit den vertraglichen Benachrichtigungsbedingungen, die
  das [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) ausgehandelt
  hat, getestet in Übungen.
- **Ein Aussetzungspfad für ein System, das Sie nicht besitzen**: ein Feature Flag oder Traffic
  Switch zu einem menschlichen oder Legacy-Pfad, verdrahtet mit dem
  [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) und zeitlich in Übungen.
- **Ein Anbieter-seitiger Export des Datensatzes** mit dem Zeitstempel jeder Benachrichtigung und
  einer Fallback-Uhr, die die {`Art. 73`} Timer auf dem eigenen Datensatz des Betreibers startet,
  wenn der Anbieter schweigt.
- **Protokollaufbewahrung** unter der Kontrolle des Betreibers für mindestens sechs Monate
  {`Art. 26(6)`}, länger während ein Vorfall offen ist {[2]}.

## Konsequenzen
Die Berichterstattung erfolgt rechtzeitig und der Datensatz ist auditfähig. Schweregrad und
Meldepflicht bleiben getrennt, Überprüfungen lehren statt zu beschuldigen, und jeder geschlossene
Vorfall härtet die Kontrollen durch CAPA. Die Kosten sind funktionsübergreifende Integration,
Übungen, die Menschen von anderen Arbeiten ablenken, vertragliche Benachrichtigungsbedingungen, die
von Anbietern gewonnen werden müssen, und das Aktualisieren der Schweregrad-Kriterien und Vorlagen
mit dem Gesetz.

## Verwandte Muster
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Zuordnung:** EU KI-Verordnung Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF
(Manage) · Layer 05 Assurance & Continuous Compliance.

Funktionsetiketten folgen dem NIST AI RMF {[7]}. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 (serious incident reporting for GPAI models with systemic risk). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act): Art. 3(49) serious incident; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 72 post-market monitoring; Art. 73 reporting of serious incidents (73(2) no later than 15 days, 73(3) no later than 2 days, 73(4) no later than 10 days). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; AI incident and AI hazard; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority within 72 hours where feasible). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[7] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
