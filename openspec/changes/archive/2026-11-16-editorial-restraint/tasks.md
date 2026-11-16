# Tasks

## 1. Cimientos (PR 1)

- [x] 1.1 Añadir a `tokens.css` los tokens de la maqueta (`--accent*`, `--panel`, `--band*`, `--veil`) en claro y oscuro. Verificación: `npm run build` pasa y los tokens existen en los dos bloques de tema oscuro.
- [x] 1.2 Newsreader como tipografía de títulos, retirar Bricolage y precargar Newsreader en `Base.astro`. Verificación: prueba que comprueba que no hay petición de Bricolage y que el h1 de un capítulo usa Newsreader.
- [x] 1.3 Fondo de papel con grano decorativo que no cubre la hero. Verificación: escenarios "Grano presente y decorativo" de `editorial-system`.
- [x] 1.4 `Section.astro`: tonos `mesh` y `tint` pintan papel; cabecera de sección única. Retirar de `effects.css` el mesh, los tintes, el panel `.pause` y la tarjeta luminosa. Verificación: escenario "Sin mesh en ninguna ruta".
- [x] 1.5 Paneles lisos y opacos con ritmo vertical común. Verificación: escenarios "Panel sin grano ni sombra" y "Ritmo vertical de los paneles".
- [x] 1.6 Reescribir en `site/DESIGN.md` las secciones de color, tipografía y primitivas. Verificación: content-lint pasa y el documento no menciona mesh ni panel pause como vigentes.
- [x] 1.7 Actualizar o eliminar las pruebas que fijan mesh, tintes o Bricolage, aplicando `test-audit`. Verificación: las pruebas modificadas pasan con `PW_PORT=4331`.

## 2. Recursos de cuadros (PR 1)

- [x] 2.1 Generar variantes responsivas de los nueve cuadros y sus recortes en `site/public/paintings/`, con `CREDITS.md`. Verificación: ningún archivo de 1600px supera 250 KB y cada cuadro tiene su página de Commons y licencia anotadas.
- [x] 2.2 Registro `paintings.ts` y componente `Painting.astro`. Verificación: `astro check` sin errores y escenario "Carga diferida" de `painting-mats`.

## 3. Maqueta de lectura (PR 1)

- [x] 3.1 `SidebarNav`: módulos numerados, árbol con línea y marca, entrada actual con fondo suave y peso; acepta un grupo de `nav.ts`. Verificación: escenarios "Entrada actual" y "Agrupación por partes"; `layout.spec.ts`, `bok.spec.ts` y `shell-parts.spec.ts` pasan.
- [x] 3.2 `Toc`: etiqueta mono, entradas numeradas, sección en lectura con borde de acento. Verificación: escenario "Sección en lectura".
- [x] 3.3 `ChapterHeader` y `PageHero` sin banda de mesh: píldora de posición, título, chips. Verificación: escenario "Píldora de posición" y los de `page-hero`.
- [x] 3.4 Firma de autor y tarjeta de cita con marco de cuadro, sin tocar enlaces, analítica ni JSON-LD. Verificación: escenario "Enlaces y eventos intactos" y las pruebas de firma existentes pasan.
- [x] 3.5 Prosa: h2 con línea y contador, negrita con subrayado de marcador, código en línea sobre fondo de acento, barra de progreso en acento plano. Verificación: escenario "Contador en los h2" y `v4.spec.ts`.
- [x] 3.6 Extender la maqueta de lectura a la Thesis (todos los idiomas), research, controles, About y certificaciones. Verificación: escenarios "Thesis con índices" y "Herramientas sin cambio de maqueta"; sin scroll horizontal en `layout.spec.ts`.

## 4. Figuras (PR 1)

