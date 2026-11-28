# Tasks

Reglas para todas las tareas: contenido del sitio en inglés, sin rayas largas, nada citado de
memoria (cada afirmación con URL leída y fecha), tests bajo la skill `test-audit`
(`~/.claude/skills/test-audit/SKILL.md`), `npm run build` antes de `npm test` y lhci al final.

## 1. Fase 0: esquema y familias

- [x] 1.1 Crear `site/src/data/controls/families.ts` con las 18 familias (id, orden, título, definición, exclusiones, anclas con URL y fecha) y verificar que el validador falla con una familia sin dos anclas o con un ancla sin URL o fecha
- [x] 1.2 Añadir `family`, `secondaryFamilies`, `appliesTo` y `mappingsReviewed` al tipo `Control` y a `controlProblems()` (familia desconocida, repetida, sin actor, fecha inválida) y verificar con `tests/orp-core.spec.ts`
- [x] 1.3 Añadir el origen `source` a `ControlSource` y la etiqueta "derived from a primary source", y verificar que un origen que no resuelve a una referencia con URL y fecha falla el build
- [x] 1.4 Clasificar los 93 controles en un mapa `id -> {family, secondaryFamilies, appliesTo}` aplicado al registro, y verificar con un script que los 93 ids, perfiles y orden coinciden con `origin/main` `4af2900`
- [x] 1.5 Mostrar la familia primaria en las páginas de perfil y de control y crear `/controls/families` (recuentos derivados, familias vacías visibles, aviso de borrador), con su título y descripción dentro de las puertas SEO, y verificar con axe y el lint de contenido

## 2. Fase 0: tablas de referencia y crosswalk

- [x] 2.1 Completar `iso42001Controls` a 38 filas con título corto propio, URL y `verified` solo en las cotejadas con la norma, y verificar los recuentos por área 3, 2, 5, 4, 9, 5, 4, 3, 3
- [x] 2.2 Crear la tabla de las 40 medidas del Código GPAI leyendo el texto oficial de la Comisión (capítulo, compromiso, medida, URL, fecha) y verificar que suma 40
- [x] 2.3 Crear la tabla de ids de CSA AICM v1.1 con sus 18 dominios desde las guías públicas (solo id, dominio, URL, fecha) y verificar que suma 247
- [x] 2.4 Añadir el Código GPAI y CSA AICM como marcos del crosswalk, mostrar "not verified against the primary source" en filas sin fecha y llevar URL y fecha a la exportación, y verificar con `tests/controls-crosswalk.spec.ts`
- [x] 2.5 Hacer que un mapeo a un id ausente de su tabla falle el build y verificar con un caso negativo en el validador

## 3. Fase 0: salidas, recuentos y PR

- [x] 3.1 Releer en fuente oficial los artículos del Reglamento de IA que citarán los controles nuevos (4, 4a, 9 a 15, 25 a 27, 49, 50, 53, 55, 72, 73, 86) tras el Reglamento 2026/1744 y dejar la ficha con URL y fecha en `D:/Documents/aige-wt/handoffs/controls-taxonomy/`
- [x] 3.2 Añadir los campos nuevos y la lista `families` a `/api/v1/controls.json`, a `/api/v1/controls/<id>.json` y al OpenAPI, y verificar con `tests/api.spec.ts` que los campos anteriores no cambian
- [x] 3.3 Añadir los `prop` `family`, `secondary-family` y `applies-to` al catálogo OSCAL y verificar con `scripts/oscal-check.mjs` y `tests/oscal.spec.ts`
- [x] 3.4 Añadir los filtros de familia y actor y el listado de familias al servidor MCP, regenerar los fixtures y verificar con los tests de `tools/mcp-server`
- [x] 3.5 Sustituir las cifras escritas de controles, perfiles y familias por valores derivados del registro (o una comprobación que falle si difieren) en el sitio, README y `llms.txt`, y verificar que un `grep` de "79 controls" y "93 controls" no deja cifras fijas
- [ ] 3.6 Revisión con `code-reviewer`, build y suite completa en verde, y PR de la fase 0 abierto para que Jordi lo fusione

