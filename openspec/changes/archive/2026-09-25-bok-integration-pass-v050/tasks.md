# Tasks

Rama `wt/b-bok-maintenance` en el worktree `D:/Documents/aige-wt/b-bok-maintenance`. El build se
lanza solo con `bash D:/Documents/aige-wt/build.sh`. Lo que toca a ficheros de otros bloques va al
handoff `D:/Documents/aige-wt/handoffs/b-bok-maintenance.json`.

## 1. Lectura de handoffs

- [x] 1.1 Leer `STYLEGUIDE.md` y todos los handoffs (`*.json`, `*.sources.md`, `c22-sources-rows.md`) y separar lo que toca a ficheros de este bloque.
- [x] 1.2 Verificar en línea SR 26-2 y su anexo (Reserva Federal), el art. 73 y el art. 26(5) del AI Act, y el art. 75(1a), el art. 25(2) y (4), el art. 99(4)(da), el anexo VIII y la máquina en el texto del Ómnibus (Oficina de Publicaciones), y la cifra de equipos unipersonales del informe State of GRC 2026.

## 2. Manifiesto de capítulos

- [x] 2.1 Sustituir `summary` y añadir `glance` para el capítulo 02 y los capítulos 11 a 22 en `site/src/data/chapters.ts` (≤160 caracteres, sin rayas).
- [x] 2.2 Actualizar los comentarios de cabecera que hablaban de «eleven chapters».

## 3. Fuentes consolidadas

- [x] 3.1 Añadir a `sources/SOURCES.md` las secciones de los capítulos 12, 13, 16 a 22 entregadas en los handoffs y generar la del 15 desde su lista `## Sources`.
- [x] 3.2 Añadir la parte «Site data pages» (atlas de daños, casos, plantillas).
- [x] 3.3 Comprobar con un script que cada `[n]` de los capítulos 00 a 22 tiene su fila con la misma URL y etiqueta.
- [x] 3.4 Reparar celdas «Claim» vacías o truncadas de las filas entregadas.

## 4. Capítulo 08

- [x] 4.1 Puntero al capítulo 18 al abrir la sección de la UE y lista de dónde se desarrolla cada fila.
- [x] 4.2 Reloj del art. 73 desde el conocimiento, deber inmediato y deployer (art. 26(5)); art. 75(1a) y alcance de los arts. 75a a 75d.
- [x] 4.3 Precisiones del Ómnibus sobre los arts. 6 y 25 y la máquina, en prosa.
- [x] 4.4 Corea con fuentes primarias de law.go.kr y periodo de orientación; China y EE. UU. con punteros al capítulo 21.
- [x] 4.5 «What is NOT harmonised yet» con los estados de JTC 21 a 2026-09-24; nota de NIST AI RMF en revisión.
- [x] 4.6 Fuentes `[34]` y `[57]` a `[62]` en el capítulo y en `SOURCES.md`.

## 5. SR 11-7 y referencias sustituidas

- [x] 5.1 Capítulos 01 y 02: SR 26-2 con fuentes primarias; etiqueta de la tabla y `map.ts` sin cambios.
- [x] 5.2 `STYLEGUIDE.md` §10 y regla «Superseded references» en §7.
- [x] 5.3 Comprobar que ningún capítulo propio cita ediciones antiguas de ISO 9001 o ISO/IEC 27701.

## 6. Enlaces cruzados

- [x] 6.1 Aplicar los `cross_links` de los handoffs cuyo `from_file` es de este bloque (capítulos 01 a 04, 06 a 08 y 11 a 22).
- [x] 6.2 Convertir los enlaces de ruta entre los capítulos 11 a 22 en anclas de sección, salvo las referencias de orientación a un capítulo entero.
- [x] 6.3 Verificar cada ancla contra el HTML construido (check-links).

## 7. Cierre

- [x] 7.1 Corregir «about one in six» en el capítulo 04 según su fuente (18.5%).
- [x] 7.2 Viñetas en `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)».
- [x] 7.3 Handoff JSON con glosario, obligaciones, crosswalk, filas del capítulo 08 y enlaces de otros bloques.
- [x] 7.4 Build final con código 0 y `openspec validate bok-integration-pass-v050 --strict`.
