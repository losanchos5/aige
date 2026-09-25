---
lang: de
source: bok/patterns/drift-fairness-monitor.md
sourceHash: "b9828bdd1d92a29e23961aa63df5e010aeeec6aaebd0c9f3196fee218e82cbf5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: drift-fairness-monitor
title: "Drift & Fairness Monitor"
layer: 4
secondaryLayer: 5
order: 30
summary: "Produktionssignale für Drift, Qualität und Fairness nach Gruppe, jeweils mit einem Schwellenwert, einem Eigentümer und einer vorher vereinbarten Konsequenz, geschrieben als Nachweis."
---

# Muster: Drift & Fairness Monitor

**Zusammenfassung:** Beobachten Sie ein bereitgestelltes System auf die Wege, auf denen es sich von
dem Zustand entfernt, in dem es genehmigt wurde: Input-, Label-, Konzept-, Pipeline-, Vendor-Modell-
und Nutzungs-Drift sowie Qualität und Fairness nach Gruppe. Jedes Signal hat einen Schwellenwert,
einen Eigentümer und eine vorher vereinbarte Konsequenz (ein Issue, ein Retrain, ein degradierter
Modus, ein Incident, ein ausgelöster Breaker), und jede Bewertung schreibt einen Nachweis-Datensatz,
sodass "das Modell ist immer noch fit und fair" eine Abfrage über Telemetrie ist, anstatt ein Glaube
vom Launch-Tag.

## Ziele
Erkennen Sie Leistungs- oder Fairness-Verluste in der Produktion, bevor die betroffenen Personen sie
erkennen, leiten jeden Verstoß an jemanden weiter, der handeln kann, und führen einen
kontinuierlichen Datensatz, dass das System gegen die Grenzen beobachtet wurde, die seine
Bereitstellungsentscheidung festgelegt hat.

## Zielbenutzer
KI-Governance-Engineer, ML-Plattform On-Call, Data Scientist, System Owner.

## Betroffene Stakeholder
Betroffene Personen, besonders Gruppen, die das System benachteiligen kann; Operatoren und Reviewer;
die Risk-Funktion; Anbieter und Betreiber, die die Überwachungspflicht teilen.

## Relevante Prinzipien
Beginnen Sie mit einem benannten Fehlermodus oder Schaden; geben Sie jedem Control Zähne;
instrumentieren Sie den Build, um seinen eigenen Nachweis zu erbringen.

## Kontext
Ein System, das seine Evals beim Go-Live bestanden hat, kann ohne Codeänderung in Fehler oder
Unfairness abdriften. Concept Drift, eine Änderung über die Zeit in der Beziehung, die ein Modell
gelernt hat, ist ein untersuchtes Problem, dessen Arbeit sich in Erkennung, Verständnis und
Anpassung unterteilt [1]. Die KI-Verordnung verlangt von Anbietern von Hochrisiko-Systemen,
Post-Market-Monitoring durchzuführen, und von Betreibern, den Betrieb auf der Grundlage der
Betriebsanleitung zu überwachen, die Nutzung auszusetzen und den Anbieter zu informieren, wenn das
System ein Risiko darstellt (`Art. 72`, `Art. 26(5)`), und verlangt von Systemen, die weiterlernen,
voreingenommene Rückkopplungsschleifen zu adressieren (`Art. 15(4)`) [2]. Wo Überwachung auf
Voreingenommenheit spezielle Kategorien personenbezogener Daten benötigt, setzt das Digital-Omnibus
die Bedingungen in einem neuen `Art. 4a` [3]. Einige Gesetze verlangen regelmäßige Audits direkt:
New Yorks Local Law 144 verlangt ein Bias-Audit innerhalb eines Jahres, bevor ein automatisiertes
Entscheidungstool für Beschäftigung verwendet wird [4]. Das NIST AI RMF verlangt, dass
Funktionalität und Verhalten in der Produktion überwacht werden und dass Fairness und
Voreingenommenheit bewertet und dokumentiert werden [5].

