# Tasks

Integración en `D:/Documents/aige-wt/orp2`, rama `feat/open-reference-project-2` (desde `origin/main`
970a4a0). Cada bloque trabaja en `D:/Documents/aige-wt/orp2-<bloque>` sobre `wt/orp2-<bloque>`, creado
con `bash D:/Documents/aige-wt/mk-worktree.sh orp2-<bloque> feat/open-reference-project-2`
(junction de `site/node_modules` a `aige-wt/int`; nunca `npm ci` ni `npm install`). Build solo con
`bash D:/Documents/aige-wt/build.sh`; tests dirigidos con `PW_PORT` propio (4431 a 4449) y
`--workers=2`, nunca la suite entera, a11y ni lhci; matar `astro preview` al terminar. Commits por
ruta (`feat(site): …`), sin PNGs de `tests/__screenshots__`, `.build.log`, `.astro-cache` ni `dist`,
sin U+2014 en ningún fichero. Los bloques de página no editan registros compartidos (`astro.config.ts`,
`lib/og-cards.ts`, `pages/llms.txt.ts`, `lighthouserc.cjs`, `tests/nav.spec.ts`,
`tests/seo-basics.spec.ts`, `tests/seo-titles.spec.ts`, `public/_headers`): lo piden en el handoff
`D:/Documents/aige-wt/handoffs/orp2-<bloque>.json` y el integrador lo aplica. Excepción: cada perfil
nuevo añade su import en `controls/index.ts` y su sección en `sources/SOURCES.md`.

## 1. orp2-core (ola 0)

- [x] 1.1 Tipos en `controls/index.ts`: `derivedFrom?` (`pattern|schema|chapter`), `pageTitle?`, `pageDescription?` en `Control`; `doi?`, `conceptDoi?` en `ControlProfile`; `observationExamples` concatenado por perfil; verificar con `astro check` dentro de `build.sh`.
- [x] 1.2 `site/src/data/aiuc1.ts` (ids leídos en `standard.aiuc-1.com/llms.txt` y en la página pública de cada id usado, con `verified`) y `site/src/data/nist-ai-rmf.ts` (subcategorías del NIST AI 100-1 del documento primario, al menos todas las de GOVERN/MAP/MEASURE/MANAGE que citen los perfiles previstos); verificar que todos los ids ya usados en el registro resuelven.
- [x] 1.3 `controlProblems()`: `derivedFrom` resuelve; `aiuc1` contra el índice sin retirados; `specified` con 2-4 verificaciones, `pageTitle` ≤ 70 y `pageDescription` 70-160 únicos, dos ejemplos pass/fail; slugs de perfil reservados (`crosswalk`, `examples`); prefijo único por perfil; verificar con casos negativos en `tests/orp-core.spec.ts`.
- [x] 1.4 `controlPath()` devuelve la página para `specified` y el ancla para el resto; `@id` estable del `TechArticle` de perfil; `profileCitation()`; verificar que `check:links` sigue verde.
- [x] 1.5 Registros derivados del registro: `SOURCE_BY_PATH` y `lastmod` (desde `profile.updated`) en `astro.config.ts` para perfiles, páginas de control y `/controls/crosswalk`; líneas de `llms.txt.ts` iteradas; `DETAIL_COLLECTIONS` por perfil generado; `dateModified` de `/controls` = máximo de `profile.updated`; verificar `seo-infra.spec` y `geo.spec` dirigidos.
- [x] 1.6 Mantenimiento: recuentos de `orp-core.spec.ts`, `controls.spec.ts` y `about.spec.ts` derivados del registro; rango de `frontier.ts` derivado; `personSlug` exportado en `lib/jsonld.ts` y usado en `people.ts`; verificar los tres specs dirigidos.
- [x] 1.7 Build verde con `build.sh`, `openspec validate open-reference-project-2 --strict` verde y handoff `orp2-core.json` con contratos publicados.

## 2. orp2-evalenv (ola 0)

- [x] 2.1 Leer `D:/Documents/aige-wt/handoffs/research-openai-alignment.md` y `research-labs.md` y reabrir cada URL que se cite; decidir por control (001, 004, 005, 007, 008, 009) si se promueve o sigue `stub`, y registrar el motivo en el handoff.
- [ ] 2.2 Para cada promovido: 2-4 verificaciones repetibles, evidencia con `schemaId` publicado, notas de implementación a nivel de configuración, `observation`, `pageTitle`, `pageDescription` y referencias verificadas; también `pageTitle`/`pageDescription` para 002, 003 y 006.
- [x] 2.3 Dos observaciones de ejemplo (pass y fail) por promovido en `public/controls/examples/`, validadas por `schemas-check`.
- [x] 2.4 Perfil v0.2, `updated`, changelog v0.2 (promovidos y los que siguen `stub` con motivo), revisores vacíos; sección de `sources/SOURCES.md` actualizada en orden de primer uso.
- [x] 2.5 Build verde, `tests/controls.spec.ts` dirigido verde y handoff `orp2-evalenv.json`.

## 3. Integración ola 0 (integrador)

- [ ] 3.1 Merge de `wt/orp2-core` y `wt/orp2-evalenv` en `feat/open-reference-project-2`, build verde y `controlProblems()` vacío con las reglas nuevas.

## 4. orp2-data, orp2-deploy, orp2-assure (ola 1, un agente por perfil)

