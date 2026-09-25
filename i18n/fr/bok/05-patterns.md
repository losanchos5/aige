---
lang: fr
source: bok/05-patterns.md
sourceHash: "75573567c87d6e935731d6d9eb10dd5b66d986b32073f533a761faaa51306dcb"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 05. Motifs

> Un catalogue de motifs réutilisables d'ingénierie de gouvernance de l'IA, chacun nommé à une
> couche du stack, dans la structure du CSIRO Responsible AI Pattern Catalogue.

Ce chapitre est le catalogue. Chaque motif est une solution réutilisable à un problème qui se
reproduit lorsque vous concevez la gouvernance des systèmes d'IA. La structure suit le CSIRO
Responsible AI Pattern Catalogue, qui applique les motifs de conception de l'ingénierie logicielle à
l'IA responsable dans les domaines de la gouvernance, des processus et des produits [1]. Nous
conservons ses champs (résumé, objectifs, utilisateurs cibles, parties prenantes impactées,
principes pertinents, contexte, problème, solution, conséquences, motifs connexes) et ajoutons une
ligne **Maps to** nommant les normes, articles et couche de stack (1–5) que chaque motif sert.

Chaque motif nomme l'une des cinq couches ([chapitre 04](/bok/the-stack)) de sorte que le catalogue
et le stack restent cohérents, et réalise un ou plusieurs des six principes
([chapitre 03](/bok/values-and-principles)) : *construire le contrôle au point le plus précoce où il
peut bloquer · donner à chaque contrôle des dents · enregistrer et borner chaque acteur avant qu'il
n'agisse · instrumenter la construction pour produire sa propre preuve · commencer à partir d'un
mode de défaillance ou d'un préjudice nommé · rendre le chemin gouverné le chemin le plus facile*.
Chaque ligne **Maps to** tire ses ID de menace du OWASP Top 10 for Agentic Applications 2026 [2] et
ses étiquettes de fonction du NIST AI RMF [3] ; les motifs côté développement nomment également les
IDs OWASP Top 10 for LLM Applications 2026 et MITRE ATLAS, chacun sourcé sur sa propre page. Chaque
motif porte un court exemple étiqueté `(illustrative)` : un croquis plausible et désidentifié, pas
une affirmation sur un système nommé. Les mappages au règlement sur l'IA de l'UE sont illustratifs,
pas une affirmation de conformité, et en date du 2026-09-24 aucune norme harmonisée en vertu du
règlement n'est référencée au Journal officiel [4].

Sur le site web, chaque motif a sa propre page, listée par couche à [/patterns](/patterns), avec le
texte complet, son diagramme et ses propres sources numérotées ; ce chapitre conserve le modèle, la
carte des motifs et, sous le titre de chaque motif, un court résumé qui renvoie au motif complet.
L'édition imprimée porte chaque motif en intégralité dans ce chapitre.

## Le modèle de motif

Chaque page de motif utilise les mêmes champs, dans cet ordre, et se termine par sa propre liste
**Sources**.

| Champ | Ce qu'il répond |
|---|---|
| Résumé | Ce qu'est le motif et quand il s'applique. |
| Objectifs | Le résultat de gouvernance que le motif réalise. |
| Utilisateurs cibles | Qui l'implémente. |
| Parties prenantes affectées | Qui en est affecté. |
| Principes pertinents | Lequel des six principes il réalise. |
| Contexte | La situation dans laquelle le problème surgit. |
| Problème | Les forces en jeu et le mode de défaillance si le motif n'est pas appliqué. |
| Solution | Comment le construire : les artefacts, où ils se situent dans le pipeline, ce qui s'exécute quand. |
| Conséquences | Bénéfices et compromis : coût, latence, faux positifs, maintenance. |
| Motifs connexes | Les motifs dont il dépend ou qu'il alimente. |
| Correspond à | Les normes, articles et couche de stack que le motif sert. |

