---
lang: de
source: bok/04-the-stack.md
sourceHash: "70613b3c9beac9bd4322bd76445b643bbf981c8dc8701bbc0ac1f82996da262e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 04. Der Stack (fünf Schichten)

> Die Referenzarchitektur der KI-Governance-Engineering: fünf Schichten, die die drei Fragen
> beantworten, wobei Evidence am unteren Ende produziert und am oberen Ende nachgewiesen wird.

## So lesen Sie den Stack

Der Stack ist kein Organigramm und keine Reifeleiter. Es ist eine Build-Reihenfolge. Jede Schicht
produziert ein Artefakt, das die darüber liegende Schicht verbraucht, sodass Governance nicht länger
eine Reihe paralleler Dokumente ist, sondern ein einzelnes System mit einem Datenpfad von Policy zu
Proof.

Lesen Sie es entlang einer Wirbelsäule: **Policy → Inventory → Evals → Runtime → Assurance**. Sie
schreiben die Regel als Code (Schicht 01). Sie können eine Regel nicht gegen ein System durchsetzen,
das Sie nicht sehen können, also inventarisieren Sie, was läuft (Schicht 02). Sie können nicht
behaupten, dass ein System die Regel erfüllt, ohne einen Test, der fehlschlagen kann, also führen
Sie Evals als Nachweis aus (Schicht 03). Regeln und Tests verfallen in dem Moment, in dem sich das
System ändert, also halten Sie die Linie zur Laufzeit (Schicht 04). Und nichts davon ist für einen
Auditor wertvoll, wenn die Evidence nicht emittiert, signiert und abfragbar ist, also schließen Sie
mit kontinuierlicher Assurance ab (Schicht 05).

**Evidence fließt nach oben.** Ein Policy-Verdikt aus Schicht 01, ein Registry-Eintrag aus Schicht
02, ein Eval-Ergebnis aus Schicht 03 und eine Guardrail-Entscheidung aus Schicht 04 sind nicht vier
getrennte Datensätze. Jeder ist ein strukturiertes Artefakt mit einem Zeitstempel und einem
Eigentümer, und Schicht 05 ist der Ort, an dem sie in auditfähige Nachweise aggregiert werden. Der
Test des gesamten Stacks ist der Test aus der These: Wie Ayoub Fandi es ausdrückt, ist ein grünes
Dashboard über einer defekten Kontrolle "Theater mit zusätzlichen Schritten" [1]. Der Stack ist die
Rohrleitungen, die das Dashboard bedeutsam machen: Jede grüne Zelle führt zu einer laufenden
Kontrolle und der Evidence, die sie emittiert hat.

Die fünf Schichten, genau benannt und in Reihenfolge, sind:
**01 Govern-as-Code · 02 Inventory & Transparency · 03 Evals & Red Teaming as Evidence · 04 Runtime Controls & Observability · 05 Assurance & Continuous Compliance.**
Sie werden auf die drei Fragen abgebildet, die die Disziplin jederzeit beantworten muss. Schicht 02
beantwortet *welche KI läuft*. Schichten 01 und 04 beantworten *was sie tun darf*: Schicht 01
schreibt die Grenze als Code und Schicht 04 setzt sie auf dem Live-Call durch, unter der eigenen
Identität und dem Umfang des Agenten. Schichten 03 und 05 beantworten *welche Evidence es beweist*.
Die Bedrohungen, gegen die die Kontrollen gebaut werden (Goal Hijack, Tool Misuse, Agent Identity
and Privilege Abuse, Rogue Agents), sind in OWASPs Top 10 for Agentic Applications 2026
katalogisiert [2].

Drei dieser Schichten werden geerbt, nicht erfunden. Govern-as-Code (01), Inventory & Transparency
(02) und Assurance & Continuous Compliance (05) stammen fast unverändert aus der GRC-Engineering:
Policy as Code, das Asset-Inventar und maschinenlesbare Evidence sind ihre etablierte Praxis, und
die KI-spezifischen Datensätze (das Agentenregister, die AIBOM) erweitern sie eher, als sie zu
ersetzen. Schichten 03 und 04 (Evals und Red-Teaming als Kontrollen sowie Agent Identity und Runtime
Control) sind das, was KI die Disziplin zwingen muss hinzuzufügen, weil ein Modell, dessen Verhalten
getestet werden muss, und ein autonomer Akteur, der unter delegierter Autorität handelt, kein
Analogon in klassischer GRC haben. Die neue Arbeit konzentriert sich dort; der Rest ist eine
Spezialisierung einer Methode, die bereits funktioniert.

Jedes unten genannte Tool ist ein Beispiel einer Kategorie, keine Empfehlung. Die Kategorien sind
die Substanz; die Marken sind illustrativ und austauschbar.

## Schicht 01: Govern-as-Code

**Was es beweist.** Dass eine Governance-Regel als ausführbares Artefakt existiert, nicht als
Absatz, und dass sie eine spezifische Änderung bewertet und eine Entscheidung zurückgegeben hat. Der
Nachweis ist ein Policy-Verdikt, der an einen Commit, einen Pull Request oder einen Deploy gebunden
ist, maschinenlesbar und reproduzierbar.

**Die Artefakte.** Ein KI-Governance-Engineer liefert Policy-as-Code: Regeln, die in einer
Policy-Sprache geschrieben sind, die eine Pipeline bewertet. Typische Artefakte sind eine
Policy-Bibliothek unter Versionskontrolle, eine Reihe von Crosswalks, die jede Policy den Frameworks
zuordnen, die sie bedient, und die CI/CD-Verkabelung, die die Policy am richtigen Gate ausführt.
Eine Policy in dieser Schicht ist klein und testbar: "Inferenz für diese Datenklasse darf nicht
außerhalb der zulässigen Region weitergeleitet werden", "Keine Model-Bereitstellung ohne
registrierten Eigentümer und bestandenes Eval Gate", "Ein Agent darf kein Tool-Scope gewährt werden,
das er nicht deklariert hat". Jede Regel trägt eine menschenlesbare Absichtserklärung als
Dokumentation, aber die durchgesetzte Version ist der Code.

