# GlowUp Hub - Project Architecture & Structure

Complete reference for the GlowUp Hub project structure and architecture.

---

## 📂 Directory Structure

```
glowuphub/
│
├── 📁 web/                           # Next.js Full-Stack Web Application
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (dashboard)/              # Dashboard routes (protected by auth)
│   │   │   ├── dashboard/page.tsx    # Main dashboard
│   │   │   ├── profile/page.tsx      # User profile
│   │   │   └── nutrition/page.tsx    # Nutrition tracking
│   │   ├── admin/                    # Admin management routes
│   │   │   ├── nutrition/            # Nutritionist admin panel
│   │   │   ├── experts/              # Expert management
│   │   │   └── content/              # Content management
│   │   ├── api/                      # Backend API Routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── users/                # User management
│   │   │   ├── nutrition/            # Nutrition data endpoints
│   │   │   ├── workouts/             # Activity protocols
│   │   │   └── stripe/               # Payment webhooks
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── login/                # Login page
│   │   │   ├── register/             # Registration page
│   │   │   └── onboarding/           # User onboarding
│   │   ├── download/page.tsx         # Mobile app download landing
│   │   ├── blog/                     # Blog content
│   │   ├── [privacy]/page.tsx        # Legal pages
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/                   # Reusable React Components
│   │   ├── ui/                       # Base UI components
│   │   │   ├── button.tsx            # Button component
│   │   │   ├── card.tsx              # Card container
│   │   │   ├── fade-in.tsx           # Animation wrapper
│   │   │   └── ...                   # Other UI primitives
│   │   ├── dashboard/                # Dashboard specific components
│   │   │   ├── ritual-tracker.tsx    # Habit tracker widget
│   │   │   ├── glow-score.tsx        # Score visualization
│   │   │   └── stats-overview.tsx    # Stats display
│   │   ├── nutrition/                # Nutrition related components
│   │   │   ├── macro-tracker.tsx     # Macro input
│   │   │   ├── meal-planner.tsx      # Meal planning UI
│   │   │   └── expert-chat.tsx       # Expert consultation
│   │   ├── gym/                      # Workout components
│   │   │   ├── split-selector.tsx    # Workout split selection
│   │   │   ├── exercise-logger.tsx   # Exercise logging
│   │   │   └── activity-protocol.tsx # Guided activities
│   │   ├── subscription/             # Subscription UI
│   │   │   ├── pricing.tsx           # Pricing cards
│   │   │   └── payment-form.tsx      # Checkout
│   │   └── ...                       # Additional components
│   │
│   ├── prisma/                       # Database Schema
│   │   ├── schema.prisma             # Data model definition
│   │   ├── migrations/               # Database migrations
│   │   └── seed.ts                   # Database seeding
│   │
│   ├── lib/                          # Utility Functions
│   │   ├── api-service.ts            # API client configuration
│   │   ├── auth-helper.ts            # Authentication utilities
│   │   └── utils.ts                  # General utilities
│   │
│   ├── types/                        # TypeScript Type Definitions
│   │   ├── next-auth.d.ts            # Auth type extensions
│   │   ├── api.ts                    # API response types
│   │   └── models.ts                 # Database model types
│   │
│   ├── public/                       # Static Assets
│   │   ├── images/                   # Images & logos
│   │   ├── icons/                    # Icon files
│   │   ├── manifest.json             # PWA manifest
│   │   ├── service-worker.js         # PWA service worker
│   │   └── robots.txt                # SEO configuration
│   │
│   ├── config/                       # Configuration Files
│   │   ├── auth.config.ts            # NextAuth configuration
│   │   ├── sentry.config.ts          # Error tracking setup
│   │   └── stripe.config.ts          # Payment setup
│   │
│   ├── styles/                       # Global Styles
│   │   ├── globals.css               # Global Tailwind directives
│   │   └── fonts.css                 # Font definitions
│   │
│   ├── next.config.js                # Next.js Configuration
│   ├── tailwind.config.js            # Tailwind CSS Configuration
│   ├── tsconfig.json                 # TypeScript Configuration
│   ├── package.json                  # Node.js Dependencies
│   ├── .env.local                    # Local Environment Variables
│   ├── .env.example                  # Environment Variables Template
│   └── README.md                     # Web-specific documentation
│
├── 📁 mobile/                         # Flutter Cross-Platform Mobile App
│   ├── lib/                          # Flutter Source Code
│   │   ├── main.dart                 # App entry point
│   │   ├── config/                   # App configuration
│   │   │   ├── theme.dart            # Theme configuration
│   │   │   ├── navigation.dart       # Route definitions
│   │   │   └── constant.dart         # App constants
│   │   │
│   │   ├── models/                   # Data Models
│   │   │   ├── user_model.dart       # User data structure
│   │   │   ├── workout_model.dart    # Workout data
│   │   │   └── nutrition_model.dart  # Nutrition data
│   │   │
│   │   ├── providers/                # State Management (Provider)
│   │   │   ├── auth_provider.dart    # Authentication state
│   │   │   ├── user_provider.dart    # User profile state
│   │   │   └── nutrition_provider.dart # Nutrition state
│   │   │
│   │   ├── screens/                  # App Screens (Pages)
│   │   │   ├── auth/                 # Authentication screens
│   │   │   │   ├── login_screen.dart
│   │   │   │   ├── register_screen.dart
│   │   │   │   ├── splash_screen.dart
│   │   │   │   ├── user_setup_screen.dart
│   │   │   │   ├── onboarding/       # Onboarding flow
│   │   │   │   └── ...
│   │   │   ├── main/                 # Main app screens
│   │   │   │   ├── home_screen.dart  # Home/Dashboard
│   │   │   │   ├── workout_screen.dart # Workouts
│   │   │   │   ├── food_screen.dart  # Nutrition tracking
│   │   │   │   ├── body_screen.dart  # Body metrics
│   │   │   │   ├── profile_screen.dart # User profile
│   │   │   │   └── main_layout.dart  # Bottom navigation
│   │   │   ├── chat_screen.dart      # Expert chat
│   │   │   ├── routines_screen.dart  # Habit routines
│   │   │   ├── track_screen.dart     # Progress tracking
│   │   │   ├── workout_session_screen.dart # Active workout
│   │   │   └── ...
│   │   │
│   │   ├── widgets/                  # Reusable Flutter Widgets
│   │   │   ├── bio_digital_twin.dart # User avatar widget
│   │   │   ├── streak_tracker.dart   # Habit streak display
│   │   │   ├── weight_chart.dart     # Weight progress chart
│   │   │   ├── quick_actions_fab.dart # Action buttons
│   │   │   ├── lifestyle_rituals.dart # Daily habits widget
│   │   │   ├── habit_list.dart       # Habit list UI
│   │   │   ├── daily_briefing_card.dart # Summary card
│   │   │   └── ...
│   │   │
│   │   └── services/                 # External Services
│   │       ├── api_service.dart      # Backend API calls
│   │       ├── storage_service.dart  # Local data storage
│   │       └── auth_service.dart     # Authentication
│   │
│   ├── android/                      # Android Platform Code
│   │   ├── app/                      # Android app module
│   │   ├── gradle/                   # Gradle build config
│   │   └── build.gradle              # Build settings
│   │
│   ├── ios/                          # iOS Platform Code
│   │   ├── Runner.xcworkspace        # Xcode workspace
│   │   └── Podfile                   # CocoaPods dependencies
│   │
│   ├── web/                          # Web Platform Code (PWA)
│   ├── windows/                      # Windows Desktop Code
│   ├── macos/                        # macOS Desktop Code
│   ├── linux/                        # Linux Desktop Code
│   │
│   ├── pubspec.yaml                  # Flutter Dependencies
│   ├── pubspec.lock                  # Dependency Lock File
│   ├── analysis_options.yaml         # Dart Linter Configuration
│   ├── .env.example                  # Environment Variables Template
│   └── README.md                     # Mobile-specific documentation
│
├── 📁 mobile_expo_archived/          # LEGACY: Previous Expo Stack
│   └── (archived React Native)
│
├── 📁 mobile_legacy/                 # LEGACY: Failed Expo Attempts
│   └── (preserved for reference)
│
├── 📄 README.md                      # Main Project Documentation
├── 📄 DEPLOYMENT_GUIDE.md            # Deployment Instructions
├── 📄 RELEASE_GUIDE.md               # Release Procedures
├── 📄 MOBILE_BUILD_GUIDE.md          # Flutter Build Guide
├── 📄 QUICK_REFERENCE.md             # Development Quick Reference
├── 📄 FIX_SUMMARY.md                 # Recent Fixes & Status
├── 📄 ARCHIVE.md                     # Legacy Files Documentation
├── 📄 Configure-Secrets.ps1          # Secret Configuration Script
├── 📄 Final-Deploy.ps1               # Deployment Automation Script
│
└── 📄 .gitignore                     # Git ignore configuration
```

