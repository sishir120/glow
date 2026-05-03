"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export function TargetingSection() {
    return (
        <section className="py-24 bg-background-muted border-y border-border">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                            <span className="text-primary">Is This For You?</span>
                        </h3>
                        <div className="space-y-6">
                            {[
                                "You feel tired despite sleeping 8 hours.",
                                "You have PCOS, Thyroid issues, or Peri-menopause.",
                                "You've tried every diet but the weight always returns.",
                                "You're tired of counting every single almond.",
                                "You want a professional roadmap, not a generic plan."
                            ].map((text, i) => (
                                <div key={i} className="flex gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                    <p className="text-lg text-foreground-muted leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                            <span className="text-foreground-muted">Not For You If...</span>
                        </h3>
                        <div className="space-y-6">
                            {[
                                "You're looking for a 3-day 'magic' detox.",
                                "You want a meal plan with zero taste or variety.",
                                "You prefer high-intensity punishment workouts.",
                                "You aren't ready to build daily consistent habits.",
                                "You're looking for a medical diagnosis or treatment."
                            ].map((text, i) => (
                                <div key={i} className="flex gap-4 opacity-60">
                                    <XCircle className="w-6 h-6 text-foreground-muted shrink-0" />
                                    <p className="text-lg text-foreground-muted leading-relaxed italic">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
