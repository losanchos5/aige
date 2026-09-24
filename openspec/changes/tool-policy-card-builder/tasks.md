# Tasks

Worktree `D:/Documents/aige-wt/w2-tool-policy-card`, rama `wt/w2-tool-policy-card`. La build solo
se lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Datos y generadores

- [x] 1.1 Crear `site/src/data/policy-card.ts` con las seis plantillas curadas y la regla propia (enunciado, condición, efecto, puntos de aplicación, modo de fallo, obligaciones, patrón y parámetros).
- [x] 1.2 Escribir `site/public/toolkit/policy-card-core.js`: comprobación de valores, tarjeta (Markdown, YAML, JSON), módulo Rego con veredicto y pruebas, stub Cedar y pruebas, input de ejemplo, hook de CI, validador de esquema y estado en el enlace.

## 2. Página y cliente

- [x] 2.1 Crear `/toolkit/policy-card` sobre `ToolShell` con el formulario, la guía renderizada en el servidor y las fuentes numeradas.
- [x] 2.2 Escribir `site/public/toolkit/policy-card.js`: cambio de regla, validación con resumen y errores por campo, resultado con los nueve ficheros, copiar, descargar, todo en un Markdown, imprimir y estado en el enlace.
- [x] 2.3 Añadir la entrada `policy-card` (`live`) al final de `site/src/data/toolkit.ts`.

## 3. Muestras y verificación

- [x] 3.1 Escribir `site/scripts/policy-card-samples.mjs` y generar `site/public/templates/policy-cards/` con su README.
- [x] 3.2 Comprobar las muestras con los binarios oficiales de OPA 1.21.0 (`opa check --strict`, `opa test`) y cedar-policy-cli 4.13.0 (`cedar check-parse`, `cedar run-tests`), más 114 variantes adicionales y la relectura de todo el YAML.

## 4. Registros, pruebas y build

- [x] 4.1 Añadir el bloque de `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md` y las viñetas de `bok/CHANGELOG.md`.
- [x] 4.2 Escribir `site/tests/policy-card.spec.ts` (generadores y página).
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate tool-policy-card-builder --strict`.
- [x] 4.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-tool-policy-card.json`.

## 5. Notas de verificación

- `policy-card.spec.ts` se ejecutó con Playwright solo sobre este fichero (`PW_PORT=4391`, dos workers): 16 de 17 pasaron; la prueba sin JavaScript encontró visible el botón «Build the card» porque `display: flex` de `.tool-buttons` (toolkit.css compartido) gana a `[hidden]`. Se corrigió en la página con una regla acotada y se repitió la ejecución tras la build.
- OPA no estaba instalado: se usaron los binarios oficiales descargados en el directorio temporal, comprobados con su sha256. Tras el último cambio del generador se repitieron las muestras (idénticas byte a byte) y las 114 variantes: todas pasan `opa check --strict`, `opa test` y `cedar run-tests`.
