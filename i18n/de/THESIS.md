---
lang: de
source: THESIS.md
sourceHash: "921fc304377c137a926045c38040d78fbec8f056e7944d519b5b34cd7a8a48a8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# Die KI-Governance-Engineering-These

Version 0.5.0 · 2026-09-25 · Jorge García Aibar und Aurélie Pols

---

**KI-Governance-Engineering ist die Anwendung von Engineering-Praxis (Systemdenken, Produktdenken und Code) auf die Governance von KI-Systemen.**
Es behandelt Governance nicht als ein zu unterzeichnendes Dokument, sondern als ein System, das
gebaut, betrieben und gemessen wird, mit der gleichen Strenge, die Ingenieure bereits auf die
Modelle und Agenten anwenden, die es regelt.

Es ist mehr als „KI-Governance plus ein paar Skripte.

Die Idee kommt nicht aus dem Nichts. Sie erbt von einer Reihe von Engineering-Bewegungen, die
Prozesse in laufende Systeme umgewandelt haben: Site Reliability Engineering, DevSecOps,
Policy-as-Code und Software-Supply-Chain-Sicherheit. Am direktesten erbt sie von GRC-Engineering,
das seit etwa 2024 Governance, Risiko und Compliance in ein mit Code gebautes, in CI/CD getestetes
und Nachweise durch APIs versendendes Produkt umgewandelt hat [1]. KI-Governance braucht jetzt
denselben Schritt-Wechsel, weil das zu Regierende (Modelle, die umtrainiert werden, Prompts, die
umgeschrieben werden, Agenten, die eigenständig handeln) schneller voranschreitet als jedes Dokument
folgen kann.

## Grundlegende Probleme mit Legacy-KI-Governance

**1. Governance geschrieben für Systeme, die es nicht mehr gibt.** Legacy-KI-Governance läuft auf
PDF-Richtlinien und Spreadsheet-Inventaren, die ein KI-System so beschreiben, wie es am Tag seiner
Überprüfung war. Aber Modelle werden umtrainiert, Prompts werden umgeschrieben und Agenten erwerben
täglich neue Tools. Das Artefakt ist veraltet, bevor es unterzeichnet wird. Es ist kein Zufall, dass
die Funktion immer noch hauptsächlich bei Datenschutz, Recht und IT sitzt und nur zu 5% bei
Sicherheit [3]: weit weg von der Pipeline, wo sich das System tatsächlich ändert.

**2. Point-in-Time-Überprüfung einer sich ständig ändernden Sache.** Jährliche Bewertungen und
Ausschuss-Genehmigungen gehen davon aus, dass ein System lange genug stillsteht, um beurteilt zu
werden. Frontier-Modelle und autonome Agenten tun das nicht. Gartner erwartet, dass mehr als 40% der
agentic-AI-Projekte bis Ende 2027 abgebrochen werden, wobei unzureichende Risikokontrollmaßnahmen
unter den Ursachen genannt werden [4], und prognostiziert, dass bis 2029 mehr als die Hälfte
erfolgreicher Angriffe auf KI-Agenten Schwachstellen bei der Zugriffskontrolle und Prompt-Injection
ausnutzen werden [5]: Runtime-Fehlermodi, für die eine einmal jährliche Überprüfung strukturell
blind ist.

**3. Governance als Gate am Ende, nicht als Eigenschaft des Builds.** Governance kommt nach dem
Training des Modells an, als Checkpoint zum Löschen vor dem Start. Ingenieure erleben es als eine
Steuer, die an der Tür eingezogen wird, und nichts, was es produziert, ist in die Art und Weise
verdrahtet, wie das System gebaut wird. Eine Richtlinie, die nur empfehlen kann, kann eine schlechte
Veröffentlichung nicht stoppen. Ein Eval, das den Build fehlschlagen lassen kann. Governance am Ende
platziert kann nur Risiko beschreiben; Governance in die Pipeline eingebaut kann es verhindern.

**4. Framework theatre.** Mapping to NIST AI RMF or ISO/IEC 42001 becomes the end state instead of
the starting point. A green mapping matrix is mistaken for a working control. Yet as of 2026-09-24 no
harmonised standard is cited in the EU's Official Journal, so even an ISO 42001 certificate confers
no presumption of conformity with the AI Act [6]. Coverage is not assurance. A crosswalk proves you
have read the framework, not that the control it points to actually fires; a green matrix over a
broken control is "theatre with extra steps" [2].

