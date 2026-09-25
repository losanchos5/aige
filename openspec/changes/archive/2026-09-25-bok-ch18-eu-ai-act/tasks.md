# Tasks

Worktree `D:/Documents/aige-wt/c18-eu-ai-act`, rama `wt/c18-eu-ai-act`. Sin push ni merge: integra el
orquestador. Build solo con `bash D:/Documents/aige-wt/build.sh`.

## 1. Investigación y verificación

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01`, `bok/04`, `bok/05`, `bok/06`, `bok/08` y
  `site/src/lib/remark-callouts.ts` para usar el modelo de la casa (cinco capas, patrones, flujos).
- [x] 1.2 Descargar y leer el texto de los Reglamentos (UE) 2024/1689 y 2026/1744 (EUR-Lex / Cellar)
  y verificar arts. 2 a 6, 8 a 27, 43, 49 a 61, 64 a 77, 85 a 87, 99, 101, 111 y 113 y los anexos I,
  III, VIII y XIV.
- [x] 1.3 Verificar las guías de la Comisión (definición de sistema de IA, prácticas prohibidas,
  clasificación de alto riesgo en borrador, GPAI), el Código de Buenas Prácticas GPAI y el código de
  transparencia de contenido generado.
- [x] 1.4 Verificar las definiciones de roles de Colorado SB 26-189, Texas HB 149 y la AI Basic Act de
  Corea en fuente primaria; marcar «(verify)» lo que no se pudo confirmar (ISO/IEC 22989).

## 2. Capítulo

- [x] 2.1 Escribir `bok/18-eu-ai-act.md` con H1 y lede, todas las secciones del alcance, tablas GFM,
  callouts, «What you can do this week», «Maps to» y «Sources» numeradas.
- [x] 2.2 Comprobar que no hay rayas (U+2014), que cada `[n]` tiene fuente y que los enlaces internos
  apuntan a rutas y anclas existentes.

## 3. Datos

- [x] 3.1 Crear `site/src/data/roles.ts` con el tipo `Role`, los regímenes y las filas de la tabla de
  roles entre regímenes.

## 4. Verificación y entrega

- [x] 4.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que termine con código 0.
- [x] 4.2 Ejecutar `openspec validate bok-ch18-eu-ai-act --strict` hasta que pase.
- [x] 4.3 Escribir el traspaso `D:/Documents/aige-wt/handoffs/c18-eu-ai-act.json` (JSON válido) con
  resumen, glance, glosario, obligaciones, crosswalk, enlaces cruzados, filas de SOURCES.md y notas.
- [x] 4.4 Commit por rutas explícitas con mensaje convencional en español, sin atribución.
