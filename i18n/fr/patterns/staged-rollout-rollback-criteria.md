---
lang: fr
source: bok/patterns/staged-rollout-rollback-criteria.md
sourceHash: "75d88b1728a25ef59fcd822587bf2668b045c846a1763723ab78f4c5fd3df44e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: staged-rollout-rollback-criteria
title: Staged Rollout with Rollback Criteria
layer: 4
order: 29
summary: "Publiez chaque modèle, invite ou changement de version de fournisseur via les étapes shadow, pilot et canary dont les critères de restauration sont enregistrés avant le début de chaque étape."
---

# Motif : Staged Rollout with Rollback Criteria

**Résumé :** Prenez chaque changement à un système d'IA déployé (un nouveau modèle, un
réentraînement, un changement d'invite ou de corpus, une nouvelle version de modèle de fournisseur)
en production par étapes qui limitent l'exposition tandis que les preuves s'accumulent : shadow,
pilot, canary, puis disponibilité générale. Chaque étape a des critères de restauration écrits dans
le plan de déploiement avant qu'il ne commence et évalués par le pipeline, les versions sont
épinglées dans le registre, et le chemin de retour a été testé. Un critère inventé après le
déplacement de la métrique est une négociation, pas un contrôle.

## Objectifs
Limitez le préjudice qu'un mauvais changement peut causer à la part du trafic ou des cas exposés à
celui-ci, et rendez « le restaurer » une décision que le pipeline prend sur un signal pré-convenu
plutôt qu'une réunion.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, équipe de plateforme ML, SRE, propriétaire du système.

## Parties prenantes affectées
Utilisateurs et personnes affectées du système, opérateurs et examinateurs, le panel de mise en
direct, responsables du déploiement en aval d'un changement de fournisseur.

## Principes pertinents
Donnez à chaque contrôle des dents ; construisez le contrôle au point le plus précoce où il peut
bloquer ; instrumentez la construction pour produire sa propre preuve.

## Contexte
Les systèmes d'IA changent plus souvent que leurs approbations. Un réentraînement, une modification
de prompt, un corpus de récupération actualisé et une nouvelle version de modèle du fournisseur
peuvent chacun modifier la qualité, la sécurité ou l'équité sans qu'une ligne du code du déployeur
ne change. L'ingénierie de la fiabilité des sites dispose déjà des mécanismes : le canary est un
déploiement partiel et limité dans le temps d'une modification et son évaluation [1], le déploiement
bleu-vert maintient un chemin testé en arrière [2], et les bascules de fonctionnalités
opérationnelles commutent l'exposition par cohorte sans déploiement [3]. Le Reglamento de IA de la
UE demande aux responsables du déploiement de systèmes à haut risque de surveiller le fonctionnement
et de suspendre l'utilisation lorsqu'ils ont des raisons de considérer que le système présente un
risque [4], et un fournisseur ou un fournisseur potentiel qui teste un système de l'Annexe III avec
de vrais utilisateurs avant sa mise sur le marché effectue des essais en conditions réelles, que
l'article 60 régit [4]. Le NIST AI RMF s'attend à une détermination de savoir si le déploiement doit
procéder et à des mécanismes pour remplacer ou désactiver un système dont les résultats sont
incompatibles avec la destination [5].

## Problème
Sans étapes, une modification passe du harnais d'évaluation à tout le monde à la fois, et la
première preuve du comportement en direct est le préjudice lui-même. Avec des étapes mais sans
critères pré-enregistrés, chaque retour en arrière devient un débat sur la question de savoir si une
métrique modifiée importe, tenu après coup par les personnes qui voulaient la version. Une mise à
jour de modèle de fournisseur que personne n'a traitée comme une version ignore chaque étape.

### Enjeux
- **Vitesse contre preuves.** Chaque étape retarde la valeur ; une étape trop courte ne prouve rien.
- **Puissance statistique contre exposition.** Un petit canary expose peu de personnes mais
  nécessite du temps pour détecter une véritable régression, en particulier par groupe.
- **Étiquettes tardives.** Les étiquettes de résultats arrivent souvent après la fin de l'étape,
  donc les critères s'appuient sur des substituts : désaccord, remplacements, plaintes, fondement.
- **Modifications que vous n'avez pas apportées.** Une modification de version du fournisseur arrive
  selon son calendrier, pas le vôtre.

## Solution
Écrivez le plan de déploiement en tant que données, enregistrez-le avant la première étape, et
laissez le pipeline l'appliquer.

1. **Étapes avec un objectif.** Shadow (entrées en direct, sorties enregistrées non utilisées)
   prouve le comportement sur le trafic réel ; un test avec des utilisateurs formés prouve que la
   surveillance fonctionne ; un canary par rapport à un groupe de contrôle prouve l'absence de
   régression à l'échelle ; la disponibilité générale maintient les critères comme moniteurs en
   direct.
