# Proposal

## Why

El PR #51 cruzó los 79 controles con el *Model AI Governance Framework for Agentic AI* v1.5 de IMDA
(Singapur) y dejó anotados 16 huecos: recomendaciones de IMDA que ningún control cubre. También dejó
dos tensiones abiertas en `imda-agentic.ts`. En AGENT-009 el aprobador ve «la llamada en bruto
primero», mientras que IMDA p.29 pide solicitudes breves, sin «long logs or raw data». En AGENT-028
todo cambio de prompt pasa por la suite y un canary, mientras que IMDA p.45 admite una revisión
«lighter» para refinamientos menores. Es la siguiente tanda de controles del roadmap §13. Cerrarla
convierte el mapeo con IMDA en cobertura y no solo en una lista de lo que falta.

## What Changes

- El **capítulo 23** (`bok/23-governing-agents.md`) incorpora con citas de página de IMDA la
  sustancia de los 16 huecos:
  - párrafos nuevos en las secciones existentes (puntos de control, aprobaciones, guardrails,
    multiagente, credenciales, allow-list, telemetría y amenazas);
  - un H2 nuevo, «Putting agents in front of people», sobre transparencia al usuario, formación y
    camino manual, rollout por cohortes, responsabilidades por equipo y aprendizaje del uso.
- Hay **11 controles nuevos derivados** en el perfil `agent-runtime` (AIGE-CTL-AGENT-032 a 042), uno
  por semilla nueva, añadidas al final de `agentControls` en `site/src/data/tool-agent-controls.ts`.
- Hay **3 controles nuevos derivados** en `deployment-and-monitoring` (AIGE-CTL-DEPLOY-016 a 018),
  con `derivedFrom` al capítulo 23 y a un esquema de registro donde lo haya.
- **Dos controles se amplían:**
  - AGENT-004 (Traces): las trazas son append-only y nadie las borra dentro de su retención (IMDA
    p.44).
  - DEPLOY-005 (Staged rollout): el escalonado es también por cohorte de usuarios, conjunto de
    herramientas y sistemas expuestos (IMDA p.42).
- **Tensión AGENT-009:** la regla no cambia. El cap. 23 aclara que «la llamada» se muestra en forma
  breve (herramienta, destino y parámetros clave, nunca un volcado de log), y el control nuevo de
  solicitudes de aprobación fija su contenido. La nota IMDA se ajusta a esta conciliación.
- **Tensión AGENT-028:** la regla sigue estricta a propósito. El cap. 23 explica por qué y la nota IMDA
  pasa de «Tension» a una decisión deliberada: IMDA se cita para el control de cambios, no para su
  rigor.
- Hay xrefs IMDA `direct` para los 14 controles nuevos.
- Los perfiles `agent-runtime` y `deployment-and-monitoring` pasan a v0.2 con entrada de changelog.
- La herramienta `/toolkit/agent-control-profile` recibe reglas de selección para las 11 semillas
  nuevas.
- Se actualizan los recuentos en prosa: `bok/CHANGELOG.md` (Unreleased: 93 controles) y
  `site/src/data/work.ts`.

## Capabilities

### New Capabilities
Ninguna.

### Modified Capabilities
- `control-profiles`: el perfil Agent Runtime pasa a 42 controles derivados (v0.2) y el perfil
  Deployment and Monitoring admite hasta 18. Estos últimos pueden derivar del capítulo 23 más un
  esquema. Se añade un requisito de cobertura de los huecos IMDA.
- `bok-governing-agents`: el capítulo añade la sección sobre las personas alrededor del agente y el
  tratamiento de las dos tensiones con IMDA; el límite de extensión se ajusta al tamaño real.

## Impact

- Datos:
  - `site/src/data/tool-agent-controls.ts`, que alimenta el cap. 23, `/agents`, el toolkit y la API;
  - `site/src/data/controls/agent-runtime.ts`, `deployment-and-monitoring.ts` e `imda-agentic.ts`;
  - `site/src/data/work.ts`.
- Contenido: `bok/23-governing-agents.md` y `bok/CHANGELOG.md`.
- Cliente: `site/public/toolkit/agent-control-profile.js`.
- Tests con recuentos fijos: `site/tests/controls-runtime.spec.ts` (31 → 42) y las expectativas de
  selección de `toolkit-builders-b.spec.ts`, si cambian.
- Salidas regeneradas en build: `/api/v1/controls.json` (93 controles; la clave `crosswalk` gana
  filas IMDA), `/controls/crosswalk`, `llms.txt` y el sitemap. El servidor MCP lee la API y no
  necesita redespliegue.
- Sin dependencias nuevas.
