/**
 * Parses post frontmatter dates like `MM/DD/YYYY` deterministically so
 * server and client agree (avoids `new Date("04/02/2026")` ambiguity).
 */
function parsePostDateString(dateStr: string): Date | null {
  const trimmed = dateStr.trim();
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
  if (us) {
    const month = Number(us[1]) - 1;
    const day = Number(us[2]);
    const year = Number(us[3]);
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31 && year >= 1) {
      const date = new Date(Date.UTC(year, month, day, 12, 0, 0));
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
        return null;
      }
      return date;
    }
  }
  const iso = /^\d{4}-\d{2}-\d{2}/.exec(trimmed);
  if (iso) {
    const d = new Date(trimmed);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? null : d;
}

const postDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDateForDisplay(dateStr: string): string {
  const parsed = parsePostDateString(dateStr);
  if (!parsed) return dateStr;
  return postDateFormatter.format(parsed);
}
