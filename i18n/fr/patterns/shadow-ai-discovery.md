---
lang: fr
source: bok/patterns/shadow-ai-discovery.md
sourceHash: "111b0c4d599fa4a939ded2796f092a76ec6baf037b98ca0e46bfe0d9467f5c4f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: shadow-ai-discovery
title: Shadow-AI Discovery
layer: 2
order: 16
summary: "Découverte continue des systèmes d'IA et des agents fonctionnant sans entrée de registre, réconciliés par rapport au registre pour que l'inventaire corresponde à la production."
---

# Motif : Shadow-AI Discovery

**Résumé :** Découvrez continuellement les systèmes d'IA et les agents qui fonctionnent mais ne sont
pas enregistrés, et réconciliez-les par rapport au registre, afin que l'inventaire reflète la
réalité plutôt que seulement ce que les équipes se sont souvenus de déclarer. Vous ne pouvez pas
gouverner ce que vous ne pouvez pas voir.

## Objectifs
Fermez l'écart entre le registre et la production en trouvant les modèles, agents et outils
compatibles avec l'IA non enregistrés, et en les plaçant sous gouvernance.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, équipe de plateforme.

## Parties prenantes affectées
Propriétaires de modèles, opérations de sécurité, auditeurs.

## Principes pertinents
Enregistrez et limitez chaque acteur avant qu'il n'agisse ; rendez le chemin gouverné le plus
facile.

## Contexte
Une organisation où les équipes adoptent les outils d'IA et lancent des agents plus vite que
n'importe quel inventaire central ne peut suivre, et où, selon la comparaison d'un fournisseur de la
catégorie, une grande partie du marché de la plateforme de gouvernance de l'IA « gère le programme …
sans aucun chemin de données d'exécution » [1].

## Problème
Un registre alimenté uniquement par déclaration volontaire est toujours en retard. Les agents non
enregistrés, la flotte fantôme, sont exactement la couche qu'un inventaire papier ne peut pas voir,
et une enquête d'un fournisseur de sécurité en 2026 rapporte qu'environ un sur huit des violations
d'IA impliquaient des systèmes agentiques [2].

## Solution
Exécutez la découverte par rapport aux environnements où l'IA apparaît (fournisseurs d'identité,
comptes cloud, sortie réseau, référentiels de code, intégrations SaaS) en utilisant des outils de
découverte (illustratifs) pour trouver des modèles et des agents. Réconciliez les découvertes par
rapport au registre, ouvrez une entrée pour chaque inconnue avec un propriétaire pour la réclamer,
et escaladez les non réclamées. Alimentez le résultat dans la vérification de dérive du Registre des
agents.

> **Exemple (illustratif)** Un balayage de découverte hebdomadaire trouve un agent appelant une API
> externe à partir du compte cloud d'une équipe sans entrée de registre ; il est auto-enregistré
> comme non réclamé, son propriétaire est notifié, et sa portée est gelée jusqu'à ce qu'il soit
> réclamé.

## Conséquences
L'inventaire converge vers la réalité et le point aveugle rétrécit. Le coût est l'intégration de la
découverte et le processus de triage et de réclamation de ce qu'elle trouve.

## Motifs connexes
[Agent Registry](/patterns/agent-registry);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondances :** Reglamento de IA de la UE Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA
AICM · OWASP Agentic ASI10 · Layer 02 Inventory & Transparency.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [3] et les libellés
de fonction le NIST AI RMF [4]. Les correspondances sont illustratives, non une affirmation de
conformité.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
