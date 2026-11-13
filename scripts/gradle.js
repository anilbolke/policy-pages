// Runs the Android Gradle wrapper on Windows, macOS or Linux: node scripts/gradle.js bundleRelease
const { spawnSync } = require('child_process'), path = require('path');
const dir = path.join(__dirname, '..', 'android');
const cmd = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const r = spawnSync(cmd, process.argv.slice(2), { cwd: dir, stdio: 'inherit', shell: process.platform === 'win32' });
process.exit(r.status ?? 1);
