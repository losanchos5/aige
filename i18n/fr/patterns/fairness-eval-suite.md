---
lang: fr
source: bok/patterns/fairness-eval-suite.md
sourceHash: "90d2e8a073fc15049630c4372ec6456f8367ddee6b1f68b10f8b26916bb97f7f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fairness-eval-suite
title: Fairness Eval Suite
layer: 3
order: 22
summary: "Une suite d'équité versionnée en CI : métriques de groupe et intersectionnelles avec intervalles, une analyse de proxy et un test de contrefactuel, jugés par rapport à une politique fixée en premier."
---

# Motif : Fairness Eval Suite

**Résumé :** Versionnez une suite d'équité avec le modèle et exécutez-la derrière le portail
d'évaluation : métriques de groupe et intersectionnelles avec intervalles de confiance, un résultat
« données insuffisantes » pour les petites cellules, une analyse de proxy et un test de basculement
contrefactuel, chacun jugé par rapport à une politique d'équité (métrique, seuil, taille minimale de
cellule, approbateur) rédigée avant l'exécution. La suite émet un résultat structuré par métrique et
tranche, échoue la compilation lorsque la politique n'est pas respectée, et s'exécute à nouveau sur
les décisions en direct pour qu'un système qui était équitable à la mise en production ne puisse pas
dériver hors de celui-ci sans être vu.

## Objectifs
Transformez « est-ce équitable ? » en un petit ensemble de propriétés choisies et testables avec des
conséquences, pour qu'une mise en production qui traite un groupe pire que la politique ne
l'autorise ne soit pas déployée, et la preuve montre quelle métrique a été choisie, pourquoi, et ce
qu'elle a mesuré.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur ML, data scientist, conseil juridique et égalité.

## Parties prenantes affectées
Personnes soumises aux décisions du système, en particulier les groupes protégés et
intersectionnels, déployeurs, propriétaires de modèles, auditeurs, organismes pour l'égalité et
régulateurs.

## Principes pertinents
Commencez par un mode de défaillance ou un préjudice nommé ; donnez des dents à chaque contrôle ;
instrumentez la construction pour produire sa propre preuve.

## Contexte
Un système qui alloue quelque chose à des personnes (crédit, emplois, logement, prestations, prix)
ou les sert avec une qualité qui peut différer selon le groupe (reconnaissance, transcription,
réponses dans un dialecte). Pour les systèmes à haut risque, le règlement sur l'IA de l'UE exige que
les données soient examinées « en vue de détecter les biais possibles » et que des mesures « pour
détecter, prévenir et atténuer » les biais soient prises (`Art. 10(2)(f)` et `(g)`), que les
systèmes qui continuent à apprendre traitent les « boucles de rétroaction » biaisées (`Art. 15(4)`),
et que les instructions d'utilisation énoncent, le cas échéant, les performances « concernant des
personnes ou des groupes de personnes spécifiques » (`Art. 13(3)(b)(v)`) [1]. Le NIST AI RMF demande
que l'équité et les biais « soient évalués et que les résultats soient documentés » (MEASURE 2.11)
[2].

## Problème
L'équité est mesurée une seule fois, en agrégat, avec une métrique choisie après avoir vu les
résultats.

- **Forces.** Les critères courants entrent en conflit : quand les taux de base diffèrent entre les
  groupes, un score ne peut pas être calibré et avoir des taux d'erreur égaux entre les groupes à la
  fois [3], et les trois conditions de calibration et d'équilibre pour les deux classes ne peuvent
  pas tenir ensemble sauf dans des cas spéciaux très contraints [4]. Donc une métrique doit être
  choisie pour le cas d'usage, et le choix est une décision avec un propriétaire. Les nombres
  agrégés cachent les intersections : l'audit Gender Shades a trouvé des taux d'erreur jusqu'à 34,7
  % pour les femmes à peau plus foncée contre un maximum de 0,8 % pour les hommes à peau plus claire
  [5], et un classificateur peut sembler équitable sur chaque groupe prédéfini tout en échouant sur
  les sous-groupes structurés [6]. Les petites cellules rendent les estimations ponctuelles
  bruyantes. Le poids juridique des seuils familiers se déplace : la règle des quatre cinquièmes des
  Uniform Guidelines américaines est un écran avec des réserves de signification statistique et
  pratique [7], et en juin 2026 le ministère américain de la Justice a annoncé un avis concluant que
  les directives de disparité d'impact de l'EEOC sont inconstitutionnelles [8].
- **Mode de défaillance.** Un tableau de bord marque 0,81 en vert et 0,79 en rouge sans intervalle
  et sans échantillon minimum ; l'intersection la plus mal servie est moyennée ; la version est
  livrée sur une métrique choisie parce qu'elle a réussi ; et la dérive en production n'est pas
  mesurée parce que le test n'a été exécuté qu'au lancement.

## Solution
Écrivez d'abord la politique, puis construisez la suite qui peut échouer contre elle.

1. **Politique d'équité en tant que données.** Par système : les attributs protégés qui s'appliquent
   dans chaque juridiction et d'où proviennent leurs valeurs, la métrique choisie et la raison
   (ratio de taux de sélection pour l'allocation, écarts de taux d'erreur pour la qualité du
   service), le seuil, la taille minimale de cellule, la correction de comparaisons multiples et
   l'approbateur. Validez-la avant de regarder la prochaine exécution.
2. **Métriques de groupe et intersectionnelles avec intervalles.** Calculez les taux et les ratios
   par groupe et par cellule intersectionnelle, chacun avec un intervalle de confiance, et jugez la
   porte sur l'intervalle, pas sur le point. Les cellules en dessous du minimum rapportent « données
   insuffisantes » et sont listées, jamais comptées comme des réussites. Recherchez aussi la pire
   tranche que les tranchées listées.
