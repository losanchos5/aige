// obligation-status-dates.spec.ts: the register must not keep saying "later"
// about a date that has passed. data.spec.ts checks each row's status against
// its own review date; this spec checks it against the day the tests run, so a
// build made after an application date fails until someone re-reviews the row
// (sets `appliesStatus` to 'in-force' or 'grace' and moves `reviewed`). Pure
// Node: no browser, no server.
import { test, expect } from '@playwright/test';

import { obligations } from '../src/data/frameworks';

/** Today in UTC, YYYY-MM-DD: an application date is a calendar day. */
const today = new Date().toISOString().slice(0, 10);

test.describe('obligation statuses against today', () => {
  test('no row says "applies-later" once its appliesFrom date has passed', () => {
    const stale = obligations
      .filter((row) => row.appliesStatus === 'applies-later')
      .filter((row) => row.appliesFrom !== undefined && row.appliesFrom <= today)
      .map((row) => `${row.id}: appliesFrom ${row.appliesFrom} has passed (today ${today}), status still applies-later`);
    expect(stale, stale.join('\n')).toEqual([]);
  });

  test('no row says "deferred" once its deferred date has passed', () => {
    const stale = obligations
      .filter((row) => row.appliesStatus === 'deferred')
      .filter((row) => row.appliesFrom !== undefined && row.appliesFrom <= today)
      .map((row) => `${row.id}: deferred to ${row.appliesFrom}, which has passed (today ${today})`);
    expect(stale, stale.join('\n')).toEqual([]);
  });

  test('every row that says later carries the date it is waiting for', () => {
    for (const row of obligations.filter((o) => ['applies-later', 'deferred'].includes(o.appliesStatus))) {
      expect(row.appliesFrom, `${row.id} has no appliesFrom`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
