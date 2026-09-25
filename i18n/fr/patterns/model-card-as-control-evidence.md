---
lang: fr
source: bok/patterns/model-card-as-control-evidence.md
sourceHash: "cddf209c7453ca3f97f56c7e81e3b253cf62ca5f325d86017a9fe3072fc64607"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-card-as-control-evidence
title: Model Card as Control Evidence
layer: 2
order: 6
summary: "Fichas de modelo y datos regeneradas desde la canalización como evidencia estructurada, por lo que los documentos de transparencia describen el sistema tal como se ejecuta hoy."
---

# Motif : Model Card as Control Evidence

**Resumen:** Trate la ficha de modelo y la ficha de datos no como documentación de lanzamiento
escrita una vez, sino como evidencia estructurada regenerada desde la canalización, de modo que los
documentos de transparencia describan el sistema tal como es ahora y alimenten la capa de
aseguramiento.

## Objectifs
Convierta la documentación de transparencia de un PDF estático en un artefacto versionado que sea
tanto legible por humanos como consumible por máquinas, y que cuente como evidencia de control.

## Utilisateurs cibles
Ingeniero de gobernanza de IA, ingeniero de ML, DPD.

## Parties prenantes affectées
Propietarios de modelos, usuarios, auditores, interesados.

## Principes pertinents
Instrumente la compilación para producir su propia prueba; haga que la ruta gobernada sea la ruta
más fácil.

## Contexte
Un sistema sujeto a obligaciones de transparencia, donde las fichas se escriben tradicionalmente en
el lanzamiento y nunca se tocan de nuevo.

## Problème
Una ficha de modelo escrita una vez se convierte en ficción a medida que el modelo, los prompts y
los conjuntos de datos cambian. Una ficha que no se regenera no puede ser de confianza como
evidencia y engaña al mismo auditor al que se suponía que debía satisfacer.

## Solution
Plantille la ficha y rellénela desde la canalización: uso previsto, resultados de evaluación (desde
la Eval Gate), conjuntos de datos (desde el AIBOM), limitaciones conocidas y propietario. Regenere
en cada cambio significativo y versione con el modelo. Almacene la ficha como datos estructurados
para que pueda ser leída por una persona y consumida por la capa de aseguramiento.

> **Exemple (illustratif)** La ficha de un clasificador se reconstruye en cada despliegue,
> extrayendo automáticamente sus puntuaciones de eval de equidad y procedencia del conjunto de datos
> más recientes, por lo que la ficha que lee un auditor es la ficha que produjo la producción.

## Conséquences
La transparencia se mantiene verdadera y se duplica como evidencia. El costo es el templating y el
cableado de la canalización, y acordar qué "cambio significativo" desencadena una regeneración.

## Motifs connexes
[AIBOM](/patterns/aibom); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondances :** Reglamento de IA de la UE Art. 11, Art. 13 (transparencia) · ISO/IEC 42001,
ISO/IEC 42005 · NIST AI RMF (Map, Measure) · Layer 02 Inventory & Transparency.

Las etiquetas de función siguen el NIST AI RMF [1]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
