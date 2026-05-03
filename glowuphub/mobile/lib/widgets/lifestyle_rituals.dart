import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class Ritual {
  final String id;
  final String label;
  final IconData icon;
  final String time;
  bool isCompleted;

  Ritual({
    required this.id,
    required this.label,
    required this.icon,
    required this.time,
    this.isCompleted = false,
  });
}

class LifestyleRituals extends StatefulWidget {
  const LifestyleRituals({super.key});

  @override
  State<LifestyleRituals> createState() => _LifestyleRitualsState();
}

class _LifestyleRitualsState extends State<LifestyleRituals> {
  final List<Ritual> _rituals = [
    Ritual(id: 'water', label: 'Morning Hydration', icon: LucideIcons.coffee, time: 'Morning', isCompleted: true),
    Ritual(id: 'breath', label: 'Box Breathing (5 min)', icon: LucideIcons.wind, time: 'Morning'),
    Ritual(id: 'sun', label: 'Natural Sunlight', icon: LucideIcons.sun, time: 'Afternoon'),
    Ritual(id: 'sleep', label: 'No Screen (1h before)', icon: LucideIcons.moon, time: 'Evening'),
    Ritual(id: 'gratitude', label: 'Gratitude Reflection', icon: LucideIcons.heart, time: 'Evening'),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            'LIFESTYLE RITUALS',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              letterSpacing: 2.0,
              color: Colors.white30,
            ),
          ),
        ),
        const SizedBox(height: 16),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: _rituals.length,
          separatorBuilder: (_, __) => const SizedBox(height: 8),
          itemBuilder: (context, index) {
            final ritual = _rituals[index];
            return _buildRitualCard(ritual);
          },
        ),
        const SizedBox(height: 24),
        _buildTransformationTip(),
      ],
    );
  }

  Widget _buildRitualCard(Ritual ritual) {
    return GestureDetector(
      onTap: () {
        setState(() {
          ritual.isCompleted = !ritual.isCompleted;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: ritual.isCompleted 
              ? const Color(0xFF10B981).withOpacity(0.05)
              : const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: ritual.isCompleted 
                ? const Color(0xFF10B981).withOpacity(0.2)
                : Colors.white.withOpacity(0.05),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: ritual.isCompleted 
                        ? const Color(0xFF10B981)
                        : Colors.white.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    ritual.isCompleted ? LucideIcons.check : ritual.icon,
                    size: 14,
                    color: ritual.isCompleted ? Colors.black : Colors.white60,
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      ritual.label,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: ritual.isCompleted ? const Color(0xFF10B981).withOpacity(0.7) : Colors.white,
                        decoration: ritual.isCompleted ? TextDecoration.lineThrough : null,
                      ),
                    ),
                    Text(
                      ritual.time.toUpperCase(),
                      style: const TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.0,
                        color: Colors.white12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: ritual.isCompleted 
                    ? const Color(0xFF10B981).withOpacity(0.1)
                    : Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: ritual.isCompleted 
                      ? const Color(0xFF10B981).withOpacity(0.1)
                      : Colors.white10,
                ),
              ),
              child: Text(
                ritual.isCompleted ? 'COMPLETED' : 'PENDING',
                style: TextStyle(
                  fontSize: 7,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.5,
                  color: ritual.isCompleted ? const Color(0xFF10B981) : Colors.white30,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransformationTip() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF6366F1).withOpacity(0.05),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF6366F1).withOpacity(0.1)),
      ),
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Transformation tip',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF818CF8),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Consistency in sleep hygiene accounts for up to 30% of metabolic efficiency. Don\'t skip the "No Screen" ritual tonight!',
                style: TextStyle(
                  fontSize: 10,
                  color: Colors.white.withOpacity(0.5),
                  height: 1.5,
                ),
              ),
            ],
          ),
          const Positioned(
            right: 0,
            top: 0,
            child: Opacity(
              opacity: 0.05,
              child: Icon(LucideIcons.moon, size: 48, color: Color(0xFF818CF8)),
            ),
          ),
        ],
      ),
    );
  }
}

