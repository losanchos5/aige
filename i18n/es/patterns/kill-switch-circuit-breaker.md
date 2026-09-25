---
lang: es
source: bok/patterns/kill-switch-circuit-breaker.md
sourceHash: "4085d3a3066ab6f5a2bcc5c008d937c4de6c9c26c7df7f845dc56669c3cab6bc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: kill-switch-circuit-breaker
title: "Kill Switch / Circuit Breaker"
layer: 4
order: 9
summary: "Un mecanismo probado que detiene un agente o clase de agentes en el punto de acción, revocando su acceso sin romper el resto de la flota."
---

# Patrón: Kill Switch / Circuit Breaker

**Resumen:** Proporciona un mecanismo probado para detener un agente o clase de agentes en el punto
de acción, revocando el acceso e interrumpiendo las llamadas de herramientas, sin romper el resto de
la flota. La autonomía se otorga solo donde puede ser retirada.

## Objetivos
Limita el radio de explosión de un agente que se comporta mal o está comprometido, y haz que
"detenerlo" sea un control que ha sido ejercido, no una afirmación.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, SRE.

## Partes interesadas afectadas
Propietarios de modelos, usuarios, respondedores de incidentes, terceros afectados.

## Principios relevantes
Registra y acota cada actor antes de que actúe; comienza desde un modo de fallo o daño nombrado.

## Contexto
Agentes que actúan autónomamente (llamando herramientas, moviendo datos o dinero), donde un único
fallo puede en cascada. Gartner espera que para 2029 más de la mitad de los ataques exitosos en
agentes de IA explotarán debilidades de control de acceso e inyección de prompts [1].

## Problema
Un agente que no puede ser detenido con precisión solo puede ser detenido rompiendo todo. Una flota
en credenciales compartidas significa que un incidente fuerza una opción entre dejar el agente en
funcionamiento y rotar un secreto que detiene toda la flota.

## Solución
Vincula cada agente a su propia identidad (véase
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)) para que el
acceso pueda ser revocado por agente. Implementa un circuit breaker en el límite de llamada de
herramientas que se active en una señal definida: un incumplimiento de umbral, una anomalía, un
tirón manual. Prueba el kill switch en un cronograma; un kill switch sin probar no es un control.

> **Ejemplo (ilustrativo)** El circuit breaker de un agente de pagos se activa automáticamente
> cuando su tasa de llamadas de herramientas no autorizadas cruza un umbral, revocando solo el
> alcance de ese agente mientras el resto de la flota sigue funcionando; el tirón se ensaya
> mensualmente.

## Consecuencias
Los incidentes se contienen a un agente y la recuperación es rápida. El costo es la plomería de
identidad por agente y la ingeniería para hacer que la revocación sea instantánea y segura.

## Patrones relacionados
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Agent Registry](/patterns/agent-registry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondencias:** Reglamento de IA Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA
AICM · OWASP Agentic ASI02/ASI10 · Layer 04 Runtime Controls & Observability.

Los IDs de amenaza siguen el OWASP Top 10 para Aplicaciones Agentic 2026 [2] y las etiquetas de
función el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
