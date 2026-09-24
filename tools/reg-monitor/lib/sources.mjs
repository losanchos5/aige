// sources.json: loading and validation. Unknown keys are errors, so a typo in
// a hint (say "selct") fails the tests instead of silently doing nothing.

import { readFileSync } from 'node:fs';
import { parseAttributeSpec, parseSelector } from './normalise.mjs';

export const CATEGORIES = ['law', 'guidance', 'standard', 'framework', 'report', 'certification'];
export const TRANSPORTS = ['fetch', 'curl'];
const SOURCE_KEYS = new Set(['id', 'name', 'url', 'jurisdiction', 'category', 'transport', 'hints', 'notes']);
const HINT_KEYS = new Set(['select', 'drop', 'attributes', 'dropLines', 'strip', 'linkPattern', 'minChars']);

export function loadSources(file) {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const errors = validateSources(data);
  if (errors.length) {
    throw new Error(`Invalid ${file}:\n- ${errors.join('\n- ')}`);
  }
  return data.sources;
}

function checkRegex(errors, where, pattern) {
  try {
    new RegExp(pattern);
  } catch (err) {
    errors.push(`${where}: invalid regular expression ${JSON.stringify(pattern)} (${err.message})`);
  }
}

export function validateSources(data) {
  const errors = [];
  if (!data || !Array.isArray(data.sources) || data.sources.length === 0) {
    return ['"sources" must be a non-empty array'];
  }
  const ids = new Set();
  const urls = new Set();
  data.sources.forEach((s, i) => {
    const where = `sources[${i}]${s?.id ? ` (${s.id})` : ''}`;
    if (!s || typeof s !== 'object') {
      errors.push(`${where}: not an object`);
      return;
    }
    for (const key of Object.keys(s)) if (!SOURCE_KEYS.has(key)) errors.push(`${where}: unknown key "${key}"`);
    if (typeof s.id !== 'string' || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(s.id)) errors.push(`${where}: id must match ^[a-z0-9][a-z0-9-]{2,63}$`);
    else if (ids.has(s.id)) errors.push(`${where}: duplicate id`);
    else ids.add(s.id);
    if (typeof s.name !== 'string' || s.name.trim() === '') errors.push(`${where}: name is required`);
    if (typeof s.url !== 'string' || !/^https:\/\/[^\s]+$/.test(s.url)) errors.push(`${where}: url must be an https URL`);
    else if (urls.has(s.url)) errors.push(`${where}: duplicate url`);
    else urls.add(s.url);
    if (typeof s.jurisdiction !== 'string' || s.jurisdiction.trim() === '') errors.push(`${where}: jurisdiction is required`);
    if (!CATEGORIES.includes(s.category)) errors.push(`${where}: category must be one of ${CATEGORIES.join(', ')}`);
    if (s.notes !== undefined && typeof s.notes !== 'string') errors.push(`${where}: notes must be a string`);
    if (s.transport !== undefined && !TRANSPORTS.includes(s.transport)) errors.push(`${where}: transport must be one of ${TRANSPORTS.join(', ')}`);
    if (s.hints === undefined) return;
    if (!s.hints || typeof s.hints !== 'object' || Array.isArray(s.hints)) {
      errors.push(`${where}: hints must be an object`);
      return;
    }
    const h = s.hints;
    for (const key of Object.keys(h)) if (!HINT_KEYS.has(key)) errors.push(`${where}: unknown hint "${key}"`);
    for (const key of ['select', 'drop']) {
      if (h[key] === undefined) continue;
      if (!Array.isArray(h[key]) || h[key].some((x) => typeof x !== 'string')) {
        errors.push(`${where}: hints.${key} must be an array of selector strings`);
        continue;
      }
      for (const sel of h[key]) {
        try {
          parseSelector(sel);
        } catch (err) {
          errors.push(`${where}: hints.${key}: ${err.message}`);
        }
      }
    }
    if (h.attributes !== undefined) {
      if (!Array.isArray(h.attributes) || h.attributes.some((x) => typeof x !== 'string')) {
        errors.push(`${where}: hints.attributes must be an array of "selector@attr" strings`);
      } else {
        for (const spec of h.attributes) {
          try {
            parseAttributeSpec(spec);
          } catch (err) {
            errors.push(`${where}: hints.attributes: ${err.message}`);
          }
        }
      }
    }
    for (const key of ['dropLines', 'strip']) {
      if (h[key] === undefined) continue;
      if (!Array.isArray(h[key]) || h[key].some((x) => typeof x !== 'string')) {
        errors.push(`${where}: hints.${key} must be an array of regular expressions`);
        continue;
      }
      for (const p of h[key]) checkRegex(errors, `${where}: hints.${key}`, p);
    }
    if (h.linkPattern !== undefined) {
      if (typeof h.linkPattern !== 'string') errors.push(`${where}: hints.linkPattern must be a string`);
      else checkRegex(errors, `${where}: hints.linkPattern`, h.linkPattern);
    }
    if (h.minChars !== undefined && (!Number.isInteger(h.minChars) || h.minChars < 1)) {
      errors.push(`${where}: hints.minChars must be a positive integer`);
    }
  });
  return errors;
}
