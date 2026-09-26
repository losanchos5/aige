# Tasks

Cada bloque trabaja en su worktree `D:/Documents/aige-wt/orp-<bloque>` sobre la rama
`wt/orp-<bloque>`, creada desde la rama de integración `feat/open-reference-project` (worktree
`D:/Documents/aige-wt/orp`), con `site/node_modules` como junction a `D:/Documents/aige-wt/int`
(nunca `npm ci` ni `npm install`). La build solo se lanza con `bash D:/Documents/aige-wt/build.sh`;
los tests son dirigidos, con `PW_PORT` propio (4401 a 4420) y `--workers=2`, nunca la suite entera,
a11y ni lhci; `astro preview` se mata al terminar. Commits por ruta, sin PNGs de
`tests/__screenshots__`, `.build.log`, `.astro-cache` ni `dist`. Los registros compartidos son
append-only con un bloque comentado por agente; los agentes de página los piden por handoff. Lo que
queda fuera del bloque va al handoff `D:/Documents/aige-wt/handoffs/orp-<bloque>.json`.

## 1. orp-core (ola 0)

- [x] 1.1 Crear `site/src/data/controls/index.ts` (tipos, etiquetas, lookups, `controlProblems()`, `retiredControlIds`, `CONTROL_ID_PATTERN`) y verificar que compila con `astro check` dentro de `build.sh`.
- [x] 1.2 Crear `controls/evaluation-environment.ts` (perfil y 9 registros esqueleto) y `controls/agent-runtime.ts` (perfil y 31 derivados) y verificar `controlProblems()` = [] en `tests/orp-core.spec.ts`.
- [x] 1.3 Crear `people.ts`, `work.ts`, `open-questions.ts` y `research.ts` con sus `*Problems()` y verificar un solo autor y cinco preguntas en el test.
- [x] 1.4 Crear `FlowDiagram`, `StatusLine`, `Provenance`, `ContributeCta`, `ControlRecord` y `OpenWork` (sin JS, clases nunca `figure-*`, `figc` ni `diagram*`) y documentarlos en `site/DESIGN.md`.
- [x] 1.5 Crear `site/src/lib/controls-md.ts` y verificar que produce Markdown sin U+2014.
- [x] 1.6 `tests/orp-core.spec.ts` en verde con `PW_PORT` propio y build verde con `build.sh`.
- [x] 1.7 Registros compartidos: ninguno propio; pedir por handoff lo que falte en `SOURCE_BY_PATH`.
- [x] 1.8 `openspec validate open-reference-project --strict` en verde.
- [x] 1.9 Handoff `orp-core.json` con contratos publicados y peticiones a otros bloques.

## 2. orp-shell (ola 0)

- [x] 2.1 `site/src/data/nav.ts`: Controls, Frontier labs & evaluators, Research, Contribute, Cases a Incidents y descripciones de grupo; verificar `tests/nav.spec.ts` (descripciones ≤ 90, sin "Body of Knowledge").
- [x] 2.2 Stubs `<!-- orp-stub -->` de `/controls`, ambos perfiles, `/frontier`, `/research`, `/research/[slug]` y `/contribute` con títulos, descripciones y todas las anclas acordadas; placeholder `#from-incident-to-control` en `/cases`; verificar `check:links`.
- [x] 2.3 Bloque `// Block orp-shell` en `SOURCE_BY_PATH` de `astro.config.ts` y verificar `seo-infra.spec`.
- [x] 2.4 `lib/og-cards.ts`, `pages/llms.txt.ts`, `lighthouserc.cjs`, `tests/seo-basics.spec.ts` (SHARED_CARDS), `tests/seo-titles.spec.ts` (HUBS) y `DETAIL_COLLECTIONS` de `tests/nav.spec.ts`; verificar `geo.spec`.
- [x] 2.5 `public/_redirects` (`/incidents` y `/incidents/*` 301) y `public/_headers` (twins `/controls/*.md` y `/research/*.md`).
- [x] 2.6 `tests/orp-shell.spec.ts` (redirecciones, cabeceras, OG 1200 px, llms, `/frontier` en For you) en verde y build verde.
- [x] 2.7 Entrada Unreleased en `bok/CHANGELOG.md`.
- [x] 2.8 `openspec validate open-reference-project --strict` en verde.
- [x] 2.9 Handoff `orp-shell.json` con la lista de stubs y anclas.

