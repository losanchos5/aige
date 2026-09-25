---
lang: de
source: bok/06-the-role.md
sourceHash: "17a44abb101fec04ddcb1b5db48761eb55b950d17a34ab07095b17e22699c0b1"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 06. Die Rolle

> Der KI-Governance-Engineer als konkrete Rolle: eine Fähigkeit zuerst und ein Jobtitel zweite,
> definiert durch die Workflows, die er besitzt, und die Evidenz, die er produziert, nicht durch die
> Zertifizierungen seines Inhabers.

## Fähigkeit zuerst, Titel zweite

Die These behauptet, dass KI-Governance-Engineering eine Fähigkeit ist, kein Jobtitel (die gleiche
Behauptung, die die Muttersdisziplin für GRC-Engineering macht, eine Fähigkeit, die jeder in der
Nähe des Builds entwickeln kann [8]). Dieses Kapitel macht es konkret, ohne das zu widersprechen:
eine Fähigkeit lebt immer noch in jemandes Woche: die Tickets, die er besitzt, die Pipelines, die er
wartet, die Vorfälle, für die er gerufen wird. Wir beschreiben also den **KI-Governance-Engineer**
als die Person, auf welchem Organigramm auch immer, die diese Fähigkeit hält und für die drei Fragen
in der Produktion verantwortlich ist: welche KI läuft, was darf sie tun, und welche Evidenz beweist
es.

Die Unterscheidung ist wichtig, weil der Titel sich noch bildet. Die gleiche Arbeit wird als
„KI-Governance-Engineer", „KI-Risk-Engineer", „KI-Evaluierungs- und Governance-Engineer" [1],
"Responsible AI Engineer" und, in GRC-Teams, die die KI-forward-Version ihrer Funktion bauen,
"GRC-Engineer" mit KI-Mandat [2] beworben. Ein Security-Engineer, der das Eval-Gate schreibt, ein
Privacy-Engineer, der eine FRIA in Code umwandelt, ein MLOps-Engineer, der die Registry mit dem
Deploy verdrahtet: jeder macht KI-Governance-Engineering unter einem anderen Titel. Wir definieren
die Rolle durch das, was sie besitzt, nicht durch das, was HR die Requisition genannt hat.

Eine Linie trennt sie von ihrem Analyst-Nachbarn, und der Rest des Kapitels verdient diese Linie:
der KI-Governance-Analyst beschreibt das System von außen und reicht die Beschreibung ein; der
KI-Governance-Engineer liest das System direkt und versendet die Kontrolle, die ändert, was es tut.

## Was die Rolle besitzt, nach Workflow

Der Engineer besitzt Workflows, keine Dokumente. Jeder Workflow unten ist ein laufendes System mit
Eingaben, Artefakten und Evidenz, und jeder ordnet sich einer der fünf Schichten des Stack zu
(Kapitel 04). Verantwortungen auf diese Weise zu gruppieren hält die Rolle ehrlich: du besitzt einen
Workflow, wenn du dafür gerufen werden kannst, nicht wenn dein Name auf einer Policy steht.

### Aufnahme und Klassifizierung

