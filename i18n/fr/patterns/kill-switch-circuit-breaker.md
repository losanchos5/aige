---
lang: fr
source: bok/patterns/kill-switch-circuit-breaker.md
sourceHash: "4085d3a3066ab6f5a2bcc5c008d937c4de6c9c26c7df7f845dc56669c3cab6bc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: kill-switch-circuit-breaker
title: "Kill Switch / Circuit Breaker"
layer: 4
order: 9
summary: "Un mécanisme testé qui arrête un agent ou une classe d'agents au point d'action, révoquant son accès sans casser le reste de la flotte."
---

# Motif : Kill Switch / Circuit Breaker

**Résumé :** Fournissez un mécanisme testé pour arrêter un agent ou une classe d'agents au point
d'action, révoquant l'accès et arrêtant les appels d'outils, sans casser le reste de la flotte.
L'autonomie n'est accordée que là où elle peut être retirée.

## Objectifs
Limitez le rayon d'explosion d'un agent défaillant ou compromis, et faites de « l'arrêter » un
contrôle qui a été exercé, pas une affirmation.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur en sécurité, SRE.

## Parties prenantes affectées
Propriétaires de modèles, utilisateurs, répondants aux incidents, tiers affectés.

## Principes pertinents
Enregistrez et délimitez chaque acteur avant qu'il n'agisse ; partez d'un mode de défaillance ou
d'un préjudice nommé.

## Contexte
Les agents qui agissent de manière autonome (appelant des outils, déplaçant des données ou de
l'argent), où une seule défaillance peut en cascade. Gartner s'attend à ce qu'en 2029, plus de la
moitié des attaques réussies contre les agents de l'IA exploitent les faiblesses du contrôle d'accès
et l'injection de prompt [1].

## Problème
Un agent qui ne peut pas être arrêté précisément ne peut être arrêté qu'en cassant tout. Une flotte
sur des identifiants partagés signifie qu'un incident force un choix entre laisser l'agent
fonctionner et faire tourner un secret qui arrête toute la flotte.

## Solution
Liez chaque agent à sa propre identité (voir
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)) de sorte que
l'accès puisse être révoqué par agent. Implémentez un disjoncteur à la limite des appels d'outils
qui se déclenche sur un signal défini : un dépassement de seuil, une anomalie, un tirage manuel.
Testez le kill switch selon un calendrier ; un kill switch non testé n'est pas un contrôle.

> **Exemple (illustratif)** Le disjoncteur d'un agent de paiements se déclenche automatiquement
> lorsque son taux d'appels d'outils non autorisés dépasse un seuil, révoquant uniquement la portée
> de cet agent tandis que le reste de la flotte continue de fonctionner ; le tirage est exercé
> mensuellement.

## Conséquences
Les incidents sont contenus à un agent et la récupération est rapide. Le coût est l'infrastructure
d'identité par agent et l'ingénierie pour rendre la révocation instantanée et sûre.

## Motifs connexes
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Agent Registry](/patterns/agent-registry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondances :** Règlement de l'IA UE Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) ·
CSA AICM · OWASP Agentic ASI02/ASI10 · Couche 04 Runtime Controls & Observability.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [2] et les
étiquettes de fonction le NIST AI RMF [3]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
