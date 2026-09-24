# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/b-figures-existing` (rama
`wt/b-figures-existing`). El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Lo que
toca ficheros de otros bloques va al handoff `D:/Documents/aige-wt/handoffs/b-figures-existing.json`.

## 1. Lectura

- [x] 1.1 Leer `STYLEGUIDE.md`, `site/VISUAL-GUIDE.md`, `site/src/data/figures.ts`, `site/src/styles/figures.css`, las siete figuras existentes y `src/lib/rehype-diagrams.ts`
- [x] 1.2 Leer las secciones de origen de cada figura en los capítulos 01, 02, 04, 08, 12, 13, 14 y 17 y anotar qué enuncian (cifras, fechas, nombres)

## 2. Infografías

- [x] 2.1 Dibujar `five-objects`, `profession-in-numbers`, `human-oversight`, `procured-ai-control` y `enforcement-map`; verificar con una vista previa resvg en claro y oscuro
- [x] 2.2 Dibujar `committee-gates`, `risk-loop-stack`, `risk-matrix`, `mitigation-ladder`, `provenance-lineage` e `incident-clocks`; verificar igual
- [x] 2.3 Añadir las once entradas al final del array de `figures.ts` (título, pie de dos frases con «Drawn from chapter NN.», `alt` igual al `<desc>`, descripción en palabras del capítulo, colocación)
- [x] 2.4 Comprobar ≤ 12 KB, sin hexadecimales, sin U+2014, `aria-labelledby` resuelto y tamaño mínimo 13

## 3. Diagramas archify

- [x] 3.1 Pulir `framework-crosswalk`, `vendor-due-diligence-gate`, `runtime-guardrail` y `kill-switch-circuit-breaker`; verificar con `archify validate --quality showcase`
- [x] 3.2 Añadir a `regulatory-wave` los estados del 2 Dec 2026 y del 2 Aug 2030 y sus notas; verificar igual
- [x] 3.3 Preparar el parche de values-principles a dos columnas desde 834 px (`figures-build.mjs`, `rehype-diagrams.ts`, `figures.css`) y dejarlo en el handoff

## 4. Pruebas, registros y build

- [x] 4.1 Escribir `site/tests/figures-existing.spec.ts` (contrato por figura, diagramas, colocación, móvil y la prueba condicional de dos columnas)
- [x] 4.2 Añadir las viñetas de `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)»
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta salida 0 y revisar el HTML de los capítulos en ambos temas (clases y tokens)
- [x] 4.4 `openspec validate figures-for-existing-content --strict`
- [x] 4.5 Escribir el handoff JSON y hacer commit por rutas explícitas
