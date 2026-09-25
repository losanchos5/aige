---
lang: fr
source: bok/03-values-principles.md
sourceHash: "92d0c8a26a210d3b43d6f5a17ec0327d94ea1204a4b6e3b8a92ddb03e15e6dab"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 03. Valeurs et principes

> Les huit valeurs et six principes de la Thèse, chacun développé avec ce qu'il signifie en pratique
> et l'anti-modèle qu'il rejette.

La Thèse énonce huit valeurs et six principes en une ligne chacun. Ce chapitre les développe. Les
deux sont délibérément des types de choses différents, et la différence est ce qui les empêche
d'être la même liste racontée deux fois. Une **valeur** est une préférence : un compromis, ce vers
quoi nous penchons quand nous ne pouvons pas avoir les deux ; elle est énoncée comme une
affirmation, et nommer ce que nous construisons *vers* nomme aussi ce que nous construisons *loin
de*. Un **principe** est un engagement à *agir* : une règle de méthode, formulée comme quelque chose
que nous faisons, qui tient indépendamment de la préférence. Lisez les valeurs pour savoir de quel
côté pencher ; lisez les principes pour savoir quoi faire le lundi.

Pas toutes les valeurs sont nouvelles pour l'IA. La gouvernance en tant que code (1), les preuves
lisibles par machine (5) et la réduction mesurée du risque (7) sont héritées de l'ingénierie GRC, la
discipline mère. Les évaluations qui échouent la construction (2) et l'identité et la portée de
l'agent (4) sont ce que l'IA nous force à ajouter ; le modèle qui doit être testé et l'acteur
autonome qui doit être borné n'ont pas d'analogue dans la GRC classique.

