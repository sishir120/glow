import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, RadialGradient, Stop, Mask, Rect, Circle } from 'react-native-svg';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    withSequence,
    interpolate,
    useAnimatedProps
} from 'react-native-reanimated';
import { Droplets, Flame, Brain, Zap } from 'lucide-react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BioDigitalTwinProps {
    hydration?: number;
    energy?: number;
    focus?: number;
    stress?: number;
}

export function BioDigitalTwin({
    hydration = 85,
    energy = 70,
    focus = 92,
    stress = 15
}: BioDigitalTwinProps) {
    const breathingValue = useSharedValue(0);

    useEffect(() => {
        breathingValue.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 3000 }),
                withTiming(0, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const breatheStyle = useAnimatedStyle(() => ({
        opacity: interpolate(breathingValue.value, [0, 1], [0.3, 0.7]),
        transform: [{ scale: interpolate(breathingValue.value, [0, 1], [0.95, 1.1]) }],
    }));

    // SVG silhouette path from web
    const silhouettePath = "M50 10 C55 10 58 15 58 20 C58 25 55 30 50 30 C45 30 42 25 42 20 C42 15 45 10 50 10 M42 32 L58 32 L65 50 L62 90 L55 90 L55 130 L60 180 L50 180 L40 180 L45 130 L45 90 L38 90 L35 50 Z";

    return (
        <View className="bg-secondary rounded-[2.5rem] p-6 border border-border overflow-hidden relative">
            {/* Header */}
            <View className="flex-row justify-between items-start mb-8">
                <View>
                    <Text className="text-foreground text-xl font-black">Biological Synthesis</Text>
                    <Text className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mt-1">Real-time Homeostasis</Text>
                </View>
                <View className="flex-row gap-1">
                    {[1, 2, 3].map(i => (
                        <View key={i} className="w-1 h-4 bg-primary/20 rounded-full" />
                    ))}
                </View>
            </View>

            <View className="items-center justify-center h-80 relative">
                {/* Background Glow */}
                <Animated.View
                    style={[breatheStyle]}
                    className="absolute w-48 h-48 bg-primary/10 rounded-full blur-3xl"
                />

                <Svg viewBox="0 0 100 200" height="300" width="150">
                    <Defs>
                        <RadialGradient id="core-grad" cx="50" cy="50" rx="50" ry="50" gradientUnits="userSpaceOnUse">
                            <Stop offset="0" stopColor="#10b981" />
                            <Stop offset="1" stopColor="transparent" />
                        </RadialGradient>
                        <Mask id="human-mask">
                            <Path d={silhouettePath} fill="white" />
                        </Mask>
                    </Defs>

                    {/* Phantom Silhouette */}
                    <Path
                        d={silhouettePath}
                        fill="rgba(255,255,255,0.02)"
                        stroke="rgba(16,185,129,0.2)"
                        strokeWidth="0.5"
                    />

                    {/* Energy Nodes */}
                    <Circle cx="50" cy="20" r="3" fill="#10b981" opacity="0.6" />
                    <Circle cx="50" cy="70" r="10" fill="url(#core-grad)" opacity="0.4" />

                    {/* Energy Channels */}
                    <Path
                        d="M50 40 L50 80 M45 50 L35 60 M55 50 L65 60"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity="0.4"
                    />
                </Svg>

                {/* Data Labels */}
                <View className="absolute top-10 -left-10 items-end">
                    <Text className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Oxygen</Text>
                    <View className="w-16 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <View className="h-full bg-primary w-[94%]" />
                    </View>
                </View>

                <View className="absolute bottom-20 -right-10 items-start">
                    <Text className="text-[10px] font-black uppercase tracking-widest text-[#a78bfa] mb-1">Mobility</Text>
                    <View className="w-16 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <View className="h-full bg-[#a78bfa] w-[82%]" />
                    </View>
                </View>
            </View>

            {/* Indicator Grid */}
            <View className="flex-row flex-wrap gap-2 mt-4">
                <TwinIndicator icon={<Droplets size={14} color="#10b981" />} label="Hydration" value={hydration} />
                <TwinIndicator icon={<Zap size={14} color="#f59e0b" />} label="Energy" value={energy} />
                <TwinIndicator icon={<Brain size={14} color="#a78bfa" />} label="Cognitive" value={focus} />
                <TwinIndicator icon={<Flame size={14} color="#f472b6" />} label="Metabolic" value={100 - stress} />
            </View>
        </View>
    );
}

function TwinIndicator({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <View className="flex-1 min-w-[48%] bg-background/50 p-4 rounded-3xl border border-white/5 flex-row items-center gap-4">
            <View className="bg-white/5 p-3 rounded-2xl items-center justify-center">
                {icon}
            </View>
            <View>
                <Text className="text-[8px] font-black text-foreground-muted uppercase tracking-widest mb-1">{label}</Text>
                <Text className="text-sm font-black text-foreground">{value}%</Text>
            </View>
        </View>
    );
}
