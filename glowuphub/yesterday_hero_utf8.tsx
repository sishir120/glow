"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Heart, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { VideoPlayer } from "./routine/video-player";
import Link from "next/link";

export function Hero() {
    const [showWalkthrough, setShowWalkthrough] = useState(false);

    return (
        <section className="relative w-full min-h-screen pt-20 flex flex-col items-center overflow-hidden bg-[#0a0f0d]">
            {/* Design Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Main Dark Emerald Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

                {/* Geometric Capsule Shapes (Mobile Focus) */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square opacity-20 md:opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[400px] border border-emerald-500/30 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[580px] border border-emerald-500/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[750px] border border-emerald-500/10 rounded-full" />
                </div>

                {/* Animated Glow Spot */}
                <motion.div
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_20px_4px_rgba(52,211,153,0.8)]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                {/* Hero Top Illustration Area */}
                <div className="relative w-full max-w-md h-[300px] md:h-[400px] flex items-center justify-center mt-4">
                    {/* Central Logo in Circular Container */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                    >
                        <Logo size={48} />
                    </motion.div>

                    {/* Floating Glow Score Card */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                        transition={{
                            opacity: { duration: 0.5, delay: 0.5 },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute bottom-10 left-4 md:left-10 z-30 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3 shadow-2xl min-w-[170px]"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Glow Score</p>
                            <p className="text-sm font-bold text-white tracking-tight">Building Γ£¿</p>
                        </div>
                    </motion.div>
                </div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center gap-6 max-w-2xl -mt-4"
                >
                    {/* Science Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                        Science-Backed Metabolic Reset
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] flex flex-col gap-1">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-blue-400 to-white drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">
                            Lose Weight For Good
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
                            Metabolism, Not Starvation
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-md">
                        Stop fighting your biology. Join <span className="text-emerald-400 font-bold">10,480+ women</span> resetting their metabolic set-point with <span className="text-white">Clinician Nutritionist Sabita Subedi.</span>
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col items-center gap-6 mt-4 w-full px-4">
                        <Link href="/register" className="w-full max-w-sm">
                            <Button
                                size="lg"
                                className="rounded-full h-14 w-full text-lg font-bold bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all"
                            >
                                Start Losing Weight (Free)
                            </Button>
                        </Link>

                        <button
                            onClick={() => setShowWalkthrough(true)}
                            className="flex items-center gap-3 text-base text-zinc-300 font-semibold group hover:text-white transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                                <Play className="w-4 h-4 fill-white text-white" />
                            </div>
                            View Walkthrough
                        </button>
                    </div>

                    {/* Availability */}
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <p className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">
                            Available on iOS & Android
                        </p>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showWalkthrough && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <VideoPlayer onClose={() => setShowWalkthrough(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

