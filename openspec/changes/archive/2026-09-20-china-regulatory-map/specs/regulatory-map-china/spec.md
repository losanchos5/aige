# Spec Delta

## Purpose

China entra en el mapa regulatorio y en el catálogo del sitio con sus normas vinculantes y su guía
voluntaria separadas, cada fila con estado fechado y cita verificada, y el marco agéntico del TC260
cruzado con las fuentes agénticas que el libro ya usa.

## ADDED Requirements

### Requirement: Subsección China en el capítulo 08
El capítulo `bok/08-regulatory-map.md` SHALL contener una subsección `### China` dentro de
`## Other jurisdictions` que distinga las normas vinculantes (CAC y co-emisores; GB 45438-2025
obligatoria) de la guía voluntaria (GB/T 45654-2025; TC260 AI Safety Governance Framework 3.0), con
una tabla de siete filas «instrumento | estado (as of 2026-09-20) | qué pide | artefacto de
ingeniería | capa» y la frase «Mappings are illustrative, not a claim of conformity».

#### Scenario: Lector consulta el mapa para China
- **WHEN** un lector abre la subsección China del capítulo 08
- **THEN** ve las cuatro normas vinculantes (Algorithmic Recommendation, Deep Synthesis, Generative
  AI Interim Measures, Labelling Measures + GB 45438-2025) marcadas «Binding» con su fecha de entrada
  en vigor, y las tres voluntarias (GB/T 45654-2025, TC260 3.0, TC260 3.0 Apéndice 2) marcadas
  «Voluntary» o «Recommended», cada una con artefacto y capas 1–5

#### Scenario: Toda afirmación factual está citada
- **WHEN** se lee cualquier fecha, número de orden o contenido normativo de la subsección
- **THEN** lleva un marcador `[n]` con n entre 41 y 51, y ese n existe en `## Sources` del capítulo y
  como fila en la sección `### bok/08-regulatory-map.md` de `sources/SOURCES.md` con el mismo tag

#### Scenario: Hecho «reported» se declara como tal
- **WHEN** la prosa usa el post de LinkedIn [51]
- **THEN** la frase contiene la palabra «reported» y la fuente lleva el tag `reported`

### Requirement: Cruce de las tres fuentes agénticas
La subsección China SHALL incluir una tabla que cruce los grupos de medidas del Apéndice 2 del TC260
3.0 (identidad y permisos, aprobación humana, herramientas y cadena de suministro, guardrails en
runtime, memoria, comunicación, monitorización/auditoría, desmantelamiento) con las entradas del
OWASP Top 10 for Agentic Applications 2026 [16] y con la NIST AI Agent Standards Initiative [29],
indicando la capa 1–5 de cada fila.

#### Scenario: Nombres ASI verificados
- **WHEN** la tabla nombra un ID ASI01–ASI10
- **THEN** el nombre acompañante coincide con el publicado en la fuente [16] del capítulo

### Requirement: Hueco declarado en «What is NOT harmonised yet»
La sección `## What is NOT harmonised yet` SHALL incluir un bullet que afirme, citando [42], que el
TC260 Framework 3.0 no referencia ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF ni el AI Act, ni nombra
las normas chinas vinculantes.

#### Scenario: Bullet presente y citado
- **WHEN** se lee la sección
- **THEN** el bullet existe, va en negrita en su primera frase como los demás, y cita [42]

### Requirement: Catálogo del sitio con grupo China
El catálogo `site/src/data/frameworks.ts` SHALL exponer seis marcos chinos con ids
`cn-algo-recommendation`, `cn-deep-synthesis`, `cn-genai-measures`, `cn-content-labelling`,
`cn-gbt-45654` y `cn-tc260-framework`, todos con `issuer` terminado en «(China)» y URL https, y siete
obligaciones bajo el grupo `China` con anchor `china` cuyas capas coinciden con la tabla del
capítulo.

