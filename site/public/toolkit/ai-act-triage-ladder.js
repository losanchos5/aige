// ai-act-triage-ladder.js: lights the risk ladder and the GPAI track in the
// result of /toolkit/ai-act-triage. The page draws both at build (the chart
// kit's ladder, one <g data-step="key"> per rung) and puts the rungs, each
// with the triage classes it holds, in the JSON island (`ladder`). This module
// only reads the outcome the engine already computed (ai-act-triage-engine.js
// evaluate()) and marks each rung: 'given' when the answers give one of its
// classes, 'if' when the scope screen took the system out but the other
// answers would give it, 'not' otherwise. The page's CSS draws the states; no
// fact lives here.

/** Each rung's state for one evaluation, in the island's order. */
export function ladderStates(rungs, evaluation) {
  const given = new Set(evaluation.classes.map((c) => c.id));
  const would = new Set((evaluation.ifInScope?.classes ?? []).map((c) => c.id));
  return rungs.map((rung) => ({
    key: rung.key,
    label: rung.label,
    state: rung.classes.some((id) => given.has(id))
      ? 'given'
      : rung.classes.some((id) => would.has(id))
        ? 'if'
        : 'not',
  }));
}

const list = (items) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** One sentence for the reader: what the ladder shows now. */
export function ladderReading(states, outOfScope = false) {
  const given = states.filter((s) => s.state === 'given').map((s) => s.label);
  const would = states.filter((s) => s.state === 'if').map((s) => s.label);
  if (given.length) return `Solid on these answers: ${list(given)}.`;
  if (!outOfScope) return 'No rung on these answers.';
  return would.length
    ? `Out of scope, so no rung is solid. Dashed: what the other answers would give if it were in scope (${list(would)}).`
    : 'Out of scope, so no rung is solid.';
}

/** Mark every rung of the ladder box and write the reading; returns it. */
export function lightLadder(box, rungs, evaluation) {
  if (!box || !Array.isArray(rungs)) return '';
  const states = ladderStates(rungs, evaluation);
  for (const { key, state } of states) {
    for (const group of box.querySelectorAll(`g[data-step="${key}"]`)) {
      group.setAttribute('data-state', state);
    }
  }
  const reading = ladderReading(states, evaluation.scope?.status === 'out-of-scope');
  const line = box.querySelector('[data-tri-lad-reading]');
  if (line) line.textContent = reading;
  return reading;
}
