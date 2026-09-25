---
lang: fr
source: bok/02-why-now.md
sourceHash: "fd5e154caa65ef30565b60079cffc5a315d017e112d2db5705e6d107d4af8a78"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 02. Pourquoi maintenant

> L'ingénierie de la gouvernance de l'IA se forme maintenant parce que la chose gouvernée a changé
> de forme, le marché a commencé à embaucher des compétences en ingénierie avant que la profession
> ne se nomme elle-même, et la loi a commencé à demander des preuves d'ingénierie, tout cela entre
> avril 2025 et août 2026.

Les disciplines n'apparaissent pas selon un calendrier. Elles apparaissent quand une ancienne façon
de travailler cesse visiblement de tenir et que suffisamment de personnes, dans suffisamment
d'endroits, commencent à construire le remplacement à la fois. C'est ce qui se passe avec la
gouvernance de l'IA maintenant. La Thèse énonce cinq problèmes fondamentaux avec la gouvernance de
l'IA héritée ; ce chapitre prend chacun à son tour, attache les preuves, puis expose les signaux du
marché, réglementaires et techniques qui ensemble expliquent le calendrier. La revendication est
étroite et réfutable : non pas que la gouvernance importe soudainement, mais que l'*ingénierie* de
la gouvernance est devenue le facteur limitant, et que les données le disent maintenant. Les
déclarations datées sont actuelles au 2026-09-24.

## Les cinq problèmes, avec les preuves

### 1. La gouvernance écrite pour des systèmes qui n'existent plus

La gouvernance héritée décrit un système d'IA tel qu'il était le jour où il a été examiné, tandis
que les modèles se réentraînent, les prompts changent et les agents gagnent des outils chaque jour ;
l'artefact est obsolète avant d'être signé. L'indicateur structurel est *où la fonction se situe*.
Dans le rapport 2025 de l'IAPP sur la profession de la gouvernance de l'IA, la fonction de
gouvernance de l'IA est logée principalement avec la confidentialité (22%), le juridique et la
conformité (22%) et l'informatique (17%), et seulement 5% en sécurité [1], loin du pipeline où le
système change. Une fonction dans la couche d'examen, pas la couche de construction, ne peut pas
garder sa description de la production vraie, parce que rien ne la connecte au déploiement.

### 2. Examen ponctuel d'une chose qui change continuellement

