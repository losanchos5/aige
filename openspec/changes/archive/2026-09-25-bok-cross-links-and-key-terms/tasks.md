# Tasks

Rama `wt/w2-cross-links` en el worktree `D:/Documents/aige-wt/w2-cross-links`. El build se lanza solo
con `bash D:/Documents/aige-wt/build.sh`. Lo que toca a ficheros de otros bloques, o a rutas que aún no
existen en la rama, va al handoff `D:/Documents/aige-wt/handoffs/w2-cross-links.json`.

## 1. Lectura

- [x] 1.1 Leer `STYLEGUIDE.md`, `rehype-glossary.ts`, `glossary.ts`, `chapters.ts`, `[slug].astro`, `AtAGlance.astro` y los tests que dependen de ellos.
- [x] 1.2 Extraer de todos los handoffs los `cross_links` cuyo `from_file` es de este bloque (00 a 04, 06, 07, 11 a 23) y separar los aplicables (ruta y ancla existentes en la rama) de los que dependen de bloques paralelos.
- [x] 1.3 Registrar las líneas de los capítulos que los bloques de patrones, amenazas y fuentes cambian en paralelo, para no editar esas líneas ni sus vecinas.

## 2. Términos clave (G3)

- [x] 2.1 Añadir `keyTerms` (5 a 10 slugs del glosario) a todos los capítulos salvo el glosario y comprobar cada slug contra `bok/09-glossary.md` y contra el texto del capítulo.
- [x] 2.2 Resolver los términos en `/bok/[slug]` con `getGlossaryEntry` y fallar la build ante un slug inexistente.
- [x] 2.3 Renderizar la fila «Key terms in this chapter» en `AtAGlance.astro` (enlaces `a.term` con `data-term`, sola si no hay «At a glance»).
- [x] 2.4 Tests en `site/tests/bok.spec.ts`.

## 3. Enlaces cruzados

- [x] 3.1 Aplicar los `cross_links` aplicables de los handoffs (capítulos 04, 07, 14, 15, 16, 17, 21, 22 y 23).
- [x] 3.2 Pasar a ancla de sección todos los enlaces de ruta entre capítulos (04, 06, 11, 12, 15, 16, 18, 20, 21, 22) y comprobar cada ancla.
- [x] 3.3 Re-apuntar los enlaces a patrones con página a `/patterns/<slug>`, salvo en las líneas protegidas; ajustar `agents-hub.spec.ts`.
- [x] 3.4 Enlazar desde los capítulos 01, 02, 03, 06 y 07 los capítulos nuevos donde presentan el tema (un enlace por tema y capítulo).
- [x] 3.5 Confirmar que los términos del glosario ya se enlazan solos (`rehype-glossary`) y no añadir enlaces manuales a `/glossary/<slug>` en prosa.

## 4. Cierre de capítulos, prefacio y esquema

- [x] 4.1 «What you can do this week» en los capítulos 04, 06 y 07.
- [x] 4.2 Redactar los recuadros de 05 y 08 y entregarlos en el handoff para insertarlos tras la fusión de sus bloques.
- [x] 4.3 Prefacio: rutas por audiencia, hubs `/for` descritos sin enlace y «How to use this book» con las cinco partes.
- [x] 4.4 `OUTLINE.md`: cinco partes, brief de los capítulos 11 a 23, capítulo 05 con páginas de patrones.

## 5. Registros, verificación y handoff

- [x] 5.1 Viñetas en `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)».
- [x] 5.2 Build completo con `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint, check-links, schemas-check) con código 0.
- [x] 5.3 `openspec validate bok-cross-links-and-key-terms --strict`.
- [x] 5.4 Handoff `D:/Documents/aige-wt/handoffs/w2-cross-links.json` con enlaces pendientes, recuadros de 05 y 08, enlaces a los hubs y notas para el integrador.
