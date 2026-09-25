---
lang: fr
source: bok/23-governing-agents.md
sourceHash: "68496168af91fdc6ea15449a06098053248d0f6b2e38249b40eb5ca4c2606e28"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# # 23. Gouverner les agents IA

> Un agent IA est gouverné quand chaque action remonte à une identité enregistrée, une portée que
> quelqu'un a approuvée, un point de contrôle qui s'est déclenché là où les enjeux l'exigeaient et
> une façon testée de l'arrêter.

Le chapitre 05 porte quatre modèles d'agent : le [Agent Registry](/patterns/agent-registry),
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials), le
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) et la
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). La
[couche 04 du stack](/bok/the-stack#layer-04-runtime-controls--observability) dit ce que le contrôle
d'exécution doit prouver, et la [carte réglementaire](/bok/regulatory-map#china) aligne les
contrôles d'agent de trois cadres côte à côte. Aucun ne dit en un seul endroit ce qui rend un agent
différent à gouverner, comment les contrôles forment un plan de contrôle unique, ou où chaque
contrôle rencontre la loi. Ce chapitre le fait.

Un contraste d'abord. **L'ingénierie de la sécurité de l'IA**, la discipline sœur, demande comment
un attaquant peut faire en sorte qu'un agent cause du tort, et elle possède le
[modèle de menace](/patterns/ai-threat-model). L'ingénierie de la gouvernance de l'IA pose une
question plus large : sous l'autorité de qui l'agent a-t-il agi, dans quelle limite, avec quelle
preuve, et qui aurait pu l'arrêter. Les deux partagent la plupart des contrôles. Ils diffèrent sur
ce qui compte comme fait : pour la sécurité, une attaque bloquée est faite ; pour la gouvernance,
c'est fait quand le bloc, l'autorité derrière l'action et l'approbation sont enregistrés.

La liste agentic d'OWASP énonce le premier principe, **l'agentivité minimale** : son conseil est «
d'éviter l'autonomie inutile », car le comportement agentic déployé là où il n'est pas nécessaire «
élargit la surface d'attaque sans ajouter de valeur » [1]. Le contrôle d'agent le moins cher est
l'agent que vous n'avez pas construit : un flux de travail fixe avec un appel de modèle est plus
facile à gouverner qu'un planificateur qui choisit ses propres outils. Le chapitre 15 traite
[l'enveloppe agentic comme une option de déploiement](/bok/governing-deployment#how-it-is-adapted),
avec les contrôles qu'elle ajoute en plus du modèle qu'elle enveloppe.

## ## Ce qui fait d'un agent un objet de gouvernance

Un agent est un système d'IA qui poursuit un objectif en choisissant et en prenant des actions : il
planifie, appelle des outils, lit et écrit la mémoire et peut confier du travail à d'autres agents.
Le chapitre 11 le place parmi [les types d'IA](/bok/ai-defined#agentic-systems) qu'un registre doit
distinguer. Quatre propriétés importent pour la gouvernance, et chacune casse une hypothèse sur
laquelle la gouvernance des modèles s'appuie.

| Propriété | Ce qui change | Question de gouvernance | Premier contrôle |
|---|---|---|---|
| **Autorité déléguée** | L'agent agit au nom de quelqu'un, avec ses permissions ou les siennes | Quelle autorité a été utilisée, et était-elle plus étroite que la sienne ? | Identité de la charge de travail ; enregistrement de délégation |
| **Outils** | La sortie devient un effet dans un système de dossiers, pas du texte qu'une personne lit | Quelles actions peut-il prendre, sur quelles ressources ? | Liste d'autorisation des outils ; identifiants délimités |
| **Mémoire** | L'état persiste entre les sessions, les utilisateurs et les tâches | Qu'en retient-il, pendant combien de temps, et qui peut y écrire ? | Portées de mémoire ; rétention ; provenance d'écriture |
| **Autonomie** | Les étapes se produisent sans personne entre elles | Où une personne doit-elle décider, et peut-elle l'arrêter ? | Points de contrôle ; kill switch |

Le modèle de preuve change avec eux. Un modèle est évalué sur ses résultats ; un agent doit
également être évalué sur sa **trajectoire**, la séquence de plans, d'appels d'outils et
d'opérations de mémoire qui ont conduit à un effet. Une évaluation qui note la réponse finale et
ignore le chemin passera un agent qui a atteint le bon résultat par un outil qu'il n'aurait jamais
dû détenir.

### ### L'autonomie est une décision de conception

L'autonomie est un paramètre que le responsable du déploiement choisit, pas une propriété du modèle.
Comme l'ont dit Feng, McDonald et Zhang, « Le niveau d'autonomie d'un agent peut être traité comme
une décision de conception délibérée, distincte de sa capacité et de son environnement opérationnel
» [2]. Ils définissent cinq niveaux par le rôle que joue l'utilisateur : opérateur, collaborateur,
consultant, approbateur et observateur. Le
[Model AI Governance Framework for Agentic AI de Singapour](/bok/ai-laws-worldwide#singapore-model-frameworks-and-ai-verify)
décrit quatre niveaux d'implication humaine, de « l'agent propose, l'humain opère » à « l'agent
opère, l'humain observe », et cite le même travail [3]. L'Agentic Trust Framework de la Cloud
Security Alliance nomme quatre niveaux, du stagiaire (lecture seule) au principal (autonome dans les
limites), et rend la promotion gagnée : « précision soutenue, un dossier d'incidents vierge, un
audit de sécurité réussi et une approbation de gouvernance explicite » [4].

Le Règlement de l'IA de l'UE demande la même proportionnalité : les mesures de supervision d'un
système de IA de risco elevado doivent être proportionnées à ses risques, son niveau d'autonomie et
son contexte d'utilisation (`Art. 14(3)`) [5]. Le tableau aligne les trois échelles et attribue à
chaque niveau un ensemble minimal de contrôles. L'alignement et les ensembles de contrôles sont la
lecture de ce livre, non celle des auteurs.

| Rôle de l'utilisateur [2] | Niveau IMDA le plus proche [3] | Palier ATF le plus proche [4] | Ce que fait la personne | Contrôles minimaux |
|---|---|---|---|---|
| **Opérateur** | L'agent propose, l'humain opère | Stagiaire | Effectue chaque action | Entrée du registre ; identité propre ; outils en lecture seule ; traces |
| **Collaborateur** | L'agent et l'humain collaborent | Junior | Approuve les étapes importantes | Ce qui précède, plus une liste d'outils autorisés et un point de contrôle avant chaque écriture |
| **Consultant** | Entre les deux | Junior à Senior | Fixe les objectifs, donne des retours | Ce qui précède, plus un garde-fou d'exécution sur chaque appel d'outil et des budgets d'exécution |
| **Approbateur** | L'agent opère, l'humain approuve | Senior | Approuve les étapes critiques ou irréversibles | Ce qui précède, plus un journal d'approbation, un disjoncteur par agent et un kill switch testé |
| **Observateur** | L'agent opère, l'humain observe | Principal | Audite après coup | Ce qui précède, plus la détection d'anomalies de trajectoire et des évaluations de trajectoire indépendantes ; actions réversibles et bornées uniquement |

Enregistrez le niveau comme champ du registre (le chapitre 11 en donne
[une échelle d'autonomie illustrative](/bok/ai-defined#from-definition-element-to-registry-field))
et traitez son augmentation comme une modification qui nécessite le même examen qu'un nouveau
déploiement. Une promotion est une décision appuyée par des preuves, non un drapeau que quelqu'un a
basculé.

## Le registre des agents

Le motif [Agent Registry](/patterns/agent-registry) fait de l'enregistrement une condition préalable
à la production : propriétaire, portée et expiration, écrits par le pipeline. L'entrée d'un agent
doit en contenir davantage. Le cadre de Singapour demande que les identités des agents soient «
cataloguées et gérées de manière centralisée », émises par et suivies par un système central « pour
prévenir la prolifération des agents » [3] ; l'appendice agentic de TC260 demande une identité
unique par agent et un ensemble de permissions défini par le mode de décision [6].

| Champ | Pourquoi c'est là | Preuves qu'il permet |
|---|---|---|
| **Identité** (par exemple un ID SPIFFE) | Attribution | Chaque ligne de journal se joint à une entrée |
| **Propriétaire** (équipe et personne responsable) | Responsabilité | Une voie d'escalade qui existe |
| **Objectif** | Test de portée ; classification juridique | Détection d'utilisation en dehors de l'objectif |
| **Niveau d'autonomie** | Contrôles proportionnés | Historique de promotion |
| **Outils et portées** | La liste d'outils autorisés appliquée | Diffs de configuration du garde-fou |
| **Classes de données et magasins de mémoire** | Confidentialité et rétention | Liens AIPD et registres des activités de traitement |
| **Droits de délégation** | Limites entre agents | Politique de délégation |
| **Versions** (modèle, prompts, bundle de politique) | Contrôle des modifications | Relecture de la configuration exacte en cas d'incident |
| **Points de contrôle** | Conception de la supervision | Journal d'approbation |
| **Poignées d'arrêt** (disjoncteur, voie de révocation, dernier test) | Kill switch | Enregistrement du test |
| **Expiration** | Aucun agent ne survit à son examen | Désactivation automatique |
| **Rôle réglementaire et classe** | Obligations | Carte des obligations |

> **Exemple (illustratif)** Une entrée de registre pour un agent de remboursement, écrite par le
> pipeline de déploiement. Le bloc des versions est ce qui rend un incident rejouable ; le bloc
> d'arrêt est ce qui rend le kill switch plus qu'une affirmation.

```yaml
# agent-registry entry (illustrative)
id: refunds-agent
identity: spiffe://corp.example/agents/refunds-agent
owner: { team: support-platform, accountable: head-of-support-operations }
purpose: Draft and execute refunds for orders under the published returns policy
autonomy_level: approver
tools:
  - { name: orders.read, scopes: [orders:read] }
  - { name: refunds.create, scopes: [refunds:write], checkpoint: "amount_eur > 200" }
delegation: { may_call: [fraud-check-agent], may_be_called_by: [support-orchestrator] }
memory: { session: true, long_term: none }
versions: { model: vendor-model@2026-08-15, system_prompt: "sha256:9f2c...e41", policy_bundle: v14 }
budgets: { tool_calls_per_task: 25, spend_eur_per_day: 5000 }
stop: { breaker: cb-refunds-01, revoke: identity, last_drill: 2026-09-10 }
ai_act: { role: deployer, class: not-high-risk }
expiry: 2026-12-17
```

Un registre n'est bon que pour ce qu'il manque. Le motif
[Shadow-AI Discovery](/patterns/shadow-ai-discovery) le réconcilie avec ce qui s'exécute : des
connecteurs SaaS, des agents de codage sur des ordinateurs portables et des serveurs MCP locaux, qui
s'exécutent avec les mêmes privilèges que le client qui les a lancés [7]. Un agent trouvé par la
découverte est soit enregistré dans un délai imparti, soit arrêté.

> **En pratique (illustratif)**
> Dans un grand opérateur télécom, le premier balayage de découverte a trouvé plus d'agents sur les
> ordinateurs portables des développeurs que dans le registre de production : des assistants de
> codage avec des serveurs MCP locaux détenant des jetons d'accès personnels, certains avec accès en
> écriture aux référentiels partagés. La correction n'a pas été une interdiction. Un chemin pavé a
> émis à chaque agent du développeur une credential à courte durée de vie, limitée au référentiel,
> du système d'identité de production, et le balayage est devenu une réconciliation hebdomadaire
> avec un propriétaire pour chaque découverte.

## Identité et credentials à courte durée de vie

### L'authentification de canal n'est pas l'identité de l'agent

Les chapitres 04 et 05 tracent la ligne clé. **L'authentification de canal** sécurise un seul saut,
comme un client parlant à un serveur MCP. **L'identité de charge de travail de l'agent** est
l'identité attribuable que l'agent porte à chaque saut, sous laquelle ses actions sont enregistrées
et son accès révoqué. Le cadre de Singapour énumère ce que cette identité doit être : unique et «
vérifiable cryptographiquement » ; « comptabilisée », liée à un agent superviseur, un utilisateur
humain ou un département organisationnel ; différenciée « selon la capacité dans laquelle elle agit
», indépendamment ou au nom d'un utilisateur nommé ; et cataloguée de manière centralisée [3]. Le
NCCoE du NIST demande comment chaque agent peut être « connu, approuvé et correctement gouverné »
[8].

### Credentials attestées à courte durée de vie

SPIFFE définit des « documents d'identité cryptographique à courte durée de vie », appelés SVIDs,
livrés via une API de charge de travail qui les fait également tourner ; un SVID est actuellement
soit un certificat X.509, soit un JWT, et SPIRE est l'implémentation de référence [9]. Un troisième
format, WIT-SVID, un profil SPIFFE du jeton d'identité de charge de travail IETF WIMSE, est toujours
en incubation au 2026-09-24 [30]. La valeur de gouvernance réside dans la durée de vie : une
credential qui expire en quelques minutes n'a pas besoin d'être recherchée après un incident,
seulement de ne pas être réémise. Une clé API statique dans la configuration d'un agent est
l'opposé, et les attaquants savent où chercher : MITRE ATLAS catalogue « Credentials from AI Agent
Configuration » (`AML.T0083`) [10]. TC260 demande que les credentials soient révoquées à la fin de
la tâche [6]. Singapour demande que les autorisations soient « limitées dans le temps ou à la
session, non transférables », privilège minimum par défaut et jamais supérieures à ce que l'humain
autorisateur peut faire [3].

### Délégation sans usurpation d'identité

Quand un agent agit pour un utilisateur, deux identités sont en jeu, et le journal doit les garder
toutes les deux. OAuth 2.0 Token Exchange (RFC 8693) sépare **l'usurpation d'identité**, où l'acteur
devient indistinguible du sujet, de la **délégation**, où les deux restent identifiables. Sa
revendication `act` « fournit un moyen dans un JWT d'exprimer qu'une délégation a eu lieu et
d'identifier la partie agissante », et les revendications imbriquées `act` enregistrent les acteurs
antérieurs dans la chaîne [11]. La règle pour les agents suit : échangez le jeton de l'utilisateur
pour un jeton délégué qui nomme l'agent, avec une portée plus étroite et une expiration courte ; ne
remettez jamais à l'agent le propre jeton de l'utilisateur.

> **Exemple (illustratif)** Les revendications d'un jeton d'accès délégué. L'utilisateur est le
> sujet ; l'agent de remboursement est l'acteur actuel ; l'orchestrateur qui a délégué la tâche à
> celui-ci est imbriqué à l'intérieur. L'audience est une API et la portée une opération.

```json
{
  "sub": "user:4711",
  "aud": "https://refunds.api.example",
  "scope": "refunds:write",
  "exp": 1790330400,
  "act": {
    "sub": "spiffe://corp.example/agents/refunds-agent",
    "act": { "sub": "spiffe://corp.example/agents/support-orchestrator" }
  }
}
```

### Autorisation MCP au 2026-07-28

La spécification du protocole Model Context Protocol datée du 2026-07-28 est la version actuelle au
2026-09-24. L'autorisation est optionnelle dans MCP ; lorsqu'un transport HTTP l'utilise, le serveur
MCP agit comme un serveur de ressources OAuth 2.1 [12]. Les exigences qui importent pour la
gouvernance :

| Exigence (spec 2026-07-28) | Ce qu'elle prévient | Preuve à conserver |
|---|---|---|
| Les serveurs DOIVENT implémenter les métadonnées de ressource protégée OAuth 2.0 (RFC 9728), et les clients DOIVENT l'utiliser pour trouver le serveur d'autorisation [12] | Les clients devinant d'où viennent les jetons | Configuration de découverte dans le manifeste d'outil |
| Les clients et les serveurs d'autorisation DEVRAIENT supporter les documents de métadonnées d'ID client ; l'enregistrement dynamique du client est déprécié [12][13] | Enregistrements de clients anonymes et non gérés | Domaines de clients autorisés comme politique |
| Les clients DOIVENT envoyer le paramètre `resource` (RFC 8707) avec l'URI canonique du serveur [12] | Les jetons qui fonctionnent sur n'importe quel serveur | Demandes de jeton nommant la ressource |
| Les serveurs DOIVENT valider qu'un jeton a été émis pour eux et « NE DOIVENT PAS accepter ou transiter d'autres jetons » [12] | Passthrough de jeton et le député confus | Les défaillances de vérification d'audience levées comme des alertes |
| Les clients DOIVENT valider le paramètre `iss` (RFC 9207) avant de racheter un code, et les credentials du client sont liés à l'émetteur qui les a frappés [12][13] | Mélange du serveur d'autorisation | L'émetteur enregistré par flux |
| Les serveurs DEVRAIENT défier avec les portées qu'une opération nécessite, et les clients montent pour plus [12] | Portées omnibus accordées d'avance | Événements d'élévation avec ID de corrélation [7] |

Les conseils de sécurité qui l'accompagnent sont plus directs : le passthrough de jeton « est
explicitement interdit », et les erreurs de portée qu'il énumère incluent « Publier toutes les
portées possibles » et « Utiliser des portées joker ou omnibus » [7]. La version 2026-07-28 a
également défini une politique de dépréciation avec une fenêtre minimale de douze mois [13], donc la
version MCP que chaque serveur parle est un champ de registre. Et la spécification du document de
métadonnées d'ID client est toujours un brouillon Internet IETF (révision 02, 6 juillet 2026) [14].

Rien de cela n'identifie l'agent. MCP sécurise le saut entre un client et un serveur. Quel agent se
tient derrière le client, et pour qui, est le travail de l'identité de charge de travail.

## Permissions des outils et des serveurs MCP

### La liste d'outils autorisés

Un outil est une capacité, et la liste d'outils autorisés est l'endroit où les capacités sont
accordées. Le conseil de l'OWASP sous `ASI02` est de « Définir des profils de privilège minimum par
outil (portées, débit maximal et listes blanches de sortie) » et de les exprimer « comme des stances
de politique IAM ou d'autorisation attachées à chaque outil, plutôt que de s'appuyer sur des
conventions ad hoc » [1]. TC260 demande qu'un agent n'obtienne que les permissions minimales dont sa
tâche actuelle a besoin, et qu'une opération soit refusée par défaut quand le système d'approbation
échoue, l'utilisateur ne répond pas ou aucune règle d'approbation n'existe [6]. Une entrée de liste
d'outils autorisés contient plus qu'un nom :

| Propriété | Règle | Exemple |
|---|---|---|
| **Identité de l'outil** | Serveur, nom de l'outil et un hash de la définition de l'outil, épinglé | `refunds.create` sur `payments-mcp`, définition `sha256:…` |
| **Classe d'opération** | Lecture, écriture, suppression, envoi, exécution ou paiement ; la classe pilote les points de contrôle | `refunds.create` est paiement |
| **Portée de la ressource** | L'ensemble de ressources le plus étroit dont la tâche a besoin | Commandes du client dans le cas actuel |
| **Débit et volume** | Appels par tâche et par heure | 25 par tâche |
| **Sortie** | Destinations que l'outil peut atteindre | API de paiements interne uniquement |
| **Classes de données** | Ce qui peut circuler en entrée et en sortie | Pas de données de catégories spéciales vers les outils externes |
| **Point de contrôle** | Quand une personne doit approuver | Montant supérieur à 200 EUR |

Aucun outil n'est inoffensif par nature. La liste de l'OWASP décrit un agent de codage dont l'outil
ping approuvé automatiquement a été déclenché à plusieurs reprises pour exfiltrer des données via
des requêtes DNS [1] ; ATLAS catalogue « Exfiltration via AI Agent Tool Invocation » (`AML.T0086`)
et « Data Destruction via AI Agent Tool Invocation » (`AML.T0101`) [10]. Les limites de débit et de
sortie s'appliquent donc à chaque outil, y compris ceux dont personne ne se préoccupe.

> **Exemple (illustratif)** La liste d'autorisation en tant que politique de refus par défaut que la
> passerelle d'outils évalue à chaque appel, en lisant le registre comme données. La vérification de
> débit est omise par souci de concision.

```rego
package agents.tools

default allow := false

allow if {
  entry := data.registry[input.agent_id]
  some tool in entry.tools
  tool.name == input.tool.name
  tool.definition_hash == input.tool.definition_hash
  input.tool.scope in tool.scopes
}

needs_approval if {
  input.tool.operation in {"delete", "send", "pay", "execute"}
}
```

### Admission d'un serveur MCP

Un serveur MCP est un fournisseur. L'OWASP distingue deux cas : un outil dont l'interface est
manipulée à l'exécution (empoisonnement d'outil, sous `ASI02`) et un outil qui est malveillant ou
compromis à la source (`ASI04`) [1]. ATLAS a ajouté « AI Agent Tool Poisoning » (`AML.T0110`) pour
le contenu ou le comportement malveillant introduit dans la définition visible par le modèle d'un
outil ou dans son implémentation [10]. Une description d'outil est une instruction que le modèle
lit, donc une description modifiée est une instruction modifiée. Admettez un serveur via une porte :

1. **Provenance.** Éditeur, référentiel source et version signée, enregistrés dans
   l'[AIBOM](/patterns/aibom) de chaque agent qui l'utilise.
2. **Épinglage de définition.** Hacher les noms, descriptions et schémas des outils à l'admission ;
   alerter en cas de modification.
3. **Conformité d'autorisation.** Version MCP, métadonnées de ressources protégées, validation
   d'audience, pas de transmission de jeton.
4. **Isolation pour les serveurs locaux.** Les directives MCP exigent qu'un client affiche la
   commande exacte, sans troncature, et obtienne une approbation explicite avant une installation de
   serveur local en un clic, et recommandent d'exécuter ces serveurs isolés avec des privilèges
   minimaux [7].
5. **Test.** Descripteurs empoisonnés et sorties d'outils injectées, avant toute liste
   d'autorisation.
6. **Un propriétaire et une date de révision**, comme tout autre fournisseur.

La [porte d'audit diligent des fournisseurs / modèles](/patterns/vendor-model-due-diligence-gate)
couvre l'aspect commercial : qui répond quand le serveur se comporte mal, et quel avis vous recevez
avant qu'il ne change.

## Points de contrôle humains et conception de l'approbation

### Où placer un point de contrôle

Le motif [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) dit de gater par conséquence.
Deux sources rendent « conséquence » concrète. Le Partnership on AI évalue le risque d'agent sur
trois facteurs : **enjeux** (la gravité des conséquences potentielles), **réversibilité** (si un
échec peut être annulé) et **affordances** (la sélection d'outils sans contrainte et la mémoire
persistante introduisent des modes de défaillance plus complexes que les conceptions contraintes)
[15]. Le cadre de Singapour énumère quatre types de point de contrôle : actions et décisions à
enjeux élevés, actions irréversibles, comportement aberrant ou atypique, et limites définies par
l'utilisateur [3].

| Classe de point de contrôle | Déclencheur (exemples) | Qui approuve | Preuve |
|---|---|---|---|
| **Enjeux élevés** | Une décision finale concernant une personne ; une modification d'un enregistrement sensible | Un rôle nommé ayant l'autorité de refuser | Enregistrement d'approbation avec le contexte affiché |
| **Irréversible** | Un paiement, une suppression, un message externe, une publication | Le propriétaire commercial de l'action | Approbation liée aux paramètres exacts |
| **Aberrant** | Accès en dehors de la portée habituelle ; un plan deux fois la longueur habituelle | Le propriétaire d'astreinte | Événement d'anomalie et décision |
| **Défini par l'utilisateur** | Un achat au-dessus de la limite propre de l'utilisateur | L'utilisateur | Enregistrement de consentement |
| **Élévation de portée** | Une demande d'élévation pour une nouvelle portée | Le propriétaire de l'agent | Événement d'élévation |

### À quoi ressemble une bonne approbation

Le Règlement de l'IA décrit le superviseur que la conception doit servir. Pour un système à haut
risque, il doit être capable de reconnaître « la tendance possible de s'appuyer automatiquement ou
de trop s'appuyer sur la sortie », de « disregard, override or reverse the output », et d'«
interrompre le système via un bouton d'arrêt ou une procédure similaire »
(`Art. 14(4)(b), (d), (e)`) [5]. Le responsable du déploiement doit confier la supervision à des
personnes « qui possèdent les compétences, la formation et l'autorité nécessaires, ainsi que le
soutien nécessaire » (`Art. 26(2)`) [5]. Singapour ajoute deux points pratiques : garder les
demandes d'approbation « contextuelles et digestes » tout en rendant le risque clair, et « Appliquer
l'approbation humaine via des contrôles au niveau du système si possible, par rapport aux garde-fous
au niveau du prompt, qui peuvent être contournés ou 'oubliés' » [3].

La menace à concevoir contre est `ASI09`, **exploitation de la confiance agent-humain** : les gens
s'appuyant trop sur la justification confiante d'un agent et « approuvant les actions sans
validation indépendante », ce qu'un attaquant guidant l'agent peut exploiter [1]. ATLAS a une
technique pour la persuasion elle-même, « LLM Trusted Output Components Manipulation » (`AML.T0067`)
[10]. Les règles qui suivent :

1. **La porte vit en dehors du modèle.** La passerelle d'outils maintient l'appel jusqu'à l'arrivée
   de l'approbation ; le prompt ne décide pas s'il faut demander.
2. **Montrez l'appel, pas l'histoire.** L'approbateur voit l'outil, les paramètres et la cible tels
   que la passerelle les exécutera, puis la raison de l'agent, le risque et ce qui se passe en cas
   de rejet.
3. **Liez l'approbation.** Une approbation est à usage unique et liée à un hachage des paramètres ;
   un montant modifié nécessite une nouvelle approbation.
4. **Délai d'expiration fermé.** Pas de réponse signifie pas d'action.
5. **Mesurez la supervision.** Taux d'approbation, temps de décision et taux de remplacement, comme
   [concevoir la supervision humaine](/bok/the-stack#designing-human-oversight-article-14) le
   décrit.

> **Anti-patron** Un point de contrôle qui se déclenche 200 fois par jour sur une personne ayant
> d'autres travaux. Il devient un tampon en caoutchouc en une semaine, et le journal d'approbation
> blanchit alors les décisions qu'il était censé examiner.

> **En pratique (illustratif)**
> Une équipe de paiements a découvert que ses examinateurs approuvaient presque chaque demande de
> remboursement d'agent en quelques secondes. Deux changements l'ont résolu : seuls les
> remboursements irréversibles et de grande valeur atteignent désormais une personne, ce qui a
> réduit le volume d'un ordre de grandeur, et l'écran d'approbation affiche d'abord l'appel d'outil
> brut, avec l'explication de l'agent en dessous. Les remplacements sont passés de presque aucun à
> un taux qui vaut la peine d'être enquêté, et deux des premiers ont exposé un chemin d'injection de
> prompt via les notes des clients.

## Garde-fous d'exécution pour les appels d'outils

Un garde-fou d'exécution pour un agent se situe à un point : entre la décision d'appeler un outil et
l'appel. La spécification Autonomous Action Runtime Management (AARM) de la CSA définit « les
capacités qu'un système de sécurité d'agent doit fournir pour gouverner ce qu'un agent d'IA est
autorisé à faire à l'exécution », en commençant par l'interception pré-exécution liée à l'identité
et à l'évaluation des politiques avant l'exécution de l'action [16]. Le standard Agent Control de
l'OWASP est une spécification de fil pour le même point : il permet à un agent gardien séparé «
d'inspecter ce qu'un agent d'IA est sur le point de faire et de permettre, refuser ou modifier cette
action avant qu'elle ne se produise, sur un canal authentifié, avec une piste d'audit » [17].

Le gardien de référence dans le référentiel ACS commence par une posture d'échec de « procéder »,
remplaçable par refuser [17]. Depuis le 2026-09-24, le README du référentiel divulgue également que
le gardien de référence n'implémente pas encore la signature d'enveloppe HMAC-SHA256 que la
spécification exige, donc son fil est non authentifié et tout ce qui peut atteindre le port peut
lire et causer des décisions [17]. La valeur par défaut fail-open laisse passer chaque appel sans
vérification et fail-closed arrête l'entreprise. Décidez par classe d'opération et enregistrez-le
dans la [Fiche de politique](/patterns/policy-card) de l'agent : fail closed pour payer, supprimer,
envoyer et exécuter ; fail open, avec une alerte, uniquement pour les lectures.

| Vérification | S'exécute | En cas d'échec |
|---|---|---|
| L'identité correspond à une entrée de registre en direct | Chaque appel | Refuser |
| Outil sur la liste d'autorisation ; le hachage de définition correspond | Chaque appel | Refuser |
| Paramètres dans la politique (ressource dans la portée, limites de montant) | Chaque appel | Refuser, ou acheminer vers un point de contrôle |
| Provenance d'instruction : la demande provient-elle de contenu non fiable ? | Avant les appels de classe d'écriture | Acheminer vers un point de contrôle |
| Filtre de sortie et de sortie (secrets, données personnelles, destinations) | Après l'appel, avant le retour du résultat | Rédiger ou bloquer |
| Budgets d'exécution (étapes, appels, jetons, dépenses, temps) | Continuellement | Déclencher le disjoncteur |
| Le code s'exécute uniquement dans un bac à sable | Outils de classe d'exécution | Refuser (`ASI05`) |

### Limites d'exécution

Les budgets sont le garde-fou qui attrape ce qu'aucune règle n'a anticipé. La liste OWASP LLM 2026
nomme « les architectures agentiques et les protocoles d'utilisation d'outils (tels que MCP) qui
amplifient une seule demande en opérations en cascade en aval » comme facteur aggravant et
recommande « des plafonds de dépenses durs, des disjoncteurs au niveau de l'agent et une
surveillance continue de l'attribution des coûts » (`LLM06:2026`) [18]. ATLAS a ajouté « Agentic
Resource Consumption » (`AML.T0034.002`) pour les attaquants qui contraignent un agent à faire des
appels d'outils coûteux [10], et TC260 demande des limites d'étape, de fréquence et de durée [6].
Mettez les budgets dans l'entrée du registre, appliquez-les à la passerelle et faites en sorte que
l'épuisement déclenche le disjoncteur plutôt que de lever un ticket. Le motif
[Runtime Guardrail](/patterns/runtime-guardrail) couvre la mécanique ; un **agent gardien**, comme
le note le chapitre 04, est un moyen de construire le point d'application et a besoin de sa propre
identité, portée et kill switch.

## Kill switch et disjoncteurs par agent

L'autonomie n'est accordée que là où elle peut être retirée. Le NIST AI RMF demande des mécanismes
pour « supplanter, désengager ou désactiver » les systèmes dont les résultats sont incompatibles
avec l'utilisation prévue (MANAGE 2.4) [19] ; le Règlement de l'IA demande une procédure d'arrêt
(`Art. 14(4)(e)`) [5] ; le cadre de la CSA énonce l'objectif clairement : « Vous pouvez arrêter un
agent sans arrêter l'entreprise » [4]. Le motif
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) donne le mécanisme. En
opération, un arrêt a des niveaux :

| Niveau d'arrêt | Mécanisme | Rayon de souffle | Temps cible (illustratif) | Preuve |
|---|---|---|---|---|
| **Mettre en pause une tâche** | Maintenir au prochain point de contrôle, ou annuler la tâche | Une tâche | Secondes | Changement d'état de tâche |
| **Réduire la portée** | Supprimer un outil ou une portée de la liste d'autorisation | Une capacité d'un agent | Moins d'une minute | Diff de politique |
| **Déclencher le disjoncteur** | La passerelle rejette chaque appel de l'agent | Un agent | Secondes | Événement de disjoncteur |
| **Révoquer l'identité** | Arrêter d'émettre des identifiants ; révoquer les jetons d'actualisation | Un agent, partout | Limité par la durée de vie des identifiants | Enregistrement de révocation |
| **Arrêter une classe** | Disjoncteurs sur chaque agent partageant un modèle, un outil ou une version de prompt | Un segment de flotte | Minutes | Événement de flotte |
| **Dégrader** | Passer à des conseils uniquement ou revenir au pilote | Comportement, pas disponibilité | Minutes | Changement de mode |

La dernière ligne utilise les modes de
[dégradation progressive](/bok/governing-deployment#graduated-degradation) du chapitre 15 : «
conseil uniquement » (l'agent rédige, une personne agit) maintient le service tout en supprimant
l'autonomie. Les déclencheurs sont définis à l'avance : un tirage manuel, un seuil de budget ou
d'appel non autorisé, une anomalie, un avis en amont (le fournisseur du modèle signale un incident)
ou une instruction légale.

Un arrêt qui n'a pas été testé est une affirmation. Testez-le selon un calendrier, mesurez le temps
d'arrêt et vérifiez que l'arrêt a tenu : aucun appel d'outil après le déclenchement du disjoncteur,
aucune accréditation émise après révocation. Le chapitre 17 fait le même point pour le
[comportement malveillant](/bok/incidents#ai-specific-failure-modes) : révoquez, puis vérifiez que
la révocation a pris effet. La
[mise hors service](/patterns/deactivation-localisation-retirement-runbook) est la version planifiée
: TC260 énumère l'arrêt complet, la sauvegarde des données et le nettoyage de l'environnement [6] ;
ajoutez la suppression de la mémoire selon sa règle de conservation et le retrait de l'agent des
listes de délégation d'autres agents.

### Arrêt à travers les sauts

Vous ne pouvez pas arrêter l'agent de quelqu'un d'autre. L'opération d'annulation d'A2A le dit : «
Le serveur tentera d'annuler la tâche, mais le succès n'est pas garanti » [20]. Ce que vous
contrôlez, c'est votre propre limite : empêchez vos agents d'appeler l'agent distant et révoquez ce
que vous lui avez émis. Les jetons délégués de courte durée rendent cette révocation limitée par
leur durée de vie ; les jetons de longue durée en font un espoir.

> **En pratique (illustratif)**
> Un test de disjoncteur sur un agent de traitement de documents a mesuré quatre secondes entre le
> tirage et le rejet des appels par le disjoncteur, ce qui semblait être un succès. Le contrôle de
> suivi a découvert que des tâches longues écrivaient toujours dans le stockage vingt minutes plus
> tard, sur un jeton d'actualisation émis avant le tirage. Les jetons d'actualisation des agents ont
> été supprimés, les jetons d'accès réduits à cinq minutes, et le test affirme maintenant zéro
> écritures après le tirage, pas seulement un disjoncteur rapide.

## Gouvernance de la mémoire et du contexte

La mémoire transforme une mauvaise entrée en une entrée durable. La liste OWASP LLM 2026 appelle
cela **persistance de la mémoire** : « une injection qui écrit dans la mémoire à long terme, un
corpus RAG, un magasin vectoriel ou un service de mémoire hébergé contamine chaque session
ultérieure qui lit à partir de ce magasin » [18]. La liste agentique d'OWASP l'a comme `ASI06`
Memory & Context Poisoning [1] ; ATLAS a « AI Agent Context Poisoning » (`AML.T0080`), avec des
sous-techniques pour la mémoire et pour le fil de conversation [10].

| Mémoire | Ce qu'il contient | Risque principal | Contrôle | Conservation |
|---|---|---|---|---|
| **Fenêtre de contexte** | Instructions, texte récupéré, résultats d'outils | Injection via résultat d'outil | Balises de provenance ; segments non fiables marqués | Une requête |
| **Fil de conversation** | Une session | Empoisonnement du fil (`AML.T0080.001`) | Isolation par session | La session |
| **Mémoire à long terme** | Faits et préférences entre les sessions | Empoisonnement de la mémoire (`AML.T0080.000`) ; données personnelles conservées trop longtemps | Portail d'écriture ; espace de noms par utilisateur ; durée de vie ; chemin d'effacement | Défini par la politique, par classe |
| **Corpus de récupération** | Documents | Sources empoisonnées ou obsolètes (`AML.T0099`) | Admission de source ; vérification des droits à la récupération | Par version de corpus |
| **Mémoire partagée** | État transmis entre les agents | Contamination entre agents | Isolation par tâche ; écritures attribuées | La tâche |
| **Configuration de l'agent** | Invites, paramètres d'outils | Falsification (`AML.T0081`) ; accréditations stockées (`AML.T0083`) | Contrôle des modifications ; pas de secrets | Versionnée |

Cinq règles rendent la mémoire gouvernable. **Les écritures sont des événements** qui portent leur
source, de sorte qu'une entrée empoisonnée remonte à ce qui l'a produite.
**Le contenu non fiable ne peut pas écrire dans la mémoire à long terme** sans un portail.
**La mémoire est isolée** par utilisateur et par tâche, comme TC260 le demande, avec des fenêtres de
conservation et pas d'accréditations en mémoire [6]. **La conservation est du code** : un magasin de
mémoire contenant des données personnelles est soumis aux principes de minimisation et de limitation
du stockage du RGPD (`Art. 5(1)(c), (e)`) et au droit à l'effacement (`Art. 17`) [21] ; voir
[droits des personnes concernées contre les modèles entraînés](/bok/privacy-and-ai#data-subject-rights-against-trained-models).
**La mémoire peut être restaurée** à un instantané connu comme bon au lieu d'être effacée.

Pour les systèmes à haut risque qui continuent à apprendre après le déploiement, le Règlement de
l'IA demande qu'ils soient développés pour réduire « le risque que les résultats possiblement
biaisés influencent l'entrée pour les opérations futures » (`Art. 15(4)`) [5]. Une mémoire qui
façonne le comportement ultérieur est une telle boucle de rétroaction sous tous les rapports, et
lire `Art. 15(4)` comme la couvrant est la démarche prudente jusqu'à ce que les orientations disent
le contraire.

## Systèmes multi-agents et chaînes de délégation

Le protocole Agent2Agent (A2A) est un protocole ouvert pour la communication entre agents, d'abord
développé par Google et donné à la Linux Foundation. La version 1.0.0 a été publiée le 12 mars 2026
et la 1.0.1 le 28 mai 2026 [20] ; le 27 août 2026, A2A a été acceptée comme projet Growth Stage de
l'Agentic AI Foundation, dirigée par la Linux Foundation, aux côtés de MCP [22]. Son modèle de
sécurité vous donne des blocs de construction. Un agent publie une **Agent Card** à
`/.well-known/agent-card.json`} décrivant son identité, ses compétences, son point de terminaison et
ses exigences d'authentification ; la carte peut être signée avec JWS sur une forme JSON canonique ;
la carte déclare les schémas d'authentification que l'agent accepte (clés API, authentification
HTTP, OAuth 2.0, OpenID Connect ou TLS mutuel) ; et le serveur « DOIT authentifier chaque requête
entrante » [20]. L'autorisation après cela est, selon les termes de la spécification, « spécifique à
l'implémentation » [20].

Ce qu'A2A ne vous donne pas, c'est la responsabilité. Un agent qui a besoin de plus d'autorité en
cours de tâche déplace la tâche vers `TASK_STATE_AUTH_REQUIRED`}, et un client qui est lui-même un
agent peut transmettre la requête, « formant une chaîne de tâches » [20]. Mais la spécification
stipule qu'elle « ne définit pas l'étendue, la représentation, la validité ou la sémantique de
révocation de la décision d'autorisation ou de l'accréditation obtenue » [20]. Le protocole déplace
les tâches ; les règles sur qui peut autoriser quoi, à travers combien de sauts, sont à vous
d'écrire.

Les menaces sont nommées : `ASI07`} Insecure Inter-Agent Communication, `ASI08`} Cascading Failures
et `ASI10`} Rogue Agents [1]}, et ATLAS a ajouté « Autonomous AI Agent Communication »
(`AML.T0118`}) à la fin d'août 2026 [10]}. Le Code de pratique GPAI énumère la « collusion » avec
d'autres systèmes d'IA et la « mauvaise coordination ou le conflit » avec eux parmi les propensions
du modèle qui sont des sources de risque systémique [23]}.

### Responsabilité à travers les sauts

| Propriété | Règle | Preuve |
|---|---|---|
| **Principal d'origine** | Chaque tâche porte la personne ou le système qui l'a lancée | Racine du registre de délégation |
| **Acteur par saut** | Chaque agent s'authentifie en tant que lui-même ; délégation, jamais usurpation d'identité | Revendications imbriquées `act`} [11]} |
| **Étendue** | Se rétrécit ou reste égale à chaque saut ; ne s'élargit jamais | Journal d'échange de jetons |
| **Objectif** | L'objectif de la tâche voyage avec elle et est vérifié à chaque saut | Champ d'objectif à chaque appel |
| **Profondeur et fan-out** | Sauts maximaux et sous-tâches parallèles maximales | Événement de disjoncteur en cas de violation |
| **Trace** | Un contexte de trace du premier saut au dernier | ID de trace à chaque span |
| **Pairs** | Uniquement les agents enregistrés avec des cartes vérifiées et signées | Liste d'autorisation des pairs |
| **Tiers** | Un contrat nomme qui répond pour un agent distant | Référence de clause dans le registre |

