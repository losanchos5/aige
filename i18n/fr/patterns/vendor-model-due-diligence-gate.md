---
lang: fr
source: bok/patterns/vendor-model-due-diligence-gate.md
sourceHash: "61ed551de3df62c18170990d3246c6031fd5fb0989f823ca33dd889e35bd71f9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: vendor-model-due-diligence-gate
title: "Vendor / Model Due-Diligence Gate"
layer: 2
secondaryLayer: 5
order: 17
summary: "Une porte de diligence raisonnable structurée pour l'IA achetée et API uniquement qui enregistre ce que vous pouvez et ne pouvez pas vérifier avant que le système n'atteigne la production."
---

# Motif : Vendor / Model Due-Diligence Gate

**Résumé :** Contrôlez l'approvisionnement ou l'intégration d'un système d'IA tiers (SaaS avec un
LLM intégré, un modèle de fondation API uniquement, un agent du fournisseur) sur une évaluation de
diligence raisonnable structurée, afin qu'un modèle que vous ne possédez pas entre toujours par un
contrôle qui enregistre ce que vous pouvez et ne pouvez pas vérifier à son sujet. Lorsque vous ne
possédez pas le modèle, cette porte est ce qui remplace l'équipe rouge que vous ne pouvez pas
exécuter.

## Objectifs
Amenez l'IA achetée et API uniquement sous la même discipline de registre et d'assurance que les
systèmes que vous construisez, et rendez les limites de votre vérification explicites plutôt que
supposées.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, approvisionnement, ingénieur en sécurité, DPO.

## Parties prenantes affectées
Responsables du déploiement, fournisseurs de modèles, titulaires de données, auditeurs, régulateurs.

## Principes pertinents
Enregistrez et délimitez chaque acteur avant qu'il n'agisse ; partez d'un mode de défaillance ou
d'un préjudice nommé.

## Contexte
Une organisation qui consomme beaucoup plus d'IA qu'elle n'en entraîne : des fonctionnalités SaaS
avec un LLM intégré, des modèles de fondation hébergés accessibles uniquement par API, des agents
expédiés à l'intérieur du produit d'un fournisseur. Les poids, les données d'entraînement et les
garde-fous internes appartiennent à quelqu'un d'autre.

## Problème
Les parties du stack qui supposent que vous possédez le modèle se dégradent quand vous ne le
possédez pas. Vous ne pouvez pas faire d'équipe rouge sur des poids que vous ne pouvez pas
atteindre, donc une porte d'évaluation (couche 03) ne peut tester que le système du fournisseur
comme une boîte noire à sa limite ; le contrôle d'exécution (couche 04) se rétrécit aux portées
d'outils, à l'identité et au trafic que l'intégration expose, pas au comportement du modèle
lui-même. Laissée sans gouvernance, l'IA achetée devient la flotte fantôme avec un contrat : en
production, non évaluée, et en dehors du registre.

