---
lang: de
source: bok/05-patterns.md
sourceHash: "75573567c87d6e935731d6d9eb10dd5b66d986b32073f533a761faaa51306dcb"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 05. Muster

> Ein Katalog wiederverwendbarer KI-Governance-Engineering-Muster, jedes benannt nach einer Schicht
> des Stack, in der CSIRO Responsible AI Pattern Catalogue-Struktur.

Dieses Kapitel ist der Katalog. Jedes Muster ist eine wiederverwendbare Lösung für ein Problem, das
wiederkehrt, wenn Sie die Governance von KI-Systemen konstruieren. Die Struktur folgt dem CSIRO
Responsible AI Pattern Catalogue, der Software-Engineering-Designmuster auf verantwortungsvolle KI
über Governance-, Prozess- und Produktebenen anwendet [1]. Wir behalten seine Felder
(Zusammenfassung, Ziele, Zielbenutzer, betroffene Stakeholder, relevante Prinzipien, Kontext,
Problem, Lösung, Konsequenzen, verwandte Muster) und fügen eine **Maps to**-Zeile hinzu, die die
Standards, Artikel und Stack-Schicht (1–5) benennt, die jedes Muster bedient.

Jedes Muster benennt eine der fünf Schichten ([Kapitel 04](/bok/the-stack)), damit der Katalog und
der Stack konsistent bleiben, und realisiert eines oder mehrere der sechs Prinzipien
([Kapitel 03](/bok/values-and-principles)): *bauen Sie die Kontrolle am frühesten Punkt auf, an dem
sie blockieren kann · geben Sie jeder Kontrolle Zähne · registrieren und begrenzen Sie jeden Akteur,
bevor er handelt · instrumentieren Sie den Build, um seinen eigenen Nachweis zu produzieren ·
beginnen Sie mit einem benannten Fehlermodus oder Schaden · machen Sie den geregelten Weg zum
einfachsten Weg*. Jede **Maps to**-Zeile zieht ihre Threat-IDs aus dem OWASP Top 10 for Agentic
Applications 2026 [2] und ihre Funktionsetiketten aus dem NIST AI RMF [3]; die entwicklungsseitigen
Muster benennen auch OWASP Top 10 for LLM Applications 2026 und MITRE ATLAS-IDs, jede auf ihrer
eigenen Seite beschafft. Jedes Muster trägt ein kurzes Beispiel mit der Bezeichnung
`(illustrative)`: eine plausible, de-identifizierte Skizze, keine Behauptung über ein benanntes
System. Zuordnungen zur KI-Verordnung der EU sind illustrativ, keine Konformitätsbehauptung, und ab
2026-09-24 wird keine harmonisierte Norm unter der Verordnung im Amtsblatt referenziert [4].

Auf der Website hat jedes Muster seine eigene Seite, aufgelistet nach Schicht unter
[/patterns](/patterns), mit dem vollständigen Text, seinem Diagramm und seinen eigenen nummerierten
Quellen; dieses Kapitel behält die Vorlage, die Musterkarte und unter jeder Musterüberschrift eine
kurze Zusammenfassung, die auf das vollständige Muster verlinkt. Die gedruckte Ausgabe trägt jedes
Muster vollständig in diesem Kapitel.

## Die Mustervorlage

Jede Musterseite verwendet dieselben Felder in dieser Reihenfolge und endet mit einer eigenen
**Quellen**-Liste.

| Feld | Was es beantwortet |
|---|---|
| Zusammenfassung | Was das Muster ist und wann es angewendet wird. |
| Ziele | Das Governance-Ergebnis, das das Muster erreicht. |
| Zielbenutzer | Wer es implementiert. |
| Betroffene Stakeholder | Wer davon betroffen ist. |
| Relevante Prinzipien | Welche der sechs Prinzipien es umsetzt. |
| Kontext | Die Situation, in der das Problem auftritt. |
| Problem | Die wirkenden Kräfte und der Ausfallmodus, wenn das Muster nicht angewendet wird. |
| Lösung | Wie man es aufbaut: die Artefakte, wo sie in der Pipeline sitzen, was wann läuft. |
| Konsequenzen | Vorteile und Kompromisse: Kosten, Latenz, falsch positive Ergebnisse, Wartung. |
| Verwandte Muster | Die Muster, von denen es abhängt oder die es speist. |
| Zuordnung zu | Die Standards, Artikel und Stack-Schichten, denen das Muster dient. |

