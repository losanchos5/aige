---
lang: fr
source: bok/19-privacy-and-ai.md
sourceHash: "b4edeb76a673fe200699b6e6830e31e975325b921be2a2968fbf303a0af74e72"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 19. Droit de la protection des données et de la vie privée appliqué à l'IA

> Le droit de la protection des données lie déjà chaque système d'IA qui traite des données à
> caractère personnel ; ce chapitre transforme ses obligations en matière de formation, d'inférence,
> de droits et de violations en artefacts, couches de stack et preuves.

Le droit de la vie privée a été la première loi sur l'IA. Le RGPD s'applique depuis le 25 mai 2018 à
tout traitement de données à caractère personnel, et un modèle entraîné sur, récupérant à partir de
ou décidant au sujet de personnes traite des données à caractère personnel à plusieurs moments de sa
vie {[1]}. Le Règlement sur l'IA ajoute des obligations sans déplacer la protection des données, et
le dit dans son propre texte {[2]}. Les obligations en matière de vie privée arrivent généralement
en premier, entraînent des amendes pouvant atteindre 20 millions EUR ou 4 % du chiffre d'affaires
annuel mondial pour les violations des principes fondamentaux {[1]}, et atteignent les systèmes que
le Règlement sur l'IA ne classe jamais comme haut risque.

Le RGPD est l'épine dorsale ici, avec de brefs contrastes avec le RGPD du Royaume-Uni, les lois des
États américains, la LGPD du Brésil et la PIPL de la Chine. Chaque obligation se résout en un
**artefact**, une **couche de stack** (chapitre 04) et un **dossier de preuve** qu'une requête peut
retourner. Une ligne de désambiguïsation : le délégué à la protection des données et le conseil en
matière de vie privée décident si une base légale tient ; l'ingénieur en gouvernance de l'IA
construit le dossier qui montre la décision, le contrôle qui l'applique et le signal qui dit quand
il a cessé de tenir. C'est une traduction d'ingénierie, pas un conseil juridique.

## Comment lire ce chapitre

Un système d'IA traite des données à caractère personnel à plus de moments que ses propriétaires ne
les énumèrent généralement, et chaque moment est une opération de traitement distincte avec son
propre objectif, sa propre base, sa propre rétention et son exposition aux droits. Le tableau
utilise l'exemple en cours du chapitre 04, {`csa-01`}, un assistant de service client dans un grand
opérateur de télécommunications, affiné sur les transcriptions de support passées, récupérant à
partir des notes de compte et appelant un modèle tiers.

| Moment du traitement | Données à caractère personnel ({`csa-01`}) | Ce que la loi demande d'abord | Enregistrement de preuve |
|---|---|---|---|
| Collecte pour la formation | Transcriptions historiques | Compatibilité de l'objectif ; base ; avis | Entrée du registre de base |
| Formation et affinage | Transcriptions filtrées | Minimisation ; dépistage des catégories spéciales | Fiche de données ; journal de filtrage |
| Indexation de la récupération (RAG) | Notes de compte | Contrôle d'accès ; rétention ; portée des droits | Manifeste d'index |
| Déduction | Invites et sorties en direct | Transparence ; transferts ; limites de la prise de décision automatisée | Trace avec verdicts de politique |
| Enregistrement et surveillance | Invites, sorties, traces | Limitation du stockage ; sécurité | Verdicts de rétention |
| Évaluation | Ensembles dorés et d'équipe rouge | Minimisation ; synthétique si possible | Fiche d'ensemble d'évaluation |

