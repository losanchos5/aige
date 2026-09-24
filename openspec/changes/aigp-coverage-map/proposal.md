# Proposal

## Why

Muchos lectores llegan al sitio con el Body of Knowledge público del AIGP (IAPP) en la mano y una
pregunta concreta: dónde se enseña aquí cada cosa que pide. Hoy tienen que buscarlo capítulo a
capítulo. Un mapa de cobertura, indicador a indicador, les dice qué sección leer primero, a qué
artefacto lleva y dónde el libro todavía se queda corto, sin convertir el sitio en preparación de
examen ni en un producto de la IAPP.

Al mismo tiempo, el capítulo 06 critica las certificaciones como sustituto de la capacidad, pero el
sitio no tiene una página que diga, con hechos verificados y sin recomendar ninguna, qué evalúa cada
certificación personal relevante y cómo se relaciona con este libro. Esa página evita que el lector
confunda una certificación personal con la certificación ISO/IEC 42001 de una organización.

## What Changes

- **Datos** `site/src/data/aigp.ts` (nuevo, sin imports en tiempo de ejecución): el BoK del AIGP
  v2.1 (vigente desde el 2 de febrero de 2026, aprobado el 9 de septiembre de 2025, sustituye a la
  2.0.1, con su URL pública), los cuatro dominios y las 13 competencias con sus rangos de preguntas,
  y los 58 indicadores con id posicional (`I.A.1`), una paráfrasis propia de 12 palabras como
  máximo (nunca el texto de la IAPP), los enlaces a las secciones que lo enseñan (anclas de
  capítulo, `/patterns/<slug>`, `/glossary/<slug>`, herramientas de `/toolkit`, plantillas y
  páginas de `/resources`) y un estado con el criterio de la casa: `taught` (una sección permite
  aprenderlo y lleva a un artefacto) o `partly-taught` (con una nota que dice qué falta). Sin
  puntuación global.
- **Resolución y control** `site/src/lib/aigp-coverage.ts`: resuelve cada enlace contra lo que la
  build genera (encabezados con el mismo slugger que rehype-slug, patrones, términos, herramientas
  `live`, filas de plantillas y esquemas, casos y rutas conocidas con su fichero fuente), le da su
  etiqueta y hace fallar la build con un mensaje claro si algo no existe.
- **Heatmap** `site/src/lib/aigp-heatmap.ts`: SVG generado en la build desde los mismos datos, 58
  celdas en 13 barras cuya anchura es el punto medio del rango de preguntas; relleno para `taught`,
  contorno discontinuo para `partly-taught` (nunca solo color), fuente y "As of" dentro de la imagen.
- **Página** `/for/aigp` (`site/src/pages/for/aigp.astro`): aviso fijo ("AIGP is a registered
  trademark of the IAPP; this site is not affiliated with or endorsed by the IAPP; this is a
  coverage map of an open body of knowledge, not exam preparation"), cómo leer el mapa, el heatmap
  con su descripción textual, una ruta de estudio por dominio con progreso en `localStorage` a
  través de `public/toolkit/lib.js` (`public/for/aigp.js`, sin red), las tablas por dominio y
  competencia, qué no es el mapa y las fuentes.
- **Página** `/for/certifications` (`site/src/pages/for/certifications.astro`): resumen neutral de
  AIGP, ISO/IEC 42001 Lead Implementer y Lead Auditor, ISACA AAISM y AAIA, solo con hechos
  verificados en las fuentes del propietario de cada esquema, ISO y EUR-Lex; cómo se relaciona el
  libro con cada una, coherente con la crítica del capítulo 06 y con lo que el capítulo 07 dice del
  certificado 42001 de una organización.
- **Estilos** `site/src/styles/aigp.css` (prefijo `ag-`, solo tokens).
- **Registros compartidos**: un bloque en `SOURCE_BY_PATH` de `site/astro.config.ts`, una sección
  en `sources/SOURCES.md`, viñetas en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)" y una
  redirección `/for` en `public/_redirects`.
- **Pruebas** `site/tests/aigp.spec.ts` (sin navegador): estructura contra el blueprint, ids
  posicionales, límite de 12 palabras, regla de estado, que cada ancla mapeada existe, rutas de
  estudio y contrato del heatmap. Se ejecutan de forma central.
- Fuera de alcance (van al handoff): entrada de navegación, tarjeta en `/resources`, pista AIGP en
  `/path` (`path.ts` no tiene el concepto de pista), enlace desde los capítulos 06 y 07, el heatmap
  en la galería `/figures` (exige tocar `figures-build.mjs`), un conjunto de datos en `/api/v1` y
  entradas en `llms.txt`.

## Impact

- Código nuevo: `site/src/data/aigp.ts`, `site/src/lib/aigp-coverage.ts`,
  `site/src/lib/aigp-heatmap.ts`, `site/src/pages/for/aigp.astro`,
  `site/src/pages/for/certifications.astro`, `site/src/styles/aigp.css`, `site/public/for/aigp.js`,
  `site/tests/aigp.spec.ts`.
- Registros compartidos: `site/astro.config.ts`, `sources/SOURCES.md`, `bok/CHANGELOG.md`,
  `site/public/_redirects`.
- Ninguna ruta existente cambia. La CSP no cambia: el script es un módulo externo del mismo origen.
- Riesgo: si un capítulo renombra un encabezado enlazado, la build falla en `/for/aigp` con el
  enlace y el motivo; es intencionado.
