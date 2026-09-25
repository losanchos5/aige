# Proposal

## Why

Los datos abiertos del sitio (`/api/v1/*`, registro de obligaciones, crosswalk, glosario, patrones,
plantillas y capítulos) ya son reutilizables por personas y scripts, pero un asistente de IA tiene
que descargarlos, entender sus formas y cruzarlos por su cuenta para responder "qué obliga el art. 14
a un responsable del despliegue", "a qué equivale ISO/IEC 42001 6.1.2" o "dame el esquema del
registro de incidentes". Un servidor MCP remoto de solo lectura pone esas preguntas a un clic de
Claude y de cualquier cliente MCP, con cada respuesta atada a su URL de origen y al aviso
"illustrative, not legal advice", sin cuentas ni datos personales.

## What Changes

- **Servidor MCP** en `tools/mcp-server/` (paquete propio con su `package.json` y su lockfile, sin
  tocar `site/node_modules`): TypeScript con el SDK oficial v2 (`@modelcontextprotocol/server`
  2.1.0, revisión 2026-07-28 de la especificación), transporte Streamable HTTP sin estado mediante
  `createMcpHandler` sobre Hono, con la vía de compatibilidad sin sesión para los clientes que aún
  abren con `initialize` (revisiones 2025-03-26 a 2025-11-25).
- **Herramientas** (entradas en JSON Schema, salida de texto y `structuredContent` con esquema de
  salida, URL de origen y aviso en cada respuesta): `search_glossary`, `get_term`,
  `get_obligations` (marco, rol, clase de sistema, fecha, estado, capa), `get_obligation`,
  `map_clause` (por el crosswalk), `list_patterns`, `get_pattern`, `list_templates`,
  `get_template` (esquemas, ejemplos, plantillas y kit de políticas) y `search_bok` (títulos,
  resúmenes, puntos clave, encabezados con ancla y texto de secciones).
- **Recursos**: el catálogo, los trece conjuntos de datos y el texto completo (`/llms-full.txt`)
  bajo sus URI canónicas, y una plantilla de recurso por obligación.
- **Datos**: lectura desde `API_BASE` (por defecto la API pública) con caché en memoria (TTL de una
  hora), revalidación `If-None-Match`/`If-Modified-Since`, peticiones concurrentes unificadas y
  copia caducada ante fallo. El índice de plantillas, que el sitio no publica, se genera desde
  `site/public` y `site/src/data/templates.ts` (`npm run catalogue`).
- **HTTP**: `POST /mcp`, `GET /healthz`, `GET /`; CORS abierto sin credenciales, guarda de `Host`
  contra el rebinding de DNS, lista opcional de `Origin`, límite de cuerpo, límite de tasa por
  cliente en memoria (HMAC de la dirección, olvidada al cerrar la ventana) y registros JSON sin IP,
  agente de usuario, cuerpo ni argumentos.
- **Despliegue documentado, no ejecutado**: `Dockerfile` (`node:22-alpine`, usuario `node`,
  healthcheck, puerto 8787), servicio de compose y bloque de Caddy en el README, e instrucciones de
  conexión desde Claude, Claude Code y otros clientes.
- **Ubicación**: el encargo pedía `services/mcp/`, pero el hook `pre-commit` del repositorio público
  reserva `services/` para el producto privado y bloquea el commit; el paquete vive en
  `tools/mcp-server/`, junto a `tools/reg-monitor/`. El hook no se ha tocado ni esquivado.
- Fuera de alcance: el despliegue en el VPS, el DNS, cualquier página o enlace del sitio (van al
  handoff) y cambios en `site/src/lib/api.ts`.

## Capabilities

### New Capabilities
- `mcp-server`: el servidor MCP remoto de solo lectura sobre los datos abiertos, sus herramientas,
  recursos, caché, superficie HTTP, privacidad y empaquetado.

### Modified Capabilities
- Ninguna.

## Impact

- Código nuevo: `tools/mcp-server/` (src, tests con fixtures copiados de `site/dist`, scripts de
  sincronización, `Dockerfile`, README).
- Registros compartidos: una sección en `sources/SOURCES.md`, viñetas en `bok/CHANGELOG.md`.
- Sin cambios en el sitio ni en su build; `bash D:/Documents/aige-wt/build.sh` sigue en verde.
- Dependencias nuevas solo dentro del paquete: `@modelcontextprotocol/server`, `hono`,
  `@hono/node-server`, `zod`, `github-slugger`; en desarrollo `@modelcontextprotocol/client`,
  `typescript` y `@types/node`.
