# Design

## Context

Ver `proposal.md`. Medido sobre `origin/main` el 2026-11-18:

- Controles en `site/src/data/controls/index.ts`: 5 perfiles (`ControlProfile`) y 93 controles
  (`Control`), cada control con un `profile`. Identificador `AIGE-CTL-<PERFIL>-<NNN>`.
- `buildControlsCrosswalk()` en `site/src/lib/controls-crosswalk.ts` ya da, por marco, cada
  referencia con los controles que la citan.
- El explorador (`site/public/crosswalk-explorer.js`) emite un `mapping-collection` OSCAL 1.2.3 con
  el espacio de nombres `https://aigovernanceengineer.com/ns/oscal`, relación `intersects-with` y
  procedencia `hybrid` / `semantic` / `draft`. Usa `crypto.randomUUID()` porque es una descarga.
- Las pruebas de `/api/v1` exigen sobre común, licencia y esquema 2020-12 a todo JSON de esa ruta.
- `ajv` 8.20 está instalado de forma transitiva. Los esquemas de NIST son draft-07, usan `\p{L}` en
  patrones y el formato `uri-reference`; compilan con `strict: false`.
- El patrón `bok/patterns/machine-readable-evidence-oscal.md` presenta catálogo y perfil como las
  capas nativas de OSCAL y dice que las extensiones de IA se adoptan solo donde encajan.

## Goals / Non-Goals

**Goals:**

- Que una herramienta que lee OSCAL pueda importar el catálogo, un perfil y el mapeo desde una URL
  estable.
- Que un fichero inválido no llegue a producción.

**Non-Goals:**

- Semántica de evaluación de OSCAL (`assessment-plan`, `assessment-results`).
- Resolver perfiles (`resolved profile catalog`): se publica el perfil sin resolver.
- Cambiar los datos de los controles.

## Decisions

**D1. Rutas fuera de `/api/v1`.** `/oscal/catalog.json`, `/oscal/profiles/<slug>.json`,
`/oscal/mappings/controls.json`, generados por endpoints estáticos de Astro desde una librería pura
`site/src/lib/oscal.ts`. Alternativa descartada: meterlos como conjuntos del API, que obligaría a
envolverlos y dejarían de ser OSCAL.

**D2. Catálogo.** Un `catalog` con un grupo por perfil (`id` = slug, `title` = título del perfil) y
sus controles dentro, en el orden de los datos. Por control: `id` tal cual (es un token válido),
`class: "aige"`, `title`; `props` estándar `label` y `sort-id`, y con el espacio de nombres propio
`layer`, `status`, `reviewer-status`, `depth` y `version`; `parts`: `statement` con el objetivo,
`guidance` con el alcance y las notas de implementación, y partes con espacio de nombres propio para
modos de fallo, verificación (con su tipo), evidencia (con capa y enlace al esquema cuando existe) y
respuesta ante fallo; `links`: `canonical` a la página del control y `reference` a sus fuentes. Los
mapeos a marcos no van en el catálogo: van en el `mapping-collection`.

**D3. Perfiles.** Un `profile` por perfil del sitio: `imports` con `href` absoluto al catálogo e
`include-controls` con `with-ids`; `merge` con `as-is: true`. `metadata.version` es la versión del
perfil, y su DOI, cuando existe, va en `document-ids` con el esquema `http://www.doi.org/`.

**D4. Mapeo de controles.** Un `mapping-collection` con un `mapping` por marco de
`buildControlsCrosswalk()`: origen el catálogo propio, destino el marco, relación
`intersects-with`, y las mismas convenciones que el explorador (procedencia, `props` con el espacio
de nombres propio, `label` con la referencia original). El `id-ref` del destino debe ser un token:
se normaliza con la misma regla que `clauseId()` del crosswalk temático.

**D5. Determinismo.** Los `uuid` son UUID v5 de un espacio de nombres fijo y una clave estable
(tipo de documento, identificador, y para cada par origen y destino). `last-modified` es la fecha
`updated` más reciente de los perfiles incluidos, a las 00:00:00Z. Nada depende del reloj.

**D6. Metadatos.** `oscal-version: 1.2.3`; título con "illustrative, not a claim of conformity";
`version` del sitio; autor como `party` con rol `creator`; DOI de concepto en `document-ids`;
licencia y aviso en `remarks` y en un `link` `rel: license`.

**D7. Puerta en el build.** `site/scripts/oscal-check.mjs` corre al final de `npm run build`:
valida cada JSON de `dist/oscal/` contra el esquema de NIST que corresponde a su clave raíz, con
`ajv` (`strict: false`), y comprueba que el catálogo no repite identificadores, que cada perfil y
cada mapeo nombra solo controles del catálogo y que la unión de los perfiles es el catálogo. Los
tres esquemas (catálogo, perfil, mapeo) se copian a `site/scripts/oscal/` desde la release v1.2.3
con un `README` que da la URL, la licencia CC0 y el SHA-256 de cada uno. Alternativa descartada:
descargarlos en la CI, que añade red y un tercero al build.

**D8. `ajv` como dependencia declarada.** Se añade a `devDependencies` con la versión ya
instalada; el lockfile cambia solo en la raíz. Lo hace la sesión principal antes de lanzar al
worker, para no tocar el `node_modules` compartido.

**D9. Pruebas.** Una prueba nueva (`oscal.spec.ts`): el catálogo contiene exactamente los
identificadores de `/api/v1/controls.json` y cada perfil los de su perfil. En
`crosswalk-explorer.spec.ts`, la lista manual de campos obligatorios se sustituye por la validación
del fichero descargado contra el esquema de mapeo. La validez de los ficheros estáticos la cubre la
puerta de D7, no una prueba duplicada.

**D10. Dónde se anuncia.** Una sección "OSCAL" en `/resources/data` (qué es cada fichero, versión,
qué significa `intersects-with`, cómo se valida, licencia), un enlace de descarga en `/controls` con
el evento `download`, y una entrada en `llms.txt`.

## Risks / Trade-offs

- [Un consumidor lee `intersects-with` como equivalencia] → el aviso de la colección y la página
  dicen que es afinidad temática, igual que en el explorador.
- [Partes con espacio de nombres propio que una herramienta ignora] → lo esencial (título,
  enunciado, guía, enlaces) usa nombres estándar.
- [El modelo de mapeo de OSCAL tiene errores abiertos en sus restricciones Metaschema] → se valida
  con el esquema JSON, que es lo que publica NIST para JSON; se documenta el límite.
- [Los esquemas copiados envejecen] → versión fijada en un solo sitio (`OSCAL_VERSION`); subirla es
  cambiar tres ficheros y sus hashes.

## Migration Plan

Solo añade rutas. Marcha atrás: revertir el PR.
