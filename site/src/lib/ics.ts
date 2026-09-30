// ics.ts: a small iCalendar (RFC 5545) writer for all-day events, used by the
// AI Act deadlines calendars (/resources/ai-act-deadlines.ics and its Spanish
// twin). No dependency: text escaping, 75-octet line folding and CRLF endings
// are all a calendar client needs for a list of dated, all-day events.

export interface IcsEvent {
  /** Globally unique and stable across builds, so a re-import updates in place. */
  uid: string;
  /** YYYY-MM-DD: the day the event falls on. */
  date: string;
  summary: string;
  description?: string;
  url?: string;
}

export interface IcsCalendar {
  /** `-//Org//Product//LANG`. */
  prodId: string;
  name: string;
  /** YYYY-MM-DD used as DTSTAMP (the dataset's as-of date, so builds are reproducible). */
  stamp: string;
  events: readonly IcsEvent[];
}

/** RFC 5545 §3.3.11 TEXT escaping. */
export function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Fold a content line at 75 octets (RFC 5545 §3.1), never splitting a UTF-8 character. */
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = '';
  let size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    // Continuation lines start with one space, which counts towards the 75.
    const limit = parts.length === 0 ? 75 : 74;
    if (size + bytes > limit) {
      parts.push(current);
      current = '';
      size = 0;
    }
    current += char;
    size += bytes;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

const compact = (iso: string) => iso.replace(/-/g, '');

/** The day after `iso` (the DTEND of an all-day event is exclusive). */
export function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function renderIcs(calendar: IcsCalendar): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${calendar.prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calendar.name)}`,
  ];
  for (const event of calendar.events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.uid}`,
      `DTSTAMP:${compact(calendar.stamp)}T000000Z`,
      `DTSTART;VALUE=DATE:${compact(event.date)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(event.date))}`,
      `SUMMARY:${escapeText(event.summary)}`,
    );
    if (event.description) lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    if (event.url) lines.push(`URL:${event.url}`);
    lines.push('TRANSP:TRANSPARENT', 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return `${lines.map(foldLine).join('\r\n')}\r\n`;
}

export function icsResponse(body: string): Response {
  return new Response(body, { headers: { 'content-type': 'text/calendar; charset=utf-8' } });
}
