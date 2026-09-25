---
lang: de
source: bok/02-why-now.md
sourceHash: "fd5e154caa65ef30565b60079cffc5a315d017e112d2db5705e6d107d4af8a78"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 02. Warum jetzt

> KI-Governance-Engineering bildet sich jetzt, weil sich das zu Governance-unterliegende Ding
> verändert hat, der Markt anfing, Engineering-Fähigkeiten einzustellen, bevor sich die Profession
> selbst benannte, und das Gesetz anfing, engineerte Evidenz zu fordern, alles zwischen April 2025
> und August 2026.

Disziplinen erscheinen nicht nach Plan. Sie erscheinen, wenn eine alte Arbeitsweise sichtbar aufhört
zu halten und genug Menschen an genug Orten anfangen, den Ersatz gleichzeitig zu bauen. Das passiert
der KI-Governance jetzt. Die These stellt fünf grundlegende Probleme mit Legacy-KI-Governance dar;
dieses Kapitel nimmt jedes nacheinander, hängt die Evidenz an und legt dann die Markt-,
Regulierungs- und technischen Signale dar, die zusammen das Timing erklären. Die Aussage ist eng und
falsifizierbar: nicht dass Governance plötzlich wichtig ist, sondern dass das *Engineering* von
Governance zur Engstelle geworden ist, und dass die Daten das jetzt sagen. Datierte Aussagen sind
aktuell zum 2026-09-24.

## Die fünf Probleme, mit der Evidenz

### 1. Governance geschrieben für Systeme, die nicht mehr existieren

Legacy-Governance beschreibt ein KI-System, wie es am Tag seiner Überprüfung war, während Modelle
umtrainiert werden, Prompts sich ändern und Agenten täglich Tools gewinnen; das Artefakt ist
veraltet, bevor es unterzeichnet ist. Das strukturelle Zeichen ist *wo die Funktion sitzt*. In IAPPs
2025 AI Governance Profession Report sitzt die KI-Governance-Funktion meist bei Privacy (22%), Legal
und Compliance (22%) und IT (17%), und nur bei 5% in Security [1], weit weg von der Pipeline, wo
sich das System ändert. Eine Funktion in der Review-Schicht, nicht der Build-Schicht, kann ihre
Beschreibung der Produktion nicht wahr halten, weil nichts sie mit dem Deploy verbindet.

### 2. Point-in-Time-Überprüfung einer kontinuierlich sich ändernden Sache

Jährliche Bewertungen und Committee-Freigaben gehen davon aus, dass ein System lange genug
stillhält, um beurteilt zu werden. Frontier-Modelle und autonome Agenten tun das nicht. Gartner
erwartet, dass mehr als 40% der agentic-AI-Projekte bis Ende 2027 abgebrochen werden, wobei
unzureichende Risikokontrollen unter den Ursachen genannt werden [2], und prognostiziert, dass bis
2029 mehr als die Hälfte erfolgreicher Angriffe auf KI-Agenten Schwachstellen bei der
Zugriffskontrolle und Prompt-Injection ausnutzen werden [3]. Beide sind Runtime-Fehlermodi (das
System verhält sich zwischen Überprüfungen falsch), und eine einmal jährliche Bewertung ist
strukturell blind dafür. Das ist nicht die gleiche Arbeit wie Model Risk Management in der
SR-11-7-Tradition, die ein Modell zu Zeitpunkten validiert; das Objekt hier hört nie auf, sich zu
bewegen. Die eigene US-Guidance der Tradition stimmt der Grenze zu: SR 26-2, die SR 11-7 am 17. Apr
2026 ersetzte, lässt generative und agentic-AI-Modelle außerhalb ihres Geltungsbereichs [22][23].
Kapitel 11 listet
[die Merkmale von KI, die klassische IT-Governance brechen](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance),
jedes mit der Kontrolle gepaart, die es beantwortet.

### 3. Governance als Gate am Ende, nicht als Eigenschaft des Build

