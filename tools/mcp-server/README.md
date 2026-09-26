# AI Governance Engineer MCP server

> A read-only remote Model Context Protocol server over the open data of aigovernanceengineer.com:
> the obligation register, the topic crosswalk, the glossary, the patterns, the templates and
> schemas, the open control profiles and the Body of Knowledge chapters. Illustrative, not legal
> advice and not a claim of conformity.

The site already publishes its data as static JSON under [`/api/v1`](https://aigovernanceengineer.com/resources/data).
This server puts an MCP layer in front of that API so an assistant can ask the questions a
practitioner asks ("which EU AI Act rows bind a deployer of an Annex III system before 2028?",
"what does ISO/IEC 42001 6.1.2 map to?", "give me the incident-record schema") and get answers
that carry their source URL. It holds no data of its own: every answer is read from the public API
(cached in memory) and every answer names the page it came from. It stores nothing about the people
who call it, needs no account and writes nothing anywhere.

The public endpoint is `https://mcp.aigovernanceengineer.com/mcp` (Streamable HTTP, no
authentication), live since 2026-09-25. You can also run it yourself (below).

## Tools

Every tool is read-only (`readOnlyHint: true`), takes a JSON Schema input, and returns both a text
answer and a `structuredContent` object that validates against its declared output schema. Every
answer carries `source` (the canonical page to cite), `dataset` (the API document it was read
from), `dataVersion`, `license` (CC BY 4.0) and `notice` ("Illustrative, not legal advice and not a
claim of conformity"). A miss (unknown slug, id or clause) is a tool error that lists the closest
valid values, so the model can correct itself.

| Tool | Input | What it answers |
|---|---|---|
| `search_glossary` | `query`, `limit?` | Terms whose name, acronym or definition match every query word, best first, with the canonical `/glossary/<slug>` page. |
| `get_term` | `slug` (slug, id, URL or name) | One term: definition, page, chapters that use it, other terms that mention it. |
| `get_obligations` | `framework?`, `role?`, `systemClass?`, `appliesBefore?`, `status?`, `layer?`, `limit?` | Rows of the obligation register (obligation → artefact → stack layer) filtered with AND. `framework` takes an id or a name ("EU AI Act", "ISO 42001", "nist"); `role` matches the duty holder, or the scope of laws that name who they bind; `appliesBefore` keeps rows whose first application date is on or before an ISO date. |
| `get_obligation` | `id` (e.g. `AIGE-OBL-EUAIA-ART9`, any case, or its URL) | One row with its framework, milestones, patterns, the crosswalk references joined to it and its chapter 08 section. |
| `map_clause` | `framework`, `ref` | The crosswalk topics a clause sits in and the clauses of the other frameworks on those topics, with strength (core or related), verification flag and obligation ids. Accepts "Art. 9", "Article 9(2)", "6.1.2", "GOVERN 1", "LLM01". A narrower clause falls back to its parent. |
| `list_patterns` | `layer?` (1-5) | The chapter 05 patterns, optionally for one stack layer (primary or secondary). |
| `get_pattern` | `slug` (slug, id, URL or title) | One pattern: layer, summary, "Maps to", obligation ids and the full text of its page, section by section. |
| `list_templates` | `stage?` | The templates-and-schemas library: JSON Schemas with a filled example and a human template, and the policy kit. |
| `get_template` | `name`, `part?` (`all`, `schema`, `example`, `template`) | One library entry with the content of its files. |
| `search_bok` | `query`, `kind?`, `limit?` | Chapters (title, summary, key points), sections (heading, anchor URL, text) and pattern pages, best first. |
| `list_controls` | `profile?`, `layer?`, `status?`, `depth?`, `query?` | The reference controls of the open control profiles (draft control specifications, ids such as `AIGE-CTL-EVAL-002`), filtered with AND by profile slug, stack layer (primary or secondary), publication status, depth (`specified`, `derived`, `stub`) and words in the id, title or objective. |
| `get_control` | `id` (id in any case, `EVAL-002`, page or JSON URL, or title) | One control: objective, failure modes, scope, enforcement points, verification, evidence, failure response, patterns, the illustrative mappings, numbered references, implementation notes, open questions, the observation it records and the example observations. |

## Resources

The catalogue (`/api/v1/index.json`), the fifteen datasets (`obligations`, `frameworks`,
`crosswalk`, `glossary`, `patterns`, `maturity`, `path`, `chapters`, `jurisdictions`, `harms`,
`cases`, `contracts`, `roles`, `threats`, `controls`) and the full text (`/llms-full.txt`) are MCP
resources under their canonical `https://aigovernanceengineer.com/...` URIs. Two resource
templates serve a single record: `https://aigovernanceengineer.com/api/v1/obligations/{id}.json`
(one obligation row, e.g. `aige-obl-euaia-art9`) and
`https://aigovernanceengineer.com/api/v1/controls/{id}.json` (one control, e.g.
`aige-ctl-eval-002`).

## Connect a client

**Claude (web and desktop).** On Pro and Max plans, open *Customize > Connectors*, choose
*+*, then *Add custom connector*, and paste `https://mcp.aigovernanceengineer.com/mcp`; leave the
OAuth settings empty (the server needs no authentication). On Team and Enterprise plans an owner
adds it first under *Organization settings > Connectors > Add > Custom > Web*; members then
connect it from *Customize > Connectors* [5].

**Claude Code.**

```bash
claude mcp add --transport http aige https://mcp.aigovernanceengineer.com/mcp
```

Add `--scope project` to share it through the project's `.mcp.json`, or `--scope user` for all
your projects [4]. In a JSON configuration the entry needs `"type": "http"` next to the URL:

```json
{
  "mcpServers": {
    "aige": { "type": "http", "url": "https://mcp.aigovernanceengineer.com/mcp" }
  }
}
```

**Other MCP clients.** Point any client that supports the Streamable HTTP transport at
`https://mcp.aigovernanceengineer.com/mcp`. The server speaks the 2026-07-28 revision of the
protocol (one POST per message, no sessions) [1][2] and, for clients that still open with an
`initialize` handshake (revisions 2025-03-26 to 2025-11-25), serves each request statelessly
without minting a session. `GET /mcp` answers `405`, as the 2026-07-28 revision asks of a server
that has no standalone stream [2]. JSON-RPC batch arrays get `400`: the protocol dropped batching in
revision 2025-06-18 [9], and one POST carrying a hundred calls would count as a single request
against the rate limit. Browser clients may call it directly: CORS is open, without credentials.

## Configuration

Every setting comes from the environment; invalid values stop the process at start-up.

| Variable | Default | Meaning |
|---|---|---|
| `API_BASE` | `https://aigovernanceengineer.com/api/v1` | Where the datasets are read from. Point it at a local build to test. |
| `SITE_BASE` | `API_BASE` without `/api/v1` | Where schemas, templates and `llms-full.txt` are read from. |
| `PORT` / `HOST` | `8787` / `0.0.0.0` | Listening port and interface. Use `127.0.0.1` outside a container. |
| `PUBLIC_URL` | `http://localhost:<PORT>` | Public URL of the server (discovery document, default host allowlist). |
| `ALLOWED_HOSTS` | host of `PUBLIC_URL`, `localhost`, `127.0.0.1`, `[::1]` | `Host` values accepted on every route but `/healthz` (the DNS-rebinding guard); `*` accepts any. |
| `ALLOWED_ORIGINS` | `*` | Browser origins allowed on `/mcp` (comma-separated). With a list, a request whose `Origin` is not on it gets `403`; requests without `Origin` (non-browser clients) pass. |
| `TRUST_PROXY` | `false` | Key the rate limit on the right-most `X-Forwarded-For` entry. Set `true` only behind a proxy that sets it, such as Caddy. |
| `TRUSTED_PROXIES` | empty | Socket addresses of that proxy (comma-separated). With a list, `X-Forwarded-For` is read only on connections from one of them and anyone else is keyed by their own address; empty, any peer is trusted, which is safe only on a network nothing but the proxy can reach. |
| `CACHE_TTL_MS` | `3600000` (1 hour) | How long a fetched document is served from memory before it is revalidated. |
| `FETCH_TIMEOUT_MS` | `10000` | Timeout of one upstream request. |
| `MAX_UPSTREAM_BYTES` | `16777216` | Largest upstream document accepted. |
| `MAX_BODY_BYTES` | `65536` | Largest request body on `/mcp` (`413` above it). |
| `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS` | `120` / `60000` | Requests per client per window on `/mcp` (`429` with `Retry-After` above it). A client is an IPv4 address or an IPv6 /64, since an end site holds at least a /64 and can pick any address in it [10]. |
| `MAX_CONCURRENT_REQUESTS` | `16` | MCP requests handled at once; above it `/mcp` answers `503` with `Retry-After: 1`. A `subscriptions/listen` stream does not count. |
| `LOG_LEVEL` | `info` | `debug`, `info`, `warn` or `error`. |

## How it behaves

- **Stack.** TypeScript on Node.js 22, the official MCP TypeScript SDK v2 (`@modelcontextprotocol/server`
  2.1.0) [3] with its per-request `createMcpHandler`, and Hono for the HTTP routes.
- **Data.** Each dataset is fetched from `API_BASE` on first use and kept in memory. Within the TTL
  it is served from memory; after it, the next reader revalidates with `If-None-Match` and
  `If-Modified-Since`, and a `304` extends the copy without a download. Concurrent readers share
  one request. If the site cannot be reached, the last copy keeps being served, the failure is
  logged and the site is asked again after a minute (or the TTL, if shorter), not on every tool
  call; with no copy, the tool answers with an error that names the URL. The chapter text and the
  pattern pages come from `/llms-full.txt`, split into documents and headings; section anchors are
  recomputed the way the site renders them, so the URLs point at the right heading.
- **Templates list.** The site publishes no index of its templates and schemas, so the list is
  bundled in `src/catalogue.generated.ts` (from `site/public/schemas`, `site/public/templates`
  and `site/src/data/templates.ts`); the file contents are still fetched live. A schema published
  later is served by name anyway (`/schemas/<name>.v1.json` is tried). Run `npm run catalogue`
  after adding a schema or template; `test/resources.test.ts` fails until you do.
- **Privacy.** Logs are JSON lines: method, path, status, duration and, when the client sends them,
  the `Mcp-Method` and `Mcp-Name` headers (a tool or resource name). No IP address, user agent,
  request body or tool argument is logged. The rate limiter keys clients by an HMAC of their
  address with a secret drawn at start-up, drops each entry when its window closes and forgets
  everything on restart. A client past its limit is logged once per window, not on every refused
  request.
- **Stateless.** No sessions, no storage, no background jobs. Any number of replicas can run side by
  side; each keeps its own cache and its own rate-limit table.
- **Routes.** `POST /mcp` (MCP), `GET /healthz` (liveness and cache counters; never calls the site,
  never host-checked, never rate limited), `GET /` (a discovery document).

## Run it locally

```bash
cd tools/mcp-server
npm ci
npm run build
npm start                         # against the live API
```

To test against a local build of the site, serve `site/dist` with any static file server and point
`API_BASE` at it, for example:

```bash
(cd ../../site && npm run build)
python -m http.server 4322 --bind 127.0.0.1 --directory ../../site/dist &
API_BASE=http://127.0.0.1:4322/api/v1 HOST=127.0.0.1 npm start
```

Tests use Node's own runner against fixtures copied from `site/dist` (`test/fixtures`), served by
an in-process static server with `ETag` and `304` support, and drive the server with the official
MCP client over HTTP in both protocol eras:

```bash
npm test
npm run fixtures                  # refresh test/fixtures from a fresh site build
npm run catalogue                 # regenerate src/catalogue.generated.ts
```

## Deploy (Docker, compose, Caddy)

The `Dockerfile` builds on `node:22-alpine` pinned by digest (Node.js 22.23.3 on Alpine 3.24 as of
2026-09-24), so a rebuild or a retagged image cannot change the base silently; Dependabot proposes
the new digest as a pull request [11]. It prunes development dependencies, runs as the image's
unprivileged `node` user (uid 1000) with the application files read-only, listens on port 8787 and
declares a health check on `/healthz` [8].

On a VPS shared with other services, keep the server off the network the other containers share
with Caddy: any of them could call it directly and set `X-Forwarded-For` to anything. Create a
network that only Caddy and the server join, with a subnet whose dynamic range leaves room for a
fixed Caddy address [12]:

```bash
docker network create --subnet 172.30.87.0/24 --ip-range 172.30.87.128/25 aige-mcp-edge
```

In Caddy's own compose file, join that network at a fixed address (`ipv4_address`) [13], next to
the network Caddy already uses for the other sites (here `caddy`):

```yaml
services:
  caddy:
    # ...the existing Caddy service...
    networks:
      caddy: {}
      aige-mcp-edge:
        ipv4_address: 172.30.87.2

networks:
  caddy:
    external: true
  aige-mcp-edge:
    external: true
```

The server's compose service. Docker's default `json-file` log driver does not rotate a log
unless `max-size` is set (it is unlimited by default) [14], so the `logging` block caps the
server's log at three files of 10 MB:

```yaml
services:
  aige-mcp:
    build: ./tools/mcp-server
    image: aige-mcp:0.6.0
    restart: unless-stopped
    init: true
    read_only: true
    cap_drop: [ALL]
    security_opt: ["no-new-privileges:true"]
    mem_limit: 256m
    pids_limit: 100
    environment:
      PUBLIC_URL: https://mcp.aigovernanceengineer.com
      ALLOWED_HOSTS: mcp.aigovernanceengineer.com
      TRUST_PROXY: "true"
      TRUSTED_PROXIES: 172.30.87.2
      LOG_LEVEL: info
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    expose: ["8787"]
    networks: [aige-mcp-edge]

networks:
  aige-mcp-edge:
    external: true
```

The Caddy site block. Caddy sets `X-Forwarded-For` to the client address and ignores incoming
`X-Forwarded-*` values from untrusted clients, so the right-most entry the server reads is the real
client [6]; `text/event-stream` responses are flushed immediately without extra settings [6]. The
`log` block keeps Caddy's own access log free of client addresses and headers [7].

```caddyfile
mcp.aigovernanceengineer.com {
	request_body {
		max_size 64KB
	}
	reverse_proxy aige-mcp:8787
	header {
		Strict-Transport-Security "max-age=31536000"
		X-Content-Type-Options nosniff
		-Server
	}
	log {
		format filter {
			request>remote_ip delete
			request>client_ip delete
			request>headers delete
			resp_headers delete
		}
	}
}
```

After a deploy, check `curl -s https://mcp.aigovernanceengineer.com/healthz` and list the tools
from a client. Nothing here needs a secret.

## Licence and attribution

The data the server returns is the AI Governance Engineer Body of Knowledge, CC BY 4.0: credit
"Jorge García Aibar", link the licence and the source URL each answer carries, and say if you
changed anything. Mappings and obligation rows are illustrative, not legal advice and not a claim
of conformity; check the primary source before relying on them.

## Sources

[1] Model Context Protocol specification, revision 2026-07-28 (stateless, self-contained requests; per-request capability negotiation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28 (verified: primary)
[2] Streamable HTTP transport, revision 2026-07-28 (one POST endpoint; protocol-level sessions and the GET stream removed; `405` to GET or DELETE from older clients; servers MUST validate `Origin`; `MCP-Protocol-Version`, `Mcp-Method` and `Mcp-Name` request headers). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http (verified: primary)
[3] MCP TypeScript SDK (v2 is the stable line, released with the 2026-07-28 revision; packages `@modelcontextprotocol/server` and `@modelcontextprotocol/client`, version 2.1.0 on npm as of 2026-09-24). Model Context Protocol on GitHub. 2026. https://github.com/modelcontextprotocol/typescript-sdk (verified: primary)
[4] Connect Claude Code to tools via MCP (`claude mcp add --transport http <name> <url>`; `local`, `project` and `user` scopes; a JSON entry with a `url` needs `"type": "http"`). Anthropic. 2026. https://code.claude.com/docs/en/mcp (verified: primary)
[5] Get started with custom connectors using remote MCP (Pro and Max: Customize > Connectors > Add custom connector; Team and Enterprise: Organization settings > Connectors). Anthropic Help Center. 2026-08-11. https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp (verified: primary)
[6] reverse_proxy directive (sets or augments `X-Forwarded-For`, ignores incoming `X-Forwarded-*` values unless from trusted proxies; `text/event-stream` responses are flushed immediately). Caddy. 2026. https://caddyserver.com/docs/caddyfile/directives/reverse_proxy (verified: primary)
[7] log directive, `filter` format (`request>remote_ip delete`, `request>client_ip delete`; the `fields` block is optional). Caddy. 2026. https://caddyserver.com/docs/caddyfile/directives/log (verified: primary)
[8] Docker and Node.js best practices (the `node` user with uid 1000; `NODE_ENV=production`; `--init` for PID 1). Node.js docker-node. 2026. https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md (verified: primary)
[9] Key changes, revision 2025-06-18 ("Remove support for JSON-RPC batching", the first major change listed). Model Context Protocol. 2025-06-18. https://modelcontextprotocol.io/specification/2025-06-18/changelog (verified: primary)
[10] RFC 6177, IPv6 Address Assignment to End Sites (end sites should get "at least one /64, and in most cases significantly more"). IETF. 2011-03. https://www.rfc-editor.org/rfc/rfc6177 (verified: primary)
[11] Building best practices, "Pin base image versions" (tags are mutable; a digest pins the exact image; Dependabot with `package-ecosystem: "docker"` raises pull requests that update tags and digests). Docker Docs. 2026. https://docs.docker.com/build/building/best-practices/#pin-base-image-versions (verified: primary)
[12] docker network connect (`--ip` assigns a static address; create the network with an `--ip-range` and pick static addresses outside it). Docker Docs. 2026. https://docs.docker.com/reference/cli/docker/network/connect/ (verified: primary)
[13] Compose file reference, services, `networks` (`ipv4_address`: a static address for the container on that network; the network needs a subnet covering it). Docker Docs. 2026. https://docs.docker.com/reference/compose-file/services/ (verified: primary)
[14] JSON File logging driver (`max-size` defaults to -1, unlimited; logs are not rotated unless it is set; `max-file` works only with `max-size`). Docker Docs. 2026. https://docs.docker.com/engine/logging/drivers/json-file/ (verified: primary)

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
> credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
