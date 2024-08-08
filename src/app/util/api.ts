export const createUrl = async (url: string) => {
  const data = await fetch("/api/createUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const response = await data.json();

  return response;
};

export const getUrl = async (url: string) => {


  console.log(url)
  const data = await fetch("/api/getUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const response = await data.json();

  return response;
};
