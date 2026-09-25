## ADDED Requirements

### Requirement: Servidor MCP remoto sin estado
El paquete `tools/mcp-server/` SHALL servir el Model Context Protocol por Streamable HTTP en
`POST /mcp` con el SDK oficial de TypeScript v2, sin sesiones ni almacenamiento, construyendo una
instancia de servidor por petición. SHALL atender a los clientes de la revisión 2026-07-28 y, sin
crear sesión, a los clientes que abren con `initialize` (revisiones 2025-03-26 a 2025-11-25). Un
`GET /mcp` MUST responder `405`.

#### Scenario: Cliente de la revisión 2026-07-28
- **WHEN** un cliente fijado a la revisión 2026-07-28 lista las herramientas y llama a una
- **THEN** recibe la lista completa y la respuesta sin handshake previo

#### Scenario: Cliente de la era 2025
- **WHEN** un cliente envía `initialize` con la versión 2025-06-18 y después `tools/list`
- **THEN** ambas peticiones reciben respuesta y ninguna lleva cabecera `Mcp-Session-Id`

### Requirement: Herramientas de solo lectura con origen y aviso
El servidor SHALL registrar `search_glossary`, `get_term`, `get_obligations`, `get_obligation`,
`map_clause`, `list_patterns`, `get_pattern`, `list_templates`, `get_template` y `search_bok`, cada
una con esquema JSON de entrada, esquema de salida y anotación `readOnlyHint: true`. Toda respuesta
correcta MUST llevar un texto y un `structuredContent` válido contra su esquema de salida con
`source` (URL canónica de la página que la respalda), `dataset`, `dataVersion`, `license` y
`notice` ("Illustrative, not legal advice and not a claim of conformity"), y el texto MUST nombrar
la URL de origen y el aviso. Un identificador desconocido MUST devolver un error de herramienta
con los valores válidos más cercanos.

#### Scenario: Término del glosario
- **WHEN** se llama a `get_term` con `abstention-band`, `t-abstention-band`, la URL de su página o
  el nombre `Abstention band`
- **THEN** la respuesta es el mismo término con `source` igual a
  `https://aigovernanceengineer.com/glossary/abstention-band`

#### Scenario: Obligaciones filtradas
- **WHEN** se llama a `get_obligations` con `framework: "eu-ai-act"`, `role: "deployer"`,
  `systemClass: "high-risk-annex-iii"` y `appliesBefore: "2027-12-31"`
- **THEN** todas las filas devueltas son de la Ley de IA de la UE, nombran al responsable del
  despliegue, llevan esa clase y aplican desde esa fecha o antes, y entre ellas está
  `AIGE-OBL-EUAIA-ART26`

#### Scenario: Cláusula entre marcos
- **WHEN** se llama a `map_clause` con `framework: "EU AI Act"` y `ref: "Article 9"`
- **THEN** la respuesta incluye el tema `risk-management` con coincidencia exacta, la obligación
  `AIGE-OBL-EUAIA-ART9` y, entre los equivalentes, ISO/IEC 42001 6.1.2, sin cláusulas de la propia
  Ley ni del art. 90

#### Scenario: Patrón con su página
- **WHEN** se llama a `get_pattern` con `kill-switch-circuit-breaker`,
  `pattern-kill-switch--circuit-breaker` o `Kill Switch / Circuit Breaker`
- **THEN** la respuesta es el mismo patrón, con sus secciones y la URL de cada encabezado

#### Scenario: Plantilla con sus ficheros
- **WHEN** se llama a `get_template` con `policy-card`
- **THEN** la respuesta trae el esquema JSON, el ejemplo y la plantilla Markdown con su contenido

#### Scenario: Búsqueda en el Body of Knowledge
- **WHEN** se llama a `search_bok` con `who wrote it` limitado a secciones
- **THEN** un resultado es `https://aigovernanceengineer.com/bok/preface#who-wrote-it-and-from-what`

