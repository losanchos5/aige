# regulatory-monitor Specification

## Purpose
El monitor regulatorio convierte los cambios en las fuentes oficiales que cita el sitio en señales
revisables: cada día lee esas páginas, detecta cambios reales y abre o actualiza una incidencia con
el extracto del cambio y los ficheros afectados, sin publicar nada y sin escribir en `main`.

## Requirements

### Requirement: Fuentes vigiladas que el sitio cita
El monitor SHALL leer sus fuentes de `tools/reg-monitor/sources.json`, donde cada entrada tiene
`id`, `name`, `url` (https), `jurisdiction`, `category` y, opcionalmente, `transport`, `hints` y
`notes`. Cada `url` MUST aparecer tal cual en al menos un fichero versionado del repositorio fuera
de `tools/reg-monitor/`, y una clave o pista desconocida, un selector no soportado o una expresión
regular inválida MUST hacer fallar la validación.

#### Scenario: URL que nadie cita
- **WHEN** se añade a `sources.json` una URL que no aparece en ningún capítulo ni módulo de datos
- **THEN** `node tools/reg-monitor/monitor.mjs --check` y la suite de pruebas fallan nombrando la
  fuente

#### Scenario: Pista mal escrita
- **WHEN** una fuente declara `"selct"` en lugar de `"select"` o un selector con combinador
- **THEN** la validación falla indicando la fuente y la clave o el selector

### Requirement: Captura cortés
El monitor SHALL identificarse con un User-Agent que nombra el sitio y el directorio del monitor,
MUST iniciar como mucho una petición por segundo en toda la ejecución, SHALL aplicar un tiempo
límite por intento y MUST reintentar como mucho dos veces, con espera exponencial y respetando
`Retry-After`, solo ante errores de red, tiempos agotados y HTTP 408, 425, 429, 500, 502, 503 y 504.
Un PDF ya conocido SHALL pedirse con `If-None-Match` e `If-Modified-Since`.

#### Scenario: Servidor saturado
- **WHEN** una fuente responde 503 con `Retry-After: 7` y después 200
- **THEN** el monitor espera siete segundos, reintenta y usa la respuesta 200

#### Scenario: Página retirada
- **WHEN** una fuente responde 404
- **THEN** no hay reintento y la ejecución cuenta un fallo para esa fuente

### Requirement: Normalización estable
El HTML SHALL reducirse al texto de los elementos que nombra la pista `select` de la fuente, sin
scripts, estilos, `noscript`, SVG, iframes ni avisos de cookies o consentimiento; si el selector ya
no coincide, SHALL leerse el cuerpo sin navegación, cabeceras, pies, formularios ni botones, y la
incidencia MUST avisarlo. Las fechas-hora ISO, las horas, las edades relativas y los tokens de 32 o
más letras y cifras MUST sustituirse por marcadores; las fechas de calendario MUST conservarse. Un
PDF SHALL compararse por el SHA-256 de sus bytes. Un desafío antibots o un texto más corto que
`minChars` MUST contar como fallo, no como cambio.

#### Scenario: Solo cambia el ruido
- **WHEN** dos capturas de la misma página difieren solo en un nonce, una hora de generación y un
  script
- **THEN** el hash normalizado es el mismo y no se abre ninguna incidencia

#### Scenario: Página intermedia de Cloudflare o AWS WAF
- **WHEN** EUR-Lex devuelve la página de desafío de AWS WAF en lugar del texto
- **THEN** la fuente cuenta un fallo y su estado anterior se conserva

### Requirement: Aviso por incidencia, nunca publicación
Ante un cambio, el monitor SHALL abrir una incidencia con la etiqueta `regulatory-change` (creada
si falta) que contiene un marcador oculto con el `id` de la fuente, la URL, los hashes, un diff
unificado del texto normalizado truncado y dentro de un bloque de código más largo que cualquier
secuencia de acentos graves del contenido, y la lista de ficheros que citan la URL. Si hay una
incidencia abierta con el mismo marcador, MUST añadir un comentario en lugar de abrir otra. El
monitor MUST NOT modificar ni desplegar el sitio. Tras tres ejecuciones fallidas seguidas SHALL
avisar una sola vez de que la fuente no es accesible. Más de 10 cambios en una ejecución MUST
posponerse a la siguiente.

#### Scenario: Primer cambio de una fuente
- **WHEN** cambia el texto normalizado de una fuente sin incidencia abierta
- **THEN** se abre una incidencia titulada "Regulatory change: <nombre>" con el diff y los ficheros
  que citan la URL enlazados a la línea

#### Scenario: Segundo cambio con la incidencia abierta
- **WHEN** la misma fuente vuelve a cambiar y su incidencia sigue abierta
- **THEN** el monitor comenta en esa incidencia y no abre otra

#### Scenario: GitHub rechaza la llamada
- **WHEN** falla la creación de la incidencia
- **THEN** la ejecución termina con error y el estado de esa fuente no se actualiza, de modo que la
  siguiente ejecución vuelve a avisar

### Requirement: Estado fuera de main
El estado (hash, primera observación, contador de fallos y último texto normalizado de cada fuente
HTML) SHALL guardarse en la rama huérfana `reg-monitor-state`, escrita por el workflow con su
`GITHUB_TOKEN`, y MUST NOT confirmarse en `main`. La primera observación de una fuente, un cambio de
URL o de pistas y una nueva versión del normalizador MUST solo fijar la línea base, sin incidencia.
Un día sin cambios MUST NOT producir commit.

#### Scenario: Primera ejecución
- **WHEN** el workflow corre por primera vez y la rama no existe
- **THEN** crea la rama huérfana, guarda la línea base de cada fuente y no abre incidencias

#### Scenario: Ajuste de una pista
- **WHEN** se cambia la pista `select` de una fuente
- **THEN** la siguiente ejecución la marca como "rebaselined" y no abre incidencia

### Requirement: Workflow programado y acotado
`.github/workflows/reg-monitor.yml` SHALL ejecutarse a diario a las 06:17 UTC y con
`workflow_dispatch`, cuya entrada `dry_run` MUST estar marcada por defecto; una ejecución en seco
MUST NOT escribir estado ni llamar a la API de GitHub. Los permisos por defecto MUST ser vacíos.
El job `monitor`, que descarga y analiza las páginas de terceros, SHALL recibir solo
`contents: read` e `issues: write`, y su checkout MUST NOT dejar el token en la configuración de
git (`persist-credentials: false`); entrega el estado como artefacto. Solo el job `save-state`
SHALL recibir `contents: write`, y MUST limitarse a publicar ese estado en la rama de estado. Cada
acción MUST fijarse por SHA completo; el job `monitor` SHALL tener `timeout-minutes: 15`; el
workflow SHALL tener un grupo de concurrencia y sus jobs SHALL ejecutarse solo en
`losanchos5/aige`. Las entradas MUST llegar al script por variables de entorno.

#### Scenario: Ejecución manual por defecto
- **WHEN** alguien lanza el workflow desde la pestaña Actions sin tocar las entradas
- **THEN** el monitor imprime lo que haría, sin estado nuevo ni incidencias

#### Scenario: Token de escritura lejos de las páginas
- **WHEN** el paso que analiza las páginas se ejecuta
- **THEN** su token no puede escribir en el repositorio; solo `save-state` publica la rama de estado

#### Scenario: Acción sin fijar
- **WHEN** un cambio del workflow usa una acción por etiqueta en lugar de SHA
- **THEN** la prueba `workflow.test.mjs` falla
