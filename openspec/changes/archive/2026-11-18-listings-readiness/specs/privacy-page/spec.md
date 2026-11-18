## ADDED Requirements

### Requirement: Página de privacidad escrita desde el código

El sitio SHALL publicar `/privacy` con quién responde de los datos y cómo contactarle, y con una
relación de cada dato que se recoge: qué es, quién lo recibe, para qué sirve y cuánto se conserva.
La página SHALL cubrir la analítica propia (Umami), la analítica de Cloudflare, el alojamiento, el
boletín, el almacenamiento en el navegador, el servidor MCP, el correo y GitHub. La página MUST
decir que el sitio no pone cookies, no muestra publicidad, no vende datos y no construye perfiles,
y MUST NOT afirmar nada que el código o la documentación del proveedor no respalden. La página
SHALL llevar la fecha de su última revisión.

#### Scenario: Visitante que quiere saber qué se mide

- **WHEN** alguien abre `/privacy`
- **THEN** encuentra qué registra la analítica, que no usa cookies ni guarda la cadena de consulta
  ni el fragmento de la dirección, y a qué servidor se envía

#### Scenario: Suscriptor del boletín

- **WHEN** alguien lee la parte del boletín
- **THEN** sabe que su dirección va directamente a Buttondown, que el sitio no la recibe y cómo
  darse de baja

#### Scenario: Usuario del servidor MCP

- **WHEN** alguien lee la parte del servidor MCP
- **THEN** encuentra los mismos campos de registro que documenta `tools/mcp-server/README.md` y que
  la dirección, el agente de usuario y lo que se pregunta no se guardan

#### Scenario: Datos que no salen del navegador

- **WHEN** alguien lee la parte de almacenamiento
- **THEN** sabe qué guarda el navegador (tema, progreso de lectura, borradores de las
  herramientas), que no se envía a ningún servidor y cómo borrarlo

### Requirement: Terceros declarados

Cada host externo que la política de seguridad de contenido del sitio permite, en cualquier
directiva, MUST aparecer nombrado en `/privacy`.

#### Scenario: Tercero nuevo sin declarar

- **WHEN** se añade un host externo a la política de seguridad de contenido de
  `site/public/_headers` y la página no lo nombra
- **THEN** la suite de pruebas falla

### Requirement: Página localizable

`/privacy` SHALL estar enlazada desde el pie de todas las páginas y desde la página `/mcp`, y SHALL
figurar en `llms.txt`.

#### Scenario: Enlace desde el pie

- **WHEN** se carga cualquier página del sitio
- **THEN** el pie contiene un enlace a `/privacy`
