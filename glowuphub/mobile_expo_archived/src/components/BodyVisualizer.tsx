import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { useAnimatedProps, withSpring } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BodyVisualizerProps {
    bmi: number;
    gender?: 'female' | 'male';
}

const { width } = Dimensions.get('window');

export function BodyVisualizer({ bmi, gender = 'female' }: BodyVisualizerProps) {
    // Paths simplified for React Native (removed whitespace/multiline for reliability)
    const pathUnderweight = 'M 100 30 C 108 30, 112 35, 112 45 C 112 52, 110 58, 105 60 L 125 65 L 135 150 L 138 210 L 132 215 L 130 155 C 128 140, 125 100, 122 100 L 122 150 C 122 170, 125 250, 120 300 L 115 390 L 105 390 L 108 280 L 100 220 L 92 280 L 95 390 L 85 390 L 80 300 C 75 250, 78 170, 78 150 L 78 100 C 75 100, 72 140, 70 155 L 68 215 L 62 210 L 65 150 L 75 65 L 95 60 C 90 58, 88 52, 88 45 C 88 35, 92 30, 100 30 Z';
    const pathHealthy = 'M 100 30 C 109 30, 114 35, 114 45 C 114 52, 111 58, 106 60 L 130 68 L 142 150 L 145 210 L 138 215 L 135 155 C 134 140, 130 100, 128 100 L 132 150 C 135 170, 138 250, 130 300 L 122 390 L 110 390 L 112 280 L 100 225 L 88 280 L 90 390 L 78 390 L 70 300 C 62 250, 65 170, 68 150 L 72 100 C 70 100, 66 140, 65 155 L 62 215 L 55 210 L 58 150 L 70 68 L 94 60 C 89 58, 86 52, 86 45 C 86 35, 91 30, 100 30 Z';
    const pathOverweight = 'M 100 30 C 110 30, 116 35, 116 45 C 116 52, 113 58, 108 60 L 135 72 L 150 150 L 155 210 L 145 215 L 142 155 C 140 140, 138 100, 138 100 L 148 155 C 152 180, 155 260, 145 300 L 130 390 L 115 390 L 118 280 L 100 230 L 82 280 L 85 390 L 70 390 L 55 300 C 45 260, 48 180, 52 155 L 62 100 C 62 100, 60 140, 58 155 L 55 215 L 45 210 L 50 150 L 65 72 L 92 60 C 87 58, 84 52, 84 45 C 84 35, 90 30, 100 30 Z';
    const pathObese = 'M 100 30 C 112 30, 118 35, 118 45 C 118 52, 115 58, 110 60 L 145 75 L 165 150 L 170 210 L 155 215 L 152 155 C 150 140, 148 110, 160 130 L 165 170 C 170 200, 175 270, 155 300 L 135 390 L 115 390 L 120 280 L 100 240 L 80 280 L 85 390 L 65 390 L 45 300 C 25 270, 30 200, 35 170 L 40 130 C 52 110, 50 140, 48 155 L 45 215 L 30 210 L 35 150 L 55 75 L 90 60 C 85 58, 82 52, 82 45 C 82 35, 88 30, 100 30 Z';

    const targetPath = useMemo(() => {
        if (bmi < 18.5) return pathUnderweight;
        if (bmi < 25) return pathHealthy;
        if (bmi < 30) return pathOverweight;
        return pathObese;
    }, [bmi]);

    const animatedProps = useAnimatedProps(() => {
        return {
            d: targetPath // RN-SVG handles d path morphing with strings if the topology is the same
        };
    });

    const getColors = () => {
        if (bmi < 18.5) return { start: '#60A5FA', end: '#3B82F6' }; // Blue
        if (bmi < 25) return { start: '#10B981', end: '#059669' }; // Emerald
        if (bmi < 30) return { start: '#F59E0B', end: '#D97706' }; // Amber
        return { start: '#EF4444', end: '#B91C1C' }; // Red
    };

    const colors = getColors();

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 350, width: '100%' }}>
            <Svg height="320" width="200" viewBox="0 0 200 450">
                <Defs>
                    <LinearGradient id="pathGradient" x1="100" y1="35" x2="100" y2="390" gradientUnits="userSpaceOnUse">
                        <Stop offset="0" stopColor={colors.start} stopOpacity="0.8" />
                        <Stop offset="1" stopColor={colors.end} stopOpacity="0.6" />
                    </LinearGradient>
                </Defs>
                <AnimatedPath
                    animatedProps={animatedProps}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    fill="url(#pathGradient)"
                />
            </Svg>
        </View>
    );
}
