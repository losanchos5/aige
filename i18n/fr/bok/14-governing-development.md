---
lang: fr
source: bok/14-governing-development.md
sourceHash: "a8da4ad617810f33e44a55719a0c5546569e9310e2e3364c1f29cf97fe4090de"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 14. Gouverner le développement de l'IA

> Le développement de l'IA est gouverné quand chaque décision dans la construction, du cas d'usage à
> la sortie, laisse un enregistrement qu'une porte lit, de sorte que le pipeline compile le fichier
> technique au lieu qu'une équipe l'écrive après coup.

## La construction comme une chaîne de portes

La plupart des défaillances de gouvernance dans un système d'IA sont décidées avant qu'il ne serve
sa première demande. Le cas d'usage n'a jamais été écrit, donc personne ne peut dire à quoi sert le
système. L'ensemble d'entraînement a été gratté selon des conditions que personne n'a vérifiées.
L'ensemble de test a fui dans l'entraînement. La sortie s'est faite parce que la date était fixée.
Chacun de ceux-ci est une décision de développement, et chacun laisse derrière lui soit un
enregistrement, soit une lacune.

Ce chapitre couvre le côté fournisseur du cycle de vie: l'organisation qui conçoit, entraîne, teste
et publie un système ou un modèle d'IA.
[Le chapitre 15](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance) couvre le
déploiement et l'utilisation. La division suit les titulaires de devoirs du règlement sur l'IA de
l'UE (voir la [carte réglementaire](/bok/regulatory-map#eu-ai-act-post-omnibus)): la plupart de ce
qui suit lie le fournisseur, et un responsable du déploiement qui s'appuie sur un modèle acheté
hérite d'une version plus fine de celui-ci via la
[**Porte de diligence raisonnable du fournisseur / modèle**](/patterns/vendor-model-due-diligence-gate).

