import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/data_provider.dart';
import 'food_result_screen.dart';

class FoodScreen extends StatefulWidget {
  const FoodScreen({super.key});

  @override
  State<FoodScreen> createState() => _FoodScreenState();
}

class _FoodScreenState extends State<FoodScreen> {
  final TextEditingController _searchController = TextEditingController();

  void _showSearchDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF0A0A0A),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28), side: BorderSide(color: Colors.grey.shade900)),
        title: const Text("Search Database", style: TextStyle(fontWeight: FontWeight.w900, color: Colors.white)),
        content: TextField(
          controller: _searchController,
          autofocus: true,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: "What did you eat?",
            hintStyle: TextStyle(color: Colors.grey.shade700),
            filled: true,
            fillColor: Colors.black,
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide(color: Colors.grey.shade900)),
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("CLOSE", style: TextStyle(color: Colors.grey))),
          ElevatedButton(
            onPressed: () {
              final q = _searchController.text;
              Navigator.pop(context);
              _processSearch(q);
            },
            style: ElevatedButton.styleFrom(minimumSize: const Size(100, 48)),
            child: const Text("SEARCH"),
          ),
        ],
      ),
    );
  }

  void _processSearch(String q) {
     if (q.isEmpty) return;
     Navigator.push(context, MaterialPageRoute(builder: (context) => FoodResultScreen(foodData: {
       "name": q.toUpperCase(),
       "calories": 280,
       "protein": 22,
       "carbs": 35,
       "fat": 8,
     })));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final data = Provider.of<DataProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text("NUTRITION")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            // 1. Daily Macro Dashboard
            _buildMacroDashboard(data, theme),

            const SizedBox(height: 32),

            // 2. Action Tiles
            _buildActionTile(LucideIcons.camera, "LOG WITH CAMERA", "Instant AI nutrient analysis", Colors.white, () {}),
            const SizedBox(height: 16),
            _buildActionTile(LucideIcons.search, "SEARCH DATABASE", "Choose from 1M+ verified entries", const Color(0xFF10B981), _showSearchDialog),

            const SizedBox(height: 48),

            // 3. History
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("RECENT MEALS", style: TextStyle(color: Colors.grey, fontWeight: FontWeight.w900, letterSpacing: 1.5, fontSize: 10)),
                TextButton(onPressed: () {}, child: const Text("SEE ALL", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold))),
              ],
            ),
            const SizedBox(height: 12),
            if (data.meals.isEmpty)
              _buildEmptyHistory()
            else
              ...data.meals.take(4).map((m) => _buildMealItem(m, theme)),
          ],
        ),
      ),
    );
  }

  Widget _buildMacroDashboard(DataProvider data, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: const Color(0xFF111111),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("CALORIES LEFT", style: theme.textTheme.labelLarge?.copyWith(fontSize: 9, color: Colors.grey)),
                  const SizedBox(height: 4),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text("${2200 - data.totalCalories}", style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Colors.white)),
                      const SizedBox(width: 4),
                      const Text("kcal", style: TextStyle(color: Colors.grey, fontSize: 14)),
                    ],
                  ),
                ],
              ),
              const Icon(LucideIcons.flame, color: Colors.orange, size: 28),
            ],
          ),
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildMacroProgress("P", data.totalProtein, 150, const Color(0xFF10B981)),
              _buildMacroProgress("C", data.totalCarbs, 200, Colors.orange),
              _buildMacroProgress("F", data.totalFat, 70, Colors.blue),
            ],
          ),
        ],
      ),
    ).animate().fadeIn().scale(begin: const Offset(0.95, 0.95));
  }

  Widget _buildMacroProgress(String label, int current, int target, Color color) {
    final progress = (current / target).clamp(0.0, 1.0);
    return Column(
      children: [
        SizedBox(
          height: 80,
          width: 6,
          child: Stack(
            alignment: Alignment.bottomCenter,
            children: [
              Container(decoration: BoxDecoration(color: Colors.grey.shade900, borderRadius: BorderRadius.circular(3))),
              FractionallySizedBox(
                heightFactor: progress,
                child: Container(decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(3))),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 10, color: Colors.white)),
        Text("$current / $target", style: const TextStyle(color: Colors.grey, fontSize: 8)),
      ],
    );
  }

  Widget _buildActionTile(IconData icon, String title, String sub, Color accent, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xFF0A0A0A),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.grey.shade900),
        ),
        child: Row(
          children: [
            Container(
               padding: const EdgeInsets.all(12),
               decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(16)),
               child: Icon(icon, color: accent, size: 24),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 15, letterSpacing: 0.5, color: Colors.white)),
                  const SizedBox(height: 4),
                  Text(sub, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
            ),
            const Icon(LucideIcons.chevron_right, color: Colors.grey, size: 18),
          ],
        ),
      ),
    ).animate().fadeIn().slideX(begin: 0.1);
  }

  Widget _buildMealItem(m, theme) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0A0A0A),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.grey.shade900),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(color: Colors.black, borderRadius: BorderRadius.circular(12)),
            child: const Icon(LucideIcons.utensils, color: Colors.grey, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(m.name, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                Text("${m.calories} kcal • ${m.protein}g Protein", style: const TextStyle(color: Colors.grey, fontSize: 11)),
              ],
            ),
          ),
          const Text("12:45 PM", style: TextStyle(color: Colors.grey, fontSize: 10)),
        ],
      ),
    );
  }

  Widget _buildEmptyHistory() {
     return Center(
       child: Padding(
         padding: const EdgeInsets.all(32),
         child: Column(
           children: [
             Icon(LucideIcons.cookie, size: 40, color: Colors.grey.shade900),
             const SizedBox(height: 16),
             const Text("No meals logged yet", style: TextStyle(color: Colors.grey, fontSize: 12)),
           ],
         ),
       ),
     );
  }
}