Un motif n'est pas une politique. Chacun nomme l'artefact qu'un ingénieur livre, le point du cycle
de vie où il s'exécute et la preuve qu'il laisse derrière lui, de sorte que le motif peut échouer
une compilation ou bloquer une action plutôt que de décrire une intention.

## Motif : Policy Card

Exprimez une règle de gouvernance sous la forme d'une carte lisible par machine qui voyage avec le
modèle ou l'agent, au lieu d'une prose qu'un humain doit se souvenir d'appliquer. La même carte est
évaluée avant fusion, au déploiement et au point d'action, et chaque évaluation émet un verdict, de
sorte qu'un changement de règle est un diff examinable et le crosswalk peut être généré à partir des
cartes.

Couche 01 Governance en tant que code · [Lire le motif Policy Card](/patterns/policy-card)

## Motif : Eval Gate in CI

Intégrez une suite d'évaluation versionnée dans CI de sorte qu'un modèle ou un agent doit franchir
un seuil documenté, tracé jusqu'à un mode de défaillance ou une obligation nommée, avant son
déploiement. L'exécution de l'évaluation est le contrôle et son résultat structuré est la preuve ;
une évaluation échouée bloque la compilation au lieu de déposer un constat.

Couche 03 Évaluations et red teaming comme preuves ·
[Lire le motif Eval Gate in CI](/patterns/eval-gate-in-ci)

## Motif : Adversarial Red-Team Suite

Conservez une suite adversariale versionnée, construite à partir d'une taxonomie de menaces plutôt
que de l'intuition, et exécutez-la dans CI ou selon un calendrier par rapport à la version
enregistrée. Chaque constat est corrigé ou accepté au dossier, classé comme preuve et réintégré en
tant que test de régression, de sorte qu'une attaque fermée reste fermée.

Couche 03 Évaluations et red teaming comme preuves ·
[Lire le motif Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite)

## Motif : Agent Registry

Conservez un inventaire conscient du runtime de chaque modèle, service et agent, chaque entrée
portant un propriétaire, une portée et une expiration, écrite par le pipeline de déploiement plutôt
que tapée à la main. L'enregistrement devient une condition préalable à la production, et le
registre est l'objet sur lequel les politiques s'évaluent et auquel les contrôles runtime
s'attachent.

Couche 02 Inventaire et transparence · [Lire le motif Agent Registry](/patterns/agent-registry)

## Motif : AIBOM

Émettez une nomenclature de matériel IA à la compilation, dans un format standard tel que CycloneDX
ML-BOM ou le profil IA SPDX 3.0, enregistrant les modèles, les ensembles de données, les poids et
leur provenance et licences. Stockée avec l'entrée du registre et régénérée à chaque compilation,
elle transforme les questions de chaîne d'approvisionnement et de transparence en requêtes.

Couche 02 Inventaire et transparence · [Lire le motif AIBOM](/patterns/aibom)

## Motif : Model Card as Control Evidence

