# Tasks

Worktree `D:/Documents/aige-wt/c14-governing-development`, rama `wt/c14-governing-development`. La
build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Sin tests de Playwright ni lhci en
este bloque.

## 1. Lectura y verificación de fuentes

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01`, `bok/04`, `bok/05` (anclas de patrones), `bok/06` (flujos) y `bok/08` (filas del AI Act post-Omnibus) para usar el modelo de la casa y enlazarlo.
- [x] 1.2 Verificar en línea las fuentes primarias: artículos y anexos del AI Act (Art. 2, 3, 9, 10, 11 y Anexo IV, 13, 17, 18, 19, 25, 27, 43 y Anexos VI y VII, 47 a 49, 53 y Anexos XI y XII, 72), RGPD, Directiva DSM, Opinión 28/2024 del EDPB, instrumentos GPAI de la Comisión, normas ISO/IEC por identificador, NIST AI RMF, SR 26-2, SS1/23, W3C PROV, OpenLineage, AB 2013, LL 144, Directiva canadiense y artículos de arXiv.
- [x] 1.3 Registrar como `secondary` lo que solo se pudo confirmar por fuentes secundarias (cambios de detalle del Omnibus, lector no oficial del Code of Practice, resumen de las directrices GPAI) y como `(verify)` lo que no se pudo confirmar.

## 2. Capítulo 14

- [x] 2.1 Escribir `bok/14-governing-development.md` con H1, entradilla de una frase y las secciones H2 del spec, tablas GFM, un ejemplo JSON por registro clave y callouts `**In practice (illustrative)**` / `**Example (illustrative)**`.
- [x] 2.2 Numerar las citas por orden de primera aparición y generar `## Sources` con el formato de los capítulos 04 y 08.
- [x] 2.3 Comprobar que no hay rayas (U+2014), que las capas usan los nombres del capítulo 04 y que los enlaces internos solo apuntan a rutas y anclas existentes.

## 3. Fuentes consolidadas

- [x] 3.1 Añadir la sección `### bok/14-governing-development.md` al final de `sources/SOURCES.md`, una fila por `[n]` con el mismo tag de verificación.

## 4. Handoff y validación

- [x] 4.1 Escribir `D:/Documents/aige-wt/handoffs/c14-governing-development.json` (JSON válido) con resumen, "at a glance", glosario, obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados, lista de lectura y notas.
- [x] 4.2 Ejecutar `openspec validate bok-ch14-governing-development --strict` hasta que pase.
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` y confirmar salida 0.
- [x] 4.4 Commit con rutas explícitas y mensaje convencional en español, sin líneas de atribución.
