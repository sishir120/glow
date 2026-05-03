"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import { Play, Sparkles, Heart, ChevronDown } from "lucide-react";
import { StoreBadges } from "@/components/ui/store-badges";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full min-h-screen pt-20 flex items-center overflow-hidden bg-background">
            {/* Dark Focused Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-full bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6 max-w-2xl"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] md:text-xs font-medium text-primary w-fit">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            Expert-Led Weight Loss ΓÇó 10,000+ Success Stories
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[0.95] text-foreground">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-400 to-white">
                                Lose Weight
                            </span>{" "}
                            <span className="text-white">For Good.</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-primary to-emerald-600">
                                Metabolism, Not Starvation.
                            </span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-foreground-muted leading-relaxed max-w-lg mb-4">
                            Stop fighting your biology. Join <span className="text-primary font-semibold">10,480+ women</span> globally resetting their metabolic set-point with Clinical Nutritionist Sabita Subedi.
                            <br />
                            <span className="font-semibold text-foreground">No counting, no cardio, just results.</span>
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                            <Link href="/register">
                                <Button
                                    size="lg"
                                    className="rounded-full h-14 px-10 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                                >
                                    Start Losing Weight (Free)
                                </Button>
                            </Link>
                            <Link href="/download">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="gap-3 text-foreground font-semibold hover:bg-transparent group"
                                >
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-white/5 transition-colors">
                                        <Play className="w-4 h-4 fill-current" />
                                    </div>
                                    View Walkthrough
                                </Button>
                            </Link>
                        </div>

                        {/* Store Badges Section */}
                        <div className="mt-8 flex flex-col gap-4">
                            <p className="text-[10px] font-bold text-foreground-muted tracking-[0.2em] uppercase">
                                Available on iOS & Android
                            </p>
                            <div className="flex items-center gap-3">
                                <Link href="/download" className="hover:opacity-80 transition-opacity">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-9 w-auto" alt="App Store" />
                                </Link>
                                <Link href="/download" className="hover:opacity-80 transition-opacity">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-9 w-auto" alt="Play Store" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Orbital Visual */}
                    <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                        {/* Concentric Circles (Radar) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[150px] h-[150px] rounded-full border border-white/5" />
                            <div className="w-[300px] h-[300px] rounded-full border border-white/5" />
                            <div className="w-[450px] h-[450px] rounded-full border border-white/5" />
                            <div className="w-[650px] h-[650px] rounded-full border border-white/5" />
                        </div>

                        {/* Floating Dots on Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[450px] h-[450px]"
                        >
                            <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] -translate-x-1/2" />
                        </motion.div>

                        {/* Central Logo */}
                        <div className="relative z-10 w-24 h-24 bg-background border border-primary/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                            <Logo size={40} />
                        </div>

                        {/* Floating Cards */}
                        {/* Daily Practice Card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 right-0 p-3 bg-card/60 backdrop-blur-md border border-white/5 rounded-2xl flex items-center gap-3 shadow-2xl min-w-[160px]"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Heart className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                                <p className="text-[10px] text-foreground-muted leading-none mb-1">Daily Practice</p>
                                <p className="text-sm font-bold text-white leading-none">15 min</p>
                            </div>
                        </motion.div>

                        {/* Glow Score Card */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/4 left-0 p-3 bg-card/60 backdrop-blur-md border border-white/5 rounded-2xl flex items-center gap-3 shadow-2xl min-w-[160px]"
                        >
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] text-foreground-muted leading-none mb-1">Glow Score</p>
                                <p className="text-sm font-bold text-white leading-none">Building Γ£¿</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile Only: Simple visuals can be added if needed, but keeping it focused as per images */}
                </div>
            </div>
        </section>
    );
}
