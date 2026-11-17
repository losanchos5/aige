## ADDED Requirements

### Requirement: Marcos de seguridad de los labs vigilados

`tools/reg-monitor/sources.json` SHALL incluir, para Anthropic RSP, OpenAI Preparedness Framework y
Google DeepMind FSF, el documento vigente y, cuando sea accesible para el monitor, la página donde
el lab anuncia sus versiones. Un cambio en cualquiera de esas fuentes SHALL abrir una incidencia como
con el resto de fuentes. Cuando la página de anuncios de un lab no sea accesible para el monitor, la
entrada del documento SHALL decirlo en sus notas.

#### Scenario: Versión nueva anunciada

- **WHEN** la página de anuncios de un lab enlaza un documento nuevo
- **THEN** el monitor abre una incidencia `regulatory-change` para esa fuente con el extracto del
  cambio

#### Scenario: Edición silenciosa del mismo fichero

- **WHEN** cambian los bytes del PDF vigente sin que cambie su URL
- **THEN** el monitor abre una incidencia que indica que los bytes del PDF han cambiado

#### Scenario: Las fuentes se citan en el sitio

- **WHEN** se ejecuta `node tools/reg-monitor/monitor.mjs --check`
- **THEN** pasa, porque cada URL nueva aparece literalmente en un fichero versionado del sitio
