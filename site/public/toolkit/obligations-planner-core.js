// obligations-planner-core.js: the pure part of /toolkit/obligations-planner.
// No DOM access and no side effects at import, so tests/obligations-planner.spec.ts
// runs it in Node. It turns the page's model (the JSON island built from
// src/data/frameworks.ts and src/data/obligations-planner.ts) and the reader's
// answers into a plan, and the plan into the timeline SVG and the exports:
// Markdown checklist, CSV (RFC 4180), JSON (the open-data envelope) and
// iCalendar events (RFC 5545, one all-day event per date). Nothing here sends
// anything anywhere.
import { xml, mdCell, slug } from './lib.js';

export const PLAN_KIND = 'aige.obligations-plan';
export const PLAN_VERSION = 1;
const DAY = 86_400_000;
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/** A real calendar date written YYYY-MM-DD. */
export function isIsoDate(value) {
  const m = ISO.exec(String(value ?? ''));
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
}

const utc = (iso) => Date.parse(`${iso}T00:00:00Z`);

/** Whole days from `from` to `to` (negative when `to` is earlier). */
export function daysBetween(from, to) {
  return Math.round((utc(to) - utc(from)) / DAY);
}

// ---- Link state ----------------------------------------------------------------
// #v=1&r=pr.de&c=h3&d=2027-01-01: roles and classes by their two-letter codes.

export function encodeState(model, { roles, classes, ref }) {
  const code = (list, ids) => ids.map((id) => list.find((e) => e.id === id)?.code).filter(Boolean);
  return {
    v: PLAN_VERSION,
    r: code(model.roles, roles).join('.'),
    c: code(model.classes, classes).join('.'),
    d: ref && isIsoDate(ref) ? ref : '',
  };
}

/** The answers in a decoded fragment, or null when it holds no plan. Unknown
 *  codes are dropped; a malformed date is ignored. */
export function decodeState(model, params) {
  if (!params || typeof params.r !== 'string') return null;
  const ids = (list, text) => {
    const codes = String(text ?? '').split('.');
    return list.filter((e) => codes.includes(e.code)).map((e) => e.id);
  };
  const roles = ids(model.roles, params.r);
  if (!roles.length) return null;
  return {
    roles,
    classes: ids(model.classes, params.c),
    ref: isIsoDate(params.d) ? params.d : null,
  };
}

// ---- The plan ------------------------------------------------------------------

/** Where a duty stands on the reference date. */
export function statusOn(status, statusLabel, start, ref) {
  if (status === 'voluntary' || status === 'pending' || !start) {
    return { key: status, label: statusLabel, days: null };
  }
  const days = daysBetween(ref, start);
  if (days <= 0) {
    return { key: 'applies', label: status === 'grace' ? 'Applies (grace period)' : 'Applies', days };
  }
  return { key: 'later', label: `Applies from ${start}`, days };
}

/** The classes the answers carry: the ticked ones, the baseline every AI system
 *  carries, and the GPAI classes the GPAI roles imply. */
export function effectiveClasses(model, roles, classes) {
  const out = new Set([...model.baseline, ...classes]);
  for (const role of roles) for (const c of model.roleClasses[role] ?? []) out.add(c);
  return out;
}

/**
 * The rows that bind the answers: a row binds when one of its roles is picked
 * and one of its classes is carried, or when a picked role is one the row binds
 * whatever the classes (`anyClass`: an authorised representative's mandate says
 * what the model is). Its start is the earliest start among the matched
 * classes; its later dates are the milestones that concern a matched class,
 * minus the milestone that is itself the start.
 */
