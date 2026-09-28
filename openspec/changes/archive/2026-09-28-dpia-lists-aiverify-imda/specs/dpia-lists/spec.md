# Spec Delta

## Purpose

El dataset de listas nacionales de DPIA responde qué autoridades de control del EEE exigen siempre
una evaluación de impacto para tratamientos que un sistema de IA suele hacer (IA nombrada, decisión
automatizada, perfilado, biometría, vigilancia de empleados, puntuación) y dónde esos ítems se
solapan con las áreas de alto riesgo del anexo III de la Ley de IA.

## ADDED Requirements

### Requirement: Dataset tipado de listas nacionales
El sitio SHALL definir en `site/src/data/dpia-lists.ts` una lista tipada con una fila por lista del
art. 35(4) RGPD publicada en el registro del CEPD, cada una leída entera, con país, autoridad, fecha
de adopción, dictamen del CEPD, documento del registro, original nacional cuando exista, idioma,
método (enumerado, puntuado o mixto), si nombra la IA (en su versión vigente y en la del registro),
la última actualización fechada encontrada y una nota con las salvedades. Cada ítem relevante MUST
llevar su número tal como lo imprime la fuente, su redacción original, un resumen propio, etiquetas
y, solo cuando el ítem nombra un uso dentro de un área del anexo III, esa área (con el nombre que usa
el sitio) y una nota que diga el punto y cualquier exclusión. Los indicadores por lista MUST
derivarse de las etiquetas de sus ítems, salvo "AI named", que es un dato de la lista.

#### Scenario: Salvedades visibles
- **WHEN** una lista tiene una salvedad de fuente (Eslovenia sin texto nacional, Finlandia leída en
  un archivo web, Liechtenstein con una versión nacional de 2020 posterior a la del registro)
- **THEN** la página y el JSON la muestran en la nota de esa lista

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
- **THEN** la página explica que el CEPD adoptó 22 dictámenes sobre proyectos de lista el 25 de
  septiembre de 2018 (31 en total) y que 18 listas figuran en su registro, cada cifra con su fuente

#### Scenario: Enlaces de entrada
- **WHEN** el lector abre `/toolkit/impact-assessment` (sección DPIA) o `/resources/crosswalk`
  (línea de referencias cruzadas)
- **THEN** encuentra un enlace a `/resources/dpia-lists`
