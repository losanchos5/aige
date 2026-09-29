/* obligation-lookup-core.js: the matching logic of the "Look up an article" box.
   One source for three readers: the build (src/pages/obligations/lookup.json.ts
   writes each entry's clause keys with it), the browser (served verbatim as
   /obligation-lookup-core.js by src/pages/obligation-lookup-core.js.ts and
   imported by /obligation-lookup.js) and the tests. Pure ES module: no DOM, no
   imports, so it runs the same in all three. */

/** Words a reader puts in front of a clause number; dropped before comparing. */
const PREFIX =
  /^(?:articles?|artículos?|articulos?|artigos?|artikel|arts?|§+|sections?|sec|clauses?|principles?|actions?)\.?(?![a-zÀ-ɏ])\s*/;

/** Splits text into lower-case tokens on spaces, slashes, commas and semicolons. */
export function tokens(text) {
  return String(text || '')
    .toLowerCase()
    .split(/[\s/,;]+/)
    .filter(Boolean);
}

/** An instrument token stripped of dots and hyphens ('iso/iec' → 'iso', 'iec';
    'sb-53' → 'sb53'), so alias matching ignores punctuation. */
function aliasToken(token) {
  return token.replace(/[.\-_\u2013\u2014()]/g, '');
}

/** An alias as the token list the query is matched against. */
export function aliasTokens(alias) {
  return tokens(alias.replace(/[-_\u2013\u2014]/g, ' ')).map(aliasToken).filter(Boolean);
}

/** A clause label reduced to a comparable key: lower case, reading prefixes
    dropped, no spaces, one kind of dash, and a dot kept only between two digits
    so 1.4 never reads as 14, and no hyphen between a letter and a digit
    ('Art. 6(3)–(4)' → '6(3)-(4)', 'A.6' → 'a6', '6.1.2' → '6.1.2',
    'GOVERN 1.6' → 'govern1.6', 'GV-1.1' → 'gv1.1'). */
export function clauseKey(label) {
  let s = String(label || '')
    .toLowerCase()
    .trim();
  let before;
  do {
    before = s;
    s = s.replace(PREFIX, '');
  } while (s !== before);
  return s
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, '')
    .replace(/\.(?!\d)|(?<!\d)\./g, '')
    .replace(/(?<=[a-z])-(?=\d)/g, '');
}

/** Every key a clause label answers to: the whole label, each part of a list
    ('Art. 5(1)(c) and 25' → '5(1)(c)', '25'), each number of a range
    ('Arts. 35–36' → '35', '36') and each part's base number ('5(1)(c)' → '5'). */
export function clauseKeys(label) {
  const keys = new Set();
  const whole = clauseKey(label);
  if (whole) keys.add(whole);
  for (const part of String(label || '').split(/\s+and\s+|\/|,|;/i)) {
    const key = clauseKey(part);
    if (!key) continue;
    keys.add(key);
    const range = key.match(/^(\d+)-(\d+)$/);
    if (range) {
      const from = Number(range[1]);
      const to = Number(range[2]);
      if (to > from && to - from <= 20) {
        for (let n = from; n <= to; n += 1) keys.add(String(n));
      }
    }
    const base = key.match(/^([a-z]*\d+(?:\.\d+)*[a-z]?)\(/);
    if (base) keys.add(base[1]);
  }
  return [...keys];
}

/** Splits a query into an instrument (the longest alias found at its start or,
    failing that, at its end) and the clause text left over.
    @param {string} query
    @param {Array<[string[], string]>} aliases alias token lists with their framework id
    @returns {{ framework: string | null, clause: string }} */
export function parseQuery(query, aliases) {
  const raw = tokens(query);
  const flat = raw.map(aliasToken);
  let best = null;
  for (const [alias, framework] of aliases) {
    const n = alias.length;
    if (!n || n > flat.length) continue;
    const atStart = alias.every((t, i) => flat[i] === t);
    const atEnd = !atStart && alias.every((t, i) => flat[flat.length - n + i] === t);
    // Longest alias wins; at equal length, the one the query starts with.
    if ((atStart || atEnd) && (!best || n > best.n || (n === best.n && atStart && !best.atStart))) {
      best = { n, framework, atStart };
    }
  }
  if (!best) return { framework: null, clause: raw.join(' ') };
  const rest = best.atStart ? raw.slice(best.n) : raw.slice(0, raw.length - best.n);
  return { framework: best.framework, clause: rest.join(' ') };
}

/** Scores one entry against a parsed clause key; 0 means no match. */
function score(entry, key) {
  if (!key) return 1;
  const keys = entry.x || [entry.u];
  if (entry.u === key) return 4;
  if (keys.includes(key)) return 3;
  // A prefix counts only at a boundary, so it cannot be a different number:
  // 'a6' finds 'a6.2.4', '6(3)' finds '6(3)-(4)' and 'govern' finds
  // 'govern1.6', but '1' never finds '14'. It beats the base number below.
  if (entry.u.length > key.length && entry.u.startsWith(key)) {
    const next = entry.u[key.length];
    const last = key[key.length - 1];
    if (!/[a-z0-9]/.test(next) || (/[a-z]/.test(last) && /\d/.test(next))) return 2.5;
  }
  const base = key.match(/^([a-z]*\d+(?:\.\d+)*[a-z]?)\(/);
  if (base && keys.includes(base[1])) return 2;
  return 0;
}

/** Ranks the index against a query and returns at most `limit` entries.
    Exact instrument and clause first; a clause with no instrument searches every
    instrument with the EU AI Act first; an instrument alone lists its rows. An
    obligation page that covers the clause (even inside a range, 'Arts. 35–36'
    for 35) comes before a crosswalk topic that names it exactly.
    @param {{ aliases: Array<[string[], string]>, entries: Array<object> }} index
    @param {string} query */
export function rank(index, query, limit = 8) {
  const { framework, clause } = parseQuery(query, index.aliases);
  let key = clauseKey(clause);
  if (!framework && !key) return [];
  let hits = collect(index, framework, key);
  // Nothing for a sub-clause: fall back to its parent ('a6.2' → 'a6',
  // 'map1' → 'map', '35(1)' → '35', a range '35-36' → '35'), so the reader
  // still lands nearby. With no instrument named, a bare letter ('a' from
  // 'a99') would match the annexes of every instrument: stop there.
  while (!hits.length && key) {
    const parent = key.replace(/(?:\.[a-z0-9]+|\([a-z0-9]+\)|(?<=[a-z])\d+|-[a-z0-9()]+)$/, '');
    if (parent === key || !parent) break;
    if (!framework && /^[a-z]+$/.test(parent)) break;
    key = parent;
    hits = collect(index, framework, key);
  }
  hits.sort((a, b) => b.s - a.s || a.order - b.order);
  const seen = new Set();
  const out = [];
  for (const { entry } of hits) {
    if (seen.has(entry.p)) continue;
    seen.add(entry.p);
    out.push(entry);
    if (out.length >= limit) break;
  }
  return out;
}

/** Every entry of the instrument (or of all) that matches the key, scored. */
function collect(index, framework, key) {
  const hits = [];
  index.entries.forEach((entry, order) => {
    if (framework && entry.f !== framework) return;
    const s = score(entry, key);
    if (!s) return;
    const boost = (entry.k === 'o' ? 1.5 : 0) + (!framework && entry.f === 'eu-ai-act' ? 0.1 : 0);
    hits.push({ entry, s: s + boost, order });
  });
  return hits;
}
