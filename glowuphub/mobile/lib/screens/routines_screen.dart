import 'package:flutter_lucide/flutter_lucide.dart';





import 'package:flutter/material.dart';


class RoutinesScreen extends StatelessWidget {
  const RoutinesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Training Protocols',
                style: Theme.of(context).textTheme.displayLarge,
              ),
              const SizedBox(height: 8),
              Text(
                'High-performance routines for your transformation.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 32),
              
              const _RoutineCard(
                title: 'Neon Strength',
                duration: '45 mins',
                level: 'Intermediate',
                icon: LucideIcons.dumbbell,
                color: Color(0xFF10B981),
              ),
              const _RoutineCard(
                title: 'Zen Recovery',
                duration: '20 mins',
                level: 'All Levels',
                icon: LucideIcons.wind,
                color: Colors.blue,
              ),
              const _RoutineCard(
                title: 'HiiT Burn',
                duration: '30 mins',
                level: 'Advanced',
                icon: LucideIcons.zap,
                color: Colors.orange,
              ),
              
              const SizedBox(height: 100),
            ],
          ),
        ),
      ),
    );
  }
}

class _RoutineCard extends StatelessWidget {
  final String title;
  final String duration;
  final String level;
  final IconData icon;
  final Color color;

  // REMOVED CONST from constructor because IconData from flutter_lucide is not const
  const _RoutineCard({
    required this.title,
    required this.duration,
    required this.level,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 32),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                const SizedBox(height: 4),
                Text('$duration • $level', style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 13)),
              ],
            ),
          ),
          const CircleAvatar(
            radius: 16,
            backgroundColor: Color(0xFF10B981),
            child: Icon(LucideIcons.play, size: 14, color: Colors.black),
          ),
        ],
      ),
    );
  }
}

