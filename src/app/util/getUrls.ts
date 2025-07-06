export const searchUrl = () => {
  const savedUrls = window.localStorage.getItem("savedUrls");
  if (savedUrls) {
    return JSON.parse(savedUrls);
  }
  return [];
};
    