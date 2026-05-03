import type { NextAuthConfig, User } from "next-auth"

export const authConfig = {
    providers: [], // Providers are added in auth.ts to avoid edge runtime issues
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // Define protected routes
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') ||
                nextUrl.pathname.startsWith('/admin') ||
                nextUrl.pathname.startsWith('/expert') ||
                nextUrl.pathname.startsWith('/track') ||
                nextUrl.pathname.startsWith('/routines') ||
                nextUrl.pathname.startsWith('/calendar') ||
                nextUrl.pathname.startsWith('/movement') ||
                nextUrl.pathname.startsWith('/plan') ||
                nextUrl.pathname.startsWith('/chat') ||
                nextUrl.pathname.startsWith('/profile') ||
                nextUrl.pathname.startsWith('/settings');

            const isOnAuth = nextUrl.pathname.startsWith('/login') ||
                nextUrl.pathname.startsWith('/register');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            } else if (isOnAuth) {
                if (isLoggedIn) return Response.redirect(new URL('/access', nextUrl));
                return true;
            }
            return true;
        },
        async signIn({ user, account, profile }) {
            // console.log("SignIn Callback:", { provider: account?.provider, email: user?.email });
            if (account?.provider === "google") {
                return true;
            }
            return true;
        },
        async session({ session, token }) {
            // console.log("Session Callback:", { sub: token?.sub, role: token?.role });
            if (session.user && token?.sub) {
                session.user.id = token.sub;
                (session.user as User & { role?: string }).role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                // console.log("JWT Callback (Initial):", { id: user.id, role: user.role });
                token.sub = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    session: { strategy: "jwt" },
    trustHost: true,
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
