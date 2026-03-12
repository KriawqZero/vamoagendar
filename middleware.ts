import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // In production (HTTPS), Better Auth prefixes cookies with __Secure-
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Check for session cookie (Edge Runtime compatible)
  // Note: Full session validation happens in Server Components via getSession()
  if (isDashboard && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