Remplissez la fiche de modèle et la fiche de données à partir du pipeline (résultats d'évaluation,
les ensembles de données dans l'AIBOM, limitations connues, le propriétaire) et régénérez-les à
chaque changement significatif. Une fiche reconstruite à partir de ce que la production a produit
est à la fois une documentation et une preuve de contrôle ; une fiche écrite une fois au lancement
se dégrade en fiction.

Couche 02 Inventaire et transparence ·
[Lire le motif Model Card as Control Evidence](/patterns/model-card-as-control-evidence)

## Motif : Continuous Assurance Telemetry

Faites en sorte que chaque contrôle écrive un enregistrement de preuve horodaté et structuré dans un
magasin d'assurance unique, sur un schéma unique indexé par l'id du registre. L'état d'un contrôle
devient une requête en direct sur ce que le système a émis, non une attestation qu'il existait quand
quelqu'un a regardé.

Couche 05 Assurance et conformité continue ·
[Lire le motif Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)

## Motif : Runtime Guardrail

Filtrez les entrées et les sorties sur le chemin de la requête en direct avec des garde-fous qui
appliquent la même Policy Card que CI a évaluée, et émettez un événement de décision à chaque appel.
Le garde-fou décide un appel à la fois ; en cas de violation définie, il signale le disjoncteur, qui
retire l'autonomie de l'agent en gros.

Couche 04 Contrôles runtime et observabilité ·
[Lire le motif Runtime Guardrail](/patterns/runtime-guardrail)

## Motif : Kill Switch / Circuit Breaker

Liez chaque agent à sa propre identité et placez un disjoncteur à la limite des appels d'outils qui
se déclenche en cas de violation de seuil, d'anomalie ou d'un tirage manuel. La révocation affecte
la portée d'un seul agent tandis que la flotte continue de fonctionner, et le disjoncteur est testé
selon un calendrier, car un disjoncteur non testé n'est pas un contrôle.

Couche 04 Contrôles runtime et observabilité ·
[Lire le motif Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)

## Motif : Incident Pipeline

Connectez la détection runtime à un flux de triage qui classe la gravité et, en cas d'événement à
signaler, rédige le rapport et démarre l'horloge statutaire. Pour les systèmes à haut risque, il
encode les délais de signalement de l'article 73 du Reglamento de IA et le flux de surveillance
après commercialisation de l'article 72 [5], et il conserve l'enregistrement d'incident comme preuve
lisible par machine.

Couche 05 Assurance et conformité continue ·
[Lire le motif Incident Pipeline](/patterns/incident-pipeline)

## Motif : FRIA-as-Code

Modélisez l'analyse d'impact relative aux droits fondamentaux sous la forme de données structurées,
liez chaque atténuation au contrôle qui l'implémente, et référencez croisée l'AIPD de sorte que les
éléments partagés soient écrits une seule fois. L'évaluation est stockée avec l'entrée du registre
et rouverte quand le système change significativement.

Couche 01 Governance en tant que code / Couche 02 Inventaire et transparence ·
[Lire le motif FRIA-as-Code](/patterns/fria-as-code)

## Motif : Framework Crosswalk

Générez le mappage des contrôles aux clauses du framework à partir des contrôles eux-mêmes, et
utilisez-le pour trouver les lacunes et réutiliser les contrôles. Chaque cellule doit se résoudre en
un contrôle en cours d'exécution et sa preuve : une cellule de mappage sans rien derrière elle est
signalée, non comptée, car la couverture n'est pas un contrôle.

Couche 01 Governance en tant que code / Couche 05 Assurance et conformité continue ·
[Lire le motif Framework Crosswalk](/patterns/framework-crosswalk)

## Motif : Machine-Readable Evidence (OSCAL)

Émettez les résultats de contrôle sous la forme d'artefacts OSCAL de définition de composant et de
résultats d'évaluation, en s'appuyant sur les couches de contrôle, d'implémentation et d'évaluation
natives avant toute extension spécifique à l'IA. La preuve devient interrogeable, diffable et
réutilisable entre les audits, et la capture d'écran cesse d'être un artefact de preuve.

Couche 05 Assurance et conformité continue ·
[Lire le motif Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal)

## Motif : Agent Identity & Scoped Credentials

Émettez à chaque agent une identité de charge de travail distincte avec une portée déclarée, un
propriétaire et une expiration, enregistrée dans le Agent Registry et établie avant qu'il n'agisse.
Sécuriser le canal vers un serveur d'outils est nécessaire mais n'est pas l'identité de l'agent ;
l'identité est ce qui rend ses actions attribuables et son accès révocable.

Couche 04 Contrôles runtime et observabilité ·
[Lire le motif Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)

## Motif : Human-in-the-loop Gate

Classifiez les actions d'un agent par conséquence et maintenez la classe à conséquences élevées
derrière un approbateur humain nommé avec suffisamment de contexte pour décider, tandis que la
classe de routine reste autonome sous les garde-fous. L'approbateur, le contexte et la décision sont
enregistrés comme preuve de supervision au point d'action.

Couche 04 Contrôles runtime et observabilité ·
[Lire le motif Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)

## Motif : Shadow-AI Discovery

Scannez les endroits où l'IA apparaît (fournisseurs d'identité, comptes cloud, sortie réseau,
référentiels de code, intégrations SaaS) pour les modèles et agents qui n'ont pas d'entrée de
registre. Chaque inconnue est enregistrée comme non réclamée et reçoit un propriétaire pour la
réclamer, ou est escaladée, de sorte que l'inventaire converge vers ce qui s'exécute réellement.

