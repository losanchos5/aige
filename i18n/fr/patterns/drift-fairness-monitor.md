---
lang: fr
source: bok/patterns/drift-fairness-monitor.md
sourceHash: "b9828bdd1d92a29e23961aa63df5e010aeeec6aaebd0c9f3196fee218e82cbf5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: drift-fairness-monitor
title: "Drift & Fairness Monitor"
layer: 4
secondaryLayer: 5
order: 30
summary: "Signaux de production pour la dérive, la qualité et l'équité par groupe, chacun avec un seuil, un propriétaire et une conséquence pré-convenue, écrits comme preuves."
---

# Motif : Drift & Fairness Monitor

**Résumé :** Surveillez un système déployé pour les façons dont il s'éloigne de l'état dans lequel
il a été approuvé : dérive d'entrée, d'étiquette, de concept, de pipeline, de modèle fournisseur et
d'utilisation, et qualité et équité par groupe. Chaque signal a un seuil, un propriétaire et une
conséquence pré-convenue (un problème, un réentraînement, un mode dégradé, un incident, un
disjoncteur déclenché), et chaque évaluation écrit un enregistrement de preuve, donc « le modèle est
toujours apte et équitable » est une requête sur la télémétrie plutôt qu'une croyance du jour du
lancement.

## Objectifs
Détectez la perte de performance ou d'équité en production avant que les personnes affectées ne la
détectent, acheminez chaque violation vers quelqu'un qui peut agir, et conservez un enregistrement
continu que le système a été surveillé par rapport aux planchers que sa décision de déploiement a
fixés.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, plateforme ML en astreinte, data scientist, propriétaire du
système.

## Parties prenantes affectées
Personnes affectées, en particulier les groupes que le système peut désavantager ; opérateurs et
examinateurs ; la fonction risque ; fournisseurs et déployeurs qui partagent le devoir de
surveillance.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; donnez des dents à chaque contrôle ;
instrumentez la construction pour produire sa propre preuve.

## Contexte
Un système qui a réussi ses évaluations au lancement peut dériver vers l'erreur ou l'inéquité sans
aucun changement de code. La dérive de concept, un changement au fil du temps dans la relation qu'un
modèle a apprise, est un problème étudié dont le travail se divise en détection, compréhension et
adaptation [1]. Le règlement de l'IA demande aux fournisseurs de systèmes à haut risque de mener une
surveillance après commercialisation et aux déployeurs de surveiller l'exploitation sur la base des
instructions d'utilisation, en suspendant l'utilisation et en informant le fournisseur où le système
présente un risque (`Art. 72`, `Art. 26(5)`), et demande aux systèmes qui continuent à apprendre de
traiter les boucles de rétroaction biaisées (`Art. 15(4)`) [2]. Là où la surveillance des biais
nécessite des catégories spéciales de données à caractère personnel, l'omnibus numérique fixe les
conditions dans un nouveau `Art. 4a` [3]. Certaines lois exigent des audits périodiques purement et
simplement : la Local Law 144 de New York City exige un audit des biais dans l'année précédant
l'utilisation d'un outil de décision automatisée en matière d'emploi [4]. Le NIST AI RMF demande que
la fonctionnalité et le comportement soient surveillés en production et que l'équité et les biais
soient évalués et documentés [5].

## Problème
Les tableaux de bord sans seuils ne sont surveillés par personne. Les étiquettes arrivent tard ou
jamais, donc la précision ne peut pas être mesurée quand cela compte. L'attribut de groupe
nécessaire pour mesurer l'équité est généralement absent à l'exécution. Un système génératif peut se
dégrader (plus de réponses sans fondement, plus de refus dans une langue) tandis que chaque métrique
d'infrastructure reste verte. Et une violation qui ne page personne n'est qu'un graphique.

### Enjeux
- **Délai d'étiquetage contre opportunité.** Les proxies sans résultat (dérive d'entrée, taux de
  sélection, remplacements, plaintes) arrivent maintenant ; la performance sur les étiquettes
  fraîches arrive plus tard et c'est ce qui compte.
- **Sensibilité contre fatigue d'alerte.** Les seuils serrés détectent la dérive tôt et pagent les
  gens pour le bruit.
- **Mesure d'équité contre confidentialité.** Mesurer par groupe nécessite l'attribut de groupe, qui
  est souvent des données de catégories spéciales avec ses propres conditions légales.
- **Devoir partagé.** Le fournisseur et le déployeur surveillent chacun une partie du système et
  voient des données différentes.

## Solution
Exécutez le moniteur comme un chemin de signal de couche 04 qui écrit une preuve de couche 05,
piloté par un plan de surveillance qui est des données.

1. **Nommez ce qui peut bouger.** Pour chaque système, énumérez les classes de dérive qui
   s'appliquent : données (distribution d'entrée), étiquette (taux de base), concept (relation
   entrée-résultat), pipeline (schéma en amont ou étape de récupération), modèle fournisseur (le
   modèle derrière l'API) et utilisation (qui l'utilise, pour quoi). Choisissez une statistique par
   classe : un indice de stabilité ou un test à deux échantillons sur les caractéristiques ou les
   plongements par rapport à une fenêtre de référence ; taux positif prédit par rapport à observé ;
   performance sur les étiquettes fraîches avec détection de point de changement ; contrats de
   données ; vérifications de verrouillage de version ; classification de sujets du trafic par
   rapport à l'espace négatif.
