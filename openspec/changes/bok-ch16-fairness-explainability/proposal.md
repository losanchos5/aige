# Proposal

## Why

El Body of Knowledge no trata la equidad (fairness) más que en cinco menciones de paso y no menciona
la explicabilidad ni una sola vez: no hay métricas de grupo, ni resultados de imposibilidad, ni regla
de los cuatro quintos, ni técnicas de atribución, ni ganchos legales de explicación (avisos de
denegación de crédito, RGPD arts. 13-15 y 22, AI Act arts. 13 y 86). Es el mayor hueco temático del
sitio para la versión v0.5.0. El capítulo 16 existe como esqueleto (`bok/16-fairness-explainability.md`)
y debe convertirse en un capítulo práctico que conecte cada técnica con la capa del stack que produce
su evidencia, con la condición de gate que la hace control y con la obligación legal a la que
responde.

## What Changes

- Sustituir el esqueleto de `bok/16-fairness-explainability.md` por el capítulo completo (unas
  6.500 palabras de prosa más tablas), manteniendo el H1 «16. Fairness and explainability for
  practitioners» y un blockquote inicial de una frase que sirve de entradilla.
- Mitad de equidad: fuentes de sesgo por fase del ciclo de vida (NIST SP 1270; siete fuentes de
  Suresh y Guttag), características protegidas y proxies, el nuevo art. 4a del AI Act (antes
  art. 10(5), movido por el Digital Omnibus) traducido a controles, trato dispar frente a impacto
  dispar (Title VII, Directiva 2000/43/CE), regla de los cuatro quintos y ratio de impacto adverso
  (29 CFR 1607.4(D)) con su estado de aplicación a 2026-09-24, NYC Local Law 144, métricas de grupo,
  equidad individual y contrafáctica, resultados de imposibilidad (Kleinberg et al. 2016,
  Chouldechova 2017) con ejemplo numérico, pruebas interseccionales, elección de métrica por caso de
  uso, mitigación pre/in/post-procesado y monitorización en producción.
- Mitad de explicabilidad: transparencia frente a interpretabilidad frente a explicabilidad (NIST AI
  RMF, NIST IR 8312), modelos interpretables por diseño frente a explicaciones post-hoc y cuándo se
  exige un modelo interpretable, técnicas (SHAP, LIME, gradientes integrados, sustitutos,
  contrafácticos, ejemplos, LLM y RAG), ganchos legales (ECOA/Reg B, FCRA, RGPD, CJUE C-634/21 y
  C-203/22, Reino Unido arts. 22A-22D, AI Act arts. 13, 26(11) y 86), pruebas de calidad de la
  explicación, accesibilidad (WCAG 2.2, art. 16(l)) y el registro de explicación como evidencia.
- Cierre: tabla capa por capa (01-05) de artefactos de equidad y explicabilidad con los patrones
  existentes del cap. 05, condiciones de gate, caja «In practice (illustrative)», línea «Maps to»,
  sección «What you can do this week» y 55 fuentes numeradas con etiqueta de verificación.
- Fuera de alcance (va al fichero de handoff para el orquestador): filas en `sources/SOURCES.md`,
  entradas de glosario, filas de `frameworks.ts` y `crosswalk.ts`, enlaces cruzados desde otros
  capítulos, nuevos patrones del cap. 05 («Fairness Eval Suite», «Explanation Artefact»,
  «Drift and Fairness Monitor») y la actualización de `chapters.ts`.

## Capabilities

### New Capabilities
- `bok-fairness-explainability`: el capítulo 16 del Body of Knowledge como referencia práctica de
  equidad y explicabilidad con evidencia por capa, ganchos legales verificados y condiciones de gate.

### Modified Capabilities
- (ninguna)

## Impact

- **Contenido**: `bok/16-fairness-explainability.md` (reescritura completa del esqueleto). Sin
  cambios en otros capítulos ni en ficheros compartidos del sitio.
- **Sitio**: la ruta existente `/bok/fairness-and-explainability` gana 20 anclas H2 y 12 anclas H3
  estables; todos los enlaces internos apuntan a rutas y anclas existentes (check-links en verde).
- **Handoff**: `D:/Documents/aige-wt/handoffs/c16-fairness-explainability.json` (fuera del repo) con
  resumen, glosario, obligaciones, crosswalk, figuras, patrones pendientes, enlaces cruzados, lista
  de lectura y las filas de fuentes para `sources/SOURCES.md`.
- Sin dependencias nuevas. Sin cambios de código.
