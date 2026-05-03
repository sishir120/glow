"use client";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Instagram, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-6">

                <div className="grid lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Logo size={40} className="group-hover:scale-105 transition-transform" />
                            <span className="text-xl font-black uppercase tracking-tighter text-white">
                                GLOWUP<span className="text-emerald-500">HUB</span>
                            </span>
                        </Link>
                        <p className="text-foreground-muted text-sm leading-relaxed font-medium">
                            Clinical-grade biological frameworks designed for homeostatic mastery. Your path to metabolic flexibility and self-trust.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/glowuphub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all border border-white/5">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-foreground-muted">
                            <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing & Plans</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-primary transition-colors">Journeys</Link></li>
                            <li><Link href="/access" className="hover:text-primary transition-colors">Download App</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-foreground-muted">
                            <li><Link href="/#philosophy" className="hover:text-primary transition-colors">Our Philosophy</Link></li>
                            <li><Link href="/#testimonials" className="hover:text-primary transition-colors">Community</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Journal</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8 opacity-40">Protocol Journal</h4>
                        <p className="text-foreground-muted text-sm mb-6 leading-relaxed font-medium">One clinical-grade metabolic insight, weekly. No noise.</p>
                        <div className="flex flex-col gap-3">
                            <Input
                                placeholder="Enter system email"
                                className="bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-emerald-500 h-12"
                            />
                            <Button className="rounded-xl bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] h-12 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-foreground-muted">
                    <p>© 2024 GlowUp Hub. Made with care for your journey.</p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
