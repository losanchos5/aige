---
lang: de
source: bok/08-regulatory-map.md
sourceHash: "2d5c814e952facf7e41ebe981ae7a6527a4503f20516c8d52387badff54b53e5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 08. Regulatory Map (Verpflichtung → Artefakt → Schicht)

> Dieses Kapitel ist der Rückwärts-Index jeder "Maps to"-Zeile im Buch: für jede Verpflichtung nennt
> es das Engineering-Artefakt, das sie erfüllt oder unterstützt, und die Stack-Schicht, in der das
> Artefakt lebt.

Jedes andere Kapitel bildet *vorwärts* ab: eine Fähigkeit, dann die Verpflichtungen, die sie
berührt. Dieses Kapitel bildet *rückwärts* ab: eine Verpflichtung, dann das Artefakt und die
Schicht, die sie beantworten. Die Einheit der Map ist eine Zeile: eine Verpflichtung, das
Engineering-Artefakt, das die Evidenz dafür erzeugt, und eine der fünf Stack-Schichten (Kapitel 04):
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.
Die Map ist ein Crosswalk zum Auffinden des Artefakts, das eine Frage beantwortet, keine
Bescheinigung, dass das Artefakt Sie konform macht. Sie indexiert zuerst die AI-spezifischen
Instrumente und dann das Datenschutz-, Cybersicherheits-, Haftungs-, Verbraucher- und Sektorrecht,
dem ein KI-System von Tag eins an unterliegt, damit jede Zeile des
[Verpflichtungsregisters](/obligations) in eine Tabelle in diesem Kapitel aufgelöst wird. Kapitel 19
lehrt die Datenschutz-Zeilen in seiner
[Verpflichtung-zu-Artefakt-Map](/bok/privacy-and-ai#obligation-to-artefact-map), und Kapitel 20 das
[andere Recht, das bereits für KI gilt](/bok/existing-law) (Urheberrecht, Antidiskriminierung,
Verbraucherschutz und Produkthaftung).

## So lesen Sie diese Map

Lesen Sie jede Zeile als einen Satz: *diese Verpflichtung wird durch dieses Artefakt beantwortet,
das in dieser Schicht lebt*. Drei Vorsichtsmaßnahmen gelten durchgehend.

- **Mappings sind illustrativ, keine Konformitätsaussage.** Kein Artefakt in diesem Buch garantiert
  Konformität, und kein hier zitierter Standard verleiht eine Konformitätsvermutung (siehe "What is
  NOT harmonised yet"). Ein Artefakt *unterstützt* und *evidenziert* eine Verpflichtung; die
  rechtliche Konformitätsbeurteilung bleibt bei Anwälten, notifizierten Stellen und Behörden.
- **Daten sind die Post-Omnibus-Daten.** Jedes EU AI Act-Datum unten spiegelt die Verordnung (EU)
  2026/1744, das Digital Omnibus on AI, vom 8. Juli 2026 (ABl. L, 24. Juli 2026), in Kraft 27. Juli
  2026 [1][2][22] wider. Wo der Omnibus ein Datum verschoben hat, wird das verschobene Datum
  angezeigt; wo nicht, sagt die Zeile es.
- **Die zuständige Behörde unterscheidet sich je nach Regime.** Für KI-Modelle mit allgemeinem
  Verwendungszweck (GPAI) ist der Supervisor das **AI Office**, und GPAI-Bußgelder sind formelle
  Kommissionsentscheidungen nach Artikel 101 [3][4]. Für Hochrisiko-Systeme sind die Supervisoren
  **nationale Marktüberwachungsbehörden**, deren Strafen unter Artikel 99 [4] laufen.
  Mitgliedstaaten wählen ihre eigenen; Spanien beispielsweise richtete eine dedizierte Agentur ein,
  **AESIA** (Agencia Española de Supervisión de Inteligencia Artificial), deren Statut durch
  Königliches Dekret 729/2023 [52] genehmigt wurde. Die Map gibt die Behörde pro Zeile an, damit der
  Leser weiß, wer fragt.

## EU-KI-Verordnung, nach dem Digital-Omnibus

Eine ausführliche Erklärung des Gesetzes vor dieser umgekehrten Indexierung (Anwendungsbereich, die
Risikoleiter, Rollen in der Wertschöpfungskette, Pflichten des Betreibers, Durchsetzung und der
vollständige Zeitplan nach dem Digital-Omnibus) finden Sie in [Kapitel 18](/bok/eu-ai-act), das das
Gesetz von Anfang bis Ende durchläuft.

Die Hochrisiko-Pflichten (Artikel 9–15, 17, 25, 26, 27, 49, 71, 72, 73) gelten für Systeme nach
Anhang III ab **2. Dezember 2027** und für eingebettete Systeme nach Anhang I ab **2. August 2028**,
beide vom Digital-Omnibus von 2. August 2026 bzw. 2. August 2027 verschoben [1][2]. Die geänderte
`Art. 113(c)` verschiebt Kapitel III, Abschnitte 1 bis 3: Klassifizierung, die Anforderungen der
Artikel 8 bis 15 und die Pflichten von Anbietern, Betreibern und anderen Akteuren in den Artikeln 16
bis 27 [22]. Die Hochrisiko-Pflichten, die anderswo liegen (Konformitätsbewertung, die Erklärung,
CE-Kennzeichnung und Registrierung in den Artikeln 43 bis 49 und 71, Beobachtung nach dem
Inverkehrbringen und Meldung von Vorfällen in den Artikeln 72, 73 und 75(1a) sowie das Recht auf
Erklärung in Artikel 86), gehören zu Kapiteln, die formal ab 2. August 2026 gelten, aber sie haben
Arbeit zu leisten, nur wenn ein System als Hochrisiko klassifiziert ist, daher datiert die Karte sie
nach dem Klassifizierungsdatum. Dies ist die Lesart dieser Karte; bestätigen Sie sie mit Ihrem
Rechtsbeistand (überprüfen) [22][63]. Die Artikel 26(11), 27, 49, 71 und 86 betreffen nur Systeme
nach Anhang III, daher erreicht das Datum 2. August 2028 sie nicht. Die GPAI-Pflichten (Artikel
53, 55) gelten seit 2. August 2025, mit Durchsetzungsbefugnissen der Kommission seit 2. August 2026
[3]; Anbieter von Modellen, die vor 2. August 2025 auf den Markt gebracht wurden, erfüllen die
Anforderungen bis 2. August 2027 (`Art. 111(3)`) [63]. Transparenz (Artikel 50) trat am 2. August
2026 in Kraft und wurde nicht verschoben [5]. Bestehende Hochrisiko-Systeme von Behörden behalten
ihr ursprüngliches Datum 2. August 2030 [2].

Die Spalte **Pflichtträger** nennt, wer die Pflicht bindet, was eine andere Achse ist als wer sie
durchsetzt. Die Hochrisiko-Pflichten für Design und Aufbau (Artikel 9 bis 15 und 17) fallen dem
**Anbieter** zu; Artikel 26 und 27 fallen dem **Betreiber** zu; Artikel 4, 5 und 50 binden
**beide**; und Artikel 53 und 55 binden den **GPAI-Anbieter**. Artikel 25 erstreckt sich über die
Wertschöpfungskette: Er legt die Bedingungen fest, unter denen ein Distributor, Einführer oder
Betreiber selbst zum **Anbieter** wird und die Anbieter-Pflichten erbt. Artikel 22 bis 24 binden den
**Bevollmächtigten** eines Anbieters außerhalb der EU, den **Einführer** und den **Händler**, und
Artikel 54 den Bevollmächtigten eines GPAI-Anbieters außerhalb der EU. Dies ist für den Ingenieur
wichtig, weil die Artefakte, die Sie produzieren können, davon abhängen, welche Rolle Ihre
Organisation hat: Ein Betreiber kann die technische Dokumentation des Anbieters nicht erstellen,
muss aber die Überwachung nach Artikel 26 und die FRIA nach Artikel 27 durchführen; und wenn das
Modell beschafft wird, wird ein Großteil der Anbieter-seitigen Evidenz zu etwas, das Sie sammeln,
anstatt zu produzieren (siehe das Vendor / Model Due-Diligence Gate in Kapitel 05).

**Artikel 16** ist der Dachbegriff für die Hochrisiko-Pflichten des Anbieters. Abgesehen von Punkt
(l), Barrierefreiheit, die eine eigene Zeile hat, fügt er kein eigenes Artefakt hinzu; er fasst die
Pflichten zusammen, die die Zeilen unten Artikel für Artikel aufschlüsseln: die Anforderungen der
Artikel 9 bis 15 und 17, Dokumentation und Protokolle (Artikel 18 und 19), Korrekturmaßnahmen
(Artikel 20), die Konformitätsbewertung (Artikel 43), die EU-Konformitätserklärung und
CE-Kennzeichnung (Artikel 47 und 48), Registrierung (Artikel 49 und 71), Beobachtung nach dem
Inverkehrbringen (Artikel 72) und Meldung schwerwiegender Vorfälle (Artikel 73). Es wird hier also
als Querverweis gelesen, nicht als Zeile [22][63].

| Artikel | Pflicht | Engineering-Artefakt | Schicht | Pflichtträger | Gilt (nach Digital-Omnibus) | Behörde |
|---|---|---|---|---|---|---|
| `Art. 3(1)` | Umfang: Entscheiden Sie System für System, ob es sich um ein KI-System nach der Definition in Art. 3(1) handelt, bevor eine andere Pflicht bewertet wird | Definitionale Entscheidungsaufzeichnung in der Registrierung: angewendete Definition, gefundene Elemente, ausgeschlossene Familie falls vorhanden, Grund, Entscheidungsträger, Datum | 2 | Anbieter + Betreiber (Umfang) | 2025-02-02 (Kapitel I) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 4` | KI-Kompetenz: Maßnahmen ergreifen, um die Entwicklung von KI-Kompetenz bei Mitarbeitern und Akteuren zu unterstützen | Kompetenzprogramm als Code; rollenbasierte Schulungsaufzeichnungen; Onboarding-Gates | 1 | Anbieter + Betreiber | 2025-02-02; umformuliert 2026-07-27 (in Kraft) [6][22][63] | Anbieter-/Betreiber-Pflicht; nationale Marktüberwachungsbehörde |
| `Art. 4a` | Rechtliche Grundlage zur Verarbeitung besonderer Kategorien personenbezogener Daten zur Voreingenommenheitserkennung in Hochrisiko-Systemen, mit Pseudonymisierung und Löschung nach Behebung der Voreingenommenheit | Daten-Governance-Kontrollen; Pseudonymisierung und Aufbewahrung als Code; Datenkarte mit Grundlage und Löschung | 2 | Anbieter | 2026-07-27 (neu, in Kraft) [2] | Nationale Marktüberwachungsbehörde / Datenschutzbehörden |
| `Art. 5` | Verbotene Praktiken; neue Verbote für KI-generierte nicht-einvernehmliche intime Bilder (NCII) und CSAM | Policy-as-Code-Blockliste; Input-/Output-Guardrails; Verweigerung und Missbrauchserkennung | 1 · 4 | Anbieter + Betreiber | 2026-12-02 (neue Verbote); frühere Verbote ab 2025-02-02 [2] | Nationale Marktüberwachungsbehörde |
| `Art. 6` | Klassifizierungsregeln für Hochrisiko-KI-Systeme, einschließlich der Route Anhang III (eigenständig) und Anhang I (Sicherheitskomponente) | Risiko-Einstufung als Code; Hochrisiko-Klassifizierungsentscheidungsaufzeichnung; Registereintrag mit Anhang-III-Status-Flagge | 1 · 2 | Anbieter | 2027-12-02 (Anhang III) [1][22] | Nationale Marktüberwachungsbehörde |
| `Art. 6(3)–(4)` | Ein Anbieter, der feststellt, dass ein System nach Anhang III unter dem Filter Art. 6(3) nicht hochrisiko ist, dokumentiert die Bewertung vor dem Inverkehrbringen und registriert es unter Art. 49(2); ein System, das natürliche Personen profiliert, ist immer hochrisiko | Klassifizierungsentscheidungsaufzeichnung (Anhang-III-Punkt, Art.-6(3)-Bedingung, explizites Profiling-Flag); Art.-49(2)-Registereintrag aus der Registrierung übertragen | 1 · 2 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 9` | Risikomanagementsystem über den Hochrisiko-Lebenszyklus | Risikoregister als Code; Bedrohungsmodelle; Verknüpfung zu FRIA und Eval-Ergebnissen | 1 · 3 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 10` | Daten und Daten-Governance; repräsentative, relevante, fehlergeprüfte Datensätze | Datenkarten; Herkunft; Bias- und Qualitätstests in CI | 2 · 3 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 11` | Technische Dokumentation (Anhang IV) erstellt und aktuell gehalten | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`); automatisch generierte technische Dokumentation; Model Cards | 2 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 12` | Aufzeichnungspflichten: automatische Protokollierung von Ereignissen über die Lebensdauer des Systems | Strukturierte, signierte Protokolle; `OpenTelemetry`Spuren; manipulationssicherer Ereignisspeicher | 4 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 13` | Transparenz und Bereitstellung von Informationen für Betreiber | Betriebsanleitung als Code; Model und Data Cards; Fähigkeits- und Limitierungshinweise | 2 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 14` | Menschliche Aufsicht in das System eingebaut | Menschliche Kontrollpunkte; Kill Switch; Außerkraftsetzungs- und Eskalationspfade | 4 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 15` | Genauigkeit, Robustheit und Cybersicherheit | Eval Gate; Adversarial Red-Team Suite; Robustheit und Sicherheitskontrollen; Regressions-Evals | 3 · 4 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 15(4)` | Systeme, die nach dem Inverkehrbringen weiterlernen, sind so aufgebaut, dass das Risiko von voreingenommenen Ausgaben, die zukünftige Eingaben speisen (Rückkopplungsschleifen), beseitigt oder verringert wird, mit Minderungsmaßnahmen | Rückkopplungsschleifen-Fairness-Monitor; Retraining-Daten-Bias-Check; Agent-Memory-Write-Gate mit Herkunft und Rollback zu einem bekannten guten Snapshot | 3 · 4 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 16(l)` | Anbieter stellen sicher, dass das Hochrisiko-System die Barrierefreiheitsanforderungen der Richtlinien (EU) 2016/2102 und (EU) 2019/882 erfüllt | Barrierefreiheitstestergebnisse für jede Mitteilung, Anleitung und Erklärung, die Personen angezeigt wird, in der Pipeline ausgeführt; barrierefreie Erklärungsvorlagen | 2 · 3 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 17` | Qualitätsmanagementsystem | QMS-as-Code; versionierte Richtlinien; Pipeline-Kontrollen und Änderungsverwaltung | 1 · 5 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 17(1)(m)` | Das QMS umfasst ein Verantwortungsrahmen, das die Verantwortlichkeiten der Geschäftsleitung und anderer Mitarbeiter für jeden Aspekt des QMS festlegt | RACI als Code kompiliert in Registry-Owner-Felder und Code-Owner-Regeln; Komitee-Entscheidungsaufzeichnungen | 1 · 2 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 18` | Halten Sie die technische Dokumentation, die QMS-Dokumentation, Änderungen und Entscheidungen der benachrichtigten Stelle und die EU-Erklärung 10 Jahre nach dem Inverkehrbringen für nationale Behörden bereit | Aufbewahrung-als-Code für die technische Datei, QMS-Aufzeichnungen, Entscheidungen der benachrichtigten Stelle und die EU-Erklärung (10 Jahre); Write-Once-Evidenzspeicher | 2 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 19` | Halten Sie die automatisch generierten Protokolle unter der Kontrolle des Anbieters für einen Zeitraum, der dem beabsichtigten Zweck angemessen ist, mindestens sechs Monate, sofern nicht anderes Recht etwas anderes vorsieht | Protokoll-Aufbewahrungsrichtlinie als Code (mindestens sechs Monate, festgelegt nach beabsichtigtem Zweck); manipulationssicherer Protokollspeicher | 4 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 20` | Ein Anbieter, der Grund hat zu der Annahme, dass ein Hochrisiko-System nicht konform ist, bringt es sofort in Konformität, zieht es zurück, deaktiviert oder ruft es zurück und informiert Distributoren und Betreiber; wenn das System ein Risiko darstellt, untersucht es und informiert die Marktüberwachungsbehörde | CAPA-Aufzeichnung; Runbook zum Zurückziehen, Deaktivieren oder Zurückrufen; Benachrichtigung von Distributoren und Betreibern | 1 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 22` | Ein Anbieter mit Sitz außerhalb der Union ernennt durch schriftliches Mandat einen Bevollmächtigten in der Union, bevor das System verfügbar gemacht wird; der Bevollmächtigte hält die Erklärung, Dokumentation und das Zertifikat 10 Jahre lang | Schriftliches Mandat; 10-jährige Kopien der Erklärung, technischen Dokumentation und des Zertifikats; Kontaktstelle der Behörde | 5 | Anbieter außerhalb der EU + Bevollmächtigter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 23` | Vor dem Inverkehrbringen eines Hochrisiko-Systems überprüft der Einführer die Konformitätsbewertung, die Dokumentation nach Anhang IV, die CE-Kennzeichnung, die Erklärung und Anleitung sowie den Bevollmächtigten und hält Kopien 10 Jahre lang | Importüberprüfungsaufzeichnung gegen jede Kontrolle; 10-jährige Dokumentkopien | 2 · 5 | Einführer | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 24` | Vor der Bereitstellung eines Hochrisiko-Systems überprüft der Distributor die CE-Kennzeichnung, die Erklärung und die Anleitung und hält ein System, das er für nicht konform hält, zurück, zieht es zurück oder ruft es zurück | Verteilungsprüfungsaufzeichnung; Workflow zum Zurückhalten, Zurückziehen oder Zurückrufen | 2 · 5 | Distributor | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 25` | Verantwortlichkeiten entlang der KI-Wertschöpfungskette: wenn ein Distributor, Einführer oder Betreiber zum Anbieter wird, und die Informationen, die ein Anbieter an nachgelagerte Akteure weitergeben muss | Value-Chain-Due-Diligence-Gate; Anbieter-/Betreiber-Verantwortungszuweisung; AIBOM und Model/Data Cards von vorgelagerten Anbietern gesammelt | 2 · 5 | Anbieter + Value-Chain-Akteure | 2027-12-02 (Anhang III) [23] | Nationale Marktüberwachungsbehörde |
| `Art. 26` | Betreiber-Pflichten für Hochrisiko-Systeme: Verwendung gemäß der Betriebsanleitung (Art. 26(1)); die Absatz-Zeilen unten schlüsseln Aufsicht, Eingabedaten, Überwachung, Protokolle und Mitteilungen auf | Bereitstellungsregistrierung; Überwachungs-Hooks; zugewiesene Aufsicht und Protokoll-Aufbewahrung | 2 · 4 | Betreiber | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 26(2)` | Betreiber weisen die menschliche Aufsicht natürlichen Personen mit der erforderlichen Kompetenz, Schulung und Autorität sowie der erforderlichen Unterstützung zu | Aufsichtszuweisung in der Registrierung; rollenbasierte Schulungsaufzeichnungen mit Ablaufdatum; Genehmiger-Roster pro Checkpoint-Klasse mit Autorität zum Pausieren oder Ablehnen | 1 · 4 | Betreiber | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 26(4)` | Soweit der Betreiber die Eingabedaten kontrolliert, stellt er sicher, dass die Daten für den beabsichtigten Zweck relevant und ausreichend repräsentativ sind | Eingabedaten-Checks gegen die Bevölkerung im Bereitstellungsdatensatz; Drift-Monitore bei Eingaben | 2 · 3 | Betreiber | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 26(5)` | Betreiber überwachen den Betrieb gemäß den Anweisungen; wenn Grund zur Annahme eines Risikos besteht, informieren sie den Anbieter oder Händler und die Behörde und unterbrechen die Nutzung; ein schwerwiegender Vorfall geht zunächst an den Anbieter, und Art. 73 gilt für den Betreiber, wenn der Anbieter nicht erreichbar ist | Überwachungsplan mit Signalverantwortlichen; getesteter Suspensionspfad (Feature-Flag, Traffic-Switch); Incident-Kontakt des Anbieters im Register; vorausgefüllte Risiko- und Meldungen schwerwiegender Vorfälle | 2 · 4 · 5 | Betreiber | 2027-12-02 (Annex III) [63][57] | Nationale Marktüberwachungsbehörde |
| `Art. 26(6)` | Betreiber bewahren die Protokolle unter ihrer Kontrolle für einen Zeitraum auf, der dem beabsichtigten Zweck angemessen ist, mindestens sechs Monate, sofern andere Rechtsvorschriften nichts anderes vorsehen | Aufbewahrungsplan als Code; manipulationssicherer Log-Speicher; rechtliche Aufbewahrung während ein Incident offen ist | 4 · 5 | Betreiber | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 26(7)` | Vor der Inbetriebnahme eines Hochrisiko-Systems am Arbeitsplatz informieren Betreiber, die Arbeitgeber sind, die Arbeitnehmervertreter und die betroffenen Arbeitnehmer | Arbeitnehmer-Informationsdatensatz mit Datum vor der ersten Nutzung und verknüpft mit dem Registereintrag; HR-Intake-Trigger für Annex-III-Punkt-4-Systeme | 2 | Betreiber (Arbeitgeber) | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 26(11)` | Betreiber von Annex-III-Systemen, die Entscheidungen über natürliche Personen treffen oder unterstützen, informieren diese Personen, dass sie dem System unterliegen | KI-Nutzungsmitteilung am Entscheidungspunkt; Meldungsvorlagen versioniert als Code; Meldungslieferdatenprotokoll | 2 · 4 | Betreiber | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 27` | Grundrechte-Folgenabschätzung (FRIA) für Betreiber von Annex-III-Systemen | FRIA-as-Code aus einer Vorlage; Querverweis zu einer GDPR `Art. 35` DSFA | 1 · 2 | Betreiber | 2027-12-02 (Annex III) [7] | Nationale Marktüberwachungsbehörde |
| `Art. 43` | Konformitätsbewertung vor dem Inverkehrbringen (interne Kontrolle oder eine notifizierte Stelle für Annex-III-Punkt-1-Biometrie) | Konformitätsbewertungs-Workflow; Nachweispaket für interne Kontrolle oder notifizierte Stelle; Rückverfolgbarkeit zur Annex-IV-Dokumentation | 1 · 5 | Anbieter | 2027-12-02 (Anhang III) [1][22] | Nationale Marktüberwachungsbehörde |
| `Art. 43(4)` | Ein bereits bewertetes System unterliegt einer neuen Konformitätsbewertung bei wesentlicher Veränderung; in der technischen Dokumentation eines Systems, das weiterhin lernt, vorbestimmte Änderungen sind keine wesentlichen Veränderungen | Änderungsklassifizierungsrichtlinie beim Merge; vorbestimmter Änderungsumfang als Code; Neubewertungs-Trigger im Register | 1 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 47` | EU-Konformitätserklärung wird nach Abschluss der Bewertung ausgefertigt | Automatisch generierte EU-Konformitätserklärung aus den Nachweisen; CE-Kennzeichnungsdatensatz | 2 · 5 | Anbieter | 2027-12-02 (Anhang III) [1][22] | Nationale Marktüberwachungsbehörde |
| `Art. 48` | Bringen Sie die CE-Kennzeichnung sichtbar, lesbar und dauerhaft an (eine digitale Kennzeichnung für digital bereitgestellte Systeme), gefolgt von der Nummer der notifizierten Stelle, falls zutreffend | CE-Kennzeichnungsdatensatz (physisch oder digital) generiert mit der EU-Konformitätserklärung; notifizierte Stellennummer, falls zutreffend | 2 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 49` / `Art. 71` | Registrierung von Hochrisiko-Systemen in der EU-Datenbank | Agentenregister/Modellregister mit einer API, die die Registrierung speist; Eigentümer und Status pro Eintrag | 2 | Anbieter; öffentliche Behörde als Betreiber | 2027-12-02 (Anhang III) [1] | Nationale MSA; Kommission (Datenbank) |
| `Art. 50` | Transparenz für bestimmte KI-Systeme: Chatbot-Offenlegung; Kennzeichnung und Etikettierung synthetischer Inhalte | Inhaltsbezeichnung und maschinenlesbares Kennzeichen (z. B. C2PA-Stil); Chatbot-Offenlegungsbanner | 4 · 2 | Anbieter + Betreiber | 2026-08-02; Kennzeichnungsfrist für bestehende Systeme bis 2026-12-02 [2][5] | Nationale Marktüberwachungsbehörde |
| `Art. 52` | Benachrichtigen Sie die Kommission unverzüglich und innerhalb von zwei Wochen, sobald ein KI-Modell mit allgemeinem Verwendungszweck die Bedingung in Art. 51(1)(a) erfüllt oder bekannt wird, dass es dies erfüllen wird | Compute-Ledger pro Modellherkunft mit Schwellenwert-Warnung für geplante Berechnung; Benachrichtigungsdatensatz innerhalb von zwei Wochen eingereicht | 2 · 5 | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck | Verpflichtungen ab 2025-08-02; Durchsetzung ab 2026-08-02 [63][3] | Büro für Künstliche Intelligenz |
| `Art. 53` | Verpflichtungen von Anbietern von KI-Modellen mit allgemeinem Verwendungszweck, einschließlich einer öffentlichen Zusammenfassung der Trainingsinhalte nach einer Vorlage des Büros für Künstliche Intelligenz | Model Cards; Trainingsinhalts-Zusammenfassung; AIBOM und Datensatz-Herkunft | 2 | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck | Verpflichtungen ab 2025-08-02; Durchsetzung ab 2026-08-02 [3] | Büro für Künstliche Intelligenz |
| `Art. 53(1)(c)` | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck erlassen eine Richtlinie zur Einhaltung des Urheberrechts der Union, einschließlich der Ermittlung und Einhaltung von Vorbehalten von Rechten gemäß Art. 4(3) der Richtlinie (EU) 2019/790 | Versionierte Urheberrechtsrichtlinie; Crawler-Entscheidungsprotokolle; Trainingsdaten-Rechts-Ledger mit dem Ergebnis der Vorbehaltsprüfung | 1 · 2 · 5 | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck | Verpflichtungen ab 2025-08-02; Durchsetzung ab 2026-08-02 [63][73] | Büro für Künstliche Intelligenz |
| `Art. 54` | Ein Anbieter eines KI-Modells mit allgemeinem Verwendungszweck, der außerhalb der Union ansässig ist, bestellt durch schriftliches Mandat einen Bevollmächtigten, bevor er das Modell auf dem Unionsmarkt in Verkehr bringt; der Bevollmächtigte bewahrt die Annex-XI-Dokumentation 10 Jahre lang auf | Schriftliches Mandat; Annex-XI-Dokumentationskopie 10 Jahre lang aufbewahrt; Kontaktweg zum Büro für Künstliche Intelligenz | 5 | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck außerhalb der EU + Bevollmächtigter | Verpflichtungen ab 2025-08-02; Durchsetzung ab 2026-08-02 [63] | Büro für Künstliche Intelligenz |
| `Art. 55` | KI-Modelle mit allgemeinem Verwendungszweck mit systemischem Risiko: Modellbewertung einschließlich adversarialer Tests; Risikobewertung auf Unionsebene; Meldung schwerwiegender Vorfälle; Cybersicherheit des Modells | Eval- und Red-Team-Suite; Incident-Pipeline nach der Vorlage der Kommission für Meldung schwerwiegender Vorfälle; Gewichtssicherheitskontrollen; Bedrohungsmodell | 3 · 4 · 5 | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck (systemisches Risiko) | Verpflichtungen ab 2025-08-02; Durchsetzung ab 2026-08-02 [3][26] | Büro für Künstliche Intelligenz |
| `Art. 60` | Testen von Hochrisiko-Systemen (Annex III) unter realen Bedingungen außerhalb von KI-Reallaboren | Plan für Tests unter Realbedingungen; `Art. 61` Einwilligungsdatensätze; Test-Überwachung, Protokollierung und Incident-Hooks | 3 · 4 | Anbieter / angehender Anbieter | 2026-08-02 [22] | Nationale Marktüberwachungsbehörde |
| `Art. 72` | Beobachtung nach dem Inverkehrbringen für Hochrisiko-Systeme | Kontinuierliche Assurance-Telemetrie; Überwachungsplan; Drift- und Leistungssignale | 5 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 73` | Meldung schwerwiegender Vorfälle für Hochrisiko-Systeme (Fristen in der Meldungs-Uhr-Tabelle unten) | Incident-Erkennungs- und Triage-Pipeline; Meldungs-Uhr-Automatisierung; Nachweis-Erfassung | 5 · 4 | Anbieter | 2027-12-02 (Anhang III) [1] | Nationale Marktüberwachungsbehörde |
| `Art. 73(6)` | Nach der Meldung eines schwerwiegenden Vorfalls untersucht der Anbieter unverzüglich (Risikobewertung, Korrekturmaßnahme) und ändert das System nicht auf eine Weise, die die Bewertung der Ursachen beeinträchtigen könnte, bevor er die Behörden informiert | Schritt zur Beweissicherung: Modell-, Prompt-, Richtlinien- und Abruf-Index-Snapshots; versiegelte Traces; Fix auf einer neuen Version ausgeliefert | 4 · 5 | Anbieter | 2027-12-02 (Anhang III) [63] | Nationale Marktüberwachungsbehörde |
| `Art. 75(1a)` | Anbieter von Hochrisiko-Systemen unter der ausschließlichen Zuständigkeit des Büros für Künstliche Intelligenz (Systeme, die auf ihrem eigenen KI-Modell mit allgemeinem Verwendungszweck aufgebaut sind, und Systeme in bestimmten sehr großen Online-Plattformen oder Suchmaschinen) melden schwerwiegende Vorfälle dem Büro für Künstliche Intelligenz, wobei Art. 73(2) bis (9) sinngemäß angewendet werden | Incident-Pipeline-Routing nach einem Register-Zuständigkeitsflag (nationale MSA oder Büro für Künstliche Intelligenz) | 2 · 5 | Anbieter (Systeme unter Zuständigkeit des Büros für Künstliche Intelligenz) | 2027-12-02 (Annex III); neu durch das Omnibus (Lesen, Überprüfung) [22] | Büro für Künstliche Intelligenz |
| `Art. 86` | Eine Person, die einer Entscheidung eines Betreibers unterliegt, die auf einem Annex-III-System basiert (außer Punkt 2) mit rechtlichen oder ähnlich erheblichen nachteiligen Auswirkungen, kann klare und aussagekräftige Erklärungen zur Rolle des Systems und den Hauptelementen der Entscheidung erhalten, sofern das Unionsrecht das Recht nicht bereits gewährt | Erklärungsdatensatz pro Entscheidung (System- und Modellversion, Grund-Codes, bestimmende oder beratende Rolle, menschlicher Entscheidungsträger); Anfrage-Bearbeitungs-Workflow und Antwortprotokoll | 2 · 4 · 5 | Betreiber | 2027-12-02 (Annex III); Kapitel IX gilt ab 2026-08-02 (Lesen, Überprüfung) [63][22] | Nationale Marktüberwachungsbehörde |
| `Art. 87` | Richtlinie (EU) 2019/1937 gilt für Meldungen von Verstößen gegen die KI-Verordnung und für den Schutz der Personen, die diese machen | Interner Meldungskanal, der als Fallsystem mit den in der Richtlinie codierten Uhren betrieben wird; versiegelte Reporter-Identität; Vergeltungsüberwachung; Routing zur Incident-Pipeline | 1 · 5 | Juristische Personen mit internen Meldungskanälen gemäß Richtlinie (EU) 2019/1937 | 2026-08-02 [63][64] | Behörden, die gemäß Richtlinie (EU) 2019/1937 bestimmt sind |

Mehrere Zeilen sind an anderer Stelle im Buch vollständig ausgearbeitet:

- `Art. 4`: Das Programm zur KI-Kompetenz als Code ist
  [KI-Kompetenz als Code](/bok/governance-program#ai-literacy-as-code) in Kapitel 12, und die
  rollengestützten Schulungsdatensätze haben eine
  [Lehrplan-Vorlage zur KI-Kompetenz](/resources/templates#kit-literacy-curriculum).
- `Art. 4a` und `Art. 10`: Die rechtliche Grundlage für
  [Daten besonderer Kategorien zur Bias-Erkennung](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)
  ist in Kapitel 19; die Daten, die zum Testen auf Bias benötigt werden, und
  [wo Bias in den Lebenszyklus eintritt](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle),
  sind in Kapitel 16
  ([geschützte Merkmale, Proxys und die Daten, die Sie zum Testen benötigen](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test)).
- `Art. 6`:
  [Der Artikel-6(3)-Filter und die Profiling-Außerkraftsetzung](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
  werden in Kapitel 18 durchgegangen.
- `Art. 9`: Das Risikoregister als Code ist
  [das Risikoregister als Nachweisdatensatz](/bok/risk-management#the-risk-register-as-an-evidence-record)
  in Kapitel 13; derselbe Artefakt beantwortet auch die ISO/IEC-23894-Zeile unten.
- `Art. 11`, `Art. 43` und `Art. 47`:
  [Annex IV, Element für Element](/bok/governing-development#annex-iv-element-by-element) und
  [Konformität, in Ordnung](/bok/governing-development#eu-ai-act-conformity-in-order) sind in
  Kapitel 14.
- `Art. 13`: Betriebsanleitungen als Code haben ein
  [JSON-Schema und gefülltes Beispiel](/resources/templates#schema-instructions-for-use); was sie
  Betreibern und betroffenen Personen sagen müssen, ist in
  [der KI-Verordnung der EU, Artikel 13 und 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (Kapitel 16).
- `Art. 25`:
  [Wenn ein Akteur der Wertschöpfungskette ein Anbieter wird](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider),
  ist in Kapitel 18 dargelegt.
- `Art. 26`: Die [Betreiberpflichten im Betrieb](/bok/governing-deployment#operating-the-system)
  sind in Kapitel 15.
- `Art. 27`: Der Querverweis der FRIA zu einer GDPR `Art. 35` DSFA wird in
  [der DSFA für KI-Systeme](/bok/privacy-and-ai#the-dpia-for-ai-systems) (Kapitel 19) entwickelt.
- `Art. 72`: Der Überwachungsplan hat ein
  [Schema für den Überwachungsplan nach dem Inverkehrbringen](/resources/templates#schema-post-market-monitoring-plan).
- `Art. 3(1)`: Der Definitionsentscheidungsdatensatz wird Feld für Feld in
  [von Definitionselement zu Registerfeld](/bok/ai-defined#from-definition-element-to-registry-field)
  (Kapitel 11) aufgebaut.
- `Art. 15(4)`: Rückkopplungsschleifen werden in
  [Überwachung der Fairness in der Produktion](/bok/fairness-and-explainability#monitoring-fairness-in-production)
  (Kapitel 16) und für Agenten in
  [Speicher- und Kontext-Governance](/bok/governing-agents#memory-and-context-governance)
  (Kapitel 23) überwacht; `Art. 16(l)` hat
  [zugängliche Erklärungen](/bok/fairness-and-explainability#accessible-explanations).
- `Art. 17(1)(m)`: Das Accountability-Framework ist
  [ein Lebenszyklus-RACI](/bok/governance-program#a-lifecycle-raci) (Kapitel 12); `Art. 43(4)` ist
  [wesentliche Veränderung](/bok/governing-development#substantial-modification) in Kapitel 14;
  `Arts. 22` bis `24` sind [die EU-Akteur-Rollen](/bok/eu-ai-act#the-eu-operator-roles) in
  Kapitel 18.
- `Art. 26(2)` bis `26(11)`: Die Betreiber-Absätze durchlaufen Kapitel 15, von
  [Überprüfung der Daten und der Personen](/bok/governing-deployment#check-the-data-and-the-people)
  bis [Aufbewahrung von Aufzeichnungen](/bok/governing-deployment#records-retention) und
  [externe Kommunikation](/bok/governing-deployment#external-communications); Kapitel 17 behandelt
  [Benachrichtigung des Anbieters und Aussetzung der Nutzung](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)
  (`Art. 26(5)`) und [Einfrieren vor dem Beheben](/bok/incidents#freeze-before-you-fix)
  (`Art. 73(6)`), und Kapitel 23
  [Genehmigungsdesign für Agent-Checkpoints](/bok/governing-agents#human-checkpoints-and-approval-design).
- `Art. 52`: Das Compute-Ledger und die Benachrichtigung innerhalb von zwei Wochen sind in
  [systemisches Risiko: Schwellenwert, Benachrichtigung, Bestimmung](/bok/eu-ai-act#systemic-risk-threshold-notification-designation)
  (Kapitel 18); `Art. 53(1)(c)` ist
  [Urheberrecht und Trainingsdaten](/bok/existing-law#copyright-and-training-data) (Kapitel 20).
- `Art. 86`: Der Erklärungsdatensatz ist in
  [der KI-Verordnung der EU, Artikel 13 und 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (Kapitel 16) und
  [Erklärung und Benachrichtigung betroffener Personen](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
  (Kapitel 18) spezifiziert; `Art. 87` wird durch
  [einen Kanal zur Meldung von Bedenken](/bok/governance-program#a-channel-for-raising-concerns)
  (Kapitel 12) erfüllt.

Das Omnibus-Paket änderte auch, wie die Tabelle Zeilen auf eine Linie komprimiert [22]. Für `Art. 6`
muss eine **Sicherheitsbauteil** nun den Zweck haben, Risiken für Gesundheit und Sicherheit zu
verhindern oder zu mindern, oder es muss eine sein, deren Ausfall diese gefährdet (`Art. 3(14)`,
`Art. 6(1a)` bis `6(1c)`); diese Einengung gilt für die Annex-I-Route ab 2. August 2028 und für
Maschinen, die von Abschnitt A zu Abschnitt B von Annex I wechseln. Der
Annex-VIII-Abschnitt-B-Registrierungseintrag für Systeme, die auf dem `Art. 6(3)`-Filter basieren,
verlor die Zusammenfassung der Gründe und die Liste der Mitgliedstaaten. Für `Art. 25` benennt die
Kooperationspflicht des ursprünglichen Anbieters nun Dokumentation, die ausreicht, um die
Konformität zu bewerten, bekannte Einschränkungen und Fehlermodi sowie gezielten technischen Zugang
zum Testen (`Art. 25(2)`); die Informationen und der Zugang müssen in einer schriftlichen
Vereinbarung festgehalten werden (`Art. 25(4)`), und Verstöße gegen beide Absätze werden gemäß
`Art. 99(4)(da)` mit Geldbuße geahndet.

Die Uhr des Artikels 73 läuft nach Vorfallklasse. Der Anbieter benachrichtigt die
Marktüberwachungsbehörde des Mitgliedstaats, in dem der Vorfall aufgetreten ist, unverzüglich,
sobald er einen Kausalzusammenhang zwischen dem System und dem Vorfall oder die angemessene
Wahrscheinlichkeit eines solchen feststellt, und in jedem Fall innerhalb einer äußeren Frist, die
von dem Moment an läuft, in dem der Anbieter oder, falls zutreffend, der Betreiber
**von dem Vorfall Kenntnis erlangt**, nicht von der Kausalfeststellung [57]. Ein Betreiber, der
einen schwerwiegenden Vorfall feststellt, unterrichtet zunächst den Anbieter, dann den Einführer
oder Händler und die Marktüberwachungsbehörde; kann er den Anbieter nicht erreichen, gilt Artikel 73
auf den Betreiber entsprechend (`Art. 26(5)`) [57]:

| Vorfallklasse | Meldungsfrist | Wer meldet | Artefakt |
|---|---|---|---|
| Schwerwiegender Vorfall (allgemein) | Unverzüglich bei Kausalzusammenhang oder dessen angemessener Wahrscheinlichkeit; spätestens 15 Tage nach Kenntniserlangung | Anbieter → nationale Marktüberwachungsbehörde; der Betreiber, wenn er den Anbieter nicht erreichen kann (`Art. 26(5)`) | Incident-Triage-Pipeline; Meldungsuhr-Automatisierung |
| Weit verbreitete Zuwiderhandlung oder schwerwiegende und irreversible Störung kritischer Infrastruktur | Unverzüglich; spätestens 2 Tage nach Kenntniserlangung | Anbieter → nationale Marktüberwachungsbehörde; der Betreiber, wenn er den Anbieter nicht erreichen kann (`Art. 26(5)`) | Gleiche Pipeline, eskalierter-Schweregrad-Pfad |
| Tod einer Person | Unverzüglich bei Feststellung oder Verdacht eines Kausalzusammenhangs; spätestens 10 Tage nach Kenntniserlangung | Anbieter → nationale Marktüberwachungsbehörde; der Betreiber, wenn er den Anbieter nicht erreichen kann (`Art. 26(5)`) | Gleiche Pipeline, Prioritätspfad |

Das Omnibus-Paket ließ diese Fristen unverändert. Für Hochrisiko-KI-Systeme unter der
ausschließlichen Zuständigkeit des Büros für Künstliche Intelligenz sendet dessen neuer
`Art. 75(1a)` den Bericht statt an das Büro für Künstliche Intelligenz, wobei `Art. 73(2)` bis `(9)`
entsprechend gelten, und das Büro für Künstliche Intelligenz leitet ihn an die
Marktüberwachungsbehörde des Mitgliedstaats weiter, in dem der Anbieter ansässig ist [22]. Ein
Vorfall löst selten nur eine Uhr aus: Kapitel 17 legt die Uhr des Artikels 73 neben die Uhren der
DSGVO, NIS-2-Richtlinie, DORA, CRA und GPAI in
[die überlappenden Uhren](/bok/incidents#the-overlapping-clocks), und das
[Incident-Record-Schema](/resources/templates#schema-incident-record) enthält die Zeitstempel, die
jede benötigt.

Zwei übergreifende Bestimmungen rahmen die Bußgelder ein. Gemäß **`Art. 101`** kann die Kommission
GPAI-Anbieter mit bis zu 3% des weltweiten Jahresumsatzes oder EUR 15 Millionen, je nachdem welcher
Betrag höher ist, mit Geldbuße belegen [3][4]. Gemäß des neuen **`Art. 75a`–`75d`** des
Omnibus-Pakets erhält das Büro für Künstliche Intelligenz Untersuchungsbefugnisse, verbindliche
Zusagen und Nichtkonformitätsbeschlüsse über die KI-Systeme, für die die geänderte `Art. 75(1)` es
ausschließlich zuständig macht (Systeme, die auf einem GPAI-Modell desselben Anbieters oder
Unternehmens aufgebaut sind, und Systeme in designierten sehr großen Online-Plattformen oder
Suchmaschinen), nicht über GPAI-Modelle allgemein. Periodische Strafzahlungen erreichen bis zu 5%
des durchschnittlichen Tageseinkommens oder des weltweiten Jahresumsatzes pro Tag für einen
fortlaufenden Verstoß (`Art. 75c(5)`). Das Omnibus-Paket trat am 27. Juli 2026 in Kraft, und Kapitel
IX, in dem diese Artikel stehen, gilt ab 2. August 2026 gemäß `Art. 113` [8][22].
Hochrisiko-Verwaltungsbußgelder laufen unter `Art. 99` (Obergrenzen von 7%, 3% und 1% des Umsatzes
je nach Verstoß), verhängt von nationalen Behörden [4]. Kapitel 18 legt dar,
[wer was beaufsichtigt](/bok/eu-ai-act#who-supervises-what) und
[die direkten Befugnisse des Büros für Künstliche Intelligenz](/bok/eu-ai-act#the-ai-offices-direct-powers-articles-75-and-75a-to-75d).

## GPAI-Verhaltenskodex

Der GPAI-Verhaltenskodex, veröffentlicht am 10. Juli 2025, ist das freiwillige Instrument, das
Anbieter nutzen, um die Einhaltung der GPAI-Verpflichtungen bis zur Existenz harmonisierter Normen
nachzuweisen. Er hat drei Kapitel [9][10].

| Kapitel | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|
| Sicherheit (nur Systeme mit systemischem Risiko) | Ein Sicherheitsrahmen; Modellbewertungen einschl. adversariales Testen; Bewertung und Minderung systemischen Risikos; Meldung schwerwiegender Vorfälle; Modell- und Infrastruktursicherheit | Eval- und Red-Team-Suite; adversariales Testharnisch; Incident-Pipeline; Gewichtssicherheitskontrollen | 3 · 4 · 5 |
| Transparenz | Aktuelle Modelldokumentation für das Büro für Künstliche Intelligenz und nachgelagerte Betreiber | Model Cards; strukturierte Modelldokumentation; AIBOM | 2 |
| Urheberrecht | Eine Richtlinie zur Einhaltung des Unionsurheberrechts, einschl. Respektierung von Rechtsvorbehalt | Trainingsdaten-Herkunfts- und Lizenzunterlagen; Policy-as-Code für Quellfilterung | 1 · 2 |
| Sicherheit, Verpflichtung 9 (Meldung schwerwiegender Vorfälle) | Meldung schwerwiegender Vorfälle an das Büro für Künstliche Intelligenz innerhalb von 2, 5, 10 oder 15 Tagen nach Vorfallklasse, mit Zwischenberichten mindestens alle vier Wochen während der Ungelöstheit und einem Abschlussbericht innerhalb von 60 Tagen nach Lösung; Aufbewahrung der Unterlagen mindestens fünf Jahre [65] | Incident-Pipeline auf den Kommissionsvorlagenfeldern; Pro-Klasse-Uhren; Fünf-Jahres-Aufbewahrungsrichtlinie; nachgelagerter Meldungskanal | 4 · 5 |
| Sicherheit, Anlage 1.3 und 1.4 (Autonomie, Werkzeugnutzung, Kontrollverlust) | Quellen systemischen Risikos zur Berücksichtigung umfassen die Fähigkeit, autonom zu arbeiten, Neigungen wie die Absprache mit anderen KI-Systemen und Affordanzen wie der Zugang zu Werkzeugen und physischen Systemen sowie das Ausmaß der menschlichen Aufsicht; Kontrollverlust ist ein spezifiziertes systemisches Risiko [65] | Anbieter-Bewertungen von Autonomie und Werkzeugnutzung, angefordert beim Vendor-Due-Diligence-Gate und eingereicht mit dem Agentenregister-Eintrag | 3 · 5 |

Der Kodex ist freiwillig; seine Unterzeichnung ist eine Route zum Nachweis der Konformität, keine
gesetzliche Vermutung der Konformität [9]. Der Unterzeichnerstatus ist dynamisch und wird gemäß der
offiziellen Liste der Kommission gezählt [10].

Speziell für die Meldung schwerwiegender Vorfälle veröffentlichte die Kommission am 4. November 2025
eine Meldungsvorlage für schwerwiegende Vorfälle, an denen GPAI-Modelle mit systemischem Risiko
beteiligt sind. Sie stimmt mit der Meldungspflicht des Artikels 55 und mit Verpflichtung 9 des
Sicherheitskapitels des Kodex überein und ist das konkrete Artefakt, das die Incident-Pipeline
ausgibt, die gleiche Vorlage, die in der Zeile des Artikels 55 oben benannt ist [26]. Ein interner
[Incident-Record](/resources/templates#schema-incident-record) kann diese Vorlage und jeden anderen
Regimebericht speisen. Verpflichtung 9 des Sicherheitskapitels setzt die Uhren (2, 5, 10 oder 15
Tage nach Vorfallklasse, Zwischenberichte mindestens alle vier Wochen, ein Abschlussbericht
innerhalb von 60 Tagen nach Lösung) und eine Aufbewahrung von mindestens fünf Jahren, und ihre
Anlage 1 listet die Fähigkeit, autonom zu arbeiten, und den Zugang zu Werkzeugen unter den Quellen
systemischen Risikos und den Kontrollverlust unter den spezifizierten Risiken auf, weshalb die zwei
Zeilen oben für jeden wichtig sind, der Agenten auf einem GPAI-Modell einsetzt [65]. Kapitel 17
setzt Verpflichtung 9 neben die anderen Regime in
[die überlappenden Uhren](/bok/incidents#the-overlapping-clocks), und Kapitel 23 liest Anlage 1 für
Agenten in [EU-KI-Verordnung-Hooks für Agenten](/bok/governing-agents#eu-ai-act-hooks-for-agents).

## Datenschutz und sonstiges EU-Recht

Ein auf dem EU-Markt in Verkehr gebrachtes KI-System erfüllt am ersten Tag mehr Recht als die
KI-Verordnung. Die Zeilen unten indexieren die Verpflichtungen, die die Kapitel v0.5.0 lehren: die
DSGVO, die Cybersicherheits- und Incident-Meldungsregime und das Haftungs-, Urheberrechts-,
Verbraucher- und Sektorrecht, das bereits KI erreicht. Sie antworten ihren eigenen Aufsichtsbehörden
(Datenschutzbehörden, CSIRTs und Finanzaufseher, Gerichte und Verbraucherbehörden), nicht den
Marktüberwachungsbehörden der KI-Verordnung, und mehrere gelten durch nationale Umsetzung, daher
sagt die Spalte "Gilt" dies. Zuordnungen sind illustrativ, keine Konformitätsbehauptung.

### Die DSGVO

Die DSGVO gilt seit 25. Mai 2018 [66]. Kapitel 19 geht jede Zeile unten durch, mit dem
Anonymitätstest des EDPB für trainierte Modelle [67], in
[Datenschutz- und Datenschutzrecht auf KI angewendet](/bok/privacy-and-ai#obligation-to-artefact-map);
Kapitel 16 erstellt die Erklär- und Anfechtungsunterlagen von `Arts. 15(1)(h)` und {`22`} in
[Datenschutz: die DSGVO und das britische Regime](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).

| Artikel | Was es verlangt | Engineering-Artefakt | Schicht | Wer ist gebunden | Gilt |
|---|---|---|---|---|---|
| `Art. 5(1)(b) and 6(4)` | Personenbezogene Daten werden für spezifische, explizite und legitime Zwecke erhoben und nicht auf unvereinbare Weise weiterverarbeitet; Art. 6(4) setzt den Kompatibilitätstest für Wiederverwendung, wie Training auf Daten, die für einen anderen Zweck erhoben wurden [66] | Zweck-Tags auf Datensätzen; Zweck-Match-Richtlinie in Trainings- und Indexierungs-Pipelines; Kompatibilitätsbewertungsunterlagen | 1 · 2 | Verantwortlicher | 2018-05-25 |
| `Art. 6` | Eine rechtmäßige Grundlage für jede Verarbeitungstätigkeit, separat bewertet für Training, Fine-Tuning, Abruf und Inferenz [66][67] | Grundlagen-Registrierung pro Datensatz und Stufe; versionierte Bewertung berechtigter Interessen | 2 | Verantwortlicher | 2018-05-25 |
| `Art. 7` | Wenn Einwilligung die Grundlage ist, kann der Verantwortliche diese nachweisen, und das Widerrufen der Einwilligung ist so einfach wie das Geben [66] | Einwilligungs-Zweck-Protokoll mit Datensätzen und Modellversionen verbunden; Widerruf an die Pipelines weitergeleitet | 2 · 5 | Verantwortlicher | 2018-05-25 |
| `Art. 9` | Verarbeitung besonderer Kategorien von Daten, einschl. biometrischer Daten zur eindeutigen Identifizierung, ist verboten, es sei denn, eine Bedingung des Art. 9(2) gilt, die sensible Daten erreicht, die ein Modell ableitet [66] | Proxy-Test in CI; Inferenz-Richtlinie mit einem Runtime-Ausgabeklassifizierer; Art.-9(2)-Bedingungsunterlagen | 1 · 3 · 4 | Verantwortlicher | 2018-05-25 |
| `Arts. 13–14` | Unterrichten von Betroffenen über Zwecke, Grundlagen, Empfänger und Aufbewahrung und, für automatisierte Entscheidungsfindung, Bereitstellung aussagekräftiger Informationen über die beteiligten Logik (Art. 13(2)(f), 14(2)(g)) [66] | Mitteilung aus dem Registrierungseintrag generiert; Model Card; automatisierte-Entscheidungs-Mitteilung pro System | 2 | Verantwortlicher | 2018-05-25 |
| `Art. 15(1)(h)` | Auf Anfrage Bestätigung der automatisierten Entscheidungsfindung und aussagekräftige Informationen über die beteiligten Logik und deren Bedeutung und vorgesehene Folgen [66] | Pro-Anfrage-Erklärung aus dem Entscheidungsunterlagen generiert; System-Level-Mitteilung zur automatisierten Entscheidungsfindung | 4 · 5 | Verantwortlicher | 2018-05-25 |
| `Arts. 15–17 and 21` | Zugriff, Berichtigung, Löschung und Anfechtungsanfragen erreichen jeden Ort, an dem die Daten leben: Korpus, Snapshots, Abrufindex, Protokolle und, wo es personenbezogene Daten enthält, das Modell [66] | Anfrage-Workflow über Korpus, Snapshots, Abrufindex, Protokolle und Gewichte; Erfüllungsunterlagen | 4 · 5 | Verantwortlicher | 2018-05-25 |
| `Art. 22` | Ein Recht, nicht Gegenstand einer Entscheidung zu sein, die ausschließlich auf automatisierter Verarbeitung mit rechtlichen oder ähnlich erheblichen Auswirkungen beruht, außer auf Vertrag, Recht oder ausdrückliche Einwilligung; dann menschliche Intervention, das Recht, einen Standpunkt zu äußern und anzufechten (Art. 22(3)) [66] | Entscheidungsprotokoll mit Grundcodes; Einspruchskanal und Protokoll der menschlichen Überprüfung; Berufungsergebnisse nach Gruppe | 4 · 5 | Verantwortlicher | 2018-05-25 |
| `Art. 5(1)(c) and 25` | Angemessene, relevante und begrenzte Daten mit technischen und organisatorischen Maßnahmen, die bei der Gestaltung eingebaut und standardmäßig festgelegt sind [66] | Merkmalsbegründungsprotokoll; Filter für personenbezogene Daten und besondere Kategorien; Aufbewahrung als Code | 1 · 3 | Verantwortlicher | 2018-05-25 |
| `Art. 5(2)` | Ein Verantwortlicher, der behauptet, dass ein trainiertes Modell keine personenbezogenen Daten enthält, muss dies nachweisen können; der EDPB legt einen Anonymitätstest und die erwarteten Nachweise fest [66][67] | Anonymitätsnachweispaket; Membership-Inference- und Extraction-Evals im Eval Gate | 3 · 5 | Verantwortlicher (Modellentwickler) | 2018-05-25 |
| `Art. 28` | Verwenden Sie nur Auftragsverarbeiter mit ausreichenden Garantien, unter einem Vertrag, der Anweisungen, Unterauftragsverarbeiter, Sicherheit, Unterstützung und Löschung festlegt [66] | Checkliste für KI-Anbieter im Due-Diligence-Gate (kein Training, keine Aufbewahrung, keine Region, keine Unterauftragsverarbeiter, Änderungsmitteilung) | 2 · 5 | Verantwortlicher; Auftragsverarbeiter | 2018-05-25 |
| `Art. 30` | Verantwortliche und Auftragsverarbeiter führen ein Verzeichnis der Verarbeitungstätigkeiten, für die sie verantwortlich sind [66] | Verzeichnisse, die pro Verarbeitungsmoment aus dem Register und den Datenkarten generiert werden | 2 · 5 | Verantwortlicher; Auftragsverarbeiter | 2018-05-25 |
| `Arts. 33–34` | Benachrichtigen Sie die Aufsichtsbehörde ohne unangemessene Verzögerung und, soweit möglich, innerhalb von 72 Stunden nach Kenntnisnahme; teilen Sie betroffenen Personen ohne unangemessene Verzögerung mit, wenn die Verletzung ein hohes Risiko darstellt [66] | Zweig für Verletzung personenbezogener Daten in der Incident Pipeline mit eigenem 72-Stunden-Timer; Vorlage für Benachrichtigung betroffener Personen | 4 · 5 | Verantwortlicher (der Auftragsverarbeiter benachrichtigt den Verantwortlichen) | 2018-05-25 |
| `Arts. 35–36` | Bewerten Sie die Auswirkungen vor einer Verarbeitung, die wahrscheinlich ein hohes Risiko darstellt, und konsultieren Sie die Aufsichtsbehörde, wenn das Restrisiko hoch bleibt [66] | KI-DSFA-Vorlage mit KI-spezifischen Feldern, querverwiesen durch die FRIA; dokumentierte Entscheidung, wenn keine DSFA erforderlich ist | 1 · 2 | Verantwortlicher | 2018-05-25 |
| `Arts. 44–49` | Übermittlungen außerhalb des EWR nur auf Grundlage eines Angemessenheitsbeschlusses, angemessener Garantien (wie Standardvertragsklauseln oder verbindliche interne Datenschutzvorschriften) oder einer engen Ausnahmeregelung; das Senden personenbezogener Daten an ein Modell, das außerhalb des EWR gehostet wird, kann eine Übermittlung sein [66] | Übermittlungsregister; Residenzbestimmung und Routing-Richtlinie als Code; Übermittlungsfolgenabschätzung | 1 · 4 · 5 | Verantwortlicher; Auftragsverarbeiter | 2018-05-25 |

### Cyber-Sicherheit und Incident-Meldepflicht

NIS2 bindet wesentliche und wichtige Einrichtungen durch nationales Recht, das die Mitgliedstaaten
ab 18. Oktober 2024 anwenden [68]; DORA gilt für Finanzeinrichtungen seit 17. Januar 2025 [69],
wobei die Incident-Fristen in der Delegierten Verordnung (EU) 2025/301 festgelegt sind [70]; und die
Meldepflicht der Cyber-Resilience-Verordnung gilt ab 11. September 2026, vor dem Rest dieser
Verordnung am 11. Dezember 2027 [71]. Ein KI-Incident kann mehrere dieser Uhren gleichzeitig
starten: Kapitel 17 legt sie nebeneinander in
[den überlappenden Uhren](/bok/incidents#the-overlapping-clocks) dar, und Kapitel 15 behandelt
[Kontinuität bei Ausfall des Anbieters](/bok/governing-deployment#when-the-provider-fails-continuity).

| Artikel | Was es verlangt | Engineering-Artefakt | Schicht | Wer ist gebunden | Gilt |
|---|---|---|---|---|---|
| NIS2 `Art. 21(2)(c)–(d)` | Risikomanagementsmaßnahmen umfassen Geschäftskontinuität (Sicherung, Notfallwiederherstellung, Krisenmanagementsystem) und Supply-Chain-Sicherheit mit direkten Lieferanten und Dienstleistern, die KI- und Modelldienste abdeckt [68] | Kontinuitätsplan für KI-Abhängigkeiten mit getesteten Fallbacks; Lieferantenbewertungen für Modell- und Plattformanbieter | 4 · 5 | Wesentliche und wichtige Einrichtungen | 2024-10-18, durch nationales Recht |
| NIS2 `Art. 23` | Eine Frühwarnung innerhalb von 24 Stunden nach Kenntnisnahme eines erheblichen Incidents, eine Incident-Meldung innerhalb von 72 Stunden und ein Abschlussbericht innerhalb eines Monats nach der Meldung, einschließlich der Grundursache [68] | Pro-Regime-Uhr im Incident-Datensatz; Erheblichkeitsbestimmung mit einem Eigentümer; Ursachen-Codierung wiederverwendet im Abschlussbericht | 5 | Wesentliche und wichtige Einrichtungen | 2024-10-18, durch nationales Recht |
| DORA `Art. 19` | Melden Sie größere ICT-bezogene Incidents: erste Benachrichtigung innerhalb von 4 Stunden nach Klassifizierung als größer und spätestens 24 Stunden nach Kenntnisnahme (innerhalb von 4 Stunden nach einer Klassifizierung, die nach diesen 24 Stunden erfolgt), Zwischenbericht innerhalb von 72 Stunden nach der ersten Benachrichtigung, Abschlussbericht innerhalb eines Monats nach dem letzten Zwischenbericht [69][70] | Klassifizierungsprotokoll mit Zeitstempel; Pro-Regime-Uhr; konsistente Ursachen-Codierung für Aggregation wiederkehrender Incidents | 5 | Finanzeinrichtungen | 2025-01-17 |
| DORA `Art. 28(3)`, `28(8)` | Führen Sie ein Register mit Informationen über alle vertraglichen Vereinbarungen für ICT-Dienste von Drittanbietern und Ausstiegsstrategien für ICT-Dienste, die kritische oder wichtige Funktionen unterstützen [69] | Registereinträge für KI- und Modelldienste; Ausstiegsplan und Ausstiegsübungsprotokoll | 2 · 5 | Finanzeinrichtungen | 2025-01-17 |
| CRA `Art. 14` | Benachrichtigen Sie aktiv ausgenutzte Schwachstellen und schwerwiegende Incidents über die einzige Meldeplattform: Frühwarnung innerhalb von 24 Stunden, Meldung innerhalb von 72 Stunden, Abschlussbericht 14 Tage nach Verfügbarkeit eines Fixes (Schwachstelle) oder einen Monat nach der Meldung (Incident) [71] | Schwachstellen- und Incident-Uhren im Incident-Datensatz; Einreichung über die einzige Meldeplattform | 4 · 5 | Hersteller von Produkten mit digitalen Elementen | 2026-09-11; der Rest ab 2027-12-11 |

### Haftung, Urheberrecht, Verbraucher- und Branchenrecht

Die überarbeitete Produkthaftungsrichtlinie behandelt Software, einschließlich KI-Systeme, als
Produkt und gilt für Produkte, die nach 9. Dezember 2026 in den Verkehr gebracht werden [72]. Die
Text- und Data-Mining-Ausnahme der DSM-Richtlinie unterliegt einem Vorbehalt des Rechteinhabers
[73], was die Regel `Art. 53(1)(c)` ist, auf die die KI-Verordnung verweist. Das Gesetz über
digitale Dienste, die Richtlinie über unlautere Geschäftspraktiken, die Richtlinie über
Plattformarbeit und die überarbeitete Richtlinie über Verbraucherkreditverträge fügen Pflichten für
Plattformen, Händler, digitale Arbeitsplattformen und Kreditgeber hinzu [74][75][76][77]. Kapitel 20
lehrt sie: [Urheberrecht und Trainingsdaten](/bok/existing-law#copyright-and-training-data),
[die EU-Produkthaftungsrichtlinie](/bok/existing-law#the-eu-product-liability-directive),
[Pflicht zur Warnung nach Updates](/bok/existing-law#duty-to-warn-after-updates),
[die EU: UCPD, DSA und die KI-Verordnung](/bok/existing-law#the-eu-ucpd-dsa-and-the-ai-act),
[Beschäftigung](/bok/existing-law#employment) und
[Kredit und Kreditvergabe](/bok/existing-law#credit-and-lending).

| Artikel | Was es verlangt | Engineering-Artefakt | Schicht | Wer ist gebunden | Gilt |
|---|---|---|---|---|---|
| PLD `Art. 4(1)` | Software ist ein Produkt, daher haftet der Hersteller eines KI-Systems streng für Schäden, die durch einen Mangel an einem Produkt verursacht werden, das nach 2026-12-09 in den Verkehr gebracht oder in Betrieb genommen wird [72] | Überprüfung der Mangelhaftung bei der Gestaltung; vertragliche Regresse; Restrisiko im Register | 1 · 5 | Hersteller und andere Wirtschaftsteilnehmer | Produkte, die nach 2026-12-09 in den Verkehr gebracht werden |
| PLD `Arts. 9–10` | Ein Gericht kann den Beklagten auffordern, relevante Beweise in seinem Besitz offenzulegen; das Versäumnis, diese offenzulegen, ist eine der Bedingungen, unter denen das Produkt als mangelhaft vermutet wird [72] | Verteidigungsdatei pro Release: AIBOM mit Hashes, Eval-Verlauf, Ausfallmodusanalyse, signierte Protokolle, Betriebsanleitungen, aufbewahrt für den Haftungszeitraum | 2 · 3 · 5 | Hersteller, einschließlich Anbieter von KI-Systemen und wesentliche Modifizierer | Produkte, die nach 2026-12-09 in den Verkehr gebracht werden |
| PLD `Art. 11(2)` | Der Hersteller kann sich nicht auf den Mangel berufen, der nach dem Inverkehrbringen auftritt, wenn er auf Software, einschließlich ihrer Updates oder Upgrades, oder auf fehlende Sicherheitsupdates zurückzuführen ist, die unter seiner Kontrolle bleiben [72] | Änderungsprotokoll; Regressions-Evals pro Release; Patch-Entscheidungsprotokolle; versionierte Warnungen | 3 · 4 · 5 | Hersteller | Produkte, die nach 2026-12-09 in den Verkehr gebracht werden |
| DSM-Richtlinie `Art. 4(3)` | Die allgemeine Text- und Data-Mining-Ausnahme gilt nur, wenn Rechteinhaber die Nutzung nicht ausdrücklich auf angemessene Weise vorbehalten haben, beispielsweise durch maschinenlesbare Mittel für öffentlich zugängliche Inhalte online [73] | Crawler-Policy-as-Code, das Vorbehalte beachtet; Training-Data-Rights-Ledger mit Vorbehaltsprüfungsergebnis, Methode und Datum | 1 · 2 | Jeder, der Werke abbaut, einschließlich Modellentwickler | Umsetzungsfrist 2021-06-07 |
| DSA `Art. 25` | Online-Plattformen gestalten, organisieren oder betreiben ihre Schnittstellen nicht auf eine Weise, die Nutzer täuscht oder manipuliert oder ihre freie und informierte Entscheidungsfindung beeinträchtigt [74] | Schnittstellenüberprüfungsprotokoll; Red-Team-Eval für manipulative Ausgaben | 3 · 5 | Anbieter von Online-Plattformen | 2024-02-17 |
| DSA `Art. 27` | Online-Plattformen legen in ihren Bedingungen die Hauptparameter ihrer Empfehlungssysteme und alle Optionen dar, die Nutzer haben, um diese zu ändern [74] | Empfehlungsparameter-Card, die aus der Ranking-Konfiguration generiert wird; Protokoll der Optionen, die Nutzern angeboten werden | 2 · 4 | Anbieter von Online-Plattformen | 2024-02-17 |
| UCPD `Arts. 5–7`, Anlage I | Keine Geschäftspraxis, die der beruflichen Sorgfalt widerspricht oder irreführend ist und die Entscheidungen des Durchschnittverbrauchers verzerrt, einschließlich KI-generierter Ansprüche und Chatbot-Antworten; die Angabe, dass Bewertungen echt sind, ohne angemessene Überprüfungen, und gefälschte Bewertungen sind auf die schwarze Liste gesetzt (Anlage I Punkte 23b und 23c) [75] | Anspruchsregister verknüpft mit Eval-Ergebnissen; Überprüfung der Bewertungsherkunft; Chatbot-Antwort-Evals zu Produktansprüchen | 1 · 3 · 4 | Händler, die mit Verbrauchern handeln | 2007-12-12; Überprüfungspunkte seit Richtlinie (EU) 2019/2161 |
| Richtlinie über Plattformarbeit `Arts. 7`, `9–11` | Grenzen für die personenbezogenen Daten, die Plattformen durch automatisierte Systeme verarbeiten dürfen, Transparenz über diese Systeme, menschliche Aufsicht mit einer Folgenabschätzung mindestens alle zwei Jahre und Erklärung sowie menschliche Überprüfung von Entscheidungen [76] | Register automatisierter Systeme mit ihren Hauptparametern; Datenkategorie-Deny-Liste; zweijährliche Folgenabschätzung; Erklärung und Protokoll der menschlichen Überprüfung | 1 · 2 · 3 · 5 | Digitale Arbeitsplattformen | Umsetzung bis 2026-12-02 |
| CCD2 `Art. 18(8)` | Wenn die Bonitätsbewertung automatisierte Verarbeitung beinhaltet, kann der Verbraucher menschliche Intervention, eine klare Erklärung der Bewertung und ihrer Logik sowie eine Überprüfung der Entscheidung anfordern [77] | Erklärungsartefakt pro Modellversion; Überprüfungspfad und Protokoll | 3 · 4 · 5 | Kreditgeber | 2026-11-20 |

## ISO/IEC 42001, 42005 und 42006

ISO/IEC 42001:2023 ist der Standard für KI-Managementsysteme (AIMS); sein Anhang A gruppiert
Kontrollziele in neun Bereiche (`A.2`–`A.10`). Es ist ein Managementsystem-Standard, nicht das QMS
nach Artikel 17, und seine europäische Annahme (EN ISO/IEC 42001:2026) verleiht keine
Konformitätsvermutung [11][12].

| Anhang-A-Bereich | Fokus | Engineering-Artefakt | Schicht |
|---|---|---|---|
| `A.2` Richtlinien im Zusammenhang mit KI | KI-Richtliniensatz und dessen Governance | Policy-as-Code-Bibliothek; versioniertes Policy-Repository | 1 |
| `A.3` Interne Organisation | Rollen, Verantwortlichkeiten, Berichterstattung | Betriebsmodell; RACI; Eigentümerschaft im Register | 1 · 2 |
| `A.4` Ressourcen für KI-Systeme | Daten, Werkzeuge, Rechenleistung, Humanressourcen dokumentiert | Ressourcenbestand; AIBOM; Umgebungsmanifeste | 2 |
| `A.5` Bewertung der Auswirkungen von KI-Systemen | Prozess der Folgenabschätzung | Folgenabschätzung als Code; FRIA/DSFA-Verknüpfung (ISO/IEC 42005) | 1 · 3 |
| `A.6` Lebenszyklus des KI-Systems | Verantwortungsvolle Gestaltung, Entwicklung, Bereitstellung | Pipeline-Kontrollen; Eval Gates; Änderungsverwaltung | 1 · 3 · 4 |
| `A.7` Daten für KI-Systeme | Datenqualität, Herkunft, Vorbereitung | Datenkarten; Lineage; Datenqualitätstests | 2 · 3 |
| `A.8` Informationen für interessierte Parteien | Transparenz und Berichterstattung an Stakeholder | Modell-/Datenkarten; maschinenlesbare Offenlegungen | 2 |
| `A.9` Nutzung von KI-Systemen | Verantwortungsvolle Nutzungskontrollen und Überwachung | Runtime Guardrails; Nutzungstelemetrie | 4 |
| `A.10` Beziehungen zu Dritten und Kunden | Verwaltung von Lieferanten- und Kundenverantwortlichkeiten | Lieferanten-AIBOM; Zuordnung von vertraglichen und technischen Kontrollen | 2 · 5 |

ISO/IEC 42005:2025 bietet Leitlinien für die Folgenabschätzung von KI-Systemen und ist der
natürliche Begleiter zu Artikel 27 (FRIA) und Anlage A.5 [13]. Das Betriebsmodell und die RACI der
`A.3`-Zeile sind in [einer Lifecycle-RACI](/bok/governance-program#a-lifecycle-raci) (Kapitel 12)
eingebaut, und Kapitel 22 ordnet diese Standards in
[der ISO/IEC-Familie](/bok/principles-and-standards#the-isoiec-family) als Ganzes ein.

Zwei weitere ISO/IEC-Standards stehen neben den AIMS. **ISO/IEC 42006:2025** legt die Anforderungen
an die Stellen fest, die KI-Managementsysteme prüfen und zertifizieren: aufbauend auf ISO/IEC
17021-1 ist sie die Antwort auf "wer darf Sie glaubwürdig auf 42001 zertifizieren", da sie die
Kompetenz und Konsistenz festlegt, die eine Zertifizierungsstelle nachweisen muss.
**ISO/IEC 23894:2023** bietet Leitlinien zum KI-Risikomanagement und passt ISO 31000 an KI an; sie
ist der Risikoprozess-Begleiter zu Artikel 9 und zum NIST AI RMF [27][28]. Die Tabelle enthält auch
ISO/IEC 42005:2025, die Leitlinien zur Folgenabschätzung [13], und **ISO/IEC 22989:2022**, den
Standard für Konzepte und Terminologie, dessen KI-Stakeholder-Rollen und Lifecycle-Vokabular ein
Register Feld für Feld wiederverwenden kann [78].

| Standard | Was es ist | Engineering-Artefakt | Schicht |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Anforderungen an Stellen, die KI-Managementsysteme prüfen und zertifizieren (wer darf Sie glaubwürdig auf 42001 zertifizieren) | Akkreditierter Zertifizierungsumfang; Auditor-Kompetenznachweis; Zertifikatregister | 5 |
| `ISO/IEC 23894:2023` | Leitlinien zum KI-Risikomanagement (Begleiter zu ISO 31000) | Risikoregister als Code; KI-Risikotaxonomie; Verknüpfung zur KI-Verordnung der EU `Art. 9` und zum NIST AI RMF | 1 · 3 |
| `ISO/IEC 42005:2025` | Leitlinien zur Bewertung der Auswirkungen eines KI-Systems auf Einzelpersonen, Gruppen und die Gesellschaft über seinen gesamten Lebenszyklus (Begleiter zu Art. 27 und Anlage A.5) [13] | Folgenabschätzung als Code aus einer Vorlage; FRIA- und DPIA-Querverweise; Neubewertungsauslöser | 1 · 3 |
| `ISO/IEC 22989:2022` | Ein gemeinsames Vokabular für KI-Konzepte, den KI-System-Lebenszyklus und KI-Stakeholder-Rollen [78] | Registerfeldnamen und Rollenvokabular, die an die Begriffe des Standards angepasst sind; Glossar-Querverweise | 2 |

**Zuordnung:** Diese Kontrollen werden durch die Schichten 1, 2, 3 und 5 des Stack realisiert; die
Folgenabschätzungs-Kontrolle (A.5 / ISO 42005) unterstützt die KI-Verordnung der EU `Art. 27`.
Zuordnungen sind illustrativ, keine Konformitätsaussage.

## NIST AI RMF

Das NIST AI Risk Management Framework 1.0 (Januar 2023; es gibt keine 2.0) organisiert Risikoarbeit
in vier Funktionen. Es ist freiwillig und von US-Ursprung, und es ordnet sich sauber dem
fünfschichtigen Stack zu [14]. Ab 2026-09-24 besagt die Framework-Seite von NIST, dass AI RMF 1.0
"im Rahmen des White House AI Action Plan überarbeitet wird"; kein überarbeiteter Text war
veröffentlicht worden, daher bleibt 1.0 die zu zitierbare und in Kontrollmetadaten zu fixierende
Version [59]. Kapitel 22 behandelt
[das NIST AI RMF ausführlich](/bok/principles-and-standards#nist-ai-rmf-10-in-depth): die sieben
vertrauenswürdigen Merkmale, die 19 Kategorien des Core, das Playbook und die Profile.

| Funktion | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|
| GOVERN | Eine Kultur und Struktur für die Verwaltung von KI-Risiken | Policy-as-Code; Betriebsmodell; Register-Eigentümerschaft | 1 · 2 |
| MAP | Kontext und Risikorahmen für jedes KI-System | Bedrohungsmodelle; Use-Case- und Impact-Mapping; Daten-/Modellkarten | 2 · 3 |
| MEASURE | Risiken analysieren, benchmarken und überwachen | Eval Gates; Adversarial Red-Team Suite; Metriken pro Fehlermodus | 3 |
| MANAGE | Priorisieren, reagieren und wiederherstellen | Runtime Guardrails; Incident Pipeline; kontinuierliche Assurance | 4 · 5 |

### Neuere NIST-KI-Arbeiten

Jenseits des RMF haben drei neuere NIST-Bemühungen Auswirkungen auf den Stack. Zwei sind noch in
Entwurf, und der Text sagt das. Die **AI Agent Standards Initiative**, gestartet von NISTSCenter for
AI Standards and Innovation (CAISI) am 17. Februar 2026, zielt auf interoperable, sichere Standards
für KI-Agenten ab: Identität, Authentifizierung, Autorisierung und Agent-Sicherheit [29]. Das
Entwurf **IR 8596 Cyber AI Profile** (initial preliminary draft, 16. Dezember 2025; Kommentare
geschlossen 30. Januar 2026, und immer noch die aktuelle Version ab 2026-09-24) ist ein
Cybersecurity Framework (CSF 2.0) Profil für KI, organisiert um Secure, Defend und Thwart [30]. Das
Entwurf **AI 800-1** (Managing Misuse Risk for Dual-Use Foundation Models; zweiter öffentlicher
Entwurf, Januar 2025; keine endgültige Version veröffentlicht ab 2026-09-24) ist freiwillige
Anleitung zur Identifizierung, Messung und Minderung von Missbrauchsrisiken über den KI-Lebenszyklus
[31]. Das ältere **Generative AI Profile**, NIST AI 600-1 (26. Juli 2024), ist der Begleiter des RMF
für generative KI: 12 Risiken und vorgeschlagene Maßnahmen, die den vier Funktionen zugeordnet sind,
und die Tabelle enthält es auch [79].

| NIST-Element | Was es ist | Engineering-Artefakt | Schicht |
|---|---|---|---|
| AI Agent Standards Initiative (2026) | CAISI-Initiative für interoperable, sichere KI-Agenten: Identität, Authentifizierung, Agent-Sicherheit | Agentenregister; Nicht-Mensch-Identitäts-Kontrollen; Agent-Authentifizierung und Autorisierung; adversarische Agent-Evals | 3 · 4 |
| IR 8596 Cyber AI Profile (Entwurf) | CSF 2.0 Profil für KI (Secure / Defend / Thwart) | KI-System-Sicherheitskontrollen; Runtime-Observability; Bedrohungserkennung auf CSF 2.0 abgebildet | 3 · 4 |
| AI 800-1 (Entwurf) | Managing Misuse Risk for Dual-Use Foundation Models (freiwillige Anleitung) | Missbrauch Red-Team Suite; Fähigkeits- und gefährliche Fähigkeits-Evals; Sicherheitsrahmen | 3 |
| AI 600-1 Generative AI Profile (2024) | Vorgeschlagene Maßnahmen für 12 Risiken, die generative KI schafft oder verschärft, den Funktionen Govern, Map, Measure und Manage zugeordnet [79] | Generative-AI-Eval-Suites benannt nach den Action-IDs des Profils (z. B. Konfabulation, Informationsintegrität); ein Register-Eintrag pro Profilrisiko | 1 · 3 |

## CSA AICM und STAR für KI

Die Cloud Security Alliance's AI Controls Matrix (AICM) v1.1, veröffentlicht 22. Juni 2026,
definiert 247 Kontrollziele über 18 Domänen, und das STAR für AI Programm bietet das
Assurance-Schema darum herum, in drei Ebenen: eine Level 1 Selbstbewertung, eine Level 1
"Valid-AI-ted" automatisierte Validierung, und eine Level 2, die ISO/IEC 42001 Zertifizierung
hinzufügt [15][83].

| CSA-Artefakt | Was es ist | Engineering-Artefakt | Schicht |
|---|---|---|---|
| AICM v1.1 | 247 Kontrollziele über 18 Domänen, die Governance, Daten, Modell und Runtime umfassen | Kontrollkatalog auf Policy-as-Code und Evals abgebildet; Crosswalk zu ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR für KI | Assurance- und Zertifizierungsprogramm auf der AICM: Level 1 Selbstbewertung, Level 1 Valid-AI-ted (automatisierte Validierung) und Level 2 (ISO/IEC 42001 Zertifizierung plus die validierte Bewertung) [83] | Machine-Readable Evidence Einreichung; kontinuierliche Assurance Telemetrie | 5 |
| Agent-Kontrollen (AICM v1.1, ATF, AARM) | Agent-spezifische AICM-Kontrollen (z. B. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), mit dem Agentic Trust Framework v1 (verdiente Autonomie-Stufen) und der AARM Runtime-Interception-Spezifikation [80][81][82] | Agent-spezifische Kontrolldefinitionen; Policy-as-Code für Agent-Umfang und Tools; Runtime Guardrails | 1 · 4 |
| Catastrophic Risk Annex | Erweiterte AICM-Kontrollen für hochautonome Systeme mit katastrophalem Risikopotenzial | Erweiterte Kontrollen für hochautonome Systeme; Kill Switch und Oversight-Kontrollen; Pilot-Audit-Evidenz | 4 · 5 |

Zwei Arbeitslinien treiben die AICM in Richtung Agenten und Frontier-Risiko. Für Agenten sitzen die
Kontrollen innerhalb der Matrix selbst (zum Beispiel IAM-18 Agent Access Restriction und AIS-11
Agents Security Boundaries) [80], und das agentic control-plane Programm der CSA fügt zwei
veröffentlichte Spezifikationen hinzu, das **Agentic Trust Framework** (Zero Trust für Agenten mit
verdiente Autonomie-Stufen) und **AARM** (Interception von Agent-Aktionen vor ihrer Ausführung)
[32][81][82]. Frühere Ausgaben dieser Karte führten ein vorgeschlagenes "Agentic Control Supplement"
zur AICM auf; es konnte ab 2026-09-24 nicht mit einem primären CSA-Dokument abgeglichen werden,
daher benennt die Zeile jetzt das, was veröffentlicht ist (überprüfen). Für Frontier-Risiko fügt die
**Catastrophic Risk Annex** eine Reihe von erweiterten Kontrollen für hochautonome Systeme hinzu,
die durch Pilot-Audits nachgewiesen werden sollen, anstatt behauptet zu werden [33].

## OWASP GenAI Security Project

OWASPs GenAI Security Project liefert das Bedrohungsvokabular, gegen das die Kontrollen aufgebaut
sind, plus zwei Formate (den Agent Control Standard und ein AIBOM), die der Stack direkt verbraucht
[16][17][54]. Kapitel 23 ordnet jeden agentic-Eintrag seinen Kontrollen in
[threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls) zu.

| OWASP-Artefakt | Was es ist | Engineering-Artefakt | Schicht |
|---|---|---|---|
| Top 10 für Agentic Applications 2026 | Agent-Bedrohungskatalog (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Agent-Bedrohungsmodell; adversarische Evals; Runtime Guardrails; Kill Switch | 3 · 4 |
| Top 10 für LLM Applications 2026 | LLM-Bedrohungskatalog (inkl. Excessive Agency bei #3) | Prompt-Injection- und Output-Handling-Kontrollen; Eval Gate | 3 · 4 |
| Agent Control Standard (ACS) | Ein Standard zur Ausdrückung von Agent-Kontrollen | Machine-Readable Kontrolldefinitionen für Agenten | 1 · 4 |
| AIBOM | AI Bill-of-Materials Format und Generator | AIBOM beim Build (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## US-Bundesgesetze und Staatsgesetze

Die Vereinigten Staaten haben kein horizontales Bundesgesetz zur KI; die bindenden KI-spezifischen
Regeln sind Staatsgesetze, und sie unterscheiden sich im Umfang. Zwei binden nur
Frontier-Entwickler, mit den schwersten Pflichten auf den großen; der Rest erreicht gewöhnliche
Entwickler, Betreiber und Operatoren, und Bundesrecht, das KI vorausgeht (Fair Lending,
Kreditberichterstattung, Beschäftigungsdiskriminierung, der FTC Act) erreicht bereits
KI-Entscheidungen. Die Tabellen unten tragen sie alle als Zeilen. Kapitel 21 unterrichtet sie:
[die Bundesebene](/bok/ai-laws-worldwide#united-states-the-federal-layer) (Executive Orders, die
OMB-Memoranden, die Agenturen und ihre Anbieter binden, und der Bundesdruck gegen Staatsgesetze zur
KI) und die
[Staatsgesetze, die private Organisationen binden](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
jeweils mit ihrem Umfang, Daten, Pflichten und Durchsetzung.

### Frontier-Entwickler-Gesetze

Zwei US-Staatsgesetze binden nur Frontier-Entwickler, mit den schwersten Pflichten auf den großen,
nicht allgemeine Betreiber: ein engerer Umfang als die Risiko-Staffelung des EU AI Act. Sie
verlangen von großen Frontier-Entwicklern, Sicherheitsrahmen zu veröffentlichen, und von jedem
Frontier-Entwickler, kritische Sicherheitsvorfälle dem Staat zu melden [18][19][25]. Kaliforniens
Whistleblower-Schutz wird in der Praxis durch
[einen Kanal zum Erheben von Bedenken](/bok/governance-program#a-channel-for-raising-concerns)
erfüllt (Kapitel 12).

| Gesetz | Umfang | Pflicht | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| California SB 53 (TFAIA), in Kraft 2026-01-01 | Frontier-Entwickler (Modelle trainiert über ~10^26 FLOP); die Framework-Pflicht bindet große Frontier-Entwickler (Entwickler-Umsatz über USD 500M) | Veröffentlichung eines Frontier-KI-Rahmens; Meldung kritischer Sicherheitsvorfälle an das Office of Emergency Services innerhalb von 15 Tagen; Whistleblower-Schutz; bis zu USD 1M pro Verstoß, AG-durchgesetzt [56] | Veröffentlichter Sicherheitsrahmen; Incident Pipeline Meldung an den Staat; Transparenz-Artefakte | 5 · 4 |
| California SB 53 Whistleblower-Schutz (Labor Code 1107–1107.2), in Kraft 2026-01-01 | Frontier-Entwickler; der anonyme Prozess bindet große Frontier-Entwickler | Keine Regel, Richtlinie oder Vereinbarung, die betroffene Arbeitnehmer daran hindert, Bedenken bezüglich katastrophaler Risiken offenzulegen, und keine Vergeltung; Mitteilung der Rechte; große Frontier-Entwickler führen einen anonymen internen Prozess mit monatlichen Aktualisierungen für den Melder durch, die mindestens vierteljährlich an Beamte und Direktoren weitergegeben werden [56] | Anonymer interner Meldekanal mit Statusaktualisierungen; Bestätigungsaufzeichnungen der Mitteilung; vierteljährliche Zusammenfassung für Beamte und Direktoren | 1 · 5 |
| New York RAISE Act (S6953B), unterzeichnet 2025-12-19 | Frontier-Entwickler (Modelle, die über 10^26 Operationen trainiert wurden) melden Vorfälle innerhalb von 72 Stunden; die Framework-Pflicht bindet große Frontier-Entwickler (Jahresumsatz über USD 500 Mio.); Schwellenwerte der Kapiteländerung unterzeichnet 2026-03-27 | Veröffentlichung eines Frontier-AI-Sicherheits- und Sicherheitsrahmens; Offenlegung von Sicherheitsvorfällen innerhalb von 72 Stunden. Eine Kapiteländerung unterzeichnet 2026-03-27 setzt das Stichtag auf 2027-01-01 und schafft ein Aufsichtsbüro innerhalb des New York Department of Financial Services (DFS) [19][24][25] | Veröffentlichter Frontier-AI-Sicherheitsrahmen; 72-Stunden-Vorfall- und Offenlegungspipeline-Meldung an das DFS-Aufsichtsbüro | 5 · 4 |

### Weitere staatliche KI-Gesetze

Diese staatlichen Gesetze gehen über Frontier-Entwickler hinaus auf gewöhnliche Entwickler,
Betreiber und Akteure: Texas und Colorado; Kaliforniens Trainingsdaten-, Herkunfts- und
Begleiter-Chatbot-Gesetze; New Yorks Begleitregeln; Illinois; New York Citys Local Law 144; und Utah
[55][84][85][86][88][89][90][91]. Kapitel 21 behandelt jedes einzelne mit seiner Durchsetzung in
seiner
[Tabelle der staatlichen Gesetze](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations)
und vergleicht die Einstellungsregeln in
[ein Einstellungstool, vier Regime](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes).

| Gesetz | Umfang | Pflicht | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), in Kraft ab 2026-01-01 | Entwickler und Betreiber, die in Texas tätig sind | Absichtsbasierte Verbote zur Entwicklung oder zum Einsatz von KI (Verhaltensmanipulation, rechtswidrige Diskriminierung); Social Scoring für Regierungsbehörden verboten; KI-Nutzungsoffenlegung durch Regierungsbehörden und Gesundheitsdienstleister; ein Reallabor; Durchsetzung durch den Generalstaatsanwalt; lokale KI-Regeln sind ausgeschlossen [35] | Verbotene-Nutzungs-Policy-as-Code; KI-Nutzungsoffenlegungskontrollen; Beschwerde- und Vorfallbehandlung | 1 · 4 |
| Colorado SB 26-189 (automatisierte Entscheidungstechnologie), wirksam ab 2027-01-01, ersetzt SB 24-205 | Entwickler und Betreiber von ADMT bei folgenreichen Entscheidungen | Entwicklerdokumentation für Betreiber und Mitteilung wesentlicher Aktualisierungen; Betreibermitteilung der ADMT-Nutzung; eine verständliche Erklärung innerhalb von 30 Tagen nach einem nachteiligen Ergebnis; Korrektur, menschliche Überprüfung und Überlegung; Aufzeichnungen mindestens drei Jahre lang aufbewahrt. SB 26-189 (unterzeichnet 2026-05-14) hob SB 24-205 auf und erließ es neu, dessen Sorgfaltspflicht gegen algorithmische Diskriminierung auf 2026-06-30 verschoben worden war und deren Durchsetzung ein Bundesgericht blockiert hatte [36][55] | ADMT-Bestand; Entwicklerdokumentationspaket; Vorlagen für Mitteilung und Erklärung nachteiliger Ergebnisse; Warteschlange für menschliche Überprüfung; Speicher für dreijährige Aufzeichnungen | 2 · 4 · 5 |
| Kalifornien AB 2013 (Trainingsdaten-Transparenz), fällig 2026-01-01 | Entwickler von generativen KI-Systemen, die seit 2022-01-01 veröffentlicht wurden | Entwickler veröffentlichen eine Zusammenfassung der Datensätze, die zum Trainieren eines generativen KI-Systems verwendet werden, das Kaliforniern zur Verfügung gestellt wird (Quellen, Größe, Datentypen, IP und persönliche Informationen, synthetische Daten) am oder vor 2026-01-01 und bei jeder wesentlichen Änderung [84] | Data Card pro Datensatz, veröffentlicht bei Veröffentlichung; Training-Data Rights Ledger | 2 |
| Kalifornien AI Transparency Act (SB 942 wie geändert durch AB 853), wirksam ab 2026-08-02 | Abgedeckte Anbieter öffentlicher generativer KI-Systeme; große Online-Plattformen; Erfassungsgerätehersteller | Abgedeckte Anbieter bieten ein kostenloses KI-Erkennungstool an und betten latente Offenlegungen mit einer optionalen Manifest-Offenlegung in generierte Bilder, Videos und Audio ein; große Online-Plattformen und Erfassungsgeräte folgen später [85] | Herkunftspipeline schreibt latente Metadaten; öffentlicher Erkennungsendpunkt; plattformseitige Herkunftsanzeige | 3 · 4 |
| Kalifornien SB 243 (Begleiter-Chatbots), kapitelisiert 2025-10-13 | Betreiber von Begleiter-Chatbots | Offenlegung von KI, wenn eine vernünftige Person irregeführt werden könnte; für bekannte Minderjährige, Erinnerung mindestens alle drei Stunden und Verhinderung von sexuell explizitem Inhalt; Durchführung eines Selbstmord- und Selbstverletzungsprotokolls mit Krisenüberweisung; jährliche Berichte ab 2027-07-01 [86] | Begleiter-Modus-Richtlinie; Erinnerungstimer; Krisenüberweisung-Klassifizierer und Protokoll; jährlicher Bericht | 1 · 4 · 5 |
| New York GBL Artikel 47 (KI-Begleiter-Modelle), in Kraft ab 2025-11-05 (überprüfen) | Betreiber von KI-Begleitern | Erkennung von Suizidgedanken und Selbstverletzung und Überweisung von Benutzern an Krisendienste; Benutzer mitteilen, dass sie nicht mit einem Menschen sprechen, am Anfang und mindestens alle drei Stunden [88] | Krisenüberweisung-Klassifizierer und Protokoll; Mitteilungs-Timer | 4 · 5 |
| Illinois HB 3773 (Änderung des Human Rights Act), wirksam ab 2026-01-01 | Arbeitgeber | Arbeitgeber dürfen KI mit diskriminierender Wirkung auf geschützte Klassen bei Rekrutierung, Einstellung, Beförderung, Disziplin oder anderen Beschäftigungsbedingungen nicht verwenden, noch Postleitzahlen als Proxy verwenden, und müssen Arbeitnehmer und Bewerber benachrichtigen [89][118] | KI-in-HR-Bestand; Adverse-Impact-Eval pro geschützte Klasse; Mitteilungsdatensatz | 2 · 3 · 4 |
| NYC Local Law 144 (automatisierte Beschäftigungsentscheidungstools), seit 2023-07-05 durchgesetzt | Arbeitgeber und Arbeitsvermittlungsagenturen, die AEDTs für New York City-Rollen verwenden | Ein unabhängiges Bias-Audit innerhalb eines Jahres vor der Verwendung, eine veröffentlichte Zusammenfassung der Ergebnisse und eine Mitteilung an Kandidaten und Arbeitnehmer 10 Geschäftstage vor der Verwendung [90] | Impact-Ratio-Eval nach Geschlecht, Rasse/Ethnizität und intersektionaler Kategorie; veröffentlichte Audit-Zusammenfassung; Mitteilungsdatensatz | 3 · 5 |
| Utah KI-Offenlegungsgesetz (SB 226), wirksam ab 2025-05-07 | Lieferanten, die generative KI in Verbrauchertransaktionen verwenden; regulierte Berufe | Offenlegung generativer KI, wenn eine Person klar und eindeutig danach fragt; regulierte Berufe legen sie prominent in einer hochriskanten KI-Interaktion offen; klare Offenlegung zu Beginn ist ein sicherer Hafen [91] | Offenlegungskomponente mit einem Interaktionsrisiko-Flag; Gesprächsprotokoll mit der Offenlegung | 4 |

### Staatliche Datenschutz- und Sektorgesetze

Staatliche Datenschutzgesetze erreichen KI durch Profiling-Opt-outs, Bewertungen, Zustimmung und
Überprüfungsrechte, und ein Sektorgesetz erreicht Versicherer-Modelle. Kapitel 19 vergleicht sie in
[den Vereinigten Staaten](/bok/privacy-and-ai#united-states) und Kapitel 20 behandelt
[Wohnen, Versicherung und öffentliche Dienste](/bok/existing-law#housing-insurance-and-public-services).

| Gesetz | Umfang | Pflicht | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| Kalifornien CPPA-Verordnungen (ADMT), Pflichten ab 2027-01-01 | Unternehmen, die dem CCPA unterliegen | Unternehmen, die ADMT für bedeutende Entscheidungen verwenden, geben eine Vornutzungsmitteilung, einen Opt-out oder eine menschliche Berufung und Zugriff auf Informationen über die ADMT [87] | ADMT-Register; Vornutzungsmitteilung; Opt-out- oder Berufungs-Workflow; ADMT-Zugriffantwort | 2 · 4 · 5 |
| Kalifornien CPPA-Verordnungen (Risikobewertungen), wirksam ab 2026-01-01 | Unternehmen, die dem CCPA unterliegen | Eine Risikobewertung vor der Verarbeitung, die erhebliches Risiko darstellt, einschließlich der Verwendung von ADMT für bedeutende Entscheidungen; Bescheinigungen und Zusammenfassungen, die der Behörde eingereicht werden [87] | Risikobewertung pro auslösende Aktivität; Einreichungsdatensatz | 5 |
| Virginia CDPA (§ 59.1-580), ab 2023-01-01 | Controller | Controller dokumentieren Datenschutzbewertungen für gezielte Werbung, Verkauf, Profiling, das ein vernünftigerweise vorhersehbares Risiko darstellt, und sensible Daten für die Verarbeitung, die nach 2023-01-01 erstellt wurde, und geben sie dem Generalstaatsanwalt auf Anfrage [93] | Bewertungsvorlage pro Verarbeitungsaktivität; Profiling-Register | 1 · 5 |
| Colorado Privacy Act (SB21-190), wirksam ab 2023-07-01 | Controller | Verbraucher können sich von Profiling abmelden, das Entscheidungen mit rechtlichen oder ähnlich bedeutenden Auswirkungen unterstützt, einschließlich durch einen universellen Opt-out-Mechanismus; Controller führen Datenschutzbewertungen für die Verarbeitung durch, die ein erhöhtes Risiko darstellt [94] | Opt-out-Flag wird bei Inferenz berücksichtigt; Bewertungsvorlage; Intake-Datenklassen-Flags | 1 · 2 · 4 · 5 |
| Minnesota CDPA (§ 325M.14), wirksam ab 2025-07-31 | Controller | Ein Verbraucher kann das Ergebnis des Profiling in Frage stellen, den Grund erfahren, die verwendeten persönlichen Daten überprüfen, diese korrigieren und die Entscheidung neu bewerten lassen {[95] | Grund- und Überprüfungs-Workflow mit Neubewertung auf korrigierten Daten | 4 · 5 |
| Illinois BIPA (740 ILCS 14), in Kraft ab 2008-10-03 | Private Einrichtungen | Informierte schriftliche Zustimmung vor der Erfassung biometrischer Identifikatoren, ein Aufbewahrungs- und Vernichtungsplan und sichere Speicherung; ein privates Klagerecht mit gesetzlichen Schadensersatz {[96][119] | Schriftliche Zustimmungserfassung; Aufbewahrungsplan als Code; Vernichtungsprotokoll | 1 · 2 |
| Washington My Health My Data Act (RCW 19.373), ab 2024-03-31 | Regulierte Einrichtungen | Zustimmung zur Erfassung und separate Zustimmung zur Weitergabe von Verbrauchergesundheitsdaten, einschließlich Daten, die von Algorithmen oder maschinellem Lernen abgeleitet oder extrapoliert werden, und eine unterzeichnete Genehmigung für jeden Verkauf {[97] | Separate Zustimmungsaufzeichnungen für Erfassung und Weitergabe; unterzeichnete Verkaufsgenehmigung; Intake-Flags für abgeleitete Gesundheitsdaten | 1 · 2 |
| Colorado SB21-169 (Versicherer), wirksam ab 2021-09-07 | Versicherer | Versicherer dürfen nicht unfair durch externe Verbraucherdaten, Algorithmen oder Vorhersagemodelle diskriminieren; sie führen einen Risikomanagementsrahmen, testen auf unfaire Diskriminierung und reichen eine Bescheinigung des Chief Risk Officer gemäß Regeln ein, die pro Versicherungslinie angenommen wurden {[92] | Bestand externer Datenquellen und Modelle; Disparitätstests; Chief-Risk-Officer-Bescheinigungsdatensatz | 2 · 3 · 5 |

### Bundesgesetz, das bereits KI erreicht

Bundesbehörden sind an OMB-Memoranden gebunden [98][99]. Für private Organisationen sind die
Bundesregeln, die KI erreichen, älteres, technologieneutrales Recht: Mitteilungen über nachteilige
Maßnahmen bei Kreditvergabe und Kreditauskunft, Disparate Impact in der Beschäftigung, das Verbot
betrügerischer Praktiken des FTC Act und die Entfernungspflicht des TAKE IT DOWN Act
[100][101][102][103][104][105][106]. Kapitel 21 behandelt
[die Bundesebene](/bok/ai-laws-worldwide#united-states-the-federal-layer); Kapitel 16 erstellt die
Begründungscodes von
[Kreditadverse-Action-Mitteilungen](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
und der
[Vier-Fünftel-Regel](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
Kapitel 20 behandelt
[Anspruchssubstantiierung](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement) und
[Deepfakes und synthetische Medien](/bok/existing-law#deepfakes-and-synthetic-media).

| Gesetz | Umfang | Pflicht | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| OMB M-25-21 (Bundesnutzung von KI), ausgestellt 2025-04-03 | US-Bundesbehörden (ihre KI-Anbieter per Vertrag) | Bundesbehörden wenden Mindestpraktiken auf hochriskante KI an: Vorbereitungstests, eine KI-Auswirkungsbewertung, laufende Überwachung, Schulung von Bedienern, menschliche Aufsicht mit einem Failsafe, wo praktisch, Abhilfe oder Berufungen und Konsultation von Endbenutzern, dokumentiert innerhalb von 365 Tagen {[98] | Anwendungsfall-Bestandseintrag; Vorbereitungstestbericht; KI-Auswirkungsbewertung; Überwachungsplan; Berufungsweg | 2 · 3 · 4 · 5 |
| OMB M-26-04 (LLM-Beschaffung), ausgestellt 2025-12-11 | US-Bundesbehörden und LLM-Anbieter | Ausschreibungen für große Sprachmodelle fordern mindestens die akzeptable Nutzungsrichtlinie des Anbieters, Modell-, System- oder Data Cards, Ressourcen für Endbenutzer und einen Rückmeldungsmechanismus {[99] | Akzeptable Nutzungsrichtlinie; Modell-, System- oder Data Cards; Ressourcen für Endbenutzer; Rückmeldungskanal | 2 · 5 |
| ECOA Regulation B (`12 CFR 1002.9`) | Kreditgeber | Ein Gläubiger, der eine Nachteilsmaßnahme ergreift, gibt eine Erklärung mit spezifischen Hauptgründen oder das Recht auf eine solche innerhalb von 30 Tagen; die Anführung interner Standards oder eines fehlgeschlagenen Scores ist unzureichend, unabhängig davon, welches Modell die Entscheidung getroffen hat [100] | Reason-Code-Service versioniert mit dem Modell; Eval zur Genauigkeit der Reason Codes; Vorlagenmitteilung | 3 · 4 · 5 |
| FCRA (`15 U.S.C. 1681m(a)`) | Nutzer von Verbraucherberichten | Ein Nutzer eines Verbraucherberichts, der eine Nachteilsmaßnahme ergreift, gibt Mitteilung, offenbart die verwendete numerische Kreditwürdigkeit und ihre Schlüsselfaktoren, nennt die Auskunftei und teilt das Recht auf einen kostenlosen Bericht und auf Widerspruch mit [101] | Datensatz zu Score und Schlüsselfaktoren pro Nachteilsentscheidung; Vorlagenmitteilung | 4 |
| Title VII s. 703(k) und UGESP (`29 CFR 1607.4(D)`) | Arbeitgeber | Ein Auswahlverfahren mit unterschiedlicher Auswirkung ist rechtswidrig, es sei denn, es ist arbeitsplatzbezogen und mit geschäftlicher Notwendigkeit vereinbar, und eine weniger diskriminierende Alternative kann dennoch erforderlich sein; eine Auswahlquote unter vier Fünfteln der Quote der höchsten Gruppe wird allgemein als Nachweis einer nachteiligen Auswirkung angesehen [102][103] | Eval des Adverse-Impact-Verhältnisses pro Gruppe mit Zählungen und Konfidenzintervallen; Validierung der Arbeitsplatzbezogenheit; Protokoll der Alternativensuche | 3 · 5 |
| FTC Act s. 5 (`15 U.S.C. 45`) | Unternehmen, die KI-Ansprüche stellen | Täuschende Handlungen oder Praktiken sind rechtswidrig: Ansprüche über die Genauigkeit, Leistung oder Fairness eines KI-Systems müssen vor ihrer Geltendmachung durch sachkundige und zuverlässige Nachweise gestützt werden [104][105] | Anspruchsregister verknüpft mit aktuellen Eval-Läufen; Substantiierungsgate bei der Freigabe von Kopien | 1 · 3 · 5 |
| TAKE IT DOWN Act (Public Law 119-12), Prozess fällig 2026-05-19 | Abgedeckte Plattformen | Abgedeckte Plattformen führen ein Benachrichtigungs- und Entfernungsverfahren durch und entfernen gemeldete nicht einvernehmliche intime Bilder, einschließlich KI-generierter Fälschungen, und bekannte identische Kopien innerhalb von 48 Stunden nach einem gültigen Antrag [106] | Takedown-Pipeline mit einer 48-Stunden-Frist, Eigentümer und Protokoll; Abgleich identischer Kopien | 4 · 5 |

## Andere Jurisdiktionen

Das Rückgrat der Karte ist die KI-Verordnung der EU, aber eine Governance-Funktion, die über Grenzen
hinweg arbeitet, unterliegt mehr als einem Regime. Diese Zeilen sind mit Stand 2026-09-24
gekennzeichnet; wenn eine Regel sich noch bewegt, wird dies in der Kopie angegeben.

| Jurisdiktion / Instrument | Status (Stand 2026-09-24) | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| Südkorea: AI Basic Act | In Kraft seit 2026-01-22 [34], mit seinem Durchführungserlass [62]; das Ministerium (MSIT) kündigte eine Orientierungsphase von mindestens einem Jahr an, in der Ermittlungen und Bußgelder mit Ausnahme von Ausnahmefällen zurückgehalten werden, während die Pflichten gelten [58]; Details in [Kapitel 21](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act) | Grundlegende Pflichten für KI-Betreiber, erhöhte Pflichten für "hochgradig auswirkungsreiche" KI in sensiblen Bereichen und KI-Inhaltsmarkierung | Risikoregister für hochgradig auswirkungsreiche KI; KI-Nutzungsmitteilung; KI-Inhaltsmarkierung | 1 · 2 · 4 |
| Singapur: IMDA Model AI Governance Framework for Generative AI | Freiwillig; veröffentlicht Mai 2024 [39] | Governance-Dimensionen einschließlich Tests, Transparenz, Incident Reporting, Sicherheit und Content Provenance | Eval-Suite; Model Cards; Content Provenance und Watermarking | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Veröffentlicht (V2.1.1, Dez 2025) [40] | Grundlegende Cybersicherheitsanforderungen über den KI-Lebenszyklus (13 Prinzipien über fünf Phasen) | KI-System-Sicherheitskontrollen über den Lebenszyklus; Supply-Chain- und AIBOM-Checks; Runtime-Härtung | 4 |
| Singapur: IMDA Model AI Governance Framework for Agentic AI (Identität und Autorisierungen) | Freiwillig; Version 1.5 veröffentlicht 2026-05-20 [107] | Jeder Agent hat eine eindeutige, nachverfolgbare Identität, die katalogisiert und zentral verwaltet wird; Autorisierungen sind begrenzt, zeitlich oder sitzungsgebunden, nicht übertragbar und durch den autorisierenden Menschen begrenzt | Agentenregister mit einer Workload-Identität pro Agent; delegierte, kurzlebige Anmeldedaten nie breiter als der Benutzer | 2 · 4 |
| Singapur: IMDA Model AI Governance Framework for Agentic AI (menschliche Kontrollpunkte) | Freiwillig; Version 1.5 veröffentlicht 2026-05-20 [107] | Signifikante Kontrollpunkte für hochriskante, irreversible, Ausreißer- und benutzerdefinierte Aktionen, mit Genehmigungen, die kontextabhängig und verständlich sind und durch Systemebenen-Kontrollen durchgesetzt werden | Kontrollpunktklassen im Tool-Gateway; Genehmigungsprotokoll; Überwachungsmetriken | 4 · 5 |
| Kanada: Directive on Automated Decision-Making (Bundesinstitutionen) | In Kraft seit 2019-04-01; geändert 2025-06-24 [108] | Führen Sie eine Algorithmic Impact Assessment durch, genehmigen Sie sie und veröffentlichen Sie sie vor der Produktion; wenden Sie die Anforderungen von Anhang C für die Auswirkungsstufe an (Mitteilung, Erklärung, Peer Review, menschliches Eingreifen); bieten Sie Abhilfe an und berichten Sie über die Wirksamkeit | Veröffentlichte AIA aus einer gemeinsamen Impact-Faktenbasis; Vorlagen für Mitteilung und Erklärung; Peer-Review-Datensatz; Abhilfepfad; Neubewertungsauslöser als Code | 1 · 2 · 5 |
| Brasilien: LGPD `Art. 20` (Überprüfung automatisierter Entscheidungen) | In Kraft seit 2020-09-18 (überprüfen); Sanktionen ab 2021-08-01 [109] | Ein Datensubjekt kann die Überprüfung von Entscheidungen anfordern, die ausschließlich auf automatisierter Verarbeitung beruhen und seine Interessen beeinflussen, einschließlich Profiling, und der Verantwortliche gibt klare Informationen über die verwendeten Kriterien und Verfahren | Überprüfungs-Workflow; Erklärung der Kriterien und Verfahren pro System | 4 · 5 |

### Südkorea, Artikel für Artikel

Die Betreiberpflichten des AI Basic Act befinden sich in den Artikeln 31 bis 36, mit den Mechaniken
im Durchführungserlass [34][62]. Alle gelten seit 22. Januar 2026; was MSIT während seiner
Orientierungsphase von mindestens einem Jahr zurückhält, sind Ermittlungen und Bußgelder, nicht die
Pflichten [58]. Kapitel 21 behandelt jeden Artikel in
[Südkorea: der AI Basic Act](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act).

| Artikel | Wer ist gebunden | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| `Art. 31(1)` | KI-Geschäftsbetreiber | Teilen Sie Benutzern im Voraus mit, dass ein Produkt oder eine Dienstleistung auf hochgradig auswirkungsreicher oder generativer KI läuft, im Produkt, den Bedingungen, dem Bildschirm oder dem Lieferort (Decree Art. 23(1)); eine fehlende Mitteilung ist bußgeldpflichtig (Art. 43) [34][62] | Mitteilungskomponente in UI, Bedingungen und Verträgen; Mitteilungsinventar pro Benutzeroberfläche | 2 · 4 |
| `Art. 31(2)–(3)` | Betreiber, die generative KI bereitstellen | Geben Sie an, dass Ausgaben KI-generiert sind, und benachrichtigen Sie oder kennzeichnen Sie realistische synthetische Sounds, Bilder oder Videos, damit Benutzer sie erkennen können; eine nur maschinenlesbare Markierung benötigt mindestens eine Text- oder Sprachmitteilung (Decree Art. 23(2)–(3)) [34][62] | Provenance-Pipeline: sichtbare Kennzeichnung oder maschinenlesbare Markierung plus mindestens eine Text- oder Sprachmitteilung | 3 · 4 |
| `Art. 32` | Betreiber von qualifizierenden Hochleistungssystemen | Systeme mit mindestens 10^26 FLOP kumulativer Trainingsberechnung, gebaut mit der fortschrittlichsten Technologie und posierend breites und ernstes Risiko (Decree Art. 24), identifizieren, bewerten und mindern Risiken über den Lebenszyklus und berichten die Ergebnisse an MSIT [34][62] | Lifecycle-Risikoregister; Sicherheits-Incident-Überwachung; Ergebnisbericht an MSIT | 3 · 4 · 5 |
| `Art. 33` | KI-Geschäftsbetreiber | Überprüfen Sie im Voraus, ob ein System hochgradig auswirkungsreiche KI ist, und fragen Sie optional MSIT zur Bestätigung; MSIT antwortet innerhalb von 30 Tagen, einmalig verlängerbar (Decree Art. 25) [34][62] | Klassifizierungsentscheidungsdatensatz pro System: Art. 2(4)-Bereich, Risikorationale, Trainings-Datenübersicht, MSIT-Antwort | 1 · 2 |
| `Art. 34` | Betreiber von hochgradig auswirkungsreicher KI | Ein Risikomanagementplan, ein Erklärungsplan, ein Benutzersch Schutzplan, menschliche Verwaltung und Aufsicht sowie Dokumente, die die Maßnahmen zeigen; veröffentlichen Sie den Hauptinhalt und bewahren Sie die Nachweise fünf Jahre lang auf (Decree Art. 27) [34][62] | Risikomanagement-, Erklär- und Benutzerschutzpläne; benannter menschlicher Aufseher; veröffentlichte Zusammenfassung; fünfjähriger Nachweisspeicher | 1 · 2 · 4 · 5 |
| `Art. 35` | Betreiber von hochgradig auswirkungsreicher KI | Bemühen Sie sich, die Auswirkungen auf Grundrechte vor der Bereitstellung hochgradig auswirkungsreicher KI zu bewerten, wobei die sieben Elemente von Decree Art. 28 abgedeckt werden [34][62] | Auswirkungsbewertung mit den sieben Verordnungselementen | 1 · 5 |
| `Art. 36` | Ausländische KI-Geschäftsbetreiber über einem Schwellenwert | Ein Betreiber ohne Adresse oder Niederlassung in Korea, der einen Verordnungsschwellenwert erfüllt (Umsatz, KI-Service-Umsatz, tägliche Benutzer oder eine frühere Geldbuße; Decree Art. 29), ernennt schriftlich einen inländischen Vertreter und meldet ihn MSIT [34][62] | Ernennung bei MSIT eingereicht; Nachweiszugriffs-Runbook für den Vertreter | 5 |

### Vereinigtes Königreich

Das Vereinigte Königreich hat kein horizontales KI-Gesetz. Es regelt KI durch bestehende
Sektorenregulatoren (die ICO, die FCA, die MHRA und andere), zentral koordiniert, plus das
**AI Security Institute** (im Februar 2025 vom AI Safety Institute umbenannt) für die Bewertung von
Frontier-Modellen [38]. Für automatisierte Entscheidungsfindung ersetzte der Data (Use and Access)
Act 2025 den UK GDPR Artikel 22 durch neue **Artikel 22A–22D** (in Kraft 5. Februar 2026): ein
Genehmigungsplus-Schutzmaßnahmen-Modell für signifikante, ausschließlich automatisierte
Entscheidungen, mit strengeren Bedingungen, wenn Daten besonderer Kategorien verwendet werden. Die
Schutzmaßnahmen (ein Pfad für aussagekräftige menschliche Überprüfung, ein Kanal für Stellungnahmen
und Einspruch sowie eine Entscheidungsmitteilung) sind das Artefakt, das der Ingenieur erstellt
[37]. Kapitel 19 stellt Artikel 22A–22D neben die DSGVO und die US-Regime in
[die Regime nebeneinander](/bok/privacy-and-ai#the-regimes-side-by-side), und Kapitel 16 verwandelt
die Schutzmaßnahmen in Erklär- und Einspruchsdatensätze in
[Datenschutz: die DSGVO und das UK-Regime](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).
Das UK-Verbraucherrecht erreicht KI-generierte Bewertungen: der Digital Markets, Competition and
Consumers Act 2024 verbietet gefälschte und versteckte Anreiz-Bewertungen ab 6. April 2025 [111],
gelehrt in Kapitel 20 unter
[das Vereinigte Königreich: DMCC Act](/bok/existing-law#the-united-kingdom-dmcc-act).

| Jurisdiktion / Instrument | Status (Stand 2026-09-24) | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| UK: Data (Use and Access) Act 2025, UK GDPR Arts. 22A–22D | In Kraft 2026-02-05 [37] | Ein Genehmigungsplus-Schutzmaßnahmen-Modell für signifikante, ausschließlich automatisierte Entscheidungen, mit strengeren Bedingungen, wenn Daten besonderer Kategorien verwendet werden | ADM-Schutzmaßnahmen: Pfad für aussagekräftige menschliche Überprüfung, Einspruchs- und Stellungnahmekanal, Entscheidungsmitteilung | 4 · 2 |
| UK: Digital Markets, Competition and Consumers Act 2024, s. 225 und Sch. 20 para. 13 | In Kraft 2025-04-06 [111] | Unlautere Geschäftspraktiken sind verboten, und Schedule 20 verbietet die Einreichung oder Beauftragung gefälschter Verbraucherbewertungen und Bewertungen mit versteckten Anreizen, die Bewertungen erreichen, die von KI generiert wurden | Richtlinie zur Blockierung der Bewertungsgenerierung; Bewertungs-Provenance-Protokoll | 1 · 4 |

### China

China regelt KI in zwei Ebenen, und diese Karte hält sie auseinander. Die verbindliche Ebene ist
eine Reihe von Abteilungsvorschriften, die von der Cyberspace Administration of China (CAC) mit
Co-Ausstellern erlassen wurden, zu algorithmischen Empfehlungen (2022), Deep Synthesis (2023),
generativen KI-Diensten (2023) und der Kennzeichnung von KI-generierten synthetischen Inhalten
(2025); mehrere sind territorial, und die Interim Measures for Generative AI Services gelten nur für
Dienste, die "der Öffentlichkeit innerhalb der VR China" angeboten werden [43][44][45]. Die
Kennzeichnungspflicht wird durch einen verbindlichen nationalen Standard, GB 45438-2025, gestützt,
der die von der Maßnahme erforderlichen Metadatenfelder enthält [46][47]. Die freiwillige Ebene ist
der empfohlene Standard GB/T 45654-2025 [48] und das TC260 AI Safety Governance Framework [41][42].
Das Cybersecurity Law, geändert durch den NPC Standing Committee am 2025-10-28 und in Kraft ab
2026-01-01, fügt einen programmatischen Artikel 20 zur KI hinzu, der von sich aus keine
Betreiberpflichten schafft [49]; die neueste verbindliche Regel, die Interim Measures for
Anthropomorphic Interaction Services (in Kraft ab 2026-07-15), ist eng begrenzt (Dienste, die
anhaltende emotionale Interaktion bieten); sie hat eine Zeile unten und Kapitel 21 legt sie unter
[China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover)
dar [50]. Persönliche Informationen werden durch das Personal Information Protection Law geregelt,
dessen Artikel 24 zur automatisierten Entscheidungsfindung auch eine Zeile hat [110]. Das Framework
3.0 (14. September 2026) ist ein TC260-Technikdokument, das unter CAC-Anleitung veröffentlicht wurde
und als "Referenz für Entwickler, Anbieter und Nutzer" beschrieben wird: es setzt eine dreiteilige
Risikotaxonomie (inhärent, Anwendung und sekundär), bewertet Risiken qualitativ nach Szenario,
Intelligenzstufe und Umfang ohne Compute- oder Parameterschwelle, behandelt Open-Source-Modelle als
ein eigenständiges Risikoprofil und nennt Computing-Power-Sicherheit als Risikokategorie, und sein
Appendix 2 durchläuft den Agent-Lebenszyklus von der Gestaltung bis zur Außerbetriebnahme [42].
Praktiker-Kommentare berichteten von Agenten und physisch interaktiven Systemen als Schlagzeile der
neuen Version [51].

Die oben genannten Instrumente lösen sich in Obligation-to-Artefact-Zeilen in der gleichen Form wie
die anderen Jurisdiktionen auf:

| Jurisdiktion / Instrument | Status (Stand 2026-09-20) | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| China: Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (CAC, MIIT, MPS and SAMR Order No. 9) | Verbindlich; in Kraft ab 2022-03-01 [43] | Algorithmus-Anmeldung für Dienste mit Meinungsattributen oder Mobilisierungskapazität, Sicherheitsbewertung, Anzeige der Anmeldenummer und eine Benutzer-Option zum Ausschalten personalisierter Empfehlungen | Algorithmus-Inventar mit Anmeldedatensatz und Nummer; Sicherheitsbewertungs-Nachweispaket; Opt-out-Kontrolle zur Laufzeit | 1 · 2 · 4 |
| China: Provisions on the Administration of Deep Synthesis in Internet Information Services (CAC, MIIT and MPS Order No. 12) | Verbindlich; in Kraft ab 2023-01-10 [44] | Auffällige Kennzeichnungen, wo synthetische Inhalte die Öffentlichkeit irreführen könnten, und nicht entfernbare technische Markierungen; Verwaltung von Trainingsdaten; separate Zustimmung für Gesichts- und Sprachbearbeitung; Anmeldung und Sicherheitsbewertung für Meinungsgestaltungsfunktionen | Content-Provenance-Pipeline (sichtbare Kennzeichnung plus Metadaten-Markierung); Governance-Datensatz für Trainingsdaten; Zustimmungs-Gate; Sicherheitsbewertung vor der Veröffentlichung | 2 · 3 · 4 |
| China: Interim Measures for the Administration of Generative AI Services (CAC and six other bodies, Order No. 15) | Verbindlich; in Kraft ab 2023-08-15; gilt für Dienste, die der Öffentlichkeit innerhalb der VR China angeboten werden [45] | Rechtmäßige Trainingsdaten und Foundation Models; Content-Kennzeichnung unter den Deep-Synthesis-Regeln; Sicherheitsbewertung und Algorithmus-Anmeldung für Meinungsgestaltungsdienste; Stopp, Entfernung, Umschulung und Bericht über illegale Inhalte | Daten-Herkunfts- und Lizenzierungsdatensatz; Eval-Gate für generierte Inhalte; Incident-Pipeline mit Umschulungsschleife; Anmeldedatensatz | 2 · 3 · 4 · 5 |
| China: Measures for Labelling AI-Generated Synthetic Content, with mandatory standard GB 45438-2025 | Verbindlich; in Kraft ab 2025-09-01, der Standard wurde am selben Tag implementiert [46][47] | Explizite Kennzeichnungen (Text, Audio oder Grafik) und implizite Metadaten-Kennzeichnungen mit dem Namen oder Code des Anbieters und einer Inhaltsnummer; Verteilungsplattformen überprüfen Metadaten und kennzeichnen verdächtige KI-Inhalte | Provenance- und Watermarking-Pipeline, die die GB 45438-Metadatenfelder ausgibt; Erkennung und Kennzeichnung auf Plattformseite | 3 · 4 |
| China: GB/T 45654-2025 Basic security requirements for generative AI services | Empfohlener (freiwilliger) nationaler Standard; implementiert ab 2025-11-01 [48] | Quelle und Inhaltsscreening des Trainingskorpus, Modellsicherheitsanforderungen und die Bewertungsmethoden, die der Sicherheitsbewertung zugrunde liegen | Corpus-Screening-Datensatz; Eval-Fragenbänke; Sicherheitsbewertungsbericht | 3 · 5 |
| China: TC260 AI Safety Governance Framework 3.0 | Freiwillig; veröffentlicht am 2026-09-14, aufbauend auf 1.0 (2024) und 2.0 (2025) [41][42] | Eine dreiteilige Risikotaxonomie (inhärent, Anwendung, sekundär), technologische und Governance-Gegenmaßnahmen und rollenbasierte Richtlinien; Betreiber führen Protokolle für mindestens sechs Monate und prüfen sie, überwachen Risiken in Echtzeit, führen eine nachverfolgbare Verantwortungskette und bewerten Widerstandsfähigkeit (§5.3) | Risikoregister nach der Taxonomie des Frameworks; Protokoll-Aufbewahrungsrichtlinie (sechs Monate) mit Audit; Echtzeit-Risikoüberwachung; Widerstandsfähigkeitsbewertung | 1 · 4 · 5 |
| China: Personal Information Protection Law, Arts. 24 and 55–56 | Verbindlich; in Kraft ab 2021-11-01 [110] | Automatisierte Entscheidungen bleiben transparent und fair, ohne unangemessene Differenzierung bei Preisen oder Bedingungen; gezielte Pushes bieten eine nicht personalisierte Option oder eine einfache Ablehnung; Einzelpersonen können eine Erklärung anfordern und sich ausschließlich automatisierten Entscheidungen mit erheblichen Auswirkungen widersetzen; eine Folgenabschätzung vorher, mindestens drei Jahre aufbewahrt | Erklärungsservice und manuelle Entscheidungsroute; nicht personalisierte Option zur Laufzeit; Folgenabschätzungs-Datensatz, drei Jahre aufbewahrt | 2 · 4 · 5 |
| China: Interim Measures for the Administration of Anthropomorphic Interaction Services (CAC, NDRC, MIIT, MPS and SAMR) | Verbindlich; in Kraft ab 2026-07-15 [50] | Ein Modus für Minderjährige; KI-Signale und eine Erinnerung nach zwei Stunden kontinuierlicher Nutzung; ein einfacher Ausstieg; eine Sicherheitsbewertung bei 1 Million registrierten oder 100.000 monatlich aktiven Benutzern; Anmeldung | Konfiguration des Modus für Minderjährige; Erinnerungs-Timer; Benutzeranzahl-Schwellenwert-Monitor; Sicherheitsbewertungsbericht; Anmeldedatensatz | 1 · 2 · 4 · 5 |
| China: TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Freiwillig; veröffentlicht am 2026-09-14 [42] | Eindeutige Identität und Least-Privilege-Berechtigungen pro Agent nach Entscheidungsmodus; menschliche Kontrollpunkte mit manipulationssicheren Genehmigungsprotokollen und Deny-by-Default; Tool- und Skill-Verifizierung; Runtime Guardrails (Warnung, Einschränkung, Abfangen, Aussetzen, Beendigung); Speicherisolation ohne Anmeldedaten im Speicher; gegenseitige Authentifizierung; Sandbox-Validierung, Red Teaming und Neuvalidierung bei größeren Änderungen; kontrollierte Außerbetriebnahme | Agent-Register mit Identität und Umfang; Genehmigungsprotokoll-Speicher; Tool-Allow-Liste mit Integritätsprüfungen; Runtime Guardrails und Kill Switch; Speicher-Umfangs-Richtlinie; Außerbetriebnahme-Runbook | 2 · 3 · 4 · 5 |

Appendix 2's Agent-Kontrollen stimmen mit den zwei agentic-Referenzen überein, die dieses Kapitel
bereits trägt, die OWASP Top 10 for Agentic Applications [16] und die NIST AI Agent Standards
Initiative [29]:

| Agent-Kontrolle | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Schicht |
|---|---|---|---|---|
| Identität und Least Privilege | II.2: eindeutige Identität pro Agent, Berechtigungen nach Entscheidungsmodus, Anmeldedaten am Ende der Aufgabe widerrufen | ASI03 Identity and Privilege Abuse | Agent-Identität, Authentifizierung, Autorisierung | 2 · 4 |
| Menschliche Kontrollpunkte und Genehmigungsprotokolle | II.3: gestaffelte Kontrollen, menschliche Kontrollpunkte, manipulationssichere Genehmigungsprotokolle, Deny by Default | ASI09 Human-Agent Trust Exploitation; ASI01 Agent Goal Hijack | Keine | 4 · 5 |
| Tools, Skills und Supply Chain | II.4: Tool-Verifizierung, faire Tool-Auswahl, Anomalieerkennung, Skill-Management | ASI02 Tool Misuse and Exploitation; ASI04 Agentic Supply Chain Vulnerabilities | Agent-Sicherheit | 2 · 4 |
| Runtime Guardrails und Ausführungsgrenzen | II.5(1)(2)(5)(6): Eingabekontrolle, Guardrails, Schritt-/Häufigkeits-/Dauergrenzen, Sandbox-Isolierung | ASI01 Agent Goal Hijack; ASI05 Unexpected Code Execution (RCE); ASI08 Cascading Failures; ASI10 Rogue Agents | Keine | 4 |
| Speicher | II.5(3): Aufbewahrungsfenster, Isolierung über Benutzer und Aufgaben, keine Anmeldedaten im Speicher | ASI06 Memory & Context Poisoning | Keine | 3 · 4 |
| Agent–Modell–Tool-Kommunikation | II.5(4): gegenseitige Authentifizierung, Integrität, Replay-Resistenz | ASI07 Insecure Inter-Agent Communication | Authentifizierung | 4 |
| Überwachung, Audit, Sandbox, Red Teaming, Incident Response | II.6: Anomalieblocker, Protokollverwaltung, Sicherheitsaudit, Sandbox-Validierung, Red Teaming, Notfallpläne, Neuvalidierung bei größeren Änderungen | Übergreifend | Adversarial Agent Evals | 3 · 5 |
| Außerbetriebnahme | II.7: vollständiges Herunterfahren, Datensicherung, Umgebungsbereinigung | ASI10 Rogue Agents (verbleibende Agenten) | Keine | 2 · 4 |

Kapitel 23 vergleicht diese Agent-Control-Quellen mit denen der CSA und Singapurs in
[frameworks written for agents](/bok/governing-agents#frameworks-written-for-agents).

### Vertrag und internationales weiches Recht

Drei internationale Instrumente tragen Pflichten, die ein Ingenieur nachweisen kann. Das
Rahmenübereinkommen des Europarats (CETS Nr. 225) bindet Parteien, nicht Unternehmen, und ist noch
nicht in Kraft; innerhalb der EU wird es durch die KI-Verordnung umgesetzt [112][113]. Die
überarbeiteten OECD-KI-Grundsätze vom 3. Mai 2024 und der G7 Hiroshima Code of Conduct vom 30.
Oktober 2023 sind freiwillig [114][115]. Kapitel 22 lehrt sie in
[what the Convention asks for](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack),
[the five principles and five recommendations](/bok/principles-and-standards#the-five-principles-and-five-recommendations)
und [the G7 Hiroshima Process](/bok/principles-and-standards#g7-hiroshima-process).

| Instrument und Klausel | Status (Stand 2026-09-24) | Was es verlangt | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| Council of Europe Convention `Art. 14(2)(a)–(b)` | Nicht in Kraft (Stand 2026-09-24) [112][113] | Dokumentieren Sie relevante Informationen über Systeme, die die Menschenrechte erheblich beeinflussen können, ausreichend für betroffene Personen, um die Entscheidungen anzufechten | Entscheidungsdatensatz pro folgenreicher Ausgabe; Anfechtungsweg mit dem Datensatz angehängt | 2 · 5 |
| Council of Europe Convention `Art. 15(2)` | Nicht in Kraft (Stand 2026-09-24) [112][113] | Benachrichtigen Sie Personen, dass sie mit einem KI-System interagieren, soweit angemessen | Interaktionsoffenlegung zur Laufzeit erzwungen | 4 |
| Council of Europe Convention `Art. 16(1)–(2)(a)–(f)` | Nicht in Kraft (Stand 2026-09-24) [112][113] | Iteratives, abgestuftes Risiko- und Auswirkungsmanagement: Kontext, Schweregrad und Wahrscheinlichkeit, Ansichten der Interessenträger, Überwachung und Dokumentation | Risikoregister als Code; Folgenabschätzung mit dem Register verknüpft; Überwachung gegen eine Baseline | 1 · 2 · 4 |
| Council of Europe Convention `Art. 16(2)(g)` | Nicht in Kraft (Stand 2026-09-24) [112][113] | Testen Sie Systeme vor der ersten Verwendung und wenn sie erheblich geändert werden, soweit angemessen | Eval Gate bei Freigabe und bei wesentlicher Änderung | 3 |
| OECD AI Principles, Grundsatz 1.4(b) | Nicht bindend; überarbeitet 2024-05-03 [114] | Mechanismen ermöglichen es, KI-Systeme, die unzumutbaren Schaden riskieren, zu überschreiben, zu reparieren und/oder sicher außer Betrieb zu nehmen | Getesteter Kill Switch; Außerbetriebnahmeprotokoll in der Registry | 2 · 4 |
| OECD AI Principles, Grundsatz 1.5(b)–(c) | Nicht bindend; überarbeitet 2024-05-03 [114] | Rückverfolgbarkeit von Datensätzen, Prozessen und Entscheidungen sowie systematisches Risikomanagement in jeder Phase des Lebenszyklus | Evidence Store mit Registry-IDs als Schlüssel; Risikoregister als Code; Lieferantendatensätze | 1 · 5 |
| G7 Hiroshima Code of Conduct, Maßnahme 1 | Freiwillig; vereinbart 2023-10-30 [115] | Risiken über den Lebenszyklus hinweg identifizieren, bewerten und mindern, einschließlich Tests vor der Bereitstellung | Adversarial Red-Team Suite; Eval Gate | 3 |
| G7 Hiroshima Code of Conduct, Maßnahmen 2 und 4 | Freiwillig; vereinbart 2023-10-30 [115] | Schwachstellen, Vorfälle und Missbrauch nach der Bereitstellung identifizieren und mindern, Informationen austauschen und Vorfälle verantwortungsvoll melden | Runtime-Überwachung; Incident Pipeline mit einem Zweig für externe Weitergabe | 4 · 5 |
| G7 Hiroshima Code of Conduct, Maßnahme 3 | Freiwillig; vereinbart 2023-10-30 [115][116] | Öffentlich über Fähigkeiten, Einschränkungen und angemessene sowie unangemessene Verwendungen berichten; das OECD-Berichterstattungsrahmenwerk sammelt solche Berichte seit 2025 | Model Card aus der Registry veröffentlicht | 2 |
| G7 Hiroshima Code of Conduct, Maßnahme 7 | Freiwillig; vereinbart 2023-10-30 [115] | Inhaltsauthentifizierungs- und Herkunftsmechanismen wo möglich einsetzen | Herkunftskennzeichnung bei der Ausgabe; Verifizierungstest | 4 |

Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Was NOCH NICHT harmonisiert ist

Die Karte hat eine Lücke, und es ist wichtig, dies klar auszusprechen, anstatt sie zu überdecken.

- **Keine harmonisierte Norm ist im Amtsblatt zitiert.** Seit 2026-09-24 ist die Vermutung der
  Konformität in Artikel 40 für niemanden verfügbar, da keine harmonisierte Norm im Amtsblatt
  zitiert wurde [20].
- **EN 18286 ist veröffentlicht, aber nicht zitiert.** Die Qualitätsmanagementsystem-Norm EN
  18286:2026 für Artikel 17 wurde im Juli 2026 veröffentlicht (die erste JTC-21-KI-Norm, die
  Veröffentlichung erreichte), ist aber noch nicht im Amtsblatt zitiert, daher trägt sie keine
  Vermutung der Konformität [20][21].
- **Die anderen JTC-21-Entwürfe sind bei oder vor der Einspruchsfrist.** Seit 2026-09-24, wie von
  einer gesamteuropäischen Normungsinformationsstelle berichtet, endeten die Einspruchsabstimmungen
  zu prEN 18228 (`Art. 9`, Risikomanagement) und prEN 18282 (`Art. 15`, Cybersicherheit) am 30. Jul
  2026 und zu prEN 18229-1 (`Art. 12`, Protokollierung) am 20. Aug 2026; prEN 18229-3 (`Art. 14`,
  menschliche Aufsicht) trat am 30. Jul 2026 in die Einspruchsfrist ein; und prEN 18229-4 und -5
  (`Art. 15`, Genauigkeit und Robustheit) wurden am 24. Jun 2026 als neue Projekte genehmigt [60],
  konsistent mit dem öffentlichen Tracker, der sie Mitte 2026 in der Einspruchsfrist hatte [53]. CEN
  und CENELEC können eine Prioritätsliefergabe direkt nach einer positiven Einspruchsabstimmung
  veröffentlichen und sie für Q4 2026 anvisieren [61]; Veröffentlichung wäre immer noch keine
  Amtsblatt-Zitierung. Kapitel 22 verfolgt jede Liefergabe und den
  [Status der JTC-21-harmonisierten Normen](/bok/principles-and-standards#harmonised-standards-under-the-ai-act),
  und erklärt
  [wie die Vermutung der Konformität funktioniert](/bok/principles-and-standards#how-presumption-of-conformity-works).
- **ISO/IEC 42001 ist nicht das Qualitätsmanagementsystem des Artikels 17.** Die Zertifizierung nach
  EN ISO/IEC 42001:2026 belegt ein KI-Managementsystem; sie verleiht keine Vermutung der Konformität
  nach dem KI-Gesetz, da sie keine harmonisierte Norm ist und ihr Anwendungsbereich vom
  Qualitätsmanagementsystem des Artikels 17 abweicht [11][12].
- **Der Verhaltenskodex ist freiwillig.** Die Unterzeichnung des GPAI-Kodex ist eine Möglichkeit,
  die Einhaltung von GPAI-Verpflichtungen nachzuweisen; es ist keine rechtliche Vermutung der
  Konformität [9].
- **Chinas Rahmenwerk verweist nicht auf die westlichen Instrumente.** Das TC260 AI Safety
  Governance Framework 3.0 zitiert weder ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF noch das
  EU-KI-Gesetz (seine benannten Bezugspunkte sind die Global AI Governance Initiative und
  UN-zentrierte Kanäle), und es nennt auch nicht Chinas eigene verbindliche Regeln [42]. Ein
  Crosswalk zwischen den beiden Stacks ist etwas, das der Ingenieur erstellt; keine der Dokumente
  beider Seiten liefert ihn.

Die Registry enthält die drei JTC-21-Liefergaben, auf die sich das Buch stützt, mit ihrem Status vom
2026-09-24 [20][21][60]:

| Liefergabe | Was es ist | Status (Stand 2026-09-24) | Engineering-Artefakt | Schicht |
|---|---|---|---|---|
| EN 18286:2026 | Anforderungen an das Qualitätsmanagementsystem zur Unterstützung von Art. 17; veröffentlicht, aber nicht im Amtsblatt zitiert, daher trägt es keine Vermutung der Konformität | Veröffentlicht Juli 2026; nicht im Amtsblatt zitiert [21][20] | QMS-Prozesse laufen als Pipeline-Stufen; Design- und Änderungskontroll-Nachweise | 1 · 5 |
| prEN 18228 | Entwurf einer harmonisierten Norm für das Risikomanagementsystem des Art. 9 | Entwurf; Einspruchsabstimmung endete 2026-07-30, wie berichtet [60] | Provider-Risikodatei pro System; Akzeptanzkriterien als Code; Kontrollüberwachung | 1 · 3 · 5 |
| prEN 18229-1 | Entwurf einer harmonisierten Norm für die Aufzeichnungspflichten des Art. 12 | Entwurf; Einspruchsabstimmung endete 2026-08-20, wie berichtet [60] | Protokollierungsspezifikation pro System; strukturierte, signierte Ereignisprotokolle, die dem Entwurf zugeordnet sind | 4 |

Die praktische Lesart: Für den Zeitraum, den diese Ausgabe abdeckt, können Sie eine Vermutung der
Konformität nicht von der Stange kaufen. Die Obligation-zu-Artefakt-Zeilen oben zeigen, wie eine
Governance-Funktion die Obligation auf ihre eigenen Verdienste hin evidenziert, während die
harmonisierten Normen noch geschrieben werden.

> **In der Praxis (illustrativ)**
> Ein Governance-Team verwaltete diese Karte nicht als Folie, sondern als maschinenlesbaren
> Crosswalk: eine versionierte Datei, die jede Obligations-ID mit dem Artefakt verknüpft, das ihre
> Evidenz produzierte, und der Schicht, in der sie lebte, ausgegeben als
> `OSCAL`}-Komponentendefinitionen. Als das Omnibus die Hochrisiko-Daten verschob, war die Änderung
> ein Diff zu einem Feld pro betroffener Zeile, und jede "Maps to"-Zeile nachgelagert wurde von
> derselben Datei neu aufgelöst. Die Audit-Frage "zeige mir, was Artikel 15 beantwortet" wurde zu
> einer Abfrage gegen den Crosswalk, nicht zu einer Suche durch ein Wiki.

**Zuordnung:** Dieses Kapitel ist der Reverse Index für das ganze Buch; jeder Artikel des
EU-KI-Gesetzes, der GPAI-Verhaltenskodex, die DSGVO, NIS2, DORA, die CRA, die
Produkthaftungsrichtlinie, DSM, Unfaire Geschäftspraktiken, Plattformarbeit und
Verbraucherkreditrichtlinien, die DSA, ISO/IEC 42001, 42005, 42006, 23894 und 22989, NIST AI RMF und
die neuere NIST-KI-Arbeit, CSA AICM, OWASP GenAI/Agentic, die CEN-CENELEC-JTC-21-Liefergaben, die
US-Bundes- und Staatsgesetze, die anderen Jurisdiktionen und die oben genannten Vertrags- und
Soft-Law-Instrumente werden auf den fünf-Schicht-Stack (Kapitel 04) und den Musterkatalog
(Kapitel 05) abgebildet. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Finde deine Zeilen.** Für ein System liste die Zeilen dieser Karte auf, die dafür gelten, nach
   Rolle und Risikoclasse, mit dem Datum, ab dem jede gilt.
2. **Benenne ein Artefakt pro Zeile.** Neben jeder Zeile schreibe das Artefakt, das sie heute
   evidenziert, oder markiere die Lücke.
3. **Lege die Daten in die Pipeline.** Speichere jedes anwendbare Datum als Daten, die deine
   Policy-Checks lesen, damit eine Obligation, die zu gelten beginnt, als fehlender Check angezeigt
   wird, nicht als Überraschung.
4. **Evidenziere eine Obligation auf ihre Verdienste hin.** Für die Obligation, bei der du am
   meisten erwartet hast, dass eine harmonisierte Norm sie abdeckt, schreibe auf, wie du sie heute
   ohne Vermutung der Konformität evidenzierst.
5. **Relese bei Änderung.** Wenn sich ein Datum oder eine Zeile in dieser Karte ändert, führe den
   ersten Schritt für deine Systeme erneut aus und notiere den Unterschied.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; the reworded text applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] OWASP Top 10 for Agentic Applications for 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; names as in the document's contents, read 2026-09-24). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026; amends Art. 3(14), 6(1a)–(1c), 25(2) and (4), 75(1), new 75(1a) (serious incidents of systems under the AI Office's competence reported to the AI Office), 99(4)(da), Annex I (machinery to Section B) and Annex VIII Section B (points 7 and 9 deleted); Art. 73 not amended; Art. 113(a) Chapters I and II apply from 2 Feb 2025; Art. 113(c) as replaced: Chapter III, Sections 1, 2 and 3, except Art. 6(5), apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services; superseded in scope by the 2026 chapter amendment, which drops the cost test, adds a USD 500M revenue test and moves oversight to the DFS [25]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; large frontier developers publish the framework, all frontier developers report critical safety incidents; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (names the Agentic Trust Framework, AARM, the Catastrophic Risk Annex and STAR for AI; no "Agentic Control Supplement" is named, checked 2026-09-24). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; high-impact AI duties in Arts. 31 to 36; fact-finding in Art. 40; fines in Art. 43). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[35] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text; effective 1 Jan 2026. Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[36] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 30 Jun 2026, then replaced by SB 26-189, effective 1 Jan 2027). McDermott Will & Emery. 2026. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[37] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[38] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[39] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[40] ETSI EN 304 223: Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, Dec 2025; 13 principles across five lifecycle stages). ETSI. 2025-12. https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/ (verified: primary)
[41] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[42] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[43] Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm (verified: primary)
[44] Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 (verified: primary)
[48] GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A (verified: primary)
[49] Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (verified: primary)
[50] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[51] "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ (verified: reported)
[52] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[53] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[54] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[55] SB26-189 Automated Decision-Making Technology (signed by the Governor 14 May 2026; Session Laws chapter 131). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[56] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[57] Regulation (EU) 2024/1689 (AI Act): Art. 26(5) (a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the market-surveillance authority; Art. 73 applies mutatis mutandis if it cannot reach the provider) and Art. 73(1)–(4) (report immediately on a causal link or its reasonable likelihood, and no later than 15, 2 or 10 days after the provider or, where applicable, the deployer becomes aware). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[58] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[59] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; no revised version published as of 2026-09-24). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[60] Project stages for JTC 21 deliverables read on 2026-09-24 (prEN 18228 and prEN 18282 Enquiry votes closed 2026-07-30; prEN 18229-1 closed 2026-08-20; prEN 18229-3 at Enquiry from 2026-07-30; prEN 18229-4 and -5 new projects 2026-06-24). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[61] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; Q4 2026 target). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[62] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[63] Regulation (EU) 2024/1689 (AI Act), consolidated text of 27 July 2026 incorporating Regulation (EU) 2026/1744 (Art. 3(1) AI system; Art. 6(3)–(4) documented non-high-risk assessment and Art. 49(2) registration; Art. 15(3)–(4) declared accuracy metrics and feedback loops; Art. 16(l) accessibility; Art. 17(1)(m) accountability framework; Art. 18 documentation kept 10 years; Art. 19 logs kept at least six months; Art. 20 corrective actions; Arts. 22–24 authorised representatives, importers and distributors; Art. 26(1)–(11) deployer duties; Art. 43(4) new assessment on substantial modification; Art. 48 CE marking; Art. 52 notification within two weeks; Art. 53(1)(c) copyright policy; Art. 54 authorised representative of GPAI providers; Art. 73(6) investigation without altering the system; Art. 86 right to explanation; Art. 87 Directive (EU) 2019/1937 applies; Art. 111(3) GPAI models placed on the market before 2 August 2025 comply by 2 August 2027; Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[64] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (internal reporting channels for private legal entities with 50 or more workers, Art. 8(3); acknowledgment within seven days and feedback within three months, Art. 9(1)). Publications Office of the EU (EUR-Lex). 2019-11-26. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[65] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, Measure 9.3: 2, 5, 10 and 15 days by incident class, intermediate reports at least every four weeks, final report within 60 days of resolution; Measure 9.4: records kept at least five years; Appendix 1.3 sources of systemic risk incl. the capability to operate autonomously, colluding with other AI systems, access to tools and the level of human oversight; Appendix 1.4 specified systemic risks incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[66] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 5(1)(b)–(c), 5(2), 6, 6(4), 7, 9, 13, 14, 15(1)(h), 16, 17, 21, 22, 25, 28, 30, 33–36, 44–49; applies from 25 May 2018, Art. 99(2)). Publications Office of the EU (EUR-Lex). 2016-05-04. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[67] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (legitimate-interest test; anonymity test and the evidence expected for a claim that a model is anonymous). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[68] Directive (EU) 2022/2555 (NIS2) (Art. 21(2)(c) business continuity and (d) supply-chain security; Art. 23(4) early warning within 24 hours, incident notification within 72 hours, final report within one month; Art. 41(1) measures applied from 18 October 2024). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[69] Regulation (EU) 2022/2554 (DORA) (Art. 19 reporting of major ICT-related incidents; Art. 28(3) register of information; Art. 28(8) exit strategies; Art. 64 applies from 17 January 2025). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[70] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits of major ICT-related incident reports (Art. 5(1): initial notification within four hours of classification and no later than 24 hours from awareness; Art. 5(2): within four hours of a classification made after those 24 hours; intermediate report within 72 hours of the initial notification; final report no later than one month after the latest intermediate report). Publications Office of the EU (EUR-Lex). 2025-02-20. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[71] Regulation (EU) 2024/2847 (Cyber Resilience Act) (Art. 14 reporting of actively exploited vulnerabilities and severe incidents: early warning within 24 hours, notification within 72 hours, final reports; Art. 71(2) applies from 11 December 2027, Art. 14 from 11 September 2026). Publications Office of the EU (EUR-Lex). 2024-11-20. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[72] Directive (EU) 2024/2853 on liability for defective products (Art. 2(1) products placed on the market or put into service after 9 December 2026; Art. 4(1) software is a product; Art. 9 disclosure of evidence; Art. 10 presumption of defectiveness; Art. 11(2) no exemption for defects due to software, its updates or the lack of safety updates within the manufacturer's control; Art. 22 transposition by 9 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-18. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[73] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(3) text-and-data-mining exception subject to an express reservation, by machine-readable means for content made publicly available online; Art. 29 transposition by 7 June 2021). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[74] Regulation (EU) 2022/2065 (Digital Services Act) (Art. 25 online interface design and organisation; Art. 27 recommender system transparency; applies from 17 February 2024). Publications Office of the EU (EUR-Lex). 2022-10-27. https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng (verified: primary)
[75] Directive 2005/29/EC (Unfair Commercial Practices Directive) (Art. 5 general prohibition; Arts. 6–7 misleading actions and omissions; Art. 19 measures applied by 12 December 2007), with Directive (EU) 2019/2161 adding Annex I points 23b and 23c on consumer reviews. Publications Office of the EU (EUR-Lex). 2005-06-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng (verified: primary)
[76] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 7 limits on processing by automated systems; Art. 9 transparency; Art. 10 human oversight and an impact evaluation at least every two years; Art. 11 explanation and human review; Art. 29 transposition by 2 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-11. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[77] Directive (EU) 2023/2225 on credit agreements for consumers (Art. 18(8) human intervention, explanation and review where the creditworthiness assessment involves automated processing; Art. 48 measures applied from 20 November 2026). Publications Office of the EU (EUR-Lex). 2023-10-30. https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng (verified: primary)
[78] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (AI stakeholder roles; AI system life cycle). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[79] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV, MP, MS and MG). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[80] AICM v1.1.1 and AI-CAIQ machine-readable bundle (JSON, YAML, OSCAL; control ids and titles incl. IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries). Cloud Security Alliance. 2026-08-04. https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal (verified: primary)
[81] Agentic Trust Framework, v1 (zero-trust governance for AI agents; autonomy tiers and promotion criteria; CC BY 4.0). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[82] Autonomous Action Runtime Management (AARM) specification (pre-execution interception with identity binding; policy evaluation before execution). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[83] STAR for AI (Level 1 self-assessment; Level 1 Valid-AI-ted automated validation; Level 2 with ISO/IEC 42001 certification plus the Valid-AI-ted assessment; read 2026-09-24). Cloud Security Alliance. 2026-09-24. https://cloudsecurityalliance.org/star/ai (verified: primary)
[84] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[85] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[86] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; reminders at least every three hours for known minors; suicide and self-harm protocol; annual reports to the Office of Suicide Prevention beginning 2027-07-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[87] "California Finalizes Regulations to Strengthen Consumers' Privacy" (regulations on ADMT, risk assessments and cybersecurity audits approved 2025-09-23; effective 2026-01-01; ADMT requirements from 2027-01-01; risk-assessment attestations and summaries due 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[88] New York General Business Law Article 47, Artificial Intelligence Companion Models (§§ 1700–1704; self-harm protocol; notice at the start and at least every three hours; Attorney General, up to USD 15,000 per day; most recent revision shown 2025-11-07). New York State Senate. 2025-11-07. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[89] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; ZIP codes as a proxy; IDHR draft rules). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[90] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[91] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (Utah Code 13-75, effective 2025-05-07: disclosure on a clear and unambiguous request; prominent disclosure in high-risk interactions by regulated occupations; safe harbour; Title 13, Chapter 72, Artificial Intelligence Policy Act, repealed 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[92] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 2021-07-06; effective 2021-09-07; risk-management framework, testing and chief-risk-officer attestation; rules per type of insurance, none effective before 2023-01-01). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[93] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, profiling with a reasonably foreseeable risk, sensitive data; processing activities created after 2023-01-01; available to the Attorney General). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
[94] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[95] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review and correct the data, have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[96] "Biometric Information Privacy Act" (signed 3 October 2008; consent, timely destruction and secure storage of biometric identifiers; USD 1,000 or 5,000 per violation). Wikipedia. 2026-09-24. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: reported)
[97] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; 31 March 2024, small businesses 30 June 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[98] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (high-impact AI; minimum practices; 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[99] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (policies updated by 2026-03-11; minimum LLM transparency in solicitations). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[100] 12 CFR § 1002.9, Notifications (statement of specific reasons, or the right to one within 30 days; internal standards or a failed score are insufficient; source 76 FR 79445, 21 December 2011, as amended 20 March 2023). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: secondary)
[101] 15 U.S.C. § 1681m, Requirements on users of consumer reports (adverse-action notice; numerical credit score and key factors added by Pub. L. 111-203, s. 1100F, effective on the designated transfer date, 21 July 2011 per 12 U.S.C. § 5582 note). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/1681m (verified: secondary)
[102] 42 U.S.C. § 2000e-2(k), Burden of proof in disparate impact cases (business necessity; alternative employment practice; added by the Civil Rights Act of 1991, 21 November 1991). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[103] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures: adverse impact and the four-fifths rule (43 FR 38295, 25 August 1978). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: secondary)
[104] 15 U.S.C. § 45(a)(1), Unfair methods of competition and unfair or deceptive acts or practices unlawful (deceptive-practices prong added by the Wheeler-Lea Act of 21 March 1938). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[105] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (competent and reliable evidence required for AI accuracy claims). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[106] TAKE IT DOWN Act, Public Law 119-12 (enacted 19 May 2025; s. 3: covered platforms establish a notice-and-removal process within one year of enactment and remove reported images, and known identical copies, within 48 hours; enforced by the FTC). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[107] Model AI Governance Framework for Agentic AI, version 1.5 (agent identity unique, accounted for and centrally managed; authorisations scoped, time- or session-bound, non-transferable and bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[108] Directive on Automated Decision-Making (in effect 1 April 2019; systems procured before 24 June 2025 comply by 24 June 2026; 6.1 algorithmic impact assessment published before production; Appendix C requirements by impact level; notice, explanation, peer review, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[109] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 20 review of decisions taken solely on automated processing; Art. 65 entry into force, incl. Arts. 52 to 54 from 1 August 2021). Presidência da República (Brazil). 2026-09-24. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[110] Personal Information Protection Law of the People's Republic of China, English translation for reference (Art. 24 automated decision-making; Arts. 55–56 personal information protection impact assessment kept at least three years; in force 1 November 2021). National People's Congress. 2021-12-29. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[111] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 April 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[112] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[113] The Framework Convention on Artificial Intelligence (Parties: the European Union; not yet in force; read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[114] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (principles 1.4(b) override, repair or decommission safely and 1.5(b)–(c) traceability and systematic risk management; revised 3 May 2024). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[115] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[116] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (reporting framework launched 7 February 2025; first reports by 15 April 2025). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[118] Public Act 103-0804, HB 3773 (amends the Illinois Human Rights Act, 775 ILCS 5/2-102(L): no AI with a discriminatory effect on protected classes, no ZIP codes as a proxy, notice of AI use; IDHR to adopt rules; approved 9 Aug 2024, effective 1 Jan 2026; text and bill status read from Web Archive captures of 2025-03-29 and 2025-06-17, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2024-08-09. https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804 (verified: primary)
[119] 740 ILCS 14, Biometric Information Privacy Act (Source: P.A. 95-994, eff. 10-3-08; s. 15 retention schedule, written release, secure storage; s. 20 right of action, USD 1,000 negligent or USD 5,000 intentional or reckless per violation; text read from the Web Archive capture of 2025-06-18, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2008-10-03. https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004&ChapterID=57 (verified: primary)
