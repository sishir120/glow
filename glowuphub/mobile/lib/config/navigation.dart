import 'package:go_router/go_router.dart';
import '../providers/auth_provider.dart';
import '../screens/auth/splash_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/register_screen.dart';
import '../screens/onboarding/onboarding_screen.dart';
import '../screens/auth/user_setup_screen.dart';
import '../screens/main/main_layout.dart';

class AppNavigation {
  static GoRouter createRouter(AuthProvider authProvider) {
    return GoRouter(
      refreshListenable: authProvider,
      initialLocation: '/',
      redirect: (context, state) {
        final isLogin = state.matchedLocation == '/login';
        final isRegister = state.matchedLocation == '/register';
        final isOnboarding = state.matchedLocation == '/onboarding';
        final isPublic = state.matchedLocation == '/' || isLogin || isRegister;

        if (authProvider.isLoading) return null;

        if (!authProvider.isAuthenticated) {
          return isPublic ? null : '/login';
        }

        // Authenticated but onboarding not complete
        if (authProvider.isAuthenticated && 
            authProvider.user?.onboardingStage != 'COMPLETED') {
           if (!isOnboarding) return '/onboarding';
           return null;
        }

        // Authenticated and Completed
        if (isLogin || isRegister || isOnboarding) {
          return '/home';
        }

        return null;
      },
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const SplashScreen(),
        ),
        GoRoute(
          path: '/onboarding',
          builder: (context, state) => const OnboardingScreen(),
        ),
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/register',
          builder: (context, state) => const RegisterScreen(),
        ),
        GoRoute(
          path: '/home',
          builder: (context, state) => const MainLayout(initialIndex: 0),
        ),
        GoRoute(
          path: '/workout',
          builder: (context, state) => const MainLayout(initialIndex: 1),
        ),
        GoRoute(
          path: '/food',
          builder: (context, state) => const MainLayout(initialIndex: 2),
        ),
        GoRoute(
          path: '/body',
          builder: (context, state) => const MainLayout(initialIndex: 3),
        ),
        GoRoute(
          path: '/profile',
          builder: (context, state) => const MainLayout(initialIndex: 4),
        ),
      ],
    );
  }
}

