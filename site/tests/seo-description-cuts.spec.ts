// seo-description-cuts.spec.ts: a meta description built from a longer text
// (a glossary definition, an obligation's requirement) says what the text says
// (audit ONPAGE R3, CONTENT R6). Round 2 closed cuts at a comma or before a
// qualifier with a full stop, so ~65 descriptions stated something else: "a
// provider ... places it on the market or puts it into service." without
// "under its own name or trademark", a Korean operator "split into development
// business operators." without the second kind.
//
// The rule checked here, on every glossary and obligation page in dist: take
// the description, remove the label in front and the page's own template
// sentences at the end; what is left is the source's own opening, cut only at
// a sentence end, a clause end ("; ", ": ") or before a clause that only adds
// ("which", "such as", "for example", "including" ...), never before a
// qualifier ("unless", "only", "where", "if", "and" ...), nor when the dropped
// rest of the sentence holds one (round 3, /glossary/tdm-exception). A glossary
// term with no such opening has a hand-written summary instead
// (data/glossary-descriptions.ts); since round 3 none is the stock template.
// Pure reads of src data and dist.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { obligations, obligationSlug, type Obligation } from '../src/data/frameworks';
import { getGlossary } from '../src/lib/glossary';
import { instrumentClause, obligationHeading } from '../src/lib/obligation-title';
import { leadDescription, shortenSentence } from '../src/lib/lead-sentence';
import { glossaryDescriptions } from '../src/data/glossary-descriptions';

// Hardcoded on purpose, not imported from lib/lead-sentence.ts: a test that
// imported the rule it checks would pass however the rule drifted.
/** Where the source may continue after the description's lead. */
const BOUNDARY =
  /^(?:[;:]\s|,\s(?:which|such as|e\.g\.|i\.e\.|for example|for instance|including|incl\.|in particular|notably|usually|often|typically|commonly|then|each|as proposed by)\s)/;
/** A qualifier or a list continuation: the lead must not stop right before one. */
const QUALIFIER =
  /^[;:,]\s(?:unless|except|excluding|only|provided|providing|where|wherever|when|whenever|if|save|subject to|other than|as long as|so long as|insofar|to the extent|but|and|or|nor)\b/i;
const ASIDE = /\s+\([^()]*\)/g;
const RESTRICTIVE = /\b(?:unless|except|excluding|only|provided|where|when|if|not|other than|save|subject to|but)\b/i;

const decode = (text: string): string =>
  text
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

const descriptionOf = (file: string): string =>
  decode(/<meta name="description" content="([^"]*)"/.exec(readFileSync(file, 'utf8'))?.[1] ?? '');

