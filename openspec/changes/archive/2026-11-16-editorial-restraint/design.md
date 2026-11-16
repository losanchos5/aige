# Design

## Context

Motivación en `proposal.md`. La referencia visual es la maqueta aprobada en `D:/Documents/aige-media/mockups/editorial-restraint/` (`index.html`, `chapter.html`, `diagrams.html`; los tokens están al principio de `mock.css`). Donde este documento y la maqueta difieran, manda la maqueta.

Estado de partida en `origin/main` (cc8e778, con la firma de autor de la PR #103 ya fusionada):

- `layouts/Doc.astro` ya es de tres columnas (260px, prosa a 72ch, 220px) en capítulos y patrones. La Thesis usa el modo `wide` sin laterales.
- Las doce secciones de la portada se montan sobre `Section.astro` con tonos `mesh`, `tint` o `deep`.
- Newsreader solo se usa en la hero; el resto de títulos usa `--font-display` (Bricolage).
- Los estilos de figura viven en `diagrams.css`, `figures.css` y `chart.css`; ninguno tiene colores fijos, todos leen tokens. `effects.css` envuelve las figuras de la prosa en un panel `.pause`.
- archify (v2.16.0) genera SVG con texto de 7 a 12 unidades que se reduce al encajar en la columna.
- No hay comparación de píxeles en CI. Los controles duros son `layout.spec.ts`, `home.spec.ts`, `loop.spec.ts`, axe, `hero-art.spec.ts`, content-lint y Lighthouse.

## Goals / Non-Goals

**Goals:**

- Que la portada bajo la hero y las páginas de lectura hablen con la misma voz que la hero.
- Reducir el sistema a tokens: que el cambio de aspecto salga de `tokens.css` y de pocos componentes, sin estilos por página.
- Mantener el rendimiento y la accesibilidad actuales con nueve imágenes más.

**Non-Goals:**

- Cambiar la hero, el contenido del Body of Knowledge, las rutas, los datos estructurados o la analítica.
- Rediseñar el visor independiente de diagramas (`/diagrams/*.html`).
- Cambiar la maqueta de índices y herramientas (crosswalk, glosario, toolkit).
- Rehacer las infografías hechas a mano; solo cambia su marco y su pie.

## Decisions

**1. Tokens nuevos con los nombres de la maqueta.** `--accent`, `--accent-soft`, `--accent-line`, `--panel`, `--band`, `--band-line`, `--veil`. En oscuro el acento es el pastel de la capa 1, porque el azul marino no contrasta sobre el fondo oscuro. Alternativa descartada: reutilizar `--l1-ink` como acento directamente; mezcla el significado de capa con el de énfasis.

**2. `Section.astro` conserva sus props.** Los tonos `mesh` y `tint` se aceptan y pintan papel. Así la primera entrega no obliga a tocar todas las páginas que llaman a `Section`; la limpieza de llamadas se hace al reescribir cada página. Alternativa descartada: borrar los tonos y arreglar todos los llamadores en un solo paso; más conflictos entre bloques paralelos.

**3. Grano como capa fija bajo el contenido.** Una sola capa decorativa a nivel de página; los paneles son opacos y lo tapan. Si la política de seguridad de contenido bloquea un fondo en data URI, se sirve como recurso estático pequeño.

**4. Cuadros como datos.** Un registro por cuadro (`paintings.ts`) y un componente `Painting` que emite `srcset`, dimensiones y carga diferida. Los marcos finos usan recortes propios, no el cuadro entero, para que la pincelada se lea y el archivo pese poco. Los cuadros bajo la primera pantalla no se precargan.

**5. Índice lateral generalizado.** `SidebarNav` acepta un grupo de `nav.ts` además de las partes del libro, para dar índice lateral a research, controles y About sin duplicar el componente.

**6. Firma de autor: solo estilo.** `Byline` y `AuthorBadge` conservan su marcado de enlaces, sus atributos de analítica y su JSON-LD; el marco se añade como envoltorio.

**7. Diagramas archify: decisión tras la prueba.** Antes de regenerar los 41 se prueba el enfoque en tres diagramas de tipos distintos y se mide el texto a 704px y 358px. El enfoque elegido se anota aquí antes de la tarea de despliegue. Preferencia, de menor a mayor coste: opciones del generador, postproceso del SVG en el script de construcción, cambios de IR por diagrama, disposición propia para algún tipo.

**8. Dos entregas apiladas.** PR 1 (`feat/editorial-restraint`): cimientos, páginas de lectura, figuras y los recursos de cuadros. PR 2 (`feat/editorial-restraint-home`, sobre la anterior): portada. Tras la PR 1 la portada ya queda sobre papel y sin mesh, con su estructura actual; la PR 2 la condensa y añade los cuadros.

**9. Trabajo en paralelo.** Bloques con archivos disjuntos en el mismo worktree; un solo agente dueño de la construcción a la vez; pruebas completas, a11y y Lighthouse una sola vez al final de cada entrega. Puerto de Playwright 4331.

## Risks / Trade-offs

- [Los cuadros bajan el rendimiento de la portada] → variantes responsivas, carga diferida, recortes pequeños para marcos; Lighthouse al final de la PR 2 y recorte de imágenes si baja de 0.95.
- [Newsreader se precarga en todas las páginas] → se retira Bricolage, así que el número de fuentes precargadas no crece; vigilar `seo-font-cls.spec.ts`.
- [Acento y tinta de la capa 1 comparten color en claro] → aceptado: es la tinta de la hero; las capas se muestran siempre con su etiqueta.
- [archify no permite el tamaño de texto pedido] → marco con ancho mínimo y scroll interno como salida garantizada; la regeneración por tipos se hace donde el generador lo permita.
- [La PR 1 deja la portada en un estado intermedio] → es coherente (papel, sin mesh) y desplegable; se anota en la descripción de la PR.
- [Muchas pruebas fijan el aspecto anterior] → se actualizan o se eliminan con el criterio de `test-audit`; no se añaden pruebas que solo copien valores de CSS.
- [Cambios abiertos `visual-rhythm` y `ui-refinement-impeccable` contradicen este] → sus tareas pendientes sobre mesh y tonos de banda se dan por sustituidas y se anota al archivarlos.