**5. No runtime data path.** The registry does not know what is running. Gartner asks AI governance
platforms for "automated policy enforcement at runtime" [11], yet one vendor's comparison of the
category, published by a competitor in it, finds that most of it "manages the program (inventories,
assessments, framework mappings, evidence workflows) without any runtime data path" [7]. IBM's own
account of being named a Leader in Gartner's first Magic Quadrant for AI Governance Platforms (June
2026) points the same way: it describes visibility into AI use cases and a roadmap of centralised AI
asset inventory, lineage and use-case onboarding (the program layer), and does not mention runtime
enforcement [10]. So the three questions that define the discipline (what AI is running, what is it
allowed to do, what evidence proves it) go unanswered, because nothing is connected to production.
Meanwhile a security vendor's 2026 survey reports that roughly one in eight AI breaches involved
agentic systems [8]: exactly the layer the paper registry cannot see.

## Werte

Acht Bekenntnisse. Jedes besagt, worauf wir hinarbeiten und benennt damit auch, wovon wir uns
abwenden. Nicht alle sind neu: die Werte 1, 5 und 7 (Governance-as-Code, maschinenlesbare Nachweise
und gemessene Risikominderung) stammen aus der GRC-Technik; die Werte 2 und 4 (Evals, die den Build
fehlschlagen lassen, und Agent-Identität und Scope) sind das, was KI uns hinzuzufügen zwingt.
Kapitel 03 erweitert jeden Wert um ein praktisches Beispiel und das Anti-Pattern, das er ablehnt.

**1. Governance ist Code, kein Dokument.** Eine Policy in einem PDF ist eine Absichtserklärung, die
ein Mensch sich merken und anwenden muss; eine Policy-as-Code ist ein Kontrollelement, das
ausgeführt wird, in einem Repository versioniert und ohne dass jemand daran denken muss durchgesetzt
wird. Das Dokument beschreibt die Regel; der Code *ist* die Regel, und nur das, was läuft, kann
gemessen werden.

**2. Evals fehlschlagen Builds; Reviews empfehlen nur.** Ein Review erzeugt eine Empfehlung, die
jemand später vielleicht umsetzt oder auch nicht. Ein Eval erzeugt ein Urteil mit Konsequenzen: das
Modell oder der Agent hat einen definierten Test bestanden oder nicht bestanden, und ein Fehler
blockiert die Freigabe. Wir bevorzugen Kontrollelemente, die zubeißen.

**3. Nachweise kommen aus der Laufzeit, nicht aus einer punktuellen Bestätigung.** Eine Bestätigung
besagt, dass ein Kontrollelement vorhanden war, als jemand nachgesehen hat. Nachweise aus der
Laufzeit zeigen, dass es kontinuierlich funktioniert, vom System während des Betriebs ausgegeben,
weil sich ein KI-System zwischen Reviews ändert und einmal gesammelte Nachweise sofort verfallen.

**4. Jeder Agent trägt seine eigene Identität und seinen eigenen Scope.** Ein Akteur mit gemeinsamen
Anmeldedaten ist nicht zu regieren: Sie können seine Handlungen nicht zuordnen, seinen Zugriff nicht
präzise widerrufen oder begrenzen, was er tun darf. Identität ist die Voraussetzung für
Rechenschaftspflicht; Scope ist die Voraussetzung für Eindämmung, und beide werden etabliert, bevor
der Akteur handeln darf.

**5. Nachweise sind maschinenlesbar oder sie sind keine Nachweise.** Nachweise, die ein Mensch von
Hand erzeugen, formatieren und ablegen muss, können nicht abgefragt, verglichen oder schnell
überprüft werden. Maschinenlesbare Artefakte (OSCAL, strukturierte Eval-Ergebnisse, signierte Logs)
verwandeln die Audit in eine Abfrage und speisen kontinuierliche Assurance statt eines einmaligen
Ordners.

**6. Werkzeuge müssen inspizierbar und zusammensetzbar sein.** Sie können einem Urteil nicht trauen,
das Sie nicht nachvollziehen können. Werkzeuge, deren Logik und Datenpfad Sie öffnen können, gekauft
oder gebaut, lassen Sie eine Entscheidung bis zu der Regel verfolgen, die sie erzeugt hat, und zu
dem Nachweis, den sie ausgegeben hat, und es in die Pipeline einbinden, die Sie bereits betreiben,
statt es in jemand anderen auszulagern.

