// form-kit.js: form plumbing shared by the /toolkit tools that turn a
// questionnaire into a document (vendor due diligence, incident clock, agent
// control profile, fairness metric chooser). It sits on top of lib.js and adds
// what those four need and lib.js leaves to each tool: reading a form into the
// flat parameter object the URL fragment carries and back, the accessible error
// summary, date arithmetic in UTC and a few text helpers. Like lib.js it has no
// dependencies, sends nothing anywhere and touches no DOM at import time, so
// tests/toolkit-builders-b.spec.ts can unit-test the pure parts in Node.

// ---- Parameters ------------------------------------------------------------------

/** 'a,b' -> ['a', 'b']; empty, null and undefined -> []. */
export function list(value) {
  return String(value ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Read every named control of `form` into a flat object of strings: a radio
 *  group gives its checked value, a checkbox group its checked values joined
 *  by commas, any other control its trimmed value. Empty values are left out,
 *  so the object encodes into the shortest fragment. */
export function readForm(form) {
  const out = {};
  for (const el of form.elements) {
    const name = el.getAttribute?.('name');
    if (!name || el.disabled || el.matches?.(':disabled')) continue;
    if (el.type === 'radio') {
      if (el.checked) out[name] = el.value;
    } else if (el.type === 'checkbox') {
      if (el.checked) out[name] = out[name] ? `${out[name]},${el.value}` : el.value;
    } else if (el.type === 'file' || el.type === 'button' || el.type === 'submit') {
      continue;
    } else {
      const value = String(el.value ?? '').trim();
      if (value) out[name] = value;
    }
  }
  return out;
}

/** Set every named control of `form` from `params` (the inverse of readForm).
 *  Controls absent from `params` are cleared. */
export function applyForm(form, params) {
  for (const el of form.elements) {
    const name = el.getAttribute?.('name');
    if (!name) continue;
    const value = params?.[name];
    if (el.type === 'radio') el.checked = value !== undefined && el.value === value;
    else if (el.type === 'checkbox') el.checked = list(value).includes(el.value);
    else if (el.type === 'file' || el.type === 'button' || el.type === 'submit') continue;
    else el.value = value === undefined ? '' : String(value);
  }
}

/** Keep only the keys a tool knows, with string values: what an imported file
 *  or a fragment may set. */
export function pickParams(source, keys) {
  const out = {};
  if (!source || typeof source !== 'object') return out;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.length <= 2000) out[key] = value;
    else if (typeof value === 'number' && Number.isFinite(value)) out[key] = String(value);
  }
  return out;
}

// ---- Errors ------------------------------------------------------------------------

/** Mark or clear the error of one field. `field` is the element carrying
 *  `data-field`; its `.tool-error` receives the message and the control (or
 *  fieldset) named by `data-describes` gets aria-describedby/aria-invalid. */
export function setFieldError(field, message) {
  if (!field) return;
  const error = field.querySelector(':scope > .tool-error');
  const target =
    (field.getAttribute('data-describes') &&
      document.getElementById(field.getAttribute('data-describes'))) ||
    field;
  const hint = field.getAttribute('data-hint-id');
  if (error) {
    error.textContent = message || '';
    error.hidden = !message;
  }
  const ids = [message && error?.id, hint].filter(Boolean).join(' ');
  if (ids) target.setAttribute('aria-describedby', ids);
  else target.removeAttribute('aria-describedby');
  if (message) {
    field.setAttribute('data-invalid', '');
    if (target !== field) target.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('data-invalid');
    if (target !== field) target.removeAttribute('aria-invalid');
  }
}

/** Clear every field error inside `root`. */
export function clearFieldErrors(root) {
  for (const field of root.querySelectorAll('[data-field]')) setFieldError(field, null);
}

/**
 * Show the error summary: `errors` is [{ field: 'id-of-data-field-element',
 * focus: 'id-of-control', message }]. Each item links to its field; the
 * summary receives focus. Returns true when there were errors.
 */
export function showErrorSummary(summary, errors, { focusOn } = {}) {
  if (!summary) return errors.length > 0;
  const listEl = summary.querySelector('ul');
  if (!errors.length) {
    summary.hidden = true;
    listEl?.replaceChildren();
    return false;
  }
  listEl.replaceChildren(
    ...errors.map((error) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${error.field}`;
      link.textContent = error.message;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const control = document.getElementById(error.focus || error.field);
        const focusable =
          control?.matches?.('input, select, textarea, button')
            ? control
            : control?.querySelector?.('input, select, textarea, button');
        (focusable || control)?.focus();
      });
      li.append(link);
      return li;
    }),
  );
  summary.hidden = false;
  if (focusOn) focusOn(summary);
  else summary.focus?.();
  return true;
}

// ---- Dates (all arithmetic in UTC milliseconds) -------------------------------------

export const HOUR = 3_600_000;
export const DAY = 24 * HOUR;

/** `ms` plus `hours`. */
export const addHours = (ms, hours) => ms + hours * HOUR;

/** `ms` plus `days` of 24 hours. */
export const addDays = (ms, days) => ms + days * DAY;

/** `ms` plus `months` calendar months in UTC: the same day and time, or the
 *  last day of the target month when it is shorter (31 Jan + 1 = 28/29 Feb). */
export function addMonths(ms, months) {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + months;
  const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Date.UTC(
    y,
    m,
    Math.min(d.getUTCDate(), lastDay),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
  );
}

/** ISO 8601 in UTC without milliseconds: 2026-09-18T15:02:00Z. */
export function isoUtc(ms) {
  return new Date(ms).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/** A `datetime-local` value (local wall time) -> epoch ms, or null. */
export function parseLocalDateTime(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(value ?? ''));
  if (!match) return null;
  const [, y, mo, d, h, mi] = match.map(Number);
  const date = new Date(y, mo - 1, d, h, mi);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date.getTime();
}

/** Epoch ms -> a `datetime-local` value in local wall time. */
export function toLocalDateTime(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** An ISO date-time with a zone (Z or +hh:mm) -> epoch ms, or null. */
export function parseIso(value) {
  const text = String(value ?? '');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(text)) return null;
  const ms = Date.parse(text);
  return Number.isNaN(ms) ? null : ms;
}

/** YYYY-MM-DD of `ms` in local time. */
export function localDate(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** A readable local date and time, with the zone, for the screen and reports. */
export function formatLocal(ms) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(ms));
  } catch {
    return isoUtc(ms);
  }
}

/** A plain YYYY-MM-DD date string check. */
export function isDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value ?? ''));
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** YYYY-MM-DD plus `months` calendar months (clamped to the month's end). */
export function addMonthsToDate(value, months) {
  if (!isDate(value)) return '';
  const [y, m, d] = value.split('-').map(Number);
  return new Date(addMonths(Date.UTC(y, m - 1, d), months)).toISOString().slice(0, 10);
}

// ---- Text ----------------------------------------------------------------------------

/** ['a', 'b', 'c'] -> 'a, b and c'. */
export function joinList(items) {
  const parts = items.filter(Boolean);
  if (parts.length <= 1) return parts.join('');
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/** Collapse whitespace and cap the length of free text a reader typed. */
export function cleanText(value, max = 200) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

/** Absolute URL check for evidence links (http, https, urn and the like). */
export function isUri(value) {
  return /^[a-z][a-z0-9+.-]*:\S+$/i.test(String(value ?? ''));
}
