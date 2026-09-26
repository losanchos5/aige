// obligation-title.ts: the heading and the short title of an obligation page,
// shared by the page (src/pages/obligations/[id].astro) and its Open Graph card
// (src/pages/og/obligations/[id].png.ts), so the card renders exactly the page
// title and the page's og:image:alt (the title) describes it.
//
// Every string here is assembled from the register row and its framework
// (src/data/frameworks.ts), except the few titles and description leads
// shortened by hand in the row's own words (TITLE_OVERRIDES, DESCRIPTION_LEADS):
// - `obligationHeading` is the row's own name, qualified with its instrument
//   when the name does not say it ("MAP" -> "NIST AI RMF MAP", "AIBOM" ->
//   "OWASP AIBOM"), so the H1 never collides with a glossary term (audit F14),
//   with a colon between the reference and the duty (audit ONPAGE O-3).
// - `instrumentClause` joins the instrument's short name and the clause without
//   the stutter of a clause that restates it ("Brazil LGPD" + "LGPD Art. 20" ->
//   "Brazil LGPD Art. 20"; audit F4 / C9).
// - `obligationShortTitle` fits the heading into the title budget: it drops a
//   trailing parenthesis, then cuts at a comma, then on a word boundary with
//   "…", never mid-word and never on a dangling ":" or "and".
import { obligations, type Obligation } from '../data/frameworks';
import { frameworkOf } from './obligations';
import {
  appendSentences,
  closeSentence,
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
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
 * chapter") takes the fuller label. A colon then separates the instrument and
 * clause from the duty (headingWithSeparator).
 */
export function obligationHeading(row: Obligation): string {
  return headingWithSeparator(namedHeading(row), row);
}

/** Words that join the parts of a name ("Council of Europe", "Provisions on
 *  Deep Synthesis", "Measures for Labelling ... with GB 45438-2025"). */
const NAME_JOINER = /^(?:and|or|of|for|on|to|with|&)$/;

/**
 * `heading` as "<instrument and clause>: <duty>", the form the short titles
 * take (audit ONPAGE O-3: "EU AI Act Art. 9 risk management system" ran the
 * reference and the duty together). The reference ends after the row's clause
 * where the heading quotes it ("EU AI Act Art. 9"), else after the number of
 * its first article or section ("New York GBL Article 47", "FTC Act s. 5"),
 * else before the first lower-case word that does not join a name ("NYC Local
 * Law 144", "Title VII"). A heading that is a name with no duty after it ("NIST
 * AI RMF GOVERN", "GPAI Code Transparency chapter", "China Provisions on Deep
 * Synthesis (in force ...)") stays as it is, and so does one whose cut would
 * fall inside the instrument's short name ("Utah AI | disclosure duties").
 */
function headingWithSeparator(heading: string, row: Obligation): string {
  if (heading.includes(': ')) return heading;
  const join = (at: number): string => {
    const reference = heading.slice(0, at).trimEnd();
    const duty = heading.slice(at).trimStart();
    if (!duty || /^[([]/.test(duty) || row.clause.endsWith(duty)) return heading;
    const short = frameworkOf(row).short;
    if (heading.startsWith(`${short} `) && reference.length < short.length) return heading;
    return `${reference}: ${duty}`;
  };
  // 1. After the clause, where the heading quotes it whole.
  const quoted = heading.indexOf(`${row.clause} `);
  if (quoted >= 0 && (quoted === 0 || heading[quoted - 1] === ' ')) {
    return join(quoted + row.clause.length);
  }
  // 2. After an article's or a section's number; 3. before the duty's first word.
  const tokens = heading.split(' ');
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (REFERENCE.test(token) && tokens[i + 1] !== undefined) {
      return join(tokens.slice(0, i + 2).join(' ').length);
    }
    if (token.startsWith('(')) return heading;
    if (!/^[a-z]/.test(token)) continue;
    if (NAME_JOINER.test(token) && /^[A-Z0-9(§]/.test(tokens[i + 1] ?? '')) continue;
    return join(tokens.slice(0, i).join(' ').length);
  }
  return heading;
}

/** The heading as the register names it, before the separator is placed. */
function namedHeading(row: Obligation): string {
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
      // A heading that only the separator's colon puts over the budget keeps
      // every word without it ("EU AI Act Art. 20 corrective actions and duty
      // of information"), rather than lose its last duty to the cut.
      const heading = obligationHeading(row);
      const named = namedHeading(row);
      const whole = heading.length > OBLIGATION_TITLE_MAX && named.length <= OBLIGATION_TITLE_MAX;
      const list = [
        ...(TITLE_OVERRIDES[row.id] ? [TITLE_OVERRIDES[row.id]] : []),
        ...(whole ? [named] : []),
        ...titleCandidates(heading, {
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
  // Who the duty binds, from the register, in place of the old "From the AI
  // governance obligation register." padding, which said nothing about the
  // duty (audit CONTENT C-3).
  const holder = row.dutyHolder ?? row.scope;
  const extras = [evidence, ...(holder ? [`Duty holder: ${lower(holder)}.`] : [])];
  const own = DESCRIPTION_LEADS[row.id];
  if (own) {
    return appendSentences(appendSentences(own, applies ? [applies] : [], Infinity), extras, DESCRIPTION_MIN);
  }
  const build = (fallback: string) =>
    leadDescription(inclCut ? '' : row.requirement, {
      label,
      labelRequired: true,
      fallback,
      always: applies ? [applies] : [],
      extras,
    });
  // The heading leads with its colon, unless that one character costs an
  // evidence item the heading without it keeps.
  const separated = build(obligationHeading(row));
  const named = build(namedHeading(row));
  return named.length > separated.length + 1 ? named : separated;
}

/**
 * Rows whose requirement has no opening that fits behind its label, so the
 * generated snippet fell back to the heading and a date and named no duty
 * (audit CONTENT C-3: "NYC Local Law 144 automated employment decision tools.
 * In force since 2023-07-05." said nothing of the bias audit). Each is the
 * row's requirement shortened by hand, in its own words: who must do what,
 * under which instrument, keeping every qualifier that limits the duty ("to
 * the extent it controls", "where feasible", "known identical copies"); a
 * procedural detail the page states in full (a retention period, "Art. 73(2)
 * to (9) applying mutatis mutandis") may go. The tests hold them to the other
 * descriptions' rules (110 to 158 characters, whole sentences).
 */
export const DESCRIPTION_LEADS: Readonly<Record<string, string>> = {
  'AIGE-OBL-EUAIA-ART18':
    'EU AI Act Art. 18: providers keep technical and QMS documentation, notified-body changes and decisions and the EU declaration for authorities for 10 years.',
  'AIGE-OBL-EUAIA-ART26-4':
    'EU AI Act Art. 26(4): to the extent it controls the input data, a deployer ensures they are relevant and sufficiently representative for the intended purpose.',
  'AIGE-OBL-EUAIA-ART26-7':
    "EU AI Act Art. 26(7): before putting a high-risk system into service at work, employer deployers inform workers' representatives and the affected workers.",
  'AIGE-OBL-EUAIA-ART26-11':
    'EU AI Act Art. 26(11): deployers of Annex III systems that make or assist decisions about natural persons tell those persons they are subject to the system.',
  'AIGE-OBL-EUAIA-ART73-6':
    'EU AI Act Art. 73(6): providers investigate a serious incident without delay and alter nothing that may affect evaluating causes before informing authorities.',
  'AIGE-OBL-EUAIA-ART75-1A':
    "EU AI Act Art. 75(1a): providers of high-risk systems under the AI Office's exclusive competence report serious incidents to the AI Office.",
  'AIGE-OBL-GDPR-ART15-1H':
    'GDPR Art. 15(1)(h): on request, confirm automated decision-making and give meaningful information on the logic, significance and envisaged consequences.',
  'AIGE-OBL-GDPR-ART15-17-21':
    'GDPR Arts. 15–17 and 21: access, rectification, erasure and objection requests reach every place the data lives, incl. the model where it holds personal data.',
  'AIGE-OBL-GDPR-ART33-34':
    'GDPR Arts. 33–34: notify the authority without undue delay, within 72 hours where feasible; tell data subjects without undue delay if high risk is likely.',
  'AIGE-OBL-GDPR-ART35-36':
    'GDPR Arts. 35–36: assess the impact before processing likely to result in a high risk, and consult the supervisory authority where residual risk stays high.',
  'AIGE-OBL-PLD-ART4':
    'EU PLD Art. 4(1): software is a product; AI manufacturers are strictly liable for defective systems placed on the market or put into service after 2026-12-09.',
  'AIGE-OBL-OWASP-LLM':
    'OWASP Top 10 for LLM Applications 2026: the LLM threat catalogue, incl. Excessive Agency at #3, met by prompt-injection and output-handling controls.',
  'AIGE-OBL-USCA-SB53-WHISTLE':
    'California SB 53: no gag or retaliation on covered employees who report catastrophic risk; notice of rights; anonymous channels at large frontier developers.',
  'AIGE-OBL-USNYC-LL144':
    'NYC Local Law 144: independent bias audit of automated employment decision tools within a year before use, published summary, candidate and employee notice.',
  'AIGE-OBL-USMN-MCDPA':
    'Minnesota CDPA: a consumer may question a profiling result, be told the reason, review and correct the personal data used and have the decision re-evaluated.',
  'AIGE-OBL-USWA-MHMDA':
    'Washington MHMDA: separate consent to collect and to share consumer health data, incl. algorithm- or ML-derived data, and signed authorisation for any sale.',
  'AIGE-OBL-USFED-TITLE7-703K':
    'Title VII: disparate impact is unlawful unless job-related and consistent with business necessity; a less discriminatory alternative can still be required.',
  'AIGE-OBL-USFED-TAKEITDOWN':
    'TAKE IT DOWN Act: covered platforms remove non-consensual intimate images, incl. AI forgeries, and known identical copies within 48 hours of a valid request.',
  'AIGE-OBL-KR-ART34':
    'Korea AI Act Art. 34: high-impact AI operators need risk management, explanation and user-protection plans, human supervision, and publish the main content.',
  'AIGE-OBL-COE-ART14-2':
    'CoE Convention Art. 14(2)(a)–(b): document information on systems that can significantly affect human rights, enough for affected people to contest decisions.',
};
