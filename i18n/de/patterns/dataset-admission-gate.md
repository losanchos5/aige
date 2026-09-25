---
lang: de
source: bok/patterns/dataset-admission-gate.md
sourceHash: "2e990980e7b5e71079ebe1f603a788526c6583e366dfbe7ac2ee5cf6fc972584"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: dataset-admission-gate
title: Dataset Admission Gate
layer: 1
secondaryLayer: 2
order: 21
summary: "Ein Policy-as-Code-Gate, das einen Trainings-, Evaluierungs- oder Abruf-Job nur Datensätze mit einem vollständigen, signierten Zulassungsdatensatz für diese Verwendung lesen lässt."
---

# Muster: Dataset Admission Gate

**Zusammenfassung:** Setzen Sie ein Gate vor jeden Job, der Daten liest, um zu trainieren,
feinabzustimmen, zu validieren, zu testen, zu evaluieren oder einen Abrufindex zu erstellen: Der Job
darf eine Datensatzversion nur lesen, wenn ein Zulassungsdatensatz für ihn existiert, den
Anwendungsfall des Jobs unter seinen zulässigen Verwendungen aufführt und zeigt, dass die Rechte-,
Qualitäts-, Repräsentativitäts-, Bias- und Integritätsprüfungen bestanden oder von jemandem, der
berechtigt ist, sie zu verzichten, verzichtet wurden. Die Prüfung ist Policy-as-Code in der
Pipeline, sodass ein fehlendes Feld den Lauf statt einer Erinnerung in einem Wiki fehlschlagen
lässt.

## Ziele
Entscheiden Sie, ob Daten verwendet werden dürfen und ob sie für den Zweck geeignet sind, bevor ein
Modell von ihnen lernt, denn ein Qualitätsproblem kann später behoben werden, ein Rechte- oder
Vergiftungsproblem oft nicht.

## Zielbenutzer
KI-Governance-Engineer, Dateneigentümer und Datenverwalter, ML-Plattform-Team, Datenschutzberater,
Sicherheitsingenieur.

## Betroffene Stakeholder
Datensubjekte und Rechteinhaber, von den Ausgaben des Modells betroffene Personen (besonders
Gruppen, die die Daten unterrepräsentiert), Modelleigentümer, Prüfer und notifizierte Stellen.

## Relevante Prinzipien
Bauen Sie die Kontrolle am frühesten Punkt auf, an dem sie blockieren kann; geben Sie jeder
Kontrolle Zähne; instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen.

## Kontext
Datenplattformen, auf denen jedes Team jede Tabelle lesen kann, die es erreicht, Feature Stores, die
über Modelle hinweg geteilt werden, und Trainingsaufträge, die aus Notebooks gestartet werden. Für
Hochrisiko-KI-Systeme macht die KI-Verordnung der EU Datenverwaltung zur Anforderung: Trainings-,
Validierungs- und Testdatensätze müssen Praktiken unterliegen, die unter anderem ihre Herkunft,
Vorbereitung, die "Überprüfung auf mögliche Verzerrungen" und "angemessene Maßnahmen zur Erkennung,
Vermeidung und Minderung möglicher Verzerrungen" (`Art. 10(2)(f)` und `(g)`) abdecken, und müssen
"relevant, ausreichend repräsentativ und soweit möglich frei von Fehlern und vollständig im Hinblick
auf die Zweckbestimmung" sein (`Art. 10(3)`) [1]. Nach dem Digital-Omnibus sitzt die enge Grundlage
für die Verarbeitung besonderer Kategorien personenbezogener Daten zur Erkennung und Korrektur von
Verzerrungen in einem neuen `Art. 4a` [2].

## Problem
Daten gelangen über den Weg des geringsten Widerstands in Modelle, und die Gründe, warum sie das
nicht sollten, werden nach dem Training entdeckt.

- **Kräfte.** Datenwissenschaftler benötigen Daten schnell und iterieren häufig. Die Person, die
  einen Datensatz verwendet sehen möchte, sollte nicht die einzige Person sein, die entscheidet,
  dass dies möglich ist. Rechte-, Qualitäts- und Verzerrungsprüfungen liegen bei verschiedenen
  Eigentümern. Rechtswidrige Verarbeitung in der Entwicklungsphase kann die Rechtmäßigkeit der
  späteren Verwendung des Modells beeinträchtigen: Der EDPB hat dies in seiner Stellungnahme 28/2024
  [3] gesagt. Trainingsdaten sind auch eine Angriffsfläche: ATLAS katalogisiert
  Trainingsdatenvergiftung (`AML.T0020`) [4] und OWASP listet Daten- und Modellvergiftung als
  `LLM05:2026` [5] auf.