---

## 🏗️ Architecture Overview

### Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  ┌─────────────────┬─────────────────┐  │
│  │   Web (Next.js) │ Mobile (Flutter)│  │
│  │   React/TSX     │   Dart UI       │  │
│  └─────────────────┴─────────────────┘  │
└────────────────┬────────────────────────┘
                 │ HTTP/REST API
┌────────────────▼────────────────────────┐
│       Business Logic Layer              │
│  ┌──────────────────────────────────┐  │
│  │   Next.js API Routes             │  │
│  │   • Authentication (NextAuth v5) │  │
│  │   • Business Logic               │  │
│  │   • Payment Processing (Stripe)  │  │
│  │   • Data Validation              │  │
│  └──────────────────────────────────┘  │
└────────────────┬────────────────────────┘
                 │ Database Queries
┌────────────────▼────────────────────────┐
│         Data Access Layer               │
│  ┌──────────────────────────────────┐  │
│  │   Prisma ORM                     │  │
│  │   PostgreSQL (Neon)              │  │
│  │   • User Data                    │  │
│  │   • Nutrition Plans              │  │
│  │   • Workout Programs             │  │
│  │   • Habit Tracking               │  │
│  └──────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

### Component Architecture (Web - React)

```
App (Layout)
├── Navigation (Global)
│   └── Header/TopBar
├── Routes
│   ├── PublicPages
│   │   ├── Home/Landing
│   │   ├── Login/Register
│   │   └── Downloads
│   ├── ProtectedPages (Auth Required)
│   │   ├── Dashboard (User)
│   │   │   ├── RitualTracker
│   │   │   ├── GlowScore
│   │   │   └── StatsOverview
│   │   ├── Nutrition
│   │   │   ├── MacroTracker
│   │   │   ├── MealPlanner
│   │   │   └── ExpertChat
│   │   ├── Workouts
│   │   │   ├── SplitSelector
│   │   │   └── ExerciseLogger
│   │   ├── Profile
│   │   └── Subscription
│   └── AdminPages
│       ├── NutritionistPanel
│       ├── UserManagement
│       └── ContentManager
└── Footer
```

