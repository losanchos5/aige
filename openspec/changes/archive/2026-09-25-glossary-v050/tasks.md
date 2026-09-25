# Tasks

Worktree `D:/Documents/aige-wt/b-glossary` (rama `wt/b-glossary`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque (navegación,
portada, hub de Resources, `path.ts`, content-lint, capítulos) no se tocan: sus cambios van al
handoff `D:/Documents/aige-wt/handoffs/b-glossary.json`.

## 1. Términos y fuentes

- [x] 1.1 Reunir los términos de glosario de todos los handoffs (214 entradas) y deduplicarlos, fusionando definiciones solapadas (sistema de IA, proveedor, responsable del despliegue, modificación sustancial, deriva de concepto, explicabilidad, etc.).
- [x] 1.2 Añadir los términos del brief que faltaban (sistema de alto riesgo, práctica prohibida, supervisión humana, impugnabilidad, recurso, guardrail, inyección de prompt, jailbreak, alucinación, sesgo, equidad, modelo de frontera, marca de agua, C2PA, deepfake, ISO/IEC 42001, NIST AI RMF, gestión del riesgo, deriva de datos, system card, transparencia y otros).
- [x] 1.3 Verificar en línea las fuentes nuevas: SR 26-2 (Reserva Federal), OWASP LLM01:2025, NIST AI 100-4, C2PA 2.2, system cards (Meta AI), recurso accionable (arXiv 1809.06514), RLHF (arXiv 2203.02155) y las definiciones del art. 3 del AI Act (Service Desk de la Comisión); reutilizar las filas ya verificadas por los capítulos.
- [x] 1.4 Corregir "Serious incident" a las cuatro letras del art. 3(49) con puntero al capítulo 17 y anotar en "Model risk management" que SR 26-2 sustituyó a SR 11-7 el 2026-04-17.
- [x] 1.5 Asignar a cada término una cláusula "See" con ancla verificada y un "Contrast with" donde existe un par confundible.
- [x] 1.6 Generar `bok/09-glossary.md` (279 términos, encabezados por letra, tabla de pares) y la sección del capítulo 09 de `sources/SOURCES.md` (120 fuentes, numeración 1 a 19 conservada).

## 2. Sitio

- [x] 2.1 Reescribir `src/lib/glossary.ts`: parser de la entrada (definición, citas, contraste, See, capítulos), fuentes, pares, alias y acrónimos, índice de uso por capítulo y términos relacionados.
- [x] 2.2 Actualizar `src/lib/rehype-glossary.ts`: enlaces a `/glossary/<slug>`, alias y acrónimos, y anclas `t-…` con enlace en el propio capítulo 09.
- [x] 2.3 Crear `src/pages/glossary/[slug].astro` con JSON-LD `DefinedTerm`, fuentes, usos, relacionados, tarjetas y cita.
- [x] 2.4 Crear `src/components/ContrastCards.astro` y `src/components/TermCitation.astro`.
- [x] 2.5 Actualizar `src/pages/glossary.json.ts` (`url`, `anchor`, `chapters`), `src/components/GlossaryIndex.astro` y `src/pages/resources/glossary.astro` (tarjetas de pares, JSON-LD con el conjunto del libro).
- [x] 2.6 Añadir las rutas por término a `SOURCE_BY_PATH` y las redirecciones 301 de `/resources/glossary` y `/glossary` a `public/_redirects`.

## 3. Tests

- [x] 3.1 Actualizar `tests/v4.spec.ts` (enlaces de términos y `glossary.json`) y `tests/seo-schema.spec.ts` (conjunto y página de término).
- [x] 3.2 Crear `tests/glossary.spec.ts` (datos del glosario, páginas, anclas del índice, redirecciones).

## 4. Verificación y entrega

- [x] 4.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 4.2 Ejecutar `openspec validate glossary-v050 --strict` hasta que pase.
- [x] 4.3 Añadir la entrada del bloque en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".
- [x] 4.4 Escribir `D:/Documents/aige-wt/handoffs/b-glossary.json` (navegación, enlaces a migrar, content-lint, tests, sitemap y notas).
