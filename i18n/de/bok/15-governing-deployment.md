---
lang: de
source: bok/15-governing-deployment.md
sourceHash: "b36107eafc969f54fd80c6d9a7b9b07bfd81efb8a8843db6acb8ab5a87c7cd53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 15. Governance von Bereitstellung und Nutzung

> Governance des Betriebs: wie ein Betreiber entscheidet, ein KI-System zu nutzen, es auswählt,
> dafür Verträge abschließt, es in Betrieb nimmt, es betreibt und es außer Betrieb nimmt, wobei
> jeder Schritt Nachweise hinterlässt, dass eine Kontrolle ausgelöst wurde.

Die meisten Organisationen setzen deutlich mehr KI ein, als sie entwickeln. Die Designpflichten
eines Anbieters sind weitgehend erfüllt, wenn das System auf den Markt gebracht wird; die Pflichten
eines Betreibers beginnen, wenn das System in Betrieb genommen wird, und laufen so lange, wie es
läuft: es wie vorgesehen nutzen, seine Aufsicht mit Personal besetzen, es überwachen, es aussetzen,
wenn es ein Risiko darstellt, seine Protokolle führen und den Menschen mitteilen, dass es vorhanden
ist [1]. Kapitel 18 listet die
[Betreiberpflichten nach Artikel 26](/bok/eu-ai-act#deployer-duties-article-26) einzeln auf, und
Kapitel 17 behandelt die Incident-Seite davon
([Betreiberpflichten: den Anbieter informieren, Nutzung aussetzen](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)).
Dieses Kapitel folgt einem System von der Entscheidung, es zu nutzen, bis zu dem Tag, an dem es
abgeschaltet wird. Bei jedem Schritt benennt es die Entscheidung, das Artefakt, das sie
dokumentiert, die Stack-Schicht, die den Nachweis erbringt, und den Datensatz, der im
Assurance-Speicher landet.

Zwei Begriffe tragen das Kapitel. Ein **Betreiber** ist jeder, der ein KI-System unter seiner
Autorität nutzt, außer in einer persönlichen, nicht beruflichen Aktivität; ein **Anbieter**
entwickelt ein System oder Modell oder lässt es entwickeln und bringt es unter seinem eigenen Namen
oder seiner eigenen Marke auf den Markt oder nimmt es in Betrieb [2]. Die Bezeichnungen beschreiben
Aufgaben, nicht Arten von Organisationen: eine Bank, die ein Modell eines Anbieters feinabstimmt und
das Ergebnis unter ihrer eigenen Marke ausliefert, kann beide Rollen für dasselbe System innehaben
(siehe [Wenn ein Betreiber ein Anbieter wird](#when-a-deployer-becomes-a-provider)). Kapitel 14
behandelt die Build-Seite; dieses Kapitel behandelt die Run-Seite. Artikelverweise beziehen sich auf
die KI-Verordnung der EU wie durch das Digital-Omnibus geändert, Stand 2026-09-24, deren
Hochrisiko-Regeln ab 2. Dezember 2027 für Annex-III-Systeme gelten [3]; sie sind illustrative
Zuordnungen, keine Konformitätserklärung.

Governance von Bereitstellung ist nicht Release Engineering. MLOps fragt, ob eine neue Version
ausgerollt und zurückgerollt werden kann. KI-Governance-Engineering fragt, wer entschieden hat, dass
das System dienen darf, auf welche Evidenz hin, welches Signal es ohne ein Treffen zurückrollt, und
welcher Datensatz beweist, dass jedes davon passiert ist.

## Der Bereitstellungslebenszyklus auf einen Blick

| Phase | Die Entscheidung | Artefakt | Schicht | Nachweisdatensatz |
|---|---|---|---|---|
| Entscheiden | Sollte KI das tun, und genau was? | Bereitstellungsentscheidungsdatensatz | 1 · 2 | Unterzeichneter Datensatz verknüpft mit dem Registereintrag |
| Auswählen | Welches Modell, gehostet wo, angepasst wie? | Modellauswahlsdatensatz | 3 · 2 | Task-Eval-Ergebnisse pro Kandidat |
| Vertrag | Unter welchen Bedingungen? | Vertrags- und Lizenzprüfung | 1 · 5 | Klausel-Checkliste; AIBOM-Lizenzfelder |
| Go-Live | Genehmigen, mit Bedingungen genehmigen oder ablehnen? | Go-Live-Entscheidung mit Dissens | 1 · 5 | Entscheidungsdatensatz; Bedingungen als Richtlinie |
| Ausrollen | Wie viel Exposition, und was rollt es zurück? | [Ausrollplan mit Rollback-Kriterien](/patterns/staged-rollout-rollback-criteria) | 4 | Stage-Gate-Ergebnisse; Rollback-Ereignisse |
| Betrieb | Ist es immer noch geeignet, fair und wertvoll? | [Überwachungsplan](/patterns/drift-fairness-monitor); Wartungskalender | 4 · 5 | Drift-, Fairness-, Kosten- und Energietelemetrie |
| Assurance | Funktionieren die Kontrollen noch? | Audit-, Red-Team- und Threat-Model-Programm | 3 · 5 | Erkenntnisse bis zum Abschluss nachverfolgt |
| Kommunizieren | Wer muss was hören, und wann? | [Kommunikationsplan und Vorlagen](/patterns/disclosure-notification-pipeline) | 5 | Mitteilungen gesendet, mit Zeitstempeln |
| Außerbetriebnahme | Herabstufen, lokalisieren oder ausschalten? | [Deaktivierungs- und Stilllegungsrunbook](/patterns/deactivation-localisation-retirement-runbook) | 4 · 2 | Entscheidungsdatensatz; endgültiger Evidenz-Snapshot |

## Die Bereitstellungsentscheidung

### Beginnen Sie mit dem Use Case, nicht mit dem Modell

Die Entscheidung zur Bereitstellung ist eine Produktentscheidung mit einem Governance-Datensatz.
Bevor ein Modell verglichen wird, schreiben Sie das Geschäftsziel auf und wie Sie wissen werden,
dass es erreicht wurde, die Menschen, auf die das System einwirkt, die Entscheidung, die es
informiert oder trifft, und ob KI überhaupt das richtige Werkzeug ist: eine Regelmaschine, ein
besseres Formular oder ein Suchindex ist manchmal die ehrliche Antwort.

Benennen Sie dann den **negativen Raum**: wofür das System explizit nicht ist. Der negative Raum ist
das, was später Funktionskriechen erkennbar macht, weil eine Nutzung, die nie genehmigt wurde,
irgendwo als außerhalb des Geltungsbereichs aufgezeichnet werden kann. Die **Zweckbestimmung** des
Anbieters (die Nutzung, für die er das System entworfen und dokumentiert hat, einschließlich des
Kontexts und der Nutzungsbedingungen [2]) ist die äußere Grenze; Ihr negativer Raum liegt darin.

Klassifizieren Sie die Nutzung bei der Aufnahme, den in
[Kapitel 06](/bok/the-role#intake-and-classification) beschriebenen Workflow: Risikostufe,
regulatorische Exposition, Datensensibilität und Autonomie. Die Klassifizierung entscheidet, welche
der Kontrollen in diesem Kapitel gelten. Eine Annex-III-Nutzung löst die Betreiberpflichten von
Artikel 26 [1] aus und für öffentliche Stellen, private Einrichtungen, die öffentliche Dienste
erbringen, und Kreditscoring- sowie Lebens- und Krankenversicherungs-Pricing-Nutzungen die
Grundrechte-Folgenabschätzung nach Artikel 27 (FRIA) vor der ersten Nutzung [4]. Ein Chatbot oder
ein Generator synthetischer Inhalte löst die Transparenzpflichten nach Artikel 50 aus, die ab 2.
August 2026 gelten [5]; ein generatives System, das bereits vor diesem Datum auf dem Markt ist, hat
bis 2. Dezember 2026 Zeit, die Kennzeichnungspflicht nach Artikel 50(2) zu erfüllen (Artikel 111(4))
[8]. Die verbotenen Praktiken von Artikel 5 binden Betreiber ebenso wie Anbieter, einschließlich des
Verbots von Systemen, die Anfälligkeit aufgrund von Alter, Behinderung oder einer bestimmten
sozialen oder wirtschaftlichen Situation ausnutzen [6].

### Legen Sie zunächst Leistungs- und Erklärbarkeitsanforderungen fest

Anforderungen, die nach einer Anbieterdemonstration geschrieben werden, sind auf die Demonstration
zugeschnitten. Legen Sie sie fest, bevor Sie sich Kandidaten ansehen:

- **Metriken, die dem Schaden entsprechen.** Für einen Triage-Klassifizierer falsch negative
  Ergebnisse bei dringenden Fällen; für einen generativen Assistenten Bodenhaftung und die Ablehnung
  von Anfragen außerhalb des Geltungsbereichs. Eine durchschnittliche Genauigkeitszahl ist selten
  die Metrik, die einem Schaden entspricht.
- **Pro-Gruppen-Untergrenze.** Ein Schwellenwert pro Bevölkerung, auf die das System einwirkt, damit
  ein guter Durchschnitt nicht verbergen kann, dass eine Gruppe das System nicht erfüllt.
- **Go/No-Go-Schwellenwerte**, die die Go-Live-Überprüfung anwendet, jeder auf den Fehlermodus
  zurückgeführt, für den er steht, was die in
  [den Grenzen des Eval Gate](/bok/definition#the-limits-of-the-eval-gate) festgelegte Disziplin
  ist.
- **Die Erklärung, die die Nutzung benötigt.** Ein Ursachencode für eine nachteilige Entscheidung,
  eine zitierte Quelle für eine generierte Antwort oder ein interpretierbares Modell, bei dem die
  Entscheidung anfechtbar sein muss. Wenn eine Entscheidung auf der Grundlage der Ausgabe der
  meisten Annex-III-Systeme rechtliche oder ähnlich bedeutende Auswirkungen auf eine Person hat, hat
  diese Person das Recht auf eine klare und aussagekräftige Erklärung vom Betreiber der Rolle des
  Systems in der Entscheidung [7]. Das Entwerfen für diese Antwort ist billiger als das
  nachträgliche Anpassen; [Kapitel 16](/bok/fairness-and-explainability#explanation-techniques)
  behandelt die Methoden.

### Überprüfen Sie die Daten und die Menschen

**Daten.** Existieren die Eingabedaten mit der Abdeckung und Qualität, die die Nutzung benötigt, mit
einer Versorgung, die anhält, und einer rechtmäßigen Grundlage für diesen Zweck? Wenn der Betreiber
die Eingabedaten eines Hochrisiko-Systems kontrolliert, muss er sicherstellen, dass die Daten für
die Zweckbestimmung relevant und ausreichend repräsentativ sind [1].

**Menschen.** Die Aufsicht muss Menschen mit der erforderlichen Kompetenz, Schulung und Autorität
sowie der Unterstützung zu ihrer Nutzung zugewiesen werden [1]. Artikel 4, umformuliert durch das
Omnibus, fordert Anbieter und Betreiber auf, die KI-Kompetenz ihres Personals zu unterstützen [8].
Bevor ein Hochrisiko-System bei der Arbeit eingesetzt wird, muss ein Arbeitgeber-Betreiber die
Vertreter der Arbeitnehmer und die betroffenen Arbeitnehmer informieren [1]. Bereitschaft bedeutet
auch die Autorität zu pausieren: ein Operator, der sieht, dass sich das System falsch verhält, muss
es stoppen dürfen, ohne zuerst um Erlaubnis zu fragen.

### Der Bereitstellungsentscheidungsdatensatz

Ziehen Sie diese Antworten in ein Artefakt, den **Bereitstellungsentscheidungsdatensatz (DDR)**,
committed neben dem Code des Systems und referenziert aus seinem Registereintrag (Schicht 02). Seine
Untergrenzen werden die Schwellenwerte des Eval Gate (Schicht 03); sein negativer Raum wird der
Geltungsbereich, den die Laufzeit überwacht (Schicht 04). Die Vorlagenseite hat ein JSON-Schema für
[die Bereitstellungsentscheidung und das Stilllegungsrunbook](/resources/templates#schema-deployment-decision-record).
Ein illustrativer Auszug:

```json
{ "ddr_id": "ddr-csa-01-v1", "system": "csa-01",
  "objective": "resolve tier-1 refund queries without an agent",
  "not_for": ["credit decisions", "complaints about staff"],
  "risk_tier": "limited", "obligations": ["EU AI Act Art. 50", "GDPR Art. 35"],
  "floors": { "groundedness": 0.95, "out_of_scope_refusal": 0.98 },
  "retire_if": ["deflection below business case for two quarters"],
  "owner": "team-support-platform", "decision": "proceed-to-selection" }
```

> **In der Praxis (illustrativ)**
> Für `csa-01`, den Kundenservice-Assistenten bei einem großen Telekommunikationsunternehmen,
> listete der DDR's negativer Raum "Beschwerden über Personal" auf. Monate später schlug ein Team
> vor, interne HR-Anfragen an denselben Assistenten weiterzuleiten. Das Aufnahmeformular überprüfte
> den Vorschlag gegen den Datensatz, kennzeichnete ihn als neue Nutzung und schickte ihn stattdessen
> durch die Klassifizierung zurück, anstatt einer stillen Konfigurationsänderung. Der Datensatz
> stoppte die Idee nicht; er machte die Änderung des Zwecks sichtbar und verantwortlich.

## Auswahl des Modells

### Evaluieren Sie auf Ihre Aufgabe, Ihre Daten und Ihre Benutzer

Ein öffentlicher Benchmark beantwortet "wie gut ist dieses Modell bei diesem Benchmark?". Die Frage
des Betreibers ist "wie gut ist es bei unserer Aufgabe, für unsere Benutzer, unter unseren
Einschränkungen?". Erstellen Sie eine **Auswahleval**: eine Reihe repräsentativer Fälle aus dem
Datenverkehr, den Sie rechtmäßig nutzen dürfen, gekennzeichnet mit der gewünschten Antwort,
geschichtet nach den Gruppen und Grenzfällen, die der DDR benennt, und bewertet nach den Metriken,
die dem Schaden entsprechen. Machen Sie sie groß genug, um den Pro-Gruppen-Unterschied zu zeigen,
den Sie interessiert. Führen Sie jeden Kandidaten durch dieselbe Harness mit denselben Prompts,
Abruf und Guardrails aus, und behalten Sie die Ergebnisse: die Auswahleval wird die erste Version
der Regressionssuite hinter dem [Eval Gate](/patterns/eval-gate-in-ci).

### Was öffentliche Benchmarks und Leaderboards nicht sagen können

- **Kontamination.** Test-Items lecken in Trainingsdaten. Als Forscher einen neuen Satz von
  Grundschul-Matheproblemen schrieben, die mit einem beliebten Benchmark abgestimmt waren, verloren
  mehrere Modellfamilien bis zu 8% an Genauigkeit, ein Zeichen von Überanpassung an den öffentlichen
  Satz [9].
- **Selektive Offenlegung.** Ein Ranking spiegelt wider, was Anbieter einreichen möchten. Eine
  Analyse eines weit verbreiteten Arena-ähnlichen Leaderboards ergab, dass einige Anbieter viele
  private Varianten vor der Veröffentlichung testeten und Scores zurückziehen konnten, wenn sie
  wollten [10].
- **Goodhart.** Sobald ein Benchmark kommerziell relevant wird, werden Modelle darauf abgestimmt.
  Der Druck, der ein Eval Gate Goodhartbar macht, wirkt mit größerer Kraft auf eine öffentliche
  Zahl, die Sie nicht kontrollieren.

Verwenden Sie Benchmarks, um eine Shortlist zu erstellen, nie um die Entscheidung zu treffen.

### Zählen Sie die gesamten Kosten, einschließlich Energie

Die Kosten eines Modells sind die Lizenz- oder API-Gebühr plus Inferenz-Compute, Integration,
Evaluierung und Überwachung, die laufenden Kosten des Governance-Stack um es herum (siehe
[the cost of the stack](/bok/the-stack#the-cost-of-the-stack)) und die Kosten des Ausstiegs. Energie
und Kohlenstoff gehören auf das gleiche Ledger, und die Modellwahl ist der Ort, an dem die meisten
von ihnen entschieden werden. Eine Studie maß mehrzweck-generative Architekturen als um
Größenordnungen teurer pro Inferenz als aufgabenspezifische Systeme bei den gleichen Aufgaben, auch
unter Kontrolle der Modellgröße [11]. Die Messgrenzen sind wichtig: ein Anbieter setzte den
Median-Textprompt seines Assistenten auf 0,24 Wh an, unter Berücksichtigung von Leerlaufkapazität
und Rechenzentrumsaufwand sowie der Beschleuniger [12]; eine Zahl, die diese ausschließt, ist nicht
vergleichbar. Auf der Ebene des gesamten Sektors prognostiziert die IEA, dass die Stromnutzung von
Rechenzentren bis 2030 auf etwa 945 TWh mehr als verdoppelt wird [13]. Der KI-Verordnung fordert
GPAI-Anbieter auf, den bekannten oder geschätzten Energieverbrauch ihrer Modelle zu dokumentieren
[14]; nichts darin misst Ihren Inferenz-Fußabdruck, daher muss der Betreiber das tun.

### Dokumentieren Sie die Wahl

Das **Modellauswahlprotokoll** listet die Kandidaten, ihre Evaluierungsergebnisse, die Kosten- und
Energieschätzungen, die Gründe für die Wahl, die Bedingungen, die sie wieder öffnen würden (eine
Preisänderung, eine neue Anbieterversion, ein in der Produktion unterschrittener Schwellenwert) und
den Ausstiegsplan auf. Es wird gegen den Registereintrag eingereicht, sodass „Warum dieses Modell?

## Modelltypen und Bereitstellungsoptionen

Der Modelltyp ändert die Fehlermodi. Die Hosting-Option ändert, wer was sehen und stoppen kann. Die
Anpassungstechnik ändert, was Sie erneut testen müssen und manchmal Ihre rechtliche Rolle. Die
folgenden Tabellen beschreiben jede Option, und die Matrix am Ende benennt die Kontrolle, die jede
Kombination hinzufügt. Behandeln Sie alles als illustrativ, nicht als Konformitätsanspruch: Die
Kontrollen, die eine echte Bereitstellung benötigt, folgen aus ihrer Risikostufe, ihren
Verpflichtungen und ihren Fehlermodi.

### Modelltyp ändert die Kontrollgruppe

| Modelltyp | Dominante Fehlermodi | Kontrollen, die es hinzufügt (Schicht) |
|---|---|---|
| **Klassische Vorhersage (Klassifizierer, Scorer, Prognostiker)** | Fehlkalibrierung; Fehler-Lücken zwischen Gruppen; Input- und Label-Drift; Rückkopplungsschleifen, bei denen der Score die nächsten Trainingsdaten formt. | L3: Leistungsuntergrenzen pro Gruppe und eine Kalibrierungs-Eval auf Ihren eigenen gekennzeichneten Daten; L4: Drift-Monitor auf Eingaben und Ergebnissen (PSI, KS); L2: Model Card, die die Population angibt, auf der das Modell validiert wurde |
| **Generativ (Text, Code, Medien)** | Unbegründete oder fabrizierte Ausgabe; schädliche oder verletzende Inhalte; Prompt-Injection; Lecks von persönlichen oder vertraulichen Daten. | L3: Groundedness- und Red-Team-Evals auf Ihren eigenen Prompts; L4: Input- und Output-Guardrails; Offenlegung und Kennzeichnung synthetischer Inhalte (Art. 50); L2: Prompts und System-Prompts versioniert als Konfiguration im Registereintrag |
| **Proprietär (API oder lizenzierte Gewichte)** | Stille Versionänderung; Lock-in; undurchsichtige Trainingsdaten; Bedingungen oder Preise, die sich unter Ihnen ändern. | L1: Vertragsbedingungen (kein Training auf Eingaben, Residenz) als Richtlinie durchgesetzt; L2: Anbietermodellversion im Registereintrag fixiert; L3: Grenz-Evals werden bei jeder Anbieterversionsänderung erneut ausgeführt |
| **Open-Weight** | Lizenz- oder Acceptable-Use-Verstoß; manipulierte oder bösartige Gewichtsdateien; ungepatchte Sicherheitslücken, die jetzt Ihre sind zu patchen. | L1: Lizenz- und Acceptable-Use-Prüfung als Richtlinien-Gate; L2: AIBOM-Eintrag mit Quelle, Lizenz und Datei-Hash; L3: Vollständige Eval- und Red-Team-Suite Ihrer eigenen; L4: Ihre eigenen Guardrails: Keine Anbieter-Sicherheitsschicht sitzt davor |
| **Klein (aufgabengroß, edge-fähig)** | Fähigkeitsdeckel; schwächeres Verweigerungstraining; spröde außerhalb seiner Aufgabe. | L3: Aufgabenspezifische Eval, die die Eignung für diese Aufgabe beweist, nicht allgemein; L4: Out-of-Scope-Anfragen an einen Fallback oder einen Menschen weiterleiten |
| **Groß (allgemeiner Zweck, Frontier)** | Breite Fähigkeitsfläche; breite Jailbreak-Fläche; Kostenüberschreitungen; Überabhängigkeit durch Benutzer. | L1: Umfang des Anwendungsfalls in der Richtlinie: was das System nicht gefragt werden darf; L3: Breiteres Red Team über die Fähigkeiten, die Sie nicht benötigen; L4: Ratenlimits und Ausgabengrenzen pro Identität |
| **Nur Sprache** | Textschäden; Injection durch Dokumente und Webinhalte, die das Modell liest. | L3: Text-Red-Team einschließlich indirekter Injection; L4: Text-Guardrails auf Input und Output |
| **Multimodal (Bild, Audio, Video)** | Synthetische Medien und Identitätsdiebstahl; Anweisungen in Bildern oder Audio versteckt; biometrische und Überwachungsnutzungen. | L1: Verbotene-Praktiken-Prüfungen (Art. 5) und eine biometrische Nutzungsrichtlinie; L3: Cross-modale Red Team; L4: Maschinenlesbares Kennzeichnen von generierten Medien (Art. 50) |

Die größte Aufteilung ist klassisch gegen generativ. Klassische Modelle scheitern leise, durch
Kalibrierung, Drift und Gruppenfehler-Lücken; generative Modelle scheitern laut, durch Inhalte.
Proprietär gegen Open-Weight ist hauptsächlich eine Frage, wer die Evidenz produziert: Mit einer API
sammeln Sie sie vom Anbieter (Model Card, AIBOM falls angeboten, Änderungsmitteilungen), mit Open
Weights produzieren Sie fast alles selbst (Hashes, Scans, Evals, Red-Team-Ergebnisse, Runtime-Logs;
siehe [third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

### Wo es läuft

| Wo es läuft | Dominante Fehlermodi | Kontrollen, die es hinzufügt (Schicht) |
|---|---|---|
| **Cloud (verwalteter Service oder API)** | Daten verlassen Ihre Grenze; Anbieterausfall; Inferenz an die falsche Region weitergeleitet. | L1: Residenz- und Datenklassen-Richtlinie als Code; L4: Egress- und Regions-Durchsetzung auf dem Inferenzpfad; L5: Anbieterattestate und Sub-Processor-Liste gesammelt und datiert |
| **On-Premise (Ihr Rechenzentrum oder Private Cloud)** | Sie besitzen Patching, Kapazität und physische Sicherheit; Updates hinken hinterher. | L4: Netzwerksegmentierung und Zugriffskontrolle auf die Gewichte; L2: AIBOM mit Datei-Hashes für jeden bereitgestellten Artefakt; L5: Ihre eigenen manipulationssicheren Logs |
| **Edge (Gerät, Fahrzeug, Filiale)** | Manipulation; Extraktion von Gewichten; veraltete Versionen im Feld; kein zentrales Log. | L2: Signierte Modellartefakte und ein Registereintrag von Feldversionen; L4: Secure Boot, Geräteattestation, Remote-Rollback und Remote-Deaktivierung; L5: Stichproben-Telemetrie, die den Evidence Store erreicht |
| **Hybrid (aufgeteilt nach Datenklasse oder Last)** | Richtlinienlücken an der Grenze; sensible Daten an die falsche Ebene weitergeleitet; inkonsistente Versionen. | L1: Routing-Richtlinie nach Datenklasse, auf jede Anfrage ausgewertet; L2: Ein Registereintrag über jede Ebene und ihre Versionen |

### Wie es angepasst wird

| Anpassung | Dominante Fehlermodi | Kontrollen, die es hinzufügt (Schicht) | Rolleneffekt |
|---|---|---|---|
| **Wie es ist (nur Prompting)** | Modell nicht an Ihre Aufgabe oder Population angepasst; der Anbieter ändert es unter Ihnen. | L3: Validierung gegen Ihre eigenen Schwellenwerte vor dem Go-Live; L4: Kompensierende Guardrails für die Lücken, die die Validierung gefunden hat; L2: System-Prompt versioniert mit dem Registereintrag | Betreiber, es sei denn, Sie benennen es um oder ändern seinen Zweckbestimmung (Art. 25(1)(a), (c)). |
| **Fine-Tune** | Sicherheitstraining erodiert; Tuning-Daten auswendig gelernt; neue Verzerrungen. | L3: Behandeln Sie das Ergebnis als ein neues System: vollständige Eval und Red Team erneut; L2: Data Card für den Tuning-Satz; AIBOM verknüpft Basismodell und abgestimmte Gewichte; L1: Compute-Log gegen das GPAI-Änderungskriterium überprüft | Kann eine wesentliche Änderung eines Hochrisiko-Systems sein (Art. 25(1)(b)) oder Sie zum Anbieter eines modifizierten GPAI-Modells machen. |
| **Retrieval-Augmented Generation (RAG)** | Abruf-Vergiftung; veraltete oder unlizenzierte Corpus; Antworten, die Dokumente über Benutzer hinweg lecken. | L4: Corpus-Zugriffskontrolle, die die Berechtigungen des Quellsystems widerspiegelt; L3: Groundedness-Eval gegen einen Corpus-Snapshot; L2: Corpus-Herkunft und Lizenz im AIBOM aufgezeichnet | Lässt die Rolle normalerweise unverändert. |
| **Destillation, Quantisierung, LoRA-Adapter** | Stille Qualitäts- oder Sicherheitsregression; verschobene Fehlerraten zwischen Gruppen; Adapter-Ausbreitung. | L3: Eval-Gate und Red Team auf dem komprimierten Artefakt erneut ausführen; L2: Jeden Adapter und quantisierten Build als eigene Version registrieren | Destillation oder Anpassung eines GPAI-Modells ist eine Änderung: überprüfen Sie es gegen das Compute-Kriterium (überprüfen). |
| **Agentic Wrapper (Tools, Aktionen)** | Tool-Missbrauch; Ziel-Hijack; Privilegien-Missbrauch; Aktionen, die kaskadieren. | L4: Agent-Identität, begrenzte Anmeldedaten, Tool-Vermittlung und ein getesteter Kill Switch; L2: Agent-Registereintrag mit Besitzer, Umfang und Ablauf; L4: Human-in-the-Loop-Gate bei hochfolgenreichen Aktionen | Ändert das Risiko mehr als die Rolle: Autonomie ist der Risiko-Multiplikator. |

### Die Modelltyp-nach-Bereitstellungsoptions-Matrix

Lesen Sie jede Zelle als die eine Kontrolle, die die Kombination zusätzlich zu ihrer Zeile und ihrer
Spalte hinzufügt.

| Modelltyp | Cloud | On-Premise | Edge | Fine-Tune | RAG | Agentic Wrapper |
|---|---|---|---|---|---|---|
| **Klassische Vorhersage** | Residenz-Prüfung auf Features; Input-Drift-Monitor | Besitzen Sie die Retraining-Pipeline und ihre Genehmigung | Signiertes Modell; Feldversions-Telemetrie; Remote-Rollback | Retraining ist eine Freigabe: Führen Sie Pro-Gruppe-Böden erneut aus | Nicht typisch; Regieren Sie stattdessen die Feature-Store-Lineage | Score löst eine Aktion aus: Human Gate bei nachteiligen Ergebnissen |
| **Generativ, Sprache** | Keine-Training- und Aufbewahrungsbedingungen; Output-Guardrail | Eigene Guardrails, Patching und Energiemessung | Kleines Modell; Offline-Guardrails; signierte Updates | Vollständiges Red Team; Sicherheits-Erosions-Eval | Groundedness-Eval; Corpus-Berechtigungen; Vergiftungsprüfungen | Agent-Identität, Tool-Vermittlung, Kill Switch |
| **Generativ, Multimodal** | Herkunftsmarken auf Ausgabe; biometrischer Nutzungsblock | Eigene Content-Signierung; Medien-Aufbewahrungsregeln | Kamera- und Mikrofon-Hinweise; On-Device-Minimierung | Ähnlichkeits- und Zustimmungsprüfungen auf Tuning-Medien | Cross-modale Injektionstests auf abgerufenen Medien | Bildschirm- und Sprachaktionen hinter einem Human Gate |
| **Proprietär (API)** | Fixieren Sie die Version; Grenz-Evals bei jeder Änderung | Anbieter-Appliance: Attestieren Sie Version und Update-Pfad | Anbieter-SDK: Lizenzlimits; Offline-Widerruf | Anbieter-Tuning-Service: Datenbedingungen; Ihre eigene Re-Eval | Ihr Corpus, ihr Modell: Aufbewahrung und Keine-Training-Bedingungen | Gewähren Sie begrenzte Tools; der Anbieter-Agent erhält seine eigene Identität |
| **Open-Weight** | Lizenz-Gate; Hash-verifizierte Gewichte auf gemieteter Compute | Sie besitzen Patching: AIBOM, Datei-Scans, Red Team | Gewichte sind extrahierbar: Lizenzbedingungen und [threat model](/patterns/ai-threat-model) | Compute-Log gegen das GPAI-Ein-Drittel-Kriterium | Jede Ebene der Evidenz ist Ihre zu produzieren | Eigene Guardrails von Ende zu Ende; keine Anbieter-Sicherheitsschicht |

## Bauen, kaufen oder anpassen

### Drei Routen, drei Evidenzlasten

| Route | Was Sie kontrollieren | Evidenz, die Sie produzieren | Evidenz, die Sie sammeln | Typische Rolle |
|---|---|---|---|---|
| **Kaufen** (SaaS, API) | Integration, Prompts, Identitäten, der Traffic, den Sie senden | Grenz-Evals; Runtime-Logs Ihres Traffics | Model Card, Betriebsanleitung, Zertifizierungen, Änderungsmitteilungen | Betreiber |
| **Anpassen** (Fine-Tuning, RAG, agentic wrapper) | Die Anpassung und alles drum herum | Evals des angepassten Systems; Tuning Data Card; Compute-Protokoll | Dokumentation und Lizenz des Basismodells | Betreiber; Anbieter, wenn ein Art.-25-Auslöser oder das GPAI-Kriterium zutrifft |
| **Entwickeln** (eigenes Modell) | Alles | Alles | Lizenzen für Daten und Komponenten von Drittanbietern | Anbieter und Betreiber |

Je weniger des Modells Sie besitzen, desto mehr Ihres Kontrollbudgets verschiebt sich vom Testen
darauf, es zu begrenzen und den Lieferanten nachzuweisen; je mehr Sie besitzen, desto mehr der
Nachweise müssen Sie selbst erbringen.

### Wenn ein Betreiber zum Anbieter wird

Artikel 25 Absatz 1 macht einen Händler, Einführer, Betreiber oder eine andere dritte Partei zum
Anbieter eines Hochrisiko-KI-Systems mit den Pflichten des Anbieters, wenn sie ihren Namen oder ihre
Marke auf einem bereits auf dem Markt befindlichen Hochrisiko-System anbringt; eine wesentliche
Veränderung an einem Hochrisiko-System vornimmt, sodass es Hochrisiko bleibt; oder die
Zweckbestimmung eines Systems, einschließlich eines Systems mit allgemeinem Verwendungszweck,
ändert, sodass es Hochrisiko wird [15]. Eine **wesentliche Veränderung** ist eine Änderung, die
nicht in der ursprünglichen Konformitätsbewertung des Anbieters vorgesehen ist und die Einhaltung
der Hochrisiko-Anforderungen beeinträchtigt oder die Zweckbestimmung ändert [2]. Der ursprüngliche
Anbieter hört dann auf, der Anbieter dieses Systems zu sein, muss aber zusammenarbeiten; das
Omnibus-Paket erweiterte diese Pflicht auf technische Dokumentation, bekannte Einschränkungen und
Ausfallmodi sowie gezielten technischen Zugang zum Testen und Validieren [8].

Modelle mit allgemeinem Verwendungszweck haben ihren eigenen Test. Die Leitlinien der Kommission zu
GPAI-Pflichten (Inhalt genehmigt am 18. Juli 2025, angenommen als C(2025) 7719 final am 19.
November 2025) [16] behandeln einen Akteur, der ein GPAI-Modell ändert oder fine-tuned, nur in
Ausnahmefällen als Anbieter des geänderten Modells, mit einem indikativen Kriterium: Die Änderung
nutzt mehr als ein Drittel der ursprünglichen Trainingsrechenleistung des Modells. Die
Dokumentations-, Urheberrechtspolitik- und Trainingszusammenfassungspflichten decken dann die
Änderung ab, nicht das gesamte Modell [17]; wenn das ursprüngliche Modell systemisches Risiko
aufweist, vermuten die Leitlinien, dass das geänderte Modell dies auch tut, mit den vollständigen
systemischen Risikopflichten [16]. Das Kriterium ist indikativ, und wie es auf Destillation oder
wiederholtes Adapter-Training angewendet wird, ist eine Frage für den Rechtsbeistand (überprüfen).
Die technische Konsequenz ist in jedem Fall klar: Protokollieren Sie die Rechenleistung jedes
Fine-Tunings als Artefakt, denn die Frage wird gestellt.

| Auslöser | Wie es in der Praxis geschieht | Erkennung | Artefakt |
|---|---|---|---|
| Name oder Marke (`Art. 25(1)(a)`) | White-Labelling eines Hochrisiko-Systems eines Anbieters | Markenprüfung in der Release-Checkliste | Rollendecision im Registereintrag |
| Wesentliche Veränderung (`Art. 25(1)(b)`) | Umschulung, neue Datenquellen, Schwellwerte über die vordefinierten Änderungen des Anbieters hinaus | Änderungsklassifizierung in CI gegen die vordefinierten Änderungen in der Betriebsanleitung [18] | Änderungsprotokoll |
| Geänderte Zweckbestimmung (`Art. 25(1)(c)`) | Ein allgemeiner Assistent im Einsatz bei Einstellung oder Kreditvergabe | Intake; das Downstream-Use-Register | Neuklassifizierung; geändertes DDR |
| GPAI-Änderung | Fine-Tuning eines GPAI-Modells mit mehr als einem Drittel seiner ursprünglichen Trainingsrechenleistung | Compute-Protokoll | Compute-Schätzung eingereicht mit dem AIBOM |

### Open-Weight-Lizenzen

Open Weights sind nicht eine Lizenz, und „Open Weight

| Familie | Beispiele | Was es von Ihnen verlangt | Worauf Sie achten sollten |
|---|---|---|---|
| **Permissiv** | Apache 2.0, MIT, BSD | Behalten Sie Hinweise und den Lizenztext; Apache 2.0 fügt eine ausdrückliche Patentlizenz hinzu. | Die Modelllizenz kann permissiv sein, während ihre Trainingsdaten oder eine Datensatzlizenz es nicht ist. |
| **Copyleft** | GPL-Familie | Die Verteilung eines Derivats erfordert die Veröffentlichung unter derselben Lizenz. | Gilt für Code im Serving-Stack genauso wie für das Modell; Verteilung ist der Auslöser. |
| **Netzwerk-Copyleft** | AGPL 3.0 | Benutzer, die über ein Netzwerk mit einer geänderten Version interagieren, müssen deren Quellcode angeboten bekommen. | Das Serving einer geänderten Komponente hinter einer API kann das Quellangebot auslösen. |
| **Verantwortungs-KI-Lizenz (Nutzungsbeschränkung)** | OpenRAIL-Familie | Offener Zugang mit aufgelisteten verbotenen Verwendungen, die an jeden nachgelagerten Benutzer und jedes Derivat weitergegeben werden müssen. | Nutzungsbeschränkungen begleiten das Modell: Ihre Nutzungsbedingungen müssen sie enthalten. |
| **Benutzerdefinierte Community-Lizenz** | Anbieter-„Community"-Lizenzen für Open-Weight-Modelle | Acceptable-Use-Richtlinie per Verweis eingebunden; Zuschreibungs- oder Benennungspflichten; Skalierungsschwellen, über denen eine separate Lizenz erforderlich ist. | Schwellen und Richtlinien unterscheiden sich je nach Modellversion; Benennungsregeln können für von Ihnen veröffentlichte Derivate gelten. |
| **Nicht-kommerziell oder nur für Forschung** | CC BY-NC-Familie; Forschungslizenzen | Keine kommerzielle Nutzung. | Ein Forschungs-only-Datensatz oder -Modell in einem kommerziellen Produkt ist ein Verstoß, unabhängig davon, wer ihn hinzugefügt hat. |

Drei Beispiele zeigen die Bandbreite. Apache 2.0 fügt seinen Berechtigungen eine ausdrückliche
Patentlizenz hinzu [19]. Die AGPL verlangt, dass Benutzer, die über ein Netzwerk mit einer
geänderten Version interagieren, deren Quellcode angeboten bekommen [20], was Serving-Stacks
erreicht. OpenRAIL-ähnliche Lizenzen gewähren offenen Zugang, hängen aber Nutzungsbeschränkungen an,
die an jedes Derivat und jede Umverteilung weitergegeben werden müssen [21]. Benutzerdefinierte
Community-Lizenzen gehen weiter: Die Llama-3.1-Lizenz bindet eine Acceptable-Use-Richtlinie ein,
verlangt die Zuschreibung „Built with Llama", verlangt, dass abgeleitete Modelle, die an andere
verteilt werden, „Llama" am Anfang ihres Namens tragen, und verlangt von Lizenznehmern, deren
Produkte am Veröffentlichungsdatum mehr als 700 Millionen monatlich aktive Benutzer hatten, eine
separate Lizenz anzufordern [22]. Die Kontrollen folgen: eine Lizenzprüfung als Policy-Gate (Layer
01), Lizenz, Acceptable-Use-Version und Datei-Hash im [AIBOM](/patterns/aibom) (Layer 02),
Hash-Verifizierung jeder Gewichtsdatei vor dem Laden und ein
[Scan serialisierter Modelldateien](/patterns/model-artefact-integrity) bevor sie eine Runtime
erreichen. Die vollständige Klausel und Lizenz-Checkliste befindet sich auf der
[Contracts-Seite](/resources/contracts).

### Das Modell besitzen: der Vorteil und die Last

Das Bauen oder starke Anpassen Ihres eigenen Modells erkauft Kontrolle: über Versionen und
Pensionierungsdaten, über Anpassung, über den Ort, an dem Daten leben, und über die Nachweise
selbst, da Sie Gewichte, die Sie halten, Red-Team können. Es erkauft auch die Last des Anbieters,
wenn Sie das System auf den Markt bringen, und drei operative Risiken, die API-Kunden größtenteils
mieten. **Gewichtssicherheit**: Die Gewichte sind ein zu schützendes Vermögen, vor Diebstahl der
Dateien und vor Extraktion durch die Inference-API, die beide NISTs Taxonomie adversarialer Angriffe
und MITRE ATLAS katalogisieren [23][24]; Ratenlimits, Query-Pattern-Überwachung und
Least-Privilege-Zugriff auf Gewichtsspeicher sind die Kontrollen. **Wartung**: Patching,
Neuvalidierung und Basismodell-Upgrades werden zu Ihrem Kalender. **Schlüsselperson-Risiko**: Ein
Modell, das nur zwei Personen umschulen können, ist ein Kontinuitätsrisiko mit Namen.

### Haftung, Versicherung und Risikotransfer

Die neue Produkthaftungsrichtlinie bringt Software, einschließlich KI-Systemen, in die Definition
eines Produkts; Mitgliedstaaten müssen sie bis 9. Dezember 2026 umsetzen, und sie gilt für Produkte,
die nach diesem Datum auf den Markt gebracht werden [25]. Für Entwickler, die Systeme auf den Markt
bringen, wird die Mängelhaftung zu einer Designeingabe; für Betreiber entscheidet der Vertrag,
welche Rückgriffe sie gegen den Lieferanten haben. Es gibt einen Markt für KI-spezifische
Versicherungen, einschließlich Deckung für Verluste aus Modellfehlern, die KI-Anbietern und den
Organisationen angeboten wird, die ihre Systeme einsetzen [26]. Überprüfen Sie bestehende Cyber-,
Technologie-Fehler-und-Auslassungs- und Haftungspolicen auf KI-Ausschlüsse mit Ihrem Makler, bevor
Sie Deckung annehmen. Wenn ein Versicherer Nachweise von Kontrollen verlangt, wird der
Underwriting-Fragebogen zu einem weiteren Verbraucher des Assurance-Speichers. Und übertragenes
Risiko ist nicht reduziertes Risiko: Das verbleibende Risiko nach Obergrenzen, Ausschlüssen und
Selbstbehalten gehört in das Risikoregister (siehe
[Kapitel 13](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it)).

## Lieferantenverträge und Lizenzbedingungen

Wenn Sie ein System einsetzen, das Sie nicht gebaut haben, ist der Vertrag eine Kontrollfläche und
der Ort, an dem die [Third-Party-KI-Richtlinie](/bok/governance-program#third-party-ai-policy) der
Organisation (Kapitel 12) durchsetzbar wird. Er entscheidet, ob Sie das System testen dürfen, ob Sie
hören, wenn es sich ändert, wo Ihre Daten hingehen und wie Sie gehen. Die KI-Verordnung verlangt
eine schriftliche Vereinbarung zwischen dem Anbieter eines Hochrisiko-Systems und Dritten, die seine
Komponenten, Tools und Dienste liefern, die die Informationen, Fähigkeiten, den technischen Zugang
und die Unterstützung spezifiziert, die der Anbieter benötigt [15]. Für Käufer geben die
EU-Musterklauzeln für KI-Beschaffung (MCC-AI), aktualisiert am 5. März 2025 in einer Hochrisiko- und
einer Light-Version mit Kommentar, einen Referenztext vor, der für öffentliche Organisationen
entworfen wurde; es ist die neueste Version ab 2026-09-24 [27]. ISO/IEC 42001 Anhang A.10 und das
NIST AI RMF (GOVERN 6, MANAGE 3) benennen die Third-Party-Kontrollen, die die Klauseln unterstützen
[28][29][30].

Die Klauseln, die für Governance am wichtigsten sind, mit der roten Flagge zum Beobachten und den zu
bewahrenden Nachweisen (die Fallback-Position für jede befindet sich auf der
[Contracts-Seite](/resources/contracts)):

| Klausel | Rote Flagge | Nachweise zum Bewahrung |
|---|---|---|
| **Verwendung Ihrer Daten zum Training** | Trainingsnutzung ist standardmäßig aktiviert, für „Serviceverbesserung" zulässig oder wird durch eine Einstellung gesteuert, die der Lieferant ändern kann. | Die Klausel, die Konto- oder API-Einstellung erfasst bei Go-Live und eine regelmäßige Neuprüfung dieser Einstellung. |
| **Rechte in Eingaben und Ausgaben** | Der Lieferant nimmt sich eine Lizenz für Ihre Eingaben über die Erbringung des Dienstes hinaus, oder behält sich Rechte in Ausgaben vor. | Die Klausel, referenziert vom Registereintrag jedes Systems, das den Lieferanten nutzt. |
| **Aufbewahrung und Löschung** | Aufbewahrung „solange erforderlich" ohne Zahl, oder Missbrauchsüberwachungsaufbewahrung, die Sie nicht verkürzen oder sehen können. | Aufbewahrungsbedingungen pro Datentyp; Löschbestätigungen; Ihr eigenes Log-Aufbewahrungsschema, das Art. 26 Abs. 6 erfüllt. |
| **Unterauftragsverarbeiter und vorgelagerte Modellanbieter** | Eine Unterauftragsverarbeiterliste, die nicht veröffentlicht ist, oder sich ohne Ankündigung und ohne Einspruchsrecht ändert. | Datierte Snapshots der Unterauftragsverarbeiterliste; Einspruchsentscheidungen. |
| **Datenspeicherort und -übertragungen** | Eine Regionsgarantie nur für Speicher, während Inference oder Support überall laufen können. | Datenspeicherort-Richtlinienverdikt aus dem Inference-Pfad; die Transferbewertung. |
| **Dokumentation und Betriebsanleitung** | Dokumentation „auf Anfrage verfügbar" oder begrenzt auf Marketingmaterial. | Versionierte Kopien an den Registereintrag angehängt. |
| **Audit- und Evaluierungszugriff** | Audit nur durch Lesen der eigenen Zusammenfassung des Lieferanten; Testen, Benchmarking oder Sicherheitsforschung verboten. | Berichte erhalten; Ihre Boundary-Eval-Ergebnisse; die vereinbarten Testfenster. |
| **Änderungsmitteilung, Versionsfixierung und Abkündigung** | Modelle können „jederzeit aktualisiert oder verbessert werden"; Abkündigungsmitteilung kürzer als Ihr Re-Validierungszyklus. | Änderungsmitteilungen gegen den Registereintrag eingereicht; Re-Validierungsergebnisse pro Version. |
| **Incident- und Schwachstellenbenachrichtigung** | Mitteilung „ohne unangemessene Verzögerung | Die SLA; erhaltene Mitteilungen und ihre Zeitstempel; Ihre Incident-Aufzeichnungen, die darauf verweisen. |
| **Verfügbarkeit, Latenz und Ratenlimits** | Service Credits als einziges Mittel für einen Ausfall, der einen kritischen Prozess unterbricht. | SLA-Berichte; Ihre eigene Verfügbarkeitsüberwachung; Kontinuitätstests. |
| **IP-Freistellung** | Freistellung ausgeschlossen, wenn Sie Prompts ändern, Filter anders verwenden oder Ausgaben kombinieren. | Nachweis, dass Sie die Freistellungsbedingungen erfüllt haben (Filter aktiviert, dokumentierte Nutzung), als Protokolle gespeichert. |
| **Leistungsgarantien und Ausgabehaftungsausschlüsse** | Pauschale Haftungsausschlüsse für Genauigkeit ohne dokumentierte Leistung überhaupt. | Die dokumentierte Leistung, verglichen mit Ihren eigenen Evals. |
| **Haftungsobergrenzen und Ausschlüsse** | Eine Obergrenze auf wenige Monate Gebühren festgelegt, mit Daten-, IP- und Regulierungsverlusten alle ausgeschlossen. | Die Obergrenze und Ausnahmen, als Restrisiko im Risikoregister erfasst. |
| **Acceptable-Use-Policy des Lieferanten** | Eine Policy, die durch Verweis eingebunden ist und die der Lieferant einseitig ändern kann. | Die Policy-Version bei Go-Live überprüft, auf Ihre eigene Liste verbotener Nutzungen abgebildet. |
| **Rollenzuweisung und behördliche Zusammenarbeit** | Stille zu AI-Act-Rollen oder eine Klausel, die Provider-Pflichten auf Sie verlagert, ohne dass Sie Zugang haben, um sie zu erfüllen. | Die Rollenenentscheidung im Registereintrag erfasst, mit der Klausel, die sie stützt. |
| **Sicherheitskontrollen und Zertifizierungen** | Zertifizierungen, die den AI-Service aus ihrem Geltungsbereich ausschließen. | Zertifikate mit ihren Geltungsbereichserklärungen; Red-Team-Zusammenfassungen. |
| **Beendigungsunterstützung, Portabilität und Ausstieg** | Keine Übergangsfrist; Fine-Tuning-Gewichte oder Adapter gehören dem Lieferanten; Export nur in proprietären Formaten. | Ein Ausstiegsplan und die Aufzeichnung einer Ausstiegsübung. |
| **Versicherung** | Keine Versicherungsklausel oder Deckung, die AI-bezogene Ansprüche ausschließt. | Versicherungszertifikate, datiert und mit dem Vertrag eingereicht. |

Zwei Regeln verwandeln die Tabelle in Governance. Erstens muss eine Klausel, die zur Laufzeit
relevant ist, zu einer Prüfung werden: die No-Training-Einstellung aus dem Konto ausgelesen, die
Residenzgarantie auf dem Inferenzpfad durchgesetzt, die Versionsfixierung im Register gehalten. Eine
Klausel, die nichts prüft, ist eine Hoffnung. Zweitens ist die Überprüfung ein Schritt des
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate), daher wird sie bei
Erneuerung und bei jeder wesentlichen Änderungsmitteilung erneut geöffnet. Der Datensatz hinter
dieser Tabelle, mit dem Risiko, das jede Klausel adressiert, einer Fallback-Position und den
Instrumenten, auf die sie abgebildet wird, ist eine Engineering-Checkliste, keine Rechtsberatung.

> **Beispiel (illustrativ)**
> Die Bedingungen eines Lieferanten erlaubten 60 Tage Ankündigung vor dem Ausmustern einer
> Modellversion. Der Re-Validierungszyklus des Betreibers (Selection Eval, Red Team, Canary) dauerte
> etwa 90 Tage. Die Lücke wurde als Risiko erfasst, bei Erneuerung auf ein
> 120-Tage-Abkündigungsfenster verhandelt, und in der Zwischenzeit durch Warmhalten eines zweiten
> Kandidatenmodells im Eval-Harness abgedeckt.

## Die Go-Live-Überprüfung

### Was die Überprüfung liest

Die Go-Live-Überprüfung liest ein Evidence Pack, keine Foliensätze: die DDR; den Modellauswahlsatz;
Eval-Gate-Ergebnisse gegen die Floors; die Red-Team-Zusammenfassung; die Impact Assessments (eine
FRIA, wo Artikel 27 gilt, eine DPIA, wo Datenschutzrecht eine verlangt, beide gepflegt wie im
[FRIA-as-Code](/patterns/fria-as-code)-Muster); die Vertragsüberprüfung; den Überwachungsplan mit
benannten Eigentümern; den Rollout-Plan mit seinen Rollback-Kriterien; den Kommunikationsplan; und
das Deactivation, Localisation & Retirement Runbook. Wenn die Evidenz die des Providers selbst ist
(seine Betriebsanleitung, die die Fähigkeiten, Einschränkungen, Überwachungsmaßnahmen und
Wartungsanforderungen des Systems angeben muss [18]), läuft die Überprüfung im **Review-Modus**: Sie
bewertet die Bewertung und Aufzeichnungen des Lieferanten und erfasst explizit, was der Betreiber
nicht überprüfen konnte. Auf der Provider-Seite kam dieselbe Evidenz aus
[Release Readiness und Conformity](/bok/governing-development#release-readiness-and-conformity)
(Kapitel 14).

### Drei Ergebnisse

| Ergebnis | Bedeutung | Was wird erfasst | Was die Pipeline tut |
|---|---|---|---|
| **Genehmigen** | Die Evidenz erfüllt die Floors | Entscheidung, Genehmiger, Restrisiko und wer es akzeptiert hat | Der Rollout-Plan beginnt in seiner ersten Phase |
| **Mit Bedingungen genehmigen** | Nur fortfahren, während benannte Bedingungen gelten | Jede Bedingung mit Eigentümer, Frist und der Prüfung, die sie überprüft | Bedingungen werden zur Policy: Ein Flag begrenzt die Exposition, und die Genehmigung trägt ein Verfallsdatum |
| **Ablehnen** | Die Evidenz unterstützt die Bereitstellung nicht | Die Gründe und was die Antwort ändern würde | Die Bereitstellung ist blockiert; der Register-Status liest `rejected` |

Eine Genehmigung mit Bedingungen ist, wo Governance am häufigsten zu Theater wird, weil Bedingungen
leicht zu gewähren und leicht zu vergessen sind. Machen Sie sie zum Code: Jede Bedingung ist eine
Prüfung mit einer Frist, und wenn die Prüfung bis dahin nicht bestanden hat, verfällt die
Genehmigung und das Feature Flag schließt. Restrisiko wird von einer Autorität akzeptiert, die zum
Risiko-Tier passt, nie vom Team, das versenden möchte.

### Aufgezeichnete Ablehnung

Jedes Mitglied der Überprüfung kann Ablehnung aufzeichnen. Die Ablehnung wird an den
Entscheidungssatz angehängt, benannt und bei der ersten Überwachungsüberprüfung nach Go-Live
überprüft. Sie kostet nichts, wenn der Ablehnende falsch liegt, und wenn sie recht haben,
beantwortet sie die erste Frage, die jede Incident-Überprüfung stellt: hat jemand das kommen sehen?

> **In der Praxis (illustrativ)**
> Die Go-Live-Überprüfung für `csa-01` genehmigte es mit zwei Bedingungen: ein Groundedness-Floor
> zum Thema Rückerstattungen, neu gemessen nach vier Wochen Live-Traffic, und ein spanischsprachiges
> Red Team, bevor der Assistent spanischsprachige Sprecher bediente. Beide wurden zu Flags. Der
> Security Lead zeichnete Ablehnung zum Tool-Umfang für Bestellungssuchen auf. Die
> Vier-Wochen-Prüfung bestand; das Red Team nicht, daher blieb Spanisch hinter seinem Flag, bis ein
> Fix ausgeliefert wurde, und die Ablehnung wurde mit reduziertem Umfang geschlossen.

## Progressive Bereitstellung als Kontrolle

Progressive Bereitstellung begrenzt die Exposition, während sich Evidenz ansammelt. Jede Phase ist
ein Gate mit einem im Voraus festgelegten Kriterium; die Phasen sind aus Site Reliability
Engineering entlehnt, wo Canarying als teilweise, zeitlich begrenzte Bereitstellung einer Änderung
und ihre Bewertung definiert ist [31].

| Phase | Was es ist | Was es beweist | Rollback-Kriterium (vor Phasenbeginn festgelegt) | Evidenz |
|---|---|---|---|---|
| **Shadow** | Das neue System sieht Live-Eingaben; seine Ausgaben werden nicht verwendet | Verhalten bei echtem Traffic ohne Exposition | Uneinigkeit mit dem Incumbent oder mit menschlichen Entscheidungen über einem Schwellenwert | Gepaarte Ausgaben; Uneinigkeitsprotokoll |
| **Pilot** | Eine kleine, informierte Benutzergruppe | Benutzerfreundlichkeit; Überwachung funktioniert; die Belegschaft ist bereit | Override-Rate oder Beschwerderate über einem Schwellenwert | Pilot-Bericht; Feedback-Protokoll |
| **Canary** | Ein kleiner Anteil des Production-Traffic, verglichen mit einer Kontrollgruppe [31] | Keine Regression in der Skalierung | Jeder Floor gegen die Kontrolle verletzt | Pro-Metrik-Canary-Analyse |
| **Blue-Green** | Zwei Production-Umgebungen; Traffic wechselt zwischen ihnen [32] | Ein getesteter, sofortiger Weg zurück | Jedes Severity-1-Event | Switch-Events |
| **Feature Flags** | Runtime-Toggles pro Kohorte, Region oder Funktion, einschließlich operativer Kill Switches [33] | Exposition ist ohne Deploy steuerbar | Pro Flag festgelegt | Flag-Änderungsprotokoll |
| **Versionsfixierung** | Das Register fixiert Modell-, Prompt-, Corpus- und Guardrail-Versionen | Was lief, ist bekannt | Eine unfixierte Änderung wird erkannt | Register-Diff |

Rollback-Kriterien müssen **vorregistriert** werden: in den
[Rollout-Plan](/patterns/staged-rollout-rollback-criteria) geschrieben, bevor die Phase beginnt, und
von der Pipeline bewertet, nicht von einem Meeting. Ein Kriterium, das erfunden wird, nachdem sich
die Metrik bewegt hat, ist eine Verhandlung, keine Kontrolle. Dasselbe gilt für Änderungen, die Sie
nicht vorgenommen haben: Eine neue Vendor-Modellversion ist ein Release, und sie durchläuft Shadow
und Canary auf Ihrer Seite gegen die fixierte Version, bevor sie Traffic nimmt. Der Tools-Katalog
listet [Progressive-Delivery-Tools](/resources/tools#cat-progressive-delivery) als illustrative
Beispiele, keine Empfehlungen.

## Betrieb des Systems

### Policies bei Go-Live

Das System geht live mit den Policies, die seine Nutzung steuerbar machen. Eine
**Acceptable-Use-Policy** für Mitarbeiter und Kunden, aus dem negativen Raum gezogen.
**Rollenbasierte Schulung**: wofür das System ist, die Einschränkungen, die seine Betriebsanleitung
erklärt [18], wann es zu überschreiben ist und wie man ein Problem meldet, mit Abschluss als
Zugangsvoraussetzung. **Interface-Hilfen**, die das Urteil unterstützen, anstatt es zu ersetzen:
Quellen angezeigt, Vertrauen, wo es sinnvoll ist, und ein sichtbarer Weg, eine Person zu erreichen.
Dies ist die praktische Form der Artikel-26-Pflichten, das System wie angewiesen zu nutzen und
Überwachung an kompetente Menschen mit Autorität zu geben [1], und der verantwortungsvollen
Nutzungskontrollen in ISO/IEC 42001 Annex A.9 [28]. Überwachung selbst wird wie in
[Designing Human Oversight](/bok/the-stack#designing-human-oversight-article-14) entworfen.

### Datenverwaltung zur Inferenzzeit

Live-Eingaben sind Datenverarbeitung, und ein bereitgestelltes System erstellt mit jeder Anfrage
neue Daten: Prompts, abgerufene Passagen, Ausgaben, Protokolle und Feedback. Verwalten Sie sie wie
Trainingsdaten (siehe
[Datenverwaltung über den Stack](/bok/the-stack#data-governance-across-the-stack)):

- **Minimieren** Sie, was das Modell erreicht, mit PII-Filterung und Datenverlustprävention im
  Input-[Guardrail](/patterns/runtime-guardrail).
- **Legen Sie Aufbewahrung pro Datentyp** als Code fest, wobei Sie die Log-Aufbewahrungsuntergrenze
  unten mit der Speicherbegrenzungsobergrenze des Datenschutzrechts abstimmen.
- **Überprüfen Sie die Rechtsgrundlage erneut**, wenn sich der Zweck ändert; eine neue Nutzung alter
  Protokolle ist ein neuer Verarbeitungszweck.
- **Kartieren Sie Transfers**, wenn Inferenz, Speicherung oder Support in einer anderen
  Gerichtsbarkeit laufen; Kapitel 19 behandelt
  [Remote Inference als Transfer](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
- **Planen Sie für [Anfragen von Datensubjekten](/patterns/rights-requests-against-models)**, die
  Prompts, Protokolle, Abruf-Corpora und Fine-Tuned-Gewichte erreichen. Das Löschen eines
  Datensatzes aus einem Corpus ist ein Löschen; das Entfernen seines Einflusses aus abgestimmten
  Gewichten kann Umschulung bedeuten, daher entscheiden Sie, bevor Sie auf persönliche Daten
  abstimmen. Betreiber von Hochrisiko-Systemen nutzen die Informationen des Providers, um ihre DPIA
  durchzuführen [1]; [Kapitel 19](/bok/privacy-and-ai#the-dpia-for-ai-systems) behandelt die
  Datenschutzseite ausführlich.

### Wartungskalender und Umschulungs-Governance

Die Betriebsanleitung des Providers gibt die erwartete Lebensdauer des Systems und die Wartung an,
die es benötigt, einschließlich wie oft [18]. Der Kalender des Betreibers beginnt dort und fügt
seinen eigenen hinzu:

| Kadenz | Aktivität | Artefakt | Schicht |
|---|---|---|---|
| Kontinuierlich | Drift-, Fairness-, Qualitäts-, Kosten- und Energiesignale gegen Schwellenwerte | Überwachungstelemetrie | 4 · 5 |
| Wöchentlich | Probleme und Beinahe-Unfälle triage; Override- und Beschwerde-Trends überprüfen | Problem-Protokoll | 5 |
| Monatlich | Mitteilungen über Anbieterausfälle, Änderungen bei Unterauftragsverarbeitern, SLA-Berichte | Prüfprotokoll von Drittanbietern | 2 · 5 |
| Vierteljährlich | Schwellenwertprüfung; Red Team auf aktuellen Versionen; Aktualisierung von Karten und Register | Aktualisierte Karten; Red-Team-Ergebnisse | 2 · 3 |
| Jährlich (oder pro Risikostufe) | Neubewertung der Auswirkungen; Überprüfung des Nutzens; Aktualisierung von Lizenzen und Abhängigkeiten; Deaktivierungsübung | Neubewertung; Übungsprotokoll | 1 · 2 · 4 |
| Bei einem Ereignis | Neue Population, Gerichtsbarkeit, Autonomiestufe oder Anbieterversion; ein Vorfall | Protokoll zur Auslösung der Neubewertung | 1 · 2 |

**Retraining-Governance** beruht auf einer Regel: ein Retraining, ein Fine-Tuning, eine
Prompt-Änderung, eine Corpus-Aktualisierung und ein Modellupdate des Anbieters sind alle Releases.
Jedes durchläuft das Eval Gate und die Phasen der progressiven Bereitstellung, und jedes erhöht die
Version im Register. Eine Schwellenwertänderung ist eine Änderung an einem Control, daher ist es ein
überprüfter Diff mit einem Genehmiger, nicht eine Bearbeitung auf einem Dashboard. Retraining wird
durch einen Drift oder eine Unterschreitung des Schwellenwerts, durch den Kalender oder durch eine
Änderung in der Welt, die der DDR beschreibt, ausgelöst. Der Werkzeugkatalog listet
[Monitoring-Tools](/resources/tools#cat-monitoring) als illustrative Beispiele auf, nicht als
Empfehlungen.

### Drift: was sich ändert und wie man es sieht

Concept Drift ist eine unvorhersehbare Änderung in der Verteilung der Daten, die ein Modell im Laufe
der Zeit sieht, und die Forschung dazu teilt die Arbeit in Erkennung, Verständnis und Anpassung
[34]. In der Produktion hilft es, zu benennen, was sich geändert hat:

| Drift | Was sich ändert | Beispiel (illustrativ) | Wie man es erkennt |
|---|---|---|---|
| **Daten (Kovariate)** | Die Eingabeverteilung | Eine neue Produktlinie ändert die Fragen, die Kunden stellen | Population Stability Index oder ein Kolmogorov-Smirnov-Test auf Features oder Embeddings gegen ein Referenzfenster |
| **Label (Prior)** | Die Basisrate des Ergebnisses | Die Betrugshäufigkeit steigt in einer Saison | Vorhergesagte gegen beobachtete positive Rate |
| **Konzept** | Die Beziehung zwischen Eingabe und Ergebnis | Gleiche Symptome, neue Behandlungsleitlinien | Leistung auf neuen Labels; Änderungspunkterkennung auf der Fehlerrate |
| **Pipeline** | Ein vorgelagertes Feature, Schema oder Abrufschritt | Eine Schemaänderung leert ein Feld | Datenverträge; Null-Rate- und Aktualitätsmonitore |
| **Anbietermodell** | Das Modell hinter der API | Der Anbieter versendet eine neue Version | Versions-Pin-Prüfung; Canary gegen die angeheftete Baseline |
| **Nutzung** | Wer das System nutzt und wofür | Mitarbeiter beginnen, den Assistenten für HR-Fragen zu nutzen | Themenklassifizierung des Datenverkehrs gegen den negativen Raum |

Labels kommen oft spät oder gar nicht an. Für klassische Modelle kombinieren Sie
Eingabe-Drift-Statistiken mit einer verzögerten Leistungsprüfung, wenn Labels eintreffen; für
generative Systeme samplen Sie Ausgaben für Groundedness-Scoring und menschliche Überprüfung. Jedes
[Drift-Signal](/patterns/drift-fairness-monitor) benötigt einen Schwellenwert, einen Eigentümer und
eine definierte Konsequenz: ein Issue, ein Retraining, ein degradierter Modus oder ein Vorfall.

### Fairness und Qualität in der Produktion

Ein System, das seine [Fairness-Evals](/patterns/fairness-eval-suite) bei Go-Live bestanden hat,
kann ohne Codeänderung in Unfairness abdriften. Überwachen Sie Fehlerraten pro Gruppe gegen die
Pro-Gruppen-Schwellenwerte im DDR, Beschwerde- und Berufungsraten nach Gruppe und für generative
Systeme Groundedness- und Ablehnungsraten nach Thema und Sprache. Wenn das Gesetz eine regelmäßige
Bias-Audit verlangt (New Yorks Local Law 144 verlangt beispielsweise eine Bias-Audit innerhalb eines
Jahres vor der Verwendung eines automatisierten Entscheidungswerkzeugs für Beschäftigung und eine
öffentliche Zusammenfassung ihrer Ergebnisse [35]), ist die Produktionstelemetrie das, was die Audit
kostengünstig macht.
[Kapitel 16](/bok/fairness-and-explainability#monitoring-fairness-in-production) behandelt die
Metriken; der Punkt hier ist, dass sie kontinuierlich laufen und denselben Schwellenwert-, Issue-
und Incident-Pfad wie jedes andere Signal speisen.

### Wer das Signal besitzt

| Signal | Überwacht (verantwortlich) | Entscheidet (rechenschaftspflichtig) | Konsultiert | Informiert | Eskaliert zu |
|---|---|---|---|---|---|
| Leistung und Drift | ML-Plattform On-Call | Systemeigentümer | AI-Governance-Ingenieur | Risk | Go-Live-Panel bei Schwellenwertunterschreitung |
| Fairness | AI-Governance-Ingenieur | Systemeigentümer | Recht; Vertreter betroffener Gruppen | DPO | Risikoausschuss |
| Sicherheit und Missbrauch | Sicherheitsbetrieb | Sicherheitsleiter | AI-Governance-Ingenieur | Systemeigentümer | [Incident Pipeline](/patterns/incident-pipeline) |
| Compliance-Verpflichtungen | AI-Governance-Ingenieur | Compliance-Leiter | Recht | Regulatorische Verbindung | Incident Pipeline; Kommunikationsverantwortlicher |
| Kosten, Energie und Nutzen | FinOps | Geschäftsinhaber | Nachhaltigkeitsleiter | Finanzen | Nutzenüberprüfung |

Die Regel ist die aus [Kapitel 06](/bok/the-role#runtime-monitoring-and-incidents): Sie besitzen ein
Signal, wenn Sie dafür angerufen werden können. Ein kritisches System benötigt Abdeckung für jede
Stunde, in der es läuft, und ein Signal ohne Eigentümer ist ein Signal, auf das niemand reagiert.

### Überwachung von Drittanbietern während des Betriebs

Ein beschafftes System ändert sich nach Vertragsunterzeichnung weiter. Dokumentieren Sie jede
Änderungs- und Deprecation-Mitteilung gegen den Registry-Eintrag, lesen Sie die SLA-Berichte,
erstellen Sie einen Snapshot der Unterauftragsverarbeiter-Liste und öffnen Sie das
Due-Diligence-Gate bei Erneuerung erneut. Halten Sie ein alternatives Modell warm in der
Eval-Harness, damit eine erzwungene Migration von Evidenz aus beginnt, nicht von Null. Das NIST AI
RMF fordert genau dies: Drittanbieterrisiken und -vorteile werden regelmäßig überwacht, und
vortrainierte Modelle werden als Teil der eigenen Wartung des Systems überwacht [30]. Der
[Operate-Schritt des Due-Diligence-Gate](/patterns/vendor-model-due-diligence-gate#operate-change-notices-reassessment-and-fallback)
macht dies zu einem Runbook.

### Wenn der Anbieter ausfällt: Kontinuität

Planen Sie für den Ausfall des Lieferanten in jeder Weise, wie er ausfallen kann: ein Ausfall, eine
Ratenbegrenzung bei Spitzenlast, ein Qualitätsabfall, ein zurückgezogenes Modell, eine erzwungene
Deprecation oder ein kommerzieller oder rechtlicher Ausstieg. Die Fallbacks sind ein manueller
Prozess, den Mitarbeiter geübt haben, ein alternatives Modell hinter derselben Schnittstelle,
zwischengespeicherte oder vorlagenbasierte Antworten und die unten beschriebenen degradierten Modi.
Die Wiederherstellung benötigt ihre eigene Evidenz: Sichern Sie den Corpus-Snapshot und die
Embeddings, oder wissen Sie, dass Sie den Index neu erstellen können; halten Sie die Prompts und
Guardrail-Konfigurationen unter Versionskontrolle; und testen Sie den Wechsel. Das NIST AI RMF
fordert Kontingenzbetriebsabläufe für Ausfälle in Drittanbieter-KI-Systemen, die als Hochrisiko
eingestuft werden [29].

Einige Sektoren machen dies zur rechtlichen Pflicht. Finanzunternehmen unter DORA, in Anwendung
seit 17. Januar 2025 [36], müssen ein Register mit Informationen über alle Vertragsvereinbarungen
für ICT-Dienste von Drittanbieter-Providern führen und müssen Ausstiegsstrategien für ICT-Dienste
haben, die kritische oder wichtige Funktionen unterstützen [37]. Ein KI-Modell, das als Dienst
erreichbar ist, wird wahrscheinlich als ICT-Dienst für diesen Zweck zählen (überprüfen Sie für Ihren
Fall). Unternehmen im Geltungsbereich von NIS2 müssen Maßnahmen für Geschäftskontinuität ergreifen,
einschließlich Backup-Verwaltung und Disaster Recovery, sowie für Supply-Chain-Sicherheit [38]; ob
Sie im Geltungsbereich sind, hängt von Ihrem Sektor und Ihrer Größe ab (überprüfen Sie).

### Nutzenrealisierung

Verfolgen Sie das Ziel im DDR gegen das, was das System liefert, einschließlich seiner Inferenz- und
Betriebskosten. Unterlieferung ist ein Governance-Signal, nicht nur ein geschäftliches: Ein System,
das mehr kostet zu betreiben und zu steuern als es zurückgibt, ist ein Kandidat für Neuausrichtung
oder Stilllegung, und die Nutzenüberprüfung ist, wo dies auf Basis von Evidenz entschieden wird. Ein
Register von Live-Systemen ohne gemessenen Nutzen ist ein Bestand an unbepreistem Risiko.

### Berichterstattung zum Energieverbrauch

Messen Sie Energie pro Anfrage und insgesamt, mit angegebener Grenze: Beschleuniger, Host-Systeme,
Leerlaufkapazität und Rechenzentrum-Overhead [12]. Auf Ihrer eigenen Hardware messen Sie es; auf der
eines Providers fragen Sie danach im Vertrag und dokumentieren Sie, was Sie erhalten haben.
Konvertieren Sie zu Kohlenstoff mit der Netzintensität der Region, die den Datenverkehr bedient,
berichten Sie es neben den Kosten in der Nutzenüberprüfung und lassen Sie es die nächste Modellwahl
informieren: wenn ein kleineres Modell die Auswahleval besteht, ist der Energieunterschied ein
Grund, es zu bevorzugen [11].

### Aufbewahrung von Aufzeichnungen

| Datensatz | Aufbewahrt von | Minimum | Quelle |
|---|---|---|---|
| Protokolle, die automatisch von einem Hochrisiko-KI-System generiert werden, soweit unter der Kontrolle des Betreibers | Betreiber | Mindestens sechs Monate, sofern nicht anderes Recht etwas anderes vorsieht | `Art. 26(6)` [1] |
| Dieselben Protokolle, unter der Kontrolle des Providers | Anbieter | Mindestens sechs Monate | `Art. 19(1)` [39] |
| Technische und Qualitätsmanagemententation, Konformitätserklärung | Anbieter | 10 Jahre nach Inverkehrbringen | `Art. 18(1)` [40] |
| DDR, Go-Live-Entscheidung, Bedingungen und Dissens | Betreiber | Die Lebensdauer des Systems plus die Verjährungsfrist, die der Rechtsberater festlegt | Praxis |
| Operator-Protokolle unter Chinas freiwilligem TC260-Framework 3.0 | Operator | Mindestens sechs Monate, mit Audit | §5.3 [41] |

Aufbewahrung ist ein Control, daher ist es Code: ein Zeitplan pro Datensatztyp, manipulationssichere
Speicherung für Protokolle, eine rechtliche Sperre, die Löschung außer Kraft setzt, und
Archivformate, die jemand in 10 Jahren noch lesen kann. Der Sechsmonats-Schwellenwert für Protokolle
ist ein Minimum; Datenschutzrecht setzt eine Obergrenze für die persönlichen Daten darin, und die
beiden werden pro Datentyp abgestimmt, nicht durch Aufbewahrung von allem.

## Periodische Assurance

### Ein Audit-Programm, keine Audit

Eine einzelne Audit ist ein Snapshot. Ein Audit-Programm hat eine Charta, einen risikobasierten
Rhythmus, der an die Risikostufe gebunden ist, und Unabhängigkeit proportional zu den Einsätzen:
Second-Line-Überprüfung, interne Audit oder ein externer Assessor (siehe
[wie dies sich auf Zertifizierung bezieht](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments)).
Gute Programme führen erneut durch, anstatt zu lesen: Der Auditor führt eine Fairness-Prüfung erneut
durch oder spielt ein Sample von Protokollen ab, anstatt den Bericht zu akzeptieren, der sagt, dass
es getan wurde. Jeder Befund erhält einen Eigentümer, ein Datum und einen Abschlussprüfung, und die
offenen Befunde sind eine Live-Abfrage, nicht eine Tabelle.

### Red Teaming nach Plan

Planen Sie Red Teaming nach Risikostufe, und richten Sie es auf die bereitgestellte Konfiguration
(Prompts, Tools, Abruf-Corpus, Guardrails), nicht nur auf das Modell. Für ein beschafftes System
testen Sie an der Grenze innerhalb der Fenster, die der Vertrag erlaubt. Das
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite)-Muster macht jeden Befund zu
einem Regressiontest, daher beweist der nächste geplante Durchlauf, dass die Reparatur hielt.

### Threat Modelling des bereitgestellten Systems

Zerlegen Sie die Datenflüsse (Benutzer, Anwendung, Abruf, Modell, Tools, nachgelagerte Verbraucher),
dann zählen Sie Bedrohungen pro Element mit einer klassischen Kategorie-Checkliste wie STRIDE auf,
erweitert um die KI-spezifischen Angriffe, die NISTs Taxonomie für gegnerisches maschinelles Lernen
[23], MITRE ATLAS [24] und die OWASP Top 10 für Agentic Applications [42] katalogisieren. Die
Ausgabe, die zählt, ist die Zuordnung von Bedrohung zu Mitigation zu dem Test, der beweist, dass die
Mitigation funktioniert:

| Bedrohung | Wo sie eintritt | Mitigation | Der Test, der es beweist |
|---|---|---|---|
| Indirekte Prompt-Injection | Abgerufene Dokumente, Tool-Ausgaben | Input-Guardrail; enger Tool-Umfang | Red-Team-Fälle mit gepflanzten Anweisungen |
| Abruf-Vergiftung | Corpus-Aufnahme | Quellen-Allowlist; Herkunft im AIBOM | Canary-Dokumente, die niemals abgerufen werden dürfen |
| Modellextraktion | Inference-API | Ratenbegrenzungen; Abfragemuster-Erkennung | Extraktionssonde gegen die Grenzen |
| Membership Inference, Inversion | Ein Modell, das auf persönliche Daten abgestimmt ist | Minimieren Sie persönliche Daten beim Tuning; Ausgabefilterung | Privacy-Attack-Suite auf dem abgestimmten Modell |
| Manipulierte Gewichte | Supply Chain | [Hash- und Signaturverifizierung](/patterns/model-artefact-integrity) | Die Pipeline schlägt bei Hash-Nichtübereinstimmung fehl |
| Tool-Missbrauch | Agent-Aktionen | Scoped Credentials; menschliches Gate bei Aktionen mit hohen Konsequenzen | Umfang und [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)-Tests |

Die [Threat Bridge](/resources/threats) der Website ordnet diese Bedrohungen den Mustern zu, die sie
kontrollieren.

## Sekundäre Nutzung und nachgelagerter Schaden

Systeme werden für mehr verwendet, als sie genehmigt wurden. Die KI-Verordnung benennt das Konzept:
**vernünftigerweise vorhersehbare Fehlanwendung** ist eine Nutzung, die nicht der Zweckbestimmung
entspricht, aber aus vernünftigerweise vorhersehbarem menschlichem Verhalten oder der Interaktion
mit anderen Systemen resultieren kann [2]. Darum herum liegen **Function Creep** (die schrittweise
Ausweitung eines Systems auf Zwecke, die niemand genehmigt hat), **Dual Use** (dieselbe Fähigkeit
für einen schädlichen Zweck), **nachgelagerter Schaden** (Ausgaben, die andere Systeme speisen, die
darauf einwirken), **Feedback-Schleifen** (Ausgaben, die die Daten prägen, aus denen die nächste
Version lernt, etwa wenn ein Risikoscore entscheidet, wer überprüft wird, und so entscheidet, welche
Fälle gekennzeichnet werden) und **synthetisches Recycling** (generierte Ausgaben, die als
Trainingsdaten wiederverwendet werden).

Prognostizieren Sie diese vor dem Go-Live mit drei kostengünstigen Techniken. Ein **Premortem**:
Nehmen Sie an, es ist ein Jahr später und das System hat Schaden verursacht, schreiben Sie dann auf,
wie. **Missbrauchsfälle**: Missbrauchsgeschichten, die neben den Benutzergeschichten geschrieben
werden, von Personen, die dafür bezahlt werden, wie der Angreifer zu denken.
**Stakeholder-Impact-Mapping**: jede Gruppe, die die Ausgaben erreichen, einschließlich derjenigen,
die die Schnittstelle nie berühren.

Geben Sie den Antworten dann ein Zuhause, das dieses Kapitel
**[Downstream Use Register](/patterns/downstream-use-register)** nennt: beabsichtigte und verbotene
Nutzungen, die als [Policy Card](/patterns/policy-card) geschrieben sind; jeder Verbraucher der
Ausgaben (Systeme, Teams, Partner) gegen den Registereintrag erfasst; Herkunft und Vorbehalte auf
Ausgaben gestempelt, damit ein Verbraucher weiß, was er verwendet; und ein erneuter Test, wenn
Ausgaben in einem neuen Kontext verwendet werden. Zur Laufzeit ist die Nutzung außerhalb des Zwecks
ein Signal wie jedes andere: klassifizieren Sie den Datenverkehr gegen den negativen Raum und warnen
Sie vor dem, was außerhalb liegt. Verbrauchergerichtete Bereitstellungen fügen eine weitere Frage
hinzu, ob Kinder oder andere gefährdete Personen das System verwenden werden, mit Altersbestätigung
und dem Verbot in Artikel 5, Anfälligkeit auszunutzen, als die zu berücksichtigenden Kontrollen [6].

## Externe Kommunikation

Jedes bereitgestellte System benötigt einen Plan für die Kommunikation mit Personen außerhalb der
Organisation, der vor Bedarf geschrieben wird. Der Plan benennt einen Eigentümer und eine einzige
Stimme, einen Genehmigungsworkflow und eine einzige Quelle der Wahrheit: eine Transparenzseite und
eine verständliche System Card
[generiert aus der Registry](/patterns/disclosure-notification-pipeline), damit das, was Sie
öffentlich sagen, nicht von dem abweichen kann, was läuft. Vorlagen werden wie Code versioniert. Das
NIST AI RMF verlangt, dass Vorfälle und Fehler an relevante KI-Akteure, einschließlich betroffener
Gemeinschaften, kommuniziert werden [30].

| Zielgruppe | Proaktiv | Reaktiver Auslöser | Uhr | Vorlage |
|---|---|---|---|---|
| Marktüberwachungsbehörde | Registrierung, falls erforderlich (öffentliche Behörden-Betreiber) [1] | Grund zu der Annahme, dass das System ein Risiko darstellt: informieren Sie den Anbieter oder Händler und die Behörde, und unterbrechen Sie die Nutzung [1] | Ohne unangemessene Verzögerung | Vorausgefüllte Risikomitteilung |
| Anbieter, dann Behörde | Keine | Ein schwerwiegender Vorfall: informieren Sie zuerst den Anbieter, dann den Einführer oder Händler und die Behörden [1] | Sofort; die eigenen Meldungsfristen des Anbieters folgen (siehe [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) | Mitteilung über schwerwiegenden Vorfall |
| Datenschutzbehörde | DSFA, falls erforderlich | Eine Verletzung des Schutzes personenbezogener Daten | Innerhalb von 72 Stunden, soweit machbar [43] | Benachrichtigung über Datenschutzverletzung |
| Benutzer und betroffene Personen | KI-Offenlegung [5]; Mitteilung an Personen, die Annex-III-Entscheidungen unterliegen [1]; Erklärung auf Anfrage [7] | Eine Verletzung, die für sie ein hohes Risiko darstellt [44]; eine wesentliche Änderung; eine Korrektur | Ohne unangemessene Verzögerung | Mitteilungen; Korrekturmitteilung |
| Arbeitnehmer und ihre Vertreter | Information vor der Nutzung bei der Arbeit [1] | Eine Änderung des Umfangs | Vor der Nutzung | Briefing-Paket |
| Geschäftskunden und Partner | Änderungsprotokoll; Model Card und AIBOM-Updates | Ein Vorfall, der sie betrifft; eine Einstellung | Wie der Vertrag es vorsieht | Kundenmitteilung |
| Medien und Öffentlichkeit | Transparenzseite; System Card | Ein Vorfall mit öffentlicher Auswirkung | Erste Stellungnahme, Fakten wie bestätigt | Stellungnahme; Fragen und Antworten |

Eine **Stellungnahme** wird im Skelett vor jedem Vorfall vorbereitet: was passiert ist, nur soweit
es bekannt ist; was getan wurde, um es einzudämmen; was betroffene Personen tun sollten; und wann
das nächste Update kommt. Es spekuliert nie über die Ursache. Die Vorfallseite der Kommunikation
wird in [Kapitel 17](/bok/incidents#the-response-lifecycle) entwickelt. Bei der Stilllegung sendet
derselbe Plan die Sunset-Mitteilungen. Und messen Sie den Plan: ob Mitteilungen die Personen
erreichten, für die sie bestimmt waren, und was das Beschwerdevolumen danach tat.

## Deaktivierung, Herabstufung, Lokalisierung und Stilllegung

### Eine Deaktivierungsrichtlinie, die jemand ausführen kann

Eine [Deaktivierungsrichtlinie](/patterns/deactivation-localisation-retirement-runbook) benennt ihre
Auslöser, ihre Entscheidungsbefugnis, den Datensatz, den jede Entscheidung hinterlässt, wie
Nachweise bewahrt werden, und die Kriterien für einen sicheren Neustart. Auslöser gibt es in zwei
Arten. Schwellenwertauslöser: ein Boden durchbrochen und nicht innerhalb eines festgelegten Fensters
wiederhergestellt, eine Fairness-Lücke über ihrem Limit, eine Vorfallschwere. Rechtliche Auslöser:
die eigene Pflicht des Betreibers, die Nutzung auszusetzen, wenn er Grund zu der Annahme hat, dass
das System ein Risiko darstellt [1]; eine Korrekturmaßnahme des Anbieters zum Rückzug, zur
Deaktivierung oder zum Rückruf eines nicht konformen Systems [45]; Maßnahmen durch eine Behörde
gegen ein KI-System, das ein Risiko für Gesundheit, Sicherheit oder Grundrechte darstellt [46]; und
eine neu verbotene Praxis. Das NIST AI RMF verlangt Mechanismen mit zugewiesenen
Verantwortlichkeiten, um Systeme zu ersetzen, zu trennen oder zu deaktivieren, deren Leistung oder
Ergebnisse nicht mit der beabsichtigten Nutzung übereinstimmen [30].

Die Bewahrung von Nachweisen kommt zuerst: Protokolle einfrieren, eine rechtliche Sperre anwenden,
Versionen fotografieren. Dann stoppen. Die Deaktivierung gilt für jede Art von System, nicht nur für
Agenten: ein in ein Herstellerprodukt eingebetteter Klassifizierer benötigt auch einen Schalter, ob
ein Feature-Flag oder ein Fallback-Pfad. Für Agenten gilt das
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)-Muster, und
[Kapitel 23](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers) entwickelt es.

### Abgestufte Herabstufung

Ausschalten ist der letzte Ausweg, nicht der einzige. Bauen Sie die Zwischenmodi im Voraus als
operative Umschalter [33]} und testen Sie sie:

| Modus | Was sich ändert | Verwenden Sie es, wenn |
|---|---|---|
| **Nur Beratung** | Die Ausgabe geht an eine Person; das System handelt oder entscheidet niemals allein | Zweifel an Genauigkeit oder Fairness; die Aktion ist das, was Risiko trägt |
| **Erhöhte Schwellenwerte** | Das System verzichtet unterhalb eines höheren Vertrauens und leitet an eine Person weiter | Drift erkannt; Etiketten ausstehend |
| **Nur verankert** | Antwortet nur mit einer abgerufenen Quelle; andernfalls weigert es sich | Halluzinationsrate steigt |
| **Bereich deaktiviert** | Deaktiviert für eine Gruppe, Sprache, Region oder Funktion | Schaden konzentriert sich auf ein Segment |
| **Zurück zum Pilot** | Die Exposition kehrt zur Pilot-Kohorte zurück | Breite Regression mit unbekannter Ursache |
| **Aus** | Der Fallback-Prozess übernimmt | Rechtlicher Auslöser; schwerer Schaden |

### Lokalisierung nach Gerichtsbarkeit

Starten Sie nur dort, wo Compliance nachgewiesen wurde, und behalten Sie die Gerichtsbarkeit als
Richtlinieneingabe bei, anstatt sie als Bereitstellungsunfall zu behandeln:
pro-Gerichtsbarkeits-Regelsätze als Code, regionale Instanzen, wo Residenzanforderungen sie
erfordern, und Feature-Flags nach Region, damit ein Markt ausgeschaltet werden kann, ohne die
anderen zu berühren. Verpflichtungen überlappen sich an Orten (die sechsmonatige
Protokoll-Untergrenze der KI-Verordnung und die sechsmonatige Betreiber-Protokoll-Aufbewahrung in
Chinas freiwilligem TC260-Framework [1][41]) und divergieren an vielen anderen Orten; siehe
[Kapitel 21](/bok/ai-laws-worldwide#comparing-the-regimes) und die
[Regulatorische Karte](/bok/regulatory-map#other-jurisdictions).

### Stilllegung und Außerbetriebnahme

Entwerfen Sie die Stilllegung von Anfang an: die DDR benennt bereits die Bedingungen, unter denen
das System stillgelegt wird. Auslöser umfassen einen Leistungsmangel, eine Herstellerdeprecation,
einen Ersatz und ein rechtliches Ereignis. Das NIST AI RMF warnt davor, dass unregelmäßige oder
wahllose Beendigung selbst das Risiko erhöhen kann [29], daher ist die Stilllegung ein Runbook,
keine Löschung:

1. **Abhängigkeitsanalyse.** Wer verbraucht die Ausgaben? Das
   [Downstream Use Register](/patterns/downstream-use-register) beantwortet es.
2. **Fallback und Übergang.** Benutzer wechseln zum Ersatz oder zum manuellen Prozess, mit Training.
3. **Sunset-Mitteilungen.** Kunden, Partner und betroffene Personen hören vor dem Datum, nicht
   danach.
4. **Endgültiger Nachweis-Snapshot.** Cards, Evals, Entscheidungen und Protokolle werden gemäß dem
   Aufbewahrungsplan archiviert.
5. **Archivieren oder entsorgen.** Gewichte, Korpora und Protokolle werden gemäß Lizenz,
   rechtmäßiger Grundlage und Aufbewahrung aufbewahrt oder vernichtet.
6. **Identitäten und Anmeldedaten widerrufen.** Jede nicht-menschliche Identität, die das System
   hielt, wird widerrufen.
7. **Registereintrag stilllegen, nicht löschen.** Sein Status lautet `retired`}, mit dem Datum und
   dem Entscheidungsdatensatz.
8. **Bestätigen Sie, dass es weg ist.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery)
   überprüft, dass keine Kopie noch läuft.

## Ein System von der Entscheidung bis zur Stilllegung

`csa-01`}, der Assistent, dem [Kapitel 04](/bok/the-stack#one-system-through-the-five-layers) durch
die fünf Schichten folgt, läuft auch durch dieses Kapitel. Die Artefakte, die es hinterlässt, alle
illustrativ:

| Phase | Artefakt | Schicht |
|---|---|---|
| Entscheiden | `ddr-csa-01-v1`}, mit seinem negativen Raum und Böden | 1 · 2 |
| Auswählen | Auswahl-Eval über drei Kandidaten; Energieschätzung pro 1.000 Anfragen | 3 |
| Vertrag | Klauselüberprüfung; Einstellung ohne Training wöchentlich zurückgelesen | 1 · 5 |
| Go-Live | Genehmigt mit zwei Bedingungen und einer Ablehnung | 1 · 5 |
| Ausrollen | Schatten, dann Kanarienvogel mit vorregistriertem Rollback auf Verankertheit | 4 |
| Betrieb | Nutzungs-Drift-Warnung zu HR-Themen; Herstellerversionswechsel bestandene Kanarienvogel | 4 · 5 |
| Assurance | Vierteljährliches Red Team; Erkenntnisse als Regressionstests geschlossen | 3 · 5 |
| Außerbetriebnahme | Stilllegungsbedingungen in der DDR; Runbook einmal pro Jahr durchgeführt | 2 · 4 |

**Zuordnung:** KI-Verordnung Art. 4, 5, 13, 25, 26, 27, 50, 86 · DSGVO Art. 33, 34, 35 · ISO/IEC
42001 Annex A.6.2.5, A.6.2.6, A.9, A.10 · NIST AI RMF (GOVERN 1.7, GOVERN 6, MANAGE 2.4, MANAGE 3,
MANAGE 4) · DORA Art. 28 · NIS2 Art. 21 · alle fünf Schichten. Zuordnungen sind illustrativ, keine
Konformitätserklärung.

## Was Sie diese Woche tun können

1. **Schreiben Sie die DDR für Ihr riskantestes Live-System**, rückwirkend, wenn nötig,
   einschließlich seines negativen Raums und Stilllegungsbedingungen, und verlinken Sie sie vom
   Registereintrag.
2. **Überprüfen Sie fünf Klauseln in Ihrem größten KI-Vertrag**: Nutzung Ihrer Daten zum Training,
   Änderungs- und Deprecation-Mitteilung, Vorfallmitteilung, Audit- und Evaluierungszugriff und
   Ausstieg. Datei jede Lücke als Risiko.
3. **Registrieren Sie die Rollback-Kriterien** für Ihren nächsten Modell-, Prompt- oder
   Herstellerversionswechsel vor, und verdrahten Sie eines davon als automatische
   Kanarienvogel-Prüfung.
4. **Vergleichen Sie die Protokollaufbewahrung** auf jedem Hochrisiko- oder wahrscheinlich
   Hochrisiko-System gegen die sechsmonatige Untergrenze und Ihre Datenschutzdecke.
5. **Bauen Sie einen herabgestuften Modus** (nur Beratung oder nur verankert) hinter einem Flag, und
   testen Sie, dass er funktioniert.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(4) relevant and representative input data; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months; 26(7) inform workers; 26(8) public-authority registration; 26(9) DPIA; 26(11) inform affected persons). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 definitions: (3) provider, (4) deployer, (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification. Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[3] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk rules from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27(1) (FRIA before first use by public bodies, private entities providing public services and deployers of Annex III points 5(b) and (c)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency obligations apply from 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(b) (prohibition on exploiting vulnerabilities due to age, disability or a specific social or economic situation; applies to placing on the market, putting into service and use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86(1) (right to a clear and meaningful explanation from the deployer of the role of an Annex III system in a decision, except point 2 systems). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4 replaced: providers and deployers support AI literacy; Art. 25(2) cooperation extended to technical documentation, known limitations and failure modes and targeted technical access; Art. 25(4) revised; Art. 26 unchanged; Art. 111(4) transitional period for Art. 50(2) marking to 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[9] "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k; accuracy drops of up to 8% against GSM8k; systematic overfitting in several model families) (arXiv 2405.00332). Zhang et al. 2024-05-01. https://arxiv.org/abs/2405.00332 (verified: primary)
[10] "The Leaderboard Illusion" (undisclosed private testing of multiple variants and score retraction on Chatbot Arena) (arXiv 2504.20879). Singh et al. 2025-04-29. https://arxiv.org/abs/2504.20879 (verified: primary)
[11] "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" (multi-purpose generative architectures orders of magnitude more expensive per inference than task-specific systems, controlling for parameters) (arXiv 2311.16863; FAccT '24). Luccioni, Jernite, Strubell. 2023-11-28. https://arxiv.org/abs/2311.16863 (verified: primary)
[12] "Measuring the environmental impact of delivering AI at Google Scale" (median Gemini Apps text prompt 0.24 Wh; boundary includes host energy, idle capacity and data-centre overhead) (arXiv 2508.15734). Elsworth et al., Google. 2025-08-21. https://arxiv.org/abs/2508.15734 (verified: primary)
[13] Energy and AI, executive summary (data-centre electricity 415 TWh in 2024, around 945 TWh by 2030). International Energy Agency. 2025-04. https://www.iea.org/reports/energy-and-ai/executive-summary (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex XI, Section 1, point 2(e) (GPAI technical documentation: known or estimated energy consumption of the model). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (value chain: 25(1)(a) name or trademark, (b) substantial modification, (c) changed intended purpose; 25(2) cooperation of the initial provider; 25(4) written agreement with third-party suppliers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[16] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; content approved 18 Jul 2025; paras. 67 to 68: a modified systemic-risk model is presumed to have systemic risk). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[17] Guidelines on obligations for general-purpose AI providers, FAQ (modifiers become providers only when the modification uses more than one third of the original model's training compute; obligations limited to documenting the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[18] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13(3) (instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance measures, including their frequency; log collection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[19] Apache License, Version 2.0 (section 3, grant of patent licence). Apache Software Foundation. 2004-01. https://www.apache.org/licenses/LICENSE-2.0 (verified: primary)
[20] GNU Affero General Public License v3 (section 13, remote network interaction). Free Software Foundation. 2007-11-19. https://www.gnu.org/licenses/agpl-3.0.html (verified: primary)
[21] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that must be adopted by redistributions and derivatives). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[22] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated by reference; "Built with Llama" attribution; "Llama" at the start of distributed derived model names; separate licence above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[23] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[24] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems. MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[25] Directive (EU) 2024/2853 on liability for defective products (software within the definition of product; transposition by 9 Dec 2026; applies to products placed on the market or put into service after that date). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[26] aiSure AI insurance (cover for losses from AI model errors, for AI vendors and corporate adopters). Munich Re. 2026. https://www.munichre.com/en/solutions/for-industry-clients/insure-ai.html (verified: primary)
[27] Updated EU AI model contractual clauses (MCC-AI high-risk and light versions, with commentary; update of the 2023 clauses). Community of Practice on Public Procurement of AI, Public Buyers Community (European Commission). 2025-03-05. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses (verified: primary)
[28] ISO/IEC 42001:2023, Annex A control titles (A.6.2.5 AI system deployment; A.6.2.6 operation and monitoring; A.9 use of AI systems; A.10 third-party and customer relationships), referenced by identifier only. ISO/IEC (titles checked via a secondary listing). 2023. https://www.iso.org/standard/42001 (verified: secondary)
[29] NIST AI RMF Playbook, GOVERN (1.7 decommissioning and phasing out safely; 6.1 third-party risk policies; 6.2 contingency for failures in high-risk third-party systems). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] NIST AI RMF Playbook, MANAGE (2.4 supersede, disengage or deactivate; 3.1 third-party risks monitored; 3.2 pre-trained models monitored; 4.1 post-deployment monitoring plans; 4.3 incidents communicated, including to affected communities). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[31] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[32] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[33] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[34] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[35] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[36] Digital Operational Resilience Act (DORA): in application since 17 Jan 2025; register of information; ICT third-party risk. EIOPA. 2025. https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en (verified: primary)
[37] Regulation (EU) 2022/2554 (DORA), Art. 28(3) register of information on ICT third-party arrangements and Art. 28(8) exit strategies for ICT services supporting critical or important functions. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng#art_28 (verified: primary)
[38] Directive (EU) 2022/2555 (NIS2), Art. 21(2)(c) business continuity, backup management, disaster recovery and crisis management, and (d) supply-chain security. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 19(1) (providers keep automatically generated logs for at least six months). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_19 (verified: primary)
[40] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 18(1) (providers keep documentation for 10 years after placing on the market or putting into service). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[41] AI Safety Governance Framework 3.0, §5.3 operators' guidelines (logs kept for at least six months and audited; voluntary). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[42] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[43] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33 (verified: primary)
[44] Regulation (EU) 2016/679 (GDPR), Art. 34(1) (communication of a breach likely to result in a high risk to the data subject without undue delay). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_34 (verified: primary)
[45] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 20(1) (providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_20 (verified: primary)
[46] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 79 (procedure for AI systems presenting a risk to health, safety or fundamental rights). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_79 (verified: primary)
