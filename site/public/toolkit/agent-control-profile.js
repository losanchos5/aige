// agent-control-profile.js: the client side of /toolkit/agent-control-profile.
// The reader describes one agent: its autonomy level, tools and MCP servers
// with operation class and scope, data classes, memory, external actions,
// identity model and approval points. The tool derives the minimum control set
// of chapter 23 for that autonomy level, the controls the agent's tools,
// memory, identity and delegation add, the gaps between the description and
// the chapter's rules, and the agent incident classes worth drilling. Exports:
// an agent register entry that validates against agent-register-entry.v1, a
// checklist in Markdown and CSV, the link. Nothing is sent anywhere.
//
// `computeProfile` and `buildEntry` are pure and exported for the tests.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  downloadJson,
  downloadMarkdown,
  downloadCsv,
  copyText,
  readJsonFile,
  mdCell,
  slug,
  isoDate,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  list,
  readForm,
  applyForm,
  pickParams,
  setFieldError,
  clearFieldErrors,
  showErrorSummary,
  cleanText,
  isDate,
  joinList,
} from './form-kit.js';

export const KIND = 'aige.agent-control-profile';
export const VERSION = 1;
const SCHEMA = 'https://aigovernanceengineer.com/schemas/agent-register-entry.v1.json';
export const MAX_TOOLS = 6;

const TOOL_FIELDS = ['t', 's', 'o', 'c', 'd', 'k'];
const BASE_KEYS = [
  'v', 'aid', 'nm', 'ver', 'own', 'pur', 'exp', 'bm', 'al', 'idm', 'wid', 'ttl', 'cp', 'ovr',
  'mem', 'ext', 'pd', 'sp', 'ma', 'dl', 'hr', 'sa', 'scur', 'sper', 'kso', 'ksd',
];
export const PARAM_KEYS = [
  ...BASE_KEYS,
  ...Array.from({ length: MAX_TOOLS }, (_, i) => TOOL_FIELDS.map((f) => `${f}${i + 1}`)).flat(),
];

const IRREVERSIBLE = ['delete', 'send', 'pay', 'execute'];
const EXT_IRREVERSIBLE = { messages: 'send', payments: 'pay', publishes: 'send', deletes: 'delete', code: 'execute' };

/** The tool rows a reader filled in (a row counts once it has a name). */
export function toolsFromParams(params) {
  const rows = [];
  for (let i = 1; i <= MAX_TOOLS; i += 1) {
    const name = cleanText(params[`t${i}`], 80);
    if (!name) continue;
    rows.push({
      row: i,
      name,
      server: params[`s${i}`] || 'native',
      op: params[`o${i}`] || '',
      scopes: String(params[`c${i}`] ?? '')
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean),
      dataClass: params[`d${i}`] || '',
      checkpoint: cleanText(params[`k${i}`], 160),
    });
  }
  return rows;
}

