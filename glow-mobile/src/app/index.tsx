import { View, Text, ScrollView, Pressable } from "../tw";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Sparkles, Brain, ArrowRight } from "lucide-react-native";

export default function HeroScreen() {
  return (
    <View className="flex-1 bg-surface">
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <View className="absolute inset-0">
        <LinearGradient
          colors={['#0A84FF', '#1C1C1E']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1, opacity: 0.2 }}
        />
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerClassName="px-6 pt-24 pb-12"
      >
        {/* Glow Logo / Badge */}
        <View className="flex-row items-center gap-2 mb-8 bg-brand/10 self-start px-4 py-2 rounded-full border border-brand/20">
          <Sparkles size={16} color="#0A84FF" />
          <Text className="text-brand font-bold text-sm tracking-widest uppercase">
            Glow Lumina
          </Text>
        </View>

        {/* Hero Content */}
        <Text className="text-5xl font-bold text-white leading-tight mb-4">
          Nutrition with{"\n"}
          <Text className="text-brand">Zero Friction</Text>
        </Text>
        
        <Text className="text-lg text-white/60 leading-relaxed mb-12">
          Scan your food. Get instant, rule-based advice. 
          Stop tracking, start deciding.
        </Text>

        {/* Action Button */}
        <Pressable 
          className="bg-brand h-16 rounded-2xl flex-row items-center justify-center gap-3 active:opacity-90"
          onPress={() => console.log("Joining waitlist...")}
        >
          <Text className="text-white font-bold text-lg">Join the Waitlist</Text>
          <ArrowRight size={20} color="white" />
        </Pressable>

        {/* Feature Teasers */}
        <View className="mt-16 gap-6">
          <View className="bg-surface-elevated p-6 rounded-3xl border border-white/5">
            <View className="bg-brand/20 w-12 h-12 rounded-xl items-center justify-center mb-4">
              <Brain size={24} color="#0A84FF" />
            </View>
            <Text className="text-white font-bold text-xl mb-2">Nutritional IQ</Text>
            <Text className="text-white/40">
              Rule-based guidance that understands what your body needs right now.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