Governance kommt immer noch nach dem Training des Modells an, als Checkpoint zum Löschen vor dem
Launch, und nichts, das es produziert, ist mit wie das System gebaut wird verbunden. Eine Policy,
die nur empfehlen kann, kann ein schlechtes Release nicht stoppen; ein Eval, das in ein `eval gate`}
verdrahtet ist, das den Build fehlschlagen kann, kann: der Unterschied zwischen einer Kontrolle, die
Risiko beschreibt, und einer, die es verhindert. Kapitel 14 baut
[den Build als Kette von Gates](/bok/governing-development#the-build-as-a-chain-of-gates) um.

### 4. Framework-Theater

Die Zuordnung zu NIST AI RMF oder ISO/IEC 42001 wird zum Endzustand statt zum Ausgangspunkt, und
eine grüne Mapping-Matrix wird mit einer funktionierenden Kontrolle verwechselt. Doch zum 2026-09-24
ist keine harmonisierte Norm im Amtsblatt der EU zitiert, daher gibt es keine
Artikel-40-Konformitätsvermutung für die KI-Verordnung [4]. Selbst EN ISO/IEC 42001, der
KI-Managementsystem-Standard, ist nicht das Artikel-17-Qualitätsmanagementsystem, das die Verordnung
verlangt, und verleiht von sich aus keine Konformitätsvermutung [5]. Abdeckung ist nicht Assurance.
Ein Crosswalk beweist, dass du das Framework gelesen hast; es beweist nicht, dass die Kontrolle, auf
die es zeigt, tatsächlich feuert.

### 5. Kein Runtime-Datenpfad

Das Register weiß nicht, was läuft. Ein Vergleich eines Vendors der
KI-Governance-Plattform-Kategorie, veröffentlicht von einem Konkurrenten darin, findet, dass die
meisten der Kategorie "das Programm verwalten (Inventare, Bewertungen, Framework-Mappings,
Evidence-Workflows) ohne einen Runtime-Datenpfad" [6]. Behandle das als eine Aussage zum Testen,
nicht als eine gelegte Tatsache; wo es hält, gehen die drei Fragen, die die Disziplin definieren
(welche KI läuft, was darf sie tun, welche Evidenz beweist es), unbeantwortet, weil nichts mit der
Produktion verbunden ist. Unterdessen berichtet eine Sicherheits-Vendors 2026-Umfrage, dass ungefähr
einer von acht KI-Breaches agentic-Systeme betraf [7]}: genau die Schicht, die das Papier-Register
nicht sehen kann. Eine Kontrolle ohne Telemetrie ist eine Aussage, keine Kontrolle.

## Die Evidenz

### Die Profession ist unterbesetzt, und sie weiß es

Das klarste Signal, dass die Arbeit ihre aktuelle Form überwachsen hat, ist, dass fast niemand
denkt, dass er genug Menschen hat, um sie zu tun. In IAPPs 2025-Bericht sagten von 671 Befragten nur
10 (1,5%), dass sie in den nächsten 12 Monaten keine zusätzlichen KI-Governance-Mitarbeiter brauchen
werden [1]. Etwa 77% der Organisationen berichten, an KI-Governance zu arbeiten, steigend auf
ungefähr neun von zehn unter denen, die bereits KI nutzen [1]. Nachfrage ist nahezu universell;
Kapazität nicht. Wenn eine Funktion überall gewünscht ist, unterfinanziert, und außerhalb der
Build-Schicht untergebracht, wird die Lücke nicht durch die Einstellung von mehr Reviewern
geschlossen. Sie wird geschlossen, indem die Governance in ein System umgewandelt wird, das
skaliert, was ein Engineering-Problem ist.

### Der Markt stellt für das Engineering ein

Der Arbeitsmarkt stellt bereits für diese Verschiebung ein, und er tut es in der Vokabeln des
Engineering. Eine Analyse von 1.997 United-States-KI-Governance-Postings, aktualisiert im August
2026, fand, dass die am häufigsten geforderte Fähigkeit Observability-Plattformen waren, in 41% der
Postings, gefolgt von Python (28%) und NIST-Frameworks (27%) [8]. Das sind
Build-and-Run-Fähigkeiten, keine Review-Fähigkeiten. An der Frontier warb Anthropic 2026 einen
Engineering Manager für GRC an, der mit dem Aufbau einer "KI-forward GRC-Engineering-Funktion"
beauftragt ist, "Policies in policy-as-code" übersetzt, und agentic-Workflows bereitstellt, die
Claude nutzen, "um als virtueller GRC-Analyst zu dienen" [9]. Die Postings beschreiben die Substanz
von KI-Governance-Engineering; sie haben sich noch nicht auf seinen Namen geeinigt.

### Register versus Runtime

