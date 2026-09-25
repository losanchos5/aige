## ADDED Requirements

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
