# Publishing Kharcha Khata on Google Play

> **Status (14 Nov 2026):** the app *Kharcha Khata: Expense Manager* (`in.ranaai.kharchakhata`) is created in the RANA.AI Play Console account (ranaaitechnology@gmail.com).
> Done in Play Console: privacy policy link, sign-in details, ads, content rating (all ages / 3+), target audience (18+), Data safety (no data collected or shared), advertising ID, government, financial features, health, category (Finance), contact details, full store listing in English, Hindi and Marathi with icon, feature graphic, 8 phone and 4+4 tablet screenshots.
> **Remaining:** put the privacy policy online (Step 1), create the upload key (Step 2), build the .aab (Step 3), then the testing steps (Step 7) and production (Step 8). Steps 4–6 are already done.

Everything Play Console asks for is in this folder:

| File | Use it for |
|---|---|
| `1-store-listing.md` | App name, short and full description (English, हिंदी, मराठी) |
| `2-app-content-answers.md` | Privacy, ads, content rating, target audience, financial features, **Data safety** |
| `privacy-policy.html` | Upload to your website; Play needs its public link |
| `graphics/app-icon-512.png` | Store icon (512 × 512) |
| `graphics/feature-graphic-1024x500.png` | Feature graphic |
| `graphics/screenshots/01…08.png` | Phone screenshots (1080 × 1920) |
| `graphics/tablet/tablet-01…04.png` | 7-inch and 10-inch tablet screenshots (Play marks these required) |
| `make-upload-key.bat` | Creates your signing (upload) key on Windows |

App details already set in the project:
- Package name: **`in.ranaai.kharchakhata`** (registered in Play Console on 13 Nov 2026 in the RANA.AI developer account; it can never change)
- Version **1.2.0**, version code **1**
- Targets **Android 16 (API 36)**, which Google requires for new apps since 31 Aug 2026 (Capacitor 8)

---

## Step 0 — Check your account type (decides how fast you can go live)

Play Console › **Settings › Developer account › Account details**.

- **Personal account created after 13 Nov 2023**: Google requires a **closed test with at least 12 testers, opted in for 14 days in a row**, before you can apply for production. Plan for about 3 weeks.
- **Organisation account** (e.g. registered as RANA.AI Technology with a D-U-N-S number): this rule does not apply; you can send straight to production review after internal testing.

## Step 1 — Put the privacy policy online

Upload `privacy-policy.html` so it opens at:
`https://ranaaitechnology.in/kharcha-khata/privacy-policy.html`
(The app's About › Privacy policy button links there too. If you use a different address, change `privacyUrl` in `www/index.html`.)
Open it in a private/incognito window to confirm it's public.

## Step 2 — Create your upload key (once, on your PC)

In the project folder (after `npx cap add android`):
```
play-store-kit\make-upload-key.bat
```
It creates `android\upload-key.jks` and `android\keystore.properties`.
**Back up the .jks file and password.** Play uses *Play App Signing*: Google holds the real app-signing key, and this upload key only proves uploads come from you. If you lose it, Google support can reset it, but it takes days.

## Step 3 — Build the Play Store bundle (.aab)

**Option A: on your PC (Android Studio installed)**
```
npm install
npx cap add android          (only if the android folder doesn't exist)
npm run icons                (RANA.AI icon + splash)
npm run aab:release          (syncs, applies signing + permissions, builds the bundle)
```
Output: `android\app\build\outputs\bundle\release\app-release.aab`

**Option B: GitHub Actions (no Android Studio needed)**
1. Push the project to a GitHub repo.
2. Repo › Settings › Secrets and variables › Actions › add 4 secrets:
   `KEYSTORE_BASE64` (contents of `android\upload-key.base64.txt`), `KEYSTORE_PASSWORD`, `KEY_ALIAS` = `upload`, `KEY_PASSWORD`.
3. Actions › **Build Android** › Run workflow › tick **"Also build the signed Play Store bundle"**.
4. Download `kharcha-khata-play-store-aab` from the run.

## Step 4 — Create the app in Play Console

**Create app**:
- App name: `Kharcha Khata: Expense Manager`
- Default language: **English (India) – en-IN**
- App or game: **App** · Free or paid: **Free**
- Tick the Developer Program Policies and US export law declarations

## Step 5 — App content (Policy and programs › App content)

Fill every section using `2-app-content-answers.md`. Short version: no ads, no data collected or shared, all features available without login, target age 18+, content rating Everyone, financial features none (offline record-keeping).

## Step 6 — Store listing

Grow users › Store presence › **Main store listing**: paste from `1-store-listing.md`, upload the icon, feature graphic and the 8 screenshots.
Then **Manage translations › Add your own translations › Hindi and Marathi** and paste those versions (you can reuse the same graphics).
Store settings: Category **Finance**, contact email `ranaaitechnology@gmail.com`, website `https://ranaaitechnology.in`.

## Step 7 — Test before going public

1. **Internal testing** (Test and release › Testing › Internal testing): create a release, upload `app-release.aab`, release notes "First release". Add your own Gmail as tester and install from the opt-in link.
2. On a real phone, check:
   - header and bottom bar don't overlap the status / navigation bars
   - voice entry (mic permission prompt appears, Hindi/Marathi work)
   - Udhaar › Contacts (disclosure screen, then Android permission)
   - bill reminder notification arrives (set a bill due tomorrow)
   - fingerprint unlock, WhatsApp reminder opens the right chat
   - PDF / CSV export and Backup open the share sheet
3. **Closed testing** (personal accounts only): create a closed track, add **at least 12 testers** (a Google Group or email list of friends/family), share the opt-in link, and keep them opted in for **14 consecutive days**. Then Dashboard › **Apply for production**.

## Step 8 — Production release

Test and release › **Production** › Countries: India (add others if you like) › Create release › add the same or a newer `.aab` › Release notes › **Review release › Start rollout**.
First reviews usually take a few days.

## Every future update

1. In `package.json` raise **`versionCode`** by 1 (2, 3, 4…) and set `version` (e.g. `1.3.0`). Play rejects a bundle whose version code was used before.
2. `npm run aab:release` (or run the GitHub workflow).
3. Upload to the same track and roll out.