### State Management (Mobile - Flutter)

```
Provider Layer (Providers/)
├── AuthProvider
│   ├── Login/Register
│   ├── Token Management
│   └── Session Persistence
├── UserProvider
│   ├── Profile Data
│   ├── Preferences
│   └── Stats
└── NutritionProvider
    ├── Meal Data
    ├── Macro Tracking
    └── Goals

Consumed by Widgets
├── Screens
├── Widgets
└── Components
```

---

## 🔄 Data Flow

### User Authentication Flow

```
User Input (Login Screen)
    ↓
NextAuth.js (Web) / Custom Auth (Mobile)
    ↓
Verify Credentials (Database)
    ↓
Generate JWT Token
    ↓
Store Token (Web: cookies, Mobile: SharedPreferences)
    ↓
Redirect to Dashboard
```

### Nutrition Tracking Flow

```
User Logs Meal
    ↓
Mobile: Store in SharedPreferences (offline)
Web: Save to Backend
    ↓
Send to API (Next.js)
    ↓
Validate & Store (Prisma)
    ↓
Calculate Macros
    ↓
Update Nutrition Provider State
    ↓
Display in UI
```

### Workout/Activity Flow

```
User Selects Activity
    ↓
Activity Protocol Loaded
    ↓
Step-by-Step Instructions
    ↓
Timer & Progress Tracking
    ↓
Calorie Calculation (MET-based)
    ↓
Save Results
    ↓
Update Strength Graph
```

---

## 🔐 Security Layers

### Web Security
- NextAuth.js v5 for authentication
- JWT tokens with short expiration
- CSRF protection
- Secure password hashing (bcrypt)
- HTTPS enforcement
- Input validation on all endpoints

### Mobile Security
- Secure token storage
- API request signing
- SSL pinning ready
- Local data encryption options

### Database Security
- PostgreSQL with SSL
- Row-level security (RLS) with Prisma
- SQL injection prevention (Prisma ORM)
- Encrypted sensitive fields

---

## 📦 Key Dependencies

### Web (Next.js) - Production Ready ✅
```json
{
  "next": "16.0.10",
  "react": "19.2.1",
  "next-auth": "5.0.0-beta.30",
  "@prisma/client": "5.19.0",
  "stripe": "20.0.0",
  "framer-motion": "12.23.26",
  "tailwindcss": "4.x",
  "@sentry/nextjs": "10.32.1"
}
```