### Requirement: Conjuntos de datos como recursos
El servidor SHALL exponer como recursos MCP el catálogo `/api/v1/index.json`, los trece conjuntos de
datos que lista y `/llms-full.txt` bajo sus URI canónicas `https://aigovernanceengineer.com/...`, y
una plantilla de recurso `https://aigovernanceengineer.com/api/v1/obligations/{id}.json` que MUST
rechazar un id que no tenga la forma `aige-obl-*`.

#### Scenario: Lista sincronizada con el catálogo
- **WHEN** se ejecutan los tests del paquete
- **THEN** la lista de conjuntos del servidor coincide en nombre, título y orden con `index.json`

### Requirement: Datos en caché desde la API pública
El servidor SHALL leer los datos de `API_BASE` (por defecto `https://aigovernanceengineer.com/api/v1`)
y los ficheros del sitio de `SITE_BASE`, guardarlos en memoria durante `CACHE_TTL_MS` (una hora por
defecto) y revalidarlos después con `If-None-Match` e `If-Modified-Since`. Las lecturas simultáneas
de un mismo documento MUST compartir una petición; ante un fallo del origen MUST servirse la última
copia si existe, y si no, la herramienta MUST devolver un error legible que nombre la URL. Un
documento mayor que `MAX_UPSTREAM_BYTES` MUST rechazarse.

#### Scenario: Revalidación sin descarga
- **WHEN** vence el TTL y el origen responde `304` a la petición condicional
- **THEN** se sigue sirviendo el mismo documento ya analizado sin volver a descargarlo

#### Scenario: Origen caído
- **WHEN** el origen responde `503` tras vencer el TTL de un documento ya leído
- **THEN** se sirve la copia anterior y el fallo queda en el registro

### Requirement: Superficie HTTP protegida y privada
El servidor SHALL responder `GET /healthz` sin consultar el origen y `GET /` con un documento de
descubrimiento. En `/mcp` SHALL aplicar CORS sin credenciales, un límite de cuerpo
(`MAX_BODY_BYTES`, `413` por encima) y un límite de tasa por cliente (`429` con `Retry-After`). En
todas las rutas salvo `/healthz` MUST rechazar con `403` un `Host` fuera de `ALLOWED_HOSTS`, y con
una lista `ALLOWED_ORIGINS` MUST rechazar con `403` un `Origin` fuera de ella. Los registros MUST
ser líneas JSON sin dirección IP, agente de usuario, cuerpo ni argumentos de herramienta, y el
limitador MUST guardar solo un HMAC de la dirección con un secreto aleatorio por proceso y MUST
olvidar cada entrada al cerrarse su ventana.

#### Scenario: Rebinding de DNS
- **WHEN** llega una petición a `/mcp` con `Host: evil.example`
- **THEN** la respuesta es `403` y no se crea ninguna instancia del servidor

#### Scenario: Registros sin datos personales
- **WHEN** un cliente llama a una herramienta con un argumento, un agente de usuario y una cabecera
  `X-Forwarded-For`
- **THEN** ninguna línea del registro contiene la dirección, el agente ni el argumento, y la línea
  de la petición nombra la herramienta cuando el cliente envía `Mcp-Name`

### Requirement: Empaquetado y documentación de despliegue
El paquete SHALL incluir un `Dockerfile` sobre `node:22-alpine` que ejecute el servidor con el
usuario sin privilegios `node`, exponga el puerto 8787 y declare un healthcheck sobre `/healthz`, y
un README con el servicio de compose, el bloque de Caddy para `mcp.aigovernanceengineer.com`, las
instrucciones de conexión desde Claude y otros clientes MCP y la configuración por variables de
entorno. El despliegue MUST NOT hacerse en este bloque.

#### Scenario: Imagen construida y sana
- **WHEN** se construye la imagen y se ejecuta con `--read-only` y `--cap-drop ALL` contra una copia
  local de `site/dist`
- **THEN** el proceso corre como uid 1000, responde a `tools/call` y Docker marca el contenedor
  como `healthy`
