import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { X, ChevronRight, ChevronLeft, Pause, Play, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export interface MobileProtocolStep {
    title: string;
    description: string;
    image: string;
    duration?: number;
    tip?: string;
}

interface MobileActivityProtocolProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    steps: MobileProtocolStep[];
    onComplete: (duration: number) => void;
}

export function MobileActivityProtocol({ visible, onClose, title, steps, onComplete }: MobileActivityProtocolProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(steps[0]?.duration || 0);
    const [isPaused, setIsPaused] = useState(false);
    const [totalActiveTime, setTotalActiveTime] = useState(0);

    useEffect(() => {
        if (!visible) return;
        if (steps[currentStep]?.duration) {
            setTimeLeft(steps[currentStep].duration!);
        }
    }, [currentStep, visible, steps]);

    useEffect(() => {
        if (!visible || isPaused || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            setTotalActiveTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [visible, isPaused, timeLeft]);

    const step = steps[currentStep];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(Math.floor(totalActiveTime / 60));
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!visible) return null;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
            <View className="flex-1 bg-background">
                {/* Immersive Background Image */}
                <Animated.View key={step.image} entering={FadeIn} exiting={FadeOut} className="absolute inset-0">
                    <Image
                        source={{ uri: step.image }}
                        style={{ width, height }}
                        className="opacity-60"
                        resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/40" />
                </Animated.View>

                <SafeAreaView className="flex-1">
                    {/* Header */}
                    <View className="flex-row justify-between items-center px-6 py-4">
                        <View className="flex-row items-center gap-2">
                            <Sparkles size={16} color="#10b981" />
                            <Text className="text-white font-black text-[10px] uppercase tracking-widest">{title} Protocol</Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-black/40 p-2 rounded-full border border-white/10"
                        >
                            <X size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View className="flex-1 justify-end px-8 pb-12">
                        <Animated.View
                            key={currentStep}
                            entering={SlideInRight}
                            exiting={SlideOutLeft}
                            className="space-y-6"
                        >
                            <View>
                                <Text className="text-white text-4xl font-black tracking-tight mb-2">{step.title}</Text>
                                <Text className="text-white/80 text-lg leading-relaxed">{step.description}</Text>
                            </View>

                            {step.tip && (
                                <View className="bg-primary/10 p-5 rounded-[2rem] border border-primary/20">
                                    <Text className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Expert Bio-Tip</Text>
                                    <Text className="text-white/90 italic text-sm leading-relaxed">"{step.tip}"</Text>
                                </View>
                            )}

                            {/* Timer */}
                            {step.duration && (
                                <View className="flex-row items-center gap-4 bg-black/60 p-6 rounded-[2.5rem] border border-white/10 self-start">
                                    <View>
                                        <Text className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Time Remaining</Text>
                                        <Text className="text-white text-4xl font-black">{formatTime(timeLeft)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setIsPaused(!isPaused)}
                                        className="bg-primary w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
                                    >
                                        {isPaused ? <Play size={28} color="#050505" fill="#050505" /> : <Pause size={28} color="#050505" fill="#050505" />}
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Navigation */}
                            <View className="flex-row gap-4 pt-8">
                                {currentStep > 0 && (
                                    <TouchableOpacity
                                        onPress={handleBack}
                                        className="h-20 px-8 bg-white/5 rounded-[1.5rem] items-center justify-center border border-white/10"
                                    >
                                        <ChevronLeft size={28} color="white" />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={handleNext}
                                    className="flex-1 h-20 bg-primary rounded-[1.5rem] items-center justify-center shadow-2xl flex-row"
                                >
                                    <Text className="text-[#050505] font-black uppercase tracking-[0.2em] text-sm">
                                        {currentStep === steps.length - 1 ? "Protocol Complete" : "Next Protocol Step"}
                                    </Text>
                                    <ChevronRight size={20} color="#050505" className="ml-2" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>

                    {/* Step Progress Bar */}
                    <View className="absolute bottom-0 left-0 right-0 h-2 bg-white/5">
                        <Animated.View
                            className="h-full bg-primary"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
}
