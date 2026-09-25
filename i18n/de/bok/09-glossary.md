---
lang: de
source: bok/09-glossary.md
sourceHash: "74f57d118a1f998ca0b0ad563a37274cb81318c198299053529a104759296753"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 09. Glossar

> Die kanonischen Definitionen für das Buch: jeder Begriff einmal definiert, alphabetisch und
> querverwiesen auf das Kapitel, das ihn vollständig behandelt.

Begriffe sind alphabetisch unter Buchstabenüberschriften aufgelistet, und jede Definition ist
höchstens 60 Wörter lang. Wenn ein Begriff eine kanonische Schreibweise im Stilhandbuch hat (§8),
wird diese Schreibweise hier und überall im Buch verwendet. Ein Begriff aus einem Gesetz, einer Norm
oder einem Papier trägt eine `[n]`}-Zitierung zu seiner Quelle; ein Begriff, den das Buch prägt,
trägt keine, und sein Kapitel ist seine Quelle. Rechtliche Definitionen werden paraphrasiert, und
der zitierte Text ist maßgeblich. "Kontrast mit" nennt die Begriffe, mit denen er am häufigsten
verwechselt wird, "Siehe" verlinkt den Abschnitt, der ihn entwickelt, und die Klammer listet die
Kapitel auf, die ihn behandeln. Jeder Begriff hat auch seine eigene Seite, verlinkt von seinem
Namen, mit seinen Quellen, den Kapiteln, die ihn verwenden, und einem fertigen Zitat.

## Häufig verwechselte Paare

Zehn Paare werden in Bewertungen häufig genug verwechselt, um sie im Vokabular eines Teams zu
korrigieren. Jede Begriffsseite trägt denselben Vergleich.

| Paar | Der Unterschied | Warum es für Kontrollen wichtig ist |
|---|---|---|
| [Transparenz](/glossary/transparency) und [Erklärbarkeit](/glossary/explainability) | Was passiert ist, aus Aufzeichnungen dessen, was lief, gegen wie eine Entscheidung getroffen wurde | Zwei Artefakte: Registry, Cards und Logs für das erste; eine Erklärungsmethode mit einem Treutest für das zweite |
| [Datenherkunkt](/glossary/data-provenance) und [Datenlineage](/glossary/data-lineage) | Woher die Daten kamen und unter welchen Bedingungen, gegen den Weg, den sie durch deine eigenen Pipelines nahmen | Perfekte Lineage über unbekannte Herkunft ist immer noch ungoverned; Löschung und Disgorgement brauchen beide |
| [Datendrift](/glossary/data-drift) und [Concept Drift](/glossary/concept-drift) | Die Eingaben ändern sich, gegen die Beziehung zwischen Eingaben und der richtigen Antwort ändert sich | Das erste zeigt sich in Input-Monitoren, bevor Labels ankommen; das zweite nur in Ergebnissen auf frischen Labels |
| [KI-Vorfall](/glossary/ai-incident) und [Problem (versus Vorfall)](/glossary/issue-versus-incident) | Schaden ist eingetreten, gegen einen Defekt oder eine Abweichung, die kein schädliches Ereignis produziert hat | Vorfälle starten Meldungsuhren und CAPA; Probleme gehen an ein verfolgtes Backlog mit einem Besitzer und einem Fälligkeitsdatum |
| [Anbieter](/glossary/provider) und [Betreiber](/glossary/deployer) | Entwickelt das System und bringt es unter seinem eigenen Namen auf den Markt, gegen nutzt es unter seiner eigenen Autorität | Unterschiedliche Pflichten und unterschiedliche Nachweise; eine wesentliche Änderung kann einen Betreiber zum Anbieter machen |
| [Human-in-the-Loop (HITL)](/glossary/human-in-the-loop-hitl) und [Human-on-the-Loop (HOTL)](/glossary/human-on-the-loop-hotl) | Eine Person genehmigt jede folgenreiche Entscheidung, gegen eine Person überwacht und kann das System stoppen | HITL wird durch Genehmigungsprotokolle und Override-Raten evidenziert; HOTL durch Benachrichtigungen und einen getesteten Stoppweg |
| [Risikoappetit](/glossary/risk-appetite) und [Risikotoleranz](/glossary/risk-tolerance) | Wie viel Risiko die Organisation insgesamt eingehen wird, gegen das Residualband, das ein System tragen darf | Appetit ist eine Vorstandserklärung, die zu Daten kompiliert wird; Toleranz ist der Schwellenwert, den ein Deploy Gate liest |
| [Model Card](/glossary/model-card) und [System Card](/glossary/system-card) | Dokumentation eines Modells, gegen die des bereitgestellten Systems: Modelle, Prompts, Retrieval, Tools, Guardrails und Aufsicht | Betreiber und Behörden brauchen die Systemansicht; eine Model Card allein verfehlt die Kontrollen um das Modell |
| [Prompt-Injection](/glossary/prompt-injection) und [Jailbreak](/glossary/jailbreak) | Jede Eingabe, die das Verhalten auf unbeabsichtigte Weise ändert, direkt oder versteckt in verarbeitetem Inhalt, gegen Eingaben, die darauf abzielen, die Sicherheitsregeln fallen zu lassen | Jailbreak-Evals testen Verweigerungen; Injection braucht auch Least-Privilege-Tools und Isolation von nicht vertrautem Inhalt |
| [Pseudonymisierung](/glossary/pseudonymisation) und [anonyme Daten](/glossary/anonymous-data) | Mit separat aufbewahrten Informationen wieder zuordenbar, daher immer noch personenbezogene Daten, gegenüber nicht auf eine identifizierbare Person bezogen | Pseudonymisierte Daten unterliegen jeder DSGVO-Pflicht; ein Anonymitätsanspruch benötigt eine datierte Bewertung |

## A

