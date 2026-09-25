---
lang: de
source: bok/patterns/vendor-model-due-diligence-gate.md
sourceHash: "61ed551de3df62c18170990d3246c6031fd5fb0989f823ca33dd889e35bd71f9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: vendor-model-due-diligence-gate
title: "Vendor / Model Due-Diligence Gate"
layer: 2
secondaryLayer: 5
order: 17
summary: "Ein strukturiertes Due-Diligence-Gate für gekaufte und nur-API-KI, das aufzeichnet, was Sie vor dem Erreichen der Produktion überprüfen können und nicht."
---

# Muster: Vendor / Model Due-Diligence Gate

**Zusammenfassung:** Gate die Beschaffung oder Integration eines KI-Systems eines Drittanbieters
(SaaS mit eingebettetem LLM, ein nur-API-Grundmodell, ein Agent eines Anbieters) auf eine
strukturierte Due-Diligence-Bewertung, damit ein Modell, das Sie nicht besitzen, immer noch durch
eine Kontrolle eintritt, die aufzeichnet, was Sie überprüfen können und nicht überprüfen können.
Wenn Sie das Modell nicht besitzen, ist dieses Gate das, was das Red-Team ersetzt, das Sie nicht
durchführen können.

## Ziele
Bringen Sie gekaufte und nur-API-KI unter die gleiche Registry- und Assurance-Disziplin wie Systeme,
die Sie bauen, und machen Sie die Grenzen Ihrer Überprüfung explizit statt angenommen.

## Zielbenutzer
KI-Governance-Engineer, Beschaffung, Security Engineer, DPO.

## Betroffene Stakeholder
Betreiber, Modellanbietern, Datensubjekten, Prüfern, Regulierungsbehörden.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; beginnen Sie mit einem benannten
Fehlermodus oder Schaden.

## Kontext
Eine Organisation, die weit mehr KI verbraucht als sie trainiert: SaaS-Funktionen mit eingebettetem
LLM, gehostete Grundmodelle, die nur per API erreicht werden, Agenten, die in einem Produkt eines
Anbieters versendet werden. Die Gewichte, Trainingsdaten und internen Guardrails gehören jemandem
anderem.

## Problem
Die Teile des Stack, die davon ausgehen, dass Sie das Modell besitzen, verschlechtern sich, wenn Sie
es nicht tun. Sie können Gewichte, die Sie nicht erreichen können, nicht rot-teamen, daher kann ein
Eval-Gate (Layer 03) nur das System des Anbieters als Black Box an seiner Grenze testen;
Runtime-Kontrolle (Layer 04) verengt sich auf die Tool-Bereiche, Identität und den Traffic, den die
Integration offenlegt, nicht das Verhalten des Modells selbst. Ungoverned gelassene beschaffte KI
wird zur Shadow Fleet mit einem Vertrag: in Produktion, unbewertet und außerhalb der Registry.

