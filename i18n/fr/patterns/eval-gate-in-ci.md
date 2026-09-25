---
lang: fr
source: bok/patterns/eval-gate-in-ci.md
sourceHash: "db2745d7602943a223d8898cfaeead6d0e348fe954232d642e744aefe3792ff8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: eval-gate-in-ci
title: Eval Gate in CI
layer: 3
order: 2
summary: "Une suite d'évaluations intégrée au CI pour qu'un modèle ou un agent ne soit déployé que s'il dépasse un seuil documenté : l'exécution de l'évaluation est le contrôle, son résultat la preuve."
---

# Motif : Eval Gate in CI

**Résumé :** Intégrez une suite d'évaluations dans le pipeline CI/CD pour qu'un modèle ou un agent
doive passer un test défini, au-dessus d'un seuil documenté, avant de pouvoir être déployé.
L'exécution de l'évaluation est le contrôle et son résultat la preuve ; une évaluation échouée
bloque la compilation.

## Objectifs
Rendez concret « donner des dents à chaque contrôle » : donnez une conséquence à une propriété
testable, pour que l'échec arrête une mise en production au lieu de classer un constat.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, ingénieur ML, équipe plateforme.

## Parties prenantes affectées
Propriétaires de modèles, utilisateurs exposés au système, auditeurs.

## Principes pertinents
Donner des dents à chaque contrôle ; construire le contrôle au point le plus précoce où il peut
bloquer.

## Contexte
Un modèle ou un agent qui change (réentraîné, re-sollicité, doté d'un nouvel outil) et un pipeline
qui exécute déjà des tests de correction fonctionnelle.

## Problème
Les évaluations exécutées une seule fois avant le lancement et collées dans une présentation ne
prouvent rien après le changement suivant. Un comité d'examen qui ne peut que noter les constats ne
peut pas arrêter un lancement programmé. Sans portail, l'évaluation est de la recherche, pas du
contrôle.

## Solution
Versionnez une suite d'évaluations aux côtés du modèle. Exécutez au moins une évaluation de capacité
et une évaluation adversariale en CI (par exemple avec Inspect, promptfoo, Garak ou Giskard ;
illustratif). Fixez un seuil qui remonte à un mode de défaillance nommé ou une obligation. Échouez
le pipeline en dessous du seuil. Émettez un résultat structuré (id de suite, version du modèle,
score, seuil, réussi/échoué, horodatage) classé par rapport à l'entrée du registre.

Schéma illustratif pour le résultat :

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Exemple (illustratif)** Un agent de codage interne doit franchir un seuil de résistance à
> l'injection et une suite de régression avant le déploiement ; une mise en production qui fait
> chuter la résistance en dessous du seuil échoue le pipeline et n'est pas déployée tant qu'elle
> n'est pas corrigée.

## Conséquences
Les régressions sont détectées avant la production et la preuve s'accumule automatiquement. Le
compromis : la maintenance des évaluations, le coût d'exécution en CI, et la nécessité d'ajuster les
seuils pour éviter les portails instables.

## Motifs connexes
[Policy Card](/patterns/policy-card);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence).

**Correspondances :** Règlement sur l'IA Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) ·
OWASP Agentic ASI01/ASI02 · Couche 03 Évaluations comme preuves.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [1] et les
étiquettes de fonction le NIST AI RMF [2]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