export function planFor(model, { roles, classes, ref }) {
  const picked = new Set(roles);
  const carried = effectiveClasses(model, roles, classes);
  const items = [];
  model.rows.forEach((row, order) => {
    const byRoles = row.roles.filter((r) => picked.has(r));
    const anyClass = (row.anyClass ?? []).some((r) => picked.has(r));
    const matched = anyClass ? [...row.classes] : row.classes.filter((c) => carried.has(c));
    if (!byRoles.length || !matched.length) return;
    const start = matched.map((c) => row.starts[c]).filter(Boolean).sort()[0] ?? null;
    /** @type {{ date: string, kind: 'start' | 'step', note: string }[]} */
    const dates = start ? [{ date: start, kind: 'start', note: 'Starts to apply' }] : [];
    for (const step of row.steps) {
      if (step.classes.length && !step.classes.some((c) => matched.includes(c))) continue;
      if (step.startFor.length && step.date === start) continue;
      dates.push({ date: step.date, kind: 'step', note: step.note });
    }
    items.push({
      row,
      order,
      roles: byRoles,
      classes: matched,
      start,
      dates,
      notes: byRoles.map((r) => row.notes[r]).filter(Boolean),
      status: statusOn(row.status, row.statusLabel, start, ref),
    });
  });
  items.sort((a, b) => (a.start ?? '9999').localeCompare(b.start ?? '9999') || a.order - b.order);

  const outside = [];
  for (const duty of model.outside) {
    const byRoles = duty.roles.filter((r) => picked.has(r));
    // `*`: no class condition; the role alone carries the duty.
    const matched = Object.keys(duty.starts).filter((c) => c === '*' || carried.has(c));
    if (!byRoles.length || !matched.length) continue;
    const byDate = new Map();
    for (const c of matched) byDate.set(duty.starts[c], [...(byDate.get(duty.starts[c]) ?? []), c]);
    const dates = [...byDate.keys()].sort().map((date, i) => {
      const classes = byDate.get(date).filter((c) => c !== '*');
      return {
        date,
        kind: i === 0 ? 'start' : 'step',
        note: classes.length
          ? `Applies to ${classes.map((c) => model.classShort[c] ?? classLabel(model, c)).join(' and ')}`
          : 'Applies',
      };
    });
    const start = dates[0].date;
    const classes = matched.filter((c) => c !== '*');
    outside.push({ duty, roles: byRoles, classes, start, dates, status: statusOn('in-force', '', start, ref) });
  }
  return { roles: [...roles], classes: [...classes], ref, items, outside };
}

export function classLabel(model, id) {
  return model.classLabels[id] ?? id;
}

/** One entry per date, in order: what starts, the later steps and the duties
 *  outside the register that start then. */
