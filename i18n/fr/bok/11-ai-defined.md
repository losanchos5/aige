---
lang: fr
source: bok/11-ai-defined.md
sourceHash: "22aa065addac570dc901cead7669db00821af938af30615db31b2b35b900ba68"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 11. L'IA, définie pour la gouvernance

> Ce qu'est un système d'IA aux fins de la gouvernance : les définitions qui fixent le périmètre,
> les types d'IA et les traits qui cassent la gouvernance classique, chacun transformé en champ de
> registre, en contrôle et en preuve.

Une fonction de gouvernance ne peut pas gouverner ce qu'elle n'a pas défini. Avant qu'un registre
puisse énumérer les systèmes d'IA, avant qu'une prise en charge puisse les classer et avant qu'une
politique puisse les lier, quelqu'un doit décider quels systèmes comptent. Cette décision n'est pas
un exercice de glossaire. C'est le premier contrôle du stack : il décide ce qui entre dans le
**registre des agents** (couche 02), quelles obligations l'admission achemine un système vers, et
quels systèmes restent en dehors de tous les autres contrôles de ce livre. Vous vous trompez dans
une direction et un modèle de notation échappe à l'examen parce que quelqu'un l'a appelé « juste des
statistiques ». Vous vous trompez dans l'autre et le registre se remplit de macros de feuille de
calcul, le signal se noie et les propriétaires arrêtent de le lire.

Ce chapitre compare les quatre définitions qui fixent le périmètre, transforme chacun de leurs
éléments en champ de registre, sépare l'IA des logiciels déterministes, trie les types d'IA par les
contrôles qu'ils changent et nomme les traits qui font échouer la gouvernance informatique
classique. Il se termine par deux choses généralement laissées en prose : gouverner les résultats
probabilistes et tracer les ensembles de principes d'IA responsable publiés aux artefacts. Ce n'est
pas un manuel d'apprentissage automatique : une technique n'importe ici que si elle change un
contrôle, un propriétaire ou une preuve.

## Pourquoi la définition est un contrôle

Deux décisions se situent à l'avant de chaque admission, et ce sont des décisions différentes. La
première est **définitionnelle** : s'agit-il d'un système d'IA du tout ? La seconde est
**classificatoire** : étant donné que c'en est un, quelles obligations et quels contrôles
s'appliquent ? La plupart des lois et la plupart des programmes de gouvernance traitent la première
comme une porte vers la seconde. En vertu du Reglamento de IA, la définition est littéralement le
périmètre du règlement : le Règlement ne s'applique qu'aux systèmes qui répondent à la définition de
l'article 3(1), et cette définition s'applique depuis le 2 février 2025 [1]. Les mêmes conseils de
la Commission prennent soin d'ajouter que « la grande majorité des systèmes, même s'ils se
qualifient comme systèmes d'IA », ne comporteront aucune obligation en vertu du Règlement [1].
Ainsi, un système peut être à l'intérieur de la définition et en dehors de chaque devoir ; un
ingénieur de gouvernance a besoin des deux réponses, enregistrées séparément, avec le raisonnement
attaché.

