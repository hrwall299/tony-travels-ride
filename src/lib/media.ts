/** Resolve a stored media reference to a URL the public site can render. */
export function mediaUrl(value: string | undefined | null): string {
  if (!value) return "";
  if (/^(https?:|data:|blob:|\/)/.test(value)) return value;
  return `/api/public/media/${value.split("/").map(encodeURIComponent).join("/")}`;
}
