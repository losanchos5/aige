---
lang: fr
source: bok/patterns/human-in-the-loop-gate.md
sourceHash: "001841890c7b27ac0f909a695784012afe2cfa21e43a6f8ebf77a3447e788526"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: human-in-the-loop-gate
title: Human-in-the-loop Gate
layer: 4
order: 15
summary: "Une étape d'approbation humaine à un point de décision défini et à enjeux élevés, de sorte que l'autonomie d'un agent s'arrête exactement où les enjeux justifient la latence."
---

# Motif : Human-in-the-loop Gate

**Résumé :** Exigez une approbation humaine à un point de décision défini et à enjeux élevés avant
qu'une action d'un agent ne prenne effet, de sorte que l'autonomie soit bornée par une personne
exactement où les enjeux justifient la latence. La surveillance est un point de contrôle conçu, non
une réflexion après coup.

## Objectifs
Insérez une surveillance humaine significative là où une action est irréversible ou à fort impact,
et enregistrez la décision comme preuve.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, propriétaire du produit, propriétaire du risque.

## Parties prenantes affectées
Personnes affectées, utilisateurs, propriétaires de modèles, régulateurs.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; enregistrez et bornez chaque acteur
avant qu'il n'agisse.

## Contexte
Un agent dont les actions incluent certaines qui sont irréversibles ou affectent les droits des
personnes (un paiement, un refus, une publication) aux côtés de nombreuses qui sont routinières.

## Problème
L'autonomie complète sur une action à enjeux élevés supprime la surveillance humaine que la loi et
le risque exigent tous deux ; l'examen manuel complet de chaque action détruit la valeur de l'agent.
La surveillance indifférenciée échoue dans les deux sens.

## Solution
Classifiez les actions par conséquence. Pour la classe à enjeux élevés, placez l'action derrière une
étape d'approbation humaine avec suffisamment de contexte pour décider, et bloquez l'action jusqu'à
approbation. Enregistrez l'approbateur, le contexte et la décision comme preuve. Gardez la classe
routinière autonome sous guardrails. Cela réalise l'exigence de surveillance humaine de l'article 14
du règlement sur l'IA de l'UE [1] au point d'action.

> **Exemple (illustratif)** Un agent peut rédiger et mettre en file d'attente des remboursements de
> manière autonome, mais tout remboursement au-dessus d'un seuil est retenu pour l'approbation d'une
> personne nommée, dont la décision est enregistrée par rapport à la transaction.

## Conséquences
La surveillance se place là où elle compte sans étouffer le travail routinier, et l'approbation est
auditable. Le coût est la conception de la classification des conséquences et la latence qu'elle
ajoute aux actions contrôlées.

## Motifs connexes
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Runtime Guardrail](/patterns/runtime-guardrail); [Policy Card](/patterns/policy-card);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondances :** Article 14 du règlement sur l'IA de l'UE · ISO/IEC 42001 · NIST AI RMF
(Manage) · OWASP Agentic ASI02 · Couche 04 Runtime Controls & Observability.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [2] et les
étiquettes de fonction le NIST AI RMF [3]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 14 (human oversight of high-risk AI systems). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