Der Tooling-Markt erzählt die gleiche Geschichte von der Angebotsseite. Gartner veröffentlichte
seinen ersten Magic Quadrant für AI Governance Platforms im Juni 2026, wie einer der darin benannten
Vendors berichtete [10]. Gartners eigene Rahmung der Kategorie fragt nach mehr als einem Register:
seine Februar-2026-Analyse sagt, diese Plattformen sollten "automatisierte Policy-Durchsetzung zur
Runtime" und kontinuierliches Monitoring ermöglichen, und es erwartet, dass die
KI-Governance-Ausgaben 2026 USD 492 Millionen erreichen und bis 2030 USD 1 Milliarde überschreiten
[11]. Was die Kategorie tun soll und was sie ausliefert, sind verschiedene Fragen. Der oben zitierte
Vendor-Vergleich, der die dreizehn Vendors im Magic Quadrant bewertet, findet die meisten von ihnen
verwalten das Programm "ohne einen Runtime-Datenpfad" [6], und das Konto, das ein Leader von seiner
eigenen Platzierung gibt, konzentriert sich auf Sichtbarkeit in KI-Use-Cases und eine Roadmap von
Asset-Inventar, Lineage und Use-Case-Onboarding [10]. Die Frage, die man jeder Plattform stellen
sollte, ist daher konkret: wurde diese Policy-Entscheidung in einem Live-Call getroffen, und wo ist
der Record? Die Distanz zwischen der Analyst-Definition und dieser Antwort ist der Raum, den die
Disziplin einnimmt.

### Die Standards-Lücke

Das Framework-Theater-Problem hat eine harte Frist. Zum 2026-09-24 sind null harmonisierte Normen im
Amtsblatt zitiert, daher ist die Konformitätsvermutung des Artikels 40 noch nicht für irgendjemanden
verfügbar [4]. EN 18286, die Qualitätsmanagementsystem-Norm für Artikel 17, wurde im Juli 2026
veröffentlicht, die erste JTC-21-Norm für die KI-Verordnung, die Veröffentlichung erreichte, ist
aber noch nicht im Amtsblatt zitiert, daher trägt sie keine Konformitätsvermutung [4][12]. Die
Risikomanagementsystem-, Protokollierungs- und Cybersecurity-Normen für die Artikel 9, 12 und 15
waren Mitte 2026 Berichten zufolge noch im Anhörungsstadium und zielten auf Ende 2026 [13]. EN
ISO/IEC 42001:2026, die europäische Übernahme der KI-Managementsystem-Norm, ist nicht das
Qualitätsmanagementsystem des Artikels 17 und belegt Konformität nicht von selbst [5]. Die
praktische Konsequenz für eine Governance-Funktion: Für den in dieser Ausgabe behandelten Zeitraum
gibt es keine Norm, gegen die Sie zertifizieren können, um eine rechtliche Vermutung zu erwerben.
Sie müssen die Kontrollen und die Nachweise selbst aufbauen und bereit sein, sie auf ihre Meriten zu
verteidigen.

### Die Regulierungswelle: Omnibus und GPAI-Durchsetzung

