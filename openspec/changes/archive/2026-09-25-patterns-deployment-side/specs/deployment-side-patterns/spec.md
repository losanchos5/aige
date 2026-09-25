# Spec Delta

## Purpose

El catálogo de patrones cubre el lado del despliegue y el uso con ocho patrones propios, cada uno con
su página, su diagrama, su artefacto ilustrativo y su trazabilidad a obligaciones, y los capítulos
que describen esas prácticas enlazan su patrón.

## ADDED Requirements

### Requirement: Ocho patrones del lado del despliegue
El catálogo SHALL incluir, como ficheros `bok/patterns/<slug>.md` con el contrato de frontmatter de
`patterns-as-pages`, los patrones `decision-notice-contest-path`, `rights-requests-against-models`,
`sanctioned-ai-gateway`, `staged-rollout-rollback-criteria`, `drift-fairness-monitor`,
`downstream-use-register`, `disclosure-notification-pipeline` y
`deactivation-localisation-retirement-runbook`, cada uno con su entrada en
`site/src/data/patterns.ts` y su sección `## Pattern: <Nombre>` en `bok/05-patterns.md` con enlace a
`/patterns/<slug>`. Cada fichero MUST seguir la plantilla de STYLEGUIDE §4, MUST llevar una
subsección `### Forces` bajo `## Problem` y MUST NOT contener el carácter U+2014.

#### Scenario: Página publicada
- **WHEN** se construye el sitio
- **THEN** existe `/patterns/<slug>` para cada uno de los ocho patrones, con el H1
  `Pattern: <Nombre>`, su lista de fuentes y su paginación en el orden del catálogo

#### Scenario: Catálogo sincronizado
- **WHEN** falta la sección `## Pattern: <Nombre>` de uno de los ocho patrones en el capítulo 05
- **THEN** la build falla en `src/lib/pattern-pages.ts` nombrando el patrón

### Requirement: Trazabilidad y fuentes
Cada uno de los ocho patrones SHALL terminar su cuerpo con una línea **Maps to** que nombre los
artículos del AI Act o de otra norma aplicable, los identificadores del Anexo A de ISO/IEC 42001, las
subcategorías del NIST AI RMF y, donde procedan, los identificadores OWASP, seguida de la capa o capas
del frontmatter y del aviso "Mappings are illustrative, not a claim of conformity". Cada afirmación
fechada o jurídica MUST llevar una cita `[n]` que resuelva en `## Sources`, con el Derecho de la UE
citado en EUR-Lex. El BoK público de AIGP MUST citarse solo por código de competencia, parafraseado y
con la nota de no afiliación con IAPP.

#### Scenario: Cita sin fila
- **WHEN** un patrón cita `[n]` sin fila `[n]` en su lista de fuentes
- **THEN** la build falla indicando el fichero y el número

### Requirement: Artefactos ligados a esquemas publicados
Donde el artefacto de un patrón coincide con un esquema de `site/public/schemas`, el ejemplo JSON
SHALL declarar su `$schema` y MUST validar contra ese esquema: el evento de decisión de la pasarela
(`evidence-record`), el plan de monitorización (`post-market-monitoring-plan`) y el registro de
retirada (`decommissioning-runbook`). Los demás artefactos SHALL marcarse como ilustrativos.

#### Scenario: Ejemplo que deja de validar
- **WHEN** se cambia un campo obligatorio de uno de los tres ejemplos ligados a esquema
- **THEN** la prueba `patterns-deployment-side.spec.ts` falla nombrando el patrón y el esquema

### Requirement: Un diagrama por patrón
Cada uno de los ocho patrones SHALL tener un IR archify en `site/diagrams/<slug>.<tipo>.json` que pase
`archify validate --quality showcase`, un fichero de notas `<slug>.notes.json` con una nota por nodo y
una entrada en `site/src/data/diagrams.ts` con `{ chapter: 'patterns', pattern: '<slug>', at: 'lead' }`,
de modo que la figura aparezca una vez en `/patterns/<slug>` antes del H2 "Objectives".

#### Scenario: Diagrama en su página
- **WHEN** se abre `/patterns/drift-fairness-monitor`
- **THEN** la figura `drift-fairness-monitor` aparece una vez y `/bok/patterns` no contiene ninguna
  `figure.diagram`

### Requirement: Enlaces desde los capítulos que describen la práctica
Las frases de los capítulos 11 a 23 que describen cada práctica SHALL enlazar la página del patrón
correspondiente, añadiendo solo el marcado del enlace, sin cambiar las palabras ni renombrar
encabezados H2 o H3.

#### Scenario: Registro de usos aguas abajo
- **WHEN** se lee la sección "Secondary use and downstream harm" de `/bok/governing-deployment`
- **THEN** el término "downstream use register" enlaza `/patterns/downstream-use-register`
