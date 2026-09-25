# Spec Delta

## Purpose

Cada figura del Body of Knowledge se puede reutilizar fuera del sitio sin perder su origen: la
build exporta ficheros versionados que llevan dentro la atribución CC BY, la fecha del contenido
cuando está fechado y los colores y tipografías del sitio, y valida las reglas que lo hacen posible.

## ADDED Requirements

### Requirement: Metadatos de figura para reutilización
`FigureDef` en `site/src/data/figures.ts` SHALL aceptar los campos opcionales `asOf` y `reviewBy`
(fechas `YYYY-MM-DD`), `license` (por defecto `CC BY 4.0`), `kind` (`infographic`, `data-viz` o
`poster`, por defecto `infographic`), `pages` (rutas del sitio fuera de los capítulos) y `data`
(tabla con `caption`, `columns`, `rows` y `source`). El módulo MUST seguir sin importaciones en
tiempo de ejecución y MUST exportar `figureExports(id, version)` como única fuente de los nombres
de fichero de las exportaciones.

#### Scenario: Figura fechada sin sello
- **WHEN** una entrada declara `asOf: '2026-09-24'` y su SVG no contiene el texto
  "As of 2026-09-24"
- **THEN** `node scripts/figures-build.mjs` falla nombrando la figura y el sello que falta

#### Scenario: Revisión vencida
- **WHEN** la fecha de `reviewBy` de una figura ya ha pasado
- **THEN** la build avisa por consola sin fallar, para no depender del reloj

#### Scenario: Data-viz sin tabla
- **WHEN** una entrada `kind: 'data-viz'` no trae `data.rows` o una fila no tiene tantas celdas
  como columnas
- **THEN** la build falla nombrando la figura

### Requirement: Presupuesto por tipo de figura
La build SHALL medir cada `src/figures/<id>.svg`, generado o hecho a mano, contra
`figureBudgetKb[kind]`: 12 KB para `infographic` y `data-viz`, 48 KB para `poster`.

#### Scenario: Póster dentro de presupuesto
- **WHEN** `discipline-map` (`kind: 'poster'`) pesa 31 KB
- **THEN** la build pasa, aunque supere los 12 KB de una infografía

### Requirement: Exportaciones versionadas con banda de atribución
Para cada figura con SVG, la build SHALL escribir en `site/public/downloads/figures/` siete
ficheros con el nombre `<id>-v<bokVersion>[-light|-dark][-1600|-3200].(svg|png)`: un SVG que
sigue `prefers-color-scheme`, un SVG claro, uno oscuro y PNG claro y oscuro de 1600 y 3200 px de
ancho. Cada fichero MUST llevar dentro la banda "aigovernanceengineer.com · <licencia> ·
v<bokVersion>", un fondo propio, colores resueltos desde `tokens.css` y `figures.css` (sin
`var()`), enlaces absolutos y `role="img"` con `<title>` y `<desc>`. Los SVG MUST declarar las
tres familias del sitio con `@font-face`; los PNG MUST dibujarse con esas mismas familias,
decodificadas de los paquetes `@fontsource` instalados, y llevar fragmentos `iTXt` con título,
autor, descripción, licencia y URL de origen. La carpeta MUST estar en `.gitignore`.

#### Scenario: Build limpia
- **WHEN** se ejecuta `npm run build` con siete figuras en `figures.ts`
- **THEN** `dist/downloads/figures/` contiene 49 ficheros y ninguno está versionado en git

#### Scenario: Cambio de token
- **WHEN** cambia un color en `tokens.css`
- **THEN** la siguiente build reescribe las exportaciones con el color nuevo, porque la caché de
  PNG se indexa por el contenido del SVG que se dibuja

#### Scenario: Glifo sin cobertura
- **WHEN** una figura usa un carácter que no está en los subconjuntos latinos de las fuentes del
  sitio
- **THEN** el PNG lo dibuja con una fuente de sistema de respaldo, y la build avisa si ninguna lo
  cubre

### Requirement: Guía visual de data-viz, pósteres, exportaciones y widgets
`site/VISUAL-GUIDE.md` SHALL fijar las reglas de data-viz (ejes, escalas, línea de fuente,
"as of" y tabla HTML alternativa), de pósteres y exportaciones (tamaños serie A, banda de
atribución, exportaciones claras y oscuras) y de widgets interactivos (funcionamiento sin JS,
aviso de no asesoramiento legal, movimiento y presupuestos de 12 KB por infografía, 48 KB por
póster y 15 KB gzip por script), con sus fuentes numeradas.

#### Scenario: Revisión de una figura nueva
- **WHEN** el orquestador revisa una figura antes de fusionarla
- **THEN** la lista de comprobación del §3 incluye el sello fechado, la tabla de data-viz, las
  exportaciones y las reglas de widgets
