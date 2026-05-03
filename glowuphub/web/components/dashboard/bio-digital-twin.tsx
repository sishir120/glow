"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Droplets, Flame, Brain, Zap } from "lucide-react";

export function BioDigitalTwin({ hydration = 80, energy = 65, focus = 90, stress = 20 }: any) {
    return (
        <div className="glass-premium rounded-[1.5rem] p-4 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-full flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold tracking-tight">Biological Synthesis</h3>
                        <p className="text-[9px] text-foreground-muted font-black uppercase tracking-widest text-emerald-500">Real-time Homeostatic Status</p>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-4 bg-emerald-500/20 rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="relative w-48 h-64 mb-6 flex items-center justify-center">
                    {/* Glow Effects */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full w-full bg-emerald-500/10 blur-[100px] rounded-full animate-breathe" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

                    {/* SVG Human Figure */}
                    <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] filter animate-bio-glow">
                        <defs>
                            <radialGradient id="hydration-grad">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="transparent" />
                            </radialGradient>

                            <pattern id="twin-mesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.07)" />
                            </pattern>

                            <mask id="human-mask">
                                <path
                                    d="M50 10 C55 10 58 15 58 20 C58 25 55 30 50 30 C45 30 42 25 42 20 C42 15 45 10 50 10 M42 32 L58 32 L65 50 L62 90 L55 90 L55 130 L60 180 L50 180 L40 180 L45 130 L45 90 L38 90 L35 50 Z"
                                    fill="white"
                                />
                            </mask>
                        </defs>

                        {/* Phantom Body Shadow */}
                        <path
                            d="M50 10 C55 10 58 15 58 20 C58 25 55 30 50 30 C45 30 42 25 42 20 C42 15 45 10 50 10 M42 32 L58 32 L65 50 L62 90 L55 90 L55 130 L60 180 L50 180 L40 180 L45 130 L45 90 L38 90 L35 50 Z"
                            fill="rgba(255,255,255,0.02)"
                            stroke="rgba(16,185,129,0.15)"
                            strokeWidth="0.5"
                        />

                        {/* Tech-Mesh Overlay */}
                        <rect x="0" y="0" width="100" height="200" fill="url(#twin-mesh)" mask="url(#human-mask)" opacity="0.4" />

                        {/* Dynamic Core Glow (Hydration) */}
                        <motion.circle
                            cx="50" cy="70"
                            initial={{ r: 5 }}
                            animate={{ r: 15 + (hydration / 10), opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            fill="url(#hydration-grad)"
                            className="filter blur-[12px]"
                        />

                        {/* Energy Pathways (Thorax/Limbs) */}
                        <motion.path
                            d="M50 40 L50 80 M45 50 L35 60 M55 50 L65 60"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="text-emerald-500/60"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: energy / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />

                        {/* Focus Pulse (Head) */}
                        <motion.circle
                            cx="50" cy="20" r="5"
                            fill="currentColor"
                            className="text-emerald-500"
                            initial={{ scale: 0.8, opacity: 0.3 }}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </svg>

                    {/* Adaptive Data Labels */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-12 -left-16 flex flex-col items-end gap-1"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]">Oxygen</span>
                        <div className="w-16 h-1 bg-emerald-500/10 rounded-full overflow-hidden border border-emerald-500/20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute bottom-24 -right-16 flex flex-col items-start gap-1"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lavender shadow-[0_0_10px_rgba(167,139,250,0.3)]">Mobility</span>
                        <div className="w-16 h-1 bg-lavender/10 rounded-full overflow-hidden border border-lavender/20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "82%" }}
                                className="h-full bg-lavender"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Integration Dashboard */}
                <div className="w-full grid grid-cols-2 gap-2">
                    <TwinIndicator
                        icon={<Droplets size={14} />}
                        label="Hydration"
                        value={hydration}
                        color="emerald"
                    />
                    <TwinIndicator
                        icon={<Zap size={14} />}
                        label="Energy"
                        value={energy}
                        color="amber"
                    />
                    <TwinIndicator
                        icon={<Brain size={14} />}
                        label="Cognitive"
                        value={focus}
                        color="lavender"
                    />
                    <TwinIndicator
                        icon={<Flame size={14} />}
                        label="Metabolic"
                        value={100 - stress}
                        color="coral"
                    />
                </div>
            </div>
        </div>
    );
}

function TwinIndicator({ icon, label, value, color }: any) {
    const colors: any = {
        emerald: "text-emerald-500",
        amber: "text-amber-500",
        lavender: "text-lavender",
        coral: "text-coral"
    };

    return (
        <div className="p-2 rounded-lg bg-white/3 border border-white/5 flex items-center gap-2 group/item">
            <div className={cn(
                "w-6 h-6 rounded-md bg-white/5 flex items-center justify-center transition-all group-hover/item:scale-110",
                colors[color]
            )}>
                {icon}
            </div>
            <div>
                <p className="text-[7.5px] font-black uppercase tracking-widest text-foreground-muted opacity-50">{label}</p>
                <p className="text-xs font-black tabular-nums">{value}%</p>
            </div>
        </div>
    );
}
