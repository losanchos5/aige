# Proposal

## Why

El catálogo de patrones cubre bien el lado de construcción (política como código, evals, registro,
guardarraíles, evidencia) pero se queda corto en el lado del despliegue y el uso, justo donde viven
la mayoría de las obligaciones de un desplegador: avisar a la persona afectada por una decisión
automatizada y darle una vía para impugnarla, atender derechos de los interesados que llegan hasta
el modelo, gobernar el uso que el personal hace de herramientas de IA, sacar cambios a producción
por etapas con criterios de vuelta atrás, vigilar la deriva y la equidad en producción, controlar los
usos secundarios y los consumidores aguas abajo, comunicar hacia fuera y desactivar, localizar o
retirar un sistema. Los capítulos 11 a 23 ya describen estas prácticas en prosa; les falta la unidad
enlazable, citable y con diagrama que el sitio da a cada patrón.

## What Changes

- **Ocho patrones nuevos** en `bok/patterns/<slug>.md`, con el contrato de frontmatter de
  `patterns-as-pages` (`id`, `title`, `layer`, `secondaryLayer` opcional, `order` 18 a 25,
  `summary`) y la plantilla de STYLEGUIDE §4, más una subsección `### Forces` bajo `## Problem`, un
  artefacto JSON ilustrativo y una línea **Maps to** con artículos del AI Act, identificadores del
  Anexo A de ISO/IEC 42001, subcategorías del NIST AI RMF y, donde procede, identificadores OWASP:
  - `decision-notice-contest-path` (Decision Notice & Contest Path; capas 04 y 05);
  - `rights-requests-against-models` (Rights Requests Against Models; capas 02 y 05);
  - `sanctioned-ai-gateway` (Sanctioned AI Gateway; capas 04 y 02);
  - `staged-rollout-rollback-criteria` (Staged Rollout with Rollback Criteria; capa 04);
  - `drift-fairness-monitor` (Drift & Fairness Monitor; capas 04 y 05);
  - `downstream-use-register` (Downstream Use Register; capas 02 y 01);
  - `disclosure-notification-pipeline` (Disclosure & Notification Pipeline; capas 05 y 02);
  - `deactivation-localisation-retirement-runbook` (Deactivation, Localisation & Retirement
    Runbook; capas 04 y 02).
- **Reutilización de esquemas**: tres artefactos son instancias de esquemas publicados y validan
  contra ellos (`evidence-record`, `post-market-monitoring-plan`, `decommissioning-runbook`); los
  patrones enlazan además `training-record`, `go-no-go` y `deployment-decision-record` en
  `/resources/templates`.
- **Catálogo**: una sección `## Pattern: <Nombre>` por patrón en `bok/05-patterns.md`, con resumen y
  enlace a `/patterns/<slug>`, sin citas propias.
- **Índice**: ocho entradas añadidas al final de `site/src/data/patterns.ts`.
- **Diagramas archify**: un IR por patrón en `site/diagrams/<slug>.<tipo>.json` (secuencia,
  arquitectura, ciclo de vida, dos flujos de datos y tres flujos de trabajo), cada uno con su
  `<slug>.notes.json` y una entrada en `site/src/data/diagrams.ts` colocada en su página de patrón.
  Los ocho IR pasan `archify validate --quality showcase`.
- **Enlaces desde los capítulos**: las frases de los capítulos 11 a 19, 22 y 23 que ya describen
  cada práctica enlazan la página del patrón, sin reescribir la prosa.
- **Mapa**: `site/src/data/map.ts` añade cortos para los cinco nombres más largos; se regeneran
  `pattern-map.svg` y `discipline-map.svg`.
- **Registros**: sección añadida en `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md` bajo
  "Unreleased (v0.5.0)". El BoK público de AIGP v2.1 se cita por código de competencia (IV.C),
  parafraseado y con la nota de no afiliación con IAPP.
- Fuera de alcance (handoff al orquestador): navegación, glosario, filas de obligaciones y del
  crosswalk que apunten a los patrones nuevos, `x-pattern` de los esquemas reutilizados, las
  comprobaciones de compatibilidad en `schemas-check.mjs` y la renumeración de `order` si otro
  bloque añade patrones antes que este.

## Capabilities

### New Capabilities
- `deployment-side-patterns`: los ocho patrones del lado del despliegue y el uso, su presencia en el
  catálogo y el índice, sus diagramas, sus artefactos ligados a esquemas y los enlaces desde los
  capítulos que describen cada práctica.

### Modified Capabilities
- (ninguna en `openspec/specs/`). Se apoya en la capacidad `pattern-pages` del cambio abierto
  `patterns-as-pages`, cuyo contrato de fichero, índice y catálogo cumplen los ocho patrones.

## Impact

- **Nuevos**: `bok/patterns/*.md` (8), `site/diagrams/*.json` (8 IR y 8 notas),
  `site/tests/patterns-deployment-side.spec.ts`.
- **Modificados**: `bok/05-patterns.md`, `site/src/data/patterns.ts`, `site/src/data/diagrams.ts`,
  `site/src/data/map.ts`, `site/src/figures/pattern-map.svg`, `site/src/figures/discipline-map.svg`,
  `bok/11-ai-defined.md` a `bok/19-privacy-and-ai.md`, `bok/22-principles-and-standards.md`,
  `bok/23-governing-agents.md`, `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Las páginas `/patterns/<slug>` se fechan en el
  sitemap por el bloque existente de `SOURCE_BY_PATH`, que se genera desde `patterns.ts`. Las
  correspondencias son ilustrativas, no una declaración de conformidad.
