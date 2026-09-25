---
lang: fr
source: bok/04-the-stack.md
sourceHash: "70613b3c9beac9bd4322bd76445b643bbf981c8dc8701bbc0ac1f82996da262e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 04. Le stack (cinq couches)

> L'architecture de référence de l'ingénierie de la gouvernance de l'IA : cinq couches qui répondent
> aux trois questions, où la preuve est produite en bas et prouvée en haut.

## Comment lire le stack

Le stack n'est pas un organigramme et non une échelle de maturité. C'est un ordre de construction.
Chaque couche produit un artefact que la couche au-dessus consomme, de sorte que la gouvernance
cesse d'être un ensemble de documents parallèles et devient un système unique avec un chemin de
données de la politique à la preuve.

Lisez-le le long d'une colonne vertébrale :
**Politique → Inventaire → Évaluations → Runtime → Assurance**. Vous écrivez la règle en tant que
code (couche 01). Vous ne pouvez pas appliquer une règle contre un système que vous ne pouvez pas
voir, donc vous inventoriez ce qui s'exécute (couche 02). Vous ne pouvez pas affirmer qu'un système
respecte la règle sans un test qui peut échouer, donc vous exécutez des évaluations comme preuves
(couche 03). Les règles et les tests se dégradent au moment où le système change, donc vous
maintenez la ligne au runtime (couche 04). Et rien de tout cela ne vaut rien pour un auditeur à
moins que la preuve soit émise, signée et interrogeable, donc vous terminez par l'assurance continue
(couche 05).

**La preuve remonte.** Un verdict de politique de la couche 01, une entrée de registre de la couche
02, un résultat d'évaluation de la couche 03 et une décision de guardrail de la couche 04 ne sont
pas quatre enregistrements déconnectés. Chacun est un artefact structuré avec un horodatage et un
propriétaire, et la couche 05 est l'endroit où ils sont agrégés en preuves prêtes pour l'audit. Le
test de tout le stack est le test de la Thèse : comme le dit Ayoub Fandi, un tableau de bord vert
sur un contrôle cassé est du « théâtre avec des étapes supplémentaires » [1]. Le stack est la
tuyauterie qui donne un sens au tableau de bord : chaque cellule verte remonte à un contrôle en
cours d'exécution et à la preuve qu'il a émise.

Les cinq couches, nommées exactement et dans l'ordre, sont :
**01 Gouvernance en tant que code · 02 Inventaire et transparence · 03 Évaluations et red teaming comme preuves · 04 Contrôles runtime et observabilité · 05 Assurance et conformité continue.**
Elles correspondent aux trois questions que la discipline doit répondre à tout moment. La couche 02
répond à *quel IA s'exécute*. Les couches 01 et 04 répondent à *ce qu'il est autorisé à faire* : la
couche 01 écrit la limite en tant que code et la couche 04 l'applique sur l'appel en direct, sous
l'identité et le périmètre propres de l'agent. Les couches 03 et 05 répondent à *quelle preuve le
prouve*. Les menaces contre lesquelles les contrôles sont construits (détournement d'objectif,
mauvaise utilisation d'outils, abus d'identité et de privilèges d'agent, agents voyous) sont
cataloguées dans le Top 10 OWASP pour les applications Agentic 2026 [2].

Trois de ces couches sont héritées, non inventées. Gouvernance en tant que code (01), Inventaire et
transparence (02) et Assurance et conformité continue (05) proviennent presque inchangées de
l'ingénierie GRC : la politique en tant que code, l'inventaire des actifs et la preuve lisible par
machine sont sa pratique établie, et les enregistrements spécifiques à l'IA (le agent registry,
l'AIBOM) les étendent plutôt que de les remplacer. Les couches 03 et 04 (les évaluations et le red
teaming comme contrôles, et l'identité d'agent et le contrôle runtime) sont ce que l'IA force la
discipline à ajouter, car un modèle dont le comportement doit être testé et un acteur autonome qui
agit sous autorité déléguée n'ont pas d'analogue dans le GRC classique. Le nouveau travail se
concentre là ; le reste est une spécialisation d'une méthode qui fonctionne déjà.

Chaque outil nommé ci-dessous est un exemple d'une catégorie, non une recommandation. Les catégories
sont la substance ; les marques sont illustratives et interchangeables.

## Couche 01 : Gouvernance en tant que code

**Ce qu'elle prouve.** Qu'une règle de gouvernance existe en tant qu'artefact exécutable, non un
paragraphe, et qu'elle a évalué un changement spécifique et retourné une décision. La preuve est un
verdict de politique lié à un commit, une pull request ou un déploiement, lisible par machine et
reproductible.

**Les artefacts.** Un ingénieur de gouvernance de l'IA livre la politique en tant que code : des
règles écrites dans un langage de politique qu'un pipeline évalue. Les artefacts typiques sont une
bibliothèque de politiques sous contrôle de version, un ensemble de correspondances qui mappent
chaque politique aux frameworks qu'elle sert, et le câblage CI/CD qui exécute la politique à la
bonne gate. Une politique dans cette couche est petite et testable : « l'inférence pour cette classe
de données ne peut pas router en dehors de la région autorisée », « aucun déploiement de modèle sans
propriétaire enregistré et gate d'évaluation réussie », « un agent ne peut pas se voir accorder un
périmètre d'outil qu'il n'a pas déclaré ». Chaque règle porte une déclaration d'intention lisible
par l'homme comme documentation, mais la version appliquée est le code.