Couche 02 Inventaire et transparence ·
[Lire le motif Shadow-AI Discovery](/patterns/shadow-ai-discovery)

## Motif : Vendor / Model Due-Diligence Gate

Portillonnez l'IA achetée et l'IA en API uniquement sur une évaluation de diligence raisonnable
structurée avant qu'elle n'atteigne la production : les évaluations et la documentation du
fournisseur, les flux de données, les portées que vous accordez, les engagements de signalement
d'incidents et les droits d'audit. Là où vous ne pouvez pas vérifier un contrôle, le dossier le dit
et l'intégration est bornée à la place.

Couche 02 Inventaire et transparence / Couche 05 Assurance et conformité continue ·
[Lire le motif Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)

## Motif : Use-Case Intake & Risk Tiering

Acheminez chaque cas d'usage d'IA proposé, construit ou acheté, via une prise unique qui écrit un
enregistrement de cas d'usage structuré, le filtre par rapport aux pratiques interdites et à
l'échelle de risque du Reglamento de IA, et calcule un niveau interne à partir des champs de profil
déclarés. Le niveau active les évaluations, les évaluations et les approbations que le système doit
franchir, et l'enregistrement devient son entrée de registre.

Couche 01 Governance en tant que code / Couche 02 Inventaire et transparence ·
[Lire le motif Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering)

## Motif : AI Threat Model

Modélisez les menaces de chaque système d'IA lors de l'examen de conception en tant que fichier de
données versionnée : STRIDE par élément de flux de données, étendu avec les attaques spécifiques à
l'IA que MITRE ATLAS, NIST AI 100-2 et les listes OWASP cataloguent. Chaque menace au-dessus de la
tolérance se résout en une atténuation et en le test qui le prouve, et l'examen de conception échoue
tant qu'un ne le fait pas.

Couche 01 Governance en tant que code / Couche 03 Évaluations et red teaming comme preuves ·
[Lire le motif AI Threat Model](/patterns/ai-threat-model)

## Motif : Training-Data Rights Ledger

Conservez une ligne de registre par source d'entraînement : canal d'acquisition, licence ou base
juridique, la vérification de réserve de droits avec sa méthode et sa date, et les utilisations
autorisées. Jointe à la lignée, le registre nomme les modèles que chaque source a entraînés, de
sorte qu'un retrait, une demande d'effacement ou un ordre n'atteint que les modèles affectés.

Couche 02 Inventaire et transparence ·
[Lire le motif Training-Data Rights Ledger](/patterns/training-data-rights-ledger)

## Motif : Dataset Admission Gate

Laissez un travail d'entraînement, d'évaluation ou de récupération lire une version d'ensemble de
données uniquement si un enregistrement d'admission signé autorise cet usage, après des
vérifications de droits, de qualité, de représentativité, de biais et d'intégrité. La vérification
est une politique en tant que code au moment de la lecture, de sorte qu'un champ manquant échoue
l'exécution plutôt qu'un examen.

Couche 01 Governance en tant que code / Couche 02 Inventaire et transparence ·
[Lire le motif Dataset Admission Gate](/patterns/dataset-admission-gate)

## Motif : Fairness Eval Suite

