"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Smartphone, ShieldCheck, Download, Apple, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export default function DownloadPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sage">GlowUp Hub</span>
                        </h1>
                        <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-12">
                            Experience the full native performance. Currently available via direct download for Android. App Store coming soon.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-16 text-sm font-medium text-emerald-500 bg-emerald-500/10 py-2 px-4 rounded-full inline-flex mx-auto border border-emerald-500/20">
                            <ShieldCheck className="w-4 h-4" />
                            Official Public Beta • v1.0.0
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
                        {/* Android Native - AVAILABLE */}
                        <FadeIn delay={0.1}>
                            <div id="android" className="bg-card border-2 border-emerald-500/50 p-8 rounded-3xl h-full relative overflow-hidden group hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all flex flex-col">
                                <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-black rounded-full text-[10px] font-bold tracking-wider uppercase">
                                    Available Now
                                </div>
                                <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
                                    <Smartphone size={180} />
                                </div>

                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                                    </div>
                                    Android
                                </h2>
                                <p className="text-emerald-500 text-sm font-bold mb-6 pl-1">Direct APK Download</p>

                                <div className="space-y-4 mb-8 flex-1">
                                    <p className="text-foreground-muted text-sm leading-relaxed">
                                        Get the full native experience immediately. Bypasses the Play Store for instant updates and zero restrictions.
                                    </p>
                                    <ul className="text-sm space-y-2 opacity-80">
                                        <li className="flex gap-2"><Sparkles className="w-4 h-4 text-emerald-500" /> Unlocked Features</li>
                                        <li className="flex gap-2"><Sparkles className="w-4 h-4 text-emerald-500" /> Highest Performance</li>
                                        <li className="flex gap-2"><Sparkles className="w-4 h-4 text-emerald-500" /> Offline Support</li>
                                    </ul>
                                </div>

                                <Button className="w-full h-14 rounded-xl gap-2 text-lg bg-emerald-500 text-black hover:bg-emerald-400 font-bold" asChild>
                                    <a href="/api/download/android">
                                        <Download size={20} />
                                        Download App
                                    </a>
                                </Button>
                            </div>
                        </FadeIn>

                        {/* iOS - COMING SOON */}
                        <FadeIn delay={0.2}>
                            <div id="ios" className="bg-card/50 border border-white/5 p-8 rounded-3xl h-full relative overflow-hidden flex flex-col opacity-80 hover:opacity-100 transition-opacity">
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 text-foreground-muted rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10">
                                    Coming Soon
                                </div>
                                <div className="absolute -right-6 -bottom-6 opacity-[0.03] rotate-12">
                                    <Apple size={180} />
                                </div>

                                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-foreground">
                                        <Apple size={24} />
                                    </div>
                                    iOS
                                </h2>
                                <p className="text-foreground-muted text-sm font-bold mb-6 pl-1">App Store & TestFlight</p>

                                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-8">
                                    <p className="text-foreground-muted max-w-xs">
                                        We are currently in private beta review with Apple.
                                    </p>
                                    <div className="text-xs p-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 max-w-xs">
                                        Tip: You can still use the <strong>Web PWA</strong> below on your iPhone today!
                                    </div>
                                </div>

                                <Button disabled className="w-full h-14 rounded-xl gap-2 text-lg bg-white/5 text-foreground-muted border border-white/5 cursor-not-allowed">
                                    Join Waitlist
                                </Button>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Secondary PWA Section */}
                    <FadeIn delay={0.3}>
                        <div className="mt-20 pt-12 border-t border-border max-w-2xl mx-auto text-center">
                            <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-500" />
                                Instant Web Access
                            </h3>
                            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                                Can't install the app right now? You can still use the <strong>Universal Web App</strong>.
                                It works in your browser on any device.
                            </p>
                            <Link href="/dashboard">
                                <Button variant="outline" className="rounded-full px-8">
                                    Launch Web Dashboard
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}
