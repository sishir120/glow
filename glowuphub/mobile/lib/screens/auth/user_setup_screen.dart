import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';

class UserSetupScreen extends StatefulWidget {
  const UserSetupScreen({super.key});

  @override
  State<UserSetupScreen> createState() => _UserSetupScreenState();
}

class _UserSetupScreenState extends State<UserSetupScreen> {
  int _currentStep = 0;
  final int _totalSteps = 5;

  // Data
  String? _gender;
  int _age = 25;
  bool _isImperial = false;
  double _height = 170; // cm
  double _weight = 70; // kg
  String? _goal; // 'LOSE', 'MAINTAIN', 'GAIN'
  String? _activity; // 'SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE'

  void _nextStep() {
    if (_currentStep < _totalSteps - 1) {
      setState(() => _currentStep++);
    } else {
      _saveAndFinish();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  Future<void> _saveAndFinish() async {
    final profileData = {
      'gender': _gender,
      'age': _age,
      'height': _height,
      'currentWeight': _weight,
      'goal': _goal,
      'activityLevel': _activity,
    };
    
    context.read<AuthProvider>().setProvisionalProfile(profileData);

    if (mounted) context.go('/register');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      body: SafeArea(
        child: Column(
          children: [
            // Progress Bar
            LinearProgressIndicator(
              value: (_currentStep + 1) / _totalSteps,
              backgroundColor: const Color(0xFF18181B),
              color: const Color(0xFF10B981),
              minHeight: 4,
            ),
            
            // Back Button
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  if (_currentStep > 0)
                    IconButton(
                      icon: const Icon(LucideIcons.arrow_left, color: Colors.white),
                      onPressed: _previousStep,
                    ),
                  const Spacer(),
                  Text(
                    'STEP ${_currentStep + 1} OF $_totalSteps',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.3),
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.5,
                    ),
                  ),
                ],
              ),
            ),

            // Content Area
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: _buildCurrentStep(),
              ),
            ),

            // Bottom Action Bar
            Padding(
              padding: const EdgeInsets.all(32),
              child: SizedBox(
                width: double.infinity,
                height: 64,
                child: ElevatedButton(
                  onPressed: _canProceed() ? _nextStep : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.black,
                    disabledBackgroundColor: const Color(0xFF18181B),
                    disabledForegroundColor: Colors.white.withOpacity(0.2),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    elevation: 0,
                  ),
                  child: Text(
                    _currentStep == _totalSteps - 1 ? 'FINISH SETUP' : 'CONTINUE',
                    style: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1.5),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  bool _canProceed() {
    switch (_currentStep) {
      case 0: return _gender != null;
      case 1: return true; // Age always has a value
      case 2: return true; // Stats always have values
      case 3: return _goal != null;
      case 4: return _activity != null;
      default: return false;
    }
  }

  Widget _buildCurrentStep() {
    switch (_currentStep) {
      case 0: return _buildGenderStep();
      case 1: return _buildAgeStep();
      case 2: return _buildStatsStep();
      case 3: return _buildGoalStep();
      case 4: return _buildActivityStep();
      default: return const SizedBox();
    }
  }

  // --- Step 1: Gender ---
  Widget _buildGenderStep() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildHeader('Identify yourself', 'This helps us calculate your metabolic rate.'),
        const SizedBox(height: 48),
        _buildSelectableCard('Male', LucideIcons.user, _gender == 'M', () => setState(() => _gender = 'M')),
        const SizedBox(height: 16),
        _buildSelectableCard('Female', LucideIcons.user, _gender == 'F', () => setState(() => _gender = 'F')),
      ],
    );
  }

  // --- Step 2: Age ---
  Widget _buildAgeStep() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildHeader('How young are you?', 'Age impacts your daily nutritional needs.'),
        const SizedBox(height: 64),
        Container(
          height: 200,
          decoration: BoxDecoration(
             color: const Color(0xFF18181B),
             borderRadius: BorderRadius.circular(30),
             border: Border.all(color: Colors.white.withOpacity(0.05)),
          ),
          child: ListWheelScrollView.useDelegate(
            itemExtent: 60,
            perspective: 0.005,
            diameterRatio: 1.2,
            physics: const FixedExtentScrollPhysics(),
            onSelectedItemChanged: (index) => setState(() => _age = index + 15),
            childDelegate: ListWheelChildBuilderDelegate(
              childCount: 85, // 15 to 99
              builder: (context, index) {
                final val = index + 15;
                final isSelected = val == _age;
                return Center(
                  child: Text(
                    '$val',
                    style: TextStyle(
                      fontSize: isSelected ? 48 : 24,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      color: isSelected ? const Color(0xFF10B981) : Colors.white.withOpacity(0.2),
                    ),
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  // --- Step 3: Stats ---
  Widget _buildStatsStep() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
         _buildHeader('Current Stats', 'We use this to establish your baseline.'),
         const SizedBox(height: 32),
         
         // Unit Toggle
         Row(
           mainAxisAlignment: MainAxisAlignment.center,
           children: [
             _buildUnitToggle('Metric', !_isImperial, () => setState(() => _isImperial = false)),
             const SizedBox(width: 16),
             _buildUnitToggle('Imperial', _isImperial, () => setState(() => _isImperial = true)),
           ],
         ),
         const SizedBox(height: 48),

         // Height
         Text('HEIGHT', style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
         const SizedBox(height: 16),
         Row(
           mainAxisAlignment: MainAxisAlignment.center,
           crossAxisAlignment: CrossAxisAlignment.baseline,
           textBaseline: TextBaseline.alphabetic,
           children: [
             Text(
               _isImperial ? (_height / 2.54).round().toString() : _height.round().toString(),
               style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white),
             ),
             const SizedBox(width: 8),
             Text(
               _isImperial ? 'in' : 'cm',
               style: const TextStyle(fontSize: 16, color: Color(0xFF10B981), fontWeight: FontWeight.bold),
             ),
           ],
         ),
         Slider(
           value: _height,
           min: 140,
           max: 220,
           activeColor: const Color(0xFF10B981),
           inactiveColor: const Color(0xFF27272A),
           onChanged: (val) => setState(() => _height = val),
         ),

         const SizedBox(height: 48),

         // Weight
         Text('WEIGHT', style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
         const SizedBox(height: 16),
          Row(
           mainAxisAlignment: MainAxisAlignment.center,
           crossAxisAlignment: CrossAxisAlignment.baseline,
           textBaseline: TextBaseline.alphabetic,
           children: [
             Text(
               _isImperial ? (_weight * 2.205).round().toString() : _weight.round().toString(),
               style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white),
             ),
             const SizedBox(width: 8),
             Text(
               _isImperial ? 'lbs' : 'kg',
               style: const TextStyle(fontSize: 16, color: Color(0xFF10B981), fontWeight: FontWeight.bold),
             ),
           ],
         ),
         Slider(
           value: _weight,
           min: 40,
           max: 150,
           activeColor: const Color(0xFF10B981),
           inactiveColor: const Color(0xFF27272A),
           onChanged: (val) => setState(() => _weight = val),
         ),
      ],
    );
  }

  // --- Step 4: Goal ---
  Widget _buildGoalStep() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildHeader('What is your focus?', 'We will tailor your plan to this objective.'),
        const SizedBox(height: 48),
        _buildSelectableCard('Lose Weight', LucideIcons.trending_down, _goal == 'LOSE', () => setState(() => _goal = 'LOSE')),
        const SizedBox(height: 16),
        _buildSelectableCard('Maintain', LucideIcons.minus, _goal == 'MAINTAIN', () => setState(() => _goal = 'MAINTAIN')),
        const SizedBox(height: 16),
        _buildSelectableCard('Gain Muscle', LucideIcons.trending_up, _goal == 'GAIN', () => setState(() => _goal = 'GAIN')),
      ],
    );
  }

  // --- Step 5: Activity ---
  Widget _buildActivityStep() {
     return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildHeader('Activity Level', 'Be honest. This drives your calorie target.'),
        const SizedBox(height: 32),
        _buildSelectableCard('Sedentary (Desk Job)', LucideIcons.armchair, _activity == 'SEDENTARY', () => setState(() => _activity = 'SEDENTARY')),
        const SizedBox(height: 16),
        _buildSelectableCard('Lightly Active', LucideIcons.footprints, _activity == 'LIGHT', () => setState(() => _activity = 'LIGHT')),
        const SizedBox(height: 16),
        _buildSelectableCard('Moderately Active', LucideIcons.dumbbell, _activity == 'MODERATE', () => setState(() => _activity = 'MODERATE')),
        const SizedBox(height: 16),
        _buildSelectableCard('Very Active', LucideIcons.zap, _activity == 'ACTIVE', () => setState(() => _activity = 'ACTIVE')),
      ],
    );
  }

  // --- Helper Widgets ---

  Widget _buildHeader(String title, String subtitle) {
    return Column(
      children: [
        Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: -0.5)),
        const SizedBox(height: 12),
        Text(subtitle, textAlign: TextAlign.center, style: TextStyle(fontSize: 16, color: Colors.white.withOpacity(0.5), height: 1.4)),
      ],
    );
  }

  Widget _buildSelectableCard(String title, IconData icon, bool isSelected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF10B981) : const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? const Color(0xFF10B981) : Colors.white.withOpacity(0.05),
            width: 2,
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: isSelected ? Colors.black : Colors.white, size: 24),
            const SizedBox(width: 16),
            Text(
              title,
              style: TextStyle(
                color: isSelected ? Colors.black : Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const Spacer(),
            if (isSelected)
              const Icon(LucideIcons.check, color: Colors.black, size: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildUnitToggle(String text, bool isActive, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: isActive ? Colors.white : const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: isActive ? Colors.white : Colors.white.withOpacity(0.1)),
        ),
        child: Text(
          text,
          style: TextStyle(
            color: isActive ? Colors.black : Colors.white.withOpacity(0.5),
            fontWeight: FontWeight.bold,
            fontSize: 12,
          ),
        ),
      ),
    );
  }
}
