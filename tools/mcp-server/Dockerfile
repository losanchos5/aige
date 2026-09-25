# Read-only MCP server over the aigovernanceengineer.com open data.
# Build from this directory:  docker build -t aige-mcp:0.5.0 .
# Run:  docker run --init --rm -p 127.0.0.1:8787:8787 aige-mcp:0.5.0
# See README.md for the compose service and the Caddy site block.
#
# The base is pinned by digest (node:22-alpine resolved to Node.js 22.23.3 on
# Alpine 3.24 as of 2026-09-24), so a rebuild or a retagged image cannot change
# it silently; Dependabot (package-ecosystem docker, /tools/mcp-server) proposes
# the next digest as a pull request. Keep both FROM lines on the same digest.

FROM node:22-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402
ENV NODE_ENV=production \
    PORT=8787 \
    HOST=0.0.0.0
WORKDIR /app
# Files stay owned by root and read-only to the runtime user.
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# The official node images ship an unprivileged `node` user (uid 1000).
USER node
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 8787) + '/healthz').then((r) => process.exit(r.ok ? 0 : 1), () => process.exit(1))"]
CMD ["node", "dist/index.js"]
