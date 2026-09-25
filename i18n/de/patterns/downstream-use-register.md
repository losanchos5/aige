---
lang: de
source: bok/patterns/downstream-use-register.md
sourceHash: "f84d166dd4281cb06775468258a2e6c681be6b23130230ce233dc30679fcb3c7"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: downstream-use-register
title: Downstream Use Register
layer: 2
secondaryLayer: 1
order: 31
summary: "Beabsichtigte und verbotene Verwendungen als Policy Card, jeder Konsument der Ausgaben eines Systems gegen seinen Registry-Eintrag aufgezeichnet, und Herkunft auf Ausgaben gestempelt."
---

# Muster: Downstream Use Register

**Zusammenfassung:** Zeichnen Sie gegen jeden Registry-Eintrag eines Systems auf, wofür seine
Ausgaben verwendet werden dürfen und nicht verwendet werden dürfen und wer sie tatsächlich
konsumiert: andere Systeme, Teams, Partner und Modelle, die auf ihnen trainiert werden.
Beabsichtigte und verbotene Verwendungen werden als Policy Card geschrieben; jeder Konsument wird
mit seiner Verwendung, seiner Genehmigung und der Neu-Test, die ihn freigegeben hat, registriert;
Ausgaben tragen Herkunft und Vorbehalte, damit ein Konsument weiß, was er verwendet; und zweckfremde
Verwendung wird zur Laufzeit überwacht. Sekundäre Verwendung, Funktionserweiterung und
nachgelagerter Schaden werden sichtbar, und eine Änderung oder ein Ruhestand kann jeden erreichen,
den es betrifft.

## Ziele
Prognostizieren und begrenzen Sie die Verwendungen, für die ein System nicht genehmigt wurde, machen
Sie jeden nachgelagerten Konsumenten seiner Ausgaben bekannt und verantwortlich, und geben Sie
Änderungs-, Incident- und Ruhestandsprozessen eine Liste von wem zu benachrichtigen.

## Zielbenutzer
KI-Governance-Engineer, Systemeigentümer, Dataplattform-Team, Produktmanager.

## Betroffene Stakeholder
Personen, die von nachgelagerten Entscheidungen betroffen sind, konsumierende Teams und Partner,
Betreiber eines Anbieter-Systems, Prüfer und Marktüberwachungsbehörden.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; beginnen Sie mit einem benannten
Fehlermodus oder Schaden; machen Sie den kontrollierten Weg zum einfachsten Weg.

## Kontext
Systeme werden für mehr verwendet, als sie genehmigt wurden. Die KI-Verordnung der EU benennt das
Konzept: vernünftigerweise vorhersehbare Fehlanwendung ist Verwendung nicht in Übereinstimmung mit
der Zweckbestimmung, die sich aus vernünftigerweise vorhersehbarem menschlichen Verhalten oder der
Interaktion mit anderen Systemen ergeben kann (`Art. 3(13)`), Anbieter müssen Risiken darunter
bewerten (`Art. 9(2)(b)`), und ein Betreiber, der die Zweckbestimmung eines Systems so ändert, dass
es hochrisikobehaftet wird, übernimmt die Pflichten des Anbieters (`Art. 25(1)(c)`) [1]. Anbieter
generativer Systeme müssen synthetische Ausgaben auf maschinenlesbarer Weise kennzeichnen
(`Art. 50(2)`) [1], was Herkunft ist, die ein Konsument lesen kann. Ausgaben, die andere Komponenten
speisen, sind auch eine Angriffsfläche: unsachgemäße Ausgabenbehandlung, bei der Modellausgaben ohne
Validierung nachgelagert weitergegeben werden, ist eine benannte Risikoclasse [2], und in
agentischen Systemen kann der Fehler eines Agenten durch andere kaskadieren [3]. Die Governance von
Bereitstellung und Nutzung umfasst jetzt die Prognose und Verringerung sekundärer und nachgelagerter
Schäden; das IAPP AIGP Body of Knowledge listet es unter Kompetenz IV.C auf [4].

## Problem
Ein Bestand erfasst Systeme, nicht das, was ihre Ausgaben später werden. Ein Risikoscore, der zur
Priorisierung manueller Überprüfungen genehmigt wurde, wird ein Jahr später zu einer automatischen
Ablehnung in einer anderen Team-Pipeline; die Ausgaben eines Zusammenfassungsmodells werden als
Trainingsdaten geerntet; ein Partner erhält Ausgaben gemäß eines Vertrags, den niemand mit der
Registry verbunden hat. Keiner dieser Konsumenten wurde bewertet, keiner wird benachrichtigt, wenn
sich das Modell ändert, und das Retirement Runbook kann sie nicht finden. Wo Ausgaben die Daten
beeinflussen, die die nächste Version lernt, ist die Rückkopplungsschleife auch unsichtbar.

### Kräfte
- **Wiederverwendung gegen Zweck.** Ein gutes Modell wiederzuverwenden ist billig und nützlich; jede
  Wiederverwendung kann auch ein neuer, unbewerteter Zweck sein.
- **Offenheit gegen Kontrolle.** Ausgaben, die über eine API oder eine Datenplattform veröffentlicht
  werden, sind leicht zu konsumieren und schwer zu verfolgen.
- **Vorbehalte gegen Benutzerfreundlichkeit.** Die Kennzeichnung von Herkunft und Grenzen auf jeder
  Ausgabe erhöht das Gewicht, das Konsumenten möglicherweise entfernen.
- **Prognose gegen Gewissheit.** Missbrauch muss vorher vorgestellt werden, ohne Daten, um die
  Prognose zu beweisen.

