# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/w2-fig-posters` (rama
`wt/w2-fig-posters`). El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Lo que toca
ficheros de otros bloques va al handoff `D:/Documents/aige-wt/handoffs/w2-fig-posters.json`.

## 1. Lectura

- [x] 1.1 Leer `site/VISUAL-GUIDE.md` (§1, §4 y §5), `STYLEGUIDE.md`, `figures-build.mjs`, `figure-export.mjs`, `rehype-diagrams.ts`, `figures.css` y las páginas `/figures`
- [x] 1.2 Leer las fuentes de cada póster: capítulo 18 (escalera, roles, calendario), capítulo 08 (sección del Reglamento de IA), capítulo 21 (Corea, Texas, California, Colorado), capítulo 15 (matriz) y los módulos `frameworks.ts`, `roles.ts` y `deployment-options.ts`
- [x] 1.3 Verificar los términos españoles en el texto oficial en español del Reglamento (UE) 2024/1689 en EUR-Lex

## 2. Generador

- [x] 2.1 Escribir `site/scripts/lib/posters.mjs` con medición de texto, ajuste de líneas y error de build si algo no cabe
- [x] 2.2 Calendario: carriles por familia desde `frameworks.ts`, colocación de etiquetas que minimiza la altura, marcas del capítulo 18
- [x] 2.3 Roles: preguntas, tarjetas con obligaciones y evidencia, bucle del `Art. 25` desde `roles.ts`, registro como nodo terminal
- [x] 2.4 Escalera: peldaños, rutas del anexo I y del anexo III con el filtro del `Art. 6(3)`, vía de modelos de uso general y notas del capítulo 21, fechas de `frameworks.ts`
- [x] 2.5 Matriz: celdas de `deployment-options.ts` giradas un cuarto
- [x] 2.6 Ediciones en español de los tres primeros, con `lang="es"` y sello «A fecha de»
- [x] 2.7 Integrar en `figures-build.mjs` (generación, sello según idioma, idioma en las exportaciones)

## 3. Registro, capítulos y estilos

- [x] 3.1 Añadir las siete entradas al final de `site/src/data/figures.ts` (pie, `alt` de 50 a 160 caracteres, descripción, colocación, `asOf`, `reviewBy`, tabla de datos del calendario y de la matriz)
- [x] 3.2 `rehype-diagrams.ts`: región desplazable y enlace al permalink para `kind: 'poster'`
- [x] 3.3 `figures.css`: reglas del póster en capítulo y clases de marca con tokens
- [x] 3.4 Revisar las vistas previas PNG en claro y oscuro de los siete pósteres

## 4. Pruebas, registros y build

- [x] 4.1 Escribir `site/tests/figures-posters.spec.ts` y ajustar `figures-gallery.spec.ts` al sello en español
- [x] 4.2 Añadir las viñetas de `bok/CHANGELOG.md` y la sección de `sources/SOURCES.md`
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta salida 0
- [x] 4.4 `openspec validate figures-posters --strict`
- [x] 4.5 Escribir el handoff JSON y hacer commit por rutas explícitas