**Outils et normes de référence (illustratifs).** Les moteurs de politique expriment la logique
allow/deny. `OPA/Rego` est la valeur par défaut générale pour la politique non-autorisation
(résidence des données, gating de déploiement, contraintes de configuration), tandis que `Cedar` est
plus étroit : un langage d'autorisation, le plus fort pour « ce principal peut-il prendre cette
action sur cette ressource ? » et un mauvais ajustement pour la politique qui n'est pas une décision
d'accès. Choisissez selon la forme de la règle, non la marque. Au-delà des moteurs à usage général,
une approche proposée est Policy Cards : une proposition de recherche pour un artefact lisible par
machine au niveau du déploiement qui encode les contraintes opérationnelles, réglementaires et
éthiques pour un agent et les lie aux pipelines d'application et d'audit [3] ; c'est un seul
preprint, prometteur mais pas encore une norme, et le point qu'il soulève, que la règle doit voyager
avec l'agent en tant que données, se maintient quel que soit le format qui gagne. Les
correspondances référencent les frameworks eux-mêmes : ISO/IEC 42001 (le système de gestion de
l'IA), NIST AI RMF et ses quatre fonctions (Govern, Map, Measure, Manage [4]), le Règlement de l'IA
de l'UE, et la matrice de contrôles IA CSA (AICM) v1.1, qui offre 247 objectifs de contrôle sur 18
domaines comme vocabulaire de contrôle pour mapper [5]. Les fournisseurs sont illustratifs ; les
normes ne le sont pas.

**Définition de fait.**

- Chaque politique existe en tant que code dans un référentiel, avec un test qui prouve qu'elle se
  déclenche sur une entrée violante et réussit une entrée propre.
- Chaque politique déclare les clauses de framework auxquelles elle correspond, de sorte que la
  correspondance est générée à partir du code, non maintenue à côté.
- Au moins une politique s'exécute avant la fusion et bloque la fusion en cas d'échec ; au moins une
  s'exécute au déploiement ou à l'admission et bloque la version.
- Un changement de politique est un diff examinable avec un propriétaire et une date d'entrée en
  vigueur.
- Le moteur de politique émet un verdict structuré (allow/deny, id de règle, hash d'entrée,
  horodatage) pour chaque évaluation.

**Anti-patterns.**

- La « bibliothèque de politiques » qui est un dossier de documents Word que personne ne peut
  interroger, appliquée par e-mail et auto-attestée dans une feuille de calcul.
- La correspondance maintenue comme une matrice de 300 lignes dans un outil séparé, dérivant des
  politiques qu'elle prétend décrire : la couverture présentée comme contrôle.

**Preuve pour la couche suivante.** Le verdict de politique est le premier artefact de preuve. Mais
un verdict n'a de sens que contre un objet connu : « refuser le déploiement du modèle X » présume
que le stack sait que le modèle X existe, qui le possède et ce qu'il est. Cet objet est ce que la
couche 02 fournit.

> **En pratique** Pour `csa-01`, un assistant de service client dans un grand opérateur télécom, une
> règle de résidence des données écrite en `OPA/Rego` s'exécutait à la fois en CI et à l'admission
> et bloquait tout déploiement acheminant son inférence en dehors de la région autorisée. La valeur
> n'était pas la règle elle-même, mais que la version appliquée émettait un verdict que chaque
> ingénieur pouvait voir avant la fusion.

**Correspondances :** EU AI Act Art. 9 (gestion des risques) · ISO/IEC 42001 · NIST AI RMF (Govern)
· CSA AICM · OWASP Agentic ASI02/ASI03. Les correspondances sont illustratives, non une déclaration
de conformité.

## Couche 02 : Inventory & Transparency

**Ce qu'elle prouve.** Que l'organisation sait quel système d'IA est en cours d'exécution (quels
modèles, systèmes et agents sont actifs, dans quelle version, possédés par qui), et que chacun
dispose de la documentation de transparence qu'une obligation exige. La preuve est une entrée de
registre et ses documents joints, idéalement écrits par un pipeline de déploiement plutôt que saisis
manuellement.

**Les artefacts.** L'artefact principal est le **registre des agents** : l'inventaire conscient du
runtime de chaque modèle, service et agent, chacun avec un propriétaire, une portée et un statut.
Autour de lui se trouvent les documents de transparence (fiches de modèle et fiches de données) et
l'**AIBOM**, la nomenclature des matériaux pour un système d'IA. Les références FRIA et DPIA sont
attachées à l'entrée du registre pour les systèmes qui en ont besoin, de sorte que l'inventaire est
aussi l'index de quel système a quelle évaluation d'impact.

**Outils et normes de référence (illustratifs).** Les registres vont des suites ITSM et de
gouvernance (par exemple ServiceNow, Credo AI) aux outils de découverte d'agents (par exemple
Zenity) qui trouvent l'IA que l'inventaire ne connaissait pas. L'AIBOM a des formats standards :
CycloneDX ML-BOM et le profil IA SPDX 3.0, le générateur OWASP AIBOM produisant une sortie CycloneDX
[6]. La distinction par rapport à un SBOM classique importe : un AIBOM enregistre les modèles, les
ensembles de données, les poids et leur provenance, pas seulement les dépendances logicielles. Le
registre est l'objet que les politiques de la couche 01 évaluent et que les contrôles runtime de la
couche 04 attachent ; sans un chemin de données runtime l'alimentant, c'est une feuille de calcul
qui était exacte le jour où elle a été modifiée.

**Définition de fait.**

