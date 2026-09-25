---
lang: de
source: bok/00-preface.md
sourceHash: "597a86da43989641cc3dbd772fc7bad71dee72e7408f4a33f88a9f7c6c54188f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 00. Vorwort

> Warum dieses Buch existiert, für wen es gedacht ist und wie Sie es nutzen.

## Warum es das gibt

Es gibt ein Manifest für GRC Engineering. Es gibt ein Manifest für agile Software. Es gibt einen
Musterkatalog für verantwortungsvolle KI und einen Leitfaden mit zwölf Faktoren für
Cloud-Anwendungen. Es gibt aber nichts, das Ihnen zeigt, wie Sie die Governance von KI-Systemen
*engineern*: wie Sie eine Verpflichtung aus dem KI-Verordnung oder eine Kontrolle aus ISO 42001 in
Policy-as-Code, ein Eval Gate, ein Agentenregister und maschinenlesbare Nachweise umwandeln, die ein
Auditor lesen kann. Dieses Buch ist der erste Versuch, das aufzuschreiben.

Es existiert, weil die Lücke jetzt teuer ist. Das, was geregelt wird (Modelle, die neu trainiert
werden, Prompts, die sich ändern, Agenten, die eigenständig handeln), bewegt sich schneller als
jedes Dokument folgen kann. Governance, die als PDFs und Tabellen geschrieben wird, ist veraltet,
bevor sie unterzeichnet wird. Die Disziplin, die die Lücke schließt, ist Engineering, angewendet auf
Governance. Dieses Buch ist ihr Gründungstext und ihr praktisches Nachschlagewerk.

## Wer es geschrieben hat und worauf es basiert