## 3. orp-openspec (ola 0)

- [x] 3.1 Leer el plan aprobado, `openspec/config.yaml`, un cambio archivado y las specs `incident-cases`, `site-navigation` y `bok-cross-links`.
- [x] 3.2 Escribir `proposal.md` (Why, What Changes, Capabilities, Out of scope, Impact).
- [x] 3.3 Escribir `design.md` con decisiones, alternativas, riesgos, migración y preguntas abiertas.
- [x] 3.4 Escribir las specs delta de las seis capacidades nuevas y las tres modificadas.
- [x] 3.5 Escribir `tasks.md` con una sección por bloque en orden de olas.
- [x] 3.6 `openspec validate open-reference-project --strict` en verde.
- [x] 3.7 Handoff `orp-openspec.json`.

## 4. orp-github (ola 0)

- [x] 4.1 Seis formularios en `.github/ISSUE_TEMPLATE/` (`control-review`, `failure-mode-proposal`, `implementation-example`, `framework-mapping`, `technical-correction`, `research-review`) con el estilo de los existentes; verificar que parsean como YAML.
- [x] 4.2 `CONTRIBUTING.md`: "Ways to contribute" y bloque "Control profiles and research notes".
- [x] 4.3 `.github/PULL_REQUEST_TEMPLATE.md`: dos comprobaciones (bump con changelog; ids existen).
- [x] 4.4 `README.md`: `research/` en el árbol, vías de contribución y mención "(draft)", sin tocar versiones.
- [x] 4.5 Comprobar que ningún fichero tocado contiene U+2014.
- [x] 4.6 `openspec validate open-reference-project --strict` en verde.
- [x] 4.7 Handoff `orp-github.json`.

## 5. orp-controls-content (ola 1)

- [x] 5.1 Contenido de `evaluation-environment.ts`: 002, 003 y 006 `specified` con referencias verificables y observación; 001, 004, 005, 007, 008 y 009 `stub` con `openQuestions`.
- [x] 5.2 Dataset `controls` en `site/src/lib/api.ts`, `itemTemplates.control`, `indexSchema`, OpenAPI y ruta `pages/api/v1/controls/[id].json.ts`; verificar `tests/api.spec.ts`.
- [x] 5.3 `public/schemas/control-observation.v1.json`, ejemplo y plantilla; `schemaOrder` en `templates.ts`; verificar `schemas-check`.
- [x] 5.4 Fila en `pages/resources/data.astro` y feed `/api/v1/controls.json` en `nav.ts`.
- [x] 5.5 `tests/controls.spec.ts` (datos y dist) en verde y build verde.
- [x] 5.6 Sección `## site/src/data/controls (open control profiles)` en `sources/SOURCES.md`.
- [x] 5.7 Pedir por handoff lo que falte en `SOURCE_BY_PATH` y viñeta de CHANGELOG.
- [x] 5.8 `openspec validate open-reference-project --strict` en verde.
- [x] 5.9 Handoff `orp-controls-content.json`.

## 6. orp-controls-runtime (ola 1)

- [x] 6.1 Contenido de `agent-runtime.ts`: 31 controles `derived` según la regla de derivación de `design.md` (D5), sin requisitos nuevos.
- [x] 6.2 Referencias al capítulo 23 por ancla y fuentes de las amenazas mapeadas reutilizando filas existentes.
- [x] 6.3 `tests/controls-runtime.spec.ts` (31 ids en orden, una semilla distinta cada uno, todos `derived`, sin U+2014) en verde y build verde.
- [x] 6.4 Sección `## site/src/data/controls/agent-runtime.ts` en `sources/SOURCES.md`.
- [x] 6.5 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan.
- [x] 6.6 `openspec validate open-reference-project --strict` en verde.
- [x] 6.7 Handoff `orp-controls-runtime.json`.

