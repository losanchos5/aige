// maturity-self-check.js: the client side of /toolkit/maturity-self-check.
// Reads the chapter 07 criteria from the page's JSON island, turns the five
// radio groups into a per-layer profile, draws it as inline SVG, names the
// floor (the weakest layer) and the single next move, and handles the link
// state, the exports (JSON, Markdown, SVG, PNG), saved profiles and the
// before/after comparison. All of it runs in this page; nothing is sent.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  store,
  isoDate,
  slug,
  downloadJson,
  downloadMarkdown,
  downloadSvg,
  downloadPng,
  copyText,
  readJsonFile,
  mdCell,
  xml,
  h,
  announce,
  focusOn,
} from './lib.js';

const KIND = 'aige.maturity-profile';
const VERSION = 1;
const SCHEMA = 'https://aigovernanceengineer.com/toolkit/maturity-profile.v1.schema.json';
const STORE_KEY = 'maturity-self-check.profiles';
const MAX_SAVED = 20;
const LAYERS = [1, 2, 3, 4, 5];

// Light-theme token values (src/styles/tokens.css) for the exported image, so
// a downloaded SVG or PNG reads the same wherever it is pasted or printed.
const EXPORT_PALETTE = {
  bg: '#F6F4EE',
  ink: '#15171C',
  ink2: '#3C4048',
  line: '#E3DFD5',
  tint: ['#CBD8F0', '#CFDCD3', '#EDD4D8', '#F1DAB4', '#D1E4BC'],
  tintInk: ['#1F3A63', '#25463F', '#5C2B3B', '#5A3D15', '#2E4A22'],
  font: 'Helvetica, Arial, sans-serif',
  mono: 'Menlo, Consolas, monospace',
};

// On screen the chart follows the theme through the same tokens.
const SCREEN_PALETTE = {
  bg: 'var(--bg)',
  ink: 'var(--ink)',
  ink2: 'var(--ink-2)',
  line: 'var(--line)',
  tint: LAYERS.map((n) => `var(--l${n})`),
  tintInk: LAYERS.map((n) => `var(--l${n}-ink)`),
  font: 'var(--font-body)',
  mono: 'var(--font-mono)',
};

const root = document.querySelector('[data-tool-app="maturity-self-check"]');
const data = readToolData();

