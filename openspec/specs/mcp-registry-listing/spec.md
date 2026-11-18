# mcp-registry-listing Specification

## Purpose
TBD - created by archiving change listings-readiness. Update Purpose after archive.

## Requirements

### Requirement: Entrada para el registro oficial de MCP

El repositorio SHALL contener `tools/mcp-server/server.json` conforme al esquema del registro
(`https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`): nombre
`com.aigovernanceengineer/reference`, título, descripción de 100 caracteres como máximo, versión,
dirección de documentación, repositorio y un único remoto `streamable-http`. La versión MUST ser la
que anuncia el servidor (`SERVER_VERSION`) y el remoto MUST ser el mismo que publica
`/.well-known/mcp.json`.

#### Scenario: Versión del servidor sin actualizar la entrada

- **WHEN** se sube `SERVER_VERSION` y `server.json` conserva la versión anterior
- **THEN** las pruebas de `tools/mcp-server` fallan

#### Scenario: Descripción demasiado larga

- **WHEN** la descripción de `server.json` supera los 100 caracteres
- **THEN** las pruebas de `tools/mcp-server` fallan

### Requirement: Verificación de dominio para el registro

El sitio SHALL servir `/.well-known/mcp-registry-auth` con una sola línea
`v=MCPv1; k=ed25519; p=<clave pública en base64>`, con estado `200`, sin redirección y como
`text/plain`. La clave privada correspondiente MUST NOT estar en el repositorio.

#### Scenario: El registro comprueba el dominio

- **WHEN** se pide `https://aigovernanceengineer.com/.well-known/mcp-registry-auth`
- **THEN** la respuesta es `200`, de tipo `text/plain`, y su cuerpo es la línea de verificación

#### Scenario: Fichero ausente o mal formado en el build

- **WHEN** el build no contiene el fichero o su contenido no tiene ese formato
- **THEN** la suite de pruebas del sitio falla
