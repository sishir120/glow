import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/data_provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final data = Provider.of<DataProvider>(context);
    
    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // 1. Background Aura Gradient
          Positioned(
            top: -100,
            right: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: theme.colorScheme.secondary.withOpacity(0.15),
              ),
            ).animate(onPlay: (c) => c.repeat(reverse: true))
             .scale(begin: const Offset(1,1), end: const Offset(1.5, 1.5), duration: 5.seconds, curve: Curves.easeInOut),
          ),
          
          SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("WELCOME BACK,", style: theme.textTheme.labelLarge?.copyWith(color: Colors.grey, fontSize: 10)),
                          Text("Sishir", style: theme.textTheme.displayMedium),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF111111),
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.grey.shade900),
                        ),
                        child: const Icon(LucideIcons.bell, size: 20, color: Colors.white),
                      ),
                    ],
                  ).animate().fadeIn(duration: 600.ms).slideY(begin: -0.2),

                  const SizedBox(height: 32),

                  // 2. Glow Score Aura Ring
                  _buildGlowAura(data, theme),

                  const SizedBox(height: 32),

                  // 3. Today's Training Card (Glass)
                  _buildGlassSectionHeader("TRAINING"),
                  const SizedBox(height: 12),
                  _buildWorkoutGlassCard(theme),

                  const SizedBox(height: 32),

                  // 4. Daily Metrics Row
                  Row(
                    children: [
                      Expanded(child: _buildMetricTile("WATER", "${data.waterOunces}oz", LucideIcons.droplets, Colors.blue)),
                      const SizedBox(width: 16),
                      Expanded(child: _buildMetricTile("STEPS", "4.2k", LucideIcons.footprints, Colors.orange)),
                    ],
                  ).animate().fadeIn(delay: 400.ms).slideX(begin: 0.1),

                  const SizedBox(height: 32),

                  // 5. Habits Section
                  _buildGlassSectionHeader("LIFESTYLE"),
                  const SizedBox(height: 12),
                  _buildHabitChecklist(data, theme),
                  
                  const SizedBox(height: 48),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGlowAura(DataProvider data, ThemeData theme) {
    final score = data.glowScore;
    
    return Container(
      height: 220,
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Circular Progress
          SizedBox(
            width: 160,
            height: 160,
            child: CircularProgressIndicator(
              value: score / 100,
              strokeWidth: 12,
              backgroundColor: Colors.grey.shade900,
              valueColor: AlwaysStoppedAnimation(theme.colorScheme.secondary),
              strokeCap: StrokeCap.round,
            ),
          ).animate().rotate(duration: 1.seconds, curve: Curves.easeOutQuart),
          
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                "${score.round()}",
                style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white, height: 1),
              ),
              const Text(
                "GLOW SCORE",
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1),
              ),
            ],
          ),
          
          // Badge
          Positioned(
            bottom: 20,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: theme.colorScheme.secondary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: theme.colorScheme.secondary.withOpacity(0.3)),
              ),
              child: Text(
                "EXCELLENT",
                style: TextStyle(color: theme.colorScheme.secondary, fontSize: 10, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    ).animate().fadeIn(duration: 800.ms).scale(begin: const Offset(0.95, 0.95));
  }

  Widget _buildGlassSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(color: Colors.grey, letterSpacing: 2, fontSize: 10, fontWeight: FontWeight.w900),
    );
  }

  Widget _buildWorkoutGlassCard(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(LucideIcons.dumbbell, color: Colors.white, size: 20),
              ),
              const SizedBox(width: 16),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("FULL BODY POWER", style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Colors.white)),
                    Text("Day 3 • Intermediate", style: TextStyle(color: Colors.grey, fontSize: 12)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: Colors.black,
              minimumSize: const Size.fromHeight(56),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text("START SESSION"),
          ),
        ],
      ),
    ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.1);
  }

  Widget _buildMetricTile(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: color),
          const SizedBox(height: 16),
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white)),
          Text(label, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1)),
        ],
      ),
    );
  }

  Widget _buildHabitChecklist(DataProvider data, ThemeData theme) {
    return Column(
      children: [
        _buildHabitGlassItem("Drink 2L Water", data.isHabitCompleted('water'), () => data.toggleHabit('water')),
        _buildHabitGlassItem("Morning Mindfulness", data.isHabitCompleted('read'), () => data.toggleHabit('read')),
        _buildHabitGlassItem("No Added Sugar", data.isHabitCompleted('sugar'), () => data.toggleHabit('sugar')),
      ],
    ).animate().fadeIn(delay: 600.ms);
  }

  Widget _buildHabitGlassItem(String title, bool isCompleted, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
              decoration: BoxDecoration(
                color: isCompleted ? Colors.white.withOpacity(0.05) : const Color(0xFF0A0A0A),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: isCompleted ? const Color(0xFF10B981).withOpacity(0.3) : Colors.grey.shade900),
              ),
              child: Row(
                children: [
                  Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: isCompleted ? const Color(0xFF10B981) : Colors.transparent,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: isCompleted ? const Color(0xFF10B981) : Colors.grey.shade800, width: 2),
                    ),
                    child: isCompleted ? const Icon(LucideIcons.check, size: 16, color: Colors.white) : null,
                  ),
                  const SizedBox(width: 16),
                  Text(
                    title,
                    style: TextStyle(
                      color: isCompleted ? Colors.grey : Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

