---
lang: es
source: bok/patterns/policy-card.md
sourceHash: "95594508eddf7681f1fbddc9909215a928bd9b78c9f9df12c2ab751cfa63a6f8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: policy-card
title: Policy Card
layer: 1
order: 1
summary: "Una regla de gobernanza escrita como una tarjeta legible por máquina que la pipeline y el runtime ambos evalúan, dejando un veredicto en cada verificación."
---

# Patrón: Policy Card

**Resumen:** Expresa una regla de gobernanza como un artefacto legible por máquina que viaja con el
modelo o agente y se evalúa en la pipeline y en tiempo de ejecución, en lugar de como prosa que un
humano debe aplicar. La Policy Card codifica acciones permitidas y prohibidas, obligaciones y
requisitos de evidencia para un sistema de IA, y se vincula a las pipelines de aplicación y
auditoría que actúan sobre ella [1].

## Objetivos
Convierte una política de una declaración de intención en un control ejecutable, versionado y
comprobable, así que un cambio de regla es un diff revisable y cada evaluación deja un veredicto.

## Usuarios objetivo
Ingeniero de gobernanza de IA, equipo de plataforma, propietario de política.

## Partes interesadas afectadas
Propietarios de modelos, responsables del despliegue, auditores, reguladores.

## Principios relevantes
Construye el control en el punto más temprano en que puede bloquear; haz que el camino gobernado sea
el camino más fácil.

## Contexto
Una organización con más de un puñado de sistemas de IA y una función de gobernanza que no puede
revisar cada cambio a mano. Las reglas existen pero viven en documentos que ninguna pipeline puede
leer.

## Problema
La política en prosa no puede ejecutarse automáticamente, se desvía de los sistemas que rige y no
deja evidencia de que se haya aplicado. Una regla que solo puede recordarse se viola en el momento
en que alguien la olvida.

## Solución
Escribe cada regla como una Policy Card: un artefacto estructurado y legible por máquina (por
ejemplo expresado para un motor `OPA/Rego` o `Cedar`, o como un documento Policy Cards) que
establece la lógica de permitir/denegar, el modo de fallo que aborda y las cláusulas del marco a las
que se asigna. Almacénalo con el sistema que rige. Evalúalo antes de la fusión, en el despliegue y
(donde la regla es una restricción en tiempo de ejecución) en el punto de acción. Emite un veredicto
(id de regla, hash de entrada, decisión, marca de tiempo) en cada evaluación.

Esquema ilustrativo para el veredicto:

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Ejemplo (ilustrativo)** Una Policy Card para un agente de servicio al cliente declara que puede
> llamar a la herramienta de reembolsos solo hasta una cantidad acotada y nunca fuera del horario
> comercial; la misma tarjeta se evalúa en CI contra el alcance declarado del agente y en tiempo de
> ejecución por el guardrail de llamada de herramientas.

## Consecuencias
Las reglas se vuelven ejecutables y auditables, y el crosswalk se genera a sí mismo. El costo es la
autoría y el mantenimiento de tarjetas, y la disciplina de mantener la versión ejecutable como
autoritativa sobre la prosa.

## Patrones relacionados
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials).

**Correspondencias:** Reglamento de IA Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM ·
OWASP Agentic ASI02/ASI03 · Layer 01 Govern-as-Code.

Los IDs de amenaza siguen el OWASP Top 10 para Aplicaciones Agentic 2026 [2] y las etiquetas de
función el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
