---
lang: fr
source: bok/22-principles-and-standards.md
sourceHash: "45f690d8e41680445e0ec502f1a21c2904a69366d076f37bc4836cff3aeee9fc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 22. Principes, droit souple et normes

> Les principes disent ce qu'est la qualité et les normes disent comment le montrer ; ce chapitre
> mappe chaque instrument à la couche du stack et au dossier de preuves qui y répondent.

## Comment lire ce chapitre

La plupart de ce qui façonne la gouvernance de l'IA n'est pas la loi. C'est un treillis d'ensembles
de principes, un traité, des cadres volontaires et des normes techniques, chacun écrit par un corps
différent pour un public différent. Le travail de l'ingénieur n'est pas de les réciter. C'est de
savoir, pour chacun, ce qu'il demande, quelle force il porte, et quel artefact dans le stack
témoignerait que la demande est satisfaite. Un principe ne compte qu'une fois qu'il est un contrôle
; une norme n'aide que si ses clauses sont câblées à une porte, un champ de registre ou un dossier
de preuves.

En gros ordre de force : droit contraignant (le Reglamento de IA, dans
[chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus) et
[chapitre 18](/bok/eu-ai-act#the-act-and-the-omnibus)) ; un traité contraignant, la Convention-cadre
du Conseil de l'Europe, qui lie les Parties qui la ratifient et laisse chacune choisir comment
atteindre les acteurs privés [1] ; **normes harmonisées**, normes européennes écrites sur demande de
la Commission qui donnent une présomption de conformité une fois que leur référence est publiée au
Journal officiel [2] ; normes et cadres internationaux (ISO/IEC, NIST, IEEE), volontaires et parfois
certifiables ; et principes et droit souple (OCDE, UNESCO, G7, Groupe d'experts de haut niveau de
l'UE), qui fixent la cible et le vocabulaire partagé.

Deux mises en garde parcourent le chapitre. Les normes soutiennent, elles ne confèrent pas : aucun
certificat et aucun chiffre de couverture ne rend un système conforme, et le test du
[chapitre 01](/bok/definition#three-clarifiers) s'applique toujours. Et ce chapitre explique les
instruments tandis que [chapitre 08](/bok/regulatory-map#how-to-read-this-map) reste l'index des
obligations ; où un instrument a déjà des lignes là, ce chapitre y renvoie. Les ensembles de
principes sont le terrain d'accueil de l'IA responsable et de l'éthique de l'IA
([chapitre 01](/bok/definition#the-disambiguation-cluster)) : ils fixent les valeurs. Les tableaux
d'artefacts et de couches ci-dessous sont la contribution de l'ingénierie, non une affirmation sur
ce que les auteurs des principes avaient l'intention.

## Les instruments en un coup d'œil

| Instrument | Émetteur | Force | Ce qu'il change dans le stack | Couches principales |
|---|---|---|---|---|
| Principes de l'OCDE sur l'IA (2019, rév. 2024) | OECD | Engagement politique de 47 adhérents | Définition partagée, champs de cycle de vie et de classification pour le registre | 1 · 2 |
| Recommandation de l'UNESCO (2021) | UNESCO | Non contraignante, adoptée par 193 États membres | Évaluation d'impact éthique comme dossier lié au registre | 2 |
| Convention-cadre (STCE n° 225) | Conseil de l'Europe | Contraignante pour les Parties une fois en vigueur ; pas en vigueur au 2026-09-24 | Gestion des risques et des impacts, test au changement, dossiers de contestabilité | 1 · 2 · 3 · 5 |
| Code de conduite de Hiroshima (2023) | G7 | Volontaire ; cadre de rapport de l'OCDE | Rapport public sur les capacités, partage d'incidents, provenance | 2 · 4 · 5 |
| Lignes directrices éthiques et ALTAI (2019, 2020) | EU AI HLEG | Non contraignant ; rappelé dans le considérant 27 du Reglamento de IA | Sept exigences comme liste de contrôle à convertir en contrôles | 1 · 2 |
| NIST AI RMF 1.0 et profils | NIST | Volontaire | Identifiants de fonction, catégorie et sous-catégorie comme métadonnées de contrôle | 1–5 |
| ISO/IEC 22989, 42001 et famille | ISO/IEC JTC 1/SC 42 | Volontaire ; 42001 certifiable | Preuves du système de gestion ; vocabulaire ; processus du cycle de vie | 1 · 2 · 5 |
| Normes harmonisées JTC 21 | CEN-CENELEC | Présomption de conformité une fois citée au JO ; aucune citée autant que nous puissions le trouver | Dossier de risque du fournisseur, schéma de journalisation, preuves du QMS | 1–5 |
| Série IEEE 7000 | IEEE | Volontaire | Éthique par la conception et processus de biais dans le SDLC | 1 · 2 · 3 |

Les sources de chaque ligne se trouvent dans la section qui la traite. Les nombres d'adhérents et
d'États membres proviennent de [3] et [4] ; le statut de la Convention provient de [5].

## Une brève généalogie du droit souple de l'IA

Les instruments se citent les uns les autres, et l'ordre importe car les définitions se propagent en
aval. Le groupe d'experts de haut niveau de l'UE a publié ses Lignes directrices éthiques le 8 avril
2019 [6]. Le Conseil de l'OCDE a adopté sa Recommandation sur l'IA le 22 mai 2019, et les dirigeants
du G20 ont accueilli les Principes de l'IA du G20 qui en sont issus à Osaka en juin 2019 [7]. Les
États membres de l'UNESCO ont adopté la Recommandation sur l'éthique de l'IA en novembre 2021 [4].
L'OCDE a publié son Cadre de classification des systèmes d'IA le 22 février 2022 [8], et le NIST AI
RMF 1.0 a suivi le 26 janvier 2023, en adaptant le cycle de vie et les dimensions de l'OCDE dans sa
propre Figure 2 [9]. Les dirigeants du G7 ont approuvé les Principes directeurs de Hiroshima et le
Code de conduite le 30 octobre 2023 [10]. L'OCDE a révisé sa définition du système d'IA le 8
novembre 2023 et l'ensemble de la Recommandation le 3 mai 2024 [7]. Le Conseil de l'Europe a adopté
sa Convention-cadre le 17 mai 2024 et l'a ouverte à la signature le 5 septembre 2024 [11]. L'OCDE a
lancé le cadre de rapport de Hiroshima le 7 février 2025 [12], et l'Union européenne a ratifié la
Convention le 15 mai 2026 [13].

La conséquence pratique est une convergence sur une seule définition. La définition de l'OCDE d'un
système d'IA, l'article 2 de la Convention et l'article 3(1) du règlement sur l'IA utilisent un
libellé quasi identique, et le considérant 12 du règlement sur l'IA dit que la notion devrait être
étroitement alignée sur les travaux des organisations internationales [7][1][14]. Un registre qui
classe les systèmes selon ce libellé une seule fois peut répondre aux trois instruments ; le
[chapitre 11](/bok/ai-defined#four-definitions-compared) traite la définition elle-même et établit
un tableau des
[points où les ensembles de principes s'accordent](/bok/ai-defined#where-the-sets-agree).

## Principes de l'OCDE sur l'IA

La Recommandation de l'OCDE sur l'IA (instrument juridique `OECD/LEGAL/0449`) a été la première
norme intergouvernementale sur l'IA. Elle contient cinq principes fondés sur les valeurs pour les
acteurs de l'IA, cinq recommandations aux gouvernements, et des définitions du système d'IA, du
cycle de vie du système d'IA et des acteurs de l'IA [7]. La révision de 2024 a ajouté une attention
explicite à la désinformation et à l'intégrité de l'information, aux utilisations en dehors de la
finalité prévue, à l'arrêt sûr et à la mise hors service, et à la durabilité environnementale, et a
placé la traçabilité et la gestion des risques sous le principe de responsabilité [7]. Au
2026-09-24, OECD.AI répertorie 47 adhérents, dont les 38 membres de l'OCDE, l'Union européenne et
huit non-membres [3].

### Les cinq principes et cinq recommandations

Les principes s'adressent aux acteurs de l'IA ; les recommandations s'adressent aux gouvernements.
Seuls les cinq premiers deviennent directement un travail d'ingénierie. Le tableau lit chaque
principe comme une question à laquelle le stack doit répondre.

| Principe | Ce qu'il demande aux acteurs de l'IA (paraphrasé) | Artefact d'ingénierie | Couche |
|---|---|---|---|
| `1.1` Croissance inclusive, développement durable et bien-être | Poursuivre des résultats bénéfiques pour les personnes et la planète | Déclaration d'utilisation prévue et de bénéfice dans le dossier d'admission ; préjudices nommés par système | 2 |
| `1.2` État de droit, droits de l'homme et valeurs démocratiques, y compris l'équité et la vie privée | Respecter les droits tout au long du cycle de vie ; agentivité humaine et contrôle ; se prémunir contre les abus | Évaluation d'impact liée au registre ; évaluations d'équité et de confidentialité ; point de contrôle de supervision | 2 · 3 · 4 |
| `1.3` Transparence et explicabilité | Information significative et appropriée au contexte sur le système et ses résultats | Fiche de modèle et fiche de données ; divulgation d'interaction ; artefacts d'explication | 2 |
| `1.4` Robustesse, sécurité et innocuité | Fonctionnement en utilisation normale, abus raisonnablement prévisibles et conditions adverses ; arrêt, réparation ou mise hors service sûrs | Évaluations adversariales et de robustesse ; kill switch ; provenance du contenu | 3 · 4 |
| `1.5` Responsabilité | Traçabilité des ensembles de données, des processus et des décisions ; gestion systématique des risques par phase du cycle de vie | Magasin de preuves indexé par les identifiants du registre ; registre des risques en tant que code ; registres des fournisseurs | 1 · 5 |

Les cinq recommandations (recherche et développement ; un écosystème inclusif favorable à l'IA ; un
environnement de gouvernance et de politique interopérable ; capacités humaines et transformation du
marché du travail ; coopération internationale) s'adressent aux adhérents, non aux propriétaires de
systèmes. L'appel de la Recommandation 2.5 à des « normes techniques mondiales consensuelles et
multipartites » est la racine politique du travail de normalisation plus loin dans ce chapitre [7].

Le Principe 1.4(b) est la phrase la plus directement opérationnelle de l'instrument : les mécanismes
devraient permettre aux systèmes d'IA qui risquent de causer un préjudice indu d'être « arrêtés,
réparés et/ou mis hors service de manière sûre » [7]. En termes de stack, c'est le motif
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) avec un chemin de
révocation testé, et un enregistrement de mise hors service dans le registre. La traçabilité du
Principe 1.5(b) « en relation avec les ensembles de données, les processus et les décisions » est ce
que [**Continuous Assurance Telemetry**](/patterns/continuous-assurance-telemetry) produit quand
chaque enregistrement de preuve porte l'identifiant du registre du système qu'il décrit.

### La définition et le cycle de vie du système d'IA de l'OCDE

La définition de 2023 se lit comme suit : un système basé sur la machine qui, pour des objectifs
explicites ou implicites, déduit, à partir de l'entrée qu'il reçoit, comment générer des résultats
tels que des prédictions, du contenu, des recommandations ou des décisions qui peuvent influencer
des environnements physiques ou virtuels ; les systèmes varient en autonomie et en adaptabilité
après déploiement [7]. OECD.AI note que l'Union européenne, le Conseil de l'Europe, les États-Unis
et les Nations unies utilisent cette définition et ce cycle de vie dans leurs propres cadres [3].

Le cycle de vie compte sept phases : planifier et concevoir ; collecter et traiter les données ;
construire ou adapter les modèles ; tester, évaluer, vérifier et valider ; mettre à disposition ou
déployer ; exploiter et surveiller ; retirer ou mettre hors service. Les phases sont itératives et
pas nécessairement séquentielles, et la retraite peut se produire à tout moment pendant
l'exploitation [7]. Cette dernière clause est facile à manquer et utile à encoder : le registre a
besoin d'un état `retired` accessible depuis {`operating`}, avec ses propres preuves (qui l'a
retiré, pourquoi, quelles données ont été supprimées), pas seulement un chemin de `built` à
`deployed`.

| Phase du cycle de vie de l'OCDE | Où elle se situe dans le pipeline | Preuve qu'elle devrait laisser |
|---|---|---|
| Planifier et concevoir | Admission et classification | Dossier d'admission ; niveau de risque ; finalité prévue |
| Collecter et traiter les données | Pipeline de données | Fiche de données ; lignage ; note de base juridique |
| Construire ou adapter les modèles | Travaux d'entraînement et d'ajustement fin | AIBOM ; métadonnées de série d'entraînement |
| Tester, évaluer, vérifier, valider | CI eval gate | Résultat d'évaluation par rapport au seuil |
| Mettre à disposition ou déployer | Admission et libération | Verdict politique ; entrée du registre |
| Exploiter et surveiller | Runtime | Décisions de guardrail ; traces ; alertes de dérive |
| Retirer ou mettre hors service | Changement d'état du registre | Enregistrement de retraite ; identifiants révoqués |

### Le Cadre de classification des systèmes d'IA

Le cadre de classification de l'OCDE évalue un système d'IA d'une perspective politique selon cinq
dimensions : **Personnes et Planète**, **Contexte économique**, **Données et Entrée**,
**Modèle d'IA** et **Tâche et Résultat**, chacune avec ses propres propriétés et attributs [8]. Le
NIST AI RMF reproduit une version modifiée de la même image, avec Contexte d'application à la place
du Contexte économique et test, évaluation, vérification et validation (TEVV) tracés à travers le
cycle de vie [9].

Pour un ingénieur, le cadre est un schéma, pas un document. Chaque dimension devient un groupe de
champs du registre qui rend un système comparable aux autres et dit au reste du stack ce qu'il faut
tester.

> **Exemple (illustratif)** Une entrée du registre étendue avec les cinq dimensions. Les champs sont
> du choix de l'équipe ; le regroupement est celui de l'OCDE.
>
> ```yaml
> id: credit-limit-assist
> oecd_classification:
>   people_and_planet: { affected: [applicants], rights_impact: high, opt_out: false }
>   economic_context: { sector: consumer-credit, criticality: high, deployment: customer-facing }
>   data_and_input: { provenance: [bureau-feed, application-form], personal_data: true }
>   ai_model: { type: gradient-boosted-trees, adaptive_after_deployment: false }
>   task_and_output: { task: recommendation, autonomy: human-reviewed, output: limit-band }
> ```
>
> Une politique de la couche 01 lit `rights_impact: high` et exige une porte d'évaluation d'équité ;
> la porte d'évaluation de la couche 03 lit `personal_data: true` et ajoute une suite de fuite. La
> classification cesse d'être une description et commence à router les contrôles.

### L'observatoire OECD.AI

Trois ressources OECD.AI valent la peine d'être intégrées. Le
**Catalogue des outils et métriques pour l'IA digne de confiance** est un endroit pour trouver des
méthodes d'évaluation et des métriques, pas une liste d'approbation [15]. Le
**Moniteur des incidents et des risques de l'IA** [3] est une entrée de la couche 03 : une
défaillance signalée dans un système comparable est un cas d'évaluation candidat (voir
[chapitre 17](/bok/incidents#learning-from-public-incident-databases)). Le
**Cadre de rapport sur l'IA de Hiroshima** est l'endroit où les développeurs de systèmes d'IA
avancés déposent des rapports de gestion des risques [3] (voir la section G7).

> **En pratique (illustratif)**
> Une équipe de gouvernance dans un grand assureur a ajouté les cinq dimensions de l'OCDE à son
> schéma de registre comme champs obligatoires. La première réconciliation a trouvé plusieurs
> systèmes dont `task_and_output.autonomy` disait « examiné par un humain » tandis que les traces
> d'exécution montraient aucune action d'examinateur sur la plupart des décisions. Le champ n'a pas
> créé l'écart ; il l'a rendu interrogeable. La correction était un point de contrôle de supervision
> avec des approbations enregistrées, et le champ du registre est devenu une affirmation que les
> traces pouvaient réfuter.

## Recommandation de l'UNESCO sur l'éthique de l'IA

Les 193 États membres de l'UNESCO ont adopté la Recommandation sur l'éthique de l'intelligence
artificielle en novembre 2021, la première norme mondiale sur l'éthique de l'IA [4]. Elle repose sur
quatre valeurs fondamentales (droits de l'homme et dignité ; sociétés justes, pacifiques et
interconnectées ; diversité et inclusivité ; l'épanouissement de l'environnement et des écosystèmes)
et dix principes fondamentaux : proportionnalité et ne pas nuire ; sécurité et innocuité ; vie
privée et protection des données ; gouvernance multipartite et adaptative ; responsabilité et
imputabilité ; transparence et explicabilité ; supervision et détermination humaines ; durabilité ;
sensibilisation et maîtrise ; équité et non-discrimination [4]. Les domaines d'action politique
transforment ensuite les valeurs en programmes gouvernementaux.

La Recommandation s'adresse aux États, donc son poids opérationnel pour une organisation provient de
deux outils. La **Méthodologie d'évaluation de la préparation** (RAM) évalue le degré de préparation
d'un pays à gouverner l'IA de manière responsable [16] ; c'est un contexte utile lors du déploiement
dans une juridiction qui en a exécuté une. L'**Évaluation d'impact éthique** (EIA) est au niveau du
système : elle aide à évaluer les implications éthiques d'un système d'IA individuel avant et
pendant l'utilisation, et est conçue pour les gouvernements qui achètent ou déploient l'IA, les
entreprises qui la développent et les chercheurs qui l'évaluent [17].

Dans la stack, une EIA est une évaluation d'impact supplémentaire : attachée à l'entrée du registre,
versionnée et réexécutée en cas de modification, en suivant
[**FRIA-as-Code**](/patterns/fria-as-code). Un acheteur public qui en exige une de la part de ses
fournisseurs en fait un artefact d'approvisionnement pour la
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate). «
Proportionnalité et ne pas nuire » réénonce le principe maison
[partir d'un mode de défaillance nommé ou d'un préjudice nommé](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
[4].

## Convention-cadre du Conseil de l'Europe (STCE n° 225)

La Convention-cadre sur l'intelligence artificielle et les droits de l'homme, la démocratie et
l'État de droit est le premier traité international juridiquement contraignant sur l'IA. Elle a été
adoptée à Strasbourg le 17 mai 2024 et ouverte à la signature à Vilnius le 5 septembre 2024 [11].
Elle est technologiquement neutre et lie les Parties, non les entreprises [5][1].

### Champ d'application et statut

L'article 3 définit le champ d'application. Les Parties doivent appliquer la Convention aux
activités du cycle de vie des systèmes d'IA entreprises par les autorités publiques ou par des
acteurs privés agissant en leur nom. Pour les autres acteurs privés, chaque Partie doit traiter les
risques et les impacts d'une manière compatible avec l'objet et le but de la Convention, et doit
déclarer comment elle le fera. La sécurité nationale, la défense nationale et la recherche pas
encore mise à disposition pour utilisation sont exclues, sous conditions [1].

La Convention entre en vigueur le premier jour du mois suivant trois mois après que cinq
signataires, dont au moins trois États membres du Conseil de l'Europe, l'aient ratifiée (article
30(3)) [1]. **Statut au 2026-09-24 :** la page propre du Conseil de l'Europe énumère l'Union
européenne comme seule Partie et 20 autres signataires, parmi lesquels le Royaume-Uni, la Norvège,
la Suisse, l'Ukraine, le Canada, Israël, le Japon, les États-Unis et l'Uruguay [5]. La Convention
n'est donc pas encore en vigueur. Le Parlement européen a donné son consentement à la conclusion par
l'UE le 11 mars 2026 [18], et l'UE a ratifié le 15 mai 2026 lors de la 135e session du Comité des
ministres à Chișinău [13]. La Décision du Conseil concluant la Convention pour l'Union, Décision
(UE) 2026/1080 du 21 avril 2026 (JO L, 13.5.2026), énonce que la Convention est mise en œuvre dans
l'Union exclusivement par le règlement sur l'IA et l'acquis de l'Union pertinent, et porte la
déclaration de l'UE au titre de l'article 3(1)(b) selon laquelle elle appliquera les chapitres II à
VI de la Convention aux acteurs privés par le biais du règlement sur l'IA [19].

Au sein de l'UE, le traité est donc mis en œuvre par le règlement sur l'IA plutôt que par un
ensemble distinct d'obligations du secteur privé. En dehors de l'UE, une fois la Convention en
vigueur, les mesures de mise en œuvre de chaque Partie sont ce qui lie ; suivez-les par juridiction
dans le [chapitre 21](/bok/ai-laws-worldwide#comparing-the-regimes).

### Ce que la Convention demande, et ce qu'elle change dans la stack

Le chapitre III énonce des principes que les Parties mettent en œuvre : dignité humaine et autonomie
individuelle ; transparence et contrôle ; responsabilité ; égalité et non-discrimination ; vie
privée et protection des données personnelles ; fiabilité ; innovation sûre, y compris les
environnements de test contrôlés (articles 7–13) [1]. Les chapitres IV et V sont là où se trouve
l'ingénierie.

| Article | Obligation des Parties (paraphrasée) | Artefact d'ingénierie | Couche |
|---|---|---|---|
| `Art. 14(2)(a)–(b)` | Documenter les informations pertinentes sur les systèmes susceptibles d'affecter significativement les droits de l'homme, suffisamment pour que les personnes concernées puissent contester les décisions | Enregistrement des décisions par résultat conséquent ; [chemin de contestation](/patterns/decision-notice-contest-path) avec l'enregistrement joint | 2 · 5 |
| `Art. 14(2)(c)` | Une possibilité effective de se plaindre auprès des autorités compétentes | Prise en charge des plaintes liée à l'identifiant du registre | 5 |
| `Art. 15(2)` | Notifier les personnes qu'elles interagissent avec un système d'IA, selon le cas | Divulgation d'interaction appliquée à l'exécution | 4 |
| `Art. 16(1)–(2)(a)–(f)` | Gestion itérative et graduée des risques et des impacts : contexte, gravité et probabilité, points de vue des parties prenantes, suivi, documentation | Registre des risques en tant que code ; évaluation d'impact liée au registre ; suivi par rapport à la ligne de base | 1 · 2 · 4 |
| `Art. 16(2)(g)` | Tester les systèmes avant la première utilisation et en cas de modification significative, le cas échéant | Eval gate à la mise en service et en cas de modification substantielle | 3 |
| `Art. 16(4)` | Évaluer la nécessité d'un moratoire, d'une interdiction ou d'autres mesures pour les utilisations incompatibles | Liste de blocage de politique en tant que code des utilisations interdites | 1 |

L'article 16(2)(g) mérite l'accent. « Lorsqu'ils sont significativement modifiés » est un
déclencheur, pas une date, et un déclencheur est quelque chose qu'un pipeline peut évaluer : un diff
du registre qui change le modèle, les données d'entraînement ou la finalité prévue réexécute la
porte. C'est le motif [**Eval Gate in CI**](/patterns/eval-gate-in-ci) avec la règle de changement
matériel écrite, et il répond à la même question que le règlement sur l'IA pose sur la modification
substantielle (voir
[chapitre 18](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)).

Le Conseil de l'Europe a également publié **HUDERIA**, une méthodologie non contraignante pour
l'évaluation des risques et des impacts des systèmes d'IA du point de vue des droits de l'homme, de
la démocratie et de l'État de droit. Elle comporte deux parties : la Méthodologie HUDERIA, approuvée
par le Comité des ministres le 26 février 2025, et le Modèle HUDERIA : Analyse des risques basée sur
le contexte (COBRA), approuvé le 25 février 2026, qui structure la collecte d'informations sur le
contexte, la conception et le déploiement d'un système [20]. Les Parties peuvent utiliser ou adapter
l'une ou l'autre. Pour une équipe qui exécute déjà FRIA-as-Code, les questions de contexte de COBRA
sont une liste de champs à réconcilier avec le registre, non un second processus.

**Correspondances :** STCE n° 225 art. 14–16 · Règlement sur l'IA de l'UE art. 9, 27, 50 (via le
choix de mise en œuvre de l'UE) · couches 1–5. Les correspondances sont illustratives, non une
affirmation de conformité.

## Processus de Hiroshima du G7

Les dirigeants du G7 ont convenu de deux textes le 30 octobre 2023 : les Principes directeurs
internationaux pour les organisations développant des systèmes d'IA avancés et le Code de conduite
international qui en découle. Le Code est volontaire, adressé aux organisations développant les
systèmes d'IA les plus avancés (y compris les modèles de base et l'IA générative), décrit comme un
document vivant non exhaustif qui s'appuie sur les Principes de l'OCDE sur l'IA, et à suivre
conformément à une approche basée sur les risques [10]. Ses 11 actions correspondent à la stack avec
peu de traduction :

| Action | Demande (paraphrasée) | Artefact d'ingénierie | Couche |
|---|---|---|---|
| 1 | Identifier, évaluer et atténuer les risques tout au long du cycle de vie, y compris les tests avant le déploiement | Suite d'équipes adversaires de test en conditions réelles ; eval gate | 3 |
| 2 | Identifier et atténuer les vulnérabilités, les incidents et les abus après le déploiement | Suivi à l'exécution ; pipeline d'incidents | 4 · 5 |
| 3 | Signaler publiquement les capacités, les limitations et les utilisations appropriées et inappropriées | Fiche de modèle publiée à partir du registre | 2 |
| 4 | Partager les informations et signaler les incidents de manière responsable avec l'industrie, les gouvernements, la société civile, le monde universitaire | Pipeline d'incidents avec une branche de partage externe | 5 |
| 5 | Développer, mettre en œuvre et divulguer les politiques de gouvernance et de gestion des risques de l'IA | Bibliothèque de politique en tant que code avec un résumé publié | 1 |
| 6 | Investir dans les contrôles de sécurité, y compris les protections physiques, cybernétiques et contre les menaces internes | Contrôles de sécurité sur les poids et les pipelines | 4 |
| 7 | Déployer des mécanismes d'authentification du contenu et de traçabilité d'origine où possible | Marquage de traçabilité d'origine à la sortie ; test de vérification | 4 |
| 8 | Prioriser la recherche sur les risques sociétaux, de sécurité et de sûreté | (Au niveau du programme ; pas d'artefact direct) | – |
| 9 | Prioriser les systèmes qui répondent aux défis mondiaux | (Au niveau du programme ; pas d'artefact direct) | – |
| 10 | Promouvoir et adopter les normes techniques internationales | Suivi des normes ; maintenance de la correspondance | 1 |
| 11 | Mettre en œuvre des mesures d'entrée de données et protéger les données personnelles et la propriété intellectuelle | Fiche de données ; licence et provenance dans l'AIBOM | 2 |

Le 7 février 2025, l'OCDE a lancé un cadre permettant aux entreprises de rendre compte de manière
comparable de la façon dont elles appliquent le Code (évaluation des risques, signalement des
incidents, partage d'informations). Les premiers rapports étaient dus le 15 avril 2025, avec des
soumissions continues et des mises à jour annuelles par la suite [12]. Un rapport est une
divulgation, non un audit ; généré à partir du registre et du magasin de preuves, il reste vrai,
écrit à la main, il dérive. Pour les développeurs de modèles d'IA à usage général placés sur le
marché de l'UE, l'équivalent contraignant est le régime GPAI du règlement sur l'IA et son Code de
conduite volontaire, indexé dans le [chapitre 08](/bok/regulatory-map#gpai-code-of-practice).

## Lignes directrices du HLEG de l'UE et ALTAI

Le Groupe d'experts de haut niveau indépendant de la Commission sur l'IA a présenté ses Lignes
directrices en matière d'éthique pour une IA digne de confiance le 8 avril 2019. Une IA digne de
confiance, dans les Lignes directrices, est légale, éthique et robuste, et sept exigences clés la
rendent concrète : agentivité humaine et contrôle ; robustesse technique et sécurité ; vie privée et
gouvernance des données ; transparence ; diversité, non-discrimination et équité ; bien-être
sociétal et environnemental ; responsabilité [6]. Les Lignes directrices nomment trois approches de
contrôle (human-in-the-loop, human-on-the-loop et human-in-command), qui reste le vocabulaire le
plus compact pour la conception du contrôle [6]; le motif
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) choisit parmi eux par conséquence.

La **Liste d'évaluation pour une IA digne de confiance** (ALTAI) a suivi le 17 juillet 2020, révisée
après un essai avec plus de 350 parties prenantes et publiée à la fois comme document et comme outil
d'auto-évaluation basé sur le web [21]. Le considérant 27 du règlement sur l'IA rappelle les sept
principes comme des orientations non contraignantes qui contribuent à une IA digne de confiance et
centrée sur l'humain, sans préjudice des exigences contraignantes du règlement [14].

La leçon durable d'ALTAI est un avertissement. Un questionnaire d'auto-évaluation répondu une fois
est une attestation, et la troisième valeur du livre dit que les preuves proviennent de l'exécution,
non d'une attestation ponctuelle
([valeur 3](/bok/values-and-principles#3-evidence-comes-from-runtime-not-from-a-point-in-time-attestation).
Le mouvement utile est de traiter chaque question comme un contrôle candidat. Les Lignes directrices
demandent des « mesures de sauvegarde qui permettent un plan de secours en cas de problème » [6]; en
tant que contrôle, cela devient « y a-t-il un kill switch testé, et quand le dernier test a-t-il
réussi ? ». Une question qui ne peut pas devenir une vérification avec un enregistrement de preuves
va au conseil d'examen, et la liste vaut toujours la peine d'être conservée pour cela.

## NIST AI RMF 1.0 en détail

Le Cadre de gestion des risques de l'IA du NIST 1.0 (NIST AI 100-1, 26 janvier 2023) se décrit comme
volontaire, préservant les droits, non spécifique à un secteur et agnostique quant aux cas d'usage
[9]. Le chapitre 08 mappe ses quatre fonctions aux artefacts
([chapitre 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf)) ; cette section descend d'un niveau, à
ce qu'un ingénieur doit savoir pour utiliser ses identifiants comme métadonnées de contrôle.

### Préjudice, risque et tolérance

La partie 1 encadre le risque comme une fonction de l'ampleur du préjudice et de sa probabilité, et
regroupe les préjudices potentiels en préjudice aux personnes, préjudice à une organisation et
préjudice à un écosystème [9]. Deux choix de cadrage importent pour l'ingénierie. Le RMF peut aider
à prioriser le risque mais « ne prescrit pas la tolérance au risque » : le seuil est à fixer par
l'organisation, influencé par la loi, la politique et les normes [9]. Et il traite la mesure comme
difficile : les risques qui ne seront pas ou ne peuvent pas être mesurés doivent quand même être
documentés (MEASURE 1.1). Les deux poussent de la même manière que le principe maison
[donner à chaque contrôle des dents](/bok/values-and-principles#give-every-control-teeth) : un seuil
doit être choisi, écrit avec sa justification et appliqué, car le cadre ne le choisira pas pour
vous.

### Les sept caractéristiques dignes de confiance

Le RMF nomme sept caractéristiques de l'IA digne de confiance et décrit valide et fiable comme la
base des autres, avec responsable et transparent les couvrant tous [9].

| Caractéristique | Preuves qu'elle tient | Couche |
|---|---|---|
| Valide et fiable | Évaluations de capacité et de régression par rapport à un ensemble de référence ; surveillance de la dérive | 3 · 4 |
| Sûr | Évaluations de seuil de sécurité ; kill switch testé ; chemin de remplacement | 3 · 4 |
| Sécurisé et résilient | Adversarial Red-Team Suite ; [modèle de menace](/patterns/ai-threat-model) ; détection à l'exécution | 3 · 4 |
| Responsable et transparent | Propriété du registre ; model card ; preuves indexées par identifiants de registre | 2 · 5 |
| Explicable et interprétable | [Artefacts d'explication](/patterns/explanation-artefact) et codes de raison, testés pour la fidélité ([chapitre 16](/bok/fairness-and-explainability#testing-explanation-quality)) | 2 · 3 |
| Amélioré pour la confidentialité | Évaluations de fuite et de mémorisation ; AIPD liée au registre ([chapitre 19](/bok/privacy-and-ai#does-a-model-contain-personal-data)) | 2 · 3 |
| Équitable avec biais nuisible géré | [Évaluations d'équité](/patterns/fairness-eval-suite) avec seuils tracés vers les préjudices nommés | 3 |

### Le cœur : 19 catégories

Le cœur a quatre fonctions, 19 catégories et, selon notre décompte des tableaux publiés, 72
sous-catégories [9]. GOVERN est transversal ; MAP, MEASURE et MANAGE s'exécutent par système. Le
tableau paraphrase chaque catégorie en une ligne et nomme l'artefact qui l'atteste.

| Catégorie | En une ligne (paraphrasé) | Artefact | Couche |
|---|---|---|---|
| GOVERN 1 | Les politiques et processus pour le risque d'IA existent, sont transparents et fonctionnent ; inclut l'inventaire (1.6) et la mise hors service (1.7) | Bibliothèque politique en tant que code ; registre alimenté par les déploiements | 1 · 2 |
| GOVERN 2 | Structures de responsabilité : personnes habilitées, responsables et formées | Champ propriétaire par entrée de registre ; RACI | 1 · 2 |
| GOVERN 3 | Les équipes diverses et les rôles humain-IA définis éclairent le travail de risque | Roster d'examinateurs ; définitions des rôles de surveillance | 1 |
| GOVERN 4 | Une culture qui considère et communique le risque ; test, identification d'incident et partage (4.3) | Pipeline d'incident ; propriété de l'évaluation | 3 · 5 |
| GOVERN 5 | Engagement avec les acteurs de l'IA pertinents, y compris les commentaires de l'extérieur de l'équipe | Canal de rétroaction et de contestation lié au registre | 4 · 5 |
| GOVERN 6 | Les risques de logiciels tiers, de données et de chaîne d'approvisionnement sont traités | Porte de diligence raisonnable du fournisseur ; AIBOM | 1 · 2 |
| MAP 1 | Contexte établi : objectifs, utilisateurs, lois, normes, paramètres | Enregistrement d'admission | 2 |
| MAP 2 | Le système est catégorisé : tâches, méthodes, limites de connaissance | Champs de classification (les dimensions de l'OCDE s'inscrivent ici) | 2 |
| MAP 3 | Les capacités, l'utilisation, les avantages et les coûts sont compris ; les processus de surveillance sont définis (3.5) | Déclaration d'utilisation prévue ; conception de la surveillance | 2 · 4 |
| MAP 4 | Les risques et avantages sont cartographiés pour chaque composant, y compris les tiers | Carte des risques des composants à partir de l'AIBOM | 2 |
| MAP 5 | Les impacts sur les individus, les groupes, les communautés, les organisations et la société sont caractérisés | Évaluation d'impact (FRIA, ISO/IEC 42005) | 1 · 2 |
| MEASURE 1 | Les méthodes et les métriques sont choisies, en commençant par les risques les plus importants | Plan d'évaluation avec seuils et justification | 3 |
| MEASURE 2 | Les systèmes sont évalués par rapport aux caractéristiques dignes de confiance | Suites d'évaluation ; résultats du red-team | 3 |
| MEASURE 3 | Les risques sont suivis au fil du temps, y compris les risques émergents en déploiement | Les métriques d'exécution sont comparées à la ligne de base d'évaluation | 4 |
| MEASURE 4 | Les commentaires sur le fonctionnement de la mesure sont recueillis et évalués | Examen de la couverture d'évaluation ; analyse des incidents manqués | 3 · 5 |
| MANAGE 1 | Les risques sont priorisés et traités ; une décision de déploiement oui ou non | Décisions du registre des risques ; porte de libération | 1 · 5 |
| MANAGE 2 | Stratégies de maximisation des avantages et de minimisation des préjudices ; remplacer, désengager ou désactiver (2.4) | Guardrail d'exécution ; kill switch | 4 |
| MANAGE 3 | Les risques et avantages des tiers sont gérés ; les modèles pré-entraînés sont surveillés | Surveillance des fournisseurs ; vérifications de la provenance du modèle | 2 · 4 |
| MANAGE 4 | Les traitements, la réponse, la récupération et la communication sont documentés et surveillés ; les incidents sont communiqués (4.3) | Pipeline d'incident ; plan de surveillance post-déploiement | 4 · 5 |

Les identifiants sont la partie utile. Un contrôle qui porte
`nist_ai_rmf: [MEASURE 2.7, MANAGE 2.4]` dans ses métadonnées peut être compté, croisé et interrogé
; un contrôle décrit en prose ne peut pas. Le modèle
[**Framework Crosswalk**](/patterns/framework-crosswalk) génère la vue RMF à partir de ces
métadonnées au lieu de la maintenir à côté du code.

### Comment une entrée de Playbook est structurée

Le Playbook AI RMF est le compagnon qui transforme chaque sous-catégorie en pratique suggérée.
Chaque entrée a les mêmes cinq parties : **À propos** (ce que la sous-catégorie signifie),
**Actions suggérées**, **Transparence et documentation** (encadrée comme « Les organisations peuvent
documenter ce qui suit », une liste de questions), **Ressources de transparence de l'IA** et
**Références** [22]. NIST décrit le Playbook comme du matériel volontaire que les utilisateurs
adaptent, pas une liste de contrôle à compléter [9].

Lue en tant qu'ingénieur, les questions « Transparence et documentation » sont des critères
d'acceptation. Chaque question nomme soit un artefact que la stack émet déjà (puis le lier), soit
expose une lacune (puis le construire ou enregistrer pourquoi pas).

> **Exemple (illustratif)** Une sous-catégorie, transformée en porte et en enregistrement de preuve.
>
> ```yaml
> control: kill-switch-tested
> nist_ai_rmf: [MANAGE 2.4]          # supersede, disengage or deactivate
> playbook_question: "Who can deactivate the system, and how is that tested?"
> check: last_kill_switch_test.passed == true and age_days <= 30
> enforce: deploy-admission          # block release if stale
> evidence: kill-switch-test-result  # filed against the registry id
> ```
>
> Le Playbook a fourni la question ; le pipeline fournit la réponse à chaque libération.

### Profils et le profil d'IA générative

Un profil applique le cœur à un contexte. Le RMF décrit trois types : **profils de cas d'usage**
pour un paramètre particulier, **profils temporels** (un profil actuel de la façon dont l'IA est
gérée aujourd'hui et un profil cible de l'endroit où l'organisation veut être, dont la comparaison
révèle les lacunes) et **profils intersectoriels** pour les risques communs à travers les
utilisations, comme l'utilisation de grands modèles de langage, de services basés sur le cloud ou
d'acquisition [9]. Généré à partir des métadonnées de contrôle, le profil actuel est la couverture
en direct de chaque sous-catégorie par un contrôle en cours d'exécution, et le profil cible est une
différence examinée.

**NIST AI 600-1**, le profil d'IA générative (26 juillet 2024), est le principal profil
intersectoriel. Il définit 12 risques uniques ou exacerbés par l'IA générative : informations ou
capacités CBRN ; confabulation ; contenu dangereux, violent ou haineux ; confidentialité des données
; impacts environnementaux ; biais nuisible et homogénéisation ; configuration humain-IA ; intégrité
de l'information ; sécurité de l'information ; propriété intellectuelle ; contenu obscène, dégradant
et/ou abusif ; intégration de la chaîne de valeur et des composants [23]. Il énumère ensuite les
actions suggérées indexées par les sous-catégories du RMF avec des identifiants tels que
`GV-1.1-001` ; nous comptons 212 tels identifiants dans le texte publié [23]. Ces identifiants font
de bons noms de test : une suite d'évaluation pour la confabulation qui cite les actions qu'elle
implémente peut être tracée jusqu'au profil sans feuille de calcul. Le 7 avril 2026, NIST a
également annoncé une note conceptuelle pour un profil AI RMF sur l'IA digne de confiance dans les
infrastructures critiques [24].

### Travaux NIST adjacents

Quatre autres publications NIST portent directement sur la stack. Les brouillons plus récents déjà
indexés dans [chapitre 08](/bok/regulatory-map#newer-nist-ai-work) (l'initiative AI Agent Standards,
le profil Cyber AI en brouillon et l'IA 800-1 en brouillon) ne sont pas répétés ici.

- **NIST AI 100-2 E2025** (mars 2025) est une taxonomie et une terminologie de l'apprentissage
  automatique contradictoire : méthodes ML, étapes du cycle de vie de l'attaque, objectifs,
  objectifs, capacités et connaissances de l'attaquant, et atténuations [25]. Utilisez ses termes
  pour nommer les cas dans la
  [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite), afin qu'une conclusion se
  lise de la même manière dans le rapport d'évaluation et dans le modèle de menace.
- **NIST SP 800-218A** (juillet 2024) est un profil communautaire du cadre de développement sécurisé
  des logiciels pour l'IA générative et les modèles fondamentaux à double usage. Il ajoute des
  pratiques et des tâches spécifiques à l'IA à SSDF 1.1 pour les producteurs de modèles d'IA, les
  producteurs de systèmes d'IA qui les utilisent, et les acquéreurs [26]. C'est la moitié du
  pipeline de construction de l'histoire : provenance des poids et des données, intégrité de
  l'environnement d'entraînement.
- **CSF 2.0** (26 février 2024) organise les résultats de cybersécurité en six fonctions : Govern,
  Identify, Protect, Detect, Respond et Recover [27]. Le RMF et CSF 2.0 sont des frères, pas des
  substituts : le RMF couvre le risque d'IA au sens large (équité, confidentialité, explicabilité
  ainsi que sécurité), CSF couvre les résultats de cybersécurité pour tout système, et les deux
  mettent la gouvernance en premier. Le profil Cyber AI en brouillon (NIST IR 8596) est le pont, un
  profil CSF 2.0 pour l'IA [28].
- **COSAiS**, les superpositions de contrôle SP 800-53 pour sécuriser les systèmes d'IA, adapteront
  les contrôles SP 800-53 à cinq cas d'usage : assistants d'IA générative, IA prédictive, systèmes
  monoagent et multiagent, et contrôles pour les développeurs d'IA. À partir de 2026-09-24, la page
  du projet affiche le document conceptuel (14 août 2025) et un plan annoté pour la superposition
  d'IA prédictive (8 janvier 2026), sans aucun brouillon de superposition public pour le moment
  [29]. Pour les organisations qui exécutent déjà SP 800-53, les superpositions seront l'itinéraire
  le plus direct d'une ligne de base de contrôle existante vers l'IA.

### État de la révision

Le RMF lui-même prévoyait un examen formel avec contribution de la communauté au plus tard en 2028,
avec des versions numérotées 1.n pour les révisions mineures et 2.0 pour les révisions majeures [9].
À partir de 2026-09-24, la page du cadre de NIST indique que l'IA RMF 1.0 « est en cours de révision
dans le cadre du plan d'action de la Maison-Blanche sur l'IA » [24] ; nous n'avons trouvé aucune
version révisée publiée, donc 1.0 reste le texte citable (vérifier avant de vous fier au libellé de
la catégorie). Deux conséquences d'ingénierie s'ensuivent. Épinglez la version dans les métadonnées
de contrôle (`nist_ai_rmf@1.0`), afin qu'une révision soit une différence que vous examinez plutôt
qu'un changement silencieux de sens. Et préférez les identifiants de catégorie et de sous-catégorie
à leur prose, car les identifiants ont tendance à mieux survivre aux révisions que le libellé.

NIST héberge également des croisements du RMF vers d'autres cadres, y compris ISO/IEC 42001 et,
datés du 14 août 2025, un croisement ISO/IEC 23894 révisé et un nouveau croisement ISO/IEC 42005
[30]. Ils sont un bon point de départ pour un fichier de croisement, pas un substitut à la
cartographie de vos propres contrôles.

## La famille ISO/IEC

ISO/IEC JTC 1/SC 42 publie les normes internationales d'IA. Elles sont référencées ici par numéro et
titre court uniquement ; les textes sont vendus par ISO et les organismes nationaux et ne sont pas
reproduits. Le chapitre 08 mappe déjà les zones de l'annexe A ISO/IEC 42001 et ISO/IEC 42005, 42006
et 23894 aux artefacts ([chapitre 08, ISO/IEC](/bok/regulatory-map#isoiec-42001-42005-and-42006)).

### Fondations et vocabulaire

| Norme | Titre court | Ce qu'il change dans le stack | Couche |
|---|---|---|---|
| `ISO/IEC 22989:2022` | Concepts et terminologie de l'IA [31] | Vocabulaire contrôlé pour les champs de registre et le texte de politique ; rôles des parties prenantes | 1 · 2 |
| `ISO/IEC 23053:2022` | Cadre pour les systèmes d'IA utilisant l'apprentissage automatique [32] | Décomposition de référence d'un système ML en composants pour l'AIBOM | 2 |
| `ISO/IEC 5338:2023` | Processus du cycle de vie du système d'IA, basés sur ISO/IEC/IEEE 15288 et 12207 [33] | Étapes du cycle de vie auxquelles les portes du pipeline s'attachent | 1 · 3 |
| `ISO/IEC TR 24028:2020` | Aperçu de la fiabilité de l'IA [34] | Taxonomie de fond pour les catalogues de menaces et de modes de défaillance | 1 |

ISO/IEC 22989 établit la terminologie et les concepts de l'IA et est rédigée pour être utilisée par
d'autres normes [31] ; ISO/IEC 5338, par exemple, tire ses processus spécifiques à l'IA de 22989 et
23053 [33]. Un registre dont les noms de champs suivent 22989 nécessite moins de traduction
lorsqu'un auditeur travaille à partir de la famille SC 42. La norme définit également les rôles des
parties prenantes tels que fournisseur d'IA, producteur d'IA, client d'IA, partenaire d'IA et sujet
d'IA (vérifiez la liste des rôles par rapport au texte), qui ne sont pas le fournisseur et le
déployeur du règlement sur l'IA : mappez-les explicitement dans le registre plutôt que de supposer
qu'ils coïncident.

### Risque, qualité et données

| Norme | Titre court | Ce qu'il change dans le stack | Couche |
|---|---|---|---|
| `ISO/IEC 23894:2023` | IA : orientation sur la gestion des risques [35] | Processus de risque organisationnel en matière d'IA ; registre des risques en tant que code | 1 · 3 |
| `ISO/IEC TR 24027:2021` | Biais dans les systèmes d'IA et la prise de décision assistée par l'IA [36] | Sources de biais et mesures à couvrir dans les évaluations d'équité | 3 |
| Série `ISO/IEC 5259` (2024–2025) | Qualité des données pour l'analyse et le ML : aperçu, cadre de processus, cadre de gouvernance et parties connexes [37] | Tests de qualité des données en CI ; champs de fiche de données ; rôles de gouvernance des données | 2 · 3 |
| `ISO/IEC 25059:2023` | Modèle de qualité pour les systèmes d'IA (extension SQuaRE) [38] | Caractéristiques de qualité à spécifier et mesurer ; couverture de la suite d'évaluation | 3 |
| `ISO/IEC 38507:2022` | Implications de gouvernance de l'utilisation de l'IA par les organisations [39] | Droits de décision au niveau du conseil et rapports de surveillance | 1 · 5 |

Deux détails importent pour la planification. ISO/IEC 25059 est marquée « à réviser » sur la page
ISO au 2026-09-24, avec une édition de remplacement déjà au stade FDIS et attendue dans les mois à
venir [38], donc épinglez l'édition à laquelle vous mappez. Et ISO/IEC 38507 est rédigée pour
l'organe de gouvernance et ses conseillers (cadres, auditeurs, décideurs) [39] : c'est la norme qui
dit à un conseil ce qu'il possède, ce qui est l'endroit où le chemin d'escalade dans la couche 05 se
termine.

### Le trio des systèmes de management

**ISO/IEC 42001:2023** spécifie les exigences pour établir, mettre en œuvre, maintenir et améliorer
continuellement un système de management de l'IA [40]. **ISO/IEC 42005:2025** fournit des
orientations pour les évaluations d'impact des systèmes d'IA sur les individus, les groupes et la
société tout au long du cycle de vie [41]. **ISO/IEC 42006:2025** établit des exigences
supplémentaires, en plus d'ISO/IEC 17021-1, pour les organismes qui auditent et certifient les
systèmes de management de l'IA par rapport à 42001 [42] : c'est ainsi que l'émetteur d'un certificat
démontre sa compétence à l'émettre.

42001 suit la structure harmonisée ISO pour les normes de système de management, la disposition
partagée et le texte principal définis dans l'Annexe SL, donc ses articles 4 à 10 (contexte,
leadership, planification, support, opération, évaluation des performances, amélioration) s'alignent
avec toute autre norme de système de management ISO [43]. Comme ISO/IEC 27001, elle associe ces
articles à une annexe de contrôles, et l'organisation justifie les contrôles qu'elle applique dans
une Déclaration d'applicabilité (vérifiez le libellé de l'article). La lecture d'ingénierie de la
SoA : c'est un fichier généré, pas un document. Chaque contrôle de l'Annexe A listé comme applicable
doit pointer vers le contrôle en cours d'exécution et le flux de preuves qui le met en œuvre ;
chaque exclusion doit porter sa justification et un propriétaire.

Ce qu'un certificat 42001 prouve, et ce qu'il ne prouve pas, est énoncé dans
[chapitre 07](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments) et
[chapitre 08](/bok/regulatory-map#what-is-not-harmonised-yet) : il atteste un système de management
; il ne confère aucune présomption de conformité au règlement sur l'IA.

### Intégration avec 27001, 27701 et 9001

ISO a conçu les normes de système de management pour partager une structure afin qu'une organisation
puisse gérer un système de management intégré répondant à plusieurs d'entre elles à la fois [43].
Pour l'IA, cela signifie ISO/IEC 42001 aux côtés d'ISO/IEC 27001:2022 pour la sécurité de
l'information [44], ISO/IEC 27701 pour la confidentialité, dont l'édition 2025 est un système de
management de l'information sur la confidentialité autonome qui peut être utilisé seul ou aligné
avec 27001 [45], et ISO 9001 pour la qualité, dont l'édition 2026 a remplacé l'édition 2015 en
septembre 2026 [46].

| Article partagé (structure harmonisée) | Un artefact servant les quatre | Couche |
|---|---|---|
| 4 Contexte | Une déclaration de portée unique et un registre des parties intéressées, avec les systèmes d'IA comme entrées de registre | 2 |
| 5 Leadership | Un ensemble de politiques en tant que code, avec des sections IA, sécurité, confidentialité et qualité | 1 |
| 6 Planification | Un registre des risques avec des risques typés (IA, sécurité, confidentialité, qualité) et un flux de traitement unique | 1 |
| 7 Support | Un registre unique de compétence et de formation ; un magasin d'informations documentées | 5 |
| 8 Opération | Les portes du pipeline sont étiquetées avec les normes que chacune sert | 1 · 3 · 4 |
| 9 Évaluation des performances | Un magasin de preuves unique répondant à l'audit interne pour les quatre | 5 |
| 10 Amélioration | Une file d'attente unique de non-conformité et d'action corrective alimentée par les incidents | 5 |

> **En pratique (illustratif)**
> Une équipe qui avait déjà ISO/IEC 27001 a ajouté 42001 en étendant, non en dupliquant. Le registre
> des risques a gagné un type de risque `ai` et un lien vers l'id du registre ; le programme d'audit
> interne a gagné des contrôles d'IA ; la Déclaration d'applicabilité pour 42001 a été générée à
> partir des mêmes métadonnées de contrôle que celle de 27001. L'audit de certification a trouvé les
> preuves où les auditeurs de 27001 les avaient toujours trouvées. Le seul nouvel artefact était
> l'évaluation d'impact, construite selon 42005 et attachée à chaque entrée de registre à haut
> risque.

## Normes harmonisées en vertu du règlement sur l'IA

*Dernière révision 2026-09-24. Les étapes changent mensuellement ; revérifiez avant de vous fier à
une ligne.*

### Comment fonctionne la présomption de conformité

L'article 40 du règlement sur l'IA présume que les systèmes à haut risque (et les modèles d'IA à
usage général) sont conformes aux exigences correspondantes lorsqu'ils sont conformes aux normes
harmonisées dont les références ont été publiées au Journal officiel, dans la mesure où les normes
couvrent ces exigences [2]. Deux conditions conditionnent la présomption : une norme européenne
adoptée à la demande de la Commission, et sa référence citée au JO après que la Commission l'ait
évaluée. La publication par CEN-CENELEC seule ne suffit pas. Lorsque les normes n'arrivent pas, ne
sont pas acceptées ou ne traitent pas suffisamment les droits fondamentaux, l'article 41 permet à la
Commission d'adopter des **spécifications communes** par acte d'exécution à la place [2].

La Commission a d'abord demandé à CEN et CENELEC des normes d'IA le 22 mai 2023 (`C(2023)3215`,
enregistrée en tant que demande `M/593`) [47][48]. Après que CEN-CENELEC ait signalé des retards
importants, la Commission a abrogé et remplacé cette demande en juin 2025 par `C(2025)3871`, alignée
sur le texte final du règlement sur l'IA [47]. La demande couvre dix sujets : gestion des risques ;
gouvernance et qualité des ensembles de données ; conservation des registres ; transparence ;
contrôle humain ; exactitude ; robustesse ; cybersécurité ; gestion de la qualité ; évaluation de la
conformité [49]. En octobre 2025, CEN et CENELEC ont adopté des mesures exceptionnelles pour
accélérer la livraison, y compris la publication directe après un vote d'enquête positif sans vote
formel séparé, avec les livrables prioritaires ciblés pour le Q4 2026 [48].

Le calendrier interagit avec l'Omnibus numérique, qui a reporté l'application des obligations de
l'Annexe III à haut risque au 2 décembre 2027 et de l'Annexe I au 2 août 2028 [50]. Pour la plupart
des fournisseurs, les normes devraient donc arriver avant l'application des obligations, mais pas
longtemps avant, ce qui laisse peu de marge pour construire un texte final.

### Le programme JTC 21

Le travail se situe dans le comité technique conjoint CEN-CENELEC JTC 21, organisé en groupes de
travail sur les aspects opérationnels, les aspects d'ingénierie, les aspects fondamentaux et
sociétaux, et la cybersécurité [51]. Les étapes ci-dessous proviennent d'un point d'information sur
les normes paneuropéennes géré avec les organismes de normalisation nationaux [52] et sont recoupées
avec un suivi public [53] ; les deux sont secondaires, et le mappage des articles est tel que
rapporté par ces sources.

| Produit | Sujet | Règlement sur l'IA | Étape au 2026-09-24 (rapportée) | Ce qu'il change dans le stack | Couche |
|---|---|---|---|---|---|
| `EN 18286:2026` | Système de management de la qualité aux fins du règlement sur l'IA | `Art. 17` | Publié juillet 2026 [54] ; aucune citation au JO trouvée | Les processus QMS s'exécutent comme des étapes de pipeline ; la conception et le contrôle des modifications laissent des preuves | 1 · 5 |
| `prEN 18228` | Gestion des risques de l'IA | `Art. 9` | Vote d'enquête clôturé le 30 juillet 2026 | Fichier de risque du fournisseur : aléa, estimation, évaluation, contrôle, surveillance ; critères d'acceptabilité en tant que code | 1 · 3 · 5 |
| `prEN 18229-1` | Cadre de fiabilité, Partie 1 : journalisation | `Art. 12` | Vote d'enquête clôturé le 20 août 2026 | Schéma de journal des événements et conservation pour les systèmes à haut risque | 4 · 5 |
| `prEN 18229-2` | Partie 2 : transparence | `Art. 13` | Rédaction (période de commentaires clôturée janvier 2026) | Champs d'instructions d'utilisation et de fiche de modèle | 2 |
| `prEN 18229-3` | Partie 3 : contrôle humain | `Art. 14` | Enquête lancée le 30 juillet 2026 | Conception du point de contrôle de surveillance ; télémétrie de surveillance | 4 |
| `prEN 18229-4`, `-5` | Parties 4 et 5 : exactitude, robustesse | `Art. 15` | Nouveaux projets approuvés le 24 juin 2026 | Seuils d'exactitude et de robustesse dans la porte d'évaluation | 3 |
| `prEN 18282` | Spécifications de cybersécurité pour les systèmes d'IA | `Art. 15` | Vote d'enquête clôturé le 30 juillet 2026 | Modèle de menace ; suite adversariale ; détection à l'exécution | 3 · 4 |
| `prEN 18283` | Gestion des biais dans les systèmes d'IA | `Art. 10` | Approuvé pour enquête le 24 septembre 2026 | Mesures de biais dans les évaluations d'équité ; gestion des données biaisées | 2 · 3 |
| `prEN 18284` | Qualité et gouvernance des ensembles de données | `Art. 10` | Rédaction ; aucune enquête enregistrée (vérifiez) | Fiches de données ; traçabilité ; tests d'acceptation des ensembles de données | 2 · 3 |
| `prEN 18285` | Cadre d'évaluation de la conformité | `Art. 43` | Rédaction ; aucune enquête enregistrée (vérifiez) | Structure du dossier de preuves pour l'évaluation | 5 |
| `prEN 18281`, `prEN ISO/IEC 23282` | Évaluation de l'exactitude pour la vision par ordinateur et pour le traitement du langage naturel | `Art. 15` | 18281 : vote d'enquête clôturé le 11 juin 2026 ; 23282 : enquête à partir du 3 septembre 2026 | Méthodes et métriques d'évaluation spécifiques aux tâches | 3 |

Certaines normes ISO/IEC ont également été adoptées en tant que normes européennes (par exemple
`EN ISO/IEC 23894:2024` [52]). L'adoption en tant que EN ne rend pas une norme harmonisée en vertu
du règlement sur l'IA : seule une norme livrée à la demande de la Commission et citée au JO porte la
présomption. Au 2026-09-24, nous n'avons trouvé aucune décision d'exécution de la Commission citant
une norme harmonisée du règlement sur l'IA, ce qui est cohérent avec le suivi de juin 2026 [53] et
avec [chapitre 08](/bok/regulatory-map#what-is-not-harmonised-yet) (vérifiez sur EUR-Lex avant de
vous y fier).

### Ce que chaque livrable change dans le stack

Les brouillons ne sont pas publics, donc c'est une lecture de leurs portées publiées, pas de leurs
articles. Trois changements se démarquent.

**La gestion des risques passe de l'organisation au produit.** La portée publiée de prEN 18228
s'adresse aux fournisseurs de systèmes d'IA : identifier les aléas, estimer et évaluer les risques,
les contrôler et surveiller les contrôles, pour les risques pour la santé, la sécurité et les droits
fondamentaux, tout au long du cycle de vie. Elle exige que les fournisseurs établissent des critères
objectifs d'acceptabilité des risques mais ne fixe pas les niveaux, et elle n'est pas destinée à
gérer les risques auxquels l'organisation elle-même fait face [52]. C'est un objet différent
d'ISO/IEC 23894, qui guide la gestion des risques organisationnels [35]. Dans le stack, le fichier
de risque devient un artefact par système clé de l'id du registre, avec des critères d'acceptabilité
écrits comme des seuils qu'une porte peut évaluer, et une surveillance qui ferme la boucle dans la
couche 05.

**La journalisation, la supervision et la transparence deviennent spécifiables.** La série prEN
18229 divise les articles 12–15 en parties distinctes [52]. Une fois finalisée, la partie
journalisation est un schéma pour valider les journaux d'événements en CI, la partie supervision une
référence de conception pour la [**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate), et
la partie transparence une liste de champs pour la fiche de modèle et les instructions
d'utilisation.

**Le système de gestion de la qualité devient auditable en tant que pipeline.** EN 18286 soutient le
système de gestion de la qualité de l'article 17 [54]. Un système de gestion de la qualité dont la
maîtrise de la conception, la gestion des modifications et l'acompagnement pós-comercialización
s'exécutent comme des étapes de pipeline produit ses propres preuves ; celui qui vit dans les
procédures ne le fait pas. Le modèle
[**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal) est la façon dont
cette preuve parvient à un évaluateur.

### ### Construire avant la citation au JO

L'écart entre un projet et une norme citée est l'endroit où la plupart des équipes passeront 2026
et 2027. Trois règles maintiennent le travail réutilisable :

1. **Construire selon l'exigence, mapper à la norme.** L'article du Règlement de l'IA est fixe ; la
   numérotation des clauses de la norme ne l'est pas. Contrôles clés sur `Art. 9`, `Art. 12` et
   ainsi de suite, et ajoutez les identifiants de clause de norme comme métadonnées une fois le
   texte finalisé.
2. **Tenez une veille des normes sous forme de données.** Un fichier avec chaque livrable, son
   stade, la date de votre dernier contrôle et les contrôles qui en dépendent. Un changement de
   stade est alors une différence qui nomme les contrôles à réexaminer, pas une surprise.
3. **Ne revendiquez pas la présomption trop tôt.** Jusqu'à ce que la citation au JO existe, la
   conformité avec un projet ou une EN publiée est une preuve en soi, pas une présomption. Dites-le
   dans la documentation technique.

> **En pratique (illustratif)**
> Un fournisseur d'un outil de recrutement à haut risque a construit son dossier de risque selon le
> champ d'application publié de la prEN 18228 alors que le projet était à l'étape d'enquête : aléas,
> estimations, contrôles et surveillance par système, avec des seuils d'acceptabilité sous forme de
> code. Quand EN 18286 a été publiée, l'équipe a comparé sa liste de processus du système de gestion
> de la qualité avec les étapes de pipeline qu'elle exécutait déjà et a trouvé deux lacunes
> (notification de changement de fournisseur et une cadence d'examen après commercialisation). Les
> deux sont devenues des étapes de pipeline avec des propriétaires. Le fichier de veille des normes
> a enregistré la date de chaque contrôle, ce qu'un évaluateur a demandé à voir.

## Série IEEE 7000

La série IEEE 7000 aborde l'éthique comme un processus d'ingénierie des systèmes. Aucune de ces
normes n'est harmonisée en vertu du Règlement de l'IA, et aucune ne confère une présomption ; elles
sont utiles comme références de processus.

| Norme | Sujet | Ce qu'il change dans le stack | Couche |
|---|---|---|---|
| `IEEE 7000-2021` | Processus de modèle pour considérer les valeurs éthiques de l'exploration conceptuelle au développement, avec élicitation des valeurs des parties prenantes et traçabilité [55] | Exigences de valeur tracées aux décisions de conception et aux tests | 1 |
| `IEEE 7001-2021` | Transparence des systèmes autonomes, en niveaux mesurables et testables [56] | Niveaux de transparence écrits comme des exigences testables | 2 · 3 |
| `IEEE 7002-2022` | Processus de confidentialité des données pour les systèmes utilisant des données personnelles [57] | Exigences de confidentialité comme portes du cycle de vie du développement logiciel | 1 · 2 |
| `IEEE 7003-2024` | Considérations relatives aux biais algorithmiques, y compris la sélection des données de validation et les limites d'application [58] | Ensembles de validation des biais ; limites d'application déclarées dans le registre | 2 · 3 |
| `IEEE 7005-2021` | Gouvernance transparente des données des employeurs [59] | Règles de traitement des données des employés utilisées par l'IA | 2 |
| `IEEE 7010-2020` | Pratique recommandée pour évaluer l'impact des systèmes autonomes et intelligents sur le bien-être humain [60] | Indicateurs de bien-être dans l'évaluation d'impact | 2 |

Les « limites d'application pour lesquelles l'algorithme a été conçu » de la norme IEEE 7003 sont
l'idée la plus portable ici : une limite déclarée dans l'entrée du registre est quelque chose qu'un
guardrail d'exécution peut appliquer et qu'une évaluation peut tester [58].

## ## Un contrôle, plusieurs instruments

Les instruments se chevauchent bien plus que leurs vocabulaires différents des auteurs ne le
suggèrent. Le tableau montre, pour sept contrôles que le stack construit déjà, où chaque instrument
les demande. C'est un point de départ pour un fichier de correspondance, pas une affirmation que les
lignes sont équivalentes.

| Contrôle (couche) | OECD | CoE CETS 225 | Code G7 | NIST AI RMF | ISO/IEC | JTC 21 |
|---|---|---|---|---|---|---|
| Évaluation des risques et de l'impact (1 · 2) | `1.5(c)` | `Art. 16` | Action 1 | MAP 5, MANAGE 1 | 23894, 42005 | prEN 18228 |
| Test avant la mise en production et lors des modifications (3) | `1.4(a)` | `Art. 16(2)(g)` | Action 1 | MEASURE 1, 2 | 42001 `A.6` | prEN 18229-4, -5 |
| Traçabilité et journalisation (4 · 5) | `1.5(b)` | `Art. 14(2)(a)` | Action 1 | MEASURE 3, MANAGE 4 | 42001 `A.6` | prEN 18229-1 |
| Transparence et divulgation (2 · 4) | `1.3` | `Art. 8`, `15(2)` | Action 3 | MEASURE 2.8 | 42001 `A.8` | prEN 18229-2 |
| Contrôle humain et dérogation (4) | `1.2(b)`, `1.4(b)` | `Art. 8` | – | MAP 3.5, MANAGE 2.4 | 42001 `A.9` | prEN 18229-3 |
| Gestion des incidents et partage (5) | – | `Art. 16(3)` | Actions 2, 4 | GOVERN 4.3, MANAGE 4.3 | 42001 `10.2` | – |
| Chaîne d'approvisionnement et tiers (2) | `1.5(c)` | – | Action 11 | GOVERN 6, MANAGE 3 | 42001 `A.10` | – |

Sources : [7][1][10][9][40][52] ; les identifiants de clause ISO/IEC 42001 et d'annexe A suivent le
[chapitre 08](/bok/regulatory-map#isoiec-42001-42005-and-42006) et la
[correspondance](/resources/crosswalk) du site, dont l'[explorateur](/resources/crosswalk#explore)
dérive ces paires pour deux instruments quelconques et les exporte sous forme de collection de
mappage OSCAL. Les mappages sont illustratifs, pas une affirmation de conformité.

La règle d'ingénierie est celle du flux de travail de
[traduction réglementaire](/bok/the-role#regulatory-translation) : construire chaque contrôle une
fois, l'étiqueter avec chaque instrument qu'il sert, et générer la vue de chaque instrument à partir
des étiquettes. Un principe, un article de traité, une sous-catégorie et une clause harmonisée
deviennent alors quatre requêtes sur les mêmes preuves, et ajouter un cinquième instrument est un
changement de métadonnées, pas un nouveau programme.

**Correspondances :** Principes de l'OCDE en matière d'IA `1.1`–`1.5` · CoE CETS n° 225 art. 14–16 ·
Code de conduite du G7 Hiroshima actions 1–7, 10, 11 · Règlement de l'IA de l'UE art. 9–15, 17, 40,
41 · ISO/IEC 22989, 23894, 42001, 42005, 42006 · NIST AI RMF (Govern, Map, Measure, Manage) et AI
600-1 · Livrables du JTC 21 CEN-CENELEC · les cinq couches du stack. Les mappages sont illustratifs,
pas une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Ajoutez les cinq dimensions de classification de l'OCDE à votre schéma de registre** comme
   champs obligatoires, et faites lire une politique à l'une d'elles (par exemple,
   `rights_impact: high` exige une évaluation d'équité).
2. **Étiquetez vos dix contrôles les plus importants avec les identifiants de sous-catégorie du NIST AI RMF et les identifiants de clause ISO/IEC 42001**,
   épinglés à l'édition, et générez un profil actuel à partir des étiquettes.
3. **Commencez un fichier de veille des normes** listant chaque livrable du JTC 21 du tableau
   ci-dessus, son stade, la date de votre contrôle et les contrôles qui en dépendent ; définissez un
   examen mensuel.
4. **Prenez les principes d'IA publiés de votre organisation et nommez, pour chacun, le contrôle et l'enregistrement de preuve qui les mettent en œuvre.**
   Un principe sans contrôle est une lacune ; écrivez-le comme tel.
5. **Si vous détenez ISO/IEC 27001, mappez ses clauses partagées aux clauses 42001** et pointez les
   deux vers un magasin de preuves unique avant d'écrire une nouvelle procédure.

## Sources

[1] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 2 definition; Art. 3 scope and private-actor declaration; Arts. 7–13 principles; Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 40 and 41 (Art. 40: harmonised standards, presumption of conformity once references are published in the OJ; Art. 41: common specifications by implementing act). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_40 (verified: primary)
[3] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; definition and lifecycle used by the EU, the Council of Europe, the US and the UN; AI Incidents and Hazards Monitor; Hiroshima AI Reporting Framework). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[4] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values, ten core principles, policy action areas). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[5] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[6] Ethics Guidelines for Trustworthy AI (lawful, ethical, robust; seven key requirements; human-in-the-loop, human-on-the-loop, human-in-command; "safeguards that enable a fallback plan in case of problems"). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[7] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; G20 AI Principles drawn from it, June 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles, five recommendations; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[8] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (Fig. 1 harms; risk tolerance not prescribed; Fig. 2 lifecycle and dimensions adapted from the OECD; seven trustworthy characteristics; Core of 4 functions and 19 categories, 72 subcategories by our count of Tables 1–4; use-case, temporal and cross-sectoral profiles; formal review no later than 2028). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; living document building on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[11] "Council of Europe adopts first international treaty on artificial intelligence" (adopted in Strasbourg on 17 May 2024; opens for signature in Vilnius on 5 September 2024). Council of Europe. 2024-05-17. https://www.coe.int/en/web/portal/-/council-of-europe-adopts-first-international-treaty-on-artificial-intelligence (verified: primary)
[12] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[13] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), Recitals 12 and 27 and Art. 3(1) (recital 27: the seven AI HLEG principles as non-binding guidance; recital 12: the AI-system notion closely aligned with the work of international organisations; Art. 3(1)). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[15] Catalogue of Tools & Metrics for Trustworthy AI. OECD.AI. 2026. https://oecd.ai/en/catalogue/overview (verified: primary)
[16] Readiness Assessment Methodology (RAM): country-level readiness to govern AI (RAM 2.0). UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/ram (verified: primary)
[17] Ethical Impact Assessment (EIA): system-level assessment before and during use, for governments, companies and researchers. UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/eia (verified: primary)
[18] "EU Parliament backs EU conclusion of the Council of Europe Framework Convention on Artificial Intelligence" (European Parliament approval on 11 March 2026). Council of Europe. 2026-03-11. https://www.coe.int/en/web/artificial-intelligence/-/eu-parliament-backs-eu-conclusion-of-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[19] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors; OJ L 13 May 2026; text read from the Publications Office Cellar, CELEX 32026D1080). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[20] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 February 2025; HUDERIA Model: COBRA approved 25 February 2026; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[21] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list 17 July 2020 after a pilot with over 350 stakeholders; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[22] NIST AI RMF Playbook, GOVERN entries (per subcategory: About; Suggested Actions; Transparency and Documentation; AI Transparency Resources; References). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[23] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV/MP/MS/MG, 212 identifiers by our count). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[24] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; concept note for a critical-infrastructure profile, 7 April 2026). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[25] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[26] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (augments SSDF 1.1). NIST. 2024-07-26. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[27] The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Functions: Govern, Identify, Protect, Detect, Respond, Recover). NIST. 2024-02-26. https://doi.org/10.6028/NIST.CSWP.29 (verified: primary)
[28] NIST IR 8596 (initial preliminary draft): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile; comments closed 30 January 2026). NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[29] SP 800-53 Control Overlays for Securing AI Systems (COSAiS) (five use cases; concept paper 14 August 2025; predictive-AI annotated outline 8 January 2026; page updated 8 January 2026). NIST CSRC. 2026-01-08. https://csrc.nist.gov/projects/cosais (verified: primary)
[30] AI RMF crosswalk documents (AI RMF to ISO/IEC 42001; ISO/IEC 23894 revised crosswalk and ISO/IEC 42005 crosswalk dated 14 August 2025). NIST Trustworthy and Responsible AI Resource Center. 2025. https://airc.nist.gov/airmf-resources/crosswalks/ (verified: primary)
[31] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[32] ISO/IEC 23053:2022, Framework for AI systems using machine learning. ISO/IEC. 2022-06. https://www.iso.org/standard/74438.html (verified: primary)
[33] ISO/IEC 5338:2023, AI system life cycle processes (based on ISO/IEC/IEEE 15288 and 12207, with AI-specific processes from ISO/IEC 22989 and 23053). ISO/IEC. 2023-12. https://www.iso.org/standard/81118.html (verified: primary)
[34] ISO/IEC TR 24028:2020, Overview of trustworthiness in artificial intelligence. ISO/IEC. 2020-05. https://www.iso.org/standard/77608.html (verified: primary)
[35] ISO/IEC 23894:2023, AI: Guidance on risk management (organisational AI risk management). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[36] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making. ISO/IEC. 2021-11. https://www.iso.org/standard/77607.html (verified: primary)
[37] ISO/IEC 5259 series, Data quality for analytics and machine learning (Part 1:2024 overview, terminology and examples; Part 4:2024 process framework; Part 5:2025 governance framework). ISO/IEC. 2024-07. https://www.iso.org/standard/81088.html (verified: primary)
[38] ISO/IEC 25059:2023, SQuaRE: Quality model for AI systems (stage 90.92, to be revised, as of 2026-09-24; replacement at FDIS stage, expected within the coming months). ISO/IEC. 2023-06. https://www.iso.org/standard/80655.html (verified: primary)
[39] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[40] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AIMS). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[41] ISO/IEC 42005:2025, AI system impact assessment (guidance). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[42] ISO/IEC 42006:2025, Requirements for AIMS audit and certification bodies (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[43] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[44] ISO/IEC 27001:2022, Information security management systems. ISO/IEC. 2022-10. https://www.iso.org/standard/82875.html (verified: primary)
[45] ISO/IEC 27701:2025, Privacy information management systems: Requirements and guidance (independent management system standard; aligns with ISO/IEC 27001). ISO/IEC. 2025-10. https://www.iso.org/standard/85819.html (verified: primary)
[46] ISO 9001:2026, Quality management systems: Requirements (replaces ISO 9001:2015). ISO. 2026-09. https://www.iso.org/standard/9001 (verified: primary)
[47] Commission Implementing Decision C(2025)3871 on a standardisation request to CEN and Cenelec in support of Reg. (EU) 2024/1689, repealing Implementing Decision C(2023)3215 of 22 May 2023 (significant delays reported by CEN and Cenelec; request aligned with the final AI Act). European Commission. 2025-06-23. https://ec.europa.eu/transparency/documents-register/detail?ref=C(2025)3871&lang=en (verified: primary)
[48] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; drafting group for delayed drafts; Q4 2026 target; Standardization Request M/593 and Amendment M/613). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[49] AI Act standardisation (ten requested topics; prEN 18286 first to public enquiry on 30 October 2025; page updated 3 August 2026). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[50] "AI Omnibus enters into force" (Reg. (EU) 2026/1744; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[51] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity; prEN 18229 in five parts). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[52] Project stages for JTC 21 deliverables read on 2026-09-24: EN 18286:2026 (60.60, 2026-07-22); prEN 18228 (40.60, vote closed 2026-07-30; published scope); prEN 18229-1 (40.60, 2026-08-20); prEN 18229-2 (20.60, 2026-01-06); prEN 18229-3 (40.20, 2026-07-30); prEN 18229-4 and -5 (10.99, 2026-06-24); prEN 18281 (40.60, 2026-06-11); prEN 18282 (40.60, 2026-07-30); prEN 18283 (30.99, 2026-09-24); prEN 18284 (10.99); prEN 18285 (10.99); prEN ISO/IEC 23282 (40.20, 2026-09-03); EN ISO/IEC 23894:2024 (60.60). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[53] JTC 21 standards tracker (AI Act article per deliverable; no JTC 21 deliverable cited in the OJ as of June 2026). kla.digital. 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[54] "EN 18286 in the spotlight: supporting compliance with the AI Act" (EN 18286:2026, Artificial intelligence: Quality management system for EU AI Act regulatory purposes; supports Art. 17). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[55] IEEE 7000-2021, Standard Model Process for Addressing Ethical Concerns during System Design. IEEE SA. 2021. https://standards.ieee.org/standard/7000-2021.html (verified: primary)
[56] IEEE 7001-2021, Standard for Transparency of Autonomous Systems. IEEE SA. 2021. https://standards.ieee.org/standard/7001-2021.html (verified: primary)
[57] IEEE 7002-2022, Standard for Data Privacy Process. IEEE SA. 2022. https://standards.ieee.org/standard/7002-2022.html (verified: primary)
[58] IEEE 7003-2024, Standard for Algorithmic Bias Considerations (validation-data selection; application boundaries). IEEE SA. 2024. https://standards.ieee.org/standard/7003-2024.html (verified: primary)
[59] IEEE 7005-2021, Standard for Transparent Employer Data Governance. IEEE SA. 2021. https://standards.ieee.org/standard/7005-2021.html (verified: primary)
[60] IEEE 7010-2020, Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being. IEEE SA. 2020. https://standards.ieee.org/standard/7010-2020.html (verified: primary)
