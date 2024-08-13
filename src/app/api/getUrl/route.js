import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();


  if (!body.key || body.key !== process.env.NEXT_PUBLIC_API_KEY) {
    return new Response(JSON.stringify("INVALID API_KEY"), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const urls = await prisma.url.findMany({
    where: {
      urlCode: body.url,
    },
  });

  return new Response(JSON.stringify(urls[0]), {
    headers: { "Content-Type": "application/json" },
  });
}
