---
lang: fr
source: bok/09-glossary.md
sourceHash: "74f57d118a1f998ca0b0ad563a37274cb81318c198299053529a104759296753"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 09. Glossaire

> Les définitions canoniques du livre : chaque terme défini une fois, par ordre alphabétique, et
> référencé croisé au chapitre qui le traite en détail.

Les termes sont énumérés par ordre alphabétique sous des en-têtes de lettres, et chaque définition
compte au maximum 60 mots. Lorsqu'un terme a une orthographe canonique dans le guide de style (§8),
cette orthographe est utilisée ici et partout dans le livre. Un terme tiré d'une loi, d'une norme ou
d'un article porte une citation `[n]` à sa source ; un terme que le livre invente n'en porte pas, et
son chapitre est sa source. Les définitions légales sont paraphrasées, et le texte cité gouverne. «
Contraste avec » nomme les termes avec lesquels il est le plus souvent confondu, « Voir » relie la
section qui le développe, et la parenthèse énumère les chapitres qui le traitent. Chaque terme a
également sa propre page, liée à partir de son nom, avec ses sources, les chapitres qui l'utilisent
et une citation prête à l'emploi.

## Paires couramment confondues

Dix paires sont confondues assez souvent dans les examens pour qu'il vaille la peine de les corriger
dans le vocabulaire d'une équipe. La page de chaque terme porte la même comparaison.

