---
lang: fr
source: bok/patterns/machine-readable-evidence-oscal.md
sourceHash: "be7a12b4bb256bc5061873011ed1ac00eb14de3c039d565f3ba60f94a06cb2da"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: machine-readable-evidence-oscal
title: "Machine-Readable Evidence (OSCAL)"
layer: 5
order: 13
summary: "Preuves de contrôle émises dans un format standard lisible par machine, OSCAL en premier, de sorte qu'un audit devient une requête et les mêmes enregistrements alimentent l'assurance."
---

# Motif : Machine-Readable Evidence (OSCAL)

**Résumé :** Émettez des preuves de contrôle dans un format standard lisible par machine de sorte
que l'audit soit une requête et les mêmes preuves alimentent l'assurance continue. OSCAL, étendu
avec des propriétés pour l'IA, est le format organisateur : les cadres spécifient ce qu'il faut
assurer mais ne fournissent aucun format exécutable pour comment, et ce modèle le fournit [1].

## Objectifs
Rendez les preuves interrogeables, diffables et agrégables, et éliminez la capture d'écran comme
artefact de preuve.

## Utilisateurs cibles
Ingénieur en gouvernance de l'IA, auditeur, équipe de plateforme.

## Parties prenantes affectées
Auditeurs, régulateurs, propriétaires de modèles.

## Principes pertinents
Donnez des dents à chaque contrôle ; instrumentez la construction pour produire sa propre preuve.

## Contexte
Une stack dont les contrôles produisent déjà des enregistrements structurés, et une fonction
d'assurance qui doit répondre aux auditeurs à plusieurs reprises et rapidement.

## Problème
Les preuves qu'un humain doit formater et classer à la main ne s'adaptent pas, ne peuvent pas être
vérifiées rapidement, et sont obsolètes au moment où elles sont sauvegardées. Chaque audit les
recueille à nouveau à partir de zéro.

## Solution
Émettez les résultats de contrôle comme des artefacts OSCAL component-definition et
assessment-results. Le modèle natif d'OSCAL est le substrat stable : une couche de contrôle
(`catalog`, `profile`), une couche d'implémentation (`component-definition`, `system-security-plan`)
et une couche d'évaluation (`assessment-plan`, `assessment-results`, `POA&M`), avec traçabilité d'un
résultat au contrôle qu'il a testé [2]. Construisez dessus d'abord. Les extensions spécifiques à
l'IA se forment toujours : une approche proposée, un prétirage unique de 2026, ajoute seize
extensions de propriété pour la phase du cycle de vie, la sémantique d'application et la traçabilité
des risques dans une architecture à trois couches politique/preuve/application qui génère
automatiquement les résultats d'évaluation OSCAL et les valide par rapport au schéma JSON NIST [1].
Adoptez les extensions si elles conviennent, mais les modèles d'évaluation natifs portent la plupart
de la charge aujourd'hui. Stockez les preuves de sorte que la question d'un auditeur soit répondue
par une requête.

> **Exemple (illustratif)** Une porte d'évaluation écrit un résultat d'évaluation OSCAL à chaque
> exécution ; la demande de l'auditeur pour « toutes les preuves de robustesse au Q3 » est un filtre
> sur le magasin, retourné en quelques minutes.

## Conséquences
L'audit devient une requête et les preuves se composent entre les outils et les juridictions. Le
coût est l'adoption du schéma et l'instrumentation des contrôles pour l'émettre.

## Motifs connexes
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondances :** Reglamento de IA de la UE Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI
RMF (Manage, Govern) · Layer 05 Assurance & Continuous Compliance.

Les étiquettes de fonction suivent le NIST AI RMF [3]. Les correspondances sont illustratives, non
une déclaration de conformité.

## Sources

[1] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[2] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