### Mobile (Flutter) - Build Ready ✅
```yaml
flutter: ">=3.3.0"
dependencies:
  provider: ^6.1.2
  go_router: ^14.7.2
  http: ^1.3.0
  shared_preferences: ^2.2.3
  fl_chart: 0.66.2
  flutter_lucide: 1.8.2
  google_fonts: ^6.2.1
```

---

## 🚀 Deployment Architecture

### Web (Vercel)
```
GitHub Repository
    ↓
Vercel Git Integration
    ↓
Automatic Build (npm run build)
    ↓
    ├─ Prisma Migration
    ├─ Next.js Build
    └─ Static Export
    ↓
Deploy to Edge Network
    ↓
Global CDN Distribution
    ↓
Custom Domain HTTPS
```

### Mobile (App Stores)
```
Flutter Local Build
    ↓
    ├─ Android: flutter build appbundle --release
    │   ↓
    │   Google Play Store Upload
    │   ↓
    │   Store Review (1-3 days)
    │   ↓
    │   Public Release
    │
    └─ iOS: flutter build ios --release
        ↓
        Xcode Archive
        ↓
        App Store Connect
        ↓
        Review Queue (24-48 hours)
        ↓
        Public Release
```

---

## 📊 Database Schema (Key Models)

```
User
├── id (String)
├── email (String)
├── name (String)
├── password (String) - hashed
├── glowScore (Int)
├── onboardingStage (String)
├── preferences (JSON)
├── createdAt (DateTime)
└── updatedAt (DateTime)

NutritionPlan
├── id (String)
├── userId (String) FK
├── macros (JSON)
├── meals (Meal[])
├── targetCalories (Int)
└── expertId (String) FK

Workout
├── id (String)
├── userId (String) FK
├── type (String)
├── duration (Int)
├── caloriesBurned (Int)
└── completedAt (DateTime)

Habit
├── id (String)
├── userId (String) FK
├── name (String)
├── streak (Int)
├── completionDates (DateTime[])
└── priority (Int)
```

---

## 🔧 Configuration Management

### Web Environment Variables
```
.env.local (Git-ignored)
├── DATABASE_URL=postgresql://...
├── AUTH_SECRET=<random32+chars>
├── STRIPE_SECRET_KEY=sk_live_...
├── STRIPE_WEBHOOK_SECRET=whsec_...
├── NEXT_PUBLIC_STRIPE_KEY=pk_live_...
├── SENTRY_AUTH_TOKEN=<token>
└── NEXT_PUBLIC_API_URL=https://glowuphub.com
```

### Mobile Configuration
```
.env
├── API_BASE_URL=https://api.glowuphub.com
├── GOOGLE_SIGN_IN_CLIENT_ID=<id>
└── Environment: production/development
```

---

## 📈 Monitoring & Observability

### Web (Sentry Integration)
- Real-time error tracking
- Performance monitoring
- Release tracking
- User session replay (optional)

### Mobile (Firebase Optional)
- Crash reporting
- Analytics (custom events)
- Remote configuration
- A/B testing

### Database (Neon Dashboard)
- Query performance metrics
- Connection pooling stats
- Backup status
- Replica replication lag

---

## 🎯 Performance Optimizations

### Web
- Next.js Image optimization
- Code splitting per route
- ISR (Incremental Static Regeneration) for static content
- Vercel Edge caching

### Mobile
- Lazy loading of widgets
- Image caching
- Sqlite for offline-first
- Bundle size optimization

---

## 🔄 CI/CD Pipeline (Ready to Implement)

```
Git Push
    ↓
GitHub Actions Triggered
    ├─ Web: npm run build && npm test
    ├─ Mobile: flutter build apk
    └─ Lint: flutter analyze
    ↓
All Tests Pass?
    ├─ YES → Deploy (Vercel Auto)
    └─ NO → Notify Developer
```

---

## 📚 Key Files to Know

| File | Purpose | Owner |
|------|---------|-------|
| `web/app/layout.tsx` | Root layout (SEO, theme) | Web Team |
| `web/app/api/auth/[...nextauth].ts` | Auth configuration | Backend |
| `web/prisma/schema.prisma` | Database schema | Backend |
| `mobile/lib/main.dart` | App entry point | Mobile Team |
| `mobile/lib/config/theme.dart` | Design system | Mobile/Design |
| `.github/workflows/*.yml` | CI/CD automation | DevOps |

---

**Architecture Document**  
**Version**: 1.0  
**Last Updated**: April 15, 2026  
**Status**: ✅ Complete & Production Ready
