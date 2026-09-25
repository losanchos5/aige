---
lang: fr
source: bok/patterns/policy-card.md
sourceHash: "95594508eddf7681f1fbddc9909215a928bd9b78c9f9df12c2ab751cfa63a6f8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: policy-card
title: Policy Card
layer: 1
order: 1
summary: "Una regla de gobernanza escrita como una tarjeta legible por máquina que tanto la canalización como el tiempo de ejecución evalúan, dejando un veredicto en cada verificación."
---

# Motif : Policy Card

**Resumen:** Exprese una regla de gobernanza como un artefacto legible por máquina que viaja con el
modelo o agente y se evalúa en la canalización y en tiempo de ejecución, en lugar de como prosa que
un humano debe aplicar. La Policy Card codifica acciones permitidas y prohibidas, obligaciones y
requisitos de evidencia para un sistema de IA, y se vincula a las canalizaciones de cumplimiento y
auditoría que actúan sobre ella [1].

## Objectifs
Convierta una política de una declaración de intención en un control ejecutable, versionado y
comprobable, de modo que un cambio de regla sea un diff revisable y cada evaluación deje un
veredicto.

## Utilisateurs cibles
Ingeniero de gobernanza de IA, equipo de plataforma, propietario de política.

## Parties prenantes affectées
Propietarios de modelos, responsables del despliegue, auditores, reguladores.

## Principes pertinents
Construya el control en el punto más temprano en que pueda bloquear; haga que la ruta gobernada sea
la ruta más fácil.

## Contexte
Una organización con más de un puñado de sistemas de IA y una función de gobernanza que no puede
revisar cada cambio a mano. Las reglas existen pero viven en documentos que ninguna canalización
puede leer.

## Problème
La politique en prose ne peut pas être appliquée automatiquement, s'écarte des systèmes qu'elle
régit et ne laisse aucune preuve qu'elle a été appliquée. Une règle qui ne peut être que mémorisée
est violée au moment où quelqu'un l'oublie.

## Solution
Écrivez chaque règle sous la forme d'une Policy Card : un artefact structuré et lisible par machine
(par exemple exprimé pour un moteur `OPA/Rego` ou `Cedar`, ou sous la forme d'un document Policy
Cards) qui énonce la logique d'autorisation/refus, le mode de défaillance qu'il traite et les
clauses du cadre auxquelles il correspond. Stockez-le avec le système qu'il régit. Évaluez-le avant
la fusion, au déploiement et (si la règle est une contrainte d'exécution) au moment de l'action.
Émettez un verdict (id de la règle, hash d'entrée, décision, horodatage) à chaque évaluation.

Schéma illustratif du verdict :

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Exemple (illustratif)** Une Policy Card pour un agent de service client déclare qu'il ne peut
> appeler l'outil de remboursement que jusqu'à un montant limité et jamais en dehors des heures de
> bureau ; la même carte est évaluée en CI par rapport à la portée déclarée de l'agent et à
> l'exécution par le guardrail d'appel d'outil.

## Conséquences
Les règles deviennent applicables et auditables, et le crosswalk se génère lui-même. Le coût est la
rédaction et la maintenance des cartes, et la discipline de garder la version exécutable comme
autorité par rapport à la prose.

## Motifs connexes
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials).

**Correspondances :** Reglamento de IA de la UE Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA
AICM · OWASP Agentic ASI02/ASI03 · Layer 01 Govern-as-Code.

Les identifiants de menace suivent le OWASP Top 10 for Agentic Applications 2026 [2] et les
étiquettes de fonction le NIST AI RMF [3]. Les mappages sont illustratifs, non une affirmation de
conformité.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
