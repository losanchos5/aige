# incident-cases Specification

## Purpose
Los casos cuentan incidentes públicos de IA como post-mortems de ingeniería: qué pasó, el modo de
fallo, el control o patrón que faltó, la evidencia que habría existido y las obligaciones que el
caso toca hoy, cada afirmación con su fuente numerada.

## Requirements

### Requirement: Dataset tipado de casos verificados
El sitio SHALL definir en `site/src/data/cases.ts` entre 8 y 12 casos. Cada caso MUST tener `id`,
título, jurisdicción, año, qué pasó, modo de fallo, control que faltó (con patrones existentes por
`id` cuando los hay), evidencia que habría existido, obligaciones que toca hoy, daños del atlas
relacionados, registros de incidente (AIID cuando existe) y una lista de fuentes numeradas en el
formato de la casa con etiqueta de verificación (`primary`, `secondary` o `reported`). Un caso
sostenido solo por prensa MUST marcarse como `reported` y decirlo en su texto.

#### Scenario: Cada marcador tiene fuente
- **WHEN** un texto del caso contiene un marcador `[n]`
- **THEN** existe la fuente `n` en la lista de fuentes del caso

#### Scenario: Caso sostenido solo por prensa
- **WHEN** un caso solo tiene fuentes secundarias o de prensa
- **THEN** el caso lleva `evidence: 'reported'` y la página muestra la etiqueta "Reported"

### Requirement: Índice y páginas por caso
El sitio SHALL publicar `/cases` con una tarjeta por caso y `/cases/<id>` como rutas estáticas
generadas desde el dataset. Cada página de caso MUST mostrar las secciones What happened, Failure
mode, Which control would have caught it, The evidence that would have existed, Obligations it
touches today y Sources, y enlazar al atlas de daños y al registro de incidente.

#### Scenario: Rutas estáticas por caso
- **WHEN** se construye el sitio
- **THEN** existe un HTML por cada `id` de `cases` bajo `/cases/` y todos sus enlaces internos
  resuelven en la comprobación de enlaces

#### Scenario: Descargo de responsabilidad
- **WHEN** un lector abre una página de caso
- **THEN** la página dice que el análisis es ilustrativo, no una determinación legal ni una
  afirmación de conformidad

### Requirement: lastmod del sitemap para las rutas nuevas
`site/astro.config.ts` MUST incluir en `SOURCE_BY_PATH` las rutas `/resources/harms`, `/cases` y
una entrada por caso generada con un `map` sobre `cases`.

#### Scenario: Caso nuevo en el sitemap
- **WHEN** se añade un caso a `cases.ts` y se construye el sitio
- **THEN** su URL aparece en el sitemap con un `lastmod` calculado desde sus ficheros fuente
