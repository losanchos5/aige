// obligation-title.ts: the heading and the short title of an obligation page,
// shared by the page (src/pages/obligations/[id].astro) and its Open Graph card
// (src/pages/og/obligations/[id].png.ts), so the card renders exactly the page
// title and the page's og:image:alt (the title) describes it.
//
// Every string here is assembled from the register row and its framework
// (src/data/frameworks.ts); nothing is written by hand:
// - `obligationHeading` is the row's own name, qualified with its instrument
//   when the name does not say it ("MAP" -> "NIST AI RMF MAP", "AIBOM" ->
//   "OWASP AIBOM"), so the H1 never collides with a glossary term (audit F14).
// - `instrumentClause` joins the instrument's short name and the clause without
//   the stutter of a clause that restates it ("Brazil LGPD" + "LGPD Art. 20" ->
//   "Brazil LGPD Art. 20"; audit F4 / C9).
// - `obligationShortTitle` fits the heading into the title budget: it drops a
//   trailing parenthesis, then cuts at a comma, then on a word boundary with
//   "…", never mid-word and never on a dangling ":" or "and".
import { obligations, type Obligation } from '../data/frameworks';
import { frameworkOf } from './obligations';
import {
  closeSentence,
  DESCRIPTION_MAX,
  leadDescription,
  sentences,
  shortenSentence,
  withoutAsides,
} from './lead-sentence';

/** Title budget. Seo keeps its " · AI Governance Engineer" suffix only while the
 *  whole title stays within 60 characters, so a 60-character title stands alone. */
export const OBLIGATION_TITLE_MAX = 60;

const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

