---
lang: fr
source: bok/patterns/claims-substantiation-gate.md
sourceHash: "8aa53627e138fdeb83eabfc7f57afd3ad70d870c8fcec31a058c678db4692172"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: claims-substantiation-gate
title: Claims Substantiation Gate
layer: 5
secondaryLayer: 3
order: 25
summary: "Un registre de réclamations qui lie chaque déclaration publique sur la précision, l'équité ou la capacité d'un système d'IA à l'exécution d'évaluation qui la soutient, et retire les réclamations obsolètes."
---

# Motif : Claims Substantiation Gate

**Résumé :** Tenez un registre de chaque déclaration publique sur ce qu'un système d'IA fait et avec
quelle efficacité : précision, équité, sécurité, autonomie, capacité « alimentée par l'IA ». Chaque
réclamation est une ligne qui cite l'exécution d'évaluation la soutenant, la population et les
conditions sur lesquelles elle a été mesurée, et la date. Une porte bloque la publication d'une
réclamation sans preuve en direct, et chaque version de modèle réexécute les évaluations citées et
signale toute réclamation que la nouvelle version ne soutient plus. C'est une porte d'évaluation
pointée vers le texte marketing, le matériel de vente et les chiffres de précision déclarés dans les
instructions d'utilisation.

## Objectifs
Dites seulement ce que la preuve soutient, pour la population que la réclamation décrit, et
continuez à le dire seulement tant que cela reste vrai ; et soyez capable de montrer, pour toute
réclamation, ce qui l'a soutenue le jour où elle a été faite.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, marketing produit, activation des ventes, ingénieur ML, conseil
juridique et droit de la consommation, relations avec les investisseurs.

## Parties prenantes affectées
Clients et consommateurs, déployeurs qui s'appuient sur les chiffres du fournisseur, investisseurs,
régulateurs de la protection des consommateurs et financiers, autorités de surveillance du marché.

## Principes pertinents
Donnez des dents à chaque contrôle ; instrumentez la construction pour produire sa propre preuve ;
partez d'un mode de défaillance ou d'un préjudice nommé.

## Contexte
Les pages produits, les présentations commerciales, les appels d'offres, les matériels
d'investisseurs, les fiches de modèle et les instructions d'utilisation disent tous avec quelle
précision, équité, sécurité ou autonomie un système fonctionne. Le texte est écrit une fois et
appartient au marketing ; la preuve est produite par ML et change à chaque version. Les régulateurs
lisent ce texte. L'Operation AI Comply de la FTC a annoncé qu'« il n'y a pas d'exemption IA aux lois
en vigueur » [1] ; son ordonnance Workado a suivi une réclamation de 98 % de précision pour un
détecteur de contenu IA que les tests ont placé à 53 % sur le contenu à usage général, et exige une
preuve compétente et fiable pour de telles réclamations [2]. La SEC s'est entendue avec deux
conseillers en placement sur des déclarations fausses et trompeuses concernant leur utilisation de
l'IA [3]. En vertu du Règlement de l'IA de l'UE, la finalité prévue elle-même est définie en partie
par les « matériels et déclarations promotionnels ou commerciaux » du fournisseur (`Art. 3(12)`), et
pour les systèmes à haut risque les « niveaux de précision et les métriques de précision pertinentes
» doivent être déclarés dans les instructions d'utilisation (`Art. 15(3)`), en indiquant le niveau «
par rapport auquel le système d'IA à haut risque a été testé et validé » (`Art. 13(3)(b)(ii)`) [4].

## Problème
Les réclamations survivent à la preuve qui les a autrefois soutenues, ou n'en ont jamais eu.

- **Forces.** Le marketing veut un nombre simple ; le nombre honnête a un intervalle et une
  population. Les évaluations sont exécutées sur les données à portée de main, pas sur la population
  que la réclamation décrit : le détecteur de Workado a été entraîné sur du texte académique, et la
  réclamation a échoué sur tout le reste [2]. Les chiffres des fournisseurs sont répétés comme s'ils
  étaient mesurés en interne. La tromperie, selon la politique de la FTC, est une représentation,
  une omission ou une pratique susceptible d'induire en erreur un consommateur agissant
  raisonnablement, et matérielle [5] ; la Directive de l'UE sur les pratiques commerciales déloyales
  et la Loi 2024 sur les marchés numériques, la concurrence et les consommateurs du Royaume-Uni
  interdisent les pratiques commerciales déloyales en termes généraux [6] [7].
- **Mode de défaillance.** Une régression est expédiée et l'ancienne réclamation de précision reste
  sur le site Web. Une réclamation d'équité repose sur une brochure de fournisseur. Une autorité
  demande ce qui a soutenu une déclaration faite l'année dernière, et la seule réponse est la
  diapositive sur laquelle elle est apparue.

## Solution
Enregistrez la réclamation, liez-la à la preuve, et bloquez à la fois la publication et la version
sur la liaison.

