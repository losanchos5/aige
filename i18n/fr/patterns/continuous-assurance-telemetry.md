---
lang: fr
source: bok/patterns/continuous-assurance-telemetry.md
sourceHash: "289ffc6b24e3f832cc89b6f955693212f1589d484bb837315d06e2b3b4328273"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: continuous-assurance-telemetry
title: Continuous Assurance Telemetry
layer: 5
order: 7
summary: "Les décisions de contrôle diffusées dans un magasin d'assurance unique au fur et à mesure qu'elles se produisent, de sorte que le fonctionnement d'un contrôle est une requête en direct, pas une attestation ponctuelle."
---

# Motif : Continuous Assurance Telemetry

**Résumé :** Diffusez les décisions de contrôle (verdicts de politique, résultats d'évaluation,
actions de garde-fou, événements d'identité) dans un magasin d'assurance au fur et à mesure qu'elles
se produisent, de sorte que l'état d'un contrôle soit une requête en direct plutôt qu'une
attestation ponctuelle. La fiabilité devient un signal généré en continu, pas un certificat statique
[1].

## Objectifs
Remplacez l'attestation périodique par des preuves émises au fur et à mesure que le système
s'exécute, de sorte que « le contrôle fonctionne-t-il ? » soit répondu par la télémétrie.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, équipe SRE/plateforme, auditeur.

## Parties prenantes affectées
Propriétaires de modèles, auditeurs, régulateurs, répondants aux incidents.

## Principes pertinents
Donnez des dents à chaque contrôle ; instrumentez la construction pour produire sa propre preuve.

## Contexte
Un stack dont les couches inférieures émettent déjà des enregistrements structurés, et une fonction
d'assurance fatiguée d'assembler des classeurs avant chaque audit.

## Problème
Une attestation dit qu'un contrôle existait quand quelqu'un regardait ; elle ne dit rien sur les
semaines entre-temps, pendant lesquelles le modèle a été réentraîné et un agent a gagné un outil. La
preuve ponctuelle se dégrade immédiatement.

## Solution
Faites en sorte que chaque contrôle écrive un enregistrement horodaté et structuré dans un magasin
d'assurance commun, sur un schéma. Fixez d'abord le schéma : un enregistrement de preuve utile
minimum est
`{control_id, subject (model/agent/system id + version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold, failure_mode/obligation ref, input_hash, actor, timestamp, signature}`.
Normalisez la sortie de chaque outil dans cette forme à l'ingestion, de sorte que les sources
hétérogènes se composent en un magasin interrogeable unique indexé sur l'identifiant du registre.

Schéma illustratif pour l'enregistrement de preuve :

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Deux propositions de recherche pointent vers la même idée et valent la peine d'être surveillées, pas
adoptées en entier : TAIP traite les sorties NIST TEVV comme des objets d'assurance IA réutilisables
qui se composent entre les systèmes [1], et AAGATE opérationnalise un plan de contrôle alignant les
fonctions NIST AI RMF pour les agents en production [2] ; les deux sont des préprints uniques.
Exposez l'état actuel de chaque contrôle en tant que requête sur le magasin.

> **Exemple (illustratif)** Une tuile de tableau de bord pour le contrôle de résidence des données
> est soutenue par une requête en direct sur les décisions de garde-fou émises ; si le contrôle
> cesse de fonctionner, la tuile devient rouge en quelques minutes, pas au prochain audit.

## Conséquences
L'audit devient une requête et la dérive est visible en temps quasi réel. Le coût est la
construction du pipeline et du stockage, et la définition d'un schéma de preuve commun entre les
outils.

## Motifs connexes
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondances :** Règlement de l'IA Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern) · CSA
AICM · Layer 05 Assurance & Continuous Compliance.

Les étiquettes de fonction suivent le NIST AI RMF [3]. Les correspondances sont illustratives, non
une déclaration de conformité.

## Sources

[1] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[2] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