/** The control set, gaps and drills for one agent description. */
export function computeProfile(model, params) {
  const levels = model.autonomy;
  const index = levels.findIndex((level) => level.id === params.al);
  const level = levels[index];
  const tools = toolsFromParams(params);
  const ext = list(params.ext);
  const mem = list(params.mem);
  const cps = list(params.cp);
  const controlById = new Map(model.controls.map((c) => [c.id, c]));
  const picked = new Map();
  const add = (id, reason) => {
    const control = controlById.get(id);
    if (!control) throw new Error(`agent-control-profile: unknown control ${id}`);
    const entry = picked.get(id) ?? { ...control, reasons: [] };
    if (!entry.reasons.includes(reason)) entry.reasons.push(reason);
    picked.set(id, entry);
  };
  const gaps = [];

  // 1. The minimum set of the autonomy level ("the above, plus"), read by the
  //    tool's stated rule: every control carries up, except the Operator's
  //    read-only tools and the Collaborator's checkpoint before every write,
  //    which the Approver row narrows to critical or irreversible steps.
  levels.slice(0, index + 1).forEach((step) => {
    for (const id of step.adds) {
      if (id === 'read-only-tools' && level.id !== 'operator') continue;
      if (id === 'checkpoint-before-writes' && !['collaborator', 'consultant'].includes(level.id)) continue;
      add(id, `Minimum at the ${level.name} level (chapter 23's autonomy table)`);
    }
  });
  if (level.id === 'approver' || level.id === 'observer') {
    add('checkpoint-irreversible', `The ${level.name} row: a person approves critical or irreversible steps, or none are allowed`);
  }

  // 2. What the agent can do.
  const ops = new Set(tools.map((t) => t.op).filter(Boolean));
  for (const action of ext) if (EXT_IRREVERSIBLE[action]) ops.add(EXT_IRREVERSIBLE[action]);
  const irreversible = IRREVERSIBLE.filter((op) => ops.has(op));
  const writes = [...ops].filter((op) => op !== 'read');
  if (irreversible.length && level.id !== 'operator') {
    add('checkpoint-irreversible', `It can ${joinList(irreversible)}`);
  }
  if (level.id === 'operator' && writes.length) {
    gaps.push(`At the Operator level the person takes every action and the tools are read-only, but the agent can ${joinList(writes)}: that is at least the Collaborator level, with an allow-list and a checkpoint before every write.`);
  }
  if (level.id === 'observer' && irreversible.length) {
    gaps.push(`The Observer level keeps only reversible, bounded actions, but the agent can ${joinList(irreversible)}: gate those calls with a checkpoint, or lower the autonomy level.`);
  }
  if (irreversible.length && level.id !== 'operator' && !cps.includes('irreversible')) {
    gaps.push(`The agent can ${joinList(irreversible)}, but no approval point covers irreversible actions.`);
  }
  if (ops.has('execute')) add('sandbox', 'It runs generated code (execute class)');
  const sensitiveTools = tools.filter((t) => t.dataClass === 'confidential' || t.dataClass === 'restricted');
  if (ops.has('send') || sensitiveTools.length) {
    add(
      'egress-filter',
      ops.has('send')
        ? 'It sends or publishes outside'
        : `Its tools touch ${joinList([...new Set(sensitiveTools.map((t) => t.dataClass))])} data`,
    );
  }

  // 3. Tools from MCP servers.
  const mcp = tools.filter((t) => t.server === 'mcp-remote' || t.server === 'mcp-local');
  if (mcp.length) add('mcp-admission', `Tools from MCP servers: ${joinList(mcp.map((t) => t.name))}`);
  if (tools.some((t) => t.server === 'mcp-local')) add('mcp-local', 'A local MCP server runs with the privileges of the client that launched it');
  if (tools.some((t) => t.server === 'mcp-remote')) add('mcp-authorization', 'A remote MCP server over HTTP');

  // 4. Identity.
  if (params.idm === 'static-key' || params.idm === 'service-account') {
    add('short-lived-credentials', params.idm === 'static-key' ? 'It holds a static API key' : 'It holds a long-lived secret');
    gaps.push(
      params.idm === 'static-key'
        ? 'A static API key in the configuration is where attackers look first (MITRE ATLAS AML.T0083): move to a short-lived workload identity.'
        : 'A long-lived secret has to be hunted down after an incident: move to short-lived, attested credentials.',
    );
  }
  if (params.idm === 'user-token') {
    add('delegated-token', "It acts with the user's own token");
    gaps.push("The agent holds the user's own token, so its actions cannot be told apart from the user's: exchange it for a delegated token that names the agent.");
  }
  if (params.idm === 'delegated') add('delegated-token', 'It acts on behalf of users');

  // 5. Memory and data.
  const personal = params.pd === 'yes' || params.sp === 'yes';
  if (mem.includes('long-term') || mem.includes('shared')) {
    add('memory-governance', mem.includes('long-term') ? 'It keeps long-term memory' : 'It shares memory with other agents');
    if (personal) add('memory-personal-data', 'Its memory may hold personal data');
  }
  if (mem.includes('corpus')) add('memory-governance', 'It reads a retrieval corpus (source admission; entitlement check at retrieval)');
  if (personal || sensitiveTools.length) {
    add('data-classes', personal ? 'It handles personal data' : 'It handles confidential or restricted data');
  }

  // 6. Other agents.
  if (params.ma === 'internal' || params.ma === 'external' || mem.includes('shared')) {
    add('hop-accountability', params.ma === 'external' ? 'It calls agents of another organisation' : 'It calls or delegates to other agents');
  }
  if (params.ma === 'external') add('remote-agents', 'It depends on agents you do not run');

  // 7. Always.
  add('prompt-change-control', 'Every agent: its behaviour is set by configuration');
  add('otel-telemetry', 'Every agent: the logs are evidence');
  if (params.hr === 'yes' || params.hr === 'unsure') {
    add('ai-act-high-risk', params.hr === 'yes' ? 'Its purpose is an Annex III use case' : 'Its purpose may be an Annex III use case: classify it');
  }
  if (ext.includes('messages')) add('ai-disclosure', 'It sends messages, emails or calls to people');

  // 8. Register fields the stop and the oversight need.
  if ((level.id === 'approver' || level.id === 'observer') && !cleanText(params.kso)) {
    gaps.push(`At the ${level.name} level the kill switch must be drilled: name who pulls it.`);
  }
  if (index >= 1 && !cps.length && !tools.some((t) => t.checkpoint)) {
    gaps.push('No approval point is named. Checkpoints go where the stakes are: high stakes, irreversible, outlier, user-defined and scope elevation.');
  }

  // Incident classes worth drilling for this agent.
  const drills = new Set(['goal-hijack', 'privilege-abuse', 'runaway']);
  if (writes.length) drills.add('tool-misuse');
  if (mcp.length) drills.add('supply-chain');
  if (ops.has('execute')) drills.add('code-execution');
  if (mem.includes('long-term') || mem.includes('shared')) drills.add('memory-poisoning');
  if (params.ma === 'internal' || params.ma === 'external') {
    drills.add('inter-agent-spoofing');
    drills.add('cascade');
  }
  if (index >= 1) drills.add('trust-exploitation');
  if (ops.has('send') || sensitiveTools.length) drills.add('exfiltration');
  const incidents = model.incidents.filter((c) => drills.has(c.id));

  const order = model.controls.map((c) => c.id);
  const controls = [...picked.values()].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return { level, tools, controls, gaps, incidents, irreversible };
}

