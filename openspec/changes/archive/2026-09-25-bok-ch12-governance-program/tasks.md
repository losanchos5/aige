# Tasks

Todas las rutas son relativas al worktree `D:/Documents/aige-wt/c12-governance-program` (rama
`wt/c12-governance-program`). La build solo se ejecuta con `bash D:/Documents/aige-wt/build.sh`. Los
ficheros compartidos (`chapters.ts`, glosario, `frameworks.ts`, `crosswalk.ts`, `sources/SOURCES.md`,
otros capítulos) no se tocan: lo que les corresponde va al handoff
`D:/Documents/aige-wt/handoffs/c12-governance-program.json`.

## 1. Preparación

- [x] 1.1 Leer `STYLEGUIDE.md`, `site/src/lib/remark-callouts.ts` y los capítulos 01, 04, 05, 06 y 08 para usar el modelo de la casa (cinco capas, 17 patrones y sus anclas, siete flujos de trabajo, formato de fuentes)
- [x] 1.2 Verificar en línea las fuentes primarias (AI Act arts. 3, 4, 17, 25, 26, 53, 87 y anexo III; Reglamento (UE) 2026/1744; preguntas y respuestas de la Comisión sobre alfabetización; Directivas (UE) 2019/1937 y 2019/790; SB 53; NIST AI 100-1; modelo de las tres líneas; OMB M-25-21; dictamen 28/2024 del CEPD; Partnership on AI; cláusulas MCC-AI; capítulo de postmortems de Google SRE)

## 2. Capítulo

- [x] 2.1 Escribir la primera parte (organización como objeto de gobierno, mapa de partes interesadas, RACI, comité, riesgo corporativo y tres líneas, alfabetización como código, cultura, canal de preocupaciones, KPI y KRI, revisión por la dirección, estrategia y valor, programa sin capacidad de ingeniería)
- [x] 2.2 Escribir la segunda parte (jerarquía de políticas, requisitos por fase, política como código, actualización de políticas existentes, adquisición de datos, IA de terceros, uso aceptable)
- [x] 2.3 Añadir "What you can do this week" y `## Sources` con 24 referencias numeradas, y comprobar que cada `[n]` del cuerpo existe en la lista y viceversa
- [x] 2.4 Comprobar que no hay rayas (U+2014), palabras vetadas por la guía de estilo ni términos bloqueados por content-lint

## 3. Verificación

- [x] 3.1 Ejecutar `bash D:/Documents/aige-wt/build.sh` y confirmar código de salida 0 (incluye check-links sobre todas las anclas internas)
- [x] 3.2 Ejecutar `openspec validate bok-ch12-governance-program --strict` hasta que pase

## 4. Entrega

- [x] 4.1 Escribir `D:/Documents/aige-wt/handoffs/c12-governance-program.json` con resumen y "at a glance" para `chapters.ts`, términos de glosario, filas de obligaciones y de crosswalk, figuras, patrones necesarios, enlaces cruzados, lecturas y filas para `sources/SOURCES.md`
- [x] 4.2 Hacer commit de `bok/12-governance-program.md` y de este cambio OpenSpec con rutas explícitas y mensaje convencional en español
