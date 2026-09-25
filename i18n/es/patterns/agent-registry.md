---
lang: es
source: bok/patterns/agent-registry.md
sourceHash: "08b0ddb94f34e908f4aa421264e1a2ef924b51c137046a23490c6e2a919d420a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-registry
title: Agent Registry
layer: 2
order: 4
summary: "Un inventario consciente del tiempo de ejecución de cada modelo, servicio y agente, cada uno con un propietario, un alcance y un vencimiento, escrito por el pipeline de despliegue, no a mano."
---

# Patrón: Agent Registry

**Resumen:** Mantén un inventario consciente del tiempo de ejecución de cada modelo, servicio y
agente, donde cada entrada lleva un propietario, un alcance y una fecha de vencimiento, alimentado
por la canalización de despliegue en lugar de ser escrito a mano. El registro es el objeto que las
políticas evalúan y los controles en tiempo de ejecución se adjuntan a.

## Objetivos
Responde "¿qué IA se está ejecutando y qué se le permite hacer?" desde una fuente en vivo, y haz que
el registro sea una precondición para llegar a producción.

## Usuarios objetivo
Ingeniero de gobernanza de IA, equipo de plataforma, ingeniero de seguridad.

## Partes interesadas afectadas
Propietarios de modelos, responsables del despliegue, auditores, responsables de respuesta a
incidentes.

## Principios relevantes
Registra y delimita cada actor antes de que actúe; haz que el camino gobernado sea el más fácil.

## Contexto
Una organización que despliega modelos y agentes en equipos, donde ninguna fuente única sabe qué
está en vivo.

## Problema
Un inventario mantenido a mano es correcto el día en que se edita e incorrecto dentro de una semana.
Sin propietario, alcance y vencimiento, una acción no puede ser atribuida, un alcance no puede ser
aplicado, y un agente obsoleto permanece con acceso vigente que nadie revisa.

## Solución
Haz que el registro sea una API a la que la canalización de despliegue escriba: un nuevo modelo o
agente se registra a sí mismo en el despliegue con un propietario, un alcance declarado y un
vencimiento después del cual la entrada debe ser renovada o se desactiva. Niega el acceso a
producción a artefactos no registrados. Reconcilia periódicamente contra lo que realmente se está
ejecutando (véase [Shadow-AI Discovery](/patterns/shadow-ai-discovery)) y marca la desviación.

Esquema ilustrativo para una entrada del registro:

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Ejemplo (ilustrativo)** La entrada del registro de cada agente vence después de 90 días; un
> propietario que no renueva pierde la identidad de carga de trabajo del agente, por lo que los
> agentes abandonados caen fuera de producción automáticamente.

## Consecuencias
La atribución, la aplicación del alcance y el control del ciclo de vida se hacen posibles, y cada
otra capa obtiene un objeto al que anclarse. El costo es la integración de la canalización y la
gobernanza para aplicar el vencimiento.

## Patrones relacionados
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[AIBOM](/patterns/aibom); [Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondencias:** Reglamento de IA Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA
AICM · OWASP Agentic ASI10 · Layer 02 Inventory & Transparency.

Los IDs de amenaza siguen el OWASP Top 10 for Agentic Applications 2026 [1] y las etiquetas de
función el NIST AI RMF [2]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
