# Spec Delta

## ADDED Requirements

### Requirement: Origen de fuente primaria para controles derivados
Un control `derived` MAY nombrar como origen una fuente primaria externa (una ley, una norma, un
código o un marco publicado por su emisor). Ese origen MUST apuntar a una entrada de las referencias
del propio control, con URL y fecha de lectura, y el control MUST NOT afirmar nada que esa fuente no
diga. Un control cuyo único origen es una fuente primaria SHALL mostrarse como "derivado de una
fuente primaria" y no como derivado de material del sitio. Una fuente secundaria (un blog, un
resumen de terceros) MUST NOT servir de origen.

#### Scenario: Origen que no resuelve
- **WHEN** un control nombra un origen de fuente primaria que no coincide con ninguna de sus
  referencias, o cuya referencia no tiene URL o fecha de lectura
- **THEN** el build falla y nombra el control

#### Scenario: Etiqueta correcta
- **WHEN** se abre un control cuyo único origen es una fuente primaria
- **THEN** su línea de estado dice que deriva de una fuente primaria y enlaza a ella

### Requirement: Fecha de revisión de los mapeos
Cada control MUST declarar la fecha (`YYYY-MM-DD`) en que se revisaron por última vez sus mapeos a
marcos y normas. La página del control y su JSON SHALL mostrar esa fecha.

#### Scenario: Control sin fecha de mapeo
- **WHEN** un control no declara la fecha de revisión de sus mapeos o la fecha no es válida
- **THEN** el build falla y nombra el control

### Requirement: Perfiles nuevos de la ampliación
El registro SHALL incorporar cinco perfiles nuevos, cada uno con prefijo de id propio, versión
`0.1`, estado `draft` y revisión `open`: `gpai-and-frontier-models` (prefijo `GPAI`),
`high-risk-provider` (prefijo `HRP`), `governance-programme` (prefijo `ORG`),
`transparency-rights-and-fairness` (prefijo `RIGHTS`) y `ai-security` (prefijo `SEC`). Cada control nuevo MUST ser `derived`, tener al menos un origen, una
evidencia, una pregunta abierta, familia primaria, `appliesTo`, y al menos un mapeo a un marco o
norma. Cada afirmación de un control nuevo MUST poder trazarse a una fuente primaria leída, con URL
y fecha. Tras los cinco perfiles, cada una de las 18 familias SHALL tener al menos tres controles.

#### Scenario: Perfil nuevo publicado
- **WHEN** se construye el sitio tras añadir un perfil nuevo
- **THEN** el perfil tiene su página, su twin Markdown, su entrada en `llms.txt` y en el sitemap,
  sus controles en la API y en OSCAL, y `controlProblems()` no devuelve nada

#### Scenario: Cobertura mínima por familia
- **WHEN** se han fusionado los cinco perfiles nuevos
- **THEN** ninguna familia tiene menos de tres controles

#### Scenario: Ids anteriores intactos
- **WHEN** se fusiona cualquier fase de la ampliación
- **THEN** los ids publicados antes de esa fase siguen existiendo con el mismo perfil

### Requirement: Recuentos derivados de los datos
Todo número de controles, perfiles o familias que el sitio, el README o `llms.txt` muestren SHALL
calcularse del registro en el build, o estar cubierto por una comprobación que falle cuando deje de
coincidir con el registro.

#### Scenario: Cifra desfasada
- **WHEN** un texto publicado da un número de controles distinto del que tiene el registro
- **THEN** el build o los tests fallan y señalan el fichero