Ein Muster ist keine Richtlinie. Jedes benennt das Artefakt, das ein Engineer ausliefert, den Punkt
im Lebenszyklus, an dem es läuft, und die Evidenz, die es hinterlässt, damit das Muster einen Build
fehlschlagen lassen oder eine Aktion blockieren kann, anstatt eine Absicht zu beschreiben, die ein
Mensch anwenden muss.

## Muster: Policy Card

Drücken Sie eine Governance-Regel als maschinenlesbares Kartenmaterial aus, das mit dem Modell oder
Agent reist, anstatt Prosa, die ein Mensch anwenden muss. Dieselbe Karte wird vor dem Merge, bei der
Bereitstellung und am Punkt der Aktion evaluiert, und jede Evaluierung gibt ein Urteil ab, sodass
eine Regeländerung ein überprüfbarer Diff ist und die Crosswalk aus den Karten generiert werden
kann.

Schicht 01 Governance-as-Code · [Lesen Sie das Policy Card-Muster](/patterns/policy-card)

## Muster: Eval Gate in CI

Verbinden Sie eine versionierte Eval-Suite mit CI, sodass ein Modell oder Agent einen dokumentierten
Schwellenwert überschreiten muss, der auf einen benannten Ausfallmodus oder eine Verpflichtung
zurückgeführt wird, bevor es ausgeliefert wird. Die Eval-Ausführung ist die Kontrolle und ihr
strukturiertes Ergebnis ist die Evidenz; eine fehlgeschlagene Eval blockiert den Build, anstatt
einen Befund einzureichen.

Schicht 03 Evals & Red Teaming als Nachweis ·
[Lesen Sie das Eval Gate in CI-Muster](/patterns/eval-gate-in-ci)

## Muster: Adversarial Red-Team Suite

Halten Sie eine versionierte adversarische Suite, die aus einer Bedrohungstaxonomie und nicht aus
Intuition aufgebaut ist, und führen Sie sie in CI oder nach einem Zeitplan gegen die registrierte
Version aus. Jeder Befund wird behoben oder akzeptiert und dokumentiert, als Evidenz eingereicht und
als Regressiontest zurückgeführt, sodass ein geschlossener Angriff geschlossen bleibt.

Schicht 03 Evals & Red Teaming als Nachweis ·
[Lesen Sie das Adversarial Red-Team Suite-Muster](/patterns/adversarial-red-team-suite)

## Muster: Agent Registry

Halten Sie ein laufzeitbewusstes Inventar jedes Modells, jedes Service und jedes Agenten, wobei
jeder Eintrag einen Besitzer, einen Umfang und ein Ablaufdatum trägt, geschrieben von der
Bereitstellungs-Pipeline anstatt von Hand eingegeben. Die Registrierung wird zur Voraussetzung für
die Produktion, und die Registry ist das Objekt, das Richtlinien evaluieren und Runtime-Kontrollen
anhängen.

Schicht 02 Inventar & Transparenz · [Lesen Sie das Agent Registry-Muster](/patterns/agent-registry)

## Muster: AIBOM

Geben Sie eine AI-Stückliste beim Build in einem Standardformat wie CycloneDX ML-BOM oder dem SPDX
3.0 AI-Profil aus, das Modelle, Datensätze, Gewichte und deren Herkunft und Lizenzen aufzeichnet.
Zusammen mit dem Registry-Eintrag gespeichert und bei jedem Build regeneriert, verwandelt es Fragen
zur Lieferkette und Transparenz in Abfragen.

Schicht 02 Inventar & Transparenz · [Lesen Sie das AIBOM-Muster](/patterns/aibom)

## Muster: Model Card as Control Evidence

