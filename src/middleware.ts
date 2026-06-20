import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const { auth } = NextAuth(authConfig);

const locales = ["hr", "en"];
const defaultLocale = "hr";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default auth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = (request as any).auth;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (session?.user) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }
    if (!session?.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/hr", request.url));
  }

  return intlMiddleware(request);
}) as any;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
