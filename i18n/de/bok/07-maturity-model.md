---
lang: de
source: bok/07-maturity-model.md
sourceHash: "541c28ee31cef3e3713b5b858d53c65c0157543b0cc3a6b894e8d1e6f9893a7e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 07. Reifegradmodell (fünf Stufen)

> Eine Leiter von Papier zu Produktion (Documented, Inventoried, Tested, Enforced, Continuous),
> wobei jede Stufe durch das bewiesen wird, was die laufenden Systeme zeigen können, nicht durch
> das, was ein Dokument behauptet.

## Warum ein Reifegradmodell und wie man dieses liest

Reifegradmodelle scheitern, wenn sie Papierkram messen. Dieses misst die Systeme. Eine Stufe ist
keine Punktzahl, die Sie sich selbst geben; es ist ein Zustand, den Sie durch Abfragen des
Registers, Ausführen des Gates und Lesen des Evidence-Speichers demonstrieren können. Die Leiter
läuft von Governance, die nur auf Papier existiert, zu Governance, die kontinuierlich vom
Runtime-Datenpfad läuft.

Die fünf Stufen beantworten die drei Fragen mit steigendem Vertrauen. **Documented** und
**Inventoried** beantworten *welche KI läuft*, zuerst auf Papier, dann aus einem Live-Inventory.
**Tested** und **Enforced** beantworten *was sie tun darf*, zuerst durch Messung, dann durch
Blockierung. **Continuous** beantwortet *welche Evidenz beweist es*, kontinuierlich, aus Telemetrie.
Jede Stufe wird über alle fünf Schichten des Stack bewertet (Kapitel 04); Sie sind auf einer Stufe
nur, wenn jede Schicht sie erreicht hat, denn eine Kette ist nur so stark wie ihr schwächstes Glied.

## Die fünf Stufen

