---
lang: fr
source: bok/patterns/explanation-artefact.md
sourceHash: "f5f1c480d5aacda263f8733e9b94dcdab9bb143de057b0c0d5c3a12e2c0f0374"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: explanation-artefact
title: Explanation Artefact
layer: 4
secondaryLayer: 5
order: 23
summary: "Un enregistrement d'explication par décision conséquente, avec modèle épinglé, méthode et codes de raison, testé pour la fidélité et réutilisé pour chaque obligation d'explication."
---

# Motif : Explanation Artefact

**Résumé :** Pour chaque décision conséquente qu'un système prend ou soutient concernant une
personne, rédigez un **enregistrement d'explication** structuré au moment de la décision : la
version du modèle, la méthode d'explication avec sa version et sa ligne de base, les codes de raison
tirés des facteurs que le modèle a réellement évalués, un contrefactuel valide le cas échéant, le
modèle d'avis et l'itinéraire de contestation. Testez les explications pour la fidélité en CI,
conservez les enregistrements dans le magasin de preuves, et répondez à chaque obligation
d'explication (un avis d'action défavorable, une demande d'accès du titulaire des données, une
demande d'explication en vertu du règlement sur l'IA, un appel interne) à partir du même
enregistrement.

## Objectifs
Rendez chaque explication reproductible, vérifiable et réutilisable : reproductible parce que ce qui
l'a produite est épinglé, vérifiable parce que ses raisons peuvent être recalculées et comparées, et
réutilisable parce qu'un enregistrement sert plusieurs obligations légales et internes au lieu que
chaque équipe rédige sa propre lettre.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur ML, équipes produit et opérations qui envoient des avis,
conseil en droit de la vie privée et du droit du consommateur.

## Parties prenantes affectées
Personnes soumises à des décisions et leurs représentants, opérateurs et examinateurs qui s'appuient
sur l'explication, responsables du déploiement, auditeurs, autorités de protection des données et de
surveillance du marché.

## Principes pertinents
Instrumenter la compilation pour produire sa propre preuve ; donner des dents à chaque contrôle ;
partir d'un mode de défaillance ou d'un préjudice nommé.

## Contexte
Un système qui refuse, fixe le prix, classe, signale ou évalue les personnes, où la personne, un
opérateur ou une autorité demandera pourquoi. Les obligations se chevauchent. En vertu du règlement
sur l'IA, une personne soumise à une décision prise par un responsable du déploiement sur la base de
la sortie d'un système de haut risque de l'annexe III (sauf point 2), ayant des effets défavorables
importants sur le plan juridique ou similaire, a le droit d'obtenir « des explications claires et
significatives du rôle du système d'IA dans la procédure de prise de décision et des éléments
principaux de la décision prise » (`Art. 86(1)`) ; les responsables du déploiement doivent informer
les personnes qu'elles sont soumises à un tel système (`Art. 26(11)`) ; et la notice d'utilisation
doit décrire, le cas échéant, les capacités du système « à fournir des informations pertinentes pour
expliquer sa sortie » (`Art. 13(3)(b)(iv)`) [1]. Le RGPD donne aux titulaires des données des
informations significatives sur la logique impliquée dans les décisions automatisées
(`Art. 15(1)(h)`, `Art. 22`) [2], que la Cour de justice a interprétées dans l'affaire C-203/22
comme une explication de « la procédure et les principes réellement appliqués » [3]. Aux États-Unis,
en matière de crédit, la Regulation B exige les raisons principales spécifiques d'une action
défavorable, et elles doivent se rapporter aux facteurs réellement considérés ou évalués [4].

## Problème
Les explications sont générées à la volée, envoyées et oubliées.

- **Forces.** Les méthodes d'attribution post-hoc peuvent diverger du modèle qu'elles expliquent, et
  elles peuvent être manipulées : un classificateur biaisé peut être enrobé pour que LIME et SHAP
  rapportent des caractéristiques inoffensives [5]. Les raisons rédigées pour le data scientist
  n'aident pas le destinataire. Chaque obligation a son propre public et sa propre formulation.
  Lorsque les enjeux sont élevés, un modèle interprétable peut être sa propre explication, et Rudin
  soutient qu'il devrait être préféré à l'explication d'une boîte noire après coup [6].
- **Mode de défaillance.** Personne ne peut reproduire l'explication qu'un client a reçue l'année
  dernière, parce que le modèle, la méthode ou la ligne de base a changé. Les codes de raison
  nomment des facteurs que le modèle n'a pas utilisés. Chaque demande d'accès et chaque appel
  devient un projet d'investigation, et l'organisation ne peut pas montrer que ses explications
  étaient exactes.

## Solution
Traitez l'explication comme un artefact avec un schéma, un test et une règle de rétention.

1. **Décidez l'explication par cas d'usage.** Une politique d'explication (couche 01) énonce, par
   cas d'usage, les types d'explication requis (codes de raison, un contrefactuel, des citations de
   sources pour les réponses basées sur la récupération, une description de la procédure et des
   principes appliqués), le public et la langue, la méthode autorisée, et si un modèle interprétable
   est requis.
2. **Rédigez l'enregistrement au moment de la décision.** L'exécution (couche 04) rédige un
   enregistrement par décision expliquée, indexé par l'id du registre et l'id de la décision :
   version du modèle ; méthode, version et ligne de base ; si la sortie était déterminante ou
   consultatif ; codes de raison des facteurs évalués, classés ; un contrefactuel qui ne change que
   les caractéristiques mutables, le cas échéant ; le modèle d'avis, la langue, le canal et l'heure
   de livraison ; et l'itinéraire de contestation. Épingler la méthode et la ligne de base est ce
   qui rend l'enregistrement reproductible.
