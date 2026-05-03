"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-card border border-border rounded-3xl overflow-hidden ${className}`}>{children}</div>
}

const posts = [
    {
        slug: "nervous-system-calm",
        category: "Systems",
        title: "The Science of Neural Calibration",
        excerpt: "Why breath synchronization before your biological protocols makes everything more effective.",
        readTime: "5 min read",
        image: "/assets/blog/cortisol.png",
    },
    {
        slug: "building-consistency",
        category: "Protocols",
        title: "Architecting Protocol Continuity",
        excerpt: "How precise daily protocols compound into structural biological transformation.",
        readTime: "3 min read",
        image: "/assets/blog/habits.png",
    },
    {
        slug: "eating-for-radiance",
        category: "Nourishment",
        title: "Eating for Radiance, Not Restriction",
        excerpt: "Gentle nutrition that supports your glow from the inside out.",
        readTime: "7 min read",
        image: "/assets/blog/nutrition.png",
    },
];
// SEO Plan:
// - /blog/nervous-system-calm -> Title: Nervous System Regulation for Metabolic Burn | GlowUp Hub
// - /blog/building-consistency -> Title: How to Build a Consistent Self-Care Routine Without Burnout
// - /blog/eating-for-radiance -> Title: Eating for Metabolic Burn: Nutrition for Weight Loss

export function BlogSection() {
    return (
        <section className="py-32 bg-background border-t border-border">
            <div className="container mx-auto px-6">

                <div className="flex md:flex-row flex-col justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                            The <span className="text-emerald-500 italic">Journal</span>
                        </h2>
                        <p className="text-white/40 text-lg font-medium">
                            The same high-fidelity science we use inside the app. Clinical insights for your metabolic evolution.
                        </p>
                    </motion.div>
                    <Link href="/blog" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 font-medium">
                        View all articles <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="group hover:border-primary/30 transition-all cursor-pointer h-full">
                                    {/* Image Container */}
                                    <div className="h-48 md:h-64 w-full relative overflow-hidden bg-primary-soft">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                                    </div>

                                    <div className="p-5 md:p-8">
                                        <div className="flex items-center justify-between mb-3 md:mb-4">
                                            <span className="text-xs font-semibold text-primary tracking-wider uppercase">{post.category}</span>
                                            <span className="text-xs text-foreground-muted">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-foreground-muted text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
