import { NextResponse } from "next/server";

const SUPPORTED = ["en", "fr"];
const DEFAULT = "en";

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  // Ignore Next internals + API + static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // If already localized (/fr/...) allow through
  const firstSeg = pathname.split("/")[1];
  if (SUPPORTED.includes(firstSeg)) {
    // Optional: keep English canonical at "/" by redirecting "/en/..." -> "/..."
    if (firstSeg === "en") {
      const url = req.nextUrl.clone();
      url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Rewrite "/" and any non-localized path to default locale, but KEEP URL
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

// Apply middleware to all paths except those excluded above
export const config = {
  matcher: ["/((?!_next|api).*)"],
};