Das Body of Knowledge wurde von Jorge García Aibar, einem KI-Governance- und Datenschutz-Engineer,
geschrieben. Er stützt sich auf zweieinhalb Jahre Erfahrung beim Entwurf und Betrieb eines
KI-Governance-Frameworks in einem großen Telekommunikationsunternehmen, wo er zwischen Legal,
Security und Engineering saß und die Governance-, Sicherheits-, Compliance-, Geschäfts- und
Modellleistungsdimensionen des KI-Risikos abdeckte. Die These ist der einzige gemeinsam verfasste
Teil des Projekts, geschrieben von Jorge García Aibar und Aurélie Pols, die im Bereich Responsible
AI, Privacy und Data Governance tätig ist. Nichts in diesem Buch offenbart interne Details eines
Arbeitgebers; wo Praktiken beschrieben werden, sind sie generisch ("in einem großen
Telekommunikationsunternehmen").

Es basiert auf drei Dingen. Erstens auf dieser Betriebserfahrung: was tatsächlich funktioniert hat,
wenn ein Modell freitags geändert wurde und ein Agent übers Wochenende ein neues Tool erhielt.
Zweitens auf dem **GRC Engineering**-Vorbild: der Gemeinschaft, dem Manifest und dem
Praktiken-Fundus, der seit etwa 2024 Governance, Risk und Compliance in ein mit Code gebautes
Produkt verwandelt hat [1][2]. Drittens auf dem öffentlichen Bestand: der KI-Verordnung der EU und
ihrer Digital-Omnibus-Reform, ISO/IEC 42001, dem NIST AI RMF, der GenAI- und Agentic-Arbeit von
OWASP, CSA, CSIROs Responsible AI Pattern Catalogue und den eigenen Safety Frameworks der führenden
Labs. Jede faktische Aussage im Buch trägt eine überprüfte, nachvollziehbare Quellenangabe.

## Wer sollte das lesen

- **KI-Governance-Leads**, die aufhören wollen, Dokumente zu versenden und anfangen wollen,
  Kontrollen zu versenden. Kapitel 12 richtet
  [das Governance-Programm](/bok/governance-program#the-organisation-as-an-object-of-governance)
  ein, das jedem Control einen Eigentümer gibt.
- **Security Engineers und KI-Security Engineers**, die ihre Threat Models auf Modelle und Agenten
  ausweiten. Beginnen Sie mit
  [Schicht 04 des Stacks](/bok/the-stack#layer-04-runtime-controls--observability) und
  [der Governance von KI-Agenten](/bok/governing-agents#what-makes-an-agent-a-governance-object).
- **Privacy Engineers und Datenschutzbeauftragte**, die FRIA und DPIA als Code leben lassen wollen,
  nicht als einmalige PDFs. Kapitel 19 wendet
  [Datenschutzrecht auf KI an](/bok/privacy-and-ai#principles-applied-to-ai), und Kapitel 18
  behandelt die [FRIA](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27).
- **MLOps- und Platform Engineers**, die gebeten werden, Governance zu einer Eigenschaft der
  Pipeline zu machen. Die Kapitel 14 und 15 führen
  [den Build als eine Kette von Gates](/bok/governing-development#the-build-as-a-chain-of-gates) und
  [den Deployment-Lebenszyklus](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)
  durch.
- **Risk Leads und CISOs**, die die unternehmensweite Sicht auf KI-Risiko besitzen. Kapitel 13
  kompiliert
  [Risikoappetit und Risikotoleranz in Gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates),
  und Kapitel 17 führt [den Incident-Response-Lebenszyklus](/bok/incidents#the-response-lifecycle)
  durch.
- **Führungskräfte und Vorstandsmitglieder**, die wissen müssen, ob Governance funktioniert. Kapitel
  12 nennt
  [die KPIs und KRIs, die den Vorstand erreichen](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
- **Anwälte und Compliance-Fachleute, die bauen wollen**, um zu sehen, wie die Verpflichtung in eine
  ausführbare Kontrolle und lesbare Nachweise umgewandelt wird, und um sie zu spezifizieren. Der
  letzte Teil liest [die KI-Verordnung der EU](/bok/eu-ai-act#how-to-read-this-chapter),
  [das Recht, das bereits gilt](/bok/existing-law#how-to-read-this-chapter) und
  [KI-Gesetze weltweit](/bok/ai-laws-worldwide#the-landscape-at-a-glance) als Artefakte zum Bauen.
- **Öffentliche Sector-Teams**, für die mehrere Jurisdiktionen bereits dedizierte Instrumente
  veröffentlichen. Kapitel 21 behandelt
  [die öffentlichen Aufzeichnungen des Vereinigten Königreichs](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records)
  und
  [Kanadas Richtlinie zur automatisierten Entscheidungsfindung](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making).
- **Kleine Organisationen und Start-ups**, die die gleichen Pflichten mit weniger Leuten erfüllen.
  Kapitel 04 baut
  [den minimal lebensfähigen Stack für ein Team von einer Person](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one).

Sie müssen keinen Production Code schreiben, um dieses Buch zu nutzen, aber Sie sollten sich in der
Nähe einer Pipeline wohlfühlen. Die Disziplin ist eine Fähigkeit, die jeder in der Nähe des Builds
entwickeln kann, unabhängig vom Titel: Ein KI-Governance-Engineer ist durch die Workflows definiert,
die er besitzt, nicht durch den Namen der Rolle.

Die Website fügt [eine Landingpage pro Zielgruppe](/for) ([Engineers](/for/engineers),
[CISOs und Risk Leads](/for/ciso-risk), [Legal Counsel und Datenschutzbeauftragte](/for/legal-dpo),
[Führungskräfte und Vorstände](/for/executives-board), [der öffentliche Sektor](/for/public-sector)
und [KMUs](/for/smes)) hinzu, die die Kapitel, Muster, Vorlagen und Tools in der Reihenfolge
anordnet, die dieser Job braucht.

## Wie Sie dieses Buch nutzen

Das Body of Knowledge hat 24 Kapitel in fünf Teilen. Lesen Sie den ersten Teil in Reihenfolge: er
setzt das Vokabular, das jedes andere Kapitel verwendet. Danach lesen Sie nach Teil oder folgen der
Frage, die vor Ihnen steht.

1. **[Die Disziplin](/bok#part-discipline)** (Kapitel 00–07): die Definition, warum sich die
   Disziplin jetzt bildet, ihre Werte und Prinzipien, der fünfschichtige Stack, der Musterkatalog,
   die Rolle und das Reifegradmodell.
2. **[Referenz](/bok#part-reference)** (08–10): die Regulierungskarte, die jede Verpflichtung in ein
   Artefakt und eine Schicht umwandelt, das Glossar und die Leseliste. Die meisten Kapitel verweisen
   auf diese.
3. **[Grundlagen](/bok#part-foundations)** (11–13): was als KI-System zählt, das
   Governance-Programm, das jedem Control einen Eigentümer gibt, und die Risiko-Schleife, die jedem
   Control sagt, wie hart es zubeißen soll.
4. **[Der Lebenszyklus](/bok#part-lifecycle)** (14–17 und 23): Entwicklung, Deployment, Fairness und
   Erklärbarkeit, Incidents und Agenten, jede Phase hinterlässt einen Datensatz, den ein Gate liest.
5. **[Recht und Standards](/bok#part-law)** (18–22): die KI-Verordnung der EU, Datenschutz, das
   andere Recht, das bereits gilt, KI-Gesetze weltweit und die Prinzipien und Standards.

Die meisten Kapitel beginnen mit einer "Auf einen Blick"-Zusammenfassung und einer Liste von
Schlüsselbegriffen, die jeweils mit ihrer Glossarseite verlinkt sind, und enden mit "Was Sie diese
Woche tun können". Kapitel verlinken untereinander nach Abschnitt, sodass ein Thema über Teile
hinweg verfolgt werden kann. Auf der Website tragen die Muster, Vorlagen, das Verpflichtungsregister
und das Toolkit das gleiche Material in einer Form, die Sie in eine Pipeline kopieren können.

## Was das nicht ist

Das ist keine Compliance-Checkliste und keine Rechtsberatung. Es sagt Ihnen nicht, ob Ihr System
konform ist; es sagt Ihnen, wie Sie die Kontrollen und Nachweise bauen, die es jemandem
Qualifiziertem ermöglichen, diese Entscheidung zu treffen. Es ist keine KI-Safety-Forschungsagenda,
kein MLOps-Handbuch und kein Leitfaden zum Kauf von Anbietern; Tools werden nur als illustrative
Beispiele einer Kategorie genannt, niemals als Empfehlungen. Und es ist nicht fertig. Version 0.5.0
ist ein öffentlicher Entwurf mit absichtlichen Lücken, die zu Beiträgen offen sind.

## Wie Sie zitieren

> García Aibar, J. *AI Governance Engineering: The Body of Knowledge*, v0.5.0. 2026.
> https://aigovernanceengineer.com/bok. Licensed CC BY 4.0.

Für die These zitieren Sie beide Co-Autoren:

> García Aibar, J., & Pols, A. *The AI Governance Engineering Thesis*, v0.5.0. 2026.
> https://aigovernanceengineer.com/thesis. Licensed CC BY 4.0.

Zitieren Sie ein bestimmtes Kapitel nach seiner Nummer und seinem Titel (zum Beispiel "Kapitel 01,
Die Definition"). Die kanonische Heimat der These ist https://aigovernanceengineer.com/thesis und
des Body of Knowledge https://aigovernanceengineer.com/bok. Jedes Kapitel trägt seine eigene
nummerierte Quellenliste; die konsolidierte Tabelle lebt in `sources/SOURCES.md`.

## Versionierung

Das ist **v0.5.0**, ein öffentlicher Entwurf. Versionierung ist im Geist semantisch: Patch-Releases
beheben Fakten und Tippfehler, Minor-Releases fügen Kapitel oder Muster hinzu, und ein 1.0 markiert
den Punkt, an dem die Kernkapitel (00–10) vollständig und überprüft sind. Jede Änderung wird in
`bok/CHANGELOG.md` aufgezeichnet. Da sich die Regulierungs- und Standards-Landschaft bewegt (die
Digital-Omnibus-Reform, harmonisierte Standards unter JTC 21, die OWASP- und CSA-Releases), tragen
Kapitel ein "aktuell ab"-Datum und sollen überarbeitet werden.

## Wie Sie beitragen

Dieses Buch begrüßt anerkannte Beiträge. Um beizutragen:

1. Lesen Sie `STYLEGUIDE.md` und folgen Sie der Kapitel- oder Mustervorlage genau.
2. Quellen Sie jeden faktischen Anspruch. Verwenden Sie das `[n]`}-Zitierformat, markieren Sie jede
   Quelle `primary`, `secondary` oder `reported`, und fügen Sie die Zeile zu {`sources/SOURCES.md`}
   unter dem Abschnitt Ihres Kapitels hinzu.
3. Öffnen Sie einen Pull Request. Um die These zu unterzeichnen, fügen Sie Ihren Namen zu
   `bok/CONTRIBUTORS.md` hinzu.

Die Regeln existieren, damit viele Hände ein kohärentes Buch produzieren. Alles andere (die
Argumente, die Muster, die Zuordnungen) ist offen für Sie zum Verbessern.

**Zuordnung:** Dieses Vorwort macht keine normative Aussage; die Standards, die es nennt, werden
vollständig in den Kapiteln 04, 05, 08, 18 und 22 behandelt.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
