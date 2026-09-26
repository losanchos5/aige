# Design

## Context

Estado tras la iteración 1 (ver proposal.md, Why). Hechos del código que condicionan el enfoque
(rastreo 2026-09-26 sobre `origin/main` 970a4a0):

- `site/src/data/controls/index.ts` (524 líneas) define tipos, lookups y `controlProblems()`. Los ids
  AIUC-1 solo se validan por formato (`^[A-F]\d{3}$`) y los de CSA AICM por formato
  (`^[A-Z&]{2,4}-\d{2}$`); no hay índice de ids reales. El NIST AI RMF es un mapa local con solo 8
  subcategorías. NIST SP 800-53 va en `mappings.other` como texto libre.
- `seeds` solo admite ids de `agentControls` (`tool-agent-controls.ts`).
- Ejemplos de observación: `public/controls/examples/control-observation.<slug>.<pass|fail>.json`,
  cableados por el array `observationExamples` exportado desde `evaluation-environment.ts` y leídos
  en `lib/api.ts` `controlRecord()`.
- `/controls/[profile].astro` ya emite `TechArticle` con `dateModified = profile.updated`, pero
  `/controls` usa `lastModified()` (git) y el `lastmod` del sitemap sale de `lastmodOf()` (git).
- Slugs de perfil escritos a mano en `astro.config.ts` (~406-424) y `pages/llms.txt.ts` (199-210).
- Tests con recuentos fijos: `orp-core.spec.ts:39-42`, `controls.spec.ts:28-50`. `frontier.ts:227`
  dice "001 to 009". `personSlug` es privado en `lib/jsonld.ts:24` y está duplicado en `people.ts:29`.
- `/resources/crosswalk` es una matriz con 868 líneas de JS de cliente: no es el patrón a copiar. El
  patrón reutilizable es la tabla de mapeos del perfil (`<td data-label>`).
- Patrones: existen `dataset-admission-gate`, `human-in-the-loop-gate`, `shadow-ai-discovery`,
  `sanctioned-ai-gateway`, `machine-readable-evidence-oscal`, `continuous-assurance-telemetry`,
  `eval-gate-in-ci`, `model-artefact-integrity`, `aibom`; el de despliegue gradual es
  `staged-rollout-rollback-criteria`; NO hay patrón de linaje o procedencia de datos (los cercanos:
  `training-data-rights-ledger`, `downstream-use-register`). Los 13 esquemas de registro pedidos
  existen en `public/schemas/`.
- Capítulos: 05 `patterns`, 12 `governance-program`, 13 `risk-management`, 14
  `governing-development`, 15 `governing-deployment`, 16 `fairness-and-explainability`, 17
  `incidents`, 18 `eu-ai-act`, 19 `privacy-and-ai`, 22 `principles-and-standards`. El prompt citaba
  "12, 13" para privacidad y datos: los capítulos correctos son 14 y 19.
- `bok/CONTRIBUTORS.md`: "Reviewers: None yet." DOI del proyecto: versión
  `10.5281/zenodo.22956197`, concepto `10.5281/zenodo.22857084` (`site.ts`, `CITATION.cff`).

## Goals / Non-Goals

**Goals:**
- Un registro que escale a N perfiles sin tocar registros compartidos por perfil ni por control.
- Mapeos validados contra índices reales (AIUC-1 público, NIST AI RMF completo), no solo por formato.
- Crosswalk y páginas por control generados del mismo registro que el JSON, para que no diverjan.
- Script de publicación reproducible y sin credenciales en disco.

**Non-Goals:**
- Dataset nuevo en `/api/v1/index.json` (obligaría a cambiar y redesplegar el servidor MCP).
- Páginas para controles `derived` o `stub`.
- Índice completo de CSA AICM (solo formato + mapeos verificados a mano, como hoy).
- Normalizar CRLF en `llms-corpus.ts`, `resources/index.astro`, `tests/geo.spec.ts`: se deja fuera
  de este cambio para no mezclarlo con contenido.

## Decisions

