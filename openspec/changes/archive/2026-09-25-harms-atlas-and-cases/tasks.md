# Tasks

Worktree `D:/Documents/aige-wt/x-harms-cases` (rama `wt/x-harms-cases`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos (nav, capítulos, glosario) no se
tocan: sus cambios van al handoff.

## 1. Investigación y verificación

- [x] 1.1 Verificar los identificadores y títulos de cada incidente de ejemplo en AIID (`/cite/<id>`), AIAAIC y OECD AIM.
- [x] 1.2 Verificar la taxonomía de dominios del MIT AI Risk Repository (7 dominios, 24 subdominios) y su licencia CC BY 4.0 en la versión publicada.
- [x] 1.3 Verificar cada caso contra su fuente primaria (sentencia, regulador, informe oficial, artículo original) o marcarlo como `reported`.

## 2. Datos

- [x] 2.1 Crear `site/src/lib/sources.ts` (tipo `Source`, formato de la casa y troceo de marcadores `[n]`).
- [x] 2.2 Crear `site/src/data/harms.ts` con al menos dos filas por nivel, patrones por `id` de `patterns.ts` y taxonomía del MIT literal.
- [x] 2.3 Crear `site/src/data/cases.ts` con 8-12 casos y fuentes numeradas (11 casos).

## 3. Páginas

- [x] 3.1 Crear `site/src/pages/resources/harms.astro` con filtro por nivel en CSS puro y JSON-LD `Dataset`.
- [x] 3.2 Crear `site/src/pages/resources/harms.json.ts` (exportación con atribución del MIT).
- [x] 3.3 Crear `site/src/pages/cases/index.astro` y `site/src/pages/cases/[id].astro` con JSON-LD y migas de pan.
- [x] 3.4 Añadir `/resources/harms`, `/cases` y las rutas por caso a `SOURCE_BY_PATH` en `site/astro.config.ts`.

## 4. Verificación y entrega

- [x] 4.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 4.2 Ejecutar `openspec validate harms-atlas-and-cases --strict` hasta que pase.
- [x] 4.3 Escribir `D:/Documents/aige-wt/handoffs/x-harms-cases.json` (navegación, hub, glosario, enlaces cruzados, lista de lectura, rutas, notas).
- [x] 4.4 Commits por ruta explícita con mensajes convencionales en español.
