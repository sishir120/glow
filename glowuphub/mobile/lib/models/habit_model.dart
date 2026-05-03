class Habit {
  final String id;
  final String trigger;
  final String action;
  final String reward;
  final bool isCompletedToday;
  final int streak;

  Habit({
    required this.id,
    required this.trigger,
    required this.action,
    this.reward = '',
    this.isCompletedToday = false,
    this.streak = 0,
  });

  factory Habit.fromJson(Map<String, dynamic> json) {
    return Habit(
      id: json['id'] ?? '',
      trigger: json['trigger'] ?? '',
      action: json['action'] ?? '',
      reward: json['reward'] ?? '',
      isCompletedToday: json['isCompletedToday'] ?? false,
      streak: json['streak'] ?? 0,
    );
  }
}
