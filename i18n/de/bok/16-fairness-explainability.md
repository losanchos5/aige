---
lang: de
source: bok/16-fairness-explainability.md
sourceHash: "51457249289a3e5c6a3d9843df211b5c45bec1543edc01267f5faaa5f38770b9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 16. Fairness und Erklärbarkeit für Praktiker

> Fairness und Erklärbarkeit werden nur dann zu Kontrollen, wenn sie gemessen, gated und als
> Nachweise eingereicht werden; dieses Kapitel ordnet jede Technik ihrer Stack-Schicht und ihrem
> rechtlichen Hook zu.

## Wie man dieses Kapitel liest

Fairness und Explainability sind die zwei Prinzipien, die jedes Responsible-AI-Framework nennt, und
die zwei, die am häufigsten auf dem Plakat bleiben. NISTs AI Risk Management Framework listet "Fair
– with Harmful Bias Managed" und "Explainable and Interpretable" unter den Merkmalen
vertrauenswürdiger KI auf und gibt jedem eine Messung-Unterkategorie: `MEASURE 2.11` (Fairness und
Bias werden evaluiert und die Ergebnisse dokumentiert) und `MEASURE 2.9` (das Modell wird erklärt,
validiert und dokumentiert, und seine Ausgabe wird im Kontext interpretiert) [1]. Die
Engineering-Frage ist, was diese zwei Sätze an einem Dienstag werden: welche Metrik, berechnet auf
welchem Slice, gegen welchen Schwellenwert, bei Nichterfüllung welcher Build; welche Erklärung,
produziert von welcher Methode, wie getestet, an wen geliefert, und als welcher Record behalten.