Füllen Sie die Model Card und die Data Card aus der Pipeline (Eval-Ergebnisse, die Datensätze in der
AIBOM, bekannte Einschränkungen, der Besitzer) und regenerieren Sie sie bei jeder wesentlichen
Änderung. Eine Karte, die aus dem neu aufgebaut wird, was die Produktion hervorgebracht hat, ist
sowohl Dokumentation als auch Kontrollevidence; eine Karte, die einmal beim Start geschrieben wird,
verfällt zu Fiktion.

Schicht 02 Inventar & Transparenz ·
[Lesen Sie das Model Card as Control Evidence-Muster](/patterns/model-card-as-control-evidence)

## Muster: Continuous Assurance Telemetry

Lassen Sie jede Kontrolle einen Zeitstempel-versehenen, strukturierten Evidenzeintrag in einen
Assurance-Store schreiben, auf einem Schema, das auf der Registry-ID basiert. Der Status einer
Kontrolle wird zu einer Live-Abfrage über das, was das System ausgegeben hat, nicht zu einer
Bestätigung, dass es existierte, als jemand nachschaute.

Schicht 05 Assurance & kontinuierliche Compliance ·
[Lesen Sie das Continuous Assurance Telemetry-Muster](/patterns/continuous-assurance-telemetry)

## Muster: Runtime Guardrail

Überprüfen Sie Eingaben und Ausgaben auf dem Live-Request-Pfad mit Guardrails, die dieselbe Policy
Card durchsetzen, die CI evaluiert hat, und geben Sie bei jedem Aufruf ein Entscheidungsereignis
aus. Der Guardrail entscheidet einen Aufruf nach dem anderen; bei einem definierten Verstoß
signalisiert er den Circuit Breaker, der die Autonomie des Agenten im Ganzen entzieht.

Schicht 04 Runtime-Kontrollen & Observability ·
[Lesen Sie das Runtime Guardrail-Muster](/patterns/runtime-guardrail)

## Muster: Kill Switch / Circuit Breaker

Binden Sie jeden Agenten an seine eigene Identität und setzen Sie einen Circuit Breaker an der
Tool-Call-Grenze, der bei einem Schwellenwertverstoß, einer Anomalie oder einem manuellen Zug
auslöst. Die Sperrung trifft den Umfang eines Agenten, während die Flotte weiterläuft, und der
Schalter wird nach einem Zeitplan geübt, denn ein nicht getesteter Kill Switch ist keine Kontrolle.

Schicht 04 Runtime-Kontrollen & Observability ·
[Lesen Sie das Kill Switch / Circuit Breaker-Muster](/patterns/kill-switch-circuit-breaker)

## Muster: Incident Pipeline

Verbinden Sie die Runtime-Erkennung mit einem Triage-Workflow, der den Schweregrad klassifiziert und
bei einem meldepflichtigen Ereignis den Bericht entwirft und die gesetzliche Frist startet. Für
Hochrisiko-Systeme kodiert es die Berichterstattungs-Zeitpläne des EU-KI-Verordnung Artikel 73 und
den Artikel 72 Post-Market-Monitoring-Feed [5], und es hält den Incident-Datensatz als
maschinenlesbaren Nachweis.

Schicht 05 Assurance & kontinuierliche Compliance ·
[Lesen Sie das Incident Pipeline-Muster](/patterns/incident-pipeline)

## Muster: FRIA-as-Code

Templaten Sie die Grundrechte-Folgenabschätzung als strukturierte Daten, verknüpfen Sie jede
Minderung mit der Kontrolle, die sie implementiert, und kreuzen Sie die DSFA, sodass gemeinsame
Elemente einmal geschrieben werden. Die Bewertung wird mit dem Registry-Eintrag gespeichert und
erneut geöffnet, wenn sich das System wesentlich ändert.

Schicht 01 Governance-as-Code / Schicht 02 Inventar & Transparenz ·
[Lesen Sie das FRIA-as-Code-Muster](/patterns/fria-as-code)

## Muster: Framework Crosswalk

