# Proposal: listings-readiness

## Why

El bloque 2 de la propuesta aprobada el 2026-11-17 pide entrar en los listados de puerta abierta
(registro oficial de MCP, directorio de conectores de Claude, NIST AIRC, OECD.AI). Dos de ellos
exigen cosas que el sitio no tiene: el directorio de Claude rechaza de entrada un conector sin
política de privacidad, y el registro de MCP verifica el dominio con un fichero público. Además, un
sitio que se presenta como referencia neutral no dice quién lo paga ni qué intereses tiene su autor,
y `about/methodology.astro` deja escrito que esa declaración está pendiente.

Lo que ya cumple y no se toca: las doce herramientas del servidor llevan `title` y `readOnlyHint`,
y las plantillas de issue de corrección existen (`report-an-error`, `technical-correction`).

## What Changes

- Página `/privacy`: qué datos recoge el sitio, el boletín y el servidor MCP, a dónde van y cómo
  borrarlos. Solo afirma lo que el código hace; cada tercero que la CSP permite aparece nombrado.
- Página `/about/independence`: quién financia el sitio, qué relaciones tiene y no tiene el autor,
  y el compromiso de anunciar ahí cualquier producto o servicio de pago antes de lanzarlo. No afirma
  que no existan intereses comerciales. El texto es un borrador que Jordi firma antes del merge.
- Las dos páginas entran en el grupo About (menú, pie, `llms.txt`).
- `tools/mcp-server/server.json` para el registro oficial de MCP, con una prueba que lo mantiene
  alineado con la versión del servidor, y el fichero público
  `/.well-known/mcp-registry-auth` que verifica el dominio.
- Fuera del repo: textos de envío para el directorio de Claude y pasos de publicación en el
  registro, en `D:/Documents/aige-media/outreach/2026-11-listings/`.

No cambia el servidor MCP ni se despliega nada en el VPS. Publicar en el registro y enviar al
directorio son acciones de Jordi o con su visto bueno.

## Capabilities

### New Capabilities

- `privacy-page`: la página de privacidad y la regla que la mantiene alineada con la CSP.
- `independence-statement`: la declaración de independencia y financiación.
- `mcp-registry-listing`: `server.json` y la verificación de dominio para el registro de MCP.

### Modified Capabilities

- `site-navigation`: el grupo About enlaza dos destinos más.

## Impact

- Sitio: `site/src/pages/privacy.astro`, `site/src/pages/about/independence.astro`,
  `site/src/data/nav.ts`, `site/src/pages/llms.txt.ts`, `site/astro.config.ts` (fecha de
  modificación en el sitemap), `site/src/pages/mcp.astro` y `site/src/pages/about/methodology.astro`
  (un enlace cada una), `site/public/.well-known/mcp-registry-auth`, `site/public/_headers`,
  `site/tests/`.
- Servidor MCP: `tools/mcp-server/server.json` y una prueba. Sin cambios de código.
- Depende de `mcp-client-logging` (PR #113): la página describe el registro de la versión 0.6.1 y
  `server.json` lleva esa versión. Esta rama sale de aquella y se fusiona después.
- La clave privada de firma del registro vive fuera del repo
  (`C:/Users/Jordi/.ssh/aige-mcp-registry-ed25519.pem`) y nunca se commitea.