- **Fehlermodus.** Ein Modell trainiert auf Daten außerhalb seines Zustimmungsumfangs, auf einer
  Stichprobe, die die Population, die es bedienen wird, verfehlt, auf Etiketten, die niemand
  überprüft hat, oder auf einem Snapshot, den jemand verändert hat. Das Problem tritt in der
  Produktion oder bei einer Prüfung auf, und die Lösung ist ein Neutraining auf Daten, die von
  Anfang an hätten abgelehnt werden sollen.

## Lösung
Geben Sie jeder Datensatzversion einen Zulassungsdatensatz, und lassen Sie jeden Datenlesejob einen
präsentieren.

1. **Schreiben Sie den Zulassungsdatensatz.** Pro Datensatzversion und pro zulässiger Pipeline
   verwenden Sie das veröffentlichte
   [Dataset Admission Record Schema](/resources/templates#schema-dataset-admission-record)
   (`dataset-admission-record.v1`) erneut: das Subjekt, die Pipeline (Training, Fine-Tuning,
   Validierung, Test, Evaluierung oder Abrufindex), das Zielsystem, die verknüpfte Data Card, die
   Entscheidung (zulassen, zulassen mit Bedingungen, ablehnen), die Prüfungen mit der Verpflichtung,
   die jede durchsetzt, der Inhaltshash des zugelassenen Snapshots, der Akteur und eine Signatur.
2. **Überprüfen Sie zuerst die Rechte.** Die Rechtsgrundlage und Zweckkompatibilität für
   personenbezogene Daten, die Lizenz und die Rechtsreservierungsprüfung stammen aus dem
   [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); eine Quelle ohne
   Ledger-Zeile schlägt bei der Zulassung fehl.
3. **Überprüfen Sie die Eignung für den Zweck.** Qualitätsmaßstäbe (Etikettengenauigkeit,
   Vollständigkeit, Konsistenz, Aktualität) im Vokabular der ISO/IEC-5259-Serie [6]; Menge pro
   Klasse und pro Gruppe gegen die Mindestzellgrößen im Testplan; Repräsentativität gegen die im
   Use-Case-Datensatz angegebene Bereitstellungspopulation; eine Proxy- und Verzerrungsprüfung mit
   dem aufgezeichneten Ergebnis; und, wo besondere Kategorien personenbezogener Daten zur
   Verzerrungserkennung verwendet werden, die `Art. 4a`-Bedingungen [2].
4. **Überprüfen Sie die Integrität.** Lassen Sie einen inhaltsadressierten, signierten Snapshot zu;
   überprüfen Sie den Hash erneut, wenn der Job ihn liest; führen Sie Anomalieerkennung auf neuen
   oder angehängten Daten aus. ATLAS listet "Sanitize Training Data" (`AML.M0007`) und "Maintain AI
   Dataset Provenance" (`AML.M0025`) unter seinen Mitigationen auf [4]. Zeichnen Sie die Herkunft in
   W3C-PROV-Begriffen auf (Entitäten, Aktivitäten und Agenten) [7] und geben Sie Lineage-Ereignisse
   aus (Datensätze, Jobs und Läufe), damit jeder Trainungslauf die Zulassungsdatensätze benennt, die
   er gelesen hat [8].
5. **Trennen Sie die Aufgaben.** Der Dateneigentümer ist verantwortlich und unterzeichnet; der
   Datenbetreuer führt die Prüfungen durch; ein kleines Überprüfungsgremium entscheidet über
   umstrittene Zulassungen. Die minimale Checkliste lebt als Code, sodass das Hinzufügen einer
   Prüfung eine überprüfte Änderung ist.
6. **Erzwingen Sie zur Lesezeit.** Der Job präsentiert seine Use-Case-ID und sein Zielsystem; die
   Richtlinie verweigert den Lesezugriff, es sei denn, der Datensatz lässt diese Pipeline für diesen
   Use zu. Ein lesbares Datenblatt wird mit dem Datensatz mitgeführt und behandelt Motivation,
   Zusammensetzung, Erfassung, Vorverarbeitung, Verwendungen, Verteilung und Wartung [9].
7. **Zulassung bei Änderung erneut durchführen.** Eine neue Version, eine neue Quelle,
   Qualitätsdrift, eine Lizenzänderung, eine Löschanfrage oder ein neuer Use Case öffnet die
   Zulassung erneut.

Das AI RMF fordert, dass Überlegungen zur Datenerfassung und -auswahl (Verfügbarkeit,
Repräsentativität, Eignung) "identifiziert und dokumentiert" werden (MAP 2.3) und dass die
Rechtsrisiken von Drittanbieterdaten kartiert werden (MAP 4.1) [10].

Illustrativer Zulassungsdatensatz, gültig gegen `dataset-admission-record.v1`:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json",
  "control_id": "data.admission.v2",
  "subject": "claims-2019-2025@v4",
  "pipeline": "training",
  "target_system": "fraud-triage@3.0.0",
  "dataset_card": "https://evidence.example.org/cards/claims-2019-2025/v4",
  "decision": "admit_with_conditions",
  "checks": [
    { "check_id": "ledger.rows_present", "requirement": "Training-data rights ledger", "result": "pass" },
    { "check_id": "lawful_basis.compatible", "requirement": "GDPR Art. 6(4)", "result": "pass",
      "detail": "compatibility assessment CA-2026-014" },
    { "check_id": "use_case.permitted", "requirement": "uc-fraud-triage-03", "result": "pass" },
    { "check_id": "quality.label_agreement", "requirement": "EU AI Act Art. 10(3)", "result": "pass",
      "detail": "0.91 inter-annotator agreement" },
    { "check_id": "representativeness.region", "requirement": "EU AI Act Art. 10(3)", "result": "waived",
      "detail": "islands region below minimum cell; waiver W-2026-007 signed by data owner" },
    { "check_id": "bias.examination", "requirement": "EU AI Act Art. 10(2)(f)-(g)", "result": "pass" },
    { "check_id": "integrity.snapshot_hash", "result": "pass" }
  ],
  "conditions": ["collect islands-region claims before the next retrain", "report the islands cell as insufficient data"],
  "input_hash": "sha256:3b7e9c2a41f08d6e5c1b2a9f7e3d4c5b6a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d",
  "actor": "ci-data-gate",
  "timestamp": "2026-09-20T10:12:00Z",
  "signature": "ed25519:Hk3v8QpZ2sL7dT4rW9xY1aB6cE0fG5jM"
}
```

> **Beispiel (illustrativ)** Ein Betrugstriage-Team wies einen Trainingsauftrag auf das vollständige
> Anspruchslager. Das Gate lehnte es ab: Das Lager hatte keinen Zulassungsdatensatz für Training,
> und zwei seiner Quellen hatten keine Ledger-Zeile. Das Team ließ stattdessen einen engeren
> Snapshot zu, mit einer Repräsentativitätsprüfung, die schriftlich verzichtet wurde, und einer
> Bedingung, Daten für die fehlende Region vor dem nächsten Neutraining zu erfassen. Der Verzicht
> und die Bedingung erscheinen nun in der Model Card, und der nächste Neutraining kann nicht
> beginnen, bis die Bedingung geschlossen ist.

## Konsequenzen
Kein Modell lernt aus Daten, die nie für seine Verwendung zugelassen wurden; Rechte-, Qualitäts- und
Bias-Prüfungen hinterlassen Nachweise vor dem Training statt Erklärungen danach; und Forward Lineage
kann jedes Modell finden, das ein schlechter Datensatz erreicht hat. Die Kosten: Das Gate
verlangsamt explorative Arbeiten, es sei denn, es existiert eine Sandbox-Pipeline mit eigener,
leichterer Zulassung; Verzichte benötigen einen Eigentümer und ein Ablaufdatum, sonst werden sie zur
Norm; und Prüfungen sind nur so gut wie die Schwellenwerte hinter ihnen.

## Verwandte Muster
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Fairness Eval Suite](/patterns/fairness-eval-suite); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [AI Threat Model](/patterns/ai-threat-model).

**Zuordnung:** EU AI Act Art. 10(2)–(4), Art. 4a · GDPR Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001
A.7.2, A.7.4, A.7.5, A.7.6 · NIST AI RMF (Map 2.3, 4.1) · OWASP LLM05:2026 · Layer 01 Govern-as-Code
/ Layer 02 Inventory & Transparency.

Threat-IDs folgen den OWASP Top 10 for LLM Applications 2026 [5] und MITRE ATLAS [4]; Funktions- und
Unterkategoriebezeichnungen folgen dem NIST AI RMF [10]; ISO/IEC 42001 Annex A IDs folgen einem
veröffentlichten Crosswalk, nicht dem Text des Standards [11]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 10 (data and data governance: 10(2)(f) examination in view of possible biases, 10(2)(g) measures to detect, prevent and mitigate them; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) setting of use) (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM05:2026 Data and Model Poisoning). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[7] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[8] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[9] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 2.3 data collection and selection considerations "identified and documented"; MAP 4.1 legal risks of components incl. third-party data). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[11] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.2 data for development and enhancement, B.7.4 quality of data, B.7.5 data provenance, B.7.6 data preparation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
