# Proposal

## Why

La versión 0.5.0 abre el sitio a cuatro idiomas además del inglés (es, fr, de, pt). El libro son 24
capítulos, 33 patrones y la Tesis (unos 1,8 MB de Markdown), demasiado para traducirlo a mano y
mantenerlo al día cada vez que cambia el inglés. Hace falta una canalización de traducción automática
que respete la estructura del libro (citas `[n]`, enlaces, código, la sección de fuentes), la
terminología legal oficial de la UE y el presupuesto del propietario (unos 18 USD en la cuenta), y
que después de la primera pasada solo pague por los segmentos que cambian.

## What Changes

- Nuevo paquete `tools/i18n/` (Node 22, dependencia única `@anthropic-ai/sdk`): `translate.mjs` con
  los modos `--estimate`, `--mock`, `--sync` (Messages API) y `--batch` (Message Batches API), las
  opciones `--langs`, `--only`, `--max-usd` (tope duro), `--dry-run` y `--model` (por defecto
  `claude-haiku-4-5-20251001`).
- Segmentación propia por bloques de Markdown (títulos, párrafos, elementos de lista, celdas de
  tabla, citas y callouts) con marcadores de posición para el código, las URL y destinos de enlace,
  los marcadores `[n]`, el HTML y la sección `## Sources` completa, que se copia sin traducir.
- Validación de cada segmento traducido (marcadores completos, mismo número de `[n]` y de `**`, sin
  raya, no vacío, no idéntico al inglés salvo que no haya nada que traducir), un reintento y, si
  vuelve a fallar, el segmento inglés con registro en el informe.
- Memoria de traducción `i18n/.tm/<lang>.jsonl` por hash de segmento y omisión de los ficheros cuyo
  `sourceHash` coincide: una segunda pasada tras editar el inglés solo paga lo que cambió.
- Bloqueo de glosario `i18n/glossary-lock.json`: nombres que no se traducen (patrones, las cinco
  capas del stack, organizaciones, normas, herramientas) y equivalentes fijos verificados contra las
  versiones lingüísticas oficiales del Reglamento (UE) 2024/1689 y del RGPD en EUR-Lex/Cellar.
- `i18n/README.md` con la estructura de la carpeta; las carpetas `i18n/<lang>/` quedan vacías en esta
  entrega (el inglés aún puede cambiar).
- Workflow `.github/workflows/i18n.yml`: `workflow_dispatch` (idiomas, modo, tope) y `push` a `main`
  sobre las fuentes inglesas (sync, 0,50 USD); abre un pull request desde `i18n/auto-<run id>` y
  nunca empuja a `main`.
- Documentación en `tools/i18n/README.md`, con el coste estimado y cómo lanzar la primera pasada
  completa.

Sin cambios **BREAKING**: no se toca el sitio ni el contenido inglés; la Tesis española sigue siendo
la traducción manual `THESIS.es.md`.

## Capabilities

### New Capabilities
- `i18n-translation-pipeline`: la canalización de traducción automática (segmentación, protección,
  validación, memoria, tope de gasto, modos batch y sync, mock para fixtures), el bloqueo de glosario
  y el workflow que la ejecuta en GitHub Actions.

### Modified Capabilities
- Ninguna.

## Impact

- Código: `tools/i18n/` (nuevo, con su `package.json` y `package-lock.json`),
  `.github/workflows/i18n.yml` (nuevo).
- Datos: `i18n/glossary-lock.json`, `i18n/README.md`, `i18n/.tm/` (vacía).
- Contrato con el bloque del sitio: rutas `i18n/<lang>/...`, frontmatter, `site/src/i18n/ui.<lang>.json`
  a partir de `ui.en.json`, etiquetas de callout desde `site/src/i18n/callouts.json`, fixtures con
  `--mock` en un `I18N_DIR` temporal.
- Coste: la pasada completa estimada es de unos 7 a 8,5 USD en batch con Haiku 4.5 (peor caso acotado
  en 11,43 USD, por debajo de un tope de 12); las pasadas incrementales cuestan céntimos.
- Operación: el propietario añade el secreto `ANTHROPIC_API_KEY` y permite que GitHub Actions cree
  pull requests.
