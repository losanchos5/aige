# Tasks

Worktree `D:/Documents/aige-wt/w2-source-sweep`, rama `wt/w2-source-sweep`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`. Handoff en `D:/Documents/aige-wt/handoffs/w2-source-sweep.json`.

## 1. Inventario

- [x] 1.1 Listar las entradas de `## Sources` de los capítulos 11 a 23 que citan artificialintelligenceact.eu (64: 57 `primary`, 7 `secondary`; ninguna en los capítulos 18, 21 y 23).
- [x] 1.2 Tabular por dominio todas las entradas `primary` de los capítulos 11 a 23 y señalar las que no apuntan a una fuente primaria (reproducciones del LII).

## 2. Textos oficiales

- [x] 2.1 Leer en el Cellar de la Oficina de Publicaciones el DOUE del Reglamento (UE) 2024/1689, su texto consolidado de 2026-07-27 y el Reglamento (UE) 2026/1744, y confirmar las anclas `art_<n>`, `anx_<n>` y `rct_<n>`.
- [x] 2.2 Comprobar cada glosa contra el artículo o anexo del consolidado (arts. 2 a 5, 9 a 19, 25 a 27, 40 a 55, 60, 60a, 72, 75, 86, 87, 113; anexos III, IV, VIII, XI, XII) y los considerandos 12 y 27 en el DOUE.
- [x] 2.3 Leer las directrices GPAI C(2025) 7719 final (apartados 82 a 84), el RGPD (arts. 22, 33, 34), el US Code en GovInfo y el eCFR.

## 3. Re-citas

- [x] 3.1 Sustituir las 64 entradas del explorador por EUR-Lex con ancla y etiqueta `primary`; corregir la glosa del art. 72 del capítulo 14.
- [x] 3.2 Sustituir el resumen GPAI del explorador (capítulo 14 [50]) por las directrices de la Comisión.
- [x] 3.3 Sustituir las reproducciones del LII y de gdpr-info.eu (capítulos 11, 15, 16 y 20) por GovInfo, eCFR y EUR-Lex.
- [x] 3.4 Comprobar con un script que cada `[n]` sigue resolviendo, sin huecos, y que cada fila de `SOURCES.md` lleva la misma URL y etiqueta que su entrada.

## 4. Registro y cierre

- [x] 4.1 Actualizar las filas de `sources/SOURCES.md`, reconstruir las mal formadas y añadir la sección del barrido.
- [x] 4.2 Devolver las filas del monitor regulatorio a su sección y recomponer la de `VISUAL-GUIDE.md`.
- [x] 4.3 Viñetas en `bok/CHANGELOG.md` bajo «Unreleased (v0.5.0)».
- [x] 4.4 `openspec validate source-sweep-v050 --strict` y build completa con `build.sh`.
- [x] 4.5 Handoff con lo que queda fuera del bloque.
