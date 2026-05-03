"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Play, Sparkles, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WalkthroughPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4">
                            <Sparkles className="w-4 h-4" />
                            Official Guide
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                            GlowUp Hub: <span className="text-primary italic">The Walkthrough</span>
                        </h1>

                        <div className="aspect-video bg-card rounded-[2rem] border border-border overflow-hidden relative group mb-12 shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-10">
                                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl scale-110">
                                    <Play className="w-8 h-8 fill-current" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
                            <div className="absolute bottom-6 left-6 z-20">
                                <p className="text-white font-bold text-xl">Watch the 2-minute tour</p>
                                <p className="text-white/70">Everything you need to know to get started.</p>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-12">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">Reseting Your Metabolism</h2>
                                <p className="text-foreground-muted text-lg leading-relaxed">
                                    GlowUp Hub isn't just another calorie counter. It's a biology-first metabolic reset engine. We focus on healing your relationship with food through science-backed practices, not starvation.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 pt-4">
                                    {[
                                        "No Calorie Counting",
                                        "Focus on Micronutrients",
                                        "Hormonal Balance",
                                        "Sustainable Habit Formation"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-card/50 p-4 rounded-xl border border-border">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h2 className="text-3xl font-bold">The Three Pillars</h2>
                                <div className="space-y-8">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <Heart className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">1. Eat to Satiety</h3>
                                            <p className="text-foreground-muted">Learn to listen to your body's hunger signals. Our clinical approach ensures you feel full while your body shifts into fat-burning mode.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                            <Sparkles className="w-8 h-8 text-cyan-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">2. Your Glow Rings</h3>
                                            <p className="text-foreground-muted">Track more than just metrics. Track your vitality, mood, and consistency through our signature intuitive interface.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20 text-center">
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to start your journey?</h2>
                            <p className="text-foreground-muted text-lg mb-10 max-w-xl mx-auto">
                                Join 10,000+ women who have already proofs that biology beats willpower every time.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="rounded-full h-14 px-10 font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                                        Start My Reset (Free)
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/#pricing">
                                    <Button size="lg" variant="outline" className="rounded-full h-14 px-10">
                                        View Pricing Plans
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </main>
    );
}