Les fiches de données vivent dans la couche 02
([Inventory & Transparency](/bok/the-stack#layer-02-inventory--transparency)) ; les règles de
finalité, de conservation et de résidence dans la couche 01 ; les tests de confidentialité dans la
couche 03 ; la rédaction, les filtres et le routage dans la couche 04 ; et les enregistrements qu'un
régulateur demande dans la couche 05. Deux chapitres voisins couvrent l'aspect organisationnel : le
chapitre 12 sur
[la mise à jour des politiques que vous avez déjà](/bok/governance-program#updating-the-policies-you-already-have),
et le chapitre 14 sur
[le droit d'utiliser les données](/bok/governing-development#the-right-to-use-the-data) à la
[porte d'admission des ensembles de données](/patterns/dataset-admission-gate).

## Principes appliqués à l'IA

L'article 5 du RGPD énonce les principes (licéité, équité et transparence ; limitation de l'objectif
; minimisation des données ; exactitude ; limitation du stockage ; intégrité et confidentialité) et
rend le responsable du traitement capable de démontrer la conformité, l'obligation de responsabilité
{[1]}. Pour l'IA, les principes ne changent pas ; où ils mordent change.

### Base légale pour la formation par rapport à l'inférence

L'article 6 offre six bases légales et aucune ne prime sur une autre ; le responsable du traitement
choisit celle qui convient à chaque activité de traitement [3]. Le piège est de choisir une base
pour « le modèle ». L'entraînement sur des transcriptions, l'indexation des notes de compte et la
réponse à un client en direct sont des activités différentes, et chacune a besoin de sa propre base.
[L'ordonnance du Garante sur ChatGPT](/cases/garante-chatgpt-order) montre ce qu'une base non
enregistrée coûte.

| Étape | Bases qui conviennent généralement | Pourquoi le choix est difficile |
|---|---|---|
| Entraîner un modèle sur des données raclées ou tierces | Intérêts légitimes (`Art. 6(1)(f)`) | Aucune relation avec les personnes ; notification indirecte ; l'opposition doit fonctionner |
| Affinage sur les données clients que vous détenez | Intérêts légitimes ; parfois consentement | Nouvelle finalité ; test de compatibilité ; attentes |
| Récupération sur les dossiers clients | Contrat (`Art. 6(1)(b)`) pour ce client | L'index ne doit pas répondre à un client avec les données d'un autre |
| Inférence au service du client | Contrat ; intérêts légitimes | La nécessité est étroite |
| Surveillance des journaux et examen des abus | Intérêts légitimes ; obligation légale | La rétention s'étend ; l'examen humain élargit l'accès |

L'artefact est un **registre de base** : chaque ensemble de données et étape porte sa base, sa
finalité et un pointeur vers l'évaluation qui la soutient, attaché à l'entrée du registre du
système. Un travail d'entraînement la lit et refuse de s'exécuter sur un ensemble de données dont la
base ne couvre pas l'entraînement.

> **Exemple (illustratif)**
> Une entrée du registre de base lue par le pipeline d'entraînement `csa-01` avant une exécution :
>
> ```json
> { "dataset": "support-transcripts-2025q4", "system": "csa-01", "stage": "fine-tuning",
>   "basis": "Art. 6(1)(f)", "lia_ref": "lia-csa-01-v3", "purpose": "support-answer-quality",
>   "special_category_scan": "pass", "retention": "P18M", "objection_opt_out": true }
> ```

### Intérêts légitimes et le test en trois étapes

Les intérêts légitimes constituent la base sur laquelle les développeurs d'IA sont les plus
susceptibles de s'appuyer [4]. Le CEPD a exposé comment les autorités la testent dans l'avis 28/2024
du 17 décembre 2024 [3]. L'intérêt doit être licite, précisément articulé, et réel et présent. Le
traitement doit être nécessaire, sans moyen moins intrusif pour atteindre la même fin, jugé en
tenant compte de la minimisation. Et l'intérêt ne doit pas être contrebalancé par les droits des
personnes, où les attentes raisonnables pèsent lourdement : si les données étaient publiques, la
relation avec le responsable du traitement, la source et ses paramètres de confidentialité, si les
personnes savent que leurs données sont en ligne [3].

Quand l'équilibre penche, des atténuations au-delà de ce que le RGPD exige déjà peuvent le rétablir.
Les exemples du CEPD incluent le masquage des noms et e-mails par des valeurs fictives, un délai
entre la collecte d'un ensemble de données et l'entraînement sur celui-ci, un droit d'opposition
inconditionnel avant le traitement, l'effacement au-delà des motifs de l'article 17, un canal pour
signaler la régurgitation, l'exclusion des sources intrusives et le respect de `robots.txt` ou
`ai.txt` lors du raclage, et des filtres de sortie au déploiement [3]. La CNIL ajoute un droit
discrétionnaire d'opposition préalable et la transparence sur le risque d'extraction [4].

Chaque atténuation est un contrôle, donc l'**évaluation des intérêts légitimes (EIL)** est un
artefact versionnée qui pointe chaque atténuation vers le contrôle qui la met en œuvre (le point de
terminaison d'opposition, l'identifiant de la règle de filtre, la liste d'autorisation de raclage).
Désactivez une atténuation et l'EIL devient obsolète ; le registre devrait l'indiquer.

### Les limites du consentement

Le consentement doit être spécifique, éclairé et librement donné ; le responsable du traitement doit
le prouver ; et les personnes peuvent le retirer à tout moment, aussi facilement qu'elles l'ont
donné, avec effet pour l'avenir [1]. Le retrait après l'entraînement ne supprime pas l'influence
d'une personne des poids calculés, donc un ensemble d'entraînement basé sur le consentement engage
le responsable du traitement à un chemin de suppression qu'il peut réellement exécuter (voir «
Suppression, réentraînement et désapprentissage » ci-dessous). Le consentement à un service n'est
pas non plus le consentement d'entraîner un modèle sur les données du service. L'artefact est un
**journal de consentement-finalité** joignant chaque consentement aux ensembles de données et
versions de modèle qui l'ont hérité ; sans cette jointure, un retrait ne peut pas être tracé aux
exécutions qu'il affecte. La PIPL chinoise ajoute un consentement séparé pour les informations
personnelles sensibles [5].

### Transparence envers les personnes dans les données

Les articles 13 et 14 exigent une notification, et l'article 14 couvre les données non collectées
auprès de la personne, le cas normal pour les données d'entraînement raclées ou sous licence [1].
Lorsque des décisions de l'article 22 sont impliquées, la notification et l'accès doivent inclure
des informations significatives sur la logique impliquée et les conséquences envisagées [1]. Une
notification rédigée pour le service original décrit rarement l'entraînement, et une notification
qui décrivait le modèle de l'année dernière est incorrecte après un réentraînement sur de nouvelles
sources. Générez la notification à partir de la même entrée de registre que la fiche de modèle, afin
qu'elle change quand les sources changent ; le CEPD nomme les fiches de modèle parmi les moyens de
combler le fossé informatif [3].

### Limitation de finalité et dérive fonctionnelle

Les données ne peuvent pas être traitées ultérieurement d'une manière incompatible avec leur
finalité initiale ; l'article 6(4) fixe le test : le lien entre les finalités, le contexte, la
nature des données, les conséquences et les garanties, telles que le chiffrement ou la
pseudonymisation [1]. L'IA rend chaque enregistrement stocké ressemblant à des données
d'entraînement, et les défaillances sont une **dérive fonctionnelle** : les transcriptions
d'assistance réutilisées pour profiler les clients pour les ventes, les images de sécurité
réutilisées pour la présence, les caractéristiques de fraude réutilisées pour les limites de crédit.

Le contrôle est une balise de finalité qui accompagne les données et une règle de couche 01 qui
compare la finalité sur la fiche de l'ensemble de données avec la finalité déclarée par le système
consommateur, refusant l'exécution quand elles diffèrent et aucune évaluation de compatibilité n'est
enregistrée. Une jointure refusée est la preuve du bit de limite de finalité.

> **En pratique (illustratif)**
> Une équipe d'analyse a été invitée à affiner un modèle de désabonnement sur les transcriptions
> collectées pour `csa-01`. La vérification de finalité a refusé le travail : la fiche disait
> `support-answer-quality`, le demandeur disait `retention-marketing`, et aucune évaluation de
> compatibilité n'existait. La demande est devenue une évaluation de l'article 6(4) qui n'a autorisé
> que les comptages de sujets agrégés, et l'exécution refusée et l'évaluation ont toutes deux été
> classées par rapport à l'entrée du registre de l'ensemble de données.

**Correspondances :** RGPD `Arts. 5–7`, `13`, `14` · Règlement de l'IA `Art. 10`, `Art. 13` ·
ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Map) · couches 01 et 02. Les mappages sont
illustratifs, non une affirmation de conformité.

## Minimisation, protection des données dès la conception et PET

Les données doivent être adéquates, pertinentes et limitées à ce que la finalité nécessite, et
l'article 25 l'exige dès la conception (mesures telles que la pseudonymisation intégrée) et par
défaut (seules les données que chaque finalité nécessite sont traitées et rendues accessibles) [1].
L'apprentissage automatique tire dans l'autre sens, donc la minimisation est argumentée
caractéristique par caractéristique, non affirmée une fois :

- **Justification au niveau des caractéristiques.** Chaque caractéristique d'entrée porte une raison
  et une contribution mesurée dans la fiche de données ; une sans l'une ou l'autre est supprimée, et
  les champs de catégories spéciales ont besoin d'une condition documentée.
- **Filtrage avant l'entraînement.** Les analyses PII et catégories spéciales s'exécutent sur chaque
  instantané et le journal de filtrage est conservé avec lui ; le CEPD énumère la sélection des
  sources, la préparation et le filtrage parmi les domaines qu'une autorité examine [3].
- **Récupération minimale et journaux.** Les index RAG ne contiennent que les champs dont les
  réponses ont besoin ; la rétention des journaux suit l'obligation, non la valeur par défaut du
  stockage. La tension avec les devoirs de journalisation de la loi sur l'IA (voir
  [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) est résolue en enregistrant ce que le
  devoir nécessite, pseudonymisé où il le permet.
- **Ensembles d'évaluation synthétiques ou masqués** partout où un test ne dépend pas des identités
  réelles.

### Anonymisation par rapport à la pseudonymisation

La distinction décide si le RGPD s'applique. Les données **pseudonymisées** ne peuvent pas être
attribuées à une personne sans informations supplémentaires conservées séparément [1] ; les données
qui peuvent être réattribuées avec ces informations concernent toujours une personne identifiable
[1], et les lignes directrices 2025 du CEPD traitent la pseudonymisation comme une garantie à
appliquer correctement [6]. Les données **anonymes** sortent du champ d'application du RGPD, mais le
considérant 26 juge l'identifiabilité par rapport à tous les moyens raisonnablement susceptibles
d'être utilisés, par le responsable du traitement ou une autre personne, compte tenu du coût, du
temps et de la technologie [1].

Dans EDPS c. SRB (C-413/23 P, 4 septembre 2025), la Cour de justice a jugé que les données
pseudonymisées ne sont pas des données personnelles dans tous les cas et pour chaque personne,
puisque la pseudonymisation peut empêcher un destinataire d'identifier quiconque ; mais les propres
devoirs du responsable du traitement, tels que l'information des personnes, sont jugés du point de
vue du responsable du traitement au moment de la collecte [7]. Dans une chaîne d'approvisionnement
en IA, un fournisseur recevant des enregistrements bien pseudonymisés sans la clé peut être en
dehors du RGPD pour eux ; l'expéditeur ne l'est pas.

Les affirmations d'anonymisation se dégradent. Une étude a estimé que 99,98 % des Américains
seraient correctement réidentifiés dans tout ensemble de données utilisant 15 attributs
démographiques [8]. Conservez une **évaluation de réidentification** avec chaque ensemble de données
« anonyme » : technique, modèle d'attaquant, risque résiduel et date.

### Technologies améliorant la confidentialité et leurs limites honnêtes

Les technologies améliorant la confidentialité (PET) réduisent ce qu'un attaquant, fournisseur ou
initié peut apprendre. Aucune ne rend un système conforme, et chacune a un mode de défaillance
connu.

| PET | Ce qu'il fait | Ce qu'elle ne fait pas | Enregistrement de preuve |
|---|---|---|---|
| Confidentialité différentielle | Limite la façon dont un enregistrement peut modifier un résultat ou un modèle | Couvrir les données en dehors du budget ; survivre à un budget mal défini ou réinitialisé | Budget de confidentialité par version, avec méthode de comptabilité |
| Apprentissage fédéré | Entraîne où les données vivent [9] | Masquer les données dans les gradients partagés, qui peuvent fuir des exemples [10] | Paramètres d'agrégation et DP |
| Données synthétiques | Remplace les enregistrements réels pour les tests ou le partage | Garantir la confidentialité : soit elle échoue à arrêter les attaques d'inférence, soit elle perd l'utilité [11] | Fiche du générateur ; résultats d'attaque |
| Pseudonymisation et masquage | Supprime les identifiants directs | Rendre les données anonymes ; arrêter la liaison par quasi-identifiants | Dossier de garde des clés ; règles de masquage |
| Exécution de confiance (enclaves) | Protège les données en utilisation de l'hôte | Supprimer la confiance dans le fournisseur de matériel ; corriger la mémorisation | Rapport d'attestation par charge de travail |
| Filtrage et rédaction de sortie | Bloque les données personnelles à l'exécution | Supprimer les données du modèle ; attraper chaque paraphrase | Décisions de garde-fou avec identifiants de règle |

NIST SP 800-226 est la référence pour évaluer les affirmations de confidentialité différentielle et
nomme les « risques de confidentialité » qui apparaissent dans l'implémentation [12]. Une
affirmation PET est une évaluation comme toute autre : un seuil, une attaque nommée, une
construction échouée quand le seuil est manqué.

> **En pratique (illustratif)**
> Une équipe a remplacé les enregistrements réels dans la suite de régression `csa-01` par des
> enregistrements synthétiques et a supposé que le problème était résolu. Un test d'inférence
> d'appartenance ajouté à la porte d'évaluation a signalé les enregistrements rares reproduits
> presque textuellement. Le générateur a été réentraîné avec un budget de confidentialité, le test
> est resté comme une porte permanente, et la fiche de l'ensemble synthétique porte désormais le
> résultat de l'attaque comme sa preuve d'aptitude.

**Correspondances :** RGPD `Art. 5(1)(c)`, `Art. 25`, `Art. 32` · Règlement de l'IA `Art. 10`,
`Art. 4a` · ISO/IEC 27701 · NIST AI RMF (Measure) ·
[Gouvernance des données dans le stack](/bok/the-stack#data-governance-across-the-stack) · couches
01, 03 et 04. Les mappages sont illustratifs, non une affirmation de conformité.

## Devoirs du responsable du traitement dans la chaîne d'approvisionnement en IA

### Responsable du traitement, sous-traitant ou responsable du traitement conjoint

Un **responsable du traitement** décide des finalités et des moyens ; un **sous-traitant** agit en
son nom ; les parties décidant ensemble sont des **responsables conjoints du traitement** et doivent
répartir les responsabilités [1]. Le règlement sur l'IA ne mappe pas ses fournisseur et déployeur
sur ces rôles un à un : un déployeur est généralement un responsable du traitement, et un
fournisseur de modèle peut être votre sous-traitant pour l'inférence et un responsable du traitement
pour son propre entraînement.

| Acteur | Rôle RGPD typique | Ce qui le détermine |
|---|---|---|
| Développeur de modèle entraînant sur des données qu'il a collectées | Responsable du traitement pour l'entraînement | Il a choisi les sources et la finalité |
| Fournisseur d'API servant votre inférence | Sous-traitant | Il agit uniquement sur instructions documentées [1] |
| Le même fournisseur entraînant sur vos prompts | Responsable du traitement pour cet usage | Un sous-traitant qui détermine les finalités est un responsable du traitement pour ce traitement [1] |
| Votre organisation déployant l'assistant | Responsable du traitement | Elle décide pourquoi les données des clients sont traitées |
| Partenaires co-entraînant sur des données mutualisées | Responsables conjoints du traitement | Ils décident ensemble des finalités et des moyens |

Conservez un **registre des rôles** par système et étape avec l'entrée du registre : un responsable
du traitement exécute l'AIPD et répond aux demandes ; un sous-traitant assiste et notifie les
violations au responsable du traitement sans délai injustifié [1].

### Contrats de traitement de données avec les fournisseurs d'IA et clauses sans entraînement

L'article 28 exige un contrat en vertu duquel le sous-traitant agit uniquement sur instructions
documentées, y compris sur les transferts [1]. Pour les fournisseurs d'IA, la
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) doit vérifier les
clauses qu'un accord générique omet :

- **Pas d'entraînement sur les données des clients** (prompts, résultats, fichiers, embeddings,
  retours), tout opt-in explicite.
- **Conservation des prompts et résultats**, y compris la conservation pour surveillance des abus et
  examen par le personnel.
- **Localisation du traitement** par endpoint et fonctionnalité, y compris l'accès au support.
- **Sous-traitants**, avec notification et droit d'opposition quand un hôte de modèle change.
- **Suppression et retour** à la fin du contrat, certifiés.
- **Notification de violation** sur une horloge qui laisse de la place pour les propres 72 heures du
  responsable du traitement.
- **Notification de changement** quand le modèle, sa politique de données ou sa région change.
- **Preuves** : fiche de modèle, attestations de sécurité et tout AIBOM, livrés comme documents
  stockés.

Le registre de la gate (réponses de la checklist, référence du contrat, date) se trouve sur l'entrée
du registre du fournisseur et est réexécuté à chaque changement notifié.

### L'AIPD pour les systèmes d'IA

Une **AIPD** est requise avant un traitement susceptible de présenter un risque élevé,
particulièrement avec les nouvelles technologies, et toujours pour les trois cas de l'article 35(3)
: évaluation systématique avec décisions automatisées significatives, traitement à grande échelle de
catégories spéciales, et surveillance à grande échelle d'espaces accessibles au public [1]. Les
lignes directrices du groupe de travail de l'article 29, approuvées par le CEPD, donnent neuf
critères et disent que le traitement répondant à deux d'entre eux aura généralement besoin d'une
AIPD [13]. Les systèmes d'IA répondent à plusieurs à la fois :

| Critère [13] | Cas d'IA typique |
|---|---|
| Évaluation ou notation | Scores de risque, modèles de propension, classement des candidats |
| Décisions automatisées avec effet juridique ou similaire | Crédit, embauche, assurance, admissibilité |
| Surveillance systématique | Analytique du lieu de travail, vidéo ou activité d'agent |
| Données sensibles ou hautement personnelles | Santé, biométrie, traits déduits |
| Grande échelle ; appariement ou combinaison de jeux de données | Corpus à l'échelle du web ; ensembles d'entraînement fusionnés |
| Personnes concernées vulnérables | Employés, enfants, patients |
| Technologie innovante | Modèles génératifs, agents, analyse d'émotions |
| Empêcher l'exercice d'un droit ou l'utilisation d'un service | Portes d'admissibilité automatisées |

Une AIPD pour l'IA a besoin de champs qu'un modèle générique manque : chaque moment de traitement
avec sa base, sources d'entraînement et filtrage, risque de mémorisation avec les résultats d'éval
qui le mesurent, l'analyse ADM, la carte des fournisseurs et transferts, la conception de la
supervision, et le chemin des droits pour les données à l'intérieur du modèle. L'article 35(7) fixe
le contenu minimum, et quand le risque résiduel reste élevé le responsable du traitement consulte
d'abord l'autorité, qui a jusqu'à huit semaines pour répondre [1]. Le CEPD s'attend à voir des AIPD
et aussi des décisions qu'une n'était pas nécessaire [3], donc « pas d'AIPD » est aussi un artefact.
Les déployeurs de systèmes à haut risque utilisent les informations de l'article 13 du fournisseur
pour leur AIPD [14], et l'analyse d'impact sur les droits fondamentaux de l'article 27 complète
plutôt que de répéter une AIPD [15] ; le modèle
[gouvernance en tant que code](/patterns/fria-as-code) écrit les champs partagés une fois. La page
des modèles a un [addendum AIPD pour l'IA](/resources/templates#schema-impact-assessment) dans son
schéma d'évaluation d'impact.

### Registres des activités de traitement

L'article 30 exige un registre des activités de traitement (ROPA) : finalités, catégories de données
et de personnes, destinataires, transferts, conservation, sécurité [1]. Un système d'IA signifie
généralement une entrée par moment de traitement, et les entrées deviennent obsolètes à chaque
changement de pipeline, donc générez-les à partir du registre, des fiches de données et du registre
des bases. Le nouvel article 4a du règlement sur l'IA s'appuie sur ce registre : quand des données
de catégories spéciales sont traitées pour la détection de biais, le ROPA doit dire pourquoi c'était
strictement nécessaire et pourquoi d'autres données ne feraient pas l'affaire [2].

### Transferts, inférence à distance et évaluations d'impact sur les transferts

Le chapitre V du RGPD exige une base pour chaque transfert vers un pays tiers : adéquation,
garanties appropriées comme les clauses contractuelles types, ou une dérogation étroite [1]. Les
trois critères cumulatifs du CEPD définissent un transfert (un exportateur soumis au RGPD rend les
données personnelles disponibles à un importateur dans un pays tiers), et ses lignes directrices
traitent l'accès à distance depuis un pays tiers comme un transfert [16]. Pour l'IA, cela couvre un
prompt contenant des données personnelles envoyé à un endpoint en dehors de l'EEE, la télémétrie du
fournisseur portant des prompts, un basculement vers une autre région, et une équipe de support
étrangère qui peut lire les journaux.

Quand la base est contractuelle, l'exportateur exécute une
**évaluation d'impact sur les transferts** pour déterminer si la loi de l'importateur lui permet
d'honorer les clauses, en ajoutant des mesures supplémentaires comme le CEPD le recommande [17]
selon les clauses contractuelles types de 2021 [18]. Pour les États-Unis, la décision d'adéquation
du Cadre de confidentialité des données du 10 juil. 2023 couvre les organisations certifiées [19],
et la Cour générale a rejeté une action en annulation le 3 sep. 2025 [20]. Enregistrez que l'entité
du fournisseur est certifiée pour les données en question.

Le contrôle étend la règle de résidence du chapitre 04
([couche 01](/bok/the-stack#layer-01-govern-as-code)) : acheminez l'inférence pour chaque classe de
données uniquement vers les endpoints dont la base est enregistrée, refusez sinon, et émettez le
verdict. La preuve est le flux de verdicts plus un registre des transferts (endpoint, région,
importateur, base, référence d'évaluation d'impact sur les transferts, date de révision).

> **En pratique (illustratif)**
> Quand `csa-01`'s fournisseur a annoncé un modèle servi depuis une région américaine, la
> notification de changement a déclenché la gate de diligence raisonnable. Elle a vérifié la
> certification du Cadre de confidentialité des données du fournisseur, a stocké la vérification
> dans le registre des transferts, et la politique de résidence a ensuite autorisé le nouvel
> endpoint pour les prompts de support pseudonymisés uniquement. Les notes de compte sont restées
> sur l'endpoint de l'UE, et les verdicts de politique dans les traces ont prouvé quelles données
> sont allées où.

**Correspondances :** RGPD `Arts. 26`, `28`, `30`, `35`, `36`, `44`–`46` · Règlement sur l'IA
`Art. 4a`, `Art. 26(9)`, `Art. 27(4)` · ISO/IEC 42001 Annex A.10 · ISO/IEC 27701 · NIST AI RMF
(Govern, Map) · couches 01, 02 et 05. Les mappages sont illustratifs, non une affirmation de
conformité.

## Prise de décision automatisée

### Article 22 du RGPD après SCHUFA

L'article 22 donne aux personnes le droit de ne pas être soumises à une décision basée uniquement
sur le traitement automatisé, y compris le profilage, avec des effets juridiques ou similaires. Ces
décisions ne sont autorisées que si elles sont nécessaires pour un contrat, autorisées par la loi,
ou basées sur le consentement explicite, et alors avec au moins le droit à l'intervention humaine, à
exprimer un avis et à contester [1]. Le chapitre 16 transforme
[la prise de décision automatisée en vertu de l'article 22 du RGPD](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime)
en registres d'explication et de contestation.

Deux jugements fixent la tâche d'ingénierie. Dans SCHUFA (C-634/21, 7 déc. 2023), la Cour de justice
a jugé qu'un score de crédit est lui-même une décision automatisée quand les prêteurs lui donnent un
rôle déterminant [21] (l'aspect droit du crédit est au chapitre 20,
[crédit et prêt](/bok/existing-law#credit-and-lending)). Un modèle qui « recommande seulement » est
couvert par l'article 22 quand les humains en aval le suivent comme une règle, et la partie
produisant le score décide elle-même. Dans Dun & Bradstreet Austria (C-203/22, 27 fév. 2025), la
Cour a jugé que les informations significatives sur la logique signifient décrire la procédure et
les principes réellement appliqués, pour que la personne comprenne quelles données ont été utilisées
et comment ; que dire jusqu'à quel point un changement dans les données aurait changé le résultat
peut être approprié ; que remettre un algorithme n'est pas une explication ; et que les secrets
commerciaux allègent à l'autorité ou au tribunal pour équilibrer [22].

Les artefacts suivent : un **registre de décision** par décision (version du modèle, entrées,
résultat, codes de raison, contrefactuel) ; un **avis** qu'une décision uniquement automatisée a été
prise et comment la contester ; un
**[chemin de contestation](/patterns/decision-notice-contest-path)** vers un examinateur avec
autorité et informations pour changer le résultat, avec un registre de ce qu'il a fait ; et un
moniteur de la supervision elle-même, car un examinateur qui confirme presque chaque résultat en
secondes n'est pas une implication significative (le modèle
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)).

> **Exemple (illustratif)**
> Un registre de décision pour `credit-check-04`, une vérification de financement de téléphones d'un
> opérateur télécom, déposé à l'exécution :
>
> ```json
> { "decision_id": "cc4-2026-09-18-0192", "system": "credit-check-04@3.2",
>   "solely_automated": true, "basis": "GDPR Art. 22(2)(a)", "outcome": "declined",
>   "reason_codes": ["R07 payment arrears", "R12 short credit history"],
>   "counterfactual": "approval likely after six months without arrears",
>   "notice_sent": "2026-09-18T10:02:11Z", "contest_channel": "human-review-queue" }
> ```

### Les régimes côte à côte

| Régime | Déclencheur | Devoir ou droit fondamental | Artefact | Couche |
|---|---|---|---|---|
| GDPR `Art. 22`, `Art. 15(1)(h)` | Décision uniquement automatisée, effet juridique ou similaire | Permission étroite ; intervention, avis, contestation ; information sur la logique [1][22] | Registre de décision ; avis ; chemin de contestation | 4 · 5 |
| UK GDPR `Arts. 22A–22D` | Décision significative sans implication humaine significative | Autorisée avec garanties ; plus stricte pour les données de catégories spéciales [23] | La même, plus pourquoi l'implication est significative | 4 · 5 |
| Règlements ADMT de la CCPA | ADMT pour une décision significative | Avis pré-utilisation ; opt-out ou appel humain ; accès ; à partir du 1er jan. 2027 [24] | Avis ; flux de travail opt-out et appel ; évaluation des risques | 2 · 4 · 5 |
| Lois des États américains (Virginie, Colorado, Minnesota) | Profilage pour les décisions avec effets juridiques ou similaires | Opt-out [25][26] ; au Minnesota, contester le résultat, apprendre la raison, réévaluation sur données corrigées [27] | Drapeau opt-out honoré à l'inférence ; flux de travail de révision | 1 · 4 |
| LGPD `Art. 20` | Décision uniquement par traitement automatisé affectant les intérêts | Révision ; information sur les critères, respectant les secrets commerciaux [28] | Flux de travail de révision ; déclaration des critères | 4 · 5 |
| PIPL `Art. 24` | Décision automatisée avec impact significatif | Transparence, équité ; explication ; refus des décisions uniquement automatisées [5] | Service d'explication ; route manuelle | 4 |
| Règlement sur l'IA de l'UE `Art. 86`, `Art. 26(11)` | Décision du déployeur sur une sortie Annex III à haut risque | Explication du rôle du système et de ses éléments principaux ; informer les personnes [29][14] | Explication liée au registre de décision | 4 · 5 |

L'article 86 s'applique uniquement lorsque le droit de l'Union ne confère pas déjà le droit [29], de
sorte que la voie du RGPD fait généralement le travail (le chapitre 18 lit
[l'article 86 du règlement sur l'IA et l'article 4a](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
en contexte). Il se situe en dehors des exigences de l'annexe III que l'omnibus numérique a
reportées au 2 décembre 2027 [2], et le fait qu'il s'applique plus tôt n'est pas établi au
2026-09-24 (à vérifier). La proposition d'omnibus numérique refondirait l'article 22 comme une liste
de permissions dans laquelle la nécessité contractuelle s'applique même si une personne pourrait
décider [30] ; ce n'est pas une loi (voir ci-dessous).

**Correspondances :** RGPD `Art. 13(2)(f)`, `Art. 15(1)(h)`, `Art. 22` · RGPD du Royaume-Uni
`Arts. 22A–22D` · Règlements ADMT de la CCPA · LGPD `Art. 20` · PIPL `Art. 24` · Règlement de l'IA
de l'UE `Art. 14`, `Art. 26(11)`, `Art. 86` · NIST AI RMF (Manage) · couches 04 et 05. Les
correspondances sont illustratives, non une affirmation de conformité.

## Droits des personnes concernées contre les modèles entraînés

### Où une demande doit arriver

Les droits d'accès, de rectification, d'effacement et d'opposition [1] ne s'arrêtent pas à la base
de données. Le délai est d'un mois, extensible de deux mois pour les demandes complexes [31], de
sorte que le processus est conçu avant la première demande. Un responsable du traitement qui ne peut
pas identifier une personne dans un ensemble d'entraînement peut le dire, et la personne peut
fournir des informations qui rendent l'identification possible [31].

| Où se trouvent les données | Réponse réalisable à l'effacement ou l'opposition | Preuve |
|---|---|---|
| Systèmes sources et corpus brut | Outillage de demande normal | Fermeture du ticket |
| Snapshots d'entraînement et d'ajustement fin | Supprimer ; signaler les modèles entraînés sur le snapshot | Diff du snapshot |
| Index RAG et caches | Supprimer ou réindexer les chunks ; immédiat | Manifeste d'index |
| Journaux de prompt et de sortie | Supprimer ou pseudonymiser par clé de sujet | Verdict de conservation |
| Ensembles d'évaluation | Remplacer par des enregistrements synthétiques | Fiche d'ensemble d'évaluation |
| Poids du modèle (s'ils ne sont pas anonymes) | Supprimer les sorties maintenant ; réentraîner ou désapprendre selon un calendrier | Règle de filtre ; plan de réentraînement |

### Suppression, réentraînement et désapprentissage

Pour les données à l'intérieur des poids, il existe une échelle, du rapide et partiel au lent et
complet :

1. **Suppression de sortie.** Un filtre autour du modèle l'empêche de produire les données de la
   personne. La CNIL accepte les filtres lorsque le réentraînement est disproportionné, s'il est
   montré efficace et robuste, et préfère les règles générales à une liste de noms (elle-même une
   liste de personnes qui se sont opposées) [31]. Les données restent dans le modèle ; testez le
   filtre comme tout contrôle.
2. **Réentraînement sans les données.** Lorsque les données d'entraînement sont toujours conservées,
   le réentraînement répond à la demande, et le réentraînement périodique regroupe plusieurs
   demandes [31]. Complet pour la nouvelle version, coûteux pour les grands modèles.
3. **Désapprentissage automatique.** Les approches exactes telles que l'entraînement par shards SISA
   de sorte que seul le shard affecté soit réentraîné [32] ; les approches approximatives ajustent
   les poids et sont difficiles à vérifier. Traitez toute affirmation de désapprentissage comme un
   test à réussir (inférence d'appartenance ou extraction sur les enregistrements supprimés).

Enregistrez le choix et sa raison par demande : le régulateur demandera pourquoi la suppression et
non le réentraînement, et quand le prochain réentraînement ferme l'écart.

### Enregistrement de la façon dont une demande a été honorée

La preuve est un **[registre d'exécution](/patterns/rights-requests-against-models)** écrit par le
flux de travail : chaque emplacement, l'action dans chacun, les versions de modèle affectées et
quand l'écart se ferme.

> **Exemple (illustratif)**
> Une demande d'effacement contre `csa-01`}, fermée dans le délai :
>
> ```json
> { "request_id": "dsr-2026-0412", "right": "erasure", "subject_key": "hash:7c1e…",
>   "locations": { "crm": "deleted", "rag_index": "deleted", "fine_tune_set": "deleted",
>                  "logs": "deleted", "weights": "output-suppression:rule-dsr-0412" },
>   "retrain_scheduled": "csa-01@2026-10-15", "closed": "2026-09-30", "within_deadline": true }
> ```

**Correspondances :** RGPD `Art. 12(3)`, `Arts. 15–17`, `Art. 21` · ISO/IEC 27701 · NIST AI RMF
(Manage) · couches 04 et 05. Les correspondances sont illustratives, non une affirmation de
conformité.

## Un modèle contient-il des données à caractère personnel ?

### Le test d'anonymat du CEPD

Si un modèle est une donnée à caractère personnel, les droits, le transfert et les règles de
violation atteignent les poids. Les autorités diffèrent. Le document de discussion 2024 de
l'autorité de Hambourg a soutenu que stocker un grand modèle de langage n'est pas un traitement, que
les droits s'attachent aux entrées et sorties du système, et que l'entraînement illégal ne contamine
pas l'utilisation ultérieure [33]. Le CEPD a été plus strict : les modèles entraînés sur des données
à caractère personnel ne peuvent pas dans tous les cas être considérés comme anonymes, et un modèle
est anonyme uniquement si la probabilité d'extraire directement les données des sujets
d'entraînement et la probabilité de les obtenir par des requêtes sont insignifiantes, compte tenu de
tous les moyens raisonnablement susceptibles d'être utilisés [3]. La CNIL a depuis publié des
orientations sur la documentation du fait qu'un modèle relève du RGPD et recommande des filtres
robustes autour des modèles qui peuvent avoir mémorisé des données [34].

Pour l'ingénieur, l'avis est un plan de test. Les autorités examineront la sélection des sources, la
préparation et la minimisation, les choix d'entraînement (régularisation, confidentialité
différentielle), les mesures de sortie, les audits et les tests structurés contre l'inférence
d'attribut et d'appartenance, l'exfiltration, la régurgitation, l'inversion de modèle et les
attaques de reconstruction ; elles s'attendent à une documentation incluant les AIPD (ou la décision
de ne pas en exécuter), le modèle de menace, les mesures par source avec les URL des sources, et la
preuve de la résistance à la réidentification [3]. C'est un **pack de preuves d'anonymat**, et la
plupart en est une sortie de couche 03 : une suite d'attaques s'exécute comme une porte d'évaluation
sur chaque version de modèle, et son résultat est l'affirmation.

> **Exemple (illustratif)**
> Une ligne d'un pack de preuves d'anonymat, déposée contre une version de modèle :
>
> ```json
> { "suite_id": "privacy.membership-inference.v2", "model_version": "csa-01@2026-09-18",
>   "attack_auc": 0.52, "threshold": 0.55, "canary_extraction": "0/500", "result": "pass" }
> ```

Passer les attaques connues n'atteste que la résistance à ces attaques, comme le note le CEPD [3] ;
le pack est réexécuté lorsque le modèle, ses données ou l'état de l'art change.

### Quand le modèle a été entraîné illégalement

L'avis établit trois scénarios [3]. Si les données à caractère personnel restent dans le modèle et
que **le même responsable du traitement** le déploie, l'effet du développement illégal est évalué au
cas par cas. Si **un autre responsable du traitement** le déploie, ce responsable devrait avoir
évalué que le modèle n'a pas été développé illégalement, en examinant la source des données et toute
infraction trouvée par une autorité ou un tribunal, mise à l'échelle selon son propre risque. Si le
modèle a été **anonymisé** avant le déploiement et que le déploiement ne traite aucune donnée à
caractère personnel, le RGPD ne s'applique pas à cette opération ; les nouvelles données à caractère
personnel traitées lors du déploiement sont évaluées indépendamment.

Le deuxième scénario atteint la plupart des organisations, car la plupart déploient des modèles
qu'elles n'ont pas entraînés. Dans la
[porte de diligence raisonnable du fournisseur / modèle](/patterns/vendor-model-due-diligence-gate),
cela devient des réponses stockées : le résumé des données d'entraînement du fournisseur, sa base
déclarée, toute conclusion d'application de la loi publique, son affirmation d'anonymat et sa
preuve, et la date vérifiée.

**Correspondances :** RGPD `Art. 4(1)`, `Art. 5(2)`, `Art. 24`, `Art. 25` · Règlement de l'IA de
l'UE `Art. 53` · NIST AI RMF (Measure) ·
[Suite de test adversarial Red-Team](/patterns/adversarial-red-team-suite) · couches 02, 03 et 05.
Les correspondances sont illustratives, non une affirmation de conformité.

## Catégories spéciales, données déduites et biométrie

L'article 9(1) du RGPD interdit le traitement de données révélant l'origine raciale ou ethnique, les
opinions politiques, les convictions religieuses ou philosophiques ou l'appartenance à un syndicat,
ainsi que le traitement de données génétiques, de données biométriques pour l'identification unique,
de données de santé et de données concernant la vie sexuelle ou l'orientation sexuelle, sauf si une
condition de l'article 9(2) s'applique, comme le consentement explicite [1]. Le nouvel article 4a du
règlement de l'IA permet aux fournisseurs de systèmes à haut risque de traiter ces données lorsque
cela est strictement nécessaire pour la détection et la correction des biais, uniquement si d'autres
données (y compris les données synthétiques ou anonymisées) ne suffiraient pas, avec
pseudonymisation, contrôles d'accès, pas de transmission ultérieure et suppression une fois le biais
corrigé (chapitre 16 sur
[les données de catégories spéciales pour la détection des biais (art. 4a)](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test))
; les responsables du déploiement et les fournisseurs d'autres systèmes peuvent le faire
exceptionnellement, et aucune obligation de mener des travaux de biais n'est créée [2]. L'ancienne
base de l'article 10(5) a été supprimée [35].

### Données sensibles déduites et proxy

L'IA crée des données sensibles sans les collecter : la santé déduite des achats, la religion des
choix de repas, l'orientation des graphes sociaux, ou un code postal remplaçant l'ethnicité. Les
orientations de l'ICO sur l'IA traitent les déductions et les données de catégories spéciales comme
une question de légalité [36]. La loi My Health My Data de Washington compte comme données de santé
des consommateurs les informations dérivées ou extrapolées à partir de données non sanitaires, y
compris par des algorithmes ou l'apprentissage automatique [37]. La Californie exige une évaluation
des risques avant l'inférence automatisée de la santé, de la situation économique ou du comportement
dans certains contextes [24].

Deux contrôles rendent cela vérifiable. Un **test de proxy** en couche 03 mesure la qualité avec
laquelle chaque caractéristique et la sortie prédisent un attribut protégé sur un ensemble étiqueté,
échouant la construction au-dessus d'un seuil. Une **politique d'inférence** en couche 01 énumère
les attributs qu'un système ne peut pas déduire, appliquée par un classificateur de sortie en
couche 04. Les deux laissent des enregistrements que l'inférence sensible a été recherchée.

### Biométrie

Les données biométriques résultent du traitement technique de traits physiques, physiologiques ou
comportementaux qui permettent ou confirment l'identification unique, tels que les images faciales
ou les empreintes digitales [1]. Gardez trois usages distincts : **identification** (un à
plusieurs), **vérification** (un à un) et **catégorisation** (assigner un groupe à partir de
traits).

| Instrument | Règle sur la biométrie | Artefact |
|---|---|---|
| GDPR `Art. 9` | Les données biométriques pour l'identification unique sont une catégorie spéciale [1] | Enregistrement de la condition de l'article 9(2) ; AIPD |
| Règlement de l'IA de l'UE `Art. 5(1)(e)`–`(h)` | Interdit le raclage facial non ciblé, l'inférence d'émotion au travail et à l'école (sauf usages médicaux et de sécurité), la catégorisation déduisant des traits sensibles, et l'identification biométrique à distance en temps réel pour l'application de la loi sauf exceptions étroites [38] | Politique d'usage interdit en tant que code ; écran d'admission |
| Point 1 de l'annexe III du règlement de l'IA de l'UE | L'identification à distance (non la vérification), la catégorisation sensible et la reconnaissance des émotions sont à haut risque lorsqu'elles sont légales [39] | Enregistrement de classification à haut risque |
| Proposition d'omnibus `Art. 9(2)(l)` | Permettrait la vérification sous le seul contrôle de la personne [30] | Aucun pour l'instant |
| Illinois BIPA | Calendrier de conservation, consentement écrit informé, pas de profit ; action privée avec USD 1 000 par violation négligente et USD 5 000 par violation intentionnelle ou imprudente [40] | Capture du consentement ; conservation en tant que code ; journal de destruction |
| PIPL `Arts. 28–29` | La biométrie est sensible : objectif spécifique, nécessité, consentement séparé [5] | Enregistrement du consentement séparé ; PIPIA |

La BIPA est appliquée par des actions collectives privées, et un amendement de 2024 est signalé pour
limiter les scans répétés de la même personne à une récupération (à vérifier) [40]. Un mot de passe
divulgué peut être réinitialisé ; un visage divulgué ne peut pas l'être, de sorte que les modèles
biométriques reçoivent les règles de conservation et d'accès les plus strictes, et leur journal de
suppression est une preuve qui vaut la peine d'être conservée.

### Données de santé des consommateurs et données neurales

La loi My Health My Data Act de Washington, en vigueur pour la plupart des entités depuis le 31 mar
2024, exige le consentement pour collecter, un consentement distinct pour partager et une
autorisation signée pour vendre, appliquée par la loi de protection des consommateurs de l'État
[37]. Les **données neurales** (informations générées en mesurant l'activité du système nerveux)
sont des informations personnelles sensibles en vertu de la CCPA par SB 1223, approuvée le 28 sep
2024 [41], et des données sensibles en vertu de la Colorado Privacy Act par HB24-1058, en vigueur
depuis le 7 aug 2024 [42]. Un système d'IA lisant des appareils portables ou des interfaces
cerveau-ordinateur doit signaler ces classes de données à l'admission, car elles activent les
obligations de consentement et d'évaluation que la télémétrie ordinaire n'impose pas.

**Correspondances :** RGPD `Art. 4(14)`, `Art. 9`, `Art. 35(3)(b)` · Reglamento de IA `Art. 4a`,
`Art. 5(1)(e)`–`(h)`, Annex III point 1 · BIPA · Washington MHMDA · CCPA · PIPL `Arts. 28–29` · NIST
AI RMF (Map, Measure) · couches 01, 03 et 04. Les mappages sont illustratifs, non une affirmation de
conformité.

## Violations de données personnelles spécifiques à l'IA

Une **violation de données à caractère personnel** est une violation de la sécurité entraînant la
destruction, la perte, l'altération, la divulgation non autorisée ou l'accès accidentel ou illégal à
des données à caractère personnel [1]. Le responsable du traitement notifie l'autorité sans délai
injustifié et, si possible, dans les 72 heures suivant la prise de connaissance, sauf si la
violation est peu susceptible de présenter un risque ; informe les personnes concernées lorsque le
risque est élevé ; et documente chaque violation [1]. L'IA ajoute des moyens de divulguer des
données qui ne ressemblent pas à une base de données volée.

| Type de violation | Mécanisme | Détection | Artefact |
|---|---|---|---|
| Régurgitation et extraction | Le modèle reproduit le texte d'entraînement mémorisé, y compris les noms, numéros de téléphone et adresses e-mail [43] | Résultats PII en sortie ; canaris ; signalements des utilisateurs | Journal des guardrails en sortie ; évaluation d'extraction |
| Inférence d'appartenance | Un attaquant apprend si un enregistrement était dans l'ensemble d'entraînement [44] | Découvert par test, rarement à l'exécution | Évaluation d'inférence d'appartenance |
| Inversion de modèle | Les caractéristiques des sujets d'entraînement sont reconstruites à partir des résultats et des scores de confiance [45] | Modèles de sondage à haut volume | Limites de débit ; résultat du red team |
| Exfiltration par injection de prompt | Les instructions cachées dans le contenu récupéré font que l'assistant divulgue les données qu'il peut lire [46][47] | Liens sortants bloqués ; anomalies d'appel d'outil | Décisions de guardrail ; traces d'appel d'outil |
| Récupération trop large | Un index RAG retourne les enregistrements d'un autre client | Alertes de récupération entre locataires | Tests d'accès à l'index ; traces de récupération |
| Exposition du journal | Prompts avec données personnelles lisibles dans les outils d'observabilité | Examens d'accès ; DLP sur les magasins de journaux | Verdicts de rétention ; journaux d'accès |

Le fait qu'un événement donné soit notifiable est l'appréciation de l'équipe de confidentialité sur
les faits, avec les exemples élaborés du CEPD comme guide [48]. Le travail d'ingénierie consiste à
produire les faits dans le délai imparti : la trace de ce qui a quitté le système, l'entrée du
registre indiquant les données que le système détient, l'historique des évaluations indiquant si la
faiblesse était connue. Pour les agents qui lisent le courrier, naviguent et appellent des outils,
les conseils de l'AEPD sur l'IA agentique du 18 fév 2026 énoncent les menaces supplémentaires et les
mesures que les responsables du traitement peuvent prendre [49]. Un incident peut déclencher
plusieurs minuteurs : les 72 heures du RGPD s'ajoutent aux délais de l'article 73 du Reglamento de
IA (chapitre 08) et à tout régime sectoriel ; le chapitre 17 place
[la notification de violation du RGPD à côté des minuteurs du Reglamento de IA](/bok/incidents#the-overlapping-clocks).
Donnez au [Pipeline d'incidents](/patterns/incident-pipeline) une branche de violation de données
personnelles avec son propre minuteur à partir de l'horodatage de la prise de connaissance, et
conservez les 96 heures et le seuil de risque élevé de la proposition Omnibus comme paramètre, non
comme règle actuelle [30].

**Correspondances :** RGPD `Art. 4(12)`, `Arts. 32–34` · Reglamento de IA `Art. 15`, `Art. 73` ·
OWASP LLM02:2025 · OWASP Agentic ASI01 [50] · NIST AI RMF (Manage) · couches 03, 04 et 05. Les
mappages sont illustratifs, non une affirmation de conformité.

## Le côté RGPD de l'Omnibus numérique

Un seul des deux textes Omnibus est une loi : le **règlement omnibus numérique sur l'IA**, Règlement
(UE) 2026/1744, en vigueur depuis le 27 jul 2026, qui a créé l'article 4a [2]. La proposition
**Omnibus numérique** du 19 nov 2025, COM(2025) 837, modifierait le RGPD et les règles connexes
[30]. Au 2026-09-24, elle reste une proposition : les commissions ITRE et LIBE du Parlement avaient
un projet de rapport du 22 jun 2026 et plus de 1 750 amendements, le vote de mandat prévu du Conseil
du 26 jun 2026 a été annulé, et en août 2026 les trilogues n'avaient pas commencé [51]. Les
commentaires sur les textes de travail du Conseil ont signalé qu'un compromis de juin a remplacé
l'article 88c proposé par un considérant et a remanié la définition des données personnelles par une
nouvelle disposition de pseudonymisation [52].

| Modification RGPD proposée [30] | Droit actuel | Construire maintenant |
|---|---|---|
| `Art. 4(1)` : pas des données à caractère personnel pour une entité qui ne peut pas identifier la personne par des moyens raisonnablement susceptibles d'être utilisés | Considérant 26 ; le jugement SRB [7] | Registres de garde des clés |
| `Art. 9(2)(k)`, `9(5)` : données de catégories spéciales résiduelles dans le développement et l'exploitation de l'IA ; éviter, supprimer ou protéger contre les résultats | Aucune condition spécifique à l'IA | Analyses de catégories spéciales ; filtres de résultats |
| `Art. 88c` : intérêts légitimes pour l'IA, avec minimisation, protection des données résiduelles, transparence renforcée et droit inconditionnnel d'opposition | Article 6(1)(f) et le test en trois étapes [3] | LIA avec un point de terminaison de désinscription |
| `Art. 22` : liste de permissions ; nécessité contractuelle même si un humain pourrait décider | Article 22 actuel [1] | Registres de décisions ; chemins de contestation |
| `Art. 33` : violations à haut risque uniquement, 96 heures, point d'entrée unique | 72 heures, tout risque | Un minuteur de violation paramétré |
| `Art. 35` : listes AIPD à l'échelle de l'UE, modèle et méthodologie | Listes nationales | Une AIPD mappable à un schéma commun |

La lecture est courte : ne construisez pas selon une proposition. Construisez les contrôles que les
deux versions veulent, et rendez les paramètres qui peuvent changer (horloge de violation, seuil de
notification, déclencheurs AIPD) configurables, non codifiés.

## Au-delà de l'UE : Royaume-Uni, États-Unis, Brésil et Chine

### Reino Unido

La loi Data (Use and Access) Act 2025, section 80, a remplacé l'article 22 du RGPD du Royaume-Uni
par les articles 22A à 22D : une décision importante sans implication humaine significative est
autorisée avec des garanties (information, représentations, intervention humaine, contestation) ;
les données de catégories spéciales sont limitées au consentement explicite, ou au contrat ou à
l'autorisation légale avec la condition d'intérêt public substantiel ; et la nouvelle base
d'intérêts légitimes reconnus ne peut pas soutenir une telle décision [23]. Les règles sont entrées
en vigueur le 5 fév 2026 [23]. L'ICO a consulté sur le projet de conseils ADM du 31 mar au 29 may
2026 [53], et marque ses conseils sur l'IA comme en révision en raison de la loi [36]. Le chapitre
08 place le Royaume-Uni dans la [carte réglementaire](/bok/regulatory-map#united-kingdom).

### États-Unis

Il n'existe pas de loi fédérale complète sur la confidentialité. Les règlements de Californie sur
l'ADMT, les évaluations des risques et les audits de cybersécurité sont entrés en vigueur le 1 jan
2026 [24]. Le chapitre 21 parcourt un outil d'embauche à travers
[Colorado SB 26-189 et les règles ADMT de la CPPA](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes)
côte à côte. L'ADMT signifie une technologie qui utilise le calcul pour remplacer ou remplacer
substantiellement la prise de décision humaine ; une décision importante concerne le prêt, le
logement, l'éducation, l'emploi ou la santé. Les évaluations des risques sont dues avant, entre
autres, l'utilisation d'ADMT pour les décisions importantes, certaines inférences automatisées et la
formation d'ADMT ou de technologie de reconnaissance faciale ; pour le traitement antérieur aux
règles, elles sont dues au 31 dec 2027, avec des soumissions à l'agence au 1 apr 2028 [24]. La loi
de Virginie montre la forme des autres dans le tableau : les désinscriptions de la publicité ciblée,
de la vente et du profilage important, et les évaluations que le procureur général peut exiger
[25][54]. Le nombre d'États ayant de telles lois ne cesse de croître (vérifiez le nombre actuel).

| Loi | Droit de profilage ou d'ADMT | Obligation d'évaluation | Remarque sur les données sensibles |
|---|---|---|---|
| CCPA de Californie et règlements ADMT | Avis préalable à l'utilisation ; désinscription ou appel ; accès [24] | Évaluations des risques, soumises à l'agence [24] | Les données neurales sont sensibles [41] |
| CDPA de Virginie | Désinscription du profilage [25] | Évaluations, disponibles au procureur général [54] | Les données sensibles déclenchent une évaluation [54] |
| Colorado Privacy Act (2023-07-01) | Désinscription incl. profilage [26] | Évaluations pour risque accru [26] | Les données neurales et biologiques sont sensibles [42] |
| Minnesota CDPA (2025-07-31) | Question, raison, examen, réévaluation [27] | Non mappé dans cette édition | Non mappé dans cette édition |

L'unité pratique est le droit, non l'État : un signal de désinscription honoré à l'inférence, un
flux de travail de raison et d'examen, un modèle d'évaluation avec des champs pour les déclencheurs
de chaque État.

### Brésil et Chine

La **LGPD** du Brésil inclut les intérêts légitimes parmi ses bases légales, établit des conditions
plus strictes pour les données sensibles, traite les données anonymisées comme en dehors de la loi
sauf si l'anonymisation peut être inversée avec des efforts raisonnables, donne le droit de demander
un examen des décisions entièrement automatisées avec information sur les critères (sous réserve des
secrets commerciaux), et permet à l'autorité d'exiger un rapport d'impact [28].

La **PIPL** de Chine énumère ses bases légales à l'article 13 sans base générale d'intérêts
légitimes, donc la formation sur les informations personnelles repose généralement sur le
consentement ou une autre base énumérée. Les décisions automatisées doivent être transparentes et
équitables, avec un droit à une explication et à refuser les décisions entièrement automatisées
d'impact significatif ; les informations sensibles, y compris la biométrie, nécessitent la nécessité
et le consentement distinct ; la fourniture transfrontalière nécessite une évaluation de sécurité,
une certification ou le contrat standard du CAC ; et une évaluation d'impact est requise à l'avance
pour les données sensibles, les décisions automatisées, le traitement confié et la fourniture
transfrontalière, conservée pendant au moins trois ans [5]. Le chapitre 08 mappe les règles
spécifiques à l'IA de la Chine ([Chine](/bok/regulatory-map#china)).

## Obligation de mapper les artefacts

Couches :
**1 Gouvernance en tant que code · 2 Inventaire et transparence · 3 Évaluations et red teaming comme preuves · 4 Contrôles d'exécution et observabilité · 5 Assurance et conformité continue**.

| Obligation | Artefact | Couche | Titulaire de l'obligation | Enregistrement de preuve |
|---|---|---|---|---|
| RGPD `Art. 5(1)(b)`, `6(4)` limitation de finalité | Balises de finalité ; politique de correspondance de finalité | 1 · 2 | Responsable du traitement | Verdict par exécution |
| RGPD `Art. 6` base légale | Registre de base ; LIA versionnée | 2 | Responsable du traitement | Entrée de registre avec référence LIA |
| RGPD `Art. 7` consentement | Journal de consentement-finalité | 2 · 5 | Responsable du traitement | Retraits tracés aux exécutions |
| RGPD `Arts. 13–14` transparence | Avis généré à partir du registre | 2 | Responsable du traitement | Version d'avis par version de modèle |
| GDPR `Art. 5(1)(c)`, `Art. 25` | Justification des caractéristiques ; filtres PII ; rétention en tant que code | 1 · 3 | Responsable du traitement | Journaux de filtres ; verdicts de rétention |
| RGPD `Art. 28` sous-traitants | Liste de contrôle de clause de fournisseur d'IA | 2 · 5 | Responsable du traitement | Enregistrement de porte par changement |
| GDPR `Art. 30` ROPA | Enregistrements générés par moment de traitement | 2 · 5 | Responsable du traitement ; sous-traitant | Enregistrement généré |
| GDPR `Arts. 35–36` DPIA | Modèle AIPD d'IA ; décision « pas d'AIPD » | 1 · 2 | Responsable du traitement | AIPD versionnée |
| Transferts RGPD `Arts. 44–46` | Registre des transferts ; politique de routage ; TIA | 1 · 4 · 5 | Responsable du traitement ; sous-traitant | Verdicts de routage |
| GDPR `Art. 22`, `15(1)(h)` ADM | Registre de décision ; avis ; chemin de contestation | 4 · 5 | Responsable du traitement ; producteur de score | Registres de décision et d'examen |
| Droits RGPD `Arts. 15–17`, `21` | Flux de demande dans tous les emplacements | 4 · 5 | Responsable du traitement | Registre de traitement |
| Anonymat du modèle RGPD `Art. 5(2)` | Dossier de preuves d'anonymat ; évaluations d'attaque à la vie privée | 3 · 5 | Responsable du traitement (développeur) | Résultat d'évaluation par version |
| Données sensibles et déduites RGPD `Art. 9` | Test de proxy ; politique d'inférence ; registre de condition | 1 · 3 · 4 | Responsable du traitement | Évaluation de proxy ; décisions du classificateur |
| Violations RGPD `Arts. 33–34` | Branche violation du pipeline d'incidents | 4 · 5 | Responsable du traitement ; sous-traitant | Horodatage de sensibilisation ; notification |
| Règlement sur l'IA `Art. 4a` | Ensemble de biais pseudonymisé ; tâche de suppression ; raison ROPA | 1 · 2 | Fournisseur ; déployeur (exceptionnellement) | Journal de suppression ; entrée ROPA |
| Règlement sur l'IA `Art. 26(9)`, `27(4)` | Partage FRIA-as-Code des champs AIPD | 2 | Déployeur | Évaluations liées |
| Règlement sur l'IA `Art. 86` | Explication liée au registre de décision | 4 · 5 | Déployeur | Explication par demande |
| UK GDPR `Arts. 22A–22D` | Flux de sauvegarde ; justification de l'implication | 4 · 5 | Responsable du traitement | Enregistrements d'examen |
| Règlements ADMT de la CCPA | Notification préalable à l'utilisation ; opt-out ou appel ; évaluation des risques | 2 · 4 · 5 | Entreprise | Notification ; opt-outs ; évaluation |
| Opt-outs de profilage des États américains | Indicateur d'opt-out à l'inférence ; modèle d'évaluation | 1 · 4 · 5 | Responsable du traitement | Verdicts d'opt-out |
| BIPA ; MHMDA ; lois sur les données neurales | Capture du consentement ; calendrier de conservation ; indicateurs d'admission | 1 · 2 | Entreprise | Journaux de consentement et de destruction |
| LGPD `Art. 20`; PIPL `Arts. 24`, `55–56` | Flux d'examen et d'explication ; PIPIA | 4 · 5 | Responsable du traitement ; sous-traitant | Registres d'examen ; PIPIA |

> **En pratique (illustratif)**
> Un responsable de l'ingénierie de la confidentialité dans un grand opérateur télécom a reconstruit
> l'AIPD `csa-01` de sorte que la plupart en était générée : les moments de traitement du registre,
> les bases du registre des bases, la carte de transfert de la politique de routage, le risque de
> mémorisation de la dernière évaluation de confidentialité, le chemin des droits du flux de
> demande. Le DPO a toujours écrit et signé le jugement de risque. Quand le fournisseur a changé de
> région, trois champs ont changé et l'AIPD a montré une diff au lieu de devenir obsolète dans un
> lecteur partagé.

**Correspondances :** RGPD `Arts. 5–7`, `9`, `13–17`, `21`, `22`, `25`, `26`, `28`, `30`, `32–36`,
`44–46` · UK GDPR `Arts. 22A–22D` · CCPA et ses règlements ADMT · Lois sur la confidentialité de
Virginie, Colorado et Minnesota · BIPA · Washington MHMDA · LGPD · PIPL · Règlement sur l'IA
`Arts. 4a`, `5`, `26`, `27`, `86` · ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Govern, Map,
Measure, Manage) · les cinq couches. Les mappages sont illustratifs, non une affirmation de
conformité.

## Ce que vous pouvez faire cette semaine

1. **Énumérez les moments de traitement** de votre système d'IA à plus haut risque et écrivez la
   base légale et la conservation à côté de chacun. Chaque cellule vide est un constat.
2. **Ajoutez une évaluation de confidentialité à la porte** : un test de fuite de PII ou d'inférence
   d'appartenance avec un seuil qui fait échouer la compilation. Son résultat est la première page
   d'un dossier de preuves d'anonymat.
3. **Exécutez une demande d'effacement simulée** via corpus, snapshots, index RAG, journaux et
   poids, écrivez le registre de traitement, et chronométrez-le par rapport à la limite d'un mois.
4. **Envoyez à vos fournisseurs d'IA la liste de contrôle des clauses** (pas de formation,
   conservation des prompts, région, sous-traitants, avis de modification) et stockez les réponses
   sur leurs entrées de registre.
5. **Tracez un appel d'inférence** jusqu'au pays qui le sert et vérifiez que le registre des
   transferts nomme un motif. Si ce n'est pas le cas, la politique de résidence a sa première règle.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 4(1), 4(4), 4(5), 4(12), 4(14), 5, 6, 6(4), 7, 9, 12(3), 13–17, 21, 22, 25, 26, 28, 30, 33–36, 44–46, 83(5), 99; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special-category data for bias detection and correction, incl. the records-of-processing reason; amended Art. 2(7) keeping the GDPR unaffected; Annex III high-risk requirements from 2 Dec 2027); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (no hierarchy of legal bases; three-step legitimate-interest test; mitigating measures, paras 99–107; anonymity test at para 43, elements and documentation for the evidence at paras 49–58; three scenarios on unlawful development). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[4] "Relying on the legal basis of legitimate interests to develop an AI system" (AI how-to sheet; legitimate interest as the most likely basis; balancing test; discretionary prior right to object; transparency on regurgitation risk). CNIL. 2025-06 (page dated 2026-01-05). https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system (verified: primary)
[5] Personal Information Protection Law of the People's Republic of China (Arts. 13 legal bases, 24 automated decision-making, 28–29 sensitive personal information and separate consent, 38 cross-border provision, 55–56 impact assessment kept three years), official English translation. National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[6] Guidelines 01/2025 on pseudonymisation (version for public consultation, 17 Jan to 14 Mar 2025). European Data Protection Board. 2025-01. https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en (verified: primary)
[7] Press release No 107/25: judgment in Case C-413/23 P, EDPS v SRB (pseudonymised data not personal data in all cases and for every person; identifiability for the controller's information duty assessed at collection, from the controller's point of view). Court of Justice of the EU. 2025-09-04. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf (verified: primary)
[8] Rocher, Hendrickx and de Montjoye, "Estimating the success of re-identifications in incomplete datasets using generative models" (99.98% of Americans correctly re-identified with 15 demographic attributes). Nature Communications 10, 3069. 2019-07-23. https://doi.org/10.1038/s41467-019-10933-3 (verified: primary)
[9] McMahan et al., "Communication-Efficient Learning of Deep Networks from Decentralized Data" (federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[10] Zhu, Liu and Han, "Deep Leakage from Gradients" (private training data recovered from shared gradients; arXiv 1906.08935). arXiv. 2019-06-21. https://arxiv.org/abs/1906.08935 (verified: primary)
[11] Stadler, Oprisanu and Troncoso, "Synthetic Data – Anonymisation Groundhog Day" (synthetic data either does not prevent inference attacks or does not retain utility; arXiv 2011.07018). arXiv. 2020-11-13. https://arxiv.org/abs/2011.07018 (verified: primary)
[12] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[13] Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" (WP248 rev.01; nine criteria; two criteria usually require a DPIA), endorsed by the EDPB. Article 29 Working Party. 2017-10-04. https://ec.europa.eu/newsroom/article29/items/611236 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(9) and (11) (deployers use Art. 13 information for their GDPR DPIA; informing people subject to Annex III high-risk decisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[16] Guidelines 05/2021 on the interplay between the application of Article 3 and the provisions on international transfers as per Chapter V of the GDPR, version 2.0 (three cumulative criteria for a transfer; remote access from a third country, Example 11). European Data Protection Board. 2023-02-14. https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf (verified: primary)
[17] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data, version 2.0. European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[18] Standard contractual clauses for international transfers (published 4 June 2021). European Commission. 2021-06-04. https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en (verified: primary)
[19] EU-US data transfers: adequacy decision for the EU-US Data Privacy Framework (adopted 10 July 2023). European Commission. 2023-07-10. https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en (verified: primary)
[20] Press release No 106/25: judgment in Case T-553/23, Latombe v Commission (action for annulment of the EU-US Data Privacy Framework adequacy decision dismissed). General Court of the EU. 2025-09-03. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf (verified: primary)
[21] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[22] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; effect of a variation in the data; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[23] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D: meaningful human involvement, restrictions for special-category data and for Art. 6(1)(ea), safeguards; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[24] California Privacy Protection Agency, CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved by OAL 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); significant decision § 7001(ddd); risk-assessment triggers § 7150; deadlines §§ 7155(b), 7157(a); ADMT compliance § 7200(b); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[25] Code of Virginia § 59.1-577, Personal data rights; consumers (opt out of targeted advertising, sale, or profiling in furtherance of decisions that produce legal or similarly significant effects). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-577/ (verified: primary)
[26] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[27] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review the data, correct and have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[28] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 7 legal bases incl. legitimate interests; Art. 11 sensitive data; Art. 12 anonymised data; Art. 20 review of automated decisions; Art. 38 impact report). Presidência da República (Brazil). 2018-08-14. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[29] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; deployer decisions based on Annex III high-risk outputs, except point 2; applies only where Union law does not otherwise provide the right). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[30] Proposal for a Regulation amending Regulations (EU) 2016/679, 2018/1724, 2018/1725, 2023/2854 and Directives 2002/58/EC, (EU) 2022/2555 and (EU) 2022/2557 as regards the simplification of the digital legislative framework (Digital Omnibus), COM(2025) 837 final, Council doc. 15698/25 (GDPR Arts. 4(1), 5(1)(b), 9(2)(k)–(l) and 9(5), 12(5), 13(4), 22, 33, 35, new 88c). European Commission / Council of the EU. 2025-11-19. https://data.consilium.europa.eu/doc/document/ST-15698-2025-INIT/en/pdf (verified: primary)
[31] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[32] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[33] Discussion Paper: Large Language Models and Personal Data (three theses: storing an LLM is not processing; rights attach to system inputs and outputs; unlawful training does not affect later use). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[34] "AI: the CNIL finalises its recommendations on the development of artificial intelligence systems and announces its upcoming work" (guidance on GDPR applicability to AI models; annotation; secure development). CNIL. 2025-07-22. https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems (verified: primary)
[35] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10 (as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[36] Guidance on AI and data protection (lawfulness incl. inferences and special category data; notice that it is under review because of the Data (Use and Access) Act; last updated 15 Mar 2023). Information Commissioner's Office. 2023-03-15. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ (verified: primary)
[37] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated from non-health information by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; enforcement under chapter 19.86 RCW; 31 Mar 2024, small businesses 30 Jun 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(e)–(h) (untargeted facial scraping; emotion inference at work and school; biometric categorisation of sensitive traits; real-time remote biometric identification for law enforcement). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 1 (biometrics: remote biometric identification excluding verification; sensitive-attribute categorisation; emotion recognition). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[40] "Biometric Information Privacy Act" (740 ILCS 14, 2008; informed written consent, retention schedule, no profiting; USD 1,000 / 5,000 statutory damages; 2024 amendment, SB 2979, on per-person recovery). Wikipedia. 2026. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: secondary)
[41] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data defined and added to sensitive personal information under the CCPA; approved by the Governor 28 Sep 2024; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[42] HB24-1058, Protect Privacy of Biological Data (biological and neural data as sensitive data under the Colorado Privacy Act; signed 17 Apr 2024; effective 7 Aug 2024). Colorado General Assembly. 2024-04-17. https://leg.colorado.gov/bills/hb24-1058 (verified: primary)
[43] Carlini et al., "Extracting Training Data from Large Language Models" (hundreds of verbatim training sequences extracted from GPT-2, incl. names, phone numbers and email addresses; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[44] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[45] Fredrikson, Jha and Ristenpart, "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[46] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (data theft via injected prompts in retrieved content; arXiv 2302.12173). arXiv. 2023-02-23. https://arxiv.org/abs/2302.12173 (verified: primary)
[47] LLM02:2025 Sensitive Information Disclosure (OWASP Top 10 for LLM Applications, 2025 edition). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ (verified: primary)
[48] Guidelines 9/2022 on personal data breach notification under GDPR, version 2.0. European Data Protection Board. 2023-03-28. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification-under_en (verified: primary)
[49] "La Agencia publica unas orientaciones sobre Inteligencia Artificial agéntica desde la perspectiva de protección de datos" (press release; guidance on agentic AI and data protection). Agencia Española de Protección de Datos. 2026-02-18. https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia (verified: primary)
[50] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[51] "The Digital Omnibus Regulation Proposal", Legislative Train Schedule (status: tabled; ITRE and LIBE joint; draft report 22 June 2026; 1,750+ amendments; Council mandate vote of 26 June cancelled; no trilogues; last update 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[52] "Digital Omnibus (GDPR) Negotiations at the Council – September 2026 Update" (June compromise replaced the AI provision, Art. 88c, with a recital; personal-data definition reworked via a new pseudonymisation article). Privacy Next. 2026-09-01. https://www.privacynext.eu/resources/digital-omnibus-gdpr-negotiations-at-the-council-september-2026-update/ (verified: reported)
[53] ICO consultation on the draft guidance about automated decision-making, including profiling (published 31 Mar 2026; closed 29 May 2026; follows the Data (Use and Access) Act 2025). Information Commissioner's Office. 2026-03-31. https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/ (verified: primary)
[54] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, risky profiling, sensitive data; available to the Attorney General on civil investigative demand). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
