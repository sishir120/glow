import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    FadeIn,
    ZoomIn
} from 'react-native-reanimated';
import { Sparkles, Cookie } from 'lucide-react-native';

const MOTIVATIONS = [
    "Consistency is the companion of success.",
    "Your future self will thank you for today.",
    "Small steps lead to big transformations.",
    "Energy flows where intention goes.",
    "Strength grows in the moments you think you can't go on.",
];

export function MobileFortuneCookie() {
    const [isCracked, setIsCracked] = useState(false);
    const [message, setMessage] = useState('');
    const shake = useSharedValue(0);
    const crackScale = useSharedValue(1);

    const handleCrack = () => {
        if (isCracked) return;

        // Shake animation
        shake.value = withSequence(
            withTiming(-5, { duration: 50 }),
            withTiming(5, { duration: 50 }),
            withTiming(-5, { duration: 50 }),
            withTiming(0, { duration: 50 })
        );

        // Crack effect after a short delay
        setTimeout(() => {
            setMessage(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
            setIsCracked(true);
            crackScale.value = withSpring(1.1);
        }, 200);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: shake.value },
            { scale: crackScale.value }
        ]
    }));

    return (
        <View className="bg-secondary p-8 rounded-[2.5rem] border border-border mb-8 shadow-sm">
            <View className="flex-row items-center gap-3 mb-8">
                <Sparkles size={16} color="#10b981" />
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Daily Bio-Oracle</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCrack}
                className="items-center justify-center py-4"
            >
                <Animated.View style={animatedStyle}>
                    {!isCracked ? (
                        <View className="w-28 h-28 bg-background rounded-full items-center justify-center border border-border shadow-inner">
                            <Cookie size={54} color="#10b981" strokeWidth={1} />
                        </View>
                    ) : (
                        <Animated.View entering={ZoomIn} className="items-center gap-6 px-4">
                            <View className="flex-row gap-4">
                                <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center overflow-hidden border border-primary/30">
                                    <Cookie size={36} color="#10b981" style={{ transform: [{ translateX: -12 }] }} />
                                </View>
                                <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center overflow-hidden border border-primary/30">
                                    <Cookie size={36} color="#10b981" style={{ transform: [{ translateX: 12 }] }} />
                                </View>
                            </View>
                            <Animated.View entering={FadeIn.delay(300)}>
                                <Text className="text-center text-foreground font-black text-lg italic leading-relaxed tracking-tight">
                                    "{message}"
                                </Text>
                            </Animated.View>
                        </Animated.View>
                    )}
                </Animated.View>

                {!isCracked && (
                    <Text className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-8">Decipher Protocol</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
