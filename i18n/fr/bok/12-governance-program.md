---
lang: fr
source: bok/12-governance-program.md
sourceHash: "460584c50e45544537c593e6d00f037ffa678694b52f0164664a33518e8e400f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 12. Exécuter le programme de gouvernance de l'IA

> Un programme de gouvernance de l'IA est l'organisation gouvernée en tant que système : les gens
> détiennent les devoirs, un comité décide ce que les portes ne peuvent pas, les politiques se
> compilent en portes, et la preuve atteint le conseil.

## L'organisation en tant qu'objet de gouvernance

Le chapitre 01 nomme cinq objets de gouvernance : les modèles, les systèmes, les agents, les données
et l'organisation. Les quatre premiers reçoivent la plupart des mécanismes de ce livre. Le cinquième
décide si cette machinerie est construite, financée, obéie ou contournée. « Un contrôle sans
propriétaire n'est pas un contrôle » est une affirmation sur l'organisation, et ce chapitre l'écrit
: qui détient quel devoir, où les décisions sont prises, comment les politiques deviennent des
portes, comment les gens sont formés et entendus, et comment le leadership apprend si tout cela
fonctionne.

Une règle traverse le chapitre : **le comité décide ; les portes appliquent.** Les gens prennent les
décisions qui nécessitent un jugement (ce cas d'usage vaut-il son risque, ce risque résiduel est-il
acceptable, cette exception est-elle justifiée). Le code les applique à chaque changement et laisse
la preuve. Un programme qui inverse cela, avec des réunions qui appliquent et du code qui conseille,
est l'anti-modèle « tableau d'examen des risques » du chapitre 04 : recommandation sans conséquence.

La loi s'attend déjà à ce que la couche organisationnelle soit conçue. Le Reglamento de IA exige que
le système de gestion de la qualité d'un fournisseur à haut risque inclue « un cadre de
responsabilité définissant les responsabilités de la direction et des autres membres du personnel »
(`Art. 17(1)(m)`) [1]. ISO/IEC 42001 demande des rôles, responsabilités et autorités définis (clause
5.3 ; Annexe A.3.2) [2], et le NIST AI RMF pour les rôles documentés et les lignes de communication
pour le risque d'IA (GOVERN 2.1) [3]. Aucun ne dit comment rendre ce cadre vrai un mardi. C'est le
travail d'ingénierie.

