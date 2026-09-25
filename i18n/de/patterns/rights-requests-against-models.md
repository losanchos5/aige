---
lang: de
source: bok/patterns/rights-requests-against-models.md
sourceHash: "c0fce81a2c4fab7c428580e9c3ace2207604d6cba85f6b01897785da414b2a7b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: rights-requests-against-models
title: Rights Requests Against Models
layer: 2
secondaryLayer: 5
order: 27
summary: "Leiten Sie jede Anfrage einer betroffenen Person an jeden Ort weiter, an dem die Daten der Person gespeichert sind, von Quellsystemen bis zu Modellgewichten, und schließen Sie sie mit einem Erfüllungsdatensatz ab."
---

# Muster: Rights Requests Against Models

**Zusammenfassung:** Leiten Sie jede Anfrage einer betroffenen Person (Zugang, Berichtigung,
Löschung, Widerspruch) an jeden Ort weiter, an dem die Daten der Person in einem KI-System
gespeichert sind: Quellsysteme, Trainings- und Fine-Tuning-Snapshots, Abrufindizes, Prompt- und
Ausgabelogs, Eval-Sets und, falls das Modell nicht anonym ist, die Gewichte. Jeder Ort hat eine
vorab vereinbarte Antwort auf einer Leiter von sofortiger Löschung bis zu geplanter Umschulung, und
die Anfrage schließt mit einem Erfüllungsdatensatz ab, der angibt, was wo getan wurde und wann die
verbleibende Lücke geschlossen wird.

## Ziele
Erfüllen Sie die Rechte betroffener Personen innerhalb der Frist über den gesamten KI-Datenspeicher
hinweg, nicht nur die Datenbank, und können Sie pro Anfrage nachweisen, welche Orte erreicht wurden,
was an jedem durchgeführt wurde und welche Modellversionen die Daten der Person bis zur nächsten
Umschulung noch enthalten.

## Zielbenutzer
Datenschutzbeauftragter, KI-Governance-Engineer, Dataplattform-Team, ML-Engineer.

## Betroffene Stakeholder
Betroffene Personen, Verantwortliche und Auftragsverarbeiter in der KI-Lieferkette,
Aufsichtsbehörden, Modellbesitzer.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; instrumentieren Sie den Build, um
seinen eigenen Nachweis zu erbringen; bauen Sie die Kontrolle an dem frühesten Punkt auf, an dem sie
blockieren kann.

## Kontext
Die DSGVO gibt Personen Rechte auf Zugang, Berichtigung, Löschung und Widerspruch, und der
Verantwortliche muss auf eine Anfrage innerhalb eines Monats reagieren, verlängerbar um zwei weitere
Monate für komplexe Anfragen [1]. In einem KI-System sitzt die Daten der Person nicht mehr in einer
Tabelle. Ob ein trainiertes Modell anonym ist, wird von Fall zu Fall bewertet: Die Stellungnahme des
EDPB zu KI-Modellen legt dar, wann ein auf personenbezogenen Daten trainiertes Modell als anonym
betrachtet werden kann und welche Nachweise der Verantwortliche benötigt, und ein Modell, das den
Test nicht besteht, fällt in den Geltungsbereich der Rechte [2]. Die Leitlinien der CNIL fügen
hinzu, dass ein Verantwortlicher, der eine Person in einem Trainingssatz nicht identifizieren kann,
dies angeben kann, dass die Person Informationen liefern kann, die eine Identifizierung ermöglichen,
dass Umschulung eine Anfrage beantwortet, wenn die Daten noch vorhanden sind, und dass Ausgabefilter
akzeptabel sind, wenn Umschulung unverhältnismäßig ist, sofern dies nachgewiesen wird [3]. Die
Hamburger Datenschutzbehörde geht anders vor und vertreten die Ansicht, dass die Speicherung eines
großen Sprachmodells keine Verarbeitung ist und dass Rechte an den Ein- und Ausgaben des Systems
angebracht sind [4]. Ein Betreiber muss unter einer dieser Auslegungen arbeiten.

## Problem
Anfrage-Tooling, das für Datenbanken entwickelt wurde, stoppt beim CRM. Der Datensatz derselben
Person sitzt auch in einem Fine-Tuning-Snapshot, einem Abrufindex, drei Monaten Prompt-Logs und
einem Eval-Set, und ein auf diesem Snapshot trainiertes Modell kann ihn reproduzieren. Ohne eine
Zuordnung von der Person zu diesen Orten schließt eine Löschung pünktlich und ist dennoch
unvollständig; ohne einen Datensatz pro Ort kann niemand sagen, warum Ausgabeunterdrückung gegenüber
Umschulung gewählt wurde oder wann die Umschulung, die die Lücke schließt, ausgeliefert wird.

### Kräfte
- **Vollständigkeit gegen Kosten.** Eine Zeile zu löschen ist billig; ein großes Modell für eine
  Anfrage umzuschulen, nicht, daher ist die Antwort auf die Gewichte normalerweise gestaffelt.
- **Frist gegen Batch.** Die Eins-Monats-Frist bevorzugt schnelle Teilmaßnahmen jetzt und
  vollständige auf einem Zeitplan.
- **Aufbewahrung gegen Löschung.** Hochrisiko-Betreiber bewahren automatisch generierte Logs
  mindestens sechs Monate lang auf, sofern anderes Recht nichts anderes vorsieht [5], während
  Speicherbegrenzung in die andere Richtung drückt.
- **Überprüfbarkeit.** Ungefähre Unlearning-Methoden sind schwer zu überprüfen, daher benötigt eine
  Behauptung, dass der Einfluss eines Datensatzes weg ist, einen Test, keine Aussage.

