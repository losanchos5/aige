// loop.ts: the governance loop on the home page (GovernanceLoop.astro). Seven
// steps from the obligation to the auditor across four lanes, the edges that
// join them and the icon for each step. One source for the figure's canvas,
// its stacked phone layout, its detail strip and its screen-reader text.
//
// Geometry lives in one user space (LOOP_VIEW). The canvas keeps that aspect
// ratio and the SVG wires fill it, so every step, lane and label placed in
// percent of the view lines up with the wires at any width without measuring.
//   lanes: 232 wide every 256 (x 0, 256, 512, 768), a head band above y 40
//   steps: 200 x 100, 16 in from the lane edge; rows at y 96 / 204 / 312
//   wires: built from the step boxes (see route()); the lane-changing edges
//          run up the 24-unit alley between lanes (x 244, 500, 756); the loop
//          closes along a channel at y 64
// Each edge label sits left of its vertical run, in lane space no step uses;
// "closes the loop" sits on its own dashed channel.
//
// Icons: paths from Lucide (https://lucide.dev), ISC License,
// Copyright (c) Lucide Contributors 2022; Feather portions MIT, Copyright (c)
// 2013-2022 Cole Bemis. Drawn in a 24 x 24 box, stroked with currentColor.

export const LOOP_VIEW = { w: 1000, h: 436 } as const;

const LANE_W = 232;
const LANE_STEP = 256;
const STEP_W = 200;
const STEP_H = 100;
const INSET = (LANE_W - STEP_W) / 2;
const ROW_Y = { top: 96, mid: 204, bottom: 312 } as const;

export type LoopIcon = 'scale' | 'code' | 'package' | 'flask' | 'shield' | 'archive' | 'badge';

export interface LoopLane {
  n: string;
  name: string;
  x: number;
  w: number;
}

export interface LoopStep {
  id: string;
  label: string;
  /** Stack layer tag ("Layer 01".."Layer 05"), or the role of a step outside the stack. */
  tag: string;
  /** Stack layer 1..5; null for the law and the auditor. */
  layer: 1 | 2 | 3 | 4 | 5 | null;
  lane: 0 | 1 | 2 | 3;
  icon: LoopIcon;
  /** An example value from one run, shown in the detail only. */
  sample: string;
  note: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LoopEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  /** Orthogonal route with 10-unit rounded corners, ending at the arrow tip. */
  d: string;
  /** Route length in view units (the beam's pathLength). */
  len: number;
  /** Beat of the lap at which the beam starts on this edge (0..6). */
  slot: number;
  /** Beats the beam takes on this edge (default 1). */
  beats?: number;
  /** Label anchor: `end` hangs the label left of (x, y); `center` centres it on (x, y). */
  at: { x: number; y: number; align: 'end' | 'center' };
  /** The return edge is drawn dashed. */
  loop?: boolean;
}

export const loopLanes: readonly LoopLane[] = [
  { n: '01', name: 'Obligation' },
  { n: '02', name: 'Rules as code' },
  { n: '03', name: 'Running system' },
  { n: '04', name: 'Proof' },
].map((lane, i) => ({ ...lane, x: i * LANE_STEP, w: LANE_W }));

type StepSeed = Omit<LoopStep, 'x' | 'y' | 'w' | 'h'> & { row: keyof typeof ROW_Y };

