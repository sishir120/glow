import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Utensils, Droplets, Scale, Plus, Check, Play, Sparkles, Activity as ActivityIcon } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import api from '../services/api';
import { MobileActivityProtocol, MobileProtocolStep } from '../components/MobileActivityProtocol';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MobileBmiCalculator } from '../components/MobileBmiCalculator';

const PROTOCOLS: Record<string, MobileProtocolStep[]> = {
    'walking': [
        {
            title: "Gear & Prep",
            description: "Shoes laced? Water ready? Let's check your posture.",
            image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
            tip: "Head up, shoulders relaxed, and swing your arms naturally."
        },
        {
            title: "Paced Walk",
            description: "Maintain a steady, brisk pace. Keep your breathing steady.",
            image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
            duration: 1800,
            tip: "Land on your heel and roll through to your toes."
        },
        {
            title: "Cool Down",
            description: "Slow your pace gradually. Let your heart rate settle.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
            duration: 300
        }
    ],
    'mobility': [
        {
            title: "Centering",
            description: "Find your quiet space. Roll out your mat and focus on your breath.",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800",
            duration: 180,
            tip: "Inhale deeply through your nose, exhale slowly through your mouth."
        },
        {
            title: "Main Flow",
            description: "Move mindfully. Hold each stretch for 5 deep breaths.",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800",
            duration: 900
        },
        {
            title: "Rest",
            description: "Rest deeply. Let your body absorb the movement.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
            duration: 300
        }
    ],
    'home-workout': [
        {
            title: "Warmup",
            description: "Get the blood flowing with jumping jacks and high knees.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
            duration: 300
        },
        {
            title: "Power Circuit",
            description: "Keep your core tight and maintain constant focus.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
            duration: 1200,
            tip: "Focus on form over speed."
        }
    ],
    'cycling': [
        {
            title: "Interval Ride",
            description: "Find your rhythm. Push on the intervals, rest on the recovery.",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
            duration: 1800
        }
    ]
};

