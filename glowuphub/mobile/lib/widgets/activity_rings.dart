import 'package:flutter/material.dart';
import 'dart:math' as math;

class ActivityRings extends StatelessWidget {
  final double move; // 0.0 to 1.0
  final double glow; // 0.0 to 1.0
  final double mind; // 0.0 to 1.0
  final double size;

  const ActivityRings({
    super.key,
    required this.move,
    required this.glow,
    required this.mind,
    this.size = 200,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _RingsPainter(
          move: move,
          glow: glow,
          mind: mind,
        ),
      ),
    );
  }
}

class _RingsPainter extends CustomPainter {
  final double move;
  final double glow;
  final double mind;

  _RingsPainter({
    required this.move,
    required this.glow,
    required this.mind,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final strokeWidth = size.width * 0.12;
    final gap = size.width * 0.04;

    final r1 = size.width / 2 - strokeWidth / 2;
    final r2 = r1 - strokeWidth - gap;
    final r3 = r2 - strokeWidth - gap;

    // Draw background rings
    final bgPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..color = const Color(0xFF2A2A2A);

    canvas.drawCircle(center, r1, bgPaint);
    canvas.drawCircle(center, r2, bgPaint);
    canvas.drawCircle(center, r3, bgPaint);

    // Draw active segments
    _drawRing(canvas, center, r1, move, const Color(0xFFE11D48), strokeWidth);
    _drawRing(canvas, center, r2, glow, const Color(0xFFDFFF00), strokeWidth);
    _drawRing(canvas, center, r3, mind, const Color(0xFF06B6D4), strokeWidth);
  }

  void _drawRing(Canvas canvas, Offset center, double radius, double progress, Color color, double strokeWidth) {
    if (progress <= 0) return;
    
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round
      ..color = color;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      2 * math.pi * progress.clamp(0.0, 1.0),
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