## 4. Fase 1: perfil `gpai-and-frontier-models`

- [ ] 4.1 Leer en fuente primaria el Código GPAI, los arts. 53 y 55, RSP v3.4, Preparedness Framework v2, Frontier Safety Framework v3.1 y los elementos comunes de METR, y entregar una ficha de candidatos a control (objetivo, fuente, URL, fecha)
- [ ] 4.2 Escribir el perfil y sus controles `derived` (prefijo `GPAI`), cada uno con origen de fuente primaria, evidencia, pregunta abierta, familia, `appliesTo` y mapeo a medidas del Código GPAI, y verificar que `controlProblems()` no devuelve nada
- [ ] 4.3 Añadir `PAGE_META`, la entrada de `llms.txt` y el test del perfil, y verificar página, twin Markdown, API y OSCAL en el build
- [ ] 4.4 Revisión independiente de cada afirmación contra su fuente y `code-reviewer`; suite en verde y PR de la fase 1 abierto

## 5. Fase 2: perfil `governance-programme`

- [ ] 5.1 Leer en fuente primaria NIST AI RMF (GOVERN, MAP), los arts. 4, 9, 25 a 27 y 49, SR 26-2, PRA SS1/23 y las áreas A.2 a A.5 y A.10 de ISO/IEC 42001 hasta donde sean públicas, y entregar la ficha de candidatos para gobierno, inventario, riesgo e impacto, terceros y alfabetización
- [ ] 5.2 Escribir el perfil y sus controles `derived` (prefijo `ORG`) con origen, evidencia, pregunta abierta, familia, `appliesTo` y mapeos, y verificar que `controlProblems()` no devuelve nada
- [ ] 5.3 Añadir `PAGE_META`, `llms.txt` y el test del perfil, y verificar página, twin, API y OSCAL en el build
- [ ] 5.4 Revisión independiente contra fuentes y `code-reviewer`; suite en verde y PR de la fase 2 abierto

## 6. Fase 3: perfil `transparency-rights-and-fairness`

- [ ] 6.1 Leer en fuente primaria los arts. 13, 50 y 86, el Convenio marco del CoE (arts. 8, 10, 14, 15), Colorado SB26-189, la Ley básica de IA de Corea (arts. 31, 34) y NIST MEASURE 2.11, y entregar la ficha de candidatos
- [ ] 6.2 Escribir el perfil y sus controles `derived` (prefijo `RIGHTS`) y verificar que `controlProblems()` no devuelve nada
- [ ] 6.3 Añadir `PAGE_META`, `llms.txt` y el test del perfil, y verificar página, twin, API y OSCAL en el build
- [ ] 6.4 Revisión independiente contra fuentes y `code-reviewer`; suite en verde y PR de la fase 3 abierto

## 7. Fase 4: perfil `ai-security`

- [ ] 7.1 Leer en fuente primaria las mitigaciones de MITRE ATLAS v2026.11, ETSI TS 104 223, los dominios MDS, TVM y CEK de AICM, SAIF y el compromiso de seguridad del Código GPAI, y entregar la ficha de candidatos sin duplicar ASSURE-010 a 012 ni EVAL-002 y 003
- [ ] 7.2 Escribir el perfil y sus controles `derived` (prefijo `SEC`) con mapeos a ATLAS y AICM, y verificar que `controlProblems()` no devuelve nada
- [ ] 7.3 Añadir `PAGE_META`, `llms.txt` y el test del perfil, y verificar página, twin, API y OSCAL en el build
- [ ] 7.4 Revisión independiente contra fuentes y `code-reviewer`; suite en verde y PR de la fase 4 abierto

## 8. Cierre

- [ ] 8.1 Verificar que cada una de las 18 familias tiene al menos tres controles y que ningún id publicado antes del cambio ha desaparecido o cambiado de perfil
- [ ] 8.2 Verificar en producción, tras la última fusión, `/controls/families`, `/api/v1/controls.json`, `/oscal/catalog.json` y el servidor MCP, y avisar a la sesión de herramientas de los ids y campos nuevos