/** A word without surrounding brackets, quotes or trailing punctuation, lower case. */
const norm = (word: string): string =>
  word.toLowerCase().replace(/^[("'“[]+/, '').replace(/[)"'”\].,:;]+$/, '');

/** True when `token` (from a short name) is one of `text`'s words, hyphenated
 *  parts included ("AI" in "AI-Generated"); tokens of four or more letters also
 *  match as an abbreviation ("Algo." in "Algorithmic"). */
function hasWord(text: string, token: string): boolean {
  const t = norm(token);
  if (!t) return false;
  return words(text)
    .flatMap((w) => [w, ...w.split('-')])
    .map(norm)
    .some((w) => w === t || (t.length >= 4 && w.startsWith(t)));
}

/** "<instrument> <clause>" without repeating the words they share. */
export function instrumentClause(row: Obligation): string {
  const short = words(frameworkOf(row).short);
  const clause = words(row.clause);
  // The clause opens with the tail of the short name: keep one copy.
  for (let k = Math.min(short.length, clause.length); k > 0; k--) {
    const tail = short.slice(-k).map(norm).join(' ');
    const head = clause.slice(0, k).map(norm).join(' ');
    if (tail === head) return [...short.slice(0, -k), ...clause].join(' ');
  }
  // The clause already names the whole instrument ("ISO/IEC 42006:2025").
  const lower = row.clause.toLowerCase();
  if (short.every((token) => lower.includes(norm(token)))) return row.clause;
  return `${short.join(' ')} ${row.clause}`;
}

/** True when the row's name already says which instrument it belongs to. */
function namesInstrument(row: Obligation): boolean {
  const fw = frameworkOf(row);
  const own = words(row.obligation).map(norm);
  return [words(fw.short)[0], words(fw.name)[0]].some(
    (token) => token !== undefined && own.includes(norm(token)),
  );
}

/**
 * The visible name of an obligation (the page's H1): the register's name when it
 * names its instrument, otherwise that name behind the instrument's short name,
 * minus the trailing words of the short name the obligation repeats ("OWASP
 * Agentic" + "Top 10 for Agentic Applications 2026" -> "OWASP Top 10 for ...").
 * A name that is the start of its clause label ("Transparency" for "Transparency
 * chapter") takes the fuller label.
 */
export function obligationHeading(row: Obligation): string {
  if (namesInstrument(row)) return row.obligation;
  const short = words(frameworkOf(row).short);
  const found = short.findIndex((token) => hasWord(row.obligation, token));
  const prefix = (found > 0 ? short.slice(0, found) : found === 0 ? [] : short).join(' ');
  const body = row.clause.toLowerCase().startsWith(row.obligation.toLowerCase())
    ? row.clause
    : row.obligation;
  return prefix ? `${prefix} ${body}` : body;
}

const DANGLING =
  /(?:\s+(?:and|or|of|for|the|with|to|in|on|a|an|by|incl\.?|including|as|at|from|that|which|whose|about|within|without|outside|before|after|under|into|over|against|per|via|between|across|than|subject|kept|Arts?\.))+$/i;

/** Places a name can stop and still be a whole noun phrase: before a comma or a
 *  semicolon, before "and" / "or", or before a word that opens a qualifier (a
 *  preposition, a relative pronoun or an -ing participle: "... data in bias
 *  detection", "... policy honouring ..."). */
const PHRASE_BREAK =
  /(?<list>[,;]\s|\s(?=(?:and|or)\s))|\s(?=(?:with|within|without|for|of|in|on|by|that|which|to|under|from|at|against|as|via|into|per|after|before|about|outside|beyond|during|between|across|over|through|including|incl\.|where|when|while)\s)|(?<participle>\s(?=[a-z]+ing\s(?!(?:and|or)\s)))/g;

/** `text` without trailing punctuation or dangling connectives ("... logs kept"). */
function trimEnd(text: string): string {
  let out = text;
  for (let prev = ''; prev !== out; ) {
    prev = out;
    out = out.replace(/[\s,;:–-]+$/, '').replace(DANGLING, '');
  }
  return out;
}

const balanced = (text: string): boolean => text.split('(').length === text.split(')').length;

/**
 * `text` and every whole phrase it opens with, longest first: the cuts before a
 * PHRASE_BREAK that leave no dangling word or half-open bracket, and no list
 * whose last item lost its noun: a cut keeps at least two words of the last
 * item it ends on, so "fake and concealed reviews" never becomes "fake" nor
 * "autonomy, tool use and loss of control" becomes "... and loss" (a list of
 * single words, "consent and retention", stays whole). `from` keeps the first
 * characters (the instrument and clause) out of the cut.
 */
function phrases(text: string, from = 0): string[] {
  const out = [text];
  for (const match of text.matchAll(PHRASE_BREAK)) {
    if ((match.index ?? 0) <= from) continue;
    const head = trimEnd(text.slice(0, match.index));
    if (head.length <= from || !balanced(head)) continue;
    const items = head
      .slice(from)
      .replace(/^[\s:,;]+/, '')
      .split(/[,;]\s|\s(?:and|or)\s/).map(words);
    const last = items[items.length - 1] ?? [];
    if (match.groups?.list !== undefined && last.length < 2) continue;
    if (match.groups?.participle !== undefined && words(head.slice(from)).length < 2) continue;
    if (items.length > 1 && last.length < 2 && !items.every((item) => item.length === 1)) continue;
    out.push(head);
  }
  return [...new Set(out)].sort((a, b) => b.length - a.length);
}

/** A clause reference opens here: "Art. 16", "action 3", "Appendix 2", "§5.3". */
const REFERENCE = /^(?:Arts?\.|Articles?|§.*|s\.|Sec\.|Section|[Aa]ctions?|Commitment|Appendix|Annex|Principle|para\.)$/;

/** The heading's prefix with its instrument written as the framework's short
 *  name ("Council of Europe Convention Art. 16" -> "CoE Convention Art. 16"). */
function shortPrefix(prefix: string, shortName: string): string | undefined {
  const tokens = words(prefix);
  const at = tokens.findIndex((token, i) => i > 0 && REFERENCE.test(token));
  if (at <= 0) return undefined;
  const instrument = tokens.slice(0, at).join(' ');
  // Same instrument, or a short name that already ends in the reference word
  // ("OECD AI Principles" + "Principle 1.4(b)").
  const lastShort = norm(words(shortName).pop() ?? '');
  if (instrument === shortName || lastShort.startsWith(norm(tokens[at]))) return undefined;
  return `${shortName} ${tokens.slice(at).join(' ')}`;
}

/** A heading split into the instrument and clause it opens with and the topic
 *  after them: at its first ": ", else at the first lower-case word that is not
 *  part of the name ("and 25", "of Europe", "for Labelling"). */
function splitHeading(heading: string): { prefix: string; topic: string } {
  const colon = heading.indexOf(': ');
  if (colon > 0) return { prefix: heading.slice(0, colon), topic: heading.slice(colon + 2) };
  const tokens = heading.split(' ');
  for (let i = 1; i < tokens.length; i++) {
    if (!/^[a-z]/.test(tokens[i])) continue;
    if (/^(?:and|or|to|of|for|with)$/.test(tokens[i]) && /^[A-Z0-9(§]/.test(tokens[i + 1] ?? '')) continue;
    return { prefix: tokens.slice(0, i).join(' '), topic: tokens.slice(i).join(' ') };
  }
  return { prefix: heading, topic: '' };
}

const wordCount = (text: string): number => words(text).length;

/**
 * Complete titles for a heading, best first, each within `max` characters and
 * none cut mid-phrase or ending in "…" (audit ONPAGE N2): the heading itself;
 * without its trailing parenthesis; before a "; " aside; then the instrument
 * and clause, as the heading names them or as `instrumentClause` shortens them,
 * with as much of the topic as fits ("China PIPL Art. 24: automated
 * decision-making"); then the heading's own opening phrase; then the
 * instrument and clause alone.
 */
export function titleCandidates(
  heading: string,
  names: { clauseLabel?: string; shortName?: string } = {},
  max = OBLIGATION_TITLE_MAX,
): string[] {
  const { clauseLabel, shortName } = names;
  const out: string[] = [];
  const fits = (text: string) => text.length <= max;
  // 1. Drop a trailing parenthesis: "(voluntary)", "(in force 2023-01-10)".
  const bare = heading.replace(/\s*\([^()]*\)$/, '');
  out.push(heading, bare);
  // 2. Cut before a semicolon or an ", incl." aside (a plain comma usually
  //    splits a list, so it is not a clean place to stop).
  const stop = Math.max(bare.lastIndexOf('; ', max), bare.lastIndexOf(', incl. ', max));
  if (stop >= 30 && balanced(bare.slice(0, stop))) out.push(bare.slice(0, stop));
  // 3. "<instrument clause>: <topic phrase>", the variant that keeps the most
  //    words of the topic first; the heading's own wording wins a tie.
  const { prefix, topic } = splitHeading(bare);
  if (topic) {
    const short = shortName ? shortPrefix(prefix, shortName) : undefined;
    const labels = [...new Set([prefix, short, clauseLabel].filter((l): l is string => !!l))];
    const ranked: { title: string; kept: number; rank: number }[] = [];
    labels.forEach((label, rank) => {
      const joiner = label.includes(':') ? ' ' : ': ';
      // A reference the label already carries ("§5.3") is not repeated in the topic.
      const own = new Set(words(label).map(norm));
      const rest = words(topic);
      const last = () => rest[rest.length - 1];
      while (rest.length > 1 && /[\d§]/.test(last()) && own.has(norm(last()))) rest.pop();
      const phrase = phrases(rest.join(' ')).find((p) => fits(`${label}${joiner}${p}`));
      if (phrase) ranked.push({ title: `${label}${joiner}${phrase}`, kept: wordCount(phrase), rank });
    });
    ranked.sort((a, b) => b.kept - a.kept || a.rank - b.rank);
    out.push(...ranked.map((r) => r.title));
  }
  // 4. The heading's opening phrase: "China Measures for Labelling AI-Generated
  //    Synthetic Content" (before "with GB 45438-2025").
  out.push(...phrases(bare, topic ? prefix.length : 0).filter((p) => p.length >= 20));
  // 5. The instrument and clause alone.
  if (clauseLabel) out.push(clauseLabel, clauseLabel.replace(/\s*\([^()]*\)$/, ''));
  if (topic) out.push(prefix);
  return [...new Set(out.filter(fits))];
}

/** Fit `text` into `max` characters: the best complete title, never with "…".
 *  Falls back to the text's first `max` characters on a word boundary only if
 *  no phrase fits, which no register row does (tests/seo-templates.spec.ts). */
export function fitTitle(text: string, max = OBLIGATION_TITLE_MAX): string {
  const [best] = titleCandidates(text, {}, max);
  if (best) return best;
  const boundary = text.lastIndexOf(' ', max);
  return trimEnd(text.slice(0, boundary > 0 ? boundary : max));
}

/**
 * Rows whose heading has no cut that reads as a whole phrase within the budget
 * (the cut would end on "subject", "fake", "Basic" or drop the instrument's own
 * name), or whose only cuts drop part of what the row covers (a qualifier such
 * as "it controls", a second duty such as "exit plans"; audit CONTENT N-R3-3).
 * Each is the row's heading shortened by hand, in its own words; the
 * tests hold them to the same rules (within 60 characters, no "…", unique).
 */
const TITLE_OVERRIDES: Readonly<Record<string, string>> = {
  'AIGE-OBL-EUAIA-ART26-4': 'EU AI Act Art. 26(4): representative input data it controls',
  'AIGE-OBL-EUAIA-ART26-11': 'EU AI Act Art. 26(11): informing people of Annex III AI use',
  'AIGE-OBL-KR-ART31-1': 'Korea AI Act Art. 31(1): notice of high-impact or GenAI',
  'AIGE-OBL-DORA-ART28': 'DORA Art. 28(3), 28(8): ICT third-party register, exit plans',
  'AIGE-OBL-ISO22989-CONCEPTS': 'ISO/IEC 22989:2022 AI concepts and terminology',
  'AIGE-OBL-USCA-CPPA-ADMT': 'California CPPA regulations on automated decisionmaking',
  'AIGE-OBL-SG-GENAI': 'Singapore IMDA Model AI Governance Framework for GenAI',
  'AIGE-OBL-SG-AGENTIC-IDENTITY': 'Singapore agentic AI framework: identity and authorisations',
  'AIGE-OBL-UK-DMCC-S225': 'UK DMCC Act 2024: fake and concealed-incentive reviews',
  'AIGE-OBL-CN-GBT45654': 'GB/T 45654-2025: security requirements for generative AI',
  'AIGE-OBL-CN-ANTHRO': 'China Measures for Anthropomorphic Interaction Services',
  'AIGE-OBL-OECD-P1-4B': 'OECD AI Principle 1.4(b): override, repair or decommission',
  'AIGE-OBL-OECD-P1-5': 'OECD AI Principle 1.5(b)–(c): traceability, risk management',
  // Audit CONTENT N-R3-3: the automatic cut narrowed these three ("software
  // updates" only; Arts. 5–7 without Annex I; the model without its subject).
  'AIGE-OBL-PLD-ART11-2': 'EU PLD Art. 11(2): later defects in software it controls',
  'AIGE-OBL-UCPD-ART5-7': 'UCPD Arts. 5–7, Annex I: unfair practices and fake reviews',
  'AIGE-OBL-UK-ADM': 'UK GDPR Arts. 22A–22D: permission plus safeguards for ADM',
};

let titles: Map<string, string> | undefined;

/** Short titles for every row, unique: a row whose best title another row also
 *  takes moves to its next candidate that nobody else has. */
function allTitles(): Map<string, string> {
  if (titles) return titles;
  const options = new Map(
    obligations.map((row) => {
      const list = [
        ...(TITLE_OVERRIDES[row.id] ? [TITLE_OVERRIDES[row.id]] : []),
        ...titleCandidates(obligationHeading(row), {
          clauseLabel: instrumentClause(row),
          shortName: frameworkOf(row).short,
        }),
      ];
      return [row.id, list.length ? list : [fitTitle(obligationHeading(row))]];
    }),
  );
  const chosen = new Map([...options].map(([id, list]) => [id, 0]));
  for (let changed = true; changed; ) {
    changed = false;
    const counts = new Map<string, number>();
    for (const [id, i] of chosen) {
      const title = options.get(id)![i];
      counts.set(title, (counts.get(title) ?? 0) + 1);
    }
    for (const [id, i] of chosen) {
      const list = options.get(id)!;
      if ((counts.get(list[i]) ?? 0) > 1 && i < list.length - 1) {
        chosen.set(id, i + 1);
        changed = true;
      }
    }
  }
  titles = new Map([...chosen].map(([id, i]) => [id, options.get(id)![i]]));
  return titles;
}

/** The page's <title> (before Seo's suffix) and the text of its Open Graph card. */
export function obligationShortTitle(row: Obligation): string {
  return allTitles().get(row.id) ?? fitTitle(obligationHeading(row));
}

/** Path of the obligation's Open Graph card. */
export function obligationOgPath(row: Pick<Obligation, 'id'>): string {
  return `/og/obligations/${row.id.toLowerCase()}.png`;
}

/** When the row applies, as one sentence, from its date and status. */
function appliesSentence(row: Obligation): string | undefined {
  const date = row.appliesFrom;
  switch (row.appliesStatus) {
    case 'in-force':
      return date ? `In force since ${date}.` : 'In force.';
    case 'grace':
      return date ? `In force since ${date}, with a grace period.` : 'In force, with a grace period.';
    case 'applies-later':
      return date ? `Applies from ${date}.` : undefined;
    case 'deferred':
      return date ? `Applies from ${date} (deferred).` : 'Deferred.';
    case 'voluntary':
      return date ? `Voluntary; applies from ${date}.` : 'Voluntary.';
    case 'pending':
      return 'Draft or proposed.';
  }
}

/**
 * The page's meta description (audit ONPAGE N1 / N6, CONTENT C16): the
 * instrument and clause, what the row requires (its opening clauses, whole),
 * when it applies, then the evidence artefact while the snippet is short. The
 * heading stands in for a requirement with no whole clause short enough.
 */
export function obligationDescription(row: Obligation): string {
  // The artefact's items are separated by "; " only: a comma sits inside an
  // item ("eval by sex, race/ethnicity and intersectional category", "step:
  // model, prompt, policy ..."), so a cut there would drop part of the duty
  // (audit ONPAGE N3-3). All the items as "Evidence: ...", else the longest
  // run of whole items as "Evidence includes: ...", else no evidence sentence.
  // Each may drop a parenthetical aside that does not restrict it ("(physical
  // or digital)"), never a word of the list.
  const items = row.artefact.split(/;\s/);
  const lower = (text: string) => text.replace(/^([A-Z])(?=[a-z])/, (c) => c.toLowerCase());
  const evidence = items.flatMap((_, i) => {
    const run = items.slice(0, items.length - i).join('; ');
    const sentence = (text: string) =>
      closeSentence(`${i === 0 ? 'Evidence' : 'Evidence includes'}: ${lower(text)}`);
    const bare = withoutAsides(run);
    return bare !== undefined && bare !== run ? [sentence(run), sentence(bare)] : [sentence(run)];
  });
  // An ", incl. ..." aside in a requirement is often the operative part ("a
  // policy to comply with Union copyright law, incl. identifying and complying
  // with reservations of rights"): when the whole first sentence does not fit
  // behind the label, the heading leads instead of a cut that drops it.
  const [first = ''] = sentences(row.requirement);
  const label = instrumentClause(row);
  const lead = shortenSentence(first, DESCRIPTION_MAX - label.length - 2);
  const inclCut = lead !== undefined && /,\s+incl\.\s/.test(first) && !/\sincl\.\s/.test(lead);
  const applies = appliesSentence(row);
  return leadDescription(inclCut ? '' : row.requirement, {
    label,
    labelRequired: true,
    fallback: obligationHeading(row),
    always: applies ? [applies] : [],
    extras: [evidence, 'From the AI governance obligation register.'],
  });
}
