"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BioStatProps {
    label: string;
    value: string;
    unit: string;
    icon: React.ReactNode;
    trend: string;
    progress: number;
    color: "emerald" | "coral" | "lavender";
}

export function BioStat({ label, value, unit, icon, trend, progress, color }: BioStatProps) {
    const colors = {
        emerald: "bg-emerald-500",
        coral: "bg-coral",
        lavender: "bg-lavender"
    };

    return (
        <div className="glass-premium bg-white/2 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group/stat">
            <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/stat:rotate-6 transition-transform">
                    {icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/60">{trend}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black tabular-nums tracking-tighter">{value}</span>
                <span className="text-[9px] font-bold text-foreground-muted uppercase tracking-widest">{unit}</span>
            </div>
            <p className="text-[8px] font-black uppercase tracking-widest text-foreground-muted mt-0.5 opacity-50">{label}</p>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={cn("h-full", colors[color])}
                />
            </div>
        </div>
    );
}
