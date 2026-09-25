---
lang: de
source: bok/patterns/agent-identity-scoped-credentials.md
sourceHash: "55431cbb8efa2afa776e743d9403dd351f1aa386460f499aa836c7048c9bd27f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-identity-scoped-credentials
title: "Agent Identity & Scoped Credentials"
layer: 4
order: 14
summary: "Jeder Agent erhält seine eigene Identität, einen Owner, einen begrenzten Scope und ein Ablaufdatum, bevor er handelt, damit seine Aktionen zurechenbar und sein Zugriff widerrufbar sind."
---

# Muster: Agent Identity & Scoped Credentials

**Zusammenfassung:** Geben Sie jedem Agenten seine eigene Identität, einen Eigentümer, einen
begrenzten Umfang und ein Ablaufdatum, etabliert bevor er handelt, damit seine Handlungen
zugeordnet, sein Zugriff präzise widerrufen und sein Umfang begrenzt werden können. Identität ist
die Voraussetzung für Rechenschaftspflicht; Umfang ist die Voraussetzung für Eindämmung.

## Ziele
Machen Sie jeden nicht-menschlichen Akteur durch Konstruktion regierbar: zurechenbar, scopebar,
widerrufbar, ablaufend.

## Zielbenutzer
KI-Governance-Engineer, Security Engineer, IAM/Platform Team.

## Betroffene Stakeholder
Model Owner, Security Operations, Auditor, betroffene Dritte.

## Relevante Prinzipien
Registrieren und begrenzen Sie jeden Akteur, bevor er handelt; beginnen Sie mit einem benannten
Fehlermodus oder Schaden.

## Kontext
Agents, die unter delegierter Autorität handeln (APIs, Tools und andere Agents aufrufen), wo der
Standard ein gemeinsames Service-Konto oder ein statischer Schlüssel ist.

## Problem
Ein Agent mit geliehenen Credentials kann nicht zugerechnet, enthalten oder widerrufen werden.
NIST's NCCoE stellt die offene Frage direkt: Wie gelten Identification, Authentication und
Authorization, damit jeder Agent "known, trusted, and properly governed" ist, mit Non-Repudiation
und tamper-proof Logging [1].

## Lösung
Geben Sie jedem Agent eine distinct workload identity mit einem deklarierten Scope, einem Owner und
einem Ablaufdatum aus, aufgezeichnet im Agent Registry. Halten Sie zwei Fragen getrennt.
**Channel authentication** sichert einen Hop: wie ein Client sich bei einem Tool Server
authentifiziert; die MCP-Spezifikation vom 2026-07-28 verschärfte genau dies, indem sie Dynamic
Client Registration zugunsten von Client ID Metadata Documents veraltete und Credentials an ihren
Issuer band [2]. Das verhärtet die MCP-Verbindung, ist aber nicht die Identität des Agents.
**Agent workload identity** ist die dauerhafte, zurechenbare Identität, die der Agent über jeden Hop
und jedes Protokoll trägt, unter der seine Aktionen protokolliert und sein Zugriff widerrufen
werden: die Aufgabe eines Workload-Identity-Systems (SPIFFE/SPIRE) oder einer First-Class Agent
Identity von einem Enterprise Provider (zum Beispiel Microsoft Entra Agent ID [3] oder Okta Agent
SSO [4]; illustrativ), aufgezeichnet im Registry, nicht des Transport-Protokolls. Sichern Sie den
Channel *und* geben Sie die Workload Identity aus; begrenzen Sie ihre Credentials auf das Least
Privilege, das die deklarierte Funktion des Agents benötigt.

> **Beispiel (illustrativ)** Ein Data-Analysis Agent authentifiziert sich mit einer
> Issuer-gebundenen Credential und einem Scope, der auf Read-Only-Zugriff auf einen Datensatz
> begrenzt ist; jede seiner Aktionen wird unter seiner eigenen Identität protokolliert und seine
> Credential läuft mit seinem Registry-Eintrag ab.

## Konsequenzen
Attribution, Containment und präziser Widerruf werden möglich, und der Kill Switch hat etwas, auf
das er einwirken kann. Die Kosten sind IAM-Integration und die Verwaltung nicht-menschlicher
Identitäten im großen Maßstab.

## Verwandte Muster
[Agent Registry](/patterns/agent-registry);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Policy Card](/patterns/policy-card); [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Zuordnung:** EU AI Act Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM
· OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

Threat IDs folgen der OWASP Top 10 for Agentic Applications 2026 [5] und Function Labels dem NIST AI
RMF [6]. Mappings are illustrative, not a claim of conformity.

## Sources

[1] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[2] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[3] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[4] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
