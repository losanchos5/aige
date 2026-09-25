---
lang: fr
source: bok/15-governing-deployment.md
sourceHash: "b36107eafc969f54fd80c6d9a7b9b07bfd81efb8a8843db6acb8ab5a87c7cd53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 15. Gouverner le déploiement et l'utilisation

> Gouverner l'exécution : comment un déployeur décide d'utiliser un système d'IA, le choisit, le
> contractualise, le met en service, l'exploite et le retire, chaque étape laissant une preuve qu'un
> contrôle s'est déclenché.

La plupart des organisations déploient bien plus d'IA qu'elles n'en construisent. Les obligations de
conception d'un fournisseur sont largement remplies lorsque le système est mis sur le marché ; les
obligations d'un déployeur commencent lorsque le système est mis en service, et elles durent aussi
longtemps qu'il fonctionne : l'utiliser comme prévu, assurer sa supervision, le surveiller, le
suspendre s'il présente un risque, conserver ses journaux et informer les gens de sa présence [1].
Le chapitre 18 énumère les
[obligations du déployeur de l'article 26](/bok/eu-ai-act#deployer-duties-article-26) une par une,
et le chapitre 17 couvre l'aspect incident de celles-ci
([obligations du déployeur : informer le fournisseur, suspendre l'utilisation](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)).
Ce chapitre suit un système de la décision de l'utiliser au jour où il est arrêté. À chaque étape,
il nomme la décision, l'artefact qui l'enregistre, la couche du stack qui produit la preuve et le
dossier qui arrive dans le magasin d'assurance.

Deux termes structurent le chapitre. Un **déployeur** est toute personne utilisant un système d'IA
sous son autorité, sauf dans une activité personnelle et non professionnelle ; un **fournisseur**
développe un système ou un modèle, ou le fait développer, et le met sur le marché ou le met en
service sous son propre nom ou sa propre marque [2]. Les étiquettes décrivent des tâches, non des
types d'organisations : une banque qui affine un modèle de fournisseur et livre le résultat sous sa
propre marque peut tenir les deux rôles pour le même système (voir
[Quand un déployeur devient un fournisseur](#when-a-deployer-becomes-a-provider)). Le chapitre 14
couvre le côté construction ; ce chapitre couvre le côté exploitation. Les références aux articles
renvoient au règlement sur l'IA de l'UE tel que modifié par l'omnibus numérique, en date du
2026-09-24, dont les règles à haut risque s'appliquent aux systèmes de l'annexe III à partir du 2
décembre 2027 [3] ; ce sont des mappages illustratifs, non une affirmation de conformité.

Gouverner le déploiement n'est pas de l'ingénierie de version. MLOps demande si une nouvelle version
peut être déployée et annulée. L'ingénierie de la gouvernance de l'IA demande qui a décidé que le
système peut servir, sur quelle preuve, quel signal l'annule sans réunion, et quel dossier prouve
que chacun de ces éléments s'est produit.

## Le cycle de vie du déploiement en un coup d'œil

| Étape | La décision | Artefact | Couche | Enregistrement de preuve |
|---|---|---|---|---|
| Décider | L'IA doit-elle faire cela, et exactement quoi ? | Dossier de décision de déploiement | 1 · 2 | Dossier signé lié à l'entrée du registre |
| Choisir | Quel modèle, hébergé où, adapté comment ? | Dossier de sélection du modèle | 3 · 2 | Résultats d'évaluation de tâche par candidat |
| Contracter | À quelles conditions ? | Examen du contrat et de la licence | 1 · 5 | Liste de contrôle des clauses ; champs de licence AIBOM |
| Mise en service | Approuver, approuver sous conditions ou rejeter ? | Décision de mise en service avec dissidence | 1 · 5 | Dossier de décision ; conditions en tant que politique |
| Déploiement | Quelle exposition, et qu'est-ce qui l'annule ? | [Plan de déploiement avec critères d'annulation](/patterns/staged-rollout-rollback-criteria) | 4 | Résultats de phase-porte ; événements d'annulation |
| Exploitation | Est-il toujours adapté, équitable et utile ? | [Plan de surveillance](/patterns/drift-fairness-monitor) ; calendrier de maintenance | 4 · 5 | Télémétrie de dérive, d'équité, de coût et d'énergie |
| Assurer | Les contrôles fonctionnent-ils toujours ? | Programme d'audit, d'équipe rouge et de modèle de menace | 3 · 5 | Résultats suivis jusqu'à la clôture |
| Communiquer | Qui doit entendre quoi, et quand ? | [Plan de communication et modèles](/patterns/disclosure-notification-pipeline) | 5 | Avis envoyés, avec horodatages |
| Retrait | Dégrader, localiser ou arrêter ? | [Runbook de désactivation et de retrait](/patterns/deactivation-localisation-retirement-runbook) | 4 · 2 | Dossier de décision ; snapshot de preuve finale |

## La décision de déploiement

### Commencer par le cas d'usage, pas le modèle

La décision de déployer est une décision produit avec un dossier de gouvernance. Avant que tout
modèle soit comparé, notez l'objectif commercial et comment vous saurez qu'il a été atteint, les
personnes sur lesquelles le système agira, la décision qu'il informe ou prend, et si l'IA est
vraiment le bon outil : un moteur de règles, un meilleur formulaire ou un index de recherche est
parfois la réponse honnête.

Nommez ensuite l'**espace négatif** : ce que le système n'est explicitement pas destiné à faire.
L'espace négatif est ce qui rend plus tard le glissement de fonction détectable, car une utilisation
qui n'a jamais été approuvée a un endroit où être enregistrée comme hors champ. La
**finalité prévue** du fournisseur (l'utilisation pour laquelle il a conçu et documenté le système,
y compris le contexte et les conditions d'utilisation [2]) est la limite extérieure ; votre espace
négatif se situe à l'intérieur.

Classifiez l'utilisation à l'admission, le flux de travail décrit au
[chapitre 06](/bok/the-role#intake-and-classification) : niveau de risque, exposition réglementaire,
sensibilité des données et autonomie. La classification décide lesquels des contrôles de ce chapitre
s'appliquent. Une utilisation de l'annexe III déclenche les obligations du déployeur de l'article 26
[1] et, pour les organismes publics, les entités privées fournissant des services publics, et les
utilisations de notation de crédit et de tarification d'assurance-vie et santé, l'analyse d'impact
sur les droits fondamentaux de l'article 27 (FRIA) avant la première utilisation [4]. Un chatbot ou
un générateur de contenu synthétique déclenche les obligations de transparence de l'article 50, qui
s'appliquent à partir du 2 août 2026 [5] ; un système génératif déjà sur le marché avant cette date
a jusqu'au 2 décembre 2026 pour respecter l'obligation de marquage de l'article 50(2) (article
111(4)) [8]. Les pratiques interdites de l'article 5 lient les déployeurs ainsi que les
fournisseurs, y compris l'interdiction des systèmes qui exploitent les vulnérabilités dues à l'âge,
au handicap ou à une situation sociale ou économique spécifique [6].

### Définir d'abord les exigences de performance et d'explicabilité

Les exigences rédigées après une démonstration de fournisseur sont adaptées à la démonstration.
Définissez-les avant de regarder les candidats :

- **Métriques qui correspondent au préjudice.** Pour un classificateur de triage, les faux négatifs
  sur les cas urgents ; pour un assistant génératif, l'ancrage et le refus des demandes hors champ.
  Un chiffre de précision moyenne est rarement la métrique qui correspond à un préjudice.
- **Planchers par groupe.** Un seuil par population sur laquelle le système agit, afin qu'une bonne
  moyenne ne puisse pas cacher un groupe sur lequel le système échoue.
- **Seuils go/no-go** que l'examen de mise en service appliquera, chacun tracé jusqu'au mode de
  défaillance qu'il représente, ce qui est la discipline énoncée dans
  [les limites de la porte d'évaluation](/bok/definition#the-limits-of-the-eval-gate).
- **L'explication que l'utilisation nécessite.** Un code de raison pour une décision défavorable,
  une source citée pour une réponse générée, ou un modèle interprétable où la décision doit être
  contestable. Lorsqu'une décision basée sur la sortie de la plupart des systèmes de l'annexe III a
  des effets juridiques ou similairement significatifs sur une personne, cette personne a le droit à
  une explication claire et significative du déployeur du rôle du système dans la décision [7].
  Concevoir pour cette réponse est moins cher que la rétrofitter ; le
  [chapitre 16](/bok/fairness-and-explainability#explanation-techniques) couvre les méthodes.

### Vérifier les données et les personnes

**Données.** Les données d'entrée existent-elles avec la couverture et la qualité que l'utilisation
nécessite, avec un approvisionnement qui durera, et une base légale pour ce but ? Lorsque le
déployeur contrôle les données d'entrée d'un système à haut risque, il doit s'assurer que les
données sont pertinentes et suffisamment représentatives pour la finalité prévue [1].

**Personnes.** La supervision doit être assignée à des personnes ayant la compétence, la formation
et l'autorité nécessaires, et le soutien pour l'utiliser [1]. L'article 4, reformulé par l'omnibus,
demande aux fournisseurs et aux déployeurs de soutenir la maîtrise de l'IA de leur personnel [8].
Avant qu'un système à haut risque soit utilisé au travail, un employeur-déployeur doit informer les
représentants des travailleurs et les travailleurs affectés [1]. La préparation signifie aussi
l'autorité de pause : un opérateur qui voit le système se mal comporter doit être autorisé à
l'arrêter sans d'abord demander la permission.

### Le dossier de décision de déploiement

Rassemblez ces réponses dans un artefact, le **Dossier de décision de déploiement (DDR)**, commité à
côté du code du système et référencé depuis son entrée de registre (couche 02). Ses planchers
deviennent les seuils de la porte d'évaluation (couche 03) ; son espace négatif devient le champ que
l'exécution surveille (couche 04). La page de modèles a un schéma JSON pour
[la décision de déploiement et le runbook de retrait](/resources/templates#schema-deployment-decision-record).
Un extrait illustratif :

```json
{ "ddr_id": "ddr-csa-01-v1", "system": "csa-01",
  "objective": "resolve tier-1 refund queries without an agent",
  "not_for": ["credit decisions", "complaints about staff"],
  "risk_tier": "limited", "obligations": ["EU AI Act Art. 50", "GDPR Art. 35"],
  "floors": { "groundedness": 0.95, "out_of_scope_refusal": 0.98 },
  "retire_if": ["deflection below business case for two quarters"],
  "owner": "team-support-platform", "decision": "proceed-to-selection" }
```

> **En pratique (illustratif)**
> Pour `csa-01`, l'assistant de service client dans une grande télécommunication, l'espace négatif
> du DDR énumérait « plaintes concernant le personnel ». Des mois plus tard, une équipe a proposé de
> router les requêtes RH internes vers le même assistant. Le formulaire d'admission a vérifié la
> proposition par rapport au dossier, l'a signalée comme une nouvelle utilisation, et l'a renvoyée
> par classification au lieu d'un changement de configuration silencieux. Le dossier n'a pas arrêté
> l'idée ; il a rendu le changement de but visible et assumé.

## Choisir le modèle

### Évaluer sur votre tâche, vos données et vos utilisateurs

Un benchmark public répond à « à quel point ce modèle est-il bon sur ce benchmark ? ». La question
du déployeur est « à quel point est-il bon sur notre tâche, pour nos utilisateurs, sous nos
contraintes ? ». Construisez une **évaluation de sélection** : un ensemble de cas représentatifs
tirés du trafic que vous pouvez légalement utiliser, étiquetés avec la réponse que vous voulez,
stratifiés par les groupes et les cas limites que le DDR nomme, et notés sur les métriques qui
correspondent au préjudice. Rendez-la assez grande pour montrer la différence par groupe qui vous
importe. Exécutez chaque candidat à travers le même harnais avec les mêmes prompts, récupération et
guardrails, et conservez les résultats : l'évaluation de sélection devient la première version de la
suite de régression derrière la [porte d'évaluation](/patterns/eval-gate-in-ci).

### Ce que les benchmarks publics et les classements ne peuvent pas vous dire

- **Contamination.** Les éléments de test fuient dans les données d'entraînement. Lorsque des
  chercheurs ont écrit un nouvel ensemble de problèmes mathématiques de niveau primaire
  correspondant à un benchmark populaire, plusieurs familles de modèles ont perdu jusqu'à 8 % de
  précision, un signe de surapprentissage sur l'ensemble public [9].
- **Divulgation sélective.** Un classement reflète ce que les fournisseurs choisissent de soumettre.
  Une analyse d'un classement de style arène largement utilisé a constaté que quelques fournisseurs
  ont testé de nombreuses variantes privées avant la version et pouvaient rétracter les scores s'ils
  le choisissaient [10].
- **Goodhart.** Une fois qu'un benchmark a une importance commerciale, les modèles sont ajustés sur
  celui-ci. La pression qui rend une eval gate vulnérable à Goodhart s'exerce avec plus de force sur
  un chiffre public que vous ne contrôlez pas.

Utilisez les benchmarks pour établir une liste restreinte, jamais pour prendre la décision.

### Comptabilisez le coût total, y compris l'énergie

Le coût d'un modèle est le prix de la licence ou de l'API plus le calcul d'inférence, l'intégration,
l'évaluation et la surveillance, le coût de fonctionnement du stack de gouvernance autour de lui
(voir [le coût du stack](/bok/the-stack#the-cost-of-the-stack)) et le coût de la sortie. L'énergie
et le carbone figurent sur le même registre, et le choix du modèle est celui où la plupart d'entre
eux sont décidés. Une étude a mesuré les architectures génératives polyvalentes comme étant des
ordres de grandeur plus coûteuses par inférence que les systèmes spécifiques à une tâche sur les
mêmes tâches, même en contrôlant la taille du modèle [11]. La limite de mesure importe : un
fournisseur a évalué le prompt textuel médian de son assistant à 0,24 Wh, en comptant la capacité
inactive et les frais généraux du centre de données ainsi que les accélérateurs [12] ; un chiffre
qui les exclut n'est pas comparable. Au niveau de l'ensemble du secteur, l'AIE projette que la
consommation d'électricité des centres de données plus que doublera pour atteindre environ 945 TWh
d'ici 2030 [13]. Le règlement sur l'IA demande aux fournisseurs de modèles d'IA à usage général de
documenter la consommation énergétique connue ou estimée de leurs modèles [14] ; rien dedans ne
mesure votre empreinte d'inférence, donc c'est au responsable du déploiement de le faire.

### Enregistrez le choix

Le **registre de sélection de modèle** énumère les candidats, leurs résultats d'eval de sélection,
les estimations de coût et d'énergie, les raisons du choix, les conditions qui le rouvrirait (un
changement de prix, une nouvelle version du fournisseur, un seuil franchi en production) et le plan
de sortie. Il est classé par rapport à l'entrée du registre, donc « pourquoi ce modèle ? » est
répondu par une requête un an plus tard, quand les personnes qui ont choisi ont changé.

## Types de modèles et options de déploiement

Le type de modèle change les modes de défaillance. L'option d'hébergement change qui peut voir et
arrêter quoi. La technique d'adaptation change ce que vous devez re-tester et, parfois, votre rôle
juridique. Les tableaux ci-dessous décrivent chaque option, et la matrice à la fin nomme le contrôle
que chaque combinaison ajoute. Traitez tout cela comme illustratif, non comme une affirmation de
conformité : les contrôles qu'un déploiement réel nécessite découlent de son niveau de risque, de
ses obligations et de ses modes de défaillance.

### Le type de modèle change l'ensemble des contrôles

| Type de modèle | Modes de défaillance dominants | Contrôles qu'il ajoute (couche) |
|---|---|---|
| **Prédictif classique (classificateur, scoreur, prévisionnel)** | Mauvais étalonnage ; écarts d'erreur entre les groupes ; dérive des entrées et des étiquettes ; boucles de rétroaction où le score façonne les données d'entraînement suivantes. | L3 : Seuils de performance par groupe et une eval d'étalonnage sur vos propres données étiquetées ; L4 : Moniteur de dérive sur les entrées et les résultats (PSI, KS) ; L2 : Fiche de modèle qui énonce la population sur laquelle le modèle a été validé |
| **Génératif (texte, code, média)** | Sortie non fondée ou fabriquée ; contenu nuisible ou contrefait ; injection de prompt ; fuite de données personnelles ou confidentielles. | L3 : Evals de pertinence et de red team sur vos propres prompts ; L4 : Guardrails d'entrée et de sortie ; divulgation et étiquetage du contenu synthétique (Art. 50) ; L2 : Prompts et prompts système versionnés comme configuration dans l'entrée du registre |
| **Propriétaire (API ou poids sous licence)** | Changement de version silencieux ; verrouillage ; données d'entraînement opaques ; conditions ou prix qui changent sous vous. | L1 : Conditions contractuelles (pas d'entraînement sur les entrées, résidence) appliquées comme politique ; L2 : Version du modèle du fournisseur épinglée dans l'entrée du registre ; L3 : Evals de limite re-exécutées à chaque changement de version du fournisseur |
| **Poids ouverts** | Violation de licence ou d'utilisation acceptable ; fichiers de poids altérés ou malveillants ; vulnérabilités non corrigées qui sont maintenant les vôtres à corriger. | L1 : Vérification de licence et d'utilisation acceptable comme porte de politique ; L2 : Entrée AIBOM avec source, licence et hash de fichier ; L3 : Suite complète d'eval et de red team de votre côté ; L4 : Vos propres guardrails : aucune couche de sécurité du fournisseur ne se tient devant |
| **Petit (dimensionné pour la tâche, capable en périphérie)** | Plafond de capacité ; entraînement de refus plus faible ; fragile en dehors de sa tâche. | L3 : Eval spécifique à la tâche qui prouve l'adéquation pour cette tâche, pas en général ; L4 : Acheminez les demandes hors de portée vers un repli ou un humain |
| **Grand (usage général, frontière)** | Large surface de capacité ; large surface de jailbreak ; dépassements de coûts ; sur-dépendance des utilisateurs. | L1 : Délimitez le cas d'usage dans la politique : ce que le système ne peut pas être invité à faire ; L3 : Red team plus large sur les capacités dont vous n'avez pas besoin ; L4 : Limites de débit et plafonds de dépenses par identité |
| **Langue uniquement** | Préjudices textuels ; injection via des documents et du contenu web que le modèle lit. | L3 : Red team textuel incluant l'injection indirecte ; L4 : Guardrails textuels sur l'entrée et la sortie |
| **Multimodal (image, audio, vidéo)** | Médias synthétiques et usurpation d'identité ; instructions cachées dans les images ou l'audio ; utilisations biométriques et de surveillance. | L1 : Vérifications des pratiques interdites (Art. 5) et une politique d'utilisation biométrique ; L3 : Red team multimodal ; L4 : Marquage lisible par machine des médias générés (Art. 50) |

La plus grande division est classique contre génératif. Les modèles classiques échouent
silencieusement, par étalonnage, dérive et écarts d'erreur de groupe ; les modèles génératifs
échouent bruyamment, par contenu. Propriétaire contre poids ouverts est surtout une question de qui
produit la preuve : avec une API vous la collectez auprès du fournisseur (fiche de modèle, AIBOM si
offert, avis de changement), avec des poids ouverts vous produisez presque tout vous-même (hashes,
scans, evals, résultats de red team, journaux d'exécution ; voir
[IA tierce et procurée](/bok/the-stack#third-party-and-procured-ai)).

### Où il s'exécute

| Où il s'exécute | Modes de défaillance dominants | Contrôles qu'il ajoute (couche) |
|---|---|---|
| **Cloud (service géré ou API)** | Les données quittent votre limite ; panne du fournisseur ; inférence acheminée vers la mauvaise région. | L1 : Résidence et politique de classe de données en tant que code ; L4 : Application de la sortie et de la région sur le chemin d'inférence ; L5 : Attestations du fournisseur et liste des sous-traitants collectées et datées |
| **Sur site (votre centre de données ou cloud privé)** | Vous possédez les correctifs, la capacité et la sécurité physique ; les mises à jour sont en retard. | L4 : Segmentation du réseau et contrôle d'accès sur les poids ; L2 : Entrée AIBOM avec hashes de fichier pour chaque artefact déployé ; L5 : Vos propres journaux inviolables |
| **Périphérie (appareil, véhicule, succursale)** | Altération ; extraction de poids ; versions obsolètes sur le terrain ; pas de journal central. | L2 : Artefacts de modèle signés et un registre des versions de terrain ; L4 : Démarrage sécurisé, attestation d'appareil, restauration à distance et désactivation à distance ; L5 : Télémétrie échantillonnée qui atteint le magasin de preuves |
| **Hybride (divisé par classe de données ou charge)** | Lacunes de politique à la limite ; données sensibles acheminées vers le mauvais niveau ; versions incohérentes. | L1 : Politique d'acheminement par classe de données, évaluée à chaque demande ; L2 : Une entrée de registre couvrant chaque niveau et ses versions |

### Comment il est adapté

| Adaptation | Modes de défaillance dominants | Contrôles qu'il ajoute (couche) | Effet de rôle |
|---|---|---|---|
| **Tel quel (prompting uniquement)** | Modèle non adapté à votre tâche ou population ; le fournisseur le change sous vous. | L3 : Validation par rapport à vos propres seuils avant le lancement ; L4 : Guardrails compensatoires pour les lacunes que la validation a trouvées ; L2 : Prompt système versionné avec l'entrée du registre | Responsable du déploiement, sauf si vous le rebaptisez ou modifiez sa finalité prévue (Art. 25(1)(a), (c)). |
| **Affinage** | Entraînement de sécurité érodé ; données d'affinage mémorisées ; nouveaux biais. | L3 : Traitez le résultat comme un nouveau système : eval complète et red team à nouveau ; L2 : Fiche de données pour l'ensemble d'affinage ; AIBOM lie le modèle de base et les poids affinés ; L1 : Journal de calcul vérifié par rapport au critère de modification GPAI | Peut être une modification substantielle d'un système à haut risque (Art. 25(1)(b)) ou vous faire fournisseur d'un modèle GPAI modifié. |
| **Génération augmentée par récupération (RAG)** | Empoisonnement de la récupération ; corpus obsolète ou sans licence ; réponses qui fuient des documents entre les utilisateurs. | L4 : Contrôle d'accès au corpus qui reflète les permissions du système source ; L3 : Eval de pertinence par rapport à un instantané du corpus ; L2 : Provenance et licence du corpus enregistrées dans l'AIBOM | Laisse généralement le rôle inchangé. |
| **Distillation, quantisation, adaptateurs LoRA** | Régression silencieuse de qualité ou de sécurité ; taux d'erreur décalés entre les groupes ; prolifération d'adaptateurs. | L3 : Re-exécutez la porte d'eval et le red team sur l'artefact compressé ; L2 : Enregistrez chaque adaptateur et chaque build quantisé comme sa propre version | Distiller ou adapter un modèle GPAI est une modification : vérifiez-la par rapport au critère de calcul (vérifier). |
| **Wrapper agentique (outils, actions)** | Mauvaise utilisation d'outils ; détournement d'objectif ; abus de privilèges ; actions qui en cascade. | L4 : Identité d'agent, credentials limités, médiation d'outils et un kill switch testé ; L2 : Entrée du registre d'agent avec propriétaire, portée et expiration ; L4 : Porte humaine sur les actions à hautes conséquences | Change le risque plus que le rôle : l'autonomie est le multiplicateur de risque. |

### La matrice type de modèle par option de déploiement

Lisez chaque cellule comme le seul contrôle que la combinaison ajoute en plus de sa ligne et sa
colonne.

| Type de modèle | Cloud | Sur site | Périphérie | Affinage | RAG | Wrapper agentique |
|---|---|---|---|---|---|---|
| **Prédictif classique** | Vérification de résidence sur les caractéristiques ; moniteur de dérive d'entrée | Possédez le pipeline de réentraînement et son approbation | Modèle signé ; télémétrie de version de terrain ; restauration à distance | Le réentraînement est une version : re-exécutez les seuils par groupe | Pas typique ; gouvernez plutôt la lignée du magasin de caractéristiques | Le score déclenche une action : porte humaine sur les résultats défavorables |
| **Génératif, langue** | Conditions sans entraînement et de rétention ; guardrail de sortie | Vos propres guardrails, correctifs et mesure d'énergie | Petit modèle ; guardrails hors ligne ; mises à jour signées | Red team complet ; eval d'érosion de sécurité | Eval de pertinence ; permissions de corpus ; vérifications d'empoisonnement | Identité d'agent, médiation d'outils, kill switch |
| **Génératif, multimodal** | Marques de provenance sur la sortie ; blocage d'utilisation biométrique | Signature de contenu propre ; règles de rétention de médias | Avis de caméra et de microphone ; minimisation sur appareil | Vérifications de ressemblance et de consentement sur les médias d'affinage | Tests d'injection multimodal sur les médias récupérés | Actions d'écran et de voix derrière une porte humaine |
| **Propriétaire (API)** | Épinglez la version ; evals de limite à chaque changement | Appareil du fournisseur : attestez la version et le chemin de mise à jour | SDK du fournisseur : limites de licence ; révocation hors ligne | Service d'affinage du fournisseur : conditions de données ; votre propre re-eval | Votre corpus, leur modèle : conditions de rétention et sans entraînement | Accordez des outils limités ; l'agent du fournisseur obtient sa propre identité |
| **Poids ouverts** | Porte de licence ; poids vérifiés par hachage sur du calcul loué | Vous possédez les correctifs : AIBOM, scans de fichiers, red team | Les poids sont extractibles : conditions de licence et [modèle de menace](/patterns/ai-threat-model) | Journal de calcul par rapport au critère d'un tiers GPAI | Chaque couche de preuve est la vôtre à produire | Vos propres guardrails de bout en bout ; aucune couche de sécurité du fournisseur |

## Construire, acheter ou adapter

### Trois routes, trois charges de preuve

| Route | Ce que vous contrôlez | Preuve que vous produisez | Preuve que vous collectez | Rôle typique |
|---|---|---|---|---|
| **Acheter** (SaaS, API) | Intégration, prompts, identités, le trafic que vous envoyez | Evals de limite ; journaux d'exécution de votre trafic | Fiches de modèle, notices d'utilisation, certifications, avis de modification | Déployeur |
| **Adapter** (affinage, RAG, wrapper agentique) | L'adaptation et tout ce qui l'entoure | Évaluations du système adapté; fiches de données d'affinage; journal de calcul | Documentation et licence du modèle de base | Déployeur; fournisseur si un déclencheur de l'art. 25 ou le critère GPAI s'applique |
| **Construire** (modèle propre) | Tout | Tout | Licences pour les données et composants tiers | Fournisseur et déployeur |

Moins vous possédez du modèle, plus votre budget de contrôle se déplace du test vers son encadrement
et la preuve du fournisseur; plus vous possédez, plus la preuve vous incombe.

### Quand un déployeur devient fournisseur

L'article 25(1) fait d'un distributeur, importateur, déployeur ou tiers le fournisseur d'un système
d'IA à haut risque, avec les obligations du fournisseur, lorsqu'il appose son nom ou sa marque sur
un système à haut risque déjà sur le marché; effectue une modification substantielle d'un système à
haut risque de sorte qu'il reste à haut risque; ou change la destination d'un système, y compris un
système à usage général, de sorte qu'il devient à haut risque [15]. Une
**modification substantielle** est une modification non prévue dans l'évaluation de la conformité
initiale du fournisseur qui affecte la conformité aux exigences de haut risque ou change la
destination [2]. Le fournisseur initial cesse alors d'être le fournisseur de ce système mais doit
coopérer; l'Omnibus a étendu ce devoir pour couvrir la documentation technique, les limitations
connues et les modes de défaillance, et l'accès technique ciblé pour les essais et la validation
[8].

Les modèles à usage général ont leur propre test. Les lignes directrices de la Commission sur les
obligations GPAI (contenu approuvé le 18 juillet 2025, adopté en tant que C(2025) 7719 final le 19
novembre 2025) [16] traitent un acteur qui modifie ou affine un modèle GPAI comme fournisseur du
modèle modifié uniquement dans des cas exceptionnels, avec un critère indicatif: la modification
utilise plus d'un tiers du calcul d'entraînement du modèle original. Les obligations de
documentation, de politique de droits d'auteur et de résumé d'entraînement couvrent alors la
modification, non le modèle entier [17]; où le modèle original présente un risque systémique, les
lignes directrices présument que le modèle modifié le présente aussi, avec les obligations complètes
de risque systémique [16]. Le critère est indicatif, et la façon dont il s'applique à la
distillation ou à l'entraînement répété d'adaptateurs est une question à poser à un conseil
juridique (vérifier). La conséquence en ingénierie est claire de toute façon: enregistrez le calcul
de chaque affinage comme un artefact, car la question sera posée.

| Déclencheur | Comment cela se passe en pratique | Détection | Artefact |
|---|---|---|---|
| Nom ou marque (`Art. 25(1)(a)`) | Revente en marque blanche d'un système à haut risque d'un fournisseur | Vérification de marque dans la liste de contrôle de publication | Décision de rôle dans l'entrée du registre |
| Modification substantielle (`Art. 25(1)(b)`) | Réentraînement, nouvelles sources de données, seuils déplacés au-delà des modifications prédéterminées du fournisseur | Classification des modifications en CI par rapport aux modifications prédéterminées dans la notice d'utilisation [18] | Enregistrement des modifications |
| Destination modifiée (`Art. 25(1)(c)`) | Un assistant général mis au travail sur l'embauche ou le crédit | Intake; le registre d'utilisation en aval | Reclassification; DDR modifié |
| Modification GPAI | Affinage d'un modèle GPAI avec plus d'un tiers de son calcul d'entraînement original | Journal de calcul | Estimation de calcul déposée avec l'AIBOM |

### Licences de poids ouvert

Les poids ouverts ne sont pas une licence, et « poids ouvert » n'est pas « source ouverte ». Chaque
famille demande quelque chose de différent à un déployeur:

| Famille | Exemples | Ce qu'elle vous demande | À surveiller |
|---|---|---|---|
| **Permissive** | Apache 2.0, MIT, BSD | Conservez les avis et le texte de la licence; Apache 2.0 ajoute une concession de brevet expresse. | La licence du modèle peut être permissive tandis que sa licence de données d'entraînement ou de jeu de données ne l'est pas. |
| **Copyleft** | Famille GPL | La distribution d'une dérivée exige sa publication sous la même licence. | S'applique au code dans la pile de service autant qu'au modèle; la distribution est le déclencheur. |
| **Copyleft réseau** | AGPL 3.0 | Les utilisateurs interagissant sur un réseau avec une version modifiée doivent se voir proposer sa source. | Servir un composant modifié derrière une API peut déclencher l'offre de source. |
| **Licence IA responsable (utilisation restreinte)** | Famille OpenRAIL | Accès ouvert avec utilisations interdites énumérées qui doivent être transmises à chaque utilisateur en aval et dérivé. | Les restrictions d'utilisation accompagnent le modèle: vos conditions d'utilisation doivent les porter. |
| **Licence communautaire personnalisée** | Licences « communautaires » de fournisseur pour modèles à poids ouvert | Politique d'utilisation acceptable incorporée par référence; obligations d'attribution ou de dénomination; seuils d'échelle au-delà desquels une licence distincte est nécessaire. | Les seuils et les politiques diffèrent par version de modèle; les règles de dénomination peuvent s'appliquer aux dérivés que vous publiez. |
| **Non commercial ou recherche uniquement** | Famille CC BY-NC; licences de recherche | Aucune utilisation commerciale. | Un jeu de données ou un modèle réservé à la recherche à l'intérieur d'un produit commercial est une violation, quel que soit celui qui l'a ajouté. |

Trois exemples montrent l'étendue. Apache 2.0 ajoute une concession de brevet expresse à ses
permissions [19]. L'AGPL exige que les utilisateurs interagissant avec une version modifiée sur un
réseau se voient proposer sa source [20], ce qui atteint les piles de service. Les licences de style
OpenRAIL accordent un accès ouvert mais attachent des restrictions d'utilisation qui doivent passer
à chaque dérivé et redistribution [21]. Les licences communautaires personnalisées vont plus loin:
la licence Llama 3.1 incorpore une politique d'utilisation acceptable, exige l'attribution « Built
with Llama », demande que les modèles dérivés distribués à d'autres portent « Llama » au début de
leur nom, et exigent que les titulaires de licence dont les produits avaient plus de 700 millions
d'utilisateurs actifs mensuels à la date de publication demandent une licence distincte [22]. Les
contrôles suivent: une vérification de licence comme porte de politique (couche 01), licence,
version d'utilisation acceptable et hachage de fichier dans l'[AIBOM](/patterns/aibom) (couche 02),
vérification de hachage de chaque fichier de poids avant chargement, et une
[analyse des fichiers de modèle sérialisés](/patterns/model-artefact-integrity) avant qu'ils
n'atteignent un runtime. La clause complète et la liste de contrôle des licences se trouvent sur la
[page des contrats](/resources/contracts).

### Posséder le modèle: l'avantage et le fardeau

Construire ou adapter fortement votre propre modèle achète le contrôle: sur les versions et les
dates de retrait, sur la personnalisation, sur le lieu où les données résident, et sur la preuve
elle-même, puisque vous pouvez faire du red-teaming sur les poids que vous détenez. Cela achète
aussi le fardeau du fournisseur si vous placez le système sur le marché, et trois risques
opérationnels que les clients API louent surtout. **Sécurité des poids**: les poids sont un actif à
protéger, contre le vol des fichiers et contre l'extraction via l'API d'inférence, que la taxonomie
des attaques adversariales du NIST et MITRE ATLAS cataloguent tous deux [23][24]; les limites de
débit, la surveillance des modèles de requête et l'accès au moindre privilège au stockage des poids
sont les contrôles. **Maintenance**: la correction, la revalidation et les mises à niveau du modèle
de base deviennent votre calendrier. **Risque de personne clé**: un modèle que seules deux personnes
peuvent réentraîner est un risque de continuité avec des noms attachés.

### Responsabilité, assurance et transfert de risque

La nouvelle directive sur la responsabilité du fait des produits défectueux intègre les logiciels, y
compris les systèmes d'IA, dans la définition d'un produit; les États membres doivent la transposer
avant le 9 décembre 2026, et elle s'applique aux produits placés sur le marché après cette date
[25]. Pour les constructeurs qui placent des systèmes sur le marché, la responsabilité en cas de
défaut devient une entrée de conception; pour les déployeurs, le contrat décide du recours qu'ils
ont contre le fournisseur. Un marché pour l'assurance spécifique à l'IA existe, y compris la
couverture des pertes dues aux erreurs de modèle offerte aux fournisseurs d'IA et aux organisations
qui déploient leurs systèmes [26]. Vérifiez auprès de votre courtier les exclusions d'IA dans les
polices existantes de cyber, d'erreurs et d'omissions technologiques et de responsabilité civile
avant de supposer une couverture. Lorsqu'un assureur demande une preuve de contrôles, le
questionnaire de souscription devient un autre consommateur du magasin d'assurance. Et le risque
transféré n'est pas le risque réduit: le risque résiduel laissé après les plafonds, exclusions et
franchises appartient au registre des risques (voir
[chapitre 13](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it)).

## Contrats de fournisseur et conditions de licence

Lorsque vous déployez un système que vous n'avez pas construit, le contrat est une surface de
contrôle, et le lieu où la [politique d'IA tiers](/bok/governance-program#third-party-ai-policy) de
l'organisation (chapitre 12) devient exécutoire. Il décide si vous pouvez tester le système, si vous
êtes informé quand il change, où vont vos données et comment vous partez. La loi sur l'IA exige un
accord écrit entre le fournisseur d'un système à haut risque et les tiers qui fournissent ses
composants, outils et services, spécifiant les informations, capacités, accès technique et
assistance dont le fournisseur a besoin [15]. Pour les acheteurs, les clauses contractuelles types
de l'UE pour l'approvisionnement en IA (MCC-AI), mises à jour le 5 mars 2025 dans une version à haut
risque et une version allégée avec un commentaire, donnent un texte de référence rédigé pour les
organisations publiques; c'est la dernière version en date du 2026-09-24 [27]. ISO/IEC 42001 Annexe
A.10 et le NIST AI RMF (GOVERN 6, MANAGE 3) nomment les contrôles tiers que les clauses soutiennent
[28][29][30].

Les clauses qui importent le plus pour la gouvernance, avec le drapeau rouge à rechercher et la
preuve à conserver (la position de repli pour chacun est sur la
[page des contrats](/resources/contracts)):

| Clause | Drapeau rouge | Preuve à conserver |
|---|---|---|
| **Utilisation de vos données pour l'entraînement** | L'utilisation pour l'entraînement est activée par défaut, autorisée pour « l'amélioration du service », ou contrôlée par un paramètre que le fournisseur peut modifier. | La clause, le compte ou le paramètre API capturé au lancement, et une vérification périodique de ce paramètre. |
| **Droits dans les entrées et sorties** | Le fournisseur prend une licence sur vos entrées au-delà de la fourniture du service, ou se réserve des droits sur les sorties. | La clause, référencée à partir de l'entrée du registre de chaque système qui utilise le fournisseur. |
| **Rétention et suppression** | Rétention « aussi longtemps que nécessaire » sans nombre, ou rétention de surveillance des abus que vous ne pouvez pas raccourcir ou voir. | Conditions de rétention par type de données; confirmations de suppression; votre propre calendrier de rétention de journaux qui respecte l'art. 26(6). |
| **Sous-traitants et fournisseurs de modèles en amont** | Une liste de sous-traitants qui n'est pas publiée, ou qui change sans avis et sans droit d'opposition. | Snapshots datés de la liste des sous-traitants; décisions d'opposition. |
| **Résidence des données et transferts** | Un engagement de région pour le stockage uniquement, tandis que l'inférence ou le support peuvent s'exécuter n'importe où. | Verdicts de politique de résidence du chemin d'inférence; l'évaluation du transfert. |
| **Documentation et notices d'utilisation** | Documentation « disponible sur demande » ou limitée au matériel marketing. | Copies versionnées jointes à l'entrée du registre. |
| **Accès à l'audit et à l'évaluation** | Audit uniquement en lisant le propre résumé du fournisseur; les essais, les benchmarks ou la recherche en sécurité sont interdits. | Rapports reçus ; vos résultats d'évaluation aux limites ; les fenêtres de test convenues. |
| **Avis de modification, épinglage de version et dépréciation** | Les modèles peuvent être « mis à jour ou améliorés à tout moment » ; avis de dépréciation plus court que votre cycle de revalidation. | Avis de modification déposés contre l'entrée du registre ; résultats de revalidation par version. |
| **Notification d'incident et de vulnérabilité** | Avis « sans retard injustifié » sans délai en heures, ou limité aux violations de données à caractère personnel. | L'accord de niveau de service ; avis reçus et leurs horodatages ; vos registres d'incidents qui les citent. |
| **Disponibilité, latence et limites de débit** | Crédits de service comme seul recours pour une panne qui arrête un processus critique. | Rapports d'accord de niveau de service ; votre propre surveillance de la disponibilité ; tests de continuité. |
| **Indemnité de propriété intellectuelle** | Indemnité exclue lorsque vous modifiez les prompts, utilisez les filtres différemment ou combinez les résultats. | Preuve que vous avez respecté les conditions d'indemnité (filtres activés, utilisation documentée), conservée sous forme de journaux. |
| **Garanties de performance et clauses de non-responsabilité relatives aux résultats** | Clauses de non-responsabilité générales concernant l'exactitude sans aucune performance documentée. | La performance documentée, comparée avec vos propres évaluations. |
| **Plafonds de responsabilité et exclusions** | Un plafond fixé à quelques mois de frais, avec les données, la propriété intellectuelle et les pertes réglementaires tous exclus. | Le plafond et les exclusions, enregistrés comme risque résiduel dans le registre des risques. |
| **Politique d'utilisation acceptable du fournisseur** | Une politique incorporée par référence que le fournisseur peut modifier unilatéralement. | La version de la politique vérifiée au lancement, mappée à votre propre liste d'utilisations interdites. |
| **Allocation des rôles et coopération réglementaire** | Silence sur les rôles du règlement sur l'IA, ou une clause qui transfère les obligations du fournisseur à vous sans l'accès nécessaire pour les remplir. | La décision de rôle enregistrée dans l'entrée du registre, avec la clause qui la soutient. |
| **Contrôles de sécurité et certifications** | Certifications qui excluent le service d'IA de leur champ d'application. | Certificats avec leurs déclarations de champ d'application ; résumés de test d'équipe rouge. |
| **Assistance à la résiliation, portabilité et sortie** | Aucune période de transition ; les poids affinés ou les adaptateurs appartiennent au fournisseur ; export uniquement dans des formats propriétaires. | Un plan de sortie et l'enregistrement d'un exercice de sortie. |
| **Assurance** | Aucune clause d'assurance, ou une couverture qui exclut les sinistres liés à l'IA. | Certificats d'assurance, datés et déposés avec le contrat. |

Deux règles transforment le tableau en gouvernance. Premièrement, une clause qui compte au moment de
l'exécution doit devenir une vérification : le paramètre sans entraînement relu depuis le compte,
l'engagement de résidence appliqué sur le chemin d'inférence, la version épinglée conservée dans le
registre. Une clause que rien ne vérifie est un espoir. Deuxièmement, l'examen est une étape de la
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate), il se réouvre donc
au renouvellement et à chaque avis de modification matérielle. L'ensemble de données derrière ce
tableau, avec le risque que chaque clause adresse, une position de repli et les instruments auxquels
elle correspond, est une liste de contrôle d'ingénierie, pas un conseil juridique.

> **Exemple (illustratif)**
> Les conditions d'un fournisseur permettaient un préavis de 60 jours avant de retirer une version
> de modèle. Le cycle de revalidation du responsable du déploiement (évaluation de sélection, test
> d'équipe rouge, canary) a pris environ 90 jours. L'écart a été enregistré comme un risque, négocié
> à une fenêtre de dépréciation de 120 jours au renouvellement, et entre-temps couvert en gardant un
> deuxième modèle candidat chaud dans le harnais d'évaluation.

## L'examen du lancement

### Ce que l'examen lit

L'examen du lancement lit un dossier de preuves, pas un jeu de diapositives : le DDR ; le registre
de sélection du modèle ; les résultats de la porte d'évaluation par rapport aux planchers ; le
résumé du test d'équipe rouge ; les analyses d'impact (une FRIA où l'article 27 s'applique, une AIPD
où la loi sur la protection des données l'exige, toutes deux maintenues selon le modèle
[FRIA-as-Code](/patterns/fria-as-code)) ; l'examen du contrat ; le plan de surveillance avec
propriétaires nommés ; le plan de déploiement avec ses critères de restauration ; le plan de
communication ; et le runbook de désactivation. Lorsque la preuve est celle du fournisseur lui-même
(ses instructions d'utilisation, qui doivent déclarer les capacités, limitations, mesures de
contrôle et besoins de maintenance du système [18]), l'examen s'exécute en **mode d'examen** : il
évalue l'évaluation et les registres du fournisseur et enregistre explicitement ce que le
responsable du déploiement n'a pas pu vérifier. Du côté du fournisseur, les mêmes preuves
proviennent de
[la préparation à la mise en production et de la conformité](/bok/governing-development#release-readiness-and-conformity)
(chapitre 14).

### Trois résultats

| Résultat | Signification | Ce qui est enregistré | Ce que le pipeline fait |
|---|---|---|---|
| **Approuver** | La preuve répond aux planchers | Décision, approbateur, risque résiduel et qui l'a accepté | Le plan de déploiement commence à sa première étape |
| **Approuver avec conditions** | Procéder uniquement tant que les conditions nommées sont remplies | Chaque condition avec un propriétaire, une date limite et la vérification qui la vérifie | Les conditions deviennent une politique : un drapeau limite l'exposition, et l'approbation porte une date d'expiration |
| **Rejeter** | La preuve ne soutient pas le déploiement | Les raisons et ce qui changerait la réponse | Le déploiement est bloqué ; le statut du registre lit `rejected` |

Une approbation avec conditions est l'endroit où la gouvernance se transforme le plus souvent en
théâtre, car les conditions sont faciles à accorder et faciles à oublier. Rendez-les code : chaque
condition est une vérification avec une date limite, et si la vérification n'a pas réussi d'ici là,
l'approbation expire et le drapeau de fonctionnalité se ferme. Le risque résiduel est accepté par
une autorité qui correspond au niveau de risque, jamais par l'équipe qui veut livrer.

### Dissidence enregistrée

Tout membre de l'examen peut enregistrer une dissidence. La dissidence est jointe au registre de
décision, nommée et examinée lors du premier examen de surveillance après le lancement. Elle ne
coûte rien quand le dissident a tort, et quand il a raison, elle répond à la première question que
chaque examen d'incident pose : quelqu'un a-t-il vu cela venir ?

> **En pratique (illustratif)**
> L'examen du lancement pour `csa-01` l'a approuvé avec deux conditions : un plancher de fondement
> sur le sujet des remboursements, remesurés après quatre semaines de trafic en direct, et un test
> d'équipe rouge en espagnol avant que l'assistant ne serve les locuteurs espagnols. Les deux sont
> devenus des drapeaux. Le responsable de la sécurité a enregistré une dissidence sur la portée de
> l'outil pour les recherches de commandes. La vérification de quatre semaines a réussi ; le test
> d'équipe rouge non, donc l'espagnol est resté derrière son drapeau jusqu'à ce qu'un correctif soit
> livré, et la dissidence a été fermée avec une portée réduite.

## La livraison progressive comme contrôle

La livraison progressive limite l'exposition tandis que les preuves s'accumulent. Chaque étape est
une porte avec un critère défini à l'avance ; les étapes sont empruntées à l'ingénierie de fiabilité
des sites, où le canarying est défini comme un déploiement partiel et limité dans le temps d'une
modification et son évaluation [31].

| Étape | Ce qu'elle est | Ce qu'il prouve | Critère de restauration (défini avant le début de l'étape) | Preuve |
|---|---|---|---|---|
| **Shadow** | Le nouveau système voit les entrées en direct ; ses résultats ne sont pas utilisés | Comportement sur le trafic réel sans exposition | Désaccord avec le sortant ou avec les décisions humaines au-dessus d'un seuil | Résultats appairés ; journal de désaccord |
| **Pilot** | Un petit groupe d'utilisateurs informés | Convivialité ; la surveillance fonctionne ; la main-d'œuvre est prête | Taux de remplacement ou taux de plainte au-dessus d'un seuil | Rapport pilote ; journal de rétroaction |
| **Canary** | Une petite part du trafic de production, comparée à un groupe de contrôle [31] | Aucune régression à l'échelle | Tout plancher enfreint par rapport au contrôle | Analyse canary par métrique |
| **Blue-green** | Deux environnements de production ; le trafic bascule entre eux [32] | Un chemin testé et instantané vers l'arrière | Tout événement de gravité 1 | Événements de commutation |
| **Drapeaux de fonctionnalité** | Bascules d'exécution par cohorte, région ou fonction, y compris les commutateurs d'arrêt opérationnels [33] | L'exposition est contrôlable sans un déploiement | Défini par drapeau | Journal des modifications de drapeau |
| **Épinglage de version** | Le registre épingle les versions du modèle, du prompt, du corpus et du guardrail | Ce qui a fonctionné est connu | Une modification non épinglée est détectée | Diff du registre |

Les critères de restauration doivent être **pré-enregistrés** : écrits dans le
[plan de déploiement](/patterns/staged-rollout-rollback-criteria) avant le début de l'étape, et
évalués par le pipeline, pas par une réunion. Un critère inventé après le déplacement de la métrique
est une négociation, pas un contrôle. Il en va de même pour les modifications que vous n'avez pas
apportées : une nouvelle version de modèle de fournisseur est une mise en production, et elle passe
par shadow et canary de votre côté par rapport à la version épinglée avant de prendre du trafic. Le
catalogue des outils énumère les
[outils de livraison progressive](/resources/tools#cat-progressive-delivery) comme exemples
illustratifs, pas comme des approbations.

## Exploitation du système

### Politiques au lancement

Le système se lance avec les politiques qui rendent son utilisation gouvernable. Une
**politique d'utilisation acceptable** pour le personnel et les clients, tirée de l'espace négatif.
**Formation basée sur les rôles** : à quoi sert le système, les limitations que ses instructions
d'utilisation déclarent [18], quand le contourner et comment signaler un problème, avec l'achèvement
comme condition d'accès. **Aides d'interface** qui soutiennent le jugement plutôt que de le
remplacer : sources affichées, confiance où elle est significative, et un moyen visible d'atteindre
une personne. Ce sont les formes pratiques des obligations de l'article 26 d'utiliser le système
comme indiqué et de donner une surveillance à des personnes compétentes ayant autorité [1], et des
contrôles d'utilisation responsable dans la norme ISO/IEC 42001 Annexe A.9 [28]. La surveillance
elle-même est conçue comme dans
[concevoir la supervision humaine](/bok/the-stack#designing-human-oversight-article-14).

### Gouvernance des données au moment de l'inférence

Les entrées en direct sont un traitement de données, et un système déployé crée de nouvelles données
à chaque demande : prompts, passages récupérés, résultats, journaux et rétroaction. Gouvernez-les
comme vous gouvernez les données d'entraînement (voir
[gouvernance des données dans le stack](/bok/the-stack#data-governance-across-the-stack)) :

- **Minimisez** ce qui atteint le modèle, avec filtrage des PII et prévention de la perte de données
  dans le [guardrail](/patterns/runtime-guardrail) d'entrée.
- **Définissez la rétention par type de données** en tant que code, conciliant le plancher de
  rétention des journaux ci-dessous avec le plafond de limitation du stockage de la loi sur la
  protection des données.
- **Revérifiez la base juridique** lorsque l'objectif change ; une nouvelle utilisation d'anciens
  journaux est un nouvel objectif de traitement.
- **Mappez les transferts** lorsque l'inférence, le stockage ou le support s'exécutent dans une
  autre juridiction ; le chapitre 19 traite
  [l'inférence à distance comme un transfert](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
- **Planifiez les [demandes de personnes concernées](/patterns/rights-requests-against-models)** qui
  atteignent les prompts, les journaux, les corpus de récupération et les poids affinés. Supprimer
  un enregistrement d'un corpus est une suppression ; supprimer son influence des poids affinés peut
  signifier réentraîner, donc décidez avant d'affiner sur des données à caractère personnel. Les
  responsables du déploiement de systèmes à haut risque utilisent les informations du fournisseur
  pour mener à bien leur AIPD [1] ; [le chapitre 19](/bok/privacy-and-ai#the-dpia-for-ai-systems)
  couvre le côté confidentialité en profondeur.

### Calendrier de maintenance et gouvernance de la revalidation

Les instructions d'utilisation du fournisseur énoncent la durée de vie attendue du système et la
maintenance qu'il nécessite, y compris la fréquence [18]. Le calendrier du responsable du
déploiement commence là et ajoute le sien :

| Cadence | Activité | Artefact | Couche |
|---|---|---|---|
| Continu | Signaux de dérive, d'équité, de qualité, de coût et d'énergie par rapport aux seuils | Télémétrie de surveillance | 4 · 5 |
| Hebdomadaire | Trier les problèmes et les quasi-accidents ; examiner les tendances de remplacement et de plainte | Journal des problèmes | 5 |
| Mensuel | Avis de changement de fournisseur, changements de sous-traitants, rapports SLA | Dossier d'examen tiers | 2 · 5 |
| Trimestriel | Examen du seuil ; red team sur les versions actuelles ; actualisation des fiches et du registre | Fiches mises à jour ; résultats du red team | 2 · 3 |
| Annuellement (ou par niveau de risque) | Réévaluation de l'impact ; examen des bénéfices ; actualisation des licences et dépendances ; exercice de désactivation | Réévaluation ; dossier d'exercice | 1 · 2 · 4 |
| À la survenance d'un événement | Nouvelle population, juridiction, niveau d'autonomie ou version du fournisseur ; un incident | Dossier de déclenchement de réévaluation | 1 · 2 |

**La gouvernance du réentraînement** repose sur une seule règle : un réentraînement, un ajustement
fin, un changement de prompt, une actualisation de corpus et une mise à jour du modèle du
fournisseur sont tous des versions. Chacun passe par la porte d'évaluation et les étapes de
livraison progressive, et chacun incrémente la version dans le registre. Un changement de seuil est
un changement de contrôle, donc c'est un diff examiné avec un approbateur, pas une modification sur
un tableau de bord. Le réentraînement est déclenché par une dérive ou une violation de plancher, par
le calendrier, ou par un changement dans le monde que le DDR décrit. Le catalogue d'outils énumère
[les outils de surveillance](/resources/tools#cat-monitoring) comme exemples illustratifs, non comme
des recommandations.

### Dérive : ce qui change et comment le voir

La dérive conceptuelle est un changement imprévisible dans la distribution des données qu'un modèle
voit au fil du temps, et la recherche sur ce sujet divise le travail en détection, compréhension et
adaptation [34]. En production, il est utile de nommer ce qui a changé :

| Dérive | Ce qui change | Exemple (illustratif) | Comment le détecter |
|---|---|---|---|
| **Données (covariée)** | La distribution des entrées | Une nouvelle gamme de produits change les questions que posent les clients | Indice de stabilité de population ou test de Kolmogorov-Smirnov sur les caractéristiques ou les plongements par rapport à une fenêtre de référence |
| **Étiquette (a priori)** | Le taux de base du résultat | Le taux de fraude augmente en saison | Taux positif prédit par rapport au taux positif observé |
| **Concept** | La relation entre l'entrée et le résultat | Mêmes symptômes, nouvelles directives de traitement | Performance sur des étiquettes récentes ; détection de point de changement sur le taux d'erreur |
| **Pipeline** | Une caractéristique en amont, un schéma ou une étape de récupération | Un changement de schéma vide un champ | Contrats de données ; moniteurs de taux de valeurs nulles et de fraîcheur |
| **Modèle du fournisseur** | Le modèle derrière l'API | Le fournisseur expédie une nouvelle version | Vérification de l'épinglage de version ; canari par rapport à la ligne de base épinglée |
| **Utilisation** | Qui utilise le système et pour quoi | Le personnel commence à utiliser l'assistant pour les questions RH | Classification thématique du trafic par rapport à l'espace négatif |

Les étiquettes arrivent souvent tard, ou jamais. Pour les modèles classiques, associez les
statistiques de dérive des entrées à une vérification de performance retardée quand les étiquettes
arrivent ; pour les systèmes génératifs, échantillonnez les sorties pour la notation de l'ancrage et
l'examen humain. Chaque [signal de dérive](/patterns/drift-fairness-monitor) a besoin d'un seuil,
d'un propriétaire et d'une conséquence définie : un problème, un réentraînement, un mode dégradé ou
un incident.

### Équité et qualité en production

Un système qui a réussi ses [évaluations d'équité](/patterns/fairness-eval-suite) au lancement peut
dériver vers l'inéquité sans aucun changement de code. Surveillez les taux d'erreur par groupe par
rapport aux planchers par groupe dans le DDR, les taux de plainte et d'appel par groupe, et, pour
les systèmes génératifs, les taux d'ancrage et de refus par sujet et langue. Lorsque la loi exige un
audit de biais périodique (par exemple, la Local Law 144 de New York exige un audit de biais dans
l'année précédant l'utilisation d'un outil de décision automatisée en matière d'emploi, et un résumé
public de ses résultats [35]), la télémétrie de production est ce qui rend l'audit bon marché.
[Le chapitre 16](/bok/fairness-and-explainability#monitoring-fairness-in-production) couvre les
métriques ; le point ici est qu'elles s'exécutent en continu et alimentent le même chemin de seuil,
de problème et d'incident que tout autre signal.

### Qui possède le signal

| Signal | Surveille (responsable) | Décide (responsable) | Consulté | Informé | Escalade vers |
|---|---|---|---|---|---|
| Performance et dérive | Équipe d'astreinte de la plateforme ML | Propriétaire du système | Ingénieur en gouvernance de l'IA | Risque | Panneau de lancement si un plancher est violé |
| Équité | Ingénieur en gouvernance de l'IA | Propriétaire du système | Juridique ; représentants des groupes affectés | DPO | Comité des risques |
| Sécurité et abus | Opérations de sécurité | Responsable de la sécurité | Ingénieur en gouvernance de l'IA | Propriétaire du système | [Pipeline d'incidents](/patterns/incident-pipeline) |
| Obligations de conformité | Ingénieur en gouvernance de l'IA | Responsable de la conformité | Juridique | Liaison avec le régulateur | Pipeline d'incidents ; propriétaire des communications |
| Coût, énergie et bénéfice | FinOps | Propriétaire de l'entreprise | Responsable de la durabilité | Finance | Examen des bénéfices |

La règle est celle du [chapitre 06](/bok/the-role#runtime-monitoring-and-incidents) : vous possédez
un signal quand vous pouvez être appelé pour lui. Un système critique a besoin de couverture pour
chaque heure où il s'exécute, et un signal sans propriétaire est un signal sur lequel personne
n'agit.

### Surveillance des tiers pendant que vous fonctionnez

Un système acheté continue de changer après la signature du contrat. Enregistrez chaque avis de
changement et de dépréciation par rapport à l'entrée du registre, lisez les rapports SLA, prenez un
instantané de la liste des sous-traitants, et rouvrez la porte de diligence raisonnable au
renouvellement. Gardez un modèle alternatif actif dans le harnais d'évaluation pour qu'une migration
forcée commence à partir de preuves, pas à partir de zéro. Le NIST AI RMF demande exactement cela :
les risques et bénéfices tiers surveillés régulièrement, et les modèles pré-entraînés surveillés
dans le cadre de la maintenance du système lui-même [30].
L'[étape d'exploitation de la porte de diligence raisonnable](/patterns/vendor-model-due-diligence-gate#operate-change-notices-reassessment-and-fallback)
transforme cela en runbook.

### Quand le fournisseur échoue : continuité

Planifiez l'échec du fournisseur de chacune des façons dont il peut échouer : une panne, une limite
de débit au pic, une baisse de qualité, un modèle retiré, une dépréciation forcée, ou une sortie
commerciale ou juridique. Les solutions de secours sont un processus manuel que le personnel a
pratiqué, un modèle alternatif derrière la même interface, des réponses en cache ou basées sur des
modèles, et les modes dégradés décrits ci-dessous. La récupération a besoin de ses propres preuves :
sauvegardez l'instantané du corpus et les plongements, ou sachez que vous pouvez reconstruire
l'index ; gardez les prompts et les configurations de guardrail sous contrôle de version ; et testez
le basculement. Le NIST AI RMF demande des processus de contingence pour les défaillances dans les
systèmes d'IA tiers jugés à haut risque [29].

Certains secteurs en font un devoir juridique. Les entités financières relevant de DORA, en
application depuis le 17 janvier 2025 [36], doivent tenir un registre des informations sur tous les
arrangements contractuels pour les services TIC de fournisseurs tiers, et doivent avoir des
stratégies de sortie pour les services TIC qui soutiennent des fonctions critiques ou importantes
[37]. Un modèle d'IA atteint en tant que service est susceptible de compter comme un service TIC à
cette fin (vérifiez pour votre cas). Les entités relevant de NIS2 doivent prendre des mesures pour
la continuité des activités, y compris la gestion des sauvegardes et la récupération après sinistre,
et pour la sécurité de la chaîne d'approvisionnement [38] ; que vous soyez dans le champ
d'application dépend de votre secteur et de votre taille (vérifiez).

### Réalisation des bénéfices

Suivez l'objectif dans le DDR par rapport à ce que le système livre, y compris son coût d'inférence
et d'exploitation. La sous-livraison est un signal de gouvernance, pas seulement un signal
commercial : un système qui coûte plus à exécuter et gouverner qu'il ne rapporte est un candidat
pour la redéfinition de portée ou la retraite, et l'examen des bénéfices est où cela est décidé sur
la base de preuves. Un registre des systèmes en direct sans bénéfice mesuré est un inventaire de
risques non tarifés.

### Rapport d'empreinte énergétique

Mesurez l'énergie par requête et au total, avec la limite énoncée : accélérateurs, systèmes hôtes,
capacité inactive et surcharge du centre de données [12]. Sur votre propre matériel, mesurez-le ;
sur celui d'un fournisseur, demandez-le dans le contrat et enregistrez ce que vous avez reçu.
Convertissez en carbone avec l'intensité du réseau de la région qui dessert le trafic, signalez-le à
côté du coût dans l'examen des bénéfices, et laissez-le éclairer le prochain choix de modèle : quand
un modèle plus petit réussit l'évaluation de sélection, la différence d'énergie est une raison de le
préférer [11].

### Conservation des dossiers

| Enregistrement | Conservé par | Minimum | Source |
|---|---|---|---|
| Journaux générés automatiquement par un système à haut risque, dans la mesure du contrôle du responsable du déploiement | Déployeur | Au moins six mois, sauf si une autre loi en dispose autrement | `Art. 26(6)` [1] |
| Les mêmes journaux, sous le contrôle du fournisseur | Fournisseur | Au moins six mois | `Art. 19(1)` [39] |
| Documentation technique et de gestion de la qualité, déclaration de conformité | Fournisseur | 10 ans après la mise sur le marché | `Art. 18(1)` [40] |
| DDR, décision de lancement, conditions et dissidence | Déployeur | La vie du système plus le délai de prescription que le conseil fixe | Pratique |
| Journaux d'exploitation selon le cadre volontaire TC260 3.0 de la Chine | Opérateur | Au moins six mois, avec audit | §5.3 [41] |

La conservation est un contrôle, donc c'est du code : un calendrier par type d'enregistrement, un
stockage inviolable pour les journaux, une mise en attente juridique qui remplace la suppression, et
des formats d'archive que quelqu'un peut encore lire dans 10 ans. Le plancher de six mois pour les
journaux est un minimum ; la loi sur la protection des données fixe un plafond pour les données
personnelles qu'ils contiennent, et les deux sont réconciliés par type de données, pas en conservant
tout.

## Assurance périodique

### Un programme d'audit, pas un audit

Un seul audit est un instantané. Un programme d'audit a une charte, un calendrier fondé sur les
risques lié au niveau de risque, et une indépendance proportionnée aux enjeux : examen de deuxième
ligne, audit interne, ou un évaluateur externe (voir
[comment cela se rapporte à la certification](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments)).
Les bons programmes réexécutent plutôt que de lire : l'auditeur réexécute une vérification d'équité
ou rejoue un échantillon de journaux au lieu d'accepter le rapport qui dit que c'était fait. Chaque
constatation obtient un propriétaire, une date et un test de clôture, et les constatations ouvertes
sont une requête en direct, pas une feuille de calcul.

### Red teaming selon un calendrier

Planifiez le red teaming par niveau de risque, et visez la configuration déployée (prompts, outils,
corpus de récupération, guardrails), pas seulement le modèle. Pour un système acheté, testez à la
limite dans les fenêtres que le contrat autorise. Le modèle
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) transforme chaque constatation en
test de régression, de sorte que la prochaine exécution planifiée prouve que la correction a tenu.

### Modélisation des menaces du système déployé

Décomposez les flux de données (utilisateur, application, récupération, modèle, outils,
consommateurs en aval), puis énumérez les menaces par élément avec une liste de contrôle de
catégorie classique telle que STRIDE, étendue avec les attaques spécifiques à l'IA que la taxonomie
d'apprentissage automatique adversarial du NIST [23], MITRE ATLAS [24] et le Top 10 OWASP pour les
applications agentiques [42] cataloguent. Le résultat qui compte est le mappage de la menace à
l'atténuation au test qui prouve que l'atténuation fonctionne :

| Menace | Où elle entre | Atténuation | Le test qui le prouve |
|---|---|---|---|
| Injection de prompt indirect | Documents récupérés, sorties d'outils | Guardrail d'entrée ; portée d'outil étroite | Cas de red team avec instructions plantées |
| Empoisonnement de la récupération | Ingestion de corpus | Liste blanche de sources ; provenance dans l'AIBOM | Documents canari qui ne doivent jamais être récupérés |
| Extraction de modèle | API d'inférence | Limites de débit ; détection de motif de requête | Sonde d'extraction par rapport aux limites |
| Inférence d'appartenance, inversion | Un modèle ajusté sur des données personnelles | Minimiser les données personnelles dans l'ajustement ; filtrage de sortie | Suite d'attaque à la vie privée sur le modèle ajusté |
| Poids altérés | Chaîne d'approvisionnement | [Vérification du hachage et de la signature](/patterns/model-artefact-integrity) | Le pipeline échoue sur une non-concordance de hachage |
| Mauvaise utilisation d'outil | Actions d'agent | Identifiants limités ; porte humaine sur les actions à conséquences élevées | Portée et tests de [kill-switch](/patterns/kill-switch-circuit-breaker) |

Le [threat bridge](/resources/threats) du site aligne ces menaces avec les motifs qui les
contrôlent.

## Utilisation secondaire et préjudice en aval

Les systèmes sont utilisés à d'autres fins que celles pour lesquelles ils ont été approuvés. Le
règlement sur l'IA nomme le concept : l'**utilisation indevida razonavelmente previsible** est une
utilisation non conforme à la destination, mais qui peut résulter d'un comportement humain
raisonnablement prévisible ou d'une interaction avec d'autres systèmes [2]. Autour de lui se
trouvent l'**extension progressive des fonctions** (l'extension graduelle d'un système à des fins
qu'aucun n'a approuvées), l'**usage double** (la même capacité servant un objectif nuisible), le
**préjudice en aval** (les résultats alimentant d'autres systèmes qui agissent sur eux), les
**boucles de rétroaction** (les résultats façonnant les données à partir desquelles la version
suivante apprend, comme lorsqu'un score de risque décide qui est inspecté et donc décide quels cas
sont étiquetés) et le **recyclage synthétique** (les résultats générés réutilisés comme données
d'entraînement).

Prévoyez-les avant le lancement avec trois techniques peu coûteuses. Une **autopsie** : supposez
qu'un an a passé et que le système a causé un préjudice, puis notez comment. Des **cas d'abus** :
des histoires de mauvaise utilisation écrites à côté des histoires d'utilisateurs, par des personnes
payées pour penser comme l'agresseur. Une **cartographie de l'impact sur les parties prenantes** :
chaque groupe que les résultats atteignent, y compris ceux qui ne touchent jamais l'interface.

Donnez ensuite aux réponses un lieu, que ce chapitre appelle un
**[registre d'utilisation en aval](/patterns/downstream-use-register)** : les utilisations prévues
et interdites écrites comme une [fiche de politique](/patterns/policy-card) ; chaque consommateur
des résultats (systèmes, équipes, partenaires) enregistré par rapport à l'entrée du registre ; la
provenance et les réserves estampillées sur les résultats afin qu'un consommateur sache ce qu'il
utilise ; et un re-test chaque fois que les résultats sont utilisés dans un nouveau contexte. À
l'exécution, l'utilisation hors objectif est un signal comme un autre : classifiez le trafic par
rapport à l'espace négatif et alertez sur ce qui en sort. Les déploiements orientés vers les
consommateurs ajoutent une question supplémentaire, celle de savoir si des enfants ou d'autres
personnes vulnérables utiliseront le système, avec l'assurance de l'âge et l'interdiction de
l'article 5 d'exploiter les vulnérabilités comme contrôles à considérer [6].

## Communications externes

Chaque système déployé a besoin d'un plan pour communiquer avec les personnes en dehors de
l'organisation, rédigé avant qu'il ne soit nécessaire. Le plan nomme un propriétaire et une seule
voix, un flux de travail d'approbation, et une source unique de vérité : une page de transparence et
une fiche système en langage clair
[générée à partir du registre](/patterns/disclosure-notification-pipeline), afin que ce que vous
dites publiquement ne puisse pas dériver de ce qui s'exécute. Les modèles sont versionnés comme du
code. Le NIST AI RMF demande que les incidents et les erreurs soient communiqués aux acteurs de l'IA
pertinents, y compris les communautés affectées [30].

| Public | Proactif | Déclencheur réactif | Horloge | Modèle |
|---|---|---|---|---|
| Autorité de surveillance du marché | Enregistrement où requis (responsables du déploiement des autorités publiques) [1] | Raison de considérer que le système présente un risque : informer le fournisseur ou le distributeur et l'autorité, et suspendre l'utilisation [1] | Sans délai indu | Avis de risque pré-rempli |
| Fournisseur, puis autorité | Aucun | Un incident grave : informer d'abord le fournisseur, puis l'importateur ou le distributeur et les autorités [1] | Immédiatement ; les horloges de signalement propres du fournisseur suivent (voir [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) | Avis d'incident grave |
| Autorité de protection des données | AIPD où requise | Une violation de données à caractère personnel | Dans les 72 heures si possible [43] | Notification de violation |
| Utilisateurs et personnes affectées | Divulgation de l'IA [5] ; avis aux personnes soumises aux décisions de l'annexe III [1] ; explication sur demande [7] | Une violation susceptible de créer un risque élevé pour eux [44] ; un changement matériel ; une correction | Sans délai indu | Avis ; avis de correction |
| Travailleurs et leurs représentants | Information avant utilisation au travail [1] | Un changement de portée | Avant utilisation | Dossier d'information |
| Clients professionnels et partenaires | Journal des modifications ; mises à jour de la fiche de modèle et de l'AIBOM | Un incident les affectant ; une dépréciation | Comme le contrat le définit | Avis client |
| Médias et public | Page de transparence ; fiche système | Un incident ayant un impact public | Déclaration de principe d'abord, faits une fois confirmés | Déclaration de principe ; Q&A |

Une **déclaration de principe** est préparée en squelette avant tout incident : ce qui s'est passé,
énoncé seulement dans la mesure où il est connu ; ce qui a été fait pour le contenir ; ce que les
personnes affectées doivent faire ; et quand la prochaine mise à jour arrivera. Elle ne spécule
jamais sur la cause. Le côté incident de la communication est développé au
[chapitre 17](/bok/incidents#the-response-lifecycle). À la retraite, le même plan envoie les avis de
coucher de soleil. Et mesurez le plan : si les avis ont atteint les personnes pour lesquelles ils
étaient destinés, et ce que le volume de plaintes a fait après.

## Désactivation, dégradation, localisation et retraite

### Une politique de désactivation que quelqu'un peut exécuter

Une [politique de désactivation](/patterns/deactivation-localisation-retirement-runbook) nomme ses
déclencheurs, son autorité décisionnelle, le dossier que chaque décision laisse, comment les preuves
sont préservées et les critères d'un redémarrage sûr. Les déclencheurs se présentent en deux types.
Déclencheurs de seuil : un plancher franchi et non récupéré dans une fenêtre définie, un écart
d'équité au-dessus de sa limite, une gravité d'incident. Déclencheurs légaux : le devoir propre du
responsable du déploiement de suspendre l'utilisation lorsqu'il a des raisons de considérer que le
système présente un risque [1] ; l'action corrective d'un fournisseur pour retirer, désactiver ou
rappeler un système non conforme [45] ; action d'une autorité sur un système d'IA présentant un
risque pour la santé, la sécurité ou les droits fondamentaux [46] ; et une pratique nouvellement
interdite. Le NIST AI RMF demande des mécanismes, avec des responsabilités assignées, pour
remplacer, désengager ou désactiver les systèmes dont les performances ou les résultats sont
incompatibles avec l'utilisation prévue [30].

La préservation des preuves vient d'abord : geler les journaux, appliquer une mise en attente
légale, faire un instantané des versions. Puis arrêtez. La désactivation s'applique à tous les types
de systèmes, pas seulement les agents : un classificateur intégré dans un produit de fournisseur a
besoin d'un commutateur aussi, qu'il s'agisse d'un drapeau de fonctionnalité ou d'un chemin de
secours. Pour les agents, le motif
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) s'applique, et le
[chapitre 23](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers) le développe.

### Dégradation progressive

Éteindre est le dernier recours, pas le seul. Construisez les modes intermédiaires à l'avance comme
des bascules opérationnelles [33], et testez-les :

| Mode | Ce qui change | L'utiliser quand |
|---|---|---|
| **Conseil uniquement** | La sortie va à une personne ; le système n'agit ou ne décide jamais seul | Doute sur la précision ou l'équité ; l'action est ce qui porte le risque |
| **Seuils élevés** | Le système s'abstient en dessous d'une confiance plus élevée et achemine vers une personne | Dérive détectée ; étiquettes en attente |
| **Fondé uniquement** | Les réponses uniquement avec une source récupérée ; sinon il refuse | Le taux d'hallucination augmente |
| **Étendue désactivée** | Désactivé pour un groupe, une langue, une région ou une fonction | Les dommages concentrés dans un segment |
| **Retour au pilote** | L'exposition revient à la cohorte pilote | Régression large avec une cause inconnue |
| **Arrêt** | Le processus de secours prend le relais | Déclencheur légal ; préjudice grave |

### Localisation par juridiction

Lancez uniquement où la conformité a été démontrée, et gardez la juridiction comme une entrée de
politique plutôt qu'un accident de déploiement : des ensembles de règles par juridiction en tant que
code, des instances régionales où la résidence les exige, et des drapeaux de fonctionnalité par
région afin qu'un marché puisse être désactivé sans toucher aux autres. Les obligations se
chevauchent dans certains endroits (le plancher de six mois du règlement sur l'IA et la rétention du
journal de l'opérateur de six mois dans le cadre volontaire TC260 de la Chine [1][41]) et divergent
dans de nombreux autres ; voir le [chapitre 21](/bok/ai-laws-worldwide#comparing-the-regimes) et la
[carte réglementaire](/bok/regulatory-map#other-jurisdictions).

### Retraite et déclassement

Concevez la retraite dès le départ : le DDR nomme déjà les conditions dans lesquelles le système est
retiré. Les déclencheurs incluent un manque d'avantages, une dépréciation du fournisseur, un
remplacement et un événement juridique. Le NIST AI RMF avertit que la résiliation irrégulière ou
indiscriminée peut elle-même augmenter le risque [29], donc la retraite est un runbook, pas une
suppression :

1. **Analyse des dépendances.** Qui consomme les résultats ? Le
   [registre d'utilisation en aval](/patterns/downstream-use-register) y répond.
2. **Secours et transition.** Les utilisateurs passent au remplacement ou au processus manuel, avec
   formation.
3. **Avis de coucher de soleil.** Les clients, partenaires et personnes affectées entendent avant la
   date, pas après.
4. **Instantané de preuve finale.** Les fiches, les évaluations, les décisions et les journaux sont
   archivés selon le calendrier de rétention.
5. **Archiver ou éliminer.** Les poids, les corpus et les journaux sont conservés ou détruits selon
   la licence, la base juridique et la rétention.
6. **Révoquer les identités et les identifiants.** Chaque identité non humaine que le système
   détenait est révoquée.
7. **Retirer, ne pas supprimer, l'entrée du registre.** Son statut lit `retired`, avec la date et le
   dossier de décision.
8. **Confirmez qu'il est parti.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery) vérifie
   qu'aucune copie ne s'exécute toujours.

## Un système de la décision à la retraite

`csa-01`, l'assistant que le [chapitre 04](/bok/the-stack#one-system-through-the-five-layers) suit à
travers les cinq couches, s'exécute également dans ce chapitre. Les artefacts qu'il laisse, tous
illustratifs :

| Étape | Artefact | Couche |
|---|---|---|
| Décider | `ddr-csa-01-v1`, avec son espace négatif et ses planchers | 1 · 2 |
| Choisir | Évaluation de sélection sur trois candidats ; estimation énergétique par 1 000 demandes | 3 |
| Contracter | Examen des clauses ; paramètre sans entraînement relu chaque semaine | 1 · 5 |
| Mise en service | Approuvé avec deux conditions et un désaccord | 1 · 5 |
| Déploiement | Ombre, puis canari avec retrait pré-enregistré sur la fondation | 4 |
| Exploitation | Alerte de dérive d'utilisation sur les sujets RH ; changement de version du fournisseur passé canari | 4 · 5 |
| Assurer | Équipe rouge trimestrielle ; les conclusions fermées comme tests de régression | 3 · 5 |
| Retrait | Conditions de retraite dans le DDR ; runbook exercé une fois par an | 2 · 4 |

**Correspondances :** Règlement de l'IA de l'UE Art. 4, 5, 13, 25, 26, 27, 50, 86 · RGPD Art. 33,
34, 35 · ISO/IEC 42001 Annexe A.6.2.5, A.6.2.6, A.9, A.10 · NIST AI RMF (GOVERN 1.7, GOVERN 6,
MANAGE 2.4, MANAGE 3, MANAGE 4) · DORA Art. 28 · NIS2 Art. 21 · les cinq couches. Les mappages sont
illustratifs, pas une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Rédigez le DDR pour votre système en direct le plus risqué**, rétroactivement si vous devez, y
   compris son espace négatif et ses conditions de retraite, et liez-le à partir de l'entrée du
   registre.
2. **Vérifiez cinq clauses dans votre plus grand contrat d'IA** : utilisation de vos données pour
   l'entraînement, avis de modification et de dépréciation, avis d'incident, accès à l'audit et à
   l'évaluation, et sortie. Classez chaque écart comme un risque.
3. **Pré-enregistrez les critères de retrait** pour votre prochain modèle, invite ou changement de
   version du fournisseur, et câblez l'un d'eux comme vérification de canari automatique.
4. **Comparez la rétention des journaux** sur chaque système à haut risque ou probablement à haut
   risque par rapport au plancher de six mois et à votre plafond de protection des données.
5. **Construisez un mode dégradé** (conseil uniquement ou fondé uniquement) derrière un drapeau, et
   testez qu'il fonctionne.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(4) relevant and representative input data; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months; 26(7) inform workers; 26(8) public-authority registration; 26(9) DPIA; 26(11) inform affected persons). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 definitions: (3) provider, (4) deployer, (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification. Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[3] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk rules from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27(1) (FRIA before first use by public bodies, private entities providing public services and deployers of Annex III points 5(b) and (c)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency obligations apply from 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(b) (prohibition on exploiting vulnerabilities due to age, disability or a specific social or economic situation; applies to placing on the market, putting into service and use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86(1) (right to a clear and meaningful explanation from the deployer of the role of an Annex III system in a decision, except point 2 systems). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4 replaced: providers and deployers support AI literacy; Art. 25(2) cooperation extended to technical documentation, known limitations and failure modes and targeted technical access; Art. 25(4) revised; Art. 26 unchanged; Art. 111(4) transitional period for Art. 50(2) marking to 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[9] "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k; accuracy drops of up to 8% against GSM8k; systematic overfitting in several model families) (arXiv 2405.00332). Zhang et al. 2024-05-01. https://arxiv.org/abs/2405.00332 (verified: primary)
[10] "The Leaderboard Illusion" (undisclosed private testing of multiple variants and score retraction on Chatbot Arena) (arXiv 2504.20879). Singh et al. 2025-04-29. https://arxiv.org/abs/2504.20879 (verified: primary)
[11] "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" (multi-purpose generative architectures orders of magnitude more expensive per inference than task-specific systems, controlling for parameters) (arXiv 2311.16863; FAccT '24). Luccioni, Jernite, Strubell. 2023-11-28. https://arxiv.org/abs/2311.16863 (verified: primary)
[12] "Measuring the environmental impact of delivering AI at Google Scale" (median Gemini Apps text prompt 0.24 Wh; boundary includes host energy, idle capacity and data-centre overhead) (arXiv 2508.15734). Elsworth et al., Google. 2025-08-21. https://arxiv.org/abs/2508.15734 (verified: primary)
[13] Energy and AI, executive summary (data-centre electricity 415 TWh in 2024, around 945 TWh by 2030). International Energy Agency. 2025-04. https://www.iea.org/reports/energy-and-ai/executive-summary (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex XI, Section 1, point 2(e) (GPAI technical documentation: known or estimated energy consumption of the model). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (value chain: 25(1)(a) name or trademark, (b) substantial modification, (c) changed intended purpose; 25(2) cooperation of the initial provider; 25(4) written agreement with third-party suppliers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[16] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; content approved 18 Jul 2025; paras. 67 to 68: a modified systemic-risk model is presumed to have systemic risk). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[17] Guidelines on obligations for general-purpose AI providers, FAQ (modifiers become providers only when the modification uses more than one third of the original model's training compute; obligations limited to documenting the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[18] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13(3) (instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance measures, including their frequency; log collection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[19] Apache License, Version 2.0 (section 3, grant of patent licence). Apache Software Foundation. 2004-01. https://www.apache.org/licenses/LICENSE-2.0 (verified: primary)
[20] GNU Affero General Public License v3 (section 13, remote network interaction). Free Software Foundation. 2007-11-19. https://www.gnu.org/licenses/agpl-3.0.html (verified: primary)
[21] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that must be adopted by redistributions and derivatives). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[22] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated by reference; "Built with Llama" attribution; "Llama" at the start of distributed derived model names; separate licence above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[23] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[24] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems. MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[25] Directive (EU) 2024/2853 on liability for defective products (software within the definition of product; transposition by 9 Dec 2026; applies to products placed on the market or put into service after that date). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[26] aiSure AI insurance (cover for losses from AI model errors, for AI vendors and corporate adopters). Munich Re. 2026. https://www.munichre.com/en/solutions/for-industry-clients/insure-ai.html (verified: primary)
[27] Updated EU AI model contractual clauses (MCC-AI high-risk and light versions, with commentary; update of the 2023 clauses). Community of Practice on Public Procurement of AI, Public Buyers Community (European Commission). 2025-03-05. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses (verified: primary)
[28] ISO/IEC 42001:2023, Annex A control titles (A.6.2.5 AI system deployment; A.6.2.6 operation and monitoring; A.9 use of AI systems; A.10 third-party and customer relationships), referenced by identifier only. ISO/IEC (titles checked via a secondary listing). 2023. https://www.iso.org/standard/42001 (verified: secondary)
[29] NIST AI RMF Playbook, GOVERN (1.7 decommissioning and phasing out safely; 6.1 third-party risk policies; 6.2 contingency for failures in high-risk third-party systems). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] NIST AI RMF Playbook, MANAGE (2.4 supersede, disengage or deactivate; 3.1 third-party risks monitored; 3.2 pre-trained models monitored; 4.1 post-deployment monitoring plans; 4.3 incidents communicated, including to affected communities). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[31] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[32] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[33] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[34] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[35] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[36] Digital Operational Resilience Act (DORA): in application since 17 Jan 2025; register of information; ICT third-party risk. EIOPA. 2025. https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en (verified: primary)
[37] Regulation (EU) 2022/2554 (DORA), Art. 28(3) register of information on ICT third-party arrangements and Art. 28(8) exit strategies for ICT services supporting critical or important functions. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng#art_28 (verified: primary)
[38] Directive (EU) 2022/2555 (NIS2), Art. 21(2)(c) business continuity, backup management, disaster recovery and crisis management, and (d) supply-chain security. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 19(1) (providers keep automatically generated logs for at least six months). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_19 (verified: primary)
[40] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 18(1) (providers keep documentation for 10 years after placing on the market or putting into service). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[41] AI Safety Governance Framework 3.0, §5.3 operators' guidelines (logs kept for at least six months and audited; voluntary). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[42] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[43] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33 (verified: primary)
[44] Regulation (EU) 2016/679 (GDPR), Art. 34(1) (communication of a breach likely to result in a high risk to the data subject without undue delay). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_34 (verified: primary)
[45] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 20(1) (providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_20 (verified: primary)
[46] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 79 (procedure for AI systems presenting a risk to health, safety or fundamental rights). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_79 (verified: primary)
