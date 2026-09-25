---
lang: de
source: bok/patterns/disclosure-notification-pipeline.md
sourceHash: "75d5ce887866ae0d4a4feb2e51693f55cd836ceeb2c2162e40ccf2c1d8501291"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: disclosure-notification-pipeline
title: "Disclosure & Notification Pipeline"
layer: 5
secondaryLayer: 2
order: 32
summary: "Alle nach außen gerichteten Aussagen über ein KI-System aus einer einzigen Quelle der Wahrheit generieren, der Registry: die proaktiven Offenlegungen (eine KI-Interaktionsbenachrichtigung, Inhaltsbezeichnungen, die Transparenzseite und die verständliche System Card, Benachrichtigungen an Arbeitnehmer und an Personen, über die Entscheidungen getroffen werden) und die reaktiven Benachrichtigungen (an den Anbieter, Behörden, betroffene Personen, Kunden und die Öffentlichkeit), die ein Trigger nach einem Zeitplan startet."
---

# Muster: Disclosure & Notification Pipeline

**Zusammenfassung:** Generieren Sie jede nach außen gerichtete Aussage über ein KI-System aus einer
einzigen Quelle der Wahrheit, der Registry: die proaktiven Offenlegungen (eine
KI-Interaktionsbenachrichtigung, Inhaltsbezeichnungen, die Transparenzseite und die verständliche
System Card, Benachrichtigungen an Arbeitnehmer und an Personen, über die Entscheidungen getroffen
werden) und die reaktiven Benachrichtigungen (an den Anbieter, Behörden, betroffene Personen, Kunden
und die Öffentlichkeit), die ein Trigger nach einem Zeitplan startet. Vorlagen werden wie Code
versioniert, Genehmigungen werden aufgezeichnet, und jede gesendete Benachrichtigung ist ein
Evidenzeintrag mit Zielgruppe, Vorlagenversion und Zeitstempel.

## Ziele
Stellen Sie sicher, dass die Personen und Stellen, die über ein KI-System informiert werden müssen,
die richtige Information zur richtigen Zeit aus einer Stimme erhalten, und können nachweisen, was
wem und wann gesagt wurde.

## Zielbenutzer
KI-Governance-Engineer, Kommunikationsverantwortlicher, Rechts- und Compliance-Abteilung,
Datenschutzbeauftragter, Produktingenieur.

## Betroffene Stakeholder
Nutzer, Arbeitnehmer und ihre Vertreter, betroffene Personen, geschäftliche Kunden und Partner,
Anbieter und Betreiber in der gesamten Lieferkette, Aufsichts- und Marktüberwachungsbehörden,
Öffentlichkeit und Medien.

## Relevante Prinzipien
Instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen; machen Sie den
kontrollierten Weg zum einfachsten Weg; geben Sie jedem Kontroll Zähne.

## Kontext
Transparenzpflichten sind jetzt an bestimmte Oberflächen und Zeitpläne gebunden. Nach der
KI-Verordnung der EU müssen Anbieter Systeme so gestalten, dass sie mit Menschen interagieren, damit
diese wissen, dass es sich um ein KI-System handelt, und müssen synthetische Ausgaben kennzeichnen;
Betreiber müssen Personen informieren, die Emotionserkennung oder biometrischer Kategorisierung
ausgesetzt sind, und müssen Deepfakes offenlegen; und die Information muss Personen spätestens bei
der ersten Interaktion oder Exposition erreichen (`Art. 50(1)`–`(5)`) [1]. Artikel 50 gilt seit 2.
Aug. 2026, und generative Systeme, die bereits vor diesem Datum auf dem Markt waren, haben bis 2.
Dez. 2026 Zeit, Ausgaben zu kennzeichnen [2]. Hochrisiko-Betreiber müssen auch Arbeitnehmer vor der
Nutzung am Arbeitsplatz informieren, Personen, über die Annex-III-Entscheidungen getroffen werden,
informieren und den Anbieter und die Behörden informieren, wenn ein System ein Risiko darstellt
(`Art. 26(5)`, `(7)`, `(11)`) [1]. Die DSGVO fügt die Benachrichtigung der Behörde innerhalb von 72
Stunden hinzu, wenn möglich, und betroffene Personen ohne unangemessene Verzögerung, wenn das Risiko
für sie hoch ist [3]. Außerhalb der EU hat Koreas AI Basic Act seit 22. Jan. 2026 vorherige
Benachrichtigung über generative und hochauswirkende KI und Bezeichnungen auf generierten Ausgaben
verlangt [4]; Kaliforniens AI Transparency Act, gültig seit 2. Aug. 2026, fordert von großen
generativen KI-Anbietern latente und optionale offene Offenlegungen [5]; und Utah verlangt eine
klare Antwort, wenn ein Verbraucher fragt, ob er mit KI spricht [6]. Die Erstellung externer
Kommunikationspläne ist Teil der Governance von Bereitstellung und Nutzung im IAPP AIGP Body of
Knowledge (Kompetenz IV.C) [7].

