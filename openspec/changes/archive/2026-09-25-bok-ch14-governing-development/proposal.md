# Proposal

## Why

El Body of Knowledge explica las cinco capas del stack y los patrones, pero no recorre el lado del
proveedor del ciclo de vida: cómo se gobierna un sistema de IA mientras se construye, desde el caso
de uso hasta la publicación. Hoy no hay en el libro un registro de caso de uso, una revisión de
diseño, un procedimiento de admisión de datos, una matriz de tipos de prueba, una lectura de la
validez estadística de los evals, las rutas de conformidad del AI Act en orden, el Anexo IV elemento
a elemento ni una comparación de las evaluaciones de impacto. Para que el sitio sea la referencia de
la disciplina en la v0.5.0, el capítulo 14 cubre ese hueco con la voz de ingeniería de la casa: cada
deber ligado al artefacto que lo evidencia, a la capa que lo produce y al registro de evidencia.

## What Changes

- **Capítulo 14** (`bok/14-governing-development.md`): sustituye el esqueleto por el capítulo
  completo "14. Governing AI development", con H1 y entradilla de una frase, y las secciones:
  la construcción como cadena de puertas; el registro de caso de uso (propósito previsto, usos
  fuera de alcance, autoridad de decisión, apetito de falsos positivos frente a falsos negativos,
  "¿es la IA la herramienta?", deriva de función); revisión de diseño (requisitos con trazabilidad,
  compromisos de arquitectura y selección de modelo, uso indebido razonablemente previsible,
  supervisión y controles de diseño); datos de entrenamiento y prueba (derecho de uso, calidad y
  representatividad, dueño frente a administrador, procedencia frente a linaje, datos sintéticos y
  PET); pruebas y validación (plan previo, matriz de tipos de prueba para ML clásico y LLM/agentes,
  validez estadística, validación independiente con SR 26-2 y SS1/23, reproducibilidad, qué falla);
  preparación de la publicación y conformidad (go/no-go, Anexo VI frente a VII, secuencia
  declaración-marcado CE-registro, modificación sustancial); el expediente técnico (Anexo IV
  elemento a elemento, tarjetas de modelo y sistema y hojas de datos, lado del proveedor GPAI,
  publicación de pesos abiertos, conservación de registros, divulgación pública); evaluaciones de
  impacto comparadas (AIIA ISO/IEC 42005, DPIA, FRIA, AIA de Canadá, auditoría LL 144, validación
  de modelos). Cierra con "What you can do this week", la línea **Maps to** y `## Sources`.
- **Fuentes**: 54 referencias numeradas y verificadas, con su sección
  `### bok/14-governing-development.md` añadida al final de `sources/SOURCES.md`.
- **Handoff** fuera del repo (`D:/Documents/aige-wt/handoffs/c14-governing-development.json`) con
  lo que el orquestador debe aplicar en ficheros compartidos: resumen y "at a glance" del capítulo,
  términos de glosario, filas de obligaciones y crosswalk, figuras propuestas, patrones pendientes y
  enlaces cruzados.
- Fuera de alcance: `site/src/data/chapters.ts`, `nav.ts`, `frameworks.ts`, `crosswalk.ts`,
  `bok/09-glossary.md`, `bok/08-regulatory-map.md` y otros capítulos (van al handoff); figuras
  nuevas; patrones nuevos en el capítulo 05.

## Capabilities

### New Capabilities
- `bok-governing-development`: el capítulo 14 del Body of Knowledge, que gobierna el desarrollo de
  sistemas de IA desde el caso de uso hasta el expediente técnico, con sus fuentes verificadas.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/14-governing-development.md` (reescrito), `sources/SOURCES.md` (sección nueva
  al final).
- **Sitio**: sin cambios de código; la ruta `/bok/governing-development` ya existe y renderiza el
  capítulo. Los enlaces internos apuntan solo a rutas y anclas existentes, y los enlaces a los
  capítulos 13, 15, 16, 17 y 19 apuntan a la página, no a anclas internas.
- **Build**: `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint sin rayas,
  check-links, pagefind) en verde.
- Sin dependencias nuevas.
