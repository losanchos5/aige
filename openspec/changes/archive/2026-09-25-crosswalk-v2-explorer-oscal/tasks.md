# Tasks

Worktree `D:/Documents/aige-wt/b-data-crosswalk` (rama `wt/b-data-crosswalk`). La build solo se
lanza con `bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque
(`frameworks.ts`, `map.ts`, navegación, capítulos, glosario) no se tocan: sus cambios van al handoff.

## 1. Investigación y verificación

- [x] 1.1 Verificar la versión vigente del modelo OSCAL Control Mapping y sus campos (metaesquema y esquema JSON de la versión publicada).
- [x] 1.2 Verificar contra la fuente primaria los identificadores nuevos: CSA AICM (paquete legible por máquina), OWASP LLM 2026 y Agentic 2026 (PDF), Código GPAI (tres capítulos), UK DUAA s. 80 y ATRS v4.0, marcos de Singapur, NIST AI RMF 1.0, títulos de artículos de la Ley de IA, China (texto de la CAC).
- [x] 1.3 Marcar `verified: false` con nota donde la fuente primaria no se pudo abrir (texto ISO, prEN).

## 2. Datos

- [x] 2.1 Ampliar `site/src/data/crosswalk.ts`: 13 temas nuevos sin tocar los `id` existentes, 14 columnas, instrumentos propios del crosswalk, `clauseId` y `see`.
- [x] 2.2 Incorporar todas las entradas `crosswalk` de los handoffs (capítulos 11 a 22 y atlas de daños), con las URL de la Ley de IA en el texto consolidado de EUR-Lex.
- [x] 2.3 Actualizar `crosswalk.json.ts` y `crosswalk.csv.ts` (`schemaVersion` 2, campos nuevos, mismas URL).

## 3. Interfaz

- [x] 3.1 Selector de columnas en la matriz (`CrosswalkMatrix.astro`, `public/crosswalk.js`), usable a 390 px.
- [x] 3.2 Explorador en `/resources/crosswalk#explore` (`public/crosswalk-explorer.js`, `src/styles/crosswalk-explorer.css`): orígenes, destino, lado a lado, huecos, tema, solo verificadas, fragmento compartible.
- [x] 3.3 Descargas de la selección en CSV, JSON y OSCAL 1.2.3 con el aviso dentro del fichero.

## 4. Pruebas, registros y entrega

- [x] 4.1 Actualizar `tests/data.spec.ts` y `tests/resources.spec.ts`; añadir `tests/crosswalk-explorer.spec.ts`.
- [x] 4.2 Añadir la sección del crosswalk v2 a `sources/SOURCES.md` y las viñetas a `bok/CHANGELOG.md`.
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 4.4 Ejecutar `openspec validate crosswalk-v2-explorer-oscal --strict` hasta que pase.
- [x] 4.5 Escribir `D:/Documents/aige-wt/handoffs/b-data-crosswalk.json`.
- [x] 4.6 Commits por ruta explícita con mensajes convencionales en español.
