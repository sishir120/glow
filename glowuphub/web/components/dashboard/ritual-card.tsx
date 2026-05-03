"use client";

interface RitualCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    stats: { label: string; value: string }[];
}

export function RitualCard({ title, desc, icon, stats }: RitualCardProps) {
    return (
        <div className="glass-premium rounded-[2.5rem] p-8 border border-white/5 hover:border-emerald-500/20 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                {icon}
            </div>
            <h4 className="text-lg font-bold mb-3">{title}</h4>
            <p className="text-xs text-foreground-muted leading-relaxed mb-6">{desc}</p>
            <div className="pt-6 border-t border-white/5 flex gap-6">
                {stats.map((s) => (
                    <div key={s.label}>
                        <p className="text-[9px] font-black uppercase tracking-widest text-foreground-muted opacity-40 mb-1">{s.label}</p>
                        <p className="text-sm font-bold tracking-tight">{s.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