Versionnez une suite d'équité avec le modèle : métriques de groupe et intersectionnelles avec
intervalles de confiance, un résultat « données insuffisantes » pour les petites cellules, une
analyse de proxy et un test de retournement contrefactuel, jugés par rapport à une politique fixée
avant l'exécution. Elle fait échouer la compilation si la politique n'est pas respectée et s'exécute
à nouveau sur les décisions en direct.

Couche 03 Evals & Red Teaming as Evidence ·
[Lire le motif Fairness Eval Suite](/patterns/fairness-eval-suite)

## Motif : Explanation Artefact

Écrivez un enregistrement d'explication par décision conséquente au moment de la décision, avec la
version du modèle, la méthode et la ligne de base, les codes de raison tirés des facteurs notés et
l'itinéraire de contestation épinglé. Testez les explications pour la fidélité et répondez à chaque
obligation d'explication à partir du même enregistrement.

Couche 04 Runtime Controls & Observability / Couche 05 Assurance & Continuous Compliance ·
[Lire le motif Explanation Artefact](/patterns/explanation-artefact)

## Motif : Model Artefact Integrity

Signez un manifeste de chaque fichier de modèle à la compilation, joignez la provenance de la
compilation, préférez les formats de sérialisation qui ne peuvent pas exécuter de code et analysez
le reste, et faites vérifier par chaque runtime la signature, les résumés et la provenance par
rapport à l'entrée du registre avant de charger les poids.

Couche 02 Inventory & Transparency / Couche 04 Runtime Controls & Observability ·
[Lire le motif Model Artefact Integrity](/patterns/model-artefact-integrity)

## Motif : Claims Substantiation Gate

Enregistrez chaque affirmation publique sur la précision, l'équité ou la capacité d'un système d'IA
avec l'exécution d'évaluation, la population et la date qui la soutiennent. La publication est
bloquée sans preuves en direct, et chaque version réexécute les évaluations citées et signale toute
affirmation que la nouvelle version ne soutient plus.

Couche 05 Assurance & Continuous Compliance / Couche 03 Evals & Red Teaming as Evidence ·
[Lire le motif Claims Substantiation Gate](/patterns/claims-substantiation-gate)
## Motif : Decision Notice & Contest Path

Lorsqu'un système d'IA prend ou façonne une décision concernant une personne, envoyez un avis généré
à partir de l'enregistrement de décision qui donne les raisons principales et indique comment
contester, et acheminez chaque contestation vers un examinateur ayant l'autorité et les informations
pour modifier le résultat. L'avis, la contestation et le résultat de l'examen sont des
enregistrements, de sorte que le droit de contester est prouvé décision par décision.

Couche 04 Runtime Controls & Observability / Couche 05 Assurance & Continuous Compliance ·
[Lire le motif Decision Notice & Contest Path](/patterns/decision-notice-contest-path)

## Motif : Rights Requests Against Models

Acheminez chaque demande de personne concernée vers chaque endroit où les données de la personne se
trouvent dans un système d'IA, des systèmes sources et des index de récupération aux journaux,
ensembles d'évaluation et, lorsque le modèle n'est pas anonyme, les poids. Chaque emplacement a une
réponse pré-convenue, de la suppression au réentraînement programmé, et la demande se ferme avec un
enregistrement d'exécution qui date l'écart restant.

Couche 02 Inventory & Transparency / Couche 05 Assurance & Continuous Compliance ·
[Lire le motif Rights Requests Against Models](/patterns/rights-requests-against-models)

## Motif : Sanctioned AI Gateway

Placez les outils d'IA approuvés et les API de modèle derrière une authentification unique et une
passerelle qui applique la politique d'utilisation acceptable en tant que code : règles de classe de
données, rédaction ou blocage, un événement de décision par appel et accès conditionnel à une
attestation actuelle. Le chemin autorisé est construit pour être le plus facile, et la découverte
trouve ce qui le contourne.

Couche 04 Runtime Controls & Observability / Couche 02 Inventory & Transparency ·
[Lire le motif Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway)

## Motif : Staged Rollout with Rollback Criteria