- [x] 4.1 Probar el enfoque de tamaño de texto de archify en tres diagramas de tipos distintos y medir a 704px y 358px. Verificación: tabla de medidas y capturas antes y después; decisión anotada en `design.md`, decisión 7.
- [x] 4.2 Marco único y pie único para archify, infografías, gráficos y bucle; quitar el panel exterior. Verificación: escenarios de "Un marco para todas las figuras" y "Un pie para todas las figuras".
- [x] 4.3 Nodos archify neutros con un énfasis en acento. Verificación: escenario "Nodos neutros".
- [x] 4.4 Regenerar los 41 diagramas con el enfoque elegido. Verificación: escenarios "Diagrama en la columna de lectura", "Diagrama en móvil" y "Contenido conservado"; `diagrams.spec.ts` pasa.
- [x] 4.5 Actualizar `site/VISUAL-GUIDE.md` con el marco, el pie y la regla de color. Verificación: content-lint pasa.

## 5. Cierre de la PR 1

- [x] 5.1 Revisión con `code-reviewer` de cada bloque y corrección de lo crítico y alto. Verificación: informe de revisión sin hallazgos críticos ni altos abiertos.
- [x] 5.2 Verificación completa en este orden: `npm run build`, `npm test`, proyecto a11y, `hero-art.spec.ts`, capturas visuales para revisión, `npm run lhci`. Verificación: todo en verde; Lighthouse con rendimiento de 0.95 o más.
- [x] 5.3 Capturas a 1440 y 390 en claro y oscuro de `/`, `/bok/why-now`, un patrón con diagrama, `/thesis` y `/stack` para Jordi, y abrir la PR 1. Verificación: PR abierta con CI en verde.

## 6. Portada (PR 2)

- [x] 6.1 Sección 01: definición, bucle en panel sobre cuadro y las tres preguntas con título a la izquierda y filas a la derecha. Verificación: escenario "Panel sobre cuadro" y `loop.spec.ts`.
- [x] 6.2 Sección 02: paneles de artefactos reales sobre cuadro, filas de las cinco capas y bloque "Where it operates" en filas. Verificación: escenarios de `home-positioning` para `#where-it-operates`.
- [x] 6.3 Sección 03: franja de cuadro e índice de capítulos por partes. Verificación: escenarios de `book-parts`.
- [x] 6.4 Bloque a dos columnas con cuadro y la frase del veredicto; sección "What applies now" en filas. Verificación: `home.spec.ts` actualizado pasa.
- [x] 6.5 Sección de recursos: cuatro tarjetas con cuadro y ocho filas. Verificación: escenario "Tiles nuevos".
- [x] 6.6 Sección "Follow the changes" y banda de cierre con cuadro velado; colofón de créditos en el pie. Verificación: escenarios "Cierre con cuadro", "Banda de cierre legible" y "Colofón".
- [x] 6.7 Retirar de la portada Values y Role tras comprobar que su contenido existe en `/role`, `/ai-governance` o `/stack`; mover lo que falte. Verificación: lista de comprobación de contenido en la descripción de la PR.
- [x] 6.8 Incluir las cinco líneas de texto nuevo aprobadas por Jordi y comprobar contra el contenido que "three established, two new to AI" y "seven workflows" son ciertos. Verificación: cita del capítulo o dato que lo respalda en la descripción de la PR.
- [x] 6.9 Actualizar `home.spec.ts`, `loop.spec.ts` y `perf.spec.ts` al nuevo orden y a las imágenes, aplicando `test-audit`. Verificación: las pruebas pasan.

## 7. Cierre de la PR 2

- [x] 7.1 Revisión con `code-reviewer` y verificación completa en el mismo orden que 5.2, con atención a Lighthouse y a `hero-art.spec.ts`. Verificación: todo en verde.
- [x] 7.2 Capturas de `/` a 1440 y 390 en claro y oscuro para Jordi y abrir la PR 2. Verificación: PR abierta con CI en verde.
- [x] 7.3 Tras la fusión y el despliegue: comprobar producción, sincronizar specs y archivar el cambio, y anotar como sustituidas las tareas abiertas de `visual-rhythm` y `ui-refinement-impeccable`. Verificación: `curl` a producción y `openspec list` sin este cambio abierto.
