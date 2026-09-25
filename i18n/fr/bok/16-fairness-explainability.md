---
lang: fr
source: bok/16-fairness-explainability.md
sourceHash: "51457249289a3e5c6a3d9843df211b5c45bec1543edc01267f5faaa5f38770b9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 16. Équité et explicabilité pour les praticiens

> L'équité et l'explicabilité ne deviennent des contrôles que lorsqu'elles sont mesurées, contrôlées
> et classées comme preuves ; ce chapitre mappe chaque technique à sa couche de stack et son crochet
> juridique.

## Comment lire ce chapitre

L'équité et l'explicabilité sont les deux principes que tout cadre d'IA responsable énonce et les
deux qui restent le plus souvent sur l'affiche. Le NIST AI Risk Management Framework énumère « Fair
– with Harmful Bias Managed » et « Explainable and Interpretable » parmi les caractéristiques d'une
IA digne de confiance, et attribue à chacune une sous-catégorie de mesure : `MEASURE 2.11` (l'équité
et les biais sont évalués et les résultats documentés) et `MEASURE 2.9` (le modèle est expliqué,
validé et documenté, et sa sortie interprétée en contexte) [1]. La question d'ingénierie est ce que
ces deux phrases deviennent un mardi : quelle métrique, calculée sur quelle tranche, par rapport à
quel seuil, en cas d'échec de quelle construction ; quelle explication, produite par quelle méthode,
testée comment, livrée à qui, et conservée comme quel enregistrement.

