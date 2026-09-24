// Normalisation: turn a fetched page into stable text so that only changes a
// reader would notice change the hash. HTML pages are reduced to the text of
// the selected region, with scripts, styles, navigation, cookie banners,
// clock times, timestamps and nonce-like tokens removed. PDFs are not parsed:
// their bytes are hashed and their HTTP validators (ETag, Last-Modified) are
// kept for the issue.
//
// No dependencies: a small tag tokenizer and a simple-selector matcher cover
// what the hints in sources.json need. It is not a full HTML parser; hints
// should select elements that have explicit end tags (div, main, article,
// section, nav, table).

import { createHash } from 'node:crypto';

// Bump when the normalisation output changes for the same input. The monitor
// re-baselines a source silently (no issue) when the stored version differs,
// so a normaliser change never floods the tracker with false changes.
export const NORMALISER_VERSION = 1;

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source',
  'track', 'wbr',
]);

// Elements whose content is never text: skipped wholesale, wherever they are.
const RAW_SKIP_TAGS = new Set(['script', 'style', 'noscript', 'template', 'textarea', 'title']);
const ALWAYS_DROP_TAGS = new Set(['svg', 'iframe', 'object', 'embed', 'canvas', 'video', 'audio', 'math']);

// Removed everywhere: cookie and consent banners are never content.
const ALWAYS_DROP_SELECTORS = [
  '[id*=cookie]', '[class*=cookie]', '[id*=consent]', '[class*=consent]', '[id*=onetrust]',
  '[class*=onetrust]', '[id*=gdpr]', '[id*=cookiebot]',
];

// Page chrome removed when a source has no `select` hint (or its selector no
// longer matches) and the whole body is read instead.
export const BOILERPLATE_SELECTORS = [
  'nav', 'header', 'footer', 'aside', 'form', 'button', 'dialog', 'select',
  '[role=navigation]', '[role=banner]', '[role=contentinfo]', '[role=search]', '[role=dialog]',
  '[aria-hidden=true]', '[class*=breadcrumb]', '[id*=breadcrumb]', '[class*=skip-link]',
  '[class*=share]', '[class*=social]', '[class*=newsletter]', '[class*=back-to-top]',
];

const BLOCK_TAGS = new Set([
  'p', 'div', 'br', 'li', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'table', 'section',
  'article', 'header', 'footer', 'main', 'aside', 'nav', 'blockquote', 'pre', 'dd', 'dt', 'dl',
  'figure', 'figcaption', 'hr', 'form', 'fieldset', 'address', 'details', 'summary', 'caption',
  'thead', 'tbody', 'tfoot', 'legend', 'body',
]);

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ensp: ' ', emsp: ' ', thinsp: ' ',
  ndash: '\u2013', mdash: '\u2014', minus: '\u2212', hellip: '...', lsquo: '\u2018', rsquo: '\u2019',
  ldquo: '\u201c', rdquo: '\u201d', laquo: '\u00ab', raquo: '\u00bb', sbquo: '\u201a', bdquo: '\u201e',
  copy: '\u00a9', reg: '\u00ae', trade: '\u2122', euro: '\u20ac', pound: '\u00a3', sect: '\u00a7',
  para: '\u00b6', middot: '·', bull: '\u2022', deg: '\u00b0', times: '\u00d7', shy: '',
  zwj: '', zwnj: '', lrm: '', rlm: '', eacute: '\u00e9', egrave: '\u00e8', aacute: '\u00e1',
  agrave: '\u00e0', iacute: '\u00ed', oacute: 'ó', uacute: '\u00fa', ntilde: '\u00f1',
  ccedil: '\u00e7', uuml: '\u00fc', ouml: '\u00f6', auml: '\u00e4', szlig: '\u00df',
};

export function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[A-Za-z][A-Za-z0-9]*);/g, (whole, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return whole;
      try {
        return String.fromCodePoint(code);
      } catch {
        return whole;
      }
    }
    const named = NAMED_ENTITIES[body] ?? NAMED_ENTITIES[body.toLowerCase()];
    return named === undefined ? whole : named;
  });
}

// ── Selectors ────────────────────────────────────────────────────────────────
// Supported: tag, #id, .class, [attr], [attr=value], [attr*=value],
// [attr^=value], [attr$=value] and compounds of them (div#main.content[role=main]).
// A comma separates alternatives. No descendant or child combinators.

export function parseSelector(input) {
  return String(input)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map(parseCompound);
}

