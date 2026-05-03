"use client";

import { motion } from "framer-motion";
import { Circle, Activity, Heart, Sparkles, ShieldCheck, Leaf, Utensils, BrainCircuit, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Phase 01: Biological Reset",
        description: "Your system isn't dysfunctional; it's de-calibrated. We engineer nutrient-dense protocols that stimulate metabolic flexibility without deprivation.",
        icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Phase 02: Performance Priming",
        description: "Punishment is not progress. Implement 15-minute bio-rhythm sequences designed to down-regulate cortisol while optimizing hormonal output.",
        icon: <Zap className="w-5 h-5 text-amber-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Phase 03: Homeostatic Mastery",
        description: "Break the cycle of internal friction. Establish unshakeable biological self-trust through neurologically-informed daily rituals.",
        icon: <BrainCircuit className="w-5 h-5 text-lavender" />,
        className: "md:col-span-1",
    },
];

export function Features() {
    return (
        <section id="features" className="py-32 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Methodology</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                            The <span className="text-emerald-500">Metabolic <br />Protocol</span>.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground-muted max-w-sm leading-relaxed font-medium pb-2"
                    >
                        A clinical-grade framework for the human machine. Most systems fight your biology; we synchronize it.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-background p-12 flex flex-col justify-between min-h-[400px] hover:bg-zinc-900/50 transition-colors duration-500"
                        >
                            <div className="space-y-8">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
                                    {feature.icon}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-sm text-foreground-muted leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Explore Phase</span>
                                <div className="h-px w-8 bg-emerald-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
}
