---
lang: de
source: bok/20-existing-law.md
sourceHash: "179fe9816c0f1c18447beceee294f06e854a51817f689d791e15cd8e3e0a9b39"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 20. Anderes Recht, das bereits auf KI anwendbar ist

> Urheberrecht, Antidiskriminierungs-, Verbraucherschutz- und Produkthaftungsrecht binden bereits
> KI-Systeme; dieses Kapitel ordnet jede Pflicht ihrem Evidence-Artefakt und ihrer Stack-Schicht zu.

Das KI-Recht ist die neueste Rechtsschicht über KI-Systemen, nicht die einzige. Vier ältere
Rechtsbereiche erreichten KI zuerst und werden heute gegen sie durchgesetzt: Geistiges Eigentum,
Nichtdiskriminierung, Verbraucherschutz und Produkthaftung. Ein US-Regulator fasste die Prämisse in
einen Satz zusammen, als er einen Sweep gegen betrügerische KI-Ansprüche startete: "es gibt keine
KI-Ausnahme von den geltenden Gesetzen" [1]. Keines dieser Gesetze wurde für Modelle geschrieben,
aber jedes stellt eine Frage, die ein KI-System mit Nachweisen beantworten muss: Hatten wir das
Recht, diese Eingabe zu verwenden, benachteiligt das System eine geschützte Gruppe, ist das, was wir
darüber sagen, wahr, und war es fehlerhaft, als es unsere Kontrolle verließ.

Für jeden Rechtsbereich gibt das Kapitel die Doktrin in einfachen Worten, einen datierten
EU-/US-/UK-Vergleich und das Artefakt, die Stack-Schicht (Kapitel 04) und das Muster (Kapitel 05),
die Konformität nachweisen. Es schließt mit Deepfakes und einem Einstellungsmodell, das fünf
Rechtsbereiche gleichzeitig durchläuft.

