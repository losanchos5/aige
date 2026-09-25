---
lang: de
source: bok/01-definition.md
sourceHash: "1cce4e63e8eb069cdc6eb894461204e8419fc6b0b7176c3e0210281b0d47437e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 01. Die Definition

> KI-Governance-Engineering ist die Anwendung von Engineering-Praktiken (Systemdenken, Produktdenken
> und Code) auf die Governance von KI-Systemen; eine Fähigkeit, keine Jobbezeichnung, gemessen an
> tatsächlicher Risikominderung und auditfähigen Nachweisen.

## Die Definition

**KI-Governance-Engineering ist die Anwendung von Engineering-Praktiken (Systemdenken, Produktdenken und Code) auf die Governance von KI-Systemen.**

Lesen Sie den Satz in drei Teilen. *Engineering-Praktiken* bedeutet, dass wir Governance so bauen,
betreiben und messen, wie Engineers alles andere bauen, betreiben und messen: als versionierte
Systeme mit Tests, Telemetrie und Eigentümern, nicht als Dokumente. *Systemdenken und Produktdenken*
bedeuten, dass wir Governance als Ganzes behandeln, das Daten, Modell, Pipeline, Runtime und
Organisation umfasst und als Produkt an die Engineers geliefert wird, die seine Nutzer sind. *Die
Governance von KI-Systemen* ist das Thema: die gesamte Spanne der Governance, des Risikos und der
Assurance für KI, einschließlich autonomer Agenten, nicht nur ein enger Ausschnitt davon. Kapitel 11
klärt [was als KI-System](/bok/ai-defined#four-definitions-compared) für Governance-Zwecke zählt und
warum diese Entscheidung selbst die erste Kontrolle ist.

Der Rahmen ist absichtlich entlehnt. GRC Engineering definiert sich selbst als "die Anwendung von
Software-Engineering-Praktiken, Systemdenken und Produktdenken auf Governance, Risk und Compliance"
[1]. KI-Governance-Engineering ist dieser gleiche Schritt, gerichtet auf die Governance von KI. Es
ist die Mutterschaft-Disziplin, gerichtet auf ein schnelleres, seltsameres Ziel.

## Drei Klarstellungen

**Sie umfasst Governance, Risiko und Assurance von KI-Systemen, einschließlich Agenten.** Der Umfang
ist nicht "Compliance". Er erstreckt sich vom Setzen der Regeln (Governance) über die
Identifizierung und Verringerung von Risiken (Risk) bis zur Erbringung von Nachweisen, dass die
Kontrollen funktionieren (Assurance). Er schließt autonome und agentengestützte KI explizit ein,
denn dort liegen jetzt die schwierigsten Governance-Probleme: ein Agent, der browsed, Code ausführt,
APIs aufruft und unter delegierter Autorität handelt, ist das Objekt, das Legacy-Governance am
wenigsten sehen kann.

**Es ist eine Fähigkeit, keine Berufsbezeichnung.** Sie brauchen "KI-Governance-Engineer" nicht auf
Ihrer Visitenkarte, um diese Arbeit zu leisten, und die Berufsbezeichnung bedeutet nicht, dass Sie
sie tun. Es ist ein Satz von Praktiken (Policy-as-Code, Eval Gates, Agentenregister, kontinuierliche
Assurance), den ein Security Engineer, ein Privacy Engineer, ein MLOps Engineer oder ein Governance
Lead jeweils entwickeln kann. Der Markt formt die Rolle (technische KI-Governance-Rollen im
Tech-Sektor berichten von einem Median nahe USD 221.000, das höchste Band in IAPPs Umfrage [2], und
Gartner prognostiziert KI-Governance-Ausgaben von USD 492 Millionen im Jahr 2026, die USD 1
Milliarde bis 2030 überschreiten [3]), aber die Disziplin wird durch die Fähigkeit definiert, nicht
durch die Vakanz.

**Sie wird durch tatsächliche Risikominderung und auditfähige Nachweise gemessen.** Es gibt genau
zwei Tests. Ist das Risiko tatsächlich, messbar, in der Produktion gefallen, nicht auf einer
Maturity-Folie? Und kann ein Regulator oder Auditor den Beweis als maschinenlesbaren Nachweis lesen,
nicht als zusammengesetzte Screenshots? Eine Kontrolle, die keinen dieser Tests besteht, ist
Theater. Framework-Abdeckung, Anzahl geschriebener Richtlinien und abgehaltener Ausschüsse sind
bestenfalls Eingaben; sie sind niemals das Maß.

## ## Der Disambiguierungs-Cluster

Die Disziplin wird ebenso durch das definiert, was sie nicht ist, wie durch das, was sie ist. Acht
Nachbarn werden routinemäßig mit ihr verwechselt. Jeder teilt eine Grenze; keiner ist dasselbe.

| Nachbar | Was es tut | Wie sich KI-Governance-Engineering unterscheidet |
|---|---|---|
| **KI-Sicherheitsforschung** | Untersucht, ob leistungsstarke Modelle prinzipiell sicher sind (Alignment, gefährliche Fähigkeiten). | Engineert die Kontrollen und Nachweise für KI-Systeme in der Produktion; konsumiert Sicherheitsforschung, führt sie nicht durch. |
| **MLOps / LLMOps** | Baut, deployt und bedient Modelle und Pipelines zuverlässig. | Regelt, was MLOps ausliefert: fügt Policy, Evals als Nachweis, Register und Assurance als Gates in derselben Pipeline hinzu. |
| **Modellrisikomanagement (SR 11-7 Stil)** | Validiert Modelle, prüft auf konzeptionelle Solidität und Back-Tests in der Banking-Tradition; in den USA wurde SR 11-7 am 17. Apr 2026 durch SR 26-2 ersetzt [6]. | Erweitert über Modellvalidierung hinaus auf Runtime-Verhalten, Agenten, Rechte-Auswirkungen und kontinuierliche, maschinenlesbare Nachweise. |
| **KI-Compliance / Legal** | Interpretiert Verpflichtungen (KI-Verordnung, DSGVO) und berät dazu. | Wandelt die Verpflichtung in eine ausführbare Kontrolle und lesbare Nachweise um; benötigt Legal, ersetzt es nicht. |
| **Responsible AI / KI-Ethik** | Setzt die Werte und Prinzipien (Fairness, Transparenz, Rechenschaftspflicht). | Implementiert diese Werte als laufende Kontrollen; Ethik setzt das Ziel, Engineering trifft es und beweist es. |
| **GRC Engineering** (das Elternteil) | Wendet Engineering-Praktiken auf Governance, Risk und Compliance allgemein an. | Gleiche Methode, spezialisiert auf KI: Modelle, Agenten, Evals, AIBOM, Runtime-KI-Kontrollen. |
| **KI-Security Engineering** (das Geschwister) | Sichert KI-Systeme gegen Angriffe (Prompt-Injection, Modelldiebstahl, Agentenmissbrauch); sein Lieferergebnis ist ein verteidigtes System. | Überlappt sich stark (oft dieselbe Person), aber sein Lieferergebnis ist ein *gesteuertes und nachgewiesenes* System: der Rechte-und-Pflichten-Datensatz und kontinuierliche Assurance, nicht nur Verteidigung. |
| **Visures "KI-Governance-Engineering"** | Regelt die KI, die Ingenieure *innerhalb* von Engineering-Workflows verwenden (Anforderungen, MBSE). | Die entgegengesetzte Richtung: unser Thema ist die Steuerung von KI-*Systemen*, nicht die Steuerung von KI-gestütztem Engineering [4]. |

In Prosa: Die Grenze liegt dort, wo eine Disziplin endet. **KI-Sicherheitsforschung** fragt, ob ein
Modell sicher ist; wir fragen, ob das bereitgestellte System geregelt ist, und beweisen es.
**MLOps** antwortet "wird das Modell bedient?"; wir antworten "darf es bedient werden, und welche
Nachweise sagen das?" Wir regeln die Pipeline, die MLOps ausführt. **Modellrisikomanagement** in der
SR 11-7 Tradition validiert ein Modell zu bestimmten Zeitpunkten; wir regeln das System
kontinuierlich, einschließlich Agenten, die kein Analogon in einem Kreditmodell haben. Der
Referenztext der Tradition in den USA änderte sich am 17. Apr 2026, als die Federal Reserve, die OCC
und die FDIC SR 11-7 durch SR 26-2 ersetzten
([SR 11-7, jetzt SR 26-2](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai), in Kapitel 21)
[6]. Die neue Anleitung platziert generative und agentengestützte KI-Modelle außerhalb ihres Umfangs
[7], daher sind die Systeme, um die sich dieses Buch am meisten kümmert, diejenigen, die die
Bank-Modellvalidierung jetzt anderen Kontrollen überlässt; Kapitel 13 legt dar, wo
[Modellrisikomanagement auf KI-Risikomanagement trifft](/bok/risk-management#what-this-chapter-settles).
**KI-Compliance und Legal** sagen dir, was das Gesetz verlangt; wir bauen die Kontrolle, die es
erfüllt, und den Nachweis, der es zeigt, und wir verlassen uns auf Anwälte, um uns zu sagen, dass
wir die Verpflichtung richtig verstanden haben. **Responsible AI und KI-Ethik** setzen die Werte;
ohne Engineering bleiben diese Werte auf einem Poster (Kapitel 16 verwandelt einen von ihnen,
[Fairness, in Metriken und Eval Gates](/bok/fairness-and-explainability#group-fairness-metrics)).
**GRC Engineering** ist die Elternmethode, und wir sind ihre KI-Spezialisierung. Wir erben drei der
fünf Stack-Schichten fast unverändert (Governance-as-Code, Inventory & Transparency und Assurance &
Continuous Compliance, die Policy as Code, das Asset-Inventar und maschinenlesbare Nachweise tragen)
zusammen mit dem Test "grünes Dashboard über einer kaputten Kontrolle ist Theater"; was KI uns
zwingt hinzuzufügen, sind die anderen zwei, Evals und Red-Teaming als Kontrollen und Agent-Identität
und Runtime-Kontrolle, denn ein Modell, dessen Verhalten getestet werden muss, und ein autonomer
Akteur, der unter delegierter Autorität handelt, haben kein Analogon in klassischem GRC.
**KI-Security Engineering** ist das Geschwister, mit dem wir uns am meisten überlappen, und die
Überlappung ist ein Feature, keine Grenzstreitigkeit: oft trägt dieselbe Person beide Hüte. Die
Linie ist nicht "Framing versus Zäune", sondern *Lieferergebnis*. Das Lieferergebnis von Security
Engineering ist ein verteidigtes System: es stoppt den Angriff. Das Lieferergebnis von
KI-Governance-Engineering ist ein *gesteuertes und nachgewiesenes* System: der
Rechte-und-Pflichten-Datensatz (welche Kontrolle beantwortet welchen Artikel, mit dem Nachweis
angehängt) und kontinuierliche Assurance als Produkt, das ein Auditor oder Regulator abfragen kann.
Ein Red-Team-Eval ist Sicherheitsarbeit und Governance-Arbeit zugleich; es wird Governance, wenn
sein Ergebnis als Nachweis gegen eine Verpflichtung eingereicht wird. Security fragt "ist es sicher
vor Angriffen?"; wir fragen "ist es geregelt, und können wir es beweisen?" Wir brauchen
normalerweise die Sicherheitsantwort als Input für unsere. Und **Visures** Verwendung des
identischen Ausdrucks zeigt in die völlig andere Richtung: die KI zu regeln, die Engineering-Arbeit
unterstützt, nicht die Governance von KI zu engineern. Wir beanspruchen die zweite Bedeutung und
disambiguieren die erste auf den ersten Blick.

## ## Das Objekt der Governance

Was konkret regelt diese Disziplin? Fünf verschachtelte Objekte, jedes benötigt unterschiedliche
Kontrollen:

- **Modelle.** Die trainierten Artefakte (Foundation Models, Fine-Tunes, Klassifizierer) mit ihrer
  Herkunft, Fähigkeiten, Evaluationen und bekannten Fehlermodi. Geregelt mit Model Cards, Evals und
  AIBOM.
- **Systeme.** Die Anwendung um das Modell herum: Prompts, Retrieval, Tools, Orchestrierung, die
  menschlichen und maschinellen Benutzer. Die meisten Risiken sind hier, nicht im rohen Modell.
- **Agenten.** Systeme, die handeln: browsen, Code ausführen, APIs aufrufen, Geld bewegen, an andere
  Agenten delegieren. Geregelt mit Identität, begrenztem Umfang, Tool-Vermittlung,
  Runtime-Guardrails und Kill Switches. Dies ist das schwierigste und neueste Objekt, und das, das
  Legacy-Governance nicht sehen kann; Kapitel 23 behandelt
  [die Steuerung von Agenten](/bok/governing-agents#what-makes-an-agent-a-governance-object) von
  Anfang bis Ende.
- **Daten.** Trainingsdaten, Retrieval-Korpora, Prompts und Outputs mit ihrer rechtlichen Grundlage,
  Rechten, Herkunft und Aufbewahrung. Geregelt mit Data Cards, DSFAs und Lineage; Kapitel 19 wendet
  [Datenschutzrecht auf KI an](/bok/privacy-and-ai#principles-applied-to-ai).
- **Die Organisation.** Die Rollen, Entscheidungsrechte, Eskalationspfade und Verantwortlichkeiten,
  die all das Obige umgeben. Geregelt mit einem Betriebsmodell, RACI und einer Incident Pipeline
  (Kapitel 12 ordnet
  [die Stakeholder und ihre Pflichten](/bok/governance-program#the-stakeholder-map) zu). Eine
  Kontrolle ohne Eigentümer ist keine Kontrolle.

Die Disziplin ist kohärent nur, wenn sie alle fünf adressiert. Eine Model Card ohne Agentenregister
oder ein Agentenregister ohne Runtime-Datenpfad regelt ein Objekt und lässt die anderen offen.

## ## Die drei Fragen

Zu jedem Zeitpunkt muss eine KI-Governance-Engineering-Funktion drei Fragen zur Produktion sofort
beantworten können, aus Live-Systemen, nicht aus einem Dokument, das vor einem Quartal zuletzt
aktualisiert wurde:

1. **Welche KI läuft?** Welche Modelle, Systeme und Agenten sind live, in welcher Version, von wem
   besessen. Dies ist die Aufgabe des Inventars und des Agentenregisters, und es muss von einem
   Runtime-Datenpfad gespeist werden, nicht in eine Tabelle eingegeben.
2. **Was darf es tun?** Der Umfang, die Berechtigungen, Guardrails und Richtlinien, die jedes System
   und jeden Agenten begrenzen. Dies ist die Aufgabe von Governance-as-Code und Runtime-Kontrollen:
   Identität vor Autonomie, Umfang vor Aktion.
3. **Welche Nachweise beweisen es?** Der maschinenlesbare, auditfähige Datensatz, dass die
   Kontrollen ausgelöst wurden und das Risiko gefallen ist. Dies ist die Aufgabe von Evals als
   Nachweis und kontinuierlicher Assurance: Nachweise als Nebenprodukt des Builds.

Diese drei Fragen sind das Rückgrat des gesamten Body of Knowledge. Der fünfschichtige Stack
(Kapitel 04) ist gebaut, um sie zu beantworten: Inventory & Transparency beantwortet *was läuft*;
Governance-as-Code und Runtime Controls & Observability beantworten *was es tun darf*, das erste
schreibt die Grenze als Code und das zweite erzwingt sie auf dem Live-Call; Evals & Red Teaming und
Assurance & Continuous Compliance beantworten *welche Nachweise beweisen es*. Die Bedrohungen, gegen
die diese Kontrollen gebaut sind (Prompt-Injection, Tool-Missbrauch, Agent-Identität und
Privilege-Missbrauch, rogue Agenten), sind in OWASPs Top 10 für Agentic Applications katalogisiert
[5], und die Muster, die sie beantworten, sind in Kapitel 05.

## ## Die Grenzen des Eval Gates

Dieses Buch lehnt sich stark auf Evals als Kontrollen, daher schuldet es dem Leser denselben
"Theater"-Test, den es auf alles andere anwendet. Ein Eval Gate ist notwendig; es ist nicht
ausreichend. Nehmen Sie es ernst und seine Grenzen folgen direkt:

- **Es ist punktuell und stichprobengebunden.** Ein Eval beweist, dass das System *diese* Fälle *in
  dieser* Version bestanden hat. Es sagt nichts über die Eingaben, die es nicht gesampelt hat, und
  nichts über das Modell von morgen.
- **Es ist Goodhartbar.** In dem Moment, in dem ein Schwellenwert ein Release gating, entsteht
  Druck, das Modell auf die Suite oder den Schwellenwert auf das Modell abzustimmen. Ein Gate, das
  gegen eine Optimierung läuft, wird zu einer Zahl, die steigt, während sich das Risiko, für das sie
  stand, nicht bewegt.
- **Es erfasst Regressionen, nicht Neuheiten.** Eine Suite testet bekannte Fehlermodi. Ein
  neuartiger Jailbreak oder ein Angriff, den die Suite sich nie vorgestellt hat, passiert grün, weil
  nichts im Gate gebaut wurde, um ihn zu sehen.

Nichts davon spricht gegen das Gate; es spricht dafür, wie das Gate betrieben werden muss. Die
Eval-Suite ist selbst ein Artefakt, das governance-unterliegen muss: ihre Abdeckung gemessen, ihre
Fälle adversarial gepflegt, ihre Schwellenwerte zu benannten Fehlermodi zurückverfolgt statt zu
runden Zahlen, und ihre Größe durch den Schwellenwert gesetzt, den sie auflösen muss (Kapitel 14
zeigt, wie man
[die Suite vom Schwellenwert dimensioniert](/bok/governing-development#statistical-validity-of-evals)).
Die gleiche Vorsicht gilt für
[öffentliche Benchmarks und Leaderboards](/bok/governing-deployment#what-public-benchmarks-and-leaderboards-cannot-tell-you),
die ein Modell an den Fällen von jemand anderem bewerten statt an deiner Aufgabe. Und ein
bestandenes Gate *verpflichtet* zu Runtime-Monitoring (Layer 04) statt es zu ersetzen. Ein Eval ist
die Kontrolle zur Build-Zeit; der Guardrail und die Trace sind die Kontrolle zur Run-Zeit, gegen die
Eingaben, die kein Eval antizipiert hat. Eine Disziplin, die ein grünes Gate als Sicherheitsbeweis
behandelt, hat Framework-Theater mit einer schnelleren Pipeline wieder aufgebaut.

> **In der Praxis**
> In einem großen Telekommunikationsunternehmen kam der Unterschied zwischen
> "governance-unterliegen" und "dokumentiert" auf diese drei Fragen an. Ein von Hand gepflegtes
> Modell-Inventar beantwortete Frage eins am Tag, an dem es bearbeitet wurde, und war eine Woche
> später falsch. Das Register mit der Deployment-Pipeline zu verbinden (sodass sich ein neues Modell
> oder ein neuer Agent zur Deploy-Zeit selbst mit einem Owner und einem Scope registrierte) war das,
> was die drei Fragen an jedem beliebigen Dienstag beantwortbar machte. Das Dokument wurde eine
> Abfrage.

**Zuordnung:** EU AI Act Art. 9 (Risikomanagement), Art. 11/49/71 (Dokumentation und Registrierung),
Art. 55 (GPAI-Pflichten bei systemischem Risiko) · ISO/IEC 42001 (KI-Managementsystem) · NIST AI RMF
(Govern, Map, Measure, Manage) · OWASP Top 10 for Agentic Applications 2026. Mappings sind
illustrativ, keine Konformitätsaussage.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Salary & Jobs Report 2025-26. IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[3] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[4] "AI Governance Engineering". Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant to banking organisations above USD 30 billion in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[7] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models; effective challenge). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
