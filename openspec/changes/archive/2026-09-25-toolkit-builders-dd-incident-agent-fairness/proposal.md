# Proposal

## Why

El toolkit ya tiene contrato (registro, `ToolShell`, `lib.js`) y una primera herramienta, la
autoevaluación de madurez. Cuatro capítulos del Body of Knowledge terminan en un documento que el
lector tiene que redactar a mano cada vez: la petición de due diligence a un proveedor de IA
(capítulo 15 y el patrón Vendor / Model Due-Diligence Gate), el calendario de notificaciones de un
incidente (capítulo 17, "The overlapping clocks"), el perfil de controles y la entrada de registro
de un agente (capítulo 23) y la elección de la métrica de equidad (capítulo 16, "Choosing a
fairness metric by use case"). Son documentos con estructura fija, fuentes ya verificadas en los
capítulos y esquemas JSON ya publicados en `/schemas/*`. Convertirlos en herramientas del toolkit
ahorra horas y, sobre todo, evita que cada equipo reescriba los plazos o los controles con errores.

La regla de estas cuatro herramientas es que nunca afirman más que su capítulo: los plazos, las
escalas, los controles y las métricas se leen de datos que reproducen las tablas del capítulo celda
a celda, y las pruebas lo comprueban.

## What Changes

- **Cuatro herramientas nuevas** sobre el contrato del toolkit, cada una con su página
  `site/src/pages/toolkit/<id>.astro`, sus datos `site/src/data/tool-*.ts` y su módulo de cliente
  `site/public/toolkit/<id>.js`:
  - `/toolkit/vendor-due-diligence`: tipo de suministro, nivel de uso, sensibilidad de los datos,
    autonomía y acceso a herramientas, jurisdicciones y sector producen un nivel de riesgo con sus
    razones, entre 20 y 40 peticiones de artefactos propias del sitio (model card, AIBOM, informes
    de evaluación y red team, SLA y reloj de notificación de incidentes, resumen del contenido de
    entrenamiento, política de derechos de autor, subencargados) con referencias cruzadas solo a
    temas del crosswalk y a ids de control CSA AICM que el crosswalk ya verifica, y una lista de
    cláusulas contractuales sacada de `site/src/data/contracts.ts`. Exporta Markdown, CSV y un
    registro de respuesta JSON que valida contra `vendor-due-diligence-response.v1`.
  - `/toolkit/incident-clock`: hora de conocimiento, roles, nivel del sistema y hechos producen la
    clase de incidente en la escala del capítulo 17, quién notifica a quién y cada plazo como fecha
    de calendario para AI Act Art. 73, Art. 26(5) y Art. 55(1)(c) con el Código de Buenas
    Prácticas, RGPD Arts. 33 y 34, NIS2 Art. 23 y DORA Art. 19 con el RTS 2025/301, tal y como los
    enuncia el capítulo. Recordatorios `.ics`, un esqueleto de registro que valida contra
    `incident-record.v1`, un resumen Markdown y un aviso destacado "verify with counsel or the
    authority".
  - `/toolkit/agent-control-profile`: autonomía, herramientas y servidores MCP con sus permisos,
    clases de datos, memoria, acciones externas, modelo de identidad y puntos de aprobación
    producen el conjunto mínimo de controles del capítulo 23 y de los patrones de agentes, las
    carencias que cerrar, una entrada de registro que valida contra `agent-register-entry.v1` y una
    lista de comprobación (Markdown y CSV).
  - `/toolkit/fairness-metric-chooser`: el árbol de decisión del capítulo 16 (verdad de referencia,
    error más costoso, asignación o calidad de servicio, marco legal, acceso al atributo protegido)
    produce familias de métricas principales, comprobaciones secundarias, advertencias y notas
    legales, cada una enlazada a su ancla del capítulo 16; exporta Markdown y JSON.
- **Piezas comunes nuevas** para herramientas que convierten un cuestionario en documento:
  `site/public/toolkit/form-kit.js` (leer el formulario al objeto de parámetros del fragmento y
  volver, resumen de errores accesible, aritmética de fechas en UTC), `ToolTerms.astro` (enlaces
  al glosario de los términos que usa la herramienta, sin enlaces rotos si un término cambia),
  `ToolSourceList.astro` (fuentes numeradas en el formato de la casa con anclas `src-<n>`),
  `tool-docs.css` y `site/src/lib/tool-anchors.ts` (resuelve las anclas de capítulo y rompe la build
  si un encabezado desaparece).
- **Registro**: cuatro entradas `live` añadidas al final de `site/src/data/toolkit.ts`.
- **Registros compartidos**: un bloque en `SOURCE_BY_PATH` de `site/astro.config.ts`, una sección en
  `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".
- **Pruebas**: `site/tests/toolkit-builders-b.spec.ts` (datos contra los capítulos 16, 17 y 23,
  lógica pura en Node, esquemas con `site/tests/helpers/schema-library.ts`, páginas sin JavaScript,
  flujo en el navegador, exportaciones, sin red e impresión).
- Fuera de alcance (van al handoff): navegación, tarjetas en `/resources` y en los hubs, enlaces
  desde los capítulos 15, 16, 17 y 23, entradas en `llms.txt` y recuento de rutas en las pruebas de
  SEO.

## Capabilities

### New Capabilities
- `toolkit-document-builders`: las cuatro herramientas que convierten un cuestionario en un
  documento (due diligence de proveedor, reloj de incidentes, perfil de controles de agente y
  selector de métrica de equidad) y las piezas comunes que comparten.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/src/pages/toolkit/{vendor-due-diligence,incident-clock,agent-control-profile,fairness-metric-chooser}.astro`,
  `site/public/toolkit/{vendor-due-diligence,incident-clock,agent-control-profile,fairness-metric-chooser,form-kit}.js`,
  `site/src/data/{tool-vendor-dd,tool-incident-clock,tool-agent-controls,tool-fairness-chooser}.ts`,
  `site/src/components/toolkit/{ToolTerms.astro,ToolSourceList.astro,tool-docs.css}`,
  `site/src/lib/tool-anchors.ts`, `site/tests/toolkit-builders-b.spec.ts`,
  `site/tests/helpers/schema-library.ts`.
- **Modificados**: `site/src/data/toolkit.ts` (cuatro entradas al final), `site/astro.config.ts`
  (un bloque en `SOURCE_BY_PATH`), `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Sin cambios en `bok/*.md` salvo el changelog ni
  en los encabezados de ningún capítulo. `site/public/_headers` no cambia: la CSP actual admite todo.
- Los resultados son orientativos: "Indicative, not legal advice and not a conformity claim". Los
  plazos no aplican reglas de cómputo de plazos, fines de semana ni festivos y no deciden si un
  evento es notificable.
