# Kharcha Khata — by RANA.AI Technology

Daily, Home & Trip expense manager (offline Android APK). A product of RANA.AI Technology, Nanded — https://ranaaitechnology.in

Single offline HTML app (`www/index.html`) wrapped as an Android app with **Capacitor 8**, targeting **Android 16 (API 36)** as Google Play requires.
All data stays on the phone (IndexedDB). No server, no internet needed.

## Features
- **First-launch setup**: Simple / Family / Advanced mode, plus on/off switches in Settings for
  Home, Trips, Budgets, Income & savings, Udhaar khata and Voice. Switching never deletes data.
- **Income & savings**: salary/business/other income, monthly Income – Spent = Saved
- **Udhaar khata**: "You gave / You got" per person, running balance, WhatsApp/SMS payment reminder
- **Daily** book (personal) and **Home** book (household) with monthly budgets, month-by-month ledger, category filter
- **Trips**: members, trip budget, split **Equally / Individual / Custom**, who-paid tracking,
  Settle-up with minimum transfers and "Mark paid" settlements
- **Bill photo** per expense (camera or gallery, compressed to ~1280px)
- **Reports**: period filters, day/month trend, category breakdown, per-member trip spend
- **Export**: CSV (opens in Excel) and PDF report via the Android share sheet
- **Backup / Restore** to a single JSON file (includes bill photos)
- **Voice entry** (mic button): say "petrol 500", "milk 60 and sabzi 200", "yesterday auto 80",
  "Rahul paid 1200 for dinner" — English, Hindi or Marathi. Several items in one go, review list before saving.
  Uses `@capacitor-community/speech-recognition` (Google speech on the phone); the plugin adds the
  microphone permission automatically. The phone needs the Google app / speech services installed.
- **Bills & EMIs (recurring)**: rent, EMI, subscriptions, insurance — monthly / 3 / 6 / 12 months.
  "Ask me" shows Paid / Skip on Overview; "Add automatically" records it by itself. Phone notification a day before and on the day.
- **Udhaar extras**: pick person from phone contacts, mobile number per person, "remind me to collect / return on" date
  with a 9 AM phone notification, WhatsApp chat opens directly (wa.me), share a full statement.
- **Privacy lock**: 4-digit PIN (stored hashed), fingerprint / face unlock, locks again after 30 s in background.
  It stops others opening the app; it does not encrypt the data.
- Budget alerts at 80% and 100%, dark mode, Android back button support
- First launch shows sample entries with a "Clear samples" button

## Build the APK — Option A: Android Studio (local)
Needs Node 20+, JDK 21, Android Studio (Ladybug or newer).
```bash
npm install
npm run copy-libs        # copies jsPDF into www/lib for offline PDF
npx cap add android      # only the first time
npx cap sync android
npm run patch-android    # edge-to-edge + contacts/biometric permissions
npm run icons            # RANA.AI app icon + splash screen
npx cap open android     # Android Studio → Build → Build APK(s)
```
Or from the terminal: `cd android && ./gradlew assembleDebug`
APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## Build the APK — Option B: GitHub Actions (no Android Studio)
Push this folder to a GitHub repo. `.github/workflows/build-apk.yml` builds a debug APK on every push to `main`
(or run it manually from the Actions tab). Download it from the run's **Artifacts**.

## Changing things
- Edit only `www/index.html`, then `npx cap sync android` and rebuild.
- App name / package id: `capacitor.config.json` (`appName`, `appId` = `in.ranaai.kharchakhata`) — set before `cap add android`.
- Branding: the `BRAND` object at the top of the script (company, phone, email, website, logo). Logo files are in `www/img/`.
- App icon & splash: sources in `assets/`; run `npm run icons` after `cap add android` (CI does this). Replace `assets/icon-only.png`,
  `icon-foreground.png` with a high-resolution logo (1024×1024) for a sharper icon.
- Categories: the `CATS` object near the top of the script.
- Voice words → categories: the `VKEYS` list (add your own words, e.g. local shop names).
- Play Store release: Android Studio → Build → Generate Signed Bundle/APK.

## Status bar / notch handling
The app targets Android 16, which draws apps behind the status and navigation bars. Older Android WebViews
report those bar heights as 0, which pushes the header under the clock and battery icons.
Capacitor 8's built-in SystemBars (`insetsHandling`) fixes this on every Android version; `scripts/patch-android.js`
enables edge-to-edge in `MainActivity` so the plugin can do its job. Run it after every fresh `npx cap add android`.

## Google Play release
Everything for the Play Store is in `play-store-kit/` — start with `0-PUBLISHING-GUIDE.md`.
- `npm run aab:release` builds the signed bundle once `android/keystore.properties` exists (`play-store-kit/make-upload-key.bat` creates it).
- Raise `versionCode` in `package.json` for every upload.
- Status bar handling now uses Capacitor 8's built-in SystemBars (`capacitor.config.json`), plus edge-to-edge in `MainActivity`.
- Reminders use normal (inexact) alarm timing, so the app needs no exact-alarm permission declaration.