export default function TrackScreen() {
    const { user } = useAuth();

    // UI State
    const [waterCount, setWaterCount] = useState(0);
    const [weight, setWeight] = useState('');
    const [calories, setCalories] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

    const logData = async (payload: any) => {
        if (!user) return;
        setLoading(true);

        try {
            const res = await api.post('/log', payload);
            console.log(`Logged successfully`, payload);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleProtocolComplete = (duration: number) => {
        const type = activeProtocol || 'activity';
        setActiveProtocol(null);
        // For now, logging activity completion is a placeholder or maps to steps
        // logData({ steps: Math.floor(duration * 1.5) }); // Example estimation
        console.log(`Completed ${type} for ${duration}s`);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <MobileActivityProtocol
                visible={!!activeProtocol}
                onClose={() => setActiveProtocol(null)}
                title={activeProtocol ? activeProtocol.charAt(0).toUpperCase() + activeProtocol.slice(1) : ''}
                steps={activeProtocol ? PROTOCOLS[activeProtocol] : []}
                onComplete={handleProtocolComplete}
            />

            <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 120 }}>
                <View className="mb-10">
                    <View className="flex-row items-center gap-2 mb-1">
                        <Sparkles size={12} color="#10b981" />
                        <Text className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Maintenance</Text>
                    </View>
                    <Text className="text-foreground text-5xl font-black">Daily Habits.</Text>
                </View>

                {/* Live Activity Section */}
                <Text className="text-foreground text-xl font-black mb-5 tracking-tight uppercase">Support My Movement</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-4 mb-10">
                    {[
                        { id: 'walking', label: 'Walk', color: '#10b981' },
                        { id: 'mobility', label: 'Stretch', color: '#34d399' },
                        { id: 'home-workout', label: 'Workout', color: '#fde68a' },
                        { id: 'cycling', label: 'Cycle', color: '#a78bfa' }
                    ].map((activity) => (
                        <TouchableOpacity
                            key={activity.id}
                            onPress={() => setActiveProtocol(activity.id)}
                            className="bg-secondary w-36 h-48 rounded-[2.5rem] items-center justify-center border border-border mr-4"
                        >
                            <View className="w-16 h-16 rounded-2xl items-center justify-center mb-5" style={{ backgroundColor: `${activity.color}15` }}>
                                <Play size={28} color={activity.color} fill={activity.color} />
                            </View>
                            <Text className="text-foreground font-black text-base">{activity.label}</Text>
                            <Text className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mt-1">Live Protocol</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Fast Logs */}
                <Text className="text-foreground text-xl font-black mb-5 tracking-tight uppercase">Quick Logs</Text>

                {/* Water Tracker */}
                <Animated.View entering={FadeInDown.delay(100)} className="bg-secondary p-8 rounded-[2.5rem] border border-border mb-8 shadow-sm">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center gap-4">
                            <View className="bg-primary/10 p-4 rounded-2xl">
                                <Droplets size={28} color="#10b981" />
                            </View>
                            <Text className="text-xl font-black text-foreground">Hydration</Text>
                        </View>
                        <Text className="text-3xl font-black text-primary">{waterCount * 250}ml</Text>
                    </View>

                    <View className="flex-row justify-between items-center bg-background rounded-[1.5rem] p-3 h-20 border border-border">
                        <TouchableOpacity
                            onPress={() => setWaterCount(Math.max(0, waterCount - 1))}
                            className="w-14 h-14 items-center justify-center bg-secondary rounded-xl border border-border"
                        >
                            <Text className="text-2xl font-black text-foreground">-</Text>
                        </TouchableOpacity>

                        <Text className="font-black text-foreground text-xs uppercase tracking-[0.2em]">{waterCount} Units</Text>

                        <TouchableOpacity
                            onPress={() => {
                                const newCount = waterCount + 1;
                                setWaterCount(newCount);
                                logData({ water: 1 });
                            }}
                            className="w-14 h-14 items-center justify-center bg-primary rounded-xl shadow-lg"
                        >
                            <Plus size={28} color="#050505" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Weight Log */}
                <Animated.View entering={FadeInDown.delay(200)} className="bg-secondary p-8 rounded-[2.5rem] border border-border mb-8 shadow-sm">
                    <View className="flex-row items-center gap-4 mb-6">
                        <View className="bg-sage/10 p-4 rounded-2xl">
                            <Scale size={28} color="#34d399" />
                        </View>
                        <Text className="text-xl font-black text-foreground">Mass Log</Text>
                    </View>

                    <View className="flex-row gap-4">
                        <View className="bg-background flex-1 h-16 rounded-[1.5rem] justify-center px-6 border border-border">
                            <TextInput
                                placeholder="0.0 kg"
                                placeholderTextColor="#717d8a"
                                keyboardType="numeric"
                                className="text-xl font-black text-foreground"
                                value={weight}
                                onChangeText={setWeight}
                            />
                        </View>
                        <TouchableOpacity
                            className="bg-primary w-16 h-16 rounded-[1.5rem] items-center justify-center shadow-lg"
                            onPress={() => logData({ weight: parseFloat(weight) })}
                            disabled={loading || !weight}
                        >
                            {loading ? <ActivityIcon size={28} color="#050505" className="animate-spin" /> : <Check size={28} color="#050505" />}
                        </TouchableOpacity>
                    </View>
                    <Text className="text-foreground-muted text-[10px] font-bold uppercase tracking-widest mt-5 px-2">Clinical Precision Log</Text>
                </Animated.View>

                {/* Nutrition Log */}
                <Animated.View entering={FadeInDown.delay(300)} className="bg-secondary p-8 rounded-[2.5rem] border border-border mb-10 shadow-sm">
                    <View className="flex-row items-center gap-4 mb-6">
                        <View className="bg-sand/10 p-4 rounded-2xl">
                            <Utensils size={28} color="#fde68a" />
                        </View>
                        <Text className="text-xl font-black text-foreground">Metabolic Load</Text>
                    </View>

                    <View className="flex-row gap-4">
                        <View className="bg-background flex-1 h-16 rounded-[1.5rem] justify-center px-6 border border-border">
                            <TextInput
                                placeholder="e.g. 500 kcal"
                                placeholderTextColor="#717d8a"
                                keyboardType="numeric"
                                className="text-xl font-black text-foreground"
                                value={calories}
                                onChangeText={setCalories}
                            />
                        </View>
                        <TouchableOpacity
                            className="bg-primary w-16 h-16 rounded-[1.5rem] items-center justify-center shadow-lg"
                            onPress={() => {
                                logData({ calories: parseInt(calories) });
                                setCalories('');
                            }}
                            disabled={loading || !calories}
                        >
                            {loading ? <ActivityIcon size={28} color="#050505" className="animate-spin" /> : <Plus size={28} color="#050505" />}
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Body Composition */}
                <Animated.View entering={FadeInDown.delay(400)}>
                    <Text className="text-foreground text-xl font-black mb-5 tracking-tight uppercase px-2">Bio-Composition</Text>
                    <MobileBmiCalculator initialHeight={175} initialWeight={70} />
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
