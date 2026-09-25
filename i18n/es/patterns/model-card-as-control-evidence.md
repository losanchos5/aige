---
lang: es
source: bok/patterns/model-card-as-control-evidence.md
sourceHash: "cddf209c7453ca3f97f56c7e81e3b253cf62ca5f325d86017a9fe3072fc64607"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-card-as-control-evidence
title: Model Card as Control Evidence
layer: 2
order: 6
summary: "Fichas de modelo y datos regeneradas desde la pipeline como evidencia estructurada, así que los documentos de transparencia describen el sistema tal como se ejecuta hoy."
---

# Patrón: Model Card as Control Evidence

**Resumen:** Trata la ficha de modelo y la ficha de datos no como documentación de lanzamiento
escrita una vez, sino como evidencia estructurada regenerada desde la pipeline, así que los
documentos de transparencia describen el sistema tal como es ahora y alimentan la capa de
aseguramiento.

## Objetivos
Convierte la documentación de transparencia de un PDF estático en un artefacto versionado que es
tanto legible por humanos como consumible por máquinas, y que cuenta como evidencia de control.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, DPO.

## Partes interesadas afectadas
Propietarios de modelos, usuarios, auditores, titulares de datos.

## Principios relevantes
Instrumenta la compilación para que produzca su propia prueba; haz que el camino gobernado sea el
camino más fácil.

## Contexto
Un sistema sujeto a obligaciones de transparencia, donde las fichas se escriben tradicionalmente en
el lanzamiento y nunca se tocan de nuevo.

## Problema
Una ficha de modelo escrita una vez se convierte en ficción a medida que el modelo, los prompts y
los conjuntos de datos cambian. Una ficha que no se regenera no puede ser confiable como evidencia y
engaña al mismo auditor al que se suponía que debía satisfacer.

## Solución
Plantilla la ficha y rellénala desde la pipeline: uso previsto, resultados de evaluación (desde la
Eval Gate), conjuntos de datos (desde el AIBOM), limitaciones conocidas y propietario. Regenera en
cada cambio significativo y versiona con el modelo. Almacena la ficha como datos estructurados para
que pueda ser tanto leída por una persona como consumida por la capa de aseguramiento.

> **Ejemplo (ilustrativo)** La ficha de un clasificador se reconstruye en cada despliegue,
> extrayendo automáticamente sus puntuaciones de eval de equidad más recientes y la procedencia del
> conjunto de datos, así que la ficha que un auditor lee es la ficha que la producción produjo.

## Consecuencias
La transparencia se mantiene verdadera y se duplica como evidencia. El costo es la plantilla y el
cableado de la pipeline, y acordar qué "cambio significativo" desencadena una regeneración.

## Patrones relacionados
[AIBOM](/patterns/aibom); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondencias:** Reglamento de IA de la UE Art. 11, Art. 13 (transparencia) · ISO/IEC 42001,
ISO/IEC 42005 · NIST AI RMF (Map, Measure) · Layer 02 Inventory & Transparency.

Las etiquetas de función siguen el NIST AI RMF [1]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
