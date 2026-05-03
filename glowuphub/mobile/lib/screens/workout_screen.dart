import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'workout_session_screen.dart';

class WorkoutScreen extends StatefulWidget {
  const WorkoutScreen({super.key});

  @override
  State<WorkoutScreen> createState() => _WorkoutScreenState();
}

class _WorkoutScreenState extends State<WorkoutScreen> {
  int _selectedMode = 0; // 0: Home, 1: Gym

  final List<Map<String, dynamic>> _workouts = [
    {
      "name": "Full Body Power",
      "duration": "25 min",
      "difficulty": "Intermediate",
      "target": "Full Body",
      "isGym": false,
      "tag": "FAT BURN",
    },
    {
      "name": "HIIT Cardify",
      "duration": "15 min",
      "difficulty": "High",
      "target": "Cardio",
      "isGym": false,
      "tag": "INTENSE",
    },
    {
      "name": "Heavy Lifts",
      "duration": "45 min",
      "difficulty": "Advanced",
      "target": "Strength",
      "isGym": true,
      "tag": "BUILD",
    },
    {
      "name": "Machine Circuit",
      "duration": "30 min",
      "difficulty": "Beginner",
      "target": "Full Body",
      "isGym": true,
      "tag": "STRENGTH",
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final activeWorkouts = _workouts.where((w) => w['isGym'] == (_selectedMode == 1)).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text("TRAINING"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. Premium Mode Toggle
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            child: Container(
              height: 56,
              decoration: BoxDecoration(
                color: const Color(0xFF0A0A0A),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.grey.shade900),
              ),
              child: Row(
                children: [
                   _buildToggleItem("AT HOME", 0),
                   _buildToggleItem("IN GYM", 1),
                ],
              ),
            ),
          ).animate().fadeIn().slideY(begin: -0.2),

          // 2. Workout List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(24),
              itemCount: activeWorkouts.length,
              separatorBuilder: (_, __) => const SizedBox(height: 20),
              itemBuilder: (context, index) {
                final workout = activeWorkouts[index];
                return _buildStudioCard(workout, theme, index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildToggleItem(String title, int index) {
    final isSelected = _selectedMode == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedMode = index),
        child: Container(
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
          ),
          margin: const EdgeInsets.all(4),
          alignment: Alignment.center,
          child: Text(
            title,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w900,
              color: isSelected ? Colors.black : Colors.grey,
              letterSpacing: 1.2,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStudioCard(Map<String, dynamic> workout, ThemeData theme, int index) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => WorkoutSessionScreen(workout: workout),
          ),
        );
      },
      child: Container(
        height: 180,
        decoration: BoxDecoration(
          color: const Color(0xFF111111),
          borderRadius: BorderRadius.circular(32),
          border: Border.all(color: Colors.grey.shade900),
          image: DecorationImage(
             image: const NetworkImage("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"), // Placeholder for high-end look
             fit: BoxFit.cover,
             opacity: 0.1,
          ),
        ),
        child: Stack(
          children: [
            // Gradient Overlay
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(32),
                gradient: LinearGradient(
                  begin: Alignment.bottomRight,
                  end: Alignment.topLeft,
                  colors: [
                    theme.colorScheme.secondary.withOpacity(0.05),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
            
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.white.withOpacity(0.1)),
                        ),
                        child: Text(
                          workout['tag'],
                          style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1),
                        ),
                      ),
                      const Icon(LucideIcons.arrow_up_right, color: Colors.grey, size: 20),
                    ],
                  ),
                  const Spacer(),
                  Text(
                    workout['name'].toUpperCase(),
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -0.5),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      _buildInfoTag(LucideIcons.clock, workout['duration']),
                      const SizedBox(width: 12),
                      _buildInfoTag(LucideIcons.activity, workout['difficulty']),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ).animate().fadeIn(delay: (100 * index).ms).slideY(begin: 0.2);
  }

  Widget _buildInfoTag(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, size: 14, color: const Color(0xFF10B981)),
        const SizedBox(width: 6),
        Text(text, style: const TextStyle(color: Colors.grey, fontSize: 12, fontWeight: FontWeight.bold)),
      ],
    );
  }
}