1. **`derivedFrom` como campo nuevo, no ampliar `seeds`.** `seeds` conserva su semántica (ids de
   `agentControls`, test de trazabilidad del perfil Agent Runtime). `derivedFrom?: readonly
   { kind: 'pattern' | 'schema' | 'chapter'; ref: string }[]` se valida contra `patterns.ts`,
   `schemaOrder` y `chapters.ts`. Regla `derived`: `seeds.length + derivedFrom.length ≥ 1`, y en los
   tres perfiles nuevos al menos un `derivedFrom` de tipo `pattern` o `schema`. Alternativa descartada:
   prefijos en `seeds` (`pattern:…`), que rompe el test de 31 semillas y mezcla dos espacios de ids.
2. **Índices de verificación como módulos de datos.** `site/src/data/aiuc1.ts` (id, título, dominio,
   URL de la página pública, `verified` ISO) construido leyendo `standard.aiuc-1.com/llms.txt` y las
   páginas de los ids usados; `nistAiRmfSubcategories` pasa a `site/src/data/nist-ai-rmf.ts` con las
   subcategorías del NIST AI 100-1 que se usen (texto del documento primario). `controlProblems()`
   valida `aiuc1` contra el índice. Así el crosswalk también obtiene títulos y URLs.
3. **Registro de perfiles único.** Todo lo que hoy enumera slugs (astro.config `SOURCE_BY_PATH` y
   `lastmod`, `llms.txt.ts`, tests) itera `profiles` y `controls`. `astro.config.ts` importa el
   registro (ya importa datos de `src/`; si Vite no lo permite, un módulo `controls/manifest.ts` sin
   dependencias de Astro). `lastmod` y `dateModified` de perfiles y páginas de control = `profile.updated`;
   `/controls` = máximo de `profile.updated`.
4. **Nombre reservado.** `crosswalk` es ruta estática bajo `/controls/`; el validador rechaza un slug
   de perfil `crosswalk` (y `examples`).
5. **Crosswalk dentro del dataset `controls`.** Clave `crosswalk: { frameworks: [{ id, name, url?,
   note?, rows: [{ ref, name, url?, controls: [id] }] }] }` construida por una función pura
   `buildControlsCrosswalk(controls)` en `site/src/lib/controls-crosswalk.ts`, usada por la página, el
   twin y la API. Marcos: `euaia` (obligaciones), `iso42001`, `nist-ai-rmf`, `owasp` (LLM + Agentic),
   `mitre-atlas`, `csa-aicm`, `nist-sp-800-53` (de `other` con ese `framework`, agrupado por familia
   `AC`, `AU`…), `aiuc1`, `other` restante. Esquema cerrado en `controlSchema`/dataset. Alternativa
   descartada: dataset `controls-crosswalk`, que cambia `DATASETS` del servidor MCP y fuerza redeploy.
6. **Páginas por control.** `pages/controls/[profile]/[control].astro` y `[control].md.ts` con
   `getStaticPaths` filtrando `depth === 'specified'`. Campos nuevos en `Control`: `pageTitle?` y
   `pageDescription?`, obligatorios para `specified` (validador: título ≤ 70, descripción 70-160, ambos
   únicos). `controlPath()` devuelve la página si `specified` y el ancla del perfil si no; la sección del
   perfil conserva su ancla y enlaza la página. JSON-LD `TechArticle` con `isPartOf: { @id: <perfil>#article }`
   (el perfil gana `@id` estable). `DETAIL_COLLECTIONS` por perfil, generado desde `profiles`.
   `_headers`: `/controls/*.md` ya existe con `:splat`; en Cloudflare `*` casa también `/`, por lo que
   cubre `/controls/<perfil>/<id>.md`; el test lo comprueba sobre el fichero y el integrador verifica en
   producción.
7. **Ejemplos de observación por perfil.** `observationExamples` sale de `evaluation-environment.ts` a
   una lista en `controls/index.ts` que concatena las de cada perfil; el test exige para cada
   `specified` dos ficheros (pass y fail) que validan contra `control-observation.v1`, con `observer`
   un rol o adaptador y nota "illustrative example".
8. **DOI.** `doi?`/`conceptDoi?` en `ControlProfile`; `profileCitation(profile)` (texto + DOI efectivo:
   `doi ?? site.conceptDoi`) usado por la cita, `Provenance`, el registro JSON del perfil (`doi`,
   `conceptDoi`, `citation`) y el front matter del twin. El envelope genérico no cambia.
