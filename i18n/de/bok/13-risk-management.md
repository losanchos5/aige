---
lang: de
source: bok/13-risk-management.md
sourceHash: "5d4b19bcfaf479cb81e356f3a4f331c3aaeac3d7bc06c510b84c82a57fa70158"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 13. Wo Risikomanagement angesiedelt ist

> Risikomanagement ist die Schleife, die jedem anderen Control vorgibt, wie hart es zugreifen muss:
> identifizieren, bewerten, behandeln und überwachen, ausgeführt auf den fünf Schichten und sieben
> Workflows, mit dem Risikoregister als Nachweis.

## Was dieses Kapitel klärt

Das Buch hat sich auf Risiko gestützt, ohne ihm einen Platz zu geben. Kapitel 03 sagt, dass jedes
Control
[von einem benannten Fehlermodus oder Schaden ausgehen sollte](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm);
Kapitel 04 warnt vor einem Risikobewertungsgremium, das Befunde bewertet, aber einen Launch nicht
stoppen kann; Kapitel 08 nennt ein "Risikoregister als Code" als das Artefakt hinter `Art. 9`}, ohne
es zu definieren. Keines von ihnen sagt, wo Risikoentscheidungen getroffen werden, in welchem
Umfang, von wem oder wie eine Entscheidung zu einem Schwellenwert wird, den eine Pipeline
durchsetzen kann. Dieses Kapitel tut es.

Die These ist kurz. Risikomanagement ist nicht eine sechste Schicht und nicht ein Komitee neben dem
Stack. Es ist die Schleife, die die Parameter jedes anderen Controls setzt: welche Systeme welche
Gates bekommen, wie hoch ein Eval-Schwellenwert liegt, wann eine Person eine Aktion genehmigen muss,
und wer das verbleibende Risiko unterzeichnen darf. Die Schleife hat vier Schritte (identifizieren,
bewerten, behandeln, überwachen). Jeder Schritt erzeugt ein Artefakt auf einer der fünf Schichten
und wird von einem der sieben Workflows aus Kapitel 06 verantwortet. Sein Nachweisregister ist das
**Risikoregister**, das als versionierte Daten statt als Tabellenkalkulation geführt wird.

Drei Kontraste halten den Umfang ehrlich (Kapitel 01 hat den vollständigen Cluster).
**Enterprise Risk Management** aggregiert jedes Risiko, das eine Organisation läuft;
KI-Risikomanagement speist es ein, wie das NIST AI RMF verlangt [1]. **Model Risk Management**
validiert Modelle in der Bankentradition; in den Vereinigten Staaten wurde seine Gründungsleitlinie
SR 11-7 am 17. Apr 2026 durch behördenübergreifende Leitlinien ersetzt, die die Praxis auf das
Modellrisikoprofil, die Größe und Komplexität jeder Bank zuschneiden [2]. Diese Disziplin übernimmt
die Zuschneidung und fügt Agenten, Runtime-Control und kontinuierliche Nachweise hinzu.
**KI-Sicherheitsforschung** fragt, ob eine Fähigkeit grundsätzlich gefährlich ist; dieses Kapitel
entscheidet, was eine Bereitstellung tun darf, und beweist es.

## Risiko, definiert für Ingenieure

Zwei Definitionen verankern das Kapitel. Die KI-Verordnung der EU definiert **Risiko** als "die
Kombination der Wahrscheinlichkeit des Eintritts eines Schadens und des Ausmaßes dieses Schadens"
[3]. Das NIST AI RMF verwendet die gleiche Form, "das zusammengesetzte Maß der
Eintrittswahrscheinlichkeit eines Ereignisses und des Ausmaßes oder Grades seiner Folgen", und
erlaubt, dass diese Folgen positiv oder negativ sind [1]. Dieses Buch arbeitet auf der negativen
Seite: Schaden für Menschen, für ihre Rechte, für die Organisation und für die Systeme um sie herum.
Das gemeinsame Vokabular stammt aus der ISO-Risikofamilie, deren aktueller Vokabularstandard ISO
31073:2022 ist; er ersetzte ISO Guide 73:2009, das jetzt zurückgezogen ist [4].

Jeder Begriff unten hat ein Artefakt, das ihn hält; das ist der Test, dass ein Begriff funktioniert.

| Begriff | Bedeutung in diesem Buch | Wo es lebt |
|---|---|---|
| **Risikoquelle** | Alles, das Risiko verursachen kann: ein Datensatz, eine Tool-Berechtigung, ein Gegner, eine Benutzergruppe | Register `source`; AIBOM; Threat Model |
| **Inhärentes Risiko** | Die Bewertung, bevor ein Control berücksichtigt wird | Register `inherent` |
| **Restrisiko** | Die Bewertung nach den Controls, die Nachweise ihrer Funktionsfähigkeit haben | Register `residual` |
| **Risikoappetit** | Wie viel Risiko und welche Arten davon die Organisation bereit ist, für ihre Ziele einzugehen | Appetite-Datendatei (Schicht 01) |
| **Risikotoleranz** | Wie viel eines bestimmten Risikos die Organisation trägt, um ein Ziel zu erreichen; die Grenze, die ein Gate durchsetzt | Tier-Schwellenwerte (Schicht 01) |
| **Behandlung** | Die gewählte Option (vermeiden, mindern, übertragen, akzeptieren) und die Controls, die sie durchführen | Register `treatment`; Control-Ids |
| **Akzeptanz** | Eine benannte, unterzeichnete und ablaufende Entscheidung, ein Restrisiko zu tragen | Akzeptanzdatensatz (Schicht 05) |

KI macht jedes dieser Dinge schwerer zu bestimmen. NIST listet auf, warum: Komponenten von
Drittanbietern, entstehende Risiken, keine vereinbarten Metriken, Bewertungen, die sich über den
Lebenszyklus verschieben, Laborergebnisse, die sich von der Produktion unterscheiden,
Undurchsichtigkeit und keine menschliche Baseline [1]. Also wird jede Bewertung neu aus Nachweisen
berechnet (ein Eval-Ergebnis, ein Telemetriesignal, ein Incident), nicht in einer Besprechung erneut
diskutiert.

## Die Schleife: identifizieren, bewerten, behandeln, überwachen

ISO 31000:2018 gibt den generischen Prozess vor: kommunizieren und konsultieren; Umfang, Kontext und
Kriterien festlegen; bewerten (identifizieren, analysieren, evaluieren); behandeln; überwachen und
überprüfen; aufzeichnen und berichten [5]. Die Ausgabe von 2018 ist aktuell, aber zur Überarbeitung
vorgesehen, mit einem Nachfolger auf Komitee-Entwurfsstufe ab 2026-09-24 [5]. ISO/IEC 23894:2023 ist
die KI-spezifische Leitlinie für Organisationen, die KI entwickeln, produzieren, bereitstellen oder
nutzen, anpassbar an jede Organisation und jeden Kontext [6]. Seine Klauseln folgen der
ISO-31000-Struktur, wie die Crosswalk des NIST zwischen den beiden zeigt [7].

