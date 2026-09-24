# Tasks

Worktree `D:/Documents/aige-wt/b-ref-ids-api`, rama `wt/b-ref-ids-api`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque (navegación,
hub de recursos, capítulos, `ObligationTable` salvo una línea) no se tocan: sus cambios van al
handoff `D:/Documents/aige-wt/handoffs/b-ref-ids-api.json`.

## 1. Verificación

- [x] 1.1 Comprobar en la fuente primaria que el art. 4 está en el capítulo I y aplica desde el 2025-02-02 (art. 113(a)), que el registro de los arts. 49/71 cubre solo el anexo III y que el art. 111(2) fija el 2030-08-02 para los sistemas de autoridades públicas.
- [x] 1.2 Comprobar en la nota de la Comisión las fechas del Omnibus (anexo III 2027-12-02, anexo I 2028-08-02).

## 2. Datos

- [x] 2.1 Añadir a `frameworks.ts` el esquema v2 (`id`, `frameworkId`, `clause`, `requirement`, `appliesFrom`, `appliesStatus`, `appliesNote`, `milestones`, `systemClass`, `patterns`, `authority`, `scope`, `reviewed`) y aplicarlo a las 68 filas, fiel al capítulo 08.
- [x] 2.2 Documentar la regla de ids y crear `retiredObligationIds`.
- [x] 2.3 Alinear el art. 4 con el capítulo 12 (2025-02-02; reformulado 2026-07-27).
- [x] 2.4 Crear `site/src/lib/obligations.ts` (grupos, patrones, hermanos del crosswalk, casos por artículo).

## 3. Descargas y API

- [x] 3.1 Pasar `/resources/obligations.json` y `.csv` a `schemaVersion: 2` sin cambiar sus URL.
- [x] 3.2 Crear `site/src/lib/api.ts` (registro de conjuntos, sobre, esquemas, OpenAPI) y los endpoints de `site/src/pages/api/v1/`.
- [x] 3.3 Añadir los bloques CORS y caché a `site/public/_headers` sin tocar la CSP.

## 4. Páginas

- [x] 4.1 Crear `/obligations` con filtros CSS de estado y capa.
- [x] 4.2 Crear `/obligations/<id>` con hechos, artefacto, patrones, crosswalk, casos, fuente, JSON y cita.
- [x] 4.3 Generalizar `Citation.astro` y añadir `public/cite.js` para las páginas fuera de `Doc`.
- [x] 4.4 Crear `/resources/data` con JSON-LD `DataCatalog`.
- [x] 4.5 Añadir las rutas a `SOURCE_BY_PATH` y el `lastmod` por `reviewed` al sitemap.

## 5. Tests, registro y cierre

- [x] 5.1 Actualizar `data.spec.ts`, `block-c.spec.ts`, `seo-infra.spec.ts` y crear `api.spec.ts` (sin ejecutar Playwright).
- [x] 5.2 Anotar el cambio en `bok/CHANGELOG.md` (Unreleased (v0.5.0)) y las fuentes en `sources/SOURCES.md`.
- [x] 5.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y validar los JSON de `dist/api/v1` contra sus esquemas con un script local.
- [x] 5.4 `openspec validate reference-ids-and-api --strict`.
- [x] 5.5 Escribir el handoff y hacer commit por rutas explícitas.
