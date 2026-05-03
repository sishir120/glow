"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { format, subDays } from "date-fns";

// Generate mock history relative to a current weight
const generateData = (currentWeight: number | null | undefined) => {
    // Ensure we have a valid number to start with
    const baseWeight = typeof currentWeight === 'number' && !isNaN(currentWeight) ? currentWeight : 60;

    return Array.from({ length: 30 }).map((_, i) => {
        const date = subDays(new Date(), 29 - i);
        const diff = (29 - i) * 0.05;
        const fluctuation = Math.sin(i * 0.8) * 0.4 + (Math.random() * 0.2 - 0.1);

        let val = baseWeight + diff + fluctuation;

        if (i === 29) val = baseWeight;

        return {
            date: date.toISOString(),
            value: typeof val === 'number' && !isNaN(val) ? Number(val.toFixed(1)) : baseWeight,
        };
    });
};


interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length && label) {
        return (
            <div className="bg-[#09090B]/90 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-2xl" role="tooltip">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{format(new Date(label), "MMM d")}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-500 tabular-nums tracking-tighter">
                        {typeof payload[0].value === 'number' ? payload[0].value.toFixed(1) : '0.0'}
                    </span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">KG</span>
                </div>
            </div>
        );
    }
    return null;
};

interface WeightChartProps {
    currentWeight?: number;
}

export function WeightChart({ currentWeight = 60 }: WeightChartProps) {
    const data = generateData(currentWeight);

    return (
        <div className="w-full h-[350px] relative group">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="date"
                        tickFormatter={(str) => format(new Date(str), "d")}
                        stroke="rgba(255,255,255,0.1)"
                        fontSize={10}
                        fontWeight={900}
                        tickLine={false}
                        axisLine={false}
                        dy={15}
                        interval={6}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.1)"
                        fontSize={10}
                        fontWeight={900}
                        tickLine={false}
                        axisLine={false}
                        domain={['dataMin - 1', 'dataMax + 1']}
                        dx={-10}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#10B981', strokeWidth: 1.5, strokeDasharray: '4 4', opacity: 0.3 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={4}
                        fill="url(#colorWeight)"
                        animationDuration={2000}
                        animationEasing="ease-in-out"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Matrix Status Indicator */}
            <div className="absolute top-0 right-0 flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">System Synced</span>
                </div>
            </div>
        </div>
    );
}
