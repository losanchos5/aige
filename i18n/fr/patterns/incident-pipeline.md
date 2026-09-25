---
lang: fr
source: bok/patterns/incident-pipeline.md
sourceHash: "73905c623ed3c25ee83609d31bb598c906bf81f6ad4ee22eecc3578ec1aff46d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "La plomberie qui détecte, trie et signale les incidents graves d'IA dans la fenêtre légale, avec les délais et les modèles codés, non mémorisés."
---

# Motif : Incident Pipeline

**Résumé :** Construisez la plomberie pour détecter, trier et signaler les incidents graves d'IA
dans le délai imparti, avec les délais de signalement et les modèles codés plutôt que mémorisés.
Pour les systèmes à haut risque, cela inclut le signalement des incidents graves de l'article 73 du
règlement sur l'IA de l'UE ; pour les modèles de IA à usage général, cela inclut le signalement des
incidents systémiques que le Code de pratique attend [1]. Le même pipeline sert le responsable du
déploiement d'un système construit par quelqu'un d'autre : il informe le fournisseur, suspend
l'utilisation lorsque le système présente un risque, et maintient l'horloge de signalement lorsque
le fournisseur ne peut pas être contacté.

## Objectifs
Transformez un signal d'exécution en une obligation signalée dans la fenêtre légale, et produisez
l'enregistrement d'incident comme preuve structurée. Gardez les problèmes et les incidents séparés,
classez la gravité sur une échelle écrite, trouvez la cause sans blâme, et réintégrez chaque
incident fermé dans les contrôles.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, responsable de la sécurité/incidents, droit/conformité, DPO, le
responsable de liaison du fournisseur d'un responsable du déploiement.

## Parties prenantes affectées
Régulateurs, personnes affectées, responsables du déploiement, fournisseurs, propriétaires de
modèles.

## Principes pertinents
Instrumentez la construction pour produire sa propre preuve ; partez d'un mode de défaillance ou
d'un préjudice nommé.

## Contexte
Un système à haut risque ou de IA à usage général en production, soumis à des obligations de
signalement des incidents graves, où la détection vit en ingénierie et le signalement vit en droit,
sans fil entre eux. La plupart des organisations rencontrent les incidents d'IA en tant que
responsables du déploiement d'un système acheté, de sorte que le pipeline doit fonctionner pour un
modèle qu'ils ne possèdent pas ainsi que pour un qu'ils ont construit.

## Problème
Lorsqu'un incident est détecté, l'horloge démarre. Si la détection, le tri et le signalement sont
des étapes manuelles déconnectées, le délai est manqué et la preuve de ce qui s'est passé est
reconstruite après coup. Un seul champ « priorité » lu d'une manière par l'ingénierie et d'une autre
par le droit cache la décision de signalabilité, et une autopsie qui chasse quelqu'un à blâmer
enseigne aux gens à signaler moins.

## Solution
Connectez la détection d'exécution (à partir de l'observabilité et des guardrails) à un flux de
travail de tri qui classe la gravité et, sur un événement signalable, rédige le rapport par rapport
au modèle requis et démarre le minuteur statutaire. Codez les délais de l'article 73 du règlement
sur l'IA de l'UE et le flux de surveillance post-commercialisation de l'article 72 [2] ; conservez
l'enregistrement d'incident comme preuve lisible par machine. Les cinq étapes ci-dessous sont les
parties qui échouent le plus souvent dans la pratique ; le [chapitre 17](/bok/incidents) traite
chacune en profondeur.

> **Exemple (illustratif)** Un guardrail signale une tentative d'exfiltration de données via un
> outil d'agent ; le pipeline la classe, ouvre un incident avec le minuteur de l'article 73 en cours
> d'exécution, et pré-remplit le rapport à partir de la trace et de l'entrée du registre.

### Problème ou incident : deux files d'attente, un type d'enregistrement

