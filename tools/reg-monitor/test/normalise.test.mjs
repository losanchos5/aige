import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  cleanText, decodeEntities, extractText, hintsFingerprint, looksLikeChallenge, normalise,
  NormaliseError, parseAttributeSpec, parseSelector,
} from '../lib/normalise.mjs';

const page = (body, head = '<title>T</title>') => `<!DOCTYPE html><html><head>${head}<script>var x = "<div>not markup</div>";</script></head><body>${body}</body></html>`;
const html = (s) => Buffer.from(s, 'utf8');
const FILLER = 'The provider shall keep the technical documentation up to date. '.repeat(5);

test('strips scripts, styles, comments and head; raw script text is not parsed as markup', () => {
  const { text } = extractText(page('<style>p{color:red}</style><!-- note --><p>Hello <b>world</b></p><script>document.write("<p>injected</p>")</script>'));
  const out = cleanText(text);
  assert.equal(out, 'Hello world');
});

test('select keeps every matching element, in document order', () => {
  const doc = page('<nav>Menu</nav><div id="b">Second</div><main><p>First</p></main><div id="b2">x</div><footer>F</footer>');
  const { text, matched } = extractText(doc, { select: ['main', '#b'] });
  assert.equal(matched, true);
  assert.equal(cleanText(text), 'Second\nFirst');
});

test('select handles nested elements of the same tag', () => {
  const doc = page('<div class="c"><div>one</div><div>two<div>three</div></div></div><div>outside</div>');
  const { text } = extractText(doc, { select: ['.c'] });
  assert.equal(cleanText(text), 'one\ntwo\nthree');
});

test('a select that no longer matches falls back to the body minus page chrome', () => {
  const doc = page('<header>Site header</header><nav><a href="/">Home</a></nav><div class="content"><p>Body text</p></div><footer>Footer</footer><div class="cookie-banner">We use cookies</div>');
  const { text, matched } = extractText(doc, { select: ['#gone'] });
  assert.equal(matched, false);
  assert.equal(cleanText(text), 'Body text');
});

test('cookie and consent banners are dropped even inside the selected region', () => {
  const doc = page('<main><div id="cookie-consent">Accept all</div><p>Article 5</p></main>');
  assert.equal(cleanText(extractText(doc, { select: ['main'] }).text), 'Article 5');
});

test('drop removes elements inside the selection', () => {
  const doc = page('<main><p>Keep</p><div class="views-element-container"><p>Latest news 24 September 2026</p></div></main>');
  assert.equal(cleanText(extractText(doc, { select: ['main'], drop: ['.views-element-container'] }).text), 'Keep');
});

test('linkPattern keeps matching hrefs so a new document version is a change', () => {
  const doc = page('<main><a href="/files/bok-v2.pdf">Body of knowledge</a> and <a href="/about">About</a></main>');
  const out = cleanText(extractText(doc, { select: ['main'], linkPattern: '\\.pdf$' }).text);
  assert.equal(out, 'Body of knowledge [/files/bok-v2.pdf] and About');
});

test('attributes hint reads server-rendered facts from attributes', () => {
  const doc = page('<input type="hidden" id="lsNm" value="Basic Act"><input type="hidden" id="nwYn" value="Y"><div class="pophead"><h2>Law</h2></div>');
  const out = cleanText(extractText(doc, { select: ['.pophead'], attributes: ['#lsNm@value', '#nwYn@value'] }).text);
  assert.equal(out, '#lsNm@value: Basic Act\n#nwYn@value: Y\nLaw');
});

test('volatile fragments become placeholders; calendar dates stay', () => {
  const out = cleanText([
    'Generated 2026-09-24T06:17:03Z',
    'Updated at 09:41 CET',
    'Posted 3 hours ago',
    'nonce 9f8e7d6c5b4a39281706f5e4d3c2b1a0ffeeddcc',
    'Last update 3 August 2026',
  ].join('\n'));
  assert.equal(out, 'Generated <timestamp>\nUpdated at <time>\nPosted <ago>\nnonce <token>\nLast update 3 August 2026');
});

