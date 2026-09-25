---
lang: de
source: bok/patterns/deactivation-localisation-retirement-runbook.md
sourceHash: "b3bd2689b5ce44e9a23c2fb7e6824d011975d7e17d8518ec6dc57e8ddd53488c"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: deactivation-localisation-retirement-runbook
title: "Deactivation, Localisation & Retirement Runbook"
layer: 4
secondaryLayer: 2
order: 33
summary: "Ein durchgearbeitetes Runbook zum Herabstufen, Abschalten nach Gerichtsbarkeit oder Außerbetriebnahme eines KI-Systems, mit benannten Auslösern, einer Entscheidungsbefugnis und Nachweisen bei jedem Schritt."
---

# Muster: Deactivation, Localisation & Retirement Runbook

**Zusammenfassung:** Dokumentieren Sie im Voraus, wie ein KI-System herabgestuft, abgeschaltet, auf
die Gerichtsbarkeiten beschränkt wird, in denen es laufen darf, und schließlich außer Betrieb
genommen wird: die Schwellenwerte und rechtlichen Auslöser, die Rolle, die entscheidet, die zuerst
gesicherten Nachweise, die abgestuften Modi ohne vollständige Abschaltung, die Schalter pro
Gerichtsbarkeit und die Außerbetriebnahmeschritte von der Abhängigkeitsanalyse bis zum Eintrag im
Außerbetriebnahmeregister. Bauen Sie die Schalter als getestete Toggles, üben Sie sie nach einem
Kalender, und dokumentieren Sie jede Entscheidung und jeden Schritt als Nachweis.

## Ziele
Machen Sie das Stoppen, Einschränken und Außerbetriebnahmen eines KI-Systems zu einem ausführbaren,
getesteten Verfahren mit einem benannten Entscheidungsverantwortlichen, sodass ein regulatorischer
oder Leistungsauslöser zu einer begrenzten Aktion innerhalb von Stunden führt, und eine
Außerbetriebnahme hinterlässt keine laufende Kopie, keine aktive Berechtigung und keinen verlorenen
Nachweis.

## Zielbenutzer
KI-Governance-Engineer, Systemeigentümer, SRE, Security Engineer, Legal.

## Betroffene Stakeholder
Nutzer und betroffene Personen, Arbeitnehmer, die vom System abhängen, nachgelagerte Verbraucher,
Anbieter und Betreiber in der Lieferkette, Marktüberwachungsbehörden.

## Relevante Prinzipien
Geben Sie jedem Kontrollelement Durchsetzungskraft; registrieren und begrenzen Sie jeden Akteur,
bevor er handelt; instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen.

## Kontext
Einige Auslöser zum Stoppen eines Systems sind rechtlich, nicht technisch. Nach der KI-Verordnung
der EU muss ein Hochrisiko-Betreiber, der Grund zu der Annahme hat, dass das System ein Risiko
darstellt, den Anbieter und die Behörde informieren und die Nutzung aussetzen (`Art. 26(5)`); ein
Anbieter muss Korrekturmaßnahmen ergreifen, einschließlich Rückzug, Deaktivierung oder Rückruf eines
nicht konformen Systems (`Art. 20`); eine Behörde kann dasselbe für ein System verlangen, das ein
Risiko darstellt (`Art. 79`); und eine Praktik kann verboten werden (`Art. 5`) [1]. Das NIST AI RMF
fordert Mechanismen mit zugewiesenen Verantwortlichkeiten, um Systeme, deren Leistung oder
Ergebnisse nicht mit der vorgesehenen Verwendung übereinstimmen, zu ersetzen, zu deaktivieren oder
außer Betrieb zu nehmen, sowie Prozesse zur sicheren Außerbetriebnahme von Systemen, die das Risiko
nicht erhöhen [2]. Aufzeichnungen überdauern das System: Anbieter bewahren Dokumentation zehn Jahre
lang auf und Betreiber führen Protokolle mindestens sechs Monate lang [1]. Die Erstellung einer
Richtlinie und von Kontrollen zur Deaktivierung oder Lokalisierung eines Systems, wenn Regulierung
oder Leistung dies erfordern, ist Teil der Governance von Bereitstellung und Nutzung im IAPP AIGP
Body of Knowledge (Kompetenz IV.C) [3]. Für Agenten ist der
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) die unmittelbare Form dieses
Runbooks.

