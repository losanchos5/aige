---
lang: fr
source: bok/13-risk-management.md
sourceHash: "5d4b19bcfaf479cb81e356f3a4f331c3aaeac3d7bc06c510b84c82a57fa70158"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 13. Où se situe la gestion des risques

> La gestion des risques est la boucle qui dit à chaque autre contrôle à quel point il doit mordre :
> identifier, évaluer, traiter et surveiller, exécutée sur les cinq couches et sept flux de travail,
> avec le registre des risques comme preuve.

## Ce que ce chapitre établit

Le livre s'est appuyé sur le risque sans lui donner de place. Le chapitre 03 dit que chaque contrôle
doit
[commencer par un mode de défaillance ou un préjudice nommé](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
; le chapitre 04 met en garde contre un comité d'examen des risques qui évalue les résultats mais ne
peut pas arrêter un lancement ; le chapitre 08 nomme un « registre des risques en tant que code »
comme l'artefact derrière `Art. 9` sans le définir. Aucun d'eux ne dit où les décisions de risque
sont prises, à quelle échelle, par qui, ou comment une décision devient un seuil qu'un pipeline peut
appliquer. Ce chapitre le fait.

La revendication est courte. La gestion des risques n'est pas une sixième couche et n'est pas un
comité à côté du stack. C'est la boucle qui définit les paramètres de chaque autre contrôle : quels
systèmes obtiennent quelles portes, à quel point un seuil d'évaluation se situe, quand une personne
doit approuver une action, et qui peut signer pour le risque qui reste. La boucle a quatre étapes
(identifier, évaluer, traiter, surveiller). Chaque étape produit un artefact sur l'une des cinq
couches et est détenue par l'un des sept flux de travail du chapitre 06. Son enregistrement de
preuve est le **registre des risques**, conservé en tant que données versionnées plutôt que sous
forme de feuille de calcul.

Trois contrastes maintiennent l'honnêteté du champ d'application (le chapitre 01 a l'ensemble
complet). **La gestion des risques d'entreprise** agrège tous les risques qu'une organisation gère ;
la gestion des risques d'IA l'alimente, comme le demande le NIST AI RMF [1].
**La gestion des risques de modèle** valide les modèles selon la tradition bancaire ; aux
États-Unis, son orientation fondatrice, SR 11-7, a été remplacée le 17 avr 2026 par une orientation
interagences qui adapte la pratique au profil de risque de modèle, à la taille et à la complexité de
chaque banque [2]. Cette discipline emprunte l'adaptation et ajoute des agents, le contrôle à
l'exécution et la preuve continue. **La recherche en sécurité de l'IA** demande si une capacité est
dangereuse en principe ; ce chapitre décide ce qu'un déploiement peut faire, et le prouve.

## Risque, défini pour les ingénieurs

Deux définitions ancrent le chapitre. Le règlement sur l'IA de l'UE définit le **risque** comme « la
combinaison de la probabilité d'occurrence d'un préjudice et de la gravité de ce préjudice » [3]. Le
NIST AI RMF utilise la même forme, « la mesure composite de la probabilité qu'un événement se
produise et de l'ampleur ou du degré des conséquences », et permet que ces conséquences soient
positives ou négatives [1]. Ce livre fonctionne du côté négatif : préjudice aux personnes, à leurs
droits, à l'organisation et aux systèmes qui l'entourent. Le vocabulaire partagé provient de la
famille ISO des risques, dont la norme de vocabulaire actuelle est ISO 31073:2022 ; elle a remplacé
ISO Guide 73:2009, qui est maintenant retiré [4].

Chaque terme ci-dessous a un artefact qui le contient ; c'est le test qu'un terme fonctionne.

| Terme | Sens dans ce livre | Où il se trouve |
|---|---|---|
| **Source de risque** | Tout ce qui peut donner lieu à un risque : un ensemble de données, une attribution d'outil, un adversaire, un groupe d'utilisateurs | Registre `source` ; AIBOM ; modèle de menace |
| **Risque inhérent** | L'évaluation avant que tout contrôle ne soit compté | Registre `inherent` |
| **Risque résiduel** | L'évaluation après les contrôles qui ont des preuves de fonctionnement | Registre `residual` |
| **Appétence pour le risque** | Combien de risque, et de quels types, l'organisation est préparée à assumer pour ses objectifs | Fichier de données d'appétence (couche 01) |
| **Tolérance au risque** | Combien d'un risque donné l'organisation supportera pour atteindre un objectif ; la limite qu'une porte applique | Seuils de niveau (couche 01) |
| **Traitement** | L'option choisie (éviter, atténuer, transférer, accepter) et les contrôles qui la portent | Registre `treatment` ; ids de contrôle |
| **Acceptation** | Une décision nommée, signée et expirante de supporter un risque résiduel | Enregistrement d'acceptation (couche 05) |

L'IA rend chacun de ces éléments plus difficile à épingler. NIST énumère pourquoi : composants
tiers, risques émergents, pas de métriques convenues, évaluations qui changent au cours du cycle de
vie, résultats de laboratoire qui diffèrent de la production, opacité et pas de base humaine [1].
Donc chaque évaluation est provisoire, recalculée à partir de preuves (un résultat d'évaluation, un
signal de télémétrie, un incident), pas réargumentée dans une réunion.

## La boucle : identifier, évaluer, traiter, surveiller

ISO 31000:2018 donne le processus générique : communiquer et consulter ; définir le champ
d'application, le contexte et les critères ; évaluer (identifier, analyser, évaluer) ; traiter ;
surveiller et examiner ; enregistrer et rapporter [5]. L'édition 2018 est actuelle mais signalée
pour révision, avec un successeur au stade du projet de comité au 2026-09-24 [5]. ISO/IEC 23894:2023
est l'orientation spécifique à l'IA pour les organisations qui développent, produisent, déploient ou
utilisent l'IA, personnalisable à toute organisation et contexte [6]. Ses clauses suivent la
structure ISO 31000, comme le montre le croisement de NIST entre les deux [7].

Le règlement sur l'IA de l'UE transforme la même boucle en loi pour les systèmes à haut risque.
L'article 9 exige qu'un système de gestion des risques soit « établi, mis en œuvre, documenté et
maintenu », exécuté comme un processus itératif continu au cours du cycle de vie, avec quatre étapes
: identifier et analyser les risques connus et raisonnablement prévisibles pour la santé, la
sécurité ou les droits fondamentaux ; estimer et évaluer les risques en vertu de l'utilisation
prévue et de l'utilisation abusive raisonnablement prévisible ; évaluer d'autres risques à partir
des données de surveillance après commercialisation ; et adopter des mesures ciblées de gestion des
risques [8]. L'Omnibus numérique a laissé l'article 9 inchangé [9] ; pour les systèmes de l'annexe
III, il s'applique à partir du 2 déc 2027 [10]. Il lie le fournisseur ; le déployeur exécute sa
propre boucle via `Art. 26`} surveillance et, le cas échéant, la {`Art. 27`} FRIA (chapitre 08). Une
lecture juridique de l'article 9, écrite par rapport à la proposition de 2021, est un guide utile
pour ce que chaque étape demande [11]. Aucune norme harmonisée pour la gestion des risques d'IA
n'est encore citée au Journal officiel [12] ; le projet qui répondrait à l'article 9, prEN 18228,
est suivi dans [le programme JTC 21](/bok/principles-and-standards#the-jtc-21-programme) (chapitre
22).

Les quatre étapes compressent les activités d'ISO : **identifier** couvre le champ d'application, le
contexte, les critères et l'identification ; **évaluer** couvre l'analyse et l'évaluation ;
**surveiller** couvre l'examen, l'enregistrement et la déclaration. La communication et la
consultation s'exécutent à travers les quatre, ici en tant que cartographie des parties prenantes.

| Étape | Clause ISO/IEC 23894 (par croisement NIST) | NIST AI RMF | Règlement sur l'IA de l'UE `Art. 9` | Artefact principal |
|---|---|---|---|---|
| **Identifier** | 6.3 champ d'application, contexte, critères ; 6.4.2 identification | MAP 1–5; GOVERN 5 | 9(2)(a) | Profil de risque du cas d'utilisation ; carte des parties prenantes ; entrée du registre |
| **Évaluer** | 6.4.3 analyse ; reste de 6.4 | MAP 5.1; MEASURE 1–2 | 9(2)(b) | Évaluation matricielle ; résultats d'évaluation comme preuve de probabilité |
| **Traiter** | 6.5 traitement | MANAGE 1–3 | 9(2)(d); 9(5) | Contrôles liés au risque ; enregistrement d'acceptation |
| **Surveiller** | 6.6 surveillance et examen ; 6.7 enregistrement et déclaration | MEASURE 3–4; MANAGE 4 | 9(2)(c) | Réévaluation de la télémétrie ; liens d'incident ; journal d'examen |

### La boucle sur les cinq couches

