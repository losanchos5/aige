# Tasks

## 1. Investigación y datos

- [x] 1.1 Mapear RSP, PF y FSF vigentes a las 13 dimensiones (handoffs/labs-refs-{rsp,pf,fsf}.json) y NIST/ISO (labs-refs-standards.json); verificar versión y fecha de cada documento
- [x] 1.2 Crear `site/src/data/frontier-crosswalk.ts` (as-of, schema 1, docs, dimensiones, columnas, refs, gaps, `frontierMatrix()`, `frontierProblems()`, fuentes); verificar que `frontierProblems()` devuelve []
- [x] 1.3 Extender `ColumnGroup` con `labs` y dar a `CrosswalkMatrix` las props `chooser` y `caption`; verificar que `/resources/crosswalk` renderiza igual (tests de resources/crosswalk en verde)

## 2. Página y exports

- [x] 2.1 Crear `resources/frontier-safety-crosswalk.astro` con las 8 secciones, JSON-LD Dataset + Breadcrumb, título ≤60 con sufijo y descripción 50-160; verificar en build
- [x] 2.2 Crear `frontier-safety-crosswalk.json.ts` y `.csv.ts` con `notice` y schemaVersion 1; verificar que parsean y cuentan lo mismo que el dataset
- [x] 2.3 OG card en `lib/og-cards.ts`; verificar `/og/...png` en dist

## 3. Cableado y contenido BoK

- [x] 3.1 nav.ts, resources/index.astro, tile en index.astro, enlace en frontier.ts (sin nombrar labs), llms.txt.ts, SOURCE_BY_PATH, lighthouserc, seo-schema PAGES, smoke paths; verificar build y smoke
- [x] 3.2 Frase con enlace en bok/08 §"Frontier-developer laws" y bok/10 §"Frontier safety frameworks"; 5 entradas de glosario en bok/09; actualizar reading list y SOURCES.md si cambia una versión; verificar content-lint

## 4. Tests y verificación

- [x] 4.1 `site/tests/frontier-crosswalk.spec.ts` bajo test-audit (invariantes, 5×N, drawer con foco, exports, anclas sin JS, axe ambos temas, 390 px); verificar con PW_PORT=4451
- [x] 4.2 Fact-check independiente (handoffs/labs-factcheck.md) y corrección; 0 verified:false en columnas de labs o listadas con nota
- [x] 4.3 code-reviewer y arreglo de CRITICAL/HIGH; `npm test` completo en verde con PW_PORT=4451

## 5. Entrega

- [x] 5.1 Commit por ruta, PR con cuerpo en handoffs/PR-labs-body.md, CI verde
- [x] 5.2 Merge coordinado con aige-18, deploy, smoke en prod (página, JSON, CSV, sitemap, llms.txt)
- [x] 5.3 Archivo OpenSpec, borrado de worktree y ramas, memoria

## Flecos (fuera de v1)

- Los tres marcos de labs no entran en `frameworks.ts`: `data.spec.ts` exige filas de obligación por instrumento y `map.spec.ts` una familia del mapa; no se inventan obligaciones.
- Sin endpoint `/api/v1/frontier-safety-crosswalk.json`: requiere esquema, entrada en `index.json`, `openapi.json` y fila en `/resources/data`.
- El documento FCF de Anthropic (Trust Center) no se leyó: solo su anuncio.
- La PF v2 no refleja el anuncio de OpenAI del 1 Sep 2026 (umbral Critical en ciberseguridad): revisar cuando OpenAI publique versión nueva.
- Portada: se quitan los tiles de Glossary y Reading list para mantener doce tiles (decisión coordinada con `ai-act-deadlines`).
