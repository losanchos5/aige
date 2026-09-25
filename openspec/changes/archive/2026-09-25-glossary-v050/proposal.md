# Proposal

## Why

El glosario tenía 63 términos, casi todos del núcleo de la disciplina (capítulos 01 a 08), y ninguna
página propia por término. Con los capítulos 11 a 22 escritos, el libro usa más de doscientos
términos de ley, normas, riesgo, privacidad, equidad e incidentes que el lector no encuentra
definidos en un solo sitio, y los pares que se confunden en las revisiones (transparencia frente a
explicabilidad, procedencia frente a linaje, deriva de datos frente a deriva de concepto, incidente
frente a issue, proveedor frente a responsable del despliegue, HITL frente a HOTL) no tienen una
comparación explícita. Para ser la referencia de gobernanza de IA, cada término necesita una URL
canónica citable, con su fuente, el capítulo que lo desarrolla y dónde se usa.

## What Changes

- **Glosario** (`bok/09-glossary.md`): de 63 a 279 términos. Entran todos los términos de los
  handoffs de los bloques de capítulo (deduplicados y fusionados, redactados con palabras propias,
  60 palabras como máximo) y los términos del brief (proveedor, responsable del despliegue,
  importador, distribuidor, sistema de alto riesgo, práctica prohibida, evaluación de la
  conformidad, organismo notificado, marcado CE, alfabetización en IA, supervisión humana, sesgo de
  automatización, impugnabilidad, recurso, guardrail, inyección de prompt, jailbreak, alucinación,
  sesgo, equidad, explicabilidad, interpretabilidad, modelo fundacional, modelo de frontera, modelo
  de pesos abiertos, RAG, marca de agua, procedencia de contenido C2PA, deepfake, sandbox
  regulatorio, decisión automatizada, ISO/IEC 42001, NIST AI RMF, gestión del riesgo, apetito y
  riesgo residual, linaje y procedencia de datos, deriva de datos y de concepto, model card y system
  card). Cada entrada lleva su cita `[n]` cuando el término viene de una ley, una norma o un
  artículo, un "Contrast with" cuando existe un par confundible, un "See" con el ancla exacta de la
  sección que lo desarrolla y la lista de capítulos. Se corrige "Serious incident" a las cuatro
  letras del art. 3(49) con puntero al capítulo 17 y "Model risk management" registra que SR 26-2
  sustituyó a SR 11-7 el 17 de abril de 2026 (verificado en la fuente primaria de la Reserva
  Federal). El capítulo gana encabezados por letra y una tabla "Commonly confused pairs" con diez
  pares.
- **Páginas por término** (`/glossary/<slug>`): una página estática canónica por término, generada
  desde el capítulo, con definición y fuentes numeradas propias, secciones que lo desarrollan,
  capítulos que lo usan (índice calculado en build desde los capítulos), tarjetas de contraste,
  términos relacionados, bloque de cita (APA y BibTeX) y JSON-LD `DefinedTerm` dentro del
  `DefinedTermSet` del glosario del libro.
- **Índice del libro** (`/bok/glossary`): cada párrafo de término recibe su ancla `t-…` y el nombre
  enlaza a su página. `/resources/glossary` pasa a ser un 301 a `/bok/glossary` en el host
  (`public/_redirects`); la página se sigue construyendo para la vista previa, content-lint y los
  tests. `/glossary` también redirige a `/bok/glossary`.
- **Tarjetas de hover y JSON**: `rehype-glossary` enlaza cada término a su página (con alias,
  acrónimos sensibles a mayúsculas y plurales) y `/glossary.json` gana `url` (la página del término),
  `anchor` y `chapters`.
- **Componente nuevo** `ContrastCards` para los pares confundibles, y `TermCitation`, la variante
  del bloque de cita para términos.
- **Sitemap**: las 279 rutas entran en `SOURCE_BY_PATH` de `site/astro.config.ts`.
- Fuera de alcance: navegación, portada, hub de Resources, `path.ts`, content-lint y la retirada
  definitiva de `/resources/glossary`; van en el handoff.

## Capabilities

### New Capabilities
- `glossary`: el glosario como fuente única, sus páginas por término, las tarjetas de contraste, el
  índice del libro con anclas, el endpoint JSON y la redirección del índice antiguo.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/09-glossary.md` (reescrito), `sources/SOURCES.md` (sección del capítulo 09
  regenerada, 120 fuentes), `bok/CHANGELOG.md` (entrada en "Unreleased (v0.5.0)").
- **Sitio**: `src/lib/glossary.ts`, `src/lib/rehype-glossary.ts`, `src/pages/glossary.json.ts`,
  `src/pages/resources/glossary.astro`, `src/components/GlossaryIndex.astro`, nuevos
  `src/pages/glossary/[slug].astro`, `src/components/ContrastCards.astro` y
  `src/components/TermCitation.astro`; `astro.config.ts` (`SOURCE_BY_PATH`); `public/_redirects`.
- **Tests**: `tests/v4.spec.ts` y `tests/seo-schema.spec.ts` actualizados; nuevo
  `tests/glossary.spec.ts`.
- **Verificación**: `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint,
  check-links, pagefind) en verde.
