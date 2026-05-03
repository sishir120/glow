import 'identity_model.dart';

class User {
  final String id;
  final String name;
  final String email;
  final int glowScore;
  final String onboardingStage; // "NEW", "COMPLETED"
  final String currentPhase; // "ADAPTING"
  final List<IdentityStatement> identityStatements;
  
  // New Profile Fields
  final String? gender;
  final int? age;
  final double? height;
  final double? currentWeight;
  final String? goal;
  final String? activityLevel;
  
  // Phase 3: Subscription
  final String subscription; // "FREE", "PREMIUM"
  final String? coachName;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.glowScore = 85,
    this.onboardingStage = 'NEW',
    this.currentPhase = 'ADAPTING',
    this.identityStatements = const [],
    this.gender,
    this.age,
    this.height,
    this.currentWeight,
    this.goal,
    this.activityLevel,
    this.subscription = 'FREE',
    this.coachName,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      glowScore: json['glowScore'] ?? 85,
      onboardingStage: json['onboardingStage'] ?? 'NEW',
      currentPhase: json['currentPhase'] ?? 'ADAPTING',
      identityStatements: (json['identityStatements'] as List<dynamic>?)
              ?.map((e) => IdentityStatement.fromJson(e))
              .toList() ??
          [],
      gender: json['gender'],
      age: json['age'],
      height: (json['height'] as num?)?.toDouble(),
      currentWeight: (json['currentWeight'] as num?)?.toDouble(),
      goal: json['goal'],
      activityLevel: json['activityLevel'],
      subscription: json['subscription'] ?? 'FREE',
      coachName: json['coachName'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'glowScore': glowScore,
      'onboardingStage': onboardingStage,
      'currentPhase': currentPhase,
      'identityStatements': identityStatements.map((e) => e.toJson()).toList(),
      'gender': gender,
      'age': age,
      'height': height,
      'currentWeight': currentWeight,
      'goal': goal,
      'activityLevel': activityLevel,
      'subscription': subscription,
      'coachName': coachName,
    };
  }
}
