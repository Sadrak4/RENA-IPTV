import { cpSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const copyTarget = (source, targetName = source) => {
  const from = join(root, source);
  const to = join(dist, targetName);
  cpSync(from, to, { recursive: true });
};

copyFileSync(join(root, 'index.html'), join(dist, 'index.html'));
copyFileSync(join(root, 'manifest.webmanifest'), join(dist, 'manifest.webmanifest'));
copyTarget('public');
copyTarget('src');

console.log('Build concluído em dist/.');