function parseCompound(text) {
  const out = { tag: null, id: null, classes: [], attrs: [] };
  const re = /([A-Za-z][A-Za-z0-9-]*)|#([A-Za-z0-9_:-]+)|\.([A-Za-z0-9_-]+)|\[\s*([A-Za-z_:][A-Za-z0-9_:.-]*)\s*(?:([*^$]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]*))\s*)?\]/gy;
  let pos = 0;
  while (pos < text.length) {
    re.lastIndex = pos;
    const m = re.exec(text);
    if (!m || m.index !== pos) throw new Error(`Unsupported selector syntax: "${text}"`);
    if (m[1]) {
      if (pos !== 0) throw new Error(`Tag name must come first in selector: "${text}"`);
      out.tag = m[1].toLowerCase();
    } else if (m[2]) out.id = m[2];
    else if (m[3]) out.classes.push(m[3]);
    else out.attrs.push({ name: m[4].toLowerCase(), op: m[5] ?? null, value: m[6] ?? m[7] ?? m[8] ?? '' });
    pos = re.lastIndex;
  }
  return out;
}

function matchesCompound(sel, tag, attrs) {
  if (sel.tag && sel.tag !== tag) return false;
  if (sel.id && attrs.id !== sel.id) return false;
  if (sel.classes.length) {
    const classes = (attrs.class ?? '').split(/\s+/);
    if (!sel.classes.every((c) => classes.includes(c))) return false;
  }
  for (const a of sel.attrs) {
    const v = attrs[a.name];
    if (v === undefined) return false;
    if (a.op === null) continue;
    const have = v.toLowerCase();
    const want = a.value.toLowerCase();
    if (a.op === '=' && have !== want) return false;
    if (a.op === '*=' && !have.includes(want)) return false;
    if (a.op === '^=' && !have.startsWith(want)) return false;
    if (a.op === '$=' && !have.endsWith(want)) return false;
  }
  return true;
}

export function matchesAny(compounds, tag, attrs) {
  return compounds.some((sel) => matchesCompound(sel, tag, attrs));
}

