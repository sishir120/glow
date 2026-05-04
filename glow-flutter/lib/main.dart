import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const GlowApp());
}

class GlowApp extends StatelessWidget {
  const GlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Glow — Your Nutrition Engine',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'SF Pro Display',
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF7C9EFF),
          secondary: Color(0xFFB8CFFF),
          surface: Color(0xFF0A0F1E),
          background: Color(0xFF050A14),
        ),
      ),
      home: const WaitlistScreen(),
    );
  }
}

class WaitlistScreen extends StatefulWidget {
  const WaitlistScreen({super.key});

  @override
  State<WaitlistScreen> createState() => _WaitlistScreenState();
}

class _WaitlistScreenState extends State<WaitlistScreen>
    with TickerProviderStateMixin {
  final _emailController = TextEditingController();
  final _nameController = TextEditingController();
  bool _isLoading = false;
  bool _isSuccess = false;
  String? _error;

  late AnimationController _fadeController;
  late AnimationController _pulseController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..forward();

    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat(reverse: true);

    _fadeAnimation = CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOut,
    );

    _pulseAnimation = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _fadeController.dispose();
    _pulseController.dispose();
    _emailController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submitWaitlist() async {
    if (_emailController.text.isEmpty || !_emailController.text.contains('@')) {
      setState(() => _error = 'Please enter a valid email address.');
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Replace this with your actual Neon/API endpoint
      final response = await http.post(
        Uri.parse('https://your-glow-app.vercel.app/api/waitlist'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': _emailController.text.trim(),
          'name': _nameController.text.trim(),
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        setState(() {
          _isSuccess = true;
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Something went wrong. Please try again.';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'No connection. Please try again.';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050A14),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF050A14),
              Color(0xFF0D1B3E),
              Color(0xFF050A14),
            ],
            stops: [0.0, 0.5, 1.0],
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 40),
              child: _isSuccess ? _buildSuccessView() : _buildFormView(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSuccessView() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const SizedBox(height: 80),
        AnimatedBuilder(
          animation: _pulseAnimation,
          builder: (_, child) => Transform.scale(
            scale: _pulseAnimation.value,
            child: child,
          ),
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const LinearGradient(
                colors: [Color(0xFF7C9EFF), Color(0xFF4C6EF5)],
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF7C9EFF).withOpacity(0.4),
                  blurRadius: 30,
                  spreadRadius: 5,
                ),
              ],
            ),
            child: const Icon(Icons.check, color: Colors.white, size: 50),
          ),
        ),
        const SizedBox(height: 40),
        const Text(
          "You're in the Glow.",
          style: TextStyle(
            color: Colors.white,
            fontSize: 32,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        Text(
          "We'll reach out as soon as your personalized nutrition engine is ready.",
          style: TextStyle(
            color: Colors.white.withOpacity(0.6),
            fontSize: 16,
            height: 1.6,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildFormView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Badge
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(50),
            border: Border.all(
              color: const Color(0xFF7C9EFF).withOpacity(0.4),
            ),
            color: const Color(0xFF7C9EFF).withOpacity(0.08),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 6,
                height: 6,
                decoration: const BoxDecoration(
                  color: Color(0xFF7C9EFF),
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Now Accepting Early Access',
                style: TextStyle(
                  color: Color(0xFF7C9EFF),
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 40),

        // Headline
        const Text(
          'Nutrition\nDecisions\nMade Simple.',
          style: TextStyle(
            color: Colors.white,
            fontSize: 44,
            fontWeight: FontWeight.w800,
            height: 1.1,
            letterSpacing: -1.5,
          ),
        ),

        const SizedBox(height: 20),

        Text(
          'Your personal AI-powered nutrition engine. No tracking. No counting. Just instant, smart guidance built for you.',
          style: TextStyle(
            color: Colors.white.withOpacity(0.6),
            fontSize: 16,
            height: 1.6,
          ),
        ),

        const SizedBox(height: 48),

        // Glass form card
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            color: Colors.white.withOpacity(0.05),
            border: Border.all(
              color: Colors.white.withOpacity(0.1),
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF7C9EFF).withOpacity(0.05),
                blurRadius: 40,
                spreadRadius: 0,
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Join the waitlist',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Be among the first to experience Glow.',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.5),
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 24),

              // Name field
              _GlowTextField(
                controller: _nameController,
                label: 'Your name',
                hint: 'Enter your name',
                icon: Icons.person_outline,
              ),

              const SizedBox(height: 16),

              // Email field
              _GlowTextField(
                controller: _emailController,
                label: 'Email address',
                hint: 'you@example.com',
                icon: Icons.mail_outline,
                keyboardType: TextInputType.emailAddress,
              ),

              if (_error != null) ...[
                const SizedBox(height: 12),
                Text(
                  _error!,
                  style: const TextStyle(
                    color: Color(0xFFFF6B6B),
                    fontSize: 13,
                  ),
                ),
              ],

              const SizedBox(height: 24),

              // Submit button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _submitWaitlist,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4C6EF5),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  child: _isLoading
                      ? const SizedBox(
                          width: 22,
                          height: 22,
                          child: CircularProgressIndicator(
                            strokeWidth: 2.5,
                            color: Colors.white,
                          ),
                        )
                      : const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Get Early Access',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                                letterSpacing: 0.2,
                              ),
                            ),
                            SizedBox(width: 8),
                            Icon(Icons.arrow_forward, size: 18),
                          ],
                        ),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 32),

        // Social proof
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.lock_outline,
              size: 14,
              color: Colors.white.withOpacity(0.4),
            ),
            const SizedBox(width: 6),
            Text(
              'No spam. Unsubscribe any time.',
              style: TextStyle(
                color: Colors.white.withOpacity(0.4),
                fontSize: 12,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _GlowTextField extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final String hint;
  final IconData icon;
  final TextInputType? keyboardType;

  const _GlowTextField({
    required this.controller,
    required this.label,
    required this.hint,
    required this.icon,
    this.keyboardType,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.7),
            fontSize: 13,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.3,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          keyboardType: keyboardType,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
            prefixIcon: Icon(icon, color: Colors.white.withOpacity(0.4), size: 20),
            filled: true,
            fillColor: Colors.white.withOpacity(0.06),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.white.withOpacity(0.12)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFF7C9EFF), width: 1.5),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
        ),
      ],
    );
  }
}
