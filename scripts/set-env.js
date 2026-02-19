const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file if it exists
dotenv.config();

const envDirectory = path.join(__dirname, '../src/environments');

if (!fs.existsSync(envDirectory)) {
    fs.mkdirSync(envDirectory, { recursive: true });
}

const targetPath = path.join(envDirectory, 'environment.ts');
const targetPathProd = path.join(envDirectory, 'environment.prod.ts');

const envConfigFile = `export const environment = {
  production: ${process.env.APP_PRODUCTION === 'true' || false},
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || ''}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || ''}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || ''}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || ''}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}',
    appId: '${process.env.FIREBASE_APP_ID || ''}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID || ''}'
  }
};
`;

console.log('Generating environment files...');

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(targetPathProd, envConfigFile);

console.log(`Environment files generated at ${targetPath}`);
