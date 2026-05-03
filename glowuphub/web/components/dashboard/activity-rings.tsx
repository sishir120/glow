"use client";

import { motion } from "framer-motion";

interface ActivityRingsProps {
    move?: number; // Target: 100
    glow?: number; // Target: 100
    mind?: number; // Target: 100
    size?: number;
}

export function ActivityRings({ move = 75, glow = 45, mind = 90, size = 280 }: ActivityRingsProps) {
    const center = size / 2;
    const strokeWidth = 28;
    const gap = 4;

    const rings = [
        { progress: move, color: "#10B981", radius: center - strokeWidth / 2, label: "Physical" },
        { progress: glow, color: "#6366F1", radius: center - strokeWidth / 2 - strokeWidth - gap, label: "Metabolic" },
        { progress: mind, color: "#F59E0B", radius: center - strokeWidth / 2 - (strokeWidth + gap) * 2, label: "Cognitive" },
    ];

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {rings.map((ring, i) => (
                        <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={ring.color} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={ring.color} />
                        </linearGradient>
                    ))}
                </defs>

                {rings.map((ring, i) => {
                    const circumference = 2 * Math.PI * ring.radius;
                    const offset = circumference - (ring.progress / 100) * circumference;

                    return (
                        <g key={i}>
                            {/* Background Track */}
                            <circle
                                cx={center}
                                cy={center}
                                r={ring.radius}
                                stroke="rgba(255,255,255,0.03)"
                                strokeWidth={strokeWidth}
                                fill="transparent"
                            />
                            {/* Active Ring */}
                            <motion.circle
                                cx={center}
                                cy={center}
                                r={ring.radius}
                                stroke={`url(#grad-${i})`}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                                strokeLinecap="round"
                                style={{ filter: "url(#glow)" }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Center Summary */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white tracking-tighter">74%</span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">Overall Sync</span>
            </div>
        </div>
    );
}
