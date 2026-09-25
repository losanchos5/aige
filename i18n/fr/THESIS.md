---
lang: fr
source: THESIS.md
sourceHash: "921fc304377c137a926045c38040d78fbec8f056e7944d519b5b34cd7a8a48a8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# La Thèse d'ingénierie de la gouvernance de l'IA

Version 0.5.0 · 2026-09-25 · Jorge García Aibar et Aurélie Pols

---

**L'ingénierie de la gouvernance de l'IA est l'application de la pratique d'ingénierie (pensée systémique, pensée produit et code) à la gouvernance des systèmes d'IA.**
Elle traite la gouvernance non comme un document à signer mais comme un système à construire,
exploiter et mesurer, avec la même rigueur que les ingénieurs appliquent déjà aux modèles et agents
qu'il gouverne.

C'est plus que « gouvernance de l'IA plus quelques scripts ». C'est un changement dans la façon dont
le travail est fait. La gouvernance de l'IA héritée décrit un système d'IA sur papier et espère que
le papier reste vrai. L'ingénierie de la gouvernance signifie que la politique est exécutable, le
contrôle s'exécute dans le pipeline, la preuve est produite comme sous-produit de la construction,
et le tout est jugé par un seul test : la réduction effective du risque a-t-elle réellement eu lieu,
et un régulateur ou un auditeur peut-il lire la preuve ? C'est une capacité, pas un titre de poste.
Quiconque est assez proche de la construction peut la développer. Elle est mesurée par la réduction
effective du risque et par la preuve prête pour l'audit, jamais par le nombre de cadres qui
apparaissent sur une diapositive.

L'idée ne surgit pas de nulle part. Elle hérite d'une ligne de mouvements d'ingénierie qui ont
transformé le processus en systèmes en fonctionnement : l'ingénierie de la fiabilité des sites,
DevSecOps, la politique en tant que code et la sécurité de la chaîne d'approvisionnement logicielle.
Plus directement, elle hérite de l'ingénierie GRC, qui depuis environ 2024 a transformé la
gouvernance, le risque et la conformité en un produit construit avec du code, testé en CI/CD et
expédiant des preuves via des API [1]. La gouvernance de l'IA a maintenant besoin du même changement
radical, car la chose gouvernée (modèles qui se réentraînent, prompts qui changent, agents qui
agissent de leur propre chef) se déplace plus vite que n'importe quel document ne peut suivre.

## Problèmes fondamentaux avec la gouvernance de l'IA héritée

**1. Gouvernance écrite pour des systèmes qui n'existent plus.** La gouvernance de l'IA héritée
s'exécute sur des politiques PDF et des inventaires de feuilles de calcul qui décrivent un système
d'IA tel qu'il était le jour de son examen. Mais les modèles sont réentraînés, les prompts sont
réécrits et les agents acquièrent de nouveaux outils chaque jour. L'artefact est obsolète avant
d'être signé. Ce n'est pas un hasard si la fonction siège encore surtout avec la confidentialité, le
droit et l'informatique et seulement 5 % avec la sécurité [3] : loin du pipeline où le système
change réellement.

**2. Examen ponctuel d'une chose qui change continuellement.** Les évaluations annuelles et les
approbations de comité supposent un système qui reste immobile assez longtemps pour être jugé. Les
modèles frontière et les agents autonomes ne le font pas. Gartner s'attend à ce que plus de 40 % des
projets d'IA agentique soient annulés d'ici la fin de 2027, citant des contrôles de risque
inadéquats parmi les causes [4], et prédit que d'ici 2029 plus de la moitié des attaques réussies
contre les agents d'IA exploiteront les faiblesses du contrôle d'accès et l'injection de prompts [5]
: des modes de défaillance d'exécution qu'un examen une fois par an est structurellement aveugle.

**3. Gouvernance comme porte à la fin, pas comme propriété de la construction.** La gouvernance
arrive après l'entraînement du modèle, comme un point de contrôle à franchir avant le lancement. Les
ingénieurs l'expérimentent comme une taxe collectée à la porte, et rien de ce qu'elle produit n'est
câblé dans la façon dont le système est construit. Une politique qui ne peut que recommander ne peut
pas arrêter une mauvaise version. Une évaluation qui peut échouer la construction le peut. La
gouvernance placée à la fin ne peut que décrire le risque ; la gouvernance intégrée au pipeline peut
le prévenir.

**4. Théâtre des cadres.** La cartographie au NIST AI RMF ou à l'ISO/IEC 42001 devient l'état final
au lieu du point de départ. Une matrice de cartographie verte est confondue avec un contrôle
fonctionnant. Pourtant, à partir du 2026-09-24, aucune norme harmonisée n'est citée au Journal
officiel de l'UE, donc même un certificat ISO 42001 ne confère aucune présomption de conformité au
Reglamento de IA [6]. La couverture n'est pas l'assurance. Une analyse comparative prouve que vous
avez lu le cadre, pas que le contrôle auquel il pointe fonctionne réellement ; une matrice verte sur
un contrôle cassé est « du théâtre avec des étapes supplémentaires » [2].