const stepSeeds: readonly StepSeed[] = [
  {
    id: 'obligation',
    label: 'EU AI Act Art. 9',
    tag: 'law',
    layer: null,
    lane: 0,
    row: 'mid',
    icon: 'scale',
    sample: 'risk management obligation',
    note: "The EU AI Act's Article 9 risk-management duty is the obligation the loop exists to answer: a legal requirement stated in prose, not yet anything a running system can enforce.",
  },
  {
    id: 'policy',
    label: 'Policy-as-code',
    tag: 'Layer 01',
    layer: 1,
    lane: 1,
    row: 'top',
    icon: 'code',
    sample: 'deny model.deploy unless eval.safety ≥ 0.95',
    note: 'Policy-as-code compiles that obligation into an executable rule, so the requirement becomes a gate the pipeline applies rather than a paragraph someone must remember.',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    tag: 'Layer 02',
    layer: 2,
    lane: 1,
    row: 'bottom',
    icon: 'package',
    sample: 'agent: support-bot · owner: platform',
    note: 'The inventory is the registry of what is actually running, here the support-bot agent owned by the platform team, so every control and every piece of evidence attaches to a named, owned system.',
  },
  {
    id: 'eval',
    label: 'Eval gate',
    tag: 'Layer 03',
    layer: 3,
    lane: 2,
    row: 'top',
    icon: 'flask',
    sample: 'eval.safety 0.97 ≥ 0.95',
    note: 'The eval gate runs the safety evaluation and checks the result against the policy threshold, which turns a measurement into a pass/fail decision the build must respect.',
  },
  {
    id: 'runtime',
    label: 'Runtime controls',
    tag: 'Layer 04',
    layer: 4,
    lane: 2,
    row: 'bottom',
    icon: 'shield',
    sample: 'guardrails on · tools scoped · trace ok',
    note: 'Runtime controls keep the governed behaviour true after deploy (guardrails on, tools scoped, traces intact), so the promise made at the gate holds while the agent is live, not only at release.',
  },
  {
    id: 'evidence',
    label: 'Evidence store',
    tag: 'Layer 05',
    layer: 5,
    lane: 3,
    row: 'top',
    icon: 'archive',
    sample: 'attestation issued · signed',
    note: 'The evidence store captures the signed attestation as a machine-readable record produced as a by-product of the build, so the proof that the controls fired exists before anyone asks for it.',
  },
  {
    id: 'auditor',
    label: 'Auditor',
    tag: 'assurance',
    layer: null,
    lane: 3,
    row: 'bottom',
    icon: 'badge',
    sample: 'audit = a query',
    note: 'For the auditor the whole loop collapses to a query against that evidence: assurance becomes something a regulator can read as data, not a screenshot reassembled after the fact.',
  },
];

export const loopSteps: readonly LoopStep[] = stepSeeds.map(({ row, ...step }) => ({
  ...step,
  x: step.lane * LANE_STEP + INSET,
  y: ROW_Y[row],
  w: STEP_W,
  h: STEP_H,
}));

// Routes are built from the step boxes, so they follow the constants above.
// Each is an orthogonal polyline with rounded corners; it leaves its source on
// the box edge and stops TIP short of the target, where the arrow tip sits.
type Pt = readonly [number, number];
const CORNER = 10;
const TIP = 2;
const CHANNEL_Y = 64;
// The return edge drops into the law's box left of centre, clear of the
// "compiles to" label that sits over the law.
const RETURN_X = 60;

// Length of one rounded corner: a quadratic curve from CORNER before the
// corner to CORNER after it, control point on the corner.
const CORNER_LEN = (() => {
  let len = 0;
  const n = 64;
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    len += (2 * CORNER * Math.hypot(1 - t, t)) / n;
  }
  return len;
})();

function route(points: readonly Pt[]): { d: string; len: number } {
  const [first, ...rest] = points;
  let d = `M${first[0]} ${first[1]}`;
  let len = 0;
  let at: Pt = first;
  rest.forEach((corner, i) => {
    const next = rest[i + 1];
    if (!next) {
      d += `L${corner[0]} ${corner[1]}`;
      len += Math.hypot(corner[0] - at[0], corner[1] - at[1]);
      return;
    }
    const toward = (from: Pt, to: Pt): Pt => [
      from[0] + Math.sign(to[0] - from[0]) * CORNER,
      from[1] + Math.sign(to[1] - from[1]) * CORNER,
    ];
    const before = toward(corner, at);
    const after = toward(corner, next);
    d += `L${before[0]} ${before[1]}Q${corner[0]} ${corner[1]} ${after[0]} ${after[1]}`;
    len += Math.hypot(before[0] - at[0], before[1] - at[1]) + CORNER_LEN;
    at = after;
  });
  return { d, len: Math.round(len) };
}

const step = (id: string): LoopStep => {
  const found = loopSteps.find((s) => s.id === id);
  if (!found) throw new Error(`loop: no step ${id}`);
  return found;
};
const midX = (s: LoopStep) => s.x + s.w / 2;
const midY = (s: LoopStep) => s.y + s.h / 2;
/** Centre of the alley between lane `lane` and the next one. */
const alley = (lane: number) => lane * LANE_STEP + LANE_W + (LANE_STEP - LANE_W) / 2;

