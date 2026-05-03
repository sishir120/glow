"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setIsSubmitted(true);
    }

    return (
        <AuthLayout
            heading="Reset Password"
            subheading="We'll send you a link to reset your password"
        >
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-6"
                    >
                        <form onSubmit={onSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-400 font-medium">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    className="h-12 bg-white/[0.03] border-white/10 rounded-xl focus:ring-primary/20 focus:border-primary/40 transition-all font-medium"
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                className="h-12 rounded-full font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Sending Link...</span>
                                    </div>
                                ) : "Send Reset Link"}
                            </Button>
                        </form>

                        <div className="flex flex-col gap-4">
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group px-4 py-2"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Login
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center py-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                            <MailCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            We've sent a password reset link to <br />
                            <span className="text-white font-medium">{email}</span>
                        </p>
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full h-12 rounded-full font-bold border-white/10 hover:bg-white/5">
                                Return to Login
                            </Button>
                        </Link>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-6 text-sm text-zinc-500 hover:text-primary transition-colors font-medium"
                        >
                            Didn't receive code? Try again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