## Problem
Offenlegungen werden einmal von Hand pro Oberfläche geschrieben und weichen von dem ab, was läuft:
die Transparenzseite beschreibt das Modell von letztem Jahr, die Benachrichtigung im Chat-Widget ist
bei einem Redesign verschwunden, und niemand kann sagen, welche Arbeitnehmer vor dem Live-Gehen des
Systems informiert wurden. Reaktive Benachrichtigungen werden unter Druck entworfen, wenn die Uhr
bereits läuft, von wem immer verfügbar ist, ohne einen Datensatz darüber, was rausgegangen ist. Jede
Pflicht einer Gerichtsbarkeit wird von einem anderen Team mit einer anderen Vorlage bearbeitet.

### Kräfte
- **Eine Stimme gegen viele Zielgruppen.** Ein Regulator, ein Kunde und die Presse benötigen
  unterschiedliche Inhalte aus denselben Fakten.
- **Geschwindigkeit gegen Genauigkeit.** Uhren laufen ab Bewusstsein, während Fakten spät ankommen;
  eine Übergangserklärung darf nur sagen, was bekannt ist.
- **Konsistenz gegen Lokalisierung.** Pflichten und Sprachen unterscheiden sich je nach
  Gerichtsbarkeit, doch die Fakten dürfen nicht.
- **Proaktiv gegen reaktiv.** Offenlegungspflichten sind kontinuierlich; Benachrichtigungspflichten
  werden durch Ereignisse ausgelöst.

## Lösung
Behandeln Sie die Offenlegung als eine Pipeline von der Registry zu jeder Zielgruppe, mit Evidenz am
Ende.

1. **Eine einzige Quelle der Wahrheit.** Der Registry-Eintrag hält die Fakten, auf die Offenlegungen
   aufbauen: Zweck, Anbieter, Modellversion, Gerichtsbarkeiten, ob das System mit Menschen
   interagiert, Inhalte generiert, Entscheidungen über Menschen trifft oder bei der Arbeit verwendet
   wird. Die Transparenzseite und die verständliche System Card werden bei jeder Veröffentlichung
   daraus generiert, daher können sie nicht von dem abweichen, was läuft.
2. **Eine Pflichtmatrix pro System.** Ein Regelsatz ordnet Registry-Fakten Pflichten zu:
   Interaktionsoffenlegung, Inhaltsmarkierung und Bezeichnungen, Arbeitnehmerinformation,
   Entscheidungsbenachrichtigungen (siehe
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path)), lokale
   Benachrichtigungen pro Gerichtsbarkeit. Jede Pflicht benennt eine Oberfläche, eine Vorlage und
   einen Test, dass die Benachrichtigung dort gerendert wird.
3. **Vorlagen als Code.** Vorlagen pro Zielgruppe und Sprache befinden sich in der Versionskontrolle
   mit einem Besitzer und einer Genehmigungsregel; eine Vorlagenänderung ist ein überprüfter Diff.
   Übergangserklärungen existieren als Skelett vor jedem Incident.
4. **Trigger mit Uhren.** Ein Incident, eine Verletzung, eine wesentliche Änderung, eine Einstellung
   oder ein Ruhestand gibt einen Trigger ab; die Pipeline wählt die Zielgruppen aus der Matrix und
   dem [Downstream Use Register](/patterns/downstream-use-register) aus, startet jede Uhr und
   entwirft jede Benachrichtigung. Incidents kommen von der
   [Incident Pipeline](/patterns/incident-pipeline).