Les évaluations annuelles et les approbations de comité supposent un système qui reste immobile
assez longtemps pour être jugé. Les modèles de frontière et les agents autonomes ne le font pas.
Gartner s'attend à ce que plus de 40% des projets d'IA agentique soient annulés d'ici la fin de
2027, citant les contrôles de risque inadéquats parmi les causes [2], et prédit que d'ici 2029 plus
de la moitié des attaques réussies contre les agents d'IA exploiteront les faiblesses du contrôle
d'accès et l'injection de prompts [3]. Les deux sont des modes de défaillance à l'exécution (le
système se comportant mal entre les examens), et une évaluation une fois par an est structurellement
aveugle à ceux-ci. Ce n'est pas le même travail que la gestion des risques de modèle dans la
tradition SR 11-7, qui valide un modèle à des points dans le temps ; l'objet ici ne s'arrête jamais.
Les propres conseils américains de la tradition s'accordent sur la limite : SR 26-2, qui a remplacé
SR 11-7 le 17 avr 2026, laisse les modèles d'IA générative et agentique en dehors de son champ
d'application [22][23]. Le chapitre 11 énumère
[les traits de l'IA qui cassent la gouvernance informatique classique](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance),
chacun associé au contrôle qui y répond.

### 3. La gouvernance comme une porte à la fin, pas une propriété de la construction

La gouvernance tend toujours à arriver après que le modèle soit entraîné, comme un point de contrôle
à franchir avant le lancement, et rien de ce qu'elle produit n'est connecté à la façon dont le
système est construit. Une politique qui ne peut que recommander ne peut pas arrêter une mauvaise
mise en production ; une évaluation connectée à un `eval gate` qui peut faire échouer la
construction peut : la différence entre un contrôle qui décrit le risque et un qui le prévient. Le
chapitre 14 reconstruit
[la construction comme une chaîne de portes](/bok/governing-development#the-build-as-a-chain-of-gates).

### 4. Théâtre de cadre

La correspondance avec le NIST AI RMF ou l'ISO/IEC 42001 devient l'état final au lieu du point de
départ, et une matrice de correspondance verte est confondue avec un contrôle qui fonctionne.
Pourtant, au 2026-09-24, aucune norme harmonisée n'est citée au Journal officiel de l'UE, il n'y a
donc pas de présomption de conformité de l'article 40 pour le Règlement de l'IA [4]. Même l'EN
ISO/IEC 42001, la norme du système de gestion de l'IA, n'est pas le système de gestion de la qualité
de l'article 17 que la loi exige et ne confère pas de présomption de conformité en soi [5]. La
couverture n'est pas l'assurance. Une correspondance prouve que vous avez lu le cadre ; elle ne
prouve pas que le contrôle auquel elle pointe fonctionne réellement.

### 5. Aucun chemin de données à l'exécution

Le registre ne sait pas ce qui s'exécute. La comparaison d'un fournisseur de la catégorie des
plates-formes de gouvernance de l'IA, publiée par un concurrent dans celle-ci, constate que la
plupart de la catégorie « gère le programme (inventaires, évaluations, correspondances de cadre,
flux de travail de preuves) sans aucun chemin de données à l'exécution » [6]. Traitez cela comme une
revendication à tester, pas un fait établi ; où cela tient, les trois questions qui définissent la
discipline (quelle IA s'exécute, qu'est-il autorisé à faire, quelle preuve le prouve) restent sans
réponse, parce que rien n'est connecté à la production. Pendant ce temps, un sondage 2026 d'un
fournisseur de sécurité rapporte que environ un sur huit des violations de l'IA impliquaient des
systèmes agentiques [7] : exactement la couche que le registre papier ne peut pas voir. Un contrôle
sans télémétrie est une revendication, pas un contrôle.

## Les preuves

### La profession est sous-effectif, et elle le sait

Le signal le plus clair que le travail a dépassé sa forme actuelle est que presque personne ne pense
avoir assez de personnes pour le faire. Dans le rapport 2025 de l'IAPP, sur 671 répondants seulement
10 (1,5%) ont dit qu'ils n'auraient pas besoin de personnel supplémentaire en gouvernance de l'IA au
cours des 12 prochains mois [1]. Environ 77% des organisations rapportent travailler sur la
gouvernance de l'IA, montant à environ neuf sur dix parmi celles qui utilisent déjà l'IA [1]. La
demande est quasi universelle ; la capacité ne l'est pas. Quand une fonction est voulue partout,
sous-dotée en ressources, et logée en dehors de la couche de construction, l'écart n'est pas comblé
en embauchant plus de relecteurs. Il est comblé en transformant la gouvernance en un système qui
s'adapte, ce qui est un problème d'ingénierie.

### Le marché embauche pour l'ingénierie

Le marché du travail embauche déjà pour ce changement, et il le fait dans le vocabulaire de
l'ingénierie. Une analyse de 1 997 offres d'emploi en gouvernance de l'IA aux États-Unis, mise à
jour en août 2026, a trouvé que la compétence la plus demandée était les plates-formes
d'observabilité, dans 41% des offres, suivie de Python (28%) et des cadres NIST (27%) [8]. Ce sont
des compétences de construction et d'exécution, pas des compétences d'examen. À la frontière,
Anthropic a annoncé en 2026 un Engineering Manager pour GRC chargé de construire une « fonction
d'ingénierie GRC avant l'IA », traduisant « les politiques en politique en tant que code », et
déployant des flux de travail agentiques qui utilisent Claude « pour servir de analyste GRC virtuel
» [9]. Les offres décrivent la substance de l'ingénierie de la gouvernance de l'IA ; elles n'ont pas
encore convenu de son nom.

### Registre versus exécution

Le marché des outils raconte la même histoire du côté de l'offre. Gartner a publié son premier Magic
Quadrant pour les plates-formes de gouvernance de l'IA en juin 2026, comme l'a rapporté l'un des
fournisseurs nommés [10]. Le propre cadrage de Gartner de la catégorie demande plus qu'un registre :
son analyse de février 2026 dit que ces plates-formes devraient permettre « l'application
automatisée des politiques à l'exécution » et la surveillance continue, et elle s'attend à ce que
les dépenses en gouvernance de l'IA atteignent 492 millions USD en 2026 et dépassent 1 milliard USD
d'ici 2030 [11]. Ce que la catégorie est demandée de faire et ce qu'elle livre sont des questions
différentes. La comparaison des fournisseurs citée ci-dessus, qui évalue les treize fournisseurs du
Magic Quadrant, constate que la plupart d'entre eux gèrent le programme « sans aucun chemin de
données à l'exécution » [6], et le compte qu'un Leader donne de son propre placement centre la
visibilité sur les cas d'usage de l'IA et une feuille de route d'inventaire des actifs, de lignage
et d'intégration des cas d'usage [10]. La question à poser à toute plate-forme est donc concrète :
cette décision de politique a-t-elle été prise lors d'un appel en direct, et où est l'enregistrement
? La distance entre la définition de l'analyste et cette réponse est l'espace que la discipline
occupe.

### L'écart des normes

Le problème du théâtre des cadres a une date limite ferme. Au 2026-09-24, zéro norme harmonisée
n'est citée au Journal officiel, donc la présomption de conformité de l'article 40 n'est pas encore
disponible pour quiconque [4]. EN 18286, la norme de gestion de la qualité visant l'article 17, a
été publiée en juillet 2026, la première norme JTC 21 rédigée pour le règlement sur l'IA à atteindre
la publication, mais elle n'est pas encore citée au Journal officiel, donc elle ne porte aucune
présomption de conformité [4][12]. Les normes de gestion des risques de l'article 9, de
journalisation de l'article 12 et de cybersécurité de l'article 15 ont été signalées comme étant
toujours au stade de l'enquête à la mi-2026, visant la fin de 2026 [13]. EN ISO/IEC 42001:2026,
l'adoption européenne de la norme de système de gestion de l'IA, n'est pas le système de gestion de
la qualité de l'article 17 et ne prouve pas en soi la conformité [5]. La conséquence pratique pour
une fonction de gouvernance : pour la période couverte par cette édition, il n'existe aucune norme
contre laquelle vous pouvez vous certifier pour obtenir une présomption légale. Vous devez
construire les contrôles et les preuves vous-même et être prêt à les défendre sur leurs mérites.

### La vague réglementaire : l'omnibus numérique et l'application de la gouvernance de l'IA de finalité générale

La loi a bougé deux fois à l'été 2026, dans des directions opposées, et les deux mouvements pointent
vers l'ingénierie. D'abord,
[le train de mesures omnibus numérique, Règlement (UE) 2026/1744](/bok/eu-ai-act#the-act-and-the-omnibus),
est entré en vigueur le 27 juillet 2026, six jours avant la date limite du 2 août pour les risques
élevés, et a réinitialisé le chronomètre : les obligations de l'annexe III relatives aux risques
élevés ont été reportées du 2 août 2026 au 2 décembre 2027, et les risques élevés intégrés de
l'annexe I du 2 août 2027 au 2 août 2028 [14][19]. Le temps supplémentaire est réel, mais ce n'est
pas un allègement de l'ingénierie ; c'est plus de piste pour la faire. Deuxièmement, et non affectée
par l'omnibus numérique, l'application de la gouvernance de l'IA de finalité générale est devenue
effective le 2 août 2026 : le Bureau de l'IA peut désormais demander de la documentation, évaluer
les modèles et exiger des mesures, et la Commission peut infliger des amendes aux prestataires de
modèles de finalité générale jusqu'à 3 % du chiffre d'affaires annuel mondial ou 15 millions d'EUR,
le montant le plus élevé étant retenu, en vertu de l'article 101 [15]. Le 29 août 2026, la
vice-présidente exécutive de la Commission Henna Virkkunen a annoncé que le Bureau de l'IA avait
formellement envoyé ses premières demandes d'information à un certain nombre de prestataires de
modèles de finalité générale, couvrant la sécurité des modèles, les évaluations externes
indépendantes et la surveillance des modèles une fois qu'ils sont sur le marché [16]. Ce que les
obligations exécutoires demandent (évaluations de modèles, tests adversariaux, signalement
d'incidents, sécurité des poids) est un programme d'ingénierie, pas un classeur de politique.

Les prochains basculements sont datés dans l'omnibus numérique lui-même [19]. Le 2 décembre 2026,
les nouvelles interdictions de l'article 5 concernant les images intimes générées par l'IA sans
consentement et les matériels d'abus sexuel d'enfants s'appliquent, et les prestataires de systèmes
génératifs mis sur le marché avant le 2 août 2026 doivent respecter l'obligation de marquage de
l'article 50(2). Les obligations de l'annexe III relatives aux risques élevés suivent le 2 décembre
2027 et celles de l'annexe I le 2 août 2028 ; les systèmes à risque élevé destinés aux autorités
publiques qui étaient déjà sur le marché doivent être conformes au 2 août 2030.
[Le chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus) mappe chaque date à l'artefact qui y
répond.

Le même mouvement apparaît en dehors de l'UE.
[La loi SB 53 de Californie](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
la Loi sur la transparence de l'intelligence artificielle de pointe, signée le 29 septembre 2025 et
en vigueur depuis le 1er janvier 2026, oblige les grands développeurs de pointe (modèles entraînés
avec plus de 10^26 opérations ; chiffre d'affaires annuel supérieur à 500 millions USD) à publier un
cadre d'IA de pointe, et chaque développeur de pointe, grand ou non, à signaler les incidents de
sécurité critiques au Bureau des services d'urgence de l'État dans les 15 jours, avec des pénalités
civiles pouvant atteindre 1 million USD par violation recouvrées par le procureur général [17][18].
Son champ d'application est étroit (le chapitre 08 le place à côté des autres
[lois des États américains](/bok/regulatory-map#us-federal-and-state-laws)), mais ce qu'il demande,
un cadre publié et
[un pipeline d'incidents qui fonctionne selon un chronomètre](/bok/incidents#the-overlapping-clocks),
est à nouveau un livrable d'ingénierie.

### Le changement d'agent

Le dernier signal est l'objet de la gouvernance elle-même. Les agents qui naviguent, exécutent du
code, appellent des API et agissent sous autorité déléguée sont maintenant la chose la plus
difficile et la plus nouvelle à gouverner, et les preuves que les contrôles hérités ne peuvent pas
les voir s'accumulent. La prévision de Gartner selon laquelle d'ici 2029 plus de la moitié des
attaques réussies contre les agents d'IA exploiteront les faiblesses du contrôle d'accès et
l'injection de prompts [3] nomme l'identité et l'injection (préoccupations d'exécution) comme la
surface d'attaque dominante. Le problème d'identité est concret : le 5 février 2026, le Centre
national d'excellence en cybersécurité du NIST a publié un document conceptuel sur la façon dont
l'identification, l'authentification et l'autorisation s'appliquent pour que les agents soient «
connus, de confiance et correctement gouvernés », demandant comment les actions des agents peuvent
être enregistrées de manière inviolable et liées à un humain pour la non-répudiation [20]. Un agent
exécuté sur un compte de service générique et partagé échoue ce test par construction : ses actions
ne peuvent pas être tracées ou révoquées précisément. Le Top 10 d'OWASP pour les applications
d'agents 2026 catalogue les modes de défaillance qui en résultent, du détournement d'objectif
d'agent (ASI01) à travers l'utilisation abusive d'outils (ASI02) et l'abus d'identité et de
privilèges d'agent (ASI03) aux agents voyous (ASI10) [21]. Et l'enquête auprès des fournisseurs de
2026 citée ci-dessus signale environ une violation d'IA sur huit impliquant des systèmes d'agents
[7]. Le modèle de menace s'est déplacé vers la couche que le registre papier ne peut pas atteindre.
Le chapitre 23 mappe [ces menaces aux contrôles](/bok/governing-agents#threats-mapped-to-controls).

## Ce qui change quand la gouvernance est ingéniérée

Les cinq problèmes partagent une racine commune : une gouvernance qui décrit plutôt que de
fonctionner. Ingéniérer la gouvernance change l'artefact, et changer l'artefact change ce que la
fonction peut promettre. Quand le registre est alimenté par le pipeline de déploiement, « quel
système d'IA fonctionne ? » est une requête en direct, pas une supposition trimestrielle, et
l'obsolescence du problème 1 cesse d'exister. Quand une `eval gate`} échoue la construction sur un
seuil de résistance à l'injection baissé et une politique compilée en code bloque un déploiement
hors région, l'examen ponctuel du problème 2 et la porte de fin de ligne du problème 3 cèdent la
place à des contrôles qui se déclenchent où le système change. Quand les décisions de guardrail, les
résultats d'évaluation et les verdicts de politique s'écoulent dans un magasin d'assurance sous
forme de registres lisibles par machine, le théâtre des cadres du problème 4 est répondu par une
mesure qui est le taux de chute d'un mode de défaillance nommé, pas un compte de cellules vertes. Et
quand l'identité précède l'autonomie et la télémétrie devient un signal de contrôle en direct, le
chemin de données d'exécution du problème 5 est l'épine dorsale plutôt qu'une réflexion tardive,
donc les trois questions deviennent répondables n'importe quel mardi donné, à partir de systèmes en
direct.

Rien de cela n'est une affirmation que la gouvernance ingéniérée garantit la conformité ; aucun
artefact ne le fait, et aucune norme ne confère encore une présomption. L'affirmation est plus
étroite et plus utile : mesurée par rapport à la réduction effective du risque et aux preuves prêtes
pour l'audit, une fonction de gouvernance qui fonctionne bat une qui est écrite, et le marché, le
régulateur et le modèle de menace ont tous, entre avril 2025 et août 2026, commencé à demander la
version qui fonctionne. C'est pourquoi maintenant.

> **En pratique**
> À l'intérieur d'une grande entreprise de télécommunications, le passage de « documenté » à «
> ingéniérée » était visible dans un exercice d'incident d'un seul trimestre. La version papier a
> répondu à « quels agents peuvent atteindre l'API des paiements ? » avec une feuille de calcul qui
> était obsolète d'une semaine et manquait deux services mis en place depuis le dernier examen.
> Après que le registre ait été connecté au pipeline de déploiement et que chaque agent ait reçu une
> identité délimitée, la même question était une requête qui retournait les propriétaires, les
> portées et les horodatages de dernière consultation en secondes, et un agent qui se comportait mal
> pouvait être révoqué sans casser les autres. La preuve pour l'exercice n'a pas été assemblée après
> coup ; elle était déjà dans le magasin d'assurance.

**Correspondances :** Règlement de l'UE sur l'IA art. 4/4a (maîtrise, données de détection des
biais), art. 15 (robustesse, cybersécurité), art. 17 (système de gestion de la qualité), art. 53/55
(gouvernance de l'IA de finalité générale), art. 101 (amendes pour gouvernance de l'IA de finalité
générale) · ISO/IEC 42001 · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 pour les
applications d'agents 2026 (ASI01–ASI03, ASI10) · SB 53 de Californie · stack à cinq couches, toutes
les couches. Les mappages sont illustratifs, pas une affirmation de conformité.

## Sources

[1] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; only 1.5% will not need more staff; 77% working on AI governance; 5% of the function in Security; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[2] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[3] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, >50% of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[6] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[7] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[8] "The State of the AI Governance Job Market in 2026" (1,997 US postings; observability platforms 41%, Python 28%, NIST frameworks 27%; updated 2026-08-04). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[9] "Engineering Manager, GRC" (build an "AI-forward GRC engineering function"; "translate policies into policy-as-code"; Claude "as a virtual GRC analyst"; no longer accepting applications on 2026-09-24). Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[12] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[13] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[14] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[15] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[16] Statement announcing the AI Office's first formal requests for information to GPAI providers (model security, independent external evaluations, post-market monitoring; recipients not named). Henna Virkkunen, Executive Vice-President of the European Commission (LinkedIn). 2026-08-29. https://www.linkedin.com/feed/update/urn:li:activity:7499411372032602112/ (verified: primary)
[17] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1: new Art. 5(1)(ba)–(bb) from 2 Dec 2026; new Art. 111(4) (Art. 50(2) marking for systems placed on the market before 2 Aug 2026, by 2 Dec 2026); Art. 111(2) (public-authority high-risk systems by 2 Aug 2030); Art. 113 (Annex III 2 Dec 2027; Annex I 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[20] "Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization" (concept paper; agents "known, trusted, and properly governed"; tamper-proof logging and non-repudiation). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[21] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Agent Identity & Privilege Abuse, … ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[22] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[23] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