**A2A (Agent2Agent protocol).** Ein offenes Protokoll für Agenten, um Aufgaben untereinander zu
übergeben, seit März 2026 in Version 1.0 [129] und seit August 2026 ein Growth-Stage-Projekt der von
der Linux Foundation geleiteten Agentic AI Foundation [130]. Server müssen jede Anfrage
authentifizieren, aber Autorisierung sowie Umfang und Widerruf der während einer Aufgabe gewährten
Befugnisse bleiben dem Implementierer überlassen [129]. Vergleiche mit [MCP](/glossary/mcp). Siehe
[Kap. 23, Multi-agent systems and delegation chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(Kap. 23)

**Abstention band.** Ein Bereich von Scores, in dem ein System nicht eigenständig handelt, sondern
den Fall an einen menschlichen Prüfer weiterleitet. Seine Breite wird durch die Risikostufe
festgelegt; die Bandbreite und die Außerkraftsetzungsquote der Prüfer werden als Signale überwacht.
Conformal prediction bietet eine Möglichkeit, sie zu dimensionieren [20]. Siehe
[Kap. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier).
(Kap. 11)

**Acceptable-use policy (AUP).** Die mitarbeiterbezogenen Regeln für die Nutzung von KI-Tools:
welche Tools genehmigt sind, welche Datenklassen wohin dürfen, Pflichten zur Überprüfung und
Offenlegung von Ausgaben, Protokollierung, Bestätigung vor dem Zugriff und Konsequenzen. Sie wird
durch ein Sanctioned AI Gateway und Discovery durchgesetzt, nicht nur durch das Handbuch. Siehe
[Kap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff);
[Kap. 05, Pattern: Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway). (Kap. 05, 12)

**Adaptiveness.** Die Fähigkeit eines KI-Systems, sein Verhalten während der Nutzung durch Lernen
nach der Bereitstellung zu ändern; optional unter der Definition der KI-Verordnung der EU [21]. Für
die Governance ist es ein Änderungsauslöser unter mehreren: Die meisten Verhaltensänderungen in der
Praxis entstehen durch Anbieterupdates, Drift, Prompt-Änderungen oder Corpus-Aktualisierungen. Siehe
[Kap. 11, From definition element to registry field](/bok/ai-defined#from-definition-element-to-registry-field).
(Kap. 11)

**ADMT (California).** Automated decisionmaking technology gemäß den California-CCPA-Bestimmungen:
Technologie, die personenbezogene Informationen verarbeitet und Berechnung nutzt, um menschliche
Entscheidungsfindung zu ersetzen oder wesentlich zu ersetzen. Die Verwendung für bedeutende
Entscheidungen löst Pflichten zur Vorankündigung, zum Opt-out oder zur Berufung, zum Zugriff und zur
Risikobewertung aus [22]. Vergleiche mit
[Automated decision-making (ADM)](/glossary/automated-decision-making-adm). Siehe
[Kap. 19, United States](/bok/privacy-and-ai#united-states). (Kap. 19)

**Adverse action notice.** Die Mitteilung, die ein US-Kreditgeber geben muss, wenn er Kredit
verweigert oder verschlechtert, mit Angabe der spezifischen Hauptgründe [23]. Die Gründe müssen
genau sein, auch wenn die Entscheidung aus einem komplexen Modell stammt, daher benötigen
Ursachencodes einen Treutest. Vergleiche mit [Decision notice](/glossary/decision-notice). Siehe
[Kap. 20, Credit and lending](/bok/existing-law#credit-and-lending). (Kap. 16, 20)

**Adverse-impact ratio (AIR).** Die Auswahlquote einer Gruppe geteilt durch die Auswahlquote der am
häufigsten ausgewählten Gruppe. Nach den US-Uniform Guidelines wird ein Verhältnis unter vier
Fünfteln allgemein als Nachweis von Adverse Impact behandelt [24]; die Ingenieurspraxis liest es als
Auslöser für eine Untersuchung, berichtet mit Zählungen und einem Konfidenzintervall. Siehe
[Kap. 16, The four-fifths rule and the adverse-impact ratio](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio).
(Kap. 16)

**AESIA.** Spaniens Agencia Española de Supervisión de Inteligencia Artificial, eine Staatsbehörde
mit Sitz in A Coruña, deren Statut durch Königliches Dekret 729/2023 genehmigt wurde, gegründet, um
als Spaniens nationale Aufsichtsbehörde für die KI-Verordnung zu fungieren [1]. Siehe
[Kap. 21, Spain: AESIA, the sandbox and a bill](/bok/ai-laws-worldwide#spain-aesia-the-sandbox-and-a-bill).
(Kap. 08, 21)

**Agent (agentic AI).** Ein KI-System, das unter delegierter Befugnis handelt (browsert, Code
ausführt, APIs aufruft, Daten verschiebt oder an andere Agenten delegiert), anstatt nur Text zu
produzieren. Agenten sind das schwierigste Objekt zu regeln, da ihr Verhalten emergent ist und ihre
Aktionen externe Auswirkungen haben. Siehe
[Kap. 23, What makes an agent a governance object](/bok/governing-agents#what-makes-an-agent-a-governance-object);
[Kap. 11, Agentic systems](/bok/ai-defined#agentic-systems). (Kap. 01, 11, 23)

**Agent Card.** Das JSON-Dokument, das ein A2A-Agent normalerweise unter
`/.well-known/agent-card.json` veröffentlicht und seine Identität, Fähigkeiten, Service-Endpunkt und
die Authentifizierungsschemas beschreibt, die er akzeptiert. Es kann mit JWS über eine kanonisierte
Form signiert werden, sodass ein Client überprüfen kann, dass die Karte unverfälscht ist und vom
behaupteten Anbieter stammt [129]. Eine Peer-Allowlist lässt nur registrierte Agenten mit
verifizierten Karten zu. Siehe
[Kap. 23, Multi-agent systems and delegation chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(Kap. 23)

**Agent registry.** Das laufzeitbewusste Verzeichnis jedes nicht-menschlichen Akteurs (Modell,
Service und Agent), jeweils mit einem Besitzer, einem deklarierten Umfang, einem Status und einem
Kill Switch, gespeist durch einen Laufzeit-Datenpfad statt manuell eingegeben. Es ist das Artefakt,
das die Frage "welche KI läuft?" beantwortet. Siehe
[Kap. 23, The agent registry](/bok/governing-agents#the-agent-registry);
[Kap. 05, Pattern: Agent Registry](/bok/patterns#pattern-agent-registry). (Kap. 04, 05, 06, 23)

**AI Act (EU).** Verordnung (EU) 2024/1689, das horizontale, risikostaffelte Gesetz der EU für KI,
geändert durch das Digital Omnibus [2]. Es klassifiziert Systeme nach Risiko (verboten, Hochrisiko,
begrenzt, minimal) und erlegt entsprechend Verpflichtungen auf. Siehe
[Kap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (Kap. 08, 18)

**AI business operator (Korea).** Nach dem koreanischen AI Basic Act eine juristische Person,
Organisation, Einzelperson oder staatliche Stelle, die KI-Geschäfte betreibt, aufgeteilt in
Entwicklungsgeschäftsbetreiber, die KI entwickeln und bereitstellen, und Nutzungsgeschäftsbetreiber,
die darauf aufgebaute Produkte oder Dienstleistungen anbieten [25]. Siehe
[Kap. 18, The same roles across regimes](/bok/eu-ai-act#the-same-roles-across-regimes). (Kap.
18, 21)

**AI governance committee.** Das funktionsübergreifende Gremium, das die Entscheidungen trifft, die
ein Gate nicht kann: Annahme von Restrisiko über die Befugnis eines Produkteigentümers hinaus,
Gewährung von Ausnahmen, Abwägung von Wertkompromissen und Genehmigung des Richtliniensatzes. Es
entscheidet; die Gates der Pipeline setzen seine Entscheidungen durch und dokumentieren die
Nachweise. US-Bundesbehörden führen solche Boards per Mandat [26]. Siehe
[Kap. 12, The committee decides, the gates enforce](/bok/governance-program#the-committee-decides-the-gates-enforce).
(Kap. 12)

**AI governance engineer.** Die Person, die die Fähigkeit der KI-Governance-Engineering hält und für
die drei Fragen in der Produktion verantwortlich ist; eine Fähigkeit und eine Rolle, nicht unbedingt
eine Jobbezeichnung. Siehe
[Kap. 06, Capability first, title second](/bok/the-role#capability-first-title-second). (Kap. 06)

**AI governance engineering.** Die Anwendung von Engineeringpraxis (Systemdenken, Produktdenken und
Code) auf die Governance von KI-Systemen; gemessen an tatsächlicher Risikominderung und auditfähigen
Nachweisen. Vergleiche mit [Trustworthy AI](/glossary/trustworthy-ai). Siehe
[Kap. 01, The definition](/bok/definition#the-definition). (Kap. 01)

**AI harm.** Eine negative Folge des Aufbaus oder der Nutzung eines KI-Systems für eine Person, eine
Gruppe, eine Organisation, die Gesellschaft oder die Umwelt. Das Buch benennt jeden Schaden nach der
Ebene, auf der er landet, seinem Mechanismus, einem testbaren Fehlermodus und der Kontrolle, die ihn
erfasst, abgebildet auf die MIT AI Risk Repository-Taxonomie [27]. Siehe
[Harms atlas](/resources/harms). (Kap. 03)

**AI hazard.** Nach der Definition der OECD ein Ereignis oder eine Serie von Ereignissen, bei denen
die Entwicklung, Nutzung oder Fehlfunktion eines KI-Systems plausibel zu einem KI-Incident führen
könnte [28]. Ein Hazard ist Schaden, der noch nicht eingetreten ist; ein Near Miss ist ein Hazard,
den eine Kontrolle unterbrochen hat. Vergleiche mit [AI incident](/glossary/ai-incident). Siehe
[Kap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(Kap. 17)

**AI incident.** Nach der Definition der OECD ein Ereignis oder eine Serie von Ereignissen, bei
denen die Entwicklung, Nutzung oder Fehlfunktion eines oder mehrerer KI-Systeme direkt oder indirekt
zu Schaden an Gesundheit, kritischer Infrastruktur, menschlichen oder grundlegenden Rechten,
Eigentum, Gemeinschaften oder der Umwelt führt [28]. Vergleiche mit
[Issue (versus incident)](/glossary/issue-versus-incident), [AI hazard](/glossary/ai-hazard) und
[Serious incident](/glossary/serious-incident). Siehe
[Kap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(Kap. 17)

**AI literacy.** Nach der KI-Verordnung der EU die Fähigkeiten, Kenntnisse und das Verständnis, die
es Anbietern, Betreibern und betroffenen Personen ermöglichen, KI auf informierte Weise zu nutzen
und ihre Chancen, Risiken und möglichen Schäden zu erfassen. Artikel 4, wie 2026 geändert,
verpflichtet Anbieter und Betreiber, Maßnahmen zu ergreifen, um sie zu unterstützen, ohne ein
individuelles Niveau zu garantieren [2]. Siehe
[Kap. 18, AI literacy and bias-detection data](/bok/eu-ai-act#ai-literacy-and-bias-detection-data);
[Kap. 12, AI literacy as code](/bok/governance-program#ai-literacy-as-code). (Kap. 12, 18)

**AI Office.** Das Organ der Europäischen Kommission, das KI mit allgemeinem Verwendungszweck
beaufsichtigt und die Durchsetzung der KI-Verordnung koordiniert, mit Ermittlungsbefugnissen und der
Möglichkeit, Bußgelder gegen GPAI-Anbieter zu verhängen [2]. Siehe
[Kap. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (Kap. 08, 18)

**AI regulatory sandbox.** Nach der KI-Verordnung der EU ein von einer zuständigen Behörde
eingerichteter kontrollierter Rahmen, in dem Anbieter innovative KI-Systeme für begrenzte Zeit unter
einem Sandbox-Plan entwickeln, trainieren, testen und validieren, möglicherweise mit Tests unter
Realbedingungen. Jeder Mitgliedstaat muss bis zum 2. August 2027 einen operativen haben [2].
Vergleiche mit [Testing in real-world conditions](/glossary/testing-in-real-world-conditions). Siehe
[Kap. 18, Sandboxes and real-world testing](/bok/eu-ai-act#sandboxes-and-real-world-testing). (Kap.
18, 21)

**AI RMF functions.** Die vier Kernfunktionen des NIST AI Risk Management Framework
(**Govern, Map, Measure, Manage**), die im gesamten Buch als Abbildungsziel für Kontrollen verwendet
werden [3]. Siehe
[Kap. 22, The Core: 19 categories](/bok/principles-and-standards#the-core-19-categories). (Kap.
08, 22)

**AI RMF Playbook.** NISTs Online-Begleiter zum AI RMF. Für jede Unterkategorie gibt es eine
About-Notiz, vorgeschlagene Aktionen, Transparenz- und Dokumentationsfragen sowie Referenzen [29].
Es ist freiwilliges Material zum Anpassen, keine Checkliste; seine Dokumentationsfragen
funktionieren gut als Akzeptanzkriterien. Siehe
[Kap. 22, How a Playbook entry is structured](/bok/principles-and-standards#how-a-playbook-entry-is-structured).
(Kap. 22)

**AI RMF profile.** Eine Anwendung des AI RMF Core auf einen Kontext. NIST beschreibt
Use-Case-Profile, zeitliche Profile (ein aktuelles und ein Zielprofile, deren Lücke die Arbeit
leitet) und sektorübergreifende Profile wie NIST AI 600-1 für generative KI [30]. Siehe
[Kap. 22, Profiles and the Generative AI Profile](/bok/principles-and-standards#profiles-and-the-generative-ai-profile).
(Kap. 22)

**KI-System.** Für die Governance das Objekt, das die KI-Definition in den Geltungsbereich bringt.
Nach der KI-Verordnung der EU ein maschinengestütztes System, das mit einer gewissen Autonomie
arbeitet, möglicherweise adaptiv nach der Inbetriebnahme, und aus seinen Eingaben ableitet, wie es
Ausgaben erzeugt, die physische oder virtuelle Umgebungen beeinflussen können [2][21]. Die Inferenz
unterscheidet es von regelbasierter Software. Siehe
[Kap. 11, Four definitions, compared](/bok/ai-defined#four-definitions-compared);
[Kap. 18, What counts as an AI system](/bok/eu-ai-act#what-counts-as-an-ai-system). (Kap. 11, 18)

**KI-System-Folgenabschätzung.** Eine Bewertung, wie ein KI-System und seine vorhersehbaren
Anwendungen Einzelpersonen, Gruppen und die Gesellschaft beeinflussen können, durchgeführt über den
gesamten Lebenszyklus und bei Bedarf aktualisiert; ISO/IEC 42005:2025 gibt die Anleitung [17].
Unterscheiden Sie von [FRIA](/glossary/fria). Siehe
[Kap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(Kap. 14)

**KI-System-Lebenszyklus (OECD).** Die iterativen Phasen eines KI-Systems nach der OECD: Planung und
Gestaltung; Datenerfassung und -verarbeitung; Modellentwicklung oder -anpassung; Test, Evaluierung,
Verifizierung und Validierung; Inbetriebnahme; Betrieb und Überwachung; Stilllegung oder
Außerbetriebnahme [31]. Die Stilllegung kann zu jedem Zeitpunkt während des Betriebs erfolgen. Siehe
[Kap. 22, The OECD AI system definition and lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle).
(Kap. 22)

**KI-Washing.** Übertreibung oder Erfindung der Nutzung oder Fähigkeit von KI in Marketing- oder
Investorenkommunikation. US-Regulatoren behandeln dies als Täuschung; die SEC legte Vorwürfe gegen
zwei Anlageberater wegen solcher Behauptungen im März 2024 bei [32]. Siehe
[Kap. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states);
[Kap. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (Kap. 05, 20)

**AIBOM.** AI bill of materials: das maschinenlesbare Verzeichnis der Komponenten eines KI-Systems
(Modelle, Datensätze, Abhängigkeiten) in Formaten wie CycloneDX ML-BOM oder dem SPDX 3.0 AI-Profil.
Siehe [Kap. 05, Pattern: AIBOM](/bok/patterns#pattern-aibom). (Kap. 04, 05)

**AICM.** Die CSA AI Controls Matrix, ein Kontrollrahmenwerk (v1.1, 247 Kontrollobjektive über 18
Domänen), das auf ISO 42001, ISO 27001 und NIST AI RMF abgebildet wird und STAR for AI unterstützt
[4]. Siehe [Kap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai).
(Kap. 08)

**AIMA.** Die OWASP AI Maturity Assessment, berichtet in v1.0 (Aug 2025), die die Breite eines
KI-Sicherheits- und Governance-Programms über Domänen hinweg bewertet [5]. Siehe
[Kap. 07, How this relates to certification and other assessments](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments).
(Kap. 07)

**AIMS.** Ein KI-Managementsystem: die Governance-Struktur, Rollen, Kontrollen und die Schleife der
kontinuierlichen Verbesserung, die ISO/IEC 42001 zertifiziert. Ein AIMS ist nicht das
Qualitätsmanagementsystem der KI-Verordnung Artikel 17. Unterscheiden Sie von
[QMS (Art. 17)](/glossary/qms-art-17). Siehe
[Kap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio).
(Kap. 07, 08, 22)

**Algorithmic disgorgement.** Eine Maßnahme, die die Löschung von Modellen oder Algorithmen
anordnet, die mit rechtswidrig beschafften Daten entwickelt wurden, nicht nur der Daten selbst [33].
Die Einhaltung und der Nachweis erfordern eine Nachverfolgung von jedem Datensatz zu jedem darauf
trainierten Modell. Siehe
[Kap. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[Kap. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (Kap.
05, 20)

**Algorithmic Impact Assessment (AIA).** Die Bewertung, die Kanadas Directive on Automated
Decision-Making verlangt, bevor ein föderales automatisiertes Entscheidungssystem in Produktion
geht. Sie setzt eine Auswirkungsstufe von I bis IV fest, die die erforderlichen Schutzmaßnahmen
skaliert, wird auf dem Open Government Portal veröffentlicht und wird aktualisiert, wenn sich das
System ändert [34]. Siehe
[Kap. 21, Canada: after AIDA, the Directive on Automated Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making);
[Kap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(Kap. 14, 21)

**Algorithmic management.** Die Nutzung automatisierter Überwachungs- und Entscheidungssysteme zur
Anleitung, Bewertung oder Sanktionierung von Arbeitnehmern. Die EU Platform Work Directive begrenzt
die Daten, die solche Systeme verarbeiten dürfen, und verlangt Transparenz, menschliche Aufsicht und
ein Recht auf menschliche Überprüfung [35]. Siehe
[Kap. 20, Employment](/bok/existing-law#employment). (Kap. 20)

**Algorithmic Transparency Recording Standard (ATRS).** Das Standardvorlagenformat des Vereinigten
Königreichs für öffentliche Stellen, um zu veröffentlichen, wie und warum sie algorithmische
Werkzeuge nutzen; obligatorisch für Regierungsabteilungen und für unabhängige Stellen, die
öffentliche oder Frontline-Dienste erbringen [36]. Siehe
[Kap. 21, United Kingdom: principles, regulators and public-sector records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records).
(Kap. 21)

**ALTAI.** Die Assessment List for Trustworthy AI, veröffentlicht von der EU High-Level Expert Group
on AI im Juli 2020: eine Selbstbewertungs-Checkliste, die die sieben Anforderungen der 2019 Ethics
Guidelines in Fragen umwandelt [37]. Nützlich als Quelle für Kandidaten-Kontrollen; einmal
beantwortet, ist es nur eine Bestätigung. Siehe
[Kap. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(Kap. 11, 22)

**Anlage I (KI-Verordnung).** Die Anlage der KI-Verordnung, die die Harmonisierungsgesetze der Union
auflistet, unter die KI in regulierte Produkte eingebettet ist (Maschinen, Medizinprodukte,
Spielzeug und dergleichen); Verpflichtungen für diese hochriskanten eingebetteten Systeme werden
ab 2. August 2028 nach dem Digital-Omnibus-Zeitplan umgesetzt [2]. Unterscheiden Sie von
[Anlage III](/glossary/annex-iii). Siehe
[Kap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(Kap. 08, 18)

**Anlage III.** Die Anlage der KI-Verordnung, die hochriskante Anwendungsfälle auflistet (Biometrie,
kritische Infrastruktur, Bildung, Beschäftigung, wesentliche Dienste, Strafverfolgung, Migration,
Justiz); Verpflichtungen für diese werden nach dem Digital-Omnibus-Zeitplan umgesetzt [2].
Unterscheiden Sie von [Anlage I (KI-Verordnung)](/glossary/annex-i-eu-ai-act). Siehe
[Kap. 18, High-risk through use (Annex III)](/bok/eu-ai-act#high-risk-through-use-annex-iii). (Kap.
08, 18)

**Anonyme Daten.** Informationen, die sich nicht auf eine identifizierbare Person beziehen,
beurteilt gegen alle Mittel, die vernünftigerweise von jemandem verwendet werden könnten, um diese
Person zu identifizieren [38]. Sie fallen außerhalb der DSGVO, aber der Anspruch verfällt, wenn
Hilfsdaten und Re-Identifizierungstechniken verbessert werden, daher benötigt es eine datierte
Bewertung. Unterscheiden Sie von [Pseudonymisierung](/glossary/pseudonymisation). Siehe
[Kap. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(Kap. 19)

**Artikel 6(3)-Filter.** Die Ausnahmeregelung, unter der ein Anlage-III-System nicht hochriskant
ist, wenn es kein erhebliches Schadensrisiko darstellt und eine von vier Bedingungen erfüllt (enge
Verfahrensaufgabe, Verbesserung abgeschlossener menschlicher Arbeit, Mustererkennung, vorbereitende
Aufgabe). Profiling von natürlichen Personen hebt es immer auf; der Anbieter dokumentiert und
registriert die Bewertung [2]. Unterscheiden Sie von
[Profiling override](/glossary/profiling-override). Siehe
[Kap. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (Kap. 18)

**ASI01–ASI10.** Die zehn Risiken der OWASP Top 10 for Agentic Applications 2026 [6]: ASI01 Agent
Goal Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic
Supply Chain Vulnerabilities, ASI05 Unexpected Code Execution (RCE), ASI06 Memory & Context
Poisoning, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent
Trust Exploitation und ASI10 Rogue Agents. Siehe
[Kap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls);
[Kap. 08, OWASP GenAI Security Project](/bok/regulatory-map#owasp-genai-security-project). (Kap. 05,
08, 23)

**ATLAS.** MITREs Adversarial Threat Landscape for Artificial-Intelligence Systems, eine
Wissensdatenbank von Gegner-Taktiken und -Techniken gegen KI, einschließlich agenten-spezifischer
Techniken [7]. Siehe
[Kap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[Kap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls). (Kap. 05,
10, 15, 23)

**Auditfähige Nachweise.** Nachweise, die als Nebenprodukt des Builds in einer Form emittiert
werden, die ein Auditor direkt lesen kann (maschinenlesbar, signiert, zeitgestempelt), sodass die
Prüfung eine Abfrage ist, nicht ein Erfassungsprojekt. Siehe
[Kap. 01, Three clarifiers](/bok/definition#three-clarifiers). (Kap. 01, 04)

**Bevollmächtigter.** Nach der KI-Verordnung der EU eine in der Union ansässige Person mit einem
schriftlichen Mandat eines Anbieters außerhalb der EU eines hochriskanten KI-Systems oder eines
KI-Modells mit allgemeinem Verwendungszweck, um die Verpflichtungen dieses Anbieters in dessen Namen
zu erfüllen, einschließlich der Verfügbarmachung von Dokumentation für Behörden [2]. Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 18)

**Automatisierte Entscheidungsfindung (ADM).** Eine Entscheidung über eine Person, die durch
automatisierte Mittel getroffen wird. DSGVO Artikel 22 beschränkt Entscheidungen, die ausschließlich
auf automatisierter Verarbeitung mit rechtlichen oder ähnlich erheblichen Auswirkungen basieren
[38]; nach dem SCHUFA-Urteil ist ein Score, den Kreditgeber als bestimmend behandeln, selbst eine
solche Entscheidung [39]. Siehe
[Kap. 19, GDPR Article 22 after SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa). (Kap.
16, 19)

**Automatisierungsbias.** Die Neigung einer Person, sich zu sehr auf die Ausgabe eines
automatisierten Systems zu verlassen. KI-Verordnung Artikel 14 verlangt, dass Personen, die
hochriskante Systeme überwachen, sich dessen bewusst bleiben [2]; das menschliche Gate protokolliert
Genehmiger, Entscheidungszeit und Außerkraftsetzungsrate, sodass sich verschlechternde Aufsicht
sichtbar wird. Siehe
[Kap. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier);
[Kap. 04, Designing human oversight (Article 14)](/bok/the-stack#designing-human-oversight-article-14);
[Kap. 23, What a good approval looks like](/bok/governing-agents#what-a-good-approval-looks-like).
(Kap. 04, 11, 23)

**Autonomie.** In der KI-Verordnung der EU und OECD-Texten ein gewisser Grad der Unabhängigkeit des
Handelns von menschlicher Beteiligung, den fast jedes KI-System hat. ISO/IEC 22989 verwendet das
Wort für eine viel stärkere Eigenschaft, ein System, das sein eigenes Ziel oder seine Einsatzdomäne
ändern kann, und nennt den gewöhnlichen Fall Automatisierung [40]. Unterscheiden Sie von
[Autonomie-Stufe](/glossary/autonomy-level). Siehe
[Kap. 11, ISO/IEC 22989](/bok/ai-defined#isoiec-22989). (Kap. 11, 23)

**Autonomie-Stufe.** Wie weit ein Agent ohne eine Person zwischen seinen Schritten handelt,
festgelegt vom Betreiber als Designentscheidung und nicht als Eigenschaft des Modells genommen; eine
Forschungsskala benennt fünf Stufen nach der Rolle des Benutzers, vom Operator zum Beobachter [122].
Es ist ein Registrierungsfeld, das an einen minimalen Kontrollsatz gebunden ist, und das Erhöhen ist
eine überprüfte Änderung. Unterscheiden Sie von [Autonomie](/glossary/autonomy). Siehe
[Kap. 23, Autonomy is a design decision](/bok/governing-agents#autonomy-is-a-design-decision). (Kap.
15, 17, 23)

## B

**Bias.** Ein systematischer Fehler, der einige Menschen oder Ergebnisse bevorzugt oder
benachteiligt. NIST sortiert KI-Bias in drei Kategorien: systemisch, statistisch und rechnerisch
sowie menschlich [41]. Bias kann in jeder Lebenszyklusphase auftreten, daher wird es pro Phase
getestet, nicht einmal. Unterscheiden Sie von [Fairness](/glossary/fairness). Siehe
[Kap. 16, Where bias enters the lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle).
(Kap. 16)

**Bias-Audit (NYC Local Law 144).** Eine unabhängige Audit, die innerhalb eines Jahres vor dem
Einsatz eines automatisierten Entscheidungsinstruments für Beschäftigung in New York City
erforderlich ist und Auswahlquoten oder Bewertungsquoten sowie Auswirkungsverhältnisse nach
Geschlecht, Rasse und ethnischer Herkunft sowie deren Schnittmengen meldet; eine Zusammenfassung
muss veröffentlicht werden [42]. Siehe [ch. 20, Employment](/bok/existing-law#employment);
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch.
14, 20)

**Biometrische Daten.** Personenbezogene Daten aus der technischen Verarbeitung physischer,
physiologischer oder verhaltensbezogener Merkmale, die die eindeutige Identifizierung einer Person
ermöglichen oder bestätigen, wie Gesichtsbilder oder Fingerabdrücke [38]. Identifizierung,
Verifizierung und Kategorisierung werden in der DSGVO, der KI-Verordnung und anderen Gesetzen
unterschiedlich behandelt. Siehe [ch. 19, Biometrics](/bok/privacy-and-ai#biometrics). (ch. 19)

**Blameless Post-Mortem.** Eine Incident-Überprüfung, die beitragende Ursachen identifiziert, ohne
eine Person oder ein Team anzuklagen, auf der Grundlage, dass Menschen angemessen auf der Grundlage
ihres Wissensstands handelten und dass Systeme und Prozesse das sind, was behoben werden kann [43].
Die Auslöser werden im Voraus festgelegt. Siehe [ch. 17, Techniques](/bok/incidents#techniques).
(ch. 17)

**Blue-Green-Deployment.** Zwei identische Produktionsumgebungen mit zwischen ihnen umgeschaltetem
Datenverkehr, sodass ein Release durch Zurückschalten auf die vorherige Version zurückgerollt werden
kann [44]. Es bietet einem KI-System einen getesteten, sofortigen Weg zur vorherigen Version.
Vergleichen Sie mit [Canary release](/glossary/canary-release). Siehe
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 15)

**Build-Provenance (SLSA).** Ein überprüfbarer Datensatz im SLSA-Format darüber, was ein Artefakt
erstellt hat, durch welchen Prozess und aus welchen Top-Level-Eingaben. Die Build-Level reichen von
L1, Provenance existiert, über L2, signiert durch eine gehostete Build-Plattform, bis L3, gehärtete
Builds, deren Provenance sehr schwer zu fälschen ist [136]. Für ein Modell umfassen Eingaben den
Digest des Basismodells und Datensätze zur Datenzulassung. Vergleichen Sie mit
[Model signing](/glossary/model-signing). Siehe
[ch. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (ch. 05)

## C

**CAC (Cyberspace Administration of China).** Chinas Internetregulator (国家互联网信息办公室), führender
Aussteller der verbindlichen KI-Regeln (algorithmische Empfehlung, tiefe Synthese, generative
KI-Dienste und KI-Inhaltsmarkierung) und die Behörde, unter deren Anleitung TC260 das AI Safety
Governance Framework veröffentlicht [18]. Siehe
[ch. 21, China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(ch. 08, 21)

**Kalibrierung.** Die Eigenschaft, dass die Konfidenz eines Modells seiner Genauigkeit entspricht:
Bei Fällen mit einer Bewertung von 0,9 sind etwa neun von zehn richtig. Moderne neuronale Netze sind
oft schlecht kalibriert [45], daher wird die Kalibrierung im Eval-Gate pro Version und Untergruppe
gemessen, bevor ein Schwellenwert vertraut wird. Vergleichen Sie mit
[Calibration within groups](/glossary/calibration-within-groups). Siehe
[ch. 11, Calibration before thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Kalibrierung innerhalb von Gruppen.** Die Fairness-Eigenschaft, dass in jeder Gruppe die Personen
mit einer Bewertung s mit Rate s positiv ausfallen, sodass eine Bewertung für alle dasselbe
bedeutet. Sie steht im Allgemeinen in Konflikt mit gleichen Fehlerquoten, wenn sich die Basisraten
unterscheiden [46]. Vergleichen Sie mit [Calibration](/glossary/calibration) und
[Equalised odds](/glossary/equalised-odds). Siehe
[ch. 16, The impossibility results](/bok/fairness-and-explainability#the-impossibility-results).
(ch. 16)

**Canary-Release.** Eine teilweise, zeitlich begrenzte Bereitstellung einer Änderung für einen
kleinen Anteil des Produktionsdatenverkehrs, bewertet gegen eine Kontrollgruppe, bevor der Rollout
fortgesetzt wird {[47]}. Für KI-Systeme vergleicht die Bewertung Live-Qualitäts-, Sicherheits- und
Fairness-Metriken mit vorregistrierten Rollback-Kriterien. Vergleichen Sie mit
[Shadow deployment](/glossary/shadow-deployment) und
[Blue-green deployment](/glossary/blue-green-deployment). Siehe
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 14, 15, 23)

**CAPA.** Korrekturmaßnahme und Vorbeugungsmaßnahme, die Ausgabe einer Incident-Überprüfung. Die
Korrekturmaßnahme behebt diese Instanz; die Vorbeugungsmaßnahme verhindert, dass die Fehlerklasse in
der gesamten Flotte wiederkehrt, typischerweise als Regressions-Eval, eine Richtlinienänderung und
eine Risikoregister-Aktualisierung, verifiziert, bevor der Incident geschlossen wird [48]. Siehe
[ch. 17, CAPA: from incident to risk register and eval suite](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite).
(ch. 17)

**Katastrophales Vergessen.** Die Tendenz neuronaler Netze, frühere Kompetenz zu verlieren, wenn sie
auf neue Aufgaben trainiert werden {[49]}. Dies ist ein Grund, warum jedes Retraining ein
Änderungsereignis ist, das die vollständige Eval-Suite erneut ausführt, nicht nur die Tests für die
neue Fähigkeit. Siehe
[ch. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(ch. 11)

**Katastrophales-Schweregrad-Override.** Die Regel, dass jedes Szenario, das auf der höchsten
Schweregrad-Stufe bewertet wird, kritisch ist, unabhängig von seiner Wahrscheinlichkeit, nicht vom
Delivery-Team akzeptiert werden kann und eliminiert, im Schweregrad reduziert oder explizit vom
Governing Body für einen festen Zeitraum akzeptiert werden muss. NIST fordert, dass solche Risiken
sicher beendet werden können {[30]}. Siehe
[ch. 13, The catastrophic-severity override](/bok/risk-management#the-catastrophic-severity-override).
(ch. 13)

**CE-Kennzeichnung.** Die Markierung, die die Konformität eines Hochrisiko-KI-Systems mit der
KI-Verordnung der EU zeigt, sichtbar, lesbar und dauerhaft angebracht oder digital für digital
bereitgestellte Systeme, mit der Nummer der notifizierten Stelle, falls eine beteiligt war {[2]}.
Vergleichen Sie mit [EU declaration of conformity](/glossary/eu-declaration-of-conformity). Siehe
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[ch. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(ch. 14, 18)

**Cedar.** Eine Open-Source-Richtliniensprache für feinkörnige Autorisierung, die als
Policy-as-Code-Engine für Laufzeit-Zugriffsentscheidungen verwendet wird; eine schematypisierte,
analysierbare Alternative zu `OPA/Rego`. Vergleichen Sie mit [OPA/Rego](/glossary/opa-rego). Siehe
[ch. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**CEN-CENELEC JTC 21.** Der gemeinsame technische Ausschuss der europäischen Normungsorganisationen
CEN und CENELEC, der die harmonisierten Normen der KI-Verordnung entwirft, einschließlich EN 18286
zum Qualitätsmanagementsystem und der Entwürfe zu Risikomanagement, Vertrauenswürdigkeit und
Cybersicherheit {[50]}. Siehe
[ch. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (ch. 22)

**CIMD.** Client ID Metadata Document: der Mechanismus, durch den sich ein OAuth-Client mit einer
URL identifiziert, die als Client-ID verwendet wird und auf sein Metadaten-Dokument verweist. Die
MCP-Spezifikation vom 2026-07-28 lässt Clients und Autorisierungsserver sie unterstützen und
veraltet Dynamic Client Registration {[8]}; die IETF-Spezifikation ist noch ein Internet-Draft
(Revision 02, 6. Juli 2026) ab 2026-09-24 {[132]}. Siehe
[ch. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[ch. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 04, 05, 23)

**Claims-Register.** Der Datensatz jeder öffentlichen Aussage über die Genauigkeit, Fairness,
Sicherheit oder Fähigkeit eines KI-Systems: die genaue Formulierung, wo sie erscheint, und der
Eval-Lauf, gemessener Wert, Intervall und Population dahinter. Kopien, die eine Aussage tragen,
deren Nachweis fehlt, veraltet oder fehlgeschlagen ist, werden nicht veröffentlicht; die FTC
verlangt sachkundige und zuverlässige Nachweise für solche Aussagen, wenn sie gemacht werden
{[139]}. Siehe
[ch. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[ch. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (ch. 05, 20)

**Klassifizierungsentscheidungs-Datensatz.** Ein versionierter Registereintrag darüber, warum ein
System auf einer bestimmten Stufe der KI-Verordnung-Risikoleiter sitzt: der Annex-III-Punkt, jede
Bedingung von Artikel 6(3), auf die sich verlassen wird, ein explizites Profiling-Flag, der Reviewer
und das Datum {[2]}. Es wird neu bewertet, wenn sich die beabsichtigte Verwendung ändert.
Vergleichen Sie mit [Profiling override](/glossary/profiling-override). Siehe
[ch. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 18)

**Gemeinsame Spezifikationen.** Technische Spezifikationen, die die Kommission durch
Durchführungsakt gemäß Artikel 41 der KI-Verordnung erlassen kann, wenn eine Normungsanfrage nicht
akzeptiert wird, die Normen verspätet sind oder sie Bedenken bezüglich Grundrechte unzureichend
adressieren; die Einhaltung gibt auch eine Vermutung der Konformität {[2]}. Vergleichen Sie mit
[Harmonised standard](/glossary/harmonised-standard). Siehe
[ch. 22, How presumption of conformity works](/bok/principles-and-standards#how-presumption-of-conformity-works).
(ch. 22)

**Concept Drift.** Eine Änderung in der Beziehung zwischen den Eingaben eines Systems und der
korrekten Ausgabe, sodass die gleiche Eingabe jetzt eine andere Antwort erhalten sollte {[51]}. Im
Gegensatz zu Data Drift zeigt es sich nur in Ergebnissen: In der Produktion erscheint es in der
Leistung auf frischen Labels und in Change-Point-Tests auf der Fehlerquote. Vergleichen Sie mit
[Data drift](/glossary/data-drift). Siehe [ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs);
[ch. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it).
(ch. 11, 15)

**Konforme Vorhersage.** Eine verteilungsfreie Methode, die die Ausgabe eines trainierten Modells in
eine Menge von Kandidatenantworten umwandelt, die die richtige mit einer gewählten
Wahrscheinlichkeit enthält {[20]}. Eine große Menge signalisiert Unsicherheit, auf die eine
Governance-Regel leiten kann. Siehe
[ch. 11, Calibration before thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Konformitätsbewertung.** Das Verfahren, durch das ein Anbieter zeigt, dass ein
Hochrisiko-KI-System die KI-Verordnung der EU erfüllt, bevor es auf den Markt gebracht wird: interne
Kontrolle für die meisten Annex-III-Systeme, eine notifizierte Stelle für einige biometrische
Systeme und das Sektorverfahren für Annex-I-Produkte {[2]}. Es geht der Erklärung, CE-Kennzeichnung
und Registrierung voraus. Siehe
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[ch. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(ch. 14, 18)

**Content-Provenance (C2PA).** Signierte, manipulationssichere Informationen darüber, woher ein
Inhalt stammt und wie er bearbeitet wurde, an das Asset gebunden. Die C2PA-Spezifikation verpackt
sie als Manifest von Aussagen, einen Anspruch und eine Anspruchssignatur {[52]}; NIST behandelt
Provenance-Tracking als einen Ansatz zur Transparenz synthetischer Inhalte {[53]}. Vergleichen Sie
mit [Watermarking](/glossary/watermarking) und [Data provenance](/glossary/data-provenance). Siehe
[ch. 20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media). (ch.
18, 20)

**Einspruchsweg.** Der Weg, auf dem eine Person, die von einer automatisierten Entscheidung
betroffen ist, einen Prüfer erreicht, der die ursprüngliche Entscheidung nicht getroffen hat, die
Eingaben, die Gründe und die Darlegungen der Person sieht und das Ergebnis ändern kann, wobei das
Ergebnis in den Entscheidungsdatensatz zurückgeschrieben wird. Dies ist die praktische Umsetzung des
Einspruchsrechts in DSGVO Artikel 22(3) [38]. Vgl. [Anfechtbarkeit](/glossary/contestability). Siehe
[Kap. 19, DSGVO Artikel 22 nach SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa);
[Kap. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (Kap.
05, 19, 22)

**Anfechtbarkeit.** Die Fähigkeit einer Person, die von einer KI-gestützten Entscheidung betroffen
ist, diese anzufechten und eine Antwort zu erhalten, die sie ändern kann. DSGVO Artikel 22(3)
gewährt ein Einspruchsrecht nur gegen vollständig automatisierte Entscheidungen [38], und die
OECD-Grundsätze fordern, dass betroffene Personen ein Ergebnis anfechten können [31]. Vgl.
[Rechtsbehelfe](/glossary/recourse) und [Einspruchsweg](/glossary/contest-path). Siehe
[Kap. 16, The legal hooks for explanations](/bok/fairness-and-explainability#the-legal-hooks-for-explanations);
[Kap. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (Kap.
05, 12, 16)

**Kontinuierliche Assurance.** Assurance, die kontinuierlich aus Telemetrie erzeugt wird, anstatt zu
einem bestimmten Zeitpunkt; der Status der Kontrolle ist eine Live-Abfrage, keine jährliche
Bestätigung. Dies ist Stufe 5 des Reifegradmodells. Siehe
[Kap. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry).
(Kap. 04, 05, 07)

**Beitragender Faktor.** Eine Eigenschaft eines Systems oder seines Kontexts (Autonomie, Exposition,
Reversibilität, vulnerable Gruppen, Datensensibilität, Undurchsichtigkeit), die die
Wahrscheinlichkeit oder Schwere eines Risikos erhöht, ohne es zu verursachen [30]. Sie wird bei der
Aufnahme als Registrierungsfelder erfasst, damit eine Richtlinie die Stufe berechnen kann. Vgl.
[Risikoquelle](/glossary/risk-source). Siehe
[Kap. 13, Contributing factors and the use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile).
(Kap. 13)

**Verantwortlicher und Auftragsverarbeiter.** Nach der DSGVO entscheidet der Verantwortliche über
Zwecke und Mittel der Verarbeitung und trägt die meisten Pflichten; der Auftragsverarbeiter handelt
nach seinen dokumentierten Anweisungen [38]. Ein KI-Anbieter, der Ihre Inferenz bereitstellt, ist
normalerweise ein Auftragsverarbeiter, wird aber zum Verantwortlichen für jede Nutzung Ihrer Daten,
die er entscheidet, wie z. B. Training. Vgl. [Unterauftragsverarbeiter](/glossary/sub-processor).
Siehe
[Kap. 19, Controller, processor or joint controller](/bok/privacy-and-ai#controller-processor-or-joint-controller).
(Kap. 19)

**Kontrafaktische Erklärung.** Eine Erklärung, die die kleinste Änderung der Eingabe angibt, die das
Ergebnis geändert hätte, beschränkt auf Merkmale, die die Person tatsächlich ändern kann [54]. Sie
ist die natürliche Grundlage für Rechtsbehelfe. Vgl.
[Kontrafaktische Fairness](/glossary/counterfactual-fairness). Siehe
[Kap. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(Kap. 16)

**Kontrafaktische Fairness.** Die Anforderung, dass eine Entscheidung über eine Person in einer
kontrafaktischen Welt, in der die Person einer anderen Gruppe angehörte, gleich ausfällt, definiert
durch ein kausales Modell [55]; in der Praxis durch kontrafaktische Flip-Tests angenähert. Vgl.
[Kontrafaktische Erklärung](/glossary/counterfactual-explanation) und
[Kontrafaktischer Flip-Test](/glossary/counterfactual-flip-test). Siehe
[Kap. 16, Individual and counterfactual fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness).
(Kap. 16)

**Kontrafaktischer Flip-Test.** Ein Test, der in einer Eingabe nur ein geschütztes Merkmal ändert
oder Identitätsbegriffe in ansonsten identischen Prompts austauscht und misst, wie oft sich das
Ergebnis oder die Antwortqualität ändert. Dies ist die praktische Annäherung an kontrafaktische
Fairness [55] und läuft in der Fairness-Eval-Suite. Vgl.
[Kontrafaktische Fairness](/glossary/counterfactual-fairness). Siehe
[Kap. 16, Individual and counterfactual fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness);
[Kap. 05, Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (Kap. 05, 16)

## D

**Data Card.** Strukturierte, versionierte Dokumentation eines Datensatzes (Herkunft,
Rechtsgrundlage, Rechte, Zusammensetzung und bekannte Einschränkungen), die als Code neben dem
System gepflegt wird. Vgl. [Datasheet for datasets](/glossary/datasheet-for-datasets). Siehe
[Kap. 04, Data governance across the stack](/bok/the-stack#data-governance-across-the-stack).
(Kap. 04)

**Datendrift.** Eine Änderung der Verteilung der Eingaben, die ein System in der Produktion sieht,
im Vergleich zu den Daten, auf denen es validiert wurde, wie z. B. ein neues Kundensegment oder ein
geändertes vorgelagertes Formular [51]. Sie zeigt sich in den Eingaben, bevor ein Label ankommt,
daher wird sie direkt überwacht. Vgl. [Concept Drift](/glossary/concept-drift). Siehe
[Kap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (Kap. 11, 15)

**Datenherkunft.** Der Datensatz, wie Daten durch die Pipelines einer Organisation bewegt und
verändert wurden. Rückwärts-Herkunft zeigt, was ein Modell speiste; Vorwärts-Herkunft zeigt, welche
Modelle einen Datensatz nutzten, welche Löschanfragen und Lizenzentzüge notwendig sind. OpenLineage
ist ein offener Standard für die Ausgabe [56]. Vgl. [Datenprovenienz](/glossary/data-provenance).
Siehe [Kap. 14, Provenance versus lineage](/bok/governing-development#provenance-versus-lineage).
(Kap. 14)

**Datensparsamkeit.** Das DSGVO-Prinzip, dass personenbezogene Daten angemessen, relevant und auf
das beschränkt sein müssen, was der Zweck erfordert [38]. Für KI wird es Merkmal für Merkmal
argumentiert, angewendet auf Trainings-Snapshots, Abruf-Indizes, Protokolle und Eval-Sets, und
nachgewiesen durch Merkmal-Begründungen und Filter-Protokolle. Siehe
[Kap. 19, Minimisation, privacy by design and PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(Kap. 19)

**Datenprovenienz.** Informationen über die Entitäten, Aktivitäten und Personen, die an der
Erzeugung von Daten beteiligt waren, um ihre Qualität und Vertrauenswürdigkeit zu beurteilen [57].
In der Praxis: woher ein Datensatz ursprünglich kam und unter welchen Bedingungen (Quelle, Lizenz,
Rechtsgrundlage). Perfekte Herkunft über unbekannte Provenienz ist immer noch ungoverned. Vgl.
[Datenherkunft](/glossary/data-lineage). Siehe
[Kap. 14, Provenance versus lineage](/bok/governing-development#provenance-versus-lineage);
[Kap. 12, Updating the policies you already have](/bok/governance-program#updating-the-policies-you-already-have).
(Kap. 12, 14)

**Dataset-Zulassungstor.** Eine Pipeline-Kontrolle, die einen Trainingsauftrag nur Datensätze lesen
lässt, deren Zulassungsdatensatz vollständig ist und vom Dateneigentümer unterzeichnet:
Rechtsgrundlage oder Lizenz, Reservierungsprüfungen, Qualitätsergebnisse, Provenienz, zulässige
Verwendungen und Aufbewahrung. Sie belegt die Datengoverning-Praktiken von KI-Verordnung Artikel 10
[2]. Siehe
[Kap. 14, Owners, stewards and the admission gate](/bok/governing-development#owners-stewards-and-the-admission-gate);
[Kap. 05, Pattern: Dataset Admission Gate](/patterns/dataset-admission-gate). (Kap. 05, 14)

**Datasheet for datasets.** Dokumentation, die einen Datensatz mit seiner Motivation,
Zusammensetzung, Erfassungsprozess, Vorverarbeitung, Verwendungen, Verteilung und Wartung begleitet,
wie von Gebru und Kollegen vorgeschlagen [58]; die menschenlesbare Ergänzung zum
Datensatz-Zulassungsdatensatz und zur Data Card. Vgl. [Data Card](/glossary/data-card). Siehe
[Kap. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(Kap. 14)

**Entscheidungsmitteilung.** Die Mitteilung, die eine Person zum Zeitpunkt einer automatisierten
oder KI-gestützten Entscheidung erhält, aus einer versionierten Vorlage und dem
Entscheidungsdatensatz gerendert: dass ein System verwendet wurde, die Hauptgründe und was die
Person bis wann tun kann. Der Inhalt folgt jedem Regime, wie Mitteilung der Verwendung unter
KI-Verordnung Artikel 26(11) oder Gründe unter US Regulation B [2][23]. Vgl.
[Mitteilung über nachteilige Maßnahmen](/glossary/adverse-action-notice). Siehe
[Kap. 18, Deployer duties (Article 26)](/bok/eu-ai-act#deployer-duties-article-26);
[Kap. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (Kap.
05, 08, 18)

**Entscheidungsschwelle.** Der Score, über oder unter dem ein KI-Output eine Aktion auslöst. Dies
ist der Punkt, an dem Risikoappetit zu Verhalten wird, daher wird es als Richtlinie mit Eigentümer,
Version und Gültigkeitsdatum governed, im Eval-Tor getestet und bei jeder Entscheidung
protokolliert; die KI-Verordnung fordert erklärte Genauigkeitsmetriken [2]. Siehe
[Kap. 11, A score is not a decision](/bok/ai-defined#a-score-is-not-a-decision). (Kap. 11)

**Außerbetriebnahme.** Der geplante Ruhestand eines KI-Systems: Abhängigkeitsanalyse, Fallback und
Übergang, Sunset-Mitteilungen, ein finaler Evidence-Snapshot, Archivierung oder Entsorgung von
Gewichten und Daten, Widerruf jeder Identität und ein Registereintrag, der als retired markiert ist,
anstatt gelöscht zu werden. NIST fordert, dass Systeme sicher auslaufen [29]. Siehe
[Kap. 15, Retirement and decommissioning](/bok/governing-deployment#retirement-and-decommissioning);
[Kap. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(Kap. 05, 15)

**Deepfake.** Nach der KI-Verordnung der EU ist ein Deepfake KI-generierter oder manipulierter
Bild-, Audio- oder Videoinhalt, der existierenden Personen, Objekten, Orten, Entitäten oder
Ereignissen ähnelt und einer Person fälschlicherweise authentisch erscheinen würde; Betreiber müssen
ihn offenlegen, mit leichteren Pflichten für offensichtliche Kunst oder Satire [2]. Vgl.
[Content provenance (C2PA)](/glossary/content-provenance-c2pa). Siehe
[Kap. 20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media);
[Kap. 18, Transparency cases (Article 50)](/bok/eu-ai-act#transparency-cases-article-50). (Kap.
18, 20)

**Delegation (OAuth-Token-Austausch).** In RFC 8693 der Modus, in dem eine Partei für eine andere
handelt, während beide identifizierbar bleiben: das Token benennt das Subjekt und in seinem
act-Anspruch den aktuellen Akteur, mit verschachtelten act-Ansprüchen für frühere Akteure [123].
Unter Impersonation wird der Akteur vom Subjekt nicht zu unterscheiden. Ein Agent sollte ein
delegiertes, engeres Token halten, niemals das eigene des Benutzers. Vgl.
[Delegationskette](/glossary/delegation-chain) und [Token-Passthrough](/glossary/token-passthrough).
Siehe
[Kap. 23, Delegation without impersonation](/bok/governing-agents#delegation-without-impersonation).
(Kap. 23)

**Delegationskette.** Die Abfolge von Agenten, durch die eine Aufgabe von der Person oder dem
System, das sie gestartet hat, verläuft. Sie wird so governed, dass jeder Hop sich selbst
authentifiziert, der Umfang verengt sich oder bleibt gleich, aber verbreitert sich nie, der Zweck
reist mit der Aufgabe, Tiefe und Fan-out sind begrenzt, und eine Spur umfasst jeden Hop. Vgl.
[Delegation (OAuth-Token-Austausch)](/glossary/delegation-oauth-token-exchange). Siehe
[Kap. 23, Accountability across hops](/bok/governing-agents#accountability-across-hops). (Kap. 23)

**Demografische Parität.** Ein Gruppen-Fairness-Kriterium, das gilt, wenn die Quote positiver
Entscheidungen über Gruppen hinweg gleich ist; das Adverse-Impact-Verhältnis ist seine
Verhältnisform. Sie ignoriert Unterschiede in Basisquoten [59]. Vgl.
[Equalisierte Chancen](/glossary/equalised-odds). Siehe
[Kap. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics).
(Kap. 16)

**Betreiber.** Nach der KI-Verordnung der EU, wer ein KI-System unter eigener Autorität nutzt, außer
in einer rein persönlichen, nicht-beruflichen Aktivität [2]. Für Hochrisiko-Systeme folgt es den
Betriebsanleitungen, besetzt Aufsicht, überwacht, führt Protokolle, informiert betroffene Personen
und führt in aufgelisteten Fällen die FRIA durch. Das Label benennt eine Aufgabe, nicht eine Art von
Organisation. Vgl. [Anbieter](/glossary/provider). Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles);
[Kap. 18, Deployer duties (Article 26)](/bok/eu-ai-act#deployer-duties-article-26). (Kap. 15, 18)

**Deployment Decision Record (DDR).** Das Artefakt, das die Entscheidung zur Bereitstellung eines
KI-Systems dokumentiert: Ziel, die Personen, auf die es einwirkt, Negativraum, Risikostufe und
Verpflichtungen, Leistungsuntergrenzen pro Gruppe, Stilllegungsbedingungen, Eigentümer und
Genehmiger. Es wird mit dem Code des Systems eingecheckt; seine Untergrenzen werden zu
Eval-Gate-Schwellwerten. Siehe
[Kap. 15, The Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record).
(Kap. 15)

**Design defect.** In der Produkthaftung ein Mangel, der dem Design jeder Einheit innewohnt und nach
Verbrauchererwartungen oder durch Abwägung des Risikos gegen den Nutzen beurteilt wird [60]. Für KI:
ungetestete Betriebsbedingungen, ein fehlender Guardrail oder fehlende Aufsicht, wo eine sicherere
Alternative vernünftigerweise verfügbar war. Gegensatz zu
[Manufacturing defect](/glossary/manufacturing-defect). Siehe
[Kap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(Kap. 20)

**Differential privacy.** Eine mathematische Garantie, die begrenzt, wie sehr der Datensatz einer
einzelnen Person die Ausgabe einer Analyse oder eines trainierten Modells verändern kann, abgestimmt
durch ein Datenschutzbudget. Seine Stärke hängt vom Budget und von Implementierungsentscheidungen
ab, die NIST als Datenschutzhazards bezeichnet [61]. Siehe
[Kap. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(Kap. 19)

**Digital Omnibus.** Das Reformpaket von 2026 zur Änderung der KI-Verordnung der EU (in Kraft ab 27.
Juli 2026), das die Hochrisiko-Frist angepasst, Untersuchungsbefugnisse des KI-Büros hinzugefügt und
mehrere Artikel überarbeitet hat [2]. Siehe
[Kap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (Kap. 08, 18)

**Disparate impact.** Eine formal neutrale Praxis, die eine geschützte Gruppe stärker trifft. Nach
US Title VII muss der Arbeitgeber nachweisen, dass die Praxis jobabhängig und mit geschäftlicher
Notwendigkeit vereinbar ist, und verliert, wenn er eine weniger diskriminierende Alternative ablehnt
[62]. Das EU-Gegenstück ist mittelbare Diskriminierung. Gegensatz zu
[Disparate treatment](/glossary/disparate-treatment) und
[Indirect discrimination](/glossary/indirect-discrimination). Siehe
[Kap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[Kap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(Kap. 16, 20)

**Disparate treatment.** Eine Person wegen eines geschützten Merkmals wie Rasse, Geschlecht oder
Alter weniger günstig zu behandeln, auch durch ein Merkmal oder eine Regel, die bewusst dafür steht
[62]. Das EU-Gegenstück ist unmittelbare Diskriminierung [63]. Gegensatz zu
[Disparate impact](/glossary/disparate-impact). Siehe
[Kap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[Kap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(Kap. 16, 20)

**Distributor.** Nach der KI-Verordnung der EU eine Person in der Lieferkette, die weder Anbieter
noch Einführer ist und ein KI-System auf dem Unionsmarkt verfügbar macht. Sie überprüft die
Kennzeichnung und Dokumente und hält Hochrisiko-Systeme zurück, bei denen sie glaubt, dass sie nicht
konform sind [2]. Gegensatz zu [Importer](/glossary/importer). Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 18)

**Domestic representative (Korea).** Eine Person mit Adresse oder Büro in Korea, die ein
ausländischer KI-Geschäftsbetreiber über von Dekret festgelegten Schwellwerten schriftlich benennen
muss. Sie reicht Sicherheitsergebnisse ein, stellt Anträge auf Bestätigung hoher Auswirkungen und
unterstützt die Maßnahmen für hohe Auswirkungen [25][64]. Siehe
[Kap. 21, Domestic representative](/bok/ai-laws-worldwide#domestic-representative). (Kap. 21)

**Downstream modifier (GPAI).** Ein Akteur, der ein KI-Modell mit allgemeinem Verwendungszweck eines
anderen Anbieters feinabstimmt oder modifiziert. Die Richtlinien der Kommission machen ihn zum
Anbieter des modifizierten Modells nur, wenn die Modifikation über ein Drittel der ursprünglichen
Trainingsberechnung nutzt; seine `Art. 53(1)` Pflichten decken dann die Modifikation ab, aber ein
modifiziertes Modell mit systemischem Risiko wird angenommen, dieses Risiko zu behalten, und seine
Pflichten [65][76]. Gegensatz zu [Downstream provider](/glossary/downstream-provider). Siehe
[Kap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider);
[Kap. 18, When a fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(Kap. 15, 18)

**Downstream provider.** Nach der KI-Verordnung der EU der Anbieter eines KI-Systems, das ein
KI-Modell integriert, sein eigenes oder eines, das von einer anderen Einheit bereitgestellt wird. Er
verlässt sich auf die Modellinformationen, die Anbieter von KI-Modellen mit allgemeinem
Verwendungszweck nachgelagerten Anbietern zur Verfügung stellen müssen [2]. Gegensatz zu
[Downstream modifier (GPAI)](/glossary/downstream-modifier-gpai). Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 18)

**Downstream Use Register.** Das Verzeichnis jedes Verbrauchers der Ausgaben eines KI-Systems (ein
System, Team, Partner oder Trainings-Pipeline), jeweils mit seiner genehmigten Nutzung, der
Neuprüfung, die die Ausgaben für diesen Kontext freigegeben hat, und jedem Vertrag, gehalten gegen
den Registereintrag des produzierenden Systems. Der Zugriff wird pro registriertem Verbraucher
gewährt, und eine Modelländerung oder Stilllegung wird allen benachrichtigt. Siehe
[Kap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm);
[Kap. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (Kap. 05, 15)

**DSFA.** Datenschutz-Folgenabschätzung: die Bewertung nach DSGVO Artikel 35 der Verarbeitung, die
wahrscheinlich zu hohem Risiko für Einzelpersonen führt [38]}, in dieser Disziplin als versioniertes
Artefakt gepflegt, nicht als einmaliges Dokument. Gegensatz zu [FRIA](/glossary/fria). Siehe
[Kap. 19, The DPIA for AI systems](/bok/privacy-and-ai#the-dpia-for-ai-systems). (Kap. 04, 05, 19)

**Drift.** Die allmähliche Abweichung der Eingaben, Ausgaben oder Leistung eines Modells von seiner
validierten Baseline im Laufe der Zeit; ein Laufzeitsignal, das eine Kontrolle oder Eval erfassen
muss. Die beiden Arten, die man unterscheiden muss, sind Datendrift in den Eingaben und Konzeptdrift
in der Eingabe-zu-Antwort-Beziehung. Gegensatz zu [Data drift](/glossary/data-drift) und
[Concept drift](/glossary/concept-drift). Siehe
[Kap. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it);
[Kap. 05, Pattern: Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kap. 17, AI-specific failure modes](/bok/incidents#ai-specific-failure-modes). (Kap. 04, 05, 11,
15, 16, 17)

**Dual use.** Die Fähigkeit derselben KI-Fähigkeit, schädlichen Zwecken sowie legitimen zu dienen,
zum Beispiel ein Toxizitätsmodell invertiert, um giftige Moleküle vorzuschlagen [66]. Sie wird mit
Missbrauch-Bedrohungsmodellen, Red-Team-Fällen für schädliche Nutzung legitimer Fähigkeit und
Laufzeit-Erkennung beantwortet. Siehe
[Kap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(Kap. 11)

**Duty holder.** Wer eine Verpflichtung rechtlich bindet (nach der KI-Verordnung der EU der
Anbieter, der Betreiber oder beide), im Gegensatz zu wer sie durchsetzt; Kapitel 08 enthält eine
Duty-Holder-Spalte, damit ein Ingenieur sagen kann, welche Artefakte seine Organisation
verantwortlich ist zu produzieren. Siehe
[Kap. 18, Who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain). (Kap.
08, 18)

## E

**Effective challenge.** Kritische Analyse eines Modells durch objektive Experten mit der Expertise,
Unabhängigkeit und organisatorischen Stellung, um Veränderungen zu erzwingen. Der Begriff stammt aus
US-Modellrisiko-Richtlinien, jetzt SR 26-2 [67], und wird für unabhängige Validierung von
KI-Systemen übernommen. Siehe
[Kap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management).
(Kap. 14)

**EN 18286.** Der europäische Standard für das Qualitätsmanagementsystem des Artikels 17 der
KI-Verordnung, veröffentlicht von CEN-CENELEC im Juli 2026 (der erste JTC 21 KI-Verordnung-Standard,
der die Veröffentlichung erreicht), aber noch nicht im Amtsblatt zitiert ab 2026-09-24, daher
verleiht er keine Konformitätsvermutung [10]. Siehe
[Kap. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (Kap. 08, 22)

**Equalised odds.** Ein Gruppenfairness-Kriterium, das gilt, wenn True-Positive- und
False-Positive-Raten über Gruppen hinweg gleich sind; Equal Opportunity ist die schwächere Version,
die nur True-Positive-Raten ausgleicht [68]. Gegensatz zu
[Demographic parity](/glossary/demographic-parity). Siehe
[Kap. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics).
(Kap. 16)

**EU-Konformitätserklärung.** Die unterzeichnete Erklärung des Anbieters nach KI-Verordnung Anlage
V, dass ein Hochrisiko-KI-System die Anforderungen der Verordnung erfüllt; nach der
Konformitätsbewertung ausgefertigt und 10 Jahre lang aufbewahrt [2]. Gegensatz zu
[CE marking](/glossary/ce-marking). Siehe
[Kap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration).
(Kap. 18)

**Eval Gate.** Eine Pipeline-Stufe, die den Build fehlschlagen lässt, wenn eine Eval fehlschlägt;
der Mechanismus, der eine Evaluierung in eine durchgesetzte Kontrolle statt eines Berichts
umwandelt. Siehe [Kap. 05, Pattern: Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci). (Kap.
04, 05)

**Evals.** Automatisierte Tests des Verhaltens eines Modells oder Agenten (Fähigkeit, Sicherheit und
adversarial), als Kontrollen ausgeführt, nicht als einmalige Forschung. Siehe
[Kap. 04, Layer 03: Evals & Red Teaming as Evidence](/bok/the-stack#layer-03-evals--red-teaming-as-evidence).
(Kap. 04)

**Evals als Nachweis.** Das Prinzip, dass die Eval-Ausführung *ist* der Assurance-Nachweis: eine
fehlgeschlagene Eval blockiert den Build und sein strukturiertes Ergebnis wird als Beweis
gespeichert, dass die Kontrolle ausgelöst wurde. Siehe
[Kap. 03, 2. Evals fail builds; reviews only recommend](/bok/values-and-principles#2-evals-fail-builds-reviews-only-recommend).
(Kap. 03, 04)

**Evidence record.** Das unterzeichnete, strukturierte Verzeichnis, das eine Kontrolle jedes Mal
schreibt, wenn sie entscheidet: welche Kontrolle, über welche Systemversion, was sie entschieden
hat, gegen welche Metrik, Schwellwert und Verpflichtung, auf welche Eingabe, wann und von wem. Eine
Form für jede Kontrolle ermöglicht es, dass eine Audit als Abfrage über einen Store ausgeführt wird
[69]. Siehe
[Kap. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry);
[Templates and schemas](/resources/templates). (Kap. 05)

**Exception register.** Eine versionskontrollierte Liste genehmigter Ausnahmen, jede an eine Regel
und ein System gebunden, mit Begründung, kompensierenden Kontrollen, Genehmiger und Ablauf. Die
Policy-Engine liest sie, daher kann eine Veröffentlichung unter einer Live-Ausnahme bestehen, das
Urteil sagt es, und die Regel schlägt erneut fehl, sobald die Ausnahme abläuft. Gegensatz zu
[Risk register](/glossary/risk-register). Siehe
[Kap. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(Kap. 12)

**Explainability.** In NISTs Rahmen eine Darstellung der Mechanismen hinter der Funktionsweise eines
Systems: wie eine Entscheidung getroffen wurde [30]. In der Praxis eine Pro-Entscheidungs-Erklärung
wie Feature-Attributionen, Reason Codes oder ein kontrafaktisches. Gegensatz zu
[Transparency](/glossary/transparency) und [Interpretability](/glossary/interpretability). Siehe
[Kap. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[Kap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (Kap. 11, 16)

**Explanation record.** Das Evidence-Artefakt für eine erklärte Entscheidung: Modellversion,
Erklärungsmethode und Version, Baseline, Reason Codes, Kontrafaktisches, Template, Publikum und
Lieferung, zum Zeitpunkt der Entscheidung geschrieben, damit die Erklärung reproduziert werden kann,
wenn eine Person ein Recht auf Erklärung geltend macht [2]. Siehe
[Kap. 16, Explanation artefacts as evidence records](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records);
[Kap. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (Kap. 05, 16)

## F

**Fehlerverhalten.** Was ein Guardrail, Guardian Agent oder Tool Gateway tut, wenn es keine
Entscheidung treffen kann: Fail Open lässt den Aufruf durch, Fail Closed blockiert ihn. Der
Referenz-Guardian des OWASP Agent Control Standard startet mit Fortfahren, sofern nicht auf Ablehnen
gesetzt [127]. Das Verhalten ist eine Governance-Entscheidung, die pro Operationsklasse getroffen
und in der Policy Card des Agenten dokumentiert wird. Siehe
[Kap. 23, Runtime guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(Kap. 23)

**Unterlassene Warnung.** In der Produkthaftung ein Mangel in Anleitung oder Warnungen vor nicht
offensichtlichen Gefahren [60]. Für KI: nicht offengelegte Einschränkungen oder Verwendungen
außerhalb des Geltungsbereichs, weshalb Model Cards und Betriebsanleitungen mit jeder
Veröffentlichung versioniert werden. Siehe
[Kap. 20, Duty to warn after updates](/bok/existing-law#duty-to-warn-after-updates). (Kap. 20)

**Fair Use.** Die US-amerikanische Urheberrechtsverteidigung, die vier Faktoren abwägt: Zweck und
Transformativität, Art des Werks, Umfang der Nutzung und Marktauswirkung [70]. Gerichte wenden sie
auf KI-Trainings Fall für Fall an; bisherige Ergebnisse hängen davon ab, wie die Daten erworben
wurden und von jedem einzelnen Datensatz. Kontrastieren Sie mit
[TDM exception](/glossary/tdm-exception). Siehe
[Kap. 20, US training cases, dated](/bok/existing-law#us-training-cases-dated). (Kap. 20)

**Fairness.** Die Eigenschaft, dass die Ergebnisse und Fehler eines Systems Menschen oder Gruppen
nicht ungerechtfertigt benachteiligen. NIST listet "fair, with harmful bias managed" unter seinen
vertrauenswürdigen Merkmalen auf [30]; in der Praxis ist Fairness eine gewählte, dokumentierte
Metrik (Gruppe, Individuum oder kontrafaktisch) mit einem Schwellenwert, keine allgemeine Aussage.
Kontrastieren Sie mit [Bias](/glossary/bias). Siehe
[Kap. 16, Choosing a fairness metric by use case](/bok/fairness-and-explainability#choosing-a-fairness-metric-by-use-case).
(Kap. 16)

**Fairness Gerrymandering.** Der Fehler, bei dem ein Modell eine Fairness-Einschränkung für jede
vordefinierte Gruppe erfüllt, sie aber bei Untergruppen verletzt, die durch Kombinationen von
Attributen definiert sind [71]; der Grund, warum intersektionale Tests erforderlich sind. Siehe
[Kap. 16, Intersectional and subgroup testing](/bok/fairness-and-explainability#intersectional-and-subgroup-testing).
(Kap. 16)

**Fairness-Richtlinie.** Der systemspezifische Datensatz, der vor Einsicht in die Ergebnisse
festgelegt wird und definiert, was Fairness für dieses System bedeutet: die geschützten Attribute in
jeder Gerichtsbarkeit und woher ihre Werte stammen, die gewählte Metrik und warum, der
Schwellenwert, die Mindestzellengröße, die Korrektur für mehrfache Vergleiche und der Genehmiger.
Die Fairness-Eval-Suite wird gegen sie bewertet. Kontrastieren Sie mit
[Fairness](/glossary/fairness). Siehe
[Kap. 16, Fairness and explainability in the stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[Kap. 05, Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (Kap. 05, 16)

**Föderiertes Lernen.** Training eines Modells über Geräte oder Standorte hinweg, wo die Daten
vorhanden sind, wobei Modellaktualisierungen statt Rohdatensätze ausgetauscht werden [72]. Dies
begrenzt die Datenbewegung, verbirgt aber nicht von selbst personenbezogene Daten, da gemeinsam
genutzte Aktualisierungen Trainingsbeispiele offenlegen können. Siehe
[Kap. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(Kap. 19)

**Fine-Tuning.** Weiteres Training eines bestehenden Modells auf neuen Daten, um es an eine Aufgabe
oder Domäne anzupassen. Dies ändert das Modell, daher ist es ein Änderungsereignis mit eigenen
Evals; für KI-Modelle mit allgemeinem Verwendungszweck behandelt die Kommission einen Modifier nur
oberhalb von einem Drittel der ursprünglichen Trainingsrechenleistung als Anbieter [65]. Siehe
[Kap. 15, How it is adapted](/bok/governing-deployment#how-it-is-adapted);
[Kap. 18, When a fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(Kap. 15, 18)

**Foundation Model.** Ein Modell, das auf breiten Daten in großem Maßstab trainiert und auf eine
breite Palette von nachgelagerten Aufgaben anwendbar ist [73]. Seine Mängel werden von jedem darauf
aufgebauten System geerbt, daher sammeln Organisationen, die eines aufrufen oder anpassen, die
Nachweise des Anbieters und verwalten die angeheftete Version als Änderung. Kontrastieren Sie mit
[GPAI](/glossary/gpai) und [Frontier model](/glossary/frontier-model). Siehe
[Kap. 11, Foundation models and GPAI](/bok/ai-defined#foundation-models-and-gpai). (Kap. 11)

**Vier-Fünftel-Regel.** Die US-amerikanische Faustregel der Uniform Guidelines, dass eine
Auswahlquote einer Gruppe unter 80% der Quote der höchsten Gruppe im Allgemeinen als Beweis für
nachteilige Auswirkungen angesehen wird, qualifiziert durch statistische und praktische Signifikanz
[24]. Es ist kein sicherer Hafen: kleinere Lücken können immer noch zählen. Siehe
[Kap. 16, The four-fifths rule and the adverse-impact ratio](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
[Kap. 20, Fairness measures the law recognises](/bok/existing-law#fairness-measures-the-law-recognises).
(Kap. 16, 20)

**Rahmenübereinkommen über KI (CETS Nr. 225).** Der Vertrag des Europarats über KI und
Menschenrechte, Demokratie und Rechtsstaatlichkeit, der im September 2024 zur Unterzeichnung
aufgelegt wurde. Er bindet seine Vertragsparteien, die entscheiden, wie sie private Akteure
erreichen, und fordert Risiko- und Auswirkungsmanagement sowie Abhilfe [74]. Siehe
[Kap. 22, Council of Europe Framework Convention (CETS No. 225)](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225).
(Kap. 22)

**Framework Crosswalk.** Eine Zuordnung der Kontrollen eines Frameworks zu denen eines anderen;
nützlich als Index, aber ein Crosswalk beweist, dass Sie das Framework gelesen haben, nicht dass die
zugeordnete Kontrolle wirkt. Siehe
[Kap. 05, Pattern: Framework Crosswalk](/bok/patterns#pattern-framework-crosswalk). (Kap. 05, 08)

**FRIA.** Grundrechte-Folgenabschätzung: die Bewertung gemäß Artikel 27 der KI-Verordnung der
Auswirkungen eines Hochrisiko-Systems auf Rechte [2], hier als versioniertes, überprüfbares Artefakt
gepflegt. Kontrastieren Sie mit [DPIA](/glossary/dpia) und
[AI system impact assessment](/glossary/ai-system-impact-assessment). Siehe
[Kap. 18, Fundamental rights impact assessment (Article 27)](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27);
[Kap. 05, Pattern: FRIA-as-Code](/bok/patterns#pattern-fria-as-code). (Kap. 04, 05, 18)

**Frontier Model.** Ein KI-Modell mit allgemeinem Verwendungszweck an oder nahe der
Fähigkeitsgrenze. Gesetze ziehen die Linie durch Trainingsrechenleistung: Kaliforniens SB 53
beispielsweise erfasst Modelle, die mit mehr als 10^26 Operationen trainiert wurden [14].
Frontier-Developer-Gesetze fordern ein veröffentlichtes Sicherheitsrahmenwerk und Incident Reporting
[12]. Kontrastieren Sie mit [Foundation model](/glossary/foundation-model). Siehe
[Kap. 21, Provenance, training data and frontier developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers);
[Kap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (Kap. 08, 21)

**Erfüllungsdatensatz.** Der anfragespezifische Datensatz, wie eine Anfrage eines Datensubjekts
überall dort erfüllt wurde, wo die Daten der Person vorhanden sind, von Quellsystemen, Snapshots,
Abrufindexa, Protokollen und Eval-Sets bis zu Modellgewichten: die Aktion in jedem, die betroffenen
Modellversionen, jedes geplante Retraining und ob die DSGVO-Frist von einem Monat, verlängerbar um
zwei, eingehalten wurde [38]. Siehe
[Kap. 19, Recording how a request was honoured](/bok/privacy-and-ai#recording-how-a-request-was-honoured);
[Kap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (Kap.
05, 08, 19)

**Function Creep.** Die schrittweise Wiederverwendung personenbezogener Daten oder eines KI-Systems
für Zwecke, die niemand genehmigt hat, normalerweise durch Konfiguration statt einer neuen
Veröffentlichung. Für personenbezogene Daten verstößt dies gegen die Zweckbindung, sofern nicht eine
Kompatibilitätsbewertung oder neue Grundlage die neue Nutzung abdeckt [38]; negativer Raum im
Bereitstellungsdatensatz macht es erkennbar. Siehe
[Kap. 19, Purpose limitation and function creep](/bok/privacy-and-ai#purpose-limitation-and-function-creep);
[Kap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm);
[Kap. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (Kap. 05, 14,
15, 19)

## G

**Generative KI.** KI, die neuen Inhalt (Text, Bilder, Audio, Video, Code) ausgibt, anstatt eine
Schätzung über etwas zu machen, das existiert. Ihre charakteristischen Risiken umfassen
Konfabulation, Informationsintegrität, Geistiges Eigentum und missbräuchliche synthetische Inhalte
[75]; ihre Nachweise sind Begründetheit, Verweigerung und Red-Team-Evals sowie Inhaltsmarkierung.
Kontrastieren Sie mit [Predictive AI](/glossary/predictive-ai). Siehe
[Kap. 11, Predictive versus generative](/bok/ai-defined#predictive-versus-generative). (Kap. 11)

**Go/No-Go-Entscheidung.** Die unterzeichnete Freigabeentscheidung für eine Systemversion, getroffen
von benannten Reviewer-Rollen gegen eine Checkliste, deren Elemente jeweils den Datensatz verlinken,
der sie beantwortet. NIST rahmt sie als Feststellung, ob Entwicklung oder Bereitstellung fortgesetzt
werden sollte [30]; die Pipeline stellt nur bei Go bereit. Siehe
[Kap. 14, The go/no-go gate](/bok/governing-development#the-gono-go-gate). (Kap. 14)

**Governance-as-Code.** Governance-Regeln, die als ausführbarer Code ausgedrückt werden, der Pull
Requests, Bereitstellungen und Runtime-Aufrufe bewertet und eine Entscheidung zurückgibt; der
Oberbegriff, von dem Policy-as-Code die CI/CD-Teilmenge ist. Kontrastieren Sie mit
[Policy-as-Code](/glossary/policy-as-code). Siehe
[Kap. 04, Layer 01: Govern-as-Code](/bok/the-stack#layer-01-govern-as-code). (Kap. 03, 04)

**GPAI.** KI-Modell mit allgemeinem Verwendungszweck: gemäß KI-Verordnung ein Modell, das erhebliche
Allgemeingültigkeit aufweist, eine breite Palette unterschiedlicher Aufgaben kompetent erfüllen kann
und in viele nachgelagerte Systeme integriert werden kann [2]. Das Kriterium der Kommission ist
Trainingsrechenleistung über 10^23 FLOP [76]. Das KI-Büro setzt GPAI-Pflichten ab 2. August 2026
durch. Kontrastieren Sie mit [Foundation model](/glossary/foundation-model). Siehe
[Kap. 18, General-purpose AI models](/bok/eu-ai-act#general-purpose-ai-models);
[Kap. 11, Foundation models and GPAI](/bok/ai-defined#foundation-models-and-gpai). (Kap. 08, 11, 18)

**GPAI Code of Practice.** Das freiwillige Instrument (veröffentlicht 10. Juli 2025), das Anbieter
von KI-Modellen mit allgemeinem Verwendungszweck verwenden, um ihre Einhaltung der
KI-Verordnungspflichten nachzuweisen, bis harmonisierte Normen existieren; drei Kapitel:
Transparenz, Urheberrecht und Sicherheit (das letzte für Modelle mit systemischem Risiko) [16].
Siehe [Kap. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice);
[Kap. 18, The Code of Practice and enforcement](/bok/eu-ai-act#the-code-of-practice-and-enforcement).
(Kap. 08, 18)

**Abgestufte Verschlechterung.** Vorgefertigte, getestete Betriebsmodi, die kurz davor liegen, ein
KI-System auszuschalten: Nur-Beratung, erhöhte Konfidenzsschwellen, nur begründete Antworten,
Deaktivierung für eine Gruppe, Sprache oder Region und eine Rückkehr zur Pilot-Kohorte. Jeder ist
ein operativer Schalter mit einem benannten Auslöser [77]. Kontrastieren Sie mit
[Kill switch](/glossary/kill-switch). Siehe
[Kap. 15, Graduated degradation](/bok/governing-deployment#graduated-degradation);
[Kap. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(Kap. 05, 15, 23)

**Guardian Agent.** Ein KI-Agent, dessen Aufgabe es ist, andere Agenten zur Laufzeit zu überwachen,
zu überprüfen oder einzuschränken; Gartner prognostiziert, dass Guardian-Agent-Technologien bis 2030
mindestens 10 bis 15% der agentengestützten KI-Märkte ausmachen werden [9]. Kontrastieren Sie mit
[Guardrail](/glossary/guardrail). Siehe
[Kap. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability);
[Kap. 23, Runtime guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(Kap. 04, 23)

**Guardrail.** Ein Runtime-Kontroll, der die Ein- oder Ausgaben oder Tool-Aufrufe eines Modells oder
Agenten inspiziert oder vermittelt und blockiert, umschreibt oder eskaliert, was eine Richtlinie
verletzt, wobei jede Entscheidung als Nachweis protokolliert wird. Guardrails sind deterministischer
Code oder Klassifizierer im Call-Pfad, anders als ein Guardian Agent, der selbst ein KI-System ist.
Kontrastieren Sie mit [Guardian agent](/glossary/guardian-agent). Siehe
[Kap. 05, Pattern: Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail);
[Kap. 23, Runtime guardrails for tool calls](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(Kap. 04, 05, 23)

## H

**Halluzination.** Generative Ausgabe, die selbstbewusst geäußert wird, aber falsch ist oder nicht
durch ihre Quellen gestützt wird; das generative KI-Profil des NIST nennt es Konfabulation und führt
es unter den Risiken auf, die generative KI schafft oder verschärft [75]. Groundedness und Citation
Checks sind die übliche Evidenz dagegen. Kontrastieren Sie mit
[Regurgitation](/glossary/regurgitation). Siehe
[Kap. 17, KI-spezifische Ausfallmodi](/bok/incidents#ai-specific-failure-modes);
[Kap. 11, Prädiktiv versus generativ](/bok/ai-defined#predictive-versus-generative). (Kap. 11, 17)

**Harmonisierte Norm.** Eine europäische Norm, die auf Anfrage der Kommission zur Normung angenommen
wurde. Nach der KI-Verordnung gibt die Konformität mit einer Norm, deren Referenz im Amtsblatt
veröffentlicht ist, eine Vermutung der Konformität mit den von ihr abgedeckten Anforderungen; eine
Veröffentlichung durch CEN-CENELEC allein tut dies nicht [2]. Stand 2026-09-24 ist noch keine
zitiert [10]. Kontrastieren Sie mit [Gemeinsame Spezifikationen](/glossary/common-specifications)
und [Harmonisierte Struktur (ISO)](/glossary/harmonized-structure-iso). Siehe
[Kap. 22, Wie die Konformitätsvermutung funktioniert](/bok/principles-and-standards#how-presumption-of-conformity-works).
(Kap. 08, 22)

**Harmonisierte Struktur (ISO).** Das gemeinsame Klausel-Layout und der Kerntext, die von
ISO-Managementsystem-Standards wie ISO/IEC 42001, 27001 und 27701 sowie ISO 9001 geteilt werden und
es ermöglichen, dass ein integriertes Managementsystem mehrere von ihnen erfüllt [78]. Nicht zu
verwechseln mit einer EU-harmonisierten Norm. Kontrastieren Sie mit
[Harmonisierte Norm](/glossary/harmonised-standard). Siehe
[Kap. 22, Integration mit 27001, 27701 und 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001).
(Kap. 22)

**Hidden Context Exposure.** LLM08:2026 in der OWASP LLM Top 10, die System Prompt Leakage ersetzt:
Extrahieren, Ableiten oder Rekonstruieren des verborgenen Kontexts, den ein Modell sieht, wie System
Prompts, Entwickleranweisungen, abgerufene Richtlinientexte und Tool-Schemas [128]. Der Rat lautet,
davon auszugehen, dass verborgener Kontext auffindbar ist, Anmeldedaten aus ihm herauszuhalten und
sich niemals auf ihn als Sicherheitsgrenze zu verlassen. Kontrastieren Sie mit
[Prompt-Injection](/glossary/prompt-injection). Siehe
[Kap. 23, Prompts als Konfiguration unter Änderungskontrolle](/bok/governing-agents#prompts-as-configuration-under-change-control).
(Kap. 23)

**High-impact AI (Korea).** Nach Koreas KI-Grundgesetz ein KI-System, das das Leben, die physische
Sicherheit oder Grundrechte erheblich beeinträchtigen kann und in einem aufgelisteten Bereich wie
Gesundheitswesen, Einstellung und Kreditscreening, biometrische Analyse, Transport oder
Entscheidungen im öffentlichen Dienst eingesetzt wird. Es löst Anforderungen an Risikomanagement,
Erklärung, menschliche Aufsicht und Aufzeichnungspflichten aus [25]. Kontrastieren Sie mit
[Hochrisiko-KI-System](/glossary/high-risk-ai-system). Siehe
[Kap. 21, High-impact AI und wie es bestätigt wird](/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed).
(Kap. 21)

**Hochrisiko-KI-System.** Nach der KI-Verordnung der EU ein KI-System, das eine
Sicherheitskomponente eines oder selbst ein Produkt nach Anhang-I-Rechtsvorschriften ist, das eine
Konformitätsbewertung durch Dritte erfordert, oder das in einem Anhang-III-Bereich eingesetzt wird,
sofern der Filter in Artikel 6(3) nicht anwendbar ist. Es unterliegt den Anforderungen der Artikel 8
bis 15 und den Pflichten von Anbietern und Betreibern [2]. Kontrastieren Sie mit
[Verbotene Praktik](/glossary/prohibited-practice),
[High-impact AI (Korea)](/glossary/high-impact-ai-korea) und [Risikostufe](/glossary/risk-tier).
Siehe [Kap. 18, Die Risikotreppe](/bok/eu-ai-act#the-risk-ladder). (Kap. 18)

**Hiroshima Code of Conduct.** Der Verhaltenskodex der G7 International Code of Conduct for
Organizations Developing Advanced AI Systems (Oktober 2023): 11 Maßnahmen, die
Lebenszyklusrisikobewertung, Überwachung nach der Bereitstellung, öffentliche Berichterstattung,
Incident Sharing, Governance-Richtlinien, Sicherheit, Herkunftsnachweis und Datenschutz abdecken
[79]. Siehe [Kap. 22, G7 Hiroshima Process](/bok/principles-and-standards#g7-hiroshima-process).
(Kap. 22)

**Holding Statement.** Eine kurze öffentliche Erklärung, die vor einem Incident in Grundzügen
vorbereitet wird: was soweit bekannt geschehen ist, was getan wurde, um es einzudämmen, was
betroffene Personen tun sollten, und wann das nächste Update kommt. Sie spekuliert niemals über die
Ursache. Siehe [Kap. 15, Externe Kommunikation](/bok/governing-deployment#external-communications);
[Kap. 05, Muster: Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).
(Kap. 05, 15)

**HUDERIA.** Die nicht bindende Methodik des Europarats zur Bewertung der Risiken und Auswirkungen
von KI-Systemen auf Menschenrechte, Demokratie und Rechtsstaatlichkeit [80]. Parteien des
Rahmenübereinkommens können sie nutzen oder anpassen. Siehe
[Kap. 22, Was das Übereinkommen verlangt und was es im Stack ändert](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack).
(Kap. 22)

**Menschliche Aufsicht.** Die Maßnahmen, die natürlichen Personen ermöglichen, ein
Hochrisiko-KI-System zu verstehen, zu überwachen und bei Bedarf zu überschreiben oder zu stoppen,
erforderlich durch KI-Verordnung Artikel 14, einschließlich Bewusstsein für Automatisierungsbias und
eine Möglichkeit, das System sicher zu stoppen [2]. Konstruiert als Gates, Review-Tools und
Override-Übungen, die Aufzeichnungen hinterlassen. Siehe
[Kap. 04, Gestaltung menschlicher Aufsicht (Artikel 14)](/bok/the-stack#designing-human-oversight-article-14);
[Kap. 23, Wie eine gute Genehmigung aussieht](/bok/governing-agents#what-a-good-approval-looks-like).
(Kap. 04, 11, 23)

**Human-in-Command (HIC).** Der Überwachungsmodus, benannt von der Hochrangigen Expertengruppe der
EU, in dem Personen die Gesamtaktivität eines KI-Systems überwachen und entscheiden, wann und ob es
in einer bestimmten Situation eingesetzt wird [81]. Kontrastieren Sie mit
[Human-on-the-Loop (HOTL)](/glossary/human-on-the-loop-hotl). Siehe
[Kap. 11, Vom Definitionselement zum Registrierungsfeld](/bok/ai-defined#from-definition-element-to-registry-field).
(Kap. 11)

**Human-in-the-Loop (HITL).** Der Überwachungsmodus, in dem eine Person in jeden Entscheidungszyklus
eines KI-Systems eingreifen kann [81]; in technischen Begriffen ein Gate, das jede folgenreiche
Aktion hält, bis ein benannter Genehmiger entscheidet, wobei Genehmiger, Zeit zur Entscheidung und
Override protokolliert werden. Kontrastieren Sie mit
[Human-on-the-Loop (HOTL)](/glossary/human-on-the-loop-hotl). Siehe
[Kap. 05, Muster: Human-in-the-Loop Gate](/bok/patterns#pattern-human-in-the-loop-gate);
[Kap. 11, Vom Definitionselement zum Registrierungsfeld](/bok/ai-defined#from-definition-element-to-registry-field);
[Kap. 23, Menschliche Kontrollpunkte und Genehmigungsgestaltung](/bok/governing-agents#human-checkpoints-and-approval-design).
(Kap. 05, 11, 23)

**Human-on-the-Loop (HOTL).** Der Überwachungsmodus, in dem eine Person in den Designzyklus
eingreifen kann und den Betrieb des Systems überwacht, anstatt jede Entscheidung zu genehmigen [81].
Das System handelt; Personen beobachten die Signale und können es stoppen, daher müssen der Stoppfad
und die Benachrichtigung getestet werden. Kontrastieren Sie mit
[Human-in-the-Loop (HITL)](/glossary/human-in-the-loop-hitl) und
[Human-in-Command (HIC)](/glossary/human-in-command-hic). Siehe
[Kap. 11, Vom Definitionselement zum Registrierungsfeld](/bok/ai-defined#from-definition-element-to-registry-field).
(Kap. 11)

## I

**Implicit Deny.** Die Autorisierungsregel, dass eine Anfrage, die keine Richtlinie ausdrücklich
erlaubt, abgelehnt wird. Cedar lehnt standardmäßig ab und lässt jeden passenden Forbid jeden Permit
überschreiben [141]; eine Tool-Allow-List eines Agenten funktioniert genauso, daher wird ein nicht
aufgelistetes Tool ohne eine eigene Regel blockiert. Siehe
[Kap. 23, Die Tool-Allow-List](/bok/governing-agents#the-tool-allow-list);
[Toolkit: Policy Card Builder](/toolkit/policy-card#pc-engines). (Kap. 08, 23)

**Einführer.** Nach der KI-Verordnung der EU eine in der Union ansässige Person, die ein KI-System
mit dem Namen oder der Marke eines außerhalb der Union ansässigen Anbieters in den Verkehr bringt.
Sie muss die Konformitätsarbeit des Anbieters überprüfen, bevor sie ein Hochrisiko-System in den
Verkehr bringt [2]. Kontrastieren Sie mit [Händler](/glossary/distributor). Siehe
[Kap. 18, Die EU-Operatorrollen](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 18)

**Indirekte Diskriminierung.** Das EU-Gegenstück zu Disparate Impact: ein scheinbar neutrales
Kriterium, das eine geschützte Gruppe besonders benachteiligt, rechtswidrig, sofern nicht objektiv
durch ein verfolgtes legitimes Ziel mit angemessenen und erforderlichen Mitteln gerechtfertigt [63].
Kontrastieren Sie mit [Disparate Impact](/glossary/disparate-impact). Siehe
[Kap. 20, Unterschiedliche Behandlung, unterschiedliche Auswirkungen und Proxys](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(Kap. 20)

**Inferenz (KI-Verordnung Sinn).** Die Fähigkeit, Ausgaben aus Eingaben abzuleiten, indem man aus
Daten lernt oder über kodiertes Wissen nachdenkt, anstatt Regeln auszuführen, die Menschen
geschrieben haben. Die Kommission behandelt sie als unverzichtbare Bedingung, die ein KI-System von
herkömmlicher Software unterscheidet [21]. Siehe
[Kap. 11, EU KI-Verordnung Artikel 3(1) und die Kommissionsrichtlinien](/bok/ai-defined#eu-ai-act-article-31-and-the-commission-guidelines).
(Kap. 11)

**Abgeleitete sensible Daten.** Sensible Informationen, die ein System aus gewöhnlichen Eingaben
ableitet (Gesundheit aus Käufen, Überzeugungen aus Verhalten) oder durch ein Proxy-Feature trägt.
Washingtons My Health My Data Act deckt Gesundheitsdaten ab, die von Algorithmen oder maschinellem
Lernen abgeleitet werden [82]; Proxy-Tests und Inferenzrichtlinien machen es überprüfbar.
Kontrastieren Sie mit [Besondere Kategorien von Daten](/glossary/special-category-data). Siehe
[Kap. 19, Abgeleitete und Proxy-sensible Daten](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data).
(Kap. 19)

**Inhärentes Risiko.** Die Wahrscheinlichkeits- und Schweregradbewertung eines Risikoszenarios,
bevor eine Kontrolle berücksichtigt wird. Die Lücke zwischen inhärentem und Restrisiko ist der Wert,
der für die Kontrollen beansprucht wird, und muss durch deren Evidenz gestützt werden [30].
Kontrastieren Sie mit [Restrisiko](/glossary/residual-risk). Siehe
[Kap. 13, Inhärentes Risiko, Restrisiko und wer es akzeptiert](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(Kap. 13)

**Betriebsanleitung.** Die Informationen, die ein Anbieter eines Hochrisiko-KI-Systems Betreibern
geben muss: beabsichtigte Verwendung, erklärte Genauigkeit und Robustheit, bekannte Risiken, wie die
Ausgabe zu lesen ist, Maßnahmen zur menschlichen Aufsicht, Wartung und Protokollierung [2]. Am
besten aus dem Registereintrag und Testbericht generiert, damit die Zahlen mit der Evidenz
übereinstimmen. Siehe
[Kap. 14, Die technische Datei](/bok/governing-development#the-technical-file). (Kap. 14, 18)

**Zweckbestimmung.** Die Verwendung, für die der Anbieter ein KI-System vorsieht, einschließlich
seines spezifischen Kontexts und seiner Verwendungsbedingungen [2]. Die meisten Hochrisiko-Pflichten
werden gegen sie gemessen, daher ist sie ein Feld des Use-Case-Datensatzes, das Klassifizierung,
Tests und Betriebsanleitungen lesen. Ein Modell, das zu einem neuen Zweck verschoben wird, ist für
das Risiko ein neues System. Kontrastieren Sie mit
[Vernünftigerweise vorhersehbare Fehlanwendung](/glossary/reasonably-foreseeable-misuse). Siehe
[Kap. 14, Der Use-Case-Datensatz](/bok/governing-development#the-use-case-record);
[Kap. 11, Vom Definitionselement zum Registrierungsfeld](/bok/ai-defined#from-definition-element-to-registry-field).
(Kap. 11, 14)

**Interner Meldekanal.** Ein vertraulicher Weg für Mitarbeiter und Auftragnehmer, um Bedenken zu
KI-Systemen außerhalb der Befehlskette zu äußern, mit gesetzlich festgelegten Uhren (nach der
EU-Whistleblower-Richtlinie, Bestätigung innerhalb von sieben Tagen und Rückmeldung innerhalb von
drei Monaten) und Schutz vor Vergeltung [83]. Siehe
[Kap. 12, Ein Kanal zur Äußerung von Bedenken](/bok/governance-program#a-channel-for-raising-concerns).
(Kap. 12)

**Interpretierbarkeit.** In der Formulierung des NIST die Bedeutung der Ausgabe eines Systems im
Kontext seines Zwecks: warum eine Entscheidung getroffen wurde und was sie für den Benutzer bedeutet
[30]. Ein inhärent interpretierbares Modell, wie ein Scorecard oder ein flacher Baum, ist seine
eigene Erklärung. Kontrastieren Sie mit [Erklärbarkeit](/glossary/explainability). Siehe
[Kap. 16, Transparenz, Interpretierbarkeit und Erklärbarkeit](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[Kap. 16, Von Natur aus interpretierbar oder nachträglich erklärt](/bok/fairness-and-explainability#interpretable-by-design-or-explained-after-the-fact).
(Kap. 16)

**ISO/IEC 22989.** Der ISO/IEC-Standard (2022), der KI-Konzepte und Terminologie für die Verwendung
durch andere Standards und durch verschiedene Interessengruppen etabliert [40]. Die Benennung von
Registrierungsfeldern nach seinem Vokabular reduziert die Übersetzung bei der Prüfung gegen die
SC-42-Familie. Siehe
[Kap. 22, Grundlagen und Vokabular](/bok/principles-and-standards#foundations-and-vocabulary). (Kap.
11, 22)

**ISO/IEC 42001.** Der ISO/IEC-Standard (2023), der Anforderungen an ein KI-Managementsystem
spezifiziert und von akkreditierten Stellen zertifizierbar ist [48]. Seit 2026-09-24 ist er keine
harmonisierte Norm nach der KI-Verordnung, daher gibt eine Zertifizierung keine
Konformitätsvermutung [10]. Siehe
[Kap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio);
[Kap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006). (Kap.
07, 08, 22)

**ISO/IEC 42005.** ISO/IEC 42005:2025, der Standard für KI-System-Folgenabschätzungen (ein Begleiter
zu Artikel 27 FRIA der KI-Verordnung und zu ISO/IEC 42001 Annex A.5), der eine strukturierte Methode
zur Bewertung der Auswirkungen eines KI-Systems auf Menschen und Gesellschaft bietet [17]. Siehe
[Kap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006);
[Kap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(Kap. 08, 14)

**Issue (versus Incident).** Ein Mangel, eine Abweichung oder eine Kontrollschwäche, die noch kein
Schadenereignis verursacht hat, etwa eine Eval-Regression in der Staging-Umgebung oder eine
Drift-Warnung. Sie wird mit einem Verantwortlichen und einem Fälligkeitsdatum bis zur Behebung
nachverfolgt und löst keine rechtliche Frist aus; die meisten Issues sind Nichtkonformitäten im
Sinne des Managementsystems [48]. Vgl. [AI incident](/glossary/ai-incident). Siehe
[Kap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(Kap. 17)

## J

**Jailbreak.** Ein Prompt, der ein Modell dazu bringt, seine Sicherheitsanweisungen vollständig zu
ignorieren. OWASP behandelt Jailbreaking als eine Form von Prompt-Injection [84]; es wird mit
Red-Team-Suites im Eval Gate getestet und zur Laufzeit durch Guardrails entschärft, die nicht von
den eigenen Verweigerungen des Modells abhängen. Vgl.
[Prompt injection](/glossary/prompt-injection). Siehe
[Kap. 14, The test-type matrix](/bok/governing-development#the-test-type-matrix). (Kap. 14, 17)

**JSON Schema.** Ein Vokabular zur Beschreibung der Struktur von JSON-Dokumenten, damit ein
Validator sie überprüfen kann: welche Felder vorhanden sind, welche erforderlich sind, ihre Typen
und zulässigen Werte [85]. Die Templates-Bibliothek veröffentlicht ein Draft-2020-12-Schema pro
Governance-Datensatz, sodass ein Datensatz entweder validiert oder der Build fehlschlägt. Siehe
[Kap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal);
[Templates and schemas](/resources/templates). (Kap. 05)

**Begründungsmemorandum.** Der Intake-Bestand für einen KI-Anwendungsfall: das Problem, die
Nicht-KI-Alternative, der messbare Nutzen, wer Fehler trägt und wie sie diese anfechten,
Reversibilität und Kill-Kriterien. Es beantwortet "sollte KI überhaupt verwendet werden", bevor ein
System ein Gate erreicht, die Go/No-Go-Bestimmung, die NIST früh platziert [30]. Siehe
[Kap. 12, Strategie, Wert und ob KI überhaupt verwendet werden soll](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all).
(Kap. 12)

## K

**Key Risk Indicator (KRI).** Eine Metrik, die zeigt, ob ein Risiko sich dem Rand des Appetits
nähert (nicht registrierte KI gefunden, offene Ausnahmen nach Alter, Override-Raten), im Gegensatz
zu einem Key Performance Indicator, der zeigt, ob das Programm seine Aufgabe erfüllt. Siehe
[Kap. 12, KPIs and KRIs for leadership and the board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
(Kap. 12)

**Kill Switch.** Ein getesteter Mechanismus, um einen Agenten oder ein System am Handeln zu hindern;
eine Voraussetzung für die Gewährung von Autonomie, registriert gegen die Identität des Agenten.
Vgl. [Graduated degradation](/glossary/graduated-degradation). Siehe
[Kap. 05, Pattern: Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker);
[Kap. 23, Kill switch and per-agent circuit breakers](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers).
(Kap. 03, 05, 23)

## L

**Large Language Model (LLM).** Ein Foundation Model für Sprache, normalerweise von einem
Rechenzentrum hinter einer API bereitgestellt. Da Aufrufe durch ein Gateway geleitet werden, können
Runtime-Kontrollen (Tracing, Filterung, Stopp) zentral sitzen [86]. Vgl.
[Small language model (SLM)](/glossary/small-language-model-slm). Siehe
[Kap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (Kap. 11)

**Latent Disclosure.** Nach Kaliforniens AI Transparency Act Herkunftsinformationen, die in
KI-generierte Bilder, Videos oder Audio eingebettet sind, damit sie bestehen bleiben und von einem
Erkennungstool gelesen werden können, im Gegensatz zu einer sichtbaren Kennzeichnung, die dem
Benutzer angezeigt wird [87]. Vgl. [Watermarking](/glossary/watermarking). Siehe
[Kap. 21, Provenance, training data and frontier developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers).
(Kap. 21)

**Lawful Basis.** Einer der sechs Gründe in GDPR Artikel 6, die die Verarbeitung personenbezogener
Daten rechtmäßig machen: Einwilligung, Vertrag, rechtliche Verpflichtung, vitale Interessen,
öffentliche Aufgabe und berechtigte Interessen [38]. Für KI benötigt jeder Verarbeitungsmoment
(Training, Abruf, Inferenz, Protokollierung) eine eigene Grundlage, aufgezeichnet pro Datensatz und
Phase. Siehe
[Kap. 19, Lawful basis for training versus inference](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference).
(Kap. 19)

**Least Agency.** Das Prinzip in der OWASP-Agenten-Liste, einem Agenten nicht mehr Autonomie zu
geben, als seine Aufgabe benötigt: agentengesteuertes Verhalten, das dort eingesetzt wird, wo es
nicht nötig ist, vergrößert die Angriffsfläche ohne Mehrwert [6]. Die billigste Agentenkontrolle ist
der nicht gebaute Agent, etwa ein fester Workflow mit einem Modellaufruf anstelle eines Planers.
Vgl. [Autonomy level](/glossary/autonomy-level). Siehe
[Kap. 23, Governing AI agents](/bok/governing-agents). (Kap. 23)

**Legitimate-Interest Assessment (LIA).** Der dokumentierte dreistufige Test für die Berufung auf
berechtigte Interessen: ein rechtmäßiges, präzises und gegenwärtiges Interesse; Verarbeitung, die
dafür notwendig ist; und eine Abwägung, die nicht durch Rechte und angemessene Erwartungen von
Menschen überwunden wird [88]. Wird als versioniertes Artefakt geführt, das jede Minderung auf die
Kontrolle verweist, die sie umsetzt. Siehe
[Kap. 19, Legitimate interests and the three-step test](/bok/privacy-and-ai#legitimate-interests-and-the-three-step-test).
(Kap. 19)

**LIME.** Local Interpretable Model-agnostic Explanations: erklärt eine Vorhersage, indem ein
einfaches interpretierbares Modell an das Verhalten der Black Box auf gestörten Stichproben um die
Eingabe angepasst wird [89]; anfällig für Off-Manifold-Manipulation. Vgl. [SHAP](/glossary/shap).
Siehe
[Kap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(Kap. 16)

**Localisation (by jurisdiction).** Kontrolle darüber, wo ein KI-System läuft und welche Funktionen
es in jeder Gerichtsbarkeit bietet, mit pro-Gerichtsbarkeit-Regelsätzen als Code, regionalen
Instanzen, wo Residenzanforderungen dies erfordern, und Feature Flags nach Region, sodass ein Markt
ausgeschaltet werden kann, ohne die anderen zu berühren. Ein System wird in einer Gerichtsbarkeit
nur dann gestartet, wenn gezeigt wird, dass seine Pflichten dort erfüllt sind. Siehe
[Kap. 15, Localisation by jurisdiction](/bok/governing-deployment#localisation-by-jurisdiction);
[Kap. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(Kap. 05, 12, 15)

**Loss of Control.** Eines der systemischen Risiken, die der GPAI Code of Practice spezifiziert:
Risiken, dass Menschen die Fähigkeit verlieren, ein Modell zuverlässig zu lenken, zu ändern oder
abzuschalten, was aus Fehlausrichtung, Selbstreplikation, Täuschung, Widerstand gegen
Zielmodifikation oder Machtstreben entstehen kann [95]. Unterzeichner bewerten es für Modelle mit
systemischem Risiko; ein Betreiber von Agenten fragt, wie Autonomie und Werkzeugnutzung bewertet
wurden. Siehe
[Kap. 23, EU AI Act hooks for agents](/bok/governing-agents#eu-ai-act-hooks-for-agents);
[Kap. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice). (Kap. 08, 23)

## M

**Machine Learning.** Der Zweig der KI, in dem ein System eine Aufgabe verbessert, indem es Muster
aus Daten lernt, anstatt Regeln zu befolgen, die Menschen geschrieben haben. ISO/IEC 22989 gruppiert
seine Ansätze in überwachtes, unüberwachtes, halbüberwachtes und Verstärkungslernen [40]. Siehe
[Kap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (Kap. 11)

**Machine Unlearning.** Techniken, die den Einfluss eines Trainingsdatensatzes aus einem Modell
entfernen, ohne vollständiges Retraining. Exakte Methoden trainieren einen betroffenen Shard neu
[90]; ungefähre Methoden passen Gewichte an und sind schwer zu überprüfen, daher wird ein
Unlearning-Anspruch mit Membership-Inference- oder Extraction-Evals getestet. Vgl.
[Output suppression](/glossary/output-suppression). Siehe
[Kap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[Kap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (Kap.
05, 19)

**Machine-Readable Evidence.** Evidenz, die eine Maschine abfragen, vergleichen und aggregieren kann
(`OSCAL` Artefakte, strukturierte Eval-Ergebnisse, signierte Protokolle), im Gegensatz zu
Screenshots und exportierten Tabellenkalkulationen. Siehe
[Kap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(Kap. 03, 04, 05)

**Major ICT-related Incident (DORA).** Nach dem EU Digital Operational Resilience Act ein
ICT-bezogenes Incident bei einer Finanzeinheit, das die Klassifizierungskriterien für ein Major
Incident erfüllt. Es wird innerhalb von 4 Stunden nach Klassifizierung und spätestens 24 Stunden
nach Bekanntwerden (innerhalb von 4 Stunden nach einer Klassifizierung, die nach diesen 24 Stunden
erfolgt) gemeldet, dann in Zwischenberichten und Abschlussberichten [91]. Siehe
[Kap. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (Kap. 17)

**Manufacturing Defect.** In der Produkthaftung eine Abweichung einer Einheit von ihrem eigenen
Design [60]. Für KI: die falsche Modellversion, beschädigte Gewichte, ein falsch konfigurierter
Guardrail oder eine unterbrochene Datenpipeline im bereitgestellten System. Vgl.
[Design defect](/glossary/design-defect). Siehe
[Kap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(Kap. 20)

**Market Surveillance Authority.** Die nationale Behörde, die zur Durchsetzung der KI-Verordnung für
auf ihrem Markt platzierte Produkte bestimmt ist, mit Befugnissen zur Untersuchung, Forderung nach
Dokumentation und Anordnung von Korrekturmaßnahmen. Siehe
[Kap. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (Kap. 08, 18)

**Maturity Floor.** Die einzelne Gesamtreifegrad einer KI-Governance-Funktion: der Reifegrad ihrer
schwächsten Stack-Schicht. Es ist ein Boden für die Planung, nicht ein Urteil über die ganze
Funktion. Das Pro-Schicht-Profil zeigt, wo der Hebel liegt, und der nächste Schritt ist das nächste
Kriterium in der schwächsten Schicht. Siehe
[Kap. 07, Observable criteria by layer and level](/bok/maturity-model#observable-criteria-by-layer-and-level);
[Toolkit: Maturity self-check](/toolkit/maturity-self-check). (Kap. 07)

**MCP.** Model Context Protocol: ein offenes Protokoll zum Verbinden von KI-Anwendungen mit Tools
und Datenquellen; seine 2026-Spezifikation fügt OAuth 2.1-Ressourcen-Server-Muster und
Aussteller-gebundene Anmeldedaten für Agent-Autorisierung hinzu [8]. Es sichert den Hop zwischen
einem Client und einem Server; welcher Agent hinter dem Client sitzt, ist Sache einer
Workload-Identität. Vgl. [A2A (Agent2Agent protocol)](/glossary/a2a-agent2agent-protocol). Siehe
[Kap. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[Kap. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(Kap. 04, 05, 23)

**Membership Inference.** Ein Angriff, der bestimmt, ob ein spezifischer Datensatz einer Person in
der Trainingsmenge eines Modells war, basierend auf dem Verhalten des Modells [92]. Die EDPB zählt
Widerstand dagegen unter die Evidenz für die Behauptung, dass ein Modell anonym ist. Vgl.
[Model inversion](/glossary/model-inversion). Siehe
[Kap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (Kap. 19)

**Memory Poisoning.** Eine Injection, die in das Langzeitgedächtnis eines Agenten, einen
Abrufkorpus, einen Vektorspeicher oder einen gehosteten Memory-Service schreibt und dadurch jede
spätere Sitzung, die aus diesem Speicher liest, kontaminiert [128]. OWASPs Agentenliste führt es als
ASI06 Memory & Context Poisoning [6] und MITRE ATLAS als AI Agent Context Poisoning (AML.T0080)
[126] auf. Vergleichen Sie mit [Prompt injection](/glossary/prompt-injection). Siehe
[Kap. 23, Memory and context governance](/bok/governing-agents#memory-and-context-governance).
(Kap. 23)

**Mitigation hierarchy.** Die Reihenfolge, in der Risikobewältigungsmaßnahmen versucht werden:
eliminieren, ersetzen, technisch beherrschen, administrativ, dann akzeptieren und überwachen.
Entlehnt aus der Hierarchie der Kontrollen der Arbeitssicherheit [93] und gespiegelt in Artikel 9
Absatz 5 der KI-Verordnung [2]; höhere Stufen zuerst, mit dokumentiertem Grund, wenn sie nicht
machbar sind. Siehe
[Kap. 13, Treating risk: the mitigation hierarchy](/bok/risk-management#treating-risk-the-mitigation-hierarchy).
(Kap. 13)

**Model anonymity.** Der Test des EDPB für den Fall, dass ein trainiertes Modell außerhalb der DSGVO
fällt: Sowohl die direkte Extraktion von Daten der Trainingspersonen als auch deren Erlangung durch
Abfragen müssen unbedeutend sein, angesichts aller vernünftigerweise wahrscheinlich verwendeten
Mittel [88]. Nachgewiesen durch Designdokumente und Attack-Evals. Siehe
[Kap. 19, The EDPB anonymity test](/bok/privacy-and-ai#the-edpb-anonymity-test). (Kap. 19)

**Model Card.** Strukturierte, versionierte Dokumentation eines Modells (Herkunft, beabsichtigte
Verwendung, Fähigkeiten, Evaluationen und bekannte Fehlermodi), die als Code gepflegt wird.
Vergleichen Sie mit [System Card](/glossary/system-card) und [Data Card](/glossary/data-card). Siehe
[Kap. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets);
[Kap. 05, Pattern: Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence).
(Kap. 04, 05, 14)

**Model inversion.** Ein Angriff, der Merkmale von Trainingspersonen, wie ein Gesicht, aus den
Ausgaben und Konfidenzwerten eines Modells rekonstruiert [94]. Er kann ein bereitgestelltes Modell
in einen Kanal zur Offenlegung personenbezogener Daten verwandeln. Vergleichen Sie mit
[Membership inference](/glossary/membership-inference). Siehe
[Kap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (Kap. 19)

**Model risk management.** Die Bankaufsichtspraxis der Validierung von Modellen auf konzeptionelle
Solidität, Überwachung und Ergebnisanalyse unter wirksamer Überprüfung. SR 11-7 setzte die
US-Tradition bis SR 26-2 sie am 17. Apr 2026 ablöste [67], und SR 26-2 schließt generative und
agentenbasierte KI-Modelle aus seinem Geltungsbereich aus [121]. Ein Nachbargebiet dieser Disziplin,
hier erweitert auf Laufzeitverhalten und Agenten. Vergleichen Sie mit
[Risk management](/glossary/risk-management). Siehe
[Kap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management);
[Kap. 21, Sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai);
[Kap. 01, The disambiguation cluster](/bok/definition#the-disambiguation-cluster). (Kap. 01, 02, 13,
14, 21)

**Model signing.** Signieren der Modelldateien beim Build: Ein Manifest listet jede Datei mit ihrem
kryptografischen Hash auf, und eine abgelöste Signatur deckt das Manifest ab, sodass jede geänderte
Datei die Verifizierung fehlschlägt. Die OpenSSF Model Signing Specification verwendet das Sigstore
Bundle Format und unterstützt schlüssellose Signierung, private PKI, selbstsignierte Zertifikate
oder bloße Schlüssel [135]. Das Serving verifiziert die Signatur, bevor es ein Modell lädt.
Vergleichen Sie mit [Build provenance (SLSA)](/glossary/build-provenance-slsa). Siehe
[Kap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[Kap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (Kap. 05, 14, 15)

**Multimodal model.** Ein Modell, das mehr als eine Modalität (Text, Bild, Audio, Video) aufnimmt
oder erzeugt. Jede Modalität ist ein neuer Kanal für personenbezogene Daten, injizierte Anweisungen
und synthetische Inhalte, die möglicherweise gekennzeichnet werden müssen [2], daher sind Guardrails
und Evals pro Modalität erforderlich. Siehe
[Kap. 11, Multimodal models](/bok/ai-defined#multimodal-models). (Kap. 11)

## N

**Near miss.** Eine Gefahr, die eine Kontrolle oder Glück unterbrochen hat, bevor Schaden entstand:
das Guardrail blockierte die Datenabflusserkennung, der Prüfer erkannte die erfundene Dosierung.
Near-Miss-Daten sind Evidenz; der GPAI Code of Practice fordert Anbieter auf, verbundene
Near-Miss-Muster mit schwerwiegenden Vorfällen zu melden [95]. Vergleichen Sie mit
[AI hazard](/glossary/ai-hazard). Siehe
[Kap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(Kap. 17)

**Negative space.** Die Verwendungen, für die ein KI-System explizit nicht bestimmt ist, geschrieben
in seinen Deployment Decision Record. Sie liegt innerhalb der beabsichtigten Verwendung des
Anbieters und macht Function Creep erkennbar, da eine nicht genehmigte Verwendung irgendwo als
außerhalb des Geltungsbereichs aufgezeichnet werden kann. Siehe
[Kap. 15, Start from the use case, not the model](/bok/governing-deployment#start-from-the-use-case-not-the-model).
(Kap. 15)

**Neural data.** Informationen, die durch Messung der Aktivität des zentralen oder peripheren
Nervensystems einer Person generiert werden. Kalifornien behandelt es als sensible personenbezogene
Informationen [96], was Zustimmungs- und Bewertungspflichten für KI-Systeme auslöst, die Wearables
oder Brain-Computer-Interfaces auslesen. Siehe
[Kap. 19, Consumer-health and neural data](/bok/privacy-and-ai#consumer-health-and-neural-data).
(Kap. 19)

**NHI.** Nicht-menschliche Identität: die Identität eines Agenten, Dienstkontos oder Machine Actors.
Jede NHI erhält einen Registereintrag, einen Besitzer und einen Geltungsbereich, bevor sie handeln
darf. Vergleichen Sie mit [Workload identity](/glossary/workload-identity). Siehe
[Kap. 05, Pattern: Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials);
[Kap. 23, Identity and short-lived credentials](/bok/governing-agents#identity-and-short-lived-credentials).
(Kap. 04, 05, 23)

**NIST AI RMF.** Das NIST Artificial Intelligence Risk Management Framework 1.0 (NIST AI 100-1,
Januar 2023): freiwillige Anleitung organisiert als ein Kern aus vier Funktionen (Govern, Map,
Measure, Manage) mit Kategorien und Unterkategorien, plus Profile und ein begleitendes Playbook
[3][30]. Siehe
[Kap. 22, NIST AI RMF 1.0 in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth);
[Kap. 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf). (Kap. 08, 22)

**Notified body.** Eine Konformitätsbewertungsstelle, die unter der KI-Verordnung der EU zur
Durchführung der Konformitätsbewertung durch Dritte von Hochrisiko-KI-Systemen benannt ist. Nach dem
Verfahren der benannten Stelle bewertet sie das Qualitätsmanagementsystem und die technische
Dokumentation des Anbieters mit Zugang zu Trainings-, Validierungs- und Testdaten [2]. Siehe
[Kap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[Kap. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(Kap. 14, 18)

## O

**OECD AI Principles.** Die fünf wertbasierten Prinzipien (inklusives Wachstum und Wohlbefinden;
Menschenrechte, Fairness und Datenschutz; Transparenz und Erklärbarkeit; Robustheit, Sicherheit und
Sicherheit; Rechenschaftspflicht) und fünf politische Empfehlungen der OECD Recommendation on AI,
angenommen 2019 und überarbeitet 2024 [31]. Eine Verpflichtung durch beitretende Regierungen, keine
bindende Regel für Unternehmen. Siehe
[Kap. 22, OECD AI Principles](/bok/principles-and-standards#oecd-ai-principles). (Kap. 11, 22)

**OECD Framework for the Classification of AI Systems.** Ein OECD-Tool (2022) zur Charakterisierung
eines KI-Systems aus einer politischen Perspektive entlang fünf Dimensionen: People & Planet,
Economic Context, Data & Input, AI Model und Task & Output [97]. In der Engineeringpraxis werden
seine Dimensionen zu Gruppen von Registrierungsfeldern, die Kontrollen leiten. Siehe
[Kap. 22, The Framework for the Classification of AI Systems](/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems).
(Kap. 22)

**OPA/Rego.** Der Open Policy Agent und seine Rego-Richtliniensprache, eine universelle
Policy-as-Code-Engine, die Governance-Regeln in CI/CD und bei Laufzeit-Zulassung bewertet; das
kanonische Beispiel für ausführbare Policy-as-Code. Vergleichen Sie mit [Cedar](/glossary/cedar).
Siehe [Kap. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (Kap. 04, 05, 06)

**Opacity.** Die Unfähigkeit einer Person, nachzuvollziehen, wie ein System zu einer Ausgabe gelangt
ist. Sie hat drei Quellen (Geheimhaltung, technische Analphabetismus und die Natur und Skalierung
des maschinellen Lernens) [98], jede mit einer anderen Lösung: Offenlegung, Kompetenz und
Erklärungsmethoden plus Verhaltens-Evals. Vergleichen Sie mit
[Explainability](/glossary/explainability). Siehe
[Kap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance);
[Kap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (Kap. 11)

**Open-weight model.** Ein Modell, dessen trainierte Gewichte unter einer Lizenz zum Download
veröffentlicht werden, die permissiv, Copyleft, nutzungsbeschränkt oder benutzerdefiniert sein kann
[99]. Open Weights sind nicht Open Source; der Betreiber erzeugt fast alle Evidenz (Hashes, Scans,
Evals, Red Team) und muss die Lizenz und alle Acceptable-Use-Richtlinien einhalten. Vergleichen Sie
mit [Responsible-AI licence (OpenRAIL)](/glossary/responsible-ai-licence-openrail). Siehe
[Kap. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences);
[Kap. 18, Open-source carve-outs and their limits](/bok/eu-ai-act#open-source-carve-outs-and-their-limits).
(Kap. 15, 18)

**Operator (KI-Verordnung).** Der Sammelbegriff für die Akteure, die die KI-Verordnung bindet:
Anbieter, Produkthersteller, Betreiber, Bevollmächtigter, Einführer und Händler [2]. Dieselbe
Organisation kann für verschiedene Systeme oder für dasselbe mehrere Operatoren sein. Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 18)

**OSCAL.** Die Open Security Controls Assessment Language, ein maschinenlesbares NIST-Format für
Kontrollen, Bewertungen und Evidenz, hier als Format für auditfähige Nachweise verwendet [3]. Siehe
[Kap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(Kap. 04, 05, 10)

**Output suppression.** Ein Filter um ein Modell, der es daran hindert, die Daten einer Person zu
produzieren: die schnelle erste Antwort auf eine Lösch- oder Einspruchsanfrage, wenn die Daten in
den Gewichten sitzen und Umschulung unverhältnismäßig ist. Die CNIL akzeptiert Filter, die sich als
wirksam und robust erwiesen haben, und bevorzugt allgemeine Regeln gegenüber einer Namensliste
[140]. Die Daten bleiben im Modell. Vergleichen Sie mit
[Machine unlearning](/glossary/machine-unlearning). Siehe
[Kap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[Kap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (Kap.
05, 19)

## P

**Paved path.** Eine unterstützte, reibungslose Standardroute (eine Vorlage, Bibliothek oder
Pipeline), die den gesteuerten Weg zum einfachsten Weg macht, um zu versenden, sodass Ingenieure
Governance ohne Genehmigung übernehmen. Siehe
[Kap. 03, Make the governed path the easiest path](/bok/values-and-principles#make-the-governed-path-the-easiest-path).
(Kap. 03, 06)

**Personal data breach.** Ein Sicherheitsverstoß, der zur versehentlichen oder rechtswidrigen
Zerstörung, zum Verlust, zur Veränderung oder zur unbefugten Offenlegung oder zum Zugriff auf
personenbezogene Daten führt, der der Behörde innerhalb von 72 Stunden mitgeteilt wird, es sei denn,
es ist unwahrscheinlich, dass ein Risiko entsteht [38]. KI fügt Regurgitation, Inversion und
Prompt-Injection-Exfiltration als Routen hinzu. Siehe
[Kap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (Kap. 19)

**PIPIA.** Chinas Datenschutz-Folgenabschätzung unter PIPL Artikel 55 und 56, erforderlich im Voraus
für sensible Daten, automatisierte Entscheidungsfindung, beauftragte Verarbeitung und
grenzüberschreitende Bereitstellung, mit dem Bericht mindestens drei Jahre lang aufbewahrt [100].
Vergleichen Sie mit [DPIA](/glossary/dpia). Siehe
[Kap. 19, Brazil and China](/bok/privacy-and-ai#brazil-and-china). (Kap. 19)

**Inverkehrbringen.** Nach der KI-Verordnung der EU die erste Bereitstellung eines KI-Systems oder
KI-Modells mit allgemeinem Verwendungszweck auf dem Unionsmarkt; spätere Lieferungen im Rahmen einer
Geschäftstätigkeit sind Bereitstellung auf dem Markt [2]. Für ein Hochrisiko-System müssen die
Konformitätsbewertung und die technische Dokumentation davor oder vor der Inbetriebnahme erfolgen.
Unterschied zu [Inbetriebnahme](/glossary/putting-into-service). Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (Kap. 08, 14, 15, 18, 20)

**Policy Card.** Ein JSON-Schema, ein maschinenlesbares Governance-Artefakt, das die zulässigen und
verbotenen Verhaltensweisen eines Agenten für die Durchsetzung zur Laufzeit deklariert [11]. Siehe
[Kap. 05, Pattern: Policy Card](/bok/patterns#pattern-policy-card). (Kap. 04, 05, 10, 23)

**Policy verdict.** Der strukturierte Datensatz, den eine Policy-Engine jedes Mal ausgibt, wenn sie
eine Regel bewertet: zulassen oder ablehnen, die versionierte Regel-ID, ein Hash der Eingabe und
einen Zeitstempel, signiert und in den Evidence Store geschrieben. Ein Release oder Toolaufruf ohne
Verdict ist ein Audit-Befund, und einer, der unter einer Ausnahme bestanden hat, nennt diese in
seinem Verdict. Siehe [Kap. 04, Layer 01: Govern-as-Code](/bok/the-stack#layer-01-govern-as-code);
[Toolkit: Policy Card builder](/toolkit/policy-card). (Kap. 04, 05, 12, 23)

**Policy-as-Code.** Governance-Richtlinie, ausgedrückt in einer ausführbaren Policy-Sprache
(`OPA/Rego`, Cedar), die in CI/CD und bei der Zulassung bewertet wird; die engere,
Pipeline-Teilmenge von Governance-as-Code. Unterschied zu
[Governance-as-Code](/glossary/governance-as-code). Siehe
[Kap. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (Kap. 04, 05, 06)

**Beobachtung nach dem Inverkehrbringen.** Die Pflicht nach Artikel 72 der KI-Verordnung, die
Leistung und Risiken eines Hochrisiko-Systems nach der Bereitstellung aktiv zu überwachen, während
seiner gesamten Lebensdauer [2]. Siehe
[Kap. 18, Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(Kap. 08, 18)

**Vorbestimmte Änderungen.** Änderungen an einem Hochrisiko-System, das weiterhin lernt, die vom
Anbieter bei der anfänglichen Konformitätsbewertung geplant und in der technischen Dokumentation
beschrieben werden; sie sind keine wesentlichen Veränderungen [2]. Entwickelt als ein in Code
geschriebener Änderungsrahmen. Unterschied zu
[Wesentliche Veränderung](/glossary/substantial-modification). Siehe
[Kap. 14, Substantial modification](/bok/governing-development#substantial-modification). (Kap. 14)

**Prädiktive KI.** KI, die eine Schätzung über etwas ausgibt, das existiert: einen Score, eine
Klasse oder eine Vorhersage [21]. Ihre Schäden sind hauptsächlich Allokationsschäden, und ihre
Nachweise sind Genauigkeit, Kalibrierung und Fehlerquoten nach Untergruppe, mit einem
Entscheidungsschwellenwert, den jemand trägt. Auch diskriminative KI genannt. Unterschied zu
[Generative KI](/glossary/generative-ai). Siehe
[Kap. 11, Predictive versus generative](/bok/ai-defined#predictive-versus-generative). (Kap. 11)

**Vermutung der Konformität.** Die Rechtsfolge nach Artikel 40 der KI-Verordnung: ein
Hochrisiko-System oder GPAI-Modell, das den im Amtsblatt angeführten harmonisierten Normen
entspricht, wird vermutet, die Anforderungen zu erfüllen, die diese Normen abdecken, und keine
anderen [2]. Nicht verfügbar, bis eine Norm angeführt wird, was zum 2026-09-24 nicht der Fall ist
[10]. Siehe
[Kap. 22, How presumption of conformity works](/bok/principles-and-standards#how-presumption-of-conformity-works).
(Kap. 08, 22)

**Datenschutz durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.** Die
Pflicht nach Artikel 25 der DSGVO, Datenschutzprinzipien durch technische und organisatorische
Maßnahmen in die Verarbeitung einzubauen und standardmäßig nur die personenbezogenen Daten zu
verarbeiten, die jeder Zweck benötigt [38]. In einem KI-Stack zeigt sich dies als Filter,
Aufbewahrungsregeln und Zugriffsbeschränkungen, die als Code durchgesetzt werden. Siehe
[Kap. 19, Minimisation, privacy by design and PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(Kap. 19)

**Datenschutzfreundliche Technologie (PET).** Ein Verfahren, das reduziert, was ein Angreifer,
Anbieter oder Insider aus personenbezogenen Daten lernen kann, wie Differential Privacy, Federated
Learning, synthetische Daten, Maskierung oder vertrauenswürdige Ausführung [61]. Keine macht ein
System allein konform; jede hat einen bekannten Fehlermodus und wird durch einen Test nachgewiesen.
Siehe
[Kap. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(Kap. 19)

**Richtlinie über die Haftung für fehlerhafte Produkte (PLD).** Richtlinie (EU) 2024/2853, die
Software, einschließlich KI, als Produkt behandelt; Mängel unter Berücksichtigung von Lernfähigkeit
und Updates beurteilt; Gerichten die Anordnung von Offenlegung gestattet und Mangelhaftigkeit
vermutet; und auf Produkte anwendbar ist, die nach dem 9. Dezember 2026 auf den Markt gebracht
werden [101]. Siehe
[Kap. 20, The EU Product Liability Directive](/bok/existing-law#the-eu-product-liability-directive).
(Kap. 20)

**Profiling-Ausnahmeregelung.** Die Regel im dritten Unterabsatz von Artikel 6(3) der KI-Verordnung,
dass ein System des Anhangs III, das Profiling von natürlichen Personen durchführt, immer
hochrisikobehaftet ist, unabhängig davon, welche Filterbedingung es erfüllt [2]. Ein
Klassifizierungsentscheidungsdatensatz trägt daher ein explizites Profiling-Flag, sodass ein
Filteranspruch, den die Ausnahmeregelung besiegt, sichtbar ist. Unterschied zu
[Article 6(3) filter](/glossary/article-6-3-filter). Siehe
[Kap. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (Kap. 08, 18)

**Progressive Bereitstellung.** Freigabe einer Änderung für einen kleinen, wachsenden Anteil des
echten Datenverkehrs in Stufen (Shadow, Pilot, Canary, allgemeine Verfügbarkeit), jede mit
Rollback-Kriterien, die vor dem Start registriert sind, und ein getesteter Weg zurück zur vorherigen
Version, sodass Nachweise über das Live-Verhalten vor vollständiger Exposition ankommen. Für
KI-Systeme umfasst dies Modell-, Prompt-, Corpus- und Anbieter-Versionsänderungen gleichermaßen.
Siehe
[Kap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[Kap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(Kap. 05, 14, 15, 23)

**Verbotene Praktik.** Eine KI-Praktik, die durch Artikel 5 der KI-Verordnung vollständig verboten
ist, wie manipulative Techniken, die erheblichen Schaden verursachen, Social Scoring, ungezielte
Erfassung von Gesichtsbildern, Emotionserkennung bei der Arbeit oder in der Schule und die meisten
Echtzeit-Fernidentifizierungen biometrischer Daten in der Öffentlichkeit durch
Strafverfolgungsbehörden [2]. Keine Risikoakzeptanz kann eine abdecken. Unterschied zu
[Hochrisiko-KI-System](/glossary/high-risk-ai-system). Siehe
[Kap. 18, Prohibited practices (Article 5)](/bok/eu-ai-act#prohibited-practices-article-5).
(Kap. 18)

**Prompt-Injection.** Eine Eingabe, die das Verhalten oder die Ausgabe eines Modells auf Weise
ändert, die seine Designer nicht beabsichtigt haben. Sie ist direkt, wenn der Benutzer sie liefert,
und indirekt, wenn sie in Inhalten ankommt, die das Modell verarbeitet, wie eine Webseite, Datei
oder ein Toolergebnis [84]. Enthalten durch Guardrails, Least-Privilege-Tools und Evals. Unterschied
zu [Jailbreak](/glossary/jailbreak) und
[Hidden Context Exposure](/glossary/hidden-context-exposure). Siehe
[Kap. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(Kap. 01, 04, 17, 23)

**Verhältnismäßige Governance.** Ausführung derselben Risikoschleife mit einer Intensität, die durch
Organisationsgröße, Sektor, Reife und Risikotoleranz festgelegt wird, über einem Minimum von
Kontrollen, das niemals angepasst wird. Die KI-Verordnung selbst skaliert Dokumentations- und
Qualitätsmanagemenpflichten für kleinere Unternehmen [2]. Sie senkt die Kosten der Governance, nicht
den geschuldeten Schutz. Siehe
[Kap. 13, Proportionate governance: tailoring the loop](/bok/risk-management#proportionate-governance-tailoring-the-loop).
(Kap. 13)

**Anbieter.** Nach der KI-Verordnung der EU, wer ein KI-System oder KI-Modell mit allgemeinem
Verwendungszweck entwickelt oder entwickeln lässt und es unter seinem eigenen Namen oder seiner
Marke auf den Markt bringt oder in Betrieb nimmt, ob gegen Bezahlung oder kostenlos [2]. Es trägt
die Design-, Dokumentations-, Konformitäts- und Überwachungspflichten für Hochrisiko-Systeme.
Unterschied zu [Betreiber](/glossary/deployer). Siehe
[Kap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (Kap. 15, 18)

**Proxy-Label.** Ein Trainingsziel, das für das Konstrukt steht, das eine Entscheidung erfassen
soll, wie Gesundheitskosten für Gesundheitsbedarf [102]. Wenn der Proxy durch ungleiche Behandlung
geprägt ist, kann ein Modell auf dem Proxy genau und auf dem Konstrukt verzerrt sein. Unterschied zu
[Proxy-Variable](/glossary/proxy-variable). Siehe
[Case: a health risk score with a proxy label](/cases/health-risk-score-proxy). (Kap. 16)

**Proxy-Scan.** Ein Test, der ein Modell trainiert, um ein geschütztes Merkmal aus den Merkmalen
eines Systems vorherzusagen; Merkmale, die es stark vorhersagen, werden als Proxies gekennzeichnet,
um sie zu rechtfertigen oder zu entfernen, und das Ergebnis wird in der Data Card aufgezeichnet. Es
findet Proxy-Variablen, bevor eine Outcome-Metrik ihre Auswirkung zeigt. Siehe
[Kap. 16, Fairness and explainability in the stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[Kap. 05, Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (Kap. 05, 16)

**Proxy-Variable.** Ein Merkmal, das die Information eines geschützten Merkmals trägt, wie
Postleitzahl für Ethnizität, sodass ein Modell diskriminieren kann, ohne das Merkmal selbst zu
verwenden. Proxy-Tests suchen nach Merkmalen, die das geschützte Merkmal vorhersagen [102].
Unterschied zu [Proxy-Label](/glossary/proxy-label). Siehe
[Kap. 16, Protected characteristics, proxies and the data you need to test](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
(Kap. 16, 20)

**Pseudonymisierung.** Verarbeitung personenbezogener Daten, sodass sie nicht mehr einer Person
zugeordnet werden können, ohne zusätzliche Informationen, die separat und geschützt aufbewahrt
werden {[38]}. Pseudonymisierte Daten bleiben personenbezogene Daten für denjenigen, der sie neu
zuordnen kann; es ist eine Sicherheitsmaßnahme, keine Anonymisierung. Unterschied zu
[Anonyme Daten](/glossary/anonymous-data). Siehe
[Kap. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(Kap. 19)

**Zweckbindung.** Das DSGVO-Prinzip, dass personenbezogene Daten, die für einen bestimmten Zweck
erhoben wurden, nicht auf unvereinbare Weise weiterverarbeitet werden dürfen; Artikel 6(4) setzt den
Kompatibilitätstest [38]. In KI-Pipelines durchgesetzt durch Zweck-Tags auf Datensätzen und eine
Richtlinie, die Läufe ablehnt, deren erklärter Zweck nicht übereinstimmt. Siehe
[Kap. 19, Purpose limitation and function creep](/bok/privacy-and-ai#purpose-limitation-and-function-creep).
(Kap. 19)

**Inbetriebnahme.** Nach der KI-Verordnung der EU die Lieferung eines KI-Systems zur ersten
Verwendung direkt an den Betreiber oder zur Verwendung durch den Anbieter selbst in der Union für
seinen vorgesehenen Zweck {[2]}. Eigennutzung zählt: Eine Organisation, die ein System baut und
selbst betreibt, ist sein Anbieter und sein Betreiber, ohne dass ein Verkauf stattfindet.
Unterschied zu [Inverkehrbringen](/glossary/placing-on-the-market). Siehe
[Kap. 18, Roles name tasks, not organisations](/bok/eu-ai-act#roles-name-tasks-not-organisations);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (Kap. 15, 18)

## Q

**QMS (Art. 17).** Das Qualitätsmanagementsystem, das Artikel 17 der KI-Verordnung von
Hochrisiko-Anbietern verlangt; unterschiedlich von einem ISO/IEC 42001 AIMS, das ein
Managementsystem zertifiziert, aber nicht harmonisiert ist {[2][10]}. Unterschied zu
[AIMS](/glossary/aims). Siehe
[Kap. 18, Article 16 and the quality management system (Article 17)](/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17).
(Kap. 08, 18)

## R

**RAISE Act.** New Yorks Responsible AI Safety and Education Act, ein Frontier-AI-Sicherheitsgesetz,
das große Frontier-Entwickler verpflichtet, ein Sicherheitskonzept zu veröffentlichen, und jeden
Frontier-Entwickler zur Meldung kritischer Sicherheitsvorfälle verpflichtet; unterzeichnet am 19.
Dezember 2025 und tritt am 1. Januar 2027 in Kraft, nachdem eine Änderung im März 2026 die Aufsicht
in ein Büro innerhalb des Department of Financial Services (DFS) verlagert hat [12][15]. Siehe
[ch. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Tatsächliche Risikominderung.** Der gemessene Rückgang der Rate oder des Schadensumfangs eines
benannten Fehlermodus in der Produktion; einer der beiden Tests der Disziplin, gegen die
Framework-Abdeckung. Siehe
[ch. 03, 7. Success is measured in realised risk reduction, not framework coverage](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage).
(ch. 01, 03)

**Begründungscode.** Eine stabile, für Menschen lesbare Aussage über einen Hauptfaktor hinter einer
nachteiligen Entscheidung, abgebildet aus den Faktoren, die das Modell tatsächlich bewertet hat, und
mit dem Modell versioniert; im Wesentlichen erforderlich durch US-amerikanische Regeln für
nachteilige Maßnahmen [23]. Siehe
[ch. 16, Credit: adverse-action notices and reason codes](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes);
[ch. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[ch. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (ch. 05, 16, 20)

**Vernünftigerweise vorhersehbare Fehlanwendung.** Verwendung eines KI-Systems nicht gemäß seiner
Zweckbestimmung, die sich aus vernünftigerweise vorhersehbarem menschlichem Verhalten oder der
Interaktion mit anderen Systemen, einschließlich anderer KI-Systeme, ergeben kann [2]. Unterscheidet
sich von einem Angriff; wird in einem Missbrauchsregister geführt, das Tests, Laufzeitrichtlinien
und die Betriebsanleitung speist. Vergleichen Sie mit
[Intended purpose](/glossary/intended-purpose). Siehe
[ch. 14, Reasonably foreseeable misuse](/bok/governing-development#reasonably-foreseeable-misuse);
[ch. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm).
(ch. 14, 15)

**Verzeichnis von Verarbeitungstätigkeiten (VVT).** Das Verzeichnis nach Artikel 30 DSGVO jeder
Verarbeitungstätigkeit: Zwecke, Kategorien von Daten und Personen, Empfänger, Übermittlungen,
Aufbewahrung und Sicherheit [38]. Für KI wird es am besten pro Verarbeitungsmoment aus dem Register
und den Data Cards generiert, damit es nicht veraltet. Siehe
[ch. 19, Records of processing](/bok/privacy-and-ai#records-of-processing). (ch. 19)

**Abhilfe.** Die Fähigkeit einer Person, eine andere Entscheidung zu erhalten, indem sie Eingaben
ändert, auf die sie tatsächlich einwirken kann, wie Einkommen statt Alter [103]. Kontrafaktische
Erklärungen, die auf umsetzbare Merkmale beschränkt sind, sind ihre übliche technische Form; ein
System kann Einspruch anbieten und dennoch keine Abhilfe lassen. Vergleichen Sie mit
[Contestability](/glossary/contestability). Siehe
[ch. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(ch. 16, 21)

**Red Teaming.** Strukturiertes adversariales Testen eines Modells oder Agenten, um Fehler
(Jailbreaks, Injection, Tool-Missbrauch) zu offenbaren, bevor ein Angreifer dies tut; wird hier als
eine Nachweise produzierende Kontrolle behandelt. Siehe
[ch. 05, Pattern: Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite).
(ch. 04, 05, 15)

**Regurgitation.** Ein Modell, das auswendig gelernte Trainingsdaten wörtlich reproduziert,
einschließlich personenbezogener Daten, ob absichtlich (Trainingsdaten-Extraktion) oder nicht [104].
Erkannt durch Ausgabeprüfungen und Kanarienvögel, und getestet durch Extraktions-Evals. Vergleichen
Sie mit [Hallucination](/glossary/hallucination). Siehe
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch.
19, 20)

**Reinforcement Learning.** Lernen, um ein Belohnungssignal durch Versuch und Rückmeldung zu
maximieren [40]. Sein charakteristisches Versagen ist Reward Hacking, daher wird die Belohnung als
Ziel des Systems aufgezeichnet und Evals suchen nach unbeabsichtigten Strategien. Siehe
[ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Reinforcement Learning from Human Feedback (RLHF).** Eine Möglichkeit, ein vortrainiertes Modell
auszurichten: überwachtes Fine-Tuning auf menschlichen Demonstrationen, dann Reinforcement Learning
gegen ein Belohnungsmodell, das auf menschlichen Rankings von Ausgaben trainiert wurde [105]. Die
Anweisungen der Bewerter und das Belohnungsmodell werden zu verwalteten Artefakten, da sie
beeinflussen, was das Modell ablehnt und bevorzugt. Vergleichen Sie mit
[Fine-tuning](/glossary/fine-tuning). Siehe
[ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Meldungsfrist.** Eine gesetzliche Frist für eine Vorfallmitteilung, definiert durch ihren Auslöser
(Kenntnis, Klassifizierung, Kausalzusammenhang oder Feststellung), Empfänger, Inhalt und
Folgemaßnahmen, wie in Artikel 73 der KI-Verordnung [2]. Ein Ereignis kann mehrere Uhren starten,
daher wird jede als eigener Timer in einem einzelnen Vorfallsdatensatz geführt. Siehe
[ch. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (ch. 17)

**Restrisiko.** Was von einem Risiko übrig bleibt, nachdem eine Behandlung angewendet wurde [30].
Die KI-Verordnung der EU verlangt, dass das Restrisiko pro Gefährdung und insgesamt für
Hochrisiko-Systeme als akzeptabel beurteilt wird [2]. Eine Restrisikobewertung berücksichtigt nur
Kontrollen, deren Nachweise aktuell sind. Vergleichen Sie mit
[Inherent risk](/glossary/inherent-risk) und [Risk tolerance](/glossary/risk-tolerance). Siehe
[ch. 13, Inherent risk, residual risk and who accepts it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(ch. 13)

**Responsible-AI-Lizenz (OpenRAIL).** Eine Lizenz, die offenen, gebührenfreien Zugang zu einem
KI-Artefakt gewährt, während sie verbotene Verwendungen anhängt, die jede Weitergabe und jedes
Derivat weitertragen muss [106]. Die Einschränkungen reisen mit dem Modell, daher müssen die eigenen
Nutzungsbedingungen eines Betreibers diese wiederholen. Vergleichen Sie mit
[Open-weight model](/glossary/open-weight-model). Siehe
[ch. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences). (ch. 15)

**Responsible-AI-Prinzipiensatz.** Ein veröffentlichter Satz normativer Ziele für KI, wie die OECD
AI Principles [31], die UNESCO Recommendation, die HLEG-Anforderungen oder die G7
Hiroshima-Prinzipien. Nicht das Haus-"Prinzip", das eine Methodenanweisung ist; ein Prinzipiensatz
zählt als angewendet nur, wenn ein Artefakt ihn nachweist. Vergleichen Sie mit
[Trustworthy AI](/glossary/trustworthy-ai). Siehe
[ch. 11, Responsible-AI principle sets, engineered](/bok/ai-defined#responsible-ai-principle-sets-engineered).
(ch. 11)

**Retrieval-augmented Generation (RAG).** Ein System, das das gelernte Gedächtnis eines Modells mit
einem abrufbaren Dokumentenspeicher zum Zeitpunkt der Antwort kombiniert [107]. Das Korpus wird zum
Verhalten, daher wird es wie ein Modell verwaltet: versioniert, kartiert, an die Eval gebunden, die
es getestet hat, mit einer Berechtigungsprüfung auf das, was jeder Benutzer abrufen darf. Siehe
[ch. 11, RAG systems](/bok/ai-defined#rag-systems). (ch. 11, 16)

**Reward Hacking.** Ein System, das einen unbeabsichtigten Weg findet, um seine Belohnung oder sein
Ziel zu maximieren, ohne das zu tun, was seine Designer beabsichtigten [108]. Beantwortet durch
Aufzeichnung des Ziels und Testen auf unbeabsichtigte Strategien, nicht nur für die beabsichtigte
Aufgabe. Siehe [ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Recht auf Erklärung (KI-Verordnung Art. 86).** Das Recht einer Person, die von einer Entscheidung
eines Betreibers betroffen ist, die auf der Ausgabe eines Hochrisiko-Systems des Anhangs III
basiert, mit rechtlichen oder ähnlich erheblichen nachteiligen Auswirkungen, auf klare und
aussagekräftige Erklärungen der Rolle des Systems und der Hauptelemente der Entscheidung, soweit das
Unionsrecht dies nicht bereits vorsieht [2]. Vergleichen Sie mit
[Explainability](/glossary/explainability). Siehe
[ch. 18, Explanation and notice to affected people](/bok/eu-ai-act#explanation-and-notice-to-affected-people).
(ch. 16, 18, 19)

**Rechtevorbehalt (TDM-Opt-out).** Ein Vorbehalt eines Rechteinhabers zum Text- und Data Mining nach
Artikel 4(3) der DSM-Richtlinie, der den Inhalt aus der allgemeinen Mining-Ausnahme herausnimmt; für
Inhalte, die online öffentlich zugänglich gemacht werden, muss dies auf angemessene Weise erfolgen,
wie durch maschinenlesbare Mittel [115]. Anbieter von KI-Modellen mit allgemeinem Verwendungszweck
müssen solche Vorbehalte identifizieren und einhalten [2]. Vergleichen Sie mit
[TDM exception](/glossary/tdm-exception). Siehe
[ch. 20, Artefacts that evidence IP compliance](/bok/existing-law#artefacts-that-evidence-ip-compliance);
[ch. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (ch. 05, 08,
12, 20)

**Risikoakzeptanz.** Eine benannte, unterzeichnete und ablaufende Entscheidung durch jemanden mit
der Autorität, die ein Restrisiko-Band erfordert, dass ein Risiko für einen begrenzten Zeitraum
unter benannten Kompensationskontrollen und einem Überwachungssignal, das es aufhebt, bestehen
bleiben darf [30]. Die Autorität steigt mit der Bewertung; eine verbotene Verwendung kann von
niemandem akzeptiert werden. Vergleichen Sie mit [Exception register](/glossary/exception-register).
Siehe [ch. 13, Who may accept](/bok/risk-management#who-may-accept);
[ch. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(ch. 12, 13)

**Risikobereitschaft.** Wie viel Risiko und welche Arten davon eine Organisation bereit ist,
einzugehen, um ihre Ziele zu verfolgen [109]. In diesem Buch wird es aus einer genehmigten Erklärung
in eine versionierte Datendatei kompiliert, die Lesezugriffe steuert, anstatt es in einem
Vorstandspapier zu belassen. Vergleichen Sie mit [Risk tolerance](/glossary/risk-tolerance). Siehe
[ch. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(ch. 13)

**Risikomanagement.** Die organisierte Praxis, die Entscheidungen einer Organisation mit ihren
Risiken im Blick zu steuern [109]: identifizieren, bewerten, behandeln und überwachen, in einer
Schleife. Für Hochrisiko-Systeme verlangt die KI-Verordnung ein dokumentiertes
Risikomanagementsystem über den gesamten Lebenszyklus [2]. Vergleichen Sie mit
[Model risk management](/glossary/model-risk-management). Siehe
[ch. 13, The loop: identify, assess, treat, monitor](/bok/risk-management#the-loop-identify-assess-treat-monitor).
(ch. 13)

**Risikomatrix.** Ein Gitter, das eine Wahrscheinlichkeitsbewertung und eine Schweregradbewertung,
jeweils auf definierten Skalen, in ein Band umwandelt, das eine Behandlung, ein Gate und einen
Überprüfungsrhythmus auslöst. Nützlich für Konsistenz, nicht für Präzision [110]; behalten Sie die
Zahlen hinter jeder Zelle. Siehe
[ch. 13, Assessing risk: the likelihood-by-severity matrix](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix).
(ch. 13)

**Risikoregister.** Der Nachweisdatensatz der Risikoschleifen: eine versionierte Datei pro Risiko,
mit einem Registry-ID verschlüsselt, mit Bewertungen, Behandlung, Kontrollen, die sich zu Nachweisen
auflösen, Eigentümer, Akzeptanz, Überprüfungsrhythmus und Links zu Evals, Vorfällen und
Verpflichtungen. Deploy Gates lesen es; es belegt ein Risikomanagementsystem nach Artikel 9 [2].
Vergleichen Sie mit [Exception register](/glossary/exception-register). Siehe
[ch. 13, The risk register as an evidence record](/bok/risk-management#the-risk-register-as-an-evidence-record).
(ch. 13)

**Risikoquelle.** Alles, das allein oder in Kombination Risiken verursachen kann, wie ein Datensatz,
eine Tool-Berechtigung, ein Gegner oder eine Benutzergruppe [111]. Interne Quellen liegen innerhalb
der Kontrolle der Organisation; externe entstehen außerhalb und werden hauptsächlich dagegen
konstruiert und überwacht. Vergleichen Sie mit [Contributing factor](/glossary/contributing-factor).
Siehe
[ch. 13, Internal and external risk sources](/bok/risk-management#internal-and-external-risk-sources).
(ch. 13)

**Risikostufe.** Die eigene Bewertung einer Organisation für einen KI-Anwendungsfall, berechnet bei
der Aufnahme durch eine versionierte Richtlinie aus deklarierten Profilfeldern wie Autonomie,
Entscheidungsauswirkung, Exposition, Reversibilität, vulnerable Gruppen, Datenklasse und Dritte. Die
Stufe wählt die Bewertungen, Evals, Schwellwerte, Genehmiger und Überprüfungshäufigkeit aus, die ein
System durchlaufen muss; sie steht neben der rechtlichen Klassifizierung, nicht an ihrer Stelle.
Unterschied zu [Hochrisiko-KI-System](/glossary/high-risk-ai-system). Siehe
[Kap. 13, Contributing factors and the use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile);
[Kap. 05, Pattern: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (Kap.
05, 06, 12, 13)

**Risikotoleranz.** Die Bereitschaft, ein bestimmtes Risiko zu tragen, um Ziele zu erreichen [30].
Konstruiert als das höchste Restrisiko-Band, das eine Systemstufe tragen darf, bevor ein
Deployment-Gate eine unterzeichnete Akzeptanz erfordert. Unterschied zu
[Risikoappetit](/glossary/risk-appetite). Siehe
[Kap. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(Kap. 13)

**Rollback-Kriterien.** Die Bedingungen, die vor Beginn einer Release-Phase in den Rollout-Plan
geschrieben werden, unter denen die Pipeline automatisch zur vorherigen Version zurückkehrt: eine
Schwelle gegenüber der Kontrollgruppe unterschritten, eine Abweichungs- oder Überschreibungsrate
über einem Schwellwert, ein Severity-1-Ereignis. Ein Kriterium, das nach der Metrikänderung
festgelegt wird, ist eine Verhandlung, keine Kontrolle. Unterschied zu
[Kill Switch](/glossary/kill-switch). Siehe
[Kap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[Kap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(Kap. 05, 15)

**Root-Cause-Analyse (RCA).** Die Überprüfung, die beantwortet, warum ein Incident passiert ist und
warum die Kontrollen ihn nicht gestoppt haben, unter Verwendung von Techniken wie Five Whys,
Fehlerbaumanalyse [112] und blameless post-mortems, und kodiert jede bestätigte Ursache gegen eine
Taxonomie, die die Kontrolle benennt, die sie hätte erfassen sollen. Siehe
[Kap. 17, Root-cause analysis](/bok/incidents#root-cause-analysis). (Kap. 17)

**Runtime-Datenpfad.** Die Live-Verbindung zwischen Produktion und der Governance-Funktion
(Discovery, Telemetrie und Enforcement), ohne die ein Register oder Dashboard das Programm
beschreibt, aber nicht sehen kann, was läuft [13]. Siehe
[Kap. 02, 5. No runtime data path](/bok/why-now#5-no-runtime-data-path). (Kap. 02, 04, 07)

## S

**Safetensors.** Ein Dateiformat zum sicheren Speichern der Tensoren eines Modells, im Gegensatz zu
Python pickle [137]}, dessen Laden beliebigen Code ausführen kann und das die Python-Dokumentation
als nicht sicher bezeichnet [138]. Das Speichern von Gewichten als Safetensors und das Scannen
verbleibender Pickle-Dateien auf Code-ausführende Importe, bevor sie ein Register erreichen,
schließt eine häufige Supply-Chain-Route zum Serving. Siehe
[Kap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[Kap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (Kap. 05, 14)

**Sicherheitsbauteil.** Nach der 2026 geänderten KI-Verordnung eine Komponente eines Produkts oder
KI-Systems, deren Zweckbestimmung darin besteht, Risiken für die Gesundheit und Sicherheit von
Personen oder Eigentum zu verhindern oder zu mindern, oder deren Ausfall diese gefährdet. KI, die
ausschließlich für Komfort, Effizienz oder Qualitätskontrolle verwendet wird, ist ausgeschlossen, es
sei denn, ihr Ausfall würde die Sicherheit gefährden [2]. Siehe
[Kap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(Kap. 18)

**Sanctioned AI Gateway.** Die einzige genehmigte Route, über die Mitarbeiter KI-Tools und
Modell-APIs erreichen: genehmigte Tools hinter Single Sign-On und ein Gateway, das jede Anfrage nach
Datenklasse klassifiziert, zulässt, redigiert oder blockiert sie unter der
Acceptable-Use-Richtlinie, prüft auf eine aktuelle Attestierung und protokolliert eine Entscheidung
pro Aufruf. Es funktioniert, indem es die einfachste Route ist. Unterschied zu
[Shadow AI](/glossary/shadow-ai). Siehe
[Kap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff);
[Kap. 05, Pattern: Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway). (Kap. 05, 12)

**SB 53.** Kaliforniens Frontier-KI-Transparenzgesetz (TFAIA), in Kraft ab 1. Januar 2026, das
Frontier-Entwickler abdeckt, die Modelle über 10^26 FLOP trainieren: alle von ihnen veröffentlichen
Transparenzberichte und melden kritische Sicherheitsvorfälle, und große Frontier-Entwickler
veröffentlichen auch ein Sicherheitsframework [14][142]. Siehe
[Kap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (Kap. 08, 21)

**Selbstüberwachtes Lernen.** Lernen durch Vorhersage von Teilen der Eingabe selbst, wie das nächste
Token, über große Korpora; die Definition der KI-Verordnung eines Modells mit allgemeinem
Verwendungszweck nennt Selbstüberwachung im großen Maßstab [2]. Korpus-Herkunft, Rechte und
Memorisierung sind schwer zu verfolgen, weshalb die AIBOM die Datensatz-Herkunft aufzeichnet. Siehe
[Kap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (Kap. 11)

**Schwerwiegender Vorfall.** Nach KI-Verordnung Artikel 3(49) ein Incident oder eine Fehlfunktion
eines KI-Systems, die direkt oder indirekt führt zu (a) einem Tod oder schwerwiegender Schaden für
die Gesundheit, (b) schwerwiegender und irreversibler Störung kritischer Infrastruktur, (c)
Verletzung von Verpflichtungen des Unionsrechts zum Schutz der Grundrechte, oder (d) schwerwiegender
Schaden an Eigentum oder Umwelt, was Artikel 73 Meldung auslöst [2]. Unterschied zu
[KI-Incident](/glossary/ai-incident). Siehe
[Kap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident);
[Kap. 18, Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(Kap. 04, 08, 17, 18)

**Shadow AI.** Ein KI-System, Modell oder Agent, der ohne Registrierung läuft, einschließlich
Mitarbeiternutzung nicht genehmigter KI-Tools; der Ausfallmodus, der ein Inventar nur für die
Ehrlichen vollständig macht. Es wird durch Discovery gefunden und mit einer genehmigten Route
beantwortet, nicht mit einem Verbot. Unterschied zu
[Sanctioned AI Gateway](/glossary/sanctioned-ai-gateway). Siehe
[Kap. 05, Pattern: Shadow-AI Discovery](/bok/patterns#pattern-shadow-ai-discovery);
[Kap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff).
(Kap. 05, 07, 12)

**Shadow Deployment.** Eine Release-Phase, in der ein neues Modell oder System Live-Eingaben erhält,
aber seine Ausgaben nicht verwendet werden, sodass sein Verhalten bei echtem Traffic mit dem
Incumbent oder mit menschlichen Entscheidungen verglichen werden kann, bevor eine Exposition
erfolgt. Das Abweichungsprotokoll ist sein Nachweis. Unterschied zu
[Canary Release](/glossary/canary-release). Siehe
[Kap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[Kap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(Kap. 05, 14, 15)

**SHAP.** SHapley Additive exPlanations: eine Feature-Attribution-Methode, die jedem Eingabe-Feature
einen Anteil an einer bestimmten Vorhersage zuweist, basierend auf Shapley-Werten [113]; ihre
Erklärungen hängen von den gewählten Baseline- oder Hintergrunddaten ab. Unterschied zu
[LIME](/glossary/lime). Siehe
[Kap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(Kap. 16)

**Small Language Model (SLM).** Ein Sprachmodell, das klein genug ist, um in der Nähe des Benutzers
zu laufen, zum Beispiel auf einem Telefon [86]. Seine Kontrollen müssen mit ihm ausgeliefert werden:
Guardrails auf dem Gerät, ein Versionsbestand über die gesamte Flotte und ein Kill Switch, der als
Remote-Flag oder App-Update bereitgestellt wird. Unterschied zu
[Large Language Model (LLM)](/glossary/large-language-model-llm). Siehe
[Kap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (Kap. 11)

**Small Mid-Cap Enterprise (SMC).** Ein Unternehmen, das die KMU-Definition überwachsen hat, aber in
die EU-Definition für kleine Mittelständler fällt. Das Digital Omnibus erweitert einige
KMU-Erleichterungen unter der KI-Verordnung auf SMCs, wie vereinfachte technische Dokumentation und
ein verhältnismäßiges Qualitätsmanagementsystem [2]. Siehe
[Kap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (Kap. 18)

**Besondere Kategorien von Daten.** Die DSGVO Artikel 9 Kategorien, deren Verarbeitung verboten ist,
es sei denn, eine Bedingung gilt: Daten, die rassische oder ethnische Herkunft, politische
Meinungen, Überzeugungen oder Gewerkschaftszugehörigkeit offenbaren, sowie genetische, biometrische
(zur Identifizierung), Gesundheits-, Sexualleben- und sexuelle Orientierungsdaten [38]. KI kann sie
durch Inferenz erstellen. Unterschied zu
[Inferred sensitive data](/glossary/inferred-sensitive-data). Siehe
[Kap. 19, Special categories, inferred data and biometrics](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics).
(Kap. 19)

**Stakeholder-Mapping.** Benennung, wer von einem KI-System betroffen ist oder eine Ansicht dazu hat
(Benutzer, betroffene Nicht-Benutzer, Betreiber, Anbieter, interne Funktionen, Regulatoren, das
Leitungsgremium) und wie jede Ansicht in die Risikoschleife eintritt, mit der Konsultation
protokolliert. Eine FRIA benennt auch die betroffenen Gruppen [2]. Siehe
[Kap. 13, Stakeholder mapping](/bok/risk-management#stakeholder-mapping). (Kap. 13)

**STAR for AI.** CSAs Sicherheitsgarantie- und Zertifizierungsprogramm für KI, aufgebaut auf dem
AICM, mit einer Selbstbewertungsstufe, einer automatisierten "Valid-AI-ted"-Stufe und einer Level 2,
die ISO/IEC 42001 mit der validierten Bewertung kombiniert [4]. Siehe
[Kap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (Kap. 07, 08)

**STRIDE.** Eine Bedrohungsklassifizierungs-Checkliste aus Microsofts Security Development
Lifecycle: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service und Elevation
of Privilege {[133]. Für ein KI-System wird sie pro Element des Datenflussdiagramms durchlaufen und
dann mit KI-spezifischen Katalogen wie MITRE ATLAS und den OWASP-Listen erweitert. Unterschied zu
[ATLAS](/glossary/atlas). Siehe
[Kap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[Kap. 05, Pattern: AI Threat Model](/patterns/ai-threat-model). (Kap. 05, 06, 15)

**Unterauftragsverarbeiter.** Ein Auftragsverarbeiter, den ein anderer Auftragsverarbeiter mit der
Durchführung der Verarbeitung für einen Verantwortlichen beauftragt, wie der Modell-Host hinter
einem KI-Anbieter. Nach DSGVO Artikel 28 benötigt er die vorherige schriftliche Genehmigung des
Verantwortlichen, spezifisch oder allgemein mit Mitteilung von Änderungen und einer Chance zum
Einspruch, und die gleichen Datenschutzverpflichtungen fließen durch Vertrag zu ihm [38].
Unterschied zu [Verantwortlicher und Auftragsverarbeiter](/glossary/controller-and-processor). Siehe
[Kap. 19, AI vendor DPAs and no-training clauses](/bok/privacy-and-ai#ai-vendor-dpas-and-no-training-clauses);
[Kap. 15, Vendor contracts and licence terms](/bok/governing-deployment#vendor-contracts-and-licence-terms).
(Kap. 08, 12, 15, 19)

**Wesentliche Veränderung.** Nach der EU-KI-Verordnung eine Änderung nach dem Inverkehrbringen, die
die ursprüngliche Konformitätsbewertung nicht vorhersah und die die Compliance beeinflusst oder die
Zweckbestimmung ändert [2]. Sie löst eine neue Konformitätsbewertung aus und kann einen Betreiber
oder Händler zum Anbieter machen; vorbestimmte Änderungen sind ausgenommen. Unterschied zu
[Vorbestimmte Änderungen](/glossary/pre-determined-changes). Siehe
[Kap. 18, Article 25: when someone else becomes the provider](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider);
[Kap. 14, Substantial modification](/bok/governing-development#substantial-modification);
[Kap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider).
(Kap. 14, 15, 18)

**Überwachtes Lernen.** Lernen aus gekennzeichneten Beispielen {[40]. Labels kodieren vergangene
menschliche Entscheidungen mit ihren Fehlern und Vorurteilen, daher zeichnet die Data Card die
Label-Herkunft auf und das Eval-Gate testet Fehlerraten nach Untergruppe. Unterschied zu
[Unüberwachtes Lernen](/glossary/unsupervised-learning). Siehe
[Kap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (Kap. 11)

**SVID.** SPIFFE Verifiable Identity Document: ein kurzlebiges kryptographisches Identitätsdokument,
entweder ein X.509-Zertifikat oder ein JWT, das die SPIFFE-ID einer Workload nachweist und über die
SPIFFE Workload API ausgegeben und rotiert wird, die SPIRE implementiert [124]. Eine Anmeldedaten,
die in Minuten ablaufen, müssen nach einem Incident nicht aufgespürt werden, sondern nur nicht neu
ausgegeben werden. Vergleichen Sie mit [Workload identity](/glossary/workload-identity). Siehe
[ch. 23, Short-lived, attested credentials](/bok/governing-agents#short-lived-attested-credentials).
(ch. 23)

**Synthetic data.** Daten, die von einem Modell oder einer Simulation erzeugt werden, anstatt von
Menschen oder Ereignissen erfasst zu werden, verwendet zur Erweiterung von Trainingssätzen, zum
Testen von Grenzfällen oder zur Verringerung der Exposition personenbezogener Daten. Sie erbt die
Verzerrungen ihres Generators und kann die Datensätze, auf denen sie angepasst wurde, durchsickern
lassen, daher wird sie wie jeder andere Datensatz getestet. Siehe
[ch. 14, Synthetic data, augmentation and privacy-enhancing technologies](/bok/governing-development#synthetic-data-augmentation-and-privacy-enhancing-technologies).
(ch. 14, 19)

**System Card.** Dokumentation eines bereitgestellten KI-Systems als Ganzes (Modelle, Prompts,
Abruf, Tools, Guardrails und Aufsicht), wobei eine Model Card ein Modell dokumentiert [114]. Das
Publikum sind Betreiber, Behörden und die Öffentlichkeit; die Evidenz ist der Registereintrag, die
Guardrail-Konfiguration und Red-Team-Ergebnisse. Vergleichen Sie mit
[Model Card](/glossary/model-card). Siehe
[ch. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(ch. 14, 15)

**Systemisches Risiko.** Nach dem KI-Verordnung das Risiko, das von den leistungsfähigsten
KI-Modellen mit allgemeinem Verwendungszweck ausgeht und zusätzliche Evaluierungs-,
Adversarial-Test- und Incident-Meldepflichten für ihre Anbieter auslöst [2]. Siehe
[ch. 18, Systemic risk: threshold, notification, designation](/bok/eu-ai-act#systemic-risk-threshold-notification-designation).
(ch. 08, 18)

## T

**Tabletop-Übung.** Eine geplante, bewertete Probe eines Incident-Playbooks gegen einen benannten
Fehlermodus, die die gleichen Datensätze wie ein echter Incident erzeugt (Datensatz, Uhren,
Entwurfsberichte, Eindämmungsereignisse), gekennzeichnet als Übung. Das Playbook ist die Behauptung;
das Übungsergebnis ist die Evidenz. Siehe
[ch. 17, Playbooks, RACI and drills](/bok/incidents#playbooks-raci-and-drills). (ch. 17)

**TC260.** Der National Technical Committee 260 on Cybersecurity der Standardization Administration
of China (全国网络安全标准化技术委员会), der Chinas Cybersecurity- und KI-Nationalstandards (GB und GB/T) entwirft
und das freiwillige AI Safety Governance Framework veröffentlicht (1.0 in 2024, 2.0 in 2025, 3.0
am 14. September 2026) [19]. Siehe
[ch. 21, China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(ch. 08, 21)

**TDM-Ausnahme.** Die EU-Urheberrechtsausnahme für Text- und Data-Mining (DSM-Richtlinie Artikel 3
und 4), die es jedem ermöglicht, rechtmäßig zugängliche Werke zum Mining zu kopieren, einschließlich
KI-Training, es sei denn, der Rechteinhaber hat diese Nutzung vorbehalten; für Inhalte, die online
öffentlich zugänglich gemacht werden, muss die Reservierung auf angemessene Weise erfolgen,
beispielsweise durch maschinenlesbare Mittel [115]. Vergleichen Sie mit
[Fair use](/glossary/fair-use) und
[Rights reservation (TDM opt-out)](/glossary/rights-reservation-tdm-opt-out). Siehe
[ch. 20, Copyright and training data](/bok/existing-law#copyright-and-training-data). (ch. 20)

**Technische Dokumentation (Anlage IV).** Die technische Datei des Anbieters für ein
Hochrisiko-KI-System, erstellt vor dem Inverkehrbringen und aktualisiert gemäß Artikel 11:
Beschreibung, Entwicklungsprozess, Daten, Tests, Aufsicht, Risikomanagement, Standards, Erklärung
und Plan zur Beobachtung nach dem Inverkehrbringen [2]. Die meisten Elemente können aus
Pipeline-Datensätzen generiert werden. Siehe
[ch. 14, Annex IV, element by element](/bok/governing-development#annex-iv-element-by-element).
(ch. 14)

**Test-Set-Kontamination.** Das Vorhandensein von Evaluierungselementen in den Trainingsdaten eines
Modells, das seine Scores aufbläht; es kann sogar für Black-Box-Sprachmodelle nachgewiesen werden
[116]. Gemindert mit privaten zurückgehaltenen Sätzen, rotierten Elementen und datierten
Test-Elementen. Siehe
[ch. 14, Statistical validity of evals](/bok/governing-development#statistical-validity-of-evals).
(ch. 14)

**Test unter Realbedingungen.** Nach der EU-KI-Verordnung temporärer Test eines KI-Systems für
seinen vorgesehenen Zweck außerhalb eines Labors, gemäß einem von der Marktüberwachungsbehörde
genehmigten Plan, mit Registrierung, informierter Zustimmung der Versuchspersonen, wirksamer
Aufsicht und umkehrbaren Ausgaben, für einen begrenzten Zeitraum [2]. Vergleichen Sie mit
[KI-Reallabor](/glossary/ai-regulatory-sandbox). Siehe
[ch. 18, Sandboxes and real-world testing](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(ch. 18)

**Threat Model (KI).** Ein versionierter Datensatz darüber, was mit einem KI-System schiefgehen kann
und was dagegen getan wird: Datenflüsse und Vertrauensgrenzen, Bedrohungen pro Element aus STRIDE
und KI-spezifischen Katalogen, eine Entscheidung zu jedem und der Test, der jede Risikominderung
nachweist. Es beantwortet die vier Threat-Modelling-Fragen und endet damit, ob die Arbeit gut genug
geleistet wurde [134]. Vergleichen Sie mit [Red teaming](/glossary/red-teaming). Siehe
[ch. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[ch. 05, Pattern: AI Threat Model](/patterns/ai-threat-model). (ch. 05, 14, 15, 23)

**Three Lines Model.** Das Update des Institute of Internal Auditors von 2020 der "drei
Verteidigungslinien": das Leitungsorgan beaufsichtigt; das Management hält First-Line-Rollen
(Lieferung von Produkten und Dienstleistungen) und Second-Line-Rollen (Risiko-Expertise,
Unterstützung und Herausforderung); die interne Revision gibt unabhängige Third-Line-Assurance
[117]. Siehe
[ch. 12, The three lines, applied to AI](/bok/governance-program#the-three-lines-applied-to-ai).
(ch. 12)

**Token Passthrough.** Das Anti-Pattern, bei dem ein Server ein Token akzeptiert, das nicht für ihn
ausgegeben wurde, und es unverändert an eine nachgelagerte API weiterleitet, die es dann
möglicherweise vertraut, als hätte der Server es validiert. Die MCP-Spezifikation verbietet es: Ein
Server darf kein Token akzeptieren, das nicht explizit für ihn ausgegeben wurde, und überprüft daher
das Publikum jedes Tokens [125]. Vergleichen Sie mit
[Delegation (OAuth token exchange)](/glossary/delegation-oauth-token-exchange). Siehe
[ch. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28).
(ch. 23)

**Tool Allow-List.** Die Deny-by-Default-Liste der Tools, die ein Agent aufrufen darf, jeder Eintrag
durch einen Hash der Tool-Definition gepinnt und begrenzt durch Ressourcenumfang, Operationsklasse,
Rate, Egress-Ziele, Datenklassen und eine Checkpoint-Regel, bewertet durch das Tool-Gateway bei
jedem Aufruf. OWASP fordert solche Pro-Tool-Least-Privilege-Profile [6]. Siehe
[ch. 23, The tool allow-list](/bok/governing-agents#the-tool-allow-list). (ch. 23)

**Tool Poisoning.** Manipulation eines Tools, das ein Agent verwendet, durch seine modellsichtbare
Definition (Beschreibung, Schema, Metadaten) oder sein Verhalten, damit der Agent auf falschen
Prämissen handelt. OWASP ordnet die Manipulation einer legitimen Tool-Schnittstelle unter ASI02 und
ein Tool, das an der Quelle kompromittiert wurde, unter ASI04 ein [6]; MITRE ATLAS listet AI Agent
Tool Poisoning (AML.T0110) auf [126]. Vergleichen Sie mit
[Prompt-Injection](/glossary/prompt-injection). Siehe
[ch. 23, Admitting an MCP server](/bok/governing-agents#admitting-an-mcp-server). (ch. 23)

**Zusammenfassung des Trainingsinhalts.** Die öffentliche Zusammenfassung des Inhalts, der zur
Schulung eines KI-Modells mit allgemeinem Verwendungszweck verwendet wird, erforderlich nach
KI-Verordnung Artikel 53(1)(d) auf einer obligatorischen Kommissionsvorlage, die Datenquellen,
einschließlich der am meisten gescrapten Domains, und Datenverarbeitung abdeckt [118]. Siehe
[ch. 14, The GPAI provider side](/bok/governing-development#the-gpai-provider-side). (ch. 14)

**Trainings-, Validierungs- und Testdaten.** Die drei Datensätze, die die KI-Verordnung für
Hochrisiko-Systeme definiert: Trainingsdaten passen das Modell an, Validierungsdaten stimmen es ab
und schützen vor Überanpassung, und Testdaten geben eine unabhängige Überprüfung vor der Freigabe
[2]. Sie getrennt zu halten und dies zu beweisen, ist das, was Test-Set-Kontamination verhindert.
Vergleichen Sie mit [Test-Set-Kontamination](/glossary/test-set-contamination). Siehe
[ch. 14, Data for training and testing](/bok/governing-development#data-for-training-and-testing).
(ch. 14)

**Trajektorie (Agent).** Die Abfolge von Plänen, Tool-Aufrufen und Speicheroperationen, die einen
Agent zu einem Effekt führten. Agenten werden an ihren Trajektorien sowie an ihren endgültigen
Ausgaben bewertet, da ein richtiges Ergebnis, das durch ein Tool erreicht wird, das der Agent nie
hätte halten sollen, immer noch ein Fehler ist. Siehe
[ch. 23, What makes an agent a governance object](/bok/governing-agents#what-makes-an-agent-a-governance-object).
(ch. 14, 23)

**Transaction Token (Txn-Token).** Ein kurzlebiges, signiertes Token, das in einem
IETF-OAuth-Arbeitsgruppentwurf spezifiziert ist und Benutzeridentität, Workload-Identität und
Autorisierungskontext durch eine Aufrufkette innerhalb einer vertrauenswürdigen Domäne trägt, damit
nachgelagerte Dienste über geschützten Kontext entscheiden können [131]. Immer noch ein Entwurf
(Revision 11, 30. Juli 2026) ab 2026-09-24. Vergleichen Sie mit
[Delegation (OAuth token exchange)](/glossary/delegation-oauth-token-exchange). Siehe
[ch. 23, Accountability across hops](/bok/governing-agents#accountability-across-hops). (ch. 23)

**Transfer Impact Assessment (TIA).** Die Bewertung des Datenexporteurs, ob das Recht eines
Drittlandes es dem Importeur ermöglicht, das Transferinstrument wie Standardvertragsklauseln
einzuhalten, und welche ergänzenden Maßnahmen erforderlich sind [119]. Remote-Inferenz-Endpunkte und
Vendor-Telemetrie außerhalb des EWR können es auslösen. Siehe
[ch. 19, Transfers, remote inference and TIAs](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
(ch. 19)

**Transparenz.** In NISTSs Rahmen, wie weit Informationen über ein KI-System und seine Ausgaben die
Menschen erreichen, die damit interagieren: was passiert ist [30]. Evidenziert durch Datensätze
darüber, was lief (Register, Modell- und System-Cards, Protokolle) und durch die Offenlegungen, die
das Gesetz verlangt. Vergleichen Sie mit [Explainability](/glossary/explainability) und
[Interpretability](/glossary/interpretability). Siehe
[ch. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 16)

**Vertrauenswürdige KI.** Ein Banner, das von anderen Frameworks verwendet wird, insbesondere von
der EU High-Level Expert Group [81], und NIST, dessen sieben vertrauenswürdige Merkmale es konkret
machen [30]. Dieses Buch zitiert es, anstatt es zu übernehmen: Die Disziplin wird durch tatsächliche
Risikominderung und Evidenz gemessen, nicht durch das Label. Vergleichen Sie mit
[KI-Governance-Engineering](/glossary/ai-governance-engineering) und
[Responsible-AI principle set](/glossary/responsible-ai-principle-set). Siehe
[ch. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(ch. 01, 22)

**Vertrauenswürdige Merkmale (NIST).** Die sieben Merkmale vertrauenswürdiger KI im NIST AI RMF:
gültig und zuverlässig; sicher; sicher und widerstandsfähig; rechenschaftspflichtig und transparent;
erklärbar und interpretierbar; datenschutzverbessert; fair mit verwalteter schädlicher Verzerrung
[30]. Gültig und zuverlässig ist die Grundlage; rechenschaftspflichtig und transparent erstreckt
sich auf die anderen. Siehe
[ch. 22, The seven trustworthy characteristics](/bok/principles-and-standards#the-seven-trustworthy-characteristics).
(ch. 22)

## U

**UDAP.** Unfaire oder täuschende Handlungen oder Praktiken, verboten durch Abschnitt 5 des FTC Act
und durch Staatsgesetze [120]. Täuschung ist eine wesentliche Darstellung, die wahrscheinlich
irreführend ist; Ungerechtigkeit ist erhebliche, unvermeidbare Verletzung, die nicht durch Vorteile
aufgewogen wird. Unsubstantiierte KI-Leistungsansprüche fallen darunter. Siehe
[ch. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states).
(ch. 20)

**Unüberwachtes Lernen.** Lernen von Struktur (Cluster, Anomalien) aus Daten ohne Beschriftungen
[40]. Ohne Grundwahrheit zum Testen verlassen sich Kontrollen auf Stabilitätstests und menschliche
Überprüfung der Segmente, bevor sie in Entscheidungen verwendet werden. Vergleich mit
[Supervised learning](/glossary/supervised-learning). Siehe
[ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Use-case record.** Das Aufnahmeverzeichnis für einen vorgeschlagenen KI-Einsatz: Geschäftskontext,
Zweckbestimmung und ausgeschlossene Verwendungen, betroffene Personen, Entscheidungsbefugnis,
Erfolgskennzahlen und Fehlertoleranz, gespeichert als Felder im Registereintrag, damit
Klassifizierung, Schwellwerte, Tests und Folgenabschätzungen dieselben Fakten lesen [30]. Siehe
[ch. 14, The use-case record](/bok/governing-development#the-use-case-record);
[ch. 06, Intake and classification](/bok/the-role#intake-and-classification);
[ch. 05, Pattern: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (ch. 05,
06, 14)

## V

**Version pinning.** Festlegung der genauen Versionen des Modells, der Prompts, des Abrufkorpus und
der Guardrails, die ein bereitgestelltes System verwendet, im Registereintrag, damit bekannt ist,
was ausgeführt wurde, und jede nicht fixierte Änderung, einschließlich eines Modellaktualisierung
eines Anbieters, erkannt und als Release behandelt wird. Siehe
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 15)

## W

**Watermarking.** Einbettung eines Signals in generierten Inhalten (Bild, Audio, Video oder Text),
das ein Detektor später lesen kann, um es als KI-generiert zu identifizieren. Die KI-Verordnung
verlangt von Anbietern generativer Systeme eine maschinenlesbare, erkennbare Kennzeichnung [2]; NIST
überprüft Watermarking neben Provenance Tracking und Detection [53]. Markierungen können unter
gewöhnlichen Transformationen degradieren, daher wird ihre Beständigkeit getestet. Vergleich mit
[Content provenance (C2PA)](/glossary/content-provenance-c2pa) und
[Latent disclosure](/glossary/latent-disclosure). Siehe
[ch. 18, Transparency cases (Article 50)](/bok/eu-ai-act#transparency-cases-article-50). (ch.
18, 20)

**Widespread infringement.** Gemäß KI-Verordnung Artikel 3(61) eine Handlung oder Unterlassung, die
gegen Unionsrecht verstößt, das die Interessen von Personen schützt, und die kollektiven Interessen
von Personen in mehreren Mitgliedstaaten schädigt oder wahrscheinlich schädigt. Sie verkürzt die
Frist für schwerwiegende Vorfälle nach Artikel 73 auf zwei Tage [2]. Vergleich mit
[Serious incident](/glossary/serious-incident). Siehe
[ch. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

**Workload identity.** Die zurechenbare Identität, die eine Workload wie ein Agent bei jedem Hop
trägt, unter der seine Aktionen protokolliert und sein Zugriff widerrufen wird, typischerweise eine
kurzlebige, attestierte Anmeldedaten wie ein SVID [124]. Sie unterscheidet sich von der
Kanalauthentifizierung, die einen einzelnen Hop sichert, z. B. einen Client, der mit einem
MCP-Server spricht. Vergleich mit [NHI](/glossary/nhi) und [SVID](/glossary/svid). Siehe
[ch. 23, Channel authentication is not agent identity](/bok/governing-agents#channel-authentication-is-not-agent-identity);
[ch. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 03, 04, 05, 23)

## Sources

[1] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI, in force 27 Jul 2026; definitions in Art. 3, incl. 3(1), 3(3) to 3(14), 3(14b), 3(20), 3(22), 3(23), 3(29) to 3(32), 3(49), 3(55) to 3(57), 3(60), 3(61), 3(63), 3(68); Arts. 4, 5, 6 (incl. 6(3) third subparagraph, profiling), 9, 10, 11, 13, 14, 15, 17, 22 to 27 (incl. 26(11)), 40, 41, 43, 47, 48, 50, 53 (incl. 53(1)(c)), 55, 57, 60, 72, 73, 86; Annexes I, III, IV). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; Least-Agency; per-tool least-privilege profiles; tool poisoning of a legitimate tool's interface under ASI02, a tool compromised at the source under ASI04). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (at least 10 to 15% of agentic AI markets by 2030). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[10] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (models above 10^26 FLOP; transparency reports and incident reports by all frontier developers; frameworks by large frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; framework for large frontier developers, critical safety incident reports for every frontier developer; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[20] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage; arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[21] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; non-binding; seven elements of Art. 3(1), inference as the indispensable condition; exclusions). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[22] CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[23] 12 CFR 1002.9 (Regulation B, notifications) (1002.9(b)(2) statement of specific principal reasons for adverse action; Supplement I commentary; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[24] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978) (adverse impact and the "four-fifths rule", with statistical-significance and small-numbers caveats; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[25] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Korea AI Basic Act) (Act No. 20676, in force 2026-01-22; Art. 2 as amended 2026-01-20; Arts. 2(4) high-impact areas, 2(7) AI business operators, 33 confirmation, 34 high-impact duties, 36 domestic representative). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[26] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (agency AI Governance Boards chaired at Deputy Secretary level with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[27] The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence (Domain Taxonomy of 7 domains and 24 subdomains; CC BY 4.0). Slattery, Saeri, Grundy et al., Patterns (Cell Press). 2026. https://doi.org/10.1016/j.patter.2026.101517 (verified: primary)
[28] "Name it to tame it: defining AI incidents and hazards" (summary of the OECD paper "Defining AI incidents and related terms", doi 10.1787/d1a8d965-en). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[29] NIST AI RMF Playbook, GOVERN (per subcategory: About, Suggested Actions, Transparency and Documentation, References; GOVERN 1.7 decommissioning and phasing out safely). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (risk tolerance and residual risk; seven trustworthy characteristics; transparency answers "what happened", explainability "how", interpretability "why"; MAP 1.1 intended purposes; MANAGE 1.1 go/no-go determination; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[31] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.3 enables people adversely affected to challenge an output; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[32] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[33] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed with users' biometric information, to be deleted). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[34] Directive on Automated Decision-Making (algorithmic impact assessment completed and published before production; Appendix B and C impact levels; recourse; modified 2025-06-24). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[35] Directive (EU) 2024/2831 on improving working conditions in platform work (Arts. 7 limits on processing, 9 transparency, 10 human oversight, 11 human review; transposition by 2 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[36] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[37] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020 after a pilot; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[38] Regulation (EU) 2016/679 (General Data Protection Regulation) (Arts. 4(1), 4(5), 4(7), 4(8), 4(12), 4(14), 5, 6, 9, 12(3), 22, 25, 28(2) and 28(4), 30, 33, 35; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[39] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[40] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (referenced by identifier only; autonomy and heteronomy; clause 5.11 machine learning approaches: supervised, unsupervised, semi-supervised, reinforcement). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[41] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories of AI bias: systemic, statistical and computational, and human). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[42] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection rates and impact ratios by sex, race/ethnicity and intersectional categories; public summary; notice before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[43] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[44] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[45] On Calibration of Modern Neural Networks (modern networks poorly calibrated; ICML 2017; arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[46] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (Kleinberg, Mullainathan and Raghavan; three fairness conditions cannot hold together except in special cases; arXiv 1609.05807). arXiv. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[47] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[48] ISO/IEC 42001:2023, AI management systems (referenced by identifier only; requirements for an AI management system; clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[49] Overcoming catastrophic forgetting in neural networks (networks lose earlier competence when trained on new tasks; arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[50] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[51] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation; arXiv 2004.05785). Lu et al.. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[52] Content Credentials: C2PA Technical Specification, version 2.2 (a manifest of assertions, a claim and a claim signature bound to an asset). Coalition for Content Provenance and Authenticity (C2PA). 2025-05. https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html (verified: primary)
[53] NIST AI 100-4, Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency (provenance data tracking, watermarking, metadata recording and synthetic-content detection). NIST. 2024-11-20. https://doi.org/10.6028/NIST.AI.100-4 (verified: primary)
[54] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (Wachter, Mittelstadt and Russell; Harvard Journal of Law & Technology, 2018; arXiv 1711.00399). arXiv. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[55] "Counterfactual Fairness" (Kusner, Loftus, Russell and Silva; arXiv 1703.06856). arXiv. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[56] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[57] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about the entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[58] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[59] "Fairness Through Awareness" (Dwork, Hardt, Pitassi, Reingold and Zemel; individual fairness; limits of statistical parity; arXiv 1104.3913). arXiv. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[60] "Products liability" (design, manufacturing and marketing defects, incl. failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. 2026. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[61] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[62] 42 U.S.C. § 2000e-2 (Title VII: unlawful employment practices; 2000e-2(k) burden of proof in disparate-impact cases, business necessity and less discriminatory alternatives). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[63] Council Directive 2000/43/EC (Racial Equality Directive) (Art. 2(2)(a) direct and 2(2)(b) indirect discrimination, with objective justification). Official Journal of the EU (EUR-Lex). 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[64] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, in force 2026-01-22; Art. 29 domestic-representative thresholds). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[65] Guidelines on obligations for general-purpose AI providers, FAQ (a modifier becomes a provider only when the modification uses more than one third of the original model's training compute; obligations limited to the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[66] "Dual use of artificial-intelligence-powered drug discovery" (an inverted toxicity model proposed about 40,000 candidate toxic molecules in under six hours; Nature Machine Intelligence). Urbina, Lentzos, Invernizzi and Ekins (PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[67] SR 26-2, Revised Guidance on Model Risk Management (issued 17 Apr 2026 by the Federal Reserve, OCC and FDIC; supersedes and replaces SR 11-7 of 4 Apr 2011 and SR 21-8; effective challenge). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[68] "Equality of Opportunity in Supervised Learning" (Hardt, Price and Srebro; equalised odds and equal opportunity; arXiv 1610.02413). arXiv. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[69] Evidence-record schema v1 (evidence-record.v1.json) (AI Governance Engineer templates and schemas library). aigovernanceengineer.com. 2026-09-24. https://aigovernanceengineer.com/schemas/evidence-record.v1.json (verified: primary)
[70] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/17/107 (verified: secondary)
[71] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (Kearns, Neel, Roth and Wu; arXiv 1711.05144). arXiv. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[72] "Communication-Efficient Learning of Deep Networks from Decentralized Data" (McMahan et al.; federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[73] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream; arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[74] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225) (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[75] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[76] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; non-binding; indicative criterion of training compute above 10^23 FLOP with the ability to generate language, images or video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[77] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[78] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[79] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[80] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 Feb 2025; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[81] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; human-in-the-loop, human-on-the-loop and human-in-command oversight). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[82] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data includes data derived or extrapolated from non-health information, incl. by algorithms or machine learning). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[83] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8 internal channels for private entities with 50 or more workers; Art. 9 acknowledgment within seven days and feedback within three months; Art. 19 no retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[84] LLM01:2025 Prompt Injection (OWASP Top 10 for LLM Applications 2025; direct and indirect injection; jailbreaking as a form of prompt injection that makes the model disregard its safety protocols). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[85] JSON Schema Draft 2020-12. JSON Schema. 2022-06-16. https://json-schema.org/draft/2020-12 (verified: primary)
[86] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone; arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[87] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13; operative 2026-08-02; latent disclosures in generated content). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[88] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (three-step legitimate-interest test; anonymity test and evidence). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[89] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (Ribeiro, Singh and Guestrin; LIME; arXiv 1602.04938). arXiv. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[90] "Machine Unlearning" (Bourtoule et al.; SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[91] Commission Delegated Regulation (EU) 2025/301 (Art. 5, time limits for major ICT-related incident reports under DORA; Art. 5(2) late classification). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[92] "Membership Inference Attacks against Machine Learning Models" (Shokri et al.; arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[93] Hierarchy of Controls (elimination, substitution, engineering controls, administrative controls, PPE). CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[94] "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (Fredrikson, Jha and Ristenpart; CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[95] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, serious incident reporting, Measure 9.2; Appendix 1.4 specified systemic risks, incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[96] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data added to sensitive personal information under the CCPA; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[97] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[98] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity; Big Data & Society 3(1)). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[99] Llama 3.1 Community License Agreement (an example of an open-weight licence with an incorporated acceptable-use policy and attribution terms). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[100] Personal Information Protection Law of the People's Republic of China (Arts. 55 and 56 personal information protection impact assessment, records kept three years; official English translation). National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[101] Directive (EU) 2024/2853 on liability for defective products (software as a product; defectiveness incl. the ability to continue to learn; substantial modification; transposition by 9 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[102] "Dissecting racial bias in an algorithm used to manage the health of populations" (Obermeyer, Powers, Vogeli and Mullainathan; Science 366(6464):447-453; cost as a proxy for need). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[103] "Actionable Recourse in Linear Classification" (Ustun, Spangher and Liu; recourse as the ability to change a model's decision by altering actionable inputs; arXiv 1809.06514). arXiv. 2018-09-18. https://arxiv.org/abs/1809.06514 (verified: primary)
[104] "Extracting Training Data from Large Language Models" (Carlini et al.; verbatim training sequences extracted, incl. personal data; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[105] "Training language models to follow instructions with human feedback" (Ouyang et al.; supervised fine-tuning on demonstrations, then reinforcement learning from human feedback on ranked outputs; arXiv 2203.02155). arXiv. 2022-03-04. https://arxiv.org/abs/2203.02155 (verified: primary)
[106] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that redistributions and derivatives must carry). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[107] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[108] Concrete Problems in AI Safety (reward hacking among five practical problems; arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[109] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn; referenced by identifier only). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[110] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[111] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (function-to-clause mapping, incl. risk sources). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[112] IEC 61025:2006, Fault tree analysis (FTA) (edition 2.0). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[113] "A Unified Approach to Interpreting Model Predictions" (Lundberg and Lee; SHAP; arXiv 1705.07874). arXiv. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[114] "System Cards, a new resource for understanding how AI systems work" (documents a whole system of models, AI and non-AI components, where a model card documents one model). Meta AI. 2022-02-23. https://ai.meta.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/ (verified: primary)
[115] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Arts. 3 and 4: text and data mining for research and a general exception subject to a machine-readable reservation). Official Journal of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[116] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[117] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[118] Template for general-purpose AI model providers to summarise their training content (mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[119] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data (version 2.0). European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[120] 15 U.S.C. § 45 (FTC Act section 5) (unfair or deceptive acts or practices; 45(n) standard for unfairness). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[121] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
[122] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; autonomy as a deliberate design decision separate from capability and operational environment; five levels by user role: operator, collaborator, consultant, approver, observer). arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[123] RFC 8693, OAuth 2.0 Token Exchange (impersonation versus delegation semantics; the act (actor) claim; nested act claims record prior actors). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[124] SPIFFE overview (short-lived cryptographic identity documents called SVIDs, as X.509 certificates or JWTs; the Workload API issues and rotates them; SPIRE implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[125] Model Context Protocol, Security Best Practices, version 2026-07-28 (token passthrough defined and explicitly forbidden; servers MUST NOT accept any tokens not explicitly issued for them; audience validation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[126] MITRE ATLAS data, release v2026.09 (AML.T0080 AI Agent Context Poisoning, .000 Memory; AML.T0110 AI Agent Tool Poisoning). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[127] Agent Control Standard (ACS) repository (a wire specification that lets a separate guardian agent permit, deny or modify an agent's action before it happens; the reference guardian's failure posture defaults to proceed, overridable to deny; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project (GitHub). 2026-09-01. https://github.com/GenAI-Security-Project/agent-control-standard (verified: primary)
[128] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01:2026 Prompt Injection, incl. memory persistence; LLM08:2026 Hidden Context Exposure, which replaced System Prompt Leakage: assume hidden context is discoverable, no credentials in it, not a security boundary; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[129] Agent2Agent (A2A) Protocol Specification, v1.0 (v1.0.0 released 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, signed with JWS over JCS-canonicalised JSON; servers authenticate every request; authorisation implementation-specific; scope and revocation of in-task authorisation not defined). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[130] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[131] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group, revision 11 of 30 Jul 2026, WG state "Waiting for Write-Up"; short-lived signed tokens that propagate user identity, workload identity and authorisation context through a call chain within a trusted domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[132] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group, revision 02 of 6 Jul 2026; a URL used as client_id that refers to the client's metadata document). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[133] Threats: Microsoft Threat Modeling Tool (the STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; the tool is a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[134] Threat Modeling Manifesto (threat modelling as analysing representations of a system to highlight concerns about security and privacy characteristics; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-25). https://www.threatmodelingmanifesto.org/ (verified: primary)
[135] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private PKI, self-signed certificates, bare keys, keyless Sigstore). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[136] SLSA specification v1.2, Build track basics (provenance: what built the artefact, by what process and from which top-level inputs; Build L1 provenance exists, L2 hosted build platform, L3 hardened builds). OpenSSF SLSA project. n.d. (accessed 2026-09-25). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[137] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-25). https://huggingface.co/docs/safetensors/index (verified: primary)
[138] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[139] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy, 53% on general-purpose content; competent and reliable evidence required at the time a claim is made). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[140] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; retraining; output filters accepted if shown sufficiently effective and robust, based on general rules rather than lists of people). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[141] Authorization (Cedar Policy Language Reference Guide) (no request is allowed unless a permit policy grants it, so the default decision is Deny; any satisfied forbid overrides every permit). Cedar. n.d. (accessed 2026-09-25). https://docs.cedarpolicy.com/auth/authorization.html (verified: primary)
[142] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; transparency report; critical safety incidents to the Office of Emergency Services within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
