## MODIFIED Requirements

### Requirement: Superficie HTTP protegida y privada

El servidor SHALL responder `GET /healthz` sin consultar el origen y `GET /` con un documento de
descubrimiento. En `/mcp` SHALL aplicar CORS sin credenciales, un límite de cuerpo
(`MAX_BODY_BYTES`, `413` por encima) y un límite de tasa por cliente (`429` con `Retry-After`). En
todas las rutas salvo `/healthz` MUST rechazar con `403` un `Host` fuera de `ALLOWED_HOSTS`, y con
una lista `ALLOWED_ORIGINS` MUST rechazar con `403` un `Origin` fuera de ella. Los registros MUST
ser líneas JSON sin dirección IP, agente de usuario ni argumentos de herramienta. De las cabeceras
`Mcp-Method` y `Mcp-Name` el registro SHALL guardar el valor solo cuando es un método MCP conocido o
una herramienta del servidor, y `[other]` en otro caso. Del cuerpo de una
petición a `/mcp` el registro SHALL tomar solo tres cosas: el método JSON-RPC, cuando es uno de los
métodos MCP conocidos; el nombre de la herramienta de una llamada `tools/call`, cuando es una de las
herramientas del servidor; y el nombre y la versión que el cliente anuncia en `initialize`, cuando
son texto imprimible de 64 caracteres como máximo. El registro SHALL incluir la etiqueta opcional
`tag` de la URL cuando casa con `[a-z0-9-]{1,24}`. Un valor que no cumple su condición MUST
registrarse como `[other]`, y ningún otro campo del cuerpo MUST llegar al registro. Leer el cuerpo
para el registro MUST NOT alterar ni retrasar de forma apreciable la respuesta, y un cuerpo que no
se puede leer MUST NOT hacer fallar la petición. El limitador MUST guardar solo un HMAC de la
dirección con un secreto aleatorio por proceso y MUST olvidar cada entrada al cerrarse su ventana.

#### Scenario: Rebinding de DNS

- **WHEN** llega una petición a `/mcp` con `Host: evil.example`
- **THEN** la respuesta es `403` y no se crea ninguna instancia del servidor

#### Scenario: Registros sin datos personales

- **WHEN** un cliente llama a una herramienta con un argumento, un agente de usuario y una cabecera
  `X-Forwarded-For`
- **THEN** ninguna línea del registro contiene la dirección, el agente ni el argumento, y la línea
  de la petición nombra la herramienta aunque el cliente no envíe `Mcp-Name`

#### Scenario: Cliente anunciado

- **WHEN** un cliente envía `initialize` con `clientInfo.name` igual a `claude-ai` y una versión
- **THEN** la línea de esa petición lleva ese nombre y esa versión

#### Scenario: Nombre de cliente hostil

- **WHEN** el nombre anunciado contiene saltos de línea, caracteres de control o más de 64 caracteres
- **THEN** la línea lleva `[other]` en su lugar y sigue siendo una única línea JSON válida

#### Scenario: Herramienta desconocida

- **WHEN** una llamada `tools/call` nombra una herramienta que el servidor no tiene
- **THEN** la línea lleva `[other]` como herramienta y no el texto recibido

#### Scenario: Recurso pedido en la cabecera

- **WHEN** un cliente envía en `Mcp-Name` la dirección de un recurso o texto libre
- **THEN** la línea lleva `[other]` en ese campo y no el texto recibido

#### Scenario: Etiqueta propia

- **WHEN** la URL de la petición es `/mcp?tag=jordi`
- **THEN** la línea lleva `tag` con ese valor
- **WHEN** la etiqueta no casa con `[a-z0-9-]{1,24}`
- **THEN** la línea no lleva el texto recibido

#### Scenario: Cuerpo ilegible

- **WHEN** el cuerpo de la petición no es JSON
- **THEN** la respuesta es la misma que antes de este cambio y la línea del registro no lleva método,
  herramienta ni cliente