3. **Testez les explications.** En CI (couche 03), une suite d'explication vérifie la fidélité (les
   raisons prédisent le comportement du modèle), la stabilité (les entrées quasi-identiques
   obtiennent des raisons quasi-identiques), la santé mentale (la méthode est sensible au modèle et
   aux données) et la cohérence des codes de raison (chaque raison échantillonnée est un facteur
   évalué). NIST nomme « l'exactitude de l'explication » comme l'un des quatre principes de l'IA
   explicable [7]. Recalculez un échantillon d'enregistrements stockés par rapport au modèle épinglé
   pour détecter la dérive ou la falsification.
4. **Réutilisez l'enregistrement.** Le même enregistrement rend l'avis d'action défavorable, répond
   à une demande d'accès et à une demande `Art. 86`, et donne à un examinateur humain le contexte
   pour un appel. Au Royaume-Uni, les garanties pour les décisions automatisées importantes incluent
   des informations sur la décision, la possibilité de présenter des observations, l'intervention
   humaine et un moyen de la contester [8] ; l'enregistrement porte ce que chacune de ces étapes a
   besoin.
5. **Conservez et interrogez.** Les enregistrements s'écoulent dans le magasin de preuves
   (couche 05) avec une période de rétention fixée par l'obligation la plus longue qu'ils servent.
   Les appels et leurs résultats sont enregistrés par rapport à l'enregistrement et comptabilisés
   par groupe, ce qui alimente la surveillance de l'équité.

L'AI RMF demande que « le modèle d'IA soit expliqué, validé et documenté » et sa sortie «
interprétée dans son contexte » (MEASURE 2.9), et que les risques de transparence et de
responsabilité soient « examinés et documentés » (MEASURE 2.8) [9].

Enregistrement d'explication illustratif pour une augmentation de limite de crédit refusée :

```json
{
  "record_id": "exp-2026-09-21-118204",
  "decision_id": "cl-2026-09-21-118204",
  "subject": "credit-limit@4.2.1",
  "registry_id": "clm-07",
  "outcome": "limit_increase_declined",
  "decision_role": "determinative",
  "method": { "name": "treeshap", "version": "0.46", "baseline": "bg-sample.v14" },
  "fidelity_suite": { "suite_id": "explain.fidelity.v2", "result": "pass" },
  "reason_codes": [
    { "code": "R07", "text": "Debt-to-income ratio too high", "factor": "dti", "rank": 1 },
    { "code": "R12", "text": "Recent missed payments", "factor": "missed_payments_6m", "rank": 2 }
  ],
  "counterfactual": { "feature": "monthly_debt", "change": "-150", "result": "approve", "mutable_only": true },
  "notice": { "template": "adverse-action.en.v6", "language": "en", "channel": "app+letter",
              "delivered": "2026-09-21T10:04:51Z" },
  "contest_route": "appeal-flow.v3",
  "retention_until": "2031-09-21"
}
```

> **Exemple (illustratif)** La vérification de crédit d'un détaillant de téléphones mobiles a généré
> des codes de raison à partir de valeurs SHAP au moment de la demande. Un test de cohérence des
> codes de raison a trouvé que, pour une tranche de refus, le facteur principal était une
> interaction d'ingénierie qu'aucun avis ne pouvait décrire en langage clair. L'équipe a adopté une
> fiche de pointage monotone dans une petite marge du modèle complexe, épinglé la méthode dans
> l'enregistrement, et répond maintenant à « pourquoi ce client a-t-il été refusé ? » avec
> l'enregistrement stocké et un recalcul frais côte à côte.

## Conséquences
Les explications deviennent des preuves : reproductibles, testables et réutilisables dans les
obligations, avec leur exactitude vérifiée plutôt que supposée. Les coûts : le stockage et la
rétention pour un enregistrement par décision ; une suite d'explication à maintenir aux côtés du
modèle ; des modèles en langage clair qui ont besoin de tests avec de vrais destinataires ; et, pour
les modèles complexes, le risque qu'aucune explication fidèle ne soit assez simple, ce qui est un
constat de conception, pas un constat de documentation.

## Motifs connexes
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondances :** Règlement sur l'IA Art. 86, Art. 26(11), Art. 13(3)(b)(iv) · RGPD Art.
15(1)(h), Art. 22 · Regulation B (12 CFR 1002.9) · ISO/IEC 42001 A.8.2 · NIST AI RMF (Measure 2.8,
2.9) · Couche 04 Contrôles d'exécution et observabilité / Couche 05 Assurance continue.

Les étiquettes de fonction et de sous-catégorie suivent l'AI RMF de NIST [9] ; les ids de l'annexe A
d'ISO/IEC 42001 suivent un crosswalk publié, pas le texte de la norme [10]. Les mappages sont
illustratifs, pas une affirmation de conformité.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 86(1) right to explanation of individual decision-making (Annex III systems except point 2); Art. 26(11) deployers inform natural persons subject to Annex III systems; Art. 13(3)(b)(iv) capabilities to provide information relevant to explain the output (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2016/679 (GDPR), Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[3] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation). JuLIA project case-law database. 2025-02-27. https://www.julia-project.eu/database/case-law/319 (verified: secondary)
[4] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons) and Supplement I, comment 9(b)(2) (reasons must relate to factors actually considered or scored). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[5] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[6] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[7] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[8] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.8 transparency and accountability risks "examined and documented"; MEASURE 2.9 model "explained, validated, and documented" and output "interpreted within its context"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