- [ ] 4.1 `data-admission-and-privacy.ts`: 8-12 controles `AIGE-CTL-DATA-NNN` derivados de `dataset-admission-gate`, `training-data-rights-ledger`, `downstream-use-register`, esquemas `dataset-admission-record`, `dataset-card`, `training-record`, capítulos 14 y 19, obligaciones GDPR y Art. 10; verificar recuento y `derivedFrom` en `controls.spec.ts`.
- [ ] 4.2 `deployment-and-monitoring.ts`: 10-15 controles `AIGE-CTL-DEPLOY-NNN` desde `staged-rollout-rollback-criteria`, `human-in-the-loop-gate`, `shadow-ai-discovery`, `sanctioned-ai-gateway`, esquemas de despliegue y monitorización, capítulos 15-17, Arts. 9, 14, 26, 72, 73; verificar igual.
- [x] 4.3 `assurance-and-evidence.ts`: 8-12 controles `AIGE-CTL-ASSURE-NNN` desde `machine-readable-evidence-oscal`, `continuous-assurance-telemetry`, `eval-gate-in-ci`, `model-artefact-integrity`, `aibom`, esquemas de evidencia y pruebas, capítulos 05, 14, 18, 22, ISO/IEC 42001 cláusula 9, NIST AI RMF MEASURE/MANAGE, AIUC-1 dominio E; verificar igual.
- [x] 4.4 Cada perfil: import en `controls/index.ts`, sección en `sources/SOURCES.md` solo con filas reutilizadas, mapeos solo a ids existentes; build verde y handoff `orp2-<perfil>.json`.

## 5. orp2-crosswalk (ola 1)

- [ ] 5.1 `site/src/lib/controls-crosswalk.ts` (`buildControlsCrosswalk`) y clave `crosswalk` en el dataset `controls` con esquema cerrado; verificar `schemas-check` y el JSON validado.
- [ ] 5.2 `pages/controls/crosswalk.astro` (una tabla por marco con `data-label`, vista inversa por perfil, avisos, nota AIUC, sin JS) y `crosswalk.md.ts`; enlace desde `/controls` (`#ecosystem`).
- [ ] 5.3 `tests/controls-crosswalk.spec.ts` (ids resuelven, pares = registro, sin "compliant"/"certified"/U+2014, un ld+json `CollectionPage`); build verde y handoff con peticiones (OG, `_headers`, lhci, HUBS).

## 6. orp2-pages (ola 1)

- [ ] 6.1 `pages/controls/[profile]/[control].astro` y `[control].md.ts` solo para `specified`, con registro, casos, patrones, obligaciones, amenazas, ejemplos descargables, CTA, cita, JSON y `TechArticle` con `isPartOf`.
- [ ] 6.2 La sección de cada control `specified` en su perfil enlaza su página desde `<main>`.
- [ ] 6.3 `tests/control-pages.spec.ts` (una página por `specified`, ninguna para el resto, canonical, ld+json, twin, títulos y descripciones únicos); build verde y handoff con peticiones.

## 7. orp2-release (ola 1)

- [ ] 7.1 Mostrar `doi`/`conceptDoi` en cita, `Provenance`, registro JSON del perfil y front matter del twin (o el DOI de concepto del proyecto si no hay); verificar en `controls.spec.ts`.
- [ ] 7.2 `site/scripts/profile-release.mjs` (paquete en `dist/releases/`, `CITATION.cff`, README, metadatos Zenodo, dry-run sin red, sandbox por defecto, `--production`, `--publish`) y test en dry-run; `site/scripts/README` o sección en `CONTRIBUTING.md` con los pasos y por qué no la integración GitHub-Zenodo.
- [ ] 7.3 Build verde y handoff `orp2-release.json`.

## 8. Integración ola 1 (integrador)

- [ ] 8.1 Merge de los seis bloques, `union-merge.py` en registros append-only, peticiones de handoff aplicadas (`og-cards`, `_headers`, `lighthouserc.cjs`, `seo-titles` HUBS, `seo-basics`), entrada en `bok/CHANGELOG.md`; build verde con ≥ 70 controles y `controlProblems()` vacío.

## 9. Ola 2: revisión

- [ ] 9.1 Revisión de contenido adversarial: cada afirmación de los controles nuevos o promovidos contra su fuente abierta (URL, cita, fecha); cada `derived` contra su patrón o esquema; mapeos AIUC-1 contra la página pública; corregir o degradar a `stub`/`derived`.
- [ ] 9.2 SEO/OG + QA/a11y: títulos, descripciones, ld+json, OG, `llms.txt`, sitemap, recorrido `/controls` → perfil → control → crosswalk en móvil y escritorio, sin grupo de nav nuevo; comprobar que el servidor MCP no depende de slugs de perfil fijos.
- [ ] 9.3 `code-reviewer` sobre el diff completo; corregir CRITICAL y HIGH.

## 10. Verificación, PR y despliegue (integrador)

- [ ] 10.1 `build.sh` → `npm test` completo → muestra a11y → visual (baselines sin stagear) → lhci (`/controls`, un perfil, una página de control, el crosswalk: a11y/BP/SEO = 1, perf ≥ 0.95).
- [ ] 10.2 Barrido de `dist`: sin U+2014, sin "certified", sin "standard" sobre controles propios; `/api/v1/controls.json` valida.
- [ ] 10.3 PR con cuerpo en `D:/Documents/aige-wt/handoffs/PR-orp2-body.md`, CI verde.
- [ ] 10.4 Merge y deploy con autorización de Jordi; smoke en producción (rutas nuevas 200, twins con `Link` canonical, JSON, llms.txt).
- [ ] 10.5 DOI: dry-run documentado; depósito real solo con token y visto bueno de Jordi, luego DOI en el perfil y línea de changelog.
- [ ] 10.6 `openspec validate --strict`, `opsx:archive`, limpieza de worktrees `orp2-*` y memoria actualizada.
