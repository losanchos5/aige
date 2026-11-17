# Proposal

## Why

El crosswalk de seguridad de frontera es una foto fija del 2026-09-30: dice qué versión de cada marco
se mapeó, pero no qué cambia entre versiones. Los tres labs revisan sus marcos varias veces al año y
buena parte de los cambios no aparece en sus propias notas de versión (el paper "Silent Revision",
arXiv 2609.08789, lo mide en 12 labs con un corpus que no se actualiza). No hay un registro
mantenido, neutral y enlazado a estándares de esos cambios. La web ya tiene las piezas para serlo: el
crosswalk con sus 13 dimensiones y un monitor diario de fuentes.

## What Changes

- Nuevo dataset con el historial de versiones de Anthropic RSP, OpenAI Preparedness Framework y
  Google DeepMind FSF: etiqueta y fecha tal como las da el documento, URL oficial, copia archivada
  cuando existe y SHA-256 del fichero recuperado.
- Nuevo dataset de cambios materiales por transición entre versiones consecutivas: tipo de cambio
  (añadido, eliminado, modificado), sección, resumen neutral, citas de 25 palabras como máximo de
  antes y después, dimensiones del crosswalk afectadas y si las notas de versión del propio lab
  mencionan el cambio.
- Nueva página `/resources/frontier-framework-changes` con sus exports `.json` y `.csv`, enlace
  permanente por cambio, método, límites, fuentes y cita.
- Una entrada por transición en `/rss.xml`.
- Alta de `frontier-crosswalk` y `frontier-changes` en `/api/v1` (el crosswalk de frontera no estaba
  en el catálogo de la API).
- El monitor regulatorio pasa a vigilar los tres marcos: una versión nueva o una edición silenciosa
  del mismo fichero abre una incidencia.
- La página del crosswalk enlaza al historial y avisa cuando la versión que mapea ya no es la última
  registrada.

Fuera de alcance: más labs, puntuaciones o valoraciones de los cambios, cambios en el servidor MCP,
depósito en Zenodo y cualquier redistribución del texto de los marcos.

## Capabilities

### New Capabilities

- `frontier-framework-changes`: historial de versiones y registro de cambios materiales de los
  marcos de seguridad de frontera de los tres labs, con página, descargas y descubrimiento.

### Modified Capabilities

- `open-data-api`: dos conjuntos nuevos en el catálogo, `frontier-crosswalk` y `frontier-changes`.
- `regulatory-monitor`: los marcos de los tres labs entran en las fuentes vigiladas.
- `frontier-safety-crosswalk`: enlace al historial de cambios y aviso de versión no vigente.

## Impact

- Datos: `site/src/data/frontier-changes.ts` (nuevo), `site/src/data/frontier-crosswalk.ts` (función
  de payload compartida, sin cambio de contenido).
- Páginas: `site/src/pages/resources/frontier-framework-changes.astro` con `.json.ts` y `.csv.ts`
  (nuevas), `frontier-safety-crosswalk.astro`, `rss.xml.ts`, `resources/index.astro`.
- Registros de página: `site/astro.config.ts` (`SOURCE_BY_PATH`), `site/src/data/nav.ts`,
  `site/src/pages/llms.txt.ts`, tarjeta OG, pie.
- API: `site/src/lib/api.ts` (dos entradas en `datasets`), con sus esquemas y OpenAPI derivados.
- Monitor: `tools/reg-monitor/sources.json` y su test de fuentes.
- Tests: una spec nueva para la página y sus exports; `resources.spec.ts` (lista del hub).
- Sin dependencias nuevas. Sin cambios en `tools/mcp-server`. Los documentos de los labs no entran
  en el repo: solo hashes, URLs y citas cortas.
