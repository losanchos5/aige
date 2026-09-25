---
lang: fr
source: bok/patterns/deactivation-localisation-retirement-runbook.md
sourceHash: "b3bd2689b5ce44e9a23c2fb7e6824d011975d7e17d8518ec6dc57e8ddd53488c"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: deactivation-localisation-retirement-runbook
title: "Deactivation, Localisation & Retirement Runbook"
layer: 4
secondaryLayer: 2
order: 33
summary: "Un runbook foré pour dégrader, éteindre par juridiction ou retirer un système d'IA, avec des déclencheurs nommés, une autorité de décision et des preuves à chaque étape."
---

# Motif : Deactivation, Localisation & Retirement Runbook

**Résumé :** Écrivez à l'avance comment un système d'IA est dégradé, éteint, restreint aux
juridictions où il peut fonctionner, et finalement retiré : le seuil et les déclencheurs juridiques,
le rôle qui décide, les preuves préservées en premier, les modes graduels en deçà de l'arrêt, les
commutateurs par juridiction, et les étapes de retrait de l'analyse des dépendances à une entrée de
registre retiré. Construisez les commutateurs comme des bascules testées, exercez-les selon un
calendrier, et enregistrez chaque décision et étape comme preuve.

## Objectifs
Rendez l'arrêt, la restriction et le retrait d'un système d'IA une procédure exécutable et testée
avec un propriétaire de décision nommé, afin qu'un déclencheur réglementaire ou de performance mène
à une action bornée en quelques heures, et qu'un retrait ne laisse aucune copie en cours
d'exécution, aucune accréditation active et aucune preuve perdue.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, propriétaire du système, SRE, ingénieur de sécurité, juridique.

## Parties prenantes affectées
Utilisateurs et personnes affectées, travailleurs qui dépendent du système, consommateurs en aval,
fournisseurs et déployeurs dans la chaîne, autorités de surveillance du marché.

## Principes pertinents
Donnez à chaque contrôle du poids ; enregistrez et bornez chaque acteur avant qu'il n'agisse ;
instrumentez la construction pour produire sa propre preuve.

## Contexte
Certains déclencheurs pour arrêter un système sont juridiques, non techniques. En vertu du Règlement
de l'IA, un responsable de la mise en œuvre à haut risque qui a des raisons de considérer que le
système présente un risque doit en informer le fournisseur et l'autorité et suspendre l'utilisation
(`Art. 26(5)`) ; un fournisseur doit prendre des mesures correctives, y compris le retrait, la
désactivation ou le rappel d'un système non conforme (`Art. 20`) ; une autorité peut exiger la même
chose pour un système qui présente un risque (`Art. 79`) ; et une pratique peut devenir interdite
(`Art. 5`) [1]. Le NIST AI RMF demande des mécanismes, avec des responsabilités assignées, pour
remplacer, désengager ou désactiver les systèmes dont les performances ou les résultats sont
incompatibles avec l'usage prévu, et des processus pour décommissionner les systèmes en toute
sécurité, d'une manière qui n'augmente pas le risque [2]. Les dossiers survivent au système : les
fournisseurs conservent la documentation pendant dix ans et les responsables de la mise en œuvre
conservent les journaux pendant au moins six mois [1]. Créer une politique et des contrôles pour
désactiver ou localiser un système quand la réglementation ou les performances l'exigent fait partie
de la gouvernance du déploiement et de l'utilisation dans le Body of Knowledge AIGP de l'IAPP
(compétence IV.C) [3]. Pour les agents, le
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) est la forme instantanée de
ce runbook.

## Problème
La plupart des systèmes ont un bouton d'arrêt et de l'espoir. Quand un déclencheur s'active,
personne ne sait qui peut décider, les journaux sont écrasés pendant que la réunion se déroule, et
la seule action disponible est d'éteindre tout, partout, ce qui est souvent pire que la panne. Un
classificateur intégré dans un produit d'un fournisseur n'a pas de bouton du tout. À la retraite,
une entrée est supprimée de l'inventaire tandis qu'une copie continue de servir, un compte de
service reste actif et la preuve que le système a jamais été gouverné est perdue avec lui.

### Enjeux
- **Rapidité contre délibération.** Un déclencheur légal exige une action rapide ; un arrêt avec des
  dépendants nécessite un plan de secours prêt.
- **Précision contre simplicité.** Éteindre une région, une langue ou un groupe limite les dégâts et
  ajoute des boutons à construire et à tester.
- **Préservation contre élimination.** Les preuves doivent être figées avant que quoi que ce soit
  soit arrêté, tandis que la protection des données pousse à supprimer ce qui n'est plus nécessaire.
- **Systèmes intégrés chez les fournisseurs.** Quand le modèle se trouve à l'intérieur du produit
  d'un fournisseur, le bouton dépend du contrat.

## Solution
Conservez un runbook par système, stocké avec son entrée de registre et exécuté selon le calendrier
de maintenance.

1. **Déclencheurs et autorité.** Énumérez les déclencheurs de seuil (un plancher franchi et non
   récupéré dans une fenêtre, un écart d'équité au-dessus de sa limite, une gravité d'incident) et
   les déclencheurs légaux (le devoir `Art. 26(5)`, une action corrective du fournisseur, une mesure
   d'une autorité, une pratique nouvellement interdite), chacun avec le rôle qui décide et le délai
   autorisé. Les violations proviennent du
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor).
2. **Préserver d'abord.** La première étape de chaque chemin gèle les journaux, applique une
   conservation légale et crée des instantanés des versions épinglées, de sorte que la preuve survit
   à l'arrêt.