Traitez la réponse définitionnelle comme un contrôle comme tout autre dans ce livre. Il a un
propriétaire (le [flux de travail d'admission](/bok/the-role#intake-and-classification)). Il
s'exécute au point le plus précoce où il peut bloquer : à l'admission, pas à l'examen pré-lancement.
Il laisse des preuves : un dossier de décision nommant la définition appliquée, les éléments
trouvés, qui ou quoi a décidé et quand. Et il est revisité quand le système change, car un moteur de
règles qui gagne un composant appris franchit la ligne sans que personne ne dépose un ticket.

> **En pratique (illustratif)**
> Dans une grande telco, la première passe d'admission a demandé aux équipes de s'auto-déclarer « IA
> ou non ». L'auto-déclaration a produit les deux modes de défaillance à la fois : un modèle de
> propension au churn enregistré comme « analytique » et une macro de routage par mot-clé
> enregistrée comme « IA ». Remplacer la question oui/non par les questions d'éléments ci-dessous,
> chacune répondant dans le registre avec une raison d'une ligne, a déplacé la décision de l'opinion
> au dossier. Les désaccords sont devenus des diffs sur le dossier de décision, examinés comme tout
> autre changement.

## Quatre définitions, comparées

Quatre textes fixent le périmètre pour la plupart des organisations : la définition de l'OCDE, la
définition du Reglamento de IA avec les conseils de la Commission sur celle-ci, ISO/IEC 22989 et
NIST AI 100-1. Elles sont plus proches que les juridictions de leurs auteurs ne le suggèrent, par
conception, et les différences qui restent sont exactement celles qui changent une décision de
périmètre.

### La définition de l'OCDE (révision 2023)

Le chapitre 22 place
[la définition et le cycle de vie de l'OCDE](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle)
dans les instruments plus larges de l'OCDE. Le Conseil de l'OCDE a révisé sa définition le 8
novembre 2023, avant l'examen plus large de cinq ans des Principes de l'IA, en partie pour soutenir
l'alignement avec les définitions alors écrites dans l'UE, au Japon et ailleurs [2][3]. Elle se lit
maintenant : « Un système d'IA est un système basé sur des machines qui, pour des objectifs
explicites ou implicites, déduit, à partir de l'entrée qu'il reçoit, comment générer des résultats
tels que des prédictions, du contenu, des recommandations ou des décisions qui peuvent influencer
des environnements physiques ou virtuels. Les différents systèmes d'IA varient dans leurs niveaux
d'autonomie et d'adaptabilité après le déploiement. » [3]

Par rapport au texte de 2019, la révision a apporté quatre changements qui importent au périmètre :
elle a supprimé « défini par l'homme » des objectifs (les objectifs peuvent maintenant être
implicites), elle a fait de l'**inférence** l'acte définissant, elle a ajouté le **contenu** comme
résultat (le cas génératif) et elle a ajouté l'**adaptabilité** après le déploiement [3]. Son
mémorandum explicatif (qui ne fait pas partie de la Recommandation) lit l'autonomie comme le degré
auquel un système peut « apprendre ou agir sans implication humaine » une fois que les gens ont
délégué à celui-ci, et l'adaptabilité comme le changement continu des systèmes d'apprentissage
automatique après le développement initial, comme un reconnaisseur vocal s'adaptant à une voix [3].

### Article 3(1) du Reglamento de IA et les conseils de la Commission

Le chapitre 18 établit
[la définition juridique d'un système d'IA](/bok/eu-ai-act#what-counts-as-an-ai-system) dans le
champ d'application de la Loi. L'article 3(1) du Règlement de IA suit le texte de l'OCDE de près : «
un système d'IA est un système fondé sur la machine qui est conçu pour fonctionner avec différents
niveaux d'autonomie et qui peut faire preuve d'adaptabilité après son déploiement, et qui, pour des
objectifs explicites ou implicites, déduit, à partir des données qu'il reçoit en entrée, comment
générer des résultats tels que des prédictions, du contenu, des recommandations ou des décisions
susceptibles d'influencer les environnements physiques ou virtuels » [4]. Le considérant 12 explique
l'intention : la définition doit distinguer l'IA des « systèmes logiciels traditionnels plus simples
ou des approches de programmation » et ne doit pas couvrir les systèmes fondés sur des règles
définies uniquement par des personnes physiques pour exécuter automatiquement des opérations [5].
Les techniques qui permettent la déduction incluent l'apprentissage automatique et les « approches
fondées sur la logique et les connaissances » [5].

Les lignes directrices de la Commission sur la définition la décomposent en sept éléments : (1) un
système fondé sur la machine ; (2) conçu pour fonctionner avec différents niveaux d'autonomie ; (3)
qui peut faire preuve d'adaptabilité après son déploiement ; (4) pour des objectifs explicites ou
implicites ; (5) déduit, à partir des données qu'il reçoit en entrée, comment générer des résultats
; (6) tels que des prédictions, du contenu, des recommandations ou des décisions ; (7) susceptibles
d'influencer les environnements physiques ou virtuels [1]. Cinq de leurs interprétations changent le
fonctionnement d'une prise en charge :

- **La déduction est la condition indispensable** ; les lignes directrices l'appellent « une
  condition clé, indispensable qui distingue les systèmes d'IA des autres types de systèmes » [1].
- **L'autonomie est nécessaire mais le seuil est bas.** Seuls les systèmes conçus pour fonctionner «
  uniquement avec une implication et une intervention humaines manuelles complètes » sont exclus ;
  un système qui produit un résultat à partir d'une entrée fournie manuellement sans que ce résultat
  soit spécifié par une personne possède déjà « un certain degré d'indépendance d'action » [1].
- **L'adaptabilité est facultative.** Le mot « peut » rend l'auto-apprentissage après déploiement «
  une condition facultative et donc non décisive » [1]. Un modèle figé reste un système d'IA.
- **Les objectifs ne sont pas la destination prévue.** Les objectifs sont internes au système ; la
  destination prévue (art. 3(12)) est le contexte externe d'utilisation [1], et le contexte est ce
  sur quoi se construit un niveau de risque.
- **Les éléments ne doivent pas tous être présents dans les deux phases.** La définition adopte une
  perspective de cycle de vie : certains éléments peuvent apparaître dans la phase de construction
  et non dans la phase d'utilisation [1].

Les lignes directrices nomment également quatre familles qui sortent de la définition malgré une
certaine capacité de déduction : les systèmes qui améliorent ou accélèrent l'optimisation
mathématique classique ; **le traitement de données basique** (requêtes de base de données, feuilles
de calcul sans fonctions d'IA, tableaux de bord descriptifs) ; les systèmes fondés sur des
**heuristiques classiques** (un moteur d'échecs utilisant minimax avec une fonction d'évaluation
écrite à la main) ; et les **systèmes de prédiction simples** dont les performances pourraient être
égalées par une règle statistique basique, comme une ligne de base qui prédit toujours la moyenne
historique [1]. Elles précisent explicitement qu'« aucune détermination automatique ou liste
exhaustive » n'est possible et que chaque système est évalué sur son architecture et ses
fonctionnalités [1]. Elles ne sont pas non plus contraignantes ; seule la Cour de justice de l'UE
peut donner une interprétation faisant autorité [1].

### ISO/IEC 22989

ISO/IEC 22989:2022 est la norme de terminologie sur laquelle s'appuie le reste de la famille ISO/IEC
AI [6]. Sa définition d'un système d'IA (terme 3.1.4) est plus courte et de forme plus ancienne : un
système conçu dont les résultats, du contenu aux décisions, servent les objectifs que les personnes
définissent [6]. La déduction et l'adaptabilité n'en font pas partie. Sa contribution la plus utile
pour la gouvernance est le vocabulaire que les autres textes ne possèdent pas. Elle sépare
l'**automatisation**, qui varie en degré, de l'**autonomie**, une propriété beaucoup plus forte
qu'elle réserve aux systèmes qui peuvent modifier leur propre objectif ou domaine d'utilisation sans
que personne ne les dirige ; l'opposé de l'autonomie est l'**hétéronomie**, et la clause 5.13 traite
les trois ensemble [6]. Elle nomme également les rôles des parties prenantes autour d'un système
d'IA (fournisseur, producteur, client, partenaire, sujet et autorités compétentes, clause 5.19) [6].
Un amendement sur l'IA générative (ISO/IEC 22989:2022/FDAmd 1) est au stade du projet final : son
FDIS a été enregistré pour approbation formelle le 18 septembre 2026, et il n'est pas publié au
2026-09-24 [7].

Le mot « autonomie » signifie donc deux choses différentes selon les textes. Dans le Règlement de IA
et le texte de l'OCDE, c'est un degré d'indépendance d'action, et presque tous les systèmes en ont
un. Dans ISO/IEC 22989, c'est une propriété forte que la plupart des systèmes déployés ne possèdent
pas. Un registre qui enregistre « autonome : oui » n'a rien enregistré tant qu'il ne précise pas le
sens auquel il se réfère.

### NIST AI 100-1

Le Cadre de gestion des risques de l'IA du NIST (NIST AI 100-1, janvier 2023) « désigne un système
d'IA comme un système conçu ou fondé sur la machine qui peut, pour un ensemble donné d'objectifs,
générer des résultats tels que des prédictions, des recommandations ou des décisions influençant des
environnements réels ou virtuels », conçu pour fonctionner avec différents niveaux d'autonomie, et
indique qu'il adapte le texte de l'OCDE de 2019 et ISO/IEC 22989 [8]. Il est antérieur à la révision
de l'OCDE, il n'a donc pas de « déduit », pas de « contenu » et pas d'adaptabilité. Son poids pour
la gouvernance réside ailleurs : l'annexe B énumère comment les risques de l'IA diffèrent des
risques des logiciels traditionnels, ce qui est l'épine dorsale du tableau des caractéristiques plus
loin dans ce chapitre [8].

### Les définitions côte à côte

| Élément | OECD (2023) | Règlement de IA UE art. 3(1) | ISO/IEC 22989:2022 | NIST AI 100-1 (2023) |
|---|---|---|---|---|
| Substrat | Fondé sur la machine | Fondé sur la machine | Système conçu | Système conçu ou fondé sur la machine |
| Objectifs | Explicites ou implicites | Explicites ou implicites | Définis par l'humain | « Un ensemble donné d'objectifs » |
| Déduction | Acte définissant | Acte définissant ; indispensable selon les lignes directrices | Pas dans la définition | Pas dans la définition |
| Résultats | Prédictions, contenu, recommandations, décisions | Mêmes quatre | Contenu, prévisions, recommandations, décisions | Prédictions, recommandations, décisions |
| Effet | Environnements physiques ou virtuels | Environnements physiques ou virtuels | Pas dans la définition | Environnements réels ou virtuels |
| Autonomie | Varie selon le système | Conçue pour différents niveaux ; nécessaire | L'automatisation varie ; l'autonomie est une propriété forte et distincte | Niveaux variables |
| Adaptabilité | Varie selon le système | « Peut » ; non décisive | Pas dans la définition | Pas dans la définition |

Sources : [3][4][1][6][8].

Deux conclusions pratiques en découlent. Avec toute exposition à l'UE, le texte du Règlement de IA
lu avec les lignes directrices de la Commission est le test opérationnel, et le texte de l'OCDE est
son équivalent ailleurs. Et les tests ne sont pas interchangeables : un système que le vocabulaire
ISO/IEC 22989 ou NIST appellerait IA peut toujours se situer dans l'une des familles exclues des
lignes directrices. Enregistrez quel test vous avez appliqué.

## De l'élément de définition au champ du registre

Chaque élément de la définition est une question que la prise en charge pose et un champ que le
registre conserve. La réponse à l'élément détermine également une décision ultérieure, c'est
pourquoi le champ mérite sa place : un champ qu'aucune décision ne lit est un champ que personne ne
maintiendra.

| Élément | Question de prise en charge | Champ du registre (illustratif) | Décision de contrôle ou de portée qu'il détermine |
|---|---|---|---|
| Fondé sur la machine | Où s'exécute-t-il et qui exploite l'exécution ? | `substrate` (`cloud-api`, `self-hosted`, `on-device`, `embedded`) | Quels contrôles d'exécution sont même possibles (couche 04) ; si la route de la sécurité des produits peut s'appliquer |
| Objectifs | Qu'est-ce que le système optimise ? | `objective` | Quelles mesures d'évaluation le succès ; où le piratage de récompense ou les cibles de substitution peuvent se cacher |
| Destination prévue | Dans quel contexte, pour qui, est-il utilisé ? | `intended_purpose` | Niveau de risque et obligations ; le déclenchement de l'AIPD ou de l'EIPD |
| Déduction | Dérive-t-il les résultats par apprentissage ou par connaissances codées, plutôt que par des règles que les gens ont écrites ? | `inference_technique` (`ml.supervised`, `ml.self-supervised`, `logic-based`, `none` …) | Dans ou hors de la définition de l'IA ; quelle famille exclue, le cas échéant |
| Résultats | Prédiction, contenu, recommandation ou décision ? | `output_types` | Contenu : analyse du marquage et de la divulgation (art. 50) ; décision : obligations d'explication et d'examen humain (art. 86, RGPD art. 22) |
| Effet | Change-t-il un environnement physique ou virtuel, et par quel moyen ? | `effect_surface` (`display`, `tools`, `actuator`) | Outils : registre des agents, identifiants limités ; actionneur : arrêt en état sûr |
| Autonomie | Qu'y a-t-il entre la sortie et l'effet sans une personne ? | `autonomy_level` (0–4, ci-dessous) | Conception du contrôle humain, placement des portes, kill switch |
| Adaptabilité | Le comportement peut-il changer en utilisation sans une version ? | `adapts_in_use`, `change_triggers` | Déclencheurs de réévaluation ; [surveillance de la dérive](/patterns/drift-fairness-monitor) ; contrôles de boucle de rétroaction (art. 15(4)) |

Sources des crochets juridiques : [9][10][11][12].

Deux lignes méritent une note. Les équipes confondent le plus souvent **l'objectif** et la
**destination prévue**. L'exemple des lignes directrices elles-mêmes est un assistant d'entreprise
dont l'objectif est de répondre avec précision aux questions sur un ensemble de documents et dont la
destination prévue est de soutenir les tâches d'un département [1]. Le premier vous dit quoi évaluer
; le second vous dit ce que la loi pense que le système est destiné à faire. Un modèle inchangé
déplacé vers une nouvelle destination prévue est, à des fins de risque, un nouveau système. Et la
ligne des **résultats** enregistre le résultat *tel qu'utilisé* : les lignes directrices notent
qu'une recommandation « automatiquement appliquée » devient une décision [1], donc un modèle qui
recommande plus un pipeline qui approuve automatiquement est, ensemble, un système de décision.

Un champ d'autonomie a besoin d'une échelle. Il n'y en a pas de norme ; l'échelle ci-dessous est
illustrative et correspond au vocabulaire de surveillance du Groupe d'experts de haut niveau de l'UE
(humain dans la boucle, humain sur la boucle, humain en commande) [13].

| Niveau | Nom | Ce qui se passe entre la sortie et l'effet | Mode de surveillance |
|---|---|---|---|
| 0 | Consultatif | Une personne lit la sortie et décide | Humain en commande |
| 1 | Assisté | Le système rédige ; une personne approuve chaque action | Humain dans la boucle |
| 2 | Action délimitée | Le système agit dans une portée déclarée ; les actions conséquentes passent une porte | Dans la boucle pour les actions portées |
| 3 | Autonomie supervisée | Le système agit ; les gens surveillent et peuvent l'arrêter | Humain sur la boucle |
| 4 | Non supervisé | Le système agit sans surveillance de routine | Aucune de routine ; kill switch uniquement |

> **Exemple (illustratif)**
> Les champs de portée de `csa-01`, l'assistant de service client utilisé dans tout ce livre, tels
> que son entrée de registre les enregistre. La décision définitionnelle et le niveau de risque sont
> des enregistrements distincts.

```yaml
id: csa-01
definition_basis: eu-ai-act-art-3-1+commission-guidelines
definition_decision: in_scope        # in_scope | out_of_scope | undecided
definition_reason: "LLM infers replies from customer messages; generates content and
  recommendations; calls tools. Not basic data processing or classical heuristics."
decided_by: intake-pipeline + ai-governance-review
decided_on: 2026-09-18
substrate: cloud-api
objective: "answer order and refund questions accurately from the knowledge base"
intended_purpose: "first-line support for retail customers in the EU"
inference_technique: [ml.self-supervised, ml.rlhf, retrieval]
output_types: [content, recommendation]
effect_surface: tools
tools: [refunds:read, orders:read]
autonomy_level: 2
adapts_in_use: false
change_triggers: [vendor-model-version, prompt-change, corpus-snapshot]
kind: [generative, rag, agentic]
```

Les décisions hors de portée comptent autant que celles dans la portée. Un moteur de règles
d'admissibilité de remboursement dont chaque branche a été écrite par une personne reçoit également
une entrée de registre, marquée `out_of_scope` avec la raison (« traitement de données basique ;
règles définies uniquement par des personnes »). Cette entrée est ce qui vous permet de montrer à un
auditeur que vous avez regardé, et ce qui rend un changement ultérieur (quelqu'un ajoute un score de
fraude appris au moteur) visible comme une différence.

## L'IA par rapport aux logiciels conventionnels

La ligne entre l'IA et les logiciels conventionnels est la ligne entre un comportement que quelqu'un
a spécifié et un comportement que quelqu'un a induit. Le considérant 12 la trace au même endroit :
les règles définies uniquement par des personnes ne sont pas de l'IA ; l'inférence à partir de
données ou de connaissances codées l'est [5]. Pour la gouvernance, la différence n'est pas
philosophique. Chaque ligne ci-dessous est un contrôle que la gouvernance informatique classique
exécute et qui cesse de fonctionner.

| Propriété | Logiciel déterministe conventionnel | Système d'IA | Conséquence pour la gouvernance |
|---|---|---|---|
| D'où vient le comportement | Règles écrites par des personnes | Apprises à partir de données ou déduites de connaissances codées | Examinez les données et les évaluations, pas seulement le code |
| Même entrée, même sortie | Oui, par construction | Non garanti ; la génération peut varier même à température zéro [14] | Les preuves épinglent la version et les paramètres d'échantillonnage ; les évaluations se répètent |
| Ce que « correct » signifie | Correspond à une spécification | Respecte un taux d'erreur sur une distribution | Les seuils remplacent réussi/échoué ; les seuils ont besoin de propriétaires |
| Comment il est testé | Tests unitaires et d'intégration par rapport à la spécification | Évaluations sur des échantillons ; la couverture est statistique | La suite d'évaluation est elle-même un artefact gouverné |
| Ce qui change le comportement | Un diff de code | Un diff de code, de nouveaux poids, de nouvelles données, une modification de prompt, une actualisation de corpus, une mise à jour du fournisseur | La gestion des changements se déclenche sur tous |
| Comment il échoue | Un bogue reproductible | Un mode de défaillance qui apparaît sur certaines entrées, parfois, à grande échelle | Surveillez les taux en production, pas seulement les incidents |
| Comment vous l'expliquez | Lisez le code | Les mécanismes internes ne sont pas lisibles par l'homme | Les explications sont produites, enregistrées et testées |

Deux mises en garde gardent le tableau honnête. Premièrement, la limite est à la fois juridique et
technique, et la loi la trace avec une certaine imprécision : un système expert basé sur la logique
qui déduit des conclusions de connaissances médicales codées se situe dans la définition du
règlement sur l'IA, tandis qu'un moteur d'échecs heuristique en est exclu [1]. Enregistrez le
raisonnement, car le prochain examinateur tracera à nouveau la ligne. Deuxièmement, « pas de l'IA »
ne signifie pas « pas gouverné ». L'automatisation déterministe peut causer du tort à grande échelle
en elle-même, et la loi sur la protection des données donne aux personnes le droit de ne pas être
soumises à une décision « basée uniquement sur un traitement automatisé » ayant des effets
juridiques ou similairement importants, que ou non une définition d'IA soit respectée [11]. La
décision définitionnelle achemine un système vers les contrôles spécifiques à l'IA ; elle n'exempte
rien d'autre (voir [Confidentialité et IA](/bok/privacy-and-ai#principles-applied-to-ai)).

> **Remarque**
> Un **modèle** n'est pas un **système**, et un **agent** non plus. Le règlement sur l'IA définit le
> système d'IA (art. 3(1)) et, séparément, le modèle d'IA à usage général (art. 3(63)) et le système
> d'IA à usage général construit sur celui-ci (art. 3(66)) [4]. Le registre maintient les deux
> niveaux et les relie : un modèle peut se trouver dans de nombreux systèmes, et les
> [cinq objets de gouvernance](/bok/definition#the-object-of-governance) du chapitre 01 ont chacun
> besoin de leur propre entrée.

## Sortes d'IA qui changent le problème de gouvernance

Les taxonomies de l'IA sont abondantes. Le test appliqué ici est étroit : le fait de connaître la
sorte change-t-il un contrôle, un propriétaire ou la preuve ? Lorsqu'il ne le fait pas, la taxonomie
est mentionnée et mise de côté.

### Par capacité et par fonctionnalité

L'échelle des capacités (IA étroite, intelligence générale artificielle, superintelligence) est la
plus citée et la moins utile pour les contrôles. Chaque système déployé est étroit au sens qui
compte ; il n'existe pas de définition convenue de l'intelligence générale, et les propositions de
recherche pour l'opérationnaliser le font par des niveaux de performance, de généralité et
d'autonomie plutôt que par un seuil unique [15]. La loi a contourné la question avec des proxies
qu'elle peut mesurer. Le règlement sur l'IA réglemente le **modèle d'IA à usage général**, celui qui
« affiche une généralité significative » et est « capable de s'acquitter de manière compétente d'une
large gamme de tâches distinctes », y compris les modèles entraînés sur de grandes données « en
utilisant l'auto-supervision à grande échelle » [4], et présume des « capacités à fort impact »
lorsque le calcul d'entraînement dépasse 10^25 opérations en virgule flottante [16]. Les lignes
directrices de la Commission sur l'IA à usage général ajoutent un critère indicatif pour le statut
d'usage général lui-même : calcul d'entraînement au-dessus de 10^23 FLOP et la capacité de générer
du langage, du texte vers image ou du texte vers vidéo [17]. Pour le registre, la capacité devient
donc deux champs mesurables, `model_generality` et `training_compute_flop`, tous deux généralement
tirés de la documentation du fournisseur plutôt que mesurés en interne.

La taxonomie de fonctionnalité (machines réactives, mémoire limitée, théorie de l'esprit,
auto-conscience) provient d'un article populaire de 2016 [18]. Seuls les deux premiers décrivent des
systèmes qui existent, et aucun ne correspond à un contrôle ; reconnaissez-le, mais n'en faites pas
un champ de registre.

### Par paradigme d'apprentissage

Le paradigme d'apprentissage vous indique d'où vient le comportement, et donc d'où doit venir sa
preuve.

| Paradigme | Comment il apprend | Risque de gouvernance qu'il ajoute | Contrôle qui y répond |
|---|---|---|---|
| Supervisé | À partir d'exemples étiquetés | Les étiquettes codent les décisions humaines passées, leurs erreurs et leurs biais ; proxies pour les caractéristiques protégées | Provenance des étiquettes sur la fiche de données ; évaluations de sous-groupes à la porte d'évaluation |
| Non supervisé | Trouve la structure sans étiquettes (clusters, anomalies) | Pas de vérité de base à tester ; les segments peuvent suivre les caractéristiques protégées | Tests de stabilité ; examen humain des définitions de segments avant utilisation |
| Semi-supervisé | Propage quelques étiquettes sur des données non étiquetées | Les erreurs d'étiquette se propagent silencieusement | Auditez un échantillon d'étiquettes propagées |
| Auto-supervisé | Prédit des parties de sa propre entrée (le jeton suivant) sur de grands corpus | La provenance du corpus, les droits et la mémorisation sont difficiles à retracer | AIBOM avec provenance du dataset ; le résumé du contenu d'entraînement GPAI (voir [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Renforcement, y compris à partir de retours humains | Maximise un signal de récompense | **Reward hacking** : le système trouve un moyen involontaire de marquer [19] | Enregistrez la récompense comme `objective`} ; évaluations qui recherchent des stratégies involontaires |
| In-context (zéro-shot et few-shot) | Suit les instructions et les exemples dans le prompt au moment de l'inférence | Le comportement change avec une modification de prompt, aucun réentraînement impliqué | Prompts versionnés comme artefacts gouvernés ; porte d'évaluation sur modification de prompt |

### Par famille technologique

| Famille | Exemple | Ce qui change pour la gouvernance |
|---|---|---|
| Apprentissage automatique classique | Score de crédit amélioré par gradient sur données tabulaires | L'étalonnage et l'erreur de sous-groupe dominent la suite d'évaluation |
| Apprentissage profond | Classificateur d'images | Opacité ; entrées adversariales ; coût de calcul et de preuve plus élevé |
| Traitement du langage naturel | Triage des plaintes ; assistants LLM | Le texte porte des données personnelles et, pour les LLM, des instructions qu'un attaquant peut planter |
| Vision par ordinateur | Reconnaissance de documents ou de visages | Les données biométriques soulèvent des questions de catégories spéciales et de pratiques interdites (voir [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Parole | Transcription d'appels ; synthèse vocale | La voix est une donnée personnelle ; l'audio synthétique doit être marqué (art. 50) [9] |
| Robotique et cyber-physique | Robot d'entrepôt | Effet physique : l'arrêt doit amener le système à un état sûr (art. 14(4)(e)) [20] |
| Logique et basée sur les connaissances | Système expert pour l'aide au diagnostic | À l'intérieur de la définition du règlement sur l'IA lorsqu'il déduit de connaissances codées [1] ; « ce ne sont que des règles » n'est pas une exemption |

### Prédictif versus génératif

Un système **prédictif** (ou discriminatif) produit une estimation sur quelque chose qui existe : un
score, une classe, une prévision. Ses préjudices sont des préjudices d'allocation (une estimation
erronée ou biaisée met une personne dans la mauvaise file d'attente), et sa preuve est la précision,
l'étalonnage et les taux d'erreur par sous-groupe.

Un système **génératif** produit quelque chose de nouveau : du texte, une image, de l'audio, de la
vidéo, du code. Ses préjudices sont différents en nature. Le profil d'IA générative du NIST énumère
douze risques que l'IA générative crée ou aggrave, parmi lesquels la **confabulation** (« la
production de contenu erroné ou faux énoncé avec assurance »), l'intégrité de l'information, la
propriété intellectuelle, la confidentialité des données, les biais nuisibles et l'homogénéisation,
et le contenu obscène ou abusif, y compris le matériel d'abus sexuel d'enfants synthétique [21]. La
preuve change en conséquence : évaluations de fondement et de refus, red-teaming, guardrails de
sortie et, en vertu du règlement sur l'IA, marquage lisible par machine de la sortie synthétique
[9]. Un ensemble de contrôles ne convient pas aux deux : un seuil d'étalonnage ne signifie rien pour
le texte généré, et une évaluation de fondement rien pour un score de crédit.

### Modèles fondamentaux et IA à usage général

Un **modèle fondamental** est un modèle « entraîné sur de larges données à grande échelle » et «
adaptable à une large gamme de tâches en aval » [22]. Le fait de gouvernance sur les modèles
fondamentaux est l'héritage : dans les termes du document original, « les défauts du modèle
fondamental sont hérités par tous les modèles adaptés en aval » [22]. La plupart des organisations
en appellent un via une API ou en adaptent un à poids ouvert, donc la preuve passe de produite à
collectée : la fiche de modèle et les évaluations du fournisseur deviennent des entrées de votre
entrée de registre, et la version que vous épinglez devient un changement que vous gérez (voir
[IA tierce et procurée](/bok/the-stack#third-party-and-procured-ai) et la
[Porte de diligence raisonnable du fournisseur / modèle](/patterns/vendor-model-due-diligence-gate)).
L'IA à usage général est la catégorie juridique la plus proche du règlement sur l'IA, avec ses
propres obligations pour le fournisseur de modèles (voir
[Code de pratique GPAI](/bok/regulatory-map#gpai-code-of-practice)).

### LLM et SLM

Un **grand modèle de langage (LLM)** est un modèle fondamental pour le langage, généralement servi à
partir d'un centre de données. Un **petit modèle de langage (SLM)** échange la largeur contre la
taille pour pouvoir s'exécuter près de l'utilisateur ; un rapport technique de 2024 décrit un modèle
de 3,8 milliards de paramètres « assez petit pour être déployé sur un téléphone » [23]. La
différence de gouvernance est l'endroit où les contrôles vivent. Un LLM derrière une API se trouve
derrière une passerelle que vous contrôlez, où chaque appel peut être tracé, filtré et arrêté. Un
SLM sur un appareil s'exécute là où votre télémétrie peut ne pas atteindre : ses guardrails sont
livrés avec lui, son inventaire est une flotte d'appareils et son kill switch est un drapeau distant
ou une mise à jour d'application, avec le décalage que cela implique.

### Modèles multimodaux

Un modèle **multimodal** prend ou produit plus d'une modalité (texte, image, audio, vidéo). Les
images et l'audio peuvent porter des données personnelles que le pipeline de texte n'a jamais vues
et des instructions que les filtres de texte n'ont jamais scannées, et les images, l'audio et la
vidéo synthétiques soulèvent les obligations de marquage de l'article 50 [9]. Ainsi, les guardrails
existent par modalité, et la suite d'évaluation inclut des cas multimodaux.

### Systèmes RAG

**La génération augmentée par récupération (RAG)** combine la mémoire apprise (« paramétrique »)
d'un modèle avec un magasin récupérable (« non paramétrique ») de documents, à l'origine un index
vectoriel dense [24]. Ses auteurs ont déjà nommé la traçabilité comme un problème ouvert [24]. Pour
la gouvernance, le corpus devient comportement : modifier les documents et les réponses changent
sans modification du modèle. Le corpus est donc gouverné comme un modèle, versionné et fiché, son
instantané lié à l'évaluation qui l'a testé (voir
[gouvernance des données dans la stack](/bok/the-stack#data-governance-across-the-stack)). La
récupération nécessite aussi une vérification de droit d'accès : un système RAG qui récupère un
document que l'utilisateur ne peut pas voir l'a divulgué, quelle que soit la politesse de la
réponse.

### Systèmes agentiques

Un **système agentique** planifie et agit : il appelle des outils, navigue, exécute du code et
déplace des données sous autorité déléguée, souvent sur plusieurs étapes. Il change le plus le
problème de gouvernance, car sa sortie est un effet dans un système d'enregistrement, non une
recommandation qu'une personne lit. Les menaces sont cataloguées dans le Top 10 OWASP pour les
applications agentiques [25], et les contrôles sont l'ensemble de la couche 04 : identité, portée,
médiation des outils, portes humaines et un arrêt testé
([Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials),
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker),
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)). Le traitement complet se trouve dans
[Governing agents](/bok/governing-agents#what-makes-an-agent-a-governance-object).

### Pourquoi le type importe : l'ensemble de contrôle par type

| Type | Préjudice distinctif | Contrôle qui change | Couche · motif |
|---|---|---|---|
| Prédictif ou de notation | Allocation erronée ou biaisée | Évaluations de calibrage et de sous-groupe ; une politique de seuil avec un propriétaire | 03 · [Eval Gate in CI](/patterns/eval-gate-in-ci); 01 · [Policy Card](/patterns/policy-card) |
| Génératif | Confabulation, propriété intellectuelle, intégrité de l'information, contenu abusif | Évaluations d'ancrage et de red-team ; garde-fous de sortie ; marquage du contenu | 03 · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite); 04 · [Runtime Guardrail](/patterns/runtime-guardrail) |
| Modèle de fondation ou d'IA à usage général, acheté | Défauts hérités ; preuves que vous ne pouvez pas produire | Diligence raisonnable ; épinglage de version ; modèle de base dans l'AIBOM | 02 · [AIBOM](/patterns/aibom); Vendor / Model Due-Diligence Gate |
| SLM sur appareil | Pas de télémétrie centrale ; retard de mise à jour | Garde-fous expédiés avec le modèle ; inventaire de version au niveau de l'appareil | 02 · [Agent Registry](/patterns/agent-registry) ; 04 · Kill Switch |
| Multimodal | Nouveaux canaux d'injection et de données personnelles | Garde-fous par modalité ; évaluations cross-modales ; marquage | 04 · Runtime Guardrail ; 03 · Red-Team Suite |
| RAG | Les changements de corpus modifient le comportement ; la récupération divulgue | Corpus comme données gouvernées ; vérification de droit d'accès à la récupération ; évaluations d'ancrage | 02 · data card ; 04 · Runtime Guardrail |
| Agentique | Actions sous autorité déléguée | Identité, portée, portes humaines, arrêt testé | 04 · Agent Identity & Scoped Credentials ; Kill Switch ; Human-in-the-loop Gate |

Les types se combinent. `csa-01` est génératif, augmenté par récupération et agentique à la fois, il
porte donc tous les contrôles des trois lignes ; le champ `kind` du registre est une liste, non une
valeur unique.

## Huit caractéristiques qui cassent la gouvernance informatique classique

La gouvernance informatique classique (gestion des changements, portes SDLC, contrôle d'accès, le
système de gestion de la sécurité, audit périodique) suppose que le comportement est spécifié, qu'un
changement est une différence de code, qu'un test réussit ou échoue par rapport à une spécification,
qu'une personne se tient derrière chaque action conséquente et que le système fait aujourd'hui ce
qu'il faisait hier. L'IA casse chaque hypothèse quelque part. L'appendice B du NIST énumère les
façons dont le risque de l'IA diffère du risque logiciel traditionnel, des données qui peuvent ne
pas représenter le contexte d'utilisation, à l'échelle et la complexité avec « des milliards ou même
des billions de points de décision », à « l'opacité accrue », la dérive qui exige une maintenance
plus fréquente et « l'incapacité à prédire ou détecter les effets secondaires des systèmes basés sur
l'IA au-delà des mesures statistiques » [8]. Le tableau transforme cette liste en les huit
caractéristiques qu'un ingénieur doit concevoir.

| Caractéristique | Pourquoi la gouvernance informatique classique échoue | Ce qui y répond (couche · motif) | Preuves qu'elle émet |
|---|---|---|---|
| **Complexité** | La CMDB enregistre l'application ; le modèle, les ensembles de données, les invites, le corpus de récupération et le graphe d'outils à l'intérieur sont invisibles | 02 · AIBOM, Agent Registry | Un AIBOM par build ; les liens de registre du système au modèle aux données |
| **Opacité** | L'examen du code suppose que la logique est lisible ; les internals du modèle ne le sont pas | 03 · évaluations comportementales ; 02 · [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Résultats d'évaluation par rapport aux modes de défaillance nommés ; explications enregistrées |
| **Autonomie** | Le contrôle d'accès et la séparation des tâches supposent une personne derrière chaque session | 04 · Agent Identity & Scoped Credentials ; Human-in-the-loop Gate ; Kill Switch | Événements d'identité ; décisions de porte avec approbateur ; enregistrements de forage du kill-switch |
| **Vitesse et échelle** | L'examen périodique et basé sur des échantillons intervient après qu'une erreur s'est répétée un million de fois | 04 · Runtime Guardrail, Kill Switch / Circuit Breaker; 05 · [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Décisions de garde-fou ; déclenchement du disjoncteur ; enregistrements de restauration |
| **Sorties probabilistes** | Les tests réussissent ou échouent par rapport à une spécification ; une seule mauvaise réponse est un bug | 03 · Eval Gate in CI avec seuils ; 01 · Policy Card par niveau de risque | Résultats de calibrage et de seuil par version |
| **Dépendance aux données** | La gouvernance des données protège les données en tant qu'enregistrements, non en tant que source de comportement | 02 · data card et lignée ; 03 · tests de qualité des données et de sous-groupe | Data card ; enregistrement de lignée ; résultats de test classés par rapport à la version de l'ensemble de données |
| **Double usage et mauvaise utilisation** | Les modèles de menace se concentrent sur l'accès non autorisé, non sur l'utilisation autorisée à une fin nuisible | 03 · Adversarial Red-Team Suite ; 04 · Runtime Guardrail ; 01 · acceptable use as code | Conclusions du red-team ; détections de mauvaise utilisation ; verdicts de politique |
| **Adaptabilité et dérive** | La gestion des changements se déclenche sur les déploiements de code ; le comportement change sans un | 05 · Continuous Assurance Telemetry ; 03 · réexécuter la porte sur le changement de modèle, de données ou d'invite | Alertes de dérive par rapport à la ligne de base d'évaluation ; résultats de réévaluation |

Quelques lignes nécessitent plus qu'une cellule.

**L'opacité a trois sources, et chacune a un correctif différent.** Burrell distingue l'opacité
comme secret corporatif ou d'État intentionnel, l'opacité comme analphabétisme technique, et
l'opacité « qui découle des caractéristiques des algorithmes d'apprentissage automatique et de
l'échelle requise pour les appliquer utilement » [26]. Le secret est répondu par contrat et
divulgation (documentation du fournisseur, droits d'audit) ; l'analphabétisme par la littératie et
par des explications écrites pour leur lecteur ; seul le troisième a besoin de méthodes
d'explication technique et, surtout, de preuves comportementales. Quand vous ne pouvez pas lire le
mécanisme, vous testez le comportement, et le résultat de l'évaluation devient la preuve qui
remplace l'inspection. Les techniques d'explication elles-mêmes sont couvertes dans
[Fairness and explainability](/bok/fairness-and-explainability#explanation-techniques).

**Le double usage est une propriété de la capacité, non de l'intention.** Les chercheurs qui ont
inversé l'objectif d'un modèle de toxicité de découverte de médicaments, récompensant la toxicité au
lieu de la pénaliser, rapportent qu'il a généré environ 40 000 molécules toxiques candidates en
moins de six heures, y compris des agents nerveux connus [27]. Rien n'a été violé ; un utilisateur
autorisé a changé un objectif. C'est pourquoi la mauvaise utilisation a besoin de son propre modèle
de menace, de cas de red-team pour les utilisations nuisibles de capacités légitimes, et de
détection à l'exécution, pas seulement de sécurité périmétrique.

**La vitesse et l'échelle transforment un petit taux d'erreur en préjudice de masse.** Un taux
d'erreur de 1 % est une erreur d'arrondi dans un examen trimestriel et dix mille mauvaises décisions
par jour dans un système qui en prend un million. Les réponses sont donc à l'exécution : un
garde-fou par appel, un disjoncteur qui se déclenche sur un taux, une restauration testée avant
d'être nécessaire.

**L'adaptabilité est plus large que l'auto-apprentissage.** Pour les systèmes qui continuent à
apprendre en utilisation, le règlement sur l'IA demande des conceptions qui réduisent le risque de
sorties biaisées se réalimentant dans les entrées futures (« boucles de rétroaction ») [12]. Mais la
plupart des changements de comportement arrivent sans auto-apprentissage : un fournisseur met à jour
le modèle derrière une API, les entrées dérivent, une invite est modifiée, un corpus est actualisé.
Le réentraînement peut aussi casser ce qui fonctionnait : les réseaux de neurones sont sujets à
l'**oubli catastrophique**, perdant la compétence antérieure lors de l'entraînement sur de nouvelles
tâches [28]. Chacun est un événement de changement, et la porte d'évaluation s'exécute sur chacun.

### Paires de contraste

Quatre paires sont assez souvent confondues dans les examens pour mériter d'être clarifiées dans le
vocabulaire de l'équipe.

| Paire | La différence | Pourquoi cela importe pour les contrôles |
|---|---|---|
| **Complexité** et **opacité** | Combien de parties interagissent, par rapport à si une personne peut suivre le raisonnement ; un petit réseau de neurones est simple et opaque | La complexité a besoin d'un inventaire ; l'opacité a besoin d'évaluations |
| **Transparence**, **explicabilité**, **interprétabilité** | Dans le cadre du NIST, elles répondent « ce qui s'est passé », « comment » une décision a été prise et « pourquoi », avec sa signification pour l'utilisateur [8] | Trois artefacts : enregistrements de ce qui a fonctionné, une méthode d'explication, un message sur lequel l'utilisateur peut agir |
| **Dérive des données** et **dérive conceptuelle** | Les entrées changent, par rapport à la relation entre les entrées et la bonne réponse qui change | La première se voit dans les entrées ; la seconde seulement dans les résultats |
| **Confidentialité** et **sécurité** | Si le traitement des données personnelles est approprié, par rapport à si le système résiste aux attaques | Un système sécurisé peut toujours traiter des données qu'il n'a pas le droit de traiter |

## Gouverner les sorties probabilistes

Le logiciel conventionnel retourne une réponse. La plupart de l'IA retourne une estimation ou un
échantillon, et quelqu'un doit décider quoi en faire. Cette décision est le plus souvent laissée à
un défaut de data scientist, et c'est là que l'ingénierie ajoute le plus.

### Un score n'est pas une décision

Un modèle prédictif émet un score. Une décision est un score, plus un seuil, plus une action prise
quand le score le franchit. Le seuil est où l'appétit pour le risque devient comportement, c'est
donc une décision de politique avec un propriétaire, une version et une date d'entrée en vigueur,
non un hyperparamètre laissé à 0,5. Écrivez-le comme une règle [Policy Card](/patterns/policy-card),
testez-le dans la porte d'évaluation et enregistrez-le avec chaque décision qu'il produit. Quand un
auditeur demande pourquoi un demandeur a été refusé, « le score était 0,41 et le seuil, détenu par
le risque de crédit et en vigueur depuis le 1er octobre, était 0,45 » est une réponse ; « le modèle
a dit non » ne l'est pas.

### Calibrage avant les seuils

Un seuil ne signifie quelque chose que si le score le fait. Un modèle **calibré** de 0,9 a raison
environ neuf fois sur dix. Une étude largement citée a constaté que les réseaux de neurones
modernes, contrairement à ceux d'il y a une décennie, sont mal calibrés, et qu'un correctif simple
post-hoc (mise à l'échelle de la température) est étonnamment efficace [29]. Le calibrage appartient
donc à la suite d'évaluation en tant que propriété mesurée avec son propre seuil (une limite
d'erreur d'étalonnage attendue, par version et par sous-groupe), revérifiée quand le modèle ou la
population change. Le règlement sur l'IA pointe déjà dans cette direction pour les systèmes à haut
risque : les niveaux de précision et « les métriques de précision pertinentes » doivent être
déclarés dans les instructions d'utilisation [12]. Les métriques déclarées deviennent la ligne de
base par rapport à laquelle la télémétrie d'exécution est comparée.

Lorsqu'un seul score ne suffit pas, la **prédiction conforme** offre une alternative disciplinée :
elle transforme la sortie de tout modèle entraîné en un ensemble de réponses candidates « garanties
de contenir la vérité terrain avec une probabilité spécifiée par l'utilisateur », sans hypothèses
sur la distribution des données [30]. Un grand ensemble signifie que le modèle dit qu'il est
incertain, ce qui est exactement le signal sur lequel une règle de gouvernance peut s'appuyer.

### Certitude requise par niveau de risque

La certitude dont une décision a besoin dépend du coût de se tromper, donc la règle d'exécution est
définie par niveau de risque. Trois mouvements reviennent régulièrement. Une **bande d'abstention**
achemine les scores qui ne sont ni clairement positifs ni clairement négatifs vers une personne via
une [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Une
**règle de résultat indésirable** envoie en révision chaque décision qui nuit au sujet, quelle que
soit la confiance du modèle. Une **règle hors distribution** refuse ou remonte les entrées
différentes de tout ce sur quoi le système a été testé, car un score confiant sur une entrée
inconnue est la sortie la moins fiable qu'un modèle produit.

| Niveau de risque (illustratif) | Règle d'exécution | Preuves requises par version | Rôle humain |
|---|---|---|---|
| Faible (classement de recherche interne) | Agir sur la sortie supérieure | Précision agrégée sur un ensemble de référence | Révision périodique |
| Modéré (assistant orienté client) | Agir ; s'abstenir et transférer quand l'ancrage ou la confiance tombe en dessous d'un seuil | Évaluations d'ancrage, de refus et de transfert | En boucle : surveiller et arrêter |
| Élevé (décisions concernant l'accès des personnes à l'emploi, au crédit ou aux services) | Recommander uniquement au-dessus d'un seuil calibré ; bande d'abstention et chaque résultat indésirable à un examinateur | Taux d'erreur de calibrage et de sous-groupe ; métriques de précision déclarées | En boucle pour la bande et les résultats indésirables ; explication sur demande |
| À ne pas automatiser | Aucune action automatique ; sortie consultatif au maximum, ou l'utilisation est bloquée | Un verdict politique | En commande |

Le rôle humain est lui-même un contrôle qui peut se dégrader. La supervision sous charge devient un
tampon encreur, et la Loi sur l'IA demande que les personnes supervisant les systèmes à haut risque
restent conscientes du « biais d'automatisation », la tendance à trop s'appuyer sur la sortie [20].
Donc la gate enregistre l'approbateur, le temps de décision et le taux de dépassement, et un taux de
dépassement décroissant est enquêté, non célébré (voir
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

> **Exemple (illustratif)**
> Une politique de seuil pour un modèle de tri de prêts, écrite comme une règle Policy Card. Les
> chiffres sont illustratifs ; le point est que chacun a un propriétaire et une date d'entrée en
> vigueur et est testé dans la gate.

```json
{ "policy_id": "decision-threshold.loan-triage.v3", "subject": "loan-triage-02",
  "risk_tier": "high", "owner": "credit-risk-product", "effective": "2026-10-01",
  "auto_approve_if": "calibrated_score >= 0.92",
  "review_band": [0.55, 0.92], "review_route": "hitl-gate.credit-review",
  "adverse_outcome": "always-human-review",
  "out_of_distribution": "escalate",
  "release_requires": ["calibration.ece <= 0.03", "subgroup.fnr_gap <= 0.02"] }
```

### Sorties génératives et non-déterminisme

Les systèmes génératifs n'ont pas un seul score à seuil. Les contrôles se déplacent vers les
propriétés de la sortie : ancrée dans ses sources, citée, refusée quand elle devrait l'être,
cohérente entre les échantillons. La cohérence ne peut pas être supposée. Un laboratoire rapporte
que l'envoi du même prompt 1 000 fois à un grand modèle à température zéro a produit 80 complétions
distinctes, et trace la variation au batching de la pile de service plutôt qu'à l'échantillonnage
[14]. Donc les preuves enregistrent la version du modèle, les paramètres d'échantillonnage et, où la
pile le permet, la graine ; et une évaluation qui compte s'exécute sur plusieurs échantillons et
rapporte un taux, pas un seul passage.

## Ensembles de principes d'IA responsable, engineered

Dans ce livre, **principe** a un sens maison : l'une des six règles de méthode du
[chapitre 03](/bok/values-and-principles#the-six-principles), formulée comme quelque chose que nous
faisons. Les textes d'IA responsable publiés utilisent le mot pour une cible normative, une
propriété que l'IA devrait avoir. Cette section les garde séparés. Elle appelle les publiés
**ensembles de principes**, les traite comme les cadres d'autres personnes (dans la
[désambiguïsation](/bok/definition#the-disambiguation-cluster) du chapitre 01, l'éthique fixe la
cible ; l'ingénierie la frappe et le prouve) et pose une question à chacun : quel artefact
l'evidencie, de quelle couche, sous quelle valeur maison et quel principe. Les ensembles en tant que
cadres sont traités en détail dans
[Principles and standards](/bok/principles-and-standards#the-instruments-at-a-glance).

### Quatre ensembles de principes en bref

**Principes de l'IA de l'OCDE.** Adoptés le 22 mai 2019, avec la définition révisée le 8 nov 2023 et
les principes le 3 mai 2024, la Recommandation établit cinq principes fondés sur les valeurs :
croissance inclusive, développement durable et bien-être ; droits humains et valeurs démocratiques,
y compris l'équité et la vie privée ; transparence et explicabilité ; robustesse, sécurité et sûreté
; et responsabilité [2]. La révision 2024 a ajouté des points sur lesquels un ingénieur peut agir
directement : des mécanismes pour que les systèmes d'IA qui « risquent de causer un préjudice indu
ou présentent un comportement indésirable » puissent être « remplacés, réparés et/ou désactivés en
toute sécurité » ; attention à l'abus et aux utilisations en dehors de la finalité prévue ;
intégrité de l'information ; et une référence explicite à la durabilité environnementale [2].

**Recommandation de l'UNESCO sur l'éthique de l'IA.** Adoptée par les 193 États membres de l'UNESCO
en novembre 2021, elle établit quatre valeurs fondamentales (droits humains et dignité ; sociétés
pacifiques, justes et interconnectées ; diversité et inclusivité ; environnement et épanouissement
des écosystèmes) et dix principes, de la proportionnalité et du non-nuisance à l'équité et à la
non-discrimination [31]. Son outil d'Évaluation de l'impact éthique, destiné d'abord aux acheteurs
de systèmes d'IA, évalue un système spécifique avant et après le déploiement [32].

**Groupe d'experts de haut niveau de l'UE (HLEG).** Les Lignes directrices en matière d'éthique pour
une IA digne de confiance (8 avr 2019) reposent sur quatre principes éthiques (respect de
l'autonomie humaine, prévention du préjudice, équité, explicabilité) et établissent sept exigences :
agentivité et supervision humaines ; robustesse technique et sûreté ; gouvernance des données et de
la vie privée ; transparence ; diversité, non-discrimination et équité ; bien-être sociétal et
environnemental ; et responsabilité [13]. La Liste d'évaluation pour une IA digne de confiance
(ALTAI, 17 juil 2020) transforme les sept en une liste de contrôle d'auto-évaluation [33], et le
Considérant 27 de la Loi sur l'IA renvoie aux mêmes sept comme principes non contraignants qui
complètent la Loi [34].

**Processus de Hiroshima du G7.** Les Principes directeurs internationaux pour les organisations
développant des systèmes d'IA avancés (30 oct 2023), avec un Code de conduite compagnon, s'appuient
sur les principes de l'OCDE pour les modèles avancés et fondamentaux [35]. Ses onze principes sont
opérationnels plutôt qu'éthiques : mesures des risques du cycle de vie incluant les tests
adversariaux, surveillance post-déploiement, rapports publics sur les capacités et limitations,
partage d'informations sur les incidents, politiques de gouvernance, contrôles de sécurité,
provenance du contenu, recherche, défis mondiaux, normes, et protections des données d'entrée et de
la propriété intellectuelle [36]. Depuis février 2025, l'OCDE gère un cadre de rapports volontaires
par rapport au Code de conduite [37].

### Où les ensembles s'accordent

Les quatre ensembles divergent sur l'accent et s'accordent sur le fond. Le tableau croise les sept
principes qu'ils partagent avec l'endroit où chaque ensemble les énonce.

| Principe partagé | OECD (2024) | UNESCO (2021) | EU HLEG (2019) | G7 Hiroshima (2023) |
|---|---|---|---|---|
| Équité et non-discrimination | 1.2 (équité, non-discrimination) | Équité et non-discrimination | Req. 5 diversité, non-discrimination et équité | Préambule ; 11 (qualité des données contre les biais nuisibles) |
| Sûreté et fiabilité | 1.4 (robuste, sûr ; remplacer, réparer, désactiver) | Proportionnalité et non-nuisance ; sûreté et sécurité | Req. 2 robustesse technique et sûreté | 1 (mesures des risques du cycle de vie) ; 2 (surveillance post-déploiement) |
| Vie privée et sécurité | 1.2 (vie privée, protection des données) ; 1.4 (sécurité) | Droit à la vie privée et à la protection des données ; sûreté et sécurité | Req. 3 gouvernance des données et de la vie privée | 6 (contrôles de sécurité) ; 11 (données personnelles, propriété intellectuelle) |
| Transparence et explicabilité | 1.3 (incl. information pour contester une sortie) | Transparence et explicabilité | Req. 4 transparence | 3 (rapports publics) ; 7 (provenance du contenu) |
| Responsabilité | 1.5 (traçabilité ; gestion systématique des risques) | Responsabilité et imputabilité | Req. 7 responsabilité | 4 (partage d'incidents) ; 5 (politiques de gouvernance) |
| Centricité humaine, incl. accessibilité et inclusion | 1.1 (croissance inclusive) ; 1.2 (agentivité et supervision humaines) | Supervision et détermination humaines ; sensibilisation et maîtrise ; diversité et inclusivité | Req. 1 agentivité et supervision humaines ; Req. 5 (accessibilité et conception universelle) | Préambule (centricité humaine) |
| Durabilité | 1.1 (durabilité environnementale) | Durabilité ; environnement et épanouissement des écosystèmes | Req. 6 bien-être sociétal et environnemental | 9 (crise climatique et autres défis mondiaux) |

Sources : [2][31][13][36].

### Du principe à l'artefact

Un principe est appliqué quand il a été tracé à un préjudice nommé, un contrôle qui mord, une
métrique qui bouge et un enregistrement de preuves que quelqu'un peut interroger. C'est le «
[commencer par un mode de défaillance nommé ou un préjudice nommé](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
» du chapitre 03 appliqué aux cibles d'autres personnes. Le tableau donne, pour chaque principe
partagé, les valeurs maison ([chapitre 03](/bok/values-and-principles#the-eight-values)) et les
principes maison qui l'engineered et l'artefact qui l'evidencie. C'est une carte de démarrage, pas
une affirmation que tout artefact satisfait un principe.

| Principe partagé | Valeurs maison | Principes maison | Artefact qui l'evidencie | Couche · motif |
|---|---|---|---|---|
| Équité | 2 les évals échouent les builds ; 7 réduction effective du risque | Commencer par un préjudice nommé ; donner des dents à chaque contrôle | Résultats d'éval de sous-groupe par rapport à un seuil déclaré ; fiche de données avec notes de représentativité ; FRIA | 03 · Eval Gate in CI; 01 · [FRIA-as-Code](/patterns/fria-as-code) |
| Sûreté et fiabilité | 2 ; 3 preuves de l'exécution | Construire au point le plus précoce ; donner des dents à chaque contrôle | Résultats d'eval-gate et de test adversarial par version ; décisions de guardrail ; enregistrements de forage du kill-switch | 03 · Adversarial Red-Team Suite ; 04 · Runtime Guardrail, Kill Switch |
| Vie privée et sécurité | 1 la gouvernance est du code ; 4 identité et portée | Enregistrer et borner chaque acteur ; construire au point le plus précoce | Verdicts politiques sur la classe de données et la résidence ; identifiants limités ; DPIA ; évals de fuite de PII | 01 · Policy Card; 04 · Agent Identity & Scoped Credentials |
| Transparence et explicabilité | 5 preuves lisibles par machine ; 6 outillage inspectable | Instrumenter la construction | Fiche de modèle, fiche de données et AIBOM ; enregistrements de divulgation et de marquage ; [codes de raison enregistrés par décision](/patterns/explanation-artefact) | 02 · Model Card as Control Evidence; AIBOM |
| Responsabilité | 4 ; 8 possédé avec l'ingénierie | Enregistrer et borner chaque acteur ; instrumenter la construction | Propriétaire du registre par entrée ; enregistrements de décision ; journaux signés ; enregistrements d'incidents ; résultats d'évaluation OSCAL | 02 · Agent Registry; 05 · [Incident Pipeline](/patterns/incident-pipeline), [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Centricité humaine | 8; 3 | Commencer par un préjudice nommé ; rendre le chemin gouverné le plus facile | Journaux de gate (approbateur, temps de décision, taux de dépassement) ; résultats de test d'accessibilité pour les avis et explications ; enregistrements d'appel | 04 · Human-in-the-loop Gate |
| Durabilité | 7 | Instrumenter la construction | Énergie ou calcul par exécution d'éval et par 1 000 inférences dans le magasin de preuves ; un enregistrement de décision de taille de modèle | 05 · Continuous Assurance Telemetry |

Trois lignes portent un poids légal ou numérique. **L'approche centrée sur l'humain** inclut
l'accessibilité, et pour les systèmes à haut risque c'est un devoir : les fournisseurs doivent
respecter les exigences d'accessibilité des directives européennes sur l'accessibilité du web et sur
l'accessibilité (Art. 16(l)) [38], de sorte que chaque avis et explication que le système affiche à
une personne reçoit un test d'accessibilité dans le pipeline. **La transparence** atteint la
personne affectée : le texte de l'OCDE demande des informations qui permettent à ceux affectés
négativement de « contester son résultat » [2], et le Reglamento de IA donne aux personnes affectées
par certaines décisions à haut risque le droit à des « explications claires et significatives du
rôle du système d'IA » [10] ; l'artefact est un code de raison enregistré et une voie d'appel avec
des résultats documentés. **La durabilité** a un chiffre : l'AIE estime que les centres de données
ont utilisé environ 415 TWh en 2024, environ 1,5 % de l'électricité mondiale, et projette environ
945 TWh d'ici 2030 [39]. Tout cela n'est pas de l'IA, mais cela fait du choix entre un SLM et un LLM
pour la même tâche une décision de gouvernance avec un enregistrement.

> **Exemple (illustratif)**
> Un principe tracé de bout en bout. L'OCDE 1.3 demande que les personnes affectées négativement par
> un système puissent contester son résultat. Préjudice nommé : un candidat rejeté par
> `loan-triage-02` ne peut pas découvrir pourquoi ou le contester. Contrôle : chaque décision
> défavorable porte des codes de raison enregistrés et une voie d'appel vers un examinateur qui peut
> l'annuler. Métrique : volume d'appels, taux d'annulation et délai de résolution, par mois. Preuve
> : le journal d'appels, classé par rapport à l'entrée du registre et à la version du modèle.
> Obligation qu'elle soutient : Reglamento de IA Art. 86 où il s'applique, RGPD Art. 22 garanties où
> la décision est entièrement automatisée.

### Les compromis sont des décisions, et les décisions sont des enregistrements

Les principes entrent en collision. NIST nomme les collisions habituelles : l'interprétabilité
contre la confidentialité, la précision prédictive contre l'interprétabilité, et les techniques
d'amélioration de la confidentialité qui coûtent en précision et avec elle l'équité où les données
sont rares ; il ajoute que ces compromis « devraient être résolus d'une manière à la fois
transparente et dûment justifiable » [8]. La lecture d'ingénierie est que chaque compromis résolu
est un enregistrement de décision avec un propriétaire, les options considérées, la métrique que
chacune aurait déplacée et la date à laquelle elle sera réexaminée.

| Tension | Cas typique | Où la décision réside |
|---|---|---|
| Précision contre interprétabilité | Un modèle à gradient boosting surpasse une fiche de pointage de quelques points | Enregistrement de sélection de modèle sur la fiche de modèle, avec les deux résultats d'évaluation |
| Test d'équité contre confidentialité | Les évaluations de sous-groupe ont besoin des données de catégorie spéciale que la loi sur la protection de la vie privée restreint | Fiche de données notant la base légale (voir Art. 4a dans [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)), pseudonymisation et suppression |
| Efficacité contre approche centrée sur l'humain | Une étape d'examen ajoute de la latence à chaque décision | Enregistrement de placement de porte : quelles actions sont contrôlées et pourquoi |
| Transparence contre sécurité | La publication des règles de détection aide les attaquants à les contourner | Décision de divulgation : ce qui est publié, ce qui est conservé pour les auditeurs |

Un compromis que personne n'a écrit a quand même été fait ; il a été fait par défaut, par celui qui
a touché le code en dernier.

> **En pratique (illustratif)**
> Une équipe de gouvernance a hérité d'une « charte d'IA responsable » publiée de six principes et
> aucune preuve derrière aucun d'eux. Plutôt que de réécrire la charte, elle a ajouté une colonne au
> registre par principe et a demandé, pour chaque système à haut risque, quel artefact l'evidenced.
> Quatre sur six colonnes étaient vides pour la plupart des systèmes le premier jour. Les cellules
> vides sont devenues le carnet de commandes, et la charte est devenue auditable pour la première
> fois : un principe sans artefact a été signalé comme une lacune, pas comme une valeur.

## Ce que vous pouvez faire cette semaine

1. Ajoutez les huit champs de portée de ce chapitre (`substrate`, `objective`, `intended_purpose`,
   `inference_technique`, `output_types`, `effect_surface`, `autonomy_level`, `adapts_in_use`) et un
   `definition_decision` avec sa raison à votre schéma de registre, et remplissez vos dix systèmes à
   plus forte exposition.
2. Notez les décisions hors de portée que vous avez déjà prises implicitement (moteurs de règles,
   tableaux de bord, prévisionnistes de base), chacune avec la famille exclue et la raison, de sorte
   qu'un changement ultérieur s'affiche sous forme de diff.
3. Pour un système prédictif en production, trouvez le seuil de décision, son propriétaire et sa
   dernière vérification d'étalonnage. Si l'un des trois manque, ajoutez une évaluation d'étalonnage
   à sa porte et mettez le seuil dans un fichier de politique avec un propriétaire.
4. Pour un système génératif, exécutez son évaluation la plus importante cinq fois sur la version
   actuelle du modèle et enregistrez le taux de réussite avec les paramètres d'échantillonnage. Si
   le taux est inférieur au plancher que vous pensiez avoir, vous avez trouvé votre première vraie
   porte.
5. Prenez un principe que votre organisation a publié et tracez-le vers un artefact pour un système,
   en utilisant le tableau ci-dessus. S'il n'y a pas d'artefact, enregistrez la lacune dans le
   registre des risques.

**Correspondances :** Reglamento de IA Art. 3(1), 3(63), 3(66) (définitions), Art. 14 (contrôle
humain), Art. 15 (métriques de précision, boucles de rétroaction), Art. 16(l) (accessibilité), Art.
50 (transparence), Art. 51 (risque systémique de l'IA à usage général), Art. 86 (explication) · RGPD
Art. 22 · ISO/IEC 22989 · ISO/IEC 42001 · NIST AI RMF (Map, Measure) et NIST AI 600-1 · Principes de
l'OCDE · OWASP Agentic ASI02/ASI03 · Couches 01–05. Les mappages sont illustratifs, pas une
affirmation de conformité.

## Sources

[1] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; first published 6 Feb 2025; not binding; seven elements of Art. 3(1); exclusions at paras 40–51; definition applicable since 2 Feb 2025). European Commission. 2025-07-29. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[2] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; definition revised 8 Nov 2023; principles revised 3 May 2024; principles 1.1–1.5, incl. 1.3(iv) challenge an output and 1.4(b) override, repair, decommission). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[3] Explanatory memorandum on the updated OECD definition of an AI system (2019 and 2023 texts compared; autonomy and adaptiveness explained; not part of the Recommendation). OECD Artificial Intelligence Papers. 2024-03. https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (1) AI system, (3) provider, (4) deployer, (63) general-purpose AI model, (66) general-purpose AI system). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Recital 12 (AI distinguished from simpler traditional software and from rules defined solely by natural persons; inference; machine learning and logic- and knowledge-based approaches; autonomy and adaptiveness; recitals are not reproduced in the consolidated text). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_12 (verified: primary)
[6] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (AI system, term 3.1.4; autonomy and heteronomy, terms 3.1.5 and 3.1.16; clause 5.13 autonomy, heteronomy and automation; clause 5.19 AI stakeholder roles); referenced by identifier only. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[7] ISO/IEC 22989:2022/FDAmd 1, Generative AI (stage 50.00, FDIS registered for formal approval on 2026-09-18; not published as of 2026-09-24). ISO/IEC JTC 1/SC 42. 2026-09-18. https://www.iso.org/standard/88145.html (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (AI system definition; trustworthy characteristics; s. 3.5 transparency, explainability, interpretability; trade-offs; Appendix B, how AI risks differ from traditional software risks). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of interaction with an AI system; machine-readable marking of synthetic audio, image, video and text). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[10] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to clear and meaningful explanations of the role of a high-risk AI system in a decision). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[11] Regulation (EU) 2016/679 (GDPR), Art. 22(1) (right not to be subject to a decision based solely on automated processing, including profiling, with legal or similarly significant effects). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_22 (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15 (15(3) accuracy levels and metrics declared in the instructions for use; 15(4) feedback loops in systems that continue to learn). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[13] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; HITL, HOTL and HIC oversight; requirement 5 includes accessibility and universal design). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[14] "Defeating Nondeterminism in LLM Inference" (1,000 temperature-zero completions of one prompt gave 80 unique outputs; cause traced to lack of batch invariance). Thinking Machines Lab (Horace He et al.). 2025-09-10. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (verified: primary)
[15] Levels of AGI for Operationalizing Progress on the Path to AGI (levels of performance, generality and autonomy) (arXiv 2311.02462). Morris et al.. 2023-11-04. https://arxiv.org/abs/2311.02462 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 51 (classification of GPAI models with systemic risk; 51(2) presumption of high-impact capabilities above 10^25 FLOP of training compute). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_51 (verified: primary)
[17] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (C(2025) 7719 final; first published 18 Jul 2025; para. 17 indicative criterion: training compute above 10^23 FLOP and able to generate language, text-to-image or text-to-video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[18] "Understanding the four types of AI, from reactive robots to self-aware beings" (reactive machines, limited memory, theory of mind, self-awareness). The Conversation (Arend Hintze). 2016-11-14. https://theconversation.com/understanding-the-four-types-of-ai-from-reactive-robots-to-self-aware-beings-67616 (verified: primary)
[19] Concrete Problems in AI Safety (reward hacking among five practical problems) (arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 14 (14(4)(b) automation bias; 14(4)(e) interrupting the system so it comes to a halt in a safe state). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_14 (verified: primary)
[21] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[22] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream) (arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[23] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone) (arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[24] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; provenance as an open problem) (arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[25] Top 10 for Agentic Applications 2026 (ASI01–ASI10 threat catalogue for agentic systems). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[26] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity), Big Data & Society 3(1). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[27] "Dual use of artificial-intelligence-powered drug discovery" (inverted toxicity model generated about 40,000 candidate toxic molecules in under six hours), Nature Machine Intelligence. Urbina, Lentzos, Invernizzi and Ekins (full text on PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[28] Overcoming catastrophic forgetting in neural networks (neural networks lose earlier competence when trained on new tasks; elastic weight consolidation) (arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[29] On Calibration of Modern Neural Networks (modern networks poorly calibrated; temperature scaling), ICML 2017 (arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[30] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage) (arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[31] Recommendation on the Ethics of Artificial Intelligence (adopted by 193 member states, November 2021; four core values; ten principles). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[32] Ethical Impact Assessment: a tool of the Recommendation on the Ethics of AI (ex-ante and ex-post assessment of a system; aimed at procurers of AI systems). UNESCO. 2023-08-28. https://www.unesco.org/en/articles/ethical-impact-assessment-tool-recommendation-ethics-artificial-intelligence (verified: primary)
[33] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), Recital 27 (the seven HLEG principles as non-binding ethical principles complementing the Act). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[35] Hiroshima Process International Guiding Principles for Organizations Developing Advanced AI Systems (welcomed by G7 leaders with a companion Code of Conduct; builds on the OECD AI Principles). European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-guiding-principles-advanced-ai-system (verified: primary)
[36] Hiroshima Process International Guiding Principles, full text of the eleven principles (preamble on human rights, fairness and human-centricity; principle 11 elaboration on data quality against harmful bias). G7 Information Centre (University of Toronto). 2023-10-30. https://g7.utoronto.ca/summit/2023hiroshima/231030-ai-principles.html (verified: secondary)
[37] Hiroshima AI Process (HAIP) Reporting Framework (voluntary reporting against the Code of Conduct; launched February 2025). OECD.AI. 2025-02. https://oecd.ai/en/hiroshima (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16 (provider obligations; 16(l) accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[39] Energy and AI (data centres about 415 TWh in 2024, around 1.5% of global electricity; projected around 945 TWh by 2030). International Energy Agency. 2025. https://www.iea.org/reports/energy-and-ai (verified: primary)
