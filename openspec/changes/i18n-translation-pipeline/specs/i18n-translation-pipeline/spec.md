# Spec Delta

## Purpose

Una canalización (`tools/i18n/`) traduce automáticamente los capítulos, los patrones, la Tesis y las
cadenas de la interfaz del inglés al español, francés, alemán y portugués, conservando la estructura
de cada fichero, la terminología legal oficial de la UE y un tope de gasto, y solo paga por los
segmentos que no ha traducido antes. Un workflow de GitHub Actions la ejecuta y propone el resultado
en un pull request.

## ADDED Requirements

### Requirement: Fuentes, destinos y frontmatter

La canalización SHALL traducir `bok/00-*.md` a `bok/23-*.md` a `i18n/<lang>/bok/<chapter-id>.md`,
`bok/patterns/<slug>.md` a `i18n/<lang>/patterns/<slug>.md`, `THESIS.md` a `i18n/<lang>/THESIS.md`
solo para `fr`, `de` y `pt`, y `site/src/i18n/ui.en.json`, cuando exista, a
`site/src/i18n/ui.<lang>.json` con las mismas claves, para `<lang>` en `es`, `fr`, `de` y `pt`. Todo
fichero Markdown traducido MUST empezar con un frontmatter con `lang`, `source`, `sourceHash` (sha256
del fichero inglés con finales de línea LF), `translatedBy` (`machine: <modelo>`) y `translatedAt`,
seguido de los demás campos del frontmatter del origen, de los que solo `title` y `summary` se
traducen. La canalización MUST NOT escribir una Tesis española.

#### Scenario: Un patrón traducido
- **WHEN** se traduce `bok/patterns/agent-registry.md` al portugués
- **THEN** existe `i18n/pt/patterns/agent-registry.md` con `lang: pt`, `source`, `sourceHash`,
  `translatedBy` y `translatedAt`, y con `id`, `layer` y `order` iguales a los del inglés

#### Scenario: La Tesis española queda fuera
- **WHEN** se ejecuta una pasada completa para los cuatro idiomas
- **THEN** existen `i18n/fr/THESIS.md`, `i18n/de/THESIS.md` e `i18n/pt/THESIS.md`, no existe
  `i18n/es/THESIS.md` y `THESIS.es.md` no cambia

### Requirement: Estructura uno a uno y contenido protegido

Cada traducción SHALL conservar el mismo número y orden de títulos en todos los niveles, las mismas
formas de lista y de tabla, los mismos marcadores de cita `[n]` y los mismos enlaces y URL (texto del
enlace traducido, destino sin cambios). El código (bloques y en línea), las URL, el HTML y la sección
`## Sources` completa MUST quedar idénticos al inglés. Las etiquetas de callout y el encabezado
`**Maps to:**` SHALL quedarse en inglés salvo que `site/src/i18n/callouts.json` las asigne al idioma.
Ningún fichero traducido MUST contener la raya (U+2014). Un fichero cuya estructura renderizada
difiera de la del inglés MUST NOT escribirse.

#### Scenario: Sección de fuentes y código
- **WHEN** se traduce `bok/04-the-stack.md`
- **THEN** la sección `## Sources` y los bloques de código del fichero traducido son idénticos byte a
  byte a los del inglés, y el número de marcadores `[n]` coincide

#### Scenario: Etiqueta de callout sin asignar
- **WHEN** `site/src/i18n/callouts.json` no existe
- **THEN** los callouts traducidos siguen empezando por `**In practice**`, `**Anti-pattern**` o la
  etiqueta inglesa correspondiente

### Requirement: Validación de cada segmento con un reintento

Cada segmento traducido SHALL validarse antes de guardarse: todos los marcadores de posición
presentes una sola vez y ninguno añadido, los destinos de enlace dentro de `](...)`, el mismo número
de marcadores `[n]` y de `**`, sin raya, no vacío y no idéntico al inglés salvo que no haya nada que
traducir. Un segmento que no pase la validación MUST reintentarse una vez; si vuelve a fallar, el
fichero SHALL conservar el segmento inglés y el informe de la ejecución MUST registrarlo.

#### Scenario: Respuesta idéntica al inglés dos veces
- **WHEN** el modelo devuelve dos veces un segmento traducible idéntico al inglés
- **THEN** el segmento se pide exactamente dos veces, el fichero se escribe con el texto inglés en
  ese punto y el informe lista el segmento con el motivo

#### Scenario: Marcador perdido y corregido
- **WHEN** la primera respuesta pierde un marcador de posición y la segunda es válida
- **THEN** se guarda la segunda en la memoria y el informe no registra el segmento

### Requirement: Memoria de traducción y pasadas incrementales

Las traducciones validadas SHALL guardarse en `i18n/.tm/<lang>.jsonl`, una línea
`{h, t, model, at}` por segmento, con `h` el sha256 del segmento inglés. Una ejecución MUST reutilizar
los segmentos de la memoria sin pedirlos de nuevo y MUST omitir los ficheros cuyo `sourceHash`
coincide con el del inglés. Un fichero con segmentos aún sin traducir MUST NOT escribirse.

#### Scenario: Edición de un párrafo inglés
- **WHEN** tras una pasada completa se edita un párrafo de un capítulo y se vuelve a ejecutar
- **THEN** solo ese párrafo se envía a traducir, solo ese capítulo se reescribe y los demás ficheros
  se omiten por su `sourceHash`

