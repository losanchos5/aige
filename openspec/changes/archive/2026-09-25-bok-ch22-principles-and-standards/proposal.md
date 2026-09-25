# Proposal

## Why

El Body of Knowledge cita marcos y estándares en casi todos los capítulos, pero ninguno explica los
instrumentos en sí: qué pide cada uno, cuánta fuerza tiene y qué cambia en el stack. Los Principios
de IA de la OCDE (y su definición, ciclo de vida y marco de clasificación) no aparecen en ningún
sitio; el NIST AI RMF solo está mapeado a nivel de función; la familia ISO/IEC se reduce a 42001,
42005, 42006 y 23894; y los estándares armonizados del AI Act (programa de CEN-CENELEC JTC 21) solo
se mencionan como un hueco en el capítulo 08. Para que el sitio sea la referencia de gobernanza de
IA en la v0.5.0, hace falta un capítulo que explique los principios, el soft law y los estándares y
los traduzca a artefactos, capas y evidencias, con estado fechado y fuentes verificadas.

## What Changes

- **Capítulo 22** (`bok/22-principles-and-standards.md`), hoy un esqueleto, pasa a ser un capítulo
  completo con el H1 y la entradilla del esqueleto:
  - cómo leer los instrumentos por fuerza (ley, tratado, armonizados, estándares, soft law) y tabla
    resumen instrumento → fuerza → cambio en el stack → capas;
  - linaje del soft law (HLEG 2019 → OCDE 2019/2024 → UNESCO 2021 → NIST 2023 → G7 2023 → Convenio
    del Consejo de Europa 2024 → ratificación de la UE 2026) y convergencia de la definición de sistema
    de IA;
  - Principios de la OCDE (cinco principios y cinco recomendaciones, definición, ciclo de vida, marco
    de clasificación en cinco dimensiones como esquema del registro, OECD.AI);
  - Recomendación de la UNESCO (valores, principios, RAM y EIA);
  - Convenio Marco del Consejo de Europa (CETS n.º 225): ámbito, estado a 2026-09-24, ratificación de
    la UE, artículos 14–16 traducidos a artefactos, HUDERIA;
  - Código de Conducta de Hiroshima del G7 (11 acciones → artefactos) y marco de reporte de la OCDE;
  - Directrices del HLEG y ALTAI;
  - NIST AI RMF 1.0 en profundidad (daño y tolerancia, siete características, 19 categorías con una
    línea cada una, estructura de una entrada del Playbook, perfiles, AI 600-1, AI 100-2 E2025,
    SP 800-218A, CSF 2.0, COSAiS, estado de revisión);
  - familia ISO/IEC por número y título corto (22989, 23053, 5338, 5259, TR 24027, TR 24028, 23894,
    25059, 38507, 42001, 42005, 42006) e integración con 27001, 27701 y 9001;
  - estándares armonizados del AI Act: presunción de conformidad (arts. 40 y 41), petición de
    normalización, tabla del programa JTC 21 con estado «last reviewed 2026-09-24» y qué cambia cada
    entregable en el stack;
  - serie IEEE 7000; tabla de síntesis «un control, muchos instrumentos»; «What you can do this
    week»; `## Sources` numeradas con etiqueta de verificación.
- **Handoff** fuera del repositorio para el orquestador, con resumen y «at a glance» del capítulo,
  términos de glosario, filas de obligaciones y de crosswalk, figuras propuestas, enlaces cruzados,
  lecturas y filas para `sources/SOURCES.md`.
- Fuera de alcance: editar ficheros compartidos (`site/src/data/*.ts`, `bok/08-regulatory-map.md`,
  `bok/09-glossary.md`, `sources/SOURCES.md`, otros capítulos); archivar el cambio.

## Capabilities

### New Capabilities
- `bok-principles-and-standards`: el capítulo 22 del Body of Knowledge, que explica los principios,
  el soft law y los estándares de gobernanza de IA y los traduce a artefactos, capas del stack y
  registros de evidencia.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/22-principles-and-standards.md` (reescrito). Sin cambios en código del sitio.
- **Enlaces**: solo a rutas y anclas existentes (capítulos 01, 03, 05, 07, 08 y rutas de los
  capítulos nuevos 11–21); lo verifica `check-links` en la build.
- **Ficheros compartidos**: los cambios que les tocan van en el handoff, no en este cambio.
- **Riesgos**: estados con fecha (Convenio, JTC 21, revisión del AI RMF) que caducan; se marcan
  «as of 2026-09-24» y las afirmaciones no confirmadas llevan «(verify)».
