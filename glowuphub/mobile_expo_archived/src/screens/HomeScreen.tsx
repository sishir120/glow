import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Play, Sparkles } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedProps, withDelay, withSpring, FadeInDown } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { API_URL } from '../config';
import { MOCK_USER } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { MobileStreakTracker } from '../components/MobileStreakTracker';
import { MobileFortuneCookie } from '../components/MobileFortuneCookie';
import { InteractiveLogSheet } from '../components/InteractiveLogSheet';
import { BioDigitalTwin } from '../components/BioDigitalTwin';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLogVisible, setIsLogVisible] = useState(false);
    const progress = useSharedValue(0);
    const navigation = useNavigation<any>();

    // Greeting logic
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    // Ring configuration
    const RING_SIZE = 120;
    const STROKE_WIDTH = 10;
    const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser?.email === 'guest@glowup.com') {
                setTimeout(() => {
                    setUser(MOCK_USER);
                    setLoading(false);
                    progress.value = withDelay(500, withSpring(0.85));
                }, 500);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/user`);
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                const data = await res.json();
                setUser(data);
                const score = data.glowScore || 0;
                progress.value = withDelay(500, withSpring(score / 100));
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [authUser]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    }));

    if (loading) {
        return (
            <View className="flex-1 bg-background justify-center items-center">
                <ActivityIndicator color="#10b981" size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 110 }}>

                {/* Metabolic Header */}
                <Animated.View entering={FadeInDown.delay(200)} className="mb-12">
                    <View className="flex-row justify-between items-end mb-8">
                        <View>
                            <View className="flex-row items-center gap-2 mb-1">
                                <Sparkles size={12} color="#10b981" />
                                <Text className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    {greeting}
                                </Text>
                            </View>
                            <Text className="text-foreground text-5xl font-black tracking-tight">
                                {user?.name?.split(' ')[0] || 'Member'}.
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-foreground font-black text-2xl tracking-tighter">
                                {Math.round((user?.glowScore || 85))}%
                            </Text>
                            <Text className="text-primary text-[8px] font-black uppercase tracking-[0.2em]">Current Glow</Text>
                        </View>
                    </View>

                    <BioDigitalTwin
                        hydration={85}
                        energy={user?.glowScore || 85}
                        focus={92}
                        stress={20}
                    />
                </Animated.View>

                {/* Today's Focus */}
                <Animated.View entering={FadeInDown.delay(400)} className="mb-10">
                    <Text className="text-foreground text-xl font-black mb-5 tracking-tight uppercase">Today's Focus</Text>
                    <View className="bg-secondary rounded-[2.5rem] p-8 border border-border shadow-sm">
                        <Text className="text-3xl font-black text-foreground mb-3">Gentle Movement</Text>
                        <Text className="text-foreground-muted leading-relaxed mb-8 text-sm">
                            Your body is adapting well. A quick <Text className="text-primary font-bold">Mobility stretch</Text> or a <Text className="text-foreground font-bold">walk</Text> will clear your mind.
                        </Text>

                        <TouchableOpacity
                            className="bg-primary h-16 rounded-2xl items-center justify-center shadow-lg"
                            onPress={() => setIsLogVisible(true)}
                        >
                            <Text className="text-secondary font-black uppercase tracking-widest text-sm">Start Daily Habits</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <InteractiveLogSheet
                    visible={isLogVisible}
                    onClose={() => setIsLogVisible(false)}
                    onComplete={(data) => {
                        console.log('Daily Habit Data:', data);
                        setIsLogVisible(false);
                    }}
                />

                {/* Quick Support */}
                <Text className="text-foreground text-xl font-black mb-5 tracking-tight uppercase">Quick Support</Text>
                <View className="flex-row gap-4">
                    <TouchableOpacity
                        className="flex-1 bg-secondary p-7 rounded-[2.5rem] items-center justify-center gap-4 border border-border"
                        onPress={() => navigation.navigate('Routines')}
                    >
                        <View className="w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center">
                            <Play size={28} color="#10b981" fill="#10b981" />
                        </View>
                        <Text className="font-black text-[10px] text-foreground uppercase tracking-widest">Training</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 bg-secondary p-7 rounded-[2.5rem] items-center justify-center gap-4 border border-border"
                        onPress={() => navigation.navigate('Chat')}
                    >
                        <View className="w-16 h-16 bg-lavender/10 rounded-2xl items-center justify-center">
                            <MessageCircle size={28} color="#a78bfa" />
                        </View>
                        <Text className="font-black text-[10px] text-foreground uppercase tracking-widest">Care Team</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