- Chaque modèle, système et agent en production a une entrée de registre avec un propriétaire, une
  version et une portée déclarée ; un artefact non enregistré ne peut pas atteindre la production.
- Le registre est alimenté par le pipeline de déploiement, non par une saisie manuelle ; un nouveau
  déploiement s'enregistre lui-même.
- Chaque système à haut risque est lié à sa fiche de modèle, sa fiche de données et, si nécessaire,
  son FRIA/DPIA.
- Un AIBOM est généré à la compilation pour chaque système d'IA et stocké avec l'entrée du registre.
- Un mécanisme de découverte réconcilie périodiquement le registre par rapport à ce qui s'exécute
  réellement et signale la dérive.

**Anti-patterns.**

- L'inventaire de modèles maintenu manuellement qui répond correctement à « qu'est-ce qui s'exécute
  ? » le jour où il est modifié et qui est faux une semaine plus tard.
- Les documents de transparence écrits une fois au lancement et jamais régénérés quand le modèle, le
  prompt ou l'ensemble de données change : une fiche de modèle décrivant un modèle qui n'existe
  plus.

**Preuve pour la couche suivante.** L'entrée du registre nomme l'objet testé. Une évaluation en
couche 03 s'exécute *contre une version enregistrée* et son résultat est classé *contre cette
entrée*, de sorte que la question « ce modèle a-t-il été testé ? » est répondue par une jointure,
pas une recherche. L'AIBOM indique à la couche d'évaluation ce qu'il faut tester : quel modèle,
quels ensembles de données, quelles revendications de provenance ont besoin de sondage adversarial.

