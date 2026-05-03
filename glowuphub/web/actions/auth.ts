"use server";

import { signIn, signOut } from "@/auth";

export async function loginWithGoogle() {
    try {
        await signIn("google", { redirectTo: "/dashboard" });
    } catch (error) {
        // NextAuth v5 throws a redirect error which is expected
        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
            throw error;
        }
        console.error("Server Action Error:", error);
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}