### Requirement: Tope de gasto duro y estimación

La opción `--max-usd` SHALL ser un tope duro: antes de enviar cada petición la canalización MUST
sumar al gasto real acumulado y a lo reservado en vuelo el peor caso de esa petición (todo
`max_tokens` producido, el prompt entero como escritura de caché, entrada +15%) y MUST NOT enviarla si
la suma supera el tope. El gasto real SHALL calcularse con el `usage` de cada respuesta y mostrarse al
final. `--estimate` SHALL imprimir, por idioma y en total, los tokens y el coste estimado en USD para
Haiku 4.5 (1 / 5 USD por millón de tokens de entrada / salida) con y sin el descuento del 50% de
Message Batches y con y sin caché de prompt, sin llamar a la API ni escribir nada. El tope por
defecto SHALL ser 1 USD.

#### Scenario: El tope corta la ejecución
- **WHEN** una ejecución sync tiene un tope menor que el peor caso de todas sus peticiones
- **THEN** envía solo las que caben, el gasto real final no supera el tope, los ficheros afectados no
  se escriben y sus segmentos quedan para la siguiente ejecución

#### Scenario: Estimación sin clave
- **WHEN** se ejecuta `--estimate` sin `ANTHROPIC_API_KEY`
- **THEN** imprime la tabla por idioma y el peor caso, y no escribe ningún fichero

### Requirement: Modos batch, sync, mock y dry-run

`--batch` SHALL usar la Message Batches API: crear el lote, guardar su id en
`i18n/.tm/pending-batches.json` antes de esperar, consultar su estado, aplicar los resultados y
borrar el id. Una ejecución interrumpida MUST poder reanudarse: la siguiente ejecución recupera los
lotes pendientes antes de crear otro y MUST NOT reenviar los segmentos que ya lleva un lote
pendiente. `--sync` SHALL usar la Messages API. `--mock` SHALL producir una pseudotraducción
determinista sin red que pase la misma validación y MUST NOT escribir en el `i18n/` del repositorio
(exige `I18N_DIR`). `--dry-run` MUST NOT llamar a la API ni escribir ficheros. El modelo por defecto
SHALL ser `claude-haiku-4-5-20251001`.

#### Scenario: Reanudar un lote
- **WHEN** una ejecución batch termina con el lote aún en proceso y otra se lanza cuando ha terminado
- **THEN** la segunda aplica los resultados del lote guardado, no crea un lote nuevo para esos
  segmentos, borra `pending-batches.json` y escribe los ficheros

#### Scenario: Fixtures del sitio
- **WHEN** se ejecuta `--mock` con `I18N_DIR` apuntando a un directorio temporal
- **THEN** ese directorio recibe los ficheros de los cuatro idiomas con el frontmatter del contrato y
  el `i18n/` del repositorio no cambia

### Requirement: Prompt fijo y bloqueo de glosario

Todas las peticiones SHALL compartir un mismo prompt de sistema, apto para la caché de prompt, con el
registro profesional técnico, las variantes es-ES, fr-FR, de-DE y pt-PT, la prohibición de la raya y
el bloqueo de glosario de `i18n/glossary-lock.json` (`doNotTranslate` y `terms` con equivalentes en
es, fr, de y pt). El bloqueo MUST mantener en inglés los nombres de los patrones y de las cinco capas
del stack y MUST fijar la terminología del Reglamento (UE) 2024/1689 y del RGPD según sus versiones
lingüísticas oficiales en EUR-Lex.

#### Scenario: Terminología del Reglamento de IA
- **WHEN** se consulta el bloqueo para "deployer" y "high-risk AI system"
- **THEN** los equivalentes son "responsable del despliegue", "déployeur", "Betreiber" y
  "responsável pela implantação", y "sistema de IA de alto riesgo", "système d'IA à haut risque",
  "Hochrisiko-KI-System" y "sistema de IA de risco elevado"

### Requirement: Workflow de traducción

`.github/workflows/i18n.yml` SHALL ejecutarse por `workflow_dispatch` (entradas `langs`, `mode`
batch o sync y `max_usd` con valor por defecto `1.00`) y por `push` a `main` sobre `bok/**`,
`THESIS.md` y `site/src/i18n/ui.en.json` (modo sync, `max_usd` `0.50`). El job MUST tener solo los
permisos `contents: write` y `pull-requests: write`, acciones fijadas por SHA y un grupo de
concurrencia, y SHALL pasar las pruebas sin red antes de gastar. Si cambian ficheros, SHALL
confirmarlos en una rama nueva `i18n/auto-<run id>` y abrir un pull request con los idiomas, los
ficheros, los segmentos y el gasto real. El workflow MUST NOT empujar a `main` y su fallo MUST NOT
afectar a `deploy.yml`.

#### Scenario: Pasada completa manual
- **WHEN** el propietario lanza el workflow con `mode` = `batch` y `max_usd` = `12`
- **THEN** el job traduce con la Message Batches API sin superar 12 USD, empuja
  `i18n/auto-<run id>` y abre un pull request contra `main` con el resumen de la ejecución

#### Scenario: Edición del inglés en main
- **WHEN** un push a `main` modifica un capítulo
- **THEN** el workflow ejecuta una pasada sync con tope de 0,50 USD y, si hay cambios, abre un pull
  request sin tocar `main`
