"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Smartphone, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export default function MobileAccessPage() {
    // Access URLs - To be updated with final store links
    const iosUrl = "https://apps.apple.com/app/glowuphub";
    const androidUrl = "https://play.google.com/store/apps/details?id=com.glowuphub.app";

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
            {/* Cinematic Background Architecture */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[150px]" />

                {/* Structural Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #10B981 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 max-w-5xl">
                {/* Protocol Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-16 space-y-6 text-center"
                >
                    <Logo size={80} />
                    <div className="space-y-4">
                        <div className="inline-block text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500 bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
                            Protocol Initialized
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
                            Finalize <span className="text-emerald-500 italic">Symmetry Sync</span>
                        </h1>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Architectural Guidance */}
                    <div className="space-y-8 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed">
                                Your biological architecture is fully calibrated. To enter the sanctuary and begin your elite protocol, establish a connection via our native mobile node.
                            </p>

                            <div className="space-y-4">
                                <GuidelineItem text="End-to-End Biometric Encryption" />
                                <GuidelineItem text="Real-Time Metabolic Synchronization" />
                                <GuidelineItem text="Offline Capability Architecture" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                Secure Connection Active
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <Zap className="w-3 h-3 text-emerald-500" />
                                High-Fidelity Data Entry
                            </div>
                        </motion.div>
                    </div>

                    {/* Node Access Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <AccessCard
                            title="iOS System"
                            subtitle="Apple Ecosystem"
                            url={iosUrl}
                            delay={0.3}
                        />
                        <AccessCard
                            title="Android Sync"
                            subtitle="Google Ecosystem"
                            url={androidUrl}
                            delay={0.5}
                        />
                    </div>
                </div>

                {/* Technical Footnote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-24 text-center space-y-8"
                >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 max-w-2xl mx-auto leading-loose">
                        Protocol continuity requires native hardware verification. <br />
                        Web access is restricted to intake and administrative oversight only.
                    </p>
                    <div className="flex justify-center gap-8 opacity-20 filter grayscale">
                        {/* Subtle Playback/Store icons would go here if available */}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function GuidelineItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-emerald-500/80">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
            {text}
        </div>
    );
}

function AccessCard({ title, subtitle, url, delay }: { title: string, subtitle: string, url: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="p-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] flex flex-col items-center space-y-6 group hover:border-emerald-500/30 transition-all shadow-2xl hover:shadow-emerald-500/5"
        >
            <div className="p-5 bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform">
                <QRCodeSVG value={url} size={140} level="H" />
            </div>
            <div className="text-center space-y-1">
                <div className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30">{subtitle}</div>
                <div className="text-xl font-black uppercase tracking-tight">{title}</div>
            </div>
            <Button className="w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-tight text-[10px] hover:bg-emerald-500 hover:text-white transition-all">
                Connect Node
            </Button>
        </motion.div>
    );
}
