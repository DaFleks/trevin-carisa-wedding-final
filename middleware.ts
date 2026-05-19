import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Whitelist the verification API route
  if (pathname.startsWith("/api/guestlist/verify")) {
    return NextResponse.next();
  }

  // ✅ Allow the login page
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // 🔒 Protect all other /guestlist routes
  if (pathname.startsWith("/invitations")) {
    const sessionId = req.cookies.get("session_id")?.value;

    if (!sessionId) {
      console.log("redirect");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Middleware only applies to guestlist pages and assets (skips verify API)
export const config = {
  matcher: [
    "/guestlist/:path*", // protect /guestlist/*
    "/invitations/:path*", // protect /guestlist/*
  ],
};
