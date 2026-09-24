/* hero-field.js — the home hero's moving gradient field, and the motion of
   its figures strip. Loaded same-origin so the CSP script-src 'self' holds (no
   inline JS). Progressive enhancement: without this file the hero shows the
   static CSS fallback painted on .hero-field and a static, wrapping strip.

   The field is a WebGL fragment shader on the hero's <canvas>: three soft
   blobs in the --field-1..3 tones (navy, blue, peach) drift on slow Lissajous
   paths over the page ground, their edges bent by a light domain warp. It is
   drawn at a fraction of the CSS size (the field has no edges to lose) and
   scaled up, at about 30 fps.

   Legibility is structural, not a matter of luck: inside the headline's box
   and under the floating header the shader lifts (light theme) or sinks (dark
   theme) each pixel towards the ground just enough to hold a contrast target
   against the ink drawn there — the headline's --hero-ink and the header's
   --ink-2, the weakest ink in the bar — and feathers the correction out
   around both zones. So the text keeps AA wherever the blobs wander.

   Motion rules (WCAG 2.2.2, SL-02): the field and the strip move only under
   prefers-reduced-motion: no-preference; the "Pause motion" toggle (off
   screen until keyboard focus, like the skip link) stops both, and so does a
   click or tap on the strip, which hovering also pauses;
   the loop also rests while the hero is off screen or the tab is hidden.
   Under reduced motion the field is one still frame and the strip stays a
   static list, from the first paint. Under forced colours (Windows High
   Contrast) the canvas is skipped: the tokens all resolve to the system
   colours there, and the field would paint one flat slab. State is mirrored
   on the canvas as data-state (running | paused | static | off) for the tests. */
