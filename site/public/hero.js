/* HeroChain — drives the hero "evidence chain" via a data-step state machine.
   Loaded from a same-origin file so the CSP script-src 'self' holds (no inline
   JS). The finished PASS state is server-rendered; this runs only when motion is
   allowed. It resets data-step to 0, steps 1..5 on a setTimeout chain (no rAF),
   rotates the scenario each loop, and pauses while the tab is hidden.

   scenarios[0] MUST match the server-rendered defaults in HeroChain.astro so the
   first live loop is continuous with what was painted. */
(function () {
  'use strict';

  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  var hc = document.querySelector('.hc');
  if (!hc || reduce) return; // leave the server-rendered final state in place.

  // Generic, illustrative scenarios. val/thr are 0-100; PASS when val >= thr.
  var scenarios = [
    {
      id: '#4821',
      rule: 'deny model.deploy unless eval.safety >= 0.95',
      inv: 'agent: support-bot · model: gpt-class · owner: platform',
      metric: 'eval.safety',
      val: 97,
      thr: 95,
      runtime: 'allow · guardrails on · tools scoped · trace ok',
    },
    {
      id: '#4822',
      rule: 'deny data.export unless pii.scan == clean',
      inv: 'agent: intake-bot · model: vision-class · owner: risk',
      metric: 'eval.pii',
      val: 91,
      thr: 95,
      runtime: 'hold · pii.leak detected · request paused',
    },
    {
      id: '#4823',
      rule: 'deny tool.call unless scope.grants tool',
      inv: 'agent: ops-bot · model: gpt-class · owner: platform',
      metric: 'eval.jailbreak',
      val: 98,
      thr: 90,
      runtime: 'allow · identity bound · kill-switch armed',
    },
  ];

  function q(sel) {
    return hc.querySelector(sel);
  }

  var els = {
    type: q('.hc-type'),
    inv: q('.hc-inv'),
    metric: q('.hc-metric'),
    fill: q('.hc-meter-fill'),
    thr: q('.hc-thr'),
    num: q('.hc-num'),
    thrLabel: q('.hc-thr-label'),
    runtime: q('.hc-runtime'),
    vid: q('.hc-vid'),
    stamp: q('.hc-stamp'),
  };

  function typeDurOf(rule) {
    return Math.min(1200, rule.length * 24);
  }

  // Paint one scenario's text and CSS variables; the steps then animate it.
  function paint(s) {
    var pass = s.val >= s.thr;
    var verdict = pass ? 'pass' : 'block';

    if (els.type) {
      els.type.textContent = s.rule;
      els.type.style.setProperty('--chars', String(s.rule.length));
      els.type.style.setProperty('--steps', String(s.rule.length));
      els.type.style.setProperty('--hc-type-dur', typeDurOf(s.rule) + 'ms');
    }
    if (els.inv) els.inv.textContent = s.inv;
    if (els.metric) els.metric.textContent = s.metric;
    if (els.fill) {
      els.fill.style.setProperty('--to', String(s.val));
      els.fill.className = 'hc-meter-fill is-' + verdict;
    }
    if (els.thr) els.thr.style.setProperty('--thr', String(s.thr));
    if (els.num) {
      els.num.style.setProperty('--to', String(s.val));
      els.num.className = 'hc-num is-' + verdict;
    }
    if (els.thrLabel) els.thrLabel.textContent = '≥ 0.' + s.thr;
    if (els.runtime) els.runtime.textContent = s.runtime;
    if (els.vid) els.vid.textContent = s.id;
    if (els.stamp) {
      els.stamp.textContent = pass ? 'PASS' : 'BLOCK';
      els.stamp.className = 'hc-stamp stamp stamp-' + verdict;
    }
  }

  var timer = null;
  var current = 0;
  var paused = false;

  function step(n) {
    hc.setAttribute('data-step', String(n));
  }

  function after(ms, fn) {
    timer = setTimeout(fn, ms);
  }

  function run(i) {
    current = i;
    var s = scenarios[i % scenarios.length];
    paint(s);
    step(0); // quick wipe / reset
    after(260, function () {
      step(1); // policy types
      after(typeDurOf(s.rule) + 360, function () {
        step(2); // inventory
        after(720, function () {
          step(3); // eval meter + count
          after(960, function () {
            step(4); // runtime
            after(760, function () {
              step(5); // assurance stamp
              after(1600, function () {
                run(i + 1);
              });
            });
          });
        });
      });
    });
  }

  hc.classList.add('is-live');
  run(0);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      paused = true;
    } else if (paused) {
      paused = false;
      run(current); // restart the current scenario from the top
    }
  });
})();
