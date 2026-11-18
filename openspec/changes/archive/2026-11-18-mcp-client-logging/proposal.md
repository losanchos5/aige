# Proposal

## Why

El servidor MCP recibió unas 150 llamadas correctas en 30 días, pero sus registros solo guardan
método HTTP, ruta y estado: no se puede saber qué clientes lo usan, qué herramientas llaman ni
cuánto de ese uso es del propio autor. El criterio para decidir si merece la pena listarlo en
registros y directorios es el uso ajeno, y hoy no se puede medir.

## What Changes

- El registro de cada petición a `/mcp` añade el método JSON-RPC, el nombre de la herramienta
  llamada y, en `initialize`, el nombre y la versión que anuncia el cliente.
- El registro añade una etiqueta opcional `tag` tomada de la URL, para que el autor marque sus
  propios clientes y su uso se pueda descontar.
- Todo valor que viene del cliente se limita a listas conocidas o se sanea antes de escribirse.
- Sigue sin registrarse la dirección IP, el agente de usuario, los argumentos de las herramientas y
  el resto del cuerpo.
- La página `/mcp` y el README dicen exactamente qué se registra.
- Versión del servidor 0.6.1 y redespliegue en el VPS.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `mcp-server`: el requisito "Superficie HTTP protegida y privada" cambia lo que contienen los
  registros.

## Impact

- Código: `tools/mcp-server/src/app.ts` (registro de acceso), `src/server.ts` (versión),
  `package.json` y su lock.
- Tests: `tools/mcp-server/test/http.test.ts`.
- Documentación: `tools/mcp-server/README.md` (privacidad y ejemplo de compose) y
  `site/src/pages/mcp.astro` (frase de privacidad).
- Operación: nueva imagen `aige-mcp:0.6.1` en el VPS; sin cambios en Caddy ni en la red.
- Sin dependencias nuevas.
