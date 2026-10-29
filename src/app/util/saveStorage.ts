import { searchUrl } from "./getUrls";
import type { SavedUrl } from "./types";

const KEY = "savedUrls";

const write = (urls: SavedUrl[]) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(urls));
  } catch {
    // Storage unavailable (private mode, quota): the list just won't persist.
  }
};

export const handleSaveStorage = (newUrl: SavedUrl) => {
  write([newUrl, ...searchUrl().filter((u) => u.urlCode !== newUrl.urlCode)]);
};

export const removeFromStorage = (urlCode: string) => {
  write(searchUrl().filter((u) => u.urlCode !== urlCode));
};

export const clearStorage = () => {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
};