## Solution
Faites de la diligence raisonnable une porte que tout système d'IA acheté ou intégré doit franchir
avant d'atteindre la production, et structurez l'évaluation sur un modèle plutôt que sur un
questionnaire ad hoc ; les champs d'évaluation des fournisseurs du Responsible AI Pattern Catalogue
du CSIRO constituent un point de départ utilisable [1]. Évaluez, au minimum : les évaluations
propres du fournisseur et les preuves de red-team (ce qu'il partagera et son indépendance) ; la
fiche de modèle, la documentation du fournisseur et tout AIBOM que vous pouvez obtenir ; la base
juridique et les flux de données, notamment si vos entrées entraînent son modèle ; les portées des
outils et l'identité que vous accorderez à l'agent du fournisseur ; les engagements du fournisseur
en matière de signalement d'incidents ; et le droit contractuel d'audit et d'être notifié de tout
changement matériel. Enregistrez le résultat comme une entrée du registre avec un propriétaire et
une portée, et rouvrez la porte lors du renouvellement ou en cas de changement matériel du modèle.
Ancrez l'évaluation dans l'annexe A.10 de l'ISO/IEC 42001 (relations avec les tiers et les clients)
[2], l'allocation des responsabilités le long de la chaîne de valeur du Reglamento de IA
(obligations du fournisseur par rapport aux obligations du responsable du déploiement selon les
articles 25, 26 et 27 [3]) et, pour les modèles à usage général, la transparence et la documentation
que le Code de pratique GPAI s'attend à ce que les fournisseurs fournissent [4]. Lorsque vous ne
pouvez pas vérifier un contrôle, enregistrez-le, et compensez en limitant l'intégration : portées de
moindre privilège, évaluations de limite, et observation d'exécution plus étroite du trafic que vous
contrôlez.

> **Exemple (illustratif)** Une équipe intégrant un modèle fondamental en API uniquement ne peut pas
> tester ses poids, donc la porte capture les évaluations publiées du fournisseur, restreint le
> modèle à une identité de service délimitée sans accès aux données permanentes, ajoute une
> évaluation de limite sur les propres prompts de l'équipe, et classe l'évaluation entière comme
> entrée du registre du système, marquée « attestée par le fournisseur » lorsque l'équipe s'est
> appuyée sur les preuves du fournisseur plutôt que sur les siennes.

### Exploiter : avis de changement, réévaluation et secours

Franchir la porte une fois prouve peu de chose sur un système qui continue de changer après la
signature du contrat. L'étape d'exploitation maintient la porte ouverte aussi longtemps que le
système fonctionne.

- **Traitez chaque avis de changement et de dépréciation comme un événement.** Classez chaque avis
  du fournisseur (une nouvelle version du modèle, un changement de défaut, une date de dépréciation,
  un nouveau sous-traitant, de nouvelles conditions d'utilisation des données) par rapport à
  l'entrée du registre, et relancez l'évaluation de limite par rapport au système modifié avant que
  le changement n'atteigne les utilisateurs, partout où le contrat vous permet de fixer une version.
  Une date de dépréciation devient un jalon daté sur l'entrée, avec un propriétaire pour la décision
  de migration.
- **Détectez le changement que personne n'a annoncé.** Exécutez un petit ensemble canari de
  l'évaluation de limite selon un calendrier par rapport au point de terminaison en direct et
  alertez lorsque ses résultats sortent de leur bande. Un changement détecté sans avis est une
  constatation en vertu du contrat. MITRE ATLAS catalogue la forme adversariale du même risque, un
  retrait de la chaîne d'approvisionnement, dans lequel un composant gagne la confiance puis expédie
  une mise à jour malveillante (`AML.T0109`) [5].
- **Réévaluez selon les déclencheurs et par niveau, pas seulement au renouvellement.** Rouvrez la
  porte selon un calendrier défini par le niveau de risque et sur tout déclencheur : un incident
  chez le fournisseur ou dans votre propre déploiement, un changement de propriété ou de
  sous-traitants, un changement réglementaire, un changement matériel du modèle. Le NIST AI RMF
  demande que les risques tiers soient surveillés régulièrement et que les modèles pré-entraînés
  soient surveillés dans le cadre de la maintenance du système (MANAGE 3.1 et 3.2) [6].
- **Gardez un secours que vous avez testé.** Gardez un modèle alternatif actif dans le harnais
  d'évaluation, un processus manuel que le personnel a pratiqué et les modes dégradés auxquels le
  système peut revenir, et testez le basculement avec un minuteur en marche. Le NIST AI RMF demande
  des processus de contingence pour les défaillances dans les systèmes tiers jugés à haut risque
  (GOVERN 6.2) [7]. Le même basculement est la façon dont un responsable du déploiement remplit son
  devoir de surveiller un système à haut risque sur la base des instructions d'utilisation et de
  suspendre l'utilisation lorsqu'il présente un risque (`Art. 26(5)`) [3] ; le
  [Pipeline d'incidents](/patterns/incident-pipeline) est propriétaire de la notification au
  fournisseur.

L'aspect continuité et sortie de cette étape (pannes, modèles retirés, migrations forcées, sortie
contractuelle) est exposé au
[chapitre 15](/bok/governing-deployment#when-the-provider-fails-continuity).

> **Exemple (illustratif)** Un fournisseur annonce que la version du modèle derrière un assistant de
> triage des réclamations sera retirée dans 90 jours. L'avis est classé sur l'entrée du registre
> avec la date comme jalon ; l'évaluation de limite s'exécute par rapport à la version successeur la
> même semaine et montre une baisse sur deux métriques de sous-groupe ; l'équipe enregistre une
> décision de migration avec un seuil de compensation, et un exercice programmé prouve que le
> basculement vers la file d'attente manuelle prend moins de dix minutes.

## Conséquences
L'IA achetée est inventoriée et délimitée, et la dépendance aux preuves fournies par le fournisseur
est explicite plutôt que cachée. Le coût est réel : les couches 03 et 04 donnent moins d'assurance
sur un modèle que vous ne possédez pas, et la porte dépend de la coopération du fournisseur et des
conditions contractuelles que vous ne pouvez pas entièrement remporter. L'étape d'exploitation
ajoute un coût permanent : des exécutions canari par rapport à un point de terminaison en direct, un
modèle alternatif actif qui doit rester à jour, et des exercices qui prouvent que le secours
fonctionne toujours.

## Motifs connexes
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondances :** Reglamento de IA art. 25 (responsabilités de la chaîne de valeur), art. 26
(obligations du responsable du déploiement), art. 27 (FRIA), art. 53 (documentation GPAI) · ISO/IEC
42001 annexe A.10 · Code de pratique GPAI · NIST AI RMF (Map, Govern) · Couche 02 Inventory &
Transparency / Couche 05 Assurance & Continuous Compliance.

Les étiquettes de fonction suivent le NIST AI RMF [8]. Les mappages sont illustratifs, non une
affirmation de conformité.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations, incl. 26(5) monitoring on the basis of the instructions for use, informing the provider and suspending use), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] MITRE ATLAS data, release v2026.09 (AML.T0109 AI Supply Chain Rug Pull; AML.T0010 AI Supply Chain Compromise). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[6] NIST AI RMF Playbook, MANAGE (3.1 third-party risks monitored; 3.2 pre-trained models monitored; 2.4 supersede, disengage or deactivate). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[7] NIST AI RMF Playbook, GOVERN (6.1 third-party risk policies; 6.2 contingency processes for failures in third-party systems deemed high-risk). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[8] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
