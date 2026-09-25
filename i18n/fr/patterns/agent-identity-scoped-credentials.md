---
lang: fr
source: bok/patterns/agent-identity-scoped-credentials.md
sourceHash: "55431cbb8efa2afa776e743d9403dd351f1aa386460f499aa836c7048c9bd27f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-identity-scoped-credentials
title: "Agent Identity & Scoped Credentials"
layer: 4
order: 14
summary: "Chaque agent obtient sa propre identité, propriétaire, portée délimitée et expiration avant d'agir, de sorte que ses actions sont attribuables et son accès révocable."
---

# Motif : Agent Identity & Scoped Credentials

**Résumé :** Donnez à chaque agent sa propre identité, un propriétaire, une portée délimitée et une
expiration, établis avant qu'il n'agisse, de sorte que ses actions puissent être attribuées, son
accès révoqué précisément et sa portée contenue. L'identité est la condition préalable de la
responsabilité ; la portée est la condition préalable du confinement.

## Objectifs
Rendez chaque acteur non humain gouvernable par construction : attribuable, scopable, révocable,
expirant.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, équipe IAM/plateforme.

## Parties prenantes affectées
Propriétaires de modèles, opérations de sécurité, auditeurs, tiers affectés.

## Principes pertinents
Enregistrez et délimitez chaque acteur avant qu'il n'agisse ; partez d'un mode de défaillance ou
d'un préjudice nommé.

## Contexte
Agents qui agissent sous autorité déléguée (appel d'API, outils et autres agents), où la valeur par
défaut est un compte de service partagé ou une clé statique.

## Problème
Un agent sur des identifiants empruntés ne peut pas être attribué, contenu ou révoqué. Le NCCoE du
NIST encadre la question ouverte directement : comment l'identification, l'authentification et
l'autorisation s'appliquent-elles de sorte que chaque agent soit « connu, fiable et correctement
gouverné », avec non-répudiation et enregistrement inviolable [1].

## Solution
Émettez à chaque agent une identité de charge de travail distincte avec une portée déclarée, un
propriétaire et une expiration, enregistrée dans le Agent Registry. Gardez deux questions séparées.
**L'authentification de canal** sécurise un saut : comment un client s'authentifie auprès d'un
serveur d'outils ; la spécification MCP du 2026-07-28 a resserré exactement ceci, en dépréciant
l'enregistrement dynamique des clients en faveur des documents de métadonnées d'ID client et en
liant les identifiants à leur émetteur [2]. Cela renforce la connexion MCP mais n'est pas l'identité
de l'agent. **L'identité de charge de travail de l'agent** est l'identité durable et attribuable que
l'agent porte à travers chaque saut et protocole, sous laquelle ses actions sont enregistrées et son
accès révoqué : le travail d'un système d'identité de charge de travail (SPIFFE/SPIRE) ou d'une
identité d'agent de première classe d'un fournisseur d'entreprise (par exemple Microsoft Entra Agent
ID [3] ou Okta Agent SSO [4] ; illustratif), enregistrée dans le registre, non du protocole de
transport. Sécurisez le canal *et* émettez l'identité de charge de travail ; délimitez ses
identifiants au moindre privilège que la fonction déclarée de l'agent nécessite.

> **Exemple (illustratif)** Un agent d'analyse de données s'authentifie avec un identifiant lié à
> l'émetteur et une portée limitée à l'accès en lecture seule à un ensemble de données ; chacune de
> ses actions est enregistrée sous sa propre identité, et son identifiant expire avec son entrée de
> registre.

## Conséquences
L'attribution, le confinement et la révocation précise deviennent possibles, et le kill switch a
quelque chose sur lequel agir. Le coût est l'intégration IAM et la gestion des identités non
humaines à grande échelle.

## Motifs connexes
[Agent Registry](/patterns/agent-registry);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Policy Card](/patterns/policy-card); [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Correspondances :** Reglamento de IA de la UE Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI
RMF (Manage) · CSA AICM · OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

Les IDs de menace suivent le Top 10 OWASP pour les applications agentic 2026 [5] et les étiquettes
de fonction le NIST AI RMF [6]. Les mappages sont illustratifs, non une déclaration de conformité.

## Sources

[1] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[2] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[3] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[4] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
