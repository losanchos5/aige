---
lang: fr
source: bok/18-eu-ai-act.md
sourceHash: "27e0f6a82271ee4899688f462429d1cbc2f0599581148abdf4dbc5e2407b5ba6"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 18. Le Règlement de l'IA de l'UE en un passage

> Le Règlement de l'IA de l'UE, tel que modifié par l'Omnibus numérique, lu d'un bout à l'autre : ce
> qu'il couvre, comment il classe les risques, qui porte quel devoir, et la date à laquelle chaque
> devoir commence à s'appliquer.

## Comment lire ce chapitre

Ce chapitre enseigne le Règlement ; le [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)
l'indexe. Lisez celui-ci pour la logique de la loi et le chapitre 08 pour les lignes d'obligation
complètes. Chaque devoir ci-dessous nomme l'artefact qui l'atteste et la couche de stack qui le
produit.

Le texte est lu par rapport au Règlement (UE) 2024/1689 [1] tel que modifié par le Règlement (UE)
2026/1744, l'Omnibus numérique sur l'IA [2], et chaque date est horodatée au 2026-09-24. C'est une
lecture d'ingénieur, pas un avis juridique. L'ingénieur construit le contrôle et la preuve ; le
conseil confirme que l'obligation a été lue correctement (voir
[traduction réglementaire](/bok/the-role#regulatory-translation)). Les mappages sont illustratifs,
pas une affirmation de conformité.

Les couches de stack nommées tout au long sont les cinq du chapitre 04 :
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

## Le Règlement et l'Omnibus

Le Règlement de l'IA est une réglementation de sécurité des produits avec des objectifs de droits
fondamentaux. Il s'applique directement dans chaque État membre, il est entré en vigueur le 1er août
2024, et ses devoirs s'activent par étapes [1][2]. Quatre idées portent tout le texte :

1. **Une porte de définition.** La chose est-elle un système d'IA, un modèle d'IA de finalité
   générale (GPAI), ou ni l'un ni l'autre ?
2. **Une échelle de risque.** Quel échelon la finalité prévue du système la place-t-elle ?
3. **Un ensemble de rôles d'opérateur.** Quel chapeau votre organisation porte-t-elle pour ce
   système ?
4. **Un calendrier.** À partir de quelle date chaque devoir s'applique-t-il ?

L'**Omnibus numérique sur l'IA** est le Règlement (UE) 2026/1744 du 8 juillet 2026. Il a été publié
au Journal officiel le 24 juillet 2026 et est entré en vigueur le troisième jour après la
publication, 27 juillet 2026 [2]. Il n'a pas réécrit le Règlement. Il a décalé les dates de haut
risque, ajouté deux interdictions et apporté des modifications ciblées qui importent à un ingénieur
(son homologue RGPD est une proposition distincte, couverte dans
[le côté RGPD de l'Omnibus numérique](/bok/privacy-and-ai#the-gdpr-side-of-the-digital-omnibus),
chapitre 19) :

| Changement | Où | Ce que cela signifie pour l'ingénieur |
|---|---|---|
| Devoirs de haut risque reportés | `Art. 113(c)` | Annexe III à partir du 2027-12-02 ; Annexe I à partir du 2028-08-02 |
| Deux nouvelles interdictions | `Art. 5(1)(ba)`, `(bb)` | Imagerie intime sans consentement et matériel d'abus sexuel d'enfants, à partir du 2026-12-02 |
| Littératie en IA reformulée | `Art. 4` | « Prendre des mesures pour soutenir » la littératie ; aucun niveau garanti |
| Base de données de détection des biais | `Art. 4a` (`Art. 10(5)` supprimé) | Données de catégories spéciales pour la correction des biais, avec des garanties strictes |
| « Composant de sécurité » réduit | `Art. 3(14)`, `6(1a)` à `6(1c)` | Moins de systèmes embarqués classés à haut risque |
| Allègement pour les PME et petites entreprises de taille intermédiaire (PMI) | `Arts. 11`, `17`, `63`, `99(6a)` | Documentation et QMS simplifiées ; amendes réduites |
| Coopération dans la chaîne de valeur | `Art. 25(2)`, `25(4)`, `99(4)(da)` | Les fournisseurs initiaux doivent remettre la documentation et l'accès ; le devoir est sanctionné |
| L'AIPD peut réutiliser l'EIPD | `Art. 27(4)`, `27(5)` | Un registre d'évaluation, avec références croisées |
| Le Bureau de l'IA supervise certains systèmes | `Arts. 75(1)`, `75a` à `75d` | Un deuxième superviseur avec des pouvoirs directs |
| Présomption du Règlement de cyberrésilience | `Art. 42(3)` | La conformité CRA compte pour la cybersécurité `Art. 15` |
| Organismes notifiés | `Arts. 28` à `30`, Annexe XIV | Demande unique ; un code de désignation qui nomme l'IA agentique (`AIH 0401`) |

Tout ce qui précède figure dans le texte modificatif [2]. Les numéros d'articles dans le reste du
chapitre sont ceux d'après l'Omnibus.

## Champ d'application et portée

### Qui est dans le champ d'application

L'article 2(1) s'applique aux fournisseurs plaçant des systèmes d'IA ou des modèles d'IA à usage
général sur le marché de l'UE, où qu'ils soient établis ; aux déployeurs dans l'Union ; aux
fournisseurs et déployeurs dans des pays tiers dont la sortie du système est utilisée dans l'Union ;
aux importateurs et distributeurs ; aux fabricants de produits plaçant l'IA avec leur produit sous
leur propre nom ; aux mandataires des fournisseurs non-UE ; et aux personnes affectées dans l'Union
[1].

La portée est extraterritoriale à deux titres : par la mise sur le marché et par la sortie [1]. La
conséquence pour l'ingénierie est un champ de registre. « Où est-il hébergé ? » n'est pas la
question de portée ; « où sa sortie est-elle utilisée ? » l'est. Un registre des agents qui
enregistre uniquement la région d'hébergement ne peut pas y répondre.

### Ce qui compte comme un système d'IA

L'article 3(1) définit un **système d'IA** comme « un système fondé sur la machine qui est conçu
pour fonctionner avec des niveaux d'autonomie variables et qui peut faire preuve d'adaptabilité
après son déploiement, et qui, pour des objectifs explicites ou implicites, déduit, à partir de
l'entrée qu'il reçoit, comment générer des sorties telles que des prédictions, du contenu, des
recommandations ou des décisions qui peuvent influencer des environnements physiques ou virtuels »
[1]. Les lignes directrices de la Commission lisent la phrase comme sept éléments (fondé sur la
machine ; autonomie ; adaptabilité possible ; objectifs ; déduction ; sorties ; influence sur les
environnements) et notent que tous les éléments ne doivent pas nécessairement être présents à la
fois dans la phase de construction et dans la phase d'utilisation [3].

L'élément décisif est la déduction. Les lignes directrices excluent les systèmes basés sur des
règles définies uniquement par des personnes physiques, et elles nomment quatre familles qui
calculent mais peuvent toujours tomber en dehors de la définition : les systèmes pour améliorer
l'optimisation mathématique, le traitement de données basique, les systèmes basés sur des
heuristiques classiques, et les systèmes de prédiction simples [3]. Les lignes directrices ne sont
pas contraignantes [3].

Pour l'ingénieur, la portée est une décision enregistrée, pas une hypothèse. Chaque entrée de
registre porte `ai_system: true | false` et, quand elle est fausse, l'élément qui échoue et le
raisonnement. Un appel « pas un système d'IA » sans raisonnement attaché est la première chose
qu'une autorité demandera. Un **modèle d'IA à usage général** est un objet séparé avec sa propre
définition (`Art. 3(63)`), couvert ci-dessous ; un modèle n'est pas un système d'IA en soi et a
besoin de composants supplémentaires, tels qu'une interface utilisateur, pour en devenir un
(considérant 97) [1]. Ce que « IA » signifie techniquement, au-delà du test juridique, est le sujet
du [chapitre 11](/bok/ai-defined#four-definitions-compared).

### Ce que le règlement exclut

| Exclusion | Article | Ce à surveiller |
|---|---|---|
| Militaire, défense ou sécurité nationale | `Art. 2(3)` | L'exclusion couvre les systèmes utilisés *exclusivement* à ces fins ; un système à double usage est dans le champ d'application pour ses autres utilisations |
| Autorités publiques de pays tiers et organisations internationales dans la coopération en matière répressive ou judiciaire | `Art. 2(4)` | Uniquement avec des garanties adéquates pour les droits fondamentaux |
| Recherche et développement scientifiques comme seul objectif | `Art. 2(6)` | Le système ou le modèle doit être spécifiquement développé et mis en service à cette seule fin |
| Recherche, essais et développement avant la mise sur le marché | `Art. 2(8)` | Les essais en conditions réelles ne sont pas couverts par l'exclusion |
| Utilisation purement personnelle et non professionnelle | `Art. 2(10)` | Supprime les obligations du déployeur pour les personnes physiques uniquement |
| Systèmes d'IA libres et open-source | `Art. 2(12)` | Pas si mis sur le marché comme à haut risque, ou pris par `Art. 5` ou `Art. 50` |
| Produits relevant de l'annexe I, section B (régimes sectoriels) | `Art. 2(2)` | Post-Omnibus, seuls `Art. 6(1)`, {`Art. 60a`} et {`Arts. 102`} à {`112`} s'appliquent |

Les six premières lignes figurent dans le texte original [1] ; la ligne de la section B est telle
qu'elle a été modifiée [2]. Le droit de l'Union en matière de protection des données s'applique
parallèlement au règlement dans tous les cas (`Art. 2(7)`).

## L'échelle des risques

Le règlement classe les systèmes d'IA par finalité prévue sur quatre échelons, et place les modèles
d'IA à usage général sur une voie séparée. Un système peut se trouver sur deux échelons à la fois :
un chatbot de l'annexe III porte à la fois les obligations de haut risque et l'obligation de
divulgation `Art. 50`.

| Échelon | Test | Conséquence | Articles | S'applique à partir de |
|---|---|---|---|---|
| Interdite | La pratique est énumérée dans `Art. 5` | Ne peut pas être mise sur le marché, mise en service ou utilisée | `Art. 5` | 2025-02-02 ; nouveaux points 2026-12-02 |
| Haut risque | Composant de sécurité de l'annexe I nécessitant une évaluation par un tiers, ou un usage de l'annexe III non filtré par `Art. 6(3)` | Exigences de {`Arts. 8`} à {`15`}, obligations du fournisseur et du déployeur, évaluation de la conformité | {`Arts. 6`} à {`49`} | 2027-12-02 (annexe III) ; 2028-08-02 (annexe I) |
| Transparence | Interagit avec des personnes, génère du contenu synthétique, reconnaît les émotions, catégorise biométriquement, ou produit des hypertrucages | Divulguer, marquer, étiqueter | `Art. 50` | 2026-08-02 |
| Minimal | Tout le reste | Aucune obligation spécifique au-delà de {`Art. 4`} ; codes volontaires | `Arts. 4`, `95` | 2025-02-02 ({`Art. 4`} reformulé 2026-07-27) |
| Voie GPAI | Généralité du modèle ; risque systémique par capacité, calcul ou désignation | Obligations au niveau du modèle | {`Arts. 51`} à {`56`} | 2025-08-02 ; application par la Commission 2026-08-02 |

Les dates sont celles de {`Art. 113`} telles qu'elles ont été modifiées {[1][2]}.

### Pratiques interdites (article 5)

L'article 5 est une liste d'usages interdits, pas une évaluation des risques. Si une pratique figure
sur la liste, aucune atténuation ne la rend licite. La liste compte maintenant dix points [1][2] :

| Point | Pratique interdite (paraphrasée) | Exemption étroite | S'applique à partir de |
|---|---|---|---|
| `(a)` | Techniques subliminales, manipulatrices ou trompeuses qui déforment matériellement le comportement, causant ou susceptibles de causer un préjudice important | Aucun | 2025-02-02 |
| `(b)` | Exploitation des vulnérabilités liées à l'âge, au handicap ou à la situation sociale ou économique, avec le même effet | Aucun | 2025-02-02 |
| `(c)` | Notation sociale conduisant à un traitement préjudiciable injustifié ou hors contexte | Aucun | 2025-02-02 |
| `(d)` | Prédiction du risque criminel basée uniquement sur le profilage ou les traits de personnalité | Soutien à une évaluation humaine basée sur des faits objectifs et vérifiables | 2025-02-02 |
| `(e)` | Extraction non ciblée d'images faciales pour construire des bases de données de reconnaissance | Aucun | 2025-02-02 |
| `(f)` | Déduction des émotions au travail ou dans l'éducation | Raisons médicales ou de sécurité | 2025-02-02 |
| `(g)` | Catégorisation biométrique pour déduire des traits sensibles tels que la race, les convictions ou l'orientation sexuelle | Ensembles de données légalement acquis ; catégorisation par les forces de l'ordre | 2025-02-02 |
| `(h)` | Identification biométrique à distance en temps réel dans les espaces publics pour les forces de l'ordre | Trois objectifs, avec autorisation préalable ({`Art. 5(2)`} à {`5(7)`}) | 2025-02-02 |
| `(ba)` | Génération ou manipulation d'imagerie intime réaliste d'une personne identifiable sans consentement explicite | Conditions dans {`Art. 5(1a)`}, {`5(1b)`} | 2026-12-02 |
| `(bb)` | Génération ou manipulation de matériel d'abus sexuel d'enfants (directive 2011/93/UE) | Défense « sans droit » ; {`Art. 5(1a)`} | 2026-12-02 |

Les deux points Omnibus portent un test d'ingénierie. Placer un tel générateur sur le marché est
interdit uniquement lorsque cette sortie est sa finalité prévue, ou lorsque la sortie est « un
résultat raisonnablement prévisible et reproductible » et que le système manque de « mesures de
sécurité techniques raisonnables et adéquates » pour l'empêcher et corriger les abus observés ;
l'utilisation est interdite uniquement lorsque le déployeur l'utilise à cette fin [2]. La preuve que
la garantie tient est donc partie du test juridique. Les lignes directrices de la Commission sur les
interdictions originales ne sont pas contraignantes [4]. L'interdiction de scraping au point {`(e)`}
a un précédent en matière de protection des données dans
[l'affaire Clearview AI](/cases/clearview-ai).

Pour la plupart des organisations `Art. 5` correspond à deux contrôles : une liste de refus des
finalités interdites évaluée à l'admission ([Policy Card](/patterns/policy-card)), et pour les
systèmes génératifs un [Runtime Guardrail](/patterns/runtime-guardrail) de sortie testé par une
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite). Les deux laissent des
enregistrements qu'un régulateur peut lire. Les violations se situent dans le plus haut niveau
d'amende (voir « Pénalités »).

> **En pratique (illustratif)**
> Une équipe expédiant une fonctionnalité d'édition d'images a traité le 2 décembre 2026 comme une
> porte de publication, pas un mémo juridique. Elle a ajouté une suite adversariale de prompts
> d'imagerie intime et de sécurité mineure à la porte d'évaluation, défini un seuil de tolérance
> zéro, et câblé les décisions de blocage du classificateur de sortie dans le magasin de preuves
> sous l'id d'obligation {`EU-AIA-5-1-ba`}. La première exécution a échoué sur les modifications qui
> augmentaient l'exposition dans les photos existantes. Le correctif a été expédié avant la date, et
> l'exécution réussie, pas une déclaration de politique, est devenue la preuve que la garantie était
> « raisonnable et adéquate ».

### Haut risque par les produits (annexe I)

Un système est à haut risque en vertu de {`Art. 6(1)`} lorsque les deux conditions sont remplies :
il est un composant de sécurité d'un produit, ou est lui-même un produit, couvert par la législation
d'harmonisation de l'Union dans l'annexe I ; et ce produit doit faire l'objet d'une évaluation de la
conformité par un tiers en vertu de cette législation {[1]}. La section A de l'annexe I couvre les
produits tels que les jouets, les ascenseurs, les équipements radio, les dispositifs médicaux et les
diagnostics in vitro ; la section B couvre les régimes sectoriels tels que l'aviation civile et les
véhicules {[1]}.

L'Omnibus a réduit la voie {[2]}. Un **composant de sécurité** doit maintenant avoir pour finalité
prévue de prévenir ou d'atténuer les risques pour la santé et la sécurité, ou en être un dont la
défaillance les met en danger ({`Art. 3(14)`}). L'IA utilisée uniquement pour l'assistance
utilisateur, l'optimisation des performances, l'efficacité, l'automatisation, la commodité ou le
contrôle de la qualité n'est pas un composant de sécurité à moins que sa défaillance ne mette en
danger la santé et la sécurité ({`Art. 6(1a)`}, {`6(1b)`}). Une évaluation par un tiers requise
uniquement pour des raisons non liées à la sécurité, telles que le spectre radio, ne compte pas
({`Art. 6(1c)`}). Les machines ont été transférées à la section B, et les actes délégués dus d'ici
le 2 août 2027 peuvent limiter les obligations lorsque la loi de la section A offre déjà une
protection équivalente ({`Art. 2(13)`}). La voie de l'annexe I s'applique à partir du 2 août 2028
{[2]}.

### Haut risque par l'usage (annexe III)

En vertu de {`Art. 6(2)`}, l'annexe III énumère huit domaines. Un système dont la finalité prévue
relève de l'un d'eux est à haut risque à moins que le filtre {`Art. 6(3)`} ne l'exclue {[1]} :

| Domaine | Ce qui est énuméré (une ligne) |
|---|---|
| 1. Biométrie | Identification biométrique à distance (pas une vérification un-à-un), catégorisation biométrique par attributs sensibles, reconnaissance des émotions |
| 2. Infrastructure critique | Composants de sécurité dans l'infrastructure numérique critique, le trafic routier, et l'approvisionnement en eau, gaz, chauffage ou électricité |
| 3. Éducation et formation professionnelle | Admission, évaluation des résultats d'apprentissage, évaluation du niveau d'éducation, détection du comportement interdit aux examens |
| 4. Emploi et gestion des travailleurs | Recrutement et sélection, décisions sur les conditions, promotion ou résiliation, allocation des tâches, suivi et évaluation des performances |
| 5. Services essentiels privés et publics | Admissibilité aux prestations publiques, solvabilité et notation de crédit (pas la détection de fraude), tarification de l'assurance-vie et santé, triage et dépêche des appels d'urgence |
| 6. Forces de l'ordre | Risque pour la victime, polygraphes, fiabilité des preuves, risque de récidive non basé uniquement sur le profilage, profilage dans les enquêtes |
| 7. Migration, asile et contrôle aux frontières | Polygraphes, évaluation des risques pour les personnes, examen des demandes, détection ou identification des personnes (pas les vérifications de documents de voyage) |
| 8. Administration de la justice et processus démocratiques | Assistance aux autorités judiciaires sur les faits et le droit (et modes alternatifs de règlement), influence sur les élections ou le comportement électoral |

La Commission peut ajouter des cas d'usage à l'annexe III par acte délégué (`Art. 7`) [1], de sorte
que la table Annexe III du classificateur d'admission est une donnée avec une version, non une liste
codée en dur. Ce que le point 5 prévient est visible dans
[l'affaire néerlandaise des allocations de garde d'enfants](/cases/dutch-childcare-benefits).

### Le filtre Annexe III et le contournement du profilage

En vertu de `Art. 6(3)`, un système Annexe III n'est pas à haut risque s'il ne pose pas de risque
significatif de préjudice à la santé, à la sécurité ou aux droits fondamentaux, notamment en
n'influençant pas matériellement l'issue de la prise de décision. Le filtre s'applique lorsqu'au
moins l'une des quatre conditions suivantes est remplie [1] :

1. le système effectue une tâche procédurale étroite ;
2. il améliore le résultat d'une activité humaine antérieurement achevée ;
3. il détecte des modèles de prise de décision ou des écarts sans remplacer ou influencer
   l'évaluation humaine achevée sans examen humain approprié ;
4. il effectue une tâche préparatoire à une évaluation pertinente pour un cas d'usage Annexe III.

Un contournement l'emporte sur les quatre : un système Annexe III qui
**profile des personnes physiques est toujours à haut risque** [1]. Un fournisseur s'appuyant sur le
filtre doit documenter son évaluation avant la mise sur le marché du système, l'enregistrer
(`Art. 6(4)`, `Art. 49(2)`), et remettre la documentation aux autorités sur demande [1]. L'omnibus
numérique a réduit cet enregistrement, supprimant le résumé des motifs et la liste des États membres
de l'annexe VIII, section B [2].

Les lignes directrices de classification de la Commission, avec des exemples pratiques, devaient
être publiées le 2 février 2026 en vertu de `Art. 6(5)`. Un projet a été publié le 19 mai 2026, avec
une consultation ciblée ouverte jusqu'au 23 juillet 2026 ; au 2026-09-24, la page de la Commission
les présente toujours comme un projet [5][6]. Tant qu'elles ne sont pas finales, la défense de
l'ingénieur est un bon dossier, non un bon argument.

> **Exemple (illustratif)**
> Un enregistrement de décision de classification, déposé dans le registre et réévalué chaque fois
> que la finalité prévue change :
>
> ```json
> { "system": "cv-screen-02", "annex_iii_point": "4(a)",
>   "art_6_3_condition": "preparatory_task", "profiling": true,
>   "result": "high-risk", "reason": "profiling override, Art. 6(3) third subparagraph",
>   "reviewed_by": "ai-governance", "date": "2026-09-24" }
> ```
>
> Le drapeau explicite `profiling` est le point clé : le filtre a été invoqué, et le contournement
> l'a annulé.

Cet enregistrement est la sortie du flux de travail
[d'admission et de classification](/bok/the-role#intake-and-classification) et se trouve dans la
couche 2 (Inventory & Transparency) ; la règle qui le calcule se trouve dans la couche 1.

### Cas de transparence (article 50)

L'article 50 est souvent appelé l'échelon du « risque limité ». Il s'applique à tout système d'IA
qui correspond à l'un de ses cas, quoi qu'il en soit du reste du système [1] :

| Cas | Titulaire de l'obligation | Devoir | Artefact | Couche |
|---|---|---|---|---|
| `50(1)` : interagit directement avec des personnes | Fournisseur | Les personnes doivent savoir que c'est de l'IA, sauf si c'est évident | Divulgation à l'interface ; un test qui s'affiche | 4 · 3 |
| `50(2)` : génère de l'audio, des images, des vidéos ou du texte synthétiques | Fournisseur | Marquage lisible par machine, détectable | Filigrane ou métadonnées de provenance ; test de marquage en CI | 4 · 3 |
| `50(3)` : reconnaissance des émotions ou catégorisation biométrique | Déployeur | Informer les personnes exposées | Avis au moment de l'exposition | 2 |
| `50(4)` : hypertrucages | Déployeur | Divulguer la manipulation (plus léger pour l'art ou la satire évidents) | Étiquette de contenu ; vérification de la publication | 4 |
| `50(4)` : texte d'IA informant le public | Déployeur | Divulguer, sauf responsabilité éditoriale humaine | Enregistrement de contrôle éditorial ou étiquette | 2 · 4 |

L'information doit atteindre les personnes au plus tard à la première interaction ou exposition
(`Art. 50(5)`) [1]. L'article s'applique depuis le 2 août 2026 ; les systèmes génératifs déjà sur le
marché avant cette date ont jusqu'au 2 décembre 2026 pour marquer les résultats (`Art. 111(4)`) [2].
Le Code de pratique final sur la transparence du contenu généré par l'IA (10 juin 2026) contient une
section fournisseur sur le marquage et une section déployeur sur l'étiquetage, et la Commission et
le Conseil de l'IA l'ont confirmé comme un outil volontaire adéquat ; la Commission a publié ses
lignes directrices sur les `Art. 50` obligations de transparence le 20 juillet 2026, après un projet
du 8 mai 2026 [9][14]. Le droit en dehors du Règlement atteint aussi les médias synthétiques : voir
[hypertrucages et médias synthétiques](/bok/existing-law#deepfakes-and-synthetic-media) au
chapitre 20.

### Risque minimal

Tout le reste est un risque minimal. Le Règlement ne demande rien de spécifique au-delà de la
maîtrise de l'IA (`Art. 4`) et invite à des codes de conduite volontaires (`Art. 95`) [1]. « Minimal
» est une catégorie juridique, non un verdict de risque : le droit de la protection des données, le
droit de la consommation, le droit de la responsabilité du fait des produits et le droit
anti-discrimination s'appliquent toujours (voir
[droit existant](/bok/existing-law#how-to-read-this-chapter) et
[confidentialité et IA](/bok/privacy-and-ai#principles-applied-to-ai)), et votre propre
[gestion des risques](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix) peut
classer un système à risque minimal comme élevé pour votre organisation.

## Modèles d'IA à usage général

### Modèle, système et critère indicatif

Un **modèle GPAI** est un modèle d'IA qui « présente une généralité significative et est capable
d'effectuer de manière compétente un large éventail de tâches distinctes » et peut être intégré dans
une variété de systèmes en aval, à l'exclusion des modèles utilisés pour la recherche, le
développement ou le prototypage avant leur mise sur le marché (`Art. 3(63)`) [1]. Un
**système GPAI** est un système d'IA basé sur un tel modèle (`Art. 3(66)`) [1]. Les lignes
directrices de la Commission donnent un critère indicatif : calcul d'entraînement supérieur à 10^23
FLOP et la capacité à générer du langage (texte ou audio), du texte vers image ou du texte vers
vidéo [7].

### Obligations de chaque fournisseur GPAI

| Devoir | Article | Artefact | Couche |
|---|---|---|---|
| Documentation technique (annexe XI) pour le Bureau de l'IA et les autorités nationales, sur demande | `Art. 53(1)(a)` | Documentation du modèle avec résultats d'entraînement, de test et d'évaluation | 2 |
| Informations pour les fournisseurs en aval (annexe XII) | `Art. 53(1)(b)` | Fiche de modèle ; notes sur les capacités et les limitations ; guide d'intégration | 2 |
| Politique de droit d'auteur, y compris le respect des refus d'exploration de textes et de données | `Art. 53(1)(c)` | Règles de filtrage des sources en tant que code ; journal d'honneur des refus | 1 · 2 |
| Résumé public du contenu d'entraînement sur le modèle du Bureau de l'IA | `Art. 53(1)(d)` | Résumé généré à partir des enregistrements de provenance des ensembles de données | 2 |
| Mandataire autorisé dans l'Union pour les fournisseurs non-UE | `Art. 54` | Mandat écrit ; documentation conservée pendant 10 ans | 5 |

Les obligations et leurs détails sont dans le Règlement [1] ; les lignes du chapitre 08 pour
[`Art. 53` et `Art. 55`](/bok/regulatory-map#eu-ai-act-post-omnibus) portent les dates et
l'autorité. Le droit d'auteur derrière la {`Art. 53(1)(c)`} politique est au chapitre 20
([politique de droit d'auteur et refus TDM](/bok/existing-law#copyright-and-training-data)).

### Risque systémique : seuil, notification, désignation

Un modèle GPAI a un **risque systémique** s'il a des capacités à fort impact, ou si la Commission le
désigne selon les critères de l'annexe XIII (`Art. 51(1)`) [1]. Les capacités à fort impact sont
présumées au-dessus de 10^25 FLOP de calcul d'entraînement cumulatif, un seuil que la Commission
peut modifier (`Art. 51(2)`, `51(3)`) [1]. Le fournisseur doit notifier la Commission dans les deux
semaines suivant le franchissement du seuil ou sachant qu'il le sera, et peut argumenter que le
modèle ne présente exceptionnellement aucun risque systémique (`Art. 52`) [1].

L'artefact d'ingénierie est un **registre de calcul** : FLOP d'entraînement cumulatif par lignée de
modèle, avec la méthode d'estimation, et une alerte lorsque le calcul *prévu* franchira le seuil,
car l'horloge de deux semaines peut commencer avant la fin de l'entraînement.

### Obligations pour les modèles à risque systémique

En plus de `Arts. 53` et `54`}, le fournisseur doit évaluer le modèle avec des protocoles de pointe
incluant des tests adversariaux ; évaluer et atténuer les risques systémiques au niveau de l'Union ;
suivre, documenter et signaler les incidents graves au Bureau de l'IA sans délai indu ; et assurer
une cybersécurité adéquate pour le modèle et son infrastructure physique (`Art. 55(1)`) [1]. Les
artefacts sont la [porte d'évaluation](/patterns/eval-gate-in-ci) et la suite de test adversarial,
un registre des risques systémiques, le [pipeline d'incidents](/patterns/incident-pipeline) sur le
modèle de rapport de la Commission (voir [chapitre 08](/bok/regulatory-map#gpai-code-of-practice))
et les contrôles de sécurité des poids.

### Exemptions open-source et leurs limites

Un modèle publié sous une licence libre et open-source, avec ses poids, architecture et informations
d'utilisation publics, est exempté de `Art. 53(1)(a)` et `(b)` et du devoir de mandataire autorisé
(`Arts. 53(2)`, `54(6)`) [1]. L'exemption ne couvre jamais un modèle à risque systémique, et la
politique de droit d'auteur et le résumé d'entraînement s'appliquent toujours [1]. La monétisation
l'annule : les lignes directrices traitent les licences doubles, le support payant sans lequel le
modèle ne peut pas être utilisé, et l'hébergement payant exclusif comme monétisation [7]. L'omnibus
numérique maintient les modèles GPAI dans le devoir d'accord écrit {`Art. 25(4)`} même lorsqu'ils
sont publiés ouvertement [2].

### Quand un affineur devient fournisseur GPAI

Un modificateur devient le fournisseur d'un nouveau modèle GPAI uniquement si le changement est
significatif pour la généralité, les capacités ou le risque systémique. Le critère indicatif des
lignes directrices est un calcul de modification supérieur à un tiers du calcul d'entraînement
original (ou, s'il est inconnu, un tiers de 10^25 FLOP pour un original à risque systémique et de
10^23 FLOP sinon), et les obligations {`Art. 53(1)`} du modificateur sont alors limitées à la
modification et ses données ; `Art. 54` s'applique, et lorsque l'original est un modèle à risque
systémique, le modèle modifié est présumé avoir un risque systémique, de sorte que le modificateur
notifie la Commission (`Art. 52`) et remplit les obligations {`Art. 55`} [7]. Gardez ce test séparé
de `Art. 25` : l'affinage d'un *modèle* change le statut de fournisseur GPAI ; changer la *finalité
prévue* d'un *système* en Annexe III change le statut de fournisseur à haut risque. Deux tests, deux
objets, deux champs de registre.

### Le Code de pratique et l'application

Le Code de pratique sur l'IA à usage général a été publié le 10 juillet 2025. Ses chapitres
Transparence et Droit d'auteur s'appliquent à tous les fournisseurs GPAI, son chapitre Sécurité et
Sûreté uniquement aux modèles à risque systémique, et la Commission et le Conseil de l'IA l'ont
confirmé comme un outil volontaire adéquat [8]. Les fournisseurs peuvent s'y fier jusqu'à
l'existence d'une norme harmonisée ; les non-signataires doivent montrer des moyens alternatifs
adéquats (`Arts. 53(4)`, `55(2)`) [1]. Les obligations GPAI s'appliquent depuis le 2 août 2025, les
amendes de la Commission en vertu de `Art. 101` depuis le 2 août 2026, et les modèles mis sur le
marché avant le 2 août 2025 doivent être conformes au 2 août 2027 (`Art. 111(3)`) [1][7].

## Exigences pour les systèmes à haut risque (articles 8 à 15)

L'article 8 exige qu'un système à haut risque satisfasse à la section 2 du chapitre III, en tenant
compte de sa finalité prévue et de l'état de l'art [1]. Les exigences sont des obligations de
conception pour le fournisseur. Dans un tableau, avec l'artefact qui atteste chacune :

| Article | Exigence en une ligne | Artefact | Couche |
|---|---|---|---|
| `Art. 9` | Un système de gestion des risques fonctionnant comme un processus continu et itératif sur le cycle de vie, incluant les tests et l'utilisation indue raisonnablement prévisible | Registre des risques en tant que code, lié aux résultats des évaluations et à l'AIPD | 1 · 3 |
| `Art. 10` | Données d'entraînement, de validation et de test qui sont pertinentes, suffisamment représentatives et, autant que possible, exemptes d'erreurs et complètes ; biais examiné et atténué | Fiches de données, traçabilité, tests de biais et de qualité en CI | 2 · 3 |
| `Art. 11` | Documentation technique (Annexe IV) avant la mise sur le marché, tenue à jour ; une forme simplifiée pour les PME et les petites structures | AIBOM ; documentation technique générée ; fiche de modèle | 2 |
| `Art. 12` | Enregistrement automatique des événements sur la durée de vie du système, pour la traçabilité | Journaux d'événements et traces structurés, inviolables | 4 |
| `Art. 13` | Notice d'utilisation pour les déployeurs, incluant la précision déclarée, les limitations et les mesures de contrôle | Notice d'utilisation en tant que code ; fiche de modèle | 2 |
| `Art. 14` | Contrôle humain : les personnes peuvent comprendre, surveiller, rester conscientes du biais d'automatisation, interpréter, annuler et arrêter le système | Points de contrôle avec intervention humaine ; chemin d'annulation ; kill switch | 4 |
| `Art. 15` | Précision, robustesse et cybersécurité sur tout le cycle de vie, y compris les défenses contre l'empoisonnement, les exemples contradictoires et les attaques contre la confidentialité | Évaluation gate ; suite de red-team ; contrôles de sécurité | 3 · 4 |

Les exigences figurent dans l'Acte [1] ; la forme simplifiée pour les PME et petites structures dans
`Art. 11(1)` est un ajout Omnibus [2]. Le chapitre 14 construit
[le dossier technique](/bok/governing-development#the-technical-file) à partir des enregistrements
du pipeline. `Art. 14(5)` ajoute une vérification à deux personnes avant d'agir sur une
identification biométrique à distance, avec des exceptions dans les activités répressives, la
migration, le contrôle aux frontières et l'asile [1] ; voir
[concevoir le contrôle humain](/bok/the-stack#designing-human-oversight-article-14) et la
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Un système à haut risque relevant du
Cyber Resilience Act qui remplit les conditions de son article 12(1) est réputé satisfaire à
l'exigence de cybersécurité du `Art. 15` (`Art. 42(3)`) [2], de sorte qu'un même dossier de preuves
de sécurité peut servir les deux régimes.

## Obligations du fournisseur au-delà des exigences

### Article 16 et le système de gestion de la qualité (article 17)

L'article 16 est le cadre des obligations du fournisseur : les exigences, le nom du système, le SGQ,
la documentation, les journaux, l'évaluation de la conformité, la déclaration, le marquage CE,
l'enregistrement, l'action corrective, la coopération et l'accessibilité [1]. Le chapitre 08 les
détaille article par article.

Le SGQ doit être documenté sous forme de politiques écrites, de procédures et d'instructions
couvrant au moins 13 aspects, d'une stratégie de conformité avec gestion des changements, contrôle
de la conception, tests et gestion des données au système de `Art. 9` risques, surveillance après
commercialisation, signalement des incidents, conservation des registres et un cadre de
responsabilité (`Art. 17(1)`) [1]. Il est proportionné à la taille du fournisseur, que l'Omnibus
précise désormais pour les PME et petites structures sans abaisser la rigueur requise, et les PME
sans entreprise partenaire ou liée peuvent satisfaire à certains éléments de manière simplifiée
(`Arts. 17(2)`, `63`) [2]. Lue comme un ingénieur, le SGQ est le pipeline plus ses enregistrements :
politiques versionnées, contrôle des changements et les gates qui s'exécutent à chaque version. La
norme de l'article 17 est publiée mais non citée au Journal officiel, et ISO/IEC 42001 n'est pas le
SGQ de l'article 17 (voir [chapitre 08](/bok/regulatory-map#what-is-not-harmonised-yet), et chapitre
22 sur
[les normes harmonisées et la présomption de conformité](/bok/principles-and-standards#how-presumption-of-conformity-works)).

### Évaluation de la conformité, déclaration, marquage et enregistrement

Les points 2 à 8 de l'annexe III utilisent le contrôle interne (annexe VI) sans organisme notifié ;
la biométrie (point 1) peut utiliser le contrôle interne uniquement si les normes harmonisées ou les
spécifications communes ont été appliquées intégralement, sinon elle nécessite un organisme notifié
(annexe VII) (`Art. 43(1)`, `43(2)`) [1]. Les produits de l'annexe I, section A suivent la procédure
sectorielle, qui inclut désormais expressément les exigences de la section 2 et une évaluation du
SGQ ; leurs organismes notifiés doivent demander la désignation en vertu de l'Acte avant le 28
janvier 2028 (`Art. 43(3)`) [2]. Une modification substantielle déclenche une nouvelle évaluation
(`Art. 43(4)`) [1].

Le fournisseur établit alors la déclaration UE de conformité (`Art. 47`), appose le marquage CE
(`Art. 48`) et enregistre le système dans la base de données UE (`Arts. 49`, `71`) [1]. La
documentation est conservée pendant 10 ans (`Art. 18`) et les journaux pendant au moins six mois
(`Art. 19`) [1]. Chacun est une sortie du pipeline : la déclaration est générée à partir de la
preuve que les gates ont été franchis, et l'enregistrement est poussé depuis le registre.

### Surveillance après commercialisation et incidents graves (articles 72 et 73)

Le fournisseur exécute un système de surveillance après commercialisation qui collecte et analyse
activement les données de performance, y compris auprès des déployeurs, pour évaluer la conformité
continue (`Art. 72(1)`, `72(2)`) [1]. Son plan fait partie de la documentation de l'annexe IV, et
l'Omnibus a remplacé l'acte d'exécution en retard par une orientation de la Commission et un modèle
dus le 2 septembre 2027 (`Art. 72(3)`) [2].
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) est le système de
surveillance ; le plan est sa configuration versionnée.

Les incidents graves sont signalés à l'autorité de fiscalisation du marché immédiatement après qu'un
lien causal, ou sa probabilité raisonnable, soit établi, et en tout cas selon les horloges
`Art. 73`, chacune comptée à partir du moment où le fournisseur (ou le déployeur) prend connaissance
de l'incident : 15 jours en général, deux jours pour une infraction généralisée ou une perturbation
grave et irréversible de la gestion ou du fonctionnement d'une infrastructure critique
(`Art. 3(49)(b)`), et 10 jours après un décès [1]. Le chapitre 08 contient le
[tableau des horloges de signalement](/bok/regulatory-map#eu-ai-act-post-omnibus) ; le chapitre 17
traite les [incidents](/bok/incidents#the-overlapping-clocks) de bout en bout. Les fournisseurs de
systèmes à haut risque relevant de la compétence directe du Bureau de l'IA signalent au Bureau de
l'IA à la place (`Art. 75(1a)`) [2].

## Qui vous êtes dans la chaîne de valeur

### Les rôles d'opérateur de l'UE

L'Acte lie les **opérateurs** (`Art. 3(8)`) : fournisseurs, fabricants de produits, déployeurs,
mandataires, importateurs et distributeurs [1]. Le chapitre GPAI ajoute le fournisseur GPAI et le
fournisseur en aval. Le tableau place chaque rôle dans les termes de l'ingénieur : ce qu'il produit
et ce qu'il doit collecter auprès de quelqu'un d'autre.

| Rôle | Qui c'est (propres termes) | Obligations principales | Preuves qu'elle produit | Preuves qu'il collecte |
|---|---|---|---|---|
| Fournisseur (`Art. 3(3)`) | Développe un système d'IA ou un modèle GPAI, ou en fait développer un, et le met sur le marché ou en service sous son propre nom | `Arts. 8` à `17`, `43` à `49`, `72`, `73` ; `50(1)`, `50(2)` | Documentation technique, enregistrements du SGQ, résultats d'évaluation, déclaration | Informations sur le modèle en amont ; accords `Art. 25(4)` |
| Déployeur (`Art. 3(4)`) | Utilise un système d'IA sous son autorité, autrement que pour un usage personnel et non professionnel | `Arts. 26`, `27`, `50(3)`, `50(4)`, `86` | Journaux d'utilisation, registre de supervision, AIPD, avis | Notice d'utilisation, déclaration, identifiant d'enregistrement |
| Importateur (`Art. 3(6)`) | Basé dans l'UE ; met sur le marché un système portant le nom d'un fournisseur non-UE | `Art. 23` : vérifier l'évaluation, les documents et le marquage du fournisseur ; conserver les copies 10 ans | Enregistrement de vérification à l'importation | Certificat, déclaration, notice d'utilisation |
| Distributeur (`Art. 3(7)`) | Met un système à disposition sans en être le fournisseur ou l'importateur | `Art. 24` : vérifier le marquage et les documents ; retenir les systèmes non conformes | Enregistrement de vérification de distribution | Le même ensemble |
| Mandataire (`Art. 3(5)`) | Basé dans l'UE, avec un mandat écrit d'un fournisseur non-UE | `Arts. 22`, `54` : vérifier, conserver les documents 10 ans, coopérer, mettre fin au mandat en cas de violation | Mandat ; copies de documents | Tout du fournisseur |
| Fabricant de produit (`Art. 25(3)`) | Met un composant de sécurité à haut risque avec son produit de l'annexe I, section A sur le marché sous son propre nom | Obligations du fournisseur (`Art. 16`) | En tant que fournisseur | Documentation du fournisseur |
| Fournisseur GPAI (`Art. 53`) | Le fournisseur d'un modèle GPAI | `Arts. 53` à `55` | Documentation du modèle, résumé d'entraînement, politique de droits d'auteur | Provenance des données et licences |
| Fournisseur en aval (`Art. 3(68)`) | Intègre un modèle d'IA, le sien ou celui d'un tiers, dans un système d'IA | Obligations du fournisseur pour le système | Documentation du système | Informations de l'annexe XII |

Les obligations figurent dans `Arts. 16` à `27` et `53` à `55` [1]. La **personne affectée** est
couverte (`Art. 2(1)(g)`) en tant que titulaire de protections, non d'obligations [1].

### Article 25 : quand quelqu'un d'autre devient le fournisseur

Un distributeur, importateur, déployeur ou tiers devient le fournisseur d'un système à haut risque,
avec toutes les obligations `Art. 16`, dans trois cas (`Art. 25(1)`) [1] :

1. il met son nom ou sa marque sur un système à haut risque déjà sur le marché, sous réserve de
   contrats allouant les obligations autrement ;
2. il apporte une modification substantielle à un système à haut risque qui reste à haut risque ;
3. il change la destination d'un système qui n'était pas à haut risque, y compris un système d'IA à
   usage général, de sorte qu'il devient à haut risque.

Une **modification substantielle** est un changement non planifié après la mise sur le marché qui
affecte la conformité ou change la destination évaluée (`Art. 3(23)`) [1]. Quand un déclencheur se
déclenche, le fournisseur initial cesse d'être le fournisseur de ce système mais doit coopérer avec
le nouveau ; l'Omnibus précise désormais que cela signifie une documentation suffisante pour évaluer
la conformité, les limitations connues et les modes de défaillance, et un accès technique ciblé pour
les tests, sauf si le fournisseur initial avait clairement exclu tout changement vers un système à
haut risque (`Art. 25(2)`) [2]. Les fournisseurs à haut risque et leurs fournisseurs de systèmes,
modèles, outils et composants doivent corriger les informations et l'accès nécessaires dans un
accord écrit (`Art. 25(4)`), et les violations des deux paragraphes sont désormais sanctionnées dans
la tranche intermédiaire (`Art. 99(4)(da)`) [2].

Dans le pipeline, les trois déclencheurs sont des événements détectables : un changement de marque
blanche ou de marque, un réentraînement qui touche la conformité, et un changement de configuration
qui déplace `intended_purpose` dans une valeur de l'annexe III. Chacun devrait déclencher une
réévaluation des rôles et un ticket
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) (voir
[IA tierce et procurée](/bok/the-stack#third-party-and-procured-ai)).

> **Exemple (illustratif)**
> Une équipe RH configure un assistant de chat à usage général, qu'elle déploie sous une licence de
> fournisseur, pour classer les candidats à un emploi. La configuration déplace la destination dans
> l'annexe III, point 4(a), donc selon `Art. 25(1)(c)` l'organisation devient le fournisseur d'un
> système à haut risque : `Arts. 8` à `17`, évaluation de la conformité et enregistrement sont
> désormais ses obligations. Qu'elle commence avec quelque chose dépend du contrat. Si le
> fournisseur n'a pas exclu l'usage à haut risque, `Art. 25(2)` l'oblige à remettre la
> documentation, les limitations connues et l'accès aux tests. S'il l'a exclu, l'organisation
> construit la preuve seule. La clause d'exclusion dans les conditions du fournisseur fixe la taille
> du budget de preuve.

### Les rôles nomment les tâches, pas les organisations

Un rôle s'attache à une activité sur un système spécifique, non à une entreprise. Une banque est le
fournisseur du modèle de crédit qu'elle a construit, le déployeur de ce modèle dans ses agences («
mise en service » inclut l'usage propre, `Art. 3(11)` [1]) et le déployeur du chatbot d'un
fournisseur. Le registre enregistre donc les rôles par système, sous forme de liste :
`["provider", "deployer"]` pour un système interne, `["deployer"]` pour un système acheté.

### Les mêmes rôles dans les régimes

Les termes diffèrent selon les lois ; les tâches rarement. La colonne de correspondance est la
lecture de ce chapitre, non une équivalence juridique.

| Régime | Rôle | Ce qu'il couvre (termes propres) | Rôle UE le plus proche (notre correspondance) |
|---|---|---|---|
| Règlement de l'IA [1] | Fournisseur ; déployeur ; importateur ; distributeur ; mandataire ; fabricant de produit | Comme dans le tableau ci-dessus | Point de référence |
| Colorado SB 26-189 [10] | Développeur | Construit une technologie de prise de décision utilisée dans des décisions importantes ; la documente pour les déployeurs | Fournisseur |
| Colorado SB 26-189 [10] | Déployeur | L'utilise dans des décisions importantes ; informe le consommateur ; conserve les registres au moins trois ans | Déployeur |
| Texas HB 149 (TRAIGA) [11] | Développeur | Développe un système de IA offert ou fourni au Texas | Fournisseur |
| Texas HB 149 (TRAIGA) [11] | Déployeur | Déploie un système de IA pour utilisation au Texas | Déployeur |
| Loi fondamentale sur l'IA de la Corée [12] | Opérateur d'entreprise de développement d'IA | Développe et fournit l'IA | Fournisseur |
| Loi fondamentale sur l'IA de la Corée [12] | Opérateur d'entreprise d'utilisation d'IA | Offre des produits ou services construits sur l'IA d'un opérateur de développement | Fournisseur en aval ou déployeur |
| Loi fondamentale sur l'IA de la Corée [12] | Utilisateur ; personne affectée | Reçoit le service ; a la vie, la sécurité ou les droits significativement affectés | Protégé, non titulaire d'obligation |
| ISO/IEC 22989 [13] | Fournisseur, producteur, client, partenaire, sujet d'IA ; autorités compétentes (à vérifier) | Rôles de vocabulaire, non obligations juridiques | Utile dans les contrats |

La loi du Colorado a été signée le 14 mai 2026 et ses obligations s'appliquent à partir du 1er
janvier 2027 [10]. La loi coréenne (version en vigueur depuis le 21 juillet 2026) s'étend aux actes
à l'étranger qui affectent le marché ou les utilisateurs coréens et exige un représentant national
pour les opérateurs étrangers au-dessus des seuils du décret (`Arts. 4`, `36`) [12]. La liste
ISO/IEC 22989 et sa clause (5.19) sont marquées pour vérification [13]. Voir
[chapitre 08](/bok/regulatory-map#us-federal-and-state-laws) et
[Lois sur l'IA dans le monde](/bok/ai-laws-worldwide#comparing-the-regimes) pour ces régimes en
contexte.

## Obligations du déployeur (Article 26)

L'article 26 est la liste du déployeur pour les systèmes à haut risque. Décomposée en
sous-obligations, chacune a un artefact [1] :

| Sous-obligation | Para. | Artefact | Couche |
|---|---|---|---|
| L'utiliser conformément à la notice d'utilisation | `26(1)` | Configuration de déploiement épinglée à la notice ; vérification de politique au déploiement | 1 · 2 |
| Désigner des superviseurs compétents, formés et habilités | `26(2)` | Registre de supervision lié aux registres de formation ; porte de contrôle humain | 4 · 5 |
| Maintenir les données d'entrée pertinentes et représentatives, où vous les contrôlez | `26(4)` | Vérifications des données d'entrée ; fiche de données de déploiement | 2 · 3 |
| Surveiller ; informer le fournisseur ; suspendre en cas de risque ; signaler les incidents graves | `26(5)` | Crochets de surveillance ; interrupteur de suspension ; pipeline d'incidents | 4 · 5 |
| Conserver les journaux au moins six mois | `26(6)` | Politique de rétention des journaux en tant que code | 4 |
| Informer les travailleurs et leurs représentants avant utilisation en milieu de travail | `26(7)` | Registre de notification et de consultation | 2 |
| Organismes publics : enregistrer l'utilisation ; ne jamais utiliser de systèmes non enregistrés | `26(8)` | Registre synchronisé avec l'identifiant de la base de données de l'UE | 2 |
| Alimenter les informations du `Art. 13`} du fournisseur dans l'AIPD | `26(9)` | AIPD faisant référence croisée à la notice d'utilisation | 1 · 2 |
| Après identification biométrique à distance : autorisation, journalisation, rapports | `26(10)` | Registre d'autorisation ; journal par utilisation | 5 |
| Informer les personnes soumises aux décisions de l'Annexe III | `26(11)` | [Avis de décision](/patterns/decision-notice-contest-path) au moment de la décision | 2 · 4 |
| Coopérer avec les autorités | `26(12)` | Export de preuves sur demande | 5 |

Les institutions financières satisfont aux obligations de surveillance et de journalisation par le
biais de leurs règles de gouvernance des services financiers [1]. La vue du déployeur sur les
systèmes achetés est développée dans
[gouvernance du déploiement](/bok/governing-deployment#operating-the-system).

> **En pratique (illustratif)**
> Dans un grand opérateur télécom, les obligations du déployeur ont cessé d'être un questionnaire
> une fois que chacune est devenue un champ de registre avec un propriétaire. `oversight_roster`
> pointait vers des personnes nommées dont la formation en littératie était actuelle ;
> `log_retention_days` était vérifiée par rapport au plancher de six mois par un test de politique ;
> {`worker_notice_ref`} était lié au registre de consultation avant qu'un outil de travail puisse
> être activé. La question d'audit « montrez-moi vos contrôles de l'article 26 pour ce système » est
> devenue une requête de registre par système.

## Analyse d'impact sur les droits fondamentaux (Article 27)

**Qui.** Avant de déployer un système de l'Annexe III (sauf point 2, infrastructure critique), une
AIPD est requise des déployeurs qui sont des organismes régis par le droit public ou des entités
privées fournissant des services publics, et des déployeurs de notation de crédit (point 5(b)) et de
tarification d'assurance-vie et santé (point 5(c)) [1].

**Quand.** Avant la première utilisation ; le déployeur peut s'appuyer sur des AIPD antérieures ou
sur l'analyse d'impact du fournisseur dans des cas similaires, et doit la mettre à jour quand un
élément change (`Art. 27(2)`) [1].

**Quoi.** Les processus du déployeur qui utilisent le système ; la période et la fréquence
d'utilisation ; les catégories de personnes affectées ; les risques spécifiques de préjudice pour
elles, en utilisant les informations du {`Art. 13`} du fournisseur ; les mesures de contrôle humain
; et les mesures si les risques se matérialisent, y compris la gouvernance interne et les mécanismes
de plainte (`Art. 27(1)(a)` à `(f)`) [1].

**Puis.** Le déployeur notifie l'autorité de surveillance du marché des résultats sur le modèle du
Bureau de l'IA (`Art. 27(3)`) [1]. Après l'Omnibus, il peut faire référence croisée ou inclure les
sections AIPD pertinentes, et le modèle doit le permettre (`Art. 27(4)`, `27(5)`) [2]. L'obligation
s'applique à partir du 2 décembre 2027 avec le régime de l'Annexe III [2]. Construisez-la en tant
que [gouvernance en tant que code](/patterns/fria-as-code) : un registre versionné généré à partir
du registre, de la notice d'utilisation et de l'AIPD, de sorte qu'une mise à jour soit une
différence, non une réécriture.

## Explication et notification aux personnes affectées

**Le droit à l'explication (`Art. 86`).** Une personne soumise à une décision d'un déployeur basée
sur la sortie d'un système à haut risque de l'Annexe III (sauf point 2), qui produit des effets
juridiques ou des effets similairement importants que la personne considère comme contraires à sa
santé, sa sécurité ou ses droits fondamentaux, peut obtenir « des explications claires et
significatives du rôle du système de IA dans la procédure de prise de décision et des éléments
principaux de la décision prise » [1]. Le droit cède aux exceptions du droit de l'Union ou national
et s'applique uniquement lorsque le droit de l'Union ne le prévoit pas déjà [1], ce qui est pourquoi
il doit être lu avec les droits du RGPD sur les décisions automatisées (voir
[confidentialité et IA](/bok/privacy-and-ai#the-regimes-side-by-side)).

L'artefact est un [**registre d'explication**](/patterns/explanation-artefact) par décision :
version du système et du modèle, les entrées ou codes de raison derrière la sortie, si la sortie
était déterminante ou consultatif, et la personne qui a décidé ; les méthodes sont dans
[équité et explicabilité](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records),
avec ce que le
[droit à l'explication (art. 86)](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
demande du contenu. Sur le calendrier, `Art. 86` se trouve au chapitre IX, qui s'applique à partir
du 2 août 2026, mais il n'a du travail à faire qu'une fois que les systèmes de l'Annexe III sont
réglementés à partir du 2 décembre 2027. C'est la lecture de ce chapitre ; confirmez-la avec votre
conseil (à vérifier).

**Les autres notifications.** Travailleurs avant utilisation en milieu de travail (`Art. 26(7)`) ;
personnes soumises aux décisions de l'Annexe III (`Art. 26(11)`) ; personnes exposées à la
reconnaissance d'émotions ou à la catégorisation biométrique (`Art. 50(3)`) ; et quiconque confronté
à une falsification profonde (`Art. 50(4)`) [1]. Toute personne peut se plaindre auprès d'une
autorité de surveillance du marché (`Art. 85`), et les lanceurs d'alerte signalant des violations de
la loi sont protégés en vertu de la directive (UE) 2019/1937 (`Art. 87`) [1].

## Maîtrise de l'IA et données de détection des biais

**Maîtrise de l'IA (`Art. 4`).** Depuis le 27 juillet 2026, les fournisseurs et déployeurs doivent «
prendre des mesures pour soutenir le développement de la maîtrise de l'IA » de leur personnel et
d'autres personnes opérant ou utilisant des systèmes de IA en leur nom, en tenant compte de leurs
connaissances, du contexte d'utilisation et des personnes affectées, sans avoir à garantir un niveau
spécifique [2]. Elle lie chaque fournisseur et déployeur à chaque échelon. L'artefact est un
programme de littératie basé sur les rôles dont les registres d'achèvement sont liés aux rôles du
registre, de sorte que personne n'est enregistré en tant que superviseur {`Art. 26(2)`} sans un
registre actuel.

**Données de détection des biais (`Art. 4a`).** Les fournisseurs de systèmes à haut risque peuvent
exceptionnellement traiter des catégories particulières de données à caractère personnel lorsque
cela est strictement nécessaire pour la détection et la correction des biais, si d'autres données (y
compris les données synthétiques ou anonymisées) ne fonctionneraient pas, les données sont
pseudonymisées, sécurisées, contrôlées d'accès et jamais transmises, elles sont supprimées une fois
le biais corrigé, et les registres de traitement expliquent pourquoi [2]. `Art. 4a(2)` étend la base
à d'autres systèmes et modèles de IA et aux déployeurs de systèmes à haut risque, sans créer
d'obligation [2]. L'artefact est une enclave contrôlée avec des journaux d'accès et suppression
automatique (voir
[gouvernance des données dans la stack](/bok/the-stack#data-governance-across-the-stack)).

## Bacs à sable et essais en conditions réelles

**Bacs à sable (`Arts. 57` à `59`).** Chaque État membre doit avoir au moins un bac à sable
réglementaire national de l'IA opérationnel d'ici le 2 août 2027, une date que l'Omnibus a reportée
du 2 août 2026 [1][2]. Le Bureau de l'IA peut gérer un bac à sable au niveau de l'Union pour les
systèmes relevant de sa compétence directe, en priorité pour les PME et PMC, et un plan de bac à
sable peut inclure des essais en conditions réelles [2]. `Art. 59` définit les conditions du
traitement ultérieur des données à caractère personnel dans un bac à sable pour les systèmes
d'intérêt public [1].

**Essais en conditions réelles (`Arts. 60`, `60a`, `61`).** Les fournisseurs peuvent tester les
systèmes de l'Annexe III, et après l'Omnibus les systèmes de l'Annexe I, Section A, en conditions
réelles en dehors d'un bac à sable [2]. Les conditions incluent un plan approuvé par l'autorité de
surveillance du marché, l'enregistrement avec un numéro d'identification au niveau de l'Union, un
maximum de six mois extensible de six, un consentement éclairé qui est daté et documenté, une
supervision efficace, des résultats qui peuvent être annulés, et {`Art. 73`} signalement des
incidents graves [1]. Les États membres peuvent autoriser les essais de produits de l'Annexe I,
Section B en vertu de cadres nationaux (`Art. 60a`) [2]. Un essai en conditions réelles est un
système de production avec des preuves supplémentaires : un plan en tant que code, des registres de
consentement, un chemin d'annulation et des crochets d'incidents.

## Gouvernance et application

### Qui supervise quoi

| Organisme | Niveau | Rôle | Base |
|---|---|---|---|
| Bureau de l'IA | Union | Fonction de la Commission ; supervise les modèles, codes et modèles de GPAI et, après l'Omnibus, certains systèmes de IA | `Arts. 3(47)`, `64`, `75`, `88` à `94` |
| Conseil européen de l'IA | Union | Un représentant par État membre ; observateur du CEPD ; Bureau de l'IA sans droit de vote | `Arts. 65`, `66` |
| Forum consultatif et panel scientifique | Union | Expertise des parties prenantes ; experts indépendants qui peuvent lever des alertes qualifiées sur le risque systémique de GPAI | `Arts. 67`, `68`, `90` |
| Autorités nationales compétentes | National | Au moins une autorité notifiante et une autorité de surveillance du marché, avec un point de contact unique | `Art. 70` |
| Autorités de surveillance du marché | National | Appliquer les règles relatives aux systèmes d'IA avec les pouvoirs du Règlement (UE) 2019/1020 et l'accès au code source sur demande motivée | `Art. 74` |
| Organismes notifiés | Désignées | Évaluation de la conformité par un tiers, délimitée par les codes de l'annexe XIV | `Arts. 28` à `39` |
| Organismes compétents en matière de droits fondamentaux | National | Obtenir la documentation par l'intermédiaire de l'autorité de surveillance du marché | `Art. 77` |

La surveillance du marché suit le secteur [1] : les autorités chargées des produits pour les
systèmes de l'annexe I, section A (`Art. 74(3)`), les autorités de surveillance financière pour les
institutions financières réglementées (`Art. 74(6)`), et les autorités chargées de la protection des
données ou autres autorités désignées pour la biométrie dans l'application de la loi, la gestion des
frontières et la justice, ainsi que pour les points 6 à 8 de l'annexe III (`Art. 74(8)`). Les codes
de l'annexe XIV et les règles `Art. 77` sont du texte Omnibus [2].

### Les pouvoirs directs du Bureau de l'IA (articles 75 et 75a à 75d)

L'Omnibus a rendu le Bureau de l'IA exclusivement compétent pour deux groupes de systèmes d'IA [2] :
les systèmes construits sur un modèle d'IA de usage général par le même fournisseur ou entreprise
(sauf les produits de l'annexe I, le point 2 de l'annexe III, les systèmes judiciaires du point 8,
et les systèmes d'application de la loi, de gestion des frontières et financiers du `Art. 74(6)`),
et les systèmes qui sont ou se trouvent à l'intérieur de plateformes en ligne très grandes désignées
ou de moteurs de recherche. La compétence couvre les fournisseurs, et les responsables du
déploiement uniquement au sein de la même entreprise [2].

Les articles 75a à 75d donnent au Bureau de l'IA les enquêtes, les demandes d'informations, les
inspections, les ordres de donner accès et des explications et de conserver les données (`Art. 75a`)
; les engagements contraignants (`Art. 75b`) ; les décisions de non-conformité avec des amendes de
`Art. 99` et des astreintes périodiques pouvant atteindre 5 % du revenu quotidien moyen ou du
chiffre d'affaires annuel mondial par jour (`Art. 75c`) ; et les droits de la défense et la
publication des décisions (`Art. 75d`) [2]. Ils se trouvent au chapitre IX, qui s'applique à partir
du 2 août 2026 [1][2]. Si vous construisez des systèmes sur votre propre modèle d'IA de usage
général, votre entrepôt de preuves doit répondre à Bruxelles aussi rapidement qu'une autorité
nationale.

### Sanctions

| Violation | Plafond | Base |
|---|---|---|
| Pratiques interdites en matière d'IA (`Art. 5`) | 35 millions EUR ou 7 % du chiffre d'affaires annuel mondial, le montant le plus élevé étant retenu | `Art. 99(3)` |
| Obligations des opérateurs : fournisseurs (`Art. 16`), mandataires (`22`), importateurs (`23`), distributeurs (`24`), responsables du déploiement (`26`), organismes notifiés, transparence (`50`) ; après l'Omnibus également `Art. 25(2)`, `25(4)` | 15 millions EUR ou 3 %, le montant le plus élevé étant retenu | `Art. 99(4)` |
| Informations incorrectes, incomplètes ou trompeuses fournies aux organismes notifiés ou aux autorités nationales | 7,5 millions EUR ou 1 %, le montant le plus élevé étant retenu | `Art. 99(5)` |
| PME et jeunes entreprises ; après l'Omnibus, PMC pour les deux niveaux inférieurs | Le montant le plus faible entre le montant et le pourcentage | `Art. 99(6)`, `99(6a)` |
| Fournisseurs de modèles d'IA de usage général, pour les violations intentionnelles ou par négligence | 3 % ou 15 millions EUR, le montant le plus élevé étant retenu, par décision de la Commission | `Art. 101` |
| Systèmes relevant de la compétence directe du Bureau de l'IA | Niveaux `Art. 99`, plus astreintes périodiques | `Art. 75c` |

Les niveaux sont énoncés aux `Arts. 99` et `101` [1], avec les ajouts de l'Omnibus aux `Arts. 75c`,
`99(4)(da)` et `99(6a)` [2]. Les États membres décident si et comment les organismes publics sont
sanctionnés (`Art. 99(8)`) [1]. Deux des facteurs que les autorités pèsent sont le degré de
responsabilité « en tenant compte des mesures techniques et organisationnelles mises en œuvre » et
si l'opérateur a lui-même notifié la violation (`Art. 99(7)(g)`, `(h)`) [1]. Votre preuve est aussi
votre argument d'atténuation.

## Le calendrier après l'Omnibus

| Date | Ce qui s'applique | Base |
|---|---|---|
| 2024-08-01 | Le Règlement entre en vigueur | `Art. 113` [1][2] |
| 2025-02-02 | Chapitres I et II : définitions, maîtrise de l'IA et interdictions initiales | `Art. 113(a)` [1] |
| 2025-08-02 | Règles relatives aux organismes notifiés, obligations relatives aux modèles d'IA de usage général, gouvernance, sanctions (sauf `Art. 101`) et confidentialité ; points de contact nationaux publiés | `Art. 113(b)`, `Art. 70(2)` [1] |
| 2026-07-27 | Omnibus en vigueur : `Art. 4` reformulé, nouveau `Art. 4a`, modifications d'autres actes (`Arts. 102` à `110`) | Omnibus `Art. 4` ; `Art. 113(d)` [2] |
| 2026-08-02 | Application générale : transparence {`Art. 50`}, amendes de la Commission aux fournisseurs de modèles d'IA de usage général, mesures du chapitre VI incluant les essais en conditions réelles, et le chapitre d'application incluant {`Arts. 75a`} à {`75d`} | `Art. 113` [1][2] |
| 2026-12-02 | Nouvelles interdictions {`Art. 5(1)(ba)`} et {`(bb)`} ; marquage {`Art. 50(2)`} pour les systèmes génératifs mis sur le marché avant le 2026-08-02 | `Art. 113(a)`, `Art. 111(4)` [2] |
| 2027-08-02 | Les modèles d'IA de usage général mis sur le marché avant le 2025-08-02 doivent être conformes ; bacs à sable réglementaires nationaux opérationnels ; actes délégués limitant les obligations pour les produits de l'annexe I, section A, attendus | `Arts. 111(3)`, `57(1)`, `2(13)` [1][2] |
| 2027-09-02 | Orientation de la Commission et modèle pour le plan de surveillance après commercialisation attendus | `Art. 72(3)` [2] |
| 2027-12-02 | Haut risque, annexe III : classification, exigences, obligations des fournisseurs et responsables du déploiement, analyse d'impact sur les droits fondamentaux | `Art. 113(c)(i)` [2] |
| 2028-01-28 | Les organismes notifiés de l'annexe I, section A, demandent leur désignation en vertu du Règlement | `Art. 43(3)` [2] |
| 2028-08-02 | Haut risque, annexe I (`Art. 6(1)`) | `Art. 113(c)(ii)` [2] |
| 2030-08-02 | Les systèmes haut risque existants destinés à être utilisés par les autorités publiques doivent être conformes | `Art. 111(2)` [2] |
| 2030-12-31 | Les composants des systèmes informatiques à grande échelle de l'annexe X mis sur le marché avant le 2027-08-02 doivent être conformes | `Art. 111(1)` [1] |

Les autres systèmes haut risque déjà sur le marché avant la date du chapitre III ne relèvent du
Règlement que si leur conception change considérablement après cette date (`Art. 111(2)` tel que
modifié) [2]. « Changement considérable de la conception » est donc un événement que le pipeline
doit enregistrer, avec le raisonnement, chaque fois qu'un système existant est modifié.

## Ce que vous pouvez faire cette semaine

1. **Ajoutez trois champs à chaque entrée du registre :** `eu_roles` (une liste, par système),
   `risk_rung` avec l'article qui l'y a placé, et `output_used_in_eu`. Exécutez
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) pour trouver les systèmes qui n'ont pas
   d'entrée.
2. **Rédigez l'enregistrement de la décision de classification** pour chaque candidat de l'annexe
   III, avec la condition `Art. 6(3)` sur laquelle on s'appuie et l'indicateur de profilage énoncé
   explicitement, et stockez-le à côté du système. Le
   [triage du règlement sur l'IA](/toolkit/ai-act-triage) en rédige un par rapport au
   [schéma](/schemas/classification-decision-record.v1.json).
3. **Mettre en place une barrière pour les interdictions du 2 décembre 2026.** Mettez
   {`Art. 5(1)(ba)`} et {`(bb)`} dans la liste de refus d'admission et ajoutez une suite
   adversariale pour tout générateur d'image, de vidéo ou de voix à la barrière d'évaluation avant
   cette date.
4. **Lisez vos conditions de fournisseur pour {`Art. 25`}.** Trouvez la clause qui exclut
   l'utilisation haut risque et l'accord écrit en vertu de {`Art. 25(4)`} ; ouvrez un ticket de
   diligence raisonnable partout où un composant haut risque n'en a ni l'un ni l'autre.
5. **Testez les surfaces {`Art. 50`} qui sont déjà en direct.** Vérifiez que chaque interface de
   chat divulgue l'utilisation de l'IA et que chaque générateur marque sa sortie, et classez le
   contrôle réussi comme preuve.

**Correspondances :** Règlement de l'UE sur l'IA {`Arts. 2`}, {`3`}, {`4`}, {`4a`}, {`5`}, {`6`},
{`8`} à {`27`}, {`43`} à {`50`}, {`51`} à {`57`}, {`60`} à {`61`}, {`72`} à {`75d`}, {`86`}, {`99`},
{`101`}, {`111`}, {`113`} (tel que modifié par le Règlement (UE) 2026/1744) · Code de pratique sur
l'IA de usage général · Code de pratique sur la transparence du contenu généré par l'IA · Colorado
SB 26-189 · Texas HB 149 · Loi fondamentale sur l'IA de la Corée · ISO/IEC 22989 · les cinq couches
du stack. Les mappages sont illustratifs, non une affirmation de conformité.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (original text: Arts. 2, 3, 5 to 27, 43, 49 to 61, 64 to 75, 85 to 87, 99, 101, 111, 113; Annexes I, III, VIII). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230; OJ L, 2026/1744, 24.7.2026; in force on the third day after publication (amended Arts. 2, 3(14), 4, 4a, 5, 6, 10, 11, 17, 25, 27, 42, 43, 50, 56, 57, 60, 60a, 63, 72, 75, 75a to 75d, 77, 99, 111, 113; Annexes I, VIII, XIV). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (seven elements; four out-of-scope families; non-binding; formal text C(2025) 5053 final). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[4] Commission Guidelines on prohibited artificial intelligence practices, as defined by the AI Act (non-binding; authoritative interpretation reserved to the CJEU). European Commission. 2025-02-04. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act (verified: primary)
[5] Draft Commission guidelines on the classification of high-risk AI systems (Art. 6; Annex I and Annex III sections; practical examples; draft for targeted consultation). European Commission. 2026-05-19. https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems (verified: primary)
[6] Guidelines for providers and deployers of AI high-risk systems (policy page: classification guidelines still in draft, consultation open until 23 July 2026; application dates 2 Dec 2027 and 2 Aug 2028). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems (verified: primary)
[7] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; 10^23 FLOP indicative criterion; one-third modification criterion; monetisation; notification within two weeks; fines from 2 Aug 2026). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[8] The General-Purpose AI Code of Practice (published 10 July 2025; Transparency, Copyright, and Safety and Security chapters; confirmed as an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[9] Code of Practice on Transparency of AI-generated Content (final version 10 June 2026; provider marking and detection, deployer labelling; confirmed as an adequate voluntary tool; Art. 50 guidelines: draft 8 May 2026, final 20 July 2026). European Commission. 2026-06-10. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content (verified: primary)
[10] SB26-189 Automated Decision-Making Technology (signed 14 May 2026; developer and deployer duties; covered technology from 1 Jan 2027; deployer records kept at least three years). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[11] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text (Sec. 552.001 definitions of developer and deployer). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[12] Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 21311 as amended 20 Jan 2026, version in force 21 Jul 2026 (Art. 2(7) to (9) roles; Art. 4 reach; Arts. 31 to 36 duties and domestic representative). Korea Ministry of Government Legislation (law.go.kr). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791 (verified: primary)
[13] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (edition 1; AI stakeholder roles). ISO/IEC JTC 1/SC 42. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[14] Guidelines on transparency obligations for providers and deployers of AI systems (Art. 50; final text after the draft of 8 May 2026; obligations apply from 2 Aug 2026). European Commission. 2026-07-20. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems (verified: primary)
