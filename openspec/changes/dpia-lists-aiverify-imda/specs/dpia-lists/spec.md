# Spec Delta

## Purpose

El dataset de listas nacionales de DPIA responde qué autoridades de control del EEE exigen siempre
una evaluación de impacto para tratamientos que un sistema de IA suele hacer (IA nombrada, decisión
automatizada, perfilado, biometría, vigilancia de empleados, puntuación) y dónde esos ítems se
solapan con las áreas de alto riesgo del anexo III de la Ley de IA.

## ADDED Requirements

### Requirement: Dataset tipado de listas nacionales
El sitio SHALL definir en `site/src/data/dpia-lists.ts` una lista tipada con una fila por lista del
art. 35(4) RGPD publicada en el registro del CEPD, cada una con país, autoridad, fecha de adopción,
URL de la fuente, idioma del documento enlazado y estado de extracción (`full` o `metadata-only`).
Cada ítem relevante MUST llevar su número tal como lo imprime la fuente, un resumen propio,
etiquetas de tema y, solo cuando el solapamiento es claro, áreas del anexo III con el nombre que usa
el sitio. Los indicadores por lista MUST derivarse de las etiquetas de sus ítems.

#### Scenario: Lista sin extraer
- **WHEN** una lista tiene `extraction: 'metadata-only'`
- **THEN** la página muestra sus indicadores como "not extracted" y no como ausentes, y el JSON los
  publica como `null`

#### Scenario: Recuentos coherentes
- **WHEN** se cuentan las listas que nombran la IA de forma expresa
- **THEN** el número de los hallazgos coincide con las filas de la tabla que llevan ese indicador

### Requirement: Página con marco jurídico verificado
El sitio SHALL publicar `/resources/dpia-lists` con una introducción al art. 35(1), (3) y (4) RGPD,
los nueve criterios del WP248 rev.01 y la relación con la Ley de IA (art. 26(9) y art. 27(4) en el
texto consolidado de EUR-Lex), la tabla de listas, hallazgos factuales, fuentes numeradas en el
formato de la casa y la línea de crédito "Idea: Aurélie Pols · Research and data: Jorge García
Aibar". La página MUST NOT contener rayas (U+2014) ni JavaScript en línea.

#### Scenario: 22 frente a 18
- **WHEN** el lector lee los hallazgos
- **THEN** la página explica que 22 autoridades presentaron proyectos en 2018 y que 18 listas
  figuran en el registro del CEPD, cada cifra con su fuente

#### Scenario: Enlaces de entrada
- **WHEN** el lector abre `/toolkit/impact-assessment` (sección DPIA) o `/resources/crosswalk`
  (línea de referencias cruzadas)
- **THEN** encuentra un enlace a `/resources/dpia-lists`
