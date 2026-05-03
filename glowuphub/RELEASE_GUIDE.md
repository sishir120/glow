# GlowUpHub: Professional Release Guide

This guide provides step-by-step instructions for deploying the GlowUpHub mobile application to production (Google Play Store and Apple App Store).

---

## 1. Android Production Deployment

### A. Generate Keystore
To sign the app, you need a release keystore.
Run the following command in your terminal (replace `[PASSWORD]` with a secure one):
```bash
keytool -genkey -v -keystore release-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release
```

### B. Configure `key.properties`
Create a file at `mobile/android/key.properties` with the following content:
```properties
storePassword=[YOUR_STORE_PASSWORD]
keyPassword=[YOUR_KEY_PASSWORD]
keyAlias=release
storeFile=../release-keystore.jks
```

### C. Build the Application
Run the following commands in the `mobile` directory:
```bash
flutter clean
flutter pub get
# To generate an App Bundle (Recommended for Play Store)
flutter build appbundle --release
# To generate a standalone APK
flutter build apk --release
```

---

## 2. iOS Production Deployment

### Requirements
- A Mac with the latest version of Xcode.
- An Apple Developer Program membership.

### Steps
1.  Open `mobile/ios/Runner.xcworkspace` in Xcode.
2.  Select your development team in the "Signing & Capabilities" tab.
3.  Update the **Bundle Identifier** to your final production ID (e.g., `com.glowuphub.app`).
4.  Run `flutter build ios --release`.
5.  In Xcode, go to **Product > Archive** to upload to App Store Connect/TestFlight.

---

## 3. Production Readiness Checklist

### Global
- [ ] **API URL**: Verified `baseUrl` in `api_service.dart` is `https://glowuphub.com/api`.
- [ ] **Branding**: App icons and splash screens verified in `pubspec.yaml`.
- [ ] **Version**: `version: 1.0.0+1` is correct (increment for subsequent updates).

### Web (Landing Page)
- [ ] **SEO**: All meta tags and OG images are active.
- [ ] **Links**: All "Download" buttons point to the final app distribution URLs.
- [ ] **PWA**: PWA manifest and service worker are functioning.

---

## 4. Maintenance & Updates
- **Flutter Upgrade**: Regularly run `flutter pub upgrade` to keep dependencies secure.
- **Support**: For technical support regarding the build pipeline, refer to the [Project History Report](file:///C:/Users/sishi/.gemini/antigravity/brain/5a6a0a97-6a45-4754-8b00-b22d770cf545/project_history_report.md).

---
*GlowUpHub - Professional Deployment Strategy*