## Lösung
Behandeln Sie die Anfrage als Fan-Out-Job über eine Datenkarte, und das Modell als einen weiteren
Ort.

1. **Eine Datenkarte mit Subjekt als Schlüssel.** Bauen Sie die Karte aus der Herkunft auf, die Sie
   bereits führen: Data Cards, Dataset-Admission-Datensätze und die [AIBOM](/patterns/aibom) sagen,
   welche Snapshots welche Modellversion speisten, und das Register sagt, welche Indizes und Logs
   jedes System schreibt. Halten Sie einen pseudonymen Subjekt-Schlüssel, damit eine Anfrage
   abgeglichen werden kann, ohne Identitäten in die Karte zu kopieren.
2. **Eine Anfrage, viele Handler.** Der Router öffnet ein Ticket und verteilt es an einen Handler
   pro Ort, jeder mit einer vorab vereinbarten Antwort: aus Quellsystemen und Snapshots löschen;
   Abruf-Chunks sofort löschen oder neu indizieren; Logs innerhalb der Aufbewahrungsregel löschen
   oder pseudonymisieren; Eval-Datensätze durch synthetische ersetzen; jede Modellversion
   kennzeichnen, die auf einem betroffenen Snapshot trainiert wurde.
3. **Eine Leiter für die Gewichte.** Ausgabeunterdrückung zuerst, als Filter, der auf allgemeinen
   Regeln statt auf einer Namensliste aufgebaut ist, getestet wie jede Kontrolle. Dann Umschulung
   ohne die Daten, auf einem Zeitplan, der Anfragen stapelt. Machine Unlearning nur als Behauptung
   zum Testen: exakte Methoden wie Sharded Training begrenzen, was umgeschult werden muss [6], und
   ein Membership-Inference-Test auf den entfernten Datensätzen überprüft das Ergebnis [7].
4. **Gate die nächste Freigabe.** Das Release-Gate überprüft, dass ausstehende Löschungen auf den
   Trainingssatz der Kandidatenversion angewendet werden, damit eine Umschulung die Daten nicht
   stillschweigend erneut einführt.
5. **Ein Erfüllungsdatensatz pro Anfrage.** Der Workflow schreibt ihn, nicht der
   Datenschutzbeauftragte: jeder Ort, die durchgeführte Aktion, die betroffenen Modellversionen, die
   geplante Umschulung und ob die Frist eingehalten wurde.

Illustrativer Erfüllungsdatensatz für eine Löschanfrage gegen `csa-01`:

```json
{
  "request_id": "dsr-2026-0412",
  "right": "erasure",
  "subject_key": "hash:7c1e09b4",
  "received_at": "2026-09-02",
  "due_by": "2026-10-02",
  "locations": [
    { "store": "crm", "action": "deleted" },
    { "store": "rag_index:csa-kb@2026-09", "action": "deleted_and_reindexed" },
    { "store": "fine_tune_set:csa-ft-07", "action": "deleted" },
    { "store": "logs:csa-01", "action": "deleted" },
    { "store": "eval_set:csa-regression-v9", "action": "replaced_with_synthetic" },
    { "store": "weights:csa-01@2026-08-30", "action": "output_suppression", "rule": "dsr-0412" }
  ],
  "models_flagged": ["csa-01@2026-08-30"],
  "retrain_scheduled": "csa-01@2026-10-15",
  "closed_at": "2026-09-30",
  "within_deadline": true
}
```

> **Beispiel (illustrativ)** Ein Kunde bittet den Betreiber eines Support-Assistenten, seine Daten
> zu löschen. Der Router findet die Person im CRM, einem Abrufindex, einem Fine-Tuning-Snapshot und
> 90 Tagen Logs. Vier Handler löschen innerhalb eines Tages; die Gewichte erhalten einen
> Ausgabefilter, getestet gegen die eigenen Datensätze des Kunden, und die nächste geplante
> Umschulung verwirft den Snapshot. Der Erfüllungsdatensatz geht in die Kundendatei und in den
> Assurance-Store.

## Konsequenzen
Anfragen schließen pünktlich mit Nachweisen pro Ort ab, und die Lücke zwischen Unterdrückung und
Umschulung ist sichtbar und datiert statt verborgen. Die Kosten liegen in einer Herkunft, die gut
genug ist, um die Datenkarte zu bauen, Handler für jeden Store und Umschulungskapazität.
Unterdrückungsfilter lecken unter adversarialem Prompting, daher sind sie eine Übergangsmassnahme
mit Ablaufdatum, nicht die Antwort.

## Verwandte Muster
[AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Zuordnung:** DSGVO Art. 12(3), Art. 15–17, Art. 21 · EU AI Act Art. 26(6) · ISO/IEC 42001 A.7 ·
NIST AI RMF MEASURE 2.10, GOVERN 1.1 · OWASP LLM02:2026 · Layer 02 Inventory & Transparency / Layer
05 Assurance & Continuous Compliance.

Threat-IDs folgen dem OWASP Top 10 für LLM Applications 2026 [8], Control-IDs ISO/IEC 42001 Annex A
[9] und Subcategory-IDs dem NIST AI RMF [10]. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 12(3) one month, extendable by two further months; Arts. 15, 16, 17, 21). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity test at para 43; elements and documentation for the controller's evidence at paras 49–58). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[3] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[4] Discussion Paper: Large Language Models and Personal Data (storing an LLM is not processing; rights attach to system inputs and outputs). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[5] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(6) deployers keep automatically generated logs for at least six months, unless Union or national law provides otherwise). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[7] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[8] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[9] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.7 data for AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.1 legal and regulatory requirements understood, managed and documented; MEASURE 2.10 privacy risk examined and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
