// controls/ids.ts: the control id shape on its own, so src/content.config.ts can
// check research notes against it without loading the whole control registry.
// ./index.ts re-exports it.

/** The shape every control id must match. */
export const CONTROL_ID_PATTERN = /^AIGE-CTL-[A-Z0-9]+-\d{3}$/;