export function planDates(plan) {
  const map = new Map();
  const at = (date) => {
    if (!map.has(date)) map.set(date, { date, starts: [], steps: [], outside: [] });
    return map.get(date);
  };
  for (const item of plan.items) {
    for (const d of item.dates) (d.kind === 'start' ? at(d.date).starts : at(d.date).steps).push({ item, note: d.note });
  }
  for (const o of plan.outside) for (const d of o.dates) at(d.date).outside.push({ item: o, note: d.note });
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Short count line for a date: "3 duties start, 1 later step". */
export function dateSummary(entry, short = false) {
  const starts = entry.starts.length + entry.outside.length;
  const parts = [];
  if (starts) parts.push(short ? `${starts} start` : plural(starts, 'duty starts', 'duties start'));
  if (entry.steps.length) {
    parts.push(short ? `${entry.steps.length} later` : plural(entry.steps.length, 'later step', 'later steps'));
  }
  return parts.join(', ');
}

/** What happens on a date, as text: what starts, then each later step once
 *  with the clauses it concerns. */
export function dateDetail(entry) {
  const lines = [];
  if (entry.starts.length) lines.push(`Start to apply: ${entry.starts.map((s) => s.item.row.clause).join(', ')}`);
  const outside = new Map();
  for (const o of entry.outside) outside.set(o.note, [...(outside.get(o.note) ?? []), o.item.duty.article]);
  for (const [note, articles] of outside) lines.push(`Outside the register, ${note.charAt(0).toLowerCase()}${note.slice(1)}: ${articles.join(', ')}`);
  const byNote = new Map();
  for (const s of entry.steps) byNote.set(s.note, [...(byNote.get(s.note) ?? []), s.item.row.clause]);
  for (const [note, clauses] of byNote) lines.push(`${note}: ${clauses.join(', ')}`);
  return lines;
}

// ---- Words -----------------------------------------------------------------------

const names = (list, ids) => ids.map((id) => list.find((e) => e.id === id)?.label ?? id);
export const joinWords = (words) =>
  words.length <= 1 ? words.join('') : `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
export const roleNames = (model, ids) => names(model.roles, ids);
export const layerNames = (model, ns) => ns.map((n) => `Layer 0${n} ${model.layers[n - 1]}`);

export function planSummary(model, plan) {
  const count = (key) => plan.items.filter((i) => i.status.key === key).length;
  const roles = joinWords(roleNames(model, plan.roles));
  const classes = plan.classes.length
    ? joinWords(plan.classes.map((c) => classLabel(model, c)))
    : 'no class beyond the baseline';
  const head = `${roles}; ${classes}; reference date ${plan.ref}.`;
  if (!plan.items.length && !plan.outside.length) {
    const chain = plan.roles.some((r) => r === 'importer' || r === 'distributor');
    return `${head} No row of the register binds this combination.${chain ? ' Importer and distributor duties attach to high-risk systems: tick a high-risk class to see them.' : ''}`;
  }
  const parts = [`${count('applies')} ${count('applies') === 1 ? 'applies' : 'apply'} on the reference date`, `${count('later')} later`];
  if (count('voluntary')) parts.push(`${count('voluntary')} voluntary`);
  if (count('pending')) parts.push(`${count('pending')} draft`);
  const outside = plan.outside.length ? ` ${plural(plan.outside.length, 'more duty sits', 'more duties sit')} outside the register.` : '';
  return `${head} ${plural(plan.items.length, 'register row binds', 'register rows bind')} it: ${joinWords(parts)}.${outside}`;
}

// ---- Exports ---------------------------------------------------------------------

const when = (i) => (i.start ? `${i.status.label}${i.status.key === 'later' ? ` (in ${i.status.days} days)` : ''}` : i.status.label);
const laterDates = (i) => i.dates.filter((d) => d.kind === 'step').map((d) => `${d.date} ${d.note}`);

/** The plan as a Markdown checklist, in date order. */
export function planMarkdown(model, plan, { link, today }) {
  const out = [
    '# Obligations plan: EU AI Act and GPAI',
    '',
    `Roles: ${joinWords(roleNames(model, plan.roles))}. System classes: ${plan.classes.length ? joinWords(plan.classes.map((c) => classLabel(model, c))) : 'none ticked (baseline duties only)'}. Reference date: ${plan.ref}. Made on ${today}; register as of ${model.asOf}.`,
    '',
    `> ${model.notice}`,
    `> ${model.aid}`,
    '',
    '## Checklist',
    '',
  ];
  if (!plan.items.length) out.push('No row of the register binds this combination.');
  for (const i of plan.items) {
    const r = i.row;
    const bits = [
      `- [ ] **${r.title}** (\`${r.id}\`): ${when(i)}.`,
      `Artefact: ${r.artefact}.`,
      `${layerNames(model, r.layers).join(', ')}.`,
    ];
    const later = laterDates(i);
    if (later.length) bits.push(`Then: ${later.join('; ')}.`);
    if (r.patterns.length) bits.push(`Patterns: ${r.patterns.map((p) => p.title).join(', ')}.`);
    for (const note of i.notes) bits.push(`Note: ${note}`);
    bits.push(r.url);
    out.push(bits.join(' '));
  }
  if (plan.outside.length) {
    out.push('', '## Duties outside the register', '');
    for (const o of plan.outside) {
      const d = o.duty;
      out.push(`- [ ] **${d.article} ${d.title}**: ${when(o)}. ${d.duty} Record: ${d.artefact}.${d.condition ? ` ${d.condition}` : ''} ${d.url}`);
    }
  }
  const dates = planDates(plan);
  if (dates.length) {
    out.push('', '## Dates', '', '| Date | What happens |', '|---|---|');
    for (const e of dates) out.push(`| ${e.date} | ${mdCell(dateDetail(e).join('; '))} |`);
  }
  out.push(
    '',
    '---',
    '',
    `Plan link: ${link}`,
    '',
    `Made with the obligations and deadlines planner at ${model.page}, from the obligation register of chapter 08 (${model.chapter}). ${model.license} (${model.licenseUrl}), attribution: Jorge García Aibar.`,
  );
  return `${out.join('\n')}\n`;
}

export const CSV_HEADER = [
  'id', 'obligation', 'clause', 'framework', 'your_roles', 'system_classes', 'duty_holder',
  'artefact', 'layers', 'applies_from_for_you', 'status_on_reference_date', 'days_from_reference_date',
  'register_status', 'later_dates', 'patterns', 'notes', 'url', 'reviewed',
];

/** The plan as CSV rows (header first); lib.js toCsv writes RFC 4180. */
export function planCsvRows(model, plan) {
  const rows = [CSV_HEADER];
  for (const i of plan.items) {
    const r = i.row;
    rows.push([
      r.id, r.title, r.clause, r.framework, roleNames(model, i.roles).join('; '),
      i.classes.map((c) => classLabel(model, c)).join('; '), r.dutyHolder ?? '', r.artefact,
      r.layers.join(' '), i.start ?? '', i.status.key, i.status.days ?? '', r.statusLabel,
      laterDates(i).join('; '), r.patterns.map((p) => p.title).join('; '), i.notes.join(' '), r.url, r.reviewed,
    ]);
  }
  for (const o of plan.outside) {
    const d = o.duty;
    rows.push([
      '', `${d.article} ${d.title} (outside the register)`, d.article, 'EU AI Act', roleNames(model, o.roles).join('; '),
      o.classes.map((c) => classLabel(model, c)).join('; '), '', d.artefact, '', o.start, o.status.key, o.status.days,
      '', o.dates.slice(1).map((x) => `${x.date} ${x.note}`).join('; '), '', d.condition ?? '', d.url, model.asOf,
    ]);
  }
  return rows;
}

