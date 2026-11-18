# Proposal: oscal-catalog-export

## Why

El bloque 3 de la propuesta aprobada el 2026-11-17 busca que el catálogo de controles se pueda
ingerir desde herramientas de cumplimiento sin pasar por la web. Hoy existe una exportación OSCAL,
pero solo del crosswalk temático, generada en el navegador para la selección del usuario y sin
validar contra el esquema de NIST: la prueba comprueba a mano una lista de campos. Los 93 controles
abiertos y sus 5 perfiles no tienen forma OSCAL, que es justo lo que una herramienta GRC sabe leer.

Parte del bloque ya está hecha y queda fuera: la columna de CSA AICM existe en el crosswalk temático
desde `crosswalk-v2-explorer-oscal` (47 referencias).

## What Changes

- Ficheros OSCAL 1.2.3 estáticos, generados en el build desde los mismos datos que la web:
  `/oscal/catalog.json` (93 controles en 5 grupos), `/oscal/profiles/<perfil>.json` (uno por
  perfil, importa el catálogo y selecciona sus controles) y `/oscal/mappings/controls.json` (los
  controles frente a los marcos del crosswalk de controles).
- Identificadores y fechas deterministas: dos builds del mismo commit dan los mismos ficheros.
- Puerta en el build: cada fichero de `dist/oscal/` se valida contra el esquema JSON de NIST
  (copiado al repo, CC0) y se comprueba que perfiles y mapeos solo nombran controles del catálogo.
- La exportación del explorador del crosswalk pasa a validarse contra el esquema de NIST en su
  prueba, en lugar de la lista de campos escrita a mano.
- Los ficheros se anuncian en `/resources/data`, en `/controls` y en `llms.txt`.
- Se corrige la descripción desfasada del conjunto `crosswalk` en el API ("Twelve topics").

Fuera de alcance: mapear controles a CSA AICM (ningún control lo hace hoy y la licencia del AICM
está sin confirmar), `component-definition` y `assessment-results`, exponer los ficheros por el
servidor MCP y el depósito en Zenodo, que llega con la siguiente release.

## Capabilities

### New Capabilities

- `oscal-export`: los ficheros OSCAL del catálogo, los perfiles y el mapeo de controles, y su
  validación.

### Modified Capabilities

Ninguna. La exportación del explorador no cambia de comportamiento; solo gana una validación.

## Impact

- Sitio: `site/src/lib/oscal.ts` (nuevo), `site/src/pages/oscal/**` (nuevo),
  `site/scripts/oscal-check.mjs` y `site/scripts/oscal/` (esquemas de NIST), `site/package.json`
  (script de build y `ajv` como dependencia de desarrollo; ya está instalada de forma transitiva),
  `site/tests/oscal.spec.ts` (nuevo), `site/tests/crosswalk-explorer.spec.ts`,
  `site/src/pages/resources/data.astro`, `site/src/pages/controls/index.astro`,
  `site/src/pages/llms.txt.ts`, `site/src/lib/api.ts` (una descripción).
- Los ficheros viven fuera de `/api/v1` porque no pueden llevar el sobre común de ese API.
- Criterio de corte de la propuesta: 2027-03-31, si ningún repositorio, issue o mención externa usa
  los ficheros.
