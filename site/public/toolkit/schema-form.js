// schema-form.js: the form engine of the /toolkit document builders. It turns
// the section specs of src/data/doc-builders.ts (handed over in the page's JSON
// island) into an accessible form bound to one JSON document: every control
// carries the dotted path of the field it edits, every change updates the
// document in place, and repeatable groups (risks, measures, components) add
// and remove items. Validation errors from builders.js `validate` come back to
// the control that caused them (message under the field, aria-invalid, and an
// error summary the page can focus).
//
// Accessibility contract (openspec toolkit-foundation, rule 4): a fieldset and
// legend per section and per group item, a label per control, hints and errors
// tied with aria-describedby, 44px targets (toolkit.css), no motion.
import { h } from './lib.js';
import { clone, getPath, setPath, deletePath, splitPath, schemaAt, describeError } from './builders.js';

/** Element id for a path: `prefix-risks-0-likelihood`. */
export function fieldId(prefix, path) {
  return `${prefix}-${String(path).replace(/[^A-Za-z0-9]+/g, '-')}`;
}

const cap = (text) => String(text).charAt(0).toUpperCase() + String(text).slice(1);

/** "a risk", "an approval". */
const withArticle = (noun) => `${/^[aeiou]/i.test(String(noun)) ? "an" : "a"} ${noun}`;

const pad = (n) => String(n).padStart(2, '0');

