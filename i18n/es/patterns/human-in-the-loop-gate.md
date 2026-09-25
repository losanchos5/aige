---
lang: es
source: bok/patterns/human-in-the-loop-gate.md
sourceHash: "001841890c7b27ac0f909a695784012afe2cfa21e43a6f8ebf77a3447e788526"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: human-in-the-loop-gate
title: Human-in-the-loop Gate
layer: 4
order: 15
summary: "Un paso de aprobación humana en un punto de decisión definido de alta consecuencia, así la autonomía de un agente se detiene exactamente donde las apuestas justifican la latencia."
---

# Patrón: Human-in-the-loop Gate

**Resumen:** Requiere aprobación humana en un punto de decisión definido y de alta consecuencia
antes de que la acción de un agente tenga efecto, así la autonomía está limitada por una persona
exactamente donde las apuestas justifican la latencia. La supervisión es un punto de control
diseñado, no una ocurrencia tardía.

## Objetivos
Inserta supervisión humana significativa donde una acción es irreversible o de alto impacto, y
registra la decisión como evidencia.

## Usuarios objetivo
Ingeniero de gobernanza de IA, propietario del producto, propietario del riesgo.

## Partes interesadas afectadas
Personas afectadas, usuarios, propietarios del modelo, reguladores.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; registra y limita cada actor antes de que actúe.

## Contexto
Un agente cuyas acciones incluyen algunas que son irreversibles o afectan los derechos de las
personas (un pago, una denegación, una publicación) junto con muchas que son rutinarias.

## Problema
La autonomía total sobre una acción de alta consecuencia elimina la supervisión humana que la ley y
el riesgo requieren; la revisión manual total sobre cada acción destruye el valor del agente. La
supervisión indiferenciada falla en ambas direcciones.

## Solución
Clasifica acciones por consecuencia. Para la clase de alta consecuencia, cierra la acción detrás de
un paso de aprobación humana con contexto suficiente para decidir, y bloquea la acción hasta la
aprobación. Registra el aprobador, el contexto y la decisión como evidencia. Mantén la clase
rutinaria autónoma bajo guardrails. Esto realiza el requisito de supervisión humana del artículo 14
del Reglamento de IA de la UE [1] en el punto de acción.

> **Ejemplo (ilustrativo)** Un agente puede redactar y encolar reembolsos autónomamente, pero
> cualquier reembolso por encima de un umbral se retiene para un aprobador humano nombrado, cuya
> decisión se registra contra la transacción.

## Consecuencias
La supervisión aterriza donde importa sin estrangular el trabajo rutinario, y la aprobación es
auditable. El coste es diseñar la clasificación de consecuencia y la latencia que añade a las
acciones cerradas.

## Patrones relacionados
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Runtime Guardrail](/patterns/runtime-guardrail); [Policy Card](/patterns/policy-card);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondencias:** Artículo 14 del Reglamento de IA de la UE · ISO/IEC 42001 · NIST AI RMF
(Gestionar) · OWASP Agentic ASI02 · Capa 04 Controles de Tiempo de Ejecución y Observabilidad.

Los IDs de amenaza siguen el OWASP Top 10 para Aplicaciones Agentic 2026 [2] y las etiquetas de
función el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 14 (human oversight of high-risk AI systems). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
