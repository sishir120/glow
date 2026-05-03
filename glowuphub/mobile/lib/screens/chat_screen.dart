import 'package:flutter/material.dart';
import 'package:flutter_lucide/flutter_lucide.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF09090B),
      appBar: AppBar(
        backgroundColor: const Color(0xFF09090B),
        elevation: 0,
        centerTitle: false,
        title: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: const Color(0xFF10B981).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
              ),
              child: const Center(
                child: Text(
                  'SS',
                  style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.w900, fontSize: 14),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Sabita Subedi',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                Row(
                  children: [
                    Container(
                      width: 6,
                      height: 6,
                      decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle),
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      'ONLINE',
                      style: TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Color(0xFF10B981), letterSpacing: 1.0),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16, top: 12, bottom: 12),
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: const Color(0xFF10B981).withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
            ),
            child: const Center(
              child: Text(
                'COACH TIER',
                style: TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.w900, fontSize: 8, letterSpacing: 1.0),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(24),
              children: const [
                ChatMessage(
                  role: 'expert',
                  content: "Hello Sishir! I've been reviewing your recent metabolic logs. Your adherence to the hydration protocol is excellent.",
                  time: "09:41 AM",
                ),
                ChatMessage(
                  role: 'user',
                  content: "Thanks Sabita! I'm feeling much more energetic. Should I adjust my caloric intake for the HIIT sessions?",
                  time: "09:45 AM",
                ),
                ChatMessage(
                  role: 'expert',
                  content: "Great question. For HIIT, we want to prioritize complex carbs 2 hours prior. I've updated your meal plan with a specific pre-workout protocol.",
                  time: "10:02 AM",
                ),
              ],
            ),
          ),
          _buildInputArea(context),
        ],
      ),
    );
  }

  Widget _buildInputArea(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 8, 24, 32),
      decoration: BoxDecoration(
        color: const Color(0xFF09090B),
        border: Border(top: BorderSide(color: Colors.white.withOpacity(0.05))),
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: const Color(0xFF18181B),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: Colors.white.withOpacity(0.05)),
            ),
            child: Row(
              children: [
                const SizedBox(width: 8),
                const Expanded(
                  child: TextField(
                    style: TextStyle(color: Colors.white, fontSize: 14),
                    decoration: InputDecoration(
                      hintText: 'Ask Sabita anything...',
                      hintStyle: TextStyle(color: Colors.white24, fontSize: 14),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 8),
                    ),
                  ),
                ),
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: const Icon(LucideIcons.send, color: Colors.black, size: 20),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(LucideIcons.sparkles, size: 10, color: Colors.white24),
              SizedBox(width: 4),
              Text(
                'MESSAGES ARE PRIVATE AND SECURE',
                style: TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Colors.white24, letterSpacing: 1.0),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class ChatMessage extends StatelessWidget {
  final String role;
  final String content;
  final String time;

  const ChatMessage({
    super.key,
    required this.role,
    required this.content,
    required this.time,
  });

  @override
  Widget build(BuildContext context) {
    final isExpert = role == 'expert';

    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: isExpert ? MainAxisAlignment.start : MainAxisAlignment.end,
        children: [
          if (isExpert) _buildAvatar(),
          const SizedBox(width: 12),
          Flexible(
            child: Column(
              crossAxisAlignment: isExpert ? CrossAxisAlignment.start : CrossAxisAlignment.end,
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isExpert ? const Color(0xFF18181B) : const Color(0xFF10B981),
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(20),
                      topRight: const Radius.circular(20),
                      bottomLeft: Radius.circular(isExpert ? 0 : 20),
                      bottomRight: Radius.circular(isExpert ? 20 : 0),
                    ),
                    border: isExpert ? Border.all(color: Colors.white.withOpacity(0.05)) : null,
                  ),
                  child: Text(
                    content,
                    style: TextStyle(
                      color: isExpert ? Colors.white.withOpacity(0.8) : Colors.black,
                      fontSize: 14,
                      height: 1.5,
                      fontWeight: isExpert ? FontWeight.normal : FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  time,
                  style: const TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Colors.white12, letterSpacing: 1.0),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          if (!isExpert) _buildUserAvatar(),
        ],
      ),
    );
  }

  Widget _buildAvatar() {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: const Color(0xFF10B981).withOpacity(0.1),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFF10B981).withOpacity(0.2)),
      ),
      child: const Center(
        child: Icon(LucideIcons.sparkles, size: 14, color: Color(0xFF10B981)),
      ),
    );
  }

  Widget _buildUserAvatar() {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.05)),
      ),
      child: const Center(
        child: Icon(LucideIcons.user, size: 14, color: Colors.white),
      ),
    );
  }
}

