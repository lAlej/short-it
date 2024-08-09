import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req) {
  const uuid = uuidv4().replace(/-/g, "");
  const body = await req.json();
  const newCode = uuid.substring(0, 8);

  
  console.log(body.key)

  if (!body.key || body.key !== process.env.NEXT_PUBLIC_API_KEY) {
    return new Error(JSON.stringify("INVALID API_KEY"), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const newUrl = await prisma.url.create({
    data: {
      url: body.url,
      urlCode: newCode,
    },
  });

  return new Response(JSON.stringify(newUrl), {
    headers: { "Content-Type": "application/json" },
  });
}
