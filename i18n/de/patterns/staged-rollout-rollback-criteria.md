---
lang: de
source: bok/patterns/staged-rollout-rollback-criteria.md
sourceHash: "75d88b1728a25ef59fcd822587bf2668b045c846a1763723ab78f4c5fd3df44e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: staged-rollout-rollback-criteria
title: Staged Rollout with Rollback Criteria
layer: 4
order: 29
summary: "Führen Sie jede Änderung an einem bereitgestellten KI-System (ein neues Modell, ein Retraining, eine Prompt- oder Corpus-Änderung, eine neue Anbieter-Modellversion) in Stufen zur Produktion durch, die die Exposition begrenzen, während sich Nachweise ansammeln: Shadow, Pilot, Canary, dann allgemeine Verfügbarkeit. Jede Stufe hat Rollback-Kriterien, die vor Beginn der Stufe in den Rollout-Plan geschrieben werden und vom Pipeline bewertet werden, Versionen sind im Register gepinnt und der Weg zurück wurde getestet. Ein Kriterium, das erfunden wird, nachdem sich die Metrik bewegt hat, ist eine Verhandlung, keine Kontrolle."
---

# Muster: Staged Rollout with Rollback Criteria

**Zusammenfassung:** Führen Sie jede Änderung an einem bereitgestellten KI-System (ein neues Modell,
ein Retraining, eine Prompt- oder Corpus-Änderung, eine neue Anbietermodellversion) in Stufen in die
Produktion ein, die die Exposition begrenzen, während sich Nachweise ansammeln: Shadow, Pilot,
Canary, dann allgemeine Verfügbarkeit. Jede Stufe hat Rollback-Kriterien, die vor dem Start in den
Rollout-Plan geschrieben und von der Pipeline bewertet werden, Versionen sind in der Registrierung
fixiert, und der Rückweg wurde getestet. Ein Kriterium, das erfunden wird, nachdem sich die Metrik
bewegt hat, ist eine Verhandlung, keine Kontrolle.

## Ziele
Begrenzen Sie den Schaden, den eine schlechte Änderung anrichten kann, auf den Anteil des Traffic
oder der Fälle, die ihr ausgesetzt sind, und machen Sie "roll it back" zu einer Entscheidung, die
die Pipeline auf ein vorher vereinbartes Signal hin trifft, statt in einem Meeting.

## Zielbenutzer
KI-Governance-Engineer, ML Platform Team, SRE, System Owner.

## Betroffene Stakeholder
Nutzer und betroffene Personen des Systems, Operatoren und Reviewer, das Go-Live-Panel, Betreiber
nachgelagert einer Änderung eines Anbieters.

## Relevante Prinzipien
Geben Sie jedem Guardrail Zähne; bauen Sie das Guardrail an der frühesten Stelle, an der es
blockieren kann; instrumentieren Sie den Build, um seinen eigenen Beweis zu erbringen.

## Kontext
KI-Systeme ändern sich häufiger als ihre Genehmigungen. Ein Neutraining, eine Prompt-Bearbeitung,
ein aktualisierter Abrufkorpus und eine neue Modellversion eines Anbieters können jeweils Qualität,
Sicherheit oder Fairness verändern, ohne dass sich eine Zeile des Codes des Betreibers ändert. Site
Reliability Engineering verfügt bereits über die Mechanismen: Canarying ist eine teilweise und
zeitlich begrenzte Bereitstellung einer Änderung und deren Bewertung [1], Blue-Green-Deployment hält
einen getesteten Rückweg bereit [2], und operative Feature-Toggles schalten die Exposition pro
Kohorte ohne Bereitstellung um [3]. Das KI-Verordnung der EU verlangt von Betreibern von
Hochrisiko-KI-Systemen, den Betrieb zu überwachen und die Nutzung auszusetzen, wenn sie Grund zu der
Annahme haben, dass das System ein Risiko darstellt [4], und ein Anbieter oder potenzieller
Anbieter, der ein System des Anhangs III mit echten Nutzern pilotiert, bevor er es auf den Markt
bringt, führt Tests unter Realbedingungen durch, die Artikel 60 regelt [4]. Das NIST AI RMF erwartet
eine Feststellung, ob die Bereitstellung fortgesetzt werden sollte, und Mechanismen, um ein System
zu ersetzen oder zu deaktivieren, dessen Ergebnisse nicht mit der Zweckbestimmung übereinstimmen
[5].