/** The plan as JSON, in the open-data envelope (notice, version, licence,
 *  DOIs, schemaVersion, schema, self, source, citation). */
export function planJson(model, plan, { link, today }) {
  return {
    ...model.envelope,
    self: link,
    kind: PLAN_KIND,
    toolNotice: model.notice,
    readingAid: model.aid,
    generatedOn: today,
    referenceDate: plan.ref,
    registerAsOf: model.asOf,
    inputs: { roles: plan.roles, systemClasses: plan.classes },
    obligations: plan.items.map((i) => ({
      ...i.row.record,
      plan: {
        roles: i.roles,
        systemClasses: i.classes,
        startsOn: i.start,
        statusOnReferenceDate: i.status.key,
        daysFromReferenceDate: i.status.days,
        dates: i.dates.map(({ date, kind, note }) => ({ date, kind, note })),
        notes: i.notes,
      },
    })),
    outsideRegister: plan.outside.map((o) => ({
      id: o.duty.id,
      article: o.duty.article,
      title: o.duty.title,
      duty: o.duty.duty,
      artefact: o.duty.artefact,
      condition: o.duty.condition ?? null,
      url: o.duty.url,
      roles: o.roles,
      systemClasses: o.classes,
      startsOn: o.start,
      statusOnReferenceDate: o.status.key,
      daysFromReferenceDate: o.status.days,
      dates: o.dates.map(({ date, kind, note }) => ({ date, kind, note })),
    })),
    dates: planDates(plan).map((e) => ({
      date: e.date,
      starts: [...e.starts.map((s) => s.item.row.id), ...e.outside.map((o) => o.item.duty.article)],
      laterSteps: e.steps.map((s) => ({ id: s.item.row.id, note: s.note })),
    })),
  };
}

/** One all-day event per date, for lib.js toIcs. The UID is stable for the same
 *  date and the same answers, so a re-import updates instead of duplicating. */
export function planIcsEvents(model, plan, { link }) {
  const key = slug(`${encodeState(model, plan).r}-${encodeState(model, plan).c}`) || 'plan';
  return planDates(plan).map((e) => {
    const clauses = [...e.starts.map((s) => s.item.row.clause), ...e.outside.map((o) => o.item.duty.article)];
    const head = clauses.length
      ? `${clauses.slice(0, 4).join(', ')}${clauses.length > 4 ? ` and ${clauses.length - 4} more` : ''} start to apply`
      : `${plural(e.steps.length, 'later step', 'later steps')}`;
    return {
      id: `obligations-plan-${e.date}-${key}`,
      date: e.date,
      summary: `EU AI Act: ${head}`,
      description: [
        ...dateDetail(e),
        '',
        model.notice,
        model.aid,
        `Plan: ${link}`,
      ].join('\n'),
      url: link,
    };
  });
}

// ---- Timeline --------------------------------------------------------------------

/**
 * The dates of the plan on a time axis, as SVG markup with the site's figure
 * classes (.figc: colours come from the theme tokens). One row per date: its
 * label, then a dot on the axis and a line to the right (in force from then
 * on). Filled dot: applies on the reference date; hollow: later. The dashed
 * rule marks the reference date. On a narrow screen the label sits above its
 * strip so the text keeps its size.
 */