if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);

  const form = app.querySelector('[data-msc-form]');
  const labelInput = form.querySelector('#msc-label');
  const errors = form.querySelector('[data-msc-errors]');
  const errorsList = form.querySelector('[data-msc-errors-list]');
  const result = app.querySelector('[data-msc-result]');
  const status = app.querySelector('[data-msc-status]');
  const compare = app.querySelector('#msc-compare');
  const levelName = (n) => (n === 0 ? 'None yet' : model.levels[n - 1].name);
  const layerOf = (n) => model.layers[n - 1];
  const patternUrl = (id) => `${model.patternsBase}#${id}`;
  const narrowQuery =
    typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 600px)') : null;
  const narrowScreen = () => Boolean(narrowQuery && narrowQuery.matches);

  let shown = false; // a result has been rendered at least once
  let savedMemory = null; // fallback list when storage is blocked
  let lastComparison = null;

  // ---- Reading and writing the answers ----------------------------------------

  /** The five answers, null where a layer is unanswered. */
  function readAnswers() {
    return LAYERS.map((n) => {
      const checked = form.querySelector(`input[name="layer-${n}"]:checked`);
      return checked ? Number(checked.value) : null;
    });
  }

  function setAnswers(levels) {
    LAYERS.forEach((n, i) => {
      for (const input of form.querySelectorAll(`input[name="layer-${n}"]`)) {
        input.checked = levels[i] !== null && Number(input.value) === levels[i];
      }
    });
  }

  const complete = (levels) => levels.every((level) => Number.isInteger(level));
  const encodeLevels = (levels) =>
    levels.map((level) => (level === null ? 'x' : String(level))).join('');

  function decodeLevels(text, allowPartial) {
    const pattern = allowPartial ? /^[0-5x]{5}$/ : /^[0-5]{5}$/;
    if (!pattern.test(String(text ?? ''))) return null;
    return [...text].map((char) => (char === 'x' ? null : Number(char)));
  }

  const cleanLabel = (text) =>
    String(text ?? '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);

  // ---- The model: floor and next move ------------------------------------------

  function analyse(levels) {
    const floor = Math.min(...levels);
    const floorLayers = LAYERS.filter((n) => levels[n - 1] === floor);
    if (floor === 5) return { floor, floorLayers, next: null };
    const layer = floorLayers[0];
    const to = floor + 1;
    const cell = layerOf(layer).cells[to - 1];
    return {
      floor,
      floorLayers,
      next: {
        layer,
        from: floor,
        to,
        criterion: cell.text,
        pattern: cell.pattern,
        patternTitle: cell.patternTitle,
        metrics: model.metrics[String(to)] ?? [],
        checklist: model.checklist[String(to)] ?? [],
        failure: model.failures[String(to)] ?? '',
      },
    };
  }

  const criterionOf = (layer, level) => (level === 0 ? null : layerOf(layer).cells[level - 1].text);
  const layerTitle = (n) => `${n} ${layerOf(n).name}`;
  const levelTitle = (n) => (n === 0 ? 'Level 0 (none yet)' : `Level ${n} (${levelName(n)})`);
  const joinNames = (names) =>
    names.length <= 1
      ? names.join('')
      : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

  function floorSentence(analysis) {
    const names = joinNames(analysis.floorLayers.map((n) => layerOf(n).name));
    if (analysis.floor === 0) {
      return `No level yet: ${names} ${analysis.floorLayers.length > 1 ? 'meet' : 'meets'} none of the Level 1 criteria.`;
    }
    return `Level ${analysis.floor}, ${levelName(analysis.floor)}. Set by ${names}.`;
  }

  // ---- The chart ----------------------------------------------------------------

  /**
   * The ragged profile as SVG markup. `series` holds one profile (the result)
   * or two (before, after). `mode` 'screen' uses the theme tokens; 'export'
   * uses fixed light values and adds a title and the notice, for a standalone
   * file. On a narrow screen the layer names sit above their bars, so the text
   * stays legible when the drawing scales down to a phone's width.
   */
  function chartSvg(series, { mode, idPrefix, title, floor }) {
    const p = mode === 'export' ? EXPORT_PALETTE : SCREEN_PALETTE;
    const narrow = mode !== 'export' && narrowScreen();
    const two = series.length > 1;
    const g = narrow
      ? { W: 340, x0: 10, colW: 64, rowH: two ? 64 : 58, lineX: 10, nameSize: 12, headSize: 10.5 }
      : { W: 760, x0: 272, colW: 94, rowH: 50, lineX: 16, nameSize: 12, headSize: 12 };
    const { W, x0, colW, rowH } = g;
    const head = mode === 'export' ? 56 : 0;
    const top = head + (narrow ? 46 : 52);
    const gridBottom = top + rowH * 5;
    const foot = (mode === 'export' ? 92 : 58) + (narrow && two ? 22 : 0);
    const H = gridBottom + foot;
    const out = [];
    const text = (x, y, value, style, anchor = 'start') =>
      out.push(
        `<text x="${x}" y="${y}" text-anchor="${anchor}" style="${style}">${xml(value)}</text>`,
      );
    const body = (size, colour, weight = 400) =>
      `font-family:${p.font};font-size:${size}px;font-weight:${weight};fill:${colour}`;
    const mono = (size, colour, weight = 400) =>
      `font-family:${p.mono};font-size:${size}px;font-weight:${weight};fill:${colour}`;

    const titleId = `${idPrefix}-title`;
    const descId = `${idPrefix}-desc`;
    const describe = series
      .map(
        (s) =>
          `${s.name}: ${s.levels.map((level, i) => `${layerOf(i + 1).name} ${level}`).join(', ')}`,
      )
      .join('. ');

    out.push(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${titleId} ${descId}">`,
      `<title id="${titleId}">${xml(title)}</title>`,
      `<desc id="${descId}">${xml(`${describe}. Levels run from 0 (none yet) to 5 (Continuous).`)}</desc>`,
    );
    if (mode === 'export') {
      out.push(`<rect x="0" y="0" width="${W}" height="${H}" style="fill:${p.bg}"/>`);
      text(20, 34, title, body(20, p.ink, 700));
    }

    // Column heads and grid.
    for (let k = 1; k <= 5; k += 1) {
      const cx = x0 + (k - 0.5) * colW;
      text(cx, top - (narrow ? 24 : 30), String(k), mono(13, p.ink, 700), 'middle');
      text(
        cx,
        top - (narrow ? 9 : 12),
        model.levels[k - 1].name,
        body(g.headSize, p.ink2),
        'middle',
      );
    }
    for (let k = 0; k <= 5; k += 1) {
      const x = x0 + k * colW;
      out.push(
        `<line x1="${x}" y1="${top - 4}" x2="${x}" y2="${gridBottom + 4}" style="stroke:${p.line};stroke-width:1"/>`,
      );
    }

    const points = series.map(() => []);
    const names = []; // drawn last, over the ragged line, with a ground-coloured halo
    LAYERS.forEach((n, i) => {
      const y = top + i * rowH;
      const cy = y + rowH / 2;
      // Name row: beside the bars (wide) or above them (narrow).
      const nameY = narrow ? y + 16 : cy + 4;
      out.push(
        `<line x1="${g.lineX}" y1="${y + rowH}" x2="${x0 + 5 * colW}" y2="${y + rowH}" style="stroke:${p.line};stroke-width:1"/>`,
      );
      names.push({ n, i, nameY });

      series.forEach((s, j) => {
        const level = s.levels[i];
        let barH;
        let by;
        if (narrow) {
          barH = two ? 12 : 22;
          by = two ? y + 26 + j * 16 : y + 26;
        } else {
          barH = two ? 14 : 28;
          by = two ? cy - 16 + j * 18 : cy - 14;
        }
        if (level > 0) {
          const style = s.outline
            ? `fill:none;stroke:${p.tintInk[i]};stroke-width:1.5;stroke-dasharray:5 3`
            : `fill:${p.tint[i]};stroke:${p.tintInk[i]};stroke-width:1`;
          out.push(
            `<rect x="${x0}" y="${by}" width="${level * colW}" height="${barH}" rx="4" style="${style}"/>`,
          );
        } else {
          text(x0 + 8, by + barH / 2 + 4, 'none yet', body(11.5, p.ink2));
        }
        points[j].push([x0 + level * colW, by + barH / 2]);
      });
    });

    // The ragged line(s) through the bar ends.
    series.forEach((s, j) => {
      const dash = s.outline ? ';stroke-dasharray:6 4' : '';
      out.push(
        `<polyline points="${points[j].map(([x, y]) => `${x},${y}`).join(' ')}" style="fill:none;stroke:${p.ink};stroke-width:2${dash}"/>`,
      );
      for (const [x, y] of points[j]) {
        out.push(
          `<circle cx="${x}" cy="${y}" r="3.5" style="fill:${p.bg};stroke:${p.ink};stroke-width:2"/>`,
        );
      }
    });

    for (const { n, i, nameY } of names) {
      out.push(
        `<rect x="${g.lineX}" y="${nameY - 12}" width="16" height="16" rx="3" style="fill:${p.tint[i]};stroke:${p.tintInk[i]};stroke-width:1"/>`,
      );
      text(g.lineX + 8, nameY, String(n), mono(10, p.tintInk[i], 700), 'middle');
      text(
        g.lineX + 24,
        nameY,
        layerOf(n).name,
        `${body(g.nameSize, p.ink, 600)};paint-order:stroke;stroke:${p.bg};stroke-width:4px;stroke-linejoin:round`,
      );
    }

    // Floor rule (single profile) or legend (comparison).
    if (!two && floor !== undefined) {
      const fx = x0 + floor * colW;
      out.push(
        `<line x1="${fx}" y1="${top - 4}" x2="${fx}" y2="${gridBottom + 8}" style="stroke:${p.ink2};stroke-width:1.5;stroke-dasharray:4 4"/>`,
      );
      const label =
        floor === 0 ? 'Floor: no level yet' : `Floor: Level ${floor}, ${levelName(floor)}`;
      const anchor =
        floor === 0 || (narrow && floor < 2)
          ? 'start'
          : floor === 5 || (narrow && floor > 3)
            ? 'end'
            : 'middle';
      text(fx, gridBottom + 28, label, body(13, p.ink, 600), anchor);
    } else if (two) {
      const ly = gridBottom + 30;
      const second = narrow ? { x: g.lineX, y: ly + 22 } : { x: W / 2, y: ly };
      out.push(
        `<line x1="${g.lineX}" y1="${ly - 4}" x2="${g.lineX + 28}" y2="${ly - 4}" style="stroke:${p.ink};stroke-width:2;stroke-dasharray:6 4"/>`,
      );
      text(g.lineX + 36, ly, `Before: ${series[0].name}`, body(12.5, p.ink));
      out.push(
        `<line x1="${second.x}" y1="${second.y - 4}" x2="${second.x + 28}" y2="${second.y - 4}" style="stroke:${p.ink};stroke-width:2"/>`,
      );
      text(second.x + 36, second.y, `After: ${series[1].name}`, body(12.5, p.ink));
    }

    if (mode === 'export') {
      text(20, H - 38, `${model.notice.split('. ')[0]}.`, body(12, p.ink2));
      text(
        20,
        H - 18,
        `${model.page.replace(/^https:\/\//, '')} · model: chapter 07, ${model.chapter.replace(/^https:\/\//, '')} · ${model.license}`,
        body(11, p.ink2),
      );
    }
    out.push('</svg>');
    return out.join('');
  }

  // ---- Rendering the result -----------------------------------------------------

  function currentProfile() {
    const levels = readAnswers();
    if (!complete(levels)) return null;
    return { label: cleanLabel(labelInput.value), assessedOn: isoDate(), levels };
  }

  function profileName(profile) {
    return profile.label || `Profile of ${profile.assessedOn}`;
  }

  function renderResult(profile) {
    const analysis = analyse(profile.levels);
    const title = profile.label ? `Maturity profile: ${profile.label}` : 'Maturity profile';

    result.querySelector('[data-msc-summary]').textContent =
      `${profile.label ? `${profile.label}. ` : ''}Assessed on ${profile.assessedOn} against the maturity model of chapter 07.`;

    result.querySelector('[data-msc-chart-svg]').innerHTML = chartSvg(
      [{ name: profileName(profile), levels: profile.levels }],
      { mode: 'screen', idPrefix: 'msc-chart', title, floor: analysis.floor },
    );

    const rows = result.querySelector('[data-msc-rows]');
    rows.replaceChildren(
      ...LAYERS.map((n, i) => {
        const level = profile.levels[i];
        const atFloor = analysis.floorLayers.includes(n);
        return h(
          'tr',
          {},
          h('th', { scope: 'row' }, `Layer ${layerTitle(n)}`),
          h(
            'td',
            { class: 'num', 'data-label': 'Level' },
            `${level === 0 ? '0 None yet' : `${level} ${levelName(level)}`}${atFloor ? ' (floor)' : ''}`,
          ),
          h(
            'td',
            { 'data-label': 'Highest criterion met' },
            criterionOf(n, level) ?? 'None of the criteria yet',
          ),
        );
      }),
    );

    result.querySelector('[data-msc-floor]').textContent = floorSentence(analysis);
    renderNext(result.querySelector('[data-msc-next]'), analysis);

    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return analysis;
  }

  function renderNext(container, analysis) {
    const { next } = analysis;
    if (!next) {
      const top = model.failures['5'];
      container.replaceChildren(
        h(
          'p',
          { class: 'msc-move' },
          'Every layer reads Level 5. There is no level above it; the work is keeping it there.',
        ),
        h(
          'p',
          {},
          'Track evidence freshness and the Level 4 to 5 metrics, and watch for the typical failure at this level: ',
          top,
        ),
        h(
          'p',
          {},
          'Pattern: ',
          h(
            'a',
            { href: patternUrl('pattern-continuous-assurance-telemetry') },
            'Continuous Assurance Telemetry',
          ),
        ),
      );
      return;
    }
    const layer = layerOf(next.layer).name;
    const parts = [
      h(
        'p',
        { class: 'msc-move' },
        next.from === 0
          ? `Bring ${layer} to Level 1 (${levelName(1)}): `
          : `Raise ${layer} from ${levelTitle(next.from)} to ${levelTitle(next.to)}: `,
        h('strong', {}, next.criterion),
        '.',
      ),
      h(
        'p',
        {},
        'Pattern that builds it: ',
        h('a', { href: patternUrl(next.pattern) }, next.patternTitle),
        '.',
      ),
    ];
    if (analysis.floorLayers.length > 1) {
      const others = analysis.floorLayers.slice(1).map((n) => layerOf(n).name);
      parts.push(
        h(
          'p',
          {},
          `${joinNames(others)} ${others.length > 1 ? 'share' : 'shares'} the floor. The next move takes the first layer in build order; the floor rises only when every layer at it moves.`,
        ),
      );
    }
    if (next.metrics.length) {
      parts.push(
        h('h4', {}, `Level ${next.from} to ${next.to} metrics`),
        h(
          'p',
          { class: 'tool-hint' },
          'The chapter tracks these per level, across all layers. Track the trend, not the single number.',
        ),
        h(
          'ul',
          {},
          next.metrics.map((m) => h('li', {}, m)),
        ),
      );
    }
    parts.push(
      h('h4', {}, `Checklist for Level ${next.to} (${levelName(next.to)})`),
      h(
        'ul',
        {},
        next.checklist.map((q) => h('li', {}, q)),
      ),
      h('p', { class: 'tool-hint' }, `Typical failure at this level: ${next.failure}`),
    );
    container.replaceChildren(...parts);
  }

  // ---- Validation -----------------------------------------------------------------

  function showErrors(levels) {
    const missing = LAYERS.filter((n) => levels[n - 1] === null);
    for (const n of LAYERS) setFieldsetError(n, missing.includes(n));
    if (!missing.length) {
      errors.hidden = true;
      return false;
    }
    errorsList.replaceChildren(
      ...missing.map((n) => {
        const link = h('a', { href: `#msc-layer-${n}` }, `Layer ${n}: ${layerOf(n).name}`);
        link.addEventListener('click', (event) => {
          event.preventDefault();
          form.querySelector(`input[name="layer-${n}"]`)?.focus();
        });
        return h('li', {}, link);
      }),
    );
    errors.hidden = false;
    focusOn(errors);
    return true;
  }

  function setFieldsetError(n, invalid) {
    const fieldset = form.querySelector(`[data-msc-layer="${n}"]`);
    const error = fieldset.querySelector('.tool-error');
    error.hidden = !invalid;
    const hint = `msc-layer-${n}-hint`;
    fieldset.setAttribute('aria-describedby', invalid ? `${error.id} ${hint}` : hint);
    if (invalid) fieldset.setAttribute('data-invalid', '');
    else fieldset.removeAttribute('data-invalid');
  }

  // ---- Link state -------------------------------------------------------------------

  function stateParams() {
    const params = { v: VERSION, l: encodeLevels(readAnswers()), n: cleanLabel(labelInput.value) };
    if (lastComparison) {
      params.ca = encodeLevels(lastComparison.before.levels);
      params.cb = encodeLevels(lastComparison.after.levels);
      params.can = lastComparison.before.label;
      params.cbn = lastComparison.after.label;
    }
    return params;
  }

  const syncFragment = () => writeFragment(stateParams());

  function applyFragment({ focus }) {
    const state = readFragment();
    const levels = decodeLevels(state.l, true);
    if (levels) {
      setAnswers(levels);
      labelInput.value = cleanLabel(state.n);
      const profile = currentProfile();
      if (profile) {
        const analysis = renderResult(profile);
        if (focus) focusOn(result.querySelector('h2'));
        announce(status, `Profile loaded from the link. ${floorSentence(analysis)}`);
      }
    }
    const before = decodeLevels(state.ca, false);
    const after = decodeLevels(state.cb, false);
    if (before && after) {
      renderComparison(
        { label: cleanLabel(state.can) || 'Before', levels: before },
        { label: cleanLabel(state.cbn) || 'After', levels: after },
        { focus: false },
      );
    }
  }

  // ---- Exports ------------------------------------------------------------------------

  function profileJson(profile) {
    const analysis = analyse(profile.levels);
    return {
      $schema: SCHEMA,
      kind: KIND,
      version: VERSION,
      label: profile.label,
      assessedOn: profile.assessedOn,
      model: model.chapter,
      notice: model.notice,
      layers: LAYERS.map((n, i) => ({
        layer: n,
        id: layerOf(n).id,
        name: layerOf(n).name,
        level: profile.levels[i],
        levelName: profile.levels[i] === 0 ? null : levelName(profile.levels[i]),
        criterion: criterionOf(n, profile.levels[i]),
      })),
      floor: {
        level: analysis.floor,
        levelName: analysis.floor === 0 ? null : levelName(analysis.floor),
        layers: analysis.floorLayers,
      },
      nextMove: analysis.next
        ? {
            layer: analysis.next.layer,
            from: analysis.next.from,
            to: analysis.next.to,
            criterion: analysis.next.criterion,
            pattern: patternUrl(analysis.next.pattern),
          }
        : null,
      link: profileLink(profile),
    };
  }

  function profileLink(profile) {
    return shareUrl({ v: VERSION, l: encodeLevels(profile.levels), n: profile.label });
  }

  function profileMarkdown(profile) {
    const analysis = analyse(profile.levels);
    const lines = [
      `# ${profile.label ? `Maturity self-check: ${profile.label}` : 'Maturity self-check'}`,
      '',
      `Assessed on ${profile.assessedOn} against the maturity model in chapter 07 of the AI Governance Engineering Body of Knowledge (${model.chapter}).`,
      '',
      `> ${model.notice.split('. ')[0]}.`,
      '',
      '## Profile',
      '',
      '| Layer | Level | Highest criterion met |',
      '|---|---|---|',
      ...LAYERS.map((n, i) => {
        const level = profile.levels[i];
        return `| ${mdCell(layerTitle(n))} | ${level === 0 ? '0 None yet' : `${level} ${levelName(level)}`} | ${mdCell(criterionOf(n, level) ?? 'None of the criteria yet')} |`;
      }),
      '',
      '## Floor',
      '',
      floorSentence(analysis),
      '',
      'The single overall level is the weakest layer: a floor for planning, not a verdict on the whole function.',
      '',
      '## Next move',
      '',
    ];
    const { next } = analysis;
    if (next) {
      const layer = layerOf(next.layer).name;
      lines.push(
        next.from === 0
          ? `Bring **${layer}** to Level 1 (${levelName(1)}): ${next.criterion}.`
          : `Raise **${layer}** from ${levelTitle(next.from)} to ${levelTitle(next.to)}: ${next.criterion}.`,
        '',
        `- Pattern: ${next.patternTitle}, ${patternUrl(next.pattern)}`,
      );
      if (next.metrics.length) {
        lines.push(
          `- Level ${next.from} to ${next.to} metrics (per level, across layers): ${next.metrics.join('; ')}.`,
        );
      }
      lines.push(
        `- Checklist for Level ${next.to} (${levelName(next.to)}): ${next.checklist.join(' ')}`,
        `- Typical failure at this level: ${next.failure}`,
      );
    } else {
      lines.push(
        'Every layer reads Level 5. There is no level above it; the work is keeping it there: track evidence freshness and the Level 4 to 5 metrics.',
      );
    }
    lines.push(
      '',
      '---',
      '',
      `Profile link: ${profileLink(profile)}`,
      '',
      `Made with the maturity self-check at ${model.page}. The model is not a certification and this report is not an audit. ${model.license} (${model.licenseUrl}), attribution: Jorge García Aibar.`,
    );
    return `${lines.join('\n')}\n`;
  }

  const fileBase = (profile) => `maturity-profile-${slug(profile.label) || profile.assessedOn}`;

  async function runAction(action) {
    const profile = currentProfile();
    if (!profile) {
      showErrors(readAnswers());
      return;
    }
    const name = profileName(profile);
    const exportTitle = profile.label ? `Maturity profile: ${profile.label}` : 'Maturity profile';
    const exportSvg = () =>
      chartSvg([{ name, levels: profile.levels }], {
        mode: 'export',
        idPrefix: 'msc-export',
        title: exportTitle,
        floor: analyse(profile.levels).floor,
      });
    try {
      switch (action) {
        case 'copy': {
          syncFragment();
          const ok = await copyText(profileLink(profile));
          announce(
            status,
            ok
              ? 'Link copied. Your answers travel in the part after #, which the browser does not send when it loads the page.'
              : 'Copy failed: copy the address bar instead.',
          );
          break;
        }
        case 'json':
          downloadJson(`${fileBase(profile)}.json`, profileJson(profile));
          announce(status, 'JSON profile downloaded. Import it below to compare or reload it.');
          break;
        case 'md':
          downloadMarkdown(`${fileBase(profile)}.md`, profileMarkdown(profile));
          announce(status, 'Markdown report downloaded.');
          break;
        case 'svg':
          downloadSvg(`${fileBase(profile)}.svg`, exportSvg());
          announce(status, 'SVG image downloaded.');
          break;
        case 'png':
          await downloadPng(`${fileBase(profile)}.png`, exportSvg(), {
            scale: 2,
            background: EXPORT_PALETTE.bg,
          });
          announce(status, 'PNG image downloaded.');
          break;
        case 'save': {
          const saved = saveProfile(profile);
          announce(
            status,
            saved.persisted
              ? `Saved as "${saved.entry.label}" in this browser only. Compare it below.`
              : `This browser blocks storage, so "${saved.entry.label}" is kept only until you leave the page.`,
          );
          break;
        }
        case 'print':
          window.print();
          break;
        default:
          break;
      }
    } catch (error) {
      announce(
        status,
        `That did not work: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
    }
  }

  // ---- Saved profiles, import and comparison -------------------------------------------

  function readSaved() {
    if (savedMemory) return savedMemory;
    const list = store.get(STORE_KEY, []);
    return Array.isArray(list) ? list.filter(validSaved) : [];
  }

  function validSaved(entry) {
    return (
      entry &&
      typeof entry.id === 'string' &&
      typeof entry.label === 'string' &&
      Array.isArray(entry.levels) &&
      entry.levels.length === 5 &&
      entry.levels.every((level) => Number.isInteger(level) && level >= 0 && level <= 5)
    );
  }

  function writeSaved(list) {
    const trimmed = list.slice(0, MAX_SAVED);
    if (store.set(STORE_KEY, trimmed)) {
      savedMemory = null;
      return true;
    }
    savedMemory = trimmed;
    return false;
  }

  function saveProfile(profile, origin = 'saved') {
    const entry = {
      id: `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      label: profileName(profile),
      assessedOn: profile.assessedOn,
      levels: [...profile.levels],
      origin,
    };
    const persisted = writeSaved([entry, ...readSaved()]);
    renderSaved();
    return { entry, persisted };
  }

  function renderSaved() {
    const list = readSaved();
    const container = compare.querySelector('[data-msc-saved]');
    compare.querySelector('[data-msc-saved-empty]').hidden = list.length > 0;
    container.replaceChildren(
      ...list.map((entry) =>
        h(
          'li',
          {},
          h('span', { class: 'msc-saved-name' }, entry.label),
          h(
            'span',
            { class: 'msc-saved-meta' },
            `${entry.assessedOn ?? ''}${entry.origin === 'imported' ? ', imported' : ''} · levels ${entry.levels.join(' ')}`,
          ),
          h(
            'button',
            { type: 'button', class: 'btn btn-secondary', onclick: () => loadSaved(entry) },
            'Load',
            h('span', { class: 'visually-hidden' }, ` ${entry.label}`),
          ),
          h(
            'button',
            { type: 'button', class: 'btn btn-secondary', onclick: () => deleteSaved(entry) },
            'Delete',
            h('span', { class: 'visually-hidden' }, ` ${entry.label}`),
          ),
        ),
      ),
    );
    renderPairOptions();
  }

  function loadSaved(entry) {
    setAnswers(entry.levels);
    labelInput.value = entry.label;
    for (const n of LAYERS) setFieldsetError(n, false);
    errors.hidden = true;
    const profile = currentProfile();
    if (!profile) return;
    profile.assessedOn = entry.assessedOn ?? profile.assessedOn;
    const analysis = renderResult(profile);
    syncFragment();
    focusOn(result.querySelector('h2'));
    announce(status, `Loaded "${entry.label}". ${floorSentence(analysis)}`);
  }

  function deleteSaved(entry) {
    writeSaved(readSaved().filter((item) => item.id !== entry.id));
    renderSaved();
    announce(compare.querySelector('[data-msc-compare-status]'), `Deleted "${entry.label}".`);
    focusOn(compare.querySelector('#msc-compare-title'));
  }

  function renderPairOptions() {
    const before = compare.querySelector('[data-msc-before]');
    const after = compare.querySelector('[data-msc-after]');
    const keepBefore = before.value;
    const keepAfter = after.value;
    const options = [];
    if (complete(readAnswers())) options.push({ value: 'current', label: 'Current answers' });
    for (const entry of readSaved()) {
      options.push({ value: entry.id, label: `${entry.label} (${entry.levels.join(' ')})` });
    }
    for (const select of [before, after]) {
      select.replaceChildren(...options.map((o) => h('option', { value: o.value }, o.label)));
    }
    const values = options.map((o) => o.value);
    before.value = values.includes(keepBefore) ? keepBefore : (values[1] ?? values[0] ?? '');
    after.value = values.includes(keepAfter) ? keepAfter : (values[0] ?? '');
    compare.querySelector('[data-msc-compare]').disabled = options.length < 2;
  }

  function pickProfile(value) {
    if (value === 'current') {
      const profile = currentProfile();
      return profile ? { label: profileName(profile), levels: profile.levels } : null;
    }
    const entry = readSaved().find((item) => item.id === value);
    return entry ? { label: entry.label, levels: [...entry.levels] } : null;
  }

  function compareDelta(before, after) {
    return LAYERS.map((n) => after.levels[n - 1] - before.levels[n - 1]);
  }

  function floorChange(before, after) {
    const a = analyse(before.levels).floor;
    const b = analyse(after.levels).floor;
    if (a === b) return `Floor unchanged at ${levelTitle(a)}.`;
    return `Floor ${b > a ? 'rose' : 'fell'} from ${levelTitle(a)} to ${levelTitle(b)}.`;
  }

  const deltaText = (d) => (d === 0 ? 'No change' : d > 0 ? `Up ${d}` : `Down ${-d}`);

  function renderComparison(before, after, { focus }) {
    const box = compare.querySelector('[data-msc-comparison]');
    box.querySelector('[data-msc-cmp-chart]').innerHTML = chartSvg(
      [
        { name: before.label, levels: before.levels, outline: true },
        { name: after.label, levels: after.levels },
      ],
      {
        mode: 'screen',
        idPrefix: 'msc-cmp',
        title: `Before and after: ${before.label} and ${after.label}`,
      },
    );
    box.querySelector('[data-msc-cmp-before-head]').textContent = `Before: ${before.label}`;
    box.querySelector('[data-msc-cmp-after-head]').textContent = `After: ${after.label}`;
    const deltas = compareDelta(before, after);
    box
      .querySelector('[data-msc-cmp-rows]')
      .replaceChildren(
        ...LAYERS.map((n, i) =>
          h(
            'tr',
            {},
            h('th', { scope: 'row' }, `Layer ${layerTitle(n)}`),
            h('td', { class: 'num', 'data-label': 'Before' }, String(before.levels[i])),
            h('td', { class: 'num', 'data-label': 'After' }, String(after.levels[i])),
            h('td', { class: 'num', 'data-label': 'Change' }, deltaText(deltas[i])),
          ),
        ),
      );
    box.querySelector('[data-msc-cmp-floor]').textContent = floorChange(before, after);
    box.hidden = false;
    lastComparison = { before, after };
    if (focus) focusOn(box.querySelector('h3'));
  }

  function comparisonMarkdown({ before, after }) {
    const deltas = compareDelta(before, after);
    return [
      `# Maturity profiles compared: ${before.label} and ${after.label}`,
      '',
      `Read against the maturity model in chapter 07 (${model.chapter}).`,
      '',
      `> ${model.notice.split('. ')[0]}.`,
      '',
      `| Layer | Before (${mdCell(before.label)}) | After (${mdCell(after.label)}) | Change |`,
      '|---|---|---|---|',
      ...LAYERS.map(
        (n, i) =>
          `| ${mdCell(layerTitle(n))} | ${before.levels[i]} | ${after.levels[i]} | ${deltaText(deltas[i])} |`,
      ),
      '',
      floorChange(before, after),
      '',
      `Comparison link: ${shareUrl(stateParams())}`,
      '',
      `${model.license} (${model.licenseUrl}), attribution: Jorge García Aibar.`,
      '',
    ].join('\n');
  }

  // Validate an imported file; everything derived is recomputed, never read.
  function profileFromJson(json) {
    if (!json || typeof json !== 'object') throw new Error('That file does not hold a profile.');
    if (json.kind !== KIND)
      throw new Error(`That file is not a maturity profile (its "kind" should be "${KIND}").`);
    if (json.version !== VERSION)
      throw new Error(
        `That profile is version ${json.version}; this tool reads version ${VERSION}.`,
      );
    if (!Array.isArray(json.layers) || json.layers.length !== 5)
      throw new Error('A profile lists exactly five layers.');
    const levels = [null, null, null, null, null];
    for (const entry of json.layers) {
      const layer = entry?.layer;
      const level = entry?.level;
      if (!LAYERS.includes(layer)) throw new Error('Each layer entry needs a "layer" from 1 to 5.');
      if (!Number.isInteger(level) || level < 0 || level > 5) {
        throw new Error(
          `Layer ${layer} has level ${JSON.stringify(level)}; levels run from 0 to 5.`,
        );
      }
      if (levels[layer - 1] !== null) throw new Error(`Layer ${layer} appears twice.`);
      levels[layer - 1] = level;
    }
    const assessedOn = /^\d{4}-\d{2}-\d{2}$/.test(String(json.assessedOn ?? ''))
      ? json.assessedOn
      : isoDate();
    return { label: cleanLabel(json.label), assessedOn, levels };
  }

  async function importFile(input) {
    const error = compare.querySelector('[data-msc-import-error]');
    const file = input.files?.[0];
    if (!file) return;
    try {
      const profile = profileFromJson(await readJsonFile(file));
      const saved = saveProfile(profile, 'imported');
      error.hidden = true;
      input.removeAttribute('aria-invalid');
      input.setAttribute('aria-describedby', 'msc-import-hint');
      announce(
        compare.querySelector('[data-msc-compare-status]'),
        `Imported "${saved.entry.label}". It is in the saved list and in both menus.`,
      );
    } catch (problem) {
      error.textContent =
        problem instanceof Error ? problem.message : 'That file could not be imported.';
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'msc-import-error msc-import-hint');
      input.focus();
    } finally {
      input.value = '';
    }
  }

  // ---- Wiring --------------------------------------------------------------------------

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const levels = readAnswers();
    if (showErrors(levels)) return;
    const analysis = renderResult(currentProfile());
    syncFragment();
    renderPairOptions();
    focusOn(result.querySelector('h2'));
    announce(status, `Profile ready. Floor: ${floorSentence(analysis)}`);
  });

  form.addEventListener('change', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === 'radio') {
      const n = Number(target.name.replace('layer-', ''));
      setFieldsetError(n, false);
      if (!errors.hidden && complete(readAnswers())) errors.hidden = true;
    }
    if (shown && complete(readAnswers())) {
      renderResult(currentProfile());
      syncFragment();
    }
    renderPairOptions();
  });

  labelInput.addEventListener('input', () => {
    if (shown && complete(readAnswers())) {
      renderResult(currentProfile());
      syncFragment();
    }
  });

  form.querySelector('[data-msc-reset]').addEventListener('click', () => {
    setAnswers([null, null, null, null, null]);
    labelInput.value = '';
    for (const n of LAYERS) setFieldsetError(n, false);
    errors.hidden = true;
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    lastComparison = null;
    compare.querySelector('[data-msc-comparison]').hidden = true;
    writeFragment({});
    renderPairOptions();
    form.querySelector('input[name="layer-1"]')?.focus();
  });

  result.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button) runAction(button.getAttribute('data-action'));
  });

  compare
    .querySelector('[data-msc-import]')
    .addEventListener('change', (event) => importFile(event.target));

  compare.querySelector('[data-msc-compare]').addEventListener('click', () => {
    const error = compare.querySelector('[data-msc-pair-error]');
    const before = pickProfile(compare.querySelector('[data-msc-before]').value);
    const after = pickProfile(compare.querySelector('[data-msc-after]').value);
    const same =
      compare.querySelector('[data-msc-before]').value ===
      compare.querySelector('[data-msc-after]').value;
    if (!before || !after || same) {
      error.textContent = same
        ? 'Choose two different profiles.'
        : 'Choose a profile in both menus.';
      error.hidden = false;
      compare.querySelector('[data-msc-before]').focus();
      return;
    }
    error.hidden = true;
    renderComparison(before, after, { focus: true });
    syncFragment();
    announce(compare.querySelector('[data-msc-cmp-status]'), floorChange(before, after));
  });

  compare.querySelector('[data-msc-comparison]').addEventListener('click', async (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (!button || !lastComparison) return;
    const cmpStatus = compare.querySelector('[data-msc-cmp-status]');
    const action = button.getAttribute('data-action');
    const base = `maturity-comparison-${slug(lastComparison.before.label) || 'before'}-${slug(lastComparison.after.label) || 'after'}`;
    if (action === 'cmp-copy') {
      syncFragment();
      const ok = await copyText(shareUrl(stateParams()));
      announce(
        cmpStatus,
        ok ? 'Comparison link copied.' : 'Copy failed: copy the address bar instead.',
      );
    } else if (action === 'cmp-md') {
      downloadMarkdown(`${base}.md`, comparisonMarkdown(lastComparison));
      announce(cmpStatus, 'Comparison downloaded as Markdown.');
    } else if (action === 'cmp-svg') {
      const { before, after } = lastComparison;
      downloadSvg(
        `${base}.svg`,
        chartSvg(
          [
            { name: before.label, levels: before.levels, outline: true },
            { name: after.label, levels: after.levels },
          ],
          {
            mode: 'export',
            idPrefix: 'msc-cmp-export',
            title: `Before and after: ${before.label} and ${after.label}`,
          },
        ),
      );
      announce(cmpStatus, 'Comparison image downloaded.');
    }
  });

  window.addEventListener('hashchange', () => applyFragment({ focus: true }));

  // Crossing the phone breakpoint redraws the charts in the other layout.
  narrowQuery?.addEventListener?.('change', () => {
    if (shown && complete(readAnswers())) renderResult(currentProfile());
    if (lastComparison)
      renderComparison(lastComparison.before, lastComparison.after, { focus: false });
  });

  renderSaved();
  applyFragment({ focus: false });
  renderPairOptions();
}
