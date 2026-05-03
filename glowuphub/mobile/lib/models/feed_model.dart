import 'habit_model.dart';

class DailyRitual {
  final String type;
  final String content;
  final List<String> tags;

  DailyRitual({
    required this.type,
    required this.content,
    required this.tags,
  });

  factory DailyRitual.fromJson(Map<String, dynamic> json) {
    return DailyRitual(
      type: json['type'] ?? 'Morning',
      content: json['content'] ?? '',
      tags: (json['tags'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }
}

class Testimonial {
  final String content;
  final String author;

  Testimonial({required this.content, required this.author});

  factory Testimonial.fromJson(Map<String, dynamic> json) {
    return Testimonial(
      content: json['content'] ?? '',
      author: json['author'] ?? 'Anonymous',
    );
  }
}

class Feed {
  final String greeting;
  final String phase;
  final String identityFocus;
  final DailyRitual ritual;
  final List<Habit> habits;
  final Testimonial? testimonial;

  Feed({
    required this.greeting,
    required this.phase,
    required this.identityFocus,
    required this.ritual,
    required this.habits,
    this.testimonial,
  });

  factory Feed.fromJson(Map<String, dynamic> json) {
    return Feed(
      greeting: json['greeting'] ?? 'Hello',
      phase: json['phase'] ?? 'ADAPTING',
      identityFocus: json['identityFocus'] ?? '',
      ritual: DailyRitual.fromJson(json['ritual'] ?? {}),
      habits: (json['habits'] as List<dynamic>?)
              ?.map((e) => Habit.fromJson(e))
              .toList() ??
          [],
      testimonial: json['testimonial'] != null
          ? Testimonial.fromJson(json['testimonial'])
          : null,
    );
  }
}