**Referenztools und Standards (illustrativ).** Policy-Engines drücken Allow/Deny-Logik aus.
`OPA/Rego` ist der allgemeine Standard für nicht-Autorisierungs-Policy (Datenresidenz,
Deploy-Gating, Konfigurationsbeschränkungen), während `Cedar` enger ist: eine Autorisierungssprache,
am stärksten für "darf dieser Principal diese Aktion auf dieser Ressource durchführen?" und ein
schlechter Fit für Policy, die keine Zugriffsentscheidung ist. Wählen Sie nach der Form der Regel,
nicht nach der Marke. Über allgemeine Engines hinaus ist ein vorgeschlagener Ansatz Policy Cards:
ein Forschungsvorschlag für ein maschinenlesbares, Deployment-Layer-Artefakt, das operative,
regulatorische und ethische Einschränkungen für einen Agenten kodiert und sie mit Durchsetzungs- und
Audit-Pipelines verknüpft [3]; es ist ein einzelnes Preprint, vielversprechend aber noch kein
Standard, und der Punkt, den es macht, dass die Regel mit dem Agenten als Daten reisen sollte, steht
unabhängig davon, welches Format gewinnt. Crosswalks referenzieren die Frameworks selbst: ISO/IEC
42001 (das KI-Managementsystem), NIST AI RMF und seine vier Funktionen (Govern, Map, Measure, Manage
[4]), die EU AI Act und die CSA AI Controls Matrix (AICM) v1.1, die 247 Kontrollobjektive über 18
Domänen als Kontrollvokabular zum Abbilden bietet [5]. Anbieter sind illustrativ; die Standards sind
es nicht.

**Definition of Done.**

- Jede Policy existiert als Code in einem Repository, mit einem Test, der beweist, dass sie bei
  einer verletzenden Eingabe ausgelöst wird und eine saubere besteht.
- Jede Policy deklariert die Framework-Klauseln, auf die sie sich abbildet, sodass der Crosswalk aus
  dem Code generiert wird, nicht daneben gepflegt.
- Mindestens eine Policy läuft vor dem Merge und blockiert den Merge bei Fehler; mindestens eine
  läuft bei Deploy oder Admission und blockiert die Freigabe.
- Eine Änderung an einer Policy ist ein überprüfbarer Diff mit einem Eigentümer und einem
  Gültigkeitsdatum.
- Die Policy-Engine emittiert ein strukturiertes Verdikt (Allow/Deny, Rule ID, Input Hash,
  Zeitstempel) für jede Bewertung.

**Anti-Patterns.**

- Die "Policy-Bibliothek", die ein Ordner von Word-Dokumenten ist, die niemand abfragen kann,
  durchgesetzt per E-Mail und selbst attestiert in einer Tabelle.
- Der Crosswalk, der als 300-Zeilen-Matrix in einem separaten Tool gepflegt wird, driftet von den
  Policies ab, die er beschreiben soll: Abdeckung als Kontrolle präsentiert.

**Evidence zur nächsten Schicht.** Das Policy-Verdikt ist das erste Evidence-Artefakt. Aber ein
Verdikt ist nur gegen ein bekanntes Objekt aussagekräftig: "Deploy von Modell X ablehnen" setzt
voraus, dass der Stack weiß, dass Modell X existiert, wer es besitzt und was es ist. Dieses Objekt
ist das, was Schicht 02 liefert.

> **In der Praxis** Für `csa-01`, einen Kundenservice-Assistenten bei einem großen
> Telekommunikationsunternehmen, lief eine als `OPA/Rego` geschriebene Datenresidenz-Regel sowohl in
> CI als auch bei der Zulassung und blockierte jede Bereitstellung, die ihre Inferenz außerhalb der
> zulässigen Region leitete. Der Wert lag nicht in der Regel selbst, sondern darin, dass die
> durchgesetzte Version ein Urteil ausgab, das jeder Ingenieur vor dem Merge sehen konnte.

**Zuordnung:** EU AI Act Art. 9 (Risikomanagement) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM
· OWASP Agentic ASI02/ASI03. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Schicht 02: Inventory & Transparency

**Was es beweist.** Dass die Organisation weiß, welche KI läuft (welche Modelle, Systeme und Agenten
live sind, in welcher Version, wem gehören), und dass jedes die Transparenzdokumentation hat, die
eine Verpflichtung verlangt. Der Beweis ist ein Registereintrag und seine beigefügten Dokumente,
idealerweise von einer Bereitstellungs-Pipeline geschrieben, nicht von Hand eingegeben.

**Die Artefakte.** Das Kernartefakt ist das **Agentenregister**: das laufzeitbewusste Verzeichnis
jedes Modells, jedes Service und jedes Agenten, jeweils mit Eigentümer, Umfang und Status. Darum
herum sitzen die Transparenzdokumente (Model Cards und Data Cards) und die **AIBOM**, die Stückliste
für ein KI-System. FRIA- und DPIA-Referenzen hängen am Registereintrag für Systeme, die sie
benötigen, sodass das Verzeichnis auch der Index ist, welches System welche Folgenabschätzung hat.

**Referenzwerkzeuge und Standards (illustrativ).** Register reichen von ITSM- und Governance-Suiten
(zum Beispiel ServiceNow, Credo AI) bis zu Agent-Discovery-Tools (zum Beispiel Zenity), die KI
finden, die das Verzeichnis nicht kannte. Die AIBOM hat Standardformate: CycloneDX ML-BOM und das
SPDX 3.0 AI-Profil, wobei der OWASP AIBOM-Generator CycloneDX-Ausgabe erzeugt [6]. Der Unterschied
zu einer klassischen SBOM ist wichtig: Eine AIBOM erfasst Modelle, Datensätze, Gewichte und deren
Herkunft, nicht nur Software-Abhängigkeiten. Das Register ist das Objekt, das die Richtlinien von
Schicht 01 evaluieren und die Laufzeitkontrollen von Schicht 04 daran anhängen; ohne einen
Laufzeit-Datenpfad, der es speist, ist es eine Tabelle, die am Tag ihrer Bearbeitung wahr war.

**Definition of Done.**

- Jedes Modell, System und Agent in Produktion hat einen Registereintrag mit Eigentümer, Version und
  erklärtem Umfang; ein nicht registriertes Artefakt kann nicht in Produktion gehen.
- Das Register wird von der Bereitstellungs-Pipeline gespeist, nicht durch manuelle Eingabe; eine
  neue Bereitstellung registriert sich selbst.
- Jedes Hochrisiko-System verlinkt auf seine Model Card, Data Card und, wo erforderlich, seine
  FRIA/DPIA.