**Stufe 1: Documented.** Governance existiert als Artefakte, die ein Mensch verwaltet: ein
Policy-PDF, ein Spreadsheet-Inventory, ein Risk Register, eine Überprüfung vor dem Start. Die Regeln
sind geschrieben und jemand ist verantwortlich, aber nichts wird ausgeführt. Typische Evidenz:
Policy-Dokumente, ein ausgefülltes Spreadsheet, Sitzungsprotokolle. Typischer Fehler, der Sie
zurückversetzt: Das Dokument wurde vor einem Quartal zuletzt bearbeitet und stimmt nicht mehr mit
der Produktion überein; das Artefakt ist veraltet, bevor es unterzeichnet wird. Kapitel 13 zeigt,
wie das Risk Register auf jeder Stufe aussieht
([Risk Practice nach Reifegrad](/bok/risk-management#risk-practice-by-maturity-level)).

**Stufe 2: Inventoried.** Es gibt ein echtes Inventory von Modellen und ein
**[Agentenregister](/patterns/agent-registry)**, und es wird durch einen Runtime-Datenpfad gespeist,
nicht von Hand eingegeben: Ein Deploy registriert ein System mit einem Besitzer, einem Scope und
einem Status. Sie können *welche KI läuft* an jedem beliebigen Tag beantworten. Typische Evidenz:
ein Register mit Besitzer und Klasse für jedes System; ein Discovery-Job, der das Register gegen die
Produktion abgleicht. Typischer Fehler: [Shadow AI](/patterns/shadow-ai-discovery). Ein System oder
Agent erreicht die Produktion ohne Registrierung, so dass das Inventory nur für die Ehrlichen
vollständig ist.

**Stufe 3: Tested.** Systeme werden gegen definierte Tests (Capability-, Safety- und
Adversarial-Evals) evaluiert und die Ergebnisse werden als Evidenz aufgezeichnet. Fehler sind
sichtbar, aber ein fehlgeschlagenes Eval stoppt noch nichts. Sie wissen, welche Systeme zu kurz
kommen; Sie haben noch nicht gemacht, dass zu kurz kommen Konsequenzen hat. Typische Evidenz:
versionierte Eval-Suites; gespeicherte, zeitgestempelte Eval-Ergebnisse; Red-Team-Erkenntnisse.
Typischer Fehler: Die Eval wird einmal vor dem Start ausgeführt, in eine Folie eingefügt und nie
erneut ausgeführt, wenn sich das Modell oder seine Prompts ändern.

**Stufe 4: Enforced.** Die Tests haben Zähne. [Policy-as-Code](/patterns/policy-card) und
**[Eval Gates](/patterns/eval-gate-in-ci)** laufen in CI/CD und bei der Zulassung, und ein
fehlgeschlagenes Kontrollelement blockiert den Merge oder das Deploy. Identität geht der Autonomie
voraus: Ein Agent ohne Besitzer, Scope oder **[Kill Switch](/patterns/kill-switch-circuit-breaker)**
wird eine [Workload-Identität](/bok/governing-agents#identity-and-short-lived-credentials)
verweigert. Governance ist jetzt eine Eigenschaft des Builds, nicht ein Checkpoint danach. Aber ein
blockierendes Gate ist nur so gut wie der Test dahinter, also hat Stufe 4 eine zweite Bedingung, die
leicht zu überspringen ist: die *Qualität* der Eval-Suite wird bewertet, nicht nur ihre Existenz und
ihre Zähne. Ein Gate, das auf einer trivialen oder veralteten Suite blockiert, ist Stufe 4 nach dem
Buchstaben und Framework-Theater in der Tat: ein grüner Build, der nichts beweist. Die
Enforcement-Aussage erfordert also, dass die Abdeckung gemessen wird, adversarische Fälle gegen
aktuelle Bedrohungen gepflegt werden und Schwellwerte zu benannten Fehlermodi zurückverfolgt werden,
nicht zu runden Zahlen (siehe Kapitel 01, "die Grenzen des Eval Gates"). Typische Evidenz:
Pipeline-Logs, die blockierte Releases mit Gründen zeigen; Admission-Control-Ablehnungen; das
Register, das als Deploy-Gate fungiert; eine verfolgte Coverage- oder Adversarial-Quality-Metrik für
die Suites, die Gate. Typischer Fehler: spröde Gates, die Engineers umgehen; ein Gate, das nur von
Governance gepflegt wird, das Engineering nicht besitzt; oder ein Gate, dessen Suite trivial oder
ungepflegt ist, so dass der Block real ist, aber die Assurance nicht.

**Stufe 5: Continuous.** Assurance wird kontinuierlich vom Runtime-Datenpfad erzeugt.
Guardrail-Entscheidungen, Tool-Call-Vermittlung, Drift und Agent-Verhalten fließen in Observability;
**[kontinuierliche Assurance](/patterns/continuous-assurance-telemetry)** verwandelt
Produktionsverhalten in ein Live-Kontrollsignal; Evidenz wird als
[maschinenlesbare Artefakte](/patterns/machine-readable-evidence-oscal) (`OSCAL`, signierte Logs)
emittiert, während die Pipeline und Runtime betrieben werden. Die Audit ist eine Abfrage. Bei einem
Vergleich eines Anbieters der KI-Governance-Plattform-Kategorie erreicht der Großteil davon diesen
Endzustand nicht, weil er "das Programm verwaltet … ohne einen Runtime-Datenpfad" [1]. Typische
Evidenz: ein Live-Assurance-Store; Streaming-Eval- und Guardrail-Telemetrie; eine Audit, die durch
Ausführung einer Abfrage beantwortet wird. Typischer Fehler: Telemetrie, die gesammelt, aber nie mit
einer Entscheidung verdrahtet wird; Observability ohne Enforcement verfällt zurück zu Stufe 3,
verkleidet als Stufe 5.

## Observable Kriterien nach Schicht und Stufe

Lesen Sie jede Zeile als eine Schicht, die sich von links nach rechts reift. Sie sind auf einer
Stufe nur, wenn jede Zeile ihre Spalte erreicht hat.

| Schicht | 1 Documented | 2 Inventoried | 3 Tested | 4 Enforced | 5 Continuous |
|---|---|---|---|---|---|
| **1 Govern-as-Code** | Policies als Prosa geschrieben | Policies indexiert, auf Systeme abgebildet | Policy-Checks laufen und berichten, nicht blockierend | [Policy-as-Code](/patterns/policy-card) blockiert Merge/Deploy | [Policy-Verdikt](/patterns/continuous-assurance-telemetry) streamt zu Assurance, versioniert |
| **2 Inventory & Transparency** | Spreadsheet-Inventory | Register von Deploy gespeist; Besitzer + Scope pro System | Register gegen Produktion abgeglichen | [Register gated Deployment](/patterns/agent-registry); kein Eintrag, keine Identität | Register live von [Runtime-Discovery](/patterns/shadow-ai-discovery); Drift auto-flagged |
| **3 Evals & Red Teaming as Evidence** | Evals in einem Plan beschrieben | Eval-Suites existieren und sind versioniert | Evals laufen, Ergebnisse gespeichert, nicht blockierend | [Eval Gate](/patterns/eval-gate-in-ci) fehlgeschlagen beim Build bei Regression; Suite-Abdeckung und Adversarial-Qualität bewertet | Evals laufen kontinuierlich; Ergebnisse sind Live-Evidenz |
| **4 Runtime Controls & Observability** | Guardrails in einem Design benannt | Guardrails deployed, nicht gemessen | Guardrail-Entscheidungen protokolliert | [Kill Switch](/patterns/kill-switch-circuit-breaker) getestet; Tool-Calls vermittelt und erzwungen | Runtime-Signale treiben Kontrollentscheidungen in Echtzeit |
| **5 Assurance & Continuous Compliance** | Evidenz von Hand für Audit gesammelt | Evidenz pro Kontrollelement templated | Strukturierte Nachweise, die pro Durchlauf erzeugt werden | Nachweise, die erforderlich sind, um das Gate zu passieren | [Maschinenlesbare Nachweise](/patterns/machine-readable-evidence-oscal) werden kontinuierlich emittiert; Audit = Abfrage |

**Teilweise Reife ist der Normalzustand.** Fast keine echte Funktion sitzt auf einer sauberen Ebene
über alle fünf Schichten hinweg; das übliche Bild ist eine gezackte Linie: Inventory auf Level 4,
Evals auf Level 2, Assurance auf Level 3. Das ist kein Fehler des Modells, das ist der Sinn, es nach
Schicht zu lesen. Die einzelne Gesamtebene ist die schwächste Schicht, und sie ist ein *Minimum* für
die Planung, nicht ein Urteil über die ganze Funktion. Zwei Lesarten folgen: Berichten Sie das
Pro-Schicht-Profil, nicht nur das Minimum, denn es zeigt, wo der Hebel liegt; und erwarten Sie, dass
das Profil gezackt bleibt, denn Schichten reifen mit der Geschwindigkeit der Arbeit, die sie gaten,
nicht im Gleichschritt. Eine Funktion, die Level 4 bei Identity und Level 2 bei Evals ist, schneidet
besser ab als das Gesamturteil „Level 2

## Metrics per level

Each level has metrics you can read off the systems. Track the trend, not the single number.

- **Level 1 → 2:** percentage of AI systems and agents in the registry with a named owner and a class;
  registry-to-production reconciliation gap (systems in production but not registered).
- **Stufe 2 → 3:** Prozentsatz registrierter Systeme mit einer versionierten Eval-Suite; Prozentsatz
  mit einem aufgezeichneten, mit Zeitstempel versehenen Eval-Ergebnis in der letzten Version.
- **Stufe 3 → 4:** Prozentsatz der Versionen, die durch ein **Eval Gate** gehen (versus es umgehen);
  Prozentsatz der Agenten mit einem getesteten Kill Switch und einer scoped, nicht gemeinsam
  genutzten Identität; Anzahl der Versionen, die mit einem protokollierten Grund blockiert wurden.
- **Stufe 4 → 5:** Mittlere Zeit zur Erkennung einer nicht autorisierten Agent-Aktion (ein Agent
  führt etwas außerhalb seines deklarierten Umfangs aus, OWASP Agentic ASI03/ASI10 Gebiet [2]);
  **Evidence Freshness** (Alter des neuesten Evidence-Artefakts pro Kontrolle); Prozentsatz der
  Kontrollen, deren Status durch eine Live-Abfrage statt durch manuelles Abrufen beantwortet werden
  kann.

Die aussagekräftigste Metrik über alle Stufen hinweg ist Evidence Freshness. Auf Stufe 1 ist die
neueste Evidenz ein Vierteljahr alt; auf Stufe 5 ist sie so alt wie der letzte Pipeline-Lauf. Wenn
Ihre Evidenz in Monaten altert, sind Sie noch nicht kontinuierlich, egal was das Dashboard sagt.
Dies sind Engineering-Metriken; die Vorstandsebene, die sie nach oben meldet, ist in Kapitel 12
([KPIs und KRIs für Führung und Vorstand](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)).

## Selbstbewertungs-Checkliste

Beantworten Sie jede mit dem System, nicht mit der Absicht. Ein "Nein" begrenzt Sie auf die Stufe
darunter.

- **Dokumentiert:** Ist jedes KI-System durch eine schriftliche Richtlinie mit einem benannten
  Eigentümer abgedeckt? Gibt es ein Risikoregister, das eine Person verwaltet?
- **Inventarisiert:** Erhält die Registry automatisch einen Eintrag bei der Bereitstellung, mit
  Eigentümer, Umfang und Status? Können Sie jedes Modell und jeden heute laufenden Agenten aus dem
  System of Record in unter einer Minute auflisten?
- **Getestet:** Hat jedes registrierte System eine versionierte Eval-Suite? Werden Ergebnisse mit
  Zeitstempeln gespeichert? Führen Sie Red-Team-Evals gegen Ihre Agenten durch?
- **Erzwungen:** Blockiert ein fehlgeschlagenes Eval oder eine fehlgeschlagene Policy-Prüfung
  tatsächlich eine Veröffentlichung? Wird ein Agent ohne Eigentümer, Umfang und Kill Switch daran
  gehindert, die Produktion zu erreichen? Können Sie eine blockierte Veröffentlichung mit dem
  protokollierten Grund zeigen?
- **Kontinuierlich:** Ist Runtime-Telemetrie mit Kontrolleentscheidungen verbunden, nicht nur mit
  Dashboards? Werden Nachweise kontinuierlich als maschinenlesbare Artefakte ausgegeben? Würde eine
  Audit-Frage durch eine Abfrage statt durch einen Sammlungs-Sprint beantwortet?

Wenn Sie zu einer ganzen Stufe und zu jeder Schicht darin "Ja" sagen können, sind Sie auf dieser
Stufe. Das erste "Nein" ist Ihre nächste Aufgabe, und der kleinste Schritt zur nächsten Stufe ist
fast immer, die schwächste Schicht zu schließen, nicht eine sechste Kontrolle zur stärksten
hinzuzufügen. Führen Sie die Checkliste als Werkzeug aus: die
[Maturity Self-Check](/toolkit/maturity-self-check) zeichnet Ihr Pro-Schicht-Profil, nennt den Boden
und den nächsten Schritt und exportiert es.

## Wie dies sich auf Zertifizierung und andere Bewertungen bezieht

Dieses Reifegradmodell ist keine Zertifizierung und verleiht keine. Es bezieht sich auf drei externe
Schemata; die Beziehung ist eine der Unterstützung und Überlappung, nicht der Äquivalenz.

**ISO/IEC 42001 Zertifizierung.** ISO/IEC 42001 zertifiziert, dass ein KI-Managementsystem (AIMS)
existiert und betrieben wird, ein Stufe-1-2-Nachweis von *Prozess*: dass Governance dokumentiert, im
Besitz und überprüft ist. Es sagt wenig darüber aus, ob ein **Eval Gate** einen Build blockiert oder
ob Nachweise maschinenlesbar sind, die Stufe-4-5-Eigenschaften. Und es ist keine harmonisierte Norm:
das Zertifikat verleiht keine Vermutung der Konformität mit der KI-Verordnung der EU, da noch keine
im Amtsblatt [3] zitiert ist. Das Erreichen von Stufe 5 unterstützt eine 42001-Prüfung durch
kontinuierliche Erzeugung von Nachweisen; es ersetzt das Zertifikat nicht, und das Zertifikat
beweist nicht, dass Sie über Stufe 2 hinaus sind. Führen Sie unabhängig vom Schema
[ein Audit-Programm](/bok/governing-deployment#an-audit-programme-not-an-audit) durch, nicht eine
einzelne Prüfung (Kapitel 15).

**OWASP AI Maturity Assessment (AIMA).** OWASPs GenAI Security Project veröffentlicht eine AI
Maturity Assessment in Version 1.0 (Aug 2025) [4]. Sie ist komplementär: Während AIMA die *Breite*
eines KI-Sicherheitsprogramms bewertet, bewertet dieses Modell die *Tiefe* des Runtime-Datenpfads.
Verwenden Sie AIMA, um Lücken in der Abdeckung zu finden; verwenden Sie diese Leiter, um zu finden,
ob die abgedeckten Kontrollen tatsächlich funktionieren.

**CSA STAR für KI.** CSAs STAR für KI ist ein Zertifizierungsprogramm, das auf der AI Controls
Matrix (AICM) aufgebaut ist, mit einer Selbstbewertungs-Stufe, einer automatisierten
"Valid-AI-ted"-Stufe und einer Stufe 2, die die Zertifizierung nach ISO/IEC 42001 durch Dritte mit
der validierten Bewertung kombiniert [1][5]. Seine Stufe 2 entspricht dem *Erzwungen*-Ende dieser
Leiter, aber wie 42001 bescheinigt sie ein Programm, anstatt die Frische von Runtime-Nachweisen zu
messen, die Eigenschaft kontinuierliche Assurance (Stufe 5) macht billig zu produzieren und schwer
zu fälschen. Zertifikate von Personen (AIGP, ISO/IEC 42001 Lead Implementer und Lead Auditor, AAISM,
AAIA) sind etwas ganz anderes: siehe die [Zertifizierungsseite](/for/certifications).

> **In der Praxis**
> Eine Funktion bei einem großen Telekommunikationsunternehmen bewertete sich selbst ehrlich und
> landete bei Level 2 für Inventory, aber Level 1 für Evals: das Register war live aus der
> Deploy-Pipeline, aber Evals wurden vor dem Start noch von Hand durchgeführt und in Folien
> eingefügt. Die Kette war nur so stark wie ihr schwächstes Glied, daher war die Funktion insgesamt
> Level 1. Der kleinste Schritt war kein neues Framework-Mapping; es war die Versionierung einer
> Eval-Suite und die Speicherung ihrer zeitgestempelten Ergebnisse, die die Eval-Schicht auf Level 3
> anhob, bevor sie in ein Gate verdrahtet wurde. Die Frische der Evidenz fiel von einem Quartal auf
> einen Release-Zyklus innerhalb von zwei Sprints.

**Zuordnung:** EU AI Act Art. 9 (Risikomanagement), Art. 17 (Qualitätsmanagementsystem), Art. 72
(Beobachtung nach dem Inverkehrbringen) · ISO/IEC 42001 (AIMS) und ISO/IEC 42005 (Folgenabschätzung)
· NIST AI RMF (Govern, Measure, Manage) · OWASP Top 10 for Agentic Applications 2026 · CSA AICM /
STAR for AI. Die Mappings sind illustrativ, keine Konformitätsaussage.

## Was Sie diese Woche tun können

1. **Bewerten Sie jede Schicht, nicht die Funktion.** Beantworten Sie die
   Selbstbewertungs-Checkliste pro Schicht anhand der Systeme und nicht der Absicht, und nehmen Sie
   die niedrigste Stufe als Ihre Gesamtstufe.
2. **Messen Sie die Frische der Evidenz.** Notieren Sie für jede Kontrolle das Alter ihres neuesten
   Evidenz-Artefakts. Das älteste ist der Startpunkt für den nächsten Sprint.
3. **Gleichen Sie das Register einmal ab.** Vergleichen Sie, was das Register auflistet, mit dem,
   was in der Produktion läuft, und zählen Sie die Systeme und Agenten, die sich nie registriert
   haben.
4. **Erhöhen Sie die schwächste Schicht um eine Stufe.** Verschiffen Sie den kleinsten Schritt dort
   (eine versionierte Eval-Suite mit gespeicherten Ergebnissen oder ein Register, das einen Deploy
   gated) bevor Sie eine Kontrolle zur stärksten Schicht hinzufügen.
5. **Finden Sie einen blockierten Release.** Zeigen Sie einen Release, den ein fehlgeschlagener Eval
   oder Policy-Check gestoppt hat, mit dem Grund im Log. Wenn es keinen gibt, sind Sie noch nicht
   bei Enforced, egal was das Dashboard sagt.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] Top 10 for Agentic Applications 2026 (ASI03 Agent Identity & Privilege Abuse; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] ISO/IEC 42001 certification is not yet a presumption of conformity with the EU AI Act (no harmonised standard cited in the OJ). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[4] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025); Secure Governance initiative. OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[5] STAR for AI (three certification levels; Level 2 = third-party ISO/IEC 42001 + Valid-AI-ted; built on the AI Controls Matrix). Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/star/ai (verified: primary)