/** Down a lane, from the foot of `from` to the head of `to`. */
const down = (from: LoopStep, to: LoopStep) =>
  route([
    [midX(from), from.y + from.h],
    [midX(from), to.y - TIP],
  ]);

/** From the right of `from`, up the alley, into the left of `to`. */
const across = (from: LoopStep, to: LoopStep) =>
  route([
    [from.x + from.w, midY(from)],
    [alley(from.lane), midY(from)],
    [alley(from.lane), midY(to)],
    [to.x - TIP, midY(to)],
  ]);

// Label anchors. The vertical runs between the top and bottom rows are centred
// on RUN_Y and each label hangs 8 units left of its run; the obligation edge's
// label rides higher, over the law's box.
const RUN_Y = (ROW_Y.top + STEP_H + ROW_Y.bottom) / 2;
const GAP = 8;

const [obligation, policy, inventory, evalGate, runtime, evidence, auditor] = [
  'obligation',
  'policy',
  'inventory',
  'eval',
  'runtime',
  'evidence',
  'auditor',
].map(step);

export const loopEdges: readonly LoopEdge[] = [
  {
    id: 'compiles',
    from: 'obligation',
    to: 'policy',
    label: 'compiles to',
    ...across(obligation, policy),
    slot: 0,
    at: { x: alley(0) - GAP, y: ROW_Y.mid - 34, align: 'end' },
  },
  {
    id: 'scopes',
    from: 'policy',
    to: 'inventory',
    label: 'scopes',
    ...down(policy, inventory),
    slot: 1,
    at: { x: midX(policy) - GAP, y: RUN_Y, align: 'end' },
  },
  {
    id: 'checks',
    from: 'inventory',
    to: 'eval',
    label: 'checks',
    ...across(inventory, evalGate),
    slot: 2,
    at: { x: alley(inventory.lane) - GAP, y: RUN_Y, align: 'end' },
  },
  {
    id: 'gates',
    from: 'eval',
    to: 'runtime',
    label: 'gates',
    ...down(evalGate, runtime),
    slot: 3,
    at: { x: midX(evalGate) - GAP, y: RUN_Y, align: 'end' },
  },
  {
    id: 'emits',
    from: 'runtime',
    to: 'evidence',
    label: 'emits',
    ...across(runtime, evidence),
    slot: 4,
    at: { x: alley(runtime.lane) - GAP, y: RUN_Y, align: 'end' },
  },
  {
    id: 'attests',
    from: 'evidence',
    to: 'auditor',
    label: 'attests',
    ...down(evidence, auditor),
    slot: 5,
    at: { x: midX(evidence) - GAP, y: RUN_Y, align: 'end' },
  },
  {
    id: 'closes',
    from: 'evidence',
    to: 'obligation',
    label: 'closes the loop',
    ...route([
      [midX(evidence), evidence.y],
      [midX(evidence), CHANNEL_Y],
      [RETURN_X, CHANNEL_Y],
      [RETURN_X, obligation.y - TIP],
    ]),
    slot: 6,
    beats: 2,
    at: { x: LOOP_VIEW.w / 2, y: CHANNEL_Y, align: 'center' },
    loop: true,
  },
];

/** The verb that leads out of each step along the loop (none after the auditor). */
export function loopVerb(stepId: string): string | undefined {
  const next = loopEdges.find((edge) => edge.from === stepId && !edge.loop);
  return next?.label;
}

export const loopLaneName = (step: LoopStep): string => loopLanes[step.lane].name;

/** Inner SVG markup of each icon (24 x 24 box, stroke only). */
export const loopIcons: Record<LoopIcon, string> = {
  scale:
    '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  package:
    '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.7 4.73a2 2 0 0 0 2 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
  flask:
    '<path d="M14 2v6a2 2 0 0 0 .25.96l5.5 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.75-2.96l5.5-10.08A2 2 0 0 0 10 8V2"/><path d="M6.45 15h11.1"/><path d="M8.5 2h7"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  archive:
    '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  badge:
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
};
