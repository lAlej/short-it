// middleware.ts (en la raíz)
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");

    const allowedOrigins = [
      "https://short-it-steel.vercel.app",
      "http://localhost:3000",
    ];

    const isValidOrigin = origin && allowedOrigins.includes(origin);
    const isValidReferer =
      referer &&
      allowedOrigins.some((allowed) => referer.startsWith(allowed || ""));

    if (!isValidOrigin && !isValidReferer) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
