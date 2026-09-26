# reg-monitor-state

Machine-written state of the regulatory change monitor (`tools/reg-monitor` on `main`).
This orphan branch shares no history with `main` and is never merged: every push to `main`
deploys the site, so the daily state must not land there. Do not edit by hand.

- `state.json`: per source, the SHA-256 of the normalised content, when that version was first
  seen, and the fetch-failure counter.
- `text/<id>.txt`: the last normalised text of each HTML source, used to diff the next version.
