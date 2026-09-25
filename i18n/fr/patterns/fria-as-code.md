---
lang: fr
source: bok/patterns/fria-as-code.md
sourceHash: "dd24efa21bad73918c74ee9e686aba9d023e209a786d176e3dcc383f4058f3b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "Chaque analyse d'impact (ISO/IEC 42005 AIIA, AIPD, FRIA) conservée comme une base de faits versionnée, liée à ses contrôles et rouverte quand le système change."
---

# Motif : FRIA-as-Code

**Résumé :** Maintenez l'analyse d'impact sur les droits fondamentaux comme un artefact versionné et
révisable référencé croisé à l'analyse d'impact sur la protection des données, afin qu'une analyse
des droits soit une entrée à la conception qui se met à jour avec le système, pas un document
produit une fois et classé. Généralisé, c'est **Impact-Assessment-as-Code** : chaque analyse
d'impact qu'un système déclenche (l'analyse d'impact du système d'IA, ou AIIA, que décrit ISO/IEC
42005, l'AIPD du RGPD et la FRIA du Règlement de l'IA) est une base de faits partagée avec plusieurs
vues, chacune avec son propre déclencheur, examinateur et règle de réévaluation. Le modèle garde son
nom et son adresse d'origine afin que les liens publiés vers lui se résolvent toujours.

## Objectifs
Gardez la FRIA et sa référence croisée AIPD en direct et liées aux contrôles qu'elles exigent, afin
qu'un changement dans le système déclenche un examen de son impact sur les droits. Étendez la même
discipline à l'AIIA, afin qu'un ensemble de faits sur les groupes affectés, les préjudices et les
contrôles alimente chaque analyse et qu'aucune deux analyses ne désaccordent sur le même système.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, DPO, juridique/conformité, l'équipe de modèle qui exécute l'AIIA.

## Parties prenantes affectées
Titulaires de données, personnes affectées (y compris les personnes qui n'utilisent jamais le
système), déployeurs, fournisseurs, régulateurs.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; instrumentez la compilation pour
produire sa propre preuve.

## Contexte
Un responsable de l'implantation d'un système de IA à haut risque soumis à l'article 27 du règlement
sur l'IA de l'UE, qui doit procéder à une analyse d'impact sur les droits fondamentaux, où une AIPD
au titre de l'article 35 du RGPD peut déjà exister et se chevaucher. Du côté du fournisseur, une
organisation exploitant un système de gestion de l'IA évalue l'impact de chaque système de IA sur
les individus, les groupes et la société tout au long de son cycle de vie, comme le demande l'annexe
A.5 de l'ISO/IEC 42001 et comme le guide l'ISO/IEC 42005. Un système peut être soumis aux trois à la
fois.

## Problème
Une analyse d'impact sur les droits fondamentales rédigée une seule fois sous forme de document Word
décrit l'impact sur les droits à un moment donné et n'est jamais réexaminée lorsque le système
change. L'effort dupliqué entre l'analyse d'impact sur les droits fondamentales et l'AIPD gaspille
du travail et laisse les deux désynchronisées. Ajoutez une analyse d'impact sur l'IA distincte
rédigée par l'équipe du modèle et l'organisation détient trois comptes rendus des mêmes préjudices,
notés sur des échelles différentes, examinés par des personnes différentes, et obsolètes à des dates
différentes.

## Solution
Modélisez l'analyse d'impact sur les droits fondamentales sous forme de données structurées couvrant
l'utilisation prévue, les groupes affectés, les risques pour les droits, et les contrôles
d'atténuation, chaque atténuation étant liée au contrôle qui la met en œuvre (une Policy Card, une
Eval Gate, un guardrail). Référencez l'AIPD de manière à ce que les éléments partagés ne soient
écrits qu'une seule fois. Stockez-la avec l'entrée du registre et rouvrez-la en cas de changement
significatif. L'analyse d'impact sur les droits fondamentales de l'article 27 du règlement sur l'IA
de l'UE et sa référence croisée à l'AIPD définissent la portée [1].

> **Exemple (illustratif)** L'analyse d'impact sur les droits fondamentales d'un système
> d'admissibilité aux prestations lie chaque risque identifié aux droits des personnes à une
> évaluation et un guardrail spécifiques ; lorsque le modèle est réentraîné, l'analyse d'impact sur
> les droits fondamentales signale quelles atténuations doivent être re-vérifiées.

### Une base de faits, trois vues

Conservez un enregistrement par système avec les faits dont chaque évaluation a besoin :
l'utilisation prévue et les utilisations hors champ, les groupes affectés, chaque préjudice noté sur
les mêmes dimensions (gravité, ampleur, réversibilité, durée, probabilité), et chaque atténuation
avec l'identifiant du contrôle et de l'évaluation qui la mettent en œuvre. Rendez les trois
évaluations sous forme de vues de cet enregistrement. Le schéma house
[`impact-assessment.v1.json`](/schemas/impact-assessment.v1.json) le fait avec un champ `type`
(`aiia`, `dpia_addendum`, `fria`), des champs partagés pour les risques, les atténuations et le
résultat, et des champs spécifiques au type pour ce que seule une évaluation demande ; un modèle
[Markdown](/templates/impact-assessment.md) remplissable se trouve à côté.

