# Proposal

## Why

El crosswalk de `/resources/crosswalk` (12 temas × 4 columnas: UE, ISO/IEC 42001, NIST AI RMF y
China) responde "¿qué artículo de cada marco trata el tema X?", pero se queda corto para ser la
referencia de gobernanza de IA: no cubre temas que un programa real tiene que mapear (prácticas
prohibidas, equidad, privacidad, explicabilidad, alfabetización, evaluación de la conformidad,
modelos de propósito general, propiedad intelectual, identidad de agentes, procedencia del
contenido, sandboxes, impacto ambiental, cambio y retirada), ni instrumentos que los capítulos 11 a
22 ya citan (Código de buenas prácticas GPAI, RGPD, CSA AICM, OWASP, Corea, Reino Unido, Singapur,
ISO/IEC 42005 y 23894, tratados y derecho blando, normas europeas). Además, el lector que parte de
un marco y quiere llegar a otro (de la Ley de IA a ISO/IEC 42001, por ejemplo) no puede ver el mapeo
cláusula a cláusula, ni los huecos, ni exportarlo en un formato que las herramientas GRC lean.

## What Changes

- **Datos v2** (`site/src/data/crosswalk.ts`): 25 temas (los 12 anteriores con sus `id` intactos y
  13 nuevos) y 14 columnas; instrumentos propios del crosswalk que aún no están en `frameworks.ts`
  (RGPD, UK ATRS, marco agéntico de Singapur, Convenio del Consejo de Europa, Principios de la OCDE,
  Código de Hiroshima del G7, prEN 18228 y prEN 18229-1) con `frameworkById` que busca primero en
  `frameworks.ts`; cada referencia conserva `strength`, `verified` honesto y `url`, y gana un
  identificador de cláusula (`clauseId`) apto como token OSCAL y un enlace opcional `see` al BoK.
  Se incorporan todas las entradas `crosswalk` de los handoffs de los capítulos 11 a 22 y del atlas.
- **Matriz**: selector de columnas (JavaScript en fichero propio, preferencia en `localStorage`
  con `try/catch`) para que la tabla siga siendo usable a 390 px; sin JavaScript se ven todas.
- **Explorador** en `/resources/crosswalk#explore`: marcos de origen (uno o varios) y destino,
  vista lado a lado por tema, vista de huecos (cláusulas del destino sin mapeo desde los orígenes),
  filtro por tema, solo verificadas, fragmento de URL compartible y descargas de la selección en
  CSV, JSON y colección de mapeos OSCAL 1.2.3 (modelo Control Mapping), con el aviso "illustrative,
  not a claim of conformity" dentro de cada fichero. Todo en `public/crosswalk-explorer.js`, sin
  scripts en línea y sin `blob:` en `img-src`.
- **Exportaciones** `/resources/crosswalk.json` y `.csv`: `schemaVersion` 2, columnas e
  instrumentos, `clauseId`, columna, nombre corto del marco y `see`; mismas URL.
- **Pruebas**: `data.spec.ts` y `resources.spec.ts` actualizadas; prueba nueva del explorador y de
  la estructura OSCAL.
- **Registros compartidos**: `sources/SOURCES.md` (sección nueva), `bok/CHANGELOG.md` (viñetas en
  "Unreleased (v0.5.0)").
- Fuera de alcance: `frameworks.ts`, `map.ts`, navegación, capítulos y glosario; lo que requieren
  va al handoff `D:/Documents/aige-wt/handoffs/b-data-crosswalk.json`.

## Capabilities

### New Capabilities
- `topic-crosswalk`: el dataset tema × marco, la matriz con selector de columnas, el explorador
  cláusula a cláusula con vista de huecos y las exportaciones CSV, JSON y OSCAL.

### Modified Capabilities
- (ninguna)

## Impact

- **Sitio** (`site/`): modificados `src/data/crosswalk.ts`, `src/pages/resources/crosswalk.astro`,
  `src/pages/resources/crosswalk.json.ts`, `src/pages/resources/crosswalk.csv.ts`,
  `src/components/CrosswalkMatrix.astro`, `src/components/CrosswalkDrawer.astro`,
  `public/crosswalk.js`, `tests/data.spec.ts`, `tests/resources.spec.ts`; nuevos
  `public/crosswalk-explorer.js`, `src/styles/crosswalk-explorer.css` y
  `tests/crosswalk-explorer.spec.ts`.
- **Efecto indirecto**: el mapa de la disciplina (`map.ts`) enumera temas y columnas del crosswalk,
  así que `src/figures/discipline-map.svg` se regenera en la build con más nodos; se avisa en el
  handoff.
- **Verificación**: `bash D:/Documents/aige-wt/build.sh` en verde y
  `openspec validate crosswalk-v2-explorer-oscal --strict`.
