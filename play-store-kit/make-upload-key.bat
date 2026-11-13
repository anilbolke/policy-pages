@echo off
REM ============================================================
REM  Kharcha Khata - create the Play Store UPLOAD key (run once)
REM  Run from the project folder:  play-store-kit\make-upload-key.bat
REM ============================================================
setlocal
set KEYTOOL="C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe"
if not exist %KEYTOOL% set KEYTOOL=keytool

if exist android\upload-key.jks (
  echo android\upload-key.jks already exists. Not overwriting it.
  goto :b64
)
if not exist android (
  echo Run "npx cap add android" first, then run this script again.
  goto :eof
)

echo.
echo You will be asked for a password (twice) and your name / company details.
echo Use:  Name = Anil Bolke, Organisation = RANA.AI Technology, City = Nanded,
echo       State = Maharashtra, Country code = IN
echo.
%KEYTOOL% -genkeypair -v -keystore android\upload-key.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
if errorlevel 1 goto :eof

echo.
set /p KSPASS=Type the same keystore password again (saved only in android\keystore.properties):
(
  echo storeFile=upload-key.jks
  echo storePassword=%KSPASS%
  echo keyAlias=upload
  echo keyPassword=%KSPASS%
) > android\keystore.properties
echo Created android\keystore.properties

:b64
REM Base64 copy for the GitHub secret KEYSTORE_BASE64 (only needed if you build on GitHub)
powershell -NoProfile -Command "[Convert]::ToBase64String([IO.File]::ReadAllBytes('android\upload-key.jks')) | Set-Content -NoNewline 'android\upload-key.base64.txt'"
echo Created android\upload-key.base64.txt  (paste into GitHub secret KEYSTORE_BASE64, then delete this file)
echo.
echo IMPORTANT: copy android\upload-key.jks and the password to a safe place (pen drive / password manager).
echo Never commit them to git. Re-run "npm run patch-android" so the release build uses the key.
endlocal
