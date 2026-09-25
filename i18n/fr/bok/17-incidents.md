---
lang: fr
source: bok/17-incidents.md
sourceHash: "76dcf38990c332292ea0247ad2d9be4d335a72f55e2510c48bbeb1b7e5f9218d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 17. Incidents, problèmes et causes profondes

> La gestion des incidents d'IA transforme un signal d'exécution en un événement qui est classifié,
> contenu, signalé sur chaque horloge applicable et expliqué, sa cause étant réintégrée dans les
> contrôles.

Ce chapitre étend deux choses que le livre a déjà. Le motif
[**Incident Pipeline**](/patterns/incident-pipeline) (chapitre 05) connecte la détection à un
rapport avec l'horloge statutaire en marche ; le tableau des horloges de l'article 73 dans la
[carte réglementaire](/bok/regulatory-map#eu-ai-act-post-omnibus) (chapitre 08) indique la durée de
cette horloge. Aucun ne dit ce qui compte comme un incident en dessous du seuil grave, comment
classer la gravité, qui actionne quel levier, comment trouver la cause, ou quoi faire quand un
événement démarre quatre horloges à la fois.

Un contraste d'abord. **La réponse aux incidents de sécurité**, le domaine de la discipline sœur,
gère les compromis : un attaquant, une vulnérabilité, une violation. La gestion des incidents d'IA
hérite de son cycle de vie et de nombreux outils, mais l'ensemble des préjudices est plus large
(discrimination, conseils dangereux, violations de droits, désinformation agissante) et la
défaillance est souvent un comportement plutôt qu'un compromis : un modèle qui dérive, un agent qui
utilise un outil autorisé de manière nuisible. Rien n'a été violé, et les gens ont quand même été
blessés. Le livrable est un événement gouverné avec une piste de preuves, pas seulement un service
restauré.

## Incident, aléa, problème et incident grave

Quatre mots décident si une horloge démarre, alors définissez-les avant toute chose.

Les définitions de l'OCDE sont le point de départ le plus largement partagé. Un **incident d'IA**
est un événement, une circonstance ou une série d'événements où le développement, l'utilisation ou
le dysfonctionnement d'un ou plusieurs systèmes d'IA conduit directement ou indirectement à un
préjudice : blessure ou atteinte à la santé des personnes, perturbation d'une infrastructure
critique, violations des droits humains ou des obligations légales protégeant les droits
fondamentaux, du travail et de la propriété intellectuelle, ou préjudice aux biens, aux communautés
ou à l'environnement. Un **aléa d'IA** est le même type d'événement où le système d'IA *pourrait
plausiblement conduire* à un tel incident [1]. Le document de l'OCDE définit également des termes
gradués (incident grave d'IA, catastrophe d'IA, aléa grave d'IA), et son cadre de signalement commun
utilise cette échelle comme valeurs de son champ de gravité [1][2].

Le Règlement de l'IA de l'UE définit uniquement le haut de l'échelle. Un **incident grave** selon
`Art. 3(49)` est un incident ou un dysfonctionnement d'un système d'IA qui conduit directement ou
indirectement à l'un des quatre résultats suivants : (a) le décès d'une personne ou une atteinte
grave à la santé d'une personne ; (b) une perturbation grave et irréversible de la gestion ou du
fonctionnement d'une infrastructure critique ; (c) la violation d'obligations en vertu du droit de
l'Union destinées à protéger les droits fondamentaux ; ou (d) un préjudice grave aux biens ou à
l'environnement [3]. Un terme défini séparé, **violation généralisée** (`Art. 3(61)`), couvre les
actes contraires au droit de l'Union qui nuisent aux intérêts collectifs des individus dans
plusieurs États membres ; il raccourcit le délai de signalement, comme le montre la section des
horloges [3].

Deux autres termes sont des définitions maison, et le livre les utilise de manière cohérente :

- Un **problème** est un défaut, une déviation ou une faiblesse de contrôle qui n'a pas produit
  d'événement : une évaluation qui a régressé en dessous de son seuil en staging, une alerte de
  dérive, une fiche de modèle qui ne correspond plus à la version déployée, un garde-fou dont le
  taux de faux positifs a doublé. Un problème est suivi jusqu'à sa clôture avec un propriétaire et
  une date d'échéance. En termes ISO/IEC 42001, la plupart des problèmes sont des non-conformités
  traitées en vertu de la clause 10.2 [4].
- Un **quasi-accident** est un aléa qu'un contrôle (ou la chance) a interrompu : le garde-fou a
  bloqué la tentative d'exfiltration, l'examinateur humain a détecté le dosage inventé. Aucun
  préjudice n'a eu lieu, mais le chemin vers le préjudice était réel. Le Code de pratique GPAI
  demande aux fournisseurs de signaler « des données individuelles ou agrégées sur les
  quasi-accidents » liées à un incident grave, ce qui vous dit que les quasi-accidents sont des
  preuves, pas du bruit [5].

| Terme | Préjudice réalisé ? | Démarre une horloge légale ? | Où il se trouve | Exemple |
|---|---|---|---|---|
| **Problème** | Aucun événement | Non | Journal des problèmes (backlog avec propriétaire, date d'échéance) | L'évaluation d'injection chute de 0,98 à 0,93 en staging |
| **Quasi-accident / Aléa d'IA** | Non, mais plausible | Non, mais peut être des données dans un rapport GPAI | Enregistrement d'incident, gravité SEV-4 | Le garde-fou bloque une tentative d'agent d'envoyer des données de commande à une URL externe |
| **Incident d'IA** | Oui | Seulement si le déclencheur d'un régime est satisfait | Enregistrement d'incident, SEV-3 ou supérieur | L'assistant cite une mauvaise politique de remboursement à 40 clients |
| **Incident grave** (`Art. 3(49)`) | Oui, à l'un des quatre seuils légaux | Oui, pour les fournisseurs à haut risque et les fournisseurs GPAI à risque systémique | Enregistrement d'incident, SEV-1 ou SEV-2, avec horloges | La dérive du modèle de crédit produit des refus discriminatoires |

La distinction qui compte le plus dans la pratique est entre *gravité* et *signalabilité*. La
gravité est un jugement sur le préjudice selon votre échelle interne. La signalabilité est un test
séparé, exécuté une fois par régime, par rapport au déclencheur de ce régime. Un incident modéré
peut quand même être notifiable (une petite violation de données personnelles en vertu du RGPD) ; un
incident grave peut tomber en dehors de la portée de chaque régime (un système non à haut risque
sans données personnelles impliquées). Gardez les deux décisions dans des champs séparés, prises par
des personnes nommées, avec des horodatages.

> **En pratique (illustratif)**
> Dans un grand opérateur télécom, le premier changement utile au processus d'incident n'était pas
> un nouvel outil mais un nouveau champ. Les tickets avaient une valeur « priorité » unique que
> l'ingénierie définissait pour l'urgence et que le service juridique lisait comme signalabilité, et
> les deux lectures étaient en désaccord silencieusement. La diviser en `severity` (définie par
> l'ingénieur d'astreinte à partir d'un tableau de préjudices) et un drapeau {`reportable_<regime>`}
> par régime applicable (défini par les propriétaires de la confidentialité et du juridique, chacun
> avec un horodatage et une justification) a rendu chaque décision révisable après coup. Le premier
> examen a trouvé des tickets du trimestre précédent qui auraient dû être évalués pour la
> notification RGPD et ne l'ont jamais été.

## Une échelle de gravité mappée aux horloges

Une échelle de gravité est une politique, alors écrivez-la comme telle. L'échelle ci-dessous a
quatre niveaux d'incident et un niveau pour les problèmes. Elle est illustrative ; ce qui compte est
que chaque niveau nomme un test de préjudice, se mappe aux classes légales qu'il peut déclencher et
porte une réponse par défaut.

| Niveau | Test de préjudice | Classe du Règlement de l'IA qu'il peut déclencher | Valeur de gravité OCDE [2] | Réponse par défaut |
|---|---|---|---|---|
| **SEV-1 Critique** | Décès ; atteinte grave à la santé ; perturbation grave et irréversible d'une infrastructure critique ; violation généralisée | `Art. 73(4)` décès : 10 jours ; `Art. 73(3)` : 2 jours | Incident grave ; catastrophe | Commandant d'incident dans 15 minutes ; contenir d'abord ; juridique et DPO sur le pont |
| **SEV-2 Majeur** | Violation d'obligations de droits fondamentaux ; préjudice grave aux biens ou à l'environnement ; violation grave de données personnelles à haut risque ; violation grave de cybersécurité d'un modèle | `Art. 73(2)` : 15 jours | Incident grave | Même jour ouvrable ; signalabilité évaluée par régime dans les heures |
| **SEV-3 Modéré** | Préjudice réalisé qui est limité, récupérable et en dessous des seuils graves | Aucun en soi ; vérifier RGPD, NIS2, DORA | Incident | Contenir le même jour ; examen après action dans les cinq jours ouvrables |
| **SEV-4 Quasi-accident** | Aucun préjudice ; un chemin plausible vers le préjudice a été interrompu | Aucun ; les motifs de quasi-accident alimentent les rapports GPAI [5] | Aléa ; aléa grave | Examen hebdomadaire ; évaluation de régression ajoutée |
| **Problème** | Défaut ou faiblesse de contrôle sans événement | Aucun | Pas un événement | Journal des problèmes avec propriétaire et date d'échéance |

Trois règles font fonctionner l'échelle sous pression.

1. **Classifiez vers le haut, rétrogradez avec preuves.** Au triage, vous connaissez rarement le
   préjudice complet. Classifiez par rapport à la lecture la plus grave plausible et enregistrez
   pourquoi ; rétrogradez quand les preuves la réduisent. Le Règlement de l'IA soutient cette
   lecture : les délais externes courent à partir de la prise de conscience, et la « probabilité
   raisonnable » d'un lien causal suffit pour demander le rapport [3].
2. **La gravité suit le préjudice, pas la cause.** Un bug trivial qui a causé un décès est SEV-1 ;
   une attaque sophistiquée qu'un garde-fou a arrêtée est SEV-4. L'intérêt technique n'est pas une
   entrée de gravité.
3. **L'échelle est du code.** Les tests de préjudice et les déclencheurs de régime sont évalués par
   un moteur de règles quand un incident s'ouvre, de sorte que la première classification et les
   horloges qu'elle démarre sont reproductibles, versionnées et auditables. Un humain peut passer
   outre ; le passage outre est enregistré avec une raison.

> **Exemple (illustratif)** Une règle de sévérité écrite sous forme de
> [fiche de politique](/patterns/policy-card) se déclenche quand un enregistrement d'incident a
> `harm.type` de `fundamental_rights` et `system.ai_act_class` de `high_risk` : elle définit
> `severity: SEV-2`, ouvre une horloge `ai_act_art73` avec un plafond de 15 jours à partir du
> timestamp `aware_at`, et alerte le propriétaire du système et le service juridique. Le verdict
> lui-même est stocké comme preuve, de sorte qu'un examinateur ultérieur peut voir quelle version de
> la règle a classé l'événement.

Deux réserves sur le mappage. Les classes du règlement sur l'IA s'appliquent uniquement aux systèmes
à haut risque (pour `Art. 73`) et aux modèles d'IA à usage général présentant un risque systémique
(pour `Art. 55`), et les classes d'IA à usage général diffèrent légèrement : le Code de pratique
ajoute une classe de cinq jours pour les violations graves de la cybersécurité, y compris
l'exfiltration des poids du modèle [5]. Et les valeurs de l'OCDE constituent un vocabulaire pour la
communication, non un seuil juridique.

## Le cycle de vie de la réponse

Les orientations de l'IEST en matière de réponse aux incidents ont changé en avril 2025. La révision
3 de SP 800-61 a remplacé la révision de 2012 et son cycle de vie circulaire (préparation ;
détection et analyse ; confinement, éradication et récupération ; activités post-incident) par un
modèle fondé sur les six fonctions du CSF 2.0, arguant que les incidents sont désormais fréquents et
durables, et que les enseignements devraient être partagés dès qu'ils sont identifiés [6]. Les
phases ci-dessous conservent les verbes familiers, car les ingénieurs d'astreinte les utilisent, et
mappent chacune à la fonction CSF que l'IEST utilise désormais.

| Phase | Actions spécifiques à l'IA | Preuve qu'elle laisse en enregistrement | Couche | Fonction CSF 2.0 [6] |
|---|---|---|---|---|
| **Détecter** | Événements de garde-fou, régressions d'évaluation en production, alertes de dérive, plaintes d'utilisateurs, avis des responsables du déploiement ou des fournisseurs, analyses de bases de données d'incidents | Événement de signal avec source, timestamp et id de registre | 04 · 05 | Détecter |
| **Trier** | Sévérité à partir du tableau des préjudices ; signalabilité par régime ; propriétaire et commandant d'incident nommés ; `aware_at` corrigé | Enregistrement d'incident ouvert ; horloges démarrées | 05 | Détecter · Répondre |
| **Confiner** | Interrupteur d'arrêt ou disjoncteur ; révocation de portée ; basculement vers un chemin humain ; retour à la dernière bonne version du modèle ou du prompt ; suspension du responsable du déploiement | Action de confinement avec acteur, heure et portée | 04 | Répondre |
| **Éradiquer** | Corriger la cause : corriger le garde-fou, supprimer les données empoisonnées, révoquer les identifiants, réentraîner ; uniquement après la préservation des preuves | Enregistrement de modification lié à l'incident | 01 · 03 | Répondre |
| **Récupérer** | Réexécuter la porte d'évaluation ; réintroduction progressive ; fenêtre de surveillance renforcée | Résultat de la porte d'évaluation ; fenêtre de surveillance fermée | 03 · 04 | Récupérer |
| **Examen après action** | Examen sans culpabilité ; cause première ; CAPA ; mises à jour du registre des risques et des évaluations | Enregistrement d'examen ; éléments CAPA ; entrées de risque mises à jour | 05 | Identifier (Amélioration) |

La détection nécessite plus de canaux que les signaux d'exécution de la
[couche 04](/bok/the-stack#layer-04-runtime-controls--observability). Le Code de pratique d'IA à
usage général s'attend à ce que les fournisseurs examinent les rapports de police et médias, les
réseaux sociaux, les articles de recherche et les bases de données d'incidents, et facilitent la
communication par les modificateurs en aval, les fournisseurs en aval et les utilisateurs en leur
indiquant les canaux de communication directe, auprès du fournisseur ou du Bureau de l'IA, où ils
sont disponibles [5]. Un responsable du déploiement qui ne surveille que ses propres tableaux de
bord apprendra certains incidents par un journaliste. Le personnel est aussi un canal :
[un canal pour signaler les préoccupations](/bok/governance-program#a-channel-for-raising-concerns)
(chapitre 12) achemine leurs rapports dans le même pipeline, et pour un fournisseur à haut risque,
le plan de surveillance après commercialisation est une source permanente
([surveillance après commercialisation et incidents graves en vertu du règlement sur l'IA](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73),
chapitre 18).

Le confinement est l'endroit où les modèles d'exécution justifient leur existence. Un
[interrupteur d'arrêt](/patterns/kill-switch-circuit-breaker) qui révoque la portée d'un agent sans
casser la flotte, un [garde-fou d'exécution](/patterns/runtime-guardrail) resserré par une poussée
de configuration, et un registre qui connaît la version en direct et la dernière bonne version
transforment « confiner » d'une réunion en une commande. L'IEST AI RMF nomme la capacité :
mécanismes et responsabilités assignées pour « remplacer, désengager ou désactiver » les systèmes
d'IA dont les performances ou les résultats sont incompatibles avec l'utilisation prévue [7].

### Geler avant de corriger

L'instinct après le confinement est de corriger la chose. Pour un système à haut risque, le
règlement sur l'IA dit d'attendre : après signalement d'un incident grave, le fournisseur enquête, y
compris une évaluation des risques et une action corrective, mais ne doit pas mener d'enquête qui
modifierait le système d'une manière susceptible d'affecter l'évaluation ultérieure des causes de
l'incident avant d'informer les autorités compétentes [3]. L'ingénierie lit cela comme une étape de
préservation entre confiner et éradiquer :

- **Faire un instantané du système tel qu'il était.** Version du modèle et hash, prompt système,
  versions de politique et de garde-fou, portées d'outils, instantané d'index de récupération,
  configuration et drapeaux de fonctionnalité, tous indexés par l'id de registre et l'id d'incident.
- **Sceller les traces.** Les journaux `Art. 12` et les traces d'exécution pour la fenêtre
  d'incident, exportés vers un stockage inviolable. Les responsables du déploiement doivent
  conserver les journaux générés automatiquement d'un système à haut risque, dans la mesure où ils
  en ont le contrôle, pendant au moins six mois sauf si une autre loi en dispose autrement [3] ; un
  incident ouvert est une raison de les conserver plus longtemps.
- **Enregistrer qui a touché à quoi.** Chaque action de confinement et de diagnostic est enregistrée
  avec son acteur, de sorte que l'évaluation des causes peut séparer l'incident de la réponse.
- **Corriger sur une branche, pas sur place.** L'éradication s'exécute comme une modification vers
  une nouvelle version ; la version de l'incident reste reproductible.

La rétention dépasse l'incident. Le Code de pratique engage les signataires d'IA à usage général à
conserver la documentation d'incident pendant au moins cinq ans à partir de la documentation ou de
l'incident, selon la date la plus tardive [5]. Les preuves gelées alimentent également le
[dossier de défense](/bok/existing-law#the-defence-file) que le droit de la responsabilité des
produits permet désormais à un tribunal d'ordonner la divulgation (chapitre 20).

## Playbooks, RACI et exercices

Un playbook est la réponse à un mode de défaillance, écrite avant qu'il ne se produise. Gardez-le
assez court pour être lu pendant l'incident et assez spécifique pour agir sans interprétation.

```yaml
# playbook: indirect-prompt-injection (illustrative)
trigger: guardrail rule output.exfil.* fires, or a tool call to an unregistered domain
first_15_minutes:
  - page: on-call engineer, AI governance engineer
  - contain: revoke agent tool scope "http:egress" via kill switch; keep read scopes
  - preserve: snapshot registry entry, prompt, retrieval index; seal traces for the window
decision_rights:
  kill_switch: on-call engineer (no approval needed)
  customer_notice: DPO
  regulator_filing: legal, on DPO or system-owner recommendation
evidence_checklist: [trace_ids, guardrail_events, affected_records, scope_revocation_event]
regimes_to_assess: [gdpr_art33, gdpr_art34, nis2_art23, ai_act_art73]
```

Le bloc des droits de décision est le plus important. Quiconque est d'astreinte doit pouvoir
actionner l'interrupteur d'arrêt sans demander, car un confinement qui attend une commission n'est
pas un confinement. Le dépôt auprès d'un régulateur est l'inverse : il a besoin de propriétaires
nommés avec l'autorité de signer. Un RACI rend les deux explicites (R responsable, A responsable, C
consulté, I informé) :

| Activité | Ingénieur d'astreinte | Ingénieur en gouvernance de l'IA | Propriétaire du système | Responsable de la réponse aux incidents de sécurité | DPO | Juridique | Liaison avec le fournisseur |
|---|---|---|---|---|---|---|---|
| Détecter et ouvrir l'enregistrement | R | C | I | C | I | I | I |
| Définir la sévérité | R | A | C | C | C | I | I |
| Actionner l'interrupteur d'arrêt ou suspendre l'utilisation | R | I | A | C | I | I | I |
| Préserver les preuves | R | A | I | C | I | C | I |
| Décider de la signalabilité par régime | I | C | C | C | R (GDPR) | A | C |
| Déposer le rapport réglementaire | I | C | C | C (NIS2, DORA) | R (GDPR) | A | I |
| Informer le fournisseur (devoir du responsable du déploiement) | I | C | A | I | I | C | R |
| Analyse des causes premières | C | R | A | C | C | I | C |
| Approuver CAPA et fermer | I | R | A | C | C | C | I |

Adaptez les colonnes à votre organisation ; ne supprimez pas les lignes. Chaque ligne est un
artefact que quelqu'un doit produire, et une cellule vide à 2 h du matin est une lacune qu'un
auditeur trouvera plus tard.

**Les exercices sont le contrôle ; le playbook est la revendication.** Le livre traite un
interrupteur d'arrêt non testé comme une revendication, non un contrôle, et le même test s'applique
au playbook. Exécutez des exercices de table sur un calendrier, notez-les et conservez le résultat
comme preuve :

- **Scénarios.** Alternez entre les modes de défaillance ci-dessous : une injection de prompt
  indirecte qui exfiltre des données ; une dérive qui produit des résultats discriminatoires ; un
  fournisseur qui change silencieusement le modèle derrière une API ; une boucle d'agent qui brûle
  le budget et appelle les outils des milliers de fois ; des conseils confiants et erronés sur
  lesquels un utilisateur agit.
- **Mesures.** Temps de classification, temps de confinement, temps d'un projet de rapport pour
  chaque horloge, et si chaque horloge aurait été respectée. Suivez le temps moyen de détection
  (MTTD), de confinement (MTTC) et de récupération (MTTR) sur les incidents réels et les exercices
  séparément.
- **Preuves.** L'exercice produit les mêmes enregistrements qu'un incident réel (enregistrement,
  horloges, projets de rapports, événements de confinement), marqués comme un exercice. Un auditeur
  demandant « pouvez-vous signaler à temps ? » obtient une requête sur les résultats d'exercice, pas
  une promesse.

> **En pratique (illustratif)**
> Un exercice de table trimestriel dans une grande entreprise de télécommunications a rejoué un
> scénario d'injection contre un agent de service client. La première exécution a pris 50 minutes
> pour révoquer la portée de sortie de l'agent, car la seule personne qui connaissait la commande de
> révocation était en congé. La correction était une entrée de runbook d'une ligne et un deuxième
> détenteur nommé ; l'exécution suivante a pris quatre minutes. L'enregistrement d'exercice, avec
> les deux chronométrages, est allé dans le magasin d'assurance comme preuve du contrôle de
> confinement.

## Modes de défaillance spécifiques à l'IA

La plupart des incidents d'IA sont des incidents système, non des incidents de modèle : le modèle
s'est comporté comme les modèles le font, et le système autour (récupération, outils, prompts,
surveillance) a transformé ce comportement en préjudice. Le tableau nomme les modes de défaillance
qui reviennent, le signal qui les détecte généralement et le premier mouvement de confinement.

| Mode de défaillance | À quoi cela ressemble en production | Signal de détection typique | Premier confinement |
|---|---|---|---|
| **Fragilité** | De petits changements d'entrée bénins produisent de grands changements de sortie ; les entrées hors distribution cassent le comportement | Pic de sorties à faible confiance ou incohérentes ; plaintes regroupées sur un nouveau type d'entrée | Acheminer la classe d'entrée affectée vers un repli ou un humain |
| **Manque de robustesse** | Les entrées adversariales ou bruyantes dégradent la précision ou la sécurité | Découverte d'équipe rouge reproduite en production ; changement du taux de coup de garde-fou | Resserrer les filtres d'entrée ; limiter le débit du modèle |
| **Données pauvres ou non représentatives** | Les taux d'erreur diffèrent selon le sous-groupe ; la récupération retourne des documents obsolètes ou incorrects | Métriques de sous-groupe dans la surveillance ; défaillances d'ancrage | Suspendre la classe de décision affectée ; épingler le dernier bon corpus |
| **Dérive** | La distribution d'entrée (dérive de données) ou la relation entrée-résultat (dérive conceptuelle) se déplace après le déploiement | Tests de distribution par rapport à la ligne de base d'évaluation ; métriques de résultat | Augmenter la part d'examen humain ; revenir en arrière ou réentraîner |
| **Injection de prompt** | Les instructions cachées dans l'entrée utilisateur ou dans le contenu récupéré redirigent le système ; l'OWASP la liste en premier (`LLM01:2025`), directe et indirecte [8] | Événements de garde-fou ; appels d'outils en dehors de la tâche ; sortie inhabituelle | Révoquer la portée d'outil que l'injection a utilisée ; mettre en quarantaine le document source |
| **Mauvaise utilisation d'outil** | Un agent utilise un outil autorisé d'une manière involontaire ou nuisible (`ASI02`) [9] | Anomalies de volume ou de paramètres d'appel d'outil par rapport à la portée du registre | Interrupteur d'arrêt sur l'agent ; réduire la portée |
| **Hallucination avec préjudice** | Faits inventés, citations, politiques ou dosages sur lesquels une personne agit | Plaintes ; corrections en aval ; vérifications d'ancrage | Désactiver la classe de réponse ; exiger l'ancrage ou une citation |
| **Défaillances en cascade** | L'erreur d'un agent se propage à travers d'autres (`ASI08`) [9] | Défaillances corrélées entre les agents partageant un outil ou une mémoire | Casser la chaîne au composant partagé |
| **Comportement voyou** | Un agent agit en dehors de sa portée déclarée ou persiste après qu'il devrait s'arrêter (`ASI10`) [9] | Événements d'identité en dehors du périmètre ; activité après expiration | Révoquer l'identité ; vérifier que la révocation a pris effet |

Deux points pratiques en découle. D'abord, un mode de défaillance est une *hypothèse* au triage et
une *conclusion* seulement après l'analyse des causes profondes ; ne laissez pas le premier terme
s'installer. Ensuite, chaque ligne correspond à un test qui aurait pu le détecter plus tôt (un cas
adversarial, une évaluation de sous-groupe, un seuil de dérive), c'est pourquoi l'examen après
action se termine dans la suite d'évaluations, non dans une diapositive. Pour les agents, le
chapitre 23 étend le tableau à
[la taxonomie des incidents d'agents](/bok/governing-agents#an-agent-incident-taxonomy).

## Analyse des causes premières

L'analyse des causes profondes (RCA) répond à « pourquoi cela s'est-il produit, et pourquoi nos
contrôles ne l'ont-ils pas arrêté ? » La deuxième moitié est ce que l'ingénierie de la gouvernance
de l'IA ajoute : un incident est aussi la preuve qu'un contrôle a échoué, était absent, ou n'a
jamais été conçu.

### Qui participe

Menez l'examen comme un petit **comité d'examen des incidents** avec un noyau permanent et des
spécialistes invités :

- un animateur qui ne relève pas hiérarchiquement de personne impliquée ;
- le propriétaire du système, qui est responsable de l'action corrective et préventive ;
- l'ingénieur ML ou données qui connaît le modèle et ses données ;
- l'ingénieur en gouvernance de l'IA, qui maîtrise le lien entre cause et contrôle et obligation ;
- la sécurité, quand un adversaire ou une vulnérabilité est plausible ;
- le DPO et les services juridiques, quand des données personnelles ou des droits sont en jeu ;
- quelqu'un qui représente les personnes affectées (opérations client, expert métier, clinicien),
  pour que le préjudice soit décrit du point de vue du destinataire.

Le comité se réunit pour tout incident SEV-1 et SEV-2 et échantillonne les incidents SEV-3 et les
quasi-accidents. Il décide de quatre choses et enregistre chacune comme une décision : les causes
confirmées, les éléments d'action corrective et préventive et leurs propriétaires, les changements
au registre des risques, et la clôture.

### Techniques

**Les cinq pourquoi.** Demandez pourquoi le préjudice s'est produit, puis pourquoi cela s'est
produit, jusqu'à atteindre une cause que vous pouvez modifier. C'est rapide, mais cela suit une
seule chaîne, tandis que les défaillances de l'IA ont généralement plusieurs causes contributives
(une lacune de données *et* une évaluation manquante *et* une étape de supervision qui a approuvé
sans examen). Cela tend aussi à s'arrêter à « erreur humaine », c'est là où l'analyse devrait
commencer.

**Analyse par arbre de défaillances.** Partez de l'événement supérieur (le préjudice) et
décomposez-le par des portes ET et OU dans les conditions qui devaient tenir pour qu'il se produise
; la norme IEC 61025 standardise la méthode [10]. Elle convient bien aux systèmes d'IA gouvernés,
car les contrôles sont en couches : une sortie nuisible n'a atteint un client que si le modèle l'a
produite ET le guardrail de sortie l'a manquée ET aucun examen humain ne s'est appliqué. L'arbre
montre quelles couches ont échoué ensemble, et quel correctif unique aurait rompu la chaîne.

**Post-mortem sans culpabilité.** L'examen recherche les causes contributives « sans inculper aucun
individu ou équipe », sur la prémisse que les gens ont agi raisonnablement sur ce qu'ils savaient et
que vous pouvez corriger les systèmes et processus mais pas les gens [11]. Définissez à l'avance les
déclencheurs d'un post-mortem obligatoire (tout SEV-1 et SEV-2, tout dépôt réglementaire, tout
déclenchement de kill switch) pour que l'en rédiger soit routinier, non une accusation [11].

### Une taxonomie des causes qui pointe vers les contrôles

Une taxonomie des causes n'est utile que si chaque classe nomme le contrôle qui aurait dû la
détecter. Codifiez chaque cause confirmée par rapport à une ou plusieurs de ces classes :

| Classe de cause | Ce que cela signifie | Contrôle qui aurait dû la détecter | Couche | Motif |
|---|---|---|---|---|
| **Données** | Données d'entraînement ou de récupération de mauvaise qualité, non représentatives, obsolètes ou empoisonnées | Fiche de données, traçabilité, tests de qualité et de biais des données | 02 · 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Limites du modèle** | Fragilité, manque de robustesse, hallucination, limites de capacité | Évaluations de capacité et de robustesse ; red team | 03 | [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) |
| **Dérive** | Dérive des données ou des concepts après déploiement | Surveillance par rapport à la ligne de base d'évaluation ; déclencheurs de réentraînement | 04 · 05 | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) |
| **Lacune de test** | Tests insuffisants ou non représentatifs ; une suite ajustée à son propre seuil | Examen de la couverture de la suite d'évaluations ; maintenance des cas adversariaux | 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Conception ou spécification** | Objectif mal aligné, mauvaise métrique de substitution, conception de prompt ou de flux de travail défectueuse | Examen de conception ; politique en tant que code sur l'utilisation prévue | 01 | [Policy Card](/patterns/policy-card) |
| **Intégration et outillage** | Portée d'outil excessive, médiation manquante, identifiants partagés | Identité délimitée ; médiation des appels d'outils | 04 | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) |
| **Adversarial** | Injection de prompt, jailbreak, compromission de la chaîne d'approvisionnement | Red team ; guardrails d'entrée et de sortie ; AIBOM | 03 · 04 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| **Défaillance de supervision** | Biais d'automatisation ; un examinateur sans contexte, temps ou autorité ; pas de point de contrôle | Supervision conçue avec taux de dépassement mesurés | 04 | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **Gestion des changements** | Changement de modèle, prompt ou configuration non examiné ; mise à jour silencieuse du fournisseur | Versioning du registre ; porte de changement ; conditions de notification du fournisseur | 01 · 02 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| **Utilisation en dehors de la finalité prévue** | Déploiement au-delà de l'utilisation pour laquelle le système a été évalué | [Admission et classification](/patterns/use-case-intake-risk-tiering) ; instructions d'utilisation | 01 · 02 | [Agent Registry](/patterns/agent-registry) |
| **Organisationnelle** | Pas de propriétaire, droits de décision flous, fatigue des alertes, personnel non formé | Modèle opérationnel, RACI, exercices | 05 | [Incident Pipeline](/patterns/incident-pipeline) |

La taxonomie n'est pas seulement un outil d'apprentissage ; les régulateurs la demandent. Le modèle
de rapport de la Commission pour les incidents graves de GPAI comporte un champ de cause profonde
qui demande les sorties du modèle qui ont conduit à l'incident et les facteurs qui les sous-tendent,
y compris les entrées utilisées et tout défaut ou contournement des atténuations des risques
systémiques [12]. Le rapport final de NIS2 demande « le type de menace ou de cause profonde »
susceptible d'avoir déclenché un incident significatif [13]. DORA va plus loin : les incidents
récurrents qui sont individuellement en dessous du seuil majeur comptent comme un incident majeur
quand ils se produisent au moins deux fois dans les six mois avec la même cause apparente et
ensemble répondent aux critères [14]. Un codage des causes incohérent fait donc plus que gâcher vos
statistiques : selon DORA, cela peut masquer un incident à signaler. Le cadre de rapport de l'OCDE
conserve ses propres champs adjacents aux causes (si l'incident est lié aux données d'entraînement,
au modèle d'IA, ou à l'interaction de plusieurs systèmes d'IA) que le même codage peut remplir [2].

> **Exemple (illustratif)** Un arbre de défaillances pour « les refus discriminatoires ont atteint
> les candidats » a trois branches ET : le taux d'erreur du modèle a augmenté pour une tranche d'âge
> (classe de cause : dérive) ; la surveillance a comparé uniquement la précision globale, pas la
> précision du sous-groupe (lacune de test) ; et les examinateurs ont approuvé 99 % des
> recommandations du modèle en moins de dix secondes (défaillance de supervision). Corriger
> n'importe quelle branche aurait rompu la chaîne. Le comité assigne trois éléments d'action
> corrective et préventive, un par branche, et enregistre les trois codes de cause sur l'incident.

## Action corrective et préventive : de l'incident au registre des risques et à la suite d'évaluations

**L'action corrective et préventive** (CAPA) est le résultat de l'examen. L'action corrective
corrige cette instance : correctif, réentraînement, retour en arrière, re-délimitation. L'action
préventive empêche la classe de défaillance de se reproduire n'importe où dans la flotte : un
nouveau cas d'évaluation pour chaque système similaire, un changement de politique, un champ de
registre rendu obligatoire. ISO/IEC 42001 place cela dans la clause 10.2 [4] ; le NIST AI RMF
demande que les incidents et erreurs soient communiqués aux acteurs de l'IA pertinents, y compris
les communautés affectées, et que les processus de suivi et de réponse soient documentés [7]. Pour
les fournisseurs à haut risque, le Reglamento de IA ajoute des bords durs : un fournisseur qui a des
raisons de considérer un système comme non conforme doit immédiatement le mettre en conformité, le
retirer, le désactiver ou le rappeler, et informer les distributeurs et les responsables du
déploiement ; quand il présente un risque, le fournisseur enquête sur les causes avec le responsable
du déploiement déclarant et informe l'autorité de surveillance du marché [3].

Chaque incident fermé devrait laisser cinq artefacts derrière lui :

1. **Une évaluation de régression.** L'incident devient un cas de test qui échoue sur la version de
   l'incident et réussit sur le correctif, câblé dans la
   [porte d'évaluation](/patterns/eval-gate-in-ci) pour que l'échec ne puisse pas être expédié à
   nouveau sans être remarqué.
2. **Un changement du registre des risques.** Soit un nouveau risque, soit un risque existant
   reclassé, avec l'id de l'incident attaché. Le lien fonctionne dans les deux sens :
   l'enregistrement de l'incident énumère les risques qu'il a réalisés, et l'entrée de risque
   énumère les incidents qui l'ont réalisé. La méthode de risque elle-même est le chapitre 13,
   [gestion des risques](/bok/risk-management#incidents-are-realised-risks).
3. **Un changement de contrôle** quand l'arbre de défaillances en a trouvé un : un guardrail
   resserré, une portée plus étroite, un nouveau point de contrôle de supervision.
4. **Une mise à jour du playbook**, si la réponse elle-même a été lente ou peu claire.
5. **Un enregistrement de preuve** que l'action corrective et préventive a été vérifiée : la
   nouvelle évaluation réussit en CI, et la métrique d'exécution est restée à la ligne de base
   pendant une fenêtre définie.

Deux vérifications croisées maintiennent le lien au registre des risques honnête. Un risque noté «
faible probabilité » qui a déjà deux incidents attachés est mal noté. Un incident qui ne correspond
à aucun risque dans le registre est lui-même une conclusion : l'identification des risques l'a
manqué, et cela va aussi sur la liste des actions correctives et préventives.

```json
{
  "capa_id": "CAPA-2026-041",
  "incident_id": "INC-2026-0918-01",
  "type": "preventive",
  "cause_codes": ["adversarial", "integration_and_tooling"],
  "action": "Add indirect-injection cases from quarantined documents to injection-resistance.v5",
  "owner": "team-support-platform",
  "due": "2026-10-02",
  "risk_ids": ["RISK-017"],
  "verification": { "eval_suite": "injection-resistance.v5", "result": "pending" }
}
```

Mesurez la boucle, non la paperasserie : taux de récurrence par classe de cause, éléments d'action
corrective et préventive fermés et vérifiés à temps, la part des incidents qui ont produit une
évaluation de régression, et les tendances MTTD et MTTC. Ce sont des chiffres de réduction effective
du risque ; un compte des post-mortems écrits ne l'est pas.

## Devoirs du responsable du déploiement : informer le fournisseur, suspendre l'utilisation

La plupart des organisations rencontrent les incidents d'IA comme **responsables du déploiement**
d'un système construit par quelqu'un d'autre. Pour les systèmes à haut risque, `Art. 26(5)` définit
trois devoirs [3] :

- **Surveiller** le fonctionnement du système sur la base des instructions d'utilisation et, le cas
  échéant, informer le fournisseur pour sa surveillance après commercialisation.
- **Informer et suspendre.** Quand le responsable du déploiement a des raisons de considérer que
  l'utilisation du système tel qu'indiqué peut présenter un risque au sens de `Art. 79(1)`, il
  informe le fournisseur ou le distributeur et l'autorité de surveillance du marché sans délai indu,
  et suspend l'utilisation.
- **Signaler les incidents graves en amont.** Quand le responsable du déploiement identifie un
  incident grave, il informe immédiatement d'abord le fournisseur, puis l'importateur ou le
  distributeur et l'autorité de surveillance du marché. S'il ne peut pas joindre le fournisseur,
  `Art. 73` s'applique au responsable du déploiement mutatis mutandis : le responsable du
  déploiement hérite de l'horloge de signalement.

Deux exceptions s'appliquent : le devoir ne couvre pas les données opérationnelles sensibles des
responsables du déploiement des forces de l'ordre, et pour les institutions financières le devoir de
surveillance est réputé rempli en se conformant à leurs règles de gouvernance interne selon la loi
sur les services financiers [3]. Ces devoirs s'appliquent avec le reste du régime à haut risque, à
partir du 2 décembre 2027 pour les systèmes de l'annexe III après l'Omnibus numérique (voir
[chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).

Chaque devoir a besoin d'un artefact conçu, et aucun d'eux n'existe par défaut :

| Devoir | Artefact | Où il se trouve |
|---|---|---|
| Surveiller selon les instructions d'utilisation | Crochets de surveillance pour les métriques que les instructions du fournisseur nomment ; seuils en tant que code | Couche 04 |
| Informer le fournisseur | Contact d'incident du fournisseur et canal dans l'entrée du registre ; conditions de notification contractuelle testées dans les exercices | Couche 02 |
| Suspendre l'utilisation | Un chemin de suspension testé pour un système acheté : drapeau de fonctionnalité, basculement du trafic vers un chemin humain ou hérité | Couche 04 |
| Incident grave : le fournisseur en premier | L'enregistrement d'incident du déployeur exporte le rapport orienté vers le fournisseur ; horodatages de chaque notification | Couche 05 |
| Fournisseur injoignable | Horloge de secours : les mêmes minuteurs `Art. 73` démarrent sur l'enregistrement propre du déployeur | Couche 05 |
| Preuves pour l'enquête du fournisseur | Journaux conservés par le déployeur conservés au moins six mois, plus longtemps tant qu'un incident est ouvert [3] | Couches 04 · 05 |

La suspension est un kill switch pour un système que vous ne possédez pas. Vous ne pouvez pas
révoquer les poids d'un fournisseur, mais vous pouvez arrêter de lui envoyer du trafic ; testez que
vous pouvez le faire, et combien de temps cela prend, avant d'en avoir besoin. Le
[Incident Pipeline](/patterns/incident-pipeline#the-deployer-side-inform-the-provider-suspend-use)
construit le côté déployeur. Le
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) est l'endroit où les
conditions de notification bidirectionnelle appartiennent : le fournisseur vous informe des
incidents et des actions correctives qui affectent votre déploiement, et vous disposez d'un canal
nommé pour informer le fournisseur. La même logique s'applique plus haut dans la chaîne pour les
GPAI : le Code de pratique demande aux fournisseurs de modèles d'informer les fournisseurs en aval,
les modificateurs et les utilisateurs sur la façon de signaler les incidents graves, directement ou
au Bureau de l'IA [5]. La gouvernance du déploiement dans son ensemble est le chapitre 15,
[governing deployment](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance), dont le
[plan de communications externes](/bok/governing-deployment#external-communications) porte les
[avis](/patterns/disclosure-notification-pipeline) aux utilisateurs, aux personnes affectées et aux
autorités.

## Les horloges qui se chevauchent

Un événement peut démarrer plusieurs horloges. Une injection de prompt indirecte qui fuit les
données client d'un système à haut risque géré par une banque peut, à la fois, être un incident
grave en vertu du Reglamento de IA, une violation de données à caractère personnel en vertu du RGPD
et un incident majeur lié aux TIC en vertu de DORA ; dans une entité essentielle non financière, la
même fuite pourrait être un incident important en vertu de la directive SRI 2. Chaque régime a son
propre déclencheur, destinataire, délai et contenu. Le tableau les met côte à côte, au 2026-09-24.

| Régime | Qui notifie | Déclencheur | Premier rapport | Suivi et final | À qui |
|---|---|---|---|---|---|
| Reglamento de IA de la UE `Art. 73` [3] | Fournisseur d'un système à haut risque ; le déployeur si le fournisseur ne peut pas être joint | Incident grave (`Art. 3(49)`) | Immédiatement dès qu'un lien causal ou sa probabilité raisonnable est établi ; au plus tard 2 jours (infraction généralisée ou infrastructure critique), 10 jours (décès) ou 15 jours (autre) à partir de la prise de connaissance ; un rapport initial incomplet est autorisé | Enquête, évaluation des risques et action corrective ; pas de modification du système avant d'informer les autorités | Autorité de surveillance du marché où cela s'est produit ; le Bureau de l'IA pour les systèmes relevant de sa compétence [15] |
| Reglamento de IA de la UE `Art. 26(5)` [3] | Déployeur d'un système à haut risque | Incident grave ; ou raison de considérer que le système présente un risque | Incident grave : immédiatement, fournisseur en premier ; risque : sans délai indu, plus suspension | Coopération avec l'enquête du fournisseur | Fournisseur, puis importateur ou distributeur, et l'autorité de surveillance du marché |
| Reglamento de IA de la UE `Art. 55(1)(c)` avec Code de pratique Engagement 9 [5][16] | Fournisseur d'un modèle GPAI présentant un risque systémique | Incident grave impliquant le modèle | Sans délai indu ; selon le Code : 2 jours (infrastructure critique), 5 jours (violation grave de la cybersécurité), 10 jours (décès), 15 jours (santé, droits, propriété, environnement) | Rapport intermédiaire au moins toutes les quatre semaines tant que non résolu ; rapport final dans les 60 jours suivant la résolution | Bureau de l'IA et, le cas échéant, autorités nationales |
| GDPR `Art. 33` [17] | Responsable du traitement (le sous-traitant notifie le responsable du traitement sans délai indu) | Violation de données à caractère personnel, sauf si peu probable de résulter en un risque | Sans délai indu et, si possible, dans les 72 heures suivant la prise de connaissance ; raisons requises si plus tard | Les informations peuvent être fournies par phases ; chaque violation documentée | Autorité de contrôle |
| GDPR `Art. 34` [17] | Responsable du traitement | Violation susceptible de résulter en un risque élevé | Sans délai indu | Aucun défini | Personnes concernées affectées |
| NIS2 `Art. 23` [13] | Entités essentielles et importantes | Incident important | Alerte précoce dans les 24 heures ; notification d'incident dans les 72 heures | Rapport intermédiaire sur demande ; rapport final dans un mois suivant la notification | CSIRT ou autorité compétente |
| DORA `Art. 19` avec RTS 2025/301 [18][19] | Entités financières | Incident majeur lié aux TIC | Dans les 4 heures suivant la classification comme majeure, et au plus tard 24 heures à partir de la prise de connaissance ; si classée comme majeure seulement après ces 24 heures, dans les 4 heures suivant cette classification | Intermédiaire dans les 72 heures suivant la notification initiale ; final dans un mois suivant le dernier rapport intermédiaire | Autorité compétente financière |
| Cyber Resilience Act `Art. 14` [20] | Fabricants de produits contenant des éléments numériques | Vulnérabilité activement exploitée ; incident grave affectant la sécurité du produit | Alerte précoce dans les 24 heures ; notification dans les 72 heures | Rapport final 14 jours après qu'un correctif soit disponible (vulnérabilité) ou un mois après notification (incident) | CSIRT coordinateur et ENISA, via la plateforme de signalement unique |
| California SB 53 [21] | Développeurs de frontière (tous, pas seulement les grands développeurs de frontière) | Incident critique de sécurité | Dans les 15 jours suivant la découverte ; dans les 24 heures s'il existe un risque imminent de décès ou de blessure physique grave | Aucun défini ici | Bureau des services d'urgence ; pour un risque imminent, une autorité appropriée |
| New York RAISE Act [22][23] | Développeurs de frontière (modèles entraînés au-dessus de 10^26 opérations ; tous, pas seulement les grands développeurs de frontière) | Incident critique de sécurité | Dans les 72 heures suivant une détermination ou l'apprentissage de faits qui soutiennent une croyance raisonnable ; dans les 24 heures s'il existe un risque imminent de décès ou de blessure physique grave ; en vigueur le 1er janvier 2027 | Aucun défini ici | Bureau de surveillance au sein du Département des services financiers ; pour un risque imminent, une agence d'application de la loi ou de sécurité publique ayant compétence |
| Cadre de signalement commun de l'OCDE [2] | Volontaire | Incident ou danger lié à l'IA | Pas d'horloge | 29 critères sur huit dimensions | Pas une obligation de dépôt ; un schéma partagé |

### Lecture du tableau

**Les déclencheurs ne sont pas le même événement.** Le RGPD, la directive SRI 2, le CRA et `Art. 73`
comptent à partir de la *prise de connaissance*. L'horloge de quatre heures de DORA compte à partir
de la *classification* comme majeure, avec une limite extérieure de 24 heures à partir de la prise
de connaissance ; une classification effectuée après ces 24 heures démarre sa propre horloge de
quatre heures (`Art. 5(2)` de RTS 2025/301) [19]. `Art. 73` demande également le rapport
*immédiatement* une fois qu'un lien causal, ou sa probabilité raisonnable, est établi, les comptages
de jours servant de limites extérieures [3]. RAISE compte à partir d'une *détermination* ou d'une
*croyance raisonnable* [23]. Un enregistrement d'incident a donc besoin d'un horodatage par
déclencheur, pas un seul « ouvert à » : premier signal, décision de prise de connaissance,
classification par régime, lien causal établi, et chaque soumission.

**Certains régimes se défèrent les uns aux autres.** La directive SRI 2 s'écarte là où un acte de
l'Union spécifique à un secteur impose au moins une notification d'incident équivalente, ce qui est
la façon dont DORA remplace la déclaration de la directive SRI 2 pour les entités financières [13].
Le Reglamento de IA se rétrécit de manière similaire : pour les systèmes de l'annexe III dont les
fournisseurs sont déjà soumis à des obligations de signalement équivalentes de l'Union, et pour l'IA
dans les dispositifs médicaux, `Art. 73` la déclaration est limitée aux violations des droits
fondamentaux (`Art. 3(49)(c)`) [3]. Selon un résumé d'un cabinet juridique des orientations du
projet de la Commission, le projet s'applique à des secteurs tels que l'infrastructure critique de
la directive SRI 2 [24]. Les régimes qui comptent comme « équivalents » pour un système donné est un
appel juridique ; enregistrez-le par système dans le registre, pas par incident sous pression.

**Les dates bougent.** Quatre points à revérifier avant de vous fier au tableau, tous au 2026-09-24
:

- Le régime à haut risque s'applique aux systèmes de l'annexe III à partir du 2 décembre 2027 et aux
  systèmes de l'annexe I à partir du 2 août 2028, après que l'Omnibus numérique a reporté le
  chapitre III, sections 1 à 3 (`Art. 113(c)`) [34]. `Art. 73` se trouve au chapitre IX et n'a pas
  lui-même été reporté, mais il n'atteint un système qu'une fois que {`Art. 6`} le classe comme à
  haut risque, donc en pratique il suit les mêmes dates (vérifiez auprès de votre conseil) ; les
  obligations GPAI dans {`Art. 55`} s'appliquent déjà (voir
  [chapitre 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- L'Omnibus a laissé les délais de {`Art. 73`} inchangés mais a ajouté {`Art. 75(1a)`} : les
  fournisseurs de systèmes à haut risque relevant de la compétence exclusive du Bureau de l'IA
  (largement, les systèmes construits sur le propre modèle GPAI du fournisseur et les systèmes dans
  les très grandes plateformes en ligne ou moteurs de recherche) signalent les incidents graves au
  Bureau de l'IA {[15][25]}.
- La Commission a publié les orientations du projet {`Art. 73`} et un modèle de signalement le 26
  septembre 2025, alignés sur le moniteur d'incidents et le cadre de signalement commun de l'OCDE
  {[26]}. Si les orientations finales ont depuis été adoptées n'est pas confirmé ici (vérifiez).
- Une proposition d'Omnibus numérique distincte (COM(2025) 837) changerait la notification de
  violation du RGPD et ajouterait un point d'entrée unique pour les rapports d'incident. Elle est
  tabled, non adoptée : au 1er août 2026 selon la mise à jour du Parlement, les amendements étaient
  en discussion et le mandat du Conseil était bloqué {[27]}. Les commentateurs signalent un délai
  RGPD plus long limité aux violations à haut risque (vérifiez). La règle des 72 heures tient ; le
  chapitre 19 couvre les
  [violations de confidentialité spécifiques à l'IA et l'horloge de 72 heures](/bok/privacy-and-ai#ai-specific-privacy-breaches).
- En dehors de l'UE, les horloges diffèrent à nouveau : le chapitre 21 expose les
  [horloges d'incident entre régimes](/bok/ai-laws-worldwide#incident-clocks-across-regimes).

### Un enregistrement, plusieurs rapports

La réponse d'ingénierie aux horloges qui se chevauchent n'est pas un meilleur calendrier. C'est un
enregistrement d'incident qui tient les faits une fois, et un générateur par régime qui rend le
rapport que ce régime veut, chacun avec sa propre minuterie. Les horloges vivent dans
l'enregistrement, et le pipeline alerte sur le délai le plus proche :

```json
{
  "incident_id": "INC-2026-0918-01",
  "clocks": [
    { "regime": "gdpr_art33", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "due_at": "2026-09-21T15:02:00Z", "status": "submitted",
      "submitted_at": "2026-09-20T10:40:00Z" },
    { "regime": "nis2_art23", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "status": "not_applicable",
      "rationale": "not significant under Art. 23(3); signed off by security IR lead" },
    { "regime": "ai_act_art73", "status": "not_applicable",
      "rationale": "csa-01 is not a high-risk system (registry class: limited risk)" }
  ]
}
```

Une décision « non applicable » est aussi une preuve. Écrivez-la avec sa justification et son
propriétaire ; la question qu'une autorité pose un an plus tard est généralement « pourquoi
n'avez-vous pas signalé ? », et la réponse devrait être un enregistrement, pas un souvenir.

> **En pratique (illustratif)**
> En rejouant un scénario réaliste sur {`csa-01`}, l'assistant du service client du
> [chapitre 04](/bok/the-stack#one-system-through-the-five-layers) : une note de commande portant
> des instructions cachées a fait inclure à l'assistant l'adresse de livraison d'un autre client
> dans une réponse. Le guardrail a enregistré mais n'a pas bloqué la sortie. Le triage a défini
> SEV-2 (données personnelles divulguées à un tiers) et a exécuté les régimes. RGPD {`Art. 33`} :
> notifiable, horloge de 72 heures à partir de la décision de prise de connaissance du DPO. RGPD
> {`Art. 34`} : pas à haut risque pour le client affecté sur les faits, décision enregistrée.
> Directive SRI 2 : les fournisseurs de services de télécommunications sont dans le champ
> d'application en tant qu'infrastructure numérique {[13]}, mais une divulgation d'un seul
> enregistrement n'était pas importante, détermination enregistrée. Reglamento de IA {`Art. 73`} :
> pas un système à haut risque, donc pas d'horloge ; l'incident a quand même été transmis au
> fournisseur du modèle via son canal de signalement en aval. La notification RGPD a été envoyée en
> 44 heures, générée à partir du même enregistrement que l'examen des causes profondes a utilisé
> plus tard.

## L'enregistrement d'incident

Concevez le registre une seule fois, autour de ce que les destinataires les plus exigeants
demandent, et tout autre rapport en devient une projection. La page des modèles contient les
[champs du registre d'incident](/resources/templates#schema-incident-record) sous forme de JSON
Schema avec un exemple rempli. Deux schémas publics fixent le niveau. Le modèle de la Commission
pour les incidents graves de GPAI demande dix éléments : dates de début et de fin, le préjudice
résultant et les victimes ou le groupe affecté, la chaîne des événements, le modèle impliqué, les
preuves disponibles, la réponse du fournisseur, sa recommandation aux autorités, une analyse des
causes profondes, les motifs de la surveillance après commercialisation incluant les
quasi-incidents, et les informations du déclarant [12]. Le cadre commun de signalement de l'OCDE
définit 29 critères dans huit dimensions (métadonnées, détails du préjudice, personnes et planète,
contexte économique, données et entrée, modèle d'IA, tâche et résultat, autres informations) [2].

| Groupe de champs | Champs du registre | Modèle GPAI de la Commission [12] | Cadre de signalement de l'OCDE [2] | Rempli à partir de |
|---|---|---|---|---|
| Identité | `incident_id`, titre, description, systèmes et versions, identifiants du registre, organisations qui ont développé et déployé | Modèle impliqué ; déclarant | Titre ; description ; nom et version ; organisations ; déclarant | Registre (couche 02) |
| Temps | `first_signal_at`, `aware_at`, `started_at`, `ended_at`, déclencheur par régime et heures de soumission | Dates de début et de fin | Date de la première occurrence connue | Traces ; pipeline |
| Préjudice | Gravité, type de préjudice, quantification, groupes affectés, pays, impact sur les droits | Préjudice résultant et victimes | Gravité ; type de préjudice ; quantification ; parties prenantes affectées ; impacts sur les droits humains ; pays | Triage ; DPO ; juridique |
| Contexte | Secteur, fonction commerciale, lien avec les infrastructures critiques, ampleur du déploiement, tâche, niveau d'autonomie | Chaîne des événements | Secteur ; fonction commerciale ; infrastructure critique ; ampleur du déploiement ; tâche ; niveau d'autonomie | Registre ; registre d'admission |
| Cause | Hypothèse de mode de défaillance, codes de cause confirmés, lien aux données d'entraînement, modèle ou interaction multi-système, mauvaise utilisation | Analyse des causes profondes ; motifs de surveillance après commercialisation et quasi-incidents | Lien aux données d'entraînement ; lien au modèle ; interaction multi-système ; utilisation involontaire ou indue | Comité d'examen |
| Preuve | Identifiants de trace, instantanés, événements de garde-fou, matériel de soutien | Preuves disponibles | Matériels de soutien ; étapes pour reproduire | Couches 04 · 05 |
| Réponse | Actions de confinement, actions correctives, identifiants CAPA, recommandation aux autorités | Réponse ; recommandation | Actions entreprises | Responsable d'incident ; CAPA |
| Horloges | Une entrée par régime : applicabilité, justification, propriétaire, échéance, soumis | Pas dans le modèle | Pas dans le cadre | Pipeline |
| Liens | Identifiants de risque, identifiants d'évaluation ajoutés, playbook utilisé | Pas dans le modèle | Pas dans le cadre | Registre des risques ; suite d'évaluation |

Stockez le registre sous forme de données structurées dans le magasin d'assurance, et émettez ses
parties pertinentes pour le contrôle en tant que preuves lisibles par machine : les éléments CAPA
correspondent naturellement à un plan d'action et de jalons `OSCAL` (`POA&M`), l'emplacement natif
du modèle pour les conclusions ouvertes et leur correction [28]. C'est le motif
[Machine-Readable Evidence](/patterns/machine-readable-evidence-oscal) appliqué aux incidents, et il
permet à un auditeur de demander « tous les incidents SEV-2 au Q3 avec CAPA ouvert » au lieu de
demander une feuille de calcul.

## Apprendre des bases de données d'incidents publiques

Votre propre historique d'incidents est petit et biaisé vers ce que vous détectez déjà. Les
référentiels publics l'élargissent, à condition que vous sachiez ce qu'ils sont. Ce site conserve
deux points de départ organisés : les [cas d'incidents rédigés sous forme de post-mortems](/cases)
et l'[atlas des préjudices](/resources/harms), qui mappe les préjudices par niveau au contrôle qui
capture chacun.

- **AI Incident Database (AIID).** Gérée par le Responsible AI Collaborative, elle indexe les
  préjudices et quasi-préjudices de l'IA déployée, à la manière des bases de données d'incidents de
  l'aviation et de la sécurité informatique. Elle classe les incidents avec plusieurs taxonomies (la
  taxonomie des préjudices de l'IA du CSET, une taxonomie Objectifs, Méthodes et Défaillances, et
  celle du MIT AI Risk Repository) et offre des instantanés complets de la base de données en
  téléchargement [29].
- **OECD AI Incidents and Hazards Monitor (AIM).** Un moniteur automatisé des incidents et risques
  d'IA signalés dans les médias d'information, qui maintient les incidents et les risques séparés
  comme le font les définitions de l'OCDE [30].
- **AIAAIC Repository.** Un registre indépendant des incidents et controverses impliquant l'IA, les
  algorithmes et l'automatisation, dans tous les secteurs de la reconnaissance faciale à l'embauche
  automatisée [31].
- **MIT AI Risk Repository.** Pas une base de données d'incidents mais un catalogue structuré des
  risques d'IA avec des taxonomies causales et de domaine, utile pour vérifier que votre taxonomie
  des causes et votre registre des risques n'ont pas de points aveugles [32].

Utilisez-les de quatre façons. **Alimentez le registre des risques** : extrayez les incidents
enregistrés pour les déploiements comme le vôtre et vérifiez que chacun a un risque correspondant.
**Écrivez l'évaluation avant l'incident** : transformez un incident public en cas de test contre
votre système, alimentant la [suite de red-team](/patterns/adversarial-red-team-suite) aux côtés du
catalogue de techniques MITRE ATLAS [33]. **Calibrez l'échelle de gravité** : vérifiez que les
incidents réels se situent où vos tests de préjudice disent qu'ils devraient être.
**Alimentez la surveillance GPAI** : le Code de pratique énumère les bases de données d'incidents
parmi les sources que les fournisseurs doivent examiner [5].

Connaissez les limites. Les collections d'origine médiatique surreprésentent ce qui fait la une, ce
qui est orienté vers le consommateur et ce qui est anglophone ; un événement peut apparaître
plusieurs fois ; et aucun d'eux ne donne les taux de base. Utilisez-les pour trouver des modes de
défaillance que vous n'aviez pas imaginés, pas pour estimer la fréquence de survenance du vôtre. La
liste de lecture conserve les liens actuels sous
[bases de données d'incidents et de risques](/bok/reading-list#incident-and-risk-repositories-the-empirical-record).

## Ce que vous pouvez faire cette semaine

1. **Écrivez l'échelle de gravité comme politique.** Cinq niveaux, un test de préjudice par niveau,
   les déclencheurs de régime par niveau ; exécutez vos trois derniers incidents à travers et
   corrigez les règles jusqu'à ce que les résultats correspondent à ce que vous décideriez à la
   main.
2. **Ajoutez les horodatages.** Donnez à chaque ticket d'incident `aware_at`, un drapeau
   d'applicabilité par régime avec propriétaire et justification, et un délai par horloge.
   Remplissez les incidents ouverts.
3. **Exécutez un exercice de simulation.** Injection de prompt indirecte contre votre assistant le
   plus connecté : tirez le kill switch, préservez les preuves, rédigez la notification RGPD.
   Enregistrez les heures.
4. **Testez le chemin de suspension pour un système procuré.** Confirmez que le contact d'incident
   du fournisseur est dans l'entrée du registre et que vous pouvez arrêter le trafic vers le
   système, et mesurez le temps que cela prend.
5. **Codez trois événements passés.** Attribuez des classes de cause de la taxonomie à vos trois
   derniers incidents ou quasi-incidents, et ajoutez une évaluation de régression pour chacun.

**Correspondances :** Règlement de l'IA Art. 3(49), 20, 26(5)–(6), 55(1)(c), 72, 73, 75(1a) · Code
de pratique GPAI, Engagement en matière de sécurité et de sûreté 9 · RGPD Art. 33–34 · SRI2 Art. 23
· DORA Art. 19 · Règlement de cyberrésilience Art. 14 · ISO/IEC 42001 (clause 10.2, Annexe A.8) ·
NIST AI RMF (Manage 2.4, 4.1, 4.3) · NIST SP 800-61r3 · OWASP LLM01:2025, Agentic ASI02/ASI08/ASI10
· Couche 04 Runtime Controls & Observability · Couche 05 Assurance & Continuous Compliance. Les
mappages sont illustratifs, pas une affirmation de conformité.

## Sources

[1] "Name it to tame it: defining AI incidents and hazards" (Luis Aranda and Karine Perset; summary of the OECD paper "Defining AI incidents and related terms", OECD Artificial Intelligence Papers, doi 10.1787/d1a8d965-en; AI incident and AI hazard definitions; graded terms serious AI incident, AI disaster, serious AI hazard). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[2] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; 29 criteria in eight dimensions; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 3(49) serious incident; Art. 3(61) widespread infringement; Art. 20 corrective actions and duty of information; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 73 reporting of serious incidents (2, 10 and 15 days; incomplete initial report; no altering the system before informing authorities; limits in Art. 73(9)–(10)). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action; Annex A.8 information for interested parties). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[5] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 serious incident reporting (Measure 9.1 identification sources and informing third parties of direct reporting channels, if available; 9.2 information incl. near misses; 9.3 timelines of 2, 5, 10 and 15 days, intermediate reports at least every four weeks, final report within 60 days of resolution; 9.4 retention of at least five years). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[6] NIST SP 800-61r3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (supersedes SP 800-61r2; previous life-cycle phases mapped to CSF 2.0 functions). NIST. 2025-04. https://csrc.nist.gov/pubs/sp/800/61/r3/final (verified: primary)
[7] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring incl. incident response; MANAGE 4.3 incidents and errors communicated, processes followed and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[8] LLM01:2025 Prompt Injection (direct and indirect prompt injection). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[9] Top 10 for Agentic Applications 2026 (ASI02 Tool Misuse; ASI08 Cascading Failures; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[10] IEC 61025:2006, Fault tree analysis (FTA), edition 2.0 (IEC TC 56 Dependability). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template under Art. 55(1)(c) and Commitment 9; ten fields from start and end dates to root-cause analysis, near-miss patterns and submitter). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[13] Directive (EU) 2022/2555 (NIS2) of 14 December 2022: Art. 4 sector-specific Union acts; Art. 23 reporting obligations (significant incident; early warning within 24 hours; notification within 72 hours; final report within one month incl. type of threat or root cause); Annex I digital infrastructure incl. providers of public electronic communications networks and services. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[14] Commission Delegated Regulation (EU) 2024/1772, RTS on the classification of ICT-related incidents under DORA (Art. 8: major incidents; recurring incidents with the same apparent root cause, occurring at least twice within six months, count as one major incident). Publications Office of the EU (EUR-Lex). 2024-03-13. https://eur-lex.europa.eu/eli/reg_del/2024/1772/oj/eng (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 75 (Art. 75(1a), inserted by Reg. (EU) 2026/1744: serious incidents of high-risk systems under the AI Office's competence reported to the AI Office, Art. 73(2) to (9) applying mutatis mutandis; Art. 73 deadlines unchanged). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_75 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 55 (GPAI models with systemic risk; Art. 55(1)(c) keep track of, document and report serious incidents to the AI Office without undue delay). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_55 (verified: primary)
[17] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 33 notification of a personal data breach to the supervisory authority (72 hours where feasible; processor to controller; phased information; documentation) and Art. 34 communication to the data subject (high risk). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[18] Regulation (EU) 2022/2554 (DORA) of 14 December 2022: Art. 3(8) ICT-related incident; Art. 19 reporting of major ICT-related incidents. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[19] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5(1): initial notification within 4 hours of classification and no later than 24 hours from awareness; Art. 5(2): within 4 hours of a classification made after those 24 hours; intermediate within 72 hours; final within one month); report templates in Commission Implementing Regulation (EU) 2025/302. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[20] Regulation (EU) 2024/2847 (Cyber Resilience Act) of 23 October 2024: Art. 14 reporting obligations of manufacturers (24-hour early warning; 72-hour notification; final report 14 days after a fix or one month after notification; CSIRT and ENISA via the single reporting platform); Art. 71(2) Art. 14 applies from 11 Sep 2026. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[21] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025; approved 29 Sep 2025; Bus. & Prof. Code 22757.13(c): critical safety incidents reported by any frontier developer, not only a large frontier developer, to the Office of Emergency Services within 15 days, or within 24 hours to an appropriate authority on imminent risk of death or serious physical injury). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[22] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; 72-hour safety incident disclosure). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[23] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment; all frontier developers, not only large frontier developers, report a critical safety incident within 72 hours of a determination or reasonable belief to the DFS office; 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[24] "European Commission Publishes Draft Guidance on Reporting Serious AI Incidents" (indirect causation; simplified Art. 73 reporting where equivalent sector obligations apply, limited to fundamental-rights infringements). Latham & Watkins. 2025-10-28. https://www.lw.com/en/insights/european-commission-publishes-draft-guidance-reporting-serious-ai-incidents (verified: secondary)
[25] "EU AI Act Update: Digital Omnibus Finalizes 8 Compliance Changes" (AI Office exclusive competence over AI systems built on the same provider's GPAI model and over systems in very large online platforms and search engines; serious-incident reports from those providers go to the AI Office). Orrick. 2026-07-29. https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes (verified: secondary)
[26] "AI Act: Commission issues draft guidance and reporting template on serious AI incidents, and seeks stakeholders' feedback" (published 26 Sep 2025; feedback until 7 Nov 2025; alignment with the OECD AI Incidents Monitor and Common Reporting Framework). European Commission. 2025-09-26. https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks (verified: primary)
[27] Legislative Train Schedule: The Digital Omnibus Regulation Proposal (COM(2025) 837; status tabled; single reporting point for cybersecurity and data incidents; co-rapporteurs' draft report 22 Jun 2026; Council mandate vote cancelled 26 Jun 2026; page updated 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[28] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[29] AI Incident Database (harms and near harms from deployed AI; CSET, GMF and MIT taxonomies; database snapshots). Responsible AI Collaborative. 2026. https://incidentdatabase.ai/ (verified: primary)
[30] OECD.AI Incidents and Hazards Monitor (AIM; automated monitor of news media; incidents and hazards distinguished). OECD. 2026. https://oecd.ai/en/incidents (verified: primary)
[31] AIAAIC Repository (independent register of AI, algorithmic and automation incidents and controversies). AIAAIC. 2026. https://www.aiaaic.org/aiaaic-repository (verified: primary)
[32] MIT AI Risk Repository (living database of AI risks; causal and domain taxonomies). MIT FutureTech. 2026. https://airisk.mit.edu/ (verified: primary)
[33] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 113 (Art. 113(c) as amended by Reg. (EU) 2026/1744: Chapter III, Sections 1 to 3, apply from 2 Dec 2027 for Annex III systems and from 2 Aug 2028 for Annex I systems; Chapter IX, Art. 73 included, is not listed among the postponed provisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_113 (verified: primary)
