## ADDED Requirements

### Requirement: Correspondencia de roles para cada fila de la UE y GPAI
El sitio SHALL mantener en `site/src/data/obligations-planner.ts` los siete roles del Act
(proveedor, responsable del despliegue, importador, distribuidor, representante autorizado,
proveedor de GPAI y proveedor de GPAI con riesgo sistémico), cada uno con un código de dos letras
estable, y una correspondencia de cada fila `eu-ai-act` y `gpai-code-of-practice` del registro con
los roles a los que vincula, con la condición del Act donde un deber solo alcanza a parte de un rol.
La build MUST fallar si una de esas filas no tiene correspondencia o si la correspondencia nombra una
fila que no existe. El planificador MUST NOT declarar fechas propias: las toma de `appliesFrom` y
`milestones` de cada fila.

#### Scenario: Fila nueva sin correspondencia
- **WHEN** se añade una fila del AI Act a `frameworks.ts` sin entrada en `plannerDuties`
- **THEN** `plannerRows()` lanza un error y la build de `/toolkit/obligations-planner` falla

#### Scenario: Fecha por clase
- **WHEN** una fila de alto riesgo tiene `appliesFrom` 2027-12-02 y un hito 2028-08-02 limitado a
  `high-risk-annex-i`
- **THEN** la fila empieza el 2027-12-02 para Anexo III y el 2028-08-02 para Anexo I, y un hito que
  afecta a todas las clases de la fila (las nuevas prohibiciones del Art. 5) sigue siendo un paso
  posterior

### Requirement: Plan filtrado por roles, clases y fecha de referencia
`/toolkit/obligations-planner` SHALL renderizarse dentro de `ToolShell` con el aviso fijo del
toolkit y, junto al resultado, el aviso "A reading aid, not legal advice. Mappings are illustrative,
not a claim of conformity." y la fecha de revisión del registro. Una fila SHALL vincular al lector
cuando uno de sus roles está marcado y el sistema lleva una de sus clases (las clases base
`all-ai-systems` y `prohibited` siempre; las clases GPAI por los roles GPAI). Para cada fila el
resultado MUST mostrar el artefacto, la capa, la fecha para las clases marcadas, el estado en la
fecha de referencia calculado a partir de esa fecha, las condiciones del rol, los patrones enlazados
a `/patterns/<slug>` y un enlace a `/obligations/<id>`, en orden de fecha, más una línea de tiempo en
SVG en línea con "As of" y una tabla con las mismas fechas. Los deberes de los Arts. 22, 23, 24 y 54
MUST aparecer aparte, como fuera del registro, con su enlace al texto consolidado en EUR-Lex.

#### Scenario: Proveedor y responsable del despliegue de un sistema del Anexo III
- **WHEN** el lector marca proveedor, responsable del despliegue y Anexo III con fecha 2026-09-24
- **THEN** ve, entre otras, `AIGE-OBL-EUAIA-ART4` como "Applies" y `AIGE-OBL-EUAIA-ART9` como
  "Applies from 2027-12-02 (in 434 days)", con `AIGE-OBL-EUAIA-ART27` y su condición del Art. 27(1)

#### Scenario: Importador sin clase de alto riesgo
- **WHEN** el lector marca solo importador y ninguna clase
- **THEN** el resumen dice que ninguna fila del registro vincula esa combinación y no aparece ningún
  deber fuera del registro

#### Scenario: Sin JavaScript
- **WHEN** se abre la página con JavaScript desactivado
- **THEN** se leen el aviso, los roles y clases, la tabla de las 27 filas con sus roles, clases,
  fechas y estados, los deberes fuera del registro y cómo hacerlo a mano, sin botones inertes

### Requirement: Estado en el enlace y exportaciones
El estado SHALL viajar en el fragmento de la URL (`v`, `r`, `c`, `d`, con los códigos de dos
letras) y ningún script MUST hacer peticiones de red con lo que introduce el lector. La herramienta
SHALL exportar una lista de comprobación Markdown con los dos avisos y el enlace del plan, un CSV
(RFC 4180), un JSON con el sobre de `/api/v1/*` (`notice`, `version`, `license`, `licenseUrl`,
`schemaVersion`, `schema`, `self`, `source`, `citation`) más `kind: "aige.obligations-plan"`, cuyas
obligaciones son el registro de la API más un objeto `plan`, y que MUST validar contra
`/toolkit/obligations-plan.v1.schema.json`; y un `.ics` (RFC 5545) con un evento de día completo
por fecha del plan y un `UID` estable para la misma fecha y las mismas respuestas.

#### Scenario: Enlace compartido
- **WHEN** se abre `/toolkit/obligations-planner#v=1&r=im&c=h3`
- **THEN** la página marca importador y Anexo III, muestra el Art. 25 con su condición y el Art. 23
  fuera del registro

#### Scenario: JSON válido
- **WHEN** se descarga el JSON de un plan
- **THEN** valida contra el esquema publicado y cada obligación, sin `plan`, es igual a su registro
  en `/api/v1/obligations.json`

#### Scenario: Calendario
- **WHEN** se descarga el `.ics`
- **THEN** tiene un `VEVENT` por fecha del plan, con `DTSTART;VALUE=DATE` y un `DTEND` exclusivo, y
  ninguna línea supera 75 octetos
