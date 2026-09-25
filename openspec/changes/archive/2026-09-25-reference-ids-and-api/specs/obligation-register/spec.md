## ADDED Requirements

### Requirement: Identificador estable por obligación
Cada fila de `obligations` en `site/src/data/frameworks.ts` SHALL llevar un `id` único de la forma
`AIGE-OBL-<INSTRUMENTO>-<CLÁUSULA>` que cumpla `^AIGE-OBL-[A-Z0-9]+(-[A-Z0-9]+)+$`. Un id MUST NOT
cambiar cuando cambian la redacción, las fechas, el artefacto o las capas de la fila, y un id
retirado MUST quedar en `retiredObligationIds` y MUST NOT reutilizarse. La regla SHALL estar
documentada en la cabecera de `frameworks.ts` y en `/resources/data`.

#### Scenario: Ids únicos y bien formados
- **WHEN** se ejecuta `site/tests/data.spec.ts`
- **THEN** todos los ids cumplen el patrón, no hay duplicados y ninguno aparece en
  `retiredObligationIds`

#### Scenario: Id estable ante un cambio de fecha
- **WHEN** una norma mueve la fecha de aplicación de una fila
- **THEN** cambian `appliesFrom`, `appliesStatus`, `appliesNote` y `reviewed`, y el `id` y la URL
  de su página siguen siendo los mismos

### Requirement: Esquema v2 de la fila de obligación
Cada fila SHALL llevar `frameworkId` (un id existente de `frameworks`), `clause`, `requirement`,
`appliesStatus` (`in-force`, `applies-later`, `deferred`, `grace`, `voluntary` o `pending`) y
`reviewed` (fecha ISO), y MAY llevar `appliesFrom` (fecha ISO), `appliesNote` (el texto humano del
capítulo 08), `milestones` (fechas posteriores ordenadas), `systemClass` (solo en filas de la Ley
de IA de la UE), `patterns` (ids de `site/src/data/patterns.ts`), `dutyHolder`, `authority` y
`scope`. Todo valor MUST ser fiel a `bok/08-regulatory-map.md`; lo que el capítulo deba cambiar va
al handoff.

#### Scenario: Fechas del capítulo 08 que ninguna fila llevaba
- **WHEN** se lee una fila de alto riesgo de la Ley de IA de la UE (arts. 9 a 15, 17, 25, 26, 43,
  47, 72, 73)
- **THEN** `appliesFrom` es `2027-12-02`, `appliesStatus` es `deferred` y `milestones` incluye
  `2028-08-02` (anexo I) y `2030-08-02` (sistemas heredados de autoridades públicas, art. 111(2))

#### Scenario: Artículo 4 alineado con el capítulo 12
- **WHEN** se lee la fila `AIGE-OBL-EUAIA-ART4`
- **THEN** `appliesFrom` es `2025-02-02`, `appliesStatus` es `in-force` y un hito de
  `2026-07-27` recoge la reformulación del Omnibus

#### Scenario: Patrones coherentes con el capítulo 05
- **WHEN** una fila de la Ley de IA de la UE lista un patrón
- **THEN** la línea "Maps to" de ese patrón en `patterns.ts` nombra el artículo de la fila, y todo
  patrón que nombra ese artículo está en la lista

### Requirement: Página por obligación
El sitio SHALL publicar `/obligations` (registro agrupado por marco, con filtros de estado y de
capa en CSS puro, sin JavaScript en línea) y una página `/obligations/<id en minúsculas>` por fila
con: id, instrumento, cláusula, sujeto obligado o ámbito, autoridad, fecha y estado con su nota,
fechas posteriores, clase de sistema, capas, fecha de revisión, artefacto, patrones, hermanos del
crosswalk, casos que citan el mismo artículo, sección de origen del capítulo 08, enlace a su JSON,
aviso "Mappings are illustrative, not a claim of conformity" y bloque de cita.

#### Scenario: Página enlazable y citable
- **WHEN** un lector abre `/obligations/aige-obl-euaia-art9`
- **THEN** ve el id `AIGE-OBL-EUAIA-ART9`, la fecha `2027-12-02` con el estado "Deferred", el
  enlace a `/bok/regulatory-map#eu-ai-act-post-omnibus`, el enlace a
  `/api/v1/obligations/aige-obl-euaia-art9.json` y un bloque "Cite this obligation"

#### Scenario: Sin scripts en línea
- **WHEN** se inspecciona el HTML de `/obligations` o de una página de obligación
- **THEN** no hay ningún `<script>` sin `src`, y los filtros funcionan con radios y `:has()`

### Requirement: lastmod por fecha de revisión
El sitemap SHALL fechar cada `/obligations/<id>` con el `reviewed` de su fila, y SHALL seguir
fechando el resto de rutas con la fecha de git de sus fuentes (`SOURCE_BY_PATH`).

#### Scenario: Fecha de revisión en el sitemap
- **WHEN** se genera `sitemap-0.xml`
- **THEN** el `lastmod` de `/obligations/aige-obl-cn-algorec` es `2026-09-20`, y el de `/thesis`
  sigue siendo la fecha del último commit de `THESIS.md`

### Requirement: Cita generalizada
`site/src/components/Citation.astro` SHALL aceptar `{title, slug?, url?, kind?, label?}` con
`kind` en `chapter`, `obligation`, `figure`, `dataset` o `page`, y SHALL producir para
`{title, slug}` la misma referencia y el mismo BibTeX que antes.

#### Scenario: Uso de capítulo sin cambios
- **WHEN** un capítulo renderiza `<Citation title slug />`
- **THEN** el resumen dice "Cite this chapter" y el BibTeX conserva la clave `aige2026bok` y el
  campo `chapter`

#### Scenario: Etiqueta por tipo
- **WHEN** una página de obligación renderiza `<Citation kind="obligation" url=… />`
- **THEN** el resumen dice "Cite this obligation" y la referencia lleva la URL de la página
