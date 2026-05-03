import React from 'react';
import { View, Text } from 'react-native';
import { Flame } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface MobileStreakTrackerProps {
    count?: number;
}

export function MobileStreakTracker({ count = 5 }: MobileStreakTrackerProps) {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentDayIndex = 4; // Friday for demo

    return (
        <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-secondary p-8 rounded-[2.5rem] border border-border mb-8 shadow-sm"
        >
            <View className="flex-row items-center justify-between mb-8">
                <View className="flex-row items-center gap-4">
                    <View className="bg-primary/10 p-4 rounded-2xl">
                        <Flame size={28} color="#10b981" fill="#10b981" />
                    </View>
                    <View>
                        <Text className="text-foreground text-2xl font-black">{count} Day Surge</Text>
                        <Text className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-1">Metabolic Momentum</Text>
                    </View>
                </View>
            </View>

            <View className="flex-row justify-between items-center px-1">
                {days.map((day, i) => {
                    const isCompleted = i <= currentDayIndex;
                    const isToday = i === currentDayIndex;

                    return (
                        <View key={i} className="items-center gap-3">
                            <View
                                className={`w-12 h-12 rounded-2xl items-center justify-center border ${isToday ? 'bg-primary border-primary shadow-lg scale-110' :
                                    isCompleted ? 'bg-primary/20 border-primary/30' :
                                        'bg-background border-border'
                                    }`}
                            >
                                <Text
                                    className={`text-xs font-black ${isToday ? 'text-[#050505]' :
                                        isCompleted ? 'text-primary' :
                                            'text-foreground/30'
                                        }`}
                                >
                                    {day}
                                </Text>
                            </View>
                            {isToday && (
                                <View className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />
                            )}
                        </View>
                    );
                })}
            </View>
        </Animated.View>
    );
}
