import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const url = req.nextUrl;
    const host = req.headers.get("host") || "";

    // Redirect www to root domain
    if (host.startsWith("www.")) {
        const newHost = host.replace(/^www\./, "");
        const newUrl = new URL(url.pathname + url.search, `https://${newHost}`);
        return NextResponse.redirect(newUrl, 301);
    }

    // Redirect web dashboard and internal routes to mobile access node
    const internalRoutes = [
        "/dashboard", "/chat", "/profile", "/settings", "/routines",
        "/calendar", "/movement", "/plan", "/track", "/expert"
    ];

    if (internalRoutes.some(route => url.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/access", url));
    }

    return NextResponse.next();
});

export const config = {
    // Only run middleware on these specific routes to avoid crashing the whole site
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
