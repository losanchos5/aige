// Placeholders: everything a translator must not touch (inline code, URLs and
// link targets, [n] citation markers, HTML, autolinks, entities, backslash
// escapes) is swapped for a numbered token {1}, {2}, ... before a segment is
// sent, and swapped back after. Any literal "{n}" already in the text is itself
// protected first, so every "{n}" the model sees is one of ours.

const ASCII_PUNCT = new Set('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split(''));
const CITE_RUN_RE = /^(?:\[\d+(?:\s*[-–,]\s*\d+)*\])+/;
const AUTOLINK_RE = /^<[A-Za-z][A-Za-z0-9+.-]{1,31}:[^\s<>]*>/;
const EMAIL_AUTOLINK_RE = /^<[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*>/;
const HTML_TAG_RE = /^<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\/?>/;
const HTML_COMMENT_RE = /^<!--[\s\S]*?-->/;
const ENTITY_RE = /^&(?:#\d{1,7}|#[xX][0-9A-Fa-f]{1,6}|[A-Za-z][A-Za-z0-9]{1,31});/;
const BRACE_TOKEN_RE = /^\{[A-Za-z0-9_.]+\}/;
const BARE_URL_RE = /^(?:https?:\/\/|www\.)[^\s<>]*/;

export const PLACEHOLDER_RE = /\{(\d+)\}/g;
/** A citation marker cluster as written in the content: [3], [3][4], [3, 4], [3-5]. */
export const CITATION_RE = /\[\d+(?:\s*[-–,]\s*\d+)*\](?!\()/g;

/**
 * Protect a Markdown inline string.
 * @returns {{ text: string, map: string[], linkTargets: number[] }}
 *   `map[k - 1]` is the original of placeholder `{k}`; `linkTargets` lists the
 *   placeholders that stand for a link destination (they must stay inside `](...)`).
 */
export function protect(input) {
  const map = [];
  const linkTargets = [];
  const add = (s) => {
    map.push(s);
    return `{${map.length}}`;
  };
  const text = scan(input, add, linkTargets);
  return { text, map, linkTargets };
}

function scan(s, add, linkTargets) {
  let out = '';
  let i = 0;
  const n = s.length;
  while (i < n) {
    const c = s[i];
    const rest = s.slice(i);

    if (c === '\\' && i + 1 < n && ASCII_PUNCT.has(s[i + 1])) {
      out += add(s.slice(i, i + 2));
      i += 2;
      continue;
    }

    if (c === '`') {
      let k = 0;
      while (s[i + k] === '`') k++;
      const fence = '`'.repeat(k);
      let j = i + k;
      let close = -1;
      while (j < n) {
        const at = s.indexOf(fence, j);
        if (at === -1) break;
        let run = 0;
        while (s[at + run] === '`') run++;
        if (run === k) {
          close = at;
          break;
        }
        j = at + run;
      }
      if (close !== -1) {
        out += add(s.slice(i, close + k));
        i = close + k;
      } else {
        out += fence;
        i += k;
      }
      continue;
    }

    if (c === '<') {
      const m = HTML_COMMENT_RE.exec(rest) || AUTOLINK_RE.exec(rest) || EMAIL_AUTOLINK_RE.exec(rest) || HTML_TAG_RE.exec(rest);
      if (m) {
        out += add(m[0]);
        i += m[0].length;
        continue;
      }
    }

    if (c === '!' && s[i + 1] === '[') {
      const link = matchLink(s, i + 1);
      if (link) {
        // Images are rare in the content: protect them whole.
        out += add(s.slice(i, link.end));
        i = link.end;
        continue;
      }
    }

    if (c === '[') {
      const link = matchLink(s, i);
      if (link) {
        const inner = scan(s.slice(i + 1, link.textEnd), add, linkTargets);
        const ph = add(s.slice(link.destStart, link.destEnd));
        linkTargets.push(Number(ph.slice(1, -1)));
        out += `[${inner}](${ph})`;
        i = link.end;
        continue;
      }
      const cite = CITE_RUN_RE.exec(rest);
      if (cite && s[i + cite[0].length] !== '(') {
        out += add(cite[0]);
        i += cite[0].length;
        continue;
      }
    }

    if ((c === 'h' || c === 'w') && (i === 0 || !/[A-Za-z0-9]/.test(s[i - 1]))) {
      const m = BARE_URL_RE.exec(rest);
      if (m) {
        const url = trimUrl(m[0]);
        if (url.length > 8) {
          out += add(url);
          i += url.length;
          continue;
        }
      }
    }

    if (c === '{') {
      const m = BRACE_TOKEN_RE.exec(rest);
      if (m) {
        out += add(m[0]);
        i += m[0].length;
        continue;
      }
    }

    if (c === '&') {
      const m = ENTITY_RE.exec(rest);
      if (m) {
        out += add(m[0]);
        i += m[0].length;
        continue;
      }
    }

    out += c;
    i++;
  }
  return out;
}

/** Trailing punctuation is prose, not URL; an unbalanced ")" closes a parenthesis. */
function trimUrl(url) {
  let u = url;
  for (;;) {
    const last = u[u.length - 1];
    if (/[.,;:!?'"*_]/.test(last)) {
      u = u.slice(0, -1);
      continue;
    }
    if (last === ')') {
      const open = (u.match(/\(/g) || []).length;
      const close = (u.match(/\)/g) || []).length;
      if (close > open) {
        u = u.slice(0, -1);
        continue;
      }
    }
    return u;
  }
}

/**
 * An inline link starting at `start` ("["): balanced brackets for the text,
 * then "(" destination ")" with balanced parentheses.
 */
function matchLink(s, start) {
  let depth = 0;
  let i = start;
  let textEnd = -1;
  while (i < s.length) {
    const c = s[i];
    if (c === '\\') {
      i += 2;
      continue;
    }
    if (c === '`') {
      let k = 0;
      while (s[i + k] === '`') k++;
      const close = s.indexOf('`'.repeat(k), i + k);
      i = close === -1 ? i + k : close + k;
      continue;
    }
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        textEnd = i;
        break;
      }
    }
    i++;
  }
  if (textEnd === -1 || s[textEnd + 1] !== '(') return null;
  let p = textEnd + 2;
  let pd = 1;
  while (p < s.length) {
    const c = s[p];
    if (c === '\\') {
      p += 2;
      continue;
    }
    if (c === '(') pd++;
    else if (c === ')') {
      pd--;
      if (pd === 0) break;
    } else if (c === '\n') return null;
    p++;
  }
  if (pd !== 0) return null;
  return { textEnd, destStart: textEnd + 2, destEnd: p, end: p + 1 };
}

/** Put the originals back. Unknown placeholders are left as they are (validation reports them). */
export function restore(text, map) {
  return text.replace(PLACEHOLDER_RE, (m, k) => {
    const v = map[Number(k) - 1];
    return v === undefined ? m : v;
  });
}

/** The placeholder numbers in a protected string, in order of appearance. */
export function placeholdersIn(text) {
  return [...text.matchAll(PLACEHOLDER_RE)].map((m) => Number(m[1]));
}

/** How many [n] citation markers a (restored) Markdown string carries. */
export function countCitations(text) {
  let count = 0;
  for (const m of text.matchAll(CITATION_RE)) count += (m[0].match(/\d+/g) || []).length;
  return count;
}
