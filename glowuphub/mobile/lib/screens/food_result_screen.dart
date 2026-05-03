import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/data_provider.dart';

class FoodResultScreen extends StatelessWidget {
  final Map<String, dynamic>? foodData;
  const FoodResultScreen({super.key, this.foodData});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dataProvider = Provider.of<DataProvider>(context, listen: false);

    // Use passed data or defaults
    final macros = {
      'calories': foodData?['calories'] ?? 450,
      'protein': foodData?['protein'] ?? 32,
      'carbs': foodData?['carbs'] ?? 40,
      'fat': foodData?['fat'] ?? 12,
    };
    final foodName = foodData?['name'] ?? "Grilled Chicken Salad";
    const quality = "High Protein";

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(LucideIcons.x, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("ANALYSIS"),
        backgroundColor: Colors.black,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image Placeholder
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: const Color(0xFF111111),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.grey.shade900),
              ),
              child: const Center(
                child: Icon(LucideIcons.image, size: 48, color: Colors.grey),
              ),
            ),
            const SizedBox(height: 24),

            // Food Title & Quality
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      foodName,
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      "Identified via search",
                      style: TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text(
                    quality,
                    style: TextStyle(
                      color: Color(0xFF10B981),
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),

            // Macros Grid
            Row(
              children: [
                _buildMacroCard(theme, "CALORIES", "${macros['calories']}", Colors.white, true),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    children: [
                      _buildMacroCard(theme, "PROTEIN", "${macros['protein']}g", const Color(0xFF10B981), false),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(child: _buildMacroCard(theme, "CARBS", "${macros['carbs']}g", Colors.orange, false)),
                          const SizedBox(width: 12),
                          Expanded(child: _buildMacroCard(theme, "FAT", "${macros['fat']}g", Colors.blue, false)),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ).animate().slideY(begin: 0.1, duration: 400.ms, curve: Curves.easeOut),

            const SizedBox(height: 32),

            // Suggestion
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF111111),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.grey.shade900),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(LucideIcons.sparkles, size: 16, color: Colors.orange),
                      const SizedBox(width: 8),
                      Text("COACH TIP", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.0, color: Colors.grey, fontSize: 10)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Great source of lean protein. Consider adding some avocado for healthy fats next time.",
                    style: TextStyle(height: 1.5, color: Colors.grey, fontSize: 14),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
            
            ElevatedButton(
              onPressed: () {
                dataProvider.addMeal(
                  foodName, 
                  macros['calories']! as int, 
                  macros['protein']! as int, 
                  macros['carbs']! as int, 
                  macros['fat']! as int
                );
                Navigator.pop(context); // Back to food screen
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
                minimumSize: const Size.fromHeight(56),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text("CONFIRM & LOG", style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMacroCard(ThemeData theme, String label, String value, Color color, bool isLarge) {
    return Container(
      width: isLarge ? 140 : null,
      height: isLarge ? 160 : 74,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: isLarge ? CrossAxisAlignment.start : CrossAxisAlignment.center,
        children: [
          Text(
            label,
            style: const TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: isLarge ? 8 : 4),
          Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: isLarge ? 32 : 18,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

