const post = async (path: string, url: string) => {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

  // getUrl answers with an empty body when the code doesn't exist.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

export const createUrl = async (url: string) => {
  const data = await post("/api/createUrl", url);
  if (!data?.urlCode) throw new Error("Invalid response");
  return data as { urlCode: string };
};

export const getUrl = (code: string): Promise<{ url: string } | null> =>
  post("/api/getUrl", code);