La boucle n'ajoute pas une couche. Elle donne à chaque couche existante un travail de risque, et
chaque travail laisse un enregistrement de preuve que la couche au-dessus peut lire.

| Couche | Son travail de risque | Artefact de risque | Enregistrement de preuve |
|---|---|---|---|
| **01 Govern-as-Code** | Détient l'appétence, la tolérance, les échelles et les règles de niveau en tant que données ; bloque ce qui les dépasse | `appetite.yaml` ; politique de porte | Verdict de politique qui cite l'id de risque et la bande |
| **02 Inventory & Transparency** | Donne à chaque risque un objet : id de registre, propriétaire, niveau, parties prenantes affectées | Entrée du registre ; profil de risque du cas d'utilisation ; AIBOM | Enregistrement du registre avec niveau et ids de risque liés |
| **03 Evals & Red Teaming as Evidence** | Mesure la probabilité ; trouve les risques que personne n'a énumérés | Suites d'évaluation avec seuils définis par niveau ; résultats de test d'équipe rouge | Résultat d'évaluation classé par rapport au risque et à la version |
| **04 Runtime Controls & Observability** | Traite à l'exécution ; détecte un risque devenant réel | Garde-fous ; portes avec humain dans la boucle ; identité délimitée ; interrupteur d'arrêt | Événements de garde-fou ; journaux d'approbation ; traces |
| **05 Assurance & Continuous Compliance** | Enregistre, réévalue et rapporte ; détient les acceptations | Registre des risques en tant que données ; enregistrements d'acceptation ; liens d'incident | Historique du registre ; acceptations signées ; journal d'examen |

La preuve remonte, comme partout dans le stack. Une évaluation résiduelle est une affirmation qu'un
contrôle fonctionne ; elle n'est crédible que si l'id du contrôle se résout en un verdict de
politique, un résultat d'évaluation ou un événement de garde-fou de la période d'examen actuelle.
Une évaluation résiduelle dont le contrôle n'a pas de preuve est un risque inhérent avec une
meilleure étiquette.

### La boucle dans les sept flux de travail

Chaque flux de travail du chapitre 06 possède une partie de la boucle ; le propriétaire du système
reste responsable de chaque risque de bout en bout.

