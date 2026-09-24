/* Crosswalk explorer (/resources/crosswalk#explore), loaded from a same-origin
   file so the CSP script-src 'self' holds (no inline JS). It reads the published
   dataset (/resources/crosswalk.json, schema 2) and derives clause-to-clause
   mappings from it: two clauses are mapped when the crosswalk files them under
   the same topic, so every derived relationship is OSCAL "intersects-with",
   never "equal-to". The reader picks source frameworks, a target, a topic and
   a verified-only filter; the page shows the clauses side by side per topic, or
   the gap view (target clauses no chosen source reaches), and downloads the
   selection as CSV, JSON or an OSCAL 1.2.3 mapping collection. Each file says
   "illustrative, not a claim of conformity" inside it. The selection lives in
   the URL fragment (#explore?src=...&tgt=...) so a view can be shared. Files
   are built as Blobs and saved through a download link; nothing is rendered
   from a blob: URL (img-src has no blob:).

   The pure part (compute, CSV, JSON, OSCAL, fragment parsing) hangs off
   window.aigeCrosswalkCore and needs no DOM, so it can be exercised on its own. */
(function (global) {
  'use strict';

  var OSCAL_VERSION = '1.2.3';
  var NS = 'https://aigovernanceengineer.com/ns/oscal';
  var EXPORT_SCHEMA = 1;
  var DEFAULT_STATE = {
    src: ['eu-ai-act'],
    tgt: 'iso-42001',
    topic: 'all',
    verified: false,
    view: 'pairs',
  };

  // ---- Pure core ------------------------------------------------------------

  function indexBy(list, key) {
    var out = {};
    for (var i = 0; i < list.length; i++) out[list[i][key]] = list[i];
    return out;
  }

  function uuid() {
    var c = global.crypto;
    if (c && typeof c.randomUUID === 'function') return c.randomUUID();
    var b = new Uint8Array(16);
    if (c && typeof c.getRandomValues === 'function') c.getRandomValues(b);
    else for (var i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    var h = '';
    for (var j = 0; j < 16; j++) h += (b[j] + 0x100).toString(16).slice(1);
    return (
      h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20)
    );
  }

  /** Normalise a state against the dataset: known ids only, target not a source. */
  function normalise(data, state) {
    var fws = indexBy(data.frameworks, 'id');
    var topics = indexBy(data.topics, 'id');
    var s = {
      src: [],
      tgt: fws[state.tgt] ? state.tgt : DEFAULT_STATE.tgt,
      topic: state.topic === 'all' || topics[state.topic] ? state.topic : 'all',
      verified: state.verified === true,
      view: state.view === 'gaps' ? 'gaps' : 'pairs',
    };
    var seen = {};
    var src = state.src || [];
    for (var i = 0; i < src.length; i++) {
      var id = src[i];
      if (fws[id] && id !== s.tgt && !seen[id]) {
        seen[id] = true;
        s.src.push(id);
      }
    }
    return s;
  }

  /**
   * The selection: per topic, the chosen sources' clauses and the target's
   * clauses; the derived pairs (one per source clause × target clause, their
   * shared topics merged); and the gaps (target clauses that no chosen source
   * reaches in any topic they are filed under).
   */
  function compute(data, rawState) {
    var state = normalise(data, rawState);
    var fws = indexBy(data.frameworks, 'id');
    var srcSet = {};
    for (var i = 0; i < state.src.length; i++) srcSet[state.src[i]] = true;

    var byTopic = {};
    var refs = data.references;
    for (var r = 0; r < refs.length; r++) {
      var ref = refs[r];
      if (state.topic !== 'all' && ref.topic !== state.topic) continue;
      if (state.verified && !ref.verified) continue;
      var side = srcSet[ref.framework] ? 'src' : ref.framework === state.tgt ? 'tgt' : null;
      if (!side) continue;
      var bucket = byTopic[ref.topic] || (byTopic[ref.topic] = { src: [], tgt: [] });
      bucket[side].push(ref);
    }

    // Within a topic: sources in the order the reader listed them, core before
    // related (Array.prototype.sort is stable, so the dataset order breaks ties).
    var srcRank = {};
    for (var q = 0; q < state.src.length; q++) srcRank[state.src[q]] = q;
    var strengthRank = function (x) {
      return x.strength === 'core' ? 0 : 1;
    };
    var bySource = function (x, y) {
      return srcRank[x.framework] - srcRank[y.framework] || strengthRank(x) - strengthRank(y);
    };
    var byStrength = function (x, y) {
      return strengthRank(x) - strengthRank(y);
    };

    var rows = [];
    for (var t = 0; t < data.topics.length; t++) {
      var topic = data.topics[t];
      var b = byTopic[topic.id];
      if (b && (b.src.length || b.tgt.length)) {
        rows.push({ topic: topic, src: b.src.sort(bySource), tgt: b.tgt.sort(byStrength) });
      }
    }

    var pairIndex = {};
    var pairs = [];
    var tgtClauses = {};
    var tgtOrder = [];
    var srcClauses = {};
    var srcOrder = [];
    for (var k = 0; k < rows.length; k++) {
      var row = rows[k];
      for (var a = 0; a < row.tgt.length; a++) {
        var tr = row.tgt[a];
        var tc = tgtClauses[tr.clauseId];
        if (!tc) {
          tc = tgtClauses[tr.clauseId] = { ref: tr, topics: [], mappedBy: {} };
          tgtOrder.push(tr.clauseId);
        }
        if (tc.topics.indexOf(row.topic.id) < 0) tc.topics.push(row.topic.id);
      }
      for (var c = 0; c < row.src.length; c++) {
        var sr = row.src[c];
        var sk = sr.framework + '|' + sr.clauseId;
        var sc = srcClauses[sk];
        if (!sc) {
          sc = srcClauses[sk] = { ref: sr, topics: [], mapped: false };
          srcOrder.push(sk);
        }
        if (sc.topics.indexOf(row.topic.id) < 0) sc.topics.push(row.topic.id);
        for (var d = 0; d < row.tgt.length; d++) {
          var tg = row.tgt[d];
          sc.mapped = true;
          tgtClauses[tg.clauseId].mappedBy[sr.framework] = true;
          var key = sk + '>' + tg.clauseId;
          var p = pairIndex[key];
          if (!p) {
            p = pairIndex[key] = { source: sr, target: tg, topics: [], bothCore: false };
            pairs.push(p);
          }
          if (p.topics.indexOf(row.topic.id) < 0) p.topics.push(row.topic.id);
          if (sr.strength === 'core' && tg.strength === 'core') p.bothCore = true;
        }
      }
    }

    var gaps = [];
    var targets = [];
    for (var g = 0; g < tgtOrder.length; g++) {
      var entry = tgtClauses[tgtOrder[g]];
      targets.push(entry);
      if (Object.keys(entry.mappedBy).length === 0) gaps.push(entry);
    }
    var sources = [];
    for (var h = 0; h < srcOrder.length; h++) sources.push(srcClauses[srcOrder[h]]);

    return {
      state: state,
      fws: fws,
      rows: rows,
      pairs: pairs,
      targets: targets,
      gaps: gaps,
      sources: sources,
      topicsById: indexBy(data.topics, 'id'),
    };
  }

  function confidence(pair) {
    return pair.bothCore ? 'medium' : 'low';
  }

  // Fragment: #explore?src=a,b&tgt=c&topic=d&verified=1&view=gaps
  function formatHash(state) {
    var parts = [
      'src=' + state.src.map(encodeURIComponent).join(','),
      'tgt=' + encodeURIComponent(state.tgt),
    ];
    if (state.topic && state.topic !== 'all') parts.push('topic=' + encodeURIComponent(state.topic));
    if (state.verified) parts.push('verified=1');
    if (state.view === 'gaps') parts.push('view=gaps');
    return '#explore?' + parts.join('&');
  }

  function parseHash(hash) {
    if (!hash || hash.indexOf('#explore') !== 0) return null;
    var q = hash.slice('#explore'.length).replace(/^[?:/]/, '');
    var state = {
      src: DEFAULT_STATE.src.slice(),
      tgt: DEFAULT_STATE.tgt,
      topic: 'all',
      verified: false,
      view: 'pairs',
    };
    if (!q) return state;
    var items = q.split('&');
    for (var i = 0; i < items.length; i++) {
      var kv = items[i].split('=');
      var key = kv[0];
      var value = kv.slice(1).join('=');
      if (key === 'src') {
        state.src = value
          .split(',')
          .map(function (v) {
            return decodeURIComponent(v);
          })
          .filter(Boolean);
      } else if (key === 'tgt') state.tgt = decodeURIComponent(value);
      else if (key === 'topic') state.topic = decodeURIComponent(value) || 'all';
      else if (key === 'verified') state.verified = value === '1';
      else if (key === 'view') state.view = value === 'gaps' ? 'gaps' : 'pairs';
    }
    return state;
  }

  function fwName(sel, id) {
    var f = sel.fws[id];
    return f ? f.name : id;
  }

  function topicNames(sel, ids) {
    return ids
      .map(function (id) {
        return sel.topicsById[id] ? sel.topicsById[id].name : id;
      })
      .join('; ');
  }

  function selectionTitle(sel) {
    var from = sel.state.src.map(function (id) {
      return sel.fws[id] ? sel.fws[id].short : id;
    });
    var to = sel.fws[sel.state.tgt] ? sel.fws[sel.state.tgt].short : sel.state.tgt;
    return (from.length ? from.join(', ') : 'no source') + ' to ' + to;
  }

  function noticeFor(data) {
    return (
      data.notice +
      '. Clause pairs are derived from shared crosswalk topics (OSCAL relationship "intersects-with"), illustrative, not a claim of conformity.'
    );
  }

  function csvField(v) {
    var s = v === null || v === undefined ? '' : String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function csvLine(fields) {
    return fields.map(csvField).join(',');
  }

  function toCsv(data, sel, shareUrl) {
    var lines = [];
    lines.push(csvLine([noticeFor(data) + ' Selection: ' + selectionTitle(sel) + '. ' + shareUrl]));
    lines.push(
      csvLine([
        'Relationship',
        'Confidence',
        'Source framework',
        'Source clause',
        'Source title',
        'Source strength',
        'Source verified',
        'Target framework',
        'Target clause',
        'Target title',
        'Target strength',
        'Target verified',
        'Shared topics',
        'Source URL',
        'Target URL',
      ]),
    );
    sel.pairs.forEach(function (p) {
      lines.push(
        csvLine([
          'intersects-with',
          confidence(p),
          fwName(sel, p.source.framework),
          p.source.label,
          p.source.title,
          p.source.strength,
          p.source.verified ? 'yes' : 'no',
          fwName(sel, p.target.framework),
          p.target.label,
          p.target.title,
          p.target.strength,
          p.target.verified ? 'yes' : 'no',
          topicNames(sel, p.topics),
          p.source.url,
          p.target.url,
        ]),
      );
    });
    sel.gaps.forEach(function (gap) {
      var t = gap.ref;
      lines.push(
        csvLine([
          'gap (no mapping from the chosen sources)',
          '',
          '',
          '',
          '',
          '',
          '',
          fwName(sel, t.framework),
          t.label,
          t.title,
          t.strength,
          t.verified ? 'yes' : 'no',
          topicNames(sel, gap.topics),
          '',
          t.url,
        ]),
      );
    });
    return lines.join('\r\n') + '\r\n';
  }

  function clauseOut(ref) {
    return {
      framework: ref.framework,
      clauseId: ref.clauseId,
      reference: ref.reference,
      label: ref.label,
      title: ref.title,
      strength: ref.strength,
      verified: ref.verified,
      url: ref.url,
    };
  }

  function toJson(data, sel, shareUrl, now) {
    return {
      notice: noticeFor(data),
      exportSchemaVersion: EXPORT_SCHEMA,
      datasetSchemaVersion: data.schemaVersion,
      bokVersion: data.version,
      asOf: data.asOf,
      generated: now,
      license: data.license,
      source: shareUrl,
      dataset: data.source + '.json',
      selection: {
        sources: sel.state.src,
        target: sel.state.tgt,
        topic: sel.state.topic,
        verifiedOnly: sel.state.verified,
      },
      method:
        'A source clause and a target clause are paired when the crosswalk files both under the same topic; the relationship is therefore "intersects-with". Confidence is "medium" when both are core to a shared topic, "low" otherwise. Gaps are target clauses in the selection that no chosen source reaches.',
      pairs: sel.pairs.map(function (p) {
        return {
          relationship: 'intersects-with',
          confidence: confidence(p),
          sharedTopics: p.topics,
          source: clauseOut(p.source),
          target: clauseOut(p.target),
        };
      }),
      gaps: sel.gaps.map(function (gap) {
        var out = clauseOut(gap.ref);
        out.topics = gap.topics;
        return out;
      }),
    };
  }

  function resourceRef(sel, fwId) {
    var f = sel.fws[fwId];
    var csa = fwId === 'csa-aicm';
    return {
      type: 'catalog',
      href: (f && f.url) || 'https://aigovernanceengineer.com/resources/frameworks#fw-' + fwId,
      props: [{ name: 'framework-id', ns: NS, value: fwId }],
      remarks:
        (f ? f.name : fwId) +
        (csa
          ? '. id-refs use the control ids of the OSCAL catalog CSA publishes for the AICM.'
          : '. href points to the canonical text; the issuer publishes no OSCAL catalog that this collection resolves, so id-refs are the crosswalk clause ids.'),
    };
  }

  function mappingItem(ref) {
    return {
      type: 'control',
      'id-ref': ref.clauseId,
      props: [{ name: 'label', ns: NS, value: ref.reference }],
      remarks: ref.title + (ref.verified ? '' : ' (not yet verified against the source)'),
    };
  }

  /** An OSCAL 1.2.3 mapping collection: one mapping per source framework. */
  function toOscal(data, sel, shareUrl, now) {
    var notice = noticeFor(data);
    var mappings = [];
    sel.state.src.forEach(function (fwId) {
      var ownPairs = sel.pairs.filter(function (p) {
        return p.source.framework === fwId;
      });
      if (!ownPairs.length) return;
      var mapping = {
        uuid: uuid(),
        'source-resource': resourceRef(sel, fwId),
        'target-resource': resourceRef(sel, sel.state.tgt),
        maps: ownPairs.map(function (p) {
          return {
            uuid: uuid(),
            relationship: 'intersects-with',
            sources: [mappingItem(p.source)],
            targets: [mappingItem(p.target)],
            'confidence-score': { category: confidence(p) },
            props: p.topics.map(function (t) {
              return { name: 'topic', ns: NS, value: t };
            }),
            remarks: 'Shared crosswalk topic(s): ' + topicNames(sel, p.topics) + '.',
          };
        }),
      };
      var unmappedTargets = sel.targets
        .filter(function (entry) {
          return !entry.mappedBy[fwId];
        })
        .map(function (entry) {
          return entry.ref.clauseId;
        });
      if (unmappedTargets.length) {
        mapping['target-gap-summary'] = {
          uuid: uuid(),
          'unmapped-controls': [{ 'with-ids': unmappedTargets }],
        };
      }
      var unmappedSources = sel.sources
        .filter(function (entry) {
          return entry.ref.framework === fwId && !entry.mapped;
        })
        .map(function (entry) {
          return entry.ref.clauseId;
        });
      if (unmappedSources.length) {
        mapping['source-gap-summary'] = {
          uuid: uuid(),
          'unmapped-controls': [{ 'with-ids': unmappedSources }],
        };
      }
      mappings.push(mapping);
    });
    if (!mappings.length) return null;

    return {
      'mapping-collection': {
        uuid: uuid(),
        metadata: {
          title:
            'AI Governance Engineer crosswalk, ' +
            selectionTitle(sel) +
            ' (illustrative, not a claim of conformity)',
          'last-modified': now,
          version: data.version + '+crosswalk-' + data.schemaVersion,
          'oscal-version': OSCAL_VERSION,
          props: [{ name: 'notice', ns: NS, value: notice }],
          links: [
            { href: shareUrl, rel: 'reference', text: 'This selection in the crosswalk explorer' },
            { href: data.source + '.json', rel: 'reference', text: 'Crosswalk dataset (JSON)' },
          ],
          remarks: notice + ' Licence: ' + data.license + '.',
        },
        provenance: {
          method: 'hybrid',
          'matching-rationale': 'semantic',
          status: 'draft',
          'confidence-score': { category: 'low' },
          'mapping-description':
            notice +
            ' Topics and clause assignments are curated by hand; pairs are generated from shared topics. A pair means the two clauses deal with the same governance topic, not that meeting one meets the other.',
        },
        mappings: mappings,
      },
    };
  }

  var core = {
    OSCAL_VERSION: OSCAL_VERSION,
    DEFAULT_STATE: DEFAULT_STATE,
    normalise: normalise,
    compute: compute,
    formatHash: formatHash,
    parseHash: parseHash,
    toCsv: toCsv,
    toJson: toJson,
    toOscal: toOscal,
  };
  global.aigeCrosswalkCore = core;

  // ---- Page wiring ----------------------------------------------------------

  var doc = global.document;
  if (!doc) return;
  var root = doc.getElementById('explore');
  if (!root) return;

  var form = root.querySelector('[data-cwx-form]');
  var out = root.querySelector('[data-cwx-out]');
  var statusEl = root.querySelector('[data-cwx-status]');
  var srcCount = root.querySelector('[data-cwx-src-count]');
  var actions = root.querySelectorAll('[data-cwx-action]');
  if (!form || !out) return;

  var dataUrl = root.getAttribute('data-cwx-src') || '/resources/crosswalk.json';
  var data = null;
  var loading = null;
  var state = parseHash(global.location.hash) || null;
  var current = null;
  // The fragment is rewritten only once the reader has chosen something (or
  // arrived on an #explore link), never because the section scrolled into view.
  var ownsHash = state !== null;

  root.removeAttribute('data-cwx-nojs');
  var shells = root.querySelectorAll('[data-cwx-js]');
  for (var s = 0; s < shells.length; s++) shells[s].hidden = false;

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function el(tag, cls, text) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function readForm() {
    var src = [];
    var boxes = form.querySelectorAll('input[name="cwx-src"]');
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked && !boxes[i].disabled) src.push(boxes[i].value);
    var tgt = form.querySelector('select[name="cwx-tgt"]');
    var topic = form.querySelector('select[name="cwx-topic"]');
    var verified = form.querySelector('input[name="cwx-verified"]');
    var view = form.querySelector('input[name="cwx-view"]:checked');
    return {
      src: src,
      tgt: tgt ? tgt.value : DEFAULT_STATE.tgt,
      topic: topic ? topic.value : 'all',
      verified: !!(verified && verified.checked),
      view: view ? view.value : 'pairs',
    };
  }

  function writeForm(st) {
    var boxes = form.querySelectorAll('input[name="cwx-src"]');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].disabled = boxes[i].value === st.tgt;
      boxes[i].checked = !boxes[i].disabled && st.src.indexOf(boxes[i].value) >= 0;
    }
    var tgt = form.querySelector('select[name="cwx-tgt"]');
    if (tgt) tgt.value = st.tgt;
    var topic = form.querySelector('select[name="cwx-topic"]');
    if (topic) topic.value = st.topic;
    var verified = form.querySelector('input[name="cwx-verified"]');
    if (verified) verified.checked = st.verified;
    var views = form.querySelectorAll('input[name="cwx-view"]');
    for (var v = 0; v < views.length; v++) views[v].checked = views[v].value === st.view;
    if (srcCount) srcCount.textContent = st.src.length + ' selected';
  }

  function shareUrl(st) {
    var base = global.location.href.split('#')[0];
    return base + formatHash(st);
  }

  function chip(ref) {
    var c = el('span', 'cw-chip', ref.label + (ref.verified ? '' : ' ?'));
    if (ref.strength === 'related') c.className += ' is-related';
    if (!ref.verified) {
      c.className += ' is-unverified';
      c.title = 'Not yet verified against the source';
    }
    return c;
  }

  function clauseItem(ref, fwLabel) {
    var li = el('li', 'cwx-clause');
    li.appendChild(chip(ref));
    if (fwLabel) li.appendChild(el('span', 'cwx-fw', fwLabel));
    li.appendChild(el('span', 'cwx-title', ref.title));
    var hidden = [];
    if (ref.strength === 'related') hidden.push('related');
    if (!ref.verified) hidden.push('not yet verified against the source');
    if (hidden.length) li.appendChild(el('span', 'visually-hidden', ' (' + hidden.join(', ') + ')'));
    if (ref.url) {
      var a = el('a', 'cwx-link', 'Source ↗');
      a.href = ref.url;
      a.rel = 'noopener';
      li.appendChild(a);
    }
    return li;
  }

  function fwShort(id) {
    var f = current && current.fws[id];
    return f ? f.short : id;
  }

  function renderPairs(sel) {
    var frag = doc.createDocumentFragment();
    var head = el('div', 'cwx-head');
    head.setAttribute('aria-hidden', 'true');
    head.appendChild(el('span', 'cwx-head-topic', 'Topic'));
    head.appendChild(el('span', 'cwx-head-side', 'From: ' + sel.state.src.map(fwShort).join(', ')));
    head.appendChild(el('span', 'cwx-head-side', 'To: ' + fwShort(sel.state.tgt)));
    frag.appendChild(head);

    sel.rows.forEach(function (row) {
      var art = el('article', 'cwx-row');
      art.setAttribute('data-cwx-topic', row.topic.id);
      var h = el('h3', 'cwx-topic');
      var link = el('a', null, row.topic.name);
      link.href = '#topic-' + row.topic.id;
      h.appendChild(link);
      art.appendChild(h);

      var multi = sel.state.src.length > 1;
      [
        { list: row.src, label: 'From the chosen sources', empty: 'No clause from the chosen sources', fw: multi },
        { list: row.tgt, label: 'In ' + fwShort(sel.state.tgt), empty: 'No clause in ' + fwShort(sel.state.tgt), fw: false },
      ].forEach(function (side, i) {
        var box = el('div', 'cwx-side' + (i === 0 ? ' cwx-side--src' : ' cwx-side--tgt'));
        box.appendChild(el('p', 'cwx-side-label', side.label));
        if (side.list.length) {
          var ul = el('ul', 'cwx-clauses');
          side.list.forEach(function (ref) {
            ul.appendChild(clauseItem(ref, side.fw ? fwShort(ref.framework) : null));
          });
          box.appendChild(ul);
        } else {
          box.appendChild(el('p', 'cwx-none', side.empty));
        }
        art.appendChild(box);
      });
      frag.appendChild(art);
    });
    return frag;
  }

  function renderGaps(sel) {
    var frag = doc.createDocumentFragment();
    if (!sel.gaps.length) {
      frag.appendChild(
        el('p', 'cwx-none', 'Every ' + fwShort(sel.state.tgt) + ' clause in this selection is reached by a chosen source.'),
      );
      return frag;
    }
    var ul = el('ul', 'cwx-gaps');
    sel.gaps.forEach(function (gap) {
      var li = clauseItem(gap.ref, null);
      var names = gap.topics.map(function (id) {
        return sel.topicsById[id] ? sel.topicsById[id].name : id;
      });
      li.appendChild(el('span', 'cwx-gap-topics', 'Topics: ' + names.join(', ')));
      ul.appendChild(li);
    });
    frag.appendChild(ul);
    return frag;
  }

  function render() {
    if (!data) return;
    var st = normalise(data, readForm());
    state = st;
    writeForm(st);
    current = compute(data, st);
    if (ownsHash) {
      try {
        global.history.replaceState(null, '', formatHash(st));
      } catch (e) {
        /* history may be unavailable (sandboxed frames); the view still renders */
      }
    }

    out.textContent = '';
    if (!st.src.length) {
      out.appendChild(el('p', 'cwx-none', 'Choose at least one source framework.'));
    } else if (!current.rows.length) {
      out.appendChild(el('p', 'cwx-none', 'No clause matches this selection.'));
    } else {
      out.appendChild(st.view === 'gaps' ? renderGaps(current) : renderPairs(current));
    }

    var targetsN = current.targets.length;
    setStatus(
      selectionTitle(current) +
        ': ' +
        current.pairs.length +
        ' clause pair' +
        (current.pairs.length === 1 ? '' : 's') +
        ' across ' +
        current.rows.filter(function (r) {
          return r.src.length && r.tgt.length;
        }).length +
        ' topics; ' +
        current.gaps.length +
        ' of ' +
        targetsN +
        ' ' +
        fwShort(st.tgt) +
        ' clause' +
        (targetsN === 1 ? '' : 's') +
        ' in the selection have no mapping from the chosen sources.',
    );
    for (var i = 0; i < actions.length; i++) {
      var kind = actions[i].getAttribute('data-cwx-action');
      actions[i].disabled = kind === 'oscal' ? current.pairs.length === 0 : !st.src.length;
    }
  }

  function download(name, type, text) {
    var blob = new Blob([text], { type: type });
    var url = global.URL.createObjectURL(blob);
    var a = doc.createElement('a');
    a.href = url;
    a.download = name;
    a.hidden = true;
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
    global.setTimeout(function () {
      global.URL.revokeObjectURL(url);
    }, 1000);
  }

  function fileBase(st) {
    return 'aige-crosswalk-' + st.src.join('+') + '-to-' + st.tgt;
  }

  function copyLink(url) {
    function fallback() {
      setStatus('Copy this link: ' + url);
    }
    if (global.navigator && global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(url).then(function () {
        setStatus('Link copied: ' + url);
      }, fallback);
    } else {
      fallback();
    }
  }

  function onAction(kind) {
    if (!data || !current) return;
    var now = new Date().toISOString();
    var url = shareUrl(state);
    if (kind === 'link') {
      copyLink(url);
    } else if (kind === 'csv') {
      download(fileBase(state) + '.csv', 'text/csv;charset=utf-8', toCsv(data, current, url));
    } else if (kind === 'json') {
      download(
        fileBase(state) + '.json',
        'application/json',
        JSON.stringify(toJson(data, current, url, now), null, 2) + '\n',
      );
    } else if (kind === 'oscal') {
      var doc2 = toOscal(data, current, url, now);
      if (!doc2) {
        setStatus('The OSCAL export needs at least one clause pair.');
        return;
      }
      download(fileBase(state) + '.oscal.json', 'application/json', JSON.stringify(doc2, null, 2) + '\n');
    }
  }

  function load() {
    if (loading) return loading;
    setStatus('Loading the crosswalk…');
    loading = global
      .fetch(dataUrl, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        data = json;
        if (state) writeForm(normalise(data, state));
        render();
      })
      .catch(function () {
        loading = null;
        setStatus(
          'The crosswalk data could not be loaded. The matrix and the topic sections on this page carry the same references.',
        );
      });
    return loading;
  }

  form.addEventListener('change', function () {
    ownsHash = true;
    if (data) render();
    else load();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });
  for (var a = 0; a < actions.length; a++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        onAction(btn.getAttribute('data-cwx-action'));
      });
    })(actions[a]);
  }

  global.addEventListener('hashchange', function () {
    var next = parseHash(global.location.hash);
    if (!next) return;
    state = next;
    ownsHash = true;
    if (data) {
      writeForm(normalise(data, next));
      render();
    } else {
      load();
    }
  });

  // A shared link lands here: apply it, load at once and bring the explorer
  // into view (the fragment names no element, so the browser does not scroll).
  if (state) {
    writeForm(state);
    load();
    root.scrollIntoView();
  } else if ('IntersectionObserver' in global) {
    var io = new global.IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            io.disconnect();
            load();
            return;
          }
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(root);
  } else {
    load();
  }
})(typeof window !== 'undefined' ? window : globalThis);
