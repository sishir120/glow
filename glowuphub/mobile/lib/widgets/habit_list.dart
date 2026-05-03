import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import '../models/habit_model.dart';

class HabitList extends StatelessWidget {
  final List<Habit> habits;
  final Function(String) onToggle;

  const HabitList({
    super.key,
    required this.habits,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            'TODAY\'S HABITS',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              letterSpacing: 2.0,
              color: Colors.white30,
            ),
          ),
        ),
        const SizedBox(height: 16),
        if (habits.isEmpty)
          const Text("No active habits assigned.", style: TextStyle(color: Colors.white54)),
        
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: habits.length,
          separatorBuilder: (_, __) => const SizedBox(height: 8),
          itemBuilder: (context, index) {
            final habit = habits[index];
            return _buildHabitCard(habit);
          },
        ),
      ],
    );
  }

  Widget _buildHabitCard(Habit habit) {
    return GestureDetector(
      onTap: () => onToggle(habit.id),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
        decoration: BoxDecoration(
          color: habit.isCompletedToday
              ? const Color(0xFF10B981).withOpacity(0.08)
              : const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
             color: habit.isCompletedToday
                ? const Color(0xFF10B981).withOpacity(0.3)
                : Colors.white.withOpacity(0.03),
          ),
        ),
        child: Row(
          children: [
            // Custom Checkbox
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: habit.isCompletedToday ? const Color(0xFF10B981) : Colors.transparent,
                shape: BoxShape.circle,
                border: Border.all(
                  color: habit.isCompletedToday ? const Color(0xFF10B981) : Colors.white24,
                  width: 2,
                ),
              ),
              child: habit.isCompletedToday
                  ? const Icon(LucideIcons.check, size: 16, color: Colors.black)
                  : null,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    habit.action,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: habit.isCompletedToday ? Colors.white54 : Colors.white,
                      decoration: habit.isCompletedToday ? TextDecoration.lineThrough : null,
                      decorationColor: Colors.white24,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    habit.trigger,
                    style: const TextStyle(
                      fontSize: 11,
                      color: Colors.white24,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