| Flux de travail | Étape de risque | Ce qu'il produit |
|---|---|---|
| [Admission et classification](/bok/the-role#intake-and-classification) | Identifier | Profil de risque du cas d'utilisation ; niveau ; premières entrées du registre ; carte des parties prenantes |
| [Inventaire et registre](/bok/the-role#inventory-and-registry) | Identifier | Id de registre, propriétaire et niveau pour chaque risque ; systèmes non enregistrés comme risque non évalué |
| [Évaluations et test d'équipe rouge comme preuves](/bok/the-role#evals-and-red-teaming-as-evidence) | Évaluer | Preuve de probabilité ; nouveaux risques à partir des résultats de test d'équipe rouge |
| [Politique en tant que code et portes](/bok/the-role#policy-as-code-and-gates) | Traiter | Appétence compilée en règles de porte ; déploiement refusé sur risque résiduel non accepté |
| [Surveillance à l'exécution et incidents](/bok/the-role#runtime-monitoring-and-incidents) | Traiter, surveiller | Contrôles à l'exécution ; signaux qui réévaluent les risques ; liens d'incident |
| [Assurance et preuve d'audit](/bok/the-role#assurance-and-audit-evidence) | Surveiller | Le registre comme preuve ; enregistrements d'acceptation et d'examen ; rapports |
| [Traduction réglementaire](/bok/the-role#regulatory-translation) | Identifier, traiter | Obligations comme sources de risque et comme traitements requis |

## NIST AI RMF et ISO/IEC 23894 sur le stack

Le NIST AI RMF 1.0 divise le travail de risque en quatre fonctions, chacune divisée en catégories et
sous-catégories. GOVERN s'applique à l'ensemble du processus ; MAP, MEASURE et MANAGE s'appliquent
par système et par étape du cycle de vie [1]. Le chapitre 08 mappe les fonctions aux couches ; le
tableau ci-dessous descend aux 19 catégories et aux sous-catégories sur lesquelles ce chapitre
s'appuie (paraphrasées ; les ids sont ceux de NIST ; la colonne de couche est la lecture
illustrative de ce livre). Le chapitre 22 parcourt
[les 19 catégories du NIST AI RMF](/bok/principles-and-standards#the-core-19-categories) en
intégralité.

| Catégorie | Sous-catégories que ce chapitre utilise | Couche | Artefact |
|---|---|---|---|
| GOVERN 1 | 1.3 niveau d'activité de risque défini par la tolérance au risque ; 1.5 fréquence d'examen ; 1.6 inventaire | 1 · 2 | Données d'appétence ; règles de niveau ; registre |
| GOVERN 2 | 2.1 rôles et lignes de communication ; 2.3 la direction générale possède les décisions de risque d'IA | 1 · 5 | Tableau d'autorité d'acceptation ; RACI |
| GOVERN 3 | 3.2 rôles pour les configurations humain-IA et la supervision | 1 · 4 | Conception de la supervision ; configuration de la porte d'approbation |
| GOVERN 4 | 4.2 les équipes documentent les risques et les impacts ; 4.3 tests, identification d'incidents, partage d'informations | 3 · 5 | Registre ; pipeline d'incidents |
| GOVERN 5 | 5.1 retours de personnes extérieures à l'équipe ; 5.2 retours arbitrés intégrés à la conception | 2 | Carte des parties prenantes ; canal de retours |
| GOVERN 6 | 6.1 politiques de tiers ; 6.2 contingence en cas de défaillance de systèmes de tiers à haut risque | 2 · 5 | Porte de diligence raisonnable ; AIBOM |
| MAP 1 | 1.1 destination et contexte ; 1.5 tolérances au risque déterminées et documentées | 1 · 2 | Profil de risque du cas d'usage ; données d'appétence |
| MAP 2 | 2.1 tâche et méthode ; 2.2 limites des connaissances et contrôle humain | 2 | Palier ; fiche de modèle |
| MAP 3 | 3.2 coûts des erreurs par rapport à la tolérance au risque ; 3.5 processus de contrôle humain | 2 · 3 | Note de bénéfice et de coût ; résultats de référence |
| MAP 4 | 4.1 risques de composant et juridiques ; 4.2 contrôles internes par composant | 2 | Risques liés à l'AIBOM |
| MAP 5 | 5.1 probabilité et ampleur de chaque impact ; 5.2 engagement régulier | 2 · 3 | Évaluations matricielles ; journal des parties prenantes |
| MEASURE 1 | 1.1 risques les plus importants mesurés en premier, non mesurés documentés ; 1.3 évaluateurs indépendants | 3 | Plan d'évaluation par risque |
| MEASURE 2 | 2.6 risque négatif résiduel dans la tolérance, défaillance sûre ; 2.7 sécurité ; 2.11 équité | 3 | Résultats d'évaluation ; conclusions du red team |
| MEASURE 3 | 3.1 risques existants, imprévus et émergents ; 3.3 retours utilisateurs et appel | 4 · 5 | Réévaluation de la télémétrie ; canal de retours |
| MEASURE 4 | 4.3 améliorations ou dégradations à partir des données de terrain | 3 · 5 | Examen de la couverture de la suite |
| MANAGE 1 | 1.1 go ou no-go ; 1.2 prioriser par impact, probabilité, ressources ; 1.3 atténuer, transférer, éviter ou accepter ; 1.4 risques résiduels documentés | 1 · 5 | Décision de porte ; registre de traitement ; enregistrement d'acceptation |
| MANAGE 2 | 2.1 alternatives non-IA pesées ; 2.3 réponse à un risque précédemment inconnu ; 2.4 remplacer, désengager ou désactiver | 4 | Enregistrement de substitution ; kill switch |
| MANAGE 3 | 3.1 risques de tiers surveillés ; 3.2 modèles pré-entraînés surveillés | 2 · 4 | Réévaluation du fournisseur ; surveillance de la dérive |
| MANAGE 4 | 4.1 plans de surveillance post-déploiement ; 4.3 incidents communiqués | 4 · 5 | Plan de surveillance ; pipeline d'incidents |

Le NIST AI RMF propose également des **profils** : un profil actuel de la manière dont le risque est
géré aujourd'hui, un profil cible des résultats souhaités, et l'écart entre les deux comme plan
d'action [1]. La matrice de personnalisation plus loin dans ce chapitre fait le même mouvement.

### ISO 31000, ISO/IEC 23894 et ISO/IEC 42001

Trois documents ISO, trois rôles. ISO 31000 est un guide générique pour tout risque [5] ; ISO/IEC
23894 l'applique à l'IA [6] ; ISO/IEC 42001 est la norme de système de management certifiable, dont
les clauses sur l'évaluation du risque IA (6.1.2), le traitement du risque IA (6.1.3) et
l'évaluation d'impact du système IA (6.1.4), et leur fonctionnement (8.2 à 8.4), exigent que la
boucle existe et s'exécute [13]. La correspondance de NIST montre que ses fonctions et les clauses
23894 décrivent un processus [7].

| Fonction NIST AI RMF | Clauses ISO/IEC 23894 dans la correspondance de NIST | Couche |
|---|---|---|
| GOVERN | 5.2 leadership et engagement ; 5.3 intégration ; 5.4 conception (5.4.1 à 5.4.5 : contexte, engagement, rôles, ressources, communication) | 1 · 2 |
| MAP | 5.4.1 contexte ; 6.3.2 à 6.3.4 périmètre, contexte et critères de risque ; 6.4.2 identification (6.4.2.3 sources de risque, 6.4.2.4 événements et résultats, 6.4.2.6 conséquences) ; 6.4.3 analyse ; 5.7 amélioration ; 6.7 | 2 · 3 |
| MEASURE | 6.3.4 critères de risque ; 6.4.2.5 identification des contrôles ; 6.4.3.2 conséquences ; 6.4.3.3 probabilité ; 6.6 surveillance et examen ; 6.7 | 3 |
| MANAGE | 5.5 mise en œuvre ; 5.7 amélioration ; 6.5 traitement (6.5.2 options, 6.5.3 plans) ; 6.6 ; 6.7 | 4 · 5 |

La correspondance de NIST était un brouillon de janvier 2023 pour commentaires, mappé par rapport au
brouillon final de 23894 [7] ; vérifiez les numéros de clause par rapport au texte publié de 2023
avant de les citer dans un audit (vérifiez).

> **Remarque** Une correspondance est un index, pas un contrôle (voir le motif
> [Framework Crosswalk](/patterns/framework-crosswalk)). La ligne qui compte est celle dont
> l'artefact existe et émet des preuves.

## Identifier le risque : sources, facteurs et parties prenantes

L'identification est l'endroit où le travail de risque échoue silencieusement : un registre écrit
lors d'un atelier énumère ce que la salle a pensé, et le reste reste invisible jusqu'à ce qu'un
incident le nomme. L'ingénierie signifie une liste systématique de sources, des facteurs
contributifs capturés comme données, des parties prenantes cartographiées plutôt que supposées, et
un chemin d'admission qu'aucun système ne peut contourner sur son chemin vers la production.

### Sources de risque internes et externes

Une source **interne** se situe dans le contrôle de l'organisation : données, choix de conception,
personnes, processus. Une source **externe** surgit en dehors : fournisseurs, adversaires,
utilisateurs, contexte opérationnel, régulateurs, société. La division prédit le traitement. Les
sources internes peuvent souvent être éliminées ou remplacées par la conception ; les externes
doivent surtout être conçues pour y résister et surveillées.

| Source | Interne ou externe | Risques typiques | Identifiés par (artefact, couche) |
|---|---|---|---|
| Données d'entraînement, d'ajustement fin et de récupération | Interne (externe si achetées) | Biais ; fuite de données personnelles ; corpus empoisonné ; connaissances obsolètes | Fiche de données, lignage (2) ; tests de données (3) |
| Choix et configuration du modèle | Interne | Capacité au-delà du besoin ; opacité ; confabulation | Fiche de modèle (2) ; évaluations de capacité (3) |
| Conception du système : prompts, outils, autonomie | Interne | Mauvais usage des outils ; agentivité excessive ; détournement d'objectif | Périmètre du registre (2) ; modèle de menace ; red team (3) |
| Personnes et processus | Interne | Biais d'automatisation ; systèmes sans propriétaire ; changement sans examen | Métriques de supervision (4) ; propriété du registre (2) |
| Incitations organisationnelles | Interne | Seuils ajustés pour livrer ; portes contournées | Taux de contournement de porte (1) ; audit (5) |
| Modèles, API et composants de tiers | Externe | Mises à jour silencieuses du modèle ; données d'entraînement non divulguées ; panne | Porte de diligence raisonnable, AIBOM (2) ; évaluations de limite (3) |
| Adversaires | Externe | Injection de prompt ; exfiltration de données ; extraction de modèle | Suite de red team (3) ; guardrails (4) |
| Utilisateurs et utilisation indevue raison­nablement prévisible | Externe | Utilisation en dehors de la destination ; sur-dépendance | Enregistrement de destination (2) ; évaluations de mauvais usage (3) |
| Contexte opérationnel | Externe | Dérive de données ; nouvelles populations ; décalages saisonniers | Télémétrie de dérive (4) |
| Droit et régulateurs | Externe | Nouvelle obligation ; date déplacée ; priorité d'application | Traduction réglementaire (1) ; correspondance |
| Personnes affectées et société | Externe | Impact sur les droits ; discrimination ; perte de confiance | FRIA ou DPIA (1 · 2) ; carte des parties prenantes |

Deux lignes portent une note juridique. L'**utilisation indevue raison­nablement prévisible** du
Règlement de l'IA est l'utilisation en dehors de la destination qui « peut résulter d'un
comportement humain raison­nablement prévisible ou d'une interaction avec d'autres systèmes, y
compris d'autres systèmes d'IA » [3] : le mauvais usage par les utilisateurs et par d'autres agents
est dans le champ d'application, pas une excuse. Et NIST avertit que le risque de tiers provient à
la fois du composant et de la manière dont il est utilisé, et que les métriques du développeur et du
responsable du déploiement peuvent ne pas correspondre [1]. Le chapitre 14 transforme le mauvais
usage prévisible en entrées de conception
([utilisation indevue raison­nablement prévisible](/bok/governing-development#reasonably-foreseeable-misuse)).
Les catalogues trouvent des lacunes ; ce ne sont pas des registres. NIST AI 600-1 nomme 12 risques
uniques à ou aggravés par l'IA générative et suggère de les regrouper comme techniques ou modèle,
mauvais usage par les humains, et écosystème ou sociétal [14]. Le Top 10 OWASP pour les applications
d'agents couvre les menaces d'agents telles que le détournement d'objectif, le mauvais usage des
outils et l'abus de privilèges [15]. Le MIT AI Risk Repository consolide 1 725 risques de 74 cadres
et constate que les décisions humaines causent presque autant de risques IA (38 %) que les systèmes
IA eux-mêmes (42 %) [16] : un registre qui énumère uniquement les modes de défaillance du modèle
manque une grande part de ce qui se passe mal.

### Facteurs contributifs et profil de risque du cas d'usage

Un **facteur contributif** ne crée pas un risque en soi ; il modifie la probabilité, la gravité ou
les deux. NIST donne une priorité initiale plus élevée lorsque les données d'entraînement sont
sensibles ou personnelles ou que les résultats affectent directement les personnes, et compte la
personnalisation du responsable du déploiement comme un facteur [1]. L'article 9 demande aux
prestataires de considérer les personnes de moins de 18 ans et d'autres groupes vulnérables [8].
Capturez les facteurs comme champs de registre à
[l'admission](/patterns/use-case-intake-risk-tiering) et laissez une politique calculer le palier.

| Facteur | Modifie | Champ de profil |
|---|---|---|
| Autonomie : suggère, rédige, agit après examen, agit seul | Probabilité et gravité | `autonomy` |
| Impact de la décision : aucun, informe, décide au sujet d'une personne | Gravité | `decision_impact` |
| Exposition : utilisateurs internes, clients, public ; volume quotidien | Probabilité | `exposure`, `volume_per_day` |
| Réversibilité du pire résultat | Gravité | `reversibility` |
| Groupes vulnérables affectés : mineurs, patients, candidats | Gravité | `vulnerable_groups` |
| Sensibilité des données : personnelles, catégorie spéciale, confidentielles | Gravité | `data_class` |
| Opacité et nouveauté de la technique | Probabilité, et confiance dans l'évaluation | `explainability`, `novel_technique` |
| Dépendance de tiers | Probabilité | `supplier_ids` |
| Personnalisation du responsable du déploiement (pour les prestataires) | Probabilité | `customisation` |

Le palier est calculé, pas négocié. Un propriétaire de système qui n'est pas d'accord avec le palier
change un facteur avec preuves, dans une demande de tirage examinée, et le palier suit.

> **Exemple (illustratif)** Les RH proposent un assistant de tri de CV. Son profil se lit
> `decision_impact: decides-about-person`, `exposure: public-applicants`,
> `autonomy: filters, a recruiter sees only the shortlist`, `data_class: personal`. La règle de
> palier le place en palier 3 avant toute réunion. La porte demande alors des évaluations d'équité
> et de robustesse, un lien AIPD et une acceptation signée pour tout risque résiduel au-dessus de
> Faible. Qu'il s'agisse également d'un système d'IA à haut risque en vertu du Règlement de l'IA est
> une question distincte pour la route Annexe III (chapitre 08).

### Cartographie des parties prenantes

Différents acteurs voient différents risques. Un développeur qui publie un modèle pré-entraîné peut
avoir une perspective de risque différente du responsable du déploiement qui l'utilise, et les
personnes lésées ne sont pas toujours des utilisateurs directs [1]. Le NIST AI RMF l'intègre dans
GOVERN 5.1, MAP 1.2 et MEASURE 1.3, qui demande que les communautés affectées soient consultées
selon que la tolérance au risque l'exige [1]. Pour les responsables du déploiement de certains
systèmes à haut risque, la FRIA en fait une obligation légale : elle nomme les catégories de
personnes susceptibles d'être affectées et les risques spécifiques de préjudice pour elles [17]. ISO
appelle la même étape « communiquer et consulter » [5].

| Partie prenante | Comment leur point de vue entre dans la boucle | Preuve |
|---|---|---|
| Utilisateurs directs (opérateurs, clients) | Tests d'utilisabilité ; retours en produit | Éléments de retour liés aux identifiants de risque |
| Non-utilisateurs affectés (candidats, patients, public) | Consultation ; FRIA ; plaintes | Enregistrement FRIA ; liens de plainte |
| Responsables du déploiement en aval (pour les prestataires) | Notice d'utilisation ; rapports du responsable du déploiement | Problèmes signalés par le responsable du déploiement |
| Prestataires en amont (pour les responsables du déploiement) | Diligence raisonnable ; avis de changement | Preuves du fournisseur dans l'AIBOM |
| Fonctions internes (juridique, confidentialité, sécurité, risque, audit) | Examen à l'admission ; défi de deuxième ligne | Enregistrements d'examen |
| Régulateurs et autorités | Obligations mappées ; chemins de signalement | Correspondance ; pipeline d'incidents |
| Cadres dirigeants et organe de gouvernance | Déclaration d'appétence ; rapports de risque | Appétence approuvée ; acceptations |

Le résultat n'est pas une affiche. C'est une liste de parties prenantes sur l'entrée du registre, un
champ `affected` sur chaque risque du registre, et un journal de qui a été consulté, quand et avec
quel résultat.

## Évaluer le risque : la matrice probabilité par gravité

Une matrice de risque transforme deux jugements en une bande qui déclenche une réponse. Sa valeur
réside dans la cohérence, non dans la précision : deux évaluateurs notant un même scénario doivent
aboutir à la même cellule, et la cellule doit décider du même verdict de porte à chaque fois. La
norme IEC 31010:2019 catalogue d'autres techniques d'évaluation des risques pour les cas où une
matrice ne suffit pas [18].

### Échelles définies

Sans définitions partagées, les évaluateurs peuvent donner des notes opposées au même risque [19].
Ancrez la probabilité à des preuves que vous pouvez lire (taux d'échec des évaluations, télémétrie,
incidents) et la gravité à la pire conséquence crédible d'une occurrence. Les seuils sont
illustratifs ; calibrez-les en fonction de vos volumes.

| Niveau | Probabilité | Définition (par système, en production) | Preuves qui la définissent |
|---|---|---|---|
| L1 | Rare | Non attendu dans la durée de vie du système | Une équipe de test ciblée ne peut pas la reproduire |
| L2 | Peu probable | Pourrait survenir environ une fois par an | Reproduit uniquement par une suite adversariale dédiée |
| L3 | Possible | Attendu quelques fois par an | Taux d'échec de régression ou d'équipe de test inférieur à 1 % |
| L4 | Probable | Attendu mensuellement | Taux d'échec de 1 % à 5 %, ou quasi-incidents en télémétrie |
| L5 | Quasi-certain | Attendu hebdomadairement ou plus | Taux d'échec supérieur à 5 %, ou déjà observé en production |

| Niveau | Gravité | Pire conséquence crédible d'une occurrence |
|---|---|---|
| S1 | Négligeable | Désagrément ; entièrement réversible ; aucun droit affecté |
| S2 | Mineur | Préjudice limité et réversible pour quelques personnes ou petite perte ; réparé en un jour |
| S3 | Modéré | Préjudice matériel aux individus (un refus injustifié, données d'une personne exposées) ; réversible avec effort |
| S4 | Majeur | Préjudice significatif pour de nombreuses personnes ou aux droits fondamentaux ; difficile à inverser |
| S5 | Catastrophique | Décès ou préjudice grave à la santé ; perturbation grave et irréversible d'une infrastructure critique ; préjudice grave aux biens ou à l'environnement ; violation généralisée des droits fondamentaux |

S4 et S5 ensemble couvrent les quatre catégories d'un **incident grave** selon le règlement sur l'IA
[3], donc un risque noté à ce niveau est un candidat incident déclarable le jour où il se
matérialise. L'[atlas des préjudices](/resources/harms) fournit une taxonomie des préjudices par
niveau, avec des enregistrements d'incidents réels, pour calibrer la colonne de gravité.
### La matrice et ce que chaque bande déclenche

| Gravité / probabilité | L1 Rare | L2 Peu probable | L3 Possible | L4 Probable | L5 Quasi-certain |
|---|---|---|---|---|---|
| **S5 Catastrophique** | Critique (dérogation) | Critique (dérogation) | Critique (dérogation) | Critique (dérogation) | Critique (dérogation) |
| **S4 Majeur** | Moyen | Élevé | Élevé | Critique | Critique |
| **S3 Modéré** | Faible | Moyen | Élevé | Élevé | Critique |
| **S2 Mineur** | Faible | Faible | Moyen | Moyen | Élevé |
| **S1 Négligeable** | Faible | Faible | Faible | Moyen | Moyen |

Une bande n'est utile que si elle change ce que le pipeline fait. La politique plus loin dans ce
chapitre compile ces conséquences illustratives.

| Bande | Traitement minimum | Porte | Qui peut accepter le risque résiduel | Examen |
|---|---|---|---|---|
| **Faible** | Surveiller | Entrée du registre et propriétaire | Propriétaire du système | Annuellement ou en cas de changement |
| **Moyen** | Au moins un contrôle conçu avec preuves | Porte d'évaluation sur le risque lié | Propriétaire du produit | Tous les six mois |
| **Élevé** | Contrôles conçus plus détection à l'exécution ; une personne décide où les conséquences atteignent une personne | Porte d'évaluation et garde-fou à l'exécution ; déploiement refusé sans acceptation actuelle | Comité des risques, deuxième ligne consultée | Trimestriel |
| **Critique** | Éliminer ou substituer ; l'ingénierie seule ne le déploie pas | Déploiement refusé | Organe directeur, ou personne | Mensuellement tant qu'ouvert |

### La dérogation de gravité catastrophique

Multiplier la probabilité par la gravité cache la queue. Une grille peut donner à une catastrophe
rare la bande d'une nuisance fréquente, et là où la fréquence et la gravité sont négativement
corrélées (la forme du risque catastrophique), les matrices peuvent être « pires que inutiles »
[19]. Donc S5 fonctionne sur sa propre voie :

1. **La bande ignore la probabilité.** Tout scénario S5 est Critique. Sa probabilité est
   enregistrée, car elle guide la surveillance, mais elle n'abaisse pas la bande.
2. **L'équipe ne peut pas l'accepter.** Le traitement doit éliminer le scénario ou réduire sa
   gravité, généralement en supprimant une capacité, une action ou une exposition. Sinon, seul
   l'organe directeur peut l'accepter, explicitement et pour une période fixe.
3. **Le préjudice présent signifie arrêt.** Là où des impacts négatifs significatifs sont imminents,
   des préjudices graves se produisent ou des risques catastrophiques sont présents, le NIST dit que
   le développement et le déploiement « doivent cesser de manière sûre jusqu'à ce que les risques
   puissent être suffisamment gérés » [1]. L'interrupteur de secours testé est le mécanisme.
4. **La frontière utilise la même logique.** Selon le Code de pratique GPAI, les signataires
   définissent des niveaux de risque systémique (ou d'autres critères d'acceptation), les appliquent
   avec des marges de sécurité et, si le risque systémique n'est pas acceptable, ne mettent pas le
   modèle à disposition, ou le restreignent, le retirent ou le rappellent [20].

La plupart des contrôles réduisent la probabilité ; seul un changement de conception réduit la
gravité. La dérogation force cette conversation de conception au lieu de laisser les contrôles de
probabilité réduire une catastrophe à Moyen.

### Ce qu'une matrice ne peut pas vous dire

Cox nomme quatre limites : mauvaise résolution, erreurs d'évaluation, aucune base pour l'allocation
des ressources, et entrées et sorties ambiguës [19]. Les réponses sont procédurales :

- **Conservez les chiffres derrière la cellule** (taux d'échec des évaluations, volume, estimation
  du pire cas) afin que la bande puisse être recalculée. La cellule est une vue des données, pas les
  données.
- **Ne jamais additionner ou faire la moyenne des cellules.** Priorisez par bande, puis gravité,
  puis coût du traitement ; MANAGE 1.2 priorise par impact, probabilité et ressources disponibles
  [1].
- **Lisez la probabilité basée sur les évaluations comme une limite inférieure.** Une évaluation est
  limitée par l'échantillonnage et détecte les régressions, pas la nouveauté
  ([les limites de la porte d'évaluation](/bok/definition#the-limits-of-the-eval-gate)).

Pour les systèmes à haut risque, la loi pointe dans la même direction : les tests s'exécutent par
rapport à « des métriques prédéfinies et des seuils probabilistes » appropriés à la destination
prévue [8]. Une échelle de probabilité écrite comme des seuils qu'un pipeline peut vérifier est
exactement cela.

## Appétit pour le risque et tolérance, compilés en portes

Le NIST ne prescrit pas une tolérance au risque. Il définit la tolérance comme la « disponibilité à
supporter le risque afin d'atteindre ses objectifs », l'appelle contextuelle et changeante, dit aux
organisations de suivre les règles du secteur ou de définir une tolérance raisonnable là où aucune
n'existe, et demande que les tolérances soient documentées (MAP 1.5) et définissent le niveau
d'effort de gestion des risques (GOVERN 1.3) [1]. Une déclaration d'appétit qui ne vit que dans un
dossier de conseil ne change rien à ce que le pipeline fait. Compilez-la.

### De la déclaration aux données

> **Exemple (illustratif)** Une déclaration d'appétit telle qu'un organe directeur pourrait
> l'approuver : « Nous utilisons l'IA pour rendre le personnel et les clients plus rapides. Nous
> acceptons un risque modéré dans les outils internes et dans le support décisionnel où une personne
> examine chaque résultat, afin que nous apprenions rapidement. Nous acceptons uniquement un risque
> résiduel faible dans les systèmes qui décident d'une personne ou agissent en son nom. Aucun agent
> ne déplace d'argent au-dessus d'un montant défini sans la décision d'une personne. Nous ne portons
> un risque catastrophique que avec l'acceptation explicite de l'organe directeur, pour une période
> fixe. Aucun risque n'est accepté indéfiniment. »

Chaque phrase devient une valeur dans un fichier versionné que les portes lisent. Le fichier est la
version appliquée ; la déclaration est sa documentation.

```yaml
# appetite.yaml (illustrative, not a claim of conformity)
version: 2026-09-24
approved_by: governing-body
tolerance:                     # highest residual band carried without escalation
  tier-1-internal: medium
  tier-2-decision-support: medium
  tier-3-decision-about-a-person: low
  tier-4-agentic-or-high-stakes: low
acceptance_authority:          # who may sign each residual band
  low: system-owner
  medium: product-owner
  high: risk-committee
  critical: governing-body
max_acceptance_days: {low: 365, medium: 180, high: 90, critical: 30}
eval_floor:                    # likelihood evidence required per tier
  tier-3-decision-about-a-person: {robustness: 0.95, subgroup_parity: 0.90}
  tier-4-agentic-or-high-stakes: {injection_resistance: 0.95, tool_scope_adherence: 0.99}
human_approval_above_eur: 250  # enforced at runtime by the approval gate
catastrophic_override: true    # severity 5: eliminate, or governing-body acceptance
```

| Clause de déclaration | Compilée en | Couche | Preuve |
|---|---|---|---|
| « risque modéré dans les outils internes et dans le support décisionnel » | `tolerance` pour les niveaux 1 et 2 : `medium` | 01 | Verdict de porte |
| « uniquement un risque résiduel faible dans les systèmes qui décident d'une personne ou agissent en son nom » | `tolerance` pour les niveaux 3 et 4 : `low` ; `eval_floor` | 01 · 03 | Verdict de porte ; résultat d'évaluation |
| « Aucun agent ne déplace d'argent au-dessus d'un montant défini sans la décision d'une personne » | `human_approval_above_eur` | 04 | Journal d'approbation |
| « risque catastrophique uniquement avec l'acceptation explicite de l'organe directeur » | Règle de dérogation ; `critical: governing-body` | 01 · 05 | Acceptation signée |
| « Aucun risque n'est accepté indéfiniment » | `max_acceptance_days` | 05 | Expiration de l'acceptation |

### Des données à une porte

La porte s'exécute au déploiement (couche 01) sur l'entrée du registre (couche 02), les risques
ouverts du système (couche 05) et ses derniers résultats d'évaluation (couche 03). Son verdict nomme
l'id du risque, donc la preuve dit quel risque a arrêté quelle version.

```
package risk.gate

import rego.v1

# Illustrative, not a claim of conformity. data.appetite is appetite.yaml;
# input holds the registry entry, the system's open risks and its eval results.

rank := {"low": 1, "medium": 2, "high": 3, "critical": 4}

tier := input.system.tier

deny contains "system has no known tier in the registry" if {
	not data.appetite.tolerance[tier]
}

# Residual above the tier's tolerance needs a current acceptance by the
# authority that the residual band requires.
deny contains msg if {
	some r in input.risks
	rank[r.residual.band] > rank[data.appetite.tolerance[tier]]
	not valid_acceptance(r, data.appetite.acceptance_authority[r.residual.band])
	msg := sprintf("%s: residual %s above %s tolerance, no valid acceptance", [r.id, r.residual.band, tier])
}

# Catastrophic-severity override: likelihood plays no part.
deny contains msg if {
	some r in input.risks
	r.residual.severity == 5
	not valid_acceptance(r, "governing-body")
	msg := sprintf("%s: severity 5 needs elimination or governing-body acceptance", [r.id])
}

# Eval floors by tier: missing evidence fails like bad evidence.
deny contains msg if {
	some metric, floor in data.appetite.eval_floor[tier]
	not input.evals[metric] >= floor
	msg := sprintf("%s: eval %s below the %s floor", [input.system.id, metric, tier])
}

valid_acceptance(r, role) if {
	r.acceptance.role == role
	time.parse_ns("2006-01-02", r.acceptance.expires) > time.now_ns()
}
```

Deux détails importent plus que la syntaxe. Un résultat d'évaluation manquant échoue comme un
résultat faible, donc « nous ne l'avons pas mesuré » n'est jamais un succès. Une acceptation expirée
compte comme aucune, donc le calendrier applique l'examen. Comme chaque politique de couche 01, elle
est livrée avec une fixture qui doit être refusée et une qui doit réussir
([Couche 01](/bok/the-stack#layer-01-govern-as-code)).

## Traiter le risque : la hiérarchie d'atténuation

Le NIST énumère les options de réponse comme l'atténuation, le transfert, l'évitement ou
l'acceptation [1] ; l'ordre dans lequel vous les utilisez importe davantage. La sécurité au travail
classe les contrôles par efficacité (élimination, substitution, ingénierie, administrative, puis
équipement de protection) et avertit contre la dépendance au dernier quand de meilleures options
existent [21]. Le règlement sur l'IA définit le même ordre pour les systèmes à haut risque :
éliminer ou réduire le risque par la conception autant que techniquement possible, puis des mesures
d'atténuation et de contrôle, puis des informations et, le cas échéant, une formation pour les
responsables du déploiement [8]. Le NIST ajoute que les alternatives non-IA soient pesées (MANAGE
2.1) [1].

| Échelon | Ce que cela signifie pour l'IA | Contrôle de stack | Motif | Preuve |
|---|---|---|---|---|
| **1 Éliminer** | Ne le construisez pas ; supprimez la capacité ; refusez l'utilisation | Verdict de refus de politique ; liste de blocage d'utilisation interdite ; outil jamais accordé | [Policy Card](/patterns/policy-card) | Verdict de refus ; portée absente du registre |
| **2 Substituer** | Même objectif, risque inférieur : une méthode non-IA, un modèle plus simple ou interprétable, récupération plutôt que génération libre, lecture seule au lieu d'écriture | Enregistrement de conception ; portée de registre plus étroite | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | Décision de conception liée à l'id du risque |
| **3 Concevoir** | Contrôles qui agissent sans dépendre de quelqu'un qui se souvient | Porte d'évaluation ; garde-fou à l'exécution ; porte d'approbation ; interrupteur de secours | [Porte d'évaluation en CI](/patterns/eval-gate-in-ci), [Garde-fou à l'exécution](/patterns/runtime-guardrail), [Porte avec intervention humaine](/patterns/human-in-the-loop-gate), [Interrupteur de secours](/patterns/kill-switch-circuit-breaker) | Résultats d'évaluation ; événements de garde-fou ; journaux d'approbation |
| **4 Administrative** | Règles pour les personnes : instructions d'utilisation, formation, procédures, avertissements | Instructions d'utilisation ; enregistrements de formation et de maîtrise | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Attestations de formation ; instructions versionnées |
| **5 Accepter et surveiller** | Porter ce qui reste, en connaissance de cause, et le surveiller | Acceptation signée ; télémétrie ; date d'examen | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Enregistrement d'acceptation ; signal de surveillance |

L'élimination a un plancher légal : les pratiques que le règlement sur l'IA interdit sont éliminées,
jamais traitées ou acceptées [22]. Le **transfert** (assurance, indemnités contractuelles) se situe
à côté de l'échelle, pas sur elle : il déplace la conséquence financière, non le préjudice à la
personne à l'autre bout de la décision, donc il ne remplace jamais les échelons un à quatre où les
personnes peuvent être lésées.

Quatre règles transforment l'échelle en pratique :

- **Travaillez de haut en bas, et écrivez pourquoi.** Le registre enregistre quels échelons
  supérieurs ont été considérés et pourquoi ils étaient infaisables ; un traitement qui commence à
  l'échelon quatre sans cet enregistrement échoue l'examen.
- **Les contrôles conçus ne comptent que avec preuves.** Un garde-fou qui n'a jamais été déclenché
  dans un test, ou un interrupteur de secours jamais exercé, est au mieux l'échelon quatre.
- **Les contrôles administratifs seuls ne font pas progresser une bande Élevée.** Les examinateurs
  ont tendance à confirmer les résultats confiants de la machine ; la supervision doit être conçue
  et mesurée
  ([concevoir la supervision humaine](/bok/the-stack#designing-human-oversight-article-14)).
- **Chaque échelon laisse un résidu.** L'échelle se termine par l'acceptation, jamais par « résolu
  ».

> **En pratique (illustratif)**
> La première conception de `csa-01`, l'assistant de service client du chapitre 04, lui donnait un
> outil qui émettait des remboursements. L'intake a évalué le scénario « une instruction injectée
> fait que l'agent rembourse le mauvais montant ou compte » à L4 et S3 : Élevé. L'équipe a parcouru
> l'échelle. Éliminer les remboursements aurait supprimé le cas d'usage. Substituer une portée en
> lecture seule, l'agent rédigeant un remboursement qu'une personne émet, a coupé le chemin vers
> l'événement. Les contrôles techniques (un guardrail d'injection, une porte d'évaluation de
> résistance à l'injection, l'étape d'approbation) ont réduit davantage la probabilité. Le résidu
> s'est avéré être L2 et S3, Moyen, accepté par le propriétaire du produit pendant six mois, nul si
> le score d'évaluation tombait en dessous de son plancher. La portée de remboursement en lecture
> seule dans l'entrée du registre du chapitre 04 est cette décision, en tant que données.

## Risque inhérent, risque résiduel et qui l'accepte

**Le risque inhérent** est l'évaluation avant que tout contrôle ne soit compté.
**Le risque résiduel** est le « risque subsistant après le traitement du risque », dans la
définition dérivée de l'ISO que le NIST adopte [1]. L'écart entre eux est la valeur revendiquée pour
les contrôles ; un grand écart reposant sur un seul contrôle est un point de défaillance unique qui
mérite son propre test.

Trois textes font du risque résiduel un résultat de première classe. L'article 9 exige que « le
risque résiduel pertinent associé à chaque danger, ainsi que le risque résiduel global » soit jugé
acceptable [8]. MEASURE 2.6 demande que le risque négatif résiduel reste dans les limites de la
tolérance et que le système échoue en toute sécurité, et MANAGE 1.4 que les risques résiduels pour
les acquéreurs en aval et les utilisateurs finaux soient documentés [1]. Ainsi, une évaluation
résiduelle est aussi un artefact de transparence : elle appartient aux limitations de la fiche de
modèle et aux instructions d'utilisation, pas seulement au registre.

Une règle le maintient honnête :
**une évaluation résiduelle ne crédite que les contrôles dont les identifiants se résolvent en preuves de la période d'examen actuelle.**
Si l'évaluation n'a pas été exécutée depuis que le modèle a changé, l'évaluation résiduelle revient
vers l'évaluation inhérente jusqu'à ce qu'elle le soit.

### Qui peut accepter

L'acceptation est une décision avec un nom. Le modèle des trois lignes de l'Institute of Internal
Auditors donne une division commune du travail : la première ligne fournit le produit et gère son
risque ; la deuxième ligne fournit l'expertise, le soutien, la surveillance et le défi sur le risque
; l'audit interne fournit l'assurance indépendante ; l'organe directeur fixe la direction [23]. L'AI
RMF ajoute que la direction générale assume la responsabilité des décisions concernant le risque de
l'IA (GOVERN 2.3) [1]. [Le chapitre 12](/bok/governance-program#risk-acceptance-and-exceptions)
couvre les comités et les droits de décision ; le tableau ci-dessous est la partie qu'une porte peut
appliquer.

| Bande résiduelle | Accepte | Consulté (défi) | Période maximale | Enregistrement |
|---|---|---|---|---|
| **Faible** | Propriétaire du système | Aucun requis | 12 mois | Entrée du registre |
| **Moyen** | Propriétaire du produit | Risque de deuxième ligne | Six mois | Acceptation signée avec une condition d'annulation |
| **Élevé** | Comité des risques | Deuxième ligne ; juridique et confidentialité où les droits sont impliqués | Trois mois | Acceptation signée avec justification et conditions |
| **Critique ou S5** | Organe directeur, ou personne | Deuxième ligne ; examen indépendant | Un mois, renouvelé uniquement avec de nouvelles preuves | Procès-verbal de la décision lié à l'identifiant du risque |

Un dossier d'acceptation porte la personne et le rôle, la justification, les conditions qui
l'annulent (un signal de surveillance et son seuil), la date et l'expiration. Chaque résidu est
accepté par l'autorité que sa bande nomme ; la porte bloque uniquement lorsque la bande est
au-dessus de la tolérance du niveau et qu'aucune acceptation valide n'existe. Au-dessus de Moyen,
l'acceptant devrait être assis au moins un niveau au-dessus de l'équipe dont la date de livraison
dépend de la réponse.

> **Anti-patron** « Accepté » comme statut sans nom, sans date et sans expiration. Le registre se
> remplit de risques que personne n'a choisi de porter, et le premier incident révèle que
> l'acceptation était une valeur par défaut de feuille de calcul.

## Le registre des risques comme enregistrement de preuves

Le chapitre 08 nomme un « registre des risques en tant que code » comme l'artefact derrière
`Art. 9`} et ISO/IEC 23894 ; cette section le définit. Le registre est l'enregistrement de preuves
de la couche 05 de la boucle entière : un fichier versionné par risque, indexé par un identifiant de
registre, chaque référence de contrôle se résolvant en un artefact qui émet des preuves, chaque
changement examiné comme du code. Il répond au « documenté » de l'article 9 et c'est par où un
auditeur commence. Sa forme standard la plus proche est le plan d'action et les jalons (`POA&M`})
dans la couche d'évaluation d'OSCAL [24], dans laquelle un registre peut exporter ses traitements
ouverts. Un schéma JSON pour
[une entrée de registre des risques](/resources/templates#schema-risk-register-entry), avec un
exemple rempli, se trouve sur la page des modèles.
### Schéma du registre

```yaml
# risk-register/csa-01/R-017.yaml (illustrative, not a claim of conformity)
id: R-017
system: csa-01                        # registry id (layer 02)
title: Injected instruction leads to a wrong refund
scenario:
  cause: instruction hidden in a customer message reaches the refund workflow
  event: a refund is proposed and issued for the wrong amount or account
  consequence: financial loss; customer harm; possible fraud report
source: {origin: external, category: adversary}
affected: [customers, finance-operations]
factors: {autonomy: drafts, exposure: public, reversibility: partial}
inherent: {likelihood: 4, severity: 3, band: high}
treatment:
  option: mitigate
  rung: substitute+engineer
  higher_rungs_considered: "eliminate rejected (refunds are the use case); substitute adopted (read-only scope)"
  controls:
    - scope.refunds.read-only           # registry scope (layer 02)
    - guardrail.input.injection.v3      # runtime guardrail (layer 04)
    - eval.injection-resistance.v4      # eval gate (layer 03)
    - approval.refund-issue             # human decision (layer 04)
residual: {likelihood: 2, severity: 3, band: medium}
owner: team-support-platform
acceptance:
  by: head-of-support-products
  role: product-owner
  date: 2026-09-18
  expires: 2027-03-17
  voided_if: "injection-resistance below 0.95, or approval override rate above 2%"
review: {cadence: semiannual, last: 2026-09-18, next: 2027-03-17}
rerate_on: [model-version-change, new-tool-grant, linked-incident, eval-regression]
links:
  evals: [injection-resistance.v4@csa-01@2026-09-18]
  incidents: []
  obligations: ["ISO/IEC 42001 6.1.3", "NIST AI RMF MANAGE 1.3"]
status: open
```

Trois champs font ce qu'une feuille de calcul ne peut pas. `treatment.controls`} se résout en
artefacts qui émettent des preuves, `treatment.higher_rungs_considered`} prouve que la hiérarchie a
été appliquée, et `acceptance.voided_if`} permet à la télémétrie de terminer une acceptation sans
attendre une réunion.

### Exploitation du registre

- **Cadence par bande, déclencheurs par événement.** Le tableau des bandes définit le calendrier ;
  `rerate_on`} le remplace, forçant une réévaluation avant la prochaine version.
- **Les modifications arrivent sous forme de demandes de tirage,** avec la preuve dans la
  différence, un examinateur de deuxième ligne pour Élevé et au-dessus, et un historique d'ajout
  uniquement.
- **La porte la lit,** donc un résidu non accepté au-dessus de la tolérance bloque la version avec
  l'identifiant du risque dans le verdict.
- **Les liens fonctionnent dans les deux sens.** Un échec d'évaluation ouvre ou réévalue un risque ;
  un incident se lie à son risque, et le risque énumère ses évaluations et incidents.
- **Mesurez le registre, non sa taille :** ouvrez les résidus Élevé et Critique, les acceptations
  expirées, le temps entre l'identification d'un risque et un contrôle dans une porte, et la part
  des évaluations résiduelles soutenues par des preuves récentes
  ([métriques par niveau](/bok/maturity-model#metrics-per-level)).

> **En pratique (illustratif)**
> Une fonction de gouvernance a déplacé son registre d'une feuille de calcul vers le référentiel qui
> contient ses politiques, un fichier par risque indexé par des identifiants de registre, et a
> pointé la porte de déploiement dessus. La première exécution a bloqué deux versions pour la même
> raison : risques acceptés sans acceptant nommé et sans expiration. Personne n'avait décidé de les
> porter ; la feuille de calcul l'avait. En un trimestre, chaque risque Élevé ouvert avait soit une
> acceptation signée et expirante, soit un contrôle dont la porte pouvait lire la preuve.

## Gouvernance proportionnée : adapter la boucle

La boucle est la même partout ; son intensité ne l'est pas. L'AI RMF définit le niveau d'activité de
risque par tolérance au risque (GOVERN 1.3) [1]}. Le Reglamento de IA exige depuis 2024 qu'un
système de gestion de la qualité d'un fournisseur à haut risque soit proportionné à la taille de son
organisation, tandis que les fournisseurs « respectent le degré de rigueur et le niveau de
protection requis » [27]}. Le Omnibus Digital ajoute « en particulier, si le fournisseur est une
PME, y compris une start-up, ou une PMC », et ouvre le formulaire de documentation technique
simplifié, jusqu'alors limité aux PME et start-ups, aux petites entreprises de taille moyenne [9]}.
Les superviseurs bancaires américains adaptent désormais la gestion des risques de modèle au profil,
à la taille et à la complexité [2]}.

### La matrice d'adaptation

Six facteurs définissent l'intensité. Pour chacun, la matrice donne les contrôles minimaux, les
portes et l'intensité d'examen. Lisez chaque ligne comme un plancher ; où deux lignes s'appliquent,
la plus stricte gagne.

| Facteur | Profil | Contrôles minimaux | Portes | Intensité d'examen |
|---|---|---|---|---|
| **Taille** | Équipe d'une personne, start-up ou PME | Registre dans le référentiel ; appétit comme un fichier de données ; échelles publiées | Refuser les systèmes non enregistrés et ouvrir les Critiques | En cas de changement ; appétit annuel |
| | Taille moyenne, plusieurs équipes de produits | Registre indexé par le registre ; autorités d'acceptation ; cartes des parties prenantes du niveau 3 | Bande par rapport à la tolérance du niveau ; porte d'évaluation du niveau 2 | Trimestriel ; défi de deuxième ligne pour Élevé |
| | Entreprise fédérée | Appétit central, tolérances locales ; registre regroupé dans le risque d'entreprise | Les portes locales héritent d'une bibliothèque de politiques partagées | Comité mensuel pour Élevé et Critique ; échantillonnage d'audit |
| **Secteur** | Commercial général | Les lignes ci-dessous, rien de plus | Comme échelonné | Comme échelonné |
| | Réglementé (finance, santé, infrastructure critique, secteur public) | Champs de superposition sectorielle (ci-dessous) ; validation indépendante pour les niveaux 3 et 4 | Preuves sectorielles avant le déploiement | Comme le régime l'attend, jamais moins que échelonné |
| **Maturité** (chapitre 07) | Niveau 1 à 2 | Le registre existe et est indexé par des identifiants de registre | Refuser les systèmes non enregistrés | Examens du calendrier |
| | Niveau 3 | Les résultats d'évaluation remplissent la probabilité | Rapport de risque en CI, non bloquant | Examen à chaque version |
| | Niveau 4 à 5 | Bandes compilées dans les portes ; la télémétrie réévalue | Refuser sur résidu non accepté ; les acceptations s'annulent d'elles-mêmes | Événementiel plus calendrier |
| **Produits et services** | Niveau 1 : outil interne | Entrée du registre, propriétaire, règles d'utilisation acceptable | Porte du registre | Annuel |
| | Niveau 2 : support décisionnel, une personne examine chaque résultat | Plus évaluations de capacité et d'abus ; métriques de supervision | Porte d'évaluation | Tous les six mois |
| | Niveau 3 : décision automatisée concernant une personne | Plus les évaluations de justesse et de robustesse ; FRIA ou DPIA où requis ; un [canal de contestation](/patterns/decision-notice-contest-path) | Porte d'évaluation ; pas de déploiement sans acceptation à Élevé | Trimestriel |
| | Niveau 4 : agentique avec accès en écriture, ou enjeux élevés en temps réel | Plus portes d'approbation ; identité délimitée ; kill switch testé ; guardrails d'exécution | Plus application d'exécution | Mensuel et événementiel |
| **Objectifs** | Axé sur l'innovation | Niveaux 1 et 2 en bac à sable avec tolérance plus large ; plancher inchangé | Portes de bac à sable en dehors de la production | Fréquent, léger |
| | Averse au risque | Tolérances plus basses ; acceptation un niveau plus haut | Planchers d'évaluation plus élevés | Plus lourd, moins fréquent |
| | Axé sur la mission (service public, santé) | Consultation du groupe affecté à partir du niveau 3 | Porte d'évaluation d'impact | Inclut l'apport du groupe affecté |
| **Tolérance au risque** | Faible | Tolérance `low`} du niveau 2 ; planchers d'évaluation plus élevés | Refuser plus, accepter plus haut | Périodes d'acceptation plus courtes |
| | Plus élevé | Tolérance `medium`} pour les niveaux 1 et 2 | Comme échelonné | Comme échelonné ; le remplacement S5 inchangé |

Une équipe d'une personne ne devrait pas essayer de gérer tout cela : commencez par la tranche
verticale mince du chapitre 04
([la pile minimale viable](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)) plus le
registre et une porte, et ajoutez des lignes à mesure que l'organisation et son exposition se
développent.

### Superpositions sectorielles

Le NIST dit aux organisations de suivre les critères de risque, les tolérances et les réponses que
leur secteur définit déjà [1]}. Une superposition ajoute des champs de registre et des portes, pas
un deuxième registre.

| Secteur | Régime existant à intégrer | Ce qu'il ajoute à la boucle |
|---|---|---|
| Banque et finance | Conseils en gestion des risques de modèle ; aux États-Unis, SR 26-2 (17 avr 2026), qui a remplacé SR 11-7 et est plus pertinent pour les organisations bancaires au-dessus de 30 milliards USD d'actifs totaux [2] | Validation indépendante avant utilisation et un inventaire des modèles avec évaluations de risque, comme dans la tradition de gestion des risques des modèles; intensité adaptée à la taille et à la complexité |
| Dispositifs médicaux et santé | ISO 14971:2019, gestion des risques pour les dispositifs médicaux [25]; la route de l'annexe I du règlement sur l'IA, avec des obligations de haut risque pour les systèmes intégrés à partir du 2 août 2028 [10] | Registre basé sur les dangers; évaluation du rapport bénéfice-risque; surveillance après commercialisation alimentant la réévaluation |
| Industriel et critique pour la sécurité | Pratique de sécurité fonctionnelle; ISO/IEC TR 5469:2024 sur l'IA dans les fonctions liées à la sécurité et les fonctions non-IA qui maintiennent la sécurité des équipements contrôlés par l'IA [26] | Exigences de sécurité par fonction; fonctions de sécurité non-IA comme contrôles de niveau trois |
| Secteur public | Obligation FRIA lorsque des organismes régis par le droit public, ou des entités privées fournissant des services publics, déploient des systèmes à haut risque [17] | Cartographie obligatoire des groupes affectés; mécanismes de plainte et arrangements de gouvernance interne comme traitements |

### Le plancher qui ne s'adapte pas

Certains contrôles sont identiques à chaque taille, dans chaque secteur et à chaque niveau de
maturité:

- Chaque système d'IA en production a une entrée de registre, un propriétaire et un niveau.
- Les pratiques interdites sont éliminées, jamais traitées ou acceptées [22].
- Chaque scénario S5 exécute le remplacement de sévérité catastrophique.
- Chaque risque accepté a un accepteur nommé, une condition d'annulation et une date d'expiration.
- Chaque incident est lié à un risque, existant ou nouveau.
- Chaque agent qui agit a sa propre identité et un kill switch testé.

## Risque, maturité et incidents

### Pratique des risques par niveau de maturité

La pratique des risques n'est pas une sixième ligne du modèle de maturité; c'est une perspective sur
les cinq couches, et la règle de la couche la plus faible du chapitre 07 s'y applique aussi
([les cinq niveaux](/bok/maturity-model#the-five-levels)).

| Niveau | Pratique des risques que vous pouvez montrer | Preuve |
|---|---|---|
| **1 Documenté** | Un registre maintenu manuellement; une déclaration d'appétit; des échelles définies | Le fichier de registre; échelles approuvées |
| **2 Inventorié** | Chaque risque indexé par un identifiant de registre; systèmes non enregistrés signalés comme risque non évalué | La jointure entre registre et registre; rapport de découverte |
| **3 Testé** | Les évaluations de probabilité citent les résultats des évaluations; les conclusions du red team ouvrent de nouveaux risques | Identifiants d'évaluation dans les liens du registre |
| **4 Appliqué** | Les tolérances compilées dans les portes; une acceptation expirée bloque le déploiement | Verdicts de porte qui citent les identifiants de risque |
| **5 Continu** | La télémétrie réévalue les risques; les acceptations s'annulent elles-mêmes lorsque leur condition échoue | Historique des évaluations piloté par les signaux d'exécution |

### Les incidents sont des risques réalisés

Un incident est un risque qui s'est matérialisé, ou un risque que personne n'a identifié. S'il
correspond à une entrée de registre, c'est une preuve de probabilité: l'évaluation est recalculée
et, si la condition d'annulation s'est déclenchée, l'acceptation expire. S'il ne correspond à rien,
il ouvre une nouvelle entrée, la réponse du NIST AI RMF à un risque précédemment inconnu (MANAGE
2.3) [1], et demande l'identification de la raison pour laquelle l'admission a manqué.

L'échelle de sévérité relie les deux. Parce que S4 et S5 couvrent les catégories d'incidents graves
du règlement sur l'IA [3], une entrée évaluée à ce niveau nomme déjà le chemin de signalement, et le
[Pipeline d'incidents](/patterns/incident-pipeline) peut démarrer l'horloge `Art. 73` à partir de
l'identifiant de risque (délais dans [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
L'article 9 ferme la boucle de l'autre côté: les risques émergeant des données de surveillance après
commercialisation sont évalués dans le système de gestion des risques [8]. MANAGE 4.3 ajoute que les
incidents sont communiqués aux acteurs de l'IA pertinents, y compris les communautés affectées [1].
[Le chapitre 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) couvre le cycle
de vie des incidents; ce chapitre possède le lien.

Deux mesures montrent si le lien fonctionne. Le **taux de détection d'identification** est la part
des incidents qui correspondaient à un risque préexistant; un taux faible signifie que l'admission
manque les sources. Le **délai de réévaluation** est le temps entre un incident et l'évaluation
recalculée; un long délai signifie que le registre enregistre le passé.

**Correspondances :** Règlement sur l'IA de l'UE `Art. 9` (système de gestion des risques),
`Art. 17(2)` (proportionnalité), `Art. 26`, `Art. 27` (FRIA), `Art. 72`, `Art. 73` · ISO 31000 ·
ISO/IEC 23894 · ISO/IEC 42001 (6.1.2, 6.1.3, 8.2, 8.3) · NIST AI RMF (Govern, Map, Measure, Manage)
· OWASP Agentic ASI01–ASI10 · les cinq couches du stack. Les mappages sont illustratifs, pas une
affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Publiez les échelles.** Écrivez des définitions de probabilité et de sévérité à cinq niveaux
   pour votre contexte, avec S5 aligné sur les catégories d'incidents graves et le remplacement de
   sévérité catastrophique énoncé. Une page, versionnée à côté de vos politiques.
2. **Compilez une ligne d'appétit.** Mettez la tolérance par niveau dans un fichier de données et
   faites lire une porte de déploiement: refusez quand un système porte un Critical ouvert ou un
   résiduel non accepté au-dessus de son niveau.
3. **Indexez le registre au registre.** Pour vos trois systèmes de plus haut niveau, déplacez leurs
   risques principaux dans des fichiers indexés par des identifiants de registre, chacun avec des
   évaluations inhérentes et résiduelles, des contrôles qui se résolvent en preuves, un propriétaire
   et une date d'expiration.
4. **Trouvez les orphelins.** Listez chaque risque accepté sans accepteur nommé ou sans date
   d'expiration, et chaque incident du dernier trimestre sans risque lié. Les deux listes
   constituent le carnet de commandes du mois prochain.
5. **Cartographiez les parties prenantes d'un système.** Pour le système ayant la plus large
   exposition, nommez les non-utilisateurs affectés et notez comment leur point de vue atteint le
   registre.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (§1.1 risk; §1.2.2 risk tolerance; §1.2.3 prioritisation, "cease in a safe manner", residual risk; Core tables 1 to 4; §6 profiles). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[2] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC, FDIC; supersedes SR 11-7 and SR 21-8; tailored to risk profile, size and complexity; most relevant above USD 30 billion in assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (points 2 "risk", 13 "reasonably foreseeable misuse", 49 "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[4] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[5] ISO 31000:2018, Risk management: Guidelines (stage 90.92, to be revised; ISO/CD 31000 under development as of 2026-09-24). ISO/TC 262. 2018-02. https://www.iso.org/standard/65694.html (verified: primary)
[6] ISO/IEC 23894:2023, Artificial intelligence: Guidance on risk management. ISO/IEC JTC 1/SC 42. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[7] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (draft for comment; function to clause mapping). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2) steps; 9(5) residual risk and order of measures; 9(8) "prior defined metrics and probabilistic thresholds"; 9(9) minors and vulnerable groups). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[9] Regulation (EU) 2026/1744, Digital Omnibus on AI (Art. 9 not amended; Art. 1 point (10): Art. 11(1) simplified technical-documentation form extended to SMCs; Art. 1 point (11): Art. 17(2) replaced to name SMEs, start-ups and SMCs). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] "AI Omnibus enters into force" (Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[11] Risk management in the Artificial Intelligence Act (J. Schuett; Art. 9 of the 2021 proposal; Eur. J. Risk Regul. 15 (2024) 367-385). arXiv 2212.03109. 2024. https://arxiv.org/abs/2212.03109 (verified: primary)
[12] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[13] ISO/IEC 42001:2023, Artificial intelligence: Management system (6.1.2 AI risk assessment, 6.1.3 AI risk treatment, 6.1.4 AI system impact assessment; 8.2 to 8.4). ISO/IEC JTC 1/SC 42. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[14] Generative Artificial Intelligence Profile, NIST AI 600-1 (12 GAI risks; grouping in footnote 5). NIST. 2024-07. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (verified: primary)
[15] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[16] The AI Risk Repository (v3; 74 frameworks, 1,725 risks; human decisions 38%, AI systems 42%) (arXiv 2408.12622). P. Slattery et al., MIT. 2026-05-05. https://arxiv.org/abs/2408.12622 (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA: who performs it; elements (a) to (f)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[18] IEC 31010:2019, Risk management: Risk assessment techniques. IEC / ISO/TC 262. 2019-06. https://www.iso.org/standard/72140.html (verified: primary)
[19] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[20] GPAI Code of Practice, Safety and Security chapter, Commitment 4 (systemic risk acceptance determination; Measure 4.2). code-of-practice.ai. 2025-07-10. https://code-of-practice.ai/?section=safety-security (verified: secondary)
[21] Hierarchy of Controls. CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[22] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5 (prohibited AI practices, as amended by the Digital Omnibus, Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[23] The IIA's Three Lines Model: an update of the Three Lines of Defense. The Institute of Internal Auditors. 2020-09-08. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[24] OSCAL native model (assessment layer incl. POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[25] ISO 14971:2019, Medical devices: Application of risk management to medical devices. ISO/TC 210. 2019-12. https://www.iso.org/standard/72704.html (verified: primary)
[26] ISO/IEC TR 5469:2024, Artificial intelligence: Functional safety and AI systems. ISO/IEC JTC 1/SC 42. 2024-01. https://www.iso.org/standard/81283.html (verified: primary)
[27] Regulation (EU) 2024/1689 (AI Act), text as published in the Official Journal (OJ L, 12.7.2024), Art. 17(2) (quality management system proportionate to the size of the provider's organisation; providers "shall, in any event, respect the degree of rigour and the level of protection required"). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#art_17 (verified: primary)
