---
lang: fr
source: bok/20-existing-law.md
sourceHash: "179fe9816c0f1c18447beceee294f06e854a51817f689d791e15cd8e3e0a9b39"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 20. Autre droit qui s'applique déjà à l'IA

> Le droit d'auteur, la non-discrimination, la protection des consommateurs et la responsabilité du
> fait des produits lient déjà les systèmes d'IA ; ce chapitre mappe chaque obligation à son
> artefact de preuve et sa couche de stack.

Le Règlement sur l'IA est la couche de droit la plus récente sur les systèmes d'IA, pas la seule.
Quatre corps de droit plus anciens ont atteint l'IA en premier et sont appliqués contre elle
aujourd'hui : la propriété intellectuelle, la non-discrimination, la protection des consommateurs et
la responsabilité du fait des produits. Un régulateur américain a mis la prémisse en une ligne quand
il a lancé un balayage contre les affirmations trompeuses sur l'IA : « il n'y a pas d'exemption pour
l'IA aux lois en vigueur » [1]. Aucune de ces lois n'a été écrite pour les modèles, mais chacune
pose une question à laquelle un système d'IA doit répondre avec des preuves : avions-nous le droit
d'utiliser cette entrée, le système désavantage-t-il un groupe protégé, ce que nous en disons est-il
vrai, et était-il défectueux quand il a quitté notre contrôle.

Pour chaque corps de droit, le chapitre donne la doctrine en termes clairs, une comparaison UE /
États-Unis / Royaume-Uni datée, et l'artefact, la couche de stack (chapitre 04) et le motif
(chapitre 05) qui prouvent la conformité. Il se termine par les deepfakes et un modèle d'embauche
exécuté à travers cinq corps de droit à la fois.

