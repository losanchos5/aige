# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/c13-risk-management` (rama
`wt/c13-risk-management`). El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Los
ficheros compartidos no se tocan: lo que les afecta va al handoff
`D:/Documents/aige-wt/handoffs/c13-risk-management.json`.

## 1. Lectura y fuentes

- [x] 1.1 Leer `STYLEGUIDE.md`, `site/src/lib/remark-callouts.ts` y los capítulos 01, 04, 05, 06, 07 y 08 para usar los nombres canónicos de capas, flujos, patrones y niveles; verificar que las anclas enlazadas existen con `check-links` en el build
- [x] 1.2 Verificar en línea las fuentes primarias (NIST AI 100-1 y AI 600-1, crosswalk NIST AI RMF e ISO/IEC 23894, páginas ISO de 31000, 31073, 23894, 42001, 14971, TR 5469 e IEC 31010, EU AI Act arts. 3, 5, 9 y 27, Reglamento (UE) 2026/1744 en EUR-Lex, SR 26-2, NIOSH, IIA, Cox 2008, MIT AI Risk Repository, Schuett 2024); anotar como `(verify)` y en `verify_items` lo no confirmado

## 2. Capítulo 13

- [x] 2.1 Escribir `bok/13-risk-management.md` con el H1 «13. Where risk management sits» y un resumen de dos líneas; verificar con `head -4 bok/13-risk-management.md`
- [x] 2.2 Secciones del ciclo, capas, flujos, NIST (19 categorías) e ISO (31000, 23894, 42001); verificar con `grep -c "^| GOVERN\|^| MAP\|^| MEASURE\|^| MANAGE" bok/13-risk-management.md` ≥ 19
- [x] 2.3 Secciones de identificación (fuentes internas y externas, factores, partes interesadas), matriz con escalas, bandas y regla S5, apetito compilado (`appetite.yaml` y política `rego`), jerarquía de mitigación, residual y autoridad de aceptación, registro de riesgos, gobernanza proporcionada, madurez e incidentes
- [x] 2.4 Línea «Maps to» con «Mappings are illustrative, not a claim of conformity», sección «What you can do this week» (5 acciones) y `## Sources` numeradas en el formato de los capítulos 04 y 08; verificar que cada `[n]` tiene fuente y viceversa
- [x] 2.5 Comprobar que no hay rayas largas (U+2014) ni palabras vetadas; verificar con `grep -c "—" bok/13-risk-management.md` = 0

## 3. OpenSpec, handoff y build

- [x] 3.1 Crear `proposal.md`, `tasks.md` y `specs/bok-risk-management/spec.md`; verificar con `openspec validate bok-ch13-risk-management --strict`
- [x] 3.2 Escribir el handoff JSON (resumen, «at a glance», glosario, obligaciones, crosswalk, figuras, enlaces cruzados, lecturas, notas) y las filas para `sources/SOURCES.md`; verificar que el JSON es válido con `python -m json.tool`
- [x] 3.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta salida 0
- [x] 3.4 Commit por rutas explícitas con mensaje convencional en español, sin atribuciones y sin `--no-verify`
