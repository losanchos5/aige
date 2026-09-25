---
lang: de
source: bok/23-governing-agents.md
sourceHash: "68496168af91fdc6ea15449a06098053248d0f6b2e38249b40eb5ca4c2606e28"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 23. Governance von KI-Agenten

> Ein KI-Agent wird regiert, wenn jede Aktion auf eine registrierte Identität, einen Umfang, den
> jemand genehmigt hat, einen Checkpoint, der dort auslöste, wo die Einsätze es erforderten, und
> einen getesteten Weg, ihn zu stoppen, zurückgeht.

Kapitel 05 trägt vier Agent-Muster: das [Agentenregister](/patterns/agent-registry),
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials), den
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) und das
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
[Schicht 04 des Stack](/bok/the-stack#layer-04-runtime-controls--observability) sagt, was
Runtime-Kontrolle beweisen muss, und die [Regulatory Map](/bok/regulatory-map#china) stellt die
Agent-Kontrollen von drei Frameworks nebeneinander. Keines sagt an einer Stelle, was einen Agent
anders zu regieren macht, wie die Kontrollen eine Kontrollebene bilden, oder wo jede Kontrolle das
Gesetz trifft. Dieses Kapitel tut es.

Ein Kontrast zuerst. **KI-Sicherheitstechnik**, die Schwesterndisziplin, fragt, wie ein Angreifer
einen Agent Schaden verursachen lassen kann, und sie besitzt das
[Threat Model](/patterns/ai-threat-model). KI-Governance-Engineering stellt eine breitere Frage:
unter wessen Autorität handelte der Agent, innerhalb welcher Grenze, mit welchem Nachweis, und wer
hätte ihn stoppen können. Die beiden teilen die meisten Kontrollen. Sie unterscheiden sich darin,
was als erledigt zählt: für Sicherheit ist ein blockierter Angriff erledigt; für Governance ist es
erledigt, wenn der Block, die Autorität hinter der Aktion und die Genehmigung im Datensatz sind.

Die OWASP-Agentenliste gibt das erste Prinzip an, **minimale Agentur**: ihr Rat ist, "unnötige
Autonomie zu vermeiden", weil agentenartiges Verhalten, das dort eingesetzt wird, wo es nicht nötig
ist, "die Angriffsfläche erweitert, ohne Wert hinzuzufügen" [1]. Die billigste Agent-Kontrolle ist
der Agent, den du nicht gebaut hast: ein fester Workflow mit einem Modellaufruf ist leichter zu
regieren als ein Planer, der seine eigenen Tools wählt. Kapitel 15 behandelt
[den agentenartigen Wrapper als Bereitstellungsoption](/bok/governing-deployment#how-it-is-adapted),
mit den Kontrollen, die er zusätzlich zu dem Modell, das er umhüllt, hinzufügt.

## Was macht einen Agent zu einem Governance-Objekt

Ein Agent ist ein KI-System, das ein Ziel verfolgt, indem es Aktionen wählt und ergreift: er plant,
ruft Tools auf, liest und schreibt Speicher und kann Arbeit an andere Agenten übergeben. Kapitel 11
platziert ihn unter [den Arten von KI](/bok/ai-defined#agentic-systems), die eine Registry
auseinanderhalten muss. Vier Eigenschaften sind für Governance wichtig, und jede bricht eine
Annahme, auf die sich die Modell-Governance verlässt.

| Eigenschaft | Was sich ändert | Governance-Frage | Erste Kontrolle |
|---|---|---|---|
| **Delegierte Autorität** | Der Agent handelt im Namen von jemandem, mit seinen Genehmigungen oder seinen eigenen | Wessen Autorität wurde verwendet, und war sie enger als ihre? | Workload-Identität; Delegationsdatensatz |
| **Tools** | Ausgabe wird zu einem Effekt in einem System of Record, nicht zu Text, den eine Person liest | Welche Aktionen kann es ergreifen, auf welchen Ressourcen? | Tool-Allowlist; scoped credentials |
| **Speicher** | Der Zustand bleibt über Sitzungen, Benutzer und Aufgaben hinweg bestehen | Was merkt es sich, wie lange, und wer kann es schreiben? | Speicherbereiche; Aufbewahrung; Schreib-Provenance |
| **Autonomie** | Schritte geschehen ohne Person dazwischen | Wo muss eine Person entscheiden, und kann sie es stoppen? | Checkpoints; kill switch |

Das Evidenzmodell ändert sich damit. Ein Modell wird auf seine Ausgaben bewertet; ein Agent muss
auch auf seine **Trajektorie** bewertet werden, die Abfolge von Plänen, Tool-Aufrufen und
Speicheroperationen, die zu einem Effekt führten. Eine Eval, die die endgültige Antwort bewertet und
den Weg ignoriert, wird einen Agent bestehen, der das richtige Ergebnis durch ein Tool erreichte,
das er nie halten sollte.

### Autonomie ist eine Designentscheidung

Autonomie ist eine Einstellung, die der Betreiber wählt, nicht eine Eigenschaft des Modells. Wie
Feng, McDonald und Zhang es ausdrücken, "Das Autonomieniveau eines Agenten kann als bewusste
Designentscheidung behandelt werden, getrennt von seiner Fähigkeit und operativen Umgebung" [2]. Sie
definieren fünf Ebenen nach der Rolle, die der Benutzer spielt: Operator, Mitarbeiter, Berater,
Genehmiger und Beobachter.
[Singapurs Model AI Governance Framework for Agentic AI](/bok/ai-laws-worldwide#singapore-model-frameworks-and-ai-verify)
beschreibt vier Ebenen der menschlichen Beteiligung, von "Agent schlägt vor, Mensch bedient" bis
"Agent bedient, Mensch beobachtet", und zitiert dieselbe Arbeit [3]. Das Agentic Trust Framework der
Cloud Security Alliance benennt vier Stufen, von Intern (schreibgeschützt) bis Principal (autonom
innerhalb von Grenzen), und macht Beförderung verdient: "anhaltende Genauigkeit, ein sauberer
Vorfallverlauf, eine bestandene Sicherheitsprüfung und explizite Governance-Genehmigung" [4].

Die KI-Verordnung der EU fordert dieselbe Verhältnismäßigkeit: Überwachungsmaßnahmen für ein
Hochrisiko-KI-System müssen seinen Risiken, seinem Autonomiegrad und seinem Nutzungskontext
entsprechen (`Art. 14(3)`) [5]. Die Tabelle ordnet die drei Skalen und gibt jeder Stufe einen
Mindestsatz von Kontrollen. Die Ordnung und die Kontrollsätze sind die Lesart dieses Buches, nicht
die der Autoren.

| Rolle des Benutzers [2] | Nächste IMDA-Stufe [3] | Nächste ATF-Ebene [4] | Was die Person tut | Mindestkontrollen |
|---|---|---|---|---|
| **Akteur** | Agent schlägt vor, Mensch handelt | Praktikant | Führt jede Aktion aus | Registereintrag; eigene Identität; schreibgeschützte Tools; Nachverfolgung |
| **Mitarbeiter** | Agent und Mensch arbeiten zusammen | Junior | Genehmigt bedeutende Schritte | Das Obige plus eine Tool-Zulassungsliste und ein Checkpoint vor jedem Schreibzugriff |
| **Berater** | Dazwischen | Junior bis Senior | Setzt Ziele, gibt Rückmeldung | Das Obige plus ein Runtime-Guardrail bei jedem Tool-Aufruf und Ausführungsbudgets |
| **Genehmiger** | Agent handelt, Mensch genehmigt | Senior | Genehmigt kritische oder irreversible Schritte | Das Obige plus ein Genehmigungsprotokoll, einen Pro-Agent-Schalter und einen trainierten Kill Switch |
| **Beobachter** | Agent handelt, Mensch beobachtet | Principal | Prüft im Nachhinein | Das Obige plus Anomalieerkennung in der Trajektorie und unabhängige Trajektorie-Evals; nur reversible, begrenzte Aktionen |

Erfassen Sie die Stufe als Registerfeld (Kapitel 11 gibt
[eine illustrative Autonomieskala](/bok/ai-defined#from-definition-element-to-registry-field) dafür
an) und behandeln Sie eine Erhöhung als eine Änderung, die dieselbe Überprüfung wie eine neue
Bereitstellung benötigt. Eine Beförderung ist eine Entscheidung mit Belegen dahinter, nicht ein
Flag, das jemand umgelegt hat.

## Das Agentenregister

Das [Agentenregister](/patterns/agent-registry)-Muster macht die Registrierung zur Voraussetzung für
die Produktion: Eigentümer, Umfang und Ablauf, geschrieben von der Pipeline. Ein Agenteneintrag muss
mehr enthalten. Singapurs Rahmen fordert, dass Agentidentitäten "katalogisiert und zentral
verwaltet" werden, ausgestellt von und verfolgt durch ein zentrales System "um Agentenspreizung zu
verhindern" [3]; TC260s Agentur-Anhang fordert eine eindeutige Identität pro Agent und
Berechtigungssatz nach Entscheidungsmodus [6].

| Feld | Warum es dort ist | Beweis, den es ermöglicht |
|---|---|---|
| **Identität** (zum Beispiel eine SPIFFE-ID) | Zuordnung | Jede Protokollzeile verbindet sich mit einem Eintrag |
| **Eigentümer** (Team und verantwortliche Person) | Rechenschaftspflicht | Eine Eskalationsroute, die existiert |
| **Zweck** | Umfangsprüfung; rechtliche Klassifizierung | Erkennung von Nutzung außerhalb des Zwecks |
| **Autonomiestufe** | Verhältnismäßige Kontrollen | Beförderungsverlauf |
| **Tools und Umfänge** | Die erzwungene Zulassungsliste | Guardrail-Konfigurationsdiffs |
| **Datenklassen und Speicher** | Datenschutz und Aufbewahrung | DSFA- und Verarbeitungstätigkeitsregister-Links |
| **Delegationsrechte** | Grenzen zwischen Agenten | Delegationsrichtlinie |
| **Versionen** (Modell, Prompts, Richtlinien-Bundle) | Änderungskontrolle | Wiedergabe der exakten Konfiguration in einem Incident |
| **Checkpoints** | Überwachungsdesign | Genehmigungsprotokoll |
| **Stop-Griffe** (Schalter, Widerrufsweg, letzte Übung) | Kill Switch | Übungsprotokoll |
| **Ablauf** | Kein Agent überlebt seine Überprüfung | Automatische Deaktivierung |
| **Regulatorische Rolle und Klasse** | Verpflichtungen | Verpflichtungskarte |

> **Beispiel (illustrativ)** Ein Registereintrag für einen Rückerstattungsagenten, geschrieben von
> der Deploy-Pipeline. Der Versionsblock ist das, was einen Incident wiederholbar macht; der
> Stop-Block ist das, was den Kill Switch zu mehr als einer Behauptung macht.

```yaml
# agent-registry entry (illustrative)
id: refunds-agent
identity: spiffe://corp.example/agents/refunds-agent
owner: { team: support-platform, accountable: head-of-support-operations }
purpose: Draft and execute refunds for orders under the published returns policy
autonomy_level: approver
tools:
  - { name: orders.read, scopes: [orders:read] }
  - { name: refunds.create, scopes: [refunds:write], checkpoint: "amount_eur > 200" }
delegation: { may_call: [fraud-check-agent], may_be_called_by: [support-orchestrator] }
memory: { session: true, long_term: none }
versions: { model: vendor-model@2026-08-15, system_prompt: "sha256:9f2c...e41", policy_bundle: v14 }
budgets: { tool_calls_per_task: 25, spend_eur_per_day: 5000 }
stop: { breaker: cb-refunds-01, revoke: identity, last_drill: 2026-09-10 }
ai_act: { role: deployer, class: not-high-risk }
expiry: 2026-12-17
```

Ein Register ist nur so gut wie das, was es übersieht. Das
[Shadow-AI Discovery](/patterns/shadow-ai-discovery)-Muster gleicht es mit dem ab, was läuft:
SaaS-Konnektoren, Coding-Agenten auf Laptops und lokale MCP-Server, die mit denselben Berechtigungen
laufen wie der Client, der sie gestartet hat [7]. Ein von der Discovery gefundener Agent wird
entweder innerhalb einer Frist registriert oder ausgeschaltet.

> **In der Praxis (illustrativ)**
> Bei einem großen Telekommunikationsunternehmen fand der erste Discovery-Sweep mehr Agenten auf
> Entwickler-Laptops als in der Produktionsregistrierung: Coding-Assistenten mit lokalen
> MCP-Servern, die persönliche Zugriffstokens hielten, einige mit Schreibzugriff auf gemeinsame
> Repositories. Die Lösung war kein Verbot. Ein gepflasterter Weg gab jedem Entwickler-Agent eine
> kurzlebige, Repository-begrenzte Anmeldeinformation vom Produktionsidentitätssystem aus, und der
> Sweep wurde eine wöchentliche Abstimmung mit einem Eigentümer für jeden Fund.

## Identität und kurzlebige Anmeldeinformationen

### Kanalauthentifizierung ist keine Agentidentität

Die Kapitel 04 und 05 ziehen die Schlüssellinie. **Kanalauthentifizierung** sichert einen Hop, wie
einen Client, der mit einem MCP-Server spricht. **Agenten-Workload-Identität** ist die zurechenbare
Identität, die der Agent über jeden Hop hinweg trägt, unter der seine Aktionen protokolliert und
sein Zugriff widerrufen werden. Singapurs Rahmen listet auf, was diese Identität sein muss:
eindeutig und "kryptographisch verifizierbar"; "berücksichtigt", gebunden an einen beaufsichtigenden
Agenten, einen menschlichen Benutzer oder eine Organisationsabteilung; differenziert "nach der
Kapazität, in der er handelt", unabhängig oder im Namen eines benannten Benutzers; und zentral
katalogisiert [3]. NIST's NCCoE fragt, wie jeder Agent "bekannt, vertraut und ordnungsgemäß regiert"
sein kann [8].

### Kurzlebige, attestierte Anmeldeinformationen

SPIFFE definiert "kurzlebige kryptographische Identitätsdokumente", genannt SVIDs, bereitgestellt
durch eine Workload API, die sie auch rotiert; ein SVID ist derzeit entweder ein X.509-Zertifikat
oder ein JWT, und SPIRE ist die Referenzimplementierung [9]. Ein drittes Format, WIT-SVID, ein
SPIFFE-Profil des IETF WIMSE Workload Identity Token, wird noch ab 2026-09-24 inkubiert [30]. Der
Governance-Wert liegt in der Lebensdauer: Eine Anmeldeinformation, die in Minuten abläuft, muss nach
einem Incident nicht gejagt werden, nur nicht neu ausgestellt. Ein statischer API-Schlüssel in der
Konfiguration eines Agenten ist das Gegenteil, und Angreifer wissen, wo sie suchen müssen: MITRE
ATLAS katalogisiert "Credentials from AI Agent Configuration" (`AML.T0083`) [10]. TC260 fordert,
dass Anmeldeinformationen am Ende der Aufgabe widerrufen werden [6]. Singapur fordert, dass
Autorisierungen "zeitlich oder sitzungsgebunden, nicht übertragbar" sind, Least Privilege
standardmäßig und nie größer als das, was der autorisierte Mensch tun darf [3].

### Delegation ohne Identitätswechsel

Wenn ein Agent für einen Benutzer handelt, sind zwei Identitäten im Spiel, und das Protokoll muss
beide behalten. OAuth 2.0 Token Exchange (RFC 8693) trennt **Identitätswechsel**, bei dem der Akteur
vom Subjekt nicht zu unterscheiden ist, von **Delegation**, bei der beide identifizierbar bleiben.
Sein `act`}-Anspruch "bietet ein Mittel innerhalb eines JWT, um auszudrücken, dass eine Delegation
stattgefunden hat und den handelnden Akteur zu identifizieren", und verschachtelte {`act`}-Ansprüche
erfassen die früheren Akteure in der Kette [11]. Die Regel für Agenten folgt: Tauschen Sie das Token
des Benutzers gegen ein delegiertes aus, das den Agenten benennt, mit einem engeren Umfang und
kurzer Ablauf; geben Sie dem Agenten niemals das eigene Token des Benutzers.

> **Beispiel (illustrativ)** Die Ansprüche eines delegierten Zugriffstokens. Der Benutzer ist das
> Subjekt; der Rückerstattungsagent ist der aktuelle Akteur; der Orchestrator, der die Aufgabe an
> ihn delegiert hat, ist verschachtelt darin. Die Zielgruppe ist eine API und der Umfang eine
> Operation.

```json
{
  "sub": "user:4711",
  "aud": "https://refunds.api.example",
  "scope": "refunds:write",
  "exp": 1790330400,
  "act": {
    "sub": "spiffe://corp.example/agents/refunds-agent",
    "act": { "sub": "spiffe://corp.example/agents/support-orchestrator" }
  }
}
```

### MCP-Autorisierung ab 2026-07-28

Die Model Context Protocol-Spezifikation vom 2026-07-28 ist die aktuelle Version ab 2026-09-24.
Autorisierung ist optional in MCP; wo ein HTTP-Transport sie verwendet, fungiert der MCP-Server als
OAuth 2.1-Ressourcenserver [12]. Die Anforderungen, die für die Governance wichtig sind:

| Anforderung (Spezifikation 2026-07-28) | Was es verhindert | Nachweise zum Bewahrung |
|---|---|---|
| Server MÜSSEN OAuth 2.0 Protected Resource Metadata (RFC 9728) implementieren, und Clients MÜSSEN sie verwenden, um den Autorisierungsserver zu finden [12] | Clients, die erraten, woher Token kommen | Discovery-Konfiguration im Tool-Manifest |
| Clients und Autorisierungsserver SOLLTEN Client ID Metadata Documents unterstützen; Dynamic Client Registration ist veraltet [12][13] | Anonyme, nicht verwaltete Client-Registrierungen | Zulässige Client-Domänen als Richtlinie |
| Clients MÜSSEN den {`resource`}-Parameter (RFC 8707) mit der kanonischen URI des Servers senden {[12]} | Tokens, die bei jedem Server funktionieren | Token-Anfragen, die die Ressource benennen |
| Server MÜSSEN validieren, dass ein Token für sie ausgestellt wurde, und "DÜRFEN KEINE anderen Tokens akzeptieren oder weitergeben" [12] | Token-Durchleitung und der verwirrte Stellvertreter | Audience-Check-Fehler als Warnungen erhöht |
| Clients MÜSSEN den {`iss`}-Parameter (RFC 9207) validieren, bevor sie einen Code einlösen, und Client-Anmeldeinformationen sind an den Aussteller gebunden, der sie geprägt hat {[12][13]} | Autorisierungsserver-Mix-up | Der aufgezeichnete Aussteller pro Flow |
| Server SOLLTEN mit den Umfängen herausfordern, die eine Operation benötigt, und Clients treten für mehr auf {[12]} | Omnibus-Umfänge, die im Voraus gewährt werden | Erhöhungsereignisse mit Korrelations-IDs {[7]} |

Die begleitende Sicherheitsleitlinie ist deutlicher: Token-Durchleitung "ist ausdrücklich verboten",
und die Umfangsfehler, die sie auflistet, umfassen "Veröffentlichung aller möglichen Umfänge" und
"Verwendung von Wildcard- oder Omnibus-Umfängen" [7]. Die 2026-07-28-Version setzte auch eine
Deprecation-Richtlinie mit einem Mindesfenster von zwölf Monaten [13], daher ist die MCP-Version,
die jeder Server spricht, ein Registerfeld. Und die Client ID Metadata Document-Spezifikation ist
noch ein IETF Internet-Draft (Revision 02, 6. Juli 2026) [14].

Nichts davon identifiziert den Agenten. MCP sichert den Hop zwischen einem Client und einem Server.
Welcher Agent hinter dem Client sitzt und für wen, ist die Aufgabe der Workload-Identität.

## Tool- und MCP-Server-Berechtigungen

### Die Tool-Zulassungsliste

Ein Tool ist eine Fähigkeit, und die Zulassungsliste ist, wo Fähigkeiten gewährt werden. OWASPs Rat
unter `ASI02` ist, "Pro-Tool-Least-Privilege-Profile (Umfänge, maximale Rate und
Egress-Zulassungslisten) zu definieren" und sie "als IAM- oder Autorisierungsrichtlinien-Stanzas
auszudrücken, die an jedes Tool angehängt sind, anstatt sich auf Ad-hoc-Konventionen zu verlassen"
[1]. TC260 fordert, dass ein Agent nur die minimalen Berechtigungen erhält, die seine aktuelle
Aufgabe benötigt, und dass eine Operation standardmäßig verweigert wird, wenn das Genehmigungssystem
fehlschlägt, der Benutzer nicht antwortet oder keine Genehmigungsregel existiert [6]. Ein
Zulassungslisten-Eintrag hat mehr als einen Namen:

| Eigenschaft | Regel | Beispiel |
|---|---|---|
| **Tool-Identität** | Server, Tool-Name und ein Hash der Tool-Definition, angeheftet | `refunds.create` auf `payments-mcp`, Definition `sha256:…` |
| **Operationsklasse** | Lesen, Schreiben, Löschen, Senden, Ausführen oder Zahlen; die Klasse treibt Checkpoints | `refunds.create` ist Zahlen |
| **Ressourcenumfang** | Der engste Ressourcensatz, den die Aufgabe benötigt | Bestellungen des Kunden im aktuellen Fall |
| **Rate und Volumen** | Aufrufe pro Aufgabe und pro Stunde | 25 pro Aufgabe |
| **Egress** | Ziele, die das Tool erreichen darf | Nur interne Zahlungs-API |
| **Datenklassen** | Was ein- und ausfließen darf | Keine besonderen Kategorien von Daten zu externen Tools |
| **Checkpoint** | Wenn eine Person genehmigen muss | Betrag über 200 EUR |

Kein Werkzeug ist dem Namen nach harmlos. OWASPs Liste beschreibt einen Coding-Agenten, dessen
automatisch genehmigtes Ping-Tool wiederholt ausgelöst wurde, um Daten durch DNS-Abfragen zu
exfiltrieren [1]; ATLAS katalogisiert "Exfiltration via AI Agent Tool Invocation" (`AML.T0086`) und
"Data Destruction via AI Agent Tool Invocation" (`AML.T0101`) [10]. Rate- und Egress-Grenzen gelten
daher für jedes Werkzeug, auch für die, um die sich niemand Sorgen macht.

> **Beispiel (illustrativ)** Die Allow-List als Deny-by-Default-Richtlinie, die das Tool-Gateway bei
> jedem Aufruf evaluiert, liest die Registry als Daten. Die Rate-Prüfung wird aus Gründen der Kürze
> weggelassen.

```rego
package agents.tools

default allow := false

allow if {
  entry := data.registry[input.agent_id]
  some tool in entry.tools
  tool.name == input.tool.name
  tool.definition_hash == input.tool.definition_hash
  input.tool.scope in tool.scopes
}

needs_approval if {
  input.tool.operation in {"delete", "send", "pay", "execute"}
}
```

### Zulassung eines MCP-Servers

Ein MCP-Server ist ein Anbieter. OWASP unterscheidet zwei Fälle: ein Werkzeug, dessen Schnittstelle
zur Laufzeit manipuliert wird (Tool Poisoning, unter `ASI02`), und ein Werkzeug, das an der Quelle
bösartig oder kompromittiert ist (`ASI04`) [1]. ATLAS fügte "AI Agent Tool Poisoning" (`AML.T0110`)
für bösartige Inhalte oder Verhalten hinzu, die in die modellsichtbare Definition oder
Implementierung eines Werkzeugs eingeführt werden [10]. Eine Werkzeugbeschreibung ist eine
Anweisung, die das Modell liest, daher ist eine geänderte Beschreibung eine geänderte Anweisung.
Lassen Sie einen Server durch ein Gate zu:

1. **Herkunft.** Herausgeber, Quell-Repository und ein signiertes Release, aufgezeichnet in der
   [AIBOM](/patterns/aibom) jedes Agenten, der es nutzt.
2. **Definition Pinning.** Hash-Werkzeugnamen, Beschreibungen und Schemas bei der Zulassung; Warnung
   bei Änderung.
3. **Autorisierungskonformität.** MCP-Version, Metadaten geschützter Ressourcen,
   Audience-Validierung, kein Token-Passthrough.
4. **Sandboxing für lokale Server.** Die MCP-Anleitung erfordert, dass ein Client den genauen Befehl
   ohne Kürzung anzeigt und explizite Genehmigung erhält, bevor ein One-Click-Local-Server-Install
   durchgeführt wird, und empfiehlt, solche Server mit minimalen Berechtigungen in einer Sandbox
   auszuführen [7].
5. **Testen.** Vergiftete Deskriptoren und injizierte Werkzeugausgaben, vor jeder Allow-List.
6. **Ein Besitzer und ein Überprüfungsdatum**, wie bei jedem anderen Anbieter.

Das [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) deckt die
kommerzielle Seite ab: wer antwortet, wenn der Server sich falsch verhält, und welche Mitteilung Sie
erhalten, bevor er sich ändert.

## Menschliche Kontrollpunkte und Genehmigungsdesign

### Wo man einen Kontrollpunkt platziert

Das [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)-Muster besagt, dass nach Konsequenz
gated werden soll. Zwei Quellen machen "Konsequenz" konkret. Die Partnership on AI bewertet das
Agentenrisiko nach drei Faktoren: **Stakes** (der Schweregrad möglicher Folgen), **Reversibilität**
(ob ein Fehler rückgängig gemacht werden kann) und **Affordances** (unkontrollierte Werkzeugauswahl
und persistentes Gedächtnis führen zu komplexeren Fehlermodi als eingeschränkte Designs) [15].
Singapurs Rahmen listet vier Arten von Kontrollpunkten auf: hochriskante Maßnahmen und
Entscheidungen, irreversible Maßnahmen, atypisches oder ungewöhnliches Verhalten und
benutzerdefinierte Grenzen [3].

| Kontrollpunktklasse | Auslöser (Beispiele) | Wer genehmigt | Evidenz |
|---|---|---|---|
| **Hohes Risiko** | Eine endgültige Entscheidung über eine Person; eine Bearbeitung eines sensiblen Datensatzes | Eine benannte Rolle mit der Autorität zu verweigern | Genehmigungsdatensatz mit dem angezeigten Kontext |
| **Irreversibel** | Eine Zahlung, eine Löschung, eine externe Nachricht, eine Veröffentlichung | Der Geschäftsinhaber der Aktion | Genehmigung an die genauen Parameter gebunden |
| **Ausreißer** | Zugriff außerhalb des üblichen Umfangs; ein Plan doppelt so lang wie üblich | Der On-Call-Besitzer | Anomalieereignis und Entscheidung |
| **Benutzerdefiniert** | Ein Kauf über das eigene Limit des Benutzers hinaus | Der Benutzer | Zustimmungsdatensatz |
| **Umfangserhöhung** | Eine Step-Up-Anfrage für einen neuen Umfang | Der Besitzer des Agenten | Erhöhungsereignis |

### Wie eine gute Genehmigung aussieht

Das KI-Verordnung beschreibt den Aufseher, dem das Design dienen muss. Für ein Hochrisiko-KI-System
müssen sie die "mögliche Neigung zur automatischen Abhängigkeit oder übermäßigen Abhängigkeit von
der Ausgabe" erkennen können, die Ausgabe "missachten, außer Kraft setzen oder rückgängig machen"
und das System "durch einen 'Stop'-Button oder ein ähnliches Verfahren unterbrechen" können
(`Art. 14(4)(b), (d), (e)`) [5]. Der Betreiber muss die Aufsicht Personen zuweisen, "die über die
erforderliche Kompetenz, Schulung und Autorität sowie die erforderliche Unterstützung verfügen"
(`Art. 26(2)`) [5]. Singapur fügt zwei praktische Punkte hinzu: Genehmigungsanfragen
"kontextabhängig und verdaulich" halten, während das Risiko klar gemacht wird, und "Erzwingen Sie
menschliche Genehmigung durch Systemsteuerungen, wo möglich, gegenüber Prompt-Layer-Guardrails, die
umgangen oder 'vergessen' werden können" [3].

Die Bedrohung, gegen die man designen muss, ist `ASI09`, **Human-Agent-Trust-Ausnutzung**: Menschen
verlassen sich übermäßig auf die selbstbewusste Begründung eines Agenten und "genehmigen Maßnahmen
ohne unabhängige Validierung", was ein Angreifer, der den Agenten lenkt, ausnutzen kann [1]. ATLAS
hat eine Technik für die Überzeugung selbst, "LLM Trusted Output Components Manipulation"
(`AML.T0067`) [10]. Die folgenden Regeln:

1. **Das Gate lebt außerhalb des Modells.** Das Tool-Gateway hält den Aufruf an, bis die Genehmigung
   ankommt; der Prompt entscheidet nicht, ob gefragt werden soll.
2. **Zeigen Sie den Aufruf, nicht die Geschichte.** Der Genehmiger sieht das Werkzeug, die Parameter
   und das Ziel, wie das Gateway sie ausführt, dann die Begründung des Agenten, das Risiko und was
   bei Ablehnung passiert.
3. **Binden Sie die Genehmigung.** Eine Genehmigung ist einmalig und an einen Hash der Parameter
   gebunden; ein geänderter Betrag benötigt eine neue Genehmigung.
4. **Zeitüberschreitung geschlossen.** Keine Antwort bedeutet keine Aktion.
5. **Messen Sie die Aufsicht.** Genehmigungsrate, Zeit bis zur Entscheidung und
   Außerkraftsetzungsrate, wie
   [Designing Human Oversight](/bok/the-stack#designing-human-oversight-article-14) beschreibt.

> **Anti-Pattern** Ein Kontrollpunkt, der 200 Mal am Tag bei einer Person mit anderer Arbeit
> auslöst. Er wird innerhalb einer Woche zu einem Gummistempel, und das Genehmigungsprotokoll wäscht
> dann die Entscheidungen, die es hätte untersuchen sollen.

> **In der Praxis (illustrativ)**
> Ein Zahlungsteam stellte fest, dass seine Prüfer fast jede Agentenrückerstattungsanfrage innerhalb
> von Sekunden genehmigten. Zwei Änderungen behoben es: Nur irreversible, hochwertige
> Rückerstattungen erreichen jetzt eine Person, was das Volumen um eine Größenordnung reduzierte,
> und der Genehmigungsbildschirm zeigt zuerst den rohen Werkzeugaufruf mit der Erklärung des Agenten
> darunter. Außerkraftsetzungen stiegen von fast keine zu einer Rate, die es wert ist, untersucht zu
> werden, und zwei der ersten legten einen Prompt-Injection-Pfad durch Kundennotizen offen.

## Runtime-Guardrails für Werkzeugaufrufe

Ein Runtime-Guardrail für einen Agenten sitzt an einem Punkt: zwischen der Entscheidung, ein
Werkzeug aufzurufen, und dem Aufruf. Die CSAs Autonomous Action Runtime Management
(AARM)-Spezifikation definiert "die Fähigkeiten, die ein Agentensicherheitssystem bereitstellen
muss, um zu regeln, was ein KI-Agent zur Laufzeit tun darf", beginnend mit
Pre-Execution-Interception gebunden an Identität und Richtlinienevaluierung vor der Ausführung der
Aktion [16]. OWASPs Agent Control Standard ist eine Wire-Spezifikation für denselben Punkt: Sie
ermöglicht es einem separaten Guardian Agent, "zu inspizieren, was ein KI-Agent tun wird, und diese
Aktion vor ihrer Ausführung über einen authentifizierten Kanal mit einem Audit-Trail zu erlauben, zu
verweigern oder zu ändern" [17].

Der Referenz-Guardian im ACS-Repository beginnt mit einer Fehlerposition von "Fortfahren",
überschreibbar zu Verweigern [17]. Ab 2026-09-24 offenbart das README des Repositories auch, dass
der Referenz-Guardian die HMAC-SHA256-Umschlag-Signatur, die die Spezifikation erfordert, noch nicht
implementiert, daher ist sein Wire nicht authentifiziert und alles, das den Port erreichen kann,
kann Entscheidungen lesen und verursachen [17]. Das Fail-Open-Standard ist eine
Governance-Entscheidung, die als Einstellung verkleidet ist: Wenn der Guardian ausfällt, lässt
Fail-Open jeden Aufruf unkontrolliert durch und Fail-Closed stoppt das Geschäft. Entscheiden Sie pro
Operationsklasse und zeichnen Sie es in der [Policy Card](/patterns/policy-card) des Agenten auf:
Fail Closed für Pay, Delete, Send und Execute; Fail Open, mit einer Warnung, nur für Reads.

| Prüfung | Läuft | Bei Fehler |
|---|---|---|
| Identität stimmt mit einem Live-Registry-Eintrag überein | Jeder Aufruf | Verweigern |
| Werkzeug auf der Allow-List; Definitions-Hash stimmt überein | Jeder Aufruf | Verweigern |
| Parameter innerhalb der Richtlinie (Ressource im Umfang, Betragsgrenzen) | Jeder Aufruf | Verweigern oder an einen Kontrollpunkt weiterleiten |
| Anweisungsherkunft: Stammt die Anfrage aus nicht vertrauenswürdigem Inhalt? | Vor Write-Class-Aufrufen | An einen Kontrollpunkt weiterleiten |
| Ausgabe- und Egress-Filter (Geheimnisse, persönliche Daten, Ziele) | Nach dem Aufruf, bevor das Ergebnis zurückkommt | Redigieren oder blockieren |
| Ausführungsbudgets (Schritte, Aufrufe, Token, Ausgaben, Zeit) | Kontinuierlich | Breaker auslösen |
| Code läuft nur in einer Sandbox | Execute-Class-Werkzeuge | Verweigern (`ASI05`) |

### Ausführungsgrenzen

Budgets sind der Guardrail, der erfasst, was keine Regel vorgesehen hat. Die 2026 OWASP LLM-Liste
nennt "agentic architectures and tool-use protocols (such as MCP) that amplify a single request into
cascading downstream operations" als einen verschärfenden Faktor und empfiehlt "hard spending caps,
agent-level circuit breakers, and continuous cost-attribution monitoring" (`LLM06:2026`) [18]. ATLAS
fügte "Agentic Resource Consumption" (`AML.T0034.002`) für Angreifer hinzu, die einen Agenten zu
teuren Werkzeugaufrufen zwingen [10], und TC260 fordert Schritt-, Häufigkeits- und Dauergrenzen [6].
Legen Sie die Budgets im Registry-Eintrag fest, erzwingen Sie sie am Gateway und lassen Sie die
Erschöpfung den Breaker auslösen, anstatt ein Ticket zu erstellen. Das
[Runtime Guardrail](/patterns/runtime-guardrail)-Muster deckt die Mechanik ab; ein
**Guardian Agent**, wie Kapitel 04 bemerkt, ist eine Möglichkeit, den Durchsetzungspunkt zu bauen
und benötigt seine eigene Identität, seinen Umfang und seinen Kill Switch.

## Kill Switch und Pro-Agent-Schaltkreisunterbrecher

Autonomie wird nur dort gewährt, wo sie entzogen werden kann. Das NIST AI RMF fordert Mechanismen,
um Systeme, deren Ergebnisse nicht dem beabsichtigten Einsatz entsprechen, zu "ersetzen, zu
deaktivieren oder zu deaktivieren" (MANAGE 2.4) [19]; das KI-Verordnung fordert ein Stop-Verfahren
(`Art. 14(4)(e)`) [5]; das CSA-Framework stellt das Ziel klar: "Sie können einen Agenten stoppen,
ohne das Geschäft zu stoppen" [4]. Das
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)-Muster gibt den Mechanismus.
Im Betrieb hat ein Stop Ebenen:

| Stop-Ebene | Mechanismus | Explosionsradius | Zielzeit (illustrativ) | Evidenz |
|---|---|---|---|---|
| **Eine Aufgabe pausieren** | Am nächsten Kontrollpunkt halten oder die Aufgabe abbrechen | Eine Aufgabe | Sekunden | Aufgabenzustandsänderung |
| **Umfang einengen** | Ein Werkzeug oder einen Umfang aus der Allow-List entfernen | Eine Fähigkeit eines Agenten | Unter einer Minute | Richtliniendiff |
| **Breaker auslösen** | Das Gateway lehnt jeden Aufruf vom Agenten ab | Ein Agent | Sekunden | Breaker-Ereignis |
| **Identität widerrufen** | Keine Anmeldedaten mehr ausstellen; Refresh-Token widerrufen | Ein Agent, überall | Begrenzt durch Anmeldedauer | Widerrufsdatensatz |
| **Eine Klasse stoppen** | Breaker auf jedem Agenten, der ein Modell, Werkzeug oder Prompt-Version teilt | Ein Flottenabschnitt | Minuten | Flottenereignis |
| **Herabstufen** | Zu Nur-Beratung oder zurück zu Pilot wechseln | Verhalten, nicht Verfügbarkeit | Minuten | Modusänderung |

Die letzte Zeile nutzt die
[abgestuften Degradationsmodi](/bok/governing-deployment#graduated-degradation) aus Kapitel 15:
"advice-only" (der Agent entwirft, eine Person handelt) erhält den Service, entfernt aber die
Autonomie. Auslöser werden im Voraus definiert: ein manueller Abruf, ein Budget- oder Schwellenwert
für nicht autorisierte Aufrufe, eine Anomalie, eine vorgelagerte Benachrichtigung (der
Modellhersteller meldet einen Vorfall) oder eine rechtliche Anweisung.

Ein Stop, der nicht geübt wurde, ist eine Behauptung. Üben Sie ihn nach Plan, messen Sie die
Stoppzeit und überprüfen Sie, dass der Stop hielt: keine Tool-Aufrufe nach dem Auslösen des
Breakers, keine Anmeldedaten nach dem Widerrufen. Kapitel 17 macht denselben Punkt für
[rogue behaviour](/bok/incidents#ai-specific-failure-modes): widerrufen, dann überprüfen, dass der
Widerruf wirksam wurde. [Decommissioning](/patterns/deactivation-localisation-retirement-runbook)
ist die geplante Version: TC260 listet vollständiges Herunterfahren, Datensicherung und
Umgebungsbereinigung [6] auf; fügen Sie das Löschen des Speichers unter seiner Aufbewahrungsregel
und das Entfernen des Agenten aus den Delegationslisten anderer Agenten hinzu.

### Stoppen über mehrere Hops

Sie können den Agent einer anderen Person nicht stoppen. Die Cancel-Operation von A2A sagt es: "The
server will attempt to cancel the task, but success is not guaranteed" [20]. Was Sie kontrollieren,
ist Ihre eigene Grenze: verhindern Sie, dass Ihre Agenten den Remote-Agent aufrufen, und widerrufen
Sie, was Sie ihm ausgestellt haben. Kurzlebige delegierte Token begrenzen diesen Widerruf auf ihre
Lebensdauer; langlebige machen es eine Hoffnung.

> **In der Praxis (illustrativ)**
> Eine Kill-Switch-Übung auf einem Dokumentenverarbeitungsagenten maß vier Sekunden vom Abruf bis
> zum Breaker, der Aufrufe ablehnte, was wie ein Erfolg aussah. Die Folgekontrolle fand lange
> laufende Aufgaben, die zwanzig Minuten später noch in den Speicher schrieben, auf einem
> Refresh-Token, der vor dem Abruf ausgestellt wurde. Agent-Refresh-Token wurden entfernt,
> Zugriffstokens auf fünf Minuten gekürzt, und die Übung behauptet jetzt null Schreibvorgänge nach
> dem Abruf, nicht nur einen schnellen Breaker.

## Speicher- und Kontextgovernance

Speicher verwandelt eine schlechte Eingabe in eine dauerhafte. Die OWASP-Liste 2026 nennt dies
**memory persistence**: "eine Injection, die in den Langzeitspeicher, einen RAG-Corpus, einen Vector
Store oder einen gehosteten Memory-Service schreibt, verseucht jede nachfolgende Sitzung, die aus
diesem Store liest" [18]. OWASPs Agentic-Liste hat es als `ASI06` Memory & Context Poisoning [1];
ATLAS hat "AI Agent Context Poisoning" (`AML.T0080`), mit Subtechniken für Speicher und für den
Chat-Thread [10].

| Speicher | Was es hält | Hauptrisiko | Kontrolle | Aufbewahrung |
|---|---|---|---|---|
| **Kontextfenster** | Anweisungen, abgerufener Text, Tool-Ausgaben | Injection durch Tool-Ausgabe | Herkunfts-Tags; nicht vertrauenswürdige Segmente gekennzeichnet | Eine Anfrage |
| **Gesprächs-Thread** | Eine Sitzung | Thread-Vergiftung (`AML.T0080.001`) | Pro-Sitzungs-Isolation | Die Sitzung |
| **Langzeitspeicher** | Fakten und Vorlieben über Sitzungen hinweg | Speichervergiftung (`AML.T0080.000`); personenbezogene Daten zu lange aufbewahrt | Write Gate; Pro-Benutzer-Namespace; Time to Live; Löschpfad | Richtlinie definiert, pro Klasse |
| **Abruf-Corpus** | Dokumente | Verseuchte oder veraltete Quellen (`AML.T0099`) | Quellenaufnahme; Berechtigungsprüfung beim Abruf | Pro Corpus-Version |
| **Gemeinsamer Speicher** | Zustand zwischen Agenten weitergegeben | Agenten-übergreifende Kontamination | Pro-Task-Isolation; zugeschriebene Schreibvorgänge | Die Aufgabe |
| **Agent-Konfiguration** | Prompts, Tool-Einstellungen | Manipulation (`AML.T0081`); gespeicherte Anmeldedaten (`AML.T0083`) | Änderungskontrolle; keine Geheimnisse | Versioniert |

Fünf Regeln machen Speicher governable. **Schreibvorgänge sind Ereignisse**, die ihre Quelle tragen,
sodass ein verseuchter Eintrag auf das zurückgeführt werden kann, das ihn erzeugt hat.
**Nicht vertrauenswürdiger Inhalt kann ohne Gate nicht in den Langzeitspeicher schreiben**.
**Speicher ist isoliert** pro Benutzer und pro Aufgabe, wie TC260 verlangt, mit
Aufbewahrungsfenstern und ohne Anmeldedaten im Speicher [6]. **Aufbewahrung ist Code**: ein
Speicher, der personenbezogene Daten hält, unterliegt den Minimierungs- und
Speicherbegrenzungsgrundsätzen der DSGVO (`Art. 5(1)(c), (e)`) und dem Recht auf Löschung
(`Art. 17`) [21]; siehe
[Rechte der betroffenen Person gegen trainierte Modelle](/bok/privacy-and-ai#data-subject-rights-against-trained-models).
**Speicher kann auf einen bekannten guten Snapshot zurückgesetzt werden**, anstatt gelöscht zu
werden.

Für Hochrisiko-Systeme, die nach der Bereitstellung weiter lernen, verlangt die KI-Verordnung, dass
sie entwickelt werden, um "das Risiko möglicherweise verzerrter Ausgaben zu verringern, die Eingaben
für zukünftige Operationen beeinflussen" (`Art. 15(4)`) [5]. Ein Speicher, der späteres Verhalten
prägt, ist ein solcher Rückkopplungspfad in allem außer dem Namen, und das Lesen von `Art. 15(4)`
als Abdeckung ist der umsichtige Kurs, bis die Leitlinien etwas anderes sagen.

## Multi-Agent-Systeme und Delegationsketten

Das Agent2Agent-Protokoll (A2A) ist ein offenes Protokoll für die Kommunikation zwischen Agenten,
das zunächst von Google entwickelt und der Linux Foundation gespendet wurde. Version 1.0.0 wurde
am 12. März 2026 und 1.0.1 am 28. Mai 2026 veröffentlicht [20]; am 27. August 2026 wurde A2A als
Growth Stage-Projekt der Agentic AI Foundation, geleitet von der Linux Foundation, neben MCP
akzeptiert [22]. Sein Sicherheitsmodell gibt Ihnen Bausteine. Ein Agent veröffentlicht eine
**Agent Card** unter `/.well-known/agent-card.json`}, die seine Identität, Fähigkeiten, Endpunkt und
Authentifizierungsanforderungen beschreibt; die Karte kann mit JWS über eine kanonische JSON-Form
signiert werden; die Karte deklariert die Authentifizierungsschemas, die der Agent akzeptiert
(API-Schlüssel, HTTP-Authentifizierung, OAuth 2.0, OpenID Connect oder gegenseitiges TLS); und der
Server "MUST authenticate every incoming request" [20]. Autorisierung danach ist, in den Worten der
Spezifikation, "implementation-specific" [20].

Was A2A Ihnen nicht gibt, ist Rechenschaftspflicht. Ein Agent, der während einer Aufgabe mehr
Autorität benötigt, verschiebt die Aufgabe zu `TASK_STATE_AUTH_REQUIRED`}, und ein Client, der
selbst ein Agent ist, kann die Anfrage weitergeben, "forming a chain of Tasks" [20]. Aber die
Spezifikation besagt, dass sie "does not define the scope, representation, validity, or revocation
semantics of the authorization decision or credential obtained" [20]. Das Protokoll verschiebt
Aufgaben; die Regeln darüber, wer was autorisieren darf, über wie viele Hops, sind Ihre zu
schreiben.

Die Bedrohungen sind benannt: `ASI07` Insecure Inter-Agent Communication, {`ASI08`} Cascading
Failures und {`ASI10`} Rogue Agents {[1]}, und ATLAS fügte "Autonomous AI Agent Communication"
({`AML.T0118`}) Ende August 2026 {[10]} hinzu. Der GPAI Code of Practice listet "colluding" mit
anderen KI-Systemen und "mis-coordination or conflict" mit ihnen unter den Modellneigungen auf, die
Quellen systemischen Risikos sind {[23]}.

### Rechenschaftspflicht über Hops

| Eigenschaft | Regel | Evidenz |
|---|---|---|
| **Ursprünglicher Principal** | Jede Aufgabe trägt die Person oder das System, das sie gestartet hat | Wurzel des Delegationsdatensatzes |
| **Akteur pro Hop** | Jeder Agent authentifiziert sich selbst; Delegation, nie Identitätswechsel | Verschachtelte `act` Claims [11] |
| **Umfang** | Verengt sich oder bleibt gleich bei jedem Hop; wird nie erweitert | Token-Exchange-Protokoll |
| **Zweck** | Der Zweck der Aufgabe reist mit ihr und wird bei jedem Hop überprüft | Zweckfeld bei jedem Aufruf |
| **Tiefe und Fan-out** | Maximale Hops und maximale parallele Unter-Aufgaben | Breaker-Ereignis bei Verstoß |
| **Trace** | Ein Trace-Kontext vom ersten bis zum letzten Hop | Trace-ID bei jedem Span |
| **Peers** | Nur registrierte Agenten mit verifizierten, signierten Karten | Peer-Allow-Liste |
| **Dritte** | Ein Vertrag benennt, wer für einen Remote-Agent antwortet | Klauselreferenz in der Registrierung |

Zwei Standardisierungsbemühungen befassen sich mit dem schwierigen Teil, Identität und
Autorisierungskontext durch eine Aufrufikette zu tragen. Der Transaction Tokens-Entwurf der OAuth
Working Group (Revision 11, 30. Juli 2026, wartet auf sein Write-up) ist dazu konzipiert, "to
maintain and propagate user identity, workload identity and authorization context throughout the
Call Chain within a trusted domain" [24]; die IETF WIMSE Working Group (Workload Identity in Multi
System Environments) behandelt Workload Identity über Systeme hinweg [25]. Beide sind ab 2026-09-24
unvollständig. Bis sie sich einigen, ist die obige Tabelle der Vertrag, durchgesetzt bei jedem
Gateway, das Sie kontrollieren. Für Agenten von Drittanbietern sind die Klauseln in
[Verträge und Lizenzen](/resources/contracts) die andere Hälfte.

## Prompts als Konfiguration unter Änderungskontrolle

Das Verhalten eines Agenten wird durch sein Modell, seinen System-Prompt, seine Tool-Beschreibungen
und sein Policy-Bundle festgelegt. Ändern Sie einen davon und das Verhalten ändert sich, ohne dass
eine Code-Änderung erforderlich ist. Behandeln Sie also jeden als Konfiguration unter
Änderungskontrolle, wie Infrastructure Code:

1. **Versionieren und besitzen Sie es.** Prompts leben im Repository, mit einem benannten Besitzer
   und zwei Reviewern.
2. **Hashen Sie es überall.** Die Registrierung zeichnet den Hash auf, und so tut es jeder Trace:
   die OpenTelemetry-Konventionen tragen `gen_ai.agent.version` genau dafür [26]}.
3. **Gaten Sie es.** Jede Änderung führt die Regressionssuite (Task-Erfolg, Injektionsresistenz,
   Trajektorie-Checks) im [Eval Gate in CI](/patterns/eval-gate-in-ci) aus; ein Fehler blockiert die
   Änderung.
4. **Rollen Sie es aus und zurück.** Canary die Änderung, wie in
   [progressive delivery](/bok/governing-deployment#progressive-delivery-as-a-control), und halten
   Sie den vorherigen Hash bereit zum Wiederherstellen.
5. **Fragen Sie, ob sich der Zweck geändert hat.** Ein Prompt, der ändert, wofür das System ist,
   kann eine [wesentliche Veränderung](/bok/governing-development#substantial-modification) sein und
   kann unter [Artikel 25](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider) den
   Betreiber zum Anbieter machen.

Ein System-Prompt ist Konfiguration, kein Geheimnis und keine Kontrolle. Die OWASP-Liste 2026
benannte System-Prompt-Lecks in **Hidden Context Exposure** (`LLM08:2026`) um und rät, dass
"Practitioners should design under the assumption that hidden context is discoverable": keine
Anmeldedaten darin, und keine Abhängigkeit davon "as a security boundary for authorization,
privilege separation, policy enforcement, or content filtering" [18]. ATLAS listet sowohl "Extract
LLM System Prompt" (`AML.T0056`) als auch "Modify AI Agent Configuration" (`AML.T0081`) [10]} auf.
Alles, das halten muss, geht ins Gateway.

> **Beispiel (illustrativ)** Ein Prompt-Manifest, das die Pipeline weigert bereitzustellen, es sei
> denn, der Eval-Lauf, den es benennt, ist bestanden.

```yaml
# prompt manifest (illustrative)
agent: refunds-agent
artefact: system_prompt
version: 2026-09-22.1
sha256: "9f2c...e41"
owner: support-platform
reviewers: [product-owner, ai-governance-engineer]
eval_run: evals/refunds-agent/2026-09-22-1842   # must be green
rollout: { strategy: canary, share: 5%, hold_hours: 48 }
rollback_to: 2026-09-10.3
changes_intended_purpose: false
```

> **Anti-Pattern** Bearbeitung des Production-System-Prompts in einer Vendor-Konsole, um eine
> Beschwerde zu beheben. Das Verhalten ändert sich, die Registrierung und die Traces benennen immer
> noch die alte Version, und der nächste Vorfall wiederholt eine Konfiguration, die nie lief.

## Agent-Vorfälle und Telemetrie

### Eine Agent-Vorfall-Taxonomie

Die Partnership on AI definiert die Fähigkeit, die Agenten am meisten brauchen: "Real-time failure
detection is the use of automated monitoring systems that track agent behavior as it unfolds, flag
anomalies, and either halt execution or escalate to human oversight" [15]. Die Taxonomie unten
erweitert die [KI-spezifischen Fehlermodi](/bok/incidents#ai-specific-failure-modes) von Kapitel 17
für Agenten; die Schweregrad-Skala und die Reporting-Uhren sind die, die
[Kapitel 17 festlegt](/bok/incidents#a-severity-scale-mapped-to-the-clocks).

| Klasse | Wie es aussieht | Erkennungssignal | Erste Eindämmung | IDs |
|---|---|---|---|---|
| **Goal Hijack** | Anweisungen in einem Dokument leiten die Aufgabe um | Tool-Aufrufe, die nicht mit dem Zweck der Aufgabe zusammenhängen | Aufgabe pausieren; Quelle unter Quarantäne stellen | `ASI01`; `AML.T0051.001` |
| **Tool-Missbrauch** | Ein zulässiges Tool zu schädlichem Effekt verwendet | Parameter außerhalb des Registrierungsprofils | Umfang verengen; Breaker auslösen | `ASI02`; `AML.T0053` |
| **Privilege Abuse** | Der Agent nutzt Autorität über seine Aufgabe hinaus | Fehler bei Zielgruppe oder Umfang | Die Identität widerrufen | `ASI03`; `AML.T0098` |
| **Kompromittierung der Lieferkette** | Eine Tool-Definition ändert sich nach der Zulassung | Definition-Hash-Nichtübereinstimmung | Den Server aus Allow-Listen entfernen | `ASI04`; `AML.T0110` |
| **Unerwartete Code-Ausführung** | Generierter Code wird außerhalb der Sandbox ausgeführt | Sandbox-Verstoß | Prozess beenden; widerrufen | `ASI05`; `AML.T0112.000` |
| **Memory Poisoning** | Eine injizierte "Tatsache" bleibt über Sitzungen hinweg bestehen | Memory-Schreibvorgänge aus nicht vertrauenswürdigen Quellen | Speicher einfrieren und zurücksetzen | `ASI06`; `AML.T0080` |
| **Inter-Agent-Spoofing** | Ein nicht registrierter Agent antwortet als Peer | Unbekannte Identität; unsignierte Card | Den Peer blockieren | `ASI07`; `AML.T0118` |
| **Kaskadeneffekt** | Der Fehler eines Agenten verstärkt sich durch andere | Korrelierte Ausfälle | Unterbrechen Sie die Kette bei der gemeinsamen Komponente | `ASI08` |
| **Vertrauensausnutzung** | Eine irreführende Zusammenfassung gewinnt eine Genehmigung | Nichtübereinstimmung zwischen Zusammenfassung und Aufruf | Rohe Aufrufe anzeigen; frühere Genehmigungen überprüfen | `ASI09`; `AML.T0067` |
| **Außer Kontrolle oder rogue** | Aktivität außerhalb des Umfangs, nach Ablauf oder über Budget | Aufrufe nach Ablauf; Ausgabenspitze | Widerrufen; überprüfen, dass der Stopp hielt | `ASI10`; `AML.T0034.002` |
| **Exfiltration über ein Tool** | Daten, die in einen legitimen Schreibvorgang codiert sind | Egress zu einem unbekannten Ziel | Egress blockieren; den Breaker auslösen | `ASI02`; `AML.T0086` |

### Telemetrie mit den OpenTelemetry-GenAI-Konventionen

Die OpenTelemetry-Semantic-Conventions für generative KI leben jetzt in ihrem eigenen Repository und
haben den Status **Development**, daher können sich Namen noch ändern [26]. Sie definieren
Operationen für `create_agent`, `invoke_agent`, `invoke_workflow`, `plan`, `execute_tool` und
Memory-Operationen wie `search_memory` und `update_memory`. Ein Tool-Span heißt
`execute_tool {gen_ai.tool.name}`; `gen_ai.tool.name` ist erforderlich, {`gen_ai.tool.call.id`}
empfohlen, und die Argumente und das Ergebnis des Aufrufs sind optional. Agent-Spans tragen
{`gen_ai.agent.id`}, {`gen_ai.agent.name`} und {`gen_ai.agent.version`}, und eine separate
Konvention behandelt MCP ({`mcp.method.name`}, {`mcp.session.id`}) {[26]}.

Governance benötigt Felder, die die Konventionen noch nicht definieren (Registry-ID,
Workload-Identität, Policy-Urteil, Genehmigungsnummer, Delegationskette): Fügen Sie sie in Ihrem
eigenen Namespace hinzu und ordnen Sie sie später zu. Das Aktivieren der Argument- und
Ergebnis-Erfassung kann personenbezogene Daten erfassen, daher benötigt es eigene Aufbewahrungs- und
Zugriffsregeln. Und die Protokolle sind Nachweise: Hochrisiko-Systeme müssen Ereignisse über ihre
Lebensdauer aufzeichnen (`Art. 12`), und Betreiber müssen die Protokolle mindestens sechs Monate
lang unter ihrer Kontrolle halten (`Art. 26(6)`}) [5]. Der
[Incident Record](/bok/incidents#the-incident-record) aus Kapitel 17 ist der Ort, an dem die Trace
endet.

## Bedrohungen auf Kontrollen abgebildet

Die beiden OWASP-Listen teilen das Feld auf. Die 2026-LLM-Liste, veröffentlicht am 3. Aug 2026,
sagt, sie "besitzt das Risiko, wenn das Modell eine Komponente in Ihrer Anwendung ist"; sobald das
Modell "zum Akteur wird, mit Tools, die es aufrufen kann, Memory, das es zwischen Sitzungen trägt,
und Konsequenzen, die es nachgelagert in Bewegung setzt, wechselt das Risiko zur OWASP Agentic Top
10", und Excessive Agency kletterte auf Platz drei (`LLM03:2026`}) [18]. Die Tabelle ordnet jede
agentic-Bedrohung verwandten LLM-Einträgen, Beispiel-ATLAS-Techniken aus der Datenfreigabe 2026-09
[10], einer Kontrolle und dem Muster, das sie implementiert, zu.

| Agentic-Bedrohung [1] | Verwandte LLM 2026 [18] | Beispiel-ATLAS-Techniken | Kontrolle | Muster | Schicht |
|---|---|---|---|---|---|
| `ASI01` Agent Goal Hijack | `LLM01` Prompt Injection | `AML.T0051` LLM Prompt Injection | Instruction Provenance; Checkpoints vor Schreibvorgängen; Trajectory Evals | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI02` Missbrauch und Ausnutzung von Tools | `LLM03` Übermäßige Agentur; `LLM06` Unbegrenzter Verbrauch | `AML.T0053` AI Agent Tool Invocation; `AML.T0086` | Tool Allow-List; pro-Tool-Rate, Egress und Budgets | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI03` Identitäts- und Berechtigungsmissbrauch | `LLM03` Excessive Agency | `AML.T0083`; `AML.T0098` Harvesting von KI-Agent-Tool-Anmeldedaten | Workload-Identität; kurzlebige delegierte Tokens; Audience-Checks | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI04` Schwachstellen in der agentischen Lieferkette | `LLM04` Supply Chain | `AML.T0110` AI Agent Tool Poisoning | Server-Zulassung; Definition Pinning | [AIBOM](/patterns/aibom) | 02 |
| `ASI05` Unexpected Code Execution (RCE) | `LLM10` Improper Output Handling | `AML.T0112.000` Local AI Agent | Sandboxed Execution; Deny by Default | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI06` Memory & Context Poisoning | `LLM05` Daten- und Modellvergiftung; `LLM09` Vektor- und Embedding-Schwachstellen | `AML.T0080` AI Agent Context Poisoning | Memory Write Gate; Namespaces; Rollback | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI07` Insecure Inter-Agent Communication | Keine | `AML.T0118` Autonomous AI Agent Communication | Gegenseitige Authentifizierung; signierte Agent Cards; Peer Allow-List | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI08` Cascading Failures | `LLM06` Unbounded Consumption | `AML.T0034.002` Agentic Resource Consumption | Tiefe und Fan-Out-Limits; pro-Agent-Breaker | [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) | 04 |
| `ASI09` Human-Agent Trust Exploitation | `LLM07` Misinformation | `AML.T0067` Manipulation vertrauenswürdiger LLM-Ausgabekomponenten | Raw-Call-Genehmigungen; Oversight-Metriken | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) | 04 · 05 |
| `ASI10` Rogue Agents | `LLM03` Excessive Agency | `AML.T0103` Deploy AI Agent | Registry mit Ablauf; Discovery; durchgeführter Kill Switch | [Agent Registry](/patterns/agent-registry); [Shadow-AI Discovery](/patterns/shadow-ai-discovery) | 02 · 04 |

`LLM02:2026` Sensitive Information Disclosure landet im Egress-Filter und `LLM08:2026` Hidden
Context Exposure in der Behandlung von Prompts. Verwenden Sie die ATLAS-IDs, um Test-Cases in der
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) zu kennzeichnen, damit ein Befund
von der Technik zur Kontrolle zur Eval, die sie jetzt schützt, zurückverfolgt werden kann. Die
[Threat Bridge](/resources/threats) der Website trägt die gleichen Zeilen wie Daten. Zuordnungen
sind illustrativ, keine Konformitätsaussage.

## Frameworks für Agents

Fünf Organisationen haben Agent-spezifische Leitlinien veröffentlicht, und Kapitel 08 stellt bereits
drei davon nebeneinander in seiner [Agent-Control-Tabelle](/bok/regulatory-map#china). Ihr Status ab
2026-09-24:

| Framework | Status | Was es hinzufügt |
|---|---|---|
| **NIST AI Agent Standards Initiative** (CAISI) | Gestartet 17. Feb 2026; drei Säulen: von der Industrie geführte Standards, offene Protokolle, Forschung zu Agent-Sicherheit und Identität [27] | Ein RFI zur KI-Agent-Sicherheit und das NCCoE-Konzeptpapier zur Agent-Identität und Autorisierung [27][8] |
| **CSA Agentic Trust Framework** und **AARM** | ATF v1, veröffentlicht im Februar 2026 unter CC BY 4.0 [4]; AARM aus einer CSA-Arbeitsgruppe [16]; beide genannt im CSA-Programm zur agentic Control Plane vom April 2026 [28] | Zero Trust für Agents mit erworbenen Autonomie-Stufen (ATF); Runtime-Interception-Anforderungen (AARM) |
| **IMDA Model AI Governance Framework for Agentic AI** | Gestartet 22. Jan 2026 [29]; Version 1.5 veröffentlicht 20. Mai 2026 [3] | Vier Dimensionen: Risiken im Voraus begrenzen, Menschen verantwortlich machen, technische Kontrollen, Verantwortung des Endbenutzers |
| **TC260 AI Safety Governance Framework 3.0, Appendix 2** | Freiwillig; veröffentlicht 14. Sep 2026 [6] | Identität nach Entscheidungsmodus, manipulationssichere Genehmigungsprotokolle, Memory-Isolation, Außerbetriebnahme |
| **OWASP Agent Control Standard** | An das OWASP GenAI Security Project gespendet, angekündigt 1. Sep 2026; Repository in Version 0.1.2 [17] | Ein Wire Contract zwischen einem Agent Host und einem Guardian |

Die Regulierungskarte listet auch ein vorgeschlagenes AICM Agentic Control Supplement der CSA auf.
Dieses Kapitel konnte es ab 2026-09-24 nicht mit einem primären CSA-Dokument abgleichen, daher
behandeln Sie es als unbestätigt (überprüfen).

Nebeneinander konvergieren sie auf einer kurzen Liste: eine eindeutige Identität pro Agent, Least
Privilege mit Ablauf, Checkpoints bei irreversiblen Aktionen, Interception vor Ausführung, ein
Stopp, der auf einen Agent wirkt, isoliertes Memory und vollständige Protokolle. Singapur fügt
Verantwortung des Endbenutzers hinzu, die CSA erworbene Autonomie, TC260 Außerbetriebnahme. Keines
verleiht Konformität; sie sind Quellen von Kontrollen und Vokabular.

## EU AI Act Hooks für Agents

Der AI Act definiert "Agent" nicht. Ein Agent ist ein KI-System, klassifiziert nach seiner
Zweckbestimmung wie jedes andere: Ein Agent, der Jobbewerber filtert, ist hochrisiko durch Annex III
unabhängig von seiner Architektur, und ein Planungsassistent ist es nicht. Kapitel 18 hat die
[Hochrisiko-Anforderungen](/bok/eu-ai-act#high-risk-requirements-articles-8-to-15) und die
[Betreiberpflichten](/bok/eu-ai-act#deployer-duties-article-26) vollständig. Die folgenden
Bestimmungen sind der Ort, an dem Agent-Kontrollen die Nachweise erzeugen; das Obligation Register
gibt jedem eine eigene Seite mit seinen Daten, Nachweisen und Crosswalk:
[Art. 12](/obligations/aige-obl-euaia-art12), [Art. 14](/obligations/aige-obl-euaia-art14),
[Art. 15](/obligations/aige-obl-euaia-art15), [Art. 25](/obligations/aige-obl-euaia-art25),
[Art. 26](/obligations/aige-obl-euaia-art26) und [Art. 50](/obligations/aige-obl-euaia-art50).

| Bestimmung | Was er fragt | Agent-Artefakt | Pflichtträger |
|---|---|---|---|
| `Art. 12` | Automatische Aufzeichnung von Ereignissen über die Lebensdauer, um Risiken zu identifizieren, Post-Market-Monitoring zu unterstützen und den Betrieb zu überwachen [5] | Traces mit Identität, Tool-Aufrufen, Urteilen und Genehmigungen | Anbieter |
| `Art. 14(3)`–`(4)` | Aufsicht proportional zum Autonomie-Niveau; Bewusstsein für Automation Bias; Außerkraftsetzung; Stopp [5] | Autonomie-Niveau; Checkpoints; Raw-Call-Genehmigungen; Kill Switch | Anbieter entwirft; Betreiber betreibt |
| `Art. 15(4)` | Widerstandsfähigkeit; Feedback-Schleifen in Systemen, die weiterhin lernen, reduzieren [5] | Memory Write Gate; Memory Evals; Rollback | Anbieter |
| `Art. 15(5)` | Widerstandsfähigkeit gegen Versuche, Verwendung, Ausgaben oder Leistung zu ändern, einschließlich Poisoning und adversarial Inputs [5] | Guardrails; Server-Zulassung; Red Team mit ATLAS-IDs gekennzeichnet | Anbieter |
| `Art. 25` | Ein Betreiber, der ein Hochrisiko-System wesentlich modifiziert oder den Zweck eines Systems so ändert, dass es hochrisiko wird, wird sein Anbieter [5] | Änderungsüberprüfung von Prompts und Tools mit einer Zweckprüfung | Betreiber |
| `Art. 26(1)`–`(2)`, `(5)`–`(6)` | Verwendung gemäß Anleitung; kompetente Aufseher mit Autorität; Überwachung und Aussetzung; Protokolle mindestens sechs Monate halten [5] | Genehmiger-Roster; Breaker; Log-Aufbewahrung | Betreiber |
| `Art. 50(1)` | Menschen wird mitgeteilt, dass sie mit einem KI-System interagieren, es sei denn, das ist offensichtlich; gilt ab 2. Aug 2026 [5] | Offenlegung in den Nachrichten, Aufrufen und Chats, die ein Agent sendet | Anbieter |
| `Arts. 53`, `55` | Dokumentation für nachgelagerte Anbieter; Systemrisiko-Bewertung für die größten Modelle [5] | Die Dokumentation des Anbieters als Due-Diligence-Input; Agentic Evals in der Vendor-Datei | Anbieter von KI-Modellen mit allgemeinem Verwendungszweck |

Der GPAI Code of Practice macht die agentic-Verbindung für Anbieter von Modellen mit Systemrisiko
explizit. Seine Quellen für Systemrisiko umfassen "Fähigkeiten zum autonomen Betrieb" und
"Fähigkeiten zur Verwendung von Tools, einschließlich 'Computer Use'", und unter den Affordances
"Zugang zu Tools (einschließlich anderer KI-Modelle/Systeme)" und das "Niveau der menschlichen
Aufsicht (z. B. Grad der Modell-Autonomie)"; seine angegebenen Systemrisiken umfassen
**Kontrollverlust**, definiert als "Risiken, dass Menschen die Fähigkeit verlieren, ein Modell
zuverlässig zu lenken, zu ändern oder abzuschalten" [23]. Ein Betreiber sollte fragen, wie der
Anbieter Autonomie und Tool-Verwendung am
[Due-Diligence-Gate](/patterns/vendor-model-due-diligence-gate) bewertet hat; Kapitel 18 behandelt
[die GPAI-Pflichten](/bok/eu-ai-act#general-purpose-ai-models). Der Code ist ein freiwilliges
Werkzeug. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Finden Sie Ihre Agents.** Führen Sie einen Discovery Sweep durch, der Coding Agents und lokale
   MCP-Server-Konfigurationen umfasst, und registrieren Sie, was Sie finden, mit einem Besitzer,
   einem Autonomie-Niveau und einem Ablaufdatum.
2. **Setzen Sie einen statischen Schlüssel außer Kraft.** Verschieben Sie einen Agent zu einer
   kurzlebigen Workload-Identität, und bestätigen Sie, dass die MCP-Server, die er aufruft, Tokens
   ablehnen, die für eine andere Audience ausgestellt wurden.
3. **Schreibe eine Allow-List als Policy.** Deny by default, mit Definition Hashes, Operation
   Classes und einem Checkpoint bei jedem Pay-, Delete-, Send- und Execute-Call.
4. **Drill the stop.** Löse den Breaker bei einem Agent aus, miss die Zeit bis zum Stop und
   bestätige, dass danach kein Call oder Write stattgefunden hat.
5. **Version the system prompt.** Legen Sie ihn im Repository hinter einem Eval Gate ab und zeichnen
   Sie seinen Hash im Registry und in jeder Trace auf.

**Zuordnung:** EU AI Act Art. 12, 14(3)–(4), 15(4)–(5), 25, 26(1)–(2), 26(5)–(6), 50(1), 53, 55 ·
GPAI Code of Practice, Safety and Security (Appendix 1.3, 1.4) · ISO/IEC 42001 (Annex A.6, A.9) ·
NIST AI RMF (Manage 2.4) · NIST AI Agent Standards Initiative · OWASP Agentic ASI01–ASI10 · OWASP
LLM01, LLM03, LLM06, LLM08:2026 · MITRE ATLAS · IMDA Model AI Governance Framework for Agentic AI ·
TC260 Framework 3.0 Appendix 2 · Layer 02 Inventory & Transparency · Layer 04 Runtime Controls &
Observability · Layer 05 Assurance & Continuous Compliance. Mappings sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation, per-tool least-privilege profiles, auto-approved ping tool used for DNS exfiltration; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; "Least-Agency"). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; five levels by user role: operator, collaborator, consultant, approver, observer; autonomy as a design decision separate from capability). Knight First Amendment Institute at Columbia University / arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[3] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four levels of human involvement; agent identity unique, cryptographically verifiable, accounted for, differentiated by capacity, catalogued and centrally managed; authorisations scoped, time- or session-bound, non-transferable, bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals contextual and digestible; human approval enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[4] Agentic Trust Framework, v1 (zero-trust governance for AI agents; five elements: identity, behaviour, data governance, segmentation, incident response; autonomy tiers Intern, Junior, Senior, Principal; promotion criteria; CC BY 4.0; released February 2026). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744: Art. 12 record-keeping; Art. 14(3)–(4) human oversight commensurate with risks, level of autonomy and context of use, automation bias, override, "stop" button; Art. 15(4)–(5) robustness, feedback loops, cybersecurity; Art. 25 responsibilities along the value chain; Art. 26(1)–(2), (5)–(6) deployer obligations; Art. 50(1) transparency for systems interacting with natural persons; Arts. 53 and 55 GPAI providers; Art. 113 application dates as amended (Annex III high-risk from 2 December 2027, Annex I from 2 August 2028). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[6] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), Appendix 2 agentic AI risk management (II.2 unique identity and minimum permissions by decision mode, credentials revoked at task end; II.3 human control checkpoints, tamper-proof approval logs, deny by default when approval fails or no rule exists; II.5 execution limits, memory retention and isolation, no credentials in memory; II.7 decommissioning). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[7] Model Context Protocol, Security Best Practices, version 2026-07-28 (confused deputy; token passthrough "explicitly forbidden"; SSRF; state handle hijacking; local MCP server compromise, consent and sandboxing; scope minimisation and common mistakes). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[8] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[9] SPIFFE overview (Secure Production Identity Framework for Everyone; SPIFFE ID; short-lived SVIDs as X.509 or JWT delivered and rotated through the Workload API; SPIRE reference implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[10] MITRE ATLAS data, release v2026.09 (agent techniques incl. AML.T0034.002 Agentic Resource Consumption, AML.T0051 LLM Prompt Injection, AML.T0053 AI Agent Tool Invocation, AML.T0056 Extract LLM System Prompt, AML.T0067 LLM Trusted Output Components Manipulation, AML.T0080 AI Agent Context Poisoning (.000 Memory, .001 Thread), AML.T0081 Modify AI Agent Configuration, AML.T0083 Credentials from AI Agent Configuration, AML.T0086 Exfiltration via AI Agent Tool Invocation, AML.T0098 AI Agent Tool Credential Harvesting, AML.T0099 AI Agent Tool Data Poisoning, AML.T0101 Data Destruction via AI Agent Tool Invocation, AML.T0103 Deploy AI Agent, AML.T0110 AI Agent Tool Poisoning, AML.T0112.000 Local AI Agent, AML.T0118 Autonomous AI Agent Communication). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[11] RFC 8693, OAuth 2.0 Token Exchange (M. Jones, A. Nadalin, B. Campbell, J. Bradley, C. Mortimore; impersonation versus delegation semantics; "act" actor claim and nested actors; "may_act" claim). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[12] Model Context Protocol specification, version 2026-07-28, Authorization (optional; OAuth 2.1 resource server; RFC 9728 Protected Resource Metadata; Client ID Metadata Documents SHOULD, Dynamic Client Registration deprecated; RFC 8707 resource parameter; audience validation; no other tokens accepted or transited; RFC 9207 issuer validation; scope challenges and step-up). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (verified: primary)
[13] "Authorization changes in the 2026-07-28 specification" (RFC 9207 issuer validation; DCR "formally deprecated in favor of CIMD"; client credentials bound to the issuer that minted them; formal deprecation policy with a twelve-month minimum window). Model Context Protocol blog. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[14] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group; a URL used as client_id that points to the client metadata). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[15] Prioritizing Real-Time Failure Detection in AI Agents (lead author Madhulika Srikumar; stakes, reversibility and affordances; definition of real-time failure detection). Partnership on AI. 2025-09-11. https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/ (verified: primary)
[16] Autonomous Action Runtime Management (AARM) specification (system category specification for agentic runtime security; pre-execution interception with identity binding; policy evaluation before execution; core requirements R1–R6; CSA working group). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[17] Agent Control Standard (ACS) (wire specification letting a guardian agent permit, deny or modify an agent's action before it happens, over an authenticated channel, with an audit trail; reference guardian failure posture "proceed" unless overridden; README discloses that the reference guardian lacks the required HMAC-SHA256 envelope signature, open issue #70; repository github.com/GenAI-Security-Project/agent-control-standard at version 0.1.2; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/resource/agent-control-standard-acs/ (verified: primary)
[18] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection incl. memory persistence; LLM02 Sensitive Information Disclosure; LLM03 Excessive Agency; LLM04 Supply Chain; LLM05 Data and Model Poisoning; LLM06 Unbounded Consumption; LLM07 Misinformation; LLM08 Hidden Context Exposure, formerly System Prompt Leakage; LLM09 Vector and Embedding Weaknesses; LLM10 Improper Output Handling; boundary with the Agentic Top 10 stated in the preface; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[19] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems inconsistent with intended use). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[20] Agent2Agent (A2A) Protocol Specification, v1.0 (releases v1.0.0 on 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, optional JWS signature over JCS-canonicalised JSON; security schemes; servers MUST authenticate every incoming request; authorisation implementation-specific; in-task authorisation via TASK_STATE_AUTH_REQUIRED and its unspecified scope and revocation semantics; Cancel Task not guaranteed). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[21] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 5(1)(c) data minimisation and 5(1)(e) storage limitation; Art. 17 right to erasure. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[22] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP, goose and AGENTS.md). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[23] General-Purpose AI Code of Practice, Safety and Security chapter, Appendix 1.3 sources of systemic risk (capabilities to operate autonomously and to use tools; propensities incl. colluding and mis-coordination with other AI systems; affordances incl. access to tools and level of human oversight) and Appendix 1.4 specified systemic risks (incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[24] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group; WG state "Waiting for Write-Up"; propagation of user identity, workload identity and authorisation context through a call chain within a trust domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[25] Workload Identity in Multi System Environments (WIMSE) working group, charter. IETF. 2026. https://datatracker.ietf.org/wg/wimse/about/ (verified: primary)
[26] OpenTelemetry semantic conventions for generative AI (status Development; agent spans create_agent, invoke_agent, invoke_workflow, plan; execute_tool span and gen_ai.tool.* attributes, arguments and results opt-in; memory operations; gen_ai.agent.id, .name, .version; MCP conventions mcp.method.name, mcp.session.id). OpenTelemetry. 2026. https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai (verified: primary)
[27] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI with ITL; three pillars; RFI on AI agent security; AI agent identity and authorization concept paper; listening sessions). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[28] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (Agentic Trust Framework; Autonomous Action Runtime Management framework; Catastrophic Risk Annex; STAR for AI). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[29] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[30] WIT-SVID (SPIFFE specification; Stability: Incubating; a sub-profile of the Workload Identity Token of the IETF WIMSE working group). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-specs/wit-svid/ (verified: primary)
