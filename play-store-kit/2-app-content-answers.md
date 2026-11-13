# App content answers: Kharcha Khata

Play Console › **Policy and programs › App content**. Every section must be completed before you can send the app for review.
These answers match how the app is built today (version 1.2.0). If you later add a server, login, ads or analytics, they must be changed.

## Privacy policy
`https://ranaaitechnology.in/kharcha-khata/privacy-policy.html`
Upload `privacy-policy.html` to that address first and check it opens in a private browser window. The app also shows the policy in **Settings › About › Privacy policy**.

## App access
**All functionality is available without special access.**
(No login. The PIN lock is optional and set by the user, so the reviewer will never meet it on a fresh install.)

## Ads
**No, my app does not contain ads.**

## Content rating (IARC questionnaire)
- Category: **Utility, productivity, communication or other** (not a game)
- Violence, sexuality, language, controlled substances, gambling: **No** to all
- Does the app let users interact or exchange content? **No.** (Sharing to WhatsApp happens in WhatsApp, not inside the app.)
- Does the app share the user's location? **No**
- Does the app allow purchases of digital goods? **No**
- Expected result: rated for everyone (3+ / Everyone).

## Target audience and content
- Target age groups: **18 and over** only.
  An adult-only target keeps the app outside the Families policy. It is a personal-finance tool for adults managing their own money.
- Appeals to children: **No**

## News app
**No**

## Government app
**No**

## Financial features
The app only records expenses that already happened. It does not move money, lend, process payments, offer investments or connect to bank accounts.
Choose the option that says the app **does not provide** the listed financial services (personal loans, banking, payments, crypto, investments, insurance and so on). If the form insists on a category, use the closest one for *budgeting / expense tracking*, and say it is offline record-keeping only.

## Health apps
**No health features.**

## Data safety
Plain-language reasoning: Google counts data as "collected" only when it **leaves the device** to the developer or a third party. Kharcha Khata keeps everything on the phone and has no server, analytics or ads SDK.

| Question | Answer |
|---|---|
| Does your app collect or share any of the required user data types? | **No** |
| (Shown if No) Is all data encrypted in transit? | Not asked once you answer No |
| Do you provide a way for users to request deletion? | Not asked once you answer No (users can delete in-app anyway) |

Notes you can keep in your records, in case Google asks:
- **Contacts**: one contact picked by the user is saved locally; nothing is transmitted.
- **Microphone / voice**: Android's speech recogniser (a Google system service on the phone) converts speech to text; the app receives text only, stores no audio and sends nothing anywhere itself. Google's form doesn't spell out how OS speech services should be counted, so **this is a judgement call for you as the publisher.** If you'd rather be extra cautious, you can declare *Audio › Voice or sound recordings* as *collected, processed ephemerally, not shared, optional, used for App functionality*; it costs nothing except a slightly longer label.
- **Sharing**: reminders, statements, exports and backups are sent only when the user taps Share; Google counts user-initiated sharing to another app as not "sharing" by the developer.

## Permissions used (what reviewers may ask)

| Permission | Why |
|---|---|
| `RECORD_AUDIO` | Voice entry ("Milk 60 and sabzi 200"), only while the mic is open |
| `READ_CONTACTS` | Pick one person for Udhaar Khata; a disclosure screen is shown before Android's permission dialog |
| `POST_NOTIFICATIONS` | Bill, EMI and udhaar reminders |
| `USE_BIOMETRIC` | Optional fingerprint / face unlock |
| `RECEIVE_BOOT_COMPLETED`, `WAKE_LOCK` | Keep scheduled reminders after a phone restart (added by the notifications library) |
| `INTERNET` | Opening WhatsApp and website links only |

Removed on purpose: `SCHEDULE_EXACT_ALARM`, `USE_EXACT_ALARM` (reminders use normal timing, so no exact-alarm declaration is needed) and `WRITE_CONTACTS`.
No SMS, call log, location, camera or storage permission is requested.