Ce chapitre n'est pas un manuel de programme GRC et pas un conseil juridique. C'est le modèle
opérationnel qui donne aux cinq couches du [stack](/bok/the-stack#how-to-read-the-stack) leurs
propriétaires. La boucle de risque est le chapitre 13
([Où se situe la gestion des risques](/bok/risk-management#the-loop-identify-assess-treat-monitor))
; les contrôles à chaque étape de construction et d'exécution sont les chapitres 14 et 15
([Gouverner le développement de l'IA](/bok/governing-development#the-build-as-a-chain-of-gates),
[Gouverner le déploiement et l'utilisation](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)).

## La carte des parties prenantes

Chaque partie prenante détient un devoir, un droit de décision (ou explicitement aucun) et un
artefact qui evidences le devoir. Si vous ne pouvez pas nommer l'artefact, le devoir n'est pas
encore réel.

| Partie prenante | Devoir dans le programme | Décide | Artefact qu'elle possède ou signe |
|---|---|---|---|
| **Conseil** (organe de gouvernance) | Définit l'appétit pour le risque d'IA ; supervise le programme | Appétit ; la politique d'IA | Déclaration d'appétit ; procès-verbaux du conseil |
| **Direction générale** | Possède les décisions de risque d'IA pour l'entreprise ; finance le programme | Acceptation des risques résiduels les plus élevés | Acceptations de risque signées ; budget |
| **CAIO / CDAO** | Gère la stratégie d'IA et le portefeuille de cas d'usage ; préside le comité | Priorités du portefeuille | Portefeuille ; inventaire des cas d'usage |
| **Comité de gouvernance de l'IA** | Décide ce que les portes ne peuvent pas : risque résiduel, exceptions, compromis de valeur | Exceptions ; go/no-go déclenché | Enregistrements de décision ; registre des exceptions |
| **Juridique** | Lit les obligations ; confirme qu'un contrôle les respecte | Interprétation | Registre des obligations ; clauses contractuelles |
| **Confidentialité / DPO** | Protection des données dès la conception ; AIPD ; droits des personnes concernées | Avis et approbation de l'AIPD | AIPD ; registres des activités de traitement |
| **CISO / sécurité** | Modèle de menace d'IA ; contrôles de sécurité ; réponse aux incidents | Exceptions de sécurité | Modèles de menace ; résultats de test d'intrusion |
| **Risque** (deuxième ligne) | Taxonomie des risques d'IA dans la GER ; défi ; KRI | Méthode de notation | Registre des risques ; seuils KRI |
| **Audit interne** (troisième ligne) | Assurance indépendante sur le programme | Opinion d'audit | Rapports d'audit ; échantillons testés |
| **Propriétaire du produit** | Responsable du cas d'usage, de la valeur et du risque d'un système | Portée ; demande de lancement | Mémorandum de justification ; champ propriétaire du registre |
| **Ingénierie** (ML, données, plateforme) | Construit et exécute le système à l'intérieur des portes | Conception technique | Code ; résultats d'évaluation ; AIBOM |
| **Ingénieur en gouvernance de l'IA** | Construit les portes, le registre et le chemin de preuve | Conception de porte | Code de politique ; magasin de preuves |
| **Approvisionnement** | Admission d'IA pour les achats ; classement des fournisseurs | Approbation du fournisseur, avec risque | Dossier fournisseur ; contrat |
| **HR** | Littératie de la main-d'œuvre ; IA dans les décisions d'emploi ; information des travailleurs | Processus de gestion des personnes | Enregistrements de formation ; avis aux travailleurs |
| **Opérateurs et utilisateurs finaux** | Utilisez les systèmes comme indiqué ; exercez la supervision ; signalez les préoccupations | Remplacement au moment | Journaux de remplacement et d'escalade |
| **Personnes affectées** et représentants | Donnez des commentaires ; contestez les décisions | Aucun formellement ; une voix | Enregistrements de commentaires et de contestation |
| **Fournisseurs** | Fournir des preuves ; notifier les changements et les incidents | Leur propre système | Fiches de modèle ; AIBOM ; avis d'incident |

Quatre lignes ont besoin de plus qu'une cellule.

**Le conseil.** Dans le modèle des trois lignes de l'Institut des auditeurs internes, l'organe de
gouvernance est responsable de la supervision, la direction assume les rôles de première et deuxième
ligne, et l'audit interne fournit une assurance indépendante [4]. Pour l'IA, le conseil approuve
l'appétit et la politique et reçoit des preuves ; il n'examine pas les cas d'usage. NIST énonce le
devoir exécutif clairement : la direction générale « assume la responsabilité des décisions
concernant les risques associés au développement et au déploiement de systèmes d'IA » (GOVERN 2.3)
[3]. Un conseil jamais invité à accepter un risque d'IA n'a pas délégué la décision ; il ne l'a
jamais vu.

**Le CAIO.** Le Chief AI Officer (ou Chief Data and AI Officer) est propriétaire du portefeuille :
quels cas d'usage l'organisation poursuit, et pourquoi. Le modèle public le plus clair est celui du
gouvernement fédéral américain : le mémorandum OMB M-25-21 du 3 avril 2025 a exigé que chaque agence
désigne un CAIO dans les 60 jours, en maintenant l'inventaire des cas d'usage de l'IA et en
établissant « un processus d'examen indépendant des cas d'usage à fort impact avant l'acceptation du
risque » [5]. L'enseignement se transfère : le CAIO est propriétaire de l'inventaire et du processus
d'acceptation, et n'examine pas ses propres cas d'usage.

**Opérateurs.** Un déployeur d'un système à haut risque doit « confier la supervision humaine à des
personnes physiques disposant des compétences, de la formation et de l'autorité nécessaires, ainsi
que du soutien nécessaire » (`Art. 26(2)`) [6]. La compétence et l'autorité sont des faits
organisationnels : un dossier de formation et un droit documenté d'arrêter le système (voir
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

**Personnes affectées.** Les personnes qu'un système décide rarement siègent dans le programme, il
doit donc les atteindre. Les employeurs déployant un système à haut risque sur le lieu de travail
doivent d'abord informer les représentants des travailleurs et les travailleurs affectés
(`Art. 26(7)`) [6]. NIST demande des pratiques qui intègrent les retours des personnes en dehors de
l'équipe qui a construit ou déployé le système (GOVERN 5.1) et des décisions informées par une
équipe diversifiée (GOVERN 3.1) [3]. Un comité d'éthique ou un panel externe ne mérite sa place que
si ses avis sont enregistrés par rapport à une décision et qu'il y est répondu.

## Une RACI de cycle de vie

La RACI indique qui fait quoi à chaque étape du cycle de vie. **R** effectue le travail, **A** en
est responsable (un par ligne), **C** est consulté avant, **I** est informé après.

| Étape | Propriétaire du produit | Ingénierie | Ingénieur en gouvernance de l'IA | Juridique et confidentialité | Sécurité | Risque | Comité | Audit interne |
|---|---|---|---|---|---|---|---|---|
| Admission | A | C | R | C | C | C | I (C si déclenché) | I |
| Conception | A | R | C | C | C | I | I | I |
| Données | A | R | C | R | I | I | I | I |
| Construction | A | R | C | I | C | I | I | I |
| Test | A | R | R | I | R | C | I | I |
| Lancement | A (comité si déclenché) | R | R | C | C | C | C | I |
| Exploitation | A | R | R | I | R | C | I | I |
| Changement | A | R | R | C | C | I | I | I |
| Retrait | A | R | R | C | C | I | I | I |

Trois règles maintiennent le tableau honnête. Le propriétaire du produit est responsable à chaque
étape, car la responsabilité qui se déplace entre les fonctions à mesure qu'un système mûrit est
l'écart par lequel les incidents tombent. L'audit interne est informé partout et responsable nulle
part ; une fois qu'il exécute une tâche de première ou deuxième ligne, il ne peut plus auditer cette
tâche indépendamment [4]. Le comité ne détient le A que pour les cas d'usage déclenchés, il ne
devient donc pas un goulot d'étranglement pour les cas ordinaires.

Une RACI dans une diapositive est une affirmation. Compilez-la plutôt : un `raci.yaml` mappe les
étapes aux rôles, chaque entrée de registre nomme les personnes tenant ces rôles pour ce système, et
le pipeline lit les deux. Une version sans propriétaire de produit nommé échoue l'admission ; une
demande de tirage touchant une politique a besoin de l'examen de son propriétaire (une règle de
propriétaires de code générée à partir du même fichier). Le cadre de responsabilité de
`Art. 17(1)(m)` devient un fichier que vous pouvez comparer [1].

## Le comité décide, les portes appliquent

Les comités ont une mauvaise réputation dans ce livre, et le chapitre 04 la mérite : un conseil qui
évalue les conclusions mensuellement sans pouvoir d'arrêter un lancement est du théâtre. Mais
certaines décisions ne peuvent pas être automatisées, et prétendre le contraire les cache dans la
configuration du pipeline que personne n'examine. Le comité est légitime là où il prend ces
décisions, et seulement là.

### À quoi sert le comité

Quatre types de décision. **Acceptation du risque** : si un risque résiduel au-delà de l'autorité du
propriétaire du produit est acceptable, pour combien de temps et sous quels contrôles
compensatoires. **Exceptions** : si un système peut procéder tout en échouant une règle nommée.
**Arbitrages de valeur** : si un bénéfice justifie un risque qu'aucun seuil ne peut évaluer (une
décision affectant les droits, une population vulnérable). **Politique** : approuver l'ensemble des
politiques et ses changements matériels. Il n'examine pas chaque version, n'écrit pas de contrôles
et ne lance pas d'évaluations ; les portes et les équipes le font.

### Charte et adhésion

Une charte d'une ou deux pages définit le but, les droits de décision, le quorum, l'adhésion, la
cadence, l'escalade, comment les décisions sont enregistrées et comment la charte change. Un noyau
viable est le CAIO ou un délégué (président), juridique, confidentialité, sécurité, risque, un
responsable d'ingénierie senior et un ou deux responsables de produit, avec RH et approvisionnement
pour leurs cas et l'audit interne comme observateur sans droit de vote. Pour l'ampleur, M-25-21 a
demandé aux conseils de gouvernance de l'IA des plus grandes agences (CFO Act) d'inclure
l'informatique, la cybersécurité, les données, le budget, le juridique, la confidentialité, les
droits civils et les libertés civiles, et de consulter des experts externes selon les besoins [5].

### Consultatif ou contraignant

Un comité consultatif recommande et un cadre nommé décide ; un comité contraignant décide dans le
cadre de sa charte. L'un ou l'autre fonctionne si la charte indique lequel, par type de décision. Ce
qui échoue, c'est l'ambiguïté : un comité qui croit avoir approuvé un lancement et un propriétaire
de produit qui croit qu'il a simplement commenté. Un partage courant est contraignant sur les
exceptions et les cas d'usage déclenchés, consultatif sur la stratégie.

### Acceptation du risque et exceptions

Le risque résiduel est accepté par quelqu'un ayant l'autorité de le posséder, pour une durée
limitée. Une matrice d'acceptation rend cela explicite, en utilisant les évaluations du chapitre 13
(seuils illustratifs) :

| Risque résiduel | Qui peut accepter | Validité maximale | Preuves requises |
|---|---|---|---|
| Faible | Propriétaire du produit | 12 mois | Entrée de registre ; portes réussies |
| Moyen | Propriétaire du produit + fonction risque | 6 mois | Contrôles compensatoires nommés |
| Élevé | Comité de gouvernance de l'IA | 3 mois | Dossier de décision ; plan de surveillance |
| Au-delà de l'appétit | Direction générale, rapporté au conseil | 3 mois | Notification du conseil |
| Utilisation interdite | Personne | Non applicable | Bloqué à l'admission |

Une exception est une acceptation de risque pour une règle sur un système. Elle appartient au
référentiel de politique en tant que données, pas dans les minutes. Un dossier (illustratif) :

```yaml
exception:
  id: EXC-2026-014
  rule_id: eval.injection-floor.v4
  system: csa-01
  requested_by: team-support-platform
  justification: "Vendor model update lowered injection resistance; fix scheduled"
  compensating_controls:
    - guardrail.input.injection.v3 in block mode
    - human approval for refunds above the tier-2 limit
  residual_risk: high
  decision_record: DEC-2026-051
  approved_by: ai-governance-committee
  expires: 2026-10-31T23:59:59Z
```

La porte lit le registre. Tant que l'exception est active, la règle retourne `allow` avec l'id
d'exception dans son verdict, de sorte que la preuve montre que la version a réussi *sous une
exception*. Quand elle expire, la même règle échoue à nouveau la construction sans que personne
n'ait besoin de se souvenir. Les exceptions ouvertes par âge deviennent un indicateur du conseil.

### Escalade, déclencheurs et cadence

La plupart des cas d'usage ne parviennent jamais au comité ; ils passent
[admission, obtiennent un niveau](/patterns/use-case-intake-risk-tiering) et passent par les portes.
Les déclencheurs d'examen acheminent le reste :

- une décision ayant un effet juridique ou similaire significatif sur une personne (crédit, emploi,
  assurance, logement, éducation, services publics) ;
- identification ou catégorisation biométrique, reconnaissance des émotions, ou données de
  catégories spéciales ;
- enfants ou autres personnes vulnérables en tant qu'utilisateurs ou sujets ;
- un agent ayant accès en écriture à l'argent, aux dossiers clients ou à l'infrastructure de
  production ;
- des résultats qui ne peuvent pas être expliqués assez bien pour que les personnes qui doivent agir
  dessus les comprennent ;
- toute demande d'exception évaluée comme élevée ou supérieure.

Les exceptions et les cas d'usage déclenchés ont besoin d'un niveau de service (par exemple, une
décision dans les dix jours ouvrables) et d'un chemin asynchrone ; une réunion mensuelle rendrait la
gouvernance l'étape la plus lente de la livraison. Les approbations de politique peuvent être
mensuelles et le rapport du conseil trimestriel. L'escalade s'exécute propriétaire du produit,
comité, direction générale, conseil, avec le déclencheur pour chaque saut écrit dans la charte.

> **En pratique (illustratif)**
> Dans un grand opérateur télécom, les premières réunions du comité ont débattu des versions
> individuelles. Le déplacement des exceptions dans un registre que les portes lisent a changé son
> rôle. Les ingénieurs ont déposé des demandes en tant que demandes de tirage ; le comité a décidé
> dans le délai de service ; la porte a appliqué l'expiration. Les réunions se sont réduites aux cas
> d'usage déclenchés et à la tendance des exceptions ouvertes, et un auditeur pouvait lister chaque
> version qui a été livrée sous une exception avec une seule requête.

## Risque d'entreprise, les trois lignes et l'audit interne

### Risque d'IA dans le registre des risques d'entreprise

Le risque d'IA appartient au registre des risques d'entreprise selon le même appétit, l'échelle
d'évaluation et la ligne de rapport que tout autre risque, avec des catégories d'IA en dessous
(préjudice aux personnes, exposition juridique, sécurité, fiabilité, tiers). ISO/IEC 23894 adapte le
processus de risque ISO 31000 à l'IA et est le pont naturel [7]. Générez la vue d'entreprise à
partir de la vue système : chaque entrée de registre porte ses évaluations et contrôles liés, et le
registre les agrège par catégorie et unité commerciale. Le lien fonctionne dans les deux sens, donc
un changement d'appétit change les règles de niveau et les seuils de porte.

### Les trois lignes, appliquées à l'IA

| Ligne | Qui | Devoirs d'IA | Preuves qu'elle produit |
|---|---|---|---|
| Première | Propriétaires de produits, ingénierie, opérateurs | Construire et exécuter des systèmes à l'intérieur des portes ; posséder leurs risques | Entrées de registre ; résultats d'évaluation ; journaux d'exécution |
| Deuxième | Risque, conformité, confidentialité, sécurité, gouvernance de l'IA | Définir la méthode et la politique ; construire le chemin pavé ; contester les évaluations de première ligne | Politiques en tant que code ; seuils KRI ; dossiers d'examen |
| Troisième | Audit interne | Assurance indépendante sur la conception et l'exploitation des contrôles | Rapports d'audit ; échantillons testés |

L'ingénieur en gouvernance de l'IA siège généralement à la deuxième ligne, construisant des outils
que la première ligne exécute. Le modèle décrit les rôles, pas les cases sur un organigramme ; ce
qui importe, c'est que la troisième ligne reste indépendante de ce qu'elle assure [4].

### Ce que l'audit interne teste

ISO/IEC 42001 demande des audits internes du système de gestion (clause 9.2) [2]. Ils doivent tester
les portes, pas les documents à leur sujet. **Ré-exécution** : réexécutez la décision de politique
pour un échantillon aléatoire de versions à partir des entrées stockées ; le verdict devrait
correspondre au magasin de preuves. **Chasse aux contournements** : comparez ce que la découverte
trouve en cours d'exécution avec le registre, et les déploiements avec les verdicts de porte ; un
déploiement sans verdict est une constatation. **Hygiène des exceptions** : échantillonnez les
exceptions pour un approbateur nommé, une expiration et des contrôles compensatoires qui ont
réellement fonctionné. Les exercices de table (un incident grave simulé, un modèle de fournisseur
retiré du jour au lendemain) testent les chemins de décision qu'aucun exercice de pipeline ne teste.

**Correspondances :** Reglamento de IA `Art. 17(1)(m)` (cadre de responsabilité), `Art. 26(2)` et
`Art. 26(7)` (compétence de surveillance ; informer les travailleurs) · Clauses ISO/IEC 42001
5.1–5.3, 9.2 ; Annexe A.2, A.3 · NIST AI RMF GOVERN 2, 3, 5 · couches 1 Governance-as-Code et 5
Assurance & Continuous Compliance. Les mappages sont illustratifs, pas une affirmation de
conformité.

## Maîtrise de l'IA en tant que code

### Ce que l'article 4 demande après l'Omnibus

L'article 4 du Règlement de l'IA de l'UE s'applique depuis le 2 février 2025. Tel que modifié par le
Règlement (UE) 2026/1744, en vigueur depuis le 27 juillet 2026, il exige que les fournisseurs et les
déployeurs « prennent des mesures pour soutenir le développement de la maîtrise de l'IA » de leur
personnel et d'autres personnes exploitant des systèmes d'IA en leur nom, et précise que cela «
n'exige pas que les fournisseurs ou les déployeurs garantissent un niveau spécifique quelconque de
maîtrise de l'IA d'un individu quelconque » [8][9]. Les questions-réponses de la Commission (mises à
jour le 27 juillet 2026) indiquent que l'obligation demeure sans niveau « suffisant » imposé ; aucun
certificat n'est nécessaire et un registre interne des formations suffira ; les « autres personnes »
incluent les sous-traitants, les prestataires de services et les clients ; les instructions
d'utilisation seules ne suffisent pas ; et les autorités nationales de surveillance du marché
supervisent la règle à partir du 2 août 2026 [10]. Telle est la position en date du 2026-09-24.

La formulation plus souple n'est pas une raison de faire moins. Pour les déployeurs à haut risque,
le devoir plus strict se trouve dans `Art. 26(2)` : la supervision revient à des personnes ayant la
compétence, la formation et l'autorité pour l'exercer [6]. NIST s'attend à une formation en matière
de risques liés à l'IA adaptée aux responsabilités de chaque personne (GOVERN 2.2) [3], et ISO/IEC
42001 traite de la compétence et de la sensibilisation dans les articles 7.2 et 7.3 [2]. La réponse
d'ingénierie aux trois est la maîtrise comme système basé sur les rôles avec registres, non un
diaporama annuel.

### Programmes de formation basés sur les rôles

| Persona | Doit être capable de | Blocs de programme | Déclencheur de mise à jour |
|---|---|---|---|
| Conseil d'administration et cadres dirigeants | Définir l'appétit ; lire le pack KPI/KRI ; accepter ou refuser le risque | Terminologie ; stratégie et appétit ; rôle de fournisseur ou de déployeur | Nouvelle loi ; incident majeur |
| Propriétaires de produits | Rédiger un mémorandum de justification ; classer un cas d'usage ; assumer le risque résiduel | Admission et déclencheurs ; méthode de risque ; politiques par étape | Changement de politique |
| Ingénieurs et data scientists | Construire à l'intérieur des portes ; lire un résultat d'évaluation ; déposer une exception | Chemin pavé ; évaluations ; acquisition de données ; responsabilités en cas d'incident | Nouvelle porte ou nouvel outil |
| Juridique, confidentialité, conformité | Traduire une obligation en règle et inversement | Le stack ; formats de preuves ; comportement du système | Nouvelle obligation |
| Opérateurs ayant des responsabilités de supervision | Lire les résultats ; remplacer, arrêter, escalader | Le système spécifique ; biais d'automatisation ; exercice de remplacement sur l'interface réelle | Nouvelle version du modèle |
| Tout le personnel utilisant des outils d'IA | Utiliser les outils approuvés sur les données autorisées ; signaler les préoccupations | Utilisation acceptable ; classes de données ; le canal de signalement | Annuel ; nouvel outil |
| Approvisionnement et ressources humaines | Repérer l'IA dans un achat ; gérer l'IA dans les décisions relatives aux personnes | Drapeau d'admission ; classement des fournisseurs ; règles d'emploi | Changement de modèle |

Les formats suivent la persona : des exposés de scénarios pour le conseil d'administration, des
laboratoires pour les ingénieurs, des simulations pour les opérateurs, du microapprentissage avec
attestation pour tous les autres.

### Registres de formation et attestation comme condition d'accès

Un registre de formation est une preuve lorsqu'il est structuré, lié à un système et capable
d'expirer (illustratif) :

```json
{ "person": "u-48213", "role": "operator.credit-review",
  "module": "oversight.credit-scorer.v3", "completed": "2026-09-12",
  "assessment": "pass", "systems": ["credit-scorer-02"],
  "expires": "2027-09-12T00:00:00Z", "attested": true }
```

Il devient un contrôle lorsque l'accès en dépend. Le fournisseur d'identité ou la passerelle d'IA
demande au moteur de politique avant d'accorder l'accès (illustratif `OPA/Rego`) :

```rego
package access.ai_tools

import rego.v1

default allow := false

allow if {
  some r in data.training_records[input.user]
  r.module == data.required_module[input.tool]
  r.attested
  time.parse_rfc3339_ns(r.expires) > time.now_ns()
}
```

Un opérateur dont le module a expiré perd la console de remplacement, pas seulement une ligne dans
un rapport ; une nouvelle version du modèle augmente le module requis, de sorte que les opérateurs
se réentraînent avant de le toucher. Le registre est `Art. 4` preuve, la décision d'accès est
`Art. 26(2)` preuve, et les deux atterrissent dans le magasin de preuves sans sprint de collecte.

### Mesurer et rafraîchir la maîtrise

Les taux d'achèvement mesurent la participation. De meilleurs indicateurs sont la couverture par
persona, le temps depuis l'adhésion (ou depuis une nouvelle version du modèle) jusqu'à un registre
actuel, et les signaux de résultat : les taux de remplacement des opérateurs et le temps de décision
(métriques de supervision du chapitre 04), la part des demandes d'exception qui arrivent bien
formées, les préoccupations soulevées par équipe. Rafraîchir sur les événements (une nouvelle loi,
capacité, incident ou outil) ainsi que sur le calendrier.

## Culture de gouvernance

Les contrôles échouent silencieusement lorsque les gens les contournent ; la culture est de savoir
s'ils le font. Trois leviers sont à la portée d'une fonction de gouvernance.

**Champions.** Un champion nommé dans chaque équipe produit, formé plus en profondeur, répond aux
premières questions et examine d'abord les admissions. Les champions mettent à l'échelle la deuxième
ligne sans ajouter à ses effectifs et portent le chemin pavé dans les équipes qui ne rencontreraient
autrement la gouvernance que comme une construction bloquée
([rendre le chemin gouverné le plus facile](/bok/values-and-principles#make-the-governed-path-the-easiest-path)).

**Incitations.** Mesurez les équipes sur les versions via le chemin pavé, les exceptions fermées
avant expiration et les préoccupations soulevées et résolues, jamais sur zéro incident, ce qui
récompense le silence. NIST demande un état d'esprit critique, axé sur la sécurité et des pratiques
qui permettent les tests, l'identification des incidents et le partage d'informations (GOVERN 4.1,
4.3) [3] ; les incitations sont la façon dont cet état d'esprit survit à une date limite.

**Examen sans blâme.** Après un incident d'IA ou un quasi-accident, examinez le système, pas la
personne. La pratique SRE de Google définit un post-mortem sans blâme comme celui qui se concentre
sur « l'identification des causes contributives de l'incident sans inculper un individu ou une
équipe pour un comportement mauvais ou inapproprié » [11]. Sa production d'ingénierie est une porte,
une évaluation ou une politique modifiée, déposée comme une demande de tirage citant l'examen. Un
nombre croissant de quasi-accidents signalés est généralement une bonne nouvelle : l'alternative est
moins de rapports, pas moins d'échecs.

## Un canal pour signaler les préoccupations

Les pipelines capturent ce pour quoi ils ont été construits pour voir. Un data scientist qui
soupçonne qu'un benchmark a été truqué, un opérateur qui voit un modèle de résultats nuisibles, un
ingénieur invité à désactiver un garde-fou avant une démo : ceux-ci ne parviennent au programme que
si les gens peuvent les signaler en toute sécurité, en dehors de la chaîne de commandement qui a
créé le problème. La loi s'attend maintenant à de tels canaux (en date du 2026-09-24) :

| Régime | Qui doit agir | Ce qu'il exige |
|---|---|---|
| Règlement de l'IA de l'UE `Art. 87` avec Directive (UE) 2019/1937 [12][13] | Entités juridiques privées avec 50 travailleurs ou plus, par le droit national de transposition | Canaux internes et suivi (Art. 8) ; accusé de réception dans les sept jours et retour d'information dans les trois mois (Art. 9(1)(b), (f)) ; aucune représaille (Art. 19) |
| Californie SB 53, Code du travail §1107.1 [14][15] | Développeurs de frontière ; le devoir de processus interne s'applique aux grands développeurs de frontière | Aucune règle empêchant les employés couverts de divulguer au procureur général ou à d'autres autorités ; aucune représaille ; avis des droits ; un processus interne anonyme avec mises à jour mensuelles au rapporteur, partagées avec les officiers et les administrateurs au moins trimestriellement |
| ISO/IEC 42001 Annexe A.3.3 [2] | Organisations mettant en œuvre la norme (volontaire) | Un processus de signalement des préoccupations concernant les systèmes d'IA |

L'article 87 applique la Directive sur les lanceurs d'alerte aux rapports d'infractions au Règlement
de l'IA à partir du 2 août 2026 [12]. SB 53, en vigueur depuis le 1er janvier 2026, protège les «
employés couverts » (ceux responsables d'évaluer, de gérer ou de traiter le risque d'incidents
critiques de sécurité) qui divulguent qu'les activités d'un développeur de frontière posent « un
danger spécifique et substantiel pour la santé ou la sécurité publique résultant d'un risque
catastrophique » ou violent le Règlement [14][15].

Construisez le canal comme tout système gouverné. L'admission accepte les rapports anonymes et
nommés par plus d'une route. Chaque rapport devient un registre de cas avec les horloges statutaires
codées comme des minuteurs, pas des rappels. Le triage achemine un incident possible vers le
[Pipeline d'incidents](/patterns/incident-pipeline), une infraction possible vers le juridique, une
lacune politique vers le comité. L'identité du rapporteur est scellée par rapport aux personnes
nommées, et les RH surveillent les signaux de représailles (actions de performance soudaines,
changements d'accès) autour des rapporteurs protégés. Les volumes, la conformité des horloges et les
résultats remontent sans identités. Ceci esquisse l'ingénierie ; ce n'est pas un conseil sur une loi
nationale de transposition.

## KPI et KRI pour la direction et le conseil d'administration

La direction a besoin de quelques indicateurs sur lesquels elle peut compter, calculés à partir de
systèmes en direct plutôt que d'auto-déclaration. Un **KPI** indique si le programme fait son
travail ; un **KRI** indique si le risque se rapproche du bord de l'appétit.

| Indicateur | Type | Définition | Produit par |
|---|---|---|---|
| Couverture du registre | KPI | Part des systèmes et agents d'IA découverts avec une entrée de registre et un propriétaire | Couche 02 ; [Shadow-AI Discovery](/patterns/shadow-ai-discovery) |
| IA non enregistrée trouvée | KRI | Nombre d'IA en cours d'exécution sans entrée, par niveau | Découverte de la couche 02 |
| Couverture des portes | KPI | Part des versions de production qui ont traversé une porte d'évaluation | Couche 03 |
| Exceptions ouvertes par âge | KRI | Exceptions en direct, les plus anciennes en premier ; les expirées sont signalées | Registre des exceptions (couche 01) |
| Temps de décision | KPI | Jours médians de l'admission à la décision go/no-go, par niveau | Flux de travail d'admission |
| Évaluations actuelles | KPI | Systèmes à haut risque avec une AIPD ou une AIPD actuelle | Couche 02 |
| Incidents et temps de confinement | KRI | Incidents d'IA par gravité ; temps médian de détection et de confinement | Couches 04 et 05 |
| Qualité de la supervision | KRI | Taux de remplacement et temps de décision aux points de contrôle humains | Couche 04 |
| Couverture de la maîtrise | KPI | Part de chaque persona avec un registre de formation actuel | Registres de formation |
| Horloges de préoccupation respectées | KPI | Rapports reconnus dans les sept jours et répondus dans les trois mois | Canal de préoccupation |
| Révaluations de fournisseurs en retard | KRI | Fournisseurs de niveau 1 passé leur date de révaluation | Fichier d'approvisionnement |
| Réduction effective du risque | KPI | Changement du taux de modes de défaillance nommés en production | Couche 05 |

La dernière ligne compte le plus et est la plus difficile à remplir, c'est pourquoi elle appartient
au pack du conseil d'administration dès le départ
([valeur 7](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage)).
Les indicateurs de couverture sont des entrées ; le chapitre 07
([métriques par niveau](/bok/maturity-model#metrics-per-level)) montre les métriques d'ingénierie en
dessous. Le pack du conseil d'administration est une page : tendances pour six à huit indicateurs,
tout ce qui dépasse le seuil, les décisions que le conseil d'administration doit prendre, les
exceptions au-dessus de l'appétit. Une requête le génère ; un pack assemblé à la main s'écarte des
systèmes qu'il décrit.

## Examen de la direction et amélioration continue

Un système de gestion ne s'améliore que si quelqu'un examine les preuves selon un calendrier et
change quelque chose. ISO/IEC 42001 demande la surveillance et la mesure, l'audit interne et
l'examen de la direction (articles 9.1 à 9.3) et l'amélioration continue avec action corrective
(articles 10.1 et 10.2) ; lisez la norme pour les entrées et sorties requises [2]. Un examen peut
servir plusieurs systèmes de gestion
([intégration d'ISO/IEC 42001 avec 27001, 27701 et 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001),
chapitre 22). NIST demande un examen périodique planifié du processus de risque, avec les rôles et
la fréquence définis (GOVERN 1.5) [3].

Concevez l'examen pour produire des changements, non des procès-verbaux. Entrées : le pack KPI/KRI,
les conclusions d'audit, les incidents et quasi-accidents, les préoccupations, les changements de
loi et de normes, les actions correctives ouvertes. Sorties, enregistrées comme données : un diff de
politique avec une date d'entrée en vigueur, un changement de seuil, une décision d'allocation de
ressources, une action corrective avec propriétaire et date limite. Suivez les actions correctives
comme `OSCAL` suit un plan d'action et des jalons (chapitre 04), de sorte que chaque examen commence
par ce qui a été promis et ce qui a été fait. Un examen qui ne change rien pendant deux cycles
signifie que les preuves ne l'atteignent pas, ou ne sont pas crues.

**Correspondances :** Règlement de l'IA de l'UE `Art. 4` (maîtrise de l'IA), `Art. 26(2)`
(compétence de contrôle), `Art. 87` (signalement des infractions) · Directive (UE) 2019/1937 ·
California SB 53 (Labor Code §1107.1) · ISO/IEC 42001 clauses 7.2–7.3, 9.1–9.3, 10.1–10.2 ; Annexe
A.3.3 · NIST AI RMF GOVERN 1.5, 2.2, 4 · couches 1 Governance-as-Code et 5 Assurance & Continuous
Compliance.

## Stratégie, valeur et question de l'utilisation de l'IA

La gouvernance commence généralement après que quelqu'un a décidé de construire. Elle devrait
commencer une étape plus tôt. Le NIST AI RMF s'attend à ce que les objectifs de l'IA et la valeur
commerciale de chaque cas d'usage soient documentés (MAP 1.3, 1.4), que les avantages et les coûts
soient examinés, y compris les coûts non monétaires des erreurs (MAP 3.1, 3.2), et, après la
cartographie, une « décision initiale go/no-go sur la question de savoir s'il faut concevoir,
développer ou déployer un système d'IA » ; plus tard, il demande à nouveau si le développement ou le
déploiement doit se poursuivre (MANAGE 1.1) [3].

Faites de la question un champ obligatoire. Un mémorandum de justification à l'admission
(illustratif) :

```yaml
use_case: refund-triage-assistant
owner: team-support-platform
problem: "Refund requests wait days for a first answer"
non_ai_alternative: "Rules engine plus extra staff at peak"
why_ai: "Free-text requests; the rules engine misroutes a large share"
benefit_metric: "Median time to first answer"
who_bears_errors: "Customers wrongly refused a refund"
contest_route: "Human review on request, within two working days"
reversible: true
kill_criteria: "Wrong-refusal rate above the tier threshold for two weeks"
```

Cinq questions décident la plupart des cas. Y a-t-il une alternative sans IA à un coût acceptable ?
Le bénéfice peut-il être mesuré, et par qui ? Qui supporte les erreurs, et peuvent-elles les
contester ? La décision est-elle réversible ? Qu'est-ce qui nous ferait arrêter ? Un cas d'usage qui
ne peut pas répondre à la dernière question n'est pas prêt pour une porte, car il n'y a pas de seuil
à appliquer.

Consolidés, les mémorandums constituent le portefeuille d'IA : où l'organisation dépense, quels
risques elle porte, quels bénéfices elle a mesurés. Ils répondent également à l'accusation selon
laquelle la gouvernance ralentit seulement les choses. « Délai de décision » est un KPI du
programme, et un chemin pavé qui amène un cas d'usage à faible risque de l'admission à la production
en quelques jours est la façon dont la gouvernance permet la livraison plutôt que de la taxer.

## Mettre en place un programme sans capacité d'ingénierie

De nombreuses organisations qui ont besoin d'un programme ne construisent pas d'IA du tout ; elles
l'achètent. L'approche axée sur l'ingénierie du chapitre 04
([la pile minimale viable pour une équipe d'une personne](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one))
suppose un pipeline pour mettre en place des portes. Un acheteur a toujours des pipelines :
approvisionnement, identité et dépenses. Construisez sur ceux-ci.

| Pilier | Artefact minimum | Appliqué par |
|---|---|---|
| Charte et portée | Charte du programme ; charte du comité | Approbation du parrain exécutif |
| Inventaire | Registre avec propriétaire, fournisseur, classes de données et niveau | Admission à l'approvisionnement ; catalogue d'applications d'authentification unique ; examen des dépenses |
| Ensemble de politiques | Utilisation acceptable ; admission à l'IA ; IA tierce | Approbation d'achat ; contrôles de passerelle ou de navigateur |
| Rôles | Propriétaire nommé par système ; adhésion au comité | Champ de registre obligatoire |
| Maîtrise | Modules basés sur les rôles ; dossiers de formation | Accès aux outils conditionné par une attestation |
| Métriques | Cinq indicateurs du tableau ci-dessus | Requête mensuelle sur les données de registre et d'approvisionnement |
| Cadence d'examen | Examen de gestion trimestriel | Décisions enregistrées comme données |

Un premier 90 jours : charte, comité, politique d'utilisation acceptable et inventaire alimenté par
l'approvisionnement et le catalogue d'authentification (jours 1 à 30) ; l'indicateur d'IA dans les
demandes d'achat, classement par niveau de ce qui est déjà acheté, modules pour les opérateurs des
systèmes les plus risqués (jours 31 à 60) ; le premier pack KPI, le premier examen de gestion et une
décision sur le contrôle à automatiser en premier (jours 61 à 90). La note Q&R de la Commission note
que l'article 4 ne mandate aucune structure de gouvernance spécifique [10] ; dimensionnez le
programme à ce que l'organisation exécute et développez le code avec le portefeuille. Le chapitre 13
définit la part de la boucle de risque que chaque type d'organisation exécute
([gouvernance proportionnée](/bok/risk-management#proportionate-governance-tailoring-the-loop)), et
la page des modèles contient des sections de démarrage
[comité, RACI et politique d'IA](/resources/templates#tpl-kit).
## Politiques tout au long du cycle de vie

### Politique, norme, procédure, code

Les documents de politique échouent en étant trop vagues pour être appliqués ou trop détaillés pour
rester à jour. Une hiérarchie à quatre niveaux donne à chaque niveau un travail.

| Niveau | Réponses | Approuvé par | Changements | Exemple |
|---|---|---|---|---|
| Politique | Pourquoi et quoi : principes, appétit, portée | Conseil ou comité | Rarement | « Aucun système d'IA n'atteint la production sans propriétaire et sans avoir réussi la porte d'évaluation. » |
| Norme | Exigences mesurables par niveau | Comité ou délégué | Trimestriel | « Les systèmes de niveau 2 et 3 obtiennent au moins 0,95 sur la suite d'injection. » |
| Procédure | Comment, étape par étape | Propriétaire de fonction | Selon les besoins | « Exécutez la porte localement ; joignez le résultat à l'entrée du registre. » |
| Politique en tant que code | La règle appliquée | Examen du code avec le propriétaire de la politique | Chaque changement est une demande de tirage | `eval.injection-floor.v4` |

ISO/IEC 42001 demande une politique d'IA (clause 5.2) et a des contrôles sur les politiques liées à
l'IA (Annexe A.2) [2] ; NIST demande que les politiques et procédures de risque d'IA soient en
place, transparentes et mises en œuvre efficacement (GOVERN 1) [3]. La hiérarchie ajoute une règle
d'ingénierie : chaque règle en code porte les identifiants de la norme et de la politique qu'elle
met en œuvre, de sorte qu'un lecteur peut aller d'une construction échouée à la phrase que le
conseil a approuvée.

### Ce que la politique exige à chaque étape

Chaque étape a une exigence minimale, une porte qui l'applique et la preuve qu'elle laisse. Les
chapitres 14 et 15 traitent les étapes de construction et d'exécution en profondeur.

| Étape | La politique exige | Porte qui l'applique | Preuve | Couche |
|---|---|---|---|---|
| Admission | Mémorandum de justification ; niveau de risque ; écran d'utilisation interdite ; déclencheurs d'examen | L'admission écrit une ébauche de registre ; pas d'ébauche, pas de déploiement | Entrée de registre ; enregistrement de niveau | 1 · 2 |
| Conception | [Modèle de menace](/patterns/ai-threat-model) ; conception de la surveillance ; évaluation d'impact lorsqu'elle est déclenchée | Examen de conception comme vérification obligatoire | Modèle de menace ; référence FRIA/DPIA | 1 · 3 |
| Données | Enregistrement d'acquisition ; base juridique ; licence ; contrôles de qualité et de biais | [Le pipeline refuse un ensemble de données sans une fiche de données valide](/patterns/dataset-admission-gate) | Fiche de données ; lignée | 2 · 3 |
| Construction | Modèles et plateformes approuvés ; invites versionnées, récupération et outils ; AIBOM | Vérifications de politique CI ; liste blanche de modèles | AIBOM ; verdicts de politique | 1 · 2 |
| Test | Catégories d'évaluation requises et seuils par niveau ; red teaming pour les niveaux supérieurs | Porte d'évaluation | Résultats d'évaluation | 3 |
| Lancement | Package de déploiement complet ; approbations ; avis de transparence | Le contrôle d'admission lit le registre | Enregistrement de version ; fiche de modèle | 1 · 2 · 5 |
| Exploitation | Surveillance ; surveillance ; définition d'incident et échelle de gravité ; journalisation | Guardrails ; alertes ; pipeline d'incident | Traces ; événements de guardrail ; enregistrements d'incident | 4 · 5 |
| Changement | Déclencheurs de changement matériel pour la portée du modèle, de l'invite, des données et des outils | Les portes se réexécutent au changement ; version du registre augmentée | Diff ; nouveaux résultats d'évaluation | 1 · 3 |
| Retrait | Révoquer les identités, archiver les preuves, supprimer ou conserver les données | Statut du registre `retired` ; identité révoquée | Enregistrement de décommissionnement | 2 · 4 · 5 |

Trois étapes manquent souvent des ensembles de politiques. **Opérer** a besoin d'une définition
d'incident plus large que celle de la loi. L'« incident grave » de la loi sur l'IA couvre la mort ou
les dommages graves à la santé, la perturbation grave et irréversible des infrastructures critiques,
la violation des obligations en matière de droits fondamentaux et les dommages graves aux biens ou à
l'environnement [16] ; la plupart des incidents qu'un programme doit apprendre se situent en dessous
de cette ligne (un lot biaisé, une invite divulguée, un appel d'outil hors de portée). Acheminez
chaque gravité par un pipeline et laissez seulement la classe supérieure démarrer une horloge
statutaire (chapitre 17,
[Incidents, problèmes et causes profondes](/bok/incidents#a-severity-scale-mapped-to-the-clocks)).
Les responsables du déploiement à haut risque doivent également informer le fournisseur et suspendre
l'utilisation s'ils ont des raisons de considérer que le système présente un risque (`Art. 26(5)`)
[6]. **Changement** a besoin de déclencheurs, car une modification d'invite ou une nouvelle source
de récupération peut changer le comportement autant qu'un nouveau modèle. **Retirer** a besoin d'un
[runbook](/patterns/deactivation-localisation-retirement-runbook) : NIST demande un
décommissionnement sûr « d'une manière qui n'augmente pas les risques » (GOVERN 1.7) [3], ce qui
signifie révoquer chaque identité et credential, marquer l'entrée du registre comme retirée,
archiver la preuve pour sa période de rétention et appliquer les règles de rétention aux données de
formation et dérivées.

### Politique en tant que code : une source, deux sorties

La dérive entre un PDF de politique et la vérification qui l'applique est l'endroit où les auditeurs
trouvent leurs conclusions. Écrivez chaque règle une fois, comme données, et compilez-la deux fois :
en prose que les gens lisent et en vérification que le pipeline exécute. La source (illustrative) :

```yaml
id: AIP-07
title: Evaluation before release
owner: ai-governance-committee
effective: 2026-10-01
maps_to: ["EU AI Act Art. 15", "ISO/IEC 42001 A.6", "NIST AI RMF MEASURE"]
rules:
  - rule_id: eval.injection-floor.v4
    applies_to_tiers: [2, 3]
    suite: injection-resistance.v4
    threshold: 0.95
    exceptions: register
```

Le compilateur de prose rend : « AIP-07.1. Un système d'IA de niveau 2 ou 3 est libéré uniquement si
sa dernière exécution `injection-resistance.v4` obtient au moins 0,95. Les exceptions suivent le
registre des exceptions. Propriétaire : comité de gouvernance de l'IA. En vigueur le 1er
octobre 2026. » Le compilateur de code rend la vérification (illustratif `OPA/Rego`) :

```rego
package aip07

import rego.v1

deny contains msg if {
  input.system.tier in {2, 3}
  r := input.evals["injection-resistance.v4"]
  r.score < 0.95
  not exception_active(input.system.id, "eval.injection-floor.v4")
  msg := sprintf("AIP-07 eval.injection-floor.v4: %s scored %v, below 0.95", [input.system.id, r.score])
}

exception_active(sys, rule) if {
  some e in data.exceptions
  e.system == sys
  e.rule_id == rule
  time.parse_rfc3339_ns(e.expires) > time.now_ns()
}
```

Les deux sorties proviennent d'un commit, de sorte que la politique publiée et la règle appliquée ne
peuvent pas être en désaccord. La même source alimente le
[Framework Crosswalk](/patterns/framework-crosswalk) et, pour les agents, une
[Policy Card](/patterns/policy-card). Les tests prouvent que la règle se déclenche sur une entrée
violante et réussit une entrée propre, comme la couche 01 l'exige.

## Mise à jour des politiques que vous avez déjà

La plupart des organisations n'ont pas besoin d'une nouvelle politique pour chaque préoccupation
liée à l'IA. Ils ont besoin que leurs politiques de confidentialité, de sécurité, de gouvernance des
données et de propriété intellectuelle voient l'IA. Une évaluation des lacunes trouve où elles ne le
font pas.

1. **Inventoriez** chaque politique qui touche les systèmes d'IA ou leurs données, y compris
   l'approvisionnement, les RH, les dossiers et l'utilisation acceptable.
2. **Testez chacun contre les cinq objets** (modèle, système, agent, données, organisation) et les
   étapes du cycle de vie : nomme-t-il l'objet, contient-il une règle qui s'y applique, et dit-il
   quelles preuves montrent que la règle est suivie ?
3. **Décidez : étendre ou créer.** Étendez quand le propriétaire existant et le contrôle conviennent
   (une règle de rétention qui a seulement besoin d'artefacts de modèle ajoutés). Créez quand un
   nouvel objet a besoin d'un nouveau propriétaire (l'identité de l'agent n'a pas de place dans une
   politique de contrôle d'accès classique).
4. **Classez chaque lacune comme données** (politique, clause, lacune, décision, propriétaire, date
   limite, preuve), de sorte que le registre des lacunes est une requête et sa fermeture un KPI.

| Politique | Lacunes typiques d'IA | Ajouts typiques | Preuve |
|---|---|---|---|
| Confidentialité | Base juridique pour l'entraînement par rapport à l'inférence ; limitation de la finalité sur la réutilisation ; ce que les modèles mémorisent ; avis ; droits sur les modèles et les sorties ; rétention des données de formation et dérivées | Balises de finalité d'ensemble de données ; déclencheurs DPIA pour l'IA ; procédure pour [demandes de droits contre les modèles](/patterns/rights-requests-against-models) | DPIA ; fiche de données ; journal des demandes de droits |
| Sécurité | Injection de prompt, empoisonnement, extraction de modèle et menaces de chaîne d'approvisionnement manquent de l'évaluation des risques et des playbooks ; pas de sources de modèles de confiance | Menaces d'IA dans l'évaluation des risques du ISMS ; playbooks d'incident d'IA ; liste blanche de modèles et d'ensembles de données | Modèle de menace ; résultats de red-team ; liste blanche |
| Gouvernance des données | Lignage sans provenance ; données grattées, courtées et synthétiques sans étiquette ; aucune rétention par couche | Politique d'acquisition (ci-dessous) ; champs de provenance ; rétention pour données brutes, caractéristiques, étiquettes et poids | Fiche de données ; graphe de lignage |
| Propriété intellectuelle | Droits de formation et refus de l'exploitation de textes et de données ; utilisation des résultats ; secrets commerciaux dans les prompts ; licences de poids ouverts ; indemnités des fournisseurs | Examen des droits par ensemble de données ; règles d'utilisation des résultats ; règles de prompt par classe de données ; examen de la licence du modèle | [Registre des droits](/patterns/training-data-rights-ledger) ; registres de licences |

Trois remarques. Pour la **sécurité**, le catalogue des menaces agentiques (détournement d'objectif,
mauvais usage d'outils, abus d'identité et de privilèges, agents renégats) est la liste de contrôle
à ajouter à votre modèle de menace existant [17]. Pour la **gouvernance des données**, gardez bien
cette distinction : le *lignage* est le chemin que les données ont parcouru dans vos pipelines ; la
*provenance* est d'où elles viennent et à quelles conditions. Un lignage parfait sur une provenance
inconnue reste non gouverné. Pour la **propriété intellectuelle**, le droit de l'UE permet aux
titulaires de droits de réserver les œuvres de l'exploitation de textes et de données « de manière
appropriée, notamment par des moyens lisibles par machine dans le cas de contenus mis à disposition
du public en ligne » (Directive (UE) 2019/790, art. 4, paragraphe 3) [18], et les fournisseurs de
modèles à usage général doivent avoir une politique pour identifier et respecter ces réserves
(`Art. 53(1)(c)`) [19]. Les chapitres 19 et 20
([Droit de la protection des données et de la vie privée appliqué à l'IA](/bok/privacy-and-ai#principles-applied-to-ai),
[Autre droit qui s'applique déjà à l'IA](/bok/existing-law#how-to-read-this-chapter)) couvrent le
droit ; le rôle de la politique est de rendre chaque règle vérifiable.

## Une politique d'acquisition de données

La plupart des défaillances de gouvernance des données sont décidées à l'acquisition : un scrape que
personne n'a délimité, un ensemble de données d'un courtier sans provenance, des étiquettes
produites dans des conditions que personne n'a vérifiées. ISO/IEC 42001 a un contrôle en Annexe A
sur l'acquisition de données (A.7.3) [2]. La politique nomme les sources acceptables et les
conditions minimales pour chacune, et fait de chaque condition un champ du registre d'acquisition.

| Source | Conditions minimales | Champ de preuve |
|---|---|---|
| Données de première partie collectées à une autre fin | Compatibilité de finalité évaluée ; avis mis à jour ; AIPD si déclenchée | Étiquette de finalité ; base légale |
| Web scraping | Sources sensibles exclues ; réserves lisibles par machine et fichiers d'exclusion respectés ; liste de refus honorée ; collecte limitée dans le temps | Hash de configuration du crawler ; versions de la liste d'exclusion et de refus |
| Courtiers en données et ensembles de données sous licence | Chaîne de provenance ; garanties de base légale ; licence couvrant la formation à l'IA ; droit d'audit ; suppression sur demande | Identifiant du contrat ; déclaration de provenance |
| Données étiquetées ou annotées | Directives écrites ; pilote ; accord entre annotateurs au-dessus d'un seuil ; rémunération et conditions standard ; assurance qualité | Version de la directive ; score d'accord ; attestation du fournisseur |
| Données partagées par un partenaire | Accord couvrant la finalité, la rétention, le partage ultérieur, la sécurité, la suppression, la notification de violation et l'audit | Identifiant de l'accord |
| Données synthétiques | Générateur et données de départ enregistrés ; étiquetés comme synthétiques ; test de réidentification | Version du générateur ; résultat du test |

La ligne de scraping suit l'Avis 28/2024 du Comité européen de la protection des données, dont les
mesures d'atténuation incluent l'exclusion de certaines sources et catégories de données, le respect
des « fichiers robots.txt ou ai.txt ou tout autre mécanisme reconnu » qui s'oppose au scraping, et
une liste de refus gérée par le responsable du traitement [20]. La ligne d'étiquetage suit les
conseils du Partnership on AI sur l'approvisionnement en travaux d'enrichissement de données, qui
couvrent la sélection des fournisseurs, les pilotes, les instructions claires, les conditions de
paiement, la communication avec les travailleurs, l'assurance qualité et le départ [21]. Les
conditions des annotateurs sont une question de gouvernance : les étiquettes produites à la hâte
selon des instructions peu claires deviennent le bruit et le biais que la suite d'évaluations doit
ensuite trouver.

Appliquer à la limite du pipeline : aucun ensemble de données n'entre dans un pipeline
d'entraînement, d'ajustement fin ou de récupération sans un registre d'acquisition qui passe la
validation du schéma, et le registre s'écoule dans la fiche de données et l'[AIBOM](/patterns/aibom)
(voir [gouvernance des données dans le stack](/bok/the-stack#data-governance-across-the-stack)).

## Politique d'IA tierce

La plupart des IA qu'une organisation exécute, elle les a achetées. Le chapitre 04 explique comment
le stack se dégrade pour l'IA achetée
([IA tierce et achetée](/bok/the-stack#third-party-and-procured-ai)), et le chapitre 05 donne la
[Porte de diligence raisonnable du fournisseur / modèle](/patterns/vendor-model-due-diligence-gate).
ISO/IEC 42001 couvre les relations avec les tiers et les clients en Annexe A.10 [2] ; NIST demande
des politiques sur le risque d'IA tierce, y compris la violation de la propriété intellectuelle
tierce, et des processus de contingence pour les défaillances dans les données ou systèmes tiers à
haut risque (GOVERN 6.1, 6.2) [3].

**Prise en charge de l'approvisionnement.** Chaque demande d'achat porte un drapeau IA : le produit
utilise-t-il l'IA, traite-t-il nos données avec l'IA, s'entraîne-t-il sur nos données, agit-il sur
nos systèmes, ou prend-il ou soutient-il des décisions concernant des personnes ? Un oui l'achemine
vers la classification. Le cas plus discret est l'IA arrivant à l'intérieur d'un produit déjà acheté
: une note de version ajoutant une fonctionnalité d'IA à un contrat existant déclenche la même prise
en charge.

**Classification des fournisseurs.** Classez par criticité, sensibilité des données, autonomie et
contexte réglementaire, et adaptez l'évaluation à la classe.

| Classe | Profil typique | Évaluation | Réévaluation |
|---|---|---|---|
| 1 | Décisions concernant des personnes ; utilisation à haut risque ; agents avec accès en écriture ; données de catégories spéciales | Diligence raisonnable complète ; évaluations de limite ; ensemble de clauses complet ; approbation du comité | Annuelle et sur déclencheurs |
| 2 | Productivité interne sur données confidentielles | Questionnaire avec preuves ; ensemble de clauses standard | Tous les deux ans et sur déclencheurs |
| 3 | Aucune donnée confidentielle ; aucune décision concernant des personnes | Vérification légère ; couverte par l'utilisation acceptable | Au renouvellement |

**Conditions contractuelles comme contrôles.** Une clause est un contrôle quand elle crée quelque
chose que vous pouvez surveiller. La Commission publie des clauses contractuelles d'IA modèles pour
les acheteurs publics dans une version à haut risque et une version à risque non élevé, volontaires
et délibérément silencieuses sur la propriété intellectuelle, le paiement et la protection des
données ; la version sur sa page est datée du 29 septembre 2023 (au 2026-09-24) [22]. Elles
constituent une bonne bibliothèque de départ pour les acheteurs privés aussi.

| Clause | Contrôle qu'elle crée | Preuve ou surveillance |
|---|---|---|
| Divulgation de l'utilisation de l'IA et des sous-traitants | Complétude de l'inventaire ; carte des tiers | Registre des fournisseurs ; AIBOM fourni |
| Pas de formation sur les données des clients sans consentement explicite | Limitation de finalité | Drapeau du contrat ; attestation ; vérification de configuration |
| Avis de changement matériel (modèle, version, comportement) | Déclencheur pour réévaluation | L'avis lance une réexécution d'évaluation de limite |
| Fenêtre de notification d'incident | Entrée dans votre propre horloge d'incident | Horodatage de l'avis dans le pipeline d'incident |
| Preuves et droits d'audit | Preuves collectées | Fiche de modèle, résultats d'évaluation et certificats dans le magasin de preuves |
| Devoir de test de biais et de remédiation | Preuves d'équité pour votre utilisation | Rapports de test des fournisseurs |
| Désactivation, retour de données et sortie | Un interrupteur d'arrêt contractuel | Runbook de sortie testé |
| Responsabilité et indemnité, y compris propriété intellectuelle | Transfert de risque, pas réduction de risque | Registre des contrats |

**Chaîne d'approvisionnement et open source.** Le modèle fondamental sous le produit d'un
fournisseur est une dépendance que vous héritez ; cartographiez ces tiers. La chaîne de valeur peut
aussi changer votre rôle : selon `Art. 25`, un distributeur, importateur, responsable de
l'implantation ou autre tiers qui met son nom ou sa marque sur un système à haut risque, le modifie
substantiellement, ou change la finalité prévue d'un système de sorte qu'il devient à haut risque
est traité comme son fournisseur [23]. Les modèles de poids ouverts et les ensembles de données
ouverts passent par la même prise en charge : licence et restrictions d'utilisation examinées,
provenance enregistrée, artefacts scannés et épinglés avant chargement, résultats dans l'AIBOM.
Réévaluez sur événements, pas seulement au renouvellement : un incident, un changement de propriété,
une nouvelle version de modèle, une controverse publique ou une action réglementaire, un changement
dans la loi.

**Personnes.** L'IA utilisée pour le recrutement et la sélection, la promotion ou la résiliation,
l'allocation de tâches, ou la surveillance et l'évaluation des travailleurs est à haut risque selon
l'Annexe III point 4 [24], avec le devoir d'information des travailleurs de `Art. 26(7)` pour les
responsables de l'implantation [6]. Les annotateurs, entrepreneurs et examinateurs externalisés qui
traitent vos données font partie de la chaîne d'approvisionnement, selon les conditions
d'acquisition ci-dessus [21].

## Utilisation acceptable de l'IA par le personnel

Le glossaire définit l'IA fantôme comme l'IA fonctionnant en production sans s'enregistrer.
L'utilisation par le personnel d'outils non approuvés en est le jumeau quotidien : un employé
collant un fichier client dans un chatbot public. Une politique d'utilisation acceptable (AUP)
couvre les outils approuvés, les entrées interdites par classe de données, le devoir d'examiner les
résultats, la divulgation où les résultats atteignent les clients, la journalisation, l'attestation
requise avant l'accès et les conséquences proportionnées.

| Classe de données | Outil d'IA public | Passerelle d'IA sanctionnée | Système interne approuvé |
|---|---|---|---|
| Public | Autorisé | Autorisé | Autorisé |
| Interne | Non autorisé | Autorisé, journalisé | Autorisé |
| Données confidentielles ou client | Non autorisé | Cas d'utilisation approuvés uniquement ; journalisés ; expurgés | Autorisé dans le cadre |
| Données de catégories spéciales ou réglementées | Non autorisé | Uniquement avec un cas d'utilisation soutenu par AIPD | Autorisé dans le cadre |
| Secrets, identifiants, code restreint | Non autorisé | Non autorisé | Par norme de sécurité |

Appliquer avec la [passerelle](/patterns/sanctioned-ai-gateway), pas le manuel : outils approuvés
derrière une authentification unique et une passerelle qui applique les règles de classe de données
et journalise l'utilisation ; accès conditionnel à une attestation AUP actuelle (la porte de
littératie ci-dessus) ; découverte d'outils non approuvés par les données d'identité, de réseau et
de dépenses (le modèle [Découverte d'IA fantôme](/patterns/shadow-ai-discovery)). Quand la
découverte trouve un outil non approuvé, offrez un moyen d'entrer (enregistrer, classer, approuver
ou remplacer) avant une sanction. Les gens utilisent des outils non approuvés parce que le chemin
approuvé est plus lent ; la solution est généralement un meilleur chemin.

> **Exemple (illustratif)**
> Une équipe juridique commence à utiliser un assistant de rédaction public pour les résumés de
> contrats. La découverte signale le trafic. Plutôt que de bloquer le domaine, le programme exécute
> l'outil via la prise en charge de l'approvisionnement, signe un accord d'entreprise sans formation
> sur les données client, l'achemine via la passerelle selon la règle de données confidentielles, et
> ajoute un module d'une page au curriculum de l'équipe juridique. L'utilisation passe à
> l'itinéraire sanctionné en quelques semaines, car c'est maintenant le plus facile.

**Correspondances :** Règlement de l'IA `Art. 25` (chaîne de valeur), `Art. 26` (devoirs du
responsable de l'implantation), `Art. 53(1)(c)` (politique de droits d'auteur GPAI), Annexe III
point 4 (emploi) · Directive (UE) 2019/790 `Art. 4(3)` · ISO/IEC 42001 clause 5.2 ; Annexe A.2,
A.7.3, A.10 · NIST AI RMF GOVERN 1, 6 ; MAP 1, 3 ; MANAGE 1.1 · couches 1 Gouvernance en tant que
code, 2 Inventaire & Transparence et 5 Assurance continue & Conformité.

## Ce que vous pouvez faire cette semaine

1. **Écrivez la charte du comité sur une page**, énumérant les quatre types de décisions que seul le
   comité prend et déclarant que les portes appliquent tout le reste.
2. **Créez le registre des exceptions** comme un fichier dans le référentiel de politique, pointez
   une porte dessus et définissez une expiration maximale.
3. **Conditionner un outil de la première porte sur la formation** : rendre l'accès à la console de
   dépassement de votre système le plus risqué, ou à votre passerelle d'IA, conditionnel à un
   enregistrement de formation actuel.
4. **Générer trois indicateurs de conseil à partir de données en direct** : couverture du registre,
   IA non enregistrée détectée et exceptions ouvertes par ancienneté.
5. **Exécuter l'évaluation des lacunes sur deux politiques** (confidentialité et sécurité) par
   rapport aux cinq objets, et classer chaque lacune en tant que ligne avec un propriétaire.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(a) strategy for regulatory compliance; Art. 17(1)(m) accountability framework; Art. 17(2) proportionality, as amended by Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (referenced by number only: clauses 5.1–5.3, 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.2, A.3.2, A.3.3, A.7.3, A.10). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1, 1.5, 1.7, 2.1–2.3, 3.1, 4.1, 4.3, 5.1, 6.1–6.2; MAP 1.3–1.4, 3.1–3.2; MANAGE 1.1; initial go/no-go decision after MAP). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[5] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance; CFO Act agency AI Governance Boards within 90 days, chaired at Deputy Secretary level, with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per instructions; 26(2) oversight by persons with competence, training and authority; 26(5) monitoring, informing the provider and suspension; 26(7) informing workers' representatives and affected workers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[7] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4 (as amended by Reg. (EU) 2026/1744: providers and deployers "take measures to support the development of AI literacy"; no guaranteed level for any individual; support from the Commission and Member States; Board recommendations; applies since 2 Feb 2025 under Art. 113(a)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4 (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] AI Literacy: Questions & Answers (obligation remains, no specific or "sufficient" level mandated; no certificate needed; internal record of trainings; "other persons" include contractors, service providers and clients; no specific governance structure mandated; instructions for use alone not sufficient; supervision by national market-surveillance authorities from 2 Aug 2026). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (John Lunney, Sue Lueder), in Site Reliability Engineering. Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 87 (Directive (EU) 2019/1937 applies to the reporting of infringements of the AI Act and the protection of reporting persons; applies from 2 Aug 2026 under Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_87 (verified: primary)
[13] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8(1) and 8(3) internal channels for private entities with 50 or more workers; Art. 9(1)(b) acknowledgment within seven days; Art. 9(1)(f) feedback within three months; Art. 19 prohibition of retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[14] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025, a regular-session statute and so in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); Labor Code §§1107–1107.2: "covered employee", no rule preventing disclosure, no retaliation, notice of rights, anonymous internal process for large frontier developers with monthly updates and quarterly sharing with officers and directors). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[15] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3(49) (definition of "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[17] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[18] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(1) text-and-data-mining exception; Art. 4(3) reservation by rightholders, by machine-readable means for content online). Publications Office of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng#art_4 (verified: primary)
[19] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53(1)(c) (GPAI providers' copyright policy, incl. identifying and complying with Art. 4(3) reservations). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[20] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (paras 104–106: web-scraping mitigations incl. excluding sources and data categories, respecting robots.txt or ai.txt, opt-out lists). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en (verified: primary)
[21] Responsible Sourcing of Data Enrichment Services (provider selection, pilots, instructions, payment terms, communication with workers, quality assurance, offboarding). Partnership on AI. 2021-06-16. https://partnershiponai.org/paper/responsible-sourcing-considerations/ (verified: primary)
[22] EU model contractual AI clauses (MCC-AI) to pilot in procurements of AI (high-risk and non-high-risk versions; voluntary; exclude IP, payment and GDPR terms). Public Buyers Community, European Commission. 2023-09-29. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/eu-model-contractual-ai-clauses-pilot-procurements-ai (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25(1) (a value-chain actor becomes the provider when it puts its name or trademark on a high-risk system, makes a substantial modification, or modifies the intended purpose so that the system becomes high-risk). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[24] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 4 (employment, workers' management and access to self-employment: recruitment and selection; decisions on work relationships, task allocation, monitoring and evaluation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