export function timelineSvg(entries, { narrow, ref, asOf, title, idPrefix = 'opl-tl' }) {
  const W = narrow ? 340 : 760;
  const x0 = narrow ? 14 : 380;
  const x1 = W - 16;
  const rowH = narrow ? 44 : 30;
  const top = 40;
  const years = [...entries.map((e) => e.date), ref].map((d) => +d.slice(0, 4));
  const y0 = Math.min(...years);
  const y1 = Math.max(...years) + 1;
  const T0 = utc(`${y0}-01-01`);
  const T1 = utc(`${y1}-01-01`);
  const tx = (iso) => x0 + ((utc(iso) - T0) / (T1 - T0)) * (x1 - x0);
  const bottom = top + 8 + entries.length * rowH;
  const legendY = bottom + 30;
  const H = legendY + (narrow ? 88 : 44);
  const out = [];
  const text = (x, y, value, cls = '', anchor = 'start', size = 13) =>
    out.push(`<text x="${x.toFixed(1)}" y="${y}" font-size="${size}" text-anchor="${anchor}"${cls ? ` class="${cls}"` : ''}>${xml(value)}</text>`);

  const passed = entries.filter((e) => e.date <= ref).length;
  const desc = entries.length
    ? `${entries.length} dates from ${entries[0].date} to ${entries[entries.length - 1].date}; ${passed} on or before the reference date ${ref}. ${entries.map((e) => `${e.date}: ${dateSummary(e)}`).join('. ')}.`
    : `No dated duty in this plan. Reference date ${ref}.`;
  out.push(
    `<svg xmlns="http://www.w3.org/2000/svg" class="figc" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${idPrefix}-t ${idPrefix}-d"${narrow ? ` style="max-width:${Math.round(W * 1.3)}px"` : ''}>`,
    `<title id="${idPrefix}-t">${xml(title)}</title>`,
    `<desc id="${idPrefix}-d">${xml(desc)}</desc>`,
  );

  // Year ticks and gridlines.
  const step = (y1 - y0) * 34 > x1 - x0 ? 2 : 1;
  for (let y = y0; y <= y1; y += 1) {
    const x = tx(`${y}-01-01`);
    out.push(`<line class="rule" x1="${x.toFixed(1)}" y1="${top - 6}" x2="${x.toFixed(1)}" y2="${bottom}"/>`);
    if ((y - y0) % step === 0 && y < y1) text(x + 3, top - 12, String(y), 'mono muted', 'start', 12);
  }

  entries.forEach((e, i) => {
    const y = top + 8 + i * rowH;
    const cy = narrow ? y + 32 : y + rowH / 2;
    const ty = narrow ? y + 15 : cy + 4.5;
    text(narrow ? x0 : 12, ty, e.date, 'mono');
    text(narrow ? x0 + 92 : 110, ty, dateSummary(e, narrow), 'ink2');
    const x = tx(e.date);
    out.push(
      `<line x1="${x.toFixed(1)}" y1="${cy}" x2="${x1}" y2="${cy}" style="stroke:var(--muted);stroke-width:2"/>`,
      `<circle cx="${x.toFixed(1)}" cy="${cy}" r="5" style="stroke:var(--ink);stroke-width:2;fill:${e.date <= ref ? 'var(--ink)' : 'var(--bg)'}"/>`,
    );
  });

  // Reference date: one rule across the plot (wide), or across each strip and
  // the axis (narrow), so it never runs through a label.
  const rx = tx(ref).toFixed(1);
  const refRule = (y1, y2) =>
    out.push(`<line x1="${rx}" y1="${y1}" x2="${rx}" y2="${y2}" style="stroke:var(--ink-2);stroke-width:1.5;stroke-dasharray:4 4"/>`);
  if (narrow) {
    refRule(top - 6, top + 4);
    for (let i = 0; i < entries.length; i += 1) refRule(top + 8 + i * rowH + 22, top + 8 + i * rowH + 42);
  } else refRule(top - 6, bottom + 4);

  // Legend and source line.
  const lx = narrow ? x0 : 12;
  out.push(`<circle cx="${lx + 5}" cy="${legendY - 4}" r="5" style="stroke:var(--ink);stroke-width:2;fill:var(--ink)"/>`);
  text(lx + 16, legendY, 'applies on the reference date', 'ink2', 'start', 12.5);
  const second = narrow ? { x: lx, y: legendY + 20 } : { x: 250, y: legendY };
  out.push(`<circle cx="${second.x + 5}" cy="${second.y - 4}" r="5" style="stroke:var(--ink);stroke-width:2;fill:var(--bg)"/>`);
  text(second.x + 16, second.y, 'later', 'ink2', 'start', 12.5);
  const third = narrow ? { x: lx, y: legendY + 40 } : { x: 330, y: legendY };
  out.push(`<line x1="${third.x}" y1="${third.y - 4}" x2="${third.x + 18}" y2="${third.y - 4}" style="stroke:var(--ink-2);stroke-width:1.5;stroke-dasharray:4 4"/>`);
  text(third.x + 24, third.y, `reference date ${ref}`, 'ink2', 'start', 12.5);
  if (narrow) {
    text(lx, H - 26, `As of ${asOf}`, 'mono muted', 'start', 12);
    text(lx, H - 8, 'source: obligation register, ch. 08', 'mono muted', 'start', 12);
  } else text(lx, H - 8, `As of ${asOf} · source: obligation register, chapter 08`, 'mono muted', 'start', 12);
  out.push('</svg>');
  return out.join('');
}
