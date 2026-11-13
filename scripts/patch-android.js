// Run after `npx cap add android` (and safe to re-run after every `npx cap sync`).
// 1. Edge-to-edge in MainActivity, so the header never hides under the status bar.
// 2. Permissions: adds what the plugins need, removes what Play Store would question.
// 3. Version code / name from package.json.
// 4. Release signing from android/keystore.properties (never committed).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const androidDir = path.join(root, 'android');
if (!fs.existsSync(androidDir)) { console.log('No android folder yet - run "npx cap add android" first.'); process.exit(0); }
const pkg = require(path.join(root, 'package.json'));

// ---------- 1. MainActivity ----------
const javaDir = path.join(androidDir, 'app', 'src', 'main', 'java');
function find(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { const r = find(p); if (r) return r; } else if (f === 'MainActivity.java') return p; } }
const mainFile = find(javaDir);
let src = fs.readFileSync(mainFile, 'utf8');
if (!src.includes('EdgeToEdge.enable')) {
  const pkgLine = src.match(/^package [^;]+;/m)[0];
  fs.writeFileSync(mainFile, `${pkgLine}

import android.os.Bundle;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
    }
}
`);
  console.log('Patched MainActivity (edge-to-edge)');
}

// ---------- 2. Permissions ----------
const manifestFile = path.join(androidDir, 'app', 'src', 'main', 'AndroidManifest.xml');
let mf = fs.readFileSync(manifestFile, 'utf8');
if (!mf.includes('xmlns:tools')) mf = mf.replace('<manifest xmlns:android="http://schemas.android.com/apk/res/android"', '<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:tools="http://schemas.android.com/tools"');
const need = ['android.permission.USE_BIOMETRIC', 'android.permission.READ_CONTACTS'];
// Reminders use normal (inexact) timing, so exact-alarm access is not needed.
// WRITE_CONTACTS is never used: the app only picks a contact.
const drop = ['android.permission.SCHEDULE_EXACT_ALARM', 'android.permission.USE_EXACT_ALARM', 'android.permission.WRITE_CONTACTS'];
for (const p of drop) mf = mf.replace(new RegExp(`\\s*<uses-permission android:name="${p.replace(/\./g, '\\.')}"\\s*/>`, 'g'), '');
const add = [];
for (const p of need) if (!mf.includes(`"${p}"`)) add.push(`    <uses-permission android:name="${p}" />`);
for (const p of drop) if (!mf.includes(`"${p}" tools:node="remove"`)) add.push(`    <uses-permission android:name="${p}" tools:node="remove" />`);
if (add.length) mf = mf.replace('</manifest>', add.join('\n') + '\n</manifest>');
fs.writeFileSync(manifestFile, mf);
console.log('Permissions checked (added: biometric, contacts read; removed: exact alarms, contacts write)');

// ---------- 3 + 4. Version and signing ----------
const gradleFile = path.join(androidDir, 'app', 'build.gradle');
let g = fs.readFileSync(gradleFile, 'utf8');
g = g.replace(/versionCode \d+/, `versionCode ${pkg.versionCode || 1}`).replace(/versionName "[^"]*"/, `versionName "${pkg.version}"`);
if (!g.includes('keystore.properties')) {
  g = g.replace("apply plugin: 'com.android.application'", `apply plugin: 'com.android.application'

// Release signing: android/keystore.properties holds storeFile, storePassword, keyAlias, keyPassword.
// Keep that file and the .jks out of git. CI writes them from repository secrets.
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) { keystoreProperties.load(new FileInputStream(keystorePropertiesFile)) }`);
  g = g.replace(/\n    buildTypes \{\n        release \{\n/, `
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile rootProject.file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    buildTypes {
        release {
            if (keystorePropertiesFile.exists()) { signingConfig signingConfigs.release }
`);
}
fs.writeFileSync(gradleFile, g);
console.log(`Version ${pkg.version} (code ${pkg.versionCode || 1}); release signing ${fs.existsSync(path.join(androidDir, 'keystore.properties')) ? 'ON (keystore.properties found)' : 'ready (add android/keystore.properties to sign)'}`);
