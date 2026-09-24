# Proposal

## Why

El sitio hace afirmaciones fechadas ("as of 2026-09-24") sobre leyes, guías, normas y marcos que
cambian sin avisar: una nueva versión consolidada del Reglamento de IA, una norma armonizada citada
en el Diario Oficial, un borrador del NIST que pasa a final, un proyecto de ley firmado. Hoy nadie
se entera hasta la siguiente revisión manual, y la referencia envejece en silencio. Hace falta una
señal diaria, revisable y trazable a los ficheros que citan cada fuente, sin que ninguna máquina
publique nada por su cuenta.

## What Changes

- **Monitor** en `tools/reg-monitor/` (Node 22 sin dependencias): `monitor.mjs` y los módulos de
  `lib/` (captura cortés con User-Agent del sitio, una petición por segundo, tiempo límite,
  reintentos con espera y `Retry-After`; normalización de HTML a texto estable con pistas por
  fuente; hash SHA-256; diff unificado truncado; ficheros que citan la URL con `git grep`;
  apertura o comentario de incidencias).
- **Lista de fuentes** `tools/reg-monitor/sources.json`: 34 páginas oficiales que el sitio ya cita
  (EUR-Lex, Omnibus, AI Act Service Desk, Comisión, CEN-CENELEC JTC 21, NIST, OWASP GenAI, Ley
  Básica de IA de Corea en law.go.kr, proyectos de California, Nueva York, Colorado y Texas, EDPB,
  ICO, CNIL, página AIGP de la IAPP, International AI Safety Report), cada una con su pista de
  normalización. `--check` falla si una URL no aparece en ningún fichero versionado.
- **Workflow** `.github/workflows/reg-monitor.yml`: cron diario a las 06:17 UTC y
  `workflow_dispatch` con entrada `dry_run` (marcada por defecto) y `only`; permisos
  `contents: write` e `issues: write` solo en el job; grupo de concurrencia; acciones fijadas por
  SHA; `timeout-minutes: 15`.
- **Estado fuera de `main`**: rama huérfana `reg-monitor-state` escrita con el `GITHUB_TOKEN`,
  porque cada push a `main` despliega el sitio.
- **Incidencias** con la etiqueta `regulatory-change` (se crea si falta): fuente, URL, extracto del
  diff y ficheros afectados; si ya hay una abierta para la misma fuente, se comenta en ella.
- **Pruebas** `node --test` en `tools/reg-monitor/test/` (normalización, diff, formato de
  incidencias, citas, fuentes, captura, cliente de GitHub, bucle completo con dobles, workflow) y
  **README** con el funcionamiento y cómo añadir una fuente.
- Fuera de alcance: el enlace desde `/about/methodology` (lo crea otro bloque; va al handoff), la
  ejecución del workflow y la creación de incidencias desde este entorno.

## Capabilities

### New Capabilities
- `regulatory-monitor`: vigilancia diaria de las fuentes oficiales citadas, con estado fuera de
  `main` y aviso por incidencias, sin publicación automática.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `.github/workflows/reg-monitor.yml`, `tools/reg-monitor/` (`monitor.mjs`,
  `sources.json`, `README.md`, `lib/*.mjs`, `test/*.test.mjs`).
- **Registros compartidos**: `sources/SOURCES.md` (sección del README con cuatro filas de la
  documentación de GitHub) y `bok/CHANGELOG.md` (viñeta en "Unreleased (v0.5.0)").
- Sin cambios en `site/`, sin dependencias nuevas, sin rutas nuevas; `site/node_modules` intacto.
- Primera ejecución: solo inicializa el estado, no abre incidencias.