Das Kapitel behält die Hauslinie aus Kapitel 01. Responsible AI und AI Ethics setzen das Ziel;
KI-Governance-Engineering baut die Kontrolle, die es trifft, und die Evidenz, die es beweist (siehe
[das Disambiguierungs-Cluster](/bok/definition#the-disambiguation-cluster)). Nichts hier ist
Rechtsberatung. Das Recht entscheidet, welche Disparität rechtswidrig ist und welche Erklärung
geschuldet wird; der Engineer baut die Messung und die Erklärung so, dass Legal etwas Wahres zu
entscheiden hat.

Die zwei Hälften gehören aus praktischen Gründen zusammen. Fairness geht um Ergebnisse über Menschen
hinweg; Explainability geht um die Gründe für ein Ergebnis. Eine Erklärung ist, wie eine Person
entdeckt, dass eine Entscheidung ihnen gegenüber unfair war, und Attribution-Methoden sind ein Weg,
wie ein Team den Proxy findet, der ein Modell unfair gemacht hat. Beide handeln auch gegen Privacy:
Sie können keine Disparität über eine Gruppe messen, die Sie möglicherweise nicht beobachten können,
oder eine Entscheidung nicht erklären, ohne etwas über ihre Daten offenzulegen. Die erste Hälfte
behandelt Fairness, die zweite Explainability, und der letzte Abschnitt platziert beide in den fünf
Schichten des [Stack](/bok/the-stack#how-to-read-the-stack).

## Wo Bias in den Lifecycle eintritt

NIST SP 1270 sortiert AI Bias in drei Kategorien, **systemic**, **statistical** und **human**, und
erklärt deutlich, dass "es nicht möglich ist, ein Nullrisiko von Bias in einem KI-System zu
erreichen" [2]. Die Konsequenz für einen Engineer ist, dass Fairness wie jedes andere Restrisiko
gemanagt wird: benannt, gemessen, begrenzt und überwacht, nie als gelöst erklärt.

Suresh und Guttag geben die Lifecycle-Sicht: sieben Quellen von Downstream-Schaden, verteilt von der
Datenerfassung bis zur Bereitstellung [3]. Jede hat eine andere Kontrolle, also ist der erste Job zu
wissen, welche du dir anschaust.

| Quelle | Wo sie eintritt | Typischer Fehler | Kontrolle und Evidenz | Schicht |
|---|---|---|---|---|
| Historische Verzerrung | Die Welt, die die Daten beschreiben | Vergangene Einstellungsentscheidungen kodieren vergangene Diskriminierung | Label-Audit; Entscheidung, das Label zu ändern oder das Ziel zu ändern, aufgezeichnet in der Data Card | 02 · 03 |
| Repräsentationsverzerrung | Sampling | Eine Gruppe ist unterrepräsentiert, daher ist ihre Fehlerquote hoch und verrauscht | Coverage-Bericht pro Gruppe gegen die Bereitstellungspopulation | 02 · 03 |
| Messungsverzerrung | Features und Labels | Ein bequemer Proxy steht für das echte Ziel | Target-Validity-Review; Proxy-Scan | 03 |
| Aggregationsverzerrung | Modellierung | Ein Modell, das an Gruppen mit unterschiedlichen Beziehungen angepasst ist | Pro-Gruppen-Performance; Interaktionsterme oder separate Modelle | 03 |
| Lernverzerrung | Trainings-Ziel | Optimierung des durchschnittlichen Verlusts handelt eine Minderheitsgruppe weg | Fairness-beschränktes Training; Pro-Gruppen-Verlust-Kurven | 03 |
| Evaluierungsverzerrung | Benchmarks | Der Test-Set sieht nicht wie die Menschen aus, denen gedient wird | Evaluations-Set aus der Bereitstellungspopulation gezogen; Slice-Metriken | 03 |
| Bereitstellungsverzerrung | Verwendung im Kontext | Ein Score, der für einen Zweck gebaut wurde, wird für einen anderen verwendet | Intended-Purpose-Feld in der Registry; Misuse-Monitoring | 02 · 04 |

Measurement Bias verdient die meiste Aufmerksamkeit, weil es jeden Accuracy-Test besteht. Der
kanonische Fall ist ein weit verbreiteter kommerzieller Gesundheitsalgorithmus, der
Gesundheits*kosten* als Stellvertreter für Gesundheits*bedarf* vorhersagte. Weil weniger Geld für
schwarze Patienten auf der gleichen Krankheitsstufe ausgegeben wurde, war das Modell genau auf sein
Ziel und verzerrt auf das, was wichtig war; die Korrektur der Disparität hätte den Anteil schwarzer
Patienten, die für zusätzliche Hilfe gekennzeichnet wurden, von 17,7% auf 46,5% erhöht [4]. Keine
Fairness-Metrik, die gegen das Kosten-Label berechnet wurde, hätte es gefangen. Was es fängt, ist
eine Überprüfung, ob das Label das Konstrukt misst, das die Entscheidung betrifft, aufgezeichnet vor
dem Training. Der [Health-Risk-Score-Fall](/cases/health-risk-score-proxy) liest ihn als
Post-Mortem, und der [Recruiting-Model-Fall (reported)](/cases/recruiting-model-reported) macht das
Gleiche für Historical Bias in Einstellungsdaten. Das EU AI Act schreibt diese Sicht in Gesetz für
Hochrisiko-Systeme. Artikel 10(2)(f) und (g) erfordern, dass Daten auf Biases überprüft werden, die
Gesundheit und Sicherheit beeinträchtigen könnten, Grundrechte schädigen oder zu verbotener
Diskriminierung führen könnten, und erfordern Maßnahmen, um sie zu erkennen, zu verhindern und zu
mindern; Artikel 10(3) und (4) erfordern Daten, die relevant, ausreichend repräsentativ und für die
Verwendungssituation geeignet sind [5]. Artikel 15(4) fügt die Feedback-Schleife hinzu: Ein System,
das weiterhin lernt, muss so gebaut werden, dass das Risiko reduziert wird, dass verzerrte Ausgaben
zukünftige Eingaben werden [6]. Jede Klausel ist ein Test, den du ausführen kannst, und ein Record,
den du behalten kannst (siehe
[Data Governance across the Stack](/bok/the-stack#data-governance-across-the-stack)).

## Geschützte Merkmale, Proxies und die Daten, die du zum Testen brauchst

**Geschützte Merkmale** werden durch den rechtlichen Rahmen definiert, nicht durch den Engineer.
US-Bundesarbeitsrecht schützt Rasse, Farbe, Religion, Geschlecht und nationale Herkunft unter Title
VII [7]; EU-Gleichstellungsrecht definiert Diskriminierung auf Grundlagen wie rassische oder
ethnische Herkunft [8]; die DSGVO nennt besondere Kategorien personenbezogener Daten, deren
Verarbeitung eingeschränkt ist [9]. Ein System, das über Jurisdiktionen hinweg bereitgestellt wird,
braucht die Vereinigung der Listen, die gelten, aufgezeichnet in der Policy als Daten, nicht im Kopf
eines Engineers.

Das Entfernen des geschützten Attributs aus dem Feature-Set, manchmal "Fairness durch Unwissenheit"
genannt, entfernt den Bias nicht. Andere Features tragen die gleiche Information: Postleitzahl steht
für Ethnizität, Vorname für Geschlecht und Herkunft, eine Karrierelücke für Geschlecht oder
Behinderung, Gerätetyp für Einkommen. Zwei Tests legen **Proxies** offen und gehören in die
Eval-Suite:

- **Vorhersage des geschützten Attributs.** Trainiere ein kleines Modell, um das geschützte Attribut
  aus den Kandidaten-Features vorherzusagen. Wenn es deutlich besser als Zufall erfolgreich ist,
  kodiert das Feature-Set das Attribut und ein Modell, das darauf trainiert ist, kann
  diskriminieren, ohne es je zu sehen.
- **Attribut und Ablation.** Verwende Feature-Attribution (später in diesem Kapitel), um zu finden,
  welche Features die Disparität antreiben, dann miss die Disparität mit jedem verdächtigen Feature
  entfernt oder neutralisiert.

Beide Tests brauchen das geschützte Attribut zur Evaluierungszeit, was die Privacy-Spannung ist, der
jedes Fairness-Programm begegnet. Die EU hat es eng gelöst. Das Digital Omnibus löschte Artikel
10(5) und verschob die Regel in einen neuen **Artikel 4a**, in Kraft seit 27. Juli 2026 [10].
Artikel 4a(1) lässt Anbieter von Hochrisiko-Systemen ausnahmsweise besondere Kategorien
personenbezogener Daten in dem Umfang verarbeiten, der streng notwendig ist für Bias-Erkennung und
-Korrektur unter Artikel 10(2)(f) und (g); Artikel 4a(2) erweitert die gleiche Möglichkeit auf
Anbieter und Betreiber anderer KI-Systeme und Modelle und auf Betreiber von Hochrisiko-Systemen, für
Biases, die Gesundheit und Sicherheit oder Grundrechte beeinträchtigen könnten oder zu verbotener
Diskriminierung führen könnten, unter den gleichen Bedingungen, während festgestellt wird, dass es
keine Verpflichtung zur Durchführung solcher Erkennung schafft [11]. Die Bedingungen lesen sich wie
eine Kontrollspezifikation, das ist, wie man sie baut:

| Art. 4a(1)-Bedingung | Engineering-Kontrolle | Nachweisdatensatz |
|---|---|---|
| (a) Andere Daten, einschließlich synthetischer oder anonymisierter Daten, würden nicht funktionieren | Notwendigkeits-Memo, das die versuchten Alternativen vergleicht | Signiertes Memo, das von der Data Card verlinkt ist |
| (b) Wiederverwendungsgrenzen und State-of-the-Art-Sicherheit, einschließlich Pseudonymisierung | Pseudonymisierung bei Aufnahme; Purpose-Tag bei Pipeline-Build erzwungen | Pipeline-Konfiguration und Policy-Urteil |
| (c) Strenge, dokumentierte Zugriff für autorisierte Personen unter Vertraulichkeit | Scoped-Access-Rolle; Access-Logging | Access-Log pro Abfrage |
| (d) Keine Übertragung an oder Zugriff durch andere Parteien | Egress-Policy-as-Code, die den Export des getaggten Sets verweigert | Policy-Urteile bei jedem Deploy |
| (e) Löschung, sobald der Bias korrigiert ist oder die Aufbewahrung endet, je nachdem, was zuerst eintritt | Retention-as-Code mit einem Löschjob | Löschereignis mit Dataset-Hash |
| (f) Records der Verarbeitung erklären, warum die Verarbeitung streng notwendig war | Record-of-Processing-Eintrag, generiert aus dem Memo | Record-of-Processing-Version |

Der Artikel sitzt auf der DSGVO, nicht statt ihrer, also gelten die rechtliche Grundlage und die
DSFA immer noch (siehe Kapitel 19,
[Privacy and AI](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)). Wo
besondere-Kategorien-Daten überhaupt nicht verwendet werden können, sind die Fallbacks freiwillige
Selbstidentifikation mit einer klaren Zweckerklärung, Tests auf zustimmenden Panels, und abgeleitete
Attribute; die letzten tragen ihr eigenes Fehler- und Rechtsrisiko und brauchen die gleiche
Überprüfung wie jede andere Verwendung der Daten (Kapitel 19 über
[inferred and proxy sensitive data](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data)).

## Disparate Treatment und Disparate Impact

Anti-Diskriminierungsrecht hat zwei Doktrinen, und ein KI-System kann gegen beide verstoßen.

| Doktrin | US-Rahmen | EU-Rahmen | Wie es in einem Modell aussieht | Erster Test |
|---|---|---|---|---|
| **Disparate Treatment** (direkte Diskriminierung) | Absichtliche oder explizite Verwendung eines geschützten Merkmals | Weniger günstige Behandlung auf einem geschützten Grund in einer vergleichbaren Situation | Das geschützte Attribut, oder ein absichtlicher Stellvertreter, ist ein Feature oder eine Regel | Feature-Audit; Counterfactual-Flip-Test |
| **Disparate Impact** (indirekte Diskriminierung) | Eine Praxis, die einen disparaten Impact verursacht und nicht jobabhängig und konsistent mit geschäftlicher Notwendigkeit ist | Ein scheinbar neutrales Kriterium, das eine Gruppe in einen besonderen Nachteil bringt, ohne objektive Rechtfertigung | Neutrale Features produzieren ungleiche Ergebnisse | Auswahlquoten-Verhältnisse; Fehlerquoten-Lücken |

Im US-Arbeitsrecht ist Disparate Impact gesetzlich: Eine Praxis, die es verursacht, ist
rechtswidrig, es sei denn, sie ist jobabhängig und konsistent mit geschäftlicher Notwendigkeit, oder
wenn eine weniger diskriminierende Alternative abgelehnt wird [7]. Der EU-Test für indirekte
Diskriminierung hat die gleiche Form: ein scheinbar neutrales Kriterium, das eine Gruppe
benachteiligt, ist rechtswidrig, es sei denn, es ist objektiv durch ein legitimes Ziel
gerechtfertigt, das durch angemessene und notwendige Mittel verfolgt wird [8]. Für einen Engineer
bedeutet "neutrales Kriterium" "Feature", und "gerechtfertigt" bedeutet zu zeigen, warum das Feature
notwendig ist und dass keine weniger diskriminierende Alternative akzeptabel funktioniert. Dieser
Vergleich ist eine Eval, und sein Ergebnis ist Evidenz.

### Die Four-Fifths-Regel und das Adverse-Impact-Verhältnis

Die am weitesten verbreitete Screening-Kennzahl stammt aus den US Uniform Guidelines on Employee
Selection Procedures von 1978. Eine Auswahlquote für eine Rasse, ein Geschlecht oder eine ethnische
Gruppe, die weniger als vier Fünftel (80%) der Quote für die Gruppe mit der höchsten Quote beträgt,
"wird in der Regel" von Bundesbehörden als Nachweis einer nachteiligen Auswirkung [12] angesehen.
Das Verhältnis der beiden Quoten ist das **Adverse-Impact-Verhältnis (AIR)**.

Derselbe Absatz enthält Vorbehalte, die die meisten Dashboards weglassen. Kleinere Unterschiede
können immer noch eine nachteilige Auswirkung darstellen, wenn sie sowohl statistisch als auch
praktisch signifikant sind, und größere Unterschiede können dies nicht, wenn sie auf kleine Zahlen
beruhen und statistisch nicht signifikant sind [12]. Die Vier-Fünftel-Regel ist also ein Auslöser
für eine Untersuchung, nicht ein Bestätigungszeichen. Ein Gate, das 0,81 als grün und 0,79 als rot
behandelt, ohne Konfidenzintervall und ohne Mindeststichprobe, ist die in
[den Grenzen des Eval Gate](/bok/definition#the-limits-of-the-eval-gate) beschriebene
Goodhart-Falle.

> **Beispiel (illustrativ)** Ein Screening-Modell befördert 120 von 400 Bewerbern aus Gruppe A (eine
> Auswahlquote von 30%) und 45 von 250 aus Gruppe B (18%). Das AIR für Gruppe B ist 18 / 30 = 0,60,
> deutlich unter 0,8. Die Eval erfasst die Quoten, die Anzahl, das Verhältnis, ein
> Bootstrap-Konfidenzintervall für das Verhältnis und die Quelle des geschützten Attributs, und das
> Gate leitet die Freigabe zur Überprüfung weiter, anstatt sie stillschweigend zu verweigern oder zu
> genehmigen.

Das rechtliche Gewicht der Regel verschiebt sich. Ab 2026-09-24 hat sich die US-Bundesdurchsetzung
von der disparaten Auswirkung abgewandt: Am 9. Juni 2026 kündigte das Justizministerium eine
Stellungnahme des Office of Legal Counsel an, die zu dem Ergebnis kam, dass die Richtlinien der EEOC
zur disparaten Auswirkung verfassungswidrig sind [13]. Die Stellungnahme befasst sich mit den
Uniform Guidelines, wird als Umsetzung der Executive Order 14281 dargestellt und folgt einem
EEOC-Durchsetzungsplan, der die disparat behandlung priorisiert; es ist kein Gerichtsurteil, und
Kommentatoren weisen darauf hin, dass private Kläger und viele Staatsgesetze immer noch Ansprüche
auf disparat Auswirkung unterstützen [14]. Die technische Schlussfolgerung ändert sich nicht mit dem
Durchsetzungswetter: Das Adverse-Impact-Verhältnis bleibt das billigste Frühsignal für ein
ungleiches Ergebnis, und mehrere Regelwerke erfordern es immer noch namentlich.

New York Citys Local Law 144 ist das klarste Beispiel. Ein Arbeitgeber darf ein automatisiertes
Entscheidungsinstrument für die Beschäftigung nur verwenden, wenn es in den letzten zwölf Monaten
von einem unabhängigen Auditor einer Bias-Prüfung unterzogen wurde; die Prüfung muss Auswahlquoten
oder Bewertungsquoten und Auswirkungsverhältnisse über Geschlechtskategorien,
Rasse-/Ethnizitätskategorien und **intersektionale** Kategorien berechnen; eine Zusammenfassung der
Ergebnisse muss veröffentlicht werden; und Kategorien unter 2% der Audit-Daten können ausgeschlossen
werden [15]. Das Gesetz erfordert keine spezifische Maßnahme zu den Ergebnissen [15], was genau der
Grund ist, warum die technische Funktion einen internen Schwellenwert und einen Verantwortlichen
anhängen sollte: ein veröffentlichtes Auswirkungsverhältnis ohne beides ist Transparenz ohne
Kontrolle.

Zwei weitere rechtliche Punkte beschränken die Behebung, nicht nur die Feststellung. Title VII
verbietet die Anpassung von Ergebnissen oder die Verwendung unterschiedlicher Grenzwerte nach Rasse,
Farbe, Religion, Geschlecht oder nationaler Herkunft in Beschäftigungstests [7], daher kann eine
Nachbearbeitungsbehebung, die gruppespezifische Schwellenwerte setzt, selbst in dieser Einstellung
rechtswidrig sein. Und jede Minderung, die das geschützte Attribut zum Zeitpunkt der Entscheidung
verwendet, riskiert, unter EU-Recht zur direkten Diskriminierung zu werden. Minderungsentscheidungen
gehen mit der Eval-Evidenz an Legal (siehe [Minderung](#mitigation-before-during-and-after-training)
unten). Das breitere US- und EU-Bild ist in Kapitel 20,
[Bestehendes Recht und KI](/bok/existing-law#fairness-measures-the-law-recognises).

## Metriken für Gruppengerechtigkeit

Eine **Metrik für Gruppengerechtigkeit** vergleicht eine Statistik des Verhaltens des Modells über
Gruppen hinweg. Die fünf, die am meisten zählen, in der Vokabeln der Forschung, die sie definiert
hat, sind unten. `Ŷ` ist die Entscheidung oder Vorhersage, `Y` das wahre Ergebnis und `A` die
Gruppe.

| Metrik | Gilt wenn | Gleicht aus | Passt wenn | Vorsicht vor |
|---|---|---|---|---|
| **Demografische Parität** (statistische Parität) | `P(Ŷ=1 given A=a)` ist über Gruppen hinweg gleich | Auswahlquoten | Die Gelegenheit sollte unabhängig vom gemessenen Ergebnis geteilt werden; das AIR ist seine Verhältnisform | Ignoriert unterschiedliche Basisquoten; kann erfüllt werden, indem unqualifizierte Mitglieder einer Gruppe ausgewählt werden [16] |
| **Gleiche Chancen** | True-Positive-Raten sind gleich | Vorteil für die Qualifizierten | Eine qualifizierte Person zu verpassen ist der Hauptschaden (Einstellung, Zulassung, Zugang zur Versorgung) [17] | Lässt False Positives unbeschränkt |
| **Ausgeglichene Chancen** | True-Positive- und False-Positive-Raten sind beide gleich | Beide Fehlertypen | Beide Fehler sind kostspielig [17] | Schwerer zu erfüllen; kann Genauigkeit für alle Gruppen kosten |
| **Prädiktive Parität** | Präzision (`P(Y=1 given Ŷ=1)`) ist gleich | Bedeutung einer positiven Entscheidung | Eine positive Entscheidung löst eine Aktion aus, deren Wert davon abhängt, richtig zu sein (Betrugsmeldung) [18] | Unvereinbar mit gleichen Fehlerraten, wenn sich Basisquoten unterscheiden |
| **Kalibrierung innerhalb von Gruppen** | Unter Menschen mit Ergebnis `s` ist ein Anteil `s` positiv, in jeder Gruppe | Bedeutung eines Ergebnisses | Ergebnisse werden als Wahrscheinlichkeiten verbraucht (Kreditpreisgestaltung, klinisches Risiko) [19] | Ein kalibriertes Ergebnis kann immer noch sehr unterschiedliche Fehlerraten erzeugen |

Zwei praktische Regeln folgen. Berichten Sie Unterschiede *und* Verhältnisse, da eine kleine
absolute Lücke bei einer niedrigen Basisquote ein großes Verhältnis sein kann und umgekehrt [20].
Und berichten Sie die Metrik mit ihrem Nenner: eine Quote auf 30 Personen ist eine Anekdote, und die
Eval sollte das sagen. Der Tools-Katalog listet [Fairness-Toolkits](/resources/tools#cat-fairness)
als illustrative Beispiele, nicht als Empfehlungen auf.

### Individuelle und kontrafaktische Gerechtigkeit

Gruppenkennzahlen können erfüllt werden, während Einzelpersonen innerhalb jeder Gruppe willkürlich
behandelt werden. Zwei Konzepte auf individueller Ebene befassen sich damit.
**Individuelle Gerechtigkeit** erfordert, dass ähnliche Personen ähnlich behandelt werden, gegeben
ein aufgabenspezifisches Ähnlichkeitsmaß; der schwierige Teil, den ihre Autoren benennen, ist die
Vereinbarung dieses Maßes [16]. **Kontrafaktische Gerechtigkeit** erfordert, dass eine Entscheidung
in der tatsächlichen Welt und in einer kontrafaktischen Welt, in der die Person zu einer anderen
Gruppe gehörte, gleich sein muss, was ein explizites kausales Modell erfordert, wie das Attribut die
anderen Merkmale beeinflusst [21].

Keines wird normalerweise genau in der Produktion berechnet, aber beide haben eine billige und
nützliche Annäherung: der **kontrafaktische Flip-Test**. Ändern Sie nur das geschützte Attribut oder
seine Textmarker (einen Namen, ein Pronomen, einen Dialekt), halten Sie alles andere fest, und
messen Sie, wie oft sich die Entscheidung oder der generierte Text ändert. Für LLM-basierte Systeme
ist dies die praktischste verfügbare Fairness-Eval, da Gruppenlabels für Ausgaben selten vorhanden
sind, während gepaarte Prompts leicht zu generieren sind.

## Die Unmöglichkeitsergebnisse

Zwei Arbeiten aus 2016 und 2017 verwandelten "welche Fairness-Metrik?" von einer technischen Frage
in eine Wertentscheidung. Kleinberg, Mullainathan und Raghavan formalisierten drei Bedingungen
(Kalibrierung innerhalb von Gruppen und Balance der Ergebnisse für die positive und für die negative
Klasse) und bewiesen, dass außer in hochgradig eingeschränkten Spezialfällen keine Methode alle drei
gleichzeitig erfüllen kann [19]. Chouldechova zeigte, dass wenn die Prävalenz des Ergebnisses über
Gruppen hinweg unterschiedlich ist, ein Instrument nicht gleichzeitig prädiktive Parität und gleiche
Fehlerraten erfüllen kann, und dass disparat Auswirkung entstehen kann, wenn die Fehlerrate-Balance
fehlschlägt [18]. Die Spezialfälle sind perfekte Vorhersage und gleiche Basisquoten, und echte
Bereitstellungen haben selten beides.

> **Beispiel (illustrativ)** Zwei Gruppen von je 1.000 Personen. Gruppe A hat eine Basisquote von
> 30% (300 Positive), Gruppe B eine Basisquote von 10% (100 Positive). Ein Klassifizierer mit der
> gleichen True-Positive-Rate (0,8) und False-Positive-Rate (0,1) in beiden Gruppen erfüllt
> ausgeglichene Chancen. In Gruppe A erzeugt es 240 echte Positive und 70 falsche Positive (0,1 ×
> 700), eine Präzision von 240 / 310 = 0,77. In Gruppe B erzeugt es 80 echte Positive und 90 falsche
> Positive (0,1 × 900), eine Präzision von 80 / 170 = 0,47. Gleiche Fehlerraten, ungleiche Bedeutung
> einer positiven Entscheidung: prädiktive Parität schlägt fehl, und keine Schwellenwertentscheidung
> behebt beide, während sich die Basisquoten unterscheiden.

Die technische Konsequenz ist prozedural. Da die Metriken in Konflikt stehen, ist die Wahl zwischen
ihnen eine Governance-Entscheidung mit einem Verantwortlichen, die *vor* dem Anschauen der
Ergebnisse getroffen und als Richtlinie aufgezeichnet wird. Ein Team, das die Metrik nach dem
Anschauen auswählt, welche sein Modell besteht, ist Metric Shopping, und der Datensatz sollte das
unmöglich machen: die gewählte Metrik, der Grund, der Schwellenwert und der Genehmiger leben in
einer versionierten [Policy Card](/patterns/policy-card), die die Eval liest.

## Intersektionale und Subgruppen-Tests

Aggregierte Gruppenkennzahlen verbergen die Menschen an den Schnittstellen. Die Gender
Shades-Prüfung von drei kommerziellen Geschlechtsklassifizierern fand Fehlerraten von bis zu 34,7%
für dunkelere Frauen gegenüber maximal 0,8% für hellere Männer [22]; ein Bericht nur nach Geschlecht
oder nur nach Hauttyp mittelt die am schlechtesten versorgten Gruppen in eine größere ein. Kearns
und Kollegen benannten den allgemeinen Fehler **Fairness Gerrymandering**: ein Klassifizierer kann
bei jeder vordefinierten Gruppe fair aussehen und dennoch die Einschränkung auf strukturierte
Untergruppen, die über die geschützten Attribute definiert sind, schwerwiegend verletzen [23]. Model
Cards wurden teilweise vorgeschlagen, um die Bewertung über demografische und intersektionale
Gruppen zu berichten [24], und New York Citys Bias-Audits erfordern nun intersektionale Kategorien
[15].

Intersektionale Tests stoßen schnell auf kleine Zahlen, daher benötigt die Eval Regeln dafür:

- **Eine Mindestzellengröße** in der Richtlinie; darunter meldet die Eval "unzureichende Daten",
  listet die Zelle auf und zählt sie niemals als Bestätigung.
- **Konfidenzintervalle** auf jeder Quote und jedem Verhältnis, mit dem Gate auf dem Intervall,
  nicht dem Punkt.
- **Eine angegebene Mehrfachvergleichskorrektur**, da mit Dutzenden von Zellen einige zufällig
  fehlschlagen.
- **Eine Suche nach dem schlechtesten Slice**, zum Beispiel ein flacher Baum, der an den
  Fehlerindikatoren angepasst ist, um Untergruppen zu finden, die niemand aufgelistet hat; die
  Worst-Group-Metrik wird neben dem Durchschnitt gemeldet.

## Auswahl einer Fairness-Metrik nach Anwendungsfall

Die Metrik folgt dem Schaden, und der Schaden folgt dem Anwendungsfall. Fairlearns Benutzerhandbuch
trennt **Allokationsschäden** (ein System erweitert oder verweigert Chancen, Ressourcen oder
Informationen) von **Servicequalitätsschäden** (ein System funktioniert für manche Menschen
schlechter, auch wenn nichts verweigert wird) und **Stereotypisierungsschäden** [20]. Addieren Sie
die Kosten jedes Fehlertyps und den rechtlichen Rahmen, und die Wahl verengt sich. Die Kosten jedes
Fehlertyps sind der
[Fehlerappetit](/bok/governing-development#error-appetite-false-positives-versus-false-negatives)
des Anwendungsfalleintrags (Kapitel 14).

| Use Case | Schadenstyp | Kostspieligster Fehler | Primäre Metrik | Sekundäre Kontrollen | Rechtlicher Rahmen |
|---|---|---|---|---|---|
| CV-Screening, Beförderung | Allokation | Ablehnung eines qualifizierten Kandidaten | Auswahlquote AIR; Chancengleichheit | Intersektionale AIR; Proxy-Scan | Title VII, Uniform Guidelines, NYC LL144; KI-Verordnung Anlage III Punkt 4 |
| Kreditgenehmigung und Preisgestaltung | Allokation | Beides: rechtswidrige Ablehnung und unerschwingliche Kredite | Kalibrierung innerhalb von Gruppen; Genehmigungsquote AIR | Fehlerquoten-Unterschiede; Konsistenz der Begründungscodes | ECOA und Regulation B, FCRA; KI-Verordnung Anlage III Punkt 5(b) |
| Leistungsberechtigung und Rückforderung | Zuteilung (strafend bei Rückforderung) | Fälschliche Kürzung oder Rückforderung einer Leistung | Parität der False-Positive-Rate | Prädiktive Parität; Berufungsergebnisse nach Gruppe | Gleichheitsrecht; DSGVO Art. 22; KI-Verordnung Anlage III Punkt 5(a) |
| Klinische Triage | Zuteilung (bedarfsgerecht) | Eine bedürftige Person übersehen | Chancengleichheit; Kalibrierung | Überprüfung der Label-Validität (Kosten gegenüber Bedarf) | Medizinprodukte- und Gleichheitsrecht |
| Sprache, Vision, Dokumentensuche | Servicequalität | Ausfälle für eine Benutzergruppe | Fehlerquote der schlimmsten Gruppe | Intersektionaler Fehler | Barrierefreiheit und Gleichheitsrecht |
| Generativer Assistent | Servicequalität; Stereotypisierung | Herabgestufte oder erniedrigende Ausgabe für eine Gruppe | Counterfactual-Flip-Rate; Qualitätsmindeststandard pro Gruppe | Stereotype-Sonden; Ablehnungsquoten-Unterschiede | Gleichheits- und Verbraucherrecht |

Die Punkte der Anlage III sind die Hochrisiko-Anwendungsfälle der KI-Verordnung für Beschäftigung
(Punkt 4), öffentliche Leistungen (Punkt 5(a)) und Kreditwürdigkeit und Kreditbewertung (Punkt
5(b)), die Systeme zur Betrugserkennung ausdrücklich ausschließen [25]. Die Tabelle ist ein
Ausgangspunkt, keine Regel. Was die Wahl verteidigbar macht, ist, dass sie vor der Eval mit ihren
Gründen schriftlich festgehalten wird, von jemandem überprüft wird, der die betroffenen Menschen
vertritt (das [FRIA-as-Code](/patterns/fria-as-code)-Muster ist der Ort dieser Überprüfung), und
erneut überprüft wird, wenn sich der Anwendungsfall ändert.

## Risikominderung vor, während und nach dem Training

Sobald eine Disparität gefunden und für inakzeptabel befunden wird, fallen die Korrektionen in drei
Familien, je nachdem wo sie wirken. Offene Toolkits implementieren viele davon; AI Fairness 360
enthält Datensatz- und Modellmetriken sowie Mitigationsalgorithmen [26], Fairlearn bietet Bewertung
und Mitigation mit explizitem soziotechnischem Rahmen [27], und Aequitas konzentriert sich auf
Audits über Untergruppen [28]. Sie werden als Beispiele einer Kategorie genannt, nicht als
Empfehlungen.

| Phase | Techniken (Beispiele) | Was sich ändert | Nachweise zum Bewahrung | Vorsicht |
|---|---|---|---|---|
| **Vorverarbeitung** | Bessere Daten sammeln; unterrepräsentierte Gruppen neu gewichten oder neu samplen; nach einer Label-Audit neu beschriften; Features transformieren, um Proxy-Informationen zu entfernen | Die Trainingsdaten | Data-Card-Diff; Vor-/Nach-Abdeckungsbericht | Oft die dauerhafteste Lösung; Neugewichtung kann bei kleinen Gruppen zu Überanpassung führen |
| **In-Processing** | Fairness-beschränkte Optimierung; Regularisierer auf Gruppenlücken; adversariales Debiasing | Das Lernziel | Trainingskonfiguration; Pro-Gruppen-Verlaufskurven; die Beschränkung und ihre Grenze | Benötigt das Attribut zur Trainingszeit (siehe Art. 4a) |
| **Nachverarbeitung** | Gruppenspezifische Schwellwerte [17]; Reject-Option-Überprüfung nahe der Grenze | Die Entscheidungsregel | Schwellwert-Tabelle; Entscheidungsregel-Version | Gruppenspezifische Grenzwerte können in US-Beschäftigungstests rechtswidrig sein [7] und riskieren direkte Diskriminierung in der EU |

Drei Regeln gelten für jede Mitigation. Führen Sie die gesamte Suite erneut aus, einschließlich
Genauigkeit pro Gruppe, denn eine Korrektur kann durch Verschlechterung für alle "ausgleichen".
Dokumentieren Sie die Mitigation als eine Änderung mit einem Eigentümer und einem Grund, damit die
Model Card das Verhalten erklärt. Und bevorzugen Sie die früheste Korrektur, die funktioniert:
bessere Daten schlagen eine clevere Beschränkung, und eine Beschränkung schlägt einen
Schwellwert-Patch.

## Fairness-Überwachung in der Produktion

Eine Fairness-Eval beweist, dass das Modell auf den Evaluierungsdaten zur Build-Zeit akzeptabel war.
Die Produktion bringt neue Menschen, verschobene Populationen und verzögerte Labels. Die Überwachung
schließt die Lücke mit Signalen, die nicht sofort Ground Truth benötigen:

- **Auswahlquoten oder Genehmigungsquoten nach Gruppe** und deren AIR auf einem rollierenden
  Fenster, verglichen mit der Eval-Baseline. Diese benötigen kein Outcome-Label.
- **Kalibrierung und Fehlerquoten nach Gruppe**, sobald Outcomes ankommen, mit der angegebenen
  Label-Verzögerung.
- **Human-Oversight-Signale nach Gruppe**: Überschreibungsquoten, Zeit bis Entscheidung und
  Umkehrungsquoten am [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Ein Reviewer, der
  eine Gruppe häufiger überschreibt, ist ein Fairness-Signal über das Modell oder über den Reviewer.
- **Beschwerden, Berufungen und Erklärungsanfragen nach Gruppe**, einschließlich ihrer Ergebnisse.
  Der [Einspruchskanal](/patterns/decision-notice-contest-path) ist ein Sensor.
- **Feedback-Loop-Checks** für Systeme, deren Outputs zukünftige Trainingsdaten prägen, die Artikel
  15(4) von Hochrisiko-Systemen, die weiterlernen, verlangt [6].

Das Gruppenmerkmal fehlt normalerweise zur Laufzeit. Die Optionen sind eine zustimmende Stichprobe
oder ein Panel, auf dem das Merkmal bekannt ist, regelmäßige Audits unter den Artikel-4a-Bedingungen
(Betreiber von Hochrisiko-Systemen fallen unter Artikel 4a(2) [11]), oder Überwachung nur der
Outcome-freien Quoten mit dem Merkmal in einer gesicherten Umgebung zusammengeführt. Was auch immer
gewählt wird, der [Monitor](/patterns/drift-fairness-monitor) ist ein Layer-04-Signal, das durch
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) in Layer 05 gestreamt
wird, und ein Verstoß öffnet ein Ticket mit einem Eigentümer, nicht ein Diagramm, das niemand liest.
Eine Disparität, die Schaden verursacht hat, ist ein Incident und folgt Kapitel 17,
[Incidents](/bok/incidents#incident-hazard-issue-and-serious-incident).

## Transparenz, Interpretierbarkeit und Erklärbarkeit

Die drei Wörter werden austauschbar verwendet und sollten es nicht sein. Das NIST-Framework zieht
die Linie in je einem Satz: Transparenz beantwortet "was ist passiert" im System, Erklärbarkeit
beantwortet "wie" eine Entscheidung getroffen wurde, und Interpretierbarkeit beantwortet "warum" sie
getroffen wurde und was sie für den Benutzer im Kontext bedeutet [1]. Kapitel 11 nennt die drei
Quellen der Undurchsichtigkeit unter
[den Merkmalen von KI, die klassische IT-Governance brechen](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).

| Begriff | Frage, die sie beantwortet | Typisches Artefakt | Primäres Publikum | Schicht |
|---|---|---|---|---|
| **Transparenz** | Was ist dieses System, welche Daten und welches Modell nutzt es, was kann und kann es nicht tun? | Model Card, Data Card, AIBOM, Betriebsanleitung, KI-Nutzungsmitteilung | Betreiber, Auditor, die Öffentlichkeit | 02 |
| **Erklärbarkeit** | Wie ist das System zu diesem Output gekommen? | Pro-Entscheidungs-Erklärungsdatensatz; Attribution; Begründungscodes | Operatoren, betroffene Menschen, Reviewer | 03 · 04 |
| **Interpretierbarkeit** | Warum bedeutet dieser Output hier, was er bedeutet? | Ein Modell, dessen Struktur eine Person lesen kann; Interpretationsleitfaden | Modellbesitzer, Validatoren, Domänenexperten | 03 |

NIST IR 8312 fügt vier Prinzipien hinzu, die ein System, das erklärbar sein muss, erfüllen sollte:
es liefert **Erklärung** (Belege oder Gründe für Outputs), die Erklärung ist **aussagekräftig** für
seinen beabsichtigten Verbraucher, sie hat **Erklärungsgenauigkeit** (sie spiegelt korrekt wider,
wie der Output produziert wurde), und das System respektiert **Wissensgrenzen** (es funktioniert nur
dort, wo es entworfen wurde, und mit ausreichendem Vertrauen) [29]. Das dritte Prinzip ist das am
häufigsten verletzte, und das, zu dem dieses Kapitel unter Tests zurückkehrt.

## Von Natur aus interpretierbar oder nachträglich erklärt

Es gibt zwei Wege zu einer Erklärung. Ein **von Natur aus interpretierbares** Modell ist eines,
dessen Struktur die Erklärung ist: ein spärliches lineares oder logistisches Modell, eine
punktebasierte Scorecard, ein verallgemeinertes additives Modell, ein flacher Entscheidungsbaum oder
eine kurze Regelliste. Eine **Post-hoc**-Erklärung wird durch eine zweite Methode erzeugt, die das
Verhalten eines Modells approximiert, das selbst nicht lesbar ist.

Rudins Argument ist, dass für hochriskante Entscheidungen diese Wahl nicht neutral ist: die
Erklärung einer Black Box anstelle der Verwendung eines interpretierbaren Modells "wird
wahrscheinlich schlechte Praktiken perpetuieren", weil eine Post-hoc-Erklärung ein Modell des
Modells ist und falsch über es sein kann [30]. Die praktische Form dieses Arguments ist eine
Designregel. Trainieren Sie zuerst ein interpretierbares Baseline-Modell. Wenn das komplexe Modell
es nicht um einen Spielraum schlägt, der für die Entscheidung wichtig ist, versenden Sie das
interpretierbare; wenn es das tut, dokumentieren Sie den Spielraum, den Grund, warum der Gewinn das
Erklärungsrisiko rechtfertigt, und die Post-hoc-Methode, die verwendet wird, im
Design-Entscheidungsprotokoll (Kapitel 14,
[Governing development](/bok/governing-development#architecture-and-model-selection-trade-offs)).

### Wenn ein interpretierbares Modell erforderlich ist

Keine Vorschrift in diesem Kapitel sagt "verwenden Sie eine Scorecard". Mehrere sagen Dinge, die auf
andere Weise schwer zu erfüllen sind. Ein interpretierbares Modell ist der Standard, wenn die
meisten der folgenden Punkte zutreffen:

- **Die Entscheidung hat rechtliche oder ähnlich bedeutende Auswirkungen auf eine Person** (Kredit,
  Beschäftigung, Leistungen, Versicherung, Bildung), daher sind Gründe gesetzlich erforderlich.
- **Die Gründe müssen die tatsächlich verwendeten Faktoren sein.** Regulation B verlangt, dass
  Gründe für nachteilige Maßnahmen mit den tatsächlich berücksichtigten oder bewerteten Faktoren
  zusammenhängen [57]; eine Post-hoc-Approximation kann abweichen.
- **Die Daten sind tabellarisch mit aussagekräftigen Features**, wo interpretierbare Modelle oft
  wettbewerbsfähig sind.
- **Validatoren oder Regulatoren müssen die Logik reproduzieren**, wie in der
  Modellrisikomanagement.
- **Die Person muss auf die Erklärung reagieren können**, was stabile, verständliche Faktoren
  benötigt.

Wenn diese Punkte zutreffen und ein komplexes Modell dennoch gewählt wird, sollte das Gate stärkere
Belege fordern: Erklärungsgenauigkeitstests, Begründungscode-Stabilitätstests und eine
unterzeichnete Begründung.

## Erklärungstechniken

Erklärungen variieren entlang zweier Achsen: **Umfang** (eine *globale* Erklärung beschreibt das
Gesamtverhalten des Modells; eine *lokale* erklärt einen einzelnen Output) und **Zugang** (eine
*modellunabhängige* Methode benötigt nur Inputs und Outputs; eine *modellspezifische* nutzt die
Internals des Modells). Der Tools-Katalog listet
[Explainability-Bibliotheken](/resources/tools#cat-explainability) als illustrative Beispiele, nicht
als Empfehlungen.

| | Global | Lokal |
|---|---|---|
| **Modellunabhängig** | Globale Surrogate-Modelle; Permutations-Feature-Wichtigkeit; partielle Abhängigkeit | LIME; KernelSHAP; kontrafaktische Erklärungen; Nearest-Example-Erklärungen |
| **Modellspezifisch** | Koeffizienten eines interpretierbaren Modells; Baumstruktur; Probing von internen Repräsentationen | TreeSHAP; integrierte Gradienten und andere Gradienten-Attributionen; Aufmerksamkeits- oder Schaltungsanalyse (Forschung) |

### Feature-Attribution: SHAP, LIME und integrierte Gradienten

**Merkmalsattribution** weist jedem Eingabemerkmal einen Anteil der Verantwortung für eine Ausgabe
zu. **SHAP** (SHapley Additive exPlanations) weist jedem Merkmal einen Wichtigkeitswert für eine
bestimmte Vorhersage zu, basierend auf Shapley-Werten aus der Spieltheorie, und vereinheitlicht
mehrere frühere Methoden als additive Merkmalsattributionsmaße [32]. **LIME** erklärt eine einzelne
Vorhersage, indem es ein einfaches, interpretierbares Modell an das Verhalten der Black Box bei
gestörten Stichproben um diese Eingabe anpasst [33]. **Integrierte Gradienten** attributieren die
Vorhersage eines tiefen Netzwerks, indem Gradienten entlang eines Pfads von einer Baseline-Eingabe
zur tatsächlichen akkumuliert werden, und sind so konzipiert, dass sie zwei Axiome erfüllen,
Sensitivität und Implementierungsinvarianz, bei denen viele Attributionsmethoden fehlschlagen [34].

Jede hat Fehlermodi, die die Eval-Suite testen sollte, anstatt sie zu ignorieren:

- **Korrelierte Merkmale.** Die Gutschrift wird zwischen korrelierten Merkmalen nach den Annahmen
  der Methode aufgeteilt, sodass zwei Proxys für dasselbe jeweils gering aussehen können.
- **Baselines.** SHAP und integrierte Gradienten erklären relativ zu einer Referenz; ändern Sie
  diese und die Erklärung ändert sich, daher ist die Referenz Teil des Artefakts.
- **Off-Manifold-Störungen.** Slack und Kollegen bauten einen gestuften Klassifizierer, dessen
  Vorhersagen verzerrt bleiben, während LIME- und SHAP-Erklärungen harmlos aussehen [35].
  Erklärungen können manipuliert werden.
- **Methoden, die das Modell ignorieren.** Einige Salienz-Methoden erzeugen Erklärungen unabhängig
  sowohl vom Modell als auch von den Daten, daher ist visuelle Plausibilität kein Beweis für
  Genauigkeit [36].

### Surrogate-Modelle

Ein **globales Surrogate** ist ein interpretierbares Modell (ein Baum, eine Regelliste), das
trainiert wurde, um die Vorhersagen des komplexen Modells nachzuahmen. Es ist nützlich für
Überprüfung und Dokumentation und nur so gut wie seine **Treue**: der Anteil der Eingaben, bei denen
es mit dem Modell übereinstimmt, das es beschreibt. Ein Surrogate, das ohne seine Treue auf der
Bereitstellungspopulation gemeldet wird, ist ein Diagramm, keine Evidenz.

### Kontrafaktische Erklärungen

A **counterfactual explanation** states the smallest change to the input that would have changed the
outcome, for example (illustrative) "had your declared monthly income been 400 higher, the
application would have been approved". Wachter, Mittelstadt and Russell argued that such
explanations can help a data subject understand, contest and act on a decision without opening the
black box [37]. They are the natural fit for **recourse**, and they map closely onto what the Court
of Justice has since asked of controllers (see the legal hooks below).

Kontrafaktische Szenarien benötigen technische Einschränkungen, um ehrlich und nützlich zu sein.
Beschränken Sie Änderungen auf Merkmale, die die Person tatsächlich ändern kann (niemals Alter,
Herkunft oder Behinderung); respektieren Sie kausale Abhängigkeiten zwischen Merkmalen; bevorzugen
Sie plausible, spärliche Änderungen; und überprüfen Sie, dass das kontrafaktische Szenario stabil
ist, sodass zwei nahezu identische Antragsteller nicht gegensätzliche Dinge gesagt bekommen. Ein
kontrafaktisches Szenario, das empfiehlt, ein geschütztes Merkmal zu ändern, ist ein
Fairness-Befund, keine Erklärung.

### Beispielbasierte Erklärungen

**Beispielbasierte Erklärungen** zeigen Prototypen, die nächsten Trainingsbeispiele oder die
Beispiele, die eine Vorhersage am meisten beeinflusst haben. Sie sind intuitiv für Bilder und
Dokumente sowie für Fachleute. Sie offenbaren auch Trainingsdaten: Das Zeigen eines ähnlichen
früheren Falls kann die persönlichen Daten einer anderen Person offenbaren, daher benötigt die
Methode die gleiche Datenschutzprüfung wie jede Datenfreigabe.

### Erklärungen für LLMs und RAG-Systeme

Große Sprachmodelle fügen zwei Komplikationen hinzu. Erstens ist die eigene Darstellung des Modells
über sein Denken keine Erklärung im NIST-Sinne der Erklärungsgenauigkeit. Chain-of-Thought-Text kann
systematisch misrepräsentieren, warum eine Vorhersage getroffen wurde: Wenn Modelle durch Merkmale
beeinflusst wurden, die sie nie erwähnten, erzeugten sie plausible Rationalisierungen, wobei die
Genauigkeit bei den betroffenen Aufgaben um bis zu 36 % sank [38]. Eine generierte Begründung ist
eine Ausgabe, die bewertet werden muss, nicht ein Fenster in das Modell.

Zweitens hat **mechanistische Interpretierbarkeit**, das Forschungsprogramm, das versucht, die
Berechnungen in einem Netzwerk rückgängig zu machen, sichtbare Fortschritte gemacht, aber nach
Aussage ihrer eigenen Forscher immer noch offene konzeptionelle und praktische Probleme, bevor viele
ihrer Vorteile realisiert werden können [39]. Ab 2026-09-24 sollte es als Forschungsinput für
Red-Teaming und Sicherheitsfälle behandelt werden, nicht als Quelle für Erklärungen pro
Entscheidung, die eine Organisation einer betroffenen Person oder einem Auditor übergeben kann.

Für Retrieval-Augmented Generation ist die praktische Erklärung die **Zitierung**: welche
abgerufenen Passagen welche Sätze unterstützen. Zitierungen sind nur so gut wie ihre Unterstützung.
Eine Prüfung von vier generativen Suchmaschinen ergab, dass im Durchschnitt 51,5 % der generierten
Sätze vollständig durch ihre Zitierungen unterstützt wurden und 74,5 % der Zitierungen ihren Satz
unterstützten [40]. Ein RAG-Erklärungsartefakt benötigt daher seine eigenen Evals:
Zitierungspräzision (unterstützt jede zitierte Passage ihre Behauptung?), Zitierungsrückruf (wird
jede Behauptung zitiert?) und Begründetheit, alle in Schicht 03 ausgeführt, plus eine Spur in
Schicht 04, die den Corpus-Snapshot und Passagenkennungen hinter jeder Antwort speichert, damit die
Zitierung später erneut überprüft werden kann.

## Die rechtlichen Anknüpfungspunkte für Erklärungen

Erklärungspflichten ergeben sich aus mehreren Regelwerken, die sich darin unterscheiden, wer was,
wem und wann schuldet. Die Tabelle leitet die Arbeit; die Unterabschnitte fügen hinzu, was für den
Build wichtig ist. Die Kapitel 18 bis 20
([The EU AI Act](/bok/eu-ai-act#explanation-and-notice-to-affected-people),
[Privacy and AI](/bok/privacy-and-ai#gdpr-article-22-after-schufa),
[Existing law and AI](/bok/existing-law#credit-and-lending)) geben das vollständige rechtliche Bild.

| Instrument | Wer schuldet es | Auslöser | Was muss gegeben werden | Artefakt |
|---|---|---|---|---|
| ECOA und Regulation B, 12 CFR 1002.9 | Kreditgeber | Nachteilige Maßnahme bei einem Kreditantrag oder Konto | Erklärung der spezifischen Hauptgründe [31] | Grund-Code-Service; Benachrichtigungsvorlage; Entscheidungsprotokoll |
| FCRA, 15 U.S.C. 1681m und 1681g(f) | Benutzer eines Verbraucherkreditberichts | Nachteilige Maßnahme basierend auf dem Bericht | Benachrichtigung, verwendete Kreditwürdigkeit und bis zu vier Schlüsselfaktoren [41] | Bewertungs- und Schlüsselfaktor-Datensatz |
| DSGVO Art. 13(2)(f), 14(2)(g), 15(1)(h) | Verantwortlicher | Automatisierte Entscheidungsfindung gemäß Art. 22(1) und (4) | Aussagekräftige Informationen über die Logik, die Bedeutung und die vorgesehenen Folgen [9] | Mitteilung auf Systemebene; Erklärung auf Anfrage |
| DSGVO Art. 22(3) | Verantwortlicher | Ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Auswirkung, auf Vertrag oder Zustimmung | Menschliche Intervention, die Möglichkeit, einen Standpunkt zu äußern und Einspruch zu erheben [9] | Einspruchskanal; Überprüfungsprotokoll |
| UK DSGVO Art. 22A–22D | Verantwortlicher | Bedeutsame Entscheidung basierend ausschließlich auf automatisierter Verarbeitung | Informationen, Stellungnahmen, menschliche Intervention, Einspruch [42] | Dasselbe, UK-Variante |
| KI-Verordnung Art. 13 | Anbieter (für Betreiber) | Hochrisiko-KI-System | Betriebsanleitung, die Betreibern ermöglicht, die Ausgabe zu interpretieren [43] | Betriebsanleitung; Erklärungsmethoden-Karte |
| KI-Verordnung Art. 86 | Betreiber | Entscheidung basierend auf einem Annex-III-System (außer Punkt 2) mit rechtlicher oder ähnlich erheblicher nachteiliger Auswirkung | Klare und aussagekräftige Erklärung der Rolle des KI-Systems und der Hauptelemente der Entscheidung [44] | Erklärungsanfrage-Workflow; Erklärungsdatensatz |

### Kredit: Mitteilungen über nachteilige Maßnahmen und Grund-Codes

Das US-Kreditrecht ist das älteste Erklärungsregime und das konkreteste. Regulation B verlangt, dass
die Gründe für nachteilige Maßnahmen spezifisch sind und die Hauptgründe angeben; nur zu sagen, dass
der Antragsteller interne Standards oder eine Qualifizierungsbewertung nicht erfüllt hat, ist
unzureichend [31]. Der offizielle Kommentar fügt das technische Detail hinzu: mehr als vier Gründe
sind wahrscheinlich nicht hilfreich; Gründe müssen sich auf die tatsächlich berücksichtigten oder
bewerteten Faktoren beziehen und diese genau beschreiben; kein Hauptgrund darf weggelassen werden;
und keine einzelne Auswahlmethode ist erforderlich, mit zwei Referenzmethoden, die die Bewertung des
Antragstellers für jeden Faktor gegen Durchschnittsbewertungen vergleichen [57]. Wenn die Maßnahme
auf einem Verbraucherkreditbericht beruht, fügt die FCRA die verwendete Kreditwürdigkeit und bis zu
vier Schlüsselfaktoren hinzu [41].

Die zwei Zirkulare des CFPB zur Anwendung dieser Pflichten auf komplexe Algorithmen und auf
Beispielformulare für Gründe wurden am 12. Mai 2025 zurückgezogen [45]; ab 2026-09-24 tragen die
Verordnung und ihr Kommentar immer noch die Pflicht. Ein **Grund-Code-Service** ordnet jeden
Hauptfaktor, den das Modell tatsächlich verwendet hat, einem stabilen, für Menschen lesbaren Grund
zu, versioniert mit dem Modell, und ein Test zeigt, dass die für eine Stichprobe von Ablehnungen
angegebenen Gründe den Faktoren entsprechen, die sie angetrieben haben. Wenn das Modell zu komplex
ist, damit dieser Test erfolgreich ist, ist das Modell das Problem, nicht die Mitteilung.

### Datenschutz: DSGVO und das UK-Regime

The GDPR's articles do not use the words "right to explanation"; Recital 71 mentions obtaining "an
explanation of the decision reached", and Articles 13 to 15 require meaningful information about the
logic involved where Article 22 automated decision-making takes place [9]. The Court of Justice has
made that concrete. In *SCHUFA* (C-634/21, 7 December 2023) it held that generating a credit score
can itself be an Article 22(1) decision where a third party draws strongly on it [46], so the
scoring provider, not only the lender, can owe the safeguards. In *Dun & Bradstreet Austria*
(C-203/22, 27 February 2025) it held that the controller must explain the procedure and principles
actually applied, that a complex mathematical formula does not meet the duty, and that trade secrets
go to the authority or court for a case-by-case balance rather than justifying refusal [47]. The
Court added that, for profiling, the national court could find it sufficiently transparent and
intelligible to tell the data subject how far a variation in the personal data taken into account
would have led to a different result (para. 62) [47][48]: a counterfactual explanation in legal
language.

Im Vereinigten Königreich ersetzte der Data (Use and Access) Act 2025 Artikel 22 durch Artikel 22A
bis 22D, die eine Entscheidung als ausschließlich automatisiert behandeln, wenn es keine
aussagekräftige menschliche Beteiligung gibt, und Schutzmaßnahmen verlangen, um das Datensubjekt zu
informieren, Stellungnahmen entgegenzunehmen, menschliche Intervention bereitzustellen und Einspruch
zu ermöglichen [42]. Die gemeinsam gekennzeichnete Anleitung der ICO mit The Alan Turing Institute
zur Erklärung von KI-Entscheidungen wird ab 2026-09-24 überprüft; ihre sechs Erklärungstypen
(Begründung, Verantwortung, Daten, Fairness, Sicherheit und Leistung, Auswirkungen) bleiben eine
nützliche Checkliste [49]. In der EU schlug die Kommission ein breiteres digitales Omnibus vor, das
Artikel 22 umschreiben würde; ein erster Kompromiss des Rates ließ diese Änderung fallen, und ab
2026-09-24 sind die DSGVO-Änderungen nicht angenommen [50] (überprüfen Sie vor der Verwendung des
aktuellen Textes).

### Die KI-Verordnung der EU: Artikel 13 und 86

Die KI-Verordnung fügt eine Pflicht upstream und eine downstream hinzu. Artikel 13 verlangt, dass
Hochrisiko-Systeme transparent genug sind, damit Betreiber die Ausgabe interpretieren und angemessen
nutzen können, mit Betriebsanleitungen, die "relevant, zugänglich und für Betreiber verständlich"
sind und die technischen Fähigkeiten des Systems abdecken, um Informationen bereitzustellen, die
relevant sind, um seine Ausgabe zu erklären, seine Leistung für die Personen oder Gruppen, für die
es bestimmt ist, und die technischen Maßnahmen, die Betreibern helfen, Ausgaben zu interpretieren
[43]. Das Artefakt des Anbieters ist eine Explanation-Method-Card, die mit den Betriebsanleitungen
versendet wird: Methode, Baseline, bekannte Grenzen, Treue und Leistung auf Gruppenebene.

Artikel 86 gibt einer Person, die Gegenstand einer Entscheidung eines Betreibers auf der Grundlage
eines Hochrisiko-Systems aus Anlage III ist (außer kritische Infrastruktur, Punkt 2), mit
rechtlichen oder ähnlich erheblichen nachteiligen Auswirkungen auf ihre Gesundheit, Sicherheit oder
Grundrechte, das Recht auf "klare und aussagekräftige Erklärungen über die Rolle des KI-Systems im
Entscheidungsprozess und die wesentlichen Elemente der getroffenen Entscheidung" [44]. Sie gilt nur,
wenn das Unionsrecht nicht bereits das Recht vorsieht [44], daher kommen die Artikel 15 Absatz 1
Buchstabe h und 22 der DSGVO zuerst, wenn sie anwendbar sind. Betreiber müssen Personen auch
mitteilen, dass sie dem System unterliegen [51]. Das Digital-Omnibus verschob die
Hauptverpflichtungen aus Anlage III auf den 2. Dezember 2027 [10]; ob der praktische Beginn von
Artikel 86 diesem Datum folgt, sollte mit einem Rechtsanwalt bestätigt werden (überprüfen). Die
Entwicklung muss nicht warten: ein Erklärungsdatensatz, der unten beschrieben wird, erfüllt Artikel
86, Artikel 15 Absatz 1 Buchstabe h und eine Mitteilung über nachteilige Maßnahmen.

## Testen der Erklärungsqualität

Eine Erklärung ist eine Ausgabe, daher wird sie wie jede andere Ausgabe evaluiert. Die Taxonomie von
Doshi-Velez und Kim gibt drei Evidenzstufen mit steigenden Kosten: **funktional begründete** Tests
ohne Menschen (Proxy-Metriken), **menschlich begründete** Tests mit Laien bei vereinfachten Aufgaben
und **anwendungsbezogene** Tests mit echten Benutzern bei der echten Aufgabe [52]. Eine praktische
Suite mischt alle drei.

| Test | Was es prüft | Stufe | Beispiel-Gate-Bedingung (illustrativ) |
|---|---|---|---|
| **Treue** | Die Erklärung spiegelt das Modell wider (NIST-Erklärungsgenauigkeit [29]): Das Löschen der am höchsten zugeordneten Merkmale ändert die Ausgabe mehr als das Löschen zufälliger Merkmale | Funktional | Deletion-Kurven-Fläche schlägt Zufallswert um einen festgelegten Spielraum im Validierungssatz |
| **Stabilität** | Nahezu identische Eingaben erhalten nahezu identische Erklärungen und Grundcodes | Funktional | Top-k-Grund-Überlappung über einem Schwellenwert unter kleinen Störungen |
| **Sanität** | Die Erklärung ändert sich, wenn das Modell randomisiert wird [36] | Funktional | Erklärungsähnlichkeit nach Gewichtsrandomisierung unter einem Schwellenwert |
| **Manipulationsresistenz** | Off-Manifold-Probing kann eine bekannte Verzerrung nicht verbergen [35] | Funktional | Planted-Bias-Test-Modell wird durch die Erklärungsmethode erkannt |
| **Grundcode-Konsistenz** | Grundcodes entsprechen den Faktoren, die die Entscheidung tatsächlich getroffen haben [57] | Funktional | 100 % der Stichproben-Ablehnungen haben Gründe aus bewerteten Faktoren |
| **Kontrafaktische Gültigkeit** | Die vorgeschlagene Änderung kehrt die Entscheidung um und verwendet nur veränderbare Merkmale | Funktional | Alle Stichproben-Kontrafaktoren gültig und umsetzbar |
| **Verständnis** | Die beabsichtigte Zielgruppe kann den Hauptgrund angeben und was sie ändern könnte | Menschlich begründet | Eine Mehrheit eines Test-Panels beantwortet beide Fragen korrekt |
| **Entscheidungsunterstützung** | Prüfer mit Erklärungen entscheiden besser, nicht nur schneller, und werden nicht in Automatisierungsverzerrung geführt | Anwendungsbezogen | Override-Genauigkeit mit Erklärungen mindestens gleich wie ohne |

Die letzten beiden Zeilen sind diejenigen, die Teams überspringen, und diejenigen, die das Gesetz
interessieren: eine Erklärung muss für die Person, die sie erhält, **aussagekräftig** sein [29].
Testen Sie die Mitteilung mit Personen wie ihren Empfängern, einschließlich Personen mit niedriger
Alphabetisierung in ihrer Sprache und Personen, die Hilfstechnologie nutzen, und bewahren Sie das
Protokoll und die Ergebnisse als Evidenz auf. Für Prüfer kombinieren Sie dies mit
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14): eine Erklärung,
die Prüfer schneller mit einem falschen Modell einverstanden macht, ist ein Kontrollversagen.

## Zugängliche Erklärungen

Eine Erklärung, die der Empfänger nicht wahrnehmen oder verstehen kann, besteht den
"aussagekräftigen" Test unabhängig von ihrer Treue nicht. Die KI-Verordnung verlangt
Betriebsanleitungen, die "relevant, zugänglich und für Betreiber verständlich" sind [43], und
verlangt von Anbietern von Hochrisiko-Systemen, die EU-Barrierefreiheitsanforderungen der
Richtlinien (EU) 2016/2102 und 2019/882 zu erfüllen [53]. WCAG 2.2 gibt die prüfbaren Kriterien für
den digitalen Kanal [54]. In der Praxis:

- **Text zuerst.** Jedes Zuordnungsdiagramm (ein SHAP-Wasserfall, eine Salienzenkarte) hat ein
  Textäquivalent, das die Hauptfaktoren in Worten angibt (WCAG-Erfolgskriterium 1.1.1,
  Nicht-Text-Inhalte).
- **Nie nur Farbe.** Positive und negative Beiträge werden durch Vorzeichen und Beschriftung
  gekennzeichnet, nicht nur rot und grün (1.4.1, Verwendung von Farbe).
- **Einfache Sprache.** Grundcodes werden für den Empfänger geschrieben, nicht für den
  Datenwissenschaftler; zielen Sie auf ein Leseverständnis der unteren Sekundarstufe ab, wenn die
  Zielgruppe die Öffentlichkeit ist (3.1.5, Leseverständnis, ein AAA-Kriterium, das hier als Ziel
  verwendet wird).
- **Gestaffelte Details.** Ein Grund in einem Satz, dann die Hauptfaktoren, dann wie man Einspruch
  einlegt, dann der technische Anhang für diejenigen, die fragen.
- **Mehr als ein Kanal.** Die gleiche Erklärung ist auf Papier, per Telefon oder persönlich für
  Personen verfügbar, die den digitalen Kanal nicht nutzen.

## Erklärungsartefakte als Evidenzdatensätze

Eine Erklärung, die geliefert und nicht aufbewahrt wird, kann nicht überprüft, reproduziert oder
verteidigt werden. Die Einheit der Evidenz ist der
[**Erklärungsdatensatz**](/patterns/explanation-artefact): ein strukturiertes Objekt pro erklärter
Entscheidung, zur Entscheidungszeit von der Runtime (Schicht 04) geschrieben, mit der gleichen
Registry-ID wie jedes andere Artefakt verknüpft und von der Verpflichtung, die es erfüllt,
aufbewahrt.

> **Beispiel (illustrativ)** Ein Erklärungsdatensatz für eine abgelehnte
> Gerätefinanzierungsanwendung:
>
> ```json
> { "decision_id": "dfc-2026-09-18-004211", "subject": "credit-dfc@2026-09-01",
>   "outcome": "decline", "method": "treeshap", "method_version": "0.46",
>   "baseline": "bg-sample.v12", "fidelity_check": "pass",
>   "reason_codes": ["R07 debt-to-income", "R12 recent missed payments"],
>   "counterfactual": { "feature": "monthly_debt", "change": "-180", "result": "approve" },
>   "template": "adverse-action.en.v5", "audience": "applicant",
>   "delivered": "2026-09-18T10:02:13Z", "channel": "email+letter",
>   "contest_url_ref": "appeal-flow.v3" }
> ```

Der Datensatz macht drei Dinge wahr. Die Erklärung ist reproduzierbar, weil die Modellversion, die
Methode, ihre Version und die Baseline festgelegt sind. Sie ist überprüfbar, weil die Grundcodes neu
abgeleitet und verglichen werden können. Und sie ist wiederverwendbar, weil der gleiche Datensatz
eine Regulation-B-Mitteilung, eine Anfrage nach Artikel 15 Absatz 1 Buchstabe h, eine Anfrage nach
Artikel 86 und einen internen Einspruch beantwortet. Erklärungsdatensätze fließen mit dem Rest der
Evidenz in Schicht 05, wo ein Auditor fragen kann "zeige mir jeden Ablehnungsfall im August, dessen
Grundcodes sich von einer Neuberechnung unterscheiden" und erhält eine Abfrage, nicht ein Projekt.

## Fairness und Erklärbarkeit im Stack

Beide Disziplinen produzieren Evidenz in jeder Schicht. Die Tabelle ist die Checkliste; jede Zeile
nennt das Artefakt, nicht die Aspiration.

| Schicht | Fairness-Artefakt | Erklärbarkeits-Artefakt | Muster |
|---|---|---|---|
| **01 Govern-as-Code** | Fairness-Politik als Daten: geschützte Attribute nach Gerichtsbarkeit, gewählte Metrik und Grund, Schwellenwerte, Mindestzellengröße, Genehmiger | Erklärungspolitik: erforderliche Erklärungstypen pro Anwendungsfall, interpretierbar-by-default-Regel, Grundcode-Grenzen | [Policy Card](/patterns/policy-card) |
| **02 Inventory & Transparency** | Data Card mit Abdeckung pro Gruppe und der Art. 4a-Grundlage; Model Card mit disaggregierten und intersektionalen Metriken | Betriebsanleitungen und Explanation-Method-Card (Methode, Baseline, Treue, Grenzen); KI-Nutzungsmitteilung | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) |
| **03 Evals & Red Teaming as Evidence** | [Fairness Eval Suite](/patterns/fairness-eval-suite): Gruppenmetriken mit Intervallen, intersektionale Schnitte, Proxy-Scan, kontrafaktischer Flip-Test | Explanation Eval Suite: Treue, Stabilität, Sanität, Grundcode-Konsistenz, Verständnistest | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **04 Runtime Controls & Observability** | Rollende Auswahlquoten und AIR nach Gruppe; Override- und Einspruchsquoten nach Gruppe | [Erklärungsdatensatz](/patterns/explanation-artefact) pro Entscheidung; Einspruchskanal; RAG-Zitatspur | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **05 Assurance & Continuous Compliance** | Fairness-Ergebnisse und Audit-Zusammenfassungen als maschinenlesbare Evidenz; LL144-ähnliche veröffentlichte Zusammenfassung | Erklärungsanfrage-Protokoll mit Antwortzeiten; periodische Neuberechnungsprüfungen | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |

Schicht 03 ist, wo beide zu Kontrollen werden, weshalb die Definition von Fertig in
[Layer 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) unverändert gilt: die Suites
werden mit dem Modell versioniert, laufen in CI, geben strukturierte Ergebnisse aus, die gegen den
Registry-Eintrag eingereicht werden, und brechen den Build ab, wenn sie fehlschlagen. Für beschaffte
Modelle gilt die gleiche Logik an der Grenze: Sie können immer noch Gruppenmetriken auf den Ausgaben
eines Vendor-Systems berechnen und die Erklärungen testen, die es zurückgibt, und das
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) ist, wo Sie die
eigenen disaggregierten Ergebnisse und Explanation-Method-Dokumentation des Anbieters anfordern
(siehe [Third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

Das Standards-Regal für diese Arbeit ist kurz. NIST SP 1270 rahmt Verzerrung [2], NIST IR 8312 rahmt
Erklärung [29], und ISO/IEC TR 24027:2021 behandelt Verzerrung in KI-Systemen und KI-gestützter
Entscheidungsfindung [55]; sie wird hier nur nach Nummer referenziert. ISO/IEC TS 6254:2025
(veröffentlicht September 2025) ist das SC-42-Dokument zu Zielen und Ansätzen für Erklärbarkeit und
Interpretierbarkeit von Machine-Learning-Modellen und KI-Systemen [56]; auch sie wird hier nur nach
Nummer referenziert. Keine davon ist eine harmonisierte Norm, und keine verleiht eine
Konformitätsvermutung mit der KI-Verordnung (siehe
[the regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)).

### Gate-Bedingungen

Eine Gate-Bedingung ist ein Satz, den die Pipeline evaluieren kann. Illustrative Bedingungen, jede
an einen Richtlinienwert gebunden, nicht an eine Rundenzahl, die für Komfort gewählt wurde:

- Für jede Gruppe und intersektionale Zelle über der Mindestgröße liegt die untere Konfidenzgrenze
  des AIR auf oder über dem Richtlinienminimum und die Lücke in der gewählten Fehlermetrik liegt
  innerhalb ihrer Grenze, oder eine unterzeichnete Begründung ist an die Freigabe angehängt.
- Zellen unter der Mindestgröße werden als "unzureichende Daten" aufgelistet; keine wird als Erfolg
  gemeldet.
- Der Proxy-Scan liegt unter dem Richtliniengrenzwert, oder jedes gekennzeichnete Merkmal hat eine
  aufgezeichnete Begründung.
- Die Erklärungsmethode besteht Treue-, Stabilitäts- und Sanitätsprüfungen; Stichproben-Grundcodes
  stammen nur aus bewerteten Faktoren; Stichproben-Kontrafaktoren sind gültig und verwenden nur
  veränderbare Merkmale.
- Die Model Card, Explanation-Method-Card und Betriebsanleitungen wurden für diese Version neu
  generiert.

Ein Eval-Gate-Ergebnis trägt die Metrik, sein Intervall und die Richtlinie, gegen die es bewertet
wurde (illustrativ):

```json
{ "suite_id": "fairness.credit-dfc.v3", "model_version": "credit-dfc@2026-09-01",
  "metric": "approval_air", "group": "age_65_plus", "value": 0.86,
  "ci95": [0.81, 0.91], "floor": 0.80, "min_cell": 200, "n": 1840,
  "policy": "fairness-policy.credit.v2", "result": "pass" }
```

> **In der Praxis (illustrativ)** Ein Telekommunikationsunternehmen, das Mobiltelefone in Raten
> verkauft, führt zum Zeitpunkt des Verkaufs eine Kreditprüfung durch, sodass jede Ablehnung eine
> Kreditentscheidung ist, die dem Antragsteller ihre Gründe schuldet. Die erste Version verwendete
> ein Gradient-Boosting-Modell und generierte Ablehnungscodes aus SHAP-Werten zur Anfragezeitpunkt.
> Ein Konsistenztest für Ablehnungscodes stellte fest, dass für einen Teil der Ablehnungen das
> Top-SHAP-Feature eine technisch konstruierte Interaktion war, die keine Mitteilung beschreiben
> konnte. Das Team trainierte eine monotone Scorecard als Baseline, stellte fest, dass sie bei der
> Genehmigungsgenauigkeit nur einen kleinen Abstand zum komplexen Modell hatte, und setzte die
> Scorecard in Betrieb. Die Fairness-Eval gated dann jede Freigabe auf die Genehmigungsquote AIR
> nach Altersgruppe mit Intervallen, und jede Ablehnung schrieb einen Erklärungsdatensatz. Die
> Audit-Frage „Warum wurde dieser Kunde abgelehnt, und wurde jemand wie er anders behandelt?

**Zuordnung:** EU AI Act Art. 4a (special-category data for bias detection), Art. 10(2)(f)–(g),
10(3)–(4) (data and bias), Art. 13 (transparency to deployers), Art. 15(4) (feedback loops), Art.
26(11) (informing affected persons), Art. 86 (right to explanation) · GDPR Arts. 13–15, 22 · UK GDPR
Arts. 22A–22D · ECOA / Regulation B, FCRA · US Uniform Guidelines (29 CFR 1607.4(D)) · NYC Local Law
144 · NIST AI RMF (Measure 2.9, 2.11) · NIST SP 1270 · NIST IR 8312 · ISO/IEC TR 24027 · Layers
01–05. Mappings are illustrative, not a claim of conformity.

## Was Sie diese Woche tun können

1. **Pick one decision system about people and write its fairness policy as data**: the protected
   attributes that apply, the metric you chose and why, the threshold, the minimum cell size and the
   approver. Commit it before you look at the next eval run.
2. **Run a proxy scan** on that system's features: train a model to predict the protected attribute
   from them and record the result in the data card, with the Art. 4a basis if you used
   special-category data.
3. **Add one intersectional fairness eval to CI** with confidence intervals and an "insufficient
   data" outcome, wired to the [Eval Gate in CI](/patterns/eval-gate-in-ci) so that it
   can fail the build.
4. **Emit an explanation record for every adverse decision** the system makes, with the model
   version, method, baseline and reason codes pinned, and test 10 of them for reason-code
   consistency.
5. **Put one notice in front of five people** like the ones who receive it and ask them to state the
   main reason and what they could change. Keep the answers as evidence and fix what they got wrong.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (transparency answers "what happened", explainability "how", interpretability "why"; MEASURE 2.9 and 2.11). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[2] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[3] "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle" (H. Suresh, J. Guttag; seven sources: historical, representation, measurement, aggregation, learning, evaluation, deployment; EAAMO 2021). arXiv 1901.10002. 2019-01-28. https://arxiv.org/abs/1901.10002 (verified: primary)
[4] "Dissecting racial bias in an algorithm used to manage the health of populations" (Z. Obermeyer, B. Powers, C. Vogeli, S. Mullainathan; Science 366(6464):447-453; cost as a proxy for need; 17.7% to 46.5%). Science (PubMed 31649194). 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance; 10(2)(f)-(g) examination for and mitigation of biases; 10(3)-(4) relevance, representativeness and setting; former 10(5) deleted and moved to Art. 4a by the Omnibus). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15(4) (systems that continue to learn must reduce the risk of biased outputs influencing input for future operations, "feedback loops"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[7] 42 U.S.C. § 2000e-2(k) and (l) (burden of proof in disparate-impact cases: job related and consistent with business necessity; less discriminatory alternative; (l) no adjusted scores or different cut-off scores by race, colour, religion, sex or national origin). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[8] Council Directive 2000/43/EC (Racial Equality Directive), Art. 2(2)(a)-(b) (direct and indirect discrimination). EUR-Lex. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[9] Regulation (EU) 2016/679 (GDPR), Arts. 9, 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). EUR-Lex. 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[10] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[11] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4a (processing of special categories of personal data for bias detection and correction: conditions (a)-(f) in para. 1; para. 2 for other AI systems and models and for deployers of high-risk systems; no obligation created; inserted by Reg. (EU) 2026/1744, in force 27 Jul 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[12] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[13] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[14] "DOJ Opinion Finds EEOC Disparate Impact Liability Guidelines Unconstitutional" (opinion addresses 29 CFR part 1607 and 1608; "helps to implement" Executive Order 14281; EEOC enforcement plan of 4 Jun 2026 prioritises disparate treatment; private and state-law disparate-impact claims remain). Ogletree Deakins. 2026-06-29. https://ogletree.com/insights-resources/blog-posts/doj-opinion-finds-eeoc-disparate-impact-liability-guidelines-unconstitutional/ (verified: secondary)
[15] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary; no specific action required; categories under 2% may be excluded). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[16] "Fairness Through Awareness" (C. Dwork, M. Hardt, T. Pitassi, O. Reingold, R. Zemel; individual fairness; limits of statistical parity). arXiv 1104.3913. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[17] "Equality of Opportunity in Supervised Learning" (M. Hardt, E. Price, N. Srebro; equalised odds, equal opportunity and post-processing adjustment). arXiv 1610.02413. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[18] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[19] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[20] Fairlearn user guide, "Fairness in machine learning" (allocation, quality-of-service and stereotyping harms; disparity metrics as ratios or differences). Fairlearn project. 2026. https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html (verified: primary)
[21] "Counterfactual Fairness" (M. Kusner, J. Loftus, C. Russell, R. Silva). arXiv 1703.06856. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[22] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[23] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[24] "Model Cards for Model Reporting" (M. Mitchell et al.; evaluation across demographic and intersectional groups; FAT* 2019). arXiv 1810.03993. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[25] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III (high-risk use cases: point 2 critical infrastructure; point 4 employment; point 5(a) public assistance benefits; point 5(b) creditworthiness and credit scoring, excluding financial-fraud detection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[26] "AI Fairness 360: An Extensible Toolkit for Detecting, Understanding, and Mitigating Unwanted Algorithmic Bias" (R. Bellamy et al.). arXiv 1810.01943. 2018-10-03. https://arxiv.org/abs/1810.01943 (verified: primary)
[27] "Fairlearn: Assessing and Improving Fairness of AI Systems" (H. Weerts et al.; fairness as a sociotechnical challenge). arXiv 2303.16626. 2023-03-29. https://arxiv.org/abs/2303.16626 (verified: primary)
[28] "Aequitas: A Bias and Fairness Audit Toolkit" (P. Saleiro et al.). arXiv 1811.05577. 2018-11-14. https://arxiv.org/abs/1811.05577 (verified: primary)
[29] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[30] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[31] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons; the official commentary is [57]). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[32] "A Unified Approach to Interpreting Model Predictions" (S. Lundberg, S.-I. Lee; SHAP). arXiv 1705.07874. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[33] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (M. T. Ribeiro, S. Singh, C. Guestrin; LIME). arXiv 1602.04938. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[34] "Axiomatic Attribution for Deep Networks" (M. Sundararajan, A. Taly, Q. Yan; integrated gradients; sensitivity and implementation invariance). arXiv 1703.01365. 2017-03-04. https://arxiv.org/abs/1703.01365 (verified: primary)
[35] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[36] "Sanity Checks for Saliency Maps" (J. Adebayo et al.; some saliency methods are independent of model and data). arXiv 1810.03292. 2018-10-08. https://arxiv.org/abs/1810.03292 (verified: primary)
[37] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (S. Wachter, B. Mittelstadt, C. Russell; Harvard Journal of Law & Technology, 2018). arXiv 1711.00399. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[38] "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (M. Turpin, J. Michael, E. Perez, S. R. Bowman; accuracy drops of up to 36% on 13 BIG-Bench Hard tasks). arXiv 2305.04388. 2023-05-07. https://arxiv.org/abs/2305.04388 (verified: primary)
[39] "Open Problems in Mechanistic Interpretability" (L. Sharkey et al.). arXiv 2501.16496. 2025-01-27. https://arxiv.org/abs/2501.16496 (verified: primary)
[40] "Evaluating Verifiability in Generative Search Engines" (N. F. Liu, T. Zhang, P. Liang; 51.5% of generated sentences fully supported by citations; 74.5% of citations support their sentence). arXiv 2304.09848. 2023-04-19. https://arxiv.org/abs/2304.09848 (verified: primary)
[41] 15 U.S.C. § 1681m(a) and § 1681g(f)(1) (duties of users taking adverse action on the basis of a consumer report; credit score, range and key factors, not more than four). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII.htm (verified: primary)
[42] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22A no meaningful human involvement; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and provision of information to deployers; 13(2) "relevant, accessible and comprehensible to deployers"; 13(3)(b)(iv), (v), (vii); 13(3)(d)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[44] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; Annex III except point 2; subsidiary to other Union law under 86(3)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[45] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms and Circular 2023-03 on adverse-action reasons and sample forms, both withdrawn 12 May 2025). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
[46] "CJEU's first ruling on Article 22 GDPR: 'credit scoring' is an automated decision" (C-634/21 SCHUFA, 7 Dec 2023; a probability value is an Art. 22(1) decision where a third party draws strongly on it). Cloisters. 2023-12-14. https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision (verified: secondary)
[47] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (paras. 58 to 62 and 74 to 76; Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation; for profiling, the effect of a variation in the personal data on the result can suffice (para. 62); trade secrets balanced case by case by the authority or court). Court of Justice of the EU (EUR-Lex). 2025-02-27. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0203 (verified: primary)
[48] "ECJ Ruling on Automated Decision-Making and Data Subject Access" (commentary on C-203/22: an explanation of how variations in the data might change the outcome). Clyde & Co. 2025-03. https://clydeco.com/en/insights/2025/03/ecj-ruling-on-automated-decision-making-and-data-s (verified: secondary)
[49] Explaining decisions made with AI (co-badged ICO and The Alan Turing Institute guidance; six explanation types; under review after the Data (Use and Access) Act). Information Commissioner's Office. consulted 2026-09-24. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/ (verified: primary)
[50] "The Digital Omnibus: a step back from the brink, but the risks remain" (first Council compromise drops the proposed rewrite of GDPR Art. 22; GDPR amendments still in negotiation). European Digital Rights (EDRi). 2026-03-17. https://edri.org/our-work/the-digital-omnibus-a-step-back-from-the-brink-but-the-risks-remain/ (verified: secondary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(11) (deployers of Annex III high-risk systems that make or assist decisions about natural persons must inform them). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[52] "Towards A Rigorous Science of Interpretable Machine Learning" (F. Doshi-Velez, B. Kim; application-grounded, human-grounded and functionally-grounded evaluation). arXiv 1702.08608. 2017-02-28. https://arxiv.org/abs/1702.08608 (verified: primary)
[53] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16(l) (providers of high-risk systems ensure accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[54] Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation; SC 1.1.1, 1.4.1, 3.1.5). W3C. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[55] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
[56] ISO/IEC TS 6254:2025, Information technology, Artificial intelligence: Objectives and approaches for explainability and interpretability of machine learning (ML) models and artificial intelligence (AI) systems (published, edition 1; referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2025-09. https://www.iso.org/standard/82148.html (verified: primary)
[57] 12 CFR Part 1002, Supplement I, Official Interpretations, comments 9(b)(2)-1 to -5 (more than four reasons not likely helpful; reasons must relate to and accurately describe the factors actually considered or scored; no principal reason left out; no single reason-selection method required, two reference methods against average scores). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/appendix-Supplement%20I%20to%20Part%201002 (verified: primary)
