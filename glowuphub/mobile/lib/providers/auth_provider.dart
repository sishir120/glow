import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../models/user_model.dart';
import '../models/identity_model.dart';

class AuthProvider extends ChangeNotifier {
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  User? _user;
  bool _isLoading = true;
  
  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;

  // Temporary storage for Onboarding Flow
  final Map<String, dynamic> _onboardingData = {};

  AuthProvider() {
    _loadUser();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user_profile');
    
    if (userJson != null) {
      try {
        _user = User.fromJson(jsonDecode(userJson));
      } catch (e) {
        print("Error loading user profile: $e");
      }
    }
    _isLoading = false;
    notifyListeners();
  }

  // Called step-by-step during onboarding
  void updateOnboardingData(Map<String, dynamic> data) {
    _onboardingData.addAll(data);
    notifyListeners();
  }

  // Finalize onboarding and create user
  Future<void> completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Create a new Mock User with the collected data
    final newUser = User(
      id: 'mock_user_${DateTime.now().millisecondsSinceEpoch}',
      name: 'New Member', // Would come from Google Auth in real flow
      email: 'member@example.com',
      glowScore: 0,
      onboardingStage: 'COMPLETED',
      height: _onboardingData['height'],
      currentWeight: _onboardingData['weight'],
      age: _onboardingData['age'],
      gender: _onboardingData['gender'],
      goal: _onboardingData['goal'],
      activityLevel: _onboardingData['activityLevel'],
    );

    _user = newUser;
    await prefs.setString('user_profile', jsonEncode(newUser.toJson()));
    notifyListeners();
  }

  Future<void> signInWithGoogle() async {
    // In this Mock version, we just bypass Google Auth for now 
    // or simulate it to get a name/email, then start onboarding.
    // For V1 "Mock Mode", we assume user clicks "Start" and goes to Onboarding.
    notifyListeners();
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user_profile');
    await _googleSignIn.signOut();
    _user = null;
    _onboardingData.clear();
    notifyListeners();
  }
}
