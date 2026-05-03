import 'package:flutter/material.dart';

class LoggedMeal {
  final String id;
  final String name;
  final int calories;
  final int protein;
  final int carbs;
  final int fat;
  final DateTime timestamp;

  LoggedMeal({
    required this.id,
    required this.name,
    required this.calories,
    required this.protein,
    required this.carbs,
    required this.fat,
    required this.timestamp,
  });
}

class WeightEntry {
  final double value;
  final DateTime date;

  WeightEntry({required this.value, required this.date});
}

class DataProvider extends ChangeNotifier {
  // --- Nutrition ---
  final List<LoggedMeal> _meals = [];
  List<LoggedMeal> get meals => _meals;

  int get totalCalories => _meals.fold(0, (sum, item) => sum + item.calories);
  int get totalProtein => _meals.fold(0, (sum, item) => sum + item.protein);
  int get totalCarbs => _meals.fold(0, (sum, item) => sum + item.carbs);
  int get totalFat => _meals.fold(0, (sum, item) => sum + item.fat);

  void addMeal(String name, int cals, int p, int c, int f) {
    _meals.insert(0, LoggedMeal(
      id: DateTime.now().toString(),
      name: name,
      calories: cals,
      protein: p,
      carbs: c,
      fat: f,
      timestamp: DateTime.now(),
    ));
    notifyListeners();
  }

  // --- Hydration ---
  int _waterOunces = 0;
  int get waterOunces => _waterOunces;
  void addWater(int oz) {
    _waterOunces += oz;
    notifyListeners();
  }

  // --- Weight History ---
  final List<WeightEntry> _weightHistory = [
    WeightEntry(value: 75.5, date: DateTime.now().subtract(const Duration(days: 6))),
    WeightEntry(value: 75.2, date: DateTime.now().subtract(const Duration(days: 5))),
    WeightEntry(value: 75.0, date: DateTime.now().subtract(const Duration(days: 4))),
    WeightEntry(value: 74.8, date: DateTime.now().subtract(const Duration(days: 3))),
    WeightEntry(value: 74.6, date: DateTime.now().subtract(const Duration(days: 2))),
    WeightEntry(value: 74.5, date: DateTime.now().subtract(const Duration(days: 1))),
    WeightEntry(value: 74.2, date: DateTime.now()),
  ];

  List<WeightEntry> get weightHistory => _weightHistory;
  double get currentWeight => _weightHistory.last.value;

  void addWeight(double value) {
    _weightHistory.add(WeightEntry(value: value, date: DateTime.now()));
    notifyListeners();
  }

  // --- Habits ---
  final Map<String, bool> _habitStatus = {
    'water': false,
    'walk': true,
    'sugar': false,
    'read': false,
    'sleep': false,
  };
  bool isHabitCompleted(String id) => _habitStatus[id] ?? false;

  void toggleHabit(String id) {
    _habitStatus[id] = !isHabitCompleted(id);
    notifyListeners();
  }

  int get completedHabitsCount => _habitStatus.values.where((v) => v).length;
  int get totalHabitsCount => _habitStatus.length;

  // --- Glow Score (Ultimate Metric) ---
  // Calculates a score from 0-100 based on habits, nutrition, and workout status
  double get glowScore {
    double habitScore = (completedHabitsCount / totalHabitsCount) * 100;
    double nutritionScore = (totalCalories > 0) ? 100 : 0;
    double hydrationScore = (_waterOunces >= 64) ? 100 : (_waterOunces / 64) * 100;
    
    return (habitScore * 0.4 + nutritionScore * 0.4 + hydrationScore * 0.2).clamp(0, 100);
  }
}
