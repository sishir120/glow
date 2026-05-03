'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, User, Heart, Share2 } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export default function EatingForRadiancePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <img
                    src="/assets/blog/nutrition.png"
                    alt="Eating for Radiance"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <Link
                        href="/#blog"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Journal
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 -mt-32 relative z-10">
                <FadeIn>
                    <div className="max-w-3xl mx-auto">
                        <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                            Nourishment
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                            Eating for Metabolic Burn, Not Restriction
                        </h1>

                        <div className="flex items-center gap-6 text-foreground-muted text-sm mb-10">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                7 min read
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                GlowUp Team
                            </div>
                        </div>

                        {/* Article Body */}
                        <article className="prose prose-invert prose-lg max-w-none">
                            <p className="lead text-xl text-foreground/90 leading-relaxed">
                                Gentle nutrition that supports your burn from the inside out.
                                Because restriction never built a metabolism.
                            </p>

                            <h2>The Problem with "Clean Eating"</h2>
                            <p>
                                Somewhere along the way, we started treating food like the enemy. Good foods.
                                Bad foods. Cheat days. Guilt spirals. This isn't health — it's anxiety
                                dressed up as wellness.
                            </p>
                            <p>
                                Real vitality doesn't come from punishment. It comes from nourishment. And
                                that's a completely different relationship with food.
                            </p>

                            <h2>Skin-Loving Foods</h2>
                            <p>
                                Instead of focusing on what to avoid, let's talk about what to embrace.
                                These foods genuinely support your metabolism from within:
                            </p>
                            <ul>
                                <li><strong>Omega-3 fatty acids</strong> — Found in salmon, walnuts, and chia seeds. They reduce inflammation and support fat oxidation.</li>
                                <li><strong>Vitamin C</strong> — Citrus fruits, bell peppers, and berries. Essential for adrenal health and fat burn.</li>
                                <li><strong>Zinc</strong> — Pumpkin seeds, chickpeas, and lentils. Helps with thyroid function and metabolic rate.</li>
                                <li><strong>Vitamin E</strong> — Almonds, sunflower seeds, and avocados. Protects against oxidative metabolic damage.</li>
                                <li><strong>Trace Electrolytes</strong> — Cucumber, watermelon, and celery. Cellular hydration from the inside.</li>
                            </ul>

                            <h2>The 80/20 Principle</h2>
                            <p>
                                Here's a more sustainable approach: eat nourishing foods about 80% of the time,
                                and leave room for joy the other 20%. That chocolate croissant on Sunday morning?
                                It's feeding your soul, and that matters too.
                            </p>
                            <p>
                                Stress from food guilt is actually worse for your weight loss than the "bad" food itself.
                                Cortisol from chronic stress prevents fat oxidation faster than sugar ever could.
                            </p>

                            <h2>Hydration Is Queen</h2>
                            <p>
                                before worrying about supplements or superfoods, ask yourself: am I drinking
                                enough water? Dehydration shows up immediately in your energy and metabolic speed — sluggishness,
                                bloating, and a slowed digestion.
                            </p>
                            <p>
                                Aim for about 8 glasses a day, more if you're active. Add lemon, cucumber,
                                or mint to make it enjoyable. Herbal teas count too.
                            </p>

                            <blockquote className="border-l-4 border-primary pl-6 italic text-foreground/80">
                                "The most metabolically healthy people I know aren't the ones with the strictest diets —
                                they're the ones who genuinely enjoy their food."
                            </blockquote>

                            <h2>Gut Health Is Metabolic Health</h2>
                            <p>
                                There's a direct connection between your gut and your metabolism, called the
                                gut-metabolism axis. An imbalanced gut microbiome often shows up as:
                            </p>
                            <ul>
                                <li>Bloating and fatigue</li>
                                <li>Insulin resistance spikes</li>
                                <li>Stubborn fat retention</li>
                                <li>General metabolic inflammation</li>
                            </ul>
                            <p>
                                Supporting your gut with fermented foods (yogurt, kimchi, sauerkraut) and
                                fiber-rich vegetables can transform your metabolic health over time.
                            </p>

                            <h2>Your Practice</h2>
                            <p>
                                This week, try adding one metabolic-boosting food to each day. Don't take anything
                                away — just add. Notice how it feels to approach food as medicine for your
                                burn rather than a source of rules.
                            </p>
                        </article>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                            <button className="flex items-center gap-2 text-foreground-muted hover:text-primary transition">
                                <Heart className="w-5 h-5" />
                                Save for later
                            </button>
                            <button className="flex items-center gap-2 text-foreground-muted hover:text-primary transition">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                        </div>

                        {/* Related */}
                        <div className="mt-16 mb-20">
                            <h3 className="text-xl font-bold text-foreground mb-6">Continue Reading</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Link
                                    href="/blog/nervous-system-calm"
                                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition group"
                                >
                                    <span className="text-xs text-primary font-semibold uppercase">Wellness</span>
                                    <h4 className="text-lg font-bold text-foreground mt-2 group-hover:text-primary transition">
                                        The Science of Nervous System Calm
                                    </h4>
                                </Link>
                                <Link
                                    href="/blog/building-consistency"
                                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition group"
                                >
                                    <span className="text-xs text-primary font-semibold uppercase">Practices</span>
                                    <h4 className="text-lg font-bold text-foreground mt-2 group-hover:text-primary transition">
                                        Building Consistency with Compassion
                                    </h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
