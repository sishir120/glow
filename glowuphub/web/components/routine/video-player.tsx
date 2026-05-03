"use client";

import { Button } from "@/components/ui/button";
import { X, Play, Pause, SkipForward, Heart, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
    onClose: () => void;
}

export function VideoPlayer({ onClose }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

    // Simulate playback
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
                setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            {/* Video Placeholder Background */}
            <div className="absolute inset-0 bg-stone-900">
                <div className="w-full h-full flex items-center justify-center opacity-20">
                    <span className="text-9xl font-bold text-white">4K VIDEO</span>
                </div>
                {/* Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+') " }}></div>
            </div>

            {/* Overlay UI */}
            <div className="relative z-10 flex-1 flex flex-col justify-between p-6 md:p-12">

                {/* Top Bar */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-white/60 text-sm font-medium tracking-wider uppercase">Morning Practice</span>
                        <span className="text-white text-2xl font-bold">Metabolic Breathing & Burn</span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Center Play Button (only if paused) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-white/30 transition-colors"
                            onClick={() => setIsPlaying(true)}
                        >
                            <Play className="w-10 h-10 text-white fill-current ml-1" />
                        </motion.div>
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="flex flex-col gap-8">
                    {/* Metrics Row */}
                    <div className="flex items-end justify-between">
                        <div className="flex gap-10">
                            {/* Heart Rate Mock */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-rose-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Heart Rate</span>
                                </div>
                                <span className="text-4xl font-black text-white tabular-nums tracking-tighter">108 <span className="text-xs font-bold text-white/40 tracking-normal">BPM</span></span>
                            </div>

                            {/* Calories Mock - The "Burn Bar" */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <Flame className="w-3 h-3 fill-current" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Metabolic Burn</span>
                                </div>
                                <span className="text-4xl font-black text-white tabular-nums tracking-tighter">142 <span className="text-xs font-bold text-white/40 tracking-normal">KCAL</span></span>
                            </div>
                        </div>

                        {/* Timer */}
                        <div className="text-6xl font-black text-white tracking-tighter tabular-nums text-right">
                            {formatTime(timeLeft)}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-12 pt-6">
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            RESTART
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 rounded-[2rem] bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                        </button>
                        <button className="text-white/40 hover:text-white transition-colors">
                            <SkipForward className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
