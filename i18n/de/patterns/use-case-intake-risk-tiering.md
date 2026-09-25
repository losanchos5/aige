---
lang: de
source: bok/patterns/use-case-intake-risk-tiering.md
sourceHash: "350f07d369530791c00bd8f00f0e4131487f6317a6073ddfc68d8c3c121dac53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: use-case-intake-risk-tiering
title: "Use-Case Intake & Risk Tiering"
layer: 1
secondaryLayer: 2
order: 18
summary: "Ein Aufnahmepfad für jeden KI-Anwendungsfall: ein strukturierter Anwendungsfallsatz, eine aus seinem Risikoprofil berechnete Stufe und die Gates, die diese Stufe aktiviert."
---

# Muster: Use-Case Intake & Risk Tiering

**Zusammenfassung:** Leiten Sie jeden vorgeschlagenen KI-Anwendungsfall, ob gebaut oder gekauft,
durch eine Aufnahme, die einen strukturierten Anwendungsfallsatz schreibt, ihn gegen verbotene
Praktiken und die KI-Verordnung-Risikoleiter prüft und eine interne Risikostufe aus deklarierten
Profilfeldern berechnet. Die Stufe, nicht ein Treffen, entscheidet, welche Bewertungen, Evals und
Genehmigungen das System vor dem Versand durchlaufen muss, und der Datensatz wird zum
Registry-Eintrag, den jedes spätere Gate liest.

## Ziele
Machen Sie die erste Entscheidung über ein KI-System zu einer aufgezeichneten, reproduzierbaren:
wofür es ist, wofür es nicht verwendet werden darf, wie riskant es ist und daraus, wie viel
Governance es erhält. Geben Sie Review-Aufwand dort aus, wo das Risiko ist, und lassen Sie
risikoarme Anwendungsfälle schnell auf einem gepflasterten Pfad durch.

## Zielbenutzer
KI-Governance-Engineer, Product Owner, Platform-Team, Legal und Privacy Reviewer.

## Betroffene Stakeholder
Von den Ausgaben des Systems betroffene Personen, Betreiber und Operatoren, der
KI-Governance-Ausschuss, Prüfer, Marktüberwachungsbehörden.

## Relevante Prinzipien
Bauen Sie die Kontrolle am frühesten Punkt auf, an dem sie blockieren kann; machen Sie den
kontrollierten Pfad zum einfachsten Pfad; registrieren und begrenzen Sie jeden Akteur, bevor er
handelt.

## Kontext
Eine Organisation, in der viele Teams KI-Funktionen vorschlagen, und die meisten von ihnen kaufen
oder rufen Modelle auf, anstatt sie zu trainieren. Anfragen kommen per E-Mail, in Slide Decks und in
Beschaffungstickets an, und jede wird mit den Fragen überprüft, die der Reviewer sich merkt. Die
KI-Verordnung misst die meisten Pflichten gegen die **Zweckbestimmung**, die sie als den Kontext und
die Bedingungen der Verwendung definiert, die in der Betriebsanleitung, in "Werbe- oder
Verkaufsmaterialien und Aussagen" und in der technischen Dokumentation angegeben sind (`Art. 3(12)`)
[1]. Das NIST AI RMF verlangt, dass Zweckbestimmungen und Einstellungen "verstanden und
dokumentiert" sind (MAP 1.1) und dass Risikotoleranzen "bestimmt und dokumentiert" sind (MAP 1.5)
[2].

## Problem
Ohne eine Aufnahme beginnt die Governance zu spät und skaliert schlecht.

- **Kräfte.** Reviewer wollen jeden Anwendungsfall gründlich bewertet; Teams wollen eine Antwort in
  Tagen. Die Klassifizierung hängt von Fakten ab, die nur das Team kennt: der Zweck, die betroffenen
  Personen, ob das System Menschen profiliert. Eine in einem Treffen ausgehandelte Stufe driftet mit
  wer auch immer anwesend ist. Eine Stufe, die nicht maschinenlesbar ist, kann ein Gate nicht
  aktivieren.
- **Fehlermodus.** Ein hochriskanter Anwendungsfall schlüpft als "nur ein Pilot" durch, während
  risikoarme Anfragen dahinter anstehen. Niemand kann zeigen, welche Systeme klassifiziert wurden,
  von wem, auf welchen Fakten oder warum ein Annex-III-System nicht als hochriskant behandelt wurde.

## Lösung
Bauen Sie die Aufnahme als einen Form-plus-Code-Pfad auf, der in einem Datensatz und einer Stufe
endet, nicht in Minuten.

