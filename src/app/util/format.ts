const host = () =>
  process.env.NEXT_PUBLIC_HOST_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

export const shortLink = (urlCode: string) => `${host()}/${urlCode}`;

export const stripProtocol = (url: string) =>
  url.replace(/^https?:\/\//i, "").replace(/^www\./i, "");

export const domainOf = (url: string) => stripProtocol(url).split(/[/?#]/)[0];

export const timeAgo = (iso?: string): string => {
  if (!iso) return "";
  const date = new Date(iso);
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (Number.isNaN(minutes)) return "";
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  if (hours < 48) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