## Problem
Dashboards ohne Schwellenwerte werden von niemandem beobachtet. Labels kommen spät oder gar nicht
an, sodass Genauigkeit nicht gemessen werden kann, wenn es wichtig ist. Das Gruppenattribut, das zur
Messung von Fairness benötigt wird, fehlt normalerweise zur Laufzeit. Ein generatives System kann
degradieren (mehr unbegründete Antworten, mehr Ablehnungen in einer Sprache), während jede
Infrastruktur-Metrik grün bleibt. Und ein Verstoß, der niemanden benachrichtigt, ist nur ein
Diagramm.

### Kräfte
- **Label-Verzögerung gegen Aktualität.** Ergebnis-freie Proxys (Input-Drift, Auswahlraten,
  Overrides, Beschwerden) kommen jetzt an; Leistung auf frischen Labels kommt später an und ist das,
  was zählt.
- **Empfindlichkeit gegen Alert-Müdigkeit.** Enge Schwellenwerte erfassen Drift früh und
  benachrichtigen Personen für Rauschen.
- **Fairness-Messung gegen Datenschutz.** Die Messung nach Gruppe benötigt das Gruppenattribut, das
  oft spezielle Kategoriedaten mit seinen eigenen rechtlichen Bedingungen ist.
- **Gemeinsame Pflicht.** Anbieter und Betreiber überwachen jeweils einen Teil des Systems und sehen
  unterschiedliche Daten.

## Lösung
Führen Sie den Monitor als Layer 04-Signalpfad aus, der Layer 05-Nachweis schreibt, angetrieben
durch einen Überwachungsplan, der Daten sind.

1. **Benennen Sie, was sich bewegen kann.** Für jedes System listen Sie die Drift-Klassen auf, die
   gelten: Daten (Input-Verteilung), Label (Basisrate), Konzept (Input-zu-Ergebnis-Beziehung),
   Pipeline (Upstream-Schema oder Abrufschritt), Vendor-Modell (das Modell hinter der API) und
   Nutzung (wer es nutzt, wofür). Wählen Sie eine Statistik pro Klasse: einen Stabilitätsindex oder
   Zwei-Stichproben-Test auf Features oder Embeddings gegen ein Referenzfenster; vorhergesagt gegen
   beobachtete positive Rate; Leistung auf frischen Labels mit Change-Point-Erkennung;
   Datenverträge; Version-Pin-Checks; Thema-Klassifizierung von Datenverkehr gegen den negativen
   Raum.
2. **Fairness nach Gruppe, mit und ohne Labels.** Überwachen Sie Auswahl- oder Genehmigungsraten
   nach Gruppe ohne benötigtes Label; Fehler- und Kalibrierungsraten nach Gruppe, sobald Ergebnisse
   ankommen, mit angegebenem Label-Verzögerung; Override-, Beschwerde- und Einspruchsraten nach
   Gruppe aus dem [Decision Notice & Contest Path](/patterns/decision-notice-contest-path); und für
   generative Systeme, Begründungs- und Ablehnungsraten nach Thema und Sprache. Wo das
   Gruppenattribut zur Laufzeit nicht gehalten wird, verwenden Sie eine zustimmende Stichprobe oder
   ein regelmäßiges Audit in einer gesicherten Umgebung.
3. **Schwellenwert, Eigentümer, Konsequenz.** Jede Metrik im Plan trägt einen Schwellenwert, ein
   Fenster, einen benannten Eigentümer, der benachrichtigt werden kann, und die Aktion, die ein
   Verstoß auslöst: ein Issue öffnen, ein Retrain planen, einen degradierten Modus schalten, ein
   Incident über die [Incident Pipeline](/patterns/incident-pipeline) öffnen oder den
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) auslösen.
4. **Nachweis bei jeder Bewertung.** Jede Überprüfung schreibt einen Nachweis-Datensatz zum
   Assurance-Store über [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry),
   bestanden oder nicht bestanden, sodass das Fehlen von Verstößen selbst nachgewiesen ist.
