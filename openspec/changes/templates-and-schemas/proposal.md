# Proposal

## Why

El sitio dice que la gobernanza es código, pero hasta ahora solo publica formas JSON ilustrativas
sueltas dentro del capítulo de patrones (entrada de registro, veredicto, resultado de eval, registro
de evidencia). Un lector que quiera aplicar la disciplina el lunes necesita los registros completos
que produce cada paso del ciclo de vida, en un formato que una máquina pueda validar y una persona
pueda rellenar, y necesita saber qué obligación ayuda a evidenciar cada campo. Sin eso, la
referencia explica el qué pero no entrega el artefacto.

## What Changes

- **Biblioteca de JSON Schemas** (draft 2020-12) en `site/public/schemas/`: 21 esquemas `v1` con
  `$id` bajo `https://aigovernanceengineer.com/schemas/`, `title`, `description`, campos requeridos
  y anotaciones `x-evidences` (referencias a obligaciones por identificador), `x-layer`,
  `x-pattern` y `x-lifecycle-stage`. Los 20 pedidos (del `use-case-record` al `policy-card`) más un
  `evidence-record` común. Las formas del capítulo 05 validan contra ellos.
- **Ejemplos rellenos** en `site/public/schemas/examples/` (uno por esquema, todos validan) y
  **plantillas humanas** en `site/public/templates/<nombre>.md` con los mismos campos y guía breve.
- **Kit de políticas** en `site/public/templates/`: `ai-policy.yaml` como fuente única con sus dos
  vistas (`ai-policy.md` en prosa y el esqueleto `ai-policy.rego`), `committee-charter.md`,
  `raci.csv`, `policy-gap-assessment.csv`, `literacy-curriculum.csv` y
  `contract-clause-checklist.md`. Todo original, sin texto de terceros.
- **Comprobación en la build**: `site/scripts/schemas-check.mjs`, sin dependencias nuevas, se añade
  al final del script `build` de `site/package.json`.
- **Página** `/resources/templates` que lista cada esquema y cada plantilla con su propósito, las
  obligaciones que evidencia, el patrón al que pertenece, la capa y los enlaces de descarga; la ruta
  entra en `SOURCE_BY_PATH` de `site/astro.config.ts`.
- **Cabeceras** en `site/public/_headers` para `/schemas/*` (`application/schema+json`, CORS
  abierto) y `/schemas/examples/*` (`application/json`).
- Fuera de alcance: entradas de navegación, tarjeta en el hub de Resources, glosario, llms.txt y
  enlaces desde capítulos (van al handoff para el orquestador); patrones nuevos en el capítulo 05.

## Capabilities

### New Capabilities
- `governance-templates`: la biblioteca de esquemas, ejemplos y plantillas, su validación en la
  build y la página que la publica.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/public/schemas/*.v1.json` (21), `site/public/schemas/examples/*.example.json`
  (21), `site/public/templates/*` (21 plantillas `.md` más 8 ficheros del kit),
  `site/scripts/schemas-check.mjs`, `site/src/data/templates.ts`, `site/src/lib/schemas-library.ts`,
  `site/src/pages/resources/templates.astro`.
- **Modificados**: `site/package.json` (solo el script `build`), `site/astro.config.ts` (una entrada
  en `SOURCE_BY_PATH`), `site/public/_headers` (un bloque nuevo al final).
- Sin dependencias nuevas; `node_modules` no cambia. Sin cambios en `bok/*.md`.
- Las correspondencias con obligaciones son ilustrativas, no una declaración de conformidad ni
  asesoramiento jurídico.
