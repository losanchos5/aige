# Proposal

## Why

El patrón Policy Card (capítulo 05, `/patterns/policy-card`) pide escribir cada regla de gobierno
como un artefacto legible por máquina que el pipeline y el runtime evalúan, con un veredicto en
cada evaluación. El sitio ya publica el esquema `policy-card.v1.json` y la plantilla de política
`ai-policy.yaml`/`ai-policy.rego`, pero el lector que quiere aplicar el patrón el lunes todavía
tiene que escribir a mano la tarjeta, el módulo Rego, sus pruebas y el paso de CI. Una herramienta
que genere todo eso en el navegador, a partir de un conjunto pequeño de reglas curadas o de una
condición propia, convierte el patrón en algo que se usa, sin enviar nada a ningún servidor.

## What Changes

- **Plantillas de reglas** `site/src/data/policy-card.ts` (sin importaciones): seis reglas curadas
  (ningún agente sin registrar en producción; puntuación de eval igual o superior a un umbral antes
  de desplegar; ningún dato personal a un modelo externo; aprobación humana para una herramienta
  concreta; model card presente antes de publicar; una excepción caducada bloquea la build) y una
  regla propia (una condición sobre un campo de la entrada, con operador, valor, efecto y puntos de
  aplicación). Cada plantilla trae enunciado, condición, efecto, puntos de aplicación, modo de fallo,
  obligaciones por defecto (ids estables de `frameworks.ts`), cláusula de la política de origen,
  patrón y parámetros.
- **Generadores** `site/public/toolkit/policy-card-core.js` (módulo ES puro, sin DOM): comprobación
  de los valores (todo lo que acaba en código se limita a caracteres que no necesitan escape en
  Rego, Cedar, YAML o un nombre de fichero; el texto libre solo llega a comentarios y cadenas, sin
  saltos de línea) y generación de la Policy Card en Markdown, YAML y JSON (válida contra
  `/schemas/policy-card.v1.json`), un módulo OPA/Rego (sintaxis Rego v1) con `decision`, `blocks` y
  `verdict`, sus pruebas para `opa test`, un stub Cedar con anotaciones `@id` y `@effect` y sus
  pruebas para `cedar run-tests`, un input de ejemplo conforme y el hook de CI (workflow de GitHub
  Actions que comprueba y prueba el módulo, guarda el veredicto como artefacto y falla con `deny`).
  Incluye un validador mínimo del subconjunto de JSON Schema que usa el sitio y el estado en el
  enlace.
- **Página** `/toolkit/policy-card` (`site/src/pages/toolkit/policy-card.astro`) sobre `ToolShell`:
  formulario en cuatro bloques (regla, parámetros, tarjeta, obligaciones agrupadas como el capítulo
  08), resultado con los nueve ficheros (copiar y descargar cada uno, o todo en un Markdown), guía
  renderizada en el servidor (las seis plantillas con sus valores por defecto, qué se obtiene, cómo
  usarlo en un repositorio, diferencias entre Rego y Cedar, muestras comprobadas, dónde encaja y qué
  no es) y fuentes numeradas. Sin JavaScript funciona como hoja de trabajo.
- **Cliente** `site/public/toolkit/policy-card.js`: lee la isla JSON (plantillas, obligaciones,
  esquema), cambia de regla, valida con un resumen de errores que recibe el foco y errores por
  campo, construye y valida la tarjeta en el navegador, escribe el estado en el fragmento del enlace
  y gestiona copiar, descargar e imprimir.
- **Muestras** `site/public/templates/policy-cards/<plantilla>/` (nueve ficheros por plantilla y un
  README), generadas por `site/scripts/policy-card-samples.mjs` con el mismo código que la página.
  OPA no estaba instalado en la máquina: se descargaron los binarios oficiales (OPA 1.21.0 y
  cedar-policy-cli 4.13.0, comprobados con su sha256) en el directorio temporal, y todas las
  muestras pasaron `opa check --strict`, `opa test`, `cedar check-parse` y `cedar run-tests`, igual
  que 114 variantes adicionales (todas las combinaciones de operador y efecto de la regla propia y
  parámetros límite).
- **Registro** `site/src/data/toolkit.ts`: entrada `policy-card` en estado `live`, al final.
- **Registros compartidos**: un bloque en `SOURCE_BY_PATH`, una sección en `sources/SOURCES.md` y
  viñetas en `bok/CHANGELOG.md`.
- **Pruebas** `site/tests/policy-card.spec.ts`: generadores (motores, validez contra el esquema,
  YAML que se relee como el mismo JSON, contenido de Rego, Cedar y CI, operadores y efectos de la
  regla propia, valores peligrosos rechazados, estado en el enlace, deriva de las muestras) y página
  (sin JavaScript, validación y foco, resultado, regla propia, descargas, enlace, sin red, impresión,
  390 px). Las de navegador se ejecutan de forma central.
- Fuera de alcance (van al handoff): navegación, tarjeta en `/resources`, Open Graph propio, enlace
  desde el patrón Policy Card y desde el capítulo 05, recuentos de rutas en las pruebas de SEO y
  `llms.txt`.

## Capabilities

### New Capabilities
- `policy-card-builder`: la herramienta `/toolkit/policy-card`, sus plantillas de reglas, sus
  generadores y las muestras comprobadas.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/src/data/policy-card.ts`, `site/public/toolkit/policy-card-core.js`,
  `site/public/toolkit/policy-card.js`, `site/src/pages/toolkit/policy-card.astro`,
  `site/scripts/policy-card-samples.mjs`, `site/public/templates/policy-cards/**`,
  `site/tests/policy-card.spec.ts`.
- **Modificados**: `site/src/data/toolkit.ts` (una entrada al final), `site/astro.config.ts` (un
  bloque en `SOURCE_BY_PATH`), `sources/SOURCES.md` y `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia; la CSP no cambia. Ningún encabezado de
  capítulo cambia.
- Todo lo generado es ilustrativo y debe revisarse antes de usarlo; no es asesoramiento jurídico ni
  una declaración de conformidad.
