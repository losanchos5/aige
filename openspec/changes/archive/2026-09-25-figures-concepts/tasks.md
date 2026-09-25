# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/w2-fig-concepts` (rama
`wt/w2-fig-concepts`). El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Lo que toca
ficheros de otros bloques va al handoff `D:/Documents/aige-wt/handoffs/w2-fig-concepts.json`.

## 1. Lectura

- [x] 1.1 Leer `STYLEGUIDE.md`, `site/VISUAL-GUIDE.md`, `site/src/data/figures.ts`, `site/src/data/diagrams.ts`, `site/src/styles/figures.css`, las figuras existentes y el contrato de archify (`authoring-contract.md`, renderer de lifecycle)
- [x] 1.2 Leer las secciones de origen en los capítulos 12, 13, 14, 16, 21, 22 y 23, `harms.ts`, `jurisdictions.ts`, el brief de `b-c23-agents.json` y la sección `#control-plane` de `/agents`

## 2. Infografías

- [x] 2.1 Dibujar `agent-control-plane` y `governance-operating-model`; verificar con una vista previa resvg en claro y oscuro
- [x] 2.2 Dibujar `harm-levels` (desde `harms.ts`) y `explanation-techniques`; verificar igual
- [x] 2.3 Dibujar `instrument-lineage` (fechada) y `jurisdiction-tiles` (desde `jurisdictions.ts`, `data-viz` con tabla); añadir las clases `.figc .tile-*` a `figures.css`; verificar igual
- [x] 2.4 Añadir las seis entradas al final de `figures.ts` (título ≤ 6 palabras, pie con «Drawn from chapter NN.», `alt` de 50 a 160 caracteres igual al `<desc>`, descripción en palabras del capítulo, colocación, `pages`, `asOf`/`reviewBy`)
- [x] 2.5 Comprobar ≤ 12 KB, sin hexadecimales, sin U+2014, `aria-labelledby` resuelto, tamaño mínimo 13 y nombres de capa exactos

## 3. Diagrama archify y páginas

- [x] 3.1 Escribir `site/diagrams/build-chain-of-gates.lifecycle.json` y su `*.notes.json`; verificar con `archify validate lifecycle --quality showcase` y una captura del visor
- [x] 3.2 Añadir la entrada al final de `diagrams.ts` como apertura del capítulo 14
- [x] 3.3 Insertar `agent-control-plane` en `/agents#control-plane` e `instrument-lineage` en `/resources/frameworks` con `<Figure>`

## 4. Pruebas, registros y build

- [x] 4.1 Escribir `site/tests/figures-concepts.spec.ts` (contrato por figura, sincronía con `harms.ts` y `jurisdictions.ts`, presupuesto del IR, colocación y móvil); las comprobaciones de datos se verifican con un script Node en el directorio temporal
- [x] 4.2 Añadir las viñetas de `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)» y la sección de fuentes en `sources/SOURCES.md`
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta salida 0 y revisar el HTML de los capítulos y páginas
- [x] 4.4 `openspec validate figures-concepts --strict`
- [x] 4.5 Escribir el handoff JSON y hacer commit por rutas explícitas