Generieren Sie die Zuordnung von Kontrollen zu Framework-Klauseln aus den Kontrollen selbst und
verwenden Sie sie, um Lücken zu finden und Kontrollen wiederzuverwenden. Jede Zelle muss sich zu
einer laufenden Kontrolle und ihrer Evidenz auflösen: eine Zuordnungszelle ohne dahinter liegende
Kontrolle wird gekennzeichnet, nicht gezählt, denn Abdeckung ist keine Kontrolle.

Schicht 01 Governance-as-Code / Schicht 05 Assurance & kontinuierliche Compliance ·
[Lesen Sie das Framework Crosswalk-Muster](/patterns/framework-crosswalk)

## Muster: Machine-Readable Evidence (OSCAL)

Geben Sie Kontrollergebnisse als OSCAL-Komponentendefinitions- und Bewertungsergebnis-Artefakte aus,
basierend auf den nativen Kontroll-, Implementierungs- und Bewertungsschichten vor jeder
KI-spezifischen Erweiterung. Evidenz wird abfragbar, vergleichbar und wiederverwendbar über Audits
hinweg, und der Screenshot hört auf, ein Evidenz-Artefakt zu sein.

Schicht 05 Assurance & kontinuierliche Compliance ·
[Lesen Sie das Machine-Readable Evidence (OSCAL)-Muster](/patterns/machine-readable-evidence-oscal)

## Muster: Agent Identity & Scoped Credentials

Geben Sie jedem Agenten eine unterschiedliche Workload-Identität mit einem deklarierten Umfang,
einem Besitzer und einem Ablaufdatum aus, das in der Agent Registry aufgezeichnet und vor dem
Handeln etabliert wird. Das Sichern des Kanals zu einem Tool-Server ist notwendig, ist aber nicht
die Identität des Agenten; die Identität ist das, was seine Aktionen zurechenbar und seinen Zugriff
widerrufbar macht.

Schicht 04 Runtime-Kontrollen & Observability ·
[Lesen Sie das Agent Identity & Scoped Credentials-Muster](/patterns/agent-identity-scoped-credentials)

## Muster: Human-in-the-loop Gate

Klassifizieren Sie die Aktionen eines Agenten nach Konsequenz und halten Sie die hochkonsequente
Klasse hinter einem benannten menschlichen Genehmiger mit ausreichend Kontext zum Entscheiden,
während die Routineklasse unter Guardrails autonom bleibt. Der Genehmiger, der Kontext und die
Entscheidung werden als Evidenz der Aufsicht am Punkt der Aktion protokolliert.

Schicht 04 Runtime-Kontrollen & Observability ·
[Lesen Sie das Human-in-the-loop Gate-Muster](/patterns/human-in-the-loop-gate)

## Muster: Shadow-AI Discovery

Scannen Sie die Orte, an denen KI auftritt (Identitätsanbieter, Cloud-Konten, Netzwerk-Egress,
Code-Repositories, SaaS-Integrationen), auf Modelle und Agenten, die keinen Registry-Eintrag haben.
Jeder Unbekannte wird als nicht beansprucht registriert und erhält einen Besitzer, um ihn zu
beanspruchen, oder wird eskaliert, sodass das Inventar gegen das konvergiert, was tatsächlich läuft.

Schicht 02 Inventar & Transparenz ·
[Lesen Sie das Shadow-AI Discovery-Muster](/patterns/shadow-ai-discovery)

## Muster: Vendor / Model Due-Diligence Gate

Gating gekaufte und nur API-basierte KI auf einer strukturierten Due-Diligence-Bewertung, bevor sie
in die Produktion geht: die Evaluierungen und Dokumentation des Anbieters, Datenflüsse, die Umfänge,
die Sie gewähren, Incident-Reporting-Verpflichtungen und Audit-Rechte. Wenn Sie eine Kontrolle nicht
überprüfen können, sagt der Datensatz dies und die Integration ist stattdessen begrenzt.

Schicht 02 Inventar & Transparenz / Schicht 05 Assurance & kontinuierliche Compliance ·
[Lesen Sie das Vendor / Model Due-Diligence Gate-Muster](/patterns/vendor-model-due-diligence-gate)

## Muster: Use-Case Intake & Risk Tiering