## Lösung
Machen Sie die Sorgfaltsprüfung zu einem Gate, das ein beschafftes oder integriertes KI-System
passieren muss, bevor es in die Produktion geht, und strukturieren Sie die Bewertung anhand einer
Vorlage statt eines Ad-hoc-Fragebogens; die Supplier-Assessment-Felder aus dem CSIRO Responsible AI
Pattern Catalogue sind ein brauchbarer Ausgangspunkt [1]. Bewerten Sie mindestens: die eigenen
Evaluationen und Red-Team-Nachweise des Anbieters (was er teilen wird und deren Unabhängigkeit); die
Model Card, die Dokumentation des Lieferanten und alle AIBOM, die Sie erhalten können; die
rechtliche Grundlage und Datenflüsse, einschließlich der Frage, ob Ihre Eingaben sein Modell
trainieren; die Scopes und Identität der Tools, die Sie dem Agent des Lieferanten gewähren; die
Verpflichtungen des Anbieters zur Incident-Meldung; und das vertragliche Recht auf Audit und
Benachrichtigung bei wesentlichen Änderungen. Dokumentieren Sie das Ergebnis als Registry-Eintrag
mit einem Eigentümer und einem Scope, und öffnen Sie das Gate bei Erneuerung oder bei einer
wesentlichen Modelländerung erneut. Verankern Sie die Bewertung in ISO/IEC 42001 Annex A.10
(Beziehungen zu Dritten und Kunden) [2], der Verteilung der Pflichten entlang der
Wertschöpfungskette in der KI-Verordnung (Verpflichtungen des Anbieters gegenüber Verpflichtungen
des Betreibers gemäß Artikel 25, 26 und 27 [3]) und für KI-Modelle mit allgemeinem Verwendungszweck
in der Transparenz und Dokumentation, die der GPAI Code of Practice von Anbietern erwartet [4]. Wenn
Sie eine Kontrolle nicht überprüfen können, dokumentieren Sie dies, und kompensieren Sie durch
Begrenzung der Integration: Least-Privilege-Scopes, Boundary-Evals und engere Runtime-Beobachtung
des Datenverkehrs, den Sie kontrollieren.

> **Beispiel (illustrativ)** Ein Team, das ein API-only-Fundament-Modell integriert, kann dessen
> Gewichte nicht testen, daher erfasst das Gate die veröffentlichten Evaluationen des Anbieters,
> beschränkt das Modell auf eine Scoped-Service-Identität ohne ständigen Datenzugriff, fügt eine
> Boundary-Eval für die eigenen Prompts des Teams hinzu und dokumentiert die gesamte Bewertung als
> Registry-Eintrag des Systems, gekennzeichnet als „provider-attested

### Betrieb: Änderungsmitteilungen, Neubewertung und Fallback

Das Gate einmal zu passieren, beweist wenig über ein System, das sich nach Unterzeichnung des
Vertrags ständig ändert. Der Betriebsschritt hält das Gate so lange offen, wie das System läuft.

- **Behandeln Sie jede Änderungs- und Abschaltungsmitteilung als ein Ereignis.** Dokumentieren Sie
  jede Mitteilung des Anbieters (eine neue Modellversion, eine geänderte Voreinstellung, ein
  Abschaltungsdatum, ein neuer Subprozessor, neue Datennutzungsbedingungen) gegen den
  Registry-Eintrag, und führen Sie die Boundary-Eval gegen das geänderte System erneut aus, bevor
  die Änderung die Benutzer erreicht, soweit der Vertrag es zulässt, eine Version festzulegen. Ein
  Abschaltungsdatum wird zu einem datierten Meilenstein im Eintrag mit einem Eigentümer für die
  Migrationsentscheidung.
- **Erkennen Sie die Änderung, die niemand angekündigt hat.** Führen Sie einen kleinen Canary-Satz
  aus der Boundary-Eval nach einem Zeitplan gegen den Live-Endpoint aus und warnen Sie, wenn seine
  Ergebnisse außerhalb ihres Bereichs liegen. Eine ohne Ankündigung erkannte Änderung ist ein Befund
  gemäß Vertrag. MITRE ATLAS katalogisiert die adversarische Form desselben Risikos, einen
  Supply-Chain-Rug-Pull, bei dem eine Komponente Vertrauen verdient und dann ein bösartiges Update
  ausliefert (`AML.T0109`) [5].
- **Bewerten Sie nach Auslösern und nach Tier neu, nicht nur bei Erneuerung.** Öffnen Sie das Gate
  nach einem durch den Risiko-Tier festgelegten Zeitplan und bei jedem Auslöser erneut: ein Incident
  beim Anbieter oder in Ihrer eigenen Bereitstellung, ein Eigentümerwechsel oder
  Subprozessor-Wechsel, eine regulatorische Änderung, eine wesentliche Modelländerung. Das NIST AI
  RMF verlangt, dass Risiken von Dritten regelmäßig überwacht werden und dass vortrainierte Modelle
  als Teil der Systemwartung überwacht werden (MANAGE 3.1 und 3.2) [6].