test('the same content with a different nonce, clock time and script hashes the same', () => {
  const a = page(`<main><p>${FILLER}</p><p>Rendered at 10:15:02</p><p>csrf a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8</p></main><script>var t=1</script>`);
  const b = page(`<main><p>${FILLER}</p><p>Rendered at 22:01:59</p><p>csrf ffeeddccbbaa99887766554433221100aabb</p></main><script>var t=2</script>`);
  const ra = normalise({ bytes: html(a), contentType: 'text/html' }, { select: ['main'] });
  const rb = normalise({ bytes: html(b), contentType: 'text/html' }, { select: ['main'] });
  assert.equal(ra.sha256, rb.sha256);
  const c = page(`<main><p>${FILLER}</p><p>Rendered at 10:15:02</p><p>Article 5 now applies from 2 December 2026.</p></main>`);
  assert.notEqual(normalise({ bytes: html(c), contentType: 'text/html' }, { select: ['main'] }).sha256, ra.sha256);
});

test('entities are decoded; non-breaking and zero-width characters are normalised', () => {
  assert.equal(decodeEntities('A&amp;B &#8211; &#x41; &eacute; &unknown;'), 'A&B \u2013 A \u00e9 &unknown;');
  assert.equal(cleanText('Art.\u00a05\u200b(1)'), 'Art. 5(1)');
});

test('table cells are separated and trailing separators trimmed', () => {
  const doc = page('<main><table><tr><td>Art. 5</td><td>2026-12-02</td></tr></table></main>');
  assert.equal(cleanText(extractText(doc, { select: ['main'] }).text), 'Art. 5 | 2026-12-02');
});

test('dropLines and strip hints', () => {
  const out = cleanText('Keep this\nPage views: 1234\nVersion 3 (beta)', { dropLines: ['^Page views'], strip: [' \\(beta\\)'] });
  assert.equal(out, 'Keep this\nVersion 3');
});

test('bot challenges are failures, but an ordinary page carrying the Cloudflare script is not', () => {
  assert.equal(looksLikeChallenge('<html><head><title>Just a moment...</title></head></html>'), true);
  assert.equal(looksLikeChallenge('<script>window.awsWafCookieDomainList = [];</script>'), true);
  assert.equal(looksLikeChallenge(`<main>${FILLER}</main><script src="/cdn-cgi/challenge-platform/scripts/jsd/main.js"></script>`), false);
  assert.throws(
    () => normalise({ bytes: html('<title>Just a moment...</title>'), contentType: 'text/html' }),
    (err) => err instanceof NormaliseError && err.code === 'blocked',
  );
});

test('text below minChars is a failure, not a change', () => {
  assert.throws(
    () => normalise({ bytes: html(page('<main>Error</main>')), contentType: 'text/html' }, { select: ['main'] }),
    (err) => err instanceof NormaliseError && err.code === 'too-short',
  );
  assert.equal(normalise({ bytes: html(page('<main>Short but fine</main>')), contentType: 'text/html' }, { select: ['main'], minChars: 5 }).kind, 'html');
});

test('PDFs are hashed as bytes, by content type or by magic number', () => {
  const bytes = Buffer.concat([Buffer.from('%PDF-1.7\n'), Buffer.from([0, 1, 2, 3])]);
  const byType = normalise({ bytes, contentType: 'application/pdf' });
  const byMagic = normalise({ bytes, contentType: 'application/octet-stream' });
  assert.equal(byType.kind, 'pdf');
  assert.equal(byType.text, null);
  assert.equal(byType.bytes, bytes.length);
  assert.equal(byType.sha256, byMagic.sha256);
});

test('non-UTF-8 charsets are decoded from the content type', () => {
  const latin1 = Buffer.from(`<main>R\u00e9glement ${FILLER}</main>`, 'latin1');
  const out = normalise({ bytes: latin1, contentType: 'text/html; charset=ISO-8859-1' }, { select: ['main'] });
  assert.match(out.text, /^R\u00e9glement/);
});

test('selectors: supported syntax parses, combinators are refused', () => {
  assert.deepEqual(parseSelector('div#a.b[role=main]')[0], { tag: 'div', id: 'a', classes: ['b'], attrs: [{ name: 'role', op: '=', value: 'main' }] });
  assert.equal(parseSelector('nav, footer').length, 2);
  assert.throws(() => parseSelector('main p'));
  assert.throws(() => parseSelector('div > p'));
  assert.throws(() => parseAttributeSpec('#id'));
  assert.deepEqual(parseAttributeSpec('#lsNm@value').attr, 'value');
});

test('the hints fingerprint changes with the hints, not with key order', () => {
  const a = hintsFingerprint({ select: ['main'], minChars: 20 });
  assert.equal(a, hintsFingerprint({ minChars: 20, select: ['main'] }));
  assert.notEqual(a, hintsFingerprint({ select: ['article'], minChars: 20 }));
  assert.notEqual(a, hintsFingerprint(undefined));
});
