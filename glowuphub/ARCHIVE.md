# GlowUp Hub Archive

This document tracks files that should be archived or removed from the root directory.

## Files to Archive (Legacy/Iteration)

These files are old iterations of the Hero component and build logs that can be safely archived:

- `old_old_hero.tsx` - Original hero component (superseded)
- `old_old_hero_utf8.tsx` - Original hero component UTF-8 version
- `real_yesterday_hero.tsx` - Previous hero iteration
- `real_yesterday_hero_utf8.tsx` - Previous hero iteration UTF-8
- `yesterday_hero.tsx` - Recent hero iteration
- `yesterday_hero_utf8.tsx` - Recent hero iteration UTF-8
- `log_hero.txt` - Hero component build log
- `run_log.txt` - Build log from 2026-01-14
- `run_log_8.txt` - Build log from 2026-01-14
- `run_log_9.txt` - Build log from 2026-01-14
- `failed_fix.log` - Failed fix attempt log

## Files to Keep

- `DEPLOYMENT_GUIDE.md` - Current deployment instructions
- `RELEASE_GUIDE.md` - Mobile release procedures
- `walkthrough.md` - Project completion summary
- `Configure-Secrets.ps1` - Secret configuration script
- `Final-Deploy.ps1` - Final deployment script
- `web/` - Current web application
- `mobile/` - Current Flutter mobile application
- `mobile_expo_archived/` - Previous Expo stack (for reference)
- `mobile_legacy/` - Legacy attempts (for reference)

## Recommended Cleanup

To keep the root directory clean, consider:

1. Creating an `_archive/` directory and moving legacy files there
2. Deleting build logs once no longer needed
3. Keeping deployment and release guides at root level
