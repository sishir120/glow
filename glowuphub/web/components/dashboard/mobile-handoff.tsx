"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { StoreBadges } from "@/components/ui/store-badges";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Smartphone, Target, QrCode } from "lucide-react";
import { useState, useEffect } from "react";

export function MobileHandoff() {
    const [downloadUrl, setDownloadUrl] = useState("");

    useEffect(() => {
        setDownloadUrl(window.location.origin + "/download");
    }, []);

    return (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
            {/* Left side: QR Code Experience */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-premium rounded-3xl lg:rounded-[3rem] p-6 lg:p-10 border border-emerald-500/10 flex flex-col items-center text-center justify-center relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-emerald-500/5 opacity-50 blur-3xl -z-10" />

                <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-white rounded-2xl lg:rounded-[2rem] shadow-2xl shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-500">
                    <QRCodeSVG
                        value={downloadUrl || "https://glowuphub.vercel.app/download"}
                        size={160}
                        className="lg:w-[200px] lg:h-[200px]"
                        bgColor={"#ffffff"}
                        fgColor={"#050505"}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>

                <div className="space-y-3 lg:space-y-4 max-w-xs">
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight">Sync to Mobile</h3>
                    <p className="text-xs lg:text-sm text-foreground-muted leading-relaxed">
                        The full experience is on mobile. Scan this code to <span className="text-emerald-500 font-bold">Install the Hub</span> instantly.
                    </p>
                </div>

                <div className="mt-6 lg:mt-8 flex items-center gap-2 lg:gap-3 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-emerald-500/60">
                    <QrCode className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    Official Download Link
                </div>
            </motion.div>

            {/* Right side: App Details & Stores */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-premium rounded-3xl lg:rounded-[3rem] p-6 lg:p-10 border border-white/5 flex flex-col justify-between"
            >
                <div className="space-y-6 lg:space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] lg:text-[10px] font-black text-emerald-500 uppercase tracking-widest w-fit">
                        Mobile Biological Sanctuary
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter leading-none">
                        Take Your Biology <br />
                        <span className="text-emerald-500">Everywhere.</span>
                    </h2>

                    <div className="space-y-5 lg:space-y-6 text-left">
                        {[
                            { icon: <Target className="w-4 h-4 lg:w-5 lg:h-5" />, title: "Live Metabolic Tracking", desc: "Log hydration and weight with zero friction." },
                            { icon: <Smartphone className="w-4 h-4 lg:w-5 lg:h-5" />, title: "Instant Notification", desc: "Receive gentle rituals reminders directly." },
                            { icon: <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5" />, title: "Full Privacy Control", desc: "Your health data, decentralized and local." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500 flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[13px] lg:text-sm">{item.title}</h4>
                                    <p className="text-[11px] lg:text-xs text-foreground-muted">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 lg:pt-10 border-t border-white/5 mt-8 lg:mt-auto">
                    <p className="text-[10px] font-bold text-foreground-muted uppercase tracking-widest mb-4 lg:mb-6">Official Applications</p>
                    <StoreBadges className="scale-100 lg:scale-110 origin-left" />
                </div>
            </motion.div>
        </div>
    );
}
