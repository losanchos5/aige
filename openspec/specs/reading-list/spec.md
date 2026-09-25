# reading-list Specification

## Purpose
La lista de lectura (`bok/10-reading-list.md`, `/resources/reading-list`) reúne las lecturas del libro
sin duplicados, cada una verificada y etiquetada por audiencia y jurisdicción, con filtros en la vista
de recursos y sin renombrar sus secciones.

## Requirements

### Requirement: Lista de lectura completa y verificada
`bok/10-reading-list.md` SHALL incluir libros, cursos, artículos canónicos (entre ellos
Datasheets for Datasets, Model Cards for Model Reporting, Raji et al. 2020 sobre auditoría
algorítmica interna y el AI Index) y cada entrada `reading_list` de los handoffs de los bloques
anteriores, sin URL duplicadas. Cada entrada MUST llevar una URL `https://` comprobada el
2026-09-24 y una etiqueta de verificación (`primary`, `secondary` o `reported`), y cada URL MUST
figurar como fila en la sección del capítulo 10 de `sources/SOURCES.md`. Ninguna entrada MUST
citar guías de estudio comerciales de certificaciones. Los encabezados H2 existentes MUST NOT
cambiar.

#### Scenario: Sin duplicados
- **WHEN** `tests/data.spec.ts` recorre la lista
- **THEN** ninguna URL aparece dos veces y todas empiezan por `https://`

#### Scenario: Secciones nuevas
- **WHEN** se abre `/bok/reading-list`
- **THEN** aparecen las secciones de libros, cursos y artículos canónicos además de las que ya
  existían, con sus títulos anteriores intactos

### Requirement: Etiquetas de audiencia y jurisdicción
Cada entrada SHALL llevar en el texto del capítulo una etiqueta
`(audience: <lista>; jurisdiction: <lista>)`. La audiencia MUST tomar valores de `engineering`,
`governance`, `legal`, `leadership` y `research`; la jurisdicción, `global` o el nombre de una
jurisdicción (`EU`, `US`, `UK`, `China`...). `site/src/lib/reading-list.ts` SHALL extraer las
etiquetas y quitarlas de la nota.

#### Scenario: Etiquetas parseadas
- **WHEN** se llama a `getReadingList()`
- **THEN** cada entrada tiene al menos una audiencia del vocabulario y al menos una jurisdicción,
  y ninguna nota contiene el texto `audience:`

### Requirement: Vista filtrable con canonical al libro
`/resources/reading-list` SHALL mostrar el mismo contenido que `/bok/reading-list` con filtros por
audiencia y jurisdicción servidos desde `public/catalogue-filter.js` (mejora progresiva) y SHALL
declarar `rel=canonical` hacia `https://aigovernanceengineer.com/bok/reading-list` en cuanto
`Base.astro` acepte el prop `canonical` (cambio entregado en el handoff). El 301 se descarta porque
perdería el filtro y porque `content-lint` exige que la página se construya con al menos 30
enlaces.

#### Scenario: Filtro por jurisdicción
- **WHEN** el lector elige la jurisdicción EU
- **THEN** solo quedan visibles las entradas etiquetadas EU, los grupos vacíos se ocultan y el
  contador se actualiza

#### Scenario: Canonical
- **WHEN** `Base.astro` reenvía `canonical` a `Seo` y se abre `/resources/reading-list`
- **THEN** la página declara un único `link rel=canonical` con
  `https://aigovernanceengineer.com/bok/reading-list`
