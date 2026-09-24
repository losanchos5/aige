# Proposal

## Why

El Body of Knowledge v0.5.0 amplía el libro con una parte de ciclo de vida, y el capítulo 15
(`bok/15-governing-deployment.md`) es solo un esqueleto. El libro enseña a fondo el lado del
proveedor y los controles de agentes, pero no el lado del desplegador: la decisión de desplegar,
la elección del modelo con evals propias, los contratos y licencias, la revisión de salida a
producción, la entrega progresiva como control, la operación (deriva, equidad, continuidad,
retención de registros), la comunicación externa y la retirada. Sin ese capítulo, las obligaciones
del desplegador del AI Act (Art. 26, 27, 86) y los controles de terceros de ISO/IEC 42001 A.10 y
NIST AI RMF GOVERN 6 / MANAGE 3 no tienen un artefacto ni una capa que los evidencie.

## What Changes

- Capítulo 15 escrito en `bok/15-governing-deployment.md` (H1 "# 15. Governing deployment and use"
  y entradilla de dos líneas), con secciones estables para: ciclo de vida del despliegue, decisión
  de despliegue y Deployment Decision Record, elección del modelo (evals de tarea, límites de
  benchmarks y leaderboards, coste total con energía y carbono), tipos de modelo y opciones de
  despliegue (tablas y matriz), build/buy/adapt (Art. 25, criterio GPAI de un tercio del cómputo,
  licencias open-weight, responsabilidad y seguros), contratos, revisión de salida con tres
  resultados y disenso registrado, entrega progresiva, operación, aseguramiento periódico, uso
  secundario, comunicación externa, desactivación, degradación, localización y retirada, "What
  you can do this week" y "## Sources" numeradas y verificadas.
- Nuevo módulo tipado `site/src/data/deployment-options.ts`: opciones por tipo de modelo, alojamiento
  y adaptación, con modos de fallo, controles por capa, evidencia producida frente a recogida, efecto
  en el rol y coste; más la matriz tipo de modelo × opción de despliegue.
- Nuevo módulo tipado `site/src/data/contracts.ts`: una fila por cláusula (id, clause, governs, risk,
  redFlag, fallback, evidence, mapsTo) y una tabla de familias de licencia, con referencias
  canónicas.
- Nueva página `site/src/pages/resources/contracts.astro` (`/resources/contracts`) que renderiza
  `contracts.ts` como tablas accesibles con el patrón de `/resources/frameworks`, y su ruta en
  `SOURCE_BY_PATH` de `site/astro.config.ts`.
- Handoff para el orquestador (fuera del repo) con el resumen y el glance del capítulo, glosario,
  obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados, lista de lectura, rutas y
  notas. Fuera de alcance: editar `chapters.ts`, `nav.ts`, `frameworks.ts`, `crosswalk.ts`, el
  glosario, el capítulo 08, `sources/SOURCES.md`, otros capítulos o los tests.

## Impact

- **Contenido** (`bok/`): `15-governing-deployment.md` pasa de esqueleto a capítulo completo, con 46
  fuentes numeradas (verificadas `primary` o `secondary`; las dudas, matizadas y marcadas
  "(verify)").
- **Sitio** (`site/`): nuevos `src/data/deployment-options.ts`, `src/data/contracts.ts` y
  `src/pages/resources/contracts.astro`; modificado `astro.config.ts` (una entrada en
  `SOURCE_BY_PATH`). Sin dependencias nuevas.
- **Pendiente para el orquestador**: la nueva ruta aumenta en uno el recuento de rutas indexables de
  `tests/seo-infra.spec.ts`; la página debe enlazarse desde `nav.ts` y desde `/resources`; las filas
  de fuentes del capítulo deben añadirse a `sources/SOURCES.md`.