5. **Evidenz pro Benachrichtigung.** Jede gesendete Benachrichtigung schreibt einen Datensatz:
   Zielgruppe, Trigger, Vorlagenversion, Genehmiger, Kanal, Zeitstempel. Der
   Bereitstellungsentscheidungsdatensatz verweist auf die proaktiven (`workers_informed` und
   `affected_persons_informed` Pflichten, im
   [Bereitstellungsentscheidungsdatensatz-Schema](/resources/templates#schema-deployment-decision-record)),
   und der Berichterstattungsblock des Incident-Datensatzes verweist auf die reaktiven.

Illustratives Offenlegungsmanifest, das aus der Registry generiert wurde, mit einer gesendeten
Benachrichtigung:

```json
{
  "subject": "csa-01@2026-09-18",
  "generated_at": "2026-09-18T07:00:00Z",
  "proactive": [
    { "duty": "EU AI Act Art. 50(1)", "surface": "chat widget", "template": "ai-disclosure.es-en.v3", "test": "e2e:disclosure-renders" },
    { "duty": "Korea AI Basic Act Art. 31(1)", "surface": "terms of service (KR)", "template": "kr-prior-notice.ko.v1", "test": "e2e:kr-terms-notice" },
    { "duty": "transparency page", "surface": "/ai/csa-01", "template": "system-card.v2", "test": "build:card-matches-registry" }
  ],
  "reactive": [
    { "trigger": "serious_incident", "audience": "provider", "clock": "immediately", "template": "si-notice.v2" },
    { "trigger": "personal_data_breach", "audience": "supervisory_authority", "clock": "72h where feasible", "template": "breach-art33.v4" },
    { "trigger": "material_change", "audience": "business_customers", "clock": "30 days before, per contract", "template": "change-notice.v2" }
  ],
  "sent": [
    {
      "notice_id": "ntc-2026-0091",
      "trigger": "material_change",
      "audience": "business_customers",
      "template": "change-notice.v2",
      "approved_by": "communications-owner",
      "sent_at": "2026-09-01T10:00:00Z"
    }
  ]
}
```

> **Beispiel (illustrativ)** Ein Support-Assistent wechselt zu einem neuen Anbietermodell. Die
> Veröffentlichung regeneriert die System Card und die Transparenzseite aus der Registry, die
> Pipeline sendet die vertragliche Änderungsbenachrichtigung 30 Tage im Voraus an geschäftliche
> Kunden aus der genehmigten Vorlage, und eine Prüfung in CI schlägt den Build fehl, wenn ein neu
> gestaltetes Chat-Widget die KI-Interaktionsbenachrichtigung nicht mehr rendert.

## Konsequenzen
Was die Organisation über ihre KI sagt, entspricht dem, was läuft, Benachrichtigungen gehen
pünktlich aus genehmigten Vorlagen raus, und jede ist nachweisbar. Die Kosten sind die
Pflichtmatrix, die bei Gesetzesänderungen gepflegt werden muss, Vorlageneigentum über Rechts-,
Kommunikations- und Produktabteilungen, und Rendering-Tests auf jeder Oberfläche. Die Pipeline
erstellt die Benachrichtigung; ob die Benachrichtigung verstanden wird, muss noch mit ihren Lesern
getestet werden.

## Verwandte Muster
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Incident Pipeline](/patterns/incident-pipeline);
[Downstream Use Register](/patterns/downstream-use-register);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Zuordnung:** EU AI Act Art. 26(5), Art. 26(7), Art. 26(11), Art. 50 · DSGVO Art. 33, Art. 34 ·
Korea AI Basic Act Art. 31 · ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5 · NIST AI RMF MANAGE 4.3,
GOVERN 4.2, GOVERN 5.1 · Layer 05 Assurance & Continuous Compliance / Layer 02 Inventory &
Transparency.

Kontroll-IDs folgen ISO/IEC 42001 Annex A [8] und Unterkategorie-IDs dem NIST AI RMF [9].
Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5), (7) and (11) deployer information duties; Art. 50(1)–(5) transparency obligations). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 111(4): Art. 50(2) marking for generative systems placed on the market before 2 Aug 2026 from 2 Dec 2026); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 33 notification to the supervisory authority within 72 hours where feasible; Art. 34 communication to the data subject). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[4] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; Art. 31 prior notice, output labelling and realistic synthetic content). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[5] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[6] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; effective 2025-05-07). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[7] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: establish external communication plans; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[8] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.8.3 external reporting; A.8.4 communication of incidents; A.8.5 information for interested parties). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 4.2 impacts documented and communicated more broadly; GOVERN 5.1 feedback from those external to the team; MANAGE 4.3 incidents and errors communicated to relevant AI actors, including affected communities). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
