# Tasks

Worktree `D:/Documents/aige-wt/w2-tool-aigp`, rama `wt/w2-tool-aigp`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`.

## 1. Fuentes y datos

- [x] 1.1 Leer el AIGP BoK v2.1 público (IAPP) y fijar dominios, competencias, rangos de preguntas y el orden de los 58 indicadores; verificar versión, fechas y a qué competencia pertenece cada indicador.
- [x] 1.2 Crear `site/src/data/aigp.ts`: dominios y competencias con etiquetas propias, indicadores con id posicional, paráfrasis propia de 12 palabras como máximo, enlaces (primero la sección que se estudia) y estado con nota cuando es `partly-taught`; aviso fijo, fecha `asOf` y `reviewBy`; sin puntuación global.
- [x] 1.3 Comprobar que ninguna paráfrasis reproduce el texto de la IAPP (sin secuencias de cuatro palabras compartidas salvo nombres propios y términos legales).

## 2. Resolución, heatmap y páginas

- [x] 2.1 Escribir `site/src/lib/aigp-coverage.ts`: resolver cada enlace contra encabezados (slugger de rehype-slug), patrones, glosario, herramientas `live`, plantillas y esquemas, casos y rutas conocidas; etiquetar; fallar la build con un mensaje claro.
- [x] 2.2 Escribir `site/src/lib/aigp-heatmap.ts`: SVG de 58 celdas en 13 barras con anchura por punto medio del rango, estado por marca y no solo por color, fuente y "As of" dentro de la imagen, sin imports en tiempo de ejecución.
- [x] 2.3 Crear `/for/aigp` con el aviso, cómo leer el mapa, el heatmap con su descripción textual, las rutas de estudio, las tablas por competencia, qué no es el mapa y las fuentes.
- [x] 2.4 Escribir `site/public/for/aigp.js`: marcas de lectura con progreso por dominio en `localStorage` mediante `public/toolkit/lib.js`, región de estado, borrado, aviso si el almacenamiento está bloqueado; sin red.
- [x] 2.5 Crear `/for/certifications` con hechos verificados de AIGP, ISO/IEC 42001 Lead Implementer y Lead Auditor, AAISM y AAIA, la distinción entre certificado de persona y de sistema de gestión, el artículo 4 de la Ley de IA y la relación con el libro.
- [x] 2.6 Estilos `site/src/styles/aigp.css` con tokens y prefijo `ag-`.

## 3. Registros, pruebas y build

- [x] 3.1 Añadir el bloque de rutas a `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md`, las viñetas de `bok/CHANGELOG.md` y la redirección `/for` en `public/_redirects`.
- [x] 3.2 Escribir `site/tests/aigp.spec.ts` (estructura del blueprint, ids, paráfrasis, regla de estado, anclas mapeadas, rutas de estudio, contrato del heatmap).
- [x] 3.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate aigp-coverage-map --strict`.
- [x] 3.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-tool-aigp.json` (navegación, pista en `/path`, enlaces desde los capítulos 06 y 07, heatmap en `/figures`, conjunto de datos en `/api/v1`, `llms.txt`).