Un **problème** est un défaut ou une faiblesse de contrôle sans événement derrière lui : une
évaluation qui a régressé en staging, une alerte de dérive, une fiche de modèle qui ne correspond
plus à la version déployée. Il va dans un journal des problèmes avec un propriétaire et une date
limite, et en termes ISO/IEC 42001, la plupart des problèmes sont des non-conformités traitées en
vertu de la clause 10.2 [3]. Un **incident** est un événement dans lequel le système a causé un
préjudice ; un **aléa** (ou quasi-accident) en est un qui aurait pu plausiblement causer un
préjudice et ne l'a pas [4]. Un **incident grave** en vertu de `Art. 3(49)` est le sommet de cette
échelle : décès ou atteinte grave à la santé, perturbation grave et irréversible d'une
infrastructure critique, violation d'obligations protégeant les droits fondamentaux, ou préjudice
grave aux biens ou à l'environnement [2]. Gardez la gravité (un jugement interne sur le préjudice)
et la déclarabilité (un test exécuté une fois par régime) dans des champs séparés, chacun défini par
une personne nommée avec un horodatage. Les définitions complètes se trouvent dans
[le chapitre 17](/bok/incidents#incident-hazard-issue-and-serious-incident).

### Une échelle de gravité mappée aux classes de l'art. 73

Écrivez l'échelle comme politique et évaluez-la comme code à l'ouverture d'un incident, de sorte que
la première classification et les horloges qu'elle démarre soient reproductibles. Les niveaux
ci-dessous sont illustratifs ; ce qui importe, c'est que chacun nomme un test de préjudice et la
classe juridique qu'il peut déclencher.

| Niveau | Test de préjudice | `Art. 73` classe qu'il peut déclencher [2] | Réponse par défaut |
|---|---|---|---|
| **SEV-1** | Décès ; perturbation grave et irréversible d'une infrastructure critique ; violation généralisée | `Art. 73(4)` décès : au plus tard 10 jours ; `Art. 73(3)` : au plus tard 2 jours | Contenir d'abord ; services juridiques et DPO sur le pont |
| **SEV-2** | Violation d'obligations relatives aux droits fondamentaux ; préjudice grave aux biens ou à l'environnement | `Art. 73(2)` : au plus tard 15 jours | Même jour ouvrable ; déclarabilité évaluée par régime |
| **SEV-3** | Préjudice réalisé en dessous des seuils graves | Aucun en soi ; vérifiez le RGPD et les régimes sectoriels | Contenir le même jour ; examiner dans les cinq jours ouvrables |
| **SEV-4** | Quasi-accident : un chemin vers le préjudice a été interrompu | Aucun | Examen hebdomadaire ; évaluation de régression ajoutée |
| **Problème** | Défaut ou faiblesse, aucun événement | Aucun | Journal des problèmes avec propriétaire et date d'échéance |

Classez à la hausse et rétrogradez avec des preuves : les délais courent à partir de la prise de
conscience, et une probabilité raisonnable d'un lien causal suffit pour les démarrer [2]. Un
événement peut démarrer plusieurs horloges. Une violation de données personnelles dans un incident
de IA ajoute la notification RGPD à l'autorité de contrôle, dans les 72 heures si possible [5], de
sorte que l'enregistrement porte un drapeau de déclarabilité par régime (voir
[les horloges qui se chevauchent](/bok/incidents#the-overlapping-clocks)).

### L'enregistrement : un schéma, de nombreux rapports

Conservez chaque événement comme un enregistrement d'incident qui valide par rapport à
[`incident-record.v1.json`](/schemas/incident-record.v1.json) (un modèle
[Markdown](/templates/incident-record.md) remplissable se trouve à côté). Le champ `severity` du
schéma prend les valeurs OCDE (aléa, aléa grave, incident, incident grave, catastrophe) [4] ; gardez
le niveau SEV interne à côté. Le bloc `reporting` enregistre quand l'organisation a pris
connaissance et une entrée par régime évalué, de sorte que chaque horloge est une requête, pas une
mémoire ; `containment` enregistre si le kill switch a été utilisé ; {`root_cause_analysis`} et
{`actions_taken`} ferment la boucle. Les rapports face aux régulateurs sont rendus à partir de
l'enregistrement, jamais retapés.

### Cause première, CAPA et examen sans culpabilité

Exécutez l'examen sur un déclencheur défini à l'avance (chaque SEV-1 et SEV-2, un échantillon du
reste) et écrivez-le sans culpabilité : la question est quelles conditions ont permis à une personne
raisonnable d'agir comme elle l'a fait, pas qui a commis une erreur [6]. Nommez la méthode (cinq
pourquoi, arbre des défaillances, examen chronologique) et une catégorie de cause dans
l'enregistrement. Le résultat est **CAPA** (action corrective et préventive) : l'action corrective
corrige cette instance, l'action préventive empêche la classe de défaillance de se reproduire
n'importe où dans la flotte. Chaque incident fermé laisse une évaluation de régression dans la
[Porte d'évaluation](/patterns/eval-gate-in-ci), un changement de registre des risques et un
enregistrement de preuve que la correction a été vérifiée, comme le
[chapitre 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) l'énonce.

### Exercices de simulation

Un playbook non testé est une affirmation, pas un contrôle. Répétez selon un calendrier, en faisant
tourner les modes de défaillance (une injection de prompt indirecte qui exfiltre des données, une
dérive vers des résultats discriminatoires, un fournisseur qui échange silencieusement le modèle
derrière une API, une boucle d'agent qui brûle le budget), et chronométrez les étapes qui importent
: classer, contenir, un projet de rapport pour chaque horloge. L'exercice produit les mêmes
enregistrements qu'un incident réel, marqués comme un exercice, de sorte que « pouvez-vous rapporter
à temps ? » est répondu par une requête sur les résultats des exercices
([playbooks, RACI et exercices](/bok/incidents#playbooks-raci-and-drills)).

### Le côté du responsable du déploiement : informer le fournisseur, suspendre l'utilisation

Un responsable du déploiement d'un système à haut risque a trois obligations en vertu de
`Art. 26(5)` [2]. Il surveille le système sur la base des instructions d'utilisation et informe le
fournisseur le cas échéant. Lorsqu'il a des raisons de considérer que l'utilisation conformément aux
instructions peut présenter un risque, il informe le fournisseur ou le distributeur et l'autorité de
surveillance du marché sans délai injustifié et suspend l'utilisation. Lorsqu'il identifie un
incident grave, il informe immédiatement d'abord le fournisseur, puis l'importateur ou le
distributeur et l'autorité ; s'il ne peut pas joindre le fournisseur, `Art. 73` s'applique au
responsable du déploiement. Concevez chaque obligation :

- **Un canal fournisseur sur l'entrée du registre**, avec les conditions de notification
  contractuelles que la
  [Porte de diligence raisonnable du fournisseur / modèle](/patterns/vendor-model-due-diligence-gate)
  a négociées, testées dans les exercices.
- **Un chemin de suspension pour un système que vous ne possédez pas** : un drapeau de
  fonctionnalité ou un commutateur de trafic vers un chemin humain ou hérité, câblé au
  [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) et chronométré dans les
  exercices.
- **Une exportation face au fournisseur de l'enregistrement** avec l'horodatage de chaque
  notification, et une horloge de secours qui démarre les minuteurs `Art. 73` sur l'enregistrement
  propre du responsable du déploiement lorsque le fournisseur est silencieux.
- **Conservation des journaux** sous le contrôle du responsable du déploiement pendant au moins six
  mois (`Art. 26(6)`), plus longtemps tant qu'un incident est ouvert [2].

## Conséquences
La déclaration se fait à temps et l'enregistrement est prêt pour l'audit. La gravité et la
déclarabilité restent séparées, les examens enseignent au lieu de blâmer, et chaque incident fermé
renforce les contrôles par le biais de CAPA. Le coût est l'intégration interfonctionnelle, les
exercices qui détournent les gens d'autres travaux, les conditions de notification contractuelles
qui doivent être obtenues des fournisseurs, et le maintien des critères de gravité et des modèles à
jour avec la loi.

## Motifs connexes
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondances :** Règlement de l'IA UE Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST
AI RMF (Manage) · Couche 05 Assurance & Continuous Compliance.

Les étiquettes de fonction suivent le NIST AI RMF [7]. Les mappages sont illustratifs, pas une
affirmation de conformité.

## Sources

[1] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 (serious incident reporting for GPAI models with systemic risk). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act): Art. 3(49) serious incident; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 72 post-market monitoring; Art. 73 reporting of serious incidents (73(2) no later than 15 days, 73(3) no later than 2 days, 73(4) no later than 10 days). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; AI incident and AI hazard; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority within 72 hours where feasible). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[7] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
