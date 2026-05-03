import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/feed_model.dart';
import '../models/habit_model.dart';

class FeedService {
  // Use 10.0.2.2 for Android emulator, localhost for iOS simulator
  static const String _baseUrl = 'http://10.0.2.2:3000/api'; 

  Future<Feed> getDailyFeed(String token) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/feed'),
        headers: {'Authorization': 'Bearer $token'},
      ).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        return Feed.fromJson(jsonDecode(response.body));
      } else {
        throw Exception('Failed to load feed');
      }
    } catch (e) {
      print('FeedService Error: $e');
      // Fallback to Mock Data for Development/Demo
      return _getMockFeed();
    }
  }

  Feed _getMockFeed() {
    return Feed(
      greeting: 'Good morning, GlowUp',
      phase: 'ADAPTING',
      identityFocus: 'I am becoming the best version of myself.',
      ritual: DailyRitual(
        type: 'Morning',
        content: 'Today is about showing up. You don\'t need to be perfect, you just need to be present.',
        tags: ['Consistency', 'Identity'],
      ),
      habits: [
        Habit(
          id: '1',
          trigger: 'After I wake up',
          action: 'Drink a glass of water',
          isCompletedToday: false,
        ),
        Habit(
          id: '2',
          trigger: 'After work',
          action: '10 min walk',
          isCompletedToday: true,
          streak: 3,
        ),
      ],
      testimonial: Testimonial(
        content: "I didn't believe I could change until I started tracking the small wins.",
        author: "Community Member",
      ),
    );
  }
}
