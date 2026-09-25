---
lang: fr
source: bok/06-the-role.md
sourceHash: "17a44abb101fec04ddcb1b5db48761eb55b950d17a34ab07095b17e22699c0b1"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 06. Le rôle

> L'ingénieur en gouvernance de l'IA en tant que rôle concret : une capacité d'abord et un titre de
> poste en second lieu, défini par les flux de travail qu'il possède et les preuves qu'il produit,
> non par les certifications de son titulaire.

## Capacité d'abord, titre en second lieu

La Thèse insiste sur le fait que l'ingénierie de la gouvernance de l'IA est une capacité, non un
titre de poste (la même affirmation que la discipline mère fait pour l'ingénierie GRC, une capacité
que quiconque proche de la construction peut développer [8]). Ce chapitre le rend concret sans
contredire cela : une capacité vit toujours dans la semaine de quelqu'un : les tickets qu'il
possède, les pipelines qu'il maintient, les incidents pour lesquels il est appelé. Nous décrivons
donc l'**ingénieur en gouvernance de l'IA** comme la personne, où qu'elle soit sur l'organigramme,
qui détient cette capacité et est responsable des trois questions en production : quel IA
fonctionne, ce qu'il est autorisé à faire, et quelles preuves le prouvent.

La distinction importe parce que le titre se forme toujours. Le même travail est annoncé comme «
Ingénieur en gouvernance de l'IA », « Ingénieur en risque IA », « Ingénieur en évaluation et
gouvernance de l'IA » [1], « Ingénieur en IA responsable » et, au sein des équipes GRC construisant
la version avant l'IA de leur fonction, « Ingénieur GRC » avec un mandat IA [2]. Un ingénieur en
sécurité qui écrit la porte d'évaluation, un ingénieur en confidentialité qui transforme une FRIA en
code, un ingénieur MLOps qui câble le registre au déploiement : chacun fait de l'ingénierie de la
gouvernance de l'IA sous un titre différent. Nous définissons le rôle par ce qu'il possède, non par
ce que les RH ont appelé la demande.

Une ligne la sépare de son voisin analyste, et le reste du chapitre gagne cette ligne : l'analyste
en gouvernance de l'IA décrit le système de l'extérieur et dépose la description ; l'ingénieur en
gouvernance de l'IA lit le système directement et expédie le contrôle qui change ce qu'il fait.

## Ce que le rôle possède, par flux de travail

L'ingénieur possède des flux de travail, pas des documents. Chaque flux de travail ci-dessous est un
système en cours d'exécution avec des entrées, des artefacts et des preuves, et chacun correspond à
l'une des cinq couches de la stack (chapitre 04). Grouper les responsabilités de cette manière garde
le rôle honnête : vous possédez un flux de travail lorsque vous pouvez être appelé pour cela, non
lorsque votre nom figure sur une politique.

### Admission et classification