## 7. orp-controls-pages (ola 1)

- [x] 7.1 `pages/controls/index.astro` sobre el registro (sustituye el stub) con `FlowDiagram`, propiedades, perfiles, recuento calculado, ecosistema y revisión.
- [x] 7.2 `pages/controls/[profile].astro` con `ControlRecord`, tabla de mapeos con `data-label`, fuentes, JSON-LD `TechArticle` + `DefinedTermSet`; borrar los stubs estáticos.
- [x] 7.3 `pages/controls/[profile].md.ts` y `markdownAlternateFor` en `src/lib/llms.ts`.
- [x] 7.4 `tests/controls-pages.spec.ts` (anclas, TOC, un ld+json, sin script inline, twin) en verde y build verde.
- [x] 7.5 Pedir por handoff lo que falte en registros compartidos; SOURCES.md y CHANGELOG no aplican salvo fuentes nuevas.
- [x] 7.6 `openspec validate open-reference-project --strict` en verde.
- [x] 7.7 Handoff `orp-controls-pages.json`.

## 8. orp-frontier (ola 1)

- [x] 8.1 `src/data/frontier.ts` (copy, listas de enlaces, fuentes) y `pages/frontier.astro` (sustituye el stub) con las secciones en orden.
- [x] 8.2 `FlowDiagram` `frontier-chain` de siete nodos y sección `ecosystem` con hechos públicos y nota de no afiliación.
- [x] 8.3 Entrada "Frontier labs & evaluators" en `pages/for/index.astro`.
- [x] 8.4 `tests/frontier.spec.ts` (orden, siete pasos, fila y columna, citas, sin labs nombrados, sin U+2014) en verde y build verde.
- [x] 8.5 Sección propia en `sources/SOURCES.md`.
- [x] 8.6 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan.
- [x] 8.7 `openspec validate open-reference-project --strict` en verde.
- [x] 8.8 Handoff `orp-frontier.json`.

## 9. orp-research (ola 1)

- [x] 9.1 Colección `research` en `content.config.ts` con esquema estricto y `src/lib/research-pages.ts` con sus validaciones.
- [x] 9.2 `research/the-evaluation-environment-is-part-of-the-system.md` (1200 a 1800 palabras, `[n]` por afirmación, borrador v0.1.0).
- [x] 9.3 `pages/research/index.astro` y `pages/research/[slug].astro` (sustituyen stubs), `[slug].md.ts`, props `version` y `doi` en `Citation.astro`.
- [x] 9.4 `src/lib/llms.ts` (`version`, `markdownAlternateFor`) y `researchDocs()` en `src/lib/llms-corpus.ts`.
- [x] 9.5 `tests/research.spec.ts` en verde y build verde.
- [x] 9.6 Sección `## research/<slug>.md` en `sources/SOURCES.md`.
- [x] 9.7 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan; marcar el gate editorial de Jordi.
- [x] 9.8 `openspec validate open-reference-project --strict` en verde.
- [x] 9.9 Handoff `orp-research.json`.

## 10. orp-contribute (ola 1)

- [x] 10.1 `pages/contribute.astro` (sustituye el stub) con `paths` (diez vías), `good-review` y `provenance`.
- [x] 10.2 `tests/contribute.spec.ts` (diez filas con destino existente, formularios YAML válidos, sin U+2014) en verde y build verde.
- [x] 10.3 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan; SOURCES.md no aplica.
- [x] 10.4 `openspec validate open-reference-project --strict` en verde.
- [x] 10.5 Handoff `orp-contribute.json`.

## 11. orp-incidents (ola 1)

