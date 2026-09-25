---
lang: fr
source: bok/patterns/framework-crosswalk.md
sourceHash: "4ac2ee65dbf30c778130711d8563719cfe4cbeeea2929df2e3e488f1269bad4e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: framework-crosswalk
title: Framework Crosswalk
layer: 1
secondaryLayer: 5
order: 12
summary: "Une carte de chaque contrôle aux clauses du cadre qu'il sert, générée à partir des contrôles : un index pour la réutilisation, jamais la preuve qu'un contrôle fonctionne."
---

# Motif : Framework Crosswalk

**Résumé :** Maintenez un mapping de chaque contrôle aux clauses du cadre qu'il sert, généré à
partir des contrôles eux-mêmes, comme un index pour la navigation et la réutilisation, jamais comme
l'état final. Un crosswalk prouve que vous avez lu le cadre ; il ne prouve pas que le contrôle
fonctionne.

## Objectifs
Laissez un contrôle satisfaire de nombreux cadres et rendez la couverture navigable, tout en
refusant de confondre la couverture avec l'assurance.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, responsable de la conformité, auditeur.

## Parties prenantes affectées
Auditeurs, régulateurs, propriétaires de modèles.

## Principes pertinents
Rendez le chemin gouverné le plus facile ; instrumentez la compilation pour produire sa propre
preuve.

## Contexte
Une organisation répondant à plusieurs cadres qui se chevauchent (Règlement de l'IA, ISO/IEC 42001,
NIST AI RMF, CSA AICM) qui mettrait autrement en œuvre le même contrôle plusieurs fois.

## Problème
Le crosswalk est où commence le théâtre de conformité. Une matrice de mapping verte est confondue
avec un contrôle fonctionnant ; une feuille de calcul de 300 lignes mappant les contrôles à cinq
cadres est présentée comme maturité alors que rien ne mesure si un contrôle mappé réduit le risque.
**L'anti-modèle est de traiter la couverture comme un contrôle : une cellule de mapping n'est pas une preuve.**

## Solution
Générez le crosswalk à partir des contrôles, pas à côté d'eux : chaque Policy Card et Eval Gate
déclare les clauses qu'il mappe, et le crosswalk est l'agrégation. Utilisez-le pour trouver les
lacunes et réutiliser les contrôles, pas pour signaler la conformité. Chaque cellule de mapping doit
se résoudre à un contrôle en cours d'exécution et sa preuve émise ; une cellule sans preuve derrière
elle est signalée, pas comptée. Les vocabulaires de référence tels que le CSA AICM (247 objectifs de
contrôle sur 18 domaines) [1] et la norme OWASP Agent Control Standard [2] ancrent le mapping.

> **Exemple (illustratif)** Cliquer sur une cellule verte pour « journalisation » ouvre le guardrail
> et la preuve OSCAL qu'il a émise cette semaine ; une cellule sans preuve s'affiche en ambre, pas
> en vert.

## Conséquences
Les contrôles sont réutilisés entre les cadres et les lacunes sont visibles, sans gonfler une
matrice en fausse assurance. Le compromis est la discipline de garder les cellules honnêtes et de
résister à la signalisation de la couverture comme résultat.

## Motifs connexes
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondances :** Règlement de l'IA (transversal) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA
AICM · OWASP Agent Control Standard · Layer 01 Govern-as-Code / Layer 05 Assurance & Continuous
Compliance.

Les étiquettes de fonction suivent le NIST AI RMF [3]. Les correspondances sont illustratives, non
une déclaration de conformité.

## Sources

[1] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