## Problem
Die meisten Systeme haben einen Schalter und eine Hoffnung. Wenn ein Trigger auslöst, weiß niemand,
wer entscheiden darf, Protokolle werden während des Meetings überschrieben, und die einzige
verfügbare Maßnahme ist, alles überall auszuschalten, was oft schlimmer ist als der Fehler. Ein in
ein Herstellerprodukt eingebetteter Klassifizierer hat überhaupt keinen Schalter. Bei der
Stilllegung wird ein Eintrag aus dem Bestand gelöscht, während eine Kopie weiterhin läuft, ein
Dienstkonto bleibt aktiv und der Nachweis, dass das System jemals gesteuert wurde, geht damit
verloren.

### Kräfte
- **Geschwindigkeit gegen Überlegung.** Ein rechtlicher Trigger erfordert schnelles Handeln; ein
  Herunterfahren mit Abhängigen braucht einen vorbereiteten Fallback.
- **Präzision gegen Einfachheit.** Das Ausschalten einer Region, Sprache oder Gruppe begrenzt
  Schaden und fügt Schalter hinzu, die gebaut und getestet werden müssen.
- **Bewahrung gegen Entsorgung.** Nachweise müssen eingefroren werden, bevor etwas gestoppt wird,
  während der Datenschutz zum Löschen von nicht mehr benötigten Daten drängt.
- **In Herstellerprodukte eingebettete Systeme.** Wenn sich das Modell in einem Lieferantenprodukt
  befindet, hängt der Schalter vom Vertrag ab.

## Lösung
Halten Sie ein Runbook pro System, gespeichert mit seinem Registereintrag und auf dem
Wartungskalender durchgeführt.

1. **Trigger und Autorität.** Listen Sie Schwellenwert-Trigger auf (eine überschrittene Grenze, die
   sich nicht in einem Fenster erholt, eine Fairness-Lücke über ihrem Limit, eine Incident-Schwere)
   und rechtliche Trigger (die `Art. 26(5)`-Pflicht, eine Korrekturmaßnahme des Anbieters, eine
   Maßnahme einer Behörde, eine neu verbotene Praxis), jeweils mit der Rolle, die entscheidet, und
   der zulässigen Zeit. Verstöße kommen vom
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor).
2. **Zuerst bewahren.** Der erste Schritt jedes Pfads friert die Protokolle ein, wendet eine
   rechtliche Sperre an und erstellt einen Snapshot der angehefteten Versionen, damit der Nachweis
   den Stopp überlebt.
3. **Abgestufte Modi.** Bauen Sie die Zwischenmodi als operative Schalter und testen Sie sie: nur
   Ratschlag, erhöhte Konfidenzsschwellen mit Enthaltung zu einer Person, nur begründete Antworten,
   für eine Gruppe, Sprache, Region oder Funktion ausgeschlossen, zurück zur Pilot-Kohorte und aus
   mit dem Fallback-Prozess.
4. **Lokalisierung nach Gerichtsbarkeit.** Halten Sie die Gerichtsbarkeit als Richtlinieneingabe:
   pro-Gerichtsbarkeit-Regelsätze als Code, regionale Instanzen, wo Residenzanforderungen dies
   erfordern, und Flaggen nach Region, damit ein Markt ausgeschaltet werden kann, ohne die anderen
   zu berühren. Starten Sie in einer Gerichtsbarkeit nur, wenn gezeigt wird, dass ihre Pflichten
   erfüllt sind.