Es ist keine Rechtsberatung. **KI-Compliance- und Rechtsabteilungen** interpretieren diese
Verpflichtungen; der Ingenieur wandelt die Interpretation in eine Kontrolle und einen Datensatz um
und verlässt sich darauf, dass der Anwalt die Auslegung bestätigt (siehe
[den Disambiguierungs-Cluster](/bok/definition#the-disambiguation-cluster) und
[regulatorische Übersetzung](/bok/the-role#regulatory-translation)). Datenschutzrecht hat sein
eigenes Kapitel ([19](/bok/privacy-and-ai#how-to-read-this-chapter)), das KI-Recht hat Kapitel
[18](/bok/eu-ai-act#how-to-read-this-chapter), und KI-spezifische Statuten weltweit sind in Kapitel
[21](/bok/ai-laws-worldwide#the-landscape-at-a-glance), mit den
[Sektorregeln, die bereits KI erreichen](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai).
Jeder Status in diesem Kapitel ist mit dem Stempel 2026-09-24 versehen; Gerichtsverfahren und
Umsetzungsfristen verschieben sich, überprüfen Sie daher erneut, bevor Sie sich auf eine Zeile
verlassen.

## Wie man dieses Kapitel liest

Jeder Rechtsbereich stellt eine Frage an ein KI-System. Die Tabelle benennt das Artefakt, das es
beantwortet, und seine Schicht in [dem Stack](/bok/the-stack#how-to-read-the-stack):
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Rechtsbereich | Die Frage, die er an ein KI-System stellt | Primäres Evidence-Artefakt | Schicht |
|---|---|---|---|
| Geistiges Eigentum | Hatten wir das Recht, jede Eingabe zu verwenden, und kopiert eine Ausgabe geschützte Ausdrucksformen? | [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); Memorisierungs-Eval; Output-Filter-Log | 2 · 3 · 4 |
| Nichtdiskriminierung | Benachteiligt das System eine geschützte Gruppe auf eine Weise, die es nicht rechtfertigen kann? | Per-Gruppen-Impact-Eval; Suchlog für weniger diskriminierende Alternativen; Reason-Code-Treutest | 3 · 5 |
| Verbraucherschutz | Ist das, was wir über das System behaupten, oder tun durch seine Schnittstelle, irreführend oder unfair? | Claims-Register verknüpft mit Eval-Läufen; Interface- und Disclosure-Review-Record | 1 · 3 · 5 |
| Produkthaftung | War das System fehlerhaft, als es unsere Kontrolle verließ, und haben wir vor seinen Grenzen gewarnt? | FMEA; AIBOM mit Hashes; Eval-Verlauf; Change-Log; Betriebsanleitung | 2 · 3 · 5 |
| Synthetische Medien | Ist generierte Medien gekennzeichnet, offengelegt und auf Anfrage entfernbar? | Provenance-Markierung bei Generierung; Takedown-Pipeline mit Uhr | 4 · 5 |

Drei Vorsichtsmaßnahmen durchziehen das Kapitel.

- **Gerichtsbarkeit entscheidet die Antwort.** Der gleiche Trainingslauf kann in einem Land
  rechtmäßig und in einem anderen verletzend sein, daher zeichnen die Artefakte auf, *wo* Daten
  kopiert, ein Modell trainiert und ein System auf den Markt gebracht wurden.
- **Der Nachweis, den Sie führen, ist Nachweis, den Sie vorlegen können müssen.** Unter dem neuen
  Produkthaftungsregime der EU kann ein Gericht einen Beklagten anordnen, relevante Nachweise
  offenzulegen, und das Versäumnis, dies zu tun, löst eine Vermutung aus, dass das Produkt
  fehlerhaft war [2]. Eine Verteidigungsdatei, die unvollständig oder ungenau ist, wirkt gegen Sie.
  Führen Sie sie vollständig, versioniert und ehrlich.
- **Zuordnungen sind illustrativ, keine Konformitätsaussage.** Ein Artefakt unterstützt und belegt
  eine Verpflichtung; ob die Verpflichtung erfüllt ist, ist eine rechtliche Beurteilung.

## Geistiges Eigentum

Geistiges Eigentum berührt ein KI-System an vier Punkten: die Werke, die zu seinem Training kopiert
wurden, seine Ausgaben, die vertraulichen Informationen, die ihm zugeführt werden, und die
Erfindungen, die es hilft zu machen. An jedem Punkt zeichnet der Ingenieur auf, was passiert ist, wo
und unter welchem Recht.

### Urheberrecht und Trainingsdaten

Das Kopieren eines Werkes in einen Trainingskorpus ist oberflächlich betrachtet eine
Vervielfältigung. Die rechtliche Frage ist, ob eine Ausnahme (die EU-, UK- und japanische Route)
oder eine Verteidigung (die US-Route) sie abdeckt.

**Europäische Union.** Die Digital-Single-Market (DSM) Richtlinie schafft zwei Text-and-Data-Mining
(TDM) Ausnahmen. Artikel 3 ermöglicht Forschungsorganisationen und Kulturerbeinstitutionen, Werke
für wissenschaftliche Forschung zu durchsuchen. Artikel 4 ist die allgemeine Ausnahme: Jeder darf
rechtmäßig zugängliche Werke für TDM kopieren und die Kopien so lange behalten, wie nötig, es sei
denn, der Rechteinhaber hat diese Nutzung ausdrücklich "auf angemessene Weise, wie beispielsweise
maschinenlesbarer Mittel im Falle von online öffentlich zugänglichen Inhalten" reserviert [3]. Das
KI-Recht wandelt diesen Opt-out in eine Anbieter-Pflicht um: Artikel 53(1)(c) verlangt von jedem
Anbieter eines KI-Modells mit allgemeinem Verwendungszweck (GPAI), eine Urheberrechtspolitik
einzuführen, die Artikel 4(3) Reservierungen identifiziert und einhält, und Artikel 53(1)(d)
verlangt eine öffentliche Zusammenfassung des Trainingsinhalts auf der AI-Office-Vorlage [4]. Die
Kommission veröffentlichte diese Vorlage am 24. Juli 2025 [5]. Die Open-Source-Ausnahme in Artikel
53(2) hebt nur die Dokumentationspflichten in den Punkten (a) und (b) auf, daher schulden
Open-Weight-Modelle immer noch die Urheberrechtspolitik und die Zusammenfassung [4]. Der GPAI Code
of Practice wandelt die Politik in fünf Maßnahmen um: eine schriftliche Politik, rechtmäßiger Zugang
(keine Paywall-Umgehung, keine hartnäckig verletzenden Websites), Crawler, die `robots.txt`
befolgen, Schutzmaßnahmen gegen verletzende Ausgaben und einen Beschwerdekontakt [6].

Die Gerichte füllen die Details aus. In *Kneschke v LAION* entschied das Hanseatische
Oberlandesgericht am 10. Dezember 2025, dass der Aufbau des LAION-5B-Datensatzes in die deutschen
TDM-Ausnahmen fiel und dass eine in natürlicher Sprache in Website-Bedingungen geschriebene
Reservierung nicht maschinenlesbar war; es erlaubte eine weitere Berufung zum Bundesgerichtshof [7].
In *GEMA v OpenAI* entschied das Münchner Landgericht am 11. November 2025, dass in den Parametern
eines Modells memorierte Songtexte Vervielfältigungen sind, dass die TDM-Ausnahme vorbereitende
Kopien abdeckt, aber nicht die langfristige Einarbeitung von Werken in das Modell, und dass
Ausgaben, die die Texte reproduzieren, die Verantwortung des Anbieters sind [8]; überprüfen Sie, ob
eine Berufung anhängig ist, bevor Sie sich darauf verlassen (überprüfen). Der Gerichtshof der
Europäischen Union verhandelte seinen ersten generativen KI-Urheberrechtsfall, *Like Company v
Google* (C-250/25), am 10. März 2026, darüber, ob Training eine Vervielfältigung ist, ob Artikel 4
es abdeckt und ob Chatbot-Antworten, die Presseinhalt reproduzieren, eine Mitteilung an die
Öffentlichkeit sind. Eine Stellungnahme eines Generalanwalts war für den 3. September 2026 geplant;
das Urteil steht ab 2026-09-24 aus [9] (überprüfen Sie die Stellungnahme).

**Vereinigte Staaten.** Es gibt keine TDM-Ausnahme. Training wird unter Fair Use beurteilt, das vier
Faktoren abwägt: den Zweck und Charakter der Nutzung (einschließlich ob sie transformativ ist), die
Natur des Werkes, die verwendete Menge und die Auswirkung auf den Markt für das Werk [10]. Die
bisherigen Fälle hängen von ihren Fakten ab; sie sind unten tabellarisch aufgeführt.

**Vereinigtes Königreich.** Die TDM-Ausnahme des Vereinigten Königreichs deckt Kopien ab, die für
Computeranalysen "ausschließlich zum Zweck der Forschung für einen nicht kommerziellen Zweck"
angefertigt werden [11]. Der Statutenbericht der Regierung vom 18. März 2026 setzte die
Opt-out-Ausnahme, zu der sie konsultiert hatte, nicht um; er schlägt vor, weitere Nachweise zu
sammeln und Eingabetransparenz durch Best Practice statt durch Gesetz zu entwickeln [12] [13]. In
*Getty Images v Stability AI* wies das Urteil des High Court vom November 2025 die Anspruch auf
sekundäre Verletzung ab, da die Modellgewichte keine "verletzende Kopie" waren; die Genehmigung zur
Berufung in diesem Punkt wurde erteilt, und die Berufung ist anhängig [14].

**Japan.** Artikel 30-4 des Urheberrechtsgesetzes gestattet die Nutzung eines Werks, wenn der Zweck
nicht darin besteht, seinen Ausdruck zu genießen, wie etwa beim KI-Training, es sei denn, dies würde
"die Interessen des Urheberrechtsinhabers unangemessen beeinträchtigen". Das nicht bindende *General
Understanding* des Japan Copyright Office (Mai 2024) ordnet Training, das darauf abzielt, den
Ausdruck der Trainingswerke auszugeben (absichtliches Overfitting, imitatives Fine-Tuning,
Retrieval-Augmented Generation, das die Quelle ausgibt), außerhalb von Artikel 30-4 ein, und das
Kopieren einer zum Analysieren verkauften Datenbank unter Umgehung von Maßnahmen wie `robots.txt`
fällt unter die Ausnahmeregelung [15].

| Frage (Stand 2026-09-24) | EU | Vereinigte Staaten | Vereinigtes Königreich | Japan |
|---|---|---|---|---|
| Ist kommerzielles Training auf rechtmäßig zugänglichen Werken ohne Lizenz zulässig? | Ja, unter DSM Art. 4, sofern nicht vorbehalten [3] | Nur wenn Fair Use, entschieden von Fall zu Fall [10] | Keine allgemeine Ausnahme; s. 29A nur für nicht kommerzielle Forschung [11] | Ja, für Nicht-Genusszwecke, unter Vorbehalt der Ausnahmeregelung [15] |
| Wie kann ein Rechteinhaber sich abmelden? | Ausdrückliche Reservierung, maschinenlesbar für Online-Inhalte [3] | Keine gesetzliche Opt-out | Nicht anwendbar; Opt-out-Ausnahme nicht angenommen [12] | Keine Opt-out; technische Maßnahmen sind für die Ausnahmeregelung relevant [15] |
| Anbieter-Pflicht zur Veröffentlichung von Trainingsinformationen? | Ja für GPAI-Anbieter: Art. 53(1)(d) Zusammenfassung [4] | Keine bundesweite Pflicht | Keine gesetzliche Pflicht [13] | Nein |

### US-Trainingsfälle, datiert

Jedes Urteil beruhte auf seiner eigenen Dokumentation; keines ist eine Regel für jedes Modell.

| Fall | Gericht | Was wurde entschieden | Status (Stand 2026-09-24) |
|---|---|---|---|
| *Thomson Reuters v. ROSS Intelligence* | D. Del.; 3d Cir. Nr. 25-2153 | Das Kopieren von Kopfzeilen zum Aufbau eines konkurrierenden, nicht generativen Rechtsrecherche-Tools war keine Fair Use (11. Feb. 2025) [16] | Einstweilige Berufung verhandelt 11. Juni 2026; Entscheidung ausstehend [17] |
| *Bartz v. Anthropic* | N.D. Cal. | Training auf rechtmäßig erworbenen Büchern war Fair Use; das Führen einer zentralen Bibliothek mit Raubkopien war nicht (23. Juni 2025) [18] | Klassenvergleich von USD 1,5 Milliarden endgültig genehmigt 20. Juli 2026; Verzicht begrenzt auf vergangenes Verhalten, Ansprüche auf Ausgaben bleiben erhalten [18] [19] |
| *Kadrey v. Meta* | N.D. Cal. | Teilweise Zusammenfassung des Urteils für Meta zu Fair Use für Training, basierend auf der Dokumentation, die die Kläger aufgebaut haben (25. Juni 2025) [20] | Urteil beschränkt auf diese Kläger und diese Dokumentation [20] |
| *New York Times v. Microsoft and OpenAI* | S.D.N.Y. | Ansprüche über Training und Reproduktion von Nachrichtenartikeln | Ausstehend bei Zusammenfassung des Urteils; das US-Justizministerium reichte im September 2026 zugunsten der Beklagten ein [21] |
| *Andersen v. Stability AI* | N.D. Cal. | Ansprüche von Künstlern über Bildmodell-Training und -Vertrieb | Ausstehend; Geschworenenverfahren auf 20. September 2027 verschoben [22] |
| *Disney Enterprises v. Midjourney* | C.D. Cal. | Ansprüche der Studios über Training und Charakterausgaben (eingereicht 11. Juni 2025) | Ausstehend [23] |

Aus diesen Fällen und den EU-Fällen folgen drei Engineering-Lektionen.

- **Wie Sie die Daten erworben haben, ist wichtig.** *Bartz* unterschied zwischen rechtmäßigem
  Kauf-und-Scan und Raubkopien [18], daher erfasst das Ledger der Trainings-Datenrechte den
  Akquisitionskanal, nicht nur die Lizenz.
- **Memorisierung ist das Risiko auf der Ausgabenseite.** *GEMA* drehte sich um Liedtexte, die das
  Modell reproduzieren konnte [8]; eine Memorisierungs-Eval findet diese Exposition, bevor ein
  Kläger sie findet.
- **Opt-outs werden von Maschinen zur Crawl-Zeit gelesen.** *LAION* und der Code stützen sich beide
  auf maschinenlesbare Signale [7] [6]; die Crawler-Richtlinie ist Code und ihre Entscheidungen sind
  Protokolle.

### Ausgaben: Memorisierung und Eigentum

**Verletzende Ausgaben.** Sprachmodelle können seltene Trainingssequenzen bei gezielten Abfragen
wörtlich zurückgeben, und größere Modelle sind stärker exponiert [24]. Die Kontrollen sitzen in zwei
Schichten: eine Eval, die vor der Freigabe nach Regurgitation prüft (Schicht 03) und ein
Ausgabefilter, der nahezu wörtliche Reproduktion geschützter Korpora oder lizenziertem Code in der
Produktion blockiert (Schicht 04), die Schutzmaßnahmen, die der Code of Practice fordert [6].

**Wer besitzt eine Ausgabe.** In den Vereinigten Staaten erfordert das Urheberrecht einen
menschlichen Autor. Der D.C. Circuit hielt dies am 18. März 2025 in *Thaler v. Perlmutter* fest
[25], und der Supreme Court lehnte es ab, den Fall am 2. März 2026 zu überprüfen [26]. Der Bericht
des US Copyright Office zur Urheberrechtsfähigkeit (29. Januar 2025) behandelt Prompts allein als
unzureichend für Urheberschaft, während menschliche ausdrucksstarke Beiträge, Auswahl und Anordnung
sowie Änderungen der KI-Ausgabe geschützt werden können; seine Registrierungsleitlinien vom März
2023 verlangen von Antragstellern, KI-generiertes Material offenzulegen [27]. Sein Bericht zum
Training (Teil 3) ist noch eine Vorabveröffentlichungsversion [27]. Das Vereinigte Königreich ist
der Ausreißer: Bei einem computergenerierten Werk ist der Autor "die Person, von der die für die
Erstellung des Werks erforderlichen Vorkehrungen getroffen werden" [11].

Für den Engineer ist Eigentum ein Herkunftsproblem: Der Schutz eines Assets, bei dessen Erstellung
ein Modell geholfen hat, erfordert einen Datensatz über den menschlichen Beitrag (Prompts, Auswahl,
Bearbeitungen, wer und wann), was auch die Offenlegung unterstützt, die eine Registrierung verlangt.

### Datenbankrechte und Geschäftsgeheimnisse

**Datenbankrecht.** Die EU gewährt dem Hersteller einer Datenbank ein sui-generis-Recht gegen
Entnahme oder Wiederverwendung aller oder eines wesentlichen Teils ihres Inhalts, wenn der
Hersteller wesentlich in die Beschaffung, Überprüfung oder Darstellung investiert hat [28]. Das
Scraping einer Datenbank zum Training ist eine Entnahme; DSM Artikel 4 deckt dies unter denselben
Bedingungen wie das Urheberrecht ab, einschließlich der Reservierung [3].

**Geschäftsgeheimnisse und Lecks durch Prompts.** Ein Geschäftsgeheimnis ist nur geschützt, solange
sein Inhaber "angemessene Schritte" (EU) oder "angemessene Maßnahmen" (USA) unternimmt, um es geheim
zu halten [29] [30]. Zwei KI-Pfade gefährden diese Bedingung: Mitarbeiter, die Code, Preise oder
Kundendaten in ein Modell eines Drittanbieters einfügen, dessen Bedingungen Aufbewahrung oder
Training erlauben, und Fine-Tuning auf vertraulichem Material, das Extraktionsangriffe später
wiederherstellen können [24]. Ein Datensatz, der zeigt, dass überhaupt keine Kontrolle vorhanden
ist, ist ein schlechter Anfang in beiden Fällen. Die Artefakte sind gewöhnlich und kostengünstig:
eine Datenverlust-Präventionsregel vor jedem externen Modell-Endpunkt (Schicht 04,
[Runtime Guardrail](/patterns/runtime-guardrail)); ein Anbieter-Datensatz von Aufbewahrung und
No-Training-Bedingungen, überprüft beim
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate); und ein
Datenklassifizierungs-Tag auf jedem Fine-Tuning-Set, damit ein Geheimnis niemals eine
Trainings-Pipeline ohne eine aufgezeichnete Entscheidung betritt.

### Patente und KI-Erfinderschaften

Die DABUS-Anmeldungen, bei denen ein KI-System als alleiniger Erfinder benannt wurde, scheiterten
überall dort, wo sie getestet wurden. Der US Federal Circuit hielt am 5. August 2022 fest, dass ein
Erfinder eine natürliche Person sein muss [31]; der UK Supreme Court kam am 20. Dezember 2023 zum
gleichen Ergebnis [32]; und das Beschwerdegericht des EPA hielt am 21. Dezember 2021 fest, dass
"eine Maschine kein Erfinder" gemäß dem EPÜ ist [33]. Für KI-gestützte Erfindungen hob das USPTO
seine Leitlinien vom Februar 2024 am 28. November 2025 auf und ersetzte sie: KI wird wie jedes
andere Werkzeug behandelt, und der gewöhnliche Konzeptionstest gilt für die beteiligten Menschen
[34].

Das Artefakt ist ein Erfindungs-Datensatz, der menschliche Konzeption (wer das Problem formuliert
und die Lösung erkannt hat) zusammen mit den verwendeten KI-Tools und Eingaben erfasst.

### Modelllizenzen und Anbieter-Schadloshaltungen

**Offene Gewichte sind nicht dasselbe wie Open Source.** Viele Open-Weight-Modelle werden unter
Lizenzen mit Nutzungsbeschränkungen ausgeliefert. Die Llama 3.1-Lizenz beispielsweise enthält eine
Acceptable-Use-Policy und erfordert eine separate Lizenz von Meta für Lizenznehmer, deren Produkte
zum Veröffentlichungsdatum 700 Millionen monatlich aktive Nutzer überschritten haben [35]. Die
Definition der Open Source Initiative erfordert dagegen die bevorzugte Form für Änderungen:
Dateninformationen, Code und Parameter [36]. Die Open-Source-Entlastung des AI Act ist noch enger
und deckt niemals die Urheberrechtspflichten ab [4].

Die Kontrolle ist ein Lizenzfeld auf jedem Modell und Datensatz im [AIBOM](/patterns/aibom), plus
eine Richtlinie, die eine Bereitstellung blockiert, deren Anwendungsfall gegen die
Nutzungsrichtlinie oder den kommerziellen Schwellenwert der Lizenz verstößt (Schicht 01). Eine
Lizenz, die einmal bei der Beschaffung gelesen und nie wieder überprüft wird, ist keine Kontrolle.

**Schadloshaltungen sind bedingt, und die Bedingungen sind Laufzeit-Kontrollen.** Microsofts Copilot
Copyright Commitment (7. September 2023) ist beispielsweise daran gebunden, dass der Kunde die
integrierten Guardrails und Content-Filter nutzt und nicht versucht, verletzende Inhalte zu
generieren [37]. Das Ausschalten der Filter, um falsch positive Ergebnisse zu reduzieren, kann die
Schadloshaltung ausschalten. Erfassen Sie Umfang und Bedingungen beim Due-Diligence-Gate, und führen
Sie Konfigurationsabbilder und Filter-Protokolle, die zeigen, dass die Bedingungen erfüllt waren,
als die Ausgabe produziert wurde.

### Artefakte, die IP-Compliance nachweisen

| Artefakt | Was es aufzeichnet | Schicht | Muster |
|---|---|---|---|
| Ledger der Trainings-Datenrechte | Pro Datensatz: Quelle, Akquisitionskanal, Lizenz, TDM-Reservierungsprüfung (Ergebnis, Methode, Datum), Kopierort | 2 | [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); [AIBOM](/patterns/aibom) |
| Crawler-Richtlinie-als-Code | Einhaltung von `robots.txt` und anderen maschinenlesbaren Reservierungen; keine Paywall-Umgehung; Blockliste von Seiten mit Urheberrechtsverletzungen | 1 | [Policy Card](/patterns/policy-card) |
| Memorisierungs- und Regurgitations-Eval | Extraktionssonden und Verbatim-Überlappungs-Schwellenwerte pro Modellversion | 3 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| Ausgabefilter-Protokoll | Blockierte nahezu wörtliche Ausgaben; Lizenzübereinstimmungen bei generiertem Code | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| Urheberrechtsrichtlinie und Trainings-Zusammenfassung | Versionierte Art. 53(1)(c)-Richtlinie und Art. 53(1)(d)-Zusammenfassung für GPAI-Anbieter | 5 | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Lizenz- und Schadloshaltungs-Register | Modell- und Datensatz-Lizenzen, Nutzungsrichtlinien, Schadloshaltungs-Umfang und -Bedingungen | 2 · 5 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| Prompt-DLP-Regel | Geheimnisse und Quellcode blockiert oder redigiert vor externen Aufrufen | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |

> **In der Praxis (illustrativ)**
> Ein Abruf-Assistent für das Verkaufsteam eines Verlags wurde auf einem Korpus aufgebaut, der von
> drei verschiedenen Teams zusammengestellt wurde. Das Ledger für Rechte wurde nachträglich
> hinzugefügt: eine Zeile pro Quelle mit ihrem Akquisitionskanal und ihrer Lizenz. Zwei Quellen
> hatten keine Lizenz im Datensatz und eine war von einer Website gescraped worden, deren
> `robots.txt` den Crawler-User-Agent nicht zuließ. Der Korpus-Build schlägt nun fehl, wenn eine
> Quelle keine Ledger-Zeile hat, die Allow/Deny-Entscheidungen des Crawlers werden pro URL
> protokolliert, und die zwei unlizenziert Quellen wurden entfernt und der Index neu erstellt, wobei
> der Neuaufbau gegen dieselbe Registry-ID aufgezeichnet wurde.

## Nichtdiskriminierung

Antidiskriminierungsgesetze fragen nicht, ob ein Modell abstrakt fair ist. Sie fragen, ob eine
Entscheidung in einem regulierten Bereich eine geschützte Gruppe schlechter behandelt hat und ob die
Praxis, die dies verursacht hat, gerechtfertigt werden kann. Die Ingenieurarbeit besteht darin, die
Auswirkung in den Begriffen des Gesetzes zu messen und die Rechtfertigung bei der Messung zu
dokumentieren.

### Unterschiedliche Behandlung, unterschiedliche Auswirkungen und Proxies

**Zwei Theorien.** *Unterschiedliche Behandlung* ist die Behandlung einer Person anders wegen eines
geschützten Merkmals. *Unterschiedliche Auswirkungen* sind eine neutrale Praxis, die eine geschützte
Gruppe stärker trifft. Nach Title VII beweist ein Kläger die Auswirkung, indem er zeigt, dass eine
bestimmte Praxis sie verursacht; der Arbeitgeber muss dann zeigen, dass die Praxis "job related for
the position in question and consistent with business necessity" ist; und der Kläger kann trotzdem
gewinnen, indem er eine alternative Beschäftigungspraxis mit geringeren Auswirkungen nachweist, die
der Arbeitgeber ablehnt [38]. Das EU-Recht zieht die gleiche Linie zwischen direkter und indirekter
Diskriminierung: ein scheinbar neutrales Kriterium, das eine Gruppe "in besondere Schwierigkeiten
versetzt", ist rechtswidrig, "es sei denn, diese Bestimmung, dieses Kriterium oder diese Praxis ist
durch ein legitimes Ziel objektiv gerechtfertigt und die Mittel zur Erreichung dieses Ziels sind
angemessen und erforderlich" [39] [40].

**Durchsetzungshaltung ist nicht das Gesetz.** In den Vereinigten Staaten weist die Executive Order
14281 vom 23. Apr 2025 Bundesbehörden an, die Durchsetzung von Gesetzen und Vorschriften insoweit zu
deprioritisieren, als sie Haftung für unterschiedliche Auswirkungen beinhalten [41], und die HUD hat
vorgeschlagen, ihre Fair Housing Act-Vorschriften zu unterschiedlichen Auswirkungen zu streichen,
mit einem ergänzenden Vorschlag, dessen Kommentierungsfrist bis 9. Okt 2026 läuft [42]. Bei Krediten
geht der Schritt über die Haltung hinaus: Die CFPB änderte Regulation B, gültig ab 21. Jul 2026, um
festzustellen, dass ECOA keine Haftung für unterschiedliche Auswirkungen autorisiert (der "effects
test"), wobei die Adverse-Action-Regeln in 12 CFR 1002.9 unverändert bleiben [83]. Title VIIs Text
zu unterschiedlichen Auswirkungen ist unverändert [38], private Klagen werden fortgesetzt (siehe
*Mobley* unten) und EU- und Staatsrecht sind nicht betroffen, daher bleibt der Impact-Test für
Beschäftigung unter Staatsrecht und in der EU; bei US-Krediten ruht er nicht mehr auf Regulation B
[83].

**Proxies.** Das Entfernen des geschützten Attributs entfernt nicht die Auswirkung: Postleitzahl,
Name, Schulbildung oder Karrierelücken können die gleiche Information tragen. Blindheit macht das
Testen auch schwieriger, da man eine Disparität über Gruppen hinweg nicht messen kann, die man nicht
erfasst hat; zum Testen müssen Sie das Attribut verarbeiten. Nach dem Digital Omnibus gibt der neue
Artikel 4a der KI-Verordnung Anbietern von Hochrisiko-Systemen eine Grundlage, Daten besonderer
Kategorien zur Bias-Erkennung zu verarbeiten, mit Pseudonymisierung und Löschung nach Korrektur des
Bias [43]. Kapitel [16](/bok/fairness-and-explainability#group-fairness-metrics) behandelt die
Metriken selbst; dieser Abschnitt behandelt, wogegen das Gesetz sie lesen wird.

### Beschäftigung

**Vereinigte Staaten.** Title VII gilt für KI-Screening wie für jedes andere Auswahlverfahren [38],
und Anbieter sind nicht sicher außerhalb des föderalen Altersdiskriminierungsgesetzes: in *Mobley v.
Workday* zertifizierte das Gericht am 16. Mai 2025 bedingt eine landesweite
Altersdiskriminierungsklage gegen den Anbieter eines Bewerbungs-Screening-Systems [44]. New York
Citys Local Law 144 ist die konkreteste KI-spezifische Regel: Ein Arbeitgeber darf ein
automatisiertes Beschäftigungsentscheidungstool nicht verwenden, es sei denn, es wurde in den
letzten 12 Monaten einer Bias-Prüfung unterzogen, die Audit-Zusammenfassung ist veröffentlicht, und
Kandidaten werden 10 Geschäftstage vor der Verwendung benachrichtigt; die Durchsetzung begann am 5.
Jul 2023 [45]. Das Audit, von einem unabhängigen Dritten durchgeführt, meldet Auswahlquoten und
Impact-Verhältnisse nach Geschlecht, nach Rasse und Ethnizität und nach ihrer Schnittmenge [46].
Illinois änderte sein Human Rights Act, um diskriminatorische Arbeitgebernutzung von KI zu erfassen,
berichtet als gültig ab 1. Jan 2026 (überprüfen).

**Europäische Union.** Die Richtlinien zur Gleichbehandlung in Fragen der Rasse und zur
Gleichbehandlung in Beschäftigung und Beruf verbieten direkte und indirekte Diskriminierung beim
Zugang zu Beschäftigung, Arbeitsbedingungen und Beendigung [39] [40]. Die KI-Verordnung listet
Rekrutierung, Auswahl, Beförderung, Beendigung, Aufgabenzuweisung und Leistungsüberwachung als
Hochrisiko auf (Anlage III, Punkt 4) [47], wobei die Hochrisiko-Pflichten für Anlage III-Systeme
durch das Omnibus auf 2. Dez 2027 verschoben wurden [48]. Die Richtlinie über Plattformarbeit (EU)
2024/2831, die bis 2. Dez 2026 umgesetzt werden muss, geht weiter für digitale Arbeitsplattformen:
keine automatisierte Verarbeitung des emotionalen Zustands oder privater Gespräche eines Arbeiters
und keine Ableitung geschützter Merkmale (Art. 7); schriftliche Informationen zu automatisierten
Systemen und ihren Hauptparametern (Art. 9); eine Auswirkungsbewertung, einschließlich gleicher
Behandlung, mindestens alle zwei Jahre, und eine menschliche Entscheidung für jede Kontosperrung
oder Beendigung (Art. 10); und ein Recht auf Erklärung und Überprüfung, mit Berichtigung innerhalb
von zwei Wochen (Art. 11) [49].

### Kredit und Kreditvergabe

**Vereinigte Staaten.** Wenn ein Kreditgeber eine nachteilige Maßnahme ergreift, verlangt Regulation
B eine Angabe der spezifischen Gründe oder eine Mitteilung des Rechts, diese zu erhalten [50]. Das
CFPB-Rundschreiben 2022-03 sagte 2022, dass Kreditgeber, die komplexe Algorithmen, einschließlich KI
oder maschinelles Lernen, verwenden, immer noch die spezifischen Hauptgründe angeben müssen [51];
das CFPB zog das Rundschreiben am 12. Mai 2025 zurück [84], aber die Regulation B-Pflicht ist
unverändert [50][83]. Wenn die Entscheidung auf einem Verbraucherbericht beruht, fügt die FCRA ihre
eigenen Adverse-Action-Pflichten hinzu [52]. Die Ingenieurkonsequenz ist präzise: Die Gründe in der
Mitteilung müssen die Gründe sein, die das Modell verwendet hat, daher wird ein Grundcode, der von
einer Attributionsmethode erzeugt wird, auf Treue gegen jede Modellversion getestet (Kapitel 16 zu
[Adverse-Action-Mitteilungen](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)).

**Europäische Union.** Die zweite Verbraucherkreditrichtlinie (EU) 2023/2225 verlangt eine
Kreditwürdigkeitsbewertung auf Grundlage relevanter, genauer Informationen, ohne Daten besonderer
Kategorien oder soziale Netzwerke als Quelle (Art. 18(3)). Wenn die Bewertung automatisiert ist,
kann der Verbraucher menschliche Intervention erhalten: eine Erklärung der Bewertung und ihrer
Logik, eine Gelegenheit, seinen Standpunkt darzulegen, und eine Überprüfung (Art. 18(8)). Die
Mitgliedstaaten mussten die Regeln bis 20. Nov 2025 annehmen und ab 20. Nov 2026 anwenden [53]
(nationale Umsetzung und etwaige Änderung des Anwendungsdatums überprüfen).
Kreditwürdigkeits-Scoring ist auch Hochrisiko unter der KI-Verordnung (Anlage III, Punkt 5(b)),
wobei Betrugserkennung ausgeschlossen ist [47]; die Datenschutzregeln für automatisierte
Entscheidungen sind in Kapitel [19](/bok/privacy-and-ai#automated-decision-making).

### Wohnen, Versicherung und öffentliche Dienste

**Wohnen.** Der Fair Housing Act erreicht Ad-Delivery-Algorithmen: In einer Einigung von 2022 mit
dem US-Justizministerium erklärte sich Meta bereit, sein "Special Ad Audience"-Tool zu streichen und
ein System zu entwickeln, um die Varianz bei der Wohnungs-Ad-Lieferung über Gruppen hinweg zu
reduzieren [54]. In der EU deckt die Richtlinie zur Gleichbehandlung ohne Rücksicht auf die Rasse
den Zugang zu Waren und Dienstleistungen ab, die der Öffentlichkeit zur Verfügung stehen,
einschließlich Wohnen [39].

**Versicherung.** Colorados SB21-169 (unterzeichnet 6. Jul 2021) verbietet Versicherern, durch
externe Verbraucherdaten, Algorithmen und Vorhersagemodelle unfair zu diskriminieren, und verlangt
einen Risikomanagementsystem, eine Bewertung und Überwachung sowie eine Bestätigung durch einen
Chief Risk Officer unter Regeln, die der Kommissar Versicherungslinie für Versicherungslinie erlässt
[55] (überprüfen Sie die abgedeckten Linien und Stichtage der Implementierungsregeln ab 2026-09-24).
Das NAIC-Musterbulletin vom 4. Dez 2023 erwartet, dass Versicherer ein schriftliches Programm für
die verantwortungsvolle Nutzung von KI-Systemen führen, einschließlich Aufsicht über KI-Systeme und
Daten von Drittanbietern [56]. In der EU entschied der Gerichtshof in *Test-Achats*, dass die
Ausnahmeregelung, die geschlechtsspezifische Unterschiede bei Versicherungsprämien ermöglichte,
ab 21. Dez 2012 ungültig war [57], und die KI-Verordnung listet Risikobewertung und Preisgestaltung
in Lebens- und Krankenversicherung als Hochrisiko auf (Anlage III, Punkt 5(c)) [47].

**Öffentliche Dienste.** Berechtigungsentscheidungen für öffentliche Hilfe sind Hochrisiko unter der
KI-Verordnung (Anlage III, Punkt 5(a)) [47]. Im britischen *Bridges*-Fall stellte das
Berufungsgericht fest, dass die Polizeibehörde "nie versucht hatte, sich selbst zu vergewissern oder
durch unabhängige Überprüfung zu vergewissern, dass das Softwareprogramm in diesem Fall keine
unzulässigen Vorurteile aufgrund von Rasse oder Geschlecht hat", ein Verstoß gegen die
Gleichstellungspflicht des öffentlichen Sektors [58]. Das fehlende Artefakt war ein Bias-Test, den
der Betreiber besaß.

### Fairness-Maßnahmen, die das Gesetz anerkennt

Das Gesetz wählt keine einzelne Fairness-Metrik, aber mehrere seiner Tests sind quantitativ. Jeder
ordnet sich einer Eval und einem Datensatz zu.

| Rechtlicher Test | Was er fragt | Eval (Schicht 03) | Nachweisdatensatz (Schicht 05) |
|---|---|---|---|
| Vier-Fünftel-Regel (US-Auswahlverfahren) | Eine Auswahlquote unter 80 % der höchsten Gruppe ist im Allgemeinen ein Hinweis auf nachteilige Auswirkungen; kleinere Lücken können trotzdem zählen [59] | Adverse-Impact-Verhältnis pro Gruppe mit Stichprobengrößen und Signifikanztest | Signiertes Eval-Ergebnis pro Modellversion in der Model Card |
| Title VII unterschiedliche Auswirkungen | Auswirkungen verursacht durch eine Praxis; geschäftliche Notwendigkeit; weniger diskriminatorische Alternative [38] | Impact-Metriken; Job-Relatedness-Validierung; Suche über Kandidatenmodelle | Protokoll der betrachteten Alternativen und warum jede abgelehnt wurde |
| NYC Local Law 144 | Impact-Verhältnisse nach Geschlecht, Rasse und Ethnizität sowie intersektionalen Kategorien, von einem unabhängigen Auditor [46] | Die gleiche Berechnung auf historischen oder Testdaten | Veröffentlichte Audit-Zusammenfassung mit ihrem Datum; Kandidaten-Benachrichtigungsdatensatz |
| EU indirekte Diskriminierung | Besondere Benachteiligung; objektive Rechtfertigung; angemessene und erforderliche Mittel [39] | Gruppen-Disparitäts-Metriken plus Notwendigkeitsanalyse | Rechtfertigungsabschnitt in der [FRIA](/patterns/fria-as-code) oder DSFA |
| Nachteilige Maßnahme (ECOA, FCRA) | Spezifische Hauptgründe für die Entscheidung [50] [52] | Grundcode-Treue-Test gegen das Modell | Grundcode-Eval-Ergebnis und die Mitteilungsvorlagenversion |
| CCD2 Art. 18(8) | Erklärung, menschliche Intervention und Überprüfung [53] | [Erklär-Artefakt](/patterns/explanation-artefact) pro Modellversion | Überprüfungsprotokoll mit Ergebnis und Prüfer |

Die Vier-Fünftel-Regel ist eine Faustregel für Behörden, kein Safe Harbour [59]. Behandeln Sie ein
Auswirkungsverhältnis über 0,8 als Bestehen einer Prüfung, nicht als Nachweis der Rechtmäßigkeit.
Kapitel 16 berechnet und meldet es mit Zählungen und Intervallen
([disparate impact and the four-fifths rule](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)).

> **In der Praxis (illustrativ)**
> Ein Recruitingteam setzte ein Anbieter-Ranking-Modell in New York und zwei EU-Ländern ein. Die
> Bias-Audit des Anbieters war ein Jahr alt und wurde auf Daten eines anderen Kunden berechnet. Das
> Team führte die Auswirkungsverhältnisse monatlich auf seinem eigenen Bewerberstrom neu aus, als
> Pipeline-Eval mit einer Untergrenze von 0,8, die den Eigentümer benachrichtigte. Im dritten Monat
> fiel eine intersektionale Kategorie auf 0,71; die Ursache war ein neues Merkmal "Jahre
> ununterbrochener Erfahrung", das Karrierelücken benachteiligte. Das Merkmal wurde entfernt, das
> Suchprotokoll verzeichnete die getesteten Alternativen, und eine aktualisierte
> Audit-Zusammenfassung wurde vor der nächsten Runde veröffentlicht.

## Verbraucherschutz

Verbraucherschutzrecht erreicht KI durch drei Türen, ohne KI-spezifisches Gesetz: was Sie über das
System behaupten, wie seine Schnittstelle Menschen behandelt, und was es mit ihren Daten tut. Was
ein Chatbot einem Kunden sagt, bindet das Unternehmen, das ihn eingesetzt hat:
[Moffatt v. Air Canada](/cases/moffatt-v-air-canada) ist der Fall, der als Nachbetrachtung
dokumentiert wurde.

### Unlautere und irreführende Praktiken in den Vereinigten Staaten

Abschnitt 5 des FTC Act verbietet unlautere oder irreführende Handlungen oder Praktiken. Eine
Praktik ist unlautere nur, wenn sie "wesentliche Verletzungen für Verbraucher verursacht oder
wahrscheinlich verursacht, die von den Verbrauchern selbst nicht angemessen vermieden werden können
und nicht durch ausgleichende Vorteile aufgewogen werden" [60]. Irreführung ist nach der
Grundsatzstellungnahme der FTC von 1983 eine Darstellung, Unterlassung oder Praktik, die einen
angemessen handelnden Verbraucher wahrscheinlich irreführt und erheblich ist [61]. Eine
KI-Leistungsbehauptung ohne dahinter stehende Evidenz ist genau in diesem Sinne irreführend [62].

- **Unbegründete Leistungsbehauptungen.** Workado behauptete, sein KI-Inhaltsdetektor sei zu 98 %
  genau; Tests zeigten eine Genauigkeit bei allgemeinen Inhalten von 53 %, da das Modell auf
  akademischen Text trainiert wurde. Die Anordnung erfordert sachkundige und zuverlässige Evidenz
  für solche Behauptungen [62]. Die Überprüfung im September 2024, Operation AI Comply, zielte unter
  anderem auf einen "Roboter-Anwalt"-Dienst ab [1].
- **Einsatz ohne angemessene Schutzmaßnahmen.** Rite Aid ist für fünf Jahre vom Einsatz von
  Gesichtserkennung für Sicherheit oder Überwachung ausgeschlossen, nachdem die FTC behauptete, dass
  das Unternehmen die Technologie ohne angemessene Verfahren zur Schadensabwehr für Verbraucher
  eingesetzt hatte [63].
- **Algorithmische Gewinnabschöpfung.** Wenn ein Unternehmen auf Daten trainiert, die es
  rechtswidrig erhalten hat, kann die Abhilfe das Modell erreichen. Die Everalbum-Anordnung
  definiert "Affected Work Product" als "alle Modelle oder Algorithmen, die ganz oder teilweise
  unter Verwendung" der biometrischen Daten entwickelt wurden, und verlangt deren Löschung innerhalb
  von 90 Tagen mit einer eidesstattlichen Versicherung [64].
- **KI-Wäsche.** Im März 2024 einigte sich die SEC mit zwei Anlageberatern auf falsche Behauptungen
  über deren KI-Nutzung, für insgesamt 400.000 USD Bußgelder [65].
- **Gefälschte Bewertungen und Bots.** Die FTC-Regel zu Verbraucherbewertungen (16 CFR Part 465)
  verbietet gefälschte Bewertungen, einschließlich KI-generierter Bewertungen, die Personen
  zugeschrieben werden, die nicht existieren, mit Zivilstrafen [66]. Kalifornien macht es
  rechtswidrig, einen Bot zu verwenden, um eine Person über seine künstliche Identität irreführen,
  um etwas zu verkaufen oder eine Abstimmung zu beeinflussen, es sei denn, der Bot wird klar und
  deutlich offengelegt [67].

Durchsetzungsprioritäten ändern sich mit Verwaltungen; das Gesetz und die obigen Anordnungen nicht.
Eine Behauptung braucht Evidenz, wenn sie gemacht wird, und ein Modell, das auf verdorbenen Daten
trainiert wurde, kann zur Löschung angeordnet werden.

### Die EU: UCPD, DSA und KI-Verordnung

Die Richtlinie über unlautere Geschäftspraktiken verbietet Praktiken, die gegen berufliche Sorgfalt
verstoßen und das Wirtschaftsverhalten des Durchschnittverbrauchers erheblich verzerren oder
wahrscheinlich verzerren, beurteilt aus der Perspektive einer gefährdeten Gruppe, wenn diese gezielt
angesprochen wird [68]. Seit den Änderungen von 2019 enthält ihre schwarze Liste die Angabe, dass
Bewertungen von echten Benutzern stammen, ohne angemessene Schritte zur Überprüfung, und das
Einreichen oder Beauftragen gefälschter Bewertungen [69]. Das Gesetz über digitale Dienste fügt
plattformspezifische Regeln hinzu: Online-Plattformen dürfen Schnittstellen nicht so gestalten, dass
sie Benutzer täuschen oder manipulieren oder ihre freie und informierte Entscheidungsfindung
beeinträchtigen (Art. 25); Plattformen müssen die Hauptparameter ihrer Empfehlungssysteme erklären
(Art. 27); und die Risikominderung sehr großer Plattformen umfasst prominente Kennzeichnung
generierter oder manipulierter Medien, die echte Personen oder Ereignisse erheblich ähneln (Art.
35(1)(k)) [70]. Die KI-Verordnung verbietet KI-Systeme, die manipulative oder irreführende Techniken
verwenden oder Schwachstellen ausnutzen, um Verhalten so zu verzerren, dass erheblicher Schaden
entsteht (Art. 5(1)(a)–(b)) [71], und verlangt, dass Menschen darüber informiert werden, wenn sie
mit einem KI-System interagieren, es sei denn, dies ist offensichtlich (Art. 50(1)) [72].

### Vereinigtes Königreich: DMCC Act

Unter dem Digital Markets, Competition and Consumers Act 2024 gilt das allgemeine Verbot unlauterer
Geschäftspraktiken seit 6. Apr 2025 (s. 225), und die Praktiken, die immer als unlautere gelten,
umfassen gefälschte Verbraucherbewertungen und Bewertungen, die einen Anreiz verbergen (Sch. 20,
para. 13) [73].

| Praktik (Stand 2026-09-24) | Vereinigte Staaten | Europäische Union | Vereinigtes Königreich | Evidenz-Artefakt | Schicht |
|---|---|---|---|---|---|
| Unbegründete Genauigkeits- oder Fairness-Behauptung | FTC Act s. 5; Workado-Anordnung [62] | UCPD-Generalklausel [68] | DMCC s. 225 [73] | [Claims-Register](/patterns/claims-substantiation-gate) verknüpft mit Eval-Läufen | 3 · 5 |
| KI-generierte gefälschte Bewertungen | 16 CFR Part 465 [66] | UCPD Anlage I, 23b–23c [69] | DMCC Sch. 20, para. 13 [73] | Richtlinie, die Bewertungsgenerierung blockiert; Herkunftsprotokoll | 1 · 4 |
| Nicht offengelegter Bot | Cal. BPC s. 17941 [67] | KI-Verordnung Art. 50(1) [72] | Keine Bot-spezifische Regel; s. 225 kann gelten [73] | Offenlegungskontrolle und ein Test, der sie rendert | 4 |
| Manipulative Schnittstelle oder Ausgabe | FTC Act s. 5 Unlauterkeit [60] | DSA Art. 25 [70]; KI-Verordnung Art. 5(1)(a)–(b) [71] | s. 225 [73] | Schnittstellenüberprüfung; Red-Team-Eval für Manipulation | 3 · 5 |
| Modell auf rechtswidrig erhaltenen Daten aufgebaut | Löschung von "Affected Work Product" [64] | Datenschutzrechtliche Abhilfemaßnahmen (Kapitel 19) | Datenschutzrechtliche Abhilfemaßnahmen (Kapitel 19) | Herkunftsverfolgung vom Datensatz zu jedem darauf trainierten Modell | 2 |

### Behauptungssubstantiierung und algorithmische Gewinnabschöpfung

**Ein Claims-Register.** Jede öffentliche Aussage über Genauigkeit, Fairness, Autonomie oder
"KI-gestützte" Fähigkeit ist eine Zeile: die Behauptung, wo sie erscheint, der Eval-Lauf, der sie
stützt, die Daten, auf denen sie gemessen wurde, und das Datum. Workado scheiterte bei den letzten
beiden Spalten: die Messung stimmte nicht mit der Population überein, die die Behauptung beschrieb
[62]. Eine Modellfreigabe führt den Eval neu aus und validiert jede Behauptung, die ihn zitiert,
neu; eine veraltete oder fehlgeschlagene Behauptung wird aus der Kopie entfernt. Dies wird hier als
neues Muster vorgeschlagen, das
[**Claims Substantiation Gate**](/patterns/claims-substantiation-gate): ein
[Eval Gate](/patterns/eval-gate-in-ci) auf Marketingkopie ausgerichtet.

**Löschungsbereite Herkunftsverfolgung.** Eine Anordnung zur Löschung von "Modellen oder
Algorithmen, die ganz oder teilweise unter Verwendung" einiger Daten entwickelt wurden [64], kann
nur eingehalten und nachgewiesen werden, wenn Sie wissen, welche Modelle die Daten berührt haben.
Das ist ein [AIBOM](/patterns/aibom) mit Datensatz-Herkunftsverfolgung bis zur Version, plus das
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger). Ohne dies ist die einzige
sichere Reaktion auf eine Gewinnabschöpfungsanordnung, alles zu löschen.

## Produkthaftung

Produkthaftung fragt, ob ein Produkt fehlerhaft war und ob der Fehler den Schaden verursacht hat.
Für KI sind die neuen Fragen, ob Software ein Produkt ist, wer es nach dem Versand kontrolliert, und
was ein Fehler in etwas ist, das lernt und sich aktualisiert.

### Die überarbeitete Produkthaftungsrichtlinie der EU

Die überarbeitete Produkthaftungsrichtlinie (EU) 2024/2853 wurde am 23. Okt 2024 angenommen und
am 18. Nov 2024 veröffentlicht. Mitgliedstaaten müssen sie bis 9. Dez 2026 umsetzen, und sie gilt
für Produkte, die nach diesem Datum auf den Markt gebracht oder in Betrieb genommen werden [2]. Ihre
Hauptpunkte für KI:

- **Software ist ein Produkt** (Art. 4(1)); die Präambel nennt KI unter den Gründen für die
  Überarbeitung, und kostenlose und quelloffene Software, die außerhalb einer kommerziellen
  Tätigkeit bereitgestellt wird, ist ausgenommen (Art. 2(2)) [2].
- **Fehler werden mit Lernen und Updates im Blick beurteilt.** Die Faktoren umfassen "die Auswirkung
  auf das Produkt einer Fähigkeit, nach dem Inverkehrbringen weiterhin zu lernen oder neue
  Funktionen zu erwerben", relevante Sicherheitsanforderungen einschließlich Cybersicherheit, und
  der Zeitpunkt, zu dem das Produkt die Kontrolle des Herstellers verließ (Art. 7(2)) [2]. Die
  Kontrolle bleibt bestehen, während der Hersteller Software-Updates bereitstellen kann (Art. 4(5))
  [2].
- **Updates eröffnen die Akte neu.** Die Verteidigung, dass ein Fehler nach dem Inverkehrbringen
  entstanden ist, gilt nicht, wenn der Fehler innerhalb der Kontrolle des Herstellers auf Software
  oder deren Updates, ein fehlender Sicherheits-Update oder eine wesentliche Veränderung
  zurückzuführen ist (Art. 11(2)) [2]. Wer ein Produkt außerhalb der Kontrolle des Herstellers
  wesentlich verändert, wird sein Hersteller (Art. 8(2)) [2].
- **Offenlegung und Vermutungen.** Ein Gericht kann den Beklagten anordnen, relevante Evidenz
  offenzulegen, mit Schutz für Geschäftsgeheimnisse (Art. 9). Fehler wird vermutet, wenn der
  Beklagte nicht offenlegt, wenn das Produkt gegen zwingende Sicherheitsanforderungen verstößt, oder
  wenn Schaden aus einer offensichtlichen Fehlfunktion kam; und ein Gericht muss Fehler oder
  Kausalität vermuten, wenn der Kläger mit übermäßiger Schwierigkeit konfrontiert ist, insbesondere
  aus technischer oder wissenschaftlicher Komplexität, und zeigt, dass entweder wahrscheinlich ist
  (Art. 10) [2].
- **Schaden und Zeit.** Ersatzfähiger Schaden umfasst Tod, Körperverletzung einschließlich
  medizinisch anerkannter psychischer Schäden, Sachschäden und die Zerstörung oder Beschädigung von
  Daten, die nicht für berufliche Zwecke verwendet werden (Art. 6). Ansprüche verfallen 10 Jahre
  nach dem Inverkehrbringen, neu beginnend von einer wesentlichen Veränderung, oder 25 Jahre für
  latente Körperverletzung (Art. 17) [2].

Der parallele Vorschlag zur KI-Haftungsrichtlinie, der verschuldensbasierte Ansprüche erleichtert
hätte, wurde zurückgezogen: angekündigt im Arbeitsprogramm der Kommission 2025, veröffentlicht im
Amtsblatt am 6. Okt 2025 [74]. Verschuldensbasierte KI-Ansprüche bleiben bei nationalem
Deliktsrecht.

### Deliktstheorien der Vereinigten Staaten

Die US-amerikanische Produkthaftung kennt drei Arten von Mängeln: Herstellungsmängel in einzelnen
Einheiten, Konstruktionsmängel, die dem Design inhärent sind, und Werbemängel, die unzureichende
Anweisungen und Versäumnisse bei der Warnung vor latenten Gefahren abdecken; Gerichte prüfen
Konstruktionsmängel anhand von Verbrauchererwartungen, durch Abwägung von Risiko gegen Nutzen oder
beides [75]. Ob Software und insbesondere ein Chatbot ein "Produkt" ist, ist umstritten und wird von
Fall zu Fall entschieden. In *Garcia v. Character Technologies*, einer Klage wegen Todesfalls über
eine Companion-Chatbot-App, die als Produkthaftung eingereicht wurde, lehnte das Gericht am 21. Mai
2025 teilweise die Anträge auf Abweisung ab und teilweise ab, und der Fall wurde am 7. Januar 2026
ohne Präjudiz beigelegt und abgewiesen [76]; Check-Berichte besagen, dass Produkthaftungstheorien
gegen die Anordnung selbst bestanden bleiben (überprüfen).

### Die britische Produkthaftungsprüfung

Die Law Commission überprüft das Regime des Consumer Protection Act 1987, ausdrücklich
einschließlich digitaler Produkte und KI; die Geschäftsordnung wurde am 8. Dezember 2025
veröffentlicht und eine Konsultation ist für die zweite Hälfte 2026 geplant [77].

### Mängeltypen abgebildet auf KI-Ausfallmodi

Jede rechtliche Kategorie entspricht Ingenieur-Ausfallmodi und einem Artefakt, das zeigt, ob sie
aufgetreten sind.

| Mängeltyp | Was es für ein KI-System bedeutet | Nachweis, der es beantwortet | Schicht |
|---|---|---|---|
| Herstellung | Das bereitgestellte System weicht von seinem eigenen Design ab: falsche Modellversion, beschädigte Gewichte, falsch konfigurierter Guardrail, unterbrochene Datenpipeline | AIBOM mit Hashes; signierter Bereitstellungsdatensatz; Konfigurationsdrift-Warnungen | 2 · 4 · 5 |
| Design | Das Design selbst ist unsicher für eine vorhersehbare Verwendung, und eine sicherere Alternative war angemessen verfügbar: ungetestete Betriebsbedingungen, kein Guardrail, keine menschliche Aufsicht wo nötig | FMEA; Eval-Abdeckungsmatrix; Red-Team-Ergebnisse; Designüberprüfung mit berücksichtigten Alternativen | 1 · 3 |
| Warnung (Werbung) | Bekannte Grenzen und außerhalb des Geltungsbereichs liegende Verwendungen wurden nicht offengelegt | [Model Card](/patterns/model-card-as-control-evidence); Betriebsanleitung; produktinterne Hinweise, alle versioniert | 2 · 5 |
| Aktualisierung (EU Art. 11(2)) | Eine Aktualisierung führte zum Mangel ein, oder eine erforderliche Sicherheitsaktualisierung wurde nicht bereitgestellt | Änderungsprotokoll; Regressions-Evals pro Release; Patch-Entscheidungsdatensätze | 3 · 4 · 5 |

### Warnpflicht nach Aktualisierungen

Eine Modellaktualisierung ist ein neues Release. Nach dem EU-Regime haftet der Hersteller für
Mängel, die Aktualisierungen verursachen, oder die eine fehlende Sicherheitsaktualisierung
hinterlässt, während sich das System unter seiner Kontrolle befindet [2]; US-amerikanische
Versäumnisse-zu-warnen-Theorien erreichen denselben Punkt [75]. Warnungen reisen also mit Versionen:
die Model Card und die Betriebsanleitung werden bei jedem Release neu erstellt, Versionshinweise
listen bekannte Einschränkungen und geändertes Verhalten auf, und die Feldüberwachung speist die
[Incident Pipeline](/patterns/incident-pipeline), sodass eine neue Gefahr eine Entscheidung (Patch,
Warnung, Rückzug) mit einem Eigentümer und einem Datum erzeugt (Kapitel
[17](/bok/incidents#the-response-lifecycle)).

### Die Verteidigungsdatei

Eine Verteidigungsdatei pro Produktrelease enthält:

- eine **Fehlermode- und Auswirkungsanalyse** in der Form, die der Standard IEC 60812 beschreibt,
  mit KI-Ausfallmodi (Verteilungsversatz, Prompt-Injection, halluzinierte Fakten, unsichere
  Werkzeugnutzung) als Zeilen [78];
- das **AIBOM** für das Release, mit Modell-, Datensatz- und Abhängigkeitshashes;
- die **Eval-Historie**: jedes Gate-Ergebnis für diese und frühere Versionen, einschließlich
  Ausfällen und den folgenden Fixes;
- **signierte Laufzeitprotokolle** für die fraglichen Entscheidungen, für die Anspruchsfrist
  aufbewahrt;
- die **Warnungen wie versendet**: Model Card, Betriebsanleitung und produktinterne Hinweise in
  dieser Version.

Die Datei schneidet beide Wege: ein Kläger kann Offenlegung erhalten, und eine Lücke kann selbst
eine Vermutung des Mangels aufwerfen [2]. Halten Sie sie vollständig und abrufbar für mindestens die
10-Jahres-Ablaufperiode [2]; als
[maschinenlesbarer Nachweis](/patterns/machine-readable-evidence-oscal) wird die Offenlegung eher zu
einer Abfrage als zu einem Projekt.

## Deepfakes und synthetische Medien

Synthetische Medien erstrecken sich über Verbraucherschutz, Datenschutz und Strafrecht. Drei Regime
setzen die Untergrenze.

- **Europäische Union.** Anbieter von generativen Systemen müssen Ausgaben auf maschinenlesbare,
  erkennbare Weise kennzeichnen (KI-Verordnung Art. 50(2)), und Betreiber müssen Deepfakes
  offenlegen, mit leichteren Regeln für offensichtlich künstlerische, satirische oder fiktive Werke
  (Art. 50(4)) [72]. Artikel 50 gilt seit 2. August 2026 [79], mit einer
  Kennzeichnungsübergangsfrist bis 2. Dezember 2026 für generative Systeme, die vor 2. August 2026
  auf den Markt gebracht wurden (Art. 111(4)) [43]. Das Digital-Omnibus-Paket fügte auch ein Verbot
  hinzu, das auf die KI-Erzeugung von nicht einvernehmlichen intimen Bildern und
  Kindesmissbrauchsmaterial abzielt und ab 2. Dezember 2026 gilt [43]. Sehr große Plattformen müssen
  generierte oder manipulierte Medien als Teil ihrer DSA-Risikominderung prominent kennzeichnen
  [70].
- **Vereinigte Staaten.** Der TAKE IT DOWN Act (Public Law 119-12, 19. Mai 2025) macht es zu einem
  Bundesverbrechen, wissentlich nicht einvernehmliche intime Bilder, einschließlich "digitaler
  Fälschungen", zu veröffentlichen, und verlangt von betroffenen Plattformen, einen
  Benachrichtigungs- und Entfernungsprozess durchzuführen (innerhalb eines Jahres nach Erlass), der
  gemeldete Inhalte innerhalb von 48 Stunden entfernt, durchgesetzt von der FTC [80]. Staatliche
  Deepfake- und Ähnlichkeitsgesetze variieren (überprüfen Sie die Staaten, die für jede
  Bereitstellung relevant sind).
- **Vereinigtes Königreich.** Das Teilen eines intimen Fotos oder Films, das "zeigt oder zu zeigen
  scheint" eine andere Person ohne Zustimmung, ist seit 31. Januar 2024 eine Straftat [81], und der
  Data (Use and Access) Act 2025 fügte eine Straftat der Erstellung eines angeblichen intimen Bildes
  eines Erwachsenen hinzu [82].

Die Artefakte sind Herkunftskennzeichnung zum Zeitpunkt der Erzeugung (zum Beispiel
Inhaltsberechtigungen oder Wasserzeichen, Schicht 04), eine Erkennungs-Eval für die
Überlebensfähigkeit der Kennzeichnung durch häufige Transformationen (Schicht 03) und ein
Abnahmepfad mit einer 48-Stunden-Uhr, einem Eigentümer und einem Protokoll (Schicht 05, aufgebaut
auf der [Incident Pipeline](/patterns/incident-pipeline)).

## Ein Einstellungsmodell durch fünf Rechtskörper

Ein einzelnes System unterliegt normalerweise mehreren dieser Rechtskörper gleichzeitig, daher
sollten seine Artefakte eine gemeinsame Registrierungs-ID teilen.

> **Beispiel (illustrativ)**
> Ein Arbeitgeber in New York und der EU setzt ein Modell eines Anbieters ein, das Bewerber für
> Interviews einstuft. Ein Registrierungseintrag beantwortet fünf rechtliche Fragen.

| Rechtsbereich | Die Frage für dieses System | Artefakt, gekennzeichnet mit der Registrierungs-ID | Schicht |
|---|---|---|---|
| KI-Verordnung (Kapitel [18](/bok/eu-ai-act#deployer-duties-article-26)) | Anhang III Punkt 4 Hochrisiko: sind die Betreiberpflichten erfüllt, und hat der Anbieter seine Nachweise geliefert? [47] | Registrierungseintrag mit Rolle (Betreiber); Dokumentation des Anbieters, die beim Due-Diligence-Gate gesammelt wurde; Design der menschlichen Aufsicht | 2 · 5 |
| Datenschutz (Kapitel [19](/bok/privacy-and-ai#automated-decision-making)) | Ist die Verarbeitung rechtmäßig und sind automatisierte Entscheidungen geschützt? | DSFA; Kandidatenbenachrichtigung; Überprüfungspfad | 1 · 5 |
| Nichtdiskriminierung | Gibt es nachteilige Auswirkungen, ist die Praxis gerechtfertigt, und wurden Alternativen gesucht? [38] [45] [39] | Monatliche Auswirkungsverhältnis-Eval; veröffentlichte Audit-Zusammenfassung; Suchprotokoll | 3 · 5 |
| Verbraucherschutz | Ist der Anspruch des Anbieters "bias-frei", wiederholt in unserem Kandidatenmaterial, substantiiert? [62] | Anspruchsregister-Zeile, die unseren eigenen Eval-Lauf zitiert, nicht die Broschüre des Anbieters | 3 · 5 |
| Produkthaftung | Ist die Richtlinie der Weg für einen abgelehnten Kandidaten? | Normalerweise nicht: ihre Schadensköpfe (Verletzung, Eigentum, Daten) beinhalten keine Diskriminierung [2], daher verläuft die Exposition durch Gleichstellungsrecht und Vertrag | 5 |

Die letzte Zeile ist die nützliche Überraschung: für ein Einstellungsmodell ist das Recht, das
beißt, Gleichstellung und Datenschutz, nicht Produkthaftung; für einen medizinischen
Triage-Assistenten kehrt sich die Balance um. Das Schreiben dieser Tabelle pro System, vor dem
Aufbau von Kontrollen, entscheidet, wohin das Evidenzbudget geht.

## Was Sie diese Woche tun können

1. **Fügen Sie vier Felder zu jeder Data Card eines Datensatzes hinzu**: Quelle, Akquisitionskanal,
   Lizenz und das Ergebnis und Datum der TDM-Reservierungsprüfung. Lassen Sie die Pipeline
   fehlschlagen, wenn eine leer ist.
2. **Durchsuchen Sie Ihre öffentliche Kopie** (Website, Verkaufsdecks, Model Cards) nach numerischen
   oder absoluten Ansprüchen wie "99% genau", "unvoreingenommen" oder "vollständig autonom".
   Verknüpfen Sie jeden mit einer Eval-Lauf-ID oder entfernen Sie ihn.
3. **Berechnen Sie Auswirkungsverhältnisse pro Gruppe** für jedes Auswahl-, Berechtigungs- oder
   Preismodell, das Sie ausführen, mit Stichprobengrößen, und speichern Sie sie in der Model Card
   für die aktuelle Version.
4. **Setzen Sie eine Datenverlustschutzregel vor jeden externen Modell-Endpunkt** für Geheimnisse
   und Quellcode, und notieren Sie, welche Anbieter keine Trainings- und Aufbewahrungsbedingungen
   haben.
5. **Öffnen Sie eine Verteidigungsdatei für Ihr nächstes KI-Release**: AIBOM mit Hashes,
   Eval-Historie, eine FMEA, die Betriebsanleitung und die Versionshinweise, mit einer
   Aufbewahrungsfrist von mindestens 10 Jahren.

**Zuordnung:** KI-Verordnung Art. 4a, 5, 50, 53(1)(c)–(d), Anhang III Punkte 4–5 · DSM-Richtlinie
Art. 3–4 · PLD (EU) 2024/2853 · Richtlinie über Plattformarbeit (EU) 2024/2831 · CCD2 Art. 18 · UCPD
· DSA Art. 25, 27, 35 · FTC Act s. 5 · Title VII s. 703(k) · 29 CFR 1607.4(D) · Regulation B · NYC
LL144 · TAKE IT DOWN Act · DMCC Act 2024 · alle fünf Stack-Schichten (Kapitel 04). Zuordnungen sind
illustrativ, keine Konformitätsaussage.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"; DoNotPay "robot lawyer" proposed order). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] Directive (EU) 2024/2853 on liability for defective products (Art. 2 scope and FOSS exclusion; Art. 4 software as a product and manufacturer's control; Art. 6 damage; Art. 7 defectiveness incl. ability to continue to learn; Art. 8(2) substantial modification; Art. 9 disclosure; Art. 10 presumptions; Art. 11(2) updates; Art. 17 expiry; Art. 22 transposition by 9 Dec 2026; OJ L 18 Nov 2024). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[3] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market, Arts. 3 and 4 (TDM for scientific research; general TDM exception subject to a reservation "in an appropriate manner, such as machine-readable means"). Official Journal of the EU. 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI providers: 53(1)(c) copyright policy honouring Art. 4(3) DSM reservations; 53(1)(d) public summary of training content; 53(2) open-source relief limited to points (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[5] "Commission presents template for General-Purpose AI model providers to summarise the data used to train their model" (template for the Art. 53(1)(d) public summary). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their (verified: primary)
[6] GPAI Code of Practice, Copyright chapter (Measures 1.1 to 1.5: copyright policy; lawful access without circumventing effective technological measures and excluding persistently infringing sites; robots.txt compliance; safeguards against infringing outputs; point of contact and complaints). Code of Practice text as published 10 Jul 2025. 2025-07-10. https://code-of-practice.ai/?section=copyright (verified: secondary)
[7] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[8] "German court rules in favour of music rights management organisation against OpenAI" (GEMA v. OpenAI, Munich Regional Court I, 11 Nov 2025; memorisation in model parameters as reproduction; TDM exception limited to preparatory copies; decision open to appeal). European Commission, European IP Helpdesk. 2025-11-14. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/german-court-rules-favour-music-rights-management-organisation-against-openai-nyt-vs-openai-dispute-2025-11-14_en (verified: secondary)
[9] "CJEU Grand Chamber rules on music sampling and pastiche; first CJEU hearing on generative AI and copyright: Like Company v Google" (C-250/25; hearing 10 Mar 2026; questions on reproduction in training, DSM Art. 4 and chatbot outputs; Advocate General opinion scheduled for 3 Sep 2026). European Commission, European IP Helpdesk. 2026-04-24. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/cjeu-grand-chamber-rules-music-sampling-and-pastiche-first-cjeu-hearing-generative-ai-and-copyright-2026-04-24_en (verified: secondary)
[10] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title17/html/USCODE-2024-title17-chap1-sec107.htm (verified: primary)
[11] Copyright, Designs and Patents Act 1988, s. 29A (copies for text and data analysis for non-commercial research) and s. 9(3) (author of a computer-generated work). legislation.gov.uk. current. https://www.legislation.gov.uk/ukpga/1988/48/section/29A (verified: primary)
[12] Report and Impact Assessment on Copyright and Artificial Intelligence (published under ss. 135 and 136 of the Data (Use and Access) Act 2025). UK Government, GOV.UK. 2026-03-18. https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence (verified: primary)
[13] "Copyright and artificial intelligence: analysing the UK government's March 2026 reports" (opt-out TDM exception previously favoured not taken forward; further evidence to be gathered; input transparency through best practice rather than statute). VWV. 2026-03. https://www.vwv.co.uk/insights/articles/copyright-and-artificial-intelligence-analysing-the-uk-governments-march-2026-reports (verified: secondary)
[14] "High Court grants permission to appeal in Getty Images v Stability AI" (secondary infringement and the meaning of "infringing copy" for an AI model; Stability refused permission on the trade mark findings). Wiggin LLP. 2026-01. https://www.wiggin.co.uk/insight/high-court-grants-permission-to-appeal-in-getty-images-v-stability-ai/ (verified: secondary)
[15] "General Understanding on AI and Copyright in Japan": Overview (Art. 30-4 non-enjoyment purpose and its proviso; fine-tuning and RAG that output training expression fall outside Art. 30-4; database works and robots.txt; not legally binding). Japan Copyright Office, Agency for Cultural Affairs. 2024-05. https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf (verified: primary)
[16] Thomson Reuters Enterprise Centre GmbH v. ROSS Intelligence Inc., No. 1:20-cv-00613 (D. Del.), Memorandum Opinion (Bibas, J.). CourtListener (court docket). 2025-02-11. https://www.courtlistener.com/docket/17131648/thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc/ (verified: primary)
[17] "Third Circuit Hears Oral Argument in Ross v. Reuters AI Training Copyright Case" (No. 25-2153; argued 11 Jun 2026; first federal appeal on fair use in AI training). Baker Botts. 2026-07. https://www.bakerbotts.com/thought-leadership/publications/2026/july/third-circuit-hears-oral-argument (verified: secondary)
[18] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[19] "Court Grants Final Approval of $1.5 Billion Anthropic Copyright Settlement" (release limited to past acquisition and copying through 25 Aug 2025; output claims preserved). The Authors Guild. 2026-07. https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/ (verified: secondary)
[20] Kadrey v. Meta Platforms, Inc., No. 3:23-cv-03417 (N.D. Cal.), Order denying the plaintiffs' motion and granting Meta's cross-motion for partial summary judgment (Chhabria, J., ECF 598). CourtListener (court docket). 2025-06-25. https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/ (verified: primary)
[21] "DOJ urges judge to rule for OpenAI, Microsoft in N.Y. Times lawsuit" (summary-judgment stage; first US government position on AI-training copyright litigation). The Washington Post. 2026-09-02. https://www.washingtonpost.com/technology/2026/09/02/doj-urges-judge-rule-openai-microsoft-ny-times-lawsuit/ (verified: secondary)
[22] Andersen v. Stability AI Ltd., No. 3:23-cv-00201 (N.D. Cal.), Order regarding case schedule (Orrick, J., ECF 597; jury trial reset to 20 Sep 2027). CourtListener (court docket). 2026-06-15. https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/ (verified: primary)
[23] Disney Enterprises Inc. v. Midjourney Inc., No. 2:25-cv-05275 (C.D. Cal.), complaint (ECF 1). CourtListener (court docket). 2025-06-11. https://www.courtlistener.com/docket/70513159/disney-enterprises-inc-v-midjourney-inc/ (verified: primary)
[24] Extracting Training Data from Large Language Models (Carlini et al.; verbatim training sequences recovered from GPT-2; larger models more vulnerable; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[25] Thaler v. Perlmutter, No. 23-5233 (human authorship required for copyright registration). US Court of Appeals for the D.C. Circuit. 2025-03-18. https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf (verified: primary)
[26] "Supreme Court Denies Cert in AI Authorship Case" (Thaler v. Perlmutter; certiorari denied 2 Mar 2026). Mayer Brown. 2026-03. https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case (verified: secondary)
[27] Copyright and Artificial Intelligence (Part 2, Copyrightability, 29 Jan 2025; Part 3, Generative AI Training, pre-publication version 9 May 2025; registration guidance for works containing AI-generated material, 16 Mar 2023). U.S. Copyright Office. 2025. https://copyright.gov/ai/ (verified: primary)
[28] Directive 96/9/EC on the legal protection of databases, Art. 7 (sui generis right against extraction and re-utilisation of a substantial part). Official Journal of the EU. 1996-03-11. https://eur-lex.europa.eu/eli/dir/1996/9/oj (verified: primary)
[29] Directive (EU) 2016/943 on the protection of undisclosed know-how and business information (trade secrets), Art. 2(1) ("reasonable steps under the circumstances" to keep information secret). Official Journal of the EU. 2016-06-08. https://eur-lex.europa.eu/eli/dir/2016/943/oj (verified: primary)
[30] 18 U.S.C. § 1839(3) (trade secret: the owner "has taken reasonable measures to keep such information secret"). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title18/html/USCODE-2024-title18-partI-chap90-sec1839.htm (verified: primary)
[31] Thaler v. Vidal, No. 2021-2347 (inventors under the Patent Act must be natural persons). US Court of Appeals for the Federal Circuit. 2022-08-05. https://cafc.uscourts.gov/opinions-orders/21-2347.OPINION.8-5-2022_1988142.pdf (verified: primary)
[32] Thaler v Comptroller-General of Patents, Designs and Trade Marks [2023] UKSC 49 (DABUS cannot be an inventor under the Patents Act 1977). UK Supreme Court. 2023-12-20. https://www.supremecourt.uk/cases/uksc-2021-0201 (verified: primary)
[33] J 8/20 (DABUS; "A machine is not an inventor within the meaning of the EPC"). EPO Legal Board of Appeal. 2021-12-21. https://www.epo.org/en/boards-of-appeal/decisions/j200008eu1 (verified: primary)
[34] Revised Inventorship Guidance for AI-Assisted Inventions, 90 FR 54636 (rescinds the 13 Feb 2024 guidance; AI as a tool; ordinary conception standard). USPTO, Federal Register. 2025-11-28. https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions (verified: primary)
[35] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated; separate licence required above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[36] The Open Source AI Definition 1.0 (use, study, modify, share; preferred form for modification: data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[37] "Microsoft announces new Copilot Copyright Commitment for customers" (defence and payment of adverse judgments; conditional on using built-in guardrails and content filters and not attempting to generate infringing material). Microsoft On the Issues. 2023-09-07. https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/ (verified: primary)
[38] 42 U.S.C. § 2000e-2(k) (Title VII s. 703(k): burden of proof in disparate-impact cases; business necessity; alternative employment practice). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[39] Council Directive 2000/43/EC implementing the principle of equal treatment irrespective of racial or ethnic origin, Art. 2(2)(b) (indirect discrimination; objective justification) and Art. 3(1)(h) (goods and services, including housing). Official Journal of the EU. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj (verified: primary)
[40] Council Directive 2000/78/EC establishing a general framework for equal treatment in employment and occupation. Official Journal of the EU. 2000-11-27. https://eur-lex.europa.eu/eli/dir/2000/78/oj (verified: primary)
[41] Executive Order 14281, Restoring Equality of Opportunity and Meritocracy (s. 4: agencies to deprioritise enforcement of disparate-impact liability; FR Doc. 2025-07378). The White House, via GovInfo (Federal Register). 2025-04-23. https://www.govinfo.gov/content/pkg/FR-2025-04-28/html/2025-07378.htm (verified: primary)
[42] HUD's Implementation of the Fair Housing Act's Disparate Impact Standard: proposed rule (FR Doc. 2026-00590, 14 Jan 2026) and supplemental proposed rule (FR Doc. 2026-16228; comments due 9 Oct 2026). US Department of Housing and Urban Development, Federal Register. 2026-08-10. https://www.federalregister.gov/documents/2026/08/10/2026-16228/huds-implementation-of-the-fair-housing-acts-disparate-impact-standard-amendments-to-huds-title-vi (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a special-category data for bias detection in high-risk systems; Art. 5(1)(ba) and (bb) prohibitions on NCII and CSAM generation, applying from 2 Dec 2026 under Art. 113(a); Art. 111(4): Art. 50(2) marking deadline of 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[44] Mobley v. Workday, Inc., No. 3:23-cv-00770 (N.D. Cal.), Order granting preliminary collective certification (Lin, J., ECF 128). CourtListener (court docket). 2025-05-16. https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/ (verified: primary)
[45] Automated Employment Decision Tools (Local Law 144 of 2021 and 6 RCNY 5-300: bias audit within one year before use, published summary, notice 10 business days before use; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[46] Automated Employment Decision Tools: Frequently Asked Questions (bias audit by an independent third party; selection rates and impact ratios by sex, race/ethnicity and intersectional categories). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[47] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, points 4 and 5 (employment, workers management; public assistance eligibility; creditworthiness, fraud detection excepted; risk assessment and pricing in life and health insurance). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[48] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[49] Directive (EU) 2024/2831 on improving working conditions in platform work, Arts. 7 (limits on processing), 9 (transparency), 10 (human oversight), 11 (human review) and 29 (transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[50] 12 CFR § 1002.9 (Regulation B notifications: statement of specific reasons for adverse action). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[51] Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms (withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14; the circular's page carries no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[52] 15 U.S.C. § 1681m(a) (FCRA duties of users taking adverse action on the basis of consumer reports). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII-sec1681m.htm (verified: primary)
[53] Directive (EU) 2023/2225 on credit agreements for consumers, Art. 18 (creditworthiness assessment; 18(3) no special-category data, social networks not an external source; 18(8) human intervention and explanation) and Art. 48 (adopt by 20 Nov 2025, apply from 20 Nov 2026). Official Journal of the EU. 2023-10-18. https://eur-lex.europa.eu/eli/dir/2023/2225/oj (verified: primary)
[54] "Justice Department Secures Groundbreaking Settlement Agreement with Meta Platforms, Formerly Known as Facebook, to Resolve Allegations of Discriminatory Advertising" (Fair Housing Act; Special Ad Audience discontinued; Variance Reduction System for housing ads). US Department of Justice. 2022-06-21. https://www.justice.gov/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known (verified: primary)
[55] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 6 Jul 2021; risk-management framework, assessment and monitoring, chief risk officer attestation; rules by insurance practice). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[56] NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (written AIS Program; third-party AI systems and data; adopted 4 Dec 2023). National Association of Insurance Commissioners. 2023-12-04. https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf (verified: primary)
[57] Case C-236/09, Association Belge des Consommateurs Test-Achats (Art. 5(2) of Directive 2004/113/EC invalid with effect from 21 Dec 2012). Court of Justice of the EU. 2011-03-01. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (verified: primary)
[58] R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058 (public sector equality duty; no verification that facial recognition software lacked unacceptable race or sex bias). Court of Appeal (Civil Division), Courts and Tribunals Judiciary. 2020-08-11. https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf (verified: primary)
[59] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures (adverse impact and the "four-fifths rule"). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[60] 15 U.S.C. § 45(n) (FTC Act s. 5: standard for unfairness). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap2-subchapI-sec45.htm (verified: primary)
[61] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[62] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[63] FTC v. Rite Aid Corporation, No. 2:23-cv-5023 (E.D. Pa.) (five-year ban on facial recognition for security or surveillance; stipulated order approved 8 Mar 2024). Federal Trade Commission, case page. 2024-03-08. https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v (verified: primary)
[64] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[65] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[66] "Federal Trade Commission Announces Final Rule Banning Fake Reviews and Testimonials" (16 CFR Part 465; covers AI-generated fake reviews; civil penalties for knowing violations). Federal Trade Commission. 2024-08-14. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (verified: primary)
[67] California Business and Professions Code ss. 17940 to 17943 (bot disclosure: unlawful to use a bot to mislead about its artificial identity to incentivise a sale or influence a vote, unless clearly and conspicuously disclosed; in force 1 Jul 2019). California Legislative Information. 2019. https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=3.&chapter=6.&article= (verified: primary)
[68] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[69] Directive (EU) 2019/2161 (better enforcement and modernisation of EU consumer protection rules), adding UCPD Annex I points 23b and 23c (consumer reviews). Official Journal of the EU. 2019-11-27. https://eur-lex.europa.eu/eli/dir/2019/2161/oj (verified: primary)
[70] Regulation (EU) 2022/2065 (Digital Services Act), Arts. 25 (online interface design and organisation), 27 (recommender system transparency) and 35(1)(k) (prominent marking of generated or manipulated media). Official Journal of the EU. 2022-10-19. https://eur-lex.europa.eu/eli/reg/2022/2065/oj (verified: primary)
[71] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(a) and (b) (manipulative or deceptive techniques; exploitation of vulnerabilities). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[72] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of AI interaction; machine-readable marking of synthetic content; deployer disclosure of deep fakes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[73] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[74] AI Liability Directive, Legislative Train Schedule (withdrawal announced in the Commission 2025 work programme; withdrawal published OJ C/2025/5423, 6 Oct 2025). European Parliament. 2026-08. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive (verified: secondary)
[75] "Products liability" (design, manufacturing and marketing defects, including failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. current. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[76] Garcia v. Character Technologies, Inc., No. 6:24-cv-01903 (M.D. Fla.): order granting in part and denying in part motions to dismiss (ECF 115, 21 May 2025); notice of resolution and order dismissing without prejudice (ECF 242 and 244, 7 Jan 2026). CourtListener (court docket). 2026-01-07. https://www.courtlistener.com/docket/69300919/garcia-v-character-technologies-inc/ (verified: primary)
[77] Product liability (review of the regime, including digital products and AI; terms of reference 8 Dec 2025; consultation planned for the second half of 2026). Law Commission of England and Wales. 2025-12. https://lawcom.gov.uk/project/product-liability/ (verified: primary)
[78] IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA), edition 3.0. International Electrotechnical Commission. 2018-08-10. https://webstore.iec.ch/en/publication/26359 (verified: primary)
[79] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[80] TAKE IT DOWN Act, Public Law 119-12 (S. 146) (knowing publication of intimate images incl. digital forgeries; notice-and-removal process within one year of enactment; removal within 48 hours; FTC enforcement). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[81] Sexual Offences Act 2003, s. 66B (sharing or threatening to share a photograph or film which "shows, or appears to show" another person in an intimate state; in force 31 Jan 2024). legislation.gov.uk. 2024-01-31. https://www.legislation.gov.uk/ukpga/2003/42/section/66B (verified: primary)
[82] Data (Use and Access) Act 2025, s. 138 (inserts Sexual Offences Act 2003 s. 66E, creating a purported intimate image of an adult). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/138 (verified: primary)
[83] Equal Credit Opportunity Act (Regulation B): final rule (ECOA does not authorize disparate-impact liability, the effects test; amends 12 CFR 1002.4, 1002.6, 1002.8 and 1002.15 and Supplement I, not 1002.9; 91 FR 21620, FR Doc. 2026-07804; effective 2026-07-21). Consumer Financial Protection Bureau, Federal Register. 2026-04-22. https://www.federalregister.gov/documents/2026/04/22/2026-07804/equal-credit-opportunity-act-regulation-b (verified: primary)
[84] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