9. **`profile-release.mjs` sin dependencias.** Node 20 `fetch`; entrada `dist/`; salida
   `dist/releases/<slug>-v<version>/`; `--dry-run` por defecto sin token; con `ZENODO_TOKEN` hace
   `POST /api/deposit/depositions`, sube ficheros al `bucket`, `PUT` metadatos y deja el depósito en
   borrador; publicar exige `--publish`; producción exige `--production` (si no, `sandbox.zenodo.org`).
   El token nunca se imprime. Alternativa GitHub-Zenodo: acuña un DOI para el snapshot entero del repo
   en cada release de GitHub, no para un perfil; se documenta y se descarta.
10. **Perfiles derivados: fuentes y capítulos.** Datos: `dataset-admission-gate`,
    `training-data-rights-ledger`, `downstream-use-register` + esquemas `dataset-admission-record`,
    `dataset-card`, `training-record` + capítulos 14 y 19 + obligaciones GDPR y AI Act Art. 10 del
    registro. Despliegue: `staged-rollout-rollback-criteria`, `human-in-the-loop-gate`,
    `shadow-ai-discovery`, `sanctioned-ai-gateway` + esquemas de despliegue + capítulos 15-17 + Arts.
    9, 14, 26, 72, 73. Assurance: `machine-readable-evidence-oscal`, `continuous-assurance-telemetry`,
    `eval-gate-in-ci`, `model-artefact-integrity`, `aibom` + esquemas de evidencia + capítulos 05, 14,
    18, 22 + ISO/IEC 42001 cláusula 9, NIST AI RMF MEASURE/MANAGE, AIUC-1 dominio E. Un control sin
    material que lo sostenga no se crea.
11. **Orquestación.** Ola 0: `orp2-core` (tipos, validadores, índices, registros derivados,
    mantenimiento, tests genéricos) en paralelo con `orp2-evalenv` (solo `evaluation-environment.ts`,
    sus ejemplos y su sección de `SOURCES.md`). Ola 1 sobre la integración: `orp2-data`,
    `orp2-deploy`, `orp2-assure`, `orp2-crosswalk`, `orp2-pages`, `orp2-release`. Ola 2: revisión de
    contenido adversarial con fuentes abiertas, seo/og + qa/a11y, `code-reviewer`. Cada perfil nuevo
    añade su import en `controls/index.ts` (append; el integrador resuelve con `union-merge.py`).

## Risks / Trade-offs

- [La promoción de 001/004/005/007/008/009 se apoya en informes autorreportados de laboratorios] →
  "OpenAI reports", citas cortas, fechas de acceso; lo no sostenible sigue `stub` y se dice en el
  changelog.
- [Perfiles derivados inflan el catálogo con reformulaciones] → validador `derivedFrom`, revisión de
  contenido que compara cada control con su patrón o esquema, rango de recuento cerrado.
- [`astro.config.ts` importando TS de datos rompe el arranque de Vite] → módulo manifest sin imports
  de Astro; build de core lo prueba antes de la ola 1.
- [Splat de `_headers` no casa rutas anidadas] → test sobre `dist/_headers` y `curl -I` en producción;
  si falla, regla explícita `/controls/*/*.md`.
- [AIUC-1 cambia cada trimestre y retira ids] → `verified` por id; el validador excluye retirados; el
  índice se reconstruye con fecha.
- [Seis agentes de la ola 1 compiten por 3 slots de build] → `build.sh` los encola; tests dirigidos con
  `PW_PORT` 4431-4449.
- [Token de Zenodo filtrado] → solo por entorno en tiempo de ejecución, nunca en logs, memoria ni repo.

## Migration Plan

Rama de integración `feat/open-reference-project-2` (worktree `D:/Documents/aige-wt/orp2`), olas 0-2,
build → suite default → muestra a11y → visual → lhci, PR, CI, merge y deploy con autorización de
Jordi, smoke en producción, sin redeploy MCP (el servidor no cambia), `opsx:archive`. Rollback:
revert del merge; las URLs nuevas desaparecen y las anclas de perfil siguen resolviendo.

## Open Questions

- El DOI real de cada perfil queda pendiente del token de Zenodo y del visto bueno de Jordi; el
  cambio se completa en dry-run y el DOI se escribe en un commit posterior.
