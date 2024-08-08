import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const urls = await prisma.url.findMany({
    where: {
      urlCode: body.url,
    },
  });

  return new Response(JSON.stringify(urls[0]), {
    headers: { "Content-Type": "application/json" },
  });
}
