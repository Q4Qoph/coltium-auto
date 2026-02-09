import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "coltium_token";
const LOGIN = "/login";

const protectedPrefixes = ["/dashboard", "/admin", "/technician"];

function isProtected(pathname: string): boolean {
  return protectedPrefixes.some((p) => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (isProtected(pathname) && !token) {
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && token) {
    const from = request.nextUrl.searchParams.get("from") || "/dashboard";
    return NextResponse.redirect(new URL(from, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/technician/:path*", "/login"],
};
