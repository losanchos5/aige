---
lang: de
source: bok/patterns/decision-notice-contest-path.md
sourceHash: "0c90b68790ca1efb894ab8be4670c23c1957277b6e7b9e71472e60313bff602b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: decision-notice-contest-path
title: "Decision Notice & Contest Path"
layer: 4
secondaryLayer: 5
order: 26
summary: "Eine Mitteilung an der Stelle einer automatisierten Entscheidung, verknüpft mit ihrem Entscheidungsdatensatz, und ein Einspruchsweg zu einem Prüfer mit der Befugnis, das Ergebnis zu ändern."
---

# Muster: Decision Notice & Contest Path

**Zusammenfassung:** Wenn ein KI-System eine Entscheidung über eine Person trifft oder prägt, senden
Sie eine Mitteilung an der Stelle der Entscheidung, generiert aus dem Entscheidungsdatensatz, die
besagt, dass ein System beteiligt war, die Hauptgründe angibt und sagt, wie man Einspruch einlegt;
und führen Sie einen Einspruchsweg zu einem Prüfer mit der Autorität und den Informationen durch, um
das Ergebnis zu ändern. Die Mitteilung, der Einspruch und das Überprüfungsergebnis sind alle
Datensätze, daher wird das Recht auf Einspruch entscheidungsweise nachgewiesen, anstatt in einer
Richtlinie behauptet zu werden.

## Ziele
Machen Sie jede folgenreiche automatisierte Entscheidung für die betroffene Person erklärbar und
anfechtbar, und hinterlassen Sie einen Datensatz, der zeigt, dass die Mitteilung hinausgegangen ist,
dass der Einspruch gehört wurde und dass das Ergebnis bestanden oder sich aus einem angegebenen
Grund geändert hat.

## Zielbenutzer
KI-Governance-Engineer, Produktingenieur, Datenschutzbeauftragter, der Betreiber der Entscheidung
(Kredit, Ansprüche, Einstellung).

## Betroffene Stakeholder
Antragsteller, Kunden, Mitarbeiter und andere betroffene Personen; menschliche Prüfer; Aufsichts-
und Marktüberwachungsbehörden; Prüfer.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; instrumentieren Sie den Build, um seinen
eigenen Nachweis zu erbringen; geben Sie jeder Kontrolle Zähne.

## Kontext
Ein eingesetztes System trifft oder prägt eine Entscheidung über eine Person: Kredit, Versicherung,
einen Job, Zugang zu einem Service. Mehrere Regime hängen an diesem gleichen Moment Pflichten an.
Unter GDPR Artikel 22 ist eine rein automatisierte Entscheidung mit rechtlichen oder ähnlich
erheblichen Auswirkungen nur auf enger Grundlage zulässig, und dann mit mindestens dem Recht auf
menschliche Intervention, um einen Standpunkt zu äußern und die Entscheidung anzufechten; Artikel
13(2)(f) und 15(1)(h) fügen aussagekräftige Informationen über die Logik hinzu [1]. Der Gerichtshof
hat entschieden, dass ein Kreditwert selbst eine solche Entscheidung ist, wenn Kreditgeber ihm eine
bestimmende Rolle geben [2]. Im Vereinigten Königreich erfordern Artikel 22A bis 22D, die seit 5.
Februar 2026 in Kraft sind, Informationen über die Entscheidung, die Möglichkeit, Stellungnahmen
abzugeben, menschliche Intervention und eine Möglichkeit, Einspruch einzulegen [3].

