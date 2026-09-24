# Tasks

Rama `wt/w2-patterns-a` en el worktree `D:/Documents/aige-wt/w2-patterns-a`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque van al
handoff `D:/Documents/aige-wt/handoffs/w2-patterns-a.json`.

## 1. Lectura y verificación de fuentes

- [x] 1.1 Leer STYLEGUIDE.md, el cambio `patterns-as-pages`, `src/lib/pattern-pages.ts`, dos
  ficheros de patrón existentes y las secciones de los capítulos 11 a 23 que describen cada práctica.
- [x] 1.2 Verificar las subcategorías del NIST AI RMF (GOVERN 1.3, 1.6, 6.1; MAP 1.1, 1.5, 2.3, 4.1,
  5.1; MEASURE 2.3, 2.5, 2.7, 2.8, 2.9, 2.11; MANAGE 3.2) en el PDF de NIST AI 100-1.
- [x] 1.3 Verificar los artículos del AI Act citados (`3(12)`, `5`, `6(3)`, `6(4)`, `10(2)(b)`,
  `10(2)(f)-(g)`, `10(3)-(4)`, `13(3)(b)(ii)`, `13(3)(b)(iv)-(v)`, `15(3)`, `15(4)`, `15(5)`, `26(11)`,
  `49(2)`, `53(1)(c)-(d)`, `55(1)(d)`, `86(1)`) en el AI Act Service Desk, citándolos contra el ELI
  de EUR-Lex.
- [x] 1.4 Verificar los identificadores de MITRE ATLAS en la release de datos 2026.09 y los
  identificadores del Anexo A de ISO/IEC 42001 en el crosswalk del NIST AI Resource Center.
- [x] 1.5 Verificar STRIDE, la guía de Microsoft para modelar amenazas de IA/ML, el Threat Modeling
  Manifesto, la especificación OpenSSF Model Signing, SLSA v1.2, safetensors, el escaneo de pickle
  de Hugging Face y `torch.load`.
- [x] 1.6 Reutilizar las filas ya verificadas de los capítulos 14, 15, 16, 18 y 20 y de la sección
  del crosswalk.

## 2. Patrones

- [x] 2.1 Escribir `use-case-intake-risk-tiering.md` con un `use-case-record.v1` válido.
- [x] 2.2 Escribir `ai-threat-model.md` con la tabla STRIDE ampliada y una entrada ilustrativa.
- [x] 2.3 Escribir `training-data-rights-ledger.md` con una fila ilustrativa del registro.
- [x] 2.4 Escribir `dataset-admission-gate.md` con un `dataset-admission-record.v1` válido.
- [x] 2.5 Escribir `fairness-eval-suite.md` con un `eval-result.v1` válido.
- [x] 2.6 Escribir `explanation-artefact.md` con un registro de explicación ilustrativo.
- [x] 2.7 Escribir `model-artefact-integrity.md` con un `evidence-record.v1` válido.
- [x] 2.8 Escribir `claims-substantiation-gate.md` con una fila ilustrativa del registro de
  afirmaciones.
- [x] 2.9 Comprobar resúmenes de 50 a 160 caracteres, citas 1..N sin huecos y ausencia de rayas
  largas.

## 3. Índice, catálogo y diagramas

- [x] 3.1 Añadir las ocho entradas al final de `site/src/data/patterns.ts` (orden 18 a 25).
- [x] 3.2 Añadir las ocho secciones `## Pattern:` con resumen y enlace a `bok/05-patterns.md`.
- [x] 3.3 Escribir los ocho IR de archify y sus ficheros de notas; validarlos con
  `--quality showcase`.
- [x] 3.4 Añadir las ocho entradas al final de `site/src/data/diagrams.ts`.

## 4. Enlaces, registros y entrega

- [x] 4.1 Enlazar desde los capítulos 11 a 23 las menciones concretas de cada práctica, sin
  reescribir la prosa.
- [x] 4.2 Añadir la sección a `sources/SOURCES.md` y la viñeta a `bok/CHANGELOG.md`.
- [x] 4.3 Escribir `site/tests/patterns-development.spec.ts`.
- [x] 4.4 Validar el cambio con `openspec validate patterns-development-side --strict`.
- [x] 4.5 Ejecutar `bash D:/Documents/aige-wt/build.sh` y comprobar que termina con código 0.
- [x] 4.6 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-patterns-a.json`.
