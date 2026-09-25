# Proposal

## Why

Para ser la web de referencia de la gobernanza de IA, el sitio necesita que otros puedan citar y
reutilizar sus datos con identificadores que no cambien. Hoy las filas del mapa regulatorio
(`site/src/data/frameworks.ts`, fiel al capítulo 08) no tienen id: el crosswalk las enlaza por su
texto literal, las fechas de aplicación son texto libre ("2027-12-02 (Annex III)") y las fechas que
el capítulo 08 enuncia en prosa (anexo I el 2028-08-02, sistemas heredados de autoridades públicas
el 2030-08-02) no están en ninguna fila. Los datos solo se descargan como CSV/JSON sueltos, sin
esquema, sin versión de esquema y sin CORS, y no hay una página por obligación que se pueda enlazar.

## What Changes

- **Esquema de obligación (versión 2)** en `frameworks.ts`, aplicado a las 68 filas: `id` estable
  (`AIGE-OBL-<INSTRUMENTO>-<CLÁUSULA>`, regla documentada, nunca reutilizado, lista
  `retiredObligationIds`), `frameworkId`, `clause`, `requirement` (la columna del capítulo 08),
  `appliesFrom` como fecha ISO, `appliesStatus`, `appliesNote` (el texto humano anterior),
  `milestones` (fechas posteriores: anexo I, autoridades públicas, nuevas prohibiciones, fin de
  gracia), `systemClass` (filas de la Ley de IA de la UE), `patterns` (ids de `patterns.ts` cuya
  línea "Maps to" nombra la cláusula), `authority`, `scope` y `reviewed`. El artículo 4 se alinea
  con el capítulo 12: aplica desde 2025-02-02, reformulado el 2026-07-27.
- **Descargas** `/resources/obligations.json` y `.csv`: mismas URL, `schemaVersion: 2`,
  `appliesFrom` pasa a ISO y el texto a `appliesNote`; el CSV conserva sus siete primeras columnas
  y añade las nuevas al final.
- **Páginas** `/obligations` (registro agrupado por marco, filtros CSS por estado y capa, sin
  JavaScript en línea) y `/obligations/<id>` (cláusula, marco, sujeto obligado, fecha y estado,
  fechas posteriores, artefacto, capas, patrones, hermanos del crosswalk, casos que citan el mismo
  artículo, sección del capítulo 08, fecha de revisión, enlace JSON y bloque de cita).
- **Sitemap**: las páginas de obligación usan la fecha `reviewed` de su fila como `lastmod`; el
  resto sigue con fechas de git.
- **Citation.astro** generalizado: `{title, slug?, url?, kind?, label?}`, compatible con el uso
  actual `{title, slug}`.
- **API estática `/api/v1/`**: `index.json`, un JSON por conjunto de datos (obligations,
  frameworks, crosswalk, glossary, patterns, maturity, path, chapters, jurisdictions, harms, cases,
  contracts, roles), `obligations/<id>.json`, `openapi.json` (OpenAPI 3.1) y esquemas JSON en
  `/api/v1/schemas/<nombre>.json`, todo con el mismo sobre (aviso, versión, licencia, DOI).
- **`_headers`**: CORS abierto y caché de una hora para `/api/v1/*` y los conjuntos de datos
  existentes, sin tocar la CSP.
- **`/resources/data`**: documentación de los datos abiertos y la API (tabla de endpoints,
  esquemas, licencia, versionado y promesa de estabilidad, cómo citar con el DOI, ejemplos curl).
- Fuera de alcance: navegación, tarjeta en el hub de recursos, enlaces desde la tabla de
  obligaciones y desde capítulos, cambios de texto en `bok/08-regulatory-map.md` y en otros
  ficheros compartidos (van al handoff).

## Capabilities

### New Capabilities
- `obligation-register`: identificadores estables, esquema v2 de las filas y páginas por
  obligación.
- `open-data-api`: la API estática versionada, sus esquemas, su catálogo y su documentación.

### Modified Capabilities
- Ninguna.

## Impact

- Código: `site/src/data/frameworks.ts`, `site/src/lib/obligations.ts`, `site/src/lib/api.ts`,
  `site/src/pages/obligations/`, `site/src/pages/api/v1/`, `site/src/pages/resources/data.astro`,
  `site/src/pages/resources/obligations.{json,csv}.ts`, `site/src/components/Citation.astro`,
  `site/src/lib/jsonld.ts` (aditivo), `site/astro.config.ts` (sitemap), `site/public/_headers`,
  `site/public/cite.js`, `site/src/styles/obligations.css`; una línea en
  `site/src/components/ObligationTable.astro` (`applies` → `appliesNote`).
- Consumidores del JSON anterior: `appliesFrom` cambia de semántica (texto → fecha ISO); se anuncia
  en `bok/CHANGELOG.md` con `schemaVersion: 2`.
- Tests: `site/tests/data.spec.ts`, `site/tests/block-c.spec.ts`, `site/tests/seo-infra.spec.ts` y
  el nuevo `site/tests/api.spec.ts`.