- **Halten Sie ein Fallback bereit, das Sie getestet haben.** Halten Sie ein alternatives Modell im
  Eval-Harness warm, einen manuellen Prozess, den das Personal geübt hat, und die degradierten Modi,
  auf die das System zurückfallen kann, und testen Sie den Wechsel mit einem Timer. Das NIST AI RMF
  verlangt Notfallprozesse für Ausfälle in Systemen von Dritten, die als Hochrisiko eingestuft
  werden (GOVERN 6.2) [7]. Derselbe Wechsel ist, wie ein Betreiber seine Pflicht erfüllt, ein
  Hochrisiko-KI-System auf der Grundlage der Betriebsanleitung zu überwachen und die Nutzung
  auszusetzen, wenn es ein Risiko darstellt (`Art. 26(5)`) [3]; die
  [Incident Pipeline](/patterns/incident-pipeline) ist für die Benachrichtigung des Anbieters
  zuständig.

Die Kontinuitäts- und Ausstiegsseite dieses Schritts (Ausfälle, zurückgezogene Modelle, erzwungene
Migrationen, vertraglicher Ausstieg) ist in
[Kapitel 15](/bok/governing-deployment#when-the-provider-fails-continuity) dargelegt.

> **Beispiel (illustrativ)** Ein Anbieter kündigt an, dass die Modellversion hinter einem
> Claims-Triage-Assistenten in 90 Tagen eingestellt wird. Die Mitteilung wird mit dem Datum als
> Meilenstein im Registry-Eintrag dokumentiert; die Boundary-Eval läuft in derselben Woche gegen die
> Nachfolgerversion und zeigt einen Rückgang bei zwei Subgruppen-Metriken; das Team dokumentiert
> eine Migrationsentscheidung mit einem kompensierenden Schwellenwert, und eine geplante Übung
> beweist, dass der Wechsel zur manuellen Warteschlange weniger als zehn Minuten dauert.

## Konsequenzen
Beschaffte KI wird inventarisiert und begrenzt, und die Abhängigkeit von vom Anbieter
bereitgestellten Nachweisen ist explizit statt verborgen. Die Kosten sind real: Die Schichten 03 und
04 bieten weniger Assurance über ein Modell, das Sie nicht besitzen, und das Gate hängt von der
Zusammenarbeit des Anbieters und Vertragsbedingungen ab, die Sie möglicherweise nicht vollständig
gewinnen. Der Betriebsschritt fügt laufende Kosten hinzu: Canary-Läufe gegen einen Live-Endpoint,
ein warmes Fallback, das aktuell gehalten werden muss, und Übungen, die beweisen, dass das Fallback
noch funktioniert.

## Verwandte Muster
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Zuordnung:** KI-Verordnung Art. 25 (Verantwortlichkeiten in der Wertschöpfungskette), Art. 26
(Pflichten des Betreibers), Art. 27 (FRIA), Art. 53 (GPAI-Dokumentation) · ISO/IEC 42001 Annex A.10
· GPAI Code of Practice · NIST AI RMF (Map, Govern) · Schicht 02 Inventory & Transparency / Schicht
05 Assurance & Continuous Compliance.

Funktionsetiketten folgen dem NIST AI RMF [8]. Zuordnungen sind illustrativ, keine
Konformitätsbehauptung.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations, incl. 26(5) monitoring on the basis of the instructions for use, informing the provider and suspending use), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] MITRE ATLAS data, release v2026.09 (AML.T0109 AI Supply Chain Rug Pull; AML.T0010 AI Supply Chain Compromise). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[6] NIST AI RMF Playbook, MANAGE (3.1 third-party risks monitored; 3.2 pre-trained models monitored; 2.4 supersede, disengage or deactivate). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[7] NIST AI RMF Playbook, GOVERN (6.1 third-party risk policies; 6.2 contingency processes for failures in third-party systems deemed high-risk). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[8] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
