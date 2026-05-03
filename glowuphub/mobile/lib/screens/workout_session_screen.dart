import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'workout_complete_screen.dart';

class WorkoutSessionScreen extends StatefulWidget {
  final Map<String, dynamic> workout;
  const WorkoutSessionScreen({super.key, required this.workout});

  @override
  State<WorkoutSessionScreen> createState() => _WorkoutSessionScreenState();
}

class _WorkoutSessionScreenState extends State<WorkoutSessionScreen> {
  int _currentIndex = 0;
  bool _isResting = false;
  Timer? _timer;
  int _secondsRemaining = 45;
  bool _timerPaused = false;
  
  final List<Map<String, dynamic>> _exercises = [
    {"name": "JUMPING JACKS", "reps": "45 SEC", "isTimed": true, "target": "CARDIO", "color": Color(0xFF10B981)},
    {"name": "PUSH UPS", "reps": "15 REPS", "isTimed": false, "target": "CHEST", "color": Color(0xFF6366F1)},
    {"name": "SQUATS", "reps": "20 REPS", "isTimed": false, "target": "LEGS", "color": Colors.orange},
    {"name": "PLANK", "reps": "60 SEC", "isTimed": true, "target": "CORE", "color": Colors.red},
  ];

  @override
  void initState() {
    super.initState();
    _startExercise();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startExercise() {
    final ex = _exercises[_currentIndex];
    if (ex['isTimed']) {
      _secondsRemaining = int.parse(ex['reps'].split(' ')[0]);
      _startTimer();
    }
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!_timerPaused) {
        setState(() {
          if (_secondsRemaining > 0) {
            _secondsRemaining--;
          } else {
            _timer?.cancel();
            _nextExercise();
          }
        });
      }
    });
  }

  void _nextExercise() {
    if (_currentIndex < _exercises.length - 1) {
      setState(() {
        _isResting = true;
        _timer?.cancel();
      });
      Future.delayed(const Duration(seconds: 5), () {
        if (mounted) {
          setState(() {
            _isResting = false;
            _currentIndex++;
            _timerPaused = false;
          });
          _startExercise();
        }
      });
    } else {
       _finishWorkout();
    }
  }

  void _finishWorkout() {
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (c) => WorkoutCompleteScreen(
      workoutName: widget.workout['name'],
      duration: widget.workout['duration'],
      exercisesCount: _exercises.length,
    )));
  }

  @override
  Widget build(BuildContext context) {
    if (_isResting) return _buildRestView();
    
    final ex = _exercises[_currentIndex];
    final theme = Theme.of(context);
    final progress = (_currentIndex + 1) / _exercises.length;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // 1. Atmospheric Pulse
          Positioned.fill(
             child: Container(
               decoration: BoxDecoration(
                 gradient: RadialGradient(
                   center: Alignment.center,
                   radius: 1.5,
                   colors: [
                     (ex['color'] as Color).withOpacity(0.05),
                     Colors.transparent,
                   ],
                 ),
               ),
             ).animate(onPlay: (c) => c.repeat(reverse: true)).fadeOut(duration: 1.seconds),
          ),

          SafeArea(
            child: Column(
              children: [
                // Top Navigation/Progress
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  child: Row(
                    children: [
                      IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(LucideIcons.x, color: Colors.white)),
                      const Spacer(),
                      Text("${_currentIndex + 1} / ${_exercises.length}", style: const TextStyle(fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 1)),
                    ],
                  ),
                ),
                
                // Progress Bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: LinearProgressIndicator(
                    value: progress,
                    backgroundColor: Colors.grey.shade900,
                    valueColor: AlwaysStoppedAnimation(ex['color']),
                    minHeight: 6,
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),

                const Spacer(),

                // 2. Exercise Visualizer (Futuristic)
                Center(
                  child: Container(
                    width: 280,
                    height: 280,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: (ex['color'] as Color).withOpacity(0.2), width: 2),
                    ),
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                           Icon(LucideIcons.circle_play, size: 60, color: (ex['color'] as Color))
                               .animate(onPlay: (c) => c.repeat())
                               .scale(begin: const Offset(1,1), end: const Offset(1.1, 1.1), duration: 1.seconds),
                           const SizedBox(height: 16),
                           const Text("EXECUTION PHASE", style: TextStyle(color: Colors.grey, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2)),
                        ],
                      ),
                    ),
                  ),
                ),

                const Spacer(),

                // 3. Info & Control Panel (Glassmorphic)
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                    child: Container(
                      padding: const EdgeInsets.all(40),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0A0A0A).withOpacity(0.8),
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
                        border: Border.all(color: Colors.white.withOpacity(0.05)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Text(ex['target'], style: TextStyle(color: ex['color'], fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 12)),
                          const SizedBox(height: 12),
                          Text(ex['name'], style: const TextStyle(fontSize: 36, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -1)),
                          const SizedBox(height: 32),
                          
                          if (ex['isTimed'])
                            _buildTimerControl()
                          else
                            Row(
                              children: [
                                const Icon(LucideIcons.repeat, color: Colors.grey, size: 24),
                                const SizedBox(width: 16),
                                Text(ex['reps'], style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white)),
                              ],
                            ),
                          
                          const SizedBox(height: 48),

                          ElevatedButton(
                            onPressed: _nextExercise,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              minimumSize: const Size.fromHeight(64),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                            ),
                            child: const Text("PROCEED", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                          ),
                        ],
                      ),
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

  Widget _buildTimerControl() {
    return Row(
      children: [
        const Icon(LucideIcons.timer, color: Colors.grey, size: 24),
        const SizedBox(width: 16),
        Text(
          "00:${_secondsRemaining.toString().padLeft(2, '0')}",
          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.w900, color: Colors.white, fontFeatures: [FontFeature.tabularFigures()]),
        ),
        const Spacer(),
        IconButton(
          onPressed: () => setState(() => _timerPaused = !_timerPaused),
          icon: Icon(_timerPaused ? LucideIcons.play : LucideIcons.pause, color: Colors.white),
        ),
      ],
    );
  }

  Widget _buildRestView() {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text("PREPARE", style: TextStyle(color: Colors.grey, letterSpacing: 5, fontSize: 14)),
            const SizedBox(height: 24),
            const Text("REST", style: TextStyle(color: Colors.white, fontSize: 64, fontWeight: FontWeight.w900)),
            const SizedBox(height: 40),
            Text("NEXT: ${_exercises[_currentIndex + 1]['name']}", style: TextStyle(color: (_exercises[_currentIndex+1]['color'] as Color), fontWeight: FontWeight.bold)),
          ],
        ).animate().fadeIn().scale(),
      ),
    );
  }
}

