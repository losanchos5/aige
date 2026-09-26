# Spec Delta

## Purpose

La ruta `/frontier` orienta a quien evalúa, despliega o asegura sistemas frontier: dónde aplican los
controles, patrones y formatos de evidencia del sitio a su trabajo y dónde están las preguntas
abiertas, como una ruta de audiencia más y no como un eje nuevo del sitio.

## ADDED Requirements

### Requirement: Página de audiencia frontier
El sitio SHALL publicar `/frontier` con la plantilla de las rutas de audiencia (layout Marketing,
migas For you, Frontier labs & evaluators), H1 "Engineering assurance for frontier AI" y las
secciones, en este orden, `who`, `evaluation-environments`, `runtime-safeguards`, `assurance`,
`incidents`, `ecosystem`, `stack-map`, `open-questions` y `sources`, seguidas de una banda final hacia
`/controls/evaluation-environment` y `/for`. `/for` SHALL listar la entrada "Frontier labs &
evaluators" entre sus otras rutas. La página SHALL decir lo que no es: no le dice a un lab cómo hacer
investigación de seguridad.

#### Scenario: Orden de las secciones
- **WHEN** se ejecuta `site/tests/frontier.spec.ts`
- **THEN** la página tiene un H1 y las secciones aparecen con esos ids y en ese orden

### Requirement: Cadena de siete nodos
La sección `who` SHALL incluir un `FlowDiagram` con id `frontier-chain` y siete pasos (Model / agent,
Harness & tools, Authorization, Runtime controls, Monitoring, Evidence, Assurance), cada uno enlazado
a su sección, capítulo o patrón. El diagrama MUST ser una lista ordenada con `aria-label`, sin JS ni
animación, en fila a partir de 1000 px y en columna por debajo, con etiquetas de al menos 16 px a
390 px y sin scroll horizontal.

#### Scenario: Fila y columna
- **WHEN** se abre `/frontier` a 1440 px y a 390 px
- **THEN** hay siete `.flow-step` dentro de un `ol[aria-label]`, en fila a 1440 px y en columna a
  390 px, y el ancho de scroll es igual al del viewport

### Requirement: Afirmaciones con fuente y sin nombres de labs
Cada afirmación normativa o fáctica de `/frontier` SHALL llevar un marcador `[n]` enlazado a una
fuente de su lista, y cada fuente SHALL citarse al menos una vez. La página MUST NOT nombrar a ningún
lab frontier ni sugerir respaldo de ningún lab u organismo; la sección `ecosystem` SHALL describir
certificaciones y esquemas existentes con hechos públicos, con nota de no afiliación y sin
comparativas. Las fuentes de METR, si se usan, SHALL atribuirse ("METR states") sin logos ni figuras.
La página MUST NOT contener una raya (U+2014).

#### Scenario: Ningún lab nombrado
- **WHEN** se ejecuta `site/tests/frontier.spec.ts`
- **THEN** el texto no coincide con `/OpenAI|Anthropic|DeepMind|Google|Meta|xAI/` y cada `a.cite`
  tiene su elemento en la lista de fuentes

### Requirement: Enlaces densos hacia el sitio
`/frontier` SHALL enlazar el perfil de entorno de evaluación, el perfil Agent Runtime, los patrones
de identidad y credenciales, guardrail en runtime, kill switch, eval gate, red team, evidencia legible
por máquina y telemetría continua, `/cases`, `/bok/incidents`, `/resources/threats`,
`/resources/data`, `/api/v1/index.json`, `/mcp` y las cinco capas de `/bok/the-stack`, y SHALL
ofrecer `ContributeCta` de tipo `assumption`. Todo enlace MUST resolver en `check:links`.

#### Scenario: Enlaces clave
- **WHEN** se abre `/frontier`
- **THEN** la página enlaza `/controls/evaluation-environment`, `/controls/agent-runtime`, `/cases` y
  `/mcp`, y ofrece el formulario `technical-correction.yml`

### Requirement: Metadatos de la ruta frontier
`/frontier` MUST tener `<title>` "Frontier AI evaluation assurance" (con sufijo si cabe), una
descripción de 70 a 160 caracteres, un único ld+json `WebPage` con `audience` y migas, imagen OG
propia (`/og/frontier.png`), entrada en `SOURCE_BY_PATH`, en `llms.txt` (rutas por audiencia) y en la
configuración de lhci, sin script inline.

#### Scenario: Título comprobado
- **WHEN** se ejecuta `site/tests/seo-titles.spec.ts`
- **THEN** el título de `/frontier` empieza por "Frontier AI evaluation assurance" y es único
