import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const envFile = '.env.vercel'; // Change if needed
const tempDir = '.vercel_env_temp'; // Temporary directory to store variable files

// Ensure the directory exists
execSync(`mkdir -p ${tempDir}`);

const envVars = readFileSync(envFile, 'utf-8')
  .split('\n')
  .filter((line) => line.trim() && !line.startsWith('#'));

envVars.forEach((line) => {
  const [key, ...value] = line.split('=');
  const val = value.join('=').trim();

  if (key && val) {
    const tempFilePath = path.join(tempDir, key);
    writeFileSync(tempFilePath, val);

    console.log(`Checking if ${key} exists...`);
    try {
      const existingVars = execSync(`vercel env ls production`, {
        encoding: 'utf-8',
      });
      if (existingVars.includes(key)) {
        console.log(`Removing existing ${key}...`);
        execSync(`vercel env rm ${key} production -y`, { stdio: 'inherit' });
      } else {
        console.log(`${key} does not exist, skipping removal.`);
      }
    } catch (error) {
      console.log(`Skipping removal of ${key}, possibly no existing value.`);
    }

    console.log(`Setting ${key}...`);
    execSync(`vercel env add ${key} production < ${tempFilePath}`, {
      stdio: 'inherit',
    });

    execSync(`rm -f ${tempFilePath}`); // Clean up temp file
  }
});

// Remove temp directory
execSync(`rm -rf ${tempDir}`);
