'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';

interface TimerProps {
    initialSeconds?: number; // If provided, acts as countdown. If 0/undefined, acts as stopwatch.
    onComplete?: () => void;
}

export function Timer({ initialSeconds = 0, onComplete }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const [mode] = useState<'stopwatch' | 'countdown'>(initialSeconds > 0 ? 'countdown' : 'stopwatch');

    // Sounds - only for mandatory feedback (timer complete)
    const { playTimerTick, playSuccess } = useSound();

    // For stopwatch, we track elapsed time
    const [elapsed, setElapsed] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                playTimerTick(); // Tick sound every second
                if (mode === 'countdown') {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            if (intervalRef.current) clearInterval(intervalRef.current);
                            setIsActive(false);
                            playSuccess(); // Success sound on complete
                            onComplete?.();
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    setElapsed(prev => prev + 1);
                }
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, mode, onComplete, playTimerTick, playSuccess]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'countdown') {
            setTimeLeft(initialSeconds);
        } else {
            setElapsed(0);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const displayTime = mode === 'countdown' ? formatTime(timeLeft) : formatTime(elapsed);
    const progress = mode === 'countdown'
        ? ((initialSeconds - timeLeft) / initialSeconds) * 100
        : 0; // Stopwatch doesn't have fixed progress

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto">
            {/* Timer Display */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-12 group">
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-1000 ${isActive ? 'bg-emerald-500/20 opacity-100 scale-110' : 'bg-emerald-500/5 opacity-50'}`} />

                {/* Progress Ring (Countdown Only) */}
                {mode === 'countdown' && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            strokeDasharray="301.6"
                            animate={{ strokeDashoffset: 301.6 - (301.6 * progress) / 100 }}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    </svg>
                )}

                {/* Stopwatch Ring (Simple Pulse) */}
                {mode === 'stopwatch' && (
                    <motion.div
                        animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-white/5"
                    />
                )}

                {/* Time Text */}
                <div className="z-10 font-black text-6xl text-white tracking-tighter tabular-nums drop-shadow-sm">
                    {displayTime}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
                <button
                    onClick={resetTimer}
                    className="p-5 rounded-2xl bg-white/5 text-foreground-muted hover:bg-white/10 hover:text-white transition-all border border-white/5"
                >
                    <RotateCcw size={20} />
                </button>

                <button
                    onClick={toggleTimer}
                    className="w-24 h-24 rounded-[2.5rem] bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                    {isActive ? (
                        <Pause size={32} fill="currentColor" />
                    ) : (
                        <Play size={32} fill="currentColor" className="ml-1" />
                    )}
                </button>
            </div>

            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-foreground-muted/40">
                {mode === 'countdown' ? (isActive ? 'CALIBRATING...' : 'ESTABLISH SESSION') : 'DURATION'}
            </p>
        </div>
    );
}
