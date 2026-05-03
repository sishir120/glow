import 'package:flutter/material.dart';

class MobileBmiCalculator extends StatefulWidget {
  const MobileBmiCalculator({super.key});

  @override
  State<MobileBmiCalculator> createState() => _MobileBmiCalculatorState();
}

class _MobileBmiCalculatorState extends State<MobileBmiCalculator> {
  final _weightController = TextEditingController();
  final _heightController = TextEditingController();
  double? _bmi;
  String _category = '';

  void _calculateBmi() {
    final weight = double.tryParse(_weightController.text);
    final height = double.tryParse(_heightController.text);

    if (weight != null && height != null && height > 0) {
      final heightInMeters = height / 100;
      final bmiValue = weight / (heightInMeters * heightInMeters);
      
      setState(() {
        _bmi = bmiValue;
        if (bmiValue < 18.5) {
          _category = 'Underweight';
        } else if (bmiValue < 25) {
          _category = 'Normal';
        } else if (bmiValue < 30) {
          _category = 'Overweight';
        } else {
          _category = 'Obese';
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'BMI CALCULATOR',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, letterSpacing: 1.2),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _weightController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Weight (kg)'),
                  onChanged: (_) => _calculateBmi(),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: TextField(
                  controller: _heightController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Height (cm)'),
                  onChanged: (_) => _calculateBmi(),
                ),
              ),
            ],
          ),
          if (_bmi != null) ...[
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('YOUR BMI', style: TextStyle(fontSize: 10, color: Colors.grey)),
                      Text(
                        _bmi!.toStringAsFixed(1),
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF10B981)),
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const Text('CATEGORY', style: TextStyle(fontSize: 10, color: Colors.grey)),
                      Text(
                        _category.toUpperCase(),
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

