// open-questions.ts: the questions the project is working on and has not
// settled. /about lists them and each one links where the work on it lives: a
// research note, the control profiles or a section of the frontier route. A
// question leaves this list when a reviewed note or control answers it, never
// because it has gone quiet.

// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

export interface OpenQuestion {
  /** Stable kebab id. */
  id: string;
  question: string;
  /** Site path (optionally with a fragment) where the work on it lives. */
  href?: string;
}

export const openQuestions: readonly OpenQuestion[] = [
  {
    id: 'authorization-boundary-evidence',
    question: 'What evidence is sufficient to demonstrate that an agent remained within an authorization boundary?',
    href: '/research/the-evaluation-environment-is-part-of-the-system',
  },
  {
    id: 'harness-attestation',
    question: 'How should evaluation-harness configuration be attested?',
    href: '/controls',
  },
  {
    id: 'fail-closed-safeguards',
    question: 'Which runtime safeguards should fail closed?',
    href: '/controls/evaluation-environment',
  },
  {
    id: 'control-regressions',
    question: 'How should control regressions be detected over time?',
    href: '/frontier#runtime-safeguards',
  },
  {
    id: 'evidence-provenance',
    question: 'How should machine-readable assurance evidence preserve provenance?',
    href: '/frontier#assurance',
  },
];

/** Every problem in the list; empty when all hold. */
export function openQuestionProblems(): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const q of openQuestions) {
    const at = `open-questions.ts ${q.id}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(q.id)) problems.push(`${at}: id must be lower-case kebab`);
    if (ids.has(q.id)) problems.push(`${at}: duplicate id`);
    ids.add(q.id);
    if (!q.question.trim().endsWith('?')) problems.push(`${at}: a question ends with a question mark`);
    if (q.href !== undefined && !/^\/[a-z0-9/-]*(?:#[a-z0-9-]+)?$/.test(q.href)) {
      problems.push(`${at}: href must be a site path`);
    }
    if (JSON.stringify(q).includes(EM_DASH)) problems.push(`${at}: em dash`);
  }
  return problems;
}
