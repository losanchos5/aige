---
lang: de
source: bok/patterns/agent-registry.md
sourceHash: "08b0ddb94f34e908f4aa421264e1a2ef924b51c137046a23490c6e2a919d420a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-registry
title: Agent Registry
layer: 2
order: 4
summary: "Ein Runtime-bewusstes Inventory jedes Modells, jedes Service und jedes Agents, jeder mit einem Owner, einem Scope und einem Ablaufdatum, geschrieben von der Deploy Pipeline, nicht von Hand."
---

# Muster: Agent Registry

**Zusammenfassung:** Führen Sie ein laufzeitgerechtes Inventar aller Modelle, Services und Agenten,
wobei jeder Eintrag einen Eigentümer, einen Geltungsbereich und ein Ablaufdatum trägt, gespeist
durch die Deployment-Pipeline statt manuell eingegeben. Die Registry ist das Objekt, das Richtlinien
evaluieren und an das Runtime-Kontrollen angebunden werden.

## Ziele
Beantworten Sie "Welche KI läuft, und was darf sie tun?" aus einer Live-Quelle, und machen Sie die
Registrierung zur Voraussetzung für die Produktion.

## Zielbenutzer
KI-Governance-Engineer, Platform-Team, Security Engineer.

## Betroffene Stakeholder
Modellverantwortliche, Betreiber, Auditor, Incident Responder.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; machen Sie den kontrollierten Weg zum
einfachsten Weg.

## Kontext
Eine Organisation, die Modelle und Agenten über Teams hinweg bereitstellt, wo keine einzelne Quelle
weiß, was live ist.

## Problem
Ein manuell gepflegtes Inventar ist am Tag seiner Bearbeitung korrekt und eine Woche später falsch.
Ohne Eigentümer, Geltungsbereich und Ablaufdatum kann eine Aktion nicht zugeordnet werden, ein
Geltungsbereich kann nicht durchgesetzt werden, und ein veralteter Agent verbleibt mit Zugriff, den
niemand überprüft.

## Lösung
Machen Sie die Registry zu einer API, in die die Deploy-Pipeline schreibt: Ein neues Modell oder ein
neuer Agent registriert sich beim Deployment mit einem Eigentümer, einem deklarierten
Geltungsbereich und einem Ablaufdatum, nach dem der Eintrag erneuert werden muss oder deaktiviert
wird. Verweigern Sie Produktionszugriff für nicht registrierte Artefakte. Gleichen Sie regelmäßig
mit dem tatsächlich laufenden System ab (siehe [Shadow-AI Discovery](/patterns/shadow-ai-discovery))
und kennzeichnen Sie Abweichungen.

Illustratives Schema für einen Registry-Eintrag:

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Beispiel (illustrativ)** Der Registry-Eintrag jedes Agenten läuft nach 90 Tagen ab; ein
> Eigentümer, der nicht erneuert, verliert die Workload-Identität des Agenten, sodass verlassene
> Agenten automatisch aus der Produktion fallen.

## Konsequenzen
Zuordnung, Geltungsbereichsdurchsetzung und Lebenszyklussteuerung werden möglich, und jede andere
Schicht erhält ein Objekt zum Ankern. Die Kosten sind Pipeline-Integration und die Governance zur
Durchsetzung des Ablaufdatums.

## Verwandte Muster
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[AIBOM](/patterns/aibom); [Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Zuordnung:** EU AI Act Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP
Agentic ASI10 · Layer 02 Inventory & Transparency.

Threat-IDs folgen dem OWASP Top 10 for Agentic Applications 2026 [1] und Funktionsetiketten dem NIST
AI RMF [2]. Zuordnungen sind illustrativ, keine Konformitätsaussage.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