| Vue | Qui l'effectue | Ce qui la déclenche | Quand | Ce qu'elle ajoute aux faits partagés |
|---|---|---|---|---|
| AIIA (ISO/IEC 42005) | L'organisation développant ou fournissant le système | Son système de gestion de l'IA (ISO/IEC 42001 A.5.2 à A.5.5) | Tout au long du cycle de vie, à partir de la conception [2][3] | Impacts sociétaux ; documentation de l'évaluation elle-même |
| AIPD (RGPD art. 35) | Le responsable du traitement | Traitement susceptible de présenter un risque élevé | Avant le traitement [4] | Nécessité et proportionnalité ; l'avis du DPO ; consultation préalable si le risque élevé persiste |
| FRIA (Reglamento de IA art. 27) | Responsables du déploiement d'organismes publics et de services publics, et responsables du déploiement de systèmes relevant des points 5(b) et (c) de l'annexe III | Première utilisation d'un système à haut risque relevant de l'annexe III (non point 2) | Avant la première utilisation [1] | Catégories affectées, mesures de surveillance, arrangements en matière de plaintes ; résultats notifiés à l'autorité de fiscalisation du marché |

Deux règles maintiennent les vues honnêtes. Une analyse d'impact sur les droits fondamentales peut
s'appuyer sur une AIPD qui couvre déjà le même terrain (`Art. 27(4)`) [1], de sorte que les champs
partagés ne sont écrits qu'une seule fois et référencés, jamais copiés. Et une vue n'est jamais
modifiée seule : une modification des faits régénère chaque vue, de sorte que l'AIPD ne peut pas
dire une chose sur les groupes affectés tandis que l'analyse d'impact sur les droits fondamentales
en dit une autre.

### Les déclencheurs de réévaluation en tant que code

Écrivez les déclencheurs comme des conditions que le registre évalue, et non comme des rappels
calendaires : une finalité prévue nouvelle ou élargie ; un réentraînement sur une nouvelle source de
données ; une nouvelle population affectée, langue ou juridiction ; un seuil modifié ; un incident
ou un quasi-incident du [pipeline d'incidents](/patterns/incident-pipeline) ; un signal de
surveillance en dehors de sa bande ; une nouvelle loi ou orientation ; et une date d'examen
programmée. Le règlement sur l'IA demande au responsable du déploiement de mettre à jour l'analyse
d'impact sur les droits fondamentales lorsqu'un élément évalué change [1], et le RGPD demande un
examen lorsque le risque du traitement change [4] ; un seul déclencheur rouvre chaque vue que le
changement touche, et l'examinateur voit une différence plutôt que trois nouveaux documents. Le
[chapitre 14](/bok/governing-development#impact-assessments-compared) compare ces évaluations avec
les évaluations d'impact algorithmique, les audits de biais et les validations de modèles qui
peuvent rejoindre la même base de faits.

### Réalisation par rapport à examen

L'auteur possède les faits ; l'examinateur les conteste. Avant l'approbation, l'examinateur vérifie
que la portée correspond à l'enregistrement de cas d'usage actuel, que les groupes affectés incluent
les personnes qui n'utilisent jamais le système, que chaque évaluation des risques cite des preuves
(un identifiant d'évaluation, un rapport de test, un profil de données), que chaque atténuation est
liée à un contrôle qui s'exécute, que le risque résiduel est accepté par quelqu'un ayant l'autorité
de l'accepter, et que les déclencheurs sont écrits comme des conditions qu'un pipeline peut évaluer.
Conservez le verdict et le nom de l'examinateur dans l'enregistrement, de sorte qu'un auditeur
puisse voir qui a contesté quoi.

## Conséquences
L'évaluation des droits reste actuelle et traçable aux contrôles, et les chevauchements avec l'AIPD
ne sont pas dupliqués. L'analyse d'impact sur l'IA, l'AIPD et l'analyse d'impact sur les droits
fondamentales s'accordent parce qu'elles lisent les mêmes faits, et un changement de système rouvre
tous les trois à la fois. Le coût est la modélisation, l'accord sur une seule échelle de notation
entre le droit, la confidentialité et l'ingénierie, et la discipline de traiter l'évaluation comme
vivante.

## Motifs connexes
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondances :** Article 27 du règlement sur l'IA de l'UE (analyse d'impact sur les droits
fondamentales), article 9 · Article 35 du RGPD (AIPD) · ISO/IEC 42005 · NIST AI RMF (Map) · Couche
01 Governance-as-Code / Couche 02 Inventory & Transparency.

Les étiquettes de fonction suivent le NIST AI RMF [5]. Les mappages sont illustratifs, non une
affirmation de conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c) systems; before first use; update when an assessed element changes; results notified to the market-surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[3] ISO/IEC 42001:2023, Annex A.5 (A.5.2 AI system impact assessment process; A.5.3 documentation of AI system impact assessments; A.5.4 impact on individuals or groups of individuals; A.5.5 societal impacts). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Regulation (EU) 2016/679 (GDPR), Art. 35 (data protection impact assessment: 35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes) and Art. 36 (prior consultation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
