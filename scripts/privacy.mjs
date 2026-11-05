// Generic personal-data patterns that must never reach the published site.
// The rules are deliberately generic: the actual numbers are never written in the repo.
const rules = [
  {
    id: "pe-mobile",
    pattern: /(?:\+?51[\s-]?)?(?<![\d.,])9\d{2}[\s-]?\d{3}[\s-]?\d{3}(?![\d.,])/g,
  },
  { id: "country-code", pattern: /\+51(?!\d)|\+51\s/g },
  { id: "eight-digit-id", pattern: /(?<![\d.,\-/])\d{8}(?![\d.,\-/])/g },
];

/** Returns every suspicious match in `text`, with the rule that caught it. */
export function findLeaks(text) {
  const found = new Map();
  for (const { id, pattern } of rules) {
    for (const match of text.matchAll(pattern)) {
      const at = match.index ?? 0;
      const overlaps = [...found.values()].some((f) => at >= f.at && at < f.at + f.match.length);
      if (!overlaps) found.set(`${id}:${at}`, { rule: id, match: match[0], at });
    }
  }
  return [...found.values()];
}