## Problem
Ohne Stufen geht eine Änderung vom Eval-Harness direkt an alle auf einmal, und der erste Hinweis auf
das Live-Verhalten ist der Schaden selbst. Mit Stufen, aber ohne vorregistrierte Kriterien, wird
jeder Rollback zu einer Debatte darüber, ob eine geänderte Metrik wichtig ist, die nach dem Ereignis
von den Personen geführt wird, die die Veröffentlichung wollten. Ein Anbieter-Modell-Update, das
niemand als Veröffentlichung behandelt hat, überspringt jede Stufe.

### Kräfte
- **Geschwindigkeit gegen Evidenz.** Jede Stufe verzögert den Wert; eine zu kurze Stufe beweist
  nichts.
- **Statistische Aussagekraft gegen Exposition.** Ein kleines Canary exponiert wenige Personen,
  benötigt aber Zeit, um eine echte Regression zu erkennen, besonders pro Gruppe.
- **Verspätete Labels.** Outcome-Labels treffen oft ein, nachdem die Stufe endet, daher stützen sich
  Kriterien auf Proxys: Uneinigkeit, Außerkraftsetzungen, Beschwerden, Begründetheit.
- **Änderungen, die Sie nicht vorgenommen haben.** Eine Anbieter-Versionsaktualisierung kommt nach
  seinem Zeitplan an, nicht nach Ihrem.

## Lösung
Schreiben Sie den Rollout-Plan als Daten, registrieren Sie ihn vor der ersten Stufe, und lassen Sie
die Pipeline ihn durchsetzen.

1. **Stufen mit Zweck.** Shadow (Live-Eingaben, Ausgaben protokolliert, nicht verwendet) beweist
   Verhalten bei echtem Datenverkehr; ein Pilot mit geschulten Nutzern beweist, dass die Aufsicht
   funktioniert; ein Canary gegen eine Kontrollgruppe beweist keine Regression im großen Maßstab;
   allgemeine Verfügbarkeit hält die Kriterien als Live-Monitore.
2. **Vorregistrierte Rollback-Kriterien.** Jede Stufe listet Metrik, Vergleich, Schwellenwert,
   Fenster und die Gruppenaufschlüsselungen auf, die wichtig sind. Der Plan wird vor Beginn der
   Stufe festgeschrieben und unterzeichnet; eine Änderung eines Schwellenwerts ist ein überprüfter
   Diff mit einem Genehmiger, niemals eine Bearbeitung auf einem Dashboard.
3. **Gepinnte Versionen.** Das Register pinnt Modell-, Prompt-, Abrufkorpus- und Guardrail-Versionen
   für die Baseline und den Kandidaten. Eine zur Laufzeit erkannte ungepinnte Änderung ist selbst
   ein Rollback-Auslöser.
4. **Ein getesteter Rückweg.** Blue-Green-Umschaltung oder ein Feature-Flag leitet den Datenverkehr
   zur Baseline zurück, und die Umschaltung wird in der Shadow-Stufe ausgeführt, bevor jemand davon
   abhängig ist.
