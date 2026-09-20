// csv.ts: RFC 4180 CSV field/row helpers, shared by the static CSV export
// endpoints under /resources (the obligation index and the topic crosswalk).
// Moved out of obligations.csv.ts unchanged so both exports escape identically.

/** RFC 4180: quote a field that contains a comma, quote or newline, doubling
 *  any embedded quote. */
export function csvField(value: string): string {
  const needsQuote = /[",\r\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuote ? `"${escaped}"` : escaped;
}

export const csvRow = (cells: readonly string[]) => cells.map(csvField).join(',');