5. **Der Plan als Daten.** Der Überwachungsplan des Betreibers verwendet das
   [Post-Market-Monitoring-Plan-Schema](/resources/templates#schema-post-market-monitoring-plan)
   erneut, und eine Schwellenwertänderung ist ein überprüfter Diff, wie jede Änderung an einem
   Control.

Illustrativer Überwachungsplan für einen Support-Assistenten, als
Post-Market-Monitoring-Plan-Datensatz:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json",
  "plan_id": "mon-csa-01",
  "subject": "csa-01@2026-09-18",
  "scope": "All chats in ES and PT, including escalations to human agents and customer complaints.",
  "data_sources": [
    { "source": "chat telemetry with groundedness scores", "type": "telemetry", "owner": "ml-platform" },
    { "source": "agent overrides and escalations", "type": "deployer_feedback", "owner": "contact-centre-ops" },
    { "source": "complaints that mention the assistant", "type": "user_complaint", "owner": "customer-care" },
    { "source": "monthly re-run of the regression suite on sampled chats", "type": "eval_rerun", "owner": "model-validation" }
  ],
  "metrics": [
    {
      "metric": "groundedness of sampled answers",
      "threshold": "< 0.90 over 7 days",
      "cadence": "daily",
      "failure_mode": "ungrounded answers",
      "alert_route": "ml-platform"
    },
    {
      "metric": "resolution-rate ratio, lowest language to highest",
      "threshold": "< 0.90 over 14 days",
      "cadence": "weekly",
      "failure_mode": "worse service for one language group",
      "alert_route": "ai-governance"
    },
    {
      "metric": "share of chats classified outside the intended topics",
      "threshold": "> 5% over 7 days",
      "cadence": "daily",
      "failure_mode": "usage drift into unapproved use",
      "alert_route": "system-owner"
    }
  ],
  "drift_signals": ["embedding drift on user turns", "topic mix", "vendor model version pin"],
  "triggers": [
    { "condition": "groundedness breach for two consecutive windows", "action": "rollback", "owner": "system-owner" },
    { "condition": "language resolution ratio breach", "action": "investigate", "owner": "ai-governance" },
    { "condition": "unpinned vendor model version detected", "action": "suspend", "owner": "ml-platform" }
  ],
  "feedback_channels": ["in-chat feedback", "complaint form", "contest path for account decisions"],
  "retraining_policy": "A retrain, prompt change or corpus refresh is a release and goes through the staged rollout.",
  "review_cadence": "Thresholds reviewed quarterly with their owners",
  "owner": "system-owner",
  "effective_from": "2026-09-18"
}
```

> **Beispiel (illustrativ)** Drei Wochen nach einem bestandenen Vendor-Modell-Update steigt die
> Nutzungs-Drift-Metrik: Mitarbeiter haben begonnen, dem Kundenassistenten HR-Fragen zu stellen. Der
> Verstoß öffnet ein Issue für den System Owner, der HR-Themen zur Liste der verbotenen Nutzungen
> hinzufügt und sie zum HR-Portal leitet; die Metrik fällt unter den Schwellenwert zurück, und das
> Issue, die Änderung und die Wiederherstellung sind alle im Assurance-Store.

## Konsequenzen
Drift und Unfairness werden als Signale mit Eigentümern erfasst, anstatt als Incidents entdeckt zu
werden, und regelmäßige Audits werden billig, weil die Telemetrie bereits existiert. Die Kosten sind
Labeling- und Sampling-Kapazität, statistische Sorgfalt bei Schwellenwerten (Pro-Gruppen-Metriken
auf kleinen Gruppen sind verrauscht), die Datenschutzarbeit für Gruppenattribute und
On-Call-Abdeckung für jedes Signal, das benachrichtigen kann.

## Verwandte Muster
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path).

**Zuordnung:** EU AI Act Art. 4a, Art. 15(4), Art. 26(5), Art. 72 · NYC Local Law 144 · ISO/IEC
42001 A.5.4, A.6.2.6 · NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1 · Layer 04
Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Control-IDs folgen ISO/IEC 42001 Annex A [6] und Unterkategorie-IDs dem NIST AI RMF [5]. Zuordnungen
sind illustrativ, keine Konformitätsaussage.

## Sources

[1] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[2] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 15(4) feedback loops in systems that continue to learn; Art. 26(5) deployer monitoring, suspension and information; Art. 72 post-market monitoring by providers). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special categories of personal data for bias detection and correction); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.4 functionality and behaviour monitored in production; MEASURE 2.11 fairness and bias evaluated and documented; MEASURE 3.1 existing, unanticipated and emergent risks tracked; MANAGE 4.1 post-deployment monitoring plans). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.5.4 assessing AI system impact on individuals or groups of individuals; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
