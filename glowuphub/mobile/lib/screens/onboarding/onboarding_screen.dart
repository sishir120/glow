import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../providers/auth_provider.dart';
import 'package:go_router/go_router.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  
  // Form State
  double _height = 170;
  double _weight = 70;
  int _age = 25;
  String? _gender;
  String? _goal;
  String? _activity;

  final List<String> _genders = ["Male", "Female", "Non-Binary"];
  final List<String> _goals = ["Lean Muscle", "Weight Loss", "Performance", "Longevity"];
  final List<String> _activities = ["Sedentary", "Active", "Highly Active", "Pro Elite"];

  final int _totalSteps = 6;

  void _nextPage() {
    if (_currentPage == 3 && _gender == null) return;
    if (_currentPage == 4 && _goal == null) return;
    if (_currentPage == 5 && _activity == null) return;

    if (_currentPage < _totalSteps - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 600), 
        curve: Curves.easeOutQuart
      );
    } else {
      _finishOnboarding();
    }
  }

  void _finishOnboarding() async {
     final auth = Provider.of<AuthProvider>(context, listen: false);
     auth.updateOnboardingData({
       'height': _height,
       'weight': _weight,
       'age': _age,
       'gender': _gender,
       'goal': _goal,
       'activityLevel': _activity,
     });
     await auth.completeOnboarding();
     if (mounted) context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // 1. Background Glow
          Positioned(
            top: -50,
            left: -50,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: theme.colorScheme.tertiary.withOpacity(0.1),
              ),
            ).animate(onPlay: (c) => c.repeat(reverse: true)).scale(begin: const Offset(1,1), end: const Offset(1.3, 1.3), duration: 4.seconds),
          ),

          SafeArea(
            child: Column(
              children: [
                // Top Progress Label
                Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Row(
                    children: [
                      const Text("PROFILE SETUP", style: TextStyle(color: Colors.grey, letterSpacing: 3, fontSize: 10, fontWeight: FontWeight.w900)),
                      const Spacer(),
                      Text("${_currentPage + 1} / $_totalSteps", style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900)),
                    ],
                  ),
                ),
                
                // Fine Progress Bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: LinearProgressIndicator(
                    value: (_currentPage + 1) / _totalSteps,
                    backgroundColor: Colors.grey.shade900,
                    valueColor: const AlwaysStoppedAnimation(Colors.white),
                    minHeight: 2,
                  ),
                ),
                
                Expanded(
                  child: PageView(
                    controller: _pageController,
                    physics: const NeverScrollableScrollPhysics(),
                    onPageChanged: (p) => setState(() => _currentPage = p),
                    children: [
                      _buildSliderStep("METRIC HEIGHT", "${_height.round()}", "cm", 140, 220, _height, (v) => setState(() => _height = v)),
                      _buildSliderStep("CURRENT MASS", "${_weight.round()}", "kg", 40, 180, _weight, (v) => setState(() => _weight = v)),
                      _buildCounterStep("BIOLOGICAL AGE", "$_age", 18, 99, _age, (v) => setState(() => _age = v)),
                      _buildSelectionStep("GENDER IDENTITY", _genders, _gender, (v) => setState(() => _gender = v)),
                      _buildSelectionStep("PRIMARY OBJECTIVE", _goals, _goal, (v) => setState(() => _goal = v)),
                      _buildSelectionStep("ACTIVITY INTENSITY", _activities, _activity, (v) => setState(() => _activity = v)),
                    ],
                  ).animate().fadeIn(duration: 800.ms),
                ),
                
                Padding(
                  padding: const EdgeInsets.all(32),
                  child: ElevatedButton(
                    onPressed: _nextPage,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.black,
                      minimumSize: const Size.fromHeight(64),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                    ),
                    child: Text(
                      _currentPage == _totalSteps - 1 ? "ENTER DASHBOARD" : "CONTINUE",
                      style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSliderStep(String title, String value, String unit, double min, double max, double current, Function(double) onChanged) {
    return Padding(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
          const SizedBox(height: 48),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(value, style: const TextStyle(fontSize: 80, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -2)),
              const SizedBox(width: 8),
              Text(unit, style: const TextStyle(fontSize: 20, color: Colors.grey, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 64),
          Slider(
            value: current,
            min: min,
            max: max,
            activeColor: Colors.white,
            inactiveColor: Colors.grey.shade900,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }

  Widget _buildCounterStep(String title, String value, int min, int max, int current, Function(int) onChanged) {
     return Padding(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
          const SizedBox(height: 64),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                onTap: () => onChanged((current - 1).clamp(min, max)),
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: Colors.grey.shade900)),
                  child: const Icon(LucideIcons.minus, color: Colors.white),
                ),
              ),
              const SizedBox(width: 48),
              Text(value, style: const TextStyle(fontSize: 80, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -2)),
              const SizedBox(width: 48),
              GestureDetector(
                onTap: () => onChanged((current + 1).clamp(min, max)),
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: Colors.grey.shade900)),
                  child: const Icon(LucideIcons.plus, color: Colors.white),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSelectionStep(String title, List<String> options, String? selected, Function(String) onSelect) {
     return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
           Text(title, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
           const SizedBox(height: 48),
           ...options.map((opt) => Padding(
             padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 8),
             child: InkWell(
               onTap: () => onSelect(opt),
               borderRadius: BorderRadius.circular(24),
               child: AnimatedContainer(
                 duration: 300.ms,
                 padding: const EdgeInsets.all(24),
                 decoration: BoxDecoration(
                   color: selected == opt ? Colors.white : const Color(0xFF0A0A0A),
                   borderRadius: BorderRadius.circular(24),
                   border: Border.all(color: selected == opt ? Colors.white : Colors.grey.shade900),
                 ),
                 child: Center(
                   child: Text(
                     opt.toUpperCase(),
                     style: TextStyle(
                       color: selected == opt ? Colors.black : Colors.white,
                       fontWeight: FontWeight.w900,
                       fontSize: 14,
                       letterSpacing: 1,
                     ),
                   ),
                 ),
               ),
             ),
           )).toList(),
        ],
      );
  }
}

