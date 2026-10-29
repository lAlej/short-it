import type { SavedUrl } from "./types";

export const searchUrl = (): SavedUrl[] => {
  try {
    const savedUrls = window.localStorage.getItem("savedUrls");
    const parsed = savedUrls ? JSON.parse(savedUrls) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