5. **Stilllegung als Runbook.** Analysieren Sie Abhängigkeiten (das
   [Downstream Use Register](/patterns/downstream-use-register) listet Verbraucher auf), verschieben
   Sie Benutzer zum Fallback, senden Sie Sunset-Mitteilungen durch die
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline), archivieren Sie
   den endgültigen Nachweis-Snapshot, behalten Sie Gewichte, Korpora und Protokolle oder entsorgen
   Sie sie, wie Lizenz, rechtliche Grundlage und Aufbewahrung entscheiden, widerrufen Sie jede
   Identität und Anmeldedaten, setzen Sie den Registereintrag auf `retired`, und lassen Sie
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) bestätigen, dass keine Kopie noch läuft. Der
   Datensatz verwendet das
   [Decommissioning-Runbook-Schema](/resources/templates#schema-decommissioning-runbook).
6. **Üben Sie es.** Führen Sie mindestens jährlich pro System eine Deaktivierungsübung durch: Zeit
   zum Entscheiden, Zeit zum degradierten Modus, Zeit zum Ausschalten und ob der Nachweis bewahrt
   wurde.

Illustrativer Stilllegungsdatensatz als Decommissioning-Runbook:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json",
  "runbook_id": "rb-retire-csa-01",
  "subject": "csa-01@2026-09-18",
  "reason": "replaced",
  "replaced_by": "csa-02",
  "decision_ref": "ddr-csa-02-v1",
  "dependencies": ["contact-centre routing", "weekly quality report"],
  "notifications": [
    { "party": "users", "method": "Release note to contact-centre agents", "sent_at": "2027-03-01" },
    { "party": "deployers", "method": "Change notice to the PT business unit", "sent_at": "2027-03-01" }
  ],
  "steps": [
    { "step_id": "S1", "action": "archive_evidence", "detail": "Freeze logs and snapshot pinned versions.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-29T08:00:00Z" },
    { "step_id": "S2", "action": "disable_traffic", "detail": "Flag csa01.serve off in every region.", "owner": "ml-platform", "status": "done", "completed_at": "2027-03-31T06:00:00Z" },
    { "step_id": "S3", "action": "revoke_identity", "detail": "Revoke the workload identity and API keys.", "owner": "platform-identity", "status": "done", "completed_at": "2027-03-31T07:00:00Z" },
    { "step_id": "S4", "action": "retire_register_entry", "detail": "Set status to retired; keep the entry.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-31T09:00:00Z" },
    { "step_id": "S5", "action": "other", "detail": "Discovery sweep confirms no copy still serves.", "owner": "security-operations", "status": "pending" }
  ],
  "data_disposition": [
    { "dataset": "chat logs", "action": "retain", "basis": "log retention rule and open complaints", "until": "2027-09-30" },
    { "dataset": "retrieval index csa-kb", "action": "delete" }
  ],
  "evidence_archive": { "location": "https://archive.example.org/ai/csa-01", "retain_until": "2033-03-31" },
  "status": "in_progress"
}
```

> **Beispiel (illustrativ)** Eine neu anwendbare nationale Regel schränkt automatisierte Antworten
> zu Gesundheitsthemen in einem Markt ein. Das Runbook benennt den Leiter der Geschäftseinheit als
> Entscheidungsträger; innerhalb eines Tages werden die Nachweise eingefroren, die regionale Flagge
> schaltet den Assistenten dort auf nur begründete Antworten mit Gesundheitsthemen aus, andere
> Märkte sind unberührt, und die Entscheidung, die Schalter und die Mitteilungen sind im
> Assurance-Store.

## Konsequenzen
Das Stoppen wird verhältnismäßig und schnell, Lokalisierung ist ein Schalter statt ein Redeploy, und
die Stilllegung hinterlässt einen vollständigen, aufbewahrten Datensatz statt einer Lücke. Die
Kosten sind das Bauen und Testen der Modi und Flaggen, pro-Gerichtsbarkeit-Regelsätze, die aktuell
bleiben, Vertragsbedingungen, die einen Schalter über in Herstellerprodukte eingebettete KI geben,
und Übungszeit. Ein nicht getesteter Modus ist keine Kontrolle: die Übung ist das, was ihn zu einer
macht.

## Verwandte Muster
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Downstream Use Register](/patterns/downstream-use-register);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).

**Zuordnung:** EU KI-Verordnung Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79 · ISO/IEC
42001 A.6.2.5, A.6.2.6 · NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1 · OWASP Agentic ASI10 ·
Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [4], Control-IDs ISO/IEC 42001
Annex A [5] und Subkategorie-IDs dem NIST AI RMF [2]. Zuordnungen sind illustrativ, keine
Konformitätsaussage.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 5 prohibited practices; Art. 18(1) documentation kept ten years; Art. 20 corrective actions; Art. 26(5) suspend and inform; Art. 26(6) logs kept at least six months; Art. 79 systems presenting a risk). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.7 decommissioning and phasing out safely; MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring plans, including decommissioning). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[3] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: a policy and controls to deactivate or localise an AI system as necessary; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[4] Top 10 for Agentic Applications 2026 (ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
