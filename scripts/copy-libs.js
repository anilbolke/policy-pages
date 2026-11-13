// Copies offline libraries into www/lib so the APK works with no internet.
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, '..', 'www', 'lib');
fs.mkdirSync(out, { recursive: true });
fs.copyFileSync(require.resolve('jspdf/dist/jspdf.umd.min.js'), path.join(out, 'jspdf.umd.min.js'));
fs.mkdirSync(path.join(out,'fonts'),{recursive:true});
for (const w of ['500','700']) fs.copyFileSync(require.resolve(`@fontsource/space-grotesk/files/space-grotesk-latin-${w}-normal.woff2`), path.join(out,'fonts',`space-grotesk-${w}.woff2`));
console.log('Copied jspdf + Space Grotesk fonts -> www/lib');