2. **Équité par groupe, avec et sans étiquettes.** Surveillez les taux de sélection ou d'approbation
   par groupe sans étiquette nécessaire ; taux d'erreur et d'étalonnage par groupe une fois que les
   résultats arrivent, avec le délai d'étiquetage indiqué ; taux de remplacement, de plainte et de
   contestation par groupe du
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path) ; et, pour les systèmes
   génératifs, taux de fondement et de refus par sujet et langue. Là où l'attribut de groupe n'est
   pas détenu à l'exécution, utilisez un échantillon consenti ou un audit périodique dans un
   environnement sécurisé.
3. **Seuil, propriétaire, conséquence.** Chaque métrique du plan porte un seuil, une fenêtre, un
   propriétaire nommé qui peut être pagé, et l'action qu'une violation déclenche : ouvrir un
   problème, planifier un réentraînement, basculer un mode dégradé, ouvrir un incident via le
   [Incident Pipeline](/patterns/incident-pipeline), ou déclencher le
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).
4. **Preuve à chaque évaluation.** Chaque vérification écrit un enregistrement de preuve dans le
   magasin d'assurance via
   [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), réussi ou échoué,
   donc l'absence de violations est elle-même prouvée.
5. **Le plan comme données.** Le plan de surveillance du déployeur réutilise le
   [schéma du plan de surveillance après commercialisation](/resources/templates#schema-post-market-monitoring-plan),
   et un changement de seuil est une diff examinée, comme tout changement de contrôle.

Plan de surveillance illustratif pour un assistant d'assistance, comme un enregistrement du plan de
surveillance après commercialisation :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json",
  "plan_id": "mon-csa-01",
  "subject": "csa-01@2026-09-18",
  "scope": "All chats in ES and PT, including escalations to human agents and customer complaints.",
  "data_sources": [
    { "source": "chat telemetry with groundedness scores", "type": "telemetry", "owner": "ml-platform" },
    { "source": "agent overrides and escalations", "type": "deployer_feedback", "owner": "contact-centre-ops" },
    { "source": "complaints that mention the assistant", "type": "user_complaint", "owner": "customer-care" },
    { "source": "monthly re-run of the regression suite on sampled chats", "type": "eval_rerun", "owner": "model-validation" }
  ],
  "metrics": [
    {
      "metric": "groundedness of sampled answers",
      "threshold": "< 0.90 over 7 days",
      "cadence": "daily",
      "failure_mode": "ungrounded answers",
      "alert_route": "ml-platform"
    },
    {
      "metric": "resolution-rate ratio, lowest language to highest",
      "threshold": "< 0.90 over 14 days",
      "cadence": "weekly",
      "failure_mode": "worse service for one language group",
      "alert_route": "ai-governance"
    },
    {
      "metric": "share of chats classified outside the intended topics",
      "threshold": "> 5% over 7 days",
      "cadence": "daily",
      "failure_mode": "usage drift into unapproved use",
      "alert_route": "system-owner"
    }
  ],
  "drift_signals": ["embedding drift on user turns", "topic mix", "vendor model version pin"],
  "triggers": [
    { "condition": "groundedness breach for two consecutive windows", "action": "rollback", "owner": "system-owner" },
    { "condition": "language resolution ratio breach", "action": "investigate", "owner": "ai-governance" },
    { "condition": "unpinned vendor model version detected", "action": "suspend", "owner": "ml-platform" }
  ],
  "feedback_channels": ["in-chat feedback", "complaint form", "contest path for account decisions"],
  "retraining_policy": "A retrain, prompt change or corpus refresh is a release and goes through the staged rollout.",
  "review_cadence": "Thresholds reviewed quarterly with their owners",
  "owner": "system-owner",
  "effective_from": "2026-09-18"
}
```

> **Exemple (illustratif)** Trois semaines après qu'une mise à jour du modèle fournisseur ait réussi
> son canary, la métrique de dérive d'utilisation augmente : le personnel a commencé à poser des
> questions RH à l'assistant client. La violation ouvre un problème pour le propriétaire du système,
> qui ajoute les sujets RH à la liste des utilisations interdites et les achemine vers le portail RH
> ; la métrique retombe sous le seuil, et le problème, le changement et la récupération sont tous
> dans le magasin d'assurance.

## Conséquences
La dérive et l'inéquité sont détectées comme des signaux avec des propriétaires plutôt que
découvertes comme des incidents, et les audits périodiques deviennent bon marché parce que la
télémétrie existe déjà. Le coût est la capacité d'étiquetage et d'échantillonnage, le soin
statistique dans les seuils (les métriques par groupe sur les petits groupes sont bruyantes), le
travail de confidentialité pour les attributs de groupe, et la couverture en astreinte pour chaque
signal qui peut pager.

## Motifs connexes
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path).

**Correspondances :** Règlement de l'IA art. 4a, art. 15(4), art. 26(5), art. 72 · NYC Local Law 144
· ISO/IEC 42001 A.5.4, A.6.2.6 · NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1 ·
Couche 04 Runtime Controls & Observability / Couche 05 Assurance & Continuous Compliance.

Les identifiants de contrôle suivent ISO/IEC 42001 Annex A [6] et les identifiants de sous-catégorie
le NIST AI RMF [5]. Les mappages sont illustratifs, non une affirmation de conformité.

## Sources

[1] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[2] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 15(4) feedback loops in systems that continue to learn; Art. 26(5) deployer monitoring, suspension and information; Art. 72 post-market monitoring by providers). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special categories of personal data for bias detection and correction); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.4 functionality and behaviour monitored in production; MEASURE 2.11 fairness and bias evaluated and documented; MEASURE 3.1 existing, unanticipated and emergent risks tracked; MANAGE 4.1 post-deployment monitoring plans). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.5.4 assessing AI system impact on individuals or groups of individuals; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