- Eine AIBOM wird beim Build für jedes KI-System erzeugt und mit dem Registereintrag gespeichert.
- Ein Discovery-Mechanismus gleicht das Register regelmäßig mit dem ab, was tatsächlich läuft, und
  kennzeichnet Drift.

**Anti-Patterns.**

- Das von Hand gepflegte Modellverzeichnis, das die Frage „was läuft?
- Transparenzdokumente, die einmal beim Start geschrieben und nie neu generiert werden, wenn sich
  das Modell, der Prompt oder der Datensatz ändert: eine Model Card, die ein Modell beschreibt, das
  es nicht mehr gibt.

**Evidenz für die nächste Schicht.** Der Registereintrag benennt das zu testende Objekt. Eine Eval
in Schicht 03 wird *gegen eine registrierte Version* ausgeführt und ihr Ergebnis wird *gegen diesen
Eintrag* archiviert, sodass die Frage "wurde dieses Modell getestet?" durch einen Join beantwortet
wird, nicht durch eine Suche. Das AIBOM teilt der Eval-Schicht mit, was zu testen ist: welches
Modell, welche Datensätze, welche Herkunftsansprüche adversariales Testen benötigen.

> **In der Praxis** Die Verbindung des Registers mit der Deployment-Pipeline (sodass `csa-01` sich
> selbst mit einem Eigentümer und einem Geltungsbereich zur Deploy-Zeit registrierte) verwandelte
> "dokumentiert" in "governed". Sein Registereintrag wurde zu einer Abfrage, die aus der Produktion
> beantwortet wird, nicht aus einer Folie.

**Zuordnung:** EU AI Act Art. 11 (technische Dokumentation), Art. 49/71 (Registrierung und
EU-Datenbank), Art. 50 (Transparenz) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP Agentic
ASI10.

## Schicht 03: Evals & Red Teaming as Evidence

**Was es beweist.** Dass das Modell oder der Agent einen definierten Test bestanden hat, dessen
Ausfall Konsequenzen hat. Dies ist die Schicht, in der das Prinzip "gib jedem Control Zähne" für
Evals konkret wird: ein Benchmark, der nur ein Komitee informiert, ist kein Control; eine Eval, die
in ein **Eval Gate** verdrahtet ist und den Build fehlschlagen lassen kann, ist es. Der Beweis ist
ein strukturiertes Eval-Ergebnis: Bestanden oder Nicht-Bestanden gegen einen Schwellenwert,
versioniert zusammen mit dem Modell, das es getestet hat.

**Die Artefakte.** Ein Engineer liefert Eval-Suites und das Gate, das sie ausführt. Drei Familien
treten wiederholt auf: Capability- und Quality-Evals (macht das System seine Aufgabe: Grundiertheit,
Regression gegen einen Golden Set), adversariale und Red-Team-Evals (widersteht es Jailbreaks,
Prompt-Injection, Tool-Missbrauch), und Safety-Threshold-Evals, die an eine Policy aus Schicht 01
gebunden sind (eine PII-Leakage-Grenze, ein Injection-Resistance-Minimum). Das Gate ist eine
Pipeline-Stufe: Wenn die Eval unter den vereinbarten Schwellenwert fällt, schlägt die Pipeline fehl
und das Release wird nicht ausgeliefert.

**Referenztools und Standards (illustrativ).** Evaluierungs-Frameworks wie Inspect (gepflegt im
Auftrag des UK AI Security Institute [7]), promptfoo und DeepEval führen Capability- und
Regressions-Suites aus; Garak, Mindgard und Giskard führen adversariale und Vulnerability-Probes
aus; Ragas deckt Retrieval-Augmented-Qualität ab. Adversariales Testen ist nicht nur Best Practice:
der GPAI Code of Practice listet adversariales Testen und Red-Teaming unter den Evaluierungsansätzen
auf, die von GPAI-Modellen mit systemischem Risiko erwartet werden, obwohl der Code freiwillig ist
und auf diese Modelle beschränkt [8]. Das Eval-Ergebnis ist das Evidenz-Artefakt, das Schicht 05
aggregieren wird, weshalb es maschinenlesbar sein muss, nicht ein Screenshot, der in eine Folie
eingefügt wird.

**Definition of Done.**

- Jedes Modell oder jeder Agent hat eine Eval-Suite, die im selben Repository versioniert und
  aktualisiert wird, wenn sich das System ändert.
- Mindestens eine adversariale Eval und eine Capability-Eval laufen in CI mit einem dokumentierten
  Schwellenwert.
- Eine fehlgeschlagene Eval blockiert das Deployment; das Gate hat Zähne, nicht nur einen Report.
- Jeder Eval-Lauf gibt ein strukturiertes Ergebnis aus (Suite-ID, Modellversion, Score,
  Schwellenwert, Bestanden/Nicht-Bestanden, Zeitstempel), das gegen den Registereintrag archiviert
  wird.
