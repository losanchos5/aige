// artefact-chip.ts: trim a full stack artefact sentence (data/stack.ts) down
// to a short, chip-sized head phrase. This is
// a mechanical cut at the first natural break (comma, colon, dash, parenthesis,
// or a relative/prepositional joint) with a word-boundary length cap and a
// trailing stop-word strip, no new wording is introduced.
export function chip(text: string): string {
  const seps = [',', ':', ';', '(', '\u2014', ' that ', ' under ', ' tied ', ' linked '];
  let cut = -1;
  for (const sep of seps) {
    const i = text.indexOf(sep);
    if (i > 0 && (cut === -1 || i < cut)) cut = i;
  }
  let out = (cut > 0 ? text.slice(0, cut) : text).trim();
  const CAP = 32;
  if (out.length > CAP) {
    out = out.slice(0, CAP);
    const sp = out.lastIndexOf(' ');
    if (sp > 8) out = out.slice(0, sp);
  }
  out = out.replace(/[,.\s]+$/, '');
  const stop = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'to', 'and', 'from', 'for', 'with']);
  let words = out.split(' ');
  while (words.length > 1 && stop.has(words[words.length - 1].toLowerCase())) {
    words = words.slice(0, -1);
  }
  return words.join(' ');
}
