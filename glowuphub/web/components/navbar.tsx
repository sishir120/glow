"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Menu, X, Smartphone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "PROTOCOL", href: "/access" },
        { name: "RESOURCES", href: "/#blog" },
        { name: "PRICING", href: "/#pricing" },
        { name: "METRICS", href: "/access" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/60 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo size={32} className="group-hover:rotate-[15deg] transition-transform duration-500" />
                    <span className="text-sm font-black tracking-[0.3em] text-white uppercase">
                        GLOWUP<span className="text-emerald-500">HUB</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black tracking-[0.2em] text-foreground-muted hover:text-white transition-all transform hover:scale-105"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/login">
                        <span className="text-[10px] font-black tracking-widest text-foreground-muted hover:text-white cursor-pointer px-4">SIGN IN</span>
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[10px] bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            JOIN THE HUB
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed inset-0 top-20 bg-black z-[90] md:hidden p-8"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-4xl font-black tracking-tighter text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                                <Link href="/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full h-16 rounded-2xl font-black tracking-tighter text-lg bg-white text-black">
                                        JOIN THE HUB
                                    </Button>
                                </Link>
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full h-16 rounded-2xl font-black tracking-tighter text-lg border-white/10 text-white">
                                        SIGN IN
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