> **En pratique** Connecter le registre au pipeline de déploiement (de sorte que `csa-01`
> s'enregistrait lui-même, avec un propriétaire et une portée, au moment du déploiement) a
> transformé « documenté » en « gouverné ». Son entrée de registre est devenue une requête répondue
> depuis la production, pas depuis une diapositive.

**Correspondances :** EU AI Act Art. 11 (documentation technique), Art. 49/71 (enregistrement et
base de données de l'UE), Art. 50 (transparence) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM ·
OWASP Agentic ASI10.

## Couche 03 : Evals & Red Teaming as Evidence

**Ce qu'elle prouve.** Que le modèle ou l'agent a réussi un test défini dont l'échec a des
conséquences. C'est la couche où le principe « donner des dents à chaque contrôle » devient concret
pour les évaluations : un benchmark qui informe seulement un comité n'est pas un contrôle ; une
évaluation câblée dans une **eval gate** qui peut faire échouer la compilation l'est. La preuve est
un résultat d'évaluation structuré : réussite ou échec par rapport à un seuil, versionné aux côtés
du modèle qu'il a testé.

**Les artefacts.** Un ingénieur expédie des suites d'évaluation et la gate qui les exécute. Trois
familles reviennent : les évaluations de capacité et de qualité (le système fait-il son travail :
pertinence, régression par rapport à un ensemble de référence), les évaluations adversariales et de
red-team (résiste-t-il aux jailbreaks, à l'injection de prompts, à l'utilisation abusive d'outils),
et les évaluations de seuil de sécurité liées à une politique de la couche 01 (une limite de fuite
de PII, un plancher de résistance à l'injection). La gate est une étape du pipeline : si
l'évaluation tombe en dessous du seuil convenu, le pipeline échoue et la version ne s'expédie pas.

**Outils et normes de référence (illustratifs).** Les cadres d'évaluation tels que Inspect (maintenu
au nom du UK AI Security Institute [7]), promptfoo et DeepEval exécutent des suites de capacité et
de régression ; Garak, Mindgard et Giskard exécutent des sondes adversariales et de vulnérabilité ;
Ragas couvre la qualité de la récupération augmentée. Les tests adversariaux ne sont pas seulement
une bonne pratique : le Code de pratique GPAI énumère les tests adversariaux et le red-teaming parmi
les approches d'évaluation attendues des modèles GPAI à risque systémique, bien que le Code soit
volontaire et limité à ces modèles [8]. Le résultat de l'évaluation est l'artefact de preuve que la
couche 05 agrégera, c'est pourquoi il doit être lisible par machine, pas une capture d'écran collée
dans une diapositive.

**Définition de fait.**

- Chaque modèle ou agent a une suite d'évaluation versionnée dans le même référentiel et mise à jour
  quand le système change.
- Au moins une évaluation adversariale et une évaluation de capacité s'exécutent en CI, avec un
  seuil documenté.
- Une évaluation défaillante bloque le déploiement ; la gate a des dents, pas seulement un rapport.
- Chaque exécution d'évaluation émet un résultat structuré (id de suite, version de modèle, score,
  seuil, réussite/échec, horodatage) classé contre l'entrée du registre.
- Les seuils remontent à un mode de défaillance ou une obligation nommée, pas à un nombre rond
  choisi pour le confort, et la certitude qu'ils exigent suit le niveau de risque (le chapitre 11
  définit la
  [certitude requise par niveau de risque](/bok/ai-defined#certainty-required-by-risk-tier) ; le
  chapitre 14 dimensionne la suite pour la
  [validité statistique des évaluations](/bok/governing-development#statistical-validity-of-evals)).

**Anti-patterns.**

- L'évaluation unique avant le lancement dont les résultats sont collés dans une diapositive et
  jamais réexécutés quand le modèle ou ses prompts changent.
- Le « comité d'examen des risques » qui évalue les résultats bas/moyen/haut mensuellement mais n'a
  aucun mécanisme pour arrêter un lancement déjà programmé : recommandation sans conséquence. La
  correction est un comité qui décide quel code ne peut pas tandis que les gates appliquent la
  décision
  ([le comité décide, les gates appliquent](/bok/governance-program#the-committee-decides-the-gates-enforce),
  chapitre 12), avec l'appétit pour le risque
  [compilé dans les gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates)
  (chapitre 13).

**Preuve pour la couche suivante.** Une évaluation prouve que le système était sûr *au moment du
test*. Le système rencontre alors des entrées qu'aucune évaluation n'a anticipées. La couche 04
porte les mêmes seuils en production en tant que garde-fous runtime, et le résultat de l'évaluation
devient la ligne de base contre laquelle la télémétrie en direct est comparée. Une baisse de la
résistance à l'injection en direct par rapport à la ligne de base testée est un signal, pas une
surprise.

> **En pratique** Une suite d'évaluation de red-team combinant Inspect et Garak s'exécutait en CI
> pour `csa-01` ; une version qui baissait sa résistance à l'injection en dessous du plancher
> convenu échouait le pipeline jusqu'à correction. La sortie de l'évaluation, pas l'opinion d'un
> examinateur, était la preuve d'assurance classée contre la version du modèle.

**Correspondances :** EU AI Act Art. 15 (exactitude, robustesse, cybersécurité), Art. 55 (évaluation
du risque systémique GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · CSA AICM · OWASP Agentic
ASI01/ASI02.

## Couche 04 : Runtime Controls & Observability

**Ce qu'elle prouve.** Que les contrôles tiennent pendant que le système agit, et que son
comportement est observé. Les politiques et les évaluations sont ponctuelles ; les agents agissent
continuellement, sur des entrées que personne n'a examinées. Cette couche prouve qu'un garde-fou a
médié un appel réel, qu'un agent a agi sous sa propre identité et portée, et qu'il existe un moyen
testé de l'arrêter. La preuve est un flux de décisions et de traces runtime.

**Les artefacts.** Trois groupes. Garde-fous : filtres d'entrée/sortie, médiation des appels
d'outils, le point d'application où une politique de la couche 01 s'exécute contre une requête en
direct. Observabilité : traçage et surveillance qui transforment le comportement de l'agent en
signal de contrôle. Identité runtime de l'agent : chaque acteur non humain avec sa propre identité
de charge de travail, une portée délimitée, et un **kill switch**, un moyen testé de révoquer
l'accès et d'arrêter un agent sans casser la flotte. Enregistrez et délimitez chaque acteur avant
qu'il n'agisse : aucun agent n'agit avant d'avoir une identité, un propriétaire et une portée. Un
**agent gardien**, un agent dont le travail est d'examiner, de contraindre ou d'arrêter d'autres
agents au runtime, est une façon de construire le point de médiation ; c'est lui-même un agent, donc
il a besoin de sa propre identité, portée et kill switch, et ses décisions sont des preuves comme
celles de tout autre garde-fou [16]. Le chapitre 23 traite
[la gouvernance des agents d'IA](/bok/governing-agents#what-makes-an-agent-a-governance-object) de
bout en bout, y compris
[l'identité, la délégation et l'autorisation MCP pour les agents](/bok/governing-agents#identity-and-short-lived-credentials).

**Outils et normes de référence (illustratif).** Les cadres de guardrail tels que NVIDIA NeMo
Guardrails, Meta LlamaFirewall et Lakera appliquent les politiques d'entrée/sortie et d'appel
d'outils ; les outils d'observabilité tels que Langfuse et Arize Phoenix s'appuient sur
OpenTelemetry pour tracer les exécutions d'agents. L'identité de l'agent pose deux questions
distinctes que les outils ne doivent pas confondre. La première est **l'authentification de canal**
: comment un client s'authentifie auprès d'un serveur d'outils sur un saut. La spécification Model
Context Protocol du 2026-07-28 a resserré exactement cela : en abandonnant l'enregistrement
dynamique des clients au profit des documents de métadonnées d'identifiant client et en liant les
identifiants à leur émetteur [9]. Cela renforce la connexion MCP ; ce n'est pas le modèle d'identité
de l'agent. La deuxième est **l'identité de charge de travail de l'agent** : une identité durable et
attribuable que l'agent porte à chaque saut, outil et protocole, sous laquelle ses actions sont
enregistrées et son accès révoqué. C'est le rôle d'un système d'identité de charge de travail, tel
que SPIFFE/SPIRE ou les identités d'agent de première classe des fournisseurs d'entreprise (par
exemple Microsoft Entra Agent ID, Okta Agent SSO), non de MCP, qui sécurise un canal. Confondre les
deux laisse un agent bien authentifié sur le saut MCP et toujours non attribuable partout ailleurs.
Le NCCoE du NIST a énoncé les questions ouvertes dans son document conceptuel de février 2026 sur
l'identité et l'autorisation des agents logiciels et d'IA : comment l'identification,
l'authentification et l'autorisation s'appliquent pour que chaque agent soit « connu, approuvé et
correctement gouverné », y compris la non-répudiation et l'enregistrement inviolable [10]. Gartner
s'attend à ce qu'en 2029 plus de la moitié des attaques réussies contre les agents d'IA exploitent
les faiblesses du contrôle d'accès et l'injection de prompts [11], les modes de défaillance que
cette couche existe pour contenir.

**Définition de fait.**

- Chaque agent s'exécute sous sa propre identité avec un périmètre déclaré ; aucun agent ne partage
  un compte de service ou une clé statique entre les fonctions.
- Un guardrail médiatise les appels d'outils et l'entrée/sortie pour chaque agent, en appliquant le
  périmètre déclaré dans le registre.
- Un kill switch existe et a été testé : révoquer l'accès d'un agent ne casse pas les autres.
- Chaque exécution d'agent est tracée, et les traces portent l'identité de l'agent, les outils
  appelés et les verdicts de politique qui se sont déclenchés.
- Les signaux d'exécution sont comparés à la ligne de base d'évaluation de la couche 03, et une
  régression déclenche une alerte.

**Anti-patterns.**

- Une flotte d'agents partageant une clé API et un compte de service privilégié : un incident
  signifie faire tourner un secret et casser tout, et l'attribution est impossible.
- Des guardrails qui enregistrent mais ne bloquent jamais : l'observabilité confondue avec le
  contrôle, donc le système se regarde échouer en haute résolution.

**Preuve pour la couche suivante.** Chaque décision de guardrail, trace et événement d'identité est
un enregistrement horodaté et structuré. La couche 05 ne recueille pas à nouveau cette preuve ; elle
s'y abonne. L'exécution est où l'assurance continue obtient sa continuité : la différence entre une
attestation qu'un contrôle existait et une preuve qu'il s'est déclenché, sur un appel spécifique, à
un moment spécifique.

> **En pratique** `csa-01` s'est vu attribuer une identité de charge de travail distincte avec un
> propriétaire et un périmètre déclaré, tout comme tous les autres agents de l'opérateur télécom ;
> quand il s'est mal comporté, il a été tracé jusqu'à son identité et révoqué sans toucher aux
> autres. Le kill switch a été testé selon un calendrier. Un kill switch non testé est une
> affirmation, pas un contrôle.

**Correspondances :** Règlement de l'IA Art. 14 (contrôle humain), Art. 15 (robustesse,
cybersécurité), Art. 12 (enregistrement) · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP
Agentic ASI02/ASI03/ASI10.

## Couche 05 : Assurance & Conformité Continue

**Ce qu'elle prouve.** Que les contrôles ci-dessous fonctionnent, continuellement, et que la preuve
est lisible par machine et prête pour l'audit. C'est là que la preuve cesse d'être un sous-produit
et devient le produit : l'audit est une requête, pas un projet. La preuve est un magasin d'assurance
en direct dans lequel n'importe quelle couche inférieure écrit et qu'un auditeur peut lire.

**Les artefacts.** Preuve lisible par machine dans un format standard ; mappages de cadre générés à
partir de cette preuve plutôt que maintenus à côté ; et la tuyauterie d'incident et de rapport qui
transforme un signal d'exécution en obligation respectée à l'heure. Le format organisateur est
`OSCAL`. Son substrat stable est le modèle natif du NIST : une couche de contrôle (`catalog`,
`profile`), une couche d'implémentation (`component-definition`, `system-security-plan`) et une
couche d'évaluation (`assessment-plan`, `assessment-results`, `POA&M`), avec traçabilité d'un
résultat d'évaluation au contrôle qu'il a testé [15]. Ce modèle est la partie sur laquelle
construire ; les ajouts spécifiques à l'IA au-dessus se forment toujours. Une approche proposée (une
seule prépublication de 2026, pas une norme) étend OSCAL avec seize extensions de propriété pour la
phase de cycle de vie, la sémantique d'application et la traçabilité des risques, dans une
architecture de conformité en tant que code à trois couches qui génère automatiquement les résultats
d'évaluation OSCAL [12]. Traitez-la comme une réponse précoce à un vrai vide que les auteurs nomment
bien : les cadres « tels que le Règlement de l'IA, ISO/IEC 42001 et NIST AI RMF spécifient quoi
assurer mais ne fournissent aucun format exécutable pour comment » [12]. Le vide est ce que la
couche 05 ferme ; les modèles d'évaluation OSCAL natifs ferment la plupart d'aujourd'hui, avec ou
sans les extensions.

**Outils et normes de référence (illustratif).** La preuve est émise sous forme d'artefacts de
composant et d'évaluation OSCAL ; les suites GRC et de gouvernance de l'IA (par exemple Vanta,
Drata, OneTrust ; watsonx.governance, Holistic AI, Saidot) l'agrègent et la présentent. La
déclaration d'incident correspond à l'Art. 73 du Règlement de l'IA (incidents graves) et à l'Art. 72
(acompagnement pós-comercialización). En date du 2026-09-24, aucune norme harmonisée n'est citée
dans le Journal officiel de l'UE [13], donc un certificat ISO/IEC 42001 soutient le système de
gestion de la qualité de l'Art. 17 mais ne le satisfait pas en lui-même, et ne confère aucune
présomption de conformité en vertu de l'Art. 40 [17].

**Définition de fait.**

- Les résultats de contrôle des couches 01–04 sont émis sous forme de preuve lisible par machine
  (par exemple OSCAL) avec horodatages et propriétaires, continuellement.
- Les mappages de cadre sont générés à partir de la preuve, donc une cellule de mappage qui devient
  verte pointe vers un contrôle qui s'est réellement déclenché.
- La question d'un auditeur reçoit une réponse par une requête contre le magasin de preuve, pas un
  sprint de collecte de preuve.
- Un pipeline d'incident grave peut détecter, trier et signaler à l'heure, avec les délais de l'Art.
  73 codés, pas mémorisés (le chapitre 17 parcourt
  [le cycle de vie de la réponse](/bok/incidents#the-response-lifecycle)).
- Le magasin d'assurance mesure la réduction effective du risque (le taux de défaillance, le temps
  de détection, le rayon d'explosion), pas la couverture du cadre.

**Anti-patterns.**

- Le classeur d'attestation assemblé la semaine avant un audit, décrivant les contrôles tels qu'ils
  étaient imaginés, pas comme la production s'est comportée.
- Un « score de conformité » d'une plateforme fermée qui ne peut pas être tracé à un seul contrôle
  en cours d'exécution, dont le chemin de données s'arrête à l'importation de feuille de calcul.

**La preuve ferme la boucle.** L'assurance n'est pas le sommet d'une échelle unidirectionnelle. Une
baisse d'une métrique en direct se répercute à la couche 03 en tant que nouvelle évaluation, à la
couche 01 en tant que politique resserrée, et à la couche 02 en tant que drapeau de registre. La
pile est une boucle qui se trouve être dessinée comme une échelle.

> **En pratique** Les décisions de guardrail, les résultats d'évaluation et les verdicts de
> politique de `csa-01` ont été diffusés en continu dans un magasin d'assurance avec horodatages,
> donc le statut d'un contrôle était une requête en direct, pas une approbation annuelle. Quand un
> auditeur a demandé ce que son contrôle de résidence des données faisait au deuxième trimestre, la
> réponse était un filtre sur la preuve émise, produit en minutes.

**Correspondances :** Règlement de l'IA Art. 17 (gestion de la qualité), Art. 72 (acompanhamento
pós-comercialización), Art. 73 (déclaration d'incident grave) · ISO/IEC 42001, ISO/IEC 42005 · NIST
AI RMF (Govern, Manage) · CSA AICM.

## Gouvernance des données dans la pile

Les cinq couches gouvernent les modèles et les agents ; elles ne sont aussi solides que les données
qui les sous-tendent, et la gouvernance des données n'est pas une couche mais un fil à travers les
cinq. Les données d'entraînement, les ensembles de mise au point, les corpus de récupération, les
prompts et les résultats portent chacun une base légale, une provenance, une limite de rétention et
un ensemble de droits, et chacun est un objet que la pile doit pouvoir nommer. Dans la couche 02,
c'est la **fiche de données** et l'enregistrement de lignée (d'où provient un ensemble de données, à
quoi il peut être utilisé, quand il doit être supprimé), attaché à l'entrée de registre à côté de la
fiche de modèle. Dans la couche 01, c'est la politique de rétention et de résidence en tant que
code, avec
[protection des données dès la conception et technologies améliorant la protection des données](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets)
(chapitre 19) où les données personnelles sont impliquées. Dans la couche 03, ce sont les tests de
qualité des données et de biais exécutés contre l'ensemble, non supposés, derrière une
[porte d'admission d'ensemble de données](/bok/governing-development#data-for-training-and-testing)
(chapitre 14) ; le chapitre 16 énonce
[les données dont vous avez besoin pour tester le biais](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
Le Règlement de l'IA de l'UE traite cela comme un devoir de première classe : l'article 10 exige des
ensembles de données représentatifs, pertinents et vérifiés pour les systèmes à haut risque, et
l'article 4a post-Omnibus donne une base légale étroite pour traiter les données de catégories
spéciales *pour la détection de biais*, sous réserve de pseudonymisation et de suppression une fois
le biais corrigé (voir chapitre 08). L'engagement d'ingénierie est qu'un corpus RAG est gouverné
comme un modèle : versionné, sa provenance et sa licence enregistrées dans l'AIBOM, son instantané
lié à l'évaluation qui a testé le système sur celui-ci, donc « qu'y avait-il dans le corpus quand
cette réponse a été produite ? » est une requête, pas une supposition. Les prompts, les passages
récupérés et les résultats au moment de l'exécution ont besoin des mêmes règles
([gouvernance des données au moment de l'inférence](/bok/governing-deployment#inference-time-data-governance),
chapitre 15). Les données sans fiche, sans lignée et sans règle de rétention sont l'objet non
gouverné qui rend chaque couche au-dessus improvable.

## Concevoir la supervision humaine (Article 14)

La supervision humaine est un contrôle à concevoir, non une assurance à affirmer. L'article 14 du
règlement sur l'IA de l'UE exige que les systèmes à haut risque soient conçus de manière à ce qu'une
personne puisse les superviser *efficacement* (comprendre le résultat, décider contre lui et arrêter
le système), et la difficulté est que la supervision indifférenciée échoue dans les deux sens.
L'examen humain de chaque action détruit la valeur de l'automatisation ; la supervision nominale
d'un flot continu d'actions est un tampon, et un tampon est pire que rien car il blanchit la
décision. Deux modes de défaillance doivent être explicitement conçus. **Biais d'automatisation** :
un examinateur qui voit un résultat de machine confiant aura tendance à le confirmer, donc une
supervision qui n'offre que « approuver/rejeter » sur la proposition du modèle n'est une supervision
que de nom. **Supervision qui se dégrade** : une porte qu'une personne peut franchir en deux
secondes sous charge sera franchie en deux secondes, et sa qualité baisse silencieusement à mesure
que le volume augmente. La réponse technique est de classer les actions par conséquence et de placer
un point de contrôle conçu uniquement où les enjeux justifient la latence (le motif
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) au chapitre 05), en donnant à
l'examinateur assez de contexte pour être en désaccord, en enregistrant l'approbateur et la décision
comme preuve, et en surveillant la supervision elle-même (taux d'approbation, temps de décision,
taux de révocation) comme un signal qui peut se dégrader. Une supervision que vous ne mesurez pas
est une supervision que vous ne pouvez pas revendiquer. Les approches
[human-in-the-loop, on-the-loop et in-command](/bok/principles-and-standards#eu-hleg-guidelines-and-altai)
du groupe d'experts de haut niveau de l'UE (chapitre 22) nomment les choix de placement, et le
chapitre 16 teste si les explications aident réellement les examinateurs à résister au biais
d'automatisation
([testing explanation quality](/bok/fairness-and-explainability#testing-explanation-quality)).

## IA tierce et achetée

La plupart des organisations n'entraînent pas les modèles qu'elles exécutent. Elles achètent un SaaS
avec un LLM intégré, appellent un modèle de base en API uniquement, ou héritent d'un agent à
l'intérieur du produit d'un fournisseur ; pour ceux-ci, les parties du stack qui supposent que vous
possédez le modèle se dégradent. Vous ne pouvez pas faire de red-team sur des poids que vous ne
pouvez pas atteindre, et une **eval gate** (couche 03) ne peut tester que le système du fournisseur
comme une boîte noire, à sa limite, pas ses internals. Le contrôle à l'exécution (couche 04) se
réduit à ce que l'intégration expose : les portées d'outils que vous accordez, l'identité que vous
émettez pour l'agent du fournisseur, le trafic que vous pouvez observer, pas le comportement du
modèle lui-même. Les couches ne disparaissent pas, mais la couche 03 se réduit aux évaluations de
limite et à la dépendance aux preuves propres du fournisseur, et la couche 04 se réduit au périmètre
que vous contrôlez. Ce qui augmente pour compenser est l'inventaire et l'assurance : le système du
fournisseur a toujours besoin d'une entrée de registre, d'un propriétaire et d'une portée ; sa
documentation de fournisseur, sa fiche de modèle et tout AIBOM deviennent des preuves que vous
collectez plutôt que produisez ; et la diligence raisonnable elle-même devient une porte, écrite
dans une [third-party AI policy](/bok/governance-program#third-party-ai-policy) (chapitre 12). C'est
le motif [**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate)
(chapitre 05), ancré dans l'annexe A.10 d'ISO/IEC 42001 (relations avec les tiers et les clients) et
la répartition des responsabilités entre fournisseur et déployeur du règlement sur l'IA de l'UE
(voir chapitre 08, et
[who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain) au chapitre 18). La
règle générale : moins vous possédez du modèle, plus votre budget de contrôle se déplace du test à
son encadrement et à la preuve du fournisseur. Le chapitre 15 couvre la décision
[build, buy or adapt](/bok/governing-deployment#build-buy-or-adapt) et sa charge de preuve, et le
chapitre 20 les
[licences and indemnities of procured models](/bok/existing-law#model-licences-and-vendor-indemnities).

## Le coût du stack

Rien de tout cela n'est gratuit, et une ligne FinOps fait partie de sa gouvernance honnête. Les
coûts récurrents sont le calcul pour les suites d'évaluation exécutées à chaque changement (les
suites adversariales sont les plus chères, et les exécuter à chaque commit plutôt qu'à chaque
version est une vraie facture), le stockage et la sortie pour les traces et le magasin de preuves
(les traces d'agent sont verbeux, et l'assurance continue signifie les conserver assez longtemps
pour répondre à un audit), et le temps d'ingénierie pour maintenir les suites, les seuils et les
intégrations à mesure que les systèmes évoluent. Les coûts augmentent avec la fréquence des
changements et le volume de traces, donc les leviers sont évidents une fois nommés : échantillonner
ou classer les évaluations coûteuses par risque, définir la rétention par obligation plutôt que par
défaut, et pousser les contrôles les moins chers (une vérification de politique, une porte
d'identité) à l'avant où ils capturent les défaillances avant qu'une évaluation coûteuse ne
s'exécute. Un stack dont personne ne suit le coût d'exécution est un stack qui sera coupé au premier
tour budgétaire, ce qui est en soi une défaillance de gouvernance.

## Le stack minimum viable pour une équipe d'une personne

La plupart des fonctions de gouvernance de l'IA sont petites, et beaucoup sont une seule personne :
dans la discipline GRC adjacente, environ la moitié des équipes sont quatre personnes ou moins et
près d'une sur cinq (18,5 %) est une équipe d'une personne [14]. Une équipe d'une personne ne peut
pas construire les cinq couches en profondeur, mais elle peut construire l'épine dorsale finement,
de bout en bout : une tranche verticale qui touche chaque couche vaut mieux qu'une couche construite
et quatre laissées sur papier. Commencez où le levier est le plus élevé et le coût le plus bas :

- **Couche 02 d'abord, minimalement.** Un registre dans lequel un déploiement écrit, avec un
  propriétaire et une portée par entrée. Si vous pouvez répondre « qu'est-ce qui s'exécute et qui en
  est propriétaire ? » à partir d'une source en direct, vous avez plus que la plupart.
- **Une politique dans la couche 01 avec des dents.** Une seule règle qui compte (pas de déploiement
  sans propriétaire enregistré, ou une vérification de résidence des données), en tant que code,
  dans le pipeline, bloquant en cas d'échec. Un contrôle qui mord vaut mieux que cent qui
  recommandent.
- **Une eval gate dans la couche 03.** Une évaluation adversariale contre votre agent à plus haut
  risque, câblée de sorte qu'une régression échoue la construction. Réutilisez un framework ouvert ;
  n'écrivez pas votre propre harnais.
- **Identité et kill switch dans la couche 04.** Chaque agent sous sa propre identité avec une
  portée, et un moyen testé de l'arrêter. C'est le contrôle le moins cher avec la plus grande
  réduction de rayon d'explosion.
- **Preuve comme sous-produit dans la couche 05.** Faites en sorte que chacun des éléments ci-dessus
  émette un enregistrement structuré et horodaté dans un magasin. Vous ne construisez pas encore un
  pipeline OSCAL ; vous refusez de compter sur des captures d'écran.

L'ordre est délibéré : voyez-le, régissez-le, testez-le, contenez-le, prouvez-le. Une tranche
verticale fine répond aux trois questions pour un système aujourd'hui et s'élargit à mesure que
l'équipe grandit. L'alternative, une couche 01 épaisse de politiques sans inventaire en dessous, ne
répond à aucune des trois questions, et c'est exactement le théâtre de framework que la discipline
existe pour terminer. La quantité de boucle de risque qu'une petite fonction exécute est définie par
la [tailoring matrix](/bok/risk-management#the-tailoring-matrix) du chapitre 13.

## Un système à travers les cinq couches

`csa-01`, l'assistant de service client des boîtes ci-dessus, est un système, pas cinq. Ci-dessous
se trouve l'artefact unique qu'il produit à chaque couche : de courts extraits des schémas définis
au chapitre 05, chacun illustratif. Les schémas JSON complets avec des exemples remplis pour ces
enregistrements, et [how to use them](/resources/templates#tpl-how), sont sur la page des modèles.

**Couche 01 : Govern-as-Code.** Un verdict Policy Card (illustratif) :

```json
{ "rule_id": "residency.eu-only.v3", "decision": "deny",
  "input_hash": "sha256:9f2b…", "timestamp": "2026-09-18T14:07:11Z" }
```

**Couche 02 : Inventory & Transparency.** Son entrée de registre (illustrative) :

```json
{ "id": "csa-01", "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"], "expiry": "2026-12-17" }
```

**Couche 03 : Evals & Red Teaming as Evidence.** Un résultat eval-gate (illustratif) :

```json
{ "suite_id": "injection-resistance.v4", "model_version": "csa-01@2026-09-18",
  "score": 0.982, "threshold": 0.95, "result": "pass" }
```

**Couche 04 : Runtime Controls & Observability.** Un événement guardrail (illustratif) :

```json
{ "agent": "csa-01", "direction": "output", "rule_id": "output.pii.v2",
  "decision": "block", "timestamp": "2026-09-18T14:31:52Z" }
```

**Couche 05 : Assurance & Continuous Compliance.** L'enregistrement de preuve qu'il émet
(illustratif) :

```json
{ "control_id": "guardrail.output.pii.v2", "subject": "csa-01@2026-09-18",
  "decision": "alert", "obligation": "EU AI Act Art. 15",
  "timestamp": "2026-09-18T14:31:52Z" }
```

Les cinq extraits sont un chemin de données unique de la politique à la preuve, clés sur le même id
de registre.

## Ce que vous pouvez faire cette semaine

1. **Dessinez une tranche.** Choisissez un système et écrivez, pour chacune des cinq couches,
   l'artefact unique qu'il produit aujourd'hui et celui qu'il manque. Les lacunes sont votre
   arriéré, dans l'ordre de construction.
2. **Câblez le registre au déploiement.** Faites en sorte qu'un pipeline de déploiement écrive
   l'entrée de registre (id, propriétaire, portée, expiration) et échoue quand un champ est vide.
3. **Donnez une politique des dents.** Déplacez une règle qui compte, un propriétaire enregistré ou
   une vérification de résidence des données, dans le code du pipeline, bloquant en cas d'échec, et
   enregistrez chaque verdict avec son id de règle.
4. **Portez une version sur une évaluation.** Mettez une évaluation adversariale contre votre agent
   à plus haut risque en CI, avec un seuil tracé à un mode de défaillance nommé, de sorte qu'une
   régression échoue la construction.
5. **Exercez un arrêt et conservez l'enregistrement.** Déclenchez le kill switch sur un agent en
   staging, chronométrez l'arrêt, et vérifiez que l'arrêt et les événements guardrail ont atteint un
   magasin de preuves unique, clés sur l'id de registre.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] Policy Cards: Machine-Readable Runtime Governance for Autonomous AI Agents (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[5] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[6] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[7] Inspect: a framework for large language model evaluations (UK AI Security Institute). GitHub. 2026. https://github.com/UKGovernmentBEIS/inspect_ai (verified: primary)
[8] General-Purpose AI Code of Practice, Safety and Security chapter (examples of model evaluation methods include "red-teaming and other methods of adversarial testing"; systemic-risk models only; voluntary; published 10 Jul 2025). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[12] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer compliance-as-code) (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[13] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[14] State of GRC 2026 (≈51% of GRC teams ≤4 people; ≈18.5% solo). GRC Engineer. 2026. https://grcengineer.com/report/ (verified: primary)
[15] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[16] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (guardian agents: AI-based technologies that review, monitor and redirect or block agent actions). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[17] CSA research note on the EU AI Act, prEN 18286 and ISO/IEC 42001 (ISO/IEC 42001 alone does not satisfy the AI Act and is not a harmonised standard; EN 18286 targets the Art. 17 QMS). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
