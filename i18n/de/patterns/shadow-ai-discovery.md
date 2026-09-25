---
lang: de
source: bok/patterns/shadow-ai-discovery.md
sourceHash: "111b0c4d599fa4a939ded2796f092a76ec6baf037b98ca0e46bfe0d9467f5c4f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: shadow-ai-discovery
title: Shadow-AI Discovery
layer: 2
order: 16
summary: "Kontinuierliche Erkennung von KI-Systemen und Agenten, die ohne Registereintrag laufen, abgestimmt gegen das Register, damit das Inventar der Produktion entspricht."
---

# Muster: Shadow-AI Discovery

**Zusammenfassung:** Entdecken Sie kontinuierlich KI-Systeme und Agenten, die laufen, aber nicht
registriert sind, und stimmen Sie sie gegen das Register ab, damit das Inventar die Realität
widerspiegelt und nicht nur das, was Teams zu erklären vergessen haben. Sie können nicht steuern,
was Sie nicht sehen können.

## Ziele
Schließen Sie die Lücke zwischen dem Register und der Produktion, indem Sie unregistrierte Modelle,
Agenten und KI-fähige Tools finden und unter Governance bringen.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, Platform Team.

## Betroffene Stakeholder
Modell-Besitzer, Security Operations, Auditor.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; machen Sie den kontrollierten Weg zum
einfachsten Weg.

## Kontext
Eine Organisation, in der Teams KI-Tools schneller einführen und Agenten schneller starten als jedes
zentrale Inventar verfolgen kann, und wo nach dem Vergleich eines Anbieters der Kategorie ein großer
Teil des KI-Governance-Plattformmarkts "das Programm verwaltet … ohne irgendeinen Runtime-Datenpfad"
[1].

## Problem
Ein Register, das nur durch freiwillige Erklärung gespeist wird, ist immer hinterher. Unregistrierte
Agenten, die Shadow Fleet, sind genau die Schicht, die ein Papierinventar nicht sehen kann, und eine
Umfrage eines Security-Anbieters von 2026 berichtet, dass etwa einer von acht KI-Verstößen agentic
Systeme betraf [2].

## Lösung
Führen Sie Discovery gegen die Umgebungen durch, in denen KI erscheint (Identity Provider,
Cloud-Konten, Netzwerk-Egress, Code-Repositories, SaaS-Integrationen) mit Discovery-Tools
(illustrativ), um Modelle und Agenten zu finden. Stimmen Sie Ergebnisse gegen das Register ab,
öffnen Sie einen Eintrag für jeden Unbekannten mit einem Besitzer, um ihn zu beanspruchen, und
eskalieren Sie den Unbeanspruchten. Speisen Sie das Ergebnis zurück in die Drift-Prüfung des Agent
Registry.

> **Beispiel (illustrativ)** Ein wöchentlicher Discovery-Sweep findet einen Agenten, der eine
> externe API aus einem Cloud-Konto eines Teams aufruft, ohne Registereintrag; er wird automatisch
> als unbeansprucht registriert, sein Besitzer wird benachrichtigt und sein Umfang wird eingefroren,
> bis er beansprucht wird.

## Konsequenzen
Das Inventar konvergiert auf die Realität und der blinde Fleck schrumpft. Die Kosten sind
Discovery-Integration und der Prozess, um das zu triage und zu beanspruchen, was es findet.

## Verwandte Muster
[Agent Registry](/patterns/agent-registry);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Zuordnung:** EU AI Act Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP Agentic
ASI10 · Layer 02 Inventory & Transparency.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [3] und Funktionsetiketten dem NIST
AI RMF [4]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
