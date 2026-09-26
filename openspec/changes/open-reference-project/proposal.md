# Proposal

## Why

aigovernanceengineer.com es hoy un Body of Knowledge muy completo escrito por una persona: se lee,
pero no se usa como infraestructura ni se revisa desde fuera. El objetivo estratégico de este cambio
es convertirlo en un proyecto técnico abierto de referencia: perfiles de control abiertos,
versionados y legibles por máquina, una ruta para quien evalúa y asegura sistemas frontier, notas
técnicas con estado de revisión, análisis de incidentes con metodología, vías de contribución
concretas y señales de procedencia verdaderas. El mercado ya tiene certificación y seguro para
agentes (AIUC-1, con auditores acreditados y certificaciones públicas; propuestas de mutua
aseguradora para labs frontier): el sitio se posiciona como la capa abierta de implementación
(controles con punto de aplicación, test y esquema de evidencia) a la que esos esquemas pueden
mapearse, nunca como certificación propia. Todo lo que ya existe (loop de la home, Stack, patrones,
`/cases`, `/api/v1`, `/mcp`, esquemas, DOI) se extiende y se enlaza; nada se duplica.

## What Changes

- **Registro de controles** (`site/src/data/controls/{index,evaluation-environment,agent-runtime}.ts`):
  tipos, validadores y dos perfiles v0.1 en borrador. *Evaluation Environment*: 9 controles
  `AIGE-CTL-EVAL-001..009`, tres especificados a fondo (002 Network Egress Control, 003 Credential
  Isolation, 006 Stop Conditions) y seis borradores con preguntas abiertas. *Agent Runtime*: 31
  controles `AIGE-CTL-AGENT-001..031` derivados mecánicamente de los 31 controles de agente del
  capítulo 23 (`site/src/data/tool-agent-controls.ts`).
- **Datos de proyecto**: `site/src/data/people.ts` (solo el autor), `work.ts` (trabajo abierto con
  estados verdaderos), `open-questions.ts` (cinco preguntas), `research.ts` (temas previstos y
  escritos).
- **Primitivas**: `FlowDiagram`, `StatusLine`, `Provenance`, `ContributeCta`, `ControlRecord`,
  `OpenWork`, `SurfaceCards` (HTML/CSS, sin JS).
- **`/controls`** (índice de perfiles abiertos), **`/controls/evaluation-environment`** y
  **`/controls/agent-runtime`** (perfil completo con un ancla por control, tabla de mapeos, fuentes,
  preguntas abiertas, changelog, twin `.md`).
- **API y esquemas**: dataset `controls` en `/api/v1/controls.json`, ruta por ítem
  `/api/v1/controls/<id>.json`, esquema generado `/api/v1/schemas/controls.json` y registro
  `/schemas/control-observation.v1.json` (+ ejemplo + plantilla) para adaptadores futuros.
- **`/frontier`**: ruta de audiencia "Frontier labs & evaluators" con la plantilla de las rutas de
  "For you", un `FlowDiagram` de siete nodos y fuentes numeradas.
- **`/research`** y **`/research/the-evaluation-environment-is-part-of-the-system`**: índice con
  estado, temas previstos sin enlace y una nota real en borrador v0.1.0 (Jordi la aprueba antes del
  merge); twin `.md`.
- **`/contribute`**: "Help improve the engineering model", diez vías concretas hacia formularios de
  issue reales, qué contiene una buena revisión y procedencia.
- **`/cases`**: etiqueta "Incidents" en la navegación, sección "From incident to control" y notas de
  incidente opcionales en tres casos; `/incidents` y `/incidents/*` redirigen con 301 a `/cases`.
- **Home**: lede de apoyo y CTAs en la hero (arte y layout intactos), banda "Where AI Governance
  Engineering operates", lista de trabajo abierto y dos tiles nuevos.
- **`/about`** y **`/about/methodology`**: intereses de investigación, colaboración, preguntas
  abiertas, trabajo abierto, versionado y estado de revisión de perfiles y notas.
- **Enlaces contextuales**: desde patrones, obligaciones, amenazas, glosario, capítulos (mobiliario
  renderizado tras la prosa), `/stack`, `/agents` y el toolkit de agentes.
- **GitHub**: seis formularios de issue nuevos, `CONTRIBUTING.md`, plantilla de PR y README.
- **Navegación**: Controls (Practice), Frontier labs & evaluators (For you), Research (Reference),
  Contribute (About), Cases pasa a llamarse Incidents; sin grupos nuevos.