1. **Enregistrez chaque réclamation.** Une ligne par réclamation : le texte exact, chaque endroit où
   il apparaît (URL, documents, les instructions d'utilisation, la fiche de modèle), le système et
   la version, la métrique, la valeur réclamée, le propriétaire et le statut. « Alimenté par l'IA »
   et « autonome » sont aussi des réclamations : la ligne pointe vers l'entrée du registre qui
   montre ce que le système fait réellement.
2. **Liez chaque réclamation à la preuve.** La ligne cite la suite d'évaluation et l'exécution, la
   valeur mesurée avec son intervalle, et la population et les conditions de mesure. Le test du NIST
   AI RMF est le bon : la performance « démontrée pour des conditions similaires aux paramètres de
   déploiement » (MEASURE 2.3), avec les limites de généralisation documentées (MEASURE 2.5) [8].
   Les règles de substantiation s'exécutent en tant que code : la population de mesure doit
   correspondre à la portée de la réclamation ; une figure ponctuelle n'est réclamée que si la
   limite inférieure de l'intervalle la soutient ; une réclamation comparative nécessite une
   comparaison appariée sur les mêmes données ; une figure fournie par un fournisseur est marquée
   comme attestée par le fournisseur jusqu'à remesure.
3. **Porte de publication.** Le texte qui porte une réclamation enregistrée ne peut pas être publié,
   ou envoyé dans un appel d'offres, tant que la preuve de la réclamation est manquante, obsolète ou
   défaillante. Les réclamations quantitatives non enregistrées sont détectées en révision par la
   même règle qui bloque les systèmes non enregistrés.
4. **Porte de version.** Chaque version de modèle réexécute les suites citées. Une réclamation dont
   la preuve tombe en dessous de la valeur réclamée échoue la version ou ouvre une tâche de retrait
   avec une date limite et un propriétaire ; la précision déclarée dans les instructions
   d'utilisation est régénérée à partir des mêmes lignes.
5. **Conservez l'historique.** Les réclamations retirées et modifiées conservent leur enregistrement
   (ce qui a été dit, où, sur quelle preuve, jusqu'à quand), afin que l'organisation puisse montrer
   ce qu'elle savait et quand.

Ligne de registre de réclamations illustrative :

```json
{
  "claim_id": "CLM-2026-017",
  "text": "Catches 95% of card-not-present fraud",
  "locations": ["https://www.example.com/product/fraud-shield", "sales-deck-2026Q3#slide-4",
                "instructions-for-use/fraud-cnp/5.3#accuracy"],
  "system": "fraud-cnp@5.3.0",
  "metric": "recall on confirmed card-not-present fraud",
  "claimed_value": 0.95,
  "evidence": { "suite_id": "fraud.recall.cnp.v7", "run": "ci-run-99812", "value": 0.962,
                "ci95": [0.953, 0.970], "population": "EU card-not-present, 2026-Q2, n=4120 confirmed fraud",
                "timestamp": "2026-09-12T08:00:00Z" },
  "scope_match": "pass",
  "status": "substantiated",
  "owner": "product-marketing-fraud",
  "revalidate_on": ["model_release", "2026-12-31"]
}
```

> **Exemple (illustratif)** Le site Web d'un produit de fraude réclamait un taux de détection mesuré
> deux versions de modèle plus tôt sur le trafic d'un pays. L'enregistrement de la réclamation a
> montré les deux lacunes : la preuve était obsolète et la population plus étroite que le texte ne
> l'impliquait. La réclamation a été réécrite pour nommer la région, la version suivante a réexécuté
> la suite, et un réentraînement ultérieur qui a chuté en dessous de la valeur réclamée a ouvert une
> tâche de retrait avant que le nouveau modèle ne soit expédié.

## Conséquences
Les déclarations publiques deviennent étayées, délimitées et datées, les réclamations obsolètes sont
retirées par le pipeline plutôt que par un régulateur, et la précision déclarée dans les
instructions d'utilisation reste cohérente avec le marketing. Les coûts : le marketing et le
juridique doivent accepter un registre et une étape d'examen ; les réclamations honnêtes sont plus
étroites et portent des intervalles ; et la règle sur la correspondance de portée nécessite un
jugement pour les réclamations qualitatives, qui restent avec l'examen juridique.

## Motifs connexes
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondances :** Règlement de l'IA Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3) · Loi FTC s. 5 ·
Directive 2005/29/CE Art. 5 · Loi DMCC 2024 s. 225 · ISO/IEC 42001 A.8.2, A.8.5 · NIST AI RMF
(Measure 2.3, 2.5) · Couche 05 Assurance & Continuous Compliance / Couche 03 Evals & Red Teaming as
Evidence.

Les étiquettes de fonction et de sous-catégorie suivent le NIST AI RMF [8] ; les identifiants
ISO/IEC 42001 Annex A suivent un crosswalk publié, pas le texte de la norme [9]. Les mappages sont
illustratifs, pas une affirmation de conformité.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; trained on academic text; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[3] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose incl. "promotional or sales materials and statements"; Art. 13(3)(b)(ii) level of accuracy, incl. its metrics, against which the system has been tested and validated; Art. 15(3) accuracy levels and metrics declared in the instructions for use (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[6] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[7] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3 performance "demonstrated for conditions similar to deployment setting(s)"; MEASURE 2.5 validity and reliability, limits of generalisability documented). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[9] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users, B.8.5 information for interested parties; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
