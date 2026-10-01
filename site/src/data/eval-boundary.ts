// eval-boundary.ts: which element of the evaluation environment each control
// of the Evaluation Environment Control Profile (./controls/
// evaluation-environment.ts) guards, for the EvalBoundary rings on /frontier
// and on the research note "The evaluation environment is part of the system"
// (research/the-evaluation-environment-is-part-of-the-system.md).
//
// The controls carry no "element" field (their enforcement points and
// verification kinds do not say which part of the environment they bound), so
// the assignment is written here, explicitly, and every row cites the
// sentence of the note that makes it. The first five rings are the note's
// "Five things inside the boundary", in the note's order (the harness first,
// nearest the model); each names its control there. The note's list leaves
// three controls out (005, 007 and 009): they bound the record of the run,
// the sixth, outermost ring, after the note's "What an evaluation must
// therefore record" and its one-line consequence for each. Every control
// sits in exactly one ring (evalBoundaryProblems()).
import { controlsIn } from './controls';

export const EVAL_PROFILE = 'evaluation-environment';

export interface EvalRing {
  key: string;
  label: string;
  /** Control ids (AIGE-CTL-EVAL-NNN) in this ring. */
  controls: readonly string[];
  /** The sentence of the note that places the controls here. */
  basis: string;
}

/** From the model outwards. */
export const evalBoundaryRings: readonly EvalRing[] = [
  {
    key: 'harness',
    label: 'Harness',
    controls: ['AIGE-CTL-EVAL-008'],
    basis: '"The harness. Prompts, scaffold, scoring code, limits and the wording of the task. [...] Control: AIGE-CTL-EVAL-008"',
  },
  {
    key: 'tools',
    label: 'Tools and MCP servers',
    controls: ['AIGE-CTL-EVAL-004'],
    basis: '"Tools and MCP servers. Every tool an agent can call widens what it can do [...] Control: AIGE-CTL-EVAL-004"',
  },
  {
    key: 'credentials',
    label: 'Credentials and identity',
    controls: ['AIGE-CTL-EVAL-003'],
    basis: '"Credentials and identity. A token reachable from the sandbox is a capability [...] Control: AIGE-CTL-EVAL-003"',
  },
  {
    key: 'egress',
    label: 'Network egress',
    controls: ['AIGE-CTL-EVAL-002'],
    basis: '"Network egress. What an agent can reach decides what it can learn and what it can leak. [...] Control: AIGE-CTL-EVAL-002"',
  },
  {
    key: 'delegation',
    label: 'Delegation',
    controls: ['AIGE-CTL-EVAL-001', 'AIGE-CTL-EVAL-006'],
    basis: '"Delegation. Agents that can start other agents [...] extend the boundary while the run is under way. [...] Controls: AIGE-CTL-EVAL-001 and AIGE-CTL-EVAL-006"',
  },
  {
    key: 'record',
    label: 'Record of the run',
    controls: ['AIGE-CTL-EVAL-005', 'AIGE-CTL-EVAL-007', 'AIGE-CTL-EVAL-009'],
    basis:
      '"What an evaluation must therefore record": "the integrity of the trace itself" and "the validity checks run before the result was reported"; ' +
      'and the consequences: 005 "a tool call is recorded by the mediation point", 007 "the environment is frozen with the transcript", ' +
      '009 "scoring, environment health and trace completeness are checked before a number is reported"',
  },
];

/** Every problem with the assignment: an unknown id, or a control of the
 *  profile in no ring or in two. The EvalBoundary component throws on any. */
export function evalBoundaryProblems(): string[] {
  const ids = controlsIn(EVAL_PROFILE).map((c) => c.id);
  const placed = evalBoundaryRings.flatMap((r) => r.controls);
  const problems: string[] = [];
  for (const id of placed) if (!ids.includes(id)) problems.push(`eval-boundary: ${id} is not a control of ${EVAL_PROFILE}`);
  for (const id of ids) {
    const n = placed.filter((p) => p === id).length;
    if (n !== 1) problems.push(`eval-boundary: ${id} sits in ${n} rings, not one`);
  }
  return problems;
}