Leiten Sie jeden vorgeschlagenen KI-Anwendungsfall, gebaut oder gekauft, durch eine Intake, die
einen strukturierten Use-Case-Datensatz schreibt, ihn gegen verbotene Praktiken und die
EU-KI-Verordnung-Risikoleiter überprüft und ein internes Tier aus deklarierten Profilfeldern
berechnet. Das Tier schaltet die Bewertungen, Evals und Genehmigungen, die das System löschen muss,
und der Datensatz wird sein Registry-Eintrag.

Schicht 01 Governance-as-Code / Schicht 02 Inventar & Transparenz ·
[Lesen Sie das Use-Case Intake & Risk Tiering-Muster](/patterns/use-case-intake-risk-tiering)

## Muster: AI Threat Model

Threat-modellieren Sie jedes KI-System bei der Design-Überprüfung als versionierte Datendatei:
STRIDE pro Datenflusselement, erweitert mit den KI-spezifischen Angriffen, die MITRE ATLAS, NIST AI
100-2 und die OWASP-Listen katalogisieren. Jede Bedrohung über der Toleranz löst sich zu einer
Minderung und zu dem Test auf, der sie beweist, und die Design-Überprüfung schlägt fehl, während
eine nicht vorhanden ist.

Schicht 01 Governance-as-Code / Schicht 03 Evals & Red Teaming als Nachweis ·
[Lesen Sie das AI Threat Model-Muster](/patterns/ai-threat-model)

## Muster: Training-Data Rights Ledger

Halten Sie eine Ledger-Zeile pro Trainingsquelle: Akquisitionskanal, Lizenz oder Rechtsgrundlage,
die Rechtsreservierungsprüfung mit ihrer Methode und ihrem Datum und die zulässigen Verwendungen.
Mit Lineage verbunden, benennt das Ledger die Modelle, die jede Quelle trainiert hat, sodass ein
Widerruf, eine Löschanfrage oder eine Anordnung nur die betroffenen Modelle erreicht.

Schicht 02 Inventar & Transparenz ·
[Lesen Sie das Training-Data Rights Ledger-Muster](/patterns/training-data-rights-ledger)

## Muster: Dataset Admission Gate

Lassen Sie einen Training-, Evaluierungs- oder Abruf-Job einen Datensatz-Version nur lesen, wenn ein
signierter Zulassungsdatensatz diese Verwendung nach Rechts-, Qualitäts-, Repräsentativitäts-, Bias-
und Integritätsprüfungen gestattet. Die Prüfung ist Policy-as-Code zur Lesezeit, sodass ein
fehlendes Feld den Lauf fehlschlagen lässt, anstatt eine Überprüfung.

Schicht 01 Governance-as-Code / Schicht 02 Inventar & Transparenz ·
[Lesen Sie das Dataset Admission Gate-Muster](/patterns/dataset-admission-gate)

## Muster: Fairness Eval Suite

Versioniere eine Fairness-Suite mit dem Modell: Gruppen- und Schnittstellenmetriken mit
Konfidenzintervallen, ein Ergebnis „unzureichende Daten

Schicht 03 Evals & Red Teaming als Nachweis ·
[Lies das Fairness Eval Suite-Muster](/patterns/fairness-eval-suite)

## Muster: Explanation Artefact

Schreibe einen Erklärungsdatensatz pro folgenreiche Entscheidung zum Zeitpunkt der Entscheidung, mit
der Modellversion, der Methode und dem Baseline, Grund-Codes aus bewerteten Faktoren und der
angeheftete Einspruchsweg. Teste die Erklärungen auf Treue und beantworte jede Erklärungspflicht aus
demselben Datensatz.

Schicht 04 Runtime Controls & Observability / Schicht 05 Assurance & Continuous Compliance ·
[Lies das Explanation Artefact-Muster](/patterns/explanation-artefact)

## Muster: Model Artefact Integrity

Signiere ein Manifest jeder Modelldatei beim Build, füge Build-Provenance an, bevorzuge
Serialisierungsformate, die keinen Code ausführen können, und scanne den Rest. Lasse jede Runtime
die Signatur, Digests und Provenance gegen den Registry-Eintrag überprüfen, bevor sie die Gewichte
lädt.