**5. Aucun chemin de données d'exécution.** Le registre ne sait pas ce qui s'exécute. Gartner
demande aux plates-formes de gouvernance de l'IA « l'application automatisée des politiques à
l'exécution » [11], mais la comparaison d'une catégorie par un fournisseur, publiée par un
concurrent dedans, constate que la plupart « gère le programme (inventaires, évaluations,
cartographies de cadres, flux de travail de preuves) sans aucun chemin de données d'exécution » [7].
Le propre compte d'IBM d'être nommé Leader dans le premier Magic Quadrant de Gartner pour les
plates-formes de gouvernance de l'IA (juin 2026) pointe dans la même direction : il décrit la
visibilité dans les cas d'usage de l'IA et une feuille de route d'inventaire d'actifs d'IA
centralisé, de lignage et d'intégration de cas d'usage (la couche programme), et ne mentionne pas
l'application d'exécution [10]. Donc les trois questions qui définissent la discipline (quel IA
s'exécute, qu'est-il autorisé à faire, quelle preuve le prouve) restent sans réponse, car rien n'est
connecté à la production. Pendant ce temps, l'enquête 2026 d'un fournisseur de sécurité rapporte
qu'environ un sur huit des violations de l'IA impliquaient des systèmes agentiques [8] : exactement
la couche que le registre papier ne peut pas voir.

## Valeurs

Huit affirmations. Chacune énonce ce que nous construisons et, en le nommant, ce que nous évitons.
Elles ne sont pas toutes nouvelles : les valeurs 1, 5 et 7 (gouvernance en tant que code, preuves
lisibles par machine et réduction mesurée du risque) sont héritées de l'ingénierie GRC ; les valeurs
2 et 4 (évaluations qui font échouer la compilation et identité et portée des agents) sont ce que
l'IA nous force à ajouter. Le chapitre 03 développe chacune avec un exemple en pratique et
l'anti-pattern qu'elle rejette.

**1. La gouvernance est du code, pas un document.** Une politique dans un PDF est une déclaration
d'intention qu'un humain doit mémoriser et appliquer ; une politique en tant que code est un
contrôle qui s'exécute, versionnée dans un dépôt et appliquée sans que personne n'ait besoin de s'en
souvenir. Le document décrit la règle ; le code *est* la règle, et seul ce qui s'exécute peut être
mesuré.

**2. Les évaluations font échouer la compilation ; les examens ne font que recommander.** Un examen
produit une recommandation que quelqu'un peut mettre en œuvre, plus tard, ou non. Une évaluation
produit un verdict avec des conséquences : le modèle ou l'agent a réussi ou échoué un test défini,
et un échec bloque la mise en production. Nous préférons les contrôles qui ont du mordant.

**3. Les preuves proviennent de l'exécution, pas d'une attestation ponctuelle.** Une attestation dit
qu'un contrôle était en place quand quelqu'un a regardé. Les preuves d'exécution montrent qu'il
fonctionne en continu, émises par le système au fur et à mesure qu'il s'exécute, car un système d'IA
change entre les examens, et les preuves rassemblées une fois se dégradent immédiatement.

**4. Chaque agent porte sa propre identité et sa propre portée.** Un acteur sur des identifiants
partagés est ingouvernable : vous ne pouvez pas attribuer ses actions, révoquer son accès
précisément, ou limiter ce qu'il peut faire. L'identité est la condition préalable de la
responsabilité ; la portée est la condition préalable du confinement, et les deux sont établies
avant que l'acteur soit autorisé à agir.

**5. Les preuves sont lisibles par machine ou ce ne sont pas des preuves.** Les preuves qu'un humain
doit produire, formater et classer manuellement ne peuvent pas être interrogées, comparées ou
vérifiées rapidement. Les artefacts lisibles par machine (OSCAL, résultats d'évaluation structurés,
journaux signés) transforment l'audit en requête et alimentent l'assurance continue au lieu d'un
classeur unique.

**6. Les outils doivent être inspectables et composables.** Vous ne pouvez pas faire confiance à un
verdict que vous ne pouvez pas tracer. Les outils dont vous pouvez ouvrir le raisonnement et le
chemin des données, achetés ou construits, vous permettent de suivre une décision jusqu'à la règle
qui l'a produite et aux preuves qu'elle a émises, et de les intégrer dans le pipeline que vous
exécutez déjà plutôt que de les exporter vers celui de quelqu'un d'autre.

