# bok-principles-and-standards Specification

## Purpose
El capítulo 22 del Body of Knowledge explica los principios, el soft law, el tratado y los
estándares que dan forma a la gobernanza de IA, y traduce cada instrumento a los artefactos, las capas
del stack y los registros de evidencia que lo responden, sin sustituir al capítulo 08 como índice de
obligaciones.

## Requirements

### Requirement: Estructura y plantilla del capítulo 22
El fichero `bok/22-principles-and-standards.md` SHALL conservar el H1 «# 22. Principles, soft law and
standards» y una entradilla en blockquote de una o dos líneas bajo el H1, y MUST seguir la plantilla
de `STYLEGUIDE.md`: secciones H2/H3 sin saltos de nivel, al menos una caja «In practice» o
«Example (illustrative)» con la sintaxis de `remark-callouts`, una línea «**Maps to:**» con la frase
«Mappings are illustrative, not a claim of conformity», una sección «## What you can do this week»
con entre tres y cinco acciones justo antes de «## Sources».

#### Scenario: El capítulo se renderiza con cajas y línea Maps to
- **WHEN** se construye el sitio y se abre `/bok/principles-and-standards`
- **THEN** la página contiene al menos un `aside.callout` y al menos un párrafo `.maps-to`, y el
  último H2 antes de las fuentes es «What you can do this week»

#### Scenario: Sin rayas largas
- **WHEN** se ejecuta `content-lint` sobre la build
- **THEN** el capítulo no contiene el carácter U+2014 y la build termina con código 0

### Requirement: Cobertura de los instrumentos
El capítulo SHALL tratar, cada uno en su propia sección con anclas estables: los Principios de IA de la
OCDE (principios, recomendaciones, definición, ciclo de vida, marco de clasificación en cinco
dimensiones, OECD.AI), la Recomendación de la UNESCO, el Convenio Marco del Consejo de Europa
(CETS n.º 225), el proceso de Hiroshima del G7 y su marco de reporte, las directrices del HLEG y ALTAI,
el NIST AI RMF 1.0 (características, las 19 categorías GOVERN 1-6, MAP 1-5, MEASURE 1-4, MANAGE 1-4,
estructura del Playbook, perfiles y AI 600-1, trabajo adyacente y estado de revisión), la familia
ISO/IEC por número y título corto, los estándares armonizados del AI Act y la serie IEEE 7000. Cada
instrumento MUST ir acompañado de lo que cambia en el stack (artefacto y capa 1–5).

#### Scenario: Las 19 categorías del AI RMF están presentes
- **WHEN** un lector abre la sección del NIST AI RMF
- **THEN** encuentra una tabla con una fila por cada categoría de GOVERN 1 a MANAGE 4, cada una con una
  línea parafraseada, un artefacto y una capa

#### Scenario: Estándares ISO/IEC sin reproducir su texto
- **WHEN** el capítulo menciona una norma ISO/IEC
- **THEN** la cita por número, año y título corto con enlace a su página en iso.org, sin reproducir
  cláusulas ni texto de la norma

### Requirement: Estados fechados y verificados
Toda afirmación sensible a la fecha (estado del Convenio del Consejo de Europa, etapas de los
entregables de JTC 21, cita en el Diario Oficial, estado de revisión del AI RMF, COSAiS) SHALL llevar
«as of 2026-09-24» o «last reviewed 2026-09-24», y toda afirmación factual MUST tener una referencia
numerada en «## Sources» con el formato `[n] Title (gloss). Publisher. Date. URL (verified: tag)`. Lo
que no se haya podido confirmar MUST quedar matizado en la prosa y marcado «(verify)».

#### Scenario: Tabla de armonizados con fecha de revisión
- **WHEN** un lector abre la sección de estándares armonizados
- **THEN** ve la marca «Last reviewed 2026-09-24» y una tabla con EN 18286 y los prEN del programa JTC 21,
  cada uno con artículo del AI Act, etapa, cambio en el stack y capa

#### Scenario: Cada marcador tiene su fuente
- **WHEN** se compara cada `[n]` del texto con la lista de fuentes
- **THEN** todo `n` existe en «## Sources» y toda fuente de la lista se cita al menos una vez

### Requirement: Enlaces internos resolubles y capítulo 08 intacto
El capítulo SHALL enlazar al capítulo 08 como índice de obligaciones (anclas `#nist-ai-rmf`,
`#isoiec-42001-42005-and-42006`, `#newer-nist-ai-work`, `#what-is-not-harmonised-yet`,
`#gpai-code-of-practice`) y a patrones existentes del capítulo 05, y MUST NOT modificar
`bok/08-regulatory-map.md` ni otros ficheros compartidos; las aportaciones a ficheros compartidos van
en el handoff.

#### Scenario: Una ancla inexistente rompe la build
- **WHEN** el capítulo enlaza un ancla que no existe en la página de destino
- **THEN** `check-links` falla en la build indicando el href