(function () {
  'use strict';

  var hero = document.querySelector('[data-hero-field]');
  if (!hero) return;
  var field = hero.querySelector('.hero-field');
  var canvas = hero.querySelector('.hero-canvas');
  var title = hero.querySelector('.hero-title');
  var toggle = hero.querySelector('[data-motion-toggle]');
  var strip = hero.querySelector('.facts-window');
  var header = document.querySelector('.site-header');
  if (!field || !canvas || !title) return;

  var FPS_MS = 1000 / 30; // frame budget: the field moves slowly.
  // Field seconds per real second: the blobs' paths take roughly 30-60 s a
  // lap and the edges keep morphing, so the motion reads within a few
  // seconds, as on the reference (at 1x a lap took 100-200 s and the field
  // looked still).
  var SPEED = 3.5;
  var SCALE = 0.5; // canvas px per CSS px, before the width cap below.
  var MAX_W = 720; // widest canvas drawn, in canvas px.
  var TARGET_TITLE = 4.6; // contrast kept under the headline (AA is 3 for large text).
  var TARGET_BAR = 5; // contrast kept under the header (AA is 4.5).
  var PAD = 12; // CSS px added around the headline's box.

  var reduceQuery = null;
  try {
    reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  } catch (e) {}
  function reduced() {
    return !!(reduceQuery && reduceQuery.matches);
  }

  var paused = false; // the visitor pressed pause.
  var onScreen = true; // the hero intersects the viewport.

  /* ------------------------------------------------------------- colours */

  // Resolve a colour token to [r, g, b] in 0..1: a display:none probe (which
  // never transitions) computes it, and a 1x1 2D canvas turns whatever form
  // the browser serialises (hex, rgb(), color(srgb ...), oklch() ...) into
  // sRGB bytes.
  var probe = document.createElement('span');
  probe.style.display = 'none';
  field.appendChild(probe);
  var swatch = document.createElement('canvas');
  swatch.width = 1;
  swatch.height = 1;
  var sctx = swatch.getContext('2d', { willReadFrequently: true });

  function tokenColor(value) {
    probe.style.color = value;
    var css = getComputedStyle(probe).color;
    sctx.clearRect(0, 0, 1, 1);
    sctx.fillStyle = '#000';
    sctx.fillStyle = css;
    sctx.fillRect(0, 0, 1, 1);
    var d = sctx.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  }

  function channel(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function luminance(rgb) {
    return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  }

  // The luminance limit a background must stay above (dark ink) or below
  // (light ink) to reach `target` against `ink`.
  function limitFor(ink, target, above) {
    var li = luminance(ink);
    return above ? target * (li + 0.05) - 0.05 : (li + 0.05) / target - 0.05;
  }

  /* -------------------------------------------------------------- WebGL */

  var VERT =
    'attribute vec2 a_pos;' + 'void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }';

  var FRAG = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    'uniform vec2 u_res;', // canvas size, px
    'uniform vec2 u_css;', // hero size, CSS px
    'uniform float u_s;', // blob scale: sqrt(w * h), computed on the CPU (fp16-safe)
    'uniform float u_t;', // seconds of motion
    'uniform vec3 u_ground;',
    'uniform vec3 u_c1;',
    'uniform vec3 u_c2;',
    'uniform vec3 u_c3;',
    'uniform vec4 u_box;', // headline box, CSS px: centre x/y, half w/h
    'uniform float u_bar;', // header height, CSS px
    'uniform vec2 u_lim;', // luminance limits: headline, header
    'uniform float u_above;', // 1: backgrounds must stay above the limit
    '',
    'float ch(float c) { return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4); }',
    'float lum(vec3 c) { return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b); }',
    'bool ok(float l, float lim) { return u_above > 0.5 ? l >= lim : l <= lim; }',
    '',
    // Blend towards the ground by the least amount that meets the limit.
    'vec3 clear(vec3 col, float lim) {',
    '  if (ok(lum(col), lim)) return col;',
    '  float lo = 0.0;',
    '  float hi = 1.0;',
    '  for (int i = 0; i < 8; i++) {',
    '    float m = 0.5 * (lo + hi);',
    '    if (ok(lum(mix(col, u_ground, m)), lim)) { hi = m; } else { lo = m; }',
    '  }',
    '  return mix(col, u_ground, hi);',
    '}',
    '',
    'float blob(vec2 p, vec2 c, float r) { vec2 d = (p - c) / r; return exp(-dot(d, d)); }',
    '',
    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / u_res;',
    '  vec2 px = vec2(uv.x, 1.0 - uv.y) * u_css;', // CSS px, y down
    '  vec2 p = px / u_s;',
    '  vec2 k = u_css / u_s;', // fractions of the hero -> p space
    '  float t = u_t;',
    '  p += 0.06 * vec2(',
    '    sin(p.y * 2.6 + t * 0.11) + 0.5 * sin(p.y * 4.3 - t * 0.07),',
    '    cos(p.x * 2.2 - t * 0.09) + 0.5 * cos(p.x * 3.9 + t * 0.05));',
    // Peach low on the left, a broad blue over the right half and the navy
    // inside the blue, high on the right: navy -> blue -> ground stays a
    // chromatic run (navy straight onto the cream would turn grey).
    '  vec2 c3 = k * vec2(0.10 + 0.10 * sin(t * 0.041), 0.72 + 0.12 * sin(t * 0.033 + 2.1));',
    '  vec2 c2 = k * vec2(0.80 + 0.09 * sin(t * 0.047 + 1.7), 0.58 + 0.15 * cos(t * 0.039));',
    '  vec2 c1 = k * vec2(0.80 + 0.13 * sin(t * 0.029 + 0.6), 0.30 + 0.15 * cos(t * 0.037 + 0.4));',
    '  float r1 = 0.30 + 0.03 * sin(t * 0.061);',
    '  float r2 = 0.56 + 0.04 * cos(t * 0.053);',
    '  float r3 = 0.52 + 0.04 * sin(t * 0.045 + 1.0);',
    // The navy thins out as it nears the headline (an elliptical hollow
    // around it) and the top edge, so the dark mass hugs the text instead of
    // running under it; the clamp below is then a safety net, not a plate.
    '  vec2 e = (px - u_box.xy) / (u_box.zw * vec2(1.25, 1.9));',
    '  float hollow = mix(0.2, 1.0, smoothstep(0.55, 1.7, length(e)));',
    '  float top = smoothstep(u_bar * 0.6, u_bar * 3.0, px.y);',
    '  vec3 col = u_ground;',
    '  col = mix(col, u_c3, 0.85 * blob(p, c3, r3));',
    '  col = mix(col, u_c2, 0.90 * blob(p, c2, r2));',
    '  col = mix(col, u_c1, 0.92 * blob(p, c1, r1) * hollow * top);',
    // Legibility: the whole headline box (a rounded rectangle, so its corners
    // count too) and the header band are cleared to their limits, feathered
    // out over 160px and 40px.
    '  float rad = min(48.0, min(u_box.z, u_box.w));',
    '  vec2 q = abs(px - u_box.xy) - (u_box.zw - rad);',
    '  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - rad;',
    '  float wTitle = 1.0 - smoothstep(0.0, 160.0, d);',
    '  float wBar = 1.0 - smoothstep(u_bar, u_bar + 40.0, px.y);',
    '  if (wTitle > 0.0) col = mix(col, clear(col, u_lim.x), wTitle);',
    '  if (wBar > 0.0) col = mix(col, clear(col, u_lim.y), wBar);',
    // A static half-step dither keeps the upscaled field free of banding.
    '  float n = fract(sin(dot(mod(gl_FragCoord.xy, 64.0), vec2(12.9898, 78.233))) * 43758.5453);',
    '  gl_FragColor = vec4(col + (n - 0.5) / 255.0, 1.0);',
    '}',
  ].join('\n');

  var gl = null;
  var prog = null;
  var loc = {};

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
    return sh;
  }

  function initGL() {
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: true,
        powerPreference: 'low-power',
      });
    } catch (e) {
      gl = null;
    }
    if (!gl) return false;
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    [
      'u_res',
      'u_css',
      'u_s',
      'u_t',
      'u_ground',
      'u_c1',
      'u_c2',
      'u_c3',
      'u_box',
      'u_bar',
      'u_lim',
      'u_above',
    ].forEach(function (name) {
      loc[name] = gl.getUniformLocation(prog, name);
    });
    return true;
  }

  // Colours and contrast limits, re-read on every theme change.
  function applyTheme() {
    var ground = tokenColor('var(--bg)');
    var titleInk = tokenColor('var(--hero-ink)');
    var barInk = tokenColor('var(--ink-2)');
    var above = luminance(titleInk) < luminance(ground);
    gl.uniform3fv(loc.u_ground, ground);
    gl.uniform3fv(loc.u_c1, tokenColor('var(--field-1)'));
    gl.uniform3fv(loc.u_c2, tokenColor('var(--field-2)'));
    gl.uniform3fv(loc.u_c3, tokenColor('var(--field-3)'));
    gl.uniform2f(
      loc.u_lim,
      limitFor(titleInk, TARGET_TITLE, above),
      limitFor(barInk, TARGET_BAR, above)
    );
    gl.uniform1f(loc.u_above, above ? 1 : 0);
  }

  // Sizes: the canvas buffer, the hero in CSS px, the headline's box and the
  // header's height (the bar floats over the hero's top edge).
  function applyLayout() {
    var rect = hero.getBoundingClientRect();
    var w = Math.max(1, rect.width);
    var h = Math.max(1, rect.height);
    var scale = Math.min(SCALE, MAX_W / w);
    var cw = Math.max(1, Math.round(w * scale));
    var chh = Math.max(1, Math.round(h * scale));
    if (canvas.width !== cw || canvas.height !== chh) {
      canvas.width = cw;
      canvas.height = chh;
    }
    gl.viewport(0, 0, cw, chh);
    gl.uniform2f(loc.u_res, cw, chh);
    gl.uniform2f(loc.u_css, w, h);
    gl.uniform1f(loc.u_s, Math.sqrt(w * h));

    // The headline's resting box: its rect minus the entrance lift (a
    // translate on the title) that may still be running.
    var tb = title.getBoundingClientRect();
    var lift = 0;
    try {
      lift = new DOMMatrixReadOnly(getComputedStyle(title).transform).m42 || 0;
    } catch (e) {}
    gl.uniform4f(
      loc.u_box,
      tb.left - rect.left + tb.width / 2,
      tb.top - lift - rect.top + tb.height / 2,
      tb.width / 2 + PAD,
      tb.height / 2 + PAD
    );
    gl.uniform1f(loc.u_bar, header ? Math.max(1, header.offsetHeight) : 1);
  }

  /* ---------------------------------------------------------------- loop */

  // Field seconds shown so far (frozen while paused). A data-t0 on the
  // canvas starts it elsewhere: the tests sample still frames across the
  // blobs' paths with it; the page itself never sets it.
  var clock = Number(canvas.getAttribute('data-t0')) || 0;
  var last = 0; // timestamp of the last drawn frame.
  var raf = null;

  function draw() {
    gl.uniform1f(loc.u_t, clock);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!field.hasAttribute('data-ready')) field.setAttribute('data-ready', '');
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (!last) last = ts;
    var dt = ts - last;
    if (dt < FPS_MS - 1) return;
    last = ts;
    clock += (Math.min(dt, 100) / 1000) * SPEED; // a long gap (tab switch) is not a jump.
    draw();
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    last = 0;
  }

  function setState(state) {
    canvas.setAttribute('data-state', state);
  }

  // Single reconcile point for the field and the strip.
  function reconcile() {
    var still = reduced();
    hero.classList.toggle('is-live', !still);
    if (toggle) toggle.hidden = still;
    if (paused && !still) hero.setAttribute('data-paused', '');
    else hero.removeAttribute('data-paused');

    if (!gl) return setState('off');
    if (still) {
      stop();
      draw();
      return setState('static');
    }
    if (paused || !onScreen || document.hidden) {
      stop();
      return setState('paused');
    }
    if (!raf) raf = requestAnimationFrame(frame);
    setState('running');
  }

  /* --------------------------------------------------------------- wiring */

  function togglePause() {
    if (reduced()) return;
    paused = !paused;
    if (toggle) toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
    reconcile();
  }

  if (toggle) toggle.addEventListener('click', togglePause);
  // Pointer and touch users have no toggle in sight: a click or tap on the
  // strip pauses and resumes the same way (the keyboard has the toggle).
  if (strip) strip.addEventListener('click', togglePause);

  var forced = false;
  try {
    forced = window.matchMedia('(forced-colors: active)').matches;
  } catch (e) {}

  if (forced || !initGL()) {
    gl = null;
    reconcile();
    return;
  }

  canvas.addEventListener('webglcontextlost', function (e) {
    e.preventDefault();
    stop();
    gl = null;
    field.removeAttribute('data-ready'); // back to the CSS fallback.
    reconcile();
  });

  canvas.addEventListener('webglcontextrestored', function () {
    if (!initGL()) {
      gl = null;
      return reconcile();
    }
    applyTheme();
    applyLayout();
    draw();
    reconcile();
  });

  applyTheme();
  applyLayout();
  draw(); // the first frame, drawn before the loop starts.

  function relayout() {
    if (!gl) return;
    applyLayout();
    draw();
  }

  // The hero, the headline (text zoom, the font swap) and the header (its
  // bar wraps with enlarged text) all move the zones the shader keeps clear.
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(relayout);
    ro.observe(hero);
    ro.observe(title);
    if (header) ro.observe(header);
  } else {
    window.addEventListener('resize', relayout);
  }
  title.addEventListener('animationend', relayout);
  // The headline's box changes when the serif display cut swaps in.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

  new MutationObserver(function () {
    if (!gl) return;
    applyTheme();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!gl) return;
      applyTheme();
      draw();
    });
  } catch (e) {}

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].isIntersecting;
      reconcile();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', reconcile);
  if (reduceQuery && reduceQuery.addEventListener) {
    reduceQuery.addEventListener('change', reconcile);
  }

  reconcile();
})();
