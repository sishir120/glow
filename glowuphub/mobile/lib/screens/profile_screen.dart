import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_lucide/flutter_lucide.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/auth_provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = Provider.of<AuthProvider>(context);
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(title: const Text("SELF")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(left: 24, right: 24, top: 24, bottom: 120),
        child: Column(
          children: [
            // 1. Premium Identity Section
            _buildIdentityHeader(user),

            const SizedBox(height: 48),

            // 2. Settings Grid (Glass)
            _buildSectionHeader("ACCOUNT SETTINGS"),
            const SizedBox(height: 16),
            _buildGlassTile("Personal Identity", LucideIcons.user_square, () {}),
            _buildGlassTile("Subscription Tier", LucideIcons.gem, () {}),
            _buildGlassTile("Security & Vault", LucideIcons.lock, () {}),

            const SizedBox(height: 32),

            _buildSectionHeader("SYSTEM PREFERENCES"),
            const SizedBox(height: 16),
            _buildGlassTile("App Notifications", LucideIcons.bell_ring, () {}),
            _buildGlassTile("Bio-Metric Data", LucideIcons.fingerprint, () {}),
            _buildGlassTile("Connect Devices", LucideIcons.watch, () {}),

            const SizedBox(height: 48),

            // 3. Logout
            _buildLogoutButton(auth),
            
            const SizedBox(height: 32),
            const Text(
               "GLOWUPHUB V1.2 PRO • 2026 EDITION",
               style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 2),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIdentityHeader(user) {
    return Center(
      child: Column(
        children: [
          Container(
            width: 120,
            height: 120,
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const LinearGradient(colors: [Color(0xFF10B981), Color(0xFF6366F1)]),
            ),
            child: Container(
              decoration: const BoxDecoration(color: Colors.black, shape: BoxShape.circle),
              child: const Icon(LucideIcons.user, size: 50, color: Colors.white),
            ),
          ).animate().scale(duration: 800.ms, curve: Curves.easeOutBack),
          
          const SizedBox(height: 24),
          
          Text(
            user?.name ?? "MEMBER",
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -0.5),
          ),
          Text(
            user?.email ?? "authenticated_user@glowup.pro",
            style: const TextStyle(color: Colors.grey, fontSize: 13, fontWeight: FontWeight.w500),
          ),
          
          const SizedBox(height: 16),
          
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.1)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(LucideIcons.gem, size: 14, color: Color(0xFF10B981)),
                SizedBox(width: 8),
                Text("PREMIUM MEMBER", style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: const TextStyle(color: Colors.grey, letterSpacing: 2, fontSize: 10, fontWeight: FontWeight.w900),
      ),
    );
  }

  Widget _buildGlassTile(String title, IconData icon, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFF111111),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.grey.shade900),
          ),
          child: Row(
            children: [
              Icon(icon, size: 20, color: Colors.white70),
              const SizedBox(width: 20),
              Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
              const Spacer(),
              const Icon(LucideIcons.chevron_right, size: 16, color: Colors.grey),
            ],
          ),
        ),
      ),
    ).animate().fadeIn().slideX(begin: 0.05);
  }

  Widget _buildLogoutButton(AuthProvider auth) {
    return TextButton(
      onPressed: () => auth.logout(),
      style: TextButton.styleFrom(
        foregroundColor: Colors.red.shade400,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.red.shade900.withOpacity(0.3))),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(LucideIcons.log_out, size: 18),
          SizedBox(width: 12),
          Text("END SESSION", style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1, fontSize: 12)),
        ],
      ),
    );
  }
}

