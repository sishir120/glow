import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../home_screen.dart';
import '../workout_screen.dart';
import '../food_screen.dart';
import '../body_screen.dart';
import '../profile_screen.dart';

class MainLayout extends StatefulWidget {
  final int initialIndex;
  const MainLayout({super.key, this.initialIndex = 0});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  late int _selectedIndex;

  final List<Widget> _screens = [
    const HomeScreen(),
    const WorkoutScreen(),
    const FoodScreen(),
    const BodyScreen(),
    const ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Screen Content
          Positioned.fill(
            child: IndexedStack(
              index: _selectedIndex,
              children: _screens,
            ),
          ),
          
          // Floating Dock
          Positioned(
            left: 20,
            right: 20,
            bottom: 30,
            child: _buildFloatingDock(),
          ),
        ],
      ),
    );
  }

  Widget _buildFloatingDock() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(32),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
          decoration: BoxDecoration(
            color: const Color(0xFF111111).withOpacity(0.8),
            borderRadius: BorderRadius.circular(32),
            border: Border.all(color: Colors.white.withOpacity(0.1)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.5),
                blurRadius: 30,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, LucideIcons.home, 'Home'),
              _buildNavItem(1, LucideIcons.dumbbell, 'Train'),
              _buildNavItem(2, LucideIcons.utensils, 'Fuel'),
              _buildNavItem(3, LucideIcons.activity, 'Bio'),
              _buildNavItem(4, LucideIcons.user, 'Self'),
            ],
          ),
        ),
      ),
    ).animate().fadeIn(delay: 1.seconds).slideY(begin: 0.5);
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _selectedIndex == index;
    return GestureDetector(
      onTap: () => _onItemTapped(index),
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: 300.ms,
        curve: Curves.easeOutBack,
        width: isSelected ? 80 : 50,
        height: 50,
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 20,
              color: isSelected ? Colors.black : Colors.grey.shade600,
            ).animate(target: isSelected ? 1 : 0).scale(begin: const Offset(1,1), end: const Offset(1.1, 1.1)),
            if (isSelected)
               Text(
                 label.toUpperCase(),
                 style: const TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Colors.black, letterSpacing: 0.5),
               ).animate().fadeIn().scale(),
          ],
        ),
      ),
    );
  }
}
