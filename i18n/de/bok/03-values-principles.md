---
lang: de
source: bok/03-values-principles.md
sourceHash: "92d0c8a26a210d3b43d6f5a17ec0327d94ea1204a4b6e3b8a92ddb03e15e6dab"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 03. Werte und Prinzipien

> Die acht Werte und sechs Prinzipien der These, jeweils erweitert um ihre praktische Bedeutung und
> das Anti-Pattern, das sie ablehnen.

Die These gibt acht Werte und sechs Prinzipien in je einem Satz an. Dieses Kapitel erweitert sie.
Die beiden sind absichtlich verschiedene Arten von Dingen, und der Unterschied ist das, was sie
davor bewahrt, die gleiche Liste zweimal erzählt zu werden. Ein **Wert** ist eine Vorliebe: ein
Trade-off, wohin wir uns lehnen, wenn wir nicht beides haben können; er wird als Bejahung
ausgedrückt, und das Benennen dessen, was wir *bauen hin zu* benennt auch, was wir *bauen weg von*.
Ein **Prinzip** ist eine Verpflichtung zu *handeln*: eine Arbeitsmethode-Regel, ausgedrückt als
etwas, das wir tun, das unabhängig von Vorliebe gilt. Lesen Sie die Werte, um zu wissen, in welche
Richtung Sie sich lehnen; lesen Sie die Prinzipien, um zu wissen, was Sie am Montag tun.

Nicht alle Werte sind neu für KI. Governance as Code (1), maschinenlesbare Evidenz (5) und gemessene
Risikominderung (7) werden von GRC-Engineering, der Muttersdisziplin, geerbt. Evals, die den Build
fehlschlagen (2), und Agent-Identität und Scope (4) sind das, was KI uns hinzuzufügen zwingt; das
Modell, das getestet werden muss, und der autonome Akteur, der begrenzt werden muss, haben kein
Analogon in klassischem GRC.