- Schwellenwerte lassen sich auf einen benannten Fehlermodus oder eine Verpflichtung zurückführen,
  nicht auf eine zur Beruhigung gewählte runde Zahl, und die Sicherheit, die sie fordern, folgt dem
  Risiko-Tier (Kapitel 11 setzt die
  [nach Risiko-Tier erforderliche Sicherheit](/bok/ai-defined#certainty-required-by-risk-tier);
  Kapitel 14 dimensioniert die Suite für die
  [statistische Validität von Evals](/bok/governing-development#statistical-validity-of-evals)).

**Anti-Patterns.**

- Die einmalige Vor-Launch-Evaluierung, deren Ergebnisse in eine Folie eingefügt und nie neu
  ausgeführt werden, wenn sich das Modell oder seine Prompts ändern.
- Das "Risk Review Board", das Erkenntnisse monatlich als niedrig/mittel/hoch bewertet, aber keinen
  Mechanismus hat, um einen bereits geplanten Launch zu stoppen: Empfehlung ohne Konsequenz. Die
  Lösung ist ein Komitee, das entscheidet, welcher Code nicht kann, während die Gates die
  Entscheidung durchsetzen
  ([das Komitee entscheidet, die Gates setzen durch](/bok/governance-program#the-committee-decides-the-gates-enforce),
  Kapitel 12), mit dem Risikoappetit
  [in Gates kompiliert](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates)
  (Kapitel 13).

**Evidenz für die nächste Schicht.** Eine Eval beweist, dass das System *zur Testzeit* sicher war.
Das System trifft dann auf Eingaben, die keine Eval antizipiert hat. Schicht 04 trägt die gleichen
Schwellenwerte als Runtime-Guardrails in die Produktion, und das Eval-Ergebnis wird zur Baseline,
gegen die Telemetrie live verglichen wird. Ein Rückgang der Live-Injection-Resistance gegen die
getestete Baseline ist ein Signal, keine Überraschung.

> **In der Praxis** Eine Red-Team-Eval-Suite, die Inspect und Garak kombiniert, lief in CI für
> `csa-01`; ein Release, das seine Injection-Resistance unter die vereinbarte Grenze senkte,
> schlugen die Pipeline fehl, bis es behoben wurde. Die Ausgabe der Eval, nicht die Meinung eines
> Reviewers, war die Assurance-Evidenz, die gegen die Modellversion archiviert wurde.

**Zuordnung:** EU AI Act Art. 15 (Genauigkeit, Robustheit, Cybersicherheit), Art. 55 (Bewertung
systemischer Risiken bei KI-Modellen mit allgemeinem Verwendungszweck) · ISO/IEC 42001 · NIST AI RMF
(Measure) · CSA AICM · OWASP Agentic ASI01/ASI02.

## Schicht 04: Runtime Controls & Observability

**Was es beweist.** Dass die Kontrollen während des Handelns des Systems greifen und dass sein
Verhalten beobachtet wird. Richtlinien und Evals sind Momentaufnahmen; Agenten handeln
kontinuierlich auf Eingaben, die niemand überprüft hat. Diese Schicht beweist, dass ein Guardrail
einen echten Aufruf vermittelt hat, dass ein Agent unter seiner eigenen Identität und seinem
Geltungsbereich gehandelt hat, und dass es einen getesteten Weg gibt, ihn zu stoppen. Der Beweis ist
ein Strom von Laufzeitentscheidungen und Traces.

**Die Artefakte.** Drei Gruppen. Guardrails: Input-/Output-Filter, Tool-Call-Vermittlung, der
Durchsetzungspunkt, an dem eine Richtlinie aus Schicht 01 gegen eine Live-Anfrage greift.
Observability: Tracing und Monitoring, die das Verhalten von Agenten in ein Kontrollsignal
umwandeln. Agent-Laufzeit-Identität: Jeder nicht-menschliche Akteur mit seiner eigenen
Workload-Identität, einem begrenzten Geltungsbereich und einem **Kill Switch**, einem getesteten
Weg, um den Zugriff zu widerrufen und einen Agenten zu stoppen, ohne die Fleet zu beschädigen.
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt: Kein Agent handelt, bevor er eine
Identität, einen Besitzer und einen Geltungsbereich hat. Ein **Guardian Agent**, ein Agent, dessen
Aufgabe es ist, andere Agenten zur Laufzeit zu überprüfen, einzuschränken oder zu stoppen, ist eine
Möglichkeit, den Vermittlungspunkt zu bauen; er ist selbst ein Agent, daher benötigt er seine eigene
Identität, seinen Geltungsbereich und seinen Kill Switch, und seine Entscheidungen sind Nachweise
wie die eines anderen Guardrails [16]. Kapitel 23 behandelt
[die Governance von KI-Agenten](/bok/governing-agents#what-makes-an-agent-a-governance-object) von
Anfang bis Ende, einschließlich
[Identität, Delegation und MCP-Autorisierung für Agenten](/bok/governing-agents#identity-and-short-lived-credentials).

**Referenzwerkzeuge und Standards (illustrativ).** Guardrail-Frameworks wie NVIDIA NeMo Guardrails,
Meta LlamaFirewall und Lakera erzwingen Input/Output- und Tool-Call-Richtlinien; Observability-Tools
wie Langfuse und Arize Phoenix bauen auf OpenTelemetry auf, um Agent-Läufe zu verfolgen.
Agent-Identität hat zwei unterschiedliche Fragen, die die Tools nicht verschwimmen lassen sollten.
Die erste ist **Channel-Authentifizierung**: wie sich ein Client gegenüber einem Tool-Server in
einem Hop authentifiziert. Die Model Context Protocol-Spezifikation vom 2026-07-28 verschärfte genau
dies: Dynamic Client Registration wurde zugunsten von Client ID Metadata Documents eingestellt und
Anmeldedaten an ihren Aussteller gebunden [9]. Das verhärtet die MCP-Verbindung; es ist nicht das
Identitätsmodell für den Agent. Die zweite ist **Agent-Workload-Identität**: eine dauerhafte,
zurechenbare Identität, die der Agent über jeden Hop, jedes Tool und jedes Protokoll hinweg trägt,
unter der seine Aktionen protokolliert und sein Zugriff widerrufen werden. Das ist die Aufgabe eines
Workload-Identity-Systems wie SPIFFE/SPIRE oder First-Class-Agent-Identitäten von
Enterprise-Anbietern (zum Beispiel Microsoft Entra Agent ID, Okta Agent SSO), nicht von MCP, das
einen Kanal sichert. Die Vermischung der beiden hinterlässt einen Agent, der auf dem MCP-Hop gut
authentifiziert ist, aber überall sonst nicht zurechenbar. NISTs NCCoE stellte die offenen Fragen in
seinem Konzeptpapier vom Februar 2026 zur Software- und KI-Agent-Identität und -Autorisierung dar:
wie Identifikation, Authentifizierung und Autorisierung angewendet werden, damit jeder Agent
"bekannt, vertrauenswürdig und ordnungsgemäß gesteuert" ist, einschließlich Nichtabstreitbarkeit und
manipulationssicherer Protokollierung [10]. Gartner erwartet, dass bis 2029 mehr als die Hälfte
erfolgreicher Angriffe auf KI-Agenten Schwachstellen in der Zugriffskontrolle und Prompt-Injection
ausnutzen werden [11], die Fehlermodi, die diese Schicht eindämmen soll.

**Definition of Done.**

- Jeder Agent läuft unter seiner eigenen Identität mit einem deklarierten Umfang; kein Agent teilt
  ein Service-Konto oder einen statischen Schlüssel über Funktionen hinweg.
- Ein Guardrail vermittelt Tool-Aufrufe und Input/Output für jeden Agent und erzwingt den im
  Register deklarierten Umfang.
- Ein Kill Switch existiert und wurde getestet: das Widerrufen des Zugriffs eines Agenten bricht die
  anderen nicht.
- Jeder Agent-Lauf wird verfolgt, und Traces tragen die Agent-Identität, die aufgerufenen Tools und
  die Richtlinienverdikt, die ausgelöst wurden.
- Laufzeitsignale werden mit der Eval-Baseline aus Schicht 03 verglichen, und eine Regression löst
  einen Alert aus.

**Anti-Patterns.**

- Eine Flotte von Agenten, die einen API-Schlüssel und ein privilegiertes Service-Konto teilen: ein
  Incident bedeutet, einen Schlüssel zu rotieren und alles zu unterbrechen, und Zurechnung ist
  unmöglich.
- Guardrails, die protokollieren, aber nie blockieren: Observability mit Kontrolle verwechselt,
  sodass das System sich selbst mit hoher Auflösung beim Fehlschlag beobachtet.

**Evidenz zur nächsten Schicht.** Jede Guardrail-Entscheidung, jeder Trace und jedes
Identitätsereignis ist ein zeitgestempelter, strukturierter Datensatz. Schicht 05 sammelt diese
Evidenz nicht neu; sie abonniert sie. Laufzeit ist, wo kontinuierliche Assurance ihre Kontinuität
bekommt: der Unterschied zwischen einer Attestation, dass eine Kontrolle existierte, und Evidenz,
dass sie ausgelöst wurde, bei einem bestimmten Aufruf, zu einer bestimmten Zeit.

> **In der Praxis** `csa-01` wurde eine unterschiedliche Workload-Identität mit einem Besitzer und
> einem deklarierten Umfang zugewiesen, ebenso wie jeder andere Agent im
> Telekommunikationsunternehmen; wenn es sich falsch verhielt, wurde es seiner Identität zugeordnet
> und widerrufen, ohne die anderen zu berühren. Der Kill Switch wurde nach einem Zeitplan getestet.
> Ein nicht getesteter Kill Switch ist eine Behauptung, keine Kontrolle.

**Zuordnung:** EU-KI-Verordnung Art. 14 (menschliche Aufsicht), Art. 15 (Robustheit,
Cybersicherheit), Art. 12 (Protokollierung) · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM ·
OWASP Agentic ASI02/ASI03/ASI10.

## Schicht 05: Assurance & Continuous Compliance

**Was es beweist.** Dass die Kontrollen darunter funktionieren, kontinuierlich, und dass der Beweis
maschinenlesbar und auditfähig ist. Hier hört Evidenz auf, ein Nebenprodukt zu sein, und wird zum
Produkt: die Audit ist eine Abfrage, kein Projekt. Der Beweis ist ein Live-Assurance-Speicher, in
den jede der unteren Schichten schreibt und den ein Auditor lesen kann.

**Die Artefakte.** Maschinenlesbare Evidenz in einem Standardformat; Framework-Mappings, die aus
dieser Evidenz generiert werden, anstatt neben ihr gepflegt zu werden; und die Incident- und
Reporting-Infrastruktur, die ein Laufzeitsignal in eine pünktlich erfüllte Verpflichtung umwandelt.
Das organisierende Format ist `OSCAL`. Sein stabiles Substrat ist NISTs natives Modell: eine
Kontrollschicht (`catalog`, `profile`), eine Implementierungsschicht (`component-definition`,
`system-security-plan`) und eine Bewertungsschicht (`assessment-plan`, `assessment-results`,
`POA&M`), mit Rückverfolgbarkeit von einem Bewertungsergebnis zurück zur Kontrolle, die es getestet
hat [15]. Dieses Modell ist der Teil, auf dem man aufbauen sollte; die KI-spezifischen Ergänzungen
oben bilden sich noch. Ein vorgeschlagener Ansatz (ein einzelnes Preprint von 2026, kein Standard)
erweitert OSCAL um sechzehn Eigenschaftserweiterungen für Lebenszyklusphase, Durchsetzungssemantik
und Risiko-Rückverfolgbarkeit in einer dreischichtigen Compliance-as-Code-Architektur, die
OSCAL-Bewertungsergebnisse automatisch generiert [12]. Behandeln Sie es als eine frühe Antwort auf
eine echte Lücke, die die Autoren gut benennen: Frameworks "wie die EU-KI-Verordnung, ISO/IEC 42001
und NIST AI RMF geben an, was zu versichern ist, bieten aber kein ausführbares Format für wie" [12].
Die Lücke ist das, was Schicht 05 schließt; die nativen OSCAL-Bewertungsmodelle schließen die
meisten davon heute, mit oder ohne die Erweiterungen.

**Referenzwerkzeuge und Standards (illustrativ).** Evidenz wird als OSCAL-Komponenten- und
Bewertungsartefakte ausgegeben; GRC- und KI-Governance-Suites (zum Beispiel Vanta, Drata, OneTrust;
watsonx.governance, Holistic AI, Saidot) aggregieren und präsentieren sie. Incident-Reporting wird
auf EU-KI-Verordnung Art. 73 (schwerwiegende Vorfälle) und Art. 72 (Beobachtung nach dem
Inverkehrbringen) abgebildet. Ab 2026-09-24 wird kein harmonisierter Standard im Amtsblatt der EU
zitiert [13], daher unterstützt ein ISO/IEC 42001-Zertifikat das Qualitätsmanagementsystem nach Art.
17, erfüllt es aber nicht von selbst, und verleiht keine Konformitätsvermutung nach Art. 40 [17].

**Definition of Done.**

- Kontrollergebnisse aus Schichten 01–04 werden als maschinenlesbare Evidenz (zum Beispiel OSCAL)
  mit Zeitstempeln und Besitzern kontinuierlich ausgegeben.
- Framework-Mappings werden aus der Evidenz generiert, sodass eine Mapping-Zelle, die grün wird, auf
  eine Kontrolle hinweist, die tatsächlich ausgelöst wurde.
- Eine Frage eines Auditors wird durch eine Abfrage gegen den Evidenz-Speicher beantwortet, nicht
  durch einen Evidenz-Sammlungs-Sprint.
- Eine Incident-Pipeline mit schwerwiegenden Vorfällen kann erkennen, triage und auf der Uhr
  berichten, mit den Art. 73-Zeitplänen kodiert, nicht erinnert (Kapitel 17 behandelt
  [den Antwort-Lebenszyklus](/bok/incidents#the-response-lifecycle)).
- Der Assurance-Speicher misst tatsächliche Risikominderung (die Fehlerquote, die Zeit bis zur
  Erkennung, der Blast-Radius), nicht die Framework-Abdeckung.

**Anti-Patterns.**

- Der Attestations-Binder, eine Woche vor einer Audit zusammengestellt, beschreibt Kontrollen, wie
  sie sich vorgestellt wurden, nicht wie die Produktion sich verhielt.
- Ein "Compliance-Score" von einer geschlossenen Plattform, der nicht auf eine einzelne laufende
  Kontrolle zurückgeführt werden kann, dessen Datenpfad beim Spreadsheet-Import endet.

**Evidenz schließt die Schleife.** Assurance ist nicht die Spitze einer Einbahnstraße. Ein Rückgang
einer Live-Metrik speist sich in Schicht 03 als neue Eval, in Schicht 01 als verschärfte Richtlinie
und in Schicht 02 als Register-Flag zurück. Der Stack ist eine Schleife, die zufällig als Leiter
gezeichnet wird.

> **In der Praxis** `csa-01`s Guardrail-Entscheidungen, Eval-Ergebnisse und Richtlinienverdikt
> strömten in einen Assurance-Speicher mit Zeitstempeln, sodass der Status einer Kontrolle eine
> Live-Abfrage war, keine jährliche Unterzeichnung. Als ein Auditor fragte, was seine
> Datenresidenz-Kontrolle im zweiten Quartal tat, war die Antwort ein Filter über ausgegebene
> Evidenz, in Minuten produziert.

**Zuordnung:** EU-KI-Verordnung Art. 17 (Qualitätsmanagementsystem), Art. 72 (Beobachtung nach dem
Inverkehrbringen), Art. 73 (Meldung schwerwiegender Vorfälle) · ISO/IEC 42001, ISO/IEC 42005 · NIST
AI RMF (Govern, Manage) · CSA AICM.

## Datenverwaltung über den Stack

Die fünf Schichten steuern Modelle und Agenten; sie sind nur so solide wie die Daten darunter, und
Datenverwaltung ist nicht eine Schicht, sondern ein Faden durch alle fünf. Trainingsdaten,
Fine-Tuning-Sets, Abruf-Korpora, Prompts und Outputs tragen jeweils eine rechtliche Grundlage, eine
Herkunft, eine Aufbewahrungsfrist und eine Reihe von Rechten, und jedes ist ein Objekt, das der
Stack benennen können muss. In Schicht 02 ist dies die **Data Card** und der Lineage-Datensatz
(woher ein Datensatz kam, wofür er verwendet werden darf, wann er gelöscht werden muss), angehängt
an den Register-Eintrag neben der Model Card. In Schicht 01 ist es Aufbewahrungs- und
Residenz-Richtlinie als Code, mit
[Datenschutz durch Technikgestaltung und datenschutzfreundliche Voreinstellungen](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets)
(Kapitel 19), wo personenbezogene Daten betroffen sind. In Schicht 03 sind es Datenqualitäts- und
Bias-Tests, die gegen den Set durchgeführt werden, nicht angenommen, hinter einem
[Dataset Admission Gate](/bok/governing-development#data-for-training-and-testing) (Kapitel 14);
Kapitel 16 legt dar,
[welche Daten Sie benötigen, um auf Bias zu testen](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
Die EU-KI-Verordnung behandelt dies als eine erstklassige Pflicht: Artikel 10 verlangt
repräsentative, relevante und fehlergeprüfte Datensätze für Hochrisiko-Systeme, und der
Post-Omnibus-Artikel 4a gibt eine enge rechtliche Grundlage, um Daten besonderer Kategorien *zur
Bias-Erkennung* zu verarbeiten, bedingt durch Pseudonymisierung und Löschung, sobald Bias korrigiert
ist (siehe Kapitel 08). Das Engineering-Engagement ist, dass ein RAG-Korpus wie ein Modell gesteuert
wird: versioniert, seine Herkunft und Lizenz im AIBOM aufgezeichnet, sein Snapshot an die Eval
gebunden, die das System darauf getestet hat, sodass "was war im Korpus, als diese Antwort
produziert wurde?" eine Abfrage ist, keine Vermutung. Prompts, abgerufene Passagen und Outputs zur
Laufzeit benötigen die gleichen Regeln
([Inferenzzeit-Datenverwaltung](/bok/governing-deployment#inference-time-data-governance), Kapitel
15). Daten ohne Card, ohne Lineage und ohne Aufbewahrungsregel sind das ungovernte Objekt, das jede
Schicht darüber unbeweisbar macht.

## Gestaltung menschlicher Aufsicht (Artikel 14)

Menschliche Aufsicht ist eine Kontrolle, die zu konstruieren ist, nicht eine Zusicherung, die zu
behaupten ist. Artikel 14 der KI-Verordnung der EU verlangt, dass Hochrisiko-Systeme so gestaltet
werden, dass eine Person sie *wirksam* überwachen kann (die Ausgabe verstehen, dagegen entscheiden
und das System stoppen), und die schwierige Seite ist, dass undifferenzierte Aufsicht in beide
Richtungen fehlschlägt. Menschliche Überprüfung jeder Aktion zerstört den Wert der Automatisierung;
nominale Aufsicht über einen Datenstrom von Aktionen ist ein Gummistempel, und ein Gummistempel ist
schlimmer als gar keine, weil er die Entscheidung legitimiert. Zwei Fehlermodi müssen explizit
konstruiert werden. **Automatisierungsverzerrung**: Ein Prüfer, der eine sichere Maschinenausgabe
sieht, wird dazu neigen, sie zu bestätigen, daher ist eine Aufsicht, die nur "genehmigen/ablehnen"
zum Vorschlag des Modells anbietet, nur dem Namen nach Aufsicht.
**Aufsicht, die sich verschlechtert**: Ein Gate, das eine Person unter Last in zwei Sekunden
passieren kann, wird in zwei Sekunden passiert, und seine Qualität sinkt stillschweigend, wenn das
Volumen steigt. Die technische Antwort ist, Aktionen nach Konsequenz zu klassifizieren und einen
konstruierten Kontrollpunkt nur dort zu platzieren, wo die Einsätze die Latenz rechtfertigen (das
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate)-Muster in Kapitel 05), dem Prüfer
genug Kontext geben, um nicht zuzustimmen, den Genehmiger und die Entscheidung als Nachweis
protokollieren und die Aufsicht selbst überwachen (Genehmigungsrate, Zeit bis Entscheidung,
Außerkraftsetzungsrate) als Signal, das sich verschlechtern kann. Aufsicht, die Sie nicht messen,
ist Aufsicht, die Sie nicht beanspruchen können. Die
[Human-in-the-loop, On-the-loop und In-Command](/bok/principles-and-standards#eu-hleg-guidelines-and-altai)-Ansätze
der EU-Hochrangigen Expertengruppe (Kapitel 22) benennen die Platzierungsentscheidungen, und Kapitel
16 testet, ob Erklärungen Prüfern tatsächlich helfen, Automatisierungsverzerrung zu widerstehen
([Erklärungsqualität testen](/bok/fairness-and-explainability#testing-explanation-quality)).

## KI von Drittanbietern und eingekaufte KI

Die meisten Organisationen trainieren nicht die Modelle, die sie ausführen. Sie kaufen SaaS mit
einem eingebetteten LLM, rufen ein API-only-Grundlagenmodell auf oder erben einen Agenten in einem
Produkt eines Anbieters; für diese degradieren die Teile des Stack, die davon ausgehen, dass Sie das
Modell besitzen. Sie können Gewichte, die Sie nicht erreichen können, nicht red-teamen, und ein
**Eval Gate** (Schicht 03) kann nur das System des Anbieters als Black Box an seiner Grenze testen,
nicht seine Interna. Laufzeitsteuerung (Schicht 04) verengt sich auf das, was die Integration
offenlegt: die Tool-Scopes, die Sie dem Agenten des Anbieters gewähren, die Identität, die Sie dem
Agenten des Anbieters ausstellen, den Traffic, den Sie beobachten können, nicht das Verhalten des
Modells selbst. Die Schichten verschwinden nicht, aber Schicht 03 schrumpft auf Grenzwert-Evals und
Verlass auf die eigenen Nachweise des Anbieters, und Schicht 04 schrumpft auf den Umkreis, den Sie
kontrollieren. Was zum Ausgleich wächst, ist Inventar und Assurance: Das System des Anbieters
benötigt immer noch einen Registereintrag, einen Besitzer und einen Scope; seine
Lieferantendokumentation, Model Card und jede AIBOM werden zu Nachweisen, die Sie sammeln, anstatt
zu produzieren; und die Due-Diligence selbst wird zu einem Gate, das in eine
[Third-Party-AI-Richtlinie](/bok/governance-program#third-party-ai-policy) geschrieben wird (Kapitel
12). Dies ist das
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate)-Muster (Kapitel
05), verankert in ISO/IEC 42001 Anhang A.10 (Beziehungen zu Drittanbietern und Kunden) und der
Aufgabenteilung der KI-Verordnung der EU zwischen Anbieter und Betreiber (siehe Kapitel 08 und
[wer Sie in der Wertschöpfungskette sind](/bok/eu-ai-act#who-you-are-in-the-value-chain) in Kapitel
18). Die Faustregel: Je weniger des Modells Sie besitzen, desto mehr Ihres Kontrollbudgets
verschiebt sich vom Testen darauf, es zu begrenzen und den Lieferanten zu belegen. Kapitel 15
behandelt die
[Entscheidung zwischen Bauen, Kaufen oder Anpassen](/bok/governing-deployment#build-buy-or-adapt)
und ihre Beweislast, und Kapitel 20 die
[Lizenzen und Schadloshaltungen eingekaufter Modelle](/bok/existing-law#model-licences-and-vendor-indemnities).

## Die Kosten des Stack

Nichts davon ist kostenlos, und eine FinOps-Zeile ist Teil der ehrlichen Governance. Die
wiederkehrenden Kosten sind Compute für Eval-Suites, die bei jeder Änderung ausgeführt werden
(adversarische Suites sind die teuren, und sie bei jedem Commit statt bei jedem Release auszuführen,
ist eine echte Rechnung), Speicher und Egress für Traces und den Evidence Store (Agent-Traces sind
ausführlich, und kontinuierliche Assurance bedeutet, sie lange genug zu behalten, um eine
Audit-Frage zu beantworten), und die Engineeringzeit, um Suites, Schwellwerte und Integrationen zu
warten, während sich die Systeme bewegen. Die Kosten skalieren mit Änderungshäufigkeit und
Trace-Volumen, daher sind die Hebel offensichtlich, sobald sie benannt werden: Teure Evals nach
Risiko samplen oder staffeln, Aufbewahrung nach Verpflichtung statt nach Standard setzen und die
billigsten Kontrollen (eine Richtlinienprüfung, ein Identity Gate) nach vorne schieben, wo sie
Fehler abfangen, bevor ein teures Eval läuft. Ein Stack, dessen laufende Kosten niemand verfolgt,
ist ein Stack, der in der ersten Budgetrunde gekürzt wird, was selbst ein Governance-Fehler ist.

## Der minimal lebensfähige Stack für ein Team von einer Person

Die meisten KI-Governance-Funktionen sind klein, und viele sind eine einzelne Person: in der
benachbarten GRC-Disziplin sind ungefähr die Hälfte der Teams vier Personen oder weniger und fast
einer von fünf (18,5%) ist ein Team von einer Person [14]. Ein Team von einer Person kann nicht alle
fünf Schichten in der Tiefe aufbauen, aber es kann das Rückgrat dünn, von Ende zu Ende aufbauen: ein
vertikaler Schnitt, der jede Schicht berührt, schlägt eine Schicht, die ausgebaut ist, und vier, die
auf dem Papier liegen. Beginnen Sie dort, wo der Hebel am höchsten und die Kosten am niedrigsten
sind:

- **Schicht 02 zuerst, minimal.** Ein Register, in das ein Deploy schreibt, mit einem Besitzer und
  einem Scope pro Eintrag. Wenn Sie "was läuft und wer besitzt es?" aus einer Live-Quelle
  beantworten können, haben Sie mehr als die meisten.
- **Eine Richtlinie in Schicht 01 mit Zähnen.** Eine einzelne Regel, die zählt (kein Deploy ohne
  registrierten Besitzer oder eine Datenresidenz-Prüfung), als Code, in der Pipeline, blockierend
  bei Fehler. Eine Kontrolle, die beißt, schlägt hundert, die empfehlen.
- **Ein Eval Gate in Schicht 03.** Ein adversarisches Eval gegen Ihren höchsten Risiko-Agenten,
  verdrahtet, so dass eine Regression den Build fehlschlagen lässt. Verwenden Sie ein offenes
  Framework; schreiben Sie nicht Ihr eigenes Harness.
- **Identität und ein Kill Switch in Schicht 04.** Jeder Agent unter seiner eigenen Identität mit
  einem Scope und eine getestete Möglichkeit, ihn zu stoppen. Dies ist die billigste Kontrolle mit
  der größten Blast-Radius-Reduktion.
- **Nachweis als Nebenprodukt in Schicht 05.** Lassen Sie jeden der obigen einen strukturierten,
  zeitgestempelten Datensatz in einen Store ausgeben. Sie bauen noch keine OSCAL-Pipeline; Sie
  weigern sich, auf Screenshots zu verlassen.

Der Auftrag ist absichtlich: sehen Sie es, regeln Sie es, testen Sie es, enthalten Sie es, beweisen
Sie es. Ein dünner vertikaler Schnitt beantwortet alle drei Fragen für ein System heute und
verbreitert sich, wenn das Team wächst. Die Alternative, eine dicke Schicht 01 von Richtlinien ohne
Inventar darunter, beantwortet keine der drei Fragen und ist genau das Framework-Theater, das die
Disziplin beenden soll. Wie viel der Risikoschleifen eine kleine Funktion läuft, wird durch die
[Tailoring-Matrix](/bok/risk-management#the-tailoring-matrix) von Kapitel 13 festgelegt.

## Ein System durch die fünf Schichten

`csa-01`, der Kundenservice-Assistent aus den obigen Feldern, ist ein System, nicht fünf. Unten ist
das einzelne Artefakt, das es bei jeder Schicht produziert: kurze Auszüge aus den in Kapitel 05
definierten Schemas, jeder illustrativ. Vollständige JSON-Schemas mit gefüllten Beispielen für diese
Datensätze und [wie man sie verwendet](/resources/templates#tpl-how), sind auf der Vorlagenseite.

**Schicht 01: Governance-as-Code.** Ein Policy Card-Urteil (illustrativ):

```json
{ "rule_id": "residency.eu-only.v3", "decision": "deny",
  "input_hash": "sha256:9f2b…", "timestamp": "2026-09-18T14:07:11Z" }
```

**Schicht 02: Inventory & Transparency.** Sein Registereintrag (illustrativ):

```json
{ "id": "csa-01", "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"], "expiry": "2026-12-17" }
```

**Schicht 03: Evals & Red Teaming as Evidence.** Ein Eval-Gate-Ergebnis (illustrativ):

```json
{ "suite_id": "injection-resistance.v4", "model_version": "csa-01@2026-09-18",
  "score": 0.982, "threshold": 0.95, "result": "pass" }
```

**Schicht 04: Runtime Controls & Observability.** Ein Guardrail-Ereignis (illustrativ):

```json
{ "agent": "csa-01", "direction": "output", "rule_id": "output.pii.v2",
  "decision": "block", "timestamp": "2026-09-18T14:31:52Z" }
```

**Schicht 05: Assurance & Continuous Compliance.** Der Nachweis, den es ausgibt (illustrativ):

```json
{ "control_id": "guardrail.output.pii.v2", "subject": "csa-01@2026-09-18",
  "decision": "alert", "obligation": "EU AI Act Art. 15",
  "timestamp": "2026-09-18T14:31:52Z" }
```

Die fünf Auszüge sind ein Datenpfad von Richtlinie zu Beweis, mit der gleichen Register-ID
verschlüsselt.

## Was Sie diese Woche tun können

1. **Zeichnen Sie einen Schnitt.** Wählen Sie ein System und schreiben Sie für jede der fünf
   Schichten das eine Artefakt auf, das es heute produziert, und das eine, das es fehlt. Die Lücken
   sind Ihr Backlog, in Build-Reihenfolge.
2. **Verdrahten Sie das Register mit dem Deploy.** Machen Sie eine Deployment-Pipeline, die den
   Registereintrag schreibt (id, owner, scope, expiry) und fehlschlägt, wenn ein Feld leer ist.
3. **Geben Sie einer Richtlinie Zähne.** Verschieben Sie eine Regel, die zählt, einen registrierten
   Besitzer oder eine Datenresidenz-Prüfung, in Code in der Pipeline, blockierend bei Fehler, und
   protokollieren Sie jedes Urteil mit seiner Regel-ID.
4. **Gaten Sie eine Version auf einem Eval.** Setzen Sie ein adversarisches Eval gegen Ihren
   höchsten Risiko-Agenten in CI, mit einem Schwellwert, der zu einem benannten Fehlermodus
   zurückverfolgt wird, so dass eine Regression den Build fehlschlagen lässt.
5. **Üben Sie einen Stopp und behalten Sie den Datensatz.** Betätigen Sie den Kill Switch auf einem
   Agenten im Staging, messen Sie den Stopp und überprüfen Sie, dass der Stopp und die
   Guardrail-Ereignisse einen Evidence Store erreichten, mit der Register-ID verschlüsselt.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] Policy Cards: Machine-Readable Runtime Governance for Autonomous AI Agents (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[5] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[6] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[7] Inspect: a framework for large language model evaluations (UK AI Security Institute). GitHub. 2026. https://github.com/UKGovernmentBEIS/inspect_ai (verified: primary)
[8] General-Purpose AI Code of Practice, Safety and Security chapter (examples of model evaluation methods include "red-teaming and other methods of adversarial testing"; systemic-risk models only; voluntary; published 10 Jul 2025). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[12] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer compliance-as-code) (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[13] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[14] State of GRC 2026 (≈51% of GRC teams ≤4 people; ≈18.5% solo). GRC Engineer. 2026. https://grcengineer.com/report/ (verified: primary)
[15] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[16] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (guardian agents: AI-based technologies that review, monitor and redirect or block agent actions). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[17] CSA research note on the EU AI Act, prEN 18286 and ISO/IEC 42001 (ISO/IEC 42001 alone does not satisfy the AI Act and is not a harmonised standard; EN 18286 targets the Art. 17 QMS). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
