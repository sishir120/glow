import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class WeightTrendCard extends StatelessWidget {
  final double currentWeight;
  final double startWeight;
  final List<double> weeklyData;

  const WeightTrendCard({
    super.key,
    required this.currentWeight,
    required this.startWeight,
    this.weeklyData = const [75.5, 75.2, 75.0, 74.8, 74.5, 74.4, 74.2],
  });

  @override
  Widget build(BuildContext context) {
    final double change = currentWeight - startWeight;
    final bool isImprovement = change < 0; // Assuming weight loss goal

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
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'WEIGHT TREND',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2.0,
                      color: Colors.white24,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        '$currentWeight',
                        style: const TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          height: 1.0,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Text(
                        'kg',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.white24,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: isImprovement 
                      ? const Color(0xFF10B981).withOpacity(0.1) 
                      : const Color(0xFFEF4444).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(
                      isImprovement ? LucideIcons.trending_down : LucideIcons.trending_up,
                      size: 16,
                      color: isImprovement ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '${change.abs().toStringAsFixed(1)} kg',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                        color: isImprovement ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          
          const SizedBox(height: 32),
          
          // Simple Line Chart
          SizedBox(
            height: 60,
            width: double.infinity,
            child: CustomPaint(
              painter: _TrendPainter(
                data: weeklyData,
                color: isImprovement ? const Color(0xFF10B981) : const Color(0xFFEF4444),
              ),
            ),
          ),
          
          const SizedBox(height: 24),
          
          Text(
            isImprovement 
                ? "Small wins compound. You're down ${change.abs().toStringAsFixed(1)}kg this week."
                : "Fluctuations are normal. Focus on your habits today.",
            style: TextStyle(
              color: Colors.white.withOpacity(0.5),
              fontSize: 13,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendPainter extends CustomPainter {
  final List<double> data;
  final Color color;

  _TrendPainter({required this.data, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    if (data.isEmpty) return;

    final paint = Paint()
      ..color = color
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();
    
    final double minVal = data.reduce((curr, next) => curr < next ? curr : next);
    final double maxVal = data.reduce((curr, next) => curr > next ? curr : next);
    final double range = maxVal - minVal;
    
    // Normalize and scale points
    final double stepX = size.width / (data.length - 1);

    for (int i = 0; i < data.length; i++) {
      final double normalizedY = (data[i] - minVal) / (range == 0 ? 1 : range);
      final double x = i * stepX;
      final double y = size.height - (normalizedY * size.height);

      if (i == 0) {
        path.moveTo(x, y);
      } else {
        // Simple smoothing
        final double prevX = (i - 1) * stepX;
        final double prevY = size.height - ((data[i - 1] - minVal) / (range == 0 ? 1 : range) * size.height);
        
        final double cX1 = prevX + stepX / 2;
        final double cY1 = prevY;
        final double cX2 = x - stepX / 2;
        final double cY2 = y;
        
        path.cubicTo(cX1, cY1, cX2, cY2, x, y);
      }
    }

    canvas.drawPath(path, paint);
    
    // Draw simple gradient fill below
    final fillPath = Path.from(path)
      ..lineTo(size.width, size.height + 20)
      ..lineTo(0, size.height + 20)
      ..close();
      
    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [color.withOpacity(0.2), color.withOpacity(0.0)],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height))
      ..style = PaintingStyle.fill;
      
    canvas.drawPath(fillPath, fillPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