**7. Le succès se mesure en réduction effective du risque, pas en couverture du cadre.** Mapper
chaque contrôle à un cadre prouve que vous l'avez lu, pas que le risque a diminué. Nous mesurons la
chose elle-même : le taux du mode de défaillance a-t-il baissé, le rayon de blast a-t-il diminué,
l'incident a-t-il été détecté plus tôt ? La couverture est une entrée ; la réduction effective du
risque est le résultat.

**8. La gouvernance est possédée avec l'ingénierie, pas appliquée de l'extérieur.** Une gouvernance
qui se tient à l'écart et accorde ou refuse le passage est un goulot d'étranglement que les
ingénieurs contournent. Possédée conjointement avec l'ingénierie, intégrée au chemin pavé, adoptée
parce que c'est le moyen le plus facile de livrer, elle devient partie de la façon dont les choses
sont faites, pas une réunion que l'un des côtés redoute.

## Principes

Les valeurs disent ce que nous préférons ; ces principes disent ce que nous nous engageons à
*faire*. Ce sont des règles d'action, pas des reformulations des préférences ci-dessus.

**Construisez le contrôle au point le plus précoce où il peut bloquer.** Placez chaque contrôle où
il peut encore arrêter la chose d'aller mal, et pas plus tard : dans le dépôt, la compilation et
l'exécution, pas dans un examen après coup. Le point exécutable le plus précoce est le moins cher et
le plus fort, donc c'est là que nous le plaçons.

**Donnez à chaque contrôle du mordant, ou appelez-le un signal.** Un contrôle doit pouvoir changer
ce qui se passe ensuite : bloquer une fusion, faire échouer un déploiement, révoquer l'accès. Tout
ce qui ne peut qu'informer un comité est un signal, et nous l'étiquettons honnêtement comme tel
plutôt que de le présenter comme un contrôle.

**Enregistrez et limitez chaque acteur avant qu'il n'agisse.** Rien, humain ou non humain, n'est
autorisé à agir tant qu'il n'a pas un propriétaire, une portée déclarée et un moyen d'être arrêté.
L'autonomie n'est accordée que là où elle peut être attribuée, contenue et retirée, jamais par
défaut.

**Instrumentez la compilation pour produire sa propre preuve.** Connectez chaque contrôle pour
émettre son propre enregistrement au fur et à mesure qu'il s'exécute, afin que l'assurance sorte du
système au lieu d'être assemblée manuellement. Si démontrer un contrôle nécessite une capture
d'écran, nous n'avons pas fini de le construire.

**Commencez par un mode de défaillance nommé ou un préjudice nommé.** Concevez chaque contrôle
contre une façon spécifique dont le système échoue (injection de prompt, mauvaise utilisation
d'outil, abus d'identité d'agent, exfiltration de données) ou un préjudice spécifique aux droits
d'une personne. Si nous ne pouvons pas nommer le risque auquel il répond, nous ne le construisons
pas.

**Rendez le chemin gouverné le plus facile.** Livrez la gouvernance sous forme d'outils, de modèles
et de chemins pavés que les ingénieurs adoptent sans demander la permission, et mesurez l'adoption.
Si contourner la gouvernance est plus facile que de l'utiliser, nous corrigeons le produit, pas les
gens.

## Ce que les ingénieurs en gouvernance de l'IA construisent

Pas de présentations. Des artefacts fonctionnels, versionnés dans un dépôt et exécutés en production
:

- **Politique en tant que code** : les règles de gouvernance sous forme de politique exécutable
  (`OPA/Rego`, Cedar, Policy Cards) qui s'évaluent en CI/CD et à l'exécution.
- **Un registre d'agents** : l'inventaire conscient de l'exécution de chaque modèle, service et
  agent, chacun avec un propriétaire, une portée et un statut.
- **AIBOM et fiches de modèle/données** : la nomenclature d'un système d'IA (`CycloneDX ML-BOM`,
  profil `SPDX 3.0 AI`) et la documentation de transparence structurée.
- **Portes d'évaluation en CI** : évaluations adversariales et de capacité (Inspect, promptfoo,
  Garak, Giskard) intégrées au pipeline afin qu'une évaluation échouée bloque la mise en production.
- **Garde-fous d'exécution et interrupteurs d'arrêt** : contrôles d'entrée/sortie, médiation des
  appels d'outils et un moyen testé d'arrêter un agent, au point d'action.
- **Télémétrie d'assurance continue** : traçage et surveillance (`OpenTelemetry`, observabilité des
  agents) qui transforme le comportement en production en signal de contrôle en direct.
- **Preuves lisibles par machine** : `OSCAL` et artefacts structurés et signés qui font de l'audit
  une requête au lieu d'une bousculade.