1. **Erfassen Sie den Anwendungsfallsatz.** Ein kurzes strukturiertes Formular (Zweckbestimmung,
   nicht im Umfang enthaltene Verwendungen, Benutzer und betroffene Personen, Entscheidungsbefugnis,
   Erfolgskennzahlen, Fehlertoleranz, Datenquellen, Jurisdiktionen) schreibt einen Registry-Stub mit
   einem ID. Verwenden Sie das veröffentlichte
   [use-case record schema](/resources/templates#schema-use-case-record) (`use-case-record.v1`)
   erneut, damit das Formular, die Registry und die Gates eine Form teilen.
2. **Prüfen Sie, bevor Sie bewerten.** Führen Sie zuerst die Prüfung verbotener Praktiken aus
   (`Art. 5`): ein Treffer wird bei der Aufnahme blockiert und nie bewertet. Dann platzieren Sie das
   System auf der Leiter der Verordnung: eine Annex-III-Verwendung, mit dem `Art. 6(3)`-Filter und
   seiner Außerkraftsetzung (ein Annex-III-System, das natürliche Personen profiliert, ist immer
   hochriskant), Transparenzverpflichtungen oder ein KI-Modell mit allgemeinem Verwendungszweck. Ein
   Anbieter, der sich auf den Filter verlässt, muss seine Bewertung vor dem Inverkehrbringen des
   Systems dokumentieren und registrieren (`Art. 6(4)`, `Art. 49(2)`) [1]; der Aufnahmesatz ist
   diese Dokumentation. Das Digital-Omnibus verschob die Annex-III-Hochrisiko-Verpflichtungen auf
   den 2. Dezember 2027 [3]: das ändert, wann die Pflichten greifen, nicht ob die Klassifizierung
   jetzt aufgezeichnet wird.
3. **Berechnen Sie die interne Stufe.** Deklarieren Sie Profilfelder (Autonomie,
   Entscheidungsauswirkung, Exposition, Umkehrbarkeit des schlimmsten Ergebnisses, vulnerable
   Gruppen, Datenklasse, Abhängigkeit von Dritten) und lassen Sie eine versionierte Richtlinie die
   Stufe berechnen. Das AI RMF setzt die Höhe der Risikomanagement-Aktivität nach Risikotoleranz
   fest (GOVERN 1.3) und verlangt die Wahrscheinlichkeit und Größe jeder identifizierten Auswirkung
   (MAP 5.1) [2]. Kanadas Richtlinie zur automatisierten Entscheidungsfindung wendet die gleiche
   Idee in der öffentlichen Verwaltung an, mit vier Auswirkungsstufen, die teilweise durch
   Umkehrbarkeit und Dauer definiert sind [4]. Ein Team, das mit seiner Stufe nicht einverstanden
   ist, ändert einen Faktor mit Belegen in einer überprüften Änderung; die Stufe folgt.
4. **Binden Sie die Stufe an Gates.** Die Stufe wählt die erforderlichen Bewertungen (DSFA, FRIA,
   Vendor Due Diligence), die Eval-Kategorien und Schwellenwerte, die Genehmiger und die
   Review-Kadenz aus, damit die Pipeline liest, was sie durchsetzen muss. Die Bereitstellung weigert
   sich, ein System ohne einen Aufnahmesatz zu akzeptieren ("kein Stub, keine Bereitstellung"), was
   die Inventur durch Konstruktion vollständig hält (GOVERN 1.6) [2].
5. **Erneut öffnen bei Änderung.** Ein neuer Zweck, eine neue Population, Jurisdiktion oder
   Datenquelle oder ein Verbraucher, der eine Verwendung auf der Liste der nicht im Umfang
   enthaltenen Verwendungen deklariert, führt die Aufnahme erneut aus und kann die Stufe
   verschieben.

Illustrativer Anwendungsfallsatz bei Aufnahme, gültig gegen `use-case-record.v1` (die Profilfelder
und der Filteranspruch reisen in `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/use-case-record.v1.json",
  "record_id": "uc-2026-042",
  "title": "Payslip field extraction for mortgage applications",
  "business_owner": "head-of-mortgage-operations",
  "intended_purpose": "Extract income fields from uploaded payslips into the application form for an underwriter to confirm; the affordability assessment is made elsewhere.",
  "out_of_scope_uses": ["affordability scoring", "automatic decline", "employment verification"],
  "users": ["mortgage underwriters"],
  "affected_persons": ["mortgage applicants"],
  "decision_authority": "human_decides",
  "ai_justification": {
    "alternatives_considered": ["manual keying", "template-based OCR"],
    "why_ai": "Payslip layouts vary too much for templates; every extracted field is confirmed by an underwriter."
  },
  "success_metrics": [
    { "metric": "field-level exact match on a frozen sample", "target": ">= 0.98", "direction": "higher_is_better" }
  ],
  "error_appetite": "A wrong income figure can distort an affordability decision; low-confidence fields are routed to manual keying.",
  "data_sources": [{ "name": "applicant payslips", "personal_data": true, "special_category": false }],
  "jurisdictions": ["ES", "PT"],
  "preliminary_classification": {
    "eu_ai_act_category": "minimal",
    "internal_tier": "medium",
    "rationale": "Preparatory task to an Annex III 5(b) assessment (Art. 6(3) filter claimed, no profiling); assessment documented and registered under Art. 6(4) and Art. 49(2)."
  },
  "assessments_required": ["dpia"],
  "decision": {
    "outcome": "approved_with_conditions",
    "conditions": ["Art. 49(2) registration before go-live", "monthly 2% sample checked against source payslips"],
    "decided_by": "ai-governance-review",
    "decided_at": "2026-09-22"
  },
  "register_entry": "mortgage-extract-01",
  "extensions": {
    "risk_profile": { "autonomy": "suggests", "decision_impact": "informs", "exposure": "customers",
                      "reversibility": "reversible", "vulnerable_groups": [], "data_class": "personal",
                      "third_party": ["ocr-vendor-02"] },
    "tier_rule": "tiering-policy.v3",
    "annex_iii_point": "5(b)",
    "art_6_3_condition": "preparatory_task",
    "profiling": false
  }
}
```

> **Beispiel (illustrativ)** Das Aufnahmeformular einer Bank ist kurz genug, um in einer Sitzung
> fertig zu werden. Die Prüfung verbotener Praktiken und die Annex-III-Fragen laufen zuerst; die
> Tier-Regel liest dann das Profil. Ein Gehaltszettels-Extraktions-Tool landet in der mittleren
> Stufe mit seinem {`Art. 6(3)`}-Filteranspruch im Datensatz, daher erhält es einen DSFA-Link, eine
> Extraktionsgenauigkeits-Eval und eine monatliche Stichprobenprüfung, keinen Ausschussplatz. Eine
> zweite Anfrage, um Antragsteller nach vorhergesagtem Ausfall zu ordnen, löst die
> Profiling-Außerkraftsetzung bei der ersten Frage aus und wird als hochriskant weitergeleitet,
> bevor jemand ein Treffen bucht.

## Konsequenzen
Jedes System hat einen Zweck, eine Klasse und eine Stufe im Datensatz, bevor es Compute kostet;
Review-Aufwand folgt dem Risiko; die Inventur ist vollständig, weil die Bereitstellung davon
abhängt; und jede Klassifizierung ist bis zu den Fakten, auf denen sie ruhte, nachvollziehbar. Die
Kosten: das Formular muss kurz bleiben oder Teams leiten darum herum; die Tier-Regel braucht
Kalibrierung und einen Berufungsweg; und selbst erklärte Fakten können falsch sein, daher braucht
die Aufnahme Stichprobenprüfungen gegen Discovery und Beschaffung.

## Verwandte Muster
[Agent Registry](/patterns/agent-registry); [Policy Card](/patterns/policy-card);
[FRIA-as-Code](/patterns/fria-as-code);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery); [AI Threat Model](/patterns/ai-threat-model);
[Dataset Admission Gate](/patterns/dataset-admission-gate).

**Zuordnung:** KI-Verordnung Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Annex III · ISO/IEC
42001 A.5.2, A.9.4 · NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1) · Layer 01 Governance-as-Code
/ Layer 02 Inventory & Transparency.

Funktions- und Unterkategorielabels folgen dem NIST AI RMF [2]; ISO/IEC 42001 Annex A IDs folgen
einem veröffentlichten Crosswalk, nicht dem Text des Standards [5]. Zuordnungen sind illustrativ,
keine Konformitätsbehauptung.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose (incl. "promotional or sales materials and statements"); Art. 5 prohibited practices; Art. 6(3) filter and profiling override, Art. 6(4) documented assessment before placing on the market; Art. 49(2) registration of systems concluded not high-risk under Art. 6(3); Annex III (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.3 level of risk-management activity by risk tolerance; GOVERN 1.6 inventory of AI systems; MAP 1.1 intended purposes and settings "understood and documented"; MAP 1.5 risk tolerances "determined and documented"; MAP 5.1 likelihood and magnitude of each identified impact). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Directive on Automated Decision-Making (algorithmic impact assessment before production; Appendix B impact levels I to IV defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[5] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.2 AI system impact assessment process, B.9.4 intended use of the AI system; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
