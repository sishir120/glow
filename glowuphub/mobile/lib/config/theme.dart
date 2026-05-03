import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Luxury Color Palette
  static const Color background = Color(0xFF000000); // Obsidian
  static const Color surface = Color(0xFF0A0A0A);    // Coal
  static const Color glass = Color(0x1AFFFFFF);      // Frosted
  static const Color primary = Color(0xFFFFFFFF);    // Pure White
  static const Color accent = Color(0xFF10B981);     // Emerald
  static const Color accentAlt = Color(0xFF6366F1);  // Electric Indigo
  static const Color grey = Color(0xFF1F1F1F);
  static const Color foreground = Color(0xFFF9FAFB);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: accent,
        tertiary: accentAlt,
        surface: surface,
        error: Color(0xFFEF4444),
        onPrimary: Colors.black,
        onSecondary: Colors.white,
        onSurface: foreground,
      ),
      textTheme: GoogleFonts.outfitTextTheme(
        const TextTheme(
          displayLarge: TextStyle(fontWeight: FontWeight.w900, fontSize: 32, letterSpacing: -1.0),
          displayMedium: TextStyle(fontWeight: FontWeight.w800, fontSize: 24, letterSpacing: -0.5),
          displaySmall: TextStyle(fontWeight: FontWeight.w700, fontSize: 20),
          headlineMedium: TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
          titleLarge: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          labelLarge: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2, fontSize: 12),
          bodyLarge: TextStyle(fontSize: 16, height: 1.5),
          bodyMedium: TextStyle(fontSize: 14, height: 1.5),
        ),
      ).apply(
        bodyColor: foreground,
        displayColor: foreground,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
          color: Colors.white,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.black,
          minimumSize: const Size.fromHeight(64),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          textStyle: const TextStyle(fontWeight: FontWeight.w900, letterSpacing: 0.5),
        ),
      ),
    );
  }
}
