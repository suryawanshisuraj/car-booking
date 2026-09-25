/**
 * Auto-Sync Watcher for Jay Bhavani Tours and Travels
 * Repository: https://github.com/suryawanshisuraj/car-booking
 * 
 * Automatically detects any file modifications, commits them, and pushes to GitHub.
 */

import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/suryawanshisuraj/car-booking';

function findGit() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return 'git';
  } catch (_) {}

  const standardPaths = [
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Git', 'cmd', 'git.exe')
  ];

  for (const p of standardPaths) {
    if (fs.existsSync(p)) return `"${p}"`;
  }
  return 'git';
}

const gitExe = findGit();
let debounceTimer = null;
let isSyncing = false;
const pendingFiles = new Set();

function formatTime() {
  return new Date().toLocaleTimeString('en-IN', { hour12: true });
}

function syncToGitHub() {
  if (isSyncing) return;
  isSyncing = true;

  const changedFiles = Array.from(pendingFiles);
  pendingFiles.clear();

  const fileListStr = changedFiles.length > 0 
    ? changedFiles.slice(0, 3).map(f => path.basename(f)).join(', ') + (changedFiles.length > 3 ? ` and ${changedFiles.length - 3} more` : '')
    : 'project files';

  console.log(`\n[${formatTime()}] 🔄 Change detected in ${fileListStr}`);
  console.log(`[${formatTime()}] 📦 Staging and committing changes...`);

  const commitMsg = `Auto-update: ${fileListStr} (${new Date().toLocaleString('en-IN')})`;

  // Synchronize matching files between root and subfolder
  syncFolders();

  const cmd = `${gitExe} add -A && ${gitExe} commit -m "${commitMsg.replace(/"/g, '\\"')}" && ${gitExe} push origin main`;

  exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
    isSyncing = false;
    if (error) {
      const output = (stdout || '') + (stderr || '');
      if (output.includes('nothing to commit') || output.includes('working tree clean')) {
        console.log(`[${formatTime()}] ℹ️  No new changes to commit (working tree clean).`);
      } else {
        console.log(`[${formatTime()}] ⚠️ Notice during sync:`, error.message.split('\n')[0]);
      }
    } else {
      console.log(`[${formatTime()}] ✅ Successfully pushed to GitHub!`);
      console.log(`[${formatTime()}] 🌐 View commit at: ${REPO_URL}/commits/main`);
    }

    // Also push from subfolder repository if present
    const subRepo = path.join(__dirname, 'jay-bhavani-tours-and-travels');
    if (fs.existsSync(path.join(subRepo, '.git')) && subRepo !== __dirname) {
      exec(`${gitExe} add -A && ${gitExe} commit -m "${commitMsg.replace(/"/g, '\\"')}" && ${gitExe} push origin main`, { cwd: subRepo }, () => {});
    }
  });
}

function syncFolders() {
  const subDir = path.join(__dirname, 'jay-bhavani-tours-and-travels');
  if (!fs.existsSync(subDir) || subDir === __dirname) return;

  function copyNewer(src, dest) {
    try {
      if (fs.existsSync(src) && fs.existsSync(dest)) {
        const srcStat = fs.statSync(src);
        const destStat = fs.statSync(dest);
        if (srcStat.isDirectory()) {
          const files = fs.readdirSync(src);
          for (const file of files) {
            copyNewer(path.join(src, file), path.join(dest, file));
          }
        } else {
          if (srcStat.mtimeMs > destStat.mtimeMs) {
            fs.copyFileSync(src, dest);
          } else if (destStat.mtimeMs > srcStat.mtimeMs) {
            fs.copyFileSync(dest, src);
          }
        }
      }
    } catch (_) {}
  }

  const items = ['index.html', 'README.md', 'package.json', 'css', 'js', 'image'];
  for (const item of items) {
    copyNewer(path.join(__dirname, item), path.join(subDir, item));
  }
}

console.log('===============================================================');
console.log('  🚕 JAY BHAVANI TOURS AND TRAVELS - GITHUB AUTO-SYNC WATCHER');
console.log('===============================================================');
console.log(`📍 Repository: ${REPO_URL}`);
console.log(`🔧 Git Binary: ${gitExe}`);
console.log(`📂 Watching:   ${__dirname}`);
console.log('✨ Any file you edit and save will automatically commit & push');
console.log('   to https://github.com/suryawanshisuraj/car-booking');
console.log('===============================================================\n');

function shouldIgnore(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  return (
    norm === '.git' ||
    norm.startsWith('.git/') ||
    norm.includes('/.git/') ||
    norm.includes('/.git') ||
    norm === 'node_modules' ||
    norm.startsWith('node_modules/') ||
    norm.includes('/node_modules/') ||
    norm === 'dist' ||
    norm.startsWith('dist/') ||
    norm.includes('/dist/') ||
    norm.startsWith('.vite/') ||
    norm.endsWith('.log') ||
    norm.endsWith('auto-sync.js') ||
    norm.endsWith('start-auto-sync.bat')
  );
}

try {
  fs.watch(__dirname, { recursive: true }, (eventType, filename) => {
    if (!filename || shouldIgnore(filename)) return;

    pendingFiles.add(filename);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(syncToGitHub, 2500);
  });
} catch (err) {
  console.error('Watcher initialization error:', err.message);
}
