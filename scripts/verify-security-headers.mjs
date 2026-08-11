import { readFile } from 'node:fs/promises';

const [vercelSource, viteSource, staticHeadersSource] = await Promise.all([
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
  readFile(new URL('../vite.config.ts', import.meta.url), 'utf8'),
  readFile(new URL('../public/_headers', import.meta.url), 'utf8'),
]);

const vercelConfig = JSON.parse(vercelSource);
const productionCsp = vercelConfig.headers
  ?.flatMap((route) => route.headers ?? [])
  .find((header) => header.key.toLowerCase() === 'content-security-policy')?.value;
const previewCsp = viteSource.match(/'Content-Security-Policy':\s*"([^"]+)"/)?.[1];
const staticCsp = staticHeadersSource.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1];

if (!productionCsp || !previewCsp || !staticCsp) {
  throw new Error('CSP ausente em vercel.json, vite.config.ts ou public/_headers.');
}

if (productionCsp !== previewCsp || productionCsp !== staticCsp) {
  throw new Error('As políticas CSP de produção, preview e host estático estão divergentes.');
}

const connectSource = productionCsp.match(/(?:^|;\s*)connect-src\s+([^;]+)/)?.[1];
if (!connectSource?.split(/\s+/).includes('https://www.google.com')) {
  throw new Error('connect-src deve permitir explicitamente https://www.google.com.');
}

for (const forbiddenValue of [
  'https://google.com',
  'https://*.google.com',
  "'unsafe-eval'",
]) {
  if (productionCsp.includes(forbiddenValue)) {
    throw new Error(`A CSP contém uma permissão não autorizada: ${forbiddenValue}`);
  }
}

console.log('CSP sincronizada entre vercel.json, vite.config.ts e public/_headers.');