| Paire | La différence | Pourquoi cela importe pour les contrôles |
|---|---|---|
| [Transparence](/glossary/transparency) et [explicabilité](/glossary/explainability) | Ce qui s'est passé, à partir des registres de ce qui a fonctionné, par rapport à la façon dont une décision a été prise | Deux artefacts : registre, fiches et journaux pour le premier ; une méthode d'explication avec un test de fidélité pour le second |
| [Provenance des données](/glossary/data-provenance) et [lignage des données](/glossary/data-lineage) | D'où venaient les données et à quelles conditions, par rapport au chemin qu'elles ont parcouru dans vos propres pipelines | Un lignage parfait sur une provenance inconnue est toujours non gouverné ; l'effacement et la restitution en ont besoin tous les deux |
| [Dérive des données](/glossary/data-drift) et [dérive conceptuelle](/glossary/concept-drift) | Les entrées changent, par rapport à la relation entre les entrées et la bonne réponse qui change | Le premier apparaît dans les moniteurs d'entrée avant l'arrivée des étiquettes ; le second seulement dans les résultats sur les étiquettes fraîches |
| [Incident d'IA](/glossary/ai-incident) et [problème (par rapport à incident)](/glossary/issue-versus-incident) | Un préjudice s'est produit, par rapport à un défaut ou une déviation qui n'a pas produit d'événement nuisible | Les incidents déclenchent les horloges de signalement et la CAPA ; les problèmes vont à un carnet de commandes suivi avec un propriétaire et une date d'échéance |
| [Fournisseur](/glossary/provider) et [déployeur](/glossary/deployer) | Développe le système et le place sur le marché sous son propre nom, par rapport à l'utilise sous sa propre autorité | Obligations différentes et preuves différentes ; une modification substantielle peut transformer un déployeur en fournisseur |
| [Humain dans la boucle (HITL)](/glossary/human-in-the-loop-hitl) et [humain sur la boucle (HOTL)](/glossary/human-on-the-loop-hotl) | Une personne approuve chaque décision conséquente, par rapport à une personne qui surveille et peut arrêter le système | HITL est attesté par les journaux d'approbation et les taux de remplacement ; HOTL par les alertes et un chemin d'arrêt testé |
| [Appétence pour le risque](/glossary/risk-appetite) et [tolérance au risque](/glossary/risk-tolerance) | Combien de risque l'organisation prendra globalement, par rapport à la bande résiduelle qu'un système peut porter | L'appétence est une déclaration du conseil compilée en données ; la tolérance est le seuil qu'une porte de déploiement lit |
| [Fiche de modèle](/glossary/model-card) et [fiche de système](/glossary/system-card) | Documentation d'un modèle, par rapport au système déployé : modèles, invites, récupération, outils, garde-fous et supervision | Les déployeurs et les autorités ont besoin de la vue système ; une fiche de modèle seule manque les contrôles autour du modèle |
| [Injection de prompt](/glossary/prompt-injection) et [jailbreak](/glossary/jailbreak) | Toute entrée qui modifie le comportement de manière involontaire, directe ou cachée dans le contenu traité, par rapport aux entrées visant à supprimer les règles de sécurité | Les évaluations de jailbreak testent les refus ; l'injection a également besoin d'outils de moindre privilège et d'isolation du contenu non fiable |
| [Pseudonymisation](/glossary/pseudonymisation) et [données anonymes](/glossary/anonymous-data) | Réattribuables avec des informations conservées séparément, donc toujours des données à caractère personnel, par rapport à ne se rapportant pas du tout à une personne identifiable | Les données pseudonymisées conservent chaque obligation du RGPD ; une affirmation d'anonymat nécessite une évaluation datée |

## A

**A2A (Agent2Agent protocol).** Un protocole ouvert pour que les agents se confient des tâches les
uns aux autres, à la version 1.0 depuis mars 2026 [129] et un projet Growth Stage de la Agentic AI
Foundation dirigée par la Linux Foundation depuis août 2026 [130]. Les serveurs doivent authentifier
chaque requête, mais l'autorisation, l'étendue et la révocation de l'autorité accordée en cours de
tâche sont laissées à l'implémenteur [129]. À contraster avec [MCP](/glossary/mcp). Voir
[ch. 23, Multi-agent systems and delegation chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(ch. 23)

**Abstention band.** Une plage de scores dans laquelle un système n'agit pas de son propre chef mais
achemine le cas vers un examinateur humain. Sa largeur est définie par le niveau de risque ; la
taille de la bande et le taux de dérogation des examinateurs sont surveillés comme des signaux. La
prédiction conforme offre un moyen de la dimensionner [20]. Voir
[ch. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier). (ch. 11)

**Acceptable-use policy (AUP).** Les règles destinées au personnel pour utiliser les outils d'IA :
quels outils sont approuvés, quelles classes de données peuvent aller où, obligations d'examiner et
de divulguer les résultats, journalisation, attestation avant l'accès et conséquences. Elle est
appliquée par une passerelle autorisée et la découverte, pas seulement le manuel. Voir
[ch. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff) ;
[ch. 05, Pattern: Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway). (ch. 05, 12)

**Adaptiveness.** La capacité d'un système d'IA à modifier son comportement pendant son utilisation,
par apprentissage après le déploiement ; optionnel selon la définition du Reglamento de IA [21].
Pour la gouvernance, c'est un déclencheur de changement parmi plusieurs : la plupart des changements
de comportement en pratique proviennent des mises à jour des fournisseurs, de la dérive, des
modifications de prompts ou des actualisations de corpus. Voir
[ch. 11, From definition element to registry field](/bok/ai-defined#from-definition-element-to-registry-field).
(ch. 11)

**ADMT (Californie).** Automated decisionmaking technology selon les réglementations CCPA de
Californie : technologie qui traite des données à caractère personnel et utilise le calcul pour
remplacer, ou remplacer substantiellement, la prise de décision humaine. Son utilisation pour des
décisions importantes déclenche des obligations de notification préalable à l'utilisation,
d'exclusion ou d'appel, d'accès et d'évaluation des risques [22]. À contraster avec
[Automated decision-making (ADM)](/glossary/automated-decision-making-adm). Voir
[ch. 19, United States](/bok/privacy-and-ai#united-states). (ch. 19)

**Adverse action notice.** L'avis qu'un créancier américain doit donner lorsqu'il refuse ou aggrave
le crédit, en indiquant les raisons principales spécifiques [23]. Les raisons doivent être exactes
même lorsque la décision provient d'un modèle complexe, donc les codes de raison ont besoin d'un
test de fidélité. À contraster avec [Decision notice](/glossary/decision-notice). Voir
[ch. 20, Credit and lending](/bok/existing-law#credit-and-lending). (ch. 16, 20)

**Adverse-impact ratio (AIR).** Le taux de sélection d'un groupe divisé par le taux de sélection du
groupe le plus sélectionné. Selon les Uniform Guidelines américaines, un ratio inférieur à
quatre-cinquièmes est généralement traité comme une preuve d'impact adverse [24] ; la pratique
d'ingénierie le lit comme un déclencheur d'enquête, rapporté avec des comptages et un intervalle de
confiance. Voir
[ch. 16, The four-fifths rule and the adverse-impact ratio](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio).
(ch. 16)

**AESIA.** L'Agencia Española de Supervisión de Inteligencia Artificial, une agence d'État basée à
La Corogne dont le statut a été approuvé par le décret royal 729/2023, créée pour agir en tant
qu'autorité de surveillance nationale de l'Espagne pour le Reglamento de IA [1]. Voir
[ch. 21, Spain: AESIA, the sandbox and a bill](/bok/ai-laws-worldwide#spain-aesia-the-sandbox-and-a-bill).
(ch. 08, 21)

**Agent (agentic AI).** Un système d'IA qui agit (navigue, exécute du code, appelle des API, déplace
des données ou délègue à d'autres agents) sous autorité déléguée, plutôt que de produire seulement
du texte. Les agents sont l'objet le plus difficile à gouverner car leur comportement est émergent
et leurs actions ont des effets externes. Voir
[ch. 23, What makes an agent a governance object](/bok/governing-agents#what-makes-an-agent-a-governance-object)
; [ch. 11, Agentic systems](/bok/ai-defined#agentic-systems). (ch. 01, 11, 23)

**Agent Card.** Le document JSON qu'un agent A2A publie, généralement à
`/.well-known/agent-card.json`, décrivant son identité, ses compétences, son point de terminaison de
service et les schémas d'authentification qu'il accepte. Il peut être signé avec JWS sur une forme
canonicalisée, afin qu'un client puisse vérifier que la carte n'a pas été altérée et provient du
fournisseur revendiqué [129]. Une liste de permission de pairs n'admet que les agents enregistrés
avec des cartes vérifiées. Voir
[ch. 23, Multi-agent systems and delegation chains](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(ch. 23)

**Agent registry.** L'inventaire conscient du runtime de chaque acteur non humain (modèle, service
et agent), chacun avec un propriétaire, une portée déclarée, un statut et un kill switch, alimenté
par un chemin de données runtime plutôt que saisi à la main. C'est l'artefact qui répond à « quelle
IA fonctionne ? ». Voir [ch. 23, The agent registry](/bok/governing-agents#the-agent-registry) ;
[ch. 05, Pattern: Agent Registry](/bok/patterns#pattern-agent-registry). (ch. 04, 05, 06, 23)

**AI Act (UE).** Reglamento de IA 2024/1689, la loi horizontale et à risque échelonné de l'UE pour
l'IA, modifiée par l'Omnibus Digital [2]. Elle classe les systèmes par risque (interdit, haut
risque, limité, minimal) et impose des obligations en conséquence. Voir
[ch. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 08, 18)

**AI business operator (Corée).** Selon la Korean AI Basic Act, une personne morale, une
organisation, une personne physique ou un organisme d'État exerçant une activité d'IA, divisée en
opérateurs d'activité de développement, qui développent et fournissent l'IA, et opérateurs
d'activité d'utilisation, qui offrent des produits ou services construits sur celle-ci [25]. Voir
[ch. 18, The same roles across regimes](/bok/eu-ai-act#the-same-roles-across-regimes). (ch. 18, 21)

**AI governance committee.** L'organe interfonctionnel qui prend les décisions qu'une porte ne peut
pas : accepter le risque résiduel au-delà de l'autorité d'un propriétaire de produit, accorder des
exceptions, peser les compromis de valeur et approuver l'ensemble des politiques. Il décide ; les
portes du pipeline appliquent ses décisions et enregistrent les preuves. Les agences fédérales
américaines gèrent de tels conseils par mandat [26]. Voir
[ch. 12, The committee decides, the gates enforce](/bok/governance-program#the-committee-decides-the-gates-enforce).
(ch. 12)

**AI governance engineer.** La personne qui détient la capacité d'ingénierie de la gouvernance de
l'IA et est responsable des trois questions en production ; une capacité et un rôle, pas
nécessairement un titre de poste. Voir
[ch. 06, Capability first, title second](/bok/the-role#capability-first-title-second). (ch. 06)

**AI governance engineering.** L'application de la pratique d'ingénierie (pensée systémique, pensée
produit et code) à la gouvernance des systèmes d'IA ; mesurée par la réduction effective du risque
et les preuves prêtes pour l'audit. À contraster avec [Trustworthy AI](/glossary/trustworthy-ai).
Voir [ch. 01, The definition](/bok/definition#the-definition). (ch. 01)

**AI harm.** Une conséquence négative de la construction ou de l'utilisation d'un système d'IA pour
une personne, un groupe, une organisation, la société ou l'environnement. Le livre nomme chaque
préjudice par le niveau sur lequel il atterrit, son mécanisme, un mode de défaillance testable et le
contrôle qui le détecte, mappé à la taxonomie du MIT AI Risk Repository [27]. Voir
[Harms atlas](/resources/harms). (ch. 03)

**AI hazard.** Dans la définition de l'OCDE, un événement ou une série d'événements où le
développement, l'utilisation ou le dysfonctionnement d'un système d'IA pourrait plausiblement
conduire à un incident d'IA [28]. Un aléa est un préjudice qui ne s'est pas encore produit ; un
quasi-accident est un aléa qu'un contrôle a interrompu. À contraster avec
[AI incident](/glossary/ai-incident). Voir
[ch. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

**AI incident.** Dans la définition de l'OCDE, un événement ou une série d'événements où le
développement, l'utilisation ou le dysfonctionnement d'un ou plusieurs systèmes d'IA conduit
directement ou indirectement à un préjudice à la santé, aux infrastructures critiques, aux droits
humains ou fondamentaux, aux biens, aux communautés ou à l'environnement [28]. À contraster avec
[Issue (versus incident)](/glossary/issue-versus-incident), [AI hazard](/glossary/ai-hazard) et
[Serious incident](/glossary/serious-incident). Voir
[ch. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

**AI literacy.** Selon le Reglamento de IA, les compétences, connaissances et compréhension qui
permettent aux fournisseurs, déployeurs et personnes affectées d'utiliser l'IA de manière éclairée
et de saisir ses opportunités, risques et préjudices possibles. L'article 4, tel que modifié en
2026, exige que les fournisseurs et déployeurs prennent des mesures pour la soutenir, sans garantir
aucun niveau individuel [2]. Voir
[ch. 18, AI literacy and bias-detection data](/bok/eu-ai-act#ai-literacy-and-bias-detection-data) ;
[ch. 12, AI literacy as code](/bok/governance-program#ai-literacy-as-code). (ch. 12, 18)

**AI Office.** L'organe de la Commission européenne qui supervise l'IA à usage général et coordonne
l'application du Reglamento de IA, avec des pouvoirs d'enquête et la capacité à imposer des
pénalités aux fournisseurs de GPAI [2]. Voir
[ch. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (ch. 08, 18)

**AI regulatory sandbox.** Selon le Reglamento de IA, un cadre contrôlé établi par une autorité
compétente dans lequel les fournisseurs développent, entraînent, testent et valident des systèmes
d'IA innovants pendant une période limitée selon un plan de sandbox, éventuellement avec des tests
en conditions réelles. Chaque État membre doit en avoir un opérationnel d'ici le 2 août 2027 [2]. À
contraster avec [Testing in real-world conditions](/glossary/testing-in-real-world-conditions). Voir
[ch. 18, Sandboxes and real-world testing](/bok/eu-ai-act#sandboxes-and-real-world-testing). (ch.
18, 21)

**AI RMF functions.** Les quatre fonctions principales du NIST AI Risk Management Framework
(**Govern, Map, Measure, Manage**), utilisées dans tout le livre comme cible de mappage pour les
contrôles [3]. Voir
[ch. 22, The Core: 19 categories](/bok/principles-and-standards#the-core-19-categories). (ch.
08, 22)

**AI RMF Playbook.** Le compagnon en ligne du NIST pour l'AI RMF. Pour chaque sous-catégorie, il
donne une note About, des actions suggérées, des questions de transparence et de documentation et
des références [29]. C'est du matériel volontaire à adapter, pas une liste de contrôle ; ses
questions de documentation fonctionnent bien comme critères d'acceptation. Voir
[ch. 22, How a Playbook entry is structured](/bok/principles-and-standards#how-a-playbook-entry-is-structured).
(ch. 22)

**AI RMF profile.** Une application de l'AI RMF Core à un contexte. NIST décrit les profils de cas
d'usage, les profils temporels (un profil actuel et un profil cible dont l'écart guide le travail)
et les profils intersectoriels tels que NIST AI 600-1 pour l'IA générative [30]. Voir
[ch. 22, Profiles and the Generative AI Profile](/bok/principles-and-standards#profiles-and-the-generative-ai-profile).
(ch. 22)

**Système de IA.** Pour la gouvernance, l'objet que la définition de l'IA met en scope. Selon le
Règlement de IA de l'UE, un système basé sur des machines conçu pour fonctionner avec une certaine
autonomie, possiblement adaptable après le déploiement, qui déduit de ses entrées comment générer
des sorties susceptibles d'influencer des environnements physiques ou virtuels [2][21]. L'inférence
le distingue des logiciels basés sur des règles. Voir
[ch. 11, Four definitions, compared](/bok/ai-defined#four-definitions-compared);
[ch. 18, What counts as an AI system](/bok/eu-ai-act#what-counts-as-an-ai-system). (ch. 11, 18)

**Évaluation d'impact du système de IA.** Une évaluation de la façon dont un système de IA et ses
applications prévisibles peuvent affecter les individus, les groupes et la société, effectuée tout
au long du cycle de vie et mise à jour selon les besoins; ISO/IEC 42005:2025 fournit les
orientations [17]. À contraster avec [FRIA](/glossary/fria). Voir
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(ch. 14)

**Cycle de vie du système de IA (OCDE).** Les phases itératives de l'OCDE pour un système de IA:
planifier et concevoir; collecter et traiter les données; construire ou adapter les modèles; tester,
évaluer, vérifier et valider; déployer; exploiter et surveiller; retirer ou désactiver [31]. Le
retrait peut intervenir à tout moment pendant l'exploitation. Voir
[ch. 22, The OECD AI system definition and lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle).
(ch. 22)

**Greenwashing de l'IA.** Exagérer ou inventer l'utilisation ou la capacité de l'IA dans les
communications marketing ou aux investisseurs. Les régulateurs américains le traitent comme une
tromperie; la SEC a réglé des accusations contre deux conseillers en placement sur de telles
affirmations en mars 2024 [32]. Voir
[ch. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states);
[ch. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (ch. 05, 20)

**AIBOM.** Nomenclature de l'IA: l'inventaire lisible par machine des composants d'un système de IA
(modèles, ensembles de données, dépendances) dans des formats tels que CycloneDX ML-BOM ou le profil
IA SPDX 3.0. Voir [ch. 05, Pattern: AIBOM](/bok/patterns#pattern-aibom). (ch. 04, 05)

**AICM.** La matrice de contrôle de l'IA de la CSA, un cadre de contrôle (v1.1, 247 objectifs de
contrôle dans 18 domaines) qui correspond à ISO 42001, ISO 27001 et NIST AI RMF et sous-tend STAR
pour l'IA [4]. Voir
[ch. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (ch. 08)

**AIMA.** L'évaluation de maturité de l'IA OWASP, rapportée à la v1.0 (août 2025), qui évalue
l'étendue d'un programme de sécurité et de gouvernance de l'IA dans les domaines [5]. Voir
[ch. 07, How this relates to certification and other assessments](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments).
(ch. 07)

**AIMS.** Un système de gestion de l'IA: la structure de gouvernance, les rôles, les contrôles et la
boucle d'amélioration continue qu'ISO/IEC 42001 certifie. Un AIMS n'est pas le système de gestion de
la qualité de l'article 17 du Règlement de IA. À contraster avec
[QMS (Art. 17)](/glossary/qms-art-17). Voir
[ch. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio). (ch.
07, 08, 22)

**Dégoût algorithmique.** Un recours qui ordonne la suppression des modèles ou algorithmes
développés avec des données obtenues illégalement, pas seulement les données elles-mêmes [33]. Se
conformer et le prouver nécessite une traçabilité de chaque ensemble de données à chaque modèle
entraîné sur celui-ci. Voir
[ch. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[ch. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (ch. 05, 20)

**Évaluation d'impact algorithmique (AIA).** L'évaluation que la Directive du Canada sur la prise de
décision automatisée exige avant qu'un système fédéral de prise de décision automatisée ne soit mis
en production. Elle établit un niveau d'impact de I à IV qui adapte les mesures de sauvegarde
requises, est publiée sur le Portail du gouvernement ouvert et est mise à jour lorsque le système
change [34]. Voir
[ch. 21, Canada: after AIDA, the Directive on Automated Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making);
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch.
14, 21)

**Gestion algorithmique.** L'utilisation de systèmes de surveillance et de prise de décision
automatisés pour diriger, évaluer ou sanctionner les travailleurs. La Directive de l'UE sur le
travail de plateforme limite les données que ces systèmes peuvent traiter et exige la transparence,
la supervision humaine et un droit à l'examen humain [35]. Voir
[ch. 20, Employment](/bok/existing-law#employment). (ch. 20)

**Norme d'enregistrement de la transparence algorithmique (ATRS).** Le modèle de norme du
Royaume-Uni pour que les organismes du secteur public publient comment et pourquoi ils utilisent des
outils algorithmiques; obligatoire pour les ministères gouvernementaux et pour les organismes à
distance qui fournissent des services publics ou de première ligne [36]. Voir
[ch. 21, United Kingdom: principles, regulators and public-sector records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records).
(ch. 21)

**ALTAI.** La liste d'évaluation pour l'IA digne de confiance, publiée par le groupe d'experts de
haut niveau de l'UE sur l'IA en juillet 2020: une liste de contrôle d'auto-évaluation qui transforme
les sept exigences des directives éthiques de 2019 en questions [37]. Utile comme source de
contrôles candidats; répondue une fois, c'est seulement une attestation. Voir
[ch. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(ch. 11, 22)

**Annexe I (Règlement de IA).** L'annexe du Règlement de IA énumérant la législation d'harmonisation
de l'Union selon laquelle l'IA est intégrée dans les produits réglementés (machines, dispositifs
médicaux, jouets et autres); les obligations pour ces systèmes intégrés à haut risque entrent en
vigueur à partir du 2 août 2028 selon le calendrier du Omnibus Digital [2]. À contraster avec
[Annexe III](/glossary/annex-iii). Voir
[ch. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(ch. 08, 18)

**Annexe III.** L'annexe du Règlement de IA énumérant les cas d'usage à haut risque (biométrie,
infrastructure critique, éducation, emploi, services essentiels, application de la loi, migration,
justice); les obligations pour ceux-ci entrent en vigueur selon le calendrier du Omnibus Digital
[2]. À contraster avec [Annexe I (Règlement de IA)](/glossary/annex-i-eu-ai-act). Voir
[ch. 18, High-risk through use (Annex III)](/bok/eu-ai-act#high-risk-through-use-annex-iii). (ch.
08, 18)

**Données anonymes.** Information qui ne se rapporte pas à une personne identifiable, jugée par
rapport à tous les moyens raisonnablement susceptibles d'être utilisés par quiconque pour
l'identifier [38]. Elle sort du champ d'application du RGPD, mais la réclamation s'érode à mesure
que les données auxiliaires et les techniques de réidentification s'améliorent, elle nécessite donc
une évaluation datée. À contraster avec [Pseudonimisation](/glossary/pseudonymisation). Voir
[ch. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(ch. 19)

**Filtre de l'article 6(3).** La dérogation selon laquelle un système de l'annexe III n'est pas à
haut risque lorsqu'il ne pose pas de risque significatif de préjudice et répond à l'une des quatre
conditions (tâche procédurale étroite, amélioration du travail humain achevé, détection de modèles,
tâche préparatoire). Le profilage des personnes physiques le neutralise toujours; le fournisseur
documente et enregistre l'évaluation [2]. À contraster avec
[Profiling override](/glossary/profiling-override). Voir
[ch. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 18)

**ASI01–ASI10.** Les dix risques du Top 10 OWASP pour les applications agentiques 2026 [6]: ASI01
Agent Goal Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04
Agentic Supply Chain Vulnerabilities, ASI05 Unexpected Code Execution (RCE), ASI06 Memory & Context
Poisoning, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent
Trust Exploitation et ASI10 Rogue Agents. Voir
[ch. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls);
[ch. 08, OWASP GenAI Security Project](/bok/regulatory-map#owasp-genai-security-project). (ch. 05,
08, 23)

**ATLAS.** Le paysage des menaces adversariales de MITRE pour les systèmes d'intelligence
artificielle, une base de connaissances des tactiques et techniques des adversaires contre l'IA, y
compris les techniques spécifiques aux agents [7]. Voir
[ch. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[ch. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls). (ch. 05, 10,
15, 23)

**Preuves prêtes pour l'audit.** Preuves émises comme sous-produit de la construction sous une forme
qu'un auditeur peut lire directement (lisible par machine, signée, horodatée), de sorte que l'audit
est une requête, pas un projet de collecte. Voir
[ch. 01, Three clarifiers](/bok/definition#three-clarifiers). (ch. 01, 04)

**Mandataire.** Selon le Règlement de IA de l'UE, une personne établie dans l'Union avec un mandat
écrit d'un fournisseur non-UE d'un système de IA à haut risque ou d'un modèle de IA à usage général
pour exercer les obligations de ce fournisseur en son nom, y compris tenir la documentation
disponible aux autorités [2]. Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Prise de décision automatisée (ADM).** Une décision concernant une personne prise par des moyens
automatisés. L'article 22 du RGPD restreint les décisions basées uniquement sur le traitement
automatisé avec des effets juridiques ou similaires [38]; après le jugement SCHUFA, un score que les
prêteurs traitent comme déterminant est lui-même une telle décision [39]. Voir
[ch. 19, GDPR Article 22 after SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa). (ch.
16, 19)

**Biais d'automatisation.** La tendance d'une personne à trop se fier à la sortie d'un système
automatisé. L'article 14 du Règlement de IA de l'UE demande que les personnes supervisant les
systèmes à haut risque en restent conscientes {[2]}; la porte humaine enregistre l'approbateur, le
temps de décision et le taux de remplacement afin que la dégradation de la supervision soit visible.
Voir [ch. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier);
[ch. 04, Designing human oversight (Article 14)](/bok/the-stack#designing-human-oversight-article-14);
[ch. 23, What a good approval looks like](/bok/governing-agents#what-a-good-approval-looks-like).
(ch. 04, 11, 23)

**Autonomie.** Dans le Règlement de IA de l'UE et les textes de l'OCDE, un certain degré
d'indépendance d'action de l'implication humaine, que presque tous les systèmes de IA possèdent.
ISO/IEC 22989 utilise le mot pour une propriété beaucoup plus forte, un système qui peut changer son
propre objectif ou domaine d'utilisation, et appelle le cas ordinaire automatisation [40]. À
contraster avec [Autonomy level](/glossary/autonomy-level). Voir
[ch. 11, ISO/IEC 22989](/bok/ai-defined#isoiec-22989). (ch. 11, 23)

**Niveau d'autonomie.** Jusqu'à quel point un agent agit sans qu'une personne soit entre ses étapes,
défini par le responsable du déploiement comme une décision de conception plutôt que pris comme une
propriété du modèle; une échelle de recherche nomme cinq niveaux par le rôle de l'utilisateur, de
l'opérateur à l'observateur {[122]}. C'est un champ de registre lié à un ensemble de contrôles
minimum, et l'augmenter est un changement examiné. À contraster avec
[Autonomie](/glossary/autonomy). Voir
[ch. 23, Autonomy is a design decision](/bok/governing-agents#autonomy-is-a-design-decision). (ch.
15, 17, 23)

## B

**Biais.** Une erreur systématique qui favorise ou désavantage certaines personnes ou résultats. Le
NIST classe le biais de l'IA en trois catégories: systémique, statistique et informatique, et humain
{[41]}. Le biais peut entrer à n'importe quel stade du cycle de vie, il est donc testé par étape
plutôt qu'une seule fois. À contraster avec [Fairness](/glossary/fairness). Voir
[ch. 16, Where bias enters the lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle).
(ch. 16)

**Audit de biais (NYC Local Law 144).** Un audit indépendant, requis dans l'année précédant
l'utilisation par un employeur d'un outil de décision automatisée en matière d'emploi à New York,
qui rapporte les taux de sélection ou de notation et les ratios d'impact par sexe, race et origine
ethnique et leurs intersections ; son résumé doit être publié [42]. Voir
[ch. 20, Employment](/bok/existing-law#employment) ;
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch.
14, 20)

**Données biométriques.** Données à caractère personnel issues du traitement technique de traits
physiques, physiologiques ou comportementaux qui permettent ou confirment l'identification unique
d'une personne, comme les images faciales ou les empreintes digitales [38]. L'identification, la
vérification et la catégorisation sont traitées différemment selon le RGPD, le règlement sur l'IA et
d'autres lois. Voir [ch. 19, Biometrics](/bok/privacy-and-ai#biometrics). (ch. 19)

**Post-mortem sans culpabilité.** Un examen d'incident qui identifie les causes contributives sans
inculper aucun individu ou équipe, partant du principe que les gens ont agi raisonnablement sur la
base de ce qu'ils savaient et que ce sont les systèmes et processus qui peuvent être corrigés [43].
Ses déclencheurs sont définis à l'avance. Voir [ch. 17, Techniques](/bok/incidents#techniques).
(ch. 17)

**Déploiement bleu-vert.** Deux environnements de production identiques avec le trafic basculé entre
eux, de sorte qu'une version peut être annulée en basculant vers la version précédente [44]. Il
donne à un système d'IA un chemin testé et instantané vers la version précédente. À comparer avec
[Canary release](/glossary/canary-release). Voir
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control)
;
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 15)

**Provenance de construction (SLSA).** Un enregistrement vérifiable, au format SLSA, de ce qui a
construit un artefact, par quel processus et à partir de quelles entrées de haut niveau. Ses niveaux
de construction vont de L1, la provenance existe, à L2, signé par une plateforme de construction
hébergée, à L3, des constructions renforcées dont la provenance est très difficile à falsifier
[136]. Pour un modèle, les entrées incluent le digest du modèle de base et les enregistrements
d'admission du dataset. À comparer avec [Model signing](/glossary/model-signing). Voir
[ch. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (ch. 05)

## C

**CAC (Cyberspace Administration of China).** L'autorité de régulation d'Internet de la Chine
(国家互联网信息办公室), principal émetteur des règles de l'IA contraignantes (recommandation algorithmique,
synthèse profonde, services d'IA générative et étiquetage du contenu de l'IA) et l'organisme sous la
direction duquel TC260 publie le AI Safety Governance Framework [18]. Voir
[ch. 21, China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(ch. 08, 21)

**Calibrage.** La propriété selon laquelle la confiance d'un modèle correspond à sa précision : des
cas notés 0,9, environ neuf sur dix sont corrects. Les réseaux de neurones modernes sont souvent mal
calibrés [45], donc le calibrage est mesuré à la porte d'évaluation par version et sous-groupe avant
que tout seuil ne soit approuvé. À comparer avec
[Calibration within groups](/glossary/calibration-within-groups). Voir
[ch. 11, Calibration before thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Calibrage au sein des groupes.** La propriété d'équité selon laquelle, dans chaque groupe, les
personnes auxquelles on attribue un score s s'avèrent positives au taux s, de sorte qu'un score
signifie la même chose pour tout le monde. Elle entre généralement en conflit avec les taux d'erreur
égaux lorsque les taux de base diffèrent [46]. À comparer avec [Calibrage](/glossary/calibration) et
[Equalised odds](/glossary/equalised-odds). Voir
[ch. 16, The impossibility results](/bok/fairness-and-explainability#the-impossibility-results).
(ch. 16)

**Canary release.** Un déploiement partiel et limité dans le temps d'une modification sur une petite
part du trafic de production, évalué par rapport à un groupe de contrôle avant la poursuite du
déploiement [47]. Pour les systèmes d'IA, l'évaluation compare les métriques de qualité, sécurité et
équité en direct avec les critères de retour en arrière pré-enregistrés. À comparer avec
[Shadow deployment](/glossary/shadow-deployment) et
[Blue-green deployment](/glossary/blue-green-deployment). Voir
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control)
;
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 14, 15, 23)

**CAPA.** Action corrective et préventive, le résultat d'un examen d'incident. L'action corrective
corrige cette instance ; l'action préventive empêche la classe d'échec de se reproduire dans la
flotte, généralement sous la forme d'une évaluation de régression, d'un changement de politique et
d'une mise à jour du registre des risques, vérifiée avant la fermeture de l'incident [48]. Voir
[ch. 17, CAPA: from incident to risk register and eval suite](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite).
(ch. 17)

**Oubli catastrophique.** La tendance des réseaux de neurones à perdre les compétences antérieures
lorsqu'ils sont entraînés sur de nouvelles tâches [49]. C'est une raison pour laquelle chaque
réentraînement est un événement de changement qui réexécute la suite d'évaluation complète, pas
seulement les tests de la nouvelle capacité. Voir
[ch. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(ch. 11)

**Dérogation de sévérité catastrophique.** La règle selon laquelle tout scénario évalué au niveau de
sévérité maximal est Critique quelle que soit sa probabilité, ne peut pas être accepté par l'équipe
de livraison et doit être éliminé, réduit en sévérité ou accepté explicitement par l'organe
directeur pour une période fixe. NIST demande que de tels risques puissent être arrêtés en toute
sécurité [30]. Voir
[ch. 13, The catastrophic-severity override](/bok/risk-management#the-catastrophic-severity-override).
(ch. 13)

**Marquage CE.** La marque attestant la conformité d'un système d'IA à haut risque avec le règlement
sur l'IA de l'UE, apposée de manière visible, lisible et indélébile, ou numériquement pour les
systèmes fournis numériquement, avec le numéro de l'organisme notifié le cas échéant [2]. À comparer
avec [EU declaration of conformity](/glossary/eu-declaration-of-conformity). Voir
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration)
;
[ch. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(ch. 14, 18)

**Cedar.** Un langage de politique open-source pour l'autorisation fine, utilisé comme moteur de
politique en tant que code pour les décisions d'accès à l'exécution ; une alternative typée par
schéma et analysable à `OPA/Rego`. À comparer avec [OPA/Rego](/glossary/opa-rego). Voir
[ch. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**CEN-CENELEC JTC 21.** La commission technique conjointe des organismes de normalisation européens
CEN et CENELEC qui élabore les normes harmonisées du règlement sur l'IA, notamment EN 18286 sur la
gestion de la qualité et les projets sur la gestion des risques, la fiabilité et la cybersécurité
[50]. Voir [ch. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme).
(ch. 22)

**CIMD.** Client ID Metadata Document : le mécanisme par lequel un client OAuth s'identifie auprès
d'un serveur d'autorisation avec une URL, utilisée comme son ID client, qui pointe vers son document
de métadonnées. La spécification MCP du 2026-07-28 fait en sorte que les clients et les serveurs
d'autorisation la supportent et déprécie l'enregistrement dynamique des clients [8] ; la
spécification IETF est toujours un Internet-Draft (révision 02, 6 juil. 2026) au 2026-09-24 [132].
Voir
[ch. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28)
;
[ch. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 04, 05, 23)

**Registre des affirmations.** L'enregistrement de chaque déclaration publique sur la précision,
l'équité, la sécurité ou la capacité d'un système d'IA : le libellé exact, où elle apparaît, et
l'exécution d'évaluation, la valeur mesurée, l'intervalle et la population derrière elle. La copie
portant une affirmation dont la preuve est manquante, obsolète ou défaillante n'est pas publiée ; la
FTC exige des preuves compétentes et fiables pour de telles affirmations lorsqu'elles sont faites
[139]. Voir
[ch. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement)
; [ch. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (ch. 05, 20)

**Enregistrement de décision de classification.** Un enregistrement de registre versionnée de la
raison pour laquelle un système se situe sur un échelon donné de l'échelle des risques du règlement
sur l'IA : le point de l'annexe III, toute condition de l'article 6(3) sur laquelle on s'appuie, un
drapeau de profilage explicite, l'examinateur et la date {[2]. Il est réévalué chaque fois que la
finalité prévue change. À comparer avec [Profiling override](/glossary/profiling-override). Voir
[ch. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
; [Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 18)

**Spécifications communes.** Les spécifications techniques que la Commission peut adopter par acte
d'exécution en vertu de l'article 41 du règlement sur l'IA lorsqu'une demande de normalisation n'est
pas acceptée, les normes sont tardives ou elles ne traitent pas suffisamment les préoccupations
relatives aux droits fondamentaux ; la conformité avec celles-ci donne également une présomption de
conformité [2]. À comparer avec [Harmonised standard](/glossary/harmonised-standard). Voir
[ch. 22, How presumption of conformity works](/bok/principles-and-standards#how-presumption-of-conformity-works).
(ch. 22)

**Dérive conceptuelle.** Un changement dans la relation entre les entrées d'un système et la sortie
correcte, de sorte que la même entrée devrait maintenant obtenir une réponse différente {[51].
Contrairement à la dérive des données, elle ne s'affiche que dans les résultats : en production,
elle apparaît dans les performances sur les étiquettes fraîches et dans les tests de point de
changement sur le taux d'erreur. À comparer avec [Data drift](/glossary/data-drift). Voir
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs) ;
[ch. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it).
(ch. 11, 15)

**Prédiction conforme.** Une méthode sans distribution qui transforme la sortie d'un modèle entraîné
en un ensemble de réponses candidates qui contient la bonne avec une probabilité choisie {[20]. Un
grand ensemble signale l'incertitude qu'une règle de gouvernance peut router. Voir
[ch. 11, Calibration before thresholds](/bok/ai-defined#calibration-before-thresholds). (ch. 11)

**Évaluation de la conformité.** La procédure par laquelle un fournisseur démontre qu'un système
d'IA à haut risque respecte le règlement sur l'IA de l'UE avant sa mise sur le marché : contrôle
interne pour la plupart des systèmes de l'annexe III, un organisme notifié pour certains systèmes
biométriques, et la procédure sectorielle pour les produits de l'annexe I {[2]. Elle précède la
déclaration, le marquage CE et l'enregistrement. Voir
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration)
;
[ch. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(ch. 14, 18)

**Provenance du contenu (C2PA).** Informations signées et inviolables sur l'origine d'un contenu et
la façon dont il a été édité, liées à l'actif. La spécification C2PA l'empaquette comme un manifeste
d'assertions, une affirmation et une signature d'affirmation {[52] ; NIST traite le suivi de la
provenance comme une approche de la transparence du contenu synthétique [53]. À comparer avec
[Watermarking](/glossary/watermarking) et [Data provenance](/glossary/data-provenance). Voir
[ch. 20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media). (ch.
18, 20)

**Voie de contestation.** L'itinéraire par lequel une personne affectée par une décision automatisée
atteint un examinateur qui n'a pas pris la décision originale, voit les entrées, les raisons et les
représentations de la personne, et peut modifier le résultat, le résultat étant écrit dans le
dossier de décision. C'est ainsi que le droit de contester prévu à l'article 22(3) du RGPD est
honoré en pratique [38]. À contraster avec [Contestabilité](/glossary/contestability). Voir
[ch. 19, article 22 du RGPD après SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa) ;
[ch. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (ch. 05,
19, 22)

**Contestabilité.** La capacité d'une personne affectée par une décision soutenue par l'IA à la
contester et à obtenir une réponse qui peut la modifier. L'article 22(3) du RGPD confère un droit de
contester uniquement les décisions entièrement automatisées [38], et les principes de l'OCDE
demandent que les personnes affectées négativement puissent contester un résultat [31]. À contraster
avec [Recours](/glossary/recourse) et [Voie de contestation](/glossary/contest-path). Voir
[ch. 16, The legal hooks for explanations](/bok/fairness-and-explainability#the-legal-hooks-for-explanations)
; [ch. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (ch.
05, 12, 16)

**Assurance continue.** L'assurance produite continuellement à partir de la télémétrie plutôt qu'à
un moment donné ; le statut du contrôle est une requête en direct, non une approbation annuelle.
C'est le niveau 5 du modèle de maturité. Voir
[ch. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry).
(ch. 04, 05, 07)

**Facteur contributif.** Une propriété d'un système ou de son contexte (autonomie, exposition,
réversibilité, groupes vulnérables, sensibilité des données, opacité) qui modifie la probabilité ou
la gravité d'un risque sans le créer [30]. Elle est capturée comme champs de registre à l'admission
afin qu'une politique puisse calculer le niveau. À contraster avec
[Source de risque](/glossary/risk-source). Voir
[ch. 13, Contributing factors and the use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile).
(ch. 13)

**Responsable du traitement et sous-traitant.** En vertu du RGPD, le responsable du traitement
décide des finalités et des moyens du traitement et assume la plupart des obligations ; le
sous-traitant agit selon ses instructions documentées [38]. Un fournisseur d'IA servant votre
inférence est généralement un sous-traitant, mais devient responsable du traitement pour tout usage
de vos données qu'il décide, comme l'entraînement. À contraster avec
[Sous-traitant ultérieur](/glossary/sub-processor). Voir
[ch. 19, Controller, processor or joint controller](/bok/privacy-and-ai#controller-processor-or-joint-controller).
(ch. 19)

**Explication contrefactuelle.** Une explication qui énonce le plus petit changement à l'entrée qui
aurait modifié le résultat, limité aux caractéristiques que la personne peut réellement modifier
[54]. C'est la base naturelle du recours. À contraster avec
[Équité contrefactuelle](/glossary/counterfactual-fairness). Voir
[ch. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(ch. 16)

**Équité contrefactuelle.** L'exigence qu'une décision concernant un individu soit la même dans un
monde contrefactuel où l'individu appartenait à un groupe différent, défini par un modèle causal
[55]} ; approximée en pratique par des tests de basculement contrefactuels. À contraster avec
[Explication contrefactuelle](/glossary/counterfactual-explanation) et
[Test de basculement contrefactuel](/glossary/counterfactual-flip-test). Voir
[ch. 16, Individual and counterfactual fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness).
(ch. 16)

**Test de basculement contrefactuel.** Un test qui modifie uniquement un attribut protégé dans une
entrée, ou échange les termes d'identité dans des invites par ailleurs identiques, et mesure la
fréquence à laquelle le résultat ou la qualité de la réponse change. C'est l'approximation pratique
de l'équité contrefactuelle [55] et s'exécute dans la suite d'évaluation d'équité. À contraster avec
[Équité contrefactuelle](/glossary/counterfactual-fairness). Voir
[ch. 16, Individual and counterfactual fairness](/bok/fairness-and-explainability#individual-and-counterfactual-fairness)
; [ch. 05, Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

## D

**Fiche de données.** Documentation structurée et versionnée d'un ensemble de données (provenance,
base légale, droits, composition et limitations connues) maintenue en tant que code aux côtés du
système. À contraster avec [Datasheet for datasets](/glossary/datasheet-for-datasets). Voir
[ch. 04, Data governance across the stack](/bok/the-stack#data-governance-across-the-stack).
(ch. 04)

**Dérive des données.** Un changement dans la distribution des entrées qu'un système voit en
production par rapport aux données sur lesquelles il a été validé, comme un nouveau segment de
clients ou un formulaire en amont modifié [51]. Elle se manifeste dans les entrées avant l'arrivée
d'un label, elle est donc surveillée directement. À contraster avec
[Dérive conceptuelle](/glossary/concept-drift). Voir
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 15)

**Traçabilité des données.** L'enregistrement de la façon dont les données se sont déplacées et ont
changé dans les pipelines d'une organisation. La traçabilité rétroactive montre ce qui a alimenté un
modèle ; la traçabilité prospective montre quels modèles ont utilisé un ensemble de données, quelles
demandes d'effacement et retraits de licence sont nécessaires. OpenLineage est une norme ouverte
pour l'émettre [56]. À contraster avec [Provenance des données](/glossary/data-provenance). Voir
[ch. 14, Provenance versus lineage](/bok/governing-development#provenance-versus-lineage). (ch. 14)

**Minimisation des données.** Le principe du RGPD selon lequel les données à caractère personnel
doivent être adéquates, pertinentes et limitées à ce que la finalité nécessite [38]. Pour l'IA, elle
est argumentée caractéristique par caractéristique, appliquée aux snapshots d'entraînement, aux
index de récupération, aux journaux et aux ensembles d'évaluation, et justifiée par des
justifications de caractéristiques et des journaux de filtrage. Voir
[ch. 19, Minimisation, privacy by design and PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(ch. 19)

**Provenance des données.** Information sur les entités, activités et personnes impliquées dans la
production de données, utilisée pour juger de sa qualité et de sa fiabilité [57]. En pratique : d'où
provient à l'origine un ensemble de données et à quelles conditions (source, licence, base légale).
Une traçabilité parfaite sur une provenance inconnue reste non gouvernée. À contraster avec
[Traçabilité des données](/glossary/data-lineage). Voir
[ch. 14, Provenance versus lineage](/bok/governing-development#provenance-versus-lineage) ;
[ch. 12, Updating the policies you already have](/bok/governance-program#updating-the-policies-you-already-have).
(ch. 12, 14)

**Portail d'admission des ensembles de données.** Un contrôle de pipeline qui permet à un travail
d'entraînement de lire uniquement les ensembles de données dont le dossier d'admission est complet
et signé par le propriétaire des données : base légale ou licence, vérifications de réserve,
résultats de qualité, provenance, utilisations autorisées et rétention. Il justifie les pratiques de
gouvernance des données de l'article 10 du Reglamento de IA [2]. Voir
[ch. 14, Owners, stewards and the admission gate](/bok/governing-development#owners-stewards-and-the-admission-gate)
; [ch. 05, Pattern: Dataset Admission Gate](/patterns/dataset-admission-gate). (ch. 05, 14)

**Datasheet for datasets.** Documentation qui accompagne un ensemble de données avec sa motivation,
sa composition, son processus de collecte, son prétraitement, ses utilisations, sa distribution et
sa maintenance, comme proposé par Gebru et ses collègues [58]} ; le compagnon lisible par l'homme du
dossier d'admission de l'ensemble de données et de la fiche de données. À contraster avec
[Fiche de données](/glossary/data-card). Voir
[ch. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(ch. 14)

**Avis de décision.** L'avis qu'une personne reçoit au moment d'une décision automatisée ou assistée
par l'IA, rendu à partir d'un modèle versionnée et du dossier de décision : qu'un système a été
utilisé, les raisons principales et ce que la personne peut faire et quand. Le contenu suit chaque
régime, comme l'avis d'utilisation en vertu de l'article 26(11) du Reglamento de IA ou les raisons
en vertu de la Regulation B des États-Unis [2][23]. À contraster avec
[Avis d'action négative](/glossary/adverse-action-notice). Voir
[ch. 18, Deployer duties (Article 26)](/bok/eu-ai-act#deployer-duties-article-26) ;
[ch. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (ch. 05,
08, 18)

**Seuil de décision.** Le score au-dessus ou au-dessous duquel une sortie d'IA déclenche une action.
C'est là que l'appétit pour le risque devient comportement, il est donc gouverné comme une politique
avec un propriétaire, une version et une date d'entrée en vigueur, testé dans le portail
d'évaluation et enregistré avec chaque décision ; le Reglamento de IA demande des métriques de
précision déclarées [2]. Voir
[ch. 11, A score is not a decision](/bok/ai-defined#a-score-is-not-a-decision). (ch. 11)

**Déclassement.** La retraite planifiée d'un système d'IA : analyse des dépendances, secours et
transition, avis de coucher de soleil, un snapshot de preuve final, archive ou élimination des poids
et des données, révocation de chaque identité, et une entrée de registre marquée comme retraitée
plutôt que supprimée. NIST demande que les systèmes soient progressivement supprimés en toute
sécurité [29]. Voir
[ch. 15, Retirement and decommissioning](/bok/governing-deployment#retirement-and-decommissioning) ;
[ch. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(ch. 05, 15)

**Hypertrucage.** En vertu du Reglamento de IA de la UE, un hypertrucage est un contenu image, audio
ou vidéo généré ou manipulé par l'IA qui ressemble à des personnes, objets, lieux, entités ou
événements existants et semblerait faussement authentique à une personne ; les responsables du
déploiement doivent le divulguer, avec des obligations plus légères pour l'art ou la satire évidents
[2]. À contraster avec [Content provenance (C2PA)](/glossary/content-provenance-c2pa). Voir
[ch. 20, Deepfakes and synthetic media](/bok/existing-law#deepfakes-and-synthetic-media) ;
[ch. 18, Transparency cases (Article 50)](/bok/eu-ai-act#transparency-cases-article-50). (ch.
18, 20)

**Délégation (échange de jetons OAuth).** Dans RFC 8693, le mode dans lequel une partie agit pour
une autre tandis que les deux restent identifiables : le jeton nomme le sujet et, dans sa
revendication d'acte, l'acteur actuel, avec des revendications d'acte imbriquées pour les acteurs
antérieurs [123]. Sous l'usurpation d'identité, l'acteur devient indistinguable du sujet. Un agent
doit détenir un jeton délégué et plus étroit, jamais celui de l'utilisateur. À contraster avec
[Chaîne de délégation](/glossary/delegation-chain) et
[Passthrough de jeton](/glossary/token-passthrough). Voir
[ch. 23, Delegation without impersonation](/bok/governing-agents#delegation-without-impersonation).
(ch. 23)

**Chaîne de délégation.** La séquence d'agents par laquelle une tâche passe de la personne ou du
système qui l'a lancée. Elle est gouvernée de sorte que chaque saut s'authentifie en tant que
lui-même, la portée se rétrécit ou reste égale mais ne s'élargit jamais, l'objectif voyage avec la
tâche, la profondeur et la divergence sont limitées, et une trace s'étend sur chaque saut. À
contraster avec [Délégation (échange de jetons OAuth)](/glossary/delegation-oauth-token-exchange).
Voir [ch. 23, Accountability across hops](/bok/governing-agents#accountability-across-hops).
(ch. 23)

**Parité démographique.** Un critère d'équité de groupe qui s'applique lorsque le taux de décisions
positives est égal entre les groupes ; le ratio d'impact négatif en est la forme de ratio. Elle
ignore les différences dans les taux de base [59]. À contraster avec
[Égalité des chances](/glossary/equalised-odds). Voir
[ch. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics). (ch. 16)

**Déployeur.** En vertu du Reglamento de IA de la UE, quiconque utilise un système d'IA sous sa
propre autorité, autre que dans une activité purement personnelle et non professionnelle [2]. Pour
les systèmes à haut risque, il suit les instructions d'utilisation, assure la supervision,
surveille, tient des journaux, informe les personnes affectées et, dans les cas énumérés, effectue
l'AIPD. L'étiquette nomme une tâche, non une sorte d'organisation. À contraster avec
[Fournisseur](/glossary/provider). Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles) ;
[ch. 18, Deployer duties (Article 26)](/bok/eu-ai-act#deployer-duties-article-26). (ch. 15, 18)

**Deployment Decision Record (DDR).** L'artefact qui enregistre la décision de déployer un système
d'IA : objectif, les personnes sur lesquelles il agit, espace négatif, niveau de risque et
obligations, seuils de performance par groupe, conditions de retrait, propriétaire et approbateur.
Il est validé avec le code du système ; ses seuils deviennent des seuils d'eval gate. Voir
[ch. 15, The Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record).
(ch. 15)

**Design defect.** En responsabilité du fait des produits, un défaut inhérent à la conception de
chaque unité, jugé selon les attentes des consommateurs ou en pesant le risque contre l'utilité
[60]. Pour l'IA : conditions de fonctionnement non testées, un guardrail manquant ou une supervision
manquante là où une alternative plus sûre était raisonnablement disponible. À contraster avec
[Manufacturing defect](/glossary/manufacturing-defect). Voir
[ch. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(ch. 20)

**Differential privacy.** Une garantie mathématique qui limite la mesure dans laquelle le dossier
d'une seule personne peut modifier la sortie d'une analyse ou d'un modèle entraîné, ajustée par un
budget de confidentialité. Sa force dépend du budget et des choix de mise en œuvre que le NIST
appelle privacy hazards [61]. Voir
[ch. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(ch. 19)

**Digital Omnibus.** Le paquet de réforme 2026 modifiant le règlement sur l'IA de l'UE (en vigueur
27 juil 2026), qui a ajusté le calendrier des risques élevés, ajouté des pouvoirs d'enquête du
Bureau de l'IA et refondu plusieurs articles [2]. Voir
[ch. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 08, 18)

**Disparate impact.** Une pratique apparemment neutre qui affecte plus durement un groupe protégé.
Selon le titre VII américain, l'employeur doit montrer que la pratique est liée à l'emploi et
cohérente avec la nécessité commerciale, et perd s'il refuse une alternative moins discriminatoire
[62]. L'équivalent de l'UE est la discrimination indirecte. À contraster avec
[Disparate treatment](/glossary/disparate-treatment) et
[Indirect discrimination](/glossary/indirect-discrimination). Voir
[ch. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact)
;
[ch. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(ch. 16, 20)

**Disparate treatment.** Traiter une personne moins favorablement en raison d'une caractéristique
protégée telle que la race, le sexe ou l'âge, y compris par une caractéristique ou une règle qui en
tient délibérément lieu [62]. L'équivalent de l'UE est la discrimination directe [63]. À contraster
avec [Disparate impact](/glossary/disparate-impact). Voir
[ch. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact)
;
[ch. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(ch. 16, 20)

**Distributor.** Selon le règlement sur l'IA de l'UE, une personne dans la chaîne
d'approvisionnement, autre que le fournisseur ou l'importateur, qui met un système d'IA à
disposition sur le marché de l'Union. Elle vérifie le marquage et les documents et retient les
systèmes à haut risque qu'elle croit non conformes [2]. À contraster avec
[Importer](/glossary/importer). Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Domestic representative (Korea).** Une personne ayant une adresse ou un bureau en Corée qu'un
opérateur commercial d'IA étranger au-dessus des seuils fixés par décret doit désigner par écrit.
Elle soumet les résultats de sécurité, dépose les demandes de confirmation à fort impact et soutient
les mesures à fort impact [25][64]. Voir
[ch. 21, Domestic representative](/bok/ai-laws-worldwide#domestic-representative). (ch. 21)

**Downstream modifier (GPAI).** Un acteur qui affine ou modifie le modèle d'IA à usage général d'un
autre fournisseur. Les lignes directrices de la Commission en font le fournisseur du modèle modifié
seulement lorsque la modification utilise plus d'un tiers du calcul d'entraînement original ; ses
`Art. 53(1)` obligations couvrent alors la modification, mais un modèle modifié à risque systémique
est présumé conserver ce risque et ses obligations [65][76]. À contraster avec
[Downstream provider](/glossary/downstream-provider). Voir
[ch. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider)
;
[ch. 18, When a fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(ch. 15, 18)

**Downstream provider.** Selon le règlement sur l'IA de l'UE, le fournisseur d'un système d'IA qui
intègre un modèle d'IA, le sien ou un fourni par une autre entité. Il s'appuie sur les informations
du modèle que les fournisseurs de modèles d'IA à usage général doivent transmettre en aval [2]. À
contraster avec [Downstream modifier (GPAI)](/glossary/downstream-modifier-gpai). Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Downstream use register.** Le registre de chaque consommateur des sorties d'un système d'IA (un
système, une équipe, un partenaire ou un pipeline d'entraînement), chacun avec son utilisation
approuvée, le re-test qui a autorisé les sorties pour ce contexte et tout contrat, conservé par
rapport à l'entrée du registre du système producteur. L'accès est accordé par consommateur
enregistré, et un changement de modèle ou un retrait est notifié à tous. Voir
[ch. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm)
; [ch. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (ch. 05, 15)

**AIPD.** Analyse d'impact relative à la protection des données : l'évaluation de l'article 35 du
RGPD du traitement susceptible de présenter un risque élevé pour les personnes [38], maintenue dans
cette discipline comme un artefact versionnée, non un document ponctuel. À contraster avec
[FRIA](/glossary/fria). Voir
[ch. 19, The DPIA for AI systems](/bok/privacy-and-ai#the-dpia-for-ai-systems). (ch. 04, 05, 19)

**Drift.** La divergence progressive des entrées, sorties ou performances d'un modèle par rapport à
sa ligne de base validée au fil du temps ; un signal d'exécution qu'un contrôle ou une évaluation
doit détecter. Les deux types à distinguer sont la dérive des données, dans les entrées, et la
dérive conceptuelle, dans la relation entrée-réponse. À contraster avec
[Data drift](/glossary/data-drift) et [Concept drift](/glossary/concept-drift). Voir
[ch. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it)
; [ch. 05, Pattern: Drift & Fairness Monitor](/patterns/drift-fairness-monitor) ;
[ch. 17, AI-specific failure modes](/bok/incidents#ai-specific-failure-modes). (ch. 04, 05, 11, 15,
16, 17)

**Dual use.** La capacité de la même capacité d'IA à servir des fins nuisibles ainsi que légitimes,
par exemple un modèle de toxicité inversé pour proposer des molécules toxiques [66]. Elle est
traitée par des modèles de menace d'utilisation abusive, des cas de red-team pour les utilisations
nuisibles de capacités légitimes et la détection à l'exécution. Voir
[ch. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(ch. 11)

**Duty holder.** Qui une obligation lie légalement (selon le règlement sur l'IA de l'UE, le
fournisseur, le responsable du déploiement ou les deux), distinct de qui l'applique ; le chapitre 08
porte une colonne de titulaire d'obligation pour qu'un ingénieur puisse dire quels artefacts son
organisation est responsable de produire. Voir
[ch. 18, Who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain). (ch.
08, 18)

## E

**Effective challenge.** Analyse critique d'un modèle par des experts objectifs ayant l'expertise,
l'indépendance et le statut organisationnel pour forcer le changement. Le terme vient des lignes
directrices américaines sur le risque de modèle, maintenant SR 26-2 [67], et est emprunté pour la
validation indépendante des systèmes d'IA. Voir
[ch. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management).
(ch. 14)

**EN 18286.** La norme européenne pour le système de gestion de la qualité de l'article 17 du
règlement sur l'IA, publiée par CEN-CENELEC en juillet 2026 (la première norme JTC 21 du règlement
sur l'IA à atteindre la publication), mais pas encore citée au Journal officiel en date du
2026-09-24, elle ne confère donc aucune présomption de conformité [10]. Voir
[ch. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (ch. 08, 22)

**Equalised odds.** Un critère d'équité de groupe qui tient lorsque les taux de vrais positifs et de
faux positifs sont tous deux égaux entre les groupes ; l'égalité des chances est la version plus
faible qui égalise seulement les taux de vrais positifs [68]. À contraster avec
[Demographic parity](/glossary/demographic-parity). Voir
[ch. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics). (ch. 16)

**EU declaration of conformity.** La déclaration signée du fournisseur, suivant l'annexe V du
règlement sur l'IA, qu'un système d'IA à haut risque satisfait aux exigences du règlement ; établie
après l'évaluation de la conformité et conservée pendant 10 ans [2]. À contraster avec
[CE marking](/glossary/ce-marking). Voir
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration).
(ch. 18)

**Eval gate.** Une étape du pipeline qui échoue la compilation lorsqu'une évaluation échoue ; le
mécanisme qui transforme une évaluation en contrôle appliqué plutôt qu'en rapport. Voir
[ch. 05, Pattern: Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci). (ch. 04, 05)

**Évaluations.** Tests automatisés du comportement d'un modèle ou d'un agent (capacité, sécurité et
adversarial), exécutés comme des contrôles, non comme une recherche ponctuelle. Voir
[ch. 04, Layer 03: Evals & Red Teaming as Evidence](/bok/the-stack#layer-03-evals--red-teaming-as-evidence).
(ch. 04)

**Évaluations comme preuves.** Le principe que l'exécution de l'évaluation *est* la preuve
d'assurance : une évaluation défaillante bloque la compilation et son résultat structuré est stocké
comme preuve que le contrôle a fonctionné. Voir
[ch. 03, 2. Evals fail builds; reviews only recommend](/bok/values-and-principles#2-evals-fail-builds-reviews-only-recommend).
(ch. 03, 04)

**Evidence record.** Le registre signé et structuré qu'un contrôle écrit chaque fois qu'il décide :
quel contrôle, sur quelle version du système, ce qu'il a décidé, par rapport à quelle métrique,
seuil et obligation, sur quelle entrée, quand et par qui. Une forme pour chaque contrôle permet à un
audit de s'exécuter comme une requête sur un seul magasin [69]. Voir
[ch. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry)
; [Templates and schemas](/resources/templates). (ch. 05)

**Exception register.** Une liste contrôlée en version des exceptions approuvées, chacune liée à une
règle et un système, avec justification, contrôles compensatoires, approbateur et expiration. Le
moteur de politique la lit, donc une version peut passer sous une exception en direct, le verdict le
dit, et la règle échoue à nouveau une fois l'exception expirée. À contraster avec
[Risk register](/glossary/risk-register). Voir
[ch. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(ch. 12)

**Explainability.** Dans le cadre du NIST, une représentation des mécanismes derrière le
fonctionnement d'un système : comment une décision a été prise [30]. En pratique une explication par
décision telle que les attributions de caractéristiques, les codes de raison ou un contrefactuel. À
contraster avec [Transparency](/glossary/transparency) et
[Interpretability](/glossary/interpretability). Voir
[ch. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability)
; [ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 16)

**Explanation record.** L'artefact de preuve pour une décision expliquée : version du modèle,
méthode et version d'explication, ligne de base, codes de raison, contrefactuel, modèle, audience et
livraison, écrit au moment de la décision pour que l'explication puisse être reproduite lorsqu'une
personne invoque un droit à l'explication [2]. Voir
[ch. 16, Explanation artefacts as evidence records](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records)
; [ch. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (ch. 05, 16)

## F

**Posture d'échec.** Ce qu'un guardrail, un agent gardien ou une passerelle d'outils fait quand il
ne peut pas prendre de décision : l'échec ouvert laisse passer l'appel, l'échec fermé le bloque. Le
gardien de référence de la norme OWASP Agent Control commence par procéder sauf s'il est configuré
pour refuser [127]. La posture est une décision de gouvernance, définie par classe d'opération et
enregistrée dans la fiche de politique de l'agent. Voir
[ch. 23, Guardrails d'exécution pour les appels d'outils](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(ch. 23)

**Défaut d'avertissement.** En responsabilité civile du fait des produits, un défaut dans les
instructions ou avertissements concernant les dangers non évidents [60]. Pour l'IA : les limitations
non divulguées ou les utilisations hors du champ d'application, ce qui explique pourquoi les fiches
de modèle et les notices d'utilisation sont versionnées à chaque sortie. Voir
[ch. 20, Obligation d'avertir après les mises à jour](/bok/existing-law#duty-to-warn-after-updates).
(ch. 20)

**Usage loyal.** La défense du droit d'auteur américain qui pèse quatre facteurs : le but et le
caractère transformatif, la nature de l'œuvre, la quantité utilisée et l'effet sur le marché [70].
Les tribunaux l'appliquent aux cas d'entraînement de l'IA au cas par cas ; les résultats jusqu'à
présent dépendent de la façon dont les données ont été acquises et de chaque enregistrement. À
contraster avec [exception TDM](/glossary/tdm-exception). Voir
[ch. 20, Cas d'entraînement américains, datés](/bok/existing-law#us-training-cases-dated). (ch. 20)

**Équité.** La propriété selon laquelle les résultats et les erreurs d'un système ne désavantagent
pas injustement les personnes ou les groupes. Le NIST énumère « équitable, avec biais nuisible géré
» parmi ses caractéristiques dignes de confiance [30] ; en pratique, l'équité est une métrique
choisie et enregistrée (groupe, individuelle ou contrefactuelle) avec un seuil, pas une affirmation
générale. À contraster avec [Biais](/glossary/bias). Voir
[ch. 16, Choisir une métrique d'équité par cas d'usage](/bok/fairness-and-explainability#choosing-a-fairness-metric-by-use-case).
(ch. 16)

**Gerrymandering d'équité.** L'échec dans lequel un modèle satisfait une contrainte d'équité sur
chaque groupe prédéfini mais la viole sur des sous-groupes définis par des combinaisons d'attributs
[71] ; la raison pour laquelle les tests intersectionnels sont nécessaires. Voir
[ch. 16, Tests intersectionnels et de sous-groupes](/bok/fairness-and-explainability#intersectional-and-subgroup-testing).
(ch. 16)

**Politique d'équité.** L'enregistrement par système, fixé avant que les résultats ne soient vus, de
ce que l'équité signifie pour ce système : les attributs protégés dans chaque juridiction et d'où
proviennent leurs valeurs, la métrique choisie et pourquoi, le seuil, la taille minimale des
cellules, la correction pour comparaisons multiples et l'approbateur. La suite d'évaluation d'équité
est jugée par rapport à elle. À contraster avec [Équité](/glossary/fairness). Voir
[ch. 16, Équité et explicabilité dans la stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack)
; [ch. 05, Motif : Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

**Apprentissage fédéré.** Entraînement d'un modèle sur des appareils ou des sites où les données
résident, partageant les mises à jour du modèle au lieu des enregistrements bruts [72]. Il limite le
mouvement des données mais ne cache pas en soi les données personnelles, car les mises à jour
partagées peuvent divulguer des exemples d'entraînement. Voir
[ch. 19, Technologies d'amélioration de la confidentialité et leurs limites honnêtes](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(ch. 19)

**Affinage.** Entraînement supplémentaire d'un modèle existant sur de nouvelles données pour
l'adapter à une tâche ou un domaine. Il modifie le modèle, c'est donc un événement de changement
avec ses propres évaluations ; pour les modèles d'IA à usage général, la Commission traite un
modificateur comme un fournisseur seulement au-dessus d'un tiers du calcul d'entraînement original
[65]. Voir [ch. 15, Comment il est adapté](/bok/governing-deployment#how-it-is-adapted) ;
[ch. 18, Quand un affineur devient un fournisseur de GPAI](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(ch. 15, 18)

**Modèle fondateur.** Un modèle entraîné sur des données larges à grande échelle et adaptable à un
large éventail de tâches en aval [73]. Ses défauts sont hérités par chaque système construit dessus,
donc les organisations qui en appellent ou l'adaptent collectent les preuves du fournisseur et
gèrent la version épinglée comme un changement. À contraster avec [GPAI](/glossary/gpai) et
[Modèle frontière](/glossary/frontier-model). Voir
[ch. 11, Modèles fondateurs et GPAI](/bok/ai-defined#foundation-models-and-gpai). (ch. 11)

**Règle des quatre cinquièmes.** La règle empirique des directives uniformes américaines selon
laquelle un taux de sélection d'un groupe inférieur à 80 % du taux du groupe le plus élevé sera
généralement considéré comme une preuve d'impact disparate, qualifiée par la signification
statistique et pratique [24]. Ce n'est pas un refuge sûr : des écarts plus petits peuvent toujours
compter. Voir
[ch. 16, La règle des quatre cinquièmes et le ratio d'impact disparate](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)
;
[ch. 20, Mesures d'équité que la loi reconnaît](/bok/existing-law#fairness-measures-the-law-recognises).
(ch. 16, 20)

**Convention-cadre sur l'IA (STCE n° 225).** Le traité du Conseil de l'Europe sur l'IA et les droits
de l'homme, la démocratie et l'état de droit, ouvert à la signature en septembre 2024. Il lie ses
Parties, qui décident comment atteindre les acteurs privés, et demande la gestion des risques et des
impacts et les recours [74]. Voir
[ch. 22, Convention-cadre du Conseil de l'Europe (STCE n° 225)](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225).
(ch. 22)

**Correspondance de cadres.** Un mappage des contrôles d'un cadre sur ceux d'un autre ; utile comme
index, mais une correspondance prouve que vous avez lu le cadre, pas que le contrôle mappé
fonctionne. Voir [ch. 05, Motif : Framework Crosswalk](/bok/patterns#pattern-framework-crosswalk).
(ch. 05, 08)

**AIPD.** Analyse d'impact sur les droits fondamentaux : l'évaluation de l'article 27 du Reglamento
de IA de l'impact d'un système à haut risque sur les droits [2], maintenue ici comme un artefact
versionné et révisable. À contraster avec [AIPD](/glossary/dpia) et
[Analyse d'impact du système d'IA](/glossary/ai-system-impact-assessment). Voir
[ch. 18, Analyse d'impact sur les droits fondamentaux (article 27)](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27)
; [ch. 05, Motif : FRIA-as-Code](/bok/patterns#pattern-fria-as-code). (ch. 04, 05, 18)

**Modèle frontière.** Un modèle à usage général à la frontière des capacités ou près de celle-ci.
Les lois tracent la ligne par le calcul d'entraînement : la SB 53 de Californie, par exemple, couvre
les modèles entraînés avec plus de 10^26 opérations [14]. Les lois des développeurs de frontière
demandent un cadre de sécurité publié et un signalement des incidents [12]. À contraster avec
[Modèle fondateur](/glossary/foundation-model). Voir
[ch. 21, Provenance, données d'entraînement et développeurs de frontière](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers)
; [ch. 08, Lois des développeurs de frontière](/bok/regulatory-map#frontier-developer-laws). (ch.
08, 21)

**Enregistrement d'exécution.** L'enregistrement par demande de la façon dont une demande du
titulaire des données a été honorée partout où les données de la personne se trouvent, des systèmes
source, des instantanés, des index de récupération, des journaux et des ensembles d'évaluation aux
poids du modèle : l'action dans chacun, les versions du modèle affectées, tout réentraînement
programmé et si le délai du RGPD d'un mois, extensible de deux, a été respecté [38]. Voir
[ch. 19, Enregistrement de la façon dont une demande a été honorée](/bok/privacy-and-ai#recording-how-a-request-was-honoured)
; [ch. 05, Motif : Rights Requests Against Models](/patterns/rights-requests-against-models). (ch.
05, 08, 19)

**Dérive fonctionnelle.** La réutilisation progressive de données personnelles ou d'un système d'IA
à des fins que personne n'a approuvées, généralement par configuration plutôt que par une nouvelle
sortie. Pour les données personnelles, elle viole la limitation des finalités sauf si une évaluation
de compatibilité ou une nouvelle base couvre la nouvelle utilisation [38] ; l'espace négatif dans
l'enregistrement de déploiement la rend détectable. Voir
[ch. 19, Limitation des finalités et dérive fonctionnelle](/bok/privacy-and-ai#purpose-limitation-and-function-creep)
;
[ch. 15, Utilisation secondaire et préjudice en aval](/bok/governing-deployment#secondary-use-and-downstream-harm)
; [ch. 05, Motif : Downstream Use Register](/patterns/downstream-use-register). (ch. 05, 14, 15, 19)

## G

**IA générative.** L'IA qui produit un nouveau contenu (texte, images, audio, vidéo, code) plutôt
qu'une estimation sur quelque chose qui existe. Ses risques distinctifs incluent la confabulation,
l'intégrité de l'information, la propriété intellectuelle et le contenu synthétique abusif [75] ;
ses preuves sont l'ancrage, le refus et les évaluations de red-team et le marquage de contenu. À
contraster avec [IA prédictive](/glossary/predictive-ai). Voir
[ch. 11, Prédictif par rapport à génératif](/bok/ai-defined#predictive-versus-generative). (ch. 11)

**Décision go/no-go.** La décision de sortie signée pour une version de système, prise par des rôles
de réviseur nommés par rapport à une liste de contrôle dont chaque élément lie l'enregistrement qui
y répond. Le NIST l'encadre comme la détermination du fait que le développement ou le déploiement
doit procéder [30] ; le pipeline ne déploie que sur un go. Voir
[ch. 14, La porte go/no-go](/bok/governing-development#the-gono-go-gate). (ch. 14)

**Gouvernance en tant que code.** Les règles de gouvernance exprimées en tant que code exécutable
qui évalue les demandes d'extraction, les déploiements et les appels d'exécution et retourne une
décision ; le terme générique dont la politique en tant que code est le sous-ensemble CI/CD. À
contraster avec [Politique en tant que code](/glossary/policy-as-code). Voir
[ch. 04, Couche 01 : Govern-as-Code](/bok/the-stack#layer-01-govern-as-code). (ch. 03, 04)

**GPAI.** Modèle d'IA à usage général : selon le Reglamento de IA, un modèle qui montre une
généralité significative, peut exécuter avec compétence un large éventail de tâches distinctes et
peut être intégré dans de nombreux systèmes en aval [2]. Le critère indicatif de la Commission est
le calcul d'entraînement au-dessus de 10^23 FLOP [76]. Le Bureau de l'IA applique les obligations
GPAI à partir du 2 août 2026. À contraster avec [Modèle fondateur](/glossary/foundation-model). Voir
[ch. 18, Modèles d'IA à usage général](/bok/eu-ai-act#general-purpose-ai-models) ;
[ch. 11, Modèles fondateurs et GPAI](/bok/ai-defined#foundation-models-and-gpai). (ch. 08, 11, 18)

**Code de pratique GPAI.** L'instrument volontaire (publié le 10 juillet 2025) que les fournisseurs
d'IA à usage général utilisent pour démontrer la conformité avec leurs obligations du Reglamento de
IA jusqu'à ce que des normes harmonisées existent ; trois chapitres : Transparence, Droit d'auteur
et Sécurité et sûreté (le dernier pour les modèles à risque systémique) [16]. Voir
[ch. 08, Code de pratique GPAI](/bok/regulatory-map#gpai-code-of-practice) ;
[ch. 18, Le Code de pratique et l'application](/bok/eu-ai-act#the-code-of-practice-and-enforcement).
(ch. 08, 18)

**Dégradation progressive.** Des modes de fonctionnement pré-construits et testés en deçà de l'arrêt
d'un système d'IA : conseil uniquement, seuils de confiance élevés, réponses ancrées uniquement,
désactivation pour un groupe, une langue ou une région, et un retour à la cohorte pilote. Chacun est
un basculement opérationnel avec un déclencheur nommé [77]. À contraster avec
[Kill switch](/glossary/kill-switch). Voir
[ch. 15, Dégradation progressive](/bok/governing-deployment#graduated-degradation) ;
[ch. 05, Motif : Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(ch. 05, 15, 23)

**Agent gardien.** Un agent d'IA dont le travail est de superviser, vérifier ou contraindre d'autres
agents à l'exécution ; Gartner prédit que les technologies d'agent gardien représenteront au moins
10 à 15 % des marchés d'IA agentique d'ici 2030 [9]. À contraster avec
[Guardrail](/glossary/guardrail). Voir
[ch. 04, Couche 04 : Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability)
;
[ch. 23, Guardrails d'exécution pour les appels d'outils](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(ch. 04, 23)

**Guardrail.** Un contrôle d'exécution qui inspecte ou médiatise les entrées, sorties ou appels
d'outils d'un modèle ou d'un agent et bloque, réécrit ou remonte ce qui viole une politique,
enregistrant chaque décision comme preuve. Les guardrails sont du code déterministe ou des
classificateurs dans le chemin d'appel, contrairement à un agent gardien, qui est lui-même un
système d'IA. À contraster avec [Agent gardien](/glossary/guardian-agent). Voir
[ch. 05, Motif : Runtime Guardrail](/bok/patterns#pattern-runtime-guardrail) ;
[ch. 23, Guardrails d'exécution pour les appels d'outils](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(ch. 04, 05, 23)

## H

**Hallucination.** Résultat généré énoncé avec assurance mais faux ou non soutenu par ses sources ;
le profil IA générative du NIST l'appelle confabulation et le classe parmi les risques que l'IA
générative crée ou aggrave [75]. Les vérifications d'ancrage et de citation sont les preuves
habituelles contre ce phénomène. À contraster avec [Regurgitation](/glossary/regurgitation). Voir
[ch. 17, Modes de défaillance spécifiques à l'IA](/bok/incidents#ai-specific-failure-modes) ;
[ch. 11, Prédictif versus génératif](/bok/ai-defined#predictive-versus-generative). (ch. 11, 17)

**Norme harmonisée.** Norme européenne adoptée sur demande de normalisation de la Commission. En
vertu du Règlement de l'IA, la conformité avec une norme dont la référence est publiée au Journal
officiel crée une présomption de conformité aux exigences qu'elle couvre ; la publication par le
CEN-CENELEC seul ne le fait pas [2]. Au 2026-09-24, aucune n'est encore citée [10]. À contraster
avec [Spécifications communes](/glossary/common-specifications) et
[Structure harmonisée (ISO)](/glossary/harmonized-structure-iso). Voir
[ch. 22, Comment fonctionne la présomption de conformité](/bok/principles-and-standards#how-presumption-of-conformity-works).
(ch. 08, 22)

**Structure harmonisée (ISO).** La disposition commune des clauses et le texte fondamental partagés
par les normes de systèmes de gestion ISO telles que ISO/IEC 42001, 27001 et 27701 et ISO 9001, qui
permettent à un système de gestion intégré de satisfaire à plusieurs d'entre elles [78]. À ne pas
confondre avec une norme harmonisée de l'UE. À contraster avec
[Norme harmonisée](/glossary/harmonised-standard). Voir
[ch. 22, Intégration avec 27001, 27701 et 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001).
(ch. 22)

**Exposition de contexte caché.** LLM08:2026 dans le Top 10 LLM de l'OWASP, qui a remplacé System
Prompt Leakage : extraction, inférence ou reconstruction du contexte caché qu'un modèle voit, tel
que les invites système, les instructions des développeurs, le texte de politique récupéré et les
schémas d'outils [128]. Le conseil est de supposer que le contexte caché est découvrable, de tenir
les identifiants hors de celui-ci et de ne jamais s'y fier comme limite de sécurité. À contraster
avec [Injection de prompt](/glossary/prompt-injection). Voir
[ch. 23, Invites comme configuration sous contrôle de changement](/bok/governing-agents#prompts-as-configuration-under-change-control).
(ch. 23)

**IA à fort impact (Corée).** En vertu de la Loi fondamentale sur l'IA de la Corée, un système d'IA
qui peut affecter significativement la vie, la sécurité physique ou les droits fondamentaux et est
utilisé dans un domaine énuméré tel que les soins de santé, l'embauche et l'évaluation des prêts,
l'analyse biométrique, le transport ou les décisions de services publics. Il déclenche des
obligations de gestion des risques, d'explication, de supervision humaine et de tenue de registres
[25]. À contraster avec [Système d'IA à haut risque](/glossary/high-risk-ai-system). Voir
[ch. 21, IA à fort impact et comment elle est confirmée](/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed).
(ch. 21)

**Système d'IA à haut risque.** En vertu du Règlement de l'IA de l'UE, un système d'IA qui est un
composant de sécurité d'un produit relevant de la législation de l'annexe I nécessitant une
évaluation de la conformité par un tiers, ou qui est lui-même un tel produit, ou qui est utilisé
dans un domaine de l'annexe III, sauf si le filtre de l'article 6(3) s'applique. Il est soumis aux
exigences des articles 8 à 15 et aux obligations des prestataires et des responsables de
l'implantation [2]. À contraster avec [Pratique interdite](/glossary/prohibited-practice),
[IA à fort impact (Corée)](/glossary/high-impact-ai-korea) et
[Niveau de risque](/glossary/risk-tier). Voir
[ch. 18, L'échelle des risques](/bok/eu-ai-act#the-risk-ladder). (ch. 18)

**Code de conduite de Hiroshima.** Le Code international de conduite volontaire du G7 pour les
organisations développant des systèmes d'IA avancés (octobre 2023) : 11 actions couvrant
l'évaluation des risques du cycle de vie, la surveillance après déploiement, la communication
publique, le partage d'incidents, les politiques de gouvernance, la sécurité, la provenance et la
protection des données [79]. Voir
[ch. 22, Processus Hiroshima du G7](/bok/principles-and-standards#g7-hiroshima-process). (ch. 22)

**Déclaration préalable.** Une courte déclaration publique préparée en esquisse avant tout incident
: ce qui s'est passé autant qu'il est connu, ce qui a été fait pour le contenir, ce que les
personnes affectées doivent faire, et quand la prochaine mise à jour arrivera. Elle ne spécule
jamais sur la cause. Voir
[ch. 15, Communications externes](/bok/governing-deployment#external-communications) ;
[ch. 05, Motif : Pipeline de divulgation et de notification](/patterns/disclosure-notification-pipeline).
(ch. 05, 15)

**HUDERIA.** La méthodologie non contraignante du Conseil de l'Europe pour évaluer les risques et
les impacts des systèmes d'IA sur les droits de l'homme, la démocratie et l'état de droit [80]. Les
parties à la Convention-cadre peuvent l'utiliser ou l'adapter. Voir
[ch. 22, Ce que la Convention demande et ce qu'elle change dans le stack](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack).
(ch. 22)

**Supervision humaine.** Les mesures qui permettent aux personnes physiques de comprendre,
surveiller et, si nécessaire, annuler ou arrêter un système d'IA à haut risque, exigées par
l'article 14 du Règlement de l'IA, y compris la sensibilisation au biais d'automatisation et un
moyen d'arrêter le système en toute sécurité [2]. Conçue comme des portes, des outils d'examen et
des exercices de dépassement qui laissent des traces. Voir
[ch. 04, Concevoir la supervision humaine (article 14)](/bok/the-stack#designing-human-oversight-article-14)
;
[ch. 23, À quoi ressemble une bonne approbation](/bok/governing-agents#what-a-good-approval-looks-like).
(ch. 04, 11, 23)

**Humain en commande (HIC).** Le mode de supervision, nommé par le Groupe d'experts de haut niveau
de l'UE, dans lequel les personnes supervisent l'activité globale d'un système d'IA et décident
quand et si l'utiliser dans une situation donnée [81]. À contraster avec
[Humain dans la boucle (HOTL)](/glossary/human-on-the-loop-hotl). Voir
[ch. 11, De l'élément de définition au champ du registre](/bok/ai-defined#from-definition-element-to-registry-field).
(ch. 11)

**Humain dans la boucle (HITL).** Le mode de supervision dans lequel une personne peut intervenir
dans chaque cycle de décision d'un système d'IA [81] ; en termes d'ingénierie, une porte qui retient
chaque action conséquente jusqu'à ce qu'un approbateur désigné décide, en enregistrant
l'approbateur, le temps de décision et le dépassement. À contraster avec
[Humain dans la boucle (HOTL)](/glossary/human-on-the-loop-hotl). Voir
[ch. 05, Motif : Porte humaine dans la boucle](/bok/patterns#pattern-human-in-the-loop-gate) ;
[ch. 11, De l'élément de définition au champ du registre](/bok/ai-defined#from-definition-element-to-registry-field)
;
[ch. 23, Points de contrôle humains et conception d'approbation](/bok/governing-agents#human-checkpoints-and-approval-design).
(ch. 05, 11, 23)

**Humain dans la boucle (HOTL).** Le mode de supervision dans lequel une personne peut intervenir
dans le cycle de conception et surveille le fonctionnement du système, plutôt que d'approuver chaque
décision {[81]}. Le système agit ; les personnes observent les signaux et peuvent l'arrêter, donc le
chemin d'arrêt et les alertes sont ce qui doit être testé. À contraster avec
[Humain dans la boucle (HITL)](/glossary/human-in-the-loop-hitl) et
[Humain en commande (HIC)](/glossary/human-in-command-hic). Voir
[ch. 11, De l'élément de définition au champ du registre](/bok/ai-defined#from-definition-element-to-registry-field).
(ch. 11)

## I

**Refus implicite.** La règle d'autorisation selon laquelle une demande qu'aucune politique
n'autorise explicitement est refusée. Cedar refuse par défaut et laisse tout forbid correspondant
annuler chaque permit [141] ; une liste d'outils autorisés d'un agent fonctionne de la même manière,
donc un outil non répertorié est bloqué sans règle propre. Voir
[ch. 23, La liste d'outils autorisés](/bok/governing-agents#the-tool-allow-list) ;
[Boîte à outils : Générateur de fiche de politique](/toolkit/policy-card#pc-engines). (ch. 08, 23)

**Importateur.** En vertu du Règlement de l'IA de l'UE, une personne établie dans l'Union qui met
sur le marché un système d'IA portant le nom ou la marque d'un prestataire établi en dehors de
l'Union. Il doit vérifier le travail de conformité du prestataire avant de mettre sur le marché un
système à haut risque [2]. À contraster avec [Distributeur](/glossary/distributor). Voir
[ch. 18, Les rôles d'opérateur de l'UE](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**Discrimination indirecte.** L'équivalent de l'UE de l'impact disparate : un critère apparemment
neutre qui désavantage particulièrement un groupe protégé, illégal sauf s'il est objectivement
justifié par un objectif légitime poursuivi par des moyens appropriés et nécessaires {[63]}. À
contraster avec [Impact disparate](/glossary/disparate-impact). Voir
[ch. 20, Traitement disparate, impact disparate et mandataires](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(ch. 20)

**Inférence (sens du Règlement de l'IA).** La capacité à dériver des résultats à partir d'entrées en
apprenant à partir de données ou en raisonnant sur des connaissances codées, plutôt qu'en exécutant
des règles que les personnes ont écrites. La Commission la traite comme la condition indispensable
qui sépare un système d'IA des logiciels conventionnels [21]. Voir
[ch. 11, Article 3(1) du Règlement de l'IA de l'UE et directives de la Commission](/bok/ai-defined#eu-ai-act-article-31-and-the-commission-guidelines).
(ch. 11)

**Données sensibles inférées.** Informations sensibles qu'un système dérive d'entrées ordinaires
(santé à partir d'achats, croyances à partir du comportement) ou porte par une caractéristique
mandataire. La Loi My Health My Data de Washington couvre les données de santé dérivées par des
algorithmes ou l'apprentissage automatique {[82]} ; les tests de mandataire et les politiques
d'inférence les rendent vérifiables. À contraster avec
[Données de catégories spéciales](/glossary/special-category-data). Voir
[ch. 19, Données sensibles inférées et mandataires](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data).
(ch. 19)

**Risque inhérent.** L'évaluation de la probabilité et de la gravité d'un scénario de risque avant
que tout contrôle ne soit compté. L'écart entre le risque inhérent et le risque résiduel est la
valeur revendiquée pour les contrôles, et doit être soutenu par leurs preuves {[30]}. À contraster
avec [Risque résiduel](/glossary/residual-risk). Voir
[ch. 13, Risque inhérent, risque résiduel et qui l'accepte](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(ch. 13)

**Instructions d'utilisation.** Les informations qu'un prestataire d'un système d'IA à haut risque
doit donner aux responsables de l'implantation : destination, précision et robustesse déclarées,
risques connus, comment interpréter la résultat, mesures de supervision humaine, maintenance et
enregistrement {[2]}. Mieux générées à partir de l'entrée du registre et du rapport de test, afin
que les chiffres correspondent aux preuves. Voir
[ch. 14, Le dossier technique](/bok/governing-development#the-technical-file). (ch. 14, 18)

**Destination.** L'utilisation pour laquelle le prestataire destine un système d'IA, y compris son
contexte spécifique et ses conditions d'utilisation {[2]}. La plupart des obligations à haut risque
sont mesurées par rapport à celle-ci, donc c'est un champ de l'enregistrement du cas d'usage que la
classification, les tests et les instructions d'utilisation lisent. Un modèle déplacé vers une
nouvelle destination est, pour le risque, un nouveau système. À contraster avec
[Utilisation indevida razonablemente previsible](/glossary/reasonably-foreseeable-misuse). Voir
[ch. 14, L'enregistrement du cas d'usage](/bok/governing-development#the-use-case-record) ;
[ch. 11, De l'élément de définition au champ du registre](/bok/ai-defined#from-definition-element-to-registry-field).
(ch. 11, 14)

**Canal de signalement interne.** Un itinéraire confidentiel pour que le personnel et les
entrepreneurs soulèvent des préoccupations concernant les systèmes d'IA en dehors de la chaîne de
commandement, avec des délais statutaires codés (en vertu de la Directive sur les lanceurs d'alerte
de l'UE, accusé de réception dans les sept jours et retour d'information dans les trois mois) et
protection contre les représailles {[83]}. Voir
[ch. 12, Un canal pour soulever des préoccupations](/bok/governance-program#a-channel-for-raising-concerns).
(ch. 12)

**Interprétabilité.** Dans le cadre du NIST, le sens de la résultat d'un système dans le contexte de
son objectif : pourquoi une décision a été prise et ce qu'elle signifie pour l'utilisateur {[30]}.
Un modèle intrinsèquement interprétable, tel qu'une fiche de pointage ou un arbre peu profond, est
sa propre explication. À contraster avec [Explicabilité](/glossary/explainability). Voir
[ch. 16, Transparence, interprétabilité et explicabilité](/bok/fairness-and-explainability#transparency-interpretability-and-explainability)
;
[ch. 16, Interprétable par conception ou expliqué après coup](/bok/fairness-and-explainability#interpretable-by-design-or-explained-after-the-fact).
(ch. 16)

**ISO/IEC 22989.** La norme ISO/IEC (2022) qui établit les concepts et la terminologie de l'IA pour
utilisation par d'autres normes et par des parties prenantes diverses {[40]}. Nommer les champs du
registre d'après son vocabulaire réduit la traduction lors de l'audit par rapport à la famille
SC 42. Voir
[ch. 22, Fondations et vocabulaire](/bok/principles-and-standards#foundations-and-vocabulary). (ch.
11, 22)

**ISO/IEC 42001.** La norme ISO/IEC (2023) qui spécifie les exigences d'un système de gestion de
l'IA, certifiable par des organismes accrédités [48]. Au 2026-09-24, ce n'est pas une norme
harmonisée en vertu du Règlement de l'IA, donc la certification ne crée aucune présomption de
conformité [10]. Voir
[ch. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio) ;
[ch. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006). (ch. 07,
08, 22)

**ISO/IEC 42005.** ISO/IEC 42005:2025, la norme d'analyse d'impact des systèmes d'IA (un complément
à l'article 27 FRIA du Règlement de l'IA et à l'annexe A.5 d'ISO/IEC 42001), qui fournit une méthode
structurée pour évaluer les impacts d'un système d'IA sur les personnes et la société [17]. Voir
[ch. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006) ;
[ch. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared). (ch.
08, 14)

**Issue (par rapport à incident).** Un défaut, un écart ou une faiblesse de contrôle qui n'a pas
produit d'événement dommageable, comme une régression d'évaluation en staging ou une alerte de
dérive. Il est suivi jusqu'à sa clôture avec un propriétaire et une date limite et ne déclenche
aucune horloge légale ; la plupart des problèmes sont des non-conformités au sens du système de
gestion [48]. À contraster avec [AI incident](/glossary/ai-incident). Voir
[ch. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

## J

**Jailbreak.** Un prompt conçu pour faire ignorer à un modèle ses instructions de sécurité
entièrement. L'OWASP traite le jailbreak comme une forme d'injection de prompt [84] ; il est testé
avec des suites de red team à la porte d'évaluation et contenu à l'exécution par des guardrails qui
ne dépendent pas des refus du modèle lui-même. À contraster avec
[Prompt injection](/glossary/prompt-injection). Voir
[ch. 14, The test-type matrix](/bok/governing-development#the-test-type-matrix). (ch. 14, 17)

**JSON Schema.** Un vocabulaire pour décrire la structure des documents JSON afin qu'un validateur
puisse les vérifier : quels champs existent, lesquels sont obligatoires, leurs types et valeurs
autorisées [85]. La bibliothèque de modèles publie un schéma draft 2020-12 par enregistrement de
gouvernance, de sorte qu'un enregistrement valide ou échoue la compilation. Voir
[ch. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal)
; [Templates and schemas](/resources/templates). (ch. 05)

**Justification memo.** L'enregistrement d'admission pour un cas d'usage d'IA : le problème,
l'alternative non-IA, le bénéfice mesurable, qui supporte les erreurs et comment les contester, la
réversibilité et les critères d'arrêt. Il répond à « l'IA doit-elle être utilisée du tout » avant
qu'un système n'atteigne une porte, la détermination go/no-go que le NIST place tôt [30]. Voir
[ch. 12, Strategy, value and whether to use AI at all](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all).
(ch. 12)

## K

**Key risk indicator (KRI).** Une métrique qui montre si un risque se rapproche du bord de l'appétit
(IA non enregistrée trouvée, exceptions ouvertes par ancienneté, taux de dépassement), à la
différence d'un indicateur clé de performance, qui montre si le programme fait son travail. Voir
[ch. 12, KPIs and KRIs for leadership and the board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
(ch. 12)

**Kill switch.** Un mécanisme testé pour arrêter un agent ou un système d'agir ; une condition
préalable à l'octroi d'autonomie, enregistrée par rapport à l'identité de l'agent. À contraster avec
[Graduated degradation](/glossary/graduated-degradation). Voir
[ch. 05, Pattern: Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker)
;
[ch. 23, Kill switch and per-agent circuit breakers](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers).
(ch. 03, 05, 23)

## L

**Large language model (LLM).** Un modèle fondateur pour le langage, généralement servi depuis un
centre de données derrière une API. Parce que les appels passent par une passerelle, les contrôles
d'exécution (traçage, filtrage, arrêt) peuvent se situer au centre [86]. À contraster avec
[Small language model (SLM)](/glossary/small-language-model-slm). Voir
[ch. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (ch. 11)

**Latent disclosure.** En vertu de la California AI Transparency Act, les informations de provenance
intégrées dans une image, une vidéo ou un audio généré par l'IA afin qu'elles persistent et puissent
être lues par un outil de détection, par opposition à une étiquette visible affichée à l'utilisateur
[87]. À contraster avec [Watermarking](/glossary/watermarking). Voir
[ch. 21, Provenance, training data and frontier developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers).
(ch. 21)

**Lawful basis.** L'un des six fondements de l'article 6 du RGPD qui rendent le traitement des
données personnelles licite : le consentement, le contrat, l'obligation légale, les intérêts vitaux,
la mission d'intérêt public et les intérêts légitimes [38]. Pour l'IA, chaque moment de traitement
(entraînement, récupération, inférence, journalisation) a besoin de sa propre base, enregistrée par
ensemble de données et étape. Voir
[ch. 19, Lawful basis for training versus inference](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference).
(ch. 19)

**Least agency.** Le principe, dans la liste agentic de l'OWASP, de ne donner à un agent que
l'autonomie dont sa tâche a besoin : le comportement agentic déployé là où il n'est pas nécessaire
élargit la surface d'attaque sans ajouter de valeur [6]. Le contrôle d'agent le moins cher est
l'agent non construit, comme un flux de travail fixe avec un appel de modèle à la place d'un
planificateur. À contraster avec [Autonomy level](/glossary/autonomy-level). Voir
[ch. 23, Governing AI agents](/bok/governing-agents). (ch. 23)

**Legitimate-interest assessment (LIA).** Le test documenté en trois étapes pour s'appuyer sur les
intérêts légitimes : un intérêt licite, précis et actuel ; le traitement nécessaire pour celui-ci ;
et un équilibre non annulé par les droits et attentes raisonnables des personnes [88]. Conservé
comme un artefact versionnné qui pointe chaque atténuation vers le contrôle qui l'implémente. Voir
[ch. 19, Legitimate interests and the three-step test](/bok/privacy-and-ai#legitimate-interests-and-the-three-step-test).
(ch. 19)

**LIME.** Local Interpretable Model-agnostic Explanations : explique une prédiction en ajustant un
modèle simple et interprétable au comportement de la boîte noire sur des échantillons perturbés
autour de l'entrée [89] ; vulnérable à la manipulation hors-variété. À contraster avec
[SHAP](/glossary/shap). Voir
[ch. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(ch. 16)

**Localisation (par juridiction).** Contrôler où un système d'IA s'exécute et quelles
fonctionnalités il offre dans chaque juridiction, avec des ensembles de règles par juridiction en
tant que code, des instances régionales où la résidence l'exige et des drapeaux de fonctionnalité
par région, de sorte qu'un marché peut être désactivé sans toucher aux autres. Un système ne se
lance dans une juridiction qu'une fois que ses obligations y sont démontrées comme étant respectées.
Voir [ch. 15, Localisation by jurisdiction](/bok/governing-deployment#localisation-by-jurisdiction)
;
[ch. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(ch. 05, 12, 15)

**Loss of control.** L'un des risques systémiques que le Code de pratique GPAI spécifie : les
risques de perte par les humains de la capacité à diriger, modifier ou arrêter de manière fiable un
modèle, qui peuvent émerger du désalignement, de l'auto-réplication, de la tromperie, de la
résistance à la modification d'objectifs ou de la recherche de pouvoir [95]. Les signataires
l'évaluent pour les modèles présentant un risque systémique ; un responsable du déploiement d'agents
demande comment l'autonomie et l'utilisation d'outils ont été évaluées. Voir
[ch. 23, EU AI Act hooks for agents](/bok/governing-agents#eu-ai-act-hooks-for-agents) ;
[ch. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice). (ch. 08, 23)

## M

**Machine learning.** La branche de l'IA dans laquelle un système s'améliore dans une tâche en
apprenant des motifs à partir de données plutôt qu'en suivant des règles que les gens ont écrites.
ISO/IEC 22989 regroupe ses approches en apprentissage supervisé, non supervisé, semi-supervisé et
par renforcement [40]. Voir [ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm).
(ch. 11)

**Machine unlearning.** Les techniques qui suppriment l'influence d'un enregistrement d'entraînement
d'un modèle sans réentraînement complet. Les méthodes exactes réentraînent une partition affectée
[90] ; les méthodes approximatives ajustent les poids et sont difficiles à vérifier, donc une
affirmation de désapprentissage est testée avec des évaluations d'inférence d'appartenance ou
d'extraction. À contraster avec [Output suppression](/glossary/output-suppression). Voir
[ch. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning)
; [ch. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (ch.
05, 19)

**Machine-readable evidence.** Une preuve qu'une machine peut interroger, comparer et agréger
(`OSCAL` artefacts, résultats d'évaluation structurés, journaux signés), par opposition aux captures
d'écran et aux feuilles de calcul exportées. Voir
[ch. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(ch. 03, 04, 05)

**Major ICT-related incident (DORA).** En vertu de la loi de l'UE sur la résilience opérationnelle
numérique, un incident lié aux TIC chez une entité financière qui répond aux critères de
classification d'un incident majeur. Il est signalé dans les 4 heures de la classification et au
plus tard 24 heures après la prise de connaissance (dans les 4 heures d'une classification faite
après ces 24 heures), puis dans les rapports intermédiaires et finaux [91]. Voir
[ch. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (ch. 17)

**Manufacturing defect.** En responsabilité du fait des produits, un écart d'une unité par rapport à
sa propre conception [60]. Pour l'IA : la mauvaise version du modèle, des poids corrompus, un
guardrail mal configuré ou un pipeline de données cassé dans le système déployé. À contraster avec
[Design defect](/glossary/design-defect). Voir
[ch. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(ch. 20)

**Market surveillance authority.** L'autorité nationale désignée pour appliquer le Règlement de l'IA
pour les produits placés sur son marché, avec des pouvoirs d'enquête, de demande de documentation et
d'exigence d'action corrective. Voir
[ch. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (ch. 08, 18)

**Maturity floor.** Le niveau de maturité global unique d'une fonction de gouvernance de l'IA : le
niveau de sa couche de stack la plus faible. C'est un plancher pour la planification, pas un
jugement sur l'ensemble de la fonction. Le profil par couche montre où se trouve l'effet de levier,
et le prochain mouvement est le prochain critère dans la couche la plus faible. Voir
[ch. 07, Observable criteria by layer and level](/bok/maturity-model#observable-criteria-by-layer-and-level)
; [Toolkit: Maturity self-check](/toolkit/maturity-self-check). (ch. 07)

**MCP.** Model Context Protocol : un protocole ouvert pour connecter les applications d'IA aux
outils et sources de données ; sa spécification 2026 ajoute les modèles de serveur de ressources
OAuth 2.1 et les identifiants liés à l'émetteur pour l'autorisation des agents [8]. Il sécurise le
saut entre un client et un serveur ; quel agent se trouve derrière le client est à une identité de
charge de travail de dire. À contraster avec
[A2A (Agent2Agent protocol)](/glossary/a2a-agent2agent-protocol). Voir
[ch. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28)
;
[ch. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 04, 05, 23)

**Membership inference.** Une attaque qui détermine si l'enregistrement d'une personne spécifique
était dans l'ensemble d'entraînement d'un modèle à partir du comportement du modèle [92]. Le CEPD
compte la résistance à celle-ci parmi les preuves pour affirmer qu'un modèle est anonyme. À
contraster avec [Model inversion](/glossary/model-inversion). Voir
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**Empoisonnement de la mémoire.** Une injection qui écrit dans la mémoire à long terme d'un agent,
un corpus de récupération, un magasin vectoriel ou un service de mémoire hébergé, et contamine ainsi
chaque session ultérieure qui lit à partir de ce magasin [128]. La liste agentique d'OWASP l'a comme
ASI06 Memory & Context Poisoning [6] et MITRE ATLAS comme AI Agent Context Poisoning (AML.T0080)
[126]. À contraster avec [Injection de prompt](/glossary/prompt-injection). Voir
[ch. 23, Memory and context governance](/bok/governing-agents#memory-and-context-governance).
(ch. 23)

**Hiérarchie d'atténuation.** L'ordre dans lequel les traitements des risques sont essayés :
éliminer, substituer, concevoir, administratif, puis accepter et surveiller. Emprunté à la
hiérarchie des contrôles de la sécurité au travail [93] et reflété dans l'article 9(5) du Règlement
de l'IA [2] ; les échelons supérieurs d'abord, avec la raison enregistrée quand ils sont
infaisables. Voir
[ch. 13, Treating risk: the mitigation hierarchy](/bok/risk-management#treating-risk-the-mitigation-hierarchy).
(ch. 13)

**Anonymat du modèle.** Le test du CEPD pour déterminer quand un modèle entraîné sort du champ
d'application du RGPD : l'extraction directe des données des sujets d'entraînement et l'obtention
par requêtes doivent être insignifiantes, compte tenu de tous les moyens raisonnablement
susceptibles d'être utilisés [88]. Prouvé par les dossiers de conception et les évaluations
d'attaque. Voir [ch. 19, The EDPB anonymity test](/bok/privacy-and-ai#the-edpb-anonymity-test).
(ch. 19)

**Ficha de modèle.** Documentation structurée et versionnée d'un modèle (provenance, utilisation
prévue, capacités, évaluations et modes de défaillance connus) maintenue en tant que code. À
contraster avec [Ficha de système](/glossary/system-card) et
[Ficha de données](/glossary/data-card). Voir
[ch. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets)
;
[ch. 05, Pattern: Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence).
(ch. 04, 05, 14)

**Inversion de modèle.** Une attaque qui reconstruit les caractéristiques des sujets d'entraînement,
comme un visage, à partir des résultats et des scores de confiance d'un modèle [94]. Elle peut
transformer un modèle déployé en canal de divulgation de données personnelles. À contraster avec
[Inférence d'appartenance](/glossary/membership-inference). Voir
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**Gestion des risques liés aux modèles.** La pratique de la supervision bancaire consistant à
valider les modèles pour leur solidité conceptuelle, à surveiller et analyser les résultats sous un
contrôle effectif. SR 11-7 a établi la tradition américaine jusqu'à ce que SR 26-2 la remplace le 17
avr 2026 [67], et SR 26-2 exclut les modèles d'IA générative et agentique de son champ d'application
[121]. Une discipline voisine, étendue ici au comportement à l'exécution et aux agents. À contraster
avec [Gestion des risques](/glossary/risk-management). Voir
[ch. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management)
;
[ch. 21, Sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai)
; [ch. 01, The disambiguation cluster](/bok/definition#the-disambiguation-cluster). (ch. 01, 02, 13,
14, 21)

**Signature de modèle.** Signature des fichiers d'un modèle à la construction : un manifeste énumère
chaque fichier avec son condensé cryptographique et une signature détachée couvre le manifeste, de
sorte que tout fichier modifié échoue la vérification. La spécification OpenSSF Model Signing
utilise le format de bundle Sigstore et prend en charge la signature sans clé, l'infrastructure à
clé privée, les certificats auto-signés ou les clés nues [135]. Le serveur vérifie la signature
avant de charger un modèle. À contraster avec
[Build provenance (SLSA)](/glossary/build-provenance-slsa). Voir
[ch. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning)
; [ch. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (ch. 05, 14, 15)

**Modèle multimodal.** Un modèle qui accepte ou produit plus d'une modalité (texte, image, audio,
vidéo). Chaque modalité est un nouveau canal pour les données personnelles, les instructions
injectées et le contenu synthétique qui peut nécessiter un marquage [2], de sorte que les garde-fous
et les évaluations sont nécessaires par modalité. Voir
[ch. 11, Multimodal models](/bok/ai-defined#multimodal-models). (ch. 11)

## N

**Quasi-accident.** Un danger qu'un contrôle, ou la chance, a interrompu avant que le dommage ne se
produise : le garde-fou a bloqué l'exfiltration, l'examinateur a détecté le dosage inventé. Les
données de quasi-accident constituent une preuve ; le Code de pratique GPAI demande aux fournisseurs
de signaler les modèles de quasi-accidents connectés avec les incidents graves [95]. À contraster
avec [Aléa lié à l'IA](/glossary/ai-hazard). Voir
[ch. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

**Espace négatif.** Les utilisations pour lesquelles un système d'IA n'est explicitement pas
destiné, écrites dans son Deployment Decision Record. Il se situe à l'intérieur de la finalité
prévue du fournisseur et rend la dérive de fonction détectable, car une utilisation non approuvée a
quelque part où être enregistrée comme hors de portée. Voir
[ch. 15, Start from the use case, not the model](/bok/governing-deployment#start-from-the-use-case-not-the-model).
(ch. 15)

**Données neurales.** Information générée en mesurant l'activité du système nerveux central ou
périphérique d'une personne. La Californie les traite comme des informations personnelles sensibles
[96], ce qui active les obligations de consentement et d'évaluation pour les systèmes d'IA qui
lisent les appareils portables ou les interfaces cerveau-ordinateur. Voir
[ch. 19, Consumer-health and neural data](/bok/privacy-and-ai#consumer-health-and-neural-data).
(ch. 19)

**Identité non humaine.** L'identité d'un agent, d'un compte de service ou d'un acteur machine.
Chaque identité non humaine obtient une entrée de registre, un propriétaire et une portée avant
d'être autorisée à agir. À contraster avec
[Identité de charge de travail](/glossary/workload-identity). Voir
[ch. 05, Pattern: Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials)
;
[ch. 23, Identity and short-lived credentials](/bok/governing-agents#identity-and-short-lived-credentials).
(ch. 04, 05, 23)

**NIST AI RMF.** Le NIST Artificial Intelligence Risk Management Framework 1.0 (NIST AI 100-1,
janvier 2023) : guidance volontaire organisée comme un Core de quatre fonctions (Govern, Map,
Measure, Manage) avec catégories et sous-catégories, plus des profils et un Playbook compagnon
[3][30]. Voir
[ch. 22, NIST AI RMF 1.0 in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth) ;
[ch. 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf). (ch. 08, 22)

**Organisme notifié.** Un organisme d'évaluation de la conformité désigné en vertu du Règlement de
l'IA de l'UE pour effectuer l'évaluation de la conformité par un tiers des systèmes d'IA à haut
risque. Selon la procédure d'organisme notifié, il évalue le système de gestion de la qualité et la
documentation technique du fournisseur, avec accès aux données d'entraînement, de validation et de
test [2]. Voir
[ch. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration)
;
[ch. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(ch. 14, 18)

## O

**Principes de l'OCDE sur l'IA.** Les cinq principes fondés sur les valeurs (croissance inclusive et
bien-être ; droits humains, équité et confidentialité ; transparence et explicabilité ; robustesse,
sécurité et innocuité ; responsabilité) et cinq recommandations politiques de la Recommandation de
l'OCDE sur l'IA, adoptée en 2019 et révisée en 2024 [31]. Un engagement des gouvernements adhérents,
non une règle contraignante pour les entreprises. Voir
[ch. 22, OECD AI Principles](/bok/principles-and-standards#oecd-ai-principles). (ch. 11, 22)

**Cadre de l'OCDE pour la classification des systèmes d'IA.** Un outil de l'OCDE (2022) pour
caractériser un système d'IA d'un point de vue politique selon cinq dimensions : People & Planet,
Economic Context, Data & Input, AI Model, et Task & Output [97]. Dans la pratique d'ingénierie, ses
dimensions deviennent des groupes de champs de registre qui acheminent les contrôles. Voir
[ch. 22, The Framework for the Classification of AI Systems](/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems).
(ch. 22)

**OPA/Rego.** L'Open Policy Agent et son langage de politique Rego, un moteur de politique en tant
que code à usage général qui évalue les règles de gouvernance en CI/CD et à l'admission à
l'exécution ; l'exemple canonique de politique en tant que code exécutable. À contraster avec
[Cedar](/glossary/cedar). Voir
[ch. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**Opacité.** L'incapacité d'une personne à suivre comment un système a atteint un résultat. Elle a
trois sources (secret, illettrisme technique et la nature et l'échelle de l'apprentissage
automatique) [98], chacune avec un correctif différent : divulgation, littératie et méthodes
d'explication plus évaluations comportementales. À contraster avec
[Explicabilité](/glossary/explainability). Voir
[ch. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance)
; [ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11)

**Modèle à poids ouvert.** Un modèle dont les poids entraînés sont publiés pour téléchargement sous
une licence qui peut être permissive, copyleft, restreinte à l'utilisation ou personnalisée [99].
Les poids ouverts ne sont pas open source ; le responsable du déploiement produit presque toutes les
preuves (hachages, analyses, évaluations, équipe rouge) et doit respecter la licence et toute
politique d'utilisation acceptable. À contraster avec
[Licence d'IA responsable (OpenRAIL)](/glossary/responsible-ai-licence-openrail). Voir
[ch. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences) ;
[ch. 18, Open-source carve-outs and their limits](/bok/eu-ai-act#open-source-carve-outs-and-their-limits).
(ch. 15, 18)

**Opérateur (Règlement de l'IA de l'UE).** Le terme générique pour les acteurs que le Règlement de
l'IA lie : fournisseur, fabricant de produit, responsable du déploiement, mandataire, importateur et
distributeur [2]. La même organisation peut être plusieurs opérateurs pour différents systèmes, ou
pour le même. Voir [ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 18)

**OSCAL.** L'Open Security Controls Assessment Language, un format machine-lisible NIST pour les
contrôles, les évaluations et les preuves, utilisé ici comme format pour les preuves prêtes pour
l'audit [3]. Voir
[ch. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(ch. 04, 05, 10)

**Suppression de résultat.** Un filtre autour d'un modèle qui l'empêche de produire les données
d'une personne : la première réponse rapide à une demande d'effacement ou d'opposition quand les
données se trouvent dans les poids et le réentraînement est disproportionné. La CNIL accepte les
filtres démontrés comme efficaces et robustes et préfère les règles générales à une liste de noms
[140]. Les données restent dans le modèle. À contraster avec
[Désapprentissage automatique](/glossary/machine-unlearning). Voir
[ch. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning)
; [ch. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (ch.
05, 19)

## P

**Chemin pavé.** Une route par défaut supportée et à faible friction (un modèle, une bibliothèque ou
un pipeline) qui rend la façon gouvernée la plus facile à livrer, de sorte que les ingénieurs
adoptent la gouvernance sans demander la permission. Voir
[ch. 03, Make the governed path the easiest path](/bok/values-and-principles#make-the-governed-path-the-easiest-path).
(ch. 03, 06)

**Violation de données à caractère personnel.** Une violation de la sécurité entraînant la
destruction, la perte, l'altération ou la divulgation ou l'accès non autorisé accidentels ou
illégaux à des données à caractère personnel, notifiée à l'autorité dans les 72 heures sauf si peu
probable de résulter en un risque [38]. L'IA ajoute la régurgitation, l'inversion et l'exfiltration
par injection de prompt comme routes. Voir
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch. 19)

**PIPIA.** L'évaluation d'impact sur la protection des informations personnelles en Chine en vertu
des articles 55 et 56 de la PIPL, requise à l'avance pour les données sensibles, la prise de
décision automatisée, le traitement confié et la fourniture transfrontalière, le rapport étant
conservé pendant au moins trois ans [100]. À contraster avec [AIPD](/glossary/dpia). Voir
[ch. 19, Brazil and China](/bok/privacy-and-ai#brazil-and-china). (ch. 19)

**Mise sur le marché.** Selon le règlement sur l'IA de l'UE, la première mise à disposition d'un
système d'IA ou d'un modèle d'IA à usage général sur le marché de l'Union ; les fournitures
ultérieures dans le cadre d'une activité commerciale constituent une mise à disposition [2]. Pour un
système à haut risque, l'évaluation de la conformité et la documentation technique doivent précéder
la mise sur le marché ou la mise en service. À comparer avec
[Mise en service](/glossary/putting-into-service). Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles) ;
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 08, 14, 15, 18, 20)

**Policy Card.** Un artefact de gouvernance lisible par machine conforme à un schéma JSON qui
déclare les comportements autorisés et interdits d'un agent pour l'application au moment de
l'exécution [11]. Voir [ch. 05, Pattern: Policy Card](/bok/patterns#pattern-policy-card). (ch. 04,
05, 10, 23)

**Policy verdict.** L'enregistrement structuré qu'un moteur de politique émet chaque fois qu'il
évalue une règle : autoriser ou refuser, l'identifiant de la règle versionnée, un hachage de
l'entrée et un horodatage, signés et écrits dans le magasin de preuves. Une publication ou un appel
d'outil sans verdict est une constatation d'audit, et celui qui a réussi sous une exception la nomme
dans son verdict. Voir [ch. 04, Layer 01: Govern-as-Code](/bok/the-stack#layer-01-govern-as-code) ;
[Toolkit: Policy Card builder](/toolkit/policy-card). (ch. 04, 05, 12, 23)

**Politique en tant que code.** La politique de gouvernance exprimée dans un langage de politique
exécutable (`OPA/Rego`, Cedar) qui s'évalue en CI/CD et à l'admission ; le sous-ensemble plus étroit
de gouvernance en tant que code relatif au pipeline. À comparer avec
[Gouvernance en tant que code](/glossary/governance-as-code). Voir
[ch. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (ch. 04, 05, 06)

**Surveillance après commercialisation.** L'obligation énoncée à l'article 72 du règlement sur l'IA
de surveiller activement les performances et les risques d'un système à haut risque après son
déploiement, tout au long de sa durée de vie [2]. Voir
[ch. 18, Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(ch. 08, 18)

**Modifications prédéterminées.** Les modifications apportées à un système à haut risque qui
continue d'apprendre, planifiées par le fournisseur lors de l'évaluation initiale de la conformité
et décrites dans la documentation technique ; elles ne constituent pas des modifications
substantielles [2]. Conçues comme une enveloppe de modification écrite en code. À comparer avec
[Modification substantielle](/glossary/substantial-modification). Voir
[ch. 14, Substantial modification](/bok/governing-development#substantial-modification). (ch. 14)

**IA prédictive.** L'IA qui produit une estimation sur quelque chose qui existe : un score, une
classe ou une prévision [21]. Ses préjudices sont principalement des préjudices d'allocation, et ses
preuves sont la précision, l'étalonnage et les taux d'erreur par sous-groupe, avec un seuil de
décision dont quelqu'un est responsable. Aussi appelée IA discriminative. À comparer avec
[IA générative](/glossary/generative-ai). Voir
[ch. 11, Predictive versus generative](/bok/ai-defined#predictive-versus-generative). (ch. 11)

**Présomption de conformité.** L'effet juridique selon l'article 40 du règlement sur l'IA : un
système à haut risque ou un modèle d'IA à usage général qui est conforme aux normes harmonisées
citées au Journal officiel est présumé satisfaire aux exigences que ces normes couvrent, et à aucune
autre [2]. Indisponible jusqu'à ce qu'une norme soit citée, ce qui en date du 2026-09-24 n'est le
cas pour aucune [10]. Voir
[ch. 22, How presumption of conformity works](/bok/principles-and-standards#how-presumption-of-conformity-works).
(ch. 08, 22)

**Protection des données dès la conception et protection des données par défaut.** L'obligation
énoncée à l'article 25 du RGPD de construire les principes de protection des données dans le
traitement par des mesures techniques et organisationnelles, et de traiter par défaut uniquement les
données à caractère personnel que chaque finalité nécessite [38]. Dans une stack d'IA, cela se
manifeste par des filtres, des règles de rétention et des limites d'accès appliquées en tant que
code. Voir
[ch. 19, Minimisation, privacy by design and PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(ch. 19)

**Technologie améliorant la protection de la vie privée (PET).** Une technique qui réduit ce qu'un
attaquant, un fournisseur ou un initié peut apprendre à partir de données à caractère personnel,
comme la confidentialité différentielle, l'apprentissage fédéré, les données synthétiques, le
masquage ou l'exécution de confiance [61]. Aucune ne rend un système conforme à elle seule ; chacune
a un mode de défaillance connu et est prouvée par un test. Voir
[ch. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(ch. 19)

**Directive relative à la responsabilité décorrente des produits défectueux (PLD).** Directive (UE)
2024/2853, qui traite les logiciels, y compris l'IA, comme des produits ; juge le défaut en tenant
compte de l'apprentissage et des mises à jour ; permet aux tribunaux d'ordonner la divulgation et de
présumer le défaut ; et s'applique aux produits mis sur le marché après le 9 décembre 2026 [101].
Voir
[ch. 20, The EU Product Liability Directive](/bok/existing-law#the-eu-product-liability-directive).
(ch. 20)

**Dérogation relative au profilage.** La règle énoncée au troisième alinéa de l'article 6(3) du
règlement sur l'IA selon laquelle un système de l'annexe III qui effectue un profilage de personnes
physiques est toujours à haut risque, indépendamment de la condition de filtre qu'il satisfait [2].
Un enregistrement de décision de classification porte donc un drapeau de profilage explicite, de
sorte qu'une réclamation de filtre que la dérogation annule est visible. À comparer avec
[Filtre de l'article 6(3)](/glossary/article-6-3-filter). Voir
[ch. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
; [Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 08, 18)

**Livraison progressive.** La publication d'une modification à une part croissante du trafic réel
par étapes (ombre, pilote, canari, disponibilité générale), chacune avec des critères de
restauration enregistrés avant son démarrage et un chemin testé vers la version précédente, de sorte
que les preuves du comportement en direct arrivent avant l'exposition complète. Pour les systèmes
d'IA, cela couvre les modifications de modèle, d'invite, de corpus et de version de fournisseur.
Voir
[ch. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control)
;
[ch. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 14, 15, 23)

**Pratique interdite.** Une pratique d'IA interdite purement et simplement par l'article 5 du
règlement sur l'IA, comme les techniques manipulatrices qui causent un préjudice important, la
notation sociale, le raclage non ciblé d'images faciales, la reconnaissance des émotions au travail
ou à l'école, et la plupart des identifications biométriques à distance en temps réel en public pour
l'application de la loi [2]. Aucune acceptation du risque ne peut en couvrir une. À comparer avec
[Système d'IA à haut risque](/glossary/high-risk-ai-system). Voir
[ch. 18, Prohibited practices (Article 5)](/bok/eu-ai-act#prohibited-practices-article-5). (ch. 18)

**Injection de prompt.** Une entrée qui modifie le comportement ou la sortie d'un modèle de manière
que ses concepteurs n'avaient pas prévue. Elle est directe quand l'utilisateur la fournit et
indirecte quand elle arrive à l'intérieur du contenu que le modèle traite, comme une page web, un
fichier ou un résultat d'outil [84]. Contenue par des guardrails, des outils à privilège minimal et
des évaluations. À comparer avec [Jailbreak](/glossary/jailbreak) et
[Hidden Context Exposure](/glossary/hidden-context-exposure). Voir
[ch. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 01, 04, 17, 23)

**Gouvernance proportionnée.** L'exécution de la même boucle de risque à une intensité définie par
la taille de l'organisation, le secteur, la maturité et la tolérance au risque, au-dessus d'un
plancher de contrôles qui ne s'adapte jamais. Le règlement sur l'IA lui-même adapte les obligations
de documentation et de gestion de la qualité pour les petites entreprises [2]. Il réduit le coût de
la gouvernance, non la protection due. Voir
[ch. 13, Proportionate governance: tailoring the loop](/bok/risk-management#proportionate-governance-tailoring-the-loop).
(ch. 13)

**Fournisseur.** Selon le règlement sur l'IA de l'UE, quiconque développe un système d'IA ou un
modèle d'IA à usage général, ou en fait développer un, et le met sur le marché ou le met en service
sous son propre nom ou sa propre marque, que ce soit contre rémunération ou gratuitement [2]. Il
porte les obligations de conception, de documentation, de conformité et de surveillance pour les
systèmes à haut risque. À comparer avec [Responsable de l'implantation](/glossary/deployer). Voir
[ch. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (ch. 15, 18)

**Étiquette de substitution.** Une cible d'entraînement qui représente la construction qu'une
décision est censée capturer, comme le coût des soins de santé représentant le besoin en santé
[102]. Quand la substitution est façonnée par un traitement inégal, un modèle peut être précis sur
la substitution et biaisé sur la construction. À comparer avec
[Variable de substitution](/glossary/proxy-variable). Voir
[Case: a health risk score with a proxy label](/cases/health-risk-score-proxy). (ch. 16)

**Analyse de substitution.** Un test qui entraîne un modèle à prédire un attribut protégé à partir
des caractéristiques d'un système ; les caractéristiques qui le prédisent fortement sont signalées
comme des substitutions à justifier ou à supprimer, et le résultat est enregistré dans la fiche de
données. Il trouve les variables de substitution avant qu'une métrique de résultat ne montre leur
effet. Voir
[ch. 16, Fairness and explainability in the stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack)
; [ch. 05, Pattern: Fairness Eval Suite](/patterns/fairness-eval-suite). (ch. 05, 16)

**Variable de substitution.** Une caractéristique qui porte l'information d'une caractéristique
protégée, comme le code postal pour l'origine ethnique, de sorte qu'un modèle peut discriminer sans
utiliser l'attribut lui-même. Les tests de substitution recherchent les caractéristiques qui
prédisent l'attribut protégé [102]. À comparer avec
[Étiquette de substitution](/glossary/proxy-label). Voir
[ch. 16, Protected characteristics, proxies and the data you need to test](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
(ch. 16, 20)

**Pseudonymisation.** Le traitement de données à caractère personnel de sorte qu'elles ne puissent
plus être attribuées à une personne sans informations supplémentaires conservées séparément et
protégées [38]. Les données pseudonymisées restent des données à caractère personnel pour quiconque
peut les réattribuer ; c'est une mesure de sécurité, non une anonymisation. À comparer avec
[Données anonymes](/glossary/anonymous-data). Voir
[ch. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(ch. 19)

**Limitation de la finalité.** Le principe du RGPD selon lequel les données à caractère personnel
collectées pour une finalité spécifiée ne peuvent pas être traitées ultérieurement d'une manière
incompatible ; l'article 6(4) établit le test de compatibilité [38]. Appliquée dans les pipelines
d'IA par des étiquettes de finalité sur les ensembles de données et une politique qui refuse les
exécutions dont la finalité déclarée ne correspond pas. Voir
[ch. 19, Purpose limitation and function creep](/bok/privacy-and-ai#purpose-limitation-and-function-creep).
(ch. 19)

**Mise en service.** Selon le règlement sur l'IA de l'UE, la fourniture d'un système d'IA pour
première utilisation directement au responsable de l'implantation, ou pour l'utilisation propre du
fournisseur, dans l'Union pour sa finalité prévue [2]. L'utilisation propre compte : une
organisation qui construit un système et l'exécute elle-même est son fournisseur et son responsable
de l'implantation, sans vente impliquée. À comparer avec
[Mise sur le marché](/glossary/placing-on-the-market). Voir
[ch. 18, Roles name tasks, not organisations](/bok/eu-ai-act#roles-name-tasks-not-organisations) ;
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (ch. 15, 18)

## Q

**SGQ (art. 17).** Le système de gestion de la qualité que l'article 17 du règlement sur l'IA exige
des fournisseurs à haut risque ; distinct d'un AIMS ISO/IEC 42001, qui certifie un système de
gestion mais n'est pas harmonisé [2][10]. À comparer avec [AIMS](/glossary/aims). Voir
[ch. 18, Article 16 and the quality management system (Article 17)](/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17).
(ch. 08, 18)

## R

**RAISE Act.** Loi new-yorkaise Responsible AI Safety and Education Act, une loi de sécurité pour
les IA frontière qui oblige les grands développeurs frontière à publier un cadre de sécurité et
chaque développeur frontière à signaler les incidents de sécurité critiques ; signée le 19 décembre
2025 et entrant en vigueur le 1er janvier 2027 après un amendement du chapitre en mars 2026 qui a
placé la surveillance dans un bureau au sein du Department of Financial Services (DFS) [12][15].
Voir [ch. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Réduction effective du risque.** La baisse mesurée du taux ou du rayon d'impact d'un mode de
défaillance nommé en production ; l'un des deux tests de la discipline, par rapport à la couverture
du cadre. Voir
[ch. 03, 7. Success is measured in realised risk reduction, not framework coverage](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage).
(ch. 01, 03)

**Code de raison.** Une déclaration stable et lisible par l'homme d'un facteur principal derrière
une décision défavorable, mappée à partir des facteurs que le modèle a réellement évalués et
versionnée avec le modèle ; requise en substance par les règles américaines d'action contraire [23].
Voir
[ch. 16, Credit: adverse-action notices and reason codes](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
; [ch. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path) ;
[ch. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (ch. 05, 16, 20)

**Mauvaise utilisation raisonnablement prévisible.** Utilisation d'un système d'IA non conforme à sa
destination qui peut résulter d'un comportement humain raisonnablement prévisible ou d'une
interaction avec d'autres systèmes, y compris d'autres systèmes d'IA [2]. Distincte d'une attaque ;
conservée dans un registre de mauvaise utilisation qui alimente les tests, la politique d'exécution
et les instructions d'utilisation. À contraster avec [Destination](/glossary/intended-purpose). Voir
[ch. 14, Reasonably foreseeable misuse](/bok/governing-development#reasonably-foreseeable-misuse) ;
[ch. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm).
(ch. 14, 15)

**Registre des activités de traitement (RAT).** Le registre de l'article 30 du RGPD de chaque
activité de traitement : finalités, catégories de données et de personnes, destinataires,
transferts, conservation et sécurité [38]. Pour l'IA, il est préférable de le générer par moment de
traitement à partir du registre et des fiches de données, afin qu'il ne devienne pas obsolète. Voir
[ch. 19, Records of processing](/bok/privacy-and-ai#records-of-processing). (ch. 19)

**Recours.** La capacité d'une personne à obtenir une décision différente en modifiant les entrées
sur lesquelles elle peut réellement agir, comme le revenu plutôt que l'âge [103]. Les explications
contrefactuelles restreintes aux caractéristiques exploitables en sont la forme d'ingénierie
habituelle ; un système peut offrir une contestation et laisser quand même aucun recours. À
contraster avec [Contestabilité](/glossary/contestability). Voir
[ch. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(ch. 16, 21)

**Red teaming.** Test adversarial structuré d'un modèle ou d'un agent pour éliciter des défaillances
(jailbreaks, injection, mauvaise utilisation d'outils) avant qu'un attaquant ne le fasse ; traité
ici comme un contrôle producteur de preuves. Voir
[ch. 05, Pattern: Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite).
(ch. 04, 05, 15)

**Régurgitation.** Un modèle reproduisant des données d'entraînement mémorisées textuellement, y
compris des données personnelles, que ce soit sur demande délibérée (extraction de données
d'entraînement) ou non [104]. Détectée par des vérifications de sortie et des canaris, et testée par
des évaluations d'extraction. À contraster avec [Hallucination](/glossary/hallucination). Voir
[ch. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (ch.
19, 20)

**Apprentissage par renforcement.** Apprentissage pour maximiser un signal de récompense par essai
et rétroaction [40]. Sa défaillance caractéristique est l'optimisation de la récompense, donc la
récompense est enregistrée comme l'objectif du système et les évaluations recherchent des stratégies
involontaires. Voir [ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Apprentissage par renforcement à partir de retours humains (RLHF).** Un moyen d'aligner un modèle
pré-entraîné : ajustement fin supervisé sur des démonstrations humaines, puis apprentissage par
renforcement par rapport à un modèle de récompense entraîné sur les classements humains des
résultats [105]. Les instructions des évaluateurs et le modèle de récompense deviennent des
artefacts gouvernés, car ils façonnent ce que le modèle refuse et préfère. À contraster avec
[Fine-tuning](/glossary/fine-tuning). Voir
[ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Horloge de signalement.** Un délai statutaire pour une notification d'incident, défini par son
déclencheur (sensibilisation, classification, lien causal ou détermination), destinataire, contenu
et suites, comme dans l'article 73 du règlement sur l'IA [2]. Un événement peut démarrer plusieurs
horloges, donc chacune est maintenue comme son propre minuteur sur un seul enregistrement
d'incident. Voir [ch. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (ch. 17)

**Risque résiduel.** Ce qui reste d'un risque une fois le traitement appliqué [30]. Le règlement sur
l'IA de l'UE exige que le risque résiduel par aléa et global soit jugé acceptable pour les systèmes
à haut risque [2]. Une évaluation résiduelle ne crédite que les contrôles dont les preuves sont
actuelles. À contraster avec [Risque inhérent](/glossary/inherent-risk) et
[Tolérance au risque](/glossary/risk-tolerance). Voir
[ch. 13, Inherent risk, residual risk and who accepts it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(ch. 13)

**Licence d'IA responsable (OpenRAIL).** Une licence qui accorde un accès ouvert et sans redevance à
un artefact d'IA tout en attachant des utilisations interdites que chaque redistribution et dérivé
doit transporter [106]. Les restrictions voyagent avec le modèle, donc les propres conditions
d'utilisation d'un déployeur doivent les répéter. À contraster avec
[Modèle à poids ouvert](/glossary/open-weight-model). Voir
[ch. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences). (ch. 15)

**Ensemble de principes d'IA responsable.** Un ensemble publié de cibles normatives pour l'IA, comme
les principes de l'OCDE sur l'IA [31], la recommandation de l'UNESCO, les exigences du HLEG ou les
principes de Hiroshima du G7. Pas le « principe » maison, qui est une règle de méthode ; un ensemble
de principes ne compte comme appliqué que lorsqu'un artefact l'atteste. À contraster avec
[IA digne de confiance](/glossary/trustworthy-ai). Voir
[ch. 11, Responsible-AI principle sets, engineered](/bok/ai-defined#responsible-ai-principle-sets-engineered).
(ch. 11)

**Génération augmentée par récupération (RAG).** Un système qui combine la mémoire apprise d'un
modèle avec un magasin de documents récupérable au moment de la réponse [107]. Le corpus devient un
comportement, donc il est gouverné comme un modèle : versionné, carté, lié à l'évaluation qui l'a
testé, avec une vérification de droit sur ce que chaque utilisateur peut récupérer. Voir
[ch. 11, RAG systems](/bok/ai-defined#rag-systems). (ch. 11, 16)

**Optimisation de la récompense.** Un système trouvant un moyen involontaire de maximiser sa
récompense ou son objectif sans faire ce que ses concepteurs avaient l'intention [108]. Répondu en
enregistrant l'objectif et en testant les stratégies involontaires, pas seulement la tâche prévue.
Voir [ch. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Droit à l'explication (article 86 du règlement sur l'IA).** Le droit d'une personne affectée par
la décision d'un déployeur basée sur la sortie d'un système à haut risque de l'annexe III, avec des
effets défavorables juridiques ou similaires, à des explications claires et significatives du rôle
du système et des éléments principaux de la décision, lorsque le droit de l'Union ne le prévoit pas
déjà [2]. À contraster avec [Explicabilité](/glossary/explainability). Voir
[ch. 18, Explanation and notice to affected people](/bok/eu-ai-act#explanation-and-notice-to-affected-people).
(ch. 16, 18, 19)

**Réserve de droits (opt-out TDM).** La réserve expresse d'un titulaire de droits concernant
l'exploration de textes et de données en vertu de l'article 4(3) de la directive DSM, qui retire le
contenu de l'exception générale d'exploration ; pour le contenu rendu publiquement disponible en
ligne, elle doit être faite de manière appropriée, comme par des moyens lisibles par machine [115].
Les fournisseurs de modèles d'IA à usage général doivent identifier et respecter ces réserves [2]. À
contraster avec [Exception TDM](/glossary/tdm-exception). Voir
[ch. 20, Artefacts that evidence IP compliance](/bok/existing-law#artefacts-that-evidence-ip-compliance)
; [ch. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (ch. 05,
08, 12, 20)

**Acceptation du risque.** Une décision nommée, signée et expirante par quelqu'un ayant l'autorité
que la bande résiduelle exige, qu'un risque peut rester pour une période limitée sous des contrôles
compensatoires nommés et un signal de surveillance qui l'annule [30]. L'autorité augmente avec
l'évaluation ; une utilisation interdite ne peut être acceptée par personne. À contraster avec
[Registre d'exceptions](/glossary/exception-register). Voir
[ch. 13, Who may accept](/bok/risk-management#who-may-accept) ;
[ch. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(ch. 12, 13)

**Appétence pour le risque.** Le montant de risque, et de quels types, qu'une organisation est prête
à prendre dans la poursuite de ses objectifs [109]. Dans ce livre, il est compilé à partir d'une
déclaration approuvée dans un fichier de données versionné qui gère la lecture, plutôt que d'être
laissé dans un document du conseil. À contraster avec
[Tolérance au risque](/glossary/risk-tolerance). Voir
[ch. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(ch. 13)

**Gestion des risques.** La pratique organisée de diriger les décisions d'une organisation en tenant
compte de ses risques [109] : identifier, évaluer, traiter et surveiller, dans une boucle. Pour les
systèmes à haut risque, le règlement sur l'IA exige un système de gestion des risques documenté tout
au long du cycle de vie [2]. À contraster avec
[Gestion des risques des modèles](/glossary/model-risk-management). Voir
[ch. 13, The loop: identify, assess, treat, monitor](/bok/risk-management#the-loop-identify-assess-treat-monitor).
(ch. 13)

**Matrice de risque.** Une grille qui transforme une évaluation de probabilité et une évaluation de
gravité, chacune sur des échelles définies, en une bande qui déclenche un traitement, une porte et
une cadence d'examen. Utile pour la cohérence, pas la précision [110] ; conservez les chiffres
derrière chaque cellule. Voir
[ch. 13, Assessing risk: the likelihood-by-severity matrix](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix).
(ch. 13)

**Registre des risques.** Le registre de preuves de la boucle de risque : un fichier versionné par
risque, indexé par un id de registre, avec évaluations, traitement, contrôles qui se résolvent en
preuves, propriétaire, acceptation, cadence d'examen et liens vers les évaluations, incidents et
obligations. Les portes de déploiement le lisent ; il atteste un système de gestion des risques de
l'article 9 [2]. À contraster avec [Registre d'exceptions](/glossary/exception-register). Voir
[ch. 13, The risk register as an evidence record](/bok/risk-management#the-risk-register-as-an-evidence-record).
(ch. 13)

**Source de risque.** Tout ce qui peut donner naissance à un risque seul ou en combinaison, comme un
ensemble de données, une attribution d'outil, un adversaire ou un groupe d'utilisateurs [111]. Les
sources internes se situent dans le contrôle de l'organisation ; les sources externes surviennent en
dehors et sont principalement traitées par l'ingénierie et la surveillance. À contraster avec
[Facteur contributif](/glossary/contributing-factor). Voir
[ch. 13, Internal and external risk sources](/bok/risk-management#internal-and-external-risk-sources).
(ch. 13)

**Niveau de risque.** Évaluation propre à une organisation d'un cas d'usage d'IA, calculée à
l'admission selon une politique versionnée à partir de champs de profil déclarés tels que
l'autonomie, l'impact de la décision, l'exposition, la réversibilité, les groupes vulnérables, la
classe de données et les tiers. Le niveau sélectionne les évaluations, les évaluations, les seuils,
les approbateurs et la cadence d'examen qu'un système doit respecter ; il s'ajoute à la
classification juridique, ne la remplace pas. À contraster avec
[Système d'IA à haut risque](/glossary/high-risk-ai-system). Voir
[ch. 13, Facteurs contributifs et profil de risque du cas d'usage](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile)
;
[ch. 05, Motif : Admission du cas d'usage et hiérarchisation des risques](/patterns/use-case-intake-risk-tiering).
(ch. 05, 06, 12, 13)

**Tolérance au risque.** La disposition à supporter un risque donné pour atteindre les objectifs
[30]. Conçue comme la bande résiduelle la plus élevée qu'un niveau de système peut supporter avant
qu'une porte de déploiement n'exige une acceptation signée. À contraster avec
[Appétence pour le risque](/glossary/risk-appetite). Voir
[ch. 13, Appétence et tolérance au risque, compilées dans les portes](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(ch. 13)

**Critères de retour en arrière.** Les conditions, écrites dans le plan de déploiement avant le
début d'une étape de publication, selon lesquelles le pipeline revient automatiquement à la version
précédente : un seuil franchi par rapport au groupe de contrôle, un taux de désaccord ou de
remplacement supérieur à un seuil, un événement de sévérité 1. Un critère défini après le
déplacement de la métrique est une négociation, non un contrôle. À contraster avec
[Kill switch](/glossary/kill-switch). Voir
[ch. 15, Livraison progressive en tant que contrôle](/bok/governing-deployment#progressive-delivery-as-a-control)
;
[ch. 05, Motif : Déploiement progressif avec critères de retour en arrière](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 15)

**Analyse des causes profondes (RCA).** L'examen qui répond à la question de savoir pourquoi un
incident s'est produit et pourquoi les contrôles ne l'ont pas arrêté, en utilisant des techniques
telles que les cinq pourquoi, l'analyse par arbre des défaillances [112] et les post-mortems sans
culpabilité, et codifie chaque cause confirmée par rapport à une taxonomie qui nomme le contrôle qui
aurait dû la détecter. Voir
[ch. 17, Analyse des causes profondes](/bok/incidents#root-cause-analysis). (ch. 17)

**Chemin de données d'exécution.** La connexion en direct entre la production et la fonction de
gouvernance (découverte, télémétrie et application), sans laquelle un registre ou un tableau de bord
décrit le programme mais ne peut pas voir ce qui s'exécute [13]. Voir
[ch. 02, 5. Pas de chemin de données d'exécution](/bok/why-now#5-no-runtime-data-path). (ch. 02,
04, 07)

## S

**Safetensors.** Un format de fichier pour stocker les tenseurs d'un modèle en toute sécurité, par
opposition à Python pickle [137], dont le chargement peut exécuter du code arbitraire et que la
documentation Python qualifie de non sécurisée [138]. Le stockage des poids sous forme de
safetensors et l'analyse de tous les fichiers pickle restants pour détecter les importations
exécutant du code avant qu'ils n'atteignent un registre ferme une route de chaîne
d'approvisionnement courante vers la diffusion. Voir
[ch. 14, Reproductibilité et versioning lié](/bok/governing-development#reproducibility-and-linked-versioning)
; [ch. 05, Motif : Intégrité de l'artefact de modèle](/patterns/model-artefact-integrity). (ch.
05, 14)

**Composant de sécurité.** Selon le règlement sur l'IA tel qu'amendé en 2026, un composant d'un
produit ou d'un système d'IA dont la destination est de prévenir ou d'atténuer les risques pour la
santé et la sécurité des personnes ou des biens, ou dont la défaillance les met en danger. L'IA
utilisée uniquement pour la commodité, l'efficacité ou le contrôle de la qualité est exclue sauf si
sa défaillance mettrait en danger la sécurité [2]. Voir
[ch. 18, Haut risque par les produits (Annexe I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(ch. 18)

**Passerelle d'IA autorisée.** L'itinéraire unique approuvé par lequel le personnel accède aux
outils d'IA et aux API de modèles : outils approuvés derrière une authentification unique et une
passerelle qui classe chaque demande par classe de données, l'autorise, la rédige ou la bloque selon
la politique d'utilisation acceptable, vérifie une attestation actuelle et enregistre une décision
par appel. Elle fonctionne en étant l'itinéraire le plus facile. À contraster avec
[IA fantôme](/glossary/shadow-ai). Voir
[ch. 12, Utilisation acceptable de l'IA par le personnel](/bok/governance-program#acceptable-use-of-ai-by-staff)
; [ch. 05, Motif : Passerelle d'IA autorisée](/patterns/sanctioned-ai-gateway). (ch. 05, 12)

**SB 53.** Loi californienne sur la transparence des IA de pointe (TFAIA), en vigueur le 1er janvier
2026, couvrant les développeurs de pointe entraînant des modèles au-dessus de 10^26 FLOP : tous
publient des rapports de transparence et signalent les incidents de sécurité critiques, et les
grands développeurs de pointe publient également un cadre de sécurité [14][142]. Voir
[ch. 08, Lois des développeurs de pointe](/bok/regulatory-map#frontier-developer-laws). (ch. 08, 21)

**Apprentissage auto-supervisé.** Apprentissage par prédiction de parties de l'entrée elle-même,
comme le jeton suivant, sur de grands corpus ; la définition du règlement sur l'IA d'un modèle à
usage général nomme l'auto-supervision à grande échelle [2]. La provenance du corpus, les droits et
la mémorisation sont difficiles à tracer, c'est pourquoi l'AIBOM enregistre la provenance de
l'ensemble de données. Voir
[ch. 11, Par paradigme d'apprentissage](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Incident grave.** Selon l'article 3(49) du règlement sur l'IA, un incident ou un dysfonctionnement
d'un système d'IA qui conduit directement ou indirectement à (a) un décès ou un préjudice grave à la
santé, (b) une perturbation grave et irréversible d'une infrastructure critique, (c) une violation
des obligations du droit de l'Union protégeant les droits fondamentaux, ou (d) un préjudice grave
aux biens ou à l'environnement, déclenchant le signalement de l'article 73 [2]. À contraster avec
[Incident d'IA](/glossary/ai-incident). Voir
[ch. 17, Incident, aléa, problème et incident grave](/bok/incidents#incident-hazard-issue-and-serious-incident)
;
[ch. 18, Surveillance après commercialisation et incidents graves (articles 72 et 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(ch. 04, 08, 17, 18)

**IA fantôme.** Un système d'IA, un modèle ou un agent s'exécutant sans enregistrement, y compris
l'utilisation par le personnel d'outils d'IA non approuvés ; le mode de défaillance qui rend un
inventaire complet uniquement pour les honnêtes. Il est trouvé par découverte et résolu par une
route autorisée, non par une interdiction. À contraster avec
[Passerelle d'IA autorisée](/glossary/sanctioned-ai-gateway). Voir
[ch. 05, Motif : Découverte d'IA fantôme](/bok/patterns#pattern-shadow-ai-discovery) ;
[ch. 12, Utilisation acceptable de l'IA par le personnel](/bok/governance-program#acceptable-use-of-ai-by-staff).
(ch. 05, 07, 12)

**Déploiement fantôme.** Une étape de publication dans laquelle un nouveau modèle ou système reçoit
des entrées en direct mais ses sorties ne sont pas utilisées, de sorte que son comportement sur le
trafic réel peut être comparé avec le titulaire ou avec les décisions humaines avant toute
exposition. Le journal des désaccords en est la preuve. À contraster avec
[Publication canari](/glossary/canary-release). Voir
[ch. 15, Livraison progressive en tant que contrôle](/bok/governing-deployment#progressive-delivery-as-a-control)
;
[ch. 05, Motif : Déploiement progressif avec critères de retour en arrière](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 14, 15)

**SHAP.** SHapley Additive exPlanations : une méthode d'attribution de caractéristiques qui assigne
à chaque caractéristique d'entrée une part d'une prédiction particulière, basée sur les valeurs de
Shapley [113] ; ses explications dépendent de la ligne de base ou des données d'arrière-plan
choisies. À contraster avec [LIME](/glossary/lime). Voir
[ch. 16, Attribution de caractéristiques : SHAP, LIME et gradients intégrés](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(ch. 16)

**Petit modèle de langage (SLM).** Un modèle de langage suffisamment petit pour s'exécuter près de
l'utilisateur, par exemple sur un téléphone [86]. Ses contrôles doivent être livrés avec lui :
garde-fous sur l'appareil, un inventaire de version sur l'ensemble de la flotte et un kill switch
livré en tant que drapeau distant ou mise à jour d'application. À contraster avec
[Grand modèle de langage (LLM)](/glossary/large-language-model-llm). Voir
[ch. 11, LLM et SLM](/bok/ai-defined#llms-and-slms). (ch. 11)

**Petite entreprise de taille moyenne (SMC).** Une entreprise qui a dépassé la définition des PME
mais qui entre dans la définition de l'UE des petites entreprises de taille moyenne. L'omnibus
numérique étend certains allègements pour les PME en vertu du règlement sur l'IA aux SMC, tels que
la documentation technique simplifiée et un système de gestion de la qualité proportionné [2]. Voir
[ch. 18, Le règlement et l'omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (ch. 18)

**Données de catégories spéciales.** Les catégories de l'article 9 du RGPD dont le traitement est
interdit sauf si une condition s'applique : données révélant l'origine raciale ou ethnique, les
opinions politiques, les convictions ou l'adhésion à un syndicat, et les données génétiques,
biométriques (pour l'identification), de santé, de vie sexuelle et d'orientation sexuelle [38]. L'IA
peut les créer par inférence. À contraster avec
[Données sensibles déduites](/glossary/inferred-sensitive-data). Voir
[ch. 19, Catégories spéciales, données déduites et biométrie](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics).
(ch. 19)

**Cartographie des parties prenantes.** Nommer qui est affecté par un système d'IA ou a un avis sur
celui-ci (utilisateurs, non-utilisateurs affectés, responsables du déploiement, fournisseurs,
fonctions internes, régulateurs, organe directeur) et comment chaque avis entre dans la boucle de
risque, avec la consultation enregistrée. Une FRIA nomme aussi les groupes affectés [2]. Voir
[ch. 13, Cartographie des parties prenantes](/bok/risk-management#stakeholder-mapping). (ch. 13)

**STAR pour l'IA.** Le programme d'assurance de sécurité et de certification de la CSA pour l'IA,
construit sur l'AICM, avec un niveau d'auto-évaluation, un niveau automatisé « Valid-AI-ted » et un
niveau 2 combinant ISO/IEC 42001 avec l'évaluation validée [4]. Voir
[ch. 08, AICM et STAR pour l'IA de la CSA](/bok/regulatory-map#csa-aicm-and-star-for-ai). (ch.
07, 08)

**STRIDE.** Une liste de contrôle de classification des menaces du Security Development Lifecycle de
Microsoft : usurpation d'identité, falsification, répudiation, divulgation d'informations, déni de
service et élévation de privilège [133]. Pour un système d'IA, elle est parcourue par élément du
diagramme de flux de données, puis étendue avec des catalogues spécifiques à l'IA tels que MITRE
ATLAS et les listes OWASP. À contraster avec [ATLAS](/glossary/atlas). Voir
[ch. 15, Modélisation des menaces du système déployé](/bok/governing-deployment#threat-modelling-the-deployed-system)
; [ch. 05, Motif : Modèle de menace d'IA](/patterns/ai-threat-model). (ch. 05, 06, 15)

**Sous-traitant.** Un sous-traitant qu'un autre sous-traitant engage pour effectuer un traitement
pour un responsable du traitement, comme l'hôte de modèle derrière un fournisseur d'IA. Selon
l'article 28 du RGPD, il a besoin de l'autorisation écrite préalable du responsable du traitement,
spécifique ou générale avec notification des modifications et une chance de s'opposer, et les mêmes
obligations de protection des données s'écoulent jusqu'à lui par contrat [38]. À contraster avec
[Responsable du traitement et sous-traitant](/glossary/controller-and-processor). Voir
[ch. 19, Accords de traitement des données personnelles des fournisseurs d'IA et clauses sans entraînement](/bok/privacy-and-ai#ai-vendor-dpas-and-no-training-clauses)
;
[ch. 15, Contrats de fournisseur et conditions de licence](/bok/governing-deployment#vendor-contracts-and-licence-terms).
(ch. 08, 12, 15, 19)

**Modification substantielle.** Selon le règlement de l'UE sur l'IA, une modification après la mise
sur le marché que l'évaluation de la conformité initiale n'a pas prévue et qui affecte la conformité
ou modifie la destination [2]. Elle déclenche une nouvelle évaluation de la conformité et peut
transformer un responsable du déploiement ou un distributeur en fournisseur ; les modifications
prédéterminées sont exemptées. À contraster avec
[Modifications prédéterminées](/glossary/pre-determined-changes). Voir
[ch. 18, Article 25 : quand quelqu'un d'autre devient le fournisseur](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)
; [ch. 14, Modification substantielle](/bok/governing-development#substantial-modification) ;
[ch. 15, Quand un responsable du déploiement devient un fournisseur](/bok/governing-deployment#when-a-deployer-becomes-a-provider).
(ch. 14, 15, 18)

**Apprentissage supervisé.** Apprentissage à partir d'exemples étiquetés [40]. Les étiquettes codent
les décisions humaines passées avec leurs erreurs et biais, de sorte que la fiche de données
enregistre la provenance des étiquettes et la porte d'évaluation teste les taux d'erreur par
sous-groupe. À contraster avec [Apprentissage non supervisé](/glossary/unsupervised-learning). Voir
[ch. 11, Par paradigme d'apprentissage](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**SVID.** SPIFFE Verifiable Identity Document : document d'identité cryptographique de courte durée,
soit un certificat X.509, soit un JWT, qui prouve l'identifiant SPIFFE d'une charge de travail et
est émis et renouvelé via l'API Workload SPIFFE, que SPIRE implémente [124]. Une accréditation qui
expire en quelques minutes n'a pas besoin d'être recherchée après un incident, il suffit de ne pas
la rééditer. À contraster avec [Workload identity](/glossary/workload-identity). Voir
[ch. 23, Short-lived, attested credentials](/bok/governing-agents#short-lived-attested-credentials).
(ch. 23)

**Données synthétiques.** Données générées par un modèle ou une simulation plutôt que collectées
auprès de personnes ou d'événements, utilisées pour augmenter les ensembles d'entraînement, tester
les cas limites ou réduire l'exposition des données personnelles. Elles héritent des biais de leur
générateur et peuvent divulguer les enregistrements sur lesquels elles ont été ajustées, elles sont
donc testées comme tout autre ensemble de données. Voir
[ch. 14, Synthetic data, augmentation and privacy-enhancing technologies](/bok/governing-development#synthetic-data-augmentation-and-privacy-enhancing-technologies).
(ch. 14, 19)

**Fiche système.** Documentation d'un système d'IA déployé dans son ensemble (modèles, prompts,
récupération, outils, garde-fous et supervision), où une fiche de modèle documente un seul modèle
[114]. Son audience est les déployeurs, les autorités et le public ; ses preuves sont l'entrée du
registre, la configuration des garde-fous et les résultats des tests adversariaux. À contraster avec
[Fiche de modèle](/glossary/model-card). Voir
[ch. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(ch. 14, 15)

**Risque systémique.** Selon le Reglamento de IA, le risque posé par les modèles d'IA de usage
général les plus puissants, déclenchant des obligations supplémentaires d'évaluation, de test
adversarial et de signalement d'incidents pour leurs fournisseurs [2]. Voir
[ch. 18, Systemic risk: threshold, notification, designation](/bok/eu-ai-act#systemic-risk-threshold-notification-designation).
(ch. 08, 18)

## T

**Exercice de simulation.** Une répétition programmée et notée d'un playbook d'incident contre un
mode de défaillance nommé, produisant les mêmes enregistrements qu'un incident réel (enregistrement,
horloges, brouillons de rapports, événements de confinement) marqués comme un exercice. Le playbook
est la réclamation ; le résultat de l'exercice est la preuve. Voir
[ch. 17, Playbooks, RACI and drills](/bok/incidents#playbooks-raci-and-drills). (ch. 17)

**TC260.** Le Comité technique national 260 sur la cybersécurité de l'Administration de la
normalisation de la Chine (全国网络安全标准化技术委员会), qui rédige les normes nationales chinoises de
cybersécurité et d'IA (GB et GB/T) et publie le Cadre volontaire de gouvernance de la sécurité de
l'IA (1.0 en 2024, 2.0 en 2025, 3.0 le 14 septembre 2026) [19]. Voir
[ch. 21, China: what chapter 08 does not already cover](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(ch. 08, 21)

**Exception TDM.** L'exception du droit d'auteur de l'UE pour l'extraction de textes et de données
(articles 3 et 4 de la directive DSM) qui permet à quiconque de copier les œuvres légalement
accessibles pour l'extraction, y compris l'entraînement de l'IA, sauf si le titulaire des droits a
réservé cet usage ; pour le contenu rendu publiquement disponible en ligne, la réserve doit être
faite de manière appropriée, par exemple par des moyens lisibles par machine [115]. À contraster
avec [Fair use](/glossary/fair-use) et
[Rights reservation (TDM opt-out)](/glossary/rights-reservation-tdm-opt-out). Voir
[ch. 20, Copyright and training data](/bok/existing-law#copyright-and-training-data). (ch. 20)

**Documentation technique (Annexe IV).** Le dossier technique du fournisseur pour un système d'IA à
haut risque, établi avant la mise sur le marché et tenu à jour en vertu de l'article 11 :
description, processus de développement, données, tests, supervision, gestion des risques, normes,
déclaration et plan de surveillance après commercialisation [2]. La plupart des éléments peuvent
être générés à partir des enregistrements du pipeline. Voir
[ch. 14, Annex IV, element by element](/bok/governing-development#annex-iv-element-by-element).
(ch. 14)

**Contamination de l'ensemble de test.** La présence d'éléments d'évaluation dans les données
d'entraînement d'un modèle, qui gonfle ses scores ; elle peut être démontrée même pour les modèles
de langage en boîte noire [116]. Atténuée par des ensembles retenus privés, des éléments renouvelés
et des éléments de test datés. Voir
[ch. 14, Statistical validity of evals](/bok/governing-development#statistical-validity-of-evals).
(ch. 14)

**Essais en conditions réelles.** Selon le Reglamento de IA de l'UE, test temporaire d'un système
d'IA pour sa destination en dehors d'un laboratoire, selon un plan approuvé par l'autorité de
surveillance du marché, avec enregistrement, consentement éclairé des sujets, supervision effective
et résultats réversibles, pour une période limitée [2]. À contraster avec
[AI regulatory sandbox](/glossary/ai-regulatory-sandbox). Voir
[ch. 18, Sandboxes and real-world testing](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(ch. 18)

**Modèle de menace (IA).** Un enregistrement versionnné de ce qui peut mal tourner avec un système
d'IA et ce qui est fait à ce sujet : flux de données et limites de confiance, menaces par élément de
STRIDE et de catalogues spécifiques à l'IA, une décision sur chacune, et le test qui prouve chaque
atténuation. Il répond aux quatre questions de la modélisation des menaces, en terminant par la
question de savoir si le travail a été fait suffisamment bien [134]. À contraster avec
[Red teaming](/glossary/red-teaming). Voir
[ch. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[ch. 05, Pattern: AI Threat Model](/patterns/ai-threat-model). (ch. 05, 14, 15, 23)

**Three Lines Model.** La mise à jour 2020 de l'Institut des auditeurs internes du « modèle des
trois lignes de défense » : l'organe de gouvernance assure la surveillance ; la direction tient les
rôles de première ligne (livrer les produits et services) et de deuxième ligne (expertise en
risques, soutien et défi) ; l'audit interne fournit une assurance indépendante de troisième ligne
[117]. Voir
[ch. 12, The three lines, applied to AI](/bok/governance-program#the-three-lines-applied-to-ai).
(ch. 12)

**Token passthrough.** L'anti-pattern dans lequel un serveur accepte un token qui ne lui a pas été
émis et le transmet, inchangé, à une API en aval, qui peut alors le faire confiance comme si le
serveur l'avait validé. La spécification MCP l'interdit : un serveur ne doit accepter aucun token
qui ne lui a pas été explicitement émis, et donc vérifie l'audience de chaque token [125]. À
contraster avec [Delegation (OAuth token exchange)](/glossary/delegation-oauth-token-exchange). Voir
[ch. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28).
(ch. 23)

**Liste d'autorisation des outils.** La liste deny-by-default des outils qu'un agent peut appeler,
chaque entrée épinglée par un hash de la définition de l'outil et délimitée par la portée des
ressources, la classe d'opération, le débit, les destinations de sortie, les classes de données et
une règle de point de contrôle, évaluée par la passerelle d'outils à chaque appel. L'OWASP demande
de tels profils de moindre privilège par outil [6]. Voir
[ch. 23, The tool allow-list](/bok/governing-agents#the-tool-allow-list). (ch. 23)

**Empoisonnement d'outil.** Altération d'un outil qu'un agent utilise, via sa définition visible par
le modèle (description, schéma, métadonnées) ou son comportement, de sorte que l'agent agit sur de
fausses prémisses. L'OWASP classe la manipulation de l'interface d'un outil légitime sous ASI02 et
un outil compromis à la source sous ASI04 [6] ; MITRE ATLAS répertorie AI Agent Tool Poisoning
(AML.T0110) [126]. À contraster avec [Prompt injection](/glossary/prompt-injection). Voir
[ch. 23, Admitting an MCP server](/bok/governing-agents#admitting-an-mcp-server). (ch. 23)

**Résumé du contenu d'entraînement.** Le résumé public du contenu utilisé pour entraîner un modèle
d'IA de usage général, requis par l'article 53(1)(d) du Reglamento de IA sur un modèle obligatoire
de la Commission couvrant les sources de données, y compris les domaines les plus raclés, et le
traitement des données [118]. Voir
[ch. 14, The GPAI provider side](/bok/governing-development#the-gpai-provider-side). (ch. 14)

**Données d'entraînement, de validation et de test.** Les trois ensembles de données que le
Reglamento de IA définit pour les systèmes à haut risque : les données d'entraînement ajustent le
modèle, les données de validation l'affinent et le protègent contre le surapprentissage, et les
données de test donnent une vérification indépendante avant la sortie [2]. Les garder séparés, et le
prouver, c'est ce qui arrête la contamination de l'ensemble de test. À contraster avec
[Contamination de l'ensemble de test](/glossary/test-set-contamination). Voir
[ch. 14, Data for training and testing](/bok/governing-development#data-for-training-and-testing).
(ch. 14)

**Trajectoire (agent).** La séquence de plans, d'appels d'outils et d'opérations de mémoire qui ont
conduit un agent à un effet. Les agents sont évalués sur leurs trajectoires ainsi que sur leurs
résultats finaux, car un résultat correct atteint via un outil que l'agent ne devrait jamais avoir
eu est toujours un échec. Voir
[ch. 23, What makes an agent a governance object](/bok/governing-agents#what-makes-an-agent-a-governance-object).
(ch. 14, 23)

**Token de transaction (Txn-Token).** Un token signé de courte durée, spécifié dans un brouillon du
groupe de travail IETF OAuth, qui porte l'identité de l'utilisateur, l'identité de la charge de
travail et le contexte d'autorisation à travers une chaîne d'appels au sein d'un seul domaine de
confiance, de sorte que les services en aval puissent décider sur le contexte protégé [131].
Toujours un brouillon (révision 11, 30 juillet 2026) à partir du 2026-09-24. À contraster avec
[Delegation (OAuth token exchange)](/glossary/delegation-oauth-token-exchange). Voir
[ch. 23, Accountability across hops](/bok/governing-agents#accountability-across-hops). (ch. 23)

**Évaluation d'impact du transfert (TIA).** L'évaluation de l'exportateur de données pour déterminer
si la loi d'un pays tiers permet à l'importateur d'honorer l'outil de transfert, tel que les clauses
contractuelles types, et quelles mesures supplémentaires sont nécessaires [119]. Les points de
terminaison d'inférence à distance et la télémétrie des fournisseurs en dehors de l'EEE peuvent la
déclencher. Voir
[ch. 19, Transfers, remote inference and TIAs](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
(ch. 19)

**Transparence.** Dans le cadre de la NIST, jusqu'à quel point les informations sur un système d'IA
et ses résultats atteignent les personnes qui interagissent avec lui : ce qui s'est passé [30].
Prouvée par les enregistrements de ce qui a fonctionné (registre, fiches de modèle et de système,
journaux) et par les divulgations que la loi exige. À contraster avec
[Explainability](/glossary/explainability) et [Interpretability](/glossary/interpretability). Voir
[ch. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[ch. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (ch. 11, 16)

**IA digne de confiance.** Une bannière utilisée par les cadres d'autres personnes, notamment le
Groupe d'experts de haut niveau de l'UE [81] et la NIST, dont les sept caractéristiques dignes de
confiance la rendent concrète [30]. Ce livre la cite plutôt que de l'adopter : la discipline est
mesurée par la réduction effective du risque et les preuves, non par l'étiquette. À contraster avec
[Ingénierie de la gouvernance de l'IA](/glossary/ai-governance-engineering) et
[Responsible-AI principle set](/glossary/responsible-ai-principle-set). Voir
[ch. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(ch. 01, 22)

**Caractéristiques dignes de confiance (NIST).** Les sept caractéristiques de l'IA digne de
confiance dans le NIST AI RMF : valide et fiable ; sûre ; sécurisée et résiliente ; responsable et
transparente ; explicable et interprétable ; améliorée pour la confidentialité ; équitable avec les
biais nuisibles gérés [30]. Valide et fiable est la base ; responsable et transparente s'étend aux
autres. Voir
[ch. 22, The seven trustworthy characteristics](/bok/principles-and-standards#the-seven-trustworthy-characteristics).
(ch. 22)

## U

**UDAP.** Actes ou pratiques déloyaux ou trompeurs, interdits par la section 5 de la loi FTC et par
les lois des États [120]. La tromperie est une déclaration matérielle susceptible d'induire en
erreur ; la déloyauté est une blessure substantielle, inévitable non compensée par les avantages.
Les réclamations de performance d'IA non étayées en relèvent. Voir
[ch. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states).
(ch. 20)

**Apprentissage non supervisé.** Apprentissage de la structure (grappes, anomalies) à partir de
données sans étiquettes [40]. Sans vérité terrain pour tester, les contrôles reposent sur des tests
de stabilité et un examen humain des segments avant leur utilisation dans les décisions. À
contraster avec [Apprentissage supervisé](/glossary/supervised-learning). Voir
[ch. 11, Par paradigme d'apprentissage](/bok/ai-defined#by-learning-paradigm). (ch. 11)

**Dossier de cas d'usage.** Le dossier d'admission pour un cas d'usage d'IA proposé : contexte
métier, destination et usages exclus, personnes affectées, autorité décisionnaire, métriques de
succès et appétence pour l'erreur, stockés comme champs sur l'entrée du registre pour que la
classification, les seuils, les tests et les analyses d'impact lisent les mêmes faits [30]. Voir
[ch. 14, Le dossier de cas d'usage](/bok/governing-development#the-use-case-record);
[ch. 06, Admission et classification](/bok/the-role#intake-and-classification);
[ch. 05, Motif : Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (ch. 05,
06, 14)

## V

**Épinglage de version.** Fixer, dans l'entrée du registre, les versions exactes du modèle, des
prompts, du corpus de récupération et des guardrails qu'un système déployé utilise, pour que ce qui
a fonctionné soit connu et que tout changement non épinglé, y compris une mise à jour du modèle d'un
fournisseur, soit détecté et traité comme une version. Voir
[ch. 15, La livraison progressive comme contrôle](/bok/governing-deployment#progressive-delivery-as-a-control);
[ch. 05, Motif : Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(ch. 05, 15)

## W

**Filigrane numérique.** Intégration d'un signal dans le contenu généré (image, audio, vidéo ou
texte) qu'un détecteur peut lire ultérieurement pour l'identifier comme généré par l'IA. Le
Règlement de l'IA demande aux fournisseurs de systèmes génératifs un marquage lisible par machine et
détectable [2]; le NIST examine le filigrane numérique aux côtés du suivi de la provenance et de la
détection [53]. Les marques peuvent se dégrader lors de transformations ordinaires, leur survie est
donc testée. À contraster avec [Provenance du contenu (C2PA)](/glossary/content-provenance-c2pa) et
[Divulgation latente](/glossary/latent-disclosure). Voir
[ch. 18, Cas de transparence (Article 50)](/bok/eu-ai-act#transparency-cases-article-50). (ch.
18, 20)

**Infraction généralisée.** Selon l'article 3(61) du Règlement de l'IA, un acte ou une omission
contraire au droit de l'Union protégeant les intérêts des personnes qui cause ou est susceptible de
causer un préjudice aux intérêts collectifs de personnes dans plusieurs États membres. Elle
raccourcit le délai d'incident grave de l'article 73 à deux jours [2]. À contraster avec
[Incident grave](/glossary/serious-incident). Voir
[ch. 17, Incident, aléa, problème et incident grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(ch. 17)

**Identité de charge de travail.** L'identité attribuable qu'une charge de travail telle qu'un agent
porte à chaque étape, sous laquelle ses actions sont enregistrées et son accès est révoqué,
généralement une credential de courte durée et attestée telle qu'une SVID [124]. Elle diffère de
l'authentification de canal, qui sécurise une seule étape, comme un client parlant à un serveur MCP.
À contraster avec [Identité non humaine](/glossary/nhi) et [SVID](/glossary/svid). Voir
[ch. 23, L'authentification de canal n'est pas l'identité d'agent](/bok/governing-agents#channel-authentication-is-not-agent-identity);
[ch. 04, Couche 04 : Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(ch. 03, 04, 05, 23)

## Sources

[1] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI, in force 27 Jul 2026; definitions in Art. 3, incl. 3(1), 3(3) to 3(14), 3(14b), 3(20), 3(22), 3(23), 3(29) to 3(32), 3(49), 3(55) to 3(57), 3(60), 3(61), 3(63), 3(68); Arts. 4, 5, 6 (incl. 6(3) third subparagraph, profiling), 9, 10, 11, 13, 14, 15, 17, 22 to 27 (incl. 26(11)), 40, 41, 43, 47, 48, 50, 53 (incl. 53(1)(c)), 55, 57, 60, 72, 73, 86; Annexes I, III, IV). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; Least-Agency; per-tool least-privilege profiles; tool poisoning of a legitimate tool's interface under ASI02, a tool compromised at the source under ASI04). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (at least 10 to 15% of agentic AI markets by 2030). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[10] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (models above 10^26 FLOP; transparency reports and incident reports by all frontier developers; frameworks by large frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; framework for large frontier developers, critical safety incident reports for every frontier developer; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[20] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage; arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[21] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; non-binding; seven elements of Art. 3(1), inference as the indispensable condition; exclusions). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[22] CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[23] 12 CFR 1002.9 (Regulation B, notifications) (1002.9(b)(2) statement of specific principal reasons for adverse action; Supplement I commentary; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[24] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978) (adverse impact and the "four-fifths rule", with statistical-significance and small-numbers caveats; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[25] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Korea AI Basic Act) (Act No. 20676, in force 2026-01-22; Art. 2 as amended 2026-01-20; Arts. 2(4) high-impact areas, 2(7) AI business operators, 33 confirmation, 34 high-impact duties, 36 domestic representative). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[26] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (agency AI Governance Boards chaired at Deputy Secretary level with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[27] The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence (Domain Taxonomy of 7 domains and 24 subdomains; CC BY 4.0). Slattery, Saeri, Grundy et al., Patterns (Cell Press). 2026. https://doi.org/10.1016/j.patter.2026.101517 (verified: primary)
[28] "Name it to tame it: defining AI incidents and hazards" (summary of the OECD paper "Defining AI incidents and related terms", doi 10.1787/d1a8d965-en). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[29] NIST AI RMF Playbook, GOVERN (per subcategory: About, Suggested Actions, Transparency and Documentation, References; GOVERN 1.7 decommissioning and phasing out safely). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (risk tolerance and residual risk; seven trustworthy characteristics; transparency answers "what happened", explainability "how", interpretability "why"; MAP 1.1 intended purposes; MANAGE 1.1 go/no-go determination; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[31] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.3 enables people adversely affected to challenge an output; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[32] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[33] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed with users' biometric information, to be deleted). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[34] Directive on Automated Decision-Making (algorithmic impact assessment completed and published before production; Appendix B and C impact levels; recourse; modified 2025-06-24). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[35] Directive (EU) 2024/2831 on improving working conditions in platform work (Arts. 7 limits on processing, 9 transparency, 10 human oversight, 11 human review; transposition by 2 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[36] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[37] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020 after a pilot; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[38] Regulation (EU) 2016/679 (General Data Protection Regulation) (Arts. 4(1), 4(5), 4(7), 4(8), 4(12), 4(14), 5, 6, 9, 12(3), 22, 25, 28(2) and 28(4), 30, 33, 35; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[39] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[40] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (referenced by identifier only; autonomy and heteronomy; clause 5.11 machine learning approaches: supervised, unsupervised, semi-supervised, reinforcement). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[41] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories of AI bias: systemic, statistical and computational, and human). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[42] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection rates and impact ratios by sex, race/ethnicity and intersectional categories; public summary; notice before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[43] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[44] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[45] On Calibration of Modern Neural Networks (modern networks poorly calibrated; ICML 2017; arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[46] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (Kleinberg, Mullainathan and Raghavan; three fairness conditions cannot hold together except in special cases; arXiv 1609.05807). arXiv. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[47] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[48] ISO/IEC 42001:2023, AI management systems (referenced by identifier only; requirements for an AI management system; clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[49] Overcoming catastrophic forgetting in neural networks (networks lose earlier competence when trained on new tasks; arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[50] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[51] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation; arXiv 2004.05785). Lu et al.. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[52] Content Credentials: C2PA Technical Specification, version 2.2 (a manifest of assertions, a claim and a claim signature bound to an asset). Coalition for Content Provenance and Authenticity (C2PA). 2025-05. https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html (verified: primary)
[53] NIST AI 100-4, Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency (provenance data tracking, watermarking, metadata recording and synthetic-content detection). NIST. 2024-11-20. https://doi.org/10.6028/NIST.AI.100-4 (verified: primary)
[54] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (Wachter, Mittelstadt and Russell; Harvard Journal of Law & Technology, 2018; arXiv 1711.00399). arXiv. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[55] "Counterfactual Fairness" (Kusner, Loftus, Russell and Silva; arXiv 1703.06856). arXiv. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[56] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[57] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about the entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[58] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[59] "Fairness Through Awareness" (Dwork, Hardt, Pitassi, Reingold and Zemel; individual fairness; limits of statistical parity; arXiv 1104.3913). arXiv. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[60] "Products liability" (design, manufacturing and marketing defects, incl. failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. 2026. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[61] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[62] 42 U.S.C. § 2000e-2 (Title VII: unlawful employment practices; 2000e-2(k) burden of proof in disparate-impact cases, business necessity and less discriminatory alternatives). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[63] Council Directive 2000/43/EC (Racial Equality Directive) (Art. 2(2)(a) direct and 2(2)(b) indirect discrimination, with objective justification). Official Journal of the EU (EUR-Lex). 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[64] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, in force 2026-01-22; Art. 29 domestic-representative thresholds). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[65] Guidelines on obligations for general-purpose AI providers, FAQ (a modifier becomes a provider only when the modification uses more than one third of the original model's training compute; obligations limited to the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[66] "Dual use of artificial-intelligence-powered drug discovery" (an inverted toxicity model proposed about 40,000 candidate toxic molecules in under six hours; Nature Machine Intelligence). Urbina, Lentzos, Invernizzi and Ekins (PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[67] SR 26-2, Revised Guidance on Model Risk Management (issued 17 Apr 2026 by the Federal Reserve, OCC and FDIC; supersedes and replaces SR 11-7 of 4 Apr 2011 and SR 21-8; effective challenge). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[68] "Equality of Opportunity in Supervised Learning" (Hardt, Price and Srebro; equalised odds and equal opportunity; arXiv 1610.02413). arXiv. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[69] Evidence-record schema v1 (evidence-record.v1.json) (AI Governance Engineer templates and schemas library). aigovernanceengineer.com. 2026-09-24. https://aigovernanceengineer.com/schemas/evidence-record.v1.json (verified: primary)
[70] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/17/107 (verified: secondary)
[71] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (Kearns, Neel, Roth and Wu; arXiv 1711.05144). arXiv. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[72] "Communication-Efficient Learning of Deep Networks from Decentralized Data" (McMahan et al.; federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[73] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream; arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[74] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225) (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[75] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[76] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; non-binding; indicative criterion of training compute above 10^23 FLOP with the ability to generate language, images or video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[77] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[78] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[79] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[80] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 Feb 2025; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[81] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; human-in-the-loop, human-on-the-loop and human-in-command oversight). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[82] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data includes data derived or extrapolated from non-health information, incl. by algorithms or machine learning). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[83] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8 internal channels for private entities with 50 or more workers; Art. 9 acknowledgment within seven days and feedback within three months; Art. 19 no retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[84] LLM01:2025 Prompt Injection (OWASP Top 10 for LLM Applications 2025; direct and indirect injection; jailbreaking as a form of prompt injection that makes the model disregard its safety protocols). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[85] JSON Schema Draft 2020-12. JSON Schema. 2022-06-16. https://json-schema.org/draft/2020-12 (verified: primary)
[86] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone; arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[87] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13; operative 2026-08-02; latent disclosures in generated content). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[88] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (three-step legitimate-interest test; anonymity test and evidence). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[89] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (Ribeiro, Singh and Guestrin; LIME; arXiv 1602.04938). arXiv. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[90] "Machine Unlearning" (Bourtoule et al.; SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[91] Commission Delegated Regulation (EU) 2025/301 (Art. 5, time limits for major ICT-related incident reports under DORA; Art. 5(2) late classification). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[92] "Membership Inference Attacks against Machine Learning Models" (Shokri et al.; arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[93] Hierarchy of Controls (elimination, substitution, engineering controls, administrative controls, PPE). CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[94] "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (Fredrikson, Jha and Ristenpart; CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[95] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, serious incident reporting, Measure 9.2; Appendix 1.4 specified systemic risks, incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[96] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data added to sensitive personal information under the CCPA; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[97] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[98] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity; Big Data & Society 3(1)). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[99] Llama 3.1 Community License Agreement (an example of an open-weight licence with an incorporated acceptable-use policy and attribution terms). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[100] Personal Information Protection Law of the People's Republic of China (Arts. 55 and 56 personal information protection impact assessment, records kept three years; official English translation). National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[101] Directive (EU) 2024/2853 on liability for defective products (software as a product; defectiveness incl. the ability to continue to learn; substantial modification; transposition by 9 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[102] "Dissecting racial bias in an algorithm used to manage the health of populations" (Obermeyer, Powers, Vogeli and Mullainathan; Science 366(6464):447-453; cost as a proxy for need). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[103] "Actionable Recourse in Linear Classification" (Ustun, Spangher and Liu; recourse as the ability to change a model's decision by altering actionable inputs; arXiv 1809.06514). arXiv. 2018-09-18. https://arxiv.org/abs/1809.06514 (verified: primary)
[104] "Extracting Training Data from Large Language Models" (Carlini et al.; verbatim training sequences extracted, incl. personal data; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[105] "Training language models to follow instructions with human feedback" (Ouyang et al.; supervised fine-tuning on demonstrations, then reinforcement learning from human feedback on ranked outputs; arXiv 2203.02155). arXiv. 2022-03-04. https://arxiv.org/abs/2203.02155 (verified: primary)
[106] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that redistributions and derivatives must carry). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[107] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[108] Concrete Problems in AI Safety (reward hacking among five practical problems; arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[109] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn; referenced by identifier only). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[110] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[111] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (function-to-clause mapping, incl. risk sources). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[112] IEC 61025:2006, Fault tree analysis (FTA) (edition 2.0). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[113] "A Unified Approach to Interpreting Model Predictions" (Lundberg and Lee; SHAP; arXiv 1705.07874). arXiv. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[114] "System Cards, a new resource for understanding how AI systems work" (documents a whole system of models, AI and non-AI components, where a model card documents one model). Meta AI. 2022-02-23. https://ai.meta.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/ (verified: primary)
[115] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Arts. 3 and 4: text and data mining for research and a general exception subject to a machine-readable reservation). Official Journal of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[116] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[117] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[118] Template for general-purpose AI model providers to summarise their training content (mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[119] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data (version 2.0). European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[120] 15 U.S.C. § 45 (FTC Act section 5) (unfair or deceptive acts or practices; 45(n) standard for unfairness). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[121] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
[122] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; autonomy as a deliberate design decision separate from capability and operational environment; five levels by user role: operator, collaborator, consultant, approver, observer). arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[123] RFC 8693, OAuth 2.0 Token Exchange (impersonation versus delegation semantics; the act (actor) claim; nested act claims record prior actors). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[124] SPIFFE overview (short-lived cryptographic identity documents called SVIDs, as X.509 certificates or JWTs; the Workload API issues and rotates them; SPIRE implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[125] Model Context Protocol, Security Best Practices, version 2026-07-28 (token passthrough defined and explicitly forbidden; servers MUST NOT accept any tokens not explicitly issued for them; audience validation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[126] MITRE ATLAS data, release v2026.09 (AML.T0080 AI Agent Context Poisoning, .000 Memory; AML.T0110 AI Agent Tool Poisoning). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[127] Agent Control Standard (ACS) repository (a wire specification that lets a separate guardian agent permit, deny or modify an agent's action before it happens; the reference guardian's failure posture defaults to proceed, overridable to deny; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project (GitHub). 2026-09-01. https://github.com/GenAI-Security-Project/agent-control-standard (verified: primary)
[128] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01:2026 Prompt Injection, incl. memory persistence; LLM08:2026 Hidden Context Exposure, which replaced System Prompt Leakage: assume hidden context is discoverable, no credentials in it, not a security boundary; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[129] Agent2Agent (A2A) Protocol Specification, v1.0 (v1.0.0 released 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, signed with JWS over JCS-canonicalised JSON; servers authenticate every request; authorisation implementation-specific; scope and revocation of in-task authorisation not defined). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[130] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[131] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group, revision 11 of 30 Jul 2026, WG state "Waiting for Write-Up"; short-lived signed tokens that propagate user identity, workload identity and authorisation context through a call chain within a trusted domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[132] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group, revision 02 of 6 Jul 2026; a URL used as client_id that refers to the client's metadata document). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[133] Threats: Microsoft Threat Modeling Tool (the STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; the tool is a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[134] Threat Modeling Manifesto (threat modelling as analysing representations of a system to highlight concerns about security and privacy characteristics; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-25). https://www.threatmodelingmanifesto.org/ (verified: primary)
[135] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private PKI, self-signed certificates, bare keys, keyless Sigstore). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[136] SLSA specification v1.2, Build track basics (provenance: what built the artefact, by what process and from which top-level inputs; Build L1 provenance exists, L2 hosted build platform, L3 hardened builds). OpenSSF SLSA project. n.d. (accessed 2026-09-25). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[137] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-25). https://huggingface.co/docs/safetensors/index (verified: primary)
[138] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[139] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy, 53% on general-purpose content; competent and reliable evidence required at the time a claim is made). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[140] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; retraining; output filters accepted if shown sufficiently effective and robust, based on general rules rather than lists of people). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[141] Authorization (Cedar Policy Language Reference Guide) (no request is allowed unless a permit policy grants it, so the default decision is Deny; any satisfied forbid overrides every permit). Cedar. n.d. (accessed 2026-09-25). https://docs.cedarpolicy.com/auth/authorization.html (verified: primary)
[142] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; transparency report; critical safety incidents to the Office of Emergency Services within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
