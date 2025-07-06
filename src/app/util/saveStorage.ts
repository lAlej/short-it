interface SaveStorageProps {
  url: string;
  urlCode: string;
}

export const handleSaveStorage = ({ url, urlCode }: SaveStorageProps) => {
  const savedUrls = window.localStorage.getItem("savedUrls");
  const savedUrlsArray = savedUrls ? JSON.parse(savedUrls) : [];

  window.localStorage.setItem(
    "savedUrls",
    JSON.stringify([{ url, urlCode }, ...savedUrlsArray])
  );
};