Schicht 02 Inventory & Transparency / Schicht 04 Runtime Controls & Observability ·
[Lies das Model Artefact Integrity-Muster](/patterns/model-artefact-integrity)

## Muster: Claims Substantiation Gate

Registriere jeden öffentlichen Anspruch über die Genauigkeit, Fairness oder Fähigkeit eines
KI-Systems mit dem Eval-Lauf, der Population und dem Datum, das ihn stützt. Die Veröffentlichung
wird ohne Live-Evidenz blockiert, und jede Version führt die zitierten Evals erneut aus und
kennzeichnet jeden Anspruch, den die neue Version nicht mehr stützt.

Schicht 05 Assurance & Continuous Compliance / Schicht 03 Evals & Red Teaming als Nachweis ·
[Lies das Claims Substantiation Gate-Muster](/patterns/claims-substantiation-gate)
## Muster: Decision Notice & Contest Path

Wenn ein KI-System eine Entscheidung über eine Person trifft oder prägt, sende eine aus dem
Entscheidungsdatensatz generierte Mitteilung, die die Hauptgründe angibt und sagt, wie man Einspruch
einlegt. Leite jeden Einspruch an einen Prüfer mit der Autorität und den Informationen weiter, um
das Ergebnis zu ändern. Die Mitteilung, der Einspruch und das Überprüfungsergebnis sind Datensätze,
daher wird das Recht auf Einspruch Entscheidung für Entscheidung nachgewiesen.

Schicht 04 Runtime Controls & Observability / Schicht 05 Assurance & Continuous Compliance ·
[Lies das Decision Notice & Contest Path-Muster](/patterns/decision-notice-contest-path)

## Muster: Rights Requests Against Models

Leite jede Anfrage des Datensubjekts an jeden Ort weiter, an dem die Daten der Person in einem
KI-System sitzen, von Quellsystemen und Abrufindizes bis zu Protokollen, Eval-Sets und, wenn das
Modell nicht anonym ist, den Gewichten. Jeder Ort hat eine vorab vereinbarte Antwort, von Löschung
bis zu geplanter Umschulung, und die Anfrage schließt mit einem Erfüllungsdatensatz, der die
verbleibende Lücke datiert.

Schicht 02 Inventory & Transparency / Schicht 05 Assurance & Continuous Compliance ·
[Lies das Rights Requests Against Models-Muster](/patterns/rights-requests-against-models)

## Muster: Sanctioned AI Gateway

Stelle genehmigte KI-Tools und Modell-APIs hinter Single Sign-On und ein Gateway, das die
Acceptable-Use-Policy als Code anwendet: Datenklassen-Regeln, Redaktion oder Blockierung, ein
Entscheidungsereignis pro Aufruf und Zugriff bedingt durch eine aktuelle Bescheinigung. Der
genehmigte Pfad ist so gebaut, dass er der einfachste ist, und Discovery findet, was um ihn herum
geht.

Schicht 04 Runtime Controls & Observability / Schicht 02 Inventory & Transparency ·
[Lies das Sanctioned AI Gateway-Muster](/patterns/sanctioned-ai-gateway)

## Muster: Staged Rollout with Rollback Criteria

Führe jede Modell-, Prompt-, Corpus- oder Vendor-Version-Änderung in die Produktion durch Shadow-,
Pilot- und Canary-Stufen durch, mit Rollback-Kriterien, die vor jeder Stufe registriert und von der
Pipeline bewertet werden. Versionen sind in der Registry angeheftet und der Rückweg wird getestet,
bevor jemand davon abhängt.

Schicht 04 Runtime Controls & Observability ·
[Lies das Staged Rollout with Rollback Criteria-Muster](/patterns/staged-rollout-rollback-criteria)

## Muster: Drift & Fairness Monitor

