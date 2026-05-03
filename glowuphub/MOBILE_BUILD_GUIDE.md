# GlowUp Hub - Mobile Build Guide

Complete guide for building and deploying the Flutter mobile application for GlowUp Hub.

## Prerequisites

### System Requirements
- **Flutter SDK**: Version 3.3.0 or higher
- **Dart SDK**: Included with Flutter
- **Android Studio** or **Xcode** (depending on target platform)
- **Git**: For version control

### Installation

#### 1. Install Flutter
- **macOS/Linux**: https://flutter.dev/docs/get-started/install
- **Windows**: https://flutter.dev/docs/get-started/install/windows

#### 2. Verify Installation
```bash
flutter --version
flutter doctor
```
The `flutter doctor` command should show green checkmarks for all required components.

---

## Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd glowuphub/mobile
```

### 2. Install Dependencies
```bash
flutter pub get
```

### 3. Configure Build Settings
Update version in `pubspec.yaml` if needed:
```yaml
version: 1.0.0+1
```

---

## Development Builds

### Running on Emulator/Simulator

#### Android Emulator
```bash
flutter emulators --launch Pixel_5_API_30  # Or your emulator name
flutter run
```

#### iOS Simulator (macOS only)
```bash
open -a Simulator
flutter run -d macos
```

### Running on Physical Device
```bash
flutter run -d <device-id>
# List connected devices: flutter devices
```

### Hot Reload (During Development)
- Press `r` in terminal to hot reload
- Press `R` for full restart
- Press `q` to quit

---

## Production Builds

### Building for Android

#### APK (Single Architecture)
```bash
flutter build apk --release
```
Output: `build/app/outputs/flutter-app.apk`

#### AAB (for Google Play Store)
```bash
flutter build appbundle --release
```
Output: `build/app/outputs/bundle/release/app-release.aab`

### Building for iOS

#### Prerequisites (macOS only)
- Valid Apple Developer account
- Code signing certificates
- Provisioning profiles

#### Build Command
```bash
flutter build ios --release
```

Then in Xcode:
1. Open `ios/Runner.xcworkspace` (NOT `.xcodeproj`)
2. Select "Product" → "Archive"
3. Upload to App Store Connect for review

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `provider` | ^6.1.2 | State Management |
| `go_router` | ^14.7.2 | Navigation |
| `http` | ^1.3.0 | API Requests |
| `shared_preferences` | ^2.2.3 | Local Storage |
| `fl_chart` | 0.66.2 | Data Visualization |
| `flutter_lucide` | 1.8.2 | Icons |
| `google_fonts` | ^6.2.1 | Typography |
| `flutter_animate` | ^4.5.2 | Animations |

### Recent Fixes (April 2026)
- Upgraded `fl_chart` to 0.66.2 (fixes Color API compatibility)
- Replaced `Color.withValues()` with `Color.withOpacity()` (Flutter 3.3+ compatibility)

---

## Troubleshooting

### Build Errors

#### "withValues not defined"
**Solution**: Library version compatibility. Ensure `fl_chart: 0.66.2` in `pubspec.yaml`
```bash
flutter pub upgrade
```

#### "Icon not found"
**Solution**: Verify `flutter_lucide` has the icon
```bash
flutter pub get
```

#### Pod installation failed (iOS)
**Solution**:
```bash
cd ios
rm -rf Pods Podfile.lock
cd ..
flutter clean
flutter pub get
flutter build ios
```

#### Gradle build failed (Android)
**Solution**:
```bash
flutter clean
flutter pub get
flutter build apk --release
```

---

## Testing

### Run Unit Tests
```bash
flutter test
```

### Run Widget Tests
```bash
flutter test test/
```

### Analyze Code
```bash
flutter analyze
```

---

## Performance Optimization

### Profile Build
```bash
flutter run --profile
```

### Release Build (Best Performance)
```bash
flutter run --release
```

---

## Deployment Checklist

- [ ] All features implemented and tested
- [ ] No lint warnings: `flutter analyze`
- [ ] Code formatted: `flutter format .`
- [ ] Version bumped in `pubspec.yaml`
- [ ] Release notes prepared
- [ ] Screenshots captured for app stores
- [ ] App signing configured (Android & iOS)
- [ ] Privacy policy and terms updated
- [ ] Tested on multiple devices
- [ ] Performance optimized

---

## App Store Submission

### Google Play Store
1. Create release build: `flutter build appbundle --release`
2. Sign with upload key
3. Upload AAB to Google Play Console
4. Fill metadata and press "Publish"

### Apple App Store
1. Create release build: `flutter build ios --release`
2. Archive in Xcode
3. Upload via Xcode or Transporter
4. Configure TestFlight beta testing
5. Submit for review from App Store Connect

---

## CI/CD Integration

For GitHub Actions, create `.github/workflows/build.yml`:

```yaml
name: Flutter Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.3.0'
      - run: cd mobile && flutter pub get
      - run: cd mobile && flutter analyze
      - run: cd mobile && flutter test
      - run: cd mobile && flutter build apk --release
```

---

## Support & Resources

- [Flutter Docs](https://flutter.dev/docs)
- [Dart Language Guide](https://dart.dev/guides)
- [Provider Package](https://pub.dev/packages/provider)
- [Material Design](https://material.io/design)

---

**Last Updated**: April 15, 2026
**Status**: Mobile builds now passing with all Color API fixes applied