5. **Automatische Bewertung.** Ein Canary-Analyse-Job vergleicht Kandidat und Kontrolle pro Metrik
   und pro Gruppe und schreibt ein Stufen-Urteil (fördern, halten, zurückrollen) in den
   Assurance-Store. Der Go/No-Go-Datensatz fasst den Rollout in seinem `rollout`-Feld zusammen
   (siehe das [Go/No-Go-Schema](/resources/templates#schema-go-no-go)).
6. **Anbieter-Versionen sind Veröffentlichungen.** Eine neue Anbieter-Modellversion läuft in Shadow
   und Canary gegen die gepinnte Version, bevor sie Datenverkehr erhält.

Illustrativer Rollout-Plan, registriert vor der Shadow-Stufe:

```json
{
  "plan_id": "ro-csa-01-2026-09",
  "subject": "csa-01@2026-09-18",
  "baseline": "csa-01@2026-08-30",
  "registered_at": "2026-09-15T09:00:00Z",
  "pinned": {
    "model": "vendor-model@2026-08-01",
    "prompt": "csa-prompt@41",
    "corpus": "csa-kb@2026-09",
    "guardrails": "gr-csa@12"
  },
  "stages": [
    {
      "stage": "shadow",
      "min_days": 7,
      "rollback_if": [{ "metric": "disagreement_with_baseline", "op": ">", "value": 0.08 }]
    },
    {
      "stage": "pilot",
      "exposure": "40 trained agents",
      "min_days": 14,
      "rollback_if": [
        { "metric": "override_rate", "op": ">", "value": 0.15 },
        { "metric": "complaints_per_1000", "op": ">", "value": 2.0 }
      ]
    },
    {
      "stage": "canary",
      "exposure_percent": 10,
      "control_group": true,
      "min_days": 14,
      "rollback_if": [
        { "metric": "groundedness", "op": "<", "value": 0.92 },
        { "metric": "resolution_rate_ratio_min_by_language", "op": "<", "value": 0.9 },
        { "metric": "severity_1_events", "op": ">", "value": 0 }
      ]
    },
    { "stage": "general_availability", "exposure_percent": 100 }
  ],
  "rollback_path": "blue-green switch to csa-01@2026-08-30; flag csa01.candidate off",
  "go_no_go": "gng-csa-01-2026-09-18"
}
```

> **Beispiel (illustrativ)** Der neue Prompt eines Support-Assistenten besteht sein Eval-Gate und
> tritt in Shadow ein. Im Canary bleibt die Begründetheit insgesamt erhalten, aber die Lösungsquote
> für portugiesischsprachige Chats fällt unter 90% der spanischen Quote. Das vorregistrierte
> Kriterium wird ausgelöst, das Flag gibt die Canary-Kohorte innerhalb von Minuten zur Baseline
> zurück, und das Stufen-Urteil und das Rollback-Ereignis landen im Assurance-Store, bevor jemand
> eine Besprechung einberufen hat.

## Konsequenzen
Regressionen werden erfasst, während sie wenige Nutzer betreffen, und jede Förderung oder jeder
Rollback hinterlässt einen Datensatz, der an im Voraus festgelegte Kriterien gebunden ist. Die
Kosten sind langsamere Veröffentlichungen, Canary-Infrastruktur, die statistische Arbeit zur
Dimensionierung von Stufen und Gruppen sowie die Disziplin, Anbieter-Updates und
Prompt-Bearbeitungen als Veröffentlichungen zu behandeln. Kriterien, die zu eng sind, führen zu
Rollback-Müdigkeit; überprüfen Sie sie mit ihren Eigentümern im Wartungskalender.

## Verwandte Muster
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Registry](/patterns/agent-registry);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Zuordnung:** KI-Verordnung Art. 26(5), Art. 60 · ISO/IEC 42001 A.6.2.5, A.6.2.6 · NIST AI RMF
MANAGE 1.1, MEASURE 2.3, MANAGE 2.4 · Schicht 04 Runtime Controls & Observability.

Control-IDs folgen ISO/IEC 42001 Annex A [6] und Unterkategorie-IDs dem NIST AI RMF [5]. Zuordnungen
sind illustrativ, keine Konformitätsaussage.

## Sources

[1] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[2] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[3] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5) monitor, suspend and inform; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MANAGE 1.1 determination whether deployment should proceed; MEASURE 2.3 performance demonstrated for conditions similar to deployment; MANAGE 2.4 supersede, disengage or deactivate). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
