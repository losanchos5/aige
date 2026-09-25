# Tasks

Rama `wt/b-c23-agents` en el worktree `D:/Documents/aige-wt/b-c23-agents`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque van al
handoff `D:/Documents/aige-wt/handoffs/b-c23-agents.json`.

## 1. Investigación y verificación de fuentes

- [x] 1.1 Leer STYLEGUIDE.md, los patrones de agentes del capítulo 05, la capa 04 del capítulo 04, la tabla de controles de agentes del capítulo 08 y las secciones de los capítulos 11, 15, 17, 18 y 21 que enlazan al capítulo 23.
- [x] 1.2 Verificar la especificación de autorización de MCP 2026-07-28 (CIMD, RFC 8707, RFC 9728, RFC 9207, audiencia, token passthrough, step-up) y sus buenas prácticas de seguridad.
- [x] 1.3 Verificar SPIFFE/SPIRE, RFC 8693, el borrador de CIMD, el borrador de Transaction Tokens y el grupo WIMSE.
- [x] 1.4 Verificar el estado de A2A (v1.0, Agent Card firmada, autorización en tarea, ingreso en la AAIF).
- [x] 1.5 Verificar OWASP Agentic Top 10 2026 (nombres oficiales ASI01-ASI10), OWASP GenAI LLM Top 10 2026 (orden y nombres), el Agent Control Standard y la release v2026.09 de MITRE ATLAS.
- [x] 1.6 Verificar las convenciones GenAI de OpenTelemetry (spans de agente, `execute_tool`, MCP, estado Development).
- [x] 1.7 Verificar la iniciativa de estándares de agentes de NIST, el trabajo agéntico de CSA (ATF, AARM), el marco agéntico de IMDA v1.5 y el Apéndice 2 del TC260.
- [x] 1.8 Verificar los artículos del AI Act (`12, 14, 15, 26, 50`) y los Apéndices 1.3 y 1.4 del Código de Buenas Prácticas GPAI.
- [x] 1.9 Registrar como «(verify)» lo no confirmado.

## 2. Redacción del capítulo

- [x] 2.1 Escribir el objeto de gobierno, los niveles de autonomía y el registro de agentes.
- [x] 2.2 Escribir identidad, credenciales de vida corta, delegación y la autorización de MCP.
- [x] 2.3 Escribir permisos de herramientas, admisión de servidores MCP y puntos de control humanos.
- [x] 2.4 Escribir guardrails de llamadas a herramientas, kill switch y circuit breakers.
- [x] 2.5 Escribir memoria y contexto, sistemas multiagente y rendición de cuentas por salto.
- [x] 2.6 Escribir prompts como configuración, taxonomía de incidentes y telemetría.
- [x] 2.7 Escribir la tabla amenaza-control, los marcos para agentes y los ganchos del AI Act.
- [x] 2.8 Cerrar con «What you can do this week», «Maps to» y «Sources»; comprobar que no hay rayas largas y que cada [n] tiene fuente.

## 3. Página /agents

- [x] 3.1 Crear `site/src/pages/agents.astro` con encuadre, plano de control, patrones, filas del capítulo 08, categorías de herramientas y tabla de amenazas.
- [x] 3.2 Añadir `/agents` a `SOURCE_BY_PATH` en `site/astro.config.ts` como bloque contiguo con comentario.
- [x] 3.3 Escribir `site/tests/agents-hub.spec.ts` coherente con la página y el capítulo.

## 4. Registros, verificación y entrega

- [x] 4.1 Añadir la sección del capítulo 23 a `sources/SOURCES.md` y las viñetas a `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)».
- [x] 4.2 Validar el cambio con `openspec validate bok-ch23-governing-agents --strict`.
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar que termina con código 0.
- [x] 4.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/b-c23-agents.json` y comprobar que es JSON válido.
- [x] 4.5 Hacer commit de los ficheros propios añadiéndolos por ruta explícita.