/** agent-register-entry.v1 for this description. */
export function buildEntry(model, params, profile, { now = new Date() } = {}) {
  const { level, tools } = profile;
  const scope = [...new Set(tools.flatMap((t) => t.scopes))];
  const cps = list(params.cp);
  const cpLabels = cps.map((id) => model.checkpoints.find((c) => c.id === id)?.label.split(':')[0] ?? id);
  const approvals = [
    ...cpLabels.map((label) => `${label} actions`),
    ...tools.filter((t) => t.checkpoint).map((t) => `${t.name}: ${t.checkpoint}`),
  ];
  const entry = {
    $schema: SCHEMA,
    id: slug(params.aid) || 'agent',
    version: cleanText(params.ver, 40) || now.toISOString().slice(0, 10),
    owner: cleanText(params.own, 120),
    scope,
    expiry: params.exp,
  };
  if (cleanText(params.nm)) entry.name = cleanText(params.nm, 120);
  if (cleanText(params.pur)) entry.purpose = cleanText(params.pur, 400);
  const models = list(params.bm).map((m) => cleanText(m, 80)).filter(Boolean);
  if (models.length) entry.base_models = models;
  const identifier = cleanText(params.wid, 200);
  if (identifier) {
    const type = identifier.startsWith('spiffe://')
      ? 'spiffe'
      : params.idm === 'service-account'
        ? 'service_account'
        : params.idm === 'delegated'
          ? 'oidc_client'
          : 'other';
    entry.workload_identity = { type, identifier };
    if (/^\d{1,7}$/.test(String(params.ttl ?? '')) && Number(params.ttl) >= 1) {
      entry.workload_identity.credential_ttl_seconds = Number(params.ttl);
    }
  }
  entry.tools = tools.map((t) => ({
    name: t.name,
    operations: [t.op || 'read'],
    requires_approval:
      Boolean(t.checkpoint) ||
      (IRREVERSIBLE.includes(t.op) && level.id !== 'operator') ||
      (t.op !== 'read' && ['collaborator', 'consultant'].includes(level.id)),
    ...(t.checkpoint || t.scopes.length
      ? { limits: [t.scopes.length ? `Scopes: ${t.scopes.join(', ')}` : '', t.checkpoint ? `Checkpoint: ${t.checkpoint}` : ''].filter(Boolean).join('. ') }
      : {}),
  }));
  const access = new Map();
  for (const t of tools) {
    if (!t.dataClass) continue;
    const key = `${t.name}|${t.dataClass}`;
    access.set(key, { domain: t.name, classification: t.dataClass, access: t.op === 'read' ? 'read' : 'write' });
  }
  if (access.size) entry.data_access = [...access.values()];
  const delegates = list(params.dl).map((d) => cleanText(d, 80)).filter(Boolean);
  entry.delegation = {
    can_spawn_agents: params.ma === 'internal' || params.ma === 'external',
    ...(delegates.length ? { can_delegate_to: delegates } : {}),
  };
  entry.autonomy_level = level.schemaLevel;
  entry.human_oversight = {
    mode: level.schemaMode,
    ...(approvals.length ? { approval_required_for: approvals } : {}),
    ...(cleanText(params.ovr) ? { overseer_role: cleanText(params.ovr, 120) } : {}),
  };
  if (/^[A-Z]{3}$/.test(String(params.scur ?? '')) && /^\d+(\.\d+)?$/.test(String(params.sa ?? '')) && params.sper) {
    entry.spend_limit = { currency: params.scur, amount: Number(params.sa), period: params.sper };
  }
  if (cleanText(params.kso)) {
    entry.kill_switch = {
      mechanism: 'Per-agent circuit breaker at the tool gateway; identity revocation; stop levels as in the control profile',
      owner: cleanText(params.kso, 120),
      ...(isDate(params.ksd) ? { last_drill: params.ksd } : {}),
    };
  }
  entry.extensions = {
    [KIND]: {
      kind: KIND,
      version: VERSION,
      generated_on: now.toISOString().slice(0, 10),
      tool: model.page,
      notice: model.notice,
      autonomy_level: level.id,
      controls: profile.controls.map((c) => ({ id: c.id, title: c.title, reasons: c.reasons, evidence: c.evidence })),
      gaps: profile.gaps,
      incidents_to_drill: profile.incidents.map((i) => i.name),
      inputs: pickParams(params, PARAM_KEYS),
    },
  };
  return entry;
}

