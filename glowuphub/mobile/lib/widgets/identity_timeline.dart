import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class IdentityTimeline extends StatelessWidget {
  final String currentPhase; // "ADAPTING", "STABILIZING", "TRANSFORMING"
  final int progressPercent; // 0-100 within current phase

  const IdentityTimeline({
    super.key,
    required this.currentPhase,
    this.progressPercent = 30, // Mock default
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
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
            'IDENTITY EVOLUTION',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              letterSpacing: 2.0,
              color: Colors.white30,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildPhaseNode("ADAPTING", currentPhase == "ADAPTING" || currentPhase == "STABILIZING" || currentPhase == "TRANSFORMING"),
              Expanded(child: _buildConnector(currentPhase != "ADAPTING")),
              _buildPhaseNode("STABILIZING", currentPhase == "STABILIZING" || currentPhase == "TRANSFORMING"),
              Expanded(child: _buildConnector(currentPhase == "TRANSFORMING")),
              _buildPhaseNode("TRANSFORMING", currentPhase == "TRANSFORMING"),
            ],
          ),
          const SizedBox(height: 24),
          Text(
            _getPhaseDescription(currentPhase),
            style: const TextStyle(
              fontSize: 12,
              color: Colors.white60,
              height: 1.5,
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhaseNode(String label, bool isActive) {
    final bool isCurrent = label == currentPhase;
    return Column(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: isActive ? const Color(0xFF10B981) : const Color(0xFF27272A),
            shape: BoxShape.circle,
            border: isCurrent 
                ? Border.all(color: Colors.white, width: 2) 
                : null,
            boxShadow: isCurrent 
                ? [BoxShadow(color: const Color(0xFF10B981).withOpacity(0.5), blurRadius: 10)] 
                : null,
          ),
          child: Center(
            child: isActive 
                ? const Icon(LucideIcons.check, size: 16, color: Colors.black)
                : const Icon(LucideIcons.lock, size: 12, color: Colors.white24),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: TextStyle(
            fontSize: 8,
            fontWeight: FontWeight.bold,
            color: isActive ? Colors.white : Colors.white24,
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }

  Widget _buildConnector(bool isActive) {
    return Container(
      height: 2,
      color: isActive ? const Color(0xFF10B981) : const Color(0xFF27272A),
    );
  }

  String _getPhaseDescription(String phase) {
    switch (phase) {
      case "ADAPTING":
        return "You are rewiring your habits. Resistance is normal. Keep showing up.";
      case "STABILIZING":
        return "Your new habits are becoming automatic. Focus on optimization.";
      case "TRANSFORMING":
        return "You are becoming the person you visualized. Expand your identity.";
      default:
        return "";
    }
  }
}

