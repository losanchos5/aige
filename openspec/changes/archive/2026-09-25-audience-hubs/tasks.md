# Tasks

Worktree `D:/Documents/aige-wt/w2-hubs` (rama `wt/w2-hubs`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. La navegación, `path.ts`, `PathMap.astro` y el resto de la
portada no se tocan; lo que falte fuera del bloque va al handoff
(`D:/Documents/aige-wt/handoffs/w2-hubs.json`).

## 1. Datos y validación

- [x] 1.1 Crear `site/src/data/audiences.ts` con las seis audiencias: a quién va dirigida, roles, tres preguntas con respuesta y enlace, ruta por fases, acciones "start this week", obligaciones, nodos de `/path` y fuentes.
- [x] 1.2 Tokens `{date:<id>}` y `{date:<id>|<texto>}` para leer las fechas del registro en lugar de teclearlas.
- [x] 1.3 Crear `site/src/lib/audiences.ts`: resolución de pasos (títulos desde patrones, figuras, casos y toolkit), herramientas solo si están `live`, numeración continua y `validateAudiences()` que hace fallar la build.
- [x] 1.4 Verificar las afirmaciones de derecho contra EUR-Lex y el hub del ATRS; fuentes en el formato de la casa.

## 2. Páginas

- [x] 2.1 `site/src/components/AudienceHub.astro`: hero con migas, a quién va, preguntas, ruta, acciones, obligaciones con aviso, fuentes, otras rutas y banda final; sin script.
- [x] 2.2 `site/src/pages/for/[slug].astro` para las seis audiencias.
- [x] 2.3 `site/src/pages/for/index.astro`: tarjetas, tabla de preguntas y otras entradas; `/for/aigp` y `/for/certifications` solo si existen.
- [x] 2.4 JSON-LD `WebPage` / `CollectionPage` con migas de pan; títulos y descripciones dentro de los límites SEO.

## 3. Portada

- [x] 3.1 `site/src/lib/applies-now.ts`: filas ya aplicables y las tres próximas fechas con lo que activa cada una, desde el registro.
- [x] 3.2 `site/src/components/WhatAppliesNow.astro` e inserción en un único punto de `site/src/pages/index.astro`, respetando `site/DESIGN.md`.

## 4. Registros, tests y entrega

- [x] 4.1 Bloque propio en `SOURCE_BY_PATH` de `site/astro.config.ts`.
- [x] 4.2 Sección en `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md`.
- [x] 4.3 `site/tests/audiences.spec.ts` (datos, cálculo con fecha fija, páginas y banda).
- [x] 4.4 Build completa en verde con `bash D:/Documents/aige-wt/build.sh`.
- [x] 4.5 `openspec validate audience-hubs --strict`.
- [x] 4.6 Handoff: grupo "For you" de la navegación, entradas por audiencia en `/path`, `DETAIL_COLLECTIONS` de `nav.spec.ts`, fecha de la portada en `SOURCE_BY_PATH` y herramientas en construcción.