Unter der EU KI-Verordnung müssen Betreiber von Annex-III-Hochrisiko-Systemen, die Entscheidungen
über Menschen treffen oder unterstützen, ihnen mitteilen, dass das System verwendet wird
(`Art. 26(11)`), und eine betroffene Person kann eine klare und aussagekräftige Erklärung der Rolle
des Systems und der Hauptelemente der Entscheidung erhalten (`Art. 86`), ein Recht, das nur gilt,
wenn das Unionsrecht es nicht bereits vorsieht [4]. Ab 2026-09-24 gelten die Annex-III-Anforderungen
ab 2. Dezember 2027 [5]. `Art. 86` selbst gilt seit 2. August 2026 (`Art. 113`) [4], aber es hängt
an Entscheidungen, die auf Annex-III-Hochrisiko-Systemen basieren, daher hat es nach Lesart dieser
Website nur ab 2. Dezember 2027 Arbeit zu tun. Ein US-Kreditgeber, der eine nachteilige Maßnahme
ergreift, muss den Antragsteller innerhalb von 30 Tagen nach Abschluss eines Antrags
benachrichtigen, mit den spezifischen Hauptgründen [6]. Das CFPB sagte 2022, dass ein komplexer
Algorithmus keine vagen Gründe entschuldigt [7], zog diese Rundschreiben jedoch am 12. Mai 2025
zurück; die Regulation-B-Pflicht selbst ist unverändert [6][12]. Colorado fügt ab 1. Januar 2027
eine Nutzungsmitteilung, eine verständliche Erklärung eines nachteiligen Ergebnisses und menschliche
Überprüfung für automatisierte Entscheidungen in folgenreichen Bereichen hinzu [8].

## Problem
Jedes Regime wird tendenziell auf seine eigene Weise beantwortet: eine Briefvorlage im Besitz von
Betrieb, ein Appeal-Postfach im Besitz des Kundenservice, eine Erklärungsseite im Besitz von Legal.
Keines davon ist an den Entscheidungsdatensatz gebunden, daher kann niemand zeigen, welche
Mitteilung eine bestimmte Person erhalten hat, welche Gründe sie angab, ob diese Gründe die Faktoren
waren, die das Modell tatsächlich verwendet hat, oder was der Prüfer mit dem Einspruch getan hat.
Ein Einspruchsweg, der bei einem Prüfer endet, der fast jede Ausgabe in Sekunden bestätigt, ist
keine aussagekräftige menschliche Beteiligung; es ist eine Warteschlange.

### Kräfte
- **Treue gegen Lesbarkeit.** Die Gründe müssen die Faktoren sein, die das Modell tatsächlich
  verwendet hat, aber kurz und einfach genug, damit eine Person handeln kann.
- **Uhren gegen Kapazität.** Mitteilungen laufen nach Fristen (30 Tage unter Regulation B), und eine
  echte Überprüfung kostet Personalzeit, die mit der Einspruchsquote skaliert.
- **Offenlegung gegen Schutz.** Aussagekräftige Informationen über die Logik müssen mit
  Geschäftsgeheimnissen und damit koexistieren, dass Menschen nicht gelehrt werden, das Modell zu
  spielen; der Gerichtshof überlässt diese Balance der Behörde oder dem Gericht, nicht dem
  Verantwortlichen allein [9].
- **Eine Entscheidung, viele Regime.** Die gleiche Ablehnung kann gleichzeitig unter die DSGVO, die
  KI-Verordnung, ein Sektorgesetz und ein US-Staatsgesetz fallen, jeweils mit seinem eigenen Inhalt,
  seiner Zielgruppe und seiner Uhr.

## Lösung
Bauen Sie die Mitteilung und den Einspruch als zwei Services um einen Entscheidungsdatensatz.

1. **Entscheidungsdatensatz zuerst.** Zur Laufzeit schreiben Sie einen Datensatz pro Entscheidung:
   System und Modellversion, Eingaben nach Referenz, Ergebnis, Grundcodes, ob die Entscheidung rein
   automatisiert war, die rechtliche Grundlage und die Regime, die gelten. Die Überprüfungsseite
   folgt dem [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
2. **Mitteilung aus versionierten Vorlagen.** Ein Mitteilungsservice liest den Datensatz und rendert
   die Mitteilung aus einer Vorlage pro Regime und Sprache: dass ein System verwendet wurde, die
   Hauptgründe, was die Person tun kann und bis wann. Die Vorlagenversion und die Sendezeit werden
   zurück in den Datensatz geschrieben. Eine Grund-Code-Treue-Eval, die als
   [Eval Gate in CI](/patterns/eval-gate-in-ci) ausgeführt wird, überprüft, dass die Gründe, die
   eine Mitteilung angibt, die Faktoren sind, die das Modell verwendet hat.
3. **Ein Einspruchsweg mit Autorität.** Ein Einspruch öffnet einen Fall, der mit der
   Entscheidungs-ID verknüpft ist und an einen Prüfer weitergeleitet wird, der die ursprüngliche
   Entscheidung nicht getroffen hat, der die Eingaben, die Gründe und die Darstellungen der Person
   sieht und das Ergebnis ändern kann. Zeit zum Entscheiden und Umkehrungsquoten werden nach Gruppe
   überwacht: ein Prüfer, der fast alles bestätigt, ist ein Signal, keine Schutzmaßnahme.
4. **Schließen Sie die Schleife.** Das Überprüfungsergebnis, sein Grund und jede Korrektur werden in
   den Datensatz geschrieben. Einspruchs- und Umkehrungsquoten speisen den
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor), und ein Cluster von aufgehobenen
   Entscheidungen auf einem Grundcode öffnet ein Issue gegen das Modell.

