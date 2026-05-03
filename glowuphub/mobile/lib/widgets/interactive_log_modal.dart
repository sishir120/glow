import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class InteractiveLogModal extends StatefulWidget {
  const InteractiveLogModal({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const InteractiveLogModal(),
    );
  }

  @override
  State<InteractiveLogModal> createState() => _InteractiveLogModalState();
}

class _InteractiveLogModalState extends State<InteractiveLogModal> {
  double _hydration = 2.4;
  int _sleepHours = 7;
  bool _trainingComplete = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: Color(0xFF09090B),
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
        border: Border(top: BorderSide(color: Colors.white10)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.white10,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 24),
          const Text(
            'Log Activity',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Keep your transformation on track.',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withOpacity(0.5),
            ),
          ),
          const SizedBox(height: 32),
          
          _buildLogItem(
            LucideIcons.droplets,
            'Hydration',
            '${_hydration.toStringAsFixed(1)}L / 3.0L',
            Slider(
              value: _hydration,
              min: 0,
              max: 5,
              activeColor: const Color(0xFF10B981),
              onChanged: (val) => setState(() => _hydration = val),
            ),
          ),
          
          _buildLogItem(
            LucideIcons.moon,
            'Sleep Quality',
            '$_sleepHours hours',
            Row(
              children: List.generate(10, (index) {
                final val = index + 1;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _sleepHours = val),
                    child: Container(
                      height: 32,
                      margin: const EdgeInsets.symmetric(horizontal: 2),
                      decoration: BoxDecoration(
                        color: _sleepHours == val ? const Color(0xFF10B981) : Colors.white.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Center(
                        child: Text(
                          '$val',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: _sleepHours == val ? Colors.black : Colors.white30,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
          
          _buildLogItem(
            LucideIcons.dumbbell,
            'Training Protocol',
            _trainingComplete ? 'Session Completed' : 'Pending Session',
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              value: _trainingComplete,
              onChanged: (val) => setState(() => _trainingComplete = val),
              activeThumbColor: const Color(0xFF10B981),
              title: const Text('Protocol Finished', style: TextStyle(color: Colors.white, fontSize: 14)),
            ),
          ),
          
          const SizedBox(height: 32),
          
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => Navigator.pop(context),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.black,
                shape: RoundedRectanglePlatform.borderRadius(28),
                elevation: 0,
              ),
              child: const Text('SAVE LOG', style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1.5)),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildLogItem(IconData icon, String title, String value, Widget input) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: const Color(0xFF10B981), size: 16),
              const SizedBox(width: 8),
              Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
              const Spacer(),
              Text(value, style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 14)),
            ],
          ),
          const SizedBox(height: 12),
          input,
        ],
      ),
    );
  }
}

class RoundedRectanglePlatform {
  static RoundedRectangleBorder borderRadius(double radius) => RoundedRectangleBorder(borderRadius: BorderRadius.circular(radius));
}

