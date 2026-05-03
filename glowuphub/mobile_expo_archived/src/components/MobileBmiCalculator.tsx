import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calculator, Ruler, Weight } from 'lucide-react-native';
import { BodyVisualizer } from './BodyVisualizer';

interface MobileBmiCalculatorProps {
    initialHeight?: number;
    initialWeight?: number;
}

export function MobileBmiCalculator({ initialHeight = 165, initialWeight = 60 }: MobileBmiCalculatorProps) {
    const [height, setHeight] = useState(initialHeight);
    const [weight, setWeight] = useState(initialWeight);
    const [bmi, setBmi] = useState(22);
    const [category, setCategory] = useState('Healthy');

    useEffect(() => {
        const h = height / 100;
        if (h > 0) {
            const calculatedBmi = weight / (h * h);
            setBmi(parseFloat(calculatedBmi.toFixed(1)));
        }
    }, [height, weight]);

    useEffect(() => {
        if (bmi < 18.5) setCategory('Underweight');
        else if (bmi < 25) setCategory('Healthy');
        else if (bmi < 30) setCategory('Overweight');
        else setCategory('Obese');
    }, [bmi]);

    const getCategoryColor = () => {
        if (bmi < 18.5) return '#60a5fa'; // Blue
        if (bmi < 25) return '#10b981'; // Emerald
        if (bmi < 30) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <View className="bg-secondary rounded-[2.5rem] p-8 border border-border mb-8 shadow-sm">
            <View className="flex-row items-center gap-4 mb-10">
                <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                    <Calculator size={24} color="#10b981" />
                </View>
                <View>
                    <Text className="text-foreground text-2xl font-black tracking-tight">Body Composition</Text>
                    <Text className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-1">Metabolic Baseline</Text>
                </View>
            </View>

            <View className="gap-8">
                {/* Visualizer */}
                <View className="bg-background/40 rounded-[2.5rem] p-6 border border-white/5 items-center justify-center overflow-hidden">
                    <BodyVisualizer bmi={bmi} />
                    <View className="mt-4 items-center">
                        <Text className="text-foreground text-4xl font-black tracking-tighter">{bmi}</Text>
                        <View
                            className="mt-2 px-4 py-1.5 rounded-full border"
                            style={{ borderColor: getCategoryColor() + '40', backgroundColor: getCategoryColor() + '10' }}
                        >
                            <Text className="font-black text-[10px] uppercase tracking-widest" style={{ color: getCategoryColor() }}>{category}</Text>
                        </View>
                    </View>
                </View>

                {/* Controls */}
                <View className="gap-6 bg-background/20 p-6 rounded-[2rem] border border-white/5">
                    <View>
                        <View className="flex-row items-center gap-2 mb-4">
                            <Ruler size={14} color="#10b981" opacity={0.6} />
                            <Text className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">Height Scan (CM)</Text>
                        </View>
                        <View className="flex-row items-center gap-4">
                            <View className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-primary"
                                    style={{ width: `${((height - 100) / 120) * 100}%` }}
                                />
                            </View>
                            <TextInput
                                value={height.toString()}
                                onChangeText={(v) => setHeight(Number(v) || 0)}
                                keyboardType="numeric"
                                className="w-20 bg-black/40 px-3 py-2 rounded-xl text-center font-black text-foreground border border-white/10"
                            />
                        </View>
                    </View>

                    <View>
                        <View className="flex-row items-center gap-2 mb-4">
                            <Weight size={14} color="#10b981" opacity={0.6} />
                            <Text className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em]">Weight Sensor (KG)</Text>
                        </View>
                        <View className="flex-row items-center gap-4">
                            <View className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-primary"
                                    style={{ width: `${((weight - 30) / 120) * 100}%` }}
                                />
                            </View>
                            <TextInput
                                value={weight.toString()}
                                onChangeText={(v) => setWeight(Number(v) || 0)}
                                keyboardType="numeric"
                                className="w-20 bg-black/40 px-3 py-2 rounded-xl text-center font-black text-foreground border border-white/10"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