3. **Analyse des proxies.** Entraînez un modèle pour prédire l'attribut protégé à partir des
   caractéristiques ; un prédicteur fort signale les proxies à justifier ou supprimer, et le
   résultat va dans la fiche de données.
4. **Test de retournement contrefactuel.** Changez uniquement l'attribut protégé, ou pour un modèle
   de langage échangez les termes d'identité dans des prompts par ailleurs identiques, et mesurez à
   quelle fréquence le résultat ou la qualité de la réponse change.
5. **Données de test légales.** Quand des données de catégories spéciales sont nécessaires pour la
   détection de biais, utilisez-les uniquement sur la base et dans les conditions de `Art. 4a`, que
   l'Omnibus numérique a inséré à la place de l'ancien `Art. 10(5)` [9] ; sinon enregistrez comment
   l'appartenance au groupe a été estimée et l'erreur que cela ajoute.
6. **Porte et fichier.** Émettez un résultat structuré par métrique et tranche, en réutilisant le
   [schéma de résultat d'évaluation](/resources/templates#schema-eval-result) publié
   (`eval-result.v1`), classez-le par rapport à l'entrée du registre et alimentez les nombres
   désagrégés dans la fiche de modèle. Une cellule défaillante fait échouer la compilation sauf si
   une justification signée est attachée à la version.
7. **Exécutez-le en direct.** Calculez les mêmes métriques sur les décisions de production sur une
   fenêtre glissante, avec les mêmes seuils, afin que la dérive déclenche une alerte avant une
   plainte. Quand un régime exige la publication, comme les audits de biais indépendants de la Local
   Law 144 de New York City avec des ratios d'impact selon le sexe, la race/ethnicité et les
   catégories intersectionnelles [10], les résultats de la suite sont l'entrée, pas un exercice
   séparé.

NIST SP 1270 est un cadre utile pour ce que la suite ne peut pas voir : le biais est systémique et
humain ainsi que statistique, et il est « impossible d'atteindre un risque zéro de biais » [11].

Résultat illustratif pour une tranche, valide contre `eval-result.v1` (l'intervalle et la politique
voyagent dans `extensions`) :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/eval-result.v1.json",
  "suite_id": "fairness.credit-dfc.v3",
  "model_version": "credit-dfc@2026-09-01",
  "score": 0.81,
  "threshold": 0.80,
  "result": "pass",
  "timestamp": "2026-09-18T09:40:12Z",
  "direction": "higher_is_better",
  "metric": "approval adverse-impact ratio, lower 95% bound, age 65+ against age 35-49",
  "failure_mode": "older applicants declined at a disproportionate rate",
  "obligation": "EU AI Act Art. 10(2)(f)-(g)",
  "sample_size": 1840,
  "extensions": {
    "point_estimate": 0.86,
    "ci95": [0.81, 0.91],
    "reference_group": "age_35_49",
    "min_cell": 200,
    "policy": "fairness-policy.credit.v2",
    "insufficient_data_cells": ["age_65_plus x region_islands"]
  }
}
```

> **Exemple (illustratif)** La suite d'un prêteur a jugé les taux d'approbation par tranche d'âge
> sur la limite inférieure de confiance du ratio d'impact défavorable, avec une cellule minimale
> de 200. La première exécution a réussi chaque tranche sur l'estimation ponctuelle et en a échoué
> une sur la limite ; la deuxième, sur un ensemble de test gelé plus grand, l'a réussie. Une
> intersection est restée en dessous de la cellule minimale, donc les notes de version la listent
> comme « données insuffisantes » et le propriétaire des données porte une condition pour en
> collecter plus avant le prochain réentraînement. Les mêmes métriques s'exécutent maintenant
> hebdomadairement sur les décisions en direct.

## Conséquences
Les revendications d'équité deviennent spécifiques, reproductibles et datées ; le choix de la
métrique et ses compromis sont enregistrés ; et les petits groupes ou groupes intersectionnels sont
rapportés plutôt que moyennés. Les coûts : l'accès légal aux attributs protégés est difficile et
parfois impossible, donc les estimations portent une erreur ; les intervalles s'élargissent avec de
petits échantillons, donc les suites ont besoin d'ensembles de test plus grands ; une suite réussie
ne prouve pas que le système est équitable en dehors de ce qu'il a mesuré ; et l'atténuation qu'elle
provoque peut elle-même être illégale dans certains contextes, donc les correctifs vont à l'examen
juridique avec la preuve attachée.

## Motifs connexes
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Explanation Artefact](/patterns/explanation-artefact);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Claims Substantiation Gate](/patterns/claims-substantiation-gate).

**Correspondances :** Règlement de l'IA Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4), Art. 4a ·
NYC Local Law 144 · 29 CFR 1607.4(D) · ISO/IEC 42001 A.5.4, A.6.2.4 · ISO/IEC TR 24027 · NIST AI RMF
(Measure 2.11) · Layer 03 Evals & Red Teaming as Evidence.

Les étiquettes de fonction et de sous-catégorie suivent le NIST AI RMF [2] ; les identifiants
ISO/IEC 42001 Annex A suivent un crosswalk publié, pas le texte de la norme [12] ; ISO/IEC TR 24027
est référencé par identifiant et titre uniquement [13]. Les mappages sont illustratifs, pas une
revendication de conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(f)-(g) examination for and mitigation of possible biases; Art. 13(3)(b)(v) performance regarding specific persons or groups in the instructions for use; Art. 15(4) feedback loops in systems that continue to learn (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.11 fairness and bias "evaluated and results are documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[4] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[5] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[6] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[7] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[8] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[11] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[12] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.4 assessing AI system impact on individuals and groups, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
[13] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