function parseAttributes(raw) {
  const attrs = {};
  const re = /([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const name = m[1].toLowerCase();
    if (!(name in attrs)) attrs[name] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

// ── Tokenizer ────────────────────────────────────────────────────────────────

const TOKEN_RE = /<!--[\s\S]*?(?:-->|$)|<!\[CDATA\[[\s\S]*?(?:\]\]>|$)|<![^>]*>|<\?[\s\S]*?(?:\?>|$)|<(\/?)([A-Za-z][A-Za-z0-9:-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/g;

// Yields { type: 'text', text } | { type: 'open', tag, attrs, selfClosing } | { type: 'close', tag }.
export function* tokenize(html) {
  let pos = 0;
  TOKEN_RE.lastIndex = 0;
  while (pos < html.length) {
    TOKEN_RE.lastIndex = pos;
    const m = TOKEN_RE.exec(html);
    if (!m) {
      yield { type: 'text', text: html.slice(pos) };
      return;
    }
    if (m.index > pos) yield { type: 'text', text: html.slice(pos, m.index) };
    pos = TOKEN_RE.lastIndex;
    if (m[2] === undefined) continue; // comment, doctype, CDATA, processing instruction
    const tag = m[2].toLowerCase();
    if (m[1] === '/') {
      yield { type: 'close', tag };
      continue;
    }
    const selfClosing = m[4] === '/' || VOID_TAGS.has(tag);
    if (RAW_SKIP_TAGS.has(tag) && !selfClosing) {
      // Raw text element: its content is not markup; jump past the end tag.
      const endRe = new RegExp(`</${tag}\\s*>`, 'ig');
      endRe.lastIndex = pos;
      const end = endRe.exec(html);
      pos = end ? endRe.lastIndex : html.length;
      yield { type: 'raw', tag };
      continue;
    }
    yield { type: 'open', tag, attrs: parseAttributes(m[3] ?? ''), selfClosing };
  }
}

// ── Extraction ───────────────────────────────────────────────────────────────

const NL = '\n';

function compileList(list) {
  return (list ?? []).flatMap((s) => parseSelector(s));
}

// Returns { text, matched } where matched is false when `select` was given but
// no element matched it (the body was read instead, minus page chrome).
export function extractText(html, hints = {}) {
  const select = compileList(hints.select);
  const drop = compileList([...ALWAYS_DROP_SELECTORS, ...(hints.drop ?? [])]);
  const boilerplate = compileList(BOILERPLATE_SELECTORS);
  const linkRe = hints.linkPattern ? new RegExp(hints.linkPattern, 'i') : null;
  const tokens = [...tokenize(html)];
  const hasBody = tokens.some((t) => t.type === 'open' && t.tag === 'body');

  const run = (useSelect) => {
    const out = [];
    let inBody = !hasBody; // text before <body> (the head) is never content
    let captureTag = useSelect ? null : '*'; // '*' = keep everything in the body
    let captureNest = 0;
    let skipTag = null;
    let skipNest = 0;
    const links = [];
    const keeping = () => inBody && captureTag !== null;

    for (const t of tokens) {
      if (skipTag) {
        if (t.type === 'open' && t.tag === skipTag && !t.selfClosing) skipNest++;
        else if (t.type === 'close' && t.tag === skipTag && --skipNest === 0) skipTag = null;
        continue;
      }
      if (t.type === 'raw') continue;
      if (t.type === 'text') {
        if (keeping()) out.push(decodeEntities(t.text));
        continue;
      }
      if (t.type === 'open') {
        if (t.tag === 'body') inBody = true;
        const dropIt = ALWAYS_DROP_TAGS.has(t.tag) || matchesAny(drop, t.tag, t.attrs) ||
          (!useSelect && inBody && matchesAny(boilerplate, t.tag, t.attrs));
        if (dropIt) {
          if (!t.selfClosing) {
            skipTag = t.tag;
            skipNest = 1;
          }
          continue;
        }
        if (useSelect && captureTag === null) {
          if (inBody && !t.selfClosing && matchesAny(select, t.tag, t.attrs)) {
            captureTag = t.tag;
            captureNest = 1;
            out.push(NL);
          }
          continue;
        }
        if (useSelect && t.tag === captureTag && !t.selfClosing) captureNest++;
        if (!keeping()) continue;
        if (BLOCK_TAGS.has(t.tag)) out.push(NL);
        if (t.tag === 'a' && !t.selfClosing) links.push(linkRe && t.attrs.href && linkRe.test(t.attrs.href) ? t.attrs.href : null);
        continue;
      }
      // close
      if (useSelect && captureTag !== null && t.tag === captureTag && --captureNest === 0) {
        captureTag = null;
        out.push(NL);
        continue;
      }
      if (!keeping()) continue;
      if (t.tag === 'a') {
        const href = links.pop();
        if (href) out.push(` [${href}]`);
      }
      if (t.tag === 'td' || t.tag === 'th') out.push(' | ');
      if (BLOCK_TAGS.has(t.tag)) out.push(NL);
    }
    return out.join('');
  };

  const attrLines = attributeLines(tokens, hints.attributes);
  const withAttrs = (text) => (attrLines.length ? `${attrLines.join(NL)}${NL}${text}` : text);
  if (select.length) {
    const text = run(true);
    if (text.replace(/\s+/g, '').length > 0) return { text: withAttrs(text), matched: true };
    return { text: withAttrs(run(false)), matched: false };
  }
  return { text: withAttrs(run(false)), matched: true };
}

// "selector@attr" specs: one "selector@attr: value" line per matching element,
// in document order. For pages whose body is loaded by script, where the only
// server-rendered facts sit in attributes (law.go.kr keeps the law name,
// promulgation date and number in hidden inputs).
export function parseAttributeSpec(spec) {
  const at = String(spec).lastIndexOf('@');
  if (at <= 0 || at === spec.length - 1) throw new Error(`Attribute spec must be "selector@attr": "${spec}"`);
  return { spec, selector: parseSelector(spec.slice(0, at)), attr: spec.slice(at + 1).toLowerCase() };
}

function attributeLines(tokens, specs) {
  if (!specs || specs.length === 0) return [];
  const parsed = specs.map(parseAttributeSpec);
  const lines = [];
  for (const p of parsed) {
    for (const t of tokens) {
      if (t.type === 'open' && t.attrs[p.attr] !== undefined && matchesAny(p.selector, t.tag, t.attrs)) {
        lines.push(`${p.spec}: ${t.attrs[p.attr]}`);
      }
    }
  }
  return lines;
}

// ── Text clean-up ────────────────────────────────────────────────────────────

// Volatile fragments replaced by a placeholder. Plain calendar dates stay:
// "Last update 3 August 2026" is a real signal that a page changed.
export const VOLATILE_PATTERNS = [
  // ISO date-times with a clock component.
  [/\b\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?/g, '<timestamp>'],
  // Clock times (09:41, 09:41:07, 9:41 pm, 09:41 CET).
  [/\b\d{1,2}:\d{2}(?::\d{2})?(?:\s?[AaPp]\.?[Mm]\.?)?(?:\s?(?:UTC|GMT|CET|CEST|EET|EEST|EST|EDT|CST|CDT|PST|PDT|KST|JST|Z))?(?![\d:])/g, '<time>'],
  // Relative ages ("3 hours ago").
  [/\b\d+\s+(?:seconds?|minutes?|hours?|days?)\s+ago\b/gi, '<ago>'],
  // Nonce, session and cache-busting tokens: 32+ characters mixing letters and digits.
  [/\b(?=[A-Za-z0-9_-]*\d)(?=[A-Za-z0-9_-]*[A-Za-z])[A-Za-z0-9_-]{32,}\b/g, '<token>'],
];

export function cleanText(raw, hints = {}) {
  let text = raw
    .replace(/\r\n?/g, '\n')
    .replace(/[\u00a0\u2000-\u200a\u202f\u205f\u3000]/g, ' ')
    .replace(/[\u00ad\u200b-\u200d\u2060\ufeff]/g, '');
  for (const [re, repl] of VOLATILE_PATTERNS) text = text.replace(re, repl);
  for (const pattern of hints.strip ?? []) text = text.replace(new RegExp(pattern, 'g'), '');
  const dropLines = (hints.dropLines ?? []).map((p) => new RegExp(p, 'i'));
  return text
    .split('\n')
    .map((line) => line.replace(/[ \t\f\v]+/g, ' ').trim().replace(/^\|\s*/, '').replace(/\s*\|$/, '').trim())
    .filter((line) => line.length > 0 && !dropLines.some((re) => re.test(line)))
    .join('\n');
}

// Bot walls and interstitials: a 200 response that is not the page.
// Not "challenge-platform": Cloudflare injects that script into ordinary pages
// too (nist.gov, csrc.nist.gov), so it does not mark an interstitial.
const CHALLENGE_PATTERNS = [
  /<title>\s*Just a moment\.\.\.\s*<\/title>/i,
  /_cf_chl_opt|cf-browser-verification/i,
  // AWS WAF challenge (served by EUR-Lex with HTTP 202 after repeated requests).
  /AwsWafIntegration|awsWafCookieDomainList|token\.awswaf\.com/,
  /<title>\s*Attention Required!\s*\|\s*Cloudflare/i,
  /<title>\s*Access Denied\s*<\/title>/i,
  /Request unsuccessful\. Incapsula incident/i,
  /<title>\s*Human Verification\s*<\/title>/i,
];

export function looksLikeChallenge(html) {
  return CHALLENGE_PATTERNS.some((re) => re.test(html));
}

export function sha256(data) {
  return createHash('sha256').update(data).digest('hex');
}

export function isPdf(contentType, bytes) {
  if (/application\/pdf/i.test(contentType ?? '')) return true;
  return bytes.length >= 5 && bytes.subarray(0, 5).toString('latin1') === '%PDF-';
}

function charsetOf(contentType) {
  const m = /charset\s*=\s*"?([^";\s]+)/i.exec(contentType ?? '');
  return m ? m[1].toLowerCase() : 'utf-8';
}

export function decodeBody(bytes, contentType) {
  try {
    return new TextDecoder(charsetOf(contentType)).decode(bytes);
  } catch {
    return new TextDecoder('utf-8').decode(bytes);
  }
}

// Normalise one fetched response.
// Returns { kind: 'html', text, sha256, selectMatched } or
// { kind: 'pdf', text: null, sha256, bytes } or throws a NormaliseError.
export class NormaliseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export function normalise({ bytes, contentType }, hints = {}) {
  const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  if (isPdf(contentType, buf)) {
    return { kind: 'pdf', text: null, sha256: sha256(buf), bytes: buf.length, selectMatched: true };
  }
  const html = decodeBody(buf, contentType);
  if (looksLikeChallenge(html)) {
    throw new NormaliseError('blocked', 'The server returned a bot challenge or access-denied page instead of the content');
  }
  const { text: raw, matched } = extractText(html, hints);
  const text = cleanText(raw, hints);
  const minChars = hints.minChars ?? 200;
  if (text.length < minChars) {
    throw new NormaliseError('too-short', `Normalised text is ${text.length} characters, below the minimum of ${minChars}`);
  }
  return { kind: 'html', text, sha256: sha256(text), selectMatched: matched };
}

// Fingerprint of everything that shapes the normalised output for a source.
export function hintsFingerprint(hints = {}) {
  return sha256(JSON.stringify({ v: NORMALISER_VERSION, hints: sortKeys(hints) })).slice(0, 16);
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]));
  }
  return value;
}
