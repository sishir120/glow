"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    heading: string;
    subheading: string;
}

const testimonials = [
    {
        quote: "I optimized my metabolic flow in weeks. The precision is unmatched.",
        author: "Sarah J.",
        role: "Bio-Member",
        icon: TrendingUp,
        color: "text-emerald-500"
    },
    {
        quote: "A clinical-grade experience in my pocket. The digital twin change everything.",
        author: "Michael R.",
        role: "Systems Engineer",
        icon: ShieldCheck,
        color: "text-emerald-500"
    }
];

export function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen w-full bg-background selection:bg-primary/20 overflow-hidden relative">
            {/* Desktop Background Elements */}
            <div className="hidden lg:block absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
            <div className="hidden lg:block ambient-glow" />

            {/* Left: Content */}
            <div className="flex w-full flex-col justify-center px-6 lg:w-[45%] lg:px-12 xl:px-24 z-10 bg-background/50 backdrop-blur-sm lg:bg-transparent">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group transition-transform active:scale-95">
                    <span className="text-xl font-black uppercase tracking-tighter text-white">
                        GLOWUP<span className="text-emerald-500">HUB</span>
                    </span>
                </Link>

                <div className="mx-auto w-full max-w-sm space-y-8">
                    <div className="flex flex-col space-y-3">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold tracking-tight text-foreground leading-[1.1]"
                        >
                            {heading}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-base text-muted-foreground/80 leading-relaxed"
                        >
                            {subheading}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-premium p-1 rounded-[2rem] border-white/5 shadow-2xl"
                    >
                        <div className="bg-background/40 backdrop-blur-md rounded-[1.9rem] p-8 border border-white/5">
                            {children}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 p-4"
                    >
                        <ShieldCheck size={14} className="text-primary/60" />
                        <span>Protected by enterprise-level security</span>
                    </motion.div>
                </div>
            </div>

            {/* Right: Premium Visual / Success Carousel */}
            <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center p-12 overflow-hidden bg-secondary/30">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />

                <div className="relative z-10 w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -40, scale: 0.95 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="space-y-8"
                        >
                            <div className="glass-premium p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative">
                                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary backdrop-blur-xl border border-primary/20">
                                    {(() => {
                                        const Icon = testimonials[currentIndex].icon;
                                        return <Icon size={32} />;
                                    })()}
                                </div>

                                <blockquote className="text-2xl font-medium text-foreground leading-relaxed italic mb-8">
                                    "{testimonials[currentIndex].quote}"
                                </blockquote>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary/20">
                                        {testimonials[currentIndex].author[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-foreground text-lg">{testimonials[currentIndex].author}</span>
                                        <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">
                                            {testimonials[currentIndex].role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-500",
                                    currentIndex === i ? "w-10 bg-primary" : "w-1.5 bg-white/10 hover:bg-white/30"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-sm"
                >
                    <div className="flex items-center gap-2 text-foreground/40 font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        10,000+ Active Members
                    </div>
                    <div className="flex items-center gap-2 text-foreground/40 font-medium">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        Expert Nutritionists Live
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Utility function for conditional classNames (assuming it's not exported from elsewhere)
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
