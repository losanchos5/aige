# harms-atlas Specification

## Purpose
El atlas de daños da al sitio un vocabulario de daños de la IA por nivel, cada fila ligada a
incidentes reales verificados, al modo de fallo, al patrón que lo controla, a la capa del stack que
lo produce y a la taxonomía del MIT AI Risk Repository.

## Requirements

### Requirement: Dataset tipado de daños
El sitio SHALL definir en `site/src/data/harms.ts` una lista tipada de daños donde cada fila tiene
`id`, `level` (uno de `individual`, `group`, `organisation`, `society`, `environment`), `harmType`,
`mechanism`, `description` redactada con palabras propias, `exampleIncidents`, `failureMode`,
`controllingPattern`, `layerN` y `mitTaxonomy`. Cada nivel MUST tener al menos dos filas. Todo
incidente de ejemplo MUST indicar su base (`AIID`, `OECD-AIM` o `AIAAIC`), su identificador, su
título y una URL comprobada.

#### Scenario: Cobertura de los cinco niveles
- **WHEN** se agrupan las filas de `harms` por `level`
- **THEN** existen los cinco niveles y cada uno tiene al menos dos filas

#### Scenario: Patrón existente enlazado por su ancla
- **WHEN** una fila nombra un patrón que existe en `site/src/data/patterns.ts`
- **THEN** la fila guarda el `id` del patrón y la página enlaza a `/bok/patterns#<id>`, que la
  comprobación de enlaces de la build MUST resolver

### Requirement: Atribución de la taxonomía del MIT
Toda fila MUST citar al menos un dominio y subdominio de la taxonomía de dominios del MIT AI Risk
Repository con su numeración y nombre literales, y la página SHALL atribuir la taxonomía (autores,
licencia CC BY 4.0 y enlace) en su lista de fuentes y en la exportación JSON.

#### Scenario: Atribución visible
- **WHEN** un lector abre `/resources/harms`
- **THEN** la página muestra la atribución del MIT AI Risk Repository con su licencia CC BY 4.0

### Requirement: Página accesible con filtro por nivel
El sitio SHALL publicar `/resources/harms` con las filas agrupadas por nivel y un filtro por nivel
hecho con controles de radio nativos y CSS (`:has()`), sin JavaScript en línea, de modo que la CSP
`script-src 'self'` se mantenga. Sin JavaScript y sin soporte de `:has()`, todas las filas MUST
seguir visibles.

#### Scenario: Filtrar por un nivel
- **WHEN** el lector marca el filtro "Organisation"
- **THEN** solo quedan visibles el grupo y las filas del nivel organización

#### Scenario: Navegación por teclado del filtro
- **WHEN** el lector tabula hasta el filtro y usa las flechas
- **THEN** el foco es visible sobre la opción activa y el filtro cambia sin ratón

### Requirement: Exportación JSON del atlas
El sitio SHALL servir `/resources/harms.json` con las filas del atlas, la versión del BoK, la
licencia, la URL de origen y la atribución de la taxonomía del MIT.

#### Scenario: Descarga del dataset
- **WHEN** un cliente pide `/resources/harms.json`
- **THEN** recibe JSON válido con un campo `harms` del mismo tamaño que el dataset y un campo
  `attribution` que nombra el MIT AI Risk Repository
