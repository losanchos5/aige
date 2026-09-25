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
// qualifier ("unless", "only", "where", "if", "and" ...). Or nothing is left:
// the description is the template alone ("<term>: definition with ...").
// Pure reads of src data and dist.
import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { obligations, obligationSlug, type Obligation } from '../src/data/frameworks';
import { getGlossary } from '../src/lib/glossary';
import { instrumentClause, obligationHeading } from '../src/lib/obligation-title';
import { leadDescription, shortenSentence } from '../src/lib/lead-sentence';

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

test.describe('every glossary description is the definition\'s own opening, or the template', () => {
  const entries = getGlossary().filter((entry) => existsSync(join('dist', 'glossary', `${entry.slug}.html`)));

  test('the build wrote the glossary pages', () => {
    expect(entries.length).toBeGreaterThan(300);
  });

  test('no description cuts the definition where it changes its meaning', () => {
    const bad: string[] = [];
    for (const entry of entries) {
      const description = descriptionOf(join('dist', 'glossary', `${entry.slug}.html`));
      const prefix = `${entry.term}: `;
      const labelled = description.startsWith(prefix);
      let lead = labelled ? description.slice(prefix.length) : description;
      for (let prev = ''; prev !== lead; ) {
        prev = lead;
        lead = lead.replace(GLOSSARY_TAIL, '');
      }
      if (lead === '') {
        if (!labelled) bad.push(`${entry.slug}: template without the term: ${description}`);
        continue;
      }
      const why = unfaithful(lead, entry.definition);
      if (why) bad.push(`${entry.slug}: ${why}: ${description}`);
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });
});

/** An obligation page's sentences after the lead (lib/obligation-title.ts). */
function obligationLead(description: string): string {
  let out = description.replace(/\s*From the AI governance obligation register\.$/, '');
  const evidence = out.search(/ Evidence(?: includes)?: (?!.* Evidence(?: includes)?: )/);
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

// Audit ONPAGE N3-3 / R3: the evidence sentence was cut at any comma, inside
// the list a colon opens ("Evidence: evidence-preservation step: model.") or
// inside an item ("impact-ratio eval by sex." for LL144, which requires sex,
// race/ethnicity and intersectional categories). Only "; " separates whole
// artefacts: the description names all of them ("Evidence: ..."), a run of
// whole ones ("Evidence includes: ..."), or none.
test.describe('obligation evidence is never cut inside an artefact', () => {
  const rows = obligations.filter((row) => existsSync(join('dist', 'obligations', `${obligationSlug(row)}.html`)));
  const lowerOpening = (text: string) => text.replace(/^([A-Z])(?=[a-z])/, (c) => c.toLowerCase());
  const evidenceOf = (description: string) =>
    / Evidence( includes)?: (.*?)\.(?: From the AI governance obligation register\.)?$/.exec(description);

  test('every evidence sentence is all the artefacts, or a run of whole ones', () => {
    const bad: string[] = [];
    for (const row of rows as Obligation[]) {
      const description = descriptionOf(join('dist', 'obligations', `${obligationSlug(row)}.html`));
      const match = evidenceOf(description);
      if (!match) continue;
      const items = lowerOpening(row.artefact).replace(/\.$/, '').split(/;\s/);
      const said = match[2];
      // A run may drop a parenthetical aside ("(physical or digital)"), never a word.
      const runs = items.map((_, i) => items.slice(0, i + 1).join('; '));
      const is = (run: string) => said === run || said === run.replace(ASIDE, '');
      if (match[1] === undefined) {
        if (!is(runs[runs.length - 1])) bad.push(`${row.id}: "Evidence:" is not every artefact: ${description}`);
      } else if (!runs.slice(0, -1).some(is)) {
        bad.push(`${row.id}: "Evidence includes:" is not a run of whole artefacts: ${description}`);
      }
    }
    expect(bad, bad.join('\n')).toEqual([]);
  });

  test('the three garbled rows no longer cut their evidence', () => {
    const description = (slug: string) => descriptionOf(join('dist', 'obligations', `${slug}.html`));
    const ll144 = description('aige-obl-usnyc-ll144');
    expect(ll144).not.toMatch(/by sex\.$/);
    if (ll144.includes('impact-ratio')) expect(ll144).toContain('by sex, race/ethnicity and intersectional category');
    expect(description('aige-obl-euaia-art73-6')).not.toContain('evidence-preservation step: model.');
    expect(description('aige-obl-cen-pren18229-1')).not.toMatch(/; structured\.$/);
    expect(description('aige-obl-cen-pren18229-1')).not.toContain('structured.');
  });

  test('the two narrowing rows keep their operative part', () => {
    // Art. 53(1)(c): the policy exists to honour text-and-data-mining
    // reservations; a lead that stops at "Union copyright law." drops that.
    const art53 = descriptionOf(join('dist', 'obligations', 'aige-obl-euaia-art53-1c.html'));
    expect(art53).not.toContain('comply with Union copyright law.');
    expect(art53).toMatch(/text-and-data-mining reservations|reservations of rights/);
    // UK ADM: the permission-plus-safeguards model, not the label repeated.
    const ukAdm = descriptionOf(join('dist', 'obligations', 'aige-obl-uk-adm.html'));
    expect(ukAdm).toContain('permission-plus-safeguards model');
    expect(ukAdm).not.toContain('ADM safeguards: meaningful-human-review path.');
  });
});