Das Gesetz bewegte sich im Sommer 2026 zweimal in entgegengesetzte Richtungen, und beide Bewegungen
deuten auf Engineering hin. Zunächst trat
[die Digital-Omnibus-Verordnung (EU) 2026/1744](/bok/eu-ai-act#the-act-and-the-omnibus) am 27. Juli
2026 in Kraft, sechs Tage vor der Frist vom 2. August für Hochrisiko-Systeme, und setzte die Uhr
zurück: Die Hochrisiko-Verpflichtungen aus Anlage III verschoben sich vom 2. August 2026 auf den 2.
Dezember 2027, und eingebettete Hochrisiko-Systeme aus Anlage I vom 2. August 2027 auf den 2. August
2028 [14][19]. Die zusätzliche Zeit ist real, aber sie ist keine Entlastung vom Engineering; sie ist
mehr Spielraum, um es zu tun. Zweitens, unberührt vom Omnibus, ging die GPAI-Durchsetzung am 2.
August 2026 live: Das KI-Büro kann nun Dokumentation anfordern, Modelle bewerten und Maßnahmen
verlangen, und die Kommission kann Anbieter von Modellen mit allgemeinem Verwendungszweck mit bis zu
3 % des weltweiten Jahresumsatzes oder EUR 15 Millionen, je nachdem welcher Betrag höher ist, gemäß
Artikel 101 bußgeldern [15]. Am 29. August 2026 kündigte Kommissionsvizepräsidentin Henna Virkkunen
an, dass das KI-Büro formell seine ersten Informationsanfragen an eine Reihe von GPAI-Anbietern
gestellt hatte, die Modellsicherheit, unabhängige externe Bewertungen und die Überwachung von
Modellen nach ihrer Markteinführung abdeckten [16]. Was die durchsetzbaren Verpflichtungen fordern
(Modellbewertungen, adversariales Testen, Incident-Meldung, Gewichtssicherheit), ist ein
Engineering-Programm, kein Policy-Ordner.

Die nächsten Wendepunkte sind im Omnibus selbst datiert [19]. Am 2. Dezember 2026 gelten die neuen
Verbote in Artikel 5 für KI-generierte nicht-einvernehmliche intime Bilder und Material zu sexuellem
Kindesmissbrauch, und Anbieter von generativen Systemen, die vor dem 2. August 2026 auf den Markt
gebracht wurden, müssen die Kennzeichnungspflicht des Artikels 50(2) erfüllen. Die
Hochrisiko-Verpflichtungen aus Anlage III folgen am 2. Dezember 2027 und aus Anlage I am 2. August
2028; Hochrisiko-Systeme für öffentliche Behörden, die bereits auf dem Markt waren, müssen bis
zum 2. August 2030 konform sein. [Kapitel 08](/bok/regulatory-map#eu-ai-act-post-omnibus) ordnet
jedes Datum dem Artefakt zu, das es beantwortet.

Der gleiche Zug zeigt sich außerhalb der EU.
[Kaliforniens SB 53](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
das Transparency in Frontier Artificial Intelligence Act, unterzeichnet am 29. September 2025 und
seit 1. Januar 2026 in Kraft, bindet große Frontier-Entwickler (Modelle, die mit mehr als 10^26
Operationen trainiert wurden; Jahresumsatz über USD 500 Millionen) dazu, ein Frontier-AI-Framework
zu veröffentlichen, und jeden Frontier-Entwickler, groß oder klein, dazu, kritische
Sicherheitsvorfälle dem Office of Emergency Services des Staates innerhalb von 15 Tagen zu melden,
mit Zivilstrafen von bis zu USD 1 Million pro Verstoß, die vom Attorney General eingezogen werden
[17][18]. Sein Umfang ist eng (Kapitel 08 stellt es neben die anderen
[US-Staatsgesetze](/bok/regulatory-map#us-federal-and-state-laws)), aber was es verlangt, ein
veröffentlichtes Framework und
[eine Incident Pipeline, die nach einer Uhr läuft](/bok/incidents#the-overlapping-clocks), ist
wiederum ein Engineering-Deliverable.

### Die Agent-Verschiebung

Das letzte Signal ist das Objekt der Governance selbst. Agenten, die durchsuchen, Code ausführen,
APIs aufrufen und unter delegierter Autorität handeln, sind jetzt das Schwierigste und Neueste zu
regeln, und die Evidenz, dass Legacy-Kontrollen sie nicht sehen können, häuft sich. Gartners
Prognose, dass bis 2029 mehr als die Hälfte erfolgreicher Angriffe auf KI-Agenten
Zugriffskontroll-Schwächen und Prompt-Injection ausnutzen werden [3]}, nennt Identität und Injection
(Runtime-Bedenken) als die dominante Angriffsfläche. Das Identitätsproblem ist konkret: Am 5.
Februar 2026 veröffentlichte NISTs National Cybersecurity Center of Excellence ein Konzeptpapier
darüber, wie Identifikation, Authentifizierung und Autorisierung so gelten, dass Agenten "bekannt,
vertrauenswürdig und ordnungsgemäß regiert" sind, und fragte, wie Agent-Aktionen auf
manipulationssichere Weise protokolliert und an einen Menschen für Nichtabstreitbarkeit
zurückgebunden werden können [20]. Ein Agent, der auf einem generischen, gemeinsamen Service-Konto
läuft, besteht diesen Test konstruktionsbedingt nicht: Seine Aktionen können nicht präzise
nachverfolgbar oder widerrufen werden. OWASPs Top 10 für Agentic Applications 2026 katalogisiert die
Fehlermodi, die folgen, von Agent-Ziel-Entführung (ASI01) über Tool-Missbrauch (ASI02) und
Agent-Identität und Privilege-Missbrauch (ASI03) bis zu rogue agents (ASI10) [21]. Und die oben
zitierte Vendor-Umfrage von 2026 meldet ungefähr einen von acht KI-Breaches mit agentic systems [7].
Das Threat-Modell hat sich zur Schicht verschoben, die das Paper-Register nicht erreichen kann.
Kapitel 23 ordnet
[diese Bedrohungen Kontrollen zu](/bok/governing-agents#threats-mapped-to-controls).

## Was sich ändert, wenn Governance engineered wird

Die fünf Probleme teilen eine Wurzel: Governance, die beschreibt statt läuft. Das Engineering der
Governance ändert das Artefakt, und das Ändern des Artefakts ändert, was die Funktion versprechen
kann. Wenn das Register vom Deployment-Pipeline gespeist wird, ist "welche KI läuft?" eine
Live-Abfrage, keine vierteljährliche Vermutung, und die Veraltung von Problem 1 hört auf zu
existieren. Wenn ein `eval gate` den Build bei einem gesunkenen Injection-Resistance-Schwellenwert
fehlschlägt und eine zu Code kompilierte Policy eine Out-of-Region-Bereitstellung blockiert, weichen
die Point-in-Time-Überprüfung von Problem 2 und das End-of-Line-Gate von Problem 3 Kontrollen, die
dort feuern, wo sich das System ändert. Wenn Guardrail-Entscheidungen, Eval-Ergebnisse und
Policy-Verdikt als maschinenlesbare Datensätze in einen Assurance-Store streamen, wird das
Framework-Theater von Problem 4 durch ein Maß beantwortet, das die fallende Rate eines benannten
Fehlermodus ist, nicht eine Zählung grüner Zellen. Und wenn Identität der Autonomie vorausgeht und
Telemetrie zu einem Live-Kontrollsignal wird, ist der Runtime-Datenpfad von Problem 5 das Rückgrat
statt ein Nachgedanke, daher sind die drei Fragen an jedem beliebigen Dienstag von Live-Systemen aus
beantwortbar.

Dies ist keine Behauptung, dass engineered governance Compliance garantiert; kein Artefakt tut das,
und noch keine Norm verleiht eine Vermutung. Die Behauptung ist enger und nützlicher: Gemessen an
tatsächlicher Risikominderung und auditfähigen Nachweisen schlägt eine Governance-Funktion, die
läuft, eine, die geschrieben ist, und der Markt, der Regulator und das Threat-Modell haben alle
zwischen April 2025 und August 2026 angefangen, nach der Version zu fragen, die läuft. Deshalb
jetzt.

> **In der Praxis**
> In einem großen Telekommunikationsunternehmen war die Verschiebung von "dokumentiert" zu
> "engineered" in einem einzigen Quartals-Incident-Drill sichtbar. Die Paper-Version beantwortete
> "welche Agenten können die Payments-API erreichen?" mit einer Tabelle, die eine Woche alt war und
> zwei seit der letzten Überprüfung aufgebaute Services fehlte. Nachdem das Register mit der
> Deploy-Pipeline verdrahtet wurde und jedem Agent eine scoped identity ausgestellt wurde, war die
> gleiche Frage eine Abfrage, die Besitzer, Scopes und Last-Seen-Zeitstempel in Sekunden zurückgab,
> und ein fehlerhafter Agent konnte widerrufen werden, ohne die anderen zu unterbrechen. Die Evidenz
> für den Drill wurde nicht nachträglich zusammengestellt; sie war bereits im Assurance-Store.

**Zuordnung:** EU-KI-Verordnung Art. 4/4a (Kompetenz, Bias-Detection-Daten), Art. 15 (Robustheit,
Cybersicherheit), Art. 17 (QMS), Art. 53/55 (GPAI), Art. 101 (GPAI-Bußgelder) · ISO/IEC 42001 · NIST
AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 für Agentic Applications 2026 (ASI01–ASI03,
ASI10) · California SB 53 · Five-Layer-Stack, alle Schichten. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; only 1.5% will not need more staff; 77% working on AI governance; 5% of the function in Security; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[2] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[3] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, >50% of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[6] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[7] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[8] "The State of the AI Governance Job Market in 2026" (1,997 US postings; observability platforms 41%, Python 28%, NIST frameworks 27%; updated 2026-08-04). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[9] "Engineering Manager, GRC" (build an "AI-forward GRC engineering function"; "translate policies into policy-as-code"; Claude "as a virtual GRC analyst"; no longer accepting applications on 2026-09-24). Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[12] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[13] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[14] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[15] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[16] Statement announcing the AI Office's first formal requests for information to GPAI providers (model security, independent external evaluations, post-market monitoring; recipients not named). Henna Virkkunen, Executive Vice-President of the European Commission (LinkedIn). 2026-08-29. https://www.linkedin.com/feed/update/urn:li:activity:7499411372032602112/ (verified: primary)
[17] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1: new Art. 5(1)(ba)–(bb) from 2 Dec 2026; new Art. 111(4) (Art. 50(2) marking for systems placed on the market before 2 Aug 2026, by 2 Dec 2026); Art. 111(2) (public-authority high-risk systems by 2 Aug 2030); Art. 113 (Annex III 2 Dec 2027; Annex I 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[20] "Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization" (concept paper; agents "known, trusted, and properly governed"; tamper-proof logging and non-repudiation). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[21] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Agent Identity & Privilege Abuse, … ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[22] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[23] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