**7. Erfolg wird in tatsächlicher Risikominderung gemessen, nicht in Framework-Abdeckung.** Jedes
Kontrollelement einem Framework zuzuordnen beweist, dass Sie es gelesen haben, nicht dass ein Risiko
gefallen ist. Wir messen die Sache selbst: Ist die Rate des Fehlermodus gefallen, ist der
Blast-Radius geschrumpft, wurde der Incident früher erfasst? Abdeckung ist ein Input; tatsächliche
Risikominderung ist das Ergebnis.

**8. Governance wird mit Engineering geleitet, nicht von außen durchgesetzt.** Governance, die
abseits sitzt und Durchgang gewährt oder verweigert, ist ein Engpass, den Ingenieure umgehen.
Gemeinsam mit Engineering geleitet, in den gepflasterten Weg eingebaut, angenommen, weil es der
einfachste Weg ist zu versenden, wird sie Teil davon, wie Dinge gemacht werden, nicht ein Treffen,
das eine Seite fürchtet.

## Prinzipien

Die Werte besagen, was wir bevorzugen; diese Prinzipien besagen, was wir uns verpflichten *zu tun*.
Sie sind Handlungsregeln, keine Umformulierungen der obigen Vorlieben.

**Bauen Sie das Kontrollelement an der frühestmöglichen Stelle, wo es blockieren kann.** Setzen Sie
jedes Kontrollelement dort ein, wo es die Sache noch stoppen kann, bevor sie schiefgeht, und nicht
später: im Repository, im Build und zur Laufzeit, nicht in einem Review danach. Der frühestmögliche
durchsetzbare Punkt ist der billigste und der stärkste, also setzen wir ihn dort ein.

**Geben Sie jedem Kontrollelement Zähne, oder nennen Sie es ein Signal.** Ein Kontrollelement muss
in der Lage sein, zu ändern, was als Nächstes passiert: einen Merge blockieren, einen Deploy
fehlschlagen lassen, Zugriff widerrufen. Alles, das nur ein Komitee informieren kann, ist ein
Signal, und wir kennzeichnen es ehrlich als eines, statt es als Kontrollelement zu verkleiden.

**Registrieren und begrenzen Sie jeden Akteur, bevor er handelt.** Nichts, Mensch oder Nicht-Mensch,
darf handeln, bis es einen Eigentümer, einen erklärten Scope und eine Möglichkeit hat, gestoppt zu
werden. Autonomie wird nur dort gewährt, wo sie zugeordnet, eingedämmt und entzogen werden kann,
niemals standardmäßig.

**Instrumentieren Sie den Build, um seinen eigenen Beweis zu erzeugen.** Verbinden Sie jedes
Kontrollelement so, dass es seinen eigenen Datensatz während des Betriebs ausgibt, damit Assurance
aus dem System fällt, statt von Hand zusammengestellt zu werden. Wenn der Nachweis eines
Kontrollelements einen Screenshot erfordert, haben wir es nicht fertig gebaut.

**Beginnen Sie mit einem benannten Fehlermodus oder einem benannten Schaden.** Entwerfen Sie jedes
Kontrollelement gegen eine spezifische Art, wie das System fehlschlägt (Prompt-Injection,
Tool-Missbrauch, Agent-Identitätsmissbrauch, Datenexfiltration) oder einen spezifischen Schaden an
den Rechten einer Person. Wenn wir das Risiko, das es beantwortet, nicht benennen können, bauen wir
es nicht.

**Machen Sie den geregelten Weg zum einfachsten Weg.** Versenden Sie Governance als Werkzeuge,
Vorlagen und gepflasterte Wege, die Ingenieure ohne Genehmigung annehmen, und messen Sie die
Annahme. Wenn das Umgehen der Governance einfacher ist als ihre Nutzung, beheben wir das Produkt,
nicht die Menschen.

## Was KI-Governance-Engineers bauen

Keine Decks. Arbeitende Artefakte, versioniert in einem Repository und laufend in der Produktion:

- **Policy-as-Code**: Governance-Regeln als ausführbare Policy (`OPA/Rego`, Cedar, Policy Cards),
  die in CI/CD und zur Laufzeit evaluieren.