Ce sont les valeurs et les principes propres du livre. Les ensembles de principes publiés par
d'autres sont traités ailleurs : le chapitre 11 trace
[les ensembles de principes d'IA responsable publiés aux artefacts](/bok/ai-defined#responsible-ai-principle-sets-engineered),
et le chapitre 22 a les
[principes de l'OCDE sur l'IA mappés au stack](/bok/principles-and-standards#the-five-principles-and-five-recommendations).

---

## Les huit valeurs

Chaque valeur est énoncée comme une affirmation : ce que nous construisons vers, ce qui en le
nommant nomme aussi ce que nous construisons loin de. La forme valeurs-et-principes suit le
Manifeste d'ingénierie GRC qui est le précédent de ce livre [1].

### 1. La gouvernance est du code, pas un document

Une politique dans un PDF est une déclaration d'intention qu'un humain doit lire, mémoriser et
appliquer. Une politique en tant que code est un contrôle qui s'exécute : elle évalue une demande de
tirage, un déploiement ou un appel d'exécution et retourne une décision. Le document décrit la règle
; le code *est* la règle, versionnée dans un référentiel, testée et appliquée sans que quiconque ait
besoin de s'en souvenir. Quand la règle change, vous changez un artefact et chaque point
d'application se met à jour. Quand un auditeur demande quelle était la politique à une date donnée,
vous montrez le commit.

Ce n'est pas « supprimer tous les documents ». Une politique a toujours besoin d'une déclaration
lisible par l'humain expliquant pourquoi elle existe. La valeur réside dans le fait que la version
faisant autorité et exécutée est celle qui est exécutable, et la prose en est la documentation, non
l'inverse.

> **En pratique** Une règle de résidence des données écrite en `OPA/Rego` bloque tout déploiement
> qui acheminerait l'inférence en dehors de la région autorisée, en CI et à l'admission. La même
> règle, en PDF, était « communiquée » trimestriellement et violée mensuellement.
> **Anti-patron** La « bibliothèque de politiques » qui est un dossier de documents Word que
> personne ne peut interroger, dont l'application est un e-mail et dont la conformité est
> auto-attestée.

### 2. Les évaluations échouent les builds ; les examens ne font que recommander

Un examen produit une recommandation ; quelqu'un peut agir dessus, plus tard, ou non. Une évaluation
produit un verdict avec des conséquences : le modèle ou l'agent a réussi ou échoué un test défini,
et un échec bloque la mise en production. Dans les systèmes d'IA, le contrôle le plus honnête est un
test que le système doit réussir, exécuté automatiquement, dont le résultat change ce qui se passe
ensuite. Nous préférons les contrôles qui mordent.

Un examen a toujours sa place : pour les questions qu'aucun test ne peut résoudre. Mais quand une
propriété *peut* être testée (un seuil de résistance au jailbreak, une limite de fuite de PII, une
vérification de portée d'outil), la transformer en examen au lieu d'une porte d'évaluation est un
choix pour pouvoir recommander mais non arrêter.

> **En pratique** Une suite d'évaluation red-team (Inspect, Garak) s'exécute en CI ; si la
> résistance à l'injection tombe en dessous du seuil convenu, le pipeline échoue et la mise en
> production ne se fait pas jusqu'à ce qu'elle soit corrigée.
> **Anti-patron** Un « comité d'examen des risques de modèle » qui se réunit mensuellement, rédige
> des conclusions évaluées faible/moyen/élevé, et n'a aucun mécanisme pour arrêter un lancement déjà
> programmé.

### 3. La preuve provient du runtime, non d'une attestation ponctuelle

Une attestation dit qu'un contrôle était en place quand quelqu'un a regardé. La preuve du runtime
montre le contrôle fonctionnant continuellement, à partir du système lui-même. Les systèmes d'IA
changent entre les examens (un modèle est réentraîné, un agent gagne un outil), donc la preuve
collectée une fois se dégrade immédiatement. Nous préférons la preuve émise au fur et à mesure que
le système s'exécute, de sorte que « le contrôle fonctionne-t-il ? » est répondu par la télémétrie
en direct, non par une signature datée du trimestre dernier.

> **En pratique** Les décisions de guardrail, les résultats d'évaluation et les verdicts de
> politique s'écoulent dans un magasin d'assurance avec des horodatages ; le statut du contrôle est
> une requête en direct, non une approbation annuelle.
> **Anti-patron** Un classeur d'attestation de style SOC assemblé la semaine avant un audit,
> décrivant les contrôles tels qu'on les imaginait, non tels que la production s'est réellement
> comportée.

### 4. Chaque agent porte sa propre identité et sa propre portée

Un agent agissant sur un compte de service partagé ou une clé statique est ingouvernable : vous ne
pouvez pas attribuer ses actions, révoquer son accès précisément, ou limiter ce qu'il peut faire.
Nous préférons que chaque acteur non humain ait sa propre identité, un propriétaire et une portée
d'actions autorisées, établies *avant* qu'il ne soit autorisé à agir. L'identité est la précondition
de la responsabilité ; la portée est la précondition du confinement. Le chapitre 23 construit les
deux pour les agents, en commençant par
[l'identité et les credentials de courte durée](/bok/governing-agents#identity-and-short-lived-credentials).

> **En pratique** Chaque agent reçoit une identité de charge de travail distincte, enregistrée avec
> un propriétaire et une portée déclarée ; un agent qui se comporte mal est tracé à son identité et
> son accès est révoqué sans toucher aux autres.
> **Anti-patron** Une flotte d'agents partageant une clé API et un compte de service privilégié, où
> un incident signifie faire tourner un secret et tout casser, et l'attribution est impossible.

### 5. La preuve est lisible par machine ou ce n'est pas une preuve

La preuve qu'un humain doit produire, formater et classer à la main ne s'adapte pas et ne peut pas
être vérifiée rapidement. La preuve lisible par machine (`OSCAL`, résultats d'évaluation structurés,
journaux signés) peut être interrogée, comparée, agrégée et vérifiée automatiquement. Nous préférons
la preuve qu'une machine peut lire, car l'audit devient alors une requête et la même preuve alimente
l'assurance continue plutôt qu'un classeur ponctuel.

> **En pratique** Les résultats de contrôle sont émis en tant qu'artefacts de composant `OSCAL` et
> d'évaluation ; la question d'un auditeur est répondue en exécutant une requête sur le magasin de
> preuves.
> **Anti-patron** Un lecteur partagé de captures d'écran et de feuilles de calcul exportées,
> recollectées de zéro pour chaque audit, invérifiables et obsolètes au moment où elles sont
> enregistrées.

### 6. L'outillage doit être inspectable et composable

Le point n'est pas qui a construit l'outil ou s'il est open source ; c'est si vous pouvez regarder à
l'intérieur. Vous ne pouvez pas faire confiance à un verdict que vous ne pouvez pas tracer.
L'outillage inspectable vous permet de suivre une décision jusqu'à la règle qui l'a produite,
l'entrée qu'elle a vue et la preuve qu'elle a émise ; l'outillage composable vous permet de câbler
cette décision dans votre propre pipeline plutôt que d'exporter dans celui de quelqu'un d'autre.
Nous préférons l'outillage dont nous pouvons ouvrir le raisonnement et le chemin des données, acheté
ou construit, car la gouvernance que vous ne pouvez pas regarder à l'intérieur est un contrôle
auquel vous ne pouvez pas faire confiance. Une comparaison d'un fournisseur de la catégorie de
plateforme de gouvernance de l'IA, publiée par un concurrent dedans, constate que la plupart de la
catégorie « gère le programme (inventaires, évaluations, mappages de cadres, flux de travail de
preuves) sans aucun chemin de données runtime » [3] ; où cela tient, l'objection n'est pas que
l'outillage est commercial mais que son verdict ne peut pas être audité.

C'est une inclinaison, non une absolue. Les outils fermés et commerciaux ont une place, y compris
les plateformes capables. Mais la valeur par défaut est l'outillage que l'équipe peut inspecter et
composer, plutôt qu'une boîte noire sur laquelle l'équipe doit se fier.

> **En pratique** Le harnais d'évaluation, la bibliothèque de politiques et le registre exposent
> comment un verdict est atteint (la règle, l'entrée et la preuve émise) et se composent dans le
> pipeline que l'équipe exécute déjà, que les composants soient open-source ou une plateforme avec
> un chemin de données ouvert.
> **Anti-patron** Une plateforme de gouvernance à six chiffres dont le « score de conformité » ne
> peut pas être tracé à un seul contrôle en cours d'exécution, et dont le chemin des données
> s'arrête à l'importation de feuille de calcul.

### 7. Le succès est mesuré par la réduction effective du risque, non par la couverture du cadre

Mapper chaque contrôle à NIST AI RMF et ISO 42001 prouve que vous avez lu les cadres ; cela ne
prouve pas que le risque a baissé. Nous préférons mesurer la chose elle-même : le taux du mode de
défaillance a-t-il baissé, le rayon d'explosion a-t-il diminué, l'incident a-t-il été détecté plus
tôt ? La couverture est une entrée ; la réduction effective du risque est le résultat. Une matrice
de mapping verte sur un contrôle cassé est du théâtre avec des étapes supplémentaires [2].

> **En pratique** Chaque contrôle déclare le mode de défaillance qu'il adresse et une métrique pour
> lui (taux de succès d'injection, temps de détection, appels d'outil non autorisés bloqués) ; le
> contrôle est jugé par la métrique qui bouge, non par la cellule du cadre qui devient verte.
> **Anti-patron** Une matrice de traçabilité de 300 lignes mappant les contrôles à cinq cadres,
> présentée comme maturité, sans mesure du fait que l'un des contrôles mappés réduit réellement le
> risque.

### 8. La gouvernance est possédée avec l'ingénierie, non appliquée de l'extérieur

La gouvernance qui s'assoit à part et accorde ou refuse le passage est un goulot d'étranglement que
les ingénieurs contournent. La gouvernance possédée conjointement avec l'ingénierie, intégrée au
chemin pavé, adoptée parce que c'est le moyen le plus facile de livrer, devient partie de la façon
dont les choses sont faites. Nous préférons la propriété partagée : la fonction de gouvernance
construit l'outillage, l'ingénierie construit dessus, et la porte est une étape dans un pipeline que
les deux possèdent, non une réunion qu'un côté redoute. Le chapitre 12 décrit la
[culture de gouvernance](/bok/governance-program#governance-culture) dont dépend la propriété
partagée.

> **En pratique** La porte d'évaluation et les vérifications de politique sont livrées dans le cadre
> du modèle de pipeline standard ; les ingénieurs les adoptent parce que le chemin pavé est aussi le
> chemin le plus rapide, et la gouvernance les co-maintient.
> **Anti-patron** Une équipe de gouvernance qui examine et approuve les mises en production de
> l'extérieur, mesurée par le nombre qu'elle arrête, tandis que l'ingénierie construit un processus
> fantôme pour l'éviter.

**Nous utilisons toujours les pratiques que chaque valeur construit loin de ; nous construisons vers l'affirmation.**

---

## Les six principes

### Construire le contrôle au point le plus précoce où il peut bloquer

Mettez chaque contrôle où il peut toujours arrêter la chose qui va mal, et pas plus tard. Le point
le plus précoce où un risque peut être détecté est le moins cher à corriger et le plus fort endroit
pour appliquer : le détecter dans le référentiel bat le détecter en production, ce qui bat
l'expliquer à un régulateur. Donc un contrôle est situé à la première porte qui peut refuser le
changement : une politique en CI, une évaluation avant le déploiement, une vérification d'identité à
l'admission, un guardrail au point d'action. L'engagement concerne le *placement* : quel que soit le
contrôle, il appartient au point exécutoire le plus précoce, non boulonné à la fin.

> **En pratique** Un nouvel agent ne peut pas être déployé jusqu'à ce qu'il ait enregistré un
> propriétaire et une portée et réussi sa porte d'évaluation ; le pipeline applique cela à la
> première porte qui peut le refuser, non une personne à la fin.
> **Anti-patron** Un « examen de gouvernance » pré-lancement qui se produit après que le système
> soit construit, ne change rien à la façon dont il a été construit, et ne peut que retarder ou
> valider.

### Donner à chaque contrôle des dents

Un contrôle doit être capable de changer ce qui se passe ensuite : bloquer une fusion, échouer un
déploiement, révoquer l'accès. Tout ce qui ne peut qu'informer un comité est un *signal*, et nous le
disons plutôt que de le déguiser en contrôle. C'est l'engagement qui transforme une évaluation de la
recherche en une porte, une politique d'un PDF en une vérification, un seuil d'un numéro de tableau
de bord en un bloqueur de mise en production. Quand une propriété peut être testée, la transformer
en examen au lieu d'une porte est un choix pour pouvoir recommander mais non arrêter, et nous
faisons ce choix consciemment ou pas du tout.

Les dents ne sont pas tout l'animal. Une porte qui peut échouer la construction est nécessaire et
non suffisante : une évaluation est ponctuelle et limitée par l'échantillonnage, elle peut être
truquée en accordant le modèle à la suite ou le seuil au modèle, et elle détecte les régressions par
rapport aux cas connus, non l'attaque nouvelle que la suite n'a jamais imaginée. Donc un contrôle
avec des dents porte ses propres obligations (sa couverture mesurée, ses cas maintenus de manière
adversariale, ses seuils tracés aux modes de défaillance nommés), et une porte réussie *oblige* la
surveillance du runtime de la couche 04, elle ne la remplace pas. Une porte verte traitée comme
preuve de sécurité est du théâtre de cadre avec un pipeline plus rapide.

> **En pratique** Les évaluations de capacité et adversariales sont versionnées aux côtés du modèle
> ; le déploiement dépend de la réussite du travail d'évaluation, sa couverture est suivie comme sa
> propre métrique, et un guardrail runtime porte le même seuil en production contre les entrées
> qu'aucune évaluation n'a échantillonnées.
> **Anti-patron** Une exécution d'évaluation de modèle ponctuelle avant le lancement, ses résultats
> collés dans une diapositive, jamais réexécutée quand le modèle ou ses prompts changent ; ou une
> porte dont le seuil est discrètement abaissé jusqu'à ce que la construction devienne verte.

### Enregistrer et limiter chaque acteur avant qu'il n'agisse

Rien, humain ou non humain, n'agit tant qu'il n'a pas de propriétaire, un périmètre déclaré et un
moyen d'être arrêté. L'autonomie sur des identifiants partagés est ingouvernable par construction :
vous ne pouvez pas attribuer, contenir ou révoquer ce que vous ne pouvez pas tracer jusqu'à un
acteur. L'enregistrement est donc une condition préalable, non un suivi : chaque acteur est inscrit,
délimité en périmètre et doté d'un kill switch *avant* d'agir de manière autonome. L'autonomie
s'acquiert en étant gouvernable, non accordée par défaut.

> **En pratique** Le agent registry est la porte : un agent sans propriétaire, sans périmètre ou
> sans kill switch se voit refuser une identité de charge de travail et ne peut pas atteindre la
> production.
> **Anti-patron** Des agents lancés ad hoc sur une clé partagée, découverts seulement après que l'un
> d'eux effectue une action que personne ne peut expliquer ou annuler.

### Instrumenter la construction pour produire sa propre preuve

Connectez chaque contrôle pour émettre son propre enregistrement lors de son exécution, de sorte que
l'assurance découle du système au lieu d'être assemblée manuellement avant un audit. Si démontrer un
contrôle nécessite une capture d'écran, nous n'avons pas terminé sa construction. L'engagement porte
sur l'instrumentation : chaque gate, guardrail et vérification écrit un enregistrement structuré et
signé lors de son déclenchement, de sorte que l'audit est une requête et les mêmes enregistrements
pilotent l'assurance continue et la réponse aux incidents (le chapitre 17 spécifie
[l'enregistrement d'incident](/bok/incidents#the-incident-record)).

> **En pratique** Chaque gate et guardrail écrit un enregistrement structuré et signé ; la piste
> d'audit se construit d'elle-même, et le magasin de preuves répond à la fois à l'auditeur et à
> l'ingénieur d'astreinte.
> **Anti-patron** Un sprint de collecte de preuves avant chaque audit, recréant après coup un
> enregistrement que les systèmes n'ont jamais réellement produit.

### Commencer par un mode de défaillance nommé ou un préjudice nommé

Concevez chaque contrôle contre une façon spécifique dont le système échoue ou un préjudice
spécifique qu'il peut causer à une personne, et commencez par là, non par une liste de contrôle de
framework. Les modèles de menace (injection de prompt, mauvaise utilisation d'outils, abus
d'identité d'agent, exfiltration de données) et
[les analyses d'impact sur les droits fondamentaux](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27)
sont les entrées de la conception, non du travail administratif produit après coup. Si nous ne
pouvons pas nommer le risque auquel répond un contrôle, nous ne le construisons pas. Le chapitre 13
montre comment
[identifier les sources de risque, les facteurs et les parties prenantes](/bok/risk-management#identifying-risk-sources-factors-and-stakeholders),
et [l'atlas des préjudices](/resources/harms) énumère les préjudices par niveau, chacun avec le
contrôle qui le détecte.

> **En pratique** La conception de l'agent part de son modèle de menace Agentic OWASP [4] et de son
> FRIA ; les contrôles qui sont livrés sont exactement ceux que ces deux documents exigeaient, et
> ils s'y rapportent.
> **Anti-patron** Un catalogue de contrôles assemblé à partir d'une liste de contrôle de framework,
> traitant des risques que le système n'a pas tout en manquant le chemin d'injection qu'un attaquant
> utilise réellement.

### Rendre le chemin gouverné le plus facile

Livrez la gouvernance comme des outils, des modèles et des chemins pavés que les ingénieurs adoptent
sans demander la permission (une bibliothèque de politiques, un registre avec une API, une gate
qu'ils peuvent exécuter localement avant de pousser), et mesurez l'adoption. Les personnes
gouvernées sont nos utilisateurs ; le chemin pavé doit être le chemin le plus rapide ou il sera
contourné. Si utiliser la gouvernance est plus difficile que de l'éviter, la gouvernance est mal
conçue, et nous corrigeons le produit, pas les personnes.

> **En pratique** Un ingénieur structure un nouveau service d'IA à partir d'un modèle qui inclut
> déjà le hook du registre, les vérifications de politique et la gate d'évaluation ; la conformité
> est le défaut, non une demande.
> **Anti-patron** Un intranet de gouvernance de formulaires et de files d'attente de tickets, où
> faire la bonne chose prend une semaine et une réunion, de sorte que les équipes font
> tranquillement la chose rapide à la place.

**Correspondances :** les valeurs et principes sont réalisés par le stack à cinq couches
(chapitre 04) et le catalogue de patterns (chapitre 05) ; les modes de défaillance qu'ils ciblent
sont le Top 10 OWASP pour les applications Agentic ; l'assurance qu'ils exigent correspond aux
articles 9, 15, 55 et 72 de l'ISO/IEC 42001, du NIST AI RMF et du Règlement de l'IA de l'UE. Les
correspondances sont illustratives, non une affirmation de conformité.

## Sources

[1] GRC Engineering Manifesto (values and principles precedent). grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[4] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
