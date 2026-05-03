import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class BioDigitalTwin extends StatelessWidget {
  final int hydration;
  final int energy;
  final int focus;
  final int stress;

  const BioDigitalTwin({
    super.key,
    this.hydration = 80,
    this.energy = 90,
    this.focus = 75,
    this.stress = 20,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Biological Synthesis',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'REAL-TIME HOMEOSTATIC STATUS',
            style: TextStyle(
              fontSize: 9,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.5,
              color: const Color(0xFF10B981).withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 24),
          // Body Figure Visualization
          Center(
            child: Stack(
              alignment: Alignment.center,
              children: [
                Icon(
                  LucideIcons.user,
                  size: 180,
                  color: Colors.white.withOpacity(0.03),
                ),
                Container(
                  width: 140,
                  height: 140,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: RadialGradient(
                      colors: [
                        const Color(0xFF10B981).withOpacity(0.1),
                        Colors.transparent,
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          // Integration Dashboard (Grid)
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            childAspectRatio: 2.5,
            children: [
              _buildIndicator(LucideIcons.droplets, 'Hydration', '$hydration%', const Color(0xFF10B981)),
              _buildIndicator(LucideIcons.zap, 'Energy', '$energy%', const Color(0xFFF59E0B)),
              _buildIndicator(LucideIcons.brain, 'Cognitive', '$focus%', const Color(0xFFA78BFA)),
              _buildIndicator(LucideIcons.flame, 'Metabolic', '${100 - stress}%', const Color(0xFFF87171)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildIndicator(IconData icon, String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.03),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: Row(
        children: [
          Container(
            width: 30,
            height: 30,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: color, size: 16),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                label.toUpperCase(),
                style: TextStyle(
                  fontSize: 8,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 1.0,
                  color: Colors.white.withOpacity(0.4),
                ),
              ),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                  fontFeatures: [FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

