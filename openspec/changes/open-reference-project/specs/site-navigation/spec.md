# Spec Delta

## MODIFIED Requirements

### Requirement: Destinos de Reference y About
El grupo Reference SHALL enlazar Frameworks, Crosswalk, Harms atlas, Incidents, Research, Contracts,
Templates & schemas, Tools, Glossary y Reading list, cada uno con una descripción de una línea (≤ 90
caracteres). La entrada Incidents SHALL enlazar `/cases` (la etiqueta cambia, el URL no) y la entrada
Research SHALL ir justo después y enlazar `/research`. El grupo About SHALL enlazar Changelog,
Contributors, Methodology y Contribute (`/contribute`), y los enlaces del proyecto del footer SHALL
incluir Contribute. Las descripciones MUST NOT contener "Body of Knowledge". El modelo MUST NOT añadir
grupos nuevos para estos destinos.

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

## ADDED Requirements

### Requirement: Destinos del proyecto abierto en Practice y For you
El grupo Practice SHALL enlazar Controls (`/controls`) justo después de Patterns, y el grupo For you
SHALL enlazar Frontier labs & evaluators (`/frontier`) justo después de SMEs and start-ups, cada uno
con una descripción de una línea (≤ 90 caracteres). Las descripciones y pistas de los grupos
Practice, For you, Reference y About SHALL nombrar los destinos nuevos, y los feeds del footer SHALL
incluir `/api/v1/controls.json` con el evento de descarga. Las páginas de perfil
(`/controls/<perfil>`) y de nota (`/research/<slug>`) SHALL tratarse como páginas de detalle de su
colección: MUST estar enlazadas desde `/controls` o `/research`, que a su vez están en el footer.

#### Scenario: Controles en Practice
- **WHEN** el usuario abre Practice
- **THEN** "Controls" aparece tras "Patterns" y enlaza `/controls`

#### Scenario: Frontier en For you
- **WHEN** se ejecuta `site/tests/orp-shell.spec.ts`
- **THEN** el grupo For you contiene `/frontier`

#### Scenario: Detalle de una colección nueva
- **WHEN** se construye `/controls/agent-runtime`
- **THEN** `site/tests/nav.spec.ts` no exige su enlace en el footer, pero falla si `/controls` no lo
  enlaza desde `<main>`
