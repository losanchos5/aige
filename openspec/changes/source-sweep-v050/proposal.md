# Proposal

## Why

Los capítulos 11 a 23 se escribieron en paralelo y 64 entradas de sus listas `## Sources` citaban
el AI Act Explorer del Future of Life Institute (artificialintelligenceact.eu) para el texto legal
de la UE; 57 de ellas llevaban la etiqueta `primary`. La especificación `source-integrity` ya exige
EUR-Lex con etiqueta `primary` para el Reglamento (UE) 2024/1689 y el 2026/1744, y la pasada de
deuda la aplicó a los capítulos 00 a 10, pero no a los capítulos nuevos. Además, siete entradas del
capítulo 20 marcaban como `primary` reproducciones no oficiales del US Code y del CFR (Legal
Information Institute), y otras cinco (capítulos 11, 15 y 16) citaban reproducciones (gdpr-info.eu,
LII) donde el texto oficial está disponible. Para ser la referencia de la disciplina, cada cita
legal debe llevar al texto oficial y a su artículo.

## What Changes

- **Capítulos 11 a 20 y 22 (solo `## Sources`)**: las 64 entradas del explorador pasan a EUR-Lex:
  el texto consolidado de 2026-07-27 con el ancla del artículo o anexo (`#art_<n>`, `#anx_<n>`), o
  el texto del DOUE con el ancla del considerando (`#rct_<n>`), porque el consolidado no reproduce
  los considerandos. Todas quedan `primary`. Cada glosa se comprobó contra el artículo tal como
  queda tras el Ómnibus; la del art. 72 del capítulo 14 pasa a la redacción modificada (guía de la
  Comisión con plantilla antes del 2 Sep 2027, no un acto de ejecución).
- **Capítulo 14 [50]**: la monetización y la exención de código abierto citan las directrices GPAI
  de la Comisión (C(2025) 7719 final, apartados 82 a 84) en lugar del resumen del explorador.
- **Reproducciones no oficiales**: 17 U.S.C. § 107, 18 U.S.C. § 1839, 42 U.S.C. § 2000e-2 y
  15 U.S.C. §§ 1681g, 1681m y 45 pasan a GovInfo (United States Code, edición 2024); 12 CFR 1002.9 y
  29 CFR 1607.4 al eCFR (reutilizando las filas del capítulo 16); el RGPD de los capítulos 11 y 15
  a EUR-Lex con ancla de artículo.
- **Resto de etiquetas `primary`** de los capítulos 11 a 23: revisadas por dominio y publicador
  (legislador, diario oficial, regulador, organismo de normalización, artículo original, documento
  propio del proyecto o del proveedor); no hay más cambios. Las páginas de CourtListener se
  mantienen como `primary` porque sirven los escritos del tribunal tal cual.
- **Numeración**: no se fusiona ninguna fuente; ningún marcador `[n]` cambia.
- **`sources/SOURCES.md`**: filas de esos capítulos actualizadas en su sitio (en las dos copias de
  las secciones 11 y 14 que dejó una fusión), filas mal formadas de los capítulos 16, 19 y 22
  reconstruidas, sección nueva con los textos leídos y el método (Cellar de la Oficina de
  Publicaciones, porque EUR-Lex devolvió un reto anti-bots), y las filas de GitHub del monitor
  regulatorio devueltas a su sección desde el final de la tabla del capítulo 23 (con la sección de
  `VISUAL-GUIDE.md` recompuesta).
- **`bok/CHANGELOG.md`**: viñetas bajo «Unreleased (v0.5.0)».
- Fuera de alcance (handoff): citas del explorador en `site/src/data/cases.ts`,
  `site/src/data/contracts.ts`, `site/src/pages/resources/templates.astro`, la fila de
  `frameworks.ts` y el capítulo 10 (lectura `secondary`); la copia duplicada y divergente de la
  primera mitad de `SOURCES.md`.

## Impact

- Ficheros: `bok/11-ai-defined.md` a `bok/22-principles-and-standards.md` (solo listas de fuentes),
  `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin cambios de prosa, encabezados, rutas ni código del sitio.
