# GlowUp Hub - Quick Reference Guide

Fast access to common development and deployment commands.

## 🌐 Web Development

### Setup
```bash
cd web
npm install
```

### Development Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Studio (visual DB explorer)
npx prisma studio
```

---

## 📱 Mobile Development (Flutter)

### Setup
```bash
cd mobile
flutter pub get
```

### Development
```bash
# Run on emulator/device
flutter run

# Run in release mode (faster)
flutter run --release
```

### Build
```bash
# APK (Android)
flutter build apk --release

# App Bundle (Google Play Store)
flutter build appbundle --release

# iOS (Mac only)
flutter build ios --release
```

### Code Quality
```bash
# Analyze
flutter analyze

# Format
flutter format .

# Run tests
flutter test
```

### Troubleshooting
```bash
# Clean everything
flutter clean
flutter pub get

# Check environment
flutter doctor

# Upgrade Flutter
flutter upgrade
```

---

## 🚀 Deployment

### Deploy Web to Vercel

1. **First Time Setup**:
   ```bash
   # Login to Vercel
   npm i -g vercel
   vercel login
   
   # Deploy web directory
   cd web
   vercel
   ```

2. **Set Environment Variables** (in Vercel Dashboard):
   - `DATABASE_URL` = PostgreSQL connection string
   - `AUTH_SECRET` = Random 32+ character string
   - `STRIPE_SECRET_KEY` = Stripe API key

3. **Configure Domain**:
   - Point DNS to Vercel nameservers
   - Enable HTTPS (automatic)

### Deploy Mobile to Play Store

```bash
# 1. Build release bundle
flutter build appbundle --release

# 2. Sign with keystore (if not already done)
# See MOBILE_BUILD_GUIDE.md for details

# 3. Upload AAB in Google Play Console
# Follow store listing checklist in console
```

### Deploy Mobile to App Store (macOS only)

```bash
# 1. Build iOS app
flutter build ios --release

# 2. Open in Xcode
open ios/Runner.xcworkspace

# 3. Archive and upload via Xcode
# Product → Archive → Distribute App

# OR use Transporter
# Download from App Store Connect
```

---

## 📝 Common Tasks

### Add New Dependency

**Web**:
```bash
cd web
npm install <package-name>
```

**Mobile**:
```bash
cd mobile
flutter pub add <package-name>
```

### Update All Dependencies

**Web**:
```bash
cd web
npm update
npm audit fix
```

**Mobile**:
```bash
cd mobile
flutter pub upgrade
```

### Database Schema Changes

```bash
# 1. Edit web/prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name <migration_name>

# 3. Verify schema
npx prisma studio
```

### Add New Flutter Screen

1. Create file in `mobile/lib/screens/new_screen.dart`
2. Extend `StatelessWidget` or `StatefulWidget`
3. Update `mobile/lib/config/navigation.dart` routes
4. Import in main navigation

### Add New Web Page

1. Create folder in `web/app/<route>`
2. Add `page.tsx` file
3. Configure in `next.config.js` if needed
4. Add navigation link in layout

---

## 🔍 Debugging

### Web
```bash
# Chrome DevTools
# Simply use in-browser F12

# Next.js Debug Mode
DEBUG=* npm run dev

# Prisma Debug
DEBUG=* npx prisma db push
```

### Mobile
```bash
# Flutter Logs
flutter logs

# Verbose Output
flutter run -v

# Dart DevTools
flutter pub global activate devtools
devtools

# Profile Performance
flutter run --profile
```

---

## 📊 Monitoring

### Web Performance
```bash
# PageSpeed Insights
# https://pagespeed.web.dev/

# Lighthouse CLI
npm install -g lighthouse
lighthouse https://glowuphub.com
```

### Mobile Performance
```bash
# Profile while running
flutter run --profile

# Memory profiling
flutter pub run devtools
```

### Errors & Logs
- **Web**: Sentry Console (auto-integrated)
- **Mobile**: Check logcat / Xcode console
- **Database**: Neon Dashboard

---

## 🧪 Testing

### Web Unit Tests
```bash
cd web
npm test
```

### Mobile Tests
```bash
cd mobile
flutter test
```

### Integration Tests
```bash
cd mobile
flutter drive --target=test_driver/app.dart
```

---

## 📚 Documentation Files

Quick links to key documentation:

| File | Purpose |
|------|---------|
| `README.md` | Project overview & quick start |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment instructions |
| `RELEASE_GUIDE.md` | Release procedures & checklist |
| `MOBILE_BUILD_GUIDE.md` | Flutter building & distribution |
| `FIX_SUMMARY.md` | Recent fixes and current status |
| `ARCHIVE.md` | Legacy files documentation |

---

## 💡 Tips & Tricks

### Web Development
- Use `npm run dev` for hot reload
- Use DevTools for debugging
- Check `.env.local` for environment variables
- Prisma studio for visual DB management

### Mobile Development
- `r` to hot reload in terminal
- `R` for full restart
- Profile builds for performance testing
- Use emulator for device-like testing

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit regularly
git commit -am "Your message"

# Push to origin
git push origin feature/your-feature

# Create pull request
# Review and merge on GitHub
```

---

## ⚡ Emergency Procedures

### If Web Deployment Breaks
```bash
# Rollback to previous version
vercel rollback

# Or rebuild from Git
vercel --prod
```

### If Mobile App Won't Build
```bash
# Full clean
flutter clean
rm -rf pubspec.lock
rm -rf .dart_tool

# Rebuild
flutter pub get
flutter build apk --release
```

### If Database Connection Fails
```bash
# Verify connection string
echo $DATABASE_URL

# Test with psql
psql $DATABASE_URL -c "SELECT 1;"

# If Neon: Check in Neon Dashboard
```

---

## 📞 Support Resources

- [Flutter Docs](https://flutter.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

---

**Updated**: April 15, 2026  
**Status**: All systems operational ✅