Les textes de référence s'accordent sur les étapes et disent peu de choses sur le mécanisme. ISO/IEC
5338:2023 définit les processus du cycle de vie du système d'IA [1]; ISO/IEC 42001 regroupe les
contrôles sous l'annexe A.6 (cycle de vie) et A.7 (données) [2]; le NIST AI RMF met le contexte dans
Map et les tests dans Measure [3]; le règlement sur l'IA de l'UE demande un système de gestion de la
qualité avec contrôle de conception, vérification de conception et « procédures d'examen, d'essai et
de validation à effectuer avant, pendant et après le développement » [4]. La lecture d'ingénierie:
chaque étape se termine par une porte, chaque porte lit un enregistrement structuré, et chaque
enregistrement atterrit dans le magasin de preuves indexé par l'identifiant du registre, le chemin
de données
[d'un système à travers les cinq couches](/bok/the-stack#one-system-through-the-five-layers).

Les numéros de couche dans les tableaux de ce chapitre suivent le chapitre 04:
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Étape | Question de gouvernance | Enregistrement | Porte | Couche |
|---|---|---|---|---|
| Cas d'usage | Est-ce le bon problème, et l'IA est-elle le bon outil? | Enregistrement du cas d'usage | [Approbation d'admission](/patterns/use-case-intake-risk-tiering) | 1 · 2 |
| Examen de conception | Les exigences, l'architecture et l'analyse des abus tiennent-elles? | Enregistrement de conception et journal des décisions | Approbation de l'examen de conception | 1 · 2 |
| Données | Pouvons-nous utiliser ces données, et sont-elles adaptées à l'objectif? | Enregistrement d'admission du dataset, fiche de données, lignée | [Porte d'admission du dataset](/patterns/dataset-admission-gate) | 1 · 2 · 3 |
| Test | Le système répond-il aux seuils fixés avant l'exécution des tests? | Plan de test, résultats d'évaluation, rapport de test | Porte d'évaluation | 3 |
| Lancement | Est-il prêt, et la route de conformité est-elle complète? | Enregistrement go/no-go, déclaration, enregistrement | Porte de sortie | 1 · 5 |
| Fichier technique | Une autorité peut-elle reconstruire tout ce qui précède? | Fichier annexe IV, fiches, AIBOM | Construction de documentation | 2 · 5 |

Ce n'est pas MLOps, qui déplace le modèle à travers les mêmes étapes, et ce n'est pas la validation
de modèle au sens bancaire, qui remet en question le modèle à des moments précis (le
[cluster de désambiguïsation](/bok/definition#the-disambiguation-cluster) trace les deux lignes).
C'est l'enregistrement de gouvernance que ces deux activités produisent, rendu lisible par machine
et doté du pouvoir de bloquer. Les règles au niveau de l'organisation que chaque porte applique sont
énoncées au chapitre 12
([ce que la politique exige à chaque étape](/bok/governance-program#what-policy-requires-at-each-stage)),
et la page des modèles a des schémas et des exemples remplis pour
l'[enregistrement du cas d'usage, l'examen de conception, l'admission du dataset, le plan et le rapport de test, et la porte de sortie](/resources/templates#stage-build).
## L'enregistrement du cas d'usage

L'enregistrement du cas d'usage est le premier artefact et celui qui manque le plus souvent. Il est
écrit à [l'admission](/bok/the-role#intake-and-classification), stocké comme champs sur l'entrée du
registre, et lu par chaque porte ultérieure. Le règlement sur l'IA de l'UE l'ancre: la
**destination** est « l'utilisation pour laquelle un système d'IA est destiné par le fournisseur, y
compris le contexte spécifique et les conditions d'utilisation » [5], et la plupart des obligations
de haut risque sont mesurées par rapport à elle. Le NIST AI RMF demande la même chose en termes
d'ingénierie: les destinations, les contextes prospectifs et les types d'utilisateurs sont « compris
et documentés » (MAP 1.1), et les tolérances de risque organisationnelles sont « déterminées et
documentées » (MAP 1.5) [3].

| Champ | Ce qu'il enregistre | Lu plus tard par |
|---|---|---|
| Contexte commercial | L'objectif, le sponsor, la décision que le système informe | Examen de conception, go/no-go |
| Destination prévue | Tâche, contexte et conditions d'utilisation | Classification, tests, instructions d'utilisation |
| Utilisations hors champ | Utilisations que le fournisseur exclut, énoncées explicitement | Analyse des abus, instructions d'utilisation, politique d'exécution |
| Utilisateurs et personnes affectées | Qui l'exploite; qui est soumis à ses résultats, y compris les groupes vulnérables | Évaluations d'impact, tests de biais |
| Autorité décisionnelle | Consultatif, approuvé par l'homme ou autonome; qui peut l'annuler | Conception de la surveillance, porte humaine dans la boucle |
| Environnement d'exploitation | Où il s'exécute, sources d'entrée, langues, juridictions | Vérifications de représentativité, plan de test |
| Métriques de succès | La métrique commerciale, la métrique du modèle et le lien entre elles | Plan de test, surveillance |
| Appétit d'erreur | Le coût d'un faux positif par rapport à un faux négatif; taux tolérés | Seuils |
| Durée de vie attendue | Date d'examen et critères de retrait | Maintenance, rétention |
| Disponibilité des données | Si des données légales et suffisantes existent | Faisabilité, admission du dataset |

### L'IA est-elle le bon outil?

La première question de la porte est de savoir s'il faut construire du tout. Les directives
d'ingénierie de Google commencent par la règle « N'ayez pas peur de lancer un produit sans
apprentissage automatique » [6], et la version gouvernance est plus tranchante : si une règle, une
recherche ou un flux de travail humain atteint la métrique de succès, un modèle ajoute du risque
sans ajouter de valeur. Enregistrez la ligne de base non-ML dans le dossier du cas d'usage et exigez
que l'examen de conception la dépasse d'une marge déclarée. La ligne de base donne aussi à la
testification sa première comparaison : un modèle qui ne surpasse pas la règle qu'il remplace n'a
pas gagné sa place en production.

### Appétence d'erreur : faux positifs par rapport aux faux négatifs

Tout classificateur échange une erreur contre une autre, et cet échange est une décision commerciale
et de droits, non une décision de modélisation. Un modèle de fraude qui signale trop gèle les
clients légitimes ; un qui signale trop peu laisse passer la fraude. Écrivez l'appétence avant
l'entraînement, dans la devise du préjudice : ce qu'un cas manqué coûte, ce qu'une fausse alarme
coûte, et quelle erreur, pour quel groupe, est plafonnée indépendamment du coût. La sélection du
seuil devient alors une arithmétique par rapport aux coûts déclarés, et déplacer le seuil devient
une modification du dossier avec un approbateur, non une décision de réglage dans un carnet. Les
taux d'erreur par groupe et les compromis d'équité qu'ils imposent sont traités dans
[le chapitre 16](/bok/fairness-and-explainability#the-impossibility-results).

### Dérive de fonction

Un modèle construit pour un objectif dérive vers d'autres parce que ses scores sont disponibles et
bon marché. Les directives révisées de gestion des risques des modèles des agences bancaires
américaines le disent clairement : « Utiliser un modèle au-delà de sa finalité prévue introduit une
incertitude et un risque supplémentaires » [7]. En vertu du Règlement de l'IA de l'UE, la dérive a
des conséquences juridiques. Un acteur de la chaîne de valeur qui modifie la finalité prévue d'un
système de sorte qu'il devient à haut risque est traité comme son fournisseur (art. 25(1)(c)) [8],
et une modification non prévue dans l'évaluation de conformité initiale qui affecte la conformité
est une **modification substantielle** (art. 3(23)) [5]. Le contrôle d'ingénierie consiste à faire
de la finalité prévue et de la liste des exclusions des champs qu'une politique lit. Un nouveau
consommateur de l'API du modèle déclare son utilisation à l'enregistrement ; une utilisation
déclarée en dehors du dossier échoue l'admission et rouvre la classification et les évaluations
d'impact.

> **Exemple (illustratif)** Un dossier de cas d'usage stocké sur l'entrée du registre d'un modèle de
> limite de crédit. Chaque porte ultérieure lit ces champs plutôt qu'une diapositive.

```json
{
  "id": "uc-credit-limit-07",
  "registry_id": "clm-07",
  "intended_purpose": "Recommend a credit-limit band for existing retail customers; a credit officer approves.",
  "out_of_scope": ["new-customer onboarding", "collections prioritisation", "employment decisions"],
  "affected_persons": ["retail customers", "guarantors"],
  "decision_authority": "advisory; officer approval required above band 3",
  "success_metric": { "business": "bad-debt rate", "model": "AUC >= 0.78 on frozen holdout" },
  "error_appetite": { "false_negative": "loss amount", "false_positive": "declined uplift",
                      "max_fnr_gap_between_groups": 0.03 },
  "non_ml_baseline": "scorecard-v5",
  "classification": { "eu_ai_act": "high-risk, Annex III 5(b)", "gdpr_dpia": true, "fria": true },
  "owner": "team-credit-decisioning",
  "review_by": "2027-03-31"
}
```

> **En pratique (illustratif)**
> Une équipe de rétention dans un grand opérateur de télécommunications a demandé un modèle de churn
> et a reçu, à l'admission, un dossier de cas d'usage d'une page à remplir au lieu d'un carnet.
> L'écriture de la liste des exclusions a révélé que les ventes voulaient les mêmes scores pour
> définir les niveaux de remise individuels : une deuxième finalité avec sa propre exposition
> d'équité. Le dossier a divisé la demande en deux cas d'usage, chacun avec sa propre classification
> et appétence d'erreur, et le cas de remise est retourné pour une évaluation d'impact avant tout
> entraînement.

## Examen de conception

L'examen de conception est la porte entre un cas d'usage approuvé et la dépense de calcul. Il lit le
dossier du cas d'usage et produit un **dossier de conception** : exigences, architecture et choix de
modèle avec leur justification, l'analyse d'abus, la conception de la surveillance et les contrôles
intégrés. L'annexe IV point 2(b) demandera à un fournisseur à haut risque les choix de conception
clés, leur justification et hypothèses, et les compromis effectués [9] ; écrit au moment opportun,
cela coûte des minutes, et reconstruit un an plus tard, cela coûte un projet.

### Exigences avec traçabilité

Les exigences se présentent en trois familles. Les exigences **fonctionnelles** disent ce que le
système fait. Les exigences **non fonctionnelles** fixent des planchers pour la précision, la
latence, l'équité, l'explicabilité, la confidentialité, la robustesse et le coût. Les exigences
**réglementaires** sont les obligations que la classification déclenche, telles que la
journalisation des événements ou la surveillance conçue pour un système à haut risque. Le NIST AI
RMF demande que les exigences du système soient « élicitées auprès des acteurs de l'IA pertinents et
comprises par eux » (MAP 1.6) [3].

La traçabilité est la partie ingénierie. Chaque exigence obtient un id, chaque id correspond à au
moins un test, et chaque test émet un dossier de preuves nommant l'exigence. La trace devient alors
une jointure, non une feuille de calcul : `REQ-FAIR-02` (écart de taux de faux négatifs entre
groupes d'âge au maximum 0,03) se résout à la suite `fnr-gap-by-age.v2`, à son dernier résultat, et
à la version qui a été livrée dessus. Une exigence sans test est un souhait ; un test sans exigence
est du bruit à la porte.

### Architecture et compromis de sélection de modèle

Le choix du modèle est une décision de gouvernance parce qu'il fixe ce qui peut être testé, expliqué
et prouvé ultérieurement. Enregistrez chaque choix comme un court dossier de décision (contexte,
options, décision, conséquences, date, approbateur) dans le même référentiel que le code.

| Choix | Options | Conséquence de gouvernance |
|---|---|---|
| Interprétable ou complexe | Scorecard, modèle clairsemé ou additif, petit arbre ; ou gradient boosting, réseau profond, LLM | Un modèle interprétable est sa propre explication ; un complexe a besoin d'une explication post-hoc qui peut diverger du modèle. Rudin soutient que les décisions à enjeux élevés devraient utiliser des modèles interprétables au lieu d'expliquer des boîtes noires après coup [10] |
| Poids ouverts ou propriétaires | Poids auto-hébergés ; ou une API de fournisseur | Les poids peuvent être testés, épinglés et hébergés en région ; une API peut changer derrière vous, et ses preuves sont collectées, non produites ([IA procurée](/bok/the-stack#third-party-and-procured-ai)) |
| Entraîner, affiner ou inviter | Modèle propre ; modèle de fondation affiné ; invitation et récupération | Chaque étape ajoute des devoirs de données d'entraînement ; une modification suffisamment importante d'un modèle à usage général peut vous en faire le fournisseur [11] |
| Récupération ou affinage pour la connaissance | Corpus RAG ; connaissance dans les poids | Un corpus peut être versionné, filtré et supprimé ; la connaissance dans les poids ne peut pas être supprimée sans réentraînement |
| Hébergement | Service géré ; infrastructure propre | Résidence des données, propriété des journaux et contrôle de la rétention |
| Coût et durabilité | Taille du modèle, exécutions d'entraînement, volume d'inférence | L'annexe IV demande les ressources informatiques utilisées pour développer, entraîner, tester et valider [9] ; l'annexe XI demande aux fournisseurs de GPAI la consommation d'énergie connue ou estimée [12] |

### Utilisation indebue raisonnablement prévisible

L'**utilisation indebue raisonnablement prévisible** est « l'utilisation d'un système d'IA d'une
manière qui n'est pas conforme à sa finalité prévue, mais qui peut résulter d'un comportement humain
raisonnablement prévisible ou d'une interaction avec d'autres systèmes » [5]. Ce n'est pas la même
chose qu'une attaque. Un attaquant est modélisé par l'équipe rouge dans
[la couche 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) ; l'utilisation indebue
prévisible est ce que les utilisateurs ordinaires et les systèmes adjacents feront de toute façon
avec la sortie : un score de triage lu comme un diagnostic, un classement de CV utilisé pour rejeter
sans examen, un résumeur pointé vers une langue sur laquelle il n'a jamais été testé.

Le Règlement de l'IA de l'UE rend l'analyse une entrée de conception deux fois. Le système de
gestion des risques doit estimer et évaluer les risques qui émergent dans les conditions
d'utilisation indebue raisonnablement prévisible (art. 9(2)(b)) [13], et les instructions
d'utilisation doivent divulguer les circonstances connues ou prévisibles, y compris une telle
utilisation indebue, qui peuvent entraîner des risques pour la santé, la sécurité ou les droits
fondamentaux (art. 13(3)(b)(iii)) [14]. Conservez un **registre d'abus** dans le dossier de
conception : scénario, qui le ferait, probabilité, préjudice, et la réponse. Chaque entrée doit
atterrir dans au moins l'un de trois endroits : un test dans la suite d'évaluation, une politique
d'exécution qui le bloque ou le signale, ou un avertissement dans les instructions d'utilisation.
Une entrée qui n'atterrit nulle part est un risque accepté et a besoin d'un accepteur nommé
([le chapitre 13](/bok/risk-management#who-may-accept) couvre qui peut accepter).

### Surveillance et contrôles conçus

Le champ d'autorité décisionnelle du dossier du cas d'usage définit le modèle de surveillance. Le
groupe d'experts de haut niveau de l'UE nomme trois approches : humain dans la boucle, humain sur la
boucle et humain en commande [15]. L'examen de conception en choisit un par classe de décision et le
conçoit contre le biais d'automatisation et la surveillance qui se dégrade sous charge, comme
indiqué dans
[concevoir la surveillance humaine](/bok/the-stack#designing-human-oversight-article-14) et le
modèle [**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate). Le même examen fixe les
contrôles qui sont bon marché maintenant et coûteux à rétrofiter : journalisation des événements, un
chemin de retour en arrière, un mode fantôme, et un
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) pour tout ce qui agit.

L'examen est une porte avec des examinateurs nommés : un responsable d'ingénierie, l'ingénieur en
gouvernance de l'IA, la sécurité, la confidentialité, un expert du domaine et, lorsque les personnes
affectées sont en dehors de l'organisation, quelqu'un qui peut parler pour elles. Sa sortie est un
dossier de conception signé avec des conditions ouvertes, non des minutes.

## Données pour l'entraînement et la testification

[La gouvernance des données dans la stack](/bok/the-stack#data-governance-across-the-stack) établit
la règle que chaque ensemble de données porte une base juridique, une provenance, une limite de
rétention et un ensemble de droits. Cette section est la procédure au moment du développement qui
l'applique : une [**porte d'admission de dataset**](/patterns/dataset-admission-gate). Un travail
d'entraînement ne peut lire que des ensembles de données dont le dossier d'admission est complet et
signé par le propriétaire des données, et la vérification est politique en tant que code dans le
pipeline, non un rappel dans un wiki.

### Le droit d'utiliser les données

L'admission commence par les droits, car un problème de qualité peut être corrigé et un problème de
droits souvent ne peut pas. Par ensemble de données, le dossier répond à cinq questions.

- **Base juridique et finalité.** Pour les données personnelles, quelle base du RGPD s'applique à
  l'entraînement, et si l'entraînement est compatible avec la finalité de la collecte initiale. La
  limitation de finalité (art. 5(1)(b)) et les facteurs de compatibilité de l'art. 6(4) décident si
  les données collectées pour servir les clients peuvent entraîner un modèle à leur sujet [16]. Le
  consentement à un service n'est pas le consentement à entraîner.
- **Catégories spéciales.** Après l'Omnibus numérique, la base étroite pour traiter les données de
  catégories spéciales pour la détection de biais se trouve dans un nouvel art. 4a plutôt que
  l'ancien art. 10(5), conditionné par des garanties et la suppression [17] (voir la
  [carte réglementaire](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- **Modèles en tant que données personnelles.** L'avis 28/2024 du CEPD (décembre 2024) soutient
  qu'un modèle entraîné sur des données personnelles n'est anonyme que s'il est très peu probable à
  la fois d'identifier les personnes dont les données l'ont entraîné et de laisser quiconque
  extraire ces données par des requêtes ; il établit un test en trois étapes pour l'intérêt légitime
  et avertit que le traitement illégal en développement peut affecter la licéité du déploiement
  [18]. [Le chapitre 19](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference) va plus
  loin.
- **Contenu raclé et contenu tiers.** L'exception de l'UE pour l'exploration de textes et de données
  s'applique uniquement lorsque les titulaires de droits n'ont pas réservé leurs droits « de manière
  appropriée, notamment par des moyens lisibles par machine » pour le contenu mis à disposition en
  ligne (Directive DSM art. 4(3)) [19], et un fournisseur de modèle d'IA à usage général doit
  conserver une politique de droits d'auteur qui identifie et respecte ces réserves (Règlement de
  l'IA art. 53(1)(c)) [20]. Enregistrez la date du crawl, la vérification de la réserve et son
  résultat par source.
- **Licences et garanties.** Si la licence du dataset autorise l'entraînement, l'utilisation
  commerciale et la distribution de modèles dérivés, et ce que le fournisseur garantit concernant la
  collecte légale. La licence figure dans l'[**AIBOM**](/patterns/aibom) de sorte qu'un changement
  de licence remonte à la prochaine construction.

### Qualité, quantité, représentativité et adéquation à l'usage

Pour les systèmes à haut risque, l'art. 10 fait de la qualité des données une obligation légale. Les
ensembles d'entraînement, de validation et de test nécessitent des pratiques de gouvernance
couvrant, entre autres, la collecte et l'origine, la préparation, les hypothèses sur ce que les
données mesurent, la disponibilité et l'adéquation, l'examen et l'atténuation des biais, et les
lacunes de données (art. 10(2)) ; ils doivent être « pertinents, suffisamment représentatifs et,
dans la mesure du possible, exempts d'erreurs et complets » (art. 10(3)) et refléter le contexte
d'utilisation (art. 10(4)) [21]. La série ISO/IEC 5259 fournit le vocabulaire, les mesures et les
cadres de processus et de gouvernance [22].

| Dimension | Question | Test qui l'atteste |
|---|---|---|
| Exactitude des étiquettes | Les étiquettes sont-elles correctes ? | Audit d'un échantillon étiqueté ; accord inter-annotateurs |
| Complétude | Des champs, segments ou périodes manquent-ils ? | Taux de valeurs nulles par champ et par segment |
| Cohérence | Le même fait est-il enregistré de la même manière ? | Vérifications de schéma et de contrainte |
| Actualité | Les données sont-elles actuelles pour l'environnement opérationnel ? | Plage de dates par rapport au registre des cas d'usage |
| Quantité | Y a-t-il suffisamment d'exemples par classe et par groupe ? | Comptages de cellules par rapport au minimum du plan de test |
| Représentativité | La population correspond-elle à la population de déploiement ? | Comparaison de distribution par rapport à une référence |
| Adéquation à l'usage | Les données mesurent-elles ce que le cas d'usage nécessite, ou un proxy ? | Analyse de proxy ; registre des hypothèses (art. 10(2)(d)) |
| Intégrité | A-t-elle changé depuis l'admission ? | Hachages de contenu ; snapshots signés |

La quantité n'est pas la représentativité. Un grand dataset tiré d'une mauvaise population est
précisément faux, et en avoir plus ne corrige pas le biais ; cela ne fait que réduire l'intervalle
de confiance autour de la mauvaise réponse. Le catalogue d'outils énumère les
[outils de validation de données](/resources/tools#cat-data-validation) comme exemples illustratifs,
non comme des recommandations.

### Propriétaires, gestionnaires et portail d'admission

Le **propriétaire des données** est responsable d'un dataset : ses utilisations autorisées, son
acceptation des risques et la signature sur son dossier d'admission. Le **gestionnaire des données**
l'exploite : vérifications de qualité, métadonnées, accès et suppression. Séparer les deux empêche
la personne qui veut que les données soient utilisées d'être la seule à décider qu'elles peuvent
l'être. Lorsque de nombreuses équipes partagent des données, un petit comité d'examen des données
règle les admissions contestées et définit la liste de contrôle d'admission minimale ; la liste
elle-même existe sous forme de code de sorte qu'un champ manquant fait échouer le pipeline.

### Provenance par rapport à lignage

Les deux mots sont utilisés indifféremment et ne devraient pas l'être. La **provenance** est
l'origine d'un dataset et les conditions dans lesquelles il a été obtenu. W3C PROV la définit comme
« l'information sur les entités, activités et personnes impliquées dans la production d'une donnée
ou d'une chose, qui peut être utilisée pour former des évaluations de sa qualité, fiabilité ou
fiabilité », et son modèle de données (PROV-DM, une recommandation W3C depuis le 30 avr. 2013)
l'exprime comme des entités, des activités et des agents [23]. Le **lignage** est la façon dont les
données se sont déplacées et ont changé à travers les pipelines. OpenLineage fournit une norme
ouverte pour émettre des événements de lignage sur les datasets, les tâches et les exécutions, avec
des facettes extensibles [24]. Le lignage fonctionne dans les deux sens : le lignage rétroactif
répond à « qu'est-ce qui a alimenté ce modèle ? », le lignage prospectif répond à « quels modèles
ont utilisé ce dataset ? », et la deuxième question est celle qu'une demande d'effacement ou un
retrait de licence pose.

Choisissez la granularité selon le point d'attache des droits. La provenance au niveau du dataset
est la valeur par défaut. La provenance au niveau des enregistrements est nécessaire lorsque les
droits s'attachent aux enregistrements (données personnelles, licences par source, refus). Le
lignage au niveau des features est nécessaire pour les features dérivées sensibles qui peuvent agir
comme des proxies. Le compagnon lisible par l'homme est une fiche de données : Gebru et ses
collègues ont proposé que chaque dataset soit accompagné d'une fiche couvrant sa motivation, sa
composition, sa collecte, son prétraitement, ses utilisations, sa distribution et sa maintenance
[25]. Le catalogue d'outils énumère les
[outils de versioning et de lignage](/resources/tools#cat-versioning) comme exemples illustratifs,
non comme des recommandations.

### Données synthétiques, augmentation et technologies améliorant la confidentialité

Les données synthétiques héritent des propriétés de leur générateur : ses biais, ses lacunes et,
lorsque le générateur a mémorisé, ses enregistrements sources. Traitez un ensemble synthétique comme
un dataset avec son propre dossier d'admission nommant le générateur, les données sources et la
méthode de confidentialité. La confidentialité différentielle est la technologie améliorant la
confidentialité avec une garantie mesurable, et NIST SP 800-226 (mars 2025) explique comment évaluer
une affirmation de confidentialité différentielle et les « risques de confidentialité » qui
surviennent lorsque les mathématiques rencontrent une implémentation [26]. L'augmentation et le
rééchantillonnage modifient l'équilibre des classes et, appliqués avant la division
entraînement-test, fuient des informations dans l'ensemble de test et gonflent les scores.

Les données synthétiques sont aussi un élément de divulgation. La loi AB 2013 de Californie, en
vigueur depuis le 1er jan. 2026, exige que les développeurs de systèmes d'IA générative mis à
disposition des Californiens publient une documentation sur les données d'entraînement qui indique,
entre autres éléments, si la génération de données synthétiques a été utilisée [27] ; le modèle de
l'UE pour le résumé du contenu d'entraînement du modèle d'IA à usage général énumère les données
synthétiques parmi les sources de données à décrire [28].

> **Exemple (illustratif)** Un dossier d'admission de dataset. La tâche d'entraînement vérifie
> `admitted` et `permitted_uses` par rapport à l'id du cas d'usage avant de lire un octet.

```json
{
  "dataset_id": "ds-claims-2019-2025@v4",
  "owner": "head-of-claims-data",
  "steward": "data-platform-claims",
  "sources": [{ "name": "claims-core", "period": "2019-01/2025-12",
                "basis": "GDPR Art. 6(1)(f); compatibility assessment CA-2026-014", "licence": "internal" }],
  "tdm_reservation_check": "not applicable (internal data)",
  "special_category": { "present": false },
  "provenance": "prov:wasDerivedFrom claims-core@2026-01-15",
  "lineage_run": "openlineage:claims-features/run-8812",
  "quality": { "null_rate_max": 0.02, "label_agreement": 0.91, "min_n_per_group": 400 },
  "permitted_uses": ["uc-fraud-triage-03"],
  "retention_until": "2032-12-31",
  "admitted": true,
  "admitted_by": "head-of-claims-data",
  "timestamp": "2026-09-20T10:12:00Z"
}
```

## Test et validation

### Un plan de test avant la première exécution

Le Règlement de l'IA de l'UE exige que les systèmes à haut risque soient testés « tout au long du
processus de développement, et en tout état de cause, avant leur mise sur le marché », par rapport à
« des métriques préalablement définies et des seuils probabilistes appropriés à la finalité prévue »
(art. 9(8)) [13]. Le NIST AI RMF demande que les ensembles de test, les métriques et les outils
soient documentés (MEASURE 2.1) et que le système soit montré comme valide et fiable, avec les
limites de généralisation documentées (MEASURE 2.5) [3]. Les mots opératoires sont *préalablement
définis*. Figez le plan de test dans le référentiel avant le début de l'évaluation : métriques,
seuils avec leur lien à l'appétit pour le risque, datasets, sous-groupes, tailles d'échantillon et
nombre d'exécutions répétées. Un changement du plan après que les résultats soient connus est un
diff avec un approbateur. Cette seule règle prévient le shopping de métriques, l'habitude de choisir
la métrique qui passe après les avoir toutes vues.

### La matrice des types de test

ISO/IEC TR 29119-11 fournit des lignes directrices pour tester les systèmes basés sur l'IA [29], et
la série ISO/IEC 24029 couvre l'évaluation de la robustesse des réseaux de neurones [30]. La matrice
ci-dessous est la version de travail : une ligne par type de test, une colonne par famille de
systèmes, et la preuve que chaque exécution laisse. La latence de queue (le 95e ou 99e percentile) y
a sa place car une moyenne cache les requêtes lentes que les utilisateurs et les délais d'attente
rencontrent réellement.

| Type de test | ML classique | Système LLM ou agent | Enregistrement de preuve |
|---|---|---|---|
| Unitaire | Transformations de features, validateurs de données, contrats d'entrée et de sortie du wrapper de modèle | Modèles de prompt, schémas d'outils, parseurs de sortie | Exécution de test CI |
| Intégration | Pipeline de bout en bout sur un dataset de fixture | Orchestration, récupération et appels d'outils par rapport aux bacs à sable | Rapport d'intégration |
| Validation | Holdout, validation croisée k-fold, validation externe sur un autre site ou période | Suites de tâches retenues, ensembles dorés, échantillons évalués par l'homme | Résultat d'évaluation avec intervalle |
| Performance | Débit, latence p95 et p99, mémoire | Temps jusqu'au premier token, latence p99, tokens et coût par tâche | Rapport de test de charge |
| Robustesse et hors distribution | Bruit, perturbation, décalage de covariable, ensembles hors distribution | Paraphrase, fautes de frappe, décalage de langue et de format, contexte long | Évaluation de robustesse |
| Stress et cas limites | Valeurs extrêmes, classes rares, entrées manquantes | Entrées surdimensionnées, défaillances d'outils, délais d'attente, boucles | Rapport de stress |
| Sécurité et adversarial | Évasion, empoisonnement, extraction de modèle, inférence d'appartenance | Injection de prompt, jailbreak, mauvaise utilisation d'outils, exfiltration de données | Résultats de red-team |
| Biais et équité | Taux d'erreur et de sélection par groupe | Taux de qualité et de refus par groupe, langue et dialecte | Évaluation de sous-groupe |
| Interprétabilité | Importance globale des features, explications locales, stabilité du code de raison | Fidélité des citations, cohérence des justifications | Évaluation d'explication |
| Scénario | Cas de bout en bout du registre des cas d'usage et du registre des mauvaises utilisations | Tâches multi-étapes et trajectoires d'agent | Rapport de scénario |
| Humain dans la boucle | Exactitude du réviseur avec et sans le modèle ; taux de remplacement | Qualité d'approbation sous charge ; sondes de biais d'automatisation | Test de supervision |
| Régression | Deltas de score par rapport à la dernière version | Deltas de score par rapport à la dernière version du modèle ou du prompt | Verdict du portail d'évaluation |

Chaque ligne est une suite derrière l'[**Eval Gate in CI**](/patterns/eval-gate-in-ci) ; la ligne de
sécurité est l'[**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite). Les métriques
d'équité sont définies au [chapitre 16](/bok/fairness-and-explainability#group-fairness-metrics),
qui couvre également les
[tests de biais et d'interprétabilité](/bok/fairness-and-explainability#testing-explanation-quality)
des explications elles-mêmes.

### Validité statistique des évaluations

Un portail d'évaluation n'est aussi bon que les statistiques sous son seuil, et la plupart des
portails n'en ont pas
([les limites du portail d'évaluation](/bok/definition#the-limits-of-the-eval-gate) énoncent les
autres limites). Le traitement de Miller des évaluations de modèles de langage encadre les questions
d'évaluation comme un échantillon d'une super-population inobservée et donne les formules pour les
erreurs types, pour comparer deux modèles et pour planifier les tailles d'échantillon [31]. Quatre
conséquences pour le portail en découle.

- **Rapportez un intervalle, pas un point.** Un taux de réussite de 0,96 sur 200 cas a une erreur
  type de √(0,96 × 0,04 / 200) ≈ 0,014, donc son intervalle à 95 % est environ 0,933 à 0,987 (±1,96
  erreurs types). Un seuil de 0,95 se situe à l'intérieur, et le portail ne peut pas distinguer une
  réussite d'un échec. Sur 2 000 cas, l'intervalle se rétrécit à environ 0,951 à 0,969. Dimensionnez
  la suite à partir du seuil, pas à partir du temps disponible.
- **Zéro défaillance n'est pas zéro risque.** Si aucun des *n* cas indépendants ne défaille, le taux
  de défaillance qui produirait ce résultat 5 % du temps satisfait (1 − p)^n = 0,05, donc p ≈
  −ln(0,05)/n ≈ 3/n. Trois cents cas sans problème bornent le taux de défaillance à environ 1 % avec
  95 % de confiance.
- **Répétez les exécutions non déterministes.** La température d'échantillonnage, le traitement par
  lots et la latence des outils font d'une exécution un échantillon de un. Exécutez chaque suite
  plusieurs fois, rapportez la moyenne et la dispersion, épinglez les graines et les versions où la
  stack le permet, et comparez les modèles sur les mêmes questions (un plan apparié) pour réduire le
  bruit [31].
- **Méfiez-vous du juge et du benchmark.** Les juges LLM présentent des biais de position, de
  verbosité et d'auto-amélioration, même quand des juges forts atteignent plus de 80 % d'accord avec
  les préférences humaines [32]. Calibrez un juge par rapport à un échantillon étiqueté par des
  humains, randomisez l'ordre des réponses, préférez un juge d'une famille de modèles différente de
  celle testée, et versionnez l'invite du juge avec la suite. Les éléments de test vus en
  entraînement gonflent les scores ; la contamination peut être démontrée même pour les modèles en
  boîte noire [33]. Conservez des ensembles privés retenus, faites tourner les éléments et
  enregistrez quand chaque élément a été écrit par rapport à la date limite des données du modèle.

### ### Validation indépendante et gestion des risques des modèles

Le secteur bancaire mène une validation indépendante des modèles depuis des années, et l'ingénierie
de la gouvernance de l'IA emprunte sa meilleure idée : **le défi efficace**. Aux États-Unis, SR 11-7
(2011) a été remplacée le 17 avr 2026 par SR 26-2, une orientation conjointe de la Réserve fédérale,
de l'OCC et de la FDIC. Elle maintient le défi efficace comme analyse critique par des experts
objectifs ayant l'expertise, une « indépendance suffisante pour maintenir l'objectivité », et le
pouvoir d'effectuer un changement, et elle conserve les trois composantes de la validation : la
solidité conceptuelle, la surveillance continue et l'analyse des résultats [7]. Elle trace aussi une
ligne que l'ingénieur doit remarquer : les modèles d'IA générative et agentique « ne sont pas
couverts par cette orientation », tandis que ses principes s'appliquent aux modèles traditionnels et
aux « modèles d'IA non génératifs et non agentiques » [7]. Au Royaume-Uni, SS1/23 de la PRA
s'applique aux banques, aux sociétés de construction et aux entreprises d'investissement désignées
par la PRA ayant une approbation de modèle interne, fait de la validation indépendante des modèles
l'un de ses cinq principes et traite les techniques d'IA et d'apprentissage automatique [34].

L'ingénierie de la gouvernance de l'IA emprunte à cette tradition l'indépendance du validateur, le
défi documenté et la hiérarchisation par matérialité. Elle ajoute la validation comme une suite
réexécutable avec des dossiers de preuves plutôt qu'un PDF, et une couverture pour les systèmes
génératifs et agentiques que SR 26-2 laisse de côté. Le validateur travaille à partir d'un
référentiel séparé avec accès en lecture au modèle et aux données, classe les conclusions comme des
problèmes avec propriétaires et délais, et signe la porte de libération pour les niveaux élevés.

### ### Reproductibilité et versioning lié

Un résultat que personne ne peut reproduire n'est pas une preuve.
L'**enregistrement d'entraînement** capture la validation du code, les hachages des instantanés de
données admis, la configuration et les hyperparamètres, les graines, l'environnement (résumé du
conteneur, versions des bibliothèques, matériel), le calcul utilisé, la qualité de l'étiquetage
(accord inter-annotateurs) et le propriétaire. L'enregistrement établit des liens dans les deux sens
: version du modèle vers enregistrement d'entraînement vers résultats d'évaluation vers étiquette de
libération vers les approbations de risque qui lui ont permis de se déployer.

L'[artefact du modèle lui-même a besoin d'intégrité](/patterns/model-artefact-integrity). Signez-le
: l'outillage de signature de modèle OpenSSF signe une déclaration listant chaque fichier de modèle
et son résumé, via Sigstore ou des clés conventionnelles, et la vérification recalcule les hachages
[35]. Refusez de charger les formats sérialisés qui exécutent du code de sources non fiables ; la
documentation Python est explicite : « Le module pickle n'est pas sécurisé » [36]. Les deux
vérifications appartiennent à la construction à côté de l'[**AIBOM**](/patterns/aibom). Le catalogue
des outils liste les [outils de signature et d'analyse d'artefacts](/resources/tools#cat-signing)
comme exemples illustratifs, non comme des recommandations.

### ### Ce qui se passe mal en entraînement et en test

| Problème | Comment cela se manifeste | Comment le détecter | Réponse de la porte |
|---|---|---|---|
| Fuite de données | Score de test trop bon ; s'effondre en production | Divisez par entité et par temps ; auditez les caractéristiques pour les champs post-résultat | Bloquez ; re-divisez et réentraînez |
| Surapprentissage | Score d'entraînement bien au-dessus de la validation | Courbes d'apprentissage ; variance de la validation croisée | Bloquez ; régularisez ou ajoutez des données |
| Sous-apprentissage | Les deux scores bas, près de la ligne de base | Comparaison avec la ligne de base non-ML | Bloquez ; réexaminez la conception |
| Bruit d'étiquetage | Plafond de précision ; étiquettes incohérentes | Accord inter-annotateurs ; échantillon réétiqueté | Rouvrez l'admission du jeu de données |
| Déséquilibre des classes | Précision élevée, rappel faible des minorités | Métriques par classe, pas seulement la précision | Rééchantillonnez ou repesez ; re-testez |
| Mauvais étalonnage | Les scores ne correspondent pas aux taux observés | Diagramme de fiabilité ; erreur d'étalonnage | Réétalonner avant que les seuils ne soient définis |
| Écart de couverture des sous-groupes | Intervalles larges ou pas de données pour un groupe | Comptages de cellules par rapport au plan de test | Bloquez pour haut risque ; collectez des données |
| Décalage d'environnement | Passe hors ligne, échoue en ligne | Exécution fantôme sur les entrées en direct | Maintenez en fantôme |
| Contamination des tests | Score de benchmark public supérieur au score d'ensemble privé | Écart privé et public ; tests de contamination | Supprimez les éléments contaminés |
| Résultat non reproductible | Une réexécution est en désaccord | Réexécutions avec graine fixe | Bloquez jusqu'à reproductibilité |
| Utilisation au-delà de la portée du consentement | Jeu de données utilisé en dehors de ses utilisations autorisées | Lignée jointe aux dossiers d'admission | Bloquez ; examen juridique |

Chaque conclusion devient un problème avec un propriétaire, une gravité et une date limite. Une
conclusion qui se déploie non corrigée est un risque accepté avec un accepteur nommé, enregistré
dans le registre des risques que le
[chapitre 13](/bok/risk-management#the-risk-register-as-an-evidence-record) décrit, et devient un
test de régression pour qu'il ne puisse pas revenir silencieusement.

> **En pratique (illustratif)**
> Un résumeur LLM a passé sa porte de libération à 0,96 contre un plancher de 0,95, sur 150 cas
> soigneusement sélectionnés. Un examinateur a demandé l'intervalle : à cette taille d'échantillon,
> il s'étendait d'environ 0,93 à 0,99, donc la porte ne pouvait pas distinguer un passage d'un
> échec. L'équipe a adopté un plan gelé de 1 500 cas stratifiés par type de document et langue,
> trois exécutions répétées pour capturer la variance d'échantillonnage, et un juge d'une famille de
> modèles différente étalonné par rapport à 200 évaluations humaines. La porte est devenue plus
> lente, et ses verdicts ont commencé à signifier quelque chose.

## ## Préparation à la libération et conformité

### ### La porte go/no-go

La libération est un jalon de gouvernance, non une remise d'ingénierie. La porte de libération lit
les dossiers que les portes antérieures ont produits et refuse de s'ouvrir tant que l'un d'eux
manque ou est obsolète : un dossier de cas d'utilisation actuel ; un dossier de conception signé ;
des jeux de données admis ; un rapport de test par rapport au plan gelé ; les problèmes ouverts en
dessous de la gravité convenue ou acceptés par un accepteur nommé ; les évaluations d'impact
complétées ; les fiches et instructions d'utilisation régénérées ; la surveillance configurée (voir
[chapitre 15](/bok/governing-deployment#operating-the-system)) ; un retour testé ; les opérateurs
formés. Les examinateurs sont nommés à l'avance : propriétaire du produit, ingénierie, l'ingénieur
de la gouvernance de l'IA, sécurité, confidentialité et, pour les niveaux élevés, juridique et le
validateur indépendant. Le résultat est un dossier go/no-go signé avec ses conditions, classé par
rapport à l'entrée du registre. Le responsable de la mise en œuvre exécute son propre
[examen de mise en direct](/bok/governing-deployment#the-go-live-review) en plus (chapitre 15).
[Libérez par étapes](/patterns/staged-rollout-rollback-criteria), chacune avec des critères de
sortie du plan de test : **fantôme** (le système s'exécute sur les entrées en direct et ses
résultats sont enregistrés, non utilisés), **canari** (une petite part du trafic), un
**pilote limité**, puis la disponibilité générale. Dans l'UE, la recherche, les tests et le
développement avant la mise sur le marché se situent en dehors du Règlement de l'IA, sauf les tests
en conditions réelles [37] ; ces tests sont régis par l'art. 60, qui après l'Omnibus couvre les
systèmes de l'annexe III et les produits de l'annexe I section A, avec un nouvel art. 60a permettant
aux États membres de l'autoriser pour les produits de la section B [17].

### ### Conformité au Règlement de l'IA de l'UE, dans l'ordre

Pour les systèmes à haut risque, la porte de libération porte une séquence juridique. Après
l'Omnibus numérique, les obligations de haut risque s'appliquent aux systèmes de l'annexe III à
partir du 2 déc 2027 et aux produits de l'annexe I à partir du 2 août 2028 [38].

| Étape | Article | Artefact | Produit par |
|---|---|---|---|
| 1. Système de gestion de la qualité en place | `Art. 17` | Procédures QMS, versionnées | Fournisseur |
| 2. Documentation technique établie | `Art. 11`, annexe IV | Le dossier technique | Pipeline et auteurs nommés |
| 3. Évaluation de la conformité | `Art. 43`, annexe VI ou VII | Dossier de contrôle interne, ou certificat d'organisme notifié | Fournisseur, ou organisme notifié |
| 4. Déclaration UE de conformité | `Art. 47`, annexe V | Déclaration signée | Fournisseur |
| 5. Marquage CE | `Art. 48` | Marquage CE physique ou numérique, avec le numéro de l'organisme notifié le cas échéant | Fournisseur |
| 6. Enregistrement | `Art. 49`, `Art. 71` | Entrée dans la base de données UE | Fournisseur |
| 7. Mise sur le marché et surveillance | `Art. 72` | Plan de surveillance après commercialisation en opération | Fournisseur |

**Annexe VI ou annexe VII.** Les points 2 à 8 de l'annexe III suivent le contrôle interne en vertu
de l'annexe VI, sans organisme notifié [39]. En vertu de l'annexe VI, le fournisseur vérifie que son
système de gestion de la qualité est conforme à l'art. 17, examine la documentation technique par
rapport aux exigences, et vérifie que le processus de conception et de développement et la
surveillance après commercialisation sont cohérents avec cette documentation [39]. Le point 1 de
l'annexe III (biométrie) peut utiliser l'annexe VI ou l'annexe VII uniquement si le fournisseur a
appliqué des normes harmonisées ou des spécifications communes ; sinon, il doit suivre l'annexe VII,
dans laquelle un organisme notifié évalue le système de gestion de la qualité et la documentation
technique, avec accès complet aux jeux de données d'entraînement, de validation et de test, délivre
un certificat et doit être informé des modifications [39]. Aucune norme harmonisée n'avait été citée
au Journal officiel au dernier contrôle que ce livre enregistre (2026-09-19 ; voir
[ce qui n'est pas encore harmonisé](/bok/regulatory-map#what-is-not-harmonised-yet)) [40] ; tant que
cela tient, un fournisseur de biométrie planifiant aujourd'hui devrait planifier pour un organisme
notifié. Les produits de l'annexe I suivent leur procédure de conformité sectorielle, et l'Omnibus
permet aux organismes notifiés en vertu de cette législation d'évaluer les exigences en matière d'IA
s'ils demandent une désignation avant le 28 jan 2028 [17].

**Déclaration, marquage et enregistrement.** La déclaration UE de conformité suit l'annexe V et est
conservée pendant 10 ans ; le marquage CE est apposé de manière visible, lisible et indélébile, ou
numériquement pour les systèmes fournis numériquement [41]. Avant la mise sur le marché, le
fournisseur enregistre les systèmes de l'annexe III dans la base de données UE, sauf le point 2
(infrastructure critique), qui est enregistré au niveau national ; les systèmes que le fournisseur a
jugés non à haut risque en vertu de l'art. 6(3) sont également enregistrés ; et les systèmes de
garantie du cumul du Droit, de migration, d'asile et de frontières sont placés dans une section non
publique [42]. Après l'Omnibus, l'enregistrement de l'art. 6(3) demande moins de données, et les PME
et petites entreprises de taille intermédiaire peuvent fournir la documentation technique sous une
forme simplifiée que la Commission établit [17]. Le mouvement d'ingénierie consiste à générer la
charge utile de la base de données à partir de l'entrée du registre, de sorte que l'enregistrement
et le [**Agent Registry**](/patterns/agent-registry) ne puissent pas diverger.

### ### Modification substantielle

Une **modification substantielle** est une modification après la mise sur le marché « qui n'a pas
été prévue ou planifiée lors de l'évaluation initiale de la conformité effectuée par le fournisseur
et qui, de ce fait, affecte la conformité du système d'IA aux exigences énoncées au chapitre III,
section 2, ou entraîne une modification de la destination pour laquelle le système d'IA a été évalué
» [5]. Elle déclenche une nouvelle évaluation de la conformité (art. 43(4)) ; pour les systèmes qui
continuent à apprendre après la mise en service, les modifications que le fournisseur a
prédéterminées lors de l'évaluation initiale et décrites dans la documentation technique ne sont pas
des modifications substantielles [39], ce qui explique pourquoi l'annexe IV point 2(f) demande ces
modifications prédéterminées et les solutions techniques qui maintiennent la conformité du système à
mesure qu'il évolue [9].

Écrivez l'enveloppe prédéterminée sous forme de code : sources de données autorisées, cadence de
réentraînement, planchers de métriques et plages de seuils. Ensuite, classifiez chaque modification
du modèle, des données, des prompts, des outils ou des seuils lors de la fusion : à l'intérieur de
l'enveloppe (réexécutez les portes), en dehors mais la conformité inaffectée (réexécutez les portes
et enregistrez le raisonnement), ou une modification substantielle potentielle (arrêtez, examen
juridique, réévaluation). Un modèle réentraîné est une nouvelle version. Il passe les mêmes portes,
obtient une nouvelle version dans le registre et régénère ses fiches ; il n'hérite pas des verdicts
de son prédécesseur. Pour les agents, le chapitre 23 place
[les modifications de prompt et de system-prompt sous contrôle des modifications](/bok/governing-agents#prompts-as-configuration-under-change-control).

## Le dossier technique

### ### Annexe IV, élément par élément

L'art. 11 exige que la documentation technique d'un système à haut risque soit établie avant sa mise
sur le marché et tenue à jour, avec au minimum le contenu de l'annexe IV [9]. La plupart de l'annexe
IV est déjà produite par un pipeline gouverné ; le reste est un jugement que seule une personne peut
fournir. Le tableau le divise.

| Élément de l'annexe IV | Ce qu'il demande | Source du pipeline | Ce qu'une personne doit encore écrire |
|---|---|---|---|
| 1(a) | Destination, fournisseur, version | Enregistrement du cas d'usage ; entrée du registre | La déclaration de destination elle-même |
| 1(b) | Interaction avec d'autres matériels, logiciels et systèmes d'IA | AIBOM ; diagramme d'architecture | Hypothèses d'intégration |
| 1(c) | Versions des logiciels et micrologiciels ; exigences de mise à jour | AIBOM ; fichiers de verrouillage | Aucun au-delà de l'examen |
| 1(d) | Formes sous lesquelles il est mis sur le marché | Manifeste de version | Description de la distribution |
| 1(e) | Matériel sur lequel il s'exécute | Manifestes de déploiement | Aucun au-delà de l'examen |
| 1(f) | Photographies, lorsqu'il s'agit d'un composant de produit | Non applicable à la plupart des logiciels | Documentation du produit |
| 1(g) | L'interface utilisateur fournie au responsable du déploiement | Captures d'écran des tests d'intégration | Description de l'utilisation |
| 1(h) | Instructions d'utilisation | Générées à partir de l'enregistrement du cas d'usage, de la fiche de modèle et du registre des abus | Limitations et conseils de supervision, en langage clair |
| 2(a) | Méthodes de développement, systèmes pré-entraînés, outils tiers | Enregistrement de l'entraînement ; AIBOM | Pourquoi ceux-ci ont été choisis |
| 2(b) | Spécifications de conception, choix clés, justification, compromis | Enregistrement de conception ; journal des décisions | La justification et les hypothèses |
| 2(c) | Architecture et ressources informatiques | Enregistrement de l'entraînement (calcul) ; diagramme d'architecture | Aucun au-delà de l'examen |
| 2(d) | Fiches : données d'entraînement, provenance, sélection, étiquetage, nettoyage | Enregistrements d'admission ; fiches ; traçabilité | Les hypothèses sur ce que les données mesurent |
| 2(e) | Évaluation des mesures de contrôle humain | Conception de la supervision ; résultats des tests avec intervention humaine | L'évaluation |
| 2(f) | Modifications prédéterminées et comment la conformité est maintenue | Enveloppe en tant que code | La justification de l'enveloppe |
| 2(g) | Validation et essais : données, métriques, impacts discriminatoires, rapports d'essai datés et signés | Plan d'essai ; résultats d'évaluation ; rapports d'essai | Signatures des personnes responsables |
| 2(h) | Mesures de cybersécurité | Résultats des tests de sécurité ; [modèle de menace](/patterns/ai-threat-model) ; [enregistrements de signature](/patterns/model-artefact-integrity) | Risque de sécurité résiduel |
| 3 | Capacités, limitations, précision pour des groupes spécifiques, résultats involontaires prévisibles | Fiche de modèle ; évaluations de sous-groupes ; registre des abus | Interprétation des limites |
| 4 | Pourquoi les métriques de performance sont appropriées | Plan d'essai | L'argument |
| 5 | Le système de gestion des risques | Registre des risques | Jugement sur le risque résiduel |
| 6 | Modifications pertinentes au cours du cycle de vie | Contrôle de version ; historique du registre | Aucun au-delà de l'examen |
| 7 | Normes harmonisées appliquées, ou autres solutions utilisées | Fichier de correspondance | Description des solutions (aucune norme citée au JO au dernier contrôle) |
| 8 | Une copie de la déclaration UE de conformité | Générée à partir des preuves | Signature |
| 9 | Le système de surveillance après commercialisation, avec son plan | Configuration de la surveillance | Les déclencheurs et réponses du plan |

Le plan de surveillance après commercialisation fait partie de ce fichier, pas un document séparé
(art. 72(3)) [43]. Construisez le fichier comme le code est construit : un travail de documentation
l'assemble à chaque candidat à la version, échoue lorsqu'une ligne générée est obsolète ou qu'une
ligne écrite est plus ancienne que la version du modèle qu'elle décrit, et émet le résultat sous
forme de [**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal) aux
côtés d'un rendu lisible par l'homme.

### ### Fiches de modèle, fiches de système et fiches de données

Les documents se chevauchent et répondent à des questions différentes pour des lecteurs différents.

| Document | Décrit | Lecteur principal | Rempli à partir de |
|---|---|---|---|
| Fiche de modèle | Un modèle entraîné : utilisation prévue, évaluation entre les groupes et les conditions, limitations [44] | Intégrateurs, responsables du déploiement, auditeurs | Résultats d'évaluation ; AIBOM |
| Fiche de système | Le système déployé : modèles, prompts, récupération, outils, guardrails et supervision | Responsables du déploiement, autorités, le public | Registre ; configuration des guardrails ; résultats des tests adversariaux |
| Fiche de données (fiche de données) | Un ensemble de données : motivation, composition, collecte, prétraitement, utilisations, distribution, maintenance [25] | Propriétaires de données, constructeurs de modèles, auditeurs | Enregistrement d'admission ; traçabilité |
| Instructions d'utilisation | Ce qu'un responsable du déploiement doit savoir pour utiliser correctement un système à haut risque (art. 13) [14] | Responsables du déploiement | Enregistrement du cas d'usage ; fiche de modèle ; registre des abus |
| Fichier technique | Tous les éléments ci-dessus plus la gestion des risques, les normes, la déclaration et le plan de surveillance [9] | Autorités ; organismes notifiés | Tout ce qui précède |

La plupart des risques se situent dans le système, pas dans le modèle brut
([chapitre 01](/bok/definition#the-object-of-governance)), donc une fiche de modèle seule
sous-décrit tout ce qui a des outils ou une récupération. Générez chaque fiche à partir des mêmes
enregistrements, comme dans le modèle
[**Model Card as Control Evidence**](/patterns/model-card-as-control-evidence), de sorte que la
fiche qu'un auditeur lit soit la fiche que la production a produite.

### ### Le côté fournisseur de l'IA à usage général

Un fournisseur d'un modèle d'IA à usage général a son propre ensemble de documentation en vertu de
l'art. 53 : documentation technique selon l'annexe XI pour le Bureau de l'IA et les autorités
nationales, informations selon l'annexe XII pour les fournisseurs en aval, une politique de droits
d'auteur, et un résumé public du contenu d'entraînement sur le modèle du Bureau de l'IA [20].
L'annexe XI couvre l'architecture et le nombre de paramètres, la méthodologie d'entraînement, les
données d'entraînement (type, provenance, curation, méthodes de détection des sources inappropriées
et des biais), le calcul et la consommation d'énergie connue ou estimée ; pour les modèles
présentant un risque systémique, elle ajoute des stratégies d'évaluation, des tests adversariaux et
l'architecture du système [12].

Qui est un fournisseur d'IA à usage général est en partie une question de calcul. Le critère
indicatif de la Commission est un calcul d'entraînement supérieur à 10^23 FLOP avec la capacité de
générer du langage, du texte vers image ou du texte vers vidéo ; un modificateur en aval est
indicativement le fournisseur du modèle modifié lorsque son calcul de modification dépasse un tiers
de celui de l'original ; et la présomption de risque systémique commence à 10^25 FLOP, avec
notification à la Commission dans les deux semaines [11]. Mettez ces seuils dans l'enregistrement de
sélection du modèle de l'examen de conception, car un plan d'ajustement fin peut changer le rôle
juridique de l'organisation.

Trois instruments de la Commission transforment les obligations en artefacts. Le Code de pratique de
l'IA à usage général (10 juil. 2025, volontaire) comprend, dans son chapitre Transparence, un
formulaire de documentation de modèle [45] qui rassemble les informations des annexes XI et XII en
un seul endroit et marque chaque élément pour les fournisseurs en aval, le Bureau de l'IA ou les
autorités nationales ; le Code demande que la documentation de chaque version soit conservée pendant
10 ans [46]. Le résumé du contenu d'entraînement utilise un modèle qui est obligatoire en vertu de
l'art. 53(1)(d) : il couvre les informations générales, les sources de données (y compris les
données publiques, privées, extraites, utilisateur et synthétiques) et le traitement des données,
énumère les 10 % supérieurs des domaines extraits (5 % ou 1 000, selon le moins élevé, pour les
PME), est actualisé tous les six mois ou plus tôt après une mise à jour importante, et doit exister
avant le 2 août 2027 pour les modèles mis sur le marché avant le 2 août 2025 [28]. Pour les modèles
à risque systémique, le chapitre Sécurité et sûreté du Code ajoute un rapport de sécurité et de
sûreté du modèle, créé avant la mise sur le marché du modèle et tenu à jour (engagement 7) [46].
Implication d'ingénierie : le formulaire de documentation de modèle est généré à partir de
l'enregistrement d'entraînement et de l'AIBOM, et le résumé du contenu d'entraînement, y compris sa
liste de domaines, est une requête sur les enregistrements d'admission et les journaux
d'exploration, pas un exercice de rédaction.

### ### Décisions de publication en poids ouvert

La mise en circulation est un gradient, non un interrupteur. Solaiman décrit six niveaux d'accès :
complètement fermé, accès graduel ou échelonné, accès hébergé, accès cloud ou API, accès
téléchargeable et complètement ouvert [47]. La mise en circulation échelonnée, telle que pratiquée
pour GPT-2 en 2019, laisse du temps entre les versions pour l'analyse des risques et des bénéfices à
mesure que les capacités augmentent [48]. Pour les poids ouverts, la décision est irréversible d'une
manière que rien d'autre dans ce chapitre ne l'est : un modèle mis en circulation ne peut pas être
rappelé, corrigé ou placé derrière un kill switch. Le dossier de mise en circulation doit donc
contenir les évaluations de capacité et d'usage détourné, le registre des mauvais usages, la réponse
à « que ferions-nous si cela est utilisé à mauvais escient, étant donné que nous ne pouvons pas le
retirer ? », et le choix de licence. La définition de l'Open Source Initiative exige les libertés
d'utiliser, d'étudier, de modifier et de partager, et traite les données, les informations, le code
et les paramètres comme la forme préférée pour la modification [49] ; une licence qui restreint les
domaines d'utilisation ne la satisfait donc pas.

Les exemptions légales pour l'open source sont plus étroites qu'elles ne le paraissent.

- Le Reglamento de IA ne s'applique pas aux systèmes d'IA mis en circulation sous des licences
  libres et open source, sauf s'ils sont mis sur le marché ou mis en service en tant que systèmes à
  haut risque, en tant que pratiques interdites ou en tant que systèmes de l'art. 50 (art. 2(12))
  [37].
- Un modèle GPAI sous une licence libre et open source avec des paramètres publics est exempté
  uniquement des obligations de documentation de l'annexe XI et de l'annexe XII ; la politique de
  droits d'auteur et le résumé du contenu d'entraînement s'appliquent toujours, et aucune exemption
  ne s'applique aux modèles présentant un risque systémique (art. 53(2)) [20][11].
- Les lignes directrices de la Commission traitent la monétisation comme disqualifiante : la double
  licence (gratuit pour l'usage académique, payant pour l'usage commercial), le support payant qui
  est nécessaire pour utiliser le modèle, et le traitement des données utilisateur à des fins
  commerciales sont donnés comme exemples [50].

### Enregistrement

Pour les systèmes à haut risque, le fournisseur tient la documentation technique, la documentation
du système de gestion de la qualité, les modifications approuvées par les organismes notifiés, leurs
décisions et la déclaration UE de conformité à la disposition des autorités nationales pendant 10
ans après la mise sur le marché (art. 18), et conserve les journaux que le système génère
automatiquement, lorsqu'ils sont sous son contrôle, pendant une période appropriée à la finalité
prévue d'au moins six mois, sauf si une autre loi en dispose autrement ; les institutions
financières les conservent dans leur documentation relative aux services financiers (art. 19) [51].
Les responsables de l'implantation supportent une obligation de journalisation parallèle, couverte
au [chapitre 15](/bok/governing-deployment#records-retention).

Traitez la conservation comme du code : chaque classe de preuves porte une règle de conservation
liée à son obligation, les enregistrements signés vont au stockage en écriture unique, une mise en
attente légale remplace la suppression, et le plancher de six mois pour les journaux est un
plancher, non une valeur par défaut, réconcilié avec la limitation du stockage du RGPD pour les
données personnelles dans les journaux. Un horizon de 10 ans dépasse la durée de vie de la plupart
des outils, ce qui plaide pour des formats ouverts (JSON, `OSCAL`).

### Divulgations publiques

Différents publics sont redevables de divulgations différentes, et chacun a quelque chose qui ne
doit pas être publié.

| Public | Ce qu'il reçoit | Canal | Ce qu'il faut retenir |
|---|---|---|---|
| Autorité ou organisme notifié | Le dossier technique complet, les journaux de test, l'accès aux ensembles de données en vertu de l'annexe VII | Sur demande ; évaluation de la conformité | Rien que la loi n'exige ; marquez les secrets commerciaux comme confidentiels |
| Déployeur | Instructions d'utilisation (art. 13) ; fiches de modèle et de système ; informations de l'annexe XII pour GPAI | Contrat ; portail de documentation | Détail de sécurité exploitable ; poids |
| Personnes affectées | Que l'IA est utilisée, et comment contester ou demander une explication (voir [chapitre 15](/bok/governing-deployment#external-communications)) | Interface du produit ; avis | Rien concernant leur propre cas auquel un droit les autorise |
| Le public | Entrée de la base de données UE ; résumé du contenu d'entraînement GPAI ; documentation AB 2013 ; résumés d'audit de biais ; évaluations d'impact publiées | Site Web ; registres publics | Détail d'exploit de red team ; données personnelles ; configuration de sécurité |

Deux divulgations non-UE montrent le modèle. La Local Law 144 de New York City exige que les
employeurs utilisant un outil de décision d'emploi automatisé fassent réaliser un audit de biais par
un auditeur indépendant au cours de l'année précédente, publient un résumé de ses résultats, y
compris la source des données utilisées, et notifient les candidats 10 jours ouvrables avant
l'utilisation [52]. La Directive canadienne sur la prise de décision automatisée exige que les
institutions fédérales publient les résultats finaux de leur évaluation de l'impact algorithmique
sur le Portail du gouvernement ouvert avant que le système ne soit mis en production [53].

> **En pratique (illustratif)**
> Un fournisseur préparant un système de l'annexe III pour la date du 2 décembre 2027 a énuméré les
> 23 éléments de l'annexe IV dans un fichier, une ligne chacun, avec la source du pipeline et un
> auteur nommé. La plupart des lignes se sont avérées être assemblées à partir d'enregistrements que
> le pipeline avait déjà émis ; le reste était la justification, les jugements de risque résiduel et
> les signatures. Le travail de documentation s'est exécuté sur chaque candidat à la version et a
> échoué deux fois au cours de son premier mois : une fois sur une fiche de modèle plus ancienne que
> le modèle, une fois sur un rapport de test que personne n'avait signé. Les deux défaillances
> auraient fait surface un an plus tard, devant un organisme notifié.

## Comparaison des évaluations d'impact

Un seul système peut déclencher plusieurs évaluations d'impact à la fois. Elles se chevauchent sur
les faits (qui est affecté, ce qui pourrait mal tourner, quels contrôles existent) et diffèrent sur
la loi, le déclencheur, l'examinateur et le public. La réponse d'ingénierie est une base de faits
partagée avec plusieurs vues, non cinq documents qui divergent.

| Évaluation | Réalisé par | Déclencheur | Quand | Examiné ou signé par | Publié | Réévalué quand |
|---|---|---|---|---|---|---|
| Évaluation d'impact du système d'IA (ISO/IEC 42005) | L'organisation développant ou fournissant le système | Politique organisationnelle ; ISO/IEC 42001 A.5 | Tout au long du cycle de vie, à partir de la conception [54] | Selon le système de gestion de l'IA de l'organisation | Volontaire | Mise à jour selon les besoins au cours du cycle de vie [54] |
| AIPD (RGPD art. 35) | Le responsable du traitement | Traitement susceptible de présenter un risque élevé ; cas obligatoires à l'art. 35(3) | Avant le traitement [16] | Responsable du traitement, avec l'avis du DPO ; l'autorité de contrôle si un risque élevé persiste (art. 36) | Non requis | Quand le risque du traitement change (art. 35(11)) [16] |
| FRIA (Reglamento de IA art. 27) | Les responsables de l'implantation qui sont des organismes publics ou fournissent des services publics, et les responsables de l'implantation des systèmes de l'annexe III 5(b) et (c) | Implantation d'un système à haut risque de l'annexe III (non point 2) | Avant la première utilisation [55] | Les résultats sont notifiés à l'autorité de surveillance du marché | Non requis publiquement | Quand tout élément évalué change [55] |
| Évaluation de l'impact algorithmique (Canada) | Institution fédérale | Système de décision automatisée en vertu de la Directive | Avant la production [53] | Approuvé en interne ; examen d'expert selon le niveau d'impact | Oui, Portail du gouvernement ouvert | Selon un calendrier, et quand la fonctionnalité ou la portée change [53] |
| Audit de biais (NYC Local Law 144) | Auditeur indépendant, pour l'employeur ou l'agence | Utilisation d'un outil de décision d'emploi automatisé à New York | Dans l'année précédant l'utilisation [52] | Auditeur indépendant | Oui, résumé des résultats | Chaque année [52] |
| Validation de modèle indépendante (SR 26-2, SS1/23) | Fonction de validation indépendante du développement | Utilisation du modèle dans une banque supervisée | Généralement avant la première utilisation [7] | Validateurs ayant le pouvoir d'effectuer un changement | Non | Périodiquement, et en cas de changement matériel [7] |

### Dimensions qui rendent les impacts comparables

Évaluez chaque impact sur les mêmes axes, quelle que soit l'évaluation qu'il alimente : **gravité**
(à quel point c'est mauvais pour la personne affectée), **ampleur** (combien de personnes),
**réversibilité** (si le préjudice peut être annulé, et à quelle vitesse), **durée** et
**probabilité**. Les dimensions ne sont pas inventées ici. La Directive canadienne définit ses
niveaux d'impact par eux, du niveau I, où les impacts sont susceptibles d'être « peu ou pas,
facilement réversibles et brefs », au niveau IV, où ils sont susceptibles d'être « très élevés,
irréversibles et perpétuels » [53]. La FRIA demande les catégories affectées, les risques
spécifiques de préjudice, les mesures de surveillance et les arrangements d'atténuation et de
plainte (art. 27(1)) [55] ; l'AIPD demande le traitement, sa nécessité et sa proportionnalité, les
risques et les mesures (art. 35(7)) [16]. Un enregistrement avec ces champs répond aux deux, et
l'art. 27(4) permet à une FRIA de s'appuyer sur une AIPD qui couvre le même terrain [55].

### Réalisation par rapport à examen

Le réalisateur possède les faits ; l'examinateur les conteste. Un examinateur qui n'a pas rédigé
l'évaluation vérifie six choses : la portée correspond au dossier de cas d'utilisation actuel ; les
groupes affectés incluent les personnes qui n'utilisent jamais le système ; chaque évaluation de
risque cite des preuves (un id d'évaluation, un rapport de test, un profil de données), non une
opinion ; chaque atténuation est liée à un contrôle qui fonctionne ; le risque résiduel est accepté
par quelqu'un ayant l'autorité de l'accepter ; et les déclencheurs de réévaluation sont écrits comme
des conditions qu'un pipeline peut évaluer. Une évaluation qui échoue l'une des six revient, aussi
bien rédigée soit-elle.

### Déclencheurs de réévaluation

Codifiez les déclencheurs afin que le registre, non un rappel calendaire, rouvre l'évaluation : une
finalité prévue nouvelle ou élargie ; réentraînement sur une nouvelle source de données ; une
nouvelle population affectée, langue ou juridiction ; un changement de seuil ; un incident ou un
quasi-incident ([chapitre 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite)) ;
un signal de surveillance en dehors de sa bande ; une nouvelle loi ou orientation ; et une date
d'examen programmée. Le modèle
[**FRIA-as-Code**](/patterns/fria-as-code#re-assessment-triggers-as-code) fait déjà cela pour la
FRIA et sa référence croisée AIPD ; la même structure se généralise, en tant que
Impact-Assessment-as-Code, à chaque évaluation du tableau.

> **En pratique (illustratif)**
> Le modèle de limite de crédit de l'exemple de cas d'utilisation était soumis à quatre évaluations
> à la fois : une AIPD (la banque en tant que responsable du traitement), une FRIA (la banque en
> tant que responsable de l'implantation d'un système de l'annexe III 5(b)), une évaluation d'impact
> réalisée par l'équipe du modèle selon les lignes ISO/IEC 42005, et une validation indépendante.
> L'équipe a conservé une base de faits unique (groupes affectés, préjudices évalués sur les cinq
> dimensions, contrôles avec leurs ids d'évaluation) et a rendu quatre vues à partir de celle-ci.
> Quand le réentraînement a ajouté une nouvelle source de données, le changement de lignée a
> déclenché le déclencheur pour les quatre dans la même exécution de pipeline, et les examinateurs
> ont vu un diff au lieu de quatre nouveaux documents.

**Correspondances :** Reglamento de IA art. 3(12), 3(13) et 3(23), art. 9, 10, 11 et annexe IV, art.
13, 17, 18, 19, 25, 27, 43 et annexes VI et VII, art. 47 à 49, art. 53 et annexes XI et XII, art. 72
· RGPD art. 35 · ISO/IEC 42001 (A.5, A.6, A.7), ISO/IEC 42005, ISO/IEC 5338, ISO/IEC 5259 · NIST AI
RMF (Map, Measure) · Couche 01 Govern-as-Code à couche 05 Assurance & Continuous Compliance. Les
mappages sont illustratifs, non une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. Rédigez le dossier de cas d'usage pour le système à plus haut risque en développement, en
   incluant ses utilisations hors champ et son appétit pour les faux positifs par rapport aux faux
   négatifs, et stockez-le dans l'entrée du registre.
1. Figez le plan de test pour sa prochaine version dans le dépôt : métriques, seuils, sous-groupes,
   exécutions répétées et la taille d'échantillon dont chaque seuil a besoin pour être distinguable
   d'un échec.
1. Choisissez un ensemble de données d'entraînement et remplissez son dossier d'admission (base ou
   licence, vérification des réserves, provenance, propriétaire, gestionnaire), puis faites en sorte
   que le travail d'entraînement refuse les ensembles de données sans dossier.
1. Mappez votre documentation actuelle au tableau de l'annexe IV ci-dessus et marquez chaque ligne
   générée, rédigée ou manquante.
1. Énumérez chaque analyse d'impact que le système déclenche et déplacez leurs faits partagés dans
   un seul dossier, avec les déclencheurs de réévaluation écrits comme des conditions.

## Sources

[1] ISO/IEC 5338:2023, AI system life cycle processes. ISO/IEC. 2023. https://www.iso.org/standard/81118.html (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (Annex A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] AI Risk Management Framework 1.0 (NIST AI 100-1; MAP 1.1 intended purposes and context documented, MAP 1.5 risk tolerances, MAP 1.6 system requirements, MEASURE 2.1 test sets and metrics documented, MEASURE 2.5 validity and reliability). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system: design control and design verification; examination, test and validation procedures before, during and after development; data management). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[6] Rules of Machine Learning: Best Practices for ML Engineering (Rule #1: "Don't be afraid to launch a product without machine learning"). Google for Developers. n.d. (accessed 2026-09-24). https://developers.google.com/machine-learning/guides/rules-of-ml (verified: primary)
[7] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; generative and agentic AI models out of scope; effective challenge; conceptual soundness, ongoing monitoring, outcomes analysis; model use beyond intended purpose). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (responsibilities along the AI value chain; 25(1)(c) a third party that modifies the intended purpose of a system so that it becomes high-risk is considered its provider). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 11 and Annex IV (technical documentation: 1(a) to (h) general description incl. instructions for use; 2(a) to (h) development process, design choices and trade-offs, compute, datasheets and provenance, oversight, pre-determined changes, validation and testing with dated and signed reports, cybersecurity; 3 to 9 capabilities and limitations, metrics, risk management, changes, standards, declaration, post-market monitoring). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_IV (verified: primary)
[10] Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead (Cynthia Rudin). Nature Machine Intelligence. 2019. https://www.nature.com/articles/s42256-019-0048-x (verified: primary)
[11] General-Purpose AI Models in the AI Act: Questions & Answers (indicative GPAI criterion: training compute above 10^23 FLOP and generation of language, text-to-image or text-to-video; a downstream modifier is indicatively the provider when modification compute exceeds a third of the original's; 10^25 FLOP systemic-risk threshold; notification within two weeks; Art. 53(2) open-source conditions). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annexes XI and XII (GPAI technical documentation: architecture and parameters, training methodology, training data provenance and curation, compute, known or estimated energy consumption; Section 2 for systemic-risk models: evaluation strategies, adversarial testing, system architecture; Annex XII information for downstream providers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2)(b) risks under reasonably foreseeable misuse; 9(8) testing against prior defined metrics and probabilistic thresholds, before placing on the market). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and instructions for use; 13(3)(b)(iii) known or foreseeable circumstances, incl. reasonably foreseeable misuse, that may lead to risks). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[15] Ethics Guidelines for Trustworthy AI (High-Level Expert Group on AI; oversight through human-in-the-loop, human-on-the-loop and human-in-command approaches). European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[16] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing; Art. 35 data protection impact assessment (35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes); Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a replaces the deleted Art. 10(5) for special-category data in bias detection; simplified technical documentation for SMEs and small mid-caps under Art. 11(1); Annex VIII Section B points 7 and 9 deleted for Art. 6(3) registrations; Art. 43(3) sectoral notified bodies to apply for designation by 28 Jan 2028; Art. 60 scope (Annex III and Annex I Section A) and new Art. 60a (Annex I Section B)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[18] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[19] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI provider obligations: (a) Annex XI documentation, (b) Annex XII information for downstream providers, (c) copyright policy incl. reservations of rights, (d) public summary of training content on the AI Office template; 53(2) open-source exemption from (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[21] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance: 10(2) practices, 10(3) relevant, sufficiently representative, free of errors and complete, 10(4) specific setting of use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[22] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[23] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[24] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[25] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[26] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[27] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[28] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data; top 10% of scraped domains, for SMEs 5% or 1,000; six-monthly update). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[29] ISO/IEC TR 29119-11:2020, Software testing, Part 11: Guidelines on the testing of AI-based systems. ISO/IEC. 2020. https://www.iso.org/standard/79016.html (verified: primary)
[30] ISO/IEC TR 24029-1:2021 and ISO/IEC 24029-2:2023, Robustness of neural networks (Part 1 overview; Part 2 methodology for the use of formal methods). ISO/IEC. 2021–2023. https://www.iso.org/standard/79804.html (verified: primary)
[31] Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (Evan Miller; arXiv 2411.00640). arXiv. 2024-11-01. https://arxiv.org/abs/2411.00640 (verified: primary)
[32] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.; position, verbosity and self-enhancement biases; over 80% agreement with human preferences; arXiv 2306.05685). arXiv. 2023-06-09. https://arxiv.org/abs/2306.05685 (verified: primary)
[33] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[34] SS1/23, Model risk management principles for banks (five principles incl. independent model validation; UK-incorporated banks, building societies and PRA-designated investment firms with internal-model approval; addresses AI and machine-learning techniques; first published 17 May 2023, in effect from 17 May 2024; current version published and effective 23 Apr 2026 after low-impact amendments). Bank of England, Prudential Regulation Authority. 2026-04-23. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[35] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[36] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[37] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 2 (2(8) research, testing and development before placing on the market excluded, except testing in real-world conditions; 2(12) systems under free and open-source licences excluded unless high-risk, Art. 5 or Art. 50). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_2 (verified: primary)
[38] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 43 and Annexes VI and VII (internal control for Annex III points 2 to 8; Annex VI or VII for point 1 where harmonised standards or common specifications are applied, Annex VII otherwise; Annex I products under sectoral procedures; 43(4) new assessment on substantial modification, pre-determined changes excepted; Annex VII notified-body access to training, validation and testing data and control of changes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_43 (verified: primary)
[40] CEN-CENELEC JTC 21 standards tracker (no AI Act harmonised standard cited in the Official Journal, so no Art. 40 presumption of conformity; tracker updated 29 Jun 2026; the book's regulatory map rechecked on 2026-09-19). CEN-CENELEC JTC 21 (via kla.digital). 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[41] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 47 and 48 (EU declaration of conformity per Annex V, kept for 10 years; CE marking affixed visibly, legibly and indelibly, digital marking for digitally provided systems, notified-body number where applicable). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_47 (verified: primary)
[42] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 49 (registration in the EU database before placing on the market; Annex III point 2 at national level; Art. 6(3) systems; public-authority deployers; non-public section for law enforcement, migration, asylum and border control). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_49 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 72 (post-market monitoring system; 72(3) the monitoring plan is part of the Annex IV technical documentation; as amended by Reg. (EU) 2026/1744, Commission guidance including a template by 2 Sep 2027). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_72 (verified: primary)
[44] Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[45] The General-Purpose AI Code of Practice (published 10 Jul 2025; voluntary; Transparency chapter with a Model Documentation Form; Safety and Security chapter for systemic-risk models). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[46] EU AI Act: General-Purpose AI Code of Practice, final version (unofficial reader: Model Documentation Form marks items for downstream providers, AI Office or national authorities; documentation kept 10 years per version; Safety and Security chapter Commitment 7, a Safety and Security Model Report before placing a model on the market). code-of-practice.ai (Alexander Zacherl). 2025. https://code-of-practice.ai/ (verified: secondary)
[47] The Gradient of Generative AI Release: Methods and Considerations (Irene Solaiman; six levels of access from fully closed to fully open; arXiv 2302.04844). arXiv. 2023-02-05. https://arxiv.org/abs/2302.04844 (verified: primary)
[48] Release Strategies and the Social Impacts of Language Models (Solaiman et al.; GPT-2 staged release; arXiv 1908.09203). arXiv. 2019-08-24. https://arxiv.org/abs/1908.09203 (verified: primary)
[49] The Open Source AI Definition 1.0 (freedoms to use, study, modify and share; preferred form for modification covers data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[50] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; section 4.2.2, paras 82 to 84: monetisation defeats the open-source exceptions, e.g. dual licensing free for academic and paid for commercial use, paid support or services required to access or use the model, and processing of personal data other than strictly for model security). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 18 and 19 (provider keeps technical documentation, QMS documentation, notified-body decisions and the EU declaration for 10 years; automatically generated logs kept at least six months unless other law provides otherwise; financial institutions keep logs within financial-services documentation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[52] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; public summary incl. data source; notice 10 business days before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[53] Directive on Automated Decision-Making (6.1 algorithmic impact assessment completed, approved and published on the Open Government Portal before production, updated on a schedule and when functionality or scope changes; 6.3.7 expert review; Appendix B impact levels defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[54] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[55] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c), except point 2 systems; elements (a) to (f); results notified to the market surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