- **Registros compartidos**: `SOURCE_BY_PATH`, OG, `llms.txt`, `_redirects`, `_headers`, lhci, SEO
  gates, `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- **MCP** (código en el repo): `list_controls` y `get_control`; el redeploy del contenedor es aparte.
- **Analytics**: atributos declarativos de Umami en CTAs y descargas.

## Capabilities

### New Capabilities
- `control-profiles`: registro multi-perfil de controles abiertos, validadores, páginas de perfil,
  JSON, esquema de observación y enlaces contextuales hacia los controles.
- `frontier-route`: la ruta de audiencia `/frontier` para labs frontier y evaluadores.
- `research-notes`: colección de notas técnicas con estado, versión, revisores y twin Markdown.
- `contribute-route`: la página `/contribute` y los seis formularios de issue nuevos.
- `home-positioning`: lede y CTAs de la hero, banda "Where it operates", trabajo abierto y tiles.
- `project-provenance`: señales de procedencia y revisión en `/about`, `/about/methodology`,
  `StatusLine`, `Provenance` y la documentación de contribución.

### Modified Capabilities
- `incident-cases`: campos opcionales de nota de incidente, sección "From incident to control",
  etiqueta "Incidents" y redirección `/incidents`.
- `site-navigation`: cuatro destinos nuevos y la etiqueta Incidents, sin grupos nuevos.
- `bok-cross-links`: mobiliario "Related in the open reference" renderizado tras la prosa de los
  capítulos, sin editar ningún fichero de capítulo.

## Out of scope

- Páginas HTML por control (segunda iteración, cuando al menos la mitad de un perfil esté
  especificado).
- Un tercer perfil (assurance and evidence, data admission and privacy, deployment and monitoring).
- `/controls/crosswalk` (controles por marco, incluido AIUC-1), cuando haya al menos tres perfiles.
- Redeploy del contenedor MCP en callevictoria (necesita SSH; follow-up de Jordi).
- Traducciones: las rutas nuevas son solo en inglés, sin variantes `[lang]` ni hreflang.
- Cualquier rediseño de la navegación (menú móvil incluido), del arte o del layout de la hero, de la
  identidad visual o de URLs existentes.
- Revisores, adopción o respaldos inventados; los mapeos AIUC-1 no verificados en páginas públicas.

## Impact

- **Código nuevo**: `site/src/data/controls/*`, `people.ts`, `work.ts`, `open-questions.ts`,
  `research.ts`, `frontier.ts`, `chapter-links.ts`; `site/src/lib/{controls-md,research-pages,cross-links}.ts`;
  componentes `FlowDiagram`, `StatusLine`, `Provenance`, `ContributeCta`, `ControlRecord`,
  `OpenWork`, `SurfaceCards`; páginas `controls/*`, `frontier.astro`, `research/*`,
  `contribute.astro`, `api/v1/controls/[id].json.ts`; `research/<slug>.md`;
  `public/schemas/control-observation.v1.json` (+ ejemplo y plantilla).
- **Código modificado**: `pages/index.astro`, `pages/about/{index,methodology}.astro`,
  `pages/cases/*`, `data/cases.ts`, `lib/api.ts`, `lib/llms.ts`, `lib/llms-corpus.ts`,
  `content.config.ts`, `components/Citation.astro`, páginas de patrones, obligaciones, amenazas,
  glosario, capítulos, `/stack`, `/agents` y `/toolkit/agent-control-profile`; `tools/mcp-server`.
- **Registros compartidos**: `astro.config.ts` (`SOURCE_BY_PATH`), `data/nav.ts`,
  `lib/og-cards.ts`, `pages/llms.txt.ts`, `public/_redirects`, `public/_headers`,
  `lighthouserc.cjs`, `sources/SOURCES.md`, `bok/CHANGELOG.md`, `site/DESIGN.md`.
- **Tests nuevos**: `orp-core`, `orp-shell`, `controls`, `controls-runtime`, `controls-pages`,
  `frontier`, `research`, `contribute`, `incident-notes`, `about`, `bok-cross-links`,
  `orp-journeys`; ajustes en `nav`, `seo-basics`, `seo-titles`, `api`, `home`, `loop`, `hero-art`,
  `hero-field`.
- **Gates**: `check:links`, `seo-infra`, `geo` (llms.txt), `nav.spec`, títulos únicos, descripción
  70-160, un único ld+json, sin U+2014, axe, visual, lhci (perf ≥ 0.95; a11y, BP y SEO = 1).
- **Worktrees**: 19 bloques en `D:/Documents/aige-wt/orp-<bloque>` sobre `wt/orp-<bloque>`,
  integrados en `feat/open-reference-project` (`D:/Documents/aige-wt/orp`).
- Sin dependencias nuevas ni scripts inline; la CSP no cambia.