- **Ein Agent-Register**: das laufzeitbewusste Inventar jedes Modells, jedes Service und jedes
  Agenten, jeweils mit einem Eigentümer, einem Scope und einem Status.
- **AIBOM und Model/Data Cards**: die Stückliste für ein KI-System (`CycloneDX ML-BOM`,
  `SPDX 3.0 AI` Profil) und strukturierte Transparenzdokumentation.
- **Eval Gates in CI**: adversarische und Capability-Evals (Inspect, promptfoo, Garak, Giskard), die
  in die Pipeline integriert sind, sodass ein fehlgeschlagenes Eval die Freigabe blockiert.
- **Runtime Guardrails und Kill Switches**: Input-/Output-Kontrollen, Tool-Call-Vermittlung und ein
  getesteter Weg, um einen Agent am Punkt der Aktion zu stoppen.
- **Kontinuierliche Assurance-Telemetrie**: Tracing und Monitoring (`OpenTelemetry`,
  Agent-Observability), das Produktionsverhalten in ein Live-Kontrollsignal umwandelt.
- **Maschinenlesbare Nachweise**: `OSCAL` und signierte, strukturierte Artefakte, die die
  Audit-Prüfung zu einer Abfrage statt zu einem Durcheinander machen.
- **Incident Pipelines**: die Infrastruktur zur Erkennung, Triage und Meldung schwerwiegender
  Vorfälle im Zeitplan, einschließlich der Meldung nach Artikel 73 des KI-Verordnung der EU für
  Hochrisiko-Systeme.
- **FRIA- und DPIA-Vorlagen als Code**: Grundrechte- und Datenschutz-Folgenabschätzungen, die als
  versionierte, überprüfbare Artefakte gepflegt werden, nicht als einmalige Dokumente.

Diese Artefakte werden Schicht für Schicht auf den fünf-schichtigen KI-Governance-Engineering-Stack
abgebildet: Governance-as-Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime
Controls & Observability und Assurance & Continuous Compliance.

Wir geben die Erbschaft offen zu, denn das ist die ehrliche Verteidigung gegen „das ist nur GRC mit
KI-Worten.

## A discipline, distinct from its neighbours

AI governance engineering is not AI safety research, MLOps, model risk management, AI compliance or
legal work, or Responsible AI ethics; it is the engineering that turns all of those into running
controls and readable evidence. It is the AI-era sibling of AI security engineering, the direct
descendant of GRC engineering. One name clash is worth flagging: some vendors use the same words,
"AI governance engineering", for the reverse problem, governing the AI tools that engineers use
inside their own workflows [9]. That is governed AI engineering, not the discipline described here.
Chapter 01 draws every one of these lines in full.

## Authors

**Jorge García Aibar (v0.1–v0.5.0)**, AI Governance & Privacy Engineer. LinkedIn:
https://www.linkedin.com/in/jorgara

**Aurélie Pols (v0.1–v0.5.0)**, Responsible AI (EU/Global), Privacy & Data Governance. LinkedIn:
https://www.linkedin.com/in/aureliepols

**Co-authors wanted.** This is version 0.5.0: a public draft, deliberately incomplete. It was
started by one practitioner and it needs many. If you build governance for AI systems (policy-as-
code, agent registries, eval gates, runtime guardrails, continuous assurance) and you can bring a
verified fact, a pattern that worked, or a sharper argument, you are invited to co-author. The
discipline is a capability anyone can develop, and this text belongs to everyone who does the work.

## Sign / get involved

- **Read it** at https://aigovernanceengineer.com/thesis and the Body of Knowledge at
  https://aigovernanceengineer.com/bok
- **Sign the Thesis** by opening a pull request that adds your name to `bok/CONTRIBUTORS.md`
  (SIGNATORIES section) in the repository, `github.com/losanchos5/aige`.
- **Contribute a chapter or a pattern** following `STYLEGUIDE.md`; every factual claim needs a
  sourced, verified citation.
- **Discuss it** on LinkedIn with Jorge García Aibar (https://www.linkedin.com/in/jorgara), naming
  the discipline, not the person.

## Licence

This Thesis is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
credit, link to the licence and indicate changes. Attribution: Jorge García Aibar and Aurélie Pols.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] AI Governance Profession Report 2025. IAPP (with Credo AI). 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[4] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[5] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027". Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[6] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[7] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; runtime data path critique). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[8] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[9] "AI Governance Engineering" (governing AI used inside engineering workflows). Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
