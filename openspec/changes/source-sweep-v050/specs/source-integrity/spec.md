# Spec Delta

## Purpose

El texto legal que citan los capítulos 11 a 23 lleva al texto oficial y al artículo concreto, y una
reproducción no oficial nunca pasa por fuente primaria.

## ADDED Requirements

### Requirement: Artículo de EUR-Lex en los capítulos 11 a 23
En las listas `## Sources` de los capítulos 11 a 23, cada entrada que cite un artículo o anexo del
Reglamento (UE) 2024/1689 SHALL enlazar el texto consolidado de EUR-Lex vigente en la fecha de la
última comprobación (a 2026-09-24, `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng`)
con el ancla `#art_<n>` o `#anx_<n>`, con la etiqueta `primary`. Un considerando SHALL enlazar el
texto del DOUE con el ancla `#rct_<n>`, porque el consolidado no reproduce los considerandos. La
glosa MUST describir el artículo tal como se lee en el texto enlazado; si el Ómnibus lo modificó,
la glosa MUST dar la redacción modificada. Un explorador de terceros MUST NOT figurar como fuente
del texto legal con etiqueta `primary`.

#### Scenario: Plantilla del plan de seguimiento
- **WHEN** se lee la entrada del capítulo 14 que cita el art. 72
- **THEN** enlaza `#art_72` del consolidado de 2026-07-27 y la glosa dice que la Comisión publica
  una guía con plantilla antes del 2 Sep 2027, no un acto de ejecución

#### Scenario: Considerando
- **WHEN** un capítulo cita el considerando 12 o el 27
- **THEN** la entrada enlaza el DOUE de 2024-07-12 con `#rct_12` o `#rct_27`

### Requirement: Reproducciones no oficiales de textos legales
Una entrada que cite el texto de una ley o un reglamento SHALL enlazar la publicación oficial
(EUR-Lex, GovInfo, eCFR, legislation.gov.uk u otro diario o legislador) cuando exista. Una
reproducción no oficial (gdpr-info.eu, el Legal Information Institute u otra copia recompuesta)
MUST NOT llevar la etiqueta `primary`. Un repositorio que sirve el documento original del tribunal
sin alterarlo MAY llevar `primary` y SHALL nombrarse como tal en el publicador.

#### Scenario: Fair use en el capítulo 20
- **WHEN** se lee la entrada del capítulo 20 sobre 17 U.S.C. § 107
- **THEN** enlaza GovInfo (United States Code, edición 2024) con etiqueta `primary`, y ninguna
  entrada `primary` de los capítulos 11 a 23 enlaza law.cornell.edu

### Requirement: Registro consolidado alineado
Cada entrada re-citada SHALL tener en su sección de `sources/SOURCES.md` una fila con el mismo
número, la misma URL y la misma etiqueta, en todas las copias de la sección; una fila de otra
sección MUST NOT quedar dentro de la tabla de un capítulo.

#### Scenario: Comprobación por script
- **WHEN** se comparan las listas `## Sources` de los capítulos 11 a 23 con `sources/SOURCES.md`
- **THEN** no hay entradas sin fila, filas sin entrada ni diferencias de URL o etiqueta