Illustrativer Entscheidungsmitteilungsdatensatz, geschrieben vom Mitteilungsservice und
abgeschlossen durch den Einspruchsweg:

```json
{
  "decision_id": "cc4-2026-09-18-0192",
  "subject": "credit-check-04@3.2",
  "solely_automated": true,
  "regimes": ["GDPR Art. 22", "Regulation B 1002.9"],
  "outcome": "declined",
  "reason_codes": ["R07 payment arrears", "R12 short credit history"],
  "notice": {
    "template": "adverse-action.en.v5",
    "sent_at": "2026-09-18T10:02:11Z",
    "due_by": "2026-10-18"
  },
  "contest": {
    "opened_at": "2026-09-20T08:14:00Z",
    "reviewer_role": "credit-review-l2",
    "outcome": "overturned",
    "reason": "Arrears cleared; the applicant supplied the settlement statement.",
    "closed_at": "2026-09-23T15:40:00Z"
  }
}
```

> **Beispiel (illustrativ)** Eine Telefongesellschaft lehnt einen Antragsteller bei einer
> Geräte-Finanzierungsprüfung ab. Der Benachrichtigungsdienst sendet die Ablehnung mit zwei
> Fehlercodes und einem Einspruchslink innerhalb einer Stunde. Der Antragsteller legt Einspruch mit
> einer Abwicklungserklärung ein, ein Reviewer der zweiten Ebene hebt die Ablehnung auf, und die
> Aufhebungsquote für Fehlercode R07 wird in die nächste Schwellenwertprüfung des Modells
> aufgenommen.

## Konsequenzen
Die Benachrichtigung und der Einspruch jeder Person können auf Anfrage erstellt werden, und der
Einspruchskanal wird zu einem Sensor für Modellfehler und Unfairness. Die Kosten sind ein
Benachrichtigungsdienst mit Pro-Regime-Vorlagen, die aktuell gehalten werden müssen,
Reviewer-Kapazität mit echter Autorität und eine Eval zur Genauigkeit der Fehlercodes. Treue, aber
unhilfreich begründete Ablehnungen führen dennoch zum Scheitern der Person, daher testen Sie die
Benachrichtigungen mit den Personen, die sie erhalten.

## Verwandte Muster
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Rights Requests Against Models](/patterns/rights-requests-against-models).

**Zuordnung:** EU AI Act Art. 26(11), Art. 86 · DSGVO Art. 13(2)(f), Art. 15(1)(h), Art. 22 · UK
DSGVO Arts. 22A–22D · ECOA / Regulation B 12 CFR 1002.9 · ISO/IEC 42001 A.8.2, A.9.2 · NIST AI RMF
MEASURE 3.3, MANAGE 4.1, MAP 3.5 · Layer 04 Runtime Controls & Observability / Layer 05 Assurance &
Continuous Compliance.

Kontroll-IDs folgen ISO/IEC 42001 Annex A [10] und Unterkategorie-IDs dem NIST AI RMF [11].
Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[3] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(11) informing persons subject to Annex III decisions; Art. 86(1) and (3) right to explanation, subsidiary to other Union law; Art. 113, general application from 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Annex III high-risk requirements from 2 Dec 2027); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[6] 12 CFR 1002.9 (Regulation B, notifications: 1002.9(a)(1) action taken notified within 30 days of a completed application; 1002.9(b)(2) specific principal reasons). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[7] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[8] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; deployer notice, 30-day explanation, human review, three-year records). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[9] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[10] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.2 processes for responsible use of AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[11] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 3.5 human oversight processes; MEASURE 3.3 feedback and appeal processes for end users and impacted communities; MANAGE 4.1 post-deployment monitoring plans, including appeal and override). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[12] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
