// legend-groups.ts: a legend in headed groups, one row (or more, wrapping)
// per group, for charts that encode two things with marks: fill for a status
// and shape for a kind. With one flat row an outlined circle meant both
// "upcoming" and "a circle", so each group names what its swatches encode
// ("Status", "Basis"). The swatches come from the kit's legend helper.
import { legend, text, textWidth, type MarkState, type Shape, type Tone, markStyles } from '../charts/core';

export interface LegendGroup {
  head: string;
  entries: { label: string; shape?: Shape; state?: MarkState; tone?: Tone }[];
}

/** Draw the groups from (x0, y), the first baseline; returns the elements and
 *  the baseline of the last row. */
export function legendGroups(groups: LegendGroup[], x0: number, y: number, maxX: number, marks: ReturnType<typeof markStyles>): { els: string[]; bottom: number } {
  const els: string[] = [];
  let row = y;
  groups
    .filter((g) => g.entries.length)
    .forEach((g, i) => {
      if (i) row += 20;
      els.push(text(x0, row, g.head, { size: 12, cls: 'mono muted', where: 'legend head' }));
      const lg = legend(g.entries, x0 + textWidth(g.head, 12, 'mono') + 10, row, maxX, marks);
      els.push(...lg.els);
      row = lg.bottom;
    });
  return { els, bottom: row };
}