/** Checklist rows: one per control, then one per gap. */
export function checklistRows(model, profile) {
  const rows = [['type', 'id', 'title', 'why', 'rule', 'evidence', 'pattern', 'chapter_section', 'threats', 'done']];
  for (const c of profile.controls) {
    rows.push([
      'control',
      c.id,
      c.title,
      c.reasons.join('; '),
      c.rule,
      c.evidence,
      c.pattern ? `${model.siteUrl}/patterns/${c.pattern}` : '',
      `${model.chapter}#${model.anchors[c.anchor]}`,
      (c.threats ?? []).join(' '),
      'no',
    ]);
  }
  profile.gaps.forEach((gap, i) => rows.push(['gap', `gap-${i + 1}`, 'Gap to close', gap, '', '', '', '', '', 'no']));
  return rows;
}

// ---- The page ----------------------------------------------------------------------

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-tool-app="agent-control-profile"]');
  const data = readToolData();
  if (root && data) init(root, data);
}

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-acp-form]');
  const summary = app.querySelector('[data-acp-errors]');
  const result = app.querySelector('[data-acp-result]');
  const status = app.querySelector('[data-acp-status]');
  const importInput = app.querySelector('[data-acp-import]');
  const addButton = form.querySelector('[data-acp-add]');
  let shown = false;

  const params = () => ({ v: String(VERSION), ...readForm(form) });

  /** Show filled rows plus one empty row (at least two). */
  function showRows() {
    const rows = [...form.querySelectorAll('[data-acp-tool]')];
    let last = 0;
    rows.forEach((row, i) => {
      if (row.querySelector('input[name^="t"]').value.trim()) last = i + 1;
    });
    const visible = Math.min(MAX_TOOLS, Math.max(2, last + 1));
    rows.forEach((row, i) => {
      row.hidden = i >= visible;
    });
    if (addButton) addButton.hidden = visible >= MAX_TOOLS;
  }

  function validate(p) {
    clearFieldErrors(form);
    const errors = [];
    if (!slug(p.aid)) errors.push({ field: 'acp-aid-field', focus: 'acp-aid', message: 'Give the agent an id (letters, digits, hyphens).' });
    if (!cleanText(p.own)) errors.push({ field: 'acp-own-field', focus: 'acp-own', message: 'Name the owning team or person.' });
    if (!isDate(p.exp)) errors.push({ field: 'acp-exp-field', focus: 'acp-exp', message: 'Set an expiry date: no agent outlives its review.' });
    if (!p.al) errors.push({ field: 'acp-autonomy', message: 'Choose the autonomy level.' });
    if (!p.idm) errors.push({ field: 'acp-identity', message: 'Choose how the agent authenticates.' });
    const tools = toolsFromParams(p);
    if (!tools.length) errors.push({ field: 'acp-tools', focus: 'acp-t1', message: 'Name at least one tool the agent can call.' });
    for (const t of tools) {
      if (!t.op) errors.push({ field: 'acp-tools', focus: `acp-o${t.row}`, message: `Choose the operation class of ${t.name}.` });
    }
    for (const error of errors) setFieldError(form.querySelector(`#${error.field}`), error.message);
    showErrorSummary(summary, errors, { focusOn });
    return errors.length === 0;
  }

  const complete = (p) =>
    slug(p.aid) && cleanText(p.own) && isDate(p.exp) && p.al && p.idm && toolsFromParams(p).length && toolsFromParams(p).every((t) => t.op);

  const chapterLink = (anchor, text) => h('a', { href: `${model.chapterPath}#${model.anchors[anchor]}` }, text);

  function render(p) {
    const profile = computeProfile(model, p);
    const { level } = profile;
    result.querySelector('[data-acp-summary]').replaceChildren(
      h('p', { class: 'tk-lede' }, `${cleanText(p.nm) || slug(p.aid)} at the `, h('strong', {}, level.name), ` level: ${profile.controls.length} controls, ${profile.gaps.length} gap${profile.gaps.length === 1 ? '' : 's'} to close.`),
      h('p', {}, `The person ${level.person.toLowerCase()} (nearest IMDA level: ${level.imda}; nearest ATF tier: ${level.atf}). Raising the level is a change that needs the same review as a new deployment.`),
    );
    const gaps = result.querySelector('[data-acp-gaps]');
    gaps.replaceChildren(...profile.gaps.map((g) => h('li', {}, g)));
    result.querySelector('[data-acp-gaps-block]').hidden = profile.gaps.length === 0;
    result.querySelector('[data-acp-controls]').replaceChildren(
      ...profile.controls.map((c) =>
        h(
          'li',
          { class: 'tk-card', 'data-control': c.id },
          h('h4', {}, c.title),
          h('p', {}, c.rule),
          h('p', { class: 'tool-hint' }, `Why here: ${c.reasons.join('; ')}.`),
          h('p', { class: 'tool-hint' }, `Evidence: ${c.evidence}.`),
          h(
            'p',
            { class: 'tk-refs' },
            'Chapter 23: ',
            chapterLink(c.anchor, model.anchorTitles[c.anchor] ?? c.anchor),
            c.pattern ? ' · Pattern: ' : '',
            c.pattern ? h('a', { href: `/patterns/${c.pattern}` }, model.patternTitles[c.pattern] ?? c.pattern) : '',
            c.threats?.length ? ` · ${c.threats.join(', ')}` : '',
          ),
        ),
      ),
    );
    result.querySelector('[data-acp-drills]').replaceChildren(
      ...profile.incidents.map((i) =>
        h('tr', {}, h('th', { scope: 'row' }, i.name), h('td', { 'data-label': 'Detection signal' }, i.signal), h('td', { 'data-label': 'First containment' }, i.containment), h('td', { 'data-label': 'Threat' }, i.threat)),
      ),
    );
    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return profile;
  }

  const sync = () => writeFragment(params());

  function markdown(p, profile) {
    const name = cleanText(p.nm) || slug(p.aid);
    const lines = [
      `# Agent control profile: ${name}`,
      '',
      `> ${model.notice}`,
      '',
      `Agent \`${slug(p.aid)}\`, owner ${cleanText(p.own)}, autonomy level **${profile.level.name}** (the person ${profile.level.person.toLowerCase()}), expiry ${p.exp}. Built on ${isoDate()} from chapter 23 (${model.chapter}).`,
      '',
    ];
    if (profile.gaps.length) {
      lines.push('## Gaps to close', '', ...profile.gaps.map((g) => `- [ ] ${g}`), '');
    }
    lines.push('## Controls', '');
    for (const c of profile.controls) {
      lines.push(
        `- [ ] **${c.title}.** ${c.rule}`,
        `  - Why here: ${c.reasons.join('; ')}. Evidence: ${c.evidence}.`,
        `  - Chapter 23: ${model.chapter}#${model.anchors[c.anchor]}${c.pattern ? `; pattern: ${model.siteUrl}/patterns/${c.pattern}` : ''}${c.threats?.length ? `; ${c.threats.join(', ')}` : ''}`,
      );
    }
    lines.push(
      '',
      '## Incidents worth drilling',
      '',
      '| Class | Detection signal | First containment | Threat |',
      '|---|---|---|---|',
      ...profile.incidents.map((i) => `| ${mdCell(i.name)} | ${mdCell(i.signal)} | ${mdCell(i.containment)} | ${i.threat} |`),
      '',
      '---',
      '',
      `Link: ${shareUrl(p)}`,
      '',
      `Made with the agent control profile at ${model.page}. Mappings are illustrative, not a claim of conformity. ${model.license}, attribution: Jorge García Aibar.`,
    );
    return `${lines.join('\n')}\n`;
  }

  const fileBase = (p) => `agent-control-profile-${slug(p.aid) || 'agent'}`;

  async function run(action) {
    const p = params();
    if (!validate(p)) return;
    const profile = render(p);
    sync();
    try {
      if (action === 'copy') {
        const ok = await copyText(shareUrl(p));
        announce(status, ok ? 'Link copied. The description travels after the #, which the browser does not send.' : 'Copy failed: copy the address bar instead.');
      } else if (action === 'json') {
        downloadJson(`${fileBase(p)}.json`, buildEntry(model, p, profile));
        announce(status, 'Agent register entry downloaded (agent-register-entry.v1).');
      } else if (action === 'md') {
        downloadMarkdown(`${fileBase(p)}.md`, markdown(p, profile));
        announce(status, 'Checklist downloaded as Markdown.');
      } else if (action === 'csv') {
        downloadCsv(`${fileBase(p)}.csv`, checklistRows(model, profile));
        announce(status, 'Checklist downloaded as CSV.');
      } else if (action === 'print') {
        window.print();
      }
    } catch (error) {
      announce(status, `That did not work: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const p = params();
    if (!validate(p)) return;
    const profile = render(p);
    sync();
    focusOn(result.querySelector('h2'));
    announce(status, `${profile.level.name} level: ${profile.controls.length} controls, ${profile.gaps.length} gaps.`);
  });

  form.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement && /^t\d$/.test(event.target.name)) showRows();
  });
  form.addEventListener('change', () => {
    const p = params();
    if (shown && complete(p)) {
      render(p);
      sync();
    }
  });

  addButton?.addEventListener('click', () => {
    const rows = [...form.querySelectorAll('[data-acp-tool]')];
    const next = rows.find((row) => row.hidden);
    if (next) {
      next.hidden = false;
      next.querySelector('input')?.focus();
    }
    addButton.hidden = !rows.some((row) => row.hidden);
  });

  form.querySelector('[data-acp-reset]')?.addEventListener('click', () => {
    applyForm(form, {});
    clearFieldErrors(form);
    showErrorSummary(summary, []);
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    showRows();
    form.querySelector('#acp-aid')?.focus();
  });

  app.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button && app.contains(button)) run(button.getAttribute('data-action'));
  });

  importInput?.addEventListener('change', async () => {
    const error = app.querySelector('[data-acp-import-error]');
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const json = await readJsonFile(file);
      const ext = json?.extensions?.[KIND];
      if (!ext || ext.kind !== KIND) throw new Error('That file is not a register entry made by this tool.');
      if (ext.version !== VERSION) throw new Error(`That entry is version ${ext.version}; this tool reads version ${VERSION}.`);
      const p = pickParams(ext.inputs, PARAM_KEYS);
      applyForm(form, p);
      showRows();
      if (!complete(params())) throw new Error('The description in that file is incomplete.');
      render(params());
      sync();
      error.hidden = true;
      announce(status, 'Description restored from the file; the profile is recomputed.');
      focusOn(result.querySelector('h2'));
    } catch (problem) {
      error.textContent = problem instanceof Error ? problem.message : 'That file could not be read.';
      error.hidden = false;
      importInput.focus();
    } finally {
      importInput.value = '';
    }
  });

  function applyFragment(focus) {
    const state = pickParams(readFragment(), PARAM_KEYS);
    if (!state.aid && !state.al) return;
    applyForm(form, state);
    showRows();
    if (!complete(params())) return;
    const profile = render(params());
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, `Loaded from the link: ${profile.level.name} level, ${profile.controls.length} controls.`);
  }

  window.addEventListener('hashchange', () => applyFragment(true));
  showRows();
  applyFragment(false);
}
