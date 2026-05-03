"use client";

import { motion } from "framer-motion";
import { Smartphone, Download, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "@/components/ui/logo";
import { StoreBadges } from "@/components/ui/store-badges";
import Link from "next/link";

export function DownloadCTA() {
    return (
        <section id="download-app" className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-5xl">
                <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
                    {/* Animated background lines */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Left Content */}
                        <div className="text-center lg:text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                                <Smartphone className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-primary uppercase tracking-widest">Mobile Experience</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Your Glow, <br />
                                <span className="text-primary italic">Everywhere.</span>
                            </h2>

                            <p className="text-lg text-foreground-muted leading-relaxed max-w-md mx-auto lg:mx-0">
                                Get the full high-fidelity experience with our native mobile node. Precision bio-tracking, instant protocol synchronization, and offline access to your biological architecture.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="/access">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-emerald-500 text-black font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-emerald-500/20 w-full sm:w-auto uppercase tracking-tight">
                                        <Download className="w-5 h-5 mr-2" />
                                        Access Mobile Node
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full group font-black uppercase tracking-widest text-[10px] w-full sm:w-auto">
                                        Establish Baseline Sync
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start pt-4 opacity-100">
                                <StoreBadges />
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end pt-12 lg:pt-0">
                            <div className="relative w-64 h-[500px] md:w-72 md:h-[580px]">
                                {/* Premium glow behind phone */}
                                <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full opacity-50 animate-pulse" />

                                {/* Outer frame */}
                                <div className="absolute inset-0 bg-[#0A0A0B] rounded-[3.5rem] border-[10px] border-[#1C1C1E] shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
                                    {/* App UI Simulation */}
                                    <div className="absolute inset-0 p-6 pt-14 space-y-8">
                                        <div className="flex justify-between items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/20">
                                                <div className="w-6 h-6 rounded-full bg-primary/40 animate-pulse" />
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="h-2 w-24 bg-primary/30 rounded-full" />
                                            <div className="h-10 w-44 bg-gradient-to-r from-white/20 to-transparent rounded-xl" />
                                        </div>

                                        <div className="flex justify-center py-8 relative">
                                            {/* Circular Progress Mockup */}
                                            <div className="w-48 h-48 rounded-full border-[12px] border-white/5 relative flex items-center justify-center">
                                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="80"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="12"
                                                        className="text-primary/10"
                                                    />
                                                    <circle
                                                        cx="96"
                                                        cy="96"
                                                        r="80"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="12"
                                                        strokeDasharray="500"
                                                        strokeDashoffset="150"
                                                        className="text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                                    />
                                                </svg>
                                                <div className="text-center">
                                                    <Sparkles className="text-emerald-500 w-10 h-10 mx-auto animate-bounce mb-2" />
                                                    <div className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase">Sync Active</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-24 bg-white/[0.03] rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10" />
                                                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="h-24 bg-white/[0.03] rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-cyan-500/10" />
                                                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                                    {/* Mockup screen overlay for that "perfect" look */}
                                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent" />
                                </div>

                                {/* Floating Badge */}
                                {/* Floating Badge with Heartbeat Circles */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-12 md:-right-20 top-1/2 flex items-center justify-center z-20 hidden md:flex"
                                >
                                    {/* Concentric Heartbeat Circles */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-[180px] h-[180px] rounded-full border border-emerald-500/10 animate-pulse" />
                                        <div className="absolute w-[260px] h-[260px] rounded-full border border-emerald-500/5 opacity-50" />
                                        {/* Spinning Gradient Ring */}
                                        <div className="absolute w-[220px] h-[220px] rounded-full opacity-30 animate-[spin_10s_linear_infinite]">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/0 via-emerald-500/20 to-transparent blur-xl" />
                                        </div>
                                    </div>

                                    {/* Main Logo Container */}
                                    <div className="relative w-28 h-28 bg-black/80 backdrop-blur-xl rounded-full shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center border border-emerald-500/20">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                                        <div className="relative z-10">
                                            <Logo size={56} />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
