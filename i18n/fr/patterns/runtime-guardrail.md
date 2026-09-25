---
lang: fr
source: bok/patterns/runtime-guardrail.md
sourceHash: "6bebe5fd743c4435cfd24ed335b0c118e62d19e6f1794335bb1d4e37879939b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: runtime-guardrail
title: Runtime Guardrail
layer: 4
order: 8
summary: "Guardrails d'entrée et de sortie sur le chemin de la demande en direct qui appliquent la Policy Card du système à chaque appel et émettent un événement de décision pour chacun."
---

# Motif : Runtime Guardrail

**Résumé :** Placez des guardrails d'entrée et de sortie sur le chemin d'exécution du modèle ou de
l'agent qui appliquent sa Policy Card à chaque demande en direct et émettent une décision à la
télémétrie et au disjoncteur. Le guardrail est l'endroit où une politique écrite en couche 01 et un
seuil testé en couche 03 deviennent une action entreprise sur un appel réel, pas une affirmation à
ce sujet.

## Objectifs
Appliquez la politique au point d'action, sur les entrées et sorties qu'aucune évaluation n'a
anticipées, et faites de chaque application un événement structuré que les couches d'assurance et
d'incident peuvent consommer.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur ML, ingénieur de sécurité, équipe de plateforme.

## Parties prenantes affectées
Utilisateurs, propriétaires de modèles, personnes affectées, répondants aux incidents, auditeurs.

## Principes pertinents
Donnez des dents à chaque contrôle ; instrumentez la construction pour produire sa propre preuve.

## Contexte
Un agent ou un modèle en production, agissant sur des entrées en direct, dont la Policy Card et les
seuils d'évaluation existent mais n'ont pas de point d'application à l'exécution, de sorte qu'une
règle prouvée en CI est sans garde au moment où le système rencontre une entrée qu'aucun test n'a
couverte.

## Problème
Les politiques et les évaluations sont ponctuelles ; le système rencontre alors l'injection de
prompts, les sorties non sûres et les appels d'outils que personne n'a examinés. Un guardrail qui ne
fait que journaliser est l'observabilité prise pour un contrôle : le système se regarde échouer en
haute résolution. Sans un point d'application qui peut bloquer et émettre, l'exécution est le délai
entre un contrôle testé et une action non contrôlée.

## Solution
Mettez un guardrail des deux côtés du chemin du modèle/agent. Le guardrail d'entrée filtre les
prompts et le contexte récupéré pour l'injection et les demandes violant la politique avant qu'ils
n'atteignent le modèle ; le guardrail de sortie filtre les générations et les appels d'outils pour
le contenu non sûr, la fuite de données et les actions hors de portée avant qu'elles ne prennent
effet. Appliquez la même Policy Card évaluée en CI [1], de sorte que la décision d'exécution et la
décision de pipeline partagent une règle. À chaque appel, émettez un événement structuré,
`{agent, direction (input/output), rule_id, decision (allow/block/redact), timestamp}`, au magasin
d'assurance ([Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)) et, en cas
de violation définie, signalez le disjoncteur
([Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)). Les cadres de guardrail
réalisent cela comme une catégorie ; la norme de contrôle d'agent OWASP nomme la surface de contrôle
d'exécution [2]. Ceci est distinct du disjoncteur : le guardrail décide un appel à la fois et reste
dans le chemin de la demande ; le disjoncteur retire l'autonomie de l'agent en gros quand les
signaux du guardrail franchissent un seuil.

> **Exemple (illustratif)** Le guardrail d'entrée d'un assistant de service client bloque une
> tentative d'injection de prompt et son guardrail de sortie rédige un numéro de compte que le
> modèle était sur le point de retourner ; les deux décisions sont émises au magasin d'assurance, et
> une rafale de blocages déclenche le disjoncteur.

## Conséquences
Le contrôle testé tient sur le trafic en direct et chaque application laisse une trace ; le
garde-fou est aussi le capteur que le disjoncteur et le pipeline d'incidents lisent. Le coût est la
latence par appel, les faux positifs à affiner, et maintenir la règle d'exécution en synchronisation
avec la Policy Card et les seuils d'évaluation.

## Motifs connexes
[Policy Card](/patterns/policy-card);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondances :** Reglamento de IA de la UE Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF
(Manage) · OWASP Agentic ASI02/ASI03 · Layer 04 Runtime Controls & Observability.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [3] et les libellés
de fonction le NIST AI RMF [4]. Les correspondances sont illustratives, non une affirmation de
conformité.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