Deux efforts de normalisation abordent la partie difficile, en portant l'identité et le contexte
d'autorisation à travers une chaîne d'appels. Le brouillon Transaction Tokens du groupe de travail
OAuth (révision 11, 30 juil. 2026, en attente de sa rédaction) est conçu « pour maintenir et
propager l'identité de l'utilisateur, l'identité de la charge de travail et le contexte
d'autorisation tout au long de la chaîne d'appels dans un domaine de confiance » [24] ; le groupe de
travail WIMSE de l'IETF (Workload Identity in Multi System Environments) couvre l'identité de la
charge de travail entre les systèmes [25]. Les deux sont inachevés au 2026-09-24. Jusqu'à ce qu'ils
se stabilisent, le tableau ci-dessus est le contrat, appliqué à chaque passerelle que vous
contrôlez. Pour les agents tiers, les clauses dans [contrats et licences](/resources/contracts) sont
l'autre moitié.

## Invites comme configuration sous contrôle des modifications

Le comportement d'un agent est défini par son modèle, son invite système, ses descriptions d'outils
et son ensemble de politiques. Modifiez l'un d'eux et le comportement change, sans aucun changement
de code. Traitez donc chacun comme une configuration sous contrôle des modifications, comme du code
d'infrastructure :

1. **Versionnez-le et appropriez-vous-le.** Les invites vivent dans le référentiel, avec un
   propriétaire nommé et deux relecteurs.
