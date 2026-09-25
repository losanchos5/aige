# audience-hubs Specification

## Purpose
El sitio ofrece una ruta de entrada por audiencia: quien llega sabe en qué orden leer el sitio, qué
hacer esta semana y qué obligaciones le importan más, sin enlaces rotos ni fechas que se desvíen del
registro.

## Requirements

### Requirement: Registro de audiencias
El sitio SHALL declarar sus audiencias en un único fichero de datos
(`site/src/data/audiences.ts`) con, para cada una: id y slug iguales, etiquetas, título y
descripción meta (descripción de 50 a 160 caracteres, título de 45 como máximo), a quién va
dirigida con sus roles, exactamente tres preguntas con respuesta breve y enlace interno, una ruta en
fases, de tres a seis acciones "start this week", al menos cuatro obligaciones del registro, nodos
de inicio de `/path` y fuentes numeradas. Las audiencias SHALL ser engineers, ciso-risk, legal-dpo,
executives-board, public-sector y smes.

#### Scenario: Audiencia completa
- **WHEN** se añade una audiencia al fichero
- **THEN** la build falla si le falta alguno de los campos o no respeta los límites

### Requirement: Validación en build
La build MUST fallar cuando una audiencia enlaza un ancla de capítulo que no es un encabezado de ese
capítulo, un patrón, figura, caso o nodo de `/path` inexistente, una obligación que no está en el
registro, una plantilla que no existe en `/resources/templates`, o un href que no es una ruta
interna absoluta. Cada marcador `[n]` de una respuesta MUST tener su fuente y cada fuente MUST citarse
al menos una vez. Ningún texto de una audiencia MUST contener una raya (U+2014).

#### Scenario: Ancla rota
- **WHEN** una ruta enlaza `/bok/eu-ai-act#seccion-inexistente`
- **THEN** `astro build` falla nombrando la audiencia y el ancla

#### Scenario: Fuente sin citar
- **WHEN** una audiencia declara una fuente que ninguna respuesta cita
- **THEN** `astro build` falla nombrando la audiencia y el número de la fuente

### Requirement: Fechas leídas del registro
Las respuestas MUST NOT teclear fechas de aplicación. Un token `{date:<id>}` SHALL mostrarse como la
fecha `appliesFrom` de esa fila del registro y `{date:<id>|<texto>}` como la fecha del hito de esa
fila cuya nota contiene el texto, con el formato de prosa de la casa ("2 Dec 2027"). Un token que no
resuelve MUST hacer fallar la build.

#### Scenario: Cambio de fecha en el registro
- **WHEN** el registro cambia la fecha de aplicación de una fila citada por un token
- **THEN** el hub muestra la fecha nueva en la siguiente build sin editar `audiences.ts`

### Requirement: Herramientas en construcción
Un paso de ruta de tipo herramienta SHALL nombrar una herramienta de `site/src/data/toolkit.ts` o una
de la lista de herramientas en construcción, y SHALL mostrarse solo cuando el registro del toolkit la
marca `live`. Una herramienta que no está publicada MUST NOT generar un enlace.

#### Scenario: Herramienta aún no publicada
- **WHEN** una ruta nombra `ai-act-triage` y el toolkit no la lista como `live`
- **THEN** el hub omite ese paso, renumera los demás y no enlaza `/toolkit/ai-act-triage`

### Requirement: Páginas de audiencia
El sitio SHALL publicar `/for` y una página `/for/<slug>` por audiencia. Cada página SHALL mostrar,
en este orden, a quién va dirigida con sus nodos de inicio en `/path`, las tres preguntas con su
respuesta y enlace, la ruta numerada por fases, las acciones "start this week", las obligaciones con
su estado, fecha y artefacto leídos del registro y enlazadas a `/obligations/<id>`, el aviso
"Illustrative, not a claim of conformity", las fuentes y las demás rutas. Las páginas MUST NOT llevar
script propio y MUST emitir JSON-LD `WebPage` (o `CollectionPage` en el índice) con migas de pan.

#### Scenario: Índice
- **WHEN** se carga `/for`
- **THEN** enlaza las seis audiencias y, solo si su página existe en el repositorio, `/for/aigp` y
  `/for/certifications`

#### Scenario: Obligación en el hub
- **WHEN** se carga `/for/legal-dpo`
- **THEN** cada obligación enlaza su `/obligations/<id>` y muestra el estado y la fecha que tiene su
  fila en el registro
