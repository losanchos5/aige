# obligation-register Specification

## Purpose
El registro de obligaciones (`site/src/data/frameworks.ts`) da a cada fila del mapa regulatorio un id
estable `AIGE-OBL-<INSTRUMENTO>-<CLÁUSULA>`, fechas ISO con su estado y su página propia, y refleja al
pie de la letra las tablas del capítulo 08, que siguen siendo la fuente de las filas.

## Requirements

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

### Requirement: Cobertura v0.5.0 del registro de obligaciones
El registro de `site/src/data/frameworks.ts` SHALL incluir, deduplicadas, las filas que los handoffs
de los capítulos 11 a 23 proponen para la v0.5.0: los artículos del RGPD (5, 6, 7, 9, 13 a 15, 17,
21, 22, 25, 28, 30, 33 a 36 y 44 a 49), NIS2 (arts. 21(2) y 23), DORA (arts. 19 y 28), la Ley de
ciberresiliencia (art. 14), la Directiva (UE) 2024/2853, la Directiva DSM (art. 4(3)), la DSA (arts.
25 y 27), la UCPD, la Directiva de trabajo en plataformas, la Directiva de crédito al consumo (art.
18(8)), los artículos 31 a 36 de la Ley básica de IA de Corea, las leyes estatales y federales de
EE. UU. que alcanzan a la IA, la Convención del Consejo de Europa, los Principios de la OCDE, el
Código de Hiroshima, ISO/IEC 42005 y 22989, NIST AI 600-1, EN 18286 y los prEN de JTC 21, y los
artículos de la Ley de IA de la UE que el capítulo 08 no tenía (entre ellos 86 y 26(11)). Cada fila
nueva MUST llevar id estable, cláusula, requisito, artefacto, capas, sujeto obligado, estado de
aplicación y fecha de revisión, y cada fecha y cláusula MUST estar verificada en línea con una
fuente numerada del capítulo 08. Una propuesta que repite una fila existente MUST fundirse en ella
en lugar de crear otra.

#### Scenario: Artículo 86 y artículo 26(11) en el registro
- **WHEN** se buscan `AIGE-OBL-EUAIA-ART86` y `AIGE-OBL-EUAIA-ART26-11`
- **THEN** ambas filas existen, anclan en `eu-ai-act-post-omnibus`, tienen `systemClass`
  `high-risk-annex-iii`, `appliesFrom` `2027-12-02` y el hito de `2030-08-02`

#### Scenario: Filas del RGPD
- **WHEN** se ejecuta `site/tests/data.spec.ts`
- **THEN** toda fila con `frameworkId` `gdpr` ancla en `the-gdpr`, aplica desde `2018-05-25` y
  entre sus cláusulas aparecen los artículos 5, 6, 9, 13, 15, 17, 21, 22, 25, 28, 30, 33, 35 y 44

#### Scenario: Corea aplica, las multas esperan
- **WHEN** se lee cualquier fila con `frameworkId` `kr-ai-basic-act`
- **THEN** su `appliesStatus` es `grace` y su nota dice que las obligaciones aplican mientras el
  ministerio retiene las investigaciones y las multas

### Requirement: El registro es espejo del capítulo 08
Cada fila del registro SHALL anclar en un encabezado (H2 o H3) de `bok/08-regulatory-map.md` cuya
tabla la lleve, y su `requirement` y su `artefact` MUST aparecer en ese capítulo, salvo la fila del
art. 73, cuya celda remite a la tabla de plazos. Una fila nueva MUST NOT anclar en otro capítulo: si
su tabla no existe, el capítulo 08 SHALL ganar una sección (sin renombrar ningún encabezado
existente) y la enseñanza del capítulo de origen se enlaza desde el texto.

#### Scenario: Toda fila tiene su celda
- **WHEN** se ejecuta `site/tests/data.spec.ts`
- **THEN** para cada fila el requisito y el artefacto se encuentran en el capítulo 08 (sin
  distinguir mayúsculas ni comillas invertidas), y cada ancla es un encabezado del capítulo 08

#### Scenario: Cada instrumento tiene filas
- **WHEN** se comparan `frameworks` y `obligations`
- **THEN** todo instrumento tiene al menos una fila salvo `uk-atrs`, y las familias de
  `FRAMEWORK_FAMILIES` en `site/src/data/map.ts` reparten todos los ids de `frameworks`

### Requirement: La matriz une por frameworkId
`site/src/components/ObligationMatrix.astro` SHALL unir cada fila con su instrumento mediante su
campo `frameworkId`, sin deducirlo del nombre del grupo ni del texto de la obligación.

#### Scenario: Una fila bajo un encabezado nuevo
- **WHEN** se añade una fila con un `frameworkId` nuevo bajo cualquier sección del capítulo 08
- **THEN** la matriz de `/resources/frameworks` dibuja una fila para ese instrumento y
  `site/tests/v3.spec.ts` cuenta tantas filas como `frameworkId` distintos

### Requirement: Correcciones de fuentes en el capítulo 08
Las filas del capítulo 08 y del registro SHALL reflejar las correcciones verificadas a 2026-09-24:
el art. 4 aplica desde 2025-02-02 y fue reformulado el 2026-07-27; la fila de Corea cita el texto
primario de law.go.kr y el periodo de orientación; Colorado se describe por SB 26-189; la fila CSA
de agentes nombra lo publicado (controles AICM, Agentic Trust Framework, AARM) y MUST NOT presentar
como publicado un "Agentic Control Supplement" sin fuente primaria; la tabla de controles de agentes
usa los nombres oficiales de OWASP ASI.

#### Scenario: Sin suplemento inventado
- **WHEN** se lee la fila `AIGE-OBL-CSA-AICM-AGENTIC`
- **THEN** su cláusula es "Agent controls (AICM v1.1, ATF, AARM)" y su nota marca el suplemento como
  no verificado