Jedes KI-System, Modell und Agent kommt durch eine Aufnahme, die es klassifiziert: nach Risikostufe,
nach regulatorischer Exposition (EU KI-Verordnung Hochrisiko, GPAI, außerhalb des Geltungsbereichs),
nach Datenempfindlichkeit und nach Autonomie. Der Engineer baut die Aufnahme als einen
Form-plus-Code-Pfad, nicht als ein Treffen: eine Anfrage, die einen Registry-Eintrag gerüstet, die
richtige Folgenabschätzung auslöst (FRIA, DPIA), und das System zu den Kontrollen leitet, die seine
Klasse erfordert. Die Map-Funktion des NIST AI RMF ist das natürliche Vokabular für den
Klassifizierungsschritt. Die Aufnahme fragt, der Reihe nach: ob das Problem KI überhaupt braucht
([Strategie, Wert und ob KI überhaupt verwendet werden soll](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all),
Kapitel 12); ob das System als KI zählt
([die Definitionsentscheidung und ihre Registry-Felder](/bok/ai-defined#from-definition-element-to-registry-field),
Kapitel 11); was der [Use-Case-Datensatz](/bok/governing-development#the-use-case-record) über Zweck
und Entscheidungsautorität sagt (Kapitel 14); welche Risikostufe das
[Use-Case-Risikoprofil](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile) ihm
gibt (Kapitel 13); und wo es auf [der KI-Verordnung-Risikoleiter](/bok/eu-ai-act#the-risk-ladder)
sitzt (Kapitel 18). Ein System, das gekauft statt gebaut wird, kommt mit einem
[Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record) (Kapitel 15).
Das [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering)-Muster baut die
Aufnahme, und die [KI-Verordnung-Triage](/toolkit/ai-act-triage) entwirft den
Klassifizierungsentscheidungsdatensatz. **Maps to** Inventory & Transparency.

### Bestand und Registry

Der Ingenieur besitzt das Inventar der Modelle und das **Agentenregister**, den laufzeitgestützten
Datensatz jedes nicht-menschlichen Akteurs, jeweils mit einem Besitzer, einem deklarierten Umfang,
einem Status und einem Kill Switch. Die Fähigkeit, die den Ingenieur hier auszeichnet, ist der
Laufzeit-Datenpfad: das Register wird von der Deployment-Pipeline und durch Discovery gegen die
Produktion gespeist, nicht in eine Tabellenkalkulation eingegeben, und jeder nicht-menschliche
Akteur darin trägt seine eigene Identität; Kapitel 23 legt dar, was
[ein Registereintrag eines Agenten](/bok/governing-agents#the-agent-registry) enthalten muss.
**Entspricht** Inventory & Transparency.

### Evals und Red Teaming als Nachweis

Der Ingenieur erstellt und verwaltet die Eval-Suites (Capability, Safety und Adversarial) und
verbindet sie mit einem **Eval Gate**, sodass ein fehlgeschlagenes Eval die Freigabe blockiert. Dies
ist der Workflow, der den Ingenieur am schärfsten vom Analysten unterscheidet: Der Analyst überprüft
einen Modellbericht; der Ingenieur schreibt den Test, den das Modell bestehen muss, und besitzt das
Harness, das ihn ausführt (Inspect AI, promptfoo, Garak, Giskard, DeepEval, Ragas als
Kategoriebeispiele, illustrativ nicht empfohlen). Die Rolle "AI Evaluation & Governance Engineer"
ist um "automatisierte Test-Harnesses und Safety-Guardrails" und adversariales Red-Teaming [1]
definiert. **Entspricht** Evals & Red Teaming as Evidence.

### Policy-as-Code und Gates

Der Ingenieur drückt Governance-Regeln als ausführbare Policy aus (`OPA/Rego`, Cedar, Policy Cards),
die in CI/CD und bei der Zulassung evaluiert werden, und verwaltet die Gates, die sie durchsetzen.
Eine öffentliche GRC-Engineering-Manager-Ausschreibung rahmt das Mandat als "Richtlinien in
Policy-as-Code übersetzen" [3]. Die Ausgabe des Ingenieurs hier ist ein Merge, der blockiert oder
zugelassen wird, mit einem protokollierten Grund, nicht eine Empfehlung in einer Überprüfung.
**Entspricht** Govern-as-Code.

### Laufzeit-Monitoring und Incidents

Der Ingenieur instrumentiert die Laufzeit: Guardrail-Entscheidungen, Tool-Call-Vermittlung,
Drift-Signale und Agent-Verhalten fließen in die Observability (Langfuse, Arize Phoenix über
OpenTelemetry als Beispiele). Sie besitzen den Detection-to-Report-Pfad für schwerwiegende Vorfälle,
einschließlich der Uhr des Artikels 73 der KI-Verordnung der EU für Hochrisiko-Systeme, und sie
besitzen den getesteten **Kill Switch** für Agenten, mit dem Threat Model, das sagt, gegen welche
Laufzeit-Fehler die Kontrollen gebaut sind [5]. Kapitel 17 behandelt
[Incident Response](/bok/incidents#the-response-lifecycle) und
[Root-Cause Analysis](/bok/incidents#root-cause-analysis). **Entspricht** Runtime Controls &
Observability.

### Assurance und Audit-Nachweise

Der Ingenieur gibt **auditfähige Nachweise** als Nebenprodukt des Builds aus (`OSCAL` Komponente und
Bewertungsartefakte, signierte Logs, strukturierte Eval-Ergebnisse), sodass das Audit eine Abfrage
ist, nicht ein Projekt. Dies ist **kontinuierliche Assurance**: Der Status der Kontrolle ist ein
Live-Signal, nicht eine Attestation zu einem bestimmten Zeitpunkt. **Entspricht** Assurance &
Continuous Compliance.

### Regulatorische Übersetzung

Der Ingenieur liest die Verpflichtung gut genug, um die Kontrolle zu bauen, die sie erfüllt: einen
KI-Verordnung-Artikel, eine ISO/IEC 42001-Kontrolle oder eine NIST AI RMF-Unterkategorie in ein
Gate, ein Registerfeld oder ein Nachweisartefakt umzuwandeln, und zurück, sodass ein Auditor die
Kontrolle zur Verpflichtung zurückverfolgen kann. Dies ist Übersetzung, keine Rechtsberatung; der
Ingenieur ist auf Legal angewiesen, um zu bestätigen, dass die Verpflichtung richtig gelesen wird.
**Entspricht** alle fünf Schichten; es ist die Wirbelsäule, die Kapitel 08 indiziert, und Kapitel 18
liest [die KI-Verordnung der EU in einem Durchgang](/bok/eu-ai-act#how-to-read-this-chapter) für den
Ingenieur, der sie übersetzen muss.

## Fähigkeiten nach Workflow

Fähigkeiten sind nach dem Workflow gruppiert, dem sie dienen, nicht nach dem Zertifikat, das sie
lehrt. Die Tabelle ist eine Capability Map: Sie sagt, was Sie tun können müssen, in grober
Reihenfolge, wie tragfähig es für jeden Workflow ist. Sie ist illustrativ, nicht eine Checkliste zum
Bestehen.

| Workflow | Kernfähigkeiten | Unterstützende Fähigkeiten |
|---|---|---|
| Intake & Klassifizierung | Risiko-Taxonomie-Design; Lesen der KI-Verordnung-Risikostufen; Anforderungsanalyse | Formular-/Workflow-Tools; leichte Datenmodellierung |
| Inventar & Register | Nicht-menschliche Identität und scoped access; API-Integration zu CI/CD; Datenmodellierung | Cloud IAM; Discovery-Tools; SPIFFE/SPIRE-Konzepte |
| Evals & Red Teaming | Eval-Harness-Engineering; adversariales Prompting; statistische Literalität; Python | LLM-/Agent-Interna; Benchmark-Design; Threat Modelling (STRIDE/PASTA) |
| Policy-as-Code & Gates | `OPA/Rego` oder Cedar; CI/CD-Pipeline-Engineering; Git | Policy-Schema-Design (Policy Cards); Admission Control |
| Laufzeit-Monitoring & Incidents | Observability/OpenTelemetry; Guardrail-Konfiguration; Incident Response | Detection Engineering; MCP und Agent-Protocol-Sicherheit |
| Assurance & Audit-Nachweise | `OSCAL` und maschinenlesbarer Nachweis; Logging und Signing; Audit-Flüssigkeit | Kryptographische Attestation; Evidence-Store-Design |
| Regulatorische Übersetzung | Regulatorische und Standards-Lektüre (KI-Verordnung, ISO/IEC 42001, NIST AI RMF); Mapping | Englisches Recht; DPIA/FRIA-Methodik |

Zwei übergreifende Fähigkeiten sitzen unter allen sieben: genug **Python**, um Systeme
zusammenzukleben (Ausschreibungen setzen Python in etwa eins von vier AI-Governance-Ausschreibungen
[4]), und genug **Rechts-Lektüre**, um einen Artikel zu analysieren, ohne ihn mit Beratung zu
verwechseln. Keines ist optional; keines ist der ganze Job.

## Analyst versus Ingenieur

Die klarste Art, die Rolle zu definieren, ist gegen den Analysten, aus dem sie wächst. Der Kontrast
unten ist für AI Governance geschrieben und modelliert nach der Analyst-vs-Ingenieur-Tabelle, die
die GRC-Engineer-Literatur für ihre Muttersdisziplin verwendet [2]. Beide Rollen sind notwendig; der
Ingenieur ist nicht "besser", sondern leistet andere Arbeit und wird anders gemessen.

| Dimension | AI-Governance-Analyst | AI-Governance-Ingenieur |
|---|---|---|
| **Nachweisartefakt** | Ein Artefakt zu einem bestimmten Zeitpunkt (eine Attestation, ein Fragebogen, ein exportierter Bericht), das für eine Überprüfung zusammengestellt wird | Ein kontinuierlich emittiertes Artefakt (ein Abfrageergebnis, ein Eval-Lauf, ein signiertes Log), das während der Pipeline-Ausführung produziert wird |
| **Primäre Quelle** | Arbeitet aus der gemeldeten Beschreibung des Systems: Dokumentation, Zusammenfassungen und Anbieterantworten | Arbeitet aus dem laufenden System: das Register und die Produktions-Telemetrie, die gleichen Signale, die der Build ausgibt |
| **Toolset** | Tabellenkalkulationen, eine GRC/AI-Governance-Plattform, Ticketing | Python, `OPA/Rego`, Git, CI/CD, Eval-Harnesses, `OSCAL`}, plus die Plattform |
| **Kadenz** | Periodisch: vierteljährliche Überprüfungen, jährliche Bewertungen | Kontinuierlich: bei jedem Commit, Deploy und Laufzeit-Aufruf |
| **Ausgabe** | Ein Bericht, eine Mapping-Matrix, eine Risikobewertung | Ein zusammengeführter oder blockierter Build, ein registrierter Agent, ein maschinenlesbares Nachweisartefakt |
| **Erfolgsmessung** | Audit bestanden, Framework-Abdeckung vollständig | Kontrollfehler vor der Ankunft des Auditors gefangen, und tatsächliche Risikominderung messbar reduziert |

Die Unterscheidung ist Kadenz und Artefakt, nicht Kompetenz oder Freigabe. Es ist nicht so, dass der
Analyst ein Register nicht lesen kann oder der Ingenieur keinen Bericht schreiben kann; es ist so,
dass die Liefergabe des Analysten eine periodische Beschreibung ist und die des Ingenieurs eine
kontinuierliche Kontrolle. Ein guter Analyst liest Systeme genau; ein guter Ingenieur schreibt klar.
Die Fehlermodi unterscheiden sich auch, und sie zu benennen hält beide ehrlich. Der Fehlermodus des
Analysten ist Compliance-Theater: Dokumentation, die der Realität voraus läuft. Der Fehlermodus des
Ingenieurs ist Überengineering: Automatisierung einer Kontrolle für einen Prozess, auf den sich
niemand geeinigt hat zu beheben, oder Bau eines Gates, das so spröde ist, dass Ingenieure es
umgehen. Keine Rolle ist allein durch ihren Titel vor ihrem eigenen Fehlermodus sicher.

## Die Karriereleiter

Die Rolle hat beobachtbare Sprossen, jede definiert durch das, was die Person end-to-end besitzen
kann, nicht durch die geleisteten Jahre, und überprüfbar durch Betrachtung der Systeme, nicht einer
Selbstbewertung.

1. **Associate.** Führt bestehende Kontrollen aus: fügt ein Eval zu einer Suite hinzu, registriert
   einen Agenten korrekt, produziert Nachweise aus einer Kontrolle, die jemand anderes gebaut hat.
2. **AI-Governance-Ingenieur.** Baut eine Kontrolle end-to-end (eine Verpflichtung in ein Gate, eine
   Eval-Suite für eine Systemklasse, verdrahtet in CI/CD) und besitzt mindestens einen Workflow für
   einen Produktbereich.
3. **Senior.** Besitzt einen vollständigen Workflow über die Organisation hinweg und entwirft den
   gepflasterten Weg, den andere übernehmen; das Register, das Eval Gate oder die Evidence Pipeline,
   das sie gebaut haben, ist die Standard-Vorlage.
4. **Staff / Principal.** Besitzt die Referenzarchitektur (wie die fünf Schichten zusammenpassen)
   und die übergreifenden Entscheidungen (Identitätsmodell, Nachweisformat, Incident-Pfad).
5. **Leiter der KI-Governance-Engineering.** Besitzt die Funktion und ihre gemeinsame
   Eigenverantwortung mit Engineering, gemessen an tatsächlicher Risikominderung, nicht an
   gestoppten Kontrollen. Eine öffentliche Engineering-Manager-Ausschreibung mit Umfang "Aufbau
   einer KI-forward GRC-Engineering-Funktion" sitzt auf dieser Sprosse [3].

Eine Person kann die Fähigkeit auf Sprosse zwei halten, während der Titel auf "Analyst"
hinterherhinkt, oder den Titel ohne die Fähigkeit halten. Die Leiter beschreibt die Arbeit, und die
Arbeit ist in den Systemen sichtbar.

## Drei Wege hinein

Niemand beginnt als AI-Governance-Ingenieur; jeder konvertiert von einer benachbarten Disziplin,
behält ihre Stärke und fügt hinzu, was ihr fehlt.

- **Aus Legal oder Privacy.** Ihre Stärke ist regulatorische Übersetzung; Ihre Lücke ist der Build.
  Verwandeln Sie eine Bewertung in ein versioniertes, ausführbares Artefakt (eine
  FRIA-as-Code-Vorlage, eine Policy in `OPA/Rego`), und lernen Sie genug Pipeline, um zu sehen, wo
  die Kontrolle feuert. Beginnen Sie mit Policy-as-Code und Intake.
- **Aus Security oder GRC.** Ihre Stärke ist die Kontroll-Mentalität; Ihre Lücke ist die
  Modell-Schicht. GRC Engineering hat bereits die übergeordneten Moves gelehrt: Policy-as-Code,
  kontinuierliche Assurance, Nachweise als Nebenprodukt [2]. Fügen Sie die KI-spezifischen Objekte
  hinzu: Evals als Kontrollen, Agent-Identität und Umfang, und die Modell- und Agent-Fehlermodi des
  OWASP Agentic Top 10 [5]. Beginnen Sie mit Evals-as-Evidence und dem Agent-Register.
- **Aus MLOps oder ML-Engineering.** Ihr Vorteil ist der Runtime-Datenpfad, den alle anderen nicht
  haben; Ihre Verpflichtung ist die Lücke. Fügen Sie das Eval-*Gate* statt des Eval-Berichts hinzu,
  das Registrierungsfeld für Eigentümer und Umfang, das Nachweisartefakt, das die Auditierung
  benötigt. Beginnen Sie mit Eval Gates in CI und Runtime-Überwachung.

## Der Markt

Die Rolle ist durch die oben genannten Workflows definiert, nicht durch die Vakanzen. Aber der Markt
bildet sich und die Beweise sind öffentlich, und sie bestätigen die Form der Arbeit. Behandeln Sie
jede Zahl als belegt; Gehaltspunkte sind Survey-Mediane oder Posting-Bereiche, keine Garantien.

**Survey-Bänder.** Der IAPP Salary & Jobs Report 2025-26 (1.600+ Befragte, 60+ Länder) setzt
technische AI-Governance-Rollen im Tech-Sektor auf einen Median von USD 221.000 (sein höchstes Band)
gegenüber USD 151.800 für AI-Governance-Arbeit allgemein und USD 169.700 für kombinierte
Privacy-und-AI-Governance-Rollen [6]. Die Prämie ist für das technische, Build-the-Control-Ende der
Disziplin, das genau die Rolle ist, die dieses Kapitel beschreibt.

**Nachgefragte Fähigkeiten.** Eine Analyse von US-Stellenausschreibungen seit Januar 2026 (Axial
Search) zeigt, dass Observability/Monitoring in 41–42 % der KI-Governance-Angebote genannt werden,
Python in 27–28 %, NIST-Frameworks in etwa 27 %, Vertrautheit mit Foundation Models in 25,6 % und
Cloud in 18,2 %; das Median-Gehalt lag bei USD 169.000 und die erforderliche Erfahrung im Median bei
fünf Jahren [4]. Das Nachfragesignal ist breit: LinkedIns 2026 Skills on the Rise listet Governance-
und Responsible-AI-Fähigkeiten unter den am schnellsten wachsenden Clustern auf, neben den
technischen KI-Fähigkeiten [7]. Das tragende Signal ist der Fähigkeitsmix (Observability, Python,
der Runtime-Datenpfad), nicht die Gehaltsmeldung.

> **Stellenanzeigen (Anmerkung).** Einzelne Ausschreibungen markieren die Obergrenze: Eine
> GRC-Engineering-Manager-Rolle in einem Frontier Lab wurde 2026 mit USD 405.000 ausgeschrieben [3].
> Aber benannte Vakanzen sind ein verzögertes, verrauschtes Signal, das hier nur zur Bestätigung und
> außerhalb des Arguments angeführt wird; diese Ausgabe zitiert keine Jobbörsen-Angebote, deren URL
> nach Schließung der Vakanz verfällt oder neu zugewiesen wird. Die Rolle sind die Workflows, nicht
> die Stellenausschreibung.

## Was Arbeitgeber in der Stellenbeschreibung falsch machen

Liest man die Ausschreibungen gegen die obigen Workflows, wiederholen sich drei Fehler.

- **Zertifizierungen als Proxy für Fähigkeit.** Beschreibungen listen AIGP, CIPP, CISSP und CISM
  auf, als würde ein Zertifikat ein Kontrollelement erzeugen. Die Axial-Daten zeigen, dass
  Zertifizierungen in weniger als 11 % der Ausschreibungen jeweils vorkommen [4]; die tragenden
  Fähigkeiten (Eval-Harnesses, Policy-as-Code, der Runtime-Datenpfad) sind diejenigen, die die
  Stellenbeschreibung unterbestimmt. Fragen Sie nach dem Workflow, dann nach dem Zertifikat, wenn es
  hilft. Was jedes Schema bewertet und wie dieses Buch dazu steht, wird neutral auf der
  [Seite zu Zertifizierungen](/for/certifications) dargelegt.
- **Analyst-Arbeit unter einem Engineer-Titel.** In unserer Lektüre der Ausschreibungen beschreiben
  "KI-Governance-Engineer"-Titel oft Intake, Mapping und Reporting (Analyst-Arbeit) zu
  Engineer-Gehalt. Das Erkennungszeichen ist das Fehlen jeglicher Entwicklung: kein Eval Gate, keine
  Registry-Integration, keine Evidence Pipeline.
- **Alles in einer Einstellung.** Eine einzelne Ausschreibung verlangt Policy-as-Code, Red Teaming,
  Identity, Observability, Incident Response, regulatorische Übersetzung und Stakeholder-Management.
  Das ist eine Funktion, keine Person: Die sieben Workflows werden über ein Team verteilt, und eine
  erste Einstellung besitzt zwei oder drei und baut den gepflasterten Pfad für den Rest.

> **In der Praxis**
> In einem großen Telekommunikationsunternehmen kam die Rolle vor dem Titel. Die erste Version der
> Arbeit saß in einem Privacy-Team und sah wie DPIAs und Reviews aus. Was sie zu
> KI-Governance-Engineering machte, war das vollständige Besitztum von zwei Workflows: das
> Verdrahten des Model- und Agent-Registers mit der Deployment-Pipeline, so dass es an jedem
> beliebigen Dienstag wahr war, und das Einbringen eines Eval Gates in CI, so dass eine Regression
> in der Injection-Resistenz den Build fehlschlagen ließ. Die Stellenbeschreibung folgte ein Jahr
> später. Die Fähigkeit war in den Systemen lange sichtbar, bevor sie auf dem Organigramm sichtbar
> war.

**Zuordnung:** EU AI Act Art. 9 (Risikomanagement), Art. 26/27 (Betreiberpflichten, FRIA), Art. 72
(Beobachtung nach dem Inverkehrbringen), Art. 73 (Meldung schwerwiegender Vorfälle) · ISO/IEC 42001
(Rollen, Verantwortung und Kompetenz) · NIST AI RMF (Govern) · OWASP Top 10 for Agentic
Applications 2026. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Kartografieren Sie die sieben Workflows.** Schreiben Sie auf, wer heute Intake, Inventory,
   Evals, Policy-as-Code, Runtime und Incidents, Assurance und regulatorische Übersetzung besitzt,
   und markieren Sie diejenigen, die niemand besitzt.
2. **Besitzen Sie einen Workflow vollständig.** Wählen Sie denjenigen mit der geringsten Entwicklung
   (oft das Register oder das Eval Gate) und versenden Sie dort ein Kontrollelement, das blockiert
   oder aufzeichnet, nicht eines, das empfiehlt.
3. **Schreiben Sie eine Stellenbeschreibung um.** Ersetzen Sie die Liste der Zertifizierungen durch
   die Workflows, die die Einstellung besitzt, und die Artefakte, die sie in ihrem ersten Quartal
   versendet.
4. **Üben Sie eine Kernfähigkeit an einem echten System.** Nehmen Sie aus der Fähigkeitstabelle die
   Kernfähigkeit, die Ihrem Workflow fehlt, und nutzen Sie sie einmal in einer Live-Pipeline: eine
   Policy in `OPA/Rego`, eine Eval in einem Harness, eine Trace in OpenTelemetry.
5. **Übersetzen Sie einen Artikel in einem Paar.** Setzen Sie einen Anwalt oder DPO mit einem
   Engineer zusammen und verwandeln Sie einen AI-Act-Artikel in ein Gate, ein Registry-Feld oder ein
   Evidence-Artefakt und zurück.

## Sources

[1] "How the AI Engineer role is unbundling in 2026" (names the AI Evaluation & Governance Engineer). AI Journal. 2026-08-26. https://aijourn.com/how-the-ai-engineer-role-is-unbundling-in-2026/ (verified: secondary)
[2] "The GRC Engineer role" (analyst-vs-engineer table; career paths). GRC Engineer. 2025. https://grcengineer.com/grc-engineer/ (verified: primary)
[3] "Engineering Manager, GRC" posting (AI-forward GRC engineering function; policies into policy-as-code), USD 405,000. Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: secondary)
[4] AI governance jobs analysis (US postings since Jan 2026: observability 41-42%, Python 27-28%, NIST ~27%, foundation models 25.6%, cloud 18.2%; median pay USD 169,000; median 5 yrs). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] Salary & Jobs Report 2025-26 (technical AI-gov in tech median USD 221,000; AI governance only 151,800; privacy + AI governance 169,700). IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[7] LinkedIn 2026 Skills on the Rise (governance and responsible-AI skills among the fastest-rising clusters; no per-skill percentage published). LinkedIn, via EdTech Innovation Hub. 2026. https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts (verified: secondary)
[8] "What is GRC Engineering" (capability, not a job title). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