Die KI-Verordnung der EU verwandelt die gleiche Schleife in Recht für Hochrisiko-Systeme. Artikel 9
verlangt, dass ein Risikomanagementsystem "eingerichtet, umgesetzt, dokumentiert und gepflegt" wird,
als kontinuierlicher iterativer Prozess über den Lebenszyklus hinweg, mit vier Schritten: bekannte
und vernünftigerweise vorhersehbare Risiken für Gesundheit, Sicherheit oder Grundrechte
identifizieren und analysieren; Risiken unter beabsichtigter Verwendung und vernünftigerweise
vorhersehbarem Missbrauch schätzen und bewerten; weitere Risiken aus Daten zur Beobachtung nach dem
Inverkehrbringen bewerten; und gezielte Risikomanagementsysteme einführen [8]. Das Digital-Omnibus
ließ Artikel 9 unverändert [9]; für Annex-III-Systeme gilt es ab 2. Dez 2027 [10]. Es bindet den
Anbieter; der Betreiber führt seine eigene Schleife durch {`Art. 26`} Beobachtung und, wo
zutreffend, die {`Art. 27`} FRIA (Kapitel 08). Eine rechtliche Auslegung von Artikel 9, geschrieben
gegen den Vorschlag von 2021, ist ein nützlicher Leitfaden für das, was jeder Schritt verlangt [11].
Kein harmonisierter Standard für KI-Risikomanagement ist noch im Amtsblatt zitiert [12]; der
Entwurf, der Artikel 9 beantworten würde, prEN 18228, wird im
[JTC-21-Programm](/bok/principles-and-standards#the-jtc-21-programme) verfolgt (Kapitel 22).

Die vier Schritte komprimieren die Aktivitäten der ISO: **identifizieren** umfasst Umfang, Kontext,
Kriterien und Identifikation; **bewerten** umfasst Analyse und Evaluierung; **überwachen** umfasst
Überprüfung, Aufzeichnung und Berichterstattung. Kommunikation und Konsultation läuft durch alle
vier, hier als Stakeholder-Mapping.

| Schritt | ISO/IEC-23894-Klausel (pro NIST-Crosswalk) | NIST AI RMF | KI-Verordnung der EU `Art. 9` | Primäres Artefakt |
|---|---|---|---|---|
| **Identifizieren** | 6.3 Umfang, Kontext, Kriterien; 6.4.2 Identifikation | MAP 1–5; GOVERN 5 | 9(2)(a) | Use-Case-Risikoprofil; Stakeholder-Karte; Registereintrag |
| **Bewerten** | 6.4.3 Analyse; Rest von 6.4 | MAP 5.1; MEASURE 1–2 | 9(2)(b) | Matrix-Bewertung; Eval-Ergebnisse als Wahrscheinlichkeitsnachweis |
| **Behandeln** | 6.5 Behandlung | MANAGE 1–3 | 9(2)(d); 9(5) | Controls verknüpft mit dem Risiko; Akzeptanzdatensatz |
| **Überwachen** | 6.6 Überwachung und Überprüfung; 6.7 Aufzeichnung und Berichterstattung | MEASURE 3–4; MANAGE 4 | 9(2)(c) | Telemetrie-Neubewertung; Incident-Links; Überprüfungsprotokoll |

### Die Schleife auf den fünf Schichten

Die Schleife fügt keine Schicht hinzu. Sie gibt jeder bestehenden Schicht eine Risikoaufgabe, und
jede Aufgabe hinterlässt einen Nachweisdatensatz, den die Schicht darüber lesen kann.

| Schicht | Seine Risikoaufgabe | Risiko-Artefakt | Nachweisdatensatz |
|---|---|---|---|
| **01 Govern-as-Code** | Hält Appetit, Toleranz, Skalen und Tier-Regeln als Daten; blockiert, was sie überschreitet | `appetite.yaml`; Gate-Richtlinie | Policy-Urteil, das die Risiko-ID und das Band zitiert |
| **02 Inventory & Transparency** | Gibt jedem Risiko ein Objekt: Registry-ID, Eigentümer, Tier, betroffene Stakeholder | Registereintrag; Use-Case-Risikoprofil; AIBOM | Registerdatensatz mit Tier und verknüpften Risiko-IDs |
| **03 Evals & Red Teaming as Evidence** | Misst Wahrscheinlichkeit; findet Risiken, die niemand aufgelistet hat | Eval-Suites mit Schwellenwerten, die nach Tier gesetzt sind; Red-Team-Erkenntnisse | Eval-Ergebnis gegen das Risiko und die Version eingereicht |
| **04 Runtime Controls & Observability** | Behandelt zur Laufzeit; erkennt, wenn ein Risiko real wird | Guardrails; Human-in-the-Loop-Gates; scoped identity; Kill Switch | Guardrail-Ereignisse; Genehmigungsprotokolle; Traces |
| **05 Assurance & Continuous Compliance** | Zeichnet auf, bewertet neu und berichtet; hält Akzeptanzen | Risikoregister als Daten; Akzeptanzdatensätze; Incident-Links | Register-Verlauf; unterzeichnete Akzeptanzen; Überprüfungsprotokoll |

Nachweise fließen nach oben, wie überall im Stack. Eine Restbewertung ist eine Behauptung, dass ein
Control funktioniert; sie ist nur glaubwürdig, wenn die Control-ID zu einem Policy-Urteil,
Eval-Ergebnis oder Guardrail-Ereignis aus dem aktuellen Überprüfungszeitraum aufgelöst wird. Eine
Restbewertung, deren Control keinen Nachweis hat, ist inhärentes Risiko mit einem besseren Label.

### Die Schleife in den sieben Workflows

Jeder Workflow aus Kapitel 06 besitzt einen Teil der Schleife; der Systemeigentümer bleibt für jedes
Risiko von Anfang bis Ende verantwortlich.

| Workflow | Risiko-Schritt | Was es erzeugt |
|---|---|---|
| [Aufnahme und Klassifizierung](/bok/the-role#intake-and-classification) | Identifizieren | Use-Case-Risikoprofil; Tier; erste Registereinträge; Stakeholder-Karte |
| [Inventar und Registry](/bok/the-role#inventory-and-registry) | Identifizieren | Registry-ID, Eigentümer und Tier für jedes Risiko; nicht registrierte Systeme als unbewertetes Risiko |
| [Evals und Red Teaming als Nachweis](/bok/the-role#evals-and-red-teaming-as-evidence) | Bewerten | Wahrscheinlichkeitsnachweis; neue Risiken aus Red-Team-Erkenntnissen |
| [Policy-as-Code und Gates](/bok/the-role#policy-as-code-and-gates) | Behandeln | Appetit in Gate-Regeln kompiliert; Bereitstellung verweigert bei nicht akzeptiertem Restrisiko |
| [Runtime-Überwachung und Incidents](/bok/the-role#runtime-monitoring-and-incidents) | Behandeln, überwachen | Runtime-Controls; Signale, die Risiken neu bewerten; Incident-Links |
| [Assurance und Audit-Nachweise](/bok/the-role#assurance-and-audit-evidence) | Überwachen | Das Register als Nachweis; Akzeptanz- und Überprüfungsdatensätze; Berichte |
| [Regulatorische Übersetzung](/bok/the-role#regulatory-translation) | Identifizieren, behandeln | Verpflichtungen als Risikoqellen und als erforderliche Behandlungen |

## NIST AI RMF und ISO/IEC 23894 auf dem Stack

Das NIST AI RMF 1.0 teilt die Risikoarbeit in vier Funktionen auf, jede unterteilt in Kategorien und
Unterkategorien. GOVERN gilt für den gesamten Prozess; MAP, MEASURE und MANAGE gelten pro System und
pro Lebenszyklus-Phase [1]. Kapitel 08 ordnet die Funktionen den Schichten zu; die Tabelle unten
geht bis zu den 19 Kategorien und den Unterkategorien, auf denen dieses Kapitel aufbaut
(paraphrasiert; die IDs sind die des NIST; die Spalte Schicht ist diese illustrative Lesart des
Buches). Kapitel 22 geht
[die 19 NIST-AI-RMF-Kategorien](/bok/principles-and-standards#the-core-19-categories) vollständig
durch.

| Kategorie | Unterkategorien, die dieses Kapitel verwendet | Schicht | Artefakt |
|---|---|---|---|
| GOVERN 1 | 1.3 Risiko-Aktivitätsstufe durch Risikotoleranz gesetzt; 1.5 Überprüfungshäufigkeit; 1.6 Inventar | 1 · 2 | Appetite-Daten; Tier-Regeln; Registry |
| GOVERN 2 | 2.1 Rollen und Kommunikationswege; 2.3 Geschäftsleitung besitzt KI-Risikoentscheidungen | 1 · 5 | Akzeptanz-Autoritäts-Tabelle; RACI |
| GOVERN 3 | 3.2 Rollen für Mensch-KI-Konfigurationen und Aufsicht | 1 · 4 | Aufsichtsdesign; Genehmigungsgate-Konfiguration |
| GOVERN 4 | 4.2 Teams dokumentieren Risiken und Auswirkungen; 4.3 Tests, Incident-Identifikation, Informationsaustausch | 3 · 5 | Register; Incident Pipeline |
| GOVERN 5 | 5.1 Rückmeldung von Personen außerhalb des Teams; 5.2 bewertete Rückmeldung in das Design | 2 | Stakeholder-Karte; Feedback-Kanal |
| GOVERN 6 | 6.1 Richtlinien von Drittanbietern; 6.2 Notfallmaßnahmen für Ausfälle in Hochrisiko-Systemen von Drittanbietern | 2 · 5 | Due-Diligence-Gate; AIBOM |
| MAP 1 | 1.1 Zweckbestimmung und Kontext; 1.5 Risikotoleranzen bestimmt und dokumentiert | 1 · 2 | Use-Case-Risikoprofil; Appetite-Daten |
| MAP 2 | 2.1 Aufgabe und Methode; 2.2 Wissensgrenzen und menschliche Aufsicht | 2 | Tier; Model Card |
| MAP 3 | 3.2 Kosten von Fehlern gegenüber Risikotoleranz; 3.5 Prozesse der menschlichen Aufsicht | 2 · 3 | Nutzen- und Kostenvermerk; Benchmark-Ergebnisse |
| MAP 4 | 4.1 Komponenten- und Rechtsrisiken; 4.2 interne Kontrollen pro Komponente | 2 | AIBOM-verknüpfte Risiken |
| MAP 5 | 5.1 Wahrscheinlichkeit und Ausmaß jeder Auswirkung; 5.2 regelmäßiges Engagement | 2 · 3 | Matrix-Bewertungen; Stakeholder-Protokoll |
| MEASURE 1 | 1.1 signifikanteste Risiken zuerst gemessen, nicht gemessene dokumentiert; 1.3 unabhängige Bewerter | 3 | Eval-Plan pro Risiko |
| MEASURE 2 | 2.6 Restrisiko negativ innerhalb der Toleranz, sicher fehlgeschlagen; 2.7 Sicherheit; 2.11 Fairness | 3 | Eval-Ergebnisse; Red-Team-Erkenntnisse |
| MEASURE 3 | 3.1 bestehende, unvorhergesehene und entstehende Risiken; 3.3 Nutzerfeedback und Einspruch | 4 · 5 | Telemetrie-Neubewertung; Feedback-Kanal |
| MEASURE 4 | 4.3 Verbesserungen oder Rückgänge aus Felddaten | 3 · 5 | Suite-Coverage-Überprüfung |
| MANAGE 1 | 1.1 Go oder No-Go; 1.2 nach Auswirkung, Wahrscheinlichkeit, Ressourcen priorisieren; 1.3 mindern, übertragen, vermeiden oder akzeptieren; 1.4 Restrisiken dokumentiert | 1 · 5 | Gate-Entscheidung; Register-Behandlung; Akzeptanzdatensatz |
| MANAGE 2 | 2.1 Nicht-KI-Alternativen abgewogen; 2.3 Reaktion auf ein zuvor unbekanntes Risiko; 2.4 ersetzen, disengagieren oder deaktivieren | 4 | Substitutionsdatensatz; Kill Switch |
| MANAGE 3 | 3.1 Risiken von Drittanbietern überwacht; 3.2 vortrainierte Modelle überwacht | 2 · 4 | Neubewertung des Anbieters; Drift-Überwachung |
| MANAGE 4 | 4.1 Überwachungspläne nach der Bereitstellung; 4.3 Vorfälle kommuniziert | 4 · 5 | Überwachungsplan; Incident Pipeline |

Das AI RMF bietet auch **Profile**: ein aktuelles Profil, wie Risiken heute gemanagt werden, ein
Zielprofile der gewünschten Ergebnisse und die Lücke zwischen ihnen als Aktionsplan [1]. Die
Tailoring-Matrix später in diesem Kapitel macht denselben Schritt.

### ISO 31000, ISO/IEC 23894 und ISO/IEC 42001

Drei ISO-Dokumente, drei Aufgaben. ISO 31000 ist generische Anleitung für jedes Risiko [5]; ISO/IEC
23894 wendet sie auf KI an [6]; ISO/IEC 42001 ist der zertifizierbare Management-System-Standard,
dessen Klauseln zur KI-Risikobewertung (6.1.2), KI-Risikobehandlung (6.1.3) und
KI-System-Auswirkungsbewertung (6.1.4) sowie deren Betrieb (8.2 bis 8.4) erfordern, dass die
Schleife existiert und läuft [13]. NISTSs Crosswalk zeigt, dass seine Funktionen und die
23894-Klauseln einen Prozess beschreiben [7].

| AI RMF-Funktion | ISO/IEC 23894-Klauseln in NISTSs Crosswalk | Schicht |
|---|---|---|
| GOVERN | 5.2 Führung und Engagement; 5.3 Integration; 5.4 Design (5.4.1 bis 5.4.5: Kontext, Engagement, Rollen, Ressourcen, Kommunikation) | 1 · 2 |
| MAP | 5.4.1 Kontext; 6.3.2 bis 6.3.4 Umfang, Kontext und Risikokriterien; 6.4.2 Identifizierung (6.4.2.3 Risikoursachen, 6.4.2.4 Ereignisse und Ergebnisse, 6.4.2.6 Folgen); 6.4.3 Analyse; 5.7 Verbesserung; 6.7 | 2 · 3 |
| MEASURE | 6.3.4 Risikokriterien; 6.4.2.5 Identifizierung von Kontrollen; 6.4.3.2 Folgen; 6.4.3.3 Wahrscheinlichkeit; 6.6 Überwachung und Überprüfung; 6.7 | 3 |
| MANAGE | 5.5 Umsetzung; 5.7 Verbesserung; 6.5 Behandlung (6.5.2 Optionen, 6.5.3 Pläne); 6.6; 6.7 | 4 · 5 |

NISTSs Crosswalk war ein Entwurf vom Januar 2023 zur Stellungnahme, abgebildet gegen den endgültigen
Entwurf von 23894 [7]; überprüfen Sie die Klauselnummern gegen den veröffentlichten Text von 2023,
bevor Sie sie in einer Audit zitieren (überprüfen).

> **Hinweis** Ein Crosswalk ist ein Index, keine Kontrolle (siehe das
> [Framework Crosswalk](/patterns/framework-crosswalk)-Muster). Die Zeile, die zählt, ist diejenige,
> deren Artefakt existiert und Nachweise emittiert.

## Risiken identifizieren: Quellen, Faktoren und Stakeholder

Die Identifizierung ist der Ort, an dem die Risikoarbeit stillschweigend fehlschlägt: Ein in einem
Workshop geschriebenes Register listet auf, woran der Raum dachte, und der Rest bleibt unsichtbar,
bis ein Vorfall ihn benennt. Es zu engineern bedeutet eine systematische Liste von Quellen,
beitragende Faktoren erfasst als Daten, Stakeholder kartiert statt angenommen, und ein Intake-Pfad,
den kein System auf dem Weg zur Produktion überspringen kann.

### Interne und externe Risikoursachen

Eine **interne** Quelle sitzt innerhalb der Kontrolle der Organisation: Daten, Designentscheidungen,
Menschen, Prozesse. Eine **externe** Quelle entsteht außerhalb davon: Lieferanten, Gegner, Benutzer,
der Betriebskontext, Regulatoren, Gesellschaft. Die Aufteilung sagt die Behandlung voraus. Interne
Quellen können oft durch Design eliminiert oder ersetzt werden; externe müssen meist dagegen
engineert und überwacht werden.

| Quelle | Intern oder extern | Typische Risiken | Identifiziert durch (Artefakt, Schicht) |
|---|---|---|---|
| Trainings-, Fine-Tuning- und Abrufdaten | Intern (extern wenn gekauft) | Bias; Datenschutzleck; vergifteter Corpus; veraltetes Wissen | Data Card, Lineage (2); Datentests (3) |
| Modellwahl und -konfiguration | Intern | Fähigkeit über den Bedarf hinaus; Undurchsichtigkeit; Konfabulation | Model Card (2); Capability-Evals (3) |
| Systemdesign: Prompts, Tools, Autonomie | Intern | Tool-Missbrauch; übermäßige Agentur; Goal Hijack | Registry-Umfang (2); Threat Model; Red Team (3) |
| Menschen und Prozess | Intern | Automatisierungsbias; unverwaltete Systeme; Änderung ohne Überprüfung | Überwachungsmetriken (4); Registry-Eigentum (2) |
| Organisatorische Anreize | Intern | Schwellwerte zum Versand abgestimmt; Gates umgangen | Gate-Bypass-Rate (1); Audit (5) |
| Modelle, APIs und Komponenten von Drittanbietern | Extern | Stille Modellaktualisierungen; nicht offengelegte Trainingsdaten; Ausfall | Due-Diligence-Gate, AIBOM (2); Boundary-Evals (3) |
| Gegner | Extern | Prompt-Injection; Datenexfiltration; Modellextraktion | Red-Team-Suite (3); Guardrails (4) |
| Benutzer und vernünftigerweise vorhersehbarer Missbrauch | Extern | Verwendung außerhalb der Zweckbestimmung; Überabhängigkeit | Zweckbestimmungs-Datensatz (2); Missbrauch-Evals (3) |
| Betriebskontext | Extern | Datendrift; neue Populationen; saisonale Verschiebungen | Drift-Telemetrie (4) |
| Recht und Regulatoren | Extern | Neue Verpflichtung; verschobenes Datum; Durchsetzungspriorität | Regulatorische Übersetzung (1); Crosswalk |
| Betroffene Menschen und Gesellschaft | Extern | Auswirkungen auf Rechte; Diskriminierung; Vertrauensverlust | FRIA oder DPIA (1 · 2); Stakeholder-Karte |

Zwei Zeilen tragen eine rechtliche Anmerkung. Der **vernünftigerweise vorhersehbare Missbrauch** des
KI-Gesetzes ist die Verwendung außerhalb der Zweckbestimmung, die "aus vernünftigerweise
vorhersehbarem menschlichem Verhalten oder der Interaktion mit anderen Systemen, einschließlich
anderer KI-Systeme, resultieren kann" [3]: Missbrauch durch Benutzer und durch andere Agenten liegt
im Umfang, keine Entschuldigung. Und NIST warnt, dass Drittanbieter-Risiken sowohl aus der
Komponente als auch aus ihrer Verwendung entstehen, und dass Entwickler- und Betreiber-Metriken
möglicherweise nicht übereinstimmen [1]. Kapitel 14 verwandelt vorhersehbaren Missbrauch in
Design-Eingaben
([vernünftigerweise vorhersehbarer Missbrauch](/bok/governing-development#reasonably-foreseeable-misuse)).
Kataloge finden Lücken; sie sind kein Register. NIST AI 600-1 benennt 12 Risiken, die für generative
KI einzigartig sind oder durch sie verschärft werden, und schlägt vor, sie als technisch oder
Modell, Missbrauch durch Menschen und Ökosystem oder gesellschaftlich zu gruppieren [14]. Der OWASP
Top 10 für Agentic Applications behandelt Agent-Bedrohungen wie Goal Hijack, Tool-Missbrauch und
Privilege Abuse [15]. Das MIT AI Risk Repository konsolidiert 1.725 Risiken aus 74 Frameworks und
stellt fest, dass menschliche Entscheidungen fast so viele KI-Risiken verursachen (38%) wie
KI-Systeme selbst (42%) [16]: Ein Register, das nur Modellfehlermodi auflistet, verpasst einen
großen Teil dessen, was schiefgeht.

### Beitragende Faktoren und das Use-Case-Risikoprofil

Ein **beitragender Faktor** erzeugt nicht allein ein Risiko; er bewegt Wahrscheinlichkeit,
Schweregrad oder beides. NIST gibt höhere anfängliche Priorität, wenn Trainingsdaten sensibel oder
persönlich sind oder Ausgaben Menschen direkt beeinflussen, und zählt Betreiber-Anpassung als Faktor
[1]. Artikel 9 fordert Anbieter auf, Personen unter 18 Jahren und andere gefährdete Gruppen zu
berücksichtigen [8]. Erfassen Sie Faktoren als Registry-Felder bei
[Intake](/patterns/use-case-intake-risk-tiering) und lassen Sie eine Richtlinie den Tier berechnen.

| Faktor | Bewegt | Profilfeld |
|---|---|---|
| Autonomie: schlägt vor, entwirft, handelt nach Überprüfung, handelt allein | Wahrscheinlichkeit und Schweregrad | `autonomy` |
| Entscheidungsauswirkung: keine, informiert, entscheidet über eine Person | Schweregrad | `decision_impact` |
| Exposition: interne Benutzer, Kunden, die Öffentlichkeit; tägliches Volumen | Wahrscheinlichkeit | `exposure`, `volume_per_day` |
| Umkehrbarkeit des schlimmsten Ergebnisses | Schweregrad | `reversibility` |
| Gefährdete Gruppen betroffen: Minderjährige, Patienten, Bewerber | Schweregrad | `vulnerable_groups` |
| Datensensibilität: persönlich, besondere Kategorie, vertraulich | Schweregrad | `data_class` |
| Undurchsichtigkeit und Neuheit der Technik | Wahrscheinlichkeit und Vertrauen in die Bewertung | `explainability`, `novel_technique` |
| Abhängigkeit von Drittanbietern | Wahrscheinlichkeit | `supplier_ids` |
| Betreiber-Anpassung (für Anbieter) | Wahrscheinlichkeit | `customisation` |

Der Tier wird berechnet, nicht verhandelt. Ein Systemeigentümer, der mit dem Tier nicht
einverstanden ist, ändert einen Faktor mit Nachweisen in einem überprüften Pull Request, und der
Tier folgt.

> **Beispiel (illustrativ)** HR schlägt einen CV-Screening-Assistenten vor. Sein Profil liest
> `decision_impact: decides-about-person`, `exposure: public-applicants`,
> `autonomy: filters, a recruiter sees only the shortlist`, `data_class: personal`. Die Tier-Regel
> platziert ihn in Tier 3 vor jedem Treffen. Das Gate fragt dann nach Fairness- und
> Robustness-Evals, einem DPIA-Link und einer unterzeichneten Akzeptanz für jedes Restrisiko über
> Low. Ob es auch ein Hochrisiko-KI-System unter dem KI-Gesetz ist, ist eine separate Frage für die
> Annex-III-Route (Kapitel 08).

### Stakeholder-Kartierung

Verschiedene Akteure sehen verschiedene Risiken. Ein Entwickler, der ein vortrainiertes Modell
freigeben, kann eine andere Risikoperspektive haben als der Betreiber, der es verwendet, und die
geschädigten Personen sind nicht immer direkte Benutzer [1]. Das AI RMF baut dies in GOVERN 5.1, MAP
1.2 und MEASURE 1.3 ein, das verlangt, dass betroffene Gemeinschaften konsultiert werden, wie die
Risikotoleranz erfordert [1]. Für Betreiber bestimmter Hochrisiko-Systeme macht die FRIA es zum
Gesetz: Sie benennt die Kategorien von Personen, die wahrscheinlich betroffen sind, und die
spezifischen Schadensrisiken für sie [17]. ISO nennt denselben Schritt "kommunizieren und
konsultieren" [5].

| Stakeholder | Wie ihre Sicht in die Schleife eintritt | Evidenz |
|---|---|---|
| Direkte Benutzer (Operatoren, Kunden) | Usability-Tests; In-Produkt-Feedback | Feedback-Elemente verknüpft mit Risiko-IDs |
| Betroffene Nicht-Benutzer (Bewerber, Patienten, die Öffentlichkeit) | Konsultation; FRIA; Beschwerden | FRIA-Datensatz; Beschwerde-Links |
| Downstream-Betreiber (für Anbieter) | Betriebsanleitung; Betreiber-Berichte | Von Betreibern gemeldete Probleme |
| Upstream-Anbieter (für Betreiber) | Due Diligence; Änderungsmitteilungen | Lieferanten-Nachweise im AIBOM |
| Interne Funktionen (Recht, Datenschutz, Sicherheit, Risiko, Audit) | Überprüfung bei Intake; Second-Line-Herausforderung | Überprüfungs-Datensätze |
| Regulatoren und Behörden | Verpflichtungen kartiert; Meldungspfade | Crosswalk; Incident Pipeline |
| Führungskräfte und das Leitungsorgan | Appetite-Erklärung; Risikoberichte | Genehmigte Appetite; Akzeptanzen |

Die Ausgabe ist kein Poster. Es ist eine Stakeholder-Liste im Registry-Eintrag, ein `affected`}-Feld
bei jedem Register-Risiko und ein Protokoll darüber, wer konsultiert wurde, wann und mit welchem
Ergebnis.

## Risiken bewerten: die Wahrscheinlichkeits-nach-Schweregrad-Matrix

Eine Risikomatrix wandelt zwei Urteile in ein Band um, das eine Reaktion auslöst. Ihr Wert liegt in
der Konsistenz, nicht in der Präzision: zwei Bewerter, die ein Szenario bewerten, sollten in
derselben Zelle landen, und die Zelle sollte jedes Mal dasselbe Gate entscheiden. IEC 31010:2019
katalogisiert andere Risikobewertungstechniken für Fälle, in denen eine Matrix nicht ausreicht [18].

### Definierte Skalen

Ohne gemeinsame Definitionen können Bewerter dasselbe Risiko unterschiedlich bewerten [19].
Verankern Sie die Wahrscheinlichkeit in Evidenz, die Sie lesen können (Eval-Fehlerquoten,
Telemetrie, Vorfälle), und den Schweregrad in der schlimmsten glaubwürdigen Folge eines einzelnen
Vorkommnisses. Die Schwellwerte sind illustrativ; kalibrieren Sie sie auf Ihre Volumen.

| Stufe | Wahrscheinlichkeit | Definition (pro System, in Produktion) | Evidenz, die sie setzt |
|---|---|---|---|
| L1 | Selten | Nicht zu erwarten in der Lebensdauer des Systems | Ein gezieltes Red Team kann es nicht reproduzieren |
| L2 | Unwahrscheinlich | Könnte etwa einmal pro Jahr auftreten | Nur durch eine dedizierte adversariale Suite reproduzierbar |
| L3 | Möglich | Erwartet einige Male pro Jahr | Regressions- oder Red-Team-Fehlerquote unter 1 % |
| L4 | Wahrscheinlich | Erwartet monatlich | Fehlerquote von 1 % bis 5 %, oder Beinahe-Unfälle in der Telemetrie |
| L5 | Nahezu sicher | Erwartet wöchentlich oder häufiger | Fehlerquote über 5 %, oder bereits in Produktion gesehen |

| Stufe | Schweregrad | Schlimmste glaubwürdige Folge eines einzelnen Vorkommnisses |
|---|---|---|
| S1 | Vernachlässigbar | Unannehmlichkeit; vollständig reversibel; niemandes Rechte beeinträchtigt |
| S2 | Gering | Begrenzte, reversible Schäden für wenige Menschen oder ein kleiner Verlust; innerhalb eines Tages behoben |
| S3 | Mäßig | Wesentliche Schäden für Einzelpersonen (eine ungerechtfertigte Ablehnung, Daten einer Person offengelegt); mit Aufwand reversibel |
| S4 | Erheblich | Erhebliche Schäden für viele Menschen oder für Grundrechte; schwer rückgängig zu machen |
| S5 | Katastrophal | Tod oder schwere Gesundheitsschäden; schwerwiegende und irreversible Störung kritischer Infrastruktur; schwere Schäden an Eigentum oder Umwelt; weit verbreitete Verletzung von Grundrechten |

S4 und S5 zusammen decken die vier Kategorien eines **schwerwiegenden Vorfalls** gemäß KI-Verordnung
[3] ab, daher ist ein dort bewertetes Risiko ein Kandidat für einen meldepflichtigen Vorfall am Tag
seiner Verwirklichung. Der [Harms Atlas](/resources/harms) bietet eine Schadenstaxonomie nach Ebene
mit echten Vorfallsaufzeichnungen zur Kalibrierung der Schweregrad-Spalte.
### Die Matrix und was jedes Band auslöst

| Schweregrad / Wahrscheinlichkeit | L1 Selten | L2 Unwahrscheinlich | L3 Möglich | L4 Wahrscheinlich | L5 Nahezu sicher |
|---|---|---|---|---|---|
| **S5 Katastrophal** | Kritisch (Überschreibung) | Kritisch (Überschreibung) | Kritisch (Überschreibung) | Kritisch (Überschreibung) | Kritisch (Überschreibung) |
| **S4 Erheblich** | Mittel | Hoch | Hoch | Kritisch | Kritisch |
| **S3 Mäßig** | Niedrig | Mittel | Hoch | Hoch | Kritisch |
| **S2 Gering** | Niedrig | Niedrig | Mittel | Mittel | Hoch |
| **S1 Vernachlässigbar** | Niedrig | Niedrig | Niedrig | Mittel | Mittel |

Ein Band ist nur nützlich, wenn es ändert, was die Pipeline tut. Die Richtlinie später in diesem
Kapitel kompiliert diese illustrativen Konsequenzen.

| Band | Mindestbehandlung | Gate | Wer kann das Restrisiko akzeptieren | Überprüfung |
|---|---|---|---|---|
| **Niedrig** | Überwachen | Registereintrag und Eigentümer | Systemeigentümer | Jährlich oder bei Änderung |
| **Mittel** | Mindestens eine konstruierte Kontrolle mit Evidenz | Eval Gate zum verknüpften Risiko | Product Owner | Alle sechs Monate |
| **Hoch** | Konstruierte Kontrollen plus Laufzeit-Erkennung; eine Person entscheidet, wo Konsequenzen eine Person erreichen | Eval Gate und Runtime Guardrail; Bereitstellung ohne aktuelle Akzeptanz verweigert | Risikokomitee, zweite Linie konsultiert | Vierteljährlich |
| **Kritisch** | Eliminieren oder ersetzen; Konstruktion allein bringt es nicht zum Einsatz | Bereitstellung verweigert | Leitungsorgan oder niemand | Monatlich während es offen ist |

### Die Überschreibung für katastrophalen Schweregrad

Die Multiplikation von Wahrscheinlichkeit mit Schweregrad verbirgt den Schwanz. Ein Gitter kann
einer seltenen Katastrophe das Band einer häufigen Unannehmlichkeit geben, und wenn Häufigkeit und
Schweregrad negativ korreliert sind (die Form katastrophalen Risikos), können Matrizen "schlimmer
als nutzlos" sein [19]. Also läuft S5 auf seiner eigenen Spur:

1. **Das Band ignoriert die Wahrscheinlichkeit.** Jedes S5-Szenario ist Kritisch. Seine
   Wahrscheinlichkeit wird aufgezeichnet, da sie die Überwachung leitet, aber sie senkt das Band
   nicht.
2. **Das Team kann es nicht akzeptieren.** Die Behandlung muss das Szenario eliminieren oder seinen
   Schweregrad senken, normalerweise durch Entfernung einer Fähigkeit, einer Aktion oder einer
   Exposition. Andernfalls kann nur das Leitungsorgan es explizit und für einen festen Zeitraum
   akzeptieren.
3. **Gegenwärtiger Schaden bedeutet Stopp.** Wenn erhebliche negative Auswirkungen unmittelbar
   bevorstehen, schwere Schäden auftreten oder katastrophale Risiken vorhanden sind, sagt NIST, dass
   Entwicklung und Bereitstellung "auf sichere Weise eingestellt werden sollten, bis Risiken
   ausreichend gemanagt werden können" [1]. Der getestete Kill Switch ist der Mechanismus.
4. **Die Grenze nutzt die gleiche Logik.** Gemäß GPAI Code of Practice definieren Unterzeichner
   Tiers für systemisches Risiko (oder andere Akzeptanzkriterien), wenden sie mit
   Sicherheitsspielraum an und, wenn systemisches Risiko nicht akzeptabel ist, stellen das Modell
   nicht zur Verfügung oder beschränken, ziehen es zurück oder rufen es ab [20].

Die meisten Kontrollen senken die Wahrscheinlichkeit; nur eine Designänderung senkt den Schweregrad.
Die Überschreibung erzwingt diese Designkonversation, anstatt Wahrscheinlichkeitskontrollen eine
Katastrophe auf Mittel heruntertalk zu lassen.

### Was eine Matrix Ihnen nicht sagen kann

Cox nennt vier Grenzen: schlechte Auflösung, Bewertungsfehler, keine Grundlage für die
Ressourcenallokation und mehrdeutige Ein- und Ausgaben [19]. Die Antworten sind verfahrensbedingt:

- **Behalten Sie die Zahlen hinter der Zelle** (Eval-Fehlerquote, Volumen, Worst-Case-Schätzung),
  damit das Band neu berechnet werden kann. Die Zelle ist eine Ansicht der Daten, nicht die Daten.
- **Addieren oder mitteln Sie niemals Zellen.** Priorisieren Sie nach Band, dann Schweregrad, dann
  Behandlungskosten; MANAGE 1.2 priorisiert nach Auswirkung, Wahrscheinlichkeit und verfügbaren
  Ressourcen [1].
- **Lesen Sie Eval-basierte Wahrscheinlichkeit als untere Grenze.** Ein Eval ist stichprobengebunden
  und erfasst Regressionen, nicht Neuheit
  ([die Grenzen des Eval Gates](/bok/definition#the-limits-of-the-eval-gate)).

Für Hochrisiko-Systeme weist das Gesetz in die gleiche Richtung: Tests laufen gegen "vorher
definierte Metriken und probabilistische Schwellwerte" ab, die für den beabsichtigten Zweck geeignet
sind [8]. Eine Wahrscheinlichkeitsskala, die als Schwellwerte geschrieben ist, die eine Pipeline
überprüfen kann, ist genau das.

## Risikoappetit und -toleranz, kompiliert in Gates

NIST schreibt keine Risikotoleranz vor. Es definiert Toleranz als die "Bereitschaft, das Risiko zu
tragen, um seine Ziele zu erreichen", nennt es kontextabhängig und sich ändernd, fordert
Organisationen auf, Sektorregeln zu befolgen oder eine angemessene Toleranz zu definieren, wo keine
existiert, und fordert, dass Toleranzen dokumentiert werden (MAP 1.5) und die Ebene der
Risikomanagement-Anstrengung setzen (GOVERN 1.3) [1]. Eine Appetitaussage, die nur in einem Board
Pack lebt, ändert nichts, was eine Pipeline tut. Kompilieren Sie sie.

### Von der Aussage zu den Daten

> **Beispiel (illustrativ)** Eine Appetitaussage, wie sie ein Leitungsorgan genehmigen könnte: "Wir
> nutzen KI, um Mitarbeiter und Kunden schneller zu machen. Wir akzeptieren mäßiges Risiko in
> internen Tools und in Entscheidungsunterstützung, wo eine Person jede Ausgabe überprüft, damit wir
> schnell lernen. Wir akzeptieren nur niedriges Restrisiko in Systemen, die über eine Person
> entscheiden oder in ihrem Namen handeln. Kein Agent bewegt Geld über einen festgelegten Betrag
> hinaus ohne die Entscheidung einer Person. Wir tragen katastrophales Risiko nur mit expliziter
> Akzeptanz des Leitungsorgans für einen festen Zeitraum. Kein Risiko wird auf unbestimmte Zeit
> akzeptiert."

Jeder Satz wird zu einem Wert in einer versionierten Datei, die Gates lesen. Die Datei ist die
durchgesetzte Version; die Aussage ist ihre Dokumentation.

```yaml
# appetite.yaml (illustrative, not a claim of conformity)
version: 2026-09-24
approved_by: governing-body
tolerance:                     # highest residual band carried without escalation
  tier-1-internal: medium
  tier-2-decision-support: medium
  tier-3-decision-about-a-person: low
  tier-4-agentic-or-high-stakes: low
acceptance_authority:          # who may sign each residual band
  low: system-owner
  medium: product-owner
  high: risk-committee
  critical: governing-body
max_acceptance_days: {low: 365, medium: 180, high: 90, critical: 30}
eval_floor:                    # likelihood evidence required per tier
  tier-3-decision-about-a-person: {robustness: 0.95, subgroup_parity: 0.90}
  tier-4-agentic-or-high-stakes: {injection_resistance: 0.95, tool_scope_adherence: 0.99}
human_approval_above_eur: 250  # enforced at runtime by the approval gate
catastrophic_override: true    # severity 5: eliminate, or governing-body acceptance
```

| Aussageklausel | Kompiliert in | Schicht | Evidenz |
|---|---|---|---|
| "mäßiges Risiko in internen Tools und in Entscheidungsunterstützung" | `tolerance` für Tiers 1 und 2: `medium` | 01 | Gate-Urteil |
| "nur niedriges Restrisiko in Systemen, die über eine Person entscheiden oder in ihrem Namen handeln" | `tolerance` für Tiers 3 und 4: `low`; `eval_floor` | 01 · 03 | Gate-Urteil; Eval-Ergebnis |
| "Kein Agent bewegt Geld über einen festgelegten Betrag hinaus ohne die Entscheidung einer Person" | `human_approval_above_eur` | 04 | Genehmigungsprotokoll |
| "katastrophales Risiko nur mit expliziter Akzeptanz des Leitungsorgans" | Überschreibungsregel; `critical: governing-body` | 01 · 05 | Unterzeichnete Akzeptanz |
| "Kein Risiko wird auf unbestimmte Zeit akzeptiert" | `max_acceptance_days` | 05 | Akzeptanzablauf |

### Von Daten zu einem Gate

Das Gate läuft bei Bereitstellung (Schicht 01) über den Registereintrag (Schicht 02), die offenen
Risiken des Systems (Schicht 05) und seine neuesten Eval-Ergebnisse (Schicht 03). Sein Urteil nennt
die Risiko-ID, daher sagt die Evidenz, welches Risiko welche Freigabe gestoppt hat.

```
package risk.gate

import rego.v1

# Illustrative, not a claim of conformity. data.appetite is appetite.yaml;
# input holds the registry entry, the system's open risks and its eval results.

rank := {"low": 1, "medium": 2, "high": 3, "critical": 4}

tier := input.system.tier

deny contains "system has no known tier in the registry" if {
	not data.appetite.tolerance[tier]
}

# Residual above the tier's tolerance needs a current acceptance by the
# authority that the residual band requires.
deny contains msg if {
	some r in input.risks
	rank[r.residual.band] > rank[data.appetite.tolerance[tier]]
	not valid_acceptance(r, data.appetite.acceptance_authority[r.residual.band])
	msg := sprintf("%s: residual %s above %s tolerance, no valid acceptance", [r.id, r.residual.band, tier])
}

# Catastrophic-severity override: likelihood plays no part.
deny contains msg if {
	some r in input.risks
	r.residual.severity == 5
	not valid_acceptance(r, "governing-body")
	msg := sprintf("%s: severity 5 needs elimination or governing-body acceptance", [r.id])
}

# Eval floors by tier: missing evidence fails like bad evidence.
deny contains msg if {
	some metric, floor in data.appetite.eval_floor[tier]
	not input.evals[metric] >= floor
	msg := sprintf("%s: eval %s below the %s floor", [input.system.id, metric, tier])
}

valid_acceptance(r, role) if {
	r.acceptance.role == role
	time.parse_ns("2006-01-02", r.acceptance.expires) > time.now_ns()
}
```

Zwei Details sind wichtiger als die Syntax. Ein fehlendes Eval-Ergebnis schlägt wie ein niedriges
fehl, daher ist "wir haben es nicht gemessen" niemals ein Pass. Eine abgelaufene Akzeptanz zählt als
keine, daher erzwingt der Kalender die Überprüfung. Wie jede Schicht-01-Richtlinie wird sie mit
einer Fixture ausgeliefert, die verweigert werden muss, und einer, die bestehen muss
([Schicht 01](/bok/the-stack#layer-01-govern-as-code)).

## Risiko behandeln: die Minderungshierarchie

NIST listet die Antwortoptionen als Minderung, Übertragung, Vermeidung oder Akzeptanz auf [1]; die
Reihenfolge, in der Sie danach greifen, ist wichtiger. Arbeitssicherheit ordnet Kontrollen nach
Wirksamkeit (Beseitigung, Substitution, Konstruktion, Verwaltung, dann persönliche Schutzausrüstung)
und warnt davor, sich auf die letzte zu verlassen, wenn bessere Optionen existieren [21]. Die
KI-Verordnung setzt die gleiche Reihenfolge für Hochrisiko-Systeme fest: Risiko durch Design so weit
wie technisch machbar eliminieren oder reduzieren, dann Minderungs- und Kontrollmaßnahmen, dann
Information und, wo angemessen, Schulung für Betreiber [8]. NIST fügt hinzu, dass
Nicht-KI-Alternativen gewogen werden (MANAGE 2.1) [1].

| Stufe | Was es für KI bedeutet | Stack-Kontrolle | Muster | Evidenz |
|---|---|---|---|---|
| **1 Eliminieren** | Bauen Sie es nicht; entfernen Sie die Fähigkeit; lehnen Sie die Nutzung ab | Richtlinie verweigern; Blocklist für verbotene Nutzung; Tool nie gewährt | [Policy Card](/patterns/policy-card) | Ablehnungsurteil; fehlender Umfang im Register |
| **2 Ersetzen** | Gleiches Ziel, niedrigeres Risiko: eine Nicht-KI-Methode, ein einfacheres oder interpretierbares Modell, Abruf statt freie Generierung, Lesezugriff statt Schreibzugriff | Designdatensatz; engerer Registereintrag | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | Designentscheidung verknüpft mit der Risiko-ID |
| **3 Konstruieren** | Kontrollen, die ohne Verlassen darauf handeln, dass jemand sich erinnert | Eval Gate; Runtime Guardrail; Genehmigungsgate; Kill Switch | [Eval Gate in CI](/patterns/eval-gate-in-ci), [Runtime Guardrail](/patterns/runtime-guardrail), [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate), [Kill Switch](/patterns/kill-switch-circuit-breaker) | Eval-Ergebnisse; Guardrail-Ereignisse; Genehmigungsprotokolle |
| **4 Verwaltung** | Regeln für Menschen: Gebrauchsanweisungen, Schulung, Verfahren, Warnungen | Gebrauchsanweisungen; Kompetenz- und Schulungsaufzeichnungen | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Schulungsbestätigungen; versionierte Anweisungen |
| **5 Akzeptieren und überwachen** | Tragen Sie das, was übrig bleibt, bewusst und beobachten Sie es | Unterzeichnete Akzeptanz; Telemetrie; Überprüfungsdatum | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Akzeptanzdatensatz; Überwachungssignal |

Beseitigung hat eine rechtliche Untergrenze: Praktiken, die die KI-Verordnung verbietet, werden
eliminiert, nie behandelt oder akzeptiert [22]. **Übertragung** (Versicherung, vertragliche
Schadloshaltung) sitzt neben der Leiter, nicht darauf: Sie verschiebt die finanzielle Folge, nicht
den Schaden für die Person am anderen Ende der Entscheidung, daher ersetzt sie nie Stufen eins bis
vier, wo Menschen geschädigt werden können.

Vier Regeln verwandeln die Leiter in Praxis:

- **Arbeiten Sie von oben nach unten und schreiben Sie auf, warum.** Das Register verzeichnet,
  welche höheren Stufen berücksichtigt wurden und warum sie nicht machbar waren; eine Behandlung,
  die bei Stufe vier ohne diesen Datensatz beginnt, fällt durch die Überprüfung.
- **Konstruierte Kontrollen zählen nur mit Evidenz.** Ein Guardrail, das in einem Test nie ausgelöst
  wurde, oder ein Kill Switch, der nie ausgeübt wurde, ist bestenfalls Stufe vier.
- **Verwaltungskontrollen allein verschieben eine High-Bewertung nicht.** Prüfer neigen dazu,
  selbstbewusste Maschinenausgaben zu bestätigen; Aufsicht muss entworfen und gemessen werden
  ([menschliche Aufsicht entwerfen](/bok/the-stack#designing-human-oversight-article-14)).
- **Jede Stufe hinterlässt ein Residuum.** Die Leiter endet in Akzeptanz, nie in "gelöst".

> **In der Praxis (illustrativ)**
> Das erste Design von `csa-01`, dem Kundenservice-Assistenten aus Kapitel 04, gab ihm ein Tool, das
> Rückerstattungen ausstellte. Die Aufnahme bewertete das Szenario "eine injizierte Anweisung führt
> dazu, dass der Agent den falschen Betrag oder das falsche Konto erstattet" mit L4 und S3: High.
> Das Team ging die Leiter hinauf. Die Beseitigung von Rückerstattungen würde den Use-Case
> entfernen. Das Ersetzen eines schreibgeschützten Umfangs, bei dem der Agent eine Rückerstattung
> entwirft, die eine Person ausstellt, unterbrach den Weg zum Ereignis. Technische Kontrollen (ein
> Injektions-Guardrail, ein Injektionsresistenz-Eval-Gate, der Genehmigungsschritt) reduzierten die
> Wahrscheinlichkeit weiter. Das Residuum kam mit L2 und S3, Medium, heraus, akzeptiert vom
> Produkteigentümer für sechs Monate, ungültig, wenn die Eval-Punktzahl unter ihren Mindestwert
> fiel. Der schreibgeschützte Rückerstattungsumfang im Registereintrag von Kapitel 04 ist diese
> Entscheidung als Daten.

## Inhärentes Risiko, Restrisiko und wer akzeptiert es

**Inhärentes Risiko** ist die Bewertung, bevor eine Kontrolle berücksichtigt wird. **Restrisiko**
ist das "Risiko, das nach der Risikobehandlung verbleibt", in der ISO-abgeleiteten Definition, die
NIST übernimmt [1]. Die Lücke zwischen ihnen ist der Wert, der für die Kontrollen beansprucht wird;
eine große Lücke, die auf einer Kontrolle ruht, ist ein Single Point of Failure, der seinen eigenen
Test verdient.

Drei Texte machen das Restrisiko zu einer erstklassigen Ausgabe. Artikel 9 verlangt, dass "das
relevante Restrisiko, das mit jeder Gefahr verbunden ist, sowie das Gesamtrestrisiko" als akzeptabel
beurteilt werden [8]. MEASURE 2.6 verlangt, dass das negative Restrisiko innerhalb der Toleranz
bleibt und das System sicher ausfällt, und MANAGE 1.4 verlangt, dass Restrisiken für nachgelagerte
Erwerber und Endnutzer dokumentiert werden [1]. Eine Restrisikobewertung ist also auch ein
Transparenzartefakt: Sie gehört in die Einschränkungen der Model Card und die Betriebsanleitung,
nicht nur in das Register.

Eine Regel hält es ehrlich:
**Eine Restrisikobewertung berücksichtigt nur Kontrollen, deren IDs zu Nachweisen aus dem aktuellen Überprüfungszeitraum führen.**
Wenn die Eval seit der Modelländerung nicht ausgeführt wurde, kehrt die Restbewertung zur inhärenten
Bewertung zurück, bis dies geschieht.

### Wer darf akzeptieren

Akzeptanz ist eine Entscheidung mit einem Namen. Das Three Lines Model des Institute of Internal
Auditors gibt eine gemeinsame Arbeitsteilung: Die erste Linie liefert das Produkt und verwaltet sein
Risiko; die zweite Linie bietet Fachwissen, Unterstützung, Überwachung und Herausforderung bei
Risiken; die interne Revision bietet unabhängige Assurance; das Leitungsorgan gibt die Richtung vor
[23]. Das AI RMF fügt hinzu, dass die Geschäftsleitung die Verantwortung für Entscheidungen über
KI-Risiken übernimmt (GOVERN 2.3) [1].
[Kapitel 12](/bok/governance-program#risk-acceptance-and-exceptions) behandelt Ausschüsse und
Entscheidungsrechte; die folgende Tabelle ist der Teil, den ein Gate durchsetzen kann.

| Restrisiko-Band | Akzeptiert | Konsultiert (Herausforderung) | Maximale Dauer | Datensatz |
|---|---|---|---|---|
| **Niedrig** | Systemeigentümer | Keine erforderlich | 12 Monate | Registereintrag |
| **Mittel** | Product Owner | Zweite-Linie-Risiko | Sechs Monate | Unterzeichnete Akzeptanz mit Ungültigkeitsbedingung |
| **Hoch** | Risikoausschuss | Zweite Linie; Recht und Datenschutz, wenn Rechte betroffen sind | Drei Monate | Unterzeichnete Akzeptanz mit Begründung und Bedingungen |
| **Kritisch oder S5** | Leitungsorgan oder niemand | Zweite Linie; unabhängige Überprüfung | Ein Monat, erneuert nur mit neuen Nachweisen | Minute der Entscheidung, verknüpft mit der Risiko-ID |

Ein Akzeptanzdatensatz enthält die Person und Rolle, die Begründung, die Bedingungen, die ihn
ungültig machen (ein Überwachungssignal und sein Schwellenwert), das Datum und das Ablaufdatum.
Jedes Restrisiko wird von der Behörde akzeptiert, die sein Band benennt; das Gate blockiert nur,
wenn das Band über der Toleranz der Stufe liegt und keine gültige Akzeptanz vorhanden ist. Über
Medium sollte der Akzeptierer mindestens eine Ebene über dem Team sitzen, dessen Lieferdatum von der
Antwort abhängt.

> **Anti-Pattern** "Akzeptiert" als Status ohne Namen, Datum und Ablaufdatum. Das Register füllt
> sich mit Risiken, die niemand tragen wollte, und der erste Vorfall zeigt, dass die Akzeptanz eine
> Tabellenkalkulationsvorgabe war.

## Das Risikoregister als Nachweisdatensatz

Chapter 08 names a "risk register as code" as the artefact behind `Art. 9` and ISO/IEC 23894; this
section defines it. The register is the layer 05 evidence record of the whole loop: one versioned
file per risk, keyed to a registry id, every control reference resolving to an artefact that emits
evidence, every change reviewed like code. It answers Article 9's "documented" and is where an
auditor starts. Its closest standard shape is the plan of action and milestones (`POA&M`) in OSCAL's
assessment layer [24], into which a register can export its open treatments. A JSON Schema for
[a risk register entry](/resources/templates#schema-risk-register-entry), with a filled example, is on
the templates page.
### Registerschema

```yaml
# risk-register/csa-01/R-017.yaml (illustrative, not a claim of conformity)
id: R-017
system: csa-01                        # registry id (layer 02)
title: Injected instruction leads to a wrong refund
scenario:
  cause: instruction hidden in a customer message reaches the refund workflow
  event: a refund is proposed and issued for the wrong amount or account
  consequence: financial loss; customer harm; possible fraud report
source: {origin: external, category: adversary}
affected: [customers, finance-operations]
factors: {autonomy: drafts, exposure: public, reversibility: partial}
inherent: {likelihood: 4, severity: 3, band: high}
treatment:
  option: mitigate
  rung: substitute+engineer
  higher_rungs_considered: "eliminate rejected (refunds are the use case); substitute adopted (read-only scope)"
  controls:
    - scope.refunds.read-only           # registry scope (layer 02)
    - guardrail.input.injection.v3      # runtime guardrail (layer 04)
    - eval.injection-resistance.v4      # eval gate (layer 03)
    - approval.refund-issue             # human decision (layer 04)
residual: {likelihood: 2, severity: 3, band: medium}
owner: team-support-platform
acceptance:
  by: head-of-support-products
  role: product-owner
  date: 2026-09-18
  expires: 2027-03-17
  voided_if: "injection-resistance below 0.95, or approval override rate above 2%"
review: {cadence: semiannual, last: 2026-09-18, next: 2027-03-17}
rerate_on: [model-version-change, new-tool-grant, linked-incident, eval-regression]
links:
  evals: [injection-resistance.v4@csa-01@2026-09-18]
  incidents: []
  obligations: ["ISO/IEC 42001 6.1.3", "NIST AI RMF MANAGE 1.3"]
status: open
```

Drei Felder tun, was eine Tabellenkalkulation nicht kann. `treatment.controls`} führt zu Artefakten,
die Nachweise ausstellen, `treatment.higher_rungs_considered`} beweist, dass die Hierarchie
angewendet wurde, und `acceptance.voided_if`} lässt Telemetrie eine Akzeptanz beenden, ohne auf ein
Treffen zu warten.

### Betrieb des Registers

- **Kadenz nach Band, Auslöser nach Ereignis.** Die Bandtabelle setzt den Kalender; `rerate_on`}
  überschreibt ihn und erzwingt eine Neubewertung vor der nächsten Veröffentlichung.
- **Änderungen kommen als Pull Requests,** mit dem Nachweis im Diff, einem Zweite-Linie-Prüfer für
  High und höher, und einer Append-only-Historie.
- **Das Gate liest es,** also blockiert ein unakzeptiertes Restrisiko über der Toleranz die
  Veröffentlichung mit der Risiko-ID im Urteil.
- **Links laufen in beide Richtungen.** Ein Eval-Fehler öffnet oder bewertet ein Risiko neu; ein
  Vorfall verknüpft sich mit seinem Risiko, und das Risiko listet seine Evals und Vorfälle auf.
- **Messen Sie das Register, nicht seine Größe:** offene High- und Critical-Restrisiken, abgelaufene
  Akzeptanzen, Zeit vom Identifizieren eines Risikos bis zu einer Kontrolle in einem Gate, und der
  Anteil der Restrisikobewertungen, die durch aktuelle Nachweise gestützt werden
  ([Metriken pro Ebene](/bok/maturity-model#metrics-per-level)).

> **In der Praxis (illustrativ)**
> Eine Governance-Funktion verlagerte ihr Register aus einer Tabellenkalkulation in das Repository,
> das ihre Richtlinien enthält, eine Datei pro Risiko mit Registry-IDs verschlüsselt, und wies das
> Deploy-Gate darauf hin. Der erste Durchlauf blockierte zwei Veröffentlichungen aus demselben
> Grund: akzeptierte Risiken ohne benannten Akzeptierer und ohne Ablaufdatum. Niemand hatte
> beschlossen, sie zu tragen; die Tabellenkalkulation hatte. Innerhalb eines Vierteljahres hatte
> jedes offene High-Risiko entweder eine unterzeichnete, ablaufende Akzeptanz oder eine Kontrolle,
> deren Nachweise das Gate lesen konnte.

## Verhältnismäßige Governance: Anpassung der Schleife

Die Schleife ist überall gleich; ihre Intensität nicht. Das AI RMF setzt die Ebene der
Risikoaktivität nach Risikobereitschaft fest (GOVERN 1.3) [1]}. Die KI-Verordnung der EU verlangt
seit 2024, dass das Qualitätsmanagementsystem eines Hochrisiko-Anbieters der Größe seiner
Organisation entsprechend ist, während Anbieter "den erforderlichen Grad an Strenge und das
erforderliche Schutzniveau respektieren" [27]}. Das Digital-Omnibus fügt hinzu "insbesondere, wenn
der Anbieter ein KMU, einschließlich eines Start-ups, oder ein KMU ist", und öffnet das vereinfachte
technische Dokumentationsformular, das bisher auf KMU und Start-ups beschränkt war, für kleine
mittlere Unternehmen [9]}. US-Bankaufseher passen das Modellrisikomanagement jetzt an Profil, Größe
und Komplexität an [2]}.

### Die Anpassungsmatrix

Sechs Faktoren setzen die Intensität. Für jeden gibt die Matrix Mindestkontrollen, Gates und
Überprüfungsintensität an. Lesen Sie jede Zeile als Minimum; wenn zwei Zeilen zutreffen, gewinnt die
strengere.

| Faktor | Profil | Mindestkontrollen | Gates | Überprüfungsintensität |
|---|---|---|---|---|
| **Größe** | Team von einer Person, Start-up oder KMU | Register im Repo; Appetit als eine Datendatei; veröffentlichte Skalen | Nicht registrierte Systeme und offene Criticals ablehnen | Bei Änderung; Appetit jährlich |
| | Mittlere Größe, mehrere Produktteams | Register mit Registry-Schlüssel; Akzeptanzbehörden; Stakeholder-Karten aus Stufe 3 | Band gegen Tier-Toleranz; Eval-Gate aus Stufe 2 | Vierteljährlich; Zweite-Linie-Herausforderung für High |
| | Föderales Unternehmen | Zentraler Appetit, lokale Toleranzen; Register in Unternehmensrisiko zusammengefasst | Lokale Gates erben eine gemeinsame Richtlinienbibliothek | Monatlicher Ausschuss für High und Critical; Audit-Stichproben |
| **Sektor** | Allgemeiner Handel | Die Zeilen unten, nichts Zusätzliches | Wie gestaffelt | Wie gestaffelt |
| | Reguliert (Finanzen, Gesundheit, kritische Infrastruktur, öffentlicher Sektor) | Sektor-Overlay-Felder (unten); unabhängige Validierung für Stufen 3 und 4 | Sektor-Nachweise vor dem Deploy | Wie das Regime erwartet, nie weniger als gestaffelt |
| **Reife** (Kapitel 07) | Stufe 1 bis 2 | Register existiert und ist mit Registry-IDs verschlüsselt | Nicht registrierte Systeme ablehnen | Kalender-Überprüfungen |
| | Stufe 3 | Eval-Ergebnisse füllen die Wahrscheinlichkeit | Risikobericht in CI, nicht blockierend | Überprüfung bei jeder Veröffentlichung |
| | Stufe 4 bis 5 | Bänder in Gates kompiliert; Telemetrie bewertet neu | Bei unakzeptiertem Restrisiko ablehnen; Akzeptanzen machen sich selbst ungültig | Ereignisgesteuert plus Kalender |
| **Produkte und Dienstleistungen** | Stufe 1: internes Tool | Registereintrag, Eigentümer, akzeptable Nutzungsregeln | Registry-Gate | Jährlich |
| | Stufe 2: Entscheidungsunterstützung, eine Person überprüft jede Ausgabe | Plus Fähigkeits- und Missbrauch-Evals; Überwachungsmetriken | Eval-Gate | Alle sechs Monate |
| | Stufe 3: automatisierte Entscheidung über eine Person | Plus Fairness- und Robustness-Evals; FRIA oder DPIA, wo erforderlich; ein [contest channel](/patterns/decision-notice-contest-path) | Eval-Gate; kein Deploy ohne Akzeptanz bei High | Vierteljährlich |
| | Stufe 4: agentisch mit Schreibzugriff oder Echtzeit-High-Stakes | Plus Genehmigungsgates; begrenzte Identität; getesteter Kill Switch; Runtime-Guardrails | Plus Runtime-Durchsetzung | Monatlich und ereignisgesteuert |
| **Ziele** | Innovationsgeführt | Sandboxed Stufen 1 und 2 mit breiterer Toleranz; Minimum unverändert | Sandbox-Gates getrennt von Produktion | Häufig, leicht |
| | Risikoavers | Niedrigere Toleranzen; Akzeptanz eine Ebene höher | Höhere Eval-Mindestwerte | Schwerer, weniger häufig |
| | Missionsgeführt (öffentlicher Dienst, Gesundheit) | Konsultation betroffener Gruppen ab Stufe 3 | Impact-Assessment-Gate | Umfasst Input betroffener Gruppen |
| **Risikotoleranz** | Niedrig | Toleranz `low`} ab Stufe 2; höhere Eval-Mindestwerte | Mehr ablehnen, höher akzeptieren | Kürzere Akzeptanzperioden |
| | Höher | Toleranz `medium`} für Stufen 1 und 2 | Wie gestaffelt | Wie gestaffelt; das S5-Override unverändert |

Ein Team von einer Person sollte nicht versuchen, all dies durchzuführen: Beginnen Sie mit dem
dünnen vertikalen Schnitt aus Kapitel 04
([the minimum viable stack](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)) plus das
Register und ein Gate, und fügen Sie Zeilen hinzu, wenn die Organisation und ihre Exposition
wachsen.

### Sektor-Overlays

NIST sagt Organisationen, dass sie den Risikokriterien, Toleranzen und Reaktionen folgen sollen, die
ihr Sektor bereits setzt [1]}. Ein Overlay fügt Registerfelder und Gates hinzu, nicht ein zweites
Register.

| Sektor | Bestehendes Regime zur Integration mit | Was es zur Schleife hinzufügt |
|---|---|---|
| Bank- und Finanzwesen | Modellrisikomanagement-Leitlinien; in den USA, SR 26-2 (17. Apr 2026), die SR 11-7 ablöste und für Bankorganisationen mit mehr als USD 30 Milliarden Gesamtvermögen am relevantesten ist [2] | Unabhängige Validierung vor der Verwendung und ein Modellbestand mit Risikobewertungen, wie in der Modellrisiko-Tradition; Intensität auf Größe und Komplexität abgestimmt |
| Medizinische Geräte und Gesundheit | ISO 14971:2019, Risikomanagement für Medizinprodukte [25]; die Route der KI-Verordnung über Annex I mit Hochrisiko-Pflichten für eingebettete Systeme ab 2. August 2028 [10] | Gefahrenbasiertes Register; Nutzen-Risiko-Bewertung; Beobachtung nach dem Inverkehrbringen mit Neubewertung |
| Industrie und sicherheitskritisch | Funktionale-Sicherheits-Praxis; ISO/IEC TR 5469:2024 zu KI in sicherheitsbezogenen Funktionen und Nicht-KI-Funktionen, die KI-gesteuerte Ausrüstung sicher halten [26] | Sicherheitsanforderungen pro Funktion; Nicht-KI-Sicherheitsfunktionen als Stufe-drei-Kontrollen |
| Öffentlicher Sektor | FRIA-Pflicht, wenn Behörden oder private Einrichtungen, die öffentliche Dienste erbringen, Hochrisiko-Systeme einsetzen [17] | Obligatorische Zuordnung betroffener Gruppen; Beschwerdeverfahren und interne Governance-Regelungen als Maßnahmen |

### Das Fundament, das sich nicht wegoptimieren lässt

Einige Kontrollen sind gleich in jeder Größe, in jedem Sektor und auf jeder Reifestufe:

- Jedes KI-System in Produktion hat einen Registereintrag, einen Eigentümer und eine Stufe.
- Verbotene Praktiken werden beseitigt, nie behandelt oder akzeptiert [22].
- Jedes S5-Szenario führt die Außerkraftsetzung bei katastrophaler Schwere aus.
- Jedes akzeptierte Risiko hat einen benannten Akzeptanten, eine Aufhebungsbedingung und ein
  Ablaufdatum.
- Jeder Vorfall ist mit einem Risiko verknüpft, existierend oder neu.
- Jeder Agent, der handelt, hat seine eigene Identität und einen getesteten Kill Switch.

## Risiko, Reife und Vorfälle

### Risikomanagement-Praxis nach Reifestufe

Risikomanagement-Praxis ist keine sechste Zeile im Reifegradmodell; sie ist eine Perspektive auf
alle fünf Schichten, und die Schwächste-Schicht-Regel aus Kapitel 07 gilt auch für sie
([die fünf Stufen](/bok/maturity-model#the-five-levels)).

| Stufe | Risikomanagement-Praxis, die Sie zeigen können | Evidenz |
|---|---|---|
| **1 Dokumentiert** | Ein manuell gepflegtes Register; eine Appetit-Erklärung; definierte Skalen | Die Registerdatei; genehmigte Skalen |
| **2 Inventarisiert** | Jedes Risiko mit einer Registry-ID verknüpft; nicht registrierte Systeme als unbewertetes Risiko gekennzeichnet | Die Verknüpfung zwischen Register und Registry; Erkennungsbericht |
| **3 Getestet** | Wahrscheinlichkeitsbewertungen zitieren Eval-Ergebnisse; Red-Team-Erkenntnisse eröffnen neue Risiken | Eval-IDs in Register-Links |
| **4 Erzwungen** | Toleranzen werden in Gates kompiliert; eine abgelaufene Akzeptanz blockiert die Bereitstellung | Gate-Urteile, die Risiko-IDs zitieren |
| **5 Kontinuierlich** | Telemetrie bewertet Risiken neu; Akzeptanzen heben sich selbst auf, wenn ihre Bedingung fehlschlägt | Bewertungsverlauf angetrieben durch Laufzeit-Signale |

### Vorfälle sind realisierte Risiken

Ein Vorfall ist ein Risiko, das sich materialisiert hat, oder eines, das niemand identifiziert hat.
Wenn es einem Registereintrag entspricht, ist es Wahrscheinlichkeitsevidenz: die Bewertung wird neu
berechnet und, wenn die Aufhebungsbedingung ausgelöst wurde, verfällt die Akzeptanz. Wenn es nichts
entspricht, eröffnet es einen neuen Eintrag, die Antwort des AI RMF auf ein zuvor unbekanntes Risiko
(MANAGE 2.3) [1], und fragt, warum die Intake es verpasst hat.

Die Schwere-Skala verbindet die beiden. Da S4 und S5 die Kategorien schwerwiegender Vorfälle der
KI-Verordnung abdecken [3], benennt ein dort bewerteter Eintrag bereits den Meldepfad, und die
[Incident Pipeline](/patterns/incident-pipeline) kann die `Art. 73`-Uhr von der Risiko-ID aus
starten (Fristen in [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus)). Artikel 9 schließt
die Schleife von der anderen Seite: Risiken, die sich aus Daten der Beobachtung nach dem
Inverkehrbringen ergeben, werden im Risikomanagementsystem bewertet [8]. MANAGE 4.3 fügt hinzu, dass
Vorfälle an relevante KI-Akteure, einschließlich betroffener Gemeinschaften, mitgeteilt werden [1].
[Kapitel 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) behandelt den
Vorfall-Lebenszyklus; dieses Kapitel besitzt die Verknüpfung.

Zwei Maßnahmen zeigen, ob die Verknüpfung funktioniert. Die **Identifikations-Trefferquote** ist der
Anteil der Vorfälle, die einem bereits existierenden Risiko entsprachen; eine niedrige Quote
bedeutet, dass die Intake Quellen verpasst. Die **Neubewertungs-Verzögerung** ist die Zeit von einem
Vorfall zur neu berechneten Bewertung; eine lange Verzögerung bedeutet, dass das Register die
Vergangenheit aufzeichnet.

**Zuordnung:** KI-Verordnung der EU `Art. 9` (Risikomanagementsystem), `Art. 17(2)`
(Verhältnismäßigkeit), `Art. 26`, `Art. 27` (FRIA), `Art. 72`, `Art. 73` · ISO 31000 · ISO/IEC 23894
· ISO/IEC 42001 (6.1.2, 6.1.3, 8.2, 8.3) · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP
Agentic ASI01–ASI10 · alle fünf Schichten des Stack. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Veröffentlichen Sie die Skalen.** Schreiben Sie fünf-Stufen-Definitionen für Wahrscheinlichkeit
   und Schwere für Ihren Kontext, mit S5 an die Kategorien schwerwiegender Vorfälle ausgerichtet und
   der Außerkraftsetzung bei katastrophaler Schwere angegeben. Eine Seite, versioniert neben Ihren
   Richtlinien.
2. **Kompilieren Sie eine Appetit-Zeile.** Setzen Sie Toleranz nach Stufe in eine Datendatei und
   lassen Sie ein Deploy-Gate sie lesen: verweigern, wenn ein System ein offenes Critical oder ein
   unakzeptiertes Residuum über seiner Stufe trägt.
3. **Verknüpfen Sie das Register mit der Registry.** Für Ihre drei höchsten Stufen-Systeme
   verschieben Sie ihre Top-Risiken in Dateien, die mit Registry-IDs verknüpft sind, jeweils mit
   inhärenten und residualen Bewertungen, Kontrollen, die sich zu Evidenz auflösen, einem Eigentümer
   und einem Ablaufdatum.
4. **Finden Sie die Waisen.** Listen Sie jedes akzeptierte Risiko ohne benannten Akzeptanten oder
   ohne Ablaufdatum auf, und jeden Vorfall des letzten Quartals ohne verknüpftes Risiko. Beide
   Listen sind das Backlog des nächsten Monats.
5. **Ordnen Sie die Stakeholder eines Systems zu.** Für das System mit der breitesten Exposition
   benennen Sie die betroffenen Nicht-Benutzer und schreiben Sie auf, wie ihre Sicht das Register
   erreicht.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (§1.1 risk; §1.2.2 risk tolerance; §1.2.3 prioritisation, "cease in a safe manner", residual risk; Core tables 1 to 4; §6 profiles). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[2] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC, FDIC; supersedes SR 11-7 and SR 21-8; tailored to risk profile, size and complexity; most relevant above USD 30 billion in assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (points 2 "risk", 13 "reasonably foreseeable misuse", 49 "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[4] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[5] ISO 31000:2018, Risk management: Guidelines (stage 90.92, to be revised; ISO/CD 31000 under development as of 2026-09-24). ISO/TC 262. 2018-02. https://www.iso.org/standard/65694.html (verified: primary)
[6] ISO/IEC 23894:2023, Artificial intelligence: Guidance on risk management. ISO/IEC JTC 1/SC 42. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[7] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (draft for comment; function to clause mapping). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2) steps; 9(5) residual risk and order of measures; 9(8) "prior defined metrics and probabilistic thresholds"; 9(9) minors and vulnerable groups). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[9] Regulation (EU) 2026/1744, Digital Omnibus on AI (Art. 9 not amended; Art. 1 point (10): Art. 11(1) simplified technical-documentation form extended to SMCs; Art. 1 point (11): Art. 17(2) replaced to name SMEs, start-ups and SMCs). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] "AI Omnibus enters into force" (Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[11] Risk management in the Artificial Intelligence Act (J. Schuett; Art. 9 of the 2021 proposal; Eur. J. Risk Regul. 15 (2024) 367-385). arXiv 2212.03109. 2024. https://arxiv.org/abs/2212.03109 (verified: primary)
[12] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[13] ISO/IEC 42001:2023, Artificial intelligence: Management system (6.1.2 AI risk assessment, 6.1.3 AI risk treatment, 6.1.4 AI system impact assessment; 8.2 to 8.4). ISO/IEC JTC 1/SC 42. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[14] Generative Artificial Intelligence Profile, NIST AI 600-1 (12 GAI risks; grouping in footnote 5). NIST. 2024-07. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (verified: primary)
[15] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[16] The AI Risk Repository (v3; 74 frameworks, 1,725 risks; human decisions 38%, AI systems 42%) (arXiv 2408.12622). P. Slattery et al., MIT. 2026-05-05. https://arxiv.org/abs/2408.12622 (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA: who performs it; elements (a) to (f)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[18] IEC 31010:2019, Risk management: Risk assessment techniques. IEC / ISO/TC 262. 2019-06. https://www.iso.org/standard/72140.html (verified: primary)
[19] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[20] GPAI Code of Practice, Safety and Security chapter, Commitment 4 (systemic risk acceptance determination; Measure 4.2). code-of-practice.ai. 2025-07-10. https://code-of-practice.ai/?section=safety-security (verified: secondary)
[21] Hierarchy of Controls. CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[22] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5 (prohibited AI practices, as amended by the Digital Omnibus, Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[23] The IIA's Three Lines Model: an update of the Three Lines of Defense. The Institute of Internal Auditors. 2020-09-08. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[24] OSCAL native model (assessment layer incl. POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[25] ISO 14971:2019, Medical devices: Application of risk management to medical devices. ISO/TC 210. 2019-12. https://www.iso.org/standard/72704.html (verified: primary)
[26] ISO/IEC TR 5469:2024, Artificial intelligence: Functional safety and AI systems. ISO/IEC JTC 1/SC 42. 2024-01. https://www.iso.org/standard/81283.html (verified: primary)
[27] Regulation (EU) 2024/1689 (AI Act), text as published in the Official Journal (OJ L, 12.7.2024), Art. 17(2) (quality management system proportionate to the size of the provider's organisation; providers "shall, in any event, respect the degree of rigour and the level of protection required"). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#art_17 (verified: primary)
