import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'interactive_log_modal.dart';

class QuickActionsFAB extends StatefulWidget {
  const QuickActionsFAB({super.key});

  @override
  State<QuickActionsFAB> createState() => _QuickActionsFABState();
}

class _QuickActionsFABState extends State<QuickActionsFAB> {
  bool _isOpen = false;

  final List<Map<String, dynamic>> _actions = [
    {'name': 'Log Meal', 'icon': LucideIcons.utensils, 'color': Colors.amber},
    {'name': 'Log Weight', 'icon': LucideIcons.scale, 'color': const Color(0xFF10B981)},
    {'name': 'Start HIIT', 'icon': LucideIcons.dumbbell, 'color': const Color(0xFFA78BFA)},
    {'name': 'Ask Expert', 'icon': LucideIcons.message_square, 'color': const Color(0xFF81C784)},
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        if (_isOpen)
          ...List.generate(_actions.length, (index) {
            final action = _actions[index];
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _buildActionItem(action, index),
            );
          }).reversed,
        
        const SizedBox(height: 8),
        
        GestureDetector(
          onTap: () => setState(() => _isOpen = !_isOpen),
          child: AnimatedContainer(
            duration: 300.ms,
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: _isOpen ? const Color(0xFF18181B) : const Color(0xFF10B981),
              borderRadius: BorderRadius.circular(24),
              border: _isOpen ? Border.all(color: Colors.white10) : null,
              boxShadow: _isOpen ? null : [
                BoxShadow(
                  color: const Color(0xFF10B981).withOpacity(0.3),
                  blurRadius: 20,
                  spreadRadius: 2,
                ),
              ],
            ),
            child: Icon(
              _isOpen ? LucideIcons.x : LucideIcons.plus,
              color: _isOpen ? Colors.white54 : Colors.black,
              size: 28,
            ).animate(target: _isOpen ? 1 : 0).rotate(begin: 0, end: 0.125),
          ),
        ),
      ],
    );
  }

  Widget _buildActionItem(Map<String, dynamic> action, int index) {
    return GestureDetector(
      onTap: () {
        setState(() => _isOpen = false);
        InteractiveLogModal.show(context);
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFF18181B),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white10),
            ),
            child: Text(
              action['name'].toString().toUpperCase(),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 9,
                fontWeight: FontWeight.w900,
                letterSpacing: 1.5,
              ),
            ),
          ).animate().fadeIn(delay: (index * 50).ms).slideX(begin: 0.2),
          const SizedBox(width: 12),
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: action['color'],
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(action['icon'], color: Colors.black, size: 20),
          ).animate().scale(delay: (index * 50).ms).fadeIn(),
        ],
      ),
    );
  }
}