#### Scenario: Matriz de obligaciones resuelve las filas chinas
- **WHEN** se construye `/resources/frameworks`
- **THEN** la matriz muestra seis filas chinas en la banda Asia-Pacific, ninguna atribuida a `uk-duaa`,
  y el test que replica `resolveFwId` (`site/tests/v3.spec.ts`) cuenta el mismo número de filas que
  el componente

#### Scenario: Anchor válido
- **WHEN** corre `site/tests/data.spec.ts`
- **THEN** el anchor `china` resuelve a un heading real del capítulo 08 y cada obligación tiene al
  menos una capa

#### Scenario: Exports reflejan las filas
- **WHEN** se generan `obligations.csv` y `obligations.json`
- **THEN** contienen las siete obligaciones del grupo China sin cambios de código en los exports

### Requirement: Lista de lecturas con fuentes chinas, coreana y singapurense
La sección «Regulation and standards» de `bok/10-reading-list.md` SHALL contener siete entradas
nuevas (TC260 3.0 PDF, GenAI Interim Measures, Deep Synthesis, Algorithmic Recommendation,
Labelling Measures, South Korea AI Basic Act, Singapore Model AI Governance Framework for GenAI)
en el formato que parsea el sitio: título en negrita, nota de una línea, URL https entre backticks y
tag `(verified: …)`.

#### Scenario: Parser del sitio las acepta
- **WHEN** corre el test de reading list de `site/tests/data.spec.ts`
- **THEN** cada entrada nueva aparece con URL https y tag, y `/resources/reading-list` las muestra

#### Scenario: Reutilización de filas verificadas
- **WHEN** se añaden Corea y Singapur
- **THEN** sus URL y tags son los de las filas [34] (`secondary`) y [39] (`primary`) de SOURCES.md, sin
  re-verificación

### Requirement: Glosario con CAC y TC260
`bok/09-glossary.md` SHALL definir `CAC (Cyberspace Administration of China)` y `TC260` en
posición alfabética, en el formato `**Term.** definición … [n]. (ch. 08)`, con fila en la sección
del glosario de SOURCES.md.

#### Scenario: Glosario del sitio los muestra
- **WHEN** se construye `/resources/glossary`
- **THEN** ambos términos aparecen con su definición y el test «glossary has 50+ terms» sigue en verde

#### Scenario: Auto-enlace por palabra entera
- **WHEN** el prose de un capítulo contiene «CAC» como palabra y otras palabras que la contienen
- **THEN** solo la palabra entera se enlaza al glosario

### Requirement: Registro de cambio y cierre de pendientes
La change SHALL dejar entrada en `bok/CHANGELOG.md`, retirar
`.github/ISSUE_DRAFTS/01-china-regulatory-rows.md` y `03-reading-list-apac-sources.md`, y quitar la
nota «China (solo fuentes secundarias encontradas)» de `PENDIENTE.md`.

#### Scenario: Pendientes coherentes
- **WHEN** se lee `PENDIENTE.md` tras la change
- **THEN** el bullet de ámbito regulatorio conserva GDPR Art. 22 y sectoriales y ya no lista China como
  pendiente, y los dos borradores de issue no existen

### Requirement: Puertas de calidad del sitio
La change SHALL dejar en verde `npm run build` (astro check, lint de contenido, check de enlaces),
`npm test`, `npm run test:visual` (regenerando solo las baselines de `frameworks`, `reading-list` y
`glossary`), `npm run test:a11y` y `npm run lhci`, sin introducir texto con opacidad reducida.

#### Scenario: Baselines acotadas
- **WHEN** se revisa el diff de `site/tests/__screenshots__/`
- **THEN** solo cambian ficheros cuyo nombre empieza por `frameworks-`, `reading-list-` o `glossary-`

#### Scenario: THESIS intacta
- **WHEN** se revisa el diff completo
- **THEN** `THESIS.md` y `THESIS.es.md` no cambian