Chaque système d'IA, modèle et agent entre par une admission qui le classe : par niveau de risque,
par exposition réglementaire (IA à haut risque de l'UE, GPAI, hors champ d'application), par
sensibilité des données et par autonomie. L'ingénieur construit l'admission comme un chemin
formulaire-plus-code, pas une réunion : une demande qui structure une entrée de registre, déclenche
l'évaluation d'impact appropriée (FRIA, DPIA), et achemine le système vers les contrôles que sa
classe exige. La fonction Map du NIST AI RMF est le vocabulaire naturel pour l'étape de
classification. L'admission demande, dans l'ordre : si le problème a besoin d'IA du tout
([stratégie, valeur et si utiliser l'IA du tout](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all),
chapitre 12) ; si le système compte comme IA
([la décision définitionnelle et ses champs de registre](/bok/ai-defined#from-definition-element-to-registry-field),
chapitre 11) ; ce que le [dossier de cas d'usage](/bok/governing-development#the-use-case-record)
dit sur le but et l'autorité de décision (chapitre 14) ; quel niveau de risque le
[profil de risque de cas d'usage](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile)
lui donne (chapitre 13) ; et où il se situe sur
[l'échelle de risque de l'IA Act](/bok/eu-ai-act#the-risk-ladder) (chapitre 18). Un système qui est
acheté plutôt que construit entre avec un
[Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record) (chapitre
15). Le motif [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering) construit
l'admission, et le [triage de l'IA Act](/toolkit/ai-act-triage) rédige l'enregistrement de décision
de classification. **Maps to** Inventory & Transparency.

### Inventaire et registre

L'ingénieur possède l'inventaire des modèles et le **registre des agents**, l'enregistrement
conscient du runtime de chaque acteur non humain, chacun avec un propriétaire, une portée déclarée,
un statut et un kill switch. La capacité qui distingue l'ingénieur ici est le chemin de données du
runtime : le registre est alimenté par le pipeline de déploiement et par la découverte en
production, non saisi dans une feuille de calcul, et chaque acteur non humain qu'il contient porte
sa propre identité ; le chapitre 23 énonce ce
qu'[une entrée du registre d'un agent](/bok/governing-agents#the-agent-registry) doit contenir.
**Correspond à** Inventory & Transparency.

### Évaluations et red teaming comme preuves

L'ingénieur construit et maintient les suites d'évaluations (capacité, sécurité et adversariales) et
les intègre dans une **porte d'évaluation** de sorte qu'une évaluation échouée bloque la mise en
production. C'est le flux de travail qui sépare le plus nettement l'ingénieur de l'analyste :
l'analyste examine un rapport de modèle ; l'ingénieur écrit le test que le modèle doit réussir et
possède le harnais qui l'exécute (Inspect AI, promptfoo, Garak, Giskard, DeepEval, Ragas comme
exemples de catégorie, illustratifs et non approuvés). Le rôle « AI Evaluation & Governance Engineer
» est défini autour des « harnais de test automatisés et des garde-fous de sécurité » et du red
teaming adversarial [1]. **Correspond à** Evals & Red Teaming as Evidence.

### Politique en tant que code et portes

L'ingénieur exprime les règles de gouvernance sous forme de politique exécutable (`OPA/Rego`, Cedar,
Policy Cards) qui s'évalue en CI/CD et à l'admission, et maintient les portes qui les appliquent.
Une offre d'emploi publique de gestionnaire GRC encadre le mandat comme « traduire les politiques en
politique en tant que code » [3]. Le résultat de l'ingénieur ici est une fusion qui est bloquée ou
autorisée, avec une raison enregistrée, non une recommandation dans une revue. **Correspond à**
Govern-as-Code.

### Surveillance du runtime et incidents

L'ingénieur instrumente le runtime : les décisions de garde-fou, la médiation des appels d'outils,
les signaux de dérive et le flux de comportement des agents s'écoulent dans l'observabilité
(Langfuse, Arize Phoenix sur OpenTelemetry comme exemples). Ils possèdent le chemin de détection à
rapport pour les incidents graves, y compris l'horloge de l'article 73 du Règlement de l'IA de l'UE
pour les systèmes à haut risque, et ils possèdent le **kill switch** testé pour les agents, avec le
modèle de menace qui dit contre quels défaillances du runtime les contrôles sont construits [5]. Le
chapitre 17 couvre [la réponse aux incidents](/bok/incidents#the-response-lifecycle) et
[l'analyse des causes profondes](/bok/incidents#root-cause-analysis). **Correspond à** Runtime
Controls & Observability.

### Assurance et preuves d'audit

L'ingénieur émet des **preuves prêtes pour l'audit** comme sous-produit de la construction (`OSCAL`
composant et artefacts d'évaluation, journaux signés, résultats d'évaluation structurés) de sorte
que l'audit est une requête, non un projet. C'est l'**assurance continue** : le statut du contrôle
est un signal en direct, non une attestation ponctuelle. **Correspond à** Assurance & Continuous
Compliance.

### Traduction réglementaire

L'ingénieur lit l'obligation suffisamment bien pour construire le contrôle qui la satisfait :
transformer un article du Règlement de l'IA, un contrôle ISO/IEC 42001 ou une sous-catégorie NIST AI
RMF en une porte, un champ de registre ou un artefact de preuve, et inversement, de sorte qu'un
auditeur puisse tracer le contrôle jusqu'à l'obligation. C'est une traduction, non un conseil
juridique ; l'ingénieur dépend du service juridique pour confirmer que l'obligation est bien lue.
**Correspond à** les cinq couches ; c'est la colonne vertébrale que le chapitre 08 indexe, et le
chapitre 18 lit
[le Règlement de l'IA de l'UE en une seule fois](/bok/eu-ai-act#how-to-read-this-chapter) pour
l'ingénieur qui doit le traduire.

## Compétences, par flux de travail

Les compétences sont regroupées par le flux de travail qu'elles servent, non par le certificat qui
les enseigne. Le tableau est une carte des capacités : il dit ce que vous devez être capable de
faire, à peu près dans l'ordre de son importance pour chaque flux de travail. C'est illustratif, non
une liste de contrôle à cocher.

| Flux de travail | Compétences essentielles | Compétences de soutien |
|---|---|---|
| Admission et classification | Conception de taxonomie des risques ; lecture des niveaux de risque du Règlement de l'IA de l'UE ; analyse des exigences | Outils de formulaire/flux de travail ; modélisation de données légère |
| Inventaire et registre | Identité non humaine et accès limité ; intégration API à CI/CD ; modélisation de données | IAM cloud ; outils de découverte ; concepts SPIFFE/SPIRE |
| Évaluations et red teaming | Ingénierie du harnais d'évaluation ; prompting adversarial ; littératie statistique ; Python | Internals LLM/agent ; conception de benchmarks ; modélisation des menaces (STRIDE/PASTA) |
| Politique en tant que code et portes | `OPA/Rego` ou Cedar ; ingénierie du pipeline CI/CD ; Git | Conception de schéma de politique (Policy Cards) ; contrôle d'admission |
| Surveillance du runtime et incidents | Observabilité/OpenTelemetry ; configuration des garde-fous ; réponse aux incidents | Ingénierie de détection ; sécurité MCP et agent-protocol |
| Assurance et preuves d'audit | `OSCAL` et preuves lisibles par machine ; journalisation et signature ; fluidité d'audit | Attestation cryptographique ; conception du magasin de preuves |
| Traduction réglementaire | Lecture de la réglementation et des normes (Règlement de l'IA, ISO/IEC 42001, NIST AI RMF) ; mappage | Anglais juridique ; méthodologie AIPD/FRIA |

Deux compétences transversales se situent sous les sept : assez de **Python** pour assembler les
systèmes (les offres d'emploi mettent Python dans environ une offre sur quatre en gouvernance de
l'IA [4]), et assez de **lecture du droit** pour analyser un article sans le confondre avec un
conseil. Ni l'un ni l'autre n'est optionnel ; ni l'un ni l'autre n'est le travail entier.

## Analyste versus ingénieur

La façon la plus claire de définir le rôle est par rapport à l'analyste dont il émerge. Le contraste
ci-dessous est écrit pour la gouvernance de l'IA et modélisé sur le tableau analyste-vs-ingénieur
que la littérature GRC Engineer utilise pour sa discipline mère [2]. Les deux rôles sont nécessaires
; l'ingénieur n'est pas « meilleur », mais fait un travail différent et est mesuré différemment.

| Dimension | Analyste en gouvernance de l'IA | Ingénieur en gouvernance de l'IA |
|---|---|---|
| **Artefact de preuve** | Un artefact ponctuel (une attestation, un questionnaire, un rapport exporté) compilé pour une revue | Un artefact émis en continu (un résultat de requête, une exécution d'évaluation, un journal signé) produit lors de l'exécution du pipeline |
| **Source primaire** | Travaille à partir de la description rapportée du système : documentation, résumés et réponses des fournisseurs | Travaille à partir du système en cours d'exécution : le registre et la télémétrie de production, les mêmes signaux que le pipeline émet |
| **Ensemble d'outils** | Feuilles de calcul, une plateforme GRC/gouvernance de l'IA, ticketing | Python, `OPA/Rego`}, Git, CI/CD, harnais d'évaluation, `OSCAL`}, plus la plateforme |
| **Cadence** | Périodique : revues trimestrielles, évaluations annuelles | Continu : à chaque commit, déploiement et appel du runtime |
| **Résultat** | Un rapport, une matrice de mappage, une évaluation des risques | Une fusion bloquée ou autorisée, un agent enregistré, un artefact de preuve lisible par machine |
| **Métrique de succès** | Audit réussi, couverture du cadre complète | Défaillances de contrôle détectées avant l'arrivée de l'auditeur, et réduction effective du risque mesurable |

La distinction est la cadence et l'artefact, non la compétence ou l'habilitation. Ce n'est pas que
l'analyste ne peut pas lire un registre ou que l'ingénieur ne peut pas rédiger un rapport ; c'est
que le livrable de l'analyste est une description périodique et celui de l'ingénieur est un contrôle
continu. Un bon analyste lit les systèmes attentivement ; un bon ingénieur écrit clairement. Les
modes de défaillance diffèrent aussi, et les nommer garde les deux honnêtes. Le mode de défaillance
de l'analyste est le théâtre de conformité : une documentation qui devance la réalité. Le mode de
défaillance de l'ingénieur est la sur-ingénierie : automatiser un contrôle pour un processus que
personne n'a accepté de corriger, ou construire une porte si fragile que les ingénieurs la
contournent. Aucun rôle n'est à l'abri de son propre mode de défaillance par le titre seul.

## L'échelle de carrière

Le rôle a des échelons observables, chacun défini par ce que la personne peut être de confiance pour
posséder de bout en bout, non par les années de service, et vérifiable en regardant les systèmes,
non une auto-évaluation.

1. **Associé.** Exécute les contrôles existants : ajoute une évaluation à une suite, enregistre un
   agent correctement, produit des preuves à partir d'un contrôle que quelqu'un d'autre a construit.
2. **Ingénieur en gouvernance de l'IA.** Construit un contrôle de bout en bout (une obligation en
   une porte, une suite d'évaluations pour une classe de système, intégrée en CI/CD) et possède au
   moins un flux de travail pour une zone de produit.
3. **Senior.** Possède un flux de travail complet dans l'organisation et conçoit le chemin pavé que
   d'autres adoptent ; le registre, la porte d'évaluation ou le pipeline de preuves qu'ils ont
   construit est le modèle de template standard.
4. **Staff / principal.** Possède l'architecture de référence (comment les cinq couches
   s'assemblent) et les décisions transversales (modèle d'identité, format de preuve, chemin
   d'incident).
5. **Responsable de l'ingénierie de la gouvernance de l'IA.** Possède la fonction et sa propriété
   partagée avec l'ingénierie, mesurée par la réduction effective du risque, non par les contrôles
   arrêtés. Une offre d'emploi publique de gestionnaire d'ingénierie limitée à « construire une
   fonction d'ingénierie GRC tournée vers l'IA » se situe à cet échelon [3].

Une personne peut détenir la capacité à l'échelon deux tandis que le titre traîne à « analyste », ou
détenir le titre sans la capacité. L'échelle décrit le travail, et le travail est visible dans les
systèmes.

## Trois façons d'entrer

Personne ne commence comme ingénieur en gouvernance de l'IA ; tout le monde se convertit à partir
d'une discipline adjacente, en conservant sa force et en ajoutant ce qui lui manque.

- **Depuis le droit ou la confidentialité.** Votre avantage est la traduction réglementaire ; votre
  lacune est la construction. Transformez une évaluation en un artefact versionné et exécutable (un
  modèle FRIA-as-Code, une politique en `OPA/Rego`}), et apprenez assez de pipeline pour voir où le
  contrôle s'active. Commencez par la politique en tant que code et l'admission.
- **Depuis la sécurité ou GRC.** Votre avantage est la mentalité de contrôle ; votre lacune est la
  couche modèle. L'ingénierie GRC a déjà enseigné les mouvements parents : politique en tant que
  code, assurance continue, preuves comme sous-produit [2]}. Ajoutez les objets spécifiques à l'IA :
  les évaluations comme contrôles, l'identité et la portée des agents, et les modes de défaillance
  des modèles et agents du OWASP Agentic Top 10 [5]}. Commencez par les évaluations comme preuves et
  le registre des agents.
- **À partir de MLOps ou d'ingénierie ML.** Votre avantage est le chemin de données d'exécution que
  tout le monde d'autre n'a pas ; votre lacune est l'obligation. Ajoutez la *porte* d'évaluation
  plutôt que le rapport d'évaluation, le champ de registre pour le propriétaire et la portée,
  l'artefact de preuve dont l'audit a besoin. Commencez par les portes d'évaluation en CI et la
  surveillance d'exécution.

## Le marché

Le rôle est défini par les flux de travail ci-dessus, non par les postes vacants. Mais le marché se
forme et les preuves sont publiques, et elles corroborent la forme du travail. Traitez chaque
chiffre comme sourcé ; les points de salaire sont des médianes d'enquête ou des plages d'offres
d'emploi, non des garanties.

**Bandes d'enquête.** Le rapport IAPP Salary & Jobs Report 2025-26 (1 600+ répondants, 60+ pays)
place les rôles techniques de gouvernance de l'IA dans le secteur technologique à une médiane de 221
000 USD (sa bande la plus élevée) contre 151 800 USD pour le travail de gouvernance de l'IA en
général et 169 700 USD pour les rôles combinés de confidentialité et gouvernance de l'IA [6]}. La
prime est pour l'extrémité technique, construire le contrôle de la discipline, qui est exactement le
rôle que ce chapitre décrit.

**Compétences demandées.** L'analyse des offres d'emploi aux États-Unis depuis janvier 2026 (Axial
Search) signale l'observabilité/monitoring dans 41-42 % des offres en gouvernance de l'IA, Python
dans 27-28 %, les frameworks NIST dans environ 27 %, la familiarité avec les modèles de base dans
25,6 % et le cloud dans 18,2 % ; le salaire médian annoncé était de 169 000 USD et l'expérience
requise médiane était de cinq ans [4]. Et le signal de demande est large : la liste 2026 des Skills
on the Rise de LinkedIn place les compétences en gouvernance et en IA responsable parmi ses clusters
les plus en croissance, aux côtés des capacités techniques en IA [7]. Le signal structurant est le
mélange de compétences (observabilité, Python, le chemin de données à l'exécution), non le titre du
salaire.

> **Offres d'emploi (note).** Les offres individuelles marquent le haut de la fourchette : un rôle
> de gestionnaire d'ingénierie GRC dans un laboratoire de pointe a été annoncé en 2026 à 405 000 USD
> [3]. Mais les postes nommés sont un signal retardé et bruyant, conservés ici à titre de
> corroboration et en dehors de l'argument ; cette édition ne cite aucune offre d'emploi dont l'URL
> expire ou est réaffectée une fois le poste pourvu. Le rôle, c'est les workflows, non la demande
> d'emploi.

## Ce que les employeurs se trompent dans la description de poste

En lisant les offres par rapport aux workflows ci-dessus, trois erreurs reviennent.

- **Les certifications comme proxy de capacité.** Les descriptions énumèrent AIGP, CIPP, CISSP et
  CISM comme si un certificat produisait un contrôle. Les données Axial montrent que les certs
  apparaissent dans moins de 11 % des offres chacun [4] ; les compétences structurantes (eval
  harnesses, politique en tant que code, le chemin de données à l'exécution) sont celles que la
  description de poste sous-spécifie. Demandez le workflow, puis le cert s'il aide. Ce que chaque
  schéma évalue et comment ce livre s'y rapporte est exposé de manière neutre sur la
  [page des certifications](/for/certifications).
- **Le travail d'analyste sous un titre d'ingénieur.** Dans notre lecture des offres, les titres «
  Ingénieur en gouvernance de l'IA » décrivent souvent l'intake, le mapping et la création de
  rapports (travail d'analyste) à un salaire d'ingénieur. L'indice est l'absence de toute
  construction : pas de eval gate, pas d'intégration de registre, pas de pipeline de preuves.
- **Tout, en une seule embauche.** Une offre unique demande la politique en tant que code, le red
  teaming, l'identité, l'observabilité, la réponse aux incidents, la traduction réglementaire et la
  gestion des parties prenantes. C'est une fonction, pas une personne : les sept workflows sont
  possédés par une équipe, et une première embauche en possède deux ou trois et construit le chemin
  pavé pour le reste.

> **En pratique**
> Dans un grand opérateur télécom, le rôle est arrivé avant le titre. La première version du travail
> se trouvait dans une équipe de confidentialité et ressemblait à des AIPD et des examens. Ce qui
> l'a transformé en ingénierie de gouvernance de l'IA était de posséder deux workflows entièrement :
> câbler le registre de modèles et d'agents au pipeline de déploiement pour que ce soit vrai
> n'importe quel mardi, et mettre une eval gate en CI pour qu'une régression dans la résistance à
> l'injection échoue la construction. La description de poste a suivi un an plus tard. La capacité
> était visible dans les systèmes bien avant d'être visible sur l'organigramme.

**Correspondances :** Règlement de l'IA Art. 9 (gestion des risques), Art. 26/27 (obligations du
déployeur, FRIA), Art. 72 (acompagnement pós-comercialización), Art. 73 (signalement des incidents
graves) · ISO/IEC 42001 (rôles, responsabilités et compétence) · NIST AI RMF (Govern) · OWASP Top 10
for Agentic Applications 2026. Les mappings sont illustratifs, non une affirmation de conformité.

## Ce que vous pouvez faire cette semaine

1. **Cartographiez les sept workflows.** Notez qui possède l'intake, l'inventaire, les évaluations,
   la politique en tant que code, l'exécution et les incidents, l'assurance et la traduction
   réglementaire aujourd'hui, et marquez ceux que personne ne possède.
2. **Possédez un workflow entièrement.** Choisissez celui avec le moins de construction dedans
   (souvent le registre ou la eval gate) et livrez un contrôle là qui bloque ou enregistre, pas un
   qui recommande.
3. **Réécrivez une description de poste.** Remplacez la liste des certifications par les workflows
   que l'embauche possédera et les artefacts qu'elle livrera dans son premier trimestre.
4. **Pratiquez une compétence fondamentale sur un système réel.** À partir du tableau des
   compétences, prenez la compétence fondamentale que votre workflow manque et utilisez-la une fois
   sur un pipeline en direct : une politique dans `OPA/Rego`, une évaluation dans une harness, une
   trace dans OpenTelemetry.
5. **Traduisez un article dans une paire.** Asseyez un avocat ou un DPO avec un ingénieur et
   transformez un article du Règlement de l'IA en gate, un champ de registre ou un artefact de
   preuve, et inversement.

## Sources

[1] "How the AI Engineer role is unbundling in 2026" (names the AI Evaluation & Governance Engineer). AI Journal. 2026-08-26. https://aijourn.com/how-the-ai-engineer-role-is-unbundling-in-2026/ (verified: secondary)
[2] "The GRC Engineer role" (analyst-vs-engineer table; career paths). GRC Engineer. 2025. https://grcengineer.com/grc-engineer/ (verified: primary)
[3] "Engineering Manager, GRC" posting (AI-forward GRC engineering function; policies into policy-as-code), USD 405,000. Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: secondary)
[4] AI governance jobs analysis (US postings since Jan 2026: observability 41-42%, Python 27-28%, NIST ~27%, foundation models 25.6%, cloud 18.2%; median pay USD 169,000; median 5 yrs). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] Salary & Jobs Report 2025-26 (technical AI-gov in tech median USD 221,000; AI governance only 151,800; privacy + AI governance 169,700). IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[7] LinkedIn 2026 Skills on the Rise (governance and responsible-AI skills among the fastest-rising clusters; no per-skill percentage published). LinkedIn, via EdTech Innovation Hub. 2026. https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts (verified: secondary)
[8] "What is GRC Engineering" (capability, not a job title). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