- [x] 11.1 Campos opcionales de nota en `src/data/cases.ts`, `caseNoteProblems()` y `hasIncidentNote()`.
- [x] 11.2 Notas en `nyc-mycity-chatbot`, `moffatt-v-air-canada` y `zillow-offers` solo desde sus fuentes.
- [x] 11.3 Secciones condicionales y `cs-toc` en `pages/cases/[id].astro`; `#from-incident-to-control` con `FlowDiagram` en `pages/cases/index.astro`; migas "Incidents".
- [x] 11.4 Secciones nuevas en `caseDoc()` de `src/lib/llms-corpus.ts` y bloque `cases` de `src/lib/api.ts` con claves nullable.
- [x] 11.5 `tests/incident-notes.spec.ts` en verde y build verde.
- [x] 11.6 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan; SOURCES.md solo si cambian fuentes.
- [x] 11.7 `openspec validate open-reference-project --strict` en verde.
- [x] 11.8 Handoff `orp-incidents.json` (incluye si el caso METR opcional entró o pasa a la segunda iteración).

## 12. orp-home (ola 1)

- [x] 12.1 Lede, CTAs y enlaces de la hero en `pages/index.astro` sin tocar arte, velos ni `HeroStrip`; verificar `tests/hero-art.spec.ts` y `tests/hero-field.spec.ts`.
- [x] 12.2 `SurfaceCards.astro` y banda `where-it-operates` (`mesh` `c`, `meshK` 0.4); verificar `tests/loop.spec.ts`.
- [x] 12.3 `OpenWork` en `.nl-sec`, tiles Open controls y Research notes, pie del loop con `/controls`; verificar `tests/home.spec.ts`.
- [x] 12.4 Hero y secuencia de bandas en `site/DESIGN.md`.
- [x] 12.5 Build verde con `build.sh`.
- [x] 12.6 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan; SOURCES.md no aplica.
- [x] 12.7 `openspec validate open-reference-project --strict` en verde.
- [x] 12.8 Handoff `orp-home.json`.

## 13. orp-about (ola 1)

- [x] 13.1 `pages/about/index.astro`: `research-interests`, frase de colaboración, `open-questions`, `open-work` y `dateModified` con los módulos nuevos.
- [x] 13.2 `pages/about/methodology.astro`: H2 `control-profiles-versioning-status-and-review` y los seis formularios.
- [x] 13.3 `knowsAbout` en `src/data/site.ts` con los tres temas.
- [x] 13.4 `tests/about.spec.ts` en verde y build verde.
- [x] 13.5 Pedir por handoff `SOURCE_BY_PATH` y CHANGELOG si faltan; SOURCES.md no aplica.
- [x] 13.6 `openspec validate open-reference-project --strict` en verde.
- [x] 13.7 Handoff `orp-about.json`.

## 14. orp-crosslinks (ola 1)

- [x] 14.1 `src/lib/cross-links.ts` (controles por patrón, amenaza y obligación; casos por control) sin ciclos de import.
- [x] 14.2 "Related controls" en patrones, "Open controls that evidence it" en obligaciones y línea en `/resources/threats`.
- [x] 14.3 `/agents`, `/toolkit/agent-control-profile` y "Controls anchored here" en `/stack` vía `StackLayerPanel`.
- [x] 14.4 `open` en `src/data/glossary-links.ts` y "In the open reference" en `pages/glossary/[slug].astro`.
- [x] 14.5 `src/data/chapter-links.ts` y sección `chapter-related` en `pages/bok/[slug].astro` sin editar `bok/*.md`.
- [x] 14.6 `tests/bok-cross-links.spec.ts` en verde y build verde.
- [x] 14.7 Pedir por handoff lo que falte; `chapter-links.ts` NO entra en `SOURCE_BY_PATH` de capítulos.
- [x] 14.8 `openspec validate open-reference-project --strict` en verde.
- [x] 14.9 Handoff `orp-crosslinks.json`.

## 15. orp-review-content (ola 2)

- [x] 15.1 Revisión adversarial de ambos perfiles, la nota y `/frontier`: cada afirmación con fuente abierta y verificada.
- [x] 15.2 Mapeos contrastados con `crosswalk.ts`, `frameworks.ts` y `threats.ts`; `mappings.aiuc1` solo con ids leídos en páginas públicas.
- [x] 15.3 Referencias METR del plan donde procedan, atribuidas y sin sugerir respaldo; lo no sostenible pasa a `openQuestions` o TODO.
- [x] 15.4 Voz y estilo (sin hype, sin U+2014, fechas de la casa, ninguna persona inventada); actualizar `SOURCES.md` y recuentos de tests.
- [x] 15.5 Build verde y tests de controles, nota y frontier en verde.
- [x] 15.6 `openspec validate open-reference-project --strict` en verde.
- [x] 15.7 Handoff `orp-review-content.json` con cambios y TODOs para revisión humana.

