// A small glob matcher for --only: "*" (no "/"), "**" (any depth), "?", "{a,b}".
// Patterns match repo-relative paths with forward slashes, e.g. "bok/0*.md",
// "bok/patterns/**", "THESIS.md".

export function globToRegExp(glob) {
  let re = '';
  let i = 0;
  let inGroup = false;
  while (i < glob.length) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // "**/" matches zero or more directories; a trailing "**" matches the rest.
        if (glob[i + 2] === '/') {
          re += '(?:.*/)?';
          i += 3;
        } else {
          re += '.*';
          i += 2;
        }
      } else {
        re += '[^/]*';
        i++;
      }
      continue;
    }
    if (c === '?') re += '[^/]';
    else if (c === '{') {
      re += '(?:';
      inGroup = true;
    } else if (c === '}' && inGroup) {
      re += ')';
      inGroup = false;
    } else if (c === ',' && inGroup) re += '|';
    else re += c.replace(/[.+^$()|[\]\\]/g, '\\$&');
    i++;
  }
  return new RegExp(`^${re}$`);
}
