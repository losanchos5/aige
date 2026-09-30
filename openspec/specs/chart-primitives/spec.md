# chart-primitives Specification

## Purpose
TBD - created by archiving change page-visuals. Update Purpose after archive.

## Requirements

### Requirement: Primitivas SVG de build sin dependencias
El sitio SHALL generar los gráficos nuevos con módulos TypeScript en `site/src/lib/charts/` que
reciben datos tipados y devuelven `{ svg, table }` en tiempo de build, sin librerías de gráficos de
terceros ni imports de runtime. El kit MUST incluir núcleo (escalas con como mucho 6 marcas, medición
de texto, contrato accesible, sello As of y línea Source), DotMatrix, HeatGrid, Bars, TimeAxis, Lanes,
Venn3 y Ladder.

#### Scenario: Salida determinista
- **WHEN** una primitiva recibe los mismos datos dos veces
- **THEN** devuelve el mismo SVG byte a byte y una tabla con las mismas filas que los datos

#### Scenario: Etiqueta que no cabe
- **WHEN** una etiqueta medida supera el espacio disponible
- **THEN** la build falla con un mensaje que nombra la etiqueta, en vez de recortarla

### Requirement: Contrato accesible y de tema
Cada gráfico MUST llevar `role="img"` (o `group` si contiene enlaces) con `<title>` y `<desc>`
enlazados, una tabla alternativa en `<details>`, colores solo desde tokens de `tokens.css` válidos en
claro y oscuro, estado codificado por forma (relleno, contorno o trama) y no solo por color, y ningún
texto atenuado con `opacity`. El movimiento MUST limitarse a transform y respetar
`prefers-reduced-motion`.

#### Scenario: Axe en ambos temas
- **WHEN** axe recorre una página con un gráfico nuevo en claro y oscuro a 1440 y 390 px
- **THEN** no hay violaciones serious ni critical

#### Scenario: Móvil sin scroll de página
- **WHEN** la página se abre a 390 px
- **THEN** el gráfico muestra su versión estrecha o scrolla dentro de una región enfocable etiquetada, y la página no tiene scroll horizontal

### Requirement: Componente Chart con dos modos de estilo
`site/src/components/Chart.astro` SHALL envolver cualquier primitiva con figcaption, tabla en
`<details>` y par ancho/estrecho. En modo `.figc` MUST usar las clases de `figures.css`; en modo
`.chart` MUST usar su propia hoja y no enlazar `figures.css`, `prose.css` ni `diagrams.css`.

#### Scenario: Página vetada por perf
- **WHEN** `/`, `/resources`, `/resources/crosswalk`, `/cases` o `/patterns` incluyen un gráfico
- **THEN** `tests/perf.spec.ts` sigue en verde porque el gráfico usa el modo `.chart`

### Requirement: CSP y copia
Los gráficos MUST NOT añadir `<script>` inline; la interacción va en ficheros `public/*.js` de como
mucho 15 KB gzip con datos en `<script type="application/json">`. Ningún texto de gráfico MUST
contener la raya U+2014.

#### Scenario: Build con content-lint
- **WHEN** se ejecuta `npm run build`
- **THEN** content-lint no encuentra rayas en los SVG ni en las tablas generadas
