# Tasks

## 1. Paquete y contrato

- [x] 1.1 `tools/i18n/package.json` con su `package-lock.json` (Node 22, `type: module`, dependencia
  única `@anthropic-ai/sdk` ^0.128.0, verificada en npm) y el SDK importado solo en los modos que
  llaman a la API, para que `--mock`, `--estimate` y `--dry-run` funcionen sin instalar nada
- [x] 1.2 Descubrimiento de fuentes (`bok/00..23`, `bok/patterns/*.md`, `THESIS.md`,
  `site/src/i18n/ui.en.json` si existe) y rutas de destino del contrato; `I18N_DIR`, `I18N_UI_DIR`
  (por defecto `<I18N_DIR>/ui` cuando `I18N_DIR` está fijado) e `I18N_SOURCE_ROOT` para pruebas
- [x] 1.3 Frontmatter plano: lectura, escritura, campos del contrato (`lang`, `source`, `sourceHash`,
  `translatedBy`, `translatedAt`) seguidos de los del origen, con solo `title` y `summary` traducibles

## 2. Segmentación y protección

- [x] 2.1 Parser de bloques por líneas (títulos, párrafos, listas anidadas, citas y callouts, tablas,
  código, HTML, separadores) que reconstruye byte a byte los 58 ficheros reales y rechaza títulos
  setext y saltos duros con el número de línea
- [x] 2.2 Sección `## Sources` completa como bloque literal; etiquetas de callout y `**Maps to:**`
  fuera del texto traducible, localizadas solo si `site/src/i18n/callouts.json` las asigna
- [x] 2.3 Marcadores `{n}` para código en línea, URL y destinos de enlace, `[n]`, HTML, autoenlaces,
  entidades, escapes y `{n}` literales; ida y vuelta verificada en cada segmento real
- [x] 2.4 Reenvolver la prosa traducida a unos 100 caracteres sin cortar negritas, enlaces ni código
  y sin abrir otro bloque; comprobación de la firma de estructura antes de escribir cada fichero
- [x] 2.5 Agrupar los segmentos pendientes, sin duplicados, en peticiones de unos 3.000 tokens de
  origen

## 3. Traducción

- [x] 3.1 Prompt de sistema fijo con el registro, las variantes es-ES, fr-FR, de-DE y pt-PT, la
  prohibición de la raya y el bloqueo de glosario completo (unos 5.600 tokens, por encima del mínimo
  de caché de Haiku 4.5); mensaje de usuario con el idioma y los segmentos en JSON; salidas
  estructuradas `{segments: [{id, t}]}`
- [x] 3.2 Modo `--sync` (Messages API, concurrencia 4) con reserva del peor caso y liquidación con el
  `usage` real; errores fatales de la API detienen la ejecución
- [x] 3.3 Modo `--batch`: creación, id guardado en `i18n/.tm/pending-batches.json` antes de esperar,
  consulta, aplicación de resultados, reanudación y sin reenvío de lo pendiente; lote recortado al
  tope
- [x] 3.4 Modo `--mock` determinista (glosario aplicado, nombres bloqueados, vocales acentuadas) que
  exige `I18N_DIR`
- [x] 3.5 Validación por segmento, un reintento en peticiones más pequeñas y segmento inglés con
  registro si vuelve a fallar; postproceso que elimina la raya
- [x] 3.6 Memoria `i18n/.tm/<lang>.jsonl` por hash de segmento, omisión por `sourceHash` y ficheros
  con segmentos pendientes sin escribir
- [x] 3.7 `--estimate` con la aproximación documentada (3,5 caracteres por token, expansión 1,4 a
  1,5) y el peor caso; `--dry-run`, `--langs`, `--only`, `--max-usd` (por defecto 1), `--model`,
  `--report` y `--summary`

## 4. Glosario y documentación

- [x] 4.1 `i18n/glossary-lock.json`: 33 patrones, cinco capas, nombres propios e identificadores sin
  traducir; términos del Reglamento (UE) 2024/1689 y del RGPD leídos en las versiones inglesa,
  española, francesa, alemana y portuguesa de Cellar el 2026-09-25; títulos oficiales de otros actos
  de la UE; elección de "Reglamento de IA" y de pt-PT documentada
- [x] 4.2 `i18n/README.md`, `i18n/.tm/` vacía y `tools/i18n/README.md` (uso, coste, tope, primera
  pasada completa, terminología, límites)

## 5. Workflow

- [x] 5.1 `.github/workflows/i18n.yml`: `workflow_dispatch` (langs, mode, max_usd `1.00`) y `push` a
  `main` sobre las fuentes inglesas (sync, `0.50`); permisos `contents: write` y
  `pull-requests: write` en el job; acciones fijadas por SHA; concurrencia; pruebas antes de gastar;
  rama `i18n/auto-<run id>` y pull request con el resumen; reanudación sobre la misma rama

## 6. Verificación

- [x] 6.1 `npm test` en `tools/i18n` (sin red, 47 pruebas): ida y vuelta del parser, oráculo mdast
  sobre los 58 ficheros, marcadores, validación, glosario, mock de extremo a extremo en un `I18N_DIR`
  temporal, edición incremental, tope con cliente falso, reintento y reserva, reanudación de batch, el
  SDK oficial contra un `fetch` falso (forma de las peticiones, resultados JSONL, error de
  autenticación), workflow, CLI y ausencia de raya
- [x] 6.2 `--estimate` sobre el contenido real (491 peticiones; 8,46 USD en batch sin caché, 7,25 con
  caché en el mejor caso, peor caso 11,43; 16,92 USD por la Messages API)
- [x] 6.3 `openspec validate i18n-translation-pipeline --strict`

## 7. Integración con el sitio

- [x] 7.1 La comprobación de estructura relee la salida con las etiquetas de callout y de "Maps to"
  que el renderizado localizó (`localizedLabels`, opción `labels` de `parseMarkdown`); antes, con
  `callouts.json` presente, 55 ficheros por idioma fallaban ("1p:L became 1p"). Pruebas de regresión
  con etiquetas traducidas y con `callouts.json` real en el mock de extremo a extremo
- [x] 7.2 El CLI sale con 1 cuando la ejecución informa de un error (tras escribir lo que pasó, el
  informe y el resumen)
- [x] 7.3 Pasada mock completa (es 57 ficheros, fr/de/pt 58, más `ui.<lang>.json` en `<I18N_DIR>/ui`)
  sin errores; la segunda pasada no escribe nada ni hace peticiones. `--estimate`: 494 peticiones;
  8,49 USD en batch sin caché, 7,26 con caché en el mejor caso, peor caso 11,46
