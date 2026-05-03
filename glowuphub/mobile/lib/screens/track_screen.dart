import 'package:flutter_lucide/flutter_lucide.dart';





import 'package:flutter/material.dart';

import '../widgets/bmi_calculator.dart';
import '../widgets/weight_chart.dart';

class TrackScreen extends StatelessWidget {
  const TrackScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Evolution Tracking',
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      letterSpacing: -1,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Log your biometrics and monitor changes.',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white.withOpacity(0.5),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 48),

              // Weight Chart Section
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: const Color(0xFF18181B),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'GROWTH TREND',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 2.0,
                            color: Color(0xFF10B981),
                          ),
                        ),
                        Icon(LucideIcons.trending_up, color: Color(0xFF10B981), size: 14),
                      ],
                    ),
                    SizedBox(height: 24),
                    WeightChart(),
                  ],
                ),
              ),

              const SizedBox(height: 48),

              // BMI Calculator
              const Text(
                'BMI CALCULATOR',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                  color: Colors.white24,
                ),
              ),
              const SizedBox(height: 16),
              const MobileBmiCalculator(),

              const SizedBox(height: 48),

              // Active Protocols
              const Text(
                'ACTIVE PROTOCOLS',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                  color: Colors.white24,
                ),
              ),
              const SizedBox(height: 16),
              const _ProtocolItem(
                title: 'Intermittent Fasting',
                status: 'Window: 12pm - 8pm',
                icon: LucideIcons.clock,
              ),
              const _ProtocolItem(
                title: 'Skincare Routine',
                status: 'Morning complete',
                icon: LucideIcons.sparkles,
              ),

              const SizedBox(height: 64),
            ],
          ),
        ),
      ),
    );
  }
}

class _ProtocolItem extends StatelessWidget {
  final String title;
  final String status;
  final IconData icon;

  const _ProtocolItem({required this.title, required this.status, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Icon(icon, color: const Color(0xFF10B981), size: 20),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(status, style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 12)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