Le chapitre maintient la ligne de la maison du chapitre 01. L'IA responsable et l'éthique de l'IA
fixent l'objectif ; l'ingénierie de la gouvernance de l'IA construit le contrôle qui l'atteint et la
preuve qui le démontre (voir
[le cluster de désambiguïsation](/bok/definition#the-disambiguation-cluster)). Rien ici n'est un
conseil juridique. La loi décide quelle disparité est illégale et quelle explication est due ;
l'ingénieur construit la mesure et l'explication afin que le service juridique ait quelque chose de
vrai sur lequel décider.

Les deux moitiés vont ensemble pour une raison pratique. L'équité concerne les résultats entre les
personnes ; l'explicabilité concerne les raisons d'un résultat. Une explication est la façon dont un
individu découvre qu'une décision a été injuste envers lui, et les méthodes d'attribution sont un
moyen pour une équipe de trouver le proxy qui a rendu un modèle injuste. Les deux échangent
également contre la vie privée : vous ne pouvez pas mesurer une disparité entre un groupe que vous
ne pouvez pas observer, ou expliquer une décision sans divulguer quelque chose sur ses données. La
première moitié couvre l'équité, la deuxième l'explicabilité, et la dernière section place les deux
dans les cinq couches du [stack](/bok/the-stack#how-to-read-the-stack).

## Où le biais entre dans le cycle de vie

NIST SP 1270 classe les biais de l'IA en trois catégories, **systémique**, **statistique** et
**humaine**, et énonce clairement qu'« il n'est pas possible d'atteindre un risque zéro de biais
dans un système d'IA » [2]. La conséquence pour un ingénieur est que l'équité est gérée comme tout
autre risque résiduel : nommée, mesurée, bornée et surveillée, jamais déclarée résolue.

Suresh et Guttag donnent la vue du cycle de vie : sept sources de préjudice en aval, réparties de la
collecte de données au déploiement [3]. Chacune a un contrôle différent, donc le premier travail est
de savoir laquelle vous regardez.

| Source | Où elle entre | Défaillance typique | Contrôle et preuve | Couche |
|---|---|---|---|---|
| Biais historique | Le monde que les données décrivent | Les décisions d'embauche passées codent la discrimination passée | Audit des étiquettes ; décision de réétiqueter ou de modifier la cible, enregistrée dans la fiche de données | 02 · 03 |
| Biais de représentation | Échantillonnage | Un groupe est sous-échantillonné, donc son taux d'erreur est élevé et bruyant | Rapport de couverture par groupe par rapport à la population de déploiement | 02 · 03 |
| Biais de mesure | Caractéristiques et étiquettes | Un proxy pratique remplace la vraie cible | Examen de la validité de la cible ; analyse des proxies | 03 |
| Biais d'agrégation | Modélisation | Un modèle ajusté à des groupes avec des relations différentes | Performance par groupe ; termes d'interaction ou modèles séparés | 03 |
| Biais d'apprentissage | Objectif d'entraînement | L'optimisation de la perte moyenne échange un groupe minoritaire | Entraînement avec contrainte d'équité ; courbes de perte par groupe | 03 |
| Biais d'évaluation | Repères | L'ensemble de test ne ressemble pas aux personnes servies | Ensemble d'évaluation tiré de la population de déploiement ; métriques tranchées | 03 |
| Biais de déploiement | Utilisation en contexte | Un score construit pour un objectif utilisé pour un autre | Champ de destination prévue dans le registre ; surveillance des abus | 02 · 04 |

Le biais de mesure mérite le plus d'attention car il passe tous les tests de précision. Le cas
canonique est un algorithme de soins de santé commercial largement utilisé qui prédisait les *coûts*
des soins de santé comme substitut au *besoin* de santé. Parce que moins d'argent a été dépensé pour
les patients noirs au même niveau de maladie, le modèle était précis sur sa cible et biaisé sur la
chose qui importait ; corriger la disparité aurait augmenté la part des patients noirs signalés pour
une aide supplémentaire de 17,7 % à 46,5 % [4]. Aucune métrique d'équité calculée par rapport à
l'étiquette de coût n'aurait pu la détecter. Ce qui la détecte est un examen de savoir si
l'étiquette mesure la construction sur laquelle porte la décision, enregistré avant l'entraînement.
[Le cas du score de risque sanitaire](/cases/health-risk-score-proxy) le lit comme une autopsie, et
[le cas du modèle de recrutement (rapporté)](/cases/recruiting-model-reported) fait de même pour le
biais historique dans les données d'embauche. La loi sur l'IA de l'UE inscrit cette vision dans la
loi pour les systèmes à haut risque. L'article 10(2)(f) et (g) exigent que les données soient
examinées pour les biais susceptibles d'affecter la santé et la sécurité, de nuire aux droits
fondamentaux ou de conduire à une discrimination interdite, et exigent des mesures pour les
détecter, les prévenir et les atténuer ; l'article 10(3) et (4) exigent que les données soient
pertinentes, suffisamment représentatives et adaptées au contexte d'utilisation [5]. L'article 15(4)
ajoute la boucle de rétroaction : un système qui continue d'apprendre doit être construit pour
réduire le risque que les résultats biaisés deviennent des entrées futures [6]. Chaque clause est un
test que vous pouvez exécuter et un enregistrement que vous pouvez conserver (voir
[Gouvernance des données dans le stack](/bok/the-stack#data-governance-across-the-stack)).

## Caractéristiques protégées, proxies et les données dont vous avez besoin pour tester

Les **caractéristiques protégées** sont définies par le cadre juridique, non par l'ingénieur. La loi
fédérale américaine sur l'emploi protège la race, la couleur, la religion, le sexe et l'origine
nationale en vertu du titre VII [7] ; la loi de l'UE sur l'égalité définit la discrimination fondée
sur des motifs tels que l'origine raciale ou ethnique [8] ; le RGPD énumère les catégories
particulières de données à caractère personnel dont le traitement est restreint [9]. Un système
déployé dans plusieurs juridictions a besoin de l'union des listes qui s'appliquent, enregistrée
dans la politique en tant que données, non dans la tête d'un ingénieur.

Supprimer l'attribut protégé de l'ensemble des caractéristiques, parfois appelé « équité par
ignorance », ne supprime pas le biais. D'autres caractéristiques portent les mêmes informations : le
code postal remplace l'ethnicité, le prénom le sexe et l'origine, une interruption de carrière le
sexe ou le handicap, le type d'appareil le revenu. Deux tests exposent les **proxies** et
appartiennent à la suite d'évaluation :

- **Prédire l'attribut protégé.** Entraînez un petit modèle pour prédire l'attribut protégé à partir
  des caractéristiques candidates. S'il réussit bien au-delà du hasard, l'ensemble de
  caractéristiques encode l'attribut et un modèle entraîné sur celui-ci peut discriminer sans jamais
  le voir.
- **Attribuer et ablater.** Utilisez l'attribution de caractéristiques (plus loin dans ce chapitre)
  pour trouver quelles caractéristiques conduisent à la disparité, puis mesurez la disparité avec
  chaque caractéristique suspecte supprimée ou neutralisée.

Les deux tests ont besoin de l'attribut protégé au moment de l'évaluation, ce qui est la tension de
confidentialité que chaque programme d'équité rencontre. L'UE l'a résolu étroitement. L'Omnibus
numérique a supprimé l'article 10(5) et a déplacé la règle dans un nouvel **article 4a**, en vigueur
depuis le 27 juillet 2026 [10]. L'article 4a(1) permet aux fournisseurs de systèmes à haut risque de
traiter exceptionnellement les catégories particulières de données à caractère personnel dans la
mesure strictement nécessaire pour la détection et la correction des biais en vertu de l'article
10(2)(f) et (g) ; l'article 4a(2) étend la même possibilité aux fournisseurs et responsables du
déploiement d'autres systèmes et modèles d'IA et aux responsables du déploiement de systèmes à haut
risque, pour les biais susceptibles d'affecter la santé et la sécurité ou les droits fondamentaux ou
de conduire à une discrimination interdite, dans les mêmes conditions, tout en déclarant que cela ne
crée aucune obligation d'exécuter une telle détection [11]. Les conditions se lisent comme une
spécification de contrôle, ce qui est la façon de les construire :

| Condition de l'art. 4a(1) | Contrôle d'ingénierie | Enregistrement de preuve |
|---|---|---|
| (a) D'autres données, y compris les données synthétiques ou anonymisées, ne fonctionneraient pas | Mémorandum de nécessité comparant les alternatives essayées | Mémorandum signé lié à partir de la fiche de données |
| (b) Limites de réutilisation et sécurité de pointe, y compris la pseudonymisation | Pseudonymisation à l'ingestion ; balise de destination appliquée à la construction du pipeline | Configuration du pipeline et verdict de politique |
| (c) Accès strict et documenté pour les personnes autorisées en vertu de la confidentialité | Rôle d'accès limité ; journalisation de l'accès | Journal d'accès par requête |
| (d) Aucune transmission à ou accès par d'autres parties | Politique d'sortie en tant que code refusant l'exportation de l'ensemble balisé | Verdicts de politique à chaque déploiement |
| (e) Suppression une fois le biais corrigé ou la rétention terminée, selon la première occurrence | Rétention en tant que code avec un travail de suppression | Événement de suppression avec hachage du dataset |
| (f) Enregistrements du traitement indiquant pourquoi le traitement était strictement nécessaire | Entrée d'enregistrement du traitement générée à partir du mémorandum | Version d'enregistrement du traitement |

L'article s'ajoute au RGPD, et non à la place de celui-ci, donc la base juridique et l'AIPD
s'appliquent toujours (voir chapitre 19,
[Confidentialité et IA](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)).
Lorsque les données de catégories particulières ne peuvent pas être utilisées du tout, les solutions
de secours sont l'auto-identification volontaire avec une déclaration claire de finalité, les tests
sur des panels consentis, et les attributs déduits ; ces derniers portent leur propre erreur et
risque juridique et ont besoin du même examen que tout autre usage des données (chapitre 19 sur
[les données sensibles déduites et proxy](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data)).

## Traitement disparate et impact disparate

La loi antidiscrimination a deux doctrines, et un système d'IA peut violer l'une ou l'autre.

| Doctrine | Cadre américain | Cadre de l'UE | À quoi cela ressemble dans un modèle | Premier test |
|---|---|---|---|---|
| **Traitement disparate** (discrimination directe) | Utilisation intentionnelle ou explicite d'une caractéristique protégée | Traitement moins favorable fondé sur un motif protégé dans une situation comparable | L'attribut protégé, ou un substitut délibéré, est une caractéristique ou une règle | Audit des caractéristiques ; test de retournement contrefactuel |
| **Impact disparate** (discrimination indirecte) | Une pratique qui cause un impact disparate et n'est pas liée à l'emploi et cohérente avec la nécessité commerciale | Un critère apparemment neutre qui désavantage un groupe de manière particulière sans justification objective | Les caractéristiques neutres produisent des résultats inégaux | Ratios de taux de sélection ; écarts de taux d'erreur |

En droit américain de l'emploi, l'impact disparate est statutaire : une pratique qui le cause est
illégale à moins qu'elle ne soit liée à l'emploi et cohérente avec la nécessité commerciale, ou
lorsqu'une alternative moins discriminatoire est refusée [7]. Le test de l'UE pour la discrimination
indirecte a la même forme : un critère apparemment neutre qui désavantage un groupe est illégal à
moins d'être objectivement justifié par un objectif légitime poursuivi par des moyens appropriés et
nécessaires [8]. Pour un ingénieur, « critère neutre » signifie « caractéristique », et « justifié »
signifie montrer pourquoi la caractéristique est nécessaire et qu'aucune alternative moins
discriminatoire ne fonctionne de manière acceptable. Cette comparaison est une évaluation, et son
résultat est une preuve.

### La règle des quatre cinquièmes et le ratio d'impact défavorable

Le nombre de dépistage le plus largement utilisé provient des Uniform Guidelines on Employee
Selection Procedures des États-Unis de 1978. Un taux de sélection pour toute race, sexe ou groupe
ethnique inférieur aux quatre cinquièmes (80 %) du taux du groupe ayant le taux le plus élevé « sera
généralement considéré » par les agences fédérales de contrôle comme une preuve d'impact disparate
[12]. Le ratio des deux taux est le **ratio d'impact disparate (AIR)**.

Le même paragraphe porte les réserves que la plupart des tableaux de bord omettent. Des différences
plus petites peuvent néanmoins constituer un impact disparate lorsqu'elles sont significatives à la
fois sur le plan statistique et pratique, et des différences plus grandes peuvent ne pas l'être
lorsqu'elles reposent sur de petits nombres et ne sont pas statistiquement significatives [12]. La
règle des quatre cinquièmes est donc un déclencheur d'enquête, non une note de passage. Une porte
qui traite 0,81 comme vert et 0,79 comme rouge, sans intervalle de confiance et sans échantillon
minimum, est le piège de Goodhart décrit dans
[les limites de la porte d'évaluation](/bok/definition#the-limits-of-the-eval-gate).

> **Exemple (illustratif)** Un modèle de dépistage fait avancer 120 des 400 candidats du groupe A
> (un taux de sélection de 30 %) et 45 des 250 du groupe B (18 %). L'AIR pour le groupe B est 18 /
> 30 = 0,60, bien en dessous de 0,8. L'évaluation enregistre les taux, les effectifs, le ratio, un
> intervalle de confiance bootstrap pour le ratio et la source de l'attribut protégé, et la porte
> achemine la publication vers un examen plutôt que de l'échouer ou de la valider silencieusement.

Le poids juridique de la règle évolue. Au 24 septembre 2026, l'application fédérale américaine s'est
détournée de l'impact disparate : le 9 juin 2026, le ministère de la Justice a annoncé un avis du
Bureau du conseiller juridique concluant que les directives relatives à l'impact disparate de la
CEEO sont inconstitutionnelles [13]. L'avis porte sur les Uniform Guidelines, est présenté comme
mettant en œuvre le décret exécutif 14281, et suit un plan d'application de la CEEO qui privilégie
le traitement disparate ; ce n'est pas une décision judiciaire, et les commentateurs notent que les
plaignants privés et de nombreuses lois des États soutiennent toujours les réclamations pour impact
disparate [14]. La conclusion technique ne change pas avec les variations de l'application : le
ratio d'impact disparate reste le signal précoce le moins coûteux d'un résultat inégal, et plusieurs
régimes l'exigent toujours nommément.

La Local Law 144 de New York City en est l'exemple le plus clair. Un employeur ne peut utiliser un
outil de décision en matière d'emploi automatisé que s'il a fait l'objet d'un audit de biais par un
auditeur indépendant au cours de l'année précédente ; l'audit doit calculer les taux de sélection ou
de notation et les ratios d'impact selon les catégories de sexe, les catégories de race/ethnicité et
les catégories **intersectionnelles** ; un résumé des résultats doit être publié ; et les catégories
représentant moins de 2 % des données d'audit peuvent être exclues [15]. La loi n'exige aucune
action spécifique sur les résultats [15], ce qui est exactement pourquoi la fonction technique
devrait attacher un seuil interne et un propriétaire : un ratio d'impact publié sans l'un ni l'autre
est la transparence sans contrôle.

Deux autres points juridiques contraignent la correction, non seulement la constatation. Le titre
VII interdit d'ajuster les scores ou d'utiliser des seuils de coupure différents selon la race, la
couleur, la religion, le sexe ou l'origine nationale dans les tests d'emploi [7], donc une
correction en post-traitement qui définit des seuils spécifiques à un groupe peut elle-même être
illégale dans ce contexte. Et toute atténuation qui utilise l'attribut protégé au moment de la
décision risque de devenir une discrimination directe selon la loi de l'UE. Les choix d'atténuation
vont au service juridique avec la preuve d'évaluation jointe (voir
[atténuation](#mitigation-before-during-and-after-training) ci-dessous). Le tableau plus large des
États-Unis et de l'UE se trouve au chapitre 20,
[Droit existant et IA](/bok/existing-law#fairness-measures-the-law-recognises).

## Métriques d'équité de groupe

Une **métrique d'équité de groupe** compare une statistique du comportement du modèle entre les
groupes. Les cinq qui importent le plus, dans le vocabulaire de la recherche qui les a définis, sont
ci-dessous. `Ŷ` est la décision ou la prédiction, `Y` le résultat réel et `A` le groupe.

| Métrique | Tient quand | Égalise | Convient quand | Attention à |
|---|---|---|---|---|
| **Parité démographique** (parité statistique) | `P(Ŷ=1 given A=a)` est égal entre les groupes | Taux de sélection | L'opportunité devrait être partagée indépendamment du résultat mesuré ; l'AIR en est la forme de ratio | Ignore les taux de base différents ; peut être satisfait en sélectionnant des membres non qualifiés d'un groupe [16] |
| **Égalité des chances** | Les taux de vrais positifs sont égaux | Bénéfice aux personnes qualifiées | Manquer une personne qualifiée est le principal préjudice (embauche, admissions, accès aux soins) [17] | Laisse les faux positifs sans contrainte |
| **Égalisation des probabilités** | Les taux de vrais positifs et de faux positifs sont tous deux égaux | Les deux types d'erreurs | Les deux erreurs sont coûteuses [17] | Plus difficile à satisfaire ; peut coûter en précision pour tous les groupes |
| **Parité prédictive** | La précision (`P(Y=1 given Ŷ=1)`) est égale | Sens d'une décision positive | Une décision positive déclenche une action dont la valeur dépend d'avoir raison (signalement de fraude) [18] | Incompatible avec des taux d'erreur égaux quand les taux de base diffèrent |
| **Étalonnage au sein des groupes** | Parmi les personnes notées `s`, une fraction `s` sont positives, dans chaque groupe | Sens d'un score | Les scores sont consommés comme des probabilités (tarification du crédit, risque clinique) [19] | Un score étalonné peut toujours produire des taux d'erreur très différents |

Deux règles pratiques en découlent. Signalez les différences *et* les ratios, car un petit écart
absolu à un taux de base faible peut être un grand ratio et l'inverse [20]. Et signalez la métrique
avec son dénominateur : un taux sur 30 personnes est une anecdote, et l'évaluation devrait le dire.
Le catalogue des outils énumère les [kits d'équité](/resources/tools#cat-fairness) comme des
exemples illustratifs, non comme des approbations.

### Équité individuelle et contrefactuelle

Les métriques de groupe peuvent être satisfaites tandis que les individus sont traités
arbitrairement au sein de chaque groupe. Deux notions au niveau individuel abordent cela.
L'**équité individuelle** exige que les individus similaires soient traités de manière similaire,
compte tenu d'une mesure de similarité spécifique à la tâche ; la partie difficile, que ses auteurs
nomment, est de convenir de cette mesure [16]. L'**équité contrefactuelle** exige qu'une décision
soit la même dans le monde réel et dans un monde contrefactuel où l'individu appartenait à un groupe
différent, ce qui nécessite un modèle causal explicite de la façon dont l'attribut influence les
autres caractéristiques [21].

Aucun n'est généralement calculé exactement en production, mais les deux ont une approximation bon
marché et utile : le **test de basculement contrefactuel**. Changez uniquement l'attribut protégé,
ou ses marqueurs textuels (un nom, un pronom, un dialecte), maintenez tout le reste constant, et
mesurez la fréquence à laquelle la décision ou le texte généré change. Pour les systèmes basés sur
LLM, c'est l'évaluation d'équité la plus pratique disponible, car les étiquettes de groupe pour les
résultats n'existent rarement tandis que les invites appariées sont faciles à générer.

## Les résultats d'impossibilité

Deux articles de 2016 et 2017 ont transformé « quelle métrique d'équité ? » d'une question technique
en un choix de valeur. Kleinberg, Mullainathan et Raghavan ont formalisé trois conditions
(étalonnage au sein des groupes et équilibre des scores pour la classe positive et pour la classe
négative) et ont prouvé que, sauf dans des cas spéciaux très contraints, aucune méthode ne peut
satisfaire les trois à la fois [19]. Chouldechova a montré que lorsque la prévalence du résultat
diffère entre les groupes, un instrument ne peut pas satisfaire la parité prédictive et les taux
d'erreur égaux simultanément, et que l'impact disparate peut survenir quand l'équilibre des taux
d'erreur échoue [18]. Les cas spéciaux sont la prédiction parfaite et les taux de base égaux, et les
déploiements réels en ont rarement l'un ou l'autre.

> **Exemple (illustratif)** Deux groupes de 1 000 personnes. Le groupe A a un taux de base de 30 %
> (300 positifs), le groupe B un taux de base de 10 % (100 positifs). Un classificateur avec le même
> taux de vrais positifs (0,8) et le même taux de faux positifs (0,1) dans les deux groupes
> satisfait l'égalisation des probabilités. Dans le groupe A, il produit 240 vrais positifs et 70
> faux positifs (0,1 × 700), une précision de 240 / 310 = 0,77. Dans le groupe B, il produit 80
> vrais positifs et 90 faux positifs (0,1 × 900), une précision de 80 / 170 = 0,47. Taux d'erreur
> égaux, sens inégal d'une décision positive : la parité prédictive échoue, et aucun choix de seuil
> ne corrige les deux tant que les taux de base diffèrent.

La conséquence technique est procédurale. Parce que les métriques entrent en conflit, le choix entre
elles est une décision de gouvernance avec un propriétaire, prise *avant* que les résultats ne
soient vus et enregistrés comme politique. Une équipe qui choisit la métrique après avoir regardé
laquelle son modèle réussit fait du shopping de métriques, et le dossier devrait rendre cela
impossible : la métrique choisie, la raison, le seuil et l'approbateur vivent dans une
[Fiche de politique](/patterns/policy-card) versionnée que l'évaluation lit.

## Tests intersectionnels et de sous-groupes

Les métriques de groupe agrégées cachent les personnes aux intersections. L'audit Gender Shades de
trois classificateurs commerciaux de genre a trouvé des taux d'erreur jusqu'à 34,7 % pour les femmes
à peau plus foncée contre un maximum de 0,8 % pour les hommes à peau plus claire [22] ; un rapport
par genre seul, ou par type de peau seul, fait la moyenne du groupe le moins bien servi dans un
groupe plus large. Kearns et ses collègues ont nommé l'échec général **gerrymandering d'équité** :
un classificateur peut sembler équitable sur chaque groupe prédéfini et violer gravement la
contrainte sur les sous-groupes structurés définis sur les attributs protégés [23]. Les fiches de
modèle ont été proposées en partie pour signaler l'évaluation entre les groupes démographiques et
intersectionnels [24], et les audits de biais de New York City exigent maintenant des catégories
intersectionnelles [15].

Les tests intersectionnels se heurtent rapidement à de petits nombres, donc l'évaluation a besoin de
règles pour eux :

- **Une taille de cellule minimale** dans la politique ; en dessous, l'évaluation signale « données
  insuffisantes », énumère la cellule et ne la compte jamais comme une réussite.
- **Des intervalles de confiance** sur chaque taux et ratio, avec la porte sur l'intervalle, non sur
  le point.
- **Une correction de comparaisons multiples énoncée**, car avec des dizaines de cellules certaines
  échouent par hasard.
- **Une recherche de la pire tranche**, par exemple un arbre peu profond ajusté à l'indicateur
  d'erreur, pour trouver des sous-groupes que personne n'a énumérés ; la métrique du pire groupe est
  signalée à côté de la moyenne.

## Choisir une métrique d'équité par cas d'usage

La métrique suit le préjudice, et le préjudice suit le cas d'usage. Le guide utilisateur de
Fairlearn sépare les **préjudices d'allocation** (un système étend ou refuse des opportunités, des
ressources ou des informations) des **préjudices de qualité de service** (un système fonctionne
moins bien pour certaines personnes même quand rien n'est refusé) et des
**préjudices de stéréotypage** [20]. Ajoutez le coût de chaque type d'erreur et le cadre juridique,
et le choix se rétrécit. Le coût de chaque type d'erreur est
l'[appétit pour l'erreur](/bok/governing-development#error-appetite-false-positives-versus-false-negatives)
du dossier du cas d'usage (chapitre 14).

| Cas d'usage | Type de préjudice | Erreur la plus coûteuse | Métrique primaire | Vérifications secondaires | Cadre juridique |
|---|---|---|---|---|---|
| Dépistage CV, promotion | Allocation | Rejeter un candidat qualifié | Taux de sélection AIR ; égalité des chances | AIR intersectionnel ; analyse de proxy | Title VII, Uniform Guidelines, NYC LL144 ; règlement sur l'IA annexe III point 4 |
| Approbation et tarification du crédit | Allocation | Les deux : refus injustifié et crédit inabordable | Calibrage au sein des groupes ; AIR de taux d'approbation | Écarts de taux d'erreur ; cohérence des codes de raison | ECOA et Regulation B, FCRA ; règlement sur l'IA annexe III point 5(b) |
| Admissibilité et récupération des prestations | Allocation (punitive lors de la réclamation) | Interruption ou réclamation injustifiée d'une prestation | Parité des taux de faux positifs | Parité prédictive ; résultats d'appel par groupe | Droit de l'égalité ; RGPD art. 22 ; règlement sur l'IA annexe III point 5(a) |
| Triage clinique | Allocation (selon les besoins) | Omission d'une personne dans le besoin | Égalité des chances ; calibrage | Examen de la validité des étiquettes (coût par rapport aux besoins) | Droit des dispositifs médicaux et droit de l'égalité |
| Parole, vision, recherche de documents | Qualité de service | Défaillance pour un groupe d'utilisateurs | Taux d'erreur du pire groupe | Erreur intersectionnelle | Accessibilité et droit de l'égalité |
| Assistant génératif | Qualité de service ; stéréotypage | Résultat dégradé ou dégradant pour un groupe | Taux de retournement contrefactuel ; plancher de qualité par groupe | Sondes de stéréotypes ; écarts de taux de refus | Droit de l'égalité et droit de la consommation |

Les points de l'annexe III sont les cas d'usage à haut risque du règlement sur l'IA pour l'emploi
(point 4), les prestations d'assistance publique (point 5(a)) et la solvabilité et la notation de
crédit (point 5(b)), qui exclut expressément les systèmes utilisés pour détecter la fraude
financière [25]. Le tableau est un point de départ, non une règle. Ce qui rend le choix défendable,
c'est qu'il est écrit avec ses raisons avant que l'évaluation ne s'exécute, examiné par quelqu'un
qui représente les personnes concernées (le modèle
[gouvernance en tant que code](/patterns/fria-as-code) est l'endroit où cet examen se trouve), et
révisé lorsque le cas d'usage change.

## Atténuation avant, pendant et après l'entraînement

Une fois qu'une disparité est trouvée et jugée inacceptable, les correctifs se répartissent en trois
familles selon le lieu où ils agissent. Les boîtes à outils ouvertes en implémentent beaucoup ; AI
Fairness 360 inclut les métriques et les algorithmes d'atténuation des ensembles de données et des
modèles [26], Fairlearn fournit l'évaluation et l'atténuation avec un cadre sociotechnique explicite
[27], et Aequitas se concentre sur l'audit entre les sous-groupes [28]. Ils sont nommés comme
exemples d'une catégorie, non comme des recommandations.

| Étape | Techniques (exemples) | Ce qui change | Preuve à conserver | Prudence |
|---|---|---|---|---|
| **Prétraitement** | Collecter de meilleures données ; rééquilibrer ou rééchantillonner les groupes sous-représentés ; réétiqueter après un audit des étiquettes ; transformer les caractéristiques pour supprimer les informations de proxy | Les données d'entraînement | Diff de fiche de données ; rapport de couverture avant/après | Souvent le correctif le plus durable ; le rééquilibrage peut surapprentissage sur les petits groupes |
| **Traitement en cours** | Optimisation avec contraintes d'équité ; régulariseurs sur les écarts de groupe ; débiais adversarial | L'objectif d'apprentissage | Configuration d'entraînement ; courbes de perte par groupe ; la contrainte et sa limite | Nécessite l'attribut au moment de l'entraînement (voir art. 4a) |
| **Post-traitement** | Seuils spécifiques au groupe [17] ; examen de l'option de rejet près de la limite | La règle de décision | Tableau de seuil ; version de la règle de décision | Les seuils spécifiques au groupe peuvent être illégaux dans les tests d'emploi américains [7] et risquent une discrimination directe dans l'UE |

Trois règles s'appliquent à chaque atténuation. Réexécutez la suite complète, y compris la précision
par groupe, car un correctif peut « égaliser » en rendant tout le monde plus mal loti. Enregistrez
l'atténuation comme une modification avec un propriétaire et une raison, afin que la fiche de modèle
explique le comportement. Et préférez le correctif le plus précoce qui fonctionne : de meilleures
données battent une contrainte intelligente, et une contrainte bat un correctif de seuil.

## Surveillance de l'équité en production

Une évaluation d'équité prouve que le modèle était acceptable sur les données d'évaluation au moment
de la construction. La production apporte de nouvelles personnes, des populations décalées et des
étiquettes retardées. La surveillance comble l'écart avec des signaux qui n'ont pas besoin de vérité
terrain immédiatement :

- **Taux de sélection ou d'approbation par groupe** et leur AIR, sur une fenêtre glissante, comparés
  à la ligne de base d'évaluation. Ceux-ci n'ont besoin d'aucune étiquette de résultat.
- **Calibrage et taux d'erreur par groupe** une fois que les résultats arrivent, avec le délai
  d'étiquette indiqué.
- **Signaux de contrôle humain par groupe** : taux de remplacement, temps de décision et taux
  d'annulation à la [porte de contrôle humain](/patterns/human-in-the-loop-gate). Un examinateur qui
  remplace un groupe plus souvent est un signal d'équité sur le modèle ou sur l'examinateur.
- **Plaintes, appels et demandes d'explication par groupe**, y compris leurs résultats. Le
  [canal de contestation](/patterns/decision-notice-contest-path) est un capteur.
- **Vérifications de boucle de rétroaction** pour les systèmes dont les résultats façonnent les
  futures données d'entraînement, que l'article 15(4) exige que les systèmes à haut risque qui
  continuent à apprendre traitent [6].

L'attribut de groupe est généralement absent au moment de l'exécution. Les options sont un
échantillon consenti ou un panel sur lequel l'attribut est connu, des audits périodiques selon les
conditions de l'article 4a (les responsables de systèmes à haut risque relèvent de l'article 4a(2)
[11]), ou la surveillance uniquement des taux sans résultat avec l'attribut joint dans un
environnement sécurisé. Quel que soit le choix, le [moniteur](/patterns/drift-fairness-monitor) est
un signal de couche 04 diffusé en couche 05 via
[assurance continue Telemetry](/patterns/continuous-assurance-telemetry), et une violation ouvre un
ticket avec un propriétaire, pas un graphique que personne ne lit. Une disparité qui a causé du tort
est un incident et suit le chapitre 17,
[Incidents](/bok/incidents#incident-hazard-issue-and-serious-incident).

## Transparence, interprétabilité et explicabilité

Les trois mots sont utilisés de manière interchangeable et ne devraient pas l'être. Le cadre du NIST
trace la ligne en une phrase chacun : la transparence répond « qu'est-ce qui s'est passé » dans le
système, l'explicabilité répond « comment » une décision a été prise, et l'interprétabilité répond «
pourquoi » elle a été prise et ce qu'elle signifie pour l'utilisateur en contexte [1]. Le chapitre
11 nomme les trois sources d'opacité parmi
[les traits de l'IA qui brisent la gouvernance informatique classique](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).

| Terme | Question à laquelle elle répond | Artefact typique | Public principal | Couche |
|---|---|---|---|---|
| **Transparence** | Qu'est-ce que ce système, quelles données et quel modèle utilise-t-il, que peut-il faire et ne pas faire ? | Fiche de modèle, fiche de données, AIBOM, instructions d'utilisation, avis d'utilisation de l'IA | Responsables du déploiement, auditeurs, public | 02 |
| **Explicabilité** | Comment le système est-il arrivé à ce résultat ? | Enregistrement d'explication par décision ; attribution ; codes de raison | Opérateurs, personnes concernées, examinateurs | 03 · 04 |
| **Interprétabilité** | Pourquoi ce résultat signifie-t-il ce qu'il signifie, ici ? | Un modèle dont la structure qu'une personne peut lire ; guide d'interprétation | Propriétaires de modèles, validateurs, experts du domaine | 03 |

NIST IR 8312 ajoute quatre principes qu'un système qui doit être explicable devrait respecter : il
fournit une **explication** (preuves ou raisons des résultats), l'explication est **significative**
pour son consommateur prévu, elle a une **précision d'explication** (elle reflète correctement
comment le résultat a été produit), et le système respecte les **limites de connaissance** (il
fonctionne uniquement là où il a été conçu et avec une confiance suffisante) [29]. Le troisième
principe est celui qui est le plus souvent violé, et celui auquel ce chapitre revient lors des
tests.

## Interprétable par conception ou expliqué après coup

Il y a deux routes vers une explication. Un modèle **intrinsèquement interprétable** est un modèle
dont la structure est l'explication : un modèle linéaire ou logistique clairsemé, une fiche de
pointage basée sur des points, un modèle additif généralisé, un arbre de décision peu profond ou une
courte liste de règles. Une **explication post-hoc** est produite par une deuxième méthode qui se
rapproche du comportement d'un modèle qui n'est pas lui-même lisible.

L'argument de Rudin est que pour les décisions à enjeux élevés, ce choix n'est pas neutre :
expliquer une boîte noire plutôt que d'utiliser un modèle interprétable « est susceptible de
perpétuer les mauvaises pratiques », car une explication post-hoc est un modèle du modèle, et peut
se tromper à ce sujet [30]. La forme pratique de cet argument est une règle de conception. Entraînez
d'abord une ligne de base interprétable. Si le modèle complexe ne la dépasse pas d'une marge qui
compte pour la décision, livrez le modèle interprétable ; si c'est le cas, enregistrez la marge, la
raison pour laquelle le gain justifie le risque d'explication, et la méthode post-hoc qui sera
utilisée, dans le journal des décisions de conception (chapitre 14,
[Gouvernance du développement](/bok/governing-development#architecture-and-model-selection-trade-offs)).

### Quand un modèle interprétable est requis

Aucune loi dans ce chapitre ne dit « utilisez une fiche de pointage ». Plusieurs disent des choses
qui sont difficiles à respecter d'une autre manière. Un modèle interprétable est la valeur par
défaut lorsque la plupart des éléments suivants sont vrais :

- **La décision a des effets juridiques ou similaires significatifs sur une personne** (crédit,
  emploi, prestations, assurance, éducation), donc les raisons sont dues par la loi.
- **Les raisons doivent être les facteurs réellement utilisés.** La Regulation B exige que les
  raisons d'action défavorable se rapportent aux facteurs réellement considérés ou notés [57] ; une
  approximation post-hoc peut dériver.
- **Les données sont tabulaires avec des caractéristiques significatives**, où les modèles
  interprétables sont souvent compétitifs.
- **Les validateurs ou les régulateurs doivent reproduire la logique**, comme dans la gestion des
  risques de modèle.
- **La personne doit être capable d'agir sur l'explication**, ce qui nécessite des facteurs stables
  et compréhensibles.

Lorsque ces éléments sont présents et qu'un modèle complexe est toujours choisi, la porte devrait
exiger des preuves plus solides : tests de précision d'explication, tests de stabilité des codes de
raison et une justification signée.

## Techniques d'explication

Les explications varient selon deux axes : **portée** (une explication *globale* décrit le
comportement global du modèle ; une explication *locale* explique un seul résultat) et **accès**
(une méthode *agnostique au modèle* n'a besoin que des entrées et des résultats ; une méthode
*spécifique au modèle* utilise les éléments internes du modèle). Le catalogue des outils répertorie
les [bibliothèques d'explicabilité](/resources/tools#cat-explainability) comme exemples
illustratifs, non comme des recommandations.

| | Global | Local |
|---|---|---|
| **Agnostique au modèle** | Modèles de substitution globaux ; importance des caractéristiques de permutation ; dépendance partielle | LIME ; KernelSHAP ; explications contrefactuelles ; explications par exemple le plus proche |
| **Spécifique au modèle** | Coefficients d'un modèle interprétable ; structure d'arbre ; sondage des représentations internes | TreeSHAP ; gradients intégrés et autres attributions de gradient ; analyse d'attention ou de circuit (recherche) |

### Attribution de caractéristiques : SHAP, LIME et gradients intégrés

**L'attribution de caractéristiques** assigne à chaque caractéristique d'entrée une part de
responsabilité pour une sortie. **SHAP** (SHapley Additive exPlanations) assigne à chaque
caractéristique une valeur d'importance pour une prédiction particulière, fondée sur les valeurs de
Shapley de la théorie des jeux, et unifie plusieurs méthodes antérieures en tant que mesures
d'attribution de caractéristiques additives [32]. **LIME** explique une prédiction individuelle en
ajustant un modèle simple et interprétable au comportement de la boîte noire sur des échantillons
perturbés autour de cette entrée [33]. **Les gradients intégrés** attribuent la prédiction d'un
réseau profond en accumulant les gradients le long d'un chemin d'une entrée de référence à l'entrée
réelle, et est conçu pour satisfaire deux axiomes, la sensibilité et l'invariance de mise en œuvre,
que de nombreuses méthodes d'attribution ne respectent pas [34].

Chacune a des modes de défaillance que la suite d'évaluations devrait tester plutôt que de les
ignorer :

- **Caractéristiques corrélées.** Le crédit est réparti entre les caractéristiques corrélées selon
  les hypothèses de la méthode, de sorte que deux proxies pour la même chose peuvent chacun sembler
  mineurs.
- **Références.** SHAP et les gradients intégrés expliquent par rapport à une référence ; changez-la
  et l'explication change, de sorte que la référence fait partie de l'artefact.
- **Perturbations hors-variété.** Slack et ses collègues ont construit un classificateur structuré
  dont les prédictions restent biaisées tandis que les explications LIME et SHAP semblent innocentes
  [35]. Les explications peuvent être manipulées.
- **Méthodes qui ignorent le modèle.** Certaines méthodes de saillance produisent des explications
  indépendantes à la fois du modèle et des données, de sorte que la plausibilité visuelle n'est pas
  une preuve de précision [36].

### Modèles de substitution

Un **modèle de substitution global** est un modèle interprétable (un arbre, une liste de règles)
entraîné pour imiter les prédictions du modèle complexe. Il est utile pour l'examen et la
documentation, et n'est aussi bon que sa **fidélité** : la part des entrées sur lesquelles il
s'accorde avec le modèle qu'il décrit. Un modèle de substitution rapporté sans sa fidélité sur la
population de déploiement est un diagramme, pas une preuve.

### Explications contrefactuelles

Une **explication contrefactuelle** énonce le plus petit changement à l'entrée qui aurait changé le
résultat, par exemple (illustratif) « si votre revenu mensuel déclaré avait été 400 plus élevé, la
demande aurait été approuvée ». Wachter, Mittelstadt et Russell ont soutenu que de telles
explications peuvent aider un titulaire de données à comprendre, contester et agir sur une décision
sans ouvrir la boîte noire [37]. Elles sont l'ajustement naturel pour le **recours**, et elles
correspondent étroitement à ce que la Cour de justice a depuis demandé aux responsables du
traitement (voir les points d'ancrage juridiques ci-dessous).

Les contrefactuels ont besoin de contraintes d'ingénierie pour être honnêtes et utiles. Limitez les
changements aux caractéristiques que la personne peut réellement modifier (jamais l'âge, l'origine
ou le handicap) ; respectez les dépendances causales entre les caractéristiques ; préférez les
changements plausibles et épars ; et vérifiez que le contrefactuel est stable, de sorte que deux
demandeurs quasi identiques ne se voient pas dire des choses opposées. Un contrefactuel qui
recommande de modifier une caractéristique protégée est une constatation d'équité, pas une
explication.

### Explications basées sur des exemples

Les **explications basées sur des exemples** montrent des prototypes, les exemples d'entraînement
les plus proches ou les exemples qui ont le plus influencé une prédiction. Elles sont intuitives
pour les images et les documents et pour les examinateurs experts. Elles divulguent également les
données d'entraînement : montrer un cas passé similaire peut révéler les données personnelles d'une
autre personne, de sorte que la méthode a besoin du même examen de confidentialité que toute
divulgation de données.

### Explications pour les LLM et les systèmes RAG

Les grands modèles de langage ajoutent deux complications. Premièrement, le propre compte du modèle
de son raisonnement n'est pas une explication au sens NIST de la précision de l'explication. Le
texte de la chaîne de pensée peut systématiquement mal représenter la véritable raison d'une
prédiction : lorsque les modèles ont été orientés par des caractéristiques qu'ils n'ont jamais
mentionnées, ils ont produit des rationalisations plausibles, avec une précision chutant de jusqu'à
36 % sur les tâches affectées [38]. Une justification générée est une sortie à évaluer, pas une
fenêtre dans le modèle.

Deuxièmement, l'**interprétabilité mécaniste**, le programme de recherche qui tente de
rétro-ingénierie les calculs à l'intérieur d'un réseau, a fait des progrès visibles mais, selon le
compte rendu de ses propres chercheurs, fait toujours face à des problèmes conceptuels et pratiques
ouverts avant que de nombreux avantages puissent être réalisés [39]. Au 2026-09-24, traitez-la comme
une entrée de recherche pour le red-teaming et les dossiers de sécurité, pas comme une source
d'explications par décision qu'une organisation peut remettre à une personne affectée ou à un
auditeur.

Pour la génération augmentée par récupération, l'explication pratique est la **citation** : quels
passages récupérés soutiennent quelles phrases. Les citations ne sont aussi bonnes que leur soutien.
Un audit de quatre moteurs de recherche génératifs a révélé qu'en moyenne 51,5 % des phrases
générées étaient entièrement soutenues par leurs citations et 74,5 % des citations soutenaient leur
phrase [40]. Donc un artefact d'explication RAG a besoin de ses propres évaluations : la précision
des citations (chaque passage cité soutient-il sa réclamation ?), le rappel des citations (chaque
réclamation est-elle citée ?), et l'ancrage, tous exécutés dans la couche 03, plus une trace dans la
couche 04 qui stocke l'instantané du corpus et les identifiants de passage derrière chaque réponse
afin que la citation puisse être revérifiée ultérieurement.

## Les points d'ancrage juridiques pour les explications

Les obligations d'explication proviennent de plusieurs régimes qui diffèrent dans qui doit quoi, à
qui et quand. Le tableau achemine le travail ; les sous-sections ajoutent ce qui importe pour la
construction. Les chapitres 18 à 20
([Le Règlement de l'IA](/bok/eu-ai-act#explanation-and-notice-to-affected-people),
[Confidentialité et IA](/bok/privacy-and-ai#gdpr-article-22-after-schufa),
[Droit existant et IA](/bok/existing-law#credit-and-lending)) donnent le tableau juridique complet.

| Instrument | Qui le doit | Déclencheur | Ce qui doit être fourni | Artefact |
|---|---|---|---|---|
| ECOA et Regulation B, 12 CFR 1002.9 | Créancier | Action défavorable sur une demande de crédit ou un compte | Déclaration des raisons principales spécifiques [31] | Service de code de raison ; modèle d'avis ; journal des décisions |
| FCRA, 15 U.S.C. 1681m et 1681g(f) | Utilisateur d'un rapport de consommateur | Action défavorable basée sur le rapport | Avis, score de crédit utilisé et jusqu'à quatre facteurs clés [41] | Enregistrement du score et des facteurs clés |
| RGPD art. 13(2)(f), 14(2)(g), 15(1)(h) | Responsable du traitement | Prise de décision automatisée en vertu de l'art. 22(1) et (4) | Informations significatives sur la logique impliquée, la signification et les conséquences envisagées [9] | Avis au niveau du système ; explication par demande |
| RGPD art. 22(3) | Responsable du traitement | Décision uniquement automatisée avec effet juridique ou similaire, sur contrat ou consentement | Intervention humaine, la chance d'exprimer un avis et de contester [9] | Canal de contestation ; journal d'examen |
| RGPD du Royaume-Uni art. 22A–22D | Responsable du traitement | Décision importante basée uniquement sur le traitement automatisé | Information, représentations, intervention humaine, contestation [42] | Même, variante du Royaume-Uni |
| Règlement de l'IA art. 13 | Fournisseur (aux responsables du déploiement) | Système à haut risque | Instructions d'utilisation permettant aux responsables du déploiement d'interpréter la sortie [43] | Instructions d'utilisation ; fiche de méthode d'explication |
| Règlement de l'IA art. 86 | Déployeur | Décision basée sur un système de l'Annexe III (sauf point 2) avec effet défavorable juridique ou similaire | Explication claire et significative du rôle du système d'IA et des éléments principaux de la décision [44] | Flux de travail de demande d'explication ; enregistrement d'explication |

### Crédit : avis d'action défavorable et codes de raison

La loi américaine sur le crédit est le régime d'explication le plus ancien et le plus concret. La
Regulation B exige que les raisons de l'action défavorable soient spécifiques et indiquent les
raisons principales ; dire seulement que le demandeur a manqué les normes internes ou un score de
qualification est insuffisant [31]. Le commentaire officiel ajoute le détail d'ingénierie : plus de
quatre raisons ne sont probablement pas utiles ; les raisons doivent se rapporter à et décrire avec
précision les facteurs réellement considérés ou notés ; aucune raison principale ne peut être omise
; et aucune méthode de sélection unique n'est requise, avec deux méthodes de référence qui comparent
le score du demandeur sur chaque facteur aux scores moyens [57]. Lorsque l'action repose sur un
rapport de consommateur, la FCRA ajoute le score de crédit utilisé et jusqu'à quatre facteurs clés
[41].

Les deux circulaires du CFPB appliquant ces obligations aux algorithmes complexes et aux formulaires
de raison d'exemple ont été retirées le 12 mai 2025 [45] ; au 2026-09-24, la réglementation et son
commentaire portent toujours l'obligation. Donc un service de **code de raison** mappe chaque
facteur principal que le modèle a réellement utilisé à une raison stable et lisible par l'homme,
versionnée avec le modèle, et un test montre que les raisons données pour un échantillon de refus
correspondent aux facteurs qui les ont motivés. Si le modèle est trop complexe pour que ce test
réussisse, le modèle est le problème, pas l'avis.

### Protection des données : RGPD et régime du Royaume-Uni

Les articles du RGPD n'utilisent pas les mots « droit à l'explication » ; le Considérant 71
mentionne l'obtention d'« une explication de la décision prise », et les articles 13 à 15 exigent
des informations significatives sur la logique impliquée lorsque la prise de décision automatisée de
l'article 22 a lieu [9]. La Cour de justice l'a rendu concret. Dans *SCHUFA* (C-634/21, 7 décembre
2023), elle a jugé que la génération d'une cote de crédit peut elle-même être une décision de
l'article 22(1) lorsqu'un tiers s'en inspire fortement [46], de sorte que le fournisseur de
notation, et pas seulement le prêteur, peut devoir les garanties. Dans *Dun & Bradstreet Austria*
(C-203/22, 27 février 2025), elle a jugé que le responsable du traitement doit expliquer la
procédure et les principes réellement appliqués, qu'une formule mathématique complexe ne satisfait
pas à l'obligation, et que les secrets commerciaux vont à l'autorité ou au tribunal pour un
équilibre au cas par cas plutôt que de justifier un refus [47]. La Cour a ajouté que, pour le
profilage, le tribunal national pourrait constater qu'il est suffisamment transparent et
intelligible de dire au titulaire des données jusqu'à quel point une variation dans les données
personnelles prises en compte aurait conduit à un résultat différent (para. 62) [47][48] : une
explication contrefactuelle en langage juridique.

Au Royaume-Uni, la Data (Use and Access) Act 2025 a remplacé l'article 22 par les articles 22A à
22D, qui traitent une décision comme uniquement automatisée lorsqu'il n'y a pas d'implication
humaine significative et exigent des garanties pour informer le titulaire des données, prendre des
représentations, fournir une intervention humaine et permettre la contestation [42]. Les conseils
co-badgés de l'ICO avec The Alan Turing Institute sur l'explication des décisions d'IA sont en cours
d'examen en conséquence au 2026-09-24 ; ses six types d'explication (justification, responsabilité,
données, équité, sécurité et performance, impact) restent une liste de contrôle utile [49]. Dans
l'UE, l'omnibus numérique plus large de la Commission a proposé de réécrire l'article 22 ; un
premier compromis du Conseil a abandonné ce changement, et au 2026-09-24 les amendements du RGPD ne
sont pas adoptés [50] (vérifiez avant de vous fier au texte actuel).

### Le Règlement de l'IA de l'UE : articles 13 et 86

Le Règlement de l'IA ajoute une obligation en amont et une en aval. L'article 13 exige que les
systèmes à haut risque soient suffisamment transparents pour que les déployeurs puissent interpréter
la sortie et l'utiliser correctement, avec des notices d'utilisation « pertinentes, accessibles et
compréhensibles pour les déployeurs » qui couvrent les capacités techniques du système à fournir des
informations pertinentes pour expliquer sa sortie, ses performances pour les personnes ou groupes
auxquels il est destiné à être utilisé, et les mesures techniques qui aident les déployeurs à
interpréter les sorties [43]. L'artefact du fournisseur est une fiche de méthode d'explication
fournie avec la notice : méthode, ligne de base, limites connues, fidélité et performance au niveau
du groupe.

L'article 86 donne à une personne soumise à une décision d'un déployeur fondée sur un système à haut
risque de l'annexe III (sauf infrastructure critique, point 2), ayant des effets négatifs importants
sur sa santé, sa sécurité ou ses droits fondamentaux, le droit à « des explications claires et
significatives du rôle du système d'IA dans la procédure de prise de décision et des éléments
principaux de la décision prise » [44]. Il s'applique uniquement si le droit de l'Union ne prévoit
pas déjà ce droit [44], de sorte que les articles 15(1)(h) et 22 du RGPD s'appliquent en premier
lieu lorsqu'ils s'appliquent. Les déployeurs doivent également informer les personnes qu'elles sont
soumises au système [51]. L'Omnibus a reporté les principales obligations de l'annexe III au 2
décembre 2027 [10] ; il convient de confirmer avec un conseil juridique si le démarrage pratique de
l'article 86 suit cette date (à vérifier). La mise en œuvre n'a pas besoin d'attendre : un
enregistrement d'explication, décrit ci-dessous, répond à l'article 86, à l'article 15(1)(h) et à un
avis d'action préjudiciable.

## Tester la qualité des explications

Une explication est une sortie, elle reçoit donc des évaluations comme toute autre sortie. La
taxonomie de Doshi-Velez et Kim donne trois niveaux de preuves, en coût croissant : tests
**fondés sur le fonctionnement** sans humains (métriques de substitution), tests
**fondés sur l'humain** avec des profanes sur des tâches simplifiées, et tests
**fondés sur l'application** avec les vrais utilisateurs sur la vraie tâche [52]. Une suite pratique
mélange les trois.

| Test | Ce qu'elle vérifie | Niveau | Exemple de condition de porte (illustratif) |
|---|---|---|---|
| **Fidélité** | L'explication reflète le modèle (précision d'explication NIST [29]) : supprimer les caractéristiques les plus attribuées change la sortie plus que supprimer des caractéristiques aléatoires | Fonctionnel | La surface de la courbe de suppression dépasse l'aléatoire d'une marge définie sur l'ensemble de validation |
| **Stabilité** | Les entrées quasi-identiques reçoivent des explications quasi-identiques et des codes de raison | Fonctionnel | Chevauchement des k premiers codes de raison au-dessus d'un seuil sous de petites perturbations |
| **Santé mentale** | L'explication change lorsque le modèle est randomisé [36] | Fonctionnel | Similarité d'explication après randomisation des poids en dessous d'un seuil |
| **Résistance à la manipulation** | Le sondage hors-variété ne peut pas cacher un biais connu [35] | Fonctionnel | Le modèle de test de biais planté est détecté par la méthode d'explication |
| **Cohérence des codes de raison** | Les codes de raison correspondent aux facteurs qui ont réellement motivé la décision [57] | Fonctionnel | 100 % des refus échantillonnés ont des raisons tirées de facteurs notés |
| **Validité contrefactuelle** | Le changement suggéré inverse la décision et utilise uniquement des caractéristiques mutables | Fonctionnel | Tous les contrefactuels échantillonnés sont valides et exploitables |
| **Compréhension** | Le public visé peut énoncer la raison principale et ce qu'il pourrait changer | Fondé sur l'humain | Une majorité d'un panel de test répond correctement aux deux questions |
| **Aide à la décision** | Les examinateurs avec explications décident mieux, pas seulement plus vite, et ne sont pas induits en erreur par le biais d'automatisation | Fondé sur l'application | La précision de remplacement avec explications au moins égale à celle sans |

Les deux dernières lignes sont celles que les équipes sautent et celles auxquelles la loi tient :
une explication doit être **significative** pour la personne qui la reçoit [29]. Testez l'avis avec
des personnes comme ses destinataires, y compris des personnes ayant une faible littératie dans sa
langue et des personnes utilisant une technologie d'assistance, et conservez le protocole et les
résultats comme preuves. Pour les examinateurs, associez ceci à
[Concevoir la supervision humaine](/bok/the-stack#designing-human-oversight-article-14) : une
explication qui fait que les examinateurs sont d'accord plus rapidement avec un mauvais modèle est
un défaut de contrôle.

## Explications accessibles

Une explication que le destinataire ne peut pas percevoir ou comprendre échoue au test «
significatif » quelle que soit sa fidélité. Le Règlement de l'IA demande des notices d'utilisation «
pertinentes, accessibles et compréhensibles pour les déployeurs » [43] et exige que les fournisseurs
de systèmes à haut risque respectent les exigences d'accessibilité de l'UE des directives (UE)
2016/2102 et 2019/882 [53]. WCAG 2.2 donne les critères testables pour le canal numérique [54]. En
pratique :

- **Texte d'abord.** Chaque graphique d'attribution (une cascade SHAP, une carte de saillance) a un
  équivalent textuel qui énonce les facteurs principaux en mots (critère de succès WCAG 1.1.1,
  contenu non textuel).
- **Jamais la couleur seule.** Les contributions positives et négatives sont marquées par le signe
  et l'étiquette, pas seulement le rouge et le vert (1.4.1, utilisation de la couleur).
- **Langage clair.** Les codes de raison sont écrits pour le destinataire, pas pour le data
  scientist ; visez un niveau de lecture du premier cycle du secondaire lorsque le public est le
  grand public (3.1.5, niveau de lecture, un critère de niveau AAA utilisé ici comme objectif).
- **Détail en couches.** Une raison d'une phrase, puis les facteurs principaux, puis comment
  contester, puis l'annexe technique pour ceux qui demandent.
- **Plus d'un canal.** La même explication est disponible sur papier, par téléphone ou en personne
  pour les personnes qui n'utilisent pas le canal numérique.

## Artefacts d'explication comme enregistrements de preuves

Une explication livrée et non conservée ne peut pas être auditée, reproduite ou défendue. L'unité de
preuve est l'[**enregistrement d'explication**](/patterns/explanation-artefact) : un objet structuré
par décision expliquée, écrit au moment de la décision par l'exécution (couche 04), lié à
l'identifiant du registre comme tous les autres artefacts, et conservé par l'obligation qu'il sert.

> **Exemple (illustratif)** Un enregistrement d'explication pour une demande de financement
> d'appareil refusée :
>
> ```json
> { "decision_id": "dfc-2026-09-18-004211", "subject": "credit-dfc@2026-09-01",
>   "outcome": "decline", "method": "treeshap", "method_version": "0.46",
>   "baseline": "bg-sample.v12", "fidelity_check": "pass",
>   "reason_codes": ["R07 debt-to-income", "R12 recent missed payments"],
>   "counterfactual": { "feature": "monthly_debt", "change": "-180", "result": "approve" },
>   "template": "adverse-action.en.v5", "audience": "applicant",
>   "delivered": "2026-09-18T10:02:13Z", "channel": "email+letter",
>   "contest_url_ref": "appeal-flow.v3" }
> ```

L'enregistrement rend trois choses vraies. L'explication est reproductible, car la version du
modèle, la méthode, sa version et la ligne de base sont épinglées. Elle est vérifiable, car les
codes de raison peuvent être re-dérivés et comparés. Et elle est réutilisable, car le même
enregistrement répond à un avis de la Regulation B, une demande d'accès de l'article 15(1)(h), une
demande de l'article 86 et un appel interne. Les enregistrements d'explication s'écoulent dans la
couche 05 avec le reste des preuves, où un auditeur peut demander « montrez-moi chaque refus en août
dont les codes de raison diffèrent d'un nouveau calcul » et obtenir une requête, pas un projet.

## Équité et explicabilité dans la pile

Les deux disciplines produisent des preuves à chaque couche. Le tableau est la liste de contrôle ;
chaque ligne nomme l'artefact, pas l'aspiration.

| Couche | Artefact d'équité | Artefact d'explicabilité | Motif |
|---|---|---|---|
| **01 Govern-as-Code** | Politique d'équité en tant que données : attributs protégés par juridiction, métrique choisie et raison, seuils, taille minimale des cellules, approbateur | Politique d'explication : types d'explication requis par cas d'usage, règle interprétable par défaut, limites de codes de raison | [Policy Card](/patterns/policy-card) |
| **02 Inventory & Transparency** | Fiche de données avec couverture par groupe et base de l'art. 4a ; fiche de modèle avec métriques désagrégées et intersectionnelles | Notices d'utilisation et fiche de méthode d'explication (méthode, ligne de base, fidélité, limites) ; avis d'utilisation de l'IA | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) |
| **03 Evals & Red Teaming as Evidence** | [Suite d'évaluation d'équité](/patterns/fairness-eval-suite) : métriques de groupe avec intervalles, tranches intersectionnelles, analyse de substitution, test de retournement contrefactuel | Suite d'évaluation d'explication : fidélité, stabilité, santé mentale, cohérence des codes de raison, test de compréhension | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **04 Runtime Controls & Observability** | Taux de sélection et AIR roulants par groupe ; taux de remplacement et d'appel par groupe | [Enregistrement d'explication](/patterns/explanation-artefact) par décision ; canal de contestation ; trace de citation RAG | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **05 Assurance & Continuous Compliance** | Résultats d'équité et résumés d'audit en tant que preuves lisibles par machine ; résumé publié de style LL144 | Journal des demandes d'explication avec temps de réponse ; vérifications périodiques de re-dérivation | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |

La couche 03 est l'endroit où les deux deviennent des contrôles, c'est pourquoi la définition de
fait dans [Couche 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) s'applique sans
changement : les suites sont versionnées avec le modèle, exécutées en CI, émettent des résultats
structurés classés par rapport à l'entrée du registre, et échouent la construction lorsqu'elles
échouent. Pour les modèles achetés, la même logique s'applique à la limite : vous pouvez toujours
calculer les métriques de groupe sur les sorties d'un système de fournisseur et tester les
explications qu'il retourne, et la
[Porte de diligence raisonnable du fournisseur / modèle](/patterns/vendor-model-due-diligence-gate)
est l'endroit où vous demandez les résultats désagrégés du fournisseur et la documentation de la
méthode d'explication (voir [IA tierce et achetée](/bok/the-stack#third-party-and-procured-ai)).

L'étagère des normes pour ce travail est courte. NIST SP 1270 encadre le biais [2], NIST IR 8312
encadre l'explication [29], et ISO/IEC TR 24027:2021 couvre le biais dans les systèmes d'IA et la
prise de décision assistée par l'IA [55] ; elle est référencée ici par numéro uniquement. ISO/IEC TS
6254:2025 (publié en septembre 2025) est le document SC 42 sur les objectifs et approches pour
l'explicabilité et l'interprétabilité des modèles d'apprentissage automatique et des systèmes d'IA
[56] ; il est également référencé ici par numéro uniquement. Aucun de ces documents n'est une norme
harmonisée, et aucun ne confère une présomption de conformité avec le Règlement de l'IA (voir
[la carte réglementaire](/bok/regulatory-map#eu-ai-act-post-omnibus)).

### Conditions de porte

Une condition de porte est une phrase que le pipeline peut évaluer. Conditions illustratives,
chacune liée à une valeur de politique plutôt qu'à un nombre rond choisi pour le confort :

- Pour chaque groupe et cellule intersectionnelle au-dessus de la taille minimale, la limite
  inférieure de confiance de l'AIR est au ou au-dessus du plancher de politique et l'écart dans la
  métrique d'erreur choisie est dans sa limite, ou une justification signée est jointe à la version.
- Les cellules en dessous de la taille minimale sont listées comme « données insuffisantes » ;
  aucune n'est signalée comme une réussite.
- L'analyse de substitution est en dessous de la limite de politique, ou chaque caractéristique
  signalée a une justification enregistrée.
- La méthode d'explication réussit les vérifications de fidélité, stabilité et santé mentale ; les
  codes de raison échantillonnés proviennent uniquement de facteurs notés ; les contrefactuels
  échantillonnés sont valides et utilisent uniquement des caractéristiques mutables.
- La fiche de modèle, la fiche de méthode d'explication et les notices d'utilisation ont été
  régénérées pour cette version.

Un résultat de porte d'évaluation porte la métrique, son intervalle et la politique par rapport à
laquelle elle a été jugée (illustratif) :

```json
{ "suite_id": "fairness.credit-dfc.v3", "model_version": "credit-dfc@2026-09-01",
  "metric": "approval_air", "group": "age_65_plus", "value": 0.86,
  "ci95": [0.81, 0.91], "floor": 0.80, "min_cell": 200, "n": 1840,
  "policy": "fairness-policy.credit.v2", "result": "pass" }
```

> **En pratique (illustratif)** Un opérateur télécom qui vend des téléphones en plans de paiement
> échelonné effectue une vérification de crédit au point de vente, de sorte que chaque refus est une
> décision de crédit qui doit justifier ses raisons au demandeur. La première version utilisait un
> modèle de boosting de gradient et générait des codes de raison à partir des valeurs SHAP à la
> demande. Un test de cohérence des codes de raison a révélé que pour une tranche de refus, la
> meilleure caractéristique SHAP était une interaction construite qu'aucune notice ne pouvait
> décrire. L'équipe a entraîné une scorecard monotone comme référence, a constaté qu'elle était dans
> une petite marge du modèle complexe sur la précision d'approbation, et a déployé la scorecard.
> L'évaluation d'équité a ensuite conditionné chaque version à l'AIR de taux d'approbation par
> tranche d'âge avec intervalles, et chaque refus a écrit un enregistrement d'explication. La
> question d'audit « pourquoi ce client a-t-il été refusé, et quelqu'un de similaire a-t-il été
> traité différemment ? » est devenue deux requêtes.

**Correspondances :** Règlement de l'IA art. 4a (données de catégories spéciales pour la détection
des biais), art. 10(2)(f)–(g), 10(3)–(4) (données et biais), art. 13 (transparence envers les
déployeurs), art. 15(4) (boucles de rétroaction), art. 26(11) (information des personnes affectées),
art. 86 (droit à l'explication) · RGPD art. 13–15, 22 · RGPD du Royaume-Uni art. 22A–22D · ECOA /
Regulation B, FCRA · Directives uniformes des États-Unis (29 CFR 1607.4(D)) · NYC Local Law 144 ·
NIST AI RMF (Measure 2.9, 2.11) · NIST SP 1270 · NIST IR 8312 · ISO/IEC TR 24027 · Couches 01–05.
Les correspondances sont illustratives, non une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Choisissez un système de décision concernant des personnes et écrivez sa politique d'équité en tant que données**
   : les attributs protégés qui s'appliquent, la métrique que vous avez choisie et pourquoi, le
   seuil, la taille minimale des cellules et l'approbateur. Validez-la avant de consulter la
   prochaine exécution d'évaluation.
2. **Exécutez une analyse de proxy** sur les caractéristiques de ce système : entraînez un modèle
   pour prédire l'attribut protégé à partir de celles-ci et enregistrez le résultat dans la fiche de
   données, avec la base de l'art. 4a si vous avez utilisé des données de catégories spéciales.
3. **Ajoutez une évaluation d'équité intersectionnelle à l'intégration continue** avec des
   intervalles de confiance et un résultat « données insuffisantes », connectée à la
   [Eval Gate in CI](/patterns/eval-gate-in-ci) pour qu'elle puisse faire échouer la compilation.
4. **Émettez un enregistrement d'explication pour chaque décision défavorable** que le système
   prend, avec la version du modèle, la méthode, la référence et les codes de raison épinglés, et
   testez 10 d'entre eux pour la cohérence des codes de raison.
5. **Présentez une notice devant cinq personnes** comme celles qui la reçoivent et demandez-leur
   d'énoncer la raison principale et ce qu'elles pourraient changer. Conservez les réponses comme
   preuves et corrigez ce qu'elles ont mal compris.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (transparency answers "what happened", explainability "how", interpretability "why"; MEASURE 2.9 and 2.11). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[2] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[3] "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle" (H. Suresh, J. Guttag; seven sources: historical, representation, measurement, aggregation, learning, evaluation, deployment; EAAMO 2021). arXiv 1901.10002. 2019-01-28. https://arxiv.org/abs/1901.10002 (verified: primary)
[4] "Dissecting racial bias in an algorithm used to manage the health of populations" (Z. Obermeyer, B. Powers, C. Vogeli, S. Mullainathan; Science 366(6464):447-453; cost as a proxy for need; 17.7% to 46.5%). Science (PubMed 31649194). 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance; 10(2)(f)-(g) examination for and mitigation of biases; 10(3)-(4) relevance, representativeness and setting; former 10(5) deleted and moved to Art. 4a by the Omnibus). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15(4) (systems that continue to learn must reduce the risk of biased outputs influencing input for future operations, "feedback loops"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[7] 42 U.S.C. § 2000e-2(k) and (l) (burden of proof in disparate-impact cases: job related and consistent with business necessity; less discriminatory alternative; (l) no adjusted scores or different cut-off scores by race, colour, religion, sex or national origin). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[8] Council Directive 2000/43/EC (Racial Equality Directive), Art. 2(2)(a)-(b) (direct and indirect discrimination). EUR-Lex. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[9] Regulation (EU) 2016/679 (GDPR), Arts. 9, 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). EUR-Lex. 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[10] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[11] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4a (processing of special categories of personal data for bias detection and correction: conditions (a)-(f) in para. 1; para. 2 for other AI systems and models and for deployers of high-risk systems; no obligation created; inserted by Reg. (EU) 2026/1744, in force 27 Jul 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[12] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[13] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[14] "DOJ Opinion Finds EEOC Disparate Impact Liability Guidelines Unconstitutional" (opinion addresses 29 CFR part 1607 and 1608; "helps to implement" Executive Order 14281; EEOC enforcement plan of 4 Jun 2026 prioritises disparate treatment; private and state-law disparate-impact claims remain). Ogletree Deakins. 2026-06-29. https://ogletree.com/insights-resources/blog-posts/doj-opinion-finds-eeoc-disparate-impact-liability-guidelines-unconstitutional/ (verified: secondary)
[15] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary; no specific action required; categories under 2% may be excluded). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[16] "Fairness Through Awareness" (C. Dwork, M. Hardt, T. Pitassi, O. Reingold, R. Zemel; individual fairness; limits of statistical parity). arXiv 1104.3913. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[17] "Equality of Opportunity in Supervised Learning" (M. Hardt, E. Price, N. Srebro; equalised odds, equal opportunity and post-processing adjustment). arXiv 1610.02413. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[18] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[19] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[20] Fairlearn user guide, "Fairness in machine learning" (allocation, quality-of-service and stereotyping harms; disparity metrics as ratios or differences). Fairlearn project. 2026. https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html (verified: primary)
[21] "Counterfactual Fairness" (M. Kusner, J. Loftus, C. Russell, R. Silva). arXiv 1703.06856. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[22] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[23] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[24] "Model Cards for Model Reporting" (M. Mitchell et al.; evaluation across demographic and intersectional groups; FAT* 2019). arXiv 1810.03993. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[25] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III (high-risk use cases: point 2 critical infrastructure; point 4 employment; point 5(a) public assistance benefits; point 5(b) creditworthiness and credit scoring, excluding financial-fraud detection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[26] "AI Fairness 360: An Extensible Toolkit for Detecting, Understanding, and Mitigating Unwanted Algorithmic Bias" (R. Bellamy et al.). arXiv 1810.01943. 2018-10-03. https://arxiv.org/abs/1810.01943 (verified: primary)
[27] "Fairlearn: Assessing and Improving Fairness of AI Systems" (H. Weerts et al.; fairness as a sociotechnical challenge). arXiv 2303.16626. 2023-03-29. https://arxiv.org/abs/2303.16626 (verified: primary)
[28] "Aequitas: A Bias and Fairness Audit Toolkit" (P. Saleiro et al.). arXiv 1811.05577. 2018-11-14. https://arxiv.org/abs/1811.05577 (verified: primary)
[29] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[30] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[31] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons; the official commentary is [57]). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[32] "A Unified Approach to Interpreting Model Predictions" (S. Lundberg, S.-I. Lee; SHAP). arXiv 1705.07874. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[33] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (M. T. Ribeiro, S. Singh, C. Guestrin; LIME). arXiv 1602.04938. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[34] "Axiomatic Attribution for Deep Networks" (M. Sundararajan, A. Taly, Q. Yan; integrated gradients; sensitivity and implementation invariance). arXiv 1703.01365. 2017-03-04. https://arxiv.org/abs/1703.01365 (verified: primary)
[35] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[36] "Sanity Checks for Saliency Maps" (J. Adebayo et al.; some saliency methods are independent of model and data). arXiv 1810.03292. 2018-10-08. https://arxiv.org/abs/1810.03292 (verified: primary)
[37] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (S. Wachter, B. Mittelstadt, C. Russell; Harvard Journal of Law & Technology, 2018). arXiv 1711.00399. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[38] "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (M. Turpin, J. Michael, E. Perez, S. R. Bowman; accuracy drops of up to 36% on 13 BIG-Bench Hard tasks). arXiv 2305.04388. 2023-05-07. https://arxiv.org/abs/2305.04388 (verified: primary)
[39] "Open Problems in Mechanistic Interpretability" (L. Sharkey et al.). arXiv 2501.16496. 2025-01-27. https://arxiv.org/abs/2501.16496 (verified: primary)
[40] "Evaluating Verifiability in Generative Search Engines" (N. F. Liu, T. Zhang, P. Liang; 51.5% of generated sentences fully supported by citations; 74.5% of citations support their sentence). arXiv 2304.09848. 2023-04-19. https://arxiv.org/abs/2304.09848 (verified: primary)
[41] 15 U.S.C. § 1681m(a) and § 1681g(f)(1) (duties of users taking adverse action on the basis of a consumer report; credit score, range and key factors, not more than four). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII.htm (verified: primary)
[42] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22A no meaningful human involvement; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and provision of information to deployers; 13(2) "relevant, accessible and comprehensible to deployers"; 13(3)(b)(iv), (v), (vii); 13(3)(d)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[44] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; Annex III except point 2; subsidiary to other Union law under 86(3)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[45] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms and Circular 2023-03 on adverse-action reasons and sample forms, both withdrawn 12 May 2025). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
[46] "CJEU's first ruling on Article 22 GDPR: 'credit scoring' is an automated decision" (C-634/21 SCHUFA, 7 Dec 2023; a probability value is an Art. 22(1) decision where a third party draws strongly on it). Cloisters. 2023-12-14. https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision (verified: secondary)
[47] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (paras. 58 to 62 and 74 to 76; Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation; for profiling, the effect of a variation in the personal data on the result can suffice (para. 62); trade secrets balanced case by case by the authority or court). Court of Justice of the EU (EUR-Lex). 2025-02-27. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0203 (verified: primary)
[48] "ECJ Ruling on Automated Decision-Making and Data Subject Access" (commentary on C-203/22: an explanation of how variations in the data might change the outcome). Clyde & Co. 2025-03. https://clydeco.com/en/insights/2025/03/ecj-ruling-on-automated-decision-making-and-data-s (verified: secondary)
[49] Explaining decisions made with AI (co-badged ICO and The Alan Turing Institute guidance; six explanation types; under review after the Data (Use and Access) Act). Information Commissioner's Office. consulted 2026-09-24. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/ (verified: primary)
[50] "The Digital Omnibus: a step back from the brink, but the risks remain" (first Council compromise drops the proposed rewrite of GDPR Art. 22; GDPR amendments still in negotiation). European Digital Rights (EDRi). 2026-03-17. https://edri.org/our-work/the-digital-omnibus-a-step-back-from-the-brink-but-the-risks-remain/ (verified: secondary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(11) (deployers of Annex III high-risk systems that make or assist decisions about natural persons must inform them). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[52] "Towards A Rigorous Science of Interpretable Machine Learning" (F. Doshi-Velez, B. Kim; application-grounded, human-grounded and functionally-grounded evaluation). arXiv 1702.08608. 2017-02-28. https://arxiv.org/abs/1702.08608 (verified: primary)
[53] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16(l) (providers of high-risk systems ensure accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[54] Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation; SC 1.1.1, 1.4.1, 3.1.5). W3C. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[55] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
[56] ISO/IEC TS 6254:2025, Information technology, Artificial intelligence: Objectives and approaches for explainability and interpretability of machine learning (ML) models and artificial intelligence (AI) systems (published, edition 1; referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2025-09. https://www.iso.org/standard/82148.html (verified: primary)
[57] 12 CFR Part 1002, Supplement I, Official Interpretations, comments 9(b)(2)-1 to -5 (more than four reasons not likely helpful; reasons must relate to and accurately describe the factors actually considered or scored; no principal reason left out; no single reason-selection method required, two reference methods against average scores). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/appendix-Supplement%20I%20to%20Part%201002 (verified: primary)