2. **Critères de retour en arrière pré-enregistrés.** Chaque étape énumère la métrique, la
   comparaison, le seuil, la fenêtre et les ventilations de groupe qui importent. Le plan est engagé
   et signé avant le début de l'étape ; une modification d'un seuil est un diff examiné avec un
   approbateur, jamais une modification sur un tableau de bord.
3. **Versions épinglées.** Le registre épingle les versions du modèle, du prompt, du corpus de
   récupération et du guardrail pour la ligne de base et le candidat. Une modification non épinglée
   détectée à l'exécution est elle-même un déclencheur de retour en arrière.
4. **Un chemin testé en arrière.** La commutation bleu-vert ou un drapeau de fonctionnalité retourne
   le trafic à la ligne de base, et la commutation est exercée dans l'étape shadow, avant que
   quiconque en dépende.
5. **Évaluation automatique.** Un travail d'analyse de canary compare le candidat et le contrôle par
   métrique et par groupe et écrit un verdict d'étape (promouvoir, maintenir, revenir en arrière)
   dans le magasin d'assurance. L'enregistrement go/no-go résume le déploiement dans son champ
   `rollout` (voir le [schéma go/no-go](/resources/templates#schema-go-no-go)).
6. **Les versions du fournisseur sont des versions.** Une nouvelle version de modèle du fournisseur
   s'exécute en shadow et canary par rapport à la version épinglée avant de prendre du trafic.

Plan de déploiement illustratif, enregistré avant l'étape shadow :

```json
{
  "plan_id": "ro-csa-01-2026-09",
  "subject": "csa-01@2026-09-18",
  "baseline": "csa-01@2026-08-30",
  "registered_at": "2026-09-15T09:00:00Z",
  "pinned": {
    "model": "vendor-model@2026-08-01",
    "prompt": "csa-prompt@41",
    "corpus": "csa-kb@2026-09",
    "guardrails": "gr-csa@12"
  },
  "stages": [
    {
      "stage": "shadow",
      "min_days": 7,
      "rollback_if": [{ "metric": "disagreement_with_baseline", "op": ">", "value": 0.08 }]
    },
    {
      "stage": "pilot",
      "exposure": "40 trained agents",
      "min_days": 14,
      "rollback_if": [
        { "metric": "override_rate", "op": ">", "value": 0.15 },
        { "metric": "complaints_per_1000", "op": ">", "value": 2.0 }
      ]
    },
    {
      "stage": "canary",
      "exposure_percent": 10,
      "control_group": true,
      "min_days": 14,
      "rollback_if": [
        { "metric": "groundedness", "op": "<", "value": 0.92 },
        { "metric": "resolution_rate_ratio_min_by_language", "op": "<", "value": 0.9 },
        { "metric": "severity_1_events", "op": ">", "value": 0 }
      ]
    },
    { "stage": "general_availability", "exposure_percent": 100 }
  ],
  "rollback_path": "blue-green switch to csa-01@2026-08-30; flag csa01.candidate off",
  "go_no_go": "gng-csa-01-2026-09-18"
}
```

> **Exemple (illustratif)** Le nouveau prompt d'un assistant d'assistance passe sa porte
> d'évaluation et entre en shadow. Dans le canary, le fondement se maintient globalement mais le
> taux de résolution pour les chats en langue portugaise tombe en dessous de 90 % du taux espagnol.
> Le critère pré-enregistré se déclenche, le drapeau retourne la cohorte de canary à la ligne de
> base en quelques minutes, et le verdict d'étape et l'événement de retour en arrière arrivent dans
> le magasin d'assurance avant que quiconque n'ait appelé une réunion.

## Conséquences
Les régressions sont détectées alors qu'elles affectent quelques utilisateurs, et chaque promotion
ou retour en arrière laisse un enregistrement lié aux critères définis à l'avance. Le coût est des
versions plus lentes, une infrastructure de canary, le travail statistique pour dimensionner les
étapes et les groupes, et la discipline de traiter les mises à jour de fournisseur et les
modifications de prompt comme des versions. Les critères trop stricts produisent une fatigue de
retour en arrière ; examinez-les avec leurs propriétaires sur le calendrier de maintenance.

## Motifs connexes
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Registry](/patterns/agent-registry);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondances :** Reglamento de IA de la UE art. 26(5), art. 60 · ISO/IEC 42001 A.6.2.5, A.6.2.6
· NIST AI RMF MANAGE 1.1, MEASURE 2.3, MANAGE 2.4 · Couche 04 Runtime Controls & Observability.

Les identifiants de contrôle suivent ISO/IEC 42001 Annex A [6] et les identifiants de sous-catégorie
le NIST AI RMF [5]. Les mappages sont illustratifs, non une affirmation de conformité.

## Sources

[1] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[2] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[3] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5) monitor, suspend and inform; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MANAGE 1.1 determination whether deployment should proceed; MEASURE 2.3 performance demonstrated for conditions similar to deployment; MANAGE 2.4 supersede, disengage or deactivate). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
