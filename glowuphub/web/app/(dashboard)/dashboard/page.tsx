"use client";

import { motion } from "framer-motion";
import { ActivityRings } from "@/components/dashboard/activity-rings";
import { SuccessStories } from "@/components/dashboard/success-stories";
import { LifestyleRituals } from "@/components/dashboard/lifestyle-rituals";
import { TransformationMap } from "@/components/dashboard/transformation-map";
import { ClinicalAdvice } from "@/components/dashboard/clinical-advice";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { StreakTracker } from "@/components/dashboard/streak-tracker";
import { FortuneCookie } from "@/components/rewards/fortune-cookie";
import { InteractiveLogModal } from "@/components/dashboard/interactive-log-modal";
import { useState, useEffect } from "react";
import {
    Scale,
    Target,
    Zap,
    Flame,
    Droplets,
    Sparkles,
    ShieldCheck,
    Brain,
    Wind,
    Sun,
    Moon,
    Loader2,
    Smartphone,
    ArrowUpRight,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BioStat } from "@/components/dashboard/bio-stat";
import { RitualCard } from "@/components/dashboard/ritual-card";
import { BioDigitalTwin } from "@/components/dashboard/bio-digital-twin";
import { WeightChart } from "@/components/dashboard/weight-chart";

export default function DashboardPage() {
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/user");
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                } else {
                    // Fallback for demo
                    setUserData({ name: "Sishir", bio: { weight: 74.2, height: 178 } });
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setUserData({ name: "Sishir", bio: { weight: 74.2, height: 178 } });
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    const firstName = userData?.name?.split(' ')[0] || "User";

    return (
        <div className="space-y-12 lg:space-y-20 pb-40">
            <InteractiveLogModal
                isOpen={isLogOpen}
                onClose={() => setIsLogOpen(false)}
                onComplete={(data) => console.log("Logged:", data)}
            />

            {/* 1. Matrix Header */}
            <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <FadeIn direction="down" className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">System Online: Bio-Node Alpha</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] text-white">
                            Glow Up, <br /> <span className="text-emerald-500">{firstName}</span>.
                        </h1>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2} className="flex justify-start lg:justify-end gap-4">
                    <Button
                        onClick={() => setIsLogOpen(true)}
                        size="lg"
                        className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black tracking-tighter text-lg px-8 h-16 group"
                    >
                        LOG BIOMETRICS
                        <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <Link href="/mobile">
                        <Button size="icon" variant="outline" className="w-16 h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
                            <Smartphone className="w-6 h-6" />
                        </Button>
                    </Link>
                </FadeIn>
            </header>

            {/* 2. Core Biological Matrix */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Centerpiece: Digital Twin */}
                <div className="xl:col-span-4 h-full">
                    <FadeIn delay={0.3}>
                        <BioDigitalTwin />
                    </FadeIn>
                </div>

                {/* Bio Stats & Activity */}
                <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FadeIn delay={0.4}>
                        <div className="glass-premium rounded-[1.5rem] p-8 border border-white/5 h-full space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-black uppercase tracking-widest text-foreground-muted">Metabolic Activity</h3>
                                <TrendingUp className="text-emerald-500 w-5 h-5" />
                            </div>
                            <ActivityRings />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <div className="glass-premium rounded-[1.5rem] p-8 border border-white/5 h-full space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-black uppercase tracking-widest text-foreground-muted">Precision Stats</h3>
                                <Zap className="text-amber-500 w-5 h-5" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <BioStat label="Heart Rate" value="72" unit="bpm" icon={<TrendingUp className="w-4 h-4" />} color="emerald" trend="+2%" progress={72} />
                                <BioStat label="Focus" value="88" unit="%" icon={<Brain className="w-4 h-4" />} color="lavender" trend="Stable" progress={88} />
                                <BioStat label="Temp" value="36.6" unit="°C" icon={<Sun className="w-4 h-4" />} color="coral" trend="Optimal" progress={95} />
                                <BioStat label="Recovery" value="92" unit="%" icon={<Zap className="w-4 h-4" />} color="emerald" trend="High" progress={92} />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 3. Trend Lab */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <FadeIn delay={0.6} className="lg:col-span-8">
                    <div className="glass-premium rounded-[2rem] p-8 border border-white/5">
                        <div className="flex justify-between items-end mb-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold tracking-tight">Transformation Projection</h3>
                                <p className="text-xs text-foreground-muted font-medium">Visualizing your 30-day weight homeostasis</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest leading-none">-2.4kg</span>
                                <p className="text-[10px] text-foreground-muted font-bold">CURRENT TREND</p>
                            </div>
                        </div>
                        <WeightChart />
                    </div>
                </FadeIn>

                <FadeIn delay={0.7} className="lg:col-span-4 flex flex-col gap-6">
                    <StreakTracker />
                    <FortuneCookie />
                </FadeIn>
            </section>

            {/* 4. Ritual Hub */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground-muted/50 whitespace-nowrap">Ritual Synchronization</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <FadeIn delay={0.8}>
                    <LifestyleRituals />
                </FadeIn>
            </section>

            {/* Footer */}
            <div className="pt-20 text-center space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.6em] text-foreground-muted/30">
                    Trusted by the global elite for metabolic optimization
                </p>
            </div>
        </div>
    );
}

