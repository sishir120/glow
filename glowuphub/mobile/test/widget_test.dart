import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const GlowUpApp());
    
    // Wait for any animations and redirects (GoRouter)
    await tester.pumpAndSettle();

    // Verify that we start on the login screen
    expect(find.text('Welcome Back'), findsOneWidget);
  });
}