3. **Modes progressifs.** Construisez les modes intermédiaires comme des bascules opérationnelles et
   testez-les : conseil uniquement, seuils de confiance élevés avec abstention à une personne,
   réponses ancrées uniquement, désactivées pour un groupe, une langue, une région ou une fonction,
   retour à la cohorte pilote, et arrêt avec le processus de secours.
4. **Localisation par juridiction.** Conservez la juridiction comme entrée de politique : ensembles
   de règles par juridiction en tant que code, instances régionales où la résidence l'exige, et
   drapeaux par région afin qu'un marché puisse être éteint sans toucher aux autres. Lancez dans une
   juridiction uniquement quand ses obligations sont démontrées comme étant respectées.
5. **Retraite en tant que runbook.** Analysez les dépendances (le
   [Downstream Use Register](/patterns/downstream-use-register) énumère les consommateurs), déplacez
   les utilisateurs vers le plan de secours, envoyez des avis de fin de vie via le
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline), archivez
   l'instantané de preuve final, conservez ou éliminez les poids, les corpus et les journaux selon
   la licence, la base légale et la rétention décident, révoquez chaque identité et credential,
   définissez l'entrée de registre sur `retired`, et laissez
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) confirmer qu'aucune copie ne s'exécute
   toujours. L'enregistrement utilise le
   [schéma de runbook de décommissionnement](/resources/templates#schema-decommissioning-runbook).
6. **Exercez-le.** Exécutez un exercice de désactivation au moins une fois par an par système :
   temps de décision, temps jusqu'au mode dégradé, temps jusqu'à l'arrêt, et si la preuve a été
   préservée.

Enregistrement de retraite illustratif, en tant que runbook de décommissionnement :

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json",
  "runbook_id": "rb-retire-csa-01",
  "subject": "csa-01@2026-09-18",
  "reason": "replaced",
  "replaced_by": "csa-02",
  "decision_ref": "ddr-csa-02-v1",
  "dependencies": ["contact-centre routing", "weekly quality report"],
  "notifications": [
    { "party": "users", "method": "Release note to contact-centre agents", "sent_at": "2027-03-01" },
    { "party": "deployers", "method": "Change notice to the PT business unit", "sent_at": "2027-03-01" }
  ],
  "steps": [
    { "step_id": "S1", "action": "archive_evidence", "detail": "Freeze logs and snapshot pinned versions.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-29T08:00:00Z" },
    { "step_id": "S2", "action": "disable_traffic", "detail": "Flag csa01.serve off in every region.", "owner": "ml-platform", "status": "done", "completed_at": "2027-03-31T06:00:00Z" },
    { "step_id": "S3", "action": "revoke_identity", "detail": "Revoke the workload identity and API keys.", "owner": "platform-identity", "status": "done", "completed_at": "2027-03-31T07:00:00Z" },
    { "step_id": "S4", "action": "retire_register_entry", "detail": "Set status to retired; keep the entry.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-31T09:00:00Z" },
    { "step_id": "S5", "action": "other", "detail": "Discovery sweep confirms no copy still serves.", "owner": "security-operations", "status": "pending" }
  ],
  "data_disposition": [
    { "dataset": "chat logs", "action": "retain", "basis": "log retention rule and open complaints", "until": "2027-09-30" },
    { "dataset": "retrieval index csa-kb", "action": "delete" }
  ],
  "evidence_archive": { "location": "https://archive.example.org/ai/csa-01", "retain_until": "2033-03-31" },
  "status": "in_progress"
}
```

> **Exemple (illustratif)** Une nouvelle règle nationale applicable restreint les réponses
> automatisées sur les sujets de santé dans un marché. Le runbook nomme le chef de l'unité
> commerciale comme propriétaire de la décision ; dans la journée, la preuve est figée, le drapeau
> régional bascule l'assistant vers des réponses ancrées uniquement là-bas avec les sujets de santé
> désactivés, les autres marchés ne sont pas affectés, et la décision, les bascules et les avis sont
> dans le magasin d'assurance.

## Conséquences
L'arrêt devient proportionné et rapide, la localisation est une bascule plutôt qu'un redéploiement,
et la retraite laisse un enregistrement complet et conservé au lieu d'une lacune. Le coût est la
construction et le test des modes et des drapeaux, des ensembles de règles par juridiction à tenir à
jour, des conditions de contrat qui donnent une bascule sur l'IA intégrée chez les fournisseurs, et
du temps d'exercice. Un mode non testé n'est pas un contrôle : l'exercice est ce qui en fait un.

## Motifs connexes
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Downstream Use Register](/patterns/downstream-use-register);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).

**Correspondances :** Règlement de l'IA Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79 ·
ISO/IEC 42001 A.6.2.5, A.6.2.6 · NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1 · OWASP Agentic
ASI10 · Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [4], les
identifiants de contrôle ISO/IEC 42001 Annex A [5] et les identifiants de sous-catégorie le NIST AI
RMF [2]. Les mappages sont illustratifs, pas une affirmation de conformité.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 5 prohibited practices; Art. 18(1) documentation kept ten years; Art. 20 corrective actions; Art. 26(5) suspend and inform; Art. 26(6) logs kept at least six months; Art. 79 systems presenting a risk). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.7 decommissioning and phasing out safely; MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring plans, including decommissioning). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[3] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: a policy and controls to deactivate or localise an AI system as necessary; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[4] Top 10 for Agentic Applications 2026 (ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