2. **Hashez-le partout.** Le registre enregistre le hash, tout comme chaque trace : les conventions
   OpenTelemetry portent `gen_ai.agent.version`} pour exactement cela [26]}.
3. **Mettez-la en porte.** Chaque changement exécute la suite de régression (succès de la tâche,
   résistance à l'injection, vérifications de trajectoire) dans la
   [Eval Gate in CI](/patterns/eval-gate-in-ci) ; un échec bloque le changement.
4. **Déployez-la et restaurez-la.** Canary le changement, comme dans
   [progressive delivery](/bok/governing-deployment#progressive-delivery-as-a-control), et gardez le
   hachage précédent prêt à restaurer.
5. **Demandez-vous si la finalité a changé.** Un prompt qui change ce que le système est destiné à
   faire peut être une
   [substantial modification](/bok/governing-development#substantial-modification) et, en vertu de
   [l'article 25](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider), peut faire du
   responsable du déploiement le fournisseur.

Une invite système est une configuration, pas un secret et pas un contrôle. La liste OWASP 2026 a
renommé la fuite d'invite système en **Hidden Context Exposure** (`LLM08:2026`}) et conseille que «
Les praticiens doivent concevoir en supposant que le contexte caché est découvrable » : pas
d'accréditations dedans, et pas de dépendance à son égard « comme limite de sécurité pour
l'autorisation, la séparation des privilèges, l'application des politiques ou le filtrage du contenu
» [18]}. ATLAS énumère à la fois « Extract LLM System Prompt » (`AML.T0056`}) et « Modify AI Agent
Configuration » (`AML.T0081`}) [10]}. Tout ce qui doit tenir va dans la passerelle.

