# Proposal

## Why

El Body of Knowledge trata a los agentes de IA en piezas sueltas: cuatro patrones del capítulo 05
(Agent Registry, Agent Identity & Scoped Credentials, Kill Switch / Circuit Breaker, Human-in-the-loop
Gate), la capa 04 del capítulo 04, la tabla de controles de agentes del capítulo 08 (TC260 Apéndice 2
frente a OWASP Agentic y NIST) y referencias en los capítulos 11, 15, 17 y 21 que ya enlazan a un
capítulo 23 que hoy es un esqueleto. Falta la síntesis neutral respecto a proveedores que diga qué
hace de un agente un objeto de gobierno distinto (autoridad delegada, herramientas, memoria,
autonomía) y cómo se gobierna de extremo a extremo con artefactos verificables, amenazas mapeadas a
controles y los ganchos legales del AI Act. También falta una página de entrada para quien llega
buscando «gobierno de agentes».

## What Changes

- `bok/23-governing-agents.md` pasa de esqueleto a capítulo completo (entre 4.000 y 7.000 palabras
  con tablas), conservando el H1 «# 23. Governing AI agents»:
  - qué hace de un agente un objeto de gobierno y niveles de autonomía (Knight Institute, IMDA, CSA
    ATF) ligados al `Art. 14(3)` y al principio de «least agency» de OWASP;
  - registro de agentes con los campos propios de un agente;
  - identidad de carga de trabajo y credenciales de vida corta (SPIFFE/SPIRE, intercambio de tokens
    RFC 8693, la especificación de autorización de MCP 2026-07-28 con CIMD, indicadores de recurso,
    audiencia, prohibición de token passthrough, minimización de scopes);
  - permisos de herramientas y servidores MCP con allow-lists y admisión de servidores;
  - puntos de control humanos y diseño de aprobaciones;
  - guardrails en tiempo de ejecución para llamadas a herramientas (AARM, ACS, postura ante fallo);
  - kill switch y circuit breakers por agente, con niveles de parada y simulacros;
  - gobierno de la memoria y del contexto;
  - sistemas multiagente y cadenas de delegación A2A (v1.0, AAIF) con rendición de cuentas por salto;
  - prompts y system prompts como configuración versionada bajo control de cambios;
  - taxonomía de incidentes de agentes y telemetría con las convenciones GenAI de OpenTelemetry;
  - tabla amenaza-control con OWASP Agentic 2026, OWASP LLM Top 10 2026 y técnicas de MITRE ATLAS;
  - marcos: iniciativa de estándares de agentes de NIST, trabajo agéntico de CSA, marco agéntico de
    IMDA, Apéndice 2 del TC260 y el Agent Control Standard de OWASP;
  - ganchos del AI Act (`Arts. 12, 14, 15, 25, 26, 50`, GPAI `Arts. 53, 55` con el Código de Buenas
    Prácticas);
  - cierre «What you can do this week», línea «Maps to» y fuentes numeradas.
- Nueva página `site/src/pages/agents.astro` (`/agents`): portada para practicantes con el encuadre,
  el plano de control en lista, enlaces a las secciones del capítulo 23, a los patrones, a las filas
  del capítulo 08, a las categorías de herramientas y a la tabla de amenazas.
- Registros compartidos: `SOURCE_BY_PATH` (ruta `/agents`), `sources/SOURCES.md` (sección del
  capítulo 23), `bok/CHANGELOG.md` (viñetas bajo «Unreleased (v0.5.0)»).
- Una spec de Playwright nueva para la página y el capítulo, que se ejecuta después de forma central.

## Capabilities

### New Capabilities
- `bok-governing-agents`: el capítulo 23 del Body of Knowledge sobre el gobierno de agentes de IA.
- `agents-hub`: la página `/agents` como entrada al gobierno de agentes.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/23-governing-agents.md` y `site/src/pages/agents.astro`. Enlaza solo a rutas y
  anclas que existen en esta rama (capítulos 03, 04, 05, 08, 11, 14, 15, 17, 18, 19 y 21,
  `/resources/tools`, `/resources/harms`, `/cases`).
- **Ficheros compartidos**: el menú de navegación, `chapters.ts` (resumen y «at a glance»), el
  glosario, las obligaciones, el crosswalk, `lighthouserc.cjs`, `llms.txt` y el recuento de rutas de
  `seo-infra.spec.ts` no se tocan aquí: van al handoff
  `D:/Documents/aige-wt/handoffs/b-c23-agents.json`, junto con el brief de la figura del plano de
  control de agentes y los enlaces previstos a rutas que otros bloques crean en paralelo.
- **Build**: `astro check`, `astro build`, content-lint (sin rayas largas) y check-links deben pasar.
- Sin dependencias nuevas.
