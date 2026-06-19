export function formatTimestamp(ts: number, locale = "en-US"): string {
  if (!ts) return "";
  const d = new Date(ts * 1000);
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
