# Proposal

## Why

El libro usa el riesgo en casi todos los capítulos (el principio «start from a named failure mode»,
el antipatrón del comité de riesgos sin dientes en el capítulo 04, la fila `Art. 9` del capítulo 08
con un «risk register as code» que nunca se define), pero no dice dónde se toman las decisiones de
riesgo, en qué escala, quién las firma ni cómo una decisión se convierte en un umbral que un
pipeline pueda hacer cumplir. Era un tema pendiente acordado. El capítulo 13 existe solo como
esqueleto para la versión v0.5.0.

## What Changes

- **Capítulo 13 completo** (`bok/13-risk-management.md`, H1 «13. Where risk management sits»): el
  ciclo identificar, evaluar, tratar y monitorizar proyectado sobre las cinco capas del stack y los
  siete flujos de trabajo del capítulo 06.
- **Marcos, por número**: ISO 31000:2018, ISO/IEC 23894:2023 e ISO/IEC 42001:2023 (cláusulas 6.1.2,
  6.1.3, 6.1.4 y 8.2 a 8.4), EU AI Act `Art. 9` y las 19 categorías del NIST AI RMF (GOVERN 1 a 6,
  MAP 1 a 5, MEASURE 1 a 4, MANAGE 1 a 4) mapeadas a capas, más la tabla de cláusulas de 23894 del
  crosswalk de NIST.
- **Identificación**: fuentes de riesgo internas y externas, factores contribuyentes como campos del
  perfil de riesgo del caso de uso y mapa de partes interesadas.
- **Evaluación**: matriz probabilidad por severidad 5x5 con escalas definidas, bandas con sus
  consecuencias en gates y revisión, y la regla de severidad catastrófica (S5) fuera de la matriz.
- **Apetito y tolerancia compilados**: declaración de apetito de ejemplo, `appetite.yaml` y una
  política `OPA/Rego` ilustrativa que deniega el despliegue ante riesgo residual no aceptado.
- **Tratamiento**: jerarquía de mitigación (eliminar, sustituir, ingeniería, administrativo, aceptar
  y monitorizar) enlazada a los patrones del capítulo 05; riesgo inherente frente a residual y tabla
  de autoridad de aceptación.
- **Registro de riesgos como evidencia**: esquema YAML ilustrativo con enlaces a registro, controles,
  evals e incidentes, y reglas de operación.
- **Gobernanza proporcionada**: matriz de adaptación por tamaño, sector, madurez, productos y
  servicios, objetivos y tolerancia, con superposiciones sectoriales y el suelo que no se adapta.
- **Enlaces** con el modelo de madurez (capítulo 07) y con la gestión de incidentes.
- Fuera de alcance: editar ficheros compartidos (`chapters.ts`, glosario, capítulo 08, `crosswalk.ts`,
  `sources/SOURCES.md`, otros capítulos); esos cambios van en el handoff para el orquestador.

## Capabilities

### New Capabilities
- `bok-risk-management`: el capítulo 13 del Body of Knowledge como tratamiento de referencia de la
  gestión de riesgos de IA sobre el stack de cinco capas.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/13-risk-management.md` pasa de esqueleto a capítulo completo con 26 fuentes
  numeradas y etiquetadas.
- **Sitio**: sin cambios de código; la ruta `/bok/risk-management` ya existe y gana anclas estables
  (H2/H3) enlazables desde otros capítulos.
- **Ficheros compartidos**: resumen, «at a glance», términos de glosario, filas de obligaciones y
  crosswalk, figuras propuestas, enlaces cruzados y filas de `sources/SOURCES.md` se entregan en
  `D:/Documents/aige-wt/handoffs/c13-risk-management.json`.
- **Build**: `astro check`, `astro build`, `content-lint`, `check-links` y `pagefind` en verde.