> **Exemple (illustratif)** Un manifeste d'invite que le pipeline refuse de déployer à moins que
> l'exécution d'eval qu'il nomme n'ait réussi.

```yaml
# prompt manifest (illustrative)
agent: refunds-agent
artefact: system_prompt
version: 2026-09-22.1
sha256: "9f2c...e41"
owner: support-platform
reviewers: [product-owner, ai-governance-engineer]
eval_run: evals/refunds-agent/2026-09-22-1842   # must be green
rollout: { strategy: canary, share: 5%, hold_hours: 48 }
rollback_to: 2026-09-10.3
changes_intended_purpose: false
```

> **Anti-patron** Édition de l'invite système de production dans une console de fournisseur pour
> corriger une plainte. Le comportement change, le registre et les traces nomment toujours
> l'ancienne version, et l'incident suivant rejoue une configuration qui n'a jamais fonctionné.

## Incidents d'agent et télémétrie

### Une taxonomie des incidents d'agent

Le Partnership on AI définit la capacité dont les agents ont le plus besoin : « La détection des
défaillances en temps réel est l'utilisation de systèmes de surveillance automatisés qui suivent le
comportement de l'agent au fur et à mesure qu'il se déploie, signalent les anomalies et arrêtent
soit l'exécution, soit l'escaladent vers la supervision humaine » [15]. La taxonomie ci-dessous
étend les [modes de défaillance spécifiques à l'IA](/bok/incidents#ai-specific-failure-modes) du
chapitre 17 pour les agents ; l'échelle de gravité et les horloges de signalement sont celles que
[le chapitre 17 établit](/bok/incidents#a-severity-scale-mapped-to-the-clocks).

| Classe | À quoi cela ressemble | Signal de détection | Premier confinement | IDs |
|---|---|---|---|---|
| **Détournement d'objectif** | Les instructions dans un document redirigent la tâche | Appels d'outils sans rapport avec l'objectif de la tâche | Mettez en pause la tâche ; mettez en quarantaine la source | `ASI01`; `AML.T0051.001` |
| **Mauvaise utilisation d'outil** | Un outil autorisé utilisé à effet nuisible | Paramètres en dehors du profil du registre | Réduisez l'étendue ; déclenchez le disjoncteur | `ASI02`; `AML.T0053` |
| **Abus de privilèges** | L'agent utilise une autorité au-delà de sa tâche | Défaillances d'audience ou de portée | Révoquer l'identité | `ASI03`; `AML.T0098` |
| **Compromission de la chaîne d'approvisionnement** | Une définition d'outil change après l'admission | Incohérence du hachage de définition | Retirer le serveur des listes d'autorisation | `ASI04`; `AML.T0110` |
| **Exécution de code inattendue** | Le code généré s'exécute en dehors du bac à sable | Violation du bac à sable | Tuer le processus ; révoquer | `ASI05`; `AML.T0112.000` |
| **Empoisonnement de la mémoire** | Un « fait » injecté persiste entre les sessions | Écritures en mémoire à partir de sources non fiables | Geler et restaurer le magasin | `ASI06`; `AML.T0080` |
| **Usurpation d'identité entre agents** | Un agent non enregistré répond en tant que pair | Identité inconnue ; carte non signée | Bloquer le pair | `ASI07`; `AML.T0118` |
| **Cascade** | L'erreur d'un agent s'amplifie à travers les autres | Défaillances corrélées | Casser la chaîne au composant partagé | `ASI08` |
| **Exploitation de la confiance** | Un résumé trompeur remporte une approbation | Incohérence entre le résumé et l'appel | Afficher les appels bruts ; examiner les approbations passées | `ASI09`; `AML.T0067` |
| **Débordement ou agent voyou** | Activité hors de portée, après expiration ou au-delà du budget | Appels après expiration ; pic de dépense | Révoquer ; vérifier que l'arrêt a tenu | `ASI10`; `AML.T0034.002` |
| **Exfiltration via un outil** | Données codées dans une écriture légitime | Sortie vers une destination inconnue | Bloquer la sortie ; déclencher le disjoncteur | `ASI02`; `AML.T0086` |

### Télémétrie avec les conventions GenAI d'OpenTelemetry

Les conventions sémantiques d'OpenTelemetry pour l'IA générative vivent désormais dans leur propre
dépôt et sont en statut **Development**, les noms peuvent donc encore changer [26]. Elles
définissent les opérations pour `create_agent`, `invoke_agent`, `invoke_workflow`, `plan`,
`execute_tool` et les opérations de mémoire telles que `search_memory` et `update_memory`. Une
portée d'outil est nommée `execute_tool {gen_ai.tool.name}` ; `gen_ai.tool.name` est obligatoire,
`gen_ai.tool.call.id` recommandé, et les arguments et le résultat de l'appel sont optionnels. Les
portées d'agent portent `gen_ai.agent.id`, `gen_ai.agent.name` et `gen_ai.agent.version`, et une
convention distincte couvre MCP (`mcp.method.name`, `mcp.session.id`) [26].

La gouvernance a besoin de champs que les conventions ne définissent pas encore (ID de registre,
identité de charge de travail, verdict de politique, ID d'approbation, chaîne de délégation) :
ajoutez-les dans votre propre espace de noms et mappez-les plus tard. L'activation de la capture
d'arguments et de résultats peut capturer des données personnelles, ce qui nécessite ses propres
règles de rétention et d'accès. Et les journaux sont des preuves : les systèmes à haut risque
doivent enregistrer les événements pendant leur durée de vie (`Art. 12`), et les responsables du
déploiement doivent conserver les journaux sous leur contrôle pendant au moins six mois
(`Art. 26(6)`) [5]. L'[enregistrement d'incident](/bok/incidents#the-incident-record) du chapitre 17
est l'endroit où la trace aboutit.

## Menaces mappées aux contrôles

Les deux listes OWASP divisent le terrain. La liste LLM 2026, publiée le 3 août 2026, dit qu'elle «
possède le risque quand le modèle est un composant à l'intérieur de votre application » ; une fois
que le modèle « devient un acteur, avec des outils qu'il peut appeler, une mémoire qu'il porte entre
les sessions, et des conséquences qu'il met en mouvement en aval, le risque se déplace vers le Top
10 Agentic d'OWASP », et l'Agentivité excessive a grimpé à la troisième place (`LLM03:2026`) [18].
Le tableau mappe chaque menace agentic aux entrées LLM associées, aux exemples de techniques ATLAS
de la version de données 2026-09 [10], à un contrôle et au motif qui l'implémente.

| Menace agentic [1] | LLM 2026 associé [18] | Exemples de techniques ATLAS | Contrôle | Motif | Couche |
|---|---|---|---|---|---|
| `ASI01` Détournement d'objectif d'agent | `LLM01` Injection de prompt | `AML.T0051` Injection de prompt LLM | Provenance des instructions ; points de contrôle avant les écritures ; évaluations de trajectoire | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI02` Mauvaise utilisation et exploitation d'outils | `LLM03` Agentivité excessive ; `LLM06` Consommation non bornée | `AML.T0053` Invocation d'outil d'agent IA ; `AML.T0086` | Liste d'autorisation d'outil ; taux par outil, sortie et budgets | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI03` Abus d'identité et de privilège | `LLM03` Agentivité excessive | `AML.T0083` ; `AML.T0098` Récolte de credentials d'outil d'agent IA | Identité de charge de travail ; tokens délégués de courte durée ; vérifications d'audience | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI04` Vulnérabilités de la chaîne d'approvisionnement agentic | `LLM04` Chaîne d'approvisionnement | `AML.T0110` Empoisonnement d'outil d'agent IA | Admission du serveur ; épinglage de définition | [AIBOM](/patterns/aibom) | 02 |
| `ASI05` Exécution de code inattendue (RCE) | `LLM10` Gestion incorrecte de la sortie | `AML.T0112.000` Agent IA local | Exécution en bac à sable ; refus par défaut | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI06` Empoisonnement de la mémoire et du contexte | `LLM05` Empoisonnement des données et du modèle ; `LLM09` Faiblesses des vecteurs et des embeddings | `AML.T0080` Empoisonnement du contexte d'agent IA | Porte d'écriture en mémoire ; espaces de noms ; restauration | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI07` Communication inter-agents non sécurisée | Aucun | `AML.T0118` Communication d'agent IA autonome | Authentification mutuelle ; Agent Cards signées ; liste d'autorisation des pairs | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI08` Défaillances en cascade | `LLM06` Consommation non bornée | `AML.T0034.002` Consommation de ressources agentic | Limites de profondeur et de fan-out ; disjoncteurs par agent | [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) | 04 |
| `ASI09` Exploitation de la confiance agent-humain | `LLM07` Désinformation | `AML.T0067` Manipulation de composants de sortie de confiance LLM | Approbations d'appels bruts ; métriques de supervision | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) | 04 · 05 |
| `ASI10` Agents voyous | `LLM03` Agentivité excessive | `AML.T0103` Déployer un agent IA | Registre avec expiration ; découverte ; disjoncteur percé | [Agent Registry](/patterns/agent-registry); [Shadow-AI Discovery](/patterns/shadow-ai-discovery) | 02 · 04 |

`LLM02:2026` La divulgation d'informations sensibles aboutit au filtre de sortie et `LLM08:2026`
L'exposition du contexte caché dans le traitement des prompts. Utilisez les ID ATLAS pour étiqueter
les cas de test dans la [Suite de test adversarial](/patterns/adversarial-red-team-suite), afin
qu'une découverte trace de la technique au contrôle à l'évaluation qui la protège maintenant. Le
[pont de menace](/resources/threats) du site porte les mêmes lignes que les données. Les mappages
sont illustratifs, pas une affirmation de conformité.

## Cadres écrits pour les agents

Cinq organismes ont publié des conseils spécifiques aux agents, et le chapitre 08 en place déjà
trois côte à côte dans son [tableau de contrôle d'agent](/bok/regulatory-map#china). Leur statut au
2026-09-24 :

| Cadre | Statut | Ce qu'il ajoute |
|---|---|---|
| **Initiative de normes pour agents IA du NIST** (CAISI) | Lancée le 17 février 2026 ; trois piliers : normes menées par l'industrie, protocoles ouverts, recherche sur la sécurité et l'identité des agents [27] | Un RFI sur la sécurité des agents IA et le document de concept du NCCoE sur l'identité et l'autorisation des agents [27][8] |
| **Cadre de confiance agentic du CSA** et **AARM** | ATF v1, publié en février 2026 sous CC BY 4.0 [4] ; AARM d'un groupe de travail du CSA [16] ; tous deux nommés dans le programme de plan de contrôle agentic du CSA d'avril 2026 [28] | Zero trust pour les agents avec niveaux d'autonomie gagnés (ATF) ; exigences d'interception à l'exécution (AARM) |
| **Cadre de gouvernance des modèles IA pour l'IA agentic de l'IMDA** | Lancé le 22 janvier 2026 [29] ; version 1.5 publiée le 20 mai 2026 [3] | Quatre dimensions : limiter les risques à l'avance, rendre les humains responsables, contrôles techniques, responsabilité de l'utilisateur final |
| **Cadre de gouvernance de la sécurité de l'IA TC260 3.0, Annexe 2** | Volontaire ; publié le 14 septembre 2026 [6] | Identité par mode de décision, journaux d'approbation inviolables, isolation de la mémoire, décommissionnement |
| **Norme de contrôle d'agent OWASP** | Donnée au projet de sécurité GenAI d'OWASP, annoncée le 1er septembre 2026 ; dépôt à la version 0.1.2 [17] | Un contrat de câblage entre un hôte d'agent et un agent gardien |

La carte réglementaire liste également un supplément de contrôle agentic AICM proposé par le CSA. Ce
chapitre n'a pas pu le faire correspondre à un document principal du CSA au 2026-09-24, traitez-le
donc comme non confirmé (vérifiez).

Côte à côte, ils convergent sur une courte liste : une identité unique par agent, le moindre
privilège qui expire, des points de contrôle sur les actions irréversibles, l'interception avant
l'exécution, un arrêt qui fonctionne sur un agent, la mémoire isolée et les journaux complets.
Singapour ajoute la responsabilité de l'utilisateur final, le CSA l'autonomie gagnée, TC260 le
décommissionnement. Aucun ne confère la conformité ; ce sont des sources de contrôles et de
vocabulaire.

## Crochets du règlement de l'IA de l'UE pour les agents

Le règlement de l'IA ne définit pas « agent ». Un agent est un système d'IA, classé par sa finalité
prévue comme tout autre : un agent qui examine les candidats à un emploi est à haut risque selon
l'annexe III quelle que soit son architecture, et un assistant de planification ne l'est pas. Le
chapitre 18 contient les
[exigences pour les systèmes à haut risque](/bok/eu-ai-act#high-risk-requirements-articles-8-to-15)
et les [devoirs du responsable du déploiement](/bok/eu-ai-act#deployer-duties-article-26) en
intégralité. Les dispositions ci-dessous sont celles où les contrôles d'agent produisent la preuve ;
le registre des obligations donne à chacun sa propre page, avec ses dates, preuves et correspondance
: [Art. 12](/obligations/aige-obl-euaia-art12), [Art. 14](/obligations/aige-obl-euaia-art14),
[Art. 15](/obligations/aige-obl-euaia-art15), [Art. 25](/obligations/aige-obl-euaia-art25),
[Art. 26](/obligations/aige-obl-euaia-art26) et [Art. 50](/obligations/aige-obl-euaia-art50).

| Disposition | Ce qu'il demande | Artefact d'agent | Titulaire de l'obligation |
|---|---|---|---|
| `Art. 12` | Enregistrement automatique des événements pendant la durée de vie, pour identifier le risque, soutenir la surveillance après commercialisation et surveiller le fonctionnement [5] | Traces avec identité, appels d'outils, verdicts et approbations | Fournisseur |
| `Art. 14(3)`–`(4)` | Supervision proportionnée au niveau d'autonomie ; sensibilisation au biais d'automatisation ; remplacement ; arrêt [5] | Niveau d'autonomie ; points de contrôle ; approbations d'appels bruts ; disjoncteur | Le fournisseur conçoit ; le responsable du déploiement exploite |
| `Art. 15(4)` | Résilience ; réduire les boucles de rétroaction dans les systèmes qui continuent à apprendre [5] | Porte d'écriture en mémoire ; évaluations de mémoire ; restauration | Fournisseur |
| `Art. 15(5)` | Résilience contre les tentatives d'altération de l'utilisation, des résultats ou des performances, y compris l'empoisonnement et les entrées adversariales [5] | Guardrails ; admission du serveur ; test adversarial étiqueté avec des ID ATLAS | Fournisseur |
| `Art. 25` | Un responsable du déploiement qui modifie substantiellement un système à haut risque, ou change la finalité prévue d'un système de sorte qu'il devienne à haut risque, devient son fournisseur [5] | Examen des modifications des prompts et des outils avec une vérification de la finalité | Déployeur |
| `Art. 26(1)`–`(2)`, `(5)`–`(6)` | Utilisation selon les instructions ; superviseurs compétents avec autorité ; surveiller et suspendre ; conserver les journaux au moins six mois [5] | Registre des approbateurs ; disjoncteur ; rétention des journaux | Déployeur |
| `Art. 50(1)` | Les gens sont informés qu'ils interagissent avec un système d'IA sauf si c'est évident ; s'applique à partir du 2 août 2026 [5] | Divulgation dans les messages, appels et chats qu'un agent envoie | Fournisseur |
| `Arts. 53`, `55` | Documentation pour les fournisseurs en aval ; évaluation du risque systémique pour les plus grands modèles [5] | La documentation du fournisseur comme entrée de diligence raisonnable ; évaluations agentic dans le fichier du fournisseur | Fournisseur GPAI |

Le code de pratique GPAI rend le lien agentic explicite pour les fournisseurs de modèles à risque
systémique. Ses sources de risque systémique incluent « capacités à fonctionner de manière autonome
» et « capacités à utiliser des outils, y compris 'l'utilisation d'ordinateur' », et parmi les
affordances « accès aux outils (y compris d'autres modèles/systèmes d'IA) » et le « niveau de
supervision humaine (par exemple, degré d'autonomie du modèle) » ; ses risques systémiques spécifiés
incluent **perte de contrôle**, définie comme « Risques que les humains perdent la capacité à
diriger, modifier ou arrêter de manière fiable un modèle » [23]. Un responsable du déploiement
devrait demander comment le fournisseur a évalué l'autonomie et l'utilisation d'outils à la
[porte de diligence raisonnable](/patterns/vendor-model-due-diligence-gate) ; le chapitre 18 couvre
[les devoirs GPAI](/bok/eu-ai-act#general-purpose-ai-models). Le code est un outil volontaire. Les
mappages sont illustratifs, pas une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Trouvez vos agents.** Exécutez un balayage de découverte qui inclut les agents de codage et les
   configurations de serveur MCP locales, et enregistrez ce que vous trouvez avec un propriétaire,
   un niveau d'autonomie et une expiration.
2. **Retirez une clé statique.** Déplacez un agent vers une identité de charge de travail de courte
   durée, et confirmez que les serveurs MCP qu'il appelle rejettent les tokens émis pour une autre
   audience.
3. **Écrivez une liste d'autorisation comme politique.** Refusez par défaut, avec des hachages de
   définition, des classes d'opération et un point de contrôle sur chaque appel de paiement,
   suppression, envoi et exécution.
4. **Testez l'arrêt.** Déclenchez le disjoncteur sur un agent, mesurez le temps d'arrêt et confirmez
   qu'aucun appel ou écriture n'a eu lieu après.
5. **Versionnez l'invite système.** Placez-la dans le référentiel derrière une eval gate et
   enregistrez son hachage dans le registre et dans chaque trace.

**Correspondances :** EU AI Act Art. 12, 14(3)–(4), 15(4)–(5), 25, 26(1)–(2), 26(5)–(6), 50(1), 53,
55 · GPAI Code of Practice, Safety and Security (Appendix 1.3, 1.4) · ISO/IEC 42001 (Annex A.6, A.9)
· NIST AI RMF (Manage 2.4) · NIST AI Agent Standards Initiative · OWASP Agentic ASI01–ASI10 · OWASP
LLM01, LLM03, LLM06, LLM08:2026 · MITRE ATLAS · IMDA Model AI Governance Framework for Agentic AI ·
TC260 Framework 3.0 Appendix 2 · Layer 02 Inventory & Transparency · Layer 04 Runtime Controls &
Observability · Layer 05 Assurance & Continuous Compliance. Les mappages sont illustratifs, non une
déclaration de conformité.

## Sources

[1] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation, per-tool least-privilege profiles, auto-approved ping tool used for DNS exfiltration; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; "Least-Agency"). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; five levels by user role: operator, collaborator, consultant, approver, observer; autonomy as a design decision separate from capability). Knight First Amendment Institute at Columbia University / arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[3] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four levels of human involvement; agent identity unique, cryptographically verifiable, accounted for, differentiated by capacity, catalogued and centrally managed; authorisations scoped, time- or session-bound, non-transferable, bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals contextual and digestible; human approval enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[4] Agentic Trust Framework, v1 (zero-trust governance for AI agents; five elements: identity, behaviour, data governance, segmentation, incident response; autonomy tiers Intern, Junior, Senior, Principal; promotion criteria; CC BY 4.0; released February 2026). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744: Art. 12 record-keeping; Art. 14(3)–(4) human oversight commensurate with risks, level of autonomy and context of use, automation bias, override, "stop" button; Art. 15(4)–(5) robustness, feedback loops, cybersecurity; Art. 25 responsibilities along the value chain; Art. 26(1)–(2), (5)–(6) deployer obligations; Art. 50(1) transparency for systems interacting with natural persons; Arts. 53 and 55 GPAI providers; Art. 113 application dates as amended (Annex III high-risk from 2 December 2027, Annex I from 2 August 2028). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[6] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), Appendix 2 agentic AI risk management (II.2 unique identity and minimum permissions by decision mode, credentials revoked at task end; II.3 human control checkpoints, tamper-proof approval logs, deny by default when approval fails or no rule exists; II.5 execution limits, memory retention and isolation, no credentials in memory; II.7 decommissioning). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[7] Model Context Protocol, Security Best Practices, version 2026-07-28 (confused deputy; token passthrough "explicitly forbidden"; SSRF; state handle hijacking; local MCP server compromise, consent and sandboxing; scope minimisation and common mistakes). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[8] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[9] SPIFFE overview (Secure Production Identity Framework for Everyone; SPIFFE ID; short-lived SVIDs as X.509 or JWT delivered and rotated through the Workload API; SPIRE reference implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[10] MITRE ATLAS data, release v2026.09 (agent techniques incl. AML.T0034.002 Agentic Resource Consumption, AML.T0051 LLM Prompt Injection, AML.T0053 AI Agent Tool Invocation, AML.T0056 Extract LLM System Prompt, AML.T0067 LLM Trusted Output Components Manipulation, AML.T0080 AI Agent Context Poisoning (.000 Memory, .001 Thread), AML.T0081 Modify AI Agent Configuration, AML.T0083 Credentials from AI Agent Configuration, AML.T0086 Exfiltration via AI Agent Tool Invocation, AML.T0098 AI Agent Tool Credential Harvesting, AML.T0099 AI Agent Tool Data Poisoning, AML.T0101 Data Destruction via AI Agent Tool Invocation, AML.T0103 Deploy AI Agent, AML.T0110 AI Agent Tool Poisoning, AML.T0112.000 Local AI Agent, AML.T0118 Autonomous AI Agent Communication). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[11] RFC 8693, OAuth 2.0 Token Exchange (M. Jones, A. Nadalin, B. Campbell, J. Bradley, C. Mortimore; impersonation versus delegation semantics; "act" actor claim and nested actors; "may_act" claim). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[12] Model Context Protocol specification, version 2026-07-28, Authorization (optional; OAuth 2.1 resource server; RFC 9728 Protected Resource Metadata; Client ID Metadata Documents SHOULD, Dynamic Client Registration deprecated; RFC 8707 resource parameter; audience validation; no other tokens accepted or transited; RFC 9207 issuer validation; scope challenges and step-up). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (verified: primary)
[13] "Authorization changes in the 2026-07-28 specification" (RFC 9207 issuer validation; DCR "formally deprecated in favor of CIMD"; client credentials bound to the issuer that minted them; formal deprecation policy with a twelve-month minimum window). Model Context Protocol blog. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[14] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group; a URL used as client_id that points to the client metadata). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[15] Prioritizing Real-Time Failure Detection in AI Agents (lead author Madhulika Srikumar; stakes, reversibility and affordances; definition of real-time failure detection). Partnership on AI. 2025-09-11. https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/ (verified: primary)
[16] Autonomous Action Runtime Management (AARM) specification (system category specification for agentic runtime security; pre-execution interception with identity binding; policy evaluation before execution; core requirements R1–R6; CSA working group). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[17] Agent Control Standard (ACS) (wire specification letting a guardian agent permit, deny or modify an agent's action before it happens, over an authenticated channel, with an audit trail; reference guardian failure posture "proceed" unless overridden; README discloses that the reference guardian lacks the required HMAC-SHA256 envelope signature, open issue #70; repository github.com/GenAI-Security-Project/agent-control-standard at version 0.1.2; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/resource/agent-control-standard-acs/ (verified: primary)
[18] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection incl. memory persistence; LLM02 Sensitive Information Disclosure; LLM03 Excessive Agency; LLM04 Supply Chain; LLM05 Data and Model Poisoning; LLM06 Unbounded Consumption; LLM07 Misinformation; LLM08 Hidden Context Exposure, formerly System Prompt Leakage; LLM09 Vector and Embedding Weaknesses; LLM10 Improper Output Handling; boundary with the Agentic Top 10 stated in the preface; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[19] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems inconsistent with intended use). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[20] Agent2Agent (A2A) Protocol Specification, v1.0 (releases v1.0.0 on 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, optional JWS signature over JCS-canonicalised JSON; security schemes; servers MUST authenticate every incoming request; authorisation implementation-specific; in-task authorisation via TASK_STATE_AUTH_REQUIRED and its unspecified scope and revocation semantics; Cancel Task not guaranteed). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[21] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 5(1)(c) data minimisation and 5(1)(e) storage limitation; Art. 17 right to erasure. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[22] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP, goose and AGENTS.md). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[23] General-Purpose AI Code of Practice, Safety and Security chapter, Appendix 1.3 sources of systemic risk (capabilities to operate autonomously and to use tools; propensities incl. colluding and mis-coordination with other AI systems; affordances incl. access to tools and level of human oversight) and Appendix 1.4 specified systemic risks (incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[24] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group; WG state "Waiting for Write-Up"; propagation of user identity, workload identity and authorisation context through a call chain within a trust domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[25] Workload Identity in Multi System Environments (WIMSE) working group, charter. IETF. 2026. https://datatracker.ietf.org/wg/wimse/about/ (verified: primary)
[26] OpenTelemetry semantic conventions for generative AI (status Development; agent spans create_agent, invoke_agent, invoke_workflow, plan; execute_tool span and gen_ai.tool.* attributes, arguments and results opt-in; memory operations; gen_ai.agent.id, .name, .version; MCP conventions mcp.method.name, mcp.session.id). OpenTelemetry. 2026. https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai (verified: primary)
[27] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI with ITL; three pillars; RFI on AI agent security; AI agent identity and authorization concept paper; listening sessions). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[28] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (Agentic Trust Framework; Autonomous Action Runtime Management framework; Catastrophic Risk Annex; STAR for AI). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[29] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[30] WIT-SVID (SPIFFE specification; Stability: Incubating; a sub-profile of the Workload Identity Token of the IETF WIMSE working group). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-specs/wit-svid/ (verified: primary)
