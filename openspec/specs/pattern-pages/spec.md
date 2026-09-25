# pattern-pages Specification

## Purpose
Cada patrón del catálogo tiene su propia página estable, enlazable y citable, y el capítulo 05 sigue
siendo el catálogo que conserva todas las anclas publicadas; la build falla si el fichero del patrón,
el índice `data/patterns.ts` y el catálogo divergen o si una cita no resuelve.

## Requirements

### Requirement: Un fichero y una página por patrón
Cada patrón SHALL vivir en `bok/patterns/<slug>.md` (colección `patterns`) con frontmatter tipado
`id`, `title`, `layer`, `secondaryLayer` opcional, `order` y `summary` (50 a 160 caracteres), y
SHALL publicarse en `/patterns/<slug>` con el layout de capítulo: migas hacia `/patterns`, raíl con el
capítulo 05 activo, TOC, tarjetas de glosario, lista `## Sources` propia, bloque "Cite this pattern"
con la URL `/patterns/<slug>` y paginación anterior/siguiente en el orden del catálogo. El `id` MUST
coincidir con el nombre del fichero y el esquema MUST rechazar campos desconocidos.

#### Scenario: Frontmatter con un campo de más
- **WHEN** un fichero de patrón añade un campo que el contrato no define
- **THEN** la build falla en la validación de la colección `patterns`

#### Scenario: Paginación
- **WHEN** se abre `/patterns/eval-gate-in-ci`
- **THEN** el pie enlaza "Previous pattern" a `/patterns/policy-card` y "Next pattern" a
  `/patterns/adversarial-red-team-suite`

### Requirement: Fichero, índice y catálogo sincronizados
La build SHALL fallar cuando el conjunto de ficheros de `bok/patterns/` difiera de las entradas de
`site/src/data/patterns.ts`, cuando `title`, `layer`, `secondaryLayer` u `order` de un fichero no
coincidan con su entrada, cuando el H1 no sea `Pattern: <title>`, cuando las capas de su línea
**Maps to** no coincidan con su frontmatter, o cuando `bok/05-patterns.md` no tenga la sección
`## Pattern: <title>` con un enlace a `/patterns/<slug>`.

#### Scenario: Patrón añadido solo como fichero
- **WHEN** se añade `bok/patterns/<nuevo>.md` sin entrada en `patterns.ts`
- **THEN** la build falla nombrando los ficheros y el índice que difieren

### Requirement: Anclas publicadas del catálogo intactas
El capítulo 05 SHALL conservar, con el mismo texto, cada encabezado `## Pattern: <nombre>`, de modo
que toda URL `/bok/patterns#pattern-*` publicada siga resolviendo, y SHALL mantener la introducción,
la plantilla de patrón y el mapa de patrones. Bajo cada encabezado MUST haber un resumen de dos o
tres frases y un enlace a la página del patrón. Los diagramas de patrón MUST NOT incrustarse en el
capítulo.

#### Scenario: Enlace antiguo desde otro capítulo
- **WHEN** un capítulo o un conjunto de datos enlaza `/bok/patterns#pattern-kill-switch--circuit-breaker`
- **THEN** `check-links` encuentra el ancla en `/bok/patterns` y el lector llega al resumen con el
  enlace a `/patterns/kill-switch-circuit-breaker`

### Requirement: Citas que resuelven por página
En cada fichero de patrón y en el catálogo, cada marcador `[n]` fuera de código SHALL tener su fila
`[n]` bajo `## Sources`, las filas MUST numerarse 1..N sin huecos y cada fila MUST citarse al menos
una vez. Cada página de patrón SHALL nombrar las fuentes de sus identificadores OWASP Agentic y de
sus funciones NIST AI RMF bajo la línea **Maps to** junto al aviso "Mappings are illustrative, not a
claim of conformity". Las filas MUST figurar en `sources/SOURCES.md`.

#### Scenario: Fuente sin citar
- **WHEN** una página de patrón conserva en `## Sources` una fila que su texto ya no cita
- **THEN** la build falla indicando el fichero y el número de la fuente

### Requirement: Diagramas colocados en la página del patrón
`DiagramPlacement` SHALL aceptar `pattern`, y `rehype-diagrams` SHALL insertar una colocación con
`pattern` solo en `bok/patterns/<pattern>.md`, resolviendo `at`, `section` y `sub` contra los
encabezados de ese fichero. Una colocación con `at: 'lead'` MUST quedar tras el Summary y antes del
primer H2.

#### Scenario: Diagrama del Eval Gate
- **WHEN** se construye `/patterns/eval-gate-in-ci`
- **THEN** la figura `eval-gate-ci` aparece una vez, antes del H2 "Objectives", y `/bok/patterns`
  no contiene ninguna `figure.diagram`

### Requirement: Índice por capa
`/patterns` SHALL listar cada patrón una vez, como tarjeta enlazada a su página, en la sección de
su capa principal (las cinco capas en orden canónico), marcar la segunda capa cuando exista y
funcionar sin JavaScript (lista de salto por anclas). La página MUST quedar indexada por Pagefind.

#### Scenario: Patrón de dos capas
- **WHEN** se lista FRIA-as-Code
- **THEN** aparece en Layer 01 Govern-as-Code con la marca "Also Layer 02 Inventory & Transparency"

### Requirement: Superficies legibles por máquina y PDF
`/llms.txt` SHALL listar `/patterns` y cada `/patterns/<slug>` con su resumen, además de
`/resources/harms`, `/cases`, `/resources/templates` y `/resources/contracts`. `/llms-full.txt`
SHALL incluir el texto completo de cada patrón, sin frontmatter, justo después del capítulo 05 y en
orden de catálogo. El sitemap SHALL fechar `/patterns` y cada página de patrón desde `SOURCE_BY_PATH`.
El PDF de `build/build_pdf.py` SHALL incluir cada patrón completo en la posición del capítulo 05 y
todos los capítulos `bok/NN-*.md`. La comprobación de compatibilidad de `schemas-check.mjs` SHALL
leer las formas JSON del catálogo y de `bok/patterns/*.md`.

#### Scenario: Lectura por un LLM
- **WHEN** un cliente descarga `/llms-full.txt`
- **THEN** encuentra `# Pattern: Eval Gate in CI` con `Source: https://aigovernanceengineer.com/patterns/eval-gate-in-ci`
  entre el capítulo 05 y el capítulo 06, y ninguna línea de frontmatter

#### Scenario: Formas JSON tras la división
- **WHEN** se ejecuta `node scripts/schemas-check.mjs`
- **THEN** informa de 5 formas del capítulo 05 compatibles, leídas de las páginas de patrón