Prenez chaque modèle, prompt, corpus ou changement de version de fournisseur en production par les
étapes shadow, pilot et canary, avec des critères de retour enregistrés avant le début de chaque
étape et évalués par le pipeline. Les versions sont épinglées dans le registre et le chemin de
retour est testé avant que quiconque ne dépende de lui.

Couche 04 Runtime Controls & Observability ·
[Lire le motif Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria)

## Motif : Drift & Fairness Monitor

Surveillez un système déployé pour la dérive d'entrée, d'étiquette, de concept, de pipeline, de
modèle de fournisseur et d'utilisation, et pour la qualité et l'équité par groupe. Chaque signal a
un seuil, un propriétaire et une conséquence pré-convenue, d'un problème à un disjoncteur déclenché,
et chaque vérification écrit un enregistrement de preuve.

Couche 04 Runtime Controls & Observability / Couche 05 Assurance & Continuous Compliance ·
[Lire le motif Drift & Fairness Monitor](/patterns/drift-fairness-monitor)

## Motif : Downstream Use Register

Écrivez les utilisations prévues et interdites d'un système sous forme de Policy Card, enregistrez
chaque consommateur de ses résultats par rapport à son entrée de registre avec le nouveau test qui a
autorisé cet usage, et apposez la provenance et les avertissements sur les résultats. L'utilisation
secondaire devient une décision au lieu d'une découverte, et un changement ou un retrait peut
atteindre tous ceux qu'il affecte.

Couche 02 Inventory & Transparency / Couche 01 Govern-as-Code ·
[Lire le motif Downstream Use Register](/patterns/downstream-use-register)

## Motif : Disclosure & Notification Pipeline

Générez les divulgations (avis d'interaction avec l'IA, étiquettes, la page de transparence et la
fiche système, avis aux travailleurs et aux personnes affectées) et les notifications déclenchées
(aux fournisseurs, autorités, clients et au public) à partir du registre et des modèles versionnés,
chacun sur son horloge. Chaque avis envoyé est enregistré avec son audience, la version du modèle et
l'horodatage.

Couche 05 Assurance & Continuous Compliance / Couche 02 Inventory & Transparency ·
[Lire le motif Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline)

## Motif : Deactivation, Localisation & Retirement Runbook

Conservez un runbook entraîné par système pour le dégrader, l'éteindre par juridiction et le retirer
: seuils nommés et déclencheurs légaux, un propriétaire de décision, preuves gelées en premier,
modes gradués en deçà de l'arrêt, commutateurs régionaux et étapes de retrait qui se terminent par
une entrée de registre retirée et aucune copie en cours d'exécution.

Couche 04 Runtime Controls & Observability / Couche 02 Inventory & Transparency ·
[Lire le motif Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook)

## Ce que vous pouvez faire cette semaine

1. **Trouvez votre couche la plus vide.** Listez les contrôles que vous exécutez par couche et
   choisissez le motif qui remplit la couche avec le moins.
2. **Adoptez un motif en entier.** Construisez la Solution d'un motif telle qu'écrite, y compris
   l'enregistrement qu'il émet, avant de l'adapter : un motif sans son artefact est une diapositive.
3. **Commencez par une défaillance que vous avez vue.** Pour votre système à plus haut risque,
   choisissez le motif dont le Problème nomme une défaillance que vous avez déjà eue, pas celui qui
   est le plus facile à construire.
4. **Tracez une ligne Maps to.** Prenez un motif que vous exécutez et vérifiez que chaque article,
   clause et identifiant de menace dans sa ligne Maps to pointe vers un artefact que vous pouvez
   montrer aujourd'hui.
5. **Écrivez le motif qui vous manque.** Si vous exécutez un contrôle qu'aucun motif ne décrit,
   rédigez-le dans le modèle et proposez-le : le catalogue est ouvert aux contributions.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; prEN 18286 entered public enquiry on 30 Oct 2025; page last updated 2026-08-03). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