- **Pipelines d'incidents** : la plomberie pour détecter, trier et signaler les incidents graves à
  l'heure, y compris le signalement de l'article 73 du règlement sur l'IA de l'UE pour les systèmes
  à haut risque.
- **Modèles FRIA et DPIA en tant que code** : les évaluations d'impact sur les droits fondamentaux
  et la protection des données maintenues comme des artefacts versionnés et révisables, pas des
  documents ponctuels.

Ces artefacts correspondent, couche par couche, à la stack d'ingénierie de gouvernance de l'IA à
cinq couches : Gouvernance en tant que code, Inventaire et Transparence, Évaluations et Red Teaming
comme Preuves, Contrôles d'Exécution et Observabilité, et Assurance et Conformité Continue.

Nous reconnaissons l'héritage clairement, car c'est la défense honnête contre « c'est juste du GRC
avec des mots d'IA ». Trois des cinq couches (Gouvernance en tant que code, Inventaire et
Transparence, et Assurance et Conformité Continue, qui portent la politique en tant que code,
l'inventaire des actifs et les preuves lisibles par machine) sont héritées de l'ingénierie GRC et
transposées presque inchangées. Deux sont ce que l'IA nous force à ajouter : les évaluations et le
red-teaming *en tant que contrôles* (couche 03), car la chose gouvernée est un modèle dont le
comportement ne peut être établi que par le test ; et l'identité des agents et le contrôle
d'exécution (couche 04), car un acteur autonome n'a pas d'analogue dans le GRC classique. Le nouveau
travail de la discipline se concentre dans ces deux couches.

## Une discipline, distincte de ses voisines

L'ingénierie de gouvernance de l'IA n'est pas la recherche en sécurité de l'IA, MLOps, la gestion du
risque des modèles, la conformité de l'IA ou le travail juridique, ou l'éthique de l'IA responsable
; c'est l'ingénierie qui transforme tout cela en contrôles fonctionnels et preuves lisibles. C'est
la sœur de l'ère de l'IA de l'ingénierie de sécurité de l'IA, la descendante directe de l'ingénierie
GRC. Un conflit de noms mérite d'être signalé : certains fournisseurs utilisent les mêmes mots, «
ingénierie de gouvernance de l'IA », pour le problème inverse, gouverner les outils d'IA que les
ingénieurs utilisent dans leurs propres flux de travail [9]. C'est de l'ingénierie d'IA gouvernée,
pas la discipline décrite ici. Le chapitre 01 trace chacune de ces lignes en détail.

## Auteurs

**Jorge García Aibar (v0.1–v0.5.0)**, Ingénieur en Gouvernance et Confidentialité de l'IA. LinkedIn
: https://www.linkedin.com/in/jorgara

**Aurélie Pols (v0.1–v0.5.0)**, IA Responsable (UE/Mondiale), Gouvernance de la Confidentialité et
des Données. LinkedIn : https://www.linkedin.com/in/aureliepols

**Co-auteurs recherchés.** Ceci est la version 0.5.0 : un brouillon public, délibérément incomplet.
Il a été lancé par un praticien et il en a besoin de beaucoup. Si vous construisez la gouvernance
pour les systèmes d'IA (politique en tant que code, registres d'agents, portes d'évaluation,
garde-fous d'exécution, assurance continue) et vous pouvez apporter un fait vérifié, un motif qui a
fonctionné, ou un argument plus pointu, vous êtes invité à co-auteur. La discipline est une capacité
que n'importe qui peut développer, et ce texte appartient à tous ceux qui font le travail.

## Signer / s'impliquer

- **Lisez-le** sur https://aigovernanceengineer.com/thesis et le Body of Knowledge sur
  https://aigovernanceengineer.com/bok
- **Signez la Thèse** en ouvrant une demande de tirage qui ajoute votre nom à `bok/CONTRIBUTORS.md`
  (section SIGNATORIES) dans le dépôt, `github.com/losanchos5/aige`.
- **Contribuez un chapitre ou un motif** en suivant `STYLEGUIDE.md` ; chaque affirmation factuelle a
  besoin d'une citation sourcée et vérifiée.
- **Discutez-en** sur LinkedIn avec Jorge García Aibar (https://www.linkedin.com/in/jorgara), en
  nommant la discipline, pas la personne.

## Licence

Cette Thèse est concédée sous licence **CC BY 4.0**. Vous pouvez la partager et l'adapter à
condition de donner le crédit approprié, de lier à la licence et d'indiquer les modifications.
Attribution : Jorge García Aibar et Aurélie Pols.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] AI Governance Profession Report 2025. IAPP (with Credo AI). 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[4] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[5] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027". Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[6] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[7] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; runtime data path critique). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[8] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[9] "AI Governance Engineering" (governing AI used inside engineering workflows). Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
