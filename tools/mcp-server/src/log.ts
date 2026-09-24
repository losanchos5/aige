// log.ts: structured JSON logs, one object per line on stdout (stderr for
// warnings and errors). The server never logs personal data: no client IP, no
// user agent, no request body and no tool arguments (a question typed into a
// tool can carry anything). A request line carries the method, the path, the
// status, the duration and, when the client mirrors them into headers, the MCP
// method and the tool or resource name.

import type { LogLevel } from './config.js';

const ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export type LogFields = Record<string, unknown>;

export interface Logger {
  debug(msg: string, fields?: LogFields): void;
  info(msg: string, fields?: LogFields): void;
  warn(msg: string, fields?: LogFields): void;
  error(msg: string, fields?: LogFields): void;
}

export type LogSink = (line: string, level: LogLevel) => void;

const defaultSink: LogSink = (line, level) => {
  if (level === 'warn' || level === 'error') process.stderr.write(`${line}\n`);
  else process.stdout.write(`${line}\n`);
};

/** Error objects serialise to `{}`; keep their name and message only (no stack in production logs). */
function clean(fields: LogFields): LogFields {
  const out: LogFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    out[key] = value instanceof Error ? { name: value.name, message: value.message } : value;
  }
  return out;
}

export function createLogger(level: LogLevel = 'info', sink: LogSink = defaultSink): Logger {
  const threshold = ORDER[level];
  const write = (lvl: LogLevel, msg: string, fields: LogFields = {}): void => {
    if (ORDER[lvl] < threshold) return;
    sink(JSON.stringify({ ts: new Date().toISOString(), level: lvl, msg, ...clean(fields) }), lvl);
  };
  return {
    debug: (msg, fields) => write('debug', msg, fields),
    info: (msg, fields) => write('info', msg, fields),
    warn: (msg, fields) => write('warn', msg, fields),
    error: (msg, fields) => write('error', msg, fields),
  };
}

/** A logger that drops everything (tests). */
export const silentLogger: Logger = createLogger('error', () => {});