## Lösung
Geben Sie der nachgelagerten Nutzung ein Register, und machen Sie die Registrierung zur einzigen
Möglichkeit, die Ausgaben zu erhalten.

1. **Nutzungen als [Policy Card](/patterns/policy-card).** Die beabsichtigten Nutzungen des Systems
   und sein negativer Raum (verbotene Nutzungen, Populationen und Kontexte, für die es nicht
   validiert wurde) sind Regeln auf einer Karte, die mit dem Registereintrag des
   [Agent Registry](/patterns/agent-registry) gespeichert ist, nicht ein Absatz in einer Model Card.
2. **Prognose vor dem Go-Live.** Führen Sie ein Premortem durch ("ein Jahr von jetzt an hat dies
   Schaden verursacht: wie?"), Missbrauchsfälle neben den User Stories geschrieben, und eine
   Stakeholder-Auswirkungskarte, die Personen einschließt, die die Benutzeroberfläche nie berühren.
   Jeder plausible Missbrauch wird zu einer Regel für verbotene Nutzung oder einem Monitor.
3. **Konsumenten als Einträge.** Jeder Konsument (ein System, ein Team, ein Partner, eine
   Trainings-Pipeline) wird gegen das produzierende System mit seinem Zweck, seiner Genehmigung, dem
   Neutest, der die Ausgaben für diesen neuen Kontext freigegeben hat, und dem Vertrag, der eine
   externe Partei bindet, registriert. Der Zugriff auf die Ausgabe-API oder Tabelle wird pro
   registriertem Konsument gewährt, sodass ein nicht registrierter Konsument keine Berechtigung hat.
4. **Herkunft auf Ausgaben.** Ausgaben tragen das produzierende System und die Version, die
   beabsichtigte Nutzung und einen Vorbehalt als Metadaten, die ein Konsument lesen kann (für
   generative Inhalte die Kennzeichnung, die die KI-Verordnung von Anbietern verlangt).
5. **Zweckwidrige Nutzung als Signal.** Klassifizieren Sie Datenverkehr und Konsumentenanfragen
   gegen den negativen Raum und warnen Sie vor dem, was außerhalb davon fällt; achten Sie auf
   Ausgaben, die als Trainingsdaten zurückkehren (Rückkopplungsschleifen).
6. **Fan-out bei Änderung.** Eine Modelländerung, ein Incident oder ein Retirement liest das
   Register und benachrichtigt jeden Konsumenten über die
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).

Illustrativer Eintrag des Downstream Use Register:

```json
{
  "subject": "risk-score-02@4.1",
  "policy_card": "uses.risk-score-02.v3",
  "intended_uses": ["prioritise claims for manual review"],
  "prohibited_uses": ["automatic decline of a claim", "pricing", "use on commercial policies"],
  "consumers": [
    {
      "consumer": "claims-triage-service",
      "type": "system",
      "use": "queue ordering for human review",
      "approved_at": "2026-03-02",
      "retest": "eval:rs2-claims-triage-v3",
      "credential": "svc-claims-triage"
    },
    {
      "consumer": "reinsurance-partner-a",
      "type": "partner",
      "use": "aggregate statistics only, no row-level scores",
      "approved_at": "2026-05-11",
      "contract": "dpa-2026-017 schedule 3"
    }
  ],
  "output_stamp": ["producer", "version", "intended_use", "caveat"],
  "feedback_loop_check": "scores excluded from the training labels of risk-score-03",
  "reviewed_at": "2026-09-10"
}
```

> **Beispiel (illustrativ)** Ein Fraud-Team fordert zeilenweise Risikoscores an, um Ansprüche
> automatisch abzulehnen. Die Anfrage kommt als Konsumentenregistrierung an, trifft auf eine Regel
> für verbotene Nutzung auf der Karte und geht als neuer Zweck an den Ausschuss, wo sie abgelehnt
> wird; das Team erhält stattdessen einen Review-Priority-Feed. Wenn das Modell umgeschult wird,
> erhalten beide registrierten Konsumenten die Änderungsmitteilung und führen ihre Akzeptanztests
> erneut aus.

## Konsequenzen
Sekundäre Nutzung wird entschieden, nicht entdeckt, Konsumenten sind bekannt, wenn sich das Modell
ändert oder in den Ruhestand geht, und Rückkopplungsschleifen werden absichtlich überprüft. Die
Kosten sind das Register selbst, die Zugriffskontrolle pro Konsument auf Ausgaben, Neubewertung für
neue Kontexte und die Reibung, nützliche Wiederverwendung abzulehnen. Die Registrierung bindet
interne Konsumenten gut; externe hängen von Vertragsbedingungen und Audit-Rechten ab.

## Verwandte Muster
[Policy Card](/patterns/policy-card);
[Agent Registry](/patterns/agent-registry);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Zuordnung:** EU AI Act Art. 3(13), Art. 9(2)(b), Art. 25(1)(c), Art. 50(2) · ISO/IEC 42001 A.8.2,
A.9.4, A.10.4 · NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4 · OWASP LLM10:2026, OWASP Agentic ASI08 ·
Layer 02 Inventory & Transparency / Layer 01 Govern-as-Code.

Threat-IDs folgen dem OWASP Top 10 for LLM Applications 2026 [2] und dem OWASP Top 10 for Agentic
Applications 2026 [3], Control-IDs ISO/IEC 42001 Annex A [5] und Unterkategorie-IDs dem NIST AI RMF
[6]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] OWASP Top 10 for LLM Applications 2026 (LLM10 Improper Output Handling). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI08 Cascading Failures). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: forecast and reduce risks of secondary or unintended uses and downstream harms; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.4 intended use of the AI system; A.10.4 customers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1 intended purposes and prospective settings documented; MAP 3.3 targeted application scope specified; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