## 16. orp-mcp (ola 2)

- [x] 16.1 `DATASETS` += `controls` en el orden de `/api/v1/index.json`, plantilla `controls/{id}.json` y tipo `ControlsDoc`.
- [x] 16.2 Tools `list_controls` y `get_control`, `TOOL_NAMES`, fixtures y catálogo.
- [x] 16.3 `site/public/.well-known/mcp.json` = `mcp/server-card.json`, `site/src/pages/mcp.astro` y README (fifteen datasets); `SERVER_VERSION` preparado sin publicar hasta decisión.
- [x] 16.4 Tests del servidor y `geo.spec` en verde.
- [x] 16.5 `openspec validate open-reference-project --strict` en verde.
- [x] 16.6 Handoff `orp-mcp.json` con el redeploy del contenedor como follow-up.

## 17. orp-seo-social (ola 2)

- [x] 17.1 Head, OG, JSON-LD y canonical de las diez páginas clave y de las rutas nuevas.
- [x] 17.2 Al menos tres enlaces internos entrantes a cada ruta nueva.
- [x] 17.3 Sitemap, lastmod, `llms.txt` y twins verificados; `seo-basics` para las URLs de lhci.
- [x] 17.4 Tests SEO dirigidos en verde y build verde.
- [x] 17.5 `openspec validate open-reference-project --strict` en verde.
- [x] 17.6 Handoff `orp-seo-social.json`.

## 18. orp-analytics-cta (ola 2)

- [x] 18.1 `data-umami-event` (≤ 50 caracteres) en descargas JSON y de esquema, referencias externas, CTAs de GitHub y enlaces a `/api/v1` y `/mcp`.
- [x] 18.2 `ContributeCta` presente en perfiles, nota, `/frontier`, `/cases` y casos con nota.
- [x] 18.3 `shell-parts.spec` (límite 50) en verde y build verde.
- [x] 18.4 `openspec validate open-reference-project --strict` en verde.
- [x] 18.5 Handoff `orp-analytics-cta.json`.

## 19. orp-qa (ola 2)

- [x] 19.1 axe a 390 y 1440 px, claro y oscuro, en las rutas nuevas y modificadas.
- [x] 19.2 Teclado y foco en `FlowDiagram`, `ControlRecord` y `cs-toc`; reduced motion; sin scroll horizontal a 390 px.
- [x] 19.3 `tests/orp-journeys.spec.ts` con los recorridos del evaluador frontier, el ingeniero, el investigador y el practicante.
- [x] 19.4 Correcciones de CSS de los componentes nuevos si hacen falta; build verde.
- [x] 19.5 `openspec validate open-reference-project --strict` en verde.
- [x] 19.6 Handoff `orp-qa.json`.

## 20. Integración y release (orquestador)

- [x] 20.1 Merge de cada ola en `feat/open-reference-project` con `union-merge.py` para los registros compartidos; aplicar las peticiones de los handoffs.
- [x] 20.2 `build.sh` en verde y `grep -rl orp-stub site/dist` vacío.
- [x] 20.3 `npm test`, `test:a11y`, `test:visual` (PNGs sin stagear) y `lhci` al final en verde.
- [x] 20.4 `code-reviewer` sobre el diff integrado; CRITICAL y HIGH resueltos.
- [ ] 20.5 Aprobación editorial de Jordi de la nota de investigación.
- [ ] 20.6 PR hacia `main`, CI en verde, merge, deploy y smoke en prod (rutas 200, `/incidents` 301, JSON de controles, `llms.txt`, OG).
- [ ] 20.7 `/opsx:archive open-reference-project` y limpieza de worktrees con `rm-worktree.sh`.