Überwache ein bereitgestelltes System auf Input-, Label-, Konzept-, Pipeline-, Vendor-Modell- und
Nutzungs-Drift sowie auf Qualität und Fairness nach Gruppe. Jedes Signal hat einen Schwellenwert,
einen Besitzer und eine vorab vereinbarte Folge, von einem Problem bis zu einem ausgelösten Breaker,
und jede Überprüfung schreibt einen Evidenzdatensatz.

Schicht 04 Runtime Controls & Observability / Schicht 05 Assurance & Continuous Compliance ·
[Lies das Drift & Fairness Monitor-Muster](/patterns/drift-fairness-monitor)

## Muster: Downstream Use Register

Schreibe die beabsichtigten und verbotenen Verwendungen eines Systems als Policy Card auf,
registriere jeden Verbraucher seiner Ausgaben gegen seinen Registry-Eintrag mit der Wiederholung,
die diese Verwendung freigegeben hat, und stempel Provenance und Vorbehalte auf die Ausgaben.
Sekundäre Verwendung wird zu einer Entscheidung statt zu einer Entdeckung, und eine Änderung oder
Stilllegung kann jeden erreichen, den sie betrifft.

Schicht 02 Inventory & Transparency / Schicht 01 Govern-as-Code ·
[Lies das Downstream Use Register-Muster](/patterns/downstream-use-register)

## Muster: Disclosure & Notification Pipeline

Generiere Offenlegungen (KI-Interaktionsmitteilungen, Labels, die Transparenzseite und System Card,
Mitteilungen an Arbeitnehmer und betroffene Personen) und ausgelöste Benachrichtigungen (an
Anbieter, Behörden, Kunden und die Öffentlichkeit) aus der Registry und versionierten Vorlagen, jede
auf ihrer Uhr. Jede gesendete Mitteilung wird mit ihrer Zielgruppe, Vorlagenversion und Zeitstempel
aufgezeichnet.

Schicht 05 Assurance & Continuous Compliance / Schicht 02 Inventory & Transparency ·
[Lies das Disclosure & Notification Pipeline-Muster](/patterns/disclosure-notification-pipeline)

## Muster: Deactivation, Localisation & Retirement Runbook

Halte ein trainiertes Runbook pro System bereit zum Herunterfahren, zum Ausschalten nach
Gerichtsbarkeit und zum Stilllegen: benannte Schwellenwert- und Rechtsauslöser, einen
Entscheidungsbesitzer, Evidenz zuerst eingefroren, abgestufte Modi kurz vor dem Herunterfahren,
regionale Schalter und Stilllegungsschritte, die in einem stillgelegten Registry-Eintrag und keiner
laufenden Kopie enden.

Schicht 04 Runtime Controls & Observability / Schicht 02 Inventory & Transparency ·
[Lies das Deactivation, Localisation & Retirement Runbook-Muster](/patterns/deactivation-localisation-retirement-runbook)

## Was Sie diese Woche tun können

1. **Finde deine leere Schicht.** Liste die Kontrollen auf, die du nach Schicht ausführst, und wähle
   das Muster, das die Schicht mit den wenigsten füllt.
2. **Übernimm ein Muster ganz.** Baue die Lösung eines Musters wie geschrieben, einschließlich des
   Datensatzes, den es ausgibt, bevor du sie anpasst: ein Muster ohne seinen Artefakt ist eine
   Folie.
3. **Beginne mit einem Fehler, den du gesehen hast.** Wähle für dein höchstes Risikosystem das
   Muster, dessen Problem einen Fehler benennt, den du bereits hattest, nicht das, das am
   einfachsten zu bauen ist.
4. **Verfolge eine Maps to-Zeile.** Nimm ein Muster, das du ausführst, und überprüfe, dass jeder
   Artikel, jede Klausel und jede Threat-ID in seiner Maps to-Zeile auf einen Artefakt verweist, den
   du heute zeigen kannst.
5. **Schreibe das Muster auf, das dir fehlt.** Wenn du eine Kontrolle ausführst, die kein Muster
   beschreibt, entwerfe sie in der Vorlage und schlag sie vor: der Katalog ist offen für Beiträge.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; prEN 18286 entered public enquiry on 30 Oct 2025; page last updated 2026-08-03). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
