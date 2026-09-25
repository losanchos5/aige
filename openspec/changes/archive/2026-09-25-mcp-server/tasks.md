# Tasks

Worktree `D:/Documents/aige-wt/w2-mcp-server`, rama `wt/w2-mcp-server`. El paquete es propio
(`tools/mcp-server/`, con su lockfile); `npm install`/`npm ci` solo se ejecutan dentro de él. La
build del sitio solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Lo que toca a páginas,
navegación o `site/src/lib/api.ts` va al handoff `D:/Documents/aige-wt/handoffs/w2-mcp-server.json`.

## 1. Verificación

- [x] 1.1 Comprobar en npm y en el repositorio del SDK el nombre, la versión y la API actuales (`@modelcontextprotocol/server` y `@modelcontextprotocol/client` 2.1.0, v2 estable, `createMcpHandler`, `registerTool` con esquemas Zod y esquema de salida).
- [x] 1.2 Leer la revisión 2026-07-28 del transporte Streamable HTTP (un único POST, sin sesiones, `405` a GET, validación de `Origin`, cabeceras `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`, `Mcp-Param-*`).
- [x] 1.3 Leer las formas exactas de `/api/v1` en `site/src/lib/api.ts` y en `site/dist/api/v1/schemas` (campos anulables incluidos) y de `/llms-full.txt`.
- [x] 1.4 Comprobar las instrucciones de conexión de Claude (conectores personalizados) y de Claude Code, y el comportamiento de Caddy con `X-Forwarded-For`, SSE y el filtro de registros.

## 2. Servidor

- [x] 2.1 Configuración por entorno con valores de producción y errores al arrancar (`src/config.ts`).
- [x] 2.2 Caché de origen con TTL, revalidación condicional, peticiones unificadas, copia caducada y límite de tamaño (`src/upstream.ts`).
- [x] 2.3 Acceso tipado a los conjuntos y al texto completo, con URL canónicas en las respuestas (`src/data.ts`, `src/types.ts`, `src/corpus.ts`).
- [x] 2.4 Herramientas `search_glossary`, `get_term`, `get_obligations`, `get_obligation`, `map_clause`, `list_patterns`, `get_pattern`, `list_templates`, `get_template`, `search_bok` (`src/tools/`).
- [x] 2.5 Recursos: catálogo, trece conjuntos, texto completo y plantilla por obligación (`src/resources.ts`).
- [x] 2.6 Índice de plantillas generado desde el sitio (`scripts/sync-catalogue.mjs`, `src/catalogue.generated.ts`).
- [x] 2.7 Superficie HTTP: `/mcp`, `/healthz`, `/`, CORS, guarda de `Host`, lista de `Origin`, límites de cuerpo y de tasa, registros JSON sin datos personales (`src/app.ts`, `src/ratelimit.ts`, `src/log.ts`, `src/index.ts`).
- [x] 2.8 Mover el paquete a `tools/mcp-server/` al bloquear el hook del repositorio público la ruta `services/`.

## 3. Tests

- [x] 3.1 Fixtures copiados de `site/dist` (`scripts/sync-fixtures.mjs`) y servidor estático de prueba con `ETag` y `304`.
- [x] 3.2 Cada herramienta con el cliente MCP oficial por HTTP, casos correctos y de error (`test/tools.test.ts`), y con un cliente fijado a 2026-07-28 (`test/modern.test.ts`).
- [x] 3.3 Caché, corpus, claves de cláusula, configuración y limitador (`test/upstream.test.ts`, `test/units.test.ts`).
- [x] 3.4 Superficie HTTP, clientes de la era 2025, registros y recursos (`test/http.test.ts`, `test/resources.test.ts`).
- [x] 3.5 `npm test` en verde y ejecución de `dist/index.js` contra una copia completa de `site/dist`.

## 4. Empaquetado y documentación

- [x] 4.1 `Dockerfile` (`node:22-alpine`, usuario `node`, healthcheck, puerto 8787), construido y probado en local con `--read-only` y `--cap-drop ALL`.
- [x] 4.2 README: herramientas, recursos, conexión desde Claude, Claude Code y otros clientes, configuración, comportamiento, compose y bloque de Caddy, fuentes numeradas.

## 5. Registro y cierre

- [x] 5.1 Anotar el cambio en `bok/CHANGELOG.md` (Unreleased (v0.5.0)) y las fuentes en `sources/SOURCES.md`.
- [x] 5.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0.
- [x] 5.3 `openspec validate mcp-server --strict`.
- [x] 5.4 Escribir el handoff y hacer commit por rutas explícitas.
