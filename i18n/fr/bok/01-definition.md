---
lang: fr
source: bok/01-definition.md
sourceHash: "1cce4e63e8eb069cdc6eb894461204e8419fc6b0b7176c3e0210281b0d47437e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 01. La définition

> L'ingénierie de la gouvernance de l'IA est l'application de la pratique d'ingénierie (pensée
> systémique, pensée produit et code) à la gouvernance des systèmes d'IA ; une capacité, pas un
> titre de poste, mesurée par la réduction effective du risque et les preuves prêtes pour l'audit.

## La définition

**L'ingénierie de la gouvernance de l'IA est l'application de la pratique d'ingénierie (pensée systémique, pensée produit et code) à la gouvernance des systèmes d'IA.**

Lisez la phrase en trois parties. *La pratique d'ingénierie* signifie que nous construisons,
exploitons et mesurons la gouvernance de la manière dont les ingénieurs construisent, exploitent et
mesurent n'importe quoi d'autre : comme des systèmes versionnés avec des tests, de la télémétrie et
des propriétaires, pas comme des documents. *La pensée systémique et la pensée produit* signifient
que nous traitons la gouvernance comme un tout qui s'étend sur les données, le modèle, le pipeline,
l'exécution et l'organisation, livrée comme un produit aux ingénieurs qui en sont les utilisateurs.
*La gouvernance des systèmes d'IA* est le sujet : l'ensemble de la gouvernance, du risque et de
l'assurance pour l'IA, y compris les agents autonomes, pas une seule tranche étroite de celui-ci. Le
chapitre 11 établit [ce qui compte comme un système d'IA](/bok/ai-defined#four-definitions-compared)
à des fins de gouvernance, et pourquoi cette décision est elle-même le premier contrôle.

Le cadrage est emprunté, délibérément. L'ingénierie GRC se définit comme « l'application de la
pratique d'ingénierie logicielle, de la pensée systémique et de la pensée produit à la gouvernance,
au risque et à la conformité » [1]. L'ingénierie de la gouvernance de l'IA est ce même mouvement,
dirigé vers la gouvernance de l'IA. C'est la discipline parent pointée vers une cible plus rapide et
plus étrange.

## Trois clarifications

**Elle couvre la gouvernance, le risque et l'assurance des systèmes d'IA, y compris les agents.** Le
périmètre n'est pas « conformité ». Il s'étend de la définition des règles (gouvernance), en passant
par l'identification et la réduction des risques (risque), jusqu'à la production de preuves que les
contrôles fonctionnent (assurance). Il inclut explicitement l'IA autonome et agentique, car c'est là
que vivent désormais les problèmes de gouvernance les plus difficiles : un agent qui navigue,
exécute du code, appelle des API et agit sous autorité déléguée est l'objet que la gouvernance
héritée voit le moins bien.

**C'est une capacité, pas un titre de poste.** Vous n'avez pas besoin d'« ingénieur en gouvernance
de l'IA » sur votre carte de visite pour faire ce travail, et avoir le titre ne signifie pas que
vous le faites. C'est un ensemble de pratiques (politique en tant que code, eval gates, registres
d'agents, assurance continue) qu'un ingénieur en sécurité, un ingénieur en confidentialité, un
ingénieur MLOps ou un responsable de gouvernance peuvent chacun développer. Le marché forme le rôle
(les rôles techniques de gouvernance de l'IA dans le secteur technologique rapportent une médiane
proche de 221 000 USD, la bande la plus élevée dans l'enquête de l'IAPP [2], et Gartner prévoit des
dépenses de gouvernance de l'IA de 492 millions USD en 2026, dépassant 1 milliard USD d'ici 2030
[3]), mais la discipline est définie par la capacité, non par le poste vacant.

**Elle se mesure par la réduction effective du risque et les preuves prêtes pour l'audit.** Il y a
exactement deux tests. Le risque a-t-il réellement diminué, de manière mesurable, en production, et
non sur une diapositive de maturité ? Et un régulateur ou un auditeur peut-il lire la preuve sous
forme de preuves lisibles par machine, et non une capture d'écran réassemblée ? Un contrôle qui ne
passe aucun de ces deux tests est du théâtre. La couverture du cadre, le nombre de politiques
écrites et les comités tenus sont au mieux des intrants ; ce ne sont jamais la mesure.

## ## Le cluster de désambiguïsation

La discipline est définie autant par ce qu'elle n'est pas que par ce qu'elle est. Huit voisins lui
sont régulièrement confondus. Chacun partage une frontière ; aucun n'est la même chose.

| Voisin | Ce qu'il fait | Comment l'ingénierie de la gouvernance de l'IA en diffère |
|---|---|---|
| **Recherche en sécurité de l'IA** | Étudie si les modèles puissants sont sûrs en principe (alignement, capacités dangereuses). | Conçoit les contrôles et les preuves pour les systèmes d'IA en production ; consomme la recherche en sécurité, ne la mène pas. |
| **MLOps / LLMOps** | Construit, déploie et sert les modèles et les pipelines de manière fiable. | Gouverne ce que MLOps expédie : ajoute la politique, les évaluations comme preuves, le registre et l'assurance comme portes sur le même pipeline. |
| **Gestion du risque de modèle (style SR 11-7)** | Valide les modèles, vérifie la solidité conceptuelle et les backtests, dans la tradition bancaire ; aux États-Unis, SR 11-7 a été remplacé par SR 26-2 le 17 avril 2026 [6]. | S'étend au-delà de la validation du modèle au comportement à l'exécution, aux agents, à l'impact sur les droits et aux preuves continues et lisibles par machine. |
| **Conformité de l'IA / juridique** | Interprète les obligations (Reglamento de IA, RGPD) et conseille à ce sujet. | Transforme l'obligation en contrôle exécutable et en preuves lisibles ; a besoin du juridique, ne le remplace pas. |
| **IA responsable / éthique de l'IA** | Définit les valeurs et les principes (équité, transparence, responsabilité). | Implémente ces valeurs comme des contrôles en cours d'exécution ; l'éthique fixe la cible, l'ingénierie l'atteint et le prouve. |
| **Ingénierie GRC** (la discipline mère) | Applique la pratique d'ingénierie à la gouvernance, au risque et à la conformité en général. | Même méthode, spécialisée pour l'IA : modèles, agents, évaluations, AIBOM, contrôles d'IA à l'exécution. |
| **Ingénierie de la sécurité de l'IA** (la discipline sœur) | Sécurise les systèmes d'IA contre les attaques (injection de prompt, vol de modèle, abus d'agent) ; son livrable est un système défendu. | Se chevauche fortement (souvent la même personne), mais son livrable est un système *gouverné et prouvé* : le registre des droits et obligations et l'assurance continue, pas seulement la défense. |
| **« Ingénierie de la gouvernance de l'IA » de Visure** | Gouverne l'IA que les ingénieurs *utilisent dans* les flux de travail d'ingénierie (exigences, MBSE). | La direction opposée : notre sujet est de gouverner les *systèmes* d'IA, non de gouverner l'ingénierie assistée par l'IA [4]. |

En prose : la frontière se situe là où une discipline s'arrête. **La recherche en sécurité de l'IA**
demande si un modèle est sûr ; nous demandons si le système déployé est gouverné, et le prouvons.
**MLOps** répond « le modèle est-il en service ? » ; nous répondons « est-il autorisé à servir, et
quelles preuves le disent ? » Nous gouvernons le pipeline même que MLOps exécute.
**La gestion du risque de modèle** dans la tradition SR 11-7 valide un modèle à des moments précis ;
nous gouvernons le système en continu, y compris les agents qui n'ont pas d'analogue dans un modèle
de crédit. Le texte de référence américain de la tradition a changé le 17 avril 2026, lorsque la
Réserve fédérale, l'OCC et la FDIC ont remplacé SR 11-7 par SR 26-2
([SR 11-7, maintenant SR 26-2](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai), au
chapitre 21) [6]. Les nouvelles directives placent les modèles d'IA générative et agentique en
dehors de son champ d'application [7], de sorte que les systèmes dont ce livre se soucie le plus
sont ceux que la validation du modèle bancaire laisse désormais à d'autres contrôles ; le chapitre
13 expose où
[la gestion du risque de modèle rencontre la gestion du risque d'IA](/bok/risk-management#what-this-chapter-settles).
**La conformité de l'IA et le juridique** vous disent ce que la loi exige ; nous construisons le
contrôle qui le satisfait et la preuve qui le montre, et nous dépendons des avocats pour nous dire
que nous avons bien compris l'obligation. **L'IA responsable et l'éthique de l'IA** fixent les
valeurs ; sans ingénierie, ces valeurs restent sur une affiche (le chapitre 16 transforme l'une
d'elles,
[l'équité, en métriques et eval gates](/bok/fairness-and-explainability#group-fairness-metrics)).
**L'ingénierie GRC** est la méthode mère, et nous sommes sa spécialisation pour l'IA. Nous héritons
trois des cinq couches du stack presque inchangées (Governance-as-Code, Inventory & Transparency, et
Assurance & Continuous Compliance, qui portent la politique en tant que code, l'inventaire des
actifs et les preuves lisibles par machine) ainsi que le test « un tableau de bord vert sur un
contrôle cassé est du théâtre » ; ce que l'IA nous force à ajouter, ce sont les deux autres, les
évaluations et les tests adversaires comme contrôles et l'identité de l'agent et le contrôle à
l'exécution, car un modèle dont le comportement doit être testé et un acteur autonome qui agit sous
autorité déléguée n'ont pas d'analogue dans la GRC classique.
**L'ingénierie de la sécurité de l'IA** est la discipline sœur avec laquelle nous nous chevauchons
le plus, et le chevauchement est une caractéristique, non un différend de frontière : la même
personne porte souvent les deux casquettes. La ligne n'est pas « encadrement versus clôtures » mais
*livrable*. Le livrable de l'ingénierie de la sécurité est un système défendu : il arrête l'attaque.
Le livrable de l'ingénierie de la gouvernance de l'IA est un système *gouverné et prouvé* : le
registre des droits et obligations (quel contrôle répond à quel article, avec la preuve attachée) et
l'assurance continue comme produit qu'un auditeur ou un régulateur peut interroger. Une évaluation
par équipe adverse est du travail de sécurité et du travail de gouvernance à la fois ; elle devient
de la gouvernance lorsque son résultat est classé comme preuve par rapport à une obligation. La
sécurité demande « est-ce sûr contre les attaques ? » ; nous demandons « est-ce gouverné, et
pouvons-nous le prouver ? » Nous avons généralement besoin de la réponse de sécurité comme intrant à
la nôtre. Et l'utilisation par **Visure** de la phrase identique pointe dans une direction
entièrement différente : gouverner l'IA qui assiste le travail d'ingénierie, non pas concevoir
l'ingénierie de la gouvernance de l'IA. Nous revendiquons le deuxième sens et désambiguïsons le
premier à vue.

## ## L'objet de la gouvernance

Concrètement, qu'est-ce que cette discipline gouverne ? Cinq objets imbriqués, chacun nécessitant
des contrôles différents :

- **Modèles.** Les artefacts entraînés (modèles de base, ajustements fins, classificateurs), avec
  leur provenance, leurs capacités, leurs évaluations et leurs modes de défaillance connus.
  Gouvernés avec des fiches de modèle, des évaluations et AIBOM.
- **Systèmes.** L'application autour du modèle : prompts, récupération, outils, orchestration, les
  utilisateurs humains et machines. La plupart des risques sont ici, non dans le modèle brut.
- **Agents.** Systèmes qui agissent : naviguent, exécutent du code, appellent des API, déplacent de
  l'argent, délèguent à d'autres agents. Gouvernés avec l'identité, la portée délimitée, la
  médiation des outils, les guardrails à l'exécution et les kill switches. C'est l'objet le plus
  difficile et le plus nouveau, et celui que la gouvernance héritée ne peut pas voir ; le chapitre
  23 couvre
  [la gouvernance des agents](/bok/governing-agents#what-makes-an-agent-a-governance-object) de bout
  en bout.
- **Données.** Données d'entraînement, corpus de récupération, prompts et résultats, avec leur base
  juridique, leurs droits, leur provenance et leur rétention. Gouvernées avec des fiches de données,
  des AIPD et la traçabilité ; le chapitre 19 applique
  [la loi sur la protection des données à l'IA](/bok/privacy-and-ai#principles-applied-to-ai).
- **L'organisation.** Les rôles, les droits de décision, les chemins d'escalade et la responsabilité
  qui entourent tous les éléments ci-dessus. Gouvernés avec un modèle opérationnel, une RACI et un
  pipeline d'incidents (le chapitre 12 cartographie
  [les parties prenantes et leurs devoirs](/bok/governance-program#the-stakeholder-map)). Un
  contrôle sans propriétaire n'est pas un contrôle.

La discipline n'est cohérente que lorsqu'elle aborde les cinq. Une fiche de modèle sans registre
d'agents, ou un registre d'agents sans chemin de données à l'exécution, gouverne un objet et laisse
les autres ouverts.

## ## Les trois questions

À tout moment, une fonction d'ingénierie de la gouvernance de l'IA doit pouvoir répondre à trois
questions sur la production, instantanément, à partir de systèmes en direct, non à partir d'un
document mis à jour il y a un trimestre :

1. **Quelle IA est en cours d'exécution ?** Quels modèles, systèmes et agents sont en direct, dans
   quelle version, possédés par qui. C'est le travail de l'inventaire et du registre d'agents, et il
   doit être alimenté par un chemin de données à l'exécution, non saisi dans une feuille de calcul.
2. **Qu'est-ce qu'il est autorisé à faire ?** La portée, les permissions, les guardrails et la
   politique qui délimitent chaque système et agent. C'est le travail de la gouvernance en tant que
   code et des contrôles à l'exécution : l'identité avant l'autonomie, la portée avant l'action.
3. **Quelles preuves le prouvent ?** Le registre lisible par machine et prêt pour l'audit que les
   contrôles ont fonctionné et le risque a diminué. C'est le travail des évaluations comme preuves
   et de l'assurance continue : les preuves comme sous-produit de la construction.

Ces trois questions sont l'épine dorsale de tout le Body of Knowledge. Le stack à cinq couches
(chapitre 04) est construit pour y répondre : Inventory & Transparency répond à *quelle IA est en
cours d'exécution* ; Govern-as-Code et Runtime Controls & Observability répondent à *ce qu'il peut
faire*, le premier écrivant la limite en tant que code et le second l'appliquant sur l'appel en
direct ; Evals & Red Teaming et Assurance & Continuous Compliance répondent à *quelles preuves le
prouvent*. Les menaces contre lesquelles ces contrôles sont construits (injection de prompt,
mauvaise utilisation des outils, identité de l'agent et abus de privilèges, agents voyous) sont
cataloguées dans le Top 10 d'OWASP pour les applications agentiques [5], et les modèles qui y
répondent sont au chapitre 05.

## ## Les limites de l'eval gate

Ce livre s'appuie fortement sur les évaluations comme contrôles, il doit donc au lecteur le même
test « théâtre » qu'il applique à tout le reste. Une eval gate est nécessaire ; elle n'est pas
suffisante. Prenez-la au sérieux et ses limites en découleront directement :

- **C'est un point dans le temps et limité par l'échantillonnage.** Une évaluation prouve que le
  système a réussi *ces* cas à *cette* version. Elle ne dit rien sur les intrants qu'elle n'a pas
  échantillonnés, et rien sur le modèle de demain.
- **C'est Goodhartable.** À partir du moment où un seuil conditionne une mise en production, il y a
  une pression pour ajuster le modèle à la suite ou le seuil au modèle. Une porte optimisée contre
  devient un nombre qui augmente tandis que le risque qu'elle représentait ne bouge pas.
- **Elle détecte les régressions, pas la nouveauté.** Une suite teste les modes de défaillance
  connus. Un jailbreak inédit ou une attaque que la suite n'a jamais imaginée passe au vert, parce
  que rien dans la porte n'a été construit pour la voir.

Rien de cela ne plaide contre la porte ; cela plaide pour la façon dont la porte doit être
exploitée. La suite d'évaluations est elle-même un artefact à gouverner : sa couverture mesurée, ses
cas maintenus de manière adversariale, ses seuils tracés vers des modes de défaillance nommés plutôt
que vers des nombres ronds, et sa taille définie par le seuil qu'elle doit résoudre (le chapitre 14
montre comment
[dimensionner la suite à partir du seuil](/bok/governing-development#statistical-validity-of-evals)).
La même prudence s'applique aux
[benchmarks publics et aux classements](/bok/governing-deployment#what-public-benchmarks-and-leaderboards-cannot-tell-you),
qui évaluent un modèle sur les cas de quelqu'un d'autre plutôt que sur votre tâche. Et une porte qui
passe *oblige* à une surveillance à l'exécution (couche 04) plutôt que de la remplacer. Une
évaluation est le contrôle au moment de la construction ; le guardrail et la trace sont le contrôle
au moment de l'exécution, contre les entrées qu'aucune évaluation n'a anticipées. Une discipline qui
traite une porte verte comme une preuve de sécurité a reconstruit du théâtre de cadre avec un
pipeline plus rapide.

> **En pratique**
> Dans un grand opérateur télécom, la différence entre « gouverné » et « documenté » se résumait à
> ces trois questions. Un inventaire de modèles maintenu à la main répondait à la première question
> le jour où il était édité et était faux une semaine plus tard. Connecter le registre au pipeline
> de déploiement (pour qu'un nouveau modèle ou agent s'enregistre lui-même, avec un propriétaire et
> une portée, au moment du déploiement) était ce qui rendait les trois questions répondables
> n'importe quel mardi. Le document est devenu une requête.

**Correspondances :** Règlement de l'IA art. 9 (gestion des risques), art. 11/49/71 (documentation
et enregistrement), art. 55 (obligations de risque systémique des modèles d'IA à usage général) ·
ISO/IEC 42001 (système de gestion de l'IA) · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top
10 for Agentic Applications 2026. Les correspondances sont illustratives, non une déclaration de
conformité.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Salary & Jobs Report 2025-26. IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[3] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[4] "AI Governance Engineering". Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant to banking organisations above USD 30 billion in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[7] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models; effective challenge). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
