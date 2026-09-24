# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/c19-privacy-and-ai` (rama
`wt/c19-privacy-and-ai`). El build solo se lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Lectura y verificación

- [x] 1.1 Leer `STYLEGUIDE.md`, `bok/01-definition.md`, `bok/04-the-stack.md`, `bok/05-patterns.md`, `bok/06-the-role.md` y `bok/08-regulatory-map.md` para usar el modelo de cinco capas, las anclas `#pattern-*` y el formato de fuentes.
- [x] 1.2 Verificar en línea las fuentes primarias (texto del RGPD en EUR-Lex, Opinión 28/2024 del EDPB, comunicados del TJUE sobre SCHUFA, Dun & Bradstreet, EDPS v SRB y Latombe, propuesta COM(2025) 837, Reglamento (UE) 2026/1744, DUAA s. 80, reglamento de la CPPA, estatutos de Virginia, Colorado, Minnesota y Washington, LGPD, PIPL, guías de CNIL, ICO y AEPD, artículos académicos) y anotar como "(verify)" lo no confirmado.

## 2. Capítulo

- [x] 2.1 Reescribir `bok/19-privacy-and-ai.md` con el H1 intacto, la entradilla de una frase y las secciones H2 del spec; verificar con `grep -c "—" bok/19-privacy-and-ai.md` = 0.
- [x] 2.2 Añadir tablas GFM (fases de tratamiento, bases jurídicas, PETs, roles, criterios de DPIA, regímenes de ADM, ubicaciones de datos, biometría, brechas, Omnibus, leyes estatales de EE. UU., mapa final) y callouts `In practice (illustrative)` / `Example (illustrative)` con la sintaxis de `site/src/lib/remark-callouts.ts`.
- [x] 2.3 Numerar las fuentes por orden de aparición en `## Sources` con el formato del capítulo 08 y comprobar que todo `[n]` del texto existe en la lista.
- [x] 2.4 Enlazar solo rutas y anclas existentes (`/bok/the-stack#…`, `/bok/patterns#pattern-…`, `/bok/regulatory-map#…`).

## 3. OpenSpec y handoff

- [x] 3.1 Crear `proposal.md`, `tasks.md` y `specs/bok-privacy-and-ai/spec.md` y pasar `openspec validate bok-ch19-privacy-and-ai --strict`.
- [x] 3.2 Escribir `D:/Documents/aige-wt/handoffs/c19-privacy-and-ai.json` (resumen del capítulo, glosario, obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados, lecturas, filas de `sources/SOURCES.md`) y validarlo como JSON.

## 4. Build y commit

- [x] 4.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar salida 0 (astro check, build, content-lint, check-links, pagefind).
- [x] 4.2 Commit con rutas explícitas y mensaje convencional en español, sin atribuciones ni `--no-verify`.
