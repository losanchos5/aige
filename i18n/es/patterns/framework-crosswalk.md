---
lang: es
source: bok/patterns/framework-crosswalk.md
sourceHash: "4ac2ee65dbf30c778130711d8563719cfe4cbeeea2929df2e3e488f1269bad4e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: framework-crosswalk
title: Framework Crosswalk
layer: 1
secondaryLayer: 5
order: 12
summary: "Un mapa de cada control a las cláusulas del marco que sirve, generado a partir de los controles: un índice para reutilización, nunca prueba de que un control funcione."
---

# Patrón: Framework Crosswalk

**Resumen:** Mantén un mapeo de cada control a las cláusulas del marco que sirve, generado a partir
de los propios controles, como un índice para navegación y reutilización, nunca como el estado
final. Un crosswalk prueba que has leído el marco; no prueba que el control funcione.

## Objetivos
Deja que un control satisfaga muchos marcos y haz la cobertura navegable, mientras rechazas
confundir cobertura con aseguramiento.

## Usuarios objetivo
Ingeniero de gobernanza de IA, responsable de cumplimiento, auditor.

## Partes interesadas afectadas
Auditores, reguladores, propietarios de modelos.

## Principios relevantes
Haz el camino gobernado el camino más fácil; instrumenta la compilación para producir su propia
prueba.

## Contexto
Una organización que responde a varios marcos superpuestos (Reglamento de IA de la UE, ISO/IEC
42001, NIST AI RMF, CSA AICM) que de otro modo implementaría el mismo control varias veces.

## Problema
El crosswalk es donde comienza el teatro de marcos. Una matriz de mapeo verde se confunde con un
control funcional; una hoja de cálculo de 300 filas que mapea controles a cinco marcos se presenta
como madurez mientras nada mide si algún control mapeado reduce riesgo.
**El anti-patrón es tratar cobertura como control: una celda de mapeo no es evidencia.**

## Solución
Genera el crosswalk a partir de los controles, no junto a ellos: cada Policy Card y Eval Gate
declara las cláusulas a las que mapea, y el crosswalk es la agregación. Úsalo para encontrar brechas
y reutilizar controles, no para reportar cumplimiento. Cada celda de mapeo debe resolverse en un
control en ejecución y su evidencia emitida; una celda sin evidencia detrás se marca, no se cuenta.
Vocabularios de referencia como CSA AICM (247 objetivos de control en 18 dominios) [1] y OWASP Agent
Control Standard [2] anclan el mapeo.

> **Ejemplo (ilustrativo)** Hacer clic en una celda verde para «logging» abre el guardrail y la
> evidencia OSCAL que emitió esta semana; una celda sin evidencia se renderiza ámbar, no verde.

## Consecuencias
Los controles se reutilizan entre marcos y las brechas son visibles, sin inflar una matriz en falsa
aseguranza. La compensación es la disciplina para mantener las celdas honestas y resistir reportar
cobertura como resultado.

## Patrones relacionados
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondencias:** Reglamento de IA de la UE (transversal) · ISO/IEC 42001 · NIST AI RMF (Govern)
· CSA AICM · OWASP Agent Control Standard · Layer 01 Govern-as-Code / Layer 05 Assurance &
Continuous Compliance.

Las etiquetas de función siguen el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