Ce n'est pas un avis juridique. **Les fonctions de conformité et juridiques de l'IA** interprètent
ces obligations ; l'ingénieur transforme l'interprétation en un contrôle et un registre, et dépend
du conseil pour confirmer la lecture (voir
[le cluster de désambiguïsation](/bok/definition#the-disambiguation-cluster) et
[la traduction réglementaire](/bok/the-role#regulatory-translation)). Le droit de la protection des
données a son propre chapitre ([19](/bok/privacy-and-ai#how-to-read-this-chapter)), le Règlement sur
l'IA a le chapitre [18](/bok/eu-ai-act#how-to-read-this-chapter), et les statuts spécifiques à l'IA
dans le monde sont au chapitre [21](/bok/ai-laws-worldwide#the-landscape-at-a-glance), avec les
[règles sectorielles qui atteignent déjà l'IA](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai).
Chaque statut dans ce chapitre est horodaté au 2026-09-24 ; les affaires judiciaires et les délais
de transposition bougent, donc revérifiez avant de vous fier à une ligne.

## Comment lire ce chapitre

Chaque corps de droit pose une question à un système d'IA. Le tableau nomme l'artefact qui y répond
et sa couche dans [le stack](/bok/the-stack#how-to-read-the-stack) :
**1 Governance-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Corps de droit | La question qu'il pose à un système d'IA | Artefact de preuve primaire | Couche |
|---|---|---|---|
| Propriété intellectuelle | Avions-nous le droit d'utiliser chaque entrée, et une sortie copie-t-elle une expression protégée ? | [Registre des droits des données de formation](/patterns/training-data-rights-ledger) ; évaluation de mémorisation ; journal de filtre de sortie | 2 · 3 · 4 |
| Non-discrimination | Le système désavantage-t-il un groupe protégé d'une manière qu'il ne peut pas justifier ? | Évaluation d'impact par groupe ; journal de recherche pour des alternatives moins discriminatoires ; test de fidélité du code de raison | 3 · 5 |
| Protection des consommateurs | Ce que nous affirmons sur le système, ou ce que nous faisons par son interface, est-il trompeur ou injuste ? | Registre des affirmations lié aux exécutions d'évaluation ; registre d'examen de l'interface et de la divulgation | 1 · 3 · 5 |
| Responsabilité du fait des produits | Le système était-il défectueux quand il a quitté notre contrôle, et avons-nous averti de ses limites ? | FMEA ; AIBOM avec hashes ; historique d'évaluation ; journal des modifications ; instructions d'utilisation | 2 · 3 · 5 |
| Médias synthétiques | Le média généré est-il marqué, divulgué et supprimable sur demande ? | Marquage de provenance à la génération ; pipeline de suppression avec une horloge | 4 · 5 |

Trois mises en garde traversent le chapitre.

- **La juridiction décide de la réponse.** La même exécution d'entraînement peut être légale dans un
  pays et contrefaisante dans un autre, donc les artefacts enregistrent *où* les données ont été
  copiées, un modèle entraîné et un système placé sur le marché.
- **La preuve que vous conservez est une preuve que vous pouvez être ordonné de produire.** En vertu
  du nouveau régime de responsabilité du fait des produits de l'UE, un tribunal peut ordonner à un
  défendeur de divulguer des preuves pertinentes, et le défaut de le faire déclenche une présomption
  que le produit était défectueux [2]. Un dossier de défense incomplet ou inexact joue contre vous.
  Conservez-le complet, versionné et honnête.
- **Les mappages sont illustratifs, non une affirmation de conformité.** Un artefact soutient et
  prouve une obligation ; que l'obligation soit remplie est un jugement juridique.

## Propriété intellectuelle

La propriété intellectuelle touche un système d'IA en quatre points : les œuvres copiées pour
l'entraîner, ses sorties, les informations confidentielles qui lui sont fournies, et les inventions
qu'il aide à réaliser. À chaque point, l'ingénieur enregistre ce qui s'est passé, où et sous quel
droit.

### Droit d'auteur et données de formation

Copier une œuvre dans un corpus d'entraînement est, en apparence, une reproduction. La question
juridique est de savoir si une exception (la route de l'UE, du Royaume-Uni et du Japon) ou une
défense (la route des États-Unis) la couvre.

**Union européenne.** La directive sur le marché unique numérique (DSM) crée deux exceptions
d'extraction de texte et de données (TDM). L'article 3 permet aux organismes de recherche et aux
institutions du patrimoine culturel d'exploiter les œuvres pour la recherche scientifique. L'article
4 est l'exception générale : quiconque peut copier les œuvres légalement accessibles pour le TDM et
conserver les copies aussi longtemps que nécessaire, sauf si le titulaire des droits a expressément
réservé cet usage « d'une manière appropriée, comme par des moyens lisibles par machine dans le cas
de contenu mis à disposition publiquement en ligne » [3]. Le Règlement sur l'IA transforme cet
opt-out en obligation du fournisseur : l'article 53(1)(c) exige que chaque fournisseur de modèle
d'IA à usage général (GPAI) mette en place une politique de droit d'auteur qui identifie et respecte
les réserves de l'article 4(3), et l'article 53(1)(d) exige un résumé public du contenu
d'entraînement sur le modèle du Bureau de l'IA [4]. La Commission a publié ce modèle le 24 juillet
2025 [5]. L'exemption open-source de l'article 53(2) lève uniquement les obligations de
documentation des points (a) et (b), donc les modèles open-weight doivent toujours la politique de
droit d'auteur et le résumé [4]. Le Code de pratique GPAI transforme la politique en cinq mesures :
une politique écrite, un accès légal (pas de contournement de paywall, pas de sites persistamment
contrefaisants), des crawlers qui respectent `robots.txt`, des garanties contre les sorties
contrefaisantes, et un contact pour les plaintes [6].

Les tribunaux remplissent les détails. Dans *Kneschke v LAION*, la Cour régionale supérieure
hanséatique a jugé le 10 décembre 2025 que la construction de l'ensemble de données LAION-5B
relevait des exceptions TDM allemandes, et qu'une réserve écrite en langage naturel dans les
conditions du site n'était pas lisible par machine ; elle a autorisé un appel supplémentaire à la
Cour fédérale de justice [7]. Dans *GEMA v OpenAI*, la Cour régionale de Munich a jugé le 11
novembre 2025 que les paroles de chansons mémorisées dans les paramètres d'un modèle sont des
reproductions, que l'exception TDM couvre les copies préparatoires mais pas l'incorporation à long
terme des œuvres dans le modèle, et que les sorties reproduisant les paroles sont la responsabilité
du fournisseur [8] ; vérifiez si un appel est en attente avant de vous y fier (vérifier). La Cour de
justice a entendu sa première affaire de droit d'auteur sur l'IA générative, *Like Company v Google*
(C-250/25), le 10 mars 2026, sur la question de savoir si l'entraînement est une reproduction, si
l'article 4 la couvre et si les réponses des chatbots reproduisant le contenu de presse sont une
communication au public. Un avis d'avocat général était prévu pour le 3 septembre 2026 ; le jugement
est en attente au 2026-09-24 [9] (vérifiez l'avis).

**États-Unis.** Il n'y a pas d'exception TDM. L'entraînement est jugé selon l'utilisation équitable,
qui pèse quatre facteurs : le but et le caractère de l'utilisation (y compris si elle est
transformatrice), la nature de l'œuvre, la quantité utilisée et l'effet sur le marché de l'œuvre
[10]. Les affaires jusqu'à présent tournent sur leurs faits ; elles sont tabulées ci-dessous.

**Royaume-Uni.** L'exception TDM du Royaume-Uni couvre les copies réalisées pour une analyse
informatique « dans le seul but de la recherche à titre non commercial » [11]. Le rapport statutaire
du gouvernement du 18 mars 2026 n'a pas retenu l'exception d'opt-out sur laquelle il avait consulté
; il propose de rassembler des preuves supplémentaires et de développer la transparence des données
d'entrée par les bonnes pratiques plutôt que par la loi [12] [13]. Dans *Getty Images v Stability
AI*, le jugement de la Haute Cour de novembre 2025 a rejeté la demande de contrefaçon secondaire
concernant un modèle entraîné à l'étranger, au motif que les poids du modèle n'étaient pas une «
copie contrefaisante » ; l'autorisation d'appel sur ce point a été accordée, et l'appel est en
attente [14].

**Japon.** L'article 30-4 de la Loi sur le droit d'auteur permet l'exploitation d'une œuvre lorsque
l'objectif n'est pas de jouir de son expression, comme l'entraînement de l'IA, sauf si cela «
porterait atteinte de manière déraisonnable aux intérêts du titulaire du droit d'auteur ». La
*Compréhension générale* non contraignante du Bureau du droit d'auteur du Japon (mai 2024) place en
dehors de l'article 30-4 l'entraînement visant à produire l'expression des œuvres d'entraînement
(surapprentissage délibéré, ajustement fin imitatif, génération augmentée par récupération qui
produit la source), et la copie d'une base de données vendue pour analyse tout en contournant des
mesures telles que `robots.txt` dans la clause de réserve [15].

| Question (au 2026-09-24) | EU | États-Unis | Reino Unido | Japon |
|---|---|---|---|---|
| L'entraînement commercial sur des œuvres légalement accessibles est-il autorisé sans licence ? | Oui, en vertu de l'art. 4 de la DSM, sauf réserve [3] | Seulement si utilisation équitable, décidée au cas par cas [10] | Pas d'exception générale ; l'art. 29A concerne uniquement la recherche non commerciale [11] | Oui, à des fins de non-jouissance, sous réserve de la clause de réserve [15] |
| Comment un titulaire de droits peut-il se retirer ? | Réserve expresse, lisible par machine pour le contenu en ligne [3] | Pas d'opt-out statutaire | Non applicable ; exception d'opt-out non adoptée [12] | Pas d'opt-out ; les mesures techniques importent à la clause de réserve [15] |
| Obligation pour le prestataire de publier les informations d'entraînement ? | Oui pour les prestataires de GPAI : résumé de l'art. 53(1)(d) [4] | Pas d'obligation fédérale | Pas d'obligation statutaire [13] | Non |

### h3: Cas d'entraînement américains, datés

Chaque jugement s'est fondé sur son propre dossier ; aucun n'est une règle pour chaque modèle.

| Cas | Cour | Ce qui a été décidé | Estado (a partir de 2026-09-24) |
|---|---|---|---|
| *Thomson Reuters v. ROSS Intelligence* | D. Del. ; 3d Cir. No. 25-2153 | La copie de notes de synthèse pour construire un outil de recherche juridique concurrent et non génératif n'était pas une utilisation équitable (11 février 2025) [16] | Appel interlocutoire plaidé le 11 juin 2026 ; décision en attente [17] |
| *Bartz v. Anthropic* | N.D. Cal. | L'entraînement sur des livres légalement acquis était une utilisation équitable ; conserver une bibliothèque centrale de copies piratées ne l'était pas (23 juin 2025) [18] | Règlement collectif de 1,5 milliard USD finalement approuvé le 20 juillet 2026 ; libération limitée à la conduite passée, réclamations relatives aux résultats préservées [18] [19] |
| *Kadrey v. Meta* | N.D. Cal. | Jugement sommaire partiel en faveur de Meta sur l'utilisation équitable pour l'entraînement, sur le dossier que les demandeurs ont constitué (25 juin 2025) [20] | Jugement limité à ces demandeurs et à ce dossier [20] |
| *New York Times v. Microsoft and OpenAI* | S.D.N.Y. | Réclamations concernant l'entraînement sur et la reproduction d'articles d'actualité | En attente au jugement sommaire ; le Département de la justice des États-Unis a déposé en soutien des défendeurs en septembre 2026 [21] |
| *Andersen v. Stability AI* | N.D. Cal. | Réclamations d'artistes visuels concernant l'entraînement et la distribution de modèles d'images | En attente ; procès devant jury reporté au 20 septembre 2027 [22] |
| *Disney Enterprises v. Midjourney* | C.D. Cal. | Réclamations des studios concernant l'entraînement et les résultats de personnages (déposées le 11 juin 2025) | En attente [23] |

Trois leçons d'ingénierie découlent de ces cas et de ceux de l'UE.

- **La façon dont vous avez acquis les données importe.** *Bartz* a séparé l'achat légal et la
  numérisation du téléchargement de copies piratées [18], de sorte que le registre des droits
  enregistre le canal d'acquisition, et non seulement la licence.
- **La mémorisation est l'exposition du côté des résultats.** *GEMA* s'est concentrée sur les
  paroles que le modèle pouvait reproduire [8] ; une évaluation de la mémorisation détecte cette
  exposition avant qu'un demandeur ne la découvre.
- **Les opt-outs sont lus par les machines au moment de l'exploration.** *LAION* et le Code reposent
  tous deux sur des signaux lisibles par machine [7] [6] ; la politique du crawler est du code et
  ses décisions sont des journaux.

### h3: Résultats : mémorisation et propriété

**Résultats contrefaisants.** Les modèles de langage peuvent retourner des séquences d'entraînement
rares verbatim sur des requêtes ciblées, et les modèles plus grands sont plus exposés [24]. Les
contrôles se situent dans deux couches : une évaluation qui sonde la régurgitation avant la mise en
production (couche 03) et un filtre de résultats qui bloque la reproduction quasi-verbatim de corpus
protégés ou de code sous licence en production (couche 04), les garanties que le Code de pratique
demande [6].

**Qui possède un résultat.** Aux États-Unis, le droit d'auteur exige un auteur humain. La Cour du
circuit du D.C. l'a jugé le 18 mars 2025 dans *Thaler v. Perlmutter* [25], et la Cour suprême a
refusé d'examiner l'affaire le 2 mars 2026 [26]. Le rapport sur la protégeabilité du Bureau du droit
d'auteur des États-Unis (29 janvier 2025) traite les invites seules comme insuffisantes pour la
paternité, tandis que les contributions expressives humaines, la sélection et l'arrangement, et la
modification de la production de l'IA peuvent être protégés ; ses directives d'enregistrement de
mars 2023 exigent que les demandeurs divulguent le matériel généré par l'IA [27]. Son rapport sur
l'entraînement (partie 3) est toujours une version de pré-publication [27]. Le Royaume-Uni est
l'exception : pour une œuvre générée par ordinateur, l'auteur est « la personne par laquelle les
dispositions nécessaires à la création de l'œuvre sont prises » [11].

Pour l'ingénieur, la propriété est un problème de provenance : protéger un actif qu'un modèle a aidé
à créer nécessite un enregistrement de la contribution humaine (invites, sélection, modifications,
qui et quand), ce qui soutient également la divulgation qu'un enregistrement demande.

### h3: Droits des bases de données et secrets commerciaux

**Droit des bases de données.** L'UE confère au créateur d'une base de données un droit sui generis
contre l'extraction ou la réutilisation de tout ou d'une partie substantielle de son contenu,
lorsque le créateur a investi substantiellement dans l'obtention, la vérification ou la présentation
de celui-ci [28]. L'extraction d'une base de données pour l'entraînement est une extraction ;
l'article 4 de la DSM la couvre aux mêmes conditions que le droit d'auteur, y compris la réserve
[3].

**Secrets commerciaux et fuite par les invites.** Un secret commercial n'est protégé que tant que
son titulaire prend des « mesures raisonnables » (UE) ou des « mesures raisonnables » (États-Unis)
pour le garder secret [29] [30]. Deux chemins de l'IA mettent cette condition en danger : le
personnel collant du code, des prix ou des données clients dans un modèle tiers dont les conditions
permettent la conservation ou l'entraînement, et l'ajustement fin sur du matériel confidentiel que
les attaques d'extraction peuvent récupérer ultérieurement [24]. Un enregistrement ne montrant aucun
contrôle du tout est un mauvais début dans l'un ou l'autre cas. Les artefacts sont ordinaires et bon
marché : une règle de prévention de la perte de données devant chaque point de terminaison de modèle
externe (couche 04, [Runtime Guardrail](/patterns/runtime-guardrail)) ; un enregistrement du
prestataire des conditions de conservation et de non-entraînement, vérifié à la
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) ; et une balise de
classification des données sur chaque ensemble d'ajustement fin, de sorte qu'un secret n'entre
jamais dans un pipeline d'entraînement sans une décision enregistrée.

### h3: Brevets et inventivité de l'IA

Les demandes DABUS, dans lesquelles un système d'IA a été nommé comme seul inventeur, ont échoué
partout où elles ont été testées. La Cour fédérale des États-Unis a jugé le 5 août 2022 qu'un
inventeur doit être une personne physique [31] ; la Cour suprême du Royaume-Uni a atteint le même
résultat le 20 décembre 2023 [32] ; et la Chambre de recours juridique de l'OEB a jugé le 21
décembre 2021 qu'« une machine n'est pas un inventeur » en vertu de la CBE [33]. Pour les inventions
assistées par l'IA, l'USPTO a annulé ses directives de février 2024 le 28 novembre 2025 et les a
remplacées : l'IA est traitée comme tout autre outil, et le test de conception ordinaire s'applique
aux humains impliqués [34].

L'artefact est un enregistrement d'invention qui capture la conception humaine (qui a formulé le
problème et reconnu la solution) aux côtés des outils et des données d'entrée de l'IA utilisés.

### h3: Licences de modèles et indemnités des prestataires

**Les poids ouverts ne sont pas la même chose que l'open source.** De nombreux modèles à poids
ouverts sont fournis sous des licences avec des restrictions d'utilisation. La licence Llama 3.1,
par exemple, incorpore une politique d'utilisation acceptable et exige une licence séparée de Meta
pour les titulaires de licence dont les produits ont dépassé 700 millions d'utilisateurs actifs
mensuels à la date de la mise en production [35]. La définition de l'Open Source Initiative, en
revanche, exige la forme préférée pour la modification : les informations de données, le code et les
paramètres [36]. L'allègement open source de la Loi sur l'IA est encore plus étroit et ne couvre
jamais les obligations de droit d'auteur [4].

Le contrôle est un champ de licence sur chaque modèle et ensemble de données dans
l'[AIBOM](/patterns/aibom), plus une politique qui bloque un déploiement dont le cas d'usage viole
la politique d'utilisation de la licence ou le seuil commercial (couche 01). Une licence lue une
fois à l'approvisionnement et jamais plus n'est pas un contrôle.

**Les indemnités sont conditionnelles, et les conditions sont des contrôles d'exécution.**
L'engagement de Microsoft en matière de droit d'auteur Copilot (7 septembre 2023), par exemple, est
conditionné par l'utilisation par le client des garde-fous intégrés et des filtres de contenu et par
le fait de ne pas tenter de générer du matériel contrefaisant [37]. Désactiver les filtres pour
réduire les faux positifs peut désactiver l'indemnité. Enregistrez la portée et les conditions à la
porte de diligence raisonnable, et conservez les instantanés de configuration et les journaux de
filtrage qui montrent que les conditions ont été respectées lorsque la sortie a été produite.

### h3: Artefacts qui attestent la conformité en matière de propriété intellectuelle

| Artefact | Ce qu'il enregistre | Couche | Motif |
|---|---|---|---|
| Registre des droits des données d'entraînement | Par ensemble de données : source, canal d'acquisition, licence, vérification de réserve TDM (résultat, méthode, date), lieu de copie | 2 | [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); [AIBOM](/patterns/aibom) |
| Politique du crawler en tant que code | Respect de `robots.txt` et d'autres réserves lisibles par machine ; pas de contournement de paywall ; liste de blocage des sites contrefaisants | 1 | [Policy Card](/patterns/policy-card) |
| Évaluation de la mémorisation et de la régurgitation | Sondes d'extraction et seuils de chevauchement verbatim par version de modèle | 3 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| Journal du filtre de résultats | Résultats quasi-verbatim bloqués ; correspondances de licence sur le code généré | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| Politique de droit d'auteur et résumé d'entraînement | Politique versionnée de l'art. 53(1)(c) et résumé de l'art. 53(1)(d) pour les prestataires de GPAI | 5 | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Registre des licences et indemnités | Licences de modèles et d'ensembles de données, politiques d'utilisation, portée et conditions d'indemnité | 2 · 5 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| Règle DLP d'invite | Secrets et code source bloqués ou expurgés avant les appels externes | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |

> **En pratique (illustratif)**
> Un assistant de récupération pour l'équipe commerciale d'un éditeur a été construit sur un corpus
> assemblé par trois équipes différentes. Le registre des droits a été ajouté après coup : une ligne
> par source, avec son canal d'acquisition et sa licence. Deux sources n'avaient pas de licence
> enregistrée et une avait été extraite d'un site dont `robots.txt` interdisait l'agent utilisateur
> du crawler. La construction du corpus échoue désormais quand une source manque une ligne du
> registre, les décisions allow/deny du crawler sont enregistrées par URL, et les deux sources sans
> licence ont été supprimées et l'index reconstruit, la reconstruction étant enregistrée par rapport
> au même identifiant de registre.

## Non-discrimination

Le droit antidiscrimination ne demande pas si un modèle est juste en abstrait. Il demande si une
décision dans un domaine réglementé a traité un groupe protégé plus mal, et si la pratique qui l'a
causée peut être justifiée. Le travail d'ingénierie consiste à mesurer l'effet dans les termes de la
loi et à conserver la justification avec la mesure.

### Traitement différencié, impact disparate et variables de substitution

**Deux théories.** Le *traitement différencié* consiste à traiter quelqu'un différemment en raison
d'une caractéristique protégée. L'*impact disparate* est une pratique neutre qui affecte plus
durement un groupe protégé. En vertu du Titre VII, un demandeur prouve l'impact en montrant qu'une
pratique particulière le cause ; l'employeur doit alors montrer que la pratique est « liée à
l'emploi pour le poste en question et conforme à la nécessité commerciale » ; et le demandeur peut
toujours gagner en montrant une pratique d'emploi alternative ayant moins d'impact que l'employeur
refuse d'adopter [38]. Le droit de l'UE trace la même ligne entre discrimination directe et
indirecte : un critère apparemment neutre qui place un groupe « dans une situation particulièrement
désavantageuse » est illégal « sauf si cette disposition, ce critère ou cette pratique est
objectivement justifié par un objectif légitime et que les moyens de réaliser cet objectif sont
appropriés et nécessaires » [39] [40].

**La posture d'application n'est pas le statut.** Aux États-Unis, le décret exécutif 14281 du 23 avr
2025 ordonne aux agences fédérales de déprioritiser l'application des statuts et règlements dans la
mesure où ils incluent la responsabilité pour impact disparate [41], et le HUD a proposé de
supprimer ses règlements sur l'impact disparate de la Fair Housing Act, avec une proposition
supplémentaire dont la période de commentaires s'étend jusqu'au 9 oct 2026 [42]. Pour le crédit, le
mouvement va au-delà de la posture : le CFPB a modifié le Règlement B, avec effet à partir du 21
juil 2026, pour déclarer que l'ECOA n'autorise pas la responsabilité pour impact disparate (le «
test des effets »), laissant les règles d'action négative en 12 CFR 1002.9 inchangées [83]. Le texte
du Titre VII sur l'impact disparate est inchangé [38], les actions privées continuent (voir *Mobley*
ci-dessous) et le droit de l'UE et des États ne sont pas affectés, donc le test d'impact reste pour
l'emploi, en vertu du droit des États et de l'UE ; dans le crédit américain, il ne repose plus sur
le Règlement B [83].

**Variables de substitution.** Supprimer l'attribut protégé ne supprime pas l'effet : le code
postal, le nom, l'école ou les lacunes de carrière peuvent porter la même information. L'aveuglement
rend aussi le test plus difficile, car vous ne pouvez pas mesurer une disparité entre des groupes
que vous n'avez pas enregistrés ; pour tester, vous devez traiter l'attribut. Après l'Omnibus
numérique, le nouvel article 4a du Règlement sur l'IA donne aux fournisseurs de systèmes à haut
risque une base pour traiter les données de catégories particulières pour la détection des biais,
avec pseudonymisation et suppression une fois le biais corrigé [43]. Le chapitre
[16](/bok/fairness-and-explainability#group-fairness-metrics) couvre les métriques elles-mêmes ;
cette section couvre ce que la loi les lira contre.

### Emploi

**États-Unis.** Le Titre VII s'applique au dépistage par IA comme à toute autre procédure de
sélection [38], et les fournisseurs ne sont pas à l'abri de la loi fédérale sur la discrimination
fondée sur l'âge : dans *Mobley c. Workday*, le tribunal a conditionnellement certifié une action
collective nationale en discrimination fondée sur l'âge contre le fournisseur d'un système de
dépistage des candidats le 16 mai 2025 [44]. La Loi locale 144 de New York est la règle la plus
concrète spécifique à l'IA : un employeur ne peut pas utiliser un outil de décision d'emploi
automatisé à moins qu'il n'ait eu un audit de biais au cours de l'année précédente, le résumé de
l'audit soit publié, et les candidats soient notifiés 10 jours ouvrables avant l'utilisation ;
l'application a commencé le 5 juil 2023 [45]. L'audit, réalisé par un tiers indépendant, rapporte
les taux de sélection et les ratios d'impact par sexe, par race et ethnicité et par leur
intersection [46]. L'Illinois a modifié sa Loi sur les droits de l'homme pour atteindre
l'utilisation discriminatoire de l'IA par les employeurs, rapportée comme effective à partir du 1er
jan 2026 (à vérifier).

**Union européenne.** Les directives sur l'égalité raciale et l'emploi interdisent la discrimination
directe et indirecte dans l'accès à l'emploi, les conditions de travail et le licenciement [39]
[40]. Le Règlement sur l'IA énumère le recrutement, la sélection, la promotion, le licenciement,
l'allocation des tâches et le suivi du rendement comme à haut risque (Annexe III, point 4) [47], les
obligations des systèmes de l'Annexe III à haut risque étant reportées par l'Omnibus au 2 déc 2027
[48]. La directive sur le travail de plateforme (UE) 2024/2831, à transposer avant le 2 déc 2026, va
plus loin pour les plateformes de travail numérique : pas de traitement automatisé de l'état
émotionnel ou des conversations privées d'un travailleur, et pas d'inférence de caractéristiques
protégées (art. 7) ; information écrite sur les systèmes automatisés et leurs paramètres principaux
(art. 9) ; une évaluation d'impact, y compris sur l'égalité de traitement, au moins tous les deux
ans, et une décision humaine pour toute suspension ou résiliation de compte (art. 10) ; et un droit
à une explication et un examen, avec rectification dans deux semaines (art. 11) [49].

### Crédit et prêt

**États-Unis.** Quand un créancier prend une action négative, le Règlement B exige une déclaration
des raisons spécifiques, ou un avis du droit de les recevoir [50]. La Circulaire 2022-03 du CFPB a
déclaré en 2022 que les créanciers utilisant des algorithmes complexes, y compris l'IA ou
l'apprentissage automatique, doivent toujours fournir les raisons principales spécifiques [51] ; le
CFPB a retiré la circulaire le 12 mai 2025 [84], mais le devoir du Règlement B est inchangé
[50][83]. Quand la décision repose sur un rapport de consommateur, l'FCRA ajoute ses propres
obligations d'action négative [52]. La conséquence d'ingénierie est précise : les raisons dans
l'avis doivent être les raisons que le modèle a utilisées, donc un code de raison produit par une
méthode d'attribution est testé pour sa fidélité par rapport à chaque version du modèle (chapitre 16
sur les
[avis d'action négative](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)).

**Union européenne.** La deuxième directive sur le crédit à la consommation (UE) 2023/2225 exige une
évaluation de la solvabilité sur la base d'informations pertinentes et exactes, sans données de
catégories particulières ou réseaux sociaux comme source (art. 18(3)). Quand l'évaluation est
automatisée, le consommateur peut obtenir une intervention humaine : une explication de l'évaluation
et de sa logique, une chance d'exprimer son point de vue, et un examen (art. 18(8)). Les États
membres devaient adopter les règles avant le 20 nov 2025 et les appliquer à partir du 20 nov 2026
[53] (vérifier la transposition nationale et tout changement à la date d'application). La notation
de la solvabilité est également à haut risque en vertu du Règlement sur l'IA (Annexe III, point
5(b)), la détection de fraude étant exclue [47] ; les règles de protection des données sur les
décisions automatisées sont au chapitre [19](/bok/privacy-and-ai#automated-decision-making).

### Logement, assurance et services publics

**Logement.** La Fair Housing Act atteint les algorithmes de diffusion d'annonces : dans un
règlement de 2022 avec le Département de la justice américain, Meta a accepté d'abandonner son outil
« Special Ad Audience » et de construire un système pour réduire la variance dans la diffusion
d'annonces de logement entre les groupes [54]. Dans l'UE, la directive sur l'égalité raciale couvre
l'accès aux biens et services disponibles pour le public, y compris le logement [39].

**Assurance.** Le SB21-169 du Colorado (signé le 6 juil 2021) interdit aux assureurs de discriminer
injustement par le biais de données de consommateurs externes, d'algorithmes et de modèles
prédictifs, et exige un cadre de gestion des risques, une évaluation et un suivi, et une attestation
par un directeur des risques en chef, selon les règles que le commissaire adopte ligne d'assurance
par ligne [55] (vérifier les lignes couvertes et les dates d'entrée en vigueur des règles de mise en
œuvre au 2026-09-24). Le bulletin modèle de la NAIC du 4 déc 2023 s'attend à ce que les assureurs
maintiennent un programme écrit pour l'utilisation responsable des systèmes d'IA, y compris la
surveillance des systèmes d'IA tiers et des données [56]. Dans l'UE, la Cour de justice a jugé dans
*Test-Achats* que la dérogation permettant les différences de primes d'assurance fondées sur le sexe
était invalide à compter du 21 déc 2012 [57], et le Règlement sur l'IA énumère l'évaluation des
risques et la tarification dans l'assurance-vie et l'assurance-maladie comme à haut risque (Annexe
III, point 5(c)) [47].

**Services publics.** Les décisions d'admissibilité à l'aide publique sont à haut risque en vertu du
Règlement sur l'IA (Annexe III, point 5(a)) [47]. Dans l'affaire *Bridges* au Royaume-Uni, la Cour
d'appel a constaté que la police « n'avait jamais cherché à s'assurer, directement ou par
vérification indépendante, que le programme logiciel en question n'avait pas de biais inacceptable
fondé sur la race ou le sexe », une violation du devoir d'égalité du secteur public [58]. L'artefact
manquant était un test de biais que le responsable du déploiement possédait.

### Mesures d'équité que la loi reconnaît

La loi ne choisit pas une seule métrique d'équité, mais plusieurs de ses tests sont quantitatifs.
Chacun correspond à une évaluation et un enregistrement.

| Test juridique | Ce qu'il demande | Évaluation (couche 03) | Enregistrement de preuve (couche 05) |
|---|---|---|---|
| Règle des quatre-cinquièmes (procédures de sélection américaines) | Un taux de sélection inférieur à 80 % de celui du groupe le plus élevé est généralement une preuve d'impact adverse ; les écarts plus petits peuvent toujours compter [59] | Ratio d'impact adverse par groupe, avec tailles d'échantillon et test de signification | Résultat d'évaluation signé par version de modèle, dans la fiche de modèle |
| Impact disparate du Titre VII | Impact causé par une pratique ; nécessité commerciale ; alternative moins discriminatoire [38] | Métriques d'impact ; validation de la pertinence pour l'emploi ; recherche entre modèles candidats | Journal des alternatives considérées et pourquoi chacune a été rejetée |
| Loi locale 144 de New York | Ratios d'impact par sexe, race et ethnicité, et catégories intersectionnelles, par un auditeur indépendant [46] | Le même calcul sur des données historiques ou de test | Résumé d'audit publié avec sa date ; enregistrement d'avis aux candidats |
| Discrimination indirecte de l'UE | Désavantage particulier ; justification objective ; moyens appropriés et nécessaires [39] | Métriques de disparité de groupe plus une analyse de nécessité | Section de justification dans l'[EIPD](/patterns/fria-as-code) ou la DPIA |
| Action négative (ECOA, FCRA) | Raisons principales spécifiques de la décision [50] [52] | Test de fidélité du code de raison par rapport au modèle | Résultat d'évaluation du code de raison et version du modèle d'avis |
| CCD2 art. 18(8) | Explication, intervention humaine et examen [53] | [Artefact d'explication](/patterns/explanation-artefact) par version de modèle | Journal d'examen avec résultat et examinateur |

La règle des quatre cinquièmes est une règle empirique pour les agences d'application, non un refuge
sûr [59]. Traitez un ratio d'impact supérieur à 0,8 comme un succès d'une vérification, non comme
une preuve de conformité. Le chapitre 16 le calcule et le rapporte avec des comptages et des
intervalles
([impact disparate et la règle des quatre cinquièmes](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)).

> **En pratique (illustratif)**
> Une équipe de recrutement a déployé un modèle de classement des fournisseurs à New York et dans
> deux pays de l'UE. L'audit de biais du fournisseur avait un an et avait été calculé sur les
> données d'un autre client. L'équipe a réexécuté les ratios d'impact sur son propre flux de
> candidats mensuellement, comme une évaluation de pipeline avec un plancher de 0,8 qui alertait le
> propriétaire. Au mois trois, une catégorie intersectionnelle est tombée à 0,71 ; la cause était
> une nouvelle fonctionnalité « années d'expérience continue » qui pénalisait les interruptions de
> carrière. La fonctionnalité a été supprimée, le journal de recherche a enregistré les alternatives
> testées, et un résumé d'audit actualisé a été publié avant le prochain cycle.

## Protection des consommateurs

Le droit de la protection des consommateurs atteint l'IA par trois portes, sans statut spécifique à
l'IA : ce que vous affirmez sur le système, comment son interface traite les gens, et ce qu'il fait
de leurs données. Ce qu'un chatbot dit à un client engage l'entreprise qui l'a déployé :
[Moffatt c. Air Canada](/cases/moffatt-v-air-canada) est l'affaire documentée comme autopsie.

### ### Pratiques déloyales et trompeuses aux États-Unis

L'article 5 de la loi FTC interdit les actes ou pratiques déloyaux ou trompeurs. Une pratique est
déloyale seulement si elle cause ou est susceptible de causer un « préjudice substantiel aux
consommateurs qui n'est pas raisonnablement évitable par les consommateurs eux-mêmes et n'est pas
compensé par des avantages contraires » [60]. La tromperie, selon la déclaration de politique de la
FTC de 1983, est une représentation, une omission ou une pratique susceptible d'induire en erreur un
consommateur agissant raisonnablement et qui est matérielle [61]. Une affirmation de performance
d'IA sans preuve derrière elle est trompeuse exactement en ce sens [62].

- **Affirmations de performance non substantiées.** Workado a affirmé que son détecteur de contenu
  IA était exact à 98 % ; les tests ont mis la précision sur le contenu à usage général à 53 %, car
  le modèle a été entraîné sur du texte académique. L'ordonnance exige des preuves compétentes et
  fiables pour de telles affirmations [62]. Le balayage de septembre 2024, Operation AI Comply, a
  ciblé un service de « robot avocat » parmi d'autres [1].
- **Déploiement sans garanties raisonnables.** Rite Aid est interdite pendant cinq ans d'utiliser la
  reconnaissance faciale pour la sécurité ou la surveillance, après que la FTC ait allégué qu'elle
  avait déployé la technologie sans procédures raisonnables pour prévenir les préjudices aux
  consommateurs [63].
- **Restitution algorithmique.** Quand une entreprise entraîne sur des données qu'elle a obtenues
  illégalement, le recours peut atteindre le modèle. L'ordonnance Everalbum définit « Affected Work
  Product » comme « tous les modèles ou algorithmes développés en tout ou en partie en utilisant »
  les données biométriques, et exige sa suppression dans les 90 jours avec une déclaration
  assermentée [64].
- **Greenwashing d'IA.** En mars 2024, la SEC s'est entendue avec deux conseillers en investissement
  sur de fausses affirmations concernant leur utilisation de l'IA, pour 400 000 USD de pénalités
  combinées [65].
- **Faux avis et bots.** La règle de la FTC sur les avis des consommateurs (16 CFR Part 465)
  interdit les faux avis, y compris les avis générés par l'IA attribués à des personnes qui
  n'existent pas, avec des pénalités civiles [66]. La Californie rend illégal l'utilisation d'un bot
  pour tromper une personne sur son identité artificielle afin de vendre quelque chose ou
  d'influencer un vote, sauf si le bot est divulgué clairement et de manière visible [67].

Les priorités d'application changent avec les administrations ; le statut et les ordonnances
ci-dessus ne changent pas. Une affirmation a besoin de preuves quand elle est faite, et un modèle
entraîné sur des données entachées peut être ordonné d'être détruit.

### ### L'UE : UCPD, DSA et le règlement sur l'IA

La directive sur les pratiques commerciales déloyales interdit les pratiques contraires à la
diligence professionnelle et qui dénaturent matériellement, ou sont susceptibles de dénaturer, le
comportement économique du consommateur moyen, jugé du point de vue d'un groupe vulnérable où il est
ciblé [68]. Depuis les amendements de 2019, sa liste noire comprend l'affirmation que les avis
proviennent d'utilisateurs réels sans mesures raisonnables pour vérifier, et la soumission ou la
commande de faux avis [69]. La loi sur les services numériques ajoute des règles spécifiques aux
plateformes : les plateformes en ligne ne peuvent pas concevoir des interfaces qui trompent ou
manipulent les utilisateurs ou altèrent leurs décisions libres et éclairées (art. 25) ; les
plateformes doivent expliquer les principaux paramètres de leurs systèmes de recommandation
(art. 27) ; et l'atténuation des risques des très grandes plateformes comprend le marquage en
évidence des médias générés ou manipulés qui ressemblent de manière appréciable à des personnes ou
des événements réels (art. 35(1)(k)) [70]. Le règlement sur l'IA interdit les systèmes d'IA qui
utilisent des techniques manipulatrices ou trompeuses, ou exploitent les vulnérabilités, pour
dénaturer le comportement de manière à causer un préjudice significatif (art. 5(1)(a)–(b)) [71], et
exige que les gens soient informés quand ils interagissent avec un système d'IA sauf si c'est
évident (art. 50(1)) [72].

### ### Royaume-Uni : loi DMCC

En vertu de la Digital Markets, Competition and Consumers Act 2024, l'interdiction générale des
pratiques commerciales déloyales s'applique depuis le 6 avr 2025 (s. 225), et les pratiques toujours
réputées déloyales comprennent les faux avis de consommateurs et les avis qui dissimulent une
incitation (Sch. 20, para. 13) [73].

| Pratique (au 2026-09-24) | États-Unis | Union européenne | Reino Unido | Artefact de preuve | Couche |
|---|---|---|---|---|---|
| Affirmation de précision ou d'équité non substantiée | FTC Act s. 5 ; ordonnance Workado [62] | Clause générale UCPD [68] | DMCC s. 225 [73] | [Registre des affirmations](/patterns/claims-substantiation-gate) lié aux exécutions d'évaluation | 3 · 5 |
| Faux avis générés par l'IA | 16 CFR Part 465 [66] | UCPD Annex I, 23b–23c [69] | DMCC Sch. 20, para. 13 [73] | Politique bloquant la génération d'avis ; journal de provenance | 1 · 4 |
| Bot non divulgué | Cal. BPC s. 17941 [67] | AI Act Art. 50(1) [72] | Pas de règle spécifique aux bots ; s. 225 peut s'appliquer [73] | Contrôle de divulgation et un test qui le rend | 4 |
| Interface ou sortie manipulatrice | FTC Act s. 5 déloyauté [60] | DSA Art. 25 [70] ; AI Act Art. 5(1)(a)–(b) [71] | s. 225 [73] | Examen de l'interface ; évaluation red-team pour la manipulation | 3 · 5 |
| Modèle construit sur des données obtenues illégalement | Suppression de « Affected Work Product » [64] | Recours en matière de protection des données (chapitre 19) | Recours en matière de protection des données (chapitre 19) | Lignée du dataset à chaque modèle entraîné sur celui-ci | 2 |

### ### Substantiation des affirmations et restitution algorithmique

**Un registre des affirmations.** Chaque déclaration publique sur la précision, l'équité,
l'autonomie ou la capacité « alimentée par l'IA » est une ligne : l'affirmation, où elle apparaît,
l'exécution d'évaluation qui la soutient, les données sur lesquelles elle a été mesurée, et la date.
Workado a échoué sur les deux dernières colonnes : la mesure ne correspondait pas à la population
que l'affirmation décrivait [62]. Une version de modèle réexécute l'évaluation et revalide chaque
affirmation qui la cite ; une affirmation obsolète ou défaillante est supprimée de la copie. Ceci
est proposé ici comme un nouveau motif, la
[**Claims Substantiation Gate**](/patterns/claims-substantiation-gate) : une
[eval gate](/patterns/eval-gate-in-ci) pointée vers la copie marketing.

**Lignée prête pour la suppression.** Un ordre de supprimer « des modèles ou algorithmes développés
en tout ou en partie en utilisant » certaines données [64] ne peut être respecté et prouvé que si
vous savez quels modèles ont touché les données. C'est un [AIBOM](/patterns/aibom) avec lignée de
dataset jusqu'à la version, plus le
[registre des droits des données de formation](/patterns/training-data-rights-ledger). Sans cela, la
seule réponse sûre à un ordre de restitution est de tout supprimer.

## Responsabilité du fait des produits

La responsabilité des produits demande si un produit était défectueux et si le défaut a causé le
préjudice. Pour l'IA, les nouvelles questions sont si le logiciel est un produit, qui le contrôle
après son expédition, et ce qu'un défaut est dans quelque chose qui apprend et se met à jour.

### ### La directive révisée de l'UE sur la responsabilité du fait des produits

La directive révisée sur la responsabilité du fait des produits, (UE) 2024/2853, a été adoptée le 23
oct 2024 et publiée le 18 nov 2024. Les États membres doivent la transposer avant le 9 déc 2026, et
elle s'applique aux produits mis sur le marché ou mis en service après cette date [2]. Ses
principaux changements pour l'IA :

- **Le logiciel est un produit** (art. 4(1)) ; les considérants nomment l'IA parmi les raisons de la
  révision, et les logiciels libres et open-source fournis en dehors d'une activité commerciale sont
  exclus (art. 2(2)) [2].
- **Le défaut est jugé en tenant compte de l'apprentissage et des mises à jour.** Les facteurs
  incluent « l'effet sur le produit de toute capacité à continuer à apprendre ou à acquérir de
  nouvelles fonctionnalités après sa mise sur le marché », les exigences de sécurité pertinentes y
  compris la cybersécurité, et le moment où le produit a quitté le contrôle du fabricant (art. 7(2))
  [2]. Le contrôle continue tant que le fabricant peut fournir des mises à jour logicielles (art.
  4(5)) [2].
- **Les mises à jour rouvrent le dossier.** La défense selon laquelle un défaut est survenu après la
  mise sur le marché ne s'applique pas lorsque, dans le contrôle du fabricant, le défaut est dû au
  logiciel ou à ses mises à jour, une mise à jour de sécurité manquante, ou une modification
  substantielle (art. 11(2)) [2]. Quiconque modifie substantiellement un produit en dehors du
  contrôle du fabricant en devient le fabricant (art. 8(2)) [2].
- **Divulgation et présomptions.** Un tribunal peut ordonner au défendeur de divulguer les preuves
  pertinentes, avec protection des secrets commerciaux (art. 9). Le défaut est présumé si le
  défendeur ne divulgue pas, si le produit viole les exigences de sécurité obligatoires, ou si le
  dommage provient d'un dysfonctionnement évident ; et un tribunal doit présumer le défaut ou la
  causalité lorsque le demandeur fait face à une difficulté excessive, notamment en raison de la
  complexité technique ou scientifique, et montre que l'un ou l'autre est probable (art. 10) [2].
- **Dommage et délai.** Le dommage indemnisable couvre la mort, les blessures corporelles y compris
  les préjudices psychologiques médicalement reconnus, les dommages aux biens et la destruction ou
  la corruption de données non utilisées à des fins professionnelles (art. 6). Les réclamations
  expirent 10 ans après la mise sur le marché, redémarrant à partir d'une modification
  substantielle, ou 25 ans pour les blessures corporelles latentes (art. 17) [2].

La proposition parallèle de directive sur la responsabilité en matière d'IA, qui aurait facilité les
réclamations fondées sur la faute, a été retirée : annoncée dans le programme de travail 2025 de la
Commission, publiée au Journal officiel le 6 oct 2025 [74]. Les réclamations en matière d'IA fondées
sur la faute restent du ressort du droit de la responsabilité civile nationale.

### ### Théories de responsabilité civile aux États-Unis

La responsabilidad civil por productos en EE.UU. reconoce tres tipos de defectos: defectos de
fabricación en algunas unidades, defectos de diseño inherentes al diseño, y defectos de
comercialización, que cubren instrucciones inadecuadas y fallos en advertir de peligros latentes;
los tribunales prueban los defectos de diseño por las expectativas del consumidor, ponderando el
riesgo frente a la utilidad, o ambos [75]. Si el software, y en particular un chatbot, es un
"producto" es controvertido y se decide caso por caso. En *Garcia v. Character Technologies*, una
demanda por muerte injusta sobre una aplicación de chatbot de compañía presentada como
responsabilidad civil por productos, el tribunal resolvió en parte y denegó en parte las mociones
para desestimar el 21 de mayo de 2025, y el caso fue resuelto y desestimado sin perjuicio el 7 de
enero de 2026 [76]; check reporta que las teorías de responsabilidad civil por productos
sobrevivieron contra la orden en sí (verificar).

### La revisión de responsabilidad civil por productos del Reino Unido

La Law Commission está revisando el régimen de la Consumer Protection Act 1987, incluyendo
expresamente productos digitales e IA; los términos de referencia fueron publicados el 8 de
diciembre de 2025 y se planifica una consulta para la segunda mitad de 2026 [77].

### Tipos de defectos mapeados a modos de fallo de IA

Cada categoría legal se corresponde con modos de fallo de ingeniería y un artefacto que muestra si
ocurrieron.

| Tipo de defecto | Qué significa para un sistema de IA | Evidencia que lo responde | Couche |
|---|---|---|---|
| Fabricación | El sistema desplegado se aparta de su propio diseño: versión de modelo incorrecta, pesos corruptos, guardrail mal configurado, tubería de datos rota | AIBOM con hashes; registro de despliegue firmado; alertas de desviación de configuración | 2 · 4 · 5 |
| Conception | El diseño en sí es inseguro para un uso previsible, y una alternativa más segura estaba razonablemente disponible: condiciones de operación no probadas, sin guardrail, sin supervisión humana donde sea necesaria | FMEA; matriz de cobertura de evals; resultados de red team; revisión de diseño con alternativas consideradas | 1 · 3 |
| Advertencia (comercialización) | Los límites conocidos y los usos fuera del alcance no fueron divulgados | [Ficha de modelo](/patterns/model-card-as-control-evidence); instrucciones de uso; avisos en el producto, todos versionados | 2 · 5 |
| Actualización (Art. 11(2) de la UE) | Una actualización introdujo el defecto, o una actualización de seguridad que era necesaria no fue distribuida | Registro de cambios; evals de regresión por versión; registros de decisión de parches | 3 · 4 · 5 |

### Deber de advertencia después de actualizaciones

Una actualización de modelo es una nueva versión. Bajo el régimen de la UE el fabricante responde
por los defectos que las actualizaciones causan, o que una actualización de seguridad faltante deja
en su lugar, mientras el sistema esté bajo su control [2]; las teorías estadounidenses de fallo en
advertir llegan al mismo punto [75]. Así que las advertencias viajan con versiones: la ficha de
modelo e instrucciones de uso se regeneran en cada versión, las notas de versión listan limitaciones
conocidas y comportamiento cambiado, y el monitoreo de campo alimenta el
[Incident Pipeline](/patterns/incident-pipeline), así que un nuevo peligro produce una decisión
(parche, advertencia, retirada) con un propietario y una fecha (capítulo
[17](/bok/incidents#the-response-lifecycle)).

### El archivo de defensa

Un archivo de defensa por versión de producto contiene:

- un **análisis de modos de fallo y efectos** en la forma que describe el estándar IEC 60812, con
  modos de fallo de IA (cambio de distribución, inyección de prompts, hechos alucinados, uso
  inseguro de herramientas) como filas [78];
- el **AIBOM** para la versión, con hashes de modelo, conjunto de datos y dependencias;
- el **historial de evals**: cada resultado de gate para esta y versiones anteriores, incluyendo
  fallos y las correcciones que siguieron;
- **registros de tiempo de ejecución firmados** para las decisiones en cuestión, retenidos para el
  período de reclamación;
- las **advertencias tal como se distribuyeron**: ficha de modelo, instrucciones de uso y avisos en
  el producto en esa versión.

El archivo corta de ambas formas: un demandante puede obtener divulgación, y una brecha puede en sí
misma plantear una presunción de defecto [2]. Mantenlo completo y recuperable durante al menos el
período de vencimiento de 10 años [2]; como
[evidencia legible por máquina](/patterns/machine-readable-evidence-oscal), la divulgación se
convierte en una consulta en lugar de un proyecto.

## Ultrasuplantaciones y medios sintéticos

Los medios sintéticos se extienden por la protección del consumidor, la privacidad y la ley penal.
Tres regímenes establecen el piso.

- **Unión Europea.** Los proveedores de sistemas generativos deben marcar las salidas de forma
  legible por máquina y detectable (Art. 50(2) del Reglamento de IA), y los responsables del
  despliegue deben divulgar ultrasuplantaciones, con reglas más ligeras para trabajos evidentemente
  artísticos, satíricos o ficticios (Art. 50(4)) [72]. El artículo 50 ha sido aplicable desde el 2
  de agosto de 2026 [79], con un período de gracia de marcado hasta el 2 de diciembre de 2026 para
  sistemas generativos introducidos en el mercado antes del 2 de agosto de 2026 (Art. 111(4)) [43].
  El ómnibus digital también añadió una prohibición dirigida a la generación de IA de imágenes
  íntimas no consentidas y material de abuso sexual infantil, aplicable desde el 2 de diciembre de
  2026 [43]. Las plataformas muy grandes deben marcar medios generados o manipulados de forma
  destacada como parte de su mitigación de riesgos de la DSA [70].
- **Estados Unidos.** La TAKE IT DOWN Act (Public Law 119-12, 19 de mayo de 2025) convierte en
  delito federal publicar intencionadamente imágenes íntimas no consentidas, incluyendo
  "falsificaciones digitales", y requiere que las plataformas cubiertas ejecuten un proceso de
  notificación y eliminación (dentro de un año de la promulgación) que elimine el contenido
  reportado en 48 horas, aplicado por la FTC [80]. Las leyes estatales sobre ultrasuplantaciones y
  derechos de imagen varían (verificar los estados relevantes para cada despliegue).
- **Reino Unido.** Compartir una fotografía o película íntima que "muestre, o parezca mostrar" a
  otra persona sin consentimiento ha sido un delito desde el 31 de enero de 2024 [81], y la Data
  (Use and Access) Act 2025 añadió un delito de crear una supuesta imagen íntima de un adulto [82].

Los artefactos son marcado de procedencia en el punto de generación (por ejemplo credenciales de
contenido o marcas de agua, capa 04), una eval de detección para la supervivencia del marcado a
través de transformaciones comunes (capa 03), y una ruta de eliminación con un reloj de 48 horas, un
propietario y un registro (capa 05, construida sobre el
[Incident Pipeline](/patterns/incident-pipeline)).

## Un modelo de contratación a través de cinco cuerpos de ley

Un único sistema generalmente responde a varios de estos cuerpos de ley a la vez, así que sus
artefactos deben compartir un id de registro.

> **Exemple (illustratif)**
> Un empleador en Nueva York y la UE despliega un modelo de un proveedor que clasifica solicitantes
> para entrevistas. Una entrada de registro responde cinco preguntas legales.

| Corps de droit | La pregunta para este sistema | Artefacto, clave del id de registro | Couche |
|---|---|---|---|
| Reglamento de IA (capítulo [18](/bok/eu-ai-act#deployer-duties-article-26)) | Anexo III punto 4 alto riesgo: ¿se cumplen los deberes del responsable del despliegue, y ha suministrado el proveedor su evidencia? [47] | Entrada de registro con rol (responsable del despliegue); documentación del proveedor recopilada en el gate de due diligence; diseño de supervisión humana | 2 · 5 |
| Protección de datos (capítulo [19](/bok/privacy-and-ai#automated-decision-making)) | ¿Es el tratamiento lícito y están salvaguardadas las decisiones automatizadas? | AIPD; aviso a candidato; ruta de revisión | 1 · 5 |
| Non-discrimination | ¿Hay impacto adverso, está justificada la práctica, y se buscaron alternativas? [38] [45] [39] | Eval de ratio de impacto mensual; resumen de auditoría publicado; registro de búsqueda | 3 · 5 |
| Protection des consommateurs | ¿Está sustanciada la afirmación "sin sesgo" del proveedor, repetida en nuestros materiales de candidato? [62] | Fila de registro de reclamaciones citando nuestra propia ejecución de eval, no el folleto del proveedor | 3 · 5 |
| Responsabilité du fait des produits | ¿Es la directiva la ruta para un candidato rechazado? | Generalmente no: sus cabezas de daño (lesión, propiedad, datos) no incluyen discriminación [2], así que la exposición corre a través de la ley de igualdad y contrato | 5 |

La última fila es la sorpresa útil: para un modelo de contratación la ley que muerde es igualdad y
protección de datos, no responsabilidad civil por productos; para un asistente de triaje médico el
balance se invierte. Escribir esta tabla por sistema, antes de construir controles, decide dónde va
el presupuesto de evidencia.

## Ce que vous pouvez faire cette semaine

1. **Añade cuatro campos a la ficha de datos de cada conjunto de datos**: fuente, canal de
   adquisición, licencia, y el resultado y fecha de la verificación de reserva de TDM. Falla la
   tubería cuando alguno esté vacío.
2. **Busca en tu copia pública** (sitio web, presentaciones de ventas, fichas de modelo)
   afirmaciones numéricas o absolutas como "99% preciso", "sin sesgo" o "totalmente autónomo".
   Vincula cada una a un id de ejecución de eval, o elimínala.
3. **Calcula ratios de impacto adverso por grupo** para cada modelo de selección, elegibilidad o
   fijación de precios que ejecutes, con tamaños de muestra, y almacénalos en la ficha de modelo
   para la versión actual.
4. **Pon una regla de prevención de pérdida de datos delante de cada endpoint de modelo externo**
   para secretos y código fuente, y registra qué proveedores tienen términos de no entrenamiento y
   retención.
5. **Abre un archivo de defensa para tu próxima versión de IA**: AIBOM con hashes, historial de
   evals, una FMEA, las instrucciones de uso y las notas de versión, con un período de retención de
   al menos 10 años.

**Correspondances :** Art. 4a, 5, 50, 53(1)(c)–(d) del Reglamento de IA de la UE, Anexo III puntos
4–5 · Arts. 3–4 de la Directiva DSM · PLD (UE) 2024/2853 · Directiva de Trabajo en Plataformas (UE)
2024/2831 · Art. 18 de CCD2 · UCPD · Arts. 25, 27, 35 de la DSA · s. 5 de la FTC Act · s. 703(k) del
Título VII · 29 CFR 1607.4(D) · Regulación B · NYC LL144 · TAKE IT DOWN Act · DMCC Act 2024 · las
cinco capas del stack (capítulo 04). Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"; DoNotPay "robot lawyer" proposed order). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] Directive (EU) 2024/2853 on liability for defective products (Art. 2 scope and FOSS exclusion; Art. 4 software as a product and manufacturer's control; Art. 6 damage; Art. 7 defectiveness incl. ability to continue to learn; Art. 8(2) substantial modification; Art. 9 disclosure; Art. 10 presumptions; Art. 11(2) updates; Art. 17 expiry; Art. 22 transposition by 9 Dec 2026; OJ L 18 Nov 2024). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[3] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market, Arts. 3 and 4 (TDM for scientific research; general TDM exception subject to a reservation "in an appropriate manner, such as machine-readable means"). Official Journal of the EU. 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI providers: 53(1)(c) copyright policy honouring Art. 4(3) DSM reservations; 53(1)(d) public summary of training content; 53(2) open-source relief limited to points (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[5] "Commission presents template for General-Purpose AI model providers to summarise the data used to train their model" (template for the Art. 53(1)(d) public summary). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their (verified: primary)
[6] GPAI Code of Practice, Copyright chapter (Measures 1.1 to 1.5: copyright policy; lawful access without circumventing effective technological measures and excluding persistently infringing sites; robots.txt compliance; safeguards against infringing outputs; point of contact and complaints). Code of Practice text as published 10 Jul 2025. 2025-07-10. https://code-of-practice.ai/?section=copyright (verified: secondary)
[7] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[8] "German court rules in favour of music rights management organisation against OpenAI" (GEMA v. OpenAI, Munich Regional Court I, 11 Nov 2025; memorisation in model parameters as reproduction; TDM exception limited to preparatory copies; decision open to appeal). European Commission, European IP Helpdesk. 2025-11-14. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/german-court-rules-favour-music-rights-management-organisation-against-openai-nyt-vs-openai-dispute-2025-11-14_en (verified: secondary)
[9] "CJEU Grand Chamber rules on music sampling and pastiche; first CJEU hearing on generative AI and copyright: Like Company v Google" (C-250/25; hearing 10 Mar 2026; questions on reproduction in training, DSM Art. 4 and chatbot outputs; Advocate General opinion scheduled for 3 Sep 2026). European Commission, European IP Helpdesk. 2026-04-24. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/cjeu-grand-chamber-rules-music-sampling-and-pastiche-first-cjeu-hearing-generative-ai-and-copyright-2026-04-24_en (verified: secondary)
[10] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title17/html/USCODE-2024-title17-chap1-sec107.htm (verified: primary)
[11] Copyright, Designs and Patents Act 1988, s. 29A (copies for text and data analysis for non-commercial research) and s. 9(3) (author of a computer-generated work). legislation.gov.uk. current. https://www.legislation.gov.uk/ukpga/1988/48/section/29A (verified: primary)
[12] Report and Impact Assessment on Copyright and Artificial Intelligence (published under ss. 135 and 136 of the Data (Use and Access) Act 2025). UK Government, GOV.UK. 2026-03-18. https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence (verified: primary)
[13] "Copyright and artificial intelligence: analysing the UK government's March 2026 reports" (opt-out TDM exception previously favoured not taken forward; further evidence to be gathered; input transparency through best practice rather than statute). VWV. 2026-03. https://www.vwv.co.uk/insights/articles/copyright-and-artificial-intelligence-analysing-the-uk-governments-march-2026-reports (verified: secondary)
[14] "High Court grants permission to appeal in Getty Images v Stability AI" (secondary infringement and the meaning of "infringing copy" for an AI model; Stability refused permission on the trade mark findings). Wiggin LLP. 2026-01. https://www.wiggin.co.uk/insight/high-court-grants-permission-to-appeal-in-getty-images-v-stability-ai/ (verified: secondary)
[15] "General Understanding on AI and Copyright in Japan": Overview (Art. 30-4 non-enjoyment purpose and its proviso; fine-tuning and RAG that output training expression fall outside Art. 30-4; database works and robots.txt; not legally binding). Japan Copyright Office, Agency for Cultural Affairs. 2024-05. https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf (verified: primary)
[16] Thomson Reuters Enterprise Centre GmbH v. ROSS Intelligence Inc., No. 1:20-cv-00613 (D. Del.), Memorandum Opinion (Bibas, J.). CourtListener (court docket). 2025-02-11. https://www.courtlistener.com/docket/17131648/thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc/ (verified: primary)
[17] "Third Circuit Hears Oral Argument in Ross v. Reuters AI Training Copyright Case" (No. 25-2153; argued 11 Jun 2026; first federal appeal on fair use in AI training). Baker Botts. 2026-07. https://www.bakerbotts.com/thought-leadership/publications/2026/july/third-circuit-hears-oral-argument (verified: secondary)
[18] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[19] "Court Grants Final Approval of $1.5 Billion Anthropic Copyright Settlement" (release limited to past acquisition and copying through 25 Aug 2025; output claims preserved). The Authors Guild. 2026-07. https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/ (verified: secondary)
[20] Kadrey v. Meta Platforms, Inc., No. 3:23-cv-03417 (N.D. Cal.), Order denying the plaintiffs' motion and granting Meta's cross-motion for partial summary judgment (Chhabria, J., ECF 598). CourtListener (court docket). 2025-06-25. https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/ (verified: primary)
[21] "DOJ urges judge to rule for OpenAI, Microsoft in N.Y. Times lawsuit" (summary-judgment stage; first US government position on AI-training copyright litigation). The Washington Post. 2026-09-02. https://www.washingtonpost.com/technology/2026/09/02/doj-urges-judge-rule-openai-microsoft-ny-times-lawsuit/ (verified: secondary)
[22] Andersen v. Stability AI Ltd., No. 3:23-cv-00201 (N.D. Cal.), Order regarding case schedule (Orrick, J., ECF 597; jury trial reset to 20 Sep 2027). CourtListener (court docket). 2026-06-15. https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/ (verified: primary)
[23] Disney Enterprises Inc. v. Midjourney Inc., No. 2:25-cv-05275 (C.D. Cal.), complaint (ECF 1). CourtListener (court docket). 2025-06-11. https://www.courtlistener.com/docket/70513159/disney-enterprises-inc-v-midjourney-inc/ (verified: primary)
[24] Extracting Training Data from Large Language Models (Carlini et al.; verbatim training sequences recovered from GPT-2; larger models more vulnerable; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[25] Thaler v. Perlmutter, No. 23-5233 (human authorship required for copyright registration). US Court of Appeals for the D.C. Circuit. 2025-03-18. https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf (verified: primary)
[26] "Supreme Court Denies Cert in AI Authorship Case" (Thaler v. Perlmutter; certiorari denied 2 Mar 2026). Mayer Brown. 2026-03. https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case (verified: secondary)
[27] Copyright and Artificial Intelligence (Part 2, Copyrightability, 29 Jan 2025; Part 3, Generative AI Training, pre-publication version 9 May 2025; registration guidance for works containing AI-generated material, 16 Mar 2023). U.S. Copyright Office. 2025. https://copyright.gov/ai/ (verified: primary)
[28] Directive 96/9/EC on the legal protection of databases, Art. 7 (sui generis right against extraction and re-utilisation of a substantial part). Official Journal of the EU. 1996-03-11. https://eur-lex.europa.eu/eli/dir/1996/9/oj (verified: primary)
[29] Directive (EU) 2016/943 on the protection of undisclosed know-how and business information (trade secrets), Art. 2(1) ("reasonable steps under the circumstances" to keep information secret). Official Journal of the EU. 2016-06-08. https://eur-lex.europa.eu/eli/dir/2016/943/oj (verified: primary)
[30] 18 U.S.C. § 1839(3) (trade secret: the owner "has taken reasonable measures to keep such information secret"). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title18/html/USCODE-2024-title18-partI-chap90-sec1839.htm (verified: primary)
[31] Thaler v. Vidal, No. 2021-2347 (inventors under the Patent Act must be natural persons). US Court of Appeals for the Federal Circuit. 2022-08-05. https://cafc.uscourts.gov/opinions-orders/21-2347.OPINION.8-5-2022_1988142.pdf (verified: primary)
[32] Thaler v Comptroller-General of Patents, Designs and Trade Marks [2023] UKSC 49 (DABUS cannot be an inventor under the Patents Act 1977). UK Supreme Court. 2023-12-20. https://www.supremecourt.uk/cases/uksc-2021-0201 (verified: primary)
[33] J 8/20 (DABUS; "A machine is not an inventor within the meaning of the EPC"). EPO Legal Board of Appeal. 2021-12-21. https://www.epo.org/en/boards-of-appeal/decisions/j200008eu1 (verified: primary)
[34] Revised Inventorship Guidance for AI-Assisted Inventions, 90 FR 54636 (rescinds the 13 Feb 2024 guidance; AI as a tool; ordinary conception standard). USPTO, Federal Register. 2025-11-28. https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions (verified: primary)
[35] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated; separate licence required above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[36] The Open Source AI Definition 1.0 (use, study, modify, share; preferred form for modification: data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[37] "Microsoft announces new Copilot Copyright Commitment for customers" (defence and payment of adverse judgments; conditional on using built-in guardrails and content filters and not attempting to generate infringing material). Microsoft On the Issues. 2023-09-07. https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/ (verified: primary)
[38] 42 U.S.C. § 2000e-2(k) (Title VII s. 703(k): burden of proof in disparate-impact cases; business necessity; alternative employment practice). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[39] Council Directive 2000/43/EC implementing the principle of equal treatment irrespective of racial or ethnic origin, Art. 2(2)(b) (indirect discrimination; objective justification) and Art. 3(1)(h) (goods and services, including housing). Official Journal of the EU. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj (verified: primary)
[40] Council Directive 2000/78/EC establishing a general framework for equal treatment in employment and occupation. Official Journal of the EU. 2000-11-27. https://eur-lex.europa.eu/eli/dir/2000/78/oj (verified: primary)
[41] Executive Order 14281, Restoring Equality of Opportunity and Meritocracy (s. 4: agencies to deprioritise enforcement of disparate-impact liability; FR Doc. 2025-07378). The White House, via GovInfo (Federal Register). 2025-04-23. https://www.govinfo.gov/content/pkg/FR-2025-04-28/html/2025-07378.htm (verified: primary)
[42] HUD's Implementation of the Fair Housing Act's Disparate Impact Standard: proposed rule (FR Doc. 2026-00590, 14 Jan 2026) and supplemental proposed rule (FR Doc. 2026-16228; comments due 9 Oct 2026). US Department of Housing and Urban Development, Federal Register. 2026-08-10. https://www.federalregister.gov/documents/2026/08/10/2026-16228/huds-implementation-of-the-fair-housing-acts-disparate-impact-standard-amendments-to-huds-title-vi (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a special-category data for bias detection in high-risk systems; Art. 5(1)(ba) and (bb) prohibitions on NCII and CSAM generation, applying from 2 Dec 2026 under Art. 113(a); Art. 111(4): Art. 50(2) marking deadline of 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[44] Mobley v. Workday, Inc., No. 3:23-cv-00770 (N.D. Cal.), Order granting preliminary collective certification (Lin, J., ECF 128). CourtListener (court docket). 2025-05-16. https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/ (verified: primary)
[45] Automated Employment Decision Tools (Local Law 144 of 2021 and 6 RCNY 5-300: bias audit within one year before use, published summary, notice 10 business days before use; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[46] Automated Employment Decision Tools: Frequently Asked Questions (bias audit by an independent third party; selection rates and impact ratios by sex, race/ethnicity and intersectional categories). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[47] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, points 4 and 5 (employment, workers management; public assistance eligibility; creditworthiness, fraud detection excepted; risk assessment and pricing in life and health insurance). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[48] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[49] Directive (EU) 2024/2831 on improving working conditions in platform work, Arts. 7 (limits on processing), 9 (transparency), 10 (human oversight), 11 (human review) and 29 (transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[50] 12 CFR § 1002.9 (Regulation B notifications: statement of specific reasons for adverse action). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[51] Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms (withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14; the circular's page carries no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[52] 15 U.S.C. § 1681m(a) (FCRA duties of users taking adverse action on the basis of consumer reports). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII-sec1681m.htm (verified: primary)
[53] Directive (EU) 2023/2225 on credit agreements for consumers, Art. 18 (creditworthiness assessment; 18(3) no special-category data, social networks not an external source; 18(8) human intervention and explanation) and Art. 48 (adopt by 20 Nov 2025, apply from 20 Nov 2026). Official Journal of the EU. 2023-10-18. https://eur-lex.europa.eu/eli/dir/2023/2225/oj (verified: primary)
[54] "Justice Department Secures Groundbreaking Settlement Agreement with Meta Platforms, Formerly Known as Facebook, to Resolve Allegations of Discriminatory Advertising" (Fair Housing Act; Special Ad Audience discontinued; Variance Reduction System for housing ads). US Department of Justice. 2022-06-21. https://www.justice.gov/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known (verified: primary)
[55] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 6 Jul 2021; risk-management framework, assessment and monitoring, chief risk officer attestation; rules by insurance practice). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[56] NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (written AIS Program; third-party AI systems and data; adopted 4 Dec 2023). National Association of Insurance Commissioners. 2023-12-04. https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf (verified: primary)
[57] Case C-236/09, Association Belge des Consommateurs Test-Achats (Art. 5(2) of Directive 2004/113/EC invalid with effect from 21 Dec 2012). Court of Justice of the EU. 2011-03-01. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (verified: primary)
[58] R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058 (public sector equality duty; no verification that facial recognition software lacked unacceptable race or sex bias). Court of Appeal (Civil Division), Courts and Tribunals Judiciary. 2020-08-11. https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf (verified: primary)
[59] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures (adverse impact and the "four-fifths rule"). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[60] 15 U.S.C. § 45(n) (FTC Act s. 5: standard for unfairness). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap2-subchapI-sec45.htm (verified: primary)
[61] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[62] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[63] FTC v. Rite Aid Corporation, No. 2:23-cv-5023 (E.D. Pa.) (five-year ban on facial recognition for security or surveillance; stipulated order approved 8 Mar 2024). Federal Trade Commission, case page. 2024-03-08. https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v (verified: primary)
[64] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[65] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[66] "Federal Trade Commission Announces Final Rule Banning Fake Reviews and Testimonials" (16 CFR Part 465; covers AI-generated fake reviews; civil penalties for knowing violations). Federal Trade Commission. 2024-08-14. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (verified: primary)
[67] California Business and Professions Code ss. 17940 to 17943 (bot disclosure: unlawful to use a bot to mislead about its artificial identity to incentivise a sale or influence a vote, unless clearly and conspicuously disclosed; in force 1 Jul 2019). California Legislative Information. 2019. https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=3.&chapter=6.&article= (verified: primary)
[68] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[69] Directive (EU) 2019/2161 (better enforcement and modernisation of EU consumer protection rules), adding UCPD Annex I points 23b and 23c (consumer reviews). Official Journal of the EU. 2019-11-27. https://eur-lex.europa.eu/eli/dir/2019/2161/oj (verified: primary)
[70] Regulation (EU) 2022/2065 (Digital Services Act), Arts. 25 (online interface design and organisation), 27 (recommender system transparency) and 35(1)(k) (prominent marking of generated or manipulated media). Official Journal of the EU. 2022-10-19. https://eur-lex.europa.eu/eli/reg/2022/2065/oj (verified: primary)
[71] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(a) and (b) (manipulative or deceptive techniques; exploitation of vulnerabilities). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[72] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of AI interaction; machine-readable marking of synthetic content; deployer disclosure of deep fakes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[73] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[74] AI Liability Directive, Legislative Train Schedule (withdrawal announced in the Commission 2025 work programme; withdrawal published OJ C/2025/5423, 6 Oct 2025). European Parliament. 2026-08. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive (verified: secondary)
[75] "Products liability" (design, manufacturing and marketing defects, including failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. current. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[76] Garcia v. Character Technologies, Inc., No. 6:24-cv-01903 (M.D. Fla.): order granting in part and denying in part motions to dismiss (ECF 115, 21 May 2025); notice of resolution and order dismissing without prejudice (ECF 242 and 244, 7 Jan 2026). CourtListener (court docket). 2026-01-07. https://www.courtlistener.com/docket/69300919/garcia-v-character-technologies-inc/ (verified: primary)
[77] Product liability (review of the regime, including digital products and AI; terms of reference 8 Dec 2025; consultation planned for the second half of 2026). Law Commission of England and Wales. 2025-12. https://lawcom.gov.uk/project/product-liability/ (verified: primary)
[78] IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA), edition 3.0. International Electrotechnical Commission. 2018-08-10. https://webstore.iec.ch/en/publication/26359 (verified: primary)
[79] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[80] TAKE IT DOWN Act, Public Law 119-12 (S. 146) (knowing publication of intimate images incl. digital forgeries; notice-and-removal process within one year of enactment; removal within 48 hours; FTC enforcement). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[81] Sexual Offences Act 2003, s. 66B (sharing or threatening to share a photograph or film which "shows, or appears to show" another person in an intimate state; in force 31 Jan 2024). legislation.gov.uk. 2024-01-31. https://www.legislation.gov.uk/ukpga/2003/42/section/66B (verified: primary)
[82] Data (Use and Access) Act 2025, s. 138 (inserts Sexual Offences Act 2003 s. 66E, creating a purported intimate image of an adult). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/138 (verified: primary)
[83] Equal Credit Opportunity Act (Regulation B): final rule (ECOA does not authorize disparate-impact liability, the effects test; amends 12 CFR 1002.4, 1002.6, 1002.8 and 1002.15 and Supplement I, not 1002.9; 91 FR 21620, FR Doc. 2026-07804; effective 2026-07-21). Consumer Financial Protection Bureau, Federal Register. 2026-04-22. https://www.federalregister.gov/documents/2026/04/22/2026-07804/equal-credit-opportunity-act-regulation-b (verified: primary)
[84] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
