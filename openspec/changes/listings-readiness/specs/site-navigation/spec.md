## MODIFIED Requirements

### Requirement: Destinos de Reference y About
El grupo Reference SHALL enlazar Frameworks, Crosswalk, Harms atlas, Incidents, Research, Contracts,
Templates & schemas, Tools, Glossary y Reading list, cada uno con una descripción de una línea (≤ 90
caracteres). La entrada Incidents SHALL enlazar `/cases` (la etiqueta cambia, el URL no) y la entrada
Research SHALL ir justo después y enlazar `/research`. El grupo About SHALL enlazar Changelog,
Contributors, Methodology, Independence (`/about/independence`), Contribute (`/contribute`) y
Privacy (`/privacy`), y los enlaces del proyecto del footer SHALL incluir Contribute. Privacy SHALL
aparecer en el pie y MAY omitirse del menú de cabecera. Las descripciones MUST NOT contener "Body of
Knowledge". El modelo MUST NOT añadir grupos nuevos para estos destinos.

#### Scenario: Recursos nuevos en el menú
- **WHEN** el usuario abre Reference
- **THEN** encuentra enlaces a `/resources/harms`, `/cases`, `/research`, `/resources/contracts` y
  `/resources/templates`

#### Scenario: Etiqueta Incidents
- **WHEN** se ejecuta `site/tests/incident-notes.spec.ts`
- **THEN** la entrada de Reference que enlaza `/cases` se llama "Incidents" y el footer no contiene
  el texto de enlace "Cases"

#### Scenario: Contribute en About
- **WHEN** el usuario abre About
- **THEN** encuentra un enlace a `/contribute` con su descripción de una línea

#### Scenario: Independencia y privacidad en About
- **WHEN** el usuario mira el grupo About del pie
- **THEN** encuentra enlaces a `/about/independence` y a `/privacy`, cada uno con su descripción de
  una línea
