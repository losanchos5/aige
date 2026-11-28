# Proposal

## Why

El catálogo abierto tiene 93 controles en 5 perfiles, pero su única agrupación es el perfil (el tipo
de sistema). No hay familias temáticas, el 45 % es runtime de agentes y faltan o están casi vacías
áreas enteras que las normas sí exigen: gobierno y responsabilidades, inventario, riesgo e impacto,
terceros, transparencia, derechos de las personas afectadas, equidad, seguridad del modelo y las
obligaciones de proveedores de modelos GPAI. Las herramientas de medición que se construyen en
paralelo (registro de evaluadores, ledger del Código GPAI, autoinformes de fallos) usarán los ids de
control como clave, así que el catálogo necesita ahora una taxonomía estable, tablas de referencia
completas y una salida legible por máquina coherente.

## What Changes

- Eje nuevo `family`: 18 familias de control con id estable, definición y justificación por fuente
  primaria. Cada control tiene una familia primaria y, si procede, secundarias. Es ortogonal al
  perfil: los 93 ids y los 5 perfiles actuales no cambian, no hay renumeración ni fusión.
- Faceta nueva `appliesTo`: a qué actor aplica el control (proveedor, responsable del despliegue,
  proveedor de modelo GPAI).
- Los 93 controles actuales quedan clasificados por familia y actor.
- Página de familias en `/controls/families` y familia visible en cada control.
- Origen nuevo para controles `derived`: una fuente primaria externa, con URL y fecha de lectura,
  además de los orígenes actuales (patrón, esquema, capítulo).
- Tablas de referencia completas, cada fila con URL de fuente y fecha de verificación: ISO/IEC 42001
  Anexo A (de 14 a 38 ids), las 40 medidas del Código de buenas prácticas GPAI y los ids de CSA
  AICM v1.1. Una fila sin verificar en fuente primaria se publica marcada como no verificada.
- Cada control declara la fecha en que se revisaron sus mapeos.
- Cuatro perfiles nuevos, con controles `derived` de fuente primaria verificada:
  1. `gpai-and-frontier-models` (familia 18 y afines).
  2. `governance-programme` (gobierno, inventario, riesgo e impacto, terceros, alfabetización).
  3. `transparency-rights-and-fairness`.
  4. `ai-security`.
  Orden de magnitud: de 93 a unos 160 controles.
- `family` y `appliesTo` en la API, el servidor MCP y OSCAL (como `prop`; los grupos del catálogo
  OSCAL siguen siendo los perfiles). Dataset nuevo de familias en la API.
- Los recuentos que la web muestra (controles, perfiles, familias) salen de los datos en el build.
- Sin cambios incompatibles: todo campo nuevo es aditivo.

Entrega: una rama y un PR por fase (fase 0 de esquema, luego un PR por perfil nuevo), todos bajo
este único cambio.

## Capabilities

### New Capabilities

- `control-families`: registro de las 18 familias, clasificación de cada control por familia y
  actor, y la página pública de familias.

### Modified Capabilities

- `control-profiles`: origen de fuente primaria para controles `derived`, fecha de revisión de
  mapeos, cuatro perfiles nuevos y recuentos derivados de los datos.
- `controls-crosswalk`: tablas de referencia completas con fuente y fecha por fila, y columnas del
  Código GPAI y de CSA AICM.
- `open-data-api`: campos `family`, `secondaryFamilies` y `appliesTo` en los controles y dataset de
  familias.
- `oscal-export`: familia y actor como `prop` de cada control.
- `mcp-server`: filtro por familia y actor, y listado de familias.

## Impact

- Datos: `site/src/data/controls/` (tipos, validador, fichero de familias, cuatro perfiles nuevos),
  `site/src/data/threats.ts` (Anexo A), tablas nuevas del Código GPAI y de AICM,
  `site/src/data/crosswalk.ts`.
- Páginas: `/controls`, `/controls/families`, páginas de perfil y de control, `/controls/crosswalk`,
  twins Markdown, `llms.txt`, sitemap, `page-meta.ts`.
- Salidas: `/api/v1/controls.json`, `/api/v1/controls/<id>.json`, OpenAPI, `/oscal/*`,
  `tools/mcp-server` (herramienta de controles y fixtures).
- Tests: `orp-core`, `controls*`, `oscal`, `api`, `controls-crosswalk`, más los del servidor MCP.
- Consumidores externos: las herramientas de medición leen `control_ids`; ningún id cambia.
- Dependencias: ninguna nueva.
- Fuentes de partida: `D:/Documents/aige-wt/handoffs/controls-taxonomy/research-control-catalogs.md`
  y `research-laws-standards.md` (leídas el 2026-11-28).
