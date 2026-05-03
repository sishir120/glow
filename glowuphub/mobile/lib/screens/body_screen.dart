import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/data_provider.dart';

class BodyScreen extends StatefulWidget {
  const BodyScreen({super.key});

  @override
  State<BodyScreen> createState() => _BodyScreenState();
}

class _BodyScreenState extends State<BodyScreen> {
  final TextEditingController _weightController = TextEditingController();

  void _showLogWeightDialog() {
    showDialog(
      context: context,
      builder: (context) {
        final data = Provider.of<DataProvider>(context, listen: false);
        _weightController.text = data.currentWeight.toString();
        
        return AlertDialog(
          backgroundColor: const Color(0xFF0A0A0A),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28), side: BorderSide(color: Colors.grey.shade900)),
          title: const Text("Update Weight", style: TextStyle(fontWeight: FontWeight.w900, color: Colors.white)),
          content: TextField(
            controller: _weightController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            autofocus: true,
            style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900),
            textAlign: TextAlign.center,
            decoration: InputDecoration(
              suffixText: "kg",
              suffixStyle: const TextStyle(color: Colors.grey, fontSize: 16),
              filled: true,
              fillColor: Colors.black,
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: Colors.grey.shade900)),
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text("CANCEL", style: TextStyle(color: Colors.grey))),
            ElevatedButton(
              onPressed: () {
                final w = double.tryParse(_weightController.text);
                if (w != null) data.addWeight(w);
                Navigator.pop(context);
              },
              style: ElevatedButton.styleFrom(minimumSize: const Size(120, 56)),
              child: const Text("SAVE PROGRESS"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final data = Provider.of<DataProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text("BIO MATRIX")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 1. Hero Stat & Trend
            _buildHeroTrend(data, theme),

            const SizedBox(height: 32),

            // 2. Metric Grid
            Row(
              children: [
                Expanded(child: _buildMatrixTile("BMI", "24.2", LucideIcons.activity, const Color(0xFF10B981))),
                const SizedBox(width: 16),
                Expanded(child: _buildMatrixTile("BODY FAT", "18.5%", LucideIcons.flame, Colors.orange)),
              ],
            ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.1),

            const SizedBox(height: 16),

            Row(
              children: [
                Expanded(child: _buildMatrixTile("WAIST", "32 in", LucideIcons.ruler, Colors.blue)),
                const SizedBox(width: 16),
                Expanded(child: _buildMatrixTile("MUSCLE", "34 kg", LucideIcons.dumbbell, Colors.purple)),
              ],
            ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),

            const SizedBox(height: 40),

            // 3. Log Button
            ElevatedButton(
              onPressed: _showLogWeightDialog,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                minimumSize: const Size.fromHeight(64),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(LucideIcons.scale, size: 20),
                  SizedBox(width: 12),
                  Text("UPDATE BIOMETRICS", style: TextStyle(letterSpacing: 1)),
                ],
              ),
            ).animate().fadeIn(delay: 700.ms).scale(),

            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroTrend(DataProvider data, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(36),
        border: Border.all(color: Colors.grey.shade900),
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
                  const Text("CURRENT WEIGHT", style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.5)),
                  const SizedBox(height: 8),
                  Text("${data.currentWeight} kg", style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Colors.white)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: const Color(0xFF10B981).withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                child: const Text("-1.2 kg this week", style: TextStyle(color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 32),
          
          // Bespoke Trend Line (Custom Painter)
          SizedBox(
            height: 120,
            width: double.infinity,
            child: CustomPaint(
              painter: TrendLinePainter(data.weightHistory.map((e) => e.value).toList()),
            ),
          ),
          
          const SizedBox(height: 16),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("MON", style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text("WED", style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text("FRI", style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
              Text("SUN", style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    ).animate().fadeIn().slideY(begin: 0.1);
  }

  Widget _buildMatrixTile(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 20, color: color),
          const SizedBox(height: 16),
          Text(value, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white)),
          Text(label, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1)),
        ],
      ),
    );
  }
}

class TrendLinePainter extends CustomPainter {
  final List<double> weights;
  TrendLinePainter(this.weights);

  @override
  void paint(Canvas canvas, Size size) {
    if (weights.length < 2) return;

    final paint = Paint()
      ..color = const Color(0xFF10B981)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3
      ..strokeCap = StrokeCap.round;

    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          const Color(0xFF10B981).withOpacity(0.2),
          const Color(0xFF10B981).withOpacity(0.0),
        ],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    final path = Path();
    final fillPath = Path();

    double minW = weights.reduce((a, b) => a < b ? a : b) - 0.5;
    double maxW = weights.reduce((a, b) => a > b ? a : b) + 0.5;
    double range = maxW - minW;

    double dx = size.width / (weights.length - 1);
    
    path.moveTo(0, size.height - ((weights[0] - minW) / range) * size.height);
    fillPath.moveTo(0, size.height);
    fillPath.lineTo(0, size.height - ((weights[0] - minW) / range) * size.height);

    for (int i = 1; i < weights.length; i++) {
       double x = i * dx;
       double y = size.height - ((weights[i] - minW) / range) * size.height;
       
       // Cubic Bezier for segments? No, let's just do smooth lines for now or quad
       path.lineTo(x, y);
       fillPath.lineTo(x, y);
    }

    fillPath.lineTo(size.width, size.height);
    fillPath.close();

    canvas.drawPath(fillPath, fillPaint);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