/** RFC 3339 UTC -> the local value a datetime-local control shows. */
function toLocalInput(iso) {
  const time = Date.parse(String(iso ?? ''));
  if (Number.isNaN(time)) return '';
  const d = new Date(time);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** A datetime-local value (reader's local time) -> RFC 3339 UTC, seconds kept. */
function fromLocalInput(value) {
  if (!value) return undefined;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return value;
  return new Date(time).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

const visible = (spec, type) => !spec.showFor || !type || spec.showFor.includes(type);

/**
 * Create a form bound to a document.
 * @param {{ root: HTMLElement, sections: any[], schema: any, prefix: string,
 *   onChange?: (doc: any, path: string) => void, presets?: (field: any, type?: string) => string[] }} options
 */
export function createForm({ root, sections, schema, prefix, onChange, presets }) {
  let doc = {};
  let type;

  // ---- spec lookup ----------------------------------------------------------
  /** The spec (and a readable label) for a concrete path such as risks.2.severity. */
  function specFor(path) {
    const parts = splitPath(path);
    for (const section of sections) {
      for (const field of section.fields) {
        const own = splitPath(field.path);
        const head = parts.slice(0, own.length);
        if (head.join('.') !== own.join('.')) continue;
        if (parts.length === own.length) return { spec: field, label: field.label };
        if (field.kind === 'group' && typeof parts[own.length] === 'number') {
          const index = /** @type {number} */ (parts[own.length]);
          const itemName = `${cap(field.itemLabel ?? 'item')} ${index + 1}`;
          const rest = parts.slice(own.length + 1).join('.');
          if (!rest) return { spec: field, label: itemName };
          const sub = field.item.find((f) => f.path === rest || rest.startsWith(`${f.path}.`));
          if (sub) return { spec: sub, label: `${itemName}: ${sub.label}` };
          return { spec: field, label: itemName };
        }
        if (field.kind === 'clauses' || field.kind === 'checks' || field.kind === 'lines') {
          return { spec: field, label: field.label };
        }
      }
    }
    return { spec: undefined, label: '' };
  }

  function hintFor(spec, path) {
    if (spec.hint) return spec.hint;
    const node = schemaAt(schema, path.replace(/\.\d+\./g, '.0.'));
    return node && typeof node.description === 'string' ? node.description : '';
  }

  // ---- controls ---------------------------------------------------------------
  function describedBy(id, hint) {
    return hint ? `${id}-hint` : undefined;
  }

  function scalarControl(spec, path, id, hint) {
    const value = getPath(doc, path);
    const common = {
      id,
      name: path,
      'data-path': path,
      'data-kind': spec.kind,
      'aria-describedby': describedBy(id, hint),
      'aria-required': spec.required ? 'true' : undefined,
    };
    switch (spec.kind) {
      case 'textarea':
      case 'lines': {
        const area = h('textarea', { ...common, class: 'tool-input bld-area', rows: spec.kind === 'lines' ? 3 : 4 });
        area.value = spec.kind === 'lines' ? (Array.isArray(value) ? value.join('\n') : '') : String(value ?? '');
        if (spec.placeholder) area.placeholder = spec.placeholder;
        return area;
      }
      case 'select':
      case 'bool': {
        const options = spec.kind === 'bool' ? [['true', 'Yes'], ['false', 'No']] : spec.options ?? [];
        const select = h(
          'select',
          { ...common, class: 'tool-select' },
          h('option', { value: '', text: 'Not answered' }),
          ...options.map(([v, text]) => h('option', { value: v, text })),
        );
        select.value = value === undefined || value === null ? '' : String(value);
        return select;
      }
      default: {
        const inputType =
          { date: 'date', datetime: 'datetime-local', url: 'url', email: 'email', int: 'number', number: 'number' }[
            spec.kind
          ] ?? 'text';
        const input = h('input', {
          ...common,
          class: 'tool-input',
          type: inputType,
          autocomplete: 'off',
          spellcheck: inputType === 'text' ? undefined : 'false',
          inputmode: spec.kind === 'int' ? 'numeric' : spec.kind === 'number' ? 'decimal' : undefined,
          step: spec.kind === 'number' ? 'any' : spec.kind === 'int' ? '1' : undefined,
          placeholder: spec.placeholder,
        });
        input.value =
          spec.kind === 'datetime' ? toLocalInput(value) : value === undefined || value === null ? '' : String(value);
        return input;
      }
    }
  }

  function scalarField(spec, path) {
    const id = fieldId(prefix, path);
    const hint = hintFor(spec, path);
    return h(
      'div',
      { class: 'tool-field bld-field', 'data-field': path },
      h('label', { for: id }, spec.label, spec.required ? h('span', { class: 'bld-req', text: ' (required)' }) : null),
      scalarControl(spec, path, id, hint),
      hint ? h('p', { class: 'tool-hint', id: `${id}-hint`, text: hint }) : null,
      h('p', { class: 'tool-error', id: `${id}-error`, hidden: true }),
    );
  }

  function refsChoices(spec, path, id) {
    const items = getPath(doc, spec.source);
    const chosen = new Set(Array.isArray(getPath(doc, path)) ? getPath(doc, path) : []);
    const list = (Array.isArray(items) ? items : []).filter((item) => item && item[spec.sourceKey]);
    if (!list.length) return [h('p', { class: 'tool-hint', text: 'Add a risk with an id first; it will appear here.' })];
    return list.map((item) => {
      const key = String(item[spec.sourceKey]);
      const boxId = `${id}-${key.replace(/[^A-Za-z0-9]+/g, '-')}`;
      const text = item[spec.sourceText] ? `${key}: ${item[spec.sourceText]}` : key;
      return h(
        'div',
        { class: 'bld-check' },
        h('input', { type: 'checkbox', id: boxId, value: key, 'data-path': path, 'data-kind': 'refs', checked: chosen.has(key) }),
        h('label', { for: boxId, text }),
      );
    });
  }

  function refsField(spec, path) {
    const id = fieldId(prefix, path);
    const hint = hintFor(spec, path);
    return h(
      'fieldset',
      { class: 'bld-refs', id, 'data-refs': path, 'data-source': spec.source, 'aria-describedby': hint ? `${id}-hint` : undefined },
      h('legend', { class: 'bld-sublegend', text: spec.label }),
      hint ? h('p', { class: 'tool-hint', id: `${id}-hint`, text: hint }) : null,
      h('div', { class: 'bld-checks', 'data-refs-list': path }, ...refsChoices(spec, path, id)),
    );
  }

  function checksField(spec, path) {
    const id = fieldId(prefix, path);
    const current = Array.isArray(getPath(doc, path)) ? getPath(doc, path) : [];
    const choices = presets ? presets(spec, type) : (spec.options ?? []).map(([v]) => v);
    const others = current.filter((value) => !choices.includes(value));
    const otherId = `${id}-other`;
    const area = h('textarea', {
      id: otherId,
      class: 'tool-input bld-area',
      rows: 3,
      'data-path': path,
      'data-kind': 'checks-other',
      'aria-describedby': `${otherId}-hint`,
    });
    area.value = others.join('\n');
    return h(
      'fieldset',
      { class: 'bld-refs', id, 'data-checks': path },
      h('legend', { class: 'bld-sublegend', text: spec.label }),
      h(
        'div',
        { class: 'bld-checks' },
        ...choices.map((choice, i) => {
          const boxId = `${id}-${i}`;
          return h(
            'div',
            { class: 'bld-check' },
            h('input', { type: 'checkbox', id: boxId, value: choice, 'data-path': path, 'data-kind': 'checks', checked: current.includes(choice) }),
            h('label', { for: boxId, text: choice }),
          );
        }),
      ),
      spec.allowOther
        ? h(
            'div',
            { class: 'tool-field bld-field' },
            h('label', { for: otherId, text: 'Other triggers' }),
            area,
            h('p', { class: 'tool-hint', id: `${otherId}-hint`, text: 'One per line.' }),
          )
        : null,
      h('p', { class: 'tool-error', id: `${id}-error`, hidden: true }),
    );
  }

  function clausesField(spec, path) {
    const id = fieldId(prefix, path);
    const current = Array.isArray(getPath(doc, path)) ? getPath(doc, path) : [];
    return h(
      'div',
      { class: 'bld-clauses', id, 'data-clauses': path },
      ...spec.clauses.map((row) => {
        const boxId = `${id}-${row.clause.replace(/\./g, '-')}`;
        const area = h('textarea', {
          id: boxId,
          class: 'tool-input bld-area',
          rows: 3,
          'data-path': path,
          'data-kind': 'clauses',
          'data-clause': row.clause,
          'data-heading': row.heading,
          'aria-describedby': `${boxId}-hint`,
        });
        area.value = current.find((entry) => entry && entry.clause === row.clause)?.text ?? '';
        return h(
          'div',
          { class: 'tool-field bld-field' },
          h('label', { for: boxId }, h('span', { class: 'bld-clause-id', text: row.clause }), ` ${row.heading}`),
          area,
          h('p', { class: 'tool-hint', id: `${boxId}-hint`, text: row.hint }),
        );
      }),
      h('p', { class: 'tool-error', id: `${id}-error`, hidden: true }),
    );
  }

  function groupItem(spec, path, index) {
    const itemPath = `${path}.${index}`;
    const name = `${cap(spec.itemLabel ?? 'item')} ${index + 1}`;
    return h(
      'li',
      { class: 'bld-item' },
      h(
        'fieldset',
        { class: 'bld-item-set', id: fieldId(prefix, itemPath) },
        h('legend', { class: 'bld-sublegend', text: name }),
        ...spec.item.map((sub) => fieldFor(sub, `${itemPath}.${sub.path}`)),
        h('button', {
          type: 'button',
          class: 'btn btn-secondary bld-remove',
          'data-remove': itemPath,
          'data-group-path': path,
          text: `Remove ${spec.itemLabel ?? 'item'} ${index + 1}`,
        }),
      ),
    );
  }

  function groupField(spec, path) {
    const id = fieldId(prefix, path);
    const hint = hintFor(spec, path);
    const items = Array.isArray(getPath(doc, path)) ? getPath(doc, path) : [];
    return h(
      'fieldset',
      { class: 'bld-group', id, 'data-group': path, 'aria-describedby': hint ? `${id}-hint` : undefined },
      h('legend', { class: 'bld-sublegend' }, spec.label, spec.required ? h('span', { class: 'bld-req', text: ' (at least one)' }) : null),
      hint ? h('p', { class: 'tool-hint', id: `${id}-hint`, text: hint }) : null,
      h('p', { class: 'tool-error', id: `${id}-error`, hidden: true }),
      h('ol', { class: 'bld-items', 'data-items': path }, ...items.map((_, i) => groupItem(spec, path, i))),
      h('button', {
        type: 'button',
        class: 'btn btn-secondary bld-add',
        'data-add': path,
        text: `Add ${withArticle(spec.itemLabel ?? 'item')}`,
      }),
    );
  }

  function fieldFor(spec, path) {
    switch (spec.kind) {
      case 'group':
        return groupField(spec, path);
      case 'refs':
        return refsField(spec, path);
      case 'checks':
        return checksField(spec, path);
      case 'clauses':
        return clausesField(spec, path);
      default:
        return scalarField(spec, path);
    }
  }

  function render() {
    root.replaceChildren(
      ...sections
        .filter((section) => visible(section, type))
        .map((section) =>
          h(
            'fieldset',
            { class: 'tool-fieldset bld-section', id: `${prefix}-sec-${section.id}`, 'data-section': section.id },
            h('legend', { class: 'tool-legend', text: section.legend }),
            section.hint ? h('p', { class: 'tool-hint', text: section.hint }) : null,
            h(
              'div',
              { class: 'bld-fields' },
              ...section.fields.filter((field) => visible(field, type)).map((field) => fieldFor(field, field.path)),
            ),
          ),
        ),
    );
  }

  function specForGroup(path) {
    for (const section of sections) {
      for (const field of section.fields) if (field.kind === 'group' && field.path === path) return field;
    }
    return undefined;
  }

  function rerenderGroup(path) {
    const spec = specForGroup(path);
    const old = root.querySelector(`[data-group="${CSS.escape(path)}"]`);
    if (!spec || !old) return;
    old.replaceWith(groupField(spec, path));
  }

  function refreshRefs(source) {
    for (const box of root.querySelectorAll(`[data-refs][data-source="${CSS.escape(source)}"]`)) {
      const path = box.getAttribute('data-refs');
      const { spec } = specFor(path);
      const list = box.querySelector('[data-refs-list]');
      if (spec && list) list.replaceChildren(...refsChoices(spec, path, box.id));
    }
  }

  // ---- reading values ----------------------------------------------------------
  function readControl(el) {
    const path = el.getAttribute('data-path');
    const kind = el.getAttribute('data-kind');
    if (!path) return;
    if (kind === 'refs' || kind === 'checks' || kind === 'checks-other') {
      const boxes = [...root.querySelectorAll(`input[type="checkbox"][data-path="${CSS.escape(path)}"]`)];
      const values = boxes.filter((b) => b.checked).map((b) => b.value);
      if (kind !== 'refs') {
        const other = root.querySelector(`textarea[data-kind="checks-other"][data-path="${CSS.escape(path)}"]`);
        if (other) values.push(...other.value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean));
      }
      if (values.length) setPath(doc, path, values);
      else deletePath(doc, path);
      return path;
    }
    if (kind === 'clauses') {
      const areas = [...root.querySelectorAll(`textarea[data-kind="clauses"][data-path="${CSS.escape(path)}"]`)];
      const entries = areas
        .filter((a) => a.value.trim())
        .map((a) => ({ clause: a.getAttribute('data-clause'), heading: a.getAttribute('data-heading'), text: a.value }));
      if (entries.length) setPath(doc, path, entries);
      else deletePath(doc, path);
      return path;
    }
    const raw = /** @type {HTMLInputElement} */ (el).value;
    let value;
    if (kind === 'lines') {
      const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      value = lines.length ? lines : undefined;
    } else if (kind === 'bool') {
      value = raw === 'true' ? true : raw === 'false' ? false : undefined;
    } else if (kind === 'int' || kind === 'number') {
      const n = Number(raw);
      value = raw.trim() === '' ? undefined : Number.isFinite(n) ? n : raw;
    } else if (kind === 'datetime') {
      value = fromLocalInput(raw);
    } else if (kind === 'select') {
      const node = schemaAt(schema, path);
      value = raw === '' ? undefined : node && node.type === 'integer' ? Number(raw) : raw;
    } else {
      value = raw === '' ? undefined : raw;
    }
    if (value === undefined) deletePath(doc, path);
    else setPath(doc, path, value);
    return path;
  }

  function nextId(spec, items) {
    const taken = new Set(items.map((item) => item && item[spec.idKey]));
    let n = items.length + 1;
    while (taken.has(`${spec.idPrefix}${n}`)) n++;
    return `${spec.idPrefix}${n}`;
  }

  // ---- events -------------------------------------------------------------------
  function changed(path) {
    if (!path) return;
    const head = String(splitPath(path)[0]);
    if (root.querySelector(`[data-refs][data-source="${CSS.escape(head)}"]`)) refreshRefs(head);
    onChange?.(doc, path);
  }

  root.addEventListener('input', (event) => {
    const el = /** @type {HTMLElement} */ (event.target);
    if (el.matches('input[type="checkbox"]')) return;
    changed(readControl(el));
  });
  root.addEventListener('change', (event) => {
    const el = /** @type {HTMLElement} */ (event.target);
    if (el.matches('select, input[type="checkbox"], input[type="date"], input[type="datetime-local"]')) {
      changed(readControl(el));
    }
  });
  root.addEventListener('click', (event) => {
    const target = /** @type {HTMLElement} */ (event.target);
    const add = target.closest('[data-add]');
    const remove = target.closest('[data-remove]');
    if (add) {
      const path = add.getAttribute('data-add');
      const spec = specForGroup(path);
      const items = Array.isArray(getPath(doc, path)) ? getPath(doc, path) : [];
      const item = spec && spec.idPrefix ? { [spec.idKey]: nextId(spec, items) } : {};
      setPath(doc, path, [...items, item]);
      rerenderGroup(path);
      const fresh = root.querySelector(`[data-group="${CSS.escape(path)}"] .bld-item:last-child`);
      // Focus the first control still empty (an auto-assigned id is already filled).
      const controls = [...(fresh?.querySelectorAll('input:not([type="checkbox"]), select, textarea') ?? [])];
      const first = controls.find((el) => !(/** @type {HTMLInputElement} */ (el).value)) ?? controls[0];
      if (first instanceof HTMLElement) first.focus();
      changed(path);
    } else if (remove) {
      const itemPath = remove.getAttribute('data-remove');
      const path = remove.getAttribute('data-group-path');
      deletePath(doc, itemPath);
      const items = getPath(doc, path);
      if (Array.isArray(items) && !items.length) deletePath(doc, path);
      rerenderGroup(path);
      const addButton = root.querySelector(`[data-add="${CSS.escape(path)}"]`);
      if (addButton instanceof HTMLElement) addButton.focus();
      changed(path);
    }
  });

  // ---- errors ----------------------------------------------------------------------
  function clearErrors() {
    for (const el of root.querySelectorAll('.tool-error')) {
      el.textContent = '';
      el.hidden = true;
    }
    for (const el of root.querySelectorAll('[aria-invalid="true"]')) {
      el.removeAttribute('aria-invalid');
      const ids = (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((t) => t && !t.endsWith('-error'));
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    }
    for (const el of root.querySelectorAll('[data-invalid]')) el.removeAttribute('data-invalid');
  }

  /** Place errors next to their controls; return summary items { id, message }. */
  function showErrors(errors) {
    clearErrors();
    const items = [];
    for (const error of errors) {
      const parts = [...error.path];
      const path = parts.join('.');
      const { label } = specFor(path);
      const message = describeError(error, label || path);
      // The nearest rendered element for the path (or one of its parents).
      let target = null;
      while (parts.length && !target) {
        target = document.getElementById(fieldId(prefix, parts.join('.')));
        if (!target) parts.pop();
      }
      if (target) {
        const errorEl = document.getElementById(`${target.id}-error`);
        if (errorEl) {
          errorEl.textContent = errorEl.textContent ? `${errorEl.textContent} ${message}` : message;
          errorEl.hidden = false;
        }
        if (target.matches('input, select, textarea')) {
          target.setAttribute('aria-invalid', 'true');
          const ids = new Set((target.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
          if (errorEl) ids.add(errorEl.id);
          target.setAttribute('aria-describedby', [...ids].join(' '));
        } else {
          target.setAttribute('data-invalid', '');
        }
      }
      items.push({ id: target ? target.id : null, message });
    }
    return items;
  }

  return {
    render(nextDoc, nextType) {
      doc = clone(nextDoc ?? {}) ?? {};
      type = nextType;
      render();
    },
    setType(nextType) {
      type = nextType;
      render();
    },
    get doc() {
      return doc;
    },
    get type() {
      return type;
    },
    showErrors,
    clearErrors,
    labelFor: (path) => specFor(path).label,
  };
}

/** Fill an error summary (`.tool-errors` with a heading and a list) and focus it. */
export function renderErrorSummary(box, items, heading) {
  if (!box) return;
  const title = box.querySelector('h2, h3');
  if (title && heading) title.textContent = heading;
  const list = box.querySelector('ul');
  if (list) {
    list.replaceChildren(
      ...items.map((item) =>
        h('li', {}, item.id ? h('a', { href: `#${item.id}`, text: item.message }) : item.message),
      ),
    );
  }
  box.hidden = !items.length;
}