/** Citation markers out, whitespace collapsed: the text a description is built from. */
const plain = (text: string): string =>
  text
    .replace(/\s*\[\d+(?:\s*[,–-]\s*\d+)*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** A label lowers the lead's first letter ("The rules" -> "the rules"). */
const lowerFirst = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);

/**
 * Why `lead` is not the opening of `source`, or '' when it is: the source
 * starts with it and continues at a sentence end (the lead keeps the stop), or
 * at a BOUNDARY and not before a QUALIFIER (the lead closes with its own
 * stop). The source without its trailing aside ("(in force ...)" after a
 * heading), or without all its asides when none of them restricts it, counts
 * too.
 */
function unfaithful(lead: string, sourceText: string): string {
  const source = plain(sourceText);
  const variants = [source, source.replace(/\s*\([^()]*\)\.?$/, '')];
  const asides = source.match(ASIDE) ?? [];
  if (!asides.some((aside) => RESTRICTIVE.test(aside))) variants.push(source.replace(ASIDE, ''));
  const l = lowerFirst(lead);
  let why = 'not the opening of its source';
  for (const variant of variants.map(lowerFirst)) {
    if (variant.startsWith(l) && /^(?:\s|$)/.test(variant.slice(l.length))) return '';
    const body = l.replace(/\.$/, '');
    const after = variant.slice(body.length);
    if (!variant.startsWith(body)) continue;
    if (after === '' || (BOUNDARY.test(after) && !QUALIFIER.test(after))) return '';
    why = `cut before "${after.slice(0, 40)}"`;
  }
  return why;
}

// ---- The cuts, on the round-2 examples -----------------------------------------

test.describe('lead-sentence cuts (lib/lead-sentence.ts)', () => {
  test('a clause inside a list is not a cut (/glossary/ai-business-operator-korea)', () => {
    const text =
      'Under the Korean AI Basic Act, a legal person, organisation, individual or state body doing AI business, split into development business operators, who develop and provide AI, and utilisation business operators, who offer products or services built on it.';
    expect(shortenSentence(text, 150)).toBeUndefined();
  });

  test('a qualifier after a phrase is not dropped (/glossary/provider)', () => {
    const text =
      'Under the EU AI Act, whoever develops an AI system or general-purpose AI model, or has one developed, and places it on the market or puts it into service under its own name or trademark, whether for payment or free.';
    expect(shortenSentence(text, 150)).toBeUndefined();
    const description = leadDescription(text, {
      label: 'Provider',
      lowerFirst: true,
      loose: true,
      extras: [['Definition with sources and the chapters that use it.'], 'From the AI Governance Body of Knowledge glossary.'],
    });
    expect(description).toBe(
      'Provider: definition with sources and the chapters that use it. From the AI Governance Body of Knowledge glossary.',
    );
  });

  test('"and to <verb>" is never left dangling (/glossary/privacy-by-design-and-by-default)', () => {
    const text =
      'The GDPR Article 25 duty to build data protection principles into processing through technical and organisational measures, and to process by default only the personal data each purpose needs.';
    expect(shortenSentence(text, 140)).toBeUndefined();
  });

  test('a list after a colon is dropped whole, never cut after its first item', () => {
    const text =
      'The staff-facing rules for using AI tools in any team or business unit: which tools are approved, which data classes may go where, duties to review and disclose outputs, logging and consequences.';
    expect(shortenSentence(text, 120)).toBe('The staff-facing rules for using AI tools in any team or business unit.');
  });

  test('a semicolon list is not cut, nor a clause end before a qualifier', () => {
    expect(
      shortenSentence(
        'Deployers of the listed high-risk systems must keep the logs they control for six months; test before first use; and report serious incidents to the authority without delay.',
        110,
      ),
    ).toBeUndefined();
    expect(
      shortenSentence(
        'The general text-and-data-mining exception lets anyone copy lawfully accessible works for mining; only where rightholders have not expressly reserved that use.',
        110,
      ),
    ).toBeUndefined();
  });

  test('a qualifier anywhere in the dropped rest refuses the cut (/glossary/tdm-exception)', () => {
    // Round 3 (CONTENT N-R3-1): cut at ", including", the snippet said anyone
    // may copy works for mining, without "unless the rightholder has reserved
    // that use" two clauses later.
    const text =
      'The EU copyright exception for text and data mining (DSM Directive Articles 3 and 4) that lets anyone copy lawfully accessible works for mining, including AI training, unless the rightholder has reserved that use; for content made publicly available online the reservation must be made in an appropriate manner, such as machine-readable means.';
    expect(shortenSentence(text, 143)).toBeUndefined();
    expect(
      shortenSentence(
        'A register of every model in production, such as vendor models and fine-tunes, which applies only where the model makes decisions.',
        60,
        20,
      ),
    ).toBeUndefined();
    // The same sentence with no qualifier in its rest is cut, so the refusals
    // below come from the qualifier, not from the budget.
    expect(
      shortenSentence('A duty to keep logs for six months, such as access logs and decision logs, for every system.', 60, 20),
    ).toBe('A duty to keep logs for six months.');
    for (const word of ['except', 'provided', 'where', 'if', 'when', 'subject to', 'to the extent', 'other than', 'but not']) {
      expect(
        shortenSentence(`A duty to keep logs for six months, such as access logs and decision logs, ${word} the system is high-risk.`, 60, 20),
        word,
      ).toBeUndefined();
    }
  });

  test('a clause that only adds is still a clean cut', () => {
    expect(
      shortenSentence(
        'A change in the distribution of the inputs a system sees in production relative to the data it was validated on, such as a new customer segment or a changed upstream form.',
        140,
      ),
    ).toBe('A change in the distribution of the inputs a system sees in production relative to the data it was validated on.');
    expect(
      shortenSentence(
        'The person who holds the capability of AI governance engineering and is accountable for the three questions in production; a capability and a role, not necessarily a job title.',
        140,
      ),
    ).toBe('The person who holds the capability of AI governance engineering and is accountable for the three questions in production.');
  });

  test('an aside that is part of a name is kept', () => {
    const text =
      'The Data (Use and Access) Act 2025 replaces the UK GDPR Article 22 prohibition with a permission-plus-safeguards model for significant decisions taken solely by automated means.';
    const out = shortenSentence(text, 150);
    expect(out ?? '').not.toContain('Data Act');
  });
});

// ---- Every built description ---------------------------------------------------

/** The glossary page's own sentences after the lead (src/pages/glossary/[slug].astro). */
const GLOSSARY_TAIL = /\s*(?:Definition with [^.]*\.|From the AI Governance Body of Knowledge glossary\.)$/i;

test.describe('every glossary description is the definition\'s own opening, or its hand-written summary', () => {
  const entries = getGlossary().filter((entry) => existsSync(join('dist', 'glossary', `${entry.slug}.html`)));
  const pageOf = (slug: string): string => join('dist', 'glossary', `${slug}.html`);

  test('the build wrote the glossary pages', () => {
    expect(entries.length).toBeGreaterThan(300);
  });

  test('no description cuts the definition where it changes its meaning', () => {
    const bad: string[] = [];
    for (const entry of entries) {
      const description = descriptionOf(pageOf(entry.slug));
      // A hand-written summary (data/glossary-descriptions.ts) is not an
      // opening of the definition; it is read against it by hand instead.
      const authored = glossaryDescriptions[entry.slug];
      if (authored !== undefined) {
        if (description !== authored) bad.push(`${entry.slug}: not its hand-written description: ${description}`);
        continue;
      }
      const prefix = `${entry.term}: `;
      const labelled = description.startsWith(prefix);
      let lead = labelled ? description.slice(prefix.length) : description;
      for (let prev = ''; prev !== lead; ) {
        prev = lead;
        lead = lead.replace(GLOSSARY_TAIL, '');
      }
      if (lead === '') {
        bad.push(`${entry.slug}: the stock template, no definition: ${description}`);
        continue;
      }
      const why = unfaithful(lead, entry.definition);
      if (why) bad.push(`${entry.slug}: ${why}: ${description}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  // Round 3 (ONPAGE N3-2, CONTENT N-R3-2): 82 terms fell back to "<term>:
  // definition with sources, the chapters that use it ... From the AI
  // Governance Body of Knowledge glossary.", a snippet that says nothing of
  // what the term means.
  test('every description is 110-158 characters, unique, whole and never the stock template', () => {
    const bad: string[] = [];
    const seen = new Map<string, string>();
    for (const entry of entries) {
      const description = descriptionOf(pageOf(entry.slug));
      if (description.length < 110 || description.length > 158) {
        bad.push(`${entry.slug}: ${description.length} characters: ${description}`);
      }
      if (description.includes('…') || description.includes('...')) bad.push(`${entry.slug}: ellipsis: ${description}`);
      if (/(?:^|:\s)definition with\b/i.test(description) || description.includes('Body of Knowledge glossary.')) {
        bad.push(`${entry.slug}: stock template: ${description}`);
      }
      const other = seen.get(description);
      if (other) bad.push(`${entry.slug}: same description as ${other}`);
      seen.set(description, entry.slug);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  test('every hand-written description names a glossary term and fits the snippet', () => {
    const terms = new Map(getGlossary().map((entry) => [entry.slug, entry.term]));
    const bad: string[] = [];
    for (const [slug, description] of Object.entries(glossaryDescriptions)) {
      const term = terms.get(slug);
      if (term === undefined) bad.push(`${slug}: not a glossary term`);
      else if (!description.startsWith(`${term}: `)) bad.push(`${slug}: does not open with "${term}: "`);
      if (description.length < 110 || description.length > 158) bad.push(`${slug}: ${description.length} characters`);
      if (!/[a-z0-9)]\.$/i.test(description)) bad.push(`${slug}: does not end a sentence`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  // Round 3 (ONPAGE N9): three "<term>: definition" titles ran to 61-63
  // characters; a long term now stands alone.
  test('every glossary title is at most 60 characters before the site name', () => {
    const bad: string[] = [];
    for (const entry of entries) {
      const html = readFileSync(pageOf(entry.slug), 'utf8');
      const head = html.slice(0, html.indexOf('</head>'));
      const title = decode(/<title>([^<]*)<\/title>/.exec(head)?.[1] ?? '').replace(/ · AI Governance Engineer$/, '');
      if (title.length > 60) bad.push(`${entry.slug}: ${title.length}: ${title}`);
      if (!title.startsWith(entry.term)) bad.push(`${entry.slug}: does not name the term: ${title}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
});

/** An obligation page's sentences after the lead (lib/obligation-title.ts). */
function obligationLead(description: string): string {
  let out = description.replace(/\s*From the AI governance obligation register\.$/, '');
  const evidence = out.lastIndexOf(' Evidence: ');
  if (evidence > 0) out = out.slice(0, evidence);
  return out.replace(
    /\s*(?:In force since [\d-]+(?:, with a grace period)?\.|In force(?:, with a grace period)?\.|Applies from [\d-]+(?: \(deferred\))?\.|Deferred\.|Voluntary(?:; applies from [\d-]+)?\.|Draft or proposed\.)$/,
    '',
  );
}

test.describe('every obligation description is the requirement\'s own opening, or the heading', () => {
  const rows = obligations.filter((row) => existsSync(join('dist', 'obligations', `${obligationSlug(row)}.html`)));

  test('the build wrote the obligation pages', () => {
    expect(rows.length).toBeGreaterThan(150);
  });

  test('no description cuts the requirement where it changes its meaning', () => {
    const bad: string[] = [];
    for (const row of rows as Obligation[]) {
      const description = descriptionOf(join('dist', 'obligations', `${obligationSlug(row)}.html`));
      const lead = obligationLead(description);
      const prefix = `${instrumentClause(row)}: `;
      // The requirement behind its instrument and clause, or else the page
      // heading, which states no requirement to distort.
      const why = lead.startsWith(prefix)
        ? unfaithful(lead.slice(prefix.length), row.requirement)
        : unfaithful(lead, obligationHeading(row));
      if (why) bad.push(`${row.id}: ${why}: ${description}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
});
