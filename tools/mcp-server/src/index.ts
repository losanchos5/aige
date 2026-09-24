// index.ts: process entry point. Reads the configuration, starts the HTTP
// server and shuts down cleanly on SIGTERM/SIGINT (docker stop).

import { serve } from '@hono/node-server';

import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { DataSource } from './data.js';
import { createLogger } from './log.js';
import { SERVER_NAME, SERVER_VERSION } from './server.js';
import { Upstream } from './upstream.js';

function main(): void {
  let config;
  try {
    config = loadConfig();
  } catch (error) {
    process.stderr.write(`${JSON.stringify({ ts: new Date().toISOString(), level: 'error', msg: (error as Error).message })}\n`);
    process.exit(1);
  }
  const logger = createLogger(config.logLevel);
  const upstream = new Upstream({
    ttlMs: config.cacheTtlMs,
    timeoutMs: config.fetchTimeoutMs,
    maxBytes: config.maxUpstreamBytes,
    logger,
    userAgent: `${SERVER_NAME}-mcp/${SERVER_VERSION} (+https://aigovernanceengineer.com/resources/data)`,
  });
  const data = new DataSource(upstream, config);
  const { app, close } = createApp({ config, data, logger });

  const server = serve({ fetch: app.fetch, port: config.port, hostname: config.host }, (info) => {
    logger.info('listening', {
      address: info.address,
      port: info.port,
      apiBase: config.apiBase,
      siteBase: config.siteBase,
      publicUrl: config.publicUrl,
      cacheTtlMs: config.cacheTtlMs,
      rateLimit: `${config.rateLimitMax}/${config.rateLimitWindowMs}ms`,
      allowedHosts: config.allowedHosts.length > 0 ? config.allowedHosts : '*',
      allowedOrigins: config.allowedOrigins,
      trustProxy: config.trustProxy,
    });
  });

  let stopping = false;
  const stop = (signal: string): void => {
    if (stopping) return;
    stopping = true;
    logger.info('shutting down', { signal });
    const force = setTimeout(() => process.exit(0), 10_000);
    force.unref();
    void close().finally(() => {
      server.close(() => process.exit(0));
    });
  };
  process.on('SIGTERM', () => stop('SIGTERM'));
  process.on('SIGINT', () => stop('SIGINT'));
}

main();