Dies sind die eigenen Werte und Prinzipien des Buches. Die von anderen veröffentlichten Prinzipsätze
werden anderswo behandelt: Kapitel 11 verfolgt
[die veröffentlichten Responsible-AI-Prinzipsätze zu Artefakten](/bok/ai-defined#responsible-ai-principle-sets-engineered),
und Kapitel 22 hat die
[OECD-AI-Prinzipien zum Stack zugeordnet](/bok/principles-and-standards#the-five-principles-and-five-recommendations).

---

## Die acht Werte

Jeder Wert wird als Bejahung ausgedrückt: was wir bauen hin zu, das durch seine Benennung auch
benennt, was wir bauen weg von. Die Werte-und-Prinzipien-Form folgt dem GRC Engineering Manifesto,
das der Vorläufer dieses Buches ist [1].

### 1. Governance ist Code, kein Dokument

Eine Policy in einem PDF ist eine Absichtserklärung, die ein Mensch lesen, sich merken und anwenden
muss. Eine Policy as Code ist eine Kontrolle, die ausführt: Sie bewertet einen Pull Request, eine
Bereitstellung oder einen Runtime-Aufruf und gibt eine Entscheidung zurück. Das Dokument beschreibt
die Regel; der Code *ist* die Regel, versioniert in einem Repository, getestet und durchgesetzt,
ohne dass irgendjemand sich daran erinnern muss. Wenn sich die Regel ändert, ändern Sie ein Artefakt
und jeder Durchsetzungspunkt aktualisiert sich. Wenn ein Auditor fragt, was die Policy an einem
bestimmten Datum war, zeigen Sie den Commit.

Das ist nicht „alle Dokumente löschen.

> **In der Praxis** Eine als `OPA/Rego` geschriebene Datenresidenz-Regel blockiert jede
> Bereitstellung, die Inferenzen außerhalb der zulässigen Region leiten würde, in CI und bei der
> Zulassung. Dieselbe Regel als PDF wurde vierteljährlich „mitgeteilt
> **Anti-Pattern** Die „Policy-Bibliothek

### 2. Evals lassen Builds fehlschlagen; Reviews empfehlen nur

Ein Review erzeugt eine Empfehlung; jemand kann später darauf reagieren oder nicht. Ein Eval erzeugt
ein Urteil mit Konsequenzen: das Modell oder der Agent hat einen definierten Test bestanden oder
nicht bestanden, und ein Fehler blockiert die Freigabe. In KI-Systemen ist die ehrlichste Kontrolle
ein Test, den das System bestehen muss, automatisch ausgeführt, dessen Ergebnis ändert, was als
nächstes passiert. Wir bevorzugen Kontrollen, die wirken.

Ein Review hat immer noch seinen Platz: für Fragen, die kein Test klären kann. Aber wenn eine
Eigenschaft *getestet* werden kann (ein Jailbreak-Resistenzschwellenwert, eine PII-Leckagegrenze,
eine Tool-Scope-Prüfung), ist die Umwandlung in ein Review statt in ein Eval-Gate eine Wahl, um
empfehlen zu können, aber nicht zu stoppen.

> **In der Praxis** Eine Red-Team-Eval-Suite (Inspect, Garak) läuft in CI; wenn die
> Injektionsresistenz unter den vereinbarten Schwellenwert fällt, schlägt die Pipeline fehl und die
> Freigabe wird nicht ausgeliefert, bis sie behoben ist.
> **Anti-Pattern** Ein „Model Risk Review Board

### 3. Nachweise stammen aus der Laufzeit, nicht aus einer Momentaufnahme-Attestation

Eine Attestation besagt, dass eine Kontrolle vorhanden war, als jemand nachschaute.
Laufzeitnachweise zeigen die Kontrolle kontinuierlich funktionierend, vom System selbst. KI-Systeme
ändern sich zwischen Reviews (ein Modell wird umtrainiert, ein Agent erhält ein Tool), daher
verfallen Nachweise, die einmal gesammelt wurden, sofort. Wir bevorzugen Nachweise, die während der
Systemausführung ausgegeben werden, sodass „funktioniert die Kontrolle?

> **In der Praxis** Guardrail-Entscheidungen, Eval-Ergebnisse und Policy-Urteile fließen mit
> Zeitstempeln in einen Assurance-Speicher; der Status der Kontrolle ist eine Live-Abfrage, keine
> jährliche Unterzeichnung.
> **Anti-Pattern** Ein SOC-ähnlicher Attestations-Ordner, der die Woche vor einer Prüfung
> zusammengestellt wurde, beschreibt Kontrollen, wie sie sich vorgestellt wurden, nicht wie die
> Produktion tatsächlich funktionierte.

### 4. Jeder Agent trägt seine eigene Identität und seinen eigenen Umfang

Ein Agent, der auf einem gemeinsamen Service-Konto oder einem statischen Schlüssel handelt, ist
ungovernable: Sie können seine Aktionen nicht zuordnen, seinen Zugriff nicht präzise widerrufen oder
begrenzen, was er tun darf. Wir bevorzugen, dass jeder nicht-menschliche Akteur seine eigene
Identität, einen Besitzer und einen Umfang zulässiger Aktionen hat, die *vor* dem Handeln etabliert
werden. Identität ist die Voraussetzung für Rechenschaftspflicht; Umfang ist die Voraussetzung für
Eindämmung. Kapitel 23 baut beide für Agenten auf, beginnend mit
[Identität und kurzlebigen Anmeldedaten](/bok/governing-agents#identity-and-short-lived-credentials).

> **In der Praxis** Jedem Agent wird eine unterschiedliche Workload-Identität zugewiesen,
> registriert mit einem Besitzer und einem deklarierten Umfang; ein fehlerhafter Agent wird auf
> seine Identität zurückgeführt und sein Zugriff wird widerrufen, ohne die anderen zu beeinflussen.
> **Anti-Pattern** Eine Flotte von Agenten, die einen API-Schlüssel und ein privilegiertes
> Service-Konto teilen, wobei ein Incident bedeutet, einen Schlüssel zu rotieren und alles zu
> unterbrechen, und die Zuordnung unmöglich ist.

### 5. Nachweise sind maschinenlesbar oder sie sind keine Nachweise

Nachweise, die ein Mensch von Hand produzieren, formatieren und einreichen muss, skalieren nicht und
können nicht mit Geschwindigkeit überprüft werden. Maschinenlesbare Nachweise (`OSCAL`,
strukturierte Eval-Ergebnisse, signierte Protokolle) können abgefragt, verglichen, aggregiert und
automatisch überprüft werden. Wir bevorzugen Nachweise, die eine Maschine lesen kann, weil die
Prüfung dann zu einer Abfrage wird und dieselben Nachweise kontinuierliche Assurance speisen,
anstatt einen einmaligen Ordner.

> **In der Praxis** Kontrollergebnisse werden als `OSCAL` Komponenten- und Bewertungsartefakte
> ausgegeben; eine Frage eines Auditors wird beantwortet, indem eine Abfrage gegen den
> Nachweisspeicher ausgeführt wird.
> **Anti-Pattern** Ein gemeinsames Laufwerk mit Screenshots und exportierten Tabellenkalkulationen,
> für jede Prüfung von Grund auf neu gesammelt, nicht überprüfbar und veraltet, sobald es
> gespeichert wird.

### 6. Tooling muss inspizierbar und zusammensetzbar sein

Es geht nicht darum, wer das Tool gebaut hat oder ob es Open Source ist; es geht darum, ob Sie
hineinschauen können. Sie können einem Urteil nicht trauen, das Sie nicht nachvollziehen können.
Inspektierbare Tools lassen Sie eine Entscheidung bis zu der Regel verfolgen, die sie erzeugt hat,
der Eingabe, die sie sah, und der Evidenz, die sie emittierte; zusammensetzbare Tools lassen Sie
diese Entscheidung in Ihre eigene Pipeline verdrahten, statt in die eines anderen zu exportieren.
Wir bevorzugen Tools, deren Begründung und Datenpfad wir öffnen können, gekauft oder gebaut, denn
Governance, die Sie nicht von innen sehen können, ist eine Kontrolle, der Sie nicht trauen können.
Ein Vergleich eines Anbieters der KI-Governance-Plattform-Kategorie, veröffentlicht von einem
Konkurrenten darin, stellt fest, dass die meisten der Kategorie "das Programm (Inventare,
Bewertungen, Framework-Zuordnungen, Evidenz-Workflows) ohne einen Runtime-Datenpfad verwalten" [3];
wo das zutrifft, ist der Einwand nicht, dass das Tool kommerziell ist, sondern dass sein Urteil
nicht überprüft werden kann.

Dies ist eine Neigung, keine absolute. Geschlossene und kommerzielle Tools haben einen Platz,
einschließlich leistungsstarker Plattformen. Aber der Standard ist Tooling, das das Team inspizieren
und zusammensetzen kann, über eine Black Box, der das Team vertrauen muss.

> **In der Praxis** Das Eval-Harness, die Policy-Bibliothek und das Register zeigen, wie ein Urteil
> erreicht wird (die Regel, die Eingabe und der ausgegebene Nachweis) und setzen sich in die
> Pipeline zusammen, die das Team bereits ausführt, unabhängig davon, ob die Komponenten Open Source
> oder eine Plattform mit einem offenen Datenpfad sind.
> **Anti-Pattern** Eine sechsstellige Governance-Plattform, deren „Compliance-Score

### 7. Der Erfolg wird an realisierter Risikominderung gemessen, nicht an Framework-Abdeckung

Jede Kontrolle auf NIST AI RMF und ISO 42001 abzubilden, beweist, dass Sie die Frameworks gelesen
haben; es beweist nicht, dass ein Risiko gefallen ist. Wir bevorzugen, das Ding selbst zu messen:
Ist die Rate des Fehlermodus gefallen, ist der Blast-Radius geschrumpft, wurde der Incident früher
gefangen? Abdeckung ist ein Input; realisierte Risikominderung ist das Ergebnis. Eine grüne
Mapping-Matrix über einer defekten Kontrolle ist Theater mit zusätzlichen Schritten [2].

> **In der Praxis** Jede Kontrolle erklärt den Fehlermodus, den sie adressiert, und eine Metrik
> dafür (Injektionserfolgsrate, Zeit bis zur Erkennung, nicht autorisierte Tool-Aufrufe blockiert);
> die Kontrolle wird nach der Metrik beurteilt, die sich bewegt, nicht nach der Framework-Zelle, die
> grün wird.
> **Anti-Pattern** Eine 300-Zeilen-Rückverfolgungsmatrix, die Kontrollen auf fünf Frameworks
> abbildet, präsentiert als Reife, ohne Messung, ob eine der abgebildeten Kontrollen tatsächlich das
> Risiko reduziert.

### 8. Governance wird mit Engineering besessen, nicht von außen durchgesetzt

Governance, die abseits sitzt und Passage gewährt oder verweigert, ist ein Engpass, den Ingenieure
umgehen. Governance, die gemeinsam mit Engineering besessen ist, in den gepflasterten Weg eingebaut,
adoptiert, weil es der einfachste Weg ist zu versenden, wird Teil davon, wie Dinge gemacht werden.
Wir bevorzugen gemeinsame Besitzverhältnisse: die Governance-Funktion baut das Tooling, Engineering
baut darauf auf, und das Gate ist eine Stufe in einer Pipeline, die beide besitzen, nicht ein
Treffen, das eine Seite fürchtet. Kapitel 12 beschreibt die
[Governance-Kultur](/bok/governance-program#governance-culture), auf die gemeinsame
Besitzverhältnisse angewiesen sind.

> **In der Praxis** Das Eval-Gate und die Policy-Checks werden als Teil der
> Standard-Pipeline-Vorlage ausgeliefert; Ingenieure adoptieren sie, weil der gepflasterte Weg auch
> der schnellste Weg ist, und Governance co-wartet sie.
> **Anti-Pattern** Ein Governance-Team, das Freigaben von außen überprüft und unterzeichnet,
> gemessen daran, wie viele es stoppt, während Engineering einen Shadow-Prozess baut, um es zu
> vermeiden.

**Wir verwenden immer noch die Praktiken, die jeder Wert aufbaut; wir bauen auf die Bestätigung hin.**

---

## Die sechs Prinzipien

### Bauen Sie die Kontrolle am frühesten Punkt auf, an dem sie blockieren kann

Setzen Sie jede Kontrolle dort, wo sie immer noch das Falschgehen stoppen kann, und nicht später.
Der früheste Punkt, an dem ein Risiko gefangen werden kann, ist der billigste zu beheben und der
stärkste Ort zum Durchsetzen: es im Repository zu fangen schlägt es in der Produktion zu fangen, was
erklärt es einem Regulator zu schlagen. Also sitzt eine Kontrolle am ersten Gate, das die Änderung
verweigern kann: eine Policy in CI, ein Eval vor dem Deploy, eine Identitätsprüfung bei der
Zulassung, ein Guardrail am Punkt der Aktion. Die Verpflichtung ist über *Platzierung*: was auch
immer die Kontrolle, sie gehört zum frühesten durchsetzbaren Punkt, nicht am Ende angebracht.

> **In der Praxis** Ein neuer Agent kann nicht bereitgestellt werden, bis er einen Besitzer und
> einen Umfang registriert hat und sein Eval-Gate bestanden hat; die Pipeline erzwingt dies am
> frühesten Gate, das es verweigern kann, nicht eine Person am Ende.
> **Anti-Pattern** Eine Vor-Launch-„Governance-Überprüfung

### Geben Sie jeder Kontrolle Zähne

Eine Kontrolle muss in der Lage sein, zu ändern, was als nächstes passiert: einen Merge blockieren,
ein Deploy fehlschlagen lassen, Zugriff widerrufen. Alles, das nur ein Komitee informieren kann, ist
ein *Signal*, und wir sagen das, anstatt es als Kontrolle zu verkleiden. Dies ist die Verpflichtung,
die ein Eval von Forschung in ein Gate verwandelt, eine Policy von einem PDF in eine Prüfung, einen
Schwellenwert von einer Dashboard-Nummer in einen Release-Blocker. Wenn eine Eigenschaft getestet
werden kann, ist die Umwandlung in ein Review statt in ein Gate eine Wahl, um empfehlen zu können,
aber nicht zu stoppen, und wir treffen diese Wahl bewusst oder gar nicht.

Die Zähne sind nicht das ganze Tier. Ein Gate, das den Build fehlschlagen lassen kann, ist notwendig
und nicht ausreichend: ein Eval ist Punkt-in-Zeit und Sampling-gebunden, es kann durch Tuning des
Modells auf die Suite oder des Schwellenwerts auf das Modell gespielt werden, und es fängt
Regressionen gegen bekannte Fälle, nicht den neuartigen Angriff, den die Suite sich nie vorgestellt
hat. Also trägt eine Kontrolle mit Zähnen ihre eigenen Verpflichtungen (ihre Abdeckung gemessen,
ihre Fälle adversarisch gepflegt, ihre Schwellenwerte zu benannten Fehlermodi nachverfolgbar), und
ein bestandenes Gate *verpflichtet* die Laufzeitüberwachung von Schicht 04, es ersetzt sie nicht.
Ein grünes Gate, das als Sicherheitsbeweis behandelt wird, ist Framework-Theater mit einer
schnelleren Pipeline.

> **In der Praxis** Fähigkeits- und adversarische Evals werden zusammen mit dem Modell versioniert;
> das Deploy hängt davon ab, dass der Eval-Job besteht, seine Abdeckung wird als seine eigene Metrik
> verfolgt, und ein Laufzeit-Guardrail trägt denselben Schwellenwert in die Produktion gegen die
> Eingaben, die kein Eval sampled.
> **Anti-Pattern** Eine einmalige Modellbewertung vor dem Launch, ihre Ergebnisse in eine Folie
> eingefügt, nie erneut ausgeführt, wenn sich das Modell oder seine Prompts ändern; oder ein Gate,
> dessen Schwellenwert leise gesenkt wird, bis der Build grün wird.

### Registrieren und begrenzen Sie jeden Akteur, bevor er handelt

Nichts, weder Mensch noch Nicht-Mensch, darf handeln, bis es einen Eigentümer hat, einen erklärten
Umfang und eine Möglichkeit, gestoppt zu werden. Autonomie auf gemeinsamen Anmeldedaten ist
konstruktionsbedingt nicht zu regieren: Man kann nicht zuordnen, einschränken oder widerrufen, was
man nicht auf einen Akteur zurückführen kann. Daher ist die Registrierung eine Vorbedingung, keine
Nachbearbeitung: Jeder Akteur wird registriert, begrenzt und erhält einen Kill Switch, *bevor* er
etwas in Eigenregie tut. Autonomie wird durch Regierbarkeit verdient, nicht standardmäßig gewährt.

> **In der Praxis** Das Agentenregister ist das Gate: Ein Agent ohne Eigentümer, ohne Umfang oder
> ohne Kill Switch erhält keine Workload-Identität und kann die Produktion nicht erreichen.
> **Anti-Pattern** Agenten, die ad hoc auf einem gemeinsamen Schlüssel gestartet werden, werden erst
> nach einer Aktion entdeckt, die niemand erklären oder rückgängig machen kann.

### Den Build so instrumentieren, dass er seinen eigenen Nachweis erbringt

Verbinden Sie jede Kontrolle so, dass sie während der Ausführung ihren eigenen Datensatz ausgibt,
damit die Assurance aus dem System herausfällt, anstatt vor einer Prüfung von Hand zusammengestellt
zu werden. Wenn der Nachweis einer Kontrolle einen Screenshot erfordert, haben wir sie nicht fertig
gebaut. Das Engagement gilt der Instrumentierung: Jedes Gate, jeder Guardrail und jede Prüfung
schreibt einen strukturierten, signierten Datensatz, wenn er ausgelöst wird, sodass die Prüfung eine
Abfrage ist und dieselben Datensätze kontinuierliche Assurance und Incident Response antreiben
(Kapitel 17 spezifiziert [den Incident-Datensatz](/bok/incidents#the-incident-record)).

> **In der Praxis** Jedes Gate und jeder Guardrail schreibt einen strukturierten, signierten
> Datensatz; der Audit-Trail erstellt sich selbst, und der Evidence Store beantwortet sowohl die
> Fragen des Auditors als auch des On-Call-Ingenieurs.
> **Anti-Pattern** Ein Evidence-Collection-Sprint vor jeder Prüfung, um nachträglich einen Datensatz
> zu rekonstruieren, den die Systeme nie wirklich produziert haben.

### Von einem benannten Fehlermodus oder einem benannten Schaden ausgehen

Entwerfen Sie jede Kontrolle gegen eine spezifische Art, wie das System ausfällt, oder einen
spezifischen Schaden, den es einer Person zufügen kann, und beginnen Sie dort, nicht mit einer
Framework-Checkliste. Threat Models (Prompt-Injection, Tool-Missbrauch, Agent-Identity-Missbrauch,
Datenexfiltration) und
[Grundrechte-Folgenabschätzungen](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27)
sind die Eingaben für den Entwurf, nicht danach erstellte Unterlagen. Wenn wir das Risiko, das eine
Kontrolle beantwortet, nicht benennen können, bauen wir sie nicht. Kapitel 13 zeigt, wie man
[Risikoquellen, Faktoren und Stakeholder identifiziert](/bok/risk-management#identifying-risk-sources-factors-and-stakeholders),
und der [Harms Atlas](/resources/harms) listet Schäden nach Ebene auf, jeweils mit der Kontrolle,
die sie erfasst.

> **In der Praxis** Der Entwurf des Agenten beginnt mit seinem OWASP Agentic Threat Model [4] und
> seiner FRIA; die Kontrollen, die ausgeliefert werden, sind genau die, die diese beiden Dokumente
> gefordert haben, und sie werden auf sie zurückgeführt.
> **Anti-Pattern** Ein Kontrollkatalog, der aus einer Framework-Checkliste zusammengestellt wurde
> und Risiken adressiert, die das System nicht hat, während der Injektionspfad übersehen wird, den
> ein Angreifer tatsächlich nutzt.

### Den geregelten Weg zum einfachsten Weg machen

Liefern Sie Governance als Werkzeuge, Vorlagen und gepflasterte Wege, die Ingenieure ohne
Genehmigung annehmen (eine Policy-Bibliothek, ein Register mit einer API, ein Gate, das sie lokal
ausführen können, bevor sie pushen), und messen Sie die Akzeptanz. Die geregelten Personen sind
unsere Benutzer; der gepflasterte Weg muss der schnellste Weg sein, oder er wird umgangen. Wenn die
Governance schwieriger ist als sie zu vermeiden, ist die Governance falsch gestaltet, und wir
beheben das Produkt, nicht die Menschen.

> **In der Praxis** Ein Ingenieur erstellt ein neues KI-Service aus einer Vorlage, die bereits den
> Registry-Hook, die Policy-Checks und das Eval Gate enthält; Compliance ist der Standard, nicht
> eine Anfrage.
> **Anti-Pattern** Ein Governance-Intranet aus Formularen und Ticket-Warteschlangen, bei dem das
> Richtige eine Woche und ein Treffen dauert, sodass Teams stattdessen leise das Schnelle tun.

**Zuordnung:** Die Werte und Prinzipien werden durch den fünfschichtigen Stack (Kapitel 04) und den
Pattern-Katalog (Kapitel 05) realisiert; die Fehlermodi, auf die sie abzielen, sind OWASP Top 10 for
Agentic Applications; die Assurance, die sie fordern, wird auf ISO/IEC 42001, NIST AI RMF und EU AI
Act Art. 9, 15, 55 und 72 abgebildet. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] GRC Engineering Manifesto (values and principles precedent). grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[4] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
