import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';

class WorkoutCompleteScreen extends StatelessWidget {
  final String workoutName;
  final String duration;
  final int exercisesCount;

  const WorkoutCompleteScreen({
    super.key,
    required this.workoutName,
    required this.duration,
    required this.exercisesCount,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Background Fireworks/Glow Effect
          Positioned.fill(
             child: Container(
               decoration: BoxDecoration(
                 gradient: RadialGradient(
                   center: Alignment.topCenter,
                   radius: 1.0,
                   colors: [
                     const Color(0xFF10B981).withOpacity(0.1),
                     Colors.transparent,
                   ],
                 ),
               ),
             ).animate(onPlay: (c) => c.repeat(reverse: true)).fadeOut(duration: 2.seconds),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(32.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Spacer(),
                  
                  // 1. Success Badge
                  Center(
                    child: Container(
                      padding: const EdgeInsets.all(40),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: const Color(0xFF10B981).withOpacity(0.1),
                        border: Border.all(color: const Color(0xFF10B981), width: 2),
                      ),
                      child: const Icon(LucideIcons.party_popper, size: 80, color: Color(0xFF10B981)),
                    ).animate().scale(duration: 800.ms, curve: Curves.elasticOut),
                  ),

                  const SizedBox(height: 48),

                  // 2. Headlines
                  const Text(
                    "CONGRATULATIONS",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey, letterSpacing: 5, fontSize: 12, fontWeight: FontWeight.bold),
                  ).animate().fadeIn(delay: 400.ms),

                  const SizedBox(height: 12),

                  const Text(
                    "SESSION COMPLETE",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -1),
                  ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.1),

                  const SizedBox(height: 48),

                  // 3. Metric Tiles
                  _buildSummaryGrid(theme),

                  const Spacer(),

                  // 4. Primary Button
                  ElevatedButton(
                    onPressed: () => context.go('/home'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.black,
                      minimumSize: const Size.fromHeight(64),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    ),
                    child: const Text("RETURN TO DASHBOARD", style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1)),
                  ).animate().fadeIn(delay: 1.5.seconds).scale(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryGrid(ThemeData theme) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildMetricItem("DURATION", duration, LucideIcons.clock),
        _buildMetricItem("EXERCISES", "$exercisesCount", LucideIcons.dumbbell),
        _buildMetricItem("POINTS", "+450", LucideIcons.zap),
      ],
    ).animate().fadeIn(delay: 1.seconds).slideY(begin: 0.1);
  }

  Widget _buildMetricItem(String label, String value, IconData icon) {
    return Column(
      children: [
        Icon(icon, color: Colors.grey, size: 20),
        const SizedBox(height: 12),
        Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white)),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),
      ],
    );
  }
}

