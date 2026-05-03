import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class StreakTracker extends StatelessWidget {
  final int count;
  final List<String> days;
  final int activeDayIndex;

  const StreakTracker({
    super.key,
    this.count = 5,
    this.days = const ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    this.activeDayIndex = 4,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          // Flame Icon
          Stack(
            alignment: Alignment.center,
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: Colors.orange.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.orange.withOpacity(0.2)),
                ),
                child: const Icon(LucideIcons.flame, color: Colors.orange, size: 32),
              ),
              Positioned(
                top: -8,
                right: -8,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.orange.withOpacity(0.2), width: 2),
                  ),
                  child: Center(
                    child: Text(
                      '$count',
                      style: const TextStyle(
                        color: Colors.black,
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 24),
          // Info and Day Row
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'You\'re on Fire!',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'You\'ve hit your goals for $count days in a row.',
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.white.withOpacity(0.4),
                  ),
                ),
                const SizedBox(height: 16),
                // Day Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: List.generate(days.length, (index) {
                    final isPast = index < activeDayIndex;
                    final isToday = index == activeDayIndex;
                    
                    return Column(
                      children: [
                        Container(
                          width: 32,
                          height: 32,
                          decoration: BoxDecoration(
                            color: isPast 
                                ? Colors.orange 
                                : isToday 
                                    ? Colors.white.withOpacity(0.1)
                                    : Colors.white.withOpacity(0.05),
                            borderRadius: BorderRadius.circular(8),
                            border: isToday ? Border.all(color: Colors.orange) : null,
                          ),
                          child: Center(
                            child: isPast 
                                ? const Icon(LucideIcons.star, size: 12, color: Colors.black)
                                : Text(
                                    days[index],
                                    style: TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      color: isToday ? Colors.orange : Colors.white24,
                                    ),
                                  ),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          isToday ? 'Today' : days[index],
                      style: TextStyle(
                        fontSize: 8,
                        fontWeight: FontWeight.w900,
                        color: isToday ? Colors.orange : Colors.white12,
                          ),
                        ),
                      ],
                    );
                  }),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

