# Tasks

Worktree `D:/Documents/aige-wt/w2-threats` (rama `wt/w2-threats`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Los registros compartidos se tocan solo por anexión
(`SOURCE_BY_PATH`, `sources/SOURCES.md`, `bok/CHANGELOG.md`, el dataset de `src/lib/api.ts`); el
resto va al handoff.

## 1. Investigación y verificación

- [x] 1.1 Leer los ids y nombres de MITRE ATLAS y sus mitigaciones en los datos de la versión v2026.09 (`dist/v6/ATLAS-2026.09.yaml` del repositorio `mitre-atlas/atlas-data`).
- [x] 1.2 Verificar la lista OWASP LLM 2026 (página del recurso y `2026/final` en GitHub) y los ids de 2025 para `formerly`.
- [x] 1.3 Verificar los nombres ASI01 a ASI10 en el índice del PDF de OWASP Agentic 2026.
- [x] 1.4 Verificar los ids `NISTAML` de NIST AI 100-2 E2025 en el PDF, las tareas de NIST SP 800-218A citadas y el estado de COSAiS en la página del proyecto (a 2026-09-24).
- [x] 1.5 Verificar los nombres de las comprobaciones: tareas de Inspect Evals, plugins de promptfoo y sondas de garak v0.17.0.
- [x] 1.6 Verificar los ids y títulos cortos del Anexo A de ISO/IEC 42001 y los dominios de CSA AICM v1.1.

## 2. Patrones

- [x] 2.1 Extender `bok/patterns/incident-pipeline.md` (severidad y `Art. 73`, incidencia frente a incidente, registro, RCA y CAPA, revisión sin culpa, simulacros, `Art. 26(5)`).
- [x] 2.2 Generalizar `bok/patterns/fria-as-code.md` como Impact-Assessment-as-Code sin cambiar slug ni ancla.
- [x] 2.3 Añadir a `bok/patterns/adversarial-red-team-suite.md` el paso del modelo de amenazas al plan de pruebas.
- [x] 2.4 Añadir a `bok/patterns/vendor-model-due-diligence-gate.md` la fase de operación.
- [x] 2.5 Renumerar las citas por orden de aparición y comprobar que cada fuente se cita.

## 3. Datos, página y API

- [x] 3.1 Crear `site/src/data/threats.ts` con las cuatro taxonomías, las tablas de consulta y `threatProblems()`.
- [x] 3.2 Crear `site/src/pages/resources/threats.astro` y `site/src/styles/threats.css` (filtros en CSS puro, estado vacío, JSON-LD `Dataset`).
- [x] 3.3 Crear `site/src/pages/resources/threats.csv.ts`.
- [x] 3.4 Añadir el dataset `threats` al final del registro de `site/src/lib/api.ts`.
- [x] 3.5 Añadir `/resources/threats` a `SOURCE_BY_PATH` en `site/astro.config.ts`.
- [x] 3.6 Escribir `site/tests/threats.spec.ts` (no se ejecuta en este bloque).

## 4. Registros y entrega

- [x] 4.1 Añadir la sección del bloque a `sources/SOURCES.md` y las viñetas a `bok/CHANGELOG.md`.
- [x] 4.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 4.3 Ejecutar `openspec validate threats-bridge-and-pattern-extensions --strict` hasta que pase.
- [x] 4.4 Escribir `D:/Documents/aige-wt/handoffs/w2-threats.json`.
