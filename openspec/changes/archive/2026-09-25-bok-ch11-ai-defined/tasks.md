# Tasks

Worktree `D:/Documents/aige-wt/c11-ai-defined` (rama `wt/c11-ai-defined`). La build se lanza solo con
`bash D:/Documents/aige-wt/build.sh`. Sin push, merge ni PR: integra el orquestador.

## 1. Investigación y fuentes

- [x] 1.1 Leer `STYLEGUIDE.md`, los capítulos 01, 03, 04, 05, 06 y 08 y el checklist de temas del bloque.
- [x] 1.2 Verificar en línea las fuentes primarias: texto del AI Act (arts. 3, 14, 15, 16, 50, 51, 86; considerandos 12 y 27), directrices de la Comisión sobre la definición de sistema de IA y sobre GPAI, Recomendación de la OCDE y memorando explicativo, NIST AI 100-1 y AI 600-1, ISO/IEC 22989 (solo identificador y cláusulas), UNESCO, HLEG/ALTAI, G7 Hiroshima y marco de informes HAIP, y los artículos técnicos citados.
- [x] 1.3 Marcar "(verify)" lo no confirmado (estado de ISO/IEC 22989 Amd 1).

## 2. Capítulo

- [x] 2.1 Escribir `bok/11-ai-defined.md` con H1 "# 11. AI, defined for governance" y entradilla de dos líneas.
- [x] 2.2 Secciones de definiciones comparadas, elemento a campo del registro, IA frente a software convencional.
- [x] 2.3 Secciones de tipos de IA, tabla de ocho características y pares de contraste.
- [x] 2.4 Sección de gobierno de salidas probabilísticas.
- [x] 2.5 Sección "Responsible-AI principle sets, engineered" con las dos tablas de cruce.
- [x] 2.6 "What you can do this week", línea "Maps to" y "## Sources" con 39 referencias.
- [x] 2.7 Comprobar que no hay rayas largas y que todos los enlaces internos apuntan a rutas y anclas existentes.

## 3. Registro de fuentes y handoff

- [x] 3.1 Añadir la sección `bok/11-ai-defined.md` a `sources/SOURCES.md`.
- [x] 3.2 Escribir `D:/Documents/aige-wt/handoffs/c11-ai-defined.json` con resumen, ideas clave, glosario, obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados y lecturas.

## 4. Verificación

- [x] 4.1 `openspec validate bok-ch11-ai-defined --strict` en verde.
- [x] 4.2 `bash D:/Documents/aige-wt/build.sh` con salida 0.
- [x] 4.3 Commit por rutas explícitas con mensaje convencional en español.
