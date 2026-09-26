// people.ts: the people the open reference names, and nobody else. Today that
// is the author alone: the control profiles and research notes name him as
// author, and their `reviewers` lists stay empty until a real technical review
// is recorded in bok/CONTRIBUTORS.md (an empty list renders as "Open for
// technical review"). Never add a person who has not agreed to be named, and
// never a reviewer for a review that did not happen.
//
// The name comes from data/site.ts (one spelling across the site), and the
// JSON-LD @id is the one lib/jsonld.ts gives the same Person node, so a profile
// or note can point at that node instead of minting a second one.
import { site } from './site';

// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

export interface Person {
  /** Stable kebab id that control profiles and notes reference. */
  id: string;
  /** Full name, exactly as data/site.ts states it. */
  name: string;
  /** Where the name links: the /about page. */
  href: string;
  /** @id of the Person node lib/jsonld.ts emits for this person. */
  jsonLdId?: string;
  /** Subjects the person works on, restated for /about and the Person node. */
  researchInterests?: readonly string[];
}

/** The slug lib/jsonld.ts uses for Person @ids (its personSlug, restated). */
function personSlug(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const people: readonly Person[] = [
  {
    id: 'jorge-garcia-aibar',
    name: site.author,
    href: '/about',
    jsonLdId: `${site.url}/#person-${personSlug(site.author)}`,
    researchInterests: [
      'Independent assessment methodology for AI systems',
      'Evaluation-environment controls',
      'Agent runtime safeguards',
      'Machine-readable assurance evidence',
      'Open control profiles and reference implementations',
    ],
  },
];

export function personById(id: string): Person | undefined {
  return people.find((p) => p.id === id);
}

/** Every problem in the list; empty when all hold. */
export function peopleProblems(): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const p of people) {
    const at = `people.ts ${p.id}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)) problems.push(`${at}: id must be lower-case kebab`);
    if (ids.has(p.id)) problems.push(`${at}: duplicate id`);
    ids.add(p.id);
    if (!p.name.trim()) problems.push(`${at}: empty name`);
    if (!site.authors.includes(p.name)) problems.push(`${at}: name is not one of site.authors`);
    if (!p.href.startsWith('/')) problems.push(`${at}: href must be a site path`);
    if (p.jsonLdId && !p.jsonLdId.startsWith(`${site.url}/#person-`)) {
      problems.push(`${at}: jsonLdId must be a site Person @id`);
    }
    if (JSON.stringify(p).includes(EM_DASH)) problems.push(`${at}: em dash`);
  }
  return problems;
}
