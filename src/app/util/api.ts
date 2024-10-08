export const createUrl = async (url: string) => {
  const data = await fetch("/api/createUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, key: process.env.NEXT_PUBLIC_API_KEY }),
  });

  const response = await data.json();

  return response;
};

export const getUrl = async (url: string) => {
  const data = await fetch("/api/getUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, key: process.env.NEXT_PUBLIC_API_KEY }),
  });

  const response = await data.json();

  return response;
};
