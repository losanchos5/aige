---
lang: fr
source: bok/patterns/agent-registry.md
sourceHash: "08b0ddb94f34e908f4aa421264e1a2ef924b51c137046a23490c6e2a919d420a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-registry
title: Agent Registry
layer: 2
order: 4
summary: "Un inventaire conscient du runtime de chaque modèle, service et agent, chacun avec un propriétaire, une portée et une expiration, écrit par le pipeline de déploiement, pas à la main."
---

# Motif : Agent Registry

**Résumé :** Maintenez un inventaire conscient du runtime de chaque modèle, service et agent, chaque
entrée portant un propriétaire, une portée et une date d'expiration, alimenté par le pipeline de
déploiement plutôt que saisi manuellement. Le registre est l'objet que les politiques évaluent et
auquel les contrôles runtime s'attachent.

## Objectifs
Répondez à « quel système d'IA fonctionne, et qu'est-il autorisé à faire ? » à partir d'une source
en direct, et faites de l'enregistrement une condition préalable pour atteindre la production.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, équipe plateforme, ingénieur en sécurité.

## Parties prenantes affectées
Propriétaires de modèles, déployeurs, auditeurs, responsables des incidents.

## Principes pertinents
Enregistrez et limitez chaque acteur avant qu'il n'agisse ; rendez le chemin gouverné le plus
facile.

## Contexte
Une organisation déployant des modèles et des agents dans plusieurs équipes, où aucune source unique
ne sait ce qui est en direct.

## Problème
Un inventaire maintenu manuellement est correct le jour où il est modifié et faux une semaine plus
tard. Sans propriétaire, portée et date d'expiration, une action ne peut pas être attribuée, une
portée ne peut pas être appliquée, et un agent obsolète persiste avec un accès permanent que
personne ne réexamine.

## Solution
Faites du registre une API que le pipeline de déploiement écrit : un nouveau modèle ou agent
s'enregistre au déploiement avec un propriétaire, une portée déclarée et une date d'expiration après
laquelle l'entrée doit être renouvelée ou est désactivée. Refusez l'accès à la production aux
artefacts non enregistrés. Réconciliez périodiquement avec ce qui fonctionne réellement (voir
[Shadow-AI Discovery](/patterns/shadow-ai-discovery)) et signalez la dérive.

Schéma illustratif pour une entrée de registre :

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Exemple (illustratif)** L'entrée de registre de chaque agent expire après 90 jours ; un
> propriétaire qui ne renouvelle pas perd l'identité de charge de travail de l'agent, de sorte que
> les agents abandonnés sortent automatiquement de la production.

## Conséquences
L'attribution, l'application de la portée et le contrôle du cycle de vie deviennent possibles, et
chaque autre couche obtient un objet auquel s'accrocher. Le coût est l'intégration du pipeline et la
gouvernance pour appliquer l'expiration.

## Motifs connexes
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[AIBOM](/patterns/aibom); [Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondances :** Règlement de l'IA Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) ·
CSA AICM · OWASP Agentic ASI10 · Couche 02 Inventaire et Transparence.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [1] et les
étiquettes de fonction le NIST AI RMF [2]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
