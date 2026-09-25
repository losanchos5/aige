# Proposal

## Why

El Body of Knowledge nombra la organización como el quinto objeto de gobierno (capítulo 01: roles,
derechos de decisión, escalado, RACI), pero no lo desarrolla en ningún capítulo. Los comités solo
aparecen como anti-patrón (capítulo 04), la alfabetización en IA del `Art. 4` solo existe como fila
del mapa regulatorio (capítulo 08), y no hay nada sobre el comité de gobierno, la integración con la
gestión de riesgos corporativa y las tres líneas, los indicadores para la dirección y el consejo, la
revisión por la dirección, un canal interno para plantear preocupaciones, ni sobre las políticas a lo
largo del ciclo de vida (jerarquía, requisitos por fase, política como código, actualización de las
políticas existentes, adquisición de datos, IA de terceros y uso aceptable por la plantilla). Para la
versión v0.5.0, que aspira a ser la referencia sobre gobierno de la IA, falta el capítulo que convierte
la organización en un sistema gobernado con la misma lógica de ingeniería que el resto del libro: el
comité decide lo que una puerta no puede decidir y las puertas hacen cumplir lo decidido.

## What Changes

- Sustituir el esqueleto de `bok/12-governance-program.md` por el capítulo completo "12. Running the
  AI governance program" (H1 y formato de entradilla conservados; entradilla de una frase).
- Primera parte, la organización como objeto de gobierno: mapa de partes interesadas con deber,
  derecho de decisión y artefacto (consejo, dirección, CAIO/CDAO, comité, legal, privacidad/DPO,
  CISO, riesgos, auditoría interna, producto, ingeniería, ingeniero de gobierno de IA, compras, RR.
  HH., operadores, personas afectadas, proveedores); RACI por fase del ciclo de vida compilado desde
  un `raci.yaml`; diseño del comité (propósito, estatuto y composición, consultivo o vinculante,
  matriz de aceptación de riesgo residual, registro de excepciones como datos que leen las puertas,
  disparadores de revisión, cadencia y escalado); gestión de riesgos corporativa, modelo de las tres
  líneas y pruebas de auditoría interna; alfabetización en IA como código (`Art. 4` tras el Omnibus,
  currículos por perfil, registros de formación y atestación como condición de acceso en `OPA/Rego`);
  cultura (champions, incentivos, revisión sin culpables); canal interno de preocupaciones (`Art. 87`
  con la Directiva (UE) 2019/1937, SB 53 de California, ISO/IEC 42001 A.3.3); KPI y KRI para la
  dirección y el consejo; revisión por la dirección y mejora continua (ISO/IEC 42001 cláusulas 9 y 10
  solo por número); estrategia, valor y la pregunta de si usar IA; y cómo montar el programa sin
  capacidad de ingeniería.
- Segunda parte, las políticas a lo largo del ciclo de vida: jerarquía política, estándar,
  procedimiento y código; tabla de requisitos por fase (entrada, diseño, datos, construcción, prueba,
  lanzamiento, operación, cambio, retirada) con la puerta que lo hace cumplir, la evidencia y la capa;
  política como código con una única fuente YAML compilada a prosa y a una comprobación `Rego`;
  "Updating the policies you already have" con método de análisis de brechas (privacidad, seguridad,
  gobierno del dato, propiedad intelectual); política de adquisición de datos (scraping, brokers,
  etiquetado y condiciones de anotadores, acuerdos de intercambio, datos sintéticos); política de IA de
  terceros (marcador en compras, niveles de proveedor, cláusulas como controles, cadena de suministro
  y código abierto, casos de RR. HH.); y uso aceptable de la IA por la plantilla y shadow AI.
- Cierre con "What you can do this week" (cinco acciones) y `## Sources` con 24 referencias
  numeradas y verificadas (21 `primary`, 3 `secondary`).
- Fuera de alcance (van al fichero de handoff del orquestador, fuera del repo): `chapters.ts`
  (resumen y "at a glance"), glosario, `frameworks.ts`, `crosswalk.ts`, `sources/SOURCES.md`, enlaces
  cruzados desde otros capítulos, figura del RACI y el patrón "Sanctioned AI Gateway".

## Capabilities

### New Capabilities
- `bok-governance-program`: el capítulo 12 del Body of Knowledge sobre el programa de gobierno de la
  IA (organización y políticas a lo largo del ciclo de vida), con sus requisitos de contenido, fuentes
  y enlaces.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/12-governance-program.md` (reescrito). Ningún otro capítulo cambia.
- **Sitio**: sin cambios de código; la ruta `/bok/governance-program` ya existe y pasa a mostrar el
  capítulo completo. Los enlaces internos apuntan a rutas y anclas existentes (capítulos 03, 04, 05,
  07 y esqueletos 13, 14, 15, 17, 19 y 20 sin ancla).
- **OpenSpec**: nuevo cambio `bok-ch12-governance-program` con este proposal, `tasks.md` y la spec
  delta de `bok-governance-program`.
- **Verificación**: `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint,
  check-links, pagefind) en verde; `openspec validate bok-ch12-governance-program --strict` en verde.
- Sin dependencias nuevas.
