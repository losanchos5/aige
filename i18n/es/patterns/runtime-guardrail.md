---
lang: es
source: bok/patterns/runtime-guardrail.md
sourceHash: "6bebe5fd743c4435cfd24ed335b0c118e62d19e6f1794335bb1d4e37879939b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: runtime-guardrail
title: Runtime Guardrail
layer: 4
order: 8
summary: "Guardrails de entrada y salida en la ruta de solicitud en vivo que aplican la Policy Card del sistema en cada llamada y emiten un evento de decisión para cada una."
---

# Patrón: Runtime Guardrail

**Resumen:** Coloca guardrails de entrada y salida en la ruta de tiempo de ejecución del modelo o
agente que apliquen su Policy Card en cada solicitud en vivo y emitan una decisión a la telemetría y
al disyuntor. El guardrail es donde una política escrita en la capa 01 y un umbral probado en la
capa 03 se convierten en una acción tomada en una llamada real, no una afirmación sobre una.

## Objetivos
Aplica la política en el punto de acción, en entradas y salidas que ningún eval anticipó, y
convierte cada aplicación en un evento estructurado que las capas de garantía e incidente pueden
consumir.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, ingeniero de seguridad, equipo de plataforma.

## Partes interesadas afectadas
Usuarios, propietarios de modelos, personas afectadas, respondedores de incidentes, auditores.

## Principios relevantes
Dale dientes a cada control; instrumenta la compilación para producir su propia prueba.

## Contexto
Un agente o modelo en producción, actuando sobre entradas en vivo, cuya Policy Card y umbrales de
eval existen pero no tienen punto de aplicación en tiempo de ejecución, por lo que una regla probada
en CI está desprotegida en el momento en que el sistema se encuentra con una entrada que ninguna
prueba cubrió.

## Problema
Las políticas y evals son puntuales; el sistema luego se encuentra con inyección de prompts, salidas
inseguras y llamadas de herramientas que nadie revisó. Un guardrail que solo registra es
observabilidad confundida con control: el sistema se observa a sí mismo fallar en alta resolución.
Sin un punto de aplicación que pueda bloquear y emitir, el tiempo de ejecución es la brecha entre un
control probado y una acción sin control.

## Solución
Coloca un guardrail en ambos lados de la ruta del modelo/agente. El guardrail de entrada examina
prompts y contexto recuperado para inyección y solicitudes que violen la política antes de que
lleguen al modelo; el guardrail de salida examina generaciones y llamadas de herramientas para
contenido inseguro, fuga de datos y acciones fuera de alcance antes de que surtan efecto. Aplica la
misma Policy Card evaluada en CI [1], por lo que la decisión en tiempo de ejecución y la decisión de
canalización comparten una regla. En cada llamada emite un evento estructurado,
`{agent, direction (input/output), rule_id, decision (allow/block/redact), timestamp}`, al almacén
de garantía ([Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)) y, en una
violación definida, señala el disyuntor
([Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)). Los marcos de guardrail
realizan esto como una categoría; el Estándar de Control de Agentes OWASP nombra la superficie de
control en tiempo de ejecución [2]. Esto es distinto del disyuntor: el guardrail decide una llamada
a la vez y permanece en la ruta de solicitud; el disyuntor retira la autonomía del agente al por
mayor cuando las señales del guardrail cruzan un umbral.

> **Ejemplo (ilustrativo)** El guardrail de entrada de un asistente de servicio al cliente bloquea
> un intento de inyección de prompts y su guardrail de salida redacta un número de cuenta que el
> modelo estaba a punto de devolver; ambas decisiones se emiten al almacén de garantía, y una ráfaga
> de bloqueos activa el disyuntor.

## Consecuencias
El control probado se mantiene en el tráfico en vivo y cada aplicación deja evidencia; el guardrail
es también el sensor que leen el breaker y el pipeline de incidentes. El coste es la latencia por
llamada, los falsos positivos a ajustar y mantener la regla de runtime sincronizada con la Policy
Card y los umbrales de eval.

## Patrones relacionados
[Policy Card](/patterns/policy-card);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondencias:** Reglamento de IA Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) ·
OWASP Agentic ASI02/ASI03 · Layer 04 Runtime Controls & Observability.

Los IDs de amenaza siguen el OWASP Top 10 for Agentic Applications 2026 [3] y las etiquetas de
función el NIST AI RMF [4]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
